/** Kiểm tra nhanh 8: Bài 26–29 Vở BT Toán 3 (chia số có hai chữ số cho số có một chữ số; giảm đi một số lần; bài toán hai bước tính). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l3-nh-08',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 8',
  short: 'Nhanh 8',
  after: { book: 'workbook', units: '26-29' },
  desc: 'Chia số có hai chữ số cho số có một chữ số; giảm đi một số lần; bài toán giải bằng hai bước tính',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: "giảm đi 4 lần" làm thành "bớt 4" (20), nhầm sang gấp lên (96), thêm 4 (28).
      { type: 'mc', bai: 27, point: 0, level: 1,
        prompt: 'Giảm 24 đi 4 lần thì được:',
        options: ['20', '6', '96', '28'], ans: 1 },
      // Nhiễu: số dư lớn hơn số chia (8 dư 7), bỏ quên số dư (9), trừ sai ra dư 3.
      { type: 'mc', bai: 26, point: 3, level: 1,
        prompt: '47 : 5 = ?',
        options: ['8 (dư 7)', '9 (dư 2)', '9', '9 (dư 3)'], ans: 1 },
      // Phân biệt gấp lên / giảm đi (nhân, chia) với thêm / bớt (cộng, trừ).
      { type: 'match', bai: 27, point: 3, level: 1,
        prompt: 'Nối mỗi cách tính với kết quả đúng:',
        left: ['8 gấp lên 2 lần', '8 giảm đi 2 lần', '8 thêm 2', '8 bớt đi 2'],
        right: ['4', '6', '10', '16'],
        ans: [3, 0, 2, 1] },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: 26, point: 1, level: 2, col: true,
        prompt: 'Đặt tính rồi tính:',
        items: ['84 : 4', '96 : 3', '75 : 5', '58 : 6'] },
      // Bài toán hai bước: tìm số gạo buổi chiều rồi tìm cả hai buổi.
      { type: 'fill', bai: 28, point: 2, level: 3,
        prompt: 'Buổi sáng cửa hàng bán được 35 kg gạo. Buổi chiều bán được ít hơn buổi sáng 8 kg gạo. Hỏi cả hai buổi cửa hàng bán được bao nhiêu ki-lô-gam gạo?',
        items: [
          { t: 'Buổi chiều bán được: … − … = … (kg)', ans: [35, 8, 27] },
          { t: 'Cả hai buổi bán được: … + … = … (kg)', ans: [35, 27, 62] },
        ] },
    ] },
  ],
};
