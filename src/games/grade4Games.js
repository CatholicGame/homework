/**
 * 🎮 Trò chơi tăng cường Toán 4: mở từ thẻ 🧰 Toán 4 công cụ (grade4Tools.js). Cờ GRADE4_GAMES (src/data/features.js).
 * Thiết kế: docs/lop_4/thiet-ke-tro-choi.md. Dùng lại hub, vòng chơi và khung của trò lớp 3 (grade3Games.js);
 * sao ghi vào nhóm lớp 4 (tiền tố 'g4games').
 *
 * ctx = { book: 'tools', units, unitName, storageKey, openUnit(unitId), onBack }
 * start = { stall, level, unit } (catalog.js): mở thẳng màn giới thiệu một cấp.
 */

import { renderGamesHub } from './grade3Games.js';
import { RAIL_GAME } from './grade4Games/rail.js';
import { CITY_GAME } from './grade4Games/city.js';
import { WEIGH_GAME } from './grade4Games/weigh.js';

const GAMES = [
  {
    id: 'rail', icon: '🛤️', title: 'Kỹ sư đường sắt', single: true,
    desc: 'Làm kỹ sư: kiểm tra đường ngang, vẽ đường vuông góc, chọn ray song song, làm đường tránh tàu!',
    tags: ['Vuông góc', 'Song song', 'Ê ke'],
    stalls: [{ game: RAIL_GAME }],
  },
  {
    id: 'city', icon: '🏙️', title: 'Bản đồ dân số', single: true,
    desc: 'Làm phóng viên bản tin: đọc, viết, xếp hạng và làm tròn số dân các tỉnh, thành trên bản đồ Việt Nam!',
    tags: ['Lớp triệu', 'So sánh số', 'Làm tròn'],
    stalls: [{ game: CITY_GAME }],
  },
  {
    id: 'weigh', icon: '🚚', title: 'Trạm cân nông sản', single: true,
    desc: 'Trực trạm cân mùa thu hoạch: đọc cân, chất hàng theo đơn, cho xe qua cầu và ghi sổ trạm cân!',
    tags: ['Yến, tạ, tấn', 'Đổi đơn vị', 'Cộng, trừ'],
    stalls: [{ game: WEIGH_GAME }],
  },
];

export function renderGames(app, ctx, start = null) {
  renderGamesHub(app, ctx, start, {
    games: GAMES, kicker: '🎮 Toán 4', unitFocus: null, skipList: false,
    lead: 'Mỗi lần chơi là một bản vẽ mới!',
  });
}
