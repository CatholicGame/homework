/** Đề số 11. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 13. */
export default {
  id: 'de-11',
  title: 'Đề số 11',
  short: 'Đề 11',
  desc: 'Bảng nhân, so sánh, đổi đơn vị đo, một phần mấy, tìm x, vẽ đoạn thẳng',
  review: 'bảng nhân, tìm x và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Phần I: Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số 42 là kết quả của phép nhân nào?', options: ['6 × 6', '6 × 7', '6 × 9', '6 × 5'], ans: 1 },
        { type: 'mc', prompt: '7 × 8 = □. Số cần điền vào ô trống là:', options: ['42', '49', '50', '56'], ans: 3 },
        { type: 'mc', prompt: '36 : 6 □ 35 : 7. Dấu cần điền vào ô trống là:', options: ['>', '<', '='], ans: 0 },
        { type: 'mc', prompt: '8 hm □ 80 m. Dấu cần điền vào ô trống là:', options: ['=', '<', '>'], ans: 2 },
        { type: 'mc', prompt: '{1/4} của 80 kg là:', options: ['20 kg', '30 kg', '40 kg', '50 kg'], ans: 0 },
        // sửa: đề in phương án C là 175, không có đáp án đúng (x = 149 + 36 = 185), sửa C thành 185.
        { type: 'mc', prompt: 'x − 36 = 149 thì x = ?', options: ['285', '275', '185', '13'], ans: 2 },
      ],
    },
    {
      title: 'Phần II: Tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['285 + 108', '452 − 136', '48 : 4', '66 : 6'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['439 − x = 145', 'x × 7 = 70'] },
        { type: 'draw', items: [{ prompt: 'Vẽ một đoạn thẳng AB có độ dài 5 cm.', name: 'AB', len: 5 }] },
        {
          type: 'word',
          text: 'Một cửa hàng bán vải ngày đầu bán được 35 m vải, ngày thứ hai bán được số vải gấp ba lần ngày đầu. Hỏi ngày thứ hai cửa hàng bán được bao nhiêu mét vải?',
          given: ['Ngày đầu bán được 35 m vải.', 'Ngày thứ hai bán gấp ba lần ngày đầu.'],
          ask: 'Ngày thứ hai bán được bao nhiêu mét vải?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Ngày thứ hai', 'cửa hàng bán được số', 'mét vải', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 35, op: '×', b: 3, result: 105, unit: 'm' },
          units: ['m', 'ngày', 'lần'],
        },
      ],
    },
  ],
};
