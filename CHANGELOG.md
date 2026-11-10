# Changelog

## 1.6.0 · CTR 와이어프레임 — 2026-11-10
Builds on 1.5.2. Visual evidence for the CTR starting point and both decisions (KR + EN, light/dark, mobile).
- 01: AS-IS wireframe. A banner in the middle of a purchase-intent product list, which leads to a separate news board.
- 02, decision 1: "a louder banner" (considered) vs "carousel preview" (chosen).
- 04, decision 2: a wireframe inside each trade-off card. Automatic classification catches only keyword titles, leaving "?"; manual classification labels every update.
- 05: ITERATION 2 card and the screen below share a weak border, plus a "Shown below ↓" tag.
- Screen captions for ITERATION 1 and 2 now say "Reconstructed with a Starbucks example".
- Wireframes are lo-fi HTML/CSS and labelled explanatory. The dashed box marks the area that changes.

## 1.5.2 · 박스 안 문장 정리 — 2026-11-10
Internal notes removed from the visitor view (KR + EN). Visible text on all six pages now has no to-do or source-check language. CTR sentences reviewed line by line with Yubin.
- CTR 03: ~20% kept as Yubin's recollection, defined as any carousel interaction including clicks. The new hypothesis: irrelevant updates were mixed in, and only some titles ('discount', 'coupon', 'event') signalled value.
- CTR 03: "15% drop-off" → Venn reading. The 5% who clicked sit inside the 20% who interacted (same denominator), so the other 15 points are people who could be brought further.
- CTR: the "CTR ≈ 5%" card and the 06 numbers/chart now say "average across 6 brands" (brands varied).
- CTR 04: six types from memory (discounts, coupons, new & seasonal, merch, membership, collaborations), provisional until the original table is found. Content constraint added: brand-posted, crawled content couldn't be edited, so the display changed instead.
- CTR 04 image caption: "Reconstructed with a Starbucks example · 4 of the 6 types shown".
- CTR 06: limitation reworded. Before/after was measured on the same carousel area (defined by Yubin) with the same metrics; it was not an A/B test, so timing and posted content may differ.
- CTR: removed the v1.3/PR note, the "source verification" card text, the duplicate 06 caveat and the outdated "15%/20% excluded" note.
- Catalina: score/mapping to-dos cut; the outcome and mood-count lines state only what was decided. Kept for now: the Lottie disclaimer above the animation, until the original file is found.
- Admin: duplicate "not a production screen" line removed; "Where the evidence still needs work" box moved out of the visitor view; release-list and priority to-dos cut; the 06 outcome paragraph no longer repeats "not measured" (the 06 heading still says it).
- Lab: Problem-Framer evidence line keeps only what exists (live link + three-model design).
- Honest captions and public limitations marked `data-public-note` so the TODO detector skips them.
- Edit view only: three orange **DECISION** boxes. 1: CTR 20% (decided). 2: classification types (provisional). 3: first-release vs deferred feature (open).
- Figma fixes still needed in `gift-12.png`. They are listed in PR #7.

## 1.5.1 · 빨간 박스 편집 화면 전용 — 2026-11-09
- Red TODO boxes no longer show to visitors; they appear only in the edit view (`?versions=1`), alongside version outlines.
- Edit-view toggle renamed: "Show / Hide edit marks" (편집 표시 보기 / 숨기기). Turning it off shows exactly what visitors see.
- Not changed: the sentences inside the boxes. Outside the edit view they read as plain text, so internal notes are still visible to visitors until the next pass (1.5.2 · 박스 안 문장 정리).

## 1.5.0 · Argument & Editorial Clarity — 전체 논증 점검·문장 간결화 — 2026-11-07
Merged into main as PR #5 on 2026-11-09. First editorial pass only. Continued case rewrites are pending original evidence.
- Home: adopt exact approved English Hero *“What we see is only part of the story.”* with a Korean translation and CTA to Selected Work.
- Remove duplicate Homepage CTR reframe/pasta metaphor; keep original case cards and screenshots.
- Adjust desktop/mobile typography and editorial version-compare annotations for the new Hero.
- Remove six identical reader-irrelevant design-rationale notes from Admin and one from Catalina (original revisions preserved in Git).
- Document six-page **Context → Gap → Question → Evidence → Decision → Result → Contribution** audit, source gaps, required cuts and non-goals in [v1.5 Argument Audit](docs/V1.5_ARGUMENT_AUDIT.md).
- CTR’s reported 20% carousel movement and 5% click rate remain **unverified together** until original measurement cohorts and definitions are reconciled; no invented conversion funnel.
- Home: three distinct gaps (observed clicks vs why; AI capability vs use; data existence vs access) connected by an editorial Observe → Question → Decide method; case-card statements sharpened.
- CTR, Catalina and Admin: concise method origin, real application, bounded outcome and transferable design principle; two editor-only source requests per case.
- Lab: same method/transfer framing, with two source gaps for actual AI model comparisons and failure/evaluation logs.
- Fix review navigation: `?versions=1` persists across internal case links and new tabs. `main` v1.4 remains unchanged.


## 1.4.0 ★ · Evidence & Build Proof — 실제 의사결정·구현·검증 증거 보강 — 2026-11-06
Merged into main as PR #4 on 2026-11-07 (following v1.2 and v1.3).
- Added evidence-backed decision cards for CTR, Catalina and Admin: important problem, alternative/trade-off, chosen direction, bounded observable outcome and proposed repeat experiment.
- Added purple v1.4 ★ editorial annotations under the existing version overlay for provenance and source gaps; hidden from normal portfolio view.
- CTR: recover-and-classify persona source slot; specification for card-only banner → carousel → categorised carousel Figma scroll transition. Not implemented without three original aligned frames.
- Catalina: clarified raw output vs mood, staged progress vs truthful processing feedback, and next usability verification.
- Admin: clarified role-aware IA alternatives, release scope evidence gaps and task verification.
- Lab: collapsible Problem-Framer Build & Validation ledger with a live link, human-vs-AI contribution audit to complete, and proposed benchmark.
- [Evidence checklist](docs/V1.4_EVIDENCE_CHECKLIST.md) lists the four ★ criteria and outstanding source requirements.
- Audited all six visitor pages and added 16 purple v1.4 ★ IMAGE request slots to editor-only version mode, each with original asset, composition, evidence purpose, and provenance cautions. About intentionally gets no new image. See [image placement audit](docs/V1.4_IMAGE_AUDIT.md).
- No claim of user studies, product metrics, alternative prototypes or production assets has been fabricated.


## 1.3.0 · 논리 전면수정, 케이스별 어필포인트 피봇 — 2026-11-06
Case narrative pivot layered on top of v1.2; merged into main as PR #3 on 2026-11-07.
- Catalina AI: shift the central claim from mood/loading UI to **client music-IP opportunity → AI capability → user task → PoC/MVP scope**; move the original wireframe and two discovery routes forward; clarify sole-designer contribution versus team/product decisions; preserve the real search, creation and management screens; separate product delivery from unvalidated business/user outcomes.
- CTR: pivot to **business context → as-is diagnosis → carousel iteration (~2%→5%) → behavioural hypothesis → content categorisation/engineering trade-off → observed result (~10%)**; keep original content analysis and UI evidence.
- Remove contradictory 15% versus 20% interaction percentages from the persuasive result narrative until source definitions can be reconciled. CTR figures remain approximate observations, not causal proof.
- Update home case positioning, section navigation and responsive case-story diagrams.
- Original assets and v1.2 positioning remain preserved; this PR was subsequently merged into main.
- **Verification still required:** original analytics date windows and event denominators; questionnaire source/participant context; AI score semantics, precise mappings and original Lottie. Never infer unmeasured business outcomes.


## 1.2.0 · 논리 수정 1: 척추 문장 — 2026-11-06
Logic pass 1, spine line: "Where people get stuck, I get curious."
- Home hero line + CTR reframe scene (2% → ~~not interested?~~ → can't see the need yet? → pasta line → 2% → 10%)
- Home card titles and subtitles rewritten
- Footer slogan on all pages: "Curious first. Clear next." (Korean version added)
- About: "I question the brief before I open Figma." + stuck-moments subtitle
- Lab subtitle: "When I get curious, I build it to find out."
- Case summaries: Where people got stuck / What I got curious about / What changed
- Meta description updated

## 1.0.0 — 2026-11-05
First version on GitHub + Vercel (migrated from ChatGPT Sites, where it was "version 19").
- Three cases: CTR, Catalina AI, DoubleNC Admin; Lab; About
- KR/EN toggle, review mode with design-rationale and TODO notes
