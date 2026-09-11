/* ============================================================
   SUBI · /hackathon
   Página de evidencia por track. Los números del panel se leen de
   Celo mainnet en vivo: una afirmación que se puede comprobar vale
   más que una que hay que creer.
   ============================================================ */
(function () {

const REGISTRY    = '0x72Aa7f3B4ca2c230cd710Ef847015f0B963F0232';
const DISTRIBUTOR = '0x1f945618F4bFa0e131E07FfA0335e7Ada6556279';
const RPC = 'https://forno.celo.org';
const TREASURY    = '0x093D55468acee5a9b11644d1E55097C4E99C2739';
const RENUNCIA    = 'https://celoscan.io/tx/0x8ecd49fa96faf699fbe48c770d9828808b0db8444ef062685bdc4298f38e212a';
const SEL = { activeCount:'0x4331ed1f', distributable:'0x6710fb28', owner:'0x8da5cb5b' };

const $ = (id) => document.getElementById(id);

async function call(to, data) {
  const r = await fetch(RPC, { method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({ jsonrpc:'2.0', id:1, method:'eth_call', params:[{ to, data }, 'latest'] }) });
  const j = await r.json();
  if (j.error) throw new Error(j.error.message);
  return BigInt(j.result && j.result !== '0x' ? j.result : '0x0');
}

async function leerCadena() {
  try {
    const [padron, fondo] = await Promise.all([
      call(REGISTRY, SEL.activeCount),
      call(DISTRIBUTOR, SEL.distributable),
    ]);
    $('mPadron').textContent = padron.toString();
    // El asset tiene 6 decimales.
    $('mFondo').textContent = (Number(fondo) / 1e6).toLocaleString(
      document.documentElement.lang === 'en' ? 'en-US' : 'es-AR',
      { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' USDT';
    // El dueño del treasury también se lee de la cadena: no es un texto que haya que creer.
    const dueno = await call(TREASURY, SEL.owner);
    const en = document.documentElement.lang === 'en';
    $('mOwner').innerHTML = dueno === 0n
      ? `<a href="${RENUNCIA}" target="_blank" rel="noopener">${en ? 'nobody' : 'nadie'} · 0x000…000</a>`
      : '0x' + dueno.toString(16).padStart(40, '0');
    $('pill').classList.add('live');
  } catch (e) {
    $('pill').classList.remove('live');
  }
}

/* ============================================================
   Diccionario en inglés
   ============================================================ */
const EN = {
  'nav': `
    <a href="/">The project</a>
    <a href="/verify">Verify</a>
    <a href="/dashboard">Dashboard</a>
    <a href="/proposal">Proposal</a>`,

  'hero.badge': '<i></i> Celo Agents at Work · 28 Aug to 14 Sep 2026',
  'hero.h': 'Three tracks, and the evidence for each',
  'hero.lead': `
    SUBI is a universal basic income funded by the resources of space, live on Celo mainnet.
    Everything claimed below can be checked on the chain or through a public link.`,

  'live': 'reading Celo mainnet',
  'ev': `
    <div class="vrow"><span class="k">People in the register</span><span class="v big" id="mPadron">…</span></div>
    <div class="vrow"><span class="k">Distributable fund</span><span class="v big" id="mFondo">…</span></div>
    <div class="vrow"><span class="k">Agent ID · ERC-8004</span><span class="v big">9822</span></div>`,
  'k.tag': 'Attribution tag',
  'k.reg': 'Registry',
  'k.own': 'Treasury owner',
  'k.tre': 'Treasury',

  'tracks': `
    <div class="path">
      <div class="path-n">4</div>
      <h4>Judges' Favorite</h4>
      <div class="who">Primary track</div>
      <ol class="path-steps">
        <li>The two primitives the brief says it looks for, <b>Self for proof of personhood</b> and <b>fee abstraction</b>, in a flow a person can walk today.</li>
        <li>Registration happens only inside <code>customVerificationHook</code>. The unsafe function is not disabled: <b>it does not exist in the bytecode</b>.</li>
        <li>Gas is paid in the same stablecoin being claimed, so nobody needs to buy CELO.</li>
        <li>The dividend is not set, it is derived by dividing what exists among those who are in. <b>No token, no presale.</b></li>
        <li><b>No owner.</b> Ownership of the treasury and the distributor was renounced on-chain: nobody, the author included, can move the fund or change the draw rate.</li>
      </ol>
      <div class="path-foot">
        <a href="/verify">Scan and join the register →</a>
      </div>
    </div>

    <div class="path">
      <div class="path-n">3</div>
      <h4>AskBots CLI Growth</h4>
      <div class="who">Round 1 closed · 12 of 12 reviews</div>
      <ol class="path-steps">
        <li>Average <b>6.5/10</b> (range 4.5 to 7), paid on-chain: 1.32 USDT.</li>
        <li>What they asked for, and what is done: a five-minute judge path (<code>npm run verify:onchain</code>), a README with the identity block up top, an end-to-end walkthrough, real Self instead of a stub, and the MiniPay and CIP-64 checklist.</li>
        <li>Round 2 the weekend before the deadline. <b>The track scores the gap, not the grade.</b></li>
      </ol>
      <div class="path-foot">
        <a href="https://celoscan.io/tx/0x8a4660401b95a24d515b70c6a024f4dc8f22d63c2e33cf4d36fc30e1e530ee53" target="_blank" rel="noopener">The round 1 transaction ↗</a>
      </div>
    </div>

    <div class="path">
      <div class="path-n">5</div>
      <h4>Best Feedback for buy</h4>
      <div class="who">Real rental · public issue</div>
      <ol class="path-steps">
        <li>We rented an <b>e2-micro</b> for <b>0.016753 USDT</b> and ran a script on it. The wallet held <b>0 CELO</b> throughout.</li>
        <li>Four findings: leftover <code>cpay</code> naming, the cap labelled in USDC, drift in the zone format, and receipts that still do not let you recover an ambiguous payment.</li>
        <li>With latencies measured step by step and the poll URL redacted, which is what the track asks you not to publish.</li>
      </ol>
      <div class="path-foot">
        <a href="https://github.com/celo-org/buy-skill/issues/9" target="_blank" rel="noopener">The issue on celo-org/buy-skill ↗</a>
      </div>
    </div>`,


  'cta': `
    <a href="https://github.com/artugrande/subi-concierge-agent" class="btn primary" target="_blank" rel="noopener">The repo</a>
    <a href="https://x.com/ArtuGrande/status/2098540560306823513" class="btn" target="_blank" rel="noopener">The video</a>
    <a href="/proposal" class="btn">The full proposal</a>
    <a href="/demo" class="btn">The demo</a>`,

  'foot.legal': 'SUBI · Space Universal Basic Income. No token, no presale and not for profit.',
};

const META = {
  es: { title:'SUBI · Hackathon', desc:'A qué tracks aplica SUBI en Celo Agents at Work, con la evidencia de cada uno verificable en la cadena.' },
  en: { title:'SUBI · Hackathon', desc:'Which tracks SUBI is entering at Celo Agents at Work, with the evidence for each checkable on-chain.' },
};

/* ============================================================
   Idioma
   ============================================================ */
const esCache = new Map();

function applyLang(next) {
  try { localStorage.setItem('subi.lang', next); } catch (e) {}
  document.documentElement.lang = next;
  document.title = META[next].title;
  const md = document.querySelector('meta[name=description]');
  if (md) md.content = META[next].desc;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!esCache.has(key)) esCache.set(key, el.innerHTML);
    if (next === 'es') el.innerHTML = esCache.get(key);
    else if (EN[key] !== undefined) el.innerHTML = EN[key];
  });

  document.querySelectorAll('.lang button').forEach((b) =>
    b.classList.toggle('on', b.dataset.lang === next));

  // El panel de evidencia se reemplaza entero al traducir, así que los
  // nodos con los números son otros: hay que releer.
  leerCadena();
}

document.querySelectorAll('.lang button').forEach((b) => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

/* ============================================================
   Init
   ============================================================ */
let stored = null;
try { stored = localStorage.getItem('subi.lang'); } catch (e) {}
let start = stored || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
if (!['es', 'en'].includes(start)) start = 'es';

applyLang(start);
setInterval(leerCadena, 8000);

})();
