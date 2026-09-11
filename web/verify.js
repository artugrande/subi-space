/* ============================================================
   SUBI · /verify
   Alta en el padrón con Self, sin backend.

   El QR codifica el universal link de Self, que lleva toda la config
   adentro. No hace falta relayer ni websocket: la fuente de verdad es
   el contrato, que esta página relee cada seis segundos.

   El scope que Self usa se deriva de (dirección del registry, semilla)
   con Poseidon, del lado del hub. Acá solo viaja la semilla como texto.
   Igual comparamos contra `scope()` en la cadena antes de mostrar nada,
   porque un scope que no coincide hace que el hub rechace la prueba y
   el escaneo se pierde sin decir por qué.
   ============================================================ */
(function () {

const REGISTRY   = '0x72Aa7f3B4ca2c230cd710Ef847015f0B963F0232';
const SCOPE_SEED = 'subi-space';
const EDAD_MIN   = 18;
const CHAIN_ID   = 42220;
const RPC        = 'https://forno.celo.org';
const REDIRECT   = 'https://redirect.self.xyz';

// Derivado con Poseidon desde (REGISTRY, SCOPE_SEED) y comprobado contra
// `scope()` en mainnet. Si alguna vez se redespliega el registry, esto cambia.
const SCOPE_ESPERADO = '1791990282645894430767631087883723948916118618645082015976770485675938863393';

const SEL = { activeCount:'0x4331ed1f', isActive:'0x9f8a13d7', scope:'0x6e62d0a8' };

const $ = (id) => document.getElementById(id);

/* ---------- lectura de la cadena, por JSON-RPC pelado ---------- */
async function call(data) {
  const r = await fetch(RPC, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc:'2.0', id:1, method:'eth_call',
      params:[{ to: REGISTRY, data }, 'latest'] }),
  });
  const j = await r.json();
  if (j.error) throw new Error(j.error.message);
  return j.result;
}
const aBig = (hex) => BigInt(hex && hex !== '0x' ? hex : '0x0');
const pad  = (a) => '0'.repeat(24) + a.toLowerCase().replace(/^0x/, '');

/* ---------- construcción del link de Self ---------- */
function universalLink(direccion) {
  const app = {
    sessionId: crypto.randomUUID(),
    userIdType: 'hex',
    devMode: false,
    endpointType: 'celo',
    header: '',
    logoBase64: '',
    deeplinkCallback: '',
    disclosures: { minimumAge: EDAD_MIN },
    chainID: CHAIN_ID,
    version: 2,
    userDefinedData: '',
    appName: 'SUBI',
    scope: SCOPE_SEED,
    endpoint: REGISTRY.toLowerCase(),
    userId: direccion.toLowerCase().replace(/^0x/, ''),
  };
  return REDIRECT + '?selfApp=' + encodeURIComponent(JSON.stringify(app));
}

/* ---------- estado ---------- */
let direccion = '';
let qr = null;
let scopeOk = null;
let yaEstaba = false;

const esDireccion = (s) => /^0x[0-9a-fA-F]{40}$/.test(s);

function pintarQR() {
  const box = $('qrbox'), wait = $('qrwait'), link = $('deeplink');
  if (!esDireccion(direccion) || scopeOk === false) {
    box.innerHTML = ''; box.appendChild(wait); wait.style.display = '';
    box.classList.add('vacia');
    link.style.display = 'none';
    qr = null;
    return;
  }
  const url = universalLink(direccion);
  box.innerHTML = '';
  box.classList.remove('vacia');
  // El código va sobre una plaquita blanca propia, no sobre toda la caja.
  const plate = document.createElement('div');
  plate.className = 'qrplate';
  box.appendChild(plate);
  qr = new QRCode(plate, { text:url, width:226, height:226,
    colorDark:'#070B14', colorLight:'#ffffff', correctLevel: QRCode.CorrectLevel.L });
  link.href = url;
  link.style.display = '';
}

async function leerCadena() {
  try {
    const [cnt, scp] = await Promise.all([call(SEL.activeCount), call(SEL.scope)]);
    $('mPadron').textContent = aBig(cnt).toString();
    $('pill').classList.add('live');

    const scopeCadena = aBig(scp).toString();
    const coincide = scopeCadena === SCOPE_ESPERADO;
    if (scopeOk !== coincide) {
      scopeOk = coincide;
      $('mScope').textContent = coincide ? 'coincide' : 'NO coincide';
      $('mScope').className = 'v ' + (coincide ? 'ok' : 'bad');
      $('warnScope').style.display = coincide ? 'none' : '';
      pintarQR();
    }

    if (esDireccion(direccion)) {
      const act = aBig(await call(SEL.isActive + pad(direccion))) === 1n;
      $('mTu').textContent = act ? 'en el padrón' : 'sin verificar';
      $('mTu').className = 'v ' + (act ? 'ok' : '');
      $('done').style.display = act ? '' : 'none';
      // Al pasar de fuera a dentro, el QR ya no sirve: se retira.
      if (act && !yaEstaba) { yaEstaba = true; pintarQR(); }
      if (!act) yaEstaba = false;
      if (act) { $('qrbox').style.display = 'none'; $('deeplink').style.display = 'none'; }
      else { $('qrbox').style.display = ''; }
    } else {
      $('mTu').textContent = '—';
      $('mTu').className = 'v';
      $('done').style.display = 'none';
      $('qrbox').style.display = '';
    }
  } catch (e) {
    $('pill').classList.remove('live');
  }
}

$('addr').addEventListener('input', (e) => {
  direccion = e.target.value.trim();
  const malo = direccion.length > 0 && !esDireccion(direccion);
  $('addrMsg').style.display = malo ? '' : 'none';
  yaEstaba = false;
  pintarQR();
  leerCadena();
});

/* ============================================================
   Idioma
   ============================================================ */
const EN = {
  'nav': `
    <a href="/demo">← Back to the demo</a>
    <a href="/">The project</a>
    <a href="/proposal">The proposal</a>`,
  'hero.badge': '<i></i> Celo mainnet · chain 42220',
  'hero.h': 'Prove you are a unique person and start getting paid',
  'hero.lead': `
    The dividend is not requested and not approved: it is divided among the verified people in the
    register. Verifying is the only requirement, and it is done with your document without handing
    it to anyone.`,
  'steps': `
    <div class="vstep">
      <div class="vn">01</div>
      <div>
        <h4>Enter the address you want to be paid at</h4>
        <p>Your document gets bound to this address. One document cannot hold two, and reassigning it means waiting 30 days, so choose carefully.</p>
        <input id="addr" class="vinput" placeholder="0x…" spellcheck="false" autocomplete="off">
        <p id="addrMsg" style="margin-top:10px;font-size:14px;color:var(--red);display:none">That is not a valid address.</p>
      </div>
    </div>

    <div class="vstep">
      <div class="vn">02</div>
      <div>
        <h4>Scan with the Self app</h4>
        <p>The proof is generated <b>on your phone</b>. The document never travels: what comes out is a zero-knowledge proof saying you are over 18 and a unique person, without revealing who.</p>
        <p style="margin-top:10px">Reading this on a phone? Open the direct link instead of scanning.</p>
      </div>
    </div>

    <div class="vstep">
      <div class="vn">03</div>
      <div>
        <h4>That is it, you are in the register</h4>
        <p>Self's hub validates the proof and registers you in the contract. From that moment the dividend accrues per second. Claiming is a separate transaction and you can leave it for whenever: waiting a year costs the same as waiting a day.</p>
      </div>
    </div>`,
  'qr.wait': 'Enter an address above and the code appears here',
  'qr.open': 'Open the Self app',
  'live': 'reading the chain',
  'k.padron': 'People in the register',
  'k.tu': 'Your address',
  'k.scope': 'Scope against the contract',
  'k.reg': 'Registry',
  'warn.scope': '<p><b>Do not scan.</b> The scope this page builds does not match the one the deployed contract reports, so the hub would reject the proof.</p>',
  'done.h': 'You are in the register',
  'done.p': 'The dividend accrues from now. Claiming is a separate transaction.',
  'foot.note': `
    This page never signs anything and never sees your document. Self's hub submits the proof to Celo
    mainnet, and registration happens inside <code>customVerificationHook</code>, which only the hub
    can trigger. There is no other way into the register.`,
  'foot.legal': 'SUBI · Space Universal Basic Income. No token, no presale and not for profit.',
};

const META = {
  es: { title:'SUBI · Verificar', desc:'Verificá que sos una persona única con Self y entrá al padrón de SUBI en Celo mainnet.' },
  en: { title:'SUBI · Verify',    desc:'Prove you are a unique person with Self and join the SUBI register on Celo mainnet.' },
};

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

  // El bloque de pasos se reemplaza entero, así que el input es otro nodo:
  // hay que recablear el listener y devolverle el valor que había.
  const input = $('addr');
  if (input) {
    input.value = direccion;
    input.addEventListener('input', (e) => {
      direccion = e.target.value.trim();
      const malo = direccion.length > 0 && !esDireccion(direccion);
      $('addrMsg').style.display = malo ? '' : 'none';
      yaEstaba = false;
      pintarQR();
      leerCadena();
    });
  }
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
leerCadena();
setInterval(leerCadena, 6000);

})();
