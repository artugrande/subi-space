# SUBI

### Space Universal Basic Income

**A public proposal for shared sovereignty over the resources of space**

Working document for Argentina Space 2026 (Salta, 11 to 13 November)

---

## 0. The thesis in one paragraph

International law already recognises that the resources of space belong to all of humanity. What has never existed is the technical infrastructure that makes that recognition effective for an actual person. At the same time, AI automation is weakening the link between income and employment for hundreds of millions of people. SUBI connects the two ends: an open, verifiable infrastructure with no speculative token, where any company or agency earning revenue from the exploration or exploitation of space can deposit a percentage of that profit, and any person with an identity document can prove they are a unique human being (without revealing who they are) and collect their share every day. The stack already exists and is in production: Self for zero-knowledge identity, Celo for stablecoin settlement at marginal cost.

The name is deliberate. In Spanish, *subí* reads as an invitation: get on board.

---

## 1. The gap SUBI exists to fill

### 1.1 What the treaties say

The **1967 Outer Space Treaty** (ratified by Argentina and by the 115 principal parties) establishes in **Article I** that the exploration and use of outer space "shall be carried out for the benefit and in the interests of all countries, irrespective of their degree of economic or scientific development, and shall be the province of all mankind". **Article II** prohibits national appropriation.

The **1979 Moon Agreement** tried to go further and declared lunar resources the "common heritage of mankind", requiring an international regime to govern their extraction. It failed: no spacefaring power (not the United States, Russia, China, India, Japan, nor any EU state) ratified it, precisely because the common-heritage clause was read as incompatible with commercial extraction.

The result: there is a benefit-sharing obligation in Article I, and **zero infrastructure to fulfil it**. No court, no collecting body, no register of recipients, no payment channel.

### 1.2 What states did in the meantime

- **2015**, USA: the *Commercial Space Launch Competitiveness Act* grants US companies ownership of the resources they extract from asteroids and the Moon.
- **2017**, Luxembourg; **2019**, United Arab Emirates: equivalent laws.
- **2020**, **Artemis Accords**, Section 10: signatories "affirm that the extraction of space resources does not inherently constitute national appropriation under Article II of the Outer Space Treaty".
- **Argentina signs the Artemis Accords on 27 July 2023**, at Casa Rosada, as the 28th country and the fifth in Latin America.

In other words: the world has already settled the easy half of the question (you may extract and sell). It never settled the other half (how the benefit of all humanity in Article I is actually delivered).

### 1.3 The political window opening now

UNCOPUOS's **Working Group on Legal Aspects of Space Resource Activities**, created in 2021, closes its five-year plan in **2027** with a set of recommended principles for possible adoption as a UN General Assembly resolution.

Argentina Space 2026 takes place in **November 2026**. The window to put a concrete benefit-sharing mechanism into that process is exactly now.

> **SUBI's diplomatic positioning is not antagonistic to Artemis. It is complementary.** It does not ask anyone to ratify the Moon Agreement, and it does not dispute the right to extract. It holds that if extraction is lawful (Artemis, Section 10), then Article I remains in force and needs an implementation. SUBI is that implementation: voluntary, auditable, and already built.

---

## 2. The other half of the problem: AI and the decoupling of income from employment

The urgency does not come from space. It comes from the labour market.

| Study | Finding |
|---|---|
| **IMF**, Staff Discussion Note SDN/2024/001, *Gen-AI: Artificial Intelligence and the Future of Work* (Cazzaniga, Jaumotte, Li, Melina, Panton, Pizzinelli, Rockall, Tavares, January 2024) | Around **40% of global employment** is exposed to AI. In advanced economies it rises to ~60%, in low-income economies ~26%. AI tends to **widen inequality** between and within countries. |
| **World Economic Forum**, *Future of Jobs Report 2025* (January 2025, 1,000+ employers, 14 million workers, 55 economies) | By 2030: **170 million jobs created, 92 million displaced**, net +78 million, but with structural churn of **22% of the 1.2 billion formal jobs** analysed and ~40% of skills changing. |
| **Goldman Sachs Global Investment Research** (2023) | The equivalent of **300 million full-time jobs** exposed to automation. |
| **Frey & Osborne**, Oxford (2013) | The foundational work: 47% of US employment in the high-risk category. |

The point is not the exact number, nor whether the net is positive. **The point is the churn.** 22% structural churn over seven years means hundreds of millions of people will go through periods without income, and that social protection systems tied to formal employment (which in Argentina covers less than half of all workers) will not reach them.

### 2.1 The evidence that direct transfers work

- **GiveDirectly, Kenya**: the largest and longest-running basic income study ever conducted. Since 2017, around 23,000 people across 195 villages, plus 100 control villages. The main group receives **USD 22.50 a month for twelve years**, and there are comparison groups receiving the same for two years and others receiving a single lump sum. Central result: **no reduction in work and no increase in alcohol consumption was recorded**. Recipients invested more, started more businesses and raised their incomes. Sustained monthly transfers improve food security; the lump sum does more for long-term investment.
- **Alaska Permanent Fund**: since 1982, a sovereign natural-resource fund (today ~USD 83 billion) has paid an annual dividend to every resident. In 2025 it was **USD 1,000 to more than 600,000 people**. It is the living precedent that resource rent can become a universal dividend, unconditional and with cross-party political acceptance for over forty years.

**SUBI is the Alaska Permanent Fund of space, with the register open to all of humanity and the accounting in a public ledger anyone can audit.**

---

## 3. The mechanism

Five layers. Each solves a specific problem and is built from pieces that exist and work today.

```
┌─────────────────────────────────────────────────────────────┐
│  LAYER 5   Governance and transparency                      │
│            Public dashboard, auditable reports              │
├─────────────────────────────────────────────────────────────┤
│  LAYER 4   Daily distribution                               │
│            Per-capita drip, claim on demand                 │
├─────────────────────────────────────────────────────────────┤
│  LAYER 3   Treasury and commitments                         │
│            Space Dividend Pledge, corporate contributions   │
├─────────────────────────────────────────────────────────────┤
│  LAYER 2   On-chain register                                │
│            Record of living, active humans                  │
├─────────────────────────────────────────────────────────────┤
│  LAYER 1   Identity                                         │
│            Self: ZK passport proof, unique nullifier        │
└─────────────────────────────────────────────────────────────┘
```

### 3.1 Layer 1: Identity, with Self

The requirement is strict: **one person, one payout**, without building a global biometric database and without anyone having to hand their personal data to anyone.

Self solves exactly that. It is an open-source identity protocol, founded by former members of Celo's core team, which acquired OpenPassport. It works like this:

1. The user scans the **NFC chip of their passport** (or Aadhaar, or equivalent documents) with their phone. Support for more than 174 countries.
2. The phone locally generates a **zero-knowledge proof** that the document is valid and signed by the issuing authority. **The document never leaves the device.**
3. The proof produces a **nullifier**: a unique, deterministic identifier derived from the document that reveals nothing about it. The same passport always produces the same nullifier for a given `scope`.
4. The `scope` is derived by hashing (Poseidon) a seed chosen by the app together with the contract address. This guarantees that a SUBI nullifier **cannot be correlated** with that of any other application using Self.
5. The user chooses what to disclose. For SUBI it is enough to prove: **legal age as a ZK predicate** (`age >= 18`, without revealing the date of birth) and optionally the **country code** (only for aggregate statistics and for jurisdictional pilots). **Nothing else. No name, no document number, no date of birth, no photograph.**

What SUBI stores on-chain per person is: a nullifier, a payout address, a timestamp and a two-letter country code. That is all.

> **Why this is not Worldcoin.** SUBI requires no proprietary biometric hardware, does not scan irises, does not create a speculative token, and does not give any company custody of a biometric database. It uses the document your state already gave you. The distinction matters in Argentina, where the orb model drew regulatory and data-protection objections. SUBI is designed so that the answer to "what data do they take" is, literally, none.

### 3.2 Layer 2: The on-chain register

The `SubiRegistry` contract inherits from `SelfVerificationRoot` (the abstract contract in Self's SDK that connects an app to the Identity Verification Hub V2). On validating a proof, the hub calls the contract's `customVerificationHook` with the disclosed and verified attributes.

Rules of the register:

| Rule | Implementation | Why |
|---|---|---|
| One human, one seat | `mapping(uint256 nullifier => address)` | Anti-sybil |
| Address rebinding | New proof from the physical document + 30-day cooldown | Lost phone or lost keys |
| Proof of life | Expires after 12 months, renewable with a new proof | Prevents payouts to dead or inherited accounts |
| Voluntary exit | `renounce()` frees the seat | The right to leave |
| Non-transferable | The seat is not an NFT and cannot be sold | Prevents secondary markets in payout rights |

On selling rights: it is not perfectly preventable, but the design makes it expensive. Buying someone's flow requires physically holding their document continuously and renewing the proof every twelve months. It is a possible attack but not a scalable one, and that is all you can ask of a system like this. I state it explicitly because any serious auditor will ask.

### 3.3 Layer 3: Treasury and the Space Dividend Pledge

The `SubiTreasury` contract custodies stablecoins (USDC, USDT or Mento's USDm) and is **open-entry**: anyone can contribute, without permission.

On top of it sits the layer that makes this a public proposal rather than just a contract: the **Space Dividend Pledge**.

A company or agency signs a public commitment on-chain in this form:

```
Organisation:        [name + on-chain identity]
Commitment:          X% of net revenue derived from
                     space resource activities
Annual floor:        USD N (minimum guarantee, independent of results)
Term:                [start] to [end], renewable
Verification:        hash of the audited report, published
                     quarterly against the contract
Non-compliance:      publicly visible on the dashboard,
                     with no legal sanction
```

**No legal force, on purpose.** A new treaty takes decades and dies in ratification (see: the Moon Agreement). The Pledge does not ask for coercive power, it asks for **legibility**: who committed, who complied, who did not, all in a public ledger nobody can edit. That is the only enforcement mechanism that works on reasonable timescales for global private actors, and it works through reputation, not sanction.

Plausible contributors, in order of ease:

1. **National space agencies**, with a fraction of technology-licensing returns (for CONAE this is a low-cost position of diplomatic leadership).
2. **Satellite constellation and Earth observation operators**, who already have revenue today and represent 70%+ of the real space economy.
3. **Launch and orbital logistics companies**, including SpaceX.
4. **Asteroid and lunar resource miners**, once they have revenue. This is the emblematic case and the one that will contribute the least money over the next decade.
5. **Philanthropic funds and states** wanting to capitalise the fund before space rent exists, so the rail is proven when it arrives.

### 3.4 Layer 4: Daily distribution

This is the technical heart and the part I thought about most. The requirement: **the system can never become insolvent, it must require no discretionary decisions about the amount, and the cost of operating it must be negligible.**

The solution is not to set the amount. **Derive it.**

```
period_budget = distributable_funds × draw_rate × (Δt / 365 days)

per_capita    = period_budget / active_humans
```

Where:
- `distributable_funds` = treasury balance minus what has already accrued and not been claimed
- `draw_rate` = an annual percentage, for example 4% (the same criterion as Alaska's POMV, which draws 5% of average market value)
- `active_humans` = the size of the current register

Properties that fall straight out of this formula:

- **Insolvency is impossible.** It distributes a percentage of what exists, never a promised amount. If the treasury falls, the drip falls. If it rises, it rises.
- **Zero discretion.** Nobody votes on how much each person gets: it comes out of a division. And nobody can change the draw rate, because the contract that applies it has no owner.
- **Aligned and visible incentive.** When more people join the register, the per-capita falls. That is not a bug: it is precisely the signal that pushes towards recruiting more contributors, and it makes the pressure on companies legible and quantified. The home page can say, in real time: *"if SpaceX contributed 1% of its revenue, each person would receive X today instead of Y."*
- **Perpetuity is possible.** With a draw rate below the real return, the fund becomes permanent and the dividend is forever.

**Accumulated-index accounting.** The obvious design mistake would be to iterate over the register to pay each person. With 10 million people that is impossible. Instead the accumulated-index pattern is used:

- The contract maintains a single global `accIndex`, representing what a hypothetical human present since inception would have received.
- Each user has a `checkpoint`.
- On claiming, they receive `accIndex - checkpoint[user]`, and their checkpoint is updated.

Gas cost is **O(1) per user, independent of how many days have passed without claiming and of how many people are in the register**. Someone can disappear for a year and come back, and their claim costs the same as someone who claims daily.

**A solvency detail that has to be handled**: `distributable_funds` must subtract what has accrued and not been claimed, otherwise the same money is counted twice. It is resolved in the contract skeleton accompanying this document.

**Expired register entries**: when someone stops renewing their proof of life, the active counter has to come down. Instead of a cron job, this is done lazily through a permissionless `reap()` function. And there is a nice property here: while the counter is overestimated, the system **underpays, never overpays**. The error is conservative by construction, so lazy cleanup is safe.

### 3.5 Layer 5: Governance and transparency

Everything that matters is public by default and requires trusting nobody:

- Treasury balance, live.
- Active register, live (aggregate count and by country, never identities).
- Today's per-capita and the historical series.
- Every contribution, attributed to the contributor.
- Every Pledge, with its quarterly compliance marked.
- The source code of every contract, public on GitHub under the MIT licence.
- **No human can move the fund.** On 11 September 2026 ownership of the treasury and the distributor was renounced on-chain: not even the author can redirect the funds or change the draw rate. Money only leaves when someone in the register claims.

**An explicit design decision: SUBI issues no token.** There is no presale, no airdrop, no valuation, no treasury held in a token of its own. You contribute stablecoins and you are paid in stablecoins. This eliminates three problems at once: classification as a security, capture of the project by speculators, and the legitimate suspicion that there is a business hiding behind the philanthropy. It is the difference between a proposal a foreign minister can sign and one they cannot.

---

## 4. The technical architecture

### 4.1 Why Celo, specifically

This is not a preference, it is a physical constraint of the problem. If the daily dividend is cents, **the network fee has to be a fraction of a cent or the system does not exist**. A USD 2 fee makes distributing 3 cents a day mathematically impossible.

| SUBI's requirement | What Celo provides |
|---|---|
| Fee smaller than the amount distributed | ~USD 0.0005 per transaction, ~1 second blocks |
| The user does not have to buy a gas token | **Fee abstraction (CIP-64)**: gas is paid in the same USDC or USDm being claimed. Critical for someone with no bank and no exchange |
| Stable and local currency | 31 stablecoins, including 15 from Mento and Ripio's 6 wFIAT (see 4.1.1) |
| A distribution channel that already exists | **MiniPay: 11 million wallets, 300+ million stablecoin transactions, 60+ countries**, running inside Opera Mini in emerging markets |
| Identity already lives here | Self is native to Celo. On-chain attestations anchor on Celo |
| Reach without a new app | ODIS and SocialConnect allow resolving a phone number to an address |

That combination of six things is not available on any other network today. The MiniPay point is the most underrated: **the distribution channel into the markets where basic income matters most is already deployed and has 11 million users.** SUBI does not have to build adoption, it has to appear in a catalogue.

### 4.1.1 The payout currency, and why the Argentine case solved itself

The choice of settlement currency decides whether the dividend arrives as purchasing power or as an unusable balance. Paying everything in dollars transfers currency risk to whoever can least absorb it (someone paid in dollars who spends in local currency holds a short position against their own currency and pays a spread on every conversion). Paying everything in local currency, in a high-inflation economy, erodes purchasing power between payout and spending. **So SUBI does not fix the currency: the user does.** The treasury is denominated in dollars, because space rent is invoiced in dollars, and settlement goes out in whichever currency each person configures.

On 31 July 2026, **Ripio deployed its wFIAT stack on Celo**: six Latin American stablecoins with **zero-cost on and off ramps**, among them **wARS** (Argentine peso), wBRL, wMXN, wCOP, wCLP and wPEN. With that addition Celo reaches **31 stablecoins**. Each wARS is backed 1:1 by pesos in reserves held at regulated financial institutions, with independent attestation by local public accountants. Ripio has operated since 2013 and reports more than 25 million users across seven countries.

The operational consequence for the pilot is direct: **an Argentine participant can receive their dividend in wARS and convert it to pesos with no ramp cost**, through an Argentine platform with an installed user base. The last leg towards consumption, which is where most digital transfer pilots fail, is solved without building anything.

To that add Mento's 15 local-currency stablecoins, with an on-chain swap inside the same claim transaction, and CIP-64 fee abstraction, which allows paying gas in the same stablecoin being claimed. For someone with no bank account and no access to an exchange, that last piece is the difference between being able to collect and not.

### 4.2 The contracts

```
SubiRegistry.sol      is SelfVerificationRoot
                      The register. Nullifier to address, expiry,
                      rebinding, renunciation, reap.

SubiTreasury.sol      Stablecoin custody. Open contributions.
                      Attribution ledger per contributor.

SubiDistributor.sol   Accumulated index, accrual, claim on demand.
                      Single source of truth for solvency.

PledgeRegistry.sol    Public commitments to contribute, hashes of
                      audited reports, compliance status.
```

Four contracts. None exotic. All the real risk is concentrated in the distributor's arithmetic, which is auditable in an afternoon.

`contracts/SubiDistributor.sol` in this folder holds the skeleton with the full accrual logic, commented, so it can be read and audited without installing anything.

On the addresses of Self's Identity Verification Hub V2 on Celo: **take them from Self's official documentation at the time of deployment, not from this document.** The public deployed-contracts page I consulted still lists the legacy (V1) addresses. Putting a wrong address in a contract that moves funds is the most common way to lose money, so no guessed address appears here.

### 4.3 The user flow, end to end

```
1. Opens subi.space (or the Mini App inside MiniPay)
2. Scans their passport chip with the phone
   → the ZK proof is generated on the device
3. The proof is verified on-chain against Self's hub
   → SubiRegistry registers them. One transaction, once.
4. Claims whenever they want. Daily, weekly, or when they remember.
   → gas is paid in the same stablecoin being claimed
5. At 12 months, renews their proof of life.
```

Five steps. No bank, no third-party KYC, no personal data handed to anyone, no gas token to buy.

---

## 5. The numbers

This is the part where most proposals of this kind lie. I would rather put the uncomfortable numbers up front, because they are what makes everything else credible.

### 5.1 How much money there really is

The most-cited projection (**World Economic Forum with McKinsey, April 2024**) puts the space economy at **USD 1.8 trillion a year by 2035**, up from ~630 billion in 2024. An honest warning: the sectors that capture the imagination (asteroid mining, lunar extraction, helium-3, orbital manufacturing) **are not the ones generating that number**. They are aspirational additions. The bulk is satellite constellations, Earth observation and connectivity. Other consultancies project considerably less, in the range of 850 to 935 billion.

### 5.2 Sensitivity table

Annual contribution to the treasury as a percentage of a USD 1.8 trillion space economy, divided across different register sizes. Annual dividend per person, in dollars:

| Register | 0.5% contribution (USD 9.0B) | 1% (USD 18.0B) | 3% (USD 54.0B) | 5% (USD 90.0B) |
|---|---|---|---|---|
| **10 million** | 900 | 1,800 | 5,400 | 9,000 |
| **100 million** | 90 | 180 | 540 | 900 |
| **1 billion** | 9 | 18 | 54 | 90 |
| **6.6 billion** (adults, 2035) | 1.36 | 2.73 | 8.18 | 13.64 |

### 5.3 What that table says

**The bad news, which has to come first:** a 5% levy on the entire 2035 space economy, divided among every adult on the planet, gives **USD 13.64 a year**. Three and a half cents a day. That is not a basic income, it is a gesture.

**The good news:** that same 5% divided among **100 million people** gives **USD 900 a year, USD 2.47 a day**, above the World Bank's extreme poverty line (USD 2.15 a day). That does change lives.

**The three conclusions that follow:**

1. **SUBI cannot be universal and meaningful at the same time, yet.** You have to choose. The recommendation is to start targeted (the lowest income deciles, or pilot jurisdictions) with the universal register **open from day one**, and universalise the amount as the fund grows. It is exactly Alaska's path: it started small and became structural.
2. **SUBI's value in 2026 is not the amount. It is the rail and the precedent.** The existence of a working, audited mechanism with real people being paid changes the conversation at UNCOPUOS from "benefit sharing would be desirable" to "benefit sharing is already operating, are you joining?". That difference is worth more than any 2026 amount.
3. **In a perpetual endowment model, the scale is measured in decades.** To pay USD 1 a day to a billion people permanently at a 4% draw rate requires a fund of **USD 9.1 trillion**. It is a generational project, as the Norwegian fund was. Promising otherwise would be lying.

### 5.4 The pilot, with numbers that add up

| Parameter | Value |
|---|---|
| Register | 1,000 people verified with Self, Argentina |
| Treasury | USD 500,000 in USDC on Celo |
| Payout currency | wARS, with a zero-cost off-ramp via Ripio |
| Duration | 12 months, with an explicit end date |
| Dividend | **USD 1.37 a day, ~USD 41 a month** |
| Comparable | GiveDirectly Kenya pays USD 22.50 a month |
| Total gas cost | ~USD 1,825 a year, conservative scenario |
| **Infrastructure overhead** | **0.37% of what is distributed** |

That last number is the strongest argument in the whole proposal and it is worth saying slowly: **distributing money to a thousand people every day, for a year, with cryptographic identity verification and publicly auditable accounting, costs less than 0.4% of the amount distributed.** Traditional assistance programmes operate with overheads of 10 to 30%. If claims are weekly rather than daily, it falls below 0.06%.

And the pilot generates publishable data: effects on food security, employment and mental health, with a control group, replicating GiveDirectly's methodology. That turns the pilot into a paper, and the paper into the argument for scaling.

---

## 6. Roadmap

| Phase | When | What |
|---|---|---|
| **0. Prototype** | Now to October 2026 | Four contracts on Celo Sepolia, Self integration, public dashboard, audit of the distributor |
| **1. Presentation** | **Argentina Space 2026**, Salta, 11 to 13 November | Live demo. The Space Dividend Pledge opens for signature. Argentine position paper |
| **2. Pilot** | 2027 | 1,000 people, 12 months, with an evaluation protocol and an academic institution as auditor |
| **3. Diplomacy** | 2027 | Presentation to the UNCOPUOS Working Group **ahead of its final report** |
| **4. Regional scale** | 2028 | Register opened to Latin America via MiniPay. First corporate contributors |
| **5. Open global register** | 2029+ | No jurisdictional restriction. The amount is determined by the fund |

---

## 7. Objections, and honest answers

**"No company will contribute voluntarily."**
Most probably will not. But the cost of contributing 0.5% is marginal compared with what these companies spend on social licence, and the Pledge offers something you cannot buy today: public, verifiable proof of compliance with Article I. The asymmetry also works in its favour: **a single organisation contributing is enough for the mechanism to exist and for everyone else to be on the record as absent.**

**"This is charity, not sovereignty."**
A fair criticism, and it deserves a direct answer. SUBI does not replace the fight for a binding international regime, it enables it. A working mechanism with people actually being paid is a fait accompli that changes the starting point of any negotiation. The realistic alternative is not a binding regime tomorrow, it is nothing for another twenty years.

**"People without a passport are left out."**
True, and it is the design's most serious limitation. Self already supports more than 174 countries and documents such as Aadhaar, but there are undocumented populations (precisely the poorest). Phase 2 mitigation: integrating additional national documents and community attestation schemes. Acknowledging it is part of the proposal, not a footnote.

**"The treasury will get hacked."**
A real risk in any system holding funds on-chain. Mitigation: minimal contracts with no exotic functions, external audit before the pilot, a per-period draw limit encoded in the contract (even if the register is emptied, no more than the draw rate can be taken out), and contracts with no owner: on 11 September 2026 ownership of the treasury and the distributor was renounced on-chain, so nobody, not even the author, can redirect the fund or change the rate.

**"GoodDollar already exists."**
It does, and it is a valuable precedent: GoodDollar has distributed a daily basic income on Celo since 2020. Proof of Humanity with the UBI token also exists, with Argentine roots in the work of Democracy Earth and Santiago Siri. SUBI differs in two ways: **the funding has a specific and legally grounded origin** (space resource rent under Article I, not the issuance of a token of its own), and **there is no token**. That makes it something a state can back without exposure.

**"Why crypto and not a bank transfer?"**
Because the register is global and no bank operates globally without friction; because the cost per transfer has to be a fraction of a cent; because public auditability of the treasury is the only substitute for a coercive power that does not exist; and because 40% of the target population has no bank account but does have a phone.

---

## 8. The specific ask at Argentina Space 2026

A proposal without a specific ask is a talk. Here is the ask, and it is three things:

**1. That Argentina take an operationalisable benefit-sharing proposal to UNCOPUOS.**
The Working Group on Legal Aspects of Space Resource Activities closes in 2027 with recommended principles. Argentina, an Artemis signatory since 2023 and holding a seat at COPUOS, is positioned to propose that those principles include a **voluntary benefit-sharing mechanism with individual recipients**, not only technology transfer between states. It is a position no other country has taken and one that costs nothing to hold.

**2. That Argentina offer itself as the pilot jurisdiction.**
CONAE as institutional counterpart, a national university as independent auditor, a thousand people in the register. Argentina as the first place in the world where someone collected a space dividend. The cost is low, the diplomatic visibility is high, and it fits the doctrine that space development is a state policy.

**3. That the Space Dividend Pledge open for signature in Salta.**
With the companies, agencies and universities present at the event. Even if the first commitment is symbolic, the on-chain register is open from that day, and dated.

---

## 9. Why this is defensible and not a fantasy

I will close with what, in my judgement, makes this proposal hold up in front of a technical and sceptical audience:

1. **It invents no law.** It rests on Article I of the 1967 Treaty, in force and ratified by all. It does not ask for the Moon Agreement to be ratified and does not dispute Artemis.
2. **It invents no technology.** Self, Celo, MiniPay and the stablecoins exist, are deployed and have real users today. There is no piece left to invent.
3. **It invents no evidence.** Alaska has paid a resource dividend for 44 years. GiveDirectly has spent nine years measuring what happens when you give money unconditionally. Both answers are in.
4. **It invents no business.** No token, no equity, no fee. That makes it signable by a state.
5. **It does not exaggerate the numbers.** The sensitivity table says plainly that a universal dividend in 2035 is cents. The value is in the rail and the precedent, and that can be defended without lying.
6. **The timing is real.** UNCOPUOS closes in 2027. Argentina Space is in November 2026. The window is open now and closes on its own.

---

## 10. Authorship

SUBI is **an original idea by Arturo Grande**. The mechanism, the legal framing and this document are his work, and are published openly so they can be discussed, criticised and adopted by any body or jurisdiction wishing to implement them.

**Arturo Grande** (Salta, 1995). Product Builder specialising in AI, fintech and Web3.

- Led product and marketing at [Eluter](https://www.eluter.com/), an international payments fintech that grew from USD 5 million to USD 65 million in monthly processed volume.
- Founder of [DESAFIA](https://desafia.tech/), an education platform for building digital products with AI.
- Professor of Digital Business ([UCEMA](https://www.ucema.edu.ar/)) and Cryptoeconomics ([UNCUYO](https://www.uncuyo.edu.ar/)).
- Digital products used in more than 40 countries.
- Winner of 11 international hackathons: Celo, ETHGlobal (Filecoin Track), Avalanche, Worldcoin, Stellar, Filecoin, GenLayer, ARKIV, PL Genesis, Aleph Hackathon and BNB Chain.
- Creator of [Builders OFF the Record](https://www.youtube.com/@artugrande/streams) and the [Artu Grande podcast](https://open.spotify.com/show/3nMj6xYsjwIvofrWg2IvIA). More than 300,000 plays.
- Ambassador for [Cursor](https://cursor.com/) (recently acquired by SpaceX), [v0 (Vercel)](https://v0.app/) and [Celo](https://celo.org/). Graduate of the Polkadot Blockchain Academy and a Devconnect 2025 Scholar (Ethereum Foundation).

[arturogrande.com](https://arturogrande.com/)

---

## Sources

**Space law**
- [Outer Space Treaty 1967, full text (NASA)](https://www.nasa.gov/history/SP-4225/documentation/cooperation/treaty.htm)
- [Moon Agreement 1979 (UNOOSA)](https://www.unoosa.org/oosa/en/ourwork/spacelaw/treaties/intromoon-agreement.html)
- [What is the Outer Space Treaty (The Planetary Society)](https://www.planetary.org/articles/what-is-the-outer-space-treaty)
- [Artemis Accords, text signed 13 Oct 2020 (NASA, PDF)](https://www.nasa.gov/wp-content/uploads/2022/11/Artemis-Accords-signed-13Oct2020.pdf)
- [Argentina signs the Artemis Accords, 27 Jul 2023 (NASA)](https://www.nasa.gov/news-release/nasa-welcomes-argentina-as-newest-artemis-accords-signatory)
- [Working Group on Legal Aspects of Space Resource Activities (UNOOSA)](https://www.unoosa.org/oosa/en/ourwork/copuos/lsc/space-resources/index.html)
- [UNCOPUOS and the quiet transformation of space resources law (EJIL: Talk!)](https://www.ejiltalk.org/uncopuos-and-the-quiet-transformation-of-space-resources-law/)
- [Section 10 of the Artemis Accords, analysis (Cuadernos de Derecho Transnacional)](https://e-revistas.uc3m.es/index.php/CDT/en/article/view/8947)

**AI and the future of work**
- [IMF, SDN/2024/001, *Gen-AI: Artificial Intelligence and the Future of Work* (PDF)](https://www.imf.org/-/media/files/publications/sdn/2024/english/sdnea2024001.pdf)
- [WEF, *Future of Jobs Report 2025* (full PDF)](https://reports.weforum.org/docs/WEF_Future_of_Jobs_Report_2025.pdf)
- [WEF, Future of Jobs Report 2025 press release](https://www.weforum.org/press/2025/01/future-of-jobs-report-2025-78-million-new-job-opportunities-by-2030-but-urgent-upskilling-needed-to-prepare-workforces/)

**Basic income evidence**
- [GiveDirectly, early findings from the 12-year Kenya study](https://www.givedirectly.org/basic-income/)
- [Innovations for Poverty Action, *The Effects of a Universal Basic Income in Kenya*](https://poverty-action.org/effects-universal-basic-income-kenya)
- [MIT Sloan, analysis of the 12-year study](https://mitsloan.mit.edu/ideas-made-to-matter/12-year-study-looks-effects-universal-basic-income)
- [Alaska Permanent Fund Dividend, official site](https://pfd.alaska.gov/)
- [The 2025 dividend of USD 1,000 (Alaska Beacon)](https://alaskabeacon.com/briefs/alaskas-2025-permanent-fund-dividend-will-be-1000-and-arrives-starting-oct-2/)

**Space economy**
- [McKinsey and WEF, the space economy towards USD 1.8 trillion by 2035](https://www.mckinsey.com/featured-insights/themes/the-space-economy-is-projected-to-reach-1-8-trillion-by-2035)

**Technical stack**
- [Self Protocol, documentation](https://docs.self.xyz/)
- [Self, contract integration (SelfVerificationRoot)](https://docs.self.xyz/contract-integration/basic-integration)
- [Celo Docs, build with Self](https://docs.celo.org/build-on-celo/build-with-self)
- [Self Protocol launch (Celo Blog)](https://blog.celo.org/self-protocol-a-sybil-resistant-identity-primitive-for-real-people-launches-following-acquisition-74fd3461a428)
- [Mento, local currency stablecoins](https://app.mento.org)
- [Celo Docs](https://docs.celo.org)

**Latin American stablecoins (Ripio's wFIAT)**
- [Ripio deploys the wFIAT stack on Celo with no-cost on/off ramps, July 2026 (Celo Blog)](https://blog.celo.org/ripio-deploys-wfiat-stack-on-celo-with-no-cost-on-off-ramps-expanding-the-leading-stablecoin-9f801b82b899)
- [Launch coverage (Blockchain.News)](https://blockchain.news/news/ripio-wfiat-stablecoins-celo-integration)
- [wFIAT, whitepaper (Ripio, October 2025)](https://cdn.prod.website-files.com/5f17344acf2c6d3c3a1d6238/691c742cb3658e24e24f7a3f_wFIAT%20-%20Whitepaper.pdf)
- [Ripio launches wARS (CoinDesk)](https://www.coindesk.com/markets/2025/11/01/latin-american-crypto-exchange-ripio-launches-argentine-peso-stablecoin-wars)
- [Chainlink and Ripio, ARS/USD and BRL/USD price feeds](https://action.ripio.com/en/blog/chainlink-and-ripio-launch-wars-usd-and-wbrl-usd-price-feeds-bringing-latin-american-currencies-to-defi)
- [Ripio, Latin American local stablecoins](https://www.ripio.com/en/cryptos/local-stablecoins)

**Precedents**
- [GoodDollar, basic income on Celo since 2020](https://www.gooddollar.org)
- [Proof of Humanity](https://proofofhumanity.id)

**The event**
- [Argentina Space 2026, official site](https://argentinaspace.com/)
- [Argentina Space 2026 in Salta, 11 to 13 November (El Tribuno)](https://www.eltribuno.com/salta/2026-1-12-8-43-0-argentina-space-2026-el-gran-encuentro-del-nuevo-ecosistema-espacial-tecnologico-e-industrial-se-realizara-en-salta)
