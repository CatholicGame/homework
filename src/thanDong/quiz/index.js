/**
 * Bộ câu hỏi "Ai tài năng nhất?" cho trình duyệt (quizDev: chơi một mình khi chưa có máy chủ phòng): 15 câu của lớp đang mở,
 * sinh từ bank/ (cùng bộ với máy chủ phòng realtime/questions.js). Lớp đặt bằng setQuizGrade khi mở trường quay.
 */
import { ask } from './pick.js';
import { gameFor } from './bank/index.js';

export { ask };
export const LEVELS = 15;
let grade = 3;
export const setQuizGrade = (g) => { grade = [1, 2, 3, 4, 5].includes(+g) ? +g : 3; };
export const quizGrade = () => grade;

export async function pickGame({ seen = new Set(), rand = Math.random } = {}) {
  return gameFor(grade, { seen, rand });
}
