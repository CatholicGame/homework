/** Kiểm tra nhanh 1: Bài 1–3 Toán 4 (số đến 100 000; các phép tính trong phạm vi 100 000; số chẵn, số lẻ). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-nh-01',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 1',
  short: 'Nhanh 1',
  after: { book: 'tool4', units: '1-3' },
  desc: 'Số đến 100 000; các phép tính trong phạm vi 100 000; số chẵn, số lẻ',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: lấy chữ số (6), nhầm hàng nghìn (6 000), nhầm hàng trăm (600).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Trong số 63 905, chữ số 6 có giá trị là:',
        options: ['6', '60 000', '6 000', '600'], ans: 1 },
      // Ý sai: nhìn chữ số đầu thay vì chữ số tận cùng (21 348 là số chẵn), 40 517 tận cùng 7 nên lẻ.
      { type: 'tf', bai: 3, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['58 316 là số chẵn.', '21 348 là số lẻ.', '40 517 là số chẵn.', '7 009 là số lẻ.'],
        ans: ['Đ', 'S', 'S', 'Đ'] },
      // Làm tròn 47 580 đến hàng nghìn: chữ số hàng trăm là 5 nên làm tròn lên 48 000.
      // Nhiễu: làm tròn xuống (47 000), làm tròn đến hàng chục nghìn (50 000), đến hàng trăm (47 600).
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Làm tròn số 47 580 đến hàng nghìn thì được số:',
        options: ['47 000', '48 000', '50 000', '47 600'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 2, point: 0, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['36 528 + 47 395', '81 204 − 25 637', '12 406 × 4', '27 615 : 5'] },
      // 4 hộp bút giá 15 000 đồng một hộp: 60 000 đồng; đưa 100 000 đồng, được trả lại 40 000 đồng.
      { type: 'fill', bai: 2, point: 3, level: 3,
        prompt: 'Mẹ mua 4 hộp bút chì, mỗi hộp giá 15 000 đồng. Mẹ đưa cô bán hàng tờ 100 000 đồng. Hỏi cô bán hàng trả lại mẹ bao nhiêu tiền?',
        items: [
          { t: 'Mua 4 hộp bút hết: 15 000 × 4 = … (đồng)', ans: [60000] },
          { t: 'Cô bán hàng trả lại: 100 000 − 60 000 = … (đồng)', ans: [40000] },
        ] },
    ] },
  ],
};
