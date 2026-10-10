/** Kiểm tra tổng hợp 1 (Đề 1): Bài 1–6 Toán 4 (Nhanh 1 + Nhanh 2). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { geo } from './art.js';

export default {
  id: 'l4-th-01',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 1 (Đề 1)',
  short: 'Tổng hợp 1 · Đề 1',
  after: { book: 'tool4', units: '1-6' },
  desc: 'Số đến 100 000; các phép tính trong phạm vi 100 000; số chẵn, số lẻ; biểu thức chứa chữ, chu vi; bài toán có ba bước tính',
  time: 40,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 70 000 + 4 000 + 300 + 6 = 74 306. Nhiễu: bỏ chữ số 0 ở hàng chục (7 436), đặt 6 vào hàng chục (74 360), đổi chỗ hàng trăm và hàng chục (74 036).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Số gồm 70 000 + 4 000 + 300 + 6 viết là:',
        options: ['74 306', '7 436', '74 360', '74 036'], ans: 0 },
      // Ý sai: hai số lẻ liên tiếp hơn kém nhau 2 (không phải 1); 24 681 tận cùng 1 nên là số lẻ (nhìn chữ số đầu 2 mà nghĩ là chẵn).
      { type: 'tf', bai: 3, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['63 570 là số chẵn.', 'Hai số lẻ liên tiếp hơn kém nhau 1 đơn vị.', 'Số chẵn liền sau 4 998 là 5 000.', '24 681 là số chẵn.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // a = 8: 125 + 8 × 3 = 125 + 24 = 149. Nhiễu: cộng trước rồi nhân ((125 + 8) × 3 = 399), cộng cả ba số (136), viết liền a3 thành 83 (208).
      { type: 'mc', bai: 4, point: 0, level: 1,
        prompt: 'Giá trị của biểu thức 125 + a × 3 với a = 8 là:',
        options: ['149', '399', '136', '208'], ans: 0 },
      // Tính nhẩm với số tròn nghìn, tròn chục nghìn: 70 000, 40 000, 24 000, 30 000.
      { type: 'match', bai: 2, point: 2, level: 1,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['40 000 + 30 000', '90 000 − 50 000', '8 000 × 3', '60 000 : 2'],
        right: ['24 000', '70 000', '30 000', '40 000'],
        ans: [1, 3, 0, 2] },
      // P = (15 + 9) × 2 = 48 cm. Nhiễu: quên nhân 2 (24 cm), nhầm sang diện tích 15 × 9 (135 cm), bỏ ngoặc 15 + 9 × 2 (33 cm).
      { type: 'mc', bai: 4, point: 2, level: 2,
        prompt: 'Chu vi hình chữ nhật ABCD dưới đây là:',
        fig: geo({ pts: { A: [40, 30], B: [250, 30], C: [250, 120], D: [40, 120] }, segs: ['AB', 'BC', 'CD', 'DA'],
          lens: { AB: '15 cm', BC: '9 cm' }, pos: { C: 's', D: 's' }, w: 320, h: 150 }),
        options: ['48 cm', '24 cm', '135 cm', '33 cm'], ans: 0 },
      // So từ hàng chục nghìn sang phải. Nhiễu: so từ hàng đơn vị (đổi chỗ 45 690 và 45 609), xếp từ lớn đến bé, chỉ so hàng nghìn rồi bỏ qua hàng trăm.
      { type: 'mc', bai: 1, point: 2, level: 2, cols: 1,
        prompt: 'Dãy số nào được xếp theo thứ tự từ bé đến lớn?',
        options: ['45 609; 45 690; 46 059; 46 509', '45 690; 45 609; 46 059; 46 509', '46 509; 46 059; 45 690; 45 609', '45 609; 46 059; 45 690; 46 509'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 0, level: 1, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['47 386 + 28 519', '63 040 − 27 568', '13 725 × 6', '58 416 : 8'] },
      // Số bị trừ = hiệu + số trừ: 18 760 + 2 345 = 21 105; thừa số = tích : thừa số kia: 12 600 : 4 = 3 150.
      { type: 'findx', bai: 2, point: 4, level: 2,
        prompt: 'Tìm x:',
        items: [{ t: 'x − 2 345 = 18 760', ans: 21105 }, { t: 'x × 4 = 12 600', ans: 3150 }] },
      {
        type: 'word', bai: 4, point: 2, level: 3,
        text: 'Bác Tư làm hàng rào xung quanh một mảnh vườn hình vuông có cạnh dài 25 m. Hỏi hàng rào dài bao nhiêu mét?',
        given: ['Mảnh vườn hình vuông.', 'Cạnh dài 25 m.'],
        ask: 'Hàng rào dài bao nhiêu mét?',
        hint: 'Hàng rào bao quanh vườn dài bằng chu vi hình vuông: P = a × 4.',
        sentence: ['Hàng rào', 'dài', 'số mét', 'là:'],
        decoys: ['diện tích'],
        expr: { a: 25, op: '×', b: 4, result: 100, unit: 'm' },
        units: ['m', 'm²', 'cạnh'],
      },
      // Bước 1: tiền cam 25 000 × 2 = 50 000; bước 2: tiền sữa chua 7 000 × 4 = 28 000; bước 3: trả lại 100 000 − 50 000 − 28 000 = 22 000.
      { type: 'fill', bai: 5, point: 1, level: 3,
        prompt: 'Mẹ mua 2 kg cam, mỗi ki-lô-gam giá 25 000 đồng, và 4 hộp sữa chua, mỗi hộp giá 7 000 đồng. Mẹ đưa cô bán hàng tờ 100 000 đồng. Hỏi cô bán hàng trả lại mẹ bao nhiêu tiền?',
        items: [
          { t: 'Tiền mua cam: 25 000 × 2 = … (đồng)', ans: [50000] },
          { t: 'Tiền mua sữa chua: 7 000 × 4 = … (đồng)', ans: [28000] },
          { t: 'Cô bán hàng trả lại: 100 000 − … − … = … (đồng)', ans: [50000, 28000, 22000] },
        ] },
    ] },
  ],
};
