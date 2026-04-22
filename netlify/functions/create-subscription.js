/**
 * Netlify Function: create-subscription.js
 * Creates a subscription for a user via Mercado Pago
 *
 * SECURITY: This function runs server-side and has access to secret keys
 */

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// Initialize Supabase with SERVICE key (has elevated privileges)
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map();

/**
 * Rate limiter: Check if user has exceeded request limit
 */
function checkRateLimit(userId, maxRequests = 5, windowMs = 60000) {
  const key = `subscription_${userId}`;
  const now = Date.now();
  const data = rateLimitStore.get(key) || { requests: [], blockedUntil: 0 };

  if (now < data.blockedUntil) {
    return { allowed: false, message: 'Too many requests. Try again later.' };
  }

  // Remove old requests outside the window
  data.requests = data.requests.filter(ts => now - ts < windowMs);

  if (data.requests.length >= maxRequests) {
    data.blockedUntil = now + windowMs;
    rateLimitStore.set(key, data);
    return { allowed: false, message: 'Rate limit exceeded' };
  }

  data.requests.push(now);
  rateLimitStore.set(key, data);
  return { allowed: true };
}

/**
 * Input validation
 */
function validateInput(token) {
  if (!token || typeof token !== 'string' || token.length === 0) {
    return { valid: false, error: 'Invalid token' };
  }
  if (token.length > 2000) {
    return { valid: false, error: 'Token too long' };
  }
  return { valid: true };
}

/**
 * Verify JWT token and extract user
 */
async function verifyToken(token) {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) {
      return { valid: false, error: 'Invalid token' };
    }
    return { valid: true, user };
  } catch (error) {
    return { valid: false, error: 'Token verification failed' };
  }
}

/**
 * Main handler
 */
exports.handler = async (event, context) => {
  // CORS pre-flight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://kartsetup.com.br',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Authorization, Content-Type, X-CSRF-Token',
        'Access-Control-Max-Age': '3600'
      }
    };
  }

  try {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Extract and validate token from Authorization header
    const authHeader = event.headers.authorization || event.headers.Authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Missing or invalid authorization header' })
      };
    }

    const token = authHeader.substring(7);

    // Validate input
    const validation = validateInput(token);
    if (!validation.valid) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: validation.error })
      };
    }

    // Verify token and get user
    const tokenVerification = await verifyToken(token);
    if (!tokenVerification.valid) {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: tokenVerification.error })
      };
    }

    const user = tokenVerification.user;

    // Rate limiting
    const rateLimit = checkRateLimit(user.id);
    if (!rateLimit.allowed) {
      return {
        statusCode: 429,
        headers: {
          'Retry-After': '60'
        },
        body: JSON.stringify({ error: rateLimit.message })
      };
    }

    // Check if user already has active subscription
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('subscription_status, subscription_id')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('[SECURITY] Profile lookup error:', profileError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to retrieve user profile' })
      };
    }

    if (profile?.subscription_status === 'active') {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'User already has an active subscription' })
      };
    }

    // For now: Auto-activate trial (7 days)
    // In production: call Mercado Pago API here
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        subscription_status: 'trial',
        trial_ends_at: trialEndDate.toISOString(),
        subscription_id: `trial_${user.id}_${Date.now()}`
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('[SECURITY] Subscription update error:', updateError);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to create subscription' })
      };
    }

    // Audit log
    console.log('[AUDIT] SUBSCRIPTION_CREATED', {
      userId: user.id,
      email: user.email,
      type: 'trial',
      expiresAt: trialEndDate.toISOString(),
      timestamp: new Date().toISOString()
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': process.env.SITE_URL || 'https://kartsetup.com.br'
      },
      body: JSON.stringify({
        success: true,
        message: 'Trial activated successfully',
        trialEndsAt: trialEndDate.toISOString()
      })
    };

  } catch (error) {
    console.error('[SECURITY] Subscription creation error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
