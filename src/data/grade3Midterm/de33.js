/** Đề số 33. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 35. */
export default {
  id: 'de-33',
  title: 'Đề số 33',
  short: 'Đề 33',
  desc: 'Đổi đơn vị đo, một phần mấy, gấp lên nhiều lần, dãy số, tìm y',
  review: 'một phần mấy, bảng nhân, bảng chia và tìm y',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '1 m = … dm', options: ['10', '100', '101', '111'], ans: 0 },
        { type: 'mc', prompt: '{1/4} của 36 m là:', options: ['6 m', '7 m', '8 m', '9 m'], ans: 3 },
        { type: 'mc', prompt: '42 : 6 = ?', options: ['5', '6', '7', '8'], ans: 2 },
        { type: 'mc', prompt: '4 gấp lên 7 lần là:', options: ['11', '28', '47', '74'], ans: 1 },
        { type: 'mc', prompt: 'Số thích hợp điền vào chỗ chấm là: 12, 16, 20, …, 28', options: ['14', '18', '22', '24'], ans: 3 },
        { type: 'mc', prompt: 'Mỗi tuần lễ có 7 ngày. Vậy 2 tuần lễ có bao nhiêu ngày?', options: ['12 ngày', '13 ngày', '14 ngày', '15 ngày'], ans: 2 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['37 × 2', '15 × 6', '84 : 4', '66 : 3'] },
        {
          type: 'calc',
          prompt: 'Tính:',
          items: [
            { t: '7 cm + 6 cm', ans: 13, unit: 'cm' },
            { t: '63 m − 45 m', ans: 18, unit: 'm' },
            '6 × 5 + 24',
            '36 : 4 + 10',
          ],
        },
        { type: 'findx', prompt: 'Tìm y:', items: ['y : 6 = 5', '4 × y = 28'] },
        {
          type: 'word',
          text: 'Một cửa hàng có 36 lít nước mắm và đã bán được {1/4} số nước mắm đó. Hỏi cửa hàng đã bán bao nhiêu lít nước mắm?',
          given: ['Cửa hàng có 36 lít nước mắm.', 'Đã bán được {1/4} số nước mắm.'],
          ask: 'Cửa hàng đã bán bao nhiêu lít nước mắm?',
          hint: 'Muốn tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['Cửa hàng', 'đã bán số', 'lít nước mắm', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 36, op: ':', b: 4, result: 9, unit: 'l' },
          units: ['l', 'kg', 'lần'],
        },
      ],
    },
  ],
};
