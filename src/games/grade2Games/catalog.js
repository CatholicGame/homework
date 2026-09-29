/**
 * Danh mục nhẹ của trò chơi tăng cường Toán 2 (thiết kế: docs/lop_2/thiet-ke-tro-choi.md) — cùng khuôn với
 * src/games/grade3Games/catalog.js. Hai thẻ Vở BT Toán 2 (Tập Một, Tập Hai) dùng chung sách 'g2': mã bài bai-1 … bai-75
 * không trùng nhau, bài nào không có trong thẻ đang mở thì chỉ không hiện nút "Ôn lại".
 *
 * lessons.g2 = bài học chính của cấp; also.g2 = bài luyện tập chung có câu luyện đúng kỹ năng đó (chỉ để gợi ý).
 * Quầy trái cây / quầy trứng là cấp 1 của trò lớp 3 (ghi "kiến thức lớp 2"), chơi lại trong sách lớp 2.
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
    id: 'fruit', title: 'Quầy trái cây', icon: '🍎',
    levels: [{ id: 'fruit-1', n: 1, title: 'Cân ki-lô-gam', lessons: { g2: ['bai-15', 'bai-39', 'bai-40'] } }],
  },
  {
    id: 'egg', title: 'Quầy trứng', icon: '🥚',
    levels: [{ id: 'egg-1', n: 1, title: 'Hộp 2, 5, 10 quả', lessons: { g2: ['bai-39', 'bai-40'] } }],
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
