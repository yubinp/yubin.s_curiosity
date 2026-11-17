// 2.1.0 · Visit tracking with Umami Cloud (no cookies). Settings in site-config.js; how to read it in README › Visits.
// What it sends, all tagged with the company code from ?ref= (or "none"):
//   visit    page, language, phone/desktop
//   read     a section was read for 10, 30 or 60 seconds (only while the tab is visible and someone scrolled or moved recently)
//   open     "Continue reading", a fold or "Show design rationale" was opened
//   question a question card on Home was clicked
//   contact  Email, LinkedIn or CV was clicked
//   next     the next-project card was clicked
(function () {
  const cfg = ((window.SITE_CONFIG || {}).visits) || {};
  const params = new URLSearchParams(location.search);
  const ref = (params.get('ref') || '').trim().slice(0, 40);

  // Keep the company code on every link inside the site, so each page of this visit carries it.
  // Done on the link itself (no cookies, no storage); a forwarded link keeps the code too.
  const withRef = a => {
    if (!ref || !a || !a.getAttribute) return;
    const h = a.getAttribute('href');
    if (!h || /^(#|mailto:|tel:|javascript:)/i.test(h) || /\.pdf($|[?#])/i.test(h)) return;
    try {
      const u = new URL(h, location.href);
      if (u.origin !== location.origin || u.searchParams.get('ref') === ref) return;
      u.searchParams.set('ref', ref);
      a.href = u.href;
    } catch (e) {}
  };
  if (ref) {
    document.querySelectorAll('a[href]').forEach(withRef);
    ['pointerdown', 'focusin', 'contextmenu'].forEach(t =>
      document.addEventListener(t, e => withRef(e.target.closest && e.target.closest('a[href]')), true));
  }

  // Your own browser: open any page once with ?me=1 and your visits stop counting (?me=0 undoes it).
  try {
    if (params.get('me') === '1') localStorage.setItem('umami.disabled', '1');
    if (params.get('me') === '0') localStorage.removeItem('umami.disabled');
  } catch (e) {}
  let mine = false;
  try { mine = localStorage.getItem('umami.disabled') === '1'; } catch (e) {}

  const edit = params.has('versions') || document.body.classList.contains('version-compare');
  const hosts = cfg.hosts || [];
  if (!cfg.umamiWebsiteId || !hosts.includes(location.hostname) || edit || mine) return;

  const page = document.documentElement.dataset.gpage || location.pathname.replace(/^\/|\.html$/g, '') || 'home';
  const queue = [];
  const send = (name, data) => {
    const d = Object.assign({ page: page, ref: ref || 'none' }, data);
    if (window.umami && typeof window.umami.track === 'function') window.umami.track(name, d);
    else queue.push([name, d]);
  };
  const s = document.createElement('script');
  s.defer = true;
  s.src = 'https://cloud.umami.is/script.js';
  s.setAttribute('data-website-id', cfg.umamiWebsiteId);
  s.setAttribute('data-domains', hosts.join(','));
  s.onload = () => {
    try { if (typeof umami.identify === 'function') umami.identify({ ref: ref || 'none' }); } catch (e) {}
    queue.splice(0).forEach(([n, d]) => umami.track(n, d));
  };
  document.head.appendChild(s);

  const text = el => {
    if (!el) return '';
    const raw = el.getAttribute('data-en') || el.textContent || '';
    const div = document.createElement('div');
    div.innerHTML = raw;
    return (div.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 90);
  };
  const sectionOf = el => { const c = el && el.closest('.chapter[id], main > section'); return c ? (c.id || String(c.className).split(' ')[0]) : ''; };

  send('visit', { lang: document.documentElement.lang, device: innerWidth < 761 ? 'phone' : 'desktop' });

  // Reading time per section. A tab left open does not count: time only runs while the tab is visible
  // and there was a scroll, key, touch or pointer move in the last 45 seconds.
  let sections = [...document.querySelectorAll('.chapter[id]')];
  if (!sections.length) sections = [...document.querySelectorAll('main > section')];
  const seconds = new Map(), sent = new Map(), marks = [10, 30, 60];
  let lastInput = Date.now();
  ['scroll', 'wheel', 'keydown', 'touchstart', 'pointermove'].forEach(t =>
    addEventListener(t, () => { lastInput = Date.now(); }, { passive: true, capture: true }));
  setInterval(() => {
    if (document.visibilityState !== 'visible' || Date.now() - lastInput > 45000) return;
    const line = innerHeight * 0.4;
    const cur = sections.find(el => { const r = el.getBoundingClientRect(); return r.top <= line && r.bottom > line; });
    if (!cur) return;
    const n = (seconds.get(cur) || 0) + 1;
    seconds.set(cur, n);
    const done = sent.get(cur) || 0;
    const mark = marks.find(m => n >= m && m > done);
    if (mark) {
      sent.set(cur, mark);
      const h = cur.querySelector('h2, h1');
      send('read', { section: cur.id || String(cur.className).split(' ')[0], title: text(h), secs: mark });
    }
  }, 1000);

  // Opened on purpose: folds, "Continue reading", design rationale.
  document.addEventListener('click', e => {
    const t = e.target;
    const more = t.closest('.fold-more');
    if (more) {
      const d = more.closest('details');
      send('open', { fold: text(d && d.querySelector('summary')), section: sectionOf(more) });
      return;
    }
    const sum = t.closest('details > summary');
    if (sum) {
      const d = sum.parentElement;
      setTimeout(() => {
        const opened = d.classList.contains('is-enhanced') ? !d.classList.contains('is-teaser') && !d.classList.contains('is-plain') : d.open;
        if (opened) send('open', { fold: text(sum), section: sectionOf(sum) });
      }, 0);
      return;
    }
    if (t.closest('.review-toggle')) {
      setTimeout(() => { if (document.body.classList.contains('review-mode')) send('open', { fold: 'design rationale' }); }, 0);
      return;
    }
    const q = t.closest('.q-card');
    if (q) { send('question', { question: text(q.querySelector('.q-card-q') || q), to: q.dataset.case || '' }); return; }
    const c = t.closest('[data-contact-type]');
    if (c) { send('contact', { type: c.dataset.contactType }); return; }
    const nx = t.closest('.next-case');
    if (nx) send('next', { to: (nx.getAttribute('href') || '').replace(/\.html.*$/, '') });
  }, true);
})();
