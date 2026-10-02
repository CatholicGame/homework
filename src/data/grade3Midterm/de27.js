/** Đề số 27. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 29. */
export default {
  id: 'de-27',
  title: 'Đề số 27',
  short: 'Đề 27',
  desc: 'Đổi đơn vị đo, bảng nhân, một phần mấy, tìm x, biểu thức',
  review: 'một phần mấy, tìm x và tính giá trị biểu thức',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: '1 dam = … m', options: ['5 m', '6 m', '9 m', '10 m'], ans: 3 },
        { type: 'mc', prompt: 'Tích của 7 và 6 là:', options: ['56', '54', '42', '36'], ans: 2 },
        { type: 'mc', prompt: '{1/6} của 36 là:', options: ['42', '30', '20', '6'], ans: 3 },
        { type: 'mc', prompt: 'Kết quả của phép cộng 145 + 239 là:', options: ['374', '384', '474', '574'], ans: 1 },
        { type: 'mc', prompt: 'Số ba trăm linh năm viết là:', options: ['530', '503', '350', '305'], ans: 3 },
        { type: 'mc', prompt: '127 − x = 18 thì x = ?', options: ['145', '135', '109', '119'], ans: 2 },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Tính:', items: ['28 × 4 − 57', '96 : 3 + 127'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['53 × 4', '345 + 120', '627 − 127', '84 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x + 12 = 36', '42 : x = 6'] },
        {
          type: 'word',
          text: 'Trong thùng có 36 lít dầu. Sau khi sử dụng, số lít dầu trong thùng bằng {1/3} số dầu đã có. Hỏi trong thùng còn lại bao nhiêu lít dầu?',
          given: ['Thùng có 36 lít dầu.', 'Số dầu còn lại bằng {1/3} số dầu đã có.'],
          ask: 'Trong thùng còn lại bao nhiêu lít dầu?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Trong thùng', 'còn lại số', 'lít dầu', 'là:'],
          decoys: ['đã dùng'],
          expr: { a: 36, op: ':', b: 3, result: 12, unit: 'l' },
          units: ['l', 'kg', 'thùng'],
        },
      ],
    },
  ],
};
