/** Đề số 61. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 63. */
export default {
  id: 'de-61',
  title: 'Đề số 61',
  short: 'Đề 61',
  desc: 'So sánh số, bảng nhân, gấp lên nhiều lần, một phần mấy, tìm x',
  review: 'bảng nhân, gấp lên nhiều lần và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'A. Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Cho các số: 399; 421; 573; 241; 735; 142. Số lớn nhất trong các số trên là:', options: ['573', '735', '142', '399'], ans: 1 },
        { type: 'mc', prompt: '5 × 7 … 5 × 6. Dấu cần điền vào chỗ trống là:', options: ['<', '>', '=', 'không có dấu nào'], ans: 1 },
        { type: 'mc', prompt: 'Có 10 quả cam xếp vào các đĩa, mỗi đĩa 2 quả. Hỏi xếp được vào mấy đĩa?', options: ['20 đĩa', '4 đĩa', '5 đĩa', '10 đĩa'], ans: 2 },
        { type: 'mc', prompt: '5 gấp 8 lần là:', options: ['40', '42', '45', '35'], ans: 0 },
        { type: 'mc', prompt: '4 × 6 + 7 = ?', options: ['17', '27', '31', '33'], ans: 2 },
        { type: 'mc', prompt: '{1/6} của 24 m là:', options: ['7 m', '6 m', '6', '4 m'], ans: 3 },
      ],
    },
    {
      title: 'B. Phần II: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['234 + 432', '765 − 146', '28 × 6', '48 : 4'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x : 6 = 9', 'x × 5 = 35'] },
        { type: 'calc', prompt: 'Tính:', items: ['7 × 8 − 26', '48 : 4 + 25'] },
        {
          type: 'word',
          text: 'Một cửa hàng có 40 m vải xanh. Cửa hàng đã bán được {1/5} số vải đó. Hỏi cửa hàng đã bán mấy mét vải xanh?',
          given: ['Cửa hàng có 40 m vải xanh.', 'Đã bán được {1/5} số vải.'],
          ask: 'Cửa hàng đã bán mấy mét vải xanh?',
          hint: 'Muốn tìm {1/5} của một số thì lấy số đó chia cho 5.',
          sentence: ['Cửa hàng', 'đã bán được số', 'mét vải xanh', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 40, op: ':', b: 5, result: 8, unit: 'm' },
          units: ['m', 'cm', 'tấm'],
        },
      ],
    },
  ],
};
