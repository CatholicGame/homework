/** Đề số 28. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 30. */
export default {
  id: 'de-28',
  title: 'Đề số 28',
  short: 'Đề 28',
  desc: 'So sánh số, một phần mấy, chia đều, gấp lên nhiều lần, tìm X',
  review: 'một phần mấy, gấp và giảm một số đi nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Số lớn nhất trong các số 536; 499; 563; 601 là:', options: ['536', '499', '563', '601'], ans: 3 },
        { type: 'mc', prompt: '{1/5} của 40 m là:', options: ['7 m', '8 m', '6 m', '9 m'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của biểu thức 8 : 4 × 3 = … là:', options: ['6', '12', '2', '24'], ans: 0 },
        { type: 'mc', prompt: 'Có 48 kg gạo chia đều vào 4 túi. Số ki-lô-gam gạo mỗi túi có là:', options: ['14 kg', '21 kg', '12 kg', '24 kg'], ans: 2 },
        { type: 'mc', prompt: 'Có 30 viên bi, {1/6} số bi đó là:', options: ['6 viên bi', '5 viên bi', '3 viên bi', '10 viên bi'], ans: 1 },
        // sửa: đề in "Chữ số thích hợp", đáp án là số 30 nên ghi "Số thích hợp".
        {
          type: 'mc',
          prompt: 'Số thích hợp để điền vào ô trống bên là:',
          fig: '<svg viewBox="0 0 260 70" width="260"><rect x="10" y="25" width="40" height="34" stroke="#1f2937" stroke-width="2" fill="none"/><text x="30" y="48" font-size="14" fill="#1f2937" text-anchor="middle">5</text><line x1="54" y1="42" x2="194" y2="42" stroke="#1f2937" stroke-width="2"/><path d="M186 36 L196 42 L186 48 Z" fill="#1f2937"/><text x="124" y="32" font-size="14" fill="#1f2937" text-anchor="middle">gấp lên 6 lần</text><rect x="200" y="25" width="46" height="34" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          options: ['11', '25', '30', '35'],
          ans: 2,
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['265 + 127', '704 − 62', '45 × 4', '84 : 4'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['56 : X = 7', 'X : 6 = 5'] },
        { type: 'calc', prompt: 'Tính:', items: ['26 × 7 − 35', '86 : 2 + 138'] },
        {
          type: 'word',
          text: 'Một cửa hàng có 42 m vải, sau một ngày bán hàng thì số mét vải còn lại giảm đi 6 lần. Hỏi cửa hàng còn lại bao nhiêu mét vải?',
          given: ['Cửa hàng có 42 m vải.', 'Số vải còn lại giảm đi 6 lần.'],
          ask: 'Cửa hàng còn lại bao nhiêu mét vải?',
          hint: 'Giảm một số đi 6 lần thì lấy số đó chia cho 6.',
          sentence: ['Cửa hàng', 'còn lại số', 'mét vải', 'là:'],
          decoys: ['đã bán'],
          expr: { a: 42, op: ':', b: 6, result: 7, unit: 'm' },
          units: ['m', 'kg', 'lần'],
        },
      ],
    },
  ],
};
