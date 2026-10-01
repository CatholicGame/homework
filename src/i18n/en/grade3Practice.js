/**
 * Luyện Tập Toán 3 (Tuần 1–18): nội dung Việt → Anh (engine/i18n.js).
 * Mỗi tệp trong ./grade3Practice/ ứng với một phần dữ liệu của sách; ./grade3Practice/svg/*.js là chữ vẽ trong hình SVG,
 * ./grade3Practice/answers/*.js là đáp án bé gõ bằng tiếng Anh → chữ trong đáp án của sách.
 * Cách đọc số ("hai mươi lăm") không cần ghi: engine/i18n.js tự đổi.
 */

const parts = import.meta.glob('./grade3Practice/*.js', { eager: true, import: 'default' });
const svg = import.meta.glob('./grade3Practice/svg/*.js', { eager: true, import: 'default' });
const answers = import.meta.glob('./grade3Practice/answers/*.js', { eager: true, import: 'default' });

export default {
  entries: Object.assign({}, ...Object.values(parts)),
  svg: Object.assign({}, ...Object.values(svg)),
  answers: Object.assign({}, ...Object.values(answers)),
};
