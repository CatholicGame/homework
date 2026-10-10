/** Kiểm tra nhanh 2: Bài 4–8 Vở BT Toán 3 (bảng nhân, bảng chia 2, 3, 4, 5; ôn hình học và đo lường). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { clock } from './art.js';

export default {
  id: 'l3-nh-02',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 2',
  short: 'Nhanh 2',
  after: { book: 'workbook', units: '4-8' },
  desc: 'Bảng nhân, bảng chia 2, 3, 4, 5; ôn hình học và đo lường',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: nhầm sang 24 : 3 (8), lấy 27 − 3 (24), lấy 27 + 3 (30).
      { type: 'mc', bai: 5, point: 2, level: 1,
        prompt: '27 : 3 = ?',
        options: ['8', '9', '24', '30'], ans: 1 },
      // Ý sai: 35 : 5 lùi một dòng bảng chia (6); 18 : 2 nhầm với 16 : 2 (8).
      { type: 'tf', bai: 4, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['5 × 7 = 35', '35 : 5 = 6', '2 × 8 = 16', '18 : 2 = 8'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Đồng hồ chỉ 4 giờ, buổi chiều là 16 giờ. Nhiễu: cộng 10 (14 giờ), đọc kim dài chỉ số 12 (12 giờ), không nhìn "buổi chiều" (4 giờ sáng).
      { type: 'mc', bai: 7, point: 2, level: 1,
        prompt: 'Buổi chiều, đồng hồ chỉ giờ như hình bên. Đồng hồ chỉ:',
        fig: clock(4, 0),
        options: ['14 giờ', '16 giờ', '12 giờ', '4 giờ sáng'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // 8 × 4 = 32, 32 : 2 = 16, 16 : 4 = 4.
      { type: 'chain', bai: 6, point: 2, level: 2,
        prompt: 'Số?',
        items: [{ start: 8, steps: ['× 4', ': 2', ': 4'] }] },
      {
        type: 'word', bai: 6, point: 3, level: 3,
        text: 'Mỗi con thỏ có 4 cái chân. Bạn Lan đếm được tất cả 28 cái chân thỏ trong chuồng. Hỏi trong chuồng có bao nhiêu con thỏ?',
        given: ['Mỗi con thỏ có 4 cái chân.', 'Có tất cả 28 cái chân thỏ.'],
        ask: 'Trong chuồng có bao nhiêu con thỏ?',
        hint: 'Cứ 4 cái chân là một con thỏ: chia 28 thành các nhóm 4.',
        sentence: ['Trong chuồng', 'có số', 'con thỏ', 'là:'],
        decoys: ['cái chân'],
        expr: { a: 28, op: ':', b: 4, result: 7, unit: 'con thỏ' },
        units: ['con thỏ', 'cái chân', 'chuồng'],
      },
    ] },
  ],
};
