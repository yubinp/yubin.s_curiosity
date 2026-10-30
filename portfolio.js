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
  document.querySelectorAll('.reading-detail').forEach(el=>{if(terms.test(el.textContent))mark(el)});
  document.querySelectorAll('main p, main figcaption').forEach(el=>{if(!el.closest('.work-note')&&terms.test(el.textContent))mark(el)});
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
 try{root.classList.toggle('dark',localStorage.getItem('yubin-theme-v2')==='dark');language=localStorage.getItem('yubin-language')==='ko'?'ko':'en'}catch{}
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
