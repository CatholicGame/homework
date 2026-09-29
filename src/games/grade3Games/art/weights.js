/**
 * Quả cân SVG — cùng kiểu quả cân gang có quai trong vở bài tập
 * (weight() ở scripts/redraw/kit_measure.py): thân hình thang bo góc, nhãn giữa thân.
 * Gốc toạ độ = giữa đáy.
 */

export const INK = '#3F3A40';
const METAL = '#B8C2CC';

const SIZES = {
  100: { w: 28, h: 25 }, 200: { w: 32, h: 29 }, 500: { w: 40, h: 36 },
  1000: { w: 38, h: 34 }, 2000: { w: 44, h: 40 }, 5000: { w: 54, h: 48 }, 10000: { w: 62, h: 54 },
};

export function weightSize(g) {
  return SIZES[g] || { w: 32, h: 29 };
}

export function weightLabel(g) {
  return g >= 1000 ? `${g / 1000} kg` : `${g} g`;
}

export function weightSvg(g) {
  const { w, h } = weightSize(g);
  const k = w / 56;                 // các góc bo của bản vở vẽ cho quả rộng 56
  const sw = 2;
  const bt = h * 0.78, tw = w * 0.36, y0 = -bt, hw = w / 2;
  const f = (n) => n.toFixed(1);
  const label = g >= 1000 ? `${g / 1000}kg` : `${g}g`;
  const st = `stroke="${INK}" stroke-width="${sw}" stroke-linejoin="round"`;
  return `
    <rect x="${f(-w * 0.2)}" y="${f(-h)}" width="${f(w * 0.4)}" height="${f(h * 0.14)}" rx="${f(h * 0.05)}" fill="${METAL}" ${st}/>
    <rect x="${f(-w * 0.12)}" y="${f(-h + h * 0.12)}" width="${f(w * 0.24)}" height="${f(h * 0.12)}" fill="${METAL}" ${st}/>
    <path d="M${f(-tw)},${f(y0)} H${f(tw)} Q${f(tw + 4 * k)},${f(y0)} ${f(tw + 6 * k)},${f(y0 + 6 * k)} L${f(hw)},${f(-6 * k)} Q${f(hw + k)},0 ${f(hw - 6 * k)},0 H${f(-hw + 6 * k)} Q${f(-hw - k)},0 ${f(-hw)},${f(-6 * k)} L${f(-tw - 6 * k)},${f(y0 + 6 * k)} Q${f(-tw - 4 * k)},${f(y0)} ${f(-tw)},${f(y0)} Z" fill="${METAL}" ${st}/>
    <path d="M${f(-tw - 1)},${f(y0 + 10 * k)} L${f(-hw + 5 * k)},${f(-10 * k)}" stroke="#fff" stroke-width="${sw}" stroke-linecap="round" opacity=".7"/>
    <text x="${f(k * 2)}" y="${f(-bt * 0.42)}" text-anchor="middle" dominant-baseline="central" font-size="${f(Math.min(12, w * 0.29))}" font-weight="800" fill="${INK}" font-family="Quicksand, sans-serif">${label}</text>`;
}

/** Một quả cân đứng riêng (khay quả cân). */
export function weightIcon(g) {
  const { w, h } = weightSize(g);
  const pad = 4;
  return `<svg viewBox="${-w / 2 - pad} ${-h - pad} ${w + pad * 2} ${h + pad * 2}" width="${w + pad * 2}" height="${h + pad * 2}" aria-hidden="true">${weightSvg(g)}</svg>`;
}
