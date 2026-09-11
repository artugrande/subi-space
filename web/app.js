/* ============================================================
   SUBI · home: calculadora, idioma y movimiento
   ============================================================ */
(function () {

const { EN, DYN, META } = window.SUBI_I18N;
const $ = (id) => document.getElementById(id);

const POVERTY = 2.15;               // línea de pobreza extrema, Banco Mundial
const M = { econ: 1800e9 };

let lang, T;
const esCache = new Map();

/* ---------- formato ---------- */
const nf = (v, d = 0) =>
  v.toLocaleString(T.locale, { minimumFractionDigits: d, maximumFractionDigits: d });

function human(v) {
  if (v >= 1e12) return nf(v / 1e12, v / 1e12 < 10 ? 2 : 1) + ' ' + T.trillion;
  if (v >= 1e9)  return nf(v / 1e9,  v / 1e9  < 10 ? 2 : 0) + ' ' + T.billion;
  if (v >= 1e6)  return nf(v / 1e6,  v / 1e6  < 10 ? 2 : 0) + ' ' + T.million;
  return nf(v, 0);
}

/** Concuerda el sustantivo con la escala: "100 millones de personas". */
function people(v) {
  const s = human(v);
  if (new RegExp(T.million + '|' + T.billion + '|' + T.trillion).test(s)) return s + ' ' + T.ofPeople;
  return s + ' ' + (v === 1 ? T.person : T.people);
}

/** Redondea a 1, 2, 2.5 o 5 por década para que los sliders den valores prolijos. */
function nice(v) {
  const e = Math.floor(Math.log10(v));
  const m = v / Math.pow(10, e);
  const s = m < 1.5 ? 1 : m < 2.2 ? 2 : m < 3.5 ? 2.5 : m < 7.5 ? 5 : 10;
  return s * Math.pow(10, e);
}

const logScale = (v, min, max) => {
  const a = Math.log10(min), b = Math.log10(max);
  return Math.pow(10, a + (v / 100) * (b - a));
};

function fmtMoney(v) {
  if (v >= 1000) return human(v);
  if (v >= 1)    return nf(v, 2);
  if (v >= 0.01) return nf(v, 3);
  return nf(v, 5);
}

/* ---------- sensibilidad del dividendo ---------- */
function renderMacro() {
  const levy   = +$('m-lev').value / 10;
  const padron = Math.round(nice(logScale(+$('m-pad').value, 1e7, 6.6e9)));

  $('m-lev-v').textContent = nf(levy, 1) + '%';
  $('m-pad-v').textContent = people(padron);

  const inflow  = M.econ * (levy / 100);
  const perYear = inflow / padron;
  const perDay  = perYear / 365;

  $('m-out').innerHTML = fmtMoney(perDay) + '<small>' + T.perDay + '</small>';
  $('m-out2').textContent =
    'USD ' + fmtMoney(perYear) + ' ' + T.perPersonYear + '  ·  ' + T.inflow + ' ' + human(inflow);

  const pct = (perDay / POVERTY) * 100;
  $('m-bar').style.width = Math.min(100, pct) + '%';

  let cls, txt;
  if (perDay >= POVERTY)   { cls = 'good'; txt = T.povAbove; }
  else if (perDay >= 0.5)  { cls = 'mid';  txt = T.povPartial(nf(pct, 0)); }
  else if (perDay >= 0.05) { cls = 'mid';  txt = T.povLow(nf(pct, 1)); }
  else                     { cls = 'bad';  txt = T.povSymbolic(fmtMoney(perYear)); }

  $('m-verdict').className = 'verdict ' + cls;
  $('m-verdict').textContent = txt;
}

/* ---------- idioma ---------- */
function applyLang(next) {
  lang = next;
  T = DYN[next];
  try { localStorage.setItem('subi.lang', next); } catch (e) {}

  document.documentElement.lang = next;
  if (META[next]) {
    document.title = META[next].title;
    const md = document.querySelector('meta[name=description]');
    if (md) md.content = META[next].desc;
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (!esCache.has(key)) esCache.set(key, el.innerHTML);
    if (next === 'es') el.innerHTML = esCache.get(key);
    else if (EN[key] !== undefined) el.innerHTML = EN[key];
  });

  document.querySelectorAll('.lang button').forEach((b) =>
    b.classList.toggle('on', b.dataset.lang === next));

  renderMacro();
  wireNav();
  reveal();
}

/* ---------- movimiento ---------- */
const REVEAL_SEL =
  'section .card, section .ask, section .tl-row, section .calc, section .note, section .tw, section .author';

let revObs = null;

/**
 * Aparición al hacer scroll. Solo recibe `.rv` (opacidad 0) lo que está por
 * debajo del viewport: si no, al cambiar de idioma con la página scrolleada
 * los bloques reconstruidos que quedaron arriba nunca vuelven a intersectar
 * y se quedarían invisibles para siempre.
 */
function reveal() {
  if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  if (revObs) revObs.disconnect();

  revObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      en.target.classList.add('in');
      revObs.unobserve(en.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });

  document.querySelectorAll(REVEAL_SEL).forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) {
      el.classList.add('in');           // ya visible o ya pasado: sin animar
      return;
    }
    el.classList.add('rv');
    const sibs = [...el.parentElement.children].filter((s) => s.classList.contains('rv'));
    el.style.transitionDelay = Math.min(sibs.indexOf(el), 5) * 70 + 'ms';
    revObs.observe(el);
  });
}

/** Resalta el link de la sección visible. Se recablea al cambiar de idioma. */
let navObserver = null;
function wireNav() {
  if (navObserver) navObserver.disconnect();
  const links = [...document.querySelectorAll('.navlinks a')].filter(
    (a) => a.getAttribute('href').startsWith('#'));
  const secs = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if (!secs.length) return;

  navObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const i = secs.indexOf(en.target);
      if (i < 0) return;
      links.forEach((l) => l.classList.remove('on'));
      links[i].classList.add('on');
    });
  }, { rootMargin: '-45% 0px -50% 0px' });

  secs.forEach((s) => navObserver.observe(s));
}

/* ---------- listeners ---------- */
['m-lev', 'm-pad'].forEach((k) => $(k).addEventListener('input', renderMacro));

document.querySelectorAll('#m-econ button').forEach((b) => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#m-econ button').forEach((x) => x.classList.remove('on'));
    b.classList.add('on');
    M.econ = +b.dataset.v * 1e9;
    renderMacro();
  });
});

document.querySelectorAll('.lang button').forEach((b) => {
  b.addEventListener('click', () => applyLang(b.dataset.lang));
});

/* Barra de progreso de lectura, en el borde inferior del nav. */
const prog = $('prog');
if (prog) {
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/* ---------- init ---------- */
let stored = null;
try { stored = localStorage.getItem('subi.lang'); } catch (e) {}
let start = stored || ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en');
if (!['es', 'en'].includes(start)) start = 'es';

applyLang(start);

})();
