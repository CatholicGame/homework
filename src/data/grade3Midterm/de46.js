/** Đề số 46. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 48. */
export default {
  id: 'de-46',
  title: 'Đề số 46',
  short: 'Đề 46',
  desc: 'Gấp và giảm một số lần, một phần mấy, phép chia có dư, bảng nhân chia',
  review: 'bảng nhân, bảng chia, gấp và giảm một số lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Gấp 3 lít lên 5 lần thì được:', options: ['8 lít', '2 lít', '20 lít', '15 lít'], ans: 3 },
        { type: 'mc', prompt: '{1/7} của 49 kg là:', options: ['343 kg', '7 kg', '42 kg', '11 kg'], ans: 1 },
        { type: 'mc', prompt: 'Mẹ 30 tuổi, con 6 tuổi. Hỏi tuổi mẹ gấp mấy lần tuổi con?', options: ['5 lần', '3 lần', '6 lần', '2 lần'], ans: 0 },
        { type: 'mc', prompt: 'Trong các phép chia có dư với số chia là 5, số dư lớn nhất của các phép chia đó là:', options: ['3', '4', '6', '2'], ans: 1 },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp vào chỗ chấm:',
          items: [
            { t: '2 m 30 cm … 2 m 35 cm', ans: '<' },
            { t: '4 cm 6 mm … 406 mm', ans: '<' },
          ],
        },
        {
          type: 'fill',
          prompt: 'Điền số thích hợp vào ô trống:',
          fig: '<svg viewBox="0 0 320 70" width="320"><ellipse cx="25" cy="40" rx="20" ry="15" stroke="#1f2937" stroke-width="2" fill="none"/><text x="20" y="45" font-size="14" fill="#1f2937">6</text><line x1="45" y1="40" x2="140" y2="40" stroke="#1f2937" stroke-width="2"/><polygon points="140,40 132,35 132,45" fill="#1f2937"/><text x="58" y="30" font-size="14" fill="#1f2937">Gấp 7 lần</text><rect x="142" y="22" width="40" height="36" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="182" y1="40" x2="268" y2="40" stroke="#1f2937" stroke-width="2"/><polygon points="268,40 260,35 260,45" fill="#1f2937"/><text x="192" y="30" font-size="14" fill="#1f2937">Giảm 2 lần</text><polygon points="292,8 270,62 314,62" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          items: [
            { t: 'Số ở ô vuông: …', ans: 42 },
            { t: 'Số ở hình tam giác: …', ans: 21 },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính:', items: ['7 × 5', '1 × 7', '36 : 6', '6 × 7', '6 × 6', '42 : 7', '6 × 4', '6 × 0', '0 : 7'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['37 × 5', '21 × 7', '84 : 4', '66 : 3'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X : 7 = 5', '42 : X = 6'] },
        {
          type: 'word',
          text: 'Một cửa hàng có 24 kg táo và đã bán được {1/3} số táo đó. Hỏi cửa hàng đã bán bao nhiêu ki-lô-gam táo?',
          given: ['Cửa hàng có 24 kg táo.', 'Đã bán {1/3} số táo.'],
          ask: 'Cửa hàng đã bán bao nhiêu ki-lô-gam táo?',
          hint: 'Tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Cửa hàng', 'đã bán được số', 'ki-lô-gam táo là:'],
          decoys: ['còn lại'],
          expr: { a: 24, op: ':', b: 3, result: 8, unit: 'kg' },
          units: ['kg', 'quả', 'lần'],
        },
      ],
    },
  ],
};
