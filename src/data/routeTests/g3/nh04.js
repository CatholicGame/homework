/** Kiểm tra nhanh 4: Bài 13–15 Vở BT Toán 3 (tìm thừa số, số bị chia, số chia; một phần mấy). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { polys } from './art.js';

// Băng giấy dài 90 chia tại các mốc `cuts`, tô màu `shade` phần đầu.
const strip = (cuts, shade) => {
  const xs = [6, ...cuts.map(c => 6 + c), 96];
  return polys(xs.slice(0, -1).map((x, i) => ({ pts: [[x, 8], [xs[i + 1], 8], [xs[i + 1], 44], [x, 44]], color: i < shade ? '#94a3b8' : '#fff' })), { w: 102, h: 52, width: 150 });
};

export default {
  id: 'l3-nh-04',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 4',
  short: 'Nhanh 4',
  after: { book: 'workbook', units: '13-15' },
  desc: 'Tìm thừa số, số bị chia, số chia; một phần mấy',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: tên số đứng đầu (số bị chia), số đứng cuối (thương), lẫn với tên trong phép nhân (thừa số).
      { type: 'mc', bai: 13, point: 1, level: 1,
        prompt: 'Trong phép chia 42 : 6 = 7, số 6 gọi là:',
        options: ['số bị chia', 'số chia', 'thương', 'thừa số'], ans: 1 },
      // 12 quả cam, {1/4} là 3 quả.
      { type: 'pick', bai: 14, point: 3, level: 1,
        prompt: 'Khoanh vào {1/4} số quả cam:',
        icon: 'orange', count: 12, cols: 6, ans: 3 },
      // Nhiễu: A chia 3 phần không bằng nhau, B tô 2 phần ({2/3}), D chia 4 phần ({1/4}).
      { type: 'mc', bai: 14, point: 2, level: 1,
        prompt: 'Hình nào đã tô màu {1/3} hình?',
        options: [strip([18, 48], 1), strip([30, 60], 2), strip([30, 60], 1), strip([22.5, 45, 67.5], 1)], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'findx', bai: 13, point: 0, level: 2,
        prompt: 'Tìm x:',
        items: ['x × 6 = 42', '8 × x = 72', 'x : 7 = 8', '56 : x = 8'] },
      {
        type: 'word', bai: 14, point: 3, level: 3,
        text: 'Một sợi dây dài 56 dm được cắt thành các đoạn bằng nhau, mỗi đoạn dài bằng {1/8} sợi dây. Hỏi mỗi đoạn dây dài bao nhiêu đề-xi-mét?',
        given: ['Sợi dây dài 56 dm.', 'Mỗi đoạn dài bằng {1/8} sợi dây.'],
        ask: 'Mỗi đoạn dây dài bao nhiêu đề-xi-mét?',
        hint: 'Tìm {1/8} của 56 dm thì lấy 56 chia cho 8.',
        sentence: ['Mỗi đoạn dây', 'dài', 'số đề-xi-mét', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 56, op: ':', b: 8, result: 7, unit: 'dm' },
        units: ['dm', 'cm', 'đoạn'],
      },
    ] },
  ],
};
