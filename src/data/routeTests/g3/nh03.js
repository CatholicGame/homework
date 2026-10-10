/** Kiểm tra nhanh 3: Bài 9–12 Vở BT Toán 3 (bảng nhân, bảng chia 6, 7, 8, 9). Quy tắc: docs/kiem-tra-lo-trinh.md mục 2.5 (gộp các bảng vào câu nhiều ý). */

export default {
  id: 'l3-nh-03',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 3',
  short: 'Nhanh 3',
  after: { book: 'workbook', units: '9-12' },
  desc: 'Bảng nhân, bảng chia 6, 7, 8, 9',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: nhầm 6 × 6 (36), nhầm 6 × 8 (48), lấy 6 + 7 (13).
      { type: 'mc', bai: 9, point: 1, level: 1,
        prompt: '6 × 7 = ?',
        options: ['36', '42', '48', '13'], ans: 1 },
      // Mỗi ý một bảng nhân: 6, 7, 8, 9.
      { type: 'match', bai: [9, 10, 11, 12], point: 1, level: 1,
        prompt: 'Nối phép tính với kết quả đúng:',
        left: ['6 × 4', '7 × 6', '8 × 9', '9 × 5'],
        right: ['45', '24', '72', '42'],
        ans: [1, 3, 2, 0] },
      // Dãy đếm thêm 9. Nhiễu: thêm 1 (46), thêm 10 (55), bỏ qua một số (63).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Số tiếp theo của dãy số 27, 36, 45, … là:',
        options: ['46', '54', '55', '63'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Bảng chia 6, 7, 8, 9: mỗi bảng ít nhất một ý.
      { type: 'calc', bai: [9, 10, 11, 12], point: 2, level: 2,
        prompt: 'Tính nhẩm:',
        items: ['54 : 6', '56 : 7', '72 : 8', '63 : 9', '42 : 6', '48 : 8'] },
      {
        type: 'word', bai: 10, point: 3, level: 3,
        text: 'Bố đi công tác xa nhà 42 ngày. Mỗi tuần lễ có 7 ngày. Hỏi bố đi công tác bao nhiêu tuần lễ?',
        given: ['Bố đi công tác 42 ngày.', 'Mỗi tuần lễ có 7 ngày.'],
        ask: 'Bố đi công tác bao nhiêu tuần lễ?',
        hint: 'Cứ 7 ngày là một tuần lễ: chia 42 thành các nhóm 7.',
        sentence: ['Bố', 'đi công tác', 'số tuần lễ', 'là:'],
        decoys: ['số ngày'],
        expr: { a: 42, op: ':', b: 7, result: 6, unit: 'tuần lễ' },
        units: ['tuần lễ', 'ngày', 'tháng'],
      },
    ] },
  ],
};
