/** Kiểm tra nhanh 9: Bài 30–35 Vở BT Toán 3 (mi-li-mét, gam, mi-li-lít, nhiệt độ). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { rulerMm, balance, thermometer, jug } from './art.js';

export default {
  id: 'l3-nh-09',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 9',
  short: 'Nhanh 9',
  after: { book: 'workbook', units: '30-35' },
  desc: 'Mi-li-mét, gam, mi-li-lít, nhiệt độ',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: chỉ đọc số cm (3 mm), đọc ngược hai chữ số (53 mm), bỏ phần mm lẻ (30 mm).
      { type: 'mc', bai: 30, point: 2, level: 1,
        prompt: 'Đoạn thẳng AB dài bao nhiêu mi-li-mét?',
        fig: rulerMm(35, { name: 'AB' }),
        options: ['3 mm', '35 mm', '53 mm', '30 mm'], ans: 1 },
      // Nhiễu: đếm số quả cân (3 g), bỏ sót quả 100 g (700 g), chỉ lấy quả cân lớn nhất (500 g).
      { type: 'mc', bai: 31, point: 2, level: 1,
        prompt: 'Cân thăng bằng. Quả bí ngô cân nặng bao nhiêu gam?',
        fig: balance([{ kind: 'bi_ngo', size: 48 }], ['500 g', '200 g', '100 g']),
        options: ['800 g', '3 g', '700 g', '500 g'], ans: 0 },
      // Ý sai: đọc theo vạch có số gần nhất (30 °C thay 31 °C); nghĩ số °C bé hơn là nóng hơn.
      { type: 'tf', bai: 33, point: 1, level: 1,
        prompt: 'Nhiệt kế đo nhiệt độ ngoài trời buổi sáng và buổi trưa. Đúng ghi Đ, sai ghi S:',
        fig: thermometer(18, { min: 0, max: 40, label: 'Sáng' }) + thermometer(31, { min: 0, max: 40, label: 'Trưa' }),
        items: ['Buổi sáng nhiệt kế chỉ 18 °C.', 'Buổi trưa nhiệt kế chỉ 30 °C.', 'Buổi trưa nóng hơn buổi sáng.', 'Buổi sáng nóng hơn buổi trưa.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'fill', bai: 32, point: 2, level: 2,
        // Hai bình vẽ chung một hình: ý thứ ba (không có hình) không bị dồn vào cột hẹp.
        prompt: 'Mỗi bình có bao nhiêu mi-li-lít nước? Viết số thích hợp vào chỗ chấm:',
        fig: jug(700, { label: 'Bình thứ nhất' }) + '<span style="display:inline-block;width:2.5rem"></span>' + jug(300, { label: 'Bình thứ hai' }),
        items: [
          { t: 'Bình thứ nhất có … ml nước.', ans: 700 },
          { t: 'Bình thứ hai có … ml nước.', ans: 300 },
          { t: 'Cả hai bình có … ml nước, tức là … l nước.', ans: [1000, 1] },
        ] },
      {
        type: 'word', bai: 31, point: 3, level: 3,
        text: 'Mẹ có 1 kg đường. Mẹ dùng 250 g đường để làm bánh. Hỏi mẹ còn lại bao nhiêu gam đường?',
        given: ['Mẹ có 1 kg đường, mà 1 kg = 1000 g.', 'Mẹ dùng 250 g đường.'],
        ask: 'Mẹ còn lại bao nhiêu gam đường?',
        hint: 'Đổi 1 kg = 1000 g, rồi lấy số gam lúc đầu trừ số gam đã dùng.',
        sentence: ['Mẹ', 'còn lại', 'số gam đường', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 1000, op: '−', b: 250, result: 750, unit: 'g' },
        units: ['g', 'kg', 'ml'],
      },
    ] },
  ],
};
