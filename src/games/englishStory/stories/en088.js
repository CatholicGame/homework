/**
 * Bài 88 "I Wish I Could Fly" (câu ước wish + quá khứ / could / were): những điều ước của cả nhà, đi từ trái sang phải:
 * phố Hà Nội (nhà Minh, đường kẹt xe máy, ô tô bóp còi) → trường (đồng hồ) → sân bóng rổ (ba bạn cao lớn) → trong nhà
 * (bàn học của Lan chất đầy bài tập, đồng hồ quay nhanh; phòng khách có ảnh Sydney, Tom kể với Minh) → quê ông (ao cá).
 * Điều ước (trái với hiện tại) luôn hiện mờ / trong bong bóng nghĩ: Minh bay qua dòng xe, bóng Minh cao lớn, Lan có thời gian đọc
 * sách, ông bà của Tom bay sang Việt Nam, ông chụp ảnh cá gửi cho Minh mỗi ngày.
 * Toạ độ cảnh: rộng 2640, cao 315, sàn y = 282.
 */
import { CAST, headOnly, person } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, thought, sun, schoolFront, room, water } from '../kit.js';

const FLOOR = 282;
const W = 2700;
const X = { house: 130, jam0: 300, jam1: 880, school: 1120, court0: 1270, hoop: 1600, home0: 1710, desk: 1810, photo: 2040, home1: 2180, pond: 2440 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e088_b1: { hair: 'short', top: 'tee', shirt: '#F97316', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
  e088_b2: { hair: 'spiky', hairC: '#3F2A1E', top: 'tee', shirt: '#F97316', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
  e088_b3: { hair: 'neat', hairC: '#1F1716', top: 'tee', shirt: '#F97316', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
  e088_tgma: { adult: true, old: true, hair: 'bun', hairC: '#F1F5F9', top: 'blouse', shirt: '#F9A8D4', bottom: 'pants', bottomC: '#475569', shoe: '#78716C', glasses: true },
  e088_tgpa: { adult: true, old: true, hair: 'short', hairC: '#E2E8F0', top: 'shirt', shirt: '#93C5FD', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const wheel = (x, r = 8) => `<circle cx="${x}" cy="${-r}" r="${r}" fill="#1F2937" stroke="${L}"/><circle cx="${x}" cy="${-r}" r="${r * 0.4}" fill="#CBD5E1"/>`;
const MOTO = (c, who) => `<g class="e088-jig">${wheel(-22)}${wheel(22)}<path d="M-26 -14 L-6 -22 H14 L26 -14 Q20 -8 -20 -8Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <path d="M16 -24 L22 -36 M18 -36 h8" stroke="${L}" stroke-width="2"/>
  <g transform="translate(0 -24)"><rect x="-8" y="-26" width="16" height="24" rx="5" fill="${['#60A5FA', '#F472B6', '#FDE047', '#A3E635'][who % 4]}" stroke="${L}" stroke-width="0.8"/>
    <circle cx="0" cy="-34" r="9" fill="#FADCC4" stroke="${L}" stroke-width="0.8"/><path d="M-10 -36 Q0 -48 10 -36Z" fill="${['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'][who % 4]}" stroke="${L}" stroke-width="0.8"/>
    <path d="M-3 -32 h1 M3 -32 h1" stroke="#1F2937" stroke-width="1.6" stroke-linecap="round"/><path d="M-3 -27 q3 -2 6 0" stroke="#9A3B2E" stroke-width="1" fill="none"/></g></g>`;
const CAR = (c) => `<g class="e088-jig">${wheel(-30, 10)}${wheel(30, 10)}<path d="M-48 -10 Q-50 -26 -36 -28 L-22 -30 Q-12 -46 8 -46 H20 Q32 -44 38 -30 L46 -28 Q52 -24 50 -10Z" fill="${c}" stroke="${L}" stroke-width="1"/>
  <path d="M-16 -31 Q-8 -42 6 -42 V-31Z M12 -42 H20 Q28 -40 32 -31 H12Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.7"/></g>`;
const BALL = `<circle r="9" fill="#F97316" stroke="${L}"/><path d="M-9 0 H9 M0 -9 V9 M-6 -6 Q0 0 -6 6 M6 -6 Q0 0 6 6" stroke="${L}" stroke-width="0.8" fill="none"/>`;
const BADGE12 = `<g transform="translate(-6 -16)"><circle r="9" fill="#FDE047" stroke="${L}" stroke-width="0.9"/><text x="0" y="4" text-anchor="middle" ${NUN} font-size="10" fill="#B45309" class="es-unflip">12</text></g>`;
const DREAM = `<g class="e088-dream"><path d="M30 -40 Q-10 -60 -34 -30 Q-14 -40 0 -26Z" fill="#EF4444" stroke="${L}" stroke-width="0.9"/>
  <g transform="rotate(72)">${person(0, 0, 'en_minh_home', 'float', { s: 0.95 })}</g></g>`;
const GHOST = `<g class="e088-ghost">${person(0, 0, 'en_minh_home', 'stand', { s: 1.4, mood: 'joy' })}</g>`;
const PHONE = `<g transform="translate(0 -6)"><rect x="-5" y="-9" width="10" height="17" rx="2" fill="#1F2937" stroke="${L}" stroke-width="0.6"/><rect x="-4" y="-7" width="8" height="12" rx="1" fill="#7DD3FC"/></g>`;
const PHOTO = `<rect x="-12" y="-9" width="24" height="18" rx="2" fill="#fff" stroke="${L}" stroke-width="0.9"/><rect x="-10" y="-7" width="20" height="14" fill="#7DD3FC"/>
  <path d="M-6 0 q4 -4 8 0 q-4 4 -8 0Z M2 0 l4 -3 v6Z" fill="#F97316" stroke="${L}" stroke-width="0.5"/>`;
const PROPS = {
  e088_phone: `<g transform="rotate(180) translate(0 -2)">${PHONE.replace('translate(0 -6)', 'translate(0 8)')}</g>`,
  e088_pencil: `<g transform="rotate(200)"><rect x="-1.8" y="-2" width="3.6" height="18" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><path d="M-1.8 16 L0 21 L1.8 16Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>`,
};
const POSES = {
  e088_up: { R: [10, 4], L: [10, 4], head: -14 },              // ngẩng nhìn các bạn cao
  e088_phone: { R: [70, 150], L: [30, -60], head: 10 },         // nhìn điện thoại trước mặt
  e088_tell: { R: [60, 100], L: [10, 4], head: -4 },
  e088_photo: { R: [84, 120], L: [10, 4], head: -6 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const shop = (x, w, c, sign) => `<g><rect x="${x}" y="110" width="${w}" height="${158}" fill="${c}" stroke="${L}" stroke-width="1.1"/>
  <rect x="${x + 10}" y="124" width="${w - 20}" height="18" rx="3" fill="#fff" stroke="${L}" stroke-width="0.8"/><text x="${x + w / 2}" y="137" text-anchor="middle" ${NUN} font-size="10" fill="#B91C1C">${sign}</text>
  ${[0, 1].map((i) => `<rect x="${x + 12 + i * (w / 2 - 6)}" y="152" width="${w / 2 - 18}" height="26" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <path d="M${x - 4} 196 H${x + w + 4} L${x + w - 4} 208 H${x + 4}Z" fill="#F43F5E" stroke="${L}" stroke-width="0.8"/></g>`;
const OPERA = `<path d="M-40 10 H40 V14 H-40Z" fill="#E7E5E4" stroke="${L}" stroke-width="0.8"/>
  ${[[-30, 22], [-14, 30], [4, 26], [20, 20]].map(([x, h]) => `<path d="M${x} 10 Q${x + 2} ${10 - h} ${x + 16} ${10 - h - 4} Q${x + 12} 0 ${x + 14} 10Z" fill="#fff" stroke="${L}" stroke-width="0.9"/>`).join('')}`;

function bg() {
  const jam = [[340, 'm', '#EF4444'], [420, 'c', '#3B82F6'], [520, 'm', '#22C55E'], [585, 'm', '#A855F7'], [680, 'c', '#F59E0B'], [780, 'm', '#0EA5E9'], [846, 'm', '#F43F5E']]
    .map(([x, k, c], i) => `<g transform="translate(${x} 262) scale(0.82)"><g class="e088-honk" style="animation-delay:${i * 0.07}s">${k === 'm' ? MOTO(c, i) : CAR(c)}</g></g>`).join('');
  return `
  ${sky(0, W, 315, 'e088sky')}
  <g transform="translate(1000 64)">${sun(22)}</g>
  ${cloud(200, 60, 0.8, 0)}${cloud(760, 50, 0.9, 2)}${cloud(1400, 64, 0.8, 4)}${cloud(2380, 52, 0.9, 1)}
  <!-- phố Hà Nội: nhà Minh + dãy phố -->
  <rect x="0" y="96" width="250" height="172" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><path d="M-8 100 L20 70 H230 L258 100Z" fill="#B91C1C" stroke="${L}"/>
  <rect x="${X.house - 22}" y="186" width="44" height="82" fill="#B45309" stroke="${L}"/><rect x="30" y="126" width="40" height="34" fill="#BAE6FD" stroke="${L}"/><rect x="190" y="126" width="40" height="34" fill="#BAE6FD" stroke="${L}"/>
  ${shop(270, 120, '#A7F3D0', 'PHO')}${shop(400, 110, '#FBCFE8', 'BANH MI')}${shop(520, 130, '#C7D2FE', 'CAFE')}${shop(660, 110, '#FED7AA', 'BOOKS')}${shop(780, 120, '#BFDBFE', 'SHOES')}
  <!-- đường phía sau, xe kẹt -->
  <rect x="250" y="226" width="${X.jam1 - 250 + 60}" height="42" fill="#64748B" stroke="${L}"/>
  ${Array.from({ length: 10 }, (_, i) => `<rect x="${270 + i * 64}" y="246" width="28" height="3" rx="1.5" fill="#F8FAFC"/>`).join('')}
  ${jam}
  <g class="e088-beep">${[[400, 170], [610, 160], [820, 170]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M-12 -6 L0 0 L-12 6 M-4 -12 L6 -2 M-4 12 L6 2" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/><text x="10" y="4" ${NUN} font-size="13" fill="#DC2626">BEEP</text></g>`).join('')}</g>
  <!-- trường -->
  <path d="M${X.jam1 + 60} 230 Q${X.school} 206 ${X.court0} 232 V268 H${X.jam1 + 60}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${schoolFront(X.school, 268)}
  <g transform="translate(${X.school - 150} 150)"><circle r="20" fill="#fff" stroke="${L}" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -16 V-13" stroke="${L}" stroke-width="1.3" transform="rotate(${i * 30})"/>`).join('')}
    <path d="M0 0 L8 -5" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/><g class="e088-mh5"><path d="M0 0 V-14" stroke="#DC2626" stroke-width="1.6" stroke-linecap="round"/></g><circle r="2" fill="${L}"/>
    <path d="M0 20 V${268 - 150}" stroke="#78716C" stroke-width="3"/></g>
  <!-- sân bóng rổ -->
  <rect x="${X.court0}" y="228" width="${X.home0 - X.court0}" height="40" fill="#FDBA74" stroke="${L}"/>
  <path d="M${X.court0 + 20} 248 H${X.home0 - 20} M${(X.court0 + X.home0) / 2} 232 V266" stroke="#fff" stroke-width="2"/>
  <g transform="translate(${X.hoop} 0)"><path d="M40 268 V96" stroke="#475569" stroke-width="6"/><rect x="-10" y="70" width="60" height="44" rx="3" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="6" y="88" width="22" height="16" fill="none" stroke="#DC2626" stroke-width="1.6"/><path d="M4 112 H30" stroke="#EA580C" stroke-width="3"/>
    <path d="M6 112 L10 128 L24 128 L28 112 M12 112 L16 128 M22 112 L18 128" stroke="#E5E7EB" stroke-width="1.2" fill="none"/></g>
  <!-- trong nhà: bàn học của Lan, phòng khách -->
  ${room(X.home0, X.home1 - X.home0, FLOOR, '#FCE7F3')}
  <rect x="${X.home0 - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.home1 - 6}" y="0" width="12" height="${FLOOR}" fill="#E9D5B5" stroke="${L}"/>
  <rect x="${X.desk - 70}" y="70" width="110" height="7" rx="2" fill="#A16207" stroke="${L}"/>
  ${['#EF4444', '#3B82F6', '#22C55E', '#F59E0B', '#A855F7', '#EC4899'].map((c, i) => `<rect x="${X.desk - 64 + i * 13}" y="${48 + (i % 2) * 4}" width="11" height="${22 - (i % 2) * 4}" rx="1" fill="${c}" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <text x="${X.desk - 10}" y="44" text-anchor="middle" ${NUN} font-size="9" fill="#BE185D">FAVOURITE BOOKS</text>
  <g transform="translate(${X.desk + 100} 100)"><circle r="20" fill="#fff" stroke="${L}" stroke-width="2"/>${Array.from({ length: 12 }, (_, i) => `<path d="M0 -16 V-13" stroke="${L}" stroke-width="1.3" transform="rotate(${i * 30})"/>`).join('')}
    <g class="e088-hh"><path d="M0 0 V-9" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/></g><g class="e088-mh"><path d="M0 0 V-14" stroke="#DC2626" stroke-width="1.5" stroke-linecap="round"/></g><circle r="2" fill="${L}"/></g>
  <!-- ảnh Sydney -->
  <g transform="translate(${X.photo} 108)"><rect x="-50" y="-36" width="100" height="72" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/><rect x="-44" y="-30" width="88" height="54" fill="#7DD3FC"/>
    <rect x="-44" y="10" width="88" height="14" fill="#0284C7"/><g transform="translate(0 2)">${OPERA}</g><text x="0" y="34" text-anchor="middle" ${NUN} font-size="8" fill="#92400E">SYDNEY</text></g>
  <path d="M${X.photo + 50} ${FLOOR - 50} h90 v-30 q-45 -14 -90 0Z" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/><rect x="${X.photo + 44}" y="${FLOOR - 52}" width="102" height="30" rx="8" fill="#3B82F6" stroke="${L}"/>
  <!-- quê ông: ao cá -->
  <path d="M${X.home1} 236 Q${X.pond - 60} 196 ${W} 226 V268 H${X.home1}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(X.home1 + 50, 240, 0.7)}${tree(W - 40, 236, 0.8)}
  <rect x="${X.home1 + 6}" y="268" width="${W - X.home1}" height="47" fill="#86EFAC" stroke="${L}"/>
  <g class="e088-pondw"><ellipse cx="${X.pond + 70}" cy="${FLOOR + 14}" rx="110" ry="20" fill="#38BDF8" stroke="${L}"/></g>
  <g class="e088-fish"><g transform="translate(${X.pond + 70} ${FLOOR + 6})"><path d="M-10 0 q10 -10 20 0 q-10 10 -20 0Z M10 0 l8 -6 v12Z" fill="#F97316" stroke="${L}" stroke-width="0.8"/><circle cx="-4" cy="-1" r="1.2" fill="#1F2937"/></g></g>
  <!-- vỉa hè phố + sàn -->
  <rect x="0" y="268" width="${X.home0}" height="47" fill="#E5E7EB" stroke="${L}"/>
  ${Array.from({ length: Math.floor(X.home0 / 40) }, (_, i) => `<path d="M${i * 40} 268 V315" stroke="#CBD5E1" stroke-width="1"/>`).join('')}
  ${bush(X.court0 - 20, FLOOR + 30, 0.6)}`;
}

function fg() {
  const fly = `<g transform="translate(-30 4)"><path d="M10 -20 Q-14 -30 -30 -12 Q-16 -18 -6 -8Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/><g transform="rotate(72) translate(0 6)">${person(0, 0, 'en_minh_home', 'float', { s: 0.42 })}</g></g>
    ${[0, 1, 2].map((i) => `<g transform="translate(${-56 + i * 30} 34) scale(0.4)">${MOTO('#94A3B8', i)}</g>`).join('')}<g transform="translate(62 -30) scale(0.3)">${schoolFront(0, 200)}</g>`;
  const read = `<g transform="translate(-30 -2)">${headOnly('en_lan_home', { s: 0.62, mood: 'joy' })}</g><g transform="translate(-30 22)"><path d="M-18 -8 L0 -4 L18 -8 V10 L0 14 L-18 10Z" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M0 -4 V14" stroke="${L}" stroke-width="0.8"/></g>
    <g transform="translate(36 0)"><circle r="18" fill="#fff" stroke="${L}" stroke-width="1.6"/><g class="e088-slow"><path d="M0 0 V-13" stroke="#16A34A" stroke-width="2" stroke-linecap="round"/></g><text x="0" y="34" text-anchor="middle" ${NUN} font-size="12" fill="#16A34A">more time</text></g>`;
  const sydney = `<rect x="-70" y="-6" width="140" height="40" fill="#0284C7"/><g transform="translate(-6 -2) scale(1.3)">${OPERA}</g>
    <path d="M30 -30 Q50 -46 70 -30" stroke="#94A3B8" stroke-width="3" fill="none"/><path d="M28 -30 V-6 M72 -30 V-6" stroke="#94A3B8" stroke-width="3"/>
    <g transform="translate(-50 -26)">${sun(8)}</g>`;
  const map = `<rect x="-80" y="-44" width="160" height="88" rx="4" fill="#BAE6FD"/>
    <path d="M-60 -36 Q-46 -40 -44 -30 Q-52 -22 -48 -12 Q-40 -2 -46 6 Q-56 2 -54 -10 Q-62 -22 -60 -36Z" fill="#86EFAC" stroke="${L}" stroke-width="0.9"/>
    <text x="-30" y="-30" ${NUN} font-size="9" fill="#166534">VIET NAM</text>
    <path d="M20 14 Q34 4 54 8 Q70 14 68 30 Q56 40 40 36 Q24 38 20 28Z" fill="#FCD34D" stroke="${L}" stroke-width="0.9"/><text x="44" y="26" text-anchor="middle" ${NUN} font-size="8" fill="#92400E">AUSTRALIA</text>
    <path d="M36 12 Q0 -36 -40 -18" stroke="#64748B" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/>
    <g class="e088-plane"><g transform="translate(36 12)"><path d="M-10 0 L10 0 M0 0 L-5 -8 M0 0 L-5 8 M8 0 l4 -2 v4Z" stroke="#1E40AF" stroke-width="3" stroke-linecap="round" fill="#1E40AF"/>
      <g transform="translate(-4 -14)">${headOnly('e088_tgma', { s: 0.32, mood: 'joy' })}</g><g transform="translate(10 -14)">${headOnly('e088_tgpa', { s: 0.32, mood: 'joy' })}</g></g></g>`;
  const fishPhoto = `<g transform="translate(-48 4)"><rect x="-20" y="-30" width="40" height="60" rx="6" fill="#1F2937"/><rect x="-16" y="-24" width="32" height="44" rx="2" fill="#7DD3FC"/>
      <g transform="scale(1.1)">${PHOTO.replace('<rect x="-12" y="-9" width="24" height="18" rx="2" fill="#fff" stroke="#6B4A3A" stroke-width="0.9"/>', '')}</g></g>
    <g class="e088-send"><g transform="translate(-48 4)">${PHOTO}</g></g>
    <path d="M-20 0 Q10 -24 30 0" stroke="#64748B" stroke-width="1.6" stroke-dasharray="4 3" fill="none"/>
    <g transform="translate(46 -8)">${headOnly('en_minh_home', { s: 0.56, mood: 'joy' })}</g>
    <g transform="translate(0 34)">${['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => `<g transform="translate(${-48 + i * 16} 0)"><rect x="-7" y="-7" width="14" height="14" rx="2" fill="#fff" stroke="${L}" stroke-width="0.7"/>
      <text x="0" y="-9" text-anchor="middle" ${NUN} font-size="6" fill="#64748B">${d}</text><path class="e088-day" style="transition-delay:${(0.4 + i * 0.25).toFixed(2)}s" d="M-4 0 l3 3 l5 -6" stroke="#16A34A" stroke-width="2" fill="none" stroke-linecap="round"/></g>`).join('')}</g>`;
  const wishStar = (x, y, cls) => `<g class="${cls}"><g transform="translate(${x} ${y})"><path d="M0 -14 L4 -4 L14 -4 L6 2 L9 12 L0 6 L-9 12 L-6 2 L-14 -4 L-4 -4Z" fill="#FDE047" stroke="${L}" stroke-width="0.9"/></g></g>`;
  return `
  <!-- bàn học của Lan (che chân), chồng bài tập -->
  <g transform="translate(${X.desk} 0)"><rect x="-70" y="${FLOOR - 56}" width="140" height="9" rx="3" fill="#B45309" stroke="${L}" stroke-width="1.2"/>
    <rect x="-64" y="${FLOOR - 47}" width="10" height="47" fill="#92400E" stroke="${L}"/><rect x="54" y="${FLOOR - 47}" width="10" height="47" fill="#92400E" stroke="${L}"/>
    ${[1, 2, 3].map((k) => `<g class="e088-hw e088-hw${k}">${Array.from({ length: 3 }, (_, i) => `<rect x="${32 - (k - 1) * 4 + (i % 2) * 3}" y="${FLOOR - 64 - (k - 1) * 24 - i * 8}" width="34" height="7" rx="1" fill="${['#FEF3C7', '#E0F2FE', '#FCE7F3'][i]}" stroke="${L}" stroke-width="0.7"/>`).join('')}</g>`).join('')}
    <rect x="-48" y="${FLOOR - 60}" width="40" height="4" fill="#fff" stroke="${L}" stroke-width="0.6"/></g>
  <!-- lá sen trên ao, ghế đẩu của ông -->
  <ellipse cx="${X.pond + 130}" cy="${FLOOR + 18}" rx="14" ry="4" fill="#22C55E" stroke="${L}" stroke-width="0.7"/>
  ${wishStar(196, 96, 'e088-st e088-st1')}${wishStar(236, 70, 'e088-st e088-st2')}${wishStar(276, 96, 'e088-st e088-st3')}
  ${wishStar(X.pond - 20, 72, 'e088-st e088-stg')}
  ${thought(520, 108, 200, 104, fly, [600, 150], 'e088-th e088-th-fly')}
  ${thought(X.desk - 40, 108, 170, 92, read, [X.desk - 24, 156], 'e088-th e088-th-read')}
  ${thought(X.photo - 120, 110, 170, 90, sydney, [X.photo - 70, 150], 'e088-th e088-th-syd')}
  ${thought(X.photo + 70, 112, 190, 100, `<g transform="scale(0.82)">${map}</g>`, [X.photo + 10, 156], 'e088-th e088-th-map')}
  ${thought(X.pond + 130, 104, 190, 100, fishPhoto, [X.pond + 30, 146], 'e088-th e088-th-fish')}
  <g class="e088-q"><text x="${X.pond + 18}" y="140" ${NUN} font-size="24" fill="#7C3AED" stroke="#fff" stroke-width="0.8">?</text><text x="${X.pond + 34}" y="124" ${NUN} font-size="18" fill="#7C3AED" stroke="#fff" stroke-width="0.8">?</text></g>
  <!-- nhãn -->
  <g class="e088-lb e088-lb-twelve">${label(X.house - 30, 64, 'twelve now', '#EA580C', 15)}</g>
  <g class="e088-lb e088-lb-wish">${label(236, 130, 'a lot of wishes', '#CA8A04', 13)}</g>
  <g class="e088-lb e088-lb-traffic">${label(716, 214, 'traffic in Hanoi', '#DC2626', 13)}</g>
  <g class="e088-lb e088-lb-five">${label(X.school - 150, 108, 'in five minutes', '#7C3AED', 13)}</g>
  <g class="e088-lb e088-lb-bigger">${label(X.hoop - 120, 76, 'much bigger than him', '#EA580C', 13)}</g>
  <g class="e088-lb e088-lb-taller">${label(X.hoop - 176, 104, 'he wishes he were taller', '#7C3AED', 12)}</g>
  <g class="e088-lb e088-lb-hw">${label(X.desk + 30, 100, 'so much homework', '#DC2626', 13)}</g>
  <g class="e088-lb e088-lb-misses">${label(X.photo, 186, 'misses Sydney', '#0369A1', 13)}</g>
  <g class="e088-lb e088-lb-gpa">${label(X.pond - 20, 108, 'Even Grandpa', '#15803D', 14)}</g>
  <g class="e088-lb e088-lb-phone">${label(X.pond + 80, 70, 'a smartphone', '#1E40AF', 14)}</g>`;
}

const CSS = `
.e088-lb { opacity: 0; transition: opacity .35s; }
${['twelve', 'wish', 'traffic', 'five', 'bigger', 'taller', 'hw', 'misses', 'gpa', 'phone'].map((k) => `.st-lb-${k} .e088-lb-${k}`).join(', ')} { opacity: 1; }
.e088-th, .e088-st, .e088-q { opacity: 0; transition: opacity .35s; }
${['fly', 'read', 'syd', 'map', 'fish'].map((k) => `.st-th-${k} .e088-th-${k}`).join(', ')} { opacity: 1; }
.e088-st > g { transform-box: fill-box; transform-origin: center; }
.st-st1 .e088-st1, .st-st2 .e088-st2, .st-st3 .e088-st3, .st-stg .e088-stg { opacity: 1; }
.st-st1 .e088-st1 > g, .st-st2 .e088-st2 > g, .st-st3 .e088-st3 > g, .st-stg .e088-stg > g { animation: e088Tw 1s ease-in-out infinite alternate; }
@keyframes e088Tw { from { scale: .85; } to { scale: 1.1; } }
.st-q .e088-q { opacity: 1; }
.e088-beep { opacity: 0; } .st-honk .e088-beep { animation: e088Beep .5s steps(1) infinite; }
@keyframes e088Beep { 0% { opacity: 1; } 50% { opacity: 0; } }
.st-honk .e088-honk { animation: e088Jig .12s linear infinite alternate; }
@keyframes e088Jig { from { transform: translateY(0); } to { transform: translateY(-1.6px); } }
.e088-mh5 { transform-origin: 0 0; transition: transform 1.6s ease-in-out; } .st-five .e088-mh5 { transform: rotate(30deg); }
.e088-hw { opacity: 0; transform: translateY(-20px); transition: opacity .2s, transform .35s cubic-bezier(.3,1.4,.6,1); }
.st-hw1 .e088-hw1, .st-hw2 .e088-hw2, .st-hw3 .e088-hw3 { opacity: 1; transform: none; }
.e088-mh, .e088-hh { transform-origin: 0 0; } .e088-hh { transform: rotate(150deg); }
.st-spin .e088-mh { animation: e088Spin .5s linear infinite; } .st-spin .e088-hh { animation: e088Spin 6s linear infinite; }
@keyframes e088Spin { from { rotate: 0deg; } to { rotate: 360deg; } }
.e088-slow { transform-origin: 0 0; } .st-th-read .e088-slow { animation: e088Spin 8s linear infinite; }
.e088-plane { offset-path: path('M36 12 Q0 -36 -40 -18'); offset-distance: 0%; offset-rotate: 0deg; }
.e088-plane > g { transform: translate(-36px, -12px); }
.st-th-map .e088-plane { animation: e088Fly 2.2s ease-in-out .3s both; }
@keyframes e088Fly { to { offset-distance: 100%; } }
.st-planed .e088-plane { offset-distance: 100%; animation: none; }
.e088-send { opacity: 0; } .st-send .e088-send { animation: e088Send 1.4s ease-in-out both; }
@keyframes e088Send { 0% { opacity: 1; transform: translate(0, 0); } 50% { transform: translate(48px, -26px); } 100% { opacity: 0; transform: translate(94px, -8px); } }
.e088-day { opacity: 0; transition: opacity .2s; } .st-days .e088-day { opacity: 1; }
.st-fishjump .e088-fish { animation: e088Jump 1s ease-out 2; }
@keyframes e088Jump { 0% { transform: translateY(0); } 45% { transform: translate(-14px, -40px) rotate(-20deg); } 100% { transform: translate(-28px, 0); } }
.e088-fish { transform-box: fill-box; transform-origin: center; }
.e088-dream { opacity: .85; } .es-thing .e088-dream { filter: drop-shadow(0 0 6px #fff) drop-shadow(0 0 3px #FDE047); }
.e088-ghost { opacity: .45; }
.es-thing.act-e088-bounce .e088-ball { animation: e088Ball .36s cubic-bezier(.5,0,.5,1) infinite alternate; }
@keyframes e088Ball { from { transform: translateY(-46px); } to { transform: translateY(0); } }
@media (prefers-reduced-motion: reduce) {
  .st-honk .e088-honk { animation: none; } .st-spin .e088-mh { animation-duration: 2s; }
  .es-thing.act-e088-bounce .e088-ball { animation-duration: .8s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));

const BEATS = [
  { key: ['Minh is twelve now', 'a lot of wishes'], icon: '🎂', label: 'twelve now', async play(st) {
    st.look(240);
    st.set('st-door'); st.sfx('door-open', { vol: 0.5 });
    await st.walk('minh', 236, { speed: 125, follow: false });
    st.chest('minh', BADGE12); st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    st.set('st-lb-twelve'); st.sfx('cheer', { vol: 0.4 });
    await st.wait(700);
    st.pose('minh', 'think'); st.set('st-lb-wish');
    for (const k of [1, 2, 3]) { st.set(`st-st${k}`); st.sfx('pop', { vol: 0.5, rate: 0.9 + k * 0.15 }); await st.wait(380); }
    await st.wait(500);
    st.pose('minh', 'stand');
  } },
  { key: ['I wish I could fly', 'the traffic in Hanoi is bad'], icon: '🦸', label: 'I wish I could fly', async play(st) {
    off(st, 'st-lb-twelve', 'st-lb-wish', 'st-st1', 'st-st2', 'st-st3');
    st.chest('minh', null);
    st.look(560, { dur: 2400 });
    await st.walk('minh', 600, { speed: 130, follow: false });
    st.set('st-honk'); st.set('st-lb-traffic');
    st.sfx('beep', { vol: 0.6 }); await st.wait(300); st.sfx('beep', { vol: 0.5, rate: 1.3 });
    st.mood('minh', 'sad'); st.pose('minh', 'sad');
    await st.wait(600);
    st.set('st-th-fly'); st.sfx('whoosh', { vol: 0.4 });
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    await st.say('minh', 'I wish I could fly!', 1600);
  } },
  { key: ['Then I would get to school in five minutes'], icon: '🏫', label: 'five minutes', async play(st) {
    off(st, 'st-lb-traffic');
    st.set('st-honk');
    st.show('dream', true); st.place('dream', 620, 190);
    await st.wait(300);
    st.sfx('whoosh', { vol: 0.6 });
    await st.walk('dream', X.school - 60, { speed: 260, y: 150, lead: -40 });
    st.set('st-five'); st.set('st-lb-five'); st.sfx('school-bell', { vol: 0.4 });
    await st.wait(1200);
    st.show('dream', false); st.set('st-honk', false);
  } },
  { key: ['wishes he were taller', 'much bigger than him'], icon: '🏀', label: 'taller', async play(st) {
    off(st, 'st-th-fly', 'st-lb-five', 'st-five');
    // sân bóng rổ: Minh đứng cạnh ba bạn cao lớn
    st.place('minh', X.hoop - 190, FLOOR, 1); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.place('ghost', X.hoop - 190, FLOOR, 1);
    st.look(X.hoop - 110, { instant: true });
    st.act('ball', 'e088-bounce');
    for (let i = 0; i < 4; i++) { st.sfx('bump', { vol: 0.5 }); await st.wait(360); }
    st.set('st-lb-bigger');
    st.pose('minh', 'e088_up'); st.mood('minh', 'sad');
    for (let i = 0; i < 3; i++) { st.sfx('bump', { vol: 0.4 }); await st.wait(360); }
    st.act('ball', null);
    st.show('ghost', true); st.set('st-lb-taller'); st.sfx('whoosh', { vol: 0.4, rate: 0.8 });
    st.pose('minh', 'think'); st.mood('minh', 'joy');
    await st.wait(1300);
  } },
  { key: ['Lan has so much homework this year'], icon: '📚', label: 'homework', async play(st) {
    off(st, 'st-lb-bigger', 'st-lb-taller'); st.show('ghost', false);
    st.look(X.desk + 30);
    st.pose('lan', 'write'); st.act('lan', 'write'); st.hold('lan', 'e088_pencil');
    for (const k of [1, 2, 3]) { st.set(`st-hw${k}`); st.sfx('page-turn', { vol: 0.7, rate: 0.9 + k * 0.1 }); await st.wait(450); }
    st.set('st-lb-hw'); st.mood('lan', 'sad');
    await st.loop('pencil', () => st.wait(1200), { vol: 0.7 });
    st.act('lan', null);
  } },
  { key: ['wishes she had more time', 'her favourite books'], icon: '⏰', label: 'more time', async play(st) {
    st.set('st-lb-hw', false);
    st.look(X.desk + 10);
    st.pose('lan', 'think'); st.hold('lan', null);
    st.set('st-spin');
    await st.loop('tick', () => st.wait(1300), { vol: 0.7 });
    st.set('st-spin', false);
    st.set('st-th-read'); st.sfx('page-turn', { vol: 0.6 });
    st.mood('lan', 'joy');
    await st.wait(1600);
  } },
  { key: ['Tom misses Sydney sometimes'], icon: '🇦🇺', label: 'misses Sydney', async play(st) {
    off(st, 'st-th-read');
    st.pose('lan', 'sitDesk'); st.mood('lan', 'happy');
    st.look(X.photo + 20);
    st.show('tom', true);
    await st.walk('tom', X.photo - 10, { speed: 110, follow: false });
    st.pose('tom', 'e088_up'); st.mood('tom', 'sad'); st.set('st-lb-misses');
    await st.wait(400);
    st.set('st-th-syd'); st.sfx('boat-horn', { vol: 0.3 });
    await st.wait(1600);
  } },
  { key: ['I wish my grandparents lived in Vietnam', 'he told Minh'], icon: '👴', label: 'grandparents', async play(st) {
    off(st, 'st-th-syd', 'st-lb-misses');
    st.look(X.photo + 40);
    st.show('minh', true); st.place('minh', X.photo + 90, FLOOR, -1); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.face('tom', 1); st.pose('tom', 'e088_tell'); st.mood('tom', 'happy');
    const say = st.say('tom', 'I wish my grandparents lived here.', 2200);
    st.set('st-th-map'); st.sfx('plane', { vol: 0.5 });
    await st.wait(2500);
    st.set('st-planed'); st.mood('tom', 'joy'); st.sfx('ding', { vol: 0.4 });
    await say;
    st.act('minh', 'nod');
    await st.wait(600);
    st.act('minh', null);
  } },
  { key: ['Even Grandpa has a wish'], icon: '⭐', label: "Grandpa's wish", async play(st) {
    off(st, 'st-th-map', 'st-planed');
    st.look(X.pond + 30);
    st.set('st-fishjump'); st.sfx('splash', { vol: 0.5 });
    st.pose('grandpa', 'stand'); st.mood('grandpa', 'joy');
    await st.wait(700);
    st.set('st-lb-gpa'); st.set('st-stg'); st.sfx('sparkle', { vol: 0.4 });
    st.pose('grandpa', 'think');
    await st.wait(900);
    st.sfx('splash', { vol: 0.4 });
    await st.wait(400);
    st.set('st-fishjump', false);
  } },
  { key: ['I wish I knew how to use a smartphone', 'he laughed'], icon: '📱', label: 'smartphone', async play(st) {
    off(st, 'st-lb-gpa', 'st-stg');
    st.look(X.pond + 30);
    st.hold('grandpa', 'e088_phone'); st.pose('grandpa', 'e088_phone'); st.mood('grandpa', 'wow');
    st.set('st-lb-phone');
    for (let i = 0; i < 3; i++) { st.sfx('robot-beep', { vol: 0.4, rate: 1 + i * 0.2 }); await st.wait(380); }
    st.set('st-q'); st.sfx('buzz-no', { vol: 0.4 });
    await st.wait(700);
    st.pose('grandpa', 'cheer'); st.act('grandpa', 'hop'); st.mood('grandpa', 'joy'); st.sfx('giggle', { vol: 0.7 });
    await st.wait(1300);
    st.act('grandpa', null); st.pose('grandpa', 'e088_phone');
  } },
  { key: ['send you photos of my fish every day'], icon: '🐟', label: 'photos of fish', async play(st) {
    off(st, 'st-lb-phone', 'st-q');
    st.look(X.pond + 30);
    st.pose('grandpa', 'e088_photo'); st.mood('grandpa', 'joy');
    st.set('st-fishjump'); st.sfx('splash', { vol: 0.4 });
    await st.wait(400);
    st.sfx('camera', { vol: 0.7 });
    st.set('st-th-fish');
    await st.wait(500);
    st.set('st-send'); st.sfx('whoosh', { vol: 0.4 });
    await st.wait(1300);
    st.sfx('ding', { vol: 0.5 });
    st.set('st-days');
    for (let i = 0; i < 7; i++) { await st.wait(250); if (i % 2 === 0) st.sfx('pop', { vol: 0.3, rate: 1.2 + i * 0.05 }); }
    await st.wait(500);
    st.set('st-fishjump', false);
  } },
];

export default {
  id: 'en088', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 3, 4, 6, 7, 9],
  cast: [
    { id: 'b1', kind: 'kid', who: 'e088_b1', x: X.hoop - 110, s: 1.3, face: -1 },
    { id: 'b2', kind: 'kid', who: 'e088_b2', x: X.hoop - 40, s: 1.36, face: -1 },
    { id: 'b3', kind: 'kid', who: 'e088_b3', x: X.hoop + 40, s: 1.32, face: -1 },
    { id: 'ball', kind: 'thing', x: X.hoop - 72, y: FLOOR - 2, svg: `<g class="e088-ball"><g transform="translate(0 -9)">${BALL}</g></g>`, box: [-10, -20, 20, 22] },
    { id: 'ghost', kind: 'thing', x: X.hoop - 190, svg: GHOST, box: [-50, -178, 100, 180] },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.desk - 20, s: 1.08 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: X.home0 + 260, s: 1.04, face: 1 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: X.pond - 30, s: 0.95 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.house, s: 1.0 },
    { id: 'dream', kind: 'thing', x: 620, y: 190, svg: DREAM, box: [-60, -120, 160, 140] },
  ],
  init(st) {
    st.show('dream', false); st.show('tom', false); st.show('ghost', false);
    st.pose('lan', 'sitDesk');
  },
};
