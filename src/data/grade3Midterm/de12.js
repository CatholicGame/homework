/** Đề số 12. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 14. */
export default {
  id: 'de-12',
  title: 'Đề số 12',
  short: 'Đề 12',
  desc: 'Số có ba, bốn chữ số, dãy số, một phần mấy, phép chia có dư, góc vuông, đếm hình',
  review: 'một phần mấy, phép chia có dư và đếm hình',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số bé nhất có 4 chữ số là:', options: ['1000', '1001', '1010', '1111'], ans: 0 },
        { type: 'mc', prompt: 'Số lớn nhất có 3 chữ số là:', options: ['990', '999', '900', '100'], ans: 1 },
        { type: 'mc', prompt: 'Cho dãy số: 7; 14; 21; 28; …; …; 49; 56; 63; 70. Hai số còn thiếu là:', options: ['30 và 32', '36 và 38', '35 và 42', '38 và 40'], ans: 2 },
        { type: 'mc', prompt: 'Trong rổ có 18 quả cam, lấy ra {1/3} số quả cam. Như vậy đã lấy ra:', options: ['3 quả cam', '6 quả cam', '15 quả cam', '12 quả cam'], ans: 1 },
        { type: 'mc', prompt: '{1/6} của 24 giờ là … giờ. Số thích hợp điền vào chỗ chấm là:', options: ['4', '12', '18', '6'], ans: 0 },
        { type: 'mc', prompt: 'Trong các phép chia có dư với số chia là 5, thì số dư lớn nhất của các phép chia đó là:', options: ['5', '4', '3', '2'], ans: 1 },
        {
          type: 'mc',
          prompt: 'Hình vẽ bên có … góc vuông. Số thích hợp điền vào chỗ chấm là:',
          fig: '<svg viewBox="0 0 184 84" width="200"><g stroke="#1f2937" stroke-width="2" fill="none"><rect x="2" y="2" width="180" height="80"/><line x1="60" y1="2" x2="60" y2="82"/></g></svg>',
          options: ['12', '10', '8', '4'],
          ans: 2,
        },
        {
          type: 'mc',
          prompt: 'Trên hình vẽ bên có mấy tam giác, mấy hình vuông?',
          fig: '<svg viewBox="0 0 124 124" width="160"><g stroke="#1f2937" stroke-width="2" fill="none"><rect x="2" y="2" width="120" height="120"/><line x1="62" y1="2" x2="62" y2="122"/><line x1="2" y1="62" x2="122" y2="62"/><line x1="2" y1="122" x2="122" y2="2"/></g></svg>',
          options: ['5 hình vuông, 4 hình tam giác', '4 hình vuông, 5 hình tam giác', '5 hình vuông, 6 hình tam giác', '6 hình vuông, 5 hình tam giác'],
          ans: 2,
          cols: 2,
        },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['426 + 137', '590 − 76', '27 × 6', '96 : 3'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X × 6 = 54', '49 : X = 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['18 × 6 − 29', '90 : 3 + 108'] },
        {
          type: 'word',
          text: 'Lớp em có 42 học sinh. Tổ em có số bạn bằng {1/7} số học sinh cả lớp. Hỏi tổ em có bao nhiêu bạn?',
          given: ['Lớp em có 42 học sinh.', 'Tổ em có số bạn bằng {1/7} số học sinh cả lớp.'],
          ask: 'Tổ em có bao nhiêu bạn?',
          hint: 'Muốn tìm {1/7} của một số thì lấy số đó chia cho 7.',
          sentence: ['Tổ em', 'có số', 'bạn', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 42, op: ':', b: 7, result: 6, unit: 'bạn' },
          units: ['bạn', 'tổ', 'lớp'],
        },
      ],
    },
  ],
};
