/* ============================================================
   SUBI · /propuesta
   Índice lateral con seguimiento de la sección visible y barra
   de progreso de lectura.
   ============================================================ */
(function () {

const links = [...document.querySelectorAll('#toc a')];
const heads = links.map((a) => document.getElementById(a.dataset.id)).filter(Boolean);

/* --- resaltado de la sección en curso --- */
if (heads.length) {
  const seen = new Set();

  const mark = () => {
    // la sección activa es el último encabezado que quedó por encima del tercio superior
    let active = heads[0];
    for (const h of heads) {
      if (h.getBoundingClientRect().top <= window.innerHeight * 0.33) active = h;
      else break;
    }
    links.forEach((a) => a.classList.toggle('on', a.dataset.id === active.id));

    // mantener visible el ítem activo dentro del índice, sin arrastrar la página
    const on = document.querySelector('#toc a.on');
    const toc = document.querySelector('.toc');
    if (on && toc && toc.scrollHeight > toc.clientHeight && !seen.has(on)) {
      seen.add(on);
      const r = on.getBoundingClientRect(), t = toc.getBoundingClientRect();
      if (r.top < t.top || r.bottom > t.bottom) toc.scrollTop += r.top - t.top - t.height / 2;
    }
  };

  window.addEventListener('scroll', mark, { passive: true });
  window.addEventListener('resize', mark, { passive: true });
  mark();
}

/* --- barra de progreso --- */
const prog = document.getElementById('prog');
if (prog) {
  const onScroll = () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

})();
