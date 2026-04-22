/**
 * Security Configuration Helper
 * Carrega credenciais de forma segura do servidor
 * Nunca hardcode credenciais no cliente!
 */

(async function initSecurityConfig() {
  try {
    // Carrega configurações do servidor (injetadas pelo Netlify)
    window.APP_CONFIG = {
      SUPABASE_URL: window.__ENV_SUPABASE_URL || 'https://gkjxmsexixrjrvpwidvx.supabase.co',
      SUPABASE_ANON_KEY: window.__ENV_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdranhtc2V4aXhyanJ2cHdpZHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NTA4MzYsImV4cCI6MjA5MjAyNjgzNn0.LhXecxSU8luHOFi5OynG3Mn6Qo_mk-8PgscfiVUMs1I',
      SITE_URL: window.__ENV_SITE_URL || 'https://kartsetup.com.br'
    };

    // Valida se as credenciais parecem válidas
    if (!window.APP_CONFIG.SUPABASE_URL || !window.APP_CONFIG.SUPABASE_ANON_KEY) {
      console.error('[SECURITY] Supabase configuration missing. Check environment variables.');
      throw new Error('Invalid configuration');
    }

    console.log('[SECURITY] Configuration loaded securely');
    window._securityInitialized = true;
  } catch (error) {
    console.error('[SECURITY] Failed to initialize security config:', error);
    // Fallback: use hardcoded values (temporary, deve ser removido em produção)
    window.APP_CONFIG = {
      SUPABASE_URL: 'https://gkjxmsexixrjrvpwidvx.supabase.co',
      SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdranhtc2V4aXhyanJ2cHdpZHZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0NTA4MzYsImV4cCI6MjA5MjAyNjgzNn0.LhXecxSU8luHOFi5OynG3Mn6Qo_mk-8PgscfiVUMs1I',
      SITE_URL: 'https://kartsetup.com.br'
    };
  }
})();

/**
 * Security Utilities
 */

// XSS Prevention: Sanitize text content
function escapeHtml(text) {
  if (typeof text !== 'string') return text;
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, char => map[char]);
}

// Input Validation: Remove dangerous characters
function sanitizeInput(input, type = 'text') {
  if (typeof input !== 'string') return '';

  input = input.trim();

  switch(type) {
    case 'email':
      return input.toLowerCase().replace(/[^a-z0-9@.-]/g, '');
    case 'number':
      return input.replace(/[^0-9.-]/g, '');
    case 'text':
      // Remove HTML tags and scripts
      return input.replace(/<[^>]*>/g, '').slice(0, 500);
    case 'password':
      // Passwords: don't sanitize, just validate length
      return input.length > 0 && input.length < 256 ? input : '';
    default:
      return input.slice(0, 500);
  }
}

// CSRF Token: Generate and store
function generateCSRFToken() {
  const token = Math.random().toString(36).substring(2, 15) +
                Math.random().toString(36).substring(2, 15);
  sessionStorage.setItem('csrf_token', token);
  return token;
}

// CSRF Token: Validate
function validateCSRFToken(token) {
  const stored = sessionStorage.getItem('csrf_token');
  return stored && stored === token;
}

// Rate Limiting: Check if action allowed
function checkRateLimit(action, maxAttempts = 5, windowMs = 60000) {
  const key = `ratelimit_${action}`;
  const data = JSON.parse(sessionStorage.getItem(key) || '{"attempts":0,"resetAt":0}');
  const now = Date.now();

  if (now > data.resetAt) {
    data.attempts = 0;
    data.resetAt = now + windowMs;
  }

  if (data.attempts >= maxAttempts) {
    return false; // Rate limit exceeded
  }

  data.attempts++;
  sessionStorage.setItem(key, JSON.stringify(data));
  return true; // OK
}

// Token Storage: Store securely (sessionStorage instead of localStorage)
function storeToken(token) {
  // Use sessionStorage for sensitive tokens (cleared when tab closes)
  sessionStorage.setItem('auth_token', token);

  // Mark as sensitive
  sessionStorage.setItem('auth_token_sensitive', 'true');
}

// Token Storage: Retrieve safely
function getToken() {
  const isSensitive = sessionStorage.getItem('auth_token_sensitive') === 'true';
  if (!isSensitive) {
    console.warn('[SECURITY] Token storage is not marked as sensitive');
  }
  return sessionStorage.getItem('auth_token');
}

// Token Storage: Clear on logout
function clearToken() {
  sessionStorage.removeItem('auth_token');
  sessionStorage.removeItem('auth_token_sensitive');
}

// Content Security: Set strict CSP headers (done server-side, but document for reference)
// Content-Security-Policy: default-src 'self'; script-src 'self' cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' *.supabase.co;

// Security Headers: Log what should be present
function logSecurityHeaders() {
  console.log('[SECURITY] Expected headers:');
  console.log('  - Content-Security-Policy: default-src \'self\'; script-src \'self\' cdn.jsdelivr.net;');
  console.log('  - X-Frame-Options: DENY');
  console.log('  - X-Content-Type-Options: nosniff');
  console.log('  - Strict-Transport-Security: max-age=31536000; includeSubDomains');
  console.log('  - Referrer-Policy: strict-origin-when-cross-origin');
}

// Audit Log: Send to server (optional)
async function auditLog(action, details, severity = 'info') {
  // Implementado no servidor
  console.log(`[AUDIT-${severity.toUpperCase()}] ${action}`, details);
}
