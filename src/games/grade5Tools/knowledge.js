/**
 * Kiến thức từng bài Toán 5 Tập Một (SGK Kết nối tri thức) cho nút 📘 Kiến thức của "Học bằng công cụ"
 * (grade5Tools.js). Định dạng mục: lessonHelp.js. Bài trộn (catalog mix) dùng { see: [...] }.
 * Nguồn: docs/lop_5/kien-thuc-toan5-tap1.md (tóm tắt SGK, trang sách = trang PDF − 1).
 * Ví dụ từng bước: loại của Toán 4 (board, frac, geo) và loại 'g5-…' trong knowledgeDemos.js.
 */

import { fr } from '../grade4Textbook/demos/util.js';
import { TOPICS } from './catalog.js';
import './knowledgeDemos.js';

const pg = (p) => `SGK Toán 5 Tập Một, trang ${p}`;
const mx = (w, a, b) => `<span class="k5-mx">${w}${fr(a, b)}</span>`;

const TEACH = {
  // ── Chủ đề 1. Ôn tập và bổ sung ─────────────────────────────────────────
  1: {
    title: 'Ôn tập số tự nhiên', page: pg(6),
    points: [
      'Số tự nhiên viết theo <b>hàng</b>: đơn vị, chục, trăm, nghìn, chục nghìn, trăm nghìn, triệu… Cứ ba hàng hợp thành một <b>lớp</b>: lớp đơn vị, lớp nghìn, lớp triệu.',
      'Giá trị của một chữ số tuỳ theo hàng của nó: chữ số 6 trong 960 730 có giá trị là <b>60 000</b>.',
      'Viết số thành tổng: 504 842 = 500 000 + 4 000 + 800 + 40 + 2. Hàng nào không có đơn vị thì viết <b>chữ số 0</b> ở hàng đó.',
      'So sánh: số nào có nhiều chữ số hơn thì lớn hơn; nếu cùng số chữ số thì so từng cặp chữ số cùng hàng, từ trái sang phải.',
      'Hai số chẵn (hoặc hai số lẻ) liên tiếp hơn kém nhau <b>2</b> đơn vị.',
    ],
    demos: [
      { kind: 'place', mode: 'read', n: 960730, ask: 6, tries: [{ label: '960 730', n: 960730, ask: 6 }, { label: '30 008 021', n: 30008021, ask: 3 }] },
      { kind: 'compare', a: 52814, b: 52841 },
    ],
  },
  2: {
    title: 'Ôn tập các phép tính với số tự nhiên', page: pg(9),
    points: [
      'Đặt tính: viết các chữ số cùng hàng thẳng cột, tính từ phải sang trái (phép chia thì chia từ trái sang phải).',
      'Nhân với số có hai chữ số: <b>tích riêng thứ hai viết lùi sang trái một cột</b>, rồi cộng các tích riêng.',
      'Thứ tự thực hiện: trong ngoặc trước; nhân, chia trước; cộng, trừ sau. Ví dụ 3 713 − 200 × 5 = 3 713 − 1 000 = 2 713.',
      'Tính chất giao hoán, kết hợp, nhân một số với một tổng giúp tính thuận tiện: 25 × 7 × 4 = (25 × 4) × 7 = 700.',
      'Tìm hai số khi biết tổng và hiệu: <b>Số lớn = (Tổng + Hiệu) : 2</b>; Số bé = (Tổng − Hiệu) : 2.',
    ],
    demos: [
      { kind: 'mul', a: 307, b: 15 },
      { kind: 'div', a: 4488, b: 34 },
    ],
  },
  3: {
    title: 'Ôn tập phân số', page: pg(11),
    points: [
      `Phân số ${fr(3, 5)}: mẫu số 5 là số phần bằng nhau, tử số 3 là số phần được lấy (tô màu).`,
      `<b>Tính chất cơ bản</b>: nhân (hoặc chia) cả tử số và mẫu số với cùng một số khác 0 thì được phân số bằng nó: ${fr(24, 40)} = ${fr(12, 20)} = ${fr(3, 5)}.`,
      `Rút gọn đến khi được <b>phân số tối giản</b> (tử và mẫu không cùng chia hết cho số nào lớn hơn 1).`,
      `Quy đồng mẫu số: nếu mẫu số này chia hết cho mẫu số kia thì lấy mẫu số lớn làm mẫu số chung (${fr(9, 5)} và ${fr(21, 40)}: mẫu số chung 40); nếu không thì lấy tích hai mẫu số.`,
      `So sánh: cùng mẫu số thì so tử số; cùng tử số thì phân số nào có mẫu số bé hơn thì lớn hơn (${fr(8, 5)} &gt; ${fr(8, 7)}); khác mẫu số thì quy đồng rồi so sánh.`,
    ],
    demos: [
      { kind: 'simplify', a: 18, b: 24, tries: [{ label: '18/24', a: 18, b: 24 }, { label: '24/40', a: 24, b: 40 }] },
      { kind: 'fcmp', a: 2, b: 5, c: 7, d: 10 },
    ],
  },
  4: {
    title: 'Phân số thập phân', page: pg(14),
    points: [
      `Các phân số có mẫu số là <b>10, 100, 1000,…</b> gọi là <b>phân số thập phân</b>: ${fr(3, 10)}; ${fr(57, 100)}; ${fr(351, 1000)}; ${fr(15, 10)}.`,
      `${fr(9, 20)} không phải phân số thập phân (mẫu số 20). ${fr(100, 59)} cũng không phải (100 ở tử số).`,
      `Một số phân số viết được thành phân số thập phân bằng cách nhân (hoặc chia) cả tử số và mẫu số với cùng một số: ${fr(3, 5)} = ${fr('3 × 2', '5 × 2')} = ${fr(6, 10)}; ${fr(25, 500)} = ${fr('25 : 5', '500 : 5')} = ${fr(5, 100)}.`,
      `Trên tia số, đoạn từ 0 đến 1 chia 10 phần: mỗi phần là ${fr(1, 10)}. Phóng to đoạn từ 0 đến ${fr(1, 10)} chia 10 phần: mỗi phần là ${fr(1, 100)}.`,
    ],
    demos: [
      { kind: 'g5-decfrac', a: 3, b: 5, tries: [{ label: '3/5', a: 3, b: 5 }, { label: '7/20', a: 7, b: 20 }, { label: '31/125', a: 31, b: 125 }, { label: '25/500', a: 25, b: 500, op: ':', k: 5 }] },
    ],
  },
  5: {
    title: 'Ôn tập các phép tính với phân số', page: pg(16),
    points: [
      `Cộng (trừ) hai phân số <b>cùng mẫu số</b>: cộng (trừ) hai tử số, giữ nguyên mẫu số. <b>Khác mẫu số</b>: quy đồng mẫu số trước.`,
      `Không cộng tử số với tử số, mẫu số với mẫu số: ${fr(5, 9)} + ${fr(4, 3)} <b>không</b> bằng ${fr(9, 12)}.`,
      `Nhân: <b>tử số nhân tử số, mẫu số nhân mẫu số</b>: ${fr(2, 3)} × ${fr(4, 5)} = ${fr('2 × 4', '3 × 5')} = ${fr(8, 15)}.`,
      `Chia: nhân phân số thứ nhất với <b>phân số thứ hai đảo ngược</b>: ${fr(2, 3)} : ${fr(4, 5)} = ${fr(2, 3)} × ${fr(5, 4)} = ${fr(10, 12)} = ${fr(5, 6)}.`,
      `Tìm phân số của một số: ${fr(7, 8)} của 96 là 96 × ${fr(7, 8)} = 84.`,
    ],
    demos: [
      { kind: 'fmul', a: 2, b: 3, c: 4, d: 5 },
      { kind: 'fof', n: 12, a: 3, b: 4, thing: 'quả cam' },
    ],
  },
  6: {
    title: 'Cộng, trừ hai phân số khác mẫu số', page: pg(20),
    points: [
      'Muốn cộng (hoặc trừ) hai phân số khác mẫu số, ta <b>quy đồng mẫu số</b>, rồi cộng (hoặc trừ) hai phân số đã quy đồng mẫu số.',
      `Ví dụ: ${fr(1, 5)} + ${fr(1, 2)} = ${fr(2, 10)} + ${fr(5, 10)} = ${fr(7, 10)}. Mẫu số 5 và 2 không chia hết cho nhau nên lấy mẫu số chung 5 × 2 = 10.`,
      `Nếu một mẫu số chia hết cho mẫu số kia thì lấy mẫu số lớn làm mẫu số chung: ${fr(1, 3)} + ${fr(1, 6)} = ${fr(2, 6)} + ${fr(1, 6)} = ${fr(3, 6)} = ${fr(1, 2)}.`,
      `Cộng, trừ số tự nhiên với phân số: viết số tự nhiên thành phân số có cùng mẫu số: 3 − ${fr(11, 8)} = ${fr(24, 8)} − ${fr(11, 8)} = ${fr(13, 8)}.`,
      'Kết quả rút gọn được thì rút gọn đến phân số tối giản.',
    ],
    demos: [
      { kind: 'fop', a: 1, b: 5, c: 1, d: 2, op: '+', tries: [{ label: '1/5 + 1/2', a: 1, b: 5, c: 1, d: 2, op: '+' }, { label: '1/2 − 1/5', a: 1, b: 2, c: 1, d: 5, op: '-' }, { label: '2/5 − 1/4', a: 2, b: 5, c: 1, d: 4, op: '-' }] },
    ],
  },
  7: {
    title: 'Hỗn số', page: pg(23),
    points: [
      `Chia 5 cái bánh cho 4 bạn: mỗi bạn được 1 cái và ${fr(1, 4)} cái, viết là ${mx(1, 1, 4)}, đọc là "một và một phần tư".`,
      `Mỗi hỗn số gồm hai phần: <b>phần nguyên</b> là số tự nhiên và <b>phần phân số</b> bé hơn 1. Đọc (viết) phần nguyên, rồi chữ "và", rồi phần phân số.`,
      `${mx(8, 1, 3)} = 8 + ${fr(1, 3)}. Đổi hỗn số ra phân số: ${mx(3, 2, 5)} = ${fr('3 × 5 + 2', 5)} = ${fr(17, 5)}.`,
      `Phân số thập phân lớn hơn 1 viết được thành hỗn số: ${fr(31, 10)} = ${mx(3, 1, 10)}; ngược lại ${mx(1, 9, 100)} = ${fr(109, 100)} (không phải ${fr(19, 100)}).`,
    ],
    demos: [
      { kind: 'g5-mixed', w: 2, a: 3, b: 4, tries: [{ label: '2 3/4', w: 2, a: 3, b: 4 }, { label: '1 1/4', w: 1, a: 1, b: 4 }, { label: '3 2/5', w: 3, a: 2, b: 5 }] },
    ],
  },
  8: {
    title: 'Ôn tập hình học và đo lường', page: pg(26),
    points: [
      'Khối lượng: <b>1 tấn = 10 tạ = 100 yến = 1000 kg</b>; mỗi đơn vị gấp 10 lần đơn vị bé hơn liền nó.',
      `Thời gian <b>không</b> đổi theo 10: 1 giờ = 60 phút, 1 phút = 60 giây, 1 thế kỉ = 100 năm. Ví dụ ${fr(1, 10)} giờ = 6 phút; 2 giờ 30 phút = 150 phút.`,
      'Góc nhọn bé hơn góc vuông; góc tù lớn hơn góc vuông và bé hơn góc bẹt. Đo góc bằng thước đo góc.',
      'Hai đường thẳng vuông góc tạo thành 4 góc vuông; hai đường thẳng song song không bao giờ cắt nhau. Hình bình hành, hình thoi có các cặp cạnh đối diện song song.',
      'Diện tích hình chữ nhật = chiều dài × chiều rộng (cùng đơn vị đo).',
    ],
    demos: [
      { kind: 'units', units: ['tấn', 'tạ', 'yến', 'kg'], parts: [[2, 'tấn'], [5, 'tạ']], to: 'kg' },
      { kind: 'angles', quiz: [150, 35] },
    ],
  },

  // ── Chủ đề 2. Số thập phân ──────────────────────────────────────────────
  10: {
    title: 'Khái niệm số thập phân', page: pg(32),
    points: [
      `9 dm = ${fr(9, 10)} m = <b>0,9 m</b> (đọc: không phẩy chín mét). 118 cm = ${mx(1, 18, 100)} m = <b>1,18 m</b>. 0,1 = ${fr(1, 10)}; 0,01 = ${fr(1, 100)}; 0,001 = ${fr(1, 1000)}.`,
      'Mỗi số thập phân gồm hai phần: <b>phần nguyên</b> và <b>phần thập phân</b>, ngăn cách bởi <b>dấu phẩy</b>. Chữ số bên trái dấu phẩy thuộc phần nguyên, bên phải thuộc phần thập phân.',
      'Sau dấu phẩy là các hàng <b>phần mười, phần trăm, phần nghìn</b>. Mỗi đơn vị của một hàng bằng 10 đơn vị của hàng thấp hơn liền sau.',
      'Muốn đọc (viết) số thập phân: đọc (viết) phần nguyên, đọc "phẩy" (viết dấu phẩy), rồi đọc (viết) phần thập phân. 0,04 đọc là "không phẩy không bốn"; 12,004 là "mười hai phẩy không không bốn".',
    ],
    demos: [
      { kind: 'g5-measure', parts: [[9, 'dm']], units: ['m', 'dm'], to: 'm', tries: [{ label: '9 dm', parts: [[9, 'dm']], units: ['m', 'dm'], to: 'm' }, { label: '118 cm', parts: [[118, 'cm']], units: ['m', 'dm', 'cm'], to: 'm' }] },
      { kind: 'g5-dplace', n: '325,431', tries: [{ label: '325,431', n: '325,431' }, { label: '2,38', n: '2,38' }, { label: '12,004', n: '12,004' }] },
    ],
  },
  11: {
    title: 'So sánh các số thập phân', page: pg(38),
    points: [
      'Hai số thập phân có <b>phần nguyên khác nhau</b>: số nào có phần nguyên lớn hơn thì lớn hơn (3,5 &gt; 2,75).',
      'Phần nguyên <b>bằng nhau</b>: so sánh lần lượt hàng phần mười, phần trăm, phần nghìn,… (2,75 &gt; 2,29 vì 7 &gt; 2). Nếu mọi hàng bằng nhau thì hai số bằng nhau.',
      'Viết thêm (hoặc bỏ đi) chữ số 0 ở <b>tận cùng bên phải</b> phần thập phân thì được số bằng nó: 0,7 = 0,70 = 0,700; 10,5070 = 10,507.',
      'Số có nhiều chữ số hơn <b>chưa chắc</b> lớn hơn: 0,9 &gt; 0,45; 2,875 &lt; 3,1.',
    ],
    demos: [
      { kind: 'g5-dcmp', a: '2,75', b: '2,29', tries: [{ label: '2,75 và 2,29', a: '2,75', b: '2,29' }, { label: '3,5 và 2,75', a: '3,5', b: '2,75' }, { label: '0,9 và 0,45', a: '0,9', b: '0,45' }, { label: '10,5 và 10,50', a: '10,5', b: '10,50' }] },
    ],
  },
  12: {
    title: 'Viết số đo đại lượng dưới dạng số thập phân', page: pg(42),
    points: [
      `Viết số đo thành hỗn số (hoặc phân số thập phân) theo đơn vị lớn, rồi viết thành số thập phân: 2 m 15 cm = ${mx(2, 15, 100)} m = <b>2,15 m</b>.`,
      'Độ dài, khối lượng: mỗi đơn vị có <b>một chữ số</b> trong bảng. 3 m 8 cm = <b>3,08 m</b> (không phải 3,8 m); 8 kg 75 g = 8,075 kg; 275 g = 0,275 kg.',
      'Diện tích: mỗi đơn vị có <b>hai chữ số</b>. 1 m² 60 dm² = 1,60 m² = 1,6 m²; 3 m² 6 dm² = <b>3,06 m²</b>; 56 dm² = 0,56 m².',
      'Đơn vị nào còn trống thì viết chữ số 0 vào chỗ đó, rồi đặt dấu phẩy ngay sau chữ số của đơn vị cần đổi.',
    ],
    demos: [
      { kind: 'g5-measure', parts: [[3, 'm'], [8, 'cm']], units: ['m', 'dm', 'cm'], to: 'm', tries: [
        { label: '3 m 8 cm', parts: [[3, 'm'], [8, 'cm']], units: ['m', 'dm', 'cm'], to: 'm' },
        { label: '2 m 15 cm', parts: [[2, 'm'], [15, 'cm']], units: ['m', 'dm', 'cm'], to: 'm' },
        { label: '1 kg 250 g', parts: [[1, 'kg'], [250, 'g']], units: ['kg', 'hg', 'dag', 'g'], to: 'kg' },
        { label: '275 g', parts: [[275, 'g']], units: ['kg', 'hg', 'dag', 'g'], to: 'kg' },
      ] },
      { kind: 'g5-measure', parts: [[3, 'm²'], [6, 'dm²']], units: ['m²', 'dm²'], to: 'm²', w: 2, tries: [
        { label: '3 m² 6 dm²', parts: [[3, 'm²'], [6, 'dm²']] },
        { label: '1 m² 60 dm²', parts: [[1, 'm²'], [60, 'dm²']] },
        { label: '56 dm²', parts: [[56, 'dm²']] },
      ] },
    ],
  },
  13: {
    title: 'Làm tròn số thập phân', page: pg(47),
    points: [
      'Làm tròn đến <b>số tự nhiên gần nhất</b>: nhìn chữ số hàng phần mười. Bé hơn 5 thì làm tròn xuống; lớn hơn hoặc bằng 5 thì làm tròn lên. 31,2 → 31; 31,56 → 32; 9,82 → 10.',
      'Làm tròn đến <b>hàng phần mười</b>: nhìn chữ số hàng phần trăm (2,52 → 2,5; 3,25 → 3,3).',
      'Làm tròn đến <b>hàng phần trăm</b>: nhìn chữ số hàng phần nghìn (6,324 → 6,32; 6,325 → 6,33).',
      'Luôn nhìn chữ số <b>ngay bên phải</b> hàng cần làm tròn, và chỉ làm tròn một lần: 1,449 làm tròn đến hàng phần mười là 1,4.',
    ],
    demos: [
      { kind: 'g5-round', n: '31,56', to: 0, tries: [{ label: '31,56', n: '31,56', to: 0 }, { label: '9,82', n: '9,82', to: 0 }, { label: '2,52 (phần mười)', n: '2,52', to: 1 }, { label: '6,325 (phần trăm)', n: '6,325', to: 2 }] },
    ],
  },

  // ── Chủ đề 3. Một số đơn vị đo diện tích ────────────────────────────────
  15: {
    title: 'Ki-lô-mét vuông. Héc-ta', page: pg(53),
    points: [
      'Ki-lô-mét vuông là diện tích hình vuông cạnh 1 km: <b>1 km² = 1 000 000 m²</b>.',
      'Héc-ta là diện tích hình vuông cạnh 100 m: <b>1 ha = 10 000 m²</b>.',
      '<b>1 km² = 100 ha</b>. Ví dụ 64 800 ha = 648 km²; khu đất hình vuông cạnh 200 m có diện tích 40 000 m² = 4 ha.',
      'Muốn biết mảnh đất nào lớn hơn, hãy tính diện tích rồi đổi về cùng đơn vị, đừng chỉ nhìn hình dài hay ngắn.',
    ],
    demos: [{ kind: 'g5-ha' }],
  },
  16: {
    title: 'Các đơn vị đo diện tích', page: pg(56),
    points: [
      'Bảng đơn vị đo diện tích: <b>km², ha, m², dm², cm², mm²</b>. 1 km² = 100 ha; 1 ha = 10 000 m²; 1 m² = 100 dm²; 1 dm² = 100 cm²; 1 cm² = 100 mm².',
      'Hai đơn vị liền nhau (m², dm², cm², mm²) gấp kém nhau <b>100 lần</b>, nên mỗi đơn vị có <b>hai chữ số</b> (không phải 10 lần như độ dài).',
      'Ví dụ: 2 m² 5 dm² = 205 dm²; 40 cm² 4 mm² = 4 004 mm²; 615 dm² = 6 m² 15 dm²; 12 km² 50 ha = 12,5 km².',
    ],
    demos: [
      { kind: 'units', units: ['m²', 'dm²', 'cm²'], parts: [[2, 'm²'], [5, 'dm²']], to: 'dm²', w: 2, tries: [
        { label: '2 m² 5 dm²', units: ['m²', 'dm²', 'cm²'], parts: [[2, 'm²'], [5, 'dm²']], to: 'dm²' },
        { label: '40 cm² 4 mm²', units: ['cm²', 'mm²'], parts: [[40, 'cm²'], [4, 'mm²']], to: 'mm²' },
      ] },
      { kind: 'g5-measure', parts: [[12, 'km²'], [50, 'ha']], units: ['km²', 'ha'], to: 'km²', w: 2 },
    ],
  },

  // ── Chủ đề 4. Các phép tính với số thập phân ────────────────────────────
  19: {
    title: 'Phép cộng số thập phân', page: pg(65),
    points: [
      'Muốn cộng hai số thập phân: viết số hạng này dưới số hạng kia sao cho <b>các chữ số ở cùng một hàng thẳng cột</b> với nhau (dấu phẩy thẳng dấu phẩy).',
      'Cộng như cộng các số tự nhiên.',
      'Viết <b>dấu phẩy ở tổng thẳng cột</b> với các dấu phẩy của các số hạng.',
      'Không căn phải như số tự nhiên: 6,53 + 12,8 = 19,33. Phép cộng có tính chất giao hoán, kết hợp: 6 + 8,46 + 1,54 = 6 + 10 = 16.',
    ],
    demos: [
      { kind: 'g5-dcol', a: '1,65', b: '1,26', op: '+', tries: [{ label: '1,65 + 1,26', a: '1,65', b: '1,26' }, { label: '24,5 + 3,84', a: '24,5', b: '3,84' }, { label: '6,53 + 12,8', a: '6,53', b: '12,8' }] },
    ],
  },
  20: {
    title: 'Phép trừ số thập phân', page: pg(68),
    points: [
      'Muốn trừ một số thập phân cho một số thập phân: viết số trừ dưới số bị trừ sao cho các chữ số cùng hàng thẳng cột.',
      'Trừ như trừ các số tự nhiên; viết <b>dấu phẩy ở hiệu thẳng cột</b> với các dấu phẩy của số bị trừ và số trừ.',
      'Nếu số bị trừ có ít chữ số ở phần thập phân hơn số trừ, viết thêm chữ số 0 vào bên phải: 25,9 − 13,84 coi là 25,90 − 13,84; 9 − 3,5 coi là 9,0 − 3,5.',
      'Hiệu bé hơn 1 thì phần nguyên là 0: 4,43 − 4,16 = <b>0,27</b>.',
    ],
    demos: [
      { kind: 'g5-dcol', a: '4,43', b: '4,16', op: '-', tries: [{ label: '4,43 − 4,16', a: '4,43', b: '4,16' }, { label: '63,49 − 1,8', a: '63,49', b: '1,8' }, { label: '25,9 − 13,84', a: '25,9', b: '13,84' }, { label: '9 − 3,5', a: '9', b: '3,5' }] },
    ],
  },
  21: {
    title: 'Phép nhân số thập phân', page: pg(71),
    points: [
      'Nhân một số thập phân với một số tự nhiên: nhân như nhân hai số tự nhiên; phần thập phân của số thập phân có bao nhiêu chữ số thì dùng dấu phẩy tách ở tích ra bấy nhiêu chữ số <b>kể từ phải sang trái</b>.',
      'Nhân hai số thập phân: nhân như nhân số tự nhiên, rồi đếm chữ số ở phần thập phân của <b>cả hai thừa số</b>: 4,3 × 3,6 = 15,48.',
      'Đặt tính nhân: các chữ số cuối thẳng cột, <b>không cần</b> dấu phẩy thẳng cột (khác phép cộng, trừ).',
      'Tích không đủ chữ số thì viết thêm chữ số 0 vào bên trái: 0,2 × 0,3 = 0,06. Biết 64 × 57 = 3 648 thì 6,4 × 0,57 = 3,648.',
    ],
    demos: [
      { kind: 'g5-dmul', a: '3,2', b: '8', tries: [{ label: '3,2 × 8', a: '3,2', b: '8' }, { label: '1,51 × 25', a: '1,51', b: '25' }, { label: '4,3 × 3,6', a: '4,3', b: '3,6' }, { label: '0,2 × 0,3', a: '0,2', b: '0,3' }] },
    ],
  },
  22: {
    title: 'Phép chia số thập phân', page: pg(76),
    points: [
      'Chia số thập phân cho số tự nhiên: chia phần nguyên; <b>viết dấu phẩy vào bên phải thương trước khi lấy chữ số đầu tiên ở phần thập phân</b>; rồi chia tiếp (92,8 : 4 = 23,2).',
      'Chia mà còn dư: viết dấu phẩy vào bên phải thương, <b>viết thêm chữ số 0</b> vào bên phải số dư rồi chia tiếp (26 : 8 = 3,25).',
      'Lượt nào số bị chia bé hơn số chia thì viết <b>0</b> vào thương: 19,95 : 19 = 1,05 (không phải 1,5).',
      'Số chia là số thập phân: số chia có bao nhiêu chữ số ở phần thập phân thì <b>chuyển dấu phẩy ở số bị chia sang phải</b> bấy nhiêu chữ số (thiếu thì viết thêm 0), bỏ dấu phẩy ở số chia: 2,48 : 1,6 = 24,8 : 16; 57 : 9,5 = 570 : 95.',
    ],
    demos: [
      { kind: 'g5-ddiv', a: '92,8', b: '4', tries: [{ label: '92,8 : 4', a: '92,8', b: '4' }, { label: '19,95 : 19', a: '19,95', b: '19' }, { label: '26 : 8', a: '26', b: '8' }, { label: '6 : 25', a: '6', b: '25' }] },
      { kind: 'g5-ddiv', a: '2,48', b: '1,6', tries: [{ label: '2,48 : 1,6', a: '2,48', b: '1,6' }, { label: '57 : 9,5', a: '57', b: '9,5' }, { label: '5,4 : 0,25', a: '5,4', b: '0,25' }] },
    ],
  },
  23: {
    title: 'Nhân, chia số thập phân với 10; 100; 1000;… hoặc với 0,1; 0,01; 0,001;…', page: pg(83),
    points: [
      'Nhân với 10; 100; 1000;…: chuyển dấu phẩy sang <b>phải</b> một, hai, ba,… chữ số (27,86 × 10 = 278,6).',
      'Nhân với 0,1; 0,01; 0,001;…: chuyển dấu phẩy sang <b>trái</b> một, hai, ba,… chữ số (15,23 × 0,1 = 1,523).',
      'Chia cho 10; 100; 1000;…: chuyển dấu phẩy sang <b>trái</b> (534,28 : 100 = 5,3428). Chia cho 0,1; 0,01; 0,001;…: chuyển sang <b>phải</b> (36,5 : 0,1 = 365).',
      'Hết chữ số thì viết thêm chữ số 0: 0,8 : 100 = 0,008; 53,28 × 1000 = 53 280. Đổi đơn vị cũng làm như vậy: 23,45 kg = 23 450 g; 12,6 cm = 0,126 m.',
    ],
    demos: [
      { kind: 'g5-shift', n: '27,86', op: '×', by: '10', tries: [
        { label: '27,86 × 10', n: '27,86', op: '×', by: '10' },
        { label: '53,28 × 1000', n: '53,28', op: '×', by: '1000' },
        { label: '15,23 × 0,1', n: '15,23', op: '×', by: '0,1' },
        { label: '0,3 : 10', n: '0,3', op: ':', by: '10' },
        { label: '36,5 : 0,1', n: '36,5', op: ':', by: '0,1' },
        { label: '0,8 : 100', n: '0,8', op: ':', by: '100' },
      ] },
    ],
  },

  // ── Chủ đề 5. Một số hình phẳng. Chu vi và diện tích ────────────────────
  25: {
    title: 'Hình tam giác. Diện tích hình tam giác', page: pg(91),
    points: [
      'Hình tam giác có 3 góc nhọn là tam giác nhọn; có 1 góc vuông là tam giác vuông; có 1 góc tù là tam giác tù. Tam giác đều có 3 cạnh bằng nhau.',
      'AH vuông góc với đáy BC: <b>AH là đường cao</b>, độ dài AH là <b>chiều cao</b>. Tam giác tù: chân đường cao nằm ngoài đáy (kéo dài đáy). Tam giác vuông: cạnh góc vuông là đường cao.',
      'Muốn tính diện tích hình tam giác, ta lấy độ dài đáy nhân với chiều cao (cùng một đơn vị đo) rồi chia cho 2: <b>S = a × h : 2</b>.',
      'Ví dụ: đáy 4 cm, chiều cao 3 cm: S = 4 × 3 : 2 = 6 (cm²). Đáy 2 dm, cao 20 cm: đổi 2 dm = 20 cm trước khi tính.',
    ],
    demos: [
      { kind: 'g5-tri', a: 4, h: 3, unit: 'cm', tries: [{ label: 'đáy 4, cao 3', a: 4, h: 3 }, { label: 'đáy 6, cao 5', a: 6, h: 5 }] },
    ],
  },
  26: {
    title: 'Hình thang. Diện tích hình thang', page: pg(98),
    points: [
      'Hình thang có <b>một cặp cạnh đối diện song song</b>: đó là hai đáy (đáy lớn, đáy bé); hai cạnh còn lại là cạnh bên.',
      'Đoạn thẳng vuông góc với hai đáy là <b>đường cao</b>; độ dài của nó là chiều cao. Hình thang có một cạnh bên vuông góc với hai đáy là <b>hình thang vuông</b>.',
      'Diện tích hình thang bằng tổng độ dài hai đáy nhân với chiều cao (cùng một đơn vị đo) rồi chia cho 2: <b>S = (a + b) × h : 2</b>.',
      '"Đáy lớn, đáy bé ta mang cộng vào, rồi đem nhân với chiều cao, chia đôi kết quả thế nào cũng ra." Ví dụ: đáy 6 cm và 4 cm, cao 3 cm: S = (6 + 4) × 3 : 2 = 15 (cm²).',
    ],
    demos: [
      { kind: 'g5-trap', a: 6, b: 4, h: 3, unit: 'cm', tries: [{ label: '6, 4, cao 3', a: 6, b: 4, h: 3 }, { label: '5, 3, cao 4', a: 5, b: 3, h: 4 }] },
    ],
  },
  27: {
    title: 'Đường tròn. Chu vi và diện tích hình tròn', page: pg(105),
    points: [
      'Dùng com-pa vạch ra <b>đường tròn</b>; đường tròn và phần bên trong là <b>hình tròn</b>. Tâm O; bán kính r nối tâm với một điểm trên đường tròn; đường kính d = r × 2.',
      'Muốn tính chu vi hình tròn, ta lấy 3,14 nhân với đường kính: <b>C = 3,14 × d</b>, hoặc 3,14 nhân với bán kính rồi nhân với 2: <b>C = 3,14 × r × 2</b>.',
      'Muốn tính diện tích hình tròn, ta lấy 3,14 nhân với bán kính rồi nhân với bán kính: <b>S = 3,14 × r × r</b>.',
      'Cẩn thận: tính diện tích phải dùng bán kính (đề cho đường kính thì chia 2 trước); diện tích có đơn vị vuông (cm², m²).',
    ],
    demos: [
      { kind: 'g5-circle', mode: 'C', d: 2, unit: 'dm', tries: [{ label: 'd = 2 dm', d: 2, r: undefined, unit: 'dm' }, { label: 'd = 6 cm', d: 6, r: undefined, unit: 'cm' }] },
      { kind: 'g5-circle', mode: 'S', r: 10, unit: 'cm', tries: [{ label: 'r = 10 cm', r: 10, unit: 'cm' }, { label: 'r = 2 dm', r: 2, unit: 'dm' }] },
    ],
  },
};

/** Bài Luyện tập chung / Ôn tập / Thực hành và trải nghiệm: dùng kiến thức các bài trong catalog mix. */
const MIX = {};
TOPICS.forEach((t) => t.lessons.forEach((l) => { if (l.mix) MIX[l.n] = { title: l.title, see: l.mix }; }));

export const KNOWLEDGE5 = { ...MIX, ...TEACH };
