/**
 * Bài 92 "It's Beautiful, Isn't It?" (câu hỏi đuôi): buổi sáng đầu tiên ở Sydney, trên bãi biển. Một dải bãi biển liền mạch:
 * lối đi bộ có hàng rào + cây (trái) → bãi cát dài, biển xanh và sóng phía sau, mòm đá ở xa (phải).
 * Mỗi câu hỏi đuôi: người nói có nhãn tên, bong bóng lời, và phần đuôi (isn't it? / do you? / have you?…) hiện thành nhãn riêng.
 * Bong bóng nghĩ của Minh đổi hình: Hà Nội (không có biển) → Vịnh Hạ Long. Sóng lớn tràn lên cát làm ướt giày.
 * Toạ độ cảnh: rộng 1500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, palm, bush, label, speaker, thought, sun } from '../kit.js';

const FLOOR = 282;
const W = 1500;
const X = { walk0: 300, mrs: 466, minh: 524, tom: 870, tomBack: 640, think: 672 };
const SPEED = 120;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e092_mrsB: { adult: true, old: true, hair: 'bob', hairC: '#E7E5E4', top: 'blouse', shirt: '#38BDF8', bottom: 'pants', bottomC: '#F5F5F4', shoe: '#F472B6', hat: 'sun' },
  e092_tom: { hair: 'neat', hairC: '#E0A33A', top: 'tee', shirt: '#F97316', bottom: 'shorts', bottomC: '#0E7490', shoe: '#16A34A' },
  e092_minh: { hair: 'spiky', top: 'tee', shirt: '#FDE047', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F8FAFC' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
/** Ván lướt sóng kẹp nách (gốc = bàn tay, tay buông: ván nằm ngang ngay trên tay). */
const SURF = `<g transform="translate(0 -4)"><path d="M-46 0 Q-50 -8 -38 -9 H40 Q54 -8 52 -1 Q50 5 38 5 H-38 Q-48 5 -46 0Z" fill="#22D3EE" stroke="${L}" stroke-width="1.1"/><path d="M-36 -2 H44" stroke="#F97316" stroke-width="2.6"/></g>`;
const PROPS = { e092_surf: SURF };
const POSES = {
  e092_carry: { R: [12, 6], L: [10, 4] },
  e092_open: { R: [100, 70], L: [10, 4], head: -4 },
  e092_down: { R: [10, 4], L: [10, 4], head: 18 },
  e092_laugh: { R: [30, -96], L: [30, -96], head: -10 },
};
const HANOI = `<g transform="translate(0 8)"><rect x="-44" y="-24" width="22" height="34" fill="#FCA5A5" stroke="${L}" stroke-width="0.9"/><rect x="-18" y="-34" width="20" height="44" fill="#FDE68A" stroke="${L}" stroke-width="0.9"/><rect x="6" y="-20" width="20" height="30" fill="#A5B4FC" stroke="${L}" stroke-width="0.9"/>
  <ellipse cx="34" cy="12" rx="16" ry="5" fill="#38BDF8" stroke="${L}" stroke-width="0.7"/><rect x="30" y="0" width="8" height="10" fill="#FEF3C7" stroke="${L}" stroke-width="0.6"/><path d="M28 0 L34 -6 L40 0Z" fill="#B91C1C" stroke="${L}" stroke-width="0.6"/>
  <text x="-6" y="-38" text-anchor="middle" ${NUN} font-size="10" fill="#1E3A8A">Ha Noi</text></g>`;
const NOBEACH = `<g class="e092-nobeach"><g transform="translate(44 -26)"><path d="M-12 6 H12 V10 H-12Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/><path d="M-12 6 q6 -6 12 0 q6 -6 12 0" stroke="#38BDF8" stroke-width="2.4" fill="none"/>
  <path d="M-14 -6 L14 14 M14 -6 L-14 14" stroke="#DC2626" stroke-width="3" stroke-linecap="round"/></g></g>`;
const HALONG = `<g transform="translate(0 10)"><rect x="-50" y="2" width="100" height="14" fill="#38BDF8"/>
  ${[[-34, 34], [-12, 44], [14, 30], [34, 40]].map(([x, h]) => `<path d="M${x - 9} 8 Q${x - 10} ${8 - h} ${x} ${8 - h - 4} Q${x + 10} ${8 - h} ${x + 9} 8Z" fill="#4D7C0F" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <path d="M-6 8 H16 L12 14 H-2Z" fill="#B45309" stroke="${L}" stroke-width="0.6"/><path d="M4 8 V-6 L14 4Z" fill="#DC2626" stroke="${L}" stroke-width="0.5"/>
  <text x="0" y="-42" text-anchor="middle" ${NUN} font-size="10" fill="#15803D">Ha Long Bay</text></g>`;

// ── Cảnh ──────────────────────────────────────────────────────────────────
function bg() {
  return `
  ${sky(0, W, 315, 'e092sky')}
  <g class="e092-sun"><g transform="translate(800 150)">${sun(24)}</g></g>
  ${cloud(200, 60, 0.9, 0)}${cloud(700, 50, 0.8, 2)}${cloud(1240, 66, 1, 4)}
  <!-- chim hải âu -->
  <g class="e092-gulls">${[[520, 90], [560, 76], [900, 84]].map(([x, y]) => `<path d="M${x - 10} ${y} q5 -6 10 0 q5 -6 10 0" stroke="${L}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- biển -->
  <rect x="${X.walk0 - 40}" y="176" width="${W - X.walk0 + 40}" height="${FLOOR - 176}" fill="#0EA5E9" stroke="${L}"/>
  <g class="e092-blue"><rect x="${X.walk0 - 40}" y="176" width="${W - X.walk0 + 40}" height="${FLOOR - 176}" fill="#0369A1" opacity="0.45"/></g>
  <g class="e092-gleam">${Array.from({ length: 16 }, (_, i) => `<path d="M${X.walk0 + 20 + i * 72} ${190 + (i % 3) * 16} l3 -6 l3 6 l-3 6Z" fill="#fff"/>`).join('')}</g>
  <g class="ek-wave">${Array.from({ length: 26 }, (_, i) => `<path d="M${X.walk0 + i * 46} ${196 + (i % 4) * 14} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none" stroke-linecap="round"/>`).join('')}</g>
  <!-- thành phố xa bên kia vịnh -->
  ${[[330, 20, 30], [356, 16, 44], [378, 22, 26], [404, 14, 52], [424, 20, 34]].map(([x, w, h]) => `<rect x="${x}" y="${176 - h}" width="${w}" height="${h}" fill="#CBD5E1" stroke="#94A3B8" stroke-width="0.8"/>`).join('')}
  <!-- mỏm đá xa -->
  <path d="M1300 178 Q1340 120 1400 130 Q1460 120 1500 150 V180Z" fill="#A8A29E" stroke="${L}"/>
  <!-- con sóng lớn -->
  <g class="e092-big"><path d="M560 236 Q620 150 720 160 Q790 170 780 206 Q760 186 730 196 Q700 210 720 236Z" fill="#38BDF8" stroke="${L}" stroke-width="1.2"/>
    <path d="M620 186 Q680 150 760 176" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>
  <!-- sóng nhỏ có mặt (câu cuối) -->
  <g class="e092-cheeky"><g transform="translate(760 238)"><path d="M-40 6 Q-30 -40 6 -40 Q34 -38 30 -14 Q20 -26 6 -20 Q-6 -12 6 6Z" fill="#7DD3FC" stroke="${L}" stroke-width="1.1"/>
    <circle cx="-12" cy="-18" r="2.6" fill="${L}"/><circle cx="-2" cy="-22" r="2.6" fill="${L}"/><path d="M-16 -8 q8 6 14 -2" stroke="${L}" stroke-width="1.4" fill="none"/><path d="M-10 -6 q2 8 7 2" fill="#F472B6" stroke="${L}" stroke-width="0.8"/></g></g>
  <!-- bãi cát + lối đi bộ -->
  <path d="M${X.walk0 - 40} 240 Q600 228 900 238 T${W} 236 V315 H${X.walk0 - 40}Z" fill="#FDE68A" stroke="${L}"/>
  ${Array.from({ length: 22 }, (_, i) => `<circle cx="${X.walk0 + 10 + i * 56}" cy="${270 + (i % 3) * 14}" r="1.4" fill="#D97706" opacity="0.5"/>`).join('')}
  <rect x="0" y="0" width="${X.walk0 - 40}" height="315" fill="#BBF7D0"/>
  <path d="M0 230 Q120 200 ${X.walk0 - 40} 222 V315 H0Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${palm(70, 236, 1)}${palm(200, 240, 0.85)}
  <rect x="0" y="${FLOOR - 8}" width="${X.walk0}" height="${315 - FLOOR + 8}" fill="#E7E5E4" stroke="${L}"/>
  ${Array.from({ length: 5 }, (_, i) => `<path d="M${i * 62} ${FLOOR - 8} V315" stroke="#A8A29E"/>`).join('')}
  <!-- ô che nắng + khăn, chòi cứu hộ -->
  <g transform="translate(1190 252)"><path d="M0 0 L-6 -78" stroke="${L}" stroke-width="2"/><path d="M-56 -70 Q-10 -110 40 -86 Q14 -82 -6 -78 Q-30 -76 -56 -70Z" fill="#F43F5E" stroke="${L}" stroke-width="1"/>
    <path d="M-30 -74 Q-8 -98 14 -84" stroke="#fff" stroke-width="5" fill="none"/><rect x="-40" y="-4" width="60" height="10" rx="2" fill="#A78BFA" stroke="${L}" stroke-width="0.8" transform="skewX(-30)"/></g>
  <g transform="translate(1040 246)"><path d="M-24 0 L-16 -70 M24 0 L16 -70 M-20 -34 H20" stroke="#B45309" stroke-width="4"/><rect x="-28" y="-104" width="56" height="36" fill="#FDE047" stroke="${L}"/><path d="M-34 -104 H34 L24 -118 H-24Z" fill="#DC2626" stroke="${L}"/>
    <path d="M30 -104 V-140" stroke="${L}" stroke-width="1.6"/><path d="M30 -140 h14 v8 h-14" fill="#DC2626" stroke="${L}" stroke-width="0.6"/><path d="M30 -132 h14 v8 h-14" fill="#FDE047" stroke="${L}" stroke-width="0.6"/></g>
  <!-- vết nước ướt trên cát -->
  <g class="e092-wetsand"><path d="M${X.walk0} ${FLOOR - 8} Q600 ${FLOOR - 16} 900 ${FLOOR - 4} Q700 ${FLOOR + 22} ${X.walk0 + 40} ${FLOOR + 14}Z" fill="#D97706" opacity="0.28"/></g>`;
}

function fg() {
  return `
  ${bush(30, FLOOR + 34, 0.7)}
  <!-- bọt sóng tràn lên cát -->
  <g class="e092-foam"><path d="M${X.walk0 + 10} ${FLOOR - 12} Q500 ${FLOOR - 26} 700 ${FLOOR - 14} Q800 ${FLOOR - 8} 920 ${FLOOR - 16} V${FLOOR + 10} Q760 ${FLOOR + 18} 600 ${FLOOR + 8} Q460 ${FLOOR + 20} ${X.walk0 + 10} ${FLOOR + 8}Z" fill="#E0F2FE" fill-opacity="0.85" stroke="#7DD3FC" stroke-width="1.4"/>
    ${[360, 440, 520, 620, 720, 820].map((x, i) => `<circle cx="${x}" cy="${FLOOR - 10 + (i % 2) * 6}" r="5" fill="#fff"/>`).join('')}</g>
  <!-- nhãn -->
  <g class="e092-lb e092-lb-first">${label(250, 66, 'first morning in Sydney', '#EA580C', 15)}</g>
  <g class="e092-lb e092-lb-along">${label(470, 100, 'along the beach', '#0369A1', 14)}</g>
  <g class="e092-lb e092-lb-ahead">${label(X.tom - 20, 100, 'running ahead', '#16A34A', 14)}</g>
  <g class="e092-lb e092-lb-board">${label(X.tom - 10, 130, 'surfboard', '#0E7490', 13)}</g>
  <g class="e092-lb e092-lb-isnt">${label(X.mrs + 10, 304, "isn't it?", '#DB2777', 16)}</g>
  <g class="e092-lb e092-lb-mrs">${speaker(X.mrs, 108, 'Mrs Brown')}</g>
  <g class="e092-lb e092-lb-minh">${speaker(X.minh, 150, 'Minh')}</g>
  <g class="e092-lb e092-lb-tom">${speaker(X.tomBack, 150, 'Tom')}</g>
  <g class="e092-lb e092-lb-blue">${label(700, 150, 'so blue', '#1D4ED8', 17)}</g>
  <g class="e092-lb e092-lb-doyou">${label(X.mrs + 10, 304, 'do you?', '#DB2777', 16)}</g>
  <g class="e092-lb e092-lb-nodont">${label(X.minh + 30, 304, "No, we don't.", '#DC2626', 15)}</g>
  <g class="e092-lb e092-lb-halong">${label(X.think, 196, 'amazing too', '#15803D', 15)}</g>
  <g class="e092-lb e092-lb-laughed">${label(X.tomBack + 40, 110, 'laughed', '#EA580C', 15)}</g>
  <g class="e092-lb e092-lb-haveyou">${label(X.tomBack, 304, 'have you?', '#DB2777', 16)}</g>
  <g class="e092-lb e092-lb-never">${label(X.minh, 304, 'Never', '#DC2626', 17)}</g>
  <g class="e092-lb e092-lb-wontyou">${label(X.minh + 40, 304, "won't you?", '#DB2777', 16)}</g>
  <g class="e092-lb e092-lb-wave">${label(680, 120, 'a big wave', '#0369A1', 16)}</g>
  <g class="e092-lb e092-lb-soaked">${label(X.minh + 40, 304, 'soaked their shoes', '#0369A1', 14)}</g>
  <g class="e092-lb e092-lb-wasnt">${label(X.mrs + 10, 304, "wasn't it?", '#DB2777', 16)}</g>
  <g class="e092-lb e092-lb-haha">${label(X.mrs - 10, 96, 'Ha ha ha!', '#EA580C', 16)}</g>
  <g class="e092-lb e092-lb-arethey">${label(X.minh + 60, 304, 'are they?', '#DB2777', 16)}</g>
  <g class="e092-lb e092-lb-polite">${label(760, 150, 'not very polite', '#7C3AED', 15)}</g>
  <!-- giày ướt phóng to -->
  <g class="e092-shoe"><g transform="translate(${X.minh + 110} 116)"><circle r="40" fill="#fff" stroke="${L}" stroke-width="1.6"/>
    <path d="M-26 10 Q-28 -8 -14 -10 L4 -6 Q10 -18 18 -14 L26 4 Q30 12 22 14 H-22 Q-28 14 -26 10Z" fill="#F8FAFC" stroke="${L}" stroke-width="1.2"/>
    <path d="M-24 10 H26" stroke="#94A3B8" stroke-width="3"/><path d="M-26 -2 Q0 4 26 2 V14 H-26Z" fill="#38BDF8" opacity="0.45"/>
    <g class="e092-drip">${[-14, 2, 16].map((x, i) => `<path style="animation-delay:${i * 0.25}s" d="M${x} 16 q-3 5 0 8 q3 -3 0 -8Z" fill="#38BDF8"/>`).join('')}</g></g></g>
  <!-- Minh nghĩ: Hà Nội → Hạ Long -->
  ${thought(X.think, 120, 134, 82, `<g class="e092-hn">${HANOI}${NOBEACH}</g><g class="e092-hl">${HALONG}</g>`, [X.minh + 20, 160], 'e092-think')}`;
}

const LB = ['first', 'along', 'ahead', 'board', 'isnt', 'mrs', 'minh', 'tom', 'blue', 'doyou', 'nodont', 'halong', 'laughed', 'haveyou', 'never', 'wontyou', 'wave', 'soaked', 'wasnt', 'haha', 'arethey', 'polite'];
const CSS = `
.e092-lb { opacity: 0; transition: opacity .35s; }
${LB.map((k) => `.st-lb-${k} .e092-lb-${k}`).join(', ')} { opacity: 1; }
.e092-sun { transform: translateY(70px); transition: transform 2.4s ease-out; }
.st-sunup .e092-sun { transform: translateY(-60px); }
.e092-gulls { animation: e092Gull 7s ease-in-out infinite alternate; }
@keyframes e092Gull { to { transform: translate(60px, -10px); } }
.e092-blue { opacity: 0; transition: opacity 1s; } .st-blue .e092-blue { opacity: 1; }
.e092-gleam path { opacity: 0; transform-box: fill-box; transform-origin: center; }
.st-gleam .e092-gleam path { animation: ekTwinkle 1s ease-in-out infinite alternate; }
.e092-think { opacity: 0; transform: scale(.4); transform-origin: ${X.minh + 20}px 160px; transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-think .e092-think { opacity: 1; transform: none; }
.e092-nobeach { opacity: 0; transition: opacity .3s; } .st-nobeach .e092-nobeach { opacity: 1; }
.e092-hl { opacity: 0; transition: opacity .4s; } .st-halong .e092-hl { opacity: 1; } .st-halong .e092-hn { opacity: 0; }
.e092-hn { transition: opacity .3s; }
.e092-big { transform-box: fill-box; transform-origin: 50% 100%; transform: translateY(70px) scaleY(.2); opacity: 0; }
.st-bigwave .e092-big { animation: e092Big 1.3s ease-in both; }
@keyframes e092Big { 0% { transform: translateY(70px) scaleY(.2); opacity: 0; } 20% { opacity: 1; } 65% { transform: translateY(0) scaleY(1); opacity: 1; } 100% { transform: translate(-30px, 60px) scaleY(.3); opacity: 0; } }
.e092-foam { opacity: 0; transform: translateY(-40px); transition: opacity .4s, transform .5s ease-out; }
.st-foam .e092-foam { opacity: 1; transform: none; }
.e092-wetsand { opacity: 0; transition: opacity .6s; } .st-wet .e092-wetsand { opacity: 1; }
.e092-shoe { opacity: 0; transform: scale(.3); transform-origin: ${X.minh + 60}px 260px; transition: opacity .3s, transform .4s cubic-bezier(.3,1.5,.6,1); }
.st-shoe .e092-shoe { opacity: 1; transform: none; }
.e092-drip path { animation: e092Drip .9s ease-in infinite; opacity: 0; }
@keyframes e092Drip { from { transform: translateY(0); opacity: 1; } to { transform: translateY(14px); opacity: 0; } }
.e092-cheeky { opacity: 0; transform: translateY(40px); transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.st-cheeky .e092-cheeky { opacity: 1; transform: none; }
.st-cheeky .e092-cheeky > g { animation: e092Wob .6s ease-in-out infinite alternate; }
@keyframes e092Wob { from { transform: translate(760px, 238px) rotate(-4deg); } to { transform: translate(760px, 238px) rotate(4deg); } }
@media (prefers-reduced-motion: reduce) { .e092-gulls { animation-duration: 16s; } .st-cheeky .e092-cheeky > g { animation-duration: 1.4s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const CAM = 622;

const BEATS = [
  { key: ['On his first morning in Sydney', "walked along the beach with Tom's grandmother"], icon: '🏖️', label: 'along the beach', async play(st) {
    st.look(220);
    st.set('st-sunup'); st.set('st-lb-first'); st.sfx('birds', { vol: 0.6 });
    await st.wait(600);
    st.set('st-lb-first', false); st.set('st-lb-along');
    st.look(CAM, { dur: 2600 });
    await Promise.all([
      st.walk('mrs', X.mrs, { speed: SPEED, follow: false }),
      st.walk('minh', X.minh, { speed: SPEED, follow: false }),
      st.walk('tom', X.minh + 70, { speed: SPEED, follow: false }),
    ]);
    st.mood('minh', 'joy');
    await st.wait(300);
  } },
  { key: ['Tom was running ahead of them', 'his new surfboard under his arm'], icon: '🏄', label: 'running ahead', async play(st) {
    off(st, 'st-lb-first', 'st-lb-along');
    st.look(CAM + 40, { dur: 2400 });
    st.mood('tom', 'joy'); st.sfx('giggle', { vol: 0.5 });
    await st.walk('tom', X.tom, { speed: 170, follow: false });
    st.set('st-lb-ahead'); st.set('st-lb-board'); st.sfx('knock', { vol: 0.5 });
    st.face('tom', -1);
    await st.wait(900);
  } },
  { key: ["It's beautiful, isn't it"], icon: '🌅', label: "isn't it?", async play(st) {
    off(st, 'st-lb-ahead', 'st-lb-board');
    st.look(CAM);
    st.pose('mrs', 'e092_open'); st.mood('mrs', 'joy');
    st.set('st-gleam'); st.sfx('river', { vol: 0.6 });
    await st.say('mrs', "It's beautiful, isn't it?", 1600);
    st.set('st-lb-isnt'); st.sfx('pop', { vol: 0.5 });
    await st.wait(500);
  } },
  { key: ['said Mrs Brown'], icon: '👵', label: 'said Mrs Brown', async play(st) {
    off(st, 'st-lb-isnt');
    st.look(CAM);
    st.pose('mrs', 'stand');
    st.set('st-lb-mrs'); st.sfx('pop', { vol: 0.6 });
    st.act('mrs', 'nod'); st.face('minh', -1);
    await st.wait(1300);
    st.act('mrs', null);
  } },
  { key: ['the water is so blue', 'Minh answered'], icon: '💙', label: 'so blue', async play(st) {
    off(st, 'st-lb-mrs', 'st-gleam');
    st.look(CAM);
    st.face('minh', 1); st.pose('minh', 'point'); st.mood('minh', 'joy');
    st.set('st-lb-minh');
    st.set('st-blue'); st.sfx('splash', { vol: 0.4 });
    await st.say('minh', 'Yes, the water is so blue!', 1600);
    st.set('st-lb-blue');
    await st.wait(600);
    st.pose('minh', 'stand');
  } },
  { key: ["You don't have beaches like this in Hanoi, do you"], icon: '🏙️', label: 'do you?', async play(st) {
    off(st, 'st-lb-minh', 'st-lb-blue');
    st.look(CAM);
    st.face('minh', -1);
    st.mood('mrs', 'happy');
    await st.say('mrs', '... in Hanoi, do you?', 1500);
    st.set('st-lb-doyou');
    st.set('st-think'); st.sfx('bus', { vol: 0.35 });
    st.pose('minh', 'think');
    await st.wait(1100);
  } },
  { key: ["No, we don't"], icon: '🙅', label: "No, we don't", async play(st) {
    off(st, 'st-lb-doyou');
    st.look(CAM);
    st.pose('minh', 'stand'); st.act('minh', 'no');
    st.set('st-nobeach'); st.sfx('buzz-no', { vol: 0.4 });
    st.set('st-lb-nodont');
    await st.wait(1200);
    st.act('minh', null);
  } },
  { key: ['But Ha Long Bay is amazing too'], icon: '⛰️', label: 'Ha Long Bay', async play(st) {
    off(st, 'st-lb-nodont');
    st.look(CAM);
    st.set('st-halong'); st.sfx('boat-horn', { vol: 0.5 });
    st.pose('minh', 'cheer'); st.mood('minh', 'joy');
    await st.wait(600);
    st.set('st-lb-halong'); st.mood('mrs', 'wow');
    await st.wait(1300);
    st.pose('minh', 'stand'); st.mood('mrs', 'joy');
  } },
  { key: ['Tom came back and laughed'], icon: '😄', label: 'came back', async play(st) {
    off(st, 'st-lb-halong', 'st-think', 'st-nobeach', 'st-halong');
    st.look(CAM + 20);
    await st.walk('tom', X.tomBack, { speed: 160, follow: false });
    st.face('minh', 1);
    st.pose('tom', 'e092_laugh'); st.mood('tom', 'joy'); st.act('tom', 'hop');
    st.set('st-lb-laughed'); st.sfx('giggle', { vol: 0.8 });
    await st.wait(1200);
    st.act('tom', null); st.pose('tom', 'e092_carry');
  } },
  { key: ["You've never surfed before, have you"], icon: '🤔', label: 'have you?', async play(st) {
    off(st, 'st-lb-laughed');
    st.look(CAM);
    st.set('st-lb-tom');
    st.sfx('knock', { vol: 0.6 });
    await st.say('tom', "You've never surfed, have you?", 1700);
    st.set('st-lb-haveyou');
    await st.wait(500);
  } },
  { key: ['Never', 'Minh said'], icon: '❌', label: 'Never', async play(st) {
    off(st, 'st-lb-tom', 'st-lb-haveyou');
    st.look(CAM);
    st.set('st-lb-minh');
    st.pose('minh', 'shrug'); st.act('minh', 'no'); st.mood('minh', 'joy');
    st.sfx('giggle', { vol: 0.4 });
    await st.say('minh', 'Never!', 900);
    st.set('st-lb-never');
    await st.wait(500);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ["But you'll teach me, won't you"], icon: '🤝', label: "won't you?", async play(st) {
    off(st, 'st-lb-never');
    st.look(CAM);
    st.pose('minh', 'point');
    await st.say('minh', "You'll teach me, won't you?", 1600);
    st.set('st-lb-wontyou');
    st.act('tom', 'nod'); st.mood('tom', 'joy'); st.sfx('ding', { vol: 0.5 });
    await st.wait(800);
    st.act('tom', null); st.pose('minh', 'stand');
  } },
  { key: ['a big wave crashed onto the sand', 'soaked their shoes'], icon: '🌊', label: 'a big wave', async play(st) {
    off(st, 'st-lb-minh', 'st-lb-wontyou');
    st.look(CAM);
    st.set('st-bigwave'); st.set('st-lb-wave'); st.sfx('whoosh', { vol: 0.5 });
    await st.wait(850);
    st.sfx('splash');
    st.set('st-foam'); st.set('st-wet');
    ['mrs', 'minh', 'tom'].forEach((id) => { st.mood(id, 'wow'); st.act(id, 'jump'); });
    st.fx('drops', X.minh, FLOOR - 40, { n: 2 }); st.fx('drops', X.tomBack, FLOOR - 40);
    await st.wait(500);
    st.set('st-lb-wave', false); st.set('st-lb-soaked');
    await st.wait(900);
    ['mrs', 'minh', 'tom'].forEach((id) => st.act(id, null));
  } },
  { key: ["That was a surprise, wasn't it"], icon: '😲', label: "wasn't it?", async play(st) {
    off(st, 'st-lb-soaked', 'st-bigwave');
    st.look(CAM);
    st.set('st-foam', false); st.sfx('river', { vol: 0.6 });
    st.mood('mrs', 'joy'); st.set('st-lb-mrs');
    await st.say('mrs', "That was a surprise, wasn't it?", 1700);
    st.set('st-lb-wasnt');
    await st.wait(400);
  } },
  { key: ['Mrs Brown laughed'], icon: '😂', label: 'Mrs Brown laughed', async play(st) {
    off(st, 'st-lb-wasnt');
    st.look(CAM);
    st.pose('mrs', 'e092_laugh'); st.act('mrs', 'hop'); st.mood('mrs', 'joy');
    st.set('st-lb-haha'); st.sfx('giggle', { vol: 0.9 });
    await st.wait(1500);
    st.act('mrs', null); st.pose('mrs', 'stand');
  } },
  { key: ['Minh looked at his wet sneakers'], icon: '👟', label: 'wet sneakers', async play(st) {
    off(st, 'st-lb-haha', 'st-lb-mrs');
    st.look(CAM);
    st.pose('minh', 'e092_down'); st.mood('minh', 'sad');
    await st.wait(400);
    st.set('st-shoe'); st.sfx('drip');
    await st.wait(700);
    st.sfx('drip', { vol: 0.8 });
    await st.wait(900);
  } },
  { key: ["Australian waves aren't very polite, are they"], icon: '😜', label: 'are they?', async play(st) {
    off(st, 'st-shoe');
    st.look(CAM + 40);
    st.set('st-cheeky'); st.sfx('splash', { vol: 0.4 });
    st.pose('minh', 'point'); st.mood('minh', 'joy');
    st.set('st-lb-polite');
    await st.say('minh', "Not very polite, are they?", 1600);
    st.set('st-lb-arethey');
    st.pose('tom', 'e092_laugh'); st.pose('mrs', 'e092_laugh'); st.mood('tom', 'joy'); st.mood('mrs', 'joy');
    st.act('tom', 'hop'); st.sfx('giggle', { vol: 0.8 });
    await st.wait(1100);
    st.act('tom', null);
  } },
];

export default {
  id: 'en092', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 1, 7, 8, 12, 15],
  cast: [
    { id: 'tom', kind: 'kid', who: 'e092_tom', x: 244, face: 1 },
    { id: 'mrs', kind: 'adult', who: 'e092_mrsB', x: 110, face: 1 },
    { id: 'minh', kind: 'kid', who: 'e092_minh', x: 172, face: 1 },
  ],
  init(st) {
    st.hold('tom', 'e092_surf'); st.pose('tom', 'e092_carry');
  },
};
