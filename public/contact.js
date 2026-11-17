// 2.1.0 · Contact links in the footer of every page and on About.
// Values come from site-config.js. Runs before portfolio.js, so the KR/EN switch picks up the labels.
(function () {
  const c = ((window.SITE_CONFIG || {}).contact) || {};
  const items = [];
  if (c.email) items.push({ type: 'email', href: 'mailto:' + c.email, ko: '이메일', en: 'Email', full: c.email });
  if (c.linkedin) items.push({ type: 'linkedin', href: c.linkedin, ko: 'LinkedIn', en: 'LinkedIn', external: true });
  if (c.cv) items.push({ type: 'cv', href: c.cv, ko: 'CV (PDF)', en: 'CV (PDF)', external: true });
  if (!items.length) return;

  document.querySelectorAll('[data-contact]').forEach(box => {
    const onAbout = box.dataset.contact === 'about';
    items.forEach(i => {
      const a = document.createElement('a');
      a.href = i.href;
      a.dataset.contactType = i.type;
      if (i.external) { a.target = '_blank'; a.rel = 'noopener'; }
      // On About the address itself is shown, so it can be copied.
      const ko = onAbout && i.full ? i.full : i.ko + (i.external ? ' ↗' : '');
      const en = onAbout && i.full ? i.full : i.en + (i.external ? ' ↗' : '');
      a.textContent = ko;
      a.setAttribute('data-en', en);
      box.appendChild(a);
    });
    box.hidden = false;
    const block = box.closest('[data-contact-block]');
    if (block) block.hidden = false;
  });
})();
