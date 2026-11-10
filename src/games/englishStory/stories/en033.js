/**
 * Bài 33 "Sports Day": cổng trường (bố mẹ đứng xem) → bàn phát số của cô Hoa → đường chạy (vạch xuất phát, dây đích,
 * bục huy chương, chỗ bố mẹ cổ vũ) → bãi ăn trưa → sân ném bóng (mẹ ôm hai anh em).
 * Đại từ tân ngữ của bài (them / him / her) hiện thành nhãn nhỏ chỉ đúng người được nói tới.
 * Hai làn chạy: làn sau y = sàn, làn trước y = sàn + 12 (Tom và bạn gái số 4 chạy làn trước).
 * Toạ độ cảnh: rộng 2100, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, sun, label } from '../kit.js';

const FLOOR = 282;
const FRONT = FLOOR + 12;
const START = 770, FIN = 1170;
const F = 'font-family="Nunito, sans-serif" font-weight="900"';

Object.assign(CAST, {
  e033_girl: { hair: 'pigtails', top: 'tee', shirt: '#FDE047', bottom: 'shorts', bottomC: '#1E3A8A', shoe: '#F472B6' },
});

// ── Đồ vật ────────────────────────────────────────────────────────────────
const bib = (n, c = '#fff') => `<g transform="translate(0 -6)"><rect x="-9" y="-9" width="18" height="16" rx="2" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  <circle cx="-6" cy="-6" r="1" fill="${L}"/><circle cx="6" cy="-6" r="1" fill="${L}"/><text class="e033-num" x="0" y="5" text-anchor="middle" ${F} font-size="12" fill="#DC2626">${n}</text></g>`;
const MEDAL = `<path d="M-6 -24 L0 -6 L6 -24" stroke="#2563EB" stroke-width="3" fill="none"/><circle cy="0" r="7" fill="#FACC15" stroke="#B45309" stroke-width="1.2"/><path d="M0 -4 l1.2 2.6 h2.8 l-2.2 1.7 l0.8 2.7 l-2.6 -1.6 l-2.6 1.6 l0.8 -2.7 l-2.2 -1.7 h2.8Z" fill="#FEF08A"/>`;
const withMedal = (n) => `${bib(n)}<g transform="translate(0 4)">${MEDAL}</g>`;
const BALL_SVG = `<circle r="8" fill="#F97316" stroke="${L}"/><path d="M-8 0 H8 M0 -8 Q-5 0 0 8 M0 -8 Q5 0 0 8" stroke="${L}" stroke-width="0.8" fill="none"/>`;
const tag = (cls, x, y, text, c = '#7C3AED') => `<g class="e033-pop ${cls}">${label(x, y, text, c, 14)}<path d="M${x - 4} ${y + 5} l4 8 l4 -8" fill="#fff" stroke="${L}"/></g>`;
const flagLine = (x1, x2, y) => `<path d="M${x1} ${y} Q${(x1 + x2) / 2} ${y + 18} ${x2} ${y}" stroke="${L}" stroke-width="1" fill="none"/>
  <g class="e033-bunt">${Array.from({ length: Math.floor((x2 - x1) / 22) }, (_, i) => { const x = x1 + 11 + i * 22, t = (x - x1) / (x2 - x1), yy = y + 18 * 4 * t * (1 - t) * 0.5 * 2; return `<path d="M${x - 7} ${yy} L${x + 7} ${yy} L${x} ${yy + 13}Z" fill="${['#EF4444', '#FACC15', '#22C55E', '#3B82F6', '#EC4899'][i % 5]}" stroke="${L}" stroke-width="0.6"/>`; }).join('')}</g>`;

function bg() {
  const W = 2100;
  return `
  ${sky(0, W, 315, 'e033sky')}
  ${cloud(200, 48, 0.9, 0)}${cloud(760, 60, 1, 3)}${cloud(1300, 44, 0.8, 2)}${cloud(1850, 56, 0.9, 4)}
  <g transform="translate(1000 66)">${sun(24)}</g>
  <!-- Trường phía sau -->
  <path d="M0 230 Q300 206 600 226 T1200 220 T2100 226 V282 H0Z" fill="#BBF7D0" stroke="${L}" stroke-width="0.8"/>
  <g transform="translate(420 0)"><rect x="-150" y="120" width="300" height="104" fill="#FDE68A" stroke="${L}" stroke-width="1.2"/><path d="M-160 120 L0 86 L160 120Z" fill="#EF4444" stroke="${L}" stroke-width="1.2"/>
    ${[-110, -60, 60, 110].map((dx) => `<rect x="${dx - 14}" y="140" width="28" height="26" fill="#BAE6FD" stroke="${L}"/>`).join('')}${label(0, 112, 'SCHOOL', '#1D4ED8', 12)}</g>
  ${tree(1500, 232, 1.1)}${tree(2020, 228, 0.9)}${tree(60, 232, 0.8)}
  <rect x="0" y="${FLOOR - 16}" width="${W}" height="${331 - FLOOR}" fill="#4ADE80" stroke="${L}"/>
  ${Array.from({ length: 44 }, (_, i) => `<path d="M${20 + i * 48} ${FLOOR + 22} l3 -7 l3 7" stroke="#16A34A" stroke-width="1.4" fill="none"/>`).join('')}
  <!-- Cổng trường + băng rôn -->
  ${[96, 214].map((x) => `<rect x="${x - 10}" y="76" width="20" height="${FLOOR - 76}" fill="#94A3B8" stroke="${L}"/><rect x="${x - 13}" y="68" width="26" height="12" rx="3" fill="#64748B" stroke="${L}"/>`).join('')}
  <rect x="80" y="86" width="150" height="28" rx="6" fill="#2563EB" stroke="${L}"/><text x="155" y="106" text-anchor="middle" ${F} font-size="15" fill="#FACC15">SPORTS DAY</text>
  <g class="e033-glow"><rect x="74" y="80" width="162" height="40" rx="9" fill="none" stroke="#FACC15" stroke-width="4"/></g>
  ${flagLine(230, 680, 60)}${flagLine(1180, 1640, 60)}
  <g class="e033-pop e033-lb-gate">${label(155, 140, 'gate', '#475569', 13)}</g>
  <!-- Đường chạy -->
  <rect x="680" y="${FLOOR - 16}" width="640" height="${331 - FLOOR}" fill="#E57A5A" stroke="${L}"/>
  <path d="M680 ${FLOOR + 4} H1320 M680 ${FLOOR + 22} H1320" stroke="#fff" stroke-width="2"/>
  <path d="M${START} ${FLOOR - 16} V315" stroke="#fff" stroke-width="4"/>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="${FIN - 4}" y="${FLOOR - 16 + i * 8}" width="4" height="8" fill="${i % 2 ? '#fff' : '#1F2937'}"/><rect x="${FIN}" y="${FLOOR - 16 + i * 8}" width="4" height="8" fill="${i % 2 ? '#1F2937' : '#fff'}"/>`).join('')}
  ${label(1000, 150, 'RACE', '#DC2626', 14)}
  <!-- Bục huy chương -->
  <g transform="translate(1250 0)"><rect x="-14" y="236" width="28" height="46" fill="#FACC15" stroke="${L}"/><text x="0" y="262" text-anchor="middle" ${F} font-size="14" fill="${L}">1</text>
    <rect x="-38" y="250" width="24" height="32" fill="#E2E8F0" stroke="${L}"/><text x="-26" y="272" text-anchor="middle" ${F} font-size="12" fill="${L}">2</text>
    <rect x="14" y="258" width="24" height="24" fill="#FDBA74" stroke="${L}"/><text x="26" y="276" text-anchor="middle" ${F} font-size="12" fill="${L}">3</text>
    <g class="e033-standmedal" transform="translate(0 226)">${MEDAL}</g></g>
  <!-- Bãi ăn trưa -->
  <path d="M1420 282 L1440 262 H1580 L1600 282Z" fill="#FCA5A5" stroke="${L}"/><path d="M1460 262 L1450 282 M1500 262 V282 M1540 262 L1550 282" stroke="#fff" stroke-width="3"/>
  ${[1470, 1530].map((x, i) => `<g transform="translate(${x} 268)"><rect x="-12" y="-8" width="24" height="12" rx="3" fill="${i ? '#60A5FA' : '#F472B6'}" stroke="${L}"/><path d="M-12 -3 H12" stroke="${L}" stroke-width="0.7"/></g>`).join('')}
  <g class="e033-pop e033-lb-lunch">${label(1510, 168, 'after lunch', '#B45309', 14)}</g>
  <!-- Tên / đại từ chỉ người -->
  ${tag('e033-t-them1', 165, 106, 'them')}${tag('e033-t-him1', 482, 126, 'him')}${tag('e033-t-him2', 1216, 140, 'him')}
  ${tag('e033-t-her1', 1198, 126, 'her')}${tag('e033-t-tom', 1940, 136, 'Tom', '#16A34A')}${tag('e033-t-them2', 1800, 120, 'them')}
  <g class="e033-shout">${[-1, 1].map((s) => `<path d="M${1940 + s * 26} 150 l${s * 10} -6 M${1940 + s * 28} 162 l${s * 12} 0 M${1940 + s * 26} 174 l${s * 10} 6" stroke="#DC2626" stroke-width="2.6" stroke-linecap="round"/>`).join('')}</g>`;
}

/** Lớp trước: bàn phát số, cột đích + dây, bụi cỏ. */
function fg() {
  return `
  <rect x="512" y="236" width="8" height="46" fill="#78716C" stroke="${L}"/><rect x="590" y="236" width="8" height="46" fill="#78716C" stroke="${L}"/>
  <rect x="500" y="228" width="110" height="10" rx="3" fill="#60A5FA" stroke="${L}" stroke-width="1.2"/>
  <g transform="translate(530 226)">${bib(5)}</g><g transform="translate(556 224)">${bib(3)}</g><g class="e033-bib8" transform="translate(582 226)">${bib(8)}</g>
  <!-- Cột đích + dây -->
  <path d="M${FIN - 10} ${FLOOR} V188 M${FIN + 10} ${FRONT} V200" stroke="${L}" stroke-width="5" stroke-linecap="round"/><path d="M${FIN - 10} ${FLOOR} V188 M${FIN + 10} ${FRONT} V200" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  <g class="e033-tape"><path d="M${FIN - 10} 196 L${FIN + 10} 208" stroke="#DC2626" stroke-width="3.4"/></g>
  <g class="e033-tapeb"><path d="M${FIN - 10} 196 q2 14 -2 26 M${FIN + 10} 208 q-2 12 2 24" stroke="#DC2626" stroke-width="3" fill="none"/></g>
  ${bush(30, FLOOR + 40, 1)}${bush(2080, FLOOR + 40, 1.1, '#4ADE80')}`;
}

const CSS = `
.e033-pop { opacity: 0; transform: scale(.6); transform-box: fill-box; transform-origin: center; transition: opacity .35s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-t-them1 .e033-t-them1, .st-t-him1 .e033-t-him1, .st-t-him2 .e033-t-him2, .st-t-her1 .e033-t-her1, .st-t-tom .e033-t-tom, .st-t-them2 .e033-t-them2,
.st-lb-gate .e033-lb-gate, .st-lb-lunch .e033-lb-lunch { opacity: 1; transform: none; }
.e033-glow { opacity: 0; transition: opacity .4s; } .st-day .e033-glow { opacity: 1; animation: e033Pulse .5s ease-in-out infinite alternate; }
@keyframes e033Pulse { from { opacity: .35; } to { opacity: 1; } }
.e033-bunt { animation: e033Bunt 1.6s ease-in-out infinite alternate; }
@keyframes e033Bunt { to { transform: translateY(2px); } }
.st-day .e033-bunt { animation-duration: .4s; }
/* số trên áo không bị lật khi nhân vật quay trái */
.es-ac.is-left .e033-num { transform: scaleX(-1); transform-box: fill-box; transform-origin: center; }
.e033-bib8 { transition: opacity .2s; } .st-bib .e033-bib8 { opacity: 0; }
.e033-tapeb { opacity: 0; } .st-tape .e033-tape { opacity: 0; } .st-tape .e033-tapeb { opacity: 1; }
.e033-standmedal { transition: opacity .2s; } .st-medal .e033-standmedal { opacity: 0; }
.e033-shout { opacity: 0; } .st-shout .e033-shout { opacity: 1; animation: e033Pulse .2s ease-in-out infinite alternate; }
@media (prefers-reduced-motion: reduce) { .e033-bunt { animation-duration: 4s; } }
`;

const POSES = {
  e033_ready: { R: [30, 70], L: [-20, -60], head: 4 },
  e033_catch: { R: [80, 100], L: [80, 100] },
  e033_hug: { R: [70, 40], L: [70, 40], head: 6 },
  e033_flag: { R: [160, 178], L: [10, 4] },
};
const PROPS = {
  e033_flag: `<g transform="rotate(180)"><path d="M0 -2 V30" stroke="${L}" stroke-width="1.8"/><path d="M0 30 L18 24 L0 18Z" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>`,
  e033_camera: `<g transform="translate(0 -4)"><rect x="-9" y="-7" width="18" height="13" rx="2.4" fill="#1F2937" stroke="${L}" stroke-width="0.7"/><circle cx="1" cy="-0.5" r="4.4" fill="#475569" stroke="#E2E8F0" stroke-width="1"/><circle cx="1" cy="-0.5" r="2" fill="#38BDF8"/></g>`,
  e033_ball: `<g transform="translate(0 -4)">${BALL_SVG}</g>`,
};

const face = (st, id, dir) => { const A = st.a(id); A.face = dir; A.el.classList.toggle('is-left', dir < 0); };
const TAGS = ['st-t-them1', 'st-t-him1', 'st-t-him2', 'st-t-her1', 'st-t-tom', 'st-t-them2'];
const tagOn = (st, t) => TAGS.forEach((k) => st.set(k, k === t));

const BEATS = [
  { key: ['Sports Day'], icon: '🏅', label: 'Sports Day', async play(st) {
    st.look(300);
    st.set('st-day'); st.sfx('sparkle');
    st.fx('sparkle', 155, 96);
    st.pose('minh', 'cheer'); st.act('minh', 'hop'); st.mood('minh', 'joy');
    await st.wait(2000);
    st.act('minh', null); st.pose('minh', 'stand'); st.mood('minh', 'happy');
    st.set('st-day', false);
  } },
  { key: ['see them', 'near the gate'], icon: '👀', label: 'near the gate', async play(st) {
    st.look(300);
    face(st, 'minh', -1);
    st.pose('minh', 'point'); st.mood('minh', 'wow');
    st.set('st-lb-gate');
    await st.wait(1200);
    st.mood('minh', 'joy');
    await st.wait(900);
    st.set('st-lb-gate', false);
  } },
  { key: ['waves to them'], icon: '👋', label: 'waves to them', async play(st) {
    st.look(300);
    st.pose('minh', 'wave'); st.act('minh', 'wave'); st.mood('minh', 'joy');
    tagOn(st, 'st-t-them1');
    await st.wait(700);
    st.pose('mum', 'wave'); st.act('mum', 'wave'); st.pose('dad', 'wave'); st.act('dad', 'wave'); st.mood('mum', 'joy'); st.mood('dad', 'joy');
    await st.wait(1300);
    ['minh', 'mum', 'dad'].forEach((k) => { st.act(k, null); st.pose(k, 'stand'); });
    tagOn(st, null);
  } },
  { key: ['number eight'], icon: '8️⃣', label: 'number eight', async play(st) {
    await st.walk('minh', 482, { speed: 120, lead: 40 });
    st.pose('hoa', 'give'); st.mood('hoa', 'joy');
    st.set('st-bib');
    await st.fly(`<g transform="scale(1.6)">${bib(8)}</g>`, [580, 214], [482, 200], { size: 34, dur: 600 });
    st.chest('minh', bib(8)); st.mood('minh', 'joy'); st.sfx('pop');
    st.fx('sparkle', 482, 186);
    st.pose('hoa', 'stand');
    await st.wait(800);
    st.mood('minh', 'happy');
  } },
  { key: ['Good luck'], icon: '🍀', label: 'Good luck!', async play(st) {
    st.look(500);
    face(st, 'hoa', -1);
    st.pose('hoa', 'pointUp'); st.mood('hoa', 'joy');
    await st.say('hoa', 'Good luck!', 1700);
  } },
  { key: ['tells him'], icon: '🗣️', label: 'she tells him', async play(st) {
    st.look(500);
    st.pose('hoa', 'point'); st.talk('hoa', true);
    tagOn(st, 'st-t-him1');
    st.act('minh', 'nod');
    await st.wait(1600);
    st.talk('hoa', false); st.act('minh', null); st.pose('hoa', 'stand');
    tagOn(st, null);
  } },
  { key: ['running race'], icon: '🏃', label: 'running race', async play(st) {
    st.look(720);
    face(st, 'hoa', 1);
    st.mood('hoa', 'happy');
    await Promise.all([
      st.walk('minh', START - 14, { speed: 140, follow: false }),
      st.walk('tom', START + 10, { speed: 140, follow: false }),
      st.walk('mum', 1400, { speed: 300, follow: false }),
      st.walk('dad', 1450, { speed: 300, follow: false }),
    ]);
    st.hold('hoa', 'e033_flag'); st.pose('hoa', 'e033_flag');
    st.pose('minh', 'e033_ready'); st.pose('tom', 'e033_ready');
    face(st, 'mum', -1); face(st, 'dad', -1);
    await st.wait(700);
  } },
  { key: ['very fast'], icon: '⚡', label: 'very fast', async play(st) {
    st.sfx('whistle'); st.act('hoa', 'wave');
    st.fx('poof', START, 270, { quiet: true });
    st.mood('tom', 'joy');
    await Promise.all([
      st.walk('tom', 1000, { speed: 330, lead: 60 }),
      st.walk('minh', 880, { speed: 210, follow: false }),
    ]);
    st.act('hoa', null);
  } },
  { key: ['runs next to him', 'Tom wins'], icon: '🏁', label: 'Tom wins', async play(st) {
    st.look(1060, { dur: 600 });
    await Promise.all([
      (async () => { await st.walk('tom', 1216, { speed: 230, follow: false }); st.set('st-tape'); st.sfx('pop'); })(),
      st.walk('minh', 1194, { speed: 320, follow: false }),
    ]);
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    st.fx('sparkle', 1216, 160);
    await st.wait(1000);
    st.act('tom', null);
  } },
  { key: ['claps for him'], icon: '👏', label: 'claps for him', async play(st) {
    st.look(1150);
    face(st, 'minh', 1);
    st.pose('minh', 'clap'); st.act('minh', 'clap'); st.mood('minh', 'joy');
    tagOn(st, 'st-t-him2');
    await st.wait(1800);
    st.act('minh', null); st.pose('minh', 'stand'); st.pose('tom', 'stand');
    tagOn(st, null);
  } },
  { key: ['Lan runs'], icon: '🏃‍♀️', label: 'Lan runs', async play(st) {
    st.set('st-tape', false);
    st.look(840, { dur: 500 });
    await Promise.all([
      st.walk('minh', 1272, { speed: 200, follow: false }),
      st.walk('tom', 1306, { speed: 200, follow: false }),
    ]);
    face(st, 'minh', -1); face(st, 'tom', -1);
    st.sfx('whistle'); st.act('hoa', 'wave');
    await Promise.all([
      (async () => { await st.walk('lan', 1198, { speed: 300, lead: 0 }); st.set('st-tape'); })(),
      st.walk('girl', 1120, { speed: 250, follow: false }),
    ]);
    st.act('hoa', null);
  } },
  { key: ['cheer for her', 'gold medal'], icon: '🥇', label: 'gold medal', async play(st) {
    st.look(1220);
    tagOn(st, 'st-t-her1');
    st.pose('minh', 'cheer'); st.act('minh', 'jump'); st.mood('minh', 'joy');
    st.pose('tom', 'cheer'); st.act('tom', 'jump'); st.mood('tom', 'joy');
    await st.wait(700);
    st.set('st-medal');
    await st.fly(`<g transform="scale(1.4)">${MEDAL}</g>`, [1250, 226], [1198, 196], { size: 40, dur: 600 });
    st.chest('lan', withMedal(3)); st.pose('lan', 'cheer'); st.mood('lan', 'joy'); st.sfx('sparkle');
    st.fx('sparkle', 1198, 170);
    await st.wait(900);
    st.act('minh', null); st.act('tom', null); st.pose('minh', 'stand'); st.pose('tom', 'stand');
    tagOn(st, null);
  } },
  { key: ['takes a photo of her'], icon: '📷', label: 'a photo of her', async play(st) {
    st.look(1290);
    face(st, 'lan', 1);
    await st.walk('dad', 1360, { speed: 120, follow: false });
    st.hold('dad', 'e033_camera'); st.pose('dad', 'phone');
    tagOn(st, 'st-t-her1');
    await st.wait(600);
    st.fx('sparkle', 1350, 130); st.sfx('camera');
    await st.wait(500);
    st.fx('sparkle', 1350, 130, { quiet: true });
    await st.wait(700);
    st.hold('dad', null); st.pose('dad', 'stand'); st.mood('dad', 'joy');
    tagOn(st, null);
  } },
  { key: ['After lunch', 'throws a ball to Minh', 'catches it'], icon: '🏐', label: 'catches it', async play(st) {
    st.pose('lan', 'stand'); st.mood('dad', 'happy');
    st.set('st-lb-lunch');
    st.hold('hoa', null); st.pose('hoa', 'stand');
    await Promise.all([
      st.walk('hoa', 1690, { speed: 270, follow: false }),
      st.walk('minh', 1830, { speed: 190, lead: -60 }),
      st.walk('tom', 1950, { speed: 220, follow: false }),
    ]);
    st.set('st-lb-lunch', false);
    face(st, 'minh', -1); face(st, 'tom', -1);
    st.hold('hoa', 'e033_ball'); st.pose('hoa', 'throw');
    await st.wait(400);
    st.hold('hoa', null); st.pose('hoa', 'give'); st.pose('minh', 'e033_catch');
    await st.fly(BALL_SVG, [1700, 150], [1822, 200], { size: 20, dur: 650 });
    st.hold('minh', 'e033_ball'); st.mood('minh', 'joy'); st.sfx('bump');
    await st.wait(600);
    st.pose('hoa', 'stand');
  } },
  { key: ['Throw it to me'], icon: '🙌', label: 'Throw it to me!', async play(st) {
    st.look(1840);
    st.pose('tom', 'cheer'); st.act('tom', 'hop'); st.mood('tom', 'joy');
    await st.say('tom', 'Throw it to me!', 1800);
    st.act('tom', null);
  } },
  { key: ['shouts Tom'], icon: '📣', label: 'shouts Tom', async play(st) {
    st.look(1860);
    tagOn(st, 'st-t-tom'); st.set('st-shout');
    st.talk('tom', true); st.mood('tom', 'wow');
    await st.wait(900);
    st.talk('tom', false); st.set('st-shout', false);
    face(st, 'minh', 1);
    st.hold('minh', null); st.pose('minh', 'throw');
    await st.fly(BALL_SVG, [1830, 150], [1950, 160], { size: 20, dur: 600 });
    st.hold('tom', 'e033_ball'); st.pose('tom', 'raise'); st.mood('tom', 'joy'); st.sfx('bump');
    st.pose('minh', 'stand');
    await st.wait(500);
    tagOn(st, null);
  } },
  { key: ['Mum hugs Minh and Lan'], icon: '🤗', label: 'Mum hugs', async play(st) {
    st.look(1760);
    face(st, 'minh', -1);
    await Promise.all([
      st.walk('mum', 1795, { speed: 230, follow: false }),
      st.walk('lan', 1756, { speed: 230, follow: false }),
      st.walk('dad', 1892, { speed: 200, follow: false }),
    ]);
    face(st, 'lan', 1); face(st, 'dad', -1);
    st.pose('mum', 'e033_hug'); st.mood('mum', 'joy');
    st.pose('lan', 'e033_hug'); st.pose('minh', 'e033_hug'); st.hold('minh', null);
    st.mood('lan', 'joy'); st.mood('minh', 'joy');
    st.fx('hearts', 1795, 130);
    await st.wait(1500);
  } },
  { key: ['We love you', 'tells them'], icon: '❤️', label: 'We love you', async play(st) {
    st.look(1780);
    tagOn(st, 'st-t-them2');
    st.say('mum', 'We love you!', 1800);
    st.pose('dad', 'wave'); st.act('dad', 'wave'); st.mood('dad', 'joy');
    st.fx('hearts', 1790, 130);
    await st.wait(900);
    st.fx('hearts', 1760, 150, { quiet: true });
    await st.wait(1100);
    st.act('dad', null);
  } },
];

export default {
  id: 'en033', worldW: 2100, floor: FLOOR, viewTop: 40, camStart: 50, css: KIT_CSS + CSS, bg, fg, beats: BEATS, poses: POSES, props: PROPS,
  order: [1, 3, 8, 11, 13, 16],
  cast: [
    { id: 'mum', kind: 'adult', who: 'en_mum_home', x: 140, s: 0.95 },
    { id: 'dad', kind: 'adult', who: 'en_dad_home', x: 190, s: 0.95 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 555, s: 0.95, face: -1 },
    { id: 'lan', kind: 'kid', who: 'en_lan', x: 650, s: 1.04, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 400 },
    { id: 'girl', kind: 'kid', who: 'e033_girl', x: 690, y: FRONT, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 620, y: FRONT },
  ],
  init(st) {
    st.chest('tom', bib(5)); st.chest('lan', bib(3)); st.chest('girl', bib(4));
  },
};
