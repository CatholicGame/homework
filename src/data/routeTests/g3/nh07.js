/** Kiểm tra nhanh 7: Bài 23–25 Vở BT Toán 3 (nhân số có hai chữ số với số có một chữ số; gấp lên một số lần; chia hết, chia có dư). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-nh-07',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 7',
  short: 'Nhanh 7',
  after: { book: 'workbook', units: '23-25' },
  desc: 'Nhân số có hai chữ số với số có một chữ số; gấp lên một số lần; chia hết, chia có dư',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: quên chữ số 0 (9), cộng 30 + 3 (33), thừa một chữ số 0 (900).
      { type: 'mc', bai: 23, point: 3, level: 1,
        prompt: '30 × 3 = ?',
        options: ['9', '90', '33', '900'], ans: 1 },
      // Nhiễu: "gấp lên 4 lần" làm thành "thêm 4" (10), lấy 6 − 4 (2), viết ghép hai số (64).
      { type: 'mc', bai: 24, point: 3, level: 1,
        prompt: 'Gấp 6 lên 4 lần thì được:',
        options: ['10', '24', '2', '64'], ans: 1 },
      // Ý sai: số dư lớn hơn số chia vì chưa chia hết lượt (20 : 3 = 5 dư 5, 13 : 3 = 3 dư 4).
      { type: 'tf', bai: 25, point: 2, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['17 : 5 = 3 (dư 2)', '20 : 3 = 5 (dư 5)', '29 : 4 = 7 (dư 1)', '13 : 3 = 3 (dư 4)'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 23, point: 2, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['27 × 3', '16 × 5', '45 × 2', '19 × 4'] },
      {
        type: 'word', bai: 24, point: 0, level: 3,
        text: 'Lớp 3A trồng được 14 cây. Lớp 3B trồng được số cây gấp 3 lần số cây của lớp 3A. Hỏi lớp 3B trồng được bao nhiêu cây?',
        given: ['Lớp 3A trồng được 14 cây.', 'Lớp 3B trồng được gấp 3 lần lớp 3A.'],
        ask: 'Lớp 3B trồng được bao nhiêu cây?',
        hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
        sentence: ['Lớp 3B', 'trồng được', 'số cây', 'là:'],
        decoys: ['còn lại'],
        expr: { a: 14, op: '×', b: 3, result: 42, unit: 'cây' },
        units: ['cây', 'lần', 'lớp'],
      },
    ] },
  ],
};
