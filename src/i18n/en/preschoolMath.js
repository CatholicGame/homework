/**
 * Toán tiền tiểu học (Bé Học Vui Toán Tập 1, 2; Bé Tập Làm Toán): nội dung Việt → Anh (engine/i18n.js).
 * Mỗi tệp trong ./preschoolMath/ ứng với một phần dữ liệu của sách; ./preschoolMath/svg/*.js là chữ vẽ trong hình SVG,
 * ./preschoolMath/answers/*.js là đáp án bé gõ bằng tiếng Anh → chữ trong đáp án của sách.
 * Cách đọc số ("hai mươi lăm") không cần ghi: engine/i18n.js tự đổi.
 * Tệp nào cũng có thể xuất thêm `patterns` (mẫu regex); `fallback` của ./preschoolMath/engine.js
 * (dịch lời Thỏ ghép từ nhiều câu, có số đọc bằng chữ) luôn đứng cuối cùng.
 */

const mods = Object.values(import.meta.glob('./preschoolMath/*.js', { eager: true }));
const svg = import.meta.glob('./preschoolMath/svg/*.js', { eager: true, import: 'default' });
const answers = import.meta.glob('./preschoolMath/answers/*.js', { eager: true, import: 'default' });

export default {
  entries: Object.assign({}, ...mods.map(m => m.default)),
  patterns: [...mods.flatMap(m => m.patterns || []), ...mods.flatMap(m => m.fallback || [])],
  svg: Object.assign({}, ...Object.values(svg)),
  answers: Object.assign({}, ...Object.values(answers)),
};
