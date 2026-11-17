// 2.2.0 · Build log on the Lab page.
// Add one object to BUILD_LOG and it shows on Lab, newest first. Copy is { en, ko }; ko is what the Korean view shows.
// started: 'YYYY-MM' (leave '' if unknown, shown as —). tone: 'live' | 'wip' | 'paused' (only changes the status dot).
// Rows that should stay off the public site go in build-log-private.js, which only versions.html loads.
window.BUILD_LOG = [
 {
  name: { en: 'Brain Garden', ko: '뇌정원' },
  started: '2026-11',
  stuck: { en: 'Ideas I parked were simply forgotten.', ko: '미뤄둔 생각이 그대로 잊혀졌어.' },
  built: { en: 'An idea garden. Neglected ideas grow moss as an invitation to come back, today holds three items, and finished ideas go to a museum.', ko: '방치한 생각에 이끼가 자라 다시 부르는 생각 정원. 오늘은 세 개까지, 끝낸 생각은 박물관으로.' },
  tools: 'HTML/JS · Claude API',
  status: { en: 'In design · Private', ko: '설계 중 · 비공개' }, tone: 'wip'
 },
 {
  name: { en: 'This portfolio', ko: '이 포트폴리오' },
  started: '2026-10',
  stuck: { en: 'A template site couldn’t show how I work.', ko: '템플릿 사이트로는 내가 일하는 방식이 안 보였어.' },
  built: { en: 'The site you’re on. Hand-built in two languages and released in numbered versions.', ko: '지금 보고 있는 이 사이트. 두 언어로 직접 만들고, 버전 번호를 붙여서 내보내.' },
  tools: 'HTML/CSS/JS · Claude Code · Codex · Vercel',
  status: { en: 'Live · You’re here', ko: '운영 중 · 지금 여기' }, tone: 'live'
 },
 {
  name: { en: 'Stock zone screener', ko: '주식 구간 스크리너' },
  started: '2026-07',
  stuck: { en: 'Checking stocks one by one in a broker app.', ko: '증권사 앱에서 종목을 하나씩 찾아봐야 했어.' },
  built: { en: 'A personal chart that finds the indicator zones I look for and shades them with stats. Alerts come next.', ko: '내가 찾는 지표 구간을 자동으로 찾아 차트에 음영과 통계로 보여줘. 다음은 알림.' },
  tools: 'JavaScript · Lightweight Charts',
  status: { en: 'Building · Private', ko: '만드는 중 · 비공개' }, tone: 'wip'
 },
 {
  name: { en: 'Problem-Framer', ko: 'Problem-Framer' },
  started: '2026-06',
  stuck: { en: 'I couldn’t tell whether a brief named the real problem.', ko: '브리프가 진짜 문제를 짚는지 판단이 안 됐어.' },
  built: { en: 'Sends one problem to three AI models at once and lays out the Business × User × Team views side by side.', ko: '하나의 문제를 세 AI 모델에 동시에 보내 Business × User × Team 관점을 나란히 비교해.' },
  tools: 'Next.js · Claude · GPT-4o · Llama · Vercel',
  status: { en: 'Live', ko: '운영 중' }, tone: 'live',
  link: 'https://problem-framer-nine.vercel.app'
 },
 {
  name: { en: 'Brain-dump inbox', ko: '브레인 덤프 인박스' },
  started: '2026-06',
  stuck: { en: 'Everything in my head ended up in one messy list.', ko: '머릿속에 있는 게 한 목록에 뒤섞여 있었어.' },
  built: { en: 'Paste anything and AI sorts each line into remember, start, do or plan. If the AI call fails, keywords sort it instead.', ko: '아무거나 붙여넣으면 AI가 줄마다 새겨둘 것·시작할 것·처리할 것·짜야 할 것으로 나눠. AI가 안 되면 키워드로 나눠.' },
  tools: 'React · Claude API',
  status: { en: 'Grew into Brain Garden', ko: '뇌정원으로 이어짐' }, tone: 'paused'
 },
 {
  name: { en: 'Life-ops coaches', ko: '라이프옵스 코치' },
  started: '2026-06',
  stuck: { en: 'Plans I made on my own didn’t turn into action.', ko: '혼자 세운 계획이 실행으로 안 넘어갔어.' },
  built: { en: 'Five animal coach agents in Claude Code, with a daily check-in and a weekly review.', ko: 'Claude Code 안의 동물 코치 다섯 명. 매일 체크인하고 매주 돌아봐.' },
  tools: 'Claude Code · subagents',
  status: { en: 'Prototype · Private', ko: '프로토타입 · 비공개' }, tone: 'paused'
 },
 {
  name: { en: 'Baton', ko: 'Baton' },
  started: '',
  stuck: { en: 'I couldn’t see when and where I actually focus.', ko: '언제, 어디서 집중이 잘 되는지 몰랐어.' },
  built: { en: 'A daily-planning app that shows focus patterns by place and time as hypotheses I confirm or reject.', ko: '장소와 시간대별 집중 패턴을 내가 확인하거나 기각할 가설로 보여주는 일일 계획 앱.' },
  tools: 'Claude Code',
  status: { en: 'Prototype · Private', ko: '프로토타입 · 비공개' }, tone: 'paused'
 }
];

(() => {
 const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
 const t = (o, tag = 'span', cls = '') => `<${tag}${cls ? ` class="${cls}"` : ''} data-en="${esc(o.en)}">${esc(o.ko)}</${tag}>`;
 const date = s => s ? s.replace('-', '.') : '—';
 const sort = list => list.slice().sort((a, b) => (b.started || '0000').localeCompare(a.started || '0000'));
 const head = [
  { en: 'Project', ko: '프로젝트' },
  { en: 'Where I got stuck', ko: '막혔던 순간' },
  { en: 'What I built', ko: '만든 것' },
  { en: 'Built with', ko: '도구' },
  { en: 'Started', ko: '시작' },
  { en: 'Status', ko: '상태' }
 ];
 document.querySelectorAll('[data-build-log]').forEach(box => {
  const all = box.dataset.buildLog === 'all';
  const rows = sort(all
   ? (window.BUILD_LOG || []).map(r => ({ ...r, shown: true })).concat((window.BUILD_LOG_PRIVATE || []).map(r => ({ ...r, shown: false })))
   : (window.BUILD_LOG || []));
  const cols = all ? head.concat({ en: 'On Lab', ko: 'Lab 노출' }) : head;
  const body = rows.map(r => {
   const name = r.link
    ? `<a href="${esc(r.link)}" target="_blank" rel="noopener" data-en="${esc(r.name.en)} ↗">${esc(r.name.ko)} ↗</a>`
    : t(r.name);
   return `<tr data-tone="${esc(r.tone || 'wip')}">`
    + `<th scope="row" class="bl-name">${name}</th>`
    + `<td class="bl-stuck">${t(head[1], 'span', 'bl-label')}${t(r.stuck, 'p')}</td>`
    + `<td class="bl-built">${t(head[2], 'span', 'bl-label')}${t(r.built, 'p')}</td>`
    + `<td class="bl-tools">${esc(r.tools)}</td>`
    + `<td class="bl-date"><time${r.started ? ` datetime="${esc(r.started)}"` : ''}>${date(r.started)}</time></td>`
    + `<td class="bl-status"><span class="bl-pill">${t(r.status)}</span></td>`
    + (all ? `<td class="bl-shown">${r.shown ? '보임' : '기록용'}</td>` : '')
    + `</tr>`;
  }).join('');
  box.innerHTML = `<table class="build-log-table">`
   + `<caption class="bl-caption" data-en="Everything I've built, newest first">만든 것 전체, 최신순</caption>`
   + `<thead><tr>${cols.map(c => `<th scope="col">${t(c)}</th>`).join('')}</tr></thead>`
   + `<tbody>${body}</tbody></table>`;
 });
})();
