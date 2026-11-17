/* Design trial (not for release): circle cursor candidates.
   ?cursor=a|b|c|d picks one, ?cursor=0 turns it off; the choice is kept for this tab.
   A small switcher sits bottom-left so the four can be compared on any page.
   Mouse and trackpad only: touch screens and keyboard use are unchanged. Reduced motion: no trailing, no easing. */
(() => {
 if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
 const root = document.documentElement;
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
 const KEY = 'cursor-trial';
 const LOOKS = {
  a: { en: 'Snap ring', ko: '스냅 링' },
  b: { en: 'Invert lens', ko: '반전 렌즈' },
  c: { en: 'Glass bubble', ko: '유리 방울' },
  d: { en: 'Light', ko: '빛' }
 };
 let look = 'a';
 try {
  const q = new URLSearchParams(location.search).get('cursor');
  if (q) sessionStorage.setItem(KEY, q);
  look = sessionStorage.getItem(KEY) || 'a';
 } catch (e) {}

 const css = `
 html.cur-on,html.cur-on *{cursor:none!important}
 html.cur-on :is(input,textarea,[contenteditable=true]){cursor:text!important}
 /* the wrapper is display:contents so each layer blends with the page itself (a fixed wrapper would isolate mix-blend-mode) */
 .cur{display:contents}
 .cur[hidden]{display:none}
 .cur>*{position:fixed;left:0;top:0;pointer-events:none;z-index:2147483000;border-radius:50%;opacity:0;transition:opacity .2s;will-change:transform,width,height}
 html.cur-in .cur>*{opacity:1}
 .cur-label{position:fixed;left:0;top:0;font:600 11px/1 var(--font);letter-spacing:.02em;white-space:nowrap;color:var(--ink);transform:translate(-50%,-50%);z-index:2147483001}
 html.cur-in .cur:not(.has-label) .cur-label{opacity:0}

 /* A · snap ring: a dot that follows exactly, and a ring that trails it. On links and buttons the ring wraps the element. */
 .cur-a .cur-dot{width:6px;height:6px;margin:-3px 0 0 -3px;background:var(--ink)}
 .cur-a .cur-ring{width:34px;height:34px;border:1px solid color-mix(in srgb,var(--ink) 55%,transparent);transition:border-radius .2s,background .2s,border-color .2s}
 .cur-a.is-hover .cur-ring{background:color-mix(in srgb,var(--ink) 7%,transparent);border-color:color-mix(in srgb,var(--ink) 35%,transparent)}
 .cur-a.is-hover .cur-dot{opacity:0}
 .cur-a.is-down .cur-ring{background:color-mix(in srgb,var(--ink) 14%,transparent)}
 .cur-a .cur-label{display:none}

 /* B · invert lens: one white circle that inverts what is under it. Grows on links, becomes a text bar over text. */
 .cur-b .cur-dot{display:none}
 .cur-b .cur-ring{width:18px;height:18px;background:#fff;mix-blend-mode:difference;transition:border-radius .18s}
 .cur-b.is-text .cur-ring{border-radius:2px}
 .cur-b .cur-label{display:none}

 /* C · glass bubble: a small frosted circle. On links it grows and says what the click does. */
 .cur-c .cur-dot{width:4px;height:4px;margin:-2px 0 0 -2px;background:var(--ink);transition:opacity .15s}
 .cur-c .cur-ring{width:30px;height:30px;background:color-mix(in srgb,var(--glass,rgba(255,255,255,.4)) 100%,transparent);border:1px solid var(--glass-edge,rgba(255,255,255,.6));-webkit-backdrop-filter:blur(6px) saturate(1.8);backdrop-filter:blur(6px) saturate(1.8);box-shadow:0 8px 24px -10px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.5)}
 .cur-c.has-label .cur-dot{opacity:0}

 /* D · light: a soft light in the page's own colour follows the pointer and lights the glass; a small dot marks the point. */
 .cur-d .cur-glow{width:420px;height:420px;margin:-210px 0 0 -210px;background:radial-gradient(circle,color-mix(in srgb,var(--g1) 34%,transparent) 0,color-mix(in srgb,var(--g2) 14%,transparent) 38%,transparent 70%);mix-blend-mode:soft-light;transition:opacity .3s}
 html.dark .cur-d .cur-glow{mix-blend-mode:screen;background:radial-gradient(circle,color-mix(in srgb,var(--g1) 22%,transparent) 0,color-mix(in srgb,var(--g2) 9%,transparent) 40%,transparent 70%)}
 .cur-d .cur-dot{width:8px;height:8px;margin:-4px 0 0 -4px;background:var(--ink);transition:width .2s,height .2s,margin .2s,background .2s,box-shadow .2s}
 .cur-d.is-hover .cur-dot{width:16px;height:16px;margin:-8px 0 0 -8px;background:var(--g1);box-shadow:0 0 0 6px color-mix(in srgb,var(--g1) 25%,transparent)}
 .cur-d .cur-ring,.cur-d .cur-label{display:none}
 .cur:not(.cur-d) .cur-glow{display:none}

 .cur-switch{position:fixed;left:16px;bottom:16px;z-index:2147483001;display:flex;align-items:center;gap:4px;padding:6px;border-radius:999px;background:var(--glass-solid,#fff);border:1px solid var(--glass-edge,#ddd);box-shadow:0 10px 30px -12px rgba(0,0,0,.35);font:500 12px/1 var(--font);color:var(--ink)}
 .cur-switch span{padding:0 8px 0 6px;color:var(--muted)}
 .cur-switch button{font:inherit;color:inherit;background:none;border:0;border-radius:999px;padding:8px 11px}
 .cur-switch button[aria-pressed=true]{background:var(--ink);color:var(--bg)}
 .cur-switch button:focus-visible{outline:2px solid var(--g1);outline-offset:1px}
 @media(max-width:760px){.cur-switch{display:none}}
 `;
 const style = document.createElement('style');
 style.textContent = css;
 document.head.append(style);

 // switcher
 const lang = () => (root.lang === 'en' ? 'en' : 'ko');
 const sw = document.createElement('div');
 sw.className = 'cur-switch';
 sw.setAttribute('role', 'group');
 sw.setAttribute('aria-label', 'Cursor trial');
 const drawSwitch = () => {
  const l = lang();
  sw.innerHTML = `<span>${l === 'en' ? 'Cursor trial' : '커서 시안'}</span>`
   + Object.keys(LOOKS).map(k => `<button type="button" data-look="${k}" aria-pressed="${look === k}" title="${LOOKS[k][l]}">${k.toUpperCase()} · ${LOOKS[k][l]}</button>`).join('')
   + `<button type="button" data-look="0" aria-pressed="${!LOOKS[look]}">${l === 'en' ? 'Off' : '끄기'}</button>`;
 };
 sw.addEventListener('click', e => {
  const b = e.target.closest('button');
  if (!b) return;
  look = b.dataset.look;
  try { sessionStorage.setItem(KEY, look); } catch (err) {}
  apply();
 });
 document.body.append(sw);
 new MutationObserver(drawSwitch).observe(root, { attributes: true, attributeFilter: ['lang'] });

 // cursor
 const cur = document.createElement('div');
 cur.className = 'cur';
 cur.setAttribute('aria-hidden', 'true');
 cur.innerHTML = '<i class="cur-glow"></i><i class="cur-ring"></i><i class="cur-dot"></i><b class="cur-label"></b>';
 document.body.append(cur);
 const ring = cur.querySelector('.cur-ring'), dot = cur.querySelector('.cur-dot'), glow = cur.querySelector('.cur-glow'), label = cur.querySelector('.cur-label');

 const INTERACTIVE = 'a[href],button,summary,[role=button],label,select,.q-card,.q-track';
 const TEXT = 'p,li,h1,h2,h3,h4,dd,dt,blockquote,figcaption,td,th';
 const caseLink = /(^|\/)(ctr|krust|system)(\.html)?([?#]|$)/;
 const labelFor = el => {
  if (!el) return '';
  const en = lang() === 'en';
  if (el.matches('.q-track')) return en ? 'Drag' : '끌기';
  if (el.matches('a[target=_blank]')) return en ? 'Open ↗' : '열기 ↗';
  if (el.matches('summary,.fold-more,[class*=continue],[class*=read-more]')) return en ? 'Read' : '읽기';
  const href = el.getAttribute('href') || '';
  if (el.matches('a') && caseLink.test(href) && !el.closest('nav,header,footer')) return en ? 'View case' : '케이스 보기';
  return '';
 };

 const P = { x: -100, y: -100 }; // pointer
 const R = { x: -100, y: -100, w: 34, h: 34, r: 999 }; // ring (eased)
 let target = null, overText = false, down = false, raf = 0;

 const sizes = () => ({
  a: { w: 34, h: 34 },
  b: { w: 18, h: 18 },
  c: { w: 30, h: 30 }
 }[look] || { w: 0, h: 0 });

 function goal() {
  const base = sizes();
  if (look === 'a' && target) {
   const b = target.getBoundingClientRect();
   const small = b.width < 260 && b.height < 90;
   if (small) { // wrap the link or button
    const pad = 8, cs = getComputedStyle(target);
    const r = parseFloat(cs.borderTopLeftRadius) || 0;
    return { x: b.left + b.width / 2, y: b.top + b.height / 2, w: b.width + pad * 2, h: b.height + pad * 2, r: Math.max(r + pad, 10) };
   }
   return { x: P.x, y: P.y, w: 64, h: 64, r: 999 };
  }
  if (look === 'b') {
   if (target) return { x: P.x, y: P.y, w: 58, h: 58, r: 999 };
   if (overText) return { x: P.x, y: P.y, w: 3, h: 26, r: 2 };
  }
  if (look === 'c' && target) {
   const t = labelFor(target);
   return t ? { x: P.x, y: P.y, w: Math.max(76, t.length * 7.5 + 30), h: 76, r: 999 } : { x: P.x, y: P.y, w: 52, h: 52, r: 999 };
  }
  return { x: P.x, y: P.y, w: base.w, h: base.h, r: 999 };
 }

 function frame() {
  raf = 0;
  const g = goal();
  const k = reduced ? 1 : (look === 'b' ? 0.35 : look === 'd' ? 0.12 : 0.2);
  const ks = reduced ? 1 : 0.22;
  R.x += (g.x - R.x) * k; R.y += (g.y - R.y) * k;
  R.w += (g.w - R.w) * ks; R.h += (g.h - R.h) * ks;
  R.r = g.r;
  const press = down ? 0.88 : 1;
  ring.style.width = R.w + 'px';
  ring.style.height = R.h + 'px';
  ring.style.borderRadius = R.r >= 999 ? '50%' : R.r + 'px';
  ring.style.transform = `translate3d(${R.x - R.w / 2}px,${R.y - R.h / 2}px,0) scale(${press})`;
  dot.style.transform = `translate3d(${P.x}px,${P.y}px,0)`;
  glow.style.transform = `translate3d(${R.x}px,${R.y}px,0)`;
  label.style.left = R.x + 'px';
  label.style.top = R.y + 'px';
  const moving = Math.abs(g.x - R.x) + Math.abs(g.y - R.y) + Math.abs(g.w - R.w) + Math.abs(g.h - R.h) > 0.3;
  if (moving) raf = requestAnimationFrame(frame);
 }
 const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

 function onMove(e) {
  P.x = e.clientX; P.y = e.clientY;
  root.classList.add('cur-in');
  const el = e.target instanceof Element ? e.target : null;
  const hit = el && !el.closest('.cur-switch') ? el.closest(INTERACTIVE) : null;
  if (hit !== target) {
   target = hit;
   const t = look === 'c' ? labelFor(target) : '';
   label.textContent = t;
   cur.classList.toggle('has-label', !!t);
   cur.classList.toggle('is-hover', !!target);
  }
  overText = !target && !!(el && el.closest(TEXT));
  cur.classList.toggle('is-text', overText);
  kick();
 }

 function apply() {
  const on = !!LOOKS[look];
  root.classList.toggle('cur-on', on);
  cur.className = 'cur' + (on ? ' cur-' + look : '');
  cur.hidden = !on;
  target = null; label.textContent = '';
  if (on) { const s = sizes(); R.w = s.w; R.h = s.h; }
  drawSwitch();
  kick();
 }

 addEventListener('pointermove', onMove, { passive: true });
 addEventListener('pointerdown', () => { down = true; cur.classList.add('is-down'); kick(); });
 addEventListener('pointerup', () => { down = false; cur.classList.remove('is-down'); kick(); });
 document.addEventListener('mouseout', e => { if (!e.relatedTarget) root.classList.remove('cur-in'); });
 addEventListener('blur', () => root.classList.remove('cur-in'));
 addEventListener('scroll', () => { if (target) kick(); }, { passive: true });
 apply();
})();
