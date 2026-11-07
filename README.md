# Yubin Park — Product Design

Current version: **1.2.0 · 논리 수정 1: 척추 문장** (2026-11-06). History in [CHANGELOG.md](CHANGELOG.md).

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
