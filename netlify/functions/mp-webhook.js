/**
 * Netlify Function: mp-webhook.js
 * Receives and processes Mercado Pago subscription webhooks
 *
 * SECURITY: Validates HMAC signatures and prevents replay attacks
 */

const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

// Initialize Supabase with SERVICE key
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Webhook signature validation store (prevent replay attacks)
const processedWebhookIds = new Set();
const WEBHOOK_REPLAY_WINDOW_MS = 3600000; // 1 hour
const webhookTimestamps = new Map();

/**
 * Validate HMAC signature from Mercado Pago
 */
function validateSignature(payload, signature) {
  if (!process.env.MP_WEBHOOK_SECRET) {
    console.warn('[SECURITY] MP_WEBHOOK_SECRET not configured');
    return false;
  }

  try {
    const computedSignature = crypto
      .createHmac('sha256', process.env.MP_WEBHOOK_SECRET)
      .update(payload)
      .digest('hex');

    // Use constant-time comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature)
    );
  } catch (error) {
    console.error('[SECURITY] Signature validation error:', error);
    return false;
  }
}

/**
 * Check for replay attacks
 */
function isReplayAttack(webhookId, timestamp) {
  const now = Date.now();
  const webhookTime = new Date(timestamp).getTime();

  // Reject if timestamp is too old
  if (now - webhookTime > WEBHOOK_REPLAY_WINDOW_MS) {
    return true;
  }

  // Reject if we've already processed this webhook
  if (processedWebhookIds.has(webhookId)) {
    return true;
  }

  // Record this webhook
  processedWebhookIds.add(webhookId);
  webhookTimestamps.set(webhookId, now);

  // Clean up old entries
  if (webhookTimestamps.size > 10000) {
    const cutoff = now - WEBHOOK_REPLAY_WINDOW_MS;
    for (const [id, time] of webhookTimestamps.entries()) {
      if (time < cutoff) {
        webhookTimestamps.delete(id);
        processedWebhookIds.delete(id);
      }
    }
  }

  return false;
}

/**
 * Sanitize input
 */
function sanitizeString(input) {
  if (typeof input !== 'string') return '';
  return input.substring(0, 500).replace(/[^a-zA-Z0-9_-]/g, '');
}

/**
 * Main handler
 */
exports.handler = async (event, context) => {
  try {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      };
    }

    // Get signature from header
    const signature = event.headers['x-signature'];
    if (!signature) {
      console.warn('[SECURITY] Missing webhook signature');
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Missing signature' })
      };
    }

    // Validate signature
    const rawBody = event.body;
    if (!validateSignature(rawBody, signature)) {
      console.error('[SECURITY] Invalid webhook signature');
      return {
        statusCode: 401,
        body: JSON.stringify({ error: 'Invalid signature' })
      };
    }

    // Parse body
    let webhookData;
    try {
      webhookData = JSON.parse(rawBody);
    } catch (error) {
      console.error('[SECURITY] Invalid JSON in webhook body');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON' })
      };
    }

    // Validate webhook structure
    if (!webhookData.id || !webhookData.created || !webhookData.data) {
      console.error('[SECURITY] Invalid webhook structure');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid webhook structure' })
      };
    }

    // Check for replay attacks
    if (isReplayAttack(webhookData.id, webhookData.created)) {
      console.warn('[SECURITY] Replay attack detected', { webhookId: webhookData.id });
      // Return 200 to acknowledge (prevent retry loop)
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Webhook already processed' })
      };
    }

    // Only process preapproval topic (subscriptions)
    if (webhookData.topic !== 'preapproval') {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Ignored topic: ' + webhookData.topic })
      };
    }

    // Fetch full subscription from Mercado Pago (don't trust webhook payload)
    const subscriptionId = webhookData.data?.id;
    if (!subscriptionId) {
      console.error('[SECURITY] Missing subscription ID in webhook');
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing subscription ID' })
      };
    }

    // In production, fetch from MP API:
    // const subscription = await fetchFromMercadoPago(subscriptionId);

    // For now, use the webhook data with sanitization
    const subscription = webhookData.data;
    const status = sanitizeString(subscription.status || '');
    const externalRef = sanitizeString(subscription.external_reference || '');

    // Map status to our internal status
    let internalStatus;
    switch (status) {
      case 'authorized':
        internalStatus = 'active';
        break;
      case 'cancelled':
      case 'paused':
        internalStatus = 'cancelled';
        break;
      default:
        console.warn('[SECURITY] Unknown subscription status:', status);
        internalStatus = 'unknown';
    }

    // Update user subscription in Supabase
    if (externalRef && internalStatus !== 'unknown') {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          subscription_status: internalStatus,
          subscription_id: sanitizeString(subscriptionId),
          current_period_end: subscription.end_date ? new Date(subscription.end_date).toISOString() : null
        })
        .eq('id', externalRef);

      if (updateError) {
        console.error('[SECURITY] Failed to update subscription:', updateError);
      } else {
        // Audit log
        console.log('[AUDIT] WEBHOOK_PROCESSED', {
          webhookId: webhookData.id,
          userId: externalRef,
          status: internalStatus,
          subscriptionId: sanitizeString(subscriptionId),
          timestamp: new Date().toISOString()
        });
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'Webhook processed' })
    };

  } catch (error) {
    console.error('[SECURITY] Webhook processing error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
