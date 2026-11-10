/**
 * Bài 14 "What's the Weather Like?": một dải bản đồ thời tiết đi từ trái sang phải:
 * Hà Nội (nắng, nóng, vườn nhà Minh) · Sydney (Tom, lạnh, gió) · Nam Định (mưa, nhà ông bà, vườn rau) ·
 * Đà Lạt (nhiều mây, mát, đi dạo bên hồ) · Sa Pa (rất lạnh, tuyết) · cửa sổ "And you?" (Lan hỏi bé).
 * Toạ độ cảnh: rộng 2860, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, cloud, tree, bush, flowerAt, grass, fence, water, label, sun } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  // Tom ở Sydney đang lạnh: áo khoác, quần dài (cùng tóc với Tom)
  e014_tom: { hair: 'neat', hairC: '#E0A33A', top: 'jacket', shirt: '#2563EB', inner: '#F8FAFC', bottom: 'pants', bottomC: '#334155', shoe: '#16A34A' },
  e014_man: { adult: true, hair: 'short', top: 'jacket', shirt: '#A16207', inner: '#FDE68A', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
  e014_girl: { hair: 'bob', top: 'jacket', shirt: '#EC4899', inner: '#FFFFFF', bottom: 'pants', bottomC: '#7C3AED', shoe: '#F472B6' },
});

// ── Đồ vật nhỏ ────────────────────────────────────────────────────────────
const sky = (x, w, top, bot, id) => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs>
  <rect x="${x}" y="0" width="${w}" height="315" fill="url(#${id})"/>`;
const darkCloud = (x, y, s = 1, c = '#94A3B8') => `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="46" ry="17" fill="${c}" stroke="${L}" stroke-width="0.8"/><ellipse cx="-20" cy="-11" rx="21" ry="15" fill="${c}" stroke="${L}" stroke-width="0.8"/><ellipse cx="16" cy="-15" rx="24" ry="18" fill="${c}" stroke="${L}" stroke-width="0.8"/><ellipse cx="0" cy="2" rx="44" ry="13" fill="${c}"/></g>`;
/** Biểu tượng thời tiết tự vẽ (gốc ở giữa, cỡ ~ 2r). */
const ico = (k, r = 10) => ({
  sun: `<circle r="${r * 0.55}" fill="#FDE047" stroke="#F59E0B" stroke-width="1.2"/>${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${-r * 0.75} V${-r}" stroke="#F59E0B" stroke-width="${r * 0.16}" stroke-linecap="round" transform="rotate(${i * 45})"/>`).join('')}`,
  cloud: `<g transform="scale(${r / 30})"><ellipse cx="0" cy="6" rx="26" ry="11" fill="#fff" stroke="${L}" stroke-width="1.6"/><circle cx="-8" cy="-2" r="11" fill="#fff" stroke="${L}" stroke-width="1.6"/><circle cx="8" cy="-6" r="13" fill="#fff" stroke="${L}" stroke-width="1.6"/><ellipse cx="0" cy="7" rx="24" ry="9" fill="#fff"/></g>`,
  rain: `<g transform="scale(${r / 30})"><ellipse cx="0" cy="-2" rx="26" ry="11" fill="#94A3B8" stroke="${L}" stroke-width="1.6"/><circle cx="-8" cy="-10" r="11" fill="#94A3B8" stroke="${L}" stroke-width="1.6"/><circle cx="8" cy="-14" r="13" fill="#94A3B8" stroke="${L}" stroke-width="1.6"/><ellipse cx="0" cy="-1" rx="24" ry="9" fill="#94A3B8"/>${[-14, 0, 14].map((x) => `<path d="M${x} 14 l-4 12" stroke="#3B82F6" stroke-width="4" stroke-linecap="round"/>`).join('')}</g>`,
  wind: `<g transform="scale(${r / 30})" fill="none" stroke="#0EA5E9" stroke-width="5" stroke-linecap="round"><path d="M-26 -10 H10 q12 0 12 -10 q0 -9 -9 -9"/><path d="M-26 4 H20 q10 0 10 9 q0 9 -9 9"/><path d="M-20 18 H2"/></g>`,
  snow: `<g stroke="#60A5FA" stroke-width="${r * 0.18}" stroke-linecap="round">${[0, 60, 120].map((a) => `<path d="M0 ${-r} V${r} M-${r * 0.3} ${-r * 0.7} L0 ${-r * 0.45} L${r * 0.3} ${-r * 0.7}" transform="rotate(${a})"/>`).join('')}</g>`,
})[k];
/** Biển tên nơi chốn (cọc + bảng + biểu tượng thời tiết). */
const placeSign = (x, name, icon, c) => `<g class="e014-sign e014-s-${name.replace(/\s/g, '')}" transform="translate(${x} 0)"><rect x="-3" y="196" width="6" height="${FLOOR - 196}" fill="#A16207" stroke="${L}" stroke-width="0.8"/>
  <rect x="-${name.length * 6 + 22}" y="170" width="${name.length * 12 + 44}" height="30" rx="7" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <g transform="translate(-${name.length * 6 + 2} 185)">${ico(icon, 10)}</g>
  <text x="12" y="191" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="16" fill="${c}">${name}</text></g>`;
/** Nhiệt kế: cột đỏ cao h (0..1) theo class. */
const thermo = (x, y, cls) => `<g transform="translate(${x} ${y})"><rect x="-9" y="-62" width="18" height="70" rx="9" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <circle cy="8" r="11" fill="#EF4444" stroke="${L}" stroke-width="1.2"/><g class="${cls}" style="transform-origin:0px 4px"><rect x="-4" y="-50" width="8" height="54" rx="4" fill="#EF4444"/></g>
  ${[-44, -32, -20, -8].map((t) => `<path d="M5 ${t} h4" stroke="${L}" stroke-width="0.8"/>`).join('')}</g>`;
/** Mưa / tuyết: các vệt rơi lặp trong vùng (x, w). */
const rain = (x, w, top, cls) => `<g class="${cls}">${Array.from({ length: Math.floor(w / 16) }, (_, i) => `<path class="e014-drop" style="animation-delay:${((i * 37) % 10) / 10 * -0.7}s" d="M${x + i * 16 + (i % 3) * 5} ${top + (i * 29) % 60} l-5 14" stroke="#60A5FA" stroke-width="2.4" stroke-linecap="round"/>`).join('')}</g>`;
const snow = (x, w, top, cls) => `<g class="${cls}">${Array.from({ length: Math.floor(w / 20) }, (_, i) => `<g class="e014-flake" style="animation-delay:${((i * 53) % 17) / 17 * -3}s"><circle cx="${x + i * 20 + (i % 4) * 4}" cy="${top + (i * 41) % 80}" r="${2.4 + (i % 3)}" fill="#fff" stroke="#BAE6FD" stroke-width="0.6"/></g>`).join('')}</g>`;
const wind = (x, y, w, d) => `<path class="e014-gust" style="animation-delay:${d}s" d="M${x} ${y} h${w * 0.7} q${w * 0.2} 0 ${w * 0.2} -10 q0 -8 -8 -8" stroke="#F8FAFC" stroke-width="4.5" fill="none" stroke-linecap="round"/>`;
const pine = (x, s = 1) => `<g transform="translate(${x} ${FLOOR - 6}) scale(${s})"><rect x="-5" y="-26" width="10" height="26" fill="#92400E" stroke="${L}"/>
  <g class="ek-sway" style="transform-origin:0 -26px"><path d="M0 -130 L28 -84 H14 L36 -50 H18 L42 -22 H-42 L-18 -50 H-36 L-14 -84 H-28Z" fill="#15803D" stroke="${L}"/></g></g>`;
const cabbage = (x, i) => `<g transform="translate(${x} ${FLOOR - 4})"><g class="e014-veg" style="transition-delay:${i * 0.12}s"><path d="M0 0 q-16 -4 -14 -18 q2 -10 14 -10 q12 0 14 10 q2 14 -14 18Z" fill="#4ADE80" stroke="${L}" stroke-width="0.9"/><path d="M0 -2 V-24 M0 -12 l-8 -6 M0 -12 l8 -6" stroke="#15803D" stroke-width="1"/></g></g>`;
const tag = (n, x, y, text, c, size = 18) => `<g class="e014-tag e014-t-${n}">${label(x, y, text, c, size)}</g>`;
const TAGS = ['q', 'sunny', 'hot', 'garden', 'sydq', 'cold', 'windy', 'rainy', 'home', 'good', 'cloudy2', 'walk', 'vcold', 'you'];

function bg() {
  return `
  <!-- Hà Nội: nắng -->
  ${sky(0, 580, '#38BDF8', '#E0F2FE', 'e014sk1')}
  <g transform="translate(330 92)"><g class="e014-hsun">${sun(30)}</g></g>
  <g class="e014-hcloud">${cloud(336, 92, 1.5, 0)}</g>
  ${cloud(120, 50, 0.8, 2)}
  <!-- Sydney: lạnh, gió -->
  ${sky(560, 480, '#94A3B8', '#E2E8F0', 'e014sk2')}
  ${darkCloud(700, 70, 0.9, '#CBD5E1')}${darkCloud(930, 56, 1.1, '#CBD5E1')}
  <!-- Nam Định: mưa -->
  ${sky(1040, 540, '#64748B', '#CBD5E1', 'e014sk3')}
  <!-- Đà Lạt: mây, mát -->
  ${sky(1580, 460, '#7DD3FC', '#F0F9FF', 'e014sk4')}
  <g transform="translate(1800 84)"><g class="e014-dsun">${sun(24)}</g></g>
  <!-- Sa Pa: rất lạnh -->
  ${sky(2040, 440, '#A5B4FC', '#EEF2FF', 'e014sk5')}
  <path d="M2040 220 L2120 110 L2170 160 L2250 70 L2340 170 L2400 120 L2480 200 V250 H2040Z" fill="#94A3B8" stroke="${L}"/>
  <g class="e014-frost"><path d="M2104 132 L2120 110 L2136 132 L2126 128 L2118 136 L2110 128Z M2228 100 L2250 70 L2272 100 L2260 96 L2250 106 L2240 96Z M2386 140 L2400 120 L2414 140 L2404 136 L2398 144Z" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>
  <!-- Phòng "And you?" -->
  <rect x="2480" y="0" width="380" height="${FLOOR}" fill="#FEF3C7"/><rect x="2480" y="${FLOOR}" width="380" height="${315 - FLOOR}" fill="#D9A066" stroke="${L}"/>
  ${Array.from({ length: 7 }, (_, i) => `<path d="M${2480 + i * 60} ${FLOOR} V315" stroke="#B9824F" stroke-width="1.2"/>`).join('')}

  <!-- Mặt đất từng vùng -->
  ${grass(0, 580, FLOOR)}
  <rect x="0" y="40" width="120" height="${FLOOR - 40}" fill="#FDE68A" stroke="${L}"/><path d="M-10 52 L130 40 V56 L-10 66Z" fill="#EF4444" stroke="${L}"/>
  <rect x="24" y="120" width="56" height="60" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M52 120 V180 M24 150 H80" stroke="#fff" stroke-width="2.4"/>
  <rect x="34" y="200" width="44" height="${FLOOR - 200}" rx="3" fill="#B45309" stroke="${L}"/>
  ${thermo(100, 150, 'e014-th1')}
  ${fence(150, 400, FLOOR)}
  ${tree(470, FLOOR - 6, 1.15)}
  ${[300, 330, 360, 390, 420].map((x, i) => flowerAt(x, FLOOR - 4, ['#F472B6', '#FACC15', '#F87171', '#A78BFA', '#FB923C'][i])).join('')}
  ${placeSign(150, 'HA NOI', 'sun', '#EA580C')}
  ${water(560, 480, 214, '#7DD3FC')}
  <g transform="translate(860 214)"><path d="M-70 0 Q-60 -54 -10 -60 Q-34 -30 -30 0Z M-36 0 Q-20 -64 30 -70 Q4 -34 6 0Z M2 0 Q24 -50 66 -50 Q44 -24 48 0Z" fill="#F8FAFC" stroke="${L}"/><rect x="-80" y="0" width="160" height="10" fill="#E2E8F0" stroke="${L}"/></g>
  ${grass(560, 480, FLOOR, '#A7C4A0')}
  <g transform="translate(980 ${FLOOR - 6})"><rect x="-6" y="-60" width="12" height="60" rx="3" fill="#A16207" stroke="${L}"/>
    <g class="e014-bend"><circle cx="0" cy="-86" r="32" fill="#16A34A" stroke="${L}"/><circle cx="-20" cy="-70" r="18" fill="#15803D" stroke="${L}"/><circle cx="20" cy="-72" r="20" fill="#22C55E" stroke="${L}"/></g></g>
  <g class="e014-wind">${wind(600, 110, 120, 0)}${wind(760, 150, 140, -0.6)}${wind(620, 196, 110, -1.1)}${wind(880, 100, 100, -0.3)}${wind(840, 240, 120, -0.9)}
    ${[0, 1, 2, 3].map((i) => `<g class="e014-leaf" style="animation-delay:${-i * 0.45}s"><ellipse cx="${640 + i * 30}" cy="${130 + (i % 2) * 50}" rx="5" ry="2.6" fill="#22C55E" stroke="${L}" stroke-width="0.5"/></g>`).join('')}</g>
  ${placeSign(800, 'SYDNEY', 'wind', '#2563EB')}
  ${grass(1040, 540, FLOOR, '#65A30D')}
  <!-- nhà ông bà -->
  <g transform="translate(1290 0)"><rect x="-130" y="108" width="260" height="${FLOOR - 108}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/>
    <path d="M-160 114 L-112 44 H112 L160 114Z" fill="#B91C1C" stroke="${L}" stroke-width="1.2"/>${[-110, -80, -50, -20, 10, 40, 70, 100].map((x) => `<path d="M${x} 52 L${x - 16} 112" stroke="#7F1D1D" stroke-width="1"/>`).join('')}
    <rect x="-122" y="128" width="244" height="154" fill="#FEF3C7" stroke="${L}"/>
    <rect x="-108" y="146" width="46" height="50" fill="#BAE6FD" stroke="${L}"/><path d="M-85 146 V196 M-108 171 H-62" stroke="#fff" stroke-width="2"/>
    <rect x="62" y="146" width="46" height="50" fill="#BAE6FD" stroke="${L}"/><path d="M85 146 V196 M62 171 H108" stroke="#fff" stroke-width="2"/>
    <rect x="-30" y="166" width="60" height="116" rx="3" fill="#92400E" stroke="${L}"/></g>
  ${[1440, 1470, 1500, 1530, 1560].map(cabbage).join('')}
  ${placeSign(1090, 'NAM DINH', 'rain', '#475569')}
  <g class="e014-ncloud">${darkCloud(1120, 62, 1.1)}${darkCloud(1300, 50, 1.4)}${darkCloud(1490, 66, 1.1)}</g>
  ${rain(1050, 520, 80, 'e014-rain')}
  <g class="e014-puddle"><ellipse cx="1180" cy="${FLOOR + 6}" rx="40" ry="5" fill="#93C5FD" stroke="${L}" stroke-width="0.6"/><ellipse cx="1480" cy="${FLOOR + 10}" rx="34" ry="4" fill="#93C5FD" stroke="${L}" stroke-width="0.6"/></g>
  ${water(1660, 260, 226, '#38BDF8')}
  ${grass(1580, 80, FLOOR, '#86EFAC')}${grass(1920, 120, FLOOR, '#86EFAC')}
  <rect x="1580" y="270" width="460" height="45" fill="#D6D3D1" stroke="${L}"/>${Array.from({ length: 12 }, (_, i) => `<path d="M${1600 + i * 38} 272 v40" stroke="#A8A29E" stroke-width="1"/>`).join('')}
  ${pine(1610, 1.1)}${pine(1960, 1)}${pine(2010, 0.8)}
  ${[1630, 1650, 1940, 1980].map((x, i) => flowerAt(x, 270, ['#C084FC', '#F472B6', '#FACC15', '#F87171'][i])).join('')}
  ${placeSign(1660, 'DA LAT', 'cloud', '#0369A1')}
  <g class="e014-dcloud">${cloud(1770, 92, 1.7, 0)}${cloud(1850, 74, 1.4, 3)}${cloud(1960, 100, 1.1, 5)}</g>
  <rect x="2040" y="246" width="440" height="69" fill="#F8FAFC" stroke="${L}"/>
  <path d="M2040 246 Q2120 236 2200 246 T2360 244 T2480 246" fill="none" stroke="#CBD5E1" stroke-width="3"/>
  ${[2080, 2420].map((x) => `<g transform="translate(${x} ${FLOOR - 4})"><rect x="-4" y="-24" width="8" height="24" fill="#92400E" stroke="${L}"/><path d="M0 -94 L24 -56 H12 L30 -24 H-30 L-12 -56 H-24Z" fill="#166534" stroke="${L}"/><path d="M0 -94 L12 -74 H-12Z M-14 -54 H14 L20 -40 H-20Z" fill="#fff"/></g>`).join('')}
  ${thermo(2380, 200, 'e014-th2')}
  ${placeSign(2150, 'SA PA', 'snow', '#4F46E5')}
  ${snow(2040, 440, 40, 'e014-snow')}
  <!-- cửa sổ thời tiết của bé -->
  <rect x="2610" y="56" width="200" height="160" rx="6" fill="#fff" stroke="${L}" stroke-width="1.6"/>
  <rect x="2620" y="66" width="180" height="140" fill="#E0F2FE"/>
  <g class="e014-cycle">${['sun', 'rain', 'cloud', 'wind', 'snow'].map((e, i) => `<g class="e014-ic e014-ic${i}" transform="translate(2710 136)">${ico(e, 46)}</g>`).join('')}</g>
  <path d="M2710 66 V206 M2620 136 H2800" stroke="#fff" stroke-width="3" opacity="0.7"/>
  <rect x="2604" y="210" width="212" height="10" rx="3" fill="#A16207" stroke="${L}"/>
  <g transform="translate(2830 ${FLOOR})"><rect x="-12" y="-30" width="24" height="30" rx="3" fill="#F97316" stroke="${L}"/><path d="M0 -30 q-22 -20 -10 -46 q8 14 10 30 q4 -26 16 -36 q8 26 -16 52Z" fill="#22C55E" stroke="${L}"/></g>
  <!-- nhãn chữ -->
  ${tag('q', 250, 120, '?', '#7C3AED', 36)}
  ${tag('sunny', 420, 74, 'sunny', '#EA580C', 22)}
  ${tag('hot', 100, 72, 'hot', '#DC2626', 22)}
  ${tag('garden', 400, 150, 'garden', '#16A34A', 20)}
  ${tag('sydq', 680, 150, '?', '#7C3AED', 30)}
  ${tag('cold', 790, 104, 'cold', '#2563EB', 22)}${tag('windy', 920, 146, 'windy', '#0369A1', 22)}
  ${tag('rainy', 1200, 96, 'rainy', '#1D4ED8', 22)}
  ${tag('home', 1290, 104, 'at home', '#B91C1C', 18)}
  ${tag('good', 1500, 200, 'good', '#16A34A', 20)}
  ${tag('cloudy2', 1800, 140, 'cloudy and cool', '#0369A1', 18)}
  ${tag('walk', 1760, 120, 'a walk', '#16A34A', 20)}
  ${tag('vcold', 2250, 140, 'very cold!', '#4F46E5', 22)}
  ${tag('you', 2710, 254, 'And you?', '#DB2777', 20)}`;
}

/** Lớp trước: mái hiên che mưa trước cửa nhà ông bà, bông lau. */
function fg() {
  return `<path d="M1140 112 H1440 L1452 124 H1128Z" fill="#7F1D1D" stroke="${L}"/>${bush(1060, FLOOR + 30, 1.1, '#4D7C0F')}${bush(1110, FLOOR + 32, 0.8, '#65A30D')}`;
}

const CSS = `
.e014-tag { opacity: 0; transform: scale(.6); transition: opacity .35s, transform .35s cubic-bezier(.3,1.6,.6,1); transform-box: fill-box; transform-origin: center; }
${TAGS.map((n) => `.st-${n} .e014-t-${n}`).join(', ')} { opacity: 1; transform: none; }
.e014-sign { transform-box: fill-box; transform-origin: 50% 100%; }
${['HANOI', 'SYDNEY', 'NAMDINH', 'DALAT', 'SAPA'].map((n) => `.st-p${n} .e014-s-${n}`).join(', ')} { animation: e014Pop .45s ease-in-out 2 alternate; }
@keyframes e014Pop { to { transform: scale(1.15); } }
.e014-hcloud { transition: transform 1.4s cubic-bezier(.4,0,.2,1); }
.st-sun .e014-hcloud { transform: translateX(-210px); }
.e014-hsun { transform-box: fill-box; transform-origin: center; transition: transform 1s; } .st-sun .e014-hsun { transform: scale(1.2); }
.e014-th1, .e014-th2 { transition: transform 1.4s cubic-bezier(.4,0,.2,1); }
.e014-th1 { transform: scaleY(.55); } .st-heat .e014-th1 { transform: scaleY(1); }
.e014-th2 { transform: scaleY(.4); } .st-snow .e014-th2 { transform: scaleY(.08); }
.e014-wind { opacity: 0; transition: opacity .6s; } .st-wind .e014-wind { opacity: 1; }
.e014-gust { stroke-dasharray: 60 400; animation: e014Gust 1.4s linear infinite; }
@keyframes e014Gust { from { stroke-dashoffset: 60; } to { stroke-dashoffset: -340; } }
.e014-leaf { animation: e014Leaf 1.8s linear infinite; }
@keyframes e014Leaf { from { transform: translate(-30px, 0) rotate(0); opacity: 0; } 20% { opacity: 1; } to { transform: translate(260px, 30px) rotate(540deg); opacity: 0; } }
.e014-bend { transform-origin: 0 -60px; animation: ekSway 3.6s ease-in-out infinite alternate; }
.st-wind .e014-bend { animation: e014Bend .5s ease-in-out infinite alternate; }
@keyframes e014Bend { from { transform: rotate(6deg); } to { transform: rotate(14deg); } }
.e014-rain { opacity: 0; transition: opacity .6s; } .st-rain .e014-rain { opacity: 1; }
.e014-drop { animation: e014Drop .7s linear infinite; }
@keyframes e014Drop { from { transform: translate(0, -40px); } to { transform: translate(-14px, 160px); } }
.e014-puddle { opacity: 0; transition: opacity 1s; } .st-rain .e014-puddle { opacity: 1; }
.e014-veg { transform-origin: 0 0; transform: scale(.55); transition: transform 1.2s cubic-bezier(.3,1.4,.6,1); } .st-grow .e014-veg { transform: scale(1.15); }
.e014-dcloud { transform: translateX(-190px); opacity: .7; transition: transform 1.8s cubic-bezier(.4,0,.2,1), opacity 1s; }
.st-cloudy .e014-dcloud { transform: translateX(0); opacity: 1; }
.e014-snow { opacity: 0; transition: opacity .8s; } .st-snow .e014-snow { opacity: 1; }
.e014-flake { animation: e014Flake 3s linear infinite; }
@keyframes e014Flake { from { transform: translate(0, -60px); } 50% { transform: translate(8px, 60px); } to { transform: translate(-4px, 200px); } }
.e014-frost { opacity: .6; transition: opacity 1s; } .st-snow .e014-frost { opacity: 1; }
.e014-ic { opacity: 0; } .e014-ic0 { opacity: 1; }
.st-cycle .e014-ic { animation: e014Ic 5s steps(1) infinite; opacity: 0; }
${[0, 1, 2, 3, 4].map((i) => `.st-cycle .e014-ic${i} { animation-delay: ${-5 + i}s; }`).join('\n')}
@keyframes e014Ic { 0% { opacity: 1; } 20%, 100% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .e014-drop { animation-duration: 1.4s; } .e014-flake { animation-duration: 6s; } .e014-gust, .e014-leaf { animation-duration: 3s; } }
`;

const BEATS = [
  { key: ["What's the weather like today"], icon: '❓', label: 'weather', async play(st) {
    st.look(250);
    st.pose('minh', 'think'); st.set('st-q');
    await st.wait(2000);
    st.set('st-q', false); st.pose('minh', 'stand');
  } },
  { key: ["It's sunny"], icon: '☀️', label: 'sunny', async play(st) {
    st.set('st-sun'); st.set('st-pHANOI'); st.sfx('sparkle');
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    await st.wait(700);
    st.set('st-sunny');
    await st.wait(1300);
    st.set('st-sunny', false); st.set('st-pHANOI', false);
    st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ["It's hot"], icon: '🌡️', label: 'hot', async play(st) {
    st.look(220, { dur: 600 });
    st.set('st-heat'); st.set('st-hot');
    st.pose('minh', 'e014_fan'); st.act('minh', 'wave'); st.mood('minh', 'shut');
    st.mood('lucky', 'joy');
    await st.wait(500);
    st.fx('drops', st.a('minh').x, 150);
    await st.wait(700);
        await st.wait(600);
    st.set('st-hot', false);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
  } },
  { key: ['in the garden'], icon: '🌻', label: 'garden', async play(st) {
    st.dog('lucky', 'stand');
    await Promise.all([
      st.walk('minh', 370, { speed: 110 }),
      (async () => { await st.wait(200); await st.walk('lucky', 300, { speed: 80, follow: false }); })(),
    ]);
    st.act('lucky', 'wag'); st.dog('lucky', 'sit');
    st.pose('minh', 'open'); st.set('st-garden');
    st.fx('sparkle', 360, 250);
    await st.wait(1300);
    st.set('st-garden', false); st.pose('minh', 'stand');
  } },
  { key: ['Tom is on the phone'], icon: '📱', label: 'on the phone', async play(st) {
    await st.look(590);
    st.hold('tom', 'phone'); st.pose('tom', 'phone'); st.mood('tom', 'joy');
    st.set('st-call');
    await st.wait(500);
    await st.walk('minh', 480, { speed: 120, follow: false });
    st.hold('minh', 'phone'); st.pose('minh', 'phone'); st.mood('minh', 'joy');
    await st.wait(700);
  } },
  { key: ["What's the weather like in Sydney"], icon: '🇦🇺', label: 'in Sydney?', async play(st) {
    st.set('st-pSYDNEY');
    st.say('minh', 'Weather in Sydney?', 2200);
    await st.wait(600);
    st.set('st-sydq');
    await st.wait(1700);
    st.set('st-sydq', false); st.set('st-pSYDNEY', false);
  } },
  { key: ["It's cold and windy here"], icon: '🌬️', label: 'cold and windy', async play(st) {
    await st.look(760, { dur: 700 });
    st.set('st-wind');
    st.act('tom', 'shiver'); st.mood('tom', 'shut');
    st.say('tom', 'Brrr!', 1800);
    await st.wait(600);
    st.set('st-cold');
    await st.wait(600);
    st.set('st-windy');
    await st.wait(1000);
    st.set('st-cold', false); st.set('st-windy', false);
    st.mood('tom', 'happy');
  } },
  { key: ["it's rainy"], icon: '🌧️', label: 'rainy', async play(st) {
    st.act('tom', null);
    await st.look(1300, { dur: 1300 });
    st.set('st-rain'); st.set('st-pNAMDINH'); st.sfx('tap-water', { vol: 0.5 });
    await st.wait(500);
    st.set('st-rainy');
    await st.wait(1200);
    st.set('st-rainy', false); st.set('st-pNAMDINH', false);
  } },
  { key: ['at home'], icon: '🏠', label: 'at home', async play(st) {
    st.set('st-home');
    st.pose('grandpa', 'wave'); st.act('grandpa', 'wave');
    st.pose('grandma', 'wave'); st.act('grandma', 'wave');
    await st.wait(2000);
    st.act('grandpa', null); st.act('grandma', null); st.pose('grandpa', 'stand'); st.pose('grandma', 'stand');
    st.set('st-home', false);
  } },
  { key: ['Grandpa is happy'], icon: '😄', label: 'happy', async play(st) {
    st.pose('grandpa', 'cheer'); st.act('grandpa', 'hop'); st.mood('grandpa', 'joy');
    st.fx('hearts', 1250, 120);
    await st.say('grandpa', 'Rain! Good!', 1700);
    st.act('grandpa', null); st.pose('grandpa', 'stand');
  } },
  { key: ['good for the garden'], icon: '🥬', label: 'good for the garden', async play(st) {
    await st.look(1420, { dur: 700 });
    st.pose('grandma', 'point'); st.mood('grandma', 'joy');
    st.set('st-grow'); st.sfx('sparkle');
    st.fx('drops', 1470, 230); st.fx('drops', 1530, 230);
    await st.wait(900);
    st.set('st-good'); st.fx('sparkle', 1500, 250, { quiet: true });
    await st.wait(1100);
    st.set('st-good', false); st.pose('grandma', 'stand');
  } },
  { key: ["it's cloudy and cool"], icon: '☁️', label: 'cloudy and cool', async play(st) {
    await st.look(1790, { dur: 1300 });
    st.set('st-cloudy'); st.set('st-pDALAT');
    await st.wait(900);
    st.set('st-cloudy2');
    await st.wait(1200);
    st.set('st-cloudy2', false); st.set('st-pDALAT', false);
  } },
  { key: ['a nice day for a walk'], icon: '🚶', label: 'a walk', async play(st) {
    st.sfx('birds', { vol: 0.6 });
    await Promise.all([
      st.walk('man', 1720, { speed: 100, follow: false }),
      (async () => { await st.wait(250); await st.walk('girl', 1790, { speed: 100, follow: false }); })(),
    ]);
    st.set('st-walk');
    st.pose('man', 'wave'); st.pose('girl', 'cheer'); st.mood('girl', 'joy'); st.mood('man', 'joy');
    await st.wait(1000);
    st.set('st-walk', false); st.pose('man', 'stand'); st.pose('girl', 'stand');
  } },
  { key: ['very cold'], icon: '❄️', label: 'very cold', async play(st) {
    await st.look(2250, { dur: 1300 });
    st.set('st-snow'); st.set('st-pSAPA');
    st.pose('mua', 'e014_hug'); st.act('mua', 'shiver'); st.mood('mua', 'shut');
    await st.wait(700);
    st.set('st-vcold');
    await st.wait(1300);
    st.set('st-vcold', false); st.set('st-pSAPA', false);
  } },
  { key: ['And you'], icon: '🫵', label: 'and you?', async play(st) {
    st.act('mua', null);
    await st.look(2670, { dur: 900 });
    st.pose('lan', 'open'); st.mood('lan', 'joy'); st.set('st-you');
    await st.say('lan', 'And you?', 1300);
    st.pose('lan', 'stand'); st.mood('lan', 'happy');
  } },
  { key: ["What's the weather like today"], icon: '🌈', label: 'today?', async play(st) {
    st.set('st-cycle');
    st.pose('lan', 'think');
    await st.wait(2600);
    st.pose('lan', 'stand');
  } },
];

export default {
  id: 'en014', worldW: 2860, floor: FLOOR, viewTop: 40, camStart: 20, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e014_fan: { R: [150, 240], L: [10, 4], head: -4 },
    e014_hug: { R: [30, -110], L: [30, -110], head: 4 },
  },
  cast: [
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 260 },
    { id: 'lucky', kind: 'dog', x: 205, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'e014_tom', x: 680 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: 1250, s: 0.92 },
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: 1340, s: 0.9 },
    { id: 'man', kind: 'adult', who: 'e014_man', x: 1975, s: 0.92 },
    { id: 'girl', kind: 'kid', who: 'e014_girl', x: 2025 },
    { id: 'mua', kind: 'kid', who: 'mua', x: 2260 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 2540, s: 1.08 },
  ],
  init(st) {
    st.dog('lucky', 'sit');
  },
};
