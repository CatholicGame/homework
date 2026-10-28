/**
 * 🧊 Khối lập phương, khối hộp chữ nhật (Toán 3 KNTT Tập 1, Bài 21). Mỗi lượt là đề mới:
 *   cấp 1 Nhận dạng: đồ vật vẽ riêng (xúc xắc, rubik, hộp sữa, viên gạch, tủ lạnh…, lon nước, quả bóng làm nhiễu)
 *         lần lượt lên bàn, em bấm nút to "Khối lập phương / Khối hộp chữ nhật / Khối khác", đồ vật bay vào nút;
 *   cấp 2 Đỉnh, cạnh, mặt: khối vẽ kiểu sách (cạnh khuất nét đứt). Em chọn tên khối, chạm từng đỉnh / cạnh / mặt
 *         để đếm (mặt khuất chạm vào nhãn "mặt sau", "mặt đáy", "mặt bên trái"), gõ số; kiểm tra: đếm lại theo nhóm
 *         4 + 4 + 4 = 12 cạnh, 4 + 4 = 8 đỉnh, 2 + 2 + 2 = 6 mặt;
 *   cấp 3 Đếm khối lập phương nhỏ: các khối xếp chồng (có khối bị che), em gõ số khối, rồi các tầng tách ra, đếm từng tầng;
 *   cấp 4 Trộn.
 * Mọi vùng có chỗ từ đầu lượt (khay trong nút, dòng trả lời, dòng tầng), chỉ hiện dần, không xô gì.
 */

import { mountDrill, shake, setActive, flyOne, calmMotion, fresh, sfx, sleep, how, TEACHER, INK, EDGE } from './kit.js';

const NS = 'http://www.w3.org/2000/svg';
const f2 = (v) => +(+v).toFixed(3);
const pts = (P) => P.map(p => `${f2(p[0])},${f2(p[1])}`).join(' ');
/** Pha màu: t > 0 sáng dần về trắng, t < 0 tối dần về đen. */
function shade(hex, t) {
  const n = parseInt(hex.slice(1), 16);
  const k = t > 0 ? 255 : 0, a = Math.abs(t);
  const c = [n >> 16, (n >> 8) & 255, n & 255].map(v => Math.round(v + (k - v) * a));
  return `#${c.map(v => v.toString(16).padStart(2, '0')).join('')}`;
}

// Hình chiếu kiểu sách: mặt trước thật, chiều sâu đi chéo lên bên phải.
const DX = 0.5, DY = -0.38;
const INKA = `class="g3s-ink" stroke="${INK}" stroke-width="2.6" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"`;

/**
 * Khối hộp vẽ từ góc trên bên trái mặt trước (x, y), rộng w, cao h, sâu d. deco.front / top / side: SVG trong ô
 * vuông đơn vị (0..1) của mặt đó (chỉ tô màu, không nét), hoặc hàm (at) → SVG toạ độ thật. at(mặt, u, v) → điểm.
 */
function prism({ x = 0, y = 0, w, h, d, col, top, side, deco = {} }) {
  const dx = d * DX, dy = d * DY;
  const F = [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];
  const T = [[x, y], [x + w, y], [x + w + dx, y + dy], [x + dx, y + dy]];
  const S = [[x + w, y], [x + w + dx, y + dy], [x + w + dx, y + h + dy], [x + w, y + h]];
  const M = { front: [w, 0, 0, h, x, y], top: [w, 0, -dx, -dy, x + dx, y + dy], side: [dx, dy, 0, h, x + w, y] };
  const at = (k, u, v) => { const m = M[k]; return [m[0] * u + m[2] * v + m[4], m[1] * u + m[3] * v + m[5]]; };
  const lay = (k) => {
    const dd = deco[k];
    if (!dd) return '';
    return typeof dd === 'function' ? dd(at) : `<g transform="matrix(${M[k].map(f2).join(' ')})">${dd}</g>`;
  };
  const svg = `<polygon points="${pts(F)}" fill="${col}"/>${lay('front')}<polygon points="${pts(T)}" fill="${top || shade(col, 0.35)}"/>${lay('top')}`
    + `<polygon points="${pts(S)}" fill="${side || shade(col, -0.2)}"/>${lay('side')}`
    + `<g fill="none" ${INKA}><polygon points="${pts(F)}"/><polygon points="${pts(T)}"/><polygon points="${pts(S)}"/></g>`;
  return { svg, bb: { x0: x, y0: y + dy, x1: x + w + dx, y1: y + h }, at };
}
const grow = (bb, g) => ({ x0: bb.x0 + (g.x0 || 0), y0: bb.y0 + (g.y0 || 0), x1: bb.x1 + (g.x1 || 0), y1: bb.y1 + (g.y1 || 0) });

// ── Đồ vật (SVG riêng, màu tươi, viền mực) ───────────────────────────────────────────────────────────────
const pip = (u, v, r = 0.085, c = INK) => `<circle cx="${u}" cy="${v}" r="${r}" fill="${c}"/>`;
const stickers = (c) => Array.from({ length: 9 }, (_, i) => `<rect x="${(i % 3) / 3 + 0.035}" y="${Math.floor(i / 3) / 3 + 0.035}" width="0.263" height="0.263" rx="0.05" fill="${c}"/>`).join('');
const frame = (dark, light) => `<rect x="0.07" y="0.07" width="0.86" height="0.86" fill="${dark}"/><rect x="0.13" y="0.13" width="0.74" height="0.74" fill="${light}"/>`;
const letter = (t, c) => `<text x="0.5" y="0.73" text-anchor="middle" font-size="0.62" font-weight="900" font-family="'Baloo 2', sans-serif" fill="${c}">${t}</text>`;

function dice() {
  return prism({ w: 4, h: 4, d: 4, col: '#FFFFFF', top: '#F8FAFC', side: '#E2E8F0', deco: {
    front: [[0.25, 0.25], [0.75, 0.25], [0.5, 0.5], [0.25, 0.75], [0.75, 0.75]].map(([u, v]) => pip(u, v)).join(''),
    top: pip(0.5, 0.5, 0.14, '#EF4444'),
    side: [[0.25, 0.25], [0.5, 0.5], [0.75, 0.75]].map(([u, v]) => pip(u, v)).join(''),
  } });
}
function rubik() {
  return prism({ w: 4, h: 4, d: 4, col: '#3F3A40', top: '#3F3A40', side: '#2B272C', deco: { front: stickers('#22C55E'), top: stickers('#FFFFFF'), side: stickers('#EF4444') } });
}
function gift() {
  const rib = '#FDE047';
  const p = prism({ w: 4, h: 4, d: 4, col: '#F472B6', deco: {
    front: `<rect x="0.42" y="0" width="0.16" height="1" fill="${rib}"/>`,
    top: `<rect x="0.42" y="0" width="0.16" height="1" fill="${rib}"/><rect x="0" y="0.42" width="1" height="0.16" fill="${rib}"/>`,
    side: `<rect x="0.42" y="0" width="0.16" height="1" fill="${shade(rib, -0.12)}"/>`,
  } });
  const [cx, cy] = p.at('top', 0.5, 0.5);
  const bow = `<g ${INKA} fill="${rib}"><ellipse cx="${cx - 0.62}" cy="${cy - 0.42}" rx="0.7" ry="0.42" transform="rotate(-22 ${cx - 0.62} ${cy - 0.42})"/>
    <ellipse cx="${cx + 0.62}" cy="${cy - 0.42}" rx="0.7" ry="0.42" transform="rotate(22 ${cx + 0.62} ${cy - 0.42})"/><circle cx="${cx}" cy="${cy - 0.25}" r="0.3"/></g>`;
  return { svg: p.svg + bow, bb: grow(p.bb, { y0: -0.4 }) };
}
function woodBlock() {
  const c = '#F6C26B';
  return prism({ w: 4, h: 4, d: 4, col: c, top: shade(c, 0.3), side: shade(c, -0.15), deco: {
    front: frame('#D97706', c) + letter('A', '#DC2626'),
    top: frame('#D97706', shade(c, 0.3)) + letter('B', '#2563EB'),
    side: frame('#B45309', shade(c, -0.15)) + letter('C', '#15803D'),
  } });
}
function milk() {
  const p = prism({ w: 2.6, h: 4.4, d: 1.8, col: '#FFFFFF', top: '#F1F5F9', side: '#DBEAFE', deco: {
    front: (at) => {
      const [x0, y0] = at('front', 0, 0.62), [x1, y1] = at('front', 1, 1);
      const [cx, cy] = at('front', 0.5, 0.36);
      return `<rect x="${x0}" y="${y0}" width="${x1 - x0}" height="${y1 - y0}" fill="#60A5FA"/>
        <path d="M${x0} ${y0} Q${x0 + 0.65} ${y0 - 0.35} ${(x0 + x1) / 2} ${y0} T${x1} ${y0}" fill="#60A5FA"/>
        <path d="M${cx} ${cy - 0.75} Q${cx + 0.55} ${cy} ${cx + 0.45} ${cy + 0.25} A0.45 0.45 0 0 1 ${cx - 0.45} ${cy + 0.25} Q${cx - 0.55} ${cy} ${cx} ${cy - 0.75} Z" fill="#93C5FD"/>`;
    },
    side: `<rect x="0" y="0.62" width="1" height="0.38" fill="#3B82F6"/>`,
  } });
  const [sx, sy] = p.at('top', 0.72, 0.5);
  const straw = `<path d="M${sx} ${sy} L${sx + 0.25} ${sy - 1.5} L${sx + 0.85} ${sy - 1.8}" fill="none" ${INKA.replace('2.6', '7')}/>
    <path d="M${sx} ${sy} L${sx + 0.25} ${sy - 1.5} L${sx + 0.85} ${sy - 1.8}" fill="none" stroke="#F472B6" stroke-width="4" vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"/>`;
  return { svg: p.svg + straw, bb: grow(p.bb, { y0: -1.3, x1: 0.3 }) };
}
function brick() {
  const c = '#D9603B';
  return prism({ w: 5.6, h: 2, d: 2.8, col: c, deco: {
    front: (at) => [[0.15, 0.3], [0.4, 0.7], [0.68, 0.35], [0.86, 0.72]].map(([u, v]) => { const [x, y] = at('front', u, v); return `<circle cx="${x}" cy="${y}" r="0.07" fill="${shade(c, 0.3)}"/>`; }).join(''),
    side: `<ellipse cx="0.3" cy="0.5" rx="0.14" ry="0.28" fill="#7C2D12"/><ellipse cx="0.7" cy="0.5" rx="0.14" ry="0.28" fill="#7C2D12"/>`,
  } });
}
function fridge() {
  const c = '#E2E8F0';
  return prism({ w: 3, h: 5.8, d: 2.6, col: c, top: '#F8FAFC', side: '#CBD5E1', deco: {
    front: (at) => {
      const [x0, y] = at('front', 0, 0.36), [x1] = at('front', 1, 0.36);
      const hx = at('front', 0.82, 0)[0];
      const [, a0] = at('front', 0, 0.12), [, a1] = at('front', 0, 0.28), [, b0] = at('front', 0, 0.45), [, b1] = at('front', 0, 0.66);
      return `<path d="M${x0} ${y} H${x1}" ${INKA}/><g fill="#94A3B8" ${INKA}><rect x="${hx}" y="${a0}" width="0.22" height="${a1 - a0}" rx="0.1"/><rect x="${hx}" y="${b0}" width="0.22" height="${b1 - b0}" rx="0.1"/></g>
        <circle cx="${at('front', 0.2, 0.08)[0]}" cy="${at('front', 0.2, 0.08)[1]}" r="0.13" fill="#38BDF8"/>`;
    },
  } });
}
function book() {
  return prism({ w: 5.2, h: 1, d: 3.6, col: '#FFFFFF', top: '#3B82F6', side: '#F8FAFC', deco: {
    front: (at) => {
      const [x0, y0] = at('front', 0, 0), [x1, y1] = at('front', 1, 1);
      const band = (v0, v1) => `<rect x="${x0}" y="${y0 + (y1 - y0) * v0}" width="${x1 - x0}" height="${(y1 - y0) * (v1 - v0)}" fill="#2563EB"/>`;
      return band(0, 0.16) + band(0.84, 1) + [0.38, 0.62].map(v => `<path d="M${x0 + 0.2} ${y0 + (y1 - y0) * v} H${x1 - 0.1}" stroke="#CBD5E1" stroke-width="0.06"/>`).join('');
    },
    top: `<rect x="0.18" y="0.22" width="0.64" height="0.2" rx="0.04" fill="#FFFFFF"/><circle cx="0.5" cy="0.64" r="0.12" fill="#FDE047"/>`,
    side: `<rect x="0" y="0" width="1" height="0.16" fill="#2563EB"/><rect x="0" y="0.84" width="1" height="0.16" fill="#2563EB"/>`,
  } });
}
function tissue() {
  const c = '#6EE7B7';
  const p = prism({ w: 4.6, h: 2.2, d: 2.8, col: c, deco: {
    front: (at) => [[0.18, 0.5], [0.5, 0.5], [0.82, 0.5]].map(([u, v]) => { const [x, y] = at('front', u, v); return `<g fill="#F9A8D4">${[0, 72, 144, 216, 288].map(a => `<circle cx="${x + 0.22 * Math.cos(a * Math.PI / 180)}" cy="${y + 0.22 * Math.sin(a * Math.PI / 180)}" r="0.15"/>`).join('')}</g><circle cx="${x}" cy="${y}" r="0.11" fill="#FDE047"/>`; }).join(''),
    top: `<ellipse cx="0.5" cy="0.5" rx="0.32" ry="0.22" fill="#047857"/>`,
  } });
  const [cx, cy] = p.at('top', 0.5, 0.5);
  const t = `<path d="M${cx - 0.8} ${cy + 0.1} Q${cx - 0.9} ${cy - 1.1} ${cx - 0.2} ${cy - 1.5} Q${cx + 0.3} ${cy - 1.1} ${cx + 0.9} ${cy - 1.3} Q${cx + 0.7} ${cy - 0.5} ${cx + 0.8} ${cy + 0.1} Z" fill="#FFFFFF" ${INKA}/>`;
  return { svg: p.svg + t, bb: grow(p.bb, { y0: -0.6 }) };
}
function eraser() {
  const g = '#CBD5E1';
  return prism({ w: 5, h: 1.9, d: 2.8, col: '#3B82F6', side: '#94A3B8', deco: {
    front: (at) => { const [x, y0] = at('front', 0.5, 0), [x1, y1] = at('front', 1, 1); return `<rect x="${x}" y="${y0}" width="${x1 - x}" height="${y1 - y0}" fill="${g}"/>`; },
    top: `<rect x="0.5" y="0" width="0.5" height="1" fill="#E2E8F0"/>`,
  } });
}
// Khối khác (nhiễu): mặt cong
function can() {
  const r = 1.5, ry = 0.5, h = 4.4;
  const svg = `<path d="M${-r} 0 V${h} A${r} ${ry} 0 0 0 ${r} ${h} V0 Z" fill="#EF4444"/>
    <path d="M${-r} ${h * 0.45} Q${-0.5} ${h * 0.3} 0 ${h * 0.48} T${r} ${h * 0.42} V${h * 0.6} Q0.5 ${h * 0.5} 0 ${h * 0.64} T${-r} ${h * 0.62} Z" fill="#FFFFFF"/>
    <g fill="none" ${INKA}><path d="M${-r} 0 V${h} A${r} ${ry} 0 0 0 ${r} ${h} V0"/></g>
    <ellipse cx="0" cy="0" rx="${r}" ry="${ry}" fill="#D1D5DB" ${INKA}/><ellipse cx="0" cy="0" rx="${r * 0.8}" ry="${ry * 0.75}" fill="#E5E7EB"/>
    <rect x="-0.25" y="-0.2" width="0.6" height="0.3" rx="0.12" fill="#9CA3AF" ${INKA}/>`;
  return { svg, bb: { x0: -r, y0: -ry, x1: r, y1: h + ry } };
}
function ball() {
  const R = 2.4;
  const pent = (cx, cy, s, rot = -90) => `<polygon points="${pts([0, 1, 2, 3, 4].map(i => [cx + s * Math.cos((rot + i * 72) * Math.PI / 180), cy + s * Math.sin((rot + i * 72) * Math.PI / 180)]))}" fill="${INK}"/>`;
  const svg = `<circle cx="0" cy="0" r="${R}" fill="#FFFFFF"/>${pent(0, 0, 0.75)}${pent(0, -1.95, 0.45, 90)}${pent(1.75, -0.6, 0.45, 18)}${pent(-1.75, -0.6, 0.45, 162)}${pent(1.1, 1.6, 0.45, -54)}${pent(-1.1, 1.6, 0.45, 234)}
    <circle cx="0" cy="0" r="${R}" fill="none" ${INKA}/>`;
  return { svg, bb: { x0: -R, y0: -R, x1: R, y1: R } };
}
function orange() {
  const R = 2.2;
  const svg = `<circle cx="0" cy="0" r="${R}" fill="#FB923C" ${INKA}/><ellipse cx="-0.8" cy="-0.8" rx="0.55" ry="0.35" fill="#FED7AA" transform="rotate(-35 -0.8 -0.8)"/>
    <path d="M0 ${-R} q0.1 -0.5 0.3 -0.7" fill="none" ${INKA}/><path d="M0.2 ${-R - 0.5} Q1.2 ${-R - 1.2} 1.8 ${-R - 0.4} Q0.9 ${-R} 0.2 ${-R - 0.5} Z" fill="#22C55E" ${INKA}/>`;
  return { svg, bb: { x0: -R, y0: -R - 1.1, x1: R, y1: R } };
}
function partyHat() {
  const r = 1.9, ry = 0.5, h = 4.6;
  const svg = `<path d="M${-r} 0 L0 ${-h} L${r} 0 A${r} ${ry} 0 0 1 ${-r} 0 Z" fill="#A78BFA"/>
    <path d="M${-r * 0.62} ${-h * 0.35} L${r * 0.4} ${-h * 0.58} L${r * 0.26} ${-h * 0.72} L${-r * 0.48} ${-h * 0.52} Z M${-r * 0.92} ${-h * 0.02} L${r * 0.7} ${-h * 0.3} L${r * 0.56} ${-h * 0.44} L${-r * 0.8} ${-h * 0.18} Z" fill="#FDE047"/>
    <path d="M${-r} 0 L0 ${-h} L${r} 0 A${r} ${ry} 0 0 1 ${-r} 0 Z" fill="none" ${INKA}/>
    <circle cx="0" cy="${-h}" r="0.45" fill="#F472B6" ${INKA}/>`;
  return { svg, bb: { x0: -r, y0: -h - 0.45, x1: r, y1: ry } };
}
function drum() {
  const r = 2.4, ry = 0.75, h = 2.8;
  const zig = Array.from({ length: 7 }, (_, i) => { const a = Math.PI * (i / 6); return [-r * Math.cos(a), i % 2 ? h - 0.35 : 0.35]; });
  const svg = `<path d="M${-r} 0 V${h} A${r} ${ry} 0 0 0 ${r} ${h} V0 Z" fill="#EF4444"/>
    <polyline points="${pts(zig.map(([x, y]) => [x, y + (y > 1 ? ry * Math.sqrt(Math.max(0, 1 - (x / r) ** 2)) : ry * Math.sqrt(Math.max(0, 1 - (x / r) ** 2)))]))}" fill="none" stroke="#FFFFFF" stroke-width="0.14" stroke-linejoin="round"/>
    <g fill="none" ${INKA}><path d="M${-r} 0 V${h} A${r} ${ry} 0 0 0 ${r} ${h} V0"/></g>
    <ellipse cx="0" cy="0" rx="${r}" ry="${ry}" fill="#FEF3C7" ${INKA}/>
    <path d="M${-r} ${h - 0.2} A${r} ${ry} 0 0 0 ${r} ${h - 0.2}" fill="none" stroke="#FDE047" stroke-width="0.3"/>`;
  return { svg, bb: { x0: -r, y0: -ry, x1: r, y1: h + ry } };
}

/** kind: lp = khối lập phương, hhcn = khối hộp chữ nhật, khac = khối khác (shape: tên khối, để thầy nhắc). */
const OBJS = [
  { id: 'xucxac', name: 'Con xúc xắc', kind: 'lp', art: dice },
  { id: 'rubik', name: 'Khối rubik', kind: 'lp', art: rubik },
  { id: 'qua', name: 'Hộp quà', kind: 'lp', art: gift },
  { id: 'go', name: 'Khối gỗ đồ chơi', kind: 'lp', art: woodBlock },
  { id: 'sua', name: 'Hộp sữa', kind: 'hhcn', art: milk },
  { id: 'gach', name: 'Viên gạch', kind: 'hhcn', art: brick },
  { id: 'tulanh', name: 'Tủ lạnh', kind: 'hhcn', art: fridge },
  { id: 'sach', name: 'Quyển sách', kind: 'hhcn', art: book },
  { id: 'khan', name: 'Hộp khăn giấy', kind: 'hhcn', art: tissue },
  { id: 'tay', name: 'Cục tẩy', kind: 'hhcn', art: eraser },
  { id: 'lon', name: 'Lon nước ngọt', kind: 'khac', shape: 'khối trụ', art: can },
  { id: 'trong', name: 'Cái trống', kind: 'khac', shape: 'khối trụ', art: drum },
  { id: 'bong', name: 'Quả bóng', kind: 'khac', shape: 'khối cầu', art: ball },
  { id: 'cam', name: 'Quả cam', kind: 'khac', shape: 'khối cầu', art: orange },
  { id: 'mu', name: 'Mũ sinh nhật', kind: 'khac', shape: 'khối nón', art: partyHat },
];
const OBJ = Object.fromEntries(OBJS.map(o => [o.id, o]));
const ART = {};
const artOf = (id) => (ART[id] ||= OBJ[id].art());
const KINDS = [['lp', 'Khối lập phương'], ['hhcn', 'Khối hộp chữ nhật'], ['khac', 'Khối khác']];
const KNAME = Object.fromEntries(KINDS);

/** Đặt hình (bb) vừa khung box, đáy chạm đáy khung. */
function place(art, box, cls = '', attrs = '') {
  const bw = art.bb.x1 - art.bb.x0, bh = art.bb.y1 - art.bb.y0;
  const s = Math.min(box.w / bw, box.h / bh);
  const tx = box.x + (box.w - bw * s) / 2 - art.bb.x0 * s, ty = box.y + box.h - bh * s - art.bb.y0 * s;
  return `<g class="${cls}" ${attrs} transform="translate(${f2(tx)} ${f2(ty)}) scale(${f2(s)})">${art.svg}</g>`;
}
const artSvg = (art, cls = '') => `<svg class="${cls}" viewBox="${f2(art.bb.x0 - 0.2)} ${f2(art.bb.y0 - 0.2)} ${f2(art.bb.x1 - art.bb.x0 + 0.4)} ${f2(art.bb.y1 - art.bb.y0 + 0.4)}" preserveAspectRatio="xMidYMid meet" overflow="visible" aria-hidden="true">${art.svg}</svg>`;
/** Khung có tỉ lệ của hình, nằm giữa khung r (để đồ bay đáp vừa khít, flyOne phóng theo bề ngang). */
function fitRect(r, art) {
  const a = (art.bb.x1 - art.bb.x0 + 0.4) / (art.bb.y1 - art.bb.y0 + 0.4);
  const w = Math.min(r.width, r.height * a), h = w / a;
  return { left: r.left + (r.width - w) / 2, top: r.top + (r.height - h) / 2, width: w, height: h };
}

// Biểu tượng trong nút chọn
const ICON = {
  lp: prism({ w: 2, h: 2, d: 2, col: '#93C5FD' }),
  hhcn: prism({ w: 3.4, h: 1.5, d: 1.8, col: '#FDBA74' }),
  khac: { svg: `<g transform="translate(-1.3 0.1)">${can().svg}</g><g transform="translate(1.8 1.6) scale(0.7)">${ball().svg}</g>`, bb: { x0: -2.9, y0: -0.6, x1: 3.5, y1: 5 } },
};

// ── Đề ───────────────────────────────────────────────────────────────────────────────────────────────
const PALETTE = ['#BAE6FD', '#FBCFE8', '#D9F99D', '#C7D2FE', '#99F6E4'];

function makeSort(rng, n) {
  const lp = rng.int(1, n >= 6 ? 2 : 1), kh = rng.int(1, n >= 6 ? 2 : 1), hh = n - lp - kh;
  const pick = (kind, k) => rng.shuffle(OBJS.filter(o => o.kind === kind)).slice(0, k).map(o => o.id);
  return { type: 'sort', items: rng.shuffle([...pick('lp', lp), ...pick('hhcn', hh), ...pick('khac', kh)]) };
}
function makeCount(rng, solid, ask) {
  const col = rng.pick(PALETTE);
  if (solid === 'lp') return { type: 'count', solid, ask, w: 4.4, h: 4.4, d: 4.4, col };
  const shape = rng.pick(['lie', 'tall', 'flat']);
  const r1 = (a, b) => Math.round((a + rng() * (b - a)) * 10) / 10;
  const [w, h, d] = shape === 'lie' ? [r1(5.8, 7), r1(2.6, 3.4), r1(2.8, 3.8)] : shape === 'tall' ? [r1(3.2, 3.8), r1(5.4, 6.2), r1(2.4, 3.2)] : [r1(6.2, 7), r1(1.9, 2.4), r1(4, 4.8)];
  return { type: 'count', solid, ask, w, h, d, col };
}
/** Các cột khối lập phương nhỏ: H[x][z] (z = 0 là hàng trước), hàng sau cao bằng hoặc hơn hàng trước. */
function makeStack(rng, nx, nz, maxH, want) {
  let best = null;
  for (let t = 0; t < 80; t++) {
    const H = Array.from({ length: nx }, () => Array.from({ length: nz }, () => rng.int(1, maxH)).sort((a, b) => a - b));
    const s = stackStats(H);
    if (s.total < 4 || s.total > 20) continue;
    if (s.total === nx * nz) continue; // một tầng phẳng: không có gì để đếm
    best = { type: 'stack', H, ...s };
    if (!want || s.total > s.visible) break; // ưu tiên có khối bị che
  }
  return best || { type: 'stack', H: [[1, 2], [1, 1]], ...stackStats([[1, 2], [1, 1]]) };
}
function stackStats(H) {
  const nx = H.length, nz = H[0].length;
  const has = (x, y, z) => x >= 0 && x < nx && z >= 0 && z < nz && y >= 0 && y < H[x][z];
  let total = 0, visible = 0, top = 0;
  for (let x = 0; x < nx; x++) for (let z = 0; z < nz; z++) for (let y = 0; y < H[x][z]; y++) {
    total++;
    top = Math.max(top, y + 1);
    // Bị che hẳn: có khối ở trước, ở trên và ở bên phải.
    if (!(has(x, y, z - 1) && has(x, y + 1, z) && has(x + 1, y, z))) visible++;
  }
  return { total, visible, layers: top };
}

const LEVEL = (id, n, title, desc, knowledge, plan, ask) => ({
  id, n, title, desc, knowledge, lessons: { workbook: ['bai-21'] }, missions: plan.length, ask: () => ask,
  gen: (rng, k) => {
    const p = plan[k % plan.length];
    if (p[0] === 'sort') return makeSort(rng, p[1]);
    if (p[0] === 'count') return makeCount(rng, p[1], p[2]);
    return makeStack(rng, ...p.slice(1));
  },
  // Giữ chỗ dòng tầng cho mọi lượt của cấp (không đổi bố cục giữa các lượt).
  maxLayers: Math.max(1, ...plan.filter(p => p[0] === 'stack').map(p => p[3])),
});

export const SOLID_LEVELS = [
  LEVEL('drill-solid-1', 1, 'Nhận dạng khối', 'Xúc xắc, hộp sữa, viên gạch, lon nước: mỗi đồ vật có dạng khối gì?',
    'nhận dạng khối lập phương, khối hộp chữ nhật',
    [['sort', 6], ['sort', 6], ['sort', 6], ['sort', 6]],
    'Khối nào có 6 mặt đều là hình vuông?'),
  LEVEL('drill-solid-2', 2, 'Đỉnh, cạnh, mặt', 'Chạm đếm từng đỉnh, cạnh, mặt, kể cả nét đứt bị khuất.',
    'khối lập phương, khối hộp chữ nhật có 8 đỉnh, 12 cạnh, 6 mặt',
    [['count', 'hhcn', 'mat'], ['count', 'lp', 'canh'], ['count', 'hhcn', 'dinh'], ['count', 'lp', 'mat'], ['count', 'hhcn', 'canh'], ['count', 'lp', 'dinh']],
    'Đếm cả đỉnh, cạnh, mặt bị khuất phía sau!'),
  LEVEL('drill-solid-3', 3, 'Đếm khối lập phương nhỏ', 'Đếm các khối xếp chồng, nhớ cả khối bị che, rồi tách từng tầng để kiểm tra.',
    'đếm khối lập phương nhỏ xếp thành hình',
    [['stack', 3, 1, 2, false], ['stack', 2, 2, 2, true], ['stack', 3, 2, 2, true], ['stack', 3, 2, 3, true], ['stack', 3, 3, 3, true]],
    'Có khối bị che ở phía dưới, phía sau. Đếm từng tầng!'),
  LEVEL('drill-solid-4', 4, 'Trộn', 'Nhận dạng khối, đếm đỉnh, cạnh, mặt, đếm khối lập phương nhỏ.',
    'khối lập phương, khối hộp chữ nhật',
    [['sort', 4], ['count', 'hhcn', 'canh'], ['stack', 3, 2, 3, true], ['count', 'lp', 'mat'], ['stack', 3, 3, 3, true], ['count', 'hhcn', 'dinh']],
    'Nhận dạng, đếm đỉnh, cạnh, mặt và đếm khối nhỏ!'),
];

// ── Khung chung ─────────────────────────────────────────────────────────────────────────────────────────
/** viewBox theo đúng tỉ lệ khung (hình to hết cỡ, nền phủ kín). set(bb) đổi vùng nhìn (thu phóng êm khi tách tầng). */
function figFit(zone, svg, bb0) {
  let bb = bb0;
  const fit = () => {
    const zw = zone.clientWidth, zh = zone.clientHeight;
    if (!zw || !zh) return;
    const bw = bb.x1 - bb.x0, bh = bb.y1 - bb.y0, r = zw / zh;
    const [W, H] = r > bw / bh ? [bh * r, bh] : [bw, bw / r];
    const cx = (bb.x0 + bb.x1) / 2, cy = (bb.y0 + bb.y1) / 2;
    svg.setAttribute('viewBox', `${f2(cx - W / 2)} ${f2(cy - H / 2)} ${f2(W)} ${f2(H)}`);
  };
  fit();
  new ResizeObserver(() => { if (zone.isConnected) fit(); }).observe(zone);
  return {
    set(b) { bb = b; fit(); },
    async zoom(b, ms) {
      const a = bb;
      const t0 = performance.now();
      for (;;) {
        const t = Math.min(1, (performance.now() - t0) / ms), e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
        bb = { x0: a.x0 + (b.x0 - a.x0) * e, y0: a.y0 + (b.y0 - a.y0) * e, x1: a.x1 + (b.x1 - a.x1) * e, y1: a.y1 + (b.y1 - a.y1) * e };
        fit();
        if (t >= 1 || !svg.isConnected) return;
        await sleep(16);
      }
    },
  };
}

/** Cỡ chữ to nhất để khối chữ vừa khung (đo ở 100px, đo lại khi khung đổi cỡ, không đổi trong lượt). */
function fitText(box, inner, cap = 160) {
  const fit = () => {
    const w = box.clientWidth * 0.96, h = box.clientHeight * 0.9;
    if (w <= 0 || h <= 0) return;
    inner.style.fontSize = '100px';
    const fs = Math.min(100 * w / inner.scrollWidth, 100 * h / inner.scrollHeight, cap);
    inner.style.fontSize = `${Math.floor(fs)}px`;
  };
  fit();
  new ResizeObserver(() => { if (box.isConnected) fit(); }).observe(box);
}

const popEl = (el) => { el.classList.remove('g3s-pop'); void el.getBBox?.(); void el.offsetWidth; el.classList.add('g3s-pop'); };
let uid = 0;

export const SOLIDS_GAME = {
  id: 'drill-solid', icon: '🧊', title: 'Khối lập phương, khối hộp chữ nhật',
  purpose: 'Giúp em nhận ra đồ vật có dạng khối lập phương, khối hộp chữ nhật, đếm đúng 8 đỉnh, 12 cạnh, 6 mặt (kể cả phần bị khuất) và đếm các khối lập phương nhỏ xếp chồng, không bỏ sót khối bị che.',
  unitWord: 'bài', starPrefix: 'drill', npcs: [TEACHER], levels: SOLID_LEVELS,
  stallIcon: () => '🧊',
  summaryText: (ok, total) => `Em làm đúng ngay <strong>${ok}/${total}</strong> bài.`,
  againText: 'Làm lượt mới',
  howTo: how(['👀', 'Nhìn khối'], ['👆', 'Chạm đếm'], ['⌨️', 'Gõ số'], ['🔍', 'Kiểm tra']),

  makeMission(rng, level, history) {
    const k = history.length;
    return fresh(history, () => level.gen(rng, k), (m) => (m.type === 'sort' ? `s:${m.items.join(',')}`
      : m.type === 'count' ? `c:${m.solid}${m.ask}:${m.w}x${m.h}x${m.d}` : `k:${m.H.map(c => c.join('')).join('.')}`));
  },

  mountMission(stage, m, level, api) {
    injectSolidStyles();
    if (m.type === 'sort') mountSort(stage, m, level, api);
    else if (m.type === 'count') mountCount(stage, m, level, api);
    else mountStack(stage, m, level, api);
  },
};

// ── Cấp 1: Nhận dạng ─────────────────────────────────────────────────────────────────────────────────────
const SHELF = (n) => Array.from({ length: n }, (_, i) => ({ x: 10 - n * 1.55 + i * 3.1 + 0.3, y: 0.7, w: 2.5, h: 2.5 }));
const TABLE_BOX = { x: 3.5, y: 5, w: 13, h: 9.3 };
const ROOM = `<rect x="-60" y="-60" width="140" height="140" fill="#FFF7E6"/>
  <g fill="#FDECC8">${Array.from({ length: 30 }, (_, i) => `<rect x="${-60 + i * 4.4}" y="-60" width="2" height="72"/>`).join('')}</g>
  <rect x="-60" y="13.9" width="140" height="80" fill="#C98A47"/>
  <rect x="-60" y="13.9" width="140" height="1.3" fill="#E2AE6E"/>
  <path d="M-60 13.9 H80 M-60 15.2 H80" ${INKA}/>
  <rect x="0.4" y="3.25" width="19.2" height="0.5" rx="0.15" fill="#B45309" ${INKA}/>
  <path d="M2.2 3.75 V4.7 L3.2 3.75 M17.8 3.75 V4.7 L16.8 3.75" fill="none" ${INKA}/>`;

function mountSort(stage, m, level, api) {
  const n = m.items.length;
  const shelf = SHELF(n);
  const bins = KINDS.map(([k, name]) => `
    <button type="button" class="g3g-btn g3s-bin g3s-bin-${k}" data-k="${k}">
      <span class="g3s-bin-top">${artSvg(ICON[k], 'g3s-bin-ic')}<span class="g3s-bin-name">${name}</span><span class="g3s-bin-n">0</span></span>
      <span class="g3s-tray" style="--n:${n}">${Array.from({ length: n }, () => '<span class="g3s-slot"></span>').join('')}</span>
    </button>`).join('');
  const board = `
    <div class="g3s g3s-sort">
      <div class="g3s-head">Mỗi đồ vật có dạng khối gì?</div>
      <div class="g3s-fig"><svg class="g3s-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${ROOM}
        ${m.items.map((id, i) => place(artOf(id), shelf[i], 'g3s-q', `data-q="${i}"`)).join('')}
        <g class="g3s-cur"></g></svg></div>
      <div class="g3s-side"><div class="g3s-bins">${bins}</div></div>
    </div>`;
  const { paper, say, show, hint, done } = mountDrill(stage, { api, board, cls: 'g3s-scene' });
  const svg = paper.querySelector('.g3s-svg');
  figFit(paper.querySelector('.g3s-fig'), svg, { x0: 0, y0: 0, x1: 20, y1: 16 });
  const cur = svg.querySelector('.g3s-cur');
  const btns = [...paper.querySelectorAll('.g3s-bin')];
  const filled = { lp: 0, hhcn: 0, khac: 0 };
  let i = -1, busy = true, mistakes = 0, wrongHere = false;

  async function nextItem() {
    i++;
    if (i >= n) return finish();
    const id = m.items[i], art = artOf(id);
    const q = svg.querySelector(`[data-q="${i}"]`);
    cur.innerHTML = place(art, TABLE_BOX);
    cur.style.opacity = '0';
    const to = cur.firstElementChild.getBoundingClientRect();
    const from = q.getBoundingClientRect();
    q.style.opacity = '0';
    await sleep(flyOne(artSvg(art), fitRect(from, art), fitRect(to, art), { minMs: 380, maxMs: 620 }));
    cur.style.opacity = '1';
    sfx.pop(2);
    wrongHere = false;
    busy = false;
    const ask = `${OBJ[id].name} có dạng khối gì?`;
    if (i === 0) say(`Mỗi đồ vật có dạng khối gì? ${ask}`, `👆 <b>${OBJ[id].name}</b> có dạng khối gì?`);
    else say(ask, `👆 <b>${OBJ[id].name}</b> có dạng khối gì?`);
  }

  async function pick(k, b) {
    if (busy) return;
    const o = OBJ[m.items[i]];
    if (k !== o.kind) {
      if (!wrongHere) { mistakes++; wrongHere = true; }
      shake(b);
      if (o.kind === 'lp') hint(`${o.name} có 6 mặt đều là hình vuông bằng nhau. Đó là khối lập phương.`, `${o.name} có <b>6 mặt đều là hình vuông</b> bằng nhau: <b>khối lập phương</b>.`);
      else if (o.kind === 'hhcn' && k === 'lp') hint(`${o.name} có mặt là hình chữ nhật, không phải 6 mặt đều là hình vuông. Đó là khối hộp chữ nhật.`, `${o.name} có mặt là <b>hình chữ nhật</b>, không phải mọi mặt đều là hình vuông: <b>khối hộp chữ nhật</b>.`);
      else if (o.kind === 'hhcn') hint(`${o.name} có 6 mặt phẳng, các mặt là hình chữ nhật. Đó là khối hộp chữ nhật.`, `${o.name} có <b>6 mặt phẳng</b> là hình chữ nhật: <b>khối hộp chữ nhật</b>.`);
      else hint(`${o.name} có mặt cong, không phải 6 mặt phẳng. ${o.name} có dạng ${o.shape}.`, `${o.name} có <b>mặt cong</b>: dạng ${o.shape}, chọn <b>Khối khác</b>.`);
      return;
    }
    busy = true;
    sfx.tap();
    const art = artOf(o.id);
    const slot = b.querySelectorAll('.g3s-slot')[filled[k]++];
    const from = cur.firstElementChild.getBoundingClientRect();
    cur.style.opacity = '0';
    show(`✔ ${o.name}: <b>${KNAME[k].toLowerCase()}</b>${o.shape ? ` (${o.shape})` : ''}.`);
    await sleep(flyOne(artSvg(art), fitRect(from, art), fitRect(slot.getBoundingClientRect(), art), { minMs: 420, maxMs: 700, onLand: () => {
      slot.innerHTML = artSvg(art);
      slot.classList.add('g3s-slot-on');
      const cnt = b.querySelector('.g3s-bin-n');
      cnt.textContent = filled[k];
      popEl(cnt);
      sfx.pop(3 + filled[k]);
    } }) + 160);
    nextItem();
  }
  btns.forEach(b => { b.onclick = () => pick(b.dataset.k, b); });

  function finish() {
    busy = true;
    cur.innerHTML = '';
    btns.forEach(b => { b.disabled = true; });
    const parts = KINDS.filter(([k]) => filled[k]).map(([k]) => `${filled[k]} ${k === 'khac' ? 'đồ vật dạng khối khác' : `đồ vật dạng ${KNAME[k].toLowerCase()}`}`);
    done(mistakes, { ok: `Có ${parts.join(', ')}.`, tip: 'Nhớ: khối lập phương có 6 mặt là hình vuông bằng nhau; khối hộp chữ nhật có 6 mặt là hình chữ nhật.' });
  }

  nextItem();
  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (!busy) btns.find(b => b.dataset.k === OBJ[m.items[i]].kind).click(); },
      wrong: () => { if (!busy) btns.find(b => b.dataset.k !== OBJ[m.items[i]].kind).click(); } };
  }
}

// ── Cấp 2: Đỉnh, cạnh, mặt ───────────────────────────────────────────────────────────────────────────────
const ASK = { dinh: 'đỉnh', canh: 'cạnh', mat: 'mặt' };
const ANSWER = { dinh: 8, canh: 12, mat: 6 };
const HIT = '#FDE047';
const GROUP_COL = ['#F97316', '#A855F7', '#16A34A'];
const FACE_COL = ['#FDBA74', '#D8B4FE', '#86EFAC'];

/** Hình học khối: 8 đỉnh (F0..F3 mặt trước TL, TR, BR, BL; B0..B3 mặt sau), 12 cạnh, 6 mặt, phần khuất. */
function boxGeo({ w, h, d }) {
  const dx = d * DX, dy = d * DY;
  const F = [[0, 0], [w, 0], [w, h], [0, h]];
  const B = F.map(([x, y]) => [x + dx, y + dy]);
  const V = [...F, ...B];
  // Cạnh: [đỉnh, đỉnh, nhóm (0 mặt trước, 1 mặt sau, 2 cạnh nối)]
  const E = [[0, 1, 0], [1, 2, 0], [2, 3, 0], [3, 0, 0], [4, 5, 1], [5, 6, 1], [6, 7, 1], [7, 4, 1], [0, 4, 2], [1, 5, 2], [2, 6, 2], [3, 7, 2]];
  // Mặt: [tên, đỉnh, khuất?, cặp (0 trước sau, 1 trên đáy, 2 phải trái)]
  const FACES = [['mặt trước', [0, 1, 2, 3], false, 0], ['mặt sau', [4, 5, 6, 7], true, 0], ['mặt trên', [0, 1, 5, 4], false, 1],
    ['mặt đáy', [3, 2, 6, 7], true, 1], ['mặt bên phải', [1, 5, 6, 2], false, 2], ['mặt bên trái', [0, 4, 7, 3], true, 2]];
  const hiddenV = (i) => i === 7;
  const hiddenE = (e) => e[0] === 7 || e[1] === 7;
  const c = [(w + dx) / 2, (h + dy) / 2];
  return { w, h, dx, dy, V, E, FACES, hiddenV, hiddenE, c, bb: { x0: 0, y0: dy, x1: w + dx, y1: h } };
}

function mountCount(stage, m, level, api) {
  const G = boxGeo(m);
  const what = ASK[m.ask], ans = ANSWER[m.ask];
  const right = KNAME[m.solid];
  const sw = 0.09;
  const P = (i) => G.V[i];
  const cen = (ids) => [ids.reduce((s, i) => s + P(i)[0], 0) / ids.length, ids.reduce((s, i) => s + P(i)[1], 0) / ids.length];
  // Nhãn mặt khuất (chỉ khi đếm mặt): mặt sau bên phải phía trên, mặt bên trái bên trái, mặt đáy phía dưới.
  const chipW = (t) => t.length * 0.29 + 1.3;
  const cwL = chipW('mặt bên trái'), cwD = chipW('mặt đáy'), below = G.h + 1.3;
  const lx = Math.min(cwL / 2 - 0.6, G.w * 0.25), dxp = Math.max(lx + cwL / 2 + cwD / 2 + 0.4, G.w + G.dx - cwD / 2 + 0.4);
  const chipAt = { 1: [G.w / 2 + G.dx, G.dy - 1.1], 5: [lx, below], 3: [dxp, below] };
  let s = '';
  const fc = { 0: m.col, 2: shade(m.col, 0.4), 4: shade(m.col, -0.18) };
  [0, 2, 4].forEach(f => { s += `<polygon class="g3s-face" data-f="${f}" points="${pts(G.FACES[f][1].map(P))}" fill="${fc[f]}" data-fill="${fc[f]}"/>`; });
  [1, 3, 5].forEach(f => { s += `<polygon class="g3s-hface" data-hf="${f}" points="${pts(G.FACES[f][1].map(P))}" opacity="0"/>`; });
  G.E.forEach((e, i) => {
    const [a, b] = [P(e[0]), P(e[1])];
    s += `<line class="g3s-edge${G.hiddenE(e) ? ' g3s-dash' : ''}" data-e="${i}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" style="--sw:${f2(sw)}px"/>`;
  });
  if (m.ask === 'dinh') G.V.forEach((p, i) => { s += `<circle class="g3s-vx" data-v="${i}" cx="${p[0]}" cy="${p[1]}" r="0.15"/>`; });
  if (m.ask === 'mat') {
    Object.entries(chipAt).forEach(([f, [x, y]]) => {
      const t = G.FACES[f][0], cw = chipW(t), [tx, ty] = cen(G.FACES[f][1]);
      s += `<line class="g3s-lead" x1="${x}" y1="${y}" x2="${tx}" y2="${ty}"/><circle cx="${tx}" cy="${ty}" r="0.12" fill="#64748B"/>
        <g class="g3s-chip g3s-hit" data-f="${f}"><rect x="${x - cw / 2}" y="${y - 0.5}" width="${cw}" height="1" rx="0.5"/>
        <text x="${x + 0.3}" y="${y + 0.04}" text-anchor="middle" dominant-baseline="central">${t}</text>
        <circle class="g3s-chip-dot" cx="${x - cw / 2 + 0.5}" cy="${y}" r="0.32"/><text class="g3s-chip-n" x="${x - cw / 2 + 0.5}" y="${y + 0.03}" text-anchor="middle" dominant-baseline="central"></text></g>`;
    });
  }
  // Vùng chạm (trong suốt, to hơn nét vẽ)
  if (m.ask === 'canh') G.E.forEach((e, i) => { const [a, b] = [P(e[0]), P(e[1])]; s += `<line class="g3s-hit g3s-hit-e" data-e="${i}" x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke-width="${f2(sw * 14)}"/>`; });
  if (m.ask === 'dinh') G.V.forEach((p, i) => { s += `<circle class="g3s-hit" data-v="${i}" cx="${p[0]}" cy="${p[1]}" r="${f2(sw * 10)}" fill="transparent"/>`; });
  if (m.ask === 'mat') [0, 2, 4].forEach(f => { s += `<polygon class="g3s-hit" data-f="${f}" points="${pts(G.FACES[f][1].map(P))}" fill="transparent"/>`; });
  s += '<g class="g3s-badges"></g>';
  const pad = 1.4;
  const bb = m.ask === 'mat' ? { x0: Math.min(-0.8, lx - cwL / 2 - 0.3), y0: G.dy - 1.9, x1: Math.max(G.w + G.dx + 0.8, dxp + cwD / 2 + 0.3), y1: below + 0.8 }
    : { x0: -pad, y0: G.dy - pad, x1: G.w + G.dx + pad, y1: G.h + pad };
  const sum = m.ask === 'canh' ? '4 + 4 + 4 = 12' : m.ask === 'dinh' ? '4 + 4 = 8' : '2 + 2 + 2 = 6';
  const board = `
    <div class="g3s g3s-count">
      <div class="g3s-head">Đây là khối gì? Khối đó có mấy <b>${what}</b>?</div>
      <div class="g3s-fig g3s-grid"><svg class="g3s-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${s}</svg></div>
      <div class="g3s-side">
        <div class="g3s-pick">${KINDS.slice(0, 2).map(([k, name]) => `<button type="button" class="g3g-btn g3d-choice g3s-pk" data-k="${k}">${artSvg(ICON[k], 'g3s-pk-ic')}<span>${name}</span></button>`).join('')}</div>
        <div class="g3s-box g3s-tallybox"><div class="g3s-fit g3s-tally">👆 Đã đếm: <b class="g3s-tn">0</b> ${what}</div></div>
        <div class="g3s-box g3s-ansbox"><div class="g3s-fit g3s-ans">
          <div><span class="g3s-nslot"><span class="g3s-ghost">Khối hộp chữ nhật</span><span class="g3s-nt">…</span></span></div>
          <div>có <span class="g3d-box" style="--boxw:1.8em" data-b></span> ${what}.</div></div></div>
        <div class="g3s-box g3s-sumbox"><div class="g3s-fit g3s-sum g3s-hide">${sum}</div></div>
      </div>
    </div>`;
  const { paper, say, show, hint, pad: keys, done } = mountDrill(stage, { api, board, cls: 'g3s-scene' });
  const svg = paper.querySelector('.g3s-svg');
  figFit(paper.querySelector('.g3s-fig'), svg, bb);
  paper.querySelectorAll('.g3s-box').forEach(b => fitText(b, b.firstElementChild));
  const badges = svg.querySelector('.g3s-badges');
  const tn = paper.querySelector('.g3s-tn');
  const box = paper.querySelector('[data-b]');
  const nslot = paper.querySelector('.g3s-nslot');
  const pks = [...paper.querySelectorAll('.g3s-pk')];
  let stepNow = 'pick', mistakes = 0, tip = '', count = 0;
  const counted = new Set();

  // 1. Chọn tên khối
  say(`Đây là khối gì?`, '👆 Đây là <b>khối gì</b>?');
  setActive(paper, nslot);
  pks.forEach(b => {
    b.onclick = async () => {
      if (stepNow !== 'pick') return;
      if (b.dataset.k !== m.solid) {
        mistakes++;
        tip ||= 'Khối lập phương có 6 mặt là hình vuông bằng nhau; khối hộp chữ nhật có 6 mặt là hình chữ nhật.';
        shake(b);
        if (m.solid === 'lp') hint('Sáu mặt của khối này đều là hình vuông bằng nhau. Đó là khối lập phương.', 'Sáu mặt đều là <b>hình vuông</b> bằng nhau: <b>khối lập phương</b>.');
        else hint('Khối này có mặt là hình chữ nhật, không phải mọi mặt đều là hình vuông. Đó là khối hộp chữ nhật.', 'Có mặt là <b>hình chữ nhật</b>, không phải mọi mặt đều vuông: <b>khối hộp chữ nhật</b>.');
        return;
      }
      stepNow = 'busy';
      sfx.tap();
      b.classList.add('g3d-choice-ok');
      pks.forEach(x => { x.disabled = true; });
      setActive(paper, null);
      const r = b.querySelector('span').getBoundingClientRect(), t = nslot.querySelector('.g3s-nt');
      const k = parseFloat(getComputedStyle(nslot).fontSize) / parseFloat(getComputedStyle(b).fontSize);
      const n = nslot.getBoundingClientRect();
      const to = { left: n.left + n.width / 2 - r.width * k / 2, top: n.top + n.height / 2 - r.height * k / 2, width: r.width * k, height: r.height * k };
      await sleep(flyOne(`<div class="g3s-flyt" style="font-size:${getComputedStyle(b).fontSize}">${right}</div>`, r, to, { minMs: 380, maxMs: 620, onLand: () => { t.textContent = right; t.classList.add('g3s-nt-on'); sfx.pop(3); } }) + 150);
      stepCount();
    };
  });

  // 2. Chạm đếm, gõ số
  const tapName = { dinh: 'từng đỉnh', canh: 'từng cạnh', mat: 'từng mặt' }[m.ask];
  function stepCount() {
    stepNow = 'num';
    svg.classList.add('g3s-live');
    setActive(paper, box);
    const extra = m.ask === 'mat' ? ' Mặt bị khuất thì chạm vào nhãn tên mặt.' : ' Nhớ cả nét đứt bị khuất.';
    say(`Chạm ${tapName} để đếm, rồi gõ số ${what}.${extra}`, `👆 Chạm <b>${tapName}</b> để đếm, rồi gõ số ${what}.`);
    keys.want(want);
  }
  const want = {
    max: 2,
    onType: (t) => { box.textContent = t; },
    onSubmit: (t) => {
      const v = Number(t);
      if (v !== ans) { box.textContent = ''; wrongNum(v); keys.want(want); return; }
      keys.off();
      setActive(paper, null);
      box.classList.add('g3d-box-ok');
      sfx.pop(4);
      verify();
    },
  };
  function wrongNum(v) {
    mistakes++;
    shake(box);
    tip ||= m.ask === 'canh' ? 'Khối hộp có 12 cạnh: 4 cạnh mặt trước, 4 cạnh mặt sau, 4 cạnh nối hai mặt đó.'
      : m.ask === 'dinh' ? 'Khối hộp có 8 đỉnh: 4 đỉnh ở mặt trước, 4 đỉnh ở mặt sau.' : 'Khối hộp có 6 mặt: trước và sau, trên và đáy, bên phải và bên trái.';
    const other = { 8: 'đỉnh', 12: 'cạnh', 6: 'mặt' }[v];
    let h;
    if (other && other !== what) h = [`${v} là số ${other}. Em đếm số ${what}.`, `<b>${v}</b> là số <b>${other}</b>. Em đếm số <b>${what}</b>.`];
    else if (m.ask === 'canh' && v === 9) h = ['Em mới đếm 9 cạnh nhìn thấy. Còn 3 cạnh bị khuất, vẽ nét đứt.', 'Mới đếm <b>9 cạnh nhìn thấy</b>. Còn <b>3 cạnh nét đứt</b> bị khuất.'];
    else if (m.ask === 'dinh' && v === 7) h = ['Em mới đếm 7 đỉnh nhìn thấy. Còn 1 đỉnh bị khuất, chỗ ba nét đứt gặp nhau.', 'Còn <b>1 đỉnh khuất</b>, chỗ <b>ba nét đứt</b> gặp nhau.'];
    else if (m.ask === 'mat' && v === 3) h = ['Em mới đếm 3 mặt nhìn thấy. Còn mặt sau, mặt đáy, mặt bên trái bị khuất.', 'Mới đếm <b>3 mặt nhìn thấy</b>. Còn <b>mặt sau, mặt đáy, mặt bên trái</b>.'];
    else if (m.ask === 'canh') h = ['Đếm 4 cạnh mặt trước, 4 cạnh mặt sau, rồi các cạnh nối hai mặt đó.', 'Đếm <b>4 cạnh mặt trước</b>, <b>4 cạnh mặt sau</b>, rồi các <b>cạnh nối</b>.'];
    else if (m.ask === 'dinh') h = ['Đếm 4 đỉnh ở mặt trước, rồi các đỉnh ở mặt sau.', 'Đếm <b>4 đỉnh mặt trước</b>, rồi các <b>đỉnh mặt sau</b>.'];
    else h = ['Có mặt trước, mặt sau, mặt trên, mặt đáy, mặt bên phải, mặt bên trái.', 'Trước, sau, trên, đáy, <b>bên phải, bên trái</b>.'];
    hint(...h);
  }

  // Chạm vào hình
  const badge = (x, y, n, col = '#F97316') => {
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('class', 'g3s-badge g3s-pop');
    g.innerHTML = `<circle cx="${x}" cy="${y}" r="0.33" stroke="${col}"/><text x="${x}" y="${y + 0.03}" text-anchor="middle" dominant-baseline="central">${n}</text>`;
    badges.appendChild(g);
  };
  const out = ([x, y], k) => { const vx = x - G.c[0], vy = y - G.c[1], l = Math.hypot(vx, vy) || 1; return [x + vx / l * k, y + vy / l * k]; };
  // Cạnh khuất: số ghi ngay trên nét đứt, gần đỉnh khuất (giữa nét đứt trùng chỗ số của cạnh mặt trước).
  const edgeMid = (i) => {
    const e = G.E[i];
    if (G.hiddenE(e)) { const [a, b] = e[0] === 7 ? [P(7), P(e[1])] : [P(7), P(e[0])]; return [a[0] + (b[0] - a[0]) * 0.32, a[1] + (b[1] - a[1]) * 0.32]; }
    return out([(P(e[0])[0] + P(e[1])[0]) / 2, (P(e[0])[1] + P(e[1])[1]) / 2], 0.5);
  };
  /** Tô một phần tử đã đếm (n: số ghi bên cạnh; col: màu nhóm khi kiểm tra). */
  function mark(kind, i, n, col) {
    if (kind === 'e') {
      const el = svg.querySelector(`.g3s-edge[data-e="${i}"]`);
      el.classList.add('g3s-on'); el.style.stroke = col || ''; popEl(el);
      badge(...edgeMid(i), n, col);
    } else if (kind === 'v') {
      const el = svg.querySelector(`.g3s-vx[data-v="${i}"]`);
      el.classList.add('g3s-on'); el.style.fill = col || ''; popEl(el);
      badge(...out(P(i), 0.75), n, col);
    } else {
      const f = +i, face = G.FACES[f];
      if (face[2]) {
        const el = svg.querySelector(`[data-hf="${f}"]`);
        el.setAttribute('opacity', '1'); el.style.fill = col ? FACE_COL[GROUP_COL.indexOf(col)] : HIT;
        const chip = svg.querySelector(`.g3s-chip[data-f="${f}"]`);
        chip.classList.add('g3s-on');
        chip.querySelector('.g3s-chip-n').textContent = n;
        chip.querySelector('.g3s-chip-dot').style.stroke = col || '#F97316';
        popEl(chip);
      } else {
        const el = svg.querySelector(`.g3s-face[data-f="${f}"]`);
        el.setAttribute('fill', col ? FACE_COL[GROUP_COL.indexOf(col)] : HIT);
        badge(...cen(face[1]), n, col);
      }
    }
  }
  svg.addEventListener('click', (e) => {
    const t = e.target.closest('.g3s-hit');
    if (!t) return;
    if (stepNow === 'pick') { shake(pks); show('👆 Chọn <b>tên khối</b> trước.'); return; }
    if (stepNow !== 'num') return;
    const kind = t.dataset.e != null ? 'e' : t.dataset.v != null ? 'v' : 'f';
    const i = t.dataset.e ?? t.dataset.v ?? t.dataset.f;
    const key = kind + i;
    if (counted.has(key)) {
      sfx.boing();
      show(`Ô, ${what} này em đếm rồi. Mỗi ${what} chỉ đếm một lần.`);
      return;
    }
    counted.add(key);
    count++;
    sfx.pop(Math.min(count, 8));
    mark(kind, i, count);
    tn.textContent = count;
    popEl(tn);
  });

  // 3. Kiểm tra: đếm lại theo nhóm
  async function verify() {
    stepNow = 'busy';
    svg.classList.remove('g3s-live');
    const calm = calmMotion();
    const gap = calm ? 380 : 260;
    badges.innerHTML = '';
    svg.querySelectorAll('.g3s-on').forEach(el => { el.classList.remove('g3s-on'); el.style.stroke = ''; el.style.fill = ''; });
    svg.querySelectorAll('.g3s-face').forEach(el => el.setAttribute('fill', el.dataset.fill));
    svg.querySelectorAll('[data-hf]').forEach(el => el.setAttribute('opacity', '0'));
    svg.querySelectorAll('.g3s-chip-n').forEach(el => { el.textContent = ''; });
    let groups, lines;
    if (m.ask === 'canh') {
      groups = [0, 1, 2].map(g => G.E.map((e, i) => [e, i]).filter(([e]) => e[2] === g).map(([, i]) => ['e', i]));
      lines = ['4 cạnh mặt trước', '4 cạnh mặt sau', '4 cạnh nối hai mặt đó'];
    } else if (m.ask === 'dinh') {
      groups = [[0, 1, 2, 3], [4, 5, 6, 7]].map(g => g.map(i => ['v', i]));
      lines = ['4 đỉnh ở mặt trước', '4 đỉnh ở mặt sau'];
    } else {
      groups = [[0, 1], [2, 3], [4, 5]].map(g => g.map(f => ['f', f]));
      lines = ['mặt trước, mặt sau', 'mặt trên, mặt đáy', 'mặt bên phải, mặt bên trái'];
    }
    const sumEl = paper.querySelector('.g3s-sum');
    const parts = sum.split(' = ')[0].split(' + ');
    sumEl.innerHTML = parts.map((p, k) => `<span class="g3s-sp" data-sp="${k}" style="color:${GROUP_COL[k]}">${p}</span>`).join(' <span class="g3s-sp" data-sp="+">+</span> ') + ` <span class="g3s-sp" data-sp="eq">= ${ans}</span>`;
    sumEl.querySelectorAll('.g3s-sp').forEach(el => { el.style.visibility = 'hidden'; });
    sumEl.classList.remove('g3s-hide');
    say(`Cùng đếm lại! ${lines.join(', ')}.`, `🔍 Đếm lại: ${lines.map((l, k) => `<b style="color:${GROUP_COL[k]}">${l}</b>`).join(', ')}.`);
    let n = 0;
    for (let g = 0; g < groups.length; g++) {
      for (const [kind, i] of groups[g]) { n++; mark(kind, i, n, GROUP_COL[g]); tn.textContent = n; sfx.pop(n % 8); await sleep(gap); }
      sumEl.querySelectorAll(`[data-sp="${g}"]`).forEach(el => { el.style.visibility = 'visible'; popEl(el); });
      if (g < groups.length - 1) sumEl.querySelectorAll('[data-sp="+"]').forEach((el, k) => { if (k === g) el.style.visibility = 'visible'; });
      await sleep(gap);
    }
    sumEl.querySelector('[data-sp="eq"]').style.visibility = 'visible';
    sfx.ding();
    await sleep(600);
    const faceKind = m.solid === 'lp' ? 'hình vuông bằng nhau' : 'hình chữ nhật';
    const ok = m.ask === 'mat' ? `${right} có 6 mặt, các mặt là ${faceKind}.` : `${right} có ${ans} ${what}.`;
    done(mistakes, { ok, tip: tip ? `Nhớ: ${tip}` : '' });
  }

  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => {
      if (stepNow === 'pick') pks.find(b => b.dataset.k === m.solid).click();
      else if (stepNow === 'num') keys.type(String(ans));
    }, tap: (k) => { [...svg.querySelectorAll('.g3s-hit')].slice(0, k).forEach(el => el.dispatchEvent(new MouseEvent('click', { bubbles: true }))); },
    wrong: () => { if (stepNow === 'pick') pks.find(b => b.dataset.k !== m.solid).click(); else if (stepNow === 'num') keys.type(String(ans - 3)); } };
  }
}

// ── Cấp 3: Đếm khối lập phương nhỏ ──────────────────────────────────────────────────────────────────────
const CUBE_COL = '#60A5FA';
const LAYER_COL = ['#FCA5A5', '#FDE68A', '#86EFAC'];

function mountStack(stage, m, level, api) {
  const nx = m.H.length, nz = m.H[0].length;
  const cubes = [];
  for (let x = 0; x < nx; x++) for (let z = 0; z < nz; z++) for (let y = 0; y < m.H[x][z]; y++) cubes.push({ x, y, z });
  cubes.sort((a, b) => b.z - a.z || a.y - b.y || a.x - b.x); // vẽ từ sau ra trước, dưới lên trên, trái sang phải
  const lift = nz * Math.abs(DY) + 0.7;
  const pos = (c) => [c.x + c.z * DX, -(c.y + 1) + c.z * DY];
  const cubeSvg = (c, col) => { const [X, Y] = pos(c); return prism({ x: X, y: Y, w: 1, h: 1, d: 1, col }).svg; };
  const svgInner = cubes.map((c, i) => `<g class="g3s-cube" data-c="${i}">${cubeSvg(c, CUBE_COL)}</g>`).join('');
  const W = nx + nz * DX, Ht = m.layers + nz * Math.abs(DY);
  const bb0 = { x0: -0.9, y0: -Ht - 0.9, x1: W + 0.9, y1: 0.9 };
  // Tách tầng: chồng lên cao (khung đứng) hoặc đặt cạnh nhau trên sàn (khung dẹt), chọn cách cho khối to hơn.
  const bbUp = { x0: -0.9, y0: -Ht - (m.layers - 1) * lift - 0.9, x1: W + 0.9, y1: 0.9 };
  const side = W + 1;
  const bbSide = { x0: -0.9, y0: -1 - nz * Math.abs(DY) - 0.9, x1: (m.layers - 1) * side + W + 0.9, y1: 0.9 };
  const rows = Array.from({ length: level.maxLayers }, (_, k) => `<div class="g3s-lrow g3s-hide" data-l="${k}"><span class="g3s-ldot" style="background:${LAYER_COL[k]}"></span>Tầng ${k + 1}: <b data-ln="${k}">0</b> khối</div>`).join('');
  const board = `
    <div class="g3s g3s-stack">
      <div class="g3s-head">Hình bên có bao nhiêu <b>khối lập phương nhỏ</b>?</div>
      <div class="g3s-fig g3s-grid"><svg class="g3s-svg" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
         <ellipse class="g3s-shadow" cx="${W / 2}" cy="${0.2}" rx="${W / 2 + 0.6}" ry="0.35" fill="#E2E8F0"/>${svgInner}</svg></div>
      <div class="g3s-side">
        <div class="g3s-box g3s-ansbox"><div class="g3s-fit g3s-ans"><div>Có <span class="g3d-box" style="--boxw:1.8em" data-b></span> khối</div><div>lập phương nhỏ.</div></div></div>
        <div class="g3s-box g3s-layerbox"><div class="g3s-fit g3s-layers">${rows}</div></div>
        <div class="g3s-box g3s-sumbox"><div class="g3s-fit g3s-sum g3s-hide">${Array.from({ length: level.maxLayers }, () => '00').join(' + ')} = 00</div></div>
      </div>
    </div>`;
  const { paper, say, hint, pad: keys, done } = mountDrill(stage, { api, board, cls: 'g3s-scene' });
  const svg = paper.querySelector('.g3s-svg');
  const view = figFit(paper.querySelector('.g3s-fig'), svg, bb0);
  paper.querySelectorAll('.g3s-box').forEach(b => fitText(b, b.firstElementChild));
  const box = paper.querySelector('[data-b]');
  const sumEl = paper.querySelector('.g3s-sum');
  let stepNow = 'num', mistakes = 0, tip = '', wrongs = 0, exploded = false;

  setActive(paper, box);
  say('Hình bên có bao nhiêu khối lập phương nhỏ? Nhớ cả khối bị che.', '👀 Đếm <b>khối lập phương nhỏ</b>, nhớ cả <b>khối bị che</b>.');
  const want = {
    max: 2,
    onType: (t) => { box.textContent = t; },
    onSubmit: async (t) => {
      const v = Number(t);
      if (v === m.total) {
        keys.off();
        stepNow = 'busy';
        setActive(paper, null);
        box.classList.add('g3d-box-ok');
        sfx.pop(4);
        if (!exploded) await explode(true);
        await sleep(500);
        done(mistakes, { ok: `Hình có ${m.total} khối lập phương nhỏ.`, tip: tip ? `Nhớ: ${tip}` : '' });
        return;
      }
      mistakes++;
      wrongs++;
      tip ||= 'Đếm từng tầng, từ tầng dưới lên, nhớ cả khối bị che ở phía dưới, phía sau.';
      box.textContent = '';
      shake(box);
      if (exploded) hint('Cộng số khối của các tầng.', 'Cộng số khối <b>các tầng</b>.');
      else if (v === m.visible && m.visible < m.total) hint('Em mới đếm các khối nhìn thấy. Còn khối bị che ở phía dưới, phía sau khối khác.', 'Mới đếm <b>khối nhìn thấy</b>. Còn khối <b>bị che</b> ở dưới, ở sau.');
      else if (v > m.total) hint('Em đếm thừa. Mỗi khối chỉ đếm một lần.', 'Đếm <b>thừa</b>: mỗi khối chỉ đếm <b>một lần</b>.');
      else hint('Còn thiếu. Đếm từng tầng, từ tầng dưới lên.', 'Còn <b>thiếu</b>. Đếm <b>từng tầng</b>, từ dưới lên.');
      if (wrongs >= 2 && !exploded) {
        keys.off();
        stepNow = 'busy';
        await sleep(1400);
        await explode(false);
        stepNow = 'num';
        say('Bây giờ em gõ số khối lập phương nhỏ.', '⌨️ Gõ số <b>khối lập phương nhỏ</b>.');
        setActive(paper, box);
      }
      keys.want(want);
    },
  };
  keys.want(want);

  /** Các tầng tách ra (tầng trên nhấc lên), rồi đếm từng tầng từ dưới lên, mỗi khối ghi số trên mặt trên. */
  async function explode(after) {
    exploded = true;
    const calm = calmMotion();
    say('Tách từng tầng ra để đếm!', '🔍 Tách <b>từng tầng</b> ra để đếm.');
    const els = cubes.map((c, i) => svg.querySelector(`[data-c="${i}"]`));
    const ms = calm ? 900 : 700;
    const fz = paper.querySelector('.g3s-fig');
    const sc = (b) => Math.min(fz.clientWidth / (b.x1 - b.x0), fz.clientHeight / (b.y1 - b.y0));
    const flat = sc(bbSide) > sc(bbUp) * 1.08;
    const off = (c) => (flat ? [c.y * side, c.y] : [0, -c.y * lift]);
    svg.querySelector('.g3s-shadow').style.opacity = '0';
    const zoom = view.zoom(flat ? bbSide : bbUp, ms);
    const t0 = performance.now();
    for (;;) {
      const t = Math.min(1, (performance.now() - t0) / ms), e = 1 - (1 - t) ** 3;
      cubes.forEach((c, i) => { const [ox, oy] = off(c); els[i].setAttribute('transform', `translate(${f2(ox * e)} ${f2(oy * e)})`); });
      if (t >= 1 || !svg.isConnected) break;
      await sleep(16);
    }
    await zoom;
    sfx.whoosh?.();
    const per = [];
    const gap = calm ? 300 : 200;
    for (let L = 0; L < m.layers; L++) {
      const row = paper.querySelector(`[data-l="${L}"]`), ln = paper.querySelector(`[data-ln="${L}"]`);
      row.classList.remove('g3s-hide');
      // Đếm trong tầng: hàng trước trước, trái sang phải
      const list = cubes.map((c, i) => [c, i]).filter(([c]) => c.y === L).sort((a, b) => a[0].z - b[0].z || a[0].x - b[0].x);
      let k = 0;
      for (const [c, i] of list) {
        k++;
        els[i].innerHTML = cubeSvg(c, LAYER_COL[L]);
        const [X, Y] = pos(c);
        const t = document.createElementNS(NS, 'text');
        t.setAttribute('class', 'g3s-cn g3s-pop');
        t.setAttribute('x', f2(X + 0.5 + 0.5 * DX)); t.setAttribute('y', f2(Y + 0.5 * DY + 0.03));
        t.setAttribute('text-anchor', 'middle'); t.setAttribute('dominant-baseline', 'central');
        t.textContent = k;
        els[i].appendChild(t);
        ln.textContent = k;
        sfx.pop(k % 8);
        await sleep(gap);
      }
      per.push(k);
      popEl(ln);
      await sleep(gap * 1.5);
    }
    sumEl.textContent = `${per.join(' + ')} = ${m.total}`;
    sumEl.classList.remove('g3s-hide');
    popEl(sumEl);
    sfx.ding();
    if (after) say(`${per.join(' cộng ')} bằng ${m.total}. Có ${m.total} khối lập phương nhỏ.`, `${per.join(' + ')} = <b>${m.total}</b> khối.`);
    await sleep(700);
  }

  if (import.meta.env.DEV) {
    window.__g3drill = { m, step: () => { if (stepNow === 'num') keys.type(String(m.total)); }, wrong: () => { if (stepNow === 'num') keys.type(String(m.visible === m.total ? m.total + 1 : m.visible)); } };
  }
}

let solidStyles = false;
function injectSolidStyles() {
  if (solidStyles) return;
  solidStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .g3s-ink, .g3s-ink * { vector-effect: non-scaling-stroke; }
    .g3s { flex: 1; min-height: 0; display: grid; gap: 1.4cqh 2cqi; padding: 1.4cqh 2.4cqi 2cqh calc(clamp(1.4rem, 4cqi, 3rem) + 1.6cqi);
      grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr); grid-template-rows: auto minmax(0, 1fr);
      grid-template-areas: "head head" "fig side"; font-family: 'Baloo 2', sans-serif; font-weight: 700; color: #1E293B; }
    .g3s > * { min-height: 0; min-width: 0; }
    .g3s-head { grid-area: head; font-size: min(6.4cqh, 3.8cqi, 2.6rem); line-height: 1.25; color: #334155; }
    .g3s-head b { color: #C2410C; }
    .g3s-fig { grid-area: fig; display: flex; border-radius: 0.8rem; overflow: hidden; border: 2px solid #DBEAFE; background: #fff; position: relative; }
    .g3s-grid { background-image: linear-gradient(#EFF6FF 1.5px, transparent 1.5px), linear-gradient(90deg, #EFF6FF 1.5px, transparent 1.5px); background-size: 28px 28px; }
    .g3s-svg { flex: 1; width: 100%; height: 100%; display: block; }
    .g3s-side { grid-area: side; container-type: size; container-name: g3sside; display: flex; flex-direction: column; gap: 3cqh; }
    .g3s-hide { visibility: hidden; }
    .g3s-pop { animation: g3sPop .35s cubic-bezier(.2,1.5,.4,1); transform-box: fill-box; transform-origin: center; }
    @keyframes g3sPop { from { transform: scale(0.3); opacity: 0; } }
    @media (prefers-reduced-motion: reduce) { .g3s-pop { animation: g3sFade .4s ease; } @keyframes g3sFade { from { opacity: 0; } } }

    /* Cấp 1: ba nút to, khay đồ vật nằm trong nút */
    .g3s-bins { flex: 1; min-height: 0; display: flex; flex-direction: column; gap: 2.4cqh; padding-bottom: 1cqh; }
    .g3s-bin { flex: 1 1 0; min-height: 0; width: 100%; max-width: none; display: flex; flex-direction: column; align-items: stretch; gap: 1.2cqh; padding: 1.4cqh 2cqi;
      border-radius: 1rem; border: 2px solid ${EDGE}; background: #fff; color: #1E293B; box-shadow: 0 6px 0 #CBD5E1; font-family: 'Baloo 2', sans-serif; cursor: pointer; }
    .g3s-bin:active { transform: translateY(4px); box-shadow: 0 2px 0 #CBD5E1; }
    .g3s-bin-lp { background: #EFF6FF; border-color: #BFDBFE; box-shadow: 0 6px 0 #93C5FD; }
    .g3s-bin-hhcn { background: #FFF7ED; border-color: #FED7AA; box-shadow: 0 6px 0 #FDBA74; }
    .g3s-bin-khac { background: #F5F3FF; border-color: #DDD6FE; box-shadow: 0 6px 0 #C4B5FD; }
    .g3s-bin:disabled { opacity: 1; cursor: default; }
    .g3s-bin-top { flex: 0 0 42%; min-height: 0; display: flex; align-items: center; gap: 0.4em; font-size: min(8cqh, 6.4cqi, 2.4rem); line-height: 1; }
    .g3s-bin-ic { height: 100%; width: auto; max-width: 3em; flex: none; }
    .g3s-bin-name { flex: 1; text-align: left; white-space: nowrap; overflow: hidden; }
    .g3s-bin-n { flex: none; min-width: 1.4em; padding: 0.1em 0.2em; border-radius: 0.5em; background: #fff; border: 2px solid ${EDGE}; color: #C2410C; display: inline-block; text-align: center; }
    .g3s-tray { flex: 1; min-height: 0; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: 0.6cqi; }
    .g3s-slot { border-radius: 0.5rem; border: 2px dashed rgba(100,116,139,0.28); background: rgba(255,255,255,0.7); display: flex; min-height: 0; padding: 4%; }
    .g3s-slot-on { border-style: solid; border-color: rgba(100,116,139,0.18); background: #fff; }
    .g3s-slot svg { width: 100%; height: 100%; }
    .g3s-slot .g3s-ink, .g3s-bin-ic .g3s-ink, .g3s-pk-ic .g3s-ink { stroke-width: 1.4px; }
    @container g3sside (aspect-ratio > 1.5) {
      .g3s-bins { flex-direction: row; gap: 2.4cqi; }
      .g3s-bin { padding: 1.4cqh 1.4cqi; }
      .g3s-bin-top { flex: 0 0 38%; flex-direction: column; gap: 0.15em; font-size: min(7cqh, 2.9cqi, 2rem); }
      .g3s-bin-ic { height: auto; flex: 1 1 0; min-height: 0; max-width: none; width: 100%; }
      .g3s-bin-name { flex: none; text-align: center; }
      .g3s-bin-n { position: absolute; top: 0.4em; right: 0.4em; }
      .g3s-bin { position: relative; }
      .g3s-tray { grid-template-columns: repeat(calc(var(--n) / 2), minmax(0, 1fr)); grid-template-rows: repeat(2, minmax(0, 1fr)); }
    }

    /* Cấp 2: khối, đỉnh, cạnh, mặt */
    .g3s-edge { stroke: ${INK}; stroke-width: var(--sw); stroke-linecap: round; }
    .g3s-dash { stroke-dasharray: calc(var(--sw) * 3) calc(var(--sw) * 2.4); stroke: #475569; }
    .g3s-edge.g3s-on { stroke: #F97316; stroke-width: calc(var(--sw) * 2.4); }
    .g3s-vx { fill: #64748B; }
    .g3s-vx.g3s-on { fill: #F97316; r: 0.24px; }
    .g3s-hface { fill: ${HIT}; fill-opacity: 0.55; stroke: #F97316; stroke-width: 0.06px; stroke-dasharray: 0.2 0.15; pointer-events: none; }
    .g3s-face { transition: fill .25s; }
    .g3s-lead { stroke: #94A3B8; stroke-width: 0.05px; stroke-dasharray: 0.16 0.12; }
    .g3s-chip rect { fill: #fff; stroke: #94A3B8; stroke-width: 0.06px; }
    .g3s-chip text { font: 800 0.48px 'Baloo 2', sans-serif; fill: #334155; }
    .g3s-chip-dot { fill: #fff; stroke: #CBD5E1; stroke-width: 0.06px; }
    .g3s-chip .g3s-chip-n { fill: #C2410C; font-size: 0.46px; }
    .g3s-chip.g3s-on rect { fill: #FEF9C3; stroke: #F97316; }
    .g3s-hit { cursor: default; }
    .g3s-hit-e { stroke: transparent; stroke-linecap: round; }
    .g3s-live .g3s-hit { cursor: pointer; }
    .g3s-badge circle { fill: #fff; stroke-width: 0.07px; }
    .g3s-badge text { font: 800 0.4px 'Baloo 2', sans-serif; fill: #1E293B; }
    .g3s-badges { pointer-events: none; }
    .g3s-pick { grid-area: pick; flex: 0 0 26%; display: flex; gap: 2.4cqi; min-height: 0; }
    .g3s-pk { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.15em; font-size: min(7cqh, 4.6cqi, 2.2rem); line-height: 1.05; white-space: normal; padding: 0.2em 0.3em; }
    .g3s-pk-ic { flex: 1 1 0; min-height: 0; width: 100%; }
    .g3s-box { flex: 1 1 0; min-height: 0; display: flex; align-items: center; justify-content: center; overflow: hidden; }
    .g3s-tallybox { grid-area: tally; flex: 0.55 1 0; }
    .g3s-ansbox { grid-area: ans; flex: 1.1 1 0; }
    .g3s-sumbox { grid-area: sum; flex: 0.6 1 0; }
    .g3s-fit { width: max-content; white-space: nowrap; line-height: 1.25; }
    .g3s-tally { color: #475569; }
    .g3s-tally b { color: #C2410C; display: inline-block; min-width: 1.2em; text-align: center; }
    .g3s-ans > div { display: flex; align-items: center; gap: 0.25em; justify-content: center; }
    .g3s-ans .g3d-box { height: 1.2em; }
    .g3s-nslot { display: inline-grid; padding: 0 0.15em; border: 0.06em dashed #93C5FD; border-radius: 0.2em; }
    .g3s-nslot > * { grid-area: 1 / 1; text-align: center; }
    .g3s-ghost { visibility: hidden; }
    .g3s-nt { color: #94A3B8; }
    .g3s-nt-on { color: #1E293B; }
    .g3s-nslot:has(.g3s-nt-on) { border-color: transparent; }
    .g3s-sum { color: #15803D; }
    .g3s-flyt { width: 100%; height: 100%; display: grid; place-items: center; white-space: nowrap; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #166534; }

    /* Cấp 3: khối xếp chồng */
    .g3s-stack .g3s-ink { stroke-width: 2px; }
    .g3s-shadow { transition: opacity .4s; }
    .g3s-cn { font: 800 0.5px 'Baloo 2', sans-serif; fill: #1E293B; }
    .g3s-layerbox { grid-area: layers; flex: 1.3 1 0; }
    .g3s-layers { display: flex; flex-direction: column-reverse; gap: 0.12em; }
    .g3s-lrow { display: flex; align-items: center; gap: 0.3em; color: #334155; }
    .g3s-lrow b { color: #C2410C; display: inline-block; min-width: 1.2em; text-align: center; }
    .g3s-ldot { width: 0.7em; height: 0.7em; border-radius: 0.15em; border: 2px solid ${INK}; display: inline-block; }

    /* Tờ vở gần vuông / đứng: hình trên, nút và dòng trả lời dưới */
    .g3s-scene .g3d-paper { container-name: g3spaper; }
    @container g3spaper (aspect-ratio < 1.3) {
      .g3s { grid-template-columns: minmax(0, 1fr); grid-template-rows: auto minmax(0, 1.35fr) minmax(0, 1fr); grid-template-areas: "head" "fig" "side"; }
      .g3s-head { font-size: min(4.4cqh, 5.6cqi); }
      .g3s-count .g3s-side { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 0.6fr) minmax(0, 1fr);
        grid-template-areas: "pick pick" "tally sum" "ans ans"; gap: 2cqh 3cqi; }
      .g3s-count .g3s-ans, .g3s-stack .g3s-ans { display: flex; gap: 0.25em; }
      .g3s-stack .g3s-side { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); grid-template-rows: minmax(0, 1fr) minmax(0, 1.2fr);
        grid-template-areas: "ans ans" "layers sum"; gap: 2cqh 3cqi; }
    }
  `;
  document.head.appendChild(st);
}
