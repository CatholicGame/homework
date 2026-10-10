/** Kiểm tra nhanh 11: Bài 38–44 Vở BT Toán 3 (biểu thức số; so sánh số lớn gấp mấy lần số bé; ôn hình học và đo lường). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { circle } from './art.js';

export default {
  id: 'l3-nh-11',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 11',
  short: 'Nhanh 11',
  after: { book: 'workbook', units: '38-44' },
  desc: 'Biểu thức số; so sánh số lớn gấp mấy lần số bé; ôn hình học và đo lường',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: tính từ trái sang phải (140), cộng cả ba số (39), lấy 5 × 4 (20).
      { type: 'mc', bai: 38, point: 2, level: 1,
        prompt: 'Giá trị của biểu thức 30 + 5 × 4 là:',
        options: ['50', '140', '39', '20'], ans: 0 },
      // Số lớn gấp mấy lần số bé: lấy số lớn chia cho số bé.
      { type: 'match', bai: 39, point: 0, level: 1,
        prompt: 'Nối mỗi câu hỏi với câu trả lời đúng:',
        left: ['12 gấp mấy lần 4?', '20 gấp mấy lần 5?', '18 gấp mấy lần 9?'],
        right: ['2 lần', '3 lần', '4 lần'],
        ans: [1, 2, 0] },
      // Nhiễu: lấy bằng bán kính (3 cm), nhân 3 (9 cm), cộng thêm 2 (5 cm).
      { type: 'mc', bai: 43, point: 3, level: 1,
        prompt: 'Hình tròn tâm O có bán kính OA = 3 cm. Đường kính AB dài bao nhiêu xăng-ti-mét?',
        fig: circle({ pts: { A: 180, B: 0 }, segs: ['AO', 'OB'], lens: { AO: '3 cm' } }),
        options: ['3 cm', '9 cm', '6 cm', '5 cm'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 38, point: 3, level: 2,
        prompt: 'Tính giá trị của biểu thức:',
        items: [
          '120 + 36 : 4',
          '96 : 3 × 2',
          { t: '(45 − 15) : 5', ans: 6 },
          { t: '8 × (17 − 9)', ans: 64 },
        ] },
      {
        type: 'word', bai: 39, point: 3, level: 3,
        text: 'Sợi dây xanh dài 4 dm. Sợi dây đỏ dài 8 cm. Hỏi sợi dây xanh dài gấp mấy lần sợi dây đỏ?',
        given: ['Dây xanh dài 4 dm, mà 4 dm = 40 cm.', 'Dây đỏ dài 8 cm.'],
        ask: 'Dây xanh dài gấp mấy lần dây đỏ?',
        hint: 'Đổi về cùng đơn vị xăng-ti-mét, rồi lấy số lớn chia cho số bé.',
        sentence: ['Sợi dây xanh', 'dài gấp', 'sợi dây đỏ', 'số lần là:'],
        decoys: ['còn lại'],
        expr: { a: 40, op: ':', b: 8, result: 5, unit: 'lần' },
        units: ['lần', 'cm', 'dm'],
      },
    ] },
  ],
};
