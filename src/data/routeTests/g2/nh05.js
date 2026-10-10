/** Kiểm tra nhanh 5: Bài 15–18 Vở BT Toán 2 (ki-lô-gam, lít). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { balance, pourCups } from './art.js';

export default {
  id: 'l2-nh-05',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 5',
  short: 'Nhanh 5',
  after: { book: 'workbook2', units: '15-18' },
  desc: 'Ki-lô-gam, lít; cộng, trừ số đo khối lượng, dung tích',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Bẫy: quả bóng to hơn nhưng đĩa bên hộp quà thấp hơn.
      { type: 'mc', bai: 15, point: 0, level: 1,
        prompt: 'Vật nào nặng hơn?',
        fig: balance([{ kind: 'hop', size: 50 }], [{ kind: 'bong', size: 66 }], { tilt: 'left' }),
        options: ['Hộp quà', 'Quả bóng', 'Hai vật nặng bằng nhau'], ans: 0 },
      // Nhiễu: chỉ đọc một quả cân (2 kg, 1 kg), ghép hai số (21 kg).
      { type: 'mc', bai: 15, point: 2, level: 1,
        prompt: 'Cân thăng bằng. Quả bí cân nặng mấy ki-lô-gam?',
        fig: balance([{ kind: 'bi_ngo', size: 62 }], [2, 1]),
        options: ['2 kg', '3 kg', '1 kg', '21 kg'], ans: 1 },
      // Nhiễu: chỉ đếm một ca (1 l), đếm thiếu (4 l), đếm cả can (6 l).
      { type: 'mc', bai: 16, point: 1, level: 1,
        prompt: 'Rót hết nước trong can sang được đầy các ca 1 l như hình. Can có bao nhiêu lít nước?',
        fig: pourCups({ kind: 'can', l: 5, label: false }, 5),
        options: ['1 l', '4 l', '5 l', '6 l'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [15, 16], point: 3, level: 2,
        prompt: 'Tính:',
        items: [
          { t: '7 kg + 8 kg', ans: 15, unit: 'kg' }, { t: '16 kg − 9 kg', ans: 7, unit: 'kg' },
          { t: '5 l + 6 l', ans: 11, unit: 'l' }, { t: '20 l − 5 l', ans: 15, unit: 'l' },
        ] },
      {
        type: 'word', bai: 16, point: 2, level: 3,
        text: 'Can to đựng 12 l nước mắm, can bé đựng ít hơn can to 5 l nước mắm. Hỏi can bé đựng bao nhiêu lít nước mắm?',
        given: ['Can to đựng 12 l.', 'Can bé ít hơn can to 5 l.'],
        ask: 'Can bé đựng bao nhiêu lít nước mắm?',
        hint: 'Ít hơn thì lấy số lít của can to trừ đi 5.',
        sentence: ['Can bé', 'đựng được', 'số lít nước mắm', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 12, op: '−', b: 5, result: 7, unit: 'l' },
        units: ['l', 'kg', 'can'],
      },
    ] },
  ],
};
