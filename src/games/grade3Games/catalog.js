/**
 * Danh mục nhẹ của các trò chơi tăng cường: tên, biểu tượng, các cấp và bài học liên quan.
 * Tách riêng khỏi code trò chơi (grade3Games.js tải động, ~60 KB nén) để sách Toán 3 gợi ý đúng trò cho bài vừa
 * làm mà không phải tải cả trò chơi. Các quầy lấy lại thông tin ở đây bằng stallMeta() / levelMeta().
 *
 * lessons = { workbook: ['bai-31'], practice: ['tuan-13'] } — bài học chính của cấp (Vở bài tập / sách Luyện tập):
 *   màn giới thiệu ghi "phù hợp nếu em đã học Bài …", nút "Ôn lại" mở bài cuối trong danh sách.
 * also = bài ôn tập / luyện tập chung / thực hành có câu luyện ĐÚNG kỹ năng chính của cấp (cân gam, đọc vạch ml,
 *   1/n của một nhóm…) — chỉ dùng để gợi ý trò chơi ở màn kết quả của bài đó.
 * purpose = câu "Giúp em thực hành kiến thức về … đã học trong bài. Em …" — hiện ở đầu màn chọn cấp cho bố mẹ và em.
 * Không gắn bài chỉ nhắc tới đơn vị (một câu cộng trừ có "kg"). Đã rà cả 44 bài + 18 tuần ngày 2026-09-28.
 */

export const STALLS = [
  {
    id: 'fruit', title: 'Quầy trái cây', icon: '🍎',
    purpose: 'Giúp em thực hành kiến thức về ki-lô-gam, gam và phép nhân, phép cộng, phép trừ đã học trong bài. Em cân hàng bằng cân đĩa, tính tiền và trả tiền thừa cho khách.',
    levels: [
      { id: 'fruit-1', n: 1, title: 'Cân ki-lô-gam', lessons: { workbook: ['bai-4', 'bai-7'], practice: ['tuan-2', 'tuan-3'] } },
      { id: 'fruit-2', n: 2, title: 'Nhân giá tiền', lessons: { workbook: ['bai-5', 'bai-6', 'bai-9', 'bai-10', 'bai-11', 'bai-12'], practice: ['tuan-2', 'tuan-3', 'tuan-4', 'tuan-5', 'tuan-6'] } },
      { id: 'fruit-3', n: 3, title: 'Giá lẻ', lessons: { workbook: ['bai-23'], practice: ['tuan-9'] }, also: { practice: ['tuan-10'] } },
      { id: 'fruit-4', n: 4, title: 'Trả tiền thừa', lessons: { workbook: ['bai-28'], practice: ['tuan-12'] } },
      { id: 'fruit-5', n: 5, title: 'Cân bằng gam', lessons: { workbook: ['bai-31'], practice: ['tuan-13'] }, also: { workbook: ['bai-34', 'bai-35', 'bai-43', 'bai-44'], practice: ['tuan-14'] } },
    ],
  },
  {
    id: 'egg', title: 'Quầy trứng', icon: '🥚',
    purpose: 'Giúp em thực hành kiến thức về bảng nhân, bảng chia và phép chia có dư đã học trong bài. Em xếp trứng vào hộp, tính cần mấy hộp, mỗi hộp mấy quả và còn thừa mấy quả.',
    levels: [
      { id: 'egg-1', n: 1, title: 'Hộp 2, 5, 10 quả', lessons: { workbook: ['bai-4'], practice: ['tuan-2'] } },
      { id: 'egg-2', n: 2, title: 'Nhân và chia', lessons: { workbook: ['bai-5', 'bai-6', 'bai-9', 'bai-10', 'bai-11', 'bai-12'], practice: ['tuan-2', 'tuan-3', 'tuan-4', 'tuan-5', 'tuan-6'] } },
      { id: 'egg-3', n: 3, title: 'Trứng thừa ra', lessons: { workbook: ['bai-25'], practice: ['tuan-10'] } },
      { id: 'egg-4', n: 4, title: 'Nhiều trứng', lessons: { workbook: ['bai-26', 'bai-37'], practice: ['tuan-11', 'tuan-15'] }, also: { workbook: ['bai-41'], practice: ['tuan-12'] } },
    ],
  },
  {
    id: 'lemon', title: 'Quầy nước chanh', icon: '🍋',
    purpose: 'Giúp em thực hành kiến thức về mi-li-lít đã học trong bài. Em đọc vạch chia trên bình, rót đúng lượng nước chanh và tính lượng nước cho nhiều ly.',
    levels: [
      { id: 'lemon-1', n: 1, title: 'Rót theo vạch', lessons: { workbook: ['bai-32'], practice: ['tuan-13'] }, also: { workbook: ['bai-34'], practice: ['tuan-14'] } },
      { id: 'lemon-2', n: 2, title: 'Vạch 50 ml', lessons: { workbook: ['bai-32'], practice: ['tuan-13'] }, also: { workbook: ['bai-34'], practice: ['tuan-14'] } },
      { id: 'lemon-3', n: 3, title: 'Pha nhiều ly', lessons: { workbook: ['bai-28', 'bai-32', 'bai-36'], practice: ['tuan-12', 'tuan-13', 'tuan-14'] } },
    ],
  },
  {
    id: 'cake', title: 'Tiệm bánh', icon: '🍰',
    purpose: 'Giúp em thực hành kiến thức về một phần mấy và hình tròn (tâm, bán kính, đường kính) đã học trong bài. Em cắt bánh thành các phần bằng nhau rồi chia bánh cho khách.',
    levels: [
      { id: 'cake-1', n: 1, title: 'Cắt bánh', lessons: { workbook: ['bai-14'], practice: ['tuan-6'] }, also: { workbook: ['bai-15'], practice: ['tuan-17'] } },
      { id: 'cake-2', n: 2, title: 'Hộp bánh quy', lessons: { workbook: ['bai-14'], practice: ['tuan-6'] }, also: { practice: ['tuan-7', 'tuan-18'] } },
      { id: 'cake-3', n: 3, title: 'Dao qua tâm', lessons: { workbook: ['bai-17'], practice: ['tuan-7'] }, also: { workbook: ['bai-22', 'bai-43'], practice: ['tuan-8'] } },
    ],
  },
  {
    id: 'ribbon', title: 'Quầy may ruy băng', icon: '🧵',
    purpose: 'Giúp em thực hành kiến thức về mi-li-mét, xăng-ti-mét và phép nhân đã học trong bài. Em đo và cắt ruy băng bằng thước, đổi xăng-ti-mét ra mi-li-mét rồi tính tiền.',
    levels: [
      { id: 'ribbon-1', n: 1, title: 'Cắt theo mi-li-mét', lessons: { workbook: ['bai-30'], practice: ['tuan-12', 'tuan-13'] } },
      { id: 'ribbon-2', n: 2, title: 'Xăng-ti-mét và mi-li-mét', lessons: { workbook: ['bai-30'], practice: ['tuan-12', 'tuan-13'] } },
      { id: 'ribbon-3', n: 3, title: 'Tính tiền ruy băng', lessons: { workbook: ['bai-23', 'bai-30'], practice: ['tuan-9', 'tuan-12'] } },
    ],
  },
  // Trò riêng (không thuộc Chợ phiên) — trong danh sách trò là một thẻ, bấm vào là tới danh sách cấp.
  {
    id: 'truck', title: 'Xe chở hàng', icon: '🚚',
    purpose: 'Giúp em thực hành kiến thức về phép chia có dư và bài toán giải bằng hai bước tính đã học trong bài. Em tính cần mấy xe để chở hết hàng (còn dư thì thêm một xe) hoặc đóng được mấy thùng đầy.',
    levels: [
      { id: 'truck-1', n: 1, title: 'Cần mấy xe?', lessons: { workbook: ['bai-25'], practice: ['tuan-10'] } },
      { id: 'truck-2', n: 2, title: 'Chở hết hay đóng đầy', lessons: { workbook: ['bai-26'], practice: ['tuan-11'] } },
      { id: 'truck-3', n: 3, title: 'Hai bước tính', lessons: { workbook: ['bai-28'], practice: ['tuan-12'] } },
      { id: 'truck-4', n: 4, title: 'Kho hàng lớn', lessons: { workbook: ['bai-37'], practice: ['tuan-15'] } },
    ],
  },
  {
    id: 'machine', title: 'Máy phóng to – thu nhỏ', icon: '🔍',
    purpose: 'Giúp em thực hành kiến thức về gấp một số lên một số lần, giảm một số đi một số lần và so sánh số lớn gấp mấy lần số bé đã học trong bài. Em đoán xem cỗ máy biến hình cho ra bao nhiêu.',
    levels: [
      { id: 'machine-1', n: 1, title: 'Máy gấp lên', lessons: { workbook: ['bai-24'], practice: ['tuan-10'] } },
      { id: 'machine-2', n: 2, title: 'Máy giảm đi', lessons: { workbook: ['bai-27'], practice: ['tuan-11'] } },
      { id: 'machine-3', n: 3, title: 'Đoán máy', lessons: { workbook: ['bai-24', 'bai-27'], practice: ['tuan-10', 'tuan-11'] } },
      { id: 'machine-4', n: 4, title: 'Gấp mấy lần?', lessons: { workbook: ['bai-39'], practice: ['tuan-16'] } },
    ],
  },
  {
    id: 'detective', title: 'Thám tử góc vuông', icon: '📐',
    purpose: 'Giúp em thực hành kiến thức về góc vuông, góc không vuông, hình chữ nhật, hình vuông, hình tam giác và hình tứ giác đã học trong bài. Em dùng ê-ke kiểm tra góc và tìm các hình ẩn trong hình ghép.',
    levels: [
      { id: 'detective-1', n: 1, title: 'Góc vuông hay không?', lessons: { workbook: ['bai-18'], practice: ['tuan-8'] }, also: { workbook: ['bai-20', 'bai-22', 'bai-43', 'bai-44'], practice: ['tuan-18'] } },
      { id: 'detective-2', n: 2, title: 'Hình chữ nhật, hình vuông', lessons: { workbook: ['bai-19'], practice: ['tuan-8'] } },
      { id: 'detective-3', n: 3, title: 'Đếm hình tam giác, tứ giác', lessons: { workbook: ['bai-19'], practice: ['tuan-8'] } },
    ],
  },
];

const STALL_BY_ID = Object.fromEntries(STALLS.map(s => [s.id, s]));
const LEVEL_BY_ID = Object.fromEntries(STALLS.flatMap(s => s.levels.map(l => [l.id, l])));

/** { id, title, icon } của một quầy. */
export function stallMeta(id) {
  const { levels, ...meta } = STALL_BY_ID[id];
  return meta;
}

/** { id, n, title, lessons, also? } của một cấp. */
export function levelMeta(id) {
  return { ...LEVEL_BY_ID[id] };
}

/** Các cấp luyện bài `unitId` trong sách `book` ('workbook' | 'practice') — lessons hoặc also: [{ stall, level }]. */
export function levelsForUnit(book, unitId) {
  const has = (l) => l.lessons[book]?.includes(unitId) || l.also?.[book]?.includes(unitId);
  return STALLS.flatMap(stall => stall.levels.filter(has).map(level => ({ stall, level })));
}
