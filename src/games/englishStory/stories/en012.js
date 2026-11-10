/**
 * Bài 12 "Simon Says": lớp học (lịch thứ Sáu) → cửa → sân chơi của trường (cổng PLAYGROUND, thảm xốp, biển OUT, cầu trượt).
 * Mỗi câu một nhịp. Cô Hoa đội vương miện "SIMON", các bạn làm đúng từng lệnh: đứng lên, chạm đầu, chạm gối, vẫy tay, nhảy.
 * Toạ độ cảnh: rộng 1640, cao 315, sàn y = 282. Thảm xốp: mặt thảm ở nền (266–290), mép trước ở lớp trước (290–312)
 * nên bạn ngồi (hạ người 24) giấu bàn chân sau mép thảm. Trạng thái cảnh là class st-* trên <svg>.
 */
import { CAST } from '../../tiengViet3/cast.js';
import { L, sky, cloud, tree, bush, grass, fence, room, doorway, board, desk, label, STAR, sun, flowerAt, KIT_CSS } from '../kit.js';

const FLOOR = 282;

// Bạn cùng lớp thêm (đồng phục trắng, tóc hai bím)
Object.assign(CAST, {
  e012_mai: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#A78BFA', bag: '#A78BFA' },
});

/** Khung ngang (rộng) hay điện thoại dọc (hẹp): khung hẹp thì camera nhắm vào người chính của câu. */
const wide = (st) => st.VW > 430;
const KIDS = ['lan', 'minh', 'tom', 'mai'];
const IN = ['lan', 'minh', 'mai']; // còn chơi sau khi Tom bị loại
const MAT = ['#F87171', '#FBBF24', '#34D399', '#60A5FA'];
const MAT_D = ['#DC2626', '#D97706', '#059669', '#2563EB'];

// ── Đồ vật ─────────────────────────────────────────────────────────────────
// Vương miện + huy hiệu SIMON trên ngực cô Hoa (gốc = giữa ngực, đỉnh đầu người lớn ở khoảng y −60)
const SIMON = `<g transform="translate(0 -55)"><path d="M-14 0 L-16 -15 L-8 -7 L0 -19 L8 -7 L16 -15 L14 0Z" fill="#FACC15" stroke="${L}" stroke-width="1"/>
  <rect x="-14" y="-3" width="28" height="5" rx="1.5" fill="#F59E0B" stroke="${L}" stroke-width="0.8"/><circle cx="0" cy="-12" r="2.2" fill="#EF4444"/><circle cx="-9" cy="-4" r="1.3" fill="#3B82F6"/><circle cx="9" cy="-4" r="1.3" fill="#3B82F6"/></g>
  <g transform="translate(9 -8)"><rect x="-15" y="-6" width="30" height="12" rx="4" fill="#FDE047" stroke="${L}" stroke-width="0.9"/>
  <text x="0" y="3.4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="8.4" fill="#B91C1C">SIMON</text></g>`;
const CROWN = `<g transform="scale(1.4)"><path d="M-14 6 L-16 -9 L-8 -1 L0 -13 L8 -1 L16 -9 L14 6Z" fill="#FACC15" stroke="${L}" stroke-width="1"/><circle cx="0" cy="-6" r="2.2" fill="#EF4444"/></g>`;
// Cúp vàng: gốc = bàn tay, cánh tay hướng +y; khi giơ tay lên thì xoay 180° cho cúp đứng thẳng
const CUP_BODY = `<rect x="-7" y="-4" width="14" height="5" rx="1.5" fill="#B45309" stroke="${L}" stroke-width="0.8"/><path d="M-2.4 -4 V-10 H2.4 V-4Z" fill="#F59E0B" stroke="${L}" stroke-width="0.7"/>
  <path d="M-10 -26 H10 Q10 -11 0 -10 Q-10 -11 -10 -26Z" fill="#FACC15" stroke="${L}" stroke-width="1"/><path d="M-10 -23 q-6 0 -5 5 q1 4 6 3 M10 -23 q6 0 5 5 q-1 4 -6 3" stroke="${L}" stroke-width="1.2" fill="none"/>
  <path d="M0 -23 l1.4 3 h3.2 l-2.6 2 l1 3.2 l-3 -2 l-3 2 l1 -3.2 l-2.6 -2 h3.2Z" fill="#fff" opacity="0.9"/>`;
const CUP = `<g transform="translate(0 4) scale(1.3)">${CUP_BODY}</g>`;

/** Cái lịch treo tường: tờ THURSDAY lật lên, lộ ra FRIDAY. */
function calendar(x, y) {
  const page = (txt, c, n) => `<rect x="-42" y="14" width="84" height="84" fill="#fff" stroke="${L}"/>
    <text x="0" y="36" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${txt.length > 6 ? 13 : 17}" fill="${c}">${txt}</text>
    <text x="0" y="84" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="40" fill="#334155">${n}</text>`;
  return `<g transform="translate(${x} ${y})">
    <rect x="-46" y="0" width="92" height="104" rx="5" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    ${page('FRIDAY', '#DC2626', 8)}
    <g transform="translate(0 14)"><g class="e012-thu"><g transform="translate(0 -14)">${page('THURSDAY', '#64748B', 7)}</g></g></g>
    ${[-24, 0, 24].map((dx) => `<rect x="${dx - 2.5}" y="-6" width="5" height="16" rx="2.5" fill="#94A3B8" stroke="${L}" stroke-width="0.8"/>`).join('')}
  </g>`;
}

function slide(x) {
  return `<g transform="translate(${x} ${FLOOR})">
    <path d="M0 0 V-120 M30 0 V-120" stroke="#3B82F6" stroke-width="5" stroke-linecap="round"/>${[-24, -48, -72, -96].map((y) => `<path d="M0 ${y} H30" stroke="#93C5FD" stroke-width="4" stroke-linecap="round"/>`).join('')}
    <rect x="-4" y="-126" width="40" height="10" rx="3" fill="#F59E0B" stroke="${L}"/>
    <path d="M34 -118 Q60 -110 84 -50 Q100 -10 130 -6 V4 Q92 6 74 -40 Q58 -96 34 -106Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/></g>`;
}

function swing(x) {
  return `<g transform="translate(${x} ${FLOOR})"><path d="M0 0 L20 -140 L40 0 M100 0 L120 -140 L140 0" stroke="#A855F7" stroke-width="6" stroke-linecap="round" fill="none"/>
    <path d="M14 -140 H126" stroke="#7C3AED" stroke-width="7" stroke-linecap="round"/>
    <g class="e012-swing"><path d="M56 -136 V-44 M84 -136 V-44" stroke="${L}" stroke-width="1.6"/><rect x="50" y="-46" width="40" height="8" rx="3" fill="#FBBF24" stroke="${L}"/></g></g>`;
}

function bg() {
  const mat = Array.from({ length: 8 }, (_, i) => {
    const xa = 676 + i * 48.5, xb = 660 + i * 52.5;
    return [0, 1].map((r) => {
      const y0 = 266 + r * 12, y1 = y0 + 12, t0 = r / 2, t1 = (r + 1) / 2;
      const p = (t, k) => (xa + (xb - xa) * t) + k * (48.5 + 4 * t);
      return `<path d="M${p(t0, 0)} ${y0} H${p(t0, 1)} L${p(t1, 1)} ${y1} H${p(t1, 0)}Z" fill="${MAT[(i + r) % 4]}" stroke="${L}" stroke-width="0.7"/>`;
    }).join('');
  }).join('');
  return `
  ${sky(612, 1028, 315, 'e012sky')}
  <g transform="translate(1180 96)">${sun(24)}</g>
  ${cloud(700, 120, 0.9, 0)}${cloud(1010, 138, 0.7, 3)}${cloud(1380, 60, 1, 5)}${cloud(1580, 110, 0.8, 2)}
  ${grass(612, 1028, FLOOR)}
  ${tree(1250, FLOOR - 30, 1.1)}${tree(1600, FLOOR - 30, 1)}
  ${fence(640, 1000, FLOOR)}
  ${bush(1104, FLOOR, 1.1, '#4ADE80')}${bush(1236, FLOOR, 0.9)}
  ${slide(1290)}${swing(1460)}
  ${[1110, 1250, 1440, 1600].map((x, i) => flowerAt(x, FLOOR + 14, ['#F472B6', '#FDE047', '#F87171', '#A78BFA'][i])).join('')}
  <!-- Cổng sân chơi -->
  <path d="M640 282 V66 M1080 282 V66" stroke="#2563EB" stroke-width="8" stroke-linecap="round"/>
  <path d="M640 66 H1080" stroke="#1D4ED8" stroke-width="7" stroke-linecap="round"/>
  <path d="M648 70 ${Array.from({ length: 18 }, (_, i) => `L${657 + i * 23.5} 86 L${669 + i * 23.5} 70`).join(' ')}" fill="none" stroke="${L}" stroke-width="0.8"/>
  ${Array.from({ length: 18 }, (_, i) => `<path d="M${646 + i * 23.5} 70 L${657 + i * 23.5} 88 L${668 + i * 23.5} 70Z" fill="${MAT[i % 4]}" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <rect x="780" y="44" width="160" height="30" rx="8" fill="#fff" stroke="${L}" stroke-width="1.4"/>
  <text x="860" y="66" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="19" fill="#16A34A">PLAYGROUND</text>
  <!-- Thảm xốp (mặt trên) -->
  ${mat}
  <!-- Biển OUT -->
  <g transform="translate(1168 ${FLOOR})"><g class="e012-out"><path d="M0 0 V-96" stroke="#A16207" stroke-width="6" stroke-linecap="round"/>
    <rect x="-34" y="-132" width="68" height="38" rx="6" fill="#EF4444" stroke="${L}" stroke-width="1.4"/>
    <text x="0" y="-104" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="26" fill="#fff">OUT</text></g></g>
  <!-- Ba ngôi sao + WINNER trên đầu Minh -->
  ${[[836, 136, 0], [870, 126, 0.15], [904, 136, 0.3]].map(([x, y, d]) => `<g transform="translate(${x} ${y})"><g class="e012-star" style="transition-delay:${d}s"><g transform="scale(1.5)">${STAR()}</g></g></g>`).join('')}
  <g transform="translate(870 104)"><g class="e012-win"><path d="M-70 -14 H70 L62 0 L70 14 H-70 L-62 0Z" fill="#F59E0B" stroke="${L}" stroke-width="1.2"/>
    <text x="0" y="8" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="22" fill="#fff" stroke="${L}" stroke-width="0.6">WINNER</text></g></g>
  <g class="e012-gnd">${label(930, 146, 'on the ground', '#B45309', 15)}<path d="M930 160 V184" stroke="#B45309" stroke-width="4" stroke-linecap="round"/><path d="M922 178 L930 190 L938 178Z" fill="#B45309"/></g>
  <!-- Lớp học -->
  ${room(0, 612, FLOOR, '#FEF3C7')}
  ${board(40, 52, 210, 86, 'Simon Says')}
  <rect x="44" y="146" width="40" height="5" rx="2" fill="#A16207"/><rect x="56" y="141" width="12" height="5" rx="1" fill="#fff"/>
  <rect x="282" y="58" width="120" height="96" rx="4" fill="#fff" stroke="${L}" stroke-width="1.4"/><rect x="288" y="64" width="108" height="84" fill="#BAE6FD"/>
  <path d="M288 128 Q330 112 396 126 V148 H288Z" fill="#86EFAC"/><path d="M342 64 V148 M288 106 H396" stroke="#fff" stroke-width="3" opacity="0.8"/>
  ${calendar(500, 62)}
  ${desk(120, FLOOR, '#F59E0B')}${desk(380, FLOOR, '#F59E0B')}
  <rect x="520" y="216" width="70" height="66" rx="3" fill="#B45309" stroke="${L}"/><rect x="514" y="210" width="82" height="9" rx="3" fill="#D97706" stroke="${L}"/>
  <g transform="translate(540 202)"><path d="M-8 -4 H8 L6 8 H-6Z" fill="#60A5FA" stroke="${L}" stroke-width="0.8"/>${['#EF4444', '#22C55E', '#FACC15'].map((c, i) => `<path d="M${-4 + i * 4} -4 L${-6 + i * 6} -16" stroke="${c}" stroke-width="2.2" stroke-linecap="round"/>`).join('')}</g>
  ${doorway(600, FLOOR)}
  <rect x="612" y="0" width="14" height="104" fill="#E9D5B5" stroke="${L}"/>`;
}

/** Lớp trước: mép thảm xốp (che bàn chân bạn đang ngồi). */
function fg() {
  return Array.from({ length: 8 }, (_, i) => {
    const x = 660 + i * 52.5;
    return `<rect x="${x}" y="290" width="52.5" height="25" fill="${MAT_D[(i + 1) % 4]}" stroke="${L}" stroke-width="0.8"/>
      <path d="M${x + 18} 290 q8 8 16 0" fill="${MAT[(i + 1) % 4]}" stroke="${L}" stroke-width="0.6"/>`;
  }).join('');
}

const CSS = `
.e012-thu { transform-origin: 0 0; transition: transform .7s cubic-bezier(.4,0,.2,1), opacity .7s; }
.st-fri .e012-thu { transform: scaleY(0); opacity: 0; }
.e012-out { transform: scale(0); transition: transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-out .e012-out { transform: scale(1); }
.e012-star { transform: scale(0); transition: transform .45s cubic-bezier(.3,1.6,.6,1); }
.st-stars .e012-star { transform: scale(1); }
.e012-win { transform: scale(0); transition: transform .5s cubic-bezier(.3,1.5,.6,1); }
.st-win .e012-win { transform: scale(1); }
.e012-gnd { opacity: 0; transition: opacity .35s; }
.st-gnd .e012-gnd { opacity: 1; }
.e012-swing { transform-origin: 70px -136px; animation: e012Swing 2.6s ease-in-out infinite alternate; }
@keyframes e012Swing { from { transform: rotate(-8deg); } to { transform: rotate(8deg); } }
/* Chạm gối: hạ người 12, chân giữ nguyên trên đất, tay dài ra chạm gối */
.act-e012knees .pp-legwL, .act-e012knees .pp-legwR, .act-e012rise .pp-legwL, .act-e012rise .pp-legwR,
.act-e012knees .pp-upwL, .act-e012knees .pp-upwR, .act-e012rise .pp-upwL, .act-e012rise .pp-upwR { transition: transform .38s cubic-bezier(.4,0,.2,1); }
.act-e012knees .pp-legwR { transform: translateY(-12px) rotate(-10deg); }
.act-e012knees .pp-legwL { transform: translateY(-12px) rotate(10deg); }
.act-e012knees .pp-upwL, .act-e012knees .pp-upwR { transform: scaleY(1.22); }
@media (prefers-reduced-motion: reduce) { .e012-swing { animation-duration: 6s; } }
`;

// Tư thế riêng của truyện (góc tay như rig.js: 0 buông, 90 dang ngang, 180 giơ lên; số âm = vào trong)
const POSES = {
  e012_sitg: { R: [20, -30], L: [20, -30], dy: 40 },          // ngồi trên thảm, tay đặt lên đùi
  e012_sitClap: { R: [40, -90], L: [40, -90], dy: 40 },
  e012_pat: { R: [30, 20], L: [30, 20], dy: 40, head: 8 },     // ngồi, hai tay chống xuống đất
  e012_oops: { R: [145, 240], L: [145, 240], dy: 40 },         // ngồi, hai tay ôm má
  e012_up: { R: [110, 150], L: [110, 150] },                    // cô ra hiệu "đứng lên"
  e012_down: { R: [60, 30], L: [60, 30] },                      // cô ra hiệu "ngồi xuống"
  e012_head: { R: [170, 205], L: [170, 205] },                  // hai tay chạm đỉnh đầu
  e012_knees: { R: [-6, -14], L: [-6, -14], dy: 12 },           // cúi, hai tay chạm gối
  e012_arms: { R: [150, 165], L: [150, 165] },                  // vẫy hai tay trên đầu
  e012_eyes: { R: [150, 262], L: [150, 262] },                  // hai tay che mắt
  e012_mouth: { R: [140, 262], L: [140, 262] },                 // hai tay bịt miệng (nín cười)
};

/** Một lệnh "Simon says": cô làm mẫu, các bạn làm theo (lần lượt rất nhanh), giữ một lúc rồi đứng thẳng lại. */
async function simon(st, pose, { act = null, kids = KIDS, ms = 1600, mood = 'joy', back = 'stand', end } = {}) {
  st.talk('hoa', true);
  st.pose('hoa', pose); if (act) st.act('hoa', act);
  await st.wait(300);
  for (const id of kids) { st.pose(id, pose); if (act) st.act(id, act); st.mood(id, mood); await st.wait(90); }
  await st.wait(ms);
  st.talk('hoa', false);
  if (end) await end();
  for (const id of ['hoa', ...kids]) { st.act(id, null); st.pose(id, back); }
  for (const id of kids) st.mood(id, 'happy');
  await st.wait(300);
}

const BEATS = [
  { key: ['Friday'], icon: '📅', label: 'Friday', async play(st) {
    st.look(wide(st) ? 330 : 385);
    st.pose('hoa', 'point'); st.talk('hoa', true);
    await st.wait(450);
    st.set('st-fri'); st.sfx('page-turn');
    await st.wait(500);
    st.fx('sparkle', 500, 120);
    for (const id of KIDS) { st.act(id, 'hop'); st.mood(id, 'joy'); }
    await st.wait(1200);
    st.talk('hoa', false); st.pose('hoa', 'stand');
    for (const id of KIDS) { st.act(id, null); st.mood(id, 'happy'); }
  } },
  { key: ['in the playground'], icon: '🛝', label: 'playground', async play(st) {
    st.sfx('door-open');
    await Promise.all([
      st.walk('minh', 870, { speed: 175, lead: -20 }),
      st.walk('mai', 990, { follow: false, speed: 180 }),
      (async () => { await st.wait(150); await st.walk('tom', 930, { follow: false, speed: 180 }); })(),
      (async () => { await st.wait(300); await st.walk('lan', 810, { follow: false, speed: 180 }); })(),
      (async () => { await st.wait(200); await st.walk('hoa', 720, { follow: false, speed: 105 }); })(),
    ]);
    st.sfx('birds', { vol: 0.7 });
  } },
  { key: ['Ms Hoa is Simon'], icon: '👑', label: 'Simon', async play(st) {
    st.look(850, { dur: 500 });
    for (const id of KIDS) { st.pose(id, 'e012_sitg'); await st.wait(80); }
    await st.fly(CROWN, [720, 50], [720, 112], { size: 44, dur: 650 });
    st.chest('hoa', SIMON); st.fx('sparkle', 720, 110);
    st.pose('hoa', 'raise'); st.mood('hoa', 'joy');
    for (const id of KIDS) { st.pose(id, 'e012_sitClap'); st.act(id, 'clap'); st.mood(id, 'joy'); }
    await st.say('hoa', 'I am Simon!', 1500);
    for (const id of KIDS) { st.act(id, null); st.pose(id, 'e012_sitg'); st.mood(id, 'happy'); }
    st.pose('hoa', 'stand'); st.mood('hoa', 'happy');
  } },
  { key: ['stand up'], icon: '🧍', label: 'stand up', async play(st) {
    await simon(st, 'e012_up', { ms: 900, back: 'stand' });
  } },
  { key: ['touch your head'], icon: '🙆', label: 'head', async play(st) {
    await simon(st, 'e012_head', { ms: 1300 });
  } },
  { key: ['touch your knees'], icon: '🦵', label: 'knees', async play(st) {
    await simon(st, 'e012_knees', { act: 'e012knees', ms: 1300, end: async () => {
      // đứng thẳng lại: chân và tay về cỡ cũ cùng nhịp với thân (không trồi lên / lún xuống)
      for (const id of ['hoa', ...KIDS]) { st.act(id, 'e012rise'); st.pose(id, 'stand'); }
      await st.wait(420);
    } });
  } },
  { key: ['wave your arms'], icon: '🙌', label: 'wave arms', async play(st) {
    await simon(st, 'e012_arms', { act: 'dance', ms: 1500 });
  } },
  { key: ['jump'], icon: '🤸', label: 'jump', async play(st) {
    await simon(st, 'cheer', { act: 'jump', ms: 1300 });
  } },
  { key: ['sit down'], icon: '🪑', label: 'sit down', async play(st) {
    // Không có "Simon says": chỉ Tom ngồi xuống (sai), các bạn đứng yên
    st.talk('hoa', true); st.pose('hoa', 'e012_down');
    await st.wait(500);
    st.pose('tom', 'e012_sitg'); st.mood('tom', 'joy');
    await st.wait(1100);
    st.talk('hoa', false); st.pose('hoa', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['Oh no'], icon: '😮', label: 'oh no', async play(st) {
    st.pose('tom', 'e012_oops'); st.mood('tom', 'wow');
    st.pose('hoa', 'point'); st.act('hoa', 'no');
    for (const id of IN) st.mood(id, 'wow');
    await st.wait(1500);
    st.act('hoa', null); st.pose('hoa', 'stand');
    st.pose('tom', 'e012_sitg');
    for (const id of IN) st.mood(id, 'happy');
  } },
  { key: ['Tom is on the ground'], icon: '⬇️', label: 'on the ground', async play(st) {
    st.look(910);
    st.pose('tom', 'e012_pat');
    st.fx('poof', 930, 292);
    st.set('st-gnd');
    await st.wait(1900);
    st.set('st-gnd', false);
    st.pose('tom', 'e012_sitg');
  } },
  { key: ['He is out'], icon: '🚫', label: 'out', async play(st) {
    st.look(wide(st) ? 990 : 1060);
    st.pose('hoa', 'point'); st.talk('hoa', true);
    st.set('st-out'); st.fx('poof', 1168, 180);
    await st.wait(500);
    st.talk('hoa', false);
    st.pose('tom', 'stand');
    await st.wait(300);
    await st.walk('tom', 1112, { follow: false, speed: 140 });
    st.pose('tom', 'sad'); st.pose('hoa', 'stand');
  } },
  { key: ['close your eyes'], icon: '😌', label: 'close eyes', async play(st) {
    st.look(860, { dur: 600 });
    st.talk('hoa', true); st.pose('hoa', 'e012_eyes');
    await st.wait(400);
    for (const id of IN) { st.mood(id, 'shut'); await st.wait(150); }
    await st.wait(1000);
    st.talk('hoa', false); st.pose('hoa', 'stand');
  } },
  { key: ["Don't open your eyes"], icon: '🙈', label: "don't open", async play(st) {
    st.talk('hoa', true); st.pose('hoa', 'pointUp'); st.act('hoa', 'no');
    for (const id of IN) st.act(id, 'nod');
    await st.wait(1900);
    st.talk('hoa', false); st.act('hoa', null); st.pose('hoa', 'stand');
    for (const id of IN) st.act(id, null);
  } },
  { key: ["Don't laugh"], icon: '🤭', label: "don't laugh", async play(st) {
    st.pose('hoa', 'e012_arms'); st.act('hoa', 'dance'); st.mood('hoa', 'joy');
    for (const id of IN) { st.pose(id, 'e012_mouth'); st.act(id, 'shiver'); }
    st.pose('tom', 'e012_mouth'); st.mood('tom', 'joy');
    await st.wait(1600);
    st.act('hoa', null); st.pose('hoa', 'stand'); st.mood('hoa', 'happy');
    for (const id of IN) { st.act(id, null); st.pose(id, 'stand'); }
    st.pose('tom', 'sad'); st.mood('tom', 'happy');
  } },
  { key: ['clap your hands'], icon: '👏', label: 'clap', async play(st) {
    await simon(st, 'clap', { act: 'clap', kids: IN, ms: 1500 });
  } },
  { key: ['very good'], icon: '⭐', label: 'very good', async play(st) {
    st.look(870, { dur: 600 });
    st.set('st-stars'); st.sfx('sparkle');
    st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.pose('hoa', 'point'); st.act('hoa', 'nod');
    await st.wait(600);
    st.fx('sparkle', 870, 130, { quiet: true });
    await st.wait(1300);
    st.act('minh', null); st.mood('minh', 'happy');
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
  { key: ['the winner'], icon: '🏆', label: 'winner', async play(st) {
    st.pose('hoa', 'give');
    await st.fly(CUP_BODY, [770, 168], [884, 150], { size: 34, dur: 700 });
    st.hold('minh', 'e012_cup'); st.pose('minh', 'raise'); st.mood('minh', 'joy');
    st.set('st-win'); st.fx('sparkle', 880, 104);
    st.pose('hoa', 'clap'); st.act('hoa', 'clap');
    for (const id of ['lan', 'mai', 'tom']) { st.pose(id, 'clap'); st.act(id, 'clap'); st.mood(id, 'joy'); }
    st.act('minh', 'jump');
    await st.wait(1600);
    for (const id of ['hoa', 'lan', 'mai', 'tom']) { st.act(id, null); st.pose(id, 'stand'); }
    st.act('minh', null);
  } },
  { key: ['Well done, Minh'], icon: '👍', label: 'well done', async play(st) {
    st.look(830, { dur: 500 });
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.mood('hoa', 'joy');
    st.act('minh', 'nod');
    await st.say('hoa', 'Well done, Minh!', 1800);
    st.act('hoa', null); st.pose('hoa', 'stand');
    st.act('minh', null);
  } },
  { key: ['Ms Hoa is happy'], icon: '😊', label: 'happy', async play(st) {
    st.look(wide(st) ? 912 : 800, { dur: 600 });
    st.mood('hoa', 'joy'); st.pose('hoa', 'cheer'); st.act('hoa', 'hop');
    st.fx('hearts', 720, 110);
    await st.wait(700);
    st.fx('hearts', 740, 120);
    await st.wait(1200);
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
];

export default {
  id: 'en012', worldW: 1640, floor: FLOOR, viewTop: 40, camStart: 80, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { e012_cup: `<g transform="rotate(180)">${CUP}</g>` },
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 420, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 150, s: 1.08 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 215 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 280 },
    { id: 'mai', kind: 'kid', who: 'e012_mai', x: 345 },
  ],
  init(st) {
    st.chest('hoa', null);
  },
};
