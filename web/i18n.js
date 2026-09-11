/* ============================================================
   SUBI · diccionario inglés de la home
   El español vive inline en index.html (la página funciona sin JS).
   Este archivo solo aporta la traducción, con las mismas claves.

   Va dentro de una IIFE: si estas constantes quedaran en el scope
   global, app.js no podría desestructurarlas con el mismo nombre
   (SyntaxError por redeclaración de const).
   ============================================================ */
(function () {

const EN = {

  'nav': `
    <a href="#problema">Problem</a>
    <a href="#mecanismo">Mechanism</a>
    <a href="#numeros">Numbers</a>
    <a href="#diferencia">Difference</a>
    <a href="#estado">Status</a>
    <a href="#pedido">The ask</a>
    <a href="/demo" class="demo-link">Demo</a>`,

  'hero.thesis': `
    International law recognises that space resources belong to
    <b>all of humanity</b>. What is missing is the infrastructure to make that effective.`,

  'hero.cta': `
    <a href="/demo" class="btn primary">See the demo</a>
    <a href="#mecanismo" class="btn">How it works</a>
    <a href="/proposal" class="btn">Full document</a>`,

  'hero.chips': `
    <span class="chip">Identity · <b>Self</b> (ZK)</span>
    <span class="chip">Settlement · <b>Celo</b></span>
    <span class="chip">Payout · <b>13 local currencies</b></span>
    <span class="chip">Native token · <b>none</b></span>
    <span class="chip">Contracts · <b>live on mainnet</b></span>
    <span class="chip">Identity · <b>Self-verified</b></span>`,

  /* ---------- 01 problema ---------- */
  'p1.eyebrow': '01 · The problem',
  'p1.h': 'An obligation without infrastructure',
  'p1.lead': `
    Article I of the 1967 Outer Space Treaty declares space "the province of all mankind". It is a
    benefit-sharing obligation with no collector, no register and no payment channel.
    <a class="ref" href="https://www.nasa.gov/history/SP-4225/documentation/cooperation/treaty.htm">text</a>`,

  'p1.tl': `
    <div class="tl-row"><div class="yr">1967</div><div class="txt">The Treaty declares space the province of all mankind. No enforcement mechanism.</div></div>
    <div class="tl-row"><div class="yr">2015 · 2020</div><div class="txt">The US, Luxembourg and the UAE legislate ownership of what is extracted. Artemis, Section 10: extraction is not national appropriation. <b>The right to extract is settled; the duty to share is not.</b></div></div>
    <div class="tl-row"><div class="yr">2023</div><div class="txt">Argentina signs the Artemis Accords. <a class="ref" href="https://www.nasa.gov/news-release/nasa-welcomes-argentina-as-newest-artemis-accords-signatory">NASA</a></div></div>
    <div class="tl-row now"><div class="yr">2027</div><div class="txt">The UNCOPUOS Working Group concludes with recommended principles. <b>The window to put a mechanism in closes on its own.</b> <a class="ref" href="https://www.unoosa.org/oosa/en/ourwork/copuos/lsc/space-resources/index.html">UNOOSA</a></div></div>`,

  'p1.cards': `
    <div class="card">
      <div class="num">40%</div>
      <p>of global employment is exposed to AI. Absent public policy, it <strong>widens inequality</strong>.</p>
      <div class="srcline"><a href="https://www.imf.org/-/media/files/publications/sdn/2024/english/sdnea2024001.pdf">IMF · SDN/2024/001</a></div>
    </div>
    <div class="card">
      <div class="num">22%</div>
      <p>structural churn across 1.2 billion jobs by 2030. What matters is not the net balance: it is the transition.</p>
      <div class="srcline"><a href="https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf">WEF · Future of Jobs 2025</a></div>
    </div>`,

  /* ---------- 02 mecanismo ---------- */
  'p2.eyebrow': '02 · Mechanism',
  'p2.h': 'Four layers, all operational today',
  'p2.body': `
    <ul class="plain" style="margin-top:26px">
      <li><b>Identity.</b> ZK proof from the passport chip, generated on the phone. It yields a unique <code>nullifier</code> that reveals nothing about the document. 174+ countries. <a class="ref" href="https://docs.self.xyz/">Self</a></li>
      <li><b>Register.</b> One human, one seat. Proof of life every 12 months. Non-transferable.</li>
      <li><b>Treasury.</b> Permissionless contributions. Organisations declare on-chain what share of their space revenue they commit. Deliberately non-binding: it seeks legibility, not coercion.</li>
      <li><b>Distribution.</b> The amount is not set. It is derived.</li>
    </ul>

    <div class="formula">
      perCapita = (<span class="hl">distributable</span> × <span class="hl">drawRate</span> × Δt/365) / <span class="hl">activeHumans</span>
    </div>

    <ul class="plain">
      <li><b>Insolvency is impossible.</b> It distributes a fraction of what exists, never a promised amount.</li>
      <li><b>No discretion.</b> The amount comes from a division, not a vote.</li>
      <li><b>Perpetuity is viable.</b> With the draw rate below the real return, the fund is permanent. The Alaska Permanent Fund criterion, paying a dividend since 1982.</li>
    </ul>`,

  /* ---------- 03 números ---------- */
  'p3.eyebrow': '03 · Numbers',
  'p3.h': 'The numbers, unvarnished',
  'p3.lead': `
    The space economy is projected at <strong>USD 1.8 trillion a year by 2035</strong>. Move the
    parameters and see what actually comes out.
    <a class="ref" href="https://www.mckinsey.com/featured-insights/themes/the-space-economy-is-projected-to-reach-1-8-trillion-by-2035">WEF and McKinsey</a>`,

  'p3.concl': `
    <p>
      <strong>Universality and sufficiency do not yet coexist.</strong> Five percent spread across the
      planet's 6.6 billion adults yields USD 13.64 a year. Spread across 100 million, it clears the
      extreme poverty line. That is why it starts targeted with the register open, as Alaska did. The
      value in 2026 is not the amount: it is the precedent.
    </p>`,

  /* ---------- calculadora ---------- */
  'calc.m.title': 'Dividend sensitivity',
  'calc.m.econ': 'Space economy in 2035',
  'calc.m.wef': 'WEF / McKinsey · 1.8T',
  'calc.m.cons': 'Conservative · 900B',
  'calc.m.lev': 'Contribution to treasury',
  'calc.m.pad': 'Register size',
  'calc.m.pov': 'extreme poverty · USD 2.15/day',

  /* ---------- 04 diferencia ---------- */
  'p4.eyebrow': '04 · Difference',
  'p4.h': 'How it differs from other basic income projects',
  'p4.table': `
    <table>
      <thead><tr><th style="min-width:150px">Dimension</th><th>Worldcoin</th><th>GoodDollar</th><th style="color:var(--mint)">SUBI</th></tr></thead>
      <tbody>
        <tr><td><b>Proof of humanity</b></td><td>Iris, proprietary hardware</td><td>Liveness video</td><td class="yes">State-issued document, ZK proof on the phone</td></tr>
        <tr><td><b>Data handed over</b></td><td class="no">Biometrics to a private company</td><td class="mid">Public facial video</td><td class="yes">None</td></tr>
        <tr><td><b>Native token</b></td><td class="no">WLD</td><td class="no">G$</td><td class="yes">None, stablecoins only</td></tr>
        <tr><td><b>Source of funding</b></td><td class="mid">Own issuance and investors</td><td class="mid">Donated capital and issuance</td><td class="yes">Space rent, Art. I of the 1967 Treaty</td></tr>
        <tr><td><b>Payout currency</b></td><td class="mid">Volatile token</td><td class="mid">Volatile token</td><td class="yes">13 local currencies, user's choice</td></tr>
        <tr><td><b>State endorsement viable</b></td><td class="no">Data protection objections</td><td class="mid">No institutional angle</td><td class="yes">No token, no biometrics, no data capture</td></tr>
      </tbody>
    </table>`,

  'p4.foot': `
    The precedents deserve acknowledgement: <a href="https://www.gooddollar.org">GoodDollar</a> has
    distributed basic income on Celo since 2020, and <a href="https://proofofhumanity.id">Proof of Humanity</a>,
    originating in Democracy Earth, was the first to treat proof of humanity as a public good. SUBI's
    difference is not technical: it is the source of funding and the legal framing.`,

  /* ---------- 05 estado ---------- */
  'p5.eyebrow': '05 · Status',
  'p5.h': 'No longer a proposal on paper',
  'p5.body': `
    <p class="lead">
      The contracts are deployed on <strong>Celo mainnet</strong>, and a conversational agent walks
      through the full flow: verify, contribute and claim.
    </p>
    <ul class="plain" style="margin-top:24px">
      <li>Four contracts on mainnet: registry, treasury, distributor and pledge registry.</li>
      <li><b>Real Self verification.</b> Registration happens only after a zero-knowledge proof validated by the Self hub. There is no other way in.</li>
      <li><b>Its own MCP</b>, so an agent can query the fund and build unsigned transactions.</li>
      <li><b>Celo Agents at Work</b> · <b>Judges' Favorite</b>. On-chain ERC-8004 identity, agent ID 9822.</li>
    </ul>
    <div class="cta-row" style="margin-top:28px">
      <a href="/demo" class="btn primary">See the demo step by step</a>
      <a href="https://github.com/artugrande/subi-concierge-agent" class="btn">Agent repo</a>
    </div>`,

  /* ---------- 06 propuesta ---------- */
  'p6.eyebrow': '06 · The ask',
  'p6.h': 'Three concrete requests',
  'p6.asks': `
    <div class="ask">
      <div class="n">1</div>
      <h4>Bring the mechanism to UNCOPUOS</h4>
      <p>Argentina, an Artemis signatory with representation at COPUOS, can propose that the recommended principles include sharing with individual recipients, not only technology transfer between states.</p>
    </div>
    <div class="ask">
      <div class="n">2</div>
      <h4>Be the pilot jurisdiction</h4>
      <p>CONAE as counterpart, a national university as auditor and a thousand participants. The first jurisdiction in the world to settle a space resource dividend.</p>
    </div>
    <div class="ask">
      <div class="n">3</div>
      <h4>Open the Pledge for signature in Salta</h4>
      <p>With the companies and agencies present at Argentina Space 2026. Even if the first commitment is symbolic, the registry stays open and timestamped from that day.</p>
    </div>`,

  /* ---------- 07 autor ---------- */
  'p7.eyebrow': '07 · Author',
  'p7.h': 'An original idea by Arturo Grande',
  'p7.body': `
    <div class="author">
      <img class="photo" src="bio.jpg" alt="Arturo Grande" width="440" height="440" loading="lazy">
      <div>
        <h4>Arturo Grande</h4>
        <div class="role">Salta, 1995 · Product Builder specialised in AI, fintech and Web3</div>
        <ul class="plain">
          <li>Led product and marketing at <a href="https://www.eluter.com/">Eluter</a>, a payments fintech that grew from USD 5M to 65M in monthly volume. Founder of <a href="https://desafia.tech/">DESAFIA</a>.</li>
          <li>Lecturer in Digital Business (<a href="https://www.ucema.edu.ar/">UCEMA</a>) and Cryptoeconomics (<a href="https://www.uncuyo.edu.ar/">UNCUYO</a>).</li>
          <li>Winner of 12 international hackathons: Celo, ETHGlobal, Avalanche, Worldcoin, Stellar, Filecoin, BNB Chain and others.</li>
          <li>Ambassador for <a href="https://cursor.com/">SpaceXAI</a>, <a href="https://v0.app/">v0</a> and <a href="https://celo.org/">Celo</a>. Creator of <a href="https://www.youtube.com/@artugrande/streams">Builders OFF the Record</a>.</li>
        </ul>
        <div class="srcline"><a href="https://arturogrande.com/">arturogrande.com</a></div>
      </div>
    </div>`,

  /* ---------- footer ---------- */
  'foot.h': 'Sources',
  'foot.srcs': `
    <h4>Space law</h4>
    <ul>
      <li><a href="https://www.nasa.gov/history/SP-4225/documentation/cooperation/treaty.htm">Outer Space Treaty 1967 (NASA)</a></li>
      <li><a href="https://www.unoosa.org/oosa/en/ourwork/spacelaw/treaties/intromoon-agreement.html">Moon Agreement 1979 (UNOOSA)</a></li>
      <li><a href="https://www.nasa.gov/wp-content/uploads/2022/11/Artemis-Accords-signed-13Oct2020.pdf">Artemis Accords, signed text (NASA)</a></li>
      <li><a href="https://e-revistas.uc3m.es/index.php/CDT/en/article/view/8947">Section 10 of the Artemis Accords</a></li>
      <li><a href="https://www.nasa.gov/news-release/nasa-welcomes-argentina-as-newest-artemis-accords-signatory">Argentina signs the Artemis Accords (NASA)</a></li>
      <li><a href="https://www.unoosa.org/oosa/en/ourwork/copuos/lsc/space-resources/index.html">Working Group on Space Resources (UNOOSA)</a></li>
      <li><a href="https://www.ejiltalk.org/uncopuos-and-the-quiet-transformation-of-space-resources-law/">UNCOPUOS and space resources law (EJIL: Talk!)</a></li>
    </ul>
    <h4>AI and the future of work</h4>
    <ul>
      <li><a href="https://www.imf.org/-/media/files/publications/sdn/2024/english/sdnea2024001.pdf">IMF, SDN/2024/001, Gen-AI and the Future of Work</a></li>
      <li><a href="https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf">WEF, Future of Jobs Report 2025</a></li>
    </ul>
    <h4>Basic income evidence</h4>
    <ul>
      <li><a href="https://www.givedirectly.org/basic-income/">GiveDirectly, twelve-year study in Kenya</a></li>
      <li><a href="https://poverty-action.org/effects-universal-basic-income-kenya">IPA, The Effects of a Universal Basic Income in Kenya</a></li>
      <li><a href="https://pfd.alaska.gov/">Alaska Permanent Fund Dividend</a></li>
      <li><a href="https://www.worldbank.org/en/topic/poverty">World Bank, extreme poverty line</a></li>
    </ul>
    <h4>Space economy</h4>
    <ul>
      <li><a href="https://www.mckinsey.com/featured-insights/themes/the-space-economy-is-projected-to-reach-1-8-trillion-by-2035">McKinsey and WEF, USD 1.8 trillion by 2035</a></li>
    </ul>
    <h4>Stack</h4>
    <ul>
      <li><a href="https://docs.self.xyz/">Self Protocol</a></li>
      <li><a href="https://docs.celo.org/build-on-celo/build-with-self">Celo Docs, building with Self</a></li>
      <li><a href="https://app.mento.org">Mento, local-currency stablecoins</a></li>
      <li><a href="https://www.ripio.com/en/cryptos/local-stablecoins">Ripio, wFIAT stablecoins</a></li>
      <li><a href="https://github.com/artugrande/subi-concierge-agent">SUBI Concierge Agent (repo)</a></li>
    </ul>
    <h4>Prior art and event</h4>
    <ul>
      <li><a href="https://www.gooddollar.org">GoodDollar</a></li>
      <li><a href="https://proofofhumanity.id">Proof of Humanity</a></li>
      <li><a href="https://argentinaspace.com/">Argentina Space 2026, Salta</a></li>
    </ul>`,

  'foot.legal': `
    SUBI · Space Universal Basic Income. Working document and public proposal.
    No token, no presale and not for profit.`,
};

/* ---------- textos dinámicos de la calculadora ---------- */
const DYN = {
  es: {
    locale: 'es-AR',
    trillion: 'billones', billion: 'mil millones', million: 'millones',
    person: 'persona', people: 'personas', ofPeople: 'de personas',
    perDay: 'USD / día',
    perPersonYear: 'por persona por año',
    inflow: 'aporte total al treasury USD',
    povAbove: 'Por encima de la línea de pobreza extrema del Banco Mundial (USD 2,15 por día). A esta escala deja de ser simbólico y pasa a ser un piso de subsistencia.',
    povPartial: (p) => `Cubre el ${p}% de la línea de pobreza extrema. Es un complemento de ingreso real, no un piso de subsistencia.`,
    povLow: (p) => `Cubre el ${p}% de la línea de pobreza extrema. Alcanza para que el mecanismo exista y sea auditable, no para sostener a nadie.`,
    povSymbolic: (y) => `Simbólico: USD ${y} por año. Sirve como precedente jurídico y como infraestructura probada, no como renta.`,
  },
  en: {
    locale: 'en-US',
    trillion: 'trillion', billion: 'billion', million: 'million',
    person: 'person', people: 'people', ofPeople: 'people',
    perDay: 'USD / day',
    perPersonYear: 'per person per year',
    inflow: 'total contribution to treasury USD',
    povAbove: 'Above the World Bank extreme poverty line (USD 2.15 per day). At this scale it stops being symbolic and becomes a subsistence floor.',
    povPartial: (p) => `Covers ${p}% of the extreme poverty line. A real income supplement, not a subsistence floor.`,
    povLow: (p) => `Covers ${p}% of the extreme poverty line. Enough for the mechanism to exist and be auditable, not to sustain anyone.`,
    povSymbolic: (y) => `Symbolic: USD ${y} per year. It works as legal precedent and proven infrastructure, not as income.`,
  },
};

const META = {
  es: { title: 'SUBI · Space Universal Basic Income', desc: 'Renta básica universal fondeada por los recursos del espacio. Identidad con Self, liquidación en stablecoins locales sobre Celo.' },
  en: { title: 'SUBI · Space Universal Basic Income', desc: 'Universal basic income funded by space resources. Identity via Self, settlement in local stablecoins on Celo.' },
};

window.SUBI_I18N = { EN, DYN, META };

})();
