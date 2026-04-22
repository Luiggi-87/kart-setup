# 🤖 AI Analysis Feature — Implementation Guide

## Overview

The AI-powered setup analysis feature allows users to analyze kart configurations and receive intelligent recommendations based on professional racing best practices.

**Status:** ✅ Implemented and Ready for Testing

---

## Files Created

### 1. **app-ai-test.html** — Frontend Test Page
- **Location:** `/app-ai-test.html`
- **Purpose:** Isolated environment for testing AI analysis without impacting production
- **Size:** ~1600 lines (HTML + CSS + JavaScript)

**Features:**
- 28-field setup form organized in 8 logical sections:
  - 🔴 Pressões (4 fields)
  - ⚙️ Cambagem e Alinhamento (4 fields)
  - 📏 Altura e Suspenção (4 fields)
  - ↔️ Bitola (3 fields)
  - 🛞 Pneus (3 fields)
  - 🛑 Freios (3 fields)
  - 🏎️ Motor e Performance (4 fields)
  - ⚡ Configurações Adicionais (1 field)

- **3-Tab Interface:**
  - **Inputs:** Form with all 28 setup fields
  - **Análise:** Real-time display of AI analysis results
  - **Histórico:** Previous analyses with localStorage persistence

- **UI Design:**
  - Matches existing app theme (neon green #00ff88)
  - Glassmorphism effects
  - Responsive on desktop and mobile
  - Beautiful gradient backgrounds

- **Features:**
  - Sample setup loader for quick testing
  - localStorage persistence (last 20 analyses)
  - Detailed analysis results with 4 components
  - Rate limiting messages from backend
  - Educational disclaimer

### 2. **netlify/functions/analyze-setup.js** — Backend Function
- **Location:** `/netlify/functions/analyze-setup.js`
- **Size:** ~450 lines
- **Runtime:** Node.js

**Features:**
- Calls Hugging Face Inference API
- Default model: `mistralai/Mistral-7B-Instruct-v0.1`
- Alternative: `meta-llama/Llama-2-7b-chat-hf`

**Rate Limiting:**
- 5 analyses per minute per client
- Automatic cleanup of old rate limit entries
- Returns 429 status if limit exceeded

**Input Processing:**
- Validates all 25 numeric fields
- Sanitizes string inputs (removes special chars)
- Enforces min/max boundaries
- Requires minimum 3 fields filled

**Output Structure:**
```json
{
  "diagnostico_comportamento": {
    "tendencia_principal": "oversteer|understeer|neutro",
    "descricao": "detailed analysis",
    "aceleracao": "acceleration response",
    "frenagem": "braking response",
    "curva": "cornering behavior",
    "condicoes_pista": ["seco", "chuva", "borracha"]
  },
  "comparacao_praticas": {
    "campos_otimos": ["field1", "field2"],
    "campos_desviam": [
      {
        "campo": "cambagem_esq",
        "valor_entrada": "-1.0°",
        "recomendacao": "-1.5° a -2.0°",
        "razao": "for better grip"
      }
    ],
    "campos_alerta": [
      {"campo": "altura_dianteira", "motivo": "very low, risk of bottoming"}
    ]
  },
  "sugestoes_ajustes": [
    {
      "prioridade": "alta|media|baixa",
      "ajuste": "Increase front camber",
      "motivo": "for better cornering grip",
      "antes": "-1.0°",
      "depois": "-1.5°"
    }
  ],
  "confianca": 0.85
}
```

**Fallback Logic:**
- If Hugging Face API fails, returns analysis based on reference data
- Maintains service reliability even without API key
- Confidence score adjusts based on setup detail level

### 3. **.env.example** — Updated Configuration
- **New Variables:**
  - `HUGGINGFACE_API_KEY`: Free API key from huggingface.co
  - `HUGGINGFACE_MODEL`: Model identifier (default: Mistral-7B-Instruct-v0.1)

---

## Setup Instructions

### Step 1: Get Hugging Face API Key

1. Visit [huggingface.co](https://huggingface.co)
2. Sign up for free account (no credit card required)
3. Go to Settings → Access Tokens
4. Create new token with "Read" access
5. Copy the token

### Step 2: Configure Netlify

1. Go to Netlify Dashboard → Site Settings → Build & Deploy → Environment
2. Add new variable:
   ```
   HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxx
   ```
3. (Optional) Add model preference:
   ```
   HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.1
   ```
4. Deploy will automatically use new variables

### Step 3: Test Locally (Optional)

If running locally with `netlify dev`:

```bash
# Create .env file (not in git)
cat > .env << EOF
HUGGINGFACE_API_KEY=hf_xxxxxxxxxxxx
HUGGINGFACE_MODEL=mistralai/Mistral-7B-Instruct-v0.1
EOF

# Run Netlify dev
netlify dev

# Visit http://localhost:8888/app-ai-test.html
```

---

## Testing Guide

### Basic Functionality Test

1. **Access the page:**
   - Local: `http://localhost:8888/app-ai-test.html`
   - Production: `https://kartsetup.com.br/app-ai-test.html`

2. **Load sample setup:**
   - Click "📋 Carregar Exemplo"
   - Should populate all fields with balanced racing setup

3. **Analyze setup:**
   - Click "🔍 Analisar com IA"
   - Should show spinner during processing (5-30 seconds depending on API)
   - Should display results in "Análise" tab

4. **Check history:**
   - Switch to "📚 Histórico" tab
   - Should see the analysis you just created
   - Click to view again

5. **Test localStorage:**
   - Refresh the page
   - Go to Histórico tab
   - Previous analyses should still be there

### API Testing

**Test endpoint directly:**

```bash
curl -X POST http://localhost:8888/.netlify/functions/analyze-setup \
  -H "Content-Type: application/json" \
  -d '{
    "pressao_fl": 0.75,
    "pressao_fr": 0.75,
    "cambagem_esq": -1.5,
    "altura_dianteira": 35
  }'
```

**Expected response:**
```json
{
  "diagnostico_comportamento": {...},
  "comparacao_praticas": {...},
  "sugestoes_ajustes": [...],
  "confianca": 0.85
}
```

### Rate Limiting Test

1. **Test rate limit:**
   - Modify frontend to auto-submit 6 times
   - 6th request should return 429 error
   - Message: "Too many requests. Máximo 5 análises por minuto."

2. **Test recovery:**
   - Wait 60 seconds
   - Should be able to submit again

### Error Handling Tests

1. **Invalid JSON:**
   ```bash
   curl -X POST ... -d 'invalid'
   # Expected: 400 Bad Request
   ```

2. **Too few fields:**
   - Submit form with 2 fields filled
   - Expected: 400 "Preencha pelo menos 3 campos"

3. **API timeout:**
   - Set HUGGINGFACE_API_KEY to invalid value
   - Should fall back to reference-based analysis
   - Confidence score should be ~0.5

---

## Architecture

### Frontend → Backend Flow

```
app-ai-test.html
    ↓
Form with 28 fields
    ↓
User clicks "Analisar com IA"
    ↓
JavaScript validates (3+ fields)
    ↓
POST to /.netlify/functions/analyze-setup
    ↓
analyze-setup.js
    ├─ Check rate limit (5/min)
    ├─ Sanitize input (remove special chars)
    ├─ Build AI prompts
    └─ Call Hugging Face API
        ├─ If success: parse JSON response
        ├─ If fail: return fallback analysis
        └─ Add confidence score
    ↓
Return JSON to frontend
    ↓
JavaScript displays results
    ↓
localStorage saves analysis
    ↓
Show in Histórico tab
```

### Reference Data

The function includes professional kart racing reference data:

```javascript
KART_REFERENCE_DATA = {
  pressures: { optimal: 0.75-0.85 bar },
  cambagem: { optimal: -1.0 to -1.5° },
  bitola: { narrow: 1100-1150mm, wide: 1150-1250mm },
  altura_dianteira: { optimal: 30-40mm },
  altura_traseira: { optimal: 40-50mm },
  suspensao: { optimal: 4-6 stiffness }
}
```

Used for:
- Comparison analysis
- Fallback diagnosis
- Confidence scoring

---

## Performance Considerations

### API Response Time
- **With Hugging Face API:** 5-30 seconds
  - Cold start (model loading): ~15s
  - Warm start (cached): ~5s
- **Without API (fallback):** <1 second

### Storage
- **localStorage limit:** ~5-10MB per origin
- **Stored analyses:** ~2KB each
- **Max history:** 20 analyses = ~40KB

### Network
- **Request size:** ~1-2KB
- **Response size:** ~2-5KB
- **Suitable for:** Mobile networks

---

## Limitations & Future Improvements

### Current Limitations

1. **API Dependency:**
   - Requires HUGGINGFACE_API_KEY configured
   - Without key, falls back to reference-based analysis (less detailed)
   - Free tier has rate limits on Hugging Face

2. **Model Training:**
   - Uses general-purpose models (Mistral, LLaMA)
   - Not specifically trained on kart racing data
   - May give generic advice

3. **No Telemetry Integration:**
   - Analyzes setup in isolation
   - Can't correlate with actual lap times
   - Suggestions are theoretical

### Future Enhancements

1. **Integration with Main App:**
   - Add AI analysis modal to app.html
   - Analyze setup before saving
   - Show confidence badge on saved setups

2. **Telemetry Correlation:**
   - Compare AI recommendations with actual performance
   - Improve suggestions based on real data
   - Create custom model from historical data

3. **Advanced Features:**
   - Multi-setup comparison
   - Season progression tracking
   - Driver-specific recommendations
   - Weather-based adjustments

4. **Localization:**
   - Train custom model on Portuguese racing terminology
   - Support multiple languages
   - Regional best practices

---

## Troubleshooting

### "Analyzing..." hangs for 30+ seconds
- **Cause:** Hugging Face API is slow or model is loading
- **Solution:** Wait, or check if API key is valid
- **Workaround:** Fallback should kick in after timeout

### Empty analysis results
- **Cause:** API returned invalid JSON
- **Solution:** Check browser console for errors
- **Debug:** Call API directly with curl to test

### Rate limit errors
- **Cause:** More than 5 analyses per minute
- **Solution:** Wait 60 seconds before trying again
- **Expected:** This is by design to prevent abuse

### localStorage full
- **Cause:** Too many analyses saved
- **Solution:** Clear browser data, or limit to last 10 analyses
- **Note:** App will still work, just won't save new analyses

### HUGGINGFACE_API_KEY not working
- **Check:**
  1. Token starts with `hf_`
  2. Token has "Read" access
  3. Token not expired
  4. Variable set in Netlify (not .env)
- **Workaround:** Function still works with fallback analysis

---

## Files Structure

```
/
├── app-ai-test.html                    (1600 lines — HTML+CSS+JS frontend)
├── .env.example                        (updated with HF variables)
└── netlify/
    └── functions/
        └── analyze-setup.js            (450 lines — backend function)
```

**Total additions:** ~2100 lines of code

---

## Next Steps

1. ✅ Files created and committed to GitHub
2. ⏳ Configure HUGGINGFACE_API_KEY in Netlify
3. ⏳ Deploy to production
4. ⏳ Test with real kart setup data
5. ⏳ Consider integration into main app
6. ⏳ Gather user feedback on analysis quality
7. ⏳ Fine-tune prompts based on feedback

---

## Support & Questions

For issues or questions:

1. Check Netlify function logs (Functions → Recent invocations)
2. Check browser console (F12 → Console)
3. Check GitHub issues for similar problems
4. Review this guide's Troubleshooting section

---

**Created:** 2026-04-22  
**Feature:** 🤖 AI-Powered Setup Analysis  
**Environment:** Isolated test page (app-ai-test.html)  
**Status:** Ready for testing and deployment

