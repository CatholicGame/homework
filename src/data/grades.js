/**
 * Danh sách lớp (Tiền tiểu học, lớp 1–5) và các sách/trò chơi của từng lớp.
 * Bé chọn lớp trong hồ sơ; trang chủ chỉ hiện card của lớp đó.
 */

import { MEMORY_ISLAND } from './features.js';

// Mã lớp của Tiền tiểu học. Không dùng 0: 0 / thiếu nghĩa là "chưa chọn lớp" (hồ sơ, bảng xếp hạng,
// firestore.rules). Mã này phải khớp với firestore.rules và BOOK_GRADE trong engine/stars.js.
export const PRESCHOOL = -1;

// 🗺️ Bản đồ kiến thức (games/knowledgeMap.js): cùng một thẻ cho lớp 1–5, trang tự lấy lớp trong hồ sơ.
const KNOWLEDGE_MAP = { id: 'knowledge-map', icon: '🗺️', color: '#16A34A', title: 'Bản đồ kiến thức', desc: 'Các kiến thức quan trọng của lớp: em đã vững, đang học hay chưa học, chạm để học tiếp' };

export const GRADES = [
  {
    num: PRESCHOOL, title: 'Tiền tiểu học', short: '🧸', sub: 'Tiền TH', icon: '🧸', color: '#EC4899',
    games: [
      { id: 'pre3-abc', icon: '🔤', color: '#0EA5E9', title: 'Làm quen chữ cái', desc: 'Tô chữ cái, chữ ghép, dấu thanh; học âm, học vần Bài 1–105' },
      { id: 'pre1-math', icon: '🐰', color: '#EC4899', title: 'Bé Học Vui Toán — Tập 1', desc: 'Đếm và viết số 1–20' },
      { id: 'pre2-math', icon: '🐊', color: '#7C3AED', title: 'Bé Học Vui Toán — Tập 2', desc: 'So sánh: bằng nhau, nhiều hơn – ít hơn, dấu > < =' },
      { id: 'pre4-math', icon: '🧮', color: '#F59E0B', title: 'Bé Tập Làm Toán', desc: '99 đề toán chuẩn bị vào lớp 1: cộng trừ, số đến 100, hình, quy luật, giờ, tiền' },
      { id: 'pre5-photo', group: 'challenge', icon: '📷', color: '#0EA5E9', title: 'Bé Chụp Ảnh Chim', desc: 'Chụp ảnh đàn chim rồi chạm đếm: đến 5, 10, 20' },
    ],
  },
  {
    num: 1, title: 'Lớp 1', icon: '1️⃣', color: '#FF6B9D',
    games: [
      KNOWLEDGE_MAP,
      { id: 'grade1-workbook', icon: '📒', color: '#FF6B9D', title: 'Vở Bài Tập Toán 1 — Tập Một', desc: 'Bài 1–34' },
      { id: 'grade1-workbook-2', icon: '📗', color: '#22C55E', title: 'Vở Bài Tập Toán 1 — Tập Hai', desc: 'Bài 21–41' },
      { id: 'grade1-tests', icon: '✏️', color: '#8B5CF6', title: 'Luyện Đề', desc: 'Kiểm tra theo lộ trình: học xong mỗi chặng làm một bài 10 câu, cô chỉ Bài cần ôn lại' },
      { id: 'grade1-photo', group: 'challenge', icon: '📷', color: '#0EA5E9', title: 'Bé Chụp Ảnh Chim', desc: 'Chụp ảnh đàn chim rồi chạm đếm: đến 20, đếm theo chục đến 100' },
      { id: 'grade1-shark', group: 'challenge', icon: '🦈', color: '#0284C7', title: 'Săn cá mập', desc: 'Cá mập mang phép tính bơi tới: gõ đúng kết quả để bắn trúng. Cộng, trừ trong phạm vi 10, 20, 100' },
      { id: 'grade1-ufo', group: 'challenge', icon: '🛸', color: '#7C3AED', title: 'Bảo vệ Trái Đất', desc: 'Con Zíp trốn trong phép tính: chọn viên đạn mang đúng số bị giấu. Phạm vi 10, 20, số tròn chục' },
    ],
  },
  {
    num: 2, title: 'Lớp 2', icon: '2️⃣', color: '#60A5FA',
    games: [
      KNOWLEDGE_MAP,
      { id: 'grade2-workbook', icon: '📒', color: '#0EA5E9', title: 'Vở Bài Tập Toán 2 — Tập Một', desc: 'Bài 1–36' },
      { id: 'grade2-workbook-2', icon: '📙', color: '#F59E0B', title: 'Vở Bài Tập Toán 2 — Tập Hai', desc: 'Bài 37–75' },
      { id: 'grade2-tests', icon: '✏️', color: '#8B5CF6', title: 'Luyện Đề', desc: 'Kiểm tra theo lộ trình: cứ vài Bài trong vở làm một bài kiểm tra, cô chỉ Bài cần ôn lại' },
      { id: 'grade2-drills', icon: '🧮', color: '#0D9488', title: 'Luyện Tính', desc: 'Làm tròn 10, bảng cộng trừ, đặt tính, bảng nhân chia 2 và 5, tính nhẩm, bài toán có lời văn' },
      { id: 'grade2-shark', group: 'challenge', icon: '🦈', color: '#0284C7', title: 'Săn cá mập', desc: 'Cá mập mang phép tính bơi tới: gõ đúng kết quả để bắn trúng. Cộng, trừ qua 10, có nhớ; bảng nhân, chia 2 và 5' },
      { id: 'grade2-ufo', group: 'challenge', icon: '🛸', color: '#7C3AED', title: 'Bảo vệ Trái Đất', desc: 'Đĩa bay mang ổ khoá có số còn thiếu: chọn đúng viên đạn để phá khiên. Cộng, trừ qua 10, có nhớ; nhân, chia 2 và 5' },
      { id: 'writing', icon: '✍️', color: '#DB2777', title: 'Luyện Viết Văn', desc: 'Viết vài câu theo đề, cô giáo chấm điểm, chỉ lỗi chính tả, gợi ý từ ngữ hay để em sửa bài' },
    ],
  },
  {
    num: 3, title: 'Lớp 3', icon: '3️⃣', color: '#34D399',
    games: [
      KNOWLEDGE_MAP,
      ...(MEMORY_ISLAND ? [{ id: 'memory-island', group: 'challenge', icon: '🏝️', color: '#0EA5E9', title: 'Đảo Trí Nhớ', desc: 'Ôn bảng nhân chia, đổi đơn vị, số La Mã bằng trò chơi lật thẻ' }] : []),
      { id: 'grade3-workbook', icon: '📗', color: '#10B981', title: 'Vở Bài Tập Toán 3 — Tập Một', desc: 'Bài 1–44' },
      { id: 'grade3-workbook-2', icon: '📕', color: '#EF4444', title: 'Vở Bài Tập Toán 3 — Tập Hai', desc: 'Bài 45–81' },
      { id: 'grade3-practice', icon: '📘', color: '#3B82F6', title: 'Luyện Tập Toán 3', desc: 'Tập Một — Luyện tập theo tuần' },
      { id: 'grade3-worksheet', icon: '✏️', color: '#8B5CF6', title: 'Luyện Đề', desc: 'Phiếu bài tập theo bài học, 65 đề ôn tập giữa học kì I, 8 đề ôn tổng hợp' },
      { id: 'grade3-drills', icon: '🧮', color: '#0D9488', title: 'Luyện Tính', desc: 'Đặt tính cộng trừ nhân chia, bảng nhân chia, tìm thành phần, tính nhẩm, sơ đồ đoạn thẳng' },
      { id: 'grade3-shark', group: 'challenge', icon: '🦈', color: '#0284C7', title: 'Săn cá mập', desc: 'Cá mập mang phép tính bơi tới: gõ đúng kết quả để bắn trúng. Bảng nhân, bảng chia 2 đến 9, cộng trừ có nhớ' },
      { id: 'grade3-ufo', group: 'challenge', icon: '🛸', color: '#7C3AED', title: 'Bảo vệ Trái Đất', desc: 'Đĩa bay mang ổ khoá "tìm x": bắn đạn mang đúng giá trị của x, số thay vào là thấy đúng sai. Cộng trừ, nhân chia, số lớn' },
      { id: 'writing', icon: '✍️', color: '#DB2777', title: 'Luyện Viết Văn', desc: 'Viết đoạn văn theo đề, cô giáo chấm điểm, chỉ lỗi chính tả, gợi ý từ ngữ hay để em sửa bài' },
    ],
  },
  {
    num: 4, title: 'Lớp 4', icon: '4️⃣', color: '#C084FC',
    games: [
      KNOWLEDGE_MAP,
      { id: 'grade4-textbook', icon: '📖', color: '#6366F1', title: 'Sách Toán 4', desc: 'Sách giáo khoa Toán 4, bài 1–175: làm bài tập ngay trong sách, phép tính lớn có nút ✍️ Tính để đặt tính' },
      { id: 'grade4-tools', icon: '🧰', color: '#8B5CF6', title: 'Toán 4: Học bằng công cụ', desc: 'Tập Một, Bài 1–37: bảng hàng, tia số, thước đo góc, ê ke… em tự tay khám phá rồi thực hành' },
      { id: 'grade4-drills', icon: '🧮', color: '#0D9488', title: 'Luyện Tính', desc: 'Nhân, chia đặt tính với số có một, hai, ba chữ số: tích riêng, ước lượng thương' },
      { id: 'grade4-shark', group: 'challenge', icon: '🦈', color: '#0284C7', title: 'Săn cá mập', desc: 'Cá mập mang phép tính bơi tới: gõ đúng kết quả để bắn trúng. Tính nhẩm số tới ba chữ số, nhân chia với 10, 100' },
      { id: 'grade4-ufo', group: 'challenge', icon: '🛸', color: '#7C3AED', title: 'Bảo vệ Trái Đất', desc: 'Đĩa bay mang biểu thức chứa chữ: theo mật mã a, b tính giá trị rồi bắn; tìm x với số lớn' },
      { id: 'writing', icon: '✍️', color: '#DB2777', title: 'Luyện Viết Văn', desc: 'Viết đoạn văn theo đề, cô giáo chấm điểm, chỉ lỗi chính tả, gợi ý từ ngữ hay để em sửa bài' },
    ],
  },
  {
    num: 5, title: 'Lớp 5', icon: '5️⃣', color: '#FBBF24',
    games: [
      KNOWLEDGE_MAP,
      { id: 'grade5-tools', icon: '🧰', color: '#F59E0B', title: 'Toán 5: Học bằng công cụ', desc: 'Tập Một, Bài 1–35: băng phân số, số thập phân, bảng đơn vị đo, cắt ghép hình… em tự tay khám phá rồi thực hành' },
      { id: 'grade5-drills', icon: '🧮', color: '#0D9488', title: 'Luyện Tính', desc: 'Cộng, trừ, nhân, chia số thập phân đặt tính; nhân chia nhẩm với 10, 100, 0,1; phân số' },
      { id: 'grade5-shark', group: 'challenge', icon: '🦈', color: '#0284C7', title: 'Săn cá mập', desc: 'Cá mập mang phép tính bơi tới: gõ đúng kết quả để bắn trúng. Bảng nhân chia, nhân chia số tròn chục, tròn trăm' },
      { id: 'grade5-ufo', group: 'challenge', icon: '🛸', color: '#7C3AED', title: 'Bảo vệ Trái Đất', desc: 'Đĩa bay mang ổ khoá tìm x với số thập phân, nhân chia với 10, 100; công thức chu vi, diện tích' },
      { id: 'writing', icon: '✍️', color: '#DB2777', title: 'Luyện Viết Văn', desc: 'Viết đoạn văn theo đề, cô giáo chấm điểm, chỉ lỗi chính tả, gợi ý từ ngữ hay để em sửa bài' },
    ],
  },
];

export function getGrade(num) {
  return GRADES.find(g => g.num === num) || null;
}

/** Tên lớp để hiển thị: "Lớp 3", "Tiền tiểu học"; `fallback` khi chưa chọn lớp. */
export function gradeTitle(num, fallback = '') {
  return getGrade(num)?.title || (num ? `Lớp ${num}` : fallback);
}
