/* ============================================================
   SUBI · /dashboard
   Panel de usuario contra Celo mainnet, sin backend ni librerías.

   Dos principios:

   1. Las lecturas no necesitan billetera. El fondo se ve entero antes
      de conectar nada, porque la mitad del argumento del proyecto es
      que cualquiera puede auditarlo sin permiso.

   2. Las escrituras llevan la etiqueta de atribución (ERC-8021) pegada
      al final del calldata. El tag vive ahí y no se puede agregar
      después, así que si no sale con la transacción, no sale nunca.

   Sobre `feeCurrency` (CIP-64): a propósito NO se manda. MetaMask
   rechaza campos que no conoce y la transacción ni se abre. MiniPay y
   Valora sí lo soportan, y ahí el gas sale en la misma stablecoin.
   ============================================================ */
(function () {

const C = {
  distributor: '0x1f945618F4bFa0e131E07FfA0335e7Ada6556279',
  registry:    '0x72Aa7f3B4ca2c230cd710Ef847015f0B963F0232',
  treasury:    '0x093D55468acee5a9b11644d1E55097C4E99C2739',
  asset:       '0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e',
};
const DEC = 6;
const CHAIN_HEX = '0xa4ec';           // 42220
const RPC = 'https://forno.celo.org';

// toDataSuffix('celo_ac17e664a585'), sin el 0x. Es determinístico, así que
// se puede fijar acá en vez de arrastrar el paquete ESM al navegador.
const TAG = '63656c6f5f616331376536363461353835110080218021802180218021802180218021';

const SEL = {
  distributable:'0x6710fb28', claimable:'0x402914f5', claim:'0x4e71d92d',
  activeCount:'0x4331ed1f',   isActive:'0x9f8a13d7', drawRateBps:'0x2ab442f9',
  registrations:'0x942e6bcf', balanceOf:'0x70a08231', allowance:'0xdd62ed3e',
  approve:'0x095ea7b3',       deposit:'0xf1215d25',
};

const $ = (id) => document.getElementById(id);
const L = () => (document.documentElement.lang === 'en' ? 'en' : 'es');
const T = (es, en) => (L() === 'en' ? en : es);

/* ---------- codificación mínima ---------- */
const p32   = (h) => h.replace(/^0x/, '').toLowerCase().padStart(64, '0');
const addr  = (a) => p32(a);
const num   = (n) => p32(BigInt(n).toString(16));
const aBig  = (h) => BigInt(h && h !== '0x' ? h : '0x0');

/** Cadena dinámica ABI: offset, longitud y contenido en palabras de 32 bytes. */
function strArg(s) {
  const bytes = new TextEncoder().encode(s);
  const hex = [...bytes].map((b) => b.toString(16).padStart(2, '0')).join('');
  // Cadena vacía: va la longitud en cero y NADA de cuerpo. Rellenar una
  // palabra igual produce calldata no canónica.
  const pad = hex.length ? hex.padEnd(Math.ceil(hex.length / 64) * 64, '0') : '';
  return { len: num(bytes.length), body: pad };
}

const fmt = (v, d = 4) => (Number(v) / 10 ** DEC).toLocaleString(L() === 'en' ? 'en-US' : 'es-AR',
  { minimumFractionDigits: 2, maximumFractionDigits: d });

/* ---------- lectura sin billetera ---------- */
async function call(to, data) {
  const r = await fetch(RPC, { method:'POST', headers:{'content-type':'application/json'},
    body: JSON.stringify({ jsonrpc:'2.0', id:1, method:'eth_call', params:[{to, data}, 'latest'] }) });
  const j = await r.json();
  if (j.error) throw new Error(j.error.message);
  return j.result;
}

/* ---------- estado ---------- */
let cuenta = null;
let datos = { dist:0n, padron:0n, draw:0n };

function estado(msg, tipo) {
  const el = $('status');
  if (!msg) { el.style.display = 'none'; return; }
  el.style.display = '';
  el.className = 'dstatus' + (tipo ? ' ' + tipo : '');
  el.innerHTML = msg;
}

/* ============================================================
   El fondo
   ============================================================ */
async function leerFondo() {
  try {
    const [dist, padron, draw, tes] = await Promise.all([
      call(C.distributor, SEL.distributable),
      call(C.registry,    SEL.activeCount),
      call(C.distributor, SEL.drawRateBps),
      call(C.asset,       SEL.balanceOf + addr(C.treasury)),
    ]);
    datos = { dist: aBig(dist), padron: aBig(padron), draw: aBig(draw) };

    $('mTreasury').textContent = fmt(aBig(tes), 2);
    $('mDist').textContent     = fmt(datos.dist, 2);
    $('mPadron').textContent   = datos.padron.toString();

    if (datos.padron === 0n) {
      $('mPerCapita').textContent = '—';
      $('mFormula').textContent = T(
        'Todavía no hay nadie en el padrón, así que no hay per cápita que calcular.',
        'Nobody is in the register yet, so there is no per-capita to compute.');
    } else {
      // presupuesto diario = distribuible × tasa/10000 ÷ 365
      const diario = (datos.dist * datos.draw) / 10000n / 365n;
      $('mPerCapita').textContent = fmt(diario / datos.padron, 6);
      $('mFormula').textContent = T(
        `Tasa de giro ${Number(datos.draw) / 100}% anual, dividido entre ${datos.padron} personas.`,
        `Draw rate ${Number(datos.draw) / 100}% a year, divided among ${datos.padron} people.`);
    }
  } catch (e) {
    estado(T('No pude leer la cadena. Reintento solo en unos segundos.',
             'Could not read the chain. Retrying on its own in a few seconds.'), 'bad');
  }
}

/* ============================================================
   Tu posición
   ============================================================ */
async function leerCuenta() {
  if (!cuenta) return;
  try {
    const [cl, act, bal, alw, reg] = await Promise.all([
      call(C.distributor, SEL.claimable + addr(cuenta)),
      call(C.registry,    SEL.isActive  + addr(cuenta)),
      call(C.asset,       SEL.balanceOf + addr(cuenta)),
      call(C.asset,       SEL.allowance + addr(cuenta) + addr(C.treasury)),
      call(C.registry,    SEL.registrations + addr(cuenta)),
    ]);
    const claimable = aBig(cl);
    const activo = aBig(act) === 1n;

    $('mClaimable').textContent = activo ? fmt(claimable, 6) : '—';
    $('btnClaim').disabled = !(activo && claimable > 0n);

    if (!activo) {
      $('mYouState').innerHTML = T(
        'No estás en el padrón todavía. <a href="/verify">Verificate con Self</a> y el dividendo empieza a devengar desde ese momento.',
        'You are not in the register yet. <a href="/verify">Verify with Self</a> and the dividend starts accruing from that moment.');
    } else {
      // registrations() devuelve (nullifier, expiration, unbindTime)
      const exp = aBig('0x' + reg.slice(2).slice(64, 128));
      const dias = Number((exp - BigInt(Math.floor(Date.now() / 1000))) / 86400n);
      $('mYouState').textContent = T(
        `En el padrón. Tu prueba de vida vence en ${dias} días. Cobrás cuando quieras: esperar no cuesta más gas.`,
        `In the register. Your proof of life expires in ${dias} days. Claim whenever: waiting costs no extra gas.`);
    }

    const b = aBig(bal), a = aBig(alw);
    $('mAllowance').textContent = T(
      `Tenés ${fmt(b, 2)} USDT. Autorizado al treasury: ${fmt(a, 2)}.`,
      `You hold ${fmt(b, 2)} USDT. Approved to the treasury: ${fmt(a, 2)}.`);
    $('btnApprove').disabled = b === 0n;
    $('btnDeposit').disabled = a === 0n;
    // Para el swap la autorización va al router, no al treasury.
    const aR = await call(C.asset, SEL.allowance + addr(cuenta) + addr(UNI.router));
    $('btnApproveSwap').disabled = b === 0n;
    $('btnSwap').disabled = aBig(aR) === 0n;
  } catch (e) { /* se reintenta en el próximo tick */ }
}

/* ============================================================
   Billetera
   ============================================================ */
async function conectar() {
  const eth = window.ethereum;
  if (!eth) {
    estado(T('No encontré una billetera en este navegador. Instalá MetaMask, o abrí esta página dentro de MiniPay o Valora.',
             'No wallet found in this browser. Install MetaMask, or open this page inside MiniPay or Valora.'), 'bad');
    return;
  }
  try {
    const cuentas = await eth.request({ method: 'eth_requestAccounts' });
    cuenta = cuentas[0];
    await celo();
    $('who').innerHTML = T('Conectada <b>', 'Connected <b>') + cuenta.slice(0, 6) + '…' + cuenta.slice(-4) + '</b>';
    $('btnConnect').textContent = T('Cambiar de cuenta', 'Switch account');
    estado(null);
    leerCuenta();
  } catch (e) {
    estado(T('Conexión cancelada.', 'Connection cancelled.'), 'bad');
  }
}

/** Pide el cambio a Celo mainnet, y la agrega si la billetera no la tiene. */
async function celo() {
  const eth = window.ethereum;
  if (await eth.request({ method: 'eth_chainId' }) === CHAIN_HEX) return;
  try {
    await eth.request({ method:'wallet_switchEthereumChain', params:[{ chainId: CHAIN_HEX }] });
  } catch (e) {
    if (e.code !== 4902) throw e;
    await eth.request({ method:'wallet_addEthereumChain', params:[{
      chainId: CHAIN_HEX, chainName:'Celo', nativeCurrency:{ name:'CELO', symbol:'CELO', decimals:18 },
      rpcUrls:[RPC], blockExplorerUrls:['https://celoscan.io'] }] });
  }
}

/** Manda una transacción con la etiqueta pegada al calldata. */
async function enviar(to, data, etiqueta) {
  await celo();
  estado(T('Confirmá en tu billetera…', 'Confirm in your wallet…'));
  const hash = await window.ethereum.request({ method:'eth_sendTransaction',
    params:[{ from: cuenta, to, data: data + TAG }] });
  estado(`${etiqueta}: <a href="https://celoscan.io/tx/${hash}" target="_blank" rel="noopener">${hash.slice(0, 22)}…</a>`, 'ok');
  // El recibo tarda; el panel se actualiza solo en el próximo ciclo.
  setTimeout(() => { leerFondo(); leerCuenta(); }, 6000);
  return hash;
}

function montoAtomico() {
  const v = ($('amt').value || '').trim().replace(',', '.');
  if (!/^\d+(\.\d{1,6})?$/.test(v) || Number(v) <= 0) return null;
  const [ent, dec = ''] = v.split('.');
  return BigInt(ent + dec.padEnd(DEC, '0'));
}

/* ---------- acciones ----------
   Sólo el botón de conectar se cablea acá: vive fuera de los bloques que
   el cambio de idioma reemplaza. Los otros tres viven dentro de las
   tarjetas, así que se recablean en `recablear()` cada vez que se
   reescribe el HTML, y atarlos también acá dejaría dos listeners
   encima del mismo click.                                             */
$('btnConnect').addEventListener('click', conectar);

if (window.ethereum) {
  window.ethereum.on?.('accountsChanged', (a) => {
    cuenta = a[0] || null;
    if (!cuenta) { $('who').textContent = T('Sin billetera conectada', 'No wallet connected'); $('btnClaim').disabled = true; }
    else { $('who').innerHTML = T('Conectada <b>', 'Connected <b>') + cuenta.slice(0,6) + '…' + cuenta.slice(-4) + '</b>'; leerCuenta(); }
  });
  window.ethereum.on?.('chainChanged', () => location.reload());
}

/* ============================================================
   Idioma
   ============================================================ */
/* ============================================================
   Cobrar en la moneda de cada uno
   ------------------------------------------------------------
   Todo esto pasa en Uniswap v3 y en UNA sola transacción por swap.
   No se usa el broker de Mento: sus monedas también tienen pool
   contra USDT, así que el camino corto existe y es el bueno.

   Direcciones, fees y decimales salieron de leer el factory y los
   pools, no de tipearlos. El único caso especial es XOFm, que no
   tiene pool contra USDT: va por un path USDT > USDm > XOFm que
   Uniswap resuelve igual en una llamada.
   ============================================================ */
const UNI = {
  quoter: '0x82825d0554fA07f7FC52Ab63c961F330fdEFa8E8',
  router: '0x5615CDAb10dc425a742d643d949a7F474C01abc4',
};
const USDM = '0x765DE816845861e75A25fCA122bb6898B8B1282a';

// fee en centésimas de punto básico: 100 = 0,01%
const MONEDAS = [
  { s:'wARS', a:'0x0DC4F92879B7670e5f4e4e6e3c801D229129D90D', fee:100,  n:'Peso argentino' },
  { s:'wBRL', a:'0xD76f5Faf6888e24D9F04Bf92a0c8B921FE4390e0', fee:100,  n:'Real brasileño' },
  { s:'COPm', a:'0x8A567e2aE79CA692Bd748aB832081C45de4041eA', fee:3000, n:'Peso colombiano' },
  { s:'BRLm', a:'0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787', fee:100,  n:'Real brasileño (Mento)' },
  { s:'KESm', a:'0x456a3D042C0DbD3db53D5489e98dFb038553B0d0', fee:100,  n:'Chelín keniano' },
  { s:'NGNm', a:'0xE2702Bd97ee33c88c8f6f92DA3B733608aa76F71', fee:100,  n:'Naira nigeriana' },
  { s:'GHSm', a:'0xfAeA5F3404bbA20D3cc2f8C4B0A888F55a3c7313', fee:100,  n:'Cedi ghanés' },
  { s:'ZARm', a:'0x4c35853A3B4e647fD266f4de678dCc8fEC410BF6', fee:100,  n:'Rand sudafricano' },
  { s:'PHPm', a:'0x105d4A9306D2E55a71d2Eb95B81553AE1dC20d7B', fee:100,  n:'Peso filipino' },
  { s:'AUDm', a:'0x7175504C455076F15c04A2F90a8e352281F492F9', fee:100,  n:'Dólar australiano' },
  { s:'CADm', a:'0xff4Ab19391af240c311c54200a492233052B6325', fee:100,  n:'Dólar canadiense' },
  { s:'USDm', a:USDM,                                          fee:100,  n:'Dólar de Mento' },
  { s:'XOFm', a:'0x73F93dcc49cB8A239e2032663e9475dd5ef29A08', fee:100,  n:'Franco CFA', via:USDM },
];
const SLIPPAGE_BPS = 100n;   // 1%

const SW = {
  quoteSingle:'0xc6a5026a', quotePath:'0xcdca1753',
  swapSingle: '0x04e45aaf', swapPath: '0xb858183f',
  approve:'0x095ea7b3', allowance:'0xdd62ed3e',
};

const fee3 = (f) => BigInt(f).toString(16).padStart(6, '0');
const moneda = () => MONEDAS.find((m) => m.s === $('moneda').value) || MONEDAS[0];

/** Path empaquetado de Uniswap: token, fee, token[, fee, token]. */
function pathDe(m) {
  const base = C.asset.slice(2) + fee3(m.fee) +
    (m.via ? m.via.slice(2) + fee3(m.fee) + m.a.slice(2) : m.a.slice(2));
  return base.toLowerCase();
}
function argBytes(hex) {
  const len = hex.length / 2;
  return num(len) + hex.padEnd(Math.ceil(len / 32) * 64, '0');
}

const fmt18 = (v) => Number(v) / 1e18;

let ultimaSalida = 0n;

async function cotizar() {
  const el = $('mQuote');
  const monto = montoSwap();
  const m = moneda();
  if (monto <= 0n) { ultimaSalida = 0n; el.innerHTML = T('Poné un monto para ver la cotización.', 'Enter an amount to see the quote.'); return; }
  try {
    let out;
    if (m.via) {
      const r = await call(UNI.quoter, SW.quotePath + num(0x40) + num(monto) + argBytes(pathDe(m)));
      out = aBig('0x' + r.slice(2, 66));
    } else {
      const r = await call(UNI.quoter, SW.quoteSingle + addr(C.asset) + addr(m.a) + num(monto) + num(m.fee) + num(0));
      out = aBig('0x' + r.slice(2, 66));
    }
    ultimaSalida = out;
    const recibe = fmt18(out).toLocaleString(L() === 'en' ? 'en-US' : 'es-AR', { maximumFractionDigits: 2 });
    const min = fmt18((out * (10000n - SLIPPAGE_BPS)) / 10000n).toLocaleString(L() === 'en' ? 'en-US' : 'es-AR', { maximumFractionDigits: 2 });

    // Impacto de precio. Algunos pools son finos y un monto chico ya mueve
    // la cotización varios puntos. Se mide contra una referencia mínima y se
    // avisa, porque el usuario no tiene forma de saberlo mirando el número.
    let aviso = '';
    try {
      const REF = 10_000n;                     // 0,01 USDT
      const ref = m.via
        ? aBig('0x' + (await call(UNI.quoter, SW.quotePath + num(0x40) + num(REF) + argBytes(pathDe(m)))).slice(2, 66))
        : aBig('0x' + (await call(UNI.quoter, SW.quoteSingle + addr(C.asset) + addr(m.a) + num(REF) + num(m.fee) + num(0))).slice(2, 66));
      if (ref > 0n) {
        const esperado = (ref * monto) / REF;
        const imp = Number(((esperado - out) * 10000n) / esperado) / 100;
        if (imp > 1.5) {
          aviso = T(
            ` <b style="color:var(--red)">Ojo: perdés ${imp.toFixed(1)}% por poca liquidez en ese par.</b> Probá un monto menor.`,
            ` <b style="color:var(--red)">Careful: you lose ${imp.toFixed(1)}% to thin liquidity on that pair.</b> Try a smaller amount.`);
        }
      }
    } catch (e) { /* si la referencia falla, se muestra la cotización sin aviso */ }

    el.innerHTML = T(
      `Recibís <b>${recibe} ${m.s}</b>. Mínimo garantizado ${min} con 1% de tolerancia.` +
        (m.via ? ' Pasa por USDm en la misma transacción.' : '') + aviso,
      `You get <b>${recibe} ${m.s}</b>. Guaranteed minimum ${min} with 1% tolerance.` +
        (m.via ? ' Routed through USDm in the same transaction.' : '') + aviso);
  } catch (e) {
    ultimaSalida = 0n;
    el.innerHTML = T('No se pudo cotizar ese monto.', 'Could not quote that amount.');
  }
}

function montoSwap() {
  const v = ($('swapAmt').value || '').replace(',', '.').trim();
  if (!/^\d*\.?\d*$/.test(v) || v === '' || v === '.') return 0n;
  const [e, d = ''] = v.split('.');
  return BigInt(e || '0') * 10n ** BigInt(DEC) + BigInt((d + '000000').slice(0, DEC));
}

async function autorizarSwap() {
  const monto = montoSwap();
  if (monto <= 0n) return estado(T('Poné un monto.', 'Enter an amount.'), 'bad');
  await enviar(C.asset, SW.approve + addr(UNI.router) + num(monto),
    T('Autorización al router', 'Router approval'));
}

async function hacerSwap() {
  const monto = montoSwap();
  const m = moneda();
  if (monto <= 0n) return estado(T('Poné un monto.', 'Enter an amount.'), 'bad');
  if (ultimaSalida === 0n) return estado(T('Esperá la cotización.', 'Wait for the quote.'), 'bad');
  const minimo = (ultimaSalida * (10000n - SLIPPAGE_BPS)) / 10000n;
  const data = m.via
    ? SW.swapPath + num(0x20) + num(0x80) + addr(cuenta) + num(monto) + num(minimo) + argBytes(pathDe(m))
    : SW.swapSingle + addr(C.asset) + addr(m.a) + num(m.fee) + addr(cuenta) + num(monto) + num(minimo) + num(0);
  await enviar(UNI.router, data, T(`Cambio a ${m.s}`, `Swap to ${m.s}`));
}

function pintarMonedas() {
  const sel = $('moneda');
  if (!sel || sel.options.length) return;
  sel.innerHTML = MONEDAS.map((m) => `<option value="${m.s}">${m.s} · ${m.n}</option>`).join('');
}

const EN = {
  'nav': `
    <a href="/demo">← Back to the demo</a>
    <a href="/verify">Verify</a>
    <a href="/">The project</a>`,
  'hero.badge': '<i></i> Celo mainnet · chain 42220',
  'hero.h': 'The fund, your dividend and the contribution, live',
  'hero.lead': `
    Everything here comes from reading Celo mainnet right now, not from a database of ours. Connect
    your wallet to claim or contribute. The site custodies nothing and never holds your keys.`,
  'who.off': 'No wallet connected',
  'btn.connect': 'Connect wallet',
  'btn.verify': 'Verify with Self',
  'btn.claim': 'Claim',
  'btn.approve': '1 · Approve',
  'btn.deposit': '2 · Contribute',
  'fund.h': 'The fund, right now',
  'fund.cards': `
    <div class="dcard">
      <div class="cap">Treasury</div>
      <div class="dbig" id="mTreasury">…</div>
      <div class="dunit">USDT held</div>
      <p class="dnote">Open entry: anyone can contribute, without permission.</p>
    </div>
    <div class="dcard">
      <div class="cap">Distributable</div>
      <div class="dbig" id="mDist">…</div>
      <div class="dunit">USDT · accrued amounts already deducted</div>
      <p class="dnote">This is what the distributor sees, counting the treasury.</p>
    </div>
    <div class="dcard">
      <div class="cap">Active register</div>
      <div class="dbig mint" id="mPadron">…</div>
      <div class="dunit">people verified with Self</div>
      <p class="dnote">The dividend is divided among these people, not among a fixed list.</p>
    </div>
    <div class="dcard">
      <div class="cap">Dividend per person</div>
      <div class="dbig mint" id="mPerCapita">…</div>
      <div class="dunit">USDT a day, at the current draw rate</div>
      <p class="dnote" id="mFormula">It is never set: it comes out of a division.</p>
    </div>`,
  'you.h': 'Your position',
  'you.cards': `
    <div class="dcard">
      <div class="cap">Accrued and claimable</div>
      <div class="dbig" id="mClaimable">—</div>
      <div class="dunit">USDT available now</div>
      <p class="dnote" id="mYouState">Connect your wallet to see your position.</p>
      <button class="btn primary" id="btnClaim" disabled style="margin-top:18px">Claim</button>
    </div>
    <div class="dcard">
      <div class="cap">Contribute to the treasury</div>
      <p class="dnote" style="margin-top:0;margin-bottom:12px">Any amount in USDT. It is recorded on-chain with whatever attribution you enter.</p>
      <input id="amt" class="vinput" placeholder="0.10" inputmode="decimal" autocomplete="off" style="margin-top:0">
      <input id="attr" class="vinput" placeholder="your name or organisation (optional)" autocomplete="off" maxlength="60">
      <div style="display:flex;gap:10px;margin-top:16px;flex-wrap:wrap">
        <button class="btn" id="btnApprove" disabled>1 · Approve</button>
        <button class="btn primary" id="btnDeposit" disabled>2 · Contribute</button>
      </div>
      <p class="dnote" id="mAllowance">Your balance and approval appear once connected.</p>
    </div>
    <div class="dcard">
      <div class="cap">Get paid in your currency</div>
      <p class="dnote" style="margin-top:0;margin-bottom:12px">Swap your USDT for the currency where you live. One transaction, on Uniswap over Celo.</p>
      <select id="moneda" class="vinput" style="margin-top:0"></select>
      <input id="swapAmt" class="vinput" placeholder="0.10" inputmode="decimal" autocomplete="off">
      <p class="dnote" id="mQuote" style="margin-top:12px;min-height:2.6em">Enter an amount to see the quote.</p>
      <div style="display:flex;gap:10px;margin-top:8px;flex-wrap:wrap">
        <button class="btn" id="btnApproveSwap" disabled>1 · Approve</button>
        <button class="btn primary" id="btnSwap" disabled>2 · Swap</button>
      </div>
    </div>`,
  'foot.note': `
    The transactions this page sends for signature carry the project's attribution tag (ERC-8021) in
    the calldata. They do not carry <code>feeCurrency</code>: CIP-64 fee abstraction is supported by
    MiniPay and Valora, but MetaMask rejects the field, so from a desktop wallet gas is paid in CELO.
    Nothing here custodies funds: the page builds the transaction and your wallet signs it.`,
  'foot.legal': 'SUBI · Space Universal Basic Income. No token, no presale and not for profit.',
};

const META = {
  es: { title:'SUBI · Panel', desc:'Conectá tu billetera, mirá el fondo en vivo, cobrá tu dividendo y aportá al treasury de SUBI en Celo mainnet.' },
  en: { title:'SUBI · Dashboard', desc:'Connect your wallet, watch the fund live, claim your dividend and contribute to the SUBI treasury on Celo mainnet.' },
};

const esCache = new Map();

// Al traducir se reemplaza el HTML de las tarjetas, así que los campos son
// nodos nuevos y vuelven vacíos. Se guarda lo tipeado y se repone.
const CAMPOS = ['amt', 'attr', 'swapAmt', 'moneda'];
function snapshot() {
  const o = {};
  CAMPOS.forEach((id) => { const e = $(id); if (e) o[id] = e.value; });
  return o;
}
function restaurar(o) {
  CAMPOS.forEach((id) => { const e = $(id); if (e && o[id] !== undefined && o[id] !== '') e.value = o[id]; });
}

function applyLang(next) {
  const previo = snapshot();
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

  // Las tarjetas se reemplazan enteras, así que los botones son nodos nuevos.
  recablear();
  restaurar(previo);
  cotizar();
  leerFondo();
  leerCuenta();
}

function recablear() {
  $('btnClaim').addEventListener('click', async () => {
    try { await enviar(C.distributor, SEL.claim, T('Cobro enviado', 'Claim sent')); }
    catch (e) { estado(T('No se envió: ', 'Not sent: ') + (e.message || e), 'bad'); }
  });
  $('btnApprove').addEventListener('click', async () => {
    const m = montoAtomico();
    if (!m) return estado(T('Poné un monto válido, por ejemplo 0.10', 'Enter a valid amount, for example 0.10'), 'bad');
    try { await enviar(C.asset, SEL.approve + addr(C.treasury) + num(m), T('Autorización enviada', 'Approval sent')); }
    catch (e) { estado(T('No se envió: ', 'Not sent: ') + (e.message || e), 'bad'); }
  });
  $('btnDeposit').addEventListener('click', async () => {
    const m = montoAtomico();
    if (!m) return estado(T('Poné un monto válido, por ejemplo 0.10', 'Enter a valid amount, for example 0.10'), 'bad');
    const s = strArg(($('attr').value || '').trim().slice(0, 60));
    const data = SEL.deposit + num(m) + num(64) + s.len + s.body;
    try { await enviar(C.treasury, data, T('Aporte enviado', 'Contribution sent')); }
    catch (e) { estado(T('No se envió: ', 'Not sent: ') + (e.message || e), 'bad'); }
  });

  // Cobro en moneda local. El selector se repuebla porque al traducir
  // la tarjeta entera es un nodo nuevo y el <select> viene vacío.
  pintarMonedas();
  let t = null;
  const recotizar = () => { clearTimeout(t); t = setTimeout(cotizar, 350); };
  $('moneda').addEventListener('change', recotizar);
  $('swapAmt').addEventListener('input', recotizar);
  $('btnApproveSwap').addEventListener('click', async () => {
    try { await autorizarSwap(); }
    catch (e) { estado(T('No se envió: ', 'Not sent: ') + (e.message || e), 'bad'); }
  });
  $('btnSwap').addEventListener('click', async () => {
    try { await hacerSwap(); }
    catch (e) { estado(T('No se envió: ', 'Not sent: ') + (e.message || e), 'bad'); }
  });
  cotizar();
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
setInterval(() => { leerFondo(); leerCuenta(); }, 12000);

})();
