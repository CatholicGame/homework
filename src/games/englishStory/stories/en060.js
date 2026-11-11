/**
 * Bài 60 "The Mystery Box": một lớp học sáng thứ Sáu. Cửa lớp (trái) → bàn cô Hoa với hộp bí mật xanh, nơ vàng → ba bàn học
 * sinh (Minh, Tom, bạn Mai). Trên tường là dải bốn thẻ câu hỏi WHO? WHAT? WHERE? WHY?: ai hỏi câu nào thì thẻ đó sáng lên
 * và giữ màu (ôn tập bốn từ để hỏi). Hộp mở ra có bánh và thiệp; thiệp to hiện chữ cảm ơn; Lan bước vào, bong bóng nghĩ kể
 * lại (tối qua Lan và mẹ làm bánh, sáng sớm Lan đặt hộp lên bàn); cuối cùng cả lớp chia bánh.
 * Toạ độ cảnh: rộng 1100, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, headOnly } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, label, room, windowBox, desk, thought } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e060_mai: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F28AB2' },
});

const T = (x, y, s, c, txt) => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${s}" fill="${c}">${txt}</text>`;
const HEART = (c = '#F43F5E') => `<path d="M0 6 C-10 -2 -8 -10 -3 -10 C-1 -10 0 -8 0 -7 C0 -8 1 -10 3 -10 C8 -10 10 -2 0 6Z" fill="${c}" stroke="${L}" stroke-width="0.7"/>`;

// ── Hộp, bánh, thiệp ──────────────────────────────────────────────────────
const BOX_X = 452, TOP = 214; // hộp trên bàn cô
/** Bánh kem (gốc = đáy giữa). */
const CAKE = `<rect x="-20" y="-16" width="40" height="16" rx="3" fill="#FBCFE8" stroke="${L}" stroke-width="1"/><path d="M-20 -12 q5 5 10 0 q5 5 10 0 q5 5 10 0 q5 5 10 0" stroke="#fff" stroke-width="2.4" fill="none"/>
  <rect x="-13" y="-28" width="26" height="12" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="1"/>
  ${[-8, 0, 8].map((x) => `<rect x="${x - 1.2}" y="-36" width="2.4" height="8" fill="#60A5FA"/><path class="e060-fl" d="M${x} -36 q-2 -3 0 -6 q2 3 0 6Z" fill="#F97316"/>`).join('')}
  <circle cx="-14" cy="-6" r="2.4" fill="#EF4444"/><circle cx="14" cy="-6" r="2.4" fill="#EF4444"/><circle cx="0" cy="-6" r="2.4" fill="#EF4444"/>`;
const SLICE = `<path d="M-9 4 L9 4 L9 -4 L-9 -8Z" fill="#FBCFE8" stroke="${L}" stroke-width="0.8"/><path d="M-9 -8 L9 -4 L9 -1 L-9 -5Z" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/><circle cx="2" cy="-8" r="2" fill="#EF4444"/>`;
const CARD_SMALL = `<rect x="-11" y="-14" width="22" height="16" rx="1.5" fill="#fff" stroke="${L}" stroke-width="0.8"/><g transform="translate(0 -6) scale(0.5)">${HEART()}</g>`;
const BOXW = 52;
function boxSvg() {
  const w = BOXW, h = 34, x0 = BOX_X - w / 2, y0 = TOP - h;
  return `<g class="e060-box">
    <g transform="translate(${BOX_X} ${TOP - 4})"><g class="e060-cake">${CAKE}</g></g>
    <g transform="translate(${BOX_X + 34} ${TOP})"><g class="e060-card">${CARD_SMALL}</g></g>
    <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/>
    <g class="e060-rib"><rect x="${BOX_X - 4}" y="${y0}" width="8" height="${h}" fill="#FACC15" stroke="${L}" stroke-width="0.7"/></g>
    <g class="e060-lid" style="transform-origin:${BOX_X}px ${y0}px"><rect x="${x0 - 4}" y="${y0 - 9}" width="${w + 8}" height="10" rx="2" fill="#2563EB" stroke="${L}" stroke-width="1.2"/>
      <g class="e060-rib"><rect x="${BOX_X - 4}" y="${y0 - 9}" width="8" height="10" fill="#FACC15" stroke="${L}" stroke-width="0.7"/>
      <path d="M${BOX_X} ${y0 - 9} C${BOX_X - 22} ${y0 - 26} ${BOX_X - 24} ${y0 - 4} ${BOX_X} ${y0 - 9} C${BOX_X + 22} ${y0 - 26} ${BOX_X + 24} ${y0 - 4} ${BOX_X} ${y0 - 9}Z" fill="#FDE047" stroke="${L}" stroke-width="1"/>
      <circle cx="${BOX_X}" cy="${y0 - 9}" r="3.6" fill="#FACC15" stroke="${L}" stroke-width="0.8"/></g></g>
    <g class="e060-qm">${T(BOX_X - 30, y0 - 18, 18, '#7C3AED', '?')}${T(BOX_X + 32, y0 - 26, 14, '#7C3AED', '?')}</g>
  </g>`;
}

const WH = [['who', 'WHO?', '#DC2626'], ['what', 'WHAT?', '#EA580C'], ['where', 'WHERE?', '#16A34A'], ['why', 'WHY?', '#2563EB']];

function bg() {
  return `
  ${room(0, 1100, FLOOR, '#E0F2FE', '#D9A066')}
  <!-- cửa lớp -->
  <rect x="40" y="96" width="100" height="${FLOOR - 96}" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
  <rect x="50" y="106" width="80" height="${FLOOR - 106}" fill="#FDE68A"/><path d="M50 ${FLOOR} L70 200 H110 L130 ${FLOOR}Z" fill="#E9D5B5" opacity="0.6"/>
  <g class="e060-door"><rect x="50" y="106" width="80" height="${FLOOR - 106}" fill="#B45309" stroke="${L}"/><circle cx="120" cy="200" r="3.4" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/><rect x="62" y="120" width="56" height="40" rx="3" fill="#BAE6FD" stroke="${L}"/></g>
  <!-- cửa sổ buổi sáng -->
  ${windowBox(166, 80, 80, 66)}
  <g transform="translate(228 100)"><circle r="10" fill="#FDE047" stroke="#F59E0B" stroke-width="1.4"/></g>
  <!-- lịch -->
  <g transform="translate(296 92)"><rect x="-30" y="0" width="60" height="50" rx="4" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-30" y="0" width="60" height="14" rx="4" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    <circle cx="-16" cy="0" r="2.4" fill="#1F2937"/><circle cx="16" cy="0" r="2.4" fill="#1F2937"/>${T(0, 32, 11, '#DC2626', 'FRIDAY')}${T(0, 45, 9, '#475569', '20 / 11')}</g>
  <g class="e060-calglow"><rect x="262" y="88" width="68" height="58" rx="6" fill="none" stroke="#FACC15" stroke-width="4"/></g>
  <!-- dải thẻ câu hỏi -->
  ${WH.map(([k, t, c], i) => `<g transform="translate(${392 + i * 74} 66)"><g class="e060-wh e060-wh-${k}"><rect x="-33" y="-16" width="66" height="30" rx="8" fill="#F1F5F9" stroke="${L}" stroke-width="1.1"/>
    <rect class="e060-whbg" x="-33" y="-16" width="66" height="30" rx="8" fill="${c}" stroke="${L}" stroke-width="1.1"/>${T(0, 5, 14, '#94A3B8', t)}<g class="e060-whtx">${T(0, 5, 14, '#fff', t)}</g></g></g>`).join('')}
  <!-- bảng nhỏ + giá sách -->
  <rect x="690" y="100" width="170" height="70" rx="3" fill="#166534" stroke="#A16207" stroke-width="5"/>${T(775, 142, 15, '#F8FAFC', 'Class 3A')}
  <rect x="900" y="150" width="150" height="7" rx="2" fill="#A16207" stroke="${L}"/>
  ${[0, 1, 2, 3, 4, 5, 6, 7].map((i) => `<rect x="${912 + i * 16}" y="${128 + (i % 2) * 4}" width="13" height="${22 - (i % 2) * 4}" rx="1" fill="${['#EF4444', '#3B82F6', '#22C55E', '#F59E0B'][i % 4]}" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <g transform="translate(980 220)"><rect x="-30" y="0" width="60" height="62" fill="#C08B5C" stroke="${L}"/><path d="M-12 -2 Q-10 -30 0 -40 Q10 -30 12 -2Z" fill="#22C55E" stroke="${L}"/></g>
  <!-- nhãn -->
  <g class="e060-lb e060-lb-blue">${label(BOX_X + 50, 168, 'blue', '#2563EB', 13)}</g>
  <g class="e060-lb e060-lb-rib">${label(BOX_X + 50, 136, 'yellow ribbon', '#CA8A04', 12)}</g>
  <g class="e060-lb e060-lb-nobody">${label(710, 120, 'Nobody knew.', '#475569', 14)}</g>
  <g class="e060-lb e060-lb-surprise">${label(300, 110, 'surprise!', '#DB2777', 16)}</g>`;
}

const bub = (k, x, y, w, h, inner, tip) => `<g class="e060-bub e060-bub-${k}" style="transform-origin:${tip[0]}px ${tip[1]}px">${thought(x, y, w, h, inner, tip)}</g>`;

function fg() {
  // Bong bóng kể lại: tối qua (bếp, trăng) | sáng sớm (mặt trời, đặt hộp lên bàn)
  const night = `<g class="e060-p1"><rect x="-88" y="-34" width="84" height="64" rx="8" fill="#312E81" stroke="${L}"/>
    <circle cx="-20" cy="-22" r="6" fill="#FEF9C3"/><circle cx="-17" cy="-24" r="5.4" fill="#312E81"/>
    <g transform="translate(-68 -4)">${headOnly('en_mum_home', { s: 0.5, mood: 'joy' })}</g><g transform="translate(-34 0)">${headOnly('en_lan_home', { s: 0.5, mood: 'joy' })}</g>
    <g transform="translate(-48 26) scale(0.7)">${CAKE}</g>${T(-46, -24, 9, '#FDE68A', 'night')}</g>`;
  const morning = `<g class="e060-p2"><rect x="4" y="-34" width="84" height="64" rx="8" fill="#E0F2FE" stroke="${L}"/>
    <circle cx="74" cy="-20" r="7" fill="#FDE047" stroke="#F59E0B"/><g transform="translate(26 -2)">${headOnly('en_lan_home', { s: 0.5, mood: 'joy' })}</g>
    <rect x="30" y="18" width="50" height="6" rx="2" fill="#B45309" stroke="${L}" stroke-width="0.7"/><g transform="translate(60 18) scale(0.55)"><rect x="-20" y="-28" width="40" height="28" fill="#3B82F6" stroke="${L}"/><rect x="-4" y="-28" width="8" height="28" fill="#FACC15"/></g>
    ${T(46, -24, 9, '#0369A1', 'morning')}</g>`;
  return `
  <!-- bàn cô (che chân cô) -->
  <rect x="320" y="${TOP}" width="170" height="${FLOOR - TOP + 6}" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="314" y="${TOP - 4}" width="182" height="9" rx="3" fill="#D97706" stroke="${L}"/>
  <rect x="338" y="232" width="134" height="34" rx="3" fill="#92400E" stroke="${L}" stroke-width="0.8"/>
  ${boxSvg()}
  <g class="e060-slices">${[-30, 30].map((dx) => `<g transform="translate(${BOX_X + dx} ${TOP - 6})">${SLICE}</g>`).join('')}</g>
  <!-- bàn học sinh -->
  ${desk(620, FLOOR)}${desk(710, FLOOR, '#FB923C')}${desk(800, FLOOR, '#FACC15')}
  <g class="e060-kslices">${[620, 710, 800].map((x) => `<g transform="translate(${x} ${FLOOR - 62})">${SLICE}</g>`).join('')}</g>
  <!-- thiệp to -->
  <g class="e060-big" style="transform-origin:560px 160px"><rect x="456" y="88" width="208" height="84" rx="8" fill="#fff" stroke="${L}" stroke-width="1.6"/><rect x="462" y="94" width="196" height="72" rx="6" fill="none" stroke="#F9A8D4" stroke-width="2" stroke-dasharray="5 3"/>
    ${T(560, 122, 17, '#DB2777', 'Thank you, Ms Hoa!')}<g class="e060-big2">${T(560, 150, 15, '#7C3AED', 'Happy Teachers&#39; Day!')}
    <g transform="translate(474 106) scale(0.8)">${HEART()}</g><g transform="translate(646 158) scale(0.8)">${HEART('#FB7185')}</g></g></g>
  <g class="e060-conf">${Array.from({ length: 16 }, (_, i) => `<rect x="${380 + (i * 37) % 360}" y="${70 + (i * 23) % 60}" width="5" height="9" rx="1" fill="${['#F472B6', '#FACC15', '#60A5FA', '#4ADE80'][i % 4]}" style="animation-delay:${(i % 5) * 0.15}s" transform="rotate(${i * 30} ${380 + (i * 37) % 360} ${70 + (i * 23) % 60})"/>`).join('')}</g>
  ${bub('flash', 250, 108, 236, 110, `<g transform="scale(1.12)">${night + morning}</g>`, [262, 158])}`;
}

const CSS = `
.e060-lb { opacity: 0; transition: opacity .35s; }
${['blue', 'rib', 'nobody', 'surprise'].map((k) => `.st-lb-${k} .e060-lb-${k}`).join(', ')} { opacity: 1; }
.e060-door { transform-box: fill-box; transform-origin: 0 50%; transition: transform .45s; } .st-door .e060-door { transform: scaleX(.15); }
.e060-calglow { opacity: 0; transition: opacity .3s; } .st-cal .e060-calglow { opacity: 1; animation: e060Pulse .5s ease-in-out infinite alternate; }
@keyframes e060Pulse { to { opacity: .4; } }
.e060-whbg, .e060-whtx { opacity: 0; transition: opacity .35s; }
${WH.map(([k]) => `.st-wh-${k} .e060-wh-${k} .e060-whbg, .st-wh-${k} .e060-wh-${k} .e060-whtx`).join(', ')} { opacity: 1; }
.e060-wh { transform-box: fill-box; transform-origin: center; transition: transform .4s cubic-bezier(.3,1.6,.6,1); }
${WH.map(([k]) => `.st-now-${k} .e060-wh-${k}`).join(', ')} { transform: scale(1.22); animation: e060Wig .3s ease-in-out 4 alternate; }
@keyframes e060Wig { from { rotate: -5deg; } to { rotate: 5deg; } }
.e060-qm { opacity: 0; transition: opacity .3s; } .st-qm .e060-qm { opacity: 1; animation: e060Bob .5s ease-in-out infinite alternate; }
@keyframes e060Bob { to { transform: translateY(-4px); } }
.e060-box { transform-box: fill-box; transform-origin: 50% 100%; }
.st-boxbounce .e060-box { animation: e060Jig .35s ease-in-out 4 alternate; }
@keyframes e060Jig { from { transform: scale(1) rotate(-3deg); } to { transform: scale(1.12) rotate(3deg); } }
.e060-rib { transition: opacity .6s; } .st-untie .e060-rib { opacity: 0; }
.e060-lid { transition: transform 1.4s ease-in-out, opacity .5s 1.2s; } .st-open .e060-lid { transform: translateY(-44px); opacity: 0; }
.e060-cake { transform: translateY(26px); opacity: 0; transition: transform .9s cubic-bezier(.3,1.4,.6,1), opacity .3s; }
.st-cake .e060-cake { transform: translateY(-10px); opacity: 1; }
.e060-card { opacity: 0; transform: scale(.2); transform-box: fill-box; transform-origin: 50% 100%; transition: opacity .3s .4s, transform .5s .4s cubic-bezier(.3,1.6,.6,1); }
.st-cake .e060-card { opacity: 1; transform: none; }
.e060-fl { animation: e060Flick .25s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e060Flick { to { transform: scaleY(1.3); } }
.e060-big, .e060-big2 { opacity: 0; transition: opacity .35s, transform .5s cubic-bezier(.3,1.5,.6,1); }
.e060-big { transform: scale(.3); } .st-big .e060-big { opacity: 1; transform: none; } .st-big2 .e060-big2 { opacity: 1; }
.e060-conf rect { opacity: 0; } .st-conf .e060-conf rect { animation: e060Fall 1.4s ease-in infinite; }
@keyframes e060Fall { from { opacity: 1; translate: 0 -10px; } to { opacity: 0; translate: 0 70px; } }
.e060-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); } .st-bub-flash .e060-bub-flash { opacity: 1; transform: scale(1); }
.e060-p2 { opacity: 0; transition: opacity .5s; } .st-p2 .e060-p2 { opacity: 1; }
.e060-slices, .e060-kslices { opacity: 0; transition: opacity .3s; } .st-shared .e060-kslices, .st-shared .e060-slices { opacity: 1; }
.st-shared .e060-cake { opacity: .0; }
@media (prefers-reduced-motion: reduce) {
  .st-cal .e060-calglow, .st-qm .e060-qm { animation: none; }
  ${WH.map(([k]) => `.st-now-${k} .e060-wh-${k}`).join(', ')} { animation: none; }
  .st-boxbounce .e060-box { animation-duration: .7s; animation-iteration-count: 2; }
  .st-conf .e060-conf rect { animation-duration: 3s; }
  .e060-fl { animation-duration: .8s; }
}
`;

const KIDS = ['minh', 'tom', 'mai'];
const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Thẻ câu hỏi k sáng lên (giữ màu), thẻ đang hỏi lắc. */
const wh = (st, k) => { WH.forEach(([w]) => st.set(`st-now-${w}`, false)); st.set(`st-wh-${k}`); st.set(`st-now-${k}`); st.sfx('pop', { vol: 0.6 }); };

const BEATS = [
  { key: ['On Friday morning', 'a mystery box'], icon: '📦', label: 'mystery box', async play(st) {
    st.look(300);
    st.set('st-cal'); st.sfx('door-open', { vol: 0.5 });
    st.set('st-door');
    await st.walk('hoa', 386, { speed: 110, follow: false });
    st.set('st-door', false); st.set('st-cal', false);
    st.mood('hoa', 'wow'); st.pose('hoa', 'open');
    st.set('st-qm'); st.set('st-boxbounce'); st.sfx('box-shake', { vol: 0.5 });
    await st.wait(1600);
    st.set('st-boxbounce', false);
  } },
  { key: ['blue', 'a big yellow ribbon'], icon: '🎀', label: 'yellow ribbon', async play(st) {
    st.look(400);
    st.pose('hoa', 'point'); st.mood('hoa', 'joy');
    st.set('st-lb-blue'); st.sfx('pop', { vol: 0.6 }); await st.wait(900);
    st.set('st-lb-rib'); st.fx('sparkle', BOX_X, 168, { quiet: true }); st.sfx('pop', { vol: 0.6, rate: 1.15 });
    await st.wait(1300);
    st.pose('hoa', 'stand');
  } },
  { key: ['Who left this box here'], icon: '🧑', label: 'Who?', async play(st) {
    off(st, 'st-lb-blue', 'st-lb-rib');
    st.look(440);
    wh(st, 'who');
    st.pose('hoa', 'e060_ask'); st.mood('hoa', 'happy');
    await st.say('hoa', 'Who left this box here?', 2200);
  } },
  { key: ['she asked'], icon: '❓', label: 'she asked', async play(st) {
    st.look(540);
    st.face('hoa', 1); st.pose('hoa', 'open');
    for (const id of KIDS) st.mood(id, 'wow');
    st.set('st-boxbounce'); st.sfx('box-shake', { vol: 0.45 });
    await st.wait(1600);
    st.set('st-boxbounce', false);
  } },
  { key: ['Nobody knew'], icon: '🤷', label: 'Nobody knew', async play(st) {
    st.look(640);
    st.set('st-lb-nobody'); st.sfx('pop', { vol: 0.5 });
    for (const id of KIDS) { st.pose(id, 'e060_shrug'); st.act(id, 'no'); st.mood(id, 'happy'); }
    st.sfx('buzz-no', { vol: 0.5 });
    await st.wait(1800);
    for (const id of KIDS) { st.act(id, null); st.pose(id, 'sitDesk'); }
  } },
  { key: ['What is inside'], icon: '🎁', label: 'What?', async play(st) {
    st.set('st-lb-nobody', false);
    st.look(560);
    wh(st, 'what');
    st.pose('tom', 'e060_sitPoint'); st.mood('tom', 'joy');
    await st.say('tom', 'What is inside?', 1900);
  } },
  { key: ['Tom asked'], icon: '🙋', label: 'Tom asked', async play(st) {
    st.look(600);
    st.pose('tom', 'e060_sitRaise'); st.act('tom', 'point'); st.sfx('whoosh', { vol: 0.3, rate: 1.3 });
    await st.wait(1500);
    st.act('tom', null); st.pose('tom', 'sitDesk');
  } },
  { key: ['opened it carefully'], icon: '🤲', label: 'opened it', async play(st) {
    st.look(430);
    st.set('st-qm', false);
    st.face('hoa', 1); st.pose('hoa', 'e060_open'); st.mood('hoa', 'shut');
    st.set('st-untie'); st.sfx('whoosh', { vol: 0.35, rate: 0.8 });
    await st.wait(800);
    st.set('st-open'); st.sfx('pop', { vol: 0.6, rate: 0.8 });
    await st.wait(1700);
    st.mood('hoa', 'happy');
  } },
  { key: ['a beautiful cake and a card'], icon: '🎂', label: 'cake and card', async play(st) {
    st.look(470);
    st.set('st-cake'); st.sfx('sparkle', { vol: 0.6 });
    st.fx('sparkle', BOX_X, 170, { quiet: true });
    st.mood('hoa', 'wow'); st.pose('hoa', 'open');
    for (const id of KIDS) st.mood(id, 'wow');
    await st.wait(2200);
    st.mood('hoa', 'joy');
  } },
  { key: ['Thank you, Ms Hoa'], icon: '💌', label: 'Thank you!', async play(st) {
    st.look(500);
    st.pose('hoa', 'read');
    st.set('st-big'); st.sfx('page-turn', { vol: 0.5 });
    await st.wait(2200);
  } },
  { key: ["Happy Teachers' Day"], icon: '🌸', label: "Teachers' Day", async play(st) {
    st.look(520);
    st.set('st-big2'); st.set('st-conf'); st.sfx('hearts', { vol: 0.5 }); st.sfx('clap', { vol: 0.5 });
    st.pose('hoa', 'me'); st.mood('hoa', 'joy');
    for (const id of KIDS) { st.pose(id, 'sitClap'); st.act(id, 'clap'); st.mood(id, 'joy'); }
    await st.wait(2200);
    for (const id of KIDS) { st.act(id, null); st.pose(id, 'sitDesk'); }
  } },
  { key: ['Where did it come from'], icon: '📍', label: 'Where?', async play(st) {
    off(st, 'st-big', 'st-big2', 'st-conf');
    st.look(560);
    wh(st, 'where');
    st.pose('minh', 'e060_sitPoint'); st.mood('minh', 'wow');
    await st.say('minh', 'Where did it come from?', 2100);
  } },
  { key: ['Minh asked'], icon: '👀', label: 'Minh asked', async play(st) {
    st.look(600);
    st.pose('minh', 'e060_shrug');
    st.face('minh', 1); st.sfx('whoosh', { vol: 0.25, rate: 1.5 }); await st.wait(500);
    st.face('minh', -1); st.sfx('whoosh', { vol: 0.25, rate: 1.5 }); await st.wait(500);
    st.face('minh', 1); st.sfx('whoosh', { vol: 0.25, rate: 1.5 }); await st.wait(500);
    st.face('minh', -1); st.pose('minh', 'sitDesk'); st.mood('minh', 'happy');
  } },
  { key: ['Lan walked into the room', 'smiled'], icon: '🚪', label: 'Lan walked in', async play(st) {
    st.look(260);
    st.set('st-door'); st.sfx('door-open', { vol: 0.5 });
    st.show('lan', true);
    await st.walk('lan', 262, { speed: 120, follow: false });
    st.set('st-door', false);
    st.mood('lan', 'joy'); st.pose('lan', 'wave'); st.act('lan', 'wave'); st.sfx('giggle', { vol: 0.5 });
    st.face('hoa', -1); st.mood('hoa', 'joy');
    await st.wait(1200);
    st.act('lan', null); st.pose('lan', 'stand');
  } },
  { key: ['made the cake the night before', 'early in the morning'], icon: '🌙', label: 'the night before', async play(st) {
    st.look(300);
    st.pose('lan', 'think');
    st.set('st-bub-flash'); st.sfx('pop', { vol: 0.6 });
    await st.wait(500); st.sfx('pot-stir', { vol: 0.45 });
    await st.wait(2100);
    st.set('st-p2'); st.sfx('bowl-down', { vol: 0.45 });
    await st.wait(2600);
    st.pose('lan', 'stand');
  } },
  { key: ["Why didn't you tell us"], icon: '🤔', label: 'Why?', async play(st) {
    off(st, 'st-bub-flash', 'st-p2');
    st.look(545);
    wh(st, 'why');
    st.pose('minh', 'e060_sitPoint'); st.mood('minh', 'wow');
    await st.say('minh', "Why didn't you tell us?", 2100);
  } },
  { key: ['asked Minh'], icon: '❔', label: 'asked Minh', async play(st) {
    st.look(545);
    st.pose('minh', 'e060_shrug'); st.mood('minh', 'happy'); st.sfx('whoosh', { vol: 0.3, rate: 1.4 });
    await st.wait(1500);
    st.pose('minh', 'sitDesk');
  } },
  { key: ['Because it was a surprise'], icon: '🎉', label: 'a surprise!', async play(st) {
    st.look(330);
    WH.forEach(([w]) => st.set(`st-now-${w}`, false));
    st.pose('lan', 'open'); st.mood('lan', 'joy');
    st.set('st-lb-surprise'); st.set('st-conf'); st.sfx('pop', { vol: 0.6 }); st.sfx('cheer', { vol: 0.6 });
    await st.say('lan', 'Because it was a surprise!', 2200);
  } },
  { key: ['Lan said'], icon: '😊', label: 'Lan said', async play(st) {
    st.look(330);
    st.pose('lan', 'cheer'); st.act('lan', 'hop');
    st.pose('hoa', 'clap'); st.act('hoa', 'clap'); st.sfx('clap', { vol: 0.6 }); st.sfx('giggle', { vol: 0.5 });
    st.fx('hearts', 300, 140);
    await st.wait(1600);
    st.act('lan', null); st.act('hoa', null); st.pose('lan', 'stand'); st.pose('hoa', 'stand');
  } },
  { key: ['Everyone shared the cake'], icon: '🍰', label: 'shared the cake', async play(st) {
    off(st, 'st-lb-surprise', 'st-conf');
    st.look(540); st.sfx('whoosh', { vol: 0.45 });
    await Promise.all([620, 710, 800].map((x, i) => st.fly(SLICE, [BOX_X, 190], [x, FLOOR - 66], { size: 22, dur: 600 + i * 150 })));
    st.set('st-shared'); st.sfx('bowl-down', { vol: 0.4 });
    for (const id of KIDS) { st.hold(id, 'spoon'); st.pose(id, 'eat'); st.act(id, 'eat'); st.mood(id, 'joy'); }
    for (const id of ['hoa', 'lan']) { st.hold(id, 'spoon'); st.pose(id, 'e060_eatStand'); st.act(id, 'eat'); st.mood(id, 'joy'); }
    st.fx('hearts', 560, 150);
    await st.wait(2200);
  } },
];

export default {
  id: 'en060', worldW: 1100, floor: FLOOR, viewTop: 40, camStart: 60, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: {
    e060_ask: { R: [55, 40], L: [55, 40], head: 7 },
    e060_open: { R: [60, 100], L: [40, 80], head: 6 },
    e060_shrug: { R: [50, 130], L: [50, 130], dy: 20, head: -6 },
    e060_sitPoint: { R: [84, 92], L: [22, -40], dy: 20 },
    e060_sitRaise: { R: [160, 178], L: [22, -40], dy: 20 },
    e060_eatStand: { R: [118, 248], L: [40, 110] },
  },
  order: [0, 2, 7, 8, 13, 19],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 70, s: 0.95 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 70, s: 1.08 },
    { id: 'mai', kind: 'kid', who: 'e060_mai', x: 800, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 710, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 620, face: -1 },
  ],
  init(st) {
    for (const id of KIDS) st.pose(id, 'sitDesk');
    st.show('lan', false);
  },
};
