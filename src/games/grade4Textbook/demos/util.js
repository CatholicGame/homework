/**
 * Dùng chung cho các ví dụ "xem từng bước" của 📘 Kiến thức (SGK Toán 4), xem ../knowledgeDemo.js.
 *
 * Mỗi loại ví dụ là một hàm build(spec) → { title, frames: [{ html, caption, result?, ask? }] }.
 *   html     nội dung khung hình của bước (mọi bước của một ví dụ cùng cỡ: vẽ sẵn chỗ cho phần chưa hiện)
 *   caption  lời giải thích (HTML, được dùng <b>)
 *   result   dòng kết quả to màu xanh dưới khung hình (tuỳ chọn)
 *   ask      câu hỏi em phải chọn đúng mới đi tiếp: { options: [html…], answer: chỉ số, ok?: lời khen + giải thích }
 * Phần tử có class "is-new" hiện ra có hiệu ứng (rơi xuống / bật lên); class "kd-ghost" giữ chỗ nhưng ẩn.
 */

export const PLACES = ['đơn vị', 'chục', 'trăm', 'nghìn', 'chục nghìn', 'trăm nghìn', 'triệu', 'chục triệu', 'trăm triệu'];
export const CLASSES = ['lớp đơn vị', 'lớp nghìn', 'lớp triệu'];

export const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** 4 chữ số viết liền (7698), từ 5 chữ số tách lớp bằng khoảng trống (29 869) như sách. */
export const fmt = (n) => { const s = String(n); return s.replace(/\d+/g, d => (d.length <= 4 ? d : d.replace(/\B(?=(\d{3})+(?!\d))/g, ' '))); };
export const lt = '&lt;', gt = '&gt;';
export const signHtml = (s) => (s === '<' ? lt : s === '>' ? gt : s);
export const fr = (a, b) => `<span class="gw-frac"><span>${a}</span><span>${b}</span></span>`;

/** Bộ khung hình: f.add(html, caption, extra) — extra: { result, ask }. */
export function frames(title) {
  const list = [];
  return {
    title,
    frames: list,
    add(html, caption, extra = {}) { list.push({ html, caption, ...extra }); return this; },
    done() { return { title, frames: list }; },
  };
}

/** Ba lựa chọn cho câu hỏi số: đáp án đúng và hai số gần (không âm, không trùng), xếp từ bé đến lớn. */
export function numAsk(answer, { near = [1, -1, 10, 2], fmtFn = fmt, ok } = {}) {
  const vals = [answer];
  for (const d of near) { const v = answer + d; if (v >= 0 && !vals.includes(v)) vals.push(v); if (vals.length === 3) break; }
  vals.sort((x, y) => x - y);
  return { options: vals.map(v => fmtFn(v)), answer: vals.indexOf(answer), ok };
}

/** Thẻ svg co giãn theo bề ngang khung (viewBox w × h). */
export const svg = (w, h, body, cls = '') => `<svg class="kd-svg ${cls}" viewBox="0 0 ${w} ${h}" role="img" aria-hidden="true">${body}</svg>`;

export const C = {
  ink: '#334155', soft: '#94A3B8', line: '#CBD5E1', paper: '#fff',
  blue: '#3B82F6', blueL: '#BFDBFE', orange: '#F97316', orangeL: '#FED7AA', green: '#16A34A', greenL: '#BBF7D0',
  red: '#DC2626', redL: '#FECACA', violet: '#8B5CF6', violetL: '#DDD6FE', yellow: '#F59E0B', yellowL: '#FEF3C7',
};

/** Chữ trong svg (căn giữa mặc định). */
export const txt = (x, y, t, { size = 16, fill = C.ink, weight = 800, anchor = 'middle', cls = '' } = {}) =>
  `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" font-weight="${weight}" text-anchor="${anchor}" dominant-baseline="middle" class="${cls}">${t}</text>`;

/** Lớp phần tử: "is-new" khi vừa hiện ở bước này, "kd-ghost" khi chưa tới. */
export const st = (shown, isNew) => (!shown ? 'kd-ghost' : isNew ? 'is-new' : '');
