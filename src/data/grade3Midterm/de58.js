/** Đề số 58. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 60. */
export default {
  id: 'de-58',
  title: 'Đề số 58',
  short: 'Đề 58',
  desc: 'Cấu tạo số, đổi đơn vị đo, phép chia có dư, bảng nhân chia 6 và 7, vẽ đoạn thẳng',
  review: 'cấu tạo số, đổi đơn vị đo và bảng nhân, bảng chia 6 và 7',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số gồm 3 đơn vị, 5 trăm, 7 chục viết là:', options: ['357', '573', '375', '537'], ans: 1 },
        { type: 'mc', prompt: 'Chữ số 5 trong số 9853 chỉ:', options: ['5 đơn vị', '5 chục', '5 trăm', '5 nghìn'], ans: 1 },
        { type: 'mc', prompt: 'Liền trước số 298 là số:', options: ['299', '300', '289', '297'], ans: 3 },
        { type: 'mc', prompt: '4 hm = … m', options: ['40', '4', '400', '4000'], ans: 2 },
        { type: 'mc', prompt: 'So sánh 6 m 3 cm … 603 cm', options: ['6 m 3 cm > 603 cm', '6 m 3 cm = 603 cm', '6 m 3 cm < 603 cm', 'Không so sánh được'], ans: 1, cols: 2 },
        // sửa: đề in A. 6, B. 4, C. 1, D. 7 (không có đáp án đúng); số dư lớn nhất khi chia cho 6 là 5, đổi A thành 5.
        { type: 'mc', prompt: 'Trong phép chia có dư với số chia là 6, số dư lớn nhất của phép chia đó là?', options: ['5', '4', '1', '7'], ans: 0 },
      ],
    },
    {
      title: 'II. Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['42 : 6', '6 × 8', '28 : 7', '6 × 4', '63 : 7', '7 × 5', '54 : 6', '7 × 8'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['27 × 6', '45 × 7', '57 : 3', '68 : 4'] },
        {
          type: 'word',
          text: 'Một cửa hàng buổi sáng bán được 24 ki-lô-gam đường. Buổi chiều bán được gấp 4 lần buổi sáng. Hỏi cửa hàng buổi chiều bán được bao nhiêu ki-lô-gam đường?',
          given: ['Buổi sáng bán được 24 kg đường.', 'Buổi chiều bán được gấp 4 lần buổi sáng.'],
          ask: 'Buổi chiều bán được bao nhiêu ki-lô-gam đường?',
          hint: 'Gấp một số lên 4 lần thì lấy số đó nhân với 4.',
          sentence: ['Buổi chiều', 'cửa hàng bán được', 'số đường', 'là:'],
          decoys: ['buổi sáng'],
          expr: { a: 24, op: '×', b: 4, result: 96, unit: 'kg' },
          units: ['kg', 'g', 'lần'],
        },
        {
          type: 'draw',
          items: [
            { prompt: 'Đoạn thẳng AB dài 42 cm, đoạn thẳng CD có độ dài bằng {1/7} độ dài đoạn thẳng AB. Hãy vẽ đoạn thẳng CD.', name: 'CD', len: 6 },
          ],
        },
      ],
    },
  ],
};
