/** Kiểm tra tổng hợp 1 (Đề 2): Bài 1–6 Toán 5 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { decLine } from './art.js';

export default {
  id: 'l5-th-01b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 2)',
  short: 'Tổng hợp 1 · Đề 2',
  after: { book: 'tool5', units: '1-6' },
  desc: 'Viết số thành tổng; thứ tự thực hiện phép tính, tổng và hiệu; phân số bằng nhau; phân số thập phân trên tia số; các phép tính với phân số; cộng, trừ phân số khác mẫu số, phân số của một số',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 806 054 = 800 000 + 6 000 + 50 + 4. Nhiễu: đặt 6 vào hàng chục nghìn (60 000), bớt một chữ số 0 ở hàng trăm nghìn (80 000), đặt 5 vào hàng trăm (500).
      { type: 'mc', bai: 1, point: 2, level: 1, cols: 1,
        prompt: 'Số 806 054 viết thành tổng là:',
        options: ['800 000 + 6 000 + 50 + 4', '800 000 + 60 000 + 50 + 4', '80 000 + 6 000 + 50 + 4', '800 000 + 6 000 + 500 + 4'], ans: 0 },
      // Nhân cả tử và mẫu với cùng một số: {2/3} = {10/15} (× 5), {3/4} = {9/12} (× 3), {4/5} = {16/20} (× 4), {1/6} = {4/24} (× 4).
      { type: 'match', bai: 3, point: 1, level: 1,
        prompt: 'Nối hai phân số bằng nhau:',
        left: ['{2/3}', '{3/4}', '{4/5}', '{1/6}'],
        right: ['{16/20}', '{4/24}', '{10/15}', '{9/12}'],
        ans: [2, 3, 0, 1] },
      // Đoạn 0 đến 1 chia 10 phần, A ở vạch thứ 7: {7/10}. Nhiễu: nhầm mỗi phần là {1/100} ({7/100}), đếm từ 1 về ({3/10}), đảo tử mẫu ({10/7}).
      { type: 'mc', bai: 4, point: 3, level: 1,
        prompt: 'Trên tia số, đoạn từ 0 đến 1 được chia thành 10 phần bằng nhau. Điểm A ứng với phân số thập phân nào?',
        fig: decLine({ labels: { 7: 'A' } }),
        options: ['{7/100}', '{7/10}', '{3/10}', '{10/7}'], ans: 1 },
      // Ý sai: cộng tử với tử, mẫu với mẫu ({1/2} + {1/3} ≠ {2/5}, đúng là {5/6}); nhân mà lại cộng ({3/4} × {2/5} = {6/20} = {3/10}, không phải {5/9}).
      // Đúng: cùng mẫu cộng tử giữ mẫu; chia: {4/5} × {3/2} = {12/10} = {6/5}.
      { type: 'tf', bai: 5, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{2/7} + {3/7} = {5/7}', '{1/2} + {1/3} = {2/5}', '{4/5} : {2/3} = {6/5}', '{3/4} × {2/5} = {5/9}'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // 12 chia hết cho 4: mẫu số chung 12. {1/4} + {5/12} = {3/12} + {5/12} = {8/12} = {2/3}.
      // Nhiễu: cộng tử, cộng mẫu ({6/16}), nhân hai phân số ({5/48}), cộng tử mà không quy đồng ({6/12}).
      { type: 'mc', bai: 6, point: 2, level: 2,
        prompt: 'Kết quả (đã rút gọn) của phép tính {1/4} + {5/12} là:',
        options: ['{6/16}', '{5/48}', '{2/3}', '{6/12}'], ans: 2 },
      // Nhân trước, trừ sau: 2 024 − 24 × 5 = 2 024 − 120 = 1 904. Nhiễu: trừ trước ((2 024 − 24) × 5 = 10 000), nhân sai 24 × 5 = 220 (1 804), cộng thay trừ (2 144).
      { type: 'mc', bai: 2, point: 2, level: 2,
        prompt: 'Giá trị của biểu thức 2 024 − 24 × 5 là:',
        options: ['10 000', '1 904', '1 804', '2 144'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Nhân với số có hai chữ số: tích riêng thứ hai lùi sang trái một cột; chia cho số có hai chữ số.
      { type: 'calc', bai: 2, point: 1, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['27 405 + 46 896', '70 000 − 38 527', '348 × 57', '9 156 : 42'] },
      // 3 − {5/4} = {12/4} − {5/4} = {7/4}; {5/6} − {1/4} = {10/12} − {3/12} = {7/12}; {3/10} + {2/5} = {3/10} + {4/10} = {7/10}.
      { type: 'fill', bai: 6, point: 3, level: 2,
        prompt: 'Tính (rút gọn nếu được):',
        items: [
          { t: '{3/10} + {2/5} = {…/…}', ans: [7, 10] },
          { t: '{5/6} − {1/4} = {…/…}', ans: [7, 12] },
          { t: '3 − {5/4} = {…/…}', ans: [7, 4] },
        ] },
      // Nửa chu vi là tổng, 12 m là hiệu: dài (64 + 12) : 2 = 38 m, rộng 38 − 12 = 26 m, diện tích 38 × 26 = 988 m².
      { type: 'fill', bai: 2, point: 4, level: 3,
        prompt: 'Một mảnh vườn hình chữ nhật có nửa chu vi là 64 m, chiều dài hơn chiều rộng 12 m. Tính diện tích mảnh vườn đó.',
        items: [
          { t: 'Chiều dài: (64 + 12) : 2 = … (m)', ans: [38] },
          { t: 'Chiều rộng: 38 − 12 = … (m)', ans: [26] },
          { t: 'Diện tích: 38 × 26 = … (m²)', ans: [988] },
        ] },
      // Phân số của một số: sách 150 000 × {2/5} = 60 000; bút 150 000 × {1/3} = 50 000; còn 150 000 − 60 000 − 50 000 = 40 000 đồng.
      { type: 'fill', bai: 5, point: 4, level: 3,
        prompt: 'Lan có 150 000 đồng. Lan mua sách hết {2/5} số tiền, mua bút hết {1/3} số tiền. Hỏi Lan còn lại bao nhiêu tiền?',
        items: [
          { t: 'Tiền mua sách: 150 000 × {2/5} = … (đồng)', ans: [60000] },
          { t: 'Tiền mua bút: 150 000 × {1/3} = … (đồng)', ans: [50000] },
          { t: 'Lan còn lại: 150 000 − … − … = … (đồng)', ans: [60000, 50000, 40000] },
        ] },
    ] },
  ],
};
