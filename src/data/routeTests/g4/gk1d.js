/** Kiểm tra giữa học kì I (Đề 4): Bài 1–21 Toán 4 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { angles, clock } from './art.js';

export default {
  id: 'l4-gk-1d',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 4)',
  short: 'Giữa kì I · Đề 4',
  after: { book: 'tool4', units: '1-21' },
  desc: 'Số đến lớp triệu; viết số thành tổng; số chẵn; biểu thức chứa chữ; chu vi; bài toán ba bước; góc nhọn, góc bẹt; làm tròn số; dãy số tự nhiên; tạ, tấn, mét vuông, giây',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 3 chục triệu, 5 triệu, 2 trăm nghìn, 8 chục: 35 200 080.
      // Nhiễu: đặt 8 vào hàng trăm (35 200 800), thiếu hàng chục triệu (3 520 080), đặt 2 vào hàng chục nghìn (35 020 080).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Số gồm 3 chục triệu, 5 triệu, 2 trăm nghìn và 8 chục viết là:',
        options: ['35 200 080', '35 200 800', '3 520 080', '35 020 080'], ans: 0 },
      // Nhiễu: chữ số 0 ở hàng chục bị gán cho chữ số 5 (50), bỏ một chữ số 0 ở mỗi hàng (4 000 + 600 + …), lệch hàng của chữ số 2 (20).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số 46 205 viết thành tổng các hàng là:',
        options: ['40 000 + 6 000 + 200 + 5', '40 000 + 6 000 + 200 + 50', '4 000 + 600 + 20 + 5', '40 000 + 6 000 + 20 + 5'], cols: 1, ans: 0 },
      // Ý sai: nhầm 1 dm² = 10 cm² (đúng là 100 cm²), nhầm 5 m² = 50 dm² (đúng là 500 dm²).
      { type: 'tf', bai: 18, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 m² = 100 dm²', '1 dm² = 10 cm²', '1 cm² = 100 mm²', '5 m² = 50 dm²'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Góc nhọn: Góc 1 (40°) và Góc 4 (70°). Nhiễu: đếm cả góc vuông (3 góc), đếm tất cả (4 góc), chỉ thấy góc nhỏ nhất (1 góc).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: 'Trong các góc dưới đây, có mấy góc nhọn?',
        fig: angles([
          { v: 'O', a: 'A', b: 'B', deg: 40, label: 'Góc 1' },
          { v: 'E', a: 'G', b: 'H', deg: 90, label: 'Góc 2' },
          { v: 'K', a: 'M', b: 'N', deg: 130, label: 'Góc 3' },
          { v: 'P', a: 'Q', b: 'R', deg: 70, label: 'Góc 4' },
        ]),
        options: ['1 góc', '2 góc', '3 góc', '4 góc'], ans: 1 },
      // 1 phút 5 giây = 60 + 5 = 65 giây. Nhiễu: ghép 1 và 05 (105), quên 5 giây (60), lấy 1 + 5 (6).
      { type: 'mc', bai: 19, point: 0, level: 1,
        prompt: 'Bạn Minh chạy 100 m hết 1 phút 5 giây. Bạn Minh chạy hết bao nhiêu giây?',
        options: ['65 giây', '105 giây', '60 giây', '6 giây'], ans: 0 },
      // Xét chữ số hàng chục nghìn: 1 349 000 → 1 300 000; 1 450 600 → 1 500 000; 1 562 300 → 1 600 000; 1 239 000 → 1 200 000.
      { type: 'match', bai: 13, point: 0, level: 2,
        prompt: 'Nối mỗi số với số làm tròn đến hàng trăm nghìn của nó:',
        left: ['1 349 000', '1 450 600', '1 562 300', '1 239 000'],
        right: ['1 200 000', '1 300 000', '1 500 000', '1 600 000'], ans: [1, 2, 3, 0] },
      // 23 086 tận cùng là 6. Nhiễu: nhìn chữ số đầu chẵn thay vì chữ số tận cùng (4 571, 67 239), nhìn chữ số 0 ở giữa (90 413).
      { type: 'mc', bai: 3, point: 0, level: 1,
        prompt: 'Trong các số dưới đây, số nào là số chẵn?',
        options: ['4 571', '23 086', '90 413', '67 239'], ans: 1 },
      // Ý sai: quả dưa hấu nặng vài ki-lô-gam, không phải 3 tấn (chọn sai đơn vị lớn).
      { type: 'tf', bai: 17, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Con bò nặng khoảng 3 tạ.', 'Quả dưa hấu nặng khoảng 3 tấn.', 'Xe tải chở được 5 tấn hàng.', 'Bao gạo nặng 5 yến tức là nặng 50 kg.'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // 250 × 4 − 6 = 994. Nhiễu: quên trừ c (1 000), cộng cả ba số (260), cộng c thay vì trừ (1 006).
      { type: 'mc', bai: 4, point: 1, level: 2,
        prompt: 'Với a = 250, b = 4, c = 6 thì giá trị của biểu thức a × b − c là:',
        options: ['994', '1 000', '260', '1 006'], ans: 0 },
      // Lúc 6 giờ hai kim nằm trên một đường thẳng: góc bẹt. Nhiễu: góc vuông (lúc 3 giờ), góc nhọn, góc tù.
      { type: 'mc', bai: 8, point: 1, level: 1,
        prompt: 'Lúc 6 giờ đúng, kim giờ và kim phút của đồng hồ tạo thành góc gì?',
        fig: clock(6, 0),
        options: ['Góc bẹt', 'Góc vuông', 'Góc nhọn', 'Góc tù'], ans: 0 },
      // Các số 1 996, 1 997, …, 2 025: 2 025 − 1 996 + 1 = 30 số.
      // Nhiễu: lấy 2 026 − 1 995 (31), tính cả hai số đầu cuối (32), cộng hai số (4 021).
      { type: 'mc', bai: 15, point: 1, level: 3,
        prompt: 'Có bao nhiêu số tự nhiên lớn hơn 1 995 và bé hơn 2 026?',
        options: ['30 số', '31 số', '32 số', '4 021 số'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['38 469 + 45 875', '60 214 − 27 538', '17 086 × 5', '92 736 : 4'] },
      // 3 tấn = 3 000 kg; 5 tạ 6 kg = 506 kg; 2 phút 10 giây = 130 giây; 4 m² = 400 dm².
      { type: 'compare', bai: [17, 18, 19], point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: [
          { t: '3 tấn □ 2 900 kg', ans: '>' },
          { t: '5 tạ 6 kg □ 560 kg', ans: '<' },
          { t: '2 phút 10 giây □ 130 giây', ans: '=' },
          { t: '4 m² □ 390 dm²', ans: '>' },
        ] },
      {
        type: 'word', bai: 2, point: 1, level: 2,
        text: 'Một xưởng làm được 6 384 hộp bánh, người ta xếp đều số hộp bánh đó lên 8 xe tải. Hỏi mỗi xe tải chở bao nhiêu hộp bánh?',
        given: ['Có 6 384 hộp bánh.', 'Xếp đều lên 8 xe tải.'],
        ask: 'Mỗi xe tải chở bao nhiêu hộp bánh?',
        hint: 'Xếp đều lên 8 xe thì lấy 6 384 chia cho 8.',
        sentence: ['Mỗi xe tải', 'chở được', 'số hộp bánh', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 6384, op: ':', b: 8, result: 798, unit: 'hộp bánh' },
        units: ['hộp bánh', 'xe tải', 'kg'],
      },
      // Chiều rộng 36 − 14 = 22 m; chu vi (36 + 22) × 2 = 116 m; tiền rào 116 × 25 000 = 2 900 000 đồng.
      { type: 'fill', bai: [4, 5], point: 1, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật có chiều dài 36 m, chiều rộng ngắn hơn chiều dài 14 m. Người ta rào xung quanh mảnh vườn, mỗi mét hàng rào giá 25 000 đồng. Hỏi rào hết bao nhiêu tiền?',
        items: [
          { t: 'Chiều rộng mảnh vườn: 36 − 14 = … (m)', ans: [22] },
          { t: 'Chu vi mảnh vườn: (36 + 22) × 2 = … (m)', ans: [116] },
          { t: 'Số tiền rào vườn: 116 × 25 000 = … (đồng)', ans: [2900000] },
        ] },
    ] },
  ],
};
