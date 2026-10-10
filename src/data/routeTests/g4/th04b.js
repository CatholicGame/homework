/** Kiểm tra tổng hợp 4 (Đề 2): Bài 22–32 Toán 4 (Nhanh 7 + Nhanh 8, ôn Bài 1–21). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo, sumDiff } from './art.js';

export default {
  id: 'l4-th-04b',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 4 (Đề 2)',
  short: 'Tổng hợp 4 · Đề 2',
  after: { book: 'tool4', units: '22-32' },
  desc: 'Cộng, trừ có nhớ số nhiều chữ số; tính chất kết hợp, tính thuận tiện; tổng và hiệu; vuông góc, song song; chu vi hình thoi; ôn làm tròn số, tấn và ki-lô-gam',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Ý sai: quên trừ số nhớ ở hàng trăm nghìn (624 150 − 387 465 = 236 685, không phải 336 685);
      // quên trừ số nhớ ở hàng chục nghìn (90 000 − 45 678 = 44 322, không phải 54 322).
      { type: 'tf', bai: [22, 23], point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [
          { col: '356 427 + 218 595', res: '575022' },
          { col: '624 150 − 387 465', res: '336685' },
          { col: '48 975 + 7 386', res: '56361' },
          { col: '90 000 − 45 678', res: '54322' },
        ],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Kết hợp: (a + b) + c = a + (b + c). Nhiễu: điền số hạng đứng đầu (1 465), chép lại số trong ngoặc (2 380), điền tổng trong ngoặc (3 000).
      { type: 'mc', bai: 24, point: 1, level: 1,
        prompt: 'Số thích hợp điền vào chỗ chấm: (1 465 + 2 380) + 620 = 1 465 + (2 380 + …)',
        options: ['620', '1 465', '2 380', '3 000'], ans: 0 },
      // Nhiễu: lẫn với vuông góc (bốn góc vuông), nghĩ hai đường nào cũng cắt nhau, nghĩ kéo dài thì cắt.
      { type: 'mc', bai: 29, point: 0, level: 1, cols: 1,
        prompt: 'Hai đường thẳng song song với nhau thì:',
        options: ['Không bao giờ cắt nhau dù kéo dài mãi về hai phía', 'Cắt nhau tạo thành bốn góc vuông', 'Cắt nhau tại một điểm', 'Chỉ cắt nhau khi được kéo dài ra'], ans: 0 },
      // A và D là góc vuông. Ý sai: BC lệch nên không vuông góc với DC, cũng không vuông góc với AB.
      { type: 'tf', bai: 27, point: 1, level: 1,
        prompt: 'Dùng ê ke kiểm tra rồi ghi Đ (đúng), S (sai):',
        fig: geo({ pts: { A: [40, 30], B: [200, 30], C: [260, 120], D: [40, 120] }, segs: ['AB', 'BC', 'CD', 'DA'],
          pos: { C: 's', D: 's' }, w: 300, h: 150 }),
        items: ['AB vuông góc với AD.', 'AD vuông góc với DC.', 'BC vuông góc với DC.', 'AB vuông góc với BC.'],
        ans: ['Đ', 'Đ', 'S', 'S'] },
      // Hình thoi có bốn cạnh bằng nhau: P = 6 × 4 = 24 cm. Nhiễu: chỉ nhân 2 (12 cm), nhân cạnh với cạnh (36 cm), lấy 6 + 4 (10 cm).
      { type: 'mc', bai: 31, point: 1, level: 2,
        prompt: 'ABCD là hình thoi có cạnh AB dài 6 cm. Chu vi hình thoi ABCD là:',
        fig: geo({ pts: { A: [150, 22], B: [250, 85], C: [150, 148], D: [50, 85] }, segs: ['AB', 'BC', 'CD', 'DA'],
          lens: { AB: '6 cm' }, pos: { A: 'n', B: 'e', C: 's', D: 'w' }, w: 300, h: 172 }),
        options: ['24 cm', '12 cm', '36 cm', '10 cm'], ans: 0 },
      // Ôn làm tròn số (Bài 13), đã lâu chưa gặp. 2 846 315: chữ số hàng chục nghìn là 4 nên làm tròn xuống 2 800 000.
      // Nhiễu: làm tròn lên (2 900 000), làm tròn đến hàng chục nghìn (2 850 000), đến hàng triệu (3 000 000).
      { type: 'mc', bai: 13, point: 0, level: 2, review: true,
        prompt: 'Làm tròn số 2 846 315 đến hàng trăm nghìn thì được số:',
        options: ['2 800 000', '2 900 000', '2 850 000', '3 000 000'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [22, 23], point: 0, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: [{ t: '427 085 + 368 916', ans: 796001 }, { t: '1 503 260 + 849 795', ans: 2353055 }, { t: '700 000 − 263 548', ans: 436452 }, { t: '4 216 300 − 1 958 427', ans: 2257873 }] },
      // Nhóm các số có tổng tròn nghìn, tròn chục nghìn: 3 650 + 6 350 = 10 000; 4 125 + 875 = 5 000; 2 980 + 20 = 3 000.
      { type: 'fill', bai: 24, point: 2, level: 2,
        prompt: 'Tính bằng cách thuận tiện:',
        items: [
          { t: '3 650 + 1 270 + 6 350 = (3 650 + 6 350) + 1 270 = … + 1 270 = …', ans: [10000, 11270] },
          { t: '4 125 + 2 980 + 875 + 20 = (4 125 + 875) + (2 980 + 20) = … + … = …', ans: [5000, 3000, 8000] },
        ] },
      // Ôn tấn và ki-lô-gam (Bài 17): đổi 5 tấn = 5 000 kg rồi trừ: 5 000 − 2 750 = 2 250 (kg).
      {
        type: 'word', bai: 17, point: 1, level: 3, review: true,
        text: 'Một kho có 5 tấn xi măng. Người ta đã chuyển đi 2 750 kg xi măng để xây trường học. Hỏi trong kho còn lại bao nhiêu ki-lô-gam xi măng?',
        given: ['Kho có 5 tấn xi măng, tức là 5 000 kg.', 'Đã chuyển đi 2 750 kg.'],
        ask: 'Trong kho còn lại bao nhiêu ki-lô-gam xi măng?',
        hint: 'Đổi 5 tấn ra ki-lô-gam trước (1 tấn = 1 000 kg), rồi làm phép trừ.',
        sentence: ['Trong kho', 'còn lại', 'số ki-lô-gam xi măng', 'là:'],
        decoys: ['đã chuyển đi'],
        expr: { a: 5000, op: '−', b: 2750, result: 2250, unit: 'kg' },
        units: ['kg', 'tấn', 'tạ'],
      },
      // Thùng thứ hai (số lớn) = (1 240 + 160) : 2 = 700; thùng thứ nhất = 700 − 160 = 540.
      { type: 'fill', bai: 25, point: 1, level: 3,
        prompt: 'Hai thùng chứa tất cả 1 240 l dầu ăn. Thùng thứ nhất chứa ít hơn thùng thứ hai 160 l. Hỏi mỗi thùng chứa bao nhiêu lít dầu ăn?',
        fig: sumDiff({ sum: '1 240 l', diff: '160 l', names: ['Thùng 2', 'Thùng 1'], small: 0.77 }),
        items: [
          { t: 'Thùng thứ hai chứa: (1 240 + 160) : 2 = … (l)', ans: [700] },
          { t: 'Thùng thứ nhất chứa: … − 160 = … (l)', ans: [700, 540] },
        ] },
    ] },
  ],
};
