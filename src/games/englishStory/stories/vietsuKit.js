/**
 * Đồ dùng chung cho các truyện lịch sử en126–en130 (bộ 📜 "Nhân vật lịch sử Việt Nam"), cùng nét vẽ với kit.js.
 * Không phải truyện (index.js chỉ nhận stories/enNNN.js). Mọi class CSS có tiền tố của truyện gọi (p = 'e126'…), nên
 * các truyện không giẫm nhau: hàm vẽ nhận p, vsCss(p) sinh CSS tương ứng.
 *
 * - Mũ cổ (HAT): vẽ trong toạ độ đầu chuẩn (r = 16, tâm 0,0) như cast.js. wear(st, id, svg) gắn mũ lên con rối (cả dáng
 *   trước và dáng nghiêng) sau khi dựng nhân vật; fig() vẽ người tĩnh (trên thuyền, trên ngựa) kèm mũ.
 * - Cảnh: cung điện mái cong, nhà tranh, tre, núi, thành, lều, cờ bay.
 * - Con vật / xe cộ (kind 'thing', gốc = điểm chạm đất, quay sang phải): voi, ngựa, thuyền rồng, thuyền gỗ, rùa vàng.
 */
import { person, CAST } from '../../tiengViet3/cast.js';
import { L } from '../kit.js';

export const NUN = 'font-family="Nunito, sans-serif" font-weight="900"';
export const SEP = '#7C4A1E';
const f = (n) => +(+n).toFixed(1);

// ── Mũ cổ (toạ độ đầu, r = 16) ─────────────────────────────────────────────────────────────
export const HAT = {
  /** Mũ bình thiên của vua: mũ vàng, tấm bình đen phẳng trên đỉnh, chuỗi hạt rủ hai đầu. */
  king: `<g><path d="M-15.5 -6 C-17 -22 -9 -27 0 -27 C9 -27 17 -22 15.5 -6Z" fill="#FACC15" stroke="${L}" stroke-width="0.9"/>
    <path d="M-15 -9 H15" stroke="#DC2626" stroke-width="2.4"/><path d="M0 -24 l3 4 l-3 4 l-3 -4Z" fill="#DC2626" stroke="${L}" stroke-width="0.5"/>
    <path d="M-5 -27 V-31 M5 -27 V-31" stroke="${L}" stroke-width="2"/>
    <rect x="-25" y="-35" width="50" height="5" rx="1.5" fill="#1F2937" stroke="#FACC15" stroke-width="1"/>
    ${[-23, -19, 19, 23].map((x) => `<path d="M${x} -30 V-18" stroke="#FACC15" stroke-width="1.4" stroke-dasharray="2.2 1.4"/>`).join('')}</g>`,
  /** Mũ trụ tướng: mũ sắt có chóp và tua đỏ. */
  general: `<g><path d="M-17 -4 C-19 -24 -9 -30 0 -30 C9 -30 19 -24 17 -4 Q0 -10 -17 -4Z" fill="#94A3B8" stroke="${L}" stroke-width="0.9"/>
    <path d="M-16 -8 Q0 -14 16 -8" stroke="#FACC15" stroke-width="2" fill="none"/><path d="M0 -30 V-38" stroke="${L}" stroke-width="2"/>
    <path d="M0 -38 Q-6 -44 -3 -50 Q0 -44 3 -50 Q6 -44 0 -38Z" fill="#DC2626" stroke="${L}" stroke-width="0.6"/></g>`,
  /** Nón dấu lính: nón chóp nhỏ màu đen, quả tua đỏ. */
  soldier: `<g><path d="M-23 -7 L0 -32 L23 -7 Q0 -2 -23 -7Z" fill="#1F2937" stroke="${L}" stroke-width="0.9"/>
    <path d="M-12 -14 L0 -32 L12 -14" stroke="#475569" stroke-width="0.8" fill="none"/><circle cx="0" cy="-33" r="3.2" fill="#DC2626" stroke="${L}" stroke-width="0.6"/></g>`,
  /** Khăn vấn / khăn đóng đen (nho sĩ, dân làng). */
  khan: `<g><path d="M-17.5 -3 C-19 -20 -9 -25 0 -25 C9 -25 19 -20 17.5 -3 Q0 -9 -17.5 -3Z" fill="#1F2937" stroke="${L}" stroke-width="0.8"/>
    <path d="M-16 -10 Q0 -16 16 -10 M-15 -16 Q0 -21 15 -16" stroke="#475569" stroke-width="1" fill="none"/></g>`,
  /** Khăn đỏ quấn đầu (nghĩa quân, lính Tây Sơn). */
  band: `<g><path d="M-17 -6 C-18 -18 -9 -23 0 -23 C9 -23 18 -18 17 -6 Q0 -12 -17 -6Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/>
    <path d="M15 -8 q8 2 10 10 q-6 -2 -9 -5Z" fill="#DC2626" stroke="${L}" stroke-width="0.6"/></g>`,
  /** Mũ quân giặc (Nguyên / Minh / Thanh): mũ tròn xám có chóp. */
  enemy: `<g><path d="M-18 -5 C-19 -22 -9 -27 0 -27 C9 -27 19 -22 18 -5 Q0 -10 -18 -5Z" fill="#6B7280" stroke="${L}" stroke-width="0.9"/>
    <path d="M-19 -5 Q0 -12 19 -5 L21 -2 Q0 -8 -21 -2Z" fill="#4B5563" stroke="${L}" stroke-width="0.6"/><path d="M0 -27 V-34" stroke="${L}" stroke-width="2"/><circle cx="0" cy="-35" r="2.6" fill="#9CA3AF" stroke="${L}" stroke-width="0.6"/></g>`,
  /** Mũ của vua nhà Minh / sứ giả phương Bắc khác: dùng HAT.enemy hoặc mũ cast 'envoy'. */
};

const HEAD = { adult: { cy: -144, k: 0.875, side: 14.6 / 16 }, kid: { cy: -101, k: 1, side: 16.4 / 16 } };
/** Gắn mũ lên con rối (sau khi dựng): dáng trước (trong nhóm đầu, xoay theo đầu) và dáng nghiêng (khi đi). */
export function wear(st, id, svg) {
  const A = st.a(id);
  const G = HEAD[A.kind] || HEAD.adult;
  A.inner.querySelectorAll('.vs-hat').forEach((g) => g.remove());
  if (!svg) return;
  const ns = 'http://www.w3.org/2000/svg';
  const heads = A.inner.querySelectorAll('.pp-front .pp-headw > g');
  const front = heads[heads.length - 1];
  if (front) { const g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'vs-hat'); g.innerHTML = svg; front.appendChild(g); }
  const bob = A.inner.querySelector('.pp-side .sv-bob');
  if (bob) {
    const g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'vs-hat');
    g.setAttribute('transform', `translate(0 ${G.cy}) scale(${G.side})`); g.innerHTML = svg;
    bob.insertBefore(g, bob.querySelector('.pp-chest'));
  }
}
/**
 * Áo dài chạm đất ở dáng nghiêng (rig chỉ vẽ áo thụng khi đứng trước mặt; đi nghiêng thì thân dưới thành áo ngắn, lộ chân):
 * phủ một vạt áo từ eo xuống gần đất, chừa mũi giày. Gọi sau khi dựng nhân vật (init / redress). Màu lấy từ CAST nếu không truyền.
 */
export function robe(st, id, color, trim) {
  const A = st.a(id), c = CAST[A.who];
  color = color || c.shirt; trim = trim || c.trimC || color;
  const kid = A.kind === 'kid';
  const top = kid ? -60 : -100, hem = kid ? -7 : -8, w = kid ? 12 : 15;
  const ns = 'http://www.w3.org/2000/svg';
  A.inner.querySelectorAll('.vs-robe').forEach((g) => g.remove());
  const bob = A.inner.querySelector('.pp-side .sv-bob');
  if (!bob) return;
  const g = document.createElementNS(ns, 'g'); g.setAttribute('class', 'vs-robe');
  g.innerHTML = `<path d="M${-w} ${top} H${w - 2} L${w + 9} ${hem} Q0 ${hem + 4} ${-w - 9} ${hem}Z" fill="${color}" stroke="${L}" stroke-width="1"/>
    <path d="M${-w - 7} ${hem - 4} Q0 ${hem} ${w + 7} ${hem - 4}" stroke="${trim}" stroke-width="3" fill="none"/><path d="M${w - 4} ${top + 2} L${w + 4} ${hem - 2}" stroke="${L}" stroke-width="0.7" opacity="0.5"/>
    <rect x="${-w}" y="${top - 2}" width="${2 * w - 2}" height="6" rx="2" fill="${trim}" stroke="${L}" stroke-width="0.7"/>`;
  bob.insertBefore(g, bob.querySelector('.pp-chest'));
}
/** Đổi bộ đồ ngay (không khói) rồi gắn lại mũ. */
export function redress(st, id, who, hat, long = false) { const A = st.a(id); A.who = who; A.build(); if (hat) wear(st, id, hat); if (long) robe(st, id); }

/** Người tĩnh (vẽ sẵn trên thuyền, trên ngựa…): person() của cast.js + mũ cổ. pose: stand · sit · wave · point · cheer · raise. */
export function fig(x, y, who, { pose = 'stand', s = 1, flip = false, hat = '', mood } = {}) {
  const c = CAST[who];
  const k = c.adult ? 0.875 : 1, cy = c.adult ? -144 : -101, dy = pose === 'sit' ? (c.adult ? 38 : 24) : 0;
  return `<g>${person(x, y, who, pose, { s, flip, mood })}${hat ? `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s}) translate(0 ${cy + dy}) scale(${k})">${hat}</g>` : ''}</g>`;
}
/** Áo giáp (đeo trước ngực bằng st.chest): tấm giáp vảy. */
export const ARMOR = (c = '#B45309') => `<g transform="translate(0 -6)"><path d="M-13 -16 H13 L11 14 Q0 18 -11 14Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>
  ${[-8, 0, 8].map((y) => `<path d="M-11 ${y} q3.6 3 7.3 0 q3.6 3 7.3 0 q3.6 3 7.3 0" stroke="#78350F" stroke-width="0.8" fill="none"/>`).join('')}<circle cy="-10" r="3" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g>`;

// ── Cảnh ─────────────────────────────────────────────────────────────────────────────────
/** Trời màu (gradient riêng). */
export const skyG = (x, w, id, top = '#7DD3FC', bot = '#FEF3C7') => `<defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bot}"/></linearGradient></defs>
  <rect x="${x}" y="0" width="${w}" height="315" fill="url(#${id})"/>`;
/** Dãy núi xa (núi đá vôi / đồi), chân ở y. */
export const hills = (x, w, y, c = '#86C49A', h = 90) => {
  const n = Math.max(2, Math.round(w / 120));
  const d = Array.from({ length: n }, (_, i) => { const a = x + (i * w) / n, b = a + w / n, t = y - h * (0.6 + ((i * 37) % 10) / 25); return `Q${f(a + (b - a) * 0.15)} ${f(t)} ${f((a + b) / 2)} ${f(t)} Q${f(b - (b - a) * 0.15)} ${f(t)} ${f(b)} ${y}`; }).join(' ');
  return `<path d="M${x} ${y} ${d} V${y + 2} H${x}Z" fill="${c}" stroke="${L}" stroke-width="0.8"/>`;
};
/** Đất (cỏ hoặc đất nện) từ x tới x+w, mặt ở floor. */
export const ground = (x, w, floor, c = '#A3D977', edge = '#7FB85A') => `<rect x="${x}" y="${floor}" width="${w}" height="${315 - floor}" fill="${c}" stroke="${L}"/>
  ${Array.from({ length: Math.floor(w / 54) }, (_, i) => `<path d="M${x + 18 + i * 54} ${floor + 12} l3 -7 l3 7" stroke="${edge}" stroke-width="1.4" fill="none"/>`).join('')}`;
/** Bụi tre (gốc ở y). */
export const bamboo = (x, y, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">${[-14, -4, 6, 15].map((dx, i) => `<g class="ek-sway" style="animation-delay:${i * 0.4}s;transform-origin:${dx}px 0px">
  <path d="M${dx} 0 Q${dx + (i - 1.5) * 6} -80 ${dx + (i - 1.5) * 14} -150" stroke="${L}" stroke-width="5.4" fill="none"/><path d="M${dx} 0 Q${dx + (i - 1.5) * 6} -80 ${dx + (i - 1.5) * 14} -150" stroke="#65A30D" stroke-width="3.6" fill="none"/>
  ${[-36, -70, -104].map((y) => `<path d="M${dx + (i - 1.5) * (-y / 26) - 3} ${y} h6" stroke="${L}" stroke-width="1"/>`).join('')}
  ${[-120, -140, -90].map((y, j) => `<path d="M${dx + (i - 1.5) * (-y / 11)} ${y} q${j % 2 ? -14 : 14} -2 ${j % 2 ? -22 : 22} 8 q${j % 2 ? 8 : -8} -10 ${j % 2 ? 22 : -22} -8Z" fill="#4ADE80" stroke="${L}" stroke-width="0.6"/>`).join('')}</g>`).join('')}</g>`;
/** Nhà tranh vách đất (gốc = giữa chân tường). */
export const hut = (x, y, w = 120, s = 1) => `<g transform="translate(${x} ${y}) scale(${s})">
  <rect x="${-w / 2}" y="-62" width="${w}" height="62" fill="#E7C9A0" stroke="${L}" stroke-width="1.1"/>
  <rect x="-14" y="-46" width="28" height="46" fill="#7C4A1E" stroke="${L}"/><rect x="${w / 2 - 34}" y="-46" width="20" height="18" fill="#7C4A1E" stroke="${L}" stroke-width="0.8"/>
  <path d="M${-w / 2 - 22} -56 L${-w / 2 + 14} -110 H${w / 2 - 14} L${w / 2 + 22} -56Z" fill="#D4A762" stroke="${L}" stroke-width="1.1"/>
  ${Array.from({ length: Math.floor(w / 12) }, (_, i) => `<path d="M${-w / 2 - 10 + i * 13} -60 l6 -14" stroke="#B08445" stroke-width="1"/>`).join('')}
  <path d="M${-w / 2 + 14} -110 H${w / 2 - 14}" stroke="#92673A" stroke-width="3"/></g>`;
/**
 * Cung điện mái cong hai tầng (gốc = giữa nền). roof: màu ngói (vàng: hoàng cung).
 */
export const palace = (x, y, w = 260, { roof = '#EAB308', wall = '#FDE68A', plaque = '' } = {}) => {
  const cols = Array.from({ length: 5 }, (_, i) => -w / 2 + 20 + (i * (w - 40)) / 4);
  const eave = (yy, ww, hh, c) => `<path d="M${-ww / 2 - 30} ${yy} Q${-ww / 2 - 42} ${yy - 4} ${-ww / 2 - 44} ${yy - 18} Q${-ww / 2 - 30} ${yy - 8} ${-ww / 2 - 14} ${yy - 12} L${-ww / 2 + 14} ${yy - hh} H${ww / 2 - 14} L${ww / 2 + 14} ${yy - 12} Q${ww / 2 + 30} ${yy - 8} ${ww / 2 + 44} ${yy - 18} Q${ww / 2 + 42} ${yy - 4} ${ww / 2 + 30} ${yy}Z" fill="${c}" stroke="${L}" stroke-width="1.2"/>
    ${Array.from({ length: Math.floor(ww / 16) }, (_, i) => `<path d="M${-ww / 2 - 8 + i * 16 + 8} ${yy - 2} L${-ww / 2 + 16 + i * 14.4} ${yy - hh + 2}" stroke="#B45309" stroke-width="0.8" opacity="0.6"/>`).join('')}
    <path d="M${-ww / 2 + 14} ${yy - hh} H${ww / 2 - 14}" stroke="#B45309" stroke-width="3.4"/>`;
  return `<g transform="translate(${x} ${y})">
  <rect x="${-w / 2 - 16}" y="-14" width="${w + 32}" height="14" fill="#D6D3D1" stroke="${L}"/><rect x="${-w / 2 - 6}" y="-22" width="${w + 12}" height="9" fill="#E7E5E4" stroke="${L}" stroke-width="0.8"/>
  ${[0, 1, 2].map((i) => `<rect x="${-28 + i * 4}" y="${-14 + i * 4.6 - 8}" width="${56 - i * 8}" height="5" fill="#E7E5E4" stroke="${L}" stroke-width="0.5"/>`).join('')}
  <rect x="${-w / 2 + 14}" y="-112" width="${w - 28}" height="90" fill="${wall}" stroke="${L}"/>
  ${[-1, 0, 1].map((i) => `<rect x="${i * 64 - 16}" y="-74" width="32" height="52" fill="#B91C1C" stroke="${L}"/><path d="M${i * 64} -74 V-22" stroke="#7F1D1D" stroke-width="1"/>`).join('')}
  ${cols.map((cx) => `<rect x="${cx - 5}" y="-114" width="10" height="92" fill="#DC2626" stroke="${L}" stroke-width="0.9"/>`).join('')}
  ${eave(-108, w, 34, roof)}
  <rect x="${-w / 2 + 50}" y="-158" width="${w - 100}" height="20" fill="${wall}" stroke="${L}"/>
  ${eave(-150, w - 80, 34, roof)}
  ${[-1, 1].map((s) => `<path d="M${s * (w / 2 - 54)} -186 q${s * 8} -10 ${s * 2} -18 q${s * 10} 2 ${s * 10} 12" stroke="${L}" stroke-width="3" fill="none"/><path d="M${s * (w / 2 - 54)} -186 q${s * 8} -10 ${s * 2} -18 q${s * 10} 2 ${s * 10} 12" stroke="#22C55E" stroke-width="1.8" fill="none"/>`).join('')}
  <circle cx="0" cy="-190" r="6" fill="#FACC15" stroke="${L}" stroke-width="0.8"/>
  ${plaque ? `<rect x="-40" y="-104" width="80" height="18" rx="2" fill="#7F1D1D" stroke="#FACC15" stroke-width="1.4"/><text x="0" y="-91" text-anchor="middle" ${NUN} font-size="10" fill="#FDE68A">${plaque}</text>` : ''}</g>`;
};
/** Tường thành + cổng vòm + vọng lâu (gốc = giữa chân cổng). */
export const cityGate = (x, y, w = 340, name = '') => `<g transform="translate(${x} ${y})">
  <rect x="${-w / 2}" y="-120" width="${w}" height="120" fill="#C8B79A" stroke="${L}" stroke-width="1.2"/>
  ${Array.from({ length: Math.floor(w / 26) }, (_, i) => `<rect x="${-w / 2 + i * 26}" y="-132" width="16" height="13" fill="#C8B79A" stroke="${L}" stroke-width="0.9"/>`).join('')}
  ${Array.from({ length: 5 }, (_, r) => `<path d="M${-w / 2} ${-100 + r * 20} H${w / 2}" stroke="#A8977A" stroke-width="0.8"/>`).join('')}
  <path d="M-30 0 V-60 Q-30 -90 0 -90 Q30 -90 30 -60 V0Z" fill="#4B3A2A" stroke="${L}" stroke-width="1.2"/>
  <rect x="-62" y="-176" width="124" height="44" fill="#FDE68A" stroke="${L}"/>${[-48, -16, 16, 48].map((cx) => `<rect x="${cx - 4}" y="-176" width="8" height="44" fill="#DC2626" stroke="${L}" stroke-width="0.7"/>`).join('')}
  <path d="M-96 -168 Q-106 -170 -108 -182 Q-94 -174 -80 -178 L-56 -204 H56 L80 -178 Q94 -174 108 -182 Q106 -170 96 -168Z" fill="#B45309" stroke="${L}" stroke-width="1.1"/>
  ${name ? `<rect x="-44" y="-118" width="88" height="18" rx="2" fill="#FEF3C7" stroke="${L}"/><text x="0" y="-105" text-anchor="middle" ${NUN} font-size="10.5" fill="#7F1D1D">${name}</text>` : ''}</g>`;
/** Lều trại (gốc = giữa chân). */
export const tent = (x, y, c = '#FDE68A', s = 1) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-40 0 L0 -54 L40 0Z" fill="${c}" stroke="${L}" stroke-width="1.1"/><path d="M0 -54 L-10 0 H10Z" fill="#7C4A1E" opacity="0.6"/><path d="M0 -54 V-64" stroke="${L}" stroke-width="2"/></g>`;
/**
 * Cờ trên cán (gốc = chân cán ở (x, y)), cao h, vải w × hh màu c; txt chữ trên cờ; p = tiền tố CSS (vải bay: p-wave).
 */
export const flag = (p, x, y, { h = 120, w = 46, hh = 30, c = '#DC2626', txt = '', tc = '#FACC15', fs = 9, cls = '', tri = false } = {}) => `<g class="${cls}" transform="translate(${x} ${y})">
  <path d="M0 0 V${-h}" stroke="#7C4A1E" stroke-width="3" stroke-linecap="round"/><circle cy="${-h - 2}" r="2.6" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>
  <g class="${p}-wave" style="transform-origin:0px ${-h + hh / 2}px">${tri ? `<path d="M0 ${-h} L${w} ${-h + hh / 2} L0 ${-h + hh}Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>`
    : `<path d="M0 ${-h} H${w} Q${w - 6} ${-h + hh / 2} ${w} ${-h + hh} H0Z" fill="${c}" stroke="${L}" stroke-width="0.9"/>`}
  ${txt ? txt.split('|').map((t, i, a) => `<text x="${w / 2 - 2}" y="${-h + hh / 2 + (i - (a.length - 1) / 2) * (fs + 2) + fs * 0.36}" text-anchor="middle" ${NUN} font-size="${fs}" fill="${tc}">${t}</text>`).join('') : ''}</g></g>`;
/** Lịch tờ (gốc = tâm): tháng / số ngày lớn. */
export const calendar = (x, y, top, num, { cls = '', s = 1 } = {}) => `<g class="${cls}" transform="translate(${x} ${y}) scale(${s})"><rect x="-26" y="-30" width="52" height="60" rx="5" fill="#fff" stroke="${L}" stroke-width="1.2"/>
  <rect x="-26" y="-30" width="52" height="17" rx="5" fill="#DC2626" stroke="${L}" stroke-width="1.2"/><text x="0" y="-17.5" text-anchor="middle" ${NUN} font-size="10" fill="#fff">${top}</text>
  <text x="0" y="20" text-anchor="middle" ${NUN} font-size="32" fill="#B91C1C">${num}</text></g>`;
/** Cành đào (gốc = gốc cành), hoa class p-bloom nở dần. */
export const peach = (p, x, y, s = 1, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><path d="M0 0 Q-4 -30 6 -56 M2 -28 Q16 -38 22 -54 M4 -44 Q-12 -52 -16 -64" stroke="#7C4A1E" stroke-width="3" fill="none" stroke-linecap="round"/>
  ${[[6, -58], [22, -56], [-16, -66], [12, -40], [-6, -46], [16, -48], [0, -64], [-10, -56]].map(([bx, by], i) => `<g class="${p}-bloom" style="animation-delay:${i * 0.08}s;transform-origin:${bx}px ${by}px">${[0, 72, 144, 216, 288].map((r) => `<ellipse cx="${bx}" cy="${by - 3}" rx="2.4" ry="3.4" fill="#F9A8D4" stroke="#DB2777" stroke-width="0.4" transform="rotate(${r} ${bx} ${by})"/>`).join('')}<circle cx="${bx}" cy="${by}" r="1.4" fill="#FDE047"/></g>`).join('')}</g>`;

// ── Con vật / thuyền (kind 'thing', quay sang phải, gốc = điểm chạm đất) ─────────────────────
/** Voi châu Á cỡ thật so với người (cao ≈ 210, người lớn ≈ 165). Chân lgA / lgB bước khi .is-walk; vòi p-trunk. */
export const elephant = (p, { saddle = '' } = {}) => {
  const C = '#9CA3AF', D = '#7B8494';
  const legv = (x, cls, c) => `<g class="${p}-${cls}" style="transform-origin:${x}px -78px"><rect x="${x - 15}" y="-80" width="30" height="80" rx="11" fill="${c}" stroke="${L}" stroke-width="1.2"/><path d="M${x - 10} -4 h5 M${x + 1} -4 h5" stroke="#E5E7EB" stroke-width="2.4" stroke-linecap="round"/></g>`;
  return `<g>
  <path d="M-108 -140 Q-122 -120 -118 -94" stroke="${L}" stroke-width="5.4" fill="none" stroke-linecap="round"/><path d="M-108 -140 Q-122 -120 -118 -94" stroke="${C}" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  ${legv(-74, 'lgB', D)}${legv(52, 'lgA', D)}
  <path d="M-112 -120 Q-116 -192 -20 -196 Q70 -200 92 -150 Q104 -110 84 -76 Q0 -62 -90 -72 Q-112 -86 -112 -120Z" fill="${C}" stroke="${L}" stroke-width="1.4"/>
  <path d="M-80 -170 q12 -6 24 0 M-44 -182 q12 -6 24 0" stroke="${D}" stroke-width="1.6" fill="none"/>
  ${saddle}
  ${legv(-50, 'lgA', C)}${legv(74, 'lgB', C)}
  <g class="${p}-trunk" style="transform-origin:126px -150px"><path d="M122 -158 Q152 -132 146 -84 Q142 -46 158 -34" stroke="${L}" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M122 -158 Q152 -132 146 -84 Q142 -46 158 -34" stroke="${C}" stroke-width="19" fill="none" stroke-linecap="round"/>
    <path d="M136 -98 h13 M135 -82 h12 M138 -66 h11" stroke="${D}" stroke-width="1.4"/></g>
  <path d="M84 -186 Q128 -196 134 -156 Q140 -126 118 -116 Q96 -110 86 -130Z" fill="${C}" stroke="${L}" stroke-width="1.4"/>
  <path d="M120 -122 Q132 -110 146 -114 Q134 -118 128 -128Z" fill="#FFFBEB" stroke="${L}"/>
  <g class="${p}-ear" style="transform-origin:96px -168px"><path d="M98 -182 Q66 -186 64 -156 Q66 -128 96 -134Z" fill="#AEB5C1" stroke="${L}" stroke-width="1.3"/><path d="M94 -174 Q74 -176 72 -156 Q74 -138 92 -140Z" fill="#F9A8D4" opacity="0.55"/></g>
  <ellipse cx="116" cy="-164" rx="3.2" ry="4.2" fill="#2B1D16"/><circle cx="117" cy="-166" r="1.1" fill="#fff"/></g>`;
};
/** Ngựa (cao vai ≈ 120). rider = SVG người ngồi (gốc yên ngựa ≈ (−6, −120)). Chân lgA / lgB phi khi .is-walk. */
export const horse = (p, { c = '#A16207', mane = '#3F2A1A', rider = '' } = {}) => {
  const D = mane;
  const lg = (x, cls, col) => `<g class="${p}-${cls}" style="transform-origin:${x}px -64px"><path d="M${x - 5} -66 L${x - 6} -6 H${x + 4} L${x + 5} -66Z" fill="${col}" stroke="${L}" stroke-width="1"/><rect x="${x - 7}" y="-7" width="12" height="7" rx="2" fill="#1F2937"/></g>`;
  return `<g>
  <path d="M-58 -96 Q-80 -86 -76 -50 Q-70 -70 -60 -80" fill="${D}" stroke="${L}" stroke-width="0.9"/>
  ${lg(-44, 'lgB', '#7C4A1E')}${lg(34, 'lgA', '#7C4A1E')}
  <path d="M-62 -98 Q-64 -124 -20 -122 Q30 -126 50 -112 Q62 -96 50 -70 Q0 -60 -52 -68 Q-64 -76 -62 -98Z" fill="${c}" stroke="${L}" stroke-width="1.3"/>
  ${lg(-30, 'lgA', c)}${lg(46, 'lgB', c)}
  <path d="M40 -112 Q58 -150 76 -160 Q92 -158 98 -140 L100 -126 Q96 -118 86 -122 L76 -132 Q66 -110 58 -90Z" fill="${c}" stroke="${L}" stroke-width="1.3"/>
  <path d="M44 -114 Q56 -150 74 -162 Q68 -150 62 -132 Q58 -120 52 -106Z" fill="${D}"/>
  <path d="M76 -160 l-2 -10 l8 7Z" fill="${c}" stroke="${L}" stroke-width="0.8"/>
  <circle cx="84" cy="-146" r="2.2" fill="#1F2937"/><circle cx="96" cy="-128" r="1.4" fill="#1F2937"/>
  <path d="M-30 -122 Q-6 -118 16 -124 L12 -108 Q-6 -104 -26 -108Z" fill="#B91C1C" stroke="${L}" stroke-width="0.9"/>
  <path d="M82 -150 L60 -118" stroke="#78350F" stroke-width="1.2"/>
  ${rider}</g>`;
};
/** Thuyền rồng (dài ≈ 340): đầu rồng bên phải, mái che, gốc = giữa đáy ở mực nước. extra = người vẽ trên thuyền. */
export const dragonBoat = (extra = '', { roof = true } = {}) => `<g>
  <path d="M-170 -24 Q-180 -40 -196 -46 Q-178 -30 -160 -16Z" fill="#FACC15" stroke="${L}" stroke-width="1"/>
  ${extra}
  <path d="M-170 -24 H150 Q164 -20 160 -4 Q150 10 120 12 H-140 Q-164 8 -170 -24Z" fill="#B91C1C" stroke="${L}" stroke-width="1.4"/>
  <path d="M-162 -16 H152" stroke="#FACC15" stroke-width="3"/>${Array.from({ length: 9 }, (_, i) => `<circle cx="${-130 + i * 30}" cy="-4" r="4" fill="#FACC15" stroke="${L}" stroke-width="0.6"/>`).join('')}
  <path d="M148 -22 Q156 -60 176 -74 Q196 -80 204 -66 Q196 -60 186 -62 Q192 -52 182 -48 Q170 -46 166 -38 Q162 -28 160 -14Z" fill="#22C55E" stroke="${L}" stroke-width="1.2"/>
  <path d="M176 -74 q-4 -10 4 -16 M186 -72 q2 -10 10 -12" stroke="#FACC15" stroke-width="2" fill="none"/><circle cx="190" cy="-68" r="2.2" fill="#1F2937"/>
  ${roof ? `<path d="M-90 -24 V-88 M10 -24 V-88" stroke="#7F1D1D" stroke-width="4"/><path d="M-114 -84 Q-112 -96 -100 -98 L-80 -112 H0 L20 -98 Q32 -96 34 -84Z" fill="#EAB308" stroke="${L}" stroke-width="1.1"/>` : ''}</g>`;
/** Thuyền gỗ lớn chở voi (dài ≈ 400), mép mạn ở y = −40 so với mực nước (gốc = giữa đáy ở mực nước). inner = vạch / đá. */
export const barge = (inner = '') => `<g>
  <path d="M-206 -46 L-188 -40 H188 L206 -46 Q200 -8 170 6 H-170 Q-200 -8 -206 -46Z" fill="#A16207" stroke="${L}" stroke-width="1.4"/>
  <path d="M-196 -30 H196 M-188 -16 H188" stroke="#7C4A1E" stroke-width="1.2"/>
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${-170 + i * 31} -40 V6" stroke="#8B5A1E" stroke-width="0.8"/>`).join('')}
  <rect x="-190" y="-48" width="380" height="8" rx="2" fill="#CA8A04" stroke="${L}" stroke-width="1"/>${inner}</g>`;
/** Rùa vàng (mai tròn, đầu nhô sang phải), gốc = giữa mai ở mặt nước. */
export const turtle = (p) => `<g>
  <g class="${p}-thead" style="transform-origin:46px -20px"><path d="M40 -18 Q54 -46 74 -46 Q90 -44 88 -30 Q84 -18 66 -20 Q56 -16 50 -8Z" fill="#FCD34D" stroke="${L}" stroke-width="1.2"/>
    <circle cx="78" cy="-36" r="2.6" fill="#1F2937"/><circle cx="79" cy="-37" r="0.9" fill="#fff"/><path d="M80 -27 q4 1 6 -2" stroke="${L}" stroke-width="1" fill="none"/></g>
  <path d="M-58 -2 Q-56 -60 0 -62 Q56 -60 58 -2Z" fill="#EAB308" stroke="${L}" stroke-width="1.4"/>
  <path d="M-20 -56 L-34 -30 L-20 -4 M20 -56 L34 -30 L20 -4 M-34 -30 H-54 M34 -30 H54 M-20 -4 H20 M-20 -56 H20 M-20 -56 L-8 -30 L-20 -4 M20 -56 L8 -30 L20 -4 M-8 -30 H8" stroke="#A16207" stroke-width="1.6" fill="none"/>
  <path d="M-30 -50 Q-10 -60 10 -56" stroke="#FEF3C7" stroke-width="2.4" fill="none" stroke-linecap="round" opacity="0.8"/></g>`;
/** Gươm (gốc = giữa, nằm ngang, mũi sang phải). glow = ánh sáng quanh. */
export const SWORD = (glow = true) => `<g>${glow ? `<ellipse rx="34" ry="9" fill="#FEF08A" opacity="0.55"/>` : ''}<path d="M-6 -2.6 H28 L34 0 L28 2.6 H-6Z" fill="#E5E7EB" stroke="${L}" stroke-width="0.8"/><path d="M-2 0 H26" stroke="#fff" stroke-width="0.8"/>
  <rect x="-10" y="-8" width="4" height="16" rx="1.5" fill="#FACC15" stroke="${L}" stroke-width="0.7"/><rect x="-26" y="-2.4" width="16" height="4.8" rx="2" fill="#7F1D1D" stroke="${L}" stroke-width="0.7"/><circle cx="-27" r="3" fill="#FACC15" stroke="${L}" stroke-width="0.6"/></g>`;
/** Đồ cầm tay (props của rig, gốc = bàn tay, cánh tay hướng +y). */
export const PROPS = {
  vs_sword: `<g transform="rotate(180)"><path d="M-2 -6 V30 L0 36 L2 30 V-6Z" fill="#E5E7EB" stroke="${L}" stroke-width="0.7"/><rect x="-7" y="-8" width="14" height="4" rx="1.5" fill="#FACC15" stroke="${L}" stroke-width="0.6"/><rect x="-2.4" y="-18" width="4.8" height="11" rx="2" fill="#7F1D1D" stroke="${L}" stroke-width="0.6"/></g>`,
  vs_brush: `<g transform="rotate(200)"><rect x="-1.4" y="-6" width="2.8" height="18" fill="#A16207" stroke="${L}" stroke-width="0.6"/><path d="M-2.2 12 H2.2 L0.6 21 Q0 22 -0.6 21Z" fill="#1F2937"/></g>`,
  vs_scroll: `<g transform="translate(0 -4)"><rect x="-9" y="-12" width="18" height="24" fill="#FEF3C7" stroke="${L}" stroke-width="0.7"/><rect x="-11" y="-14" width="22" height="4" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.6"/><rect x="-11" y="10" width="22" height="4" rx="2" fill="#A16207" stroke="${L}" stroke-width="0.6"/>
    <path d="M-5 -6 V6 M0 -6 V6 M5 -6 V6" stroke="#1F2937" stroke-width="1.2" stroke-dasharray="2 1.4"/></g>`,
  vs_orange: `<g transform="translate(0 -5)"><circle r="6.4" fill="#FB923C" stroke="${L}" stroke-width="0.8"/><path d="M0 -6 v-3" stroke="#78350F" stroke-width="1.2"/><ellipse cx="2.6" cy="-8.4" rx="2.6" ry="1.2" fill="#22C55E"/></g>`,
  vs_crushed: `<g transform="translate(0 -4)"><path d="M-7 -3 Q-4 -7 0 -4 Q5 -8 7 -2 Q5 4 0 3 Q-6 5 -7 -3Z" fill="#F97316" stroke="${L}" stroke-width="0.8"/><path d="M-3 -1 l2 2 M2 -3 l1 3" stroke="#C2410C" stroke-width="0.8"/></g>`,
  vs_flag: `<g transform="rotate(180)"><path d="M0 -10 V78" stroke="#7C4A1E" stroke-width="2.6" stroke-linecap="round"/><path d="M0 78 H-38 Q-33 68 -38 56 H0Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><path d="M-8 70 h-22 M-8 63 h-22" stroke="#FACC15" stroke-width="2"/></g>`,
  vs_flagUp: `<g><path d="M0 -30 V84" stroke="#7C4A1E" stroke-width="2.6" stroke-linecap="round"/><path d="M0 84 H-40 Q-35 72 -40 58 H0Z" fill="#DC2626" stroke="${L}" stroke-width="0.8"/><path d="M-8 76 h-24 M-8 67 h-24" stroke="#FACC15" stroke-width="2"/></g>`,
  vs_spear: `<g transform="rotate(180)"><path d="M0 -24 V62" stroke="#7C4A1E" stroke-width="2.4" stroke-linecap="round"/><path d="M0 62 L-3.4 70 L0 80 L3.4 70Z" fill="#CBD5E1" stroke="${L}" stroke-width="0.7"/><path d="M-3 60 h6" stroke="#DC2626" stroke-width="3"/></g>`,
  vs_peach: `<g transform="rotate(180)"><path d="M0 -4 Q-2 14 4 30 M2 14 Q10 18 14 28" stroke="#7C4A1E" stroke-width="2" fill="none"/>${[[4, 32], [14, 30], [-2, 22], [8, 20]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.6" fill="#F9A8D4" stroke="#DB2777" stroke-width="0.5"/><circle cx="${x}" cy="${y}" r="1.1" fill="#FDE047"/>`).join('')}</g>`,
  vs_letter: `<g transform="translate(0 -4)"><rect x="-8" y="-11" width="16" height="22" fill="#FEF3C7" stroke="${L}" stroke-width="0.7"/><path d="M-4 -6 V6 M1 -6 V6" stroke="#1F2937" stroke-width="1.1" stroke-dasharray="2 1.4"/></g>`,
  vs_stick: `<g transform="rotate(180)"><path d="M0 -4 V40" stroke="#A16207" stroke-width="2.4" stroke-linecap="round"/></g>`,
};

/** Khung kể chuyện ngày xưa (trên fg): viền giấy cũ quanh cả khung nhìn + nhãn trên cùng. Hiện bằng .st-frame. */
export const oldFrame = (p, x, w, text) => `<g class="${p}-frame"><rect x="${x + 6}" y="46" width="${w - 12}" height="263" rx="10" fill="none" stroke="${SEP}" stroke-width="5" stroke-dasharray="14 6"/>
  <g transform="translate(${x + w / 2} 64)"><rect x="${-text.length * 4.1 - 14}" y="-14" width="${text.length * 8.2 + 28}" height="26" rx="13" fill="#FEF3C7" stroke="${SEP}" stroke-width="1.6"/>
  <text y="5" text-anchor="middle" ${NUN} font-size="14" fill="${SEP}">${text}</text></g></g>`;

/** CSS dùng chung (cờ bay, chân con vật, vòi voi, tai, hoa đào nở, khung chuyện xưa, màu ảnh cũ, nhãn). */
export const vsCss = (p) => `
.${p}-wave { animation: ${p}Wave 1.3s ease-in-out infinite alternate; }
@keyframes ${p}Wave { from { transform: skewY(-4deg) scaleX(.94); } to { transform: skewY(4deg) scaleX(1.02); } }
.is-walk .${p}-lgA { animation: ${p}Leg .5s ease-in-out infinite alternate; }
.is-walk .${p}-lgB { animation: ${p}Leg .5s ease-in-out infinite alternate-reverse; }
@keyframes ${p}Leg { from { transform: rotate(-10deg); } to { transform: rotate(10deg); } }
.act-${p}trunk .${p}-trunk { animation: ${p}Trunk 1.6s ease-in-out infinite; }
@keyframes ${p}Trunk { 50% { transform: rotate(-26deg); } }
.act-${p}ear .${p}-ear, .is-walk .${p}-ear { animation: ${p}Ear .5s ease-in-out infinite alternate; }
@keyframes ${p}Ear { to { transform: scaleX(.8); } }
.${p}-bloom { transform: scale(.2); opacity: .4; transition: transform .5s cubic-bezier(.3,1.5,.6,1), opacity .4s; }
.st-bloom .${p}-bloom { transform: none; opacity: 1; }
.${p}-frame { opacity: 0; transition: opacity .5s; }
.st-frame .${p}-frame { opacity: 1; }
.${p}-tint { opacity: 0; transition: opacity .8s; pointer-events: none; }
.st-past .${p}-tint { opacity: .26; }
.${p}-lb { opacity: 0; transition: opacity .35s; }
@media (prefers-reduced-motion: reduce) {
  .${p}-wave { animation-duration: 4s; }
  .is-walk .${p}-lgA, .is-walk .${p}-lgB { animation-duration: 1s; }
}
`;
/** Nhãn bật / tắt: lb(p, 'k', svg) + CSS `.st-lb-k .p-lb-k { opacity: 1 }` (lbCss). */
export const lb = (p, k, svg) => `<g class="${p}-lb ${p}-lb-${k}">${svg}</g>`;
export const lbCss = (p, keys) => `${keys.map((k) => `.st-lb-${k} .${p}-lb-${k}`).join(', ')} { opacity: 1; }`;
/** Tắt nhiều trạng thái cảnh. */
export const off = (st, ...ks) => ks.forEach((k) => st.set(k, false));
/** Bật / tắt class riêng trên một nhân vật (giữ qua các nhịp, khác act bị xoá đầu mỗi nhịp). */
export const mark = (st, id, c, on = true) => { const A = st.a(id); A.el.classList.toggle(c, on); if (st.instant) st.snap(A.el); };
