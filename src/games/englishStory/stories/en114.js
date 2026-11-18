/**
 * Bài 114 "Androcles and the Lion" (quá khứ đơn bất quy tắc; when). Thời La Mã, đi từ trái sang phải: nhà ông chủ (tường
 * trắng, mái ngói đỏ, cột) → đồi ô liu, cây bách → đồi đá có hang tối (Androcles trốn, sư tử vào, giơ chân có gai, rút gai,
 * sư tử liếm tay) → đường tới Rome (lính La Mã mũ có chỏm đỏ, cầm giáo) → đấu trường (khán đài đông người, lô của hoàng đế,
 * cửa song sắt nhốt sư tử). Sư tử chạy tới thì dừng lại vì nhận ra bạn; hoàng đế ngạc nhiên, tha cả hai.
 * Không có cảnh đánh nhau: lính chỉ dẫn đi, sư tử không tấn công.
 * Sư tử dùng lại hình của bài 111 (lionSvg / lionCss, tiền tố e114). Lính là đồ vật riêng nhìn nghiêng (kind 'thing').
 * Toạ độ cảnh: rộng 2650, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly, CAST_SKIN as SKIN } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, label, speaker, thought, sun } from '../kit.js';
import { lionSvg, lionCss, LION_BOX } from './en111.js';

const FLOOR = 282;
const W = 2650;
const X = { door: 250, cave0: 1110, cave1: 1430, hide: 1215, lionC: 1385, ar0: 1950, entry: 2010, emp: 2160, andro: 2250, stop: 2400, gate: 2460, cam: 2300 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e114_andro: { adult: true, hair: 'curly', hairC: '#3B2A22', top: 'blouse', shirt: '#A47551', bottom: 'shorts', bottomC: '#8B5E3C', shoe: '#78350F', beard: true },
  e114_master: { adult: true, hair: 'short', hairC: '#57534E', top: 'blouse', shirt: '#F5F5F4', bottom: 'longskirt', bottomC: '#E7E5E4', shoe: '#78350F', moustache: true, beard: true },
  e114_emp: { adult: true, hair: 'short', hairC: '#57534E', top: 'blouse', shirt: '#7E22CE' },
});

// ── Lính La Mã (nhìn nghiêng, mặt sang phải; gốc giữa chân) ─────────────────────────────────
const sleg = (dark) => `<path d="M0 0 L0 78" stroke="${L}" stroke-width="9.6" stroke-linecap="round"/><path d="M0 0 L0 78" stroke="${dark ? '#D9A57A' : SKIN}" stroke-width="7.8" stroke-linecap="round"/>
  <path d="M-4 62 H4 M-4 69 H4" stroke="#78350F" stroke-width="1.6"/><path d="M-4.6 83 Q-5 77 2 77.4 L10 79.6 Q11 83.6 8 84Z" fill="#78350F" stroke="${L}" stroke-width="0.7"/>`;
const SOLDIER = `<g class="e114-sbob">
  <g transform="translate(-3 -84)"><g class="e114-slB">${sleg(true)}</g></g>
  <path d="M-12 -136 Q-32 -112 -28 -84 L-8 -92Z" fill="#991B1B" stroke="${L}" stroke-width="0.9"/>
  <g transform="translate(3 -84)"><g class="e114-slA">${sleg(false)}</g></g>
  <path d="M-15 -104 H17 L21 -76 Q2 -72 -19 -76Z" fill="#B91C1C" stroke="${L}"/>
  <path d="M-14 -138 Q2 -142 16 -136 L17 -102 H-15Z" fill="#A8A29E" stroke="${L}"/>
  <path d="M-15 -127 H17 M-15 -117 H17 M-15 -108 H17" stroke="#78716C" stroke-width="1.3"/>
  <rect x="-16" y="-104" width="34" height="5" fill="#92400E" stroke="${L}" stroke-width="0.7"/>
  <path d="M-3.4 -142 V-134 H3.8 V-142Z" fill="${SKIN}" stroke="${L}" stroke-width="0.7"/>
  <circle cx="0" cy="-152" r="13.5" fill="${SKIN}" stroke="${L}" stroke-width="0.8"/>
  <path d="M12.4 -155 q4 3 0.6 6" fill="${SKIN}" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="7" cy="-154" rx="1.9" ry="2.5" fill="#2B1D16"/><path d="M6 -145 h5" stroke="#9A3B2E" stroke-width="1.1" stroke-linecap="round"/>
  <path d="M-15 -150 Q-16 -170 0 -170 Q15 -170 15 -157 L10 -157 Q8 -164 0 -164 Q-8 -164 -8 -150 L-6 -138 L-15 -140Z" fill="#9CA3AF" stroke="${L}" stroke-width="0.9"/>
  <path d="M-2 -157 L4 -157 L4 -143 L-1 -141Z" fill="#9CA3AF" stroke="${L}" stroke-width="0.7"/>
  <path d="M-14 -168 Q0 -188 14 -168 Q0 -177 -14 -168Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/>
  <path d="M21 -198 V-2" stroke="#78350F" stroke-width="3" stroke-linecap="round"/><path d="M21 -208 L25.4 -195 H16.6Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.7"/>
  <path d="M2 -134 L10 -113 L20 -113" stroke="${L}" stroke-width="7.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 -134 L10 -113 L20 -113" stroke="${SKIN}" stroke-width="5.6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M2 -134 L6 -124" stroke="#B91C1C" stroke-width="9" stroke-linecap="round"/>
  <circle cx="20.4" cy="-113" r="3.6" fill="${SKIN}" stroke="${L}" stroke-width="0.8"/></g>`;
const SOLDIER_BOX = [-40, -212, 80, 216];

const THORN = `<path d="M-2 -10 L2 -10 L0.6 12 L-0.6 12Z" fill="#78350F" stroke="${L}" stroke-width="0.6" transform="rotate(30)"/>`;
const PROPS = { e114_thorn: `<g transform="translate(0 -4) rotate(-60)">${THORN}</g>` };
const POSES = {
  e114_hide: { R: [-24, -70], L: [-24, -70], dy: 22, head: 14 },
  e114_reach: { R: [64, 72], L: [10, 4], head: 8 },
  e114_pull: { R: [34, 120], L: [10, 4], head: 2 },
  e114_angry: { R: [84, 96], L: [70, -40] },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const cypress = (x, h = 120) => `<g transform="translate(${x} ${FLOOR})"><rect x="-3" y="-14" width="6" height="14" fill="#78350F"/><path d="M0 ${-h} Q16 ${-h * 0.5} 12 -12 Q0 -6 -12 -12 Q-16 ${-h * 0.5} 0 ${-h}Z" fill="#166534" stroke="${L}"/></g>`;
const olive = (x) => `<g transform="translate(${x} ${FLOOR})"><path d="M-5 0 Q-2 -30 -10 -50 M3 0 Q4 -30 12 -48" stroke="#78350F" stroke-width="6" fill="none" stroke-linecap="round"/>
  <g class="ek-sway" style="transform-origin:0 -60px">${[[-20, -60, 22], [10, -70, 26], [28, -54, 18], [-4, -84, 20]].map(([cx, cy, r]) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#84A84C" stroke="${L}"/>`).join('')}</g></g>`;

function bg() {
  const villa = `<g><rect x="40" y="150" width="380" height="${FLOOR - 150}" fill="#FAF5EB" stroke="${L}" stroke-width="1.2"/>
    <path d="M24 152 L230 92 L436 152Z" fill="#C2410C" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${60 + i * 30} ${150 - (i < 6 ? i : 11 - i) * 9.5} V150" stroke="#9A3412" stroke-width="1" opacity="0.6"/>`).join('')}
    <rect x="40" y="152" width="380" height="10" fill="#E7E5E4" stroke="${L}"/>
    ${[90, 170, 330, 390].map((x) => `<rect x="${x - 9}" y="162" width="18" height="${FLOOR - 166}" fill="#F5F5F4" stroke="${L}"/><rect x="${x - 12}" y="162" width="24" height="6" fill="#E7E5E4" stroke="${L}" stroke-width="0.7"/><rect x="${x - 12}" y="${FLOOR - 8}" width="24" height="8" fill="#E7E5E4" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <path d="M${X.door - 34} ${FLOOR} V196 Q${X.door} 170 ${X.door + 34} 196 V${FLOOR}Z" fill="#57534E" stroke="${L}"/>
    <path d="M118 198 h30 v28 h-30Z M282 198 h30 v28 h-30Z" fill="#7DD3FC" stroke="${L}"/>
    <g transform="translate(150 ${FLOOR})"><path d="M-14 0 L-10 -30 H10 L14 0Z" fill="#C2410C" stroke="${L}"/><path d="M-6 -30 Q-12 -46 0 -54 Q12 -46 6 -30" fill="#22C55E" stroke="${L}"/></g></g>`;
  const hill = `<path d="M${X.cave0 - 140} ${FLOOR} Q${X.cave0 - 120} 150 ${X.cave0 + 20} 112 Q${X.hide + 40} 66 ${X.cave1 - 20} 106 Q${X.cave1 + 100} 150 ${X.cave1 + 120} ${FLOOR}Z" fill="#A8A29E" stroke="${L}" stroke-width="1.3"/>
    ${[[1040, 200, 30], [1130, 130, 22], [1330, 110, 26], [1490, 210, 30], [1460, 150, 18]].map(([x, y, r]) => `<path d="M${x - r} ${y} Q${x} ${y - r * 0.8} ${x + r} ${y}" stroke="#D6D3D1" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M${X.cave0} ${FLOOR} Q${X.cave0 - 6} 150 ${X.hide + 50} 140 Q${X.cave1 + 4} 150 ${X.cave1} ${FLOOR}Z" fill="#44403C" stroke="${L}" stroke-width="1.2"/>
    <ellipse cx="${(X.cave0 + X.cave1) / 2}" cy="${FLOOR - 2}" rx="150" ry="10" fill="#57534E"/>
    ${[X.cave0 + 60, X.hide + 10, X.cave1 - 70].map((x, i) => `<path d="M${x - 8} ${150 + i * 2} L${x} ${172 + (i % 2) * 10} L${x + 8} ${150 + i * 2}Z" fill="#78716C"/>`).join('')}`;
  const crowd = (y, x0, x1, skip) => Array.from({ length: Math.floor((x1 - x0) / 17) }, (_, i) => {
    const x = x0 + 8 + i * 17;
    if (skip.some(([a, b]) => x > a && x < b)) return '';
    const c = ['#FCA5A5', '#93C5FD', '#FDE68A', '#86EFAC', '#C4B5FD', '#F9A8D4'][i % 6], h = ['#3B2A22', '#78350F', '#1F2937', '#A16207'][i % 4];
    return `<g class="e114-fan" style="animation-delay:${(i % 5) * 0.08}s"><path d="M${x - 7} ${y + 16} Q${x} ${y + 4} ${x + 7} ${y + 16}Z" fill="${c}" stroke="${L}" stroke-width="0.6"/><circle cx="${x}" cy="${y}" r="6" fill="${SKIN}" stroke="${L}" stroke-width="0.6"/><path d="M${x - 6} ${y - 1} Q${x} ${y - 9} ${x + 6} ${y - 1}" fill="${h}"/></g>`;
  }).join('');
  const arena = `<g>
    <rect x="${X.ar0}" y="54" width="${W - X.ar0}" height="60" fill="#E7D3A8" stroke="${L}"/>
    ${Array.from({ length: 22 }, (_, i) => `<path d="M${X.ar0 + 14 + i * 32} 108 V80 Q${X.ar0 + 26 + i * 32} 66 ${X.ar0 + 38 + i * 32} 80 V108Z" fill="#A16207" opacity="0.55"/>`).join('')}
    <rect x="${X.ar0}" y="112" width="${W - X.ar0}" height="104" fill="#D6C29A" stroke="${L}"/>
    ${[136, 172].map((y) => `<path d="M${X.ar0} ${y + 18} H${W}" stroke="#B89F70" stroke-width="2"/>`).join('')}
    ${crowd(128, X.ar0, W, [[X.emp - 60, X.emp + 60]])}${crowd(164, X.ar0, W, [[X.emp - 60, X.emp + 60], [X.gate - 104, X.gate + 104]])}
    <rect x="${X.ar0}" y="210" width="${W - X.ar0}" height="${FLOOR - 210}" fill="#C8B48A" stroke="${L}"/>
    ${Array.from({ length: 10 }, (_, i) => `<path d="M${X.ar0 + 40 + i * 72} 210 V${FLOOR}" stroke="#A89268" stroke-width="1.4"/>`).join('')}
    <path d="M${X.entry - 30} ${FLOOR} V232 Q${X.entry} 214 ${X.entry + 30} 232 V${FLOOR}Z" fill="#3F3A36" stroke="${L}"/>
    <path d="M${X.gate - 100} ${FLOOR} V176 Q${X.gate} 128 ${X.gate + 100} 176 V${FLOOR}Z" fill="#292524" stroke="${L}" stroke-width="1.4"/>
    <rect x="${X.ar0}" y="${FLOOR}" width="${W - X.ar0}" height="${315 - FLOOR}" fill="#EAD7A4" stroke="${L}"/>
    <!-- lô hoàng đế -->
    <g transform="translate(${X.emp} 0)">
      <g transform="translate(0 -70)">
      <path d="M-62 132 H62 L54 150 Q0 160 -54 150Z" fill="#7E22CE" stroke="${L}"/><path d="M-62 132 H62" stroke="#FACC15" stroke-width="3"/>
      <path d="M-50 150 V214 M50 150 V214" stroke="#FACC15" stroke-width="4"/>
      <g class="e114-emp">
        <path d="M-22 214 V186 Q-20 170 0 168 Q20 170 22 186 V214Z" fill="#7E22CE" stroke="${L}"/><path d="M-14 172 Q2 190 18 214" stroke="#FAF5EB" stroke-width="6" fill="none"/>
        <g class="e114-arm" style="transform-origin:16px 178px"><path d="M16 178 L30 198" stroke="${L}" stroke-width="9.4" stroke-linecap="round"/><path d="M16 178 L30 198" stroke="#7E22CE" stroke-width="7.6" stroke-linecap="round"/><circle cx="31" cy="200" r="3.6" fill="${SKIN}" stroke="${L}" stroke-width="0.8"/></g>
        <g transform="translate(0 154)"><g class="e114-eh">${headOnly('e114_emp', { s: 0.8, mood: 'happy' })}</g><g class="e114-ew">${headOnly('e114_emp', { s: 0.8, mood: 'wow' })}</g>
          ${Array.from({ length: 7 }, (_, i) => `<ellipse cx="${-15 + i * 5}" cy="${-14 - Math.sin((i / 6) * Math.PI) * 5}" rx="3" ry="5.6" fill="#16A34A" stroke="${L}" stroke-width="0.5" transform="rotate(${-40 + i * 13} ${-15 + i * 5} ${-14 - Math.sin((i / 6) * Math.PI) * 5})"/>`).join('')}</g></g>
      <rect x="-56" y="194" width="112" height="20" fill="#FDE68A" stroke="${L}"/><path d="M-56 204 H56" stroke="#7E22CE" stroke-width="3"/></g>
      <path d="M-56 144 H56 V210 H-56Z" fill="#C8B48A" stroke="${L}"/><path d="M-40 160 H40 M-40 180 H40" stroke="#A89268" stroke-width="1.4"/></g></g>`;
  return `
  ${sky(0, W, 315, 'e114sky')}
  <g transform="translate(620 64)">${sun(22)}</g>
  ${cloud(200, 50, 0.9, 0)}${cloud(860, 60, 0.8, 2)}${cloud(1620, 48, 0.9, 4)}${cloud(2300, 36, 0.7, 1)}
  <path d="M0 214 Q300 160 640 206 T1300 190 T2000 200 T2650 190 V${FLOOR} H0Z" fill="#BEF264" stroke="${L}" stroke-width="0.8"/>
  <rect x="0" y="${FLOOR}" width="${W}" height="${315 - FLOOR}" fill="#D6B98A" stroke="${L}"/>
  ${villa}
  ${olive(520)}${cypress(600)}${olive(760)}${cypress(880, 100)}${cypress(1640, 110)}${olive(1760)}${cypress(1860, 130)}
  ${hill}
  ${arena}`;
}

function fg() {
  const mag = `<g class="e114-mag"><g transform="translate(1410 124)"><path d="M24 26 L44 48" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
    <circle r="36" fill="#FEF3C7" stroke="#57534E" stroke-width="5"/>
    <ellipse cx="0" cy="6" rx="22" ry="16" fill="#FBE3B5" stroke="${L}" stroke-width="1.2"/>${[-14, -5, 5, 14].map((x) => `<ellipse cx="${x}" cy="-14" rx="5.6" ry="6" fill="#FBE3B5" stroke="${L}" stroke-width="1"/>`).join('')}
    <ellipse cx="0" cy="8" rx="11" ry="8" fill="#F9A8D4" stroke="${L}" stroke-width="0.8"/>
    <g class="e114-bigthorn"><path d="M-2 10 L2 8 L14 -22 L10 -23Z" fill="#78350F" stroke="${L}" stroke-width="0.8"/></g></g>
    <g transform="translate(1410 72)">${label(0, 0, 'thorn', '#B45309', 15)}</g></g>`;
  const dog = `<g transform="translate(0 4) scale(0.7)"><ellipse cx="0" cy="0" rx="26" ry="12" fill="#B7794A" stroke="${L}"/><circle cx="26" cy="-14" r="11" fill="#B7794A" stroke="${L}"/>
    <path d="M18 -22 Q12 -10 16 -4" stroke="#7A4B2A" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="29" cy="-17" r="1.8" fill="#2B1D16"/><ellipse cx="36" cy="-12" rx="3" ry="2.2" fill="#2B1D16"/>
    <path d="M30 -6 q3 6 7 1Z" fill="#F472B6"/>${[-16, -6, 10, 18].map((x) => `<path d="M${x} 8 V22" stroke="#B7794A" stroke-width="5" stroke-linecap="round"/>`).join('')}
    <g class="e114-wag"><path d="M-24 -4 Q-40 -12 -38 -26" stroke="#B7794A" stroke-width="5" fill="none" stroke-linecap="round"/></g></g>`;
  const cave = `<g transform="translate(0 6) scale(0.8)"><path d="M-46 24 Q-44 -24 0 -30 Q44 -24 46 24Z" fill="#A8A29E" stroke="${L}"/><path d="M-26 24 Q-24 -8 0 -12 Q24 -8 26 24Z" fill="#44403C"/>
    <circle cx="-8" cy="10" r="5" fill="${SKIN}"/><circle cx="10" cy="10" r="7" fill="#9A4A1C"/><circle cx="10" cy="10" r="4.4" fill="#F3BE66"/></g>`;
  return `
  <!-- hang: bóng tối phủ bên trong, mép đá phía trên -->
  <path class="e114-shade" d="M${X.cave0} ${FLOOR} Q${X.cave0 - 6} 150 ${X.hide + 50} 140 Q${X.cave1 + 4} 150 ${X.cave1} ${FLOOR}Z" fill="#1C1917"/>
  <path d="M${X.cave0} ${FLOOR} Q${X.cave0 - 6} 150 ${X.hide + 50} 140 Q${X.cave1 + 4} 150 ${X.cave1} ${FLOOR}" stroke="#A8A29E" stroke-width="10" fill="none"/>
  <path d="M${X.cave0} ${FLOOR} Q${X.cave0 - 6} 150 ${X.hide + 50} 140 Q${X.cave1 + 4} 150 ${X.cave1} ${FLOOR}" stroke="${L}" stroke-width="1.2" fill="none" transform="translate(0 5)"/>
  <path d="M${X.hide - 40} ${FLOOR + 2} Q${X.hide - 42} ${FLOOR - 40} ${X.hide - 4} ${FLOOR - 44} Q${X.hide + 40} ${FLOOR - 42} ${X.hide + 42} ${FLOOR + 2}Z" fill="#78716C" stroke="${L}" stroke-width="1.1"/>
  <path d="M${X.hide - 26} ${FLOOR - 30} Q${X.hide - 8} ${FLOOR - 40} ${X.hide + 12} ${FLOOR - 36}" stroke="#A8A29E" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- song sắt cửa nhốt sư tử -->
  <g class="e114-bars">${Array.from({ length: 12 }, (_, i) => `<path d="M${X.gate - 88 + i * 16} ${i < 2 || i > 9 ? 168 : 146} V${FLOOR}" stroke="#44403C" stroke-width="4"/>`).join('')}<path d="M${X.gate - 96} 210 H${X.gate + 96} M${X.gate - 98} 248 H${X.gate + 98}" stroke="#44403C" stroke-width="4"/></g>
  ${mag}
  ${thought(1330, 104, 130, 72, `<g class="e114-dog">${dog}</g>`, [1290, 170], 'e114-th1')}
  ${thought(X.andro + 50, 110, 130, 76, cave, [X.andro + 40, 176], 'e114-th2')}
  <g class="e114-ang"><g transform="translate(${X.door + 70} 112)"><path d="M-8 -8 l5 5 M-3 -8 l-5 5 M2 -14 l5 5 M7 -14 l-5 5" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/></g></g>
  <!-- nhãn -->
  <g class="e114-lb e114-lb-ago">${label(300, 62, 'A long time ago', '#7C2D12', 18)}</g>
  <g class="e114-lb e114-lb-name">${speaker(X.door + 116, 122, 'Androcles', '#7C2D12')}</g>
  <g class="e114-lb e114-lb-cave">${label(X.hide + 50, 100, 'a dark cave', '#44403C', 16)}</g>
  <g class="e114-lb e114-lb-huge">${label(X.lionC + 50, 100, 'huge', '#DC2626', 22)}</g>
  <g class="e114-lb e114-lb-later">${label(1600, 70, 'Later', '#EA580C', 20)}</g>
  <g class="e114-lb e114-lb-rome">${label(X.cam + 30, 74, 'Rome', '#7E22CE', 22)}</g>
  <g class="e114-lb e114-lb-hungry">${label(X.gate - 50, 130, 'hungry', '#DC2626', 16)}</g>
  <g class="e114-lb e114-lb-free">${label(X.andro + 60, 120, 'free!', '#16A34A', 24)}</g>`;
}

const CSS = `
.e114-lb { opacity: 0; transition: opacity .3s; }
${['ago', 'name', 'cave', 'huge', 'later', 'rome', 'hungry', 'free'].map((k) => `.st-lb-${k} .e114-lb-${k}`).join(', ')} { opacity: 1; }
.e114-shade { opacity: .3; pointer-events: none; }
.e114-ang { opacity: 0; transition: opacity .2s; }
.st-angry .e114-ang { opacity: 1; animation: e114Ang .3s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 50%; }
@keyframes e114Ang { to { transform: scale(1.3); } }
.e114-mag { opacity: 0; transform: scale(.3); transform-origin: 1410px 134px; transition: opacity .25s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-mag .e114-mag { opacity: 1; transform: none; }
.st-nothorn .e114-bigthorn { opacity: 0; transform: translate(10px, -30px); transition: opacity .8s, transform 1.2s ease-out; }
.e114-th1, .e114-th2 { opacity: 0; transition: opacity .3s; }
.st-th1 .e114-th1, .st-th2 .e114-th2 { opacity: 1; }
.e114-wag { transform-origin: -24px -4px; animation: e114Wag .18s ease-in-out infinite alternate; }
@keyframes e114Wag { from { transform: rotate(-14deg); } to { transform: rotate(14deg); } }
.e114-bars { transition: transform 1s ease-in-out; }
.st-gate .e114-bars { transform: translateY(-120px); }
.e114-fan { transform-box: fill-box; }
.st-cheer .e114-fan { animation: e114Fan .3s ease-in-out infinite alternate; }
@keyframes e114Fan { to { transform: translateY(-4px); } }
.e114-ew { display: none; }
.st-wow .e114-ew { display: inline; } .st-wow .e114-eh { display: none; }
.e114-emp { transition: transform .4s; }
.st-stand .e114-emp { transform: translateY(-8px); }
.e114-arm { transition: transform .45s cubic-bezier(.3,1.4,.6,1); }
.st-raise .e114-arm { transform: rotate(-115deg); }
/* lính */
.es-thing.is-walk .e114-slA { animation: e114Step .3s ease-in-out infinite alternate; }
.es-thing.is-walk .e114-slB { animation: e114Step .3s ease-in-out infinite alternate-reverse; }
@keyframes e114Step { from { transform: rotate(-16deg); } to { transform: rotate(16deg); } }
.es-thing.is-walk .e114-sbob { animation: e114Bob .15s ease-in-out infinite alternate; }
@keyframes e114Bob { to { transform: translateY(-2px); } }
@media (prefers-reduced-motion: reduce) {
  .st-cheer .e114-fan, .e114-wag { animation-duration: .8s; }
  .es-thing.is-walk .e114-slA, .es-thing.is-walk .e114-slB { animation-duration: .6s; }
}
` + lionCss('e114');

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const LB = (k) => `st-lb-${k}`;

const BEATS = [
  { key: ['A long time ago', 'a poor servant called Androcles', 'ran away from his cruel master'], icon: '🏃', label: 'ran away', async play(st) {
    st.look(300);
    st.set(LB('ago')); st.sfx('ding', { vol: 0.35 });
    await st.wait(500);
    st.set(LB('name')); st.mood('andro', 'sad');
    st.pose('master', 'e114_angry'); st.act('master', 'no'); st.set('st-angry'); st.sfx('buzz-no', { vol: 0.5, rate: 0.8 });
    await st.wait(1100);
    off(st, LB('ago'), LB('name'));
    st.sfx('whoosh', { vol: 0.4 });
    await st.walk('andro', 980, { speed: 230, follow: true, lead: 60 });
    st.act('master', null); st.set('st-angry', false); st.pose('master', 'hips');
  } },
  { key: ['He hid in a dark cave'], icon: '🕳️', label: 'a dark cave', async play(st) {
    st.look(X.hide + 60);
    await st.walk('andro', X.hide, { speed: 150, follow: false });
    st.set(LB('cave')); st.sfx('wind', { vol: 0.4, rate: 0.7 });
    st.face('andro', 1); st.pose('andro', 'e114_hide'); st.mood('andro', 'sad');
    await st.wait(1200);
  } },
  { key: ['A huge lion came into the cave'], icon: '🦁', label: 'a huge lion', async play(st) {
    st.set(LB('cave'), false);
    st.look(X.hide + 90);
    st.show('lion', true);
    const go = st.walk('lion', X.lionC, { speed: 130, follow: false });
    for (let i = 0; i < 4; i++) { await st.wait(420); st.sfx('bump', { vol: 0.5, rate: 0.55 }); }
    await go;
    st.set(LB('huge')); st.sfx('pop', { vol: 0.4, rate: 0.7 });
    st.mood('andro', 'wow');
    await st.wait(700);
  } },
  { key: ['Androcles was scared', "the lion didn't attack him"], icon: '😨', label: 'scared', async play(st) {
    st.set(LB('huge'), false);
    st.act('andro', 'shiver'); st.mood('andro', 'wow');
    for (let i = 0; i < 3; i++) { st.sfx('tick', { vol: 0.5, rate: 0.6 }); await st.wait(320); }
    st.mood('lion', 'sad');
    await st.wait(300);
    st.act('lion', 'no'); st.sfx('buzz-no', { vol: 0.35 });
    await st.wait(900);
    st.act('lion', null); st.act('andro', null);
  } },
  { key: ['It held up its paw'], icon: '🐾', label: 'held up its paw', async play(st) {
    st.mood('lion', 'paw'); st.sfx('whoosh', { vol: 0.35, rate: 0.7 });
    await st.wait(500);
    st.mood('andro', 'happy');
    await st.wait(1000);
  } },
  { key: ['Androcles looked at the paw', 'he saw a big thorn in it'], icon: '🌵', label: 'a big thorn', async play(st) {
    st.pose('andro', 'stand');
    await st.walk('andro', X.hide + 20, { speed: 80, follow: false });
    st.pose('andro', 'e114_reach'); st.mood('andro', 'wow');
    await st.wait(300);
    st.set('st-mag'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
    st.sfx('ding', { vol: 0.4 });
    await st.wait(1100);
  } },
  { key: ['He pulled out the thorn slowly'], icon: '🤏', label: 'pulled out', async play(st) {
    st.pose('andro', 'e114_reach'); st.mood('andro', 'happy');
    await st.wait(400);
    st.hold('andro', 'e114_thorn');
    st.set('st-nothorn'); st.mood('lion', 'pawok');
    st.pose('andro', 'e114_pull');
    await st.wait(1300);
    st.sfx('pop', { vol: 0.6 });
    st.fx('sparkle', X.lionC - 80, FLOOR - 60, { quiet: true });
    await st.wait(500);
  } },
  { key: ['The lion licked his hand', 'like a friendly dog'], icon: '🐶', label: 'licked his hand', async play(st) {
    off(st, 'st-mag');
    st.hold('andro', null); st.pose('andro', 'e114_reach');
    st.mood('lion', 'joy'); st.act('lion', 'lick');
    st.sfx('slurp', { vol: 0.4 });
    st.mood('andro', 'joy');
    await st.wait(500);
    st.set('st-th1'); st.sfx('pop', { vol: 0.35 });
    st.fx('hearts', X.hide + 60, FLOOR - 160);
    await st.wait(1500);
    st.act('lion', null); st.pose('andro', 'stand');
  } },
  { key: ['Later, soldiers caught Androcles'], icon: '🛡️', label: 'soldiers caught him', async play(st) {
    off(st, 'st-th1', 'st-nothorn');
    st.set(LB('later')); st.sfx('ding', { vol: 0.35 });
    st.show('lion', false); st.mood('lion', 'happy');
    st.look(1600);
    await st.walk('andro', 1560, { speed: 140, follow: false });
    st.show('s1', true); st.show('s2', true);
    await st.loop('steps', () => Promise.all([
      st.walk('s1', 1640, { speed: 160, follow: false }),
      st.walk('s2', 1710, { speed: 160, follow: false }),
    ]), { vol: 0.8 });
    st.sfx('knock', { vol: 0.4, rate: 1.3 });
    st.set(LB('later'), false);
    st.mood('andro', 'sad'); st.pose('andro', 'cheer');
    await st.wait(1000);
  } },
  { key: ['an arena in Rome', 'with a hungry lion'], icon: '🏟️', label: 'arena in Rome', async play(st) {
    st.pose('andro', 'stand');
    st.place('andro', X.andro, FLOOR, 1);
    st.place('s1', X.entry - 10, FLOOR, 1); st.place('s2', X.entry + 50, FLOOR, -1);
    st.look(X.cam + 30, { instant: true });
    st.place('lion', X.gate, FLOOR, -1); st.show('lion', true); st.mood('lion', 'angry');
    st.set(LB('rome')); st.set('st-cheer'); st.sfx('cheer', { vol: 0.6 });
    await st.wait(900);
    st.set(LB('hungry')); st.act('lion', 'roar'); st.sfx('wind', { vol: 0.5, rate: 0.7 });
    st.act('andro', 'shiver');
    await st.wait(1100);
    st.act('lion', null);
  } },
  { key: ['When the lion ran to him, it stopped'], icon: '✋', label: 'it stopped', async play(st) {
    off(st, LB('rome'), LB('hungry'), 'st-cheer');
    st.set('st-gate'); st.sfx('ladder', { vol: 0.5 });
    await st.wait(800);
    st.sfx('whoosh', { vol: 0.6 });
    await st.walk('lion', X.stop, { speed: 320, follow: false });
    st.fx('poof', X.stop + 20, FLOOR - 10); st.mood('lion', 'wow');
    st.mood('andro', 'wow');
    await st.wait(1100);
    st.act('andro', null);
  } },
  { key: ['It was his friend from the cave'], icon: '🤗', label: 'his friend', async play(st) {
    st.mood('lion', 'joy'); st.act('lion', 'lick');
    st.set('st-th2'); st.sfx('pop', { vol: 0.35 });
    st.mood('andro', 'joy'); st.pose('andro', 'e114_reach');
    await st.wait(400);
    st.sfx('slurp', { vol: 0.4 });
    st.fx('hearts', X.andro + 50, FLOOR - 170);
    await st.wait(1300);
    st.act('lion', 'wag');
  } },
  { key: ['The emperor was so surprised', 'set them both free'], icon: '👑', label: 'set them free', async play(st) {
    st.set('st-th2', false); st.pose('andro', 'stand');
    st.set('st-wow'); st.set('st-stand'); st.sfx('pop', { vol: 0.4, rate: 0.8 });
    await st.wait(700);
    st.set('st-raise'); st.set(LB('free')); st.set('st-cheer');
    st.sfx('cheer', { vol: 0.7 });
    await st.wait(500);
    st.sfx('clap', { vol: 0.5 });
    st.pose('andro', 'cheer'); st.act('andro', 'hop');
    await st.wait(900);
    st.act('andro', null); st.pose('andro', 'stand');
    st.look(X.cam - 60, { dur: 1600 });
    await Promise.all([
      st.walk('andro', X.entry + 160, { speed: 120, follow: false }),
      st.walk('lion', X.entry + 290, { speed: 120, follow: false }),
    ]);
  } },
];

export default {
  id: 'en114', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 4, 6, 9, 12],
  cast: [
    { id: 'master', kind: 'adult', who: 'e114_master', x: X.door, face: 1 },
    { id: 'lion', kind: 'thing', x: 1720, s: 1.1, face: -1, svg: lionSvg('e114'), box: LION_BOX },
    { id: 's1', kind: 'thing', x: 1950, face: -1, svg: SOLDIER, box: SOLDIER_BOX },
    { id: 's2', kind: 'thing', x: 2020, face: -1, svg: SOLDIER, box: SOLDIER_BOX },
    { id: 'andro', kind: 'adult', who: 'e114_andro', x: 360 },
  ],
  init(st) { for (const id of ['lion', 's1', 's2']) st.show(id, false); },
};
