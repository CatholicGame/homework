/**
 * Nét viết chữ cái in thường (kiểu chữ in tròn – que của sách "Làm quen bảng chữ cái")
 * để bé tô bằng ngón tay (trace.js). Khung cao 140, bốn dòng kẻ:
 *   y = 12  đầu chữ cao (b, d, h, k, l)     y = 52  đầu chữ thường (a, c, e…)
 *   y = 100 dòng kẻ chân chữ                y = 136 đuôi chữ (g, p, q, y)
 * Mỗi nét chỉ dùng M / L / C với cặp toạ độ "x y" để dời được khi ghép chữ (ch, ngh…).
 * Thứ tự nét và chiều nét theo cách viết: nét cong trước, nét thẳng sau, dấu sau cùng.
 */

export const LETTER_GUIDES = [12, 52, 100, 136];
const GAP = 26;  // khoảng cách giữa hai chữ trong chữ ghép (vệt tô rộng 20)

// Vòng tròn đầu chữ thường, tâm (cx, 76), rộng 44 × cao 48.
// ccw: bắt đầu bên phải, đi lên, ngược chiều kim đồng hồ (a, d, g, o, q).
// cw: bắt đầu bên trái, đi lên, theo chiều kim đồng hồ (b, p).
const K = 0.5523;
function bowl(cx, dir = 'ccw') {
  const rx = 22, ry = 24, cy = 76, kx = +(rx * K).toFixed(1), ky = +(ry * K).toFixed(1);
  const s = dir === 'ccw' ? 1 : -1;
  const x = (d) => +(cx + s * d).toFixed(1);
  return `M${x(rx)} ${cy} C${x(rx)} ${cy - ky} ${x(kx)} ${cy - ry} ${cx} ${cy - ry} `
    + `C${x(-kx)} ${cy - ry} ${x(-rx)} ${cy - ky} ${x(-rx)} ${cy} `
    + `C${x(-rx)} ${cy + ky} ${x(-kx)} ${cy + ry} ${cx} ${cy + ry} `
    + `C${x(kx)} ${cy + ry} ${x(rx)} ${cy + ky} ${x(rx)} ${cy}`;
}

// Dấu phụ trên đầu chữ, căn giữa theo cx.
const HAT = (cx) => `M${cx - 14} 42 L${cx} 26 L${cx + 14} 42`;
const BREVE = (cx) => `M${cx - 12} 26 C${cx - 8} 42 ${cx + 8} 42 ${cx + 12} 26`;
const DOT = (cx, y) => `M${cx} ${y - 1} L${cx} ${y + 1}`;

/** Chữ cái: { w: bề rộng, s: các nét }. */
const LETTERS = {
  a: { w: 60, s: [bowl(30), 'M52 52 L52 100'] },
  ă: { w: 60, s: [bowl(30), 'M52 52 L52 100', BREVE(30)] },
  â: { w: 60, s: [bowl(30), 'M52 52 L52 100', HAT(30)] },
  b: { w: 60, s: ['M8 12 L8 100', bowl(30, 'cw')] },
  c: { w: 56, s: ['M50 60 C44 54 38 52 30 52 C16 52 8 64 8 76 C8 88 16 100 30 100 C38 100 44 98 50 92'] },
  d: { w: 60, s: [bowl(30), 'M52 12 L52 100'] },
  đ: { w: 70, s: [bowl(30), 'M52 12 L52 100', 'M38 30 L66 30'] },
  e: { w: 60, s: ['M8 76 L52 76 C52 62 42 52 30 52 C16 52 8 64 8 76 C8 90 18 100 30 100 C40 100 46 96 50 90'] },
  ê: { w: 60, s: ['M8 76 L52 76 C52 62 42 52 30 52 C16 52 8 64 8 76 C8 90 18 100 30 100 C40 100 46 96 50 90', HAT(30)] },
  g: { w: 60, s: [bowl(30), 'M52 52 L52 118 C52 130 42 136 30 136 C20 136 14 132 10 126'] },
  h: { w: 56, s: ['M8 12 L8 100', 'M8 72 C12 58 20 52 30 52 C42 52 48 60 48 72 L48 100'] },
  i: { w: 24, s: ['M12 52 L12 100', DOT(12, 32)] },
  k: { w: 52, s: ['M8 12 L8 100', 'M44 52 L8 82', 'M20 72 L46 100'] },
  l: { w: 24, s: ['M12 12 L12 100'] },
  m: { w: 76, s: ['M8 52 L8 100', 'M8 70 C10 58 16 52 24 52 C34 52 38 60 38 70 L38 100', 'M38 70 C40 58 46 52 54 52 C64 52 68 60 68 70 L68 100'] },
  n: { w: 56, s: ['M8 52 L8 100', 'M8 72 C12 58 20 52 30 52 C42 52 48 60 48 72 L48 100'] },
  o: { w: 60, s: [bowl(30)] },
  ô: { w: 60, s: [bowl(30), HAT(30)] },
  ơ: { w: 66, s: [bowl(30), 'M47 61 C54 60 60 55 60 46'] },
  p: { w: 60, s: ['M8 52 L8 136', bowl(30, 'cw')] },
  q: { w: 60, s: [bowl(30), 'M52 52 L52 136'] },
  r: { w: 44, s: ['M8 52 L8 100', 'M8 72 C12 58 22 52 36 54'] },
  s: { w: 56, s: ['M46 60 C40 54 34 52 28 52 C18 52 10 58 10 65 C10 74 20 76 28 77 C38 78 48 82 48 90 C48 96 40 100 28 100 C20 100 12 98 8 92'] },
  t: { w: 46, s: ['M20 24 L20 90 C20 97 24 100 30 100 C34 100 37 99 40 97', 'M6 52 L38 52'] },
  u: { w: 56, s: ['M8 52 L8 80 C8 93 16 100 28 100 C40 100 48 92 48 80', 'M48 52 L48 100'] },
  ư: { w: 64, s: ['M8 52 L8 80 C8 93 16 100 28 100 C40 100 48 92 48 80', 'M48 52 L48 100', 'M48 56 C55 55 60 50 60 42'] },
  v: { w: 56, s: ['M6 52 L28 100 L50 52'] },
  x: { w: 56, s: ['M8 52 L48 100', 'M48 52 L8 100'] },
  y: { w: 56, s: ['M6 52 L28 100', 'M50 52 L28 100 L16 136'] },
};

// Dấu thanh đặt trên / dưới chữ a (tâm x = 30).
const TONES = {
  '̀': 'M22 24 L36 42',                                       // huyền
  '́': 'M38 24 L24 42',                                       // sắc
  '̉': 'M22 29 C22 19 40 19 40 28 C40 34 31 34 31 40 L31 44', // hỏi
  '̃': 'M12 38 C18 27 24 27 29 33 C34 39 40 39 47 28',        // ngã
  '̣': DOT(30, 116),                                          // nặng
};

const shift = (d, dx) => d.replace(/(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g, (_, x, y) => `${+(+x + dx).toFixed(1)} ${y}`);

/**
 * Nét của một chữ / chữ ghép / chữ có dấu thanh ("a", "ngh", "à"…):
 * { width, strokes, guides } cho mountTracer.
 */
export function letterGlyph(text) {
  const chars = [...text.normalize('NFD')];
  const strokes = [];
  let x = 0;
  for (let i = 0; i < chars.length; i++) {
    // Giữ nguyên các chữ có dấu phụ (ă, â, ê, ô, ơ, ư, đ) — chỉ tách dấu thanh.
    let ch = chars[i];
    while (chars[i + 1] && !TONES[chars[i + 1]] && /\p{M}/u.test(chars[i + 1])) ch += chars[++i];
    const L = LETTERS[ch.normalize('NFC')];
    if (!L) throw new Error(`Chưa có nét cho chữ "${ch}"`);
    if (x) x += GAP;
    strokes.push(...L.s.map(d => shift(d, x)));
    if (TONES[chars[i + 1]]) strokes.push(shift(TONES[chars[++i]], x));
    x += L.w;
  }
  return { width: x, strokes, guides: LETTER_GUIDES };
}
