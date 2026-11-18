/**
 * Bài 112 "The Starfish Boy" (hiện tại đơn và tiếp diễn). Một bãi biển buổi sáng đi từ trái sang phải: đồi cát có cỏ và
 * chòi tre → bãi cát dài (sau cơn bão, hàng trăm con sao biển nằm phơi nắng, mặt buồn) → mép nước, sóng vỗ.
 * Ông cụ đi dạo từ trái sang, gặp cậu bé đang nhặt từng con sao biển ném xuống biển; sao biển về nước thì nổi lên vui vẻ.
 * Toạ độ cảnh: rộng 1800, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, label, speaker, sun, palm } from '../kit.js';

const FLOOR = 282;
const W = 1800;
const SEA = 1430;   // mép nước
const SURF = 268;   // mặt nước gần bờ
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e112_man: { adult: true, old: true, hair: 'short', hairC: '#E7E5E4', top: 'shirt', shirt: '#93C5FD', bottom: 'pants', bottomC: '#D6D3D1', shoe: '#A16207', hat: 'sun', moustache: true },
  e112_boy: { hair: 'neat', hairC: '#3B2A22', top: 'tee', shirt: '#FACC15', bottom: 'shorts', bottomC: '#0EA5E9', shoe: '#F59E0B' },
});

/** Sao biển (tâm ở gốc, bán kính r). sad = có thêm mặt buồn (hiện khi .st-sad). */
const SF = (r = 10, c = '#FB923C', sad = true) => {
  const pts = Array.from({ length: 10 }, (_, i) => { const a = (-90 + i * 36) * Math.PI / 180, rr = i % 2 ? r * 0.46 : r; return `${(Math.cos(a) * rr).toFixed(1)} ${(Math.sin(a) * rr).toFixed(1)}`; }).join(' L');
  const e = r * 0.2, y = r * 0.02;
  return `<path d="M${pts}Z" fill="${c}" stroke="${L}" stroke-width="${(r / 9).toFixed(2)}" stroke-linejoin="round"/>
    ${[0, 72, 144, 216, 288].map((a) => `<circle cy="${(-r * 0.62).toFixed(1)}" r="${(r * 0.07).toFixed(2)}" fill="#FED7AA" transform="rotate(${a})"/>`).join('')}
    <circle cx="${-e}" cy="${y - r * 0.08}" r="${(r * 0.08).toFixed(2)}" fill="#3B2A22"/><circle cx="${e}" cy="${y - r * 0.08}" r="${(r * 0.08).toFixed(2)}" fill="#3B2A22"/>
    <path class="e112-fh" d="M${-e * 0.8} ${y + r * 0.12} Q0 ${y + r * 0.3} ${e * 0.8} ${y + r * 0.12}" stroke="#3B2A22" stroke-width="${(r / 10).toFixed(2)}" fill="none" stroke-linecap="round"/>
    ${sad ? `<path class="e112-fs" d="M${-e * 0.8} ${y + r * 0.26} Q0 ${y + r * 0.1} ${e * 0.8} ${y + r * 0.26}" stroke="#3B2A22" stroke-width="${(r / 10).toFixed(2)}" fill="none" stroke-linecap="round"/>` : ''}`;
};
const COLORS = ['#FB923C', '#F87171', '#FBBF24', '#F472B6', '#FDBA74'];
/** Sao biển nằm trên cát (bg): [x, y, r, rot]. */
const SAND_SF = Array.from({ length: 46 }, (_, i) => [300 + ((i * 263) % 1110), FLOOR - 14 + ((i * 41) % 40), 7 + (i % 4) * 1.4, (i * 37) % 72]);
/** Sao biển nhặt được (nhặt theo thứ tự): id → [x, r]. */
const PICK = { p1: [1376, 11], p2: [1338, 11], p3: [1296, 12], m1: [1196, 11], m2: [1300, 11] };
/** Chỗ sao biển rơi xuống nước. */
const DROP = { p1: 1500, p2: 1556, p3: 1610, m1: 1474, m2: 1530 };

const PROPS = { e112_sf: `<g transform="translate(0 -3)">${SF(9, '#FB923C', false)}</g>` };
const POSES = {
  e112_wipe: { R: [150, 262], L: [10, 4], head: 4 },
  e112_pick: { R: [-6, -30], L: [-10, -36], dy: 26, head: 12 },
  e112_throw: { R: [168, 150], L: [40, 30], head: -6 },
  e112_show: { R: [40, -60], L: [40, -60] },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  const hut = `<g transform="translate(150 ${FLOOR})"><path d="M-46 -84 L0 -120 L46 -84Z" fill="#D6A35C" stroke="${L}" stroke-width="1.2"/>
    <path d="M-40 -88 L0 -116 M-24 -86 L0 -116 M24 -86 L0 -116 M40 -88 L0 -116" stroke="#A16207" stroke-width="1"/>
    <path d="M-38 -84 V0 M38 -84 V0" stroke="#92400E" stroke-width="5"/><rect x="-30" y="-36" width="60" height="6" fill="#B45309" stroke="${L}" stroke-width="0.8"/></g>`;
  const grassTuft = (x, y) => `<path d="M${x} ${y} q-4 -18 -12 -24 M${x} ${y} q0 -22 2 -28 M${x} ${y} q6 -16 14 -22" stroke="#4D7C0F" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
  return `
  ${sky(0, W, 315, 'e112sky')}
  <g class="e112-sun" transform="translate(420 74)"><g class="e112-sunin">${sun(26)}</g></g>
  ${cloud(160, 56, 0.9, 0)}${cloud(780, 46, 0.8, 2)}${cloud(1260, 64, 0.9, 4)}${cloud(1640, 50, 0.8, 1)}
  <!-- biển xa, đường chân trời -->
  <rect x="0" y="178" width="${W}" height="60" fill="#38BDF8"/>
  <g class="ek-wave">${Array.from({ length: 30 }, (_, i) => `<path d="M${20 + i * 60} ${186 + (i % 3) * 9} q6 -3 12 0 q6 3 12 0" stroke="#E0F2FE" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <g class="e112-boat"><g transform="translate(980 180)"><path d="M-22 -2 H22 L16 6 H-16Z" fill="#fff" stroke="${L}" stroke-width="0.8"/><path d="M0 -2 V-26 L14 -6Z" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g></g>
  <!-- cát -->
  <path d="M0 ${FLOOR - 70} Q140 ${FLOOR - 100} 300 ${FLOOR - 66} Q${SEA - 300} ${FLOOR - 62} ${SEA} ${FLOOR - 30} L${SEA + 70} ${FLOOR + 30} V315 H0Z" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/>
  <rect x="0" y="${FLOOR - 2}" width="${SEA + 40}" height="${315 - FLOOR + 2}" fill="#FCD98A"/>
  ${Array.from({ length: 34 }, (_, i) => `<circle cx="${(i * 97) % (SEA - 20)}" cy="${FLOOR + 6 + (i * 13) % 24}" r="1.4" fill="#D6A35C"/>`).join('')}
  <path d="M260 ${FLOOR + 10} Q600 ${FLOOR + 2} ${SEA - 40} ${FLOOR + 14}" stroke="#E9C46A" stroke-width="2" fill="none" stroke-dasharray="2 8"/>
  ${palm(60, FLOOR - 10, 0.9)}${hut}
  ${grassTuft(250, FLOOR - 40)}${grassTuft(40, FLOOR - 46)}${grassTuft(330, FLOOR - 38)}
  <!-- rong biển, vỏ ốc sau bão -->
  ${[520, 760, 1010, 1240].map((x, i) => `<path d="M${x} ${FLOOR + 20} q10 -10 22 -2 q10 -8 20 2" stroke="#15803D" stroke-width="3" fill="none" stroke-linecap="round" opacity="${0.6 + (i % 2) * 0.3}"/>`).join('')}
  <!-- sao biển trên cát -->
  <g class="e112-sfs">${SAND_SF.map(([x, y, r, a], i) => `<g class="e112-sf" style="animation-delay:${(i % 12) * 0.08}s"><g transform="translate(${x} ${y}) rotate(${a})">${SF(r, COLORS[i % 5])}</g></g>`).join('')}</g>
  ${Object.entries(PICK).map(([k, [x, r]], i) => `<g class="e112-pk e112-pk-${k}"><g transform="translate(${x} ${FLOOR + 6}) rotate(${i * 17})">${SF(r, COLORS[(i + 1) % 5])}</g></g>`).join('')}
  <g class="e112-try"><g transform="translate(980 ${FLOOR + 12}) rotate(10)">${SF(12, '#F87171')}</g></g>`;
}

function fg() {
  // sao biển đã về nước: nổi lên, mặt vui, lắc lư
  const swim = Object.entries(DROP).map(([k, x], i) => `<g class="e112-sw e112-sw-${k}"><g transform="translate(${x} ${SURF - 2})"><g class="e112-bob" style="animation-delay:${i * 0.3}s">${SF(10, COLORS[(i + 1) % 5], false)}</g></g></g>`).join('');
  return `
  ${swim}
  <!-- nước gần bờ (che nửa dưới sao biển nổi) -->
  <path d="M${SEA - 10} ${SURF + 6} Q${SEA + 160} ${SURF - 4} ${W} ${SURF + 4} V315 H${SEA + 40}Z" fill="#0EA5E9" opacity="0.92"/>
  <g class="e112-foam"><path d="M${SEA - 14} ${SURF + 8} q12 -8 24 0 q12 -8 24 0 q12 -8 24 0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <g class="ek-wave">${Array.from({ length: 8 }, (_, i) => `<path d="M${SEA + 40 + i * 48} ${SURF + 16 + (i % 2) * 10} q6 -3 12 0 q6 3 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- bão -->
  <g class="e112-storm"><rect x="0" y="0" width="${W}" height="315" fill="#334155" opacity="0.5"/>
    ${[200, 520, 840, 1160, 1480].map((x) => `<g transform="translate(${x} 70)"><ellipse rx="90" ry="26" fill="#64748B"/><ellipse cx="-40" cy="-16" rx="44" ry="22" fill="#475569"/><ellipse cx="36" cy="-14" rx="50" ry="24" fill="#64748B"/></g>`).join('')}
    <g class="e112-rain">${Array.from({ length: 70 }, (_, i) => `<path d="M${(i * 131) % W} ${30 + (i * 47) % 240} l-6 16" stroke="#BFDBFE" stroke-width="2" stroke-linecap="round"/>`).join('')}</g>
    <path class="e112-bolt" d="M880 92 L860 140 H878 L858 190 L906 128 H886 L904 92Z" fill="#FDE047" stroke="#CA8A04" stroke-width="1"/></g>
  <!-- nóng: hơi nóng bốc lên -->
  <g class="e112-heat">${[460, 620, 780].map((x, i) => `<path class="e112-hw" style="animation-delay:${i * 0.3}s" d="M${x} 230 q-8 -12 0 -24 q8 -12 0 -24" stroke="#F97316" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.7"/>`).join('')}</g>
  <!-- không về được biển -->
  <g class="e112-cant"><path d="M920 228 H1080" stroke="#0EA5E9" stroke-width="5" stroke-linecap="round" stroke-dasharray="10 8"/><path d="M1072 218 L1092 228 L1072 238Z" fill="#0EA5E9"/>
    <g transform="translate(1000 228)"><circle r="16" fill="#fff" stroke="#DC2626" stroke-width="3"/><path d="M-7 -7 L7 7 M7 -7 L-7 7" stroke="#DC2626" stroke-width="3.4" stroke-linecap="round"/></g></g>
  <!-- nhãn -->
  <g class="e112-lb e112-lb-morning">${label(400, 130, 'Every morning', '#EA580C', 18)}</g>
  <g class="e112-lb e112-lb-storm">${label(720, 130, 'a big storm', '#334155', 18)}</g>
  <g class="e112-lb e112-lb-many">${label(820, 168, 'hundreds of starfish', '#EA580C', 17)}</g>
  <g class="e112-lb e112-lb-hot">${label(560, 150, 'hot', '#DC2626', 22)}</g>
  <g class="e112-lb e112-lb-so">${label(1010, 150, 'so many!', '#EA580C', 20)}</g>
  <g class="e112-lb e112-lb-one">${label(DROP.p3 - 46, 214, 'that one', '#16A34A', 16)}</g>
  <g class="e112-lb e112-lb-too">${label(1270, 104, 'too', '#16A34A', 22)}</g>
  <g class="e112-lb e112-lb-askM">${speaker(1170, 96, 'the man')}</g>
  <g class="e112-lb e112-lb-askB">${speaker(1330, 140, 'the boy', '#0369A1')}</g>
  <g class="e112-ring"><circle cx="${DROP.p3}" cy="${SURF - 2}" r="20" fill="none" stroke="#FACC15" stroke-width="3"/></g>`;
}

const CSS = `
.e112-lb { opacity: 0; transition: opacity .3s; }
${['morning', 'storm', 'many', 'hot', 'so', 'one', 'too', 'askM', 'askB'].map((k) => `.st-lb-${k} .e112-lb-${k}`).join(', ')} { opacity: 1; }
.e112-sf, .e112-pk, .e112-try { opacity: 0; }
.st-sf .e112-sf, .st-sf .e112-pk, .st-sf .e112-try { animation: e112Pop .4s cubic-bezier(.3,1.5,.6,1) both; transform-box: fill-box; transform-origin: 50% 50%; }
@keyframes e112Pop { from { opacity: 0; transform: scale(.2); } to { opacity: 1; transform: none; } }
${Object.keys(PICK).map((k) => `.st-sf.st-pk-${k} .e112-pk-${k}`).join(', ')} { animation: none; opacity: 0; }
.e112-fs { display: none; }
.st-sad .e112-fs { display: inline; } .st-sad .e112-fh { display: none; }
.st-try .e112-try { animation: e112Try .5s ease-in-out 3 alternate both; transform-box: fill-box; transform-origin: 50% 50%; opacity: 1; }
@keyframes e112Try { from { transform: none; } to { transform: translateX(8px) rotate(14deg); } }
.e112-sw { opacity: 0; transform: translateY(14px); transition: opacity .2s, transform .5s cubic-bezier(.3,1.5,.6,1); }
${Object.keys(DROP).map((k) => `.st-sw-${k} .e112-sw-${k}`).join(', ')} { opacity: 1; transform: none; }
.e112-bob { animation: e112Bob 1.6s ease-in-out infinite alternate; }
@keyframes e112Bob { from { transform: translateY(1px) rotate(-8deg); } to { transform: translateY(-3px) rotate(8deg); } }
.st-wave .e112-sw-p3 .e112-bob { animation: e112Wave .3s ease-in-out infinite alternate; }
@keyframes e112Wave { from { transform: translateY(-2px) rotate(-18deg); } to { transform: translateY(-6px) rotate(18deg); } }
.e112-ring { opacity: 0; transform-box: fill-box; transform-origin: 50% 50%; }
.st-ring .e112-ring { animation: e112Ring .9s ease-out 2; }
@keyframes e112Ring { from { opacity: 1; transform: scale(.5); } to { opacity: 0; transform: scale(1.8); } }
.e112-storm { opacity: 0; transition: opacity .6s; pointer-events: none; }
.st-storm .e112-storm { opacity: 1; }
.e112-rain { animation: e112Rain .35s linear infinite; }
@keyframes e112Rain { from { transform: translate(0, -16px); } to { transform: translate(-6px, 16px); } }
.e112-bolt { opacity: 0; }
.st-storm .e112-bolt { animation: e112Bolt 1.6s steps(1) infinite; }
@keyframes e112Bolt { 0%, 40%, 60%, 100% { opacity: 0; } 45%, 52% { opacity: 1; } }
.e112-sunin { transition: transform .8s cubic-bezier(.3,1.4,.6,1); }
.st-hot .e112-sunin { transform: scale(1.7); }
.e112-heat { opacity: 0; transition: opacity .4s; }
.st-hot .e112-heat { opacity: 1; }
.e112-hw { animation: e112Heat 1.2s ease-in-out infinite; }
@keyframes e112Heat { 0% { transform: translateY(6px); opacity: 0; } 40% { opacity: .9; } 100% { transform: translateY(-14px); opacity: 0; } }
.e112-cant { opacity: 0; transition: opacity .3s; }
.st-cant .e112-cant { opacity: 1; }
.e112-boat { animation: e112Boat 30s ease-in-out infinite alternate; }
@keyframes e112Boat { to { transform: translateX(360px); } }
.e112-foam { animation: e112Foam 2.6s ease-in-out infinite alternate; }
@keyframes e112Foam { from { transform: translateX(-10px); } to { transform: translateX(8px); } }
@media (prefers-reduced-motion: reduce) {
  .e112-rain { animation-duration: 1s; } .st-wave .e112-sw-p3 .e112-bob { animation-duration: .7s; }
  .e112-boat { animation-duration: 60s; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Nhặt một con sao biển (đi tới, cúi xuống, cầm lên) rồi ném xuống biển (sao biển bay, tõm, nổi lên vui). */
async function pickThrow(st, who, k, { walk = true } = {}) {
  const [x] = PICK[k];
  if (walk) await st.walk(who, x - 26, { speed: 140, follow: false });
  st.face(who, 1);
  st.pose(who, 'e112_pick');
  await st.wait(420);
  st.set(`st-pk-${k}`); st.hold(who, 'e112_sf'); st.sfx('pop', { vol: 0.35, rate: 1.4 });
  await st.wait(260);
  st.pose(who, 'e112_throw');
  await st.wait(300);
  st.hold(who, null); st.pose(who, 'stand'); st.sfx('whoosh', { vol: 0.6 });
  const A = st.a(who);
  await st.fly(`<g transform="rotate(20)">${SF(10, '#FB923C', false)}</g>`, [A.x + 14, FLOOR - 150 * A.s], [DROP[k], SURF], { size: 26, dur: 700 });
  st.sfx('splash', { vol: 0.7 }); st.fx('drops', DROP[k], SURF - 4);
  st.set(`st-sw-${k}`);
}

const BEATS = [
  { key: ['Every morning', 'an old man walks on the beach'], icon: '🏖️', label: 'walks on the beach', async play(st) {
    st.look(330);
    st.set('st-lb-morning'); st.sfx('ding', { vol: 0.4 });
    st.sfx('wind', { vol: 0.35 });
    await st.walk('man', 460, { speed: 70, follow: false });
    st.set('st-lb-morning', false);
    st.mood('man', 'happy');
  } },
  { key: ['after a big storm', 'hundreds of starfish on the sand'], icon: '⭐', label: 'hundreds of starfish', async play(st) {
    st.look(560);
    st.set('st-storm'); st.set('st-lb-storm');
    await st.loop('rain', async () => {
      await st.wait(500); st.sfx('wind', { vol: 0.7 });
      await st.wait(900);
    }, { vol: 0.9 });
    off(st, 'st-storm', 'st-lb-storm');
    st.mood('man', 'wow');
    await st.wait(300);
    st.set('st-sf'); st.sfx('sparkle', { vol: 0.5 });
    st.look(820, { dur: 1800 });
    await st.wait(400);
    for (let i = 0; i < 4; i++) { st.sfx('pop', { vol: 0.3, rate: 1.2 + i * 0.15 }); await st.wait(180); }
    st.set('st-lb-many');
    await st.wait(1200);
  } },
  { key: ['The sun is hot'], icon: '☀️', label: 'hot', async play(st) {
    st.set('st-lb-many', false);
    st.look(520);
    st.set('st-hot'); st.sfx('sizzle', { vol: 0.25 });
    await st.wait(500);
    st.set('st-lb-hot');
    st.pose('man', 'e112_wipe'); st.mood('man', 'sad');
    await st.wait(1300);
    st.pose('man', 'stand');
  } },
  { key: ["The starfish can't go back to the sea"], icon: '🌊', label: "can't go back", async play(st) {
    st.set('st-lb-hot', false);
    st.look(940);
    st.set('st-sad');
    await st.wait(400);
    st.set('st-try'); st.sfx('roll', { vol: 0.4 });
    await st.wait(1300);
    st.set('st-cant'); st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1000);
  } },
  { key: ['Then the man sees a boy'], icon: '👦', label: 'sees a boy', async play(st) {
    off(st, 'st-cant', 'st-try');
    st.mood('man', 'happy');
    st.look(900);
    await st.walk('man', 1000, { speed: 120, follow: true, lead: 120 });
    st.look(1180, { dur: 900 });
    await st.wait(500);
    st.mood('man', 'wow'); st.pose('man', 'point'); st.sfx('ding', { vol: 0.4 });
    st.act('boy', 'hop');
    await st.wait(1000);
    st.pose('man', 'stand');
  } },
  { key: ['picking up starfish', 'throwing them into the water', 'one by one'], icon: '🤾', label: 'throwing them', async play(st) {
    st.look(1420);
    await pickThrow(st, 'boy', 'p1', { walk: false });
    await st.wait(200);
    await pickThrow(st, 'boy', 'p2');
    st.mood('boy', 'joy');
  } },
  { key: ['What are you doing'], icon: '❓', label: 'What are you doing?', async play(st) {
    st.mood('man', 'happy');
    st.look(1250);
    await st.walk('man', 1170, { speed: 120, follow: false });
    st.face('boy', -1);
    st.pose('man', 'open');
    await st.say('man', 'What are you doing?', 1900);
  } },
  { key: ['the man asks'], icon: '🗣️', label: 'the man asks', async play(st) {
    st.set('st-lb-askM'); st.sfx('ding', { vol: 0.35, rate: 1.3 });
    st.pose('man', 'shrug'); st.act('man', 'nod');
    await st.wait(1400);
    st.act('man', null);
  } },
  { key: ['I am helping the starfish'], icon: '🤲', label: 'helping', async play(st) {
    st.set('st-lb-askM', false); st.pose('man', 'stand');
    st.chest('boy', `<g transform="translate(0 -8)">${SF(11, '#F472B6', false)}</g>`); st.pose('boy', 'e112_show'); st.mood('boy', 'joy');
    st.sfx('pop', { vol: 0.4 });
    const say = st.say('boy', 'I am helping the starfish.', 2200);
    await st.wait(700);
    st.fx('sparkle', 1330, FLOOR - 74, { quiet: true });
    await say;
  } },
  { key: ['They need water', 'the boy says'], icon: '💧', label: 'They need water', async play(st) {
    st.chest('boy', null);
    st.face('boy', 1); st.pose('boy', 'point'); st.act('boy', 'point');
    st.set('st-lb-askB');
    await st.wait(500);
    st.fx('drops', 1520, SURF - 10); st.sfx('splash', { vol: 0.4, rate: 1.2 });
    await st.wait(1200);
    st.act('boy', null); st.pose('boy', 'stand'); st.face('boy', -1);
  } },
  { key: ['But there are so many'], icon: '🤯', label: 'so many!', async play(st) {
    st.set('st-lb-askB', false);
    st.pose('man', 'open'); st.mood('man', 'wow');
    st.look(1060, { dur: 900 });
    st.sfx('whoosh', { vol: 0.5 });
    const say = st.say('man', 'But there are so many!', 2000);
    await st.wait(600);
    st.set('st-lb-so'); st.sfx('pop', { vol: 0.4 });
    await say;
  } },
  { key: ["It doesn't make a difference"], icon: '🤷', label: "doesn't make a difference", async play(st) {
    st.set('st-lb-so', false);
    st.look(1250);
    st.pose('man', 'shrug'); st.mood('man', 'sad'); st.act('man', 'no');
    st.sfx('buzz-no', { vol: 0.4 });
    await st.say('man', "It doesn't make a difference.", 2300);
    st.act('man', null); st.pose('man', 'stand');
  } },
  { key: ['The boy throws one more starfish into the sea'], icon: '⭐', label: 'one more', async play(st) {
    st.mood('man', 'happy');
    st.look(1420);
    await pickThrow(st, 'boy', 'p3');
  } },
  { key: ['He smiles'], icon: '😊', label: 'smiles', async play(st) {
    st.face('boy', -1); st.mood('boy', 'joy'); st.act('boy', 'hop');
    st.sfx('sparkle', { vol: 0.4 });
    await st.wait(1200);
  } },
  { key: ['It makes a difference to that one'], icon: '💛', label: 'to that one', async play(st) {
    st.look(1440);
    st.face('boy', 1); st.pose('boy', 'point'); st.act('boy', 'point');
    const say = st.say('boy', 'It makes a difference to that one.', 2600);
    await st.wait(500);
    st.set('st-ring'); st.set('st-wave'); st.set('st-lb-one'); st.sfx('ding', { vol: 0.4 });
    await st.wait(600);
    st.fx('hearts', DROP.p3, SURF - 30);
    await say;
    st.act('boy', null); st.pose('boy', 'stand');
  } },
  { key: ['Now the man is throwing starfish, too'], icon: '🤝', label: 'throwing, too', async play(st) {
    off(st, 'st-ring', 'st-lb-one');
    st.look(1330);
    st.mood('man', 'joy');
    const boy = pickThrow(st, 'boy', 'm2');
    await st.wait(400);
    await pickThrow(st, 'man', 'm1', { walk: false });
    await boy;
    st.set('st-lb-too'); st.sfx('hearts', { vol: 0.5 });
    st.act('boy', 'hop');
    await st.wait(900);
  } },
];

export default {
  id: 'en112', worldW: W, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 3, 5, 12, 15],
  cast: [
    { id: 'man', kind: 'adult', who: 'e112_man', x: 150 },
    { id: 'boy', kind: 'kid', who: 'e112_boy', x: PICK.p1[0] - 26 },
  ],
};
