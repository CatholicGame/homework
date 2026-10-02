/** Đề số 52. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 54. */
export default {
  id: 'de-52',
  title: 'Đề số 52',
  short: 'Đề 52',
  desc: 'Một phần mấy, gấp lên nhiều lần, đổi đơn vị đo, giờ và phút, vẽ đoạn thẳng',
  review: 'một phần mấy, gấp lên nhiều lần và đổi đơn vị đo',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '{1/6} của 18 phút là:', options: ['6 phút', '3 phút', '4 phút', '2 phút'], ans: 1 },
        { type: 'mc', prompt: 'Trong các phép chia sau, phép chia có thương bé nhất là:', options: ['12 : 2', '12 : 6', '12 : 4', '12 : 3'], ans: 1 },
        { type: 'mc', prompt: 'Hiện nay em 7 tuổi, tuổi của cha gấp 8 lần tuổi của em. Tuổi của cha hiện nay là:', options: ['42 tuổi', '49 tuổi', '56 tuổi', '63 tuổi'], ans: 2 },
        { type: 'mc', prompt: '2 m 2 dm = … dm. Số thích hợp viết vào chỗ chấm là:', options: ['220', '22', '202', '2020'], ans: 1 },
        { type: 'tf', prompt: 'Đúng ghi Đ, sai ghi S vào ô trống:', items: ['20 × 2 : 5 = 40', '42 : 7 + 34 = 40'], ans: ['S', 'Đ'] },
        {
          type: 'compare',
          prompt: 'Viết dấu <, >, = thích hợp vào chỗ chấm:',
          items: [
            { t: '{1/3} giờ … 20 phút', ans: '=' },
            { t: '{1/2} giờ … 25 phút', ans: '>' },
          ],
        },
      ],
    },
    {
      title: 'Phần 2: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['6 × 9', '7 × 8', '42 : 7', '45 : 5'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['177 + 432', '792 − 344', '52 × 7', '48 : 4'] },
        {
          type: 'word',
          text: 'Trong thùng có tất cả 36 lít dầu. Sau khi sử dụng, số dầu còn lại trong thùng bằng {1/3} số dầu đã có. Hỏi trong thùng còn lại bao nhiêu lít dầu?',
          given: ['Thùng có 36 lít dầu.', 'Số dầu còn lại bằng {1/3} số dầu đã có.'],
          ask: 'Trong thùng còn lại bao nhiêu lít dầu?',
          hint: 'Muốn tìm {1/3} của một số thì lấy số đó chia cho 3.',
          sentence: ['Trong thùng', 'còn lại số', 'lít dầu', 'là:'],
          decoys: ['đã dùng'],
          expr: { a: 36, op: ':', b: 3, result: 12, unit: 'l' },
          units: ['l', 'kg', 'thùng'],
        },
        {
          type: 'draw',
          items: [
            { prompt: 'a) Vẽ đoạn thẳng AB dài 10 cm.', name: 'AB', len: 10 },
            { prompt: 'b) Vẽ đoạn thẳng CD có độ dài bằng {1/2} độ dài đoạn thẳng AB.', name: 'CD', len: 5 },
          ],
        },
      ],
    },
  ],
};
