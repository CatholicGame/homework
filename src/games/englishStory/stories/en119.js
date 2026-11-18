/**
 * Bài 119 "The Marathon of Hope" (although / despite; bị động quá khứ): Terry Fox. Một thế giới đi từ trái sang phải:
 * sân bóng rổ ở Canada (Terry mê thể thao) → bệnh viện (bác sĩ báo tin năm 1977; Terry tập đi với chân giả bên thanh
 * vịn; gặp các bạn nhỏ bị ung thư; bong bóng nghĩ: bản đồ Canada và hộp quyên góp; áo "Marathon of Hope") → bờ biển
 * Đại Tây Dương ở St. John's (tháng 4 năm 1980 nhúng chân giả xuống biển rồi xuất phát) → đường cao tốc xuyên Canada
 * (rừng thông, cột cây số, xe tải nhỏ đi theo, mỗi ngày khoảng 42 km; sau 143 ngày, 5.373 km phải dừng ở Thunder Bay) →
 * hoàng hôn, ngôi sao sáng lên (giấc mơ của Terry còn mãi) → công viên hôm nay: cuộc chạy Terry Fox mỗi năm.
 * Chân giả: chân phải từ gối trở xuống thành thanh kim loại xám (class e119-pros trên nhân vật), dáng chạy nhún bước đôi.
 * Bệnh tật và cái chết diễn nhẹ nhàng, nhấn vào lòng dũng cảm và hy vọng.
 * Toạ độ cảnh: rộng 3500, cao 315, sàn y = 282. Trạng thái cảnh là class st-* trên <svg> (CSS ở dưới).
 */
import { CAST, lying } from '../../tiengViet3/cast.js';
import { KIT_CSS, L, sky, cloud, tree, bush, label, thought, flowerAt, road } from '../kit.js';

const FLOOR = 282;
const W = 3500;
const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
const X = { court: 200, hoop: 340, office: [440, 640], bars: [660, 800], ward: [820, 1060], sea: [1080, 1200], start: 1250, hw: [1200, 2560], stop: 2480, park: [2600, 3500], banner: 3050 };

Object.assign(CAST, {
  e119_terry: { adult: true, hair: 'short', hairC: '#A16207', top: 'tee', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#475569', shoe: '#F8FAFC' },
  e119_terryB: { adult: true, hair: 'short', hairC: '#A16207', top: 'tee', shirt: '#DC2626', bottom: 'shorts', bottomC: '#1F2937', shoe: '#F8FAFC' },
  e119_doc: { adult: true, hair: 'short', hairC: '#57534E', glasses: true, top: 'jacket', shirt: '#F8FAFC', inner: '#93C5FD', bottom: 'pants', bottomC: '#334155', shoe: '#1C1917' },
  e119_kid1: { hair: 'short', hairC: '#78350F', top: 'tee', shirt: '#93C5FD', bottom: 'pants', bottomC: '#BFDBFE', shoe: '#F8FAFC' },
  e119_kid2: { hair: 'bob', hairC: '#1F1716', top: 'tee', shirt: '#F9A8D4', bottom: 'pants', bottomC: '#FBCFE8', shoe: '#F8FAFC' },
  e119_kid3: { hair: 'spiky', hairC: '#FACC15', top: 'tee', shirt: '#BBF7D0', bottom: 'pants', bottomC: '#BBF7D0', shoe: '#F8FAFC' },
  e119_run1: { adult: true, hair: 'ponytail', hairC: '#7C2D12', top: 'tee', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#DC2626', shoe: '#F472B6' },
  e119_run2: { adult: true, hair: 'short', hairC: '#1F1716', top: 'tee', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#1D4ED8', shoe: '#22C55E' },
  e119_rkid: { hair: 'curly', hairC: '#FACC15', top: 'tee', shirt: '#FFFFFF', bottom: 'shorts', bottomC: '#DC2626', shoe: '#38BDF8' },
});

// ── Đồ vật ─────────────────────────────────────────────────────────────────
const BALL = `<g transform="translate(0 9)"><circle r="8" fill="#F97316" stroke="${L}" stroke-width="0.9"/><path d="M-8 0 H8 M0 -8 V8 M-5 -6 Q0 0 -5 6 M5 -6 Q0 0 5 6" stroke="${L}" stroke-width="0.7" fill="none"/></g>`;
/** Lá phong đỏ (gốc ở giữa). */
const MAPLE = (s = 1, c = '#DC2626') => `<path transform="scale(${s})" d="M0 -10 L2 -5 L6 -7 L5 -2 L9 -1 L5 2 L6 5 L1 4 L1 9 H-1 L-1 4 L-6 5 L-5 2 L-9 -1 L-5 -2 L-6 -7 L-2 -5Z" fill="${c}"/>`;
/** Chữ trên áo Terry: bản đồ Canada nhỏ + MARATHON OF HOPE (trước ngực, không lật). */
const SHIRT = `<g class="es-unflip" transform="translate(0 -12)"><path d="M-9 -4 Q-6 -9 0 -7 Q6 -10 9 -5 L8 2 Q0 5 -8 2Z" fill="#DC2626" opacity="0.85"/>
  <text y="9" text-anchor="middle" ${NUN} font-size="4" fill="#DC2626">MARATHON</text><text y="14" text-anchor="middle" ${NUN} font-size="4" fill="#DC2626">OF HOPE</text></g>`;
/** Xe tải nhỏ đi theo (nhìn nghiêng sang phải, gốc = giữa đáy). */
const wheel = (x) => `<g transform="translate(${x} -12)"><g class="e119-wh"><circle r="12" fill="#1F2937" stroke="${L}"/><circle r="5" fill="#CBD5E1"/><path d="M-5 0 H5 M0 -5 V5" stroke="#64748B" stroke-width="1.4"/></g></g>`;
const VAN = `<g class="e119-vb"><path d="M-82 -16 V-74 Q-82 -82 -74 -82 H36 Q48 -82 56 -64 L72 -46 Q80 -42 80 -32 V-16Z" fill="#F5F5F4" stroke="${L}" stroke-width="1.2"/>
  <path d="M38 -76 Q46 -74 52 -62 L64 -48 H38Z" fill="#BAE6FD" stroke="${L}" stroke-width="0.9"/><rect x="-74" y="-50" width="104" height="22" rx="3" fill="#FFFFFF" stroke="#DC2626" stroke-width="1.2"/>
  <text x="-22" y="-35" text-anchor="middle" ${NUN} font-size="9.5" fill="#DC2626">MARATHON OF HOPE</text>
  <path d="M-82 -58 H36" stroke="#DC2626" stroke-width="3"/><rect x="72" y="-36" width="8" height="6" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.6"/></g>${wheel(-50)}${wheel(48)}`;
const PROPS = { e119_ball: BALL, e119_flag: `<g transform="rotate(180)"><path d="M0 -2 V30" stroke="#78716C" stroke-width="1.6"/><g transform="translate(0 22)"><rect x="0" y="0" width="20" height="12" fill="#fff" stroke="${L}" stroke-width="0.6"/><rect x="0" y="0" width="5" height="12" fill="#DC2626"/><rect x="15" y="0" width="5" height="12" fill="#DC2626"/><g transform="translate(10 6)">${MAPLE(0.45)}</g></g></g>` };
const POSES = {
  e119_dribble: { R: [40, 20], L: [10, 4] },
  e119_shoot: { R: [165, 175], L: [150, 170], head: -8 },
  e119_bars: { R: [40, 20], L: [40, 20] },
  e119_fist: { R: [60, 150], L: [10, 4], head: -4 },
  e119_tired: { R: [20, -40], L: [10, 4], head: 12 },
  e119_tell: { R: [70, 110], L: [10, 4], head: 6 },
};

// ── Cảnh ──────────────────────────────────────────────────────────────────
const pine = (x, s = 1) => `<g transform="translate(${x} ${FLOOR - 40}) scale(${s})"><rect x="-4" y="-16" width="8" height="18" fill="#78350F"/>
  <path d="M0 -96 L22 -50 H12 L28 -16 H-28 L-12 -50 H-22Z" fill="#15803D" stroke="${L}" stroke-width="1"/></g>`;
const kmPost = (x, t) => `<g transform="translate(${x} ${FLOOR - 40})"><path d="M0 0 V-34" stroke="#78716C" stroke-width="2.4"/><rect x="-18" y="-50" width="36" height="18" rx="2" fill="#16A34A" stroke="${L}" stroke-width="0.8"/>
  <text y="-37" text-anchor="middle" ${NUN} font-size="10" fill="#fff">${t}</text></g>`;

function bg() {
  const [o0, o1] = X.office, [b0, b1] = X.bars, [w0, w1] = X.ward, [s0, s1] = X.sea, [h0, h1] = X.hw, [p0] = X.park;
  return `
  ${sky(0, W, 315, 'e119sky')}
  ${cloud(120, 56, 0.8, 0)}${cloud(1300, 50, 0.9, 2)}${cloud(1900, 62, 0.8, 4)}${cloud(2900, 48, 0.9, 1)}
  <!-- sân bóng rổ -->
  <path d="M0 230 Q120 190 260 220 T${o0} 214 V${FLOOR} H0Z" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${pine(40, 1)}
  <rect x="0" y="${FLOOR}" width="${o0}" height="33" fill="#F97316" stroke="${L}"/><path d="M60 ${FLOOR + 6} H${o0 - 20}" stroke="#fff" stroke-width="2"/>
  <g transform="translate(${X.hoop} 0)"><path d="M20 ${FLOOR} V110" stroke="#64748B" stroke-width="5"/><rect x="-8" y="96" width="34" height="28" fill="#fff" stroke="${L}"/>
    <path d="M-10 124 H8" stroke="#EA580C" stroke-width="3"/><path d="M-10 124 L-6 140 H4 L8 124" stroke="#fff" stroke-width="1" fill="none"/></g>
  <g transform="translate(110 0)"><path d="M0 ${FLOOR} V70" stroke="#78716C" stroke-width="3"/><g class="ek-flag" style="transform-origin:0 81px">
    <rect x="0" y="70" width="48" height="26" fill="#fff" stroke="${L}" stroke-width="0.8"/><rect x="0" y="70" width="12" height="26" fill="#DC2626"/><rect x="36" y="70" width="12" height="26" fill="#DC2626"/>
    <g transform="translate(24 83)">${MAPLE(0.95)}</g></g></g>
  <!-- bệnh viện -->
  <rect x="${o0}" y="20" width="${w1 - o0}" height="${FLOOR - 20}" fill="#F0F9FF" stroke="${L}"/>
  <rect x="${o0}" y="20" width="${w1 - o0}" height="12" fill="#BAE6FD" stroke="${L}"/>
  <rect x="${o0}" y="${FLOOR}" width="${w1 - o0}" height="33" fill="#CBD5E1" stroke="${L}"/>${Array.from({ length: 11 }, (_, i) => `<path d="M${o0 + i * 60} ${FLOOR} V315" stroke="#94A3B8"/>`).join('')}
  ${[o1, b1].map((x) => `<rect x="${x - 4}" y="20" width="10" height="${FLOOR - 20}" fill="#BAE6FD" stroke="${L}"/>`).join('')}
  <!-- phòng bác sĩ: bàn, ảnh phim phổi -->
  <rect x="${o0 + 20}" y="80" width="60" height="50" fill="#1F2937" stroke="${L}"/><path d="M${o0 + 36} 90 Q${o0 + 30} 110 ${o0 + 40} 124 M${o0 + 64} 90 Q${o0 + 70} 110 ${o0 + 60} 124 M${o0 + 50} 88 V126" stroke="#E2E8F0" stroke-width="2" fill="none"/>
  <rect x="${o0 + 110}" y="96" width="60" height="44" fill="#BAE6FD" stroke="${L}"/>
  <!-- thanh vịn tập đi -->
  <g><path d="M${b0 + 6} ${FLOOR} V214 M${b1 - 16} ${FLOOR} V214 M${b0 + 6} 214 H${b1 - 16}" stroke="#94A3B8" stroke-width="4" fill="none"/>
    <path d="M${b0 + 6} 222 H${b1 - 16}" stroke="#CBD5E1" stroke-width="3"/></g>
  <!-- phòng các bạn nhỏ -->
  ${[0, 1, 2, 3, 4].map((i) => `<path d="M${w0 + 20 + i * 48} 40 l12 26 l12 -26" stroke="${['#F472B6', '#FACC15', '#38BDF8', '#4ADE80', '#A78BFA'][i]}" stroke-width="3" fill="none"/>`).join('')}
  <g><path d="M${w0 + 20} ${FLOOR} V214 M${w0 + 140} ${FLOOR} V232" stroke="#94A3B8" stroke-width="3"/><rect x="${w0 + 18}" y="244" width="124" height="9" rx="2" fill="#F8FAFC" stroke="${L}"/>
    ${lying(w0 + 96, 248, 'e119_kid1', { s: 0.8, mood: 'happy', blanket: '#FDE68A', len: 100 })}</g>
  <g><path d="M${w0 + 150} ${FLOOR} V226 M${w0 + 234} ${FLOOR} V236" stroke="#94A3B8" stroke-width="3"/><rect x="${w0 + 146}" y="248" width="92" height="9" rx="2" fill="#F8FAFC" stroke="${L}"/></g>
  <!-- biển Đại Tây Dương, St. John's -->
  <rect x="${w1 + 6}" y="${FLOOR}" width="${s0 - w1 - 6}" height="33" fill="#A8A29E" stroke="${L}"/>
  <path d="M${s0 - 10} ${FLOOR} Q${s0 + 30} 288 ${s0 + 60} 300 L${s1} 300 V315 H${s0 - 10}Z" fill="#FDE68A" stroke="${L}"/>
  <rect x="${s0}" y="264" width="${s1 - s0}" height="${315 - 264}" fill="#38BDF8" stroke="${L}" class="e119-sea"/>
  <g class="ek-wave">${[0, 1, 2].map((i) => `<path d="M${s0 + 10 + i * 36} ${272 + i * 8} q6 -4 12 0 q6 4 12 0" stroke="#E0F2FE" stroke-width="2" fill="none"/>`).join('')}</g>
  <g transform="translate(${s0 + 20} 230)"><path d="M0 0 L10 -60 L20 0Z" fill="#fff" stroke="${L}"/><path d="M4 -24 H16 M6 -40 H14" stroke="#DC2626" stroke-width="5"/></g>
  <!-- đường cao tốc -->
  <path d="M${h0} 220 L${h0 + 200} 180 L${h0 + 380} 214 L${h0 + 600} 170 L${h0 + 820} 210 L${h0 + 1040} 176 L${h1} 216 V${FLOOR - 40} H${h0}Z" fill="#A7C7A0" stroke="${L}" stroke-width="0.8"/>
  ${[1260, 1340, 1520, 1610, 1780, 1880, 2010, 2140, 2230, 2380].map((x, i) => pine(x, 0.8 + (i % 3) * 0.12)).join('')}
  <rect x="${h0}" y="${FLOOR - 40}" width="${W - h0}" height="40" fill="#86EFAC" stroke="${L}" stroke-width="0.8"/>
  ${road(h0, h1 - h0 + 60, FLOOR + 10)}
  ${kmPost(1460, 'km 10')}${kmPost(1820, 'km 42')}
  <g transform="translate(${X.stop + 40} ${FLOOR - 40})"><path d="M-30 0 V-70 M30 0 V-70" stroke="#78716C" stroke-width="3"/><rect x="-52" y="-100" width="104" height="34" rx="3" fill="#16A34A" stroke="${L}"/>
    <text y="-78" text-anchor="middle" ${NUN} font-size="12" fill="#fff">THUNDER BAY</text></g>
  <g class="e119-dusk"><rect x="${h0}" y="0" width="${W - h0}" height="315" fill="#7C2D12"/></g>
  <g class="e119-star"><g transform="translate(${X.stop - 40} 80)"><circle r="26" fill="url(#e119glow)"/><path d="M0 -14 L4 -4 L14 -4 L6 2 L9 12 L0 6 L-9 12 L-6 2 L-14 -4 L-4 -4Z" fill="#FEF08A" stroke="#F59E0B" stroke-width="1"/></g></g>
  <defs><radialGradient id="e119glow"><stop offset="0" stop-color="#FEF9C3" stop-opacity="0.9"/><stop offset="1" stop-color="#FEF9C3" stop-opacity="0"/></radialGradient></defs>
  <!-- công viên hôm nay -->
  <rect x="${p0}" y="${FLOOR}" width="${W - p0}" height="33" fill="#86EFAC" stroke="${L}"/><path d="M${p0} ${FLOOR + 8} H${W}" stroke="#D6D3D1" stroke-width="12"/>
  ${tree(2680, FLOOR, 1, '')}${tree(3420, FLOOR, 1.1, '')}${bush(3300, FLOOR, 0.8)}${[2760, 2780, 3340, 3360].map((x, i) => flowerAt(x, FLOOR + 3, ['#F472B6', '#FDE047', '#A78BFA', '#FB7185'][i])).join('')}
  <g transform="translate(${X.banner} 0)"><path d="M-110 ${FLOOR} V76 M110 ${FLOOR} V76" stroke="#78716C" stroke-width="4"/>
    <rect x="-112" y="72" width="224" height="36" rx="4" fill="#fff" stroke="#DC2626" stroke-width="2"/><text x="10" y="96" text-anchor="middle" ${NUN} font-size="17" fill="#DC2626">TERRY FOX RUN</text>
    <g transform="translate(-92 90)">${MAPLE(1.1)}</g></g>
  <g transform="translate(${X.banner + 170} ${FLOOR})"><rect x="-20" y="-50" width="40" height="50" fill="#FDE68A" stroke="${L}"/><rect x="-10" y="-50" width="20" height="4" fill="${L}"/>
    <text y="-24" text-anchor="middle" ${NUN} font-size="8" fill="#B45309">for</text><text y="-14" text-anchor="middle" ${NUN} font-size="8" fill="#B45309">research</text></g>`;
}

function fg() {
  const [w0] = X.ward;
  const map = `<rect x="-72" y="-40" width="144" height="84" rx="10" fill="#E0F2FE"/>
    <path d="M-62 -6 Q-60 -26 -40 -30 Q-20 -36 0 -28 Q20 -36 40 -22 Q58 -14 62 4 Q50 6 40 18 Q20 22 0 20 H-40 Q-58 18 -62 -6Z" fill="#FECACA" stroke="${L}" stroke-width="1"/>
    <path class="e119-route" d="M56 4 Q30 10 10 8 T-30 10 T-56 2" stroke="#DC2626" stroke-width="2.4" fill="none" stroke-dasharray="4 3"/>
    <circle cx="56" cy="4" r="3.4" fill="#DC2626"/><text x="0" y="-4" text-anchor="middle" ${NUN} font-size="13" fill="#B91C1C">CANADA</text>
    <g transform="translate(-44 32)"><rect x="-12" y="-8" width="24" height="16" rx="2" fill="#FDE68A" stroke="${L}" stroke-width="0.8"/><circle cx="0" cy="-12" r="4" fill="#FACC15" stroke="#B45309" stroke-width="0.7"/></g>`;
  return `
  ${bush(20, FLOOR + 30, 0.6)}
  <!-- hai bạn nhỏ ngồi giường (chăn che chân) -->
  <g transform="translate(${w0 + 200} 0)"><path d="M-40 250 Q-38 228 -12 226 H34 Q44 230 42 250Z" fill="#BFDBFE" stroke="${L}" stroke-width="1"/></g>
  ${thought(X.bars[1] - 10, 84, 170, 104, map, [X.bars[1] + 40, 120], 'e119-bub')}
  <!-- đếm km, ngày -->
  <g class="e119-cnt"><g class="e119-cntg" transform="translate(0 0)"><rect x="-74" y="-22" width="148" height="34" rx="12" fill="#fff" stroke="#DC2626" stroke-width="2"/>
    <text class="e119-n" x="-12" y="4" text-anchor="end" ${NUN} font-size="20" fill="#DC2626">42</text><text class="e119-u" x="-4" y="4" ${NUN} font-size="14" fill="#DC2626">km a day</text></g></g>
  <g class="e119-days"><g transform="translate(${X.stop - 120} 60)"><rect x="-56" y="-18" width="112" height="28" rx="10" fill="#fff" stroke="#57534E" stroke-width="1.6"/>
    <text class="e119-d" x="-6" y="2" text-anchor="end" ${NUN} font-size="16" fill="#57534E">143</text><text x="0" y="2" ${NUN} font-size="12" fill="#57534E">days</text></g></g>
  <g class="e119-sweat">${[0, 1, 2].map((i) => `<path class="e119-drop" style="animation-delay:${i * 0.3}s" d="M0 -4 q-3 4 0 6 q3 -2 0 -6Z" fill="#7DD3FC" stroke="#38BDF8" stroke-width="0.5"/>`).join('')}</g>
  <!-- nhãn -->
  <g class="e119-lb e119-lb-can">${label(X.court, 46, 'Canada', '#DC2626', 17)}</g>
  <g class="e119-lb e119-lb-1977">${label(X.office[0] + 110, 52, '1977 · 18', '#57534E', 16)}</g>
  <g class="e119-lb e119-lb-leg">${label(X.bars[0] + 60, 60, 'an artificial leg', '#475569', 15)}</g>
  <g class="e119-lb e119-lb-kids">${label(w0 + 120, 100, 'children with cancer', '#7C3AED', 13)}</g>
  <g class="e119-lb e119-lb-across">${label(X.bars[1] - 10, 22 + 30, 'across Canada', '#B91C1C', 14)}</g>
  <g class="e119-lb e119-lb-hope">${label(X.ward[1] - 100, 60, 'the Marathon of Hope', '#DC2626', 15)}</g>
  <g class="e119-lb e119-lb-1980">${label(X.start + 50, 56, 'April 1980', '#16A34A', 16)}</g>
  <g class="e119-lb e119-lb-pain">${label(1700, 52, 'Despite the pain', '#9A3412', 15)}</g>
  <g class="e119-lb e119-lb-stop">${label(X.stop + 40, 100 - 2, 'had to stop', '#57534E', 14)}</g>
  <g class="e119-lb e119-lb-dream">${label(X.stop - 40, 130, 'his dream did not', '#B45309', 15)}</g>
  <g class="e119-lb e119-lb-today">${label(X.banner, 52, 'Today · every year', '#16A34A', 16)}</g>`;
}

const LBS = ['can', '1977', 'leg', 'kids', 'across', 'hope', '1980', 'pain', 'stop', 'dream', 'today'];
const CSS = `
.e119-lb { opacity: 0; transition: opacity .35s; }
${LBS.map((k) => `.st-lb-${k} .e119-lb-${k}`).join(', ')} { opacity: 1; }
.e119-pros .pp-legR path[stroke="#FADCC4"], .e119-pros .pp-side .sv-bob > g:nth-child(3) path[stroke="#FADCC4"] { stroke: #7C8797; }
.e119-pros .pp-legR path[stroke="#6B4A3A"] { stroke: #475569; }
.e119-run.is-walk .sv-bob { animation: e119Hop calc(var(--p, .3s)) ease-in-out infinite alternate; }
@keyframes e119Hop { 0% { translate: 0 0; } 40% { translate: 0 -5px; } 100% { translate: 0 -1px; } }
.e119-bub { opacity: 0; transform: scale(.4); transform-origin: ${X.bars[1] + 40}px 120px; transition: opacity .3s, transform .45s cubic-bezier(.3,1.5,.6,1); }
.st-bub .e119-bub { opacity: 1; transform: none; }
.e119-route { stroke-dashoffset: 0; clip-path: inset(0 0 0 100%); }
.st-route .e119-route { clip-path: inset(0 0 0 0); transition: clip-path 1.6s linear; }
.e119-cnt, .e119-days { opacity: 0; transition: opacity .3s; } .st-cnt .e119-cnt, .st-days .e119-days { opacity: 1; }
.e119-sweat { opacity: 0; } .st-sweat .e119-sweat { opacity: 1; }
.e119-drop { animation: e119Drop .9s ease-in infinite; } @keyframes e119Drop { from { transform: translate(0, 0); opacity: 1; } to { transform: translate(-6px, 14px); opacity: 0; } }
.e119-dusk { opacity: 0; transition: opacity 1.2s; pointer-events: none; } .st-dusk .e119-dusk { opacity: .35; }
.e119-star { opacity: 0; transform: scale(.3); transform-box: fill-box; transform-origin: center; transition: opacity .6s, transform .8s cubic-bezier(.3,1.5,.6,1); }
.st-star .e119-star { opacity: 1; transform: none; animation: e119Tw 1.2s ease-in-out infinite alternate; }
@keyframes e119Tw { to { filter: brightness(1.15); scale: 1.08; } }
.es-thing.is-walk .e119-wh { animation: e119Spin .5s linear infinite; transform-box: fill-box; transform-origin: center; }
@keyframes e119Spin { to { transform: rotate(360deg); } }
.es-thing.is-walk .e119-vb { animation: ppBob .2s ease-in-out infinite alternate; }
.es-ac.e119-fade { transition: opacity 1.6s; }
.act-e119dribble .pp-fowR { animation: e119Dr .25s ease-in-out infinite alternate; }
@keyframes e119Dr { from { transform: rotate(-10deg) translateY(0); } to { transform: rotate(12deg) translateY(4px); } }
@media (prefers-reduced-motion: reduce) {
  .e119-run.is-walk .sv-bob { animation: none; } .act-e119dribble .pp-fowR { animation-duration: .6s; }
  .st-star .e119-star { animation: none; }
}
`;

const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
const lb = (st, k, on = true) => st.set(`st-lb-${k}`, on);
const cls = (st, id, c, on = true) => st.a(id).el.classList.toggle(c, on);
/** Đặt bảng đếm km theo Terry (toạ độ cảnh). */
const cntAt = (st, x, y) => st.fgEl.querySelector('.e119-cntg')?.setAttribute('transform', `translate(${x} ${y})`);
const setN = (st, sel, v) => { const n = st.fgEl.querySelector(sel); if (n) n.textContent = v; };
const count = async (st, sel, to, steps, ms, fmt = String, snd = 'tick') => {
  if (st.instant) { setN(st, sel, fmt(to)); return; }
  for (let i = 1; i <= steps; i++) { setN(st, sel, fmt(Math.round((to * i) / steps))); if (i % 2) st.sfx(snd, { vol: 0.25, rate: 1 + i / (steps * 2) }); await st.wait(ms); }
};

const BEATS = [
  { key: ['a young Canadian who loved sport'], icon: '🏀', label: 'loved sport', async play(st) {
    st.look(X.court + 40);
    lb(st, 'can'); st.sfx('ding', { vol: 0.4 });
    st.hold('terry', 'e119_ball'); st.pose('terry', 'e119_dribble'); st.act('terry', 'e119dribble');
    for (let i = 0; i < 4; i++) { st.sfx('bump', { vol: 0.5, rate: 1.3 }); await st.wait(260); }
    st.act('terry', null); st.pose('terry', 'e119_shoot'); st.hold('terry', null);
    await st.fly(BALL, [X.court + 70, 140], [X.hoop - 2, 118], { size: 20, dur: 650 });
    st.sfx('whoosh', { vol: 0.4 }); st.sfx('cheer', { vol: 0.3 });
    st.mood('terry', 'joy'); st.pose('terry', 'cheer');
    await st.wait(900);
    st.pose('terry', 'stand');
  } },
  { key: ['In 1977', 'he was told that he had cancer'], icon: '🩺', label: 'he had cancer', async play(st) {
    lb(st, 'can', false);
    st.look(X.office[0] + 110, { dur: 1600 });
    await st.walk('terry', X.office[0] + 150, { speed: 140, follow: false });
    st.face('terry', -1);
    lb(st, '1977'); st.sfx('page-turn', { vol: 0.5 });
    st.pose('doc', 'e119_tell'); st.talk('doc', true);
    await st.wait(1400);
    st.talk('doc', false);
    st.mood('terry', 'sad'); st.pose('terry', 'sad'); st.sfx('tick', { vol: 0.3 });
    await st.wait(1200);
    st.pose('doc', 'stand');
  } },
  { key: ['His right leg was removed', 'walk with an artificial leg'], icon: '🦿', label: 'an artificial leg', async play(st) {
    lb(st, '1977', false);
    cls(st, 'terry', 'e119-pros');
    st.place('terry', X.bars[0] + 6, FLOOR, 1); st.mood('terry', 'happy');
    st.look(X.bars[0] + 70, { instant: true });
    lb(st, 'leg'); st.sfx('ding', { vol: 0.4 });
    st.pose('terry', 'e119_bars');
    await st.walk('terry', X.bars[1] - 30, { speed: 45, follow: false, pose: 'e119_bars', after: 'e119_bars' });
    st.mood('terry', 'joy'); st.pose('terry', 'e119_fist'); st.sfx('clap', { vol: 0.4 });
    st.pose('doc', 'clap'); st.act('doc', 'clap');
    await st.wait(800);
    st.act('doc', null); st.pose('doc', 'stand'); st.pose('terry', 'stand');
  } },
  { key: ['Terry met children with cancer'], icon: '🧒', label: 'children with cancer', async play(st) {
    lb(st, 'leg', false);
    st.show('doc', false);
    st.look(X.ward[0] + 120, { dur: 1400 });
    await st.walk('terry', X.ward[0] - 6, { speed: 110, follow: false });
    lb(st, 'kids');
    st.pose('terry', 'wave'); st.act('terry', 'wave');
    st.pose('k2', 'sitWave'); st.act('k2', 'wave'); st.pose('k3', 'wave'); st.act('k3', 'wave');
    st.sfx('giggle', { vol: 0.35 });
    for (const id of ['k2', 'k3']) st.mood(id, 'joy');
    await st.wait(1100);
    for (const id of ['terry', 'k2', 'k3']) st.act(id, null);
    st.pose('k2', 'sitDesk'); st.pose('k3', 'stand'); st.pose('terry', 'stand');
    st.fx('hearts', X.ward[0] + 120, 150);
    await st.wait(700);
  } },
  { key: ['Although he had only one leg', 'run across Canada', 'raise money for cancer research'], icon: '🗺️', label: 'run across Canada', async play(st) {
    lb(st, 'kids', false);
    st.face('terry', -1);
    st.look(X.bars[1] + 20);
    st.set('st-bub'); st.sfx('pop', { vol: 0.5 });
    st.pose('terry', 'think');
    await st.wait(500);
    lb(st, 'across');
    st.set('st-route'); await st.loop('pencil', () => st.wait(1600), { vol: 0.6 });
    st.sfx('cash', { vol: 0.4 });
    st.pose('terry', 'e119_fist'); st.mood('terry', 'joy');
    await st.wait(1200);
  } },
  { key: ['the Marathon of Hope'], icon: '💛', label: 'Marathon of Hope', async play(st) {
    off(st, 'st-bub', 'st-route', 'st-lb-across');
    st.chest('terry', SHIRT); st.fx('poof', X.bars[1] - 30, 190, { quiet: true }); st.sfx('poof', { vol: 0.4 });
    st.look(X.ward[0] - 10, { dur: 1200 });
    await st.wait(600);
    lb(st, 'hope'); st.sfx('ding', { vol: 0.5 });
    st.pose('terry', 'e119_fist'); st.mood('terry', 'joy');
    st.pose('k3', 'cheer'); st.act('k3', 'hop'); st.sfx('cheer', { vol: 0.3 });
    await st.wait(1400);
    st.act('k3', null); st.pose('k3', 'stand'); st.pose('terry', 'stand');
  } },
  { key: ['Terry started in April 1980'], icon: '🌊', label: 'April 1980', async play(st) {
    lb(st, 'hope', false);
    for (const id of ['k2', 'k3']) st.show(id, false);
    st.show('van', true); st.place('van', X.start - 120, FLOOR + 6, 1);
    st.place('terry', X.sea[0] + 70, FLOOR, -1);
    st.look(X.start - 60, { instant: true });
    lb(st, '1980'); st.sfx('boat-horn', { vol: 0.25 });
    st.pose('terry', 'stand');
    await st.wait(400);
    st.sfx('splash', { vol: 0.6 }); st.fx('drops', X.sea[0] + 60, 286);
    await st.wait(700);
    cls(st, 'terry', 'e119-run');
    st.sfx('whistle', { vol: 0.4 }); st.pose('terry', 'e119_fist');
    await st.wait(300);
    await st.walk('terry', X.start + 80, { speed: 150, lead: 60 });
    st.mood('terry', 'joy');
  } },
  { key: ['Despite the pain', 'about 42 kilometres a day'], icon: '🏃', label: '42 km a day', async play(st) {
    lb(st, '1980', false);
    lb(st, 'pain'); st.mood('terry', 'sad'); st.set('st-sweat');
    cntAt(st, 1760, 80); setN(st, '.e119-n', '0'); st.set('st-cnt');
    const van = st.walk('van', 1620, { speed: 140, follow: false });
    const run = st.walk('terry', 1760, { speed: 150, lead: 0 });
    await st.loop('car-go', async () => { await count(st, '.e119-n', 42, 14, 160); await run; await van; }, { vol: 0.35 });
    st.set('st-sweat', false); st.mood('terry', 'joy'); st.pose('terry', 'e119_fist');
    await st.wait(600);
    st.pose('terry', 'stand');
  } },
  { key: ['After 143 days and 5,373 kilometres', 'he had to stop', 'the cancer had spread to his lungs'], icon: '🛑', label: 'had to stop', async play(st) {
    lb(st, 'pain', false);
    st.set('st-days'); setN(st, '.e119-d', '0');
    cntAt(st, X.stop - 120, 98); setN(st, '.e119-u', 'km');
    const van = st.walk('van', X.stop - 150, { speed: 260, follow: false });
    const run = st.walk('terry', X.stop - 20, { speed: 260, lead: -20 });
    await count(st, '.e119-d', 143, 12, 120);
    await count(st, '.e119-n', 5373, 12, 110, (v) => v.toLocaleString('en-US'));
    await run; await van;
    st.mood('terry', 'sad'); st.pose('terry', 'e119_tired'); st.sfx('cough', { vol: 0.35 });
    lb(st, 'stop');
    await st.wait(1500);
  } },
  { key: ['Terry died the next year', 'his dream did not'], icon: '⭐', label: 'his dream did not', async play(st) {
    off(st, 'st-lb-stop', 'st-days', 'st-cnt');
    st.look(X.stop - 30);
    st.set('st-dusk'); st.sfx('wind', { vol: 0.4 });
    await st.wait(600);
    cls(st, 'terry', 'e119-fade'); st.show('terry', false);
    await st.wait(1200);
    st.set('st-star'); st.sfx('sparkle', { vol: 0.4 });
    await st.wait(500);
    lb(st, 'dream');
    await st.wait(1300);
  } },
  { key: ['Today', 'a Terry Fox Run is held every year', 'raise money for research'], icon: '🎽', label: 'Terry Fox Run', async play(st) {
    off(st, 'st-lb-dream', 'st-dusk', 'st-star');
    st.show('van', false);
    const R = ['r1', 'r2', 'rk', 'minh', 'lan'];
    for (const id of R) st.show(id, true);
    st.look(X.banner, { instant: true });
    lb(st, 'today'); st.sfx('cheer', { vol: 0.4 });
    const ends = { r1: X.banner + 120, r2: X.banner + 40, rk: X.banner - 30, minh: X.banner - 90, lan: X.banner + 150 };
    await Promise.all(R.map((id) => st.walk(id, ends[id], { speed: 150, follow: false })));
    st.hold('lan', null);
    st.pose('lan', 'give'); st.face('lan', 1); st.sfx('cash', { vol: 0.5 });
    await st.wait(300);
    for (const id of R) { st.mood(id, 'joy'); if (id !== 'lan') { st.pose(id, 'cheer'); } }
    st.act('minh', 'hop'); st.act('rk', 'hop'); st.sfx('clap', { vol: 0.4 });
    await st.wait(1300);
    st.act('minh', null); st.act('rk', null);
  } },
];

export default {
  id: 'en119', worldW: W, floor: FLOOR, viewTop: 30, camStart: 0, css: KIT_CSS + CSS, bg, fg, beats: BEATS,
  poses: POSES, props: PROPS,
  order: [0, 2, 4, 6, 8, 10],
  cast: [
    { id: 'van', kind: 'thing', x: X.ward[1] - 40, y: FLOOR + 6, svg: VAN, box: [-86, -88, 170, 92] },
    { id: 'doc', kind: 'adult', who: 'e119_doc', x: X.office[0] + 70 },
    { id: 'k2', kind: 'kid', who: 'e119_kid2', x: X.ward[0] + 196, y: 250, face: -1 },
    { id: 'k3', kind: 'kid', who: 'e119_kid3', x: X.ward[0] + 136 },
    { id: 'terry', kind: 'adult', who: 'e119_terry', x: X.court - 20 },
    { id: 'r1', kind: 'adult', who: 'e119_run1', x: X.park[0] - 40 },
    { id: 'r2', kind: 'adult', who: 'e119_run2', x: X.park[0] - 140 },
    { id: 'rk', kind: 'kid', who: 'e119_rkid', x: X.park[0] - 200 },
    { id: 'minh', kind: 'kid', who: 'en_minh_home', x: X.park[0] - 260 },
    { id: 'lan', kind: 'kid', who: 'en_lan_home', x: X.park[0] - 100, s: 1.04 },
  ],
  init(st) {
    for (const id of ['van', 'r1', 'r2', 'rk', 'minh', 'lan']) st.show(id, false);
    st.pose('k2', 'sitDesk');
  },
};
