// Site version shown in the footer. Bump it with every release (see README › Versioning).
const SITE_VERSION='2.0.5';
document.querySelectorAll('[data-site-version]').forEach(el=>{el.textContent='v'+SITE_VERSION;});
(()=>{
 const root=document.documentElement,theme=document.querySelector('.theme'),review=document.querySelector('.review-toggle');
 let language='en';
 const blocks=[...document.querySelectorAll('[data-en]')].map(el=>({el,ko:el.innerHTML,en:el.getAttribute('data-en')}));
 const accessible=[...document.querySelectorAll('[data-en-aria]')].map(el=>({el,ko:el.getAttribute('aria-label'),en:el.getAttribute('data-en-aria')}));
 const labels=()=>{
  const dark=root.classList.contains('dark'),show=document.body.classList.contains('review-mode');
  theme?.setAttribute('aria-label',language==='en'?(dark?'Switch to light theme':'Switch to dark theme'):(dark?'라이트 모드로 전환':'다크 모드로 전환'));
  if(review){review.textContent=language==='en'?(show?'✦ Hide design rationale':'✦ Show design rationale'):(show?'✦ 설계 의도 숨기기':'✦ 설계 의도 보기');review.setAttribute('aria-pressed',String(show));}
 };
 function markWorkNotes(){
  const terms=/원본 자료로 교체|원본은 추가|추가해야 해|완성된 사례로 보기는 어려워|확인이 필요|추가 확인 필요|현재 확인되지|현재 자료로 확인되지|현재 없어|검증 자료는|실제 배포 화면은 아니|실제 배포 화면 아님|실제 제작한 Lottie 파일 아님|당시 제작 파일은 아니|실제 모델 수치와 변환식 아님|실제 대안 시안이 확인된 것은 아니|집계 기준 확인 전|측정 자료가 없어|not the original Lottie|not actual model values|not the deployed|not a production screen|need.*(check|confirm|replac|evidence)|additional verification|not currently (available|confirmed)|currently unavailable|no available evidence|no.*evidence.*available|not yet verified|not been verified|original assets should replace|not available in the current material|need to be added|is needed to substantiate|cannot.*complete.*case/i;
  document.querySelectorAll('.work-note').forEach(el=>{el.classList.remove('work-note');el.removeAttribute('data-work-note-label')});
  const mark=el=>{el.classList.add('work-note');el.setAttribute('data-work-note-label',language==='en'?'TODO · Review / replace':'TODO · 확인 / 교체');if(el.tagName==='DETAILS')el.open=true;};
  document.querySelectorAll('.evidence-needed').forEach(mark);
  document.querySelectorAll('.reading-detail').forEach(el=>{if(!el.closest('[data-public-note]')&&terms.test(el.textContent))mark(el)});
  document.querySelectorAll('main p, main figcaption').forEach(el=>{if(!el.closest('.work-note')&&!el.closest('[data-public-note]')&&terms.test(el.textContent))mark(el)});
 }
 function setLanguage(value,persist=false){
  language=value==='en'?'en':'ko';root.lang=language;
  blocks.forEach(b=>{b.el.innerHTML=b[language]});
  accessible.forEach(b=>b.el.setAttribute('aria-label',b[language]));
  document.querySelectorAll('.lang-option').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.lang===language)));
  labels();
  markWorkNotes();
  if(persist){try{localStorage.setItem('yubin-language',language)}catch{}}
 }
 try{{const t=localStorage.getItem('yubin-theme-v2');root.classList.toggle('dark',t?t==='dark':true);}language=localStorage.getItem('yubin-language')==='ko'?'ko':'en'}catch{}
 setLanguage(language);
 document.querySelectorAll('.lang-option').forEach(b=>b.addEventListener('click',()=>setLanguage(b.dataset.lang,true)));
 theme?.addEventListener('click',()=>{root.classList.toggle('dark');labels();try{localStorage.setItem('yubin-theme-v2',root.classList.contains('dark')?'dark':'light')}catch{}});
 review?.addEventListener('click',()=>{document.body.classList.toggle('review-mode');labels()});
 addEventListener('storage',e=>{if(e.key==='yubin-language')setLanguage(e.newValue)});
 const chapters=[...document.querySelectorAll('.chapter')],links=[...document.querySelectorAll('.toc a')];
 if(chapters.length){
  const observer=new IntersectionObserver(entries=>{for(const e of entries){if(e.isIntersecting){links.forEach(a=>{const active=a.hash==='#'+e.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}},{rootMargin:'-15% 0px -65% 0px'});
  chapters.forEach(s=>observer.observe(s));
  const progress=document.querySelector('.toc-line i'),story=document.querySelector('.story-layout');let scheduled=false;
  const update=()=>{scheduled=false;if(progress&&story){const r=story.getBoundingClientRect();progress.style.width=Math.max(0,Math.min(100,(125-r.top)/(r.height-innerHeight+125)*100))+'%'}};
  addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update)}},{passive:true});update();
 }
})();

(()=>{const h=document.querySelector('.editorial-header'),b=h?.querySelector('.menu-toggle'),n=h?.querySelector('nav');if(!b||!n)return;const close=()=>{h.classList.remove('menu-open');b.setAttribute('aria-expanded','false')};b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';h.classList.toggle('menu-open',open);b.setAttribute('aria-expanded',String(open))});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&h.classList.contains('menu-open')){close();b.focus()}});document.addEventListener('click',e=>{if(!h.contains(e.target))close()});matchMedia('(min-width: 761px)').addEventListener('change',close)})();

(()=>{const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;if(reduced||!('IntersectionObserver'in window))return;const o=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('motion-shown');o.unobserve(e.target)}}),{threshold:.2});document.querySelectorAll('.motion-reveal').forEach(el=>{el.classList.add('motion-ready');o.observe(el)});document.querySelectorAll('.ai-build-story').forEach(story=>{if(matchMedia('(max-width:650px)').matches)return;story.classList.add('build-enhanced');story.dataset.stage='0';const stages=new IntersectionObserver(es=>{es.filter(e=>e.isIntersecting).forEach(e=>story.dataset.stage=e.target.dataset.buildStep)},{rootMargin:'-25% 0px -35% 0px',threshold:0});story.querySelectorAll('.build-step').forEach(el=>stages.observe(el))})})();

/* Version annotations are editorial overlays only: normal portfolio visitors see no markers. */
(()=>{
 const page=(location.pathname.split('/').filter(Boolean).pop()||'index').replace(/\.html$/,'');
 const v12={
  index:['.home-intro h1','.projects .project:nth-child(1) .project-copy','.projects .project:nth-child(2) .project-copy','.projects .project:nth-child(3) .project-copy'],
  ctr:['.quick-read'],
  krust:['.quick-read'],
  system:['.quick-read'],
  info:['.simple-hero h1','.simple-hero p'],
  research:['.research-intro p']
 };
 const v13={
  index:['.projects .project:nth-child(1) .project-copy','.projects .project:nth-child(2) .project-copy'],
  ctr:['.case-hero','.quick-read','.chapter#overview','.chapter#brief','.chapter#first','.chapter#turn','.chapter#second','.chapter#experience','.chapter#outcome'],
  krust:['.case-hero','.case-overview','.quick-read','.chapter#overview','.chapter#context','.chapter#question','.chapter#signals','.chapter#loading','.chapter#outcome','.chapter#experience .chapter-heading']
 };
 // Mark prior versions, then override with approved v1.5 Hero edits.
 (v12[page]||[]).concat(['footer p']).forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.dataset.changeVersion='v1.2'));
 (v13[page]||[]).forEach(sel=>document.querySelectorAll(sel).forEach(el=>el.dataset.changeVersion='v1.3'));
 if(page==='index')document.querySelectorAll('.v15-home-intro h1,.v15-hero-copy').forEach(el=>el.dataset.changeVersion='v1.5');
 // Versions are reviewed via ?versions=1; clean portfolio pages remain unchanged.
 const params=new URLSearchParams(location.search),query=params.get('versions');
 let stored=null;
 try{
  if(query==='1'||query==='0')sessionStorage.setItem('portfolio-version-overlays',query);
  stored=sessionStorage.getItem('portfolio-version-overlays');
 }catch{stored=(query==='1'||query==='0')?query:null}
 const eligible=(query==='1'||query==='0'||stored!==null);
 if(!eligible||!document.querySelector('[data-change-version]'))return;
 const button=document.createElement('button');
 button.type='button';button.className='version-toggle';
 const originalLinks=new Map();
 const syncReviewLinks=on=>{
  // Keep review mode when entering a case, including links opened in a new tab.
  document.querySelectorAll('a[href]').forEach(link=>{
   if(!originalLinks.has(link))originalLinks.set(link,link.getAttribute('href'));
   const raw=originalLinks.get(link);
   if(!raw||raw.startsWith('#'))return;
   try{
    const destination=new URL(raw,location.href);
    if(destination.origin!==location.origin)return;
    if(on)destination.searchParams.set('versions','1');
    else destination.searchParams.delete('versions');
    link.setAttribute('href',destination.pathname+destination.search+destination.hash);
   }catch{}
  });
 };
 const update=on=>{
  document.body.classList.toggle('version-compare',on);
  syncReviewLinks(on);
  button.setAttribute('aria-pressed',String(on));
  button.textContent=(document.documentElement.lang==='ko'?(on?'편집 표시 숨기기':'편집 표시 보기'):(on?'Hide edit marks':'Show edit marks'));
 };
 button.addEventListener('click',()=>{
  const on=!document.body.classList.contains('version-compare');
  update(on);try{sessionStorage.setItem('portfolio-version-overlays',on?'1':'0')}catch{}
 });
 document.body.appendChild(button);
 document.querySelectorAll('.lang-option').forEach(b=>b.addEventListener('click',()=>update(document.body.classList.contains('version-compare'))));
 update(query==='1'?true:query==='0'?false:stored==='1');
})();

// 1.6.5 · home question chips: one question lights up at a time; hovering one shows its case.
(()=>{const cloud=document.querySelector('[data-q-cloud]');if(!cloud)return;
 const chips=[...cloud.querySelectorAll('.q-chip')];let i=-1,paused=false;
 const card=c=>document.querySelector('.project a[href="'+c+'.html"]')?.closest('.project');
 const hint=c=>{chips.forEach(x=>x.classList.toggle('is-kin',!!c&&x.dataset.case===c));document.querySelectorAll('.project.is-hinted').forEach(p=>p.classList.remove('is-hinted'));if(c)card(c)?.classList.add('is-hinted');};
 chips.forEach(ch=>{ch.addEventListener('mouseenter',()=>{paused=true;chips.forEach(x=>x.classList.remove('is-on'));hint(ch.dataset.case)});ch.addEventListener('focus',()=>{paused=true;hint(ch.dataset.case)});});
 cloud.addEventListener('mouseleave',()=>{paused=false;hint(null)});cloud.addEventListener('focusout',()=>{paused=false;hint(null)});
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 const tick=()=>{if(paused||document.hidden)return;chips[i]?.classList.remove('is-on');i=(i+1)%chips.length;chips[i].classList.add('is-on');};
 if(!cloud.classList.contains('q-belt')){tick();setInterval(tick,2600);}
})();

// 1.6.6 · language: one globe button that switches EN <-> KR (EN is the default).
(()=>{document.querySelectorAll('.language-switch').forEach(sw=>{
  const opts=[...sw.querySelectorAll('.lang-option')];if(!opts.length)return;opts.forEach(o=>o.hidden=true);
  const b=document.createElement('button');b.type='button';b.className='lang-globe';
  const label=()=>b.setAttribute('aria-label',document.documentElement.lang==='ko'?'언어 바꾸기: 지금 한국어, 누르면 English':'Switch language: now English, press for Korean');
  b.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18"/></svg><span class="lang-code" aria-hidden="true"></span>';
  b.addEventListener('click',()=>{(opts.find(o=>o.getAttribute('aria-pressed')==='false')||opts[0]).click();label();});
  sw.prepend(b);label();});})();
// 1.6.6 · hidden door: on the Korean About page, drag the footer name onto the logo to open the version list.
(()=>{if(!/(^|\/)info(\.html)?$/.test(location.pathname))return;
  const name=document.querySelector('footer .footer-id a'),logo=document.querySelector('.editorial-header .brand');if(!name||!logo)return;
  let armed=false;name.setAttribute('draggable','true');
  name.addEventListener('dragstart',()=>{armed=document.documentElement.lang==='ko';});
  name.addEventListener('dragend',()=>{armed=false;logo.classList.remove('is-door');});
  logo.addEventListener('dragover',ev=>{if(!armed)return;ev.preventDefault();logo.classList.add('is-door');});
  logo.addEventListener('dragleave',()=>logo.classList.remove('is-door'));
  logo.addEventListener('drop',ev=>{if(!armed)return;ev.preventDefault();location.href='versions.html';});
})();

/* v1.8.0 · the display title font is on by default; ?title=a turns it off in this tab (for comparing), ?title=b turns it back on */
(function(){try{const q=new URLSearchParams(location.search).get('title');if(q)sessionStorage.setItem('title-trial',q);if(sessionStorage.getItem('title-trial')==='a')document.documentElement.classList.add('title-a');}catch(e){}})();

/* v1.7.0 · two-layer case: folds open in the edit view and when a link points inside one */
(function(){const folds=[...document.querySelectorAll('details.fold')];if(!folds.length)return;
 const openFor=()=>{const t=location.hash&&document.getElementById(location.hash.slice(1));const f=t&&t.closest('details.fold');if(f){f.open=true;t.scrollIntoView();}};
 if(document.body.classList.contains('version-compare'))folds.forEach(f=>f.open=true);
 openFor();addEventListener('hashchange',openFor);addEventListener('beforeprint',()=>folds.forEach(f=>f.open=true));
})();

/* v1.7.1 · question wheel: the card row drifts on its own, can be scrolled or dragged, loops, and curves away at the edges like a wheel */
(function(){const belt=document.querySelector('.q-belt'),track=belt&&belt.querySelector('.q-track');if(!track)return;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 belt.classList.add('is-wheel');let touchT=0;const rest=()=>{clearTimeout(touchT);touchT=setTimeout(()=>hold=false,1800)};
 belt.addEventListener('touchstart',()=>{clearTimeout(touchT);hold=true},{passive:true});belt.addEventListener('touchend',rest,{passive:true});belt.addEventListener('touchcancel',rest,{passive:true});const cards=[...track.children];let hold=false,drag=null,moved=0,pos=0;
 const half=()=>track.scrollWidth/2;
 let geo=[];const measure=()=>{geo=cards.map(c=>({c,x:c.offsetLeft+c.offsetWidth/2,w:c.offsetWidth}))};measure();addEventListener('resize',measure);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(measure);
 const shape=()=>{const W=belt.clientWidth,R=Math.max(W*1.05,430),mid=belt.scrollLeft+W/2;
  for(const g of geo){const x=g.x-mid;if(Math.abs(x)>W/2+g.w){g.c.style.opacity='0';continue;}
   const t=Math.max(-1.2,Math.min(1.2,x/R));
   g.c.style.transform='translateX('+(R*Math.sin(t)-x).toFixed(1)+'px) translateZ('+(R*(Math.cos(t)-1)).toFixed(1)+'px) rotateY('+(t*57.2958).toFixed(2)+'deg)';g.c.style.opacity=Math.max(0,1-Math.abs(t)*1.15).toFixed(3);}};
 const wrap=()=>{const h=half();if(pos>=h)pos-=h;else if(pos<=0)pos+=h;else return;belt.scrollLeft=pos;};
 const frame=()=>{if(Math.abs(belt.scrollLeft-pos)>1.5)pos=belt.scrollLeft;if(!hold&&!drag&&!document.hidden){pos+=.45;belt.scrollLeft=pos;}wrap();shape();requestAnimationFrame(frame);};
 belt.scrollLeft=pos=1;
 belt.addEventListener('mouseenter',()=>hold=true);belt.addEventListener('mouseleave',()=>{hold=false;drag=null;belt.classList.remove('is-drag')});
 belt.addEventListener('focusin',()=>hold=true);belt.addEventListener('focusout',()=>hold=false);
 belt.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button)return;drag={x:e.clientX,s:belt.scrollLeft};moved=0;});
 addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x;moved=Math.max(moved,Math.abs(dx));if(moved>4){belt.classList.add('is-drag');belt.scrollLeft=drag.s-dx;}});
 addEventListener('pointerup',()=>{drag=null;belt.classList.remove('is-drag')});
 belt.addEventListener('click',e=>{if(moved>4){e.preventDefault();e.stopPropagation();moved=0;}},true);
 belt.addEventListener('dragstart',e=>e.preventDefault());
 requestAnimationFrame(frame);
})();

/* v1.8.2 · folds open as teasers: the first lines show and "Continue reading" reveals the rest. The question toggles between the two. Without JS they stay plain folds. */
(function(){const folds=[...document.querySelectorAll('details.fold')];if(!folds.length)return;
 const edit=document.body.classList.contains('version-compare'),cap=matchMedia('(max-width:760px)').matches?230:200;
 folds.forEach(d=>{d.open=true;d.classList.add('is-enhanced');const sum=d.querySelector('summary'),body=d.querySelector('.fold-body');
  if(edit||body.scrollHeight<=cap+80){d.classList.add('is-plain');sum.addEventListener('click',e=>e.preventDefault());return;}
  const btn=document.createElement('button');btn.type='button';btn.className='fold-more';btn.innerHTML='<span class="en">Continue reading</span><span class="ko">계속 읽기</span><span aria-hidden="true">↓</span>';
  const set=t=>{d.classList.toggle('is-teaser',t);btn.setAttribute('aria-expanded',String(!t));sum.setAttribute('aria-expanded',String(!t))};
  btn.addEventListener('click',()=>set(false));
  sum.addEventListener('click',e=>{e.preventDefault();const t=!d.classList.contains('is-teaser');set(t);if(t&&sum.getBoundingClientRect().top<0)sum.scrollIntoView({block:'start'})});
  d.appendChild(btn);set(true);d._expand=()=>set(false);
 });
 const reveal=()=>{const t=location.hash&&document.getElementById(location.hash.slice(1));const f=t&&t.closest('details.fold');if(f&&f._expand){f._expand();t.scrollIntoView()}};
 reveal();addEventListener('hashchange',reveal);addEventListener('beforeprint',()=>folds.forEach(f=>f._expand&&f._expand()));
})();

/* v2.0.5 · header: compact at the top; smaller and see-through once you scroll; after a quarter of the page it slips away while reading down, and returns at once on the way up.
   The header is fixed so its size changes never move the page; body keeps its space with --hdr-h. */
(function(){const r=document.documentElement,h=document.querySelector('header.editorial-header');if(!h)return;
 const setH=()=>{if(!r.classList.contains('hdr-scrolled'))r.style.setProperty('--hdr-h',h.offsetHeight+'px')};
 const veil=document.createElement('div');veil.className='hdr-veil';veil.setAttribute('aria-hidden','true');h.after(veil);
 r.classList.add('hdr-js','hdr-init');setH();requestAnimationFrame(()=>requestAnimationFrame(()=>r.classList.remove('hdr-init')));addEventListener('resize',setH);if(document.fonts&&document.fonts.ready)document.fonts.ready.then(setH);
 let last=scrollY,ticking=false;
 const on=()=>{ticking=false;const y=scrollY,busy=h.classList.contains('menu-open')||h.contains(document.activeElement);
  if(y>60)r.classList.add('hdr-scrolled');else if(y<20){r.classList.remove('hdr-scrolled','hdr-hidden');}
  const d=y-last,lim=Math.max(240,(r.scrollHeight-innerHeight)*.25);
  if(d<-2){r.classList.remove('hdr-hidden');last=y}else if(d>6){r.classList.toggle('hdr-hidden',y>lim&&!busy);last=y}};
 addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(on)}},{passive:true});
 h.addEventListener('focusin',()=>r.classList.remove('hdr-hidden'));on();
})();

/* v2.0.5 · while the header is see-through, its text checks what is underneath (background colour or image brightness)
   and switches between light and dark ink, with a short fade. No blending, so no colour shifts. */
(function(){const r=document.documentElement,h=document.querySelector('header.editorial-header');if(!h)return;
 const zones=[...h.querySelectorAll('.brand, nav > *, .menu-toggle')];
 const cache=new WeakMap(),cv=document.createElement('canvas');cv.width=cv.height=8;const cx=cv.getContext('2d',{willReadFrequently:true});
 const L=(R,G,B)=>(0.2126*R+0.7152*G+0.0722*B)/255;
 const imgLum=img=>{if(cache.has(img))return cache.get(img);let v=.85;try{if(img.complete&&img.naturalWidth){cx.clearRect(0,0,8,8);cx.drawImage(img,0,0,8,8);const d=cx.getImageData(0,0,8,8).data;let t=0;for(let i=0;i<d.length;i+=4)t+=L(d[i],d[i+1],d[i+2]);v=t/(d.length/4);cache.set(img,v)}}catch(e){cache.set(img,v)}return v};
 const under=(x,y)=>{for(const e of document.elementsFromPoint(x,y)){if(h.contains(e)||e.classList.contains('hdr-veil'))continue;if(e.tagName==='IMG')return imgLum(e);const m=getComputedStyle(e).backgroundColor.match(/rgba?\(([^)]+)\)/);if(m){const p=m[1].split(/[\s,\/]+/).filter(Boolean).map(parseFloat);const a=p.length>3?p[3]:1;if(a>.4)return L(p[0],p[1],p[2])}}return r.classList.contains('dark')?.05:.95};
 let q=false;const check=()=>{q=false;const on=r.classList.contains('hdr-scrolled');for(const z of zones){if(!on||!z.getClientRects().length){z.classList.remove('ink-dark','ink-light');continue}const b=z.getBoundingClientRect(),y=b.top+b.height/2;let s=0,n=0;for(const f of [.2,.5,.8]){s+=under(b.left+b.width*f,y);n++}const lum=s/n;z.classList.toggle('ink-dark',lum>.55);z.classList.toggle('ink-light',lum<=.55)}};
 const ask=()=>{if(!q){q=true;requestAnimationFrame(check)}};addEventListener('scroll',ask,{passive:true});addEventListener('resize',ask);addEventListener('load',ask);new MutationObserver(ask).observe(r,{attributes:true,attributeFilter:['class']});ask();
})();
