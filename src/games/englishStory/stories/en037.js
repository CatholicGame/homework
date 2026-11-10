/**
 * Bài 37 "My Best Friend" (Minh kể): sân trường (thước đo chiều cao, ghế đá) → đường về → nhà Tom (Ruby, mẹ Tom ở vườn).
 * Tả người bằng khung phóng to khuôn mặt: tóc vàng ngắn, mắt xanh to, mũi nhỏ, nụ cười tươi của Tom; tóc xoăn dài, mắt
 * xanh lá của Ruby giống mẹ; tóc đen thẳng, mắt nâu của Minh. Tom cao gầy, Minh thấp hơn: đường kẻ ngang so chiều cao.
 * Toạ độ cảnh: rộng 1600, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, flowerAt, label, schoolFront, fence } from '../kit.js';

const FLOOR = 282;
const SKIN = '#FDDCB5';
const BLOND = '#E0A33A';

Object.assign(CAST, {
  e037_ruby: { hair: 'bob', hairC: BLOND, top: 'dress', shirt: '#F9A8D4', shoe: '#F472B6' },
  e037_tmum: { adult: true, hair: 'ponytail', hairC: BLOND, top: 'blouse', shirt: '#A7F3D0', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
  e037_kid: { hair: 'pigtails', top: 'uniform', shirt: '#FFFFFF', bottom: 'skirt', bottomC: '#1E3A6E', shoe: '#F472B6', bag: '#A78BFA' },
});

// ── Khuôn mặt phóng to (tâm (0, 0), bán kính 30) ───────────────────────────
function bigFace({ hair, hairC, eyeC, big = false, curly = false, id }) {
  const eyes = [-1, 1].map((s) => `<ellipse cx="${s * 11}" cy="3" rx="${big ? 7 : 5.4}" ry="${big ? 8 : 6.4}" fill="#fff" stroke="${L}" stroke-width="0.9"/>
    <circle cx="${s * 11 + 0.6}" cy="4" r="${big ? 5 : 3.8}" fill="${eyeC}"/><circle cx="${s * 11 + 0.6}" cy="4" r="${big ? 2.2 : 1.8}" fill="#1F1716"/><circle cx="${s * 11 + 2.2}" cy="1.6" r="1.3" fill="#fff"/>`).join('');
  const back = curly ? Array.from({ length: 14 }, (_, i) => {
    const s = i % 2 ? 1 : -1, k = Math.floor(i / 2);
    return `<circle cx="${s * (28 + (k % 2) * 4)}" cy="${-14 + k * 9}" r="${9 - k * 0.3}" fill="${hairC}" stroke="${L}" stroke-width="0.8"/>`;
  }).join('') : '';
  const front = hair === 'spiky'
    ? `<path d="M-31 2 L-33 -14 L-27 -18 L-30 -30 L-17 -27 L-13 -42 L-4 -32 L3 -44 L9 -32 L20 -40 L20 -27 L33 -29 L28 -16 L31 2 L24 -10 L18 -15 L12 -8 L5 -15 L0 -8 L-7 -15 L-14 -8 L-22 -13Z" fill="${hairC}" stroke="${L}" stroke-width="0.8"/>`
    : curly ? `<path d="M-30 4 C-34 -26 -16 -36 0 -36 C16 -36 34 -26 30 4 Q26 -12 16 -14 Q6 -18 -4 -14 Q-18 -16 -30 4Z" fill="${hairC}" stroke="${L}" stroke-width="0.8"/>
      ${[-20, -10, 0, 10, 20].map((x, i) => `<circle cx="${x}" cy="${-30 + (i % 2) * 3}" r="7" fill="${hairC}" stroke="${L}" stroke-width="0.6"/>`).join('')}`
      : hair === 'pony' ? `<path d="M-30 4 C-34 -26 -16 -36 0 -36 C16 -36 34 -26 30 4 Q26 -10 4 -16 Q-14 -16 -30 4Z" fill="${hairC}" stroke="${L}" stroke-width="0.8"/><path d="M26 -20 Q46 -10 40 20 Q36 26 34 18 Q38 0 24 -10Z" fill="${hairC}" stroke="${L}" stroke-width="0.8"/>`
        : `<path d="M-30 2 C-33 -26 -16 -38 0 -38 C16 -38 33 -26 30 2 C28 -10 18 -16 8 -12 C2 -18 -8 -18 -14 -12 C-20 -16 -28 -10 -30 2Z" fill="${hairC}" stroke="${L}" stroke-width="0.8"/>
          <path d="M4 -37 q8 -10 16 -5 q-8 -2 -10 5Z" fill="${hairC}" stroke="${L}" stroke-width="0.6"/><path d="M-16 -30 Q-6 -36 6 -34" stroke="#fff" stroke-width="2.4" fill="none" opacity="0.7" stroke-linecap="round"/>`;
  return `${back}
    ${[-1, 1].map((s) => `<ellipse cx="${s * 29}" cy="6" rx="5" ry="6.4" fill="${SKIN}" stroke="${L}" stroke-width="0.9"/>`).join('')}
    <circle r="30" fill="${SKIN}" stroke="${L}" stroke-width="1.2"/>
    ${[-1, 1].map((s) => `<ellipse cx="${s * 18}" cy="14" rx="5" ry="3" fill="#F9A8A8" opacity="0.7"/>`).join('')}
    ${eyes}
    <path d="M-1.6 12 q1.6 1.8 3.2 0" stroke="#C98B73" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    <g class="e037-sm0-${id}"><path d="M-7 19 Q0 24 7 19" stroke="#8A3B2E" stroke-width="1.6" fill="none" stroke-linecap="round"/></g>
    <g class="e037-sm1-${id}"><path d="M-13 17 Q0 19 13 17 Q10 31 0 31 Q-10 31 -13 17Z" fill="#B4363C" stroke="${L}" stroke-width="1"/><path d="M-11 18 H11 L10 21 H-10Z" fill="#fff"/><path d="M-5 27 Q0 24 5 27 Q0 30 -5 27Z" fill="#F28B95"/></g>
    ${front}`;
}
/** Khung tròn phóng to (fg), tâm (x, y), r; đuôi chỉ về (tx, ty). */
const zoom = (x, y, r, inner, cls, [tx, ty]) => {
  const dx = tx - x, dy = ty - y, d = Math.hypot(dx, dy), ux = dx / d, uy = dy / d;
  return `<g class="e037-zoom ${cls}" style="transform-origin:${x}px ${y}px">
  <circle cx="${x + ux * (r + 10)}" cy="${y + uy * (r + 10)}" r="4.4" fill="#fff" stroke="${L}"/><circle cx="${x + ux * (r + 22)}" cy="${y + uy * (r + 22)}" r="2.8" fill="#fff" stroke="${L}"/>
  <circle cx="${x}" cy="${y}" r="${r + 4}" fill="#FDBA74" stroke="${L}" stroke-width="1.2"/><circle cx="${x}" cy="${y}" r="${r}" fill="#E0F2FE" stroke="${L}"/>${inner}</g>`;
};
/** Vòng sáng chỉ vào một phần khuôn mặt. */
const ring = (x, y, rx, ry, cls) => `<ellipse class="e037-ring ${cls}" cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="none" stroke="#F97316" stroke-width="2" stroke-dasharray="5 3"/>`;

const TOM_FACE = bigFace({ hair: 'neat', hairC: BLOND, eyeC: '#2563EB', big: true, id: 'tom' });
const RUBY_FACE = bigFace({ hairC: BLOND, eyeC: '#16A34A', curly: true, id: 'ruby' });
const MUM_FACE = bigFace({ hair: 'pony', hairC: BLOND, eyeC: '#16A34A', id: 'mum' });
const MINH_FACE = bigFace({ hair: 'spiky', hairC: '#1F1716', eyeC: '#92400E', id: 'minh' });

// Tóc xoăn dài của Ruby gắn thêm vào con rối (rig chưa có kiểu tóc xoăn)
const CURLS_FRONT_BACK = `<g class="e037-curls">${Array.from({ length: 12 }, (_, i) => {
  const s = i % 2 ? 1 : -1, k = Math.floor(i / 2);
  return `<circle cx="${s * (16 + (k % 2) * 3)}" cy="${-6 + k * 7}" r="${6.4 - k * 0.3}" fill="${BLOND}" stroke="${L}" stroke-width="0.6"/>`;
}).join('')}</g>`;
const CURLS_TOP = [-12, -5, 2, 9].map((x, i) => `<circle cx="${x}" cy="${-19 + (i % 2) * 2}" r="5" fill="${BLOND}" stroke="${L}" stroke-width="0.5"/>`).join('');
const CURLS_SIDE = `<g class="e037-curls">${Array.from({ length: 9 }, (_, i) => `<circle cx="${-12 - (i % 3) * 5}" cy="${-110 + Math.floor(i / 3) * 10 + (i % 3) * 3}" r="6" fill="${BLOND}" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`;

function bg() {
  const chart = Array.from({ length: 8 }, (_, i) => `<path d="M386 ${FLOOR - 20 - i * 20} h${i % 2 ? 10 : 16}" stroke="${L}" stroke-width="1.2"/><text x="406" y="${FLOOR - 16 - i * 20}" font-family="Nunito, sans-serif" font-weight="800" font-size="8" fill="#475569">${(i + 1) * 20}</text>`).join('');
  return `
  ${sky(0, 1600, 315, 'e037sky')}
  ${cloud(330, 70, 1, 0)}${cloud(820, 56, 0.9, 2)}${cloud(1240, 72, 1, 4)}
  <path d="M0 236 Q300 200 640 230 T1200 222 T1600 228 V282 H0Z" fill="#86EFAC" stroke="${L}"/>
  ${tree(880, 238, 0.85)}${tree(1010, 232, 0.7, '#F59E0B')}
  <rect x="0" y="${FLOOR - 4}" width="760" height="${319 - FLOOR}" fill="#E7E5E4" stroke="${L}"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${i * 60} ${FLOOR - 4} V315" stroke="#D6D3D1"/>`).join('')}
  <rect x="760" y="${FLOOR - 4}" width="840" height="${319 - FLOOR}" fill="#A3E635" stroke="${L}"/>
  ${Array.from({ length: 18 }, (_, i) => `<path d="M${780 + i * 46} ${FLOOR + 12} l3 -7 l3 7 M${800 + i * 46} ${FLOOR + 24} l3 -7 l3 7" stroke="#4D7C0F" stroke-width="1.3" fill="none"/>`).join('')}
  ${schoolFront(140, FLOOR - 4)}
  <!-- Thước đo chiều cao (hươu cao cổ) -->
  <rect x="376" y="${FLOOR - 180}" width="62" height="176" rx="6" fill="#FEF3C7" stroke="${L}" stroke-width="1.2"/>
  <rect x="380" y="${FLOOR - 176}" width="8" height="168" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>${chart}
  <g transform="translate(424 ${FLOOR - 160})"><path d="M-4 0 Q-6 -16 2 -20" stroke="#F59E0B" stroke-width="6" fill="none" stroke-linecap="round"/><ellipse cx="6" cy="-22" rx="7" ry="5" fill="#FACC15" stroke="${L}" stroke-width="0.8"/><circle cx="8" cy="-23" r="1.2" fill="${L}"/></g>
  <!-- Ghế đá + cây -->
  ${tree(700, FLOOR - 4, 1.3)}
  <g transform="translate(646 0)"><rect x="-50" y="244" width="100" height="10" rx="3" fill="#94A3B8" stroke="${L}"/><rect x="-40" y="254" width="12" height="${FLOOR - 258}" fill="#64748B" stroke="${L}"/><rect x="28" y="254" width="12" height="${FLOOR - 258}" fill="#64748B" stroke="${L}"/></g>
  ${fence(770, 140, FLOOR - 2)}
  <!-- Nhà Tom -->
  <path d="M1270 126 L1420 64 L1570 126Z" fill="#22C55E" stroke="${L}" stroke-width="1.4"/>
  <rect x="1286" y="126" width="268" height="${FLOOR - 130}" fill="#FEF9C3" stroke="${L}" stroke-width="1.4"/>
  <rect x="1306" y="152" width="56" height="48" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M1334 152 V200 M1306 176 H1362" stroke="${L}" stroke-width="0.9"/>
  <rect x="1480" y="152" width="56" height="48" rx="3" fill="#BAE6FD" stroke="${L}" stroke-width="1.2"/><path d="M1508 152 V200 M1480 176 H1536" stroke="${L}" stroke-width="0.9"/>
  <rect x="1394" y="182" width="52" height="${FLOOR - 186}" fill="#78350F" stroke="${L}"/>
  <g class="e037-door"><rect x="1394" y="182" width="52" height="${FLOOR - 186}" rx="3" fill="#3B82F6" stroke="${L}" stroke-width="1.2"/><circle cx="1436" cy="232" r="3" fill="#FDE68A"/></g>
  ${label(1420, 110, 'TOM', '#15803D', 12)}
  ${Array.from({ length: 8 }, (_, i) => flowerAt(1470 + i * 13, FLOOR - 4 - (i % 2) * 3, ['#F472B6', '#FACC15', '#F87171'][i % 3])).join('')}
  <g class="e037-lb e037-lb-friend">${label(305, 130, 'best friend', '#DB2777', 14)}</g>
  <g class="e037-lb e037-lb-8">${label(470, 150, '8 years old', '#1D4ED8', 13)}</g>
  <g class="e037-lb e037-lb-sis">${label(1240, 150, 'little sister', '#DB2777', 13)}</g>
  <g class="e037-lb e037-lb-five">${label(1240, 160, '5 years old', '#7C3AED', 13)}</g>`;
}

function fg() {
  const tomH = FLOOR - 122 * 1.12 - 8;
  return `
  ${bush(560, FLOOR + 20, 0.9)}${bush(1590, FLOOR + 20, 1.1, '#4ADE80')}
  <!-- Tom cao gầy: vạch trên thước -->
  <g class="e037-lb e037-lb-tall"><path d="M380 ${tomH} H452" stroke="#EF4444" stroke-width="2.4" stroke-dasharray="5 3"/>
    <path d="M462 ${FLOOR - 6} V${tomH + 4} m-5 8 l5 -8 l5 8" stroke="#EF4444" stroke-width="2.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${label(492, tomH + 30, 'tall', '#DC2626', 13)}</g>
  <g class="e037-lb e037-lb-thin">${label(492, 222, 'thin', '#7C3AED', 13)}<path d="M406 214 h-8 m30 0 h8" stroke="#7C3AED" stroke-width="2.2" stroke-linecap="round"/><path d="M402 210 l-5 4 l5 4 M432 210 l5 4 l-5 4" stroke="#7C3AED" stroke-width="2" fill="none"/></g>
  ${zoom(560, 104, 46, `<g transform="translate(560 108) scale(1.12)">${TOM_FACE}</g>
    ${ring(560, 74, 40, 16, 'e037-r-hair')}${ring(548, 112, 11, 12, 'e037-r-eyeL')}${ring(572, 112, 11, 12, 'e037-r-eyeR')}${ring(560, 121, 6, 6, 'e037-r-nose')}${ring(560, 132, 16, 9, 'e037-r-smile')}`, 'e037-zTom', [436, 150])}
  <g class="e037-lb e037-lb-hair">${label(560, 170, 'short blond hair', '#B45309', 12)}</g>
  <g class="e037-lb e037-lb-eyes">${label(560, 170, 'big blue eyes', '#2563EB', 12)}</g>
  <g class="e037-lb e037-lb-nose">${label(560, 170, 'small nose', '#C2410C', 12)}</g>
  <g class="e037-lb e037-lb-smile">${label(560, 170, 'big smile', '#DB2777', 12)}</g>
  <g class="e037-lb e037-lb-fun">${label(440, 130, 'friendly', '#16A34A', 13)}</g>
  <g class="e037-lb e037-lb-funny">${label(440, 130, 'funny!', '#EA580C', 14)}</g>
  <g class="e037-lb e037-lb-ruby">${label(1240, 160, 'Ruby', '#DB2777', 16)}</g>
  <g class="e037-lb e037-lb-short"><path d="M1150 ${tomH} H1270" stroke="#EF4444" stroke-width="2" stroke-dasharray="5 3"/>${label(1288, 196, 'short', '#7C3AED', 12)}</g>
  ${zoom(1340, 96, 44, `<g transform="translate(1340 100)">${RUBY_FACE}</g>${ring(1340, 104, 42, 38, 'e037-r-curls')}`, 'e037-zRuby', [1250, 160])}
  <g class="e037-lb e037-lb-curly">${label(1340, 160, 'long curly hair', '#B45309', 12)}</g>
  <g class="e037-zoom e037-zMum" style="transform-origin:1420px 92px">
    <circle cx="1304" cy="${150}" r="4.4" fill="#fff" stroke="${L}"/><circle cx="1290" cy="${162}" r="2.8" fill="#fff" stroke="${L}"/>
    <rect x="1320" y="48" width="200" height="90" rx="40" fill="#FDBA74" stroke="${L}" stroke-width="1.2"/><rect x="1324" y="52" width="192" height="82" rx="37" fill="#E0F2FE" stroke="${L}"/>
    <g transform="translate(1374 96) scale(0.95)">${RUBY_FACE}</g><g transform="translate(1466 96) scale(0.95)">${MUM_FACE}</g>
    ${ring(1374, 99, 20, 9, 'e037-r-g1')}${ring(1466, 99, 18, 8, 'e037-r-g2')}
    <text x="1420" y="104" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="18" fill="#16A34A">=</text></g>
  <g class="e037-lb e037-lb-green">${label(1420, 160, 'green eyes', '#16A34A', 12)}</g>
  <g class="e037-lb e037-lb-nottall"><path d="M1118 ${tomH} H1206" stroke="#EF4444" stroke-width="2.4" stroke-dasharray="5 3"/>${label(1090, 150, 'not tall', '#DC2626', 13)}</g>
  ${zoom(1020, 100, 44, `<g transform="translate(1020 106)">${MINH_FACE}</g>${ring(1020, 72, 38, 16, 'e037-r-mhair')}${ring(1009, 109, 10, 11, 'e037-r-meyeL')}${ring(1031, 109, 10, 11, 'e037-r-meyeR')}`, 'e037-zMinh', [1120, 166])}
  <g class="e037-lb e037-lb-mhair">${label(1020, 166, 'straight black hair', '#1F2937', 12)}</g>
  <g class="e037-lb e037-lb-meyes">${label(1020, 166, 'brown eyes', '#92400E', 12)}</g>
  <g class="e037-lb e037-lb-bff">${label(1160, 130, 'best friends!', '#DB2777', 16)}</g>`;
}

const LBS = ['friend', '8', 'tall', 'thin', 'hair', 'eyes', 'nose', 'smile', 'fun', 'funny', 'sis', 'ruby', 'five', 'short', 'curly', 'green', 'nottall', 'mhair', 'meyes', 'bff'];
const CSS = `
.e037-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e037-lb-${k}`).join(', ')} { opacity: 1; }
.e037-zoom { opacity: 0; transform: scale(.3); transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-zTom .e037-zTom, .st-zRuby .e037-zRuby, .st-zMum .e037-zMum, .st-zMinh .e037-zMinh { opacity: 1; transform: scale(1); }
.e037-ring { opacity: 0; transition: opacity .3s; }
.st-rHair .e037-r-hair, .st-rEyes .e037-r-eyeL, .st-rEyes .e037-r-eyeR, .st-rNose .e037-r-nose, .st-rSmile .e037-r-smile,
.st-rCurls .e037-r-curls, .st-rGreen .e037-r-g1, .st-rGreen .e037-r-g2, .st-rMhair .e037-r-mhair, .st-rMeyes .e037-r-meyeL, .st-rMeyes .e037-r-meyeR { opacity: 1; animation: e037Ring .5s ease-in-out infinite alternate; }
@keyframes e037Ring { to { stroke-dashoffset: 8; stroke-width: 2.8; } }
${['tom', 'ruby', 'mum', 'minh'].map((k) => `.e037-sm1-${k} { display: none; }`).join(' ')}
.st-bigSmile .e037-sm1-tom, svg .e037-sm1-ruby, svg .e037-sm1-mum { display: inline; } .st-bigSmile .e037-sm0-tom, .e037-sm0-ruby, .e037-sm0-mum { display: none; }
.e037-door { transform-origin: 1394px 0; transition: transform .5s; } .st-door .e037-door { transform: scaleX(.12); }
/* Màu mắt và dáng gầy của con rối (class gắn ở init) */
.e037-tom .pp-face ellipse[fill="#2B1D16"], .e037-tom .sv-eye ellipse { fill: #2563EB; }
.e037-green .pp-face ellipse[fill="#2B1D16"], .e037-green .sv-eye ellipse { fill: #16A34A; }
.e037-minh .pp-face ellipse[fill="#2B1D16"], .e037-minh .sv-eye ellipse { fill: #92400E; }
.e037-tom .pp-front, .e037-tom .pp-side { transform: scaleX(.88); }
`;

const POSES = {
  e037_five: { R: [150, 168], L: [10, 4], head: -4 },
  e037_hug: { R: [60, 20], L: [60, 20] },
  e037_back: { R: [6, 0], L: [6, 0], head: -3 },
};

const BEATS = [
  { key: ['My best friend is Tom'], icon: '🤝', label: 'best friend', async play(st) {
    await st.walk('minh', 290, { speed: 130, lead: 40 });
    st.pose('minh', 'raise'); st.pose('tom', 'raise'); st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.set('st-lb-friend'); st.sfx('hearts');
    st.fx('hearts', 312, 150, { quiet: true });
    await st.wait(1400);
    st.pose('minh', 'stand'); st.pose('tom', 'stand'); st.mood('minh', 'happy'); st.mood('tom', 'happy');
    st.set('st-lb-friend', false);
  } },
  { key: ['eight years old', 'tall and thin'], icon: '📏', label: 'tall and thin', async play(st) {
    await st.walk('tom', 408, { speed: 120, follow: false, lead: 0 });
    await st.walk('tom', 407, { speed: 60, follow: false });
    st.look(440);
    st.set('st-lb-8'); st.sfx('sparkle', { vol: 0.6 });
    st.fx('sparkle', 470, 140, { quiet: true });
    await st.wait(1200);
    st.set('st-lb-8', false);
    st.set('st-lb-tall'); st.pose('tom', 'e037_back');
    await st.wait(1200);
    st.set('st-lb-thin');
    await st.wait(1100);
    st.set('st-lb-tall', false); st.set('st-lb-thin', false); st.pose('tom', 'stand');
  } },
  { key: ['short blond hair', 'big blue eyes'], icon: '👱', label: 'blond hair, blue eyes', async play(st) {
    st.look(470);
    st.set('st-zTom'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(300);
    st.set('st-rHair'); st.set('st-lb-hair');
    await st.wait(1500);
    st.set('st-rHair', false); st.set('st-lb-hair', false);
    st.set('st-rEyes'); st.set('st-lb-eyes');
    await st.wait(1500);
    st.set('st-rEyes', false); st.set('st-lb-eyes', false);
  } },
  { key: ['a small nose', 'a big smile'], icon: '😁', label: 'big smile', async play(st) {
    st.look(470);
    st.set('st-zTom');
    st.set('st-rNose'); st.set('st-lb-nose');
    await st.wait(1400);
    st.set('st-rNose', false); st.set('st-lb-nose', false);
    st.set('st-bigSmile'); st.set('st-rSmile'); st.set('st-lb-smile'); st.mood('tom', 'joy');
    await st.wait(1500);
    st.set('st-rSmile', false); st.set('st-lb-smile', false); st.set('st-zTom', false);
  } },
  { key: ['friendly and funny'], icon: '🤗', label: 'friendly, funny', async play(st) {
    st.look(440);
    st.show('kid', true);
    await st.walk('kid', 520, { speed: 150, follow: false });
    st.pose('tom', 'wave'); st.act('tom', 'wave'); st.pose('kid', 'wave'); st.act('kid', 'wave'); st.mood('kid', 'joy');
    st.set('st-lb-fun');
    await st.say('tom', 'Hi, Mai!', 1200);
    st.act('tom', null); st.act('kid', null); st.set('st-lb-fun', false);
    st.pose('tom', 'cheer'); st.act('tom', 'dance'); st.set('st-lb-funny');
    st.mood('minh', 'joy'); st.mood('kid', 'joy'); st.act('minh', 'hop'); st.act('kid', 'hop'); st.pose('kid', 'clap');
    await st.wait(1700);
    st.act('tom', null); st.act('minh', null); st.act('kid', null); st.pose('tom', 'stand'); st.pose('kid', 'stand');
    st.set('st-lb-funny', false);
  } },
  { key: ['tells funny stories'], icon: '😂', label: 'funny stories', async play(st) {
    st.walk('kid', 140, { speed: 150, follow: false }).then(() => st.show('kid', false));
    await Promise.all([
      st.walk('tom', 612, { speed: 130, lead: 0 }),
      st.walk('minh', 684, { speed: 150, follow: false }),
    ]);
    await st.walk('minh', 682, { speed: 60, follow: false });
    st.pose('tom', 'sit'); st.pose('minh', 'sit');
    await st.wait(300);
    st.pose('tom', 'sitWave'); st.act('tom', 'wave'); st.mood('tom', 'joy');
    await st.say('tom', '... and the duck said MOO!', 2000);
    st.act('tom', null); st.pose('tom', 'sitClap');
    st.pose('minh', 'sitClap'); st.act('minh', 'clap'); st.mood('minh', 'joy');
    st.fx('hearts', 648, 160, { quiet: true });
    await st.wait(1200);
    st.act('minh', null); st.pose('minh', 'sit'); st.pose('tom', 'sit');
  } },
  { key: ['a little sister'], icon: '👧', label: 'little sister', async play(st) {
    st.pose('tom', 'stand'); st.pose('minh', 'stand');
    await st.wait(300);
    await Promise.all([
      st.walk('tom', 1190, { speed: 230, lead: 40 }),
      st.walk('minh', 1140, { speed: 230, follow: false }),
    ]);
    st.set('st-door'); st.sfx('door-open', { vol: 0.6 });
    st.show('ruby', true);
    await st.walk('ruby', 1246, { speed: 140, follow: false });
    st.pose('ruby', 'cheer'); st.act('ruby', 'jump'); st.mood('ruby', 'joy');
    st.pose('tom', 'e037_hug'); st.mood('tom', 'joy'); st.set('st-lb-sis');
    await st.wait(1200);
    st.act('ruby', null); st.pose('ruby', 'stand'); st.pose('tom', 'stand'); st.set('st-lb-sis', false);
  } },
  { key: ['Her name is Ruby'], icon: '🏷️', label: 'Ruby', async play(st) {
    st.look(1230);
    st.pose('ruby', 'wave'); st.act('ruby', 'wave');
    st.set('st-lb-ruby'); st.sfx('sparkle', { vol: 0.6 });
    await st.say('ruby', "Hi! I'm Ruby.", 1800);
    st.act('ruby', null); st.pose('ruby', 'stand');
    await st.wait(300);
    st.set('st-lb-ruby', false);
  } },
  { key: ['five years old'], icon: '🖐️', label: 'five', async play(st) {
    st.look(1230);
    st.pose('ruby', 'e037_five'); st.mood('ruby', 'joy'); st.act('ruby', 'hop');
    st.set('st-lb-five');
    st.fx('sparkle', 1258, 180, { quiet: true });
    await st.wait(1900);
    st.act('ruby', null); st.pose('ruby', 'stand'); st.mood('ruby', 'happy'); st.set('st-lb-five', false);
  } },
  { key: ['She is short', 'long curly hair'], icon: '👧', label: 'curly hair', async play(st) {
    st.look(1260);
    st.set('st-lb-short');
    await st.wait(1300);
    st.set('st-lb-short', false);
    st.set('st-zRuby'); st.set('st-rCurls'); st.set('st-lb-curly'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(1800);
    st.set('st-rCurls', false); st.set('st-lb-curly', false); st.set('st-zRuby', false);
  } },
  { key: ['green eyes like her mum'], icon: '👀', label: 'green eyes', async play(st) {
    st.look(1340);
    await st.walk('mum', 1316, { speed: 120, follow: false });
    st.pose('mum', 'wave'); st.act('mum', 'wave'); st.mood('mum', 'joy');
    await st.wait(400);
    st.act('mum', null); st.pose('mum', 'stand');
    st.set('st-zMum'); st.set('st-rGreen'); st.set('st-lb-green');
    await st.wait(2000);
    st.set('st-rGreen', false); st.set('st-lb-green', false); st.set('st-zMum', false);
  } },
  { key: ['I am not tall like Tom'], icon: '📏', label: 'not tall', async play(st) {
    st.look(1170);
    await st.walk('minh', 1152, { speed: 80, follow: false });
    st.pose('minh', 'e037_back'); st.pose('tom', 'e037_back');
    st.set('st-lb-nottall');
    await st.wait(900);
    st.pose('minh', 'me'); st.act('minh', 'no');
    await st.wait(1300);
    st.act('minh', null); st.pose('minh', 'stand'); st.pose('tom', 'stand');
    st.set('st-lb-nottall', false);
  } },
  { key: ['I am short', 'straight black hair and brown eyes'], icon: '🧒', label: 'black hair', async play(st) {
    st.look(1100);
    st.pose('minh', 'me'); st.mood('minh', 'joy');
    st.set('st-zMinh'); st.sfx('sparkle', { vol: 0.5 });
    await st.wait(600);
    st.set('st-rMhair'); st.set('st-lb-mhair');
    await st.wait(1700);
    st.set('st-rMhair', false); st.set('st-lb-mhair', false);
    st.set('st-rMeyes'); st.set('st-lb-meyes');
    await st.wait(1500);
    st.set('st-rMeyes', false); st.set('st-lb-meyes', false); st.set('st-zMinh', false); st.pose('minh', 'stand');
  } },
  { key: ['very different', 'best friends'], icon: '❤️', label: 'best friends', async play(st) {
    st.look(1200);
    st.pose('minh', 'cheer'); st.pose('tom', 'cheer'); st.act('minh', 'jump'); st.act('tom', 'jump');
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    st.pose('ruby', 'clap'); st.act('ruby', 'clap'); st.pose('mum', 'clap'); st.act('mum', 'clap');
    st.set('st-lb-bff');
    st.fx('hearts', 1170, 140);
    await st.wait(900);
    st.fx('hearts', 1170, 140, { quiet: true });
    await st.wait(1300);
    ['minh', 'tom', 'ruby', 'mum'].forEach((id) => st.act(id, null));
    st.set('st-lb-bff', false);
  } },
];

/** Gắn tóc xoăn, màu mắt, dáng gầy (rig chưa có các tuỳ chọn này). */
function dressUp(st) {
  const ruby = st.a('ruby');
  ruby.el.classList.add('e037-green');
  const heads = ruby.inner.querySelectorAll('.pp-front .pp-headw > g');
  heads[0]?.insertAdjacentHTML('afterbegin', CURLS_FRONT_BACK);
  heads[1]?.insertAdjacentHTML('beforeend', CURLS_TOP);
  ruby.inner.querySelector('.pp-side .sv-bob')?.insertAdjacentHTML('afterbegin', CURLS_SIDE);
  st.a('mum').el.classList.add('e037-green');
  st.a('tom').el.classList.add('e037-tom');
  st.a('minh').el.classList.add('e037-minh');
}

export default {
  id: 'en037', worldW: 1600, floor: FLOOR, viewTop: 40, camStart: 80, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  order: [1, 2, 5, 7, 10, 12],
  cast: [
    { id: 'mum', kind: 'adult', who: 'e037_tmum', x: 1500, s: 0.95, face: -1 },
    { id: 'ruby', kind: 'kid', who: 'e037_ruby', x: 1420, s: 0.84, face: -1 },
    { id: 'kid', kind: 'kid', who: 'e037_kid', x: 760, face: -1 },
    { id: 'tom', kind: 'kid', who: 'en_tom', x: 336, s: 1.12, face: -1 },
    { id: 'minh', kind: 'kid', who: 'en_minh', x: 150, s: 0.96 },
  ],
  init(st) {
    dressUp(st);
    st.show('ruby', false); st.show('kid', false);
    st.bag('kid', true);
  },
};
