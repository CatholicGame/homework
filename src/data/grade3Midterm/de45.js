/** Đề số 45. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 47. */
export default {
  id: 'de-45',
  title: 'Đề số 45',
  short: 'Đề 45',
  desc: 'Đọc viết số, sắp xếp số, một phần mấy, gấp và giảm một số lần, nhân số có hai chữ số',
  review: 'gấp và giảm một số lần, nhân số có hai chữ số với số có một chữ số',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Số sáu trăm linh năm viết là:', options: ['506', '600', '605', '650'], ans: 2 },
        { type: 'mc', prompt: 'Cho các số: 538, 209, 789, 120, thứ tự các số từ bé đến lớn là:', options: ['120, 538, 209, 789', '120, 209, 538, 789', '209, 120, 538, 789', '789, 538, 209, 120'], ans: 1 },
        { type: 'mc', prompt: 'X × 7 = 35, X = …', options: ['5', '7', '8', '4'], ans: 0 },
        { type: 'mc', prompt: '{1/6} của 42 kg là … kg', options: ['6', '4', '5', '7'], ans: 3 },
        { type: 'mc', prompt: 'Cho dãy số: 12, 15, 18, … Số thích hợp điền vào chỗ trống là:', options: ['17', '21', '24', '32'], ans: 1 },
        {
          type: 'mc',
          prompt: 'Số cần điền vào ô trống trong dãy sau là:',
          fig: '<svg viewBox="0 0 320 60" width="320"><rect x="5" y="15" width="40" height="34" stroke="#1f2937" stroke-width="2" fill="none"/><text x="20" y="37" font-size="14" fill="#1f2937">5</text><line x1="45" y1="32" x2="140" y2="32" stroke="#1f2937" stroke-width="2"/><polygon points="140,32 132,27 132,37" fill="#1f2937"/><text x="55" y="22" font-size="14" fill="#1f2937">Gấp lên 6 lần</text><rect x="142" y="15" width="40" height="34" stroke="#1f2937" stroke-width="2" fill="none"/><line x1="182" y1="32" x2="268" y2="32" stroke="#1f2937" stroke-width="2"/><polygon points="268,32 260,27 260,37" fill="#1f2937"/><text x="192" y="22" font-size="14" fill="#1f2937">giảm 3 lần</text><rect x="270" y="15" width="44" height="34" stroke="#1f2937" stroke-width="2" fill="none"/><text x="283" y="37" font-size="14" fill="#1f2937">10</text></svg>',
          options: ['30', '36', '42', '60'],
          ans: 0,
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: '',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['26 × 6', '38 × 7', '63 : 3', '84 : 4'] },
        { type: 'calc', prompt: 'Tính:', items: ['6 × 3 + 135', '20 × 3 : 6'] },
        {
          type: 'word',
          text: 'Một cửa hàng buổi sáng bán được 52 l dầu, số lít dầu bán được trong buổi chiều gấp 3 lần buổi sáng. Hỏi buổi chiều cửa hàng đã bán được bao nhiêu lít dầu?',
          given: ['Buổi sáng bán được 52 l dầu.', 'Buổi chiều bán gấp 3 lần buổi sáng.'],
          ask: 'Buổi chiều bán được bao nhiêu lít dầu?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Buổi chiều', 'cửa hàng bán được', 'số lít dầu là:'],
          decoys: ['còn lại'],
          expr: { a: 52, op: '×', b: 3, result: 156, unit: 'l' },
          units: ['l', 'kg', 'lần'],
        },
        {
          type: 'fill',
          prompt: 'Điền vào ô trống:',
          items: [
            { t: '25 × □ = □0', ans: [2, 5] },
            { t: '□2 × 3 = 6□', ans: [2, 6] },
          ],
        },
      ],
    },
  ],
};
