/**
 * Luyện tập Toán 3 — Tập một: Tuần 1–4 (sách trang 4–16).
 */
import {
  blank, soDoc, textValidate, listValidate, dsValidate, unitValidate,
} from '../grade3Workbook.js';
import imgT1T2Q4 from '../../assets/grade3-practice/tuan1_t2_q4_flowchart.svg';
import imgT3T2Q1a from '../../assets/grade3-practice/tuan3_t2_q1a_shapes.png';
import imgT3T2Q1b from '../../assets/grade3-practice/tuan3_t2_q1b_points.svg';
import imgT3T2Q1c from '../../assets/grade3-practice/tuan3_t2_q1c_clocks.svg';
import imgT3T2Q3 from '../../assets/grade3-practice/tuan3_t2_q3a_figure.svg';
import imgT3T2Q4 from '../../assets/grade3-practice/tuan3_t2_q4_polyline.png';
import imgT4T1Q4 from '../../assets/grade3-practice/tuan4_t1_q4_flowchart.svg';
import imgT4T2Q4 from '../../assets/grade3-practice/tuan4_t2_q4_triangle.svg';
import imgT4T3Q4 from '../../assets/grade3-practice/tuan4_t3_q4_polyline.svg';

// "Viết số thành tổng các trăm, chục, đơn vị" cell (Tuần 1 Tiết 3): accepts
// "600 + 2" or the full "602 = 600 + 2" like the blue sample row; the terms
// must be exactly the number's non-zero place values, in any order (a "+ 0"
// term for an empty place is tolerated).
function decompValidate(n) {
  const h = Math.floor(n / 100) * 100, t = Math.floor((n % 100) / 10) * 10, u = n % 10;
  const target = [h, t, u].filter(Boolean).sort((a, b) => a - b).join('+');
  return (value) => {
    let v = String(value).replace(/\s+/g, '');
    if (v.startsWith(`${n}=`)) v = v.slice(String(n).length + 1);
    if (!/^\d+(\+\d+)*$/.test(v)) return false;
    return v.split('+').map(Number).filter(Boolean).sort((a, b) => a - b).join('+') === target;
  };
}
const readCell = (n) => blank(soDoc(n), { validate: textValidate(soDoc(n)) });
const sumCell = (n, text) => blank(text, { validate: decompValidate(n) });
const seq = (from, to, step = 1) => Array.from({ length: Math.floor((to - from) / step) + 1 }, (_, i) => from + i * step);
// Bảng nhân / bảng chia a) b) (Thừa số × Thừa số = Tích, Số bị chia : Số chia = Thương).
const mulTable = (k) => ({ rows: [['Thừa số', ...seq(1, 10).map(() => k)], ['Thừa số', ...seq(1, 10)], ['Tích', ...seq(1, 10).map(i => blank(k * i))]] });
const divTable = (k) => ({ rows: [['Số bị chia', ...seq(1, 10).map(i => k * i)], ['Số chia', ...seq(1, 10).map(() => k)], ['Thương', ...seq(1, 10).map(i => blank(i))]] });
// "15 kg + 60 kg = ......": the child may write the unit or not.
const unitBlank = (label, n, unit) => ({ label, answer: String(n), validate: unitValidate(n, unit) });

export const WEEKS_1_4 = [
  // ── TUẦN 1 (trang 4–6) ────────────────────────────────────────────────────
  {
    id: 'tuan-1', number: 1, title: 'Ôn tập các số đến 1 000, phép cộng, phép trừ. Tìm thành phần trong phép cộng, phép trừ',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        headers: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: [9, 8, 1, 981, 'chín trăm tám mươi mốt'] },
          [8, 6, 5, blank(865), readCell(865)],
          [7, 0, 4, blank(704), readCell(704)],
          [blank(2), blank(1), blank(5), 215, readCell(215)],
          [blank(1), blank(0), blank(2), blank(102), 'một trăm linh hai'],
        ],
        hints: ['Đọc số theo thứ tự hàng trăm, hàng chục, hàng đơn vị; hàng chục là 0 thì đọc "linh" (hoặc "lẻ").'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 305', right: '350', answer: '<' },
          { left: '219', right: '199', answer: '>' },
          { left: '835', right: 'Số liền sau của 834', answer: '=' },
          { left: 'b) 800 + 50 + 1', right: '851', answer: '=' },
          { left: 'Số liền trước của 100', right: '100', answer: '<' },
          { left: '139', right: '100 + 30 + 7', answer: '>' },
        ],
        hints: ['Số liền sau của 834 là 835; số liền trước của 100 là 99; 100 + 30 + 7 = 137.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đ, S?',
        blanks: [
          { label: 'a) Số lớn nhất có ba chữ số khác nhau là 999.', answer: 'S', validate: dsValidate(false) },
          { label: 'b) Số bé nhất có ba chữ số khác nhau là 102.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) 650, 651, 652 là ba số liên tiếp.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) Số liền trước của một số bé hơn số đó 1 đơn vị.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['999 có ba chữ số giống nhau. Số lớn nhất có ba chữ số khác nhau là 987.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.\nCó ba chiếc xe chở thực phẩm, xe thứ nhất chở 900 kg thực phẩm, xe thứ hai chở ít nhất, xe thứ ba chở nhiều nhất. Biết rằng khối lượng thực phẩm trên các xe tính theo ki-lô-gam là ba số tròn trăm liên tiếp.',
        blanks: [
          { label: 'a) Xe thứ hai chở ... kg thực phẩm.', answer: '800' },
          { label: 'b) Xe thứ ba chở ... kg thực phẩm.', answer: '1000' },
          { label: 'c) Xe thứ ba chở nhiều hơn xe thứ nhất ... kg thực phẩm.', answer: '100' },
        ],
        hints: ['Xe thứ nhất (900 kg) chở nhiều hơn xe thứ hai và ít hơn xe thứ ba, nên 900 là số ở giữa của ba số tròn trăm liên tiếp.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 200 + 400 = ...', answer: '600' },
          { label: '600 − 200 = ...', answer: '400' },
          { label: '600 − 400 = ...', answer: '200' },
          { label: 'b) 30 + 70 = ...', answer: '100' },
          { label: '100 − 70 = ...', answer: '30' },
          { label: '100 − 30 = ...', answer: '70' },
          { label: 'c) 200 + 800 = ...', answer: '1000' },
          { label: '1 000 − 200 = ...', answer: '800' },
          { label: '1 000 − 800 = ...', answer: '200' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        tables: [
          { label: 'a)', rows: [['Số hạng', 60, 928, blank(70), 500, blank(65), 32], ['Số hạng', 59, 45, 30, blank(500), 25, 68], ['Tổng', blank(119), blank(973), 100, '1 000', 90, blank(100)]] },
          { label: 'b)', rows: [['Số bị trừ', 678, 750, blank(100), 100, 129, blank(286)], ['Số trừ', 567, 130, 43, blank(55), blank(58), 248], ['Hiệu', blank(111), blank(620), 57, 45, 71, 38]] },
        ],
        hints: ['Muốn tìm một số hạng, lấy tổng trừ đi số hạng kia.', 'Muốn tìm số bị trừ, lấy hiệu cộng với số trừ; muốn tìm số trừ, lấy số bị trừ trừ đi hiệu.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. a) Để có kế hoạch sử dụng nước sạch hợp lí, tuần này bạn Nguyên cùng bố theo dõi đồng hồ nước của nhà mình vào cuối mỗi ngày. Hôm qua, nhà Nguyên đã dùng hết 850 l nước. Hôm nay, do tiết kiệm nên nhà Nguyên đã dùng ít hơn hôm qua 150 l nước. Hỏi hôm nay nhà Nguyên đã dùng bao nhiêu lít nước?\nb) Một tàu hoả đã được nâng cấp để chở khách từ Hà Nội đến Thành phố Hồ Chí Minh và ngược lại. Tàu có 13 toa, gồm 11 toa chở khách và một số toa phục vụ. Hỏi tàu đó có bao nhiêu toa phục vụ?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số lít nước hôm nay nhà Nguyên đã dùng', answer: '700' },
          { label: 'b) Số toa phục vụ', answer: '2' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT1T2Q4,
        q: '4. Số?',
        blanks: [
          { label: 'Ô vuông', answer: '10' },
          { label: 'Hình tròn', answer: '25' },
        ],
        hints: ['Đi ngược từ 100: số ở hình tròn cộng 75 được 100, số ở ô vuông cộng 15 được số ở hình tròn.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '1. Hoàn thành bảng sau (theo mẫu).',
        headers: ['Số', 'Số trăm', 'Số chục', 'Số đơn vị', 'Viết số thành tổng các trăm, chục, đơn vị'],
        rows: [
          { sample: true, cells: [398, 3, 9, 8, '398 = 300 + 90 + 8'] },
          [602, blank(6), blank(0), blank(2), sumCell(602, '602 = 600 + 2')],
          [750, blank(7), blank(5), blank(0), sumCell(750, '750 = 700 + 50')],
          [456, blank(4), blank(5), blank(6), sumCell(456, '456 = 400 + 50 + 6')],
          [555, blank(5), blank(5), blank(5), sumCell(555, '555 = 500 + 50 + 5')],
        ],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: 'Số liền sau của 999.' },
          { id: 'l2', text: 'Số liền trước của 121.' },
          { id: 'l3', text: 'Số nào cần điền vào chỗ chấm để 120, ..., 122 là ba số liên tiếp?' },
          { id: 'l4', text: 'Số lớn nhất có ba chữ số và có số đơn vị là 5.' },
          { id: 'l5', text: 'Số gồm 9 trăm, 9 chục và 9 đơn vị.' },
        ],
        right: [
          { id: 'r121', text: '121' }, { id: 'r995', text: '995' }, { id: 'r999', text: '999' },
          { id: 'r1000', text: '1 000' }, { id: 'r120', text: '120' },
        ],
        pairs: [['l1', 'r1000'], ['l2', 'r120'], ['l3', 'r121'], ['l4', 'r995'], ['l5', 'r999']],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Một toà nhà có tất cả 230 căn hộ, trong đó có 205 căn hộ đã có người ở. Hỏi toà nhà đó còn bao nhiêu căn hộ chưa có người ở?',
        wordProblem: true,
        blanks: [{ label: 'Số căn hộ chưa có người ở', answer: '25' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Viết số thích hợp vào chỗ chấm.\nTổng của hai số là số lớn nhất có ba chữ số. Biết số thứ nhất là số tròn trăm liền trước của 1 000.',
        blanks: [{ label: 'Vậy số thứ hai là ...', answer: '99' }],
        hints: ['Số lớn nhất có ba chữ số là 999; số tròn trăm liền trước của 1 000 là 900.'],
      },
    ],
  },

  // ── TUẦN 2 (trang 7–9) ────────────────────────────────────────────────────
  {
    id: 'tuan-2', number: 2, title: 'Tìm thành phần trong phép cộng, phép trừ (tiếp theo). Bảng nhân, bảng chia 2; 5; 3',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['Số bị trừ', 60, 130, blank(100), blank(100), 100, '1 000'], ['Số trừ', blank(5), blank(50), 75, 68, blank(80), blank(600)], ['Hiệu', 55, 80, 25, 32, 20, 400]] },
          { label: 'b)', ...mulTable(2) },
          { label: 'c)', ...divTable(2) },
        ],
        hints: ['Số bị trừ = Hiệu + Số trừ; Số trừ = Số bị trừ − Hiệu.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Một phép trừ có số bị trừ là 80, hiệu là 15, số trừ là:', options: ['A. 95', 'B. 65', 'C. 15'], answer: 'B' },
          { left: 'b) Một phép trừ có số trừ là 20, hiệu bằng số trừ, số bị trừ là:', options: ['A. 20', 'B. 0', 'C. 40'], answer: 'C' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Bạn Đăng sưu tập được một số thẻ đồ chơi, sau khi Đăng cho em 20 thẻ thì còn lại 20 thẻ. Hỏi lúc đầu Đăng có bao nhiêu thẻ đồ chơi?',
        wordProblem: true,
        blanks: [{ label: 'Số thẻ đồ chơi lúc đầu', answer: '40' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.\nRô-bốt đố Mai: “Hai số nào lớn hơn 0 mà có tích bằng tổng?”.',
        blanks: [{ label: 'Mai trả lời rất nhanh: “Câu hỏi của Rô-bốt dễ thế! Hai số đó là ... và ...”.', answer: '2,2', validate: listValidate(['2', '2']) }],
        hints: ['Thử với các số nhỏ: 1 × 1 và 1 + 1, 2 × 2 và 2 + 2, ...'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [{ label: 'a)', ...mulTable(5) }, { label: 'b)', ...divTable(5) }],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 3 × 5', right: '40 : 5', answer: '>' },
          { left: 'b) 10', right: '30 : 3', answer: '=' },
          { left: 'c) 35 : 5', right: '3 × 2', answer: '>' },
          { left: 'd) 50 : 5', right: '3 × 4', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Lớp 3A có 30 học sinh. Cô giáo chia các bạn thành nhóm để chăm sóc cây xanh trong vườn trường, mỗi nhóm có 3 bạn. Hỏi cô giáo chia được bao nhiêu nhóm như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số nhóm', answer: '10' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nRô-bốt có các thẻ ghi số từ 1 đến 10. Lấy 5 nhân với số ghi trên mỗi thẻ.',
        blanks: [{ label: 'Kết quả lớn nhất mà Rô-bốt nhận được là ...', answer: '50' }],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '1. Số?',
        tables: [{ label: 'a)', ...mulTable(3) }, { label: 'b)', ...divTable(3) }],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [
          { id: 'l1', text: '30 : 3' }, { id: 'l2', text: '2 × 3' }, { id: 'l3', text: '15 : 3' },
          { id: 'l4', text: '24 : 3' }, { id: 'l5', text: '8 : 4' },
        ],
        right: [
          { id: 'r1', text: '2 × 4' }, { id: 'r2', text: '2 × 5' }, { id: 'r3', text: '6 : 3' },
          { id: 'r4', text: '18 : 3' }, { id: 'r5', text: '5 × 1' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r4'], ['l3', 'r5'], ['l4', 'r1'], ['l5', 'r3']],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Quãng đường từ nhà bạn Nguyên về đến quê dài 110 km, gồm một đoạn đường cao tốc và đoạn đường còn lại dài 42 km. Hỏi đoạn đường cao tốc đó dài bao nhiêu ki-lô-mét?',
        wordProblem: true,
        blanks: [{ label: 'Độ dài đoạn đường cao tốc (km)', answer: '68' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nRô-bốt lập các phép nhân có hai thừa số là hai trong ba số 2, 3, 5.',
        blanks: [
          { label: '• Kết quả lớn nhất Rô-bốt nhận được là ...', answer: '15' },
          { label: '• Kết quả bé nhất Rô-bốt nhận được là ...', answer: '6' },
        ],
      },
    ],
  },

  // ── TUẦN 3 (trang 10–13) ──────────────────────────────────────────────────
  {
    id: 'tuan-3', number: 3, title: 'Bảng nhân 4, bảng chia 4. Ôn tập hình học và đo lường. Luyện tập chung',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [{ label: 'a)', ...mulTable(4) }, { label: 'b)', ...divTable(4) }],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Phép tính nào dưới đây có kết quả bé nhất?', options: ['A. 4 × 6', 'B. 4 × 3', 'C. 5 × 4', 'D. 4 × 5'], answer: 'B' },
          { left: 'b) Phép tính nào dưới đây có kết quả lớn nhất?', options: ['A. 36 : 4', 'B. 12 : 4', 'C. 40 : 4', 'D. 20 : 4'], answer: 'C' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Lớp 3A có 36 bạn, xếp đều thành 4 hàng. Hỏi mỗi hàng có bao nhiêu bạn?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn mỗi hàng', answer: '9' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nBạn Nguyên nghĩ đến một số lớn hơn 0. Nếu lấy 4 nhân với số đó thì được kết quả là một số tròn chục bé nhất có thể.',
        blanks: [{ label: 'Vậy số Nguyên đã nghĩ đến là ...', answer: '5' }],
        hints: ['Các số tròn chục: 10, 20, 30, ... Số nào là kết quả của 4 nhân với một số?'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgT3T2Q1a,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.\na) Hình thích hợp đặt vào dấu “?” là:',
        options: ['Khối lập phương', 'Khối cầu', 'Khối trụ', 'Khối hộp chữ nhật'],
        answer: 2,
        hints: ['Dãy hình lặp lại theo nhóm: khối trụ, khối lập phương, khối cầu, khối hộp chữ nhật.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgT3T2Q1b,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.\nb) Cho hình vẽ sau:\nBa điểm thẳng hàng có trong hình trên là:',
        options: ['M, P, N', 'M, N, Q', 'P, N, Q', 'M, P, Q'],
        answer: 3,
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgT3T2Q1c,
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.\nc) Vào buổi tối, hai đồng hồ nào dưới đây chỉ cùng giờ?',
        options: ['Cặp đồng hồ A', 'Cặp đồng hồ B', 'Cặp đồng hồ C'],
        answer: 2,
        hints: ['Buổi tối: 8 giờ là 20 giờ, 9 giờ là 21 giờ. Đọc giờ trên đồng hồ kim rồi so với đồng hồ số bên dưới.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Một con hổ cân nặng 173 kg, một con sư tử cân nặng 155 kg. Hỏi:\na) Con hổ nặng hơn con sư tử bao nhiêu ki-lô-gam?\nb) Con hổ và con sư tử cân nặng tất cả bao nhiêu ki-lô-gam?',
        wordProblem: true,
        blanks: [
          { label: 'a) Con hổ nặng hơn con sư tử (kg)', answer: '18' },
          { label: 'b) Cả hai con cân nặng (kg)', answer: '328' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT3T2Q3,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Trong hình bên có ... hình tứ giác và ... hình tam giác.', answer: '6,4', validate: listValidate(['6', '4']) },
          { label: 'b) Nếu ngày 2 tháng 9 là Chủ nhật thì Chủ nhật tuần tiếp theo là ngày ... tháng 9.', answer: '9' },
        ],
        hints: ['a) Đừng quên các hình ghép từ nhiều phần, ví dụ hình chữ nhật ghép với hình tam giác nhỏ bên cạnh.', 'b) Một tuần lễ có 7 ngày.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT3T2Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.\nMột con sâu bò đến chỗ chiếc lá rau theo đường gấp khúc ABCD như hình vẽ dưới đây.',
        blanks: [{ label: 'Độ dài quãng đường con sâu phải bò là ... cm = ... m = ... dm.', answer: '300,3,30', validate: listValidate(['300', '3', '30']) }],
        hints: ['1 m = 100 cm; 1 m = 10 dm.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính.',
        blanks: [
          unitBlank('a) 15 kg + 60 kg = ...', 75, 'kg'),
          unitBlank('125 kg − 83 kg = ...', 42, 'kg'),
          unitBlank('32 kg : 4 = ...', 8, 'kg'),
          unitBlank('b) 118 l + 72 l = ...', 190, 'l'),
          unitBlank('100 l − 27 l = ...', 73, 'l'),
          unitBlank('36 l : 4 = ...', 9, 'l'),
          unitBlank('c) 320 km + 89 km = ...', 409, 'km'),
          unitBlank('5 km × 3 = ...', 15, 'km'),
          unitBlank('12 km : 3 = ...', 4, 'km'),
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: 'a) 97 + 32', answer: '129' },
          { label: '129 + 80', answer: '209' },
          { label: '546 + 324', answer: '870' },
          { label: '481 + 75', answer: '556' },
          { label: 'b) 168 − 96', answer: '72' },
          { label: '395 − 346', answer: '49' },
          { label: '728 − 571', answer: '157' },
          { label: '342 − 219', answer: '123' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Mỗi tuần gia đình Nguyên sử dụng hết 4 l sữa tươi. Hỏi:\na) Trong 4 tuần, nhà Nguyên sử dụng hết bao nhiêu lít sữa tươi?\nb) Nếu mẹ đi siêu thị mua 8 l sữa tươi thì nhà Nguyên sẽ sử dụng hết lượng sữa đó trong mấy tuần?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số lít sữa tươi dùng trong 4 tuần', answer: '16' },
          { label: 'b) Số tuần', answer: '2' },
        ],
      },
    ],
  },

  // ── TUẦN 4 (trang 14–16) ──────────────────────────────────────────────────
  {
    id: 'tuan-4', number: 4, title: 'Luyện tập chung (tiếp theo). Bảng nhân 6, bảng chia 6. Bảng nhân 7, bảng chia 7',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          ...[2, 4, 5, 3].flatMap((k, i) => [
            { label: `${i === 0 ? 'a) ' : ''}${k} × 1 = ...`, answer: String(k) },
            { label: `1 × ${k} = ...`, answer: String(k) },
            { label: `${k} : 1 = ...`, answer: String(k) },
          ]),
          ...[2, 4, 5, 3].flatMap((k, i) => [
            { label: `${i === 0 ? 'b) ' : ''}${k} × 0 = ...`, answer: '0' },
            { label: `0 × ${k} = ...`, answer: '0' },
            { label: `0 : ${k} = ...`, answer: '0' },
          ]),
        ],
        hints: ['Số nào nhân với 1 hay chia cho 1 cũng bằng chính số đó.', 'Số nào nhân với 0 cũng bằng 0; 0 chia cho số nào (khác 0) cũng bằng 0.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối hai phép tính có cùng kết quả.',
        left: [{ id: 'l1', text: '5 × 3' }, { id: 'l2', text: '24 : 4' }, { id: 'l3', text: '0 : 5' }, { id: 'l4', text: '21 : 3' }],
        right: [{ id: 'r1', text: '18 : 3' }, { id: 'r2', text: '28 : 4' }, { id: 'r3', text: '3 × 5' }, { id: 'r4', text: '3 × 0' }],
        pairs: [['l1', 'r3'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r2']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Có 20 hành khách đi du lịch quanh thành phố Hà Nội bằng xe taxi, mỗi xe taxi chỉ chở được 4 hành khách. Hỏi cần bao nhiêu xe taxi để chở hết số hành khách đó?',
        wordProblem: true,
        blanks: [{ label: 'Số xe taxi', answer: '5' }],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT4T1Q4,
        q: '4. Số?',
        blanks: [
          { label: 'Hình thoi', answer: '4' },
          { label: 'Hình tam giác', answer: '2' },
          { label: 'Ô vuông', answer: '2' },
        ],
        hints: ['Số ở hình tam giác chia cho số ở ô vuông được 1, nên hai số đó bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm.',
        blanks: [
          ...[[6, 1, 2, 12], [6, 3, 4, 24], [6, 6, 5, 30], [6, 9, 8, 42]].flatMap(([k, a, b, d], i) => [
            { label: `${i === 0 ? 'a) ' : ''}${k} × ${a} = ...`, answer: String(k * a) },
            { label: `${k} × ${b} = ...`, answer: String(k * b) },
            { label: `${d} : ${k} = ...`, answer: String(d / k) },
          ]),
          ...[[7, 1, 2, 14], [7, 4, 6, 28], [7, 5, 7, 35], [7, 9, 3, 21]].flatMap(([k, a, b, d], i) => [
            { label: `${i === 0 ? 'b) ' : ''}${k} × ${a} = ...`, answer: String(k * a) },
            { label: `${k} × ${b} = ...`, answer: String(k * b) },
            { label: `${d} : ${k} = ...`, answer: String(d / k) },
          ]),
        ],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Phép tính nào dưới đây có kết quả lớn nhất?', options: ['A. 6 × 0', 'B. 42 : 6', 'C. 6 × 1', 'D. 1 × 5'], answer: 'B' },
          { left: 'b) Phép tính nào dưới đây có kết quả bé nhất?', options: ['A. 7 × 8', 'B. 56 : 7', 'C. 0 × 7', 'D. 6 × 7'], answer: 'C' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Mỗi bàn xếp 6 cái ghế. Hỏi:\na) Để xếp ghế vào 9 bàn như vậy thì cần bao nhiêu cái ghế?\nb) Nếu có 48 cái ghế thì xếp được vào bao nhiêu bàn như vậy?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số cái ghế', answer: '54' },
          { label: 'b) Số bàn', answer: '8' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT4T2Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.\nTrong hình bên:',
        blanks: [
          { label: '• Có ... hình tam giác;', answer: '9' },
          { label: '• Có ... hình tứ giác.', answer: '9' },
        ],
        hints: ['Đếm theo từng "tầng": mỗi đường ngang cùng với đỉnh trên cùng tạo ra 3 hình tam giác (bên trái, bên phải, cả hai).'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đ, S?',
        blanks: [
          { label: 'a) Số nào nhân với 1 cũng bằng 1.', answer: 'S', validate: dsValidate(false) },
          { label: 'b) Số nào chia cho 1 cũng bằng chính số đó.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Số 1 nhân với số nào cũng bằng 1.', answer: 'S', validate: dsValidate(false) },
          { label: 'd) Số 0 nhân với số nào cũng bằng 0.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'e) Số nào nhân với 0 cũng bằng 0.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'g) Số 0 chia cho số nào cũng bằng 0.', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Số nào nhân với 1 cũng bằng chính số đó.', 'Số 0 chỉ chia được cho số khác 0 — không có phép chia cho 0.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 6 × 5', right: '7 × 4', answer: '>' },
          { left: 'b) 6 × 7', right: '7 × 6', answer: '=' },
          { left: 'c) 36 : 6', right: '42 : 7', answer: '=' },
          { left: 'd) 60 : 6', right: '6 × 2', answer: '<' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Bác Nông có 6 bao gạo nếp cái hoa vàng, mỗi bao chứa 7 kg. Hỏi:\na) Bác Nông có tất cả bao nhiêu ki-lô-gam gạo nếp cái hoa vàng?\nb) Nếu bác Nông chia đều số gạo đó vào 7 túi thì mỗi túi có bao nhiêu ki-lô-gam gạo nếp cái hoa vàng?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số ki-lô-gam gạo tất cả', answer: '42' },
          { label: 'b) Số ki-lô-gam gạo mỗi túi', answer: '6' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT4T3Q4,
        q: '4. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Độ dài đường gấp khúc ABCDEG là:<br>... dm × ... = ... dm.', answer: '6,5,30', validate: listValidate(['6', '5', '30']) },
          { label: 'b) Nếu mỗi đoạn thẳng của đường gấp khúc ABCDEG đều tăng thêm 1 dm thì độ dài đường gấp khúc đó sẽ là:<br>... dm × ... = ... dm.', answer: '7,5,35', validate: listValidate(['7', '5', '35']) },
        ],
        hints: ['Đường gấp khúc ABCDEG có 5 đoạn thẳng dài bằng nhau.'],
      },
    ],
  },
];
