// 2.2.0 · Build log rows kept off the public site. Only versions.html loads this file; Lab never does.
// Same shape as BUILD_LOG in build-log.js. Move a row there when you want it on Lab.
// It is not linked anywhere, but anyone who guesses the address can open it, same as versions.html.
window.BUILD_LOG_PRIVATE = [
 {
  name: { en: 'Application Loop', ko: '지원 루프' },
  started: '2026-11',
  stuck: { en: '', ko: '지원 현황과 오늘 할 일을 한 화면에서 못 봤어.' },
  built: { en: '', ko: '지원 기록, 7일 무응답 처리, 가고 싶은 곳 72시간 준비 타이머, 매일 아침 Gmail·공고 동기화.' },
  tools: 'Claude 아티팩트 · 예약 작업',
  status: { en: '', ko: '쓰는 중' }, tone: 'live'
 },
 {
  name: { en: 'JD word map', ko: '공고 단어 빈도 대시보드' },
  started: '2026-11',
  stuck: { en: '', ko: '공고마다 뭘 원하는지 감으로만 읽었어.' },
  built: { en: '', ko: '목표 공고 11~12개의 단어를 빈도와 의미로 묶어서 보여줘.' },
  tools: 'Claude 아티팩트',
  status: { en: '', ko: '쓰는 중' }, tone: 'live'
 },
 {
  name: { en: 'Target Board', ko: '타겟 보드' },
  started: '2026-10',
  stuck: { en: '', ko: '어디에 지원할지 매번 처음부터 찾았어.' },
  built: { en: '', ko: '스폰서 가능한 런던 회사 30여 곳을 A·B·C 티어로 정리한 보드.' },
  tools: 'Claude 아티팩트',
  status: { en: '', ko: '쓰는 중' }, tone: 'live'
 },
 {
  name: { en: 'Portfolio 100', ko: '포폴 100 트래커' },
  started: '2026-10',
  stuck: { en: '', ko: '좋은 포폴을 봐도 내 포폴로 옮겨지지 않았어.' },
  built: { en: '', ko: '디자이너 포폴 100개를 배울 점·적용할 점·뺄 점으로 기록하고 모아 봐.' },
  tools: 'Claude 아티팩트',
  status: { en: '', ko: '쓰는 중' }, tone: 'live'
 },
 {
  name: { en: 'JobHunter OS', ko: 'JobHunter OS' },
  started: '2026-07',
  stuck: { en: '', ko: '구직 정보가 여기저기 흩어져 있었어.' },
  built: { en: '', ko: '개인 구직 대시보드. jobhunter-os.vercel.app' },
  tools: 'Next.js · TypeScript · Vercel',
  status: { en: '', ko: '멈춤' }, tone: 'paused'
 },
 {
  name: { en: 'Morning brief', ko: '모닝 브리프' },
  started: '',
  stuck: { en: '', ko: '아침마다 뭘 먼저 봐야 할지 흩어져 있었어.' },
  built: { en: '', ko: '매일 6시 한 페이지 브리프: 일정, 지원할 만한 공고와 어필 포인트.' },
  tools: '예약 작업 · Claude 아티팩트',
  status: { en: '', ko: '쓰는 중' }, tone: 'live'
 },
 {
  name: { en: 'Interview Coach', ko: '인터뷰 코치' },
  started: '',
  stuck: { en: '', ko: '혼자서는 면접 연습 상대가 없었어.' },
  built: { en: '', ko: '면접 답변을 연습하는 Claude 프로젝트 프롬프트 (v2).' },
  tools: 'Claude 프로젝트',
  status: { en: '', ko: '확인 필요' }, tone: 'paused'
 }
];
