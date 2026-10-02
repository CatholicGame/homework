/** Đề số 17. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 19. */
export default {
  id: 'de-17',
  title: 'Đề số 17',
  short: 'Đề 17',
  desc: 'Bảng nhân 6, 7, tìm X, đổi đơn vị đo, gấp lên nhiều lần, một phần mấy',
  review: 'bảng nhân 6, 7, tìm X và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I/ Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: '6 × 9 + 6 = … Số cần điền vào chỗ chấm là:', options: ['54', '56', '60', '63'], ans: 2 },
        { type: 'mc', prompt: '7 × 9 = … Số cần điền vào chỗ chấm là:', options: ['63', '36', '64', '70'], ans: 0 },
        { type: 'mc', prompt: 'X × 6 = 48. Số X cần tìm là:', options: ['7', '8', '42', '54'], ans: 1 },
        { type: 'mc', prompt: '6 m 3 cm = … cm. Số cần điền vào chỗ chấm là:', options: ['63 cm', '603 cm', '630 cm', '600 cm'], ans: 1 },
        { type: 'mc', prompt: 'Hồng hái được 6 quả cam, Lan hái được gấp 7 lần số cam của Hồng. Số cam Lan hái được là:', options: ['13 quả', '35 quả', '43 quả', '42 quả'], ans: 3 },
        { type: 'mc', prompt: '{1/7} của 56 là:', options: ['63', '49', '7', '8'], ans: 3 },
      ],
    },
    {
      title: 'II/ Phần thực hành',
      label: 'Câu',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['63 : 3', '23 × 3', '32 × 4', '64 : 4'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['56 : X = 7', 'X × 6 = 42'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 9 − 18', '6 × 8 + 134'] },
        {
          type: 'word',
          text: 'Lớp 3A thu nhặt được 36 kg giấy vụn, lớp 3B thu nhặt được gấp 2 lần số giấy lớp 3A. Hỏi lớp 3B thu nhặt được bao nhiêu ki-lô-gam giấy vụn?',
          given: ['Lớp 3A thu nhặt được 36 kg giấy vụn.', 'Lớp 3B thu nhặt được gấp 2 lần lớp 3A.'],
          ask: 'Lớp 3B thu nhặt được bao nhiêu ki-lô-gam giấy vụn?',
          hint: 'Gấp một số lên 2 lần thì lấy số đó nhân với 2.',
          sentence: ['Lớp 3B', 'thu nhặt được số', 'ki-lô-gam giấy vụn', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 36, op: '×', b: 2, result: 72, unit: 'kg' },
          units: ['kg', 'lớp', 'lần'],
        },
      ],
    },
  ],
};
