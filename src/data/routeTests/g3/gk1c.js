/** Kiểm tra giữa học kì I (Đề 3): Bài 1–22 Vở BT Toán 3 (Nhanh 1 đến 6). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { clock, circle, geo } from './art.js';

export default {
  id: 'l3-gk-1c',
  kind: 'giuaki',
  title: 'Kiểm tra giữa học kì I (Đề 3)',
  short: 'Giữa kì I · Đề 3',
  after: { book: 'workbook', units: '1-22' },
  desc: 'Trăm, chục, đơn vị; cộng, trừ nhẩm số tròn trăm; giờ buổi chiều; bảng nhân, bảng chia 6, 7, 8, 9; một phần mấy; tìm số bị trừ; bán kính, góc vuông, hình tứ giác, khối hộp chữ nhật',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đổi chỗ chục và đơn vị (490), viết rời 400 và 9 (4009), quên hàng chục (49).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Số gồm 4 trăm, 0 chục và 9 đơn vị là:',
        options: ['490', '409', '4009', '49'], ans: 1 },
      // Ý sai: nhầm sang 6 × 9 = 54 thành 56 (lẫn với 7 × 8), lệch một hàng trong bảng chia 6 (36 : 6 là 6).
      { type: 'tf', bai: 9, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['6 × 7 = 42', '6 × 9 = 56', '48 : 6 = 8', '36 : 6 = 7'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 5 trăm + 3 trăm − 2 trăm = 6 trăm. Nhiễu: quên trừ (800), cộng cả ba số (1 000), trừ trước rồi cộng nhầm thứ tự (400 = 500 − 300 + 200).
      { type: 'mc', bai: 2, point: 0, level: 1,
        prompt: 'Tính nhẩm: 500 + 300 − 200 = ?',
        options: ['800', '1 000', '600', '400'], ans: 2 },
      // 18 : 6 = 3.
      { type: 'pick', bai: 14, point: 3, level: 1,
        prompt: 'Khoanh vào {1/6} số quả cam:',
        icon: 'orange', count: 18, cols: 6, ans: 3 },
      // 4 giờ chiều = 4 + 12 = 16 giờ. Nhiễu: cộng 10 (14 giờ), giữ nguyên (4 giờ), nhầm với giữa trưa (12 giờ).
      { type: 'mc', bai: 7, point: 2, level: 1,
        prompt: 'Buổi chiều, đồng hồ chỉ giờ như hình bên. Giờ đó còn gọi là:',
        fig: clock(4, 0),
        options: ['14 giờ', '16 giờ', '4 giờ', '12 giờ'], ans: 1 },
      // 8 × 7 = 56, 9 × 6 = 54, 72 : 9 = 8, 63 : 9 = 7.
      { type: 'match', bai: [11, 12], point: 2, level: 2,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['8 × 7', '9 × 6', '72 : 9', '63 : 9'],
        right: ['7', '8', '54', '56'], ans: [3, 2, 1, 0] },
      // MN qua tâm I là đường kính, NP không qua tâm. Nhiễu: chọn đường kính (MN), đoạn không qua tâm (NP).
      { type: 'mc', bai: 17, point: 1, level: 1,
        prompt: 'Trong hình tròn tâm I, đoạn thẳng nào là bán kính?',
        fig: circle({ center: 'I', pts: { M: 20, N: 200, P: 110 }, segs: ['MN', 'IP', 'NP'] }),
        options: ['MN', 'IP', 'NP'], ans: 1 },
      // Ý sai: nhầm số cạnh (12) với số mặt (6).
      { type: 'tf', bai: 21, point: 2, level: 1,
        prompt: 'Bao diêm có dạng khối hộp chữ nhật. Đúng ghi Đ, sai ghi S:',
        items: ['Khối hộp chữ nhật có 8 đỉnh.', 'Khối hộp chữ nhật có 6 cạnh.', 'Các mặt của khối hộp chữ nhật là hình chữ nhật.', 'Khối hộp chữ nhật có 6 mặt.'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // Đi vòng quanh hình bắt đầu từ N: N, P, Q, M. Nhiễu: đọc chéo qua hình (MPNQ, MNQP).
      { type: 'mc', bai: 19, point: 1, level: 3,
        prompt: 'Tên nào dưới đây là tên của hình tứ giác bên?',
        fig: geo({ pts: { M: [40, 35], N: [200, 25], P: [230, 125], Q: [20, 115] }, segs: ['MN', 'NP', 'PQ', 'QM'],
          pos: { M: 'n', N: 'n', P: 's', Q: 's' }, w: 250, h: 150 }),
        options: ['MPNQ', 'NPQM', 'MNQP'], ans: 1 },
      // 4 góc của hình chữ nhật + 2 góc ở M + 2 góc ở N = 8. Nhiễu: chỉ đếm 4 góc của hình lớn (4), quên một bên M hoặc N (6), chỉ đếm 2 góc ở M (2).
      { type: 'mc', bai: 18, point: 3, level: 3,
        prompt: 'Hình chữ nhật ABCD được chia bởi đoạn thẳng MN như hình bên. Hình bên có tất cả bao nhiêu góc vuông?',
        fig: geo({ pts: { A: [20, 25], M: [110, 25], B: [260, 25], C: [260, 115], N: [110, 115], D: [20, 115] },
          segs: ['AM', 'MB', 'BC', 'CN', 'ND', 'DA', 'MN'], pos: { C: 's', N: 's', D: 's' }, w: 280, h: 145 }),
        options: ['4 góc', '6 góc', '8 góc', '2 góc'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 2, level: 2,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['538 + 296', '704 − 268', '95 + 387', '461 − 83'] },
      // 42 : 6 = 7, × 8 = 56, : 7 = 8; 9 × 4 = 36, : 6 = 6, × 9 = 54.
      { type: 'chain', bai: [6, 9, 10, 11, 12], point: 2, level: 2,
        prompt: 'Số?',
        items: [{ start: 42, steps: [': 6', '× 8', ': 7'] }, { start: 9, steps: ['× 4', ': 6', '× 9'] }] },
      {
        type: 'word', bai: 14, point: 3, level: 2,
        text: 'Một bể cá cảnh có 48 con cá, trong đó {1/6} số cá là cá vàng. Hỏi bể có bao nhiêu con cá vàng?',
        given: ['Bể có 48 con cá.', '{1/6} số cá là cá vàng.'],
        ask: 'Bể có bao nhiêu con cá vàng?',
        hint: 'Muốn tìm {1/6} của 48 con cá thì lấy 48 chia cho 6.',
        sentence: ['Bể', 'có số', 'con cá vàng', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 48, op: ':', b: 6, result: 8, unit: 'con cá' },
        units: ['con cá', 'bể', 'lần'],
      },
      // Số bị trừ = 427 + 186 = 613; 613 + 187 = 800.
      { type: 'fill', bai: 3, point: 3, level: 3,
        prompt: 'Một số trừ đi 186 thì được 427. Viết số thích hợp vào chỗ chấm:',
        items: [{ t: 'Số đó là: …', ans: 613 }, { t: 'Số đó cộng với 187 thì được: …', ans: 800 }] },
    ] },
  ],
};
