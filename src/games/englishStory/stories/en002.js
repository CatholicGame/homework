/**
 * Bài 2 "My Family": cả nhà về quê Nam Định. Đi từ trái sang phải: sân trước (xe nhà Minh, bố · mẹ · chị Lan) ·
 * cổng làng NAM DINH và nhà ông bà · vườn cây (hai em họ Hải, Mai) · ao và đống rơm (Lucky, Kitty).
 * Minh giới thiệu từng người: người được nhắc đứng trong vầng sáng (lớp nền, sau nhân vật), nhãn chữ nổi ở lớp trước.
 * Toạ độ cảnh: rộng 1700, cao 315, mặt đất y = 282.
 */
import { KIT_CSS, L, cloud, tree, bush, flowerAt, sun, label, BANANA } from '../kit.js';
import { CAST, headOnly } from '../../tiengViet3/cast.js';

const FLOOR = 282;
const W = 1700;

Object.assign(CAST, {
  e002_hai: { hair: 'bowl', top: 'tee', shirt: '#38BDF8', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F59E0B' },
  e002_mai: { hair: 'pigtails', top: 'dress', shirt: '#FDE047', shoe: '#F472B6' },
});

// Vị trí đứng
const X = { minh: 70, dad: 166, mum: 264, lan: 362, gpa: 650, gma: 742, hai: 1002, mai: 1080, lucky: 1360, kitty: 1450 };

// ── Thẻ nổi (st-t-<tên>) ──────────────────────────────────────────────────
const POPS = ['family', 'dad', 'doctor', 'mum', 'teacher', 'lan', 'eleven', 'gp', 'nd', 'gpa', 'tall', 'gma', 'kind', 'funny',
  'cousins', 'six', 'pets', 'lucky', 'dog', 'kitty', 'cat', 'me', 'minh', 'eight', 'big', 'love',
  'gdad', 'gmum', 'glan', 'ggpa', 'ggma', 'gcous', 'glucky', 'gkitty', 'gme'];
const pop = (name, x, y, inner) => `<g transform="translate(${x} ${y})"><g class="e002-pop e002-p-${name}">${inner}</g></g>`;
const card = (w, h, inner, fill = '#fff') => `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${fill}" stroke="${L}" stroke-width="1.6"/>${inner}`;
const txt = (x, y, t, size = 18, c = '#1D4ED8') => `<text x="${x}" y="${y}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="${size}" fill="${c}">${t}</text>`;
const balloon = (n, c = '#EF4444') => `<path d="M0 30 Q-6 46 2 60" stroke="${L}" stroke-width="1.2" fill="none"/>
  <ellipse rx="26" ry="30" fill="${c}" stroke="${L}" stroke-width="1.4"/><path d="M-4 29 h8 l-4 6Z" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  <path d="M-14 -16 q6 -8 14 -8" stroke="#fff" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>${txt(0, 12, n, 34, '#fff')}`;
/** Vầng sáng sau lưng người được giới thiệu (lớp nền). h = chiều cao người. */
const glow = (name, x, h) => pop(name, x, FLOOR, `<ellipse cx="0" cy="${-h / 2}" rx="${h * 0.36}" ry="${h * 0.6}" fill="#FEF08A" opacity="0.75"/>
  <ellipse cx="0" cy="2" rx="${h * 0.34}" ry="7" fill="#FDE047" opacity="0.9"/>`);

const VN_MAP = `<path d="M-6 -44 Q6 -48 14 -40 Q8 -32 2 -26 Q-2 -18 4 -10 Q14 -2 16 10 Q18 22 10 32 Q2 40 -8 44 Q-12 40 -6 34 Q2 24 2 14 Q0 4 -8 -4 Q-16 -14 -14 -26 Q-14 -38 -6 -44Z" fill="#4ADE80" stroke="${L}" stroke-width="1.2"/>`;
const STETH = `<g transform="translate(0 -18)"><path d="M-8 -6 Q-10 18 0 20 Q10 18 8 -6" stroke="#334155" stroke-width="2.2" fill="none"/>
  <path d="M0 20 V26" stroke="#334155" stroke-width="2.2"/><circle cx="0" cy="30" r="4.4" fill="#CBD5E1" stroke="#334155" stroke-width="1.4"/></g>`;
const BIGHEART = `<path d="M0 22 C-40 -4 -30 -40 0 -20 C30 -40 40 -4 0 22Z" fill="#F43F5E" stroke="${L}" stroke-width="1.4"/><path d="M-18 -16 q6 -6 12 -2" stroke="#fff" stroke-width="3" fill="none" opacity="0.6" stroke-linecap="round"/>`;

/** Cổng làng có biển NAM DINH. */
const villageGate = (x) => `<g transform="translate(${x} 0)">
  <rect x="-58" y="132" width="18" height="${FLOOR - 136}" fill="#E7E5E4" stroke="${L}"/><rect x="40" y="132" width="18" height="${FLOOR - 136}" fill="#E7E5E4" stroke="${L}"/>
  <path d="M-72 132 Q0 104 72 132 L64 120 Q0 92 -64 120Z" fill="#B91C1C" stroke="${L}"/>
  <rect x="-50" y="136" width="100" height="30" rx="4" fill="#FEF3C7" stroke="${L}"/>
  <g class="e002-sign">${txt(0, 158, 'NAM DINH', 17, '#B91C1C')}</g>
  <path d="M-62 120 q-10 -6 -14 -14 M62 120 q10 -6 14 -14" stroke="#B91C1C" stroke-width="4" stroke-linecap="round" fill="none"/></g>`;

function house(x) {
  return `<g transform="translate(${x} 0)">
    <rect x="-150" y="138" width="300" height="${FLOOR - 144}" fill="#FDE68A" stroke="${L}" stroke-width="1.4"/>
    <path d="M-176 140 L-126 82 H126 L176 140Z" fill="#C2410C" stroke="${L}" stroke-width="1.4"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M${-150 + i * 26} 90 L${-164 + i * 28} 138" stroke="#9A3412" stroke-width="1.2"/>`).join('')}
    <path d="M-176 140 H176" stroke="${L}" stroke-width="2"/>
    ${[-110, -46, 46, 110].map((dx) => `<rect x="${dx - 22}" y="${FLOOR - 96}" width="44" height="90" fill="#B45309" stroke="${L}"/><path d="M${dx} ${FLOOR - 96} V${FLOOR - 6}" stroke="${L}"/>
      <rect x="${dx - 18}" y="${FLOOR - 90}" width="14" height="30" rx="2" fill="#92400E"/><rect x="${dx + 4}" y="${FLOOR - 90}" width="14" height="30" rx="2" fill="#92400E"/>`).join('')}
    <rect x="-160" y="${FLOOR - 8}" width="320" height="8" fill="#D6D3D1" stroke="${L}" stroke-width="0.8"/>
  </g>`;
}

function bg() {
  const rice = (x0, x1) => Array.from({ length: Math.floor((x1 - x0) / 18) }, (_, i) => `<path d="M${x0 + i * 18} 228 l3 -12 M${x0 + i * 18 + 6} 228 l-2 -10" stroke="#16A34A" stroke-width="1.6"/>`).join('');
  return `
  <defs><linearGradient id="e002sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#60C5F5"/><stop offset="1" stop-color="#DFF3FD"/></linearGradient></defs>
  <rect x="0" y="0" width="${W}" height="315" fill="url(#e002sky)"/>
  <g transform="translate(1040 70)">${sun(24)}</g>
  ${cloud(140, 60, 1, 0)}${cloud(560, 52, 0.8, 3)}${cloud(900, 66, 1.1, 5)}${cloud(1520, 50, 0.9, 2)}
  <path d="M0 222 Q200 200 420 218 T860 214 T1300 220 T${W} 214 V240 H0Z" fill="#A3E635" stroke="${L}" stroke-width="0.8"/>
  <rect x="0" y="226" width="${W}" height="14" fill="#BEF264"/>${rice(0, W)}
  ${tree(18, FLOOR - 2, 0.95)}
  ${bush(140, FLOOR - 2, 1)}
  <!-- bụi tre -->
  ${[480, 500, 520].map((x, i) => `<path d="M${x} ${FLOOR - 4} Q${x - 10 + i * 10} 160 ${x - 20 + i * 20} 70" stroke="#65A30D" stroke-width="5" fill="none"/>`).join('')}
  ${house(700)}
  ${villageGate(540)}
  <!-- vườn -->
  ${tree(900, FLOOR - 2, 1.05, '#FB923C')}${tree(1180, FLOOR - 2, 0.95, '#FDE047')}
  ${flowerAt(950, FLOOR)}${flowerAt(1130, FLOOR, '#FDE047')}${flowerAt(1140, FLOOR - 2)}
  <!-- ao, đống rơm, chuồng chó -->
  <path d="M1220 252 Q1300 236 1420 244 Q1470 252 1440 266 Q1330 276 1230 266Z" fill="#38BDF8" stroke="${L}"/>
  <g class="ek-wave"><path d="M1270 256 q6 -4 12 0 q6 4 12 0 M1370 258 q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none"/></g>
  <g transform="translate(1600 ${FLOOR - 4})"><path d="M-46 0 Q-50 -70 0 -88 Q50 -70 46 0Z" fill="#FCD34D" stroke="${L}"/>
    ${[-30, -14, 2, 18, 32].map((dx) => `<path d="M${dx} -4 L${dx + 4} -60" stroke="#D97706" stroke-width="1.2" opacity="0.7"/>`).join('')}<path d="M0 -88 V-104" stroke="#78350F" stroke-width="3"/></g>
  <g transform="translate(1530 ${FLOOR - 4})"><path d="M-30 0 V-40 L0 -62 L30 -40 V0Z" fill="#F87171" stroke="${L}"/><path d="M-12 0 V-22 Q0 -34 12 -22 V0Z" fill="#7F1D1D"/></g>
  <!-- mặt đất -->
  <rect x="0" y="${FLOOR - 22}" width="${W}" height="22" fill="#86EFAC"/>
  <rect x="0" y="${FLOOR - 6}" width="${W}" height="${321 - FLOOR}" fill="#E7C9A0" stroke="${L}"/>
  ${Array.from({ length: 30 }, (_, i) => `<ellipse cx="${24 + i * 57}" cy="${FLOOR + 8 + (i % 3) * 7}" rx="5" ry="2.2" fill="#D1AE7E"/>`).join('')}
  <!-- vầng sáng (sau nhân vật) -->
  ${glow('gdad', X.dad, 160)}${glow('gmum', X.mum, 160)}${glow('glan', X.lan, 140)}
  ${glow('ggpa', X.gpa, 176)}${glow('ggma', X.gma, 152)}
  ${glow('gcous', X.hai, 112)}${glow('gcous', X.mai, 112)}
  ${glow('glucky', X.lucky, 90)}${glow('gkitty', X.kitty, 80)}${glow('gme', 1270, 136)}`;
}

function fg() {
  const row = (who, y, s) => who.map((w, i) => `<g transform="translate(${(i - (who.length - 1) / 2) * 46} ${y})">${headOnly(w, { s })}</g>`).join('');
  return `
  ${pop('family', 216, 92, `${label(0, 0, 'my family', '#DB2777', 22)}`)}
  ${pop('dad', X.dad, 102, label(0, 0, 'dad', '#2563EB', 22))}
  ${pop('doctor', X.dad, 102, label(0, 0, 'doctor', '#0E7490', 20))}
  ${pop('mum', X.mum, 102, label(0, 0, 'mum', '#DB2777', 22))}
  ${pop('teacher', X.mum, 102, label(0, 0, 'teacher', '#1D4ED8', 20))}
  ${pop('lan', X.lan, 118, label(0, 0, 'Lan', '#DB2777', 22))}
  ${pop('eleven', X.lan + 4, 90, balloon('11', '#EC4899'))}
  ${pop('gp', 696, 76, label(0, 0, 'grandparents', '#7C3AED', 20))}
  ${pop('nd', 466, 100, card(118, 104, `<g transform="translate(-26 4) scale(0.95)">${VN_MAP}</g>
    <circle cx="-26" cy="-34" r="4" fill="#64748B" stroke="#fff"/><circle class="e002-ring" cx="-16" cy="-24" r="8" fill="none" stroke="#DC2626" stroke-width="2.6"/><circle cx="-16" cy="-24" r="4.4" fill="#DC2626" stroke="#fff" stroke-width="1.2"/>
    ${txt(26, -16, 'Nam', 17, '#B91C1C')}${txt(26, 4, 'Dinh', 17, '#B91C1C')}`))}
  ${pop('nd', 540, 151, `<rect class="e002-ring" x="-56" y="-21" width="112" height="38" rx="8" fill="none" stroke="#F97316" stroke-width="3.4" stroke-dasharray="8 5"/>`)}
  ${pop('gpa', X.gpa, 82, label(0, 0, 'Grandpa', '#2563EB', 20))}
  ${pop('tall', 0, 0, `<path d="M${X.gpa - 30} 104 H${X.gma + 34} M${X.gma - 30} 134 H${X.gma + 34}" stroke="#F97316" stroke-width="2.6" stroke-dasharray="6 4"/>
    <path d="M${X.gma + 44} 134 V106" stroke="#F97316" stroke-width="3"/><path d="M${X.gma + 38} 112 l6 -8 l6 8" stroke="#F97316" stroke-width="3" fill="none"/><path d="M${X.gma + 38} 134 H${X.gma + 50}" stroke="#F97316" stroke-width="3"/>`)}
  ${pop('tall', X.gpa, 82, label(0, 0, 'tall', '#EA580C', 22))}
  ${pop('gma', X.gma, 104, label(0, 0, 'Grandma', '#DB2777', 20))}
  ${pop('kind', X.gma - 70, 96, label(0, 0, 'kind', '#DB2777', 20))}
  ${pop('funny', X.gma + 26, 96, label(0, 0, 'funny', '#EA580C', 20))}
  ${pop('cousins', X.hai, 126, label(0, 0, 'Hai', '#2563EB', 20))}${pop('cousins', X.mai, 126, label(0, 0, 'Mai', '#DB2777', 20))}
  ${pop('six', X.hai, 108, balloon('6', '#3B82F6'))}${pop('six', X.mai + 2, 108, balloon('6', '#F59E0B'))}
  ${pop('pets', 1404, 128, label(0, 0, 'my pets', '#16A34A', 22))}
  ${pop('lucky', X.lucky + 10, 156, label(0, 0, 'Lucky', '#B45309', 22))}
  ${pop('dog', X.lucky + 10, 156, label(0, 0, 'dog', '#B45309', 22))}
  ${pop('kitty', X.kitty + 4, 172, label(0, 0, 'Kitty', '#7C3AED', 22))}
  ${pop('cat', X.kitty + 4, 172, label(0, 0, 'cat', '#7C3AED', 22))}
  ${pop('me', 1270, 116, label(0, 0, 'me', '#EA580C', 24))}
  ${pop('minh', 1270, 116, label(0, 0, 'Minh', '#1D4ED8', 22))}
  ${pop('eight', 1196, 100, balloon('8', '#3B82F6'))}
  ${pop('big', 1404, 98, card(224, 120, `${txt(0, -40, 'big, happy family', 17, '#DB2777')}
    <rect x="-104" y="-32" width="208" height="84" rx="6" fill="#FEF3C7"/>${row(['en_grandpa', 'en_grandma', 'en_dad', 'en_mum', 'en_lan_home'], -4, 0.78)}${row(['en_minh_home', 'e002_hai', 'e002_mai'], 32, 0.72)}`))}
  ${pop('love', 1236, 96, `<g class="e002-beat">${BIGHEART}</g>`)}`;
}

const CSS = `
.e002-pop { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .5s cubic-bezier(.3,1.6,.5,1); }
${POPS.map((n) => `.st-t-${n} .e002-p-${n}`).join(', ')} { opacity: 1; transform: none; }
.e002-ring { transform-box: fill-box; transform-origin: center; animation: e002Pulse .7s ease-in-out infinite alternate; }
@keyframes e002Pulse { from { transform: scale(.94); } to { transform: scale(1.08); } }
.e002-beat { animation: e002Beat .6s ease-in-out infinite alternate; }
@keyframes e002Beat { from { transform: scale(.9); } to { transform: scale(1.12); } }
@media (prefers-reduced-motion: reduce) { .e002-ring, .e002-beat { animation-duration: 1.6s; } }
`;

function tag(st, ...names) {
  for (const k of [...st.state]) if (k.startsWith('st-t-')) st.set(k, false);
  names.forEach((n) => st.set(`st-t-${n}`));
}
const rest = (st, ...ids) => ids.forEach((id) => { st.act(id, null); st.pose(id, 'stand'); st.mood(id, 'happy'); });
/** Người được nhắc vẫy tay, vui. */
async function greet(st, id, ms = 1500) {
  st.pose(id, 'wave'); st.act(id, 'wave'); st.mood(id, 'joy');
  await st.wait(ms);
  rest(st, id);
}

const BEATS = [
  { key: ['This is my family'], icon: '👨‍👩‍👧‍👦', label: 'my family', async play(st) {
    tag(st, 'family');
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    ['dad', 'mum', 'lan'].forEach((id) => { st.pose(id, 'wave'); st.act(id, 'wave'); st.mood(id, 'joy'); });
    st.fx('hearts', 260, 130);
    await st.wait(1800);
    rest(st, 'minh', 'dad', 'mum', 'lan');
  } },
  { key: ['This is my dad'], icon: '👨', label: 'dad', async play(st) {
    tag(st, 'dad', 'gdad');
    st.pose('minh', 'point'); st.act('minh', 'point');
    await greet(st, 'dad', 1500);
    rest(st, 'minh');
  } },
  { key: ['doctor'], icon: '🩺', label: 'doctor', async play(st) {
    tag(st, 'doctor', 'gdad');
    st.fx('poof', X.dad, 180);
    await st.wait(200);
    st.chest('dad', STETH); st.pose('dad', 'reach'); st.mood('dad', 'joy');
    st.fx('sparkle', X.dad, 170);
    await st.wait(1300);
    rest(st, 'dad');
  } },
  { key: ['This is my mum'], icon: '👩', label: 'mum', async play(st) {
    tag(st, 'mum', 'gmum');
    st.pose('minh', 'point'); st.act('minh', 'point');
    await greet(st, 'mum', 1500);
    rest(st, 'minh');
  } },
  { key: ['teacher'], icon: '👩‍🏫', label: 'teacher', async play(st) {
    tag(st, 'teacher', 'gmum');
    st.hold('mum', 'e002_slate'); st.pose('mum', 'give'); st.mood('mum', 'joy');
    st.fx('sparkle', X.mum + 40, 170);
    await st.wait(1700);
    st.hold('mum', null); rest(st, 'mum');
  } },
  { key: ['This is my sister, Lan'], icon: '👧', label: 'sister', async play(st) {
    tag(st, 'lan', 'glan');
    st.look(216, { dur: 500 });
    st.pose('minh', 'point'); st.act('minh', 'point');
    await greet(st, 'lan', 1800);
    rest(st, 'minh');
  } },
  { key: ['eleven'], icon: '🎈', label: 'eleven', async play(st) {
    tag(st, 'eleven', 'glan');
    st.pose('lan', 'pointUp'); st.mood('lan', 'joy');
    st.fx('sparkle', X.lan, 90);
    await st.wait(1700);
    rest(st, 'lan');
  } },
  { key: ['These are my grandparents'], icon: '👴', label: 'grandparents', async play(st) {
    tag(st);
    ['dad', 'mum', 'lan'].forEach((id) => st.pose(id, 'stand'));
    await st.walk('minh', 548, { speed: 225, lead: 120 });
    tag(st, 'gp', 'ggpa', 'ggma');
    ['gpa', 'gma'].forEach((id) => { st.pose(id, 'wave'); st.act(id, 'wave'); st.mood(id, 'joy'); });
    st.fx('hearts', 696, 130);
    await st.wait(900);
    rest(st, 'gpa', 'gma');
  } },
  { key: ['in Nam Dinh'], icon: '📍', label: 'Nam Dinh', async play(st) {
    tag(st, 'nd');
    await st.look(560, { dur: 600 });
    st.pose('minh', 'pointUp');
    st.fx('sparkle', 540, 150);
    await st.wait(1500);
    rest(st, 'minh');
  } },
  { key: ['This is Grandpa'], icon: '👴', label: 'Grandpa', async play(st) {
    tag(st, 'gpa', 'ggpa');
    await st.look(660, { dur: 500 });
    st.pose('minh', 'point'); st.act('minh', 'point');
    await greet(st, 'gpa', 1500);
    rest(st, 'minh');
  } },
  { key: ['He is tall'], icon: '📏', label: 'tall', async play(st) {
    tag(st, 'tall', 'ggpa');
    st.pose('gpa', 'pointUp'); st.mood('gpa', 'joy');
    st.pose('minh', 'pointUp'); st.mood('minh', 'wow');
    await st.wait(1800);
    rest(st, 'gpa', 'minh');
  } },
  { key: ['This is Grandma'], icon: '👵', label: 'Grandma', async play(st) {
    tag(st, 'gma', 'ggma');
    st.pose('minh', 'point'); st.act('minh', 'point');
    await greet(st, 'gma', 1500);
    rest(st, 'minh');
  } },
  { key: ['kind and funny'], icon: '😄', label: 'kind, funny', async play(st) {
    tag(st, 'kind', 'ggma');
    st.pose('gma', 'give');
    await st.fly(`<g transform="scale(1.4)">${BANANA}</g>`, [X.gma - 20, 190], [566, 196], { size: 34, dur: 650 });
    st.pose('gma', 'stand');
    st.hold('minh', 'e002_banana'); st.pose('minh', 'give'); st.mood('minh', 'joy');
    st.fx('hearts', 600, 150);
    await st.wait(700);
    tag(st, 'kind', 'funny', 'ggma');
    st.hold('minh', null);
    st.pose('gma', 'cheer'); st.act('gma', 'dance'); st.mood('gma', 'joy');
    st.pose('minh', 'clap'); st.act('minh', 'clap');
    await st.wait(1500);
    rest(st, 'gma', 'minh');
  } },
  { key: ['These are my cousins, Hai and Mai'], icon: '👫', label: 'cousins', async play(st) {
    tag(st);
    await st.walk('minh', 920, { speed: 200, lead: 110 });
    tag(st, 'cousins', 'gcous');
    ['hai', 'mai'].forEach((id) => { st.act(id, null); st.pose(id, 'wave'); st.act(id, 'wave'); st.mood(id, 'joy'); });
    st.pose('minh', 'point');
    await st.wait(1600);
    rest(st, 'hai', 'mai', 'minh');
  } },
  { key: ['They are six'], icon: '🎈', label: 'six', async play(st) {
    tag(st, 'six', 'gcous');
    ['hai', 'mai'].forEach((id) => { st.pose(id, 'cheer'); st.act(id, 'hop'); st.mood(id, 'joy'); });
    st.fx('sparkle', X.hai + 40, 108);
    await st.wait(1700);
    rest(st, 'hai', 'mai');
  } },
  { key: ['These are my pets'], icon: '🐾', label: 'pets', async play(st) {
    tag(st);
    await st.walk('minh', 1270, { speed: 215, lead: 120 });
    tag(st, 'pets', 'glucky', 'gkitty');
    st.pose('minh', 'open'); st.mood('minh', 'joy');
    st.act('lucky', 'wag'); st.act('kitty', 'wag');
    st.fx('hearts', 1404, 170);
    await st.wait(1300);
    rest(st, 'minh'); st.act('lucky', null); st.act('kitty', null);
  } },
  { key: ['This is Lucky'], icon: '🐶', label: 'Lucky', async play(st) {
    tag(st, 'lucky', 'glucky');
    st.pose('minh', 'point'); st.act('minh', 'point');
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.mood('lucky', 'joy');
    st.sfx('dog-bark');
    await st.wait(1500);
    st.act('lucky', null); rest(st, 'minh');
  } },
  { key: ['He is a dog'], icon: '🐕', label: 'dog', async play(st) {
    tag(st, 'dog', 'glucky');
    st.act('lucky', 'wag'); st.mood('lucky', 'joy');
    st.say('lucky', 'Woof!', 1300); st.sfx('dog-bark', { vol: 0.8, rate: 1.1 });
    await st.wait(1600);
    st.act('lucky', null);
  } },
  { key: ['This is Kitty'], icon: '🐱', label: 'Kitty', async play(st) {
    tag(st, 'kitty', 'gkitty');
    st.pose('minh', 'point'); st.act('minh', 'point');
    st.dog('kitty', 'stand'); st.act('kitty', 'jump'); st.mood('kitty', 'joy');
    await st.wait(1500);
    st.act('kitty', null); st.dog('kitty', 'sit'); rest(st, 'minh');
  } },
  { key: ['She is a cat'], icon: '🐈', label: 'cat', async play(st) {
    tag(st, 'cat', 'gkitty');
    st.act('kitty', 'wag'); st.mood('kitty', 'joy');
    await st.say('kitty', 'Meow!', 1500);
    st.act('kitty', null);
  } },
  { key: ['this is me'], icon: '🙋', label: 'me', async play(st) {
    tag(st, 'me', 'gme');
    st.pose('minh', 'me'); st.mood('minh', 'joy');
    st.fx('sparkle', 1270, 150);
    await st.wait(1500);
    st.pose('minh', 'stand');
  } },
  { key: ['I am Minh'], icon: '👦', label: 'Minh', async play(st) {
    tag(st, 'minh', 'gme');
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    await st.wait(1500);
    rest(st, 'minh');
  } },
  { key: ['I am eight'], icon: '🎈', label: 'eight', async play(st) {
    tag(st, 'eight');
    st.pose('minh', 'pointUp'); st.mood('minh', 'joy');
    st.fx('sparkle', 1196, 100);
    await st.wait(1600);
    rest(st, 'minh');
  } },
  { key: ['big, happy family'], icon: '👨‍👩‍👧‍👦', label: 'big family', async play(st) {
    tag(st, 'big');
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    st.dog('lucky', 'stand'); st.act('lucky', 'jump'); st.act('kitty', 'wag');
    st.fx('sparkle', 1404, 60);
    await st.wait(700);
    st.fx('hearts', 1404, 110);
    await st.wait(1500);
    rest(st, 'minh'); st.act('lucky', null); st.act('kitty', null);
  } },
  { key: ['I love my family!'], icon: '❤️', label: 'love', async play(st) {
    tag(st, 'love', 'big');
    st.pose('minh', 'clap'); st.mood('minh', 'joy');
    st.fx('hearts', 1270, 120);
    await st.wait(700);
    st.fx('hearts', 1236, 90);
    await st.wait(1300);
    rest(st, 'minh');
  } },
];

export default {
  id: 'en002', worldW: W, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  cast: [
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: X.dad, s: 0.95 },
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: X.mum, s: 0.95 },
    { id: 'gpa', kind: 'adult', who: 'en_grandpa', x: X.gpa, s: 1.04 },
    { id: 'gma', kind: 'adult', who: 'en_grandma', x: X.gma, s: 0.88 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.lan, s: 1.08 },
    { id: 'hai', kind: 'kid', who: 'e002_hai', x: X.hai, s: 0.84 },
    { id: 'mai', kind: 'kid', who: 'e002_mai', x: X.mai, s: 0.84 },
    { id: 'lucky', kind: 'dog', x: X.lucky, s: 0.95 },
    { id: 'kitty', kind: 'cat', x: X.kitty, s: 1, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.minh },
  ],
  props: {
    e002_slate: `<g transform="rotate(90) translate(4 -14)"><rect x="-18" y="-13" width="36" height="26" rx="2" fill="#A16207" stroke="${L}"/><rect x="-15" y="-10" width="30" height="20" fill="#166534"/><text x="0" y="4" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#fff">ABC</text></g>`,
    e002_banana: `<g transform="translate(0 -4) rotate(-20) scale(0.8)">${BANANA}</g>`,
  },
  init(st) {
    st.look(216, { instant: true });
    st.dog('lucky', 'sit'); st.dog('kitty', 'sit');
  },
};
