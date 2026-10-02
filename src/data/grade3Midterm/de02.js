/** Đề số 2. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 4. */
export default {
  id: 'de-02',
  title: 'Đề số 2',
  short: 'Đề 2',
  desc: 'Cộng trừ số có ba chữ số, một phần mấy, giảm đi nhiều lần, đổi đơn vị, tìm X',
  review: 'cộng trừ số có ba chữ số, một phần mấy và tìm X',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số có ba chữ số lớn nhất là:', options: ['100', '989', '900', '999'], ans: 3 },
        { type: 'mc', prompt: '418 + 201 = … Số cần điền vào chỗ chấm là:', options: ['621', '619', '719', '629'], ans: 1 },
        { type: 'mc', prompt: '627 − 143 = … Số cần điền vào chỗ chấm là:', options: ['474', '374', '574', '484'], ans: 3 },
        { type: 'mc', prompt: '6 × 6 □ 30 + 5. Dấu cần điền vào ô trống là:', options: ['<', '>', '='], ans: 1 },
        { type: 'mc', prompt: '{1/5} của 35 m là … Số cần điền vào chỗ chấm là:', options: ['6 m', '7 m', '8 m', '9 m'], ans: 1 },
        { type: 'mc', prompt: '42 giờ giảm đi 6 lần thì còn … Số cần điền vào chỗ chấm là:', options: ['7 giờ', '8 giờ', '9 giờ', '10 giờ'], ans: 0 },
        { type: 'mc', prompt: '3 m 4 cm = … cm. Số cần điền vào chỗ chấm là:', options: ['34', '304', '340', '7'], ans: 1 },
        { type: 'mc', prompt: 'Mỗi tuần lễ có 7 ngày. Hỏi 4 tuần lễ có bao nhiêu ngày?', options: ['11 ngày', '21 ngày', '24 ngày', '28 ngày'], ans: 3 },
      ],
    },
    {
      title: 'II. Tự luận',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['452 + 361', '541 − 127', '54 × 6', '24 : 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['5 × 7 + 27', '80 : 2 − 13'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X × 4 = 32', 'X : 6 = 12'] },
        {
          type: 'word',
          text: 'Một cửa hàng có 40 mét vải xanh và đã bán được {1/5} số vải đó. Hỏi cửa hàng đó đã bán được bao nhiêu mét vải xanh?',
          given: ['Cửa hàng có 40 m vải xanh.', 'Đã bán {1/5} số vải đó.'],
          ask: 'Cửa hàng đã bán được bao nhiêu mét vải xanh?',
          hint: 'Muốn tìm {1/5} của một số thì lấy số đó chia cho 5.',
          sentence: ['Cửa hàng đó', 'đã bán được số', 'mét vải xanh', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 40, op: ':', b: 5, result: 8, unit: 'm' },
          units: ['m', 'cm', 'kg'],
        },
      ],
    },
  ],
};
