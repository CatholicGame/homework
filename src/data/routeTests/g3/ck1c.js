/** Kiểm tra cuối học kì I (Đề 3): Bài 1–44 Vở BT Toán 3 Tập Một (Nhanh 1 đến 11). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { circle, solids, thermometer } from './art.js';

export default {
  id: 'l3-ck-1c',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 3)',
  short: 'Cuối kì I · Đề 3',
  after: { book: 'workbook', units: '1-44' },
  desc: 'Cấu tạo số có ba chữ số; tên thành phần phép chia; hình tròn, khối hộp chữ nhật; phép chia có dư; gam, nhiệt độ; biểu thức có dấu ngoặc; bài toán hai bước tính',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: bỏ chữ số 0 hàng chục rồi đổi chỗ (680), bỏ hẳn hàng chục (68), viết 600 và 8 (6008).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Số gồm 6 trăm, 0 chục và 8 đơn vị là:',
        options: ['608', '680', '68', '6008'], ans: 0 },
      { type: 'match', bai: [4, 5, 11], point: 2, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['8 × 4', '27 : 3', '5 × 9', '40 : 5'],
        right: ['8', '45', '9', '32'], ans: [3, 2, 1, 0] },
      // Nhiễu: nhầm số chia với số bị chia, với thương, dùng tên của phép nhân (thừa số).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Trong phép chia 48 : 6 = 8, số 6 gọi là:',
        options: ['Số bị chia', 'Số chia', 'Thương', 'Thừa số'], ans: 1 },
      // AB đi qua tâm O nên là đường kính; OC là bán kính, ngắn bằng một nửa AB.
      { type: 'tf', bai: 17, point: 2, level: 1,
        prompt: 'Quan sát hình tròn. Đúng ghi Đ, sai ghi S:',
        fig: circle({ pts: { A: 30, B: 210, C: 120 }, segs: ['AB', 'OC'] }),
        items: ['O là tâm của hình tròn.', 'OC là bán kính của hình tròn.', 'AB là đường kính của hình tròn.', 'OC dài bằng AB.'],
        ans: ['Đ', 'Đ', 'Đ', 'S'] },
      // Nhiễu: khối trụ (hình 1), khối cầu (hình 3), khối lập phương (hình 4, mặt là hình vuông).
      { type: 'mc', bai: 21, point: 2, level: 1,
        prompt: 'Hình nào là khối hộp chữ nhật?',
        fig: solids([{ kind: 'cyl', label: 'Hình 1' }, { kind: 'box', label: 'Hình 2' }, { kind: 'ball', label: 'Hình 3' }, { kind: 'cube', label: 'Hình 4' }]),
        options: ['Hình 1', 'Hình 2', 'Hình 3', 'Hình 4'], ans: 1 },
      // 42 : 6 = 7. Nhiễu: "giảm đi 6 lần" làm thành trừ 6 (36), cộng 6 (48), nhân 6 (252).
      { type: 'mc', bai: 27, point: 2, level: 1,
        prompt: 'Giảm 42 đi 6 lần được:',
        options: ['7', '36', '48', '252'], ans: 0 },
      // 38 : 6 = 6 (dư 2), in "5 dư 8": số dư lớn hơn số chia. 45 : 7 = 6 (dư 3), in "dư 2": trừ sai.
      { type: 'tf', bai: 25, point: 2, level: 3,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['29 : 5 = 5 (dư 4)', '38 : 6 = 5 (dư 8)', '17 : 3 = 5 (dư 2)', '45 : 7 = 6 (dư 2)'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 2 kg = 2000 g; 2000 g + 300 g = 2300 g. Nhiễu: nghĩ 1 kg = 100 g (230 g), viết sai chỗ (2030 g), ghép số (23 g).
      { type: 'mc', bai: 31, point: 1, level: 2,
        prompt: '2 kg 300 g = … g. Số thích hợp viết vào chỗ chấm là:',
        options: ['2300', '230', '2030', '23'], ans: 0 },
      // Nhiệt kế chỉ 26 °C. Ý sai: đọc vạch số gần nhất (30 °C); 15 °C lạnh hơn 25 °C.
      { type: 'tf', bai: 33, point: 1, level: 1,
        prompt: 'Quan sát nhiệt kế. Đúng ghi Đ, sai ghi S:',
        fig: thermometer(26),
        items: ['Nhiệt kế chỉ 26 °C.', 'Nhiệt kế chỉ 30 °C.', '15 °C nóng hơn 25 °C.', 'Người khoẻ mạnh có nhiệt độ cơ thể khoảng 37 °C.'],
        ans: ['Đ', 'S', 'S', 'Đ'] },
      // 5 × 8 = 40. Nhiễu: bỏ ngoặc, tính 5 × 12 − 4 (56), chỉ tính trong ngoặc (8), quên trừ 4 (60).
      { type: 'mc', bai: 38, point: 3, level: 2,
        prompt: 'Giá trị của biểu thức 5 × (12 − 4) là:',
        options: ['40', '56', '8', '60'], ans: 0 },
      // 812 : 4 = 203. Nhiễu: quên viết 0 ở thương (23), viết 0 sai chỗ (230), lấy 812 − 4 (808).
      { type: 'mc', bai: 37, point: 2, level: 3,
        prompt: 'Thư viện có 812 quyển truyện, xếp đều vào 4 tủ. Mỗi tủ có:',
        options: ['203 quyển', '23 quyển', '230 quyển', '808 quyển'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [23, 26, 36, 37], point: 0, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['19 × 4', '57 : 3', '307 × 2', '945 : 5'] },
      // 9 × 4 = 36; 36 : 6 = 6; 6 × 7 = 42.
      { type: 'chain', bai: [9, 10, 12], point: 1, level: 2,
        prompt: 'Số?',
        items: [{ start: 9, steps: ['× 4', ': 6', '× 7'] }] },
      {
        type: 'word', bai: 31, point: 3, level: 2,
        text: 'Hộp bánh cân nặng 450 g, hộp kẹo nhẹ hơn hộp bánh 175 g. Hỏi hộp kẹo cân nặng bao nhiêu gam?',
        given: ['Hộp bánh nặng 450 g.', 'Hộp kẹo nhẹ hơn hộp bánh 175 g.'],
        ask: 'Hộp kẹo nặng bao nhiêu gam?',
        hint: 'Nhẹ hơn thì lấy 450 trừ đi 175.',
        sentence: ['Hộp kẹo', 'cân nặng', 'số gam', 'là:'],
        decoys: ['cả hai hộp'],
        expr: { a: 450, op: '−', b: 175, result: 275, unit: 'g' },
        units: ['g', 'kg', 'hộp'],
      },
      // Bước 1: 135 + 28 = 163 (cây). Bước 2: 135 + 163 = 298 (cây).
      { type: 'fill', bai: 28, point: 2, level: 3,
        prompt: 'Đội Một trồng được 135 cây, đội Hai trồng được nhiều hơn đội Một 28 cây. Hỏi cả hai đội trồng được bao nhiêu cây?',
        items: [
          { t: 'Đội Hai trồng được: … + … = … (cây)', ans: [135, 28, 163] },
          { t: 'Cả hai đội trồng được: … + … = … (cây)', ans: [135, 163, 298] },
        ] },
    ] },
  ],
};
