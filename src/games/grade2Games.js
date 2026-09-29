/**
 * 🎮 Trò chơi tăng cường Toán 2 — mở từ nút trong Vở BT Toán 2 (Tập Một, Tập Hai). Cờ GRADE2_GAMES (src/data/features.js).
 * Thiết kế: docs/lop_2/thiet-ke-tro-choi.md. Dùng lại hub, vòng chơi và khung của trò lớp 3 (grade3Games.js);
 * sao ghi vào nhóm lớp 2 (tiền tố 'g2games').
 */

import { renderGamesHub as renderHub } from './grade3Games.js';
import { FROG_GAME } from './grade2Games/frog.js';
import { FRUIT_GAME } from './grade3Games/market/fruit.js';
import { EGG_GAME } from './grade3Games/market/eggs.js';
import { levelMeta } from './grade2Games/catalog.js';

/** Chỉ lấy cấp `id` của một quầy lớp 3, gắn bài học của sách lớp 2 và ghi sao vào lớp 2. */
const only = (game, id) => ({
  ...game, starPrefix: 'g2games',
  levels: game.levels.filter(l => l.id === id).map(l => ({ ...l, lessons: levelMeta(id).lessons })),
});

const GAMES = [
  {
    id: 'frog', icon: '🐸', title: 'Ếch nhảy tia số', single: true,
    desc: 'Chọn bước nhảy đưa chú ếch qua suối, tới đúng lá sen!',
    tags: ['Tia số', 'Cộng, trừ qua 10', 'Có nhớ'],
    stalls: [{ game: FROG_GAME }],
  },
  {
    id: 'market', icon: '🏪', title: 'Chợ phiên của bé',
    desc: 'Làm chủ quầy hàng: cân ki-lô-gam, đóng trứng vào hộp!',
    tags: ['Ki-lô-gam', 'Nhân 2, 5'],
    purpose: 'Giúp em thực hành kiến thức về ki-lô-gam, bảng nhân 2 và bảng nhân 5 đã học trong bài. Em cân hàng bằng cân đĩa và đóng trứng vào hộp cho khách.',
    stalls: [
      { game: only(FRUIT_GAME, 'fruit-1'), tags: 'kg · tính tiền' },
      { game: only(EGG_GAME, 'egg-1'), tags: 'nhân 2, nhân 5' },
    ],
  },
];

export function renderGamesHub(app, ctx, start = null) {
  renderHub(app, ctx, start, { games: GAMES, kicker: '🎮 Toán 2' });
}
