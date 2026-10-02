/** Đề số 42. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 44. */
export default {
  id: 'de-42',
  title: 'Đề số 42',
  short: 'Đề 42',
  desc: 'Gấp lên nhiều lần, một phần mấy, so sánh độ dài, bảng nhân chia',
  review: 'bảng nhân, bảng chia và một phần mấy',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'I. Phần trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: '7 lít gấp lên 6 lần thì được:', options: ['13 lít', '14 lít', '42 lít', '48 lít'], ans: 2 },
        { type: 'mc', prompt: '{1/3} của 69 cm là:', options: ['18 cm', '23 cm', '42 cm', '22 cm'], ans: 1 },
        { type: 'mc', prompt: '54 : x = 6. x có kết quả là:', options: ['9', '324', '19', '48'], ans: 0 },
        { type: 'mc', prompt: 'Con 4 tuổi, tuổi mẹ gấp 7 lần tuổi con. Vậy mẹ mấy tuổi?', options: ['11 tuổi', '28 tuổi', '32 tuổi', '36 tuổi'], ans: 1 },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, =:',
          items: [
            { t: '6 dm 8 cm … 68 cm', ans: '=' },
            { t: '7 m 6 dm … 760 dm', ans: '<' },
          ],
        },
        {
          type: 'fill',
          prompt: 'Điền số thích hợp vào chỗ chấm:',
          fig: '<svg viewBox="0 0 320 110" width="320"><text x="6" y="16" font-size="14" fill="#1f2937">A</text><text x="300" y="16" font-size="14" fill="#1f2937">B</text><line x1="10" y1="34" x2="310" y2="34" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="27" x2="10" y2="41" stroke="#1f2937" stroke-width="2"/><line x1="110" y1="27" x2="110" y2="41" stroke="#1f2937" stroke-width="2"/><line x1="210" y1="27" x2="210" y2="41" stroke="#1f2937" stroke-width="2"/><line x1="310" y1="27" x2="310" y2="41" stroke="#1f2937" stroke-width="2"/><text x="6" y="72" font-size="14" fill="#1f2937">M</text><text x="104" y="72" font-size="14" fill="#1f2937">N</text><line x1="10" y1="90" x2="110" y2="90" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="83" x2="10" y2="97" stroke="#1f2937" stroke-width="2"/><line x1="110" y1="83" x2="110" y2="97" stroke="#1f2937" stroke-width="2"/></svg>',
          items: [
            { t: 'Độ dài đoạn thẳng MN bằng … đoạn thẳng AB', ans: '1/3|một phần ba' },
          ],
        },
      ],
    },
    {
      title: 'II. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Tính nhẩm:', items: ['5 × 7', '6 × 6', '3 × 7', '7 × 8', '49 : 7', '54 : 6', '35 : 5', '42 : 6'] },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['24 × 6', '35 × 7', '69 : 3', '84 : 4'] },
        {
          type: 'word',
          text: 'Một lớp học có 32 học sinh. Số học sinh giỏi của lớp chiếm {1/4} tổng số học sinh của lớp. Hỏi lớp đó có bao nhiêu học sinh giỏi?',
          given: ['Lớp có 32 học sinh.', 'Học sinh giỏi chiếm {1/4} số học sinh của lớp.'],
          ask: 'Lớp có bao nhiêu học sinh giỏi?',
          hint: 'Tìm {1/4} của một số thì lấy số đó chia cho 4.',
          sentence: ['Lớp đó', 'có số', 'học sinh giỏi', 'là:'],
          decoys: ['gấp lên'],
          expr: { a: 32, op: ':', b: 4, result: 8, unit: 'học sinh' },
          units: ['học sinh', 'lớp', 'lần'],
        },
      ],
    },
  ],
};
