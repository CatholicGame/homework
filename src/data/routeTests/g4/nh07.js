/** Kiểm tra nhanh 7: Bài 22–26 Toán 4 (cộng, trừ các số có nhiều chữ số; tính chất giao hoán, kết hợp; tổng và hiệu). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { sumDiff } from './art.js';

export default {
  id: 'l4-nh-07',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 7',
  short: 'Nhanh 7',
  after: { book: 'tool4', units: '22-26' },
  desc: 'Cộng, trừ các số có nhiều chữ số; tính chất giao hoán, kết hợp; tổng và hiệu',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 254 638 + 127 457 = 382 095; 408 270 + 391 730 = 800 000.
      // Ý sai: 173 586 + 52 917 = 226 503, quên nhớ 1 từ hàng trăm sang hàng nghìn nên ra 225 503.
      { type: 'tf', bai: 22, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [
          { col: '254 638 + 127 457', res: '382 095' },
          { col: '173 586 + 52 917', res: '225 503' },
          { col: '408 270 + 391 730', res: '800 000' },
        ],
        ans: ['Đ', 'S', 'Đ'] },
      // Tính chất kết hợp. Nhiễu: đổi dấu cộng thành dấu nhân, bỏ ngoặc làm đổi thứ tự tính, đổi dấu thành trừ.
      { type: 'mc', bai: 24, point: 1, level: 1,
        prompt: 'Biểu thức nào có giá trị bằng (a + b) + c?',
        options: ['(a + b) × c', 'a + (b + c)', 'a + b × c', '(a − b) + c'], ans: 1 },
      // Số lớn = (90 + 20) : 2 = 55. Nhiễu: tìm ra số bé (35), chia đôi tổng (45), lấy tổng trừ hiệu (70).
      { type: 'mc', bai: 25, point: 0, level: 1,
        prompt: 'Tổng của hai số là 90, hiệu của hai số là 20. Số lớn là:',
        fig: sumDiff({ sum: '90', diff: '20' }),
        options: ['35', '45', '70', '55'], ans: 3 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 23, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['730 105 − 284 367', '600 000 − 45 728', '529 461 − 318 250'] },
      // Lớp 4A: (96 + 8) : 2 = 52 kg; lớp 4B: 52 − 8 = 44 kg (thử lại 52 + 44 = 96).
      { type: 'fill', bai: 25, point: 1, level: 3,
        prompt: 'Hai lớp 4A và 4B thu gom được tất cả 96 kg giấy vụn. Lớp 4A thu gom được nhiều hơn lớp 4B 8 kg. Hỏi mỗi lớp thu gom được bao nhiêu ki-lô-gam giấy vụn?',
        fig: sumDiff({ sum: '96 kg', diff: '8 kg', names: ['Lớp 4A', 'Lớp 4B'] }),
        items: [
          { t: 'Lớp 4A thu gom được: (96 + 8) : 2 = … (kg)', ans: 52 },
          { t: 'Lớp 4B thu gom được: 52 − 8 = … (kg)', ans: 44 },
        ] },
    ] },
  ],
};
