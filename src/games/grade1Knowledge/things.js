/**
 * Đồ vật vẽ riêng của Toán 1 (tâm x, y; cỡ s): dùng cho ví dụ 📘 Kiến thức (./demos.js) và hình của đề
 * Kiểm tra theo lộ trình lớp 1 (src/data/routeTests/g1). Không phụ thuộc DOM, chạy được cả trong Node.
 */

const r1 = (v) => Math.round(v * 10) / 10;
const INK = '#334155';
const rect = (x, y, w, h, { fill = 'none', stroke = 'none', sw = 1.5, rx = 3 } = {}) =>
  `<rect x="${r1(x)}" y="${r1(y)}" width="${r1(w)}" height="${r1(h)}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const ln = (x1, y1, x2, y2, { stroke = INK, sw = 2 } = {}) =>
  `<line x1="${r1(x1)}" y1="${r1(y1)}" x2="${r1(x2)}" y2="${r1(y2)}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
const path = (d, { stroke = INK, sw = 2, fill = 'none' } = {}) =>
  `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
const circ = (x, y, r, { fill = 'none', stroke = 'none', sw = 1.5 } = {}) =>
  `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
const ell = (x, y, rx, ry, { fill = 'none', stroke = 'none', sw = 1.5, rot = 0 } = {}) =>
  `<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(rx)}" ry="${r1(ry)}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${rot ? ` transform="rotate(${rot} ${r1(x)} ${r1(y)})"` : ''}/>`;

const EDGE = '#64748B';
export const THINGS = {
  apple: { name: 'quả táo', short: 'táo', draw: (x, y, s) => circ(x, y + s * 0.04, s * 0.4, { fill: '#EF4444', stroke: '#B91C1C', sw: 1.2 })
    + ell(x - s * 0.15, y - s * 0.08, s * 0.08, s * 0.12, { fill: '#FCA5A5', rot: 20 })
    + ln(x, y - s * 0.34, x + s * 0.04, y - s * 0.5, { stroke: '#78350F', sw: s * 0.06 })
    + ell(x + s * 0.17, y - s * 0.42, s * 0.14, s * 0.07, { fill: '#22C55E', rot: -25 }) },
  bird: { name: 'con chim', short: 'chim', draw: (x, y, s) => path(`M${r1(x - s * 0.3)} ${r1(y + s * 0.05)} L${r1(x - s * 0.5)} ${r1(y - s * 0.1)} L${r1(x - s * 0.46)} ${r1(y + s * 0.16)} Z`, { fill: '#0284C7', stroke: '#0284C7', sw: 1 })
    + ell(x, y + s * 0.05, s * 0.36, s * 0.28, { fill: '#38BDF8', stroke: '#0284C7', sw: 1.2 })
    + circ(x + s * 0.22, y - s * 0.16, s * 0.18, { fill: '#38BDF8', stroke: '#0284C7', sw: 1.2 })
    + path(`M${r1(x - s * 0.14)} ${r1(y)} q${r1(s * 0.14)} ${r1(s * 0.2)} ${r1(s * 0.3)} 0`, { stroke: '#0369A1', sw: 1.6, fill: '#7DD3FC' })
    + path(`M${r1(x + s * 0.38)} ${r1(y - s * 0.2)} l${r1(s * 0.16)} ${r1(s * 0.05)} l${r1(-s * 0.16)} ${r1(s * 0.06)} Z`, { fill: '#F59E0B', stroke: '#F59E0B', sw: 1 })
    + circ(x + s * 0.26, y - s * 0.2, s * 0.04, { fill: '#0F172A' }) },
  fish: { name: 'con cá', short: 'cá', draw: (x, y, s) => path(`M${r1(x - s * 0.28)} ${r1(y)} L${r1(x - s * 0.5)} ${r1(y - s * 0.2)} L${r1(x - s * 0.5)} ${r1(y + s * 0.2)} Z`, { fill: '#FB923C', stroke: '#EA580C', sw: 1.2 })
    + ell(x + s * 0.05, y, s * 0.36, s * 0.24, { fill: '#FDBA74', stroke: '#EA580C', sw: 1.2 })
    + circ(x + s * 0.24, y - s * 0.05, s * 0.05, { fill: '#0F172A' }) },
  frog: { name: 'con ếch', short: 'ếch', draw: (x, y, s) => ell(x, y + s * 0.08, s * 0.4, s * 0.3, { fill: '#4ADE80', stroke: '#15803D', sw: 1.2 })
    + circ(x - s * 0.18, y - s * 0.2, s * 0.13, { fill: '#4ADE80', stroke: '#15803D', sw: 1.2 }) + circ(x + s * 0.18, y - s * 0.2, s * 0.13, { fill: '#4ADE80', stroke: '#15803D', sw: 1.2 })
    + circ(x - s * 0.18, y - s * 0.21, s * 0.08, { fill: '#fff' }) + circ(x + s * 0.18, y - s * 0.21, s * 0.08, { fill: '#fff' })
    + circ(x - s * 0.17, y - s * 0.2, s * 0.04, { fill: '#0F172A' }) + circ(x + s * 0.19, y - s * 0.2, s * 0.04, { fill: '#0F172A' })
    + path(`M${r1(x - s * 0.16)} ${r1(y + s * 0.08)} q${r1(s * 0.16)} ${r1(s * 0.12)} ${r1(s * 0.32)} 0`, { stroke: '#166534', sw: 1.6 }) },
  star: { name: 'ngôi sao', short: 'sao', draw: (x, y, s) => {
    const pts = Array.from({ length: 10 }, (_, i) => { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? s * 0.2 : s * 0.46; return `${r1(x + r * Math.cos(a))},${r1(y + s * 0.04 + r * Math.sin(a))}`; }).join(' ');
    return `<polygon points="${pts}" fill="#FACC15" stroke="#CA8A04" stroke-width="1.2" stroke-linejoin="round"/>`;
  } },
  cup: { name: 'cái cốc', short: 'cốc', draw: (x, y, s) => path(`M${r1(x + s * 0.24)} ${r1(y - s * 0.12)} c${r1(s * 0.24)} 0 ${r1(s * 0.24)} ${r1(s * 0.3)} 0 ${r1(s * 0.3)}`, { stroke: '#2563EB', sw: s * 0.07 })
    + path(`M${r1(x - s * 0.32)} ${r1(y - s * 0.3)} L${r1(x + s * 0.3)} ${r1(y - s * 0.3)} L${r1(x + s * 0.22)} ${r1(y + s * 0.36)} L${r1(x - s * 0.24)} ${r1(y + s * 0.36)} Z`, { fill: '#60A5FA', stroke: '#2563EB', sw: 1.2 })
    + rect(x - s * 0.24, y - s * 0.12, s * 0.46, s * 0.1, { fill: '#BFDBFE', rx: 1 }) },
  spoon: { name: 'cái thìa', short: 'thìa', draw: (x, y, s) => rect(x - s * 0.05, y - s * 0.05, s * 0.1, s * 0.5, { fill: '#94A3B8', stroke: '#64748B', sw: 1, rx: s * 0.05 })
    + ell(x, y - s * 0.22, s * 0.16, s * 0.22, { fill: '#CBD5E1', stroke: '#64748B', sw: 1.2 }) },
  rabbit: { name: 'con thỏ', short: 'thỏ', draw: (x, y, s) => ell(x - s * 0.13, y - s * 0.24, s * 0.08, s * 0.24, { fill: '#fff', stroke: EDGE, sw: 1.2, rot: -10 })
    + ell(x + s * 0.13, y - s * 0.24, s * 0.08, s * 0.24, { fill: '#fff', stroke: EDGE, sw: 1.2, rot: 10 })
    + ell(x - s * 0.13, y - s * 0.24, s * 0.035, s * 0.15, { fill: '#F9A8D4', rot: -10 }) + ell(x + s * 0.13, y - s * 0.24, s * 0.035, s * 0.15, { fill: '#F9A8D4', rot: 10 })
    + circ(x, y + s * 0.16, s * 0.28, { fill: '#fff', stroke: EDGE, sw: 1.2 })
    + circ(x - s * 0.1, y + s * 0.1, s * 0.04, { fill: '#0F172A' }) + circ(x + s * 0.1, y + s * 0.1, s * 0.04, { fill: '#0F172A' })
    + circ(x, y + s * 0.2, s * 0.04, { fill: '#F472B6' }) },
  carrot: { name: 'củ cà rốt', short: 'cà rốt', draw: (x, y, s) => path(`M${r1(x)} ${r1(y - s * 0.26)} l${r1(-s * 0.12)} ${r1(-s * 0.2)} M${r1(x)} ${r1(y - s * 0.26)} l0 ${r1(-s * 0.24)} M${r1(x)} ${r1(y - s * 0.26)} l${r1(s * 0.12)} ${r1(-s * 0.2)}`, { stroke: '#16A34A', sw: s * 0.07 })
    + path(`M${r1(x - s * 0.17)} ${r1(y - s * 0.26)} L${r1(x + s * 0.17)} ${r1(y - s * 0.26)} L${r1(x)} ${r1(y + s * 0.48)} Z`, { fill: '#FB923C', stroke: '#EA580C', sw: 1.2 })
    + ln(x - s * 0.08, y - s * 0.06, x + s * 0.02, y - s * 0.06, { stroke: '#EA580C', sw: 1.2 }) + ln(x - s * 0.02, y + s * 0.14, x + s * 0.06, y + s * 0.14, { stroke: '#EA580C', sw: 1.2 }) },
  flower: { name: 'bông hoa', short: 'hoa', draw: (x, y, s) => [0, 1, 2, 3, 4].map((i) => { const a = -Math.PI / 2 + (i * 2 * Math.PI) / 5; return circ(x + s * 0.22 * Math.cos(a), y + s * 0.22 * Math.sin(a), s * 0.17, { fill: '#F472B6', stroke: '#DB2777', sw: 1 }); }).join('')
    + circ(x, y, s * 0.13, { fill: '#FDE047', stroke: '#CA8A04', sw: 1 }) },
  chick: { name: 'con gà con', short: 'gà con', draw: (x, y, s) => ell(x, y + s * 0.12, s * 0.34, s * 0.28, { fill: '#FDE047', stroke: '#CA8A04', sw: 1.2 })
    + circ(x + s * 0.12, y - s * 0.16, s * 0.2, { fill: '#FDE047', stroke: '#CA8A04', sw: 1.2 })
    + path(`M${r1(x + s * 0.3)} ${r1(y - s * 0.2)} l${r1(s * 0.14)} ${r1(s * 0.05)} l${r1(-s * 0.14)} ${r1(s * 0.05)} Z`, { fill: '#F97316', stroke: '#F97316', sw: 1 })
    + circ(x + s * 0.17, y - s * 0.2, s * 0.035, { fill: '#0F172A' }) },
  ball: { name: 'quả bóng', short: 'bóng', draw: (x, y, s) => path(`M${r1(x)} ${r1(y + s * 0.3)} q${r1(-s * 0.08)} ${r1(s * 0.1)} 0 ${r1(s * 0.2)}`, { stroke: '#94A3B8', sw: 1.4 })
    + path(`M${r1(x - s * 0.05)} ${r1(y + s * 0.34)} L${r1(x + s * 0.05)} ${r1(y + s * 0.34)} L${r1(x)} ${r1(y + s * 0.27)} Z`, { fill: '#7C3AED', stroke: '#7C3AED', sw: 1 })
    + ell(x, y - s * 0.06, s * 0.3, s * 0.36, { fill: '#A78BFA', stroke: '#7C3AED', sw: 1.2 })
    + ell(x - s * 0.11, y - s * 0.18, s * 0.06, s * 0.1, { fill: '#EDE9FE', rot: 25 }) },
  dot: { name: 'chấm tròn', short: 'chấm', draw: (x, y, s) => circ(x, y, s * 0.36, { fill: '#3B82F6', stroke: '#1D4ED8', sw: 1.2 }) },
};
export const thing = (k) => THINGS[k] || THINGS.apple;
