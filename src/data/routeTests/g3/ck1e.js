/** Kiểm tra cuối học kì I (Đề 5): Bài 1–44 Vở BT Toán 3 Tập Một (Nhanh 1 đến 11). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { circle, geo } from './art.js';

export default {
  id: 'l3-ck-1e',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 5)',
  short: 'Cuối kì I · Đề 5',
  after: { book: 'workbook', units: '1-44' },
  desc: 'Trừ có nhớ trong phạm vi 1 000; bảng nhân; bán kính, đường kính; đếm hình tam giác; gấp lên, giảm đi một số lần; mi-li-mét; biểu thức số; tìm thành phần chưa biết',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: số liền trước (698), viết 69 và 10 (6910), chỉ thêm 1 chục rồi bỏ đơn vị (690).
      { type: 'mc', bai: 1, point: 4, level: 1,
        prompt: 'Số liền sau của 699 là:',
        options: ['700', '698', '6910', '690'], ans: 0 },
      // 615 − 238 = 377. Nhiễu: lấy số lớn trừ số bé ở từng hàng (423), quên trả 1 sang hàng trăm (487), làm phép cộng (853).
      { type: 'mc', bai: 2, point: 3, level: 1,
        prompt: 'Kết quả của phép tính 615 − 238 là:',
        options: ['377', '423', '487', '853'], ans: 0 },
      { type: 'match', bai: [5, 6, 9, 12], point: 2, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['3 × 7', '6 × 6', '4 × 8', '9 × 5'],
        right: ['36', '21', '45', '32'], ans: [1, 0, 3, 2] },
      // 10 : 2 = 5. Nhiễu: lấy cả đường kính (10 cm), gấp đôi (20 cm), lấy 10 + 5 (15 cm).
      { type: 'mc', bai: 17, point: 2, level: 1,
        prompt: 'Hình tròn tâm O có đường kính MN dài 10 cm. Bán kính OM dài:',
        fig: circle({ pts: { M: 180, N: 0 }, segs: ['MN'] }),
        options: ['5 cm', '10 cm', '20 cm', '15 cm'], ans: 0 },
      { type: 'pick', bai: 14, point: 3, level: 1,
        prompt: 'Khoanh vào {1/5} số quả cam:',
        icon: 'orange', count: 20, cols: 5, ans: 4 },
      // 7 × 5 = 35. Nhiễu: "gấp 5 lần" làm thành cộng 5 (12), lấy 7 − 5 (2), nhầm bảng nhân (30).
      { type: 'mc', bai: 24, point: 2, level: 2,
        prompt: 'Năm nay con 7 tuổi, tuổi mẹ gấp 5 lần tuổi con. Năm nay mẹ:',
        options: ['35 tuổi', '12 tuổi', '2 tuổi', '30 tuổi'], ans: 0 },
      // 85 : 5 = 17, in 16; giảm 50 đi 5 lần là 10, in 45 (làm thành trừ 5).
      { type: 'tf', bai: [26, 27], point: 1, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['96 : 3 = 32', '85 : 5 = 16', 'Giảm 64 đi 4 lần được 16.', 'Giảm 50 đi 5 lần được 45.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 128 × 4 = 512. Nhiễu: quên nhớ 3 sang hàng chục (482), quên nhớ 1 sang hàng trăm (412), làm phép cộng (132).
      { type: 'mc', bai: 36, point: 2, level: 1,
        prompt: 'Kết quả của phép tính 128 × 4 là:',
        options: ['512', '482', '412', '132'], ans: 0 },
      // Ý sai: nghĩ 1 m = 100 mm (1 m = 1000 mm); viết 3 cm 2 mm thành 302 mm (đúng là 32 mm).
      { type: 'tf', bai: 30, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['4 cm 5 mm = 45 mm', '1 m = 100 mm', '60 mm = 6 cm', '3 cm 2 mm = 302 mm'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Tam giác ABD, ADC, ABC (B, D, C thẳng hàng). Nhiễu: chỉ đếm hai hình nhỏ (2), đếm thừa (4), chỉ thấy hình lớn (1).
      { type: 'mc', bai: 19, point: 4, level: 3,
        prompt: 'Hình bên có bao nhiêu hình tam giác?',
        fig: geo({ pts: { A: [150, 22], B: [30, 128], D: [120, 128], C: [270, 128] }, segs: ['AB', 'AC', 'BC', 'AD'], pos: { B: 'sw', D: 's', C: 'se' }, h: 156 }),
        options: ['3 hình', '2 hình', '4 hình', '1 hình'], ans: 0 },
      // 8 × 3 + 6 = 30 (nghìn đồng). Nhiễu: nhân nhầm giá bút (8 + 3 × 6), cộng giá bút rồi nhân ((8 + 6) × 3), nhân tất cả (8 × 3 × 6).
      { type: 'mc', bai: 38, point: 2, level: 3,
        prompt: 'Lan mua 3 quyển vở, mỗi quyển giá 8 nghìn đồng, và 1 cây bút giá 6 nghìn đồng. Biểu thức tính số tiền Lan phải trả (nghìn đồng) là:',
        options: ['8 × 3 + 6', '8 + 3 × 6', '(8 + 6) × 3', '8 × 3 × 6'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [23, 26, 36, 37], point: 0, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['63 × 4', '91 : 7', '172 × 5', '609 : 3'] },
      { type: 'findx', bai: [3, 13], point: 3, level: 2,
        prompt: 'Tìm x:',
        items: ['x − 147 = 285', '8 × x = 56', '72 : x = 9'] },
      {
        type: 'word', bai: 39, point: 0, level: 2,
        text: 'Bao gạo cân nặng 45 kg, bao đường cân nặng 5 kg. Hỏi bao gạo nặng gấp mấy lần bao đường?',
        given: ['Bao gạo nặng 45 kg.', 'Bao đường nặng 5 kg.'],
        ask: 'Bao gạo nặng gấp mấy lần bao đường?',
        hint: 'Muốn biết số lớn gấp mấy lần số bé, lấy 45 chia cho 5.',
        sentence: ['Bao gạo', 'nặng gấp', 'bao đường', 'số lần là:'],
        decoys: ['nhiều hơn'],
        expr: { a: 45, op: ':', b: 5, result: 9, unit: 'lần' },
        units: ['lần', 'kg', 'bao'],
      },
      // Bước 1: 96 : 4 = 24 (kg). Bước 2: 96 − 24 = 72 (kg).
      { type: 'fill', bai: [14, 28], point: 3, level: 3,
        prompt: 'Cửa hàng có 96 kg đường, đã bán được {1/4} số đường đó. Hỏi cửa hàng còn lại bao nhiêu ki-lô-gam đường?',
        items: [
          { t: 'Đã bán: … : … = … (kg)', ans: [96, 4, 24] },
          { t: 'Còn lại: … − … = … (kg)', ans: [96, 24, 72] },
        ] },
    ] },
  ],
};
