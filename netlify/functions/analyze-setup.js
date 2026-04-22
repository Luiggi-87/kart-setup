/**
 * Netlify Function: Analyze Kart Setup with AI
 * Calls Hugging Face Inference API to analyze setup configuration
 * and provide behavioral diagnosis and best practice comparison
 */

const HF_API_KEY = process.env.HUGGINGFACE_API_KEY;
const HF_MODEL = process.env.HUGGINGFACE_MODEL || 'mistralai/Mistral-7B-Instruct-v0.1';
const HF_API_URL = `https://api-inference.huggingface.co/models/${HF_MODEL}`;

// Rate limiting
const requestCounts = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

// Reference data for best practices
const KART_REFERENCE_DATA = {
  pressures: {
    optimal_min: 0.75,
    optimal_max: 0.85,
    range_min: 0.6,
    range_max: 1.0,
    description: 'Pressões de pneu otimais em bar'
  },
  cambagem: {
    optimal_min: -1.5,
    optimal_max: -1.0,
    range_min: -2.5,
    range_max: -0.5,
    description: 'Cambagem em graus'
  },
  bitola: {
    narrow_min: 1100,
    narrow_max: 1150,
    wide_min: 1150,
    wide_max: 1250,
    description: 'Bitola em mm'
  },
  altura_dianteira: {
    optimal_min: 30,
    optimal_max: 40,
    range_min: 20,
    range_max: 50,
    description: 'Altura dianteira em mm'
  },
  altura_traseira: {
    optimal_min: 40,
    optimal_max: 50,
    range_min: 30,
    range_max: 60,
    description: 'Altura traseira em mm'
  },
  suspensao_dianteira: {
    optimal_min: 4,
    optimal_max: 6,
    range_min: 1,
    range_max: 10,
    description: 'Dureza suspenção dianteira'
  },
  suspensao_traseira: {
    optimal_min: 4,
    optimal_max: 6,
    range_min: 1,
    range_max: 10,
    description: 'Dureza suspenção traseira'
  }
};

// Validate rate limit
function checkRateLimit(clientId) {
  const now = Date.now();
  const key = clientId || 'global';

  if (!requestCounts.has(key)) {
    requestCounts.set(key, []);
  }

  const requests = requestCounts.get(key);
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW);

  if (recentRequests.length >= RATE_LIMIT_MAX) {
    return false;
  }

  recentRequests.push(now);
  requestCounts.set(key, recentRequests);
  return true;
}

// Clean up old rate limit entries
function cleanupRateLimits() {
  const now = Date.now();
  for (const [key, requests] of requestCounts.entries()) {
    const recent = requests.filter(time => now - time < RATE_LIMIT_WINDOW);
    if (recent.length === 0) {
      requestCounts.delete(key);
    } else {
      requestCounts.set(key, recent);
    }
  }
}

// Sanitize setup data
function sanitizeSetup(data) {
  const sanitized = {};
  const allowedFields = [
    'pressao_fl', 'pressao_fr', 'pressao_rl', 'pressao_rr',
    'cambagem_esq', 'cambagem_dir', 'convergencia', 'anti_roll',
    'altura_dianteira', 'altura_traseira', 'suspensao_dianteira', 'suspensao_traseira',
    'bitola', 'distancia_dianteira', 'distancia_traseira',
    'pneu_dianteiro', 'pneu_traseiro', 'temperatura_pneu',
    'disco_dianteiro', 'disco_traseiro', 'pastilha_freio',
    'motor', 'carburador', 'óleo_motor', 'ignição',
    'comentarios'
  ];

  for (const field of allowedFields) {
    if (field in data) {
      const value = data[field];
      // Validate numeric fields
      if (['pressao_fl', 'pressao_fr', 'pressao_rl', 'pressao_rr', 'cambagem_esq', 'cambagem_dir',
           'convergencia', 'anti_roll', 'altura_dianteira', 'altura_traseira', 'suspensao_dianteira',
           'suspensao_traseira', 'bitola', 'distancia_dianteira', 'distancia_traseira',
           'temperatura_pneu', 'disco_dianteiro', 'disco_traseiro', 'ignição'].includes(field)) {
        if (value !== null && value !== undefined) {
          sanitized[field] = Math.max(-999, Math.min(999, parseFloat(value)));
        }
      } else {
        // String fields - limit length and remove special chars
        if (typeof value === 'string') {
          sanitized[field] = value.substring(0, 200).replace(/[<>\"']/g, '');
        }
      }
    }
  }

  return sanitized;
}

// Build analysis prompts
function buildPrompts(setupData) {
  const setupJson = JSON.stringify(setupData, null, 2);
  const refDataJson = JSON.stringify(KART_REFERENCE_DATA, null, 2);

  const prompt1 = `You are an expert kart racing engineer. Analyze this kart setup and provide behavioral diagnosis:

SETUP DATA:
${setupJson}

REFERENCE DATA (optimal ranges):
${refDataJson}

Provide analysis in this JSON structure:
{
  "tendencia_principal": "oversteer" | "understeer" | "neutro",
  "descricao": "detailed analysis of setup behavior",
  "aceleracao": "expected acceleration response",
  "frenagem": "expected braking response",
  "curva": "expected cornering behavior",
  "condicoes_pista": ["seco", "chuva", "borracha", etc]
}

Respond ONLY with valid JSON, no other text.`;

  const prompt2 = `You are an expert kart racing engineer. Compare this setup against professional racing best practices:

SETUP DATA:
${setupJson}

REFERENCE DATA (optimal ranges):
${refDataJson}

Provide analysis in this JSON structure:
{
  "campos_otimos": ["field1", "field2"],
  "campos_desviam": [
    {"campo": "fieldname", "valor_entrada": "value", "recomendacao": "range", "razao": "why"}
  ],
  "campos_alerta": [
    {"campo": "fieldname", "motivo": "reason for alert"}
  ]
}

Respond ONLY with valid JSON, no other text.`;

  return { prompt1, prompt2 };
}

// Call Hugging Face API
async function callHuggingFaceAPI(prompt) {
  try {
    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 1000,
          temperature: 0.3,
          top_p: 0.9
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.status}`);
    }

    const result = await response.json();

    // Extract text from response
    let text = '';
    if (Array.isArray(result)) {
      text = result[0]?.generated_text || '';
    } else if (result.generated_text) {
      text = result.generated_text;
    }

    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in AI response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Hugging Face API call failed:', error);
    throw error;
  }
}

// Parse AI responses
function parseAnalysisResponse(response) {
  try {
    if (typeof response === 'string') {
      return JSON.parse(response);
    }
    return response;
  } catch (e) {
    console.error('Failed to parse response:', e);
    return null;
  }
}

// Generate fallback analysis based on reference data
function generateFallbackAnalysis(setupData) {
  const pressures = [
    setupData.pressao_fl,
    setupData.pressao_fr,
    setupData.pressao_rl,
    setupData.pressao_rr
  ].filter(p => p !== null && p !== undefined);

  const avgPressure = pressures.length > 0 ? pressures.reduce((a, b) => a + b) / pressures.length : 0.75;

  // Determine tendency based on pressure balance
  let tendencia = 'neutro';
  if (setupData.pressao_fl < setupData.pressao_fr - 0.05) {
    tendencia = 'oversteer';
  } else if (setupData.pressao_fl > setupData.pressao_fr + 0.05) {
    tendencia = 'understeer';
  }

  return {
    diagnostico_comportamento: {
      tendencia_principal: tendencia,
      descricao: `Setup com tendência ${tendencia}. Pressão média: ${avgPressure.toFixed(2)} bar. Kart responderá de forma previsível em condições normais.`,
      aceleracao: 'Resposta esperada em aceleração moderada com tendência de ' + tendencia,
      frenagem: 'Frenagem estável com distribuição de peso equilibrada',
      curva: 'Comportamento em curva com tendência ' + tendencia,
      condicoes_pista: ['seco', 'borracha']
    },
    comparacao_praticas: {
      campos_otimos: [],
      campos_desviam: [],
      campos_alerta: []
    },
    sugestoes_ajustes: [],
    confianca: 0.5
  };
}

// Main handler
exports.handler = async (event) => {
  try {
    // CORS
    if (event.httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS'
        }
      };
    }

    // Only POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ message: 'Method not allowed' })
      };
    }

    // Check rate limit
    cleanupRateLimits();
    if (!checkRateLimit()) {
      return {
        statusCode: 429,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ message: 'Too many requests. Máximo 5 análises por minuto.' })
      };
    }

    // Parse body
    let setupData;
    try {
      setupData = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ message: 'Invalid JSON' })
      };
    }

    // Sanitize
    setupData = sanitizeSetup(setupData);

    // Validate
    const fieldCount = Object.values(setupData).filter(v => v !== null && v !== undefined).length;
    if (fieldCount < 3) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ message: 'Preencha pelo menos 3 campos para análise' })
      };
    }

    // Build prompts
    const { prompt1, prompt2 } = buildPrompts(setupData);

    // Call AI (with timeout and error handling)
    let diagnosis = {};
    let comparison = {};

    try {
      // Try to call AI API
      if (HF_API_KEY) {
        console.log('Calling Hugging Face API for diagnosis...');
        diagnosis = await callHuggingFaceAPI(prompt1);
      } else {
        console.warn('HUGGINGFACE_API_KEY not configured');
      }
    } catch (aiError) {
      console.warn('AI diagnosis failed, using fallback:', aiError.message);
      const fallback = generateFallbackAnalysis(setupData);
      diagnosis = fallback.diagnostico_comportamento;
    }

    try {
      // Try to get comparison from AI
      if (HF_API_KEY) {
        console.log('Calling Hugging Face API for comparison...');
        comparison = await callHuggingFaceAPI(prompt2);
      }
    } catch (aiError) {
      console.warn('AI comparison failed:', aiError.message);
      comparison = {
        campos_otimos: [],
        campos_desviam: [],
        campos_alerta: []
      };
    }

    // Build suggestions
    const suggestions = buildSuggestions(setupData, comparison);

    // Calculate confidence
    const confidence = calculateConfidence(setupData, diagnosis);

    // Build response
    const analysis = {
      diagnostico_comportamento: diagnosis || {},
      comparacao_praticas: comparison || {},
      sugestoes_ajustes: suggestions,
      confianca: confidence
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(analysis)
    };
  } catch (error) {
    console.error('Handler error:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ message: 'Erro na análise. Tente novamente.' })
    };
  }
};

// Build suggestions from data
function buildSuggestions(setupData, comparison) {
  const suggestions = [];

  // Add suggestions based on deviations
  if (comparison.campos_desviam) {
    comparison.campos_desviam.forEach(field => {
      suggestions.push({
        prioridade: 'media',
        ajuste: `Ajustar ${field.campo}`,
        motivo: field.razao,
        antes: field.valor_entrada,
        depois: field.recomendacao
      });
    });
  }

  // Limit to top suggestions
  return suggestions.slice(0, 5);
}

// Calculate confidence score
function calculateConfidence(setupData, diagnosis) {
  let confidence = 0.7; // Base confidence

  // More fields filled = higher confidence
  const filledFields = Object.values(setupData).filter(v => v !== null && v !== undefined).length;
  confidence += (filledFields / 25) * 0.2;

  // If diagnosis has good detail, increase confidence
  if (diagnosis && diagnosis.descricao && diagnosis.descricao.length > 50) {
    confidence += 0.1;
  }

  return Math.min(0.95, confidence);
}
