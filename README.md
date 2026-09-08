# subi.space

Sitio de marketing para **SUBI** (Space Universal Basic Income) + página demo del hackathon **Celo Agents at Work**.

🌐 **Live site:** https://subi.space  
📦 **Repo:** https://github.com/artugrande/subi-space

---

## 🚀 Qué es SUBI

Renta de recursos espaciales → humanos verificados → stablecoins locales.

El Artículo I del Tratado del Espacio Ultraterrestre (1967) establece que la exploración espacial es "incumbencia de toda la humanidad". SUBI implementa esa obligación con infraestructura on-chain:

- **Identidad verificada sin datos:** Self + prueba ZK (pasaporte NFC)
- **Padrón on-chain:** un humano, un asiento (resistencia a sybil)
- **Distribución diaria:** dividendo proporcional al padrón activo
- **Cobro en 21 monedas:** Mento + Ripio wFIAT (stablecoins locales)
- **Fee abstraction:** el gas se paga en la misma moneda que cobrás

---

## 📁 Estructura del proyecto

```
subi-space/
├── app/
│   ├── layout.tsx          # Layout global + metadata
│   ├── globals.css         # Estilos del sitio
│   ├── page.tsx            # Home page (radically shortened)
│   └── demo/
│       └── page.tsx        # Hackathon demo page
├── public/
│   ├── propuesta.md        # Documento completo (resumen)
│   └── SubiDistributor.sol.txt  # Pseudocódigo del contrato
├── package.json
├── tsconfig.json
├── next.config.ts          # Configurado para static export
└── README.md
```

---

## 🛠️ Setup local

### Instalar dependencias

```bash
npm install
```

### Dev server

```bash
npm run dev
```

Abrí http://localhost:3000

### Build estático (para Vercel)

```bash
npm run build
```

Genera el sitio estático en `/out`.

---

## 🌐 Deploy en Vercel

Este repo está conectado al proyecto Vercel `subi` (team `artugrandes-projects`) que ya tiene el dominio `subi.space` configurado.

### Deploy automático

Cada push a `main` dispara un deploy automático.

### Deploy manual (si es necesario)

```bash
vercel --prod
```

---

## 📊 Métricas del sitio

### Homepage
- **Word count:** ~350 palabras (antes: ~2900)
- **Secciones:** 4 (antes: 11)
- **Tiempo de lectura:** < 30 segundos

### Demo page
- **Mockups visuales:** 5 (flujo completo del agente)
- **Links:** repo, explorer, contratos, agent ID
- **Shot list:** guía para video de submission

---

## 🎨 Diseño

- **Estilo:** moderno, espacial, clean
- **Colores:** gradientes azules (#4a9fff), fondo oscuro (#0a0a0f → #1a1a2e)
- **Mobile-first:** responsive desde 320px
- **Accesibilidad:** contraste AA+, enlaces descriptivos

---

## 🔗 Links importantes

- **Repo del agente:** https://github.com/artugrande/subi-concierge-agent
- **ERC-8004 Agent ID:** [9822](https://8004scan.io/agents/celo/9822)
- **Contratos en Celo Mainnet:**
  - Treasury: `0xaE18D9E48367Fc3d9D6977C221B1377Ce6B7c1A2`
  - Registry: `0xA6e481f0D115aAd4193f5f8EC135939CF99D6C50`
  - Distributor: `0xB3d836811DC211378285a39B8b0ba2ccCD086D81`
  - PledgeRegistry: `0x89C15969Fd91271b62BD39a6200B46Abe1534F5d`

---

## 👤 Autor

**Arturo Grande**  
Telegram: [@artugrande](https://t.me/artugrande)  
GitHub: [@artugrande](https://github.com/artugrande)

---

## 📜 Licencia

MIT (código del sitio)  
La idea y el mecanismo SUBI son de autoría de Arturo Grande y se publican de forma abierta.
