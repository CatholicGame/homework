/** Đề số 34. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 36. */
export default {
  id: 'de-34',
  title: 'Đề số 34',
  short: 'Đề 34',
  desc: 'So sánh số, một phần mấy, nhân chia, đường gấp khúc, đếm hình',
  review: 'nhân chia, một phần mấy và đếm hình',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Cho các số: 928; 982; 899; 988. Số lớn nhất là:', options: ['928', '982', '899', '988'], ans: 3 },
        { type: 'mc', prompt: '□ − 300 = 40. Số thích hợp để điền vào ô trống là:', options: ['260', '340', '430', '240'], ans: 1 },
        { type: 'mc', prompt: '{1/3} của 24 kg là:', options: ['12 kg', '8 kg', '6 kg', '4 kg'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép nhân 28 × 5 là:', options: ['410', '400', '140', '310'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả của phép chia 36 : 4 là:', options: ['4', '6', '8', '9'], ans: 3 },
        { type: 'mc', prompt: 'Cho dãy số: 9; 12; 15; …; …; …. Các số thích hợp để điền vào chỗ chấm là:', options: ['18; 21; 24', '16; 17; 18', '17; 19; 21', '18; 20; 21'], ans: 0 },
        {
          type: 'mc',
          prompt: 'Độ dài của đường gấp khúc ABCD là:',
          fig: '<svg viewBox="0 0 300 120" width="300"><polyline points="20,95 110,30 190,95 285,30" stroke="#1f2937" stroke-width="2" fill="none"/><text x="10" y="114" font-size="14" fill="#1f2937">A</text><text x="104" y="22" font-size="14" fill="#1f2937">B</text><text x="186" y="114" font-size="14" fill="#1f2937">C</text><text x="280" y="22" font-size="14" fill="#1f2937">D</text><text x="28" y="56" font-size="14" fill="#1f2937">10 cm</text><text x="150" y="52" font-size="14" fill="#1f2937">17 cm</text><text x="240" y="82" font-size="14" fill="#1f2937">19 cm</text></svg>',
          options: ['68 cm', '86 cm', '46 cm', '76 cm'],
          ans: 2,
        },
        {
          type: 'mc',
          prompt: 'Hình bên có:',
          fig: '<svg viewBox="0 0 140 180" width="140"><rect x="10" y="10" width="120" height="160" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="70" y1="10" x2="70" y2="170" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="90" x2="130" y2="90" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="170" x2="130" y2="10" stroke="#1f2937" stroke-width="2"/></svg>',
          options: ['9 hình chữ nhật, 4 hình tam giác', '8 hình chữ nhật, 4 hình tam giác', '9 hình chữ nhật, 6 hình tam giác', '8 hình chữ nhật, 5 hình tam giác'],
          cols: 1,
          ans: 2,
        },
      ],
    },
    {
      title: 'B. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['248 + 136', '375 − 128', '48 × 6', '49 : 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['84 × 7 − 99', '23 × 9 + 15'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['x × 6 = 42', '24 : x = 4'] },
        {
          type: 'word',
          text: 'Đoạn dây thứ nhất dài 18 dm, đoạn dây thứ hai dài gấp 6 lần đoạn dây thứ nhất. Hỏi đoạn dây thứ hai dài bao nhiêu đề-xi-mét?',
          given: ['Đoạn dây thứ nhất dài 18 dm.', 'Đoạn dây thứ hai dài gấp 6 lần đoạn thứ nhất.'],
          ask: 'Đoạn dây thứ hai dài bao nhiêu đề-xi-mét?',
          hint: 'Gấp một số lên 6 lần thì lấy số đó nhân với 6.',
          sentence: ['Đoạn dây', 'thứ hai', 'dài là:'],
          decoys: ['còn lại'],
          expr: { a: 18, op: '×', b: 6, result: 108, unit: 'dm' },
          units: ['dm', 'cm', 'lần'],
        },
      ],
    },
  ],
};
