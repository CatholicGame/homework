/**
 * Điểm kiến thức cốt lõi từng Bài Toán 4 Tập Một (SGK Kết nối tri thức), Bài 1–37, cùng cách đánh số Bài với
 * Toán 4 công cụ (catalog.js). Dùng cho Kiểm tra theo lộ trình lớp 4 (src/data/routeTests/g4): mỗi câu ghi
 * `bai` + `point` = chỉ số một dòng trong `points` (docs/kiem-tra-lo-trinh.md mục 2).
 * Chỉ Bài dạy kiến thức mới có mục; Luyện tập chung, Thực hành và trải nghiệm, Ôn tập không có.
 */

export const KNOWLEDGE4 = {
  // ── Chủ đề 1: Ôn tập và bổ sung ──────────────────────────────────────────
  1: {
    title: 'Ôn tập các số đến 100 000',
    points: [
      'Đọc, viết số có năm chữ số: các hàng chục nghìn, nghìn, trăm, chục, đơn vị; giá trị của mỗi chữ số theo hàng.',
      'Viết số thành tổng các hàng: 36 515 = 30 000 + 6 000 + 500 + 10 + 5.',
      'So sánh, sắp xếp các số trong phạm vi 100 000; số liền trước, số liền sau; tia số.',
      'Làm tròn số đến hàng nghìn, hàng chục nghìn.',
    ],
  },
  2: {
    title: 'Ôn tập các phép tính trong phạm vi 100 000',
    points: [
      'Đặt tính rồi tính cộng, trừ các số có đến năm chữ số (có nhớ).',
      'Nhân, chia số có đến năm chữ số với (cho) số có một chữ số.',
      'Tính nhẩm với số tròn nghìn, tròn chục nghìn: 40 000 + 30 000, 8 000 × 3, 60 000 : 2.',
      'Tính giá trị biểu thức: nhân, chia trước, cộng, trừ sau; có ngoặc thì tính trong ngoặc trước.',
      'Tìm thành phần chưa biết của phép tính (số hạng, số bị trừ, số trừ, thừa số, số bị chia, số chia).',
    ],
  },
  3: {
    title: 'Số chẵn, số lẻ',
    points: [
      'Số có chữ số tận cùng là 0, 2, 4, 6, 8 là <b>số chẵn</b>; tận cùng là 1, 3, 5, 7, 9 là <b>số lẻ</b>.',
      'Hai số chẵn (hoặc hai số lẻ) liên tiếp hơn kém nhau 2 đơn vị; số chẵn và số lẻ xen kẽ nhau.',
    ],
  },
  4: {
    title: 'Biểu thức chứa chữ',
    points: [
      'Biểu thức chứa một chữ (a + 5, 3 × b): thay chữ bằng số rồi tính được một giá trị của biểu thức.',
      'Biểu thức chứa hai chữ, ba chữ (a + b, a − b, a + b + c, (a + b) × c): thay mỗi chữ bằng số đã cho rồi tính.',
      'Công thức chu vi: hình vuông P = a × 4; hình chữ nhật P = (a + b) × 2 (cùng đơn vị đo).',
    ],
  },
  5: {
    title: 'Giải bài toán có ba bước tính',
    points: [
      'Đọc đề, tóm tắt (sơ đồ), tìm từng bước: mỗi bước một câu lời giải và một phép tính.',
      'Bài toán ba bước về mua bán, nhiều hơn / ít hơn, gấp / giảm một số lần, rồi tìm tổng hoặc phần còn lại.',
    ],
  },

  // ── Chủ đề 2: Góc và đơn vị đo góc ────────────────────────────────────────
  7: {
    title: 'Đo góc, đơn vị đo góc',
    points: [
      'Đơn vị đo góc là <b>độ</b>, kí hiệu °. Góc vuông bằng 90°.',
      'Đo góc bằng thước đo góc: đặt tâm thước trùng đỉnh góc, một cạnh trùng vạch 0°, đọc số đo ở cạnh kia.',
    ],
  },
  8: {
    title: 'Góc nhọn, góc tù, góc bẹt',
    points: [
      '<b>Góc nhọn</b> bé hơn góc vuông (bé hơn 90°); <b>góc tù</b> lớn hơn góc vuông và bé hơn góc bẹt.',
      '<b>Góc bẹt</b> bằng hai góc vuông (180°): hai cạnh nằm trên một đường thẳng.',
    ],
  },

  // ── Chủ đề 3: Số có nhiều chữ số ─────────────────────────────────────────
  10: {
    title: 'Số có sáu chữ số. Số 1 000 000',
    points: [
      '10 chục nghìn = 1 trăm nghìn (100 000). Số có sáu chữ số có thêm hàng trăm nghìn.',
      'Đọc, viết số có sáu chữ số từ hàng trăm nghìn đến hàng đơn vị; viết thành tổng các hàng.',
      '10 trăm nghìn = 1 triệu, viết là 1 000 000; 999 999 là số lớn nhất có sáu chữ số.',
    ],
  },
  11: {
    title: 'Hàng và lớp',
    points: [
      'Hàng đơn vị, chục, trăm hợp thành <b>lớp đơn vị</b>; hàng nghìn, chục nghìn, trăm nghìn hợp thành <b>lớp nghìn</b>.',
      'Giá trị của một chữ số phụ thuộc vào hàng của nó: trong 345 210, chữ số 4 có giá trị 40 000.',
    ],
  },
  12: {
    title: 'Các số trong phạm vi lớp triệu',
    points: [
      'Hàng triệu, chục triệu, trăm triệu hợp thành <b>lớp triệu</b>. 10 triệu = 1 chục triệu, 10 chục triệu = 1 trăm triệu.',
      'Đọc, viết số đến lớp triệu: tách thành từng lớp ba chữ số từ phải sang trái, đọc từ lớp triệu.',
      'Nhận biết hàng, lớp và giá trị của chữ số trong số có đến chín chữ số.',
    ],
  },
  13: {
    title: 'Làm tròn số đến hàng trăm nghìn',
    points: [
      'Làm tròn đến hàng trăm nghìn: xét chữ số hàng chục nghìn; bé hơn 5 thì làm tròn xuống, từ 5 trở lên thì làm tròn lên.',
      'Làm tròn đến hàng chục nghìn, hàng nghìn cũng làm như vậy với chữ số ngay sau hàng cần làm tròn.',
    ],
  },
  14: {
    title: 'So sánh các số có nhiều chữ số',
    points: [
      'Số nào có nhiều chữ số hơn thì lớn hơn.',
      'Hai số có cùng số chữ số: so từng cặp chữ số cùng hàng từ trái sang phải; tìm số lớn nhất, bé nhất, sắp xếp thứ tự.',
    ],
  },
  15: {
    title: 'Làm quen với dãy số tự nhiên',
    points: [
      'Các số 0, 1, 2, 3, … là số tự nhiên; xếp từ bé đến lớn được dãy số tự nhiên. Số 0 là số tự nhiên bé nhất, không có số tự nhiên lớn nhất.',
      'Hai số tự nhiên liên tiếp hơn kém nhau 1 đơn vị; tìm số liền trước, liền sau, viết tiếp dãy số theo quy luật.',
    ],
  },

  // ── Chủ đề 4: Một số đơn vị đo đại lượng ─────────────────────────────────
  17: {
    title: 'Yến, tạ, tấn',
    points: [
      '1 yến = 10 kg; 1 tạ = 10 yến = 100 kg; 1 tấn = 10 tạ = 1 000 kg.',
      'Đổi đơn vị, so sánh và tính với các đơn vị yến, tạ, tấn, ki-lô-gam (kèm tên đơn vị).',
    ],
  },
  18: {
    title: 'Đề-xi-mét vuông, mét vuông, mi-li-mét vuông',
    points: [
      '1 dm² = 100 cm²; 1 m² = 100 dm²; 1 cm² = 100 mm².',
      'Đổi đơn vị diện tích và tính diện tích hình vuông, hình chữ nhật với dm², m².',
    ],
  },
  19: {
    title: 'Giây, thế kỉ',
    points: [
      '1 phút = 60 giây.',
      '1 thế kỉ = 100 năm. Từ năm 1 đến năm 100 là thế kỉ I; từ năm 2001 đến năm 2100 là thế kỉ XXI. Thế kỉ viết bằng số La Mã.',
    ],
  },

  // ── Chủ đề 5: Phép cộng và phép trừ ──────────────────────────────────────
  22: {
    title: 'Phép cộng các số có nhiều chữ số',
    points: [
      'Đặt tính cộng: các chữ số cùng hàng thẳng cột, cộng từ phải sang trái, nhớ sang hàng bên trái.',
      'Vận dụng phép cộng số lớn vào bài toán thực tế; thử lại phép cộng.',
    ],
  },
  23: {
    title: 'Phép trừ các số có nhiều chữ số',
    points: [
      'Đặt tính trừ: các chữ số cùng hàng thẳng cột, trừ từ phải sang trái, có nhớ thì cộng thêm 1 vào số trừ ở hàng bên trái.',
      'Vận dụng phép trừ số lớn vào bài toán thực tế; thử lại phép trừ bằng phép cộng.',
    ],
  },
  24: {
    title: 'Tính chất giao hoán và kết hợp của phép cộng',
    points: [
      '<b>Giao hoán</b>: a + b = b + a (đổi chỗ các số hạng thì tổng không đổi).',
      '<b>Kết hợp</b>: (a + b) + c = a + (b + c).',
      'Tính bằng cách thuận tiện: nhóm các số có tổng tròn chục, tròn trăm, tròn nghìn.',
    ],
  },
  25: {
    title: 'Tìm hai số biết tổng và hiệu của hai số đó',
    points: [
      'Số lớn = (Tổng + Hiệu) : 2; Số bé = (Tổng − Hiệu) : 2. Vẽ sơ đồ đoạn thẳng để thấy phần hơn.',
      'Giải bài toán thực tế dạng tổng và hiệu, thử lại: hai số cộng lại bằng tổng, trừ đi bằng hiệu.',
    ],
  },

  // ── Chủ đề 6: Đường thẳng vuông góc, đường thẳng song song ──────────────
  27: {
    title: 'Hai đường thẳng vuông góc',
    points: [
      'Hai đường thẳng vuông góc cắt nhau tạo thành <b>bốn góc vuông</b> chung đỉnh.',
      'Dùng ê ke để kiểm tra hai đường thẳng (hai cạnh) có vuông góc với nhau không.',
    ],
  },
  29: {
    title: 'Hai đường thẳng song song',
    points: [
      'Hai đường thẳng song song <b>không bao giờ cắt nhau</b> dù kéo dài mãi về hai phía.',
      'Nhận ra cặp cạnh song song trong hình chữ nhật, hình vuông, hình thang và trong đồ vật thật.',
    ],
  },
  31: {
    title: 'Hình bình hành, hình thoi',
    points: [
      '<b>Hình bình hành</b> có hai cặp cạnh đối diện song song và bằng nhau.',
      '<b>Hình thoi</b> có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.',
    ],
  },
};
