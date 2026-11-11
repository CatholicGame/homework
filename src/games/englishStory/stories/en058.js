/**
 * Bài 58 "My Dream Job": lớp học (cô Hoa hỏi, bảng "What do you want to be?") → sân trường (Minh chạy thật nhanh sút bóng vào
 * gôn, Tom dang tay làm máy bay, máy bay bay qua) → bếp (Lan nấu ăn) → phòng khách (mẹ, bố mặc áo bác sĩ đi làm về, Lucky).
 * Ước mơ = bong bóng nghĩ: trong đó là chính nhân vật mặc đồ nghề (cầu thủ, phi công, đầu bếp, ca sĩ / cô giáo, bác sĩ, chó
 * cảnh sát đội mũ police).
 * Toạ độ cảnh: rộng 1800, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, person, headOnly } from '../../tiengViet3/cast.js';
import { dogSvg } from '../rig.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, room, doorway, windowBox, board, desk, thought, shelf, books, steam, rug } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e058_kit: { hair: 'spiky', top: 'tee', shirt: '#DC2626', bottom: 'shorts', bottomC: '#FFFFFF', shoe: '#111827' },
  e058_pilot: { hair: 'neat', hairC: '#E0A33A', top: 'jacket', shirt: '#1E3A8A', inner: '#FFFFFF', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#111827', hat: 'police' },
  e058_chef: { hair: 'ponytail', top: 'jacket', shirt: '#FFFFFF', inner: '#F1F5F9', bottom: 'pants', bottomC: '#334155', shoe: '#111827', hat: 'chef' },
  e058_young: { hair: 'pigtails', top: 'dress', shirt: '#F472B6', shoe: '#F5F5F4' },
  e058_doc: { adult: true, hair: 'short', top: 'jacket', shirt: '#FFFFFF', inner: '#60A5FA', bottom: 'pants', bottomC: '#334155', shoe: '#1C1917' },
  e058_pat: { hair: 'bob', top: 'tee', shirt: '#FDE047', bottom: 'shorts', bottomC: '#2563EB', shoe: '#F472B6' },
  e058_kid1: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F28AB2' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const BALL = `<circle r="8" fill="#fff" stroke="${L}" stroke-width="0.9"/><path d="M0 -3 l3 2.2 -1.2 3.4 h-3.6 l-1.2 -3.4Z" fill="#1F2937"/><path d="M0 -3 V-8 M3 -0.8 L7.6 -2.4 M1.8 2.6 L4.6 6.4 M-1.8 2.6 L-4.6 6.4 M-3 -0.8 L-7.6 -2.4" stroke="#1F2937" stroke-width="0.8"/>`;
const STETHO = `<g transform="translate(0 -14)"><path d="M-7 -14 Q-9 2 0 6 Q9 2 7 -14" stroke="#475569" stroke-width="1.8" fill="none"/><circle cx="0" cy="8" r="3.2" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>`;
const HEART = (c = '#F43F5E') => `<path d="M0 6 C-10 -2 -8 -10 -3 -10 C-1 -10 0 -8 0 -7 C0 -8 1 -10 3 -10 C8 -10 10 -2 0 6Z" fill="${c}" stroke="${L}" stroke-width="0.7"/>`;
const NOTE = `<path d="M0 0 V-14 L8 -16 V-3" stroke="#7C3AED" stroke-width="1.8" fill="none"/><ellipse cx="-2" cy="0" rx="3" ry="2.2" fill="#7C3AED"/><ellipse cx="6" cy="-2" rx="3" ry="2.2" fill="#7C3AED"/>`;
/** Máy bay (gốc giữa thân, bay sang phải); head = đầu người lái ở buồng lái. */
const PLANE = (head = '') => `<g><path d="M-50 -4 Q-50 -14 -36 -14 L34 -14 Q52 -12 56 -2 Q52 6 34 6 L-36 6 Q-50 6 -50 -4Z" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <path d="M-44 -12 L-54 -34 L-40 -34 L-26 -14Z" fill="#DC2626" stroke="${L}" stroke-width="1"/><path d="M-6 0 L-24 24 L-10 24 L14 0Z" fill="#60A5FA" stroke="${L}" stroke-width="1"/>
  ${[-26, -14, -2, 10].map((x) => `<circle cx="${x}" cy="-6" r="3" fill="#BAE6FD" stroke="${L}" stroke-width="0.6"/>`).join('')}
  ${head ? `<g transform="translate(36 -16)">${head}</g>` : ''}<path d="M30 -14 Q46 -26 52 -6 L30 -6Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.8" opacity="${head ? 0.55 : 1}"/></g>`;
const POLICE_CAP = `<path d="M-13 -4 C-14 -16 -7 -20 0 -20 C7 -20 14 -16 13 -4Z" fill="#1E3A8A" stroke="${L}" stroke-width="0.7"/>
  <path d="M-17 -21 Q0 -29 17 -21 L13 -14 H-13Z" fill="#1E40AF" stroke="${L}" stroke-width="0.7"/><rect x="-13" y="-7" width="26" height="3.4" fill="#111827"/>
  <path d="M-11 -4 Q2 0 16 -4 Q12 1 -9 -1Z" fill="#111827"/><path d="M0 -22 l2.2 2.8 l-2.2 2.8 l-2.2 -2.8Z" fill="#FACC15" stroke="${L}" stroke-width="0.5"/>`;

const POSES = {
  e058_ask: { R: [60, 40], L: [10, 4], head: -4 },
  e058_kick: { R: [60, 80], L: [60, 80], head: -4 },
  e058_mic: { R: [40, -150], L: [10, 4], head: 6 },
  e058_laugh: { R: [30, -120], L: [30, -120], head: -8 },
};

function bg() {
  return `
  <!-- LỚP HỌC -->
  ${room(0, 560, FLOOR, '#E0F2FE', '#D9A066')}
  ${board(30, 64, 200, 88)}
  <text x="130" y="98" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="17" fill="#F8FAFC">What do you</text>
  <text x="130" y="122" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="17" fill="#F8FAFC">want to be?</text>
  <g class="e058-chalk"><path d="M44 136 H216" stroke="#FDE047" stroke-width="3" stroke-linecap="round"/></g>
  ${windowBox(300, 66, 90, 74)}
  ${shelf(420, 120, 90, books(430, 120, 7))}
  ${doorway(556, FLOOR)}

  <!-- SÂN TRƯỜNG -->
  ${sky(568, 380, 315, 'e058sky')}
  ${cloud(640, 66, 0.9, 0)}${cloud(860, 54, 0.8, 2)}
  <path d="M568 236 Q700 206 820 232 T948 226 V${FLOOR} H568Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <rect x="568" y="${FLOOR - 6}" width="380" height="45" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M${590 + i * 46} ${FLOOR + 12} l3 -7 l3 7" stroke="#15803D" stroke-width="1.4" fill="none"/>`).join('')}
  ${tree(640, FLOOR - 6, 0.85)}
  <!-- gôn -->
  <g transform="translate(900 ${FLOOR})"><path d="M-30 0 V-58 H30 V0" stroke="#fff" stroke-width="5" fill="none" stroke-linejoin="round"/><path d="M-30 0 V-58 H30 V0" stroke="${L}" stroke-width="1" fill="none"/>
    ${Array.from({ length: 6 }, (_, i) => `<path d="M${-26 + i * 10} -56 V-2" stroke="#E2E8F0" stroke-width="0.8"/>`).join('')}${[0, 1, 2, 3, 4].map((i) => `<path d="M-28 ${-48 + i * 11} H28" stroke="#E2E8F0" stroke-width="0.8"/>`).join('')}
    <g class="e058-goalball"><g transform="translate(10 -10)">${BALL}</g></g></g>
  <g class="e058-lb e058-lb-goal">${label(900, 196, 'GOAL!', '#DC2626', 15)}</g>

  <!-- BẾP -->
  ${room(948, 400, FLOOR, '#FEF9C3', '#D9A066')}
  ${doorway(954, FLOOR)}
  <rect x="1180" y="60" width="140" height="56" rx="3" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><path d="M1250 60 V116" stroke="${L}"/><circle cx="1240" cy="92" r="2.4" fill="${L}"/><circle cx="1260" cy="92" r="2.4" fill="${L}"/>
  <rect x="1170" y="200" width="160" height="${FLOOR - 200}" fill="#FCA5A5" stroke="${L}" stroke-width="1.2"/><rect x="1164" y="194" width="172" height="9" rx="3" fill="#F8FAFC" stroke="${L}"/>
  <path d="M1250 210 V${FLOOR - 4}" stroke="${L}" stroke-width="0.8"/><circle cx="1240" cy="240" r="2.4" fill="${L}"/><circle cx="1260" cy="240" r="2.4" fill="${L}"/>
  <!-- bếp ga + nồi -->
  <rect x="1100" y="214" width="60" height="${FLOOR - 214}" fill="#E5E7EB" stroke="${L}" stroke-width="1.2"/><rect x="1096" y="208" width="68" height="8" rx="2" fill="#94A3B8" stroke="${L}"/>
  <circle cx="1116" cy="240" r="4" fill="#64748B"/><circle cx="1144" cy="240" r="4" fill="#64748B"/><rect x="1108" y="254" width="44" height="22" rx="2" fill="#1F2937" stroke="${L}"/>
  <g class="e058-flame"><path d="M1120 208 q3 -7 6 0 M1132 208 q3 -8 6 0" stroke="#F97316" stroke-width="2" fill="#FDBA74"/></g>
  <path d="M1112 206 H1148 L1145 184 H1115Z" fill="#EF4444" stroke="${L}" stroke-width="1.1"/><path d="M1108 184 H1152" stroke="${L}" stroke-width="2.4" stroke-linecap="round"/>
  ${steam(1130, 180, 'e058-steam')}
  <g transform="translate(1218 194)"><rect x="-14" y="-20" width="28" height="20" rx="3" fill="#fff" stroke="${L}"/><text x="0" y="-6" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="8" fill="#DC2626">RICE</text></g>
  <g transform="translate(1290 194)"><path d="M-12 -2 H12 Q11 -14 0 -14 Q-11 -14 -12 -2Z" fill="#22C55E" stroke="${L}"/></g>
  ${doorway(1346, FLOOR)}

  <!-- PHÒNG KHÁCH -->
  ${room(1358, 442, FLOOR, '#EDE9FE', '#C08B5C')}
  ${windowBox(1600, 66, 100, 80)}
  <g transform="translate(1440 0)"><rect x="-70" y="206" width="140" height="44" rx="12" fill="#2DD4BF" stroke="${L}" stroke-width="1.2"/><rect x="-80" y="232" width="160" height="36" rx="10" fill="#14B8A6" stroke="${L}" stroke-width="1.2"/>
    <path d="M-70 268 V${FLOOR} M70 268 V${FLOOR}" stroke="#92400E" stroke-width="5"/></g>
  ${shelf(1408, 150, 80, books(1414, 150, 7))}
  ${rug(1560, FLOOR, 160, '#FDE68A')}
  <!-- cửa ra vào -->
  <rect x="1748" y="120" width="52" height="${FLOOR - 120}" fill="#92400E" stroke="${L}" stroke-width="1.2"/>
  <g class="e058-door"><rect x="1752" y="124" width="44" height="${FLOOR - 124}" fill="#B45309" stroke="${L}"/><circle cx="1758" cy="210" r="3" fill="#FDE68A"/></g>

  <!-- nhãn -->
  <g class="e058-lb e058-lb-fast">${label(720, 150, 'very fast', '#EA580C', 15)}</g>
  <g class="e058-lb e058-lb-doctor">${label(1700, 100, 'doctor', '#0369A1', 15)}</g>
  <g class="e058-lb e058-lb-woof">${label(1600, 180, 'Woof!', '#92400E', 15)}</g>
  <g class="e058-lb e058-lb-ha">${label(1460, 116, 'Ha ha!', '#DB2777', 15)}</g>`;
}

const bub = (k, x, y, w, h, inner, tip, sc = 1.3) => `<g class="e058-bub e058-bub-${k}" style="transform-origin:${tip[0]}px ${tip[1]}px">${thought(x, y, w, h, `<g transform="scale(${sc})">${inner}</g>`, tip)}</g>`;
const cap = (t, c, y) => `<text x="0" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="11" fill="${c}">${t}</text>`;

function fg() {
  // Bong bóng ước mơ (toạ độ trong bong bóng: gốc ở tâm)
  const foot = `${person(-14, 26, 'e058_kit', 'run', { s: 0.38 })}<g transform="translate(14 21) scale(0.7)">${BALL}</g>${cap('footballer', '#DC2626', -25)}`;
  const pilot = `<g transform="translate(-4 2) scale(0.78)">${PLANE(headOnly('e058_pilot', { s: 0.42, mood: 'joy' }))}</g>
    <g transform="translate(46 -6)"><path d="M-14 -16 V12" stroke="${L}" stroke-width="1"/><rect x="-14" y="-16" width="20" height="13" fill="#1E3A8A" stroke="${L}" stroke-width="0.6"/><path d="M-12 -5 l4 -3 l4 3" stroke="#fff" stroke-width="0.8" fill="none"/><text x="0" y="22" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="8" fill="#0369A1">AUSTRALIA</text></g>
    <g transform="translate(-40 18)">${headOnly('en_grandma', { s: 0.32 })}</g><g transform="translate(-24 20)">${headOnly('en_grandpa', { s: 0.32 })}</g>${cap('pilot', '#1D4ED8', -24)}`;
  const chef = `${person(-14, 28, 'e058_chef', 'hold', { s: 0.4 })}<g transform="translate(22 14)"><path d="M-14 0 H14" stroke="${L}" stroke-width="1.4"/><path d="M-11 0 V-10 H11 V0Z" fill="#FBCFE8" stroke="${L}" stroke-width="0.8"/><path d="M-11 -10 Q0 -16 11 -10" fill="#fff" stroke="${L}" stroke-width="0.8"/><circle cx="0" cy="-15" r="2.4" fill="#EF4444"/></g>${cap('chef', '#DB2777', -25)}`;
  const singer = `<g class="e058-sing">${person(-12, 28, 'e058_young', 'raise', { s: 0.4 })}<g transform="translate(-2 -14) rotate(20)"><rect x="-2" y="0" width="4" height="12" rx="1.6" fill="#1F2937"/><circle r="4" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>
    <g class="e058-notes"><g transform="translate(18 -2)">${NOTE}</g><g transform="translate(32 14) scale(0.8)">${NOTE}</g></g>${cap('singer', '#7C3AED', -25)}</g>
    <g class="e058-teach"><rect x="-6" y="-20" width="44" height="30" rx="2" fill="#166534" stroke="#A16207" stroke-width="2"/><text x="16" y="-1" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="800" font-size="10" fill="#fff">ABC</text>
      ${person(-22, 28, 'en_mum', 'point', { s: 0.3 })}<g transform="translate(30 20) scale(0.7)">${HEART()}</g>${cap('teacher', '#16A34A', -23)}</g>`;
  const doc = `${person(-14, 28, 'e058_doc', 'give', { s: 0.32 })}${person(20, 28, 'e058_pat', 'stand', { s: 0.36 })}<rect x="14" y="8" width="10" height="4" rx="1.6" fill="#fff" stroke="${L}" stroke-width="0.5"/>
    <g transform="translate(4 -12) scale(0.7)">${HEART()}</g><g transform="translate(16 -22) scale(0.5)">${HEART()}</g>${cap('helping people', '#0369A1', -25)}`;
  const pdog = `<g transform="translate(-8 26) scale(0.62)">${dogSvg()}<g transform="translate(32 -64)">${POLICE_CAP}</g><g transform="translate(25 -42)"><path d="M0 0 l4 5 l-4 5 l-4 -5Z" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g></g>${cap('police dog', '#1E3A8A', -24)}`;
  return `
  <!-- bàn học sinh (che chân người ngồi) -->
  ${desk(382, FLOOR)}${desk(452, FLOOR, '#FB923C')}${desk(522, FLOOR, '#FACC15')}
  ${bush(600, FLOOR + 22, 0.8, '#22C55E')}
  ${bub('foot', 470, 106, 170, 96, foot, [515, 150])}
  ${bub('pilot', 556, 104, 196, 96, pilot, [598, 150], 1.25)}
  ${bub('chef', 996, 104, 164, 96, chef, [1050, 150])}
  ${bub('mum', 1504, 100, 170, 98, singer, [1424, 120])}
  ${bub('dad', 1586, 98, 176, 96, doc, [1670, 118])}
  ${bub('dog', 1604, 116, 160, 94, pdog, [1606, 212])}`;
}

const CSS = `
.e058-lb { opacity: 0; transition: opacity .35s; }
${['fast', 'goal', 'doctor', 'woof', 'ha'].map((k) => `.st-lb-${k} .e058-lb-${k}`).join(', ')} { opacity: 1; }
.e058-bub { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.5,.6,1); }
${['foot', 'pilot', 'chef', 'mum', 'dad', 'dog'].map((k) => `.st-bub-${k} .e058-bub-${k}`).join(', ')} { opacity: 1; transform: scale(1); }
.e058-chalk { opacity: 0; transition: opacity .3s; } .st-ask .e058-chalk { opacity: 1; }
.e058-goalball { opacity: 0; transition: opacity .2s; } .st-goal .e058-goalball { opacity: 1; }
.e058-steam, .e058-flame { opacity: 0; transition: opacity .4s; } .st-cook .e058-steam, .st-cook .e058-flame { opacity: 1; }
.st-cook .e058-flame { animation: e058Flick .2s ease-in-out infinite alternate; transform-box: fill-box; transform-origin: 50% 100%; }
@keyframes e058Flick { to { transform: scaleY(1.25); } }
.e058-teach { opacity: 0; transition: opacity .4s; } .e058-sing { transition: opacity .4s; }
.st-teach .e058-teach { opacity: 1; } .st-teach .e058-sing { opacity: 0; }
.st-bub-mum .e058-notes { animation: e058Note .6s ease-in-out infinite alternate; }
@keyframes e058Note { to { transform: translateY(-4px) rotate(6deg); } }
.e058-door { transform-box: fill-box; transform-origin: 100% 50%; transition: transform .4s; } .st-door .e058-door { transform: scaleX(.2); }
@media (prefers-reduced-motion: reduce) { .st-cook .e058-flame, .st-bub-mum .e058-notes { animation-duration: 1.4s; } }
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));

const BEATS = [
  { key: ['What do you want to be in the future'], icon: '❓', label: 'in the future?', async play(st) {
    st.look(380);
    st.pose('hoa', 'e058_ask'); st.set('st-ask'); st.sfx('pop', { vol: 0.6 });
    await st.say('hoa', 'What do you want to be?', 2400);
    st.pose('hoa', 'pointUp'); st.act('hoa', 'point');
    await st.wait(600);
    st.act('hoa', null); st.pose('hoa', 'stand');
  } },
  { key: ['a footballer', 'loves football'], icon: '⚽', label: 'footballer', async play(st) {
    st.look(400);
    st.set('st-ask', false);
    st.pose('minh', 'raise'); st.mood('minh', 'joy'); st.sfx('whoosh', { vol: 0.3, rate: 1.3 });
    await st.wait(500);
    st.pose('minh', 'think');
    st.set('st-bub-foot'); st.sfx('pop', { vol: 0.6 });
    await st.wait(2400);
    st.pose('minh', 'stand');
  } },
  { key: ['run very fast'], icon: '🏃', label: 'run very fast', async play(st) {
    st.set('st-bub-foot', false);
    st.set('st-lb-fast');
    await st.walk('minh', 690, { speed: 330, lead: 60 });
    st.pose('minh', 'e058_kick'); st.show('ball', false); st.sfx('kick', { vol: 0.7 });
    await st.fly(BALL, [712, 274], [910, 262], { size: 18, dur: 600 });
    st.set('st-goal'); st.set('st-lb-goal'); st.sfx('cheer', { vol: 0.6 }); st.sfx('whistle', { vol: 0.35 });
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'stand');
  } },
  { key: ['a pilot', 'fly to Australia'], icon: '✈️', label: 'pilot', async play(st) {
    off(st, 'st-lb-fast', 'st-lb-goal');
    await st.walk('tom', 604, { speed: 170, lead: 50 });
    st.pose('tom', 'arms'); st.mood('tom', 'joy'); st.act('tom', 'hop');
    st.set('st-bub-pilot'); st.sfx('pop', { vol: 0.6 });
    st.show('plane', true);
    await st.loop('plane', () => st.walk('plane', 1000, { speed: 220, follow: false }), { vol: 0.6 });
    st.show('plane', false);
    await st.wait(700);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
  { key: ['a chef', 'enjoys cooking'], icon: '👩‍🍳', label: 'chef', async play(st) {
    st.set('st-bub-pilot', false);
    await st.look(1090, { dur: 1100 });
    st.set('st-cook'); st.sfx('pot-stir', { vol: 0.6 }); st.sfx('sizzle', { vol: 0.4 });
    st.hold('lan', 'spoon'); st.pose('lan', 'stir'); st.act('lan', 'stir'); st.mood('lan', 'joy');
    await st.wait(700);
    st.set('st-bub-chef'); st.sfx('pop', { vol: 0.6 });
    await st.wait(2000);
  } },
  { key: ['a singer', 'love teaching'], icon: '🎤', label: 'singer', async play(st) {
    st.set('st-bub-chef', false); st.act('lan', null);
    await st.look(1450, { dur: 1000 });
    st.pose('mum', 'e058_mic'); st.talk('mum', true);
    st.set('st-bub-mum'); st.sfx('pop', { vol: 0.6 });
    await st.wait(2400);
    st.set('st-teach'); st.pose('mum', 'me'); st.mood('mum', 'joy');
    st.fx('hearts', 1400, 120, { n: 1 });
    await st.wait(2200);
    st.talk('mum', false);
  } },
  { key: ['Dad is a doctor'], icon: '🩺', label: 'doctor', async play(st) {
    off(st, 'st-bub-mum', 'st-teach'); st.pose('mum', 'stand'); st.mood('mum', 'happy');
    st.look(1600);
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 });
    st.show('dad', true);
    await st.walk('dad', 1690, { speed: 120, follow: false });
    st.face('dad', -1);
    st.pose('dad', 'wave'); st.act('dad', 'wave'); st.set('st-lb-doctor'); st.sfx('pop', { vol: 0.5 });
    await st.wait(1200);
    st.act('dad', null); st.pose('dad', 'stand'); st.set('st-door', false);
  } },
  { key: ['likes helping people'], icon: '❤️', label: 'helping people', async play(st) {
    st.set('st-lb-doctor', false);
    st.look(1600);
    st.pose('dad', 'think'); st.mood('dad', 'joy');
    st.set('st-bub-dad'); st.sfx('hearts', { vol: 0.5 });
    await st.walk('lan', 1462, { speed: 150, follow: false });
    st.hold('lan', null);
    await st.wait(1600);
    st.pose('dad', 'stand');
  } },
  { key: ['Minh asks Lucky'], icon: '🐶', label: 'asks Lucky', async play(st) {
    st.set('st-bub-dad', false); st.mood('dad', 'happy');
    await st.walk('minh', 1522, { speed: 300, lead: 30 });
    st.face('minh', 1);
    st.pose('minh', 'open'); st.sfx('pop', { vol: 0.5 });
    await st.say('minh', 'What do you want to be?', 2000);
    st.pose('minh', 'stand');
  } },
  { key: ['Lucky barks'], icon: '🐕', label: 'barks', async play(st) {
    st.look(1560);
    st.dog('lucky', 'stand'); st.mood('lucky', 'joy'); st.act('lucky', 'jump');
    st.set('st-lb-woof'); st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(700);
    st.sfx('dog-bark', { vol: 0.7 });
    await st.wait(900);
    st.act('lucky', 'wag'); st.mood('lucky', 'happy');
  } },
  { key: ['a police dog'], icon: '👮', label: 'police dog', async play(st) {
    st.set('st-lb-woof', false);
    st.look(1560);
    st.face('lan', 1); st.pose('lan', 'point'); st.mood('lan', 'joy');
    st.set('st-bub-dog'); st.sfx('whistle', { vol: 0.4 });
    await st.say('lan', 'A police dog!', 2000);
    st.pose('lan', 'stand');
  } },
  { key: ['Lan laughs'], icon: '😂', label: 'Lan laughs', async play(st) {
    st.look(1560);
    st.pose('lan', 'e058_laugh'); st.act('lan', 'hop'); st.mood('lan', 'joy');
    st.set('st-lb-ha'); st.sfx('giggle', { vol: 0.7 });
    for (const id of ['minh', 'mum', 'dad']) st.mood(id, 'joy');
    st.act('lucky', 'jump');
    st.fx('hearts', 1500, 150);
    await st.wait(2000);
    st.act('lan', null); st.act('lucky', 'wag'); st.pose('lan', 'stand');
  } },
];

export default {
  id: 'en058', worldW: 1800, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [1, 2, 3, 4, 6, 10],
  cast: [
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 290, s: 0.95 },
    { id: 'kid1', kind: 'kid', who: 'e058_kid1', x: 382, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 452, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 522, face: -1 },
    { id: 'ball', kind: 'thing', svg: `<g transform="translate(0 -8)">${BALL}</g>`, box: [-10, -18, 20, 20], x: 712 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: 1070, s: 1.08 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 1400, s: 0.95 },
    { id: 'lucky', kind: 'dog', x: 1600, face: -1 },
    { id: 'dad', kind: 'adult', who: 'e058_doc', x: 1790, s: 0.95, face: -1 },
    { id: 'plane', kind: 'thing', svg: PLANE(), box: [-58, -38, 118, 66], x: 520, y: 90 },
  ],
  init(st) {
    for (const id of ['minh', 'tom', 'kid1']) st.pose(id, 'sitDesk');
    st.show('plane', false); st.show('dad', false);
    st.dog('lucky', 'sit');
    st.chest('dad', STETHO);
  },
};
