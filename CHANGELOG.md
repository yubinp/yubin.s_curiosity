# Changelog

## 2.0.11 · 한글 Pretendard — 2026-11-18
- Load Pretendard Variable v1.3.9 using the official dynamic-subset CDN stylesheet.
- Use Pretendard before Noto Sans KR for Korean glyphs in both live styles and the typography comparison. Keep Geist and Boldonse for Latin, all approved size/weight/spacing values and case background palettes.

## 2.0.10 · 선택한 타이포 적용 — 2026-11-18
- Apply the full configuration from Yubin’s approved type-preview link to all live pages, matching the preview’s selectors and responsive breakpoint.
- Boldonse large titles: 77px desktop / 30px phone, weight 400, line 1.85, tracking -0.07em. Page/section titles: 54/32px, weight 400, line 1.6, tracking -0.07em.
- Lead weight 550; retain the selected seven-role text scale, About heading 32/22px, Korean body line 1.7, and English-only uppercase labels.
- Keep the comparison tool and per-case background colours.

## 2.0.9 · 케이스 색 복원·타이포 비교 — 2026-11-18
- Set the selected colour background to size 54 and light 100; keep saturation 32, amplitude 100, stars 100, speed 100, hue 0 and tone 74.
- Fix 2.0.8’s hardcoded home palette: read each page’s existing four colour tokens, restoring CTR teal/blue/green, Catalina violet/pink and Admin amber/coral.
- Add `type-preview.html`: actual page and language switching, desktop/phone sizes, seven text roles, two display title roles, About 28/32 comparison, original toggle, selected-role outlines, save and share. Typography is preview-only.

## 2.0.8 · 임시 컬러 배경 — 2026-11-18
- Apply the selected colour background to dark-mode portfolio pages: saturation 32, size 75, amplitude 100, stars 100, light 53, speed 100, hue 0, tone 74.
- Preserve every alternative and control at `space-preview.html`; no saved browser preference overrides the live selection.
- Disable the former background layers in dark mode to prevent overlap. Respect reduced motion. Light mode and typography remain unchanged; pending PR #35 is not merged.

## 2.0.7 · 유리 커서 — 2026-11-18
- Cursor (mouse and trackpad only, `cursor.js`): a small glass circle at rest. Over links and buttons it becomes a white lens that inverts what is under it, with OPEN, CLOSE or DRAG cut into it where a click opens or closes something. Over text it becomes a thin bar. A soft light in the page's colour trails behind it.
- The corners follow the size (circle → pill → bar) and the glass turns white only once it is thin, so moving onto text never flashes a white square.
- Folds: a folded card opens from anywhere on it. An open card closes from its question, from a new Close button at its end, and with a mouse or trackpad from anywhere on the card. Dragging or selecting text never opens or closes a card.
- Touch screens keep their normal behaviour; reduced motion turns off the trailing and the light.
- Numbered 2.0.7 because 2.0.6 (PR #35) is still waiting.

## 2.0.5 · 헤더 숨김 — 2026-11-17
- Header is compact by default (logo 18px, menu 12px, slimmer bar) and is glass at the top instead of near-black.
- Once you scroll, it becomes smaller (logo 16px) with no box and no dark band. A soft blur sits behind the top edge, and each item (logo, each menu link, language, theme) checks what is underneath — background colour or image brightness — and switches between light and dark text with a short fade.
- After a sixth of the page, scrolling down lets it slip away slowly (about one second) to keep the reader in the content. Scrolling up brings it back at once.
- Back at the top it returns to the compact glass bar. It stays visible while the phone menu is open or a header link has keyboard focus.
- The header is fixed, so its size changes never move the page.

## 2.0.4 · 행간 좁히기 — 2026-11-17
- Short text in cards and panels (method steps, Lab teaser, case cards, hero summary, project descriptions): line spacing 1.7–1.85 → 1.5 (Korean 1.6).
- Long reading paragraphs (section body, fold body, home proof paragraph, At a glance): 1.7 → 1.6 (Korean 1.7).
- Leads (section lead, home intro, method lead): 1.6 → 1.5 (Korean 1.6).

## 2.0.3 · 좌우 끝선 통일 — 2026-11-17
- One page edge for everything: header content, case boxes, lines, the next-project card and the footer start and end at the same left and right edge on every page and screen width. Content tops out at 1440px wide; the side margin is 16–48px.
- Before, the header capped at 1600px, the footer and case pages ran full width, the home page capped at 1600px, and sections set their own 5vw or 2vw margins. On screens wider than 1600px the edges drifted apart; the glass header made it visible.
- Case pages: the contents list, "At a glance" and "Evidence & limits" share one label column and one content start. Case hero, next-project card and the Role / Scope / Result row share one inner padding.
- Lab: the design-question box is glass and full width.
- `scripts/check-edges.js` checks all six pages at five widths; run it before every PR.
- Dark is now the default for first-time visitors (set in the page itself, so there is no light flash while loading). A visitor who picks light with the theme button keeps light.

## 2.0.2 · 메뉴 뒤 상자 제거 — 2026-11-17
- Desktop header: the menu (Work · Lab · About · language · theme) no longer has its own glass box on top of the glass header. The phone menu panel keeps its glass.

## 2.0.1 · 섹션 첫머리 타이포 — 2026-11-17
- Section titles larger: 37 → 48px on desktop, 21 → 28px on phones (English); Korean up to 52px.
- Question line smaller: 24 → 19px desktop, 17 → 16px phones; line spacing 1.35.
- Lead paragraph smaller and tighter: 21 → 17px desktop, 16 → 15px phones; line spacing 1.5 (Korean 1.6).
- Section labels ("02 / FIRST ITERATION") unchanged.

## 2.0.0 · 글래스 무드 — 2026-11-17
New mood, so a major version.
- Colour moves from flat fills into light: one fixed backdrop of soft colour fields sits behind every page, and surfaces (cards, folds, evidence panels, case heroes, Lab cards, header) are frosted glass. Text is black in light mode and white in dark mode.
- Each case has its own light: CTR teal, blue and green; Catalina violet and pink; Admin amber and coral. Home, Lab and About share a mixed set.
- Dark mode is the same system on near-black: smoked glass and stronger colour light. The existing theme button switches between the two.
- Beige paper, mint, sage and lavender fills are gone. The only solid accent is the "Continue reading" button (black in light, white in dark); the final result bar uses the case's light as a gradient.
- Phones use a lighter blur. With "reduce transparency" turned on, surfaces become solid.
- The backdrop is a single layer, so a later cinematic version can swap it for imagery or video without touching the surfaces.

## 1.8.2 · 이어 읽기 — 2026-11-17
- CTR folds now open as teasers: the question and the first few lines show, fading out, with a "Continue reading" button. Tapping the question switches between the teaser and the full text.
- Short folds show in full with no button. Links into a fold, the edit view and printing show the full text.
- Without JavaScript the folds stay plain open/close folds.
- Line spacing in four steps: titles 1.4 (Korean 1.3), questions and buttons 1.4, lead 1.6 (Korean 1.7), body and card text 1.7. Before, values ranged from 1.5 to 1.8 for the same roles.

## 1.8.1 · 본문 타이포와 펼침 배경 — 2026-11-17
- Reading text no longer uses tight tracking: lead −0.01em on desktop, 0 on phones; body 0.
- Phones get their own steps: question sub-line 17px/500, lead 16px (line spacing 1.62, Korean 1.72), body 15px, fold buttons 16px/500. Before, the desktop sizes (19/18/18px, all regular) came down to phones unchanged.
- Fewer one-word last lines where the browser supports it.
- An opened fold, button included, sits on a light tint of the case colour; boxes inside it turn white so they stand off the tint.
- Korean text breaks lines between words instead of inside them (e.g. "어려웠어" no longer splits as "어 / 려웠어").
- Version list: "머지 대기" labels removed.

## 1.8.0 · 제목 폰트 — 2026-11-16
- Page titles and section titles use the display font from the old portfolio (Boldonse), line spacing 1.4 with no tracking. Body text, card titles and labels stay in Geist.
- English titles are set smaller than before because the font is wide. Korean titles fall back to Noto Sans KR at weight 600, since Boldonse has no Korean.
- `?title=a` shows the previous Geist titles in that tab for comparison; `?title=b` switches back.

## 1.7.5 · 메인 타이포 대비 — 2026-11-16
- Home below the hero now uses the same five type steps as the case pages. Before, 1.6.7 had only reached the case pages and Lab.
- Case cards: title 24–38px/600, description 14px muted, tag 11px (was 8px on phones).
- Method section: title 30–50px/600, lead 18–21px, step questions 19–24px, step text 14px muted.
- Lab teaser: title and text on the same steps.

## 1.7.4 · 휠 원기둥 — 2026-11-16
- Home wheel: the cards now sit on a gently curved cylinder instead of a flat row with tilted ends. Each card turns and recedes a little the further it is from the middle.
- Same behaviour in English and Korean, light and dark, desktop and phone.

## 1.7.3 · 히어로 배경 번짐 — 2026-11-16
- Home: the colour behind the wheel is now a soft wash behind the whole hero, title included, at about half the strength, fading out with no visible edge.
- Wheel on phones: stronger curve. Side cards tilt, shrink and drop more.

## 1.7.2 · 휠 유리 카드 — 2026-11-16
- Home wheel now moves on phones too (it pauses while a finger is on it and resumes shortly after).
- Cards show the question only; the case name is removed. Glass look: translucent surface, light edge, soft colour behind.
- Removed "Questions I've asked. Pick the one you're curious about." The line under the wheel now reads "Questions I asked while working on these projects."
- Hero intro: "I'm Yubin…" is the lead (ink, larger); the proof paragraph is the body (smaller, muted). Before, the two were the same size and differed only in colour.

## 1.7.1 · 질문 휠 — 2026-11-16
- Home: the question cards now behave like a wheel. The row drifts slowly, loops, can be scrolled sideways or dragged, and the cards curve away and fade toward the edges. It stops while the pointer is on it.
- Phones and reduced motion keep the plain sideways scroll.

## 1.7.0 · CTR 두 겹 — 2026-11-16
- CTR case in two layers. Always visible: a short claim as the section title, a question under it, one lead paragraph and the key image. Behind six question buttons: checks, alternatives, trade-offs, limits.
- Seven section titles rewritten as short claims with a question sub-line (e.g. "A destination, not a reason." / "What was the banner actually telling shoppers?"). Old sentence titles are in 1.6.8.
- AS-IS wireframe: "AS-IS · One tap, two screens" sits above the panel, the two screens are numbered 1 and 2, and a link under it jumps to what replaced it.
- Folds open automatically in the edit view, when printing, and when a link points inside one.
- Title-font trial (`?title=b`): line spacing set to 1.4 with no tracking, as in the old portfolio.

## 1.6.8 · 질문 컨베이어 — 2026-11-16
- Home: the nine question chips become cards on a slow belt that passes by. No borders at rest; the card under the pointer gets a border and the belt pauses. Each card names its case and links to it.
- The one-at-a-time highlight is gone. On phones and with reduced motion the belt is a sideways scroll instead.

## 1.6.7 · 타이포 대비 — 2026-11-16
- Case pages and Lab: one type scale with wider gaps. Section title 50px/600, sub-title 24px, lead 21px, body 15px (muted, key phrases in ink), small 14px. CTR goes from 36 text styles to 27; five sub-title sizes become one.
- Title-font trial: add `?title=b` to any page to see page and section titles in a display font (Boldonse); `?title=a` turns it off. Not on by default.
- Home: on wide screens (over 1100px) the hero is centred: eyebrow, title, two questions, then the question chips.
- Home chips: four questions reworded (2% of users; without asking an engineer every time; what people really need from the AI's data; different users, different views).
- Home: removed the "Explore the work behind the questions." link under the intro; the chips and the cases directly below already do that job.
- About: "Working with me" → "When I'm working"; three lines rewritten and numbered; Code Your Future dated Oct 2025—Now.

## 1.6.6 · 어바웃 문장과 지구본 — 2026-11-16
- About: title "Curious by default."; "I'm Yubin…" heading replaced by "Working with me" with three lines.
- Language: one globe button that switches EN ↔ KR (EN default) replaces the KR / EN pair.
- Hidden door: on the Korean About page, dragging the footer name onto the logo opens the version list (desktop).
- Version list shows the six major versions first; all versions sit under a fold.

## 1.6.5 · 질문에서 시작하는 메인 — 2026-11-16
- Home: nine question chips (three per case) replace the three case lines. One lights up at a time; hovering one highlights its sibling questions and the case card; each links to its case.
- Home intro: "I do my best work before anyone has written the brief" → "I don't wait to be told what to fix. I look for what would help users, the team and the business, and bring it to the table."
- About: collage rebuilt as a scattered board with no panel, site colours, six new placeholder items (cooking, cycling, interiors, design objects, tinkering with AI, good food); captions appear on hover.
- `versions.html`: private, unlinked index of every version with a link to that version's own preview address. Branches `v/1.2.0`…`v/1.6.0` hold the released versions.

## 1.6.4 · 어바웃 콜라주 — 2026-11-16
- About: "Off the clock" board under the timeline. Six things Yubin likes, each with a one-line reason, on a paper-coloured panel with tilted cut-out illustrations (straighten on hover).
- Items and illustrations are placeholders to swap for Yubin's own picks and photos.

## 1.6.3 · 자신 있는 문장 — 2026-11-16
Defensive sentences removed from the visitor view, in English and Korean together (43 → 0; what remains are rhetorical "not X, but Y" lines and two honest captions).
- Each case keeps one place for limits: CTR 06 (before/after, not an A/B test), Catalina "What I'd test next", Lab "what remains to prove".
- "From the previous portfolio" labels removed; reconstruction captions shortened.
- CTR 01: "The earlier portfolio records…" → "In a quick internal check, four of five colleagues took the banner for an advert."
- Catalina: result and closing heading now say "PoC in one month"; "Delivered & unverified" → "Delivered"; "Not yet validated" → "What I'd test next".
- Admin: role is "Project lead · UX/UI designer"; "contributed to" → "As project lead, I … took it through a phased release".
- Case numbers removed everywhere. Each case carries a tag instead (5× click-through · Two iterations / 0→1 · Sole designer · PoC in one month / Project lead · B2B operations), so case order can change per company link.
- About: timeline adds Independent projects (Lab, 2025—Now) and Code Your Future.

## 1.6.2 · 히어로 소개 — 2026-11-16
- Two questions under the home title: "What’s really in the way? What did we miss?"
- Three abstract sentences replaced by three case lines that link to the cases (2% banner, AI model with no screen, sales data behind an engineer).
- Intro rewritten with specifics: only designer on an AI research team (blank screen to PoC in one month), led admin and B2B projects, pitched and built a design system unasked.

## 1.6.1 · 푸터 버전 표시 — 2026-11-15
- Footer on every page shows the site version (e.g. "v1.6.1") under the name. Visible on mobile too.
- One source: `SITE_VERSION` at the top of `public/portfolio.js`.

## 1.6.0 · CTR 와이어프레임 — 2026-11-10
Builds on 1.5.2. Visual evidence for the CTR starting point and both decisions (KR + EN, light/dark, mobile).
- 01: AS-IS wireframe. A banner in the middle of a purchase-intent product list, which leads to a separate news board.
- 02, decision 1: "a louder banner" (considered) vs "carousel preview" (chosen).
- 04, decision 2: a wireframe inside each trade-off card. Automatic classification leaves every update unlabelled ("?"); manual classification labels every update.
- 05: ITERATION 2 card and the screen below share a weak border, plus a "Shown below ↓" tag.
- Screen captions for ITERATION 1 and 2 now say "Reconstructed with a Starbucks example".
- Wireframes are lo-fi HTML/CSS and labelled explanatory. The dashed box marks the area that changes.

## 1.5.3 · 히어로 문장 — 2026-11-14
- Home title: "What we see is only part of the story." → **"When people get stuck, I get curious."** (KR: 사람들이 막히는 순간, 나는 궁금해져.)
- Page descriptions on all six pages use the same line.
- Title only; the hero interaction is not included.

## 1.5.2 · 박스 안 문장 정리 — 2026-11-10
Internal notes removed from the visitor view (KR + EN). Visible text on all six pages now has no to-do or source-check language. CTR sentences reviewed line by line with Yubin.
- CTR 03: ~20% kept as Yubin's recollection, defined as any carousel interaction including clicks. The new hypothesis: irrelevant updates were mixed in, and only some titles ('discount', 'coupon', 'event') signalled value.
- CTR 03: "15% drop-off" → Venn reading. The 5% who clicked sit inside the 20% who interacted (same denominator), so the other 15 points are people who could be brought further.
- CTR: the "CTR ≈ 5%" card and the 06 numbers/chart now say "average across 6 brands" (brands varied).
- CTR 04: six types from memory (discounts, coupons, new & seasonal, merch, membership, collaborations), provisional until the original table is found. Content constraint added: brand-posted, crawled content couldn't be edited, so the display changed instead.
- CTR 04 image caption: "Reconstructed with a Starbucks example · 4 of the 6 types shown".
- CTR 06: limitation reworded. Before/after was measured on the same carousel area (defined by Yubin) with the same metrics; it was not an A/B test, so timing and posted content may differ.
- CTR: removed the v1.3/PR note, the "source verification" card text, the duplicate 06 caveat and the outdated "15%/20% excluded" note.
- Catalina: score/mapping to-dos cut; the outcome and mood-count lines state only what was decided. The duplicate Lottie line above the animation is removed (the caption below already says it's a recreation).
- Admin: duplicate "not a production screen" line removed, and the screen caption now reads "Illustrative UI reconstruction · Charts and data are examples"; "Where the evidence still needs work" box moved out of the visitor view; release-list and priority to-dos cut; "not measured" lines removed from the visitor view (06 heading, summary, figure caption, result box, next-check note); the 06 heading now reads "The admin shipped, in stages."
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



