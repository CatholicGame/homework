/** Đề số 60. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 62. */
export default {
  id: 'de-60',
  title: 'Đề số 60',
  short: 'Đề 60',
  desc: 'Số liền trước, một phần mấy, gấp và giảm một số lần, góc vuông, tìm x',
  review: 'gấp và giảm một số lần, một phần mấy và góc vuông',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'PHẦN I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số liền trước của <b>900</b> là:', options: ['999', '899', '800', '898'], ans: 1 },
        { type: 'mc', prompt: '{1/7} của 42 kg là bao nhiêu?', options: ['6', '6 kg', '7 kg', '8 kg'], ans: 1 },
        { type: 'mc', prompt: 'Số cần điền vào ô trống trong phép tính □ : 6 = 12 là số nào?', options: ['72', '32', '12', '42'], ans: 0 },
        { type: 'mc', prompt: 'Đoạn thẳng AB dài 4 cm, đoạn thẳng CD dài gấp 6 lần đoạn thẳng AB. Hỏi đoạn thẳng CD dài bao nhiêu?', options: ['24 mm', '24', '24 dm', '24 cm'], ans: 3 },
        { type: 'mc', prompt: 'Mỗi tuần lễ có 7 ngày, hỏi 4 tuần lễ có tất cả bao nhiêu ngày?', options: ['11 ngày', '24 ngày', '28 ngày', '32 ngày'], ans: 2 },
        {
          type: 'mc',
          prompt: 'Số góc vuông có trong hình vẽ bên là:',
          fig: '<svg viewBox="0 0 180 110" width="180" xmlns="http://www.w3.org/2000/svg"><path d="M10 25 L170 6 L170 104 L10 104 Z" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['1', '2', '3', '4'],
          ans: 1,
        },
      ],
    },
    {
      title: 'PHẦN II: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['541 − 127', '168 + 503', '35 × 6', '46 : 5'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['42 : x = 7', 'x × 6 = 30'] },
        { type: 'calc', prompt: 'Tính:', items: ['45 : 5 + 347', '26 × 5 − 34'] },
        {
          type: 'word',
          text: 'Một công việc làm bằng tay hết 40 giờ, nếu làm bằng máy thì thời gian giảm 5 lần. Hỏi làm công việc đó bằng máy thì hết bao nhiêu giờ?',
          given: ['Làm bằng tay hết 40 giờ.', 'Làm bằng máy thì thời gian giảm 5 lần.'],
          ask: 'Làm bằng máy thì hết bao nhiêu giờ?',
          hint: 'Giảm một số đi 5 lần thì lấy số đó chia cho 5.',
          sentence: ['Làm công việc đó', 'bằng máy', 'hết số giờ', 'là:'],
          decoys: ['bằng tay'],
          expr: { a: 40, op: ':', b: 5, result: 8, unit: 'giờ' },
          units: ['giờ', 'phút', 'lần'],
        },
      ],
    },
  ],
};
