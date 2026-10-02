/** Đề số 20. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 22. */
export default {
  id: 'de-20',
  title: 'Đề số 20',
  short: 'Đề 20',
  desc: 'Một phần mấy, đổi đơn vị đo, tìm x, biểu thức, đặt tính',
  review: 'một phần mấy, đổi đơn vị đo và tính giá trị biểu thức',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Số cần điền vào chỗ chấm của phép tính 998 + … = 1000 là:', options: ['1', '2', '3', '4'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép tính 1 giờ − 30 phút = ?', options: ['13 giờ', '31 phút', '30 phút', '30 giờ'], ans: 2 },
        { type: 'mc', prompt: '{1/7} của 28 là:', options: ['3', '4', '5', '6'], ans: 1 },
        { type: 'mc', prompt: '2 m 4 dm = … dm. Số cần điền vào chỗ chấm là:', options: ['24', '204', '240', '2004'], ans: 0 },
        { type: 'mc', prompt: 'Trong các phép chia 12 : 2; 12 : 3; 12 : 6; 12 : 4, phép chia có thương lớn nhất là:', options: ['12 : 2', '12 : 3', '12 : 4', '12 : 6'], ans: 0 },
        { type: 'mc', prompt: 'x × 7 = 49 thì x = ?', options: ['9', '8', '7', '6'], ans: 2 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['312 + 128', '346 − 129', '48 × 7', '69 : 3'] },
        { type: 'calc', prompt: 'Tính:', items: ['47 × 7 − 158', '80 : 4 + 137'] },
        {
          type: 'word',
          text: 'Một trại có 70 con lợn, trại đã bán {1/7} số lợn đó. Hỏi trại đã bán bao nhiêu con lợn?',
          given: ['Trại có 70 con lợn.', 'Trại đã bán {1/7} số lợn.'],
          ask: 'Trại đã bán bao nhiêu con lợn?',
          hint: 'Muốn tìm {1/7} của một số thì lấy số đó chia cho 7.',
          sentence: ['Trại', 'đã bán số', 'con lợn', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 70, op: ':', b: 7, result: 10, unit: 'con lợn' },
          units: ['con lợn', 'trại', 'lần'],
        },
      ],
    },
  ],
};
