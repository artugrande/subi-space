# SUBI · Propuesta completa

**Para el documento completo, visitar:** https://subi.space (contenido histórico)

Esta es una versión resumida. El documento original contiene:

- Marco legal del Tratado del Espacio Ultraterrestre (1967)
- Análisis de urgencia: IA y rotación laboral
- Mecanismo técnico de 4 capas
- Comparativa con alternativas (Worldcoin, GoodDollar, PoH)
- Escenarios de financiamiento
- Piloto propuesto: 1.000 personas, USD 500.000 treasury
- Hoja de ruta hasta 2029

## Núcleo de la propuesta

El Artículo I del Tratado del Espacio Ultraterrestre establece que la exploración espacial es "incumbencia de toda la humanidad". Es una obligación multilateral vigente, pero sin infraestructura de cumplimiento.

SUBI implementa esa obligación:
- Renta de recursos espaciales → treasury on-chain
- Identidad verificada sin datos (Self + prueba ZK)
- Distribución diaria proporcional al padrón activo
- Cobro en 21 stablecoins locales (Mento + Ripio wFIAT)
- Fee abstraction: el gas se paga en la misma moneda que se cobra

## Contratos

- `SubiRegistry.sol` — padrón de nullifiers verificados
- `SubiTreasury.sol` — custodia y ledger de aportes
- `SubiDistributor.sol` — índice acumulado y distribución por demanda
- `PledgeRegistry.sol` — compromisos públicos de empresas espaciales

## Por qué Celo

- Comisiones de ~USD 0,0005 por transacción
- Abstracción de comisiones (CIP-64)
- MiniPay: 11M billeteras en 60+ países
- Self nativo
- 21 stablecoins locales

## Autor

Idea original de Arturo Grande.

Contacto: [Telegram @artugrande](https://t.me/artugrande)
