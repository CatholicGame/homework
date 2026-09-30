/**
 * 🎮 Trò chơi tăng cường Toán 2 — mở từ nút trong Vở BT Toán 2 (Tập Một, Tập Hai). Cờ GRADE2_GAMES (src/data/features.js).
 * Thiết kế: docs/lop_2/thiet-ke-tro-choi.md. Dùng lại hub, vòng chơi và khung của trò lớp 3 (grade3Games.js);
 * sao ghi vào nhóm lớp 2 (tiền tố 'g2games').
 */

import { renderGamesHub as renderHub } from './grade3Games.js';
import { FROG_GAME } from './grade2Games/frog.js';
import { BUS_GAME } from './grade2Games/bus.js';
import { VEG_GAME } from './grade2Games/veg.js';
import { WATER_GAME } from './grade2Games/water.js';
import { PARTY_GAME } from './grade2Games/party.js';
import { CLOCK_GAME } from './grade2Games/clock.js';
import { ANT_GAME } from './grade2Games/ant.js';
import { FACTORY_GAME } from './grade2Games/factory.js';
import { EGG_GAME } from './grade3Games/market/eggs.js';
import { levelMeta } from './grade2Games/catalog.js';

/**
 * Chỉ lấy cấp `id` của một quầy lớp 3, lấy tên cấp và bài học theo catalog lớp 2, ghi sao vào lớp 2.
 * over: thu hẹp cấp đó cho vừa kiến thức lớp 2 (vd. quầy trứng chỉ hộp 2 và 5 quả).
 */
const only = (game, id, over = {}) => ({
  ...game, starPrefix: 'g2games',
  levels: game.levels.filter(l => l.id === id).map(l => ({ ...l, ...levelMeta(id), ...over })), // tên cấp, bài học: theo catalog lớp 2
});

const GAMES = [
  {
    id: 'frog', icon: '🐸', title: 'Ếch nhảy tia số', single: true,
    desc: 'Chọn bước nhảy đưa chú ếch qua suối, tới đúng lá sen!',
    tags: ['Tia số', 'Cộng, trừ qua 10', 'Có nhớ'],
    stalls: [{ game: FROG_GAME }],
  },
  {
    id: 'bus', icon: '🚌', title: 'Xe buýt lên xuống', single: true,
    desc: 'Làm phụ xe: đếm khách lên xe, xuống xe cho bác tài!',
    tags: ['Thêm, bớt', 'Nhiều hơn, ít hơn', 'Có nhớ'],
    stalls: [{ game: BUS_GAME }],
  },
  {
    id: 'clock', icon: '⏰', title: 'Đồng hồ hẹn giờ & Tờ lịch', single: true,
    desc: 'Làm thư ký của cả nhà: kéo kim đặt đồng hồ báo thức, xem tờ lịch!',
    tags: ['Xem giờ', 'Giờ chiều, tối', 'Xem lịch'],
    stalls: [{ game: CLOCK_GAME }],
  },
  {
    id: 'ant', icon: '🐜', title: 'Chú kiến tìm đường', single: true,
    desc: 'Giúp Kiến Vàng tha mồi về tổ: căng chỉ, đặt thước đo cành cây, vẽ cầu!',
    tags: ['Thẳng hàng', 'Đường gấp khúc', 'Tứ giác'],
    stalls: [{ game: ANT_GAME }],
  },
  {
    id: 'party', icon: '🎂', title: 'Tiệc sinh nhật chia kẹo', single: true,
    desc: 'Chuẩn bị tiệc sinh nhật: xếp kẹo ra đĩa, phát quà, chia đều kẹo cho các bạn!',
    tags: ['Nhân 2, 5', 'Chia 2, 5', 'Thừa số, thương'],
    stalls: [{ game: PARTY_GAME }],
  },
  {
    id: 'factory', icon: '🏭', title: 'Xưởng đóng gói trăm – chục', single: true,
    desc: 'Đóng khối gỗ thành thanh chục, tấm trăm; xếp hàng theo đơn cho khách!',
    tags: ['Trăm, chục, đơn vị', 'Số có ba chữ số', 'Cộng, trừ 1 000'],
    stalls: [{ game: FACTORY_GAME }],
  },
  {
    id: 'market', icon: '🏪', title: 'Chợ phiên của bé',
    desc: 'Làm chủ quầy hàng: cân rau củ, đong nước, đóng trứng vào hộp!',
    tags: ['Ki-lô-gam', 'Lít', 'Nhân 2, 5'],
    purpose: 'Giúp em thực hành kiến thức về nặng hơn, nhẹ hơn, ki-lô-gam, lít, bảng nhân 2 và bảng nhân 5 đã học trong bài. Em cân rau củ bằng cân đĩa, đong nước bằng ca 1 lít và đóng trứng vào hộp cho khách.',
    stalls: [
      { game: VEG_GAME, tags: 'nặng, nhẹ · ki-lô-gam' },
      { game: WATER_GAME, tags: 'lít · ca 1 lít' },
      // Quầy trứng lớp 3 cấp 1 có cả hộp 10 quả (bảng nhân 10 không có ở lớp 2): lớp 2 chỉ hộp 2, 5 quả, tới 10 hộp.
      { game: only(EGG_GAME, 'egg-1', {
        sizes: [2, 5], boxes: [2, 10],
        knowledge: 'bảng nhân 2, bảng nhân 5',
        desc: 'Khách lấy mấy hộp trứng, mỗi hộp 2 hoặc 5 quả: đóng hộp rồi tính tất cả bao nhiêu quả.',
      }), tags: 'nhân 2, nhân 5' },
    ],
  },
];

export function renderGamesHub(app, ctx, start = null) {
  renderHub(app, ctx, start, { games: GAMES, kicker: '🎮 Toán 2', stallLessons: true });
}
