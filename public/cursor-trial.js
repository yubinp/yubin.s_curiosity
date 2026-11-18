/* Design trial (not for release): circle cursor candidates + whole-card folds.
   Cursor: ?cursor=a|b|c|d|e|f|g|h picks one, ?cursor=0 turns it off; the choice is kept for this tab.
   Folds: a folded card opens from anywhere on it; an open card closes from its question, from "Close" at the bottom,
   and, while ?foldclose=1 (default), from anywhere on the card. ?foldclose=0 compares without that.
   A small switcher sits bottom-left on desktop. Touch screens keep the normal cursor; reduced motion: no trailing. */
(() => {
 const root = document.documentElement;
 const fine = matchMedia('(hover:hover) and (pointer:fine)').matches;
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const KEY = 'cursor-trial', FKEY = 'foldclose-trial';
 const LOOKS = {
  a: { en: 'Snap ring', ko: '스냅 링' },
  b: { en: 'Invert lens', ko: '반전 렌즈' },
  c: { en: 'Glass bubble', ko: '유리 방울' },
  d: { en: 'Light', ko: '빛' },
  e: { en: 'Glass + light', ko: '유리 + 빛' },
  f: { en: 'Glass + room light', ko: '유리 + 주변 빛' },
  g: { en: 'Lens + light', ko: '렌즈 + 빛' },
  h: { en: 'Glass idle', ko: '평소엔 유리' }
 };
 let look = 'e', wholeClose = true;
 try {
  const qs = new URLSearchParams(location.search);
  if (qs.get('cursor')) sessionStorage.setItem(KEY, qs.get('cursor'));
  if (qs.get('foldclose')) sessionStorage.setItem(FKEY, qs.get('foldclose'));
  look = sessionStorage.getItem(KEY) || 'e';
  wholeClose = (sessionStorage.getItem(FKEY) || '1') !== '0';
 } catch (e) {}
 const lang = () => (root.lang === 'en' ? 'en' : 'ko');
 const L = (en, ko) => (lang() === 'en' ? en : ko);

 /* ---------- folds: whole card opens, open card closes ---------- */
 const folds = [...document.querySelectorAll('details.fold.is-enhanced:not(.is-plain)')];
 const isOpenFold = d => !!d && d.classList.contains('is-enhanced') && !d.classList.contains('is-plain') && !d.classList.contains('is-teaser');
 const isTeaser = d => !!d && d.classList.contains('is-teaser');
 const skip = t => t.closest('a,button:not(.fold-close),input,textarea,select,label,video,audio,[role=button]');
 folds.forEach(d => {
  const sum = d.querySelector('summary');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'fold-close';
  close.innerHTML = '<span class="en">Close</span><span class="ko">접기</span><span aria-hidden="true">↑</span>';
  close.addEventListener('click', e => { e.stopPropagation(); if (isOpenFold(d)) sum.click(); });
  d.appendChild(close);
  let downAt = null;
  d.addEventListener('pointerdown', e => { downAt = { x: e.clientX, y: e.clientY }; });
  d.addEventListener('click', e => {
   const t = e.target;
   if (t.closest('summary') || skip(t)) return; // the question and buttons already do their own thing
   const moved = downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6;
   const selecting = String(getSelection()).length > 0;
   if (moved || selecting) return; // a drag or a text selection is not a click on the card
   if (isTeaser(d)) { d._expand && d._expand(); return; }
   if (wholeClose && isOpenFold(d)) sum.click();
  });
 });

 const css = `
 /* folds trial */
 .fold.is-teaser{cursor:pointer}
 html.fold-whole .fold.is-enhanced:not(.is-plain):not(.is-teaser)>.fold-body{cursor:pointer}
 .fold-close{display:none;align-items:center;gap:8px;margin:6px auto 22px;padding:9px 18px;border-radius:999px;border:1px solid color-mix(in srgb,var(--ink) 22%,transparent);background:none;font:inherit;font-size:14px;font-weight:500;color:var(--ink);cursor:pointer}
 .fold-close:hover,.fold-close:focus-visible{border-color:var(--ink)}
 .fold.is-enhanced:not(.is-plain):not(.is-teaser)>.fold-close{display:flex}
 html:not([lang=ko]) .fold-close .ko,html[lang=ko] .fold-close .en{display:none}

 /* cursor */
 html.cur-on,html.cur-on *{cursor:none!important}
 html.cur-on :is(input,textarea,[contenteditable=true]){cursor:text!important}
 /* the wrapper is display:contents so each layer blends with the page itself (a fixed wrapper would isolate mix-blend-mode) */
 .cur{display:contents}
 .cur[hidden]{display:none}
 .cur>*{position:fixed;left:0;top:0;pointer-events:none;z-index:2147483000;border-radius:50%;opacity:0;transition:opacity .2s;will-change:transform,width,height}
 html.cur-in .cur>*{opacity:1}
 .cur-label{position:fixed;left:0;top:0;font:600 11px/1 var(--font);letter-spacing:.02em;white-space:nowrap;color:var(--ink);transform:translate(-50%,-50%);z-index:2147483001}
 html.cur-in .cur:not(.has-label) .cur-label{opacity:0}

 /* A · snap ring */
 .cur-a .cur-dot{width:6px;height:6px;margin:-3px 0 0 -3px;background:var(--ink)}
 .cur-a .cur-ring{width:34px;height:34px;border:1px solid color-mix(in srgb,var(--ink) 55%,transparent);transition:border-radius .2s,background .2s,border-color .2s}
 .cur-a.is-hover .cur-ring{background:color-mix(in srgb,var(--ink) 7%,transparent);border-color:color-mix(in srgb,var(--ink) 35%,transparent)}
 html.cur-in .cur-a.is-hover .cur-dot{opacity:0}
 .cur-a.is-down .cur-ring{background:color-mix(in srgb,var(--ink) 14%,transparent)}

 /* B · invert lens (and G's lens) */
 .cur-b .cur-ring,.cur-g .cur-ring{background:#fff;mix-blend-mode:difference;transition:border-radius .18s}

 /* C · glass bubble (and the glass of E and F) */
 .cur-c .cur-dot{width:4px;height:4px;margin:-2px 0 0 -2px;background:var(--ink)}
 .cur-c .cur-ring,.cur-e .cur-ring,.cur-f .cur-ring{background:var(--glass,rgba(255,255,255,.4));border:1px solid var(--glass-edge,rgba(255,255,255,.6));-webkit-backdrop-filter:blur(6px) saturate(1.8);backdrop-filter:blur(6px) saturate(1.8);box-shadow:0 8px 24px -10px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.5)}
 html.cur-in .cur-c.has-label .cur-dot{opacity:0}

 /* D · light */
 .cur-glow{width:420px;height:420px;margin:-210px 0 0 -210px;background:radial-gradient(circle,color-mix(in srgb,var(--g1) 34%,transparent) 0,color-mix(in srgb,var(--g2) 14%,transparent) 38%,transparent 70%);mix-blend-mode:soft-light}
 html.dark .cur-glow{mix-blend-mode:screen;background:radial-gradient(circle,color-mix(in srgb,var(--g1) 22%,transparent) 0,color-mix(in srgb,var(--g2) 9%,transparent) 40%,transparent 70%)}
 .cur-d .cur-dot{width:8px;height:8px;margin:-4px 0 0 -4px;background:var(--ink);transition:width .2s,height .2s,margin .2s,background .2s,box-shadow .2s}
 .cur-d.is-hover .cur-dot{width:16px;height:16px;margin:-8px 0 0 -8px;background:var(--g1);box-shadow:0 0 0 6px color-mix(in srgb,var(--g1) 25%,transparent)}

 /* E · glass + light: C's glass with no centre dot, the page's colour lit inside the glass; B's moves (grows on links, a bar over text).
    F · the same, plus D's wide soft light in the page's colour around it. */
 .cur-e .cur-ring,.cur-f .cur-ring{background:radial-gradient(circle at 50% 45%,color-mix(in srgb,var(--g1) 30%,transparent) 0,color-mix(in srgb,var(--g2) 10%,transparent) 55%,transparent 75%),var(--glass,rgba(255,255,255,.4));box-shadow:0 8px 24px -10px rgba(0,0,0,.35),0 0 22px -6px color-mix(in srgb,var(--g1) 55%,transparent),inset 0 1px 0 rgba(255,255,255,.5);transition:background .2s,border-color .2s,box-shadow .2s,border-radius .15s}
 .cur-e.is-text .cur-ring,.cur-f.is-text .cur-ring{background:color-mix(in srgb,var(--ink) 78%,transparent);border-color:transparent;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none;border-radius:2px}
 html.cur-in .cur-f .cur-glow{opacity:.75}

 /* which layers each look uses */
 .cur:not(.cur-a):not(.cur-c):not(.cur-d) .cur-dot{display:none}
 /* G · B's lens with D's light trailing slowly behind it */
 /* the light sits over the lens, so the lens is lit in the page's colour instead of inverting the light into its opposite colour */
 .cur-g .cur-glow,.cur-h .cur-glow{z-index:2147483001}
 /* H · G, but at rest a small glass circle. Over links and text it turns into G's lens; OPEN / CLOSE is cut into the lens. */
 .cur-h .cur-ring{background:var(--glass,rgba(255,255,255,.35));border:1px solid var(--glass-edge,rgba(255,255,255,.6));-webkit-backdrop-filter:blur(6px) saturate(1.8);backdrop-filter:blur(6px) saturate(1.8);box-shadow:0 6px 18px -8px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.5)}
 /* is-solid is set by the script: at once for the lens, but over text only once the glass has shrunk into a bar, so it never flashes as a white square */
 .cur-h.is-solid .cur-ring{background:#fff;mix-blend-mode:difference;border-color:transparent;box-shadow:none;-webkit-backdrop-filter:none;backdrop-filter:none}
 .cur-h .cur-label{color:#fff;mix-blend-mode:difference;font:700 10px/1 var(--font);letter-spacing:.14em;z-index:2147483002}
 .cur:not(.cur-d):not(.cur-f):not(.cur-g):not(.cur-h) .cur-glow{display:none}
 .cur-d .cur-ring{display:none}
 .cur:not(.cur-c):not(.cur-e):not(.cur-f):not(.cur-h) .cur-label{display:none}

 .cur-switch{position:fixed;left:16px;bottom:16px;z-index:2147483001;display:flex;flex-wrap:wrap;align-items:center;gap:4px;max-width:calc(100vw - 32px);padding:6px;border-radius:22px;background:var(--glass-solid,#fff);border:1px solid var(--glass-edge,#ddd);box-shadow:0 10px 30px -12px rgba(0,0,0,.35);font:500 12px/1 var(--font);color:var(--ink)}
 .cur-switch span{padding:0 6px 0 8px;color:var(--muted)}
 .cur-switch i{width:1px;height:20px;background:var(--line);margin:0 6px}
 .cur-switch button{font:inherit;color:inherit;background:none;border:0;border-radius:999px;padding:8px 10px}
 .cur-switch button[aria-pressed=true]{background:var(--ink);color:var(--bg)}
 .cur-switch button:focus-visible{outline:2px solid var(--g1);outline-offset:1px}
 @media(max-width:760px){.cur-switch{display:none}}
 `;
 const style = document.createElement('style');
 style.textContent = css;
 document.head.append(style);
 root.classList.toggle('fold-whole', wholeClose);

 /* ---------- switcher ---------- */
 const sw = document.createElement('div');
 sw.className = 'cur-switch';
 sw.setAttribute('role', 'group');
 sw.setAttribute('aria-label', 'Design trial');
 const drawSwitch = () => {
  const l = lang();
  sw.innerHTML = `<span>${L('Cursor', '커서')}</span>`
   + Object.keys(LOOKS).map(k => `<button type="button" data-look="${k}" aria-pressed="${look === k}" title="${LOOKS[k][l]}">${k.toUpperCase()}${'efgh'.includes(k) ? ' · ' + LOOKS[k][l] : ''}</button>`).join('')
   + `<button type="button" data-look="0" aria-pressed="${!LOOKS[look]}">${L('Off', '끄기')}</button>`
   + (folds.length ? `<i></i><span>${L('Close an open card from anywhere', '펼친 카드 아무 데나 눌러 접기')}</span>`
     + `<button type="button" data-fold="1" aria-pressed="${wholeClose}">${L('On', '켬')}</button>`
     + `<button type="button" data-fold="0" aria-pressed="${!wholeClose}">${L('Off', '끔')}</button>` : '');
 };
 sw.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  if (b.dataset.fold) {
   wholeClose = b.dataset.fold === '1';
   root.classList.toggle('fold-whole', wholeClose);
   try { sessionStorage.setItem(FKEY, b.dataset.fold); } catch (err) {}
   drawSwitch();
   return;
  }
  look = b.dataset.look;
  try { sessionStorage.setItem(KEY, look); } catch (err) {}
  apply();
 });
 if (fine) document.body.append(sw);
 new MutationObserver(drawSwitch).observe(root, { attributes: true, attributeFilter: ['lang'] });
 drawSwitch();
 if (!fine) return; // touch screens: folds trial only

 /* ---------- cursor ---------- */
 const cur = document.createElement('div');
 cur.className = 'cur';
 cur.setAttribute('aria-hidden', 'true');
 cur.innerHTML = '<i class="cur-glow"></i><i class="cur-ring"></i><i class="cur-dot"></i><b class="cur-label"></b>';
 document.body.append(cur);
 const ring = cur.querySelector('.cur-ring'), dot = cur.querySelector('.cur-dot'), glow = cur.querySelector('.cur-glow'), label = cur.querySelector('.cur-label');

 const INTERACTIVE = 'a[href],button,summary,[role=button],label,select,.q-card,.q-track';
 const TEXT = 'p,li,h1,h2,h3,h4,dd,dt,blockquote,figcaption,td,th';
 const caseLink = /(^|\/)(ctr|krust|system)(\.html)?([?#]|$)/;

 // what the pointer is over: { el, label, soft } or null
 function hitFor(el) {
  if (!el || el.closest('.cur-switch')) return null;
  const fold = el.closest('details.fold');
  if (fold && isTeaser(fold) && !skip(el)) return { el: fold, label: L('Read', '읽기') };
  if (fold && isOpenFold(fold)) {
   const c = el.closest('summary,.fold-close');
   if (c) return { el: c, label: L('Close', '접기') };
   if (wholeClose && !skip(el) && el.closest('.fold-body')) return { el: fold, label: L('Close', '접기'), soft: true };
  }
  const h = el.closest(INTERACTIVE);
  if (!h) return null;
  let t = '';
  if (h.matches('.q-track')) t = L('Drag', '끌기');
  else if (h.matches('a[target=_blank]')) t = L('Open ↗', '열기 ↗');
  else if (h.matches('.fold-more')) t = L('Read', '읽기');
  else if (h.matches('a') && caseLink.test(h.getAttribute('href') || '') && !h.closest('nav,header,footer')) t = L('View case', '케이스 보기');
  return { el: h, label: t };
 }

 const P = { x: -100, y: -100 };
 const R = { x: -100, y: -100, w: 28, h: 28, r: 999 };
 const G = { x: -100, y: -100 }; // the light trails on its own, slower than the cursor
 let hit = null, overText = false, down = false, raf = 0, lastEl = null, last = 0;
 const base = () => ({ a: [34, 34], b: [18, 18], c: [30, 30], e: [28, 28], f: [28, 28], g: [18, 18], h: [26, 26] }[look] || [0, 0]);

 function goal() {
  const [bw, bh] = base();
  if (hit) {
   if (look === 'a') {
    const b = hit.el.getBoundingClientRect();
    if (b.width < 260 && b.height < 90) {
     const pad = 8, r = parseFloat(getComputedStyle(hit.el).borderTopLeftRadius) || 0;
     return { x: b.left + b.width / 2, y: b.top + b.height / 2, w: b.width + pad * 2, h: b.height + pad * 2, r: Math.max(r + pad, 10) };
    }
    return { x: P.x, y: P.y, w: 64, h: 64, r: 999 };
   }
   if (look === 'b' || look === 'g' || look === 'h') return { x: P.x, y: P.y, w: 58, h: 58, r: 999 };
   if (look === 'c') return hit.label ? { x: P.x, y: P.y, w: Math.max(76, hit.label.length * 7.5 + 30), h: 76, r: 999 } : { x: P.x, y: P.y, w: 52, h: 52, r: 999 };
   if (look === 'e' || look === 'f') {
    if (hit.soft) return { x: P.x, y: P.y, w: 48, h: 48, r: 999 }; // anywhere on an open card: a quieter "Close"
    return { x: P.x, y: P.y, w: hit.label ? Math.max(58, hit.label.length * 7.5 + 30) : 58, h: 58, r: 999 };
   }
  }
  if (overText && 'befgh'.includes(look)) return { x: P.x, y: P.y, w: 3, h: 26, r: 2 };
  return { x: P.x, y: P.y, w: bw, h: bh, r: 999 };
 }

 function frame(now) {
  raf = 0;
  // easing is per 60fps frame, scaled by real elapsed time so a slow screen catches up at the same speed
  const dt = Math.min(64, last ? now - last : 16.7) / 16.7;
  last = now;
  const g = goal();
  const ease = k => (reduced ? 1 : 1 - Math.pow(1 - k, dt));
  const k = ease({ b: 0.35, d: 0.12, e: 0.16, f: 0.16, g: 0.35, h: 0.3 }[look] || 0.2);
  const kg = ease(0.1);
  G.x += (P.x - G.x) * kg; G.y += (P.y - G.y) * kg;
  const ks = ease(0.22);
  R.x += (g.x - R.x) * k; R.y += (g.y - R.y) * k;
  R.w += (g.w - R.w) * ks; R.h += (g.h - R.h) * ks;
  R.r = g.r;
  const press = down ? 0.88 : 1;
  ring.style.width = R.w + 'px';
  ring.style.height = R.h + 'px';
  // corners follow the size (a circle shrinks into a pill, then a bar), so a size change never shows a square; only A wraps elements with their own corners
  ring.style.borderRadius = (look === 'a' ? (R.r >= 999 ? Math.min(R.w, R.h) / 2 : R.r) : Math.min(R.w, R.h) / 2) + 'px';
  if (look === 'h') cur.classList.toggle('is-solid', !!hit || (overText && R.w < 8));
  ring.style.transform = `translate3d(${R.x - R.w / 2}px,${R.y - R.h / 2}px,0) scale(${press})`;
  dot.style.transform = `translate3d(${P.x}px,${P.y}px,0)`;
  glow.style.transform = `translate3d(${G.x}px,${G.y}px,0)`;
  label.style.left = R.x + 'px';
  label.style.top = R.y + 'px';
  if (Math.abs(g.x - R.x) + Math.abs(g.y - R.y) + Math.abs(g.w - R.w) + Math.abs(g.h - R.h) + Math.abs(P.x - G.x) + Math.abs(P.y - G.y) > 0.3) raf = requestAnimationFrame(frame);
  else last = 0;
 }
 const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

 // H: short English caps, only where a click opens or closes something
 function capLabel(h) {
  const el = h.el;
  if (el.matches('summary,.fold-close') || (el.matches('details.fold') && isOpenFold(el))) return 'CLOSE';
  if (el.matches('.q-track')) return 'DRAG';
  if (el.matches('a[href],.fold-more,.q-card') || el.matches('details.fold')) return 'OPEN';
  return '';
 }
 function refresh(el) {
  hit = hitFor(el);
  const t = !hit ? '' : look === 'h' ? capLabel(hit) : 'cef'.includes(look) ? hit.label : '';
  label.textContent = t;
  cur.classList.toggle('has-label', !!t);
  cur.classList.toggle('is-hover', !!hit);
  overText = !hit && !!(el && el.closest(TEXT));
  cur.classList.toggle('is-text', overText);
  kick();
 }
 addEventListener('pointermove', e => {
  P.x = e.clientX; P.y = e.clientY;
  root.classList.add('cur-in');
  lastEl = e.target instanceof Element ? e.target : null;
  refresh(lastEl);
 }, { passive: true });
 // after a card opens or closes, what is under the pointer changes, so read it again
 addEventListener('click', () => setTimeout(() => { lastEl = document.elementFromPoint(P.x, P.y); refresh(lastEl); }, 0));
 addEventListener('pointerdown', () => { down = true; cur.classList.add('is-down'); kick(); });
 addEventListener('pointerup', () => { down = false; cur.classList.remove('is-down'); kick(); });
 document.addEventListener('mouseout', e => { if (!e.relatedTarget) root.classList.remove('cur-in'); });
 addEventListener('blur', () => root.classList.remove('cur-in'));
 addEventListener('scroll', () => { if (hit) kick(); }, { passive: true });

 function apply() {
  const on = !!LOOKS[look];
  root.classList.toggle('cur-on', on);
  cur.className = 'cur' + (on ? ' cur-' + look : '');
  cur.hidden = !on;
  const [w, h] = base(); R.w = w; R.h = h;
  drawSwitch();
  refresh(lastEl);
 }
 apply();
})();
