/* OmniServ — app data (structure only).
   All visible text lives in i18n.js; keys here point into it. */

// PLACEHOLDER contact details — replace with the real company numbers/email.
const CONTACT = {
  phoneDisplay: '050 000 0000',
  phoneTel: '+971500000000',
  whatsapp: '971500000000',
  email: 'info@omniserv.ae',
};

// The 18 services on the Home grid, in display order. Illustrations are ART[id] (illustrations.js).
// `subs` are i18n keys "sub.<id>.<n>"; n = how many sub-options the service has.
const svc = (id, n) => ({ id, subs: Array.from({ length: n }, (_, i) => `${id}.${i + 1}`) });
const CATEGORIES = [
  svc('electrical', 4), svc('lighting', 4), svc('led', 4), svc('panels', 4),
  svc('cctv', 4), svc('alarm', 3), svc('access', 4), svc('network', 4),
  svc('plumbing', 4), svc('bathroom', 4), svc('heater', 4),
  svc('tiles', 4), svc('painting', 4), svc('wall', 4), svc('handyman', 4),
  svc('equipment', 4), svc('wholesale', 4), svc('online', 3),
];

// DEMO DATA: offer banner slides (text in i18n.js under "offer1".."offer3").
const OFFERS = [
  { key: 'offer1', icon: 'tag',    bg: 'linear-gradient(135deg,#262A5A,#3f4590)' },
  { key: 'offer2', icon: 'bolt',   bg: 'linear-gradient(135deg,#2d8a3a,#3DAA4A)' },
  { key: 'offer3', icon: 'shield', bg: 'linear-gradient(135deg,#1b1e40,#262A5A 60%,#3DAA4A)' },
];

// Backgrounds for the service page image slider (placeholders until real photos exist).
const HERO_BG = [
  'linear-gradient(135deg,#262A5A,#41478f)',
  'linear-gradient(135deg,#1f2350,#2f7d3a)',
  'linear-gradient(135deg,#3DAA4A,#262A5A)',
];

// Emirates with a map center used as the starting view of the location step.
const EMIRATES = [
  { id: 'dubai',    lat: 25.2048, lng: 55.2708 },
  { id: 'abudhabi', lat: 24.4539, lng: 54.3773 },
  { id: 'sharjah',  lat: 25.3463, lng: 55.4209 },
  { id: 'ajman',    lat: 25.4052, lng: 55.5136 },
  { id: 'uaq',      lat: 25.5647, lng: 55.5552 },
  { id: 'rak',      lat: 25.8007, lng: 55.9762 },
  { id: 'fujairah', lat: 25.1288, lng: 56.3265 },
  { id: 'alain',    lat: 24.2075, lng: 55.7447 },
];

const FEATURES = [
  { key: 'warranty', icon: 'shield' },
  { key: 'fast',     icon: 'clock' },
  { key: 'pricing',  icon: 'tag' },
  { key: 'support',  icon: 'headset' },
];

const WORK_STEPS = ['consult', 'design', 'supply', 'install', 'operate', 'maintain'];

// DEMO DATA: fake reviews, shown on every service page and labelled "Demo data" in the UI.
const REVIEWS = [
  { key: 'rev1', stars: 5 },
  { key: 'rev2', stars: 5 },
  { key: 'rev3', stars: 4 },
];
