# Yubin Park — Product Design

Portable export of the live portfolio, version 19 (2026-11-05).

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
