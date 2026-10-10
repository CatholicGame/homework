/** Kiểm tra tổng hợp 2 (Đề 1): Bài 7–14 Vở BT Toán 2 (Nhanh 3 + Nhanh 4, ôn Bài 1–6). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l2-th-02',
  kind: 'tonghop',
  title: 'Kiểm tra tổng hợp 2 (Đề 1)',
  short: 'Tổng hợp 2 · Đề 1',
  after: { book: 'workbook2', units: '7-14' },
  desc: 'Cộng, trừ qua 10 trong phạm vi 20; bảng cộng, bảng trừ; bài toán thêm, bớt, nhiều hơn; ôn cộng, trừ số tròn chục, hơn kém',
  time: 35,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: đếm tiếp thiếu một (12), lấy 8 − 5 (3), đếm tiếp thừa một (14).
      { type: 'mc', bai: 8, point: 0, level: 1,
        prompt: '8 + 5 = ?',
        options: ['13', '12', '3', '14'], ans: 0 },
      // Nhiễu: chép số thứ hai (5), lấy phần còn lại sau khi tách (2), viết luôn số 10.
      { type: 'mc', bai: 7, point: 0, level: 1,
        prompt: 'Tính 7 + 5 bằng cách làm tròn 10. Số cần thêm vào 7 để được 10 là:',
        options: ['3', '5', '2', '10'], ans: 0 },
      // Ý sai: lệch một (14 − 6 = 9, 15 − 8 = 6).
      { type: 'tf', bai: 12, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['12 − 5 = 7', '14 − 6 = 9', '11 − 3 = 8', '15 − 8 = 6'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Ôn nhẩm số tròn chục: hai phép tính cùng ra 40.
      { type: 'match', bai: 5, point: 0, level: 1, review: true, multi: true,
        prompt: 'Tính nhẩm rồi nối mỗi phép tính với kết quả đúng:',
        left: ['70 − 30', '20 + 50', '90 − 60', '10 + 30'],
        right: ['30', '40', '70'],
        ans: [1, 2, 0, 1] },
      // Nhiễu: thấy "nhiều hơn" mà trừ (6), chép số hơn (3), cộng sai (11).
      { type: 'mc', bai: 13, point: 0, level: 2,
        prompt: 'Hàng trên có 9 bông hoa. Hàng dưới nhiều hơn hàng trên 3 bông hoa. Hàng dưới có mấy bông hoa?',
        options: ['12', '6', '3', '11'], ans: 0 },
      // Nhiễu: cộng hai số (71), chép số bé (23).
      { type: 'mc', bai: 4, point: 0, level: 2, review: true,
        prompt: 'Số 48 hơn số 23 bao nhiêu đơn vị?',
        options: ['25', '71', '23'], ans: 0 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [8, 12], point: 0, level: 1,
        prompt: 'Tính nhẩm:',
        items: ['9 + 6', '7 + 8', '5 + 6', '11 − 4', '13 − 7', '17 − 8'] },
      { type: 'fill', bai: 11, point: 1, level: 2,
        prompt: 'Tính 14 − 6 bằng cách tách 14 thành 10 và phần lẻ:',
        items: [
          { t: '14 = 10 + …', ans: 4 },
          { t: '10 − 6 = …', ans: 4 },
          { t: '4 + 4 = …', ans: 8 },
          { t: 'Vậy 14 − 6 = …', ans: 8 },
        ] },
      {
        type: 'word', bai: 9, point: 1, level: 3,
        text: 'Trên cành cây có 15 con chim đang đậu. Có 7 con chim bay đi. Hỏi trên cành cây còn lại bao nhiêu con chim?',
        given: ['Có 15 con chim đang đậu.', '7 con chim bay đi.'],
        ask: 'Trên cành cây còn lại bao nhiêu con chim?',
        hint: 'Bay đi thì bớt đi: lấy số chim lúc đầu trừ số chim bay đi.',
        sentence: ['Trên cành cây', 'còn lại', 'số con chim', 'là:'],
        decoys: ['tất cả'],
        expr: { a: 15, op: '−', b: 7, result: 8, unit: 'con chim' },
        units: ['con chim', 'cành cây', 'con mèo'],
      },
      // Dựa vào bảng cộng để tìm số còn thiếu.
      { type: 'fill', bai: 12, point: 1, level: 3,
        prompt: 'Số?',
        items: ['□ − 6 = 7', '9 + □ = 17', '15 − □ = 9'] },
    ] },
  ],
};
