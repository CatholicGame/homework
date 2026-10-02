/**
 * Phiếu bài tập Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1000.
 * Nguồn: docs/lop_3/De_thi/Bài 2_ Ôn tập phép cộng, phép trừ trong phạm vi 1000 - Toán LỚP 3 (Có File Tải Về).pdf
 * Bỏ dòng tiêu đề nguồn "Bộ bài tập toán lớp 2…" của bản PDF.
 */

const SHAPES = `<svg viewBox="0 0 420 130" width="420" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  <g stroke="#1f2937" stroke-width="2.5" fill="#fff">
    <path d="M70 10 L130 115 L10 115 Z"/>
    <circle cx="210" cy="64" r="54"/>
    <rect x="292" y="24" width="120" height="80" rx="2"/>
  </g>
  <g font-size="17" font-weight="700" fill="#1f2937" text-anchor="middle">
    <text x="70" y="96">45 + 27</text>
    <text x="210" y="70">100 − 38</text>
    <text x="352" y="70">56 + 19</text>
  </g>
</svg>`;

const flower = (x, letter, expr) => `<g transform="translate(${x} 0)">
    <g fill="#fbcfe8" stroke="#be185d" stroke-width="1.6">${[0, 72, 144, 216, 288].map(r => `<ellipse cx="0" cy="22" rx="11" ry="16" transform="rotate(${r} 0 40)"/>`).join('')}</g>
    <circle cx="0" cy="40" r="13" fill="#fde68a" stroke="#a16207" stroke-width="1.6"/>
    <text x="0" y="46" font-size="17" font-weight="800" text-anchor="middle" fill="#1f2937">${letter}</text>
    <text x="0" y="96" font-size="15" font-weight="700" text-anchor="middle" fill="#1f2937">${expr}</text>
  </g>`;

const FLOWERS = `<svg viewBox="0 0 470 106" width="470" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  ${flower(47, 'A', '250 + 120')}${flower(141, 'B', '500 − 230')}${flower(235, 'C', '400 + 50')}${flower(329, 'D', '800 − 520')}${flower(423, 'E', '250 + 120')}
</svg>`;

export default {
  id: 'bai-2',
  title: 'Bài 2: Ôn tập phép cộng, phép trừ trong phạm vi 1000',
  short: 'Bài 2',
  desc: 'Ôn tập phép cộng, phép trừ trong phạm vi 1000',
  numbering: 'part',
  parts: [
    {
      title: 'Tiết 1',
      label: 'Bài',
      questions: [
        {
          type: 'calc',
          prompt: 'Tính nhẩm:',
          items: ['40 + 30', '70 − 40', '70 − 30', '200 + 300', '500 − 200', '500 − 300', '1000 − 200', '800 + 100', '900 − 800'],
        },
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['47 + 38', '300 − 86', '164 + 59', '725 − 348'] },
        {
          type: 'fill',
          prompt: 'Giải toán có lời văn: Nhà Lan nuôi một con vịt nặng 2 kg và một con gà nặng 1 kg.',
          items: [
            { t: 'Cả hai con vật cân nặng là: … kg', ans: 3 },
            { t: 'Con vịt nặng hơn con gà: … kg', ans: 1 },
          ],
        },
        {
          type: 'mc',
          prompt: 'Chọn câu trả lời đúng. Trong mỗi hình sau đều ghi một phép tính. Phép tính ghi ở hình nào có kết quả lớn nhất?',
          fig: SHAPES,
          options: ['Hình tam giác', 'Hình tròn', 'Hình chữ nhật'],
          ans: 2,
        },
      ],
    },
    {
      title: 'Tiết 2',
      label: 'Bài',
      questions: [
        {
          type: 'table',
          prompt: 'Số?',
          items: [
            {
              head: ['Số hạng', 'Số hạng', 'Tổng'],
              rows: [[25, 34, '…'], [60, 20, '…'], [150, 200, '…']],
              ans: [[59], [80], [350]],
            },
            {
              head: ['Số bị trừ', 'Số trừ', 'Hiệu'],
              rows: [[75, 23, '…'], [500, 200, '…'], [820, 400, '…']],
              ans: [[52], [300], [420]],
            },
          ],
        },
        {
          type: 'chain',
          prompt: 'Số?',
          items: [
            { start: 80, steps: ['+ 15', '− 20'] },
            { start: 400, steps: ['− 25', '− 35'] },
          ],
        },
        // sửa: bông hoa D in "800 − 530" (= 270, bằng bông B), ý b và c có hai đáp án. Đổi thành 800 − 520.
        {
          type: 'fill',
          prompt: 'Điền chữ cái thích hợp vào chỗ chấm. Năm bông hoa có ghi các phép tính sau:',
          fig: FLOWERS,
          items: [
            { t: 'Bông hoa … ghi phép tính có kết quả lớn nhất.', ans: 'C', choices: ['A', 'B', 'C', 'D', 'E'] },
            { t: 'Bông hoa … ghi phép tính có kết quả bé nhất.', ans: 'B', choices: ['A', 'B', 'C', 'D', 'E'] },
            { t: 'Hai bông hoa … và … ghi hai phép tính có kết quả bằng nhau.', ans: ['A', 'E'], anyOrder: true, choices: ['A', 'B', 'C', 'D', 'E'] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Giải toán có lời văn: Buổi sáng, cửa hàng bán được 150 lít dầu ăn. Buổi chiều, cửa hàng bán ít hơn buổi sáng 40 lít.',
          items: [
            { t: 'Buổi chiều, cửa hàng bán được: … lít dầu ăn', ans: 110 },
            { t: 'Cả hai buổi, cửa hàng bán được: … lít dầu ăn', ans: 260 },
          ],
        },
      ],
    },
  ],
};
