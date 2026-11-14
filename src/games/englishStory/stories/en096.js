/**
 * Bài 96 "The Flood Hero" (các thì kể chuyện: quá khứ đơn / tiếp diễn / hoàn thành): làng của ông ở Nam Định mùa lũ, đi từ trái
 * sang phải: nhà ông (cắt ngang: phòng ngủ, ông bà ngủ, chú chó già nằm cạnh giường, cửa chính, hiên cao ba bậc) → sân + con
 * đường làng bị nước lũ dâng ngập → nhà bác Ba bên kia đường (đèn dầu, bàn gỗ, mèo) → bờ tre, sông phía sau.
 * Đêm: lớp tối + mưa xiên. Nước dâng là một lớp nước trước nhân vật (che chân, che đáy thuyền). Quá khứ hoàn thành (bác Ba đã
 * bị đau chân tuần trước) hiện trong bong bóng nghĩ màu nâu cũ (hồi tưởng), có tờ lịch "last week".
 * Thuyền là một hình riêng (ông ngồi chèo, đèn bão ở mũi; bác Ba và mèo ngồi sau khi được đón).
 * Toạ độ cảnh: rộng 2000, cao 315, sàn ngoài sân y = 282, sàn nhà ông y = 250. Trạng thái cảnh là class st-* trên <svg>.
 */
import { CAST, headOnly, lying } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, label, thought, speaker, night, sun } from '../kit.js';

const FLOOR = 282;
const HF = 250; // sàn nhà ông (nhà cao, hiên ba bậc)
const WATER = 264; // mặt nước lũ khi đã dâng tới bậc thềm
const W = 2000;
const X = { bed1: 150, bed2: 290, dog: 384, door: 470, step: 520, boat0: 618, ba: 1300, chair: 1222, boat1: 1214, rep: 1100 };

Object.assign(CAST, {
  e096_ba: { adult: true, old: true, hair: 'short', hairC: '#D6D3D1', top: 'shirt', shirt: '#A8A29E', bottom: 'pants', bottomC: '#44403C', shoe: '#292524', beard: true },
  e096_rep: { adult: true, hair: 'bob', hairC: '#1F2937', top: 'blouse', shirt: '#EF4444', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#1C1917' },
});

const T = (x, y, s, size = 13, c = '#1E3A8A', w = 900) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="${w}" font-size="${size}" fill="${c}">${s}</text>`;
const CAT_FACE = (s = 1) => `<g transform="scale(${s})"><path d="M-9 -4 L-8 -16 L-1 -9Z M1 -9 L8 -16 L9 -4Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle r="9" fill="#fff" stroke="${L}"/>
  <circle cx="-3.4" cy="-1" r="1.5" fill="#22C55E"/><circle cx="3.4" cy="-1" r="1.5" fill="#22C55E"/><path d="M-1 2.6 h2 l-1 1.2Z" fill="#F9A8D4"/><path d="M-1 4 q1 1.6 2 0" stroke="${L}" stroke-width="0.6" fill="none"/></g>`;

// ── Thuyền nhỏ (gốc = giữa thân ở mặt nước, mũi sang phải): ông ngồi chèo (.e096-gp), bác Ba + mèo (.e096-full) ─────────
const SITTER = (who, shirt, x) => `<g transform="translate(${x} 0)"><path d="M-12 -6 L-11 -38 Q0 -44 11 -38 L12 -6Z" fill="${shirt}" stroke="${L}"/>
  <g transform="translate(0 -52)">${headOnly(who, { s: 0.92, mood: 'happy' })}</g></g>`;
const BOAT = `<g class="e096-boat">
  <g class="e096-gp">${SITTER('en_grandpa', '#FDE68A', -6)}
    <g transform="translate(4 -34)"><g class="e096-oar"><path d="M0 0 L22 34" stroke="#92400E" stroke-width="3" stroke-linecap="round"/><path d="M18 30 L28 46 L34 42 L24 26Z" fill="#B45309" stroke="${L}" stroke-width="0.8"/>
      <path d="M0 0 L16 22" stroke="${L}" stroke-width="6.4" stroke-linecap="round"/><path d="M0 0 L16 22" stroke="#FDE68A" stroke-width="5" stroke-linecap="round"/><circle cx="17" cy="23" r="3.6" fill="#F5D0B5" stroke="${L}" stroke-width="0.8"/></g></g></g>
  <g class="e096-ba">${SITTER('e096_ba', '#A8A29E', -40)}<g transform="translate(-40 -22)">${CAT_FACE(0.9)}</g></g>
  <g transform="translate(48 -16)"><path d="M0 0 V-22" stroke="#78350F" stroke-width="2"/><g transform="translate(0 -30)"><g class="e096-glow"><circle r="16" fill="#FDE047" opacity="0.4"/></g>
    <rect x="-5" y="-8" width="10" height="14" rx="2" fill="#FEF3C7" stroke="${L}"/><circle r="3.4" fill="#F59E0B"/><path d="M-5 -8 Q0 -14 5 -8" stroke="${L}" fill="none"/></g></g>
  <path d="M-66 -16 H66 Q60 6 40 10 H-44 Q-62 6 -66 -16Z" fill="#92400E" stroke="${L}" stroke-width="1.3"/><path d="M-62 -10 H62" stroke="#78350F" stroke-width="1.6"/>
  <path d="M-66 -16 H66" stroke="#B45309" stroke-width="4" stroke-linecap="round"/></g>`;

const PROPS = {
  e096_mic: `<g transform="rotate(180)"><rect x="-1.6" y="-2" width="3.2" height="14" fill="#1F2937"/><circle cy="15" r="4.4" fill="#475569" stroke="${L}" stroke-width="0.7"/><rect x="-4" y="4" width="8" height="5" fill="#DC2626"/></g>`,
};
const POSES = {
  e096_rep: { R: [70, 84], L: [10, 4], head: -4 },
  e096_hold: { R: [24, -86], L: [24, -86] },
  e096_reach: { R: [60, 78], L: [10, 4], head: 8 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  const bamboo = (x, h) => `<g><rect x="${x - 3}" y="${FLOOR - 6 - h}" width="6" height="${h}" fill="#65A30D" stroke="${L}" stroke-width="0.7"/><g class="ek-sway" style="transform-origin:${x}px ${FLOOR - 6 - h}px">${[0, 1, 2].map((i) => `<path d="M${x} ${FLOOR - h + 14 + i * 22} q${i % 2 ? -14 : 14} -6 ${i % 2 ? -24 : 24} 4 q${i % 2 ? 10 : -10} -2 ${i % 2 ? 24 : -24} -4Z" fill="#84CC16" stroke="${L}" stroke-width="0.6"/>`).join('')}</g></g>`;
  const sleepers = `<g class="e096-sl1">${lying(X.bed1, HF - 18, 'en_grandpa', { s: 0.82, len: 110, blanket: '#A5B4FC' })}</g>
    <g class="e096-sl2">${lying(X.bed2, HF - 18, 'en_grandma', { s: 0.82, len: 110, blanket: '#F9A8D4' })}</g>`;
  return `
  ${sky(0, W, 315, 'e096sky')}
  <g class="e096-day">${cloud(700, 60, 1, 0)}${cloud(1300, 50, 0.9, 2)}${cloud(1800, 66, 0.8, 4)}</g>
  <g class="e096-sun"><g transform="translate(860 70)">${sun(24)}</g></g>
  <g class="e096-grey"><rect x="0" y="0" width="${W}" height="315" fill="#64748B" opacity="0.35"/>
    ${[600, 1000, 1400, 1800].map((x, i) => `<g transform="translate(${x} ${50 + (i % 2) * 14})"><ellipse rx="70" ry="22" fill="#94A3B8"/><ellipse cx="-34" cy="-12" rx="34" ry="18" fill="#94A3B8"/><ellipse cx="30" cy="-14" rx="40" ry="20" fill="#A8B3C4"/></g>`).join('')}</g>
  <!-- sông phía sau + bờ -->
  <rect x="520" y="196" width="${W - 520}" height="30" fill="#7DD3FC" stroke="${L}" stroke-width="0.8"/>
  <g class="e096-river"><rect x="520" y="196" width="${W - 520}" height="30" fill="#0EA5E9" opacity="0.6"/></g>
  <path d="M520 226 Q800 216 1100 226 T1700 222 T${W} 226 V${FLOOR} H520Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${[1500, 1530, 1566, 1610, 1650, 1700, 1760, 1820, 1880, 1940].map((x, i) => bamboo(x, 110 + (i % 3) * 30)).join('')}
  ${bamboo(700, 130)}${bamboo(736, 100)}
  <path d="M520 ${FLOOR - 8} H${W}" stroke="#D6B98A" stroke-width="14"/>
  <!-- nhà ông: cắt ngang -->
  <rect x="0" y="40" width="${X.door + 50}" height="${HF - 40}" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
  <path d="M-10 52 L${X.door + 70} 52 L${X.door + 40} 14 H20Z" fill="#B91C1C" stroke="${L}" stroke-width="1.3"/>
  <rect x="0" y="${HF}" width="${X.step}" height="${315 - HF}" fill="#B45309" stroke="${L}"/>${Array.from({ length: 9 }, (_, i) => `<path d="M${i * 60} ${HF + 20} h40 M${i * 60 + 20} ${HF + 40} h40" stroke="#92400E" stroke-width="2"/>`).join('')}<rect x="0" y="${HF}" width="${X.step}" height="8" fill="#D6D3D1" stroke="${L}" stroke-width="0.8"/>
  ${[0, 1, 2].map((i) => `<rect x="${X.step + i * 17}" y="${HF + 10 + i * 10.6}" width="${(3 - i) * 17 + 4}" height="${315 - HF - 10 - i * 10.6}" fill="#F5F5F4" stroke="${L}" stroke-width="1.2"/>`).join('')}
  <!-- cửa sổ có mưa -->
  <rect x="190" y="84" width="90" height="70" fill="#334155" stroke="${L}"/><g class="e096-winrain">${[0, 1, 2, 3, 4].map((i) => `<path d="M${200 + i * 16} 90 l-5 14 M${206 + i * 16} 120 l-5 14" stroke="#BAE6FD" stroke-width="1.4"/>`).join('')}</g>
  <path d="M235 84 V154 M190 119 H280" stroke="#FEF3C7" stroke-width="4"/>
  <!-- lịch -->
  <g transform="translate(90 112)"><rect x="-30" y="-34" width="60" height="70" rx="3" fill="#fff" stroke="${L}"/><rect x="-30" y="-34" width="60" height="16" rx="3" fill="#DC2626"/>${T(0, -22, 'OCTOBER', 9, '#fff')}
    ${[1, 2, 3].map((d) => `<g class="e096-day${d}">${T(0, 18, String(d), 30, '#1F2937')}</g>`).join('')}</g>
  <!-- hai giường -->
  ${[X.bed1, X.bed2].map((x) => `<rect x="${x - 62}" y="${HF - 24}" width="124" height="10" rx="3" fill="#92400E" stroke="${L}"/><rect x="${x - 60}" y="${HF - 14}" width="8" height="14" fill="#78350F"/><rect x="${x + 52}" y="${HF - 14}" width="8" height="14" fill="#78350F"/>`).join('')}
  ${sleepers}
  <!-- cửa chính (mở được) -->
  <rect x="${X.door - 26}" y="${HF - 110}" width="52" height="110" fill="#1E293B" stroke="${L}"/>
  <g class="e096-door"><rect x="${X.door - 24}" y="${HF - 108}" width="48" height="108" fill="#B45309" stroke="${L}"/><path d="M${X.door - 16} ${HF - 96} h32 v40 h-32Z M${X.door - 16} ${HF - 46} h32 v36 h-32Z" fill="none" stroke="#78350F" stroke-width="1.4"/><circle cx="${X.door + 16}" cy="${HF - 54}" r="2.6" fill="#FACC15"/></g>
  <!-- nhà bác Ba: cắt ngang -->
  <g transform="translate(1290 0)"><path d="M-190 92 L0 34 L190 92Z" fill="#A16207" stroke="${L}" stroke-width="1.3"/>
    <rect x="-170" y="92" width="340" height="${FLOOR - 92}" fill="#FFEDD5" stroke="${L}" stroke-width="1.2"/>
    <rect x="70" y="120" width="70" height="56" fill="#334155" stroke="${L}"/><path d="M105 120 V176 M70 148 H140" stroke="#FFEDD5" stroke-width="3"/>
    <rect x="-150" y="118" width="40" height="40" fill="#FCD34D" stroke="${L}"/><path d="M-130 124 V152 M-146 138 H-114" stroke="#B45309" stroke-width="1.4"/>
    <!-- ghế -->
    <g transform="translate(${X.chair - 1290} ${FLOOR})"><rect x="-18" y="-42" width="36" height="6" fill="#92400E" stroke="${L}"/><rect x="-18" y="-82" width="6" height="46" fill="#92400E" stroke="${L}"/><path d="M-16 -36 V0 M16 -36 V0" stroke="#78350F" stroke-width="4"/></g>
    <!-- đèn dầu -->
    <g transform="translate(-40 150)"><path d="M-8 30 H8 L6 20 H-6Z" fill="#B45309" stroke="${L}"/><path d="M-6 20 Q-10 8 0 0 Q10 8 6 20Z" fill="#FEF9C3" stroke="${L}" stroke-width="0.8" opacity="0.9"/><g class="e096-flame"><path d="M0 16 Q-3 10 0 5 Q3 10 0 16Z" fill="#F97316"/></g>
      <path d="M-14 30 H14" stroke="${L}" stroke-width="2"/><path d="M-12 30 V${FLOOR - 180} M12 30 V${FLOOR - 180}" stroke="#78350F" stroke-width="3"/></g></g>`;
}

function fg() {
  const flash = `<g filter="url(#e096sepia)"><rect x="-70" y="-38" width="140" height="78" rx="10" fill="#FDE68A"/>
    <path d="M-70 26 H-30 V14 H-14 V2 H20 V40 H-70Z" fill="#D6D3D1" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(-36 4)"><path d="M-8 -6 L-8 -30 Q0 -34 8 -30 L8 -6Z" fill="#A8A29E" stroke="${L}"/><g transform="translate(0 -40)">${headOnly('e096_ba', { s: 0.6, mood: 'sad' })}</g>
      <path d="M-4 -6 L-6 18 M4 -6 L14 14" stroke="#44403C" stroke-width="5" stroke-linecap="round"/><rect x="9" y="4" width="8" height="8" rx="2" fill="#fff" stroke="${L}" stroke-width="0.6" transform="rotate(-30 13 8)"/>
      <path d="M-12 -24 L-16 20" stroke="#78350F" stroke-width="2.4"/></g>
    <g class="e096-ouch">${T(-6, -20, 'Ouch!', 11, '#DC2626')}</g>
    <g transform="translate(44 -6)"><rect x="-20" y="-24" width="40" height="46" rx="3" fill="#fff" stroke="${L}"/><rect x="-20" y="-24" width="40" height="11" rx="3" fill="#DC2626"/>${T(0, 4, 'last', 10, '#1F2937')}${T(0, 16, 'week', 10, '#1F2937')}</g></g>`;
  const paper = `<rect x="-80" y="-56" width="160" height="112" rx="3" fill="#F8FAFC" stroke="${L}" stroke-width="1.4"/>
    ${T(0, -38, 'VILLAGE NEWS', 11, '#475569')}<path d="M-72 -32 H72" stroke="${L}"/>
    ${T(0, -12, 'FLOOD HERO', 22, '#DC2626')}<rect x="-72" y="-2" width="54" height="50" fill="#BAE6FD" stroke="${L}" stroke-width="0.8"/>
    <g transform="translate(-45 26)">${headOnly('en_grandpa', { s: 0.8, mood: 'joy' })}</g>
    ${[4, 14, 24, 34, 44].map((y) => `<path d="M-10 ${y} H70" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round"/>`).join('')}`;
  const bub = (k, x, y, w, h, inner, [tx, ty]) => {
    const bx = Math.max(x - w / 2 + 18, Math.min(x + w / 2 - 18, tx)), by = y + h / 2;
    return `<g class="e096-b e096-b-${k}" style="transform-origin:${tx}px ${ty}px"><path d="M${bx - 9} ${by - 1} L${tx} ${ty} L${bx + 9} ${by - 1}Z" fill="#fff" stroke="${L}" stroke-width="1.4" stroke-linejoin="round"/>
      <rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="14" fill="#fff" stroke="${L}" stroke-width="1.4"/><path d="M${bx - 7.6} ${by - 1.2} L${tx} ${ty - 2} L${bx + 7.6} ${by - 1.2}Z" fill="#fff"/>
      <g transform="translate(${x} ${y})">${inner}</g></g>`;
  };
  return `
  <defs><filter id="e096sepia"><feColorMatrix type="matrix" values="0.393 0.769 0.189 0 0  0.349 0.686 0.168 0 0  0.272 0.534 0.131 0 0  0 0 0 1 0"/></filter></defs>
  <!-- bàn gỗ nhà bác Ba (trước chân bác) -->
  <g transform="translate(${X.ba} ${FLOOR})"><rect x="-44" y="-36" width="88" height="8" rx="2" fill="#92400E" stroke="${L}"/><path d="M-36 -28 V0 M36 -28 V0" stroke="#78350F" stroke-width="5"/></g>
  <!-- nước lũ -->
  <g class="e096-flood"><rect x="${X.step - 4}" y="${WATER}" width="${W - X.step + 4}" height="${330 - WATER}" fill="#0284C7" opacity="0.82"/>
    <path d="M${X.step - 4} ${WATER} H${W}" stroke="#BAE6FD" stroke-width="2"/>
    <g class="e096-ripple">${Array.from({ length: 36 }, (_, i) => `<path d="M${X.step + 10 + i * 42} ${WATER + 10 + (i % 3) * 12} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g></g>
  <!-- mưa -->
  <g class="e096-rain">${Array.from({ length: 90 }, (_, i) => `<path d="M${(i * 53) % W + (i % 7) * 4} ${(i * 37) % 300} l-6 16" stroke="#E0F2FE" stroke-width="1.6" stroke-linecap="round" opacity="0.8"/>`).join('')}</g>
  <g class="ek-night"><rect x="0" y="40" width="${X.step}" height="275" fill="#1E1B4B" opacity="0.4"/></g>${night(X.step, W - X.step, 315, 1640)}
  <!-- nhãn -->
  <g class="e096-lb e096-lb-oct">${label(300, 66, 'Last October', '#7C3AED', 15)}</g>
  <g class="e096-lb e096-lb-days">${label(300, 66, 'three days of rain', '#0369A1', 14)}</g>
  <g class="e096-lb e096-lb-sleep">${label(410, 70, 'while everyone was sleeping', '#4338CA', 13)}</g>
  <g class="e096-lb e096-lb-rose">${label(580, 150, 'the river rose', '#0284C7', 14)}<path d="M700 230 V184 M690 196 L700 184 L710 196" stroke="#0284C7" stroke-width="4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e096-lb e096-lb-bark">${label(X.dog, 160, 'barking loudly', '#B45309', 14)}</g>
  <g class="e096-lb e096-lb-steps">${label(X.step + 140, 186, 'had already reached', '#0284C7', 12)}${label(X.step + 140, 212, 'the steps', '#0284C7', 12)}<ellipse cx="${X.step + 26}" cy="${WATER}" rx="34" ry="8" fill="none" stroke="#FACC15" stroke-width="3"/></g>
  <g class="e096-lb e096-lb-alone">${label(X.chair, 108, 'lived alone', '#57534E', 15)}</g>
  <g class="e096-lb e096-lb-across">${label(880, 300, 'across the road', '#0F766E', 13)}<path d="M640 300 H800 M960 300 H1110 M1100 292 L1110 300 L1100 308" stroke="#0F766E" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  <g class="e096-lb e096-lb-dark">${label(900, 100, 'through the dark', '#FDE68A', 14)}</g>
  <g class="e096-lb e096-lb-table">${label(X.ba - 120, 92, 'standing on a table', '#B45309', 13)}${label(X.ba - 120, 118, 'holding his cat', '#DB2777', 13)}</g>
  <g class="e096-lb e096-lb-both">${label(X.boat1 + 10, 100, 'both into the boat', '#16A34A', 14)}</g>
  <g class="e096-lb e096-lb-morning">${label(720, 70, 'The next morning', '#EA580C', 15)}</g>
  <g class="e096-lb e096-lb-sp-gpa">${speaker(588, 108, 'Grandpa')}</g>
  <g class="e096-lb e096-lb-hero">${label(700, 66, 'the flood hero', '#DC2626', 18)}</g>
  <!-- bong bóng -->
  <g class="e096-th" style="transform-origin:${X.door - 10}px 138px">${thought(X.door - 110, 96, 190, 104, flash, [X.door - 14, 136])}</g>
  ${bub('any', 744, 76, 196, 54, `${T(0, -3, 'I only did what', 13)}${T(0, 14, 'anyone would do.', 13, '#EA580C')}`, [636, 112])}
  <g class="e096-paper" style="transform-origin:800px 120px"><g transform="translate(806 108) rotate(-3) scale(0.85)">${paper}</g></g>`;
}

const CSS = `
.e096-lb { opacity: 0; transition: opacity .35s; }
${['oct', 'days', 'sleep', 'rose', 'bark', 'steps', 'alone', 'across', 'dark', 'table', 'both', 'morning', 'sp-gpa', 'hero'].map((k) => `.st-lb-${k} .e096-lb-${k}`).join(', ')} { opacity: 1; }
.e096-day1, .e096-day2, .e096-day3 { opacity: 0; transition: opacity .2s; }
.st-d1 .e096-day1, .st-d2 .e096-day2, .st-d3 .e096-day3 { opacity: 1; } .st-d2 .e096-day1, .st-d3 .e096-day2 { opacity: 0; }
.e096-grey, .e096-rain, .e096-winrain { opacity: 0; transition: opacity .6s; }
.st-rain .e096-grey, .st-rain .e096-rain, .st-rain .e096-winrain { opacity: 1; }
.st-rain .e096-rain { animation: e096Rain .5s linear infinite; } .st-rain .e096-winrain { animation: e096Rain .5s linear infinite; }
@keyframes e096Rain { from { transform: translate(0, -12px); } to { transform: translate(-6px, 14px); } }
.e096-sun { opacity: 0; transition: opacity .8s; } .st-morning .e096-sun { opacity: 1; } .st-morning .e096-grey { opacity: 0; }
.st-night .ek-night { opacity: 1; }
.e096-flood { transform: translateY(56px); transition: transform 2.6s ease-in-out; }
.st-rise .e096-flood { transform: none; } .st-low .e096-flood { transform: translateY(40px); }
.e096-river { opacity: 0; transition: opacity 1s; } .st-rise .e096-river { opacity: 1; }
.e096-ripple { animation: e096Rip 2s ease-in-out infinite alternate; } @keyframes e096Rip { to { transform: translateX(14px); } }
.e096-sl1 { transition: opacity .3s; } .st-up .e096-sl1 { opacity: 0; } .e096-sl2 { transition: opacity .3s; } .st-up2 .e096-sl2 { opacity: 0; }
.e096-door { transform-origin: ${X.door - 24}px 0px; transition: transform .5s ease-out; } .st-open .e096-door { transform: scaleX(.12); }
.e096-th, .e096-b, .e096-paper { opacity: 0; transform: scale(.35); transition: opacity .25s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-th .e096-th, .st-b-any .e096-b-any, .st-paper .e096-paper { opacity: 1; transform: none; }
.e096-ouch { opacity: 0; } .st-th .e096-ouch { animation: e096Ouch .6s ease-out .5s both; } @keyframes e096Ouch { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.e096-flame { transform-box: fill-box; transform-origin: 50% 100%; animation: e096Flame .3s ease-in-out infinite alternate; } @keyframes e096Flame { to { transform: scaleY(.75); } }
.es-ac[data-id="dog"] .es-flip { filter: grayscale(.55) brightness(1.05); }
.es-ac[data-id="boat"] .e096-gp, .es-ac[data-id="boat"] .e096-ba { opacity: 0; transition: opacity .3s; }
.es-ac[data-id="boat"].e096-g .e096-gp, .es-ac[data-id="boat"].e096-full .e096-ba { opacity: 1; }
.es-ac[data-id="boat"] .e096-glow { opacity: 0; } .es-ac[data-id="boat"].e096-lamp .e096-glow { opacity: 1; animation: e096Glow .8s ease-in-out infinite alternate; }
@keyframes e096Glow { to { opacity: .4; } }
.es-ac[data-id="boat"] svg { animation: e096Bob 1.4s ease-in-out infinite alternate; } @keyframes e096Bob { to { transform: translateY(2px) rotate(-1deg); } }
.es-ac[data-id="boat"] .e096-oar { transform-origin: 0 0; }
.es-ac[data-id="boat"].is-walk .e096-oar { animation: e096Oar .8s ease-in-out infinite; }
@keyframes e096Oar { 0% { transform: rotate(10deg); } 50% { transform: rotate(-40deg); } 100% { transform: rotate(10deg); } }
@media (prefers-reduced-motion: reduce) { .st-rain .e096-rain, .st-rain .e096-winrain { animation-duration: 1.4s; } .es-ac[data-id="boat"].is-walk .e096-oar { animation-duration: 1.6s; } }
`;

const on = (st, ...ks) => ks.forEach((k) => st.set(k, true));
const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const cls = (st, id, c, v = true) => st.a(id).el.classList.toggle(c, v);

const BEATS = [
  { key: ['Last October', 'heavy rain fell for three days'], icon: '🌧️', label: 'heavy rain', async play(st) {
    st.look(300);
    on(st, 'st-lb-oct', 'st-rain');
    await st.loop('rain', async () => {
      await st.wait(700);
      off(st, 'st-lb-oct'); on(st, 'st-lb-days');
      for (const d of [1, 2, 3]) { on(st, `st-d${d}`); st.sfx('page-turn', { vol: 0.6 }); await st.wait(900); }
    }, { vol: 0.7 });
  } },
  { key: ['On the third night', 'while everyone was sleeping', 'the river rose quickly'], icon: '🌊', label: 'the river rose', async play(st) {
    off(st, 'st-lb-days');
    st.look(380);
    on(st, 'st-night', 'st-lb-sleep');
    st.fx('zzz', X.bed1 - 50, HF - 70); st.fx('zzz', X.dog + 16, HF - 50, { quiet: true });
    await st.wait(1200);
    st.look(470, { dur: 900 });
    on(st, 'st-rise', 'st-lb-rose');
    await st.loop('river', () => Promise.all([st.wait(2600), st.walk('boat', X.boat0, { y: WATER + 2, speed: 20, follow: false })]), { vol: 0.8 });
  } },
  { key: ['Grandpa woke up', 'his old dog was barking loudly'], icon: '🐕', label: 'barking loudly', async play(st) {
    off(st, 'st-lb-sleep', 'st-lb-rose');
    st.look(300);
    st.dog('dog', 'stand'); st.face('dog', -1); st.mood('dog', 'joy'); st.act('dog', 'jump'); on(st, 'st-lb-bark');
    st.sfx('dog-bark', { vol: 1 });
    st.say('dog', 'Woof! Woof!', 1300);
    await st.wait(500); st.sfx('dog-bark', { vol: 0.9 });
    await st.wait(500);
    on(st, 'st-up'); st.show('grandpa', true); st.fx('poof', X.bed1, HF - 40, { quiet: true });
    st.pose('grandpa', 'stretch'); st.mood('grandpa', 'wow'); st.sfx('dog-bark', { vol: 0.9 });
    await st.wait(900);
    st.act('dog', null); st.pose('grandpa', 'stand');
  } },
  { key: ['When he opened the door', 'the water had already reached the steps'], icon: '🚪', label: 'reached the steps', async play(st) {
    off(st, 'st-lb-bark');
    st.look(400);
    await st.walk('grandpa', X.door - 30, { speed: 100, follow: false });
    st.pose('grandpa', 'reach');
    on(st, 'st-open'); st.sfx('door-open', { vol: 0.8 });
    await st.wait(400);
    await st.walk('grandpa', X.door + 30, { speed: 80, follow: false });
    st.mood('grandpa', 'wow'); st.pose('grandpa', 'open');
    on(st, 'st-lb-steps'); st.sfx('splash', { vol: 0.6 });
    await st.wait(1600);
  } },
  { key: ['Mr Ba, an old neighbour', 'lived alone across the road'], icon: '🏚️', label: 'lived alone', async play(st) {
    off(st, 'st-lb-steps'); st.pose('grandpa', 'stand');
    on(st, 'st-lb-across');
    st.look(1250, { dur: 1600 });
    await st.loop('river', () => st.wait(1500), { vol: 0.6 });
    off(st, 'st-lb-across'); on(st, 'st-lb-alone');
    st.mood('ba', 'sad'); st.act('cat', 'wag'); st.sfx('meow', { vol: 0.6 });
    await st.wait(1500);
  } },
  { key: ['Grandpa knew that Mr Ba had hurt his leg the week before'], icon: '🦵', label: 'had hurt his leg', async play(st) {
    off(st, 'st-lb-alone');
    st.look(420, { dur: 1100 });
    await st.wait(700);
    st.pose('grandpa', 'think'); st.mood('grandpa', 'sad');
    on(st, 'st-th'); st.sfx('pop', { vol: 0.6 });
    await st.wait(600);
    st.sfx('bump', { vol: 0.7 });
    await st.wait(2000);
  } },
  { key: ["took the family's small boat", 'paddled through the dark'], icon: '🛶', label: 'paddled', async play(st) {
    off(st, 'st-th'); st.pose('grandpa', 'stand'); st.mood('grandpa', 'happy');
    // trong lúc đó bên kia đường: bác Ba trèo lên bàn, ôm mèo
    st.show('cat', false); st.place('ba', X.ba, FLOOR - 36, 1); st.pose('ba', 'e096_hold'); st.chest('ba', `<g transform="translate(0 -4)">${CAT_FACE(1.1)}</g>`);
    st.look(520);
    await st.walk('grandpa', X.boat0 - 30, { speed: 90, follow: false, y: WATER - 4 });
    st.show('grandpa', false); cls(st, 'boat', 'e096-g'); cls(st, 'boat', 'e096-lamp'); st.sfx('splash', { vol: 0.7 });
    on(st, 'st-lb-dark');
    st.look(900, { dur: 2200 });
    await st.loop('river', async () => {
      const go = st.walk('boat', X.boat1, { speed: 150, follow: false });
      for (let i = 0; i < 4; i++) { await st.wait(800); st.sfx('splash', { vol: 0.35 }); }
      await go;
    }, { vol: 0.5 });
  } },
  { key: ['Mr Ba was standing on a table', 'holding his cat'], icon: '🐈', label: 'standing on a table', async play(st) {
    off(st, 'st-lb-dark');
    st.look(X.ba - 40, { dur: 800 });
    await st.wait(400);
    on(st, 'st-lb-table'); st.mood('ba', 'wow');
    st.sfx('meow', { vol: 0.8 });
    await st.wait(900);
    st.act('ba', 'shiver'); st.sfx('meow', { vol: 0.6, rate: 1.2 });
    await st.wait(900);
    st.act('ba', null);
  } },
  { key: ['helped them both into the boat'], icon: '🤝', label: 'into the boat', async play(st) {
    off(st, 'st-lb-table');
    st.look(X.ba - 40);
    st.mood('ba', 'happy');
    await st.walk('ba', X.boat1 + 30, { speed: 60, follow: false, y: WATER - 6 });
    st.show('ba', false); cls(st, 'boat', 'e096-full'); st.sfx('splash', { vol: 0.7 }); st.sfx('meow', { vol: 0.5 });
    on(st, 'st-lb-both');
    await st.wait(500);
    st.fx('hearts', X.boat1, 170);
    await st.wait(800);
  } },
  { key: ['The next morning', 'a reporter came to interview Grandpa'], icon: '🎙️', label: 'a reporter', async play(st) {
    off(st, 'st-lb-both', 'st-night', 'st-rain', 'st-rise');
    on(st, 'st-low', 'st-morning', 'st-lb-morning');
    cls(st, 'boat', 'e096-g', false); cls(st, 'boat', 'e096-full', false); cls(st, 'boat', 'e096-lamp', false);
    st.place('boat', 910, FLOOR + 12, 1);
    st.place('grandpa', 620, FLOOR, 1); st.show('grandpa', true); st.pose('grandpa', 'stand'); st.mood('grandpa', 'joy');
    st.place('ba', 545, FLOOR, 1); st.show('ba', true); st.pose('ba', 'e096_hold');
    st.place('grandma', X.door + 4, HF, 1); st.show('grandma', true); on(st, 'st-up2');
    st.place('dog', 582, FLOOR, 1); st.dog('dog', 'sit');
    st.look(700, { instant: true });
    st.sfx('birds', { vol: 0.6 });
    st.place('rep', 1000, FLOOR, -1); st.show('rep', true); st.hold('rep', 'e096_mic');
    await st.walk('rep', 712, { speed: 110, follow: false });
    st.pose('rep', 'e096_rep'); st.sfx('camera', { vol: 0.7 });
    await st.wait(700);
  } },
  { key: ['I only did what anyone would do'], icon: '🙂', label: 'what anyone would do', async play(st) {
    off(st, 'st-lb-morning');
    st.look(700);
    st.pose('grandpa', 'me'); st.mood('grandpa', 'happy'); on(st, 'st-lb-sp-gpa'); st.talk('grandpa', true);
    on(st, 'st-b-any'); st.sfx('pop', { vol: 0.6 });
    await st.wait(2200);
    st.talk('grandpa', false); st.act('grandpa', 'nod');
    await st.wait(400);
    st.act('grandpa', null);
  } },
  { key: ['now everyone calls him the flood hero'], icon: '🦸', label: 'the flood hero', async play(st) {
    off(st, 'st-b-any', 'st-lb-sp-gpa'); st.pose('grandpa', 'stand');
    st.look(700);
    on(st, 'st-paper'); st.sfx('page-turn', { vol: 0.8 });
    await st.wait(500);
    on(st, 'st-lb-hero'); st.sfx('cheer', { vol: 0.7 });
    st.pose('grandma', 'clap'); st.act('grandma', 'clap'); st.pose('rep', 'clap'); st.act('rep', 'clap');
    st.act('ba', 'hop'); st.mood('ba', 'joy'); st.act('dog', 'wag');
    st.mood('grandpa', 'joy'); st.pose('grandpa', 'wave'); st.act('grandpa', 'wave');
    await st.wait(1800);
    for (const k of ['grandma', 'rep', 'ba', 'grandpa']) st.act(k, null);
  } },
];

export default {
  id: 'en096', worldW: W, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 2, 5, 6, 11],
  cast: [
    { id: 'grandma', kind: 'adult', who: 'en_grandma', x: X.door + 4, y: HF, face: 1 },
    { id: 'dog', kind: 'dog', x: X.dog, y: HF, s: 0.8, face: -1 },
    { id: 'grandpa', kind: 'adult', who: 'en_grandpa', x: X.bed1 + 70, y: HF, face: 1 },
    { id: 'cat', kind: 'cat', x: X.ba + 26, y: FLOOR - 36, s: 0.8, face: -1 },
    { id: 'ba', kind: 'adult', who: 'e096_ba', x: X.chair, face: 1 },
    { id: 'rep', kind: 'adult', who: 'e096_rep', x: X.rep, face: -1 },
    { id: 'boat', kind: 'thing', x: X.boat0, y: FLOOR + 6, svg: BOAT, box: [-72, -110, 144, 124] },
  ],
  init(st) {
    st.show('grandma', false); st.show('grandpa', false);
    st.dog('dog', 'sit'); st.dog('cat', 'sit');
    st.pose('ba', 'sitHold');
    st.show('rep', false);
  },
};
