/* 2.0.7 · Glass cursor. Mouse and trackpad only; touch screens and keyboard use are unchanged.
   At rest: a small glass circle. Over links and buttons: a white lens that inverts what is under it, with OPEN, CLOSE or DRAG
   cut into it where a click opens or closes something. Over text: a thin bar. A soft light in the page's colour trails behind.
   Corners always follow the size (circle → pill → bar), and the glass turns white only once it is thin, so a change never flashes square.
   Reduced motion: the cursor moves with the pointer and the light is off. Styles: portfolio.css "2.0.7 · glass cursor". */
(() => {
 if (!matchMedia('(hover:hover) and (pointer:fine)').matches) return;
 const root = document.documentElement;
 const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

 const cur = document.createElement('div');
 cur.className = 'cur';
 cur.setAttribute('aria-hidden', 'true');
 cur.innerHTML = '<i class="cur-glow"></i><i class="cur-ring"></i><b class="cur-label"></b>';
 document.body.append(cur);
 root.classList.add('cur-on');
 const ring = cur.querySelector('.cur-ring'), glow = cur.querySelector('.cur-glow'), label = cur.querySelector('.cur-label');

 const INTERACTIVE = 'a[href],button,summary,[role=button],label,select,.q-card,.q-track';
 const TEXT = 'p,li,h1,h2,h3,h4,dd,dt,blockquote,figcaption,td,th';
 const skip = t => t.closest('a,button:not(.fold-close),input,textarea,select,label,video,audio,[role=button]');
 const isTeaser = d => d.classList.contains('is-teaser');
 const isOpen = d => d.classList.contains('is-enhanced') && !d.classList.contains('is-plain') && !isTeaser(d);

 // what the pointer is over: { el, label, soft } or null
 function hitFor(el) {
  if (!el) return null;
  const fold = el.closest('details.fold.is-enhanced:not(.is-plain)');
  if (fold && isTeaser(fold) && !skip(el)) return { el: fold, label: 'OPEN' };
  if (fold && isOpen(fold)) {
   const c = el.closest('summary,.fold-close');
   if (c) return { el: c, label: 'CLOSE' };
   if (!skip(el) && el.closest('.fold-body')) return { el: fold, label: 'CLOSE', soft: true };
  }
  const h = el.closest(INTERACTIVE);
  if (!h) return null;
  const t = h.matches('.q-track') ? 'DRAG' : h.matches('a[href],.fold-more,.q-card') ? 'OPEN' : '';
  return { el: h, label: t };
 }

 const P = { x: -100, y: -100 }, R = { x: -100, y: -100, w: 26, h: 26 }, G = { x: -100, y: -100 };
 let hit = null, overText = false, down = false, raf = 0, last = 0, lastEl = null;

 function goal() {
  if (hit) return hit.soft ? [44, 44] : [58, 58];
  if (overText) return [3, 26];
  return [26, 26];
 }

 function frame(now) {
  raf = 0;
  // easing per 60fps frame, scaled by real elapsed time so a slow screen catches up at the same speed
  const dt = Math.min(64, last ? now - last : 16.7) / 16.7;
  last = now;
  const ease = k => (reduced ? 1 : 1 - Math.pow(1 - k, dt));
  const [gw, gh] = goal();
  const k = ease(0.3), ks = ease(0.22), kg = ease(0.1);
  R.x += (P.x - R.x) * k; R.y += (P.y - R.y) * k;
  R.w += (gw - R.w) * ks; R.h += (gh - R.h) * ks;
  G.x += (P.x - G.x) * kg; G.y += (P.y - G.y) * kg;
  ring.style.width = R.w + 'px';
  ring.style.height = R.h + 'px';
  ring.style.borderRadius = Math.min(R.w, R.h) / 2 + 'px';
  ring.style.transform = `translate3d(${R.x - R.w / 2}px,${R.y - R.h / 2}px,0) scale(${down ? 0.88 : 1})`;
  glow.style.transform = `translate3d(${G.x}px,${G.y}px,0)`;
  label.style.transform = `translate3d(${R.x}px,${R.y}px,0) translate(-50%,-50%)`;
  cur.classList.toggle('is-solid', !!hit || (overText && R.w < 8));
  const left = Math.abs(P.x - R.x) + Math.abs(P.y - R.y) + Math.abs(gw - R.w) + Math.abs(gh - R.h) + Math.abs(P.x - G.x) + Math.abs(P.y - G.y);
  if (left > 0.3) raf = requestAnimationFrame(frame);
  else last = 0;
 }
 const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

 function refresh(el) {
  hit = hitFor(el);
  label.textContent = hit ? hit.label : '';
  cur.classList.toggle('has-label', !!(hit && hit.label));
  overText = !hit && !!(el && el.closest(TEXT));
  kick();
 }

 addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  P.x = e.clientX; P.y = e.clientY;
  root.classList.add('cur-in');
  lastEl = e.target instanceof Element ? e.target : null;
  refresh(lastEl);
 }, { passive: true });
 // after a card opens or closes, what is under the pointer changes
 addEventListener('click', () => setTimeout(() => { lastEl = document.elementFromPoint(P.x, P.y); refresh(lastEl); }, 0));
 addEventListener('pointerdown', () => { down = true; kick(); });
 addEventListener('pointerup', () => { down = false; kick(); });
 document.addEventListener('mouseout', e => { if (!e.relatedTarget) root.classList.remove('cur-in'); });
 addEventListener('blur', () => root.classList.remove('cur-in'));
 addEventListener('scroll', () => { if (lastEl) refresh(document.elementFromPoint(P.x, P.y)); }, { passive: true });
})();
