/**
 * 🧮 Luyện Tính (lớp 3): công cụ luyện các phép tính trẻ cần nắm vững, làm theo đúng cách học ở lớp.
 * Mỗi công cụ là một "trò" của hub và vòng chơi chung của trò chơi tăng cường (grade3Games.js, grade3Games/loop.js):
 * chọn cấp → màn giới thiệu → một lượt nhiều phép (số mới mỗi lượt) → tổng kết, sao (khoá 'drill:<cấp>'), kỷ lục.
 * Khung chung (lớp học, thầy giáo, tờ vở ô li, bàn phím số): grade3Drills/kit.js.
 */

import { renderGamesHub } from './grade3Games.js';
import { DIVISION_GAME } from './grade3Drills/division.js';
import { COLUMN_GAME } from './grade3Drills/column.js';
import { TABLES_GAME, MENTAL_GAME } from './grade3Drills/facts.js';
import { FINDX_GAME } from './grade3Drills/findx.js';
import { SEGMENT_GAME } from './grade3Drills/segment.js';
import { TIME_GAME, CAL_GAME } from './grade3Drills/time.js';
import { SHARK_GAME } from './grade3Drills/shark.js';

const tool = (id, game, desc, tags) => ({ id, icon: game.icon, title: game.title, desc, tags, single: true, stalls: [{ game }] });

export const DRILL_LIST = [
  tool('div', DIVISION_GAME, 'Chia, nhân, trừ, hạ: chia đặt tính từng bước như trong vở.', ['Chia có dư', 'Thương có chữ số 0']),
  tool('col', COLUMN_GAME, 'Viết thẳng cột, tính từ hàng đơn vị, nhớ đúng số nhớ.', ['Cộng có nhớ', 'Trừ có nhớ', 'Nhân']),
  tool('tab', TABLES_GAME, 'Luyện cho thuộc. Phép nào hay sai sẽ được ra lại nhiều hơn.', ['Bảng nhân', 'Bảng chia', 'Số còn thiếu']),
  tool('x', FINDX_GAME, 'Gọi tên số cần tìm, chọn phép tính, tính rồi thử lại.', ['Số hạng', 'Thừa số', 'Số chia']),
  tool('shark', SHARK_GAME, 'Cá mập mang phép tính bơi tới: gõ đúng kết quả để bắn trúng, tính chậm là bị đớp!', ['Bảng nhân', 'Bảng chia', 'Tính nhanh']),
  tool('men', MENTAL_GAME, '3 nghìn + 5 nghìn = 8 nghìn: nhẩm nhanh với số tròn.', ['Tròn chục, trăm', 'Tròn nghìn']),
  tool('seg', SEGMENT_GAME, 'Gấp lên, giảm đi, gấp mấy lần, một phần mấy bằng sơ đồ.', ['Gấp, giảm', 'Gấp mấy lần', 'Một phần mấy']),
  tool('time', TIME_GAME, 'Xem giờ đến từng phút, tính giờ xong, giờ bắt đầu, kéo dài bao lâu.', ['Xem giờ', 'Chỉnh kim', 'Đổi giờ', 'Tính giờ']),
  tool('cal', CAL_GAME, 'Tháng có mấy ngày, ngày ... là thứ mấy, kéo dài mấy ngày.', ['Xem lịch', 'Thứ trong tuần', 'Đếm ngày']),
];

export function render(app, onBack) {
  renderGamesHub(app, {
    // Cấp ghi "Bài 23…" theo Vở bài tập Toán 3 (số bài liên tục qua Tập Một, Tập Hai); không mở bài từ đây.
    book: 'workbook', units: [], unitName: (u) => `Bài ${u.number}`, storageKey: 'gw-progress-v1',
    openUnit() {}, onBack,
  }, null, {
    games: DRILL_LIST, kicker: '🧮 Toán 3', title: 'Luyện Tính', icon: '🧮', unitFocus: null,
    lead: 'Luyện phép tính theo cách học ở lớp. Mỗi lượt là số mới!',
    levelLead: 'Chọn cấp. Cấp nào cũng làm được!',
  });
}
