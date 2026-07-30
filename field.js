const fieldFont = document.createElement('link');
fieldFont.rel = 'stylesheet';
fieldFont.href = 'https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@75..125,300..900&family=IBM+Plex+Mono:wght@400;500&display=swap';
document.head.appendChild(fieldFont);
const fieldStyle = document.createElement('style');
fieldStyle.textContent = '.field-cta h2{max-width:1300px;margin:2rem 0;font-size:clamp(3rem,7vw,8rem);font-weight:800;letter-spacing:-.075em;line-height:.88;text-transform:uppercase}';
document.head.appendChild(fieldStyle);

const fieldData = {
  'ai-strategy': {status:'Available now through AI Opportunity Wall', title:'AI strategy', intro:'Stop building the AI roadmap before the organisation can see the problem.', problem:'AI programmes become expensive when tools, use cases and vendor promises arrive before a shared view of value, readiness and risk.', decisions:['Where AI could create material value','Which foundations must be fixed first','What should be pursued, deferred or stopped','Who owns the proof and the next move']},
  'programme-recovery': {status:'Application of the WALL method', title:'Programme recovery', intro:'A red programme does not need another recovery deck. It needs the whole system in view.', problem:'Delivery failure is rarely contained in one workstream. Dependencies, assumptions, incentives and decisions fragment across governance layers.', decisions:['What is actually driving failure','Which commitments remain credible','Where intervention changes the trajectory','What stops, changes owner or moves now']},
  'transformation': {status:'Application of the WALL method', title:'Transformation', intro:'Transformation fails when the future is presented but the present remains invisible.', problem:'Strategies outrun operating reality. People see their own piece, but nobody can see the whole change system at once.', decisions:['What must genuinely change','Which constraints shape the route','Where value will be proven','What the organisation can absorb now']},
  'operating-model': {status:'Application of the WALL method', title:'Operating model design', intro:'Do not draw the boxes until you can see the work.', problem:'Organisation charts simplify accountability while real work crosses functions, systems, suppliers and informal decision paths.', decisions:['How work actually flows','Where ownership breaks down','Which interfaces create friction','What structure serves the work']},
  'supplier-quality': {status:'Application of the WALL method', title:'Supplier quality', intro:'The defect is visible. The system that produced it usually is not.', problem:'Supplier quality problems sit across requirements, hand-offs, evidence, incentives, manufacturing reality and unresolved accountability.', decisions:['Where variation enters the system','Which evidence is missing or disputed','Where responsibility genuinely sits','What corrective move will hold']},
  'portfolio-prioritisation': {status:'Application of the WALL method', title:'Portfolio prioritisation', intro:'A ranked spreadsheet is not a portfolio decision.', problem:'Initiatives compete using different evidence, value logic and political sponsorship. Everything looks important because nothing is comparable.', decisions:['What the portfolio is for','Which evidence makes work comparable','What receives resource now','What pauses, stops or leaves the portfolio']},
  'executive-alignment': {status:'Application of the WALL method', title:'Executive alignment', intro:'Agreement in the meeting is not alignment in the system.', problem:'Executives often hold rational but incompatible pictures of the same organisation. The conflict stays polite because the evidence stays separate.', decisions:['Where views genuinely diverge','What evidence changes the conversation','Which trade-offs must be made','What the team will collectively own']},
  'digital-transformation': {status:'Application of the WALL method', title:'Digital transformation', intro:'Technology cannot transform work the organisation has never made visible.', problem:'Digital programmes inherit undocumented work, fragmented data, unclear ownership and solution assumptions—then encode them at scale.', decisions:['What problem digitisation must solve','Where process and ownership come first','Which capabilities create value','What to build, buy, fix or stop']}
};
const key = document.body.dataset.field;
const data = fieldData[key];
if (data) {
  document.title = `${data.title} | Put It On The Wall`;
  document.querySelector('[data-status]').textContent = data.status;
  document.querySelector('[data-title]').textContent = data.title;
  document.querySelector('[data-intro]').textContent = data.intro;
  document.querySelector('[data-problem]').textContent = data.problem;
  const list = document.querySelector('[data-decisions]');
  data.decisions.forEach((decision, index) => { const item = document.createElement('div'); item.innerHTML = `<small>0${index + 1}</small><h3>${decision}</h3>`; list.appendChild(item); });
}
