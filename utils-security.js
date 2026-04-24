/**
 * Kart Republic - Security Utilities
 * Funções compartilhadas de segurança e validação
 */

// 🔒 Escape HTML para prevenir XSS
function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 🔒 Validar URL (apenas HTTP/HTTPS)
function isValidUrl(urlString) {
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

// 🔒 Whitelist de domínios permitidos para redirecionamento
const ALLOWED_DOMAINS = [
  'cba.org.br',
  'www.cba.org.br',
  'api-inference.huggingface.co'
];

function isAllowedDomain(urlString) {
  try {
    const url = new URL(urlString);
    return ALLOWED_DOMAINS.some(domain =>
      url.hostname === domain || url.hostname === `www.${domain}`
    );
  } catch (_) {
    return false;
  }
}

// 🔒 Abrir link seguro
function openSafeLink(urlString) {
  if (!isValidUrl(urlString)) {
    console.error('❌ URL inválida:', urlString);
    return false;
  }

  if (!isAllowedDomain(urlString)) {
    console.warn('⚠️ Domínio não permitido:', urlString);
    return false;
  }

  window.open(urlString, '_blank', 'noopener,noreferrer');
  return true;
}

// 🔒 Sanitizar dados do localStorage com validação
function loadUserDataSafely(key, defaultValue = {}) {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return defaultValue;

    const parsed = JSON.parse(stored);

    // Validar tipo
    if (typeof parsed !== 'object' || parsed === null) {
      console.warn('❌ Dados inválidos no localStorage');
      return defaultValue;
    }

    return parsed;
  } catch (error) {
    console.error('❌ Erro ao carregar dados do localStorage:', error);
    return defaultValue;
  }
}

// 🔒 Salvar dados no localStorage com validação
function saveUserDataSafely(key, data) {
  try {
    if (data === null || data === undefined) {
      localStorage.removeItem(key);
      return true;
    }

    const serialized = JSON.stringify(data);

    // Verificar quota
    if (serialized.length > 5_000_000) {
      console.error('❌ Dados muito grandes para localStorage');
      return false;
    }

    localStorage.setItem(key, serialized);
    return true;
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error('❌ localStorage cheio - limpe dados antigos');
      return false;
    }
    console.error('❌ Erro ao salvar dados:', error);
    return false;
  }
}

// 🔒 Validar email com regex melhorado
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegex.test(email);
}

// 🔒 Validar senha (mínimo 6 caracteres)
function isValidPassword(password) {
  return password && password.length >= 6;
}

// 🔒 Criar elemento DOM seguro com texto
function createSafeElement(tag, text, className = '') {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (text) {
    element.textContent = text; // Usa textContent para evitar XSS
  }
  return element;
}

// 🔒 Renderizar notícia de forma segura
function createNewsCard(noticia) {
  const card = document.createElement('div');
  card.className = 'setup-card';

  if (noticia.categoria === 'Inscrições') {
    card.style.borderLeft = '4px solid #ff6b6b';
  }

  // Header com icon e categoria
  const header = document.createElement('div');
  header.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';

  const icon = document.createElement('span');
  icon.style.fontSize = '20px';
  icon.textContent = noticia.icon || '📰';
  header.appendChild(icon);

  const badge = document.createElement('span');
  badge.style.cssText = 'color: var(--accent); font-weight: 600; font-size: 11px; text-transform: uppercase; background: rgba(0, 255, 136, 0.2); padding: 2px 8px; border-radius: 3px;';
  badge.textContent = noticia.categoria || 'Notícia';
  header.appendChild(badge);

  if (noticia.status) {
    const status = document.createElement('span');
    status.style.cssText = 'color: #ff6b6b; font-weight: 600; font-size: 11px; text-transform: uppercase; background: rgba(255, 107, 107, 0.2); padding: 2px 8px; border-radius: 3px;';
    status.textContent = noticia.status;
    header.appendChild(status);
  }

  card.appendChild(header);

  // Título
  const titulo = createSafeElement('div', noticia.titulo, 'setup-card-title');
  card.appendChild(titulo);

  // Meta (data + local)
  const meta = document.createElement('div');
  meta.className = 'setup-card-meta';
  meta.textContent = `📅 ${noticia.dataFormatada}${noticia.local ? ` • 📍 ${noticia.local}` : ''}`;
  card.appendChild(meta);

  // Descrição
  const desc = createSafeElement('div', noticia.resumo, 'setup-card-desc');
  card.appendChild(desc);

  // Link
  const link = document.createElement('div');
  link.style.cssText = 'margin-top: 8px; font-size: 12px; color: var(--accent); cursor: pointer;';
  link.textContent = '🔗 Acessar no CBA.ORG.BR →';
  link.onclick = () => openSafeLink(noticia.link);
  card.appendChild(link);

  return card;
}

// 🔒 Exibir mensagem segura (sem innerHTML)
function showMessage(text, type = 'info', duration = 3000) {
  const container = document.getElementById('message-container');
  if (!container) return;

  const message = document.createElement('div');
  message.style.cssText = `
    padding: 12px;
    margin-bottom: 12px;
    border-radius: 6px;
    font-size: 13px;
    background: ${
      type === 'error' ? 'rgba(255, 68, 68, 0.2)' :
      type === 'success' ? 'rgba(0, 255, 136, 0.2)' :
      type === 'warning' ? 'rgba(255, 170, 0, 0.2)' :
      'rgba(56, 189, 248, 0.2)'
    };
    border-left: 4px solid ${
      type === 'error' ? '#ff4444' :
      type === 'success' ? '#00ff88' :
      type === 'warning' ? '#ffaa00' :
      '#38bdf8'
    };
    color: ${
      type === 'error' ? '#ff8888' :
      type === 'success' ? '#00ff88' :
      type === 'warning' ? '#ffaa00' :
      '#38bdf8'
    };
  `;

  message.textContent = text;
  container.appendChild(message);

  if (duration > 0) {
    setTimeout(() => {
      message.style.opacity = '0';
      message.style.transition = 'opacity 0.3s ease';
      setTimeout(() => message.remove(), 300);
    }, duration);
  }
}

// 🔒 Rate limiting simples (client-side)
class SimpleRateLimiter {
  constructor(maxRequests = 5, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = {};
  }

  isAllowed(key = 'global') {
    const now = Date.now();

    if (!this.requests[key]) {
      this.requests[key] = [];
    }

    // Remover requisições antigas
    this.requests[key] = this.requests[key].filter(
      time => now - time < this.windowMs
    );

    if (this.requests[key].length >= this.maxRequests) {
      return false;
    }

    this.requests[key].push(now);
    return true;
  }
}

// 🔒 Fetch com timeout
async function fetchWithTimeout(url, options = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Timeout após ${timeoutMs}ms`);
    }
    throw error;
  }
}

// Export para uso em scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    escapeHtml,
    isValidUrl,
    isAllowedDomain,
    openSafeLink,
    loadUserDataSafely,
    saveUserDataSafely,
    isValidEmail,
    isValidPassword,
    createSafeElement,
    createNewsCard,
    showMessage,
    SimpleRateLimiter,
    fetchWithTimeout
  };
}
