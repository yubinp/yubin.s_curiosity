# Yubin Park — Product Design

Current version: **1.5.2 · 박스 안 문장 정리** (2026-11-09). Previous: 1.5.1 · 빨간 박스 편집 화면 전용. History in [CHANGELOG.md](CHANGELOG.md).

Visitors see a clean site. Red TODO boxes, version outlines, source requests and orange decision points appear only in the edit view: add `?versions=1` to any page URL. The "Hide edit marks" button switches that tab back to what visitors see.

Reviewed public limitations and honest captions (e.g. "Not an original production screen") carry `data-public-note`, so the TODO detector skips them. Put internal to-dos in an editor-only `aside.v15-editor-gap`, never in visitor copy.

## Versioning
MAJOR.MINOR.PATCH — bump one number per change merged to `main`.
Name each version `X.Y.Z · <what changed>` and use the same name in the PR title and CHANGELOG, so it can be searched later.
- **MAJOR** (1.x → 2.0.0) — big shift: new concept or mood, site structure, or case lineup. 크게 바뀔 때만.
- **MINOR** (1.2.0 → 1.3.0) — visible content change: new copy direction, new section, case rewrite. 내용이 눈에 띄게 바뀔 때.
- **PATCH** (1.2.0 → 1.2.1) — small fix: typo, link, image swap, spacing. 작은 수정.

Before 1.0.0, numbers (up to "version 19") were ChatGPT Sites save counts, not releases.

## Edit
All current page content and styles are in `public/`.
- Home: index.html
- CTR: ctr.html
- Catalina: krust.html
- Admin: system.html
- Lab: research.html
- About: info.html
- Styles: portfolio.css
- Interactions and language: portfolio.js

Edit the HTML/CSS/JS directly in VS Code, Claude Code, or another editor. English copy is in data-en attributes; Korean copy is in the HTML. Keep both in sync.

## Preview
Run `python3 -m http.server 8000 --directory public` and open http://localhost:8000. For local previews, use .html paths.

## Vercel deployment
Import the GitHub repository into Vercel. Select Framework Preset: Other, no build command, Output Directory: public. The supplied vercel.json enables clean URLs such as /ctr and /krust. Deploy from main.

## Important
This is the current working portfolio, including review borders and TODO notes. It has not been editorially finalised. Preserve existing content and ask Yubin before deleting it. The older Python generators are intentionally not used here because regenerating pages would overwrite recent edits. This portable copy does not automatically sync back to ChatGPT Sites.

## v1.4 editorial review
Open a preview URL with `?versions=1` to highlight v1.2 / v1.3 / v1.4 ★ material. Purple v1.4 ★ annotations are only visible in version review mode and identify evidence to verify; normal portfolio visitors do not see them. The version toggle persists in the current browser tab. See [v1.4 Evidence Checklist](docs/V1.4_EVIDENCE_CHECKLIST.md) and the [full six-page image placement audit](docs/V1.4_IMAGE_AUDIT.md) for the four-point decision narrative rubric and the Figma card-transition specification. The original Figma frames and provenance-safe Framer persona have not been delivered to this branch; do not represent conceptual comparisons as contemporaneous work.

## v1.5 editorial review (merged 2026-11-09)
The approved Home Hero now begins **“What we see is only part of the story.”** The duplicated CTR/pasta reframe is removed; the Hero links to Selected Work. Seven repeated author-facing design-rationale notes were cut from Admin and Catalina. See [v1.5 six-page argument audit](docs/V1.5_ARGUMENT_AUDIT.md) for what still needs evidence and what should be removed or consolidated in subsequent passes. `?versions=1` reveals v1.5 and prior editorial annotations.

### Additional v1.5 working changes
The Home now joins the three cases with an explicit **observation → question → decision** rationale (a retrospective synthesis, not a named historical framework). CTR, Catalina, Admin and Lab each include a concise **why this method → how used → effect/limitations → transferable principle** explanation, with eight explicit source gaps visible **only** under `?versions=1`. The version-review selection persists across internal navigation, including new tabs. Case-specific evidence remains unverified where documented. Merged to `main` as PR #5 on 2026-11-09.
