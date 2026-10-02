/** Đề số 24. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 26. */
export default {
  id: 'de-24',
  title: 'Đề số 24',
  short: 'Đề 24',
  desc: 'Phép chia có dư, đổi đơn vị đo, một phần mấy, vẽ đoạn thẳng, gấp lên nhiều lần',
  review: 'phép chia có dư, một phần mấy và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        // sửa: ý c đề in "3 dm 4 mm = … cm" (= 3,4 cm, không có phương án đúng), sửa thành "… mm".
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ cái đặt trước câu trả lời đúng:',
          items: [
            { prompt: 'a) Trong các phép chia có dư với số chia là 3, số dư lớn nhất của các phép chia là:', options: ['3', '2', '1', '0'], ans: 1 },
            { prompt: 'b) Phép nhân nào có kết quả bằng 30?', options: ['5 × 4', '7 × 4', '6 × 5', '7 × 7'], ans: 2 },
            { prompt: 'c) 3 dm 4 mm = … mm. Số thích hợp để điền vào chỗ chấm là:', options: ['34', '304', '340', '3400'], ans: 1 },
            { prompt: 'd) x : 7 = 8 thì x = ?', options: ['13', '35', '45', '56'], ans: 3 },
            { prompt: 'e) Năm nay con 6 tuổi, tuổi mẹ gấp 6 lần tuổi con. Vậy tuổi mẹ là:', options: ['12', '30', '36', '38'], ans: 2 },
            { prompt: 'g) {1/5} của 35 là:', options: ['40', '30', '7', '5'], ans: 2 },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['137 + 125', '340 − 128', '18 × 7', '69 : 3'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X : 4 = 36', 'X × 4 = 84'] },
        {
          type: 'draw',
          items: [
            { prompt: 'a) Vẽ một đoạn thẳng AB có độ dài 9 cm.', name: 'AB', len: 9 },
            { prompt: 'b) Vẽ đoạn thẳng CD có độ dài bằng {1/3} độ dài đoạn thẳng AB.', name: 'CD', len: 3 },
          ],
        },
        {
          type: 'word',
          text: 'Con hái được 7 quả cam, mẹ hái được số cam gấp 5 lần số cam của con. Hỏi mẹ hái được bao nhiêu quả cam?',
          given: ['Con hái được 7 quả cam.', 'Mẹ hái được gấp 5 lần số cam của con.'],
          ask: 'Mẹ hái được bao nhiêu quả cam?',
          hint: 'Gấp một số lên 5 lần thì lấy số đó nhân với 5.',
          sentence: ['Mẹ', 'hái được số', 'quả cam', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 7, op: '×', b: 5, result: 35, unit: 'quả cam' },
          units: ['quả cam', 'lần', 'cây'],
        },
      ],
    },
  ],
};
