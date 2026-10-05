/**
 * Bài 1 (Ôn tập số tự nhiên), Bài 2 (Ôn tập các phép tính với số tự nhiên), Bài 8 (Ôn tập hình học và đo lường):
 * kiến thức lớp 4, dùng lại công cụ và dạng câu của Toán 4 (grade4Tools/lessons).
 *   Bài 1: 🧱 bảng hàng 9 cột (lớp triệu), làm tròn, so sánh.
 *   Bài 2: ✍️ đặt tính cộng, trừ số nhiều chữ số, tính nhẩm.
 *   Bài 8: ⚖️ yến tạ tấn, 📐 góc, ⏱️ giây và thế kỉ (chỉ Thực hành).
 */

import { NUMBER_LESSONS } from '../../grade4Tools/lessons/numbers.js';
import { CALC_LESSONS as CALC4 } from '../../grade4Tools/lessons/calc.js';
import { MASS_LESSONS } from '../../grade4Tools/lessons/mass.js';
import { ANGLE_LESSONS } from '../../grade4Tools/lessons/angles.js';
import { TIME_LESSONS } from '../../grade4Tools/lessons/time.js';

const B1 = {
  explore: NUMBER_LESSONS[12].explore,
  tasks: () => [...NUMBER_LESSONS[12].tasks(), ...NUMBER_LESSONS[13].tasks(), ...NUMBER_LESSONS[14].tasks()],
};
const B2 = {
  explore: CALC4[22].explore,
  tasks: () => [...CALC4[22].tasks(), ...CALC4[23].tasks()],
};
const B8 = {
  tasks: () => [...MASS_LESSONS[17].tasks(), ...ANGLE_LESSONS[8].tasks(), ...TIME_LESSONS[19].tasks()],
};

export const REVIEW_LESSONS = { 1: B1, 2: B2, 8: B8 };
