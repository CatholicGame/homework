/**
 * Vở bài tập Toán 1 — Tập Hai: Bài 32–33 (sách trang 59–72).
 * Bài 32 Phép trừ số có hai chữ số cho số có hai chữ số, Bài 33 Luyện tập chung.
 * Mọi hình vẽ lại theo nét riêng: scripts/redraw/g1t2_bai32.py, g1t2_bai33.py (bộ vẽ kit_l1t2_d.py).
 */
import { dsValidate, listValidate } from '../grade3Workbook.js';
import imgB32Signs from '../../assets/grade1-workbook-2/bai32_t1_q3_signs.svg';
import imgB32Train from '../../assets/grade1-workbook-2/bai32_t1_q4_train.svg';
import imgB32RobotsA from '../../assets/grade1-workbook-2/bai32_t2_q2a_robots.svg';
import imgB32RobotsB from '../../assets/grade1-workbook-2/bai32_t2_q2b_robots.svg';
import imgB32Heights from '../../assets/grade1-workbook-2/bai32_t2_q4_heights.svg';
import imgB32Flowers from '../../assets/grade1-workbook-2/bai32_t3_q2_flowers.svg';
import imgB33Boy from '../../assets/grade1-workbook-2/bai33_t1_q2_boy.svg';
import imgB33Squirrel from '../../assets/grade1-workbook-2/bai33_t1_q3_squirrel.svg';
import imgB33Sheep from '../../assets/grade1-workbook-2/bai33_t1_q4_sheep.svg';
import imgB33S1 from '../../assets/grade1-workbook-2/bai33_t2_q2_s1.svg';
import imgB33S2 from '../../assets/grade1-workbook-2/bai33_t2_q2_s2.svg';
import imgB33S3 from '../../assets/grade1-workbook-2/bai33_t2_q2_s3.svg';
import imgB33S4 from '../../assets/grade1-workbook-2/bai33_t2_q2_s4.svg';
import imgB33R52 from '../../assets/grade1-workbook-2/bai33_t2_q2_r52.svg';
import imgB33R69 from '../../assets/grade1-workbook-2/bai33_t2_q2_r69.svg';
import imgB33R85 from '../../assets/grade1-workbook-2/bai33_t2_q2_r85.svg';
import imgB33R75 from '../../assets/grade1-workbook-2/bai33_t2_q2_r75.svg';
import imgB33ChainA from '../../assets/grade1-workbook-2/bai33_t2_q3a_chain.svg';
import imgB33ChainB from '../../assets/grade1-workbook-2/bai33_t2_q3b_chain.svg';
import imgB33Door from '../../assets/grade1-workbook-2/bai33_t2_q4_door.svg';
import imgB33Eggs from '../../assets/grade1-workbook-2/bai33_t2_q5_eggs.svg';
import imgB33Pyramid from '../../assets/grade1-workbook-2/bai33_t3_q2_pyramid.svg';
import imgB33Leaves from '../../assets/grade1-workbook-2/bai33_t3_q4_leaves.svg';
import imgB33Bubbles from '../../assets/grade1-workbook-2/bai33_t3_q5_bubbles.svg';
import imgB33Scale from '../../assets/grade1-workbook-2/bai33_t4_q3_scale.svg';

const res = (a, op, b) => (op === '+' ? a + b : a - b);

// "70 + 20 = ..." (Tính nhẩm): the result in one box, so the short rows spread into columns.
const calcEq = (a, op, b) => ({ label: `${a} ${op} ${b} = ...`, boxes: true, answer: String(res(a, op, b)) });

// "Đặt tính rồi tính.": one answer line per phép tính; the ✍️ Tính chip opens the column sheet
// (engine/calcPlay.js) where the child sets the two numbers in columns, then writes the result in
// the box. prefix: "a) " / "b) ".
const datTinh = (a, op, b, prefix = '') => ({ label: `${prefix}${a} ${op} ${b} = ...`, boxes: true, answer: String(res(a, op, b)), calc: true });

// "Tính." with the numbers already in columns, on the book's light-blue card: sign on the left,
// the two numbers right-aligned, a rule, then the result box.
const CARD = 'display:inline-grid;align-items:center;background:#DDF2FC;border-radius:12px;box-shadow:2px 3px 0 #B5DDF0;'
  + 'margin:4px 8px;vertical-align:middle;font-variant-numeric:tabular-nums;font-size:1.2em;line-height:1.2';
const colTinh = (a, op, b) => ({
  label: `<span style="${CARD};grid-template-columns:auto auto;column-gap:8px;padding:8px 16px">`
    + `<span style="grid-row:1 / 3">${op}</span><span style="text-align:right">${a}</span><span style="text-align:right">${b}</span>`
    + `<span style="grid-column:1 / 3;border-top:2px solid currentColor;text-align:right;padding-top:5px">...</span></span>`,
  boxes: true,
  answer: String(res(a, op, b)),
});

// "Viết chữ số thích hợp vào ô trống": the book's column card with a box per missing digit.
// top / bot / out are the two digit cells of each row ("..." = a box); boxes read top to bottom.
const cell = (t) => `<span style="display:flex;align-items:center;justify-content:center;width:2.8rem;height:2.8rem;font-weight:700">${t}</span>`;
const colDigits = (op, top, bot, out, digits) => ({
  label: `<span style="${CARD};grid-template-columns:1.1rem 2.8rem 2.8rem;padding:6px 14px 6px 8px">`
    + `<span style="grid-row:1 / 3;font-weight:700">${op}</span>${top.map(cell).join('')}${bot.map(cell).join('')}`
    + `<span style="grid-column:1 / 4;border-top:2.5px solid currentColor;margin:2px 0"></span><span></span>${out.map(cell).join('')}</span>`,
  boxes: true,
  answer: digits.join(','),
  validate: listValidate(digits.map(String)),
});

// "Viết phép tính thích hợp": the book's row of 5 boxes, one number or sign per box
// (95 − 45 = 50). Every equation the story allows is accepted; "-"/"–" count as "−".
const normEq = (s) => String(s).replace(/[,\s]/g, '').replace(/[-–—]/g, '−');
const eq5 = (...eqs) => ({
  label: '... ... ... ... ...',
  boxes: true,
  answer: eqs[0].join(','),
  validate: (v) => eqs.map(e => normEq(e.join(''))).includes(normEq(v)),
});

// A picture with answer boxes sitting on it (robot screens, the shapes of a chain, the pyramid):
// spots are [x, y] in the SVG's own units; the boxes stay on their spot at every width.
const onPic = (src, w, h, alt, spots) => `<span style="position:relative;display:inline-block;width:min(100%, ${w}px);flex:0 1 auto">`
  + `<img src="${src}" alt="${alt}" style="display:block;width:100%;height:auto">`
  + spots.map(([x, y]) => `<span style="position:absolute;left:${(x / w * 100).toFixed(2)}%;top:${(y / h * 100).toFixed(2)}%;transform:translate(-50%,-50%);line-height:1">...</span>`).join('')
  + '</span>';

// A digit of the door code already printed in the book (the "theo mẫu" 1 and 5).
const given = (d) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.6rem;height:2.6rem;border:2px solid #475569;border-radius:0.55rem;background:#F1F5F9;font-weight:700;font-size:1.25rem">${d}</span>`;

const ds = (label, isTrue) => ({ label, answer: isTrue ? 'Đ' : 'S', validate: dsValidate(isTrue) });

// Bài 32 Tiết 3 câu 4: ten mushrooms (the book's left column, then right column, row by row) and the basket
// each goes into. Text cells (🍄 / 🧺) keep the ten-row nối on one screen; picture cells would make the child scroll.
const MUSHROOMS = [
  ['m1', '46 − 23', 'b23'], ['m2', '37 − 3', 'b34'], ['m3', '58 − 24', 'b34'], ['m4', '66 − 10', 'b56'], ['m5', '68 − 45', 'b23'],
  ['m6', '67 − 55', 'b12'], ['m7', '68 − 12', 'b56'], ['m8', '75 − 30', 'b45'], ['m9', '95 − 61', 'b34'], ['m10', '78 − 33', 'b45'],
];

export const BAI_32_33 = [
  // ── BÀI 32 (trang 59–64) ─────────────────────────────────────────────────
  {
    id: 'bai-32', number: 32, title: 'Phép trừ số có hai chữ số cho số có hai chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [colTinh(64, '−', 22), colTinh(78, '−', 41), colTinh(89, '−', 52), colTinh(37, '−', 20), colTinh(90, '−', 50)],
        hints: ['Trừ từ phải sang trái: đơn vị trừ đơn vị, chục trừ chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [datTinh(76, '−', 31), datTinh(85, '−', 43), datTinh(48, '−', 28), datTinh(93, '−', 60)],
        hints: ['Viết số chục thẳng cột số chục, số đơn vị thẳng cột số đơn vị, rồi trừ từ phải sang trái.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB32Signs,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nBạn nào cầm bảng ghi phép tính có kết quả bé nhất?',
        options: ['A. Nam', 'B. Mai', 'C. Việt', 'D. Rô-bốt'],
        answer: 2,
        hints: ['Tính kết quả trên từng tấm bảng rồi so sánh các kết quả.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB32Train,
        q: '4. Viết số thích hợp vào ô trống.\nTrên một toa tàu có 28 khách, tới nhà ga có 12 khách xuống. Hỏi lúc này còn bao nhiêu khách trên toa tàu?',
        blanks: [
          { label: '... − ... = ...', boxes: true, answer: '28,12,16', validate: listValidate(['28', '12', '16']) },
          { label: 'Còn ... khách trên toa tàu.', boxes: true, answer: '16' },
        ],
        hints: ['Có khách xuống thì số khách trên toa ít đi: lấy 28 trừ đi 12.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. a) Tính nhẩm.',
        blanks: [
          calcEq(70, '+', 20), calcEq(90, '−', 70), calcEq(90, '−', 20),
          calcEq(40, '+', 30), calcEq(70, '−', 40), calcEq(70, '−', 30),
          datTinh(67, '−', 37, 'b) Đặt tính rồi tính.<br>'), datTinh(88, '−', 28), datTinh(57, '−', 52), datTinh(64, '−', 61),
        ],
        hints: ['Nhẩm theo chục: 7 chục + 2 chục = 9 chục, vậy 70 + 20 = 90.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào ô trống.',
        blanks: [
          { label: `a) ${onPic(imgB32RobotsA, 600, 190, 'Rô-bốt 76, trừ 46, rồi trừ 10', [[300, 138], [516, 138]])}`, boxes: true, answer: '30,20', validate: listValidate(['30', '20']) },
          { label: `b) ${onPic(imgB32RobotsB, 600, 190, 'Rô-bốt 40, cộng 8, rồi trừ 43', [[300, 138], [516, 138]])}`, boxes: true, answer: '48,5', validate: listValidate(['48', '5']) },
        ],
        hints: ['Đi theo mũi tên: a) 76 − 46 = ?, lấy kết quả trừ tiếp 10.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          colDigits('−', ['4', '...'], ['1', '5'], ['3', '4'], [9]),
          colDigits('−', ['...', '5'], ['4', '...'], ['5', '2'], [9, 3]),
          colDigits('−', ['6', '...'], ['4', '4'], ['...', '5'], [9, 2]),
          colDigits('−', ['8', '8'], ['...', '...'], ['3', '1'], [5, 7]),
        ],
        hints: ['Làm hàng đơn vị trước: mấy trừ 5 bằng 4?'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB32Heights,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nBạn nào cao nhất?',
        options: ['A. Khỉ', 'B. Gấu', 'C. Rô-bốt'],
        answer: 1,
        hints: ['So sánh ba số đo: 95 cm, 62 cm và 70 cm.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          datTinh(32, '+', 15, 'a) '), datTinh(47, '−', 15), datTinh(47, '−', 32), datTinh(35, '+', 12),
          datTinh(43, '+', 26, 'b) '), datTinh(69, '−', 43), datTinh(69, '−', 26), datTinh(46, '+', 23),
        ],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi tính từ phải sang trái.'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgB32Flowers,
        q: '2. Tô màu đỏ vào bông hoa ghi phép tính có kết quả lớn nhất, màu xanh vào bông hoa ghi phép tính có kết quả bé nhất.',
        rows: [
          { left: 'Bông hoa tô màu đỏ:', options: ['63 − 3', '75 − 25', '20 + 30', '59 − 12'], answer: '63 − 3' },
          { left: 'Bông hoa tô màu xanh:', options: ['63 − 3', '75 − 25', '20 + 30', '59 − 12'], answer: '59 − 12' },
        ],
        hints: ['Tính kết quả trên từng bông hoa: 63 − 3 = 60, 75 − 25 = 50.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Viết phép tính thích hợp.\nMột đống gạch có 95 viên. Bác thợ xây đã lấy đi một số viên gạch để xây tường. Tính ra còn lại 45 viên. Hỏi bác thợ đó đã lấy đi bao nhiêu viên gạch để xây tường?',
        blanks: [eq5(['95', '−', '45', '=', '50'])],
        hints: ['Lấy số viên gạch lúc đầu trừ đi số viên gạch còn lại. Mỗi ô viết một số hoặc một dấu.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '4. Nấm được cho vào giỏ khi kết quả phép tính ở nấm là số ghi trên giỏ đó.\na) Nối mỗi cây nấm với giỏ thích hợp.',
        left: MUSHROOMS.map(([id, text]) => ({ id, text: `🍄 ${text}` })),
        right: [12, 23, 34, 45, 56].map(n => ({ id: `b${n}`, text: `🧺 ${n}` })),
        pairs: MUSHROOMS.map(([id, , basket]) => [id, basket]),
        hints: ['Tính phép tính trên cây nấm, rồi tìm giỏ ghi đúng số đó. Một giỏ có thể nhận nhiều cây nấm.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. b) Đúng ghi Đ, sai ghi S.\nNhững giỏ có hai cây nấm là giỏ ghi số:',
        blanks: [ds('• 23; 34; 56', false), ds('• 23; 45; 56', true)],
        hints: ['Đếm xem mỗi giỏ ở câu a) được nối với mấy cây nấm.'],
      },
    ],
  },

  // ── BÀI 33 (trang 65–72) ─────────────────────────────────────────────────
  {
    id: 'bai-33', number: 33, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [colTinh(53, '+', 4), colTinh(30, '+', 31), colTinh(67, '−', 7), colTinh(85, '−', 13)],
        hints: ['Tính từ phải sang trái: hàng đơn vị trước, hàng chục sau.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB33Boy,
        q: '2. Đặt tính rồi tính.',
        blanks: [datTinh(50, '+', 7), datTinh(33, '+', 45), datTinh(48, '−', 2), datTinh(62, '−', 12)],
        hints: ['Số có một chữ số viết thẳng cột với hàng đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB33Squirrel,
        q: '3. Viết phép tính thích hợp.\nTrời bão, có 15 chú sóc trú mưa trong hốc cây. Lúc sau có thêm 31 chú sóc đến trú mưa cùng. Hỏi có tất cả bao nhiêu chú sóc trong hốc cây?',
        blanks: [eq5(['15', '+', '31', '=', '46'], ['31', '+', '15', '=', '46'])],
        hints: ['Có thêm sóc đến thì làm phép cộng. Mỗi ô viết một số hoặc một dấu.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB33Sheep,
        q: '4. Viết phép tính thích hợp.\nBiết chú cừu đen đang đứng trên tảng đá nhỏ. Tảng đá nhỏ nằm trên tảng đá to. Tảng đá to cao 34 gang tay. Tảng đá nhỏ cao 25 gang tay (hình vẽ). Hỏi cừu đen đứng ở vị trí cách mặt đất bao nhiêu gang tay?',
        blanks: [eq5(['34', '+', '25', '=', '59'], ['25', '+', '34', '=', '59'])],
        hints: ['Cừu đen đứng trên cả hai tảng đá chồng lên nhau, nên cộng chiều cao của hai tảng đá.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [datTinh(40, '+', 5), datTinh(16, '+', 52), datTinh(79, '−', 6), datTinh(48, '−', 26)],
      },
      {
        type: 'match', section: 'Tiết 2', bigImg: true,
        q: '2. Nối phép tính với kết quả của phép tính đó.',
        left: [{ id: 's1', img: imgB33S1 }, { id: 's2', img: imgB33S2 }, { id: 's3', img: imgB33S3 }, { id: 's4', img: imgB33S4 }],
        right: [{ id: 'r52', img: imgB33R52 }, { id: 'r69', img: imgB33R69 }, { id: 'r85', img: imgB33R85 }, { id: 'r75', img: imgB33R75 }],
        pairs: [['s1', 'r69'], ['s2', 'r52'], ['s3', 'r75'], ['s4', 'r85']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết số thích hợp vào ô trống.',
        blanks: [
          { label: `a) ${onPic(imgB33ChainA, 600, 130, 'Ô vuông 69, trừ 9 vào hình tròn, cộng 23 vào hình tam giác', [[300, 72], [530, 90]])}`, boxes: true, answer: '60,83', validate: listValidate(['60', '83']) },
          { label: `b) ${onPic(imgB33ChainB, 600, 130, 'Ô vuông 75, trừ 15 vào hình tam giác, cộng 20 vào hình tròn', [[300, 90], [530, 72]])}`, boxes: true, answer: '60,80', validate: listValidate(['60', '80']) },
        ],
        hints: ['Đi theo mũi tên: a) 69 − 9 = ?, lấy kết quả cộng tiếp 23.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB33Door,
        q: '4. Mật mã mở cửa là kết quả của các phép tính đã cho. Em hãy thực hiện phép tính, điền kết quả vào ô trống (theo mẫu) để giúp thám tử Tí mở cửa.',
        blanks: [{ label: `${given('1')}${given('5')}... ... ... ... ...`, boxes: true, answer: '5,9,1,3,1', validate: listValidate(['5', '9', '1', '3', '1']) }],
        calcs: ['90 + 1', '85 − 80', '77 − 46'],
        hints: ['Mẫu: 68 − 53 = 15, hai chữ số 1 và 5 vào hai ô đầu. Lần theo dây nối để biết mỗi chữ số của kết quả vào ô nào.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB33Eggs,
        q: '5. Bác Lan mang trứng gà ra bán ở chợ. Buổi sáng, bác bán được 45 quả trứng. Buổi chiều, bác bán được 79 quả trứng. Hỏi buổi chiều, bác Lan bán được nhiều hơn buổi sáng bao nhiêu quả trứng?',
        blanks: [
          { ...eq5(['79', '−', '45', '=', '34']), label: 'a) Viết phép tính thích hợp.<br>... ... ... ... ...' },
          { label: 'b) Viết số thích hợp vào chỗ chấm.<br>Buổi chiều, bác Lan bán được nhiều hơn buổi sáng ... quả trứng.', answer: '34' },
        ],
        hints: ['Muốn biết nhiều hơn bao nhiêu, lấy số lớn trừ số bé: 79 − 45.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [datTinh(50, '+', 23), datTinh(43, '+', 2), datTinh(67, '−', 10), datTinh(68, '−', 31)],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Viết số thích hợp vào ô trống.',
        blanks: [{ label: onPic(imgB33Pyramid, 600, 400, 'Tháp số: hàng dưới 10, 11, 10, 11; hàng trên 21, 21, ô trống; rồi 42, ô trống; đỉnh ô trống', [[300, 56], [380, 156], [460, 256]]), boxes: true, answer: '84,42,21', validate: listValidate(['84', '42', '21']) }],
        hints: ['Số ở mỗi ô bằng tổng hai số ở hai ô ngay bên dưới: 10 + 11 = 21.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Ở phiên chợ Ba Tư đang có 44 con lạc đà. Phú ông đi vào chợ dẫn theo đàn lạc đà có 43 con. Hỏi trong chợ lúc này có bao nhiêu con lạc đà?',
        blanks: [
          { ...eq5(['44', '+', '43', '=', '87'], ['43', '+', '44', '=', '87']), label: 'a) Viết phép tính thích hợp.<br>... ... ... ... ...' },
          { label: 'b) Viết số thích hợp vào chỗ chấm.<br>Trong chợ có tất cả ... con lạc đà.', answer: '87' },
        ],
        hints: ['Thêm lạc đà vào chợ thì làm phép cộng.'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgB33Leaves,
        q: '4. Tô màu xanh cho chiếc lá ghi phép tính đúng, màu đỏ cho chiếc lá ghi phép tính sai.',
        rows: [
          { left: '96 + 2 = 98', options: ['Xanh', 'Đỏ'], answer: 'Xanh' },
          { left: '34 + 61 = 94', options: ['Xanh', 'Đỏ'], answer: 'Đỏ' },
          { left: '80 − 20 = 60', options: ['Xanh', 'Đỏ'], answer: 'Xanh' },
          { left: '76 − 12 = 68', options: ['Xanh', 'Đỏ'], answer: 'Đỏ' },
          { left: '15 + 40 = 55', options: ['Xanh', 'Đỏ'], answer: 'Xanh' },
        ],
        hints: ['Tự tính lại từng phép tính rồi so với kết quả ghi trên lá.'],
      },
      {
        type: 'choice', section: 'Tiết 3', img: imgB33Bubbles,
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nDấu "?" là kết quả của phép tính nào sau đây?',
        options: ['A. 80 − 20', 'B. 15 + 50', 'C. 5 + 50'],
        answer: 1,
        hints: ['Các số trên bong bóng cứ tăng thêm 10: 25, 35, 45, 55, …'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '1. Đặt tính rồi tính.',
        blanks: [datTinh(61, '+', 37), datTinh(35, '+', 1), datTinh(62, '−', 22), datTinh(48, '−', 4)],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '2. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          colDigits('+', ['1', '...'], ['6', '2'], ['7', '7'], [5]),
          colDigits('+', ['2', '3'], ['...', '3'], ['7', '6'], [5]),
          colDigits('−', ['7', '6'], ['...', '4'], ['3', '2'], [4]),
          colDigits('−', ['7', '6'], ['4', '...'], ['3', '5'], [1]),
          colDigits('+', ['3', '5'], ['...', '...'], ['4', '7'], [1, 2]),
          colDigits('−', ['...', '9'], ['6', '...'], ['1', '3'], [7, 6]),
        ],
        hints: ['Làm hàng đơn vị trước, rồi đến hàng chục. Thử lại bằng cách tính cả phép tính.'],
      },
      {
        type: 'fill', section: 'Tiết 4', img: imgB33Scale,
        q: '3. Biết số hạt dẻ ở hai đĩa cân bằng nhau. Trong túi màu xanh có bao nhiêu hạt dẻ?',
        blanks: [
          { ...eq5(['58', '−', '41', '=', '17']), label: 'a) Viết phép tính thích hợp.<br>... ... ... ... ...' },
          { label: 'b) Viết số thích hợp vào chỗ chấm.<br>Trong túi màu xanh có ... hạt dẻ.', answer: '17' },
        ],
        hints: ['Túi trắng và túi xanh cộng lại bằng 58 hạt dẻ, nên lấy 58 trừ đi 41.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '4. Một bồn hoa có 32 bông hoa màu vàng và 54 bông hoa màu đỏ. Hỏi bồn hoa đó có tất cả bao nhiêu bông hoa?',
        blanks: [
          { ...eq5(['32', '+', '54', '=', '86'], ['54', '+', '32', '=', '86']), label: 'a) Viết phép tính thích hợp.<br>... ... ... ... ...' },
          { label: 'b) Viết số thích hợp vào chỗ chấm.<br>Bồn hoa có tất cả ... bông hoa.', answer: '86' },
        ],
        hints: ['Gộp hoa vàng và hoa đỏ thì làm phép cộng.'],
      },
    ],
  },
];
