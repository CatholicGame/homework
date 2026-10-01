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
    purpose: 'Giúp em thực hành kiến thức về bài toán thêm, bớt, nhiều hơn, ít hơn, hơn kém nhau bao nhiêu và phép cộng, phép trừ có nhớ (phạm vi 100 và 1 000) đã học trong bài. Em làm phụ xe, đếm khách lên xuống cho bác tài.',
    levels: [
      { id: 'bus-1', n: 1, title: 'Lên xe, xuống xe', lessons: { g2: ['bai-9'] }, also: { g2: ['bai-10'] } },
      { id: 'bus-2', n: 2, title: 'Nhiều hơn, ít hơn', lessons: { g2: ['bai-13'] }, also: { g2: ['bai-14'] } },
      { id: 'bus-3', n: 3, title: 'Hơn kém mấy người?', lessons: { g2: ['bai-4'] }, also: { g2: ['bai-6'] } },
      { id: 'bus-4', n: 4, title: 'Mấy người lên, xuống?', lessons: { g2: ['bai-3'] } },
      { id: 'bus-5', n: 5, title: 'Tàu hỏa có nhớ', lessons: { g2: ['bai-19', 'bai-20', 'bai-22', 'bai-23'] }, also: { g2: ['bai-21', 'bai-24'] } },
      { id: 'bus-6', n: 6, title: 'Tàu Bắc – Nam, phạm vi 1 000', lessons: { g2: ['bai-59', 'bai-60', 'bai-61', 'bai-62'] }, also: { g2: ['bai-63'] } },
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
    id: 'shop', title: 'Quầy tạp hóa', icon: '🪙',
    purpose: 'Giúp em thực hành kiến thức về tiền Việt Nam (tờ 100 đồng, 200 đồng, 500 đồng, 1 000 đồng) và cộng, trừ trong phạm vi 1 000 đã học trong bài. Em đứng quầy hội chợ của lớp: lấy đúng tờ tiền, ghép tiền vừa đủ giá, tính tiền và trả lại tiền cho khách.',
    levels: [
      { id: 'shop-1', n: 1, title: 'Các tờ tiền', lessons: { g2: ['bai-56'] }, also: { g2: ['bai-58'] } },
      { id: 'shop-2', n: 2, title: 'Lấy tiền vừa đủ', lessons: { g2: ['bai-56'] }, also: { g2: ['bai-58', 'bai-59'] } },
      { id: 'shop-3', n: 3, title: 'Tính tiền, trả lại tiền', lessons: { g2: ['bai-59', 'bai-61'] }, also: { g2: ['bai-63'] } },
    ],
  },
  {
    id: 'clock', title: 'Đồng hồ hẹn giờ & Tờ lịch', icon: '⏰',
    purpose: 'Giúp em thực hành kiến thức về xem đồng hồ, giờ đúng, 15 phút, 30 phút, giờ buổi chiều, buổi tối, xem lịch, ngày, tháng đã học trong bài. Em làm thư ký của cả nhà: kéo kim đặt đồng hồ báo thức và xem tờ lịch treo tường.',
    levels: [
      { id: 'clock-1', n: 1, title: 'Giờ đúng', lessons: { g2: ['bai-29'] }, also: { g2: ['bai-32'] } },
      { id: 'clock-2', n: 2, title: 'Giờ, 15 phút, 30 phút', lessons: { g2: ['bai-29', 'bai-31'] }, also: { g2: ['bai-32'] } },
      { id: 'clock-3', n: 3, title: 'Giờ chiều, giờ tối', lessons: { g2: ['bai-29', 'bai-31'] }, also: { g2: ['bai-32'] } },
      { id: 'clock-4', n: 4, title: 'Xem lịch: ngày, thứ', lessons: { g2: ['bai-30', 'bai-31'] } },
      { id: 'clock-5', n: 5, title: 'Tháng có mấy ngày?', lessons: { g2: ['bai-30', 'bai-31'] } },
    ],
  },
  {
    id: 'ant', title: 'Chú kiến tìm đường', icon: '🐜',
    purpose: 'Giúp em thực hành kiến thức về điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng, đo độ dài, đường gấp khúc, hình tứ giác, vẽ đoạn thẳng, đề-xi-mét, mét và ki-lô-mét đã học trong bài. Em giúp Kiến Vàng tha mồi về tổ: căng chỉ qua các hạt đường, đặt thước đo cành cây, chọn đường ngắn hơn, vẽ cầu, xem bản đồ đi biển.',
    levels: [
      { id: 'ant-1', n: 1, title: 'Ba điểm thẳng hàng', lessons: { g2: ['bai-25'] }, also: { g2: ['bai-28'] } },
      { id: 'ant-2', n: 2, title: 'Độ dài đường gấp khúc', lessons: { g2: ['bai-25', 'bai-26'] }, also: { g2: ['bai-28'] } },
      { id: 'ant-3', n: 3, title: 'Đường ngắn hơn, hình tứ giác', lessons: { g2: ['bai-26'] }, also: { g2: ['bai-28'] } },
      { id: 'ant-4', n: 4, title: 'Vẽ đoạn thẳng', lessons: { g2: ['bai-27'] }, also: { g2: ['bai-28'] } },
      { id: 'ant-5', n: 5, title: 'Bản đồ đảo: ki-lô-mét', lessons: { g2: ['bai-55'] }, also: { g2: ['bai-58'] } },
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
    id: 'factory', title: 'Xưởng đóng gói trăm – chục', icon: '🏭',
    purpose: 'Giúp em thực hành kiến thức về đơn vị, chục, trăm, số tròn trăm, số tròn chục, số có ba chữ số, so sánh và cộng, trừ trong phạm vi 1 000 đã học trong bài. Em đóng 10 khối lẻ thành thanh chục, 10 thanh chục thành tấm trăm, xếp hàng theo đơn và gộp hàng cho khách.',
    levels: [
      { id: 'fac-1', n: 1, title: 'Đơn vị, chục, trăm', lessons: { g2: ['bai-48'] } },
      { id: 'fac-2', n: 2, title: 'Số tròn trăm, tròn chục', lessons: { g2: ['bai-49', 'bai-50'] } },
      { id: 'fac-3', n: 3, title: 'Số có ba chữ số', lessons: { g2: ['bai-51', 'bai-52'] }, also: { g2: ['bai-54'] } },
      { id: 'fac-4', n: 4, title: 'So sánh số có ba chữ số', lessons: { g2: ['bai-53'] }, also: { g2: ['bai-54'] } },
      { id: 'fac-5', n: 5, title: 'Cộng, trừ trong phạm vi 1 000', lessons: { g2: ['bai-59', 'bai-60', 'bai-61', 'bai-62'] }, also: { g2: ['bai-63'] } },
    ],
  },
  {
    id: 'rep', title: 'Phóng viên nhí', icon: '📊',
    purpose: 'Giúp em thực hành kiến thức về thu thập, phân loại, kiểm đếm số liệu, biểu đồ tranh và chắc chắn, có thể, không thể đã học trong bài. Em làm phóng viên báo tường: gạch vạch đếm xe, vẽ và đọc biểu đồ tranh, đoán màu bi lấy ra từ túi.',
    levels: [
      { id: 'rep-1', n: 1, title: 'Kiểm đếm số liệu', lessons: { g2: ['bai-64', 'bai-67'] }, also: { g2: ['bai-74'] } },
      { id: 'rep-2', n: 2, title: 'Biểu đồ tranh', lessons: { g2: ['bai-65'] }, also: { g2: ['bai-74'] } },
      { id: 'rep-3', n: 3, title: 'Chắc chắn, có thể, không thể', lessons: { g2: ['bai-66'] }, also: { g2: ['bai-74'] } },
    ],
  },
  {
    id: 'roll', title: 'Thử lăn khối hình', icon: '🎳',
    purpose: 'Giúp em thực hành kiến thức về khối trụ, khối cầu đã học trong bài. Em cùng bạn Tí xếp đồ chơi vào hộp khối trụ, khối cầu và đoán xem đồ vật nào lăn được xuống dốc trượt.',
    levels: [
      { id: 'roll-1', n: 1, title: 'Khối trụ, khối cầu', lessons: { g2: ['bai-46'] }, also: { g2: ['bai-47'] } },
      { id: 'roll-2', n: 2, title: 'Lăn hay không lăn?', lessons: { g2: ['bai-46'] }, also: { g2: ['bai-47'] } },
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

/**
 * Kiến thức riêng của từng bài: mở trò chơi từ biểu tượng ở bài đó (hoặc nút gợi ý ở màn kết quả) thì cấp gắn với
 * bài chỉ ra phép tính của bài — bé mới học Bài 39 Bảng nhân 2 chưa gặp bảng 5, Bài 19 (cộng có nhớ) chưa gặp phép trừ.
 * Mở từ nút "Trò chơi tăng cường" thì vẫn trộn như thường. Mỗi trò đọc phần của mình trong game.focus(level, focus):
 *   tables: bảng nhân / chia (quầy trứng, tiệc) · names: 'mul' | 'div' tên gọi thành phần (tiệc cấp 5)
 *   sign: 1 cộng | -1 trừ, digits: số thứ hai có 1 hay 2 chữ số (ếch, tàu hỏa) · op + carry (xưởng, phạm vi 1 000)
 * Bài 41 (Phép chia) và các bài Luyện tập chung vẫn trộn.
 */
const UNIT_FOCUS = {
  'bai-19': { sign: 1, digits: 1 }, 'bai-20': { sign: 1, digits: 2 },
  'bai-22': { sign: -1, digits: 1 }, 'bai-23': { sign: -1, digits: 2 },
  'bai-38': { names: 'mul' }, 'bai-42': { names: 'div' },
  'bai-39': { tables: [2] }, 'bai-40': { tables: [5] }, 'bai-43': { tables: [2] }, 'bai-44': { tables: [5] },
  'bai-59': { op: 'add', carry: false }, 'bai-60': { op: 'add', carry: true },
  'bai-61': { op: 'sub', carry: false }, 'bai-62': { op: 'sub', carry: true },
};

/** Focus của bài `unitId` cho game.focus(level, focus), hoặc null khi bài vẫn trộn. */
export function unitFocus(book, unitId) {
  return UNIT_FOCUS[unitId] || null;
}
