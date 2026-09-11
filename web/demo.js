/* ============================================================
   SUBI · /demo
   Recorrido animado del SUBI Concierge Agent: burbujas de chat y
   líneas de terminal sincronizadas, con autoplay y navegación por paso.
   ============================================================ */
(function () {

const $ = (id) => document.getElementById(id);

/* ============================================================
   Contenido del flujo
   `who`: a = agente, u = usuario, sys = evento del sistema
   `cls`: p = prompt, c = comentario, k = llamada, s = éxito
   ============================================================ */
const FLOW = {
  es: [
    {
      title: 'Bienvenida',
      chat: [
        { who: 'a', text: 'Hola. Soy el asistente de SUBI. Te ayudo a verificar tu identidad, aportar al fondo y cobrar tu <b>dividendo espacial</b>.' },
        { who: 'a', text: 'El fondo se financia con la renta de los recursos del espacio. Vos solo tenés que probar que sos una persona única.' },
        { who: 'u', text: 'Dale, empecemos' },
      ],
      term: [
        { cls: 'p', text: '$ subi-agent --network celo' },
        { cls: 'c', text: '  # identidad del agente en ERC-8004' },
        { cls: 'k', text: '  agent 9822 · 0x3542…b3b3' },
        { cls: 's', text: '  ✓ conectado · chain 42220' },
      ],
    },
    {
      title: 'Verificación con Self',
      chat: [
        { who: 'a', text: 'Escaneá el chip NFC de tu pasaporte. La prueba se genera <b>en tu teléfono</b>: el documento no se transmite a ningún lado.' },
        { who: 'sys', text: 'prueba ZK generada en el dispositivo · 1,2 s' },
        { who: 'a', text: 'Listo. Quedaste registrado con un <b>nullifier</b> único que no revela nada de tu documento. Sos el humano #847 del padrón.' },
      ],
      term: [
        { cls: 'p', text: '$ self verify --passport' },
        { cls: 'c', text: '  # la prueba la valida el hub de Self on-chain' },
        { cls: 'k', text: '  nullifier 0x7f3a…c081' },
        { cls: 'k', text: '  → SubiRegistry.register(nullifier)' },
        { cls: 's', text: '  ✓ 0x9d2c…4e1f' },
        { cls: 'c', text: '  activeCount 847' },
      ],
    },
    {
      title: 'Pledge y aporte',
      chat: [
        { who: 'a', text: 'Ahora podés aportar al treasury. En esta demo son 0,1 USDT: es simbólico, pero queda registrado on-chain.' },
        { who: 'u', text: 'Aportar 0,1 USDT' },
        { who: 'sys', text: 'gas pagado en USDT · no hace falta tener CELO' },
      ],
      term: [
        { cls: 'k', text: '  → SubiTreasury.deposit(100000, "demo")' },
        { cls: 'c', text: '  feeCurrency USDT · CIP-64' },
        { cls: 's', text: '  ✓ 0x41ab…9c72' },
        { cls: 'c', text: '  totalDeposited 0.5 USDT' },
      ],
    },
    {
      title: 'Cobro del dividendo',
      chat: [
        { who: 'a', text: 'El dividendo se acumula todos los días. No hace falta reclamarlo a diario: podés pasar meses sin entrar y cobrar cuesta lo mismo.' },
        { who: 'u', text: 'Cobrar' },
        { who: 'sys', text: '0,021 USDT · 7 días acumulados' },
      ],
      term: [
        { cls: 'k', text: '  → SubiDistributor.claimable(0x3542…)' },
        { cls: 'c', text: '  0.021 USDT · 7 días' },
        { cls: 'k', text: '  → SubiDistributor.claim()' },
        { cls: 's', text: '  ✓ 0xc7e0…b310' },
        { cls: 'c', text: '  gas O(1) sin importar el tiempo sin cobrar' },
      ],
    },
    {
      title: 'Retiro en moneda local',
      chat: [
        { who: 'a', text: 'Podés retirar en la moneda en la que vivís. En Argentina, <b>wARS</b>, con rampa de salida sin costo.' },
        { who: 'sys', text: 'wARS · wBRL · wMXN · USDm · KESm · +16' },
        { who: 'a', text: 'En MiniPay todo esto es gasless. La experiencia es: verificar, cobrar, gastar.' },
      ],
      term: [
        { cls: 'k', text: '  → swap USDT → wARS' },
        { cls: 'c', text: '  cotización del oráculo al momento del cobro' },
        { cls: 's', text: '  ✓ listo para gastar' },
        { cls: 'c', text: '  MiniPay · 11M billeteras · 60+ países' },
      ],
    },
  ],

  en: [
    {
      title: 'Welcome',
      chat: [
        { who: 'a', text: "Hi. I'm the SUBI assistant. I'll help you verify your identity, contribute to the fund and claim your <b>space dividend</b>." },
        { who: 'a', text: 'The fund is financed by rent from space resources. All you have to do is prove you are a unique person.' },
        { who: 'u', text: "Alright, let's start" },
      ],
      term: [
        { cls: 'p', text: '$ subi-agent --network celo' },
        { cls: 'c', text: '  # agent identity on ERC-8004' },
        { cls: 'k', text: '  agent 9822 · 0x3542…b3b3' },
        { cls: 's', text: '  ✓ connected · chain 42220' },
      ],
    },
    {
      title: 'Verify with Self',
      chat: [
        { who: 'a', text: 'Scan the NFC chip of your passport. The proof is generated <b>on your phone</b>: the document is never transmitted.' },
        { who: 'sys', text: 'ZK proof generated on device · 1.2 s' },
        { who: 'a', text: 'Done. You are registered with a unique <b>nullifier</b> that reveals nothing about your document. You are human #847 in the register.' },
      ],
      term: [
        { cls: 'p', text: '$ self verify --passport' },
        { cls: 'c', text: '  # the proof is validated on-chain by the Self hub' },
        { cls: 'k', text: '  nullifier 0x7f3a…c081' },
        { cls: 'k', text: '  → SubiRegistry.register(nullifier)' },
        { cls: 's', text: '  ✓ 0x9d2c…4e1f' },
        { cls: 'c', text: '  activeCount 847' },
      ],
    },
    {
      title: 'Pledge and contribute',
      chat: [
        { who: 'a', text: 'Now you can contribute to the treasury. In this demo it is 0.1 USDT: symbolic, but recorded on-chain.' },
        { who: 'u', text: 'Contribute 0.1 USDT' },
        { who: 'sys', text: 'gas paid in USDT · no CELO needed' },
      ],
      term: [
        { cls: 'k', text: '  → SubiTreasury.deposit(100000, "demo")' },
        { cls: 'c', text: '  feeCurrency USDT · CIP-64' },
        { cls: 's', text: '  ✓ 0x41ab…9c72' },
        { cls: 'c', text: '  totalDeposited 0.5 USDT' },
      ],
    },
    {
      title: 'Claim the dividend',
      chat: [
        { who: 'a', text: 'The dividend accrues every day. You do not need to claim daily: you can go months without opening this and claiming costs the same.' },
        { who: 'u', text: 'Claim' },
        { who: 'sys', text: '0.021 USDT · 7 days accrued' },
      ],
      term: [
        { cls: 'k', text: '  → SubiDistributor.claimable(0x3542…)' },
        { cls: 'c', text: '  0.021 USDT · 7 days' },
        { cls: 'k', text: '  → SubiDistributor.claim()' },
        { cls: 's', text: '  ✓ 0xc7e0…b310' },
        { cls: 'c', text: '  O(1) gas regardless of time since last claim' },
      ],
    },
    {
      title: 'Withdraw in local currency',
      chat: [
        { who: 'a', text: 'You can withdraw in the currency you actually live in. In Argentina, <b>wARS</b>, with a zero-cost off-ramp.' },
        { who: 'sys', text: 'wARS · wBRL · wMXN · USDm · KESm · +16' },
        { who: 'a', text: 'On MiniPay all of this is gasless. The experience is: verify, claim, spend.' },
      ],
      term: [
        { cls: 'k', text: '  → swap USDT → wARS' },
        { cls: 'c', text: '  oracle rate at the moment of payout' },
        { cls: 's', text: '  ✓ ready to spend' },
        { cls: 'c', text: '  MiniPay · 11M wallets · 60+ countries' },
      ],
    },
  ],
};

/* ============================================================
   Traducción de la parte estática
   ============================================================ */
const EN = {
  'nav': `
    <a href="/">← Back to the project</a>
    <a href="#flujo">The flow</a>
    <a href="#onchain">On-chain</a>
    <a href="#probar">Try it</a>
    <a href="#mcp">MCP</a>
    <a href="#piloto">The pilot</a>`,
  'hero.badge': '<i></i> Celo Agents at Work · Judges&#39; Favorite',
  'hero.h': 'SUBI Concierge Agent',
  'hero.lead': `
    A conversational agent that takes someone from zero to claiming their space dividend: verify
    identity with Self, contribute to the treasury and withdraw, without having to buy a network
    token to pay for gas.`,
  'flow.eyebrow': 'The flow, step by step',
  'flow.online': '● online · agent 9822',
  'flow.hint': 'Click any step to jump there.',
  'flow.disc': `
    An illustrated walkthrough of the agent flow. The addresses and contracts are real and live on
    Celo mainnet; the transactions shown here are a reconstruction, not a live execution.`,
  'oc.eyebrow': 'On-chain',
  'oc.h': 'What is actually deployed',
  'oc.facts': `
    <div class="fact"><div class="v">4</div><div class="l">contracts on<br>Celo mainnet</div></div>
    <div class="fact"><div class="v">9822</div><div class="l">agent ID<br>ERC-8004</div></div>
    <div class="fact"><div class="v">Self</div><div class="l">identity verified<br>with a ZK proof</div></div>
    <div class="fact"><div class="v">13</div><div class="l">local payout<br>currencies</div></div>`,
  'try.eyebrow': 'Try it',
  'try.h': 'Three ways to try the demo',
  'try.lead': `
    These are independent paths: you can take just one. The first two touch contracts that are
    already live on Celo mainnet.`,

  'try.cta': `
    <a href="/verify" class="btn primary">Verify and start receiving your basic income →</a>
    <a href="/dashboard" class="btn">Open the dashboard with your wallet</a>`,

  'try.paths': `
    <div class="path">
      <div class="path-n">A</div>
      <h4>Contribute to the treasury</h4>
      <div class="who">For companies, agencies and anyone holding USDT on Celo</div>
      <ol class="path-steps">
        <li>Hold USDT on Celo. <b>No CELO needed</b> for gas.</li>
        <li>Approve the spend to the treasury contract.</li>
        <li>Call <code>deposit(amount, "your attribution")</code>.</li>
        <li>Your contribution stays in the public ledger under your name.</li>
      </ol>
      <div class="path-foot">
        <a href="https://celoscan.io/address/0x093D55468acee5a9b11644d1E55097C4E99C2739#writeContract">Write to the contract ↗</a>
      </div>
    </div>

    <div class="path">
      <div class="path-n">B</div>
      <h4>Verify and claim the SUBI</h4>
      <div class="who">For anyone with an identity document</div>
      <ol class="path-steps">
        <li>Scan your document with the Self app. The proof is generated <b>on your phone</b>.</li>
        <li>Self's hub validates it and registers you: there is no other way in.</li>
        <li>The dividend starts accruing from that moment.</li>
        <li>Call <code>claim()</code> whenever you want, no rush: the cost is the same.</li>
      </ol>
      <div class="path-foot">
        <a href="/verify"><b>Verify and start claiming →</b></a>
      </div>
    </div>

    <div class="path">
      <div class="path-n">C</div>
      <h4>From an agent, over MCP</h4>
      <div class="who">For agents and AI tooling</div>
      <ol class="path-steps">
        <li>Point the client at the project's <code>/api/mcp</code>.</li>
        <li><code>subi_status</code> returns the fund, the register and today's dividend.</li>
        <li><code>subi_claimable</code> and <code>subi_registration</code> query an address.</li>
        <li><code>subi_build_deposit</code> and <code>subi_build_claim</code> return the transaction <b>unsigned</b>: the MCP holds nothing.</li>
      </ol>
      <div class="path-foot">
        <a href="https://github.com/artugrande/subi-concierge-agent/blob/main/docs/MCP.md">How to connect it ↗</a>
      </div>
    </div>`,

  'try.warn': `
    <p>
      <strong>Where the project stands.</strong> The full circuit works on Celo mainnet: the
      contracts are wired, the register is only written after a Self proof validated by its hub, and
      the treasury holds funds the distributor can pay out. What is left before the pilot is not
      technical: it is bringing contributors into the fund and closing the evaluation protocol with
      the university.
    </p>`,

  'try.body': `
    <h3 style="margin-top:52px">Run it locally</h3>
    <pre><span class="c"># clone and configure</span>
git clone https://github.com/artugrande/subi-concierge-agent
cd subi-concierge-agent &amp;&amp; npm install
cp .env.example .env   <span class="c"># set the RPC and the agent key</span>

<span class="c"># run the contract tests</span>
npx hardhat test

<span class="c"># start the agent interface</span>
npm run dev</pre>`,

  /* ---------- MCP ---------- */
  'mcp.eyebrow': 'From an agent',
  'mcp.h': 'The MCP, with the exact commands',
  'mcp.lead': `
    SUBI exposes its own MCP server: six tools over JSON-RPC 2.0. The four read tools need no keys.
    The two write tools return the transaction built and <b>unsigned</b>, so the server never
    custodies anything.`,
  'mcp.body': `
    <div class="note">
      <p>
        <strong>It is not hosted at a public URL yet.</strong> It runs locally with
        <code>npm run dev</code> and lives at <code>http://localhost:3000/api/mcp</code>. Said here
        so nobody wastes time looking for an endpoint that does not exist.
      </p>
    </div>

    <h3 style="margin-top:44px">Bring it up</h3>
    <div class="cmd"><pre><span class="c"># clone, install and run</span>
git clone https://github.com/artugrande/subi-concierge-agent
cd subi-concierge-agent &amp;&amp; npm install
npm run dev                      <span class="c"># MCP at /api/mcp, port 3000</span></pre></div>

    <h3 style="margin-top:40px">See which tools it exposes</h3>
    <div class="cmd"><pre>curl -s -X POST http://localhost:3000/api/mcp \\
  -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,<span class="k">"method":"tools/list"</span>}'</pre></div>

    <h3 style="margin-top:40px">Ask for the state of the fund</h3>
    <div class="cmd"><pre>curl -s -X POST http://localhost:3000/api/mcp \\
  -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
       "params":{<span class="k">"name":"subi_status"</span>,"arguments":{}}}'</pre></div>

    <h3 style="margin-top:40px">Build a claim without signing it</h3>
    <div class="cmd"><pre>curl -s -X POST http://localhost:3000/api/mcp \\
  -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call",
       "params":{<span class="k">"name":"subi_build_claim"</span>,
                 "arguments":{"address":"0x…"}}}'</pre></div>
    <p style="margin-top:-4px">It returns <code>to</code>, <code>data</code>, <code>value</code> and <code>feeCurrency</code>. Signing it is your problem, and that is the point.</p>

    <h3 style="margin-top:40px">Connect it to an MCP client</h3>
    <div class="cmd"><pre>{
  "mcpServers": {
    "subi": { "url": "http://localhost:3000/api/mcp" }
  }
}</pre></div>

    <h3 style="margin-top:44px">The six tools</h3>
    <div class="toolrow"><code>subi_status</code><span>Treasury balance, register size, distributable and the daily dividend per person.</span></div>
    <div class="toolrow"><code>subi_claimable</code><span>How much an address has accrued and can claim right now.</span></div>
    <div class="toolrow"><code>subi_registration</code><span>Whether an address is in the register and when its proof of life expires. It never exposes the nullifier.</span></div>
    <div class="toolrow"><code>subi_contracts</code><span>The Celo mainnet addresses and network data.</span></div>
    <div class="toolrow"><code>subi_build_deposit</code><span>Builds the <code>approve</code> and the <code>deposit</code>, unsigned.</span></div>
    <div class="toolrow"><code>subi_build_claim</code><span>Builds the <code>claim</code>, unsigned.</span></div>

    <div class="cta-row" style="margin-top:34px">
      <a href="https://github.com/artugrande/subi-concierge-agent/blob/main/docs/MCP.md" class="btn">MCP documentation ↗</a>
      <a href="/dashboard" class="btn primary">Prefer a UI? The dashboard</a>
    </div>`,

  /* ---------- el piloto ---------- */
  'pil.eyebrow': 'The pilot',
  'pil.h': 'What launches at Argentina Space',
  'pil.lead': `
    A thousand verified people, twelve months, with an independent academic auditor. These are the
    milestones and the metrics it will be measured against.`,

  'pil.tl': `
    <div class="tl-row"><div class="yr">Oct 2026</div><div class="txt"><b>Technical close.</b> Self verifier wired in, contracts audited and treasury connected to the distributor.</div></div>
    <div class="tl-row now"><div class="yr">11-13 Nov</div><div class="txt"><b>Argentina Space, Salta.</b> Live demonstration, the Space Dividend Pledge opens for signature, and the first registrations.</div></div>
    <div class="tl-row"><div class="yr">Dec 2026</div><div class="txt"><b>Cohort closed.</b> A thousand verified people and a control group defined with the university.</div></div>
    <div class="tl-row"><div class="yr">2027</div><div class="txt"><b>Twelve months of distribution</b> and a public report with the auditor. Submission to the UNCOPUOS Working Group ahead of its final report.</div></div>`,

  'pil.mh': 'The metrics we want to test',
  'pil.metrics': `
    <table>
      <thead><tr><th style="min-width:190px">Metric</th><th>How it is measured</th><th style="min-width:110px">Target</th></tr></thead>
      <tbody>
        <tr><td><b>People in the register</b></td><td>On-chain <code>activeCount</code></td><td class="hi">1,000</td></tr>
        <tr><td><b>Time to register</b></td><td>From document scan to confirmation</td><td class="hi">&lt; 3 min</td></tr>
        <tr><td><b>Cost to verify</b></td><td>Total registration gas divided by registrations</td><td class="hi">&lt; USD 0.01</td></tr>
        <tr class="hlrow"><td><b>Infrastructure overhead</b></td><td>Total gas over amount distributed</td><td class="hi">&lt; 0.5%</td></tr>
        <tr><td><b>Claims with no CELO in the wallet</b></td><td>Claims using <code>feeCurrency</code> in a stablecoin</td><td class="hi">100%</td></tr>
        <tr><td><b>90-day retention</b></td><td>Addresses that claimed at least once in the quarter</td><td class="hi">&gt; 70%</td></tr>
        <tr><td><b>Organisations with a Pledge</b></td><td>Commitments signed in <code>PledgeRegistry</code></td><td class="hi">≥ 3</td></tr>
        <tr><td><b>Withdrawal to local currency</b></td><td>Share that converted to wARS</td><td>Measured, no target</td></tr>
      </tbody>
    </table>`,

  'pil.note': `
    <p>
      The hypothesis to falsify is concrete: <strong>that distributing money to a thousand people
      every day costs less than 0.5% of what is distributed</strong>, and that someone with no bank
      account, no CELO and no prior knowledge can register and claim in under three minutes. If that
      does not hold, the mechanism does not work and it is better to know before proposing it at
      UNCOPUOS.
    </p>`,

  'pil.cta': `
    <a href="/proposal" class="btn primary">The full proposal</a>
    <a href="/" class="btn">Back to the project</a>`,

  'foot.legal': 'SUBI · Space Universal Basic Income. No token, no presale and not for profit.',
};

const DYN = {
  es: { pause: '❚❚ Pausar', play: '▶ Reproducir', restart: '↻ Reiniciar',
        title: 'SUBI Concierge Agent · Demo',
        desc: 'Recorrido ilustrado del SUBI Concierge Agent: verificar identidad con Self, aportar al treasury y cobrar el dividendo.' },
  en: { pause: '❚❚ Pause', play: '▶ Play', restart: '↻ Restart',
        title: 'SUBI Concierge Agent · Demo',
        desc: 'Illustrated walkthrough of the SUBI Concierge Agent: verify with Self, contribute to the treasury and claim the dividend.' },
};

/* ============================================================
   Motor de la animación
   ============================================================ */
const BUBBLE_GAP = 1100;   // ms entre burbujas
const LINE_GAP   = 420;    // ms entre líneas de terminal
const TAIL       = 2200;   // ms de respiro antes de pasar al siguiente paso

let lang = 'es';
let step = 0;
let playing = true;
let timers = [];
const esCache = new Map();

const reduced = window.matchMedia('(prefers-reduced-motion:reduce)').matches;

const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };
const later = (fn, ms) => timers.push(setTimeout(fn, ms));

function steps() { return FLOW[lang]; }

/** Duración total del paso, derivada de cuánto contenido tiene. */
function stepDuration(s) {
  const chatMs = s.chat.length * BUBBLE_GAP;
  const termMs = s.term.length * LINE_GAP;
  return Math.max(chatMs, termMs) + TAIL;
}

function renderStepsNav() {
  const nav = $('stepsNav');
  nav.innerHTML = steps().map((s, i) =>
    `<button class="stepbtn" data-i="${i}">
       <span class="n">${String(i + 1).padStart(2, '0')}</span>
       <span class="t">${s.title}</span>
       <span class="fill"></span>
     </button>`).join('');
  nav.querySelectorAll('.stepbtn').forEach((b) => {
    b.addEventListener('click', () => { playing = true; syncPlayBtn(); go(+b.dataset.i); });
  });
}

function markStepsNav() {
  $('stepsNav').querySelectorAll('.stepbtn').forEach((b, i) => {
    const on = i === step;
    b.classList.toggle('on', on);
    // reiniciar la animación de la barra de avance
    const fill = b.querySelector('.fill');
    fill.style.animation = 'none';
    void fill.offsetWidth;
    fill.style.animation = '';
    b.style.setProperty('--dur', (stepDuration(steps()[i]) / 1000) + 's');
    if (on && (!playing || reduced)) fill.style.animationPlayState = 'paused';
    else fill.style.animationPlayState = '';
  });
}

function play(i) {
  const s = steps()[i];
  const chat = $('chat');
  const term = $('term');
  chat.innerHTML = '';
  term.innerHTML = '';

  if (reduced) {
    // sin animación: se muestra todo el paso de una
    chat.innerHTML = s.chat.map((b) => `<div class="bub ${b.who}" style="animation:none;opacity:1;transform:none">${b.text}</div>`).join('');
    term.innerHTML = s.term.map((l) => `<div class="tl-line" style="animation:none;opacity:1"><span class="${l.cls}">${l.text}</span></div>`).join('');
    return;
  }

  // burbujas del chat, con indicador de "escribiendo" antes de cada una del agente
  s.chat.forEach((b, k) => {
    const at = k * BUBBLE_GAP;
    if (b.who === 'a') {
      later(() => {
        const t = document.createElement('div');
        t.className = 'typing';
        t.innerHTML = '<i></i><i></i><i></i>';
        chat.appendChild(t);
      }, Math.max(0, at - 550));
    }
    later(() => {
      const t = chat.querySelector('.typing');
      if (t) t.remove();
      const el = document.createElement('div');
      el.className = 'bub ' + b.who;
      el.innerHTML = b.text;
      chat.appendChild(el);
    }, at);
  });

  // líneas de la terminal
  s.term.forEach((l, k) => {
    later(() => {
      const prev = term.querySelector('.cursor');
      if (prev) prev.remove();
      const el = document.createElement('div');
      el.className = 'tl-line';
      el.innerHTML = `<span class="${l.cls}">${l.text}</span>`;
      term.appendChild(el);
      if (k === s.term.length - 1) {
        const c = document.createElement('span');
        c.className = 'cursor';
        el.appendChild(c);
      }
    }, k * LINE_GAP);
  });

  // avance automático
  if (playing) later(() => go((i + 1) % steps().length), stepDuration(s));
}

function go(i) {
  clearTimers();
  step = i;
  markStepsNav();
  play(i);
}

function syncPlayBtn() {
  $('playBtn').textContent = playing ? DYN[lang].pause : DYN[lang].play;
  $('restartBtn').textContent = DYN[lang].restart;
}

/* ============================================================
   Idioma
   ============================================================ */
function applyLang(next) {
  lang = next;
  try { localStorage.setItem('subi.lang', next); } catch (e) {}

  document.documentElement.lang = next;
  document.title = DYN[next].title;
  const md = document.querySelector('meta[name=description]');
  if (md) md.content = DYN[next].desc;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!esCache.has(key)) esCache.set(key, el.innerHTML);
    if (next === 'es') el.innerHTML = esCache.get(key);
    else if (EN[key] !== undefined) el.innerHTML = EN[key];
  });

  document.querySelectorAll('.lang button').forEach((b) =>
    b.classList.toggle('on', b.dataset.lang === next));

  renderStepsNav();
  syncPlayBtn();
  go(step);
}

/* ============================================================
   Listeners
   ============================================================ */
$('playBtn').addEventListener('click', () => {
  playing = !playing;
  syncPlayBtn();
  if (playing) go(step);
  else { clearTimers(); markStepsNav(); }
});

$('restartBtn').addEventListener('click', () => { playing = true; syncPlayBtn(); go(0); });

document.querySelectorAll('.lang button').forEach((b) => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

// No seguir animando en una pestaña que no se está mirando.
document.addEventListener('visibilitychange', () => {
  if (document.hidden) clearTimers();
  else if (playing) go(step);
});

/* ============================================================
   Init
   ============================================================ */
let stored = null;
try { stored = localStorage.getItem('subi.lang'); } catch (e) {}
let start = stored || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
if (!['es', 'en'].includes(start)) start = 'es';

if (reduced) playing = false;
applyLang(start);

})();
