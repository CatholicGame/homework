/**
 * Danh mục nhẹ của trò chơi tăng cường Toán 4 (thiết kế: docs/lop_4/thiet-ke-tro-choi.md): tên, biểu tượng, các cấp
 * và bài học liên quan. Tách khỏi code trò chơi để thẻ 🧰 Toán 4 công cụ (grade4Tools.js) gợi ý đúng trò cho bài đang
 * mở mà không phải tải cả trò chơi. Các trò lấy lại thông tin ở đây bằng stallMeta() / levelMeta().
 *
 * lessons = { tools: ['bai-27'] }: bài của SGK Toán 4 Kết nối tri thức (mã bài của grade4Tools/catalog.js).
 * also = bài luyện tập có dùng đúng kỹ năng của cấp, chỉ để gợi ý trò chơi.
 */

export const STALLS = [
  {
    id: 'rail', title: 'Kỹ sư đường sắt', icon: '🛤️',
    purpose: 'Giúp em thực hành kiến thức về hai đường thẳng vuông góc, hai đường thẳng song song và cách vẽ chúng bằng ê ke đã học trong bài. Em làm kỹ sư: kiểm tra đường ngang, vẽ đường cắt vuông góc qua đường ray, chọn thanh ray song song và làm đường tránh tàu.',
    levels: [
      { id: 'rail-1', n: 1, title: 'Kiểm tra đường ngang', lessons: { tools: ['bai-27'] }, also: { tools: ['bai-28'] } },
      { id: 'rail-2', n: 2, title: 'Làm đường ngang', lessons: { tools: ['bai-28'] } },
      { id: 'rail-3', n: 3, title: 'Chọn cặp ray', lessons: { tools: ['bai-29'] } },
      { id: 'rail-4', n: 4, title: 'Đường tránh tàu', lessons: { tools: ['bai-30'] }, also: { tools: ['bai-28'] } },
    ],
  },
  {
    id: 'city', title: 'Bản đồ dân số', icon: '🏙️',
    purpose: 'Giúp em thực hành kiến thức về số có nhiều chữ số, hàng và lớp, so sánh và làm tròn số đến hàng trăm nghìn đã học trong bài. Em làm phóng viên bản tin thời sự: đọc, viết số dân các tỉnh, thành trên bản đồ Việt Nam, xếp hạng và làm tròn số dân.',
    levels: [
      { id: 'city-1', n: 1, title: 'Đọc số dân', lessons: { tools: ['bai-12'] }, also: { tools: ['bai-10', 'bai-11', 'bai-16'] } },
      { id: 'city-2', n: 2, title: 'Xếp hạng dân số', lessons: { tools: ['bai-14'] }, also: { tools: ['bai-16'] } },
      { id: 'city-3', n: 3, title: 'Làm tròn số dân', lessons: { tools: ['bai-13'] }, also: { tools: ['bai-16'] } },
    ],
  },
  {
    id: 'weigh', title: 'Trạm cân nông sản', icon: '🚚',
    purpose: 'Giúp em thực hành kiến thức về yến, tạ, tấn, đổi đơn vị đo khối lượng và cộng, trừ số có nhiều chữ số đã học trong bài. Em trực trạm cân của chợ đầu mối mùa thu hoạch: đọc cân, chất hàng theo đơn, cho xe qua cầu đúng tải trọng và ghi sổ trạm cân.',
    levels: [
      { id: 'weigh-1', n: 1, title: 'Đọc cân, ghi phiếu', lessons: { tools: ['bai-17'] }, also: { tools: ['bai-20', 'bai-21'] } },
      { id: 'weigh-2', n: 2, title: 'Chất hàng theo đơn', lessons: { tools: ['bai-17'] }, also: { tools: ['bai-20', 'bai-21'] } },
      { id: 'weigh-3', n: 3, title: 'Xe qua cầu', lessons: { tools: ['bai-20'] }, also: { tools: ['bai-17', 'bai-21'] } },
      { id: 'weigh-4', n: 4, title: 'Sổ trạm cân', lessons: { tools: ['bai-22', 'bai-23'] }, also: { tools: ['bai-21', 'bai-26', 'bai-34'] } },
    ],
  },
];

const STALL_BY_ID = Object.fromEntries(STALLS.map(s => [s.id, s]));
const LEVEL_BY_ID = Object.fromEntries(STALLS.flatMap(s => s.levels.map(l => [l.id, l])));

/** { id, title, icon, purpose } của một trò. */
export function stallMeta(id) {
  const { levels, ...meta } = STALL_BY_ID[id];
  return meta;
}

/** { id, n, title, lessons, also? } của một cấp. */
export function levelMeta(id) {
  return { ...LEVEL_BY_ID[id] };
}

/** Các cấp luyện bài `unitId` ('bai-27'): [{ stall, level }] (lessons trước, also sau). */
export function levelsForUnit(unitId, book = 'tools') {
  const main = (l) => l.lessons[book]?.includes(unitId);
  const side = (l) => l.also?.[book]?.includes(unitId);
  const all = STALLS.flatMap(stall => stall.levels.map(level => ({ stall, level })));
  return [...all.filter(x => main(x.level)), ...all.filter(x => !main(x.level) && side(x.level))];
}
