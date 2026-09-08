import Link from "next/link";

export default function Demo() {
  return (
    <div className="container">
      <div className="hero">
        <h1>Demo del Hackathon</h1>
        <p>
          Celo Agents at Work — Judges&apos; Favorite
          <br />
          Probá el SUBI Concierge Agent en acción
        </p>
      </div>

      <div className="section">
        <h2>Qué probar</h2>
        <p>
          Un agente conversacional que guía al usuario a verificar su identidad
          con Self, hacer un pledge al treasury de SUBI, depositar USDT, y
          cobrar el dividendo diario — todo con abstracción de comisiones en
          Celo.
        </p>
      </div>

      <div className="section">
        <h2>Mockups del flujo</h2>
        <div className="mockup-container">
          <div className="mockup">
            <div className="mockup-header">
              <div className="mockup-title">SUBI Concierge Agent</div>
              <div className="mockup-subtitle">Paso 1 · Bienvenida</div>
            </div>
            <div className="mockup-body">
              <div className="chat-message">
                ¡Hola! Soy el asistente de SUBI. Te voy a ayudar a registrarte,
                hacer un pledge al fondo, y cobrar tu dividendo espacial. ¿Listo
                para empezar?
              </div>
              <div className="chat-message user">Sí, quiero empezar</div>
              <div className="chat-message">
                Perfecto. Primero, vamos a verificar tu identidad con Self. Vas
                a necesitar tu pasaporte con chip NFC y un teléfono compatible.
                <br />
                <br />
                📱 La prueba se genera en tu dispositivo. No transmitimos tu
                documento.
              </div>
              <button className="action-button">
                Verificar con Self →
              </button>
            </div>
          </div>

          <div className="mockup">
            <div className="mockup-header">
              <div className="mockup-title">SUBI Concierge Agent</div>
              <div className="mockup-subtitle">
                Paso 2 · Verificación (simulada)
              </div>
            </div>
            <div className="mockup-body">
              <div className="chat-message">
                🎉 Verificación completa
                <br />
                <br />
                Tu <code>nullifier</code> se registró on-chain. Sos el humano
                #847 en el padrón de prueba.
                <span className="status-badge success">Verificado</span>
              </div>
            </div>
          </div>

          <div className="mockup">
            <div className="mockup-header">
              <div className="mockup-title">SUBI Concierge Agent</div>
              <div className="mockup-subtitle">
                Paso 3 · Pledge y depósito
              </div>
            </div>
            <div className="mockup-body">
              <div className="chat-message">
                Ahora podés hacer un pledge: comprometés un % de tus ingresos
                espaciales al treasury de SUBI.
                <br />
                <br />
                Para esta demo, depositá 0.1 USDT al treasury. Es simbólico pero
                queda registrado on-chain.
              </div>
              <button className="action-button">
                Depositar 0.1 USDT →
              </button>
              <div className="info-box" style={{ marginTop: "1rem" }}>
                🔒 Abstracción de comisiones (CIP-64) — el gas se paga en USDT,
                no necesitás CELO.
              </div>
            </div>
          </div>

          <div className="mockup">
            <div className="mockup-header">
              <div className="mockup-title">SUBI Concierge Agent</div>
              <div className="mockup-subtitle">Paso 4 · Cobro del dividendo</div>
            </div>
            <div className="mockup-body">
              <div className="chat-message">
                ✅ Depósito registrado
                <br />
                <br />
                Treasury actualizado: +0.1 USDT
                <br />
                Tu dividendo diario: ~0.003 USDT
              </div>
              <div className="chat-message user">¿Cómo cobro?</div>
              <div className="chat-message">
                Llamá a <code>claim()</code> cuando quieras. El dividendo se
                acumula cada día. Podés retirar en la moneda que elijas: wARS,
                wCOP, wMXN, cUSD, USDT... 21 opciones.
              </div>
              <button className="action-button">
                Cobrar dividendo →
              </button>
            </div>
          </div>

          <div className="mockup">
            <div className="mockup-header">
              <div className="mockup-title">SUBI Concierge Agent</div>
              <div className="mockup-subtitle">
                Paso 5 · Experiencia MiniPay
              </div>
            </div>
            <div className="mockup-body">
              <div className="chat-message">
                🎊 Cobro exitoso
                <br />
                <br />
                Retiraste 0.021 USDT (7 días acumulados)
                <br />
                <br />
                💡 En MiniPay, este flujo es completamente gasless. La
                experiencia es: verificar → cobrar → gastar. Sin pensar en gas,
                sin comprar tokens.
              </div>
              <div className="info-box">
                📲 MiniPay: 11M billeteras en 60+ países. El canal de
                distribución ya existe.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>Cómo probarlo vos</h2>
        <h3>Links del proyecto</h3>
        <ul className="link-list">
          <li>
            <strong>Repo del agente:</strong>{" "}
            <a
              href="https://github.com/artugrande/subi-concierge-agent"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/artugrande/subi-concierge-agent
            </a>
          </li>
          <li>
            <strong>ERC-8004 Agent ID:</strong>{" "}
            <a
              href="https://8004scan.io/agents/celo/9822"
              target="_blank"
              rel="noopener noreferrer"
            >
              9822 → 8004scan.io
            </a>
          </li>
          <li>
            <strong>Agent wallet:</strong>{" "}
            <code>0x35422f585e1f570515147E557aEF8fD6a6e1b3b3</code>
          </li>
          <li>
            <strong>Attribution tag:</strong> <code>celo_ac17e664a585</code>
          </li>
        </ul>

        <h3 style={{ marginTop: "2rem" }}>Contratos en Celo Mainnet</h3>
        <ul className="link-list">
          <li>
            <strong>Treasury:</strong>{" "}
            <code>0xaE18D9E48367Fc3d9D6977C221B1377Ce6B7c1A2</code>
          </li>
          <li>
            <strong>Registry:</strong>{" "}
            <code>0xA6e481f0D115aAd4193f5f8EC135939CF99D6C50</code>
          </li>
          <li>
            <strong>Distributor:</strong>{" "}
            <code>0xB3d836811DC211378285a39B8b0ba2ccCD086D81</code>
          </li>
          <li>
            <strong>PledgeRegistry:</strong>{" "}
            <code>0x89C15969Fd91271b62BD39a6200B46Abe1534F5d</code>
          </li>
          <li>
            <strong>Asset (USDT):</strong>{" "}
            <code>0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e</code>
          </li>
        </ul>

        <h3 style={{ marginTop: "2rem" }}>Estado actual</h3>
        <ul>
          <li>
            Treasury seeded con 0.5 USDT para la demo
          </li>
          <li>
            Fee abstraction configurado (el gas se paga en USDT, no en CELO)
          </li>
          <li>
            Path documentado para integración con MiniPay
          </li>
          <li>
            AskBots round-1 funded — 12 reviews recibidas
          </li>
          <li>
            Buy feedback issue:{" "}
            <a
              href="https://github.com/celo-org/buy-skill/issues/9"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/celo-org/buy-skill/issues/9
            </a>
          </li>
        </ul>

        <h3 style={{ marginTop: "2rem" }}>Contacto</h3>
        <p>
          Telegram:{" "}
          <a
            href="https://t.me/artugrande"
            target="_blank"
            rel="noopener noreferrer"
          >
            @artugrande
          </a>
        </p>
      </div>

      <div className="section">
        <h2>Shot list para video de submission</h2>
        <p>
          Si querés filmar el flujo completo para el hackathon, esta es la
          secuencia recomendada:
        </p>
        <ol>
          <li>
            <strong>Intro (10s):</strong> Problema — el Artículo I del Tratado
            de 1967 no tiene infraestructura. SUBI la construye.
          </li>
          <li>
            <strong>Shot 1 (20s):</strong> Abrir el agente. Mostrar la
            bienvenida y el inicio del flujo de Self.
          </li>
          <li>
            <strong>Shot 2 (15s):</strong> Simulación de Self — "verificación
            completa, nullifier registrado". Mostrar el padrón on-chain.
          </li>
          <li>
            <strong>Shot 3 (25s):</strong> Pledge + depósito de 0.1 USDT.
            Mostrar la transacción en el explorer. Destacar fee abstraction.
          </li>
          <li>
            <strong>Shot 4 (20s):</strong> Claim del dividendo. Mostrar el
            monto acumulado y la tx de cobro.
          </li>
          <li>
            <strong>Shot 5 (15s):</strong> Pantalla final — MiniPay como canal
            de distribución. 11M billeteras, 60+ países, gasless.
          </li>
          <li>
            <strong>Closing (10s):</strong> "SUBI Concierge Agent — Celo Agents
            at Work. Judges&apos; Favorite."
          </li>
        </ol>
        <p>
          <strong>Duración total:</strong> ~2 minutos
        </p>
      </div>

      <div className="footer">
        <p>
          <Link href="/">← Volver al inicio</Link>
        </p>
      </div>
    </div>
  );
}
