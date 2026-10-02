/** Đề số 26. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 28. */

/** Đoạn thẳng AB dài 6 cm đặt trên thước (mỗi cm 22 px). */
const ruler = (() => {
  const u = 22, x0 = 20;
  let s = `<line x1="${x0}" y1="30" x2="${x0 + 6 * u}" y2="30" stroke="#1f2937" stroke-width="3"/>`;
  s += `<line x1="${x0}" y1="22" x2="${x0}" y2="38" stroke="#1f2937" stroke-width="2"/><line x1="${x0 + 6 * u}" y1="22" x2="${x0 + 6 * u}" y2="38" stroke="#1f2937" stroke-width="2"/>`;
  s += `<text x="${x0 - 5}" y="16" font-size="14" fill="#1f2937">A</text><text x="${x0 + 6 * u - 5}" y="16" font-size="14" fill="#1f2937">B</text>`;
  s += `<rect x="${x0 - 10}" y="48" width="${8 * u + 20}" height="34" stroke="#1f2937" stroke-width="2" fill="none"/>`;
  for (let i = 0; i <= 8; i++) {
    s += `<line x1="${x0 + i * u}" y1="48" x2="${x0 + i * u}" y2="60" stroke="#1f2937" stroke-width="2"/><text x="${x0 + i * u}" y="76" font-size="12" fill="#1f2937" text-anchor="middle">${i}</text>`;
  }
  return `<svg viewBox="0 0 ${x0 + 8 * u + 20} 90" width="${x0 + 8 * u + 20}">${s}</svg>`;
})();

export default {
  id: 'de-26',
  title: 'Đề số 26',
  short: 'Đề 26',
  desc: 'Bảng nhân chia, một phần mấy, đổi đơn vị đo, gấp lên nhiều lần, tìm x',
  review: 'bảng nhân, bảng chia và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: 'Câu',
      questions: [
        { type: 'mc', prompt: 'Kết quả phép tính 5 × 7 = ?', options: ['12', '35', '53', '21'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả phép tính 48 : 6 = ?', options: ['6', '7', '8', '9'], ans: 2 },
        { type: 'mc', prompt: '{1/6} của 42 m là:', options: ['5 m', '6 m', '7 m', '8 m'], ans: 2 },
        { type: 'mc', prompt: '2 m 14 cm = ?', options: ['16 cm', '34 cm', '2014 cm', '214 cm'], ans: 3 },
        { type: 'mc', prompt: '9 gấp lên 6 lần là:', options: ['45', '54', '3', '15'], ans: 1 },
        // sửa: đoạn AB trong bản PDF đo được khoảng 6,7 cm (không khớp phương án nào); vẽ AB dài 6 cm đặt trên thước.
        { type: 'mc', prompt: 'Độ dài đoạn thẳng AB là:', fig: ruler, options: ['4 cm', '5 cm', '6 cm', '8 cm'], ans: 2 },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['46 × 7', '432 − 108', '15 × 4', '82 : 2'] },
        { type: 'findx', prompt: 'Tìm X:', items: ['X : 7 = 14', '48 : X = 6'] },
        { type: 'calc', prompt: 'Tính:', items: ['6 × 9 − 15', '7 × 6 + 19'] },
        {
          type: 'word',
          text: 'Tổ Một trồng được 18 cây, tổ Hai trồng được gấp 3 lần số cây của tổ Một. Hỏi tổ Hai trồng được bao nhiêu cây?',
          given: ['Tổ Một trồng được 18 cây.', 'Tổ Hai trồng được gấp 3 lần tổ Một.'],
          ask: 'Tổ Hai trồng được bao nhiêu cây?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Tổ Hai', 'trồng được số', 'cây', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 18, op: '×', b: 3, result: 54, unit: 'cây' },
          units: ['cây', 'tổ', 'lần'],
        },
      ],
    },
  ],
};
