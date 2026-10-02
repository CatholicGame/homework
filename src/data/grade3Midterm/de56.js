/** Đề số 56. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 58. */
export default {
  id: 'de-56',
  title: 'Đề số 56',
  short: 'Đề 56',
  desc: 'Gấp lên nhiều lần, phép chia có dư, một phần mấy, đổi đơn vị đo, tìm x',
  review: 'phép chia có dư, một phần mấy và tìm x',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1: Trắc nghiệm',
      label: 'Bài',
      questions: [
        {
          type: 'mc',
          prompt: 'Hãy khoanh tròn vào chữ cái đặt trước câu trả lời đúng nhất:',
          items: [
            { prompt: '1. Hiện nay em 7 tuổi, tuổi của mẹ gấp 6 lần tuổi của em. Tuổi của mẹ hiện nay là:', options: ['32', '40', '42', '45'], ans: 2 },
            { prompt: '2. Trong các phép chia có dư với số chia là 6 thì số dư lớn nhất của các phép chia đó là:', options: ['6', '5', '4', '0'], ans: 1 },
            { prompt: '3. {1/4} của 28 phút là:', options: ['8 phút', '6 phút', '7 phút', '5 phút'], ans: 2 },
            { prompt: '4. 2 m 1 dm = … dm. Số thích hợp viết vào chỗ chấm là:', options: ['210', '21', '201', '2010'], ans: 1 },
          ],
        },
        { type: 'tf', prompt: 'Đúng ghi Đ, sai ghi S vào ô trống:', items: ['20 × 2 : 5 = 40', '42 : 7 + 34 = 40'], ans: ['S', 'Đ'] },
      ],
    },
    {
      title: 'Phần 2: Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['6 × 8', '7 × 7', '42 : 6', '63 : 7'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['15 × 6', '43 × 3', '77 : 7', '92 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x : 3 = 10', '28 : x = 10 − 3'] },
        {
          type: 'word',
          text: 'Một tấm vải dài 45 m, người ta đã bán đi {1/5} tấm vải đó. Hỏi người ta đã bán bao nhiêu mét vải?',
          given: ['Tấm vải dài 45 m.', 'Đã bán {1/5} tấm vải.'],
          ask: 'Người ta đã bán bao nhiêu mét vải?',
          hint: 'Muốn tìm {1/5} của một số thì lấy số đó chia cho 5.',
          sentence: ['Người ta', 'đã bán số', 'mét vải', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 45, op: ':', b: 5, result: 9, unit: 'm' },
          units: ['m', 'cm', 'tấm'],
        },
      ],
    },
  ],
};
