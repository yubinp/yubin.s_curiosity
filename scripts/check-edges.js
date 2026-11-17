// Checks that every page-level block lines up to the same left and right edge as the header.
// Run before every PR:  python3 -m http.server 8765 --directory public  &  node scripts/check-edges.js
// Prints each block that sticks out or sits inside the edge, per page and screen width. "0" means all aligned.
const {chromium}=require('playwright');
const BASE=process.env.BASE||'http://localhost:8765/';
const PAGES=['index','ctr','krust','system','research','info'];
const WIDTHS=[390,1288,1440,1920,2560];
(async()=>{const b=await chromium.launch();let bad=0;
for(const w of WIDTHS){const p=await (await b.newContext({viewport:{width:w,height:900}})).newPage();
 for(const pg of PAGES){await p.goto(BASE+pg+'.html',{waitUntil:'networkidle'});
  const r=await p.evaluate(()=>{const R=e=>{const b=e.getBoundingClientRect();return [Math.round(b.left),Math.round(b.right)]};
   const L=R(document.querySelector('.editorial-header .brand'))[0];
   const Rt=R([...document.querySelectorAll('.editorial-header > *')].filter(e=>e.getClientRects().length&&getComputedStyle(e).display!=='none').pop())[1];
   const off=[];const check=(n,e)=>{const [l,r]=R(e);if(Math.abs(l-L)>1||Math.abs(r-Rt)>1)off.push(n+' '+l+'–'+r)};
   [...document.querySelector('main').children].forEach(c=>{if(!c.getClientRects().length||getComputedStyle(c).position==='fixed')return;check(String(c.className||c.tagName).split(' ')[0],c)});
   const fl=[...document.querySelector('footer').children].filter(c=>c.getClientRects().length);
   if(fl.length){const a=R(fl[0])[0],z=R(fl[fl.length-1])[1];if(Math.abs(a-L)>1||Math.abs(z-Rt)>1)off.push('footer content '+a+'–'+z)}
   return {edge:L+'–'+Rt,off}});
  if(r.off.length){bad+=r.off.length;console.log(pg+' @'+w+' edge '+r.edge+' | off: '+r.off.join(' · '))}}}
console.log('blocks off the edge: '+bad);await b.close();process.exit(bad?1:0)})();
