/** Đề số 4. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 6. */
export default {
  id: 'de-04',
  title: 'Đề số 4',
  short: 'Đề 4',
  desc: 'Tính giá trị biểu thức, tìm x, một phần mấy, đổi đơn vị đo',
  review: 'tính giá trị biểu thức, tìm x và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '8 × 7 + 42 = ?', options: ['120', '98', '14', '36'], ans: 1 },
        { type: 'mc', prompt: '7 × X = 56 thì X = ?', options: ['392', '49', '63', '8'], ans: 3 },
        { type: 'mc', prompt: '{1/6} của 1 giờ là:', options: ['15 phút', '10 phút', '12 phút', '20 phút'], ans: 1 },
        { type: 'mc', prompt: 'Tìm x biết: 96 : x = 3', options: ['x = 32', 'x = 303', 'x = 302', 'x = 203'], ans: 0 },
        { type: 'mc', prompt: '5 m 6 cm = … cm. Số thích hợp để điền vào chỗ chấm là:', options: ['56', '506', '560', '5600'], ans: 1 },
        { type: 'mc', prompt: 'Một tuần lễ có 7 ngày, 4 tuần lễ có số ngày là:', options: ['28', '21', '11', '35'], ans: 0 },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['157 + 109', '548 − 193', '16 × 5', '86 : 2'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['X : 7 = 63', 'X × 6 = 54'] },
        { type: 'calc', prompt: 'Tính:', items: ['28 × 7 − 58', '96 : 3 + 249'] },
        {
          type: 'word',
          text: 'Mẹ có một tấm vải dài 48 m. Mẹ đã may áo cho cả nhà hết {1/2} số vải đó. Hỏi mẹ đã may bao nhiêu mét vải?',
          given: ['Tấm vải dài 48 m.', 'Mẹ đã may hết {1/2} số vải đó.'],
          ask: 'Mẹ đã may bao nhiêu mét vải?',
          hint: 'Muốn tìm {1/2} của một số thì lấy số đó chia cho 2.',
          sentence: ['Mẹ đã may', 'số mét vải', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 48, op: ':', b: 2, result: 24, unit: 'm' },
          units: ['m', 'cm', 'áo'],
        },
      ],
    },
  ],
};
