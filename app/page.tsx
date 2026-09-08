import Link from "next/link";

export default function Home() {
  return (
    <div className="container">
      <div className="hero">
        <h1>SUBI</h1>
        <p>
          Renta de recursos espaciales → humanos verificados → stablecoins
          locales. El Artículo I del Tratado de 1967 necesita infraestructura.
        </p>
        <Link href="/demo" className="cta-button">
          Ver demo del hackathon
        </Link>
      </div>

      <div className="section">
        <h2>Cómo funciona</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Identidad verificada sin datos</h3>
              <p>
                Leés el chip NFC de tu pasaporte. La prueba ZK se genera en tu
                dispositivo — el documento no se transmite. Self + +174 países.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Registro on-chain</h3>
              <p>
                Un <code>nullifier</code> único te identifica en el padrón, sin
                revelar tu identidad. Un humano, un asiento. Resistencia a
                sybil sin biometría.
              </p>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Cobro por demanda</h3>
              <p>
                El dividendo es una fracción del treasury, distribuido
                diariamente entre el padrón activo. Insolvencia imposible.
                Retirar en la moneda que uses: 21 stablecoins locales vía Mento
                y Ripio wFIAT.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Por qué Celo</h2>
        <p>
          <strong>Comisiones de ~USD 0,0005</strong> — el gas debe ser una
          fracción del monto distribuido.
        </p>
        <p>
          <strong>Abstracción de comisiones (CIP-64)</strong> — el gas se paga
          en la misma stablecoin que cobrás. Sin adquirir token de red.
        </p>
        <p>
          <strong>MiniPay</strong> — 11 millones de billeteras, canal de
          distribución existente en 60+ países. Sin instalar nada nuevo.
        </p>
        <p>
          <strong>Self nativo</strong> — prueba de humanidad y monedas locales
          en la misma red.
        </p>
      </div>

      <div className="section">
        <h2>Fundamento jurídico</h2>
        <p>
          Artículo I del Tratado del Espacio Ultraterrestre (1967): la
          exploración del espacio es{" "}
          <strong>"incumbencia de toda la humanidad"</strong>.
        </p>
        <p>
          Una obligación multilateral vigente, sin órgano recaudador ni padrón.
          SUBI no discute el derecho a extraer — implementa el deber de
          repartir.
        </p>
        <p style={{ marginTop: "1.5rem" }}>
          <Link href="/propuesta.md">→ Leer documento completo</Link>
          <br />
          <Link href="/SubiDistributor.sol.txt">
            → Revisar contrato del distribuidor
          </Link>
        </p>
      </div>

      <div className="footer">
        <p>
          Idea original de{" "}
          <a
            href="https://github.com/artugrande"
            target="_blank"
            rel="noopener noreferrer"
          >
            Arturo Grande
          </a>
        </p>
      </div>
    </div>
  );
}
