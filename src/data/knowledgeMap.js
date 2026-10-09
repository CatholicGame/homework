/**
 * Bản đồ kiến thức Toán lớp 1–5: mỗi lớp chia theo mạch (Số, Phép tính, Hình học, Đo lường, Thống kê, Giải toán),
 * mỗi mạch là chuỗi kiến thức theo thứ tự học. Mỗi kiến thức nối tới các Bài dạy nó trong các sách của app,
 * bằng tiền tố khoá sao (workbook1, workbook2, workbook, practice, textbook4, tool4, tool5).
 * Tiến độ = số câu đã nhận sao / tổng số câu của các Bài đó (src/data/knowledgeUnits.js).
 * Bài "Luyện tập" ngay sau một bài mới thuộc kiến thức của bài mới; "Luyện tập chung", "Ôn tập chung" trộn nhiều mạch thì không gắn.
 */

export const STRANDS = {
  so: { icon: '🔢', title: 'Số', color: '#3B82F6' },
  tinh: { icon: '➕', title: 'Phép tính', color: '#10B981' },
  phanso: { icon: '🍕', title: 'Phân số', color: '#F97316' },
  hinh: { icon: '📐', title: 'Hình học', color: '#8B5CF6' },
  do: { icon: '📏', title: 'Đo lường', color: '#F59E0B' },
  tk: { icon: '📊', title: 'Thống kê, xác suất', color: '#EC4899' },
  giai: { icon: '🧩', title: 'Giải toán', color: '#0D9488' },
};

/** "1-4,7" → ['bai-1','bai-2','bai-3','bai-4','bai-7']; số có tiền tố khác (tuan-) thì truyền prefix. */
function ids(spec, prefix = 'bai-') {
  return String(spec).split(',').flatMap((part) => {
    const [a, b = a] = part.trim().split('-').map(Number);
    return Array.from({ length: b - a + 1 }, (_, i) => `${prefix}${a + i}`);
  });
}

/** Kiến thức: links = { workbook: '1-3', practice: 'tuan:1,2' } → [{ book, unit }]. */
const C = (strand, id, icon, title, know, links) => ({
  strand, id, icon, title, know,
  units: Object.entries(links).flatMap(([book, spec]) => {
    const [prefix, list] = String(spec).startsWith('tuan:') ? ['tuan-', spec.slice(5)] : ['bai-', spec];
    return ids(list, prefix).map((unit) => ({ book, unit }));
  }),
});

export const KNOWLEDGE_MAP = {
  1: [
    C('so', 'g1-nhieu-it', '⚖️', 'Nhiều hơn, ít hơn', 'Ghép từng cặp để biết nhóm nào nhiều hơn, ít hơn.', { workbook1: '2' }),
    C('so', 'g1-so-1-5', '✋', 'Các số 1 đến 5', 'Đếm, đọc, viết các số từ 1 đến 5.', { workbook1: '6-9' }),
    C('so', 'g1-dau', '🐊', 'Dấu <, >, =', 'So sánh hai số, dùng dấu bé hơn, lớn hơn, bằng nhau.', { workbook1: '10-15' }),
    C('so', 'g1-so-6-10', '🔟', 'Các số 6 đến 10, số 0', 'Đếm, đọc, viết, so sánh các số đến 10 và số 0.', { workbook1: '16-24' }),
    C('hinh', 'g1-hinh', '🔺', 'Hình vuông, tròn, tam giác', 'Nhận ra và gọi tên hình vuông, hình tròn, hình tam giác.', { workbook1: '3-5' }),
    C('tinh', 'g1-cong-5', '➕', 'Phép cộng trong phạm vi 5', 'Gộp hai nhóm, viết phép cộng và tính kết quả.', { workbook1: '25-30,33' }),
    C('tinh', 'g1-cong-0', '0️⃣', 'Số 0 trong phép cộng', 'Một số cộng với 0 bằng chính số đó.', { workbook1: '31-32' }),
    C('tinh', 'g1-tru-3', '➖', 'Phép trừ trong phạm vi 3', 'Bớt đi một số, viết phép trừ và tính kết quả.', { workbook1: '34' }),
  ],
  2: [
    C('so', 'g2-so-100', '💯', 'Số đến 100, tia số', 'Đọc, viết, so sánh số đến 100; số liền trước, liền sau trên tia số.', { workbook2: '1-2' }),
    C('so', 'g2-so-1000', '🧱', 'Số có ba chữ số', 'Trăm, chục, đơn vị; viết số thành tổng; so sánh số đến 1 000.', { workbook2: '48-54,68' }),
    C('tinh', 'g2-thanh-phan', '🏷️', 'Số hạng, tổng, số bị trừ, hiệu', 'Gọi tên các thành phần; hơn, kém nhau bao nhiêu.', { workbook2: '3-4' }),
    C('tinh', 'g2-cong-tru-100', '✏️', 'Cộng, trừ không nhớ đến 100', 'Đặt tính thẳng cột, cộng trừ từ phải sang trái.', { workbook2: '5-6' }),
    C('tinh', 'g2-qua-10', '🔟', 'Cộng, trừ qua 10 trong phạm vi 20', 'Tách số để làm tròn 10; thuộc bảng cộng, bảng trừ qua 10.', { workbook2: '7-8,10-12,14' }),
    C('tinh', 'g2-co-nho', '🎒', 'Cộng, trừ có nhớ đến 100', 'Đặt tính có nhớ với số có một, hai chữ số.', { workbook2: '19-24,33,69' }),
    C('tinh', 'g2-nhan-chia', '✖️', 'Phép nhân, phép chia', 'Nhân là cộng các số bằng nhau; chia thành các phần bằng nhau. Thừa số, tích, thương.', { workbook2: '37-38,41-42' }),
    C('tinh', 'g2-bang-2-5', '📋', 'Bảng nhân, chia 2 và 5', 'Thuộc bảng nhân 2, 5 và bảng chia 2, 5.', { workbook2: '39-40,43-45,71' }),
    C('tinh', 'g2-cong-tru-1000', '🧮', 'Cộng, trừ trong phạm vi 1 000', 'Đặt tính cộng, trừ số có ba chữ số, có nhớ và không nhớ.', { workbook2: '59-63,70' }),
    C('hinh', 'g2-diem-doan', '📍', 'Điểm, đoạn thẳng, đường cong', 'Đường thẳng, đường cong, ba điểm thẳng hàng; vẽ đoạn thẳng.', { workbook2: '25,27' }),
    C('hinh', 'g2-gap-khuc', '〰️', 'Đường gấp khúc, hình tứ giác', 'Độ dài đường gấp khúc là tổng các đoạn; nhận ra tứ giác.', { workbook2: '26,28,34' }),
    C('hinh', 'g2-khoi', '🥫', 'Khối trụ, khối cầu', 'Nhận ra khối trụ, khối cầu trong đồ vật quanh em.', { workbook2: '46-47,72' }),
    C('do', 'g2-kg-lit', '⚖️', 'Ki-lô-gam, lít', 'Cân nặng đo bằng kg, nước đo bằng lít.', { workbook2: '15-18' }),
    C('do', 'g2-gio-ngay', '⏰', 'Giờ, ngày, tháng', 'Xem đồng hồ, xem lịch; 1 ngày có 24 giờ, 1 giờ có 60 phút.', { workbook2: '29-32' }),
    C('do', 'g2-m-km', '📏', 'Đề-xi-mét, mét, ki-lô-mét', '1 m = 10 dm, 1 km = 1 000 m; đo và ước lượng độ dài.', { workbook2: '35,55,73' }),
    C('do', 'g2-tien', '💵', 'Tiền Việt Nam', 'Nhận biết các tờ tiền, đổi và tính tiền đơn giản.', { workbook2: '56,58' }),
    C('tk', 'g2-kiem-dem', '📊', 'Kiểm đếm, biểu đồ tranh', 'Thu thập, phân loại, kiểm đếm số liệu; đọc biểu đồ tranh.', { workbook2: '64-65,67,74' }),
    C('tk', 'g2-kha-nang', '🎲', 'Chắc chắn, có thể, không thể', 'Nói được một việc chắc chắn, có thể hay không thể xảy ra.', { workbook2: '66' }),
    C('giai', 'g2-them-bot', '🧩', 'Bài toán thêm, bớt, nhiều hơn, ít hơn', 'Đọc đề, chọn phép cộng hay trừ, viết lời giải.', { workbook2: '9,13' }),
  ],
  3: [
    C('so', 'g3-so-10000', '🔢', 'Số có bốn chữ số', 'Đọc, viết, so sánh số đến 10 000; làm tròn đến hàng chục, hàng trăm.', { workbook: '45-46,48-49' }),
    C('so', 'g3-la-ma', '🏛️', 'Chữ số La Mã', 'Đọc, viết số La Mã từ I đến XX.', { workbook: '47' }),
    C('so', 'g3-so-100000', '🧱', 'Số có năm chữ số', 'Đọc, viết, so sánh số đến 100 000; làm tròn đến hàng nghìn.', { workbook: '59-62,76' }),
    C('so', 'g3-phan-may', '🍰', 'Một phần mấy', 'Chia đều thành các phần, tìm một phần hai, một phần ba…', { workbook: '14', practice: 'tuan:6' }),
    C('tinh', 'g3-on-cong-tru', '🔁', 'Tìm thành phần cộng, trừ', 'Tìm số hạng, số bị trừ, số trừ chưa biết.', { workbook: '1-3', practice: 'tuan:1' }),
    C('tinh', 'g3-bang-nhan', '📋', 'Bảng nhân, chia 2 đến 9', 'Thuộc các bảng nhân, bảng chia từ 2 đến 9.', { workbook: '4-6,9-12,15', practice: 'tuan:2-5' }),
    C('tinh', 'g3-tim-nhan-chia', '🔍', 'Tìm thành phần nhân, chia', 'Tìm thừa số, số bị chia, số chia chưa biết.', { workbook: '13' }),
    C('tinh', 'g3-nhan-chia-1cs', '✍️', 'Nhân, chia với số có một chữ số', 'Đặt tính nhân, chia số có hai, ba chữ số; chia hết, chia có dư.', { workbook: '23,25-26,36-37,41', practice: 'tuan:9-11,14-15' }),
    C('tinh', 'g3-bieu-thuc', '⚙️', 'Biểu thức số', 'Nhân chia trước, cộng trừ sau; trong ngoặc làm trước.', { workbook: '38,42', practice: 'tuan:16-17' }),
    C('tinh', 'g3-cong-tru-lon', '🧮', 'Cộng, trừ đến 100 000', 'Đặt tính cộng, trừ số có bốn, năm chữ số.', { workbook: '54-55,63-65,77' }),
    C('tinh', 'g3-nhan-chia-lon', '🏗️', 'Nhân, chia số có bốn, năm chữ số', 'Nhân, chia số lớn với số có một chữ số.', { workbook: '56-58,70-72,78' }),
    C('hinh', 'g3-trung-diem', '📍', 'Điểm ở giữa, trung điểm', 'Trung điểm chia đoạn thẳng thành hai phần bằng nhau.', { workbook: '16', practice: 'tuan:7' }),
    C('hinh', 'g3-tron-goc', '⭕', 'Hình tròn, góc vuông', 'Tâm, bán kính, đường kính; dùng ê ke nhận ra góc vuông.', { workbook: '17-18,20', practice: 'tuan:8' }),
    C('hinh', 'g3-tu-giac', '🟦', 'Tam giác, tứ giác, chữ nhật, vuông', 'Đặc điểm cạnh, góc của hình chữ nhật, hình vuông.', { workbook: '19,22' }),
    C('hinh', 'g3-khoi', '📦', 'Khối lập phương, hộp chữ nhật', 'Đỉnh, cạnh, mặt của khối lập phương và khối hộp chữ nhật.', { workbook: '21' }),
    C('hinh', 'g3-chu-vi', '🐜', 'Chu vi', 'Chu vi là tổng độ dài các cạnh; chu vi hình chữ nhật, hình vuông.', { workbook: '50' }),
    C('hinh', 'g3-dien-tich', '🔲', 'Diện tích, cm²', 'Diện tích hình chữ nhật = dài × rộng, hình vuông = cạnh × cạnh.', { workbook: '51-53' }),
    C('do', 'g3-mm-g-ml', '🌡️', 'Mi-li-mét, gam, mi-li-lít, độ C', 'Đơn vị nhỏ: mm, g, ml và nhiệt độ °C.', { workbook: '30-35', practice: 'tuan:13' }),
    C('do', 'g3-gio-lich', '📅', 'Đồng hồ, tháng, năm', 'Xem giờ chính xác đến phút; tháng có 30, 31 ngày.', { workbook: '66-67' }),
    C('do', 'g3-tien', '💵', 'Tiền Việt Nam', 'Các tờ tiền đến 100 000 đồng; tính tiền mua hàng.', { workbook: '68-69' }),
    C('tk', 'g3-bang-so-lieu', '📊', 'Bảng số liệu', 'Thu thập, ghi chép và đọc bảng số liệu.', { workbook: '73,80' }),
    C('tk', 'g3-kha-nang', '🎲', 'Khả năng xảy ra', 'Chắc chắn, có thể, không thể của một sự kiện.', { workbook: '74' }),
    C('giai', 'g3-gap-giam', '🔼', 'Gấp, giảm một số lần', 'Gấp lên thì nhân, giảm đi thì chia; số lớn gấp mấy lần số bé.', { workbook: '24,27,39', practice: 'tuan:10' }),
    C('giai', 'g3-hai-buoc', '🧩', 'Bài toán hai bước tính', 'Tìm kết quả bước một rồi dùng nó cho bước hai.', { workbook: '28', practice: 'tuan:12' }),
  ],
  4: [
    C('so', 'g4-so-lon', '🔢', 'Số có nhiều chữ số', 'Hàng và lớp, lớp triệu; đọc, viết, so sánh, làm tròn số lớn.', { textbook4: '1-3,6-17,152-154', tool4: '1,10-16,33' }),
    C('so', 'g4-chan-le', '🏘️', 'Chẵn, lẻ, dấu hiệu chia hết', 'Số chẵn, số lẻ; dấu hiệu chia hết cho 2, 5, 9, 3.', { textbook4: '84-90', tool4: '3' }),
    C('tinh', 'g4-cong-tru', '✍️', 'Cộng, trừ số nhiều chữ số', 'Đặt tính cộng, trừ số lớn.', { textbook4: '29-31', tool4: '2,22-23,26,34' }),
    C('tinh', 'g4-bieu-thuc-chu', '🔤', 'Biểu thức chứa chữ', 'Thay chữ bằng số rồi tính giá trị biểu thức.', { textbook4: '4-5,32,34', tool4: '4' }),
    C('tinh', 'g4-tinh-chat', '🔄', 'Tính chất các phép tính', 'Giao hoán, kết hợp; nhân một số với một tổng, chia một tổng cho một số.', { textbook4: '33,35-36,50,52,56-58,66,69-70', tool4: '24' }),
    C('tinh', 'g4-nhan', '✖️', 'Nhân với số có nhiều chữ số', 'Nhân với 10, 100; nhân với số có hai, ba chữ số, tích riêng.', { textbook4: '49,51,53,59-65' }),
    C('tinh', 'g4-chia', '➗', 'Chia cho số có nhiều chữ số', 'Chia cho số có một, hai, ba chữ số; ước lượng thương.', { textbook4: '67-68,71-83' }),
    C('phanso', 'g4-phan-so', '🍕', 'Phân số', 'Tử số, mẫu số; phân số bằng nhau, rút gọn, quy đồng, so sánh.', { textbook4: '96-113,159' }),
    C('phanso', 'g4-tinh-phan-so', '🧮', 'Phép tính với phân số', 'Cộng, trừ, nhân, chia phân số; tìm phân số của một số.', { textbook4: '114-132,160-163' }),
    C('hinh', 'g4-goc', '📐', 'Góc nhọn, tù, bẹt, đo góc', 'Dùng thước đo góc; góc nhọn bé hơn góc vuông, góc tù lớn hơn.', { textbook4: '40', tool4: '7-9' }),
    C('hinh', 'g4-vuong-goc', '∟', 'Vuông góc, song song', 'Nhận ra và vẽ hai đường thẳng vuông góc, song song bằng ê ke.', { textbook4: '41-48,167-168', tool4: '27-30,32,35' }),
    C('hinh', 'g4-binh-hanh', '▱', 'Hình bình hành, hình thoi', 'Đặc điểm và diện tích hình bình hành, hình thoi.', { textbook4: '93-95,133-136', tool4: '31' }),
    C('do', 'g4-khoi-luong', '⚖️', 'Yến, tạ, tấn; giây, thế kỉ', 'Bảng đơn vị đo khối lượng, đổi đơn vị; giây, thế kỉ.', { textbook4: '18-21,164-166', tool4: '17,19-21,36' }),
    C('do', 'g4-dien-tich', '🔲', 'dm², m², km²', 'Đơn vị đo diện tích và cách đổi.', { textbook4: '54-55,91-92', tool4: '18' }),
    C('do', 'g4-ti-le', '🗺️', 'Tỉ lệ bản đồ', 'Từ độ dài trên bản đồ tính độ dài thật và ngược lại.', { textbook4: '147-149,151' }),
    C('tk', 'g4-bieu-do', '📊', 'Biểu đồ cột', 'Đọc và so sánh số liệu trên biểu đồ.', { textbook4: '24-26,158' }),
    C('giai', 'g4-trung-binh', '⚖️', 'Trung bình cộng', 'Lấy tổng các số chia cho số các số hạng.', { textbook4: '22-23,169' }),
    C('giai', 'g4-ba-buoc', '🧩', 'Bài toán ba bước tính', 'Vẽ sơ đồ, tìm từng bước rồi viết lời giải.', { tool4: '5-6' }),
    C('giai', 'g4-tong-hieu', '📊', 'Tổng và hiệu', 'Số lớn = (tổng + hiệu) : 2, số bé = (tổng − hiệu) : 2.', { textbook4: '37-39,170', tool4: '25' }),
    C('giai', 'g4-ti-so', '🧮', 'Tổng tỉ, hiệu tỉ', 'Vẽ sơ đồ phần bằng nhau, tìm giá trị một phần.', { textbook4: '137-146,171' }),
  ],
  5: [
    C('so', 'g5-on-so', '🔢', 'Ôn số tự nhiên', 'Đọc, viết, so sánh số tự nhiên và các phép tính.', { tool5: '1-2' }),
    C('phanso', 'g5-phan-so', '🍕', 'Phân số, hỗn số', 'Phân số thập phân; cộng trừ phân số khác mẫu; hỗn số.', { tool5: '3-7,9' }),
    C('so', 'g5-stp', '🔟', 'Số thập phân', 'Phần nguyên, phần thập phân; đọc, viết, so sánh, làm tròn.', { tool5: '10-11,13-14,30' }),
    C('tinh', 'g5-tinh-stp', '✍️', 'Phép tính với số thập phân', 'Cộng, trừ, nhân, chia số thập phân; nhân chia nhẩm với 10, 0,1.', { tool5: '19-24,31' }),
    C('hinh', 'g5-tam-giac-thang', '🔺', 'Tam giác, hình thang', 'Diện tích tam giác = đáy × cao : 2; diện tích hình thang.', { tool5: '25-26,29,32-33' }),
    C('hinh', 'g5-tron', '⭕', 'Đường tròn', 'Chu vi = d × 3,14; diện tích = r × r × 3,14.', { tool5: '27-28' }),
    C('do', 'g5-don-vi-stp', '📏', 'Số đo viết dạng số thập phân', 'Đổi số đo độ dài, khối lượng ra số thập phân.', { tool5: '8,12,34' }),
    C('do', 'g5-dien-tich', '🌾', 'km², héc-ta, bảng đơn vị diện tích', 'Mỗi đơn vị diện tích gấp 100 lần đơn vị bé hơn liền sau.', { tool5: '15-18' }),
  ],
};

/** Sách chứa một Bài: thẻ ở trang chủ + Bài cần mở thẳng (render(app, onBack, { open })). */
export function bookOf(book, unit) {
  const n = +unit.replace(/\D/g, '');
  switch (book) {
    case 'workbook1': return { card: 'grade1-workbook', label: 'Vở BT Toán 1', open: unit };
    case 'workbook2': return n <= 36
      ? { card: 'grade2-workbook', label: 'Vở BT Toán 2, Tập Một', open: unit }
      : { card: 'grade2-workbook-2', label: 'Vở BT Toán 2, Tập Hai', open: unit };
    case 'workbook': return n <= 44
      ? { card: 'grade3-workbook', label: 'Vở BT Toán 3, Tập Một', open: unit }
      : { card: 'grade3-workbook-2', label: 'Vở BT Toán 3, Tập Hai', open: unit };
    case 'practice': return { card: 'grade3-practice', label: 'Luyện Tập Toán 3', open: unit };
    case 'textbook4': return { card: 'grade4-textbook', label: 'Sách Toán 4', open: unit };
    case 'tool4': return { card: 'grade4-tools', label: 'Toán 4: Học bằng công cụ', open: unit };
    case 'tool5': return { card: 'grade5-tools', label: 'Toán 5: Học bằng công cụ', open: unit };
    default: return null;
  }
}
