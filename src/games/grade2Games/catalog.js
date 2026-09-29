/**
 * Danh mục nhẹ của trò chơi tăng cường Toán 2 (thiết kế: docs/lop_2/thiet-ke-tro-choi.md) — cùng khuôn với
 * src/games/grade3Games/catalog.js. Hai thẻ Vở BT Toán 2 (Tập Một, Tập Hai) dùng chung sách 'g2': mã bài bai-1 … bai-75
 * không trùng nhau, bài nào không có trong thẻ đang mở thì chỉ không hiện nút "Ôn lại".
 *
 * lessons.g2 = bài học chính của cấp; also.g2 = bài luyện tập chung có câu luyện đúng kỹ năng đó (chỉ để gợi ý).
 * Quầy trứng là cấp 1 của trò lớp 3, thu hẹp còn hộp 2, 5 quả (grade2Games.js), chơi lại trong sách lớp 2 ở Bài 39, 40.
 * Không dùng quầy trái cây lớp 3: tính tiền 20, 50 nghìn đồng × số kg là nhân số tròn chục, tiền hàng trăm nghìn (lớp 3).
 * Bài 15 dùng quầy rau củ của lớp 2 (so nặng nhẹ, không số).
 */

export const STALLS = [
  {
    id: 'frog', title: 'Ếch nhảy tia số', icon: '🐸',
    purpose: 'Giúp em thực hành kiến thức về tia số, số liền trước, số liền sau, phép cộng, phép trừ qua 10 và có nhớ đã học trong bài. Em chọn bước nhảy để đưa chú ếch tới đúng lá sen.',
    levels: [
      { id: 'frog-1', n: 1, title: 'Liền trước, liền sau', lessons: { g2: ['bai-2'] }, also: { g2: ['bai-6'] } },
      { id: 'frog-2', n: 2, title: 'Cộng qua 10', lessons: { g2: ['bai-7', 'bai-8'] }, also: { g2: ['bai-10'] } },
      { id: 'frog-3', n: 3, title: 'Trừ qua 10', lessons: { g2: ['bai-11', 'bai-12'] }, also: { g2: ['bai-14'] } },
      { id: 'frog-4', n: 4, title: 'Nhảy mấy bước?', lessons: { g2: ['bai-3'] } },
      { id: 'frog-5', n: 5, title: 'Nhảy xa có nhớ', lessons: { g2: ['bai-19', 'bai-20', 'bai-22', 'bai-23'] }, also: { g2: ['bai-21', 'bai-24'] } },
    ],
  },
  {
    id: 'bus', title: 'Xe buýt lên xuống', icon: '🚌',
    purpose: 'Giúp em thực hành kiến thức về bài toán thêm, bớt, nhiều hơn, ít hơn, hơn kém nhau bao nhiêu và phép cộng, phép trừ có nhớ đã học trong bài. Em làm phụ xe, đếm khách lên xuống cho bác tài.',
    levels: [
      { id: 'bus-1', n: 1, title: 'Lên xe, xuống xe', lessons: { g2: ['bai-9'] }, also: { g2: ['bai-10'] } },
      { id: 'bus-2', n: 2, title: 'Nhiều hơn, ít hơn', lessons: { g2: ['bai-13'] }, also: { g2: ['bai-14'] } },
      { id: 'bus-3', n: 3, title: 'Hơn kém mấy người?', lessons: { g2: ['bai-4'] }, also: { g2: ['bai-6'] } },
      { id: 'bus-4', n: 4, title: 'Mấy người lên, xuống?', lessons: { g2: ['bai-3'] } },
      { id: 'bus-5', n: 5, title: 'Tàu hỏa có nhớ', lessons: { g2: ['bai-19', 'bai-20', 'bai-22', 'bai-23'] }, also: { g2: ['bai-21', 'bai-24'] } },
    ],
  },
  {
    id: 'veg', title: 'Quầy rau củ', icon: '🥕',
    levels: [
      { id: 'veg-1', n: 1, title: 'Nặng hơn, nhẹ hơn', lessons: { g2: ['bai-15'] }, also: { g2: ['bai-17'] } },
      { id: 'veg-2', n: 2, title: 'So với 1 ki-lô-gam', lessons: { g2: ['bai-15'] } },
      { id: 'veg-3', n: 3, title: 'Cân mấy ki-lô-gam?', lessons: { g2: ['bai-15', 'bai-17'] } },
      { id: 'veg-4', n: 4, title: 'Cộng, trừ ki-lô-gam', lessons: { g2: ['bai-15', 'bai-17'] }, also: { g2: ['bai-18'] } },
    ],
  },
  {
    id: 'water', title: 'Quầy nước', icon: '💧',
    purpose: 'Giúp em thực hành kiến thức về lít, nhiều hơn, ít hơn 1 lít và cộng, trừ số lít đã học trong bài. Em dùng ca 1 lít đong nước, so với vạch 1 lít và đổ nước kiểm tra phép tính.',
    levels: [
      { id: 'water-1', n: 1, title: 'Đong bằng ca 1 lít', lessons: { g2: ['bai-16'] }, also: { g2: ['bai-17'] } },
      { id: 'water-2', n: 2, title: 'Nhiều hơn, ít hơn 1 lít', lessons: { g2: ['bai-16'] } },
      { id: 'water-3', n: 3, title: 'Cộng, trừ số lít', lessons: { g2: ['bai-16'] }, also: { g2: ['bai-18'] } },
    ],
  },
  {
    id: 'party', title: 'Tiệc sinh nhật chia kẹo', icon: '🎂',
    purpose: 'Giúp em thực hành kiến thức về phép nhân, bảng nhân 2, bảng nhân 5, phép chia, bảng chia 2, bảng chia 5 và tên các thành phần của phép nhân, phép chia đã học trong bài. Em chuẩn bị tiệc sinh nhật: xếp kẹo ra đĩa, phát quà, chia đều kẹo cho các bạn.',
    levels: [
      { id: 'party-1', n: 1, title: 'Phép nhân', lessons: { g2: ['bai-37'] }, also: { g2: ['bai-45'] } },
      { id: 'party-2', n: 2, title: 'Bảng nhân 2, bảng nhân 5', lessons: { g2: ['bai-39', 'bai-40'] }, also: { g2: ['bai-45'] } },
      { id: 'party-3', n: 3, title: 'Chia đều', lessons: { g2: ['bai-41', 'bai-43', 'bai-44'] }, also: { g2: ['bai-45'] } },
      { id: 'party-4', n: 4, title: 'Chia vào túi, chia đều', lessons: { g2: ['bai-41', 'bai-43', 'bai-44'] }, also: { g2: ['bai-45'] } },
      { id: 'party-5', n: 5, title: 'Thừa số, tích, thương', lessons: { g2: ['bai-38', 'bai-42'] }, also: { g2: ['bai-45'] } },
    ],
  },
  {
    id: 'egg', title: 'Quầy trứng', icon: '🥚',
    levels: [{ id: 'egg-1', n: 1, title: 'Hộp 2 quả, hộp 5 quả', lessons: { g2: ['bai-39', 'bai-40'] }, also: { g2: ['bai-37', 'bai-38', 'bai-45'] } }],
  },
];

const STALL_BY_ID = Object.fromEntries(STALLS.map(s => [s.id, s]));
const LEVEL_BY_ID = Object.fromEntries(STALLS.flatMap(s => s.levels.map(l => [l.id, l])));

export function stallMeta(id) {
  const { levels, ...meta } = STALL_BY_ID[id];
  return meta;
}

export function levelMeta(id) {
  return { ...LEVEL_BY_ID[id] };
}

/** Các cấp luyện bài `unitId` ('g2'): [{ stall, level }]. */
export function levelsForUnit(book, unitId) {
  const has = (l) => l.lessons[book]?.includes(unitId) || l.also?.[book]?.includes(unitId);
  return STALLS.flatMap(stall => stall.levels.filter(has).map(level => ({ stall, level })));
}
