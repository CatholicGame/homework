/**
 * Bài 29 "Jobs in My Town": Minh và Tom đi bộ dọc một con phố, từ trái sang phải: bệnh viện (bố Minh là bác sĩ) → trường
 * (mẹ Tom và cô Hoa là giáo viên) → chốt cảnh sát (chú cảnh sát áo xanh giúp bà cụ xách túi) → quán mì (cô đầu bếp mũ trắng)
 * → tiệm sửa xe (anh thợ đang sửa xe đạp) → phố cổ (cô hoạ sĩ chụp ảnh rồi vẽ tranh phố cổ).
 * Toạ độ cảnh: rộng 3060, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, road, schoolFront, label, steam, BOWL } from '../kit.js';

const FLOOR = 282;

Object.assign(CAST, {
  e029_doc: { adult: true, hair: 'short', top: 'jacket', shirt: '#FFFFFF', inner: '#93C5FD', bottom: 'pants', bottomC: '#334155', shoe: '#44403C' },
  e029_tmum: { adult: true, hair: 'ponytail', hairC: '#7C4A1E', top: 'aodai', shirt: '#F9A8D4', shoe: '#FFFFFF' },
  e029_police: { adult: true, hair: 'short', top: 'shirt', shirt: '#2563EB', tie: '#1E3A8A', bottom: 'pants', bottomC: '#1E3A8A', shoe: '#111827' },
  e029_lady: { adult: true, old: true, hair: 'bun', hairC: '#E7E5E4', top: 'blouse', shirt: '#FCA5A5', bottom: 'pants', bottomC: '#44403C', shoe: '#57534E' },
  e029_cook: { adult: true, hair: 'bob', top: 'blouse', shirt: '#FFFFFF', bottom: 'pants', bottomC: '#475569', shoe: '#F5F5F4' },
  e029_mech: { adult: true, hair: 'short', top: 'tee', shirt: '#F97316', bottom: 'pants', bottomC: '#1E40AF', shoe: '#44403C' },
  e029_artist: { adult: true, hair: 'bob', hairC: '#3F2A1E', top: 'blouse', shirt: '#A78BFA', bottom: 'pants', bottomC: '#0F766E', shoe: '#F5F5F4' },
});

// Mũ đội thêm lên đầu (toạ độ đầu như cast.js hat()): cast.js chưa có mũ cảnh sát / mũ đầu bếp nên gắn vào lớp đầu lúc dựng.
const POLICE_CAP = `<path d="M-16 -8 C-17 -22 -8 -28 0 -28 C8 -28 17 -22 16 -8Z" fill="#1E3A8A" stroke="${L}" stroke-width="0.7"/>
  <path d="M-16 -8 Q0 -3 19 -8 Q15 -1 -13 -3Z" fill="#111827"/><path d="M-15 -11 H15" stroke="#FACC15" stroke-width="1.4"/><circle cx="0" cy="-19" r="3.2" fill="#FACC15" stroke="${L}" stroke-width="0.5"/>`;
const CHEF_HAT = `<path d="M-14 -10 V-22 Q-24 -30 -15 -39 Q-8 -48 0 -41 Q8 -48 15 -39 Q24 -30 14 -22 V-10Z" fill="#fff" stroke="${L}" stroke-width="0.8"/>
  <rect x="-15" y="-16" width="30" height="7" rx="2" fill="#fff" stroke="${L}" stroke-width="0.8"/>`;
function addHat(st, id, svg) {
  const g = st.a(id).inner.querySelectorAll('.pp-headw > g');
  g[g.length - 1]?.insertAdjacentHTML('beforeend', svg);
}

// ── Đồ vật ────────────────────────────────────────────────────────────────
const STETHO = `<g transform="translate(0 -12)"><path d="M-7 -14 Q-9 2 0 6 Q9 2 7 -14" stroke="#475569" stroke-width="1.6" fill="none"/><circle cx="0" cy="8" r="3" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>`;
const TBOOK = `<g transform="translate(0 -2) rotate(-6)"><rect x="-10" y="-13" width="20" height="26" rx="2" fill="#22C55E" stroke="${L}" stroke-width="1"/><path d="M-6 -6 H6 M-6 -2 H4" stroke="#fff" stroke-width="1.4"/></g>`;
const SHOPBAG = `<g transform="translate(0 -10)"><path d="M-12 -10 H12 L10 14 H-10Z" fill="#FDE68A" stroke="${L}" stroke-width="1"/><path d="M-6 -10 Q0 -20 6 -10" stroke="${L}" stroke-width="1.4" fill="none"/>
  <circle cx="-5" cy="-12" r="4" fill="#EF4444" stroke="${L}" stroke-width="0.6"/><path d="M2 -10 L6 -22" stroke="#16A34A" stroke-width="2.4" stroke-linecap="round"/><circle cx="5" cy="-12" r="3.6" fill="#F97316" stroke="${L}" stroke-width="0.6"/></g>`;
const WHISTLE = `<g transform="translate(0 -4)"><rect x="-5" y="-3" width="10" height="6" rx="3" fill="#94A3B8" stroke="${L}" stroke-width="0.7"/><circle cx="4" cy="2" r="3" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/></g>`;
const WRENCH = `<g transform="rotate(200)"><path d="M0 -2 V16" stroke="#64748B" stroke-width="3" stroke-linecap="round"/><path d="M-5 16 Q0 26 5 16 L2 18 H-2Z" fill="#94A3B8" stroke="${L}" stroke-width="0.6"/></g>`;
const LADLE = `<g transform="rotate(180)"><path d="M0 -2 V18" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/><path d="M-5 18 Q0 26 5 18Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.6"/></g>`;
const CAMERA = `<g transform="translate(0 -4)"><rect x="-9" y="-7" width="18" height="13" rx="2.4" fill="#1F2937" stroke="${L}" stroke-width="0.7"/>
  <circle cx="1" cy="-0.5" r="4.4" fill="#475569" stroke="#E2E8F0" stroke-width="1"/><circle cx="1" cy="-0.5" r="2" fill="#38BDF8"/><rect x="-7" y="-10" width="5" height="3" rx="1" fill="#EF4444"/></g>`;
const CAMCHEST = `<g transform="translate(0 -14)"><path d="M-9 -18 L-6 -4 M9 -18 L6 -4" stroke="#1F2937" stroke-width="1.2"/>${CAMERA}</g>`;
const BRUSH = `<g transform="rotate(200)"><rect x="-1.4" y="-4" width="2.8" height="16" fill="#B45309" stroke="${L}" stroke-width="0.6"/><path d="M-2.4 12 H2.4 L1.6 20 Q0 22 -1.6 20Z" fill="#EF4444" stroke="${L}" stroke-width="0.6"/></g>`;

/** Nhà phố (tường màu, mái ngói, cửa chớp), gốc giữa đáy. */
const house = (x, w, h, wall, roof, old = false) => `<g transform="translate(${x} ${FLOOR - 10})">
  <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="${wall}" stroke="${L}" stroke-width="1.2"/>
  ${old ? `<path d="M${-w / 2 - 10} ${-h} L${-w / 2 + 14} ${-h - 26} H${w / 2 - 14} L${w / 2 + 10} ${-h}Z" fill="${roof}" stroke="${L}" stroke-width="1.2"/>${Array.from({ length: Math.floor(w / 12) }, (_, i) => `<path d="M${-w / 2 + 6 + i * 12} ${-h - 2} l3 -20" stroke="#7C2D12" stroke-width="0.8" opacity="0.6"/>`).join('')}`
    : `<rect x="${-w / 2 - 4}" y="${-h - 8}" width="${w + 8}" height="10" fill="${roof}" stroke="${L}"/>`}
  ${[-w / 4, w / 4].map((dx) => `<rect x="${dx - 12}" y="${-h + 18}" width="24" height="30" fill="${old ? '#16A34A' : '#BAE6FD'}" stroke="${L}"/><path d="M${dx} ${-h + 18} V${-h + 48}" stroke="${L}" stroke-width="0.8"/>`).join('')}
  <rect x="-13" y="-52" width="26" height="52" rx="2" fill="${old ? '#92400E' : '#B45309'}" stroke="${L}"/></g>`;

function bg() {
  return `
  ${sky(0, 3060, 315, 'e029sky')}
  ${[[120, 50], [520, 70], [900, 44], [1380, 60], [1820, 48], [2300, 66], [2760, 50]].map(([x, y], i) => cloud(x, y, 0.9, i % 4)).join('')}
  <path d="M0 236 Q300 206 600 230 T1200 224 T1800 232 T2400 222 T3060 230 V282 H0Z" fill="#86EFAC" stroke="${L}"/>
  ${tree(60, FLOOR - 10, 0.9)}${tree(250, FLOOR - 10, 1)}${tree(780, FLOOR - 10, 0.9, '#F59E0B')}${tree(1290, FLOOR - 10, 0.85)}${tree(1720, FLOOR - 10, 0.9)}${tree(2560, FLOOR - 10, 0.85, '#F472B6')}
  ${house(160, 80, 110, '#FDE68A', '#F97316')}
  <!-- Bệnh viện -->
  <g transform="translate(560 0)">
    <rect x="-130" y="104" width="260" height="${FLOOR - 114}" fill="#F8FAFC" stroke="${L}" stroke-width="1.4"/><rect x="-136" y="96" width="272" height="12" fill="#94A3B8" stroke="${L}"/>
    ${[-100, -60, 60, 100].map((dx) => [128, 178].map((y) => `<rect x="${dx - 13}" y="${y}" width="26" height="26" fill="#BAE6FD" stroke="${L}"/>`).join('')).join('')}
    <rect x="-24" y="56" width="48" height="44" rx="6" fill="#fff" stroke="${L}" stroke-width="1.2"/><path d="M0 64 V92 M-14 78 H14" stroke="#EF4444" stroke-width="8"/>
    <rect x="-60" y="112" width="120" height="20" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="127" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="13" fill="#DC2626">HOSPITAL</text>
    <rect x="44" y="${FLOOR - 92}" width="56" height="82" rx="3" fill="#7DD3FC" stroke="${L}" stroke-width="1.2"/><path d="M72 ${FLOOR - 92} V${FLOOR - 10}" stroke="${L}"/></g>
  <!-- Trường -->
  ${schoolFront(1060, FLOOR - 10)}
  ${house(1220, 70, 96, '#C7D2FE', '#6366F1')}
  <!-- Chốt cảnh sát -->
  <g transform="translate(1440 0)"><rect x="-22" y="${FLOOR - 112}" width="44" height="102" rx="4" fill="#DBEAFE" stroke="${L}" stroke-width="1.2"/><path d="M-28 ${FLOOR - 112} H28 L22 ${FLOOR - 128} H-22Z" fill="#1D4ED8" stroke="${L}"/>
    <rect x="-14" y="${FLOOR - 98}" width="28" height="24" fill="#BAE6FD" stroke="${L}"/><rect x="-26" y="${FLOOR - 70}" width="52" height="12" rx="3" fill="#fff" stroke="${L}"/>
    <text x="0" y="${FLOOR - 61}" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="9" fill="#1D4ED8">POLICE</text></g>
  <g transform="translate(1660 0)"><path d="M0 ${FLOOR - 10} V120" stroke="#475569" stroke-width="4"/><rect x="-10" y="92" width="20" height="54" rx="5" fill="#1F2937" stroke="${L}"/>
    <circle cy="104" r="6" fill="#7F1D1D"/><circle cy="119" r="6" fill="#713F12"/><circle cy="134" r="6" fill="#22C55E"/></g>
  <!-- Quán mì -->
  <g transform="translate(1990 0)">
    <rect x="-120" y="114" width="240" height="${FLOOR - 124}" fill="#FEF3C7" stroke="${L}" stroke-width="1.4"/><rect x="-126" y="106" width="252" height="10" fill="#B45309" stroke="${L}"/>
    <path d="M-124 144 H124 L114 166 H-114Z" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>${[-100, -60, -20, 20, 60].map((x) => `<path d="M${x} 144 L${x + 4} 166 H${x + 24} L${x + 20} 144Z" fill="#fff"/>`).join('')}
    <g class="e029-sign"><rect x="-62" y="80" width="124" height="24" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/><text x="0" y="98" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="15" fill="#DC2626">NOODLES</text></g>
    ${[[-90, 186], [90, 186]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M0 -14 V-22" stroke="${L}"/><ellipse rx="10" ry="13" fill="#EF4444" stroke="${L}"/><path d="M-6 -8 H6 M-8 0 H8 M-6 8 H6" stroke="#FACC15" stroke-width="1"/></g>`).join('')}
    <rect x="-60" y="180" width="120" height="${FLOOR - 190}" fill="#FDE68A" stroke="${L}" opacity="0.6"/></g>
  <!-- Tiệm sửa xe -->
  <g transform="translate(2440 0)">
    <rect x="-110" y="126" width="220" height="${FLOOR - 136}" fill="#E5E7EB" stroke="${L}" stroke-width="1.4"/><rect x="-116" y="118" width="232" height="10" fill="#475569" stroke="${L}"/>
    <rect x="-56" y="94" width="112" height="22" rx="4" fill="#fff" stroke="${L}"/><text x="0" y="110" text-anchor="middle" font-family="Nunito, sans-serif" font-weight="900" font-size="12" fill="#1D4ED8">BIKE REPAIR</text>
    ${[-80, -60, -40].map((x, i) => `<path d="M${x} 170 v${16 + i * 4}" stroke="#64748B" stroke-width="3"/>`).join('')}<circle cx="70" cy="186" r="16" fill="none" stroke="#1F2937" stroke-width="3"/>
  </g>
  <!-- Phố cổ -->
  ${house(2680, 90, 120, '#FDE047', '#B45309', true)}${house(2790, 84, 110, '#FCA5A5', '#9A3412', true)}${house(2896, 92, 124, '#FDE68A', '#B45309', true)}${house(3006, 86, 112, '#BEF264', '#9A3412', true)}
  ${[2735, 2843, 2950].map((x) => `<g transform="translate(${x} 150)"><path d="M0 -12 V-4" stroke="${L}"/><ellipse rx="7" ry="9" fill="#EF4444" stroke="${L}" stroke-width="0.8"/></g>`).join('')}
  ${road(0, 3060, FLOOR)}`;
}

/** Xe đạp đang sửa (dựng trên chân chống), bánh sau quay khi st-fix. */
const BIKE = (x) => {
  const wheel = (dx, cls) => `<g transform="translate(${dx} -30)"><g class="${cls}"><circle r="30" fill="none" stroke="#1F2937" stroke-width="4"/>${[0, 45, 90, 135].map((r) => `<path d="M-28 0 H28" stroke="#94A3B8" stroke-width="1" transform="rotate(${r})"/>`).join('')}<circle r="3" fill="#475569"/></g></g>`;
  return `<g transform="translate(${x} ${FLOOR})">${wheel(-50, 'e029-wheelB')}${wheel(54, 'e029-wheelF')}
    <path d="M-50 -30 L-6 -30 L-18 -80 M-6 -30 L40 -76 L-18 -76 M54 -30 L40 -76 L36 -94" stroke="#DC2626" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28 -96 H46" stroke="#1F2937" stroke-width="4" stroke-linecap="round"/><rect x="-30" y="-88" width="24" height="7" rx="3.4" fill="#1F2937"/>
    <circle cx="-6" cy="-30" r="6" fill="none" stroke="#475569" stroke-width="2"/><path d="M-50 -30 L-58 0" stroke="#475569" stroke-width="3"/></g>`;
};

function fg() {
  return `
  <!-- Quầy quán mì + nồi -->
  <rect x="1940" y="226" width="110" height="56" fill="#B45309" stroke="${L}" stroke-width="1.2"/><rect x="1934" y="220" width="122" height="9" rx="3" fill="#F5F5F4" stroke="${L}"/>
  <g transform="translate(1976 206)"><path d="M-24 -10 H24 V12 Q24 16 20 16 H-20 Q-24 16 -24 12Z" fill="#94A3B8" stroke="${L}"/><ellipse cx="0" cy="-10" rx="24" ry="4.6" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/></g>
  ${steam(1976, 192, 'e029-potsteam')}
  <g transform="translate(2030 220)">${BOWL}</g>
  <!-- Bàn khách -->
  <rect x="2084" y="${FLOOR - 50}" width="70" height="7" rx="2" fill="#D97706" stroke="${L}"/><path d="M2092 ${FLOOR - 43} V${FLOOR} M2146 ${FLOOR - 43} V${FLOOR}" stroke="#92400E" stroke-width="4"/>
  <g class="e029-tbowl" transform="translate(2119 ${FLOOR - 58})">${BOWL}</g>
  ${steam(2119, FLOOR - 66, 'e029-bowlsteam')}
  <!-- Xe đạp đang sửa -->
  ${BIKE(2540)}
  <!-- Giá vẽ của hoạ sĩ -->
  <g transform="translate(2940 ${FLOOR})"><path d="M-22 0 L-4 -120 M22 0 L4 -120 M0 -110 L0 0" stroke="#A16207" stroke-width="3.4" stroke-linecap="round"/>
    <rect x="-34" y="-112" width="68" height="54" fill="#fff" stroke="${L}" stroke-width="1.2"/><rect x="-36" y="-58" width="72" height="5" fill="#A16207"/>
    <g class="e029-pic">
      <path d="M-30 -62 V-86 L-22 -96 L-14 -86 V-62Z" fill="#FDE047" stroke="${L}" stroke-width="0.6"/><path d="M-14 -62 V-82 L-4 -92 L6 -82 V-62Z" fill="#FCA5A5" stroke="${L}" stroke-width="0.6"/>
      <path d="M6 -62 V-88 L16 -98 L26 -88 V-62Z" fill="#BEF264" stroke="${L}" stroke-width="0.6"/><circle cx="20" cy="-104" r="4" fill="#FB923C"/>
      ${[-22, -4, 16].map((x) => `<rect x="${x - 2.5}" y="-72" width="5" height="10" fill="#92400E"/>`).join('')}</g></g>
  <!-- Nhãn chữ -->
  <g class="e029-lb e029-lb-doctor">${label(640, 92, 'doctor', '#DC2626', 15)}</g>
  <g class="e029-lb e029-lb-hosp">${label(470, 160, 'hospital', '#DC2626', 14)}</g>
  <g class="e029-lb e029-lb-teacher">${label(1060, 138, 'teacher', '#1D4ED8', 15)}</g>
  <g class="e029-lb e029-lb-uniform">${label(1510, 100, 'blue uniform', '#1D4ED8', 14)}</g>
  <g class="e029-lb e029-lb-q">${label(1330, 136, '?', '#7C3AED', 22)}</g>
  <g class="e029-lb e029-lb-police">${label(1510, 100, 'police officer', '#1D4ED8', 14)}</g>
  <g class="e029-lb e029-lb-help">${label(1560, 126, 'helps people', '#15803D', 13)}</g>
  <g class="e029-lb e029-lb-hat">${label(2100, 196, 'white hat', '#475569', 14)}</g>
  <g class="e029-lb e029-lb-cook">${label(2100, 196, 'cook', '#DC2626', 16)}</g>
  <g class="e029-lb e029-lb-mech">${label(2560, 160, 'mechanic', '#EA580C', 15)}</g>
  <g class="e029-lb e029-lb-camera">${label(2870, 92, 'camera', '#475569', 14)}</g>
  <g class="e029-lb e029-lb-q2">${label(2700, 136, '?', '#7C3AED', 22)}</g>
  <g class="e029-lb e029-lb-artist">${label(2870, 92, 'artist', '#7C3AED', 16)}</g>
  <g class="e029-lb e029-lb-old">${label(2940, 140, 'old streets', '#B45309', 12)}</g>`;
}

const CSS = `
.e029-lb { opacity: 0; transition: opacity .3s; }
${['doctor', 'hosp', 'teacher', 'uniform', 'q', 'police', 'help', 'hat', 'cook', 'mech', 'camera', 'q2', 'artist', 'old'].map((k) => `.st-lb-${k} .e029-lb-${k}`).join(', ')} { opacity: 1; }
.e029-potsteam { opacity: .4; transition: opacity .4s; } .st-cook .e029-potsteam { opacity: 1; }
.e029-tbowl, .e029-bowlsteam { opacity: 0; transition: opacity .3s; } .st-tbowl .e029-tbowl, .st-tbowl .e029-bowlsteam { opacity: 1; }
.e029-sign { transform-origin: 1990px 92px; transition: transform .4s cubic-bezier(.3,1.6,.6,1); }
.st-sign .e029-sign { transform: scale(1.15); }
.e029-wheelB { transform-origin: 0 0; }
.st-fix .e029-wheelB { animation: e029Spin .5s linear infinite; }
@keyframes e029Spin { to { transform: rotate(360deg); } }
.e029-pic path, .e029-pic rect, .e029-pic circle { opacity: 0; transition: opacity .5s; }
.st-pic .e029-pic > :nth-child(1) { opacity: 1; transition-delay: 0s; }
.st-pic .e029-pic > :nth-child(2) { opacity: 1; transition-delay: .6s; }
.st-pic .e029-pic > :nth-child(3) { opacity: 1; transition-delay: 1.2s; }
.st-pic .e029-pic > :nth-child(n+4) { opacity: 1; transition-delay: 1.8s; }
.es-ac.act-e029-fix .pp-fowR { animation: e029Fix .2s ease-in-out infinite alternate; }
@keyframes e029Fix { from { transform: rotate(-18deg); } to { transform: rotate(18deg); } }
`;

const POSES = {
  e029_whistle: { R: [150, 250], L: [130, 172], head: -4 },
  e029_fix: { R: [70, 110], L: [30, 60], dy: 8, head: 6 },
  e029_photo: { R: [150, 250], L: [140, 245] },
  e029_paint: { R: [80, 120], L: [30, -70], head: 4 },
};

const BEATS = [
  { key: ['walking in the town'], icon: '🚶', label: 'walking', async play(st) {
    await Promise.all([
      st.walk('minh', 400, { speed: 130, lead: 60 }),
      st.walk('tom', 334, { speed: 130, follow: false }),
    ]);
    st.mood('minh', 'joy'); st.mood('tom', 'joy');
    await st.wait(300);
    st.mood('minh', 'happy'); st.mood('tom', 'happy');
  } },
  { key: ['What does your dad do'], icon: '❓', label: 'your dad?', async play(st) {
    st.look(500);
    await st.say('tom', 'What does your dad do?', 2200);
  } },
  { key: ['He is a doctor'], icon: '🩺', label: 'doctor', async play(st) {
    st.show('dad', true); st.fx('sparkle', 640, 200);
    st.say('minh', 'He is a doctor.', 1700);
    await st.wait(400);
    st.set('st-lb-doctor'); st.pose('dad', 'wave'); st.act('dad', 'wave'); st.mood('dad', 'joy');
    await st.wait(1500);
    st.act('dad', null); st.pose('dad', 'stand'); st.mood('dad', 'happy');
  } },
  { key: ['works at the hospital'], icon: '🏥', label: 'hospital', async play(st) {
    st.pose('minh', 'pointUp'); st.act('minh', 'point');
    st.set('st-lb-hosp'); st.fx('sparkle', 560, 78);
    await st.wait(2000);
    st.act('minh', null); st.pose('minh', 'stand'); st.set('st-lb-hosp', false); st.set('st-lb-doctor', false);
  } },
  { key: ['What does your mum do'], icon: '❓', label: 'your mum?', async play(st) {
    st.pose('dad', 'wave'); st.act('dad', 'wave');
    await Promise.all([
      st.walk('minh', 900, { speed: 140, lead: 60 }),
      st.walk('tom', 960, { speed: 140, follow: false }),
    ]);
    await st.say('minh', 'What does your mum do?', 2000);
  } },
  { key: ['She is a teacher, like Ms Hoa'], icon: '👩‍🏫', label: 'teacher', async play(st) {
    st.say('tom', 'She is a teacher!', 1600);
    st.pose('tmum', 'wave'); st.act('tmum', 'wave'); st.mood('tmum', 'joy');
    await st.wait(800);
    st.pose('hoa', 'wave'); st.act('hoa', 'wave'); st.mood('hoa', 'joy');
    st.set('st-lb-teacher'); st.fx('sparkle', 1060, 150);
    await st.wait(1600);
    st.act('tmum', null); st.act('hoa', null); st.pose('tmum', 'stand'); st.pose('hoa', 'stand');
    st.mood('tmum', 'happy'); st.mood('hoa', 'happy'); st.set('st-lb-teacher', false);
  } },
  { key: ['a man in a blue uniform'], icon: '👮', label: 'blue uniform', async play(st) {
    await Promise.all([
      st.walk('tom', 1370, { speed: 140, lead: 100 }),
      st.walk('minh', 1310, { speed: 140, follow: false }),
    ]);
    st.hold('police', 'e029_whistle'); st.pose('police', 'e029_whistle'); st.sfx('whistle');
    st.set('st-lb-uniform'); st.fx('sparkle', 1510, 170);
    await st.wait(1400);
    st.set('st-lb-uniform', false);
  } },
  { key: ['What does he do'], icon: '❓', label: 'what does he do?', async play(st) {
    st.hold('police', null); st.pose('police', 'stand');
    st.pose('tom', 'point');
    await st.say('tom', 'What does he do?', 1900);
    st.pose('tom', 'stand');
  } },
  { key: ['asks Tom'], icon: '🙋', label: 'asks Tom', async play(st) {
    st.set('st-lb-q'); st.pose('tom', 'think'); st.mood('tom', 'wow');
    await st.wait(1300);
    st.set('st-lb-q', false); st.pose('tom', 'stand'); st.mood('tom', 'happy');
  } },
  { key: ['He is a police officer'], icon: '👮', label: 'police officer', async play(st) {
    st.set('st-lb-police');
    st.pose('police', 'wave'); st.act('police', 'wave'); st.mood('police', 'joy');
    await st.say('minh', 'He is a police officer.', 2000);
    st.act('police', null); st.pose('police', 'stand'); st.mood('police', 'happy');
  } },
  { key: ['He helps people'], icon: '🤝', label: 'helps people', async play(st) {
    st.set('st-lb-police', false);
    st.act('lady', 'shiver');
    await st.wait(600);
    st.act('lady', null); st.chest('lady', null); st.pose('lady', 'give'); st.pose('police', 'reach');
    await st.fly(SHOPBAG, [1560, 200], [1514, 206], { size: 34, dur: 500 });
    st.pose('lady', 'stand'); st.mood('lady', 'joy');
    st.pose('police', 'carry'); st.chest('police', SHOPBAG);
    st.set('st-lb-help'); st.fx('hearts', 1540, 150);
    await st.wait(1500);
    st.set('st-lb-help', false);
  } },
  { key: ['a woman in a white hat'], icon: '👒', label: 'white hat', async play(st) {
    await Promise.all([
      st.walk('minh', 1830, { speed: 150, lead: 80 }),
      st.walk('tom', 1770, { speed: 150, follow: false }),
    ]);
    st.set('st-lb-hat'); st.fx('sparkle', 1980, 108);
    await st.wait(1200);
    st.set('st-lb-hat', false);
  } },
  { key: ['She is a cook'], icon: '👩‍🍳', label: 'cook', async play(st) {
    st.set('st-lb-cook'); st.mood('cook', 'joy'); st.pose('cook', 'wave'); st.act('cook', 'wave');
    await st.say('minh', 'She is a cook.', 1700);
    st.act('cook', null); st.pose('cook', 'stand'); st.mood('cook', 'happy');
  } },
  { key: ['makes noodles in that restaurant'], icon: '🍜', label: 'noodles', async play(st) {
    st.set('st-lb-cook', false);
    st.set('st-sign'); st.pose('minh', 'point');
    st.set('st-cook'); st.hold('cook', 'e029_ladle'); st.pose('cook', 'stir'); st.act('cook', 'stir'); st.sfx('pot-stir');
    await st.wait(1500);
    st.act('cook', null); st.pose('cook', 'give'); st.hold('cook', null);
    await st.fly(BOWL, [2030, 212], [2119, FLOOR - 60], { dur: 650 });
    st.set('st-tbowl'); st.sfx('bowl-down');
    st.pose('cook', 'stand'); st.pose('minh', 'stand'); st.set('st-sign', false);
    await st.wait(500);
  } },
  { key: ['fixing a bike'], icon: '🔧', label: 'fixing a bike', async play(st) {
    await Promise.all([
      st.walk('minh', 2320, { speed: 150, lead: 150 }),
      st.walk('tom', 2270, { speed: 150, follow: false }),
    ]);
    st.hold('mech', 'e029_wrench'); st.pose('mech', 'e029_fix'); st.act('mech', 'e029-fix');
    st.set('st-fix'); st.sfx('bike-fix');
    await st.wait(1800);
    st.act('mech', null);
  } },
  { key: ['He is a mechanic'], icon: '🧑‍🔧', label: 'mechanic', async play(st) {
    st.set('st-lb-mech'); st.pose('minh', 'point');
    st.say('minh', 'He is a mechanic!', 1800);
    await st.wait(500);
    st.hold('mech', null); st.pose('mech', 'wave'); st.act('mech', 'wave'); st.mood('mech', 'joy');
    await st.wait(1300);
    st.act('mech', null); st.pose('mech', 'stand'); st.pose('minh', 'stand'); st.mood('mech', 'happy'); st.set('st-lb-mech', false);
  } },
  { key: ['a woman with a camera'], icon: '📷', label: 'camera', async play(st) {
    st.set('st-fix', false);
    await Promise.all([
      st.walk('minh', 2720, { speed: 150, lead: 110 }),
      st.walk('tom', 2660, { speed: 150, follow: false }),
    ]);
    st.chest('artist', null); st.hold('artist', 'e029_camera'); st.pose('artist', 'e029_photo');
    st.set('st-lb-camera');
    await st.wait(500);
    st.fx('sparkle', 2866, 150); st.sfx('camera');
    await st.wait(700);
    st.fx('sparkle', 2866, 150, { quiet: true });
    await st.wait(500);
    st.set('st-lb-camera', false);
  } },
  { key: ['What does she do'], icon: '❓', label: 'what does she do?', async play(st) {
    st.hold('artist', null); st.chest('artist', CAMCHEST); st.pose('artist', 'stand');
    st.set('st-lb-q2'); st.pose('tom', 'think');
    await st.say('tom', 'What does she do?', 1900);
    st.set('st-lb-q2', false); st.pose('tom', 'stand');
  } },
  { key: ['She is an artist'], icon: '🎨', label: 'artist', async play(st) {
    st.set('st-lb-artist'); st.mood('artist', 'joy');
    await st.say('minh', 'She is an artist.', 1800);
    st.mood('artist', 'happy');
  } },
  { key: ['draws pictures of the old streets'], icon: '🖼️', label: 'old streets', async play(st) {
    st.set('st-lb-artist', false);
    st.hold('artist', 'e029_brush'); st.pose('artist', 'e029_paint'); st.act('artist', 'paint');
    st.set('st-pic');
    await st.wait(2400);
    st.act('artist', null); st.set('st-lb-old'); st.fx('sparkle', 2940, 170);
    st.mood('minh', 'joy'); st.mood('tom', 'joy'); st.pose('tom', 'clap'); st.act('tom', 'clap');
    await st.wait(1000);
    st.act('tom', null); st.pose('tom', 'stand');
  } },
];

export default {
  id: 'en029', worldW: 3060, floor: FLOOR, viewTop: 40, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES,
  props: { e029_ladle: LADLE, e029_wrench: WRENCH, e029_camera: CAMERA, e029_brush: BRUSH, e029_whistle: WHISTLE },
  cast: [
    { id: 'dad', kind: 'adult', who: 'e029_doc', x: 636, s: 0.95 },
    { id: 'tmum', kind: 'adult', who: 'e029_tmum', x: 1010, s: 0.92 },
    { id: 'hoa', kind: 'adult', who: 'en_hoa', x: 1112, s: 0.92 },
    { id: 'police', kind: 'adult', who: 'e029_police', x: 1500, s: 0.95 },
    { id: 'lady', kind: 'adult', who: 'e029_lady', x: 1580, s: 0.88, face: -1 },
    { id: 'cook', kind: 'adult', who: 'e029_cook', x: 1976, s: 0.92 },
    { id: 'mech', kind: 'adult', who: 'e029_mech', x: 2450, s: 0.95 },
    { id: 'artist', kind: 'adult', who: 'e029_artist', x: 2866, s: 0.92 },
    { id: 'tom', kind: 'kid', who: 'en_tom_home', x: 40 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: 100 },
  ],
  init(st) {
    st.show('dad', false); st.chest('dad', STETHO);
    st.chest('tmum', TBOOK);
    st.chest('lady', SHOPBAG); st.pose('lady', 'carry');
    st.chest('artist', CAMCHEST);
    addHat(st, 'police', POLICE_CAP);
    addHat(st, 'cook', CHEF_HAT);
  },
};
