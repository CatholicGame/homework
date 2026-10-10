/** Kiểm tra nhanh 6: Bài 19–24 Vở BT Toán 2 (phép cộng, phép trừ có nhớ trong phạm vi 100). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l2-nh-06',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 6',
  short: 'Nhanh 6',
  after: { book: 'workbook2', units: '19-24' },
  desc: 'Phép cộng, phép trừ có nhớ trong phạm vi 100',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: quên nhớ (23), đặt 5 thẳng cột chục (78), nhớ nhưng tính sai đơn vị (32).
      { type: 'mc', bai: 19, point: 1, level: 1,
        prompt: '28 + 5 = ?',
        options: ['23', '33', '78', '32'], ans: 1 },
      // Nhiễu: lấy số lớn trừ số bé ở hàng đơn vị (45), trừ nhớ hai lần (25), cộng thay trừ (49).
      { type: 'mc', bai: 22, point: 1, level: 1,
        prompt: '42 − 7 = ?',
        options: ['45', '35', '25', '49'], ans: 1 },
      // Ý sai: quên nhớ sang hàng chục; lấy 5 − 1 thay vì 11 − 5.
      { type: 'tf', bai: [20, 23], point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: [{ col: '36 + 47', res: '83' }, { col: '54 + 28', res: '72' }, { col: '73 − 38', res: '35' }, { col: '61 − 25', res: '44' }],
        ans: ['Đ', 'S', 'Đ', 'S'] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 22, 23], point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['47 + 6', '35 + 48', '64 − 9', '82 − 37'] },
      {
        type: 'word', bai: 23, point: 1, level: 3,
        text: 'Thư viện lớp em có 52 quyển truyện, các bạn đã mượn 26 quyển truyện. Hỏi thư viện còn lại bao nhiêu quyển truyện?',
        given: ['Thư viện có 52 quyển truyện.', 'Các bạn đã mượn 26 quyển.'],
        ask: 'Thư viện còn lại bao nhiêu quyển truyện?',
        hint: 'Mượn đi thì số truyện bớt đi: làm phép trừ.',
        sentence: ['Thư viện', 'còn lại', 'số quyển truyện', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 52, op: '−', b: 26, result: 26, unit: 'quyển truyện' },
        units: ['quyển truyện', 'bạn', 'cm'],
      },
    ] },
  ],
};
