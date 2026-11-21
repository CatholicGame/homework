/** Đề kiểm tra Tuần 16. Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 25–29 (Phiếu ôn tập cuối tuần 16). */

// Hình nhỏ tự vẽ cho các bài Nối: mèo, cá, chó, nhà.
const ic = (body) => `<svg viewBox="0 0 40 30" width="38" style="vertical-align:middle;margin-right:6px">${body}</svg>`;
const cat = ic('<ellipse cx="24" cy="21" rx="12" ry="6" fill="#fcd34d" stroke="#92400e" stroke-width="1"/><circle cx="12" cy="13" r="7" fill="#fcd34d" stroke="#92400e" stroke-width="1"/><path d="M7 8 L8 2 L11 7 M13 7 L16 2 L17 8" fill="#fcd34d" stroke="#92400e" stroke-width="1"/><path d="M9 13 q1.5 1.5 3 0 M13 13 q1.5 1.5 3 0" fill="none" stroke="#1f2937" stroke-width="1"/><path d="M36 20 Q40 12 35 8" fill="none" stroke="#f59e0b" stroke-width="2.5"/>');
const fish = ic('<ellipse cx="18" cy="15" rx="12" ry="8" fill="#fb923c" stroke="#9a3412" stroke-width="1"/><path d="M29 15 L38 7 L38 23 Z" fill="#93c5fd" stroke="#1e40af" stroke-width="1"/><circle cx="11" cy="13" r="2.4" fill="#fff" stroke="#1f2937" stroke-width="0.8"/><circle cx="11" cy="13" r="1.1" fill="#1f2937"/>');
const dog = ic('<ellipse cx="22" cy="21" rx="12" ry="6" fill="#d97706" stroke="#78350f" stroke-width="1"/><circle cx="12" cy="12" r="7" fill="#f59e0b" stroke="#78350f" stroke-width="1"/><ellipse cx="6" cy="12" rx="2.5" ry="5" fill="#92400e"/><ellipse cx="18" cy="12" rx="2.5" ry="5" fill="#92400e"/><circle cx="10" cy="11" r="1" fill="#1f2937"/><circle cx="14" cy="11" r="1" fill="#1f2937"/><circle cx="12" cy="15" r="1.4" fill="#1f2937"/>');
const house = ic('<path d="M6 14 L20 3 L34 14 Z" fill="#b45309" stroke="#78350f" stroke-width="1"/><rect x="9" y="14" width="22" height="14" fill="#dc2626" stroke="#7f1d1d" stroke-width="1"/><path d="M16 28 L16 21 Q20 16 24 21 L24 28 Z" fill="#1f2937"/>');

export default {
  id: 'tuan-16',
  title: 'Đề kiểm tra Tuần 16',
  short: 'Tuần 16',
  desc: 'Tính giá trị biểu thức, biểu thức có dấu ngoặc, số lớn gấp mấy lần số bé',
  review: 'cách tính giá trị biểu thức (nhân chia trước, cộng trừ sau) và so sánh số lớn gấp mấy lần số bé',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: '',
      // sửa: đề in có hai câu cùng số 3 và câu 5, 6 in dính một dòng; đánh lại số liên tục 1–13.
      questions: [
        { type: 'mc', prompt: 'Giá trị biểu thức 45 + 40 : 5 là:', options: ['53', '17', '49', '1'], ans: 0 },
        { type: 'mc', prompt: 'Giá trị biểu thức 32 + 27 × 6 là:', options: ['354', '194', '240', '219'], ans: 1 },
        { type: 'mc', prompt: 'Giá trị của biểu thức 231 × 6 : 3 là:', options: ['442', '462', '486', '504'], ans: 1 },
        { type: 'mc', prompt: 'Dấu thích hợp để điền vào chỗ chấm là: 234 … 4 − 136 = 800', options: ['+', '−', '×', ':'], ans: 2 },
        { type: 'mc', prompt: 'Khi lấy hiệu giữa 489 và 142 rồi nhân với 5 thì ta được biểu thức:', options: ['489 + 142 + 5', '489 × 5 + 142', '489 + 142 × 5', '(489 − 142) × 5'], ans: 3, cols: 2 },
        { type: 'mc', prompt: 'Giá trị của biểu thức 25 × 4 − 10 là:', options: ['90', '420', '76', '86'], ans: 0 },
        { type: 'mc', prompt: 'Số thích hợp để viết vào chỗ chấm của 7 m 3 dm = … dm là:', options: ['703 cm', '703 dm', '730 dm', '73 dm'], ans: 3 },
        { type: 'mc', prompt: 'Giá trị của biểu thức a − b × c là bao nhiêu, biết a = 100, b = 50, c = 2?', options: ['0', '100', '25', '50'], ans: 0 },
        { type: 'mc', prompt: 'Số thích hợp để điền vào chỗ chấm là: 50 + 5 × … = 100', options: ['5', '2', '10', '1'], ans: 2 },
        { type: 'mc', prompt: 'Tổng của 60 với tích của 9 và 9 là:', options: ['69', '78', '549', '141'], ans: 3 },
        { type: 'mc', prompt: 'Tích của số lớn nhất có một chữ số với tổng của 10 và 10 là:', options: ['100', '29', '180', '200'], ans: 2 },
        { type: 'tf', prompt: 'Đúng ghi Đ, sai ghi S:', items: ['48 : 8 : 2 = 48 : 4 = 12', '48 : 8 : 2 = 6 : 2 = 3'], ans: ['S', 'Đ'] },
        {
          type: 'fill',
          prompt: 'Hãy điền dấu +, −, ×, : vào chỗ thích hợp để biểu thức có giá trị đúng:',
          items: [
            { t: '15 … 3 … 7 = 38', ans: ['×', '−'], choices: ['+', '−', '×', ':'] },
            { t: '15 … 3 … 7 = 19', ans: ['−', '+'], choices: ['+', '−', '×', ':'] },
            { t: '15 … 3 … 7 = 52', ans: ['×', '+'], choices: ['+', '−', '×', ':'] },
            { t: '15 … 3 … 7 = 25', ans: ['+', '+'], choices: ['+', '−', '×', ':'] },
          ],
        },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        // sửa: bản in để trống nhãn trên mèo và cá, tự đặt bốn biểu thức và bốn kết quả theo mục tiêu "tính giá trị của biểu thức".
        {
          type: 'match',
          prompt: 'Nối biểu thức với kết quả phù hợp:',
          left: [`${cat}12 × 3 + 4`, `${cat}50 − 18 : 2`, `${cat}(20 + 16) : 4`, `${cat}7 × 8 − 6`],
          right: [`${fish}41`, `${fish}50`, `${fish}40`, `${fish}9`],
          ans: [2, 0, 3, 1],
        },
        { type: 'calc', prompt: 'Tính giá trị của biểu thức:', items: ['98 + 65 + 32', '98 − 65 + 32', '98 + 65 − 32', '98 − 65 − 32'] },
        { type: 'calc', prompt: 'Tính giá trị của biểu thức:', items: ['24 × 6 × 2', '24 : 6 × 2', '24 × 6 : 2', '24 : 6 : 2'] },
        { type: 'calc', prompt: 'Tính giá trị của biểu thức:', items: ['9 × 8 + 7', '9 + 8 × 7', '8 × 3 − 2', '8 − 3 × 2', '16 : 8 + 2', '16 + 8 : 2', '24 : 6 − 3', '24 − 6 : 3'] },
        {
          type: 'calc',
          prompt: 'Tính giá trị biểu thức:',
          items: [
            '17 × 8 − 45', '81 : 9 × 23', '281 + 12 × 3',
            '28 × 5 : 7', '23 + 4 × 8', '85 − 13 × 4',
            '199 − 8 × 24', '19 + 272 : 8', '56 × 4 : 7',
            '27 + 8 − 15', '27 : 3 × 8', '(38 + 15) − 29',
            '684 − (45 : 9)', '7 × (145 : 5)', '927 − (124 × 3)',
            '212 + 42 : 6', '155 × 2 + 150', '35 + 6 × 25',
          ],
        },
        {
          type: 'calc',
          prompt: 'Tính:',
          items: [
            { t: '111 kg × 6 − 6 kg', ans: 660, unit: 'kg' },
            { t: '7 m × 4 − 20 m', ans: 8, unit: 'm' },
            { t: '600 kg : 2 − 63 kg', ans: 237, unit: 'kg' },
          ],
        },
        // sửa: bản in chỉ có nhãn "21 gấp 7" trên một chú chó, các nhãn khác để trống; đặt câu hỏi "gấp mấy lần" theo mục tiêu của phiếu.
        {
          type: 'match',
          prompt: 'Đưa những chú chó về đúng nhà của mình bằng cách nối kết quả phù hợp:',
          left: [`${dog}21 gấp mấy lần 7?`, `${dog}48 gấp mấy lần 6?`, `${dog}35 gấp mấy lần 5?`],
          right: [`${house}7 lần`, `${house}3 lần`, `${house}8 lần`],
          ans: [1, 2, 0],
        },
        {
          type: 'word',
          text: 'Một con lợn cân nặng 15 kg, một con thỏ cân nặng 3 kg. Hỏi con lợn nặng gấp mấy lần con thỏ?',
          given: ['Con lợn nặng 15 kg.', 'Con thỏ nặng 3 kg.'],
          ask: 'Con lợn nặng gấp mấy lần con thỏ?',
          hint: 'Muốn biết số lớn gấp mấy lần số bé, lấy số lớn chia cho số bé.',
          sentence: ['Con lợn', 'nặng gấp', 'con thỏ', 'số lần là:'],
          decoys: ['nhẹ hơn'],
          expr: { a: 15, op: ':', b: 3, result: 5, unit: 'lần' },
          units: ['lần', 'kg', 'con'],
        },
        {
          type: 'fill',
          prompt: 'Một đoàn khách gồm 113 người cần qua sông. Biết mỗi thuyền chỉ chở được tối đa 7 người. Tính số lần ít nhất mà thuyền phải đi để chở hết số người trong đoàn.',
          items: [
            { t: '113 : 7 = … (dư …)', ans: [16, 1] },
            { t: 'Thuyền chở … lần đầy, còn … người phải chở thêm 1 lần nữa.', ans: [16, 1] },
            { t: 'Số lần ít nhất thuyền phải đi là: … lần', ans: 17 },
          ],
        },
        // sửa: "túi gao" → "túi gạo".
        {
          type: 'fill',
          prompt: 'Một người có 70 kg gạo tẻ và 30 kg gạo nếp. Người ta đổ số gạo tẻ và gạo nếp đó vào các túi, mỗi túi đều có 5 kg gạo. Hỏi có tất cả bao nhiêu túi gạo?',
          items: [
            { t: 'Có tất cả số gạo là: 70 + 30 = … (kg)', ans: 100 },
            { t: 'Có tất cả số túi gạo là: … : 5 = … (túi)', ans: [100, 20] },
          ],
        },
        // Quy luật: (số ở đỉnh + số ở góc phải) × số ở góc trái = số ở giữa: (37 + 14) × 2 = 102, (45 + 99) × 1 = 144.
        {
          type: 'fill',
          prompt: 'Các hình có quy luật giống nhau. Số được điền vào dấu ? là:',
          fig: '<svg viewBox="0 0 330 120" width="320"><g stroke="#1f2937" stroke-width="2" fill="none"><path d="M55 28 L15 98 L95 98 Z"/><path d="M165 28 L125 98 L205 98 Z"/><path d="M275 28 L235 98 L315 98 Z"/></g><g stroke="#1f2937" stroke-width="1.5" fill="#fff"><rect x="40" y="4" width="30" height="22"/><rect x="2" y="96" width="30" height="22"/><rect x="78" y="96" width="30" height="22"/><rect x="150" y="4" width="30" height="22"/><rect x="112" y="96" width="30" height="22"/><rect x="188" y="96" width="30" height="22"/><rect x="260" y="4" width="30" height="22"/><rect x="222" y="96" width="30" height="22"/><rect x="298" y="96" width="30" height="22"/></g><g font-size="14" fill="#1f2937" text-anchor="middle"><text x="55" y="20">37</text><text x="17" y="112">2</text><text x="93" y="112">14</text><text x="55" y="78">102</text><text x="165" y="20">45</text><text x="127" y="112">1</text><text x="203" y="112">99</text><text x="165" y="78">144</text><text x="275" y="20">21</text><text x="237" y="112">3</text><text x="313" y="112">58</text><text x="275" y="78">?</text></g></svg>',
          items: [{ t: 'Số cần điền là: …', ans: 237 }],
        },
      ],
    },
  ],
};
