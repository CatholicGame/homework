/**
 * 🛸 Bảo vệ Trái Đất: thẻ riêng ở trang chủ mỗi lớp (lớp 2–5 trò cũng nằm trong Luyện Tính, chung khoá sao).
 * Trò và các cấp: grade3Drills/ufo.js. Mở thẳng danh sách cấp của trò.
 */

import { renderGamesHub } from './grade3Games.js';
import { UFO1_GAME, UFO2_GAME, UFO_GAME, UFO4_GAME, UFO5_GAME } from './grade3Drills/ufo.js';

const BY_GRADE = {
  1: { game: UFO1_GAME, book: 'g1', tags: ['Số còn thiếu', 'Phạm vi 10, 20'] },
  2: { game: UFO2_GAME, book: 'g2', tags: ['Số còn thiếu', 'Nhân, chia 2, 5'] },
  3: { game: UFO_GAME, book: 'workbook', tags: ['Tìm x', 'Thử lại'] },
  4: { game: UFO4_GAME, book: 'sgk4', tags: ['Biểu thức chứa chữ', 'Tìm x'] },
  5: { game: UFO5_GAME, book: 'sgk5', tags: ['Số thập phân', 'Công thức'] },
};

export function ufoRender(grade) {
  const { game, book, tags } = BY_GRADE[grade];
  const list = [{ id: 'ufo', icon: game.icon, title: game.title, desc: 'Chọn viên đạn mang đúng số bị giấu để phá khiên đĩa bay!', tags, single: true, stalls: [{ game }] }];
  return (app, onBack) => renderGamesHub(app, {
    book, units: [], unitName: (u) => `Bài ${u.number}`, storageKey: `g${grade}-ufo-none`,
    openUnit() {}, onBack,
  }, null, {
    games: list, kicker: `🛸 Toán ${grade}`, title: 'Bảo vệ Trái Đất', icon: '🛸', unitFocus: null,
    lead: 'Đĩa bay mang ổ khoá có số bị giấu. Bắn đúng số đó để bảo vệ thành phố!',
    levelLead: 'Chọn cấp. Cấp nào cũng chơi được!',
  });
}
