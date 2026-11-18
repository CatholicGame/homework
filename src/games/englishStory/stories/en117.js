/**
 * Bài 117 "Water!" (quá khứ tiếp diễn + when / while; who): Helen Keller và cô giáo Anne Sullivan. Một thế giới đi từ
 * trái sang phải: nhà gỗ trắng có hiên ở Alabama (Mỹ, 1880; mẹ bế em bé) → phòng trong nhà (em bé ốm sốt ban đêm; Helen
 * lên sáu không nhìn, không nghe được, hay giận dữ; cô Anne xách va li tới, đánh vần chữ vào tay Helen) → sân có vòi bơm
 * nước tay (năm 1887: nước chảy qua một bàn tay, cô Anne đánh vần w-a-t-e-r vào tay kia; Helen hiểu ra, mọi thứ có tên,
 * học 30 từ) → trường đại học (Helen lớn lên, gõ máy chữ viết sách) → vườn (hai cô trò bên nhau gần 50 năm).
 * Trang phục cuối thế kỉ 19: váy dài, cô Anne đeo kính. Hình bàn tay đánh vần phóng to trong bong bóng tròn.
 * Toạ độ cảnh: rộng 2600, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, flowerAt, books } from '../kit.js';

const FLOOR = 282;
const W = 2600;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { porch: 330, room: [420, 780], crib: 520, door: 770, pump: 1080, gate: 1330, uni: [1440, 1900], desk: 1760, garden: [1960, 2600], bench: 2240 };
const SKIN = '#FADCC4';

Object.assign(CAST, {
  e117_mum: { adult: true, hair: 'bun', hairC: '#7C4A1E', top: 'blouse', shirt: '#FBCFE8', bottom: 'longskirt', bottomC: '#BE185D', trim: ['#FCE7F3', '#FFFFFF', '#F9A8D4'], shoe: '#1F2937' },
  e117_dad: { adult: true, hair: 'short', hairC: '#57534E', beard: true, moustache: true, top: 'jacket', shirt: '#475569', inner: '#FFFFFF', bottom: 'pants', bottomC: '#334155', shoe: '#1C1917' },
  e117_helen: { hair: 'curly', hairC: '#92400E', top: 'dress', shirt: '#FDE68A', shoe: '#78350F' },
  e117_anne: { adult: true, hair: 'bun', hairC: '#3B2A22', glasses: true, top: 'blouse', shirt: '#334155', bottom: 'longskirt', bottomC: '#1E293B', trim: ['#475569', '#94A3B8', '#475569'], shoe: '#1C1917' },
  e117_helenA: { adult: true, hair: 'bun', hairC: '#92400E', top: 'blouse', shirt: '#FFFFFF', bottom: 'longskirt', bottomC: '#64748B', trim: ['#94A3B8', '#FFFFFF', '#94A3B8'], shoe: '#1F2937' },
  e117_anneA: { adult: true, hair: 'bun', hairC: '#57534E', glasses: true, top: 'blouse', shirt: '#475569', bottom: 'longskirt', bottomC: '#1E293B', trim: ['#475569', '#94A3B8', '#475569'], shoe: '#1C1917' },
  e117_helenO: { adult: true, old: true, hair: 'bun', hairC: '#D6D3D1', top: 'blouse', shirt: '#BFDBFE', bottom: 'longskirt', bottomC: '#475569', trim: ['#93C5FD', '#FFFFFF', '#93C5FD'], shoe: '#1F2937' },
  e117_anneO: { adult: true, old: true, hair: 'bun', hairC: '#E7E5E4', glasses: true, top: 'blouse', shirt: '#A78BFA', bottom: 'longskirt', bottomC: '#312E81', trim: ['#6366F1', '#C7D2FE', '#6366F1'], shoe: '#1C1917' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
/** Váy dài ở dáng nghiêng (rig chỉ có váy ngắn khi đi): chèn vào trước pp-chest. */
const SKIRT_SIDE = (c) => `<path d="M-16 -94 H18 L30 -3 Q2 3 -27 -3Z" fill="${c}" stroke="${L}" stroke-width="1"/>`;
const longSkirt = (st, id, c) => st.a(id).inner.querySelector('.pp-side .pp-chest')?.insertAdjacentHTML('beforebegin', SKIRT_SIDE(c));
const BABY = `<g transform="translate(0 -4)"><ellipse cx="2" cy="0" rx="17" ry="9" fill="#FFFFFF" stroke="${L}" stroke-width="0.9"/>
  <path d="M-8 -6 Q4 -2 16 -6" stroke="#FBCFE8" stroke-width="1.4" fill="none"/>
  <g transform="translate(-13 -3)"><circle r="7" fill="${SKIN}" stroke="${L}" stroke-width="0.8"/><path d="M-3 -1 q1.4 1.4 2.8 0 M1.4 -1 q1.4 1.4 2.8 0" stroke="#2B1D16" stroke-width="0.8" fill="none"/>
  <path d="M-1 3 q1.4 1 2.8 0" stroke="#9A3B2E" stroke-width="0.8" fill="none"/></g></g>`;
const SUITCASE = `<g transform="translate(0 10)"><rect x="-13" y="-2" width="26" height="18" rx="3" fill="#92400E" stroke="${L}" stroke-width="0.9"/><path d="M-13 6 H13" stroke="#FDE68A" stroke-width="1.4"/><path d="M-5 -2 V-6 H5 V-2" stroke="${L}" stroke-width="1.6" fill="none"/></g>`;
const DOLL = `<g transform="rotate(180) translate(0 -2)"><circle cy="20" r="5" fill="${SKIN}" stroke="${L}" stroke-width="0.7"/><path d="M-5 18 Q0 12 5 18" fill="#FDE047" stroke="${L}" stroke-width="0.5"/>
  <path d="M-5 25 H5 L8 38 H-8Z" fill="#F472B6" stroke="${L}" stroke-width="0.8"/></g>`;
const PROPS = { e117_case: SUITCASE, e117_doll: DOLL };
const POSES = {
  e117_hold: { R: [24, -86], L: [24, -86] },
  e117_spell: { R: [50, -20], L: [10, 4], head: 12 },
  e117_hand: { R: [56, 70], L: [10, 4], head: -4 },
  e117_under: { R: [10, 4], L: [60, 84], head: 6 },
  e117_pump: { R: [120, 150], L: [10, 4] },
  e117_touch: { R: [70, 88], L: [10, 4], head: 6 },
  e117_type: { R: [40, -50], L: [40, -50], dy: 20, head: 6 },
  e117_arm: { R: [30, -60], L: [10, 4] },
};

/** Bàn tay ngửa nhìn từ trên (gốc ở giữa lòng bàn tay), s = cỡ. */
const HAND = (s = 1, rot = 0) => `<g transform="rotate(${rot}) scale(${s})"><path d="M-12 30 Q-14 10 -12 -2 L12 -2 Q14 10 12 30Z" fill="${SKIN}" stroke="${L}" stroke-width="1"/>
  ${[-9, -3, 3, 9].map((x, i) => `<rect x="${x - 2.8}" y="${-24 + Math.abs(i - 1.5) * 3}" width="5.6" height="${24 - Math.abs(i - 1.5) * 3}" rx="2.8" fill="${SKIN}" stroke="${L}" stroke-width="0.9"/>`).join('')}
  <ellipse cx="0" cy="4" rx="13" ry="12" fill="${SKIN}" stroke="${L}" stroke-width="1"/><path d="M12 6 Q22 0 22 -8 Q18 -10 14 -4" fill="${SKIN}" stroke="${L}" stroke-width="0.9"/></g>`;
/** Ngón tay cô Anne chạm vào lòng bàn tay (gốc ở đầu ngón). */
const FINGER = `<path d="M0 0 Q-3 -2 -2 -6 L6 -30 Q10 -34 13 -30 L7 -4 Q5 2 0 0Z" fill="#F5C9A9" stroke="${L}" stroke-width="0.9"/>`;
/** Vòi bơm nước tay bằng gang (gốc = chân bệ). */
const PUMP = `<g><rect x="-26" y="-18" width="52" height="18" rx="3" fill="#A8A29E" stroke="${L}"/>
  <rect x="-9" y="-104" width="18" height="88" rx="4" fill="#475569" stroke="${L}" stroke-width="1.1"/><rect x="-12" y="-112" width="24" height="10" rx="3" fill="#334155" stroke="${L}"/>
  <path d="M8 -80 H34 Q40 -80 40 -72 V-66" stroke="${L}" stroke-width="9" fill="none" stroke-linecap="round"/><path d="M8 -80 H34 Q40 -80 40 -72 V-66" stroke="#475569" stroke-width="7" fill="none" stroke-linecap="round"/>
  <g class="e117-handle"><path d="M-8 -106 L-56 -128" stroke="${L}" stroke-width="6.4" stroke-linecap="round"/><path d="M-8 -106 L-56 -128" stroke="#64748B" stroke-width="4.6" stroke-linecap="round"/></g>
  <circle cx="-8" cy="-106" r="3" fill="#1F2937"/>
  <g class="e117-flow"><path d="M37 -62 Q41 -30 36 -18 M42 -62 Q46 -34 44 -18" stroke="#38BDF8" stroke-width="3.4" fill="none" stroke-linecap="round"/>
    <path class="e117-run" d="M40 -60 V-20" stroke="#E0F2FE" stroke-width="1.4" stroke-dasharray="4 6"/></g>
  <ellipse cx="40" cy="-6" rx="30" ry="6" fill="#38BDF8" stroke="${L}" stroke-width="0.8"/><rect x="18" y="-16" width="44" height="12" rx="2" fill="#92400E" stroke="${L}"/></g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  const [r0, r1] = X.room;
  const [u0, u1] = X.uni;
  return `
  ${sky(0, W, 315, 'e117sky')}
  ${cloud(140, 56, 0.8, 0)}${cloud(980, 50, 0.9, 2)}${cloud(1500, 62, 0.8, 4)}${cloud(2300, 48, 0.9, 1)}
  <rect x="0" y="${FLOOR}" width="${W}" height="33" fill="#86EFAC" stroke="${L}"/>
  ${tree(60, FLOOR, 1, '')}${tree(180, FLOOR, 0.8, '#F472B6')}
  <!-- nhà gỗ trắng có hiên -->
  <rect x="250" y="70" width="${r1 - 250}" height="${FLOOR - 70}" fill="#FFFFFF" stroke="${L}" stroke-width="1.2"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M250 ${84 + i * 15} H${r0}" stroke="#E2E8F0" stroke-width="1.2"/>`).join('')}
  <path d="M236 72 L${(250 + r1) / 2} 20 L${r1 + 14} 72Z" fill="#475569" stroke="${L}" stroke-width="1.2"/>
  <rect x="${r1 - 80}" y="14" width="18" height="40" fill="#B91C1C" stroke="${L}"/>
  <rect x="260" y="150" width="150" height="8" fill="#E7E5E4" stroke="${L}"/>${[266, 300, 336, 372, 402].map((x) => `<rect x="${x}" y="158" width="6" height="${FLOOR - 166}" fill="#F5F5F4" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="300" y="196" width="34" height="${FLOOR - 196}" fill="#15803D" stroke="${L}"/><rect x="350" y="100" width="34" height="40" fill="#BAE6FD" stroke="${L}"/>
  <rect x="250" y="${FLOOR - 8}" width="${r0 - 250}" height="8" fill="#D6D3D1" stroke="${L}"/>
  <g transform="translate(270 0)"><path d="M0 150 V96" stroke="#78716C" stroke-width="2"/>
    <rect x="0" y="96" width="26" height="16" fill="#fff" stroke="${L}" stroke-width="0.6"/>${[0, 1, 2, 3].map((i) => `<rect x="0" y="${96 + i * 4}" width="26" height="2" fill="#DC2626"/>`).join('')}<rect x="0" y="96" width="11" height="8" fill="#1D4ED8"/></g>
  <!-- phòng trong nhà (cắt ngang) -->
  <rect x="${r0}" y="78" width="${r1 - r0}" height="${FLOOR - 78}" fill="#FEF3C7"/>
  ${Array.from({ length: 9 }, (_, i) => `<path d="M${r0 + 20 + i * 40} 90 v6 M${r0 + 40 + i * 40} 110 v6" stroke="#FCA5A5" stroke-width="2.2"/>`).join('')}
  <rect x="${r0}" y="${FLOOR}" width="${r1 - r0}" height="33" fill="#C08B5C" stroke="${L}"/>
  ${Array.from({ length: 6 }, (_, i) => `<path d="M${r0 + i * 60} ${FLOOR} V315" stroke="#9A6A3E"/>`).join('')}
  <rect x="${r0 - 4}" y="78" width="8" height="${FLOOR - 78}" fill="#E2E8F0" stroke="${L}"/>
  <rect x="${r0 + 140}" y="110" width="60" height="58" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M${r0 + 170} 110 V168 M${r0 + 140} 139 H${r0 + 200}" stroke="#fff" stroke-width="2"/>
  <circle class="e117-moon" cx="${r0 + 186}" cy="124" r="7" fill="#FEF9C3"/>
  <g transform="translate(${r0 + 290} 112)"><circle r="14" fill="#FFFBEB" stroke="${L}" stroke-width="1.2"/><path d="M0 0 V-9 M0 0 L6 3" stroke="${L}" stroke-width="1.4" stroke-linecap="round"/></g>
  <!-- nôi em bé -->
  <g transform="translate(${X.crib} ${FLOOR})"><path d="M-46 -64 V0 M46 -64 V0" stroke="#A16207" stroke-width="4"/>
    <rect x="-46" y="-40" width="92" height="30" rx="4" fill="#FDE68A" stroke="${L}"/>${[-30, -15, 0, 15, 30].map((x) => `<path d="M${x} -64 V-40" stroke="#A16207" stroke-width="2"/>`).join('')}<path d="M-46 -64 H46" stroke="#A16207" stroke-width="3"/>
    <g class="e117-baby"><ellipse cx="4" cy="-44" rx="26" ry="8" fill="#FFFFFF" stroke="${L}" stroke-width="0.9"/><g transform="translate(-22 -48)"><circle r="8" fill="${SKIN}" stroke="${L}" stroke-width="0.8"/>
      <path d="M-3.4 -1 q1.6 1.4 3 0 M1.6 -1 q1.6 1.4 3 0" stroke="#2B1D16" stroke-width="0.8" fill="none"/><g class="e117-fever"><circle cx="-4" cy="3" r="2.4" fill="#F87171" opacity="0.8"/><circle cx="4" cy="3" r="2.4" fill="#F87171" opacity="0.8"/>
      <rect x="-7" y="-9" width="14" height="4" rx="2" fill="#E0F2FE" stroke="#7DD3FC" stroke-width="0.6"/></g></g>
      <g class="e117-heat">${[-8, 0, 8].map((x, i) => `<path d="M${x - 22} -62 q-3 -5 0 -10 q3 -5 0 -10" stroke="#F87171" stroke-width="1.6" fill="none" style="animation-delay:${i * 0.3}s"/>`).join('')}</g></g></g>
  <rect class="e117-rnight" x="${r0}" y="78" width="${r1 - r0}" height="${315 - 78}" fill="#1E1B4B"/>
  <!-- cửa ra sân -->
  <rect x="${X.door - 10}" y="150" width="20" height="${FLOOR - 150}" fill="#92400E" stroke="${L}"/>
  <rect x="${r1 - 4}" y="70" width="10" height="80" fill="#FFFFFF" stroke="${L}"/>
  <!-- sân, vòi bơm -->
  ${bush(860, FLOOR, 0.9)}${tree(940, FLOOR, 1.1, '')}${flowerAt(1000, FLOOR + 2, '#F472B6')}${flowerAt(1012, FLOOR + 4, '#FDE047')}${flowerAt(1180, FLOOR + 2, '#A78BFA')}
  <g transform="translate(${X.pump} ${FLOOR})">${PUMP}</g>
  <g class="e117-dusk"><rect x="${r1}" y="0" width="${X.gate - r1}" height="${FLOOR}" fill="#FB923C"/></g>
  ${tree(1240, FLOOR, 0.9, '')}
  <g transform="translate(${X.gate} 0)">${Array.from({ length: 4 }, (_, i) => `<rect x="${-20 + i * 26}" y="${FLOOR - 36}" width="8" height="30" rx="3" fill="#FEF3C7" stroke="${L}" stroke-width="0.8"/>`).join('')}<rect x="-24" y="${FLOOR - 28}" width="104" height="6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  <!-- trường đại học -->
  <rect x="${u0}" y="70" width="${u1 - u0}" height="${FLOOR - 70}" fill="#B91C1C" stroke="${L}" stroke-width="1.2"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${u0} ${86 + i * 16} H${u1}" stroke="#991B1B" stroke-width="1"/>`).join('')}
  <path d="M${u0 - 12} 72 L${(u0 + u1) / 2} 26 L${u1 + 12} 72Z" fill="#F5F5F4" stroke="${L}" stroke-width="1.2"/>
  ${[0, 1, 2, 3, 4].map((i) => `<rect x="${u0 + 30 + i * 30}" y="${i === 2 ? 210 : 100}" width="${i === 2 ? 0 : 20}" height="34" rx="9" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/>`).join('')}
  ${[u0 + 20, u0 + 70, u0 + 120, u0 + 170].map((x) => `<rect x="${x}" y="150" width="12" height="${FLOOR - 150}" fill="#F5F5F4" stroke="${L}" stroke-width="0.9"/>`).join('')}
  <rect x="${u0 + 10}" y="140" width="184" height="12" fill="#F5F5F4" stroke="${L}"/>
  <rect x="${u0 + 82}" y="190" width="40" height="${FLOOR - 190}" rx="18" fill="#7C2D12" stroke="${L}"/>
  <g transform="translate(${u0 + 102} 116)"><rect x="-56" y="-12" width="112" height="22" rx="4" fill="#FFFBEB" stroke="${L}"/><text y="4" text-anchor="middle" ${NUN} font-size="12" fill="#991B1B">UNIVERSITY</text></g>
  <!-- phòng học trong trường: bàn máy chữ -->
  <rect x="${u0 + 230}" y="100" width="${u1 - u0 - 250}" height="${FLOOR - 100}" fill="#FEF3C7" stroke="${L}"/>
  <g transform="translate(${u0 + 300} 120)">${books(0, 26, 6)}</g><rect x="${u0 + 290}" y="146" width="80" height="6" fill="#A16207" stroke="${L}"/>
  <!-- vườn sau này -->
  ${tree(2020, FLOOR, 1, '#F472B6')}${tree(2480, FLOOR, 1.1, '')}${bush(2560, FLOOR, 0.8, '#4ADE80')}
  ${[2100, 2130, 2330, 2360, 2390, 2420].map((x, i) => flowerAt(x, FLOOR + 3, ['#F472B6', '#FDE047', '#A78BFA', '#F472B6', '#FDE047', '#FB7185'][i])).join('')}
  <g transform="translate(${X.bench} ${FLOOR})"><rect x="-56" y="-40" width="112" height="8" rx="3" fill="#B45309" stroke="${L}"/><rect x="-56" y="-62" width="112" height="7" rx="3" fill="#B45309" stroke="${L}"/>
    <path d="M-48 -32 V0 M48 -32 V0" stroke="#78350F" stroke-width="4"/></g>`;
}

function fg() {
  const [r0] = X.room;
  /** Bong bóng tròn phóng to hai bàn tay (gốc ở tâm). */
  const zoom = (cls, inner, tail) => `<g class="e117-zoom ${cls}"><path d="${tail}" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle r="56" fill="#FFFBEB" stroke="${L}" stroke-width="1.6"/>${inner}</g>`;
  const letters = (word, x0, y, cls) => word.split('').map((c, i) => `<text class="${cls} ${cls}${i}" x="${x0 + i * 15}" y="${y}" text-anchor="middle" ${NUN} font-size="17" fill="#1D4ED8">${c}</text>`).join('');
  const doll = zoom('e117-z1', `<g transform="translate(-6 18)">${HAND(1.05, 0)}</g><g class="e117-fing"><g transform="translate(-2 22)">${FINGER}</g></g>
    ${letters('doll', -22, -34, 'e117-dl')}<g class="e117-q"><text x="40" y="12" text-anchor="middle" ${NUN} font-size="30" fill="#EA580C">?</text></g>`, 'M-20 50 L-34 96 L4 54Z');
  const water = zoom('e117-z2', `<g transform="translate(-26 22)">${HAND(0.9, -10)}</g><g class="e117-zrun"><path d="M-24 -56 Q-30 -20 -22 8 M-16 -56 Q-20 -24 -14 8" stroke="#38BDF8" stroke-width="5" fill="none" stroke-linecap="round"/>
    <circle cx="-30" cy="14" r="2.4" fill="#7DD3FC"/><circle cx="-12" cy="18" r="2" fill="#7DD3FC"/></g>
    <g transform="translate(28 22)">${HAND(0.9, 10)}</g><g class="e117-fing"><g transform="translate(30 26)">${FINGER}</g></g>
    ${letters('water', 0, -34, 'e117-wl')}`, 'M24 50 L48 96 L44 44Z');
  const tag = (x, y, t, i) => `<g class="e117-tag e117-tag${i}">${label(x, y, t, '#16A34A', 14)}</g>`;
  return `
  ${bush(240, FLOOR + 30, 0.6)}${bush(1300, FLOOR + 30, 0.6, '#4ADE80')}
  <!-- bàn máy chữ (che chân) -->
  <g transform="translate(${X.desk} ${FLOOR})"><rect x="-50" y="-56" width="100" height="8" rx="3" fill="#B45309" stroke="${L}"/><path d="M-42 -48 V0 M42 -48 V0" stroke="#78350F" stroke-width="5"/>
    <g transform="translate(18 -56)"><rect x="-18" y="-14" width="36" height="14" rx="3" fill="#1F2937" stroke="${L}"/><rect x="-14" y="-26" width="28" height="14" fill="#FFFBEB" stroke="${L}" stroke-width="0.7"/>
      ${[-12, -6, 0, 6, 12].map((x) => `<circle cx="${x}" cy="-5" r="1.6" fill="#E2E8F0"/>`).join('')}<path class="e117-typed" d="M-10 -22 H10 M-10 -18 H6" stroke="#475569" stroke-width="1"/></g></g>
  <!-- chồng sách Helen viết -->
  <g class="e117-books">${[0, 1, 2].map((i) => `<g class="e117-bk e117-bk${i}"><rect x="${X.desk - 46}" y="${FLOOR - 66 - i * 9}" width="40" height="9" rx="1.6" fill="${['#2563EB', '#16A34A', '#DC2626'][i]}" stroke="${L}" stroke-width="0.8"/><path d="M${X.desk - 40} ${FLOOR - 62 - i * 9} H${X.desk - 14}" stroke="#FDE68A" stroke-width="1"/></g>`).join('')}</g>
  <!-- không nhìn / không nghe -->
  <g class="e117-sense"><g class="e117-si e117-si1"><g transform="translate(${r0 + 140} 120)"><circle r="17" fill="#fff" stroke="${L}"/><path d="M-11 0 Q0 -10 11 0 Q0 10 -11 0Z" fill="#fff" stroke="${L}" stroke-width="1.2"/><circle r="3.6" fill="#1F2937"/><path d="M-12 -12 L12 12" stroke="#DC2626" stroke-width="3"/></g></g>
    <g class="e117-si e117-si2"><g transform="translate(${r0 + 186} 120)"><circle r="17" fill="#fff" stroke="${L}"/><path d="M-4 9 Q-9 6 -8 -2 Q-7 -10 1 -10 Q8 -10 8 -2 Q8 3 3 5 Q1 7 1 10 Q0 12 -4 9Z" fill="${SKIN}" stroke="${L}" stroke-width="1"/><path d="M-12 -12 L12 12" stroke="#DC2626" stroke-width="3"/></g></g></g>
  <g class="e117-angry"><g transform="translate(${r0 + 234} 150)"><path class="e117-scrib" d="M-14 0 q4 -10 8 0 q4 10 8 0 q4 -10 8 0 q4 10 8 0" stroke="#DC2626" stroke-width="2.4" fill="none" stroke-linecap="round"/>
    <path d="M-10 -12 L-4 -6 M10 -12 L4 -6" stroke="#DC2626" stroke-width="2.4" stroke-linecap="round"/></g></g>
  <!-- bàn tay phóng to -->
  <g transform="translate(${r0 + 160} 102)">${doll}</g>
  <g transform="translate(${X.pump - 20} 96)">${water}</g>
  <!-- bóng đèn hiểu ra -->
  <g class="e117-idea"><g transform="translate(${X.pump + 46} 128)">${[0, 45, 90, 135, 180, 225, 270, 315].map((a) => `<path d="M0 -24 V-34" stroke="#FACC15" stroke-width="3" stroke-linecap="round" transform="rotate(${a})"/>`).join('')}
    <circle r="16" fill="#FEF08A" stroke="#F59E0B" stroke-width="1.6"/><text y="7" text-anchor="middle" ${NUN} font-size="20" fill="#B45309">!</text></g></g>
  <!-- tên các đồ vật -->
  ${tag(X.pump + 44, 238, 'water', 0)}${tag(X.pump + 6, 140, 'pump', 1)}${tag(940, 66, 'tree', 2)}${tag(1006, 238, 'flower', 3)}${tag(X.pump - 52, 96, 'teacher', 4)}
  <!-- 30 từ -->
  <g class="e117-count"><g transform="translate(${X.pump - 60} 70)"><rect x="-64" y="-22" width="128" height="34" rx="12" fill="#fff" stroke="#16A34A" stroke-width="2"/>
    <text class="e117-n" x="-14" y="4" text-anchor="middle" ${NUN} font-size="22" fill="#16A34A">30</text><text x="32" y="4" text-anchor="middle" ${NUN} font-size="15" fill="#16A34A">words</text></g></g>
  <!-- nhãn -->
  <g class="e117-lb e117-lb-born">${label(X.porch, 46, '1880 · the United States', '#1D4ED8', 15)}</g>
  <g class="e117-lb e117-lb-ill">${label(X.crib + 60, 56, 'very ill', '#DC2626', 16)}</g>
  <g class="e117-lb e117-lb-six">${label(r0 + 120, 52, 'Helen: 6', '#EA580C', 15)}</g>
  <g class="e117-lb e117-lb-anne">${label(r0 + 280, 76, 'Anne Sullivan', '#7C3AED', 14)}</g>
  <g class="e117-lb e117-lb-1887">${label(X.pump - 60, 50, '1887', '#B45309', 18)}</g>
  <g class="e117-lb e117-lb-uni">${label(X.uni[0] + 102, 50, 'university', '#991B1B', 16)}</g>
  <g class="e117-lb e117-lb-books">${label(X.desk - 26, 140, 'books', '#2563EB', 14)}</g>
  <g class="e117-lb e117-lb-50">${label(X.bench, 60, 'almost 50 years', '#BE185D', 16)}</g>`;
}

const LBS = ['born', 'ill', 'six', 'anne', '1887', 'uni', 'books', '50'];
const CSS = `
.e117-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e117-lb-${k}`).join(', ')} { opacity: 1; }
.e117-baby, .e117-fever, .e117-heat, .e117-moon { opacity: 0; transition: opacity .5s; }
.st-baby .e117-baby, .st-ill .e117-fever, .st-ill .e117-heat, .st-night .e117-moon { opacity: 1; }
.st-ill .e117-heat path { animation: e117Heat 1s ease-in-out infinite alternate; }
@keyframes e117Heat { from { transform: translateY(2px); opacity: .4; } to { transform: translateY(-3px); opacity: 1; } }
.e117-rnight { opacity: 0; transition: opacity .8s; pointer-events: none; } .st-night .e117-rnight { opacity: .4; }
.e117-dusk { opacity: 0; transition: opacity .8s; pointer-events: none; } .st-dusk .e117-dusk { opacity: .18; }
.e117-si, .e117-angry { opacity: 0; transform: scale(.4); transform-box: fill-box; transform-origin: center; transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-blind .e117-si1, .st-deaf .e117-si2, .st-angry .e117-angry { opacity: 1; transform: none; }
.st-angry .e117-scrib { animation: e117Shake .12s linear infinite alternate; }
@keyframes e117Shake { from { transform: translateX(-2px); } to { transform: translateX(2px); } }
.e117-zoom { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .45s cubic-bezier(.3,1.4,.6,1); }
.st-z1 .e117-z1, .st-z2 .e117-z2 { opacity: 1; transform: none; }
.e117-dl, .e117-wl { opacity: 0; transition: opacity .2s; }
${[0, 1, 2, 3].map((i) => `.st-d${i + 1} .e117-dl${i}`).join(', ')}, ${[0, 1, 2, 3, 4].map((i) => `.st-w${i + 1} .e117-wl${i}`).join(', ')} { opacity: 1; }
.st-z1 .e117-z1 .e117-fing, .st-spell .e117-z2 .e117-fing { animation: e117Tap .3s ease-in-out infinite alternate; }
@keyframes e117Tap { from { transform: translate(-6px, 4px); } to { transform: translate(4px, -2px); } }
.e117-q { opacity: 0; transition: opacity .3s; } .st-q .e117-q { opacity: 1; }
.e117-flow, .e117-zrun { opacity: 0; transition: opacity .3s; }
.st-water .e117-flow, .st-water .e117-zrun { opacity: 1; }
.e117-run { animation: e117Run .4s linear infinite; } @keyframes e117Run { to { stroke-dashoffset: -10; } }
.e117-handle { transform-box: view-box; transform-origin: -8px -106px; }
.st-water .e117-handle { animation: e117Pump .5s ease-in-out infinite alternate; }
@keyframes e117Pump { from { transform: rotate(-8deg); } to { transform: rotate(14deg); } }
.e117-idea { opacity: 0; transform: scale(.2); transform-box: fill-box; transform-origin: center; transition: opacity .25s, transform .45s cubic-bezier(.3,1.6,.6,1); }
.st-idea .e117-idea { opacity: 1; transform: none; }
.e117-tag { opacity: 0; transform: translateY(8px); transition: opacity .25s, transform .3s; }
${[0, 1, 2, 3, 4].map((i) => `.st-t${i} .e117-tag${i}`).join(', ')} { opacity: 1; transform: none; }
.e117-count { opacity: 0; transition: opacity .3s; } .st-count .e117-count { opacity: 1; }
.e117-typed { opacity: 0; } .st-type .e117-typed { opacity: 1; transition: opacity 1.4s; }
.e117-bk { opacity: 0; transform: translateY(-18px); transition: opacity .25s, transform .3s cubic-bezier(.3,1.4,.6,1); }
.st-b0 .e117-bk0, .st-b1 .e117-bk1, .st-b2 .e117-bk2 { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .st-angry .e117-scrib { animation-duration: .4s; } .st-water .e117-handle { animation-duration: 1s; }
  .st-z1 .e117-z1 .e117-fing, .st-spell .e117-z2 .e117-fing { animation-duration: .7s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);

const BEATS = [
  { key: ['born in the United States in 1880'], icon: '👶', label: 'born in 1880', async play(st) {
    st.look(X.porch + 30);
    st.sfx('birds', { vol: 0.5 });
    await st.wait(400);
    lb(st, 'born'); st.sfx('ding', { vol: 0.5 });
    st.chest('mum', BABY); st.pose('mum', 'e117_hold'); st.fx('hearts', X.porch + 30, 140);
    st.mood('mum', 'joy'); st.mood('dad', 'joy');
    await st.wait(1500);
  } },
  { key: ['became very ill'], icon: '🤒', label: 'very ill', async play(st) {
    lb(st, 'born', false);
    st.look(X.crib + 60, { dur: 1400 });
    await st.walk('mum', X.crib + 72, { speed: 130, follow: false });
    st.face('mum', -1); st.chest('mum', null); st.pose('mum', 'reach');
    st.set('st-baby');
    await st.wait(300);
    st.set('st-night'); st.sfx('tick', { vol: 0.4 });
    st.pose('mum', 'stand');
    await st.wait(500);
    st.set('st-ill'); lb(st, 'ill'); st.sfx('cough', { vol: 0.3 });
    st.mood('mum', 'sad'); st.pose('mum', 'e117_spell');
    await st.wait(1600);
  } },
  { key: ["couldn't see or hear", 'often angry'], icon: '😣', label: "couldn't see or hear", async play(st) {
    off(st, 'st-lb-ill', 'st-ill', 'st-night', 'st-baby');
    st.place('mum', X.room[0] + 40, FLOOR, 1); st.pose('mum', 'stand');
    st.show('helen', true);
    st.fx('poof', X.crib + 60, 220, { quiet: true }); st.sfx('poof', { vol: 0.4 });
    st.look(X.crib + 80);
    await st.wait(500);
    st.set('st-blind'); st.sfx('pop', { vol: 0.5 });
    await st.wait(600);
    st.set('st-deaf'); st.sfx('pop', { vol: 0.5, rate: 1.15 });
    await st.wait(700);
    st.set('st-angry'); st.mood('helen', 'cry'); st.act('helen', 'no'); st.pose('helen', 'arms');
    st.sfx('bump', { vol: 0.6 }); await st.wait(350); st.sfx('bump', { vol: 0.5, rate: 1.1 });
    await st.wait(900);
    st.act('helen', null);
  } },
  { key: ['When Helen was six', 'Anne Sullivan came to her house'], icon: '🧳', label: 'Anne Sullivan came', async play(st) {
    off(st, 'st-blind', 'st-deaf', 'st-angry');
    st.mood('helen', 'sad'); st.pose('helen', 'stand');
    lb(st, 'six'); st.sfx('ding', { vol: 0.4 });
    st.look(X.door - 40, { dur: 1600 });
    st.show('anne', true);
    st.hold('anne', 'e117_case'); st.pose('anne', 'stand');
    await st.walk('anne', X.door + 20, { speed: 120, follow: false });
    st.sfx('knock', { vol: 0.6 }); await st.wait(260); st.sfx('knock', { vol: 0.5 });
    await st.wait(200);
    st.sfx('door-open', { vol: 0.5 });
    lb(st, 'anne');
    st.look(X.crib + 120, { dur: 1400 });
    await st.walk('anne', X.crib + 150, { speed: 120, follow: false });
    st.hold('anne', null);
    st.mood('anne', 'joy'); st.pose('anne', 'wave'); st.act('anne', 'wave');
    await st.wait(900);
    st.act('anne', null); st.pose('anne', 'stand');
  } },
  { key: ["spelled words into Helen's hand", "didn't know what they meant"], icon: '✋', label: 'spelled into her hand', async play(st) {
    off(st, 'st-lb-six', 'st-lb-anne');
    st.look(X.crib + 110);
    st.hold('helen', 'e117_doll'); st.pose('helen', 'e117_hand'); st.mood('helen', 'happy');
    st.pose('anne', 'e117_spell');
    st.set('st-z1'); st.sfx('pop', { vol: 0.4 });
    for (let i = 1; i <= 4; i++) { await st.wait(420); st.set(`st-d${i}`); st.sfx('click', { vol: 0.35, rate: 1 + i * 0.05 }); }
    await st.wait(400);
    st.set('st-q'); st.mood('helen', 'wow'); st.act('helen', 'no'); st.sfx('buzz-no', { vol: 0.3 });
    await st.wait(1200);
    st.act('helen', null);
  } },
  { key: ['One day in 1887', 'standing next to the water pump'], icon: '⛲', label: 'the water pump', async play(st) {
    off(st, 'st-z1', 'st-q', 'st-d1', 'st-d2', 'st-d3', 'st-d4');
    st.hold('helen', null); st.pose('helen', 'stand'); st.pose('anne', 'stand'); st.mood('helen', 'happy');
    st.look(X.pump - 60, { dur: 2600 });
    lb(st, '1887'); st.sfx('door-open', { vol: 0.4 });
    st.sfx('birds', { vol: 0.4 });
    await Promise.all([
      st.walk('helen', X.pump + 46, { speed: 100, follow: false }),
      st.walk('anne', X.pump - 52, { speed: 100, follow: false }),
    ]);
    st.face('helen', -1);
    st.pose('anne', 'point');
    await st.wait(800);
    st.pose('anne', 'stand');
  } },
  { key: ['water was running over', 'spelling w-a-t-e-r'], icon: '💧', label: 'w-a-t-e-r', async play(st) {
    lb(st, '1887', false);
    st.look(X.pump - 10);
    st.pose('anne', 'e117_pump'); st.set('st-water');
    st.pose('helen', 'e117_under');
    await st.loop('tap-water', async () => {
      await st.wait(500);
      st.set('st-z2'); st.sfx('pop', { vol: 0.3 });
      await st.wait(400);
      st.pose('anne', 'e117_spell'); st.set('st-spell');
      for (let i = 1; i <= 5; i++) { await st.wait(480); st.set(`st-w${i}`); st.sfx('click', { vol: 0.35, rate: 1 + i * 0.05 }); }
      await st.wait(500);
    }, { vol: 0.6 });
  } },
  { key: ['Suddenly, Helen understood'], icon: '💡', label: 'Helen understood', async play(st) {
    off(st, 'st-spell', 'st-z2');
    st.mood('helen', 'wow');
    st.set('st-idea'); st.sfx('ding', { vol: 0.6 }); st.sfx('sparkle', { vol: 0.4 });
    await st.wait(700);
    st.mood('helen', 'joy'); st.pose('helen', 'cheer'); st.act('helen', 'hop');
    st.mood('anne', 'wow');
    await st.wait(1300);
    st.act('helen', null);
  } },
  { key: ['Everything had a name'], icon: '🏷️', label: 'Everything had a name', async play(st) {
    off(st, 'st-idea', 'st-water', ...[1, 2, 3, 4, 5].map((i) => `st-w${i}`));
    st.pose('anne', 'stand'); st.mood('anne', 'joy');
    st.pose('helen', 'e117_touch'); st.set('st-t0'); st.sfx('pop', { vol: 0.5 });
    await st.wait(400);
    st.face('helen', -1); st.set('st-t1'); st.sfx('pop', { vol: 0.5, rate: 1.08 });
    await st.wait(300);
    st.look(X.pump - 60, { dur: 1200 });
    await st.walk('helen', 1010, { speed: 150, follow: false });
    st.pose('helen', 'e117_touch'); st.set('st-t3'); st.sfx('pop', { vol: 0.5, rate: 1.16 });
    await st.wait(300);
    await st.walk('helen', 966, { speed: 140, follow: false });
    st.pose('helen', 'pointUp'); st.set('st-t2'); st.sfx('pop', { vol: 0.5, rate: 1.24 });
    await st.wait(300);
    await st.walk('helen', X.pump - 92, { speed: 150, follow: false });
    st.face('helen', 1);
    st.pose('helen', 'e117_touch'); st.set('st-t4'); st.sfx('pop', { vol: 0.5, rate: 1.32 });
    st.mood('helen', 'joy'); st.fx('hearts', X.pump - 70, 110);
    await st.wait(700);
    st.pose('helen', 'stand');
  } },
  { key: ['she learned thirty words'], icon: '🔤', label: 'thirty words', async play(st) {
    off(st, 'st-t0', 'st-t1', 'st-t2', 'st-t3', 'st-t4');
    st.look(X.pump - 40);
    st.set('st-dusk'); st.set('st-count');
    const n = st.fgEl.querySelector('.e117-n');
    if (st.instant) { n.textContent = '30'; return; }
    for (let i = 1; i <= 30; i++) {
      n.textContent = String(i);
      if (i % 3 === 0) st.sfx('tick', { vol: 0.3, rate: 1 + i / 60 });
      await st.wait(70);
    }
    st.sfx('ding', { vol: 0.5 });
    st.pose('helen', 'cheer'); st.act('helen', 'hop'); st.mood('anne', 'joy'); st.pose('anne', 'clap'); st.act('anne', 'clap');
    await st.wait(1200);
    st.act('helen', null); st.act('anne', null); st.pose('helen', 'stand'); st.pose('anne', 'stand');
  } },
  { key: ['went to university', 'wrote books'], icon: '🎓', label: 'university · books', async play(st) {
    off(st, 'st-dusk', 'st-count');
    for (const id of ['helen', 'anne', 'mum', 'dad']) st.show(id, false);
    st.show('helenA', true); st.show('anneA', true);
    st.look(X.desk - 100, { instant: true });
    lb(st, 'uni'); st.sfx('school-bell', { vol: 0.35 });
    await Promise.all([
      st.walk('helenA', X.desk - 4, { speed: 120, follow: false }),
      st.walk('anneA', X.desk + 70, { speed: 120, follow: false }),
    ]);
    st.face('anneA', -1);
    lb(st, 'uni', false);
    st.pose('helenA', 'e117_type'); st.set('st-type');
    await st.loop('typing', () => st.wait(1300), { vol: 0.7 });
    lb(st, 'books');
    for (let i = 0; i < 3; i++) { st.set(`st-b${i}`); st.sfx('bowl-down', { vol: 0.4, rate: 1 + i * 0.1 }); await st.wait(280); }
    st.mood('anneA', 'joy');
    await st.wait(400);
  } },
  { key: ['the teacher who changed her life', 'almost fifty years'], icon: '💞', label: 'almost fifty years', async play(st) {
    lb(st, 'books', false);
    st.show('helenA', false); st.show('anneA', false);
    st.show('helenO', true); st.show('anneO', true);
    st.look(X.bench, { dur: 2200 });
    st.sfx('birds', { vol: 0.5 });
    st.pose('anneO', 'e117_arm');
    await Promise.all([
      st.walk('anneO', X.bench - 26, { speed: 90, follow: false }),
      st.walk('helenO', X.bench + 18, { speed: 90, follow: false }),
    ]);
    st.face('helenO', -1);
    lb(st, '50'); st.sfx('ding', { vol: 0.5 });
    st.mood('anneO', 'joy'); st.mood('helenO', 'joy');
    st.pose('anneO', 'give'); st.pose('helenO', 'give');
    st.fx('hearts', X.bench - 4, 120);
    await st.wait(1800);
  } },
];

export default {
  id: 'en117', worldW: W, floor: FLOOR, viewTop: 30, camStart: 90, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 3, 6, 7, 10],
  cast: [
    { id: 'dad', kind: 'adult', who: 'e117_dad', x: X.porch - 70 },
    { id: 'mum', kind: 'adult', who: 'e117_mum', x: X.porch + 20 },
    { id: 'helen', kind: 'kid', who: 'e117_helen', x: X.crib + 70, s: 0.9 },
    { id: 'anne', kind: 'adult', who: 'e117_anne', x: X.pump + 200, face: -1 },
    { id: 'helenA', kind: 'adult', who: 'e117_helenA', x: X.uni[0] + 20 },
    { id: 'anneA', kind: 'adult', who: 'e117_anneA', x: X.uni[0] - 30 },
    { id: 'anneO', kind: 'adult', who: 'e117_anneO', x: 2030 },
    { id: 'helenO', kind: 'adult', who: 'e117_helenO', x: 2080 },
  ],
  init(st) {
    for (const id of ['helen', 'anne', 'helenA', 'anneA', 'anneO', 'helenO']) st.show(id, false);
    const skirts = { mum: '#BE185D', anne: '#1E293B', helenA: '#64748B', anneA: '#1E293B', helenO: '#475569', anneO: '#312E81' };
    for (const [id, c] of Object.entries(skirts)) longSkirt(st, id, c);
  },
};
