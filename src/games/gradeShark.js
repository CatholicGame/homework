/**
 * 🦈 Săn cá mập: thẻ riêng ở trang chủ mỗi lớp (lớp 1 chưa có Luyện Tính; lớp 2–5 trò cũng nằm trong Luyện Tính,
 * chung khoá sao). Trò và các cấp: grade3Drills/shark.js. Mở thẳng danh sách cấp của trò.
 */

import { renderGamesHub } from './grade3Games.js';
import { SHARK1_GAME, SHARK2_GAME, SHARK_GAME, SHARK4_GAME, SHARK5_GAME } from './grade3Drills/shark.js';

const BY_GRADE = {
  1: { game: SHARK1_GAME, book: 'g1', tags: ['Cộng, trừ', 'Tính nhanh'] },
  2: { game: SHARK2_GAME, book: 'g2', tags: ['Cộng, trừ qua 10', 'Nhân, chia 2, 5'] },
  3: { game: SHARK_GAME, book: 'workbook', tags: ['Bảng nhân', 'Bảng chia'] },
  4: { game: SHARK4_GAME, book: 'sgk4', tags: ['Tính nhẩm', 'Nhân, chia với 10, 100'] },
  5: { game: SHARK5_GAME, book: 'sgk5', tags: ['Bảng nhân chia', 'Số tròn chục, tròn trăm'] },
};

export function sharkRender(grade) {
  const { game, book, tags } = BY_GRADE[grade];
  const list = [{ id: 'shark', icon: game.icon, title: game.title, desc: 'Gõ đúng kết quả để bắn trúng cá mập!', tags, single: true, stalls: [{ game }] }];
  return (app, onBack) => renderGamesHub(app, {
    book, units: [], unitName: (u) => `Bài ${u.number}`, storageKey: `g${grade}-shark-none`,
    openUnit() {}, onBack,
  }, null, {
    games: list, kicker: `🦈 Toán ${grade}`, title: 'Săn cá mập', icon: '🦈', unitFocus: null,
    lead: 'Cá mập mang phép tính bơi tới. Gõ đúng kết quả để bắn trúng!',
    levelLead: 'Chọn cấp. Cấp nào cũng chơi được!',
  });
}
