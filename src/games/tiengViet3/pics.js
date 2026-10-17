/**
 * Tranh minh hoạ tự vẽ (SVG) cho câu "Quan sát tranh…" của Bài tập cuối tuần Tiếng Việt 3.
 * Không dùng hình của sách / trang web. Mỗi tuần một file tiengViet3/pics/tuanNN.js: export default { tên: () => '<svg…>' }.
 * Đồ nghề vẽ chung (bạn nhỏ…): picKit.js. picSvg(tên) → chuỗi <svg>.
 */

const PICS = Object.assign({}, ...Object.values(import.meta.glob('./pics/*.js', { eager: true, import: 'default' })));

export function picSvg(name) {
  const f = PICS[name];
  if (!f) { console.warn('[tv3] chưa có tranh:', name); return ''; }
  return f();
}
export const PIC_NAMES = Object.keys(PICS);
