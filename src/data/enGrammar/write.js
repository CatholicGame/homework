/**
 * ✍️ Tự viết (bước 3 của mỗi bài Ngữ pháp tiếng Anh, src/games/enGrammar/write.js): bé tự gõ câu tiếng Anh.
 * Mỗi bài 4 dòng: 3 câu dịch Việt → Anh dùng đúng cấu trúc đang học, 1 câu tự đặt.
 *   '😊 Tớ vui. => I am happy. | I\'m happy.'                 dịch: hình, câu tiếng Việt, =>, câu mẫu (| cách viết khác)
 *   'free: 🏊 Viết một câu kể việc em *can* làm. => I can swim.'  tự đặt câu: yêu cầu, từ cần dùng trong *sao*, => câu ví dụ
 * Code so câu bé gõ với câu mẫu trước (norm: bỏ hoa thường, dấu câu, I'm = I am…); lệch thì cô DeepSeek chấm
 * (api/writing/review.js mode 'english', kind 'translate' | 'free'). Câu tự đặt luôn do cô chấm.
 * Dữ liệu: write1.js (g01–g28), write2.js (g29–g53), write3.js (g54–g64).
 */
import { WRITE_1 } from './write1.js';
import { WRITE_2 } from './write2.js';
import { WRITE_3 } from './write3.js';

const RAW = { ...WRITE_1, ...WRITE_2, ...WRITE_3 };

/** Một dòng → { kind: 'translate' | 'free', pic, vi, answers[], keys[] } (keys: chữ trong *sao* của câu tự đặt). */
export function parseW(src) {
  let s = src.trim(), kind = 'translate';
  if (/^free:/.test(s)) { kind = 'free'; s = s.slice(5).trim(); }
  const [left, right = ''] = s.split(/\s*=>\s*/);
  const m = left.match(/^(\S+)\s+(.*)$/);
  let pic = '', vi = left;
  if (m && !/[A-Za-zÀ-ỹĐđ*]/.test(m[1])) { pic = m[1]; vi = m[2]; }
  const answers = right.split(/\s*\|\s*/).filter(Boolean);
  const keys = [...vi.matchAll(/\*(.+?)\*/g)].map((x) => x[1]).filter((k) => /[A-Za-z]/.test(k) && !/[À-ỹĐđ]/.test(k));
  return { kind, pic, vi, answers, keys };
}

export const writeItems = (id) => (RAW[id] || []).map(parseW);
