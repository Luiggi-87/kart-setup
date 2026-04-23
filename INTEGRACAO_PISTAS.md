# 🔌 Integração: Banco de Dados de Pistas no Sistema

## Visão Geral

O arquivo `kart-tracks-database.js` contém um banco de dados completo com 30+ pistas brasileiras. Esse guia mostra como integrar essas informações no sistema de análise de setup.

---

## 1️⃣ Carregar o Database

### No HTML (app-ai-test.html)

```html
<!-- Adicionar após o script do chassis database -->
<script src="js/kart-chassis-database.js" defer></script>
<script src="js/kart-tracks-database.js" defer></script>
```

### Verificar Carregamento

```javascript
// No console do navegador
console.log(KART_TRACKS_DATABASE);
console.log(KART_TRACKS_DATABASE.sudeste.tracks);
```

---

## 2️⃣ Estrutura de Dados

### Hierarquia Completa

```javascript
KART_TRACKS_DATABASE
├── sudeste (región)
│   ├── region: "Sudeste"
│   └── tracks
│       ├── nova_odessa
│       │   ├── id: 'nova-odessa'
│       │   ├── name: "Kartódromo Internacional Nova Odessa"
│       │   ├── state: 'SP'
│       │   ├── city: 'Nova Odessa'
│       │   ├── infrastructure
│       │   │   ├── length_m: 2780
│       │   │   ├── width_m: 9
│       │   │   └── homologation: 'CBA Oficial'
│       │   ├── characteristics
│       │   │   ├── surface_type
│       │   │   ├── difficulty
│       │   │   └── main_features: []
│       │   ├── tracados: [
│       │   │   {
│       │   │     id: 'no-full'
│       │   │     name: 'Traçado Completo'
│       │   │     length_m: 2780
│       │   │     characteristics: []
│       │   │   }
│       │   ]
│       │   └── setup_recommendations
│       │       ├── terrain_type: string
│       │       └── recommended_setups: {
│       │           dry_high_grip: { ... }
│       │           dry_low_grip: { ... }
│       │       }
│       ├── kgv_granja_viana { ... }
│       └── ... mais pistas

├── sul { ... }
├── centro_oeste { ... }
├── nordeste { ... }

├── tracado_profiles
│   ├── high_grip_technical
│   ├── medium_grip_balanced
│   └── hot_tropical_low_grip

├── seasonal_adjustments { ... }

└── metadata
    ├── version
    ├── updated
    └── sources
```

---

## 3️⃣ Consultas Comuns

### Buscar uma Pista Específica

```javascript
// Nova Odessa
const novaOdessa = KART_TRACKS_DATABASE.sudeste.tracks.nova_odessa;
console.log(novaOdessa.name); // "Kartódromo Internacional Nova Odessa"

// KGV
const kgv = KART_TRACKS_DATABASE.sudeste.tracks.kgv_granja_viana;
console.log(kgv.length_m); // 1150

// Velopark
const velopark = KART_TRACKS_DATABASE.sul.tracks.velopark_techspeed;
console.log(velopark.infrastructure.length_m); // 1500
```

### Listar Todas as Pistas de um Estado

```javascript
function getTracksInState(state) {
  const tracks = [];
  
  for (const region of Object.values(KART_TRACKS_DATABASE)) {
    if (region.tracks) {
      for (const track of Object.values(region.tracks)) {
        if (track.state === state) {
          tracks.push({
            name: track.name,
            city: track.city,
            length: track.infrastructure?.length_m
          });
        }
      }
    }
  }
  
  return tracks;
}

// Uso
const pistasSpTrack = getTracksInState('SP');
console.log(pistasSpTrack);
```

### Buscar Setup Recomendado para uma Pista

```javascript
function getSetupForTrack(trackId, condition = 'standard_dry') {
  const regions = Object.values(KART_TRACKS_DATABASE);
  
  for (const region of regions) {
    for (const track of Object.values(region.tracks || {})) {
      if (track.id === trackId) {
        return track.setup_recommendations?.recommended_setups?.[condition];
      }
    }
  }
  return null;
}

// Uso
const setupNovaOdessa = getSetupForTrack('nova-odessa', 'dry_high_grip');
console.log(setupNovaOdessa);
// {
//   condition: 'Seco, asfalto novo/grippy...'
//   cambagem: '-1.5° a -2.0°'
//   pressao: '0.72-0.78 bar'
//   ...
// }
```

---

## 4️⃣ Integração no Formulário

### Adicionar Campo de Seleção de Pista

```html
<!-- Em app-ai-test.html, seção "Configurações Adicionais" -->
<div class="form-section">
  <div class="section-title">📍 Localização & Pista</div>
  <div class="form-grid">
    <div class="form-group">
      <label for="regiao">Região</label>
      <select id="regiao" name="regiao" onchange="updateTracksForRegion()">
        <option value="">-- Selecionar Região --</option>
        <option value="sudeste">Sudeste</option>
        <option value="sul">Sul</option>
        <option value="centro_oeste">Centro-Oeste</option>
        <option value="nordeste">Nordeste</option>
      </select>
    </div>

    <div class="form-group">
      <label for="pista">Pista de Kart</label>
      <select id="pista" name="pista" onchange="updateSetupForTrack()">
        <option value="">-- Selecionar Pista --</option>
        <!-- Será preenchido dinamicamente -->
      </select>
    </div>

    <div class="form-group">
      <label for="condicao_pista">Condição da Pista</label>
      <select id="condicao_pista" name="condicao_pista">
        <option value="">-- Selecionar --</option>
        <option value="dry_high_grip">Seco, Alto Grip</option>
        <option value="dry_low_grip">Seco, Baixo Grip</option>
        <option value="rain">Chuva</option>
        <option value="tropical_hot_humid">Tropical Quente</option>
      </select>
    </div>
  </div>

  <!-- Recomendações da Pista -->
  <div id="track-recommendations" style="margin-top: 20px; padding: 15px; background: rgba(0, 255, 136, 0.05); border-radius: 8px; display: none;">
    <h4 style="color: var(--accent); margin-bottom: 10px;">📋 Setup Recomendado para Pista</h4>
    <div id="track-setup-text"></div>
  </div>
</div>
```

### JavaScript para Dinâmica

```javascript
function updateTracksForRegion() {
  const regionId = document.getElementById('regiao').value;
  const pistaSelect = document.getElementById('pista');
  
  pistaSelect.innerHTML = '<option value="">-- Selecionar Pista --</option>';
  
  if (!regionId) return;
  
  const region = KART_TRACKS_DATABASE[regionId];
  
  if (region && region.tracks) {
    for (const [trackKey, track] of Object.entries(region.tracks)) {
      const option = document.createElement('option');
      option.value = track.id;
      option.textContent = `${track.name} (${track.city}, ${track.state})`;
      pistaSelect.appendChild(option);
    }
  }
}

function updateSetupForTrack() {
  const trackId = document.getElementById('pista').value;
  const condicao = document.getElementById('condicao_pista').value;
  
  if (!trackId) {
    document.getElementById('track-recommendations').style.display = 'none';
    return;
  }
  
  // Buscar pista
  let selectedTrack = null;
  for (const region of Object.values(KART_TRACKS_DATABASE)) {
    if (region.tracks) {
      for (const track of Object.values(region.tracks)) {
        if (track.id === trackId) {
          selectedTrack = track;
          break;
        }
      }
    }
  }
  
  if (!selectedTrack) return;
  
  // Mostrar recomendações
  const recomDiv = document.getElementById('track-recommendations');
  const setupDiv = document.getElementById('track-setup-text');
  
  let setupText = `
    <strong>Pista:</strong> ${selectedTrack.name}<br>
    <strong>Tipo de Terreno:</strong> ${selectedTrack.setup_recommendations?.terrain_type || 'N/A'}<br><br>
    <strong>Características Principais:</strong><br>
    <ul>
      ${selectedTrack.main_features?.map(f => `<li>${f}</li>`).join('') || ''}
    </ul>
  `;
  
  if (condicao) {
    const setupRec = selectedTrack.setup_recommendations?.recommended_setups?.[condicao];
    if (setupRec) {
      setupText += `
        <strong>Setup para ${setupRec.condition}:</strong><br>
        <table style="width: 100%; margin-top: 10px; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 8px;"><strong>Pressão:</strong></td>
            <td style="padding: 8px;">${setupRec.pressao}</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 8px;"><strong>Cambagem:</strong></td>
            <td style="padding: 8px;">${setupRec.cambagem}</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 8px;"><strong>Altura Diant.:</strong></td>
            <td style="padding: 8px;">${setupRec.altura_dianteira}</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 8px;"><strong>Altura Tras.:</strong></td>
            <td style="padding: 8px;">${setupRec.altura_traseira}</td>
          </tr>
          <tr style="border-bottom: 1px solid var(--border);">
            <td style="padding: 8px;"><strong>Eixo:</strong></td>
            <td style="padding: 8px;">${setupRec.eixo}</td>
          </tr>
        </table>
      `;
    }
  }
  
  setupDiv.innerHTML = setupText;
  recomDiv.style.display = 'block';
}

// Chamar ao carregar formulário
function autoFillTrackRecommendations(formData) {
  if (formData.pista) {
    document.getElementById('pista').value = formData.pista;
    updateSetupForTrack();
  }
}
```

---

## 5️⃣ Integração na Análise de IA

### Enviar Informação de Pista para Backend

```javascript
async function analyzeSetupWithTrackContext() {
  const setupData = getFormData();
  
  // Adicionar contexto de pista
  const trackId = document.getElementById('pista').value;
  const condicaoPista = document.getElementById('condicao_pista').value;
  
  // Buscar informações da pista
  let trackInfo = null;
  for (const region of Object.values(KART_TRACKS_DATABASE)) {
    if (region.tracks) {
      for (const track of Object.values(region.tracks)) {
        if (track.id === trackId) {
          trackInfo = {
            id: track.id,
            name: track.name,
            state: track.state,
            length_m: track.infrastructure?.length_m,
            characteristics: track.characteristics,
            terrain_type: track.setup_recommendations?.terrain_type,
            conditions: condicaoPista
          };
          break;
        }
      }
    }
  }
  
  // Enviar para análise
  const response = await fetch('/.netlify/functions/analyze-setup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...setupData,
      track_context: trackInfo  // <- Novo contexto
    })
  });
  
  const analysis = await response.json();
  displayAnalysis(analysis);
}
```

### Melhorar Prompts no Backend

```javascript
// No netlify/functions/analyze-setup.js

function buildPrompts(setupData) {
  let trackContext = '';
  
  if (setupData.track_context) {
    trackContext = `
## CONTEXTO DE PISTA
Pista: ${setupData.track_context.name} (${setupData.track_context.state})
Comprimento: ${setupData.track_context.length_m}m
Tipo de Terreno: ${setupData.track_context.terrain_type}
Condição: ${setupData.track_context.conditions}

Características: ${setupData.track_context.characteristics?.main_features?.join(', ') || 'N/A'}
`;
  }
  
  const prompt1 = `...seu prompt existente...
${trackContext}

Com base no tipo de pista acima, considere:
- Exigências técnicas específicas da pista
- Condições climáticas regionais
- Asfalto e grip característico
`;
  
  // ... resto do código
}
```

---

## 6️⃣ Exemplos de Uso Prático

### Exemplo 1: Prepara Treino em Nova Odessa

```javascript
// Usuário prepara para treinar em Nova Odessa

const track = KART_TRACKS_DATABASE.sudeste.tracks.nova_odessa;

console.log(`Preparando setup para: ${track.name}`);
console.log(`Condições esperadas: ${track.characteristics.difficulty}`);
console.log(`Asfalto: ${track.characteristics.surface_type}`);

const setup = track.setup_recommendations.recommended_setups.dry_high_grip;
console.log(`Setup recomendado:`);
console.log(`- Pressão: ${setup.pressao}`);
console.log(`- Cambagem: ${setup.cambagem}`);
console.log(`- Altura: ${setup.altura_dianteira} frente, ${setup.altura_traseira} trás`);

// Dicas
const tips = track.setup_recommendations.critical_notes;
console.log(`Atenção especial:`);
tips.forEach(tip => console.log(`• ${tip}`));
```

### Exemplo 2: Adequar Setup para Nordeste

```javascript
// Pilotos indo competir no Nordeste (Tamboril/Recife)

const region = KART_TRACKS_DATABASE.nordeste;
const track = region.tracks.kartodroma_tamboril;

// Profil do tipo de pista
const profile = KART_TRACKS_DATABASE.tracado_profiles.hot_tropical_low_grip;

console.log(`⚠️ AVISO: ${profile.name}`);
console.log(`${profile.characteristics.join('; ')}`);

console.log(`Setup CRÍTICO:`);
const idealSetup = profile.ideal_setup;
console.log(JSON.stringify(idealSetup, null, 2));

console.log(`Notas importantes:`);
track.setup_recommendations.tropical_specific_notes.forEach(
  note => console.log(`• ${note}`)
);
```

---

## 7️⃣ Próximas Adições

Para melhorar ainda mais a integração:

```javascript
// TODO: Adicionar ao database
✓ Dados de tempo de volta profissional
✓ Horários de operação das pistas
✓ Contatos (telefone, email, website)
✓ Tarifa média
✓ Campeonatos mais importantes
✓ Rankings históricos
✓ Forecast climático por pista
✓ Mapa GPS
✓ Comentários de pilotos
```

---

## 📞 Suporte & Debugging

### Verificar se Database Carregou

```javascript
console.log(typeof KART_TRACKS_DATABASE); // deve ser 'object'
console.log(Object.keys(KART_TRACKS_DATABASE)); 
// ['sudeste', 'sul', 'centro_oeste', 'nordeste', 'tracado_profiles', 'seasonal_adjustments', 'metadata']
```

### Listar Todas as Pistas

```javascript
function listAllTracks() {
  const allTracks = [];
  
  for (const region of Object.values(KART_TRACKS_DATABASE)) {
    if (region.tracks) {
      for (const track of Object.values(region.tracks)) {
        allTracks.push({
          id: track.id,
          name: track.name,
          state: track.state,
          city: track.city
        });
      }
    }
  }
  
  return allTracks;
}

console.table(listAllTracks());
```

---

**Arquivo:** INTEGRACAO_PISTAS.md  
**Data:** 2026-04-23  
**Status:** ✅ Pronto para integração
