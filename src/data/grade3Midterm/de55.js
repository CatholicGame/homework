/** Đề số 55. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 57. */
export default {
  id: 'de-55',
  title: 'Đề số 55',
  short: 'Đề 55',
  desc: 'So sánh số có ba chữ số, đọc viết số, bảng chia 7, một phần mấy, tìm x',
  review: 'so sánh số, bảng chia và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'A. Phần Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số lớn nhất trong các số 346; 436; 464; 435 là:', options: ['346', '436', '464', '435'], ans: 2 },
        { type: 'mc', prompt: 'Số bé nhất trong các số 468, 369, 396, 486 là:', options: ['468', '369', '396', '486'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép tính 500 + 50 + 4 là:', options: ['554', '545', '504', '550'], ans: 0 },
        { type: 'mc', prompt: 'Số ba trăm bảy mươi lăm viết là:', options: ['573', '375', '357', '300705'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép chia 49 : 7 là:', options: ['5', '6', '7', '8'], ans: 2 },
        { type: 'mc', prompt: '{1/3} của 15 m là:', options: ['4 m', '5 m', '6 m', '7 m'], ans: 1 },
      ],
    },
    {
      title: 'B. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['234 + 432', '356 − 156', '16 × 6', '76 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['87 − x = 30', '42 : x = 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 8 − 26', '48 : 4 + 25'] },
        {
          type: 'word',
          text: 'Mai làm được 30 bông hoa bằng giấy, Mai tặng bạn {1/6} số bông hoa đó. Hỏi Mai tặng bạn bao nhiêu bông hoa?',
          given: ['Mai làm được 30 bông hoa.', 'Mai tặng bạn {1/6} số bông hoa.'],
          ask: 'Mai tặng bạn bao nhiêu bông hoa?',
          hint: 'Muốn tìm {1/6} của một số thì lấy số đó chia cho 6.',
          sentence: ['Mai', 'tặng bạn số', 'bông hoa', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 30, op: ':', b: 6, result: 5, unit: 'bông hoa' },
          units: ['bông hoa', 'bạn', 'lần'],
        },
      ],
    },
  ],
};
