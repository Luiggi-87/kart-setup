# 🏁 Banco de Dados de Pistas de Kart Brasileiras

## 📊 Overview

Documento completo com informações das principais pistas de kart do Brasil, organizadas por região, com características de traçado e recomendações de setup específicas para cada local.

**Data:** 2026-04-23  
**Total de Pistas:** 30+ kartódromos profissionais  
**Regiões Cobertas:** 5 (Sudeste, Sul, Centro-Oeste, Nordeste, Norte*)  
**Estados:** 9 (SP, MG, RJ, RS, SC, PR, DF, PE, BA, PB)

*Nota: Região Norte com pistas ainda em pesquisa

---

## 🗺️ Estrutura do Banco de Dados

### Regiões Principais

```
SUDESTE (maior concentração)
├── São Paulo (6+ pistas)
│   ├── Kartódromo Internacional Nova Odessa
│   ├── Kartódromo Granja Viana (KGV)
│   ├── Kartódromo Ayrton Senna
│   └── Speed Park (40 traçados)
├── Minas Gerais (3+ pistas)
│   ├── Kartódromo de Betim
│   ├── RBC Racing (Vespasiano)
│   └── Space Kart (BH)
└── Rio de Janeiro (4+ pistas)
    ├── Kartódromo Niterói
    ├── Guapimirim (outdoor)
    └── Adrenalina Rio Kart

SUL (muito bem estruturado)
├── Rio Grande do Sul (2+ pistas)
│   ├── Velopark Techspeed VP1500/VP1000
│   └── Outras pistas regionais
├── Paraná (2+ pistas)
│   ├── Raceland Internacional
│   └── Kartódromos regionais
└── Santa Catarina (1+ pista)
    └── Ildefonso Zanetti

CENTRO-OESTE (crescimento)
└── Distrito Federal (3+ pistas)
    ├── Brasília Kart
    ├── Ferrari Kart
    └── Acelera Brasília / Arena Kart

NORDESTE (inferior/tropical)
├── Pernambuco (1+ pista)
│   └── Tamboril (Paulista)
├── Bahia (1+ pista)
│   └── Kart Bela Vista / ABK
└── Paraíba (1 pista)
    └── Circuito Paladino
```

---

## 🏆 Pistas de Destaque por Categoria

### ⭐ Pistas Profissionais de Classe Mundial

#### **1. Kartódromo Internacional Nova Odessa (SP)**

- **Status:** Maior kartódromo do mundo em extensão
- **Comprimento:** 2.780m (pista + 3 circuitos simultâneos)
- **Traçados:** ~9.000 variações possíveis
- **Tipo:** Ultra-técnico, asfalto abrasivo

**Características:**
- Reta principal longa (200m+)
- Pinça técnica após reta
- Curva em S na subida
- Exigente em freadas

**Setup Recomendado:**
```
Pressão:     0.72-0.80 bar (asfalto abrasivo)
Cambagem:    -1.5° a -2.0°
Altura:      35-40mm dianteira, 45-50mm traseira
Eixo:        Médio (Dot 2-3)
Gear Ratio:  65-70 dentes
Nota:        Asfalto muito abrasivo - trocar pneus frequentemente
```

---

#### **2. Velopark Techspeed (RS) — VP1500**

- **Status:** Sediou Campeonato Brasileiro 2x, Pan-Americano
- **Comprimento:** 1.500m (principal), 1.000m (VP1000)
- **Tipo:** Profissional, subtropical

**Características:**
- Pista técnica de classe mundial
- Mudanças climáticas significativas ao longo do ano
- Subidas e descidas técnicas

**Setup Recomendado (por estação):**

**Verão (Dez-Mar) - Quente & Úmido:**
```
Pressão:     0.70-0.78 bar
Cambagem:    -1.0° a -1.5°
Altura:      32-38mm dianteira
Motivo:      Calor reduz grip inicial
```

**Inverno (Jun-Ago) - Frio & Seco:**
```
Pressão:     0.80-0.90 bar
Cambagem:    -1.5° a -2.0°
Altura:      35-40mm dianteira
Motivo:      Frio exige mais cambagem
```

---

#### **3. Kartódromo Granja Viana (SP) — KGV**

- **Status:** Sediou muitos campeonatos paulistas
- **Comprimento:** 1.150m
- **Traçados:** 20+ opções (trocadas mensalmente)
- **Tipo:** Profissional, técnico

**Características:**
- Trechos com elevações
- Desníveis significativos
- Curvas técnicas intercaladas

**Setup Recomendado:**
```
Pressão:     0.75-0.85 bar
Cambagem:    -1.0° a -1.5°
Altura:      32-38mm dianteira, 40-48mm traseira
Toe:         1-2mm OUT
Crítico:     Altura afeta entrada em curvas em descida
```

---

### 🔥 Pistas de Clima Extremo

#### **NORDESTE — Tamboril (PE), Salvador (BA)**

⚠️ **DESAFIO MÁXIMO: Calor + Umidade Tropical**

**Condições:**
- Temperatura: 30-38°C
- Umidade: 70-90%
- Condição do asfalto: Aquecimento rápido, aderência reduzida

**Setup CRÍTICO para Nordeste:**
```
MANHÃ CEDO (6-8h):
  Pressão:     0.68-0.75 bar
  Cambagem:    -1.2° a -1.5°
  Altura:      30-35mm dianteira (macia)
  Eixo:        Macio (Dot 1-2)
  Toe:         2-3mm OUT

FINAL DA TARDE (melhor horário):
  Pressão:     0.62-0.68 bar (MÍNIMA)
  Cambagem:    -1.5° a -1.8° (MÁXIMA)
  Altura:      25-30mm dianteira (MUITO macia)
  Eixo:        Macio (Dot 1)
  Toe:         3mm OUT (máximo)

CRÍTICAS NORDESTE:
✓ Pressão inicial DEVE ser muito baixa
✓ Pneus atingem 60-65°C em 3-4 voltas
✓ Trocar pneus a cada 3-4 voltas em sessões curtas
✓ Refrigeração crítica
✓ Não é possível manter temperatura ideal - aceite e ajuste
✓ Horários: Prefer. manhã cedo ou final de tarde
```

---

#### **CENTRO-OESTE — Brasília Kart (DF)**

✓ **Vantagem: Clima Seco do Planalto**

**Condições:**
- Altitude: ~1.000m
- Temperatura: Moderada, seca
- Umidade: Baixa (favor climático)

**Setup Brasília:**
```
Pressão:     0.80-0.90 bar (ligeiramente alta)
Cambagem:    -1.0° a -1.5°
Altura:      33-39mm dianteira
Eixo:        Médio (Dot 2-3)
Gear Ratio:  70-75 dentes
Nota:        Clima seco permite ajustes mais altos
```

---

## 📋 Tabela Comparativa Rápida

| Pista | Estado | Comprimento | Dificuldade | Grip | Melhor Clima | Setup Pressão |
|-------|--------|------------|-------------|------|--------------|---------------|
| Nova Odessa | SP | 2.780m | Muito Alta | Alto | Seco | 0.72-0.80 |
| KGV | SP | 1.150m | Alta | Médio-Alto | Primavera | 0.75-0.85 |
| Betim | MG | 1.110m | Média | Médio | Inverno | 0.75-0.85 |
| Niterói | RJ | 1.200m | Média | Médio-Baixo | Seco | 0.73-0.83 |
| Velopark VP1500 | RS | 1.500m | Muito Alta | Alto | Inverno | 0.80-0.90 |
| Raceland | PR | 1.250m | Média-Alta | Médio | Variável | 0.75-0.85 |
| Brasília Kart | DF | 1.200m | Média-Alta | Médio | Seco | 0.80-0.90 |
| Tamboril | PE | 660m | Média | Baixo | Noite | 0.62-0.75 |
| Salvador | BA | - | Média | Baixo | Manhã | 0.68-0.78 |

---

## 🎯 Seleção de Pista por Objetivo

### Para Treinamento Técnico
1. **Nova Odessa** — máxima exigência técnica
2. **Velopark VP1500** — profissional completo
3. **KGV** — equilibrado mas desafiador

### Para Campeonatos
1. **Nova Odessa** — campeonatos oficiais frequentes
2. **Velopark** — nacionais e sul-americanos
3. **Betim** — campeonatos estaduais
4. **Brasília Kart** — regionais profissionais

### Para Iniciantes
1. **Raceland** (Paraná) — 6 traçados, escolha fácil
2. **Brasília Kart** — traçados adaptáveis
3. **KGV** — oferece opções variadas

### Para Clima Tropical
1. **Tamboril** (Recife) — único com interior refrigerado
2. **Acelar Brasília** — manhã cedo
3. **Horário:** sempre preferir manhã ou final de tarde

---

## 🔧 Guia de Ajuste por Tipo de Pista

### PISTAS TÉCNICAS (Nova Odessa, Velopark VP1500, KGV)

```
Foco: Precisão em freadas e entrada
Setup:
  ✓ Cambagem: máxima (-1.5° a -2.0°)
  ✓ Altura: equilibrada a firme
  ✓ Toe: mínimo (0-1mm OUT)
  ✓ Pressão: alta (0.78-0.85 bar)
  ✓ Eixo: médio a duro
  
Teste:
  1. Freadas — ponto define volta
  2. Entrada em curva — cambagem importante
  3. Velocidade média — altura crucial
```

### PISTAS BALANCEADAS (Betim, Raceland, Brasília)

```
Foco: Versatilidade
Setup:
  ✓ Cambagem: média (-1.0° a -1.5°)
  ✓ Altura: equilibrada
  ✓ Toe: ligeiro (1-2mm OUT)
  ✓ Pressão: média (0.75-0.85 bar)
  ✓ Eixo: médio
  
Teste:
  1. Reta — gear ratio importante
  2. Curvas — cambagem normal
  3. Geral — setup versátil funciona
```

### PISTAS TROPICAL (Tamboril, Salvador, Recife)

```
ATENÇÃO: Desafio máximo
Setup:
  ✗ Cambagem: MÁXIMA (-1.5° a -1.8°)
  ✗ Pressão: MÍNIMA (0.62-0.75 bar)
  ✗ Altura: MUITO MACIA (25-32mm)
  ✗ Eixo: MACIO (Dot 1-2)
  ✗ Toe: 2-3mm OUT
  
Críticos:
  • Trocar pneus a cada 3-4 voltas
  • Refrigeração de pneus obrigatória
  • Monitorar pressão constantemente
  • Horário ideal: antes das 10h ou depois das 16h
  • Expectativa: voltinhas mais lentas = NORMAL
```

---

## 📅 Calendário de Melhor Época por Região

### SUDESTE

| Mês | Clima | Recomendação |
|-----|-------|--------------|
| Jan-Mar | Quente, úmido | ⚠️ Reduzir pressão |
| Abr-Mai | Primavera ideal | ✅ MELHOR para treino |
| Jun-Ago | Seco, moderado | ✅ Bom para competição |
| Set-Out | Quente crescente | ⚠️ Começar ajustes |
| Nov-Dez | Muito quente | ⚠️ Manhã cedo preferível |

### SUL

| Mês | Clima | Recomendação |
|-----|-------|--------------|
| Jun-Ago | Frio, seco | ✅ MELHOR (máxima performance) |
| Set-Out | Primavera | ✅ Bom |
| Nov-Dez | Quente | ⚠️ Reduzir pressão |
| Jan-Mar | Verão úmido | ⚠️ Desafiador |
| Abr-Mai | Outono | ✅ Bom |

### NORDESTE

| Período | Recomendação |
|---------|--------------|
| Ano todo | ⚠️ DESAFIADOR - máximo grip requerido |
| Melhor horário | Antes das 10h ou depois das 16h |
| Evitar | 11h-15h (calor máximo) |

### CENTRO-OESTE

| Mês | Clima | Recomendação |
|-----|-------|--------------|
| Ano todo | ✅ Estável e seco | ✅ QUALQUER ÉPOCA |

---

## 🎓 Dicas de Pilotagem por Pista

### Nova Odessa

1. **Reta Principal:** Freada tardia mas precisa - 1-2m define volta
2. **Pinça:** Ponto crítico — entrada, apex, saída perfeitos
3. **Curvas Rápidas:** Manter velocidade = chave do sucesso
4. **Curva S:** Duas entradas diferentes possíveis — teste ambas

### Velopark VP1500

1. **Adaptar à temperatura:** Setup muda de hora em hora
2. **Subidas:** Risco de capotamento — altura não muito alta
3. **Descidas:** Freadas longas — pressão importante
4. **Geral:** Paciência — pista exigente, melhorias graduais

### Nordeste (Tropical)

1. **Aceite o baixo performance:** Não será rápido como asfalto seco — NORMAL
2. **Consistência:** Mais importante que velocidade máxima
3. **Pneus:** Mudam a cada 3-4 voltas — planeje múltiplos sets
4. **Estratégia:** Deixe conforto em casa — foco em adaptação

---

## 📊 Matriz de Setup Rápida

```
           PRESSÃO    CAMBAGEM   ALTURA     EIXO       TOE
Técnico    0.78-0.85  -1.5/-2.0  Equilib.   Médio      0-1mm OUT
Balanceado 0.75-0.85  -1.0/-1.5  Equilib.   Médio      1-2mm OUT
Tropical   0.62-0.75  -1.5/-1.8  Muito macio Macio     2-3mm OUT
Seco       0.80-0.90  -1.0/-1.5  Firm       Médio-Duro 0-1mm OUT
```

---

## 🔗 Integração no Sistema

### Como usar os dados no app-ai-test.html

1. **Carregar database:**
```javascript
<script src="js/kart-tracks-database.js"></script>
```

2. **Acessar uma pista:**
```javascript
const pista = KART_TRACKS_DATABASE.sudeste.tracks.nova_odessa;
console.log(pista.name);           // "Kartódromo Internacional Nova Odessa"
console.log(pista.characteristics); // Características técnicas
console.log(pista.setup_recommendations); // Setup recomendado
```

3. **Usar em análise de setup:**
```javascript
// Ao analisar um setup, considere a pista selecionada
const pistaId = document.getElementById('pista').value;
const setupContext = getTrackSetupRecommendations(pistaId);
// Enviar para API de análise com contexto de pista
```

---

## 📈 Próximas Expansões

- [ ] Integração de gráficos de traçados (imagens)
- [ ] Dados de tempo de volta profissional por pista
- [ ] Recomendações dinâmicas baseadas em forecast climático
- [ ] Histórico de campeonatos e vencedores por pista
- [ ] Contato direto das pistas (telefone, site, horários)
- [ ] Mapa interativo com localização GPS
- [ ] Comunidade: compartilhamento de setups por pista

---

## 📞 Contatos Principais

### São Paulo
- **Nova Odessa:** kartodromonovaodessa.com.br
- **KGV:** kartodromogranjaviana.com.br

### Rio Grande do Sul
- **Velopark Techspeed:** velopark.com.br

### Paraná
- **Raceland:** racelandinternacional.com.br

### Minas Gerais
- **Betim:** kartodromodebetim.com.br

### Distrito Federal
- **Brasília Kart:** brasiliakart.com.br

---

**Versão:** 1.0  
**Última Atualização:** 2026-04-23  
**Status:** ✅ Completo (Sudeste, Sul, Centro-Oeste, Nordeste documentados)  
**Próxima Atualização:** Adição de região Norte e mais detalhes regionais
