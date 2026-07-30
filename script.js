document.documentElement.classList.add('js');

const GA_MEASUREMENT_ID = 'G-BWE4ZXDJ6Q';
const CONSENT_KEY = 'piotw-analytics-consent';
let analyticsLoaded = false;

const menu = document.querySelector('[data-menu]');
const nav = document.querySelector('[data-nav]');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));
}

document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });

const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .08 }) : null;
document.querySelectorAll('.reveal').forEach(node => revealObserver ? revealObserver.observe(node) : node.classList.add('is-visible'));

function loadAnalytics() {
  if (analyticsLoaded) return;
  analyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`;
  document.head.appendChild(tag);
}

function track(name, parameters = {}) {
  if (analyticsLoaded && typeof window.gtag === 'function') window.gtag('event', name, parameters);
}

function consentPanel() {
  let panel = document.querySelector('[data-consent]');
  if (panel) return panel;
  panel = document.createElement('aside');
  panel.className = 'consent';
  panel.dataset.consent = '';
  panel.setAttribute('aria-label', 'Analytics cookie choices');
  panel.innerHTML = '<strong>Useful evidence. No surveillance theatre.</strong><p>With permission, analytics tells us which ideas and actions are useful. It stays off until you accept.</p><div class="consent-actions"><button type="button" data-accept>Accept analytics</button><button type="button" data-decline>Decline</button></div>';
  document.body.appendChild(panel);
  panel.querySelector('[data-accept]').addEventListener('click', () => { localStorage.setItem(CONSENT_KEY, 'accepted'); loadAnalytics(); panel.remove(); });
  panel.querySelector('[data-decline]').addEventListener('click', () => { localStorage.setItem(CONSENT_KEY, 'declined'); panel.remove(); });
  return panel;
}

let consent = null;
try { consent = localStorage.getItem(CONSENT_KEY); } catch (error) { consent = null; }
if (consent === 'accepted') loadAnalytics();
if (!consent) consentPanel();
document.querySelectorAll('[data-consent-open]').forEach(button => button.addEventListener('click', consentPanel));

document.querySelectorAll('a[href="fit.html"], a[href$="fit.html"]').forEach(link => link.addEventListener('click', () => track('generate_lead', { lead_source: 'fit_conversation' })));
document.querySelectorAll('a[href^="mailto:"]').forEach(link => link.addEventListener('click', () => track('generate_lead', { lead_source: 'email' })));
document.querySelectorAll('details').forEach(item => item.addEventListener('toggle', () => { if (item.open) track('faq_open', { question: item.querySelector('summary')?.textContent.trim() || '' }); }));

const fitForm = document.querySelector('[data-fit-form]');
if (fitForm) fitForm.addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(fitForm);
  const body = [
    'Hi Rose,', '',
    "I'd like to explore whether our challenge fits Put It On The Wall.", '',
    `Name: ${data.get('name') || ''}`,
    `Email: ${data.get('email') || ''}`,
    `Organisation: ${data.get('organisation') || ''}`, '',
    'What we are trying to decide:', `${data.get('decision') || ''}`, '',
    'Why it matters now:', `${data.get('urgency') || ''}`, '',
    'Who carries the decision risk:', `${data.get('sponsor') || ''}`, '',
    'What we have already tried:', `${data.get('attempted') || ''}`
  ].join('\n');
  track('generate_lead', { lead_source: 'fit_form' });
  window.location.href = `mailto:rose@roseattridge.com?subject=${encodeURIComponent('Put It On The Wall fit conversation')}&body=${encodeURIComponent(body)}`;
});
