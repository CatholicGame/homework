/** Đề số 36. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 38. */
export default {
  id: 'de-36',
  title: 'Đề số 36',
  short: 'Đề 36',
  desc: 'Đổi đơn vị đo, tìm thành phần chưa biết, giảm đi một số lần, phép chia có dư',
  review: 'giảm đi một số lần, phép chia có dư và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '1 hm = … m?', options: ['1', '10', '100', '1000'], ans: 2 },
        { type: 'mc', prompt: 'Tìm Y biết: 36 : Y = 4', options: ['4', '9', '36', '40'], ans: 1 },
        { type: 'mc', prompt: '48 giảm đi 6 lần:', options: ['6', '8', '12', '48'], ans: 1 },
        { type: 'mc', prompt: '52 : 6 được thương là 8 và số dư là:', options: ['4', '3', '2', '1'], ans: 0 },
        { type: 'mc', prompt: '{1/6} của 54 phút là … phút?', options: ['6 phút', '9 phút', '12 phút', '54 phút'], ans: 1 },
        { type: 'mc', prompt: 'Năm nay con 7 tuổi. Tuổi bố gấp 6 lần tuổi con. Vậy tuổi bố là:', options: ['7 tuổi', '13 tuổi', '24 tuổi', '42 tuổi'], ans: 3 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['263 + 582', '851 − 307', '36 × 6', '69 : 3'] },
        { type: 'calc', prompt: 'Tính:', items: ['6 × 7 + 64', '49 : 7 + 13'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['3 × x = 39', 'x : 4 = 23'] },
        {
          type: 'word',
          text: 'Một cửa hàng buổi sáng bán được 69 l. Số lít dầu bán được trong buổi chiều giảm đi 3 lần so với buổi sáng. Hỏi buổi chiều cửa hàng bán được bao nhiêu lít dầu?',
          given: ['Buổi sáng bán được 69 l dầu.', 'Buổi chiều giảm đi 3 lần so với buổi sáng.'],
          ask: 'Buổi chiều bán được bao nhiêu lít dầu?',
          hint: 'Giảm một số đi 3 lần thì lấy số đó chia cho 3.',
          sentence: ['Buổi chiều', 'cửa hàng bán được', 'số lít dầu là:'],
          decoys: ['tất cả'],
          expr: { a: 69, op: ':', b: 3, result: 23, unit: 'l' },
          units: ['l', 'kg', 'lần'],
        },
      ],
    },
  ],
};
