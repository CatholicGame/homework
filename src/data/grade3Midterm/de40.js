/** Đề số 40. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 42. */
export default {
  id: 'de-40',
  title: 'Đề số 40',
  short: 'Đề 40',
  desc: 'Một phần mấy, đổi đơn vị đo, dãy số, gấp lên nhiều lần, vẽ đoạn thẳng',
  review: 'một phần mấy, đổi đơn vị đo độ dài và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '{1/7} của 49 kg là … kg', options: ['7', '6', '5', '8'], ans: 0 },
        { type: 'mc', prompt: '{1/6} của 54 phút là … phút', options: ['8', '7', '9', '6'], ans: 2 },
        { type: 'mc', prompt: '8 hm = … m', options: ['8', '80', '800', '8000'], ans: 2 },
        // sửa: dãy 14; 18; 22; …; 30 cần số 26 nhưng đề không có, đổi phương án D từ 28 thành 26.
        { type: 'mc', prompt: 'Số thích hợp điền vào chỗ chấm là: 14; 18; 22; …; 30', options: ['16', '20', '24', '26'], ans: 3 },
        { type: 'mc', prompt: 'Mỗi tuần lễ có 7 ngày. Vậy 4 tuần lễ có bao nhiêu ngày?', options: ['24 ngày', '28 ngày', '30 ngày', '32 ngày'], ans: 1 },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp vào chỗ chấm:',
          items: [
            { t: '7 dm 8 cm … 78 cm', ans: '=' },
            { t: '6 m 7 dm … 670 dm', ans: '<' },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['29 × 7', '16 × 6', '93 : 3', '88 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x : 7 = 6', 'x × 7 = 49'] },
        {
          type: 'word',
          text: 'Lớp 3A trồng được 27 cây, lớp 3B trồng được gấp 3 lần số cây lớp 3A. Hỏi lớp 3B trồng được bao nhiêu cây?',
          given: ['Lớp 3A trồng được 27 cây.', 'Lớp 3B trồng gấp 3 lần lớp 3A.'],
          ask: 'Lớp 3B trồng được bao nhiêu cây?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Lớp 3B', 'trồng được số', 'cây là:'],
          decoys: ['còn lại'],
          expr: { a: 27, op: '×', b: 3, result: 81, unit: 'cây' },
          units: ['cây', 'lớp', 'lần'],
        },
        {
          type: 'draw',
          items: [
            { prompt: 'a) Vẽ đoạn thẳng AB có độ dài 10 cm.', name: 'AB', len: 10 },
            { prompt: 'b) Vẽ đoạn thẳng CD có độ dài bằng {1/5} độ dài đoạn thẳng AB.', name: 'CD', len: 2 },
          ],
        },
      ],
    },
  ],
};
