/**
 * Phiếu bài tập Bài 6: Bảng nhân 4, bảng chia 4.
 * Nguồn: docs/lop_3/De_thi/Bài 6_ Bảng nhân 4, Bảng chia 4 - Toán LỚP 3 (Có File Tải Về).pdf
 * Đề đánh số mỗi phép tính là một câu (1–30).
 */
const one = (type, t) => ({ type, items: [t] });

export default {
  id: 'bai-6',
  title: 'Bài 6: Bảng nhân 4, bảng chia 4',
  short: 'Bài 6',
  desc: 'Bảng nhân 4, bảng chia 4',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phần 1. Tính nhẩm',
      label: '',
      questions: ['4 × 2', '4 × 5', '4 × 7', '4 × 9', '4 × 10', '12 : 4', '16 : 4', '24 : 4', '32 : 4', '40 : 4'].map(t => one('calc', t)),
    },
    {
      title: 'Phần 2. Điền số thích hợp vào ô trống',
      label: '',
      questions: ['4 × □ = 16', '□ × 4 = 28', '36 : □ = 4', '□ : 4 = 3', '4 × □ = 32', '□ : 4 = 8'].map(t => one('fill', t)),
    },
    {
      title: 'Phần 3. So sánh (>, <, =)',
      label: '',
      questions: ['4 × 6 □ 28', '4 × 8 □ 36', '24 : 4 □ 7', '4 × 5 □ 20', '40 : 4 □ 10'].map(t => one('compare', t)),
    },
    {
      title: 'Phần 4. Bài toán có lời văn',
      label: '',
      questions: [
        {
          type: 'word',
          text: 'Một hộp có 4 cây bút. Hỏi 7 hộp như thế có tất cả bao nhiêu cây bút?',
          given: ['Mỗi hộp có 4 cây bút.', 'Có 7 hộp như thế.'],
          ask: 'Có tất cả bao nhiêu cây bút?',
          hint: '7 hộp, hộp nào cũng có 4 cây: lấy 4 lặp lại 7 lần, đó là phép nhân.',
          sentence: ['7 hộp', 'có tất cả', 'số cây bút', 'là:'],
          decoys: ['mỗi hộp'],
          expr: { a: 4, op: '×', b: 7, result: 28, unit: 'cây bút' },
          units: ['cây bút', 'hộp', 'quyển'],
        },
        {
          type: 'word',
          text: 'Có 32 quả cam chia đều vào các túi, mỗi túi 4 quả. Hỏi có tất cả bao nhiêu túi cam?',
          given: ['Có 32 quả cam.', 'Mỗi túi 4 quả.'],
          ask: 'Có tất cả bao nhiêu túi cam?',
          hint: 'Chia 32 quả thành các túi, mỗi túi 4 quả: xem 32 có mấy lần 4, đó là phép chia.',
          sentence: ['Có tất cả', 'số túi cam', 'là:'],
          decoys: ['mỗi túi'],
          expr: { a: 32, op: ':', b: 4, result: 8, unit: 'túi' },
          units: ['túi', 'quả cam', 'quả'],
        },
        {
          type: 'fill',
          prompt: 'Một bạn có 4 quyển vở, bạn ấy mua thêm 6 lần nữa, mỗi lần mua 4 quyển. Hỏi bạn ấy có tất cả bao nhiêu quyển vở?',
          items: [
            { t: 'Số quyển vở mua thêm là: … quyển', ans: 24 },
            { t: 'Bạn ấy có tất cả: … quyển vở', ans: 28 },
          ],
        },
        {
          type: 'word',
          text: 'Một sợi dây dài 36 cm được cắt thành các đoạn, mỗi đoạn dài 4 cm. Hỏi cắt được tất cả bao nhiêu đoạn dây?',
          given: ['Sợi dây dài 36 cm.', 'Mỗi đoạn dài 4 cm.'],
          ask: 'Cắt được tất cả bao nhiêu đoạn dây?',
          hint: 'Xem 36 cm có mấy lần 4 cm: đó là phép chia.',
          sentence: ['Cắt được', 'tất cả', 'số đoạn dây', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 36, op: ':', b: 4, result: 9, unit: 'đoạn' },
          units: ['đoạn', 'cm', 'sợi'],
        },
      ],
    },
    {
      title: 'Phần 5. Tìm x',
      label: '',
      questions: ['x × 4 = 24', '4 × x = 36', 'x : 4 = 5', '32 : x = 4', '4 × x = 12'].map(t => one('findx', t)),
    },
  ],
};
