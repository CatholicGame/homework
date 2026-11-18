/**
 * Bài 106 "Taller, Faster, Smaller" (so sánh hơn / nhất: smallest, faster, fastest, higher, tallest, bigger, stronger,
 * lighter, loudest, best). Ngày hội thể thao ở trường, một thế giới đi từ trái sang phải: sân trường (băng rôn SPORTS DAY,
 * đội áo đỏ của lớp Minh) → đường chạy (khán đài, vạch đích có dải băng) → hố nhảy cao (hai cột, xà, đệm xanh) → bãi kéo co
 * (vạch giữa, lớp 3B áo xanh) và bảng điểm.
 * Bíp (bip.js) mặc như bài trước; chạy = bay là là. Kéo co: lớp 3B to khoẻ hơn, dây giật, Bíp nhẹ nên bay vút lên.
 * Toạ độ cảnh: rộng 2500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, schoolFront, speaker, sun } from '../kit.js';
import { BIP_SVG, BIP_BOX, BIP_CSS, bipSet } from '../bip.js';

const FLOOR = 282;
const W = 2500;
const X = { start: 640, finish: 1220, post1: 1500, post2: 1580, mat: 1640, mid: 2140, board: 2400 };
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const RED = '#EF4444', BLUE = '#3B82F6';

Object.assign(CAST, {
  e106_minh: { hair: 'spiky', top: 'tee', shirt: RED, bottom: 'shorts', bottomC: '#F8FAFC', shoe: '#F59E0B' },
  e106_tom: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: RED, bottom: 'shorts', bottomC: '#F8FAFC', shoe: '#16A34A' },
  e106_lan: { hair: 'ponytail', top: 'tee', shirt: RED, bottom: 'shorts', bottomC: '#F8FAFC', shoe: '#F28AB2' },
  e106_b1: { hair: 'short', top: 'tee', shirt: BLUE, bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#1F2937' },
  e106_b2: { hair: 'spiky', hairC: '#3F2A1E', top: 'tee', shirt: BLUE, bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
  e106_b3: { hair: 'ponytail', top: 'tee', shirt: BLUE, bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F472B6' },
  e106_hoa: { adult: true, hair: 'ponytail', top: 'tee', shirt: '#FDE68A', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#F8FAFC', hat: 'cap' },
});

const PROPS = {
  e106_whistle: `<g transform="translate(0 -4)"><rect x="-6" y="-3.5" width="11" height="7" rx="3" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/><rect x="4" y="-2" width="5" height="3" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>`,
};
const POSES = {
  e106_pull: { R: [34, -82], L: [34, -82], head: -6 },
  e106_flex: { R: [92, 182], L: [92, 182] },
  e106_whistle: { R: [150, 262], L: [10, 4] },
  e106_ready: { R: [40, 70], L: [40, -50], head: 4 },
};

// ── Đồ vật (gốc ở giữa) ────────────────────────────────────────────────────
const MEDAL = `<path d="M-5 -16 L0 -6 L5 -16" stroke="${RED}" stroke-width="3" fill="none"/><circle r="8" fill="#FACC15" stroke="${L}" stroke-width="1"/><circle r="4.5" fill="none" stroke="#F59E0B" stroke-width="1.2"/>`;
const RIBBON = (c) => `<path d="M-5 4 L-8 16 L-3 13 L0 17 Z M5 4 L8 16 L3 13 L0 17Z" fill="${c}" stroke="${L}" stroke-width="0.6"/><circle r="8" fill="${c}" stroke="${L}" stroke-width="1"/><circle r="3.6" fill="#fff"/>`;
/** Dây kéo co (gốc ở giữa dây, chỗ buộc cờ đỏ). */
const ROPE = `<path d="M-230 0 Q-115 3 0 0 T230 0" stroke="${L}" stroke-width="7" fill="none" stroke-linecap="round"/>
  <path d="M-230 0 Q-115 3 0 0 T230 0" stroke="#D6A35C" stroke-width="5" fill="none" stroke-linecap="round" stroke-dasharray="6 3"/>
  <g class="e106-ropeflag"><path d="M-2 0 L2 0 L8 22 L0 18 L-8 22Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/></g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
const fan = (x, y, c, d) => `<g transform="translate(${x} ${y})"><g class="e106-fan" style="animation-delay:${d}s"><circle r="7" fill="#FDE2C6" stroke="${L}" stroke-width="0.7"/>
  <path d="M-7 -2 Q-6 -10 0 -10 Q6 -10 7 -2 Q0 -6 -7 -2Z" fill="${['#1F2937', '#78350F', '#A16207', '#3F2A1E'][(x / 13 | 0) % 4]}"/><path d="M-8 8 Q0 2 8 8 V20 H-8Z" fill="${c}" stroke="${L}" stroke-width="0.7"/></g></g>`;
const bleacher = (x0, x1) => {
  const tiers = [0, 1, 2].map((i) => `<rect x="${x0}" y="${196 + i * 22}" width="${x1 - x0}" height="22" fill="${['#E2E8F0', '#CBD5E1', '#E2E8F0'][i]}" stroke="${L}" stroke-width="0.8"/>`).join('');
  const cols = ['#F87171', '#60A5FA', '#FBBF24', '#34D399', '#F472B6', '#A78BFA'];
  const fans = [0, 1, 2].map((r) => Array.from({ length: Math.floor((x1 - x0 - 30) / 34) }, (_, i) => fan(x0 + 20 + i * 34 + (r % 2) * 17, 184 + r * 22, cols[(i + r * 2) % 6], ((i * 7 + r * 3) % 5) * -0.07)).join('')).join('');
  return `${tiers}${fans}`;
};
const flagLine = (x0, x1, y) => {
  const n = Math.floor((x1 - x0) / 24);
  return `<path d="M${x0} ${y} Q${(x0 + x1) / 2} ${y + 18} ${x1} ${y}" stroke="${L}" stroke-width="1" fill="none"/>
  ${Array.from({ length: n }, (_, i) => { const t = (i + 0.5) / n, x = x0 + (x1 - x0) * t, yy = y + Math.sin(Math.PI * t) * 18 * 0.5 + 4 * Math.sin(Math.PI * t); return `<path d="M${(x - 7).toFixed(1)} ${yy.toFixed(1)} L${(x + 7).toFixed(1)} ${yy.toFixed(1)} L${x.toFixed(1)} ${(yy + 13).toFixed(1)}Z" fill="${['#EF4444', '#FACC15', '#3B82F6', '#22C55E'][i % 4]}" stroke="${L}" stroke-width="0.5"/>`; }).join('')}`;
};

function bg() {
  return `
  ${sky(0, W, 315, 'e106sky')}
  <g transform="translate(860 70)">${sun(22)}</g>
  ${cloud(240, 60, 0.8, 0)}${cloud(1100, 54, 0.9, 2)}${cloud(1720, 66, 0.8, 4)}${cloud(2260, 50, 0.9, 1)}
  <!-- sân trường -->
  <rect x="0" y="232" width="${W}" height="${FLOOR - 232}" fill="#BBF7D0"/>
  ${schoolFront(140, FLOOR)}
  ${tree(300, FLOOR, 0.9)}
  <path d="M290 ${FLOOR} V60 M560 ${FLOOR} V60" stroke="#78716C" stroke-width="3"/>
  ${flagLine(290, 560, 64)}
  <g transform="translate(425 112)"><rect x="-96" y="-22" width="192" height="36" rx="6" fill="#fff" stroke="${L}" stroke-width="1.4"/>
    <text x="0" y="5" text-anchor="middle" ${NUN} font-size="22" fill="#EA580C">SPORTS DAY</text></g>
  <!-- khán đài + đường chạy -->
  ${bleacher(X.start - 40, X.finish + 60)}
  <rect x="${X.start - 60}" y="${FLOOR - 26}" width="${X.finish - X.start + 140}" height="${315 - FLOOR + 26}" fill="#E07B5F" stroke="${L}"/>
  ${[FLOOR - 10, FLOOR + 6, FLOOR + 22].map((y) => `<path d="M${X.start - 60} ${y} H${X.finish + 80}" stroke="#fff" stroke-width="1.6"/>`).join('')}
  <path d="M${X.start} ${FLOOR - 26} V315" stroke="#fff" stroke-width="4"/>
  ${Array.from({ length: 9 }, (_, i) => `<rect x="${X.finish - 4 + (i % 2) * 4}" y="${FLOOR - 26 + i * 6}" width="4" height="6" fill="#1F2937"/>`).join('')}
  <path d="M${X.finish} ${FLOOR - 26} V315" stroke="#fff" stroke-width="1"/>
  <!-- nhảy cao -->
  ${tree(1330, FLOOR - 40, 0.8, '')}${bush(1420, FLOOR - 40, 0.6)}
  <rect x="${X.mat - 34}" y="${FLOOR - 14}" width="110" height="20" rx="6" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
  <path d="M${X.mat - 30} ${FLOOR - 9} H${X.mat + 72}" stroke="#93C5FD" stroke-width="1.4"/>
  ${[X.post1, X.post2].map((x) => `<rect x="${x - 3}" y="98" width="6" height="${FLOOR - 98}" fill="#F8FAFC" stroke="${L}" stroke-width="0.8"/>${Array.from({ length: 8 }, (_, i) => `<path d="M${x - 3} ${110 + i * 20} h6" stroke="${RED}" stroke-width="2"/>`).join('')}<ellipse cx="${x}" cy="${FLOOR}" rx="10" ry="3" fill="#64748B"/>`).join('')}
  <g class="e106-bar"><rect x="${X.post1 - 6}" y="196" width="${X.post2 - X.post1 + 12}" height="5" rx="2" fill="#FACC15" stroke="${L}" stroke-width="0.8"/></g>
  <!-- kéo co -->
  ${tree(1820, FLOOR - 40, 0.9)}${tree(2470, FLOOR - 40, 0.85, '')}
  <path d="M${X.mid} 240 V315" stroke="#fff" stroke-width="5"/>
  <g transform="translate(${X.board} 0)"><path d="M-60 ${FLOOR - 40} V170 M60 ${FLOOR - 40} V170" stroke="#78716C" stroke-width="4"/>
    <rect x="-74" y="66" width="148" height="110" rx="6" fill="#1E3A2E" stroke="#A16207" stroke-width="5"/>
    <circle cx="-48" cy="86" r="6" fill="${RED}" stroke="#fff"/><text x="-38" y="91" ${NUN} font-size="12" fill="#fff">Minh's class</text>
    <circle cx="-48" cy="140" r="6" fill="${BLUE}" stroke="#fff"/><text x="-38" y="145" ${NUN} font-size="12" fill="#fff">3B</text>
    <g class="e106-m e106-m1"><g transform="translate(-34 110)">${MEDAL}</g></g><g class="e106-m e106-m2"><g transform="translate(-8 110)">${MEDAL}</g></g>
    <g class="e106-m e106-m3"><g transform="translate(-30 162) scale(0.8)">${RIBBON(BLUE)}</g></g>
    <g class="e106-m e106-m1"><text x="26" y="116" ${NUN} font-size="11" fill="#FDE68A">races</text></g>
    <g class="e106-m e106-m3"><text x="-14" y="166" ${NUN} font-size="11" fill="#FDE68A">tug of war</text></g></g>`;
}

function fg() {
  return `
  ${bush(560, FLOOR + 32, 0.7)}${bush(1450, FLOOR + 34, 0.6, '#4ADE80')}${bush(1790, FLOOR + 34, 0.7)}
  <!-- dải băng ở vạch đích -->
  <g transform="translate(${X.finish} 0)"><path d="M-2 ${FLOOR + 30} V196 M2 196 V${FLOOR + 30}" stroke="#78716C" stroke-width="3"/>
    <g class="e106-tape"><path d="M0 230 H0" stroke="${RED}" stroke-width="3"/><path class="e106-tapeA" d="M0 228 Q-14 240 -26 252" stroke="${RED}" stroke-width="3" fill="none"/><path class="e106-tapeB" d="M0 228 Q14 236 28 228" stroke="${RED}" stroke-width="3" fill="none"/></g>
    <g class="e106-tapeOn"><path d="M0 228 V260" stroke="${RED}" stroke-width="3"/></g></g>
  <!-- lò xo dưới chân Bíp lúc bật -->
  <g class="e106-spring"><g transform="translate(${X.post1 - 30} ${FLOOR})"><path d="M-10 0 L10 -4 L-10 -8 L10 -12 L-10 -16 L10 -20 L-10 -24" stroke="#94A3B8" stroke-width="3" fill="none" stroke-linejoin="round"/></g></g>
  <!-- nhãn -->
  <g class="e106-lb e106-lb-team">${label(380, 150, "Minh's class team", '#DC2626', 15)}</g>
  <g class="e106-lb e106-lb-small">${label(470, 128, 'the smallest', '#7C3AED', 15)}</g>
  <g class="e106-lb e106-lb-fast">${label(560, 196, 'very fast', '#EA580C', 15)}</g>
  <g class="e106-lb e106-lb-faster">${label(X.finish + 60, 92, 'faster', '#16A34A', 15)}</g>
  <g class="e106-lb e106-lb-fastest">${label(X.finish + 150, 150, 'the fastest', '#EA580C', 17)}</g>
  <g class="e106-lb e106-lb-tallest">${label(1410, 116, 'the tallest boy', BLUE, 13)}</g>
  <g class="e106-lb e106-lb-higher">${label((X.post1 + X.post2) / 2, 76, 'higher', '#EA580C', 17)}</g>
  <g class="e106-lb e106-lb-tug">${label(X.mid, 92, 'tug of war', '#B45309', 18)}</g>
  <g class="e106-lb e106-lb-bigger">${label(X.mid + 150, 84, 'bigger', BLUE, 15)}</g>
  <g class="e106-lb e106-lb-stronger">${label(X.mid + 150, 112, 'stronger', BLUE, 15)}</g>
  <g class="e106-lb e106-lb-lighter">${label(X.mid - 90, 84, 'lighter', '#7C3AED', 15)}</g>
  <g class="e106-lb e106-lb-loud">${label(X.mid - 75, 150, 'Ha ha ha!', '#EA580C', 20)}</g>
  <g class="e106-lb e106-lb-earth"><g transform="translate(${X.mid - 160} 96)"><circle r="16" fill="#38BDF8" stroke="${L}" stroke-width="1.2"/>
    <path d="M-10 -8 Q-2 -12 2 -4 Q-4 2 -8 6 Q-14 2 -10 -8Z M4 4 Q12 0 12 8 Q6 12 2 10Z" fill="#4ADE80" stroke="${L}" stroke-width="0.6"/></g></g>
  <g class="e106-lb e106-lb-said">${speaker(X.mid - 40, 168, 'Bip', '#7C3AED')}</g>`;
}

const LB = ['team', 'small', 'fast', 'faster', 'fastest', 'tallest', 'higher', 'tug', 'bigger', 'stronger', 'lighter', 'loud', 'earth', 'said'];
const CSS = `
.e106-lb { opacity: 0; transition: opacity .3s; }
${LB.map((k) => `.st-lb-${k} .e106-lb-${k}`).join(', ')} { opacity: 1; }
${LB.map((k) => `.e106-lb-${k}`).join(', ')} { transform-box: fill-box; transform-origin: 50% 100%; }
${LB.map((k) => `.st-lb-${k} .e106-lb-${k}`).join(', ')} { animation: e106Pop .4s cubic-bezier(.3,1.6,.6,1); }
@keyframes e106Pop { from { transform: scale(.3); } }
.e106-fan { transform-box: fill-box; transform-origin: 50% 100%; }
.st-cheer .e106-fan { animation: e106Fan .3s ease-out infinite alternate; }
@keyframes e106Fan { to { transform: translateY(-7px); } }
.e106-bar { transition: transform .9s cubic-bezier(.4,0,.2,1); }
.st-bar-up .e106-bar { transform: translateY(-74px); }
.e106-tape { opacity: 0; } .st-tape .e106-tape { opacity: 1; } .st-tape .e106-tapeOn { opacity: 0; }
.e106-spring { opacity: 0; } .st-spring .e106-spring { opacity: 1; animation: e106Spring .3s ease-out 2 alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e106Spring { from { transform: scaleY(.35); } to { transform: scaleY(1.4); } }
.e106-m { opacity: 0; transition: opacity .3s; }
.st-m1 .e106-m1, .st-m2 .e106-m2, .st-m3 .e106-m3 { opacity: 1; }
.e106-ropeflag { transform-origin: 0 0; animation: e106Flag 1s ease-in-out infinite alternate; }
@keyframes e106Flag { from { transform: rotate(-6deg); } to { transform: rotate(6deg); } }
/* Kéo co: cả người ngả ra sau (trong lớp lật, nên quay trái tự ngả về phía phải) */
.act-e106pull .es-flip > svg { transform-origin: 50% 100%; animation: e106Lean .45s ease-in-out infinite alternate; }
@keyframes e106Lean { from { transform: rotate(-5deg); } to { transform: rotate(-11deg); } }
.act-e106bpull .bip-armR, .act-e106bpull .bip-armL { rotate: -62deg; }
.act-e106bpull .bip-body { animation: e106BLean .45s ease-in-out infinite alternate; }
@keyframes e106BLean { from { rotate: -6deg; } to { rotate: -12deg; } }
/* Bíp bay vút lên: lộn một vòng */
.act-e106spin .bip-body { animation: e106Spin .7s linear infinite; transform-origin: 0 -60px; }
@keyframes e106Spin { to { rotate: 360deg; } }
/* Bíp chạy: lướt nhanh */
.act-e106dash .bip-body { animation-duration: .25s; }
@media (prefers-reduced-motion: reduce) {
  .st-cheer .e106-fan { animation-duration: .7s; }
  .act-e106pull .es-flip > svg, .act-e106bpull .bip-body { animation-duration: 1s; }
  .act-e106spin .bip-body { animation-duration: 1.6s; }
  .e106-ropeflag { animation-duration: 2.4s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const TEAM = ['minh', 'tom', 'lan'];
const B3 = ['b1', 'b2', 'b3'];

const BEATS = [
  { key: ['On Sports Day', "joined Minh's class team"], icon: '🏅', label: 'joined the team', async play(st) {
    st.look(330);
    st.sfx('birds', { vol: 0.4 });
    await st.walk('bip', 470, { speed: 130, follow: false });
    st.face('bip', -1);
    st.set('st-lb-team'); st.sfx('ding', { vol: 0.5 });
    for (const id of TEAM) { st.mood(id, 'joy'); st.pose(id, 'cheer'); st.act(id, 'cheer'); }
    st.mood('bip', 'joy'); st.act('bip', 'jump');
    st.sfx('cheer', { vol: 0.5 });
    await st.wait(1500);
    for (const id of TEAM) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); }
  } },
  { key: ['the smallest child in the school', 'very fast'], icon: '⚡', label: 'smallest · fast', async play(st) {
    st.set('st-lb-team', false);
    st.set('st-lb-small'); st.sfx('pop', { vol: 0.6 });
    st.mood('bip', 'happy');
    for (const id of TEAM) st.mood(id, 'wow');
    await st.wait(1300);
    st.set('st-lb-small', false); st.set('st-lb-fast');
    st.act('bip', 'e106dash'); st.sfx('whoosh', { vol: 0.8 });
    await st.walk('bip', 280, { speed: 520, follow: false });
    st.sfx('whoosh', { vol: 0.7, rate: 1.2 });
    await st.walk('bip', X.start + 20, { speed: 520, follow: false, y: FLOOR + 14 });
    st.set('st-lb-fast', false);
    st.look(X.start + 80, { dur: 1400 });
    await Promise.all([
      st.walk('tom', X.start + 20, { speed: 160, follow: false }),
      st.walk('minh', X.start + 20, { speed: 160, follow: false, y: FLOOR - 14 }),
      st.walk('lan', 560, { speed: 150, follow: false }),
    ]);
    st.act('bip', null);
    for (const id of ['tom', 'minh']) st.pose(id, 'e106_ready');
  } },
  { key: ['Tom was faster than Minh', 'Bip was the fastest of all'], icon: '🏃', label: 'the fastest', async play(st) {
    st.place('lan', X.finish + 140, FLOOR - 18, -1); st.place('hoa', X.start - 40, FLOOR - 18, 1);
    st.look(X.start + 140);
    st.pose('hoa', 'e106_whistle'); st.hold('hoa', 'e106_whistle');
    await st.wait(400);
    st.sfx('whistle', { vol: 0.7 });
    await st.wait(300);
    st.pose('hoa', 'stand'); st.hold('hoa', null);
    st.look(X.finish + 70, { dur: 2800 });
    const bip = st.walk('bip', X.finish + 150, { speed: 300, follow: false });
    const tom = st.walk('tom', X.finish + 60, { speed: 230, follow: false });
    const minh = st.walk('minh', X.finish + 4, { speed: 190, follow: false });
    await bip;
    st.set('st-tape'); st.set('st-lb-fastest'); st.sfx('ding', { vol: 0.7 }); st.mood('bip', 'joy');
    await tom;
    st.set('st-lb-faster'); st.sfx('ding', { vol: 0.5, rate: 0.8 }); st.mood('tom', 'joy');
    await minh;
    st.mood('minh', 'happy');
    await st.wait(300);
  } },
  { key: ['Everyone cheered'], icon: '📣', label: 'cheered', async play(st) {
    st.look(X.finish + 70);
    st.set('st-cheer'); st.sfx('cheer', { vol: 0.9 });
    st.pose('lan', 'cheer'); st.act('lan', 'cheer'); st.mood('lan', 'joy');
    st.pose('tom', 'clap'); st.act('tom', 'clap'); st.pose('minh', 'clap'); st.act('minh', 'clap');
    st.act('bip', 'jump'); st.sfx('clap', { vol: 0.6 });
    await st.wait(1700);
    st.set('st-cheer', false);
    for (const id of TEAM) { st.act(id, null); st.pose(id, 'stand'); }
  } },
  { key: ['In the high jump', 'jumped higher than the tallest boy', 'like springs'], icon: '🦘', label: 'jumped higher', async play(st) {
    off(st, 'st-lb-faster', 'st-lb-fastest', 'st-tape');
    st.look(1440, { dur: 1300 });
    const walkers = Promise.all([st.walk('minh', 1300, { speed: 170, follow: false, y: FLOOR }), st.walk('tom', 1250, { speed: 170, follow: false })]);
    await st.walk('bip', 1410, { speed: 220, follow: false });
    st.mood('b1', 'happy'); st.set('st-lb-tallest'); st.sfx('pop', { vol: 0.5 });
    st.set('st-bar-up'); st.sfx('ladder', { vol: 0.5 });
    await st.wait(900);
    st.mood('bip', 'wow');
    await st.walk('bip', X.post1 - 30, { speed: 260, follow: false });
    st.set('st-spring'); st.sfx('bump', { vol: 0.6, rate: 1.7 });
    await st.wait(260);
    st.sfx('whoosh', { vol: 0.8 });
    await st.walk('bip', (X.post1 + X.post2) / 2, { speed: 330, follow: false, y: 112 });
    st.set('st-lb-higher'); st.sfx('ding', { vol: 0.6 });
    await st.walk('bip', X.mat + 30, { speed: 320, follow: false, y: FLOOR - 12 });
    st.sfx('bump', { vol: 0.5, rate: 0.8 });
    st.set('st-spring', false); st.face('bip', -1); st.mood('bip', 'joy');
    st.mood('b1', 'wow'); st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await walkers;
    await st.wait(500);
  } },
  { key: ['Then came the tug of war'], icon: '🪢', label: 'tug of war', async play(st) {
    off(st, 'st-lb-tallest', 'st-lb-higher');
    st.place('hoa', X.mid, FLOOR - 30, 1); st.place('lan', 1880, FLOOR, 1);
    st.show('rope', true);
    st.look(X.mid - 60, { dur: 1600 });
    st.set('st-lb-tug'); st.sfx('whistle', { vol: 0.5 });
    st.pose('hoa', 'point');
    await Promise.all([
      st.walk('bip', 2080, { speed: 260, follow: false, y: FLOOR }),
      st.walk('minh', 2030, { speed: 260, follow: false }),
      st.walk('tom', 1985, { speed: 250, follow: false }),
      st.walk('lan', 1940, { speed: 120, follow: false }),
    ]);
    for (const id of ['bip', ...TEAM]) st.face(id, 1);
    for (const id of TEAM) st.mood(id, 'happy');
    st.mood('bip', 'happy');
    st.pose('hoa', 'stand');
    await st.wait(300);
  } },
  { key: ['Class 3B was bigger and stronger'], icon: '💪', label: 'bigger · stronger', async play(st) {
    st.set('st-lb-tug', false);
    st.look(X.mid + 40);
    st.place('b1', 2560, FLOOR, -1);
    await Promise.all([
      st.walk('b1', 2210, { speed: 170, follow: false }),
      st.walk('b2', 2265, { speed: 170, follow: false }),
      st.walk('b3', 2320, { speed: 170, follow: false }),
    ]);
    for (const id of B3) st.face(id, -1);
    st.set('st-lb-bigger'); st.sfx('bump', { vol: 0.7 });
    for (const id of B3) { st.pose(id, 'e106_flex'); st.mood(id, 'joy'); }
    await st.wait(700);
    st.set('st-lb-stronger'); st.sfx('bump', { vol: 0.8, rate: 0.8 });
    for (const id of ['minh', 'tom', 'lan']) st.mood(id, 'wow');
    st.mood('bip', 'wow');
    await st.wait(900);
    for (const id of B3) st.pose(id, 'stand');
  } },
  { key: ['Bip pulled', 'lighter than the others', 'flew into the air'], icon: '🚀', label: 'flew into the air', async play(st) {
    off(st, 'st-lb-bigger', 'st-lb-stronger');
    st.look(X.mid - 30);
    st.sfx('whistle', { vol: 0.5, rate: 1.1 });
    await st.walk('rope', X.mid, { speed: 120, follow: false, y: FLOOR - 58 });
    for (const id of [...TEAM, ...B3]) { st.pose(id, 'e106_pull'); st.act(id, 'e106pull'); st.mood(id, 'shut'); }
    st.act('bip', 'e106bpull'); st.mood('bip', 'shut');
    st.sfx('roll', { vol: 0.4 });
    await st.walk('rope', X.mid - 16, { speed: 40, follow: false });
    st.set('st-lb-lighter'); st.sfx('pop', { vol: 0.5 });
    await st.walk('rope', X.mid + 10, { speed: 50, follow: false });
    await st.wait(200);
    st.sfx('bump', { vol: 0.8, rate: 0.7 });
    st.walk('rope', X.mid + 46, { speed: 160, follow: false });
    st.act('bip', 'e106spin'); st.mood('bip', 'wow'); st.sfx('whoosh', { vol: 0.9 });
    await st.walk('bip', 2150, { speed: 330, follow: false, y: 120 });
    for (const id of TEAM) { st.mood(id, 'wow'); }
    await st.walk('bip', 2100, { speed: 280, follow: false, y: FLOOR + 16 });
    st.act('bip', null); st.face('bip', 1); st.sfx('bump', { vol: 0.5 });
  } },
  { key: ['Everyone laughed', 'Bip laughed the loudest'], icon: '😂', label: 'laughed the loudest', async play(st) {
    st.set('st-lb-lighter', false);
    st.look(X.mid - 30);
    for (const id of [...TEAM, ...B3]) { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'joy'); st.act(id, 'hop'); }
    st.pose('hoa', 'clap'); st.mood('hoa', 'joy');
    st.sfx('giggle', { vol: 0.6 });
    st.walk('rope', X.mid + 46, { speed: 160, follow: false, y: FLOOR + 6 });
    await st.wait(900);
    st.mood('bip', 'joy'); st.act('bip', 'jump'); st.talk('bip', true);
    st.set('st-lb-loud'); st.sfx('giggle', { vol: 1, rate: 1.3 });
    await st.wait(500);
    st.sfx('giggle', { vol: 1, rate: 1.15 });
    await st.wait(1000);
    st.talk('bip', false);
    for (const id of [...TEAM, ...B3]) st.act(id, null);
    st.pose('hoa', 'stand');
  } },
  { key: ["didn't win the tug of war", 'they won two races'], icon: '🥇', label: 'won two races', async play(st) {
    st.set('st-lb-loud', false);
    st.look(X.board - 110, { dur: 900 });
    for (const id of B3) { st.pose(id, 'cheer'); st.act(id, 'cheer'); st.mood(id, 'joy'); }
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(RIBBON(BLUE), [2265, 160], [X.board - 30, 162], { size: 22, dur: 600 });
    st.set('st-m3'); st.sfx('click', { vol: 0.7 });
    for (const id of TEAM) st.mood(id, 'sad');
    st.mood('bip', 'sad');
    await st.wait(1000);
    for (const id of B3) { st.act(id, null); st.pose(id, 'stand'); }
    st.sfx('whoosh', { vol: 0.4 });
    await st.fly(MEDAL, [2030, 160], [X.board - 34, 110], { size: 22, dur: 550 });
    st.set('st-m1'); st.sfx('ding', { vol: 0.6 });
    await st.fly(MEDAL, [2030, 160], [X.board - 8, 110], { size: 22, dur: 500 });
    st.set('st-m2'); st.sfx('ding', { vol: 0.6, rate: 1.2 });
    for (const id of TEAM) { st.mood(id, 'joy'); st.pose(id, 'cheer'); st.act(id, 'cheer'); }
    st.mood('bip', 'joy'); st.act('bip', 'jump');
    st.sfx('cheer', { vol: 0.6 });
    await st.wait(1000);
    for (const id of TEAM) { st.act(id, null); st.pose(id, 'stand'); }
  } },
  { key: ['This is the best day on Earth!'], icon: '🌍', label: 'the best day', async play(st) {
    st.look(X.mid - 60);
    st.mood('bip', 'joy'); bipSet(st, 'bip', 'bip-glow');
    st.set('st-lb-earth'); st.sfx('pop', { vol: 0.6 });
    await st.say('bip', 'This is the best day on Earth!', 2400);
    st.sfx('sparkle', { vol: 0.4 });
  } },
  { key: ['said Bip'], icon: '👽', label: 'said Bip', async play(st) {
    st.set('st-lb-earth', false);
    st.set('st-lb-said'); st.sfx('ding', { vol: 0.4 });
    st.act('bip', 'dance');
    for (const id of TEAM) { st.mood(id, 'joy'); st.pose(id, 'clap'); st.act(id, 'clap'); }
    st.sfx('clap', { vol: 0.6 });
    await st.wait(1500);
    for (const id of TEAM) { st.act(id, null); st.pose(id, 'stand'); }
  } },
];

export default {
  id: 'en106', worldW: W, floor: FLOOR, viewTop: 40, camStart: 80, css: KIT_CSS + BIP_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 4, 7, 9, 10],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'e106_hoa', x: X.start - 40, y: FLOOR - 18, s: 0.92 },
    { id: 'b3', kind: 'kid', who: 'e106_b3', x: 2520, s: 1.12, face: -1 },
    { id: 'b2', kind: 'kid', who: 'e106_b2', x: 2470, s: 1.18, face: -1 },
    { id: 'b1', kind: 'kid', who: 'e106_b1', x: 1440, s: 1.24, face: 1 },
    { id: 'lan', kind: 'kid', who: 'e106_lan', x: 400, s: 1.05 },
    { id: 'minh', kind: 'kid', who: 'e106_minh', x: 300 },
    { id: 'tom', kind: 'kid', who: 'e106_tom', x: 350 },
    { id: 'bip', kind: 'thing', svg: BIP_SVG, box: BIP_BOX, x: 140, face: 1 },
    { id: 'rope', kind: 'thing', svg: ROPE, box: [-236, -10, 472, 40], x: X.mid, y: FLOOR + 6 },
  ],
  init(st) {
    st.show('rope', false);
    for (const id of ['tom', 'minh', 'lan']) st.face(id, 1);
  },
};
