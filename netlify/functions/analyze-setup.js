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

// Reference data for best practices (from KART_CHASSIS_DATABASE)
const KART_REFERENCE_DATA = {
  pressures: {
    optimal_min: 0.75,
    optimal_max: 0.85,
    range_min: 0.6,
    range_max: 1.0,
    pressure_difference: 'Front 0.05-0.10 bar lower than rear',
    description: 'Pressões de pneu otimais em bar',
    cold_to_hot_increase: '0.2-0.3 bar',
    by_condition: {
      cold_track: { pressure: '0.80-0.85 bar', reason: 'Higher pressure helps tire heat up faster' },
      high_grip: { pressure: '0.65-0.75 bar', reason: 'Lower pressure prevents overheating' },
      low_grip: { pressure: '0.75-0.85 bar', reason: 'Balanced for all conditions' }
    }
  },

  cambagem: {
    optimal_min: -1.5,
    optimal_max: -1.0,
    range_min: -2.5,
    range_max: -0.5,
    description: 'Cambagem em graus',
    measurement_method: 'Millimeters at wheel rim (~8-12mm = ~1°)',
    effects_too_negative: ['Excessive corner grip', 'Inner tire wear'],
    effects_optimal: ['Balanced grip', 'Even tire wear'],
    kz_range: '-1.0° to -2.0°'
  },

  bitola: {
    narrow_min: 1100,
    narrow_max: 1150,
    wide_min: 1150,
    wide_max: 1250,
    description: 'Bitola em mm',
    note: 'Wider tracks improve stability'
  },

  altura_dianteira: {
    optimal_min: 30,
    optimal_max: 40,
    range_min: 20,
    range_max: 50,
    description: 'Altura dianteira em mm',
    ok_category: '30-40mm',
    kz_category: '35-45mm'
  },

  altura_traseira: {
    optimal_min: 40,
    optimal_max: 50,
    range_min: 30,
    range_max: 60,
    description: 'Altura traseira em mm',
    ok_category: '40-50mm',
    kz_category: '45-55mm'
  },

  suspensao_dianteira: {
    optimal_min: 4,
    optimal_max: 6,
    range_min: 1,
    range_max: 10,
    description: 'Dureza suspenção dianteira',
    options: ['Flat (softest)', 'Round 1.0mm', 'Round 1.5mm', 'Round 2.0mm (stiffest)']
  },

  suspensao_traseira: {
    optimal_min: 4,
    optimal_max: 6,
    range_min: 1,
    range_max: 10,
    description: 'Dureza suspenção traseira',
    blade_configuration: '470mm blade, horizontal position recommended'
  },

  caster: {
    range_min: 4,
    range_max: 8,
    description: 'Ângulo do eixo de direção em graus',
    dry_conditions: '6-8°',
    wet_conditions: 'Maximum available',
    effects: {
      increase: ['More turn-in grip', 'Sharper steering'],
      decrease: ['Lighter steering', 'Less feedback']
    }
  },

  toe: {
    range_min: -3,
    range_max: 3,
    description: 'Ângulo das rodas em mm',
    optimal: '0-3mm toe-out',
    high_speed: '0-1mm (prefer zero)',
    sprint: '1-3mm out'
  },

  axle_hardness: {
    types: ['Soft (Dot 1)', 'Medium (Dot 2)', 'Hard (Dot 3)', 'Very Hard (Dot 4)'],
    standard: 'Medium (most versatile)',
    ok_classes: 'Soft to Medium (lighter, freer handling)',
    kz_classes: 'Medium to Hard (transfer torque)',
    cold_track: 'Soft-Medium',
    hot_track: 'Medium-Hard'
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

// Build analysis prompts with professional racing data
function buildPrompts(setupData) {
  const setupJson = JSON.stringify(setupData, null, 2);
  const refDataJson = JSON.stringify(KART_REFERENCE_DATA, null, 2);

  const professionalContext = `
## PROFESSIONAL KART RACING GUIDELINES (2024-2026)
## MANUFACTURER-SPECIFIC ANALYSIS

### CASTER Adjustment by Manufacturer:
**CRG System (Washer Adjusters):**
- I/I = Minimum caster (light steering)
- II/II = Standard (recommended starting)
- II/III = Progressive
- III/III = Maximum (most turn-in grip)
Effect: Each position significantly affects steering feel. Casters VERY sensitive.

**OTK System (Eccentric Washers):**
- 0° = Initial position
- 90° = Half turn (moderate fine-tuning)
- 180° = Full rotation (maximum change)
Effect: 180° = big change, 90° = fine-tuning
Option: Combine eccentric + concentric washer for progressive adjustment

**Birel ART / Kosmic (CCS Dial):**
- Positions 1-8 (numbered dial)
- Range: ±4° adjustment possible
- Method: Rotate dial, lock with screw
Effect: Smooth, infinitely adjustable within range

**Praga (CCS System):**
- Similar to Birel, ±2° to ±4° possible
- Upper bushing + lower lock method

### ACKERMAN Geometry Effects:
**Kosmic Two-Hole System:**
- Lower holes (default) = MAXIMUM Ackerman = more responsive, better turning radius
- Upper holes = REDUCED Ackerman = lighter steering, less effective
- Pitman PN 0005.F0 (long) = INCREASES grip (both holes further from column)

**Effect on Handling:**
- Maximum Ackerman: Aggressive turn-in, responsive steering, better for technical sections
- Reduced Ackerman: Lighter steering, less responsive, easier for junior drivers
- Critical for understeer vs oversteer diagnosis!

### TOE Specifications:
- Toe IN: 0-3mm (wheels converging inward)
- Toe OUT: 0-3mm (wheels diverging outward)
- Dry/High-speed: Prefer 0-1mm (straight preferred)
- Sprint/Technical: 1-3mm out (better turn-in)

### PARA-CHOQUE (Bump Stop) Analysis:
**Front Height:** 15-30mm | **Rear Height:** 20-35mm
**Rigidity Scale:** 1-10 (1=soft with low bolt torque | 10=firm with maximum torque)
**Effect:** Higher = stiffer chassis, more responsive | Lower = softer compliance
**Key:** Works WITH torsion bars for total chassis stiffness

### GEAR RATIO (Coroa Selection):
- 50 dentes: Max top speed (long, fast pistas only)
- 60-65: Speed-focused (fast circuits with few slow sections)
- 70: Fully balanced (standard, works most situations)
- 75-80: Acceleration-focused (more corners/technical)
- 85 dentes: Max acceleration (short, technical circuits)
**Formula:** Axle teeth / Engine teeth = Gear Ratio

### SEAT INCLINATION Effects:
- Muito Frente: Max front grip, max understeer tendency (junior)
- Frente: Normal turn-in, slightly understeer biased
- Centro: Perfectly balanced, neutral
- Trás: More rear traction, slightly oversteer biased
- Muito Trás: Max rear traction, max oversteer tendency (professional)

### Tire Pressure Critical Facts:
- Cold pressure: 0.65-0.70 bar
- Race pressure: 0.75-0.85 bar
- Hot pressure: 0.95-1.05 bar (can increase 0.2-0.3 bar during run)
- Front ~0.05-0.10 bar lower than rear (typical: 0.75F / 0.80R)
- Too high pressure: center tread overheats, reduces grip
- Too low pressure: shoulder wear, unpredictable handling

### Camber Recommendations by Category:
- Cadet (8-12): -0.5° to -1.5°
- Junior (12-15): -1.0° to -1.5°
- OK Senior (15+): -1.0° to -1.5° (light setup to prevent sticking)
- KZ Senior (15+): -1.0° to -2.0° (stiffer to transfer torque)

### Chassis Category Differences:
- OK: 30mm tubes, slides freely, needs light setup, doesn't stick
- KZ: 32mm tubes, needs greater grip, stiffer setup recommended
- Weight minimum OK: 150kg | KZ: 170kg | KZ2: 175kg

### Axle Hardness Guidelines:
- Soft (Dot 1): Cold track, low-power classes, flexes for compliance
- Medium (Dot 2): Default, most versatile, works in most conditions
- Hard (Dot 3): Hot track, high-power (KZ), forces energy to tires
- Very Hard (Dot 4): Extreme grip conditions

### Professional Setup Patterns:
- High grip track: Lower pressure (0.65-0.75), harder axle, more camber
- Low grip track: Higher pressure (0.80-0.85), softer axle, less camber
- Cold track: Increase pressure to help tire warm up
- Wet: Use maximum caster, slightly higher pressure

### Top Chassis Manufacturers:
- CRG: Most world championships, Washer caster system, medium axle standard
- OTK Group (Tony Kart, Kosmic, Exprit): Eccentric washer caster, sharp front response, massive support
- Birel ART: CCS dial system, forgiving setup window, predictable, great for learning
- Praga: CCS similar to Birel, reliable, adjustable
- Kosmic: Standalone two-hole Ackerman, OTK eccentric washers, proven geometry
- Parolin: 28mm tubes, adaptable to all conditions
`;

  const prompt1 = `You are a professional FIA karting engineer with 15+ years of world championship experience.
Analyze this ADVANCED kart setup using current 2024-2026 professional racing standards.
Focus on manufacturer-specific parameters: Caster system, Ackerman geometry, Para-choques, Gear Ratio, Seat position.

${professionalContext}

ACTUAL ADVANCED SETUP DATA FROM DRIVER:
${setupJson}

PROFESSIONAL REFERENCE DATA:
${refDataJson}

Provide detailed behavioral analysis as JSON:
{
  "tendencia_principal": "oversteer|understeer|neutro",
  "descricao": "2-3 sentence analysis of how this setup will behave, considering Caster+Ackerman+Para-choque interaction",
  "aceleracao": "Describe acceleration (consider gear ratio, para-choque rigidity, seat position)",
  "frenagem": "Describe braking stability (weight distribution from seat, para-choque height)",
  "curva": "Describe cornering (Caster+Ackerman+Toe combined effect on turn-in and mid-corner)",
  "condicoes_pista": ["ideal conditions based on setup: seco, chuva, borracha, grippy, low_grip, etc"],
  "observaciones_manufacturero": "If applicable, comment on how this setup aligns or differs from manufacturer specs (CRG, OTK, Birel, Kosmic, Praga)"
}

Use ONLY professional racing terminology. Reference manufacturer characteristics where relevant.
Analyze combined effects (e.g., Caster II/III + Ackerman upper = less aggressive turn-in).
Respond ONLY with valid JSON, no markdown, no explanation.`;

  const prompt2 = `You are a professional FIA karting engineer. Compare this ADVANCED setup against World Championship standards.
Focus on manufacturer-specific parameters and their interactions.

${professionalContext}

ACTUAL ADVANCED SETUP DATA:
${setupJson}

PROFESSIONAL REFERENCE DATA:
${refDataJson}

Identify deviations from professional best practices, especially for:
- Caster settings by manufacturer (CRG vs OTK vs Birel differences)
- Ackerman geometry effects (understeer vs oversteer)
- Para-choque height/rigidity combo (chassis stiffness)
- Gear ratio vs pista type (acceleration vs top speed)
- Seat position vs weight distribution

{
  "campos_otimos": [
    "List fields that match professional standards exactly"
  ],
  "campos_desviam": [
    {
      "campo": "field name (e.g., caster_esq, parachoques_rigidez)",
      "valor_entrada": "actual value with unit",
      "recomendacao": "professional recommendation with range",
      "razao": "Why this change improves performance (1 sentence)"
    }
  ],
  "campos_alerta": [
    {
      "campo": "critical field name",
      "motivo": "Specific risk or performance issue (e.g., 'Caster III/III + Ackerman upper = too aggressive turn-in risk')"
    }
  ],
  "manufacturer_notes": "If relevant, comment on manufacturer-specific adjustments or combinations that might be off"
}

Focus on fields that meaningfully impact performance and manufacturer specs.
Analyze COMBINATIONS of settings (Caster + Ackerman + Para-choque work together).
Only flag true deviations, not minor variations.
Respond ONLY with valid JSON.`;

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
