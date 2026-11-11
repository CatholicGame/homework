/**
 * Bài 56 "Saving Water" (need to / try to / want to / decide to): lớp cô Hoa (bảng vẽ giọt nước, SAVE WATER) → phố lúc chiều
 * → nhà cắt ngang: phòng tắm (vòi sen, đồng hồ cát tắm nhanh, bồn rửa với cốc nước) → ban công (mưa, xô hứng nước, chậu cây)
 * → bếp (vòi nhỏ giọt bố sửa, nồi cơm, mẹ giữ nước vo gạo) → vườn rau (cả nhà, Kitty nằm khô ráo trên đệm).
 * Động từ + to V hiện thành nhãn nhỏ cạnh hành động: need to save, tried to, decided to…
 * Toạ độ cảnh: rộng 2700, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, board, desk, fence, thought, road } from '../kit.js';

const FLOOR = 282;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { board: 200, minh0: 330, tom: 450, door: 560, home: 900, shower: 975, sink: 1120, balc: 1200, bucket: 1340, kitchen: 1490, tap: 1580, pot: 1780, garden: 1900, veg: 2080, kitty: 2440 };

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const DROP = (c = '#38BDF8') => `<path d="M0 -14 Q10 -2 10 4 A10 10 0 0 1 -10 4 Q-10 -2 0 -14Z" fill="${c}" stroke="${L}" stroke-width="1"/><ellipse cx="-4" cy="2" rx="2" ry="3.4" fill="#E0F2FE"/>`;
const WRENCH = `<g transform="rotate(180)"><rect x="-2" y="-2" width="4" height="18" rx="1.6" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/><path d="M-6 16 a6 6 0 1 0 12 0 l-3 0 v4 h-6 v-4Z" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/></g>`;
const JUG = `<g transform="rotate(180) translate(0 -4)"><path d="M-8 0 H8 L6 20 H-6Z" fill="#E0F2FE" stroke="${L}" stroke-width="0.9"/><path d="M-7 6 H7 L6 19 H-6Z" fill="#F8FAFC"/><path d="M8 4 q6 2 4 8" stroke="${L}" stroke-width="1.2" fill="none"/></g>`;
const CUP = `<g transform="translate(0 -4)"><path d="M-5 -8 H5 L4 6 H-4Z" fill="#E0F2FE" stroke="${L}" stroke-width="0.8"/><path d="M-4.6 -3 H4.6 L4 6 H-4Z" fill="#38BDF8"/></g>`;

const POSES = {
  e056_teach: { R: [100, 112], L: [10, 4], head: -4 },
  e056_shower: { R: [150, 250], L: [150, 250], head: -6 },
  e056_fix: { R: [70, 120], L: [60, 110], head: 10 },
  e056_pour: { R: [80, 130], L: [10, 4], head: 8 },
  e056_one: { R: [140, 160], L: [10, 4], head: -4 },
  e056_can: { R: [60, 90], L: [10, 4], head: 6 },
};
const PROPS = { e056_wrench: WRENCH, e056_jug: JUG, e056_cup: CUP };

function bg() {
  return `
  ${sky(0, 2700, 315, 'e056sky')}
  ${cloud(700, 50, 0.9, 0)}${cloud(2300, 46, 1, 2)}${cloud(2600, 70, 0.8, 4)}
  <!-- Lớp học -->
  ${room(0, X.door, FLOOR, '#E0F2FE', '#D9A066')}
  ${board(X.board - 100, 70, 220, 104)}
  <g class="e056-lesson"><g transform="translate(${X.board - 40} 122) scale(2)">${DROP()}</g>
    <g transform="translate(${X.board + 50} 108)"><rect x="-20" y="-6" width="30" height="9" rx="3" fill="#CBD5E1"/><rect x="2" y="-6" width="9" height="18" rx="3" fill="#CBD5E1"/><path d="M6 16 v14" stroke="#7DD3FC" stroke-width="4" stroke-dasharray="4 4"/></g></g>
  <g class="e056-save"><text x="${X.board + 10}" y="118" text-anchor="middle" ${NUN} font-size="24" fill="#F8FAFC">SAVE</text><text x="${X.board + 10}" y="152" text-anchor="middle" ${NUN} font-size="24" fill="#7DD3FC">WATER</text>
    <path d="M${X.board + 82} 116 c-8 -12 -24 -2 -12 10 l12 10 l12 -10 c12 -12 -4 -22 -12 -10Z" fill="#F87171"/></g>
  ${windowBox(440, 70, 80, 70)}
  <g class="e056-lb e056-lb-need">${label(X.board + 10, 56, 'need to save', '#0369A1', 15)}</g>
  <rect x="${X.door - 6}" y="0" width="12" height="${FLOOR}" fill="#C08B5C" stroke="${L}"/>
  <!-- Phố lúc chiều -->
  ${tree(700, FLOOR - 8, 0.9)}${tree(820, FLOOR - 8, 0.75, '#F59E0B')}
  ${road(X.door + 6, X.home - X.door - 6, FLOOR + 4)}
  <g class="e056-lb e056-lb-want">${label(820, 70, 'wanted to help', '#7C3AED', 15)}</g>
  <!-- Nhà: phòng tắm -->
  <rect x="${X.home - 12}" y="40" width="12" height="${FLOOR - 40}" fill="#C08B5C" stroke="${L}"/>
  <path d="M${X.home - 30} 48 L${X.home + 300} 48 L${X.home + 300} 40 L${X.home - 30} 40Z" fill="#EF4444" stroke="${L}"/>
  <rect x="${X.home}" y="48" width="${X.balc - X.home}" height="${FLOOR - 48}" fill="#E0F2FE"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${X.home} ${70 + i * 28} H${X.balc}" stroke="#BFDBFE" stroke-width="1"/>`).join('')}${Array.from({ length: 10 }, (_, i) => `<path d="M${X.home + 15 + i * 30} 48 V${FLOOR}" stroke="#BFDBFE" stroke-width="1"/>`).join('')}
  <rect x="${X.home}" y="${FLOOR}" width="${X.balc - X.home}" height="33" fill="#93C5FD" stroke="${L}"/>
  <g transform="translate(${X.shower} 0)"><path d="M-30 60 V80 Q-30 90 -14 90" stroke="#94A3B8" stroke-width="4" fill="none"/><path d="M-22 92 H12 L4 84 H-14Z" fill="#CBD5E1" stroke="${L}"/>
    <g class="e056-stream">${[-14, -6, 2, 10].map((x, i) => `<path class="e056-fall" style="animation-delay:${i * 0.12}s" d="M${x - 3} 96 V120" stroke="#38BDF8" stroke-width="2.4" stroke-linecap="round"/>`).join('')}</g></g>
  <g transform="translate(${X.shower + 64} 110)"><rect x="-18" y="-22" width="36" height="44" rx="5" fill="#fff" stroke="${L}"/>
    <path d="M-10 -16 H10 L0 0 L10 16 H-10 L0 0Z" fill="#FEF3C7" stroke="${L}" stroke-width="1"/><g class="e056-sand"><path d="M-6 -12 H6 L0 -2Z" fill="#F59E0B"/></g><g class="e056-sand2"><path d="M-8 14 H8 L0 4Z" fill="#F59E0B"/></g></g>
  <g class="e056-lb e056-lb-short">${label(X.shower + 30, 74, 'shorter showers', '#0369A1', 13)}</g>
  <g transform="translate(${X.sink} 0)"><rect x="-24" y="96" width="48" height="56" rx="6" fill="#E0F2FE" stroke="${L}" stroke-width="1.2"/><rect x="-20" y="100" width="40" height="48" rx="4" fill="#BAE6FD" opacity="0.7"/>
    <path d="M-30 186 H30 Q28 202 0 204 Q-28 202 -30 186Z" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-6" y="204" width="12" height="${FLOOR - 204}" fill="#fff" stroke="${L}"/>
    <path d="M14 186 V174 H4" stroke="#94A3B8" stroke-width="4" fill="none" stroke-linecap="round"/>
    <g transform="translate(-16 186)" class="e056-cupbg">${CUP}</g></g>
  <g class="e056-lb e056-lb-cup">${label(X.sink, 72, 'a cup of water', '#0369A1', 13)}</g>
  <!-- Ban công (mái che một nửa, mưa ở ngoài) -->
  <rect x="${X.balc - 8}" y="48" width="10" height="${FLOOR - 48}" fill="#C08B5C" stroke="${L}"/>
  <rect x="${X.balc}" y="${FLOOR}" width="${X.kitchen - X.balc}" height="33" fill="#D6D3D1" stroke="${L}"/>
  <path d="M${X.balc} 80 H${X.bucket - 6} L${X.bucket + 4} 92 H${X.balc}Z" fill="#EF4444" stroke="${L}"/>
  <g class="e056-rain">${Array.from({ length: 18 }, (_, i) => `<path class="e056-drop" style="animation-delay:${((i * 0.37) % 1).toFixed(2)}s" d="M${X.bucket - 10 + (i % 6) * 18} ${60 + Math.floor(i / 6) * 50} l-3 10" stroke="#38BDF8" stroke-width="2" stroke-linecap="round"/>`).join('')}
    <path class="e056-spout" d="M${X.bucket - 2} 94 V${FLOOR - 40}" stroke="#38BDF8" stroke-width="3" stroke-dasharray="6 5"/></g>
  <g transform="translate(${X.bucket} ${FLOOR})"><path d="M-22 -40 H22 L18 0 H-18Z" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
    <g class="e056-bfill" style="transform-origin:0px -6px"><path d="M-19 -34 H19 L18 -6 H-18Z" fill="#7DD3FC"/></g><path d="M-22 -40 H22" stroke="${L}" stroke-width="2"/></g>
  ${[1446, 1476].map((x, i) => `<g transform="translate(${x} ${FLOOR})"><path d="M-11 0 L-13 -18 H13 L11 0Z" fill="#C2410C" stroke="${L}"/><g class="e056-plant" style="transition-delay:${i * 0.2}s"><path d="M0 -18 q-12 -10 -4 -26 M0 -18 q12 -12 4 -30 M0 -18 V-40" stroke="#16A34A" stroke-width="3" fill="none" stroke-linecap="round"/></g></g>`).join('')}
  <g class="e056-lb e056-lb-rain">${label(1330, 64, 'rainwater', '#0369A1', 14)}</g>
  <!-- Bếp -->
  ${room(X.kitchen, X.garden - X.kitchen, FLOOR, '#FEF9C3', '#C08B5C')}
  <rect x="${X.kitchen - 4}" y="48" width="10" height="${FLOOR - 48}" fill="#C08B5C" stroke="${L}"/>
  <rect x="1530" y="196" width="320" height="${FLOOR - 196}" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><rect x="1524" y="190" width="332" height="8" rx="2" fill="#E5E7EB" stroke="${L}"/>
  <g transform="translate(${X.tap} 190)"><rect x="-22" y="-2" width="44" height="6" rx="2" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/>
    <path d="M10 -2 V-26 H-6 V-18" stroke="#94A3B8" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M10 -2 V-26 H-6 V-18" stroke="${L}" stroke-width="0.6" fill="none"/>
    <g class="e056-drip"><path d="M-6 -14 q3 4 0 6 q-3 -2 0 -6Z" fill="#38BDF8" stroke="${L}" stroke-width="0.5"/></g></g>
  <g class="e056-lb e056-lb-drip">${label(X.tap, 120, 'drip, drip', '#0369A1', 14)}</g>
  <g class="e056-lb e056-lb-quick">${label(X.tap, 120, 'quickly', '#15803D', 15)}</g>
  <g transform="translate(${X.pot} 190)"><rect x="-26" y="-6" width="52" height="6" rx="2" fill="#475569" stroke="${L}"/><path d="M-20 -6 V-30 H20 V-6Z" fill="#CBD5E1" stroke="${L}"/><path d="M-20 -30 H20" stroke="${L}" stroke-width="2"/>
    <path d="M-12 -32 h24" stroke="#F8FAFC" stroke-width="3"/></g>
  <g class="e056-lb e056-lb-rice">${label(X.pot - 20, 112, 'rice water', '#B45309', 14)}</g>
  ${windowBox(1680, 70, 70, 60)}
  <rect x="${X.garden - 6}" y="48" width="10" height="${FLOOR - 48}" fill="#C08B5C" stroke="${L}"/>
  <path d="M${X.home - 30} 48 H${X.garden + 20}" stroke="${L}" stroke-width="1.2"/><rect x="${X.balc + 300}" y="40" width="${X.garden + 20 - X.balc - 300}" height="8" fill="#EF4444" stroke="${L}"/>
  <!-- Vườn rau -->
  <path d="M${X.garden + 4} 228 Q2100 200 2300 226 T2700 220 V${FLOOR} H${X.garden + 4}Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  ${tree(2560, 232, 0.95)}
  <rect x="${X.garden + 4}" y="${FLOOR - 4}" width="${2700 - X.garden}" height="40" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 16 }, (_, i) => `<path d="M${X.garden + 30 + i * 50} ${FLOOR + 12} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <rect x="${X.veg - 70}" y="${FLOOR - 12}" width="140" height="14" rx="6" fill="#92400E" stroke="${L}"/>
  ${[-50, -18, 14, 46].map((dx, i) => `<g transform="translate(${X.veg + dx} ${FLOOR - 10})"><g class="e056-veg" style="transition-delay:${i * 0.15}s"><circle cx="0" cy="-10" r="10" fill="#86EFAC" stroke="${L}" stroke-width="0.9"/><path d="M-6 -10 Q0 -4 6 -10 M0 -18 V-4" stroke="#16A34A" stroke-width="1" fill="none"/></g></g>`).join('')}
  <g transform="translate(${X.kitty} ${FLOOR})"><ellipse cx="0" cy="-4" rx="30" ry="7" fill="#FDA4AF" stroke="${L}"/><ellipse cx="0" cy="-7" rx="22" ry="4" fill="#FBCFE8"/></g>
  <g class="e056-lb e056-lb-every">${label(2200, 70, 'every drop', '#0369A1', 15)}</g>
  <g class="e056-lb e056-lb-day">${label(2200, 70, 'every day', '#15803D', 16)}</g>
  <g class="e056-lb e056-lb-kitty">${label(X.kitty, 140, "didn't need to", '#B45309', 14)}</g>
  <g class="e056-lb e056-lb-nowater">${label(2480, 120, 'no water!', '#DC2626', 15)}</g>`;
}

function fg() {
  return `
  ${desk(X.minh0, FLOOR)}${desk(X.tom, FLOOR, '#FB923C')}
  <!-- rèm tắm (che nửa dưới người tắm) -->
  <g transform="translate(${X.shower} 0)"><path d="M-40 204 H44 V${FLOOR} H-40Z" fill="#A5F3FC" stroke="${L}" stroke-width="1" opacity="0.92"/>${[-26, -8, 10, 28].map((x) => `<path d="M${x} 208 V${FLOOR - 2}" stroke="#67E8F9" stroke-width="2"/>`).join('')}</g>
  ${fence(2560, 120, FLOOR + 4)}
  ${bush(2010, FLOOR + 8, 0.8, '#4ADE80')}
  <rect class="e056-eve" x="${X.door + 6}" y="0" width="${2700 - X.door}" height="315" fill="#F97316"/>`;
}

const CSS = `
.e056-lb { opacity: 0; transition: opacity .35s; }
.st-lb-need .e056-lb-need, .st-lb-want .e056-lb-want, .st-lb-short .e056-lb-short, .st-lb-cup .e056-lb-cup, .st-lb-rain .e056-lb-rain,
.st-lb-drip .e056-lb-drip, .st-lb-quick .e056-lb-quick, .st-lb-rice .e056-lb-rice, .st-lb-every .e056-lb-every, .st-lb-day .e056-lb-day,
.st-lb-kitty .e056-lb-kitty, .st-lb-nowater .e056-lb-nowater { opacity: 1; }
.e056-lesson, .e056-save { opacity: 0; transition: opacity .5s; }
.st-lesson .e056-lesson, .st-save .e056-save { opacity: 1; } .st-save .e056-lesson { opacity: 0; }
.e056-eve { opacity: 0; transition: opacity 1.4s; pointer-events: none; } .st-eve .e056-eve { opacity: .14; }
/* vòi sen + đồng hồ cát */
.e056-stream { opacity: 0; transition: opacity .3s; } .st-shower .e056-stream { opacity: 1; }
.e056-fall { animation: e056Fall .45s linear infinite; }
@keyframes e056Fall { from { transform: translateY(-6px); opacity: 1; } to { transform: translateY(70px); opacity: .2; } }
.e056-sand { transform-box: fill-box; transform-origin: 50% 100%; transition: transform 2.4s linear; } .st-sand .e056-sand { transform: scaleY(.1); }
.e056-sand2 { transform: scale(.2); transform-box: fill-box; transform-origin: 50% 100%; transition: transform 2.4s linear; } .st-sand .e056-sand2 { transform: scale(1); }
.e056-cupbg { transition: opacity .2s; } .st-cup .e056-cupbg { opacity: 0; }
/* mưa, xô */
.e056-rain { opacity: 0; transition: opacity .5s; } .st-rain .e056-rain { opacity: 1; }
.e056-drop { animation: e056Rain .6s linear infinite; }
@keyframes e056Rain { from { transform: translate(0, -20px); } to { transform: translate(-8px, 60px); } }
.e056-spout { animation: e056Spout .4s linear infinite; } @keyframes e056Spout { to { stroke-dashoffset: -11; } }
.e056-bfill { transform: scaleY(.1); transition: transform 2.2s ease-out; } .st-bucket .e056-bfill { transform: scaleY(1); }
.e056-plant { transform: scale(.6) rotate(-14deg); transform-origin: 0 -18px; transition: transform .9s cubic-bezier(.3,1.5,.6,1); } .st-plants .e056-plant { transform: none; }
/* vòi nhỏ giọt */
.e056-drip { opacity: 0; } .st-drip .e056-drip { opacity: 1; animation: e056Drip 1s ease-in infinite; }
@keyframes e056Drip { 0%, 30% { transform: translateY(0); opacity: 1; } 90% { transform: translateY(22px); opacity: 1; } 100% { transform: translateY(24px); opacity: 0; } }
.e056-veg { transform: scale(.45); transform-origin: 0 0; transition: transform 1s cubic-bezier(.3,1.4,.6,1); } .st-veg .e056-veg { transform: scale(1.1); }
.es-ac.act-e056-fix .pp-fowR { animation: e056Fix .14s linear infinite alternate; }
@keyframes e056Fix { from { transform: rotate(-26deg); } to { transform: rotate(20deg); } }
@media (prefers-reduced-motion: reduce) {
  .e056-fall, .e056-drop { animation-duration: 1.4s; }
  .e056-spout { animation-duration: 1.2s; }
  .es-ac.act-e056-fix .pp-fowR { animation-duration: .4s; }
}
`;

const BEATS = [
  { key: ['taught the class about water'], icon: '👩‍🏫', label: 'about water', async play(st) {
    st.look(250);
    st.pose('hoa', 'e056_teach'); st.act('hoa', 'point'); st.talk('hoa', true);
    st.set('st-lesson'); st.sfx('pencil', { vol: 0.5 });
    await st.wait(1600);
    st.act('hoa', null); st.talk('hoa', false);
    st.mood('minh', 'wow'); st.mood('tom', 'wow');
    await st.wait(400);
  } },
  { key: ['need to save it'], icon: '💧', label: 'need to save it', async play(st) {
    st.set('st-save'); st.set('st-lb-need'); st.sfx('pop', { vol: 0.6 });
    st.face('hoa', 1); st.pose('hoa', 'open'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
    await st.say('hoa', 'We need to save it!', 1800);
    st.pose('minh', 'sitClap'); st.act('minh', 'clap'); st.pose('tom', 'sitClap'); st.act('tom', 'clap'); st.sfx('clap', { vol: 0.6 });
    await st.wait(600);
    st.act('minh', null); st.act('tom', null);
  } },
  { key: ['That evening', 'wanted to help'], icon: '🏠', label: 'wanted to help', async play(st) {
    st.set('st-lb-need', false); st.pose('tom', 'sitDesk'); st.pose('hoa', 'wave'); st.act('hoa', 'wave');
    st.pose('minh', 'stand'); st.set('st-eve');
    await st.walk('minh', 760, { speed: 170, lead: 40 });
    st.act('hoa', null);
    st.show('think', true); st.sfx('pop', { vol: 0.6 }); st.set('st-lb-want'); st.mood('minh', 'joy'); st.pose('minh', 'me');
    await st.wait(1300);
    st.show('think', false); st.pose('minh', 'stand');
    await st.walk('minh', X.home - 40, { speed: 170, lead: 60 });
    await st.dress('minh', 'en_minh_home');
  } },
  { key: ['tried to take shorter showers'], icon: '🚿', label: 'shorter showers', async play(st) {
    st.set('st-lb-want', false);
    await st.walk('minh', X.shower, { speed: 150, lead: 40 });
    st.pose('minh', 'e056_shower'); st.act('minh', 'wash'); st.mood('minh', 'shut');
    st.set('st-shower'); st.set('st-sand'); st.sfx('tap-water', { vol: 0.5 }); st.set('st-lb-short');
    await st.wait(2200);
    st.set('st-shower', false); st.act('minh', null); st.mood('minh', 'joy'); st.pose('minh', 'cheer');
    await st.wait(500);
  } },
  { key: ['a cup of water', 'brush his teeth'], icon: '🪥', label: 'a cup of water', async play(st) {
    st.set('st-lb-short', false); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    await st.walk('minh', X.sink, { speed: 140, lead: 20 });
    st.set('st-cup'); st.hold('minh', 'e056_cup'); st.pose('minh', 'give'); st.set('st-lb-cup'); st.sfx('tap-water', { vol: 0.45 });
    await st.wait(600);
    st.hold('minh', 'toothbrush'); st.pose('minh', 'brush'); st.act('minh', 'brush'); st.sfx('brush-teeth', { vol: 0.5 });
    st.fx('bubbles', X.sink + 4, 160);
    await st.wait(1500);
    st.act('minh', null);
  } },
  { key: ['collect rainwater', 'for the plants'], icon: '🪣', label: 'rainwater', async play(st) {
    st.set('st-lb-cup', false); st.set('st-cup', false); st.hold('minh', null); st.pose('minh', 'stand');
    st.look(1340);
    st.set('st-rain'); st.sfx('rain', { vol: 0.5 });
    st.pose('lan', 'point'); st.mood('lan', 'joy');
    await st.wait(300);
    st.set('st-bucket'); st.set('st-lb-rain');
    await st.wait(1300);
    st.hold('lan', 'watering'); st.pose('lan', 'e056_can');
    await st.walk('lan', 1412, { speed: 90, follow: false });
    st.face('lan', 1); st.pose('lan', 'e056_can');
    st.fx('drops', 1452, FLOOR - 50); st.set('st-plants'); st.sfx('pour', { vol: 0.55 });
    await st.wait(1000);
  } },
  { key: ['fix a dripping tap', 'fixed it quickly'], icon: '🔧', label: 'dripping tap', async play(st) {
    st.set('st-lb-rain', false); st.set('st-rain', false);
    st.look(X.tap + 60);
    st.set('st-lb-drip'); st.sfx('drip', { vol: 0.7 });
    await st.wait(900);
    st.set('st-lb-drip', false);
    st.hold('dad', 'e056_wrench'); st.pose('dad', 'e056_fix'); st.act('dad', 'e056-fix'); st.sfx('bike-fix', { vol: 0.5 });
    await st.wait(1000);
    st.act('dad', null); st.set('st-drip', false); st.set('st-lb-quick');
    st.fx('sparkle', X.tap - 6, 176, { quiet: true }); st.sfx('ding', { vol: 0.6 }); st.pose('dad', 'cheer'); st.mood('dad', 'joy');
    await st.wait(800);
  } },
  { key: ['keep the rice water', 'for the garden'], icon: '🍚', label: 'rice water', async play(st) {
    st.set('st-lb-quick', false); st.hold('dad', null); st.pose('dad', 'stand');
    st.look(X.pot + 40);
    st.hold('mum', 'e056_jug'); st.pose('mum', 'carry'); st.set('st-lb-rice'); st.sfx('pop', { vol: 0.6 }); st.mood('mum', 'joy');
    await st.wait(700);
    await st.walk('mum', X.veg - 74, { speed: 170, lead: 30 });
    st.set('st-lb-rice', false);
    st.pose('mum', 'e056_pour');
    st.fx('drops', X.veg - 44, FLOOR - 50); st.sfx('pour', { vol: 0.55 });
    await st.wait(300);
    st.set('st-veg');
    await st.wait(900);
  } },
  { key: ['Every drop is important'], icon: '💦', label: 'every drop', async play(st) {
    st.hold('mum', null); st.pose('mum', 'stand');
    st.place('minh', X.garden - 30, FLOOR, 1);
    st.look(X.veg + 80);
    await st.walk('minh', X.veg + 90, { speed: 200, follow: false });
    st.pose('minh', 'e056_one'); st.mood('minh', 'joy'); st.set('st-lb-every'); st.sfx('whoosh', { vol: 0.5 });
    await st.fly(`<g transform="scale(1.4)">${DROP()}</g>`, [X.veg + 100, 120], [X.veg + 40, FLOOR - 24], { size: 30, dur: 800 });
    st.fx('sparkle', X.veg + 40, FLOOR - 24, { quiet: true }); st.sfx('drip', { vol: 0.8 });
    await st.say('minh', 'Every drop!', 1100);
  } },
  { key: ['try to save water every day'], icon: '📅', label: 'every day', async play(st) {
    st.set('st-lb-every', false);
    st.place('lan', X.garden - 30, FLOOR, 1); st.place('dad', X.garden - 60, FLOOR, 1); st.hold('lan', null);
    await Promise.all([
      st.walk('lan', X.veg + 214, { speed: 300, follow: false }),
      st.walk('dad', X.veg + 150, { speed: 260, follow: false }),
    ]);
    st.set('st-lb-day');
    for (const id of ['minh', 'lan', 'dad', 'mum']) { st.pose(id, 'cheer'); st.act(id, 'cheer'); st.mood(id, 'joy'); }
    st.sfx('cheer', { vol: 0.55 }); st.sfx('clap', { vol: 0.5 });
    await st.wait(1500);
    for (const id of ['minh', 'lan', 'dad', 'mum']) st.act(id, null);
  } },
  { key: ["didn't need to help"], icon: '🐱', label: "didn't need to", async play(st) {
    st.set('st-lb-day', false);
    for (const id of ['minh', 'lan', 'dad', 'mum']) st.pose(id, 'stand');
    st.look(X.kitty - 80);
    st.set('st-lb-kitty');
    st.act('kitty', 'wag'); st.fx('zzz', X.kitty + 10, FLOOR - 50); st.sfx('purr', { vol: 0.6 });
    await st.wait(1800);
    st.act('kitty', null);
  } },
  { key: ["doesn't like water"], icon: '🙀', label: "doesn't like water", async play(st) {
    st.set('st-lb-kitty', false);
    st.hold('lan', 'watering'); st.pose('lan', 'e056_can');
    await st.walk('lan', X.kitty - 100, { speed: 150, follow: false });
    st.face('lan', 1); st.pose('lan', 'e056_can');
    st.fx('drops', X.kitty - 70, FLOOR - 50); st.sfx('splash', { vol: 0.6 });
    await st.wait(300);
    st.dog('kitty', 'stand'); st.mood('kitty', 'joy'); st.face('kitty', 1);
    st.act('kitty', 'jump'); st.set('st-lb-nowater'); st.sfx('meow', { vol: 0.8 });
    await st.wait(400);
    st.act('kitty', null);
    st.look(2460, { dur: 700 });
    await st.walk('kitty', 2620, { speed: 320, follow: false });
    st.mood('lan', 'joy'); st.pose('lan', 'clap'); st.act('lan', 'clap'); st.sfx('giggle', { vol: 0.6 });
    await st.wait(600);
    st.act('lan', null);
  } },
];

export default {
  id: 'en056', worldW: 2700, floor: FLOOR, viewTop: 40, camStart: 30, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  cast: [
    { id: 'think', kind: 'thing', x: 790, y: 150, svg: thought(0, -40, 110, 70, `<g transform="translate(-26 4) scale(1.2)">${DROP()}</g>
      <g transform="translate(12 10)"><path d="M-16 0 L0 -14 L16 0 V14 H-16Z" fill="#FDE68A" stroke="${L}"/><path d="M14 -12 c-4 -6 -12 -1 -6 5 l6 5 l6 -5 c6 -6 -2 -11 -6 -5Z" fill="#F87171"/></g>`, [-36, 8]), box: [-70, -90, 140, 110] },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 90, s: 0.95 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: X.tom, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: X.minh0, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1268, s: 1.08 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.tap + 50, s: 0.95, face: -1 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.pot + 60, s: 0.95, face: -1 },
    { id: 'kitty', kind: 'cat', x: X.kitty, s: 1, face: -1 },
  ],
  init(st) {
    st.show('think', false);
    st.pose('minh', 'sitDesk'); st.pose('tom', 'sitDesk');
    st.dog('kitty', 'sit');
    st.set('st-drip');
  },
};
