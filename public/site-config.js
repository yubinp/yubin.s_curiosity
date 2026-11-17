// 2.1.0 · Contact links and visit tracking. This is the only file to edit for either.
// Leave a value empty ('') and that link, or the tracking, stays off. Nothing breaks.
window.SITE_CONFIG = {
  contact: {
    email: '',     // e.g. 'name@example.com'
    linkedin: '',  // full address, e.g. 'https://www.linkedin.com/in/your-name'
    cv: ''         // a PDF inside public/, e.g. 'assets/Yubin-Park-CV.pdf'
  },
  visits: {
    // Umami Cloud › Settings › Websites › your site › Website ID
    umamiWebsiteId: '',
    // Tracking runs only on these addresses, so previews and localhost are never counted.
    hosts: ['yubin-curiosity.vercel.app', 'howhaveyubin.uk', 'www.howhaveyubin.uk', 'yubin.uk', 'www.yubin.uk']
  }
};
