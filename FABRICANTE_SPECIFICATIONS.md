# 📋 Especificações de Fabricantes — Parâmetros Detalhados

Baseado em **manuais oficiais dos fabricantes** — Como cada marca especifica os parâmetros avançados de setup.

---

## 🔧 CASTER (Ângulo do Eixo de Direção)

### **CRG — Posição com Números/Letras**
**Padrão:** II/II (top/bottom)
**Sistema:** Washer adjusters nos espinhos
**Ajuste:** Movimento entre II/III ou III/III
**Escala:**
- I/I = Mínimo caster
- II/II = Padrão (inicial)
- III/III = Máximo caster
- II/III = Progressivo

**Como especificar no form:**
```
Caster Esquerdo: "II/II" (texto com opção dropdown)
Caster Direito: "II/II"
```

**Referência:** [CRG Setup Manual](https://nhka.net/wp-content/uploads/2018/02/crg-setup-guide.pdf)

---

### **OTK (Tony Kart, Kosmic, Exprit, FA Kart)**
**Sistema:** Eccentric Washers (excêntricos rotativos)
**Ajuste:** Rotação do washer
**Opções:**
- 0° = Posição inicial
- 90° = Meia volta (fine-tuning)
- 180° = Volta completa (máxima mudança)

**Efeito:**
- Cada rotação de ~180° = mudança significativa
- Meia volta = ajuste fino (não muito agressivo)

**Combinação possível:**
- 1x Eccentric washer + 1x Concentric washer = ajuste fino progressivo

**Como especificar no form:**
```
Caster Esquerdo: "0°, 90°, 180°" (ou posição numérica 1-4)
Caster Direito: "90°"
```

**Referência:** [OTK Setup Guide](https://forums.kartpulse.com/uploads/short-url/r31B3z0cApoR43teuMisMgqxLzq.pdf)

---

### **Birel ART — CCS System (Camber Caster System) 2026**
**Sistema:** Pino real com divisões multisituação
**Ajuste:** Rotação de um dial/selector
**Range:** ±4° caster, ±2° (ajustável até ±4°)
**Posições:** Números na base (1-8 ou similar)

**Como especificar no form:**
```
Caster Esquerdo: "Posição 1-8" (número da base)
Caster Direito: "Posição 5" (exemplo)
```

**Referência:** [Birel ART Technical Doc](https://www.birelart.com/page/technical-documentation_33)

---

### **Praga — Camber Caster System (CCS)**
**Compatível com Birel:**
- Caster: ±2° (até ±4° com ajuste máximo)
- Cambagem: ±2° por roda
- Upper bushing + lower lock system

**Como especificar:**
```
Caster Esquerdo: "Posição 1-4" (similar a OTK)
Caster Direito: "Posição 2"
```

**Referência:** [Praga Setup Doc](https://www.eccarburetors.com/assets/images/IPK-Praga-KART-SETUP-2017.pdf)

---

## 🎯 ACKERMAN (Ângulo de Convergência Dinâmica)

### **Kosmic — Dois Furos na Pitman Arm**
**Sistema:** Dois conjuntos de furos na coluna de direção
**Opções:**
- **Lower holes** = Máximo Ackerman (padrão, mais grip)
- **Upper holes** = Ackerman reduzido (steering mais leve)

**Efeito:**
- Lower = Turn-in grip máximo, steering mais responsivo
- Upper = Steering mais fácil, mas menos effective, menos turning radius

**Coluna Alternativa:**
- PN 0005.F0 = Pitman arm mais longo = AUMENTA grip (ambos os furos mais afastados)

**Como especificar no form:**
```
Ackerman: "Lower (Máximo)" | "Upper (Reduzido)" | "F0 Long (Extra Grip)"
```

**Referência:** [Kosmic Setup Manual](https://www.eccarburetors.com/assets/images/Kosmic-Kart-Setup-Guide.pdf)

---

### **OTK / Tony Kart / Exprit — Posição de Tie Rod**
**Sistema:** Ajuste da altura/posição da barra de direção
**Opções típicas:**
- Posição alta = Ackerman reduzido
- Posição baixa = Ackerman máximo (padrão)

**Como especificar:**
```
Ackerman: "Alto" | "Baixo (Padrão)" | "Intermediário"
```

---

### **CRG / Praga — Coluna de Direção Padrão**
**Sistema:** Posição fixa ou ajuste de altura
**Opções:** Conforme chassi modelo

**Como especificar:**
```
Ackerman: "Padrão" | "Ajustado" (com descrição)
```

---

## 🛞 TOE (Convergência/Divergência)

### **Todos os Fabricantes**
**Sistema:** Ajuste de tie-rods (comprimento variável)
**Unidade:** Milímetros (mm)

**Padrão:**
- Toe IN = Rodas apontando para dentro (0-3mm)
- Toe OUT = Rodas apontando para fora (0-3mm)

**Especificação profissional:**
```
Toe IN Dianteiro: 0-3mm (convergência)
Toe OUT Dianteiro: 0-3mm (divergência)
```

**Como especificar no form:**
```
Toe IN dianteiro: 0 | 1 | 2 | 3 (mm)
Toe OUT dianteiro: 0 | 1 | 2 | 3 (mm)
```

---

## 📏 PARA-CHOQUE (Bump Stop)

### **Todos os Fabricantes — Altura + Rigidez**
**Sistema:** Suporte com bolts de aperto ajustável

**Parâmetros:**
1. **Altura:** Posição vertical do para-choque (em mm do solo ou espaçadores)
2. **Rigidez:** Aperto/torque dos bolts

### **CRG / OTK / Birel / Kosmic / Praga**
**Altura Recomendada:**
- Dianteira: 15-30mm
- Traseira: 20-35mm

**Rigidez (Torque em Bolts):**
- Mínima = Baixo aperto (chassis mais macio)
- Média = Aperto normal (padrão)
- Máxima = Máximo aperto (chassis mais firme)

**Escala de Rigidez:**
- 1-3 = Macio (low compression)
- 4-6 = Médio (normal)
- 7-10 = Firme (high compression)

**Como especificar no form:**
```
Para-choque Dianteiro:
  Altura: 15 | 20 | 25 | 30 (mm)
  Rigidez: 1-10 (escala de macio a firme)

Para-choque Traseiro:
  Altura: 20 | 25 | 30 | 35 (mm)
  Rigidez: 1-10 (escala)
```

**Referência:** [O Kart Explicado - Para-choques](https://equipeoptimus.wixsite.com/optimuskart/single-post/2015/09/16/o-kart-explicado-torque-das-barras-de-tor%C3%A7%C3%A3o-e-parachoques)

---

## ⚙️ TRANSMISSÃO (Gear Ratio)

### **Todos os Fabricantes — Coroa/Sprocket**
**Sistema:** Sprocket de corrente (dentes variáveis)

**Range Profissional:**
- Mínimo: 50 dentes (velocidade máxima)
- Médio: 60-70 dentes (equilibrado)
- Máximo: 80+ dentes (máxima aceleração)

**Seleção por Pista:**
| Tipo de Pista | Recomendado | Razão |
|---------------|-------------|-------|
| Longa, alta velocidade | 50-60 | Maximiza top speed |
| Mista (normal) | 65-75 | Equilibrado |
| Curta, muitas curvas | 75-85 | Maximiza aceleração |

**Fórmula de Gear Ratio:**
```
Gear Ratio = Axle Sprocket / Engine Sprocket
Exemplo: 70 dentes axle / 10 dentes engine = 7.0 ratio
```

**Como especificar no form:**
```
Coroa (dentes): 50 | 60 | 65 | 70 | 75 | 80 | 85 (dropdown)
Observação da relação: "Pista longa" | "Pista curta" | "Equilibrado"
```

**Referência:** [Gear Ratio Chart](https://cometkartsales.com/blogs/news/gear-ratio-chart)

---

## 🪜 INCLINATION DO BANCO (Seat Inclination)

### **Todos os Fabricantes**
**Sistema:** Posição do banco (forward/backward/angle)

**Opções:**
- **Forward (Frente):** Aumenta weight na dianteira = mais grip dianteiro
- **Back (Trás):** Aumenta weight na traseira = mais tração traseira
- **Ângulo:** Inclinação (vertical, ligeiramente recuado, muito recuado)

**Posições Típicas:**
- Muito Frente = Aggressive turn-in (junior)
- Frente = Normal (OK, KZ médio)
- Centro = Equilibrado (padrão)
- Trás = Mais tração (KZ, pista grippy)
- Muito Trás = Máxima tração (professional)

**Como especificar no form:**
```
Inclinação do Banco: 
  "Muito Frente" | "Frente" | "Centro" | "Trás" | "Muito Trás"
  
OU posição numérica: -3 (frente) a +3 (trás)
```

---

## 📊 RESUMO DE ESPECIFICAÇÕES POR FABRICANTE

| Parâmetro | CRG | OTK/Tony | Birel ART | Kosmic | Praga |
|-----------|-----|----------|-----------|--------|-------|
| **Caster** | II/II | Eccentric (0°/90°/180°) | CCS Dial | CCS Dial | CCS Similar |
| **Ackerman** | Padrão | Tie-rod ajust | Padrão | 2 Furos | Padrão |
| **Toe** | mm (0-3) | mm (0-3) | mm (0-3) | mm (0-3) | mm (0-3) |
| **Para-choque** | mm + torque | mm + torque | mm + torque | mm + torque | mm + torque |
| **Coroa** | 50-85 dentes | 50-85 dentes | 50-85 dentes | 50-85 dentes | 50-85 dentes |
| **Banco** | Posição | Posição | Posição | Posição | Posição |

---

## 🎯 ESTRUTURA DO FORMULÁRIO ATUALIZADO

### **Seção 1: Bitola & Geometria**
```
□ Bitola dianteira (mm)
□ Bitola traseira (mm)
□ Cambagem Esq. (°)
□ Cambagem Dir. (°)
□ Caster Esq. (CRG: II/II | OTK: 0°-180° | Birel: 1-8 | Kosmic: Similar)
□ Caster Dir. (mesmo formato)
□ Toe IN dianteiro (mm): 0-3
□ Toe OUT dianteiro (mm): 0-3
□ Ackerman (Kosmic: Lower/Upper/F0 | Outros: Padrão/Custom)
```

### **Seção 2: Pneus, Altura & Eixo**
```
□ Pressão dos pneus (psi)
□ Altura dianteira (mm)
□ Altura traseira (mm)
□ Tipo de eixo (Dot 1/2/3/4, Soft/Medium/Hard, + descrição)
□ Inclinação do banco (Muito Frente / Frente / Centro / Trás / Muito Trás)
```

### **Seção 3: Para-choques**
```
□ Para-choque dianteiro:
  - Altura (mm): 15-30
  - Rigidez (1-10): macio a firme
  
□ Para-choque traseiro:
  - Altura (mm): 20-35
  - Rigidez (1-10): macio a firme
```

### **Seção 4: Transmissão**
```
□ Coroa (dentes): 50 / 60 / 70 / 80 / 85
□ Observação da relação: "Pista longa" / "Pista curta" / "Equilibrado" / Custom
```

---

## 📝 NOTA SOBRE COMPATIBILIDADE

**Importante:** Cada fabricante tem suas especificações próprias.
Ao criar o formulário, você pode:

**Opção 1:** Campo universal que aceita qualquer formato
**Opção 2:** Dropdown com opções por fabricante
**Opção 3:** Campo "Fabricante" que muda os formatos dos outros campos

Recomendo **Opção 3** para máxima precisão.

---

## 🔗 Fontes

- [CRG Setup Manual](https://nhka.net/wp-content/uploads/2018/02/crg-setup-guide.pdf)
- [OTK Setup Guide](https://forums.kartpulse.com/uploads/short-url/r31B3z0cApoR43teuMisMgqxLzq.pdf)
- [Birel ART Technical](https://www.birelart.com/page/technical-documentation_33)
- [Kosmic Setup Manual](https://www.eccarburetors.com/assets/images/Kosmic-Kart-Setup-Guide.pdf)
- [Praga Setup](https://www.eccarburetors.com/assets/images/IPK-Praga-KART-SETUP-2017.pdf)
- [Gear Ratio Chart](https://cometkartsales.com/blogs/news/gear-ratio-chart)
- [ANGRI Racing Academy](https://www.angriracing.com/caster-and-camber-adjusters)

---

**Data:** 2026-04-23  
**Status:** ✅ Baseado em manuais oficiais de fabricantes  
**Próximo passo:** Implementar no formulário app-ai-test.html
