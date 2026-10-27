/* OmniServ — app logic: hash routing, screens and the order flow. No framework, no backend. */

const $ = (sel, root = document) => root.querySelector(sel);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const catById = id => CATEGORIES.find(c => c.id === id);

const LANG_KEY = 'omniser.lang';
const ORDERS_KEY = 'omniser.orders'; // DEMO: orders live in localStorage only

const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ---------- Icons (inline SVG, 24x24 stroke) ---------- */
const ICONS = {
  home: '<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  orders: '<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M9 4V3h6v1M9 10h6M9 14h6M9 18h3"/>',
  settings: '<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  whatsapp: '<path d="M3 21l1.7-4.9A8.5 8.5 0 1 1 7.6 19.4z"/><path d="M9 9.2c.2 2.9 2.9 5.6 5.8 5.8l1.2-1.4-2-1-1 .7a4 4 0 0 1-2-2l.7-1-1-2z"/>',
  back: '<path d="M15 18l-6-6 6-6"/>',
  chev: '<path d="M9 18l6-6-6-6"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  bolt: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  cctv: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
  drop: '<path d="M12 2.7s6 6.3 6 11.3a6 6 0 0 1-12 0c0-5 6-11.3 6-11.3z"/>',
  roller: '<rect x="3" y="3" width="15" height="6" rx="1.5"/><path d="M18 6h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-8v3"/><rect x="10" y="14" width="4" height="7" rx="1"/>',
  cart: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.6a1 1 0 0 0 1-.8L21 7H6"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  tag: '<path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.8 0L3 13V3h10l7.6 7.6a2 2 0 0 1 0 2.8z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  headset: '<path d="M3 14v-2a9 9 0 0 1 18 0v2"/><path d="M21 15a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2zM3 15a2 2 0 0 0 2 2h1v-6H5a2 2 0 0 0-2 2z"/>',
  pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  locate: '<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="7"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>',
  star: '<path fill="currentColor" stroke="none" d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>',
  camera: '<path d="M3 8a2 2 0 0 1 2-2h2l2-2h6l2 2h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><circle cx="12" cy="13" r="3.5"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  chat: '<path d="M21 12a8 8 0 0 1-11.6 7.1L3 21l1.9-6.4A8 8 0 1 1 21 12z"/><path d="M8 10h8M8 14h5"/>',
};
const icon = (name, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name]}</svg>`;

/* ---------- Small UI helpers ---------- */
let timers = [];

function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2500);
}

// In-app dialog (native confirm() isn't styled and blocks). Resolves true on OK.
function ask({ title, text = '', ok = t('ok'), cancel, danger }) {
  return new Promise(resolve => {
    const m = $('#modal');
    m.innerHTML = `<div class="dialog" role="dialog" aria-modal="true"><h3>${title}</h3>${text ? `<p>${text}</p>` : ''}
      <div class="dialog-actions">${cancel ? `<button class="btn btn-ghost" data-r="0">${cancel}</button>` : ''}
      <button class="btn ${danger ? 'btn-danger' : 'btn-navy'}" data-r="1">${ok}</button></div></div>`;
    m.hidden = false;
    m.onclick = e => {
      const b = e.target.closest('[data-r]');
      if (!b && e.target !== m) return;
      m.hidden = true;
      m.onclick = null;
      resolve(!!b && b.dataset.r === '1');
    };
  });
}

const sliderHTML = (slides, cls) =>
  `<div class="slider ${cls}"><div class="track">${slides.join('')}</div>
   <div class="dots">${slides.map((_, i) => `<i class="${i ? '' : 'on'}"></i>`).join('')}</div></div>`;

function initSlider(el, ms) {
  const track = $('.track', el), dots = [...el.querySelectorAll('.dots i')], n = dots.length;
  const rtl = document.documentElement.dir === 'rtl';
  let i = 0, x0 = null, timer;
  const show = k => {
    i = (k + n) % n;
    track.style.transform = `translateX(${(rtl ? 1 : -1) * i * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('on', j === i));
  };
  const restart = () => { clearInterval(timer); timer = setInterval(() => show(i + 1), ms); timers.push(timer); };
  el.addEventListener('pointerdown', e => { x0 = e.clientX; });
  el.addEventListener('pointerup', e => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) < 40) return;
    show(i + ((dx < 0) !== rtl ? 1 : -1));
    restart();
  });
  restart();
}

const stars = n => [1, 2, 3, 4, 5].map(k => icon('star', k > n ? 'off' : '')).join('');

const locale = () => I18N[lang]._locale;
const fmtDate = (d, opts = { day: 'numeric', month: 'short', year: 'numeric' }) =>
  new Intl.DateTimeFormat(locale(), opts).format(d);

function isoDate(offsetDays = 0) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
const parseISO = s => new Date(`${s}T00:00`);

/* ---------- Screens ---------- */
function homeHTML() {
  const offers = OFFERS.map(o => `<div class="slide offer" style="background:${o.bg}">
      <div><b>${t(o.key + '.title')}</b><p>${t(o.key + '.text')}</p></div>${icon(o.icon, 'slide-ic')}</div>`);
  return `
  <header class="topbar">
    <div class="logo">${t('brand')}</div>
    <div class="topbar-actions">
      <a class="icon-btn" href="#/search" aria-label="${t('search')}">${icon('search')}</a>
      <button class="icon-btn" data-action="notifications" aria-label="${t('notifications')}">${icon('bell')}</button>
    </div>
  </header>
  ${sliderHTML(offers, 'offers')}
  <section class="call-box">
    <div class="call-ic">${icon('headset')}</div>
    <div class="call-txt"><b>${t('call.title')}</b><span><bdi>${CONTACT.phoneDisplay}</bdi></span></div>
    <a class="btn btn-green btn-sm" href="tel:${CONTACT.phoneTel}">${icon('phone')}${t('call.btn')}</a>
  </section>
  <h2 class="section-title">${t('home.services')}</h2>
  <div class="cat-grid">${CATEGORIES.map(c => `
    <a class="cat" href="#/service/${c.id}">${art(c.id)}<span>${t('cat.' + c.id)}</span></a>`).join('')}
  </div>
  <div class="guarantee">${art('guarantee')}<b>${t('home.guarantee')}</b></div>`;
}

function serviceHTML(id) {
  const c = catById(id);
  if (!c) return homeHTML();
  const slides = c.subs.slice(0, 3).map((s, i) => `<div class="slide hero" style="background:${HERO_BG[i]}">
      <span class="hero-art">${art(c.id)}</span><span class="hero-cap">${t('sub.' + s)}</span></div>`);
  return `
  <div class="hero-wrap">${sliderHTML(slides, 'hero-slider')}
    <button class="icon-btn float-back" data-action="back" aria-label="back">${icon('back', 'flip')}</button></div>
  <div class="svc-body">
    <h1>${t('cat.' + id)}</h1>
    <p class="tagline">${t('cat.' + id + '.tag')}</p>

    <h2 class="section-title">${t('svc.subs')}</h2>
    <ul class="list">${c.subs.map(s => `<li><button class="row" data-action="order" data-cat="${id}" data-sub="${s}">
      <span class="row-check">${icon('check')}</span><span class="row-txt">${t('sub.' + s)}</span>${icon('chev', 'flip muted')}</button></li>`).join('')}
    </ul>

    <h2 class="section-title">${t('svc.features')}</h2>
    <div class="feat-grid">${FEATURES.map(f => `<div class="feat">${icon(f.icon)}<b>${t('feat.' + f.key)}</b><span>${t('feat.' + f.key + '.text')}</span></div>`).join('')}</div>

    <h2 class="section-title">${t('svc.how')}</h2>
    <ol class="steps">${WORK_STEPS.map((s, i) => `<li><span class="num">${i + 1}</span>${t('step.' + s)}</li>`).join('')}</ol>

    <h2 class="section-title">${t('svc.reviews')} <span class="badge-demo">${t('demo')}</span></h2>
    <div class="reviews">${REVIEWS.map(r => `<div class="review">
      <div class="review-head"><span class="avatar">${t(r.key + '.name')[0]}</span><b>${t(r.key + '.name')}</b><span class="stars">${stars(r.stars)}</span></div>
      <p>${t(r.key + '.text')}</p></div>`).join('')}
    </div>
  </div>
  <div class="sticky-cta"><button class="btn btn-green btn-block" data-action="order" data-cat="${id}">${t('svc.order')}</button></div>`;
}

function searchHTML() {
  return `
  <header class="topbar">
    <button class="icon-btn" data-action="back" aria-label="back">${icon('back', 'flip')}</button>
    <label class="search-field">${icon('search')}<input id="q" type="search" placeholder="${t('search.ph')}" autocomplete="off"></label>
  </header>
  <ul class="list pad" id="results"></ul>`;
}

function mountSearch() {
  const q = $('#q'), out = $('#results');
  const update = () => {
    const s = q.value.trim().toLowerCase();
    const items = [];
    CATEGORIES.forEach(c => {
      const name = t('cat.' + c.id);
      if (!s || name.toLowerCase().includes(s)) items.push({ c, label: name });
      if (s) c.subs.forEach(sub => {
        if (t('sub.' + sub).toLowerCase().includes(s)) items.push({ c, label: t('sub.' + sub), parent: name });
      });
    });
    out.innerHTML = items.length
      ? items.map(i => `<li><a class="row" href="#/service/${i.c.id}">${art(i.c.id, 'sm')}
          <span class="row-txt">${i.label}${i.parent ? `<small>${i.parent}</small>` : ''}</span>${icon('chev', 'flip muted')}</a></li>`).join('')
      : `<li class="empty-small">${t('search.none')}</li>`;
  };
  q.addEventListener('input', update);
  update();
  q.focus();
}

function ordersHTML() {
  // Skip demo orders saved under services that no longer exist.
  const orders = store.get(ORDERS_KEY, []).filter(o => catById(o.cat));
  const head = `<header class="topbar"><h1 class="page-title">${t('orders.title')}</h1></header>`;
  if (!orders.length) {
    return head + `<div class="empty">${icon('orders', 'empty-ic')}<b>${t('orders.empty')}</b>
      <p>${t('orders.emptyText')}</p><a class="btn btn-green" href="#/home">${t('orders.browse')}</a></div>`;
  }
  return head + `<p class="note">${t('orders.note')}</p><div class="orders">${orders.map(o => {
    const c = catById(o.cat);
    return `<div class="order-card">
      <div class="order-top">${art(c.id, 'sm')}
        <div class="order-title"><b>${t('cat.' + c.id)}</b><small>${t('sub.' + o.sub)}</small></div>
        <span class="status">${t('status.' + o.status)}</span></div>
      <div class="order-meta"><span>${icon('pin')}${t('em.' + o.emirate)}</span>
        <span>${icon('calendar')}${fmtDate(parseISO(o.date), { weekday: 'short', day: 'numeric', month: 'short' })}</span></div>
      <div class="order-foot"><bdi>#${o.id}</bdi><span>${fmtDate(o.createdAt)}</span></div>
    </div>`;
  }).join('')}</div>`;
}

function settingsHTML() {
  return `
  <header class="topbar"><h1 class="page-title">${t('settings.title')}</h1></header>
  <div class="pad">
    <h2 class="section-title">${t('settings.language')}</h2>
    <div class="seg">${Object.keys(I18N).map(code =>
      `<button class="${code === lang ? 'on' : ''}" data-action="lang" data-lang="${code}">${I18N[code]._name}</button>`).join('')}</div>

    <h2 class="section-title">${t('settings.contact')}</h2>
    <div class="card list-card">
      <a class="row" href="tel:${CONTACT.phoneTel}">${icon('phone')}<span class="row-txt">${t('settings.phone')}<small><bdi>${CONTACT.phoneDisplay}</bdi></small></span>${icon('chev', 'flip muted')}</a>
      <a class="row" href="https://wa.me/${CONTACT.whatsapp}" target="_blank" rel="noopener">${icon('whatsapp')}<span class="row-txt">${t('settings.whatsapp')}<small><bdi>${CONTACT.phoneDisplay}</bdi></small></span>${icon('chev', 'flip muted')}</a>
      <a class="row" href="mailto:${CONTACT.email}">${icon('mail')}<span class="row-txt">${t('settings.email')}<small><bdi>${CONTACT.email}</bdi></small></span>${icon('chev', 'flip muted')}</a>
      <div class="row">${icon('clock')}<span class="row-txt">${t('settings.hours')}<small>${t('settings.hoursVal')}</small></span></div>
    </div>

    <h2 class="section-title">${t('settings.about')}</h2>
    <div class="card about"><div class="logo">${t('brand')}</div>
      <p>${t('settings.aboutText')}</p><small>${t('settings.version')} 0.1 · ${t('demo')}</small></div>
  </div>`;
}

const VIEWS = {
  home:     { tabs: true, html: homeHTML, mount: () => initSlider($('.offers'), 4000) },
  service:  { html: serviceHTML, mount: () => $('.hero-slider') && initSlider($('.hero-slider'), 3500) },
  search:   { html: searchHTML, mount: mountSearch },
  orders:   { tabs: true, html: ordersHTML },
  settings: { tabs: true, html: settingsHTML },
};

/* ---------- Router ---------- */
function route() {
  const [name, arg] = location.hash.replace(/^#\/?/, '').split('/');
  return VIEWS[name] ? { name, arg } : { name: 'home' };
}

function render() {
  const { name, arg } = route();
  const view = VIEWS[name];
  timers.forEach(clearInterval);
  timers = [];

  const screen = $('#screen');
  screen.innerHTML = view.html(arg);
  screen.classList.toggle('has-tabs', !!view.tabs);
  screen.scrollTop = 0;
  if (view.mount) view.mount(arg);

  $('#tabbar').hidden = $('#fab').hidden = !view.tabs;
  $('#tabbar').innerHTML = ['home', 'orders', 'settings'].map(r =>
    `<a href="#/${r}" class="${r === name ? 'on' : ''}">${icon(r)}<span>${t('tab.' + r)}</span></a>`).join('');
  $('#fab').href = `https://wa.me/${CONTACT.whatsapp}`;
  $('#fab').innerHTML = `${icon('chat')}<span>${t('help')}</span>`;
}

function go(hash) {
  if (location.hash === hash) render();
  else location.hash = hash;
}

function goBack() {
  if (history.length > 1) history.back();
  else go('#/home');
}

function setLang(code) {
  lang = I18N[code] ? code : 'ar';
  store.set(LANG_KEY, lang);
  document.documentElement.lang = lang;
  document.documentElement.dir = I18N[lang]._dir;
  const tag = $('#splash-tag'); // gone once the splash is removed
  if (tag) tag.textContent = t('splash.tag');
  const splashLogo = $('#splash .logo');
  if (splashLogo) splashLogo.innerHTML = t('brand');
}

/* ---------- Order flow ---------- */
const STEPS = ['intro', 'emirate', 'sub', 'map', 'details', 'extras', 'confirm'];
const CONFIRM = STEPS.length - 1;
let draft = null, map = null, marker = null;

function openOrder(cat, sub) {
  draft = {
    cat, sub: sub || null, step: 0, editing: false, done: null,
    emirate: null, lat: null, lng: null, address: '', mapFailed: false,
    desc: '', when: 'today', date: '', promo: '', photos: [],
  };
  $('#flow').hidden = false;
  renderFlow();
}

function closeOrder() {
  cleanupMap();
  draft.photos.forEach(p => URL.revokeObjectURL(p.url));
  draft = null;
  $('#flow').hidden = true;
  $('#flow').innerHTML = '';
}

function cleanupMap() {
  if (map) map.remove();
  map = marker = null;
}

const qHTML = (q, hint) => `<div class="q-wrap"><h2 class="q">${t(q)}</h2>${hint ? `<p class="q-hint">${t(hint)}</p>` : ''}</div>`;
const optHTML = (field, val, label) =>
  `<button class="opt ${draft[field] === val ? 'on' : ''}" data-flow="pick" data-field="${field}" data-val="${val}"><span>${label}</span><i class="radio"></i></button>`;

const whenText = d => d.when === 'date' && d.date ? fmtDate(parseISO(d.date), { weekday: 'short', day: 'numeric', month: 'long' }) : t('flow.' + d.when);

const STEP_VIEWS = {
  intro: () => `<div class="intro"><div class="intro-badge">${icon('orders')}</div>
    <h2>${t('flow.introTitle')}</h2><p>${t('flow.introText')}</p>
    <span class="chip">${art(draft.cat, 'xs')}${t('cat.' + draft.cat)}</span></div>`,

  emirate: () => qHTML('flow.emirateQ') +
    `<div class="options grid2">${EMIRATES.map(e => optHTML('emirate', e.id, t('em.' + e.id))).join('')}</div>`,

  sub: () => qHTML('flow.subQ') +
    `<div class="options">${catById(draft.cat).subs.map(s => optHTML('sub', s, t('sub.' + s))).join('')}</div>`,

  map: () => qHTML('flow.mapQ', 'flow.mapHint') + `
    <div class="map-box"><div id="map" dir="ltr"></div>
      <button class="btn btn-white btn-sm locate" data-flow="locate">${icon('locate')}${t('flow.useLocation')}</button></div>
    <p class="pin-status" id="pin-status"></p>
    <label class="field"><span>${t('flow.address')}</span>
      <input id="address" value="${esc(draft.address)}" placeholder="${t('flow.addressPh')}"></label>`,

  details: () => qHTML('flow.detailsQ') + `
    <textarea id="desc" rows="5" placeholder="${t('flow.descPh')}">${esc(draft.desc)}</textarea>
    <h3 class="q-sub">${t('flow.timeQ')}</h3>
    <div class="seg">${['today', 'tomorrow', 'date'].map(w =>
      `<button class="${draft.when === w ? 'on' : ''}" data-flow="when" data-val="${w}">${t('flow.' + w)}</button>`).join('')}</div>
    ${draft.when === 'date' ? `<input type="date" id="date" class="date-input" min="${isoDate(0)}" value="${draft.date}">` : ''}`,

  extras: () => qHTML('flow.extrasQ') + `
    <label class="field"><span>${t('flow.promo')}</span>
      <input id="promo" value="${esc(draft.promo)}" placeholder="${t('flow.promoPh')}" autocapitalize="characters"></label>
    <div class="field"><span>${t('flow.photos')}</span>
      <div class="photos">${draft.photos.map((p, i) =>
        `<div class="thumb"><img src="${p.url}" alt=""><button data-flow="rmphoto" data-i="${i}" aria-label="remove">${icon('close')}</button></div>`).join('')}
        ${draft.photos.length < 6 ? `<label class="thumb add">${icon('camera')}<small>${t('flow.addPhotos')}</small>
          <input type="file" id="photos" accept="image/*" multiple hidden></label>` : ''}</div>
      <small class="hint">${t('flow.photosNote')}</small></div>`,

  confirm: () => {
    const row = (label, step, body) => `<div class="sum-row"><div><small>${t(label)}</small><div>${body}</div></div>
      <button class="link" data-flow="edit" data-step="${step}">${icon('edit')}${t('flow.edit')}</button></div>`;
    const loc = [draft.lat !== null ? `<bdi>${draft.lat.toFixed(5)}, ${draft.lng.toFixed(5)}</bdi>` : '', esc(draft.address)].filter(Boolean).join('<br>');
    const extras = [draft.promo && `${t('flow.promo')}: <bdi>${esc(draft.promo)}</bdi>`,
      draft.photos.length && t('sum.photos', { n: draft.photos.length })].filter(Boolean).join('<br>') || t('sum.none');
    const thumbs = draft.photos.length ? `<div class="sum-thumbs">${draft.photos.map(p => `<img src="${p.url}" alt="">`).join('')}</div>` : '';
    return qHTML('flow.confirmQ') + `<div class="summary">
      ${row('sum.service', 2, `${t('cat.' + draft.cat)}<br><span class="muted">${t('sub.' + draft.sub)}</span>`)}
      ${row('sum.emirate', 1, t('em.' + draft.emirate))}
      ${row('sum.location', 3, loc)}
      ${row('sum.problem', 4, `${esc(draft.desc)}<br><span class="muted">${whenText(draft)}</span>`)}
      ${row('sum.extras', 5, extras + thumbs)}
    </div>`;
  },
};

function doneHTML() {
  return `<div class="done"><div class="done-ic">${icon('check')}</div>
    <h2>${t('flow.doneTitle')}</h2><p>${t('flow.doneText', { id: `<bdi>#${draft.done}</bdi>` })}</p>
    <button class="btn btn-green" data-flow="toOrders">${t('flow.viewOrders')}</button>
    <button class="btn btn-ghost" data-flow="toHome">${t('flow.home')}</button></div>`;
}

function renderFlow() {
  cleanupMap();
  const step = STEPS[draft.step], total = CONFIRM, done = !!draft.done;
  const nextLabel = step === 'intro' ? 'flow.start' : step === 'confirm' ? 'flow.send' : 'flow.next';
  $('#flow').innerHTML = `
    <header class="flow-head">
      <button class="icon-btn" data-flow="back" aria-label="back" ${draft.step === 0 || done ? 'disabled' : ''}>${icon('back', 'flip')}</button>
      <div class="flow-title"><b>${t('flow.title')}</b>${draft.step > 0 && !done ? `<small>${t('flow.stepOf', { n: draft.step, total })}</small>` : ''}</div>
      <button class="icon-btn" data-flow="close" aria-label="close">${icon('close')}</button>
    </header>
    <div class="progress"><i style="width:${done ? 100 : draft.step / total * 100}%"></i></div>
    <div class="flow-body">${done ? doneHTML() : STEP_VIEWS[step]()}</div>
    ${done ? '' : `<footer class="flow-foot"><button id="next" class="btn btn-green btn-block" data-flow="${step === 'confirm' ? 'send' : 'next'}">${t(nextLabel)}</button></footer>`}`;
  if (step === 'map' && !done) mountMap();
  refreshNext();
}

function isValid() {
  switch (STEPS[draft.step]) {
    case 'emirate': return !!draft.emirate;
    case 'sub': return !!draft.sub;
    case 'map': return draft.lat !== null || (draft.mapFailed && draft.address.trim().length > 2);
    case 'details': return draft.desc.trim().length >= 3 && (draft.when !== 'date' || !!draft.date);
    default: return true;
  }
}

function refreshNext() {
  const b = $('#next');
  if (b) b.disabled = !isValid();
}

function goNext() {
  if (!isValid()) return;
  draft.step = draft.editing ? CONFIRM : draft.step + 1;
  draft.editing = false;
  renderFlow();
}

/* Map step: Leaflet + OpenStreetMap tiles (free, no API key). */
function mountMap() {
  if (!window.L) {
    draft.mapFailed = true;
    $('#map').innerHTML = `<div class="map-fail">${t('flow.mapFail')}</div>`;
    $('.locate').hidden = true;
    return updatePinStatus();
  }
  const em = EMIRATES.find(e => e.id === draft.emirate) || EMIRATES[0];
  const pinned = draft.lat !== null;
  map = L.map('map').setView(pinned ? [draft.lat, draft.lng] : [em.lat, em.lng], pinned ? 16 : 12);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  if (pinned) placePin(draft.lat, draft.lng);
  map.on('click', e => placePin(e.latlng.lat, e.latlng.lng));
  setTimeout(() => map && map.invalidateSize(), 60);
  updatePinStatus();
}

function placePin(lat, lng) {
  draft.lat = lat;
  draft.lng = lng;
  if (marker) marker.setLatLng([lat, lng]);
  else {
    const pinIcon = L.divIcon({ className: 'map-pin', html: icon('pin'), iconSize: [38, 38], iconAnchor: [19, 36] });
    marker = L.marker([lat, lng], { draggable: true, icon: pinIcon }).addTo(map);
    marker.on('dragend', () => { const p = marker.getLatLng(); draft.lat = p.lat; draft.lng = p.lng; updatePinStatus(); });
  }
  updatePinStatus();
  refreshNext();
}

function updatePinStatus() {
  const el = $('#pin-status');
  if (!el) return;
  const ok = draft.lat !== null;
  el.className = 'pin-status' + (ok ? ' ok' : '');
  el.innerHTML = draft.mapFailed ? '' : ok
    ? `${icon('check')}${t('flow.pinned')} · <bdi>${draft.lat.toFixed(5)}, ${draft.lng.toFixed(5)}</bdi>`
    : `${icon('pin')}${t('flow.noPin')}`;
}

function locate(btn) {
  if (!navigator.geolocation) return toast(t('flow.locError'));
  btn.disabled = true;
  toast(t('flow.locating'));
  navigator.geolocation.getCurrentPosition(pos => {
    btn.disabled = false;
    if (!draft || !map) return;
    placePin(pos.coords.latitude, pos.coords.longitude);
    map.setView([draft.lat, draft.lng], 16);
  }, () => {
    btn.disabled = false;
    if (draft) toast(t('flow.locError'));
  }, { enableHighAccuracy: true, timeout: 10000 });
}

function sendOrder() {
  const d = draft;
  const order = {
    id: 'OS' + String(Date.now()).slice(-6),
    cat: d.cat, sub: d.sub, emirate: d.emirate, lat: d.lat, lng: d.lng, address: d.address,
    desc: d.desc, when: d.when, date: d.when === 'date' ? d.date : isoDate(d.when === 'tomorrow' ? 1 : 0),
    promo: d.promo, photos: d.photos.length, createdAt: Date.now(), status: 'new',
  };
  store.set(ORDERS_KEY, [order, ...store.get(ORDERS_KEY, [])]);
  d.done = order.id;
  renderFlow();
}

/* ---------- Events ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const a = el.dataset.action;
  if (a === 'back') goBack();
  else if (a === 'order') openOrder(el.dataset.cat, el.dataset.sub);
  else if (a === 'notifications') ask({ title: t('notifications'), text: t('notif.empty') });
  else if (a === 'lang') { setLang(el.dataset.lang); render(); }
});

const flowEl = $('#flow');

flowEl.addEventListener('click', async e => {
  const el = e.target.closest('[data-flow]');
  if (!el || el.disabled || !draft) return;
  const a = el.dataset.flow;
  if (a === 'next') goNext();
  else if (a === 'send') sendOrder();
  else if (a === 'back') {
    draft.step = draft.editing ? CONFIRM : draft.step - 1;
    draft.editing = false;
    renderFlow();
  } else if (a === 'close') {
    if (draft.done || draft.step === 0 ||
        await ask({ title: t('flow.closeTitle'), text: t('flow.closeText'), ok: t('flow.closeYes'), cancel: t('cancel'), danger: true })) {
      closeOrder();
    }
  } else if (a === 'pick') {
    draft[el.dataset.field] = el.dataset.val;
    const step = draft.step;
    renderFlow();
    setTimeout(() => { if (draft && draft.step === step) goNext(); }, 220); // auto-advance like a native picker
  } else if (a === 'when') {
    draft.when = el.dataset.val;
    renderFlow();
  } else if (a === 'locate') locate(el);
  else if (a === 'rmphoto') {
    const [p] = draft.photos.splice(+el.dataset.i, 1);
    URL.revokeObjectURL(p.url);
    renderFlow();
  } else if (a === 'edit') {
    draft.step = +el.dataset.step;
    draft.editing = true;
    renderFlow();
  } else if (a === 'toOrders' || a === 'toHome') {
    closeOrder();
    go(a === 'toOrders' ? '#/orders' : '#/home');
  }
});

flowEl.addEventListener('input', e => {
  if (!draft) return;
  const fields = { desc: 'desc', promo: 'promo', date: 'date', address: 'address' };
  const f = fields[e.target.id];
  if (f) draft[f] = e.target.value;
  refreshNext();
});

flowEl.addEventListener('change', e => {
  if (e.target.id !== 'photos' || !draft) return;
  // DEMO: photos are previewed locally only, never uploaded or saved.
  [...e.target.files].slice(0, 6 - draft.photos.length)
    .forEach(f => draft.photos.push({ url: URL.createObjectURL(f), name: f.name }));
  renderFlow();
});

window.addEventListener('hashchange', render);

/* ---------- Offline support (PWA) ---------- */
if ('serviceWorker' in navigator) {
  // Relative path so it also works from a GitHub Pages sub-folder. Needs https or localhost.
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js', { scope: './' }).catch(() => {}));
}

/* ---------- Start ---------- */
setLang(store.get(LANG_KEY, 'ar'));
if (!location.hash) history.replaceState(null, '', '#/home');
render();
setTimeout(() => {
  const s = $('#splash');
  s.classList.add('out');
  setTimeout(() => s.remove(), 450);
}, 1500);
