/**
 * Bài 89 "Although It Was Raining" (although / despite / however): ngày chạy từ thiện của trường dưới mưa to, đi từ trái sang
 * phải: cổng trường + cổng chào "CHARITY RUN" (học sinh che ô kéo tới) → chỗ xuất phát (Minh bị cảm, mẹ đo nhiệt độ, bố là bác
 * sĩ đeo ống nghe) → đường chạy ướt có biển "trơn trượt" và hai vũng nước (Tom ngã ở vũng thứ hai, lấm bùn, đứng dậy chạy tiếp)
 * → quầy bánh của Lan (hộp quyên góp, tranh bệnh viện nhi) → bảng tổng tiền và cô Hoa (mưa tạnh, cầu vồng).
 * Mưa là một lớp mẫu vạch rơi phủ cả thế giới (fg), bật bằng st-rain.
 * Toạ độ cảnh: rộng 2000, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, schoolFront, speaker, thought } from '../kit.js';

const FLOOR = 282;
const W = 2100;
const X = { school: 200, arch: 470, mum: 650, minh: 710, dad: 774, track0: 800, sign: 880, p1: 975, p2: 1250, track1: 1500, stall: 1580, box: 1630, hoa: 1840, board: 1990 };
const SPEED = 130, RUN = 150;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e089_tom_mud: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#9A7B5A', bottom: 'shorts', bottomC: '#5B4330', shoe: '#6B4A2A', bag: '#22C55E' },
  e089_tom_run: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#22C55E', bottom: 'shorts', bottomC: '#334155', shoe: '#16A34A', bag: '#22C55E' },
  e089_minh_run: { hair: 'spiky', top: 'tee', shirt: '#FB923C', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F59E0B', bag: '#F59E0B' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Ô người lớn cầm (gốc = bàn tay, cán dựng lên 100 đơn vị khi tay buông). */
const UMB = (c) => `<g transform="rotate(180)"><path d="M0 -4 V100" stroke="${L}" stroke-width="1.8"/><path d="M0 -4 q0 -6 -5 -6" stroke="${L}" stroke-width="1.8" fill="none"/>
  <path d="M-42 100 Q0 140 42 100 Q31 94 21 100 Q10 94 0 100 Q-10 94 -21 100 Q-31 94 -42 100Z" fill="${c}" stroke="${L}" stroke-width="1"/><path d="M0 100 V138" stroke="${L}" stroke-width="0.8" opacity="0.5"/></g>`;
const THERMO = `<g transform="translate(0 -6) rotate(-90)"><rect x="-2" y="-14" width="4" height="22" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/><rect x="-0.8" y="-4" width="1.6" height="11" fill="#EF4444"/><circle cx="0" cy="8" r="3" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g>`;
const PROPS = { e089_umbBlue: UMB('#3B82F6'), e089_umbRed: UMB('#EF4444'), e089_umbPink: UMB('#F472B6'), e089_thermo: THERMO };
/** Ống nghe bác sĩ quanh cổ (pp-chest, gốc giữa ngực). */
const STETHO = `<path d="M-9 -24 Q-12 -6 -2 0 M9 -24 Q12 -6 2 0" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M0 0 Q2 8 8 10" stroke="#334155" stroke-width="2" fill="none"/>
  <circle cx="10" cy="11" r="4" fill="#CBD5E1" stroke="${L}" stroke-width="0.8"/>`;
const MUD = `<g fill="#6B4A2A" opacity="0.85"><ellipse cx="-7" cy="-6" rx="5" ry="3.4"/><ellipse cx="6" cy="2" rx="4" ry="3"/><ellipse cx="-2" cy="10" rx="6" ry="3"/><circle cx="9" cy="-10" r="2.2"/></g>`;
const CAKE = `<path d="M-9 4 H9 L7 -4 H-7Z" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><path d="M-7 -4 Q0 -12 7 -4Z" fill="#FBCFE8" stroke="${L}" stroke-width="0.8"/><circle cx="0" cy="-9" r="2" fill="#EF4444"/>`;
const CAKE_CHEST = `<g transform="translate(0 -6)">${CAKE}</g>`;
const COIN = `<circle r="6" fill="#FACC15" stroke="#A16207" stroke-width="1.2"/><path d="M-2 -2 h4 M-2 2 h4" stroke="#A16207" stroke-width="1"/>`;
const NOTE = `<rect x="-10" y="-6" width="20" height="12" rx="1.5" fill="#86EFAC" stroke="#15803D" stroke-width="1"/><circle r="3" fill="none" stroke="#15803D" stroke-width="0.9"/>`;

/** Một bạn nhỏ che ô (gốc = chân), dùng cho đám đông học sinh. */
const kidUmb = (x, who, shirt, umb, d) => `<g transform="translate(${x} 0)"><g class="e089-kid" style="animation-delay:${d}s">
  <path d="M-5 -2 V-30 M5 -2 V-30" stroke="${L}" stroke-width="7" stroke-linecap="round"/><path d="M-5 -2 V-30 M5 -2 V-30" stroke="#1E3A6E" stroke-width="5.2" stroke-linecap="round"/>
  <rect x="-15" y="-78" width="30" height="40" rx="8" fill="${shirt}" stroke="${L}"/>
  <path d="M12 -70 L18 -60" stroke="${L}" stroke-width="6" stroke-linecap="round"/><path d="M18 -60 V-150" stroke="${L}" stroke-width="1.6"/>
  <g transform="translate(0 -101)">${headOnly(who, { mood: 'happy' })}</g>
  <path d="M-30 -146 Q18 -186 66 -146 Q54 -152 42 -146 Q30 -152 18 -146 Q6 -152 -6 -146 Q-18 -152 -30 -146Z" fill="${umb}" stroke="${L}" stroke-width="1"/></g></g>`;
const CROWD = [['linh', '#FDE68A', '#F472B6'], ['nam', '#BFDBFE', '#22C55E'], ['mai', '#FCD34D', '#A855F7'], ['bon', '#FB923C', '#3B82F6'], ['thao', '#F9A8D4', '#F59E0B'], ['nam', '#A7F3D0', '#EF4444'], ['linh', '#C4B5FD', '#0EA5E9']]
  .map(([who, sh, u], i) => kidUmb(-150 + i * 50, who, sh, u, -i * 0.13)).join('');

const POSES = {
  e089_cough: { R: [30, -150], L: [10, 4], head: 10 },
  e089_feel: { R: [70, 92], L: [10, 4], head: 8 },
  e089_fall: { R: [160, 176], L: [150, 170], head: -10 },
  e089_umb: { R: [12, 8], L: [10, 4] },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const puddle = (x, rx, cls) => `<g class="${cls}"><ellipse cx="${x}" cy="${FLOOR + 6}" rx="${rx}" ry="7" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/>
  <ellipse cx="${x - rx * 0.3}" cy="${FLOOR + 4}" rx="${rx * 0.3}" ry="2" fill="#E0F2FE" opacity="0.8"/>
  <g class="e089-ring"><ellipse cx="${x + rx * 0.2}" cy="${FLOOR + 6}" rx="8" ry="2.4" fill="none" stroke="#fff" stroke-width="1.2"/></g></g>`;
/** Bảng tổng tiền (tâm x), số đổi theo trạng thái st-n1..st-n4. */
const totalBoard = (x) => `<g transform="translate(${x} 0)"><path d="M-46 ${FLOOR} L-36 150 M46 ${FLOOR} L36 150" stroke="#92400E" stroke-width="5"/>
  <rect x="-62" y="96" width="124" height="80" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <text x="0" y="116" text-anchor="middle" ${NUN} font-size="12" fill="#0F766E">WE COLLECTED</text>
  ${['0', '5,000,000', '12,000,000', '20,000,000'].map((t, i) => `<text class="e089-n e089-n${i}" x="0" y="146" text-anchor="middle" ${NUN} font-size="${i === 3 ? 19 : 18}" fill="${i === 3 ? '#DC2626' : '#1E3A8A'}">${t}</text>`).join('')}
  <text x="0" y="166" text-anchor="middle" ${NUN} font-size="12" fill="#1E3A8A">dong</text>
  <g transform="translate(-40 ${FLOOR})"><path d="M-16 0 V-30 Q-16 -36 -10 -36 H10 Q16 -36 16 -30 V0Z" fill="#E0F2FE" fill-opacity="0.85" stroke="${L}" stroke-width="1"/>
    <g class="e089-jar1"><ellipse cx="0" cy="-5" rx="13" ry="4" fill="#FACC15" stroke="#A16207" stroke-width="0.8"/></g>
    <g class="e089-jar2"><rect x="-13" y="-16" width="26" height="9" fill="#FACC15" stroke="#A16207" stroke-width="0.8"/></g>
    <g class="e089-jar3"><rect x="-13" y="-28" width="26" height="12" fill="#86EFAC" stroke="#15803D" stroke-width="0.8"/></g></g></g>`;

function bg() {
  const track = `<rect x="${X.track0}" y="${FLOOR - 8}" width="${X.track1 - X.track0}" height="${315 - FLOOR + 8}" fill="#C2410C" stroke="${L}"/>
    <path d="M${X.track0} ${FLOOR + 10} H${X.track1} M${X.track0} ${FLOOR + 26} H${X.track1}" stroke="#FED7AA" stroke-width="2"/>
    <rect x="${X.track0 + 6}" y="${FLOOR - 8}" width="6" height="40" fill="#fff"/>`;
  return `
  ${sky(0, W, 315, 'e089sky')}
  ${cloud(140, 60, 0.9, 0)}${cloud(620, 48, 0.8, 2)}${cloud(1100, 64, 1, 4)}${cloud(1500, 50, 0.8, 1)}
  <!-- cầu vồng (hiện khi mưa tạnh) -->
  <g class="e089-rainbow">${['#EF4444', '#F59E0B', '#FDE047', '#22C55E', '#3B82F6', '#8B5CF6'].map((c, i) => `<path d="M${X.hoa - 170 + i * 8} ${FLOOR - 20} A${190 - i * 8} ${170 - i * 8} 0 0 1 ${X.hoa + 210 - i * 8} ${FLOOR - 20}" stroke="${c}" stroke-width="8" fill="none" opacity="0.8"/>`).join('')}</g>
  <!-- đồi + cây phía sau -->
  <path d="M0 230 Q300 196 600 226 T1200 220 T2000 226 V${FLOOR} H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(1030, 236, 0.62)}${tree(1120, 232, 0.6, '')}${tree(1470, 236, 0.7)}
  ${schoolFront(X.school, FLOOR)}
  <!-- sân trường -->
  <rect x="0" y="${FLOOR - 6}" width="${X.track0}" height="${315 - FLOOR + 6}" fill="#D6D3D1" stroke="${L}"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 62} ${FLOOR - 6} V315" stroke="#A8A29E" stroke-width="1"/>`).join('')}
  ${track}
  <rect x="${X.track1}" y="${FLOOR - 6}" width="${W - X.track1}" height="${315 - FLOOR + 6}" fill="#86EFAC" stroke="${L}"/>
  ${puddle(X.p1, 34, 'e089-pud')}${puddle(X.p2, 46, 'e089-pud')}
  ${puddle(380, 26, 'e089-pud e089-yardpud')}
  <!-- biển báo trơn trượt -->
  <g class="e089-sign" transform="translate(${X.sign} ${FLOOR - 8})"><path d="M0 0 V-58" stroke="#78716C" stroke-width="4"/>
    <g class="e089-signhead"><path d="M0 -112 L30 -60 H-30Z" fill="#FDE047" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
    <circle cx="-4" cy="-92" r="4" fill="${L}"/><path d="M-6 -86 L2 -76 L10 -72 M2 -76 L-8 -68 M-2 -82 L8 -88" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round"/><path d="M-18 -66 H16" stroke="${L}" stroke-width="2"/></g></g>
  <!-- quầy bánh của Lan -->
  <g transform="translate(${X.stall} 0)">
    <path d="M-76 120 L0 92 L76 120Z" fill="#F472B6" stroke="${L}" stroke-width="1.2"/>
    ${[-60, -30, 0, 30, 60].map((dx, i) => `<path d="M${dx - 15} 120 q15 12 30 0" fill="${i % 2 ? '#fff' : '#F472B6'}" stroke="${L}" stroke-width="0.7"/>`).join('')}
    <path d="M-70 120 V${FLOOR} M70 120 V${FLOOR}" stroke="#92400E" stroke-width="4"/>
    <rect x="-46" y="128" width="92" height="22" rx="5" fill="#fff" stroke="${L}"/><text x="0" y="144" text-anchor="middle" ${NUN} font-size="13" fill="#DB2777">CAKES</text></g>
  <!-- tranh bệnh viện nhi -->
  <g class="e089-hosp" transform="translate(${X.stall + 125} 140)"><path d="M0 ${FLOOR - 140} V40" stroke="#78716C" stroke-width="4"/>
    <rect x="-40" y="-34" width="80" height="74" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/>
    <rect x="-26" y="-14" width="52" height="40" fill="#E0F2FE" stroke="${L}" stroke-width="0.9"/><path d="M-30 -14 L0 -28 L30 -14Z" fill="#93C5FD" stroke="${L}" stroke-width="0.9"/>
    <rect x="-5" y="-6" width="10" height="20" fill="#EF4444"/><rect x="-10" y="-1" width="20" height="10" fill="#EF4444"/>
    <rect x="-6" y="14" width="12" height="12" fill="#B45309"/>
    <path d="M18 -4 q-4 -5 0 -7 q4 -2 4 3 q0 -5 4 -3 q4 2 0 7 l-4 4Z" fill="#F43F5E"/></g>
  ${totalBoard(X.board)}
  ${bush(560, FLOOR + 30, 0.6)}${bush(1840, FLOOR + 30, 0.6, '#4ADE80')}`;
}

function fg() {
  const arch = `<g transform="translate(${X.arch} 0)"><path d="M-80 ${FLOOR} V140 M80 ${FLOOR} V140" stroke="#2563EB" stroke-width="7"/>
    <g class="e089-banner"><rect x="-90" y="110" width="180" height="40" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/>
      <text x="8" y="137" text-anchor="middle" ${NUN} font-size="20" fill="#DC2626">CHARITY RUN</text>
      <path d="M-74 126 q-5 -6 0 -9 q5 -3 5 3 q0 -6 5 -3 q5 3 0 9 l-5 5Z" fill="#F43F5E"/></g></g>`;
  const table = `<rect x="${X.stall - 60}" y="${FLOOR - 50}" width="120" height="50" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="${X.stall - 64}" y="${FLOOR - 56}" width="128" height="8" rx="2" fill="#B45309" stroke="${L}"/>
    ${[-40, -18, 4].map((dx) => `<g transform="translate(${X.stall + dx} ${FLOOR - 58})">${CAKE}</g>`).join('')}
    <g transform="translate(${X.box} ${FLOOR - 56})"><rect x="-16" y="-26" width="32" height="26" rx="2" fill="#FDA4AF" stroke="${L}"/><rect x="-8" y="-27" width="16" height="3" fill="${L}"/>
      <path d="M-4 -12 q-4 -5 0 -7 q4 -2 4 3 q0 -5 4 -3 q4 2 0 7 l-4 4Z" fill="#fff"/></g>`;
  return `
  ${arch}
  ${table}
  <!-- trời u ám + mưa -->
  <g class="e089-rain"><rect x="0" y="0" width="${W}" height="315" fill="#334155" opacity="0.2"/>
    <defs><pattern id="e089rainP" width="40" height="60" patternUnits="userSpaceOnUse"><path d="M6 4 l-4 14 M26 30 l-4 14 M18 48 l-3 10 M34 10 l-3 10" stroke="#E0F2FE" stroke-width="1.6" stroke-linecap="round"/></pattern></defs>
    <rect class="e089-fall" x="0" y="-60" width="${W}" height="375" fill="url(#e089rainP)" opacity="0.85"/></g>
  <!-- nhãn -->
  <g class="e089-lb e089-lb-sat">${label(250, 64, 'last Saturday', '#7C3AED', 16)}</g>
  <g class="e089-lb e089-lb-crowd">${label(300, 64, 'more than 200 students', '#1D4ED8', 15)}</g>
  <g class="e089-lb e089-lb-heavy">${label(470, 92, 'raining heavily', '#0369A1', 14)}</g>
  <g class="e089-lb e089-lb-sore">${label(X.minh - 80, 100, 'a sore throat', '#DC2626', 14)}</g>
  <g class="e089-lb e089-lb-temp">${label(X.mum + 22, 112, '38°C', '#DC2626', 15)}</g>
  <g class="e089-lb e089-lb-worried">${label(X.mum - 10, 60, 'worried', '#7C3AED', 15)}</g>
  <g class="e089-lb e089-lb-doctor">${label(X.dad + 30, 60, 'a doctor', '#0F766E', 15)}</g>
  <g class="e089-lb e089-lb-short">${label(X.track0 + 70, 124, 'a short run', '#EA580C', 14)}<path d="M${X.track0 + 10} 146 H${X.track0 + 130}" stroke="#EA580C" stroke-width="4" stroke-linecap="round"/><path d="M${X.track0 + 120} 138 L${X.track0 + 130} 146 L${X.track0 + 120} 154" stroke="#EA580C" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e089-lb e089-lb-wet">${label(X.sign + 100, 92, 'wet and slippery', '#0369A1', 15)}</g>
  <g class="e089-lb e089-lb-laugh">${label(X.p1 + 30, 92, 'ran and laughed', '#16A34A', 15)}</g>
  <g class="e089-lb e089-lb-puddle">${label(X.p2, 92, 'fell over in a puddle', '#0369A1', 14)}</g>
  <g class="e089-lb e089-lb-mud">${label(X.p2 + 40, 92, 'covered in mud', '#92400E', 15)}</g>
  <g class="e089-lb e089-lb-kept">${label(X.p2 + 180, 120, 'kept running', '#16A34A', 14)}</g>
  <g class="e089-lb e089-lb-norun">${label(X.stall - 20, 66, 'did not run', '#DC2626', 15)}</g>
  <g class="e089-lb e089-lb-raised">${label(X.stall - 10, 66, 'raised money', '#16A34A', 15)}</g>
  <g class="e089-lb e089-lb-total">${label(X.board - 90, 66, 'twenty million dong', '#DC2626', 15)}</g>
  <g class="e089-lb e089-lb-wonder">${label(X.hoa + 40, 64, 'a wonderful day', '#DB2777', 16)}</g>
  <g class="e089-lb e089-lb-hoa">${speaker(X.hoa, 110, 'Ms Hoa')}</g>
  <!-- Minh nghĩ: muốn chạy -->
  ${thought(X.minh + 70, 104, 92, 62, `<g transform="translate(-14 4)"><path d="M-20 10 H20" stroke="#C2410C" stroke-width="6"/><path d="M14 -14 V10" stroke="${L}" stroke-width="2"/><path d="M14 -14 h14 l-4 5 l4 5 h-14Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/>
    <path d="M-14 4 q2 -10 10 -10 l6 1 q4 2 2 6 l-4 4Z" fill="#F59E0B" stroke="${L}" stroke-width="0.9"/></g>`, [X.minh + 14, 158], 'e089-think')}`;
}

const LB = ['sat', 'crowd', 'heavy', 'sore', 'temp', 'worried', 'doctor', 'short', 'wet', 'laugh', 'puddle', 'mud', 'kept', 'norun', 'raised', 'total', 'wonder', 'hoa'];
const CSS = `
.e089-lb { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e089-lb-${k}`).join(', ')} { opacity: 1; }
.e089-banner { transform-origin: ${X.arch}px 130px; transform: scaleX(.05); opacity: 0; transition: transform .7s cubic-bezier(.3,1.3,.6,1), opacity .2s; }
.st-banner .e089-banner { transform: none; opacity: 1; }
.e089-rain { opacity: 0; transition: opacity .9s; }
.st-rain .e089-rain { opacity: 1; }
.e089-fall { animation: e089Fall .45s linear infinite; }
@keyframes e089Fall { from { transform: translate(0, 0); } to { transform: translate(-16px, 60px); } }
.e089-ring { transform-box: fill-box; transform-origin: center; opacity: 0; }
.st-rain .e089-ring { animation: e089Ring 1.1s ease-out infinite; }
@keyframes e089Ring { from { transform: scale(.3); opacity: 1; } to { transform: scale(2.2); opacity: 0; } }
.e089-signhead { transform-box: fill-box; transform-origin: 50% 100%; }
.st-sign .e089-signhead { animation: e089Wob .5s ease-in-out 2 alternate; }
@keyframes e089Wob { from { transform: rotate(-8deg) scale(1.1); } to { transform: rotate(8deg) scale(1.1); } }
.st-shine .e089-pud ellipse:first-child { fill: #93C5FD; }
.e089-think { opacity: 0; transform: scale(.4); transform-origin: ${X.minh + 20}px 150px; transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-think .e089-think { opacity: 1; transform: none; }
.e089-hosp { transition: transform .4s; transform-box: fill-box; transform-origin: 50% 100%; }
.st-hosp .e089-hosp { transform: scale(1.12); }
.e089-n { opacity: 0; } .e089-n0 { opacity: 1; }
.st-n1 .e089-n0, .st-n2 .e089-n0, .st-n3 .e089-n0 { opacity: 0; }
.st-n1 .e089-n1, .st-n2 .e089-n2, .st-n3 .e089-n3 { opacity: 1; }
.e089-jar1, .e089-jar2, .e089-jar3 { opacity: 0; transition: opacity .3s; }
.st-n1 .e089-jar1, .st-n2 .e089-jar1, .st-n2 .e089-jar2, .st-n3 .e089-jar1, .st-n3 .e089-jar2, .st-n3 .e089-jar3 { opacity: 1; }
.e089-rainbow { opacity: 0; transition: opacity 1.4s; }
.st-sunny .e089-rainbow { opacity: 1; }
.es-ac.is-walk .e089-kid { animation: e089Kid .3s ease-in-out infinite alternate; }
@keyframes e089Kid { to { transform: translateY(-3px); } }
/* Tom ngã: cả hình đổ về phía trước quanh bàn chân */
.e089-tom .es-flip > svg { transform-origin: 50% 97%; transition: transform .45s ease-in-out; }
.e089-tom.e089-down .es-flip > svg { transform: rotate(80deg) translateY(4px); transition: transform .3s cubic-bezier(.5,0,.9,.6); }
@media (prefers-reduced-motion: reduce) {
  .e089-fall { animation-duration: 1.2s; } .st-rain .e089-ring { animation-duration: 2.4s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Đổi trang phục không có làn khói (lấm bùn thì hiện ngay sau vệt nước bắn). */
const outfit = (st, id, who) => { const A = st.a(id); A.who = who; A.build(); };
const down = (st, on) => { st.a('tom').el.classList.toggle('e089-down', on); if (st.instant) st.snap(st.a('tom').el); };

const BEATS = [
  { key: ["the school's charity run"], icon: '🏃', label: 'charity run', async play(st) {
    st.look(330);
    st.set('st-lb-sat'); st.sfx('whoosh', { vol: 0.5 });
    st.set('st-banner');
    await st.wait(500);
    st.sfx('school-bell', { vol: 0.4 });
    st.pose('tom', 'wave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    await st.wait(1600);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['raining heavily', 'more than two hundred students came'], icon: '🌧️', label: 'raining heavily', async play(st) {
    off(st, 'st-lb-sat');
    st.look(330);
    st.set('st-rain'); st.set('st-lb-heavy');
    await st.loop('rain', async () => {
      await st.wait(700);
      st.set('st-lb-heavy', false); st.set('st-lb-crowd');
      await st.loop('steps', () => st.walk('crowd', 330, { speed: 120, follow: false }), { vol: 0.6 });
      st.mood('tom', 'joy');
      await st.wait(500);
    }, { vol: 0.8 });
  } },
  { key: ['Minh had a bad cold', 'despite his sore throat'], icon: '🤒', label: 'sore throat', async play(st) {
    off(st, 'st-lb-crowd');
    st.look(X.minh + 10);
    st.pose('minh', 'e089_cough'); st.mood('minh', 'sad');
    st.sfx('cough');
    await st.wait(700);
    st.set('st-lb-sore'); st.sfx('cough', { vol: 0.8 });
    await st.wait(900);
    st.set('st-think'); st.sfx('pop', { vol: 0.6 });
    st.pose('minh', 'cheer'); st.mood('minh', 'joy'); st.act('minh', 'hop');
    await st.wait(1500);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['Mum was worried'], icon: '😟', label: 'Mum was worried', async play(st) {
    off(st, 'st-think', 'st-lb-sore');
    st.look(X.minh + 10);
    st.hold('mum', 'e089_thermo'); st.pose('mum', 'e089_feel');
    await st.wait(600);
    st.sfx('beep'); st.set('st-lb-temp');
    st.mood('mum', 'sad'); st.mood('minh', 'sad');
    await st.wait(500);
    st.set('st-lb-worried');
    await st.wait(1000);
  } },
  { key: ['Dad, who is a doctor', 'a short run would be fine'], icon: '🩺', label: 'a doctor', async play(st) {
    off(st, 'st-lb-temp', 'st-lb-worried');
    st.hold('mum', null); st.pose('mum', 'stand');
    st.look(X.minh + 60);
    st.set('st-lb-doctor'); st.sfx('ding', { vol: 0.4 });
    st.face('dad', -1); st.act('dad', 'nod');
    await st.wait(700);
    st.act('dad', null); st.pose('dad', 'point'); st.face('dad', 1);
    st.set('st-lb-short'); st.sfx('whistle', { vol: 0.4 });
    await st.say('dad', 'A short run is fine.', 1700);
    st.pose('dad', 'stand'); st.face('dad', -1);
    st.mood('mum', 'happy'); st.mood('minh', 'joy');
    await st.wait(300);
  } },
  { key: ['wet and slippery'], icon: '⚠️', label: 'wet and slippery', async play(st) {
    off(st, 'st-lb-doctor', 'st-lb-short');
    await st.look(X.sign + 110, { dur: 900 });
    st.set('st-sign'); st.set('st-lb-wet'); st.sfx('drip');
    await st.wait(500);
    st.set('st-shine'); st.sfx('drip', { vol: 0.8 });
    await st.wait(700);
    st.sfx('splash', { vol: 0.4 });
    st.fx('drops', X.p1, FLOOR - 30);
    await st.wait(700);
  } },
  { key: ['Despite the rain', 'the children ran and laughed'], icon: '😆', label: 'ran and laughed', async play(st) {
    off(st, 'st-lb-wet', 'st-sign');
    outfit(st, 'tom', 'e089_tom_run');
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.look(X.p1 - 60, { dur: (X.p1 - X.minh) / RUN * 1000 });
    st.sfx('giggle', { vol: 0.6 });
    const t = st.walk('tom', X.p1 + 80, { speed: RUN, follow: false });
    const m = st.walk('minh', X.p1 - 10, { speed: RUN, follow: false });
    await st.wait(((X.p1 - 40 - X.minh) / RUN) * 1000);
    st.set('st-lb-laugh');
    st.sfx('splash', { vol: 0.7 }); st.fx('drops', X.p1, FLOOR - 10);
    await Promise.all([t, m]);
    st.sfx('giggle', { vol: 0.6 });
    await st.wait(300);
  } },
  { key: ['Tom fell over in a puddle'], icon: '💦', label: 'fell in a puddle', async play(st) {
    off(st, 'st-lb-laugh');
    st.look(X.p2 - 20, { dur: 1000 });
    const m = st.walk('minh', X.p2 - 110, { speed: RUN, follow: false });
    await st.walk('tom', X.p2 - 50, { speed: RUN, follow: false });
    st.pose('tom', 'e089_fall'); st.mood('tom', 'wow');
    down(st, true);
    await st.wait(220);
    st.sfx('splash'); st.sfx('bump', { vol: 0.6 });
    st.fx('drops', X.p2 - 10, FLOOR - 30, { n: 2 });
    st.set('st-lb-puddle');
    await m;
    st.mood('minh', 'wow');
    await st.wait(900);
  } },
  { key: ['covered in mud', 'he got up and kept running'], icon: '🟤', label: 'covered in mud', async play(st) {
    off(st, 'st-lb-puddle');
    st.look(X.p2 - 20);
    down(st, false); st.pose('tom', 'stand');
    outfit(st, 'tom', 'e089_tom_mud'); st.chest('tom', MUD);
    st.sfx('drip', { vol: 0.8 }); st.fx('drops', X.p2 - 50, FLOOR - 70);
    st.set('st-lb-mud'); st.mood('tom', 'wow');
    await st.wait(1200);
    st.pose('tom', 'cheer'); st.mood('tom', 'joy'); st.sfx('giggle', { vol: 0.5 });
    await st.wait(500);
    st.set('st-lb-mud', false); st.set('st-lb-kept');
    st.mood('minh', 'joy');
    await Promise.all([
      st.walk('tom', X.p2 + 120, { speed: RUN, lead: -20 }),
      st.walk('minh', X.p2 + 70, { speed: RUN, follow: false }),
    ]);
  } },
  { key: ['Lan did not run'], icon: '🙅', label: 'Lan did not run', async play(st) {
    off(st, 'st-lb-kept');
    await st.look(X.stall - 30, { dur: 900 });
    st.set('st-lb-norun'); st.sfx('pop', { vol: 0.5 });
    st.act('lan', 'no'); st.mood('lan', 'happy');
    await st.wait(1300);
    st.act('lan', null);
  } },
  { key: ['she sold cakes', "raised money for a children's hospital"], icon: '🧁', label: 'sold cakes', async play(st) {
    off(st, 'st-lb-norun');
    st.look(X.stall - 30);
    st.place('mum', X.stall - 170, FLOOR, 1);
    await st.walk('mum', X.stall - 90, { speed: SPEED, follow: false });
    st.pose('lan', 'give'); st.sfx('whoosh', { vol: 0.4 });
    await st.fly(CAKE, [X.stall - 10, FLOOR - 70], [X.stall - 90, FLOOR - 100], { size: 22, dur: 500 });
    st.pose('lan', 'stand'); st.chest('mum', CAKE_CHEST); st.pose('mum', 'carry');
    await st.wait(200);
    st.sfx('cash');
    await st.fly(NOTE, [X.stall - 80, FLOOR - 110], [X.box, FLOOR - 86], { size: 22, dur: 600 });
    st.set('st-lb-raised'); st.set('st-hosp'); st.mood('lan', 'joy');
    st.fx('hearts', X.stall + 125, 150, { quiet: true });
    await st.wait(1200);
  } },
  { key: ['the school collected twenty million dong'], icon: '💰', label: 'twenty million', async play(st) {
    off(st, 'st-lb-raised', 'st-hosp');
    st.chest('mum', null); st.pose('mum', 'stand');
    st.look(X.board - 120);
    for (const [n, from] of [[1, X.stall - 30], [2, X.box], [3, X.stall + 90]]) {
      st.sfx('cash', { vol: 0.8 });
      await st.fly(n === 3 ? NOTE : COIN, [from, FLOOR - 80], [X.board - 40, FLOOR - 30], { size: 18, dur: 550 });
      off(st, 'st-n1', 'st-n2'); st.set(`st-n${n}`);
      if (n === 3) { st.set('st-lb-total'); st.sfx('ding', { vol: 0.6 }); }
      await st.wait(180);
    }
    st.mood('hoa', 'joy');
    await st.wait(900);
  } },
  { key: ['Although we were all wet', 'it was a wonderful day'], icon: '🌈', label: 'a wonderful day', async play(st) {
    off(st, 'st-lb-total');
    st.place('minh', X.hoa - 72, FLOOR, 1); st.place('tom', X.hoa - 116, FLOOR, 1);
    st.walk('lan', X.hoa - 160, { speed: SPEED, follow: false, y: FLOOR });
    st.look(X.hoa - 20);
    st.set('st-lb-hoa'); st.mood('hoa', 'joy');
    await st.say('hoa', 'Although we were all wet...', 1500);
    st.set('st-rain', false); st.set('st-sunny'); st.hold('hoa', null); st.pose('hoa', 'open');
    st.sfx('birds', { vol: 0.5 });
    st.set('st-lb-wonder');
    await st.say('hoa', 'it was a wonderful day!', 1500);
    st.pose('minh', 'cheer'); st.pose('tom', 'cheer'); st.pose('lan', 'cheer');
    st.act('minh', 'jump'); st.act('tom', 'jump'); st.act('lan', 'jump');
    st.mood('minh', 'joy'); st.mood('tom', 'joy'); st.mood('lan', 'joy');
    st.sfx('cheer', { vol: 0.7 }); st.sfx('clap', { vol: 0.5 });
    await st.wait(1300);
  } },
];

export default {
  id: 'en089', worldW: W, floor: FLOOR, viewTop: 40, camStart: 80, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [1, 3, 6, 7, 10, 12],
  cast: [
    { id: 'crowd', kind: 'thing', x: -200, y: FLOOR - 26, s: 0.62, svg: CROWD, box: [-190, -200, 380, 204] },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: X.hoa, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.stall, y: FLOOR - 10, face: 1 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 596, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, face: 1 },
    { id: 'minh', kind: 'kid', who: 'e089_minh_run', x: X.minh, face: -1 },
    { id: 'dad', kind: 'adult', who: 'en_dad', x: X.dad, face: -1 },
  ],
  init(st) {
    st.a('tom').el.classList.add('e089-tom');
    st.chest('dad', STETHO);
    st.hold('dad', 'e089_umbBlue'); st.pose('dad', 'e089_umb');
    st.hold('hoa', 'e089_umbPink'); st.pose('hoa', 'e089_umb');
  },
};
