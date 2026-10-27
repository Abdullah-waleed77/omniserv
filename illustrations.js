/* OmniServ — colorful flat service illustrations (inline SVG, 64x64 viewBox).
   Keys match CATEGORIES ids in data.js, plus "guarantee" for the Home strip. */

const ART = {
  electrical: `<circle cx="32" cy="32" r="28" fill="#FFF4D6"/>
    <rect x="12" y="14" width="28" height="34" rx="6" fill="#fff" stroke="#262A5A" stroke-width="2"/>
    <circle cx="21" cy="28" r="2.5" fill="#262A5A"/><circle cx="31" cy="28" r="2.5" fill="#262A5A"/>
    <rect x="23" y="35" width="6" height="4" rx="1" fill="#3DAA4A"/>
    <path d="M47 18 38 35h6l-3 15 11-20h-6l3-12z" fill="#FFC845" stroke="#E0A21A" stroke-width="1.5" stroke-linejoin="round"/>`,

  lighting: `<circle cx="32" cy="32" r="28" fill="#FFF4D6"/>
    <path d="M32 4v16" stroke="#262A5A" stroke-width="2"/>
    <circle cx="32" cy="39" r="6" fill="#FFC845"/>
    <path d="M25 19h14l9 16H16z" fill="#3DAA4A"/><path d="M25 19h14l2 4H23z" fill="#2f8a3a"/>
    <path d="M32 49v6M22 45l-4 4M42 45l4 4" stroke="#FFC845" stroke-width="3" stroke-linecap="round"/>`,

  led: `<circle cx="32" cy="32" r="28" fill="#E8F6EA"/>
    <path d="M10 40c8-14 16-14 22 0s14 14 22 0" fill="none" stroke="#262A5A" stroke-width="8" stroke-linecap="round"/>
    <circle cx="13" cy="35" r="2.6" fill="#FFC845"/><circle cx="21" cy="30" r="2.6" fill="#3DAA4A"/>
    <circle cx="29" cy="35" r="2.6" fill="#7EC8F2"/><circle cx="35" cy="45" r="2.6" fill="#FFC845"/>
    <circle cx="43" cy="50" r="2.6" fill="#3DAA4A"/><circle cx="51" cy="45" r="2.6" fill="#7EC8F2"/>
    <path d="M21 22v-5M13 26l-3-3M29 26l3-3" stroke="#FFC845" stroke-width="2.5" stroke-linecap="round"/>`,

  panels: `<circle cx="32" cy="32" r="28" fill="#E6EEF8"/>
    <path d="M24 48v10M32 48v12M40 48v10" stroke-width="3" stroke-linecap="round" stroke="#FF8A4C"/>
    <path d="M32 48v12" stroke="#3DAA4A" stroke-width="3" stroke-linecap="round"/>
    <rect x="15" y="8" width="34" height="42" rx="4" fill="#9AA3B8"/>
    <rect x="19" y="12" width="26" height="34" rx="2" fill="#fff"/>
    <rect x="22" y="16" width="4" height="10" rx="1" fill="#3DAA4A"/><rect x="28" y="16" width="4" height="10" rx="1" fill="#3DAA4A"/>
    <rect x="34" y="16" width="4" height="10" rx="1" fill="#F2645A"/><rect x="40" y="16" width="3" height="10" rx="1" fill="#3DAA4A"/>
    <rect x="22" y="30" width="4" height="10" rx="1" fill="#262A5A"/><rect x="28" y="30" width="4" height="10" rx="1" fill="#FFC845"/>
    <rect x="34" y="30" width="4" height="10" rx="1" fill="#262A5A"/><rect x="40" y="30" width="3" height="10" rx="1" fill="#262A5A"/>`,

  cctv: `<circle cx="32" cy="32" r="28" fill="#E6EEF8"/>
    <rect x="46" y="14" width="8" height="22" rx="2" fill="#262A5A"/>
    <path d="M47 27 38 33" stroke="#262A5A" stroke-width="4" stroke-linecap="round"/>
    <g transform="rotate(15 26 29)">
      <rect x="10" y="22" width="32" height="14" rx="4" fill="#fff" stroke="#262A5A" stroke-width="2"/>
      <rect x="6" y="24" width="7" height="10" rx="2" fill="#262A5A"/>
      <circle cx="9.5" cy="29" r="2.6" fill="#7EC8F2"/><circle cx="37" cy="26.5" r="1.6" fill="#F2645A"/>
      <rect x="18" y="31" width="14" height="2" rx="1" fill="#E6EEF8"/>
    </g>`,

  alarm: `<circle cx="32" cy="32" r="28" fill="#FDE7E5"/>
    <path d="M12 22l-5-3M52 22l5-3M32 13V7" stroke="#F2645A" stroke-width="3" stroke-linecap="round"/>
    <path d="M20 45V33a12 12 0 0 1 24 0v12z" fill="#F2645A"/>
    <path d="M26 32a6 6 0 0 1 6-6" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round" opacity=".8"/>
    <rect x="15" y="44" width="34" height="7" rx="2" fill="#262A5A"/>`,

  access: `<circle cx="32" cy="32" r="28" fill="#E8F6EA"/>
    <rect x="14" y="8" width="24" height="44" rx="4" fill="#262A5A"/>
    <rect x="18" y="13" width="16" height="8" rx="1.5" fill="#7EC8F2"/>
    <g fill="#fff"><circle cx="21" cy="28" r="1.8"/><circle cx="26" cy="28" r="1.8"/><circle cx="31" cy="28" r="1.8"/>
    <circle cx="21" cy="34" r="1.8"/><circle cx="26" cy="34" r="1.8"/><circle cx="31" cy="34" r="1.8"/>
    <circle cx="21" cy="40" r="1.8"/><circle cx="26" cy="40" r="1.8"/><circle cx="31" cy="40" r="1.8"/></g>
    <circle cx="26" cy="47" r="1.8" fill="#3DAA4A"/>
    <g transform="rotate(-14 46 38)"><rect x="34" y="30" width="24" height="16" rx="3" fill="#3DAA4A"/>
    <rect x="34" y="34" width="24" height="3" fill="#2f8a3a"/><rect x="38" y="40" width="9" height="3" rx="1" fill="#fff"/></g>`,

  network: `<circle cx="32" cy="32" r="28" fill="#E6EEF8"/>
    <path d="M32 36V14M32 27 18 17M32 27l14-10" stroke="#262A5A" stroke-width="2"/>
    <circle cx="18" cy="16" r="5" fill="#7EC8F2"/><circle cx="32" cy="12" r="5" fill="#3DAA4A"/><circle cx="46" cy="16" r="5" fill="#FFC845"/>
    <rect x="9" y="35" width="46" height="15" rx="3" fill="#262A5A"/>
    <circle cx="15" cy="42.5" r="2" fill="#3DAA4A"/><circle cx="21" cy="42.5" r="2" fill="#FFC845"/>
    <rect x="33" y="40.5" width="17" height="4" rx="1" fill="#4A4F86"/>`,

  plumbing: `<circle cx="32" cy="32" r="28" fill="#E3F2FC"/>
    <path d="M6 22h22a8 8 0 0 1 8 8v8" fill="none" stroke="#9AA3B8" stroke-width="8"/>
    <rect x="29" y="36" width="14" height="5" rx="1" fill="#6E7691"/>
    <path d="M36 44s-5 6-5 9.5a5 5 0 0 0 10 0c0-3.5-5-9.5-5-9.5z" fill="#3FA9F5"/>
    <g transform="rotate(40 48 26)"><rect x="45" y="20" width="6" height="24" rx="3" fill="#FF8A4C"/>
    <circle cx="48" cy="17" r="7" fill="#FF8A4C"/><rect x="45.5" y="8" width="5" height="9" rx="1" fill="#E3F2FC"/></g>`,

  bathroom: `<circle cx="32" cy="32" r="28" fill="#E3F2FC"/>
    <path d="M13 30V17a4 4 0 0 1 8 0" fill="none" stroke="#9AA3B8" stroke-width="3" stroke-linecap="round"/>
    <circle cx="27" cy="24" r="4" fill="#7EC8F2"/><circle cx="35" cy="21" r="3" fill="#7EC8F2"/><circle cx="43" cy="25" r="4.5" fill="#7EC8F2"/>
    <circle cx="34" cy="27" r="2" fill="#fff"/>
    <path d="M18 48l-2 6M46 48l2 6" stroke="#262A5A" stroke-width="3" stroke-linecap="round"/>
    <path d="M10 33h44v5a11 11 0 0 1-11 11H21a11 11 0 0 1-11-11z" fill="#fff" stroke="#262A5A" stroke-width="2"/>
    <rect x="7" y="29" width="50" height="5" rx="2.5" fill="#262A5A"/>`,

  heater: `<circle cx="32" cy="32" r="28" fill="#FFEDE3"/>
    <path d="M25 50v5h-6M39 50v5h6" fill="none" stroke-width="3" stroke-linecap="round" stroke="#9AA3B8"/>
    <rect x="18" y="7" width="28" height="44" rx="11" fill="#fff" stroke="#262A5A" stroke-width="2"/>
    <rect x="25" y="15" width="14" height="6" rx="2" fill="#262A5A"/><circle cx="35" cy="18" r="1.4" fill="#3DAA4A"/>
    <circle cx="32" cy="36" r="8" fill="#FFD9C7"/>
    <path d="M32 29c3 3 5 5 5 8.5a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3-.8-2.5 0-4.8 1-7z" fill="#FF8A4C"/>`,

  tiles: `<circle cx="32" cy="32" r="28" fill="#F3ECE4"/>
    <path d="M10 32v5l22 12 22-12v-5L32 44z" fill="#9C6A43"/>
    <path d="M32 20l11 6-11 6-11-6z" fill="#E6B98F"/><path d="M43 26l11 6-11 6-11-6z" fill="#C98B5A"/>
    <path d="M32 32l11 6-11 6-11-6z" fill="#E6B98F"/><path d="M21 26l11 6-11 6-11-6z" fill="#C98B5A"/>
    <path d="M38 8l12 7-7 4z" fill="#3DAA4A"/><path d="M44 12l6-6" stroke="#262A5A" stroke-width="3" stroke-linecap="round"/>`,

  painting: `<circle cx="32" cy="32" r="28" fill="#E8F6EA"/>
    <rect x="6" y="14" width="34" height="12" rx="6" fill="#3DAA4A" opacity=".55"/>
    <path d="M56 19h3v11H45v8" fill="none" stroke="#262A5A" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="34" y="12" width="22" height="13" rx="5" fill="#3DAA4A" stroke="#262A5A" stroke-width="2"/>
    <rect x="42" y="37" width="6" height="16" rx="3" fill="#FF8A4C"/>
    <rect x="10" y="36" width="22" height="19" rx="2" fill="#9AA3B8"/><rect x="10" y="36" width="22" height="6" rx="2" fill="#3DAA4A"/>
    <path d="M14 42v4" stroke="#3DAA4A" stroke-width="3" stroke-linecap="round"/>`,

  wall: `<circle cx="32" cy="32" r="28" fill="#FDE7E5"/>
    <g fill="#F2876B"><rect x="8" y="14" width="22" height="9" rx="1.5"/><rect x="32" y="14" width="22" height="9" rx="1.5"/>
    <rect x="8" y="25" width="10" height="9" rx="1.5"/><rect x="20" y="25" width="22" height="9" rx="1.5"/><rect x="44" y="25" width="10" height="9" rx="1.5"/>
    <rect x="8" y="36" width="22" height="9" rx="1.5"/><rect x="32" y="36" width="22" height="9" rx="1.5"/></g>
    <path d="M27 14l-3 8 4 4-3 7 3 5" fill="none" stroke="#262A5A" stroke-width="2" stroke-linejoin="round"/>
    <ellipse cx="38" cy="50" rx="9" ry="3.5" fill="#fff"/>
    <path d="M36 44l12-7 5 8-12 7z" fill="#9AA3B8"/><path d="M51 40l7-4" stroke="#FF8A4C" stroke-width="4" stroke-linecap="round"/>`,

  handyman: `<circle cx="32" cy="32" r="28" fill="#FFF4D6"/>
    <g transform="rotate(20 42 20)"><rect x="40" y="10" width="4" height="22" rx="2" fill="#C98B5A"/>
    <rect x="35" y="7" width="14" height="6" rx="1.5" fill="#262A5A"/></g>
    <g transform="rotate(-15 20 22)"><rect x="18.5" y="16" width="3" height="16" fill="#9AA3B8"/>
    <rect x="17" y="10" width="6" height="9" rx="2" fill="#3DAA4A"/></g>
    <path d="M24 29v-6h16v6" fill="none" stroke="#262A5A" stroke-width="3" stroke-linejoin="round"/>
    <rect x="9" y="29" width="46" height="22" rx="3" fill="#F2645A"/><rect x="9" y="35" width="46" height="3" fill="#D04A41"/>
    <rect x="29" y="33" width="6" height="6" rx="1" fill="#FFC845"/>`,

  equipment: `<circle cx="32" cy="32" r="28" fill="#E8F6EA"/>
    <path d="M1 28h4M0 34h5" stroke="#3DAA4A" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="7" y="20" width="32" height="22" rx="2" fill="#3DAA4A"/>
    <rect x="16" y="25" width="12" height="12" rx="1" fill="#FFC845"/><path d="M22 25v12" stroke="#E0A21A" stroke-width="2"/>
    <path d="M39 27h9l8 8v7H39z" fill="#262A5A"/><path d="M42 30h5l5 5H42z" fill="#7EC8F2"/>
    <circle cx="17" cy="44" r="5.5" fill="#262A5A"/><circle cx="17" cy="44" r="2" fill="#fff"/>
    <circle cx="47" cy="44" r="5.5" fill="#262A5A"/><circle cx="47" cy="44" r="2" fill="#fff"/>`,

  wholesale: `<circle cx="32" cy="32" r="28" fill="#F3ECE4"/>
    <g fill="#E6B98F" stroke="#9C6A43" stroke-width="1.5"><rect x="9" y="31" width="22" height="16" rx="1"/>
    <rect x="33" y="31" width="22" height="16" rx="1"/><rect x="21" y="14" width="22" height="16" rx="1"/></g>
    <path d="M20 31v6M44 31v6M32 14v6" stroke="#9C6A43" stroke-width="3"/>
    <rect x="12" y="41" width="7" height="3" fill="#fff"/><rect x="36" y="41" width="7" height="3" fill="#fff"/><rect x="24" y="24" width="7" height="3" fill="#fff"/>
    <rect x="8" y="48" width="48" height="4" rx="1" fill="#C98B5A"/>
    <g fill="#9C6A43"><rect x="10" y="52" width="5" height="4"/><rect x="29.5" y="52" width="5" height="4"/><rect x="49" y="52" width="5" height="4"/></g>`,

  online: `<circle cx="32" cy="32" r="28" fill="#E6EEF8"/>
    <rect x="17" y="5" width="28" height="52" rx="5" fill="#262A5A"/>
    <rect x="20" y="11" width="22" height="38" rx="2" fill="#fff"/>
    <path d="M23 21h3l3 11h9l2.5-8H27.5" fill="none" stroke="#3DAA4A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="30" cy="36" r="1.7" fill="#3DAA4A"/><circle cx="37" cy="36" r="1.7" fill="#3DAA4A"/>
    <rect x="23" y="41" width="16" height="4" rx="2" fill="#3DAA4A"/>
    <circle cx="46" cy="14" r="7.5" fill="#FF8A4C"/><path d="M42.5 14l2.5 2.5 4.5-5" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`,

  guarantee: `<path d="M32 4 54 12v16c0 14-9.5 24-22 31C19.5 52 10 42 10 28V12z" fill="#3DAA4A"/>
    <path d="M32 4 54 12v16c0 14-9.5 24-22 31z" fill="#2f8a3a"/>
    <path d="m22 31 7 7 13-14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`,
};

const art = (id, cls = '') => `<svg class="art ${cls}" viewBox="0 0 64 64" aria-hidden="true">${ART[id] || ''}</svg>`;
