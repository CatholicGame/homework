/**
 * 🌡️ Nhiệt độ (Toán 3: Bài 33 Nhiệt độ. Đơn vị đo nhiệt độ, °C). Bốn cấp, mỗi lượt số mới:
 *   1 Đọc nhiệt kế: nhiệt kế to (vạch chia 1 °C hoặc 2 °C, số ghi mỗi 10 °C), em gõ số đo; đúng thì ngón tay
 *     trượt từ vạch có số ngay dưới đầu cột đỏ lên, đếm từng vạch.
 *   2 Chỉnh nhiệt kế: kéo cột đỏ (hoặc bấm ▲ ▼) tới nhiệt độ đề cho, bấm Xong; ngón tay đếm lại để kiểm tra.
 *   3 So sánh và tính: hai, ba nhiệt kế của các địa phương (nhiệt độ thật theo mùa) hoặc các buổi trong ngày;
 *     chạm nhiệt kế nơi nóng hơn / lạnh hơn, rồi gõ "nóng hơn bao nhiêu độ C", "tăng thêm", "giảm đi".
 *     Kiểm tra: vạch nét đứt ngang ở nhiệt độ thấp, ngoặc vàng trên nhiệt kế cao ghi phần chênh.
 *   4 Hợp lí: chọn nhiệt độ thích hợp cho một tình huống (nước đá đang tan 0 °C, cơ thể người 37 °C, nước sôi 100 °C…);
 *     chọn sai thì cột đỏ dâng tới số đã chọn và thầy nói vì sao không hợp lí.
 * Bố cục giữ nguyên cả lượt: dòng đề, nhiệt kế, cột bên (hình, ô số, nút), dòng trả lời (cấp 3) đều giữ chỗ từ đầu.
 */

import { mountDrill, shake, setActive, flyDigit, fresh, sfx, sleep, how, calmMotion, TEACHER, INK, EDGE, MINUS } from './kit.js';

const RED = '#EF4444';
const SKIN = '#FCD9B6';
const DEG = '°C';
const tC = (v) => `${v} ${DEG}`;
/** Chữ hiện: "2 °C" không bị ngắt dòng giữa số và °C. */
const nb = (s) => String(s).replace(/ °C/g, ' °C');

/** Câu cho giọng đọc: "32 °C" → "32 độ C", dấu trừ thành chữ. */
const spk = (s) => String(s).replace(/<[^>]*>/g, '').replace(/💡\s*/g, '').replace(/\s?°C/g, ' độ C').replace(/ − /g, ' trừ ').replace(/ = /g, ' bằng ');

// ── Hình minh hoạ (SVG riêng, 200 × 200, nét mực dày) ────────────────────────────────────────────────
const S4 = `stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
const cloudP = (x, y, s, fill = '#fff') => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-48 18 Q-62 18 -60 2 Q-58 -14 -40 -12 Q-36 -36 -10 -34 Q10 -48 28 -28 Q52 -32 54 -8 Q70 -4 64 12 Q60 20 48 18 Z" fill="${fill}" ${S4}/></g>`;
const sunP = (x, y, r) => `<g transform="translate(${x} ${y})">${Array.from({ length: 8 }, (_, i) => `<path d="M0 ${-r - 10} V${-r - 26}" transform="rotate(${i * 45})" ${S4}/>`).join('')}<circle r="${r}" fill="#FDE047" ${S4}/>
  <circle cx="${-r * 0.32}" cy="${-r * 0.1}" r="${r * 0.09}" fill="${INK}"/><circle cx="${r * 0.32}" cy="${-r * 0.1}" r="${r * 0.09}" fill="${INK}"/><path d="M${-r * 0.32} ${r * 0.28} Q0 ${r * 0.55} ${r * 0.32} ${r * 0.28}" fill="none" ${S4}/></g>`;
const flake = (x, y) => `<g transform="translate(${x} ${y})" stroke="#38BDF8" stroke-width="4" stroke-linecap="round"><path d="M0 -10 V10 M-9 -5 L9 5 M-9 5 L9 -5"/></g>`;
const steam = (x, y) => `<g fill="none" stroke="#94A3B8" stroke-width="5" stroke-linecap="round">${[-22, 0, 22].map(d => `<path d="M${x + d} ${y} q-10 -14 0 -26 q10 -12 0 -26"/>`).join('')}</g>`;
const kidFace = (cheek, extra = '') => `<circle cx="100" cy="104" r="62" fill="${SKIN}" ${S4}/>
  <path d="M40 92 Q46 34 100 34 Q154 34 160 92 Q140 62 100 64 Q60 62 40 92 Z" fill="#3F3A40"/>
  <circle cx="78" cy="104" r="6" fill="${INK}"/><circle cx="122" cy="104" r="6" fill="${INK}"/>
  <circle cx="64" cy="124" r="10" fill="${cheek}" opacity=".7"/><circle cx="136" cy="124" r="10" fill="${cheek}" opacity=".7"/>${extra}`;
const ART = {
  sun: () => `${sunP(100, 96, 46)}<path d="M10 186 Q100 160 190 186" fill="none" stroke="#22C55E" stroke-width="8" stroke-linecap="round"/>`,
  sunCloud: () => `${sunP(124, 78, 38)}${cloudP(78, 128, 1.1)}`,
  cloud: () => `${cloudP(76, 82, 1)}${cloudP(124, 128, 1.15, '#E2E8F0')}`,
  cold: () => `${cloudP(100, 74, 1.35, '#CBD5E1')}${flake(52, 140)}${flake(100, 160)}${flake(148, 140)}${flake(76, 182)}${flake(124, 186)}`,
  snow: () => `<path d="M6 186 L74 70 L110 124 L138 86 L196 186 Z" fill="#94A3B8" ${S4}/><path d="M54 104 L74 70 L92 98 L80 92 L70 104 Z M126 102 L138 86 L152 108 Z" fill="#fff" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>${flake(30, 40)}${flake(150, 36)}${flake(176, 70)}`,
  sunrise: () => `<clipPath id="g3nHz"><rect width="200" height="140"/></clipPath><g clip-path="url(#g3nHz)">${sunP(100, 150, 40)}</g><path d="M0 140 H200" stroke="${INK}" stroke-width="5"/><path d="M0 140 Q60 118 110 140 Q160 124 200 140 V200 H0 Z" fill="#86EFAC" ${S4}/>`,
  moon: () => `<path d="M128 40 A62 62 0 1 0 150 150 A50 50 0 1 1 128 40 Z" fill="#FEF08A" ${S4}/><g fill="#FDE047" ${S4}><path d="M52 44 l5 10 11 2 -8 8 2 11 -10 -5 -10 5 2 -11 -8 -8 11 -2 Z" transform="scale(.8) translate(10 10)"/></g><circle cx="168" cy="60" r="5" fill="#FDE047"/><circle cx="40" cy="150" r="4" fill="#FDE047"/>`,
  ice: () => `<path d="M42 40 H158 L144 186 H56 Z" fill="#E0F2FE" ${S4}/><path d="M48 92 H152 L144 182 H56 Z" fill="#BAE6FD"/>
    <g fill="#F0F9FF" ${S4}><rect x="58" y="62" width="40" height="40" rx="6" transform="rotate(-12 78 82)"/><rect x="102" y="70" width="38" height="38" rx="6" transform="rotate(10 121 89)"/><rect x="76" y="118" width="40" height="40" rx="6" transform="rotate(6 96 138)"/></g>`,
  kettle: () => `${steam(126, 54)}<path d="M40 182 Q30 110 64 92 H136 Q170 110 160 182 Z" fill="#94A3B8" ${S4}/><path d="M160 130 Q194 112 188 76 L178 74 Q178 106 156 116" fill="#94A3B8" ${S4}/>
    <path d="M74 92 Q100 40 126 92" fill="none" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><rect x="84" y="80" width="32" height="14" rx="6" fill="#475569" ${S4}/><path d="M30 186 H170" stroke="#EF4444" stroke-width="8" stroke-linecap="round"/>`,
  kid: () => `${kidFace('#FCA5A5', `<path d="M80 136 Q100 152 120 136" fill="none" ${S4}/>`)}<g transform="rotate(28 150 160)"><rect x="140" y="110" width="18" height="84" rx="9" fill="#fff" ${S4}/><circle cx="149" cy="186" r="11" fill="${RED}" ${S4}/><rect x="145" y="150" width="8" height="34" fill="${RED}"/></g>`,
  fever: () => `${kidFace('#F87171', `<path d="M82 142 Q100 132 118 142" fill="none" ${S4}/><rect x="56" y="40" width="88" height="26" rx="8" fill="#BFDBFE" ${S4}/><path d="M164 100 q8 14 0 22 q-8 -8 0 -22 Z" fill="#7DD3FC" stroke="${INK}" stroke-width="3"/>`)}`,
  tub: () => `<g fill="#fff" ${S4}><circle cx="62" cy="72" r="16"/><circle cx="92" cy="60" r="20"/><circle cx="128" cy="70" r="16"/><circle cx="150" cy="58" r="11"/></g>
    <path d="M18 92 H182 V112 Q182 172 128 172 H72 Q18 172 18 112 Z" fill="#7DD3FC" ${S4}/><path d="M18 92 H182" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M52 172 L44 190 M148 172 L156 190" ${S4}/>`,
  glass: () => `<path d="M50 30 H150 L136 186 H64 Z" fill="#F0F9FF" ${S4}/><path d="M55 76 H145 L136 180 H64 Z" fill="#7DD3FC"/><path d="M50 30 H150 L136 186 H64 Z" fill="none" ${S4}/><path d="M72 92 L80 168" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`,
  fridge: () => `<rect x="44" y="14" width="112" height="176" rx="14" fill="#E2E8F0" ${S4}/><path d="M44 78 H156" ${S4}/><path d="M136 34 V60 M136 96 V140" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>${flake(76, 46)}${flake(80, 120)}`,
  tea: () => `${steam(96, 64)}<path d="M36 82 H156 V120 Q156 176 96 176 Q36 176 36 120 Z" fill="#fff" ${S4}/><path d="M42 92 H150" stroke="#B45309" stroke-width="10"/><path d="M156 98 Q190 98 186 124 Q182 146 152 142" fill="none" ${S4}/><path d="M20 182 H172" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`,
  room: () => `<rect x="18" y="30" width="164" height="54" rx="12" fill="#fff" ${S4}/><path d="M34 66 H166" stroke="#94A3B8" stroke-width="5"/><circle cx="160" cy="46" r="5" fill="#22C55E"/>
    <g fill="none" stroke="#38BDF8" stroke-width="6" stroke-linecap="round"><path d="M50 104 q10 16 0 32 q-10 16 0 32"/><path d="M100 104 q10 16 0 32 q-10 16 0 32"/><path d="M150 104 q10 16 0 32 q-10 16 0 32"/></g>`,
  autumn: () => `<rect x="90" y="110" width="22" height="78" fill="#92400E" ${S4}/><circle cx="100" cy="80" r="58" fill="#FB923C" ${S4}/><circle cx="72" cy="68" r="10" fill="#FDBA74"/><circle cx="126" cy="96" r="12" fill="#FDBA74"/>
    <path d="M30 150 l10 -8 6 12 Z M160 160 l12 -6 2 14 Z" fill="#F97316" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`,
};
const art = (id) => `<svg viewBox="0 0 200 200" class="g3n-artsvg" aria-hidden="true">${ART[id]()}</svg>`;

/** Hình thời tiết theo nhiệt độ không khí. */
const airArt = (v) => (v <= 12 ? 'cold' : v <= 20 ? 'cloud' : v <= 29 ? 'sunCloud' : 'sun');
/** Hình cho nhiệt kế đo nước (thang 0–100 °C). */
const waterArt = (v) => (v <= 8 ? 'ice' : v <= 30 ? 'glass' : v <= 45 ? 'tub' : v < 95 ? 'tea' : 'kettle');

// ── Nhiệt kế (SVG W × 1000; W theo khung đo khi dựng bài) ─────────────────────────────────────────────
const H = 1000, TOP = 64, BULB = 872, BR = 66, Y_HI = 118, Y_LO = 786;

function thermoGeo(W, { lo, hi }, icon) {
  const wide = icon && W >= 700;
  const cx = wide ? W - 270 : Math.round(W / 2 + 18);
  const yOf = (v) => Y_LO - ((v - lo) / (hi - lo)) * (Y_LO - Y_HI);
  return { W, cx, yOf, wide };
}

/** Vẽ nhiệt kế. sc: { lo, hi, minor }. v: nhiệt độ ban đầu (null = cột đỏ chưa dâng). */
function thermoSvg(g, sc, v, { icon = null, knob = false } = {}) {
  const { W, cx, yOf } = g;
  const colTop = TOP + 26;
  let s = '';
  if (icon && g.wide) {
    const sz = Math.min(cx - 230, 340);
    s += `<g transform="translate(${(cx - 200 - sz) / 2 + 10} ${Y_HI + 10}) scale(${sz / 200})">${ART[icon]()}</g>`;
  }
  s += `<rect x="${cx - 42}" y="${TOP}" width="84" height="${BULB - TOP}" rx="34" fill="#F8FAFC" stroke="${INK}" stroke-width="5"/>`;
  s += `<circle cx="${cx}" cy="${BULB}" r="${BR}" fill="${RED}" stroke="${INK}" stroke-width="5"/>`;
  const frac = (x) => (x == null ? 0 : (BULB - yOf(x)) / (BULB - colTop));
  s += `<rect class="g3n-col" x="${cx - 21}" y="${colTop}" width="42" height="${BULB - colTop}" fill="${RED}" style="transform-origin:${cx}px ${BULB}px;transform:scaleY(${frac(v)})"/>`;
  s += `<circle cx="${cx}" cy="${BULB}" r="${BR - 8}" fill="${RED}"/><path d="M${cx - 28} ${TOP + 40} V${BULB - 90}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".8"/>`;
  s += `<circle cx="${cx - 24}" cy="${BULB - 18}" r="12" fill="#fff" opacity=".55"/>`;
  // Vạch chia: vạch nhỏ mỗi `minor` độ, vạch dài có số mỗi 10 độ, vạch vừa mỗi 5 độ (thang 1 °C)
  const n = (sc.hi - sc.lo) / sc.minor;
  const thin = n > 70;
  for (let x = sc.lo; x <= sc.hi; x += sc.minor) {
    const big = x % 10 === 0, mid = !big && sc.minor === 1 && x % 5 === 0;
    const len = big ? 66 : mid ? 46 : thin ? 24 : 30;
    s += `<path d="M${cx + 42} ${yOf(x)} h${len}" stroke="${INK}" stroke-width="${big ? 5 : mid ? 3.5 : thin ? 2 : 2.6}"/>`;
    if (big) s += `<text x="${cx + 120}" y="${yOf(x) + 19}" class="g3n-tl">${x}</text>`;
  }
  s += `<text x="${cx - 56}" y="${TOP + 46}" class="g3n-tu">${DEG}</text>`;
  if (knob) s += `<g class="g3n-knob" style="transform:translateY(${yOf(v ?? sc.lo)}px)"><circle cx="${cx}" cy="0" r="30" fill="#fff" stroke="${RED}" stroke-width="8"/><path d="M${cx - 10} -6 L${cx} -16 L${cx + 10} -6 M${cx - 10} 6 L${cx} 16 L${cx + 10} 6" fill="none" stroke="${RED}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s += `<g class="g3n-ghost" style="opacity:0"></g><g class="g3n-fx"></g>`;
  // Ngón tay chỉ đầu cột đỏ (đếm vạch): đầu ngón ở (cx − 40, 0)
  s += `<g class="g3n-finger" style="opacity:0;transform:translateY(${yOf(sc.lo)}px)"><g transform="translate(${cx - 48} 0)">
    <rect x="-176" y="-26" width="26" height="58" rx="6" fill="#3B82F6" stroke="${INK}" stroke-width="4"/>
    <rect x="-156" y="-28" width="84" height="62" rx="22" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>
    <rect x="-86" y="-13" width="86" height="26" rx="13" fill="${SKIN}" stroke="${INK}" stroke-width="4"/>
    <path d="M-140 4 H-104 M-140 18 H-104" stroke="${INK}" stroke-width="3" stroke-linecap="round" opacity=".55"/>
    <text class="g3n-cnt" x="-112" y="-44"></text></g></g>`;
  return s;
}

/** Dựng nhiệt kế vào `svgEl` theo cỡ khung thật; trả về bộ điều khiển. */
function makeThermo(svgEl, sc, v, opts = {}) {
  const r = svgEl.getBoundingClientRect();
  const W = r.width > 0 && r.height > 0 ? Math.round(Math.max(470, Math.min(1500, (H * r.width) / r.height))) : 600;
  const g = thermoGeo(W, sc, opts.icon);
  svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
  svgEl.innerHTML = thermoSvg(g, sc, v, opts);
  // Khung đổi cỡ sau khi dựng (vòng chơi thêm thanh tiến độ, xoay máy): chỉ nới bề ngang viewBox, hình giữ giữa, cao hết khung.
  let vb = [0, W];
  const fit = () => {
    const b = svgEl.getBoundingClientRect();
    if (!b.width || !b.height) return;
    const Wn = Math.max(W * 0.7, (H * b.width) / b.height);
    vb = [(W - Wn) / 2, Wn];
    svgEl.setAttribute('viewBox', `${vb[0]} 0 ${Wn} ${H}`);
  };
  const ro = new ResizeObserver(() => { if (!svgEl.isConnected) ro.disconnect(); else fit(); });
  ro.observe(svgEl);
  const col = svgEl.querySelector('.g3n-col'), knob = svgEl.querySelector('.g3n-knob');
  const finger = svgEl.querySelector('.g3n-finger'), cnt = svgEl.querySelector('.g3n-cnt');
  const colTop = TOP + 26;
  const t = {
    g, sc, v, svg: svgEl,
    set(x) {
      t.v = x;
      col.style.transform = `scaleY(${x == null ? 0 : (BULB - g.yOf(x)) / (BULB - colTop)})`;
      if (knob) knob.style.transform = `translateY(${g.yOf(x ?? sc.lo)}px)`;
    },
    finger(x, label) {
      if (finger.style.opacity !== '1') { finger.style.transition = 'none'; finger.style.transform = `translateY(${g.yOf(x)}px)`; void finger.getBoundingClientRect(); finger.style.transition = ''; }
      finger.style.opacity = '1';
      finger.style.transform = `translateY(${g.yOf(x)}px)`;
      cnt.textContent = label ?? '';
    },
    fingerOff() { finger.style.opacity = '0'; },
    /** Giá trị ứng với điểm màn hình (kéo cột đỏ). */
    valueAt(clientY) {
      const m = svgEl.getScreenCTM();
      if (!m) return t.v;
      const y = (clientY - m.f) / m.d;
      const raw = sc.lo + ((Y_LO - y) / (Y_LO - Y_HI)) * (sc.hi - sc.lo);
      return Math.max(sc.lo, Math.min(sc.hi, Math.round(raw / sc.minor) * sc.minor));
    },
    /** Vạch mờ chỉ chỗ cần kéo tới (sau hai lần sai). */
    ghost(x) {
      const gh = svgEl.querySelector('.g3n-ghost');
      gh.innerHTML = `<path d="M${g.cx - 60} ${g.yOf(x)} H${g.cx + 100}" stroke="#F59E0B" stroke-width="8" stroke-dasharray="14 10" stroke-linecap="round"/>`;
      gh.style.opacity = '1';
    },
    /** Vạch nét đứt ngang ở nhiệt độ x, suốt bề ngang (nối các nhiệt kế đứng cạnh nhau). */
    level(x) {
      svgEl.querySelector('.g3n-fx').insertAdjacentHTML('beforeend', `<path class="g3n-lvl" d="M${vb[0]} ${g.yOf(x)} h${vb[1]}" stroke="#F59E0B" stroke-width="6" stroke-dasharray="16 12"/>`);
    },
    /** Ngoặc vàng bên trái ống từ a lên b, ghi phần chênh. */
    bracket(a, b, label) {
      const x = g.cx - 74, ya = g.yOf(a), yb = g.yOf(b);
      svgEl.querySelector('.g3n-fx').insertAdjacentHTML('beforeend', `<g class="g3n-br" style="transform-origin:${x}px ${ya}px">
        <path d="M${x + 14} ${ya} H${x} V${yb} H${x + 14}" fill="none" stroke="#D97706" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>
        <rect x="${x - 196}" y="${(ya + yb) / 2 - 40}" width="180" height="72" rx="36" fill="#FEF08A" stroke="#CA8A04" stroke-width="4"/>
        <text x="${x - 106}" y="${(ya + yb) / 2 + 14}" class="g3n-brl">${label}</text></g>`);
    },
  };
  return t;
}

// ── Dữ liệu thật ─────────────────────────────────────────────────────────────────────────────────────
// Nhiệt độ không khí ban ngày thường gặp (°C): [mùa đông], [mùa hè].
const CITIES = {
  'Hà Nội': [[13, 20], [31, 37]],
  'TP Hồ Chí Minh': [[27, 32], [31, 35]],
  'Sa Pa': [[4, 11], [20, 25]],
  'Đà Lạt': [[14, 19], [20, 25]],
  'Đà Nẵng': [[20, 25], [31, 36]],
  'Huế': [[18, 23], [32, 38]],
  'Nha Trang': [[24, 28], [29, 33]],
  'Hạ Long': [[14, 19], [28, 33]],
  'Cần Thơ': [[26, 31], [30, 34]],
};

/** Tình huống của cấp 4: nhiệt độ hợp lí và hai nhiệt độ không hợp lí. lowW / highW: chữ khi chọn thấp / cao quá. */
const SITUATIONS = [
  { id: 'ice', text: 'Nước đá đang tan', ans: 0, opts: [37, 100], art: 'ice', why: 'Nước đá rất lạnh, khoảng 0 °C.' },
  { id: 'boil', text: 'Nước đang sôi trong ấm', ans: 100, opts: [40, 10], art: 'kettle', why: 'Nước sôi rất nóng, 100 °C.' },
  { id: 'body', text: 'Nhiệt độ cơ thể người khỏe mạnh', ans: 37, opts: [17, 57], art: 'kid', why: 'Cơ thể người khỏe mạnh khoảng 37 °C.', lowW: 'thấp quá', highW: 'cao quá' },
  { id: 'fever', text: 'Bạn Nam bị sốt', ans: 39, opts: [36, 20], art: 'fever', why: 'Cao hơn 37 °C là bị sốt. Nam sốt khoảng 39 °C.', lowW: 'thấp quá', highW: 'cao quá' },
  { id: 'summer', text: 'Trưa hè nắng nóng ở Hà Nội', ans: 36, opts: [8, 80], art: 'sun', why: 'Trưa hè nắng nóng khoảng 35 °C đến 38 °C.' },
  { id: 'winter', text: 'Ngày đông giá rét ở Sa Pa', ans: 6, opts: [36, 66], art: 'snow', why: 'Mùa đông ở Sa Pa rất lạnh, có ngày chỉ vài độ C.' },
  { id: 'bath', text: 'Nước tắm ấm cho em bé', ans: 38, opts: [8, 88], art: 'tub', why: 'Nước tắm ấm khoảng 38 °C, gần bằng nhiệt độ cơ thể.' },
  { id: 'drink', text: 'Cốc nước em nên uống', ans: 25, opts: [70, 100], art: 'glass', why: 'Nước khoảng 25 °C uống vừa, không bị bỏng.' },
  { id: 'room', text: 'Phòng học mát có điều hoà', ans: 26, opts: [6, 60], art: 'room', why: 'Phòng mát khoảng 25 °C đến 27 °C.' },
  { id: 'fridge', text: 'Ngăn mát tủ lạnh', ans: 4, opts: [40, 80], art: 'fridge', why: 'Ngăn mát tủ lạnh khoảng 3 °C đến 5 °C.' },
  { id: 'tea', text: 'Cốc trà nóng vừa pha', ans: 80, opts: [20, 0], art: 'tea', why: 'Trà vừa pha rất nóng, khoảng 80 °C. Cẩn thận kẻo bỏng!' },
  { id: 'autumn', text: 'Sáng mùa thu mát mẻ ở Hà Nội', ans: 24, opts: [4, 54], art: 'autumn', why: 'Sáng mùa thu mát mẻ khoảng 22 °C đến 26 °C.' },
];
const ANCHOR = { 0: 'nước đá đang tan', 100: 'nước sôi', 37: 'cơ thể người' };

// ── Sinh đề ─────────────────────────────────────────────────────────────────────────────────────────
const SCALE = { a: { lo: 0, hi: 50, minor: 1 }, b: { lo: 0, hi: 100, minor: 2 } };

function genRead(rng, k) {
  const sc = SCALE[['a', 'a', 'b', 'a', 'b', 'a'][k % 6]];
  let v;
  do v = sc.minor === 1 ? rng.int(2, 49) : 2 * rng.int(2, 49); while (v % 10 === 0 && rng() < 0.85);
  return { t: 'read', sc, v };
}

function genSet(rng, k) {
  const sc = SCALE[['a', 'a', 'b', 'a', 'a'][k % 5]];
  const pick = () => (sc.minor === 1 ? rng.int(3, 48) : 2 * rng.int(3, 48));
  let v;
  do v = pick(); while (v % 10 === 0 && rng() < 0.85);
  let s;
  do s = pick(); while (Math.abs(s - v) < 8 * sc.minor);
  return { t: 'set', sc, v, start: s };
}

const pickCities = (rng, n, season, gap) => {
  for (let tries = 0; tries < 80; tries++) {
    const names = rng.shuffle(Object.keys(CITIES)).slice(0, n);
    const vals = names.map(c => { const [a, b] = CITIES[c][season]; return rng.int(a, b); });
    const sorted = [...vals].sort((x, y) => x - y);
    if (sorted.every((x, i) => !i || x - sorted[i - 1] >= gap) && sorted[n - 1] - sorted[0] >= 5) return names.map((name, i) => ({ name, v: vals[i] }));
  }
  return [{ name: 'Sa Pa', v: 15 }, { name: 'Nha Trang', v: 32 }, { name: 'Hạ Long', v: 26 }].slice(0, n);
};

function genCmp(rng, k) {
  const kind = ['city2', 'rise', 'city3', 'fall', 'city2'][k % 5];
  let items, ask, head, line;
  if (kind === 'rise' || kind === 'fall') {
    if (kind === 'rise') {
      const a = rng.int(15, 25), b = Math.min(37, a + rng.int(6, 12));
      items = [{ name: 'Sáng sớm', v: a, icon: 'sunrise' }, { name: 'Trưa', v: b, icon: 'sun' }];
      ask = 'hot';
      line = { pre: 'Từ sáng sớm đến trưa, nhiệt độ tăng thêm', post: '' };
    } else {
      const a = rng.int(27, 36), b = Math.max(14, a - rng.int(6, 12));
      items = [{ name: 'Trưa', v: a, icon: 'sun' }, { name: 'Đêm', v: b, icon: 'moon' }];
      ask = 'cold';
      line = { pre: 'Từ trưa đến đêm, nhiệt độ giảm đi', post: '' };
    }
    head = 'Nhiệt độ không khí trong một ngày ở một địa phương:';
  } else {
    const season = rng() < 0.5 ? 0 : 1;
    items = pickCities(rng, kind === 'city3' ? 3 : 2, season, kind === 'city3' ? 2 : 3).map(c => ({ ...c, icon: airArt(c.v) }));
    ask = rng() < 0.5 ? 'hot' : 'cold';
    head = `Một ngày mùa ${season ? 'hè' : 'đông'}, nhiệt độ không khí ở ${kind === 'city3' ? 'ba' : 'hai'} địa phương:`;
    line = null;
  }
  const vs = items.map(x => x.v);
  const hi = Math.max(...vs) > 38 ? 50 : 40;
  return { t: 'cmp', kind, sc: { lo: 0, hi, minor: 1 }, items, ask, head, line, three: items.length === 3 };
}

function genSit(rng) {
  const s = rng.pick(SITUATIONS);
  return { t: 'sit', sit: s.id, opts: rng.shuffle([s.ans, ...s.opts]), sc: { lo: 0, hi: 100, minor: 1 } };
}

const keyOf = (m) => (m.t === 'read' ? `r${m.sc.minor}-${m.v}` : m.t === 'set' ? `s${m.sc.minor}-${m.v}`
  : m.t === 'cmp' ? `c-${m.items.map(x => x.name + x.v).join('|')}` : `q-${m.sit}`);

const LV = (id, n, title, missions, desc, knowledge, gen, ask) => ({ id, n, title, missions, desc, knowledge, lessons: { workbook: ['bai-33'] }, gen, ask: () => ask });

export const TEMP_LEVELS = [
  LV('drill-temp-1', 1, 'Đọc nhiệt kế', 6, 'Nhìn đầu cột màu đỏ: qua vạch 30 thêm 2 vạch nhỏ là 32 °C.', 'nhiệt kế, đơn vị đo nhiệt độ °C',
    genRead, 'Tìm vạch có số ngay dưới đầu cột đỏ, rồi đếm thêm các vạch nhỏ!'),
  LV('drill-temp-2', 2, 'Chỉnh nhiệt kế', 5, 'Kéo cột màu đỏ cho nhiệt kế chỉ đúng 34 °C.', 'đọc vạch chia trên nhiệt kế',
    genSet, 'Tìm vạch có số trước, rồi đếm thêm vạch nhỏ!'),
  LV('drill-temp-3', 3, 'So sánh nhiệt độ', 5, 'Hà Nội 18 °C, TP Hồ Chí Minh 33 °C: nơi nào nóng hơn, nóng hơn bao nhiêu độ C?', 'so sánh, tính với nhiệt độ',
    genCmp, 'Cột đỏ cao hơn là nóng hơn. Nóng hơn bao nhiêu thì lấy số lớn trừ số bé!'),
  LV('drill-temp-4', 4, 'Nhiệt độ hợp lí', 6, 'Nước đá đang tan 0 °C, cơ thể người 37 °C, nước sôi 100 °C.', 'ước lượng nhiệt độ trong cuộc sống',
    genSit, 'Nhớ: nước đá 0 °C, cơ thể người 37 °C, nước sôi 100 °C!'),
];

// ── Trò ─────────────────────────────────────────────────────────────────────────────────────────────
export const TEMP_GAME = {
  id: 'drill-temp', icon: '🌡️', title: 'Nhiệt độ',
  purpose: 'Giúp em đọc nhiệt kế, chỉnh nhiệt kế, so sánh và tính với nhiệt độ, chọn nhiệt độ hợp lí trong cuộc sống.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: TEMP_LEVELS,
  stallIcon: () => '🌡️',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['🌡️', 'Nhìn nhiệt kế'], ['🔴', 'Đầu cột đỏ'], ['⌨️', 'Gõ số độ C'], ['👉', 'Đếm vạch kiểm tra']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), keyOf);
  },

  mountMission(stage, m, level, api0) {
    // Mọi câu thầy đọc (cả câu khen cuối bài của kit): "°C" đọc thành "độ C"
    const api = { ...api0, say: (t) => api0.say(spk(t)) };
    if (m.t === 'cmp') return mountCmp(stage, m, api);
    return mountSingle(stage, m, api);
  },
};

const wait = (ms) => sleep(calmMotion() ? ms * 1.4 : ms);
const tens = (v) => Math.floor(v / 10) * 10;

/** Ngón tay đếm từ vạch có số ngay dưới đầu cột đỏ lên tới v. */
async function countUp(th, v, show) {
  const m = th.sc.minor, base = tens(v);
  const seq = [];
  for (let x = base; x <= v; x += m) seq.push(x);
  for (let j = 0; j < seq.length; j++) {
    th.finger(seq[j], seq[j]);
    show(`👉 ${seq.slice(0, j + 1).join(', ')}`);
    sfx.pop(j);
    await wait(j ? 420 : 620);
  }
}

// ── Cấp 1, 2, 4: một nhiệt kế + cột bên ──────────────────────────────────────────────────────────────
function mountSingle(stage, m, api) {
  const sc = m.sc;
  const sit = m.t === 'sit' ? SITUATIONS.find(s => s.id === m.sit) : null;
  const water = sc.hi === 100 && m.t !== 'sit';
  const pic = sit ? sit.art : m.t === 'read' || m.t === 'set' ? (water ? waterArt(m.v) : airArt(m.v)) : 'sun';
  const head = m.t === 'read' ? 'Nhiệt kế chỉ bao nhiêu độ C?' : m.t === 'set' ? 'Kéo cột màu đỏ cho nhiệt kế chỉ:' : 'Chọn nhiệt độ thích hợp:';
  let side;
  if (m.t === 'read') {
    side = `<div class="g3n-art">${art(pic)}</div>
      <div class="g3n-ans"><span class="g3d-box" data-box style="--boxw:${String(m.v).length * 0.6 + 0.9}em"></span><span>${DEG}</span></div>
      <div class="g3n-fact g3n-hide" data-fact>1 vạch nhỏ = ${sc.minor} ${DEG}</div>`;
  } else if (m.t === 'set') {
    side = `<div class="g3n-art">${art(pic)}</div>
      <div class="g3n-target">${tC(m.v)}</div>
      <div class="g3n-ctrl"><button type="button" class="g3g-btn g3d-choice g3n-adj" data-adj="-1" aria-label="Giảm">▼</button>
        <button type="button" class="g3g-btn g3d-choice g3n-adj" data-adj="1" aria-label="Tăng">▲</button>
        <button type="button" class="g3g-btn g3n-go" data-go>Xong</button></div>`;
  } else {
    const cap = `${sit.text}: khoảng ${tC(sit.ans)}`;
    side = `<div class="g3n-art">${art(pic)}</div>
      <div class="g3n-cap" style="--pl:${cap.length}" data-cap>${sit.text}</div>
      <div class="g3n-opts">${m.opts.map(v => `<button type="button" class="g3g-btn g3d-choice g3n-opt" data-v="${v}">${tC(v)}</button>`).join('')}</div>`;
  }
  const board = `<div class="g3n g3n-${m.t}">
      <div class="g3n-head" style="--pl:${head.length}">${head}</div>
      <div class="g3n-main"><div class="g3n-th"><svg class="g3n-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg></div><div class="g3n-side">${side}</div></div>
    </div>`;
  const d0 = mountDrill(stage, { api, board, cls: 'g3n-scene' });
  const { paper, show, pad } = d0;
  const say = (t, sh, mood) => d0.say(t, nb(sh ?? t), mood), hint = (t, sh) => d0.hint(t, nb(sh ?? t));
  const done = (n, o) => d0.done(n, { ok: nb(o.ok), tip: nb(o.tip) });
  injectTempStyles();
  const start = m.t === 'read' ? m.v : m.t === 'set' ? m.start : null;
  const th = makeThermo(paper.querySelector('.g3n-svg'), sc, start, { knob: m.t === 'set' });
  const talk = (text, shown) => say(spk(text), shown || text);
  let mistakes = 0, tip = '', wrongs = 0, busy = false;
  const miss = (el, t1, t2, shown1, shown2) => {
    mistakes++; wrongs++;
    tip ||= t1;
    shake(el);
    const t = wrongs > 1 && t2 ? t2 : t1;
    hint(spk(t), wrongs > 1 && t2 ? shown2 || t2 : shown1 || t1);
  };
  let api2 = {};

  if (m.t === 'read') {
    const box = paper.querySelector('[data-box]'), fact = paper.querySelector('[data-fact]');
    const v = m.v, mn = sc.minor, base = tens(v);
    setActive(paper, box);
    talk('Nhiệt kế chỉ bao nhiêu độ C? Nhìn đầu cột màu đỏ.', 'Đầu cột đỏ ở vạch nào? Gõ số rồi bấm <b>OK</b>.');
    const why = (t) => {
      const rev = Number(String(v).split('').reverse().join(''));
      if (t === base && v !== base) return `Đầu cột đỏ đã qua vạch ${base}. Đếm tiếp các vạch nhỏ phía trên vạch ${base}.`;
      if (t === base + 10) return `Đầu cột đỏ chưa tới vạch ${base + 10}. Đếm từ vạch ${base} lên.`;
      if (v >= 10 && t === rev && t !== v) return `Em viết ngược chữ số rồi. Vạch có số ngay dưới đầu cột đỏ là ${base}.`;
      if (mn === 2 && t === base + (v - base) / 2) return `Mỗi vạch nhỏ là 2 °C, không phải 1 °C. Từ vạch ${base} đếm thêm 2, thêm 2.`;
      if (Math.abs(t - v) >= 10) return `Tìm vạch có số ngay dưới đầu cột đỏ: vạch ${base}. Rồi đếm thêm các vạch nhỏ.`;
      return `Gần đúng rồi. Từ vạch ${base}, đếm lại từng vạch nhỏ, mỗi vạch ${mn} °C.`;
    };
    const opts = {
      max: String(v).length + 1,
      onType: (t) => { box.textContent = t; },
      onSubmit: async (t) => {
        if (busy) return;
        if (Number(t) !== v) {
          box.textContent = '';
          fact.classList.remove('g3n-hide');
          miss(box, why(Number(t)), `Từ vạch ${base} đếm thêm ${(v - base) / mn} vạch nhỏ: nhiệt kế chỉ ${v} °C.`);
          pad.want(opts);
          return;
        }
        busy = true;
        pad.off();
        setActive(paper, null);
        box.textContent = v;
        box.classList.add('g3d-box-ok');
        sfx.ding();
        await countUp(th, v, show);
        talk(`Đúng rồi! Nhiệt kế chỉ ${v} °C.`, `Nhiệt kế chỉ <b>${tC(v)}</b>.`);
        await wait(900);
        done(mistakes, { ok: `Nhiệt kế chỉ ${tC(v)}.`, tip: tip ? `Tìm vạch có số ngay dưới đầu cột đỏ, rồi đếm thêm vạch nhỏ, mỗi vạch ${mn} ${DEG}.` : '' });
      },
    };
    pad.want(opts);
    api2 = { step: () => pad.type(String(v)), wrong: () => pad.type(String(v + mn)) };
  } else if (m.t === 'set') {
    const T = m.v, mn = sc.minor;
    const svg = th.svg, wrap = paper.querySelector('.g3n-th');
    wrap.classList.add('g3n-grab', 'g3n-hint');
    talk(`Kéo cột màu đỏ cho nhiệt kế chỉ ${T} °C, rồi bấm Xong.`, `Kéo cột đỏ tới <b>${tC(T)}</b>, rồi bấm <b>Xong</b>.`);
    let drag = false, last = th.v;
    const moveTo = (x) => { if (x === th.v) return; th.set(x); if (x !== last) { last = x; sfx.tap(); } };
    svg.addEventListener('pointerdown', (e) => {
      if (busy) return;
      drag = true;
      wrap.classList.remove('g3n-hint');
      wrap.classList.add('g3n-drag');
      try { svg.setPointerCapture(e.pointerId); } catch { /* bút giả lập */ }
      moveTo(th.valueAt(e.clientY));
      e.preventDefault();
    });
    svg.addEventListener('pointermove', (e) => { if (drag) moveTo(th.valueAt(e.clientY)); });
    const up = () => { drag = false; wrap.classList.remove('g3n-drag'); };
    svg.addEventListener('pointerup', up);
    svg.addEventListener('pointercancel', up);
    for (const ev of ['contextmenu', 'selectstart', 'dragstart']) wrap.addEventListener(ev, (e) => e.preventDefault());
    paper.querySelectorAll('[data-adj]').forEach(b => {
      b.onclick = () => { if (busy) return; wrap.classList.remove('g3n-hint'); moveTo(Math.max(sc.lo, Math.min(sc.hi, th.v + Number(b.dataset.adj) * mn))); };
    });
    const go = paper.querySelector('[data-go]');
    go.onclick = async () => {
      if (busy) return;
      sfx.tap();
      const c = th.v;
      if (c !== T) {
        const d = Math.abs(c - T), up2 = c < T;
        const say1 = d >= 10 && d % 10 === 0
          ? `Lệch đúng ${d} độ: tìm vạch số ${tens(T)} trước, rồi đếm thêm vạch nhỏ.`
          : `Cột đỏ đang chỉ ${c} °C, ${up2 ? 'thấp' : 'cao'} hơn ${T} °C. Kéo ${up2 ? 'lên' : 'xuống'} thêm ${d / mn} vạch nhỏ.`;
        miss(wrap, say1, `Vạch vàng là ${T} °C. Kéo đầu cột đỏ tới vạch vàng.`);
        if (wrongs > 1) th.ghost(T);
        return;
      }
      busy = true;
      wrap.classList.remove('g3n-grab', 'g3n-hint');
      paper.querySelectorAll('.g3n-ctrl button').forEach(b => { b.disabled = true; });
      go.classList.add('g3n-go-ok');
      sfx.ding();
      await countUp(th, T, show);
      talk(`Đúng rồi! Nhiệt kế chỉ ${T} °C.`, `Nhiệt kế chỉ <b>${tC(T)}</b>.`);
      await wait(900);
      done(mistakes, { ok: `Nhiệt kế chỉ ${tC(T)}.`, tip: tip ? `Tìm vạch có số trước, rồi đếm thêm vạch nhỏ, mỗi vạch ${mn} ${DEG}.` : '' });
    };
    api2 = { step: () => { th.set(T); go.click(); }, wrong: () => { th.set(T + 3 * mn); go.click(); } };
  } else {
    const capEl = paper.querySelector('[data-cap]');
    const btns = [...paper.querySelectorAll('[data-v]')];
    talk(`${sit.text}. Nhiệt độ nào hợp lí?`, `<b>${sit.text}</b>: nhiệt độ nào hợp lí?`);
    btns.forEach(btn => {
      btn.onclick = async () => {
        if (busy) return;
        sfx.tap();
        const v = Number(btn.dataset.v);
        busy = true;
        await wait(flyDigit(tC(v), btn, capEl, { onLand: () => { th.set(v); sfx.pop(2); } }) - 200);
        await wait(700);
        busy = false;
        if (v !== sit.ans) {
          const word = v < sit.ans ? sit.lowW || 'lạnh quá' : sit.highW || 'nóng quá';
          const an = ANCHOR[v] ? `, bằng ${ANCHOR[v]}` : '';
          btn.disabled = true;
          miss(btn, `${v} °C ${word}${an}. ${sit.why}`);
          return;
        }
        busy = true;
        btn.classList.add('g3d-choice-ok');
        btns.forEach(b => { b.disabled = true; });
        capEl.innerHTML = `${sit.text}: khoảng <b>${tC(sit.ans)}</b>`;
        th.finger(v, '');
        sfx.ding();
        talk(sit.why, sit.why);
        await wait(1500);
        done(mistakes, { ok: `${sit.text}: khoảng ${tC(sit.ans)}.`, tip: tip ? 'Nhớ: nước đá đang tan 0 °C, cơ thể người khỏe mạnh 37 °C, nước sôi 100 °C.' : '' });
      };
    });
    api2 = {
      step: () => btns.find(b => Number(b.dataset.v) === sit.ans)?.click(),
      wrong: () => btns.find(b => Number(b.dataset.v) !== sit.ans && !b.disabled)?.click(),
    };
  }
  if (import.meta.env.DEV) window.__g3drill = { m, ...api2 };
}

// ── Cấp 3: so sánh và tính ───────────────────────────────────────────────────────────────────────────
function mountCmp(stage, m, api) {
  const { items } = m;
  const vs = items.map(x => x.v);
  const hiI = vs.indexOf(Math.max(...vs)), loI = vs.indexOf(Math.min(...vs));
  const pickI = m.ask === 'hot' ? hiI : loI, otherI = m.ask === 'hot' ? loI : hiI;
  const diff = vs[hiI] - vs[loI];
  const day = !!m.line;
  const q1 = day ? (m.ask === 'hot' ? 'Buổi nào nóng hơn?' : 'Buổi nào mát hơn?')
    : m.three ? (m.ask === 'hot' ? 'Nơi nào nóng nhất?' : 'Nơi nào lạnh nhất?') : (m.ask === 'hot' ? 'Nơi nào nóng hơn?' : 'Nơi nào lạnh hơn?');
  const P = items[pickI].name, O = items[otherI].name;
  const lineTxt = day ? `${m.line.pre} ... °C.` : `${P} ${m.ask === 'hot' ? 'nóng' : 'lạnh'} hơn ${O} ... °C.`;
  const lineHtml = day
    ? `<span>${m.line.pre}</span>`
    : `<span class="g3n-nm g3n-hide" data-nm>${P}</span><span>${m.ask === 'hot' ? 'nóng' : 'lạnh'} hơn ${O}</span>`;
  const card = (it, i) => `<button type="button" class="g3n-card" data-card="${i}">
      <span class="g3n-cn">${it.name}</span><svg class="g3n-svg" data-th="${i}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg>
      <span class="g3n-cv">${tC(it.v)}</span></button>`;
  const board = `<div class="g3n g3n-cmp${m.three ? ' g3n-three' : ''}">
      <div class="g3n-head" style="--pl:${m.head.length}">${m.head}</div>
      <div class="g3n-main"><div class="g3n-cards">${items.map(card).join('')}</div>
        <div class="g3n-line g3n-hide" style="--pl:${lineTxt.length + 2}" data-line>${lineHtml}<span class="g3n-tail"><span class="g3d-box" data-box style="--boxw:2.2em"></span><span>${DEG}.</span></span></div></div>
    </div>`;
  const d0 = mountDrill(stage, { api, board, cls: 'g3n-scene' });
  const { paper, pad } = d0;
  const say = (t, sh, mood) => d0.say(t, nb(sh ?? t), mood), hint = (t, sh) => d0.hint(t, nb(sh ?? t));
  const done = (n, o) => d0.done(n, { ok: nb(o.ok), tip: nb(o.tip) });
  injectTempStyles();
  const ths = items.map((it, i) => makeThermo(paper.querySelector(`[data-th="${i}"]`), m.sc, it.v, { icon: it.icon }));
  const cards = [...paper.querySelectorAll('[data-card]')];
  const lineEl = paper.querySelector('[data-line]'), box = paper.querySelector('[data-box]'), nm = paper.querySelector('[data-nm]');
  const talk = (text, shown) => say(spk(text), shown || text);
  let mistakes = 0, tip = '', w1 = 0, w2 = 0, step = 1, busy = false;

  cards.forEach(c => c.classList.add('g3n-pickable'));
  talk(`${m.head} ${q1} Chạm vào nhiệt kế.`, `<b>${q1}</b> Chạm vào nhiệt kế.`);

  const cmpWord = m.ask === 'hot' ? (m.three ? 'cao nhất' : 'cao hơn') : (m.three ? 'thấp nhất' : 'thấp hơn');
  cards.forEach((c, i) => {
    c.onclick = async () => {
      if (busy) return;
      sfx.tap();
      if (step !== 1) {
        if (step === 2) { shake(box); hint(spk('Gõ số độ C vào ô trống.'), 'Gõ số độ C vào <b>ô trống</b>.'); }
        return;
      }
      if (i !== pickI) {
        mistakes++; w1++;
        const t = `${items[i].name}: ${items[i].v} °C. ${day ? 'Buổi' : 'Nơi'} ${m.ask === 'hot' ? 'nóng' : m.ask === 'cold' && day ? 'mát' : 'lạnh'} ${m.three ? 'nhất' : 'hơn'} có nhiệt độ ${cmpWord}, cột đỏ ${m.ask === 'hot' ? 'cao' : 'thấp'} ${m.three ? 'nhất' : 'hơn'}.`;
        tip ||= t;
        shake(c);
        hint(spk(t), t);
        return;
      }
      busy = true;
      c.classList.add('g3n-card-ok');
      cards.forEach(x => x.classList.remove('g3n-pickable'));
      sfx.ding();
      lineEl.classList.remove('g3n-hide');
      if (nm) {
        await wait(flyDigit(P, c.querySelector('.g3n-cn'), nm, { onLand: () => { nm.classList.remove('g3n-hide'); sfx.pop(2); } }) + 120);
      }
      step = 2;
      busy = false;
      setActive(paper, box);
      const q2 = day ? `${m.line.pre} bao nhiêu độ C?` : `${P} ${m.ask === 'hot' ? 'nóng' : 'lạnh'} hơn ${O} bao nhiêu độ C?`;
      talk(q2, `<b>${q2}</b> Gõ số rồi bấm <b>OK</b>.`);
      pad.want(opts);
    };
  });

  const hv = vs[hiI], lv = vs[loI];
  const why2 = (t) => {
    if (t === hv + lv) return `Em đã cộng hai nhiệt độ. Muốn biết hơn bao nhiêu thì lấy số lớn trừ số bé: ${hv} − ${lv}.`;
    if (vs.includes(t)) return `${t} °C là nhiệt độ ${day ? 'buổi' : 'ở'} ${items[vs.indexOf(t)].name}. Cần tìm phần chênh: ${hv} − ${lv}.`;
    if (Math.abs(t - diff) === 10) return `Xem lại hàng chục: ${hv} − ${lv}.`;
    return `Lấy nhiệt độ cao trừ nhiệt độ thấp: ${hv} − ${lv}.`;
  };
  const opts = {
    max: 3,
    onType: (t) => { box.textContent = t; },
    onSubmit: async (t) => {
      if (busy || step !== 2) return;
      if (Number(t) !== diff) {
        box.textContent = '';
        mistakes++; w2++;
        const tt = w2 > 1 ? `${hv} − ${lv} = ${diff}.` : why2(Number(t));
        tip ||= `Lấy nhiệt độ cao trừ nhiệt độ thấp: ${hv} − ${lv} = ${diff}.`;
        shake(box);
        hint(spk(tt), tt);
        pad.want(opts);
        return;
      }
      busy = true;
      step = 3;
      pad.off();
      setActive(paper, null);
      box.textContent = diff;
      box.classList.add('g3d-box-ok');
      sfx.ding();
      // Kiểm tra: vạch nét đứt ở nhiệt độ thấp nối các nhiệt kế, ngoặc vàng trên nhiệt kế nóng ghi phần chênh
      ths.forEach(th => th.level(lv));
      sfx.pop(1);
      await wait(500);
      ths[hiI].bracket(lv, hv, `${diff} ${DEG}`);
      sfx.pop(4);
      talk(`${hv} − ${lv} = ${diff}. ${day ? m.line.pre : `${P} ${m.ask === 'hot' ? 'nóng' : 'lạnh'} hơn ${O}`} ${diff} °C.`,
        `${hv} ${MINUS} ${lv} = <b>${diff}</b>`);
      await wait(1500);
      const ok = day ? `${m.line.pre} ${tC(diff)}.` : `${P} ${m.ask === 'hot' ? 'nóng' : 'lạnh'} hơn ${O} ${tC(diff)}.`;
      done(mistakes, { ok, tip: tip ? `Cột đỏ cao hơn là nóng hơn. Hơn bao nhiêu độ thì lấy nhiệt độ cao trừ nhiệt độ thấp.` : '' });
    },
  };

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      step: () => { if (busy) return; if (step === 1) cards[pickI].click(); else if (step === 2) pad.type(String(diff)); },
      wrong: () => { if (busy) return; if (step === 1) cards[otherI === pickI ? (pickI + 1) % cards.length : otherI].click(); else if (step === 2) pad.type(String(hv + lv)); },
    };
  }
}

// ── Kiểu ─────────────────────────────────────────────────────────────────────────────────────────────
let tempStyles = false;
function injectTempStyles() {
  if (tempStyles) return;
  tempStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3n { flex: 1; min-height: 0; display: grid; grid-template-rows: auto minmax(0, 1fr); gap: 1cqh; padding: 1.4cqh 2cqi 1.8cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.2cqi);
      font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3n > * { min-height: 0; min-width: 0; }
    .g3n-head { text-align: center; white-space: nowrap; line-height: 1.25; color: #334155; font-size: min(6.4cqh, 5.2cqi, calc(150cqi / var(--pl, 30))); }
    .g3n-main { display: flex; gap: 2.4cqi; min-height: 0; }
    .g3n-th { flex: 0 0 auto; height: 100%; aspect-ratio: 0.6; max-width: 50%; display: flex; background: #F8FAFC; border: 2px solid ${EDGE}; border-radius: 1rem; box-sizing: border-box; }
    .g3n-svg { flex: 1; width: 100%; height: 100%; min-height: 0; display: block; overflow: visible; }
    .g3n-svg text { font-family: 'Baloo 2', sans-serif; font-weight: 800; }
    .g3n-tl { font-size: 58px; fill: #1E293B; }
    .g3n-tu { font-size: 54px; fill: #0369A1; text-anchor: end; }
    .g3n-cnt { font-size: 60px; fill: #DC2626; text-anchor: middle; }
    .g3n-brl { font-size: 46px; fill: #92400E; text-anchor: middle; }
    .g3n-col { transition: transform .8s cubic-bezier(.3,1.15,.5,1); }
    .g3n-knob { transition: transform .8s cubic-bezier(.3,1.15,.5,1); }
    .g3n-drag .g3n-col, .g3n-drag .g3n-knob { transition: transform .08s linear; }
    .g3n-finger { transition: transform .35s ease, opacity .25s; }
    .g3n-ghost { transition: opacity .3s; }
    .g3n-br { animation: g3nGrow .6s cubic-bezier(.2,1.3,.4,1); }
    @keyframes g3nGrow { from { transform: scaleY(0); opacity: 0; } }
    .g3n-lvl { stroke-dasharray: 16 12; animation: g3nFade .4s ease; }
    @keyframes g3nFade { from { opacity: 0; } }
    .g3n-grab .g3n-svg { cursor: ns-resize; touch-action: none; }
    .g3n-hint .g3n-knob circle { animation: g3nBlink 1.1s ease-in-out infinite; }
    @keyframes g3nBlink { 50% { fill: #FEF08A; } }

    .g3n-side { flex: 1 1 0; min-width: 0; container-type: size; display: flex; flex-direction: column; align-items: stretch; justify-content: center; gap: 3cqh; }
    .g3n-art { flex: 1 1 0; min-height: 0; display: flex; justify-content: center; }
    .g3n-artsvg { height: 100%; max-width: 100%; overflow: visible; }
    .g3n-ans { flex: none; display: flex; align-items: center; justify-content: center; gap: 0.25em; font-size: min(20cqh, 22cqi); line-height: 1.1; }
    .g3n-ans .g3d-box { height: 1.2em; }
    .g3n-fact { flex: none; align-self: center; font-size: min(7cqh, 7cqi); background: #ECFDF5; color: #047857; border: 2px solid #6EE7B7; border-radius: 999px; padding: 0 0.8em; }
    .g3n-hide { visibility: hidden; }
    .g3n-target { flex: none; text-align: center; font-size: min(20cqh, 18cqi); line-height: 1.1; color: ${RED}; }
    .g3n-ctrl { flex: none; display: flex; gap: 3cqi; height: min(20cqh, 26cqi); }
    .g3n-adj { font-size: min(10cqh, 9cqi); line-height: 1; padding: 0; }
    .g3n-go { flex: 1.4 1 0; min-width: 0; padding: 0; font-family: 'Baloo 2', sans-serif; font-size: min(9cqh, 8cqi); background: #22C55E; color: #fff; border: 2px solid #16A34A; box-shadow: 0 6px 0 #15803D; border-radius: 0.6em; }
    .g3n-go:active { transform: translateY(3px); box-shadow: 0 3px 0 #15803D; }
    .g3n-go:disabled { cursor: default; }
    .g3n-go-ok { background: #16A34A; }
    .g3n-cap { flex: none; text-align: center; font-size: min(8cqh, 8.5cqi); line-height: 1.2; min-height: 2.4em; display: flex; align-items: center; justify-content: center; color: #334155; }
    .g3n-cap b { color: #C2410C; }
    .g3n-opts { flex: none; display: flex; gap: 3cqi; height: min(22cqh, 30cqi); }
    .g3n-opt { font-size: min(10cqh, 9.5cqi); line-height: 1; padding: 0; white-space: nowrap; }

    /* Cấp 3: các nhiệt kế là nút to, dòng trả lời giữ chỗ bên dưới */
    .g3n-cmp .g3n-main { flex-direction: column; gap: 1.6cqh; }
    .g3n-cards { flex: 1 1 0; min-height: 0; display: flex; gap: 2.4cqi; justify-content: center; }
    .g3n-card { flex: 1 1 0; min-width: 0; max-width: 46%; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; padding: 0.6cqh 0.6cqi; background: #fff; border: 2px solid #93C5FD;
      box-shadow: 0 6px 0 #60A5FA; border-radius: 1rem; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E3A8A; cursor: pointer; touch-action: manipulation; }
    .g3n-three .g3n-card { max-width: 33%; }
    .g3n-card:active { transform: translateY(3px); box-shadow: 0 3px 0 #60A5FA; }
    .g3n-card-ok { background: #F0FDF4; border-color: #22C55E; box-shadow: 0 6px 0 #16A34A; color: #166534; }
    .g3n-cn { font-size: min(6cqh, 4cqi); line-height: 1.15; white-space: nowrap; }
    .g3n-three .g3n-cn { font-size: min(6cqh, 3cqi); }
    .g3n-cv { font-size: min(7cqh, 4.6cqi); line-height: 1.15; color: ${RED}; }
    .g3n-line { flex: none; display: flex; align-items: center; justify-content: center; gap: 0.3em; white-space: nowrap; line-height: 1.2; font-size: min(7.5cqh, calc(150cqi / var(--pl, 30))); }
    .g3n-line .g3d-box { height: 1.2em; }
    .g3n-tail { display: inline-flex; align-items: center; gap: 0.3em; white-space: nowrap; }
    .g3n-nm { color: #166534; }

    @media (prefers-reduced-motion: reduce) {
      .g3n-col, .g3n-knob { transition: transform 1.3s ease-in-out; }
      .g3n-finger { transition: transform .6s ease-in-out, opacity .4s; }
      .g3n-br { animation: g3nFade .8s ease; }
      .g3n-hint .g3n-knob circle { animation: none; }
    }
    /* Tờ vở đứng (màn dọc): đề, nút to hơn theo bề ngang */
    @container (aspect-ratio < 1.25) {
      .g3n-head { font-size: min(5.6cqh, 6cqi, calc(165cqi / var(--pl, 30))); }
      .g3n-cn { font-size: min(5cqh, 5cqi); }
      .g3n-three .g3n-cn { font-size: min(5cqh, 3.6cqi); }
      .g3n-cv { font-size: min(6cqh, 6cqi); }
      .g3n-line { flex-wrap: wrap; white-space: normal; text-align: center; row-gap: 0; min-height: 2.5em; align-content: center; font-size: min(5.6cqh, 6.4cqi); }
    }
  `;
  document.head.appendChild(st);
}
