# subi.space

Source of **https://subi.space**, the site of SUBI (Space Universal Basic Income): a universal
basic income funded by the resources of space, live on Celo mainnet.

The contracts, the agent, the MCP server and the tests live in
[artugrande/subi-concierge-agent](https://github.com/artugrande/subi-concierge-agent). This repo
is only the website.

Demo video: https://x.com/ArtuGrande/status/2098540560306823513

## Pages

| Path | What it is |
|---|---|
| `/` | The project, in Spanish and English |
| `/verify` | Join the register with a Self zero-knowledge proof |
| `/dashboard` | The fund, read live from the chain. Claim, contribute, and swap USDT to 13 local currencies |
| `/demo` | Illustrated walkthrough of the agent flow |
| `/hackathon` | The tracks entered at Celo Agents at Work, with on-chain evidence for each |
| `/proposal` · `/propuesta` | The full proposal, in English and in Spanish |

## How it is built

Plain HTML, CSS and JavaScript in `web/`: no framework, no build step, no backend. Every
number on the site that describes the chain is read from Celo mainnet in the browser, through
`https://forno.celo.org`, so the site cannot drift from what is deployed.

The site never holds keys. `/dashboard` builds each transaction and the visitor's wallet signs
it, with the project's ERC-8021 attribution tag appended to the calldata. `/verify` only shows
a QR code: Self's relayer submits the proof, and the contract registers whoever it proves.

`build-paper.mjs` regenerates `web/propuesta.html` from `PROPUESTA-SUBI.md`. `PROPOSAL-SUBI.md` is the English source behind `web/proposal.html`.

## Contracts on Celo mainnet

| Contract | Address |
|---|---|
| SubiDistributor | `0x1f945618F4bFa0e131E07FfA0335e7Ada6556279` |
| SubiRegistry | `0x72Aa7f3B4ca2c230cd710Ef847015f0B963F0232` |
| SubiTreasury | `0x093D55468acee5a9b11644d1E55097C4E99C2739` |
| PledgeRegistry | `0x642b4F2737E85f42bae5Fc4830544EBCf48F1F13` |

The canonical list is `deployment-mainnet.json` in the agent repo.

## Deploy

```bash
cd web && vercel --prod
```

The previous Next.js version of this repo is kept in the `legacy-nextjs` branch.

## License

MIT
