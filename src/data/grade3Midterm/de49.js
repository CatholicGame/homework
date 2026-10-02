/** Đề số 49. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 51. */
export default {
  id: 'de-49',
  title: 'Đề số 49',
  short: 'Đề 49',
  desc: 'Số lớn nhất, bé nhất, dãy số, gấp lên nhiều lần, một phần mấy, đếm hình tam giác',
  review: 'dãy số, một phần mấy và đếm hình',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số bé nhất có 3 chữ số là:', options: ['990', '900', '999', '100'], ans: 3 },
        { type: 'mc', prompt: 'Số lớn nhất có 4 chữ số là:', options: ['1111', '1001', '9999', '1000'], ans: 2 },
        { type: 'mc', prompt: 'Cho dãy số: 8; 12; 16; 20; …; …; 32; 36; 40. Hai số còn thiếu là:', options: ['24 và 26', '26 và 30', '24 và 28', '28 và 32'], ans: 2 },
        { type: 'mc', prompt: 'Thùng thứ nhất chứa 12 lít dầu, thùng thứ hai chứa gấp 5 lần thùng thứ nhất. Như vậy thùng thứ hai chứa:', options: ['17 lít dầu', '20 lít dầu', '50 lít dầu', '60 lít dầu'], ans: 3 },
        { type: 'mc', prompt: '{1/3} của 24 giờ là … giờ. Số thích hợp điền vào chỗ chấm là:', options: ['12', '8', '6', '4'], ans: 1 },
        {
          type: 'mc',
          prompt: 'Trên hình vẽ bên có mấy tam giác?',
          fig: '<svg viewBox="0 0 180 140" width="180"><rect x="10" y="10" width="160" height="120" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="90" y1="10" x2="90" y2="130" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="70" x2="170" y2="70" stroke="#1f2937" stroke-width="2"/><polygon points="90,10 170,70 90,130 10,70" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['8 hình tam giác', '10 hình tam giác', '12 hình tam giác', '15 hình tam giác'],
          ans: 2,
        },
      ],
    },
    {
      title: 'Phần 2: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['426 + 137', '590 − 76', '22 × 6', '96 : 3'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x × 5 = 55', '49 : x = 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 8 − 26', '48 : 4 + 25'] },
        {
          type: 'word',
          text: 'Năm nay mẹ em 36 tuổi, tuổi em bằng {1/4} tuổi mẹ em. Hỏi em năm nay bao nhiêu tuổi?',
          given: ['Mẹ em 36 tuổi.', 'Tuổi em bằng {1/4} tuổi mẹ.'],
          ask: 'Năm nay em bao nhiêu tuổi?',
          hint: 'Tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['Năm nay', 'tuổi của', 'em là:'],
          decoys: ['gấp lên'],
          expr: { a: 36, op: ':', b: 4, result: 9, unit: 'tuổi' },
          units: ['tuổi', 'năm', 'lần'],
        },
      ],
    },
  ],
};
