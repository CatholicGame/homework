/** Đề số 8. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 10. */
export default {
  id: 'de-08',
  title: 'Đề số 8',
  short: 'Đề 8',
  desc: 'Đọc số, đổi đơn vị đo, tìm y, một phần mấy, tính giá trị biểu thức',
  review: 'đổi đơn vị đo, một phần mấy và tính giá trị biểu thức',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: 'Bài',
      questions: [
        {
          type: 'mc',
          prompt: 'Số 36052 đọc là:',
          options: [
            'Ba mươi sáu nghìn không trăm năm mươi hai.',
            'Ba mươi sáu nghìn năm trăm hai mươi.',
            'Sáu mươi ba nghìn năm trăm hai mươi.',
            'Sáu mươi ba nghìn không trăm năm mươi hai.',
          ],
          ans: 0,
          cols: 1,
        },
        { type: 'mc', prompt: 'Số thích hợp điền vào chỗ chấm để 9 m 2 cm = … cm là:', options: ['92', '902', '920', '9002'], ans: 1 },
        { type: 'mc', prompt: 'Tìm y. Biết y × 3 = 93', options: ['y = 279', 'y = 301', 'y = 31', 'Không tìm được y'], ans: 2 },
        { type: 'mc', prompt: '{1/5} của 15 m là … m. Số cần điền vào chỗ chấm là:', options: ['5', '3', '4', 'Không có số nào'], ans: 1 },
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S vào ô trống:',
          items: ['a) Kết quả của dãy tính 7 × 5 + 27 là 170', 'b) Kết quả của dãy tính 90 : 3 − 7 là 23'],
          ans: ['S', 'Đ'],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['457 + 209', '784 − 365', '17 × 7', '48 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['5 × 7 + 346', '90 : 3 − 15'] },
        {
          type: 'word',
          text: 'Một thùng dầu có 40 lít. Sau khi sử dụng, số dầu còn lại trong thùng bằng {1/4} số dầu đã có. Hỏi trong thùng còn lại bao nhiêu lít dầu?',
          given: ['Thùng có 40 l dầu.', 'Số dầu còn lại bằng {1/4} số dầu đã có.'],
          ask: 'Trong thùng còn lại bao nhiêu lít dầu?',
          hint: 'Muốn tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['Trong thùng', 'còn lại số', 'lít dầu', 'là:'],
          decoys: ['đã dùng'],
          expr: { a: 40, op: ':', b: 4, result: 10, unit: 'l' },
          units: ['l', 'kg', 'thùng'],
        },
      ],
    },
  ],
};
