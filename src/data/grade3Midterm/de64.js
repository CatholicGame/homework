/** Đề số 64. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 66–67. */
export default {
  id: 'de-64',
  title: 'Đề số 64',
  short: 'Đề 64',
  desc: 'Giá trị chữ số, đọc viết số, đếm hình, cộng trừ số có ba chữ số, chu vi tam giác, tìm x',
  review: 'đọc viết số có ba chữ số, cộng trừ số có ba chữ số và đếm hình',
  time: 40,
  numbering: 'continuous',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: 'Bài',
      questions: [
        {
          type: 'mc',
          prompt: 'Khoanh tròn vào chữ cái đặt trước câu trả lời đúng:',
          items: [
            { prompt: 'a) Giá trị của chữ số 3 trong số 538 là:', options: ['3', '30', '300', '538'], ans: 1 },
            { prompt: 'b) 3 chục + 8 chục =', options: ['11', '30', '80', '110'], ans: 3 },
            { prompt: 'c) 15 chục − 6 chục =', options: ['15 chục', '6 chục', '90', '9'], ans: 2 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết các số 567; 765; 657; 665 theo thứ tự từ lớn đến bé:',
          items: [{ t: '…; …; …; …', ans: [765, 665, 657, 567] }],
        },
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ cái đặt trước câu trả lời đúng:',
          fig: '<svg viewBox="0 0 220 120" width="220" xmlns="http://www.w3.org/2000/svg"><path d="M10 10 L210 10 L210 110 L10 110 Z M10 60 L210 60 M10 10 L210 60 L10 110" stroke="#1f2937" stroke-width="2" fill="none"/></svg>',
          items: [
            { prompt: 'a) Trong hình trên có: Số hình tam giác là:', options: ['3', '4', '5', '6'], ans: 2 },
            { prompt: 'b) Trong hình trên có: Số hình chữ nhật là:', options: ['4', '3', '2', '1'], ans: 1 },
          ],
        },
      ],
    },
    {
      title: 'II. Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['900 − 300', '500 + 200', '1000 − 700', '600 + 400', '35 : 5', '4 × 8'] },
        { type: 'calc', prompt: 'Đặt tính và tính:', col: true, items: ['474 + 463', '820 + 91', '453 + 152', '784 + 133'] },
        {
          type: 'fill',
          prompt: 'a) Tính chu vi tam giác có độ dài các cạnh là 22 cm, 46 cm, 25 cm.<br>b) Có 36 học sinh xếp thành 4 hàng. Hỏi mỗi hàng có mấy học sinh?',
          items: [
            { t: 'a) Chu vi hình tam giác là: … cm', ans: 93 },
            { t: 'b) Mỗi hàng có số học sinh là: … học sinh', ans: 9 },
          ],
        },
        {
          type: 'word',
          text: 'Khối lớp hai có 167 học sinh. Khối lớp ba có 127 học sinh. Hỏi cả hai khối có bao nhiêu học sinh?',
          given: ['Khối lớp hai có 167 học sinh.', 'Khối lớp ba có 127 học sinh.'],
          ask: 'Cả hai khối có bao nhiêu học sinh?',
          hint: 'Muốn tìm số học sinh cả hai khối thì cộng số học sinh của hai khối.',
          sentence: ['Cả hai khối', 'có số', 'học sinh', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 167, op: '+', b: 127, result: 294, unit: 'học sinh' },
          units: ['học sinh', 'khối', 'lớp'],
        },
        {
          type: 'fill',
          prompt: 'a) Đọc các số sau. b) Viết các số sau.',
          items: [
            { t: '205: …', ans: 'Hai trăm linh năm|Hai trăm lẻ năm' },
            { t: '535: …', ans: 'Năm trăm ba mươi lăm' },
            { t: 'Năm trăm ba mươi: …', ans: 530 },
            { t: 'Một trăm hai mươi lăm: …', ans: 125 },
          ],
        },
        { type: 'findx', prompt: 'Tìm X:', items: ['400 + X = 200 × 3', '245 − X = 180'] },
        {
          type: 'fill',
          prompt: 'Tìm một số biết rằng số đó cộng với 20 rồi cộng với 55 thì được kết quả là 87.',
          items: [{ t: 'Số cần tìm là: …', ans: 12 }],
        },
      ],
    },
  ],
};
