/**
 * Phiếu bài tập Bài 5: Bảng nhân 3, bảng chia 3 (phiếu thứ hai).
 * Nguồn: docs/lop_3/De_thi/Phiếu bài tập - Bài 5_ Bảng nhân 3, bảng chia 3 - Toán LỚP 3 (Có File Tải Về).pdf
 * Đề đánh số mỗi phép tính là một câu (1–30, nhảy từ 21 sang 24); màn hình đánh số liền 1–28.
 */
const one = (type, t, extra = {}) => ({ type, items: [t], ...extra });

export default {
  id: 'bai-5b',
  title: 'Bài 5: Bảng nhân 3, bảng chia 3',
  short: 'Bài 5 (b)',
  desc: 'Bảng nhân 3, bảng chia 3 (phiếu 2)',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phần 1: Tính nhẩm',
      label: '',
      questions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(k => one('calc', `3 × ${k}`)),
    },
    {
      title: 'Phần 2: Điền số thích hợp vào chỗ trống',
      label: '',
      questions: [12, 21, 27, 15, 6, 30, 18, 24].map(n => one('calc', `${n} : 3`)),
    },
    {
      title: 'Phần 3: Dạng toán có lời văn',
      label: '',
      questions: [
        {
          type: 'word',
          text: 'Lan có 3 giỏ cam, mỗi giỏ có 5 quả cam. Hỏi Lan có tất cả bao nhiêu quả cam?',
          given: ['Có 3 giỏ cam.', 'Mỗi giỏ có 5 quả cam.'],
          ask: 'Lan có tất cả bao nhiêu quả cam?',
          hint: '3 giỏ, giỏ nào cũng có 5 quả: lấy 5 lặp lại 3 lần, đó là phép nhân.',
          sentence: ['Lan có', 'tất cả', 'số quả cam', 'là:'],
          decoys: ['mỗi giỏ'],
          expr: { a: 5, op: '×', b: 3, result: 15, unit: 'quả cam' },
          units: ['quả cam', 'giỏ', 'bạn'],
        },
        {
          type: 'word',
          text: 'Một gói kẹo có 24 chiếc kẹo. Nếu chia đều cho 3 bạn thì mỗi bạn được mấy chiếc kẹo?',
          given: ['Gói kẹo có 24 chiếc.', 'Chia đều cho 3 bạn.'],
          ask: 'Mỗi bạn được mấy chiếc kẹo?',
          hint: 'Chia đều cho các bạn, mỗi bạn được bằng nhau: đó là phép chia.',
          sentence: ['Mỗi bạn', 'được số', 'chiếc kẹo', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 24, op: ':', b: 3, result: 8, unit: 'chiếc kẹo' },
          units: ['chiếc kẹo', 'bạn', 'gói'],
        },
        {
          type: 'word',
          text: 'Một bó hoa có 3 bông. Hỏi 8 bó hoa như thế có tất cả bao nhiêu bông hoa?',
          given: ['Mỗi bó có 3 bông hoa.', 'Có 8 bó hoa.'],
          ask: 'Có tất cả bao nhiêu bông hoa?',
          hint: '8 bó, bó nào cũng có 3 bông: lấy 3 lặp lại 8 lần, đó là phép nhân.',
          sentence: ['8 bó hoa', 'có tất cả', 'số bông hoa', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 3, op: '×', b: 8, result: 24, unit: 'bông hoa' },
          units: ['bông hoa', 'bó hoa', 'quả'],
        },
      ],
    },
    {
      title: 'Phần 4: Bài tập tổng hợp',
      label: '',
      questions: [
        // sửa: bảng của đề in "3 ×" ở đầu cột và các số 3, 3, 8, 9 nhưng để trống thừa số còn lại; ghi thành phép nhân 3 với các số đó
        // (ý b đổi 3 thành 5 để hai ý không trùng nhau).
        { type: 'fill', prompt: 'Điền số thích hợp vào ô trống:', items: ['3 × 3 = □', '3 × 5 = □', '3 × 8 = □', '3 × 9 = □'] },
        { type: 'fill', prompt: 'Số nào chia cho 3 được kết quả là 7?', items: [{ t: 'Số đó là …', ans: 21 }] },
        {
          type: 'fill',
          prompt: 'Viết phép tính nhân thích hợp với phép chia sau: 21 : 3 = 7',
          items: [{ t: 'Phép tính nhân là: … × … = …', ans: [3, 7, 21], anyOrder: true }],
        },
        {
          type: 'fill',
          prompt: 'Viết phép tính chia thích hợp với phép nhân sau: 3 × 8 = 24',
          items: [{ t: 'Phép tính chia là: … : … = …', ans: [24, 3, 8], anyOrder: true }],
        },
        { type: 'fill', prompt: 'Số lớn nhất có một chữ số mà chia hết cho 3 là số nào?', items: [{ t: 'Số đó là …', ans: 9 }] },
        {
          type: 'fill',
          prompt: 'Viết tất cả các số từ 1 đến 30 chia hết cho 3.',
          items: [{ t: '…, …, …, …, …, …, …, …, …, …', ans: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], anyOrder: true }],
        },
        { type: 'relation', numbers: [3, 18, 6], text: 'Viết hai phép tính nhân và hai phép tính chia liên quan đến số <b>18</b> và <b>3</b>.' },
      ],
    },
  ],
};
