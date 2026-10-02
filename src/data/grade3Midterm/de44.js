/** Đề số 44. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 46. */
export default {
  id: 'de-44',
  title: 'Đề số 44',
  short: 'Đề 44',
  desc: 'Bảng nhân, gấp một số lên nhiều lần, một phần mấy, phép chia có dư, vẽ đoạn thẳng',
  review: 'gấp một số lên nhiều lần, một phần mấy và phép chia có dư',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Tính: 7 × 8 = ?', options: ['56', '65', '49', '63'], ans: 0 },
        { type: 'mc', prompt: 'Mẹ 30 tuổi, con 5 tuổi. Hỏi tuổi mẹ gấp mấy lần tuổi con?', options: ['5 lần', '3 lần', '6 lần', '2 lần'], ans: 2 },
        { type: 'mc', prompt: 'Gấp 3 lít lên 5 lần thì được:', options: ['8 lít', '2 lít', '20 lít', '15 lít'], ans: 3 },
        { type: 'mc', prompt: '{1/7} của 63 kg là:', options: ['441 kg', '9 kg', '15 kg', '11 kg'], ans: 1 },
        { type: 'mc', prompt: 'Trong các phép chia có dư với số chia là 6, số dư lớn nhất của các phép chia đó là:', options: ['3', '4', '6', '5'], ans: 3 },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = thích hợp vào chỗ chấm:',
          items: [
            { t: '2 m 20 cm … 2 m 25 cm', ans: '<' },
            { t: '4 cm 3 mm … 403 mm', ans: '<' },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['24 × 5', '35 × 6', '63 : 3', '48 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 9 − 18', '36 : 6 + 14'] },
        {
          type: 'draw',
          items: [
            { prompt: 'a) Vẽ đoạn thẳng AB dài 9 cm.', name: 'AB', len: 9 },
            { prompt: 'b) Vẽ đoạn thẳng CD có độ dài bằng {1/3} độ dài đoạn thẳng AB.', name: 'CD', len: 3 },
          ],
        },
        {
          type: 'word',
          text: 'Một cửa hiệu buổi sáng bán được 25 quyển vở. Buổi chiều bán nhiều gấp 3 lần buổi sáng. Hỏi cửa hiệu đó, buổi chiều bán bao nhiêu quyển vở?',
          given: ['Buổi sáng bán được 25 quyển vở.', 'Buổi chiều bán gấp 3 lần buổi sáng.'],
          ask: 'Buổi chiều bán bao nhiêu quyển vở?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Buổi chiều', 'cửa hiệu bán được', 'số quyển vở là:'],
          decoys: ['còn lại'],
          expr: { a: 25, op: '×', b: 3, result: 75, unit: 'quyển vở' },
          units: ['quyển vở', 'lần', 'buổi'],
        },
      ],
    },
  ],
};
