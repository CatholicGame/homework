/**
 * Vở bài tập Toán 1 — Tập hai: Bài 28–31 (sách trang 41–58).
 * Bài 28 Luyện tập chung (dài hơn, ngắn hơn, cao hơn, thấp hơn, đo độ dài), Bài 29–30 phép cộng số có hai chữ số,
 * Bài 31 phép trừ số có hai chữ số cho số có một chữ số.
 * Mọi hình vẽ lại theo nét riêng: scripts/redraw/g1t2_bai28.py … g1t2_bai31.py (bộ vẽ kit_l1t2_c.py).
 */
import { swapPairValidate, dsValidate, textValidate, phraseListValidate, mau, blank } from '../grade3Workbook.js';
import imgB28Vehicles from '../../assets/grade1-workbook-2/bai28_t1_q1_vehicles.svg';
import imgB28Team from '../../assets/grade1-workbook-2/bai28_t1_q2_team.svg';
import imgB28Clips from '../../assets/grade1-workbook-2/bai28_t1_q3a_clips.svg';
import imgB28Table from '../../assets/grade1-workbook-2/bai28_t1_q3b_table.svg';
import imgB28Animals from '../../assets/grade1-workbook-2/bai28_t2_q1_animals.svg';
import imgB28Height from '../../assets/grade1-workbook-2/bai28_t2_q2a_height.svg';
import imgB28Pens from '../../assets/grade1-workbook-2/bai28_t2_q2b_pens.svg';
import imgB28Podium from '../../assets/grade1-workbook-2/bai28_t2_q3_podium.svg';
import imgB28Class from '../../assets/grade1-workbook-2/bai28_t2_q4_class.svg';
import imgB29Mantis from '../../assets/grade1-workbook-2/bai29_t1_q3_mantis.svg';
import imgB29Board from '../../assets/grade1-workbook-2/bai29_t1_q4_board.svg';
import imgB29Banana from '../../assets/grade1-workbook-2/bai29_t2_q3_banana.svg';
import imgB29Seal79 from '../../assets/grade1-workbook-2/bai29_t2_q4_seal79.svg';
import imgB29Seal58 from '../../assets/grade1-workbook-2/bai29_t2_q4_seal58.svg';
import imgB29Seal27 from '../../assets/grade1-workbook-2/bai29_t2_q4_seal27.svg';
import imgB29Seal68 from '../../assets/grade1-workbook-2/bai29_t2_q4_seal68.svg';
import imgB29Ice76 from '../../assets/grade1-workbook-2/bai29_t2_q4_ice76.svg';
import imgB29Ice24 from '../../assets/grade1-workbook-2/bai29_t2_q4_ice24.svg';
import imgB29Ice53 from '../../assets/grade1-workbook-2/bai29_t2_q4_ice53.svg';
import imgB29Ice61 from '../../assets/grade1-workbook-2/bai29_t2_q4_ice61.svg';
import imgB29Chests from '../../assets/grade1-workbook-2/bai29_t2_q5_chests.svg';
import imgB30Map from '../../assets/grade1-workbook-2/bai30_t1_q5_map.svg';
import imgB30Fish from '../../assets/grade1-workbook-2/bai30_t2_q3_fish.svg';
import imgB30Hercules from '../../assets/grade1-workbook-2/bai30_t2_q5_hercules.svg';
import imgB31Car58 from '../../assets/grade1-workbook-2/bai31_t1_q3_car58.svg';
import imgB31Car67 from '../../assets/grade1-workbook-2/bai31_t1_q3_car67.svg';
import imgB31Car49 from '../../assets/grade1-workbook-2/bai31_t1_q3_car49.svg';
import imgB31Car56 from '../../assets/grade1-workbook-2/bai31_t1_q3_car56.svg';
import imgB31Garden from '../../assets/grade1-workbook-2/bai31_t1_q4_garden.svg';
import imgB31Cat72 from '../../assets/grade1-workbook-2/bai31_t2_q2_cat72.svg';
import imgB31Cat98 from '../../assets/grade1-workbook-2/bai31_t2_q2_cat98.svg';
import imgB31Cat55 from '../../assets/grade1-workbook-2/bai31_t2_q2_cat55.svg';
import imgB31Cat66 from '../../assets/grade1-workbook-2/bai31_t2_q2_cat66.svg';
import imgB31Cat94 from '../../assets/grade1-workbook-2/bai31_t2_q2_cat94.svg';
import imgB31Fish96 from '../../assets/grade1-workbook-2/bai31_t2_q2_fish96.svg';
import imgB31Fish69 from '../../assets/grade1-workbook-2/bai31_t2_q2_fish69.svg';
import imgB31Fish79 from '../../assets/grade1-workbook-2/bai31_t2_q2_fish79.svg';
import imgB31Fish95 from '../../assets/grade1-workbook-2/bai31_t2_q2_fish95.svg';
import imgB31Fish59 from '../../assets/grade1-workbook-2/bai31_t2_q2_fish59.svg';
import imgB31Fridge from '../../assets/grade1-workbook-2/bai31_t2_q4_fridge.svg';
import imgB31Wheel from '../../assets/grade1-workbook-2/bai31_t3_q2_wheel.svg';
import imgB31Kids from '../../assets/grade1-workbook-2/bai31_t3_q3_kids.svg';
import imgB31Animals from '../../assets/grade1-workbook-2/bai31_t3_q4_animals.svg';
import imgB31Die from '../../assets/grade1-workbook-2/bai31_t3_q4_die.svg';

const res = (a, op, b) => (op === '+' ? a + b : a - b);

// "30 + 4 = ..." trên dòng chấm của sách: kết quả là chỗ trống duy nhất.
const calc = (a, op, b, prefix = '') => ({ label: `${prefix}${a} ${op} ${b} = ...`, answer: String(res(a, op, b)) });

// "Tính." phép tính dọc như sách in: hai số thẳng cột, dấu bên trái, gạch ngang, rồi kết quả.
const col = (a, b, op, r) => `<span style="display:inline-grid;grid-template-columns:auto auto;column-gap:6px;align-items:center;font-variant-numeric:tabular-nums;margin:4px 6px;vertical-align:middle;font-size:1.15em;line-height:1.2">`
  + `<span style="grid-row:1 / 3;padding-bottom:2px">${op}</span><span style="text-align:right">${a}</span><span style="text-align:right">${b}</span>`
  + `<span style="grid-column:1 / 3;border-top:2px solid currentColor;text-align:right;padding-top:4px">${r}</span></span>`;
const colCalc = (a, op, b, prefix = '') => ({ label: `${prefix}${col(a, b, op, '...')}`, boxes: true, answer: String(res(a, op, b)) });

// "Đặt tính rồi tính.": một dòng viết kết quả; nút ✍️ mở tờ vở đặt tính với đúng hai số (engine/calcPlay.js).
const dat = (a, op, b, prefix = '') => ({ label: `${prefix}${a} ${op} ${b}`, answer: String(res(a, op, b)), calc: `${a} ${op} ${b}` });

// Hình in trong sách ngay trên dòng trả lời.
const pic = (src, alt, w = 300) => `<img src="${src}" alt="${alt}" style="display:block;width:${w}px;max-width:100%;height:auto;margin:2px 0 6px">`;

// "Viết phép tính thích hợp": 5 ô, mỗi ô một số hoặc một dấu (13 + 6 = 19). Nhận mọi phép tính đúng
// theo đề (hai số hạng đổi chỗ), "-" hay "–" đều là "−".
const normEq = (s) => String(s).replace(/[,\s]/g, '').replace(/[-–—]/g, '−');
const eqBlank = (label, eqs) => {
  const ok = new Set(eqs.map(normEq));
  return {
    label: `${label}... ... ... ... ...`,
    boxes: true,
    answer: eqs[0].match(/\d+|[^\d\s]/g).join(','),
    validate: (v) => ok.has(normEq(v)),
  };
};

// "dài hơn / ngắn hơn / cao hơn / thấp hơn": bé chọn thẻ cụm từ, không phải gõ.
const phrase = (label, answer, tiles) => ({ label, answer, tiles, tileOne: true, validate: textValidate(answer) });
const LEN2 = ['dài hơn', 'ngắn hơn'];
const LEN4 = ['cao hơn', 'thấp hơn', 'dài hơn', 'ngắn hơn'];

// Dãy mũi tên của sách: số đầu (hình tròn / ô vuông), mỗi mũi tên ghi phép tính, ô trống ở cuối mũi tên.
const arrow = (op) => `<span style="display:inline-flex;flex-direction:column;align-items:center;vertical-align:middle;margin:0 2px">`
  + `<span style="font-size:.9em;font-weight:700">${op}</span>`
  + `<svg viewBox="0 0 70 12" width="70" height="12" aria-hidden="true"><line x1="2" y1="6" x2="60" y2="6" stroke="currentColor" stroke-width="2.4"/><path d="M58,1 L68,6 L58,11 Z" fill="currentColor"/></svg></span>`;
const startCircle = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.4em;height:2.4em;border-radius:50%;background:#BFE3F7;border:2px solid #3F3A40;font-weight:700;vertical-align:middle">${n}</span>`;
const startSquare = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:2.3em;height:2.3em;background:#7CC6E8;border:2px solid #3F3A40;font-weight:700;vertical-align:middle">${n}</span>`;
const shapeTag = (kind) => `<svg viewBox="0 0 24 24" width="20" height="20" aria-label="${kind === 'o' ? 'hình tròn' : 'hình tam giác'}" style="vertical-align:middle;margin-right:2px">`
  + (kind === 'o' ? '<circle cx="12" cy="12" r="9" fill="none" stroke="#2E9BD6" stroke-width="2.6"/>' : '<path d="M12,3 L22,21 H2 Z" fill="none" stroke="#2E9BD6" stroke-width="2.6" stroke-linejoin="round"/>')
  + '</svg>';

export const BAI_28_31 = [
  // ── BÀI 28 (trang 41–44) ─────────────────────────────────────────────────
  {
    id: 'bai-28', number: 28, title: 'Luyện tập chung',
    questions: [
      {
        type: 'compare', section: 'Tiết 1', img: imgB28Vehicles,
        q: '1. a) Tô màu chiếc xe dài nhất.\nb) Tô màu chiếc xe ngắn nhất.',
        rows: [
          { left: 'a) Chiếc xe dài nhất là:', options: ['Xe tải', 'Ô tô con', 'Xe buýt'], answer: 'Xe buýt' },
          { left: 'b) Chiếc xe ngắn nhất là:', options: ['Xe khách', 'Xe chòi chân', 'Xe đạp'], answer: 'Xe chòi chân' },
        ],
        hints: ['So chiều dài các xe trong cùng một hàng, từ đầu xe đến đuôi xe.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB28Team,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Bạn mặc áo ghi số ... là bạn cao nhất.', answer: '2' },
          { label: 'b) Bạn mặc áo ghi số ... là bạn thấp nhất.', answer: '6' },
        ],
        hints: ['Các bạn cùng đứng trên mặt sân. Nhìn đỉnh đầu: bạn nào cao vượt lên, bạn nào thấp nhất?'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số vào ô trống rồi viết <span class="gw-sample-text"><i>dài hơn</i></span>, <span class="gw-sample-text"><i>ngắn hơn</i></span> vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: `${pic(imgB28Clips, 'Bút chì dài bằng 5 cái ghim giấy xếp liền nhau, và bằng 4 cái gọt bút chì xếp liền nhau', 460)}<br>a) Bút chì dài ... cái ghim giấy.`, boxes: true, answer: '5' },
          { label: 'Bút chì dài ... gọt bút chì.', boxes: true, answer: '4' },
          phrase('Cái ghim giấy ... gọt bút chì.', 'ngắn hơn', LEN2),
          { label: `${pic(imgB28Table, 'Cái bàn dài bằng 5 cái thước kẻ đặt liền nhau, và bằng 10 gang tay', 520)}<br>b) Bàn dài ... cái thước kẻ.`, boxes: true, answer: '5' },
          { label: 'Bàn dài ... gang tay.', boxes: true, answer: '10' },
          phrase('Gang tay ... cái thước kẻ.', 'ngắn hơn', LEN2),
        ],
        hints: ['Đếm số ghim giấy, số gọt bút chì, số thước kẻ, số gang tay. Cần nhiều cái hơn để đo hết chiều dài thì cái đó ngắn hơn.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB28Animals,
        // 📏 Thước: toạ độ theo bai28_t2_q1_animals.svg; 1 cm = 50 (hươu cao cổ, kì lân 6 cm; thỏ 3 cm như sách).
        rulerPlay: {
          points: { _ga: [262, 60], _gb: [262, 360], _ra: [424, 210], _rb: [424, 360], _ua: [492, 60], _ub: [492, 360] },
          segs: [['_ga', '_gb'], ['_ra', '_rb'], ['_ua', '_ub']], unit: 'cm', per: 50,
          fill: [{ blank: 0, len: [['_ga', '_gb']] }, { blank: 1, len: [['_ra', '_rb']] }, { blank: 2, len: [['_ua', '_ub']] }],
        },
        q: '1. Dùng thước đo rồi viết số thích hợp vào ô trống.',
        blanks: [
          { label: 'Hươu cao cổ: ... cm', boxes: true, answer: '6' },
          { label: 'Thỏ: ... cm', boxes: true, answer: '3' },
          { label: 'Kì lân: ... cm', boxes: true, answer: '6' },
        ],
        hints: ['Đặt vạch 0 của thước ở mặt đất, đọc số ở vạch chấm trên đầu con vật.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết <span class="gw-sample-text"><i>cao hơn</i></span>, <span class="gw-sample-text"><i>thấp hơn</i></span>, <span class="gw-sample-text"><i>dài hơn</i></span>, <span class="gw-sample-text"><i>ngắn hơn</i></span> vào chỗ chấm cho thích hợp.',
        blanks: [
          phrase(`${pic(imgB28Height, 'Bạn Chi và rô-bốt đứng cạnh cột đo, đầu rô-bốt ở dưới đầu bạn Chi', 280)}<br>a) Rô-bốt ... bạn Chi.`, 'thấp hơn', LEN4),
          phrase(`${pic(imgB28Pens, 'Hai cái hộp dài bằng nhau; bút chì dài hơn cái hộp, bút mực ngắn hơn cái hộp', 280)}<br>b) Bút chì ... bút mực.`, 'dài hơn', LEN4),
        ],
        hints: ['a) Nhìn vạch chấm trên đầu mỗi bạn. b) Hai cái hộp dài bằng nhau: so bút với mép hộp.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB28Podium,
        q: '3. Ba bạn Việt, Nam và Mai cùng giành giải trong cuộc thi “Viết chữ đẹp”. Bạn đứng ở bục cao nhất giành huy chương vàng, bạn đứng ở bục thấp nhất giành huy chương đồng.\nViết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'Bạn Mai giành huy chương ... . Bạn ... giành huy chương đồng.', answer: 'vàng,Nam', tiles: ['vàng', 'bạc', 'đồng', 'Việt', 'Nam', 'Mai'], validate: phraseListValidate(['vàng', 'Nam']) },
        ],
        hints: ['Bục số 1 cao nhất, bục số 3 thấp nhất. Ai đứng trên mỗi bục?'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB28Class,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nCác dãy bàn được kê cách đều nhau. Cô giáo đang đứng ở dãy bàn số 4. Hỏi cô giáo đứng gần dãy bàn số 1 hay gần dãy bàn số 6 hơn?',
        options: ['A. Dãy bàn số 1', 'B. Dãy bàn số 6'],
        answer: 1,
        hints: ['Từ dãy 4 đến dãy 1 phải đi qua mấy dãy? Từ dãy 4 đến dãy 6 thì sao?'],
      },
    ],
  },
  // ── BÀI 29 (trang 45–48) ─────────────────────────────────────────────────
  {
    id: 'bai-29', number: 29, title: 'Phép cộng số có hai chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [colCalc(30, '+', 8), colCalc(64, '+', 2), colCalc(43, '+', 5), colCalc(97, '+', 1)],
        hints: ['Cộng hàng đơn vị trước, rồi viết chữ số hàng chục xuống.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [dat(10, '+', 6), dat(42, '+', 3), dat(85, '+', 4), dat(91, '+', 7)],
        hints: ['Viết số có một chữ số thẳng cột với hàng đơn vị, rồi cộng từ phải sang trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB29Mantis,
        q: '3. Viết số thích hợp vào ô trống.\nCó 51 con kiến và 4 con bọ ngựa. Hỏi có tất cả bao nhiêu con vật?',
        blanks: [{ label: '... + ... = ...', boxes: true, answer: '51,4,55', validate: swapPairValidate(51, 4, 55) }],
        hints: ['Gộp số con kiến với số con bọ ngựa: 51 + 4.'],
      },
      {
        type: 'table', section: 'Tiết 1', img: imgB29Board,
        q: '4. Trò chơi: Tàu chiếm đảo\n* <i>Chuẩn bị:</i> Xúc xắc; bảng trò chơi như hình vẽ; một vật (như cúc áo, ghim,...) tượng trưng cho tàu.\n* <i>Cách chơi:</i> Em tự chơi. Ban đầu đặt tàu ở ô màu xám. Em gieo xúc xắc rồi di chuyển con tàu theo hàng ngang với số ô bằng số chấm nhận được. Khi tàu đến ô có phép tính, thực hiện phép tính rồi chiếm đảo đó. Trò chơi kết thúc khi chiếm được 5 đảo.\nTính phép tính ở các đảo, theo đường tàu đi:',
        // 20 đảo theo đường tàu đi (hết hàng thì xuống hàng dưới, đi ngược lại), mỗi ô: phép tính rồi kết quả.
        rows: [
          [[30, 4], [56, 3], [12, 3], [43, 5]],
          [[35, 1], [24, 1], [62, 2], [8, 20]],
          [[13, 3], [21, 7], [51, 4], [91, 6]],
          [[5, 11], [33, 3], [5, 20], [15, 3]],
          [[9, 50], [4, 25], [70, 4], [80, 6]],
        ].map((row) => row.flatMap(([a, b]) => [`${a} + ${b} =`, blank(a + b)])),
        hints: ['Tàu đi hết hàng thì theo mũi tên xuống hàng dưới và đi ngược lại. 8 + 20: cộng 2 chục với 8 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [dat(80, '+', 7), dat(81, '+', 6), dat(82, '+', 5), dat(83, '+', 4)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào ô trống.',
        blanks: [
          { label: `${startCircle(14)}${arrow('+ 2')}...${arrow('+ 3')}...`, boxes: true, answer: '16,19' },
          { label: `${startCircle(30)}${arrow('+ 7')}...${arrow('+ 1')}...`, boxes: true, answer: '37,38' },
          { label: `${startCircle(52)}${arrow('+ 4')}...${arrow('+ 2')}...`, boxes: true, answer: '56,58' },
        ],
        hints: ['Đi theo mũi tên: 14 + 2 = 16, rồi lấy 16 + 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB29Banana,
        q: '3. Viết phép tính thích hợp.\nBố trồng được 13 cây chuối. Mẹ trồng được 6 cây chuối. Hỏi cả bố và mẹ trồng được bao nhiêu cây chuối?',
        blanks: [eqBlank('', ['13+6=19', '6+13=19'])],
        hints: ['Gộp số cây của bố và của mẹ. Mỗi ô viết một số hoặc một dấu.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '4. Nối (theo mẫu).',
        left: [
          { id: 's79', img: imgB29Seal79 }, { id: 's58', img: imgB29Seal58 },
          { id: 's27', img: imgB29Seal27 }, { id: 's68', img: imgB29Seal68 },
        ],
        right: [
          { id: 'i76', img: imgB29Ice76 }, { id: 'i24', img: imgB29Ice24 },
          { id: 'i53', img: imgB29Ice53 }, { id: 'i61', img: imgB29Ice61 },
        ],
        pairs: [['s79', 'i76'], ['s58', 'i53'], ['s27', 'i24'], ['s68', 'i61']],
        matchSample: ['s79', 'i76'],
        hints: ['Tính phép tính trên mỗi tảng băng, rồi nối với hải cẩu mang số đó. Mẫu: 76 + 3 = 79.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB29Chests,
        q: '5. Chìa khoá mở cửa con tàu chỉ có trong một chiếc hòm. Biết rằng kết quả của phép tính trên chiếc hòm đó lớn hơn 52 và bé hơn 55. Em hãy tô màu chiếc hòm có chìa khoá.\nChiếc hòm có chìa khoá là:',
        options: ['50 + 6', '51 + 4', '52 + 2'],
        answer: 2,
        hints: ['Tính kết quả trên từng chiếc hòm. Số nào lớn hơn 52 và bé hơn 55?'],
      },
    ],
  },
  // ── BÀI 30 (trang 49–52) ─────────────────────────────────────────────────
  {
    id: 'bai-30', number: 30, title: 'Phép cộng số có hai chữ số với số có hai chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [colCalc(30, '+', 18), colCalc(51, '+', 24), colCalc(43, '+', 35), colCalc(77, '+', 21)],
        hints: ['Cộng đơn vị với đơn vị, chục với chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [dat(10, '+', 16), dat(42, '+', 53), dat(23, '+', 45), dat(40, '+', 40)],
        hints: ['Viết các chữ số cùng hàng thẳng cột, rồi cộng từ phải sang trái.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối phép tính với kết quả của phép tính đó.',
        left: [{ id: 'c3020', text: '30 + 20' }, { id: 'c406', text: '40 + 6' }, { id: 'c6410', text: '64 + 10' }, { id: 'c6029', text: '60 + 29' }],
        right: [{ id: 'r46', text: '46' }, { id: 'r74', text: '74' }, { id: 'r50', text: '50' }, { id: 'r89', text: '89' }],
        pairs: [['c3020', 'r50'], ['c406', 'r46'], ['c6410', 'r74'], ['c6029', 'r89']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết phép tính thích hợp.\nLớp 1A có 32 học sinh, lớp 1B có 35 học sinh. Hỏi cả hai lớp có bao nhiêu học sinh?',
        blanks: [eqBlank('', ['32+35=67', '35+32=67'])],
        hints: ['Gộp số học sinh của hai lớp. Mỗi ô viết một số hoặc một dấu.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB30Map, multi: true,
        q: '5. Để đến gặp công chúa, kị sĩ phải đi qua hết các ngôi làng và toà thành cạnh phép tính có kết quả là số tròn chục. Hãy tô màu đường đi của kị sĩ.\nKị sĩ đi qua những nơi nào trước khi gặp công chúa? (Chọn tất cả các đáp án đúng.)',
        options: ['17 + 2', '10 + 9', '23 + 13', '91 + 8', '20 + 60', '10 + 10'],
        answer: [4, 5],
        hints: ['Số tròn chục là 10, 20, 30, …, 90. Tính từng phép tính cạnh ngôi làng, toà thành.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.',
        blanks: [colCalc(41, '+', 25), colCalc(32, '+', 51), colCalc(60, '+', 27), colCalc(85, '+', 13)],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.',
        blanks: [dat(40, '+', 16), dat(22, '+', 63), dat(14, '+', 52), dat(72, '+', 15)],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB30Fish,
        q: '3. Viết phép tính thích hợp.\nTrên mặt biển có 34 con cá chuồn đang bay. Dưới mặt biển có 42 con cá chuồn đang bơi. Hỏi có tất cả bao nhiêu con cá chuồn?',
        blanks: [eqBlank('', ['34+42=76', '42+34=76'])],
        hints: ['Gộp số cá đang bay với số cá đang bơi.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `4. Tính nhẩm (theo mẫu).\n${mau('a) 40 + 10 = 50')}`,
        blanks: [
          calc(20, '+', 30), calc(50, '+', 40),
          calc(30, '+', 50, 'b) '), calc(60, '+', 30), calc(70, '+', 10),
          calc(20, '+', 20, 'c) '), calc(10, '+', 80), calc(20, '+', 60),
        ],
        hints: ['Nhẩm theo chục: 4 chục + 1 chục = 5 chục, tức là 50.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB30Hercules,
        q: '5. Lực sĩ Héc-quyn đang tìm đường đi hái những trái táo vàng. Độ dài các con đường đo bằng số bước chân của người khổng lồ (hình vẽ). Tô màu con đường ngắn nhất mà lực sĩ có thể đi đến chỗ cây táo vàng.\nCon đường ngắn nhất là:',
        options: ['A. Đường qua cánh cổng', 'B. Đường qua con rồng', 'C. Đường qua chó ba đầu'],
        answer: 1,
        hints: ['Cộng số bước của hai đoạn trên mỗi đường: 30 + 45, 23 + 36, 41 + 45.'],
      },
    ],
  },
  // ── BÀI 31 (trang 53–58) ─────────────────────────────────────────────────
  {
    id: 'bai-31', number: 31, title: 'Phép trừ số có hai chữ số cho số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. a) Tính.\nb) Tính nhẩm.',
        blanks: [
          colCalc(17, '−', 4, 'a) '), colCalc(46, '−', 3), colCalc(57, '−', 5),
          colCalc(68, '−', 2), colCalc(79, '−', 9), colCalc(65, '−', 1),
          calc(45, '−', 5, 'b) '), calc(72, '−', 2), calc(43, '−', 3), calc(86, '−', 6),
        ],
        hints: ['Trừ hàng đơn vị trước, rồi viết chữ số hàng chục xuống. 45 − 5: bớt 5 đơn vị, còn 4 chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [dat(19, '−', 8), dat(37, '−', 4), dat(66, '−', 6), dat(78, '−', 7), dat(94, '−', 3)],
        hints: ['Viết số có một chữ số thẳng cột với hàng đơn vị, rồi trừ từ phải sang trái.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối (theo mẫu).',
        left: [{ id: 'a58', img: imgB31Car58 }, { id: 'a67', img: imgB31Car67 }, { id: 'a49', img: imgB31Car49 }, { id: 'a56', img: imgB31Car56 }],
        right: [{ id: 'p65', text: '65' }, { id: 'p54', text: '54' }, { id: 'p51', text: '51' }, { id: 'p40', text: '40' }],
        pairs: [['a58', 'p54'], ['a67', 'p65'], ['a49', 'p40'], ['a56', 'p51']],
        matchSample: ['a58', 'p54'],
        hints: ['Mỗi ô tô đỗ vào chỗ ghi kết quả phép tính trên xe. Mẫu: 58 − 4 = 54.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB31Garden,
        q: '4. Viết số thích hợp vào ô trống.\nMột khu vườn có 68 cây, trong đó có 8 cây lấy gỗ, còn lại là cây ăn quả. Hỏi khu vườn có bao nhiêu cây ăn quả?',
        blanks: [
          { label: '... − ... = ...', boxes: true, answer: '68,8,60' },
          { label: 'Khu vườn có ... cây ăn quả.', boxes: true, answer: '60' },
        ],
        hints: ['Lấy tất cả số cây bớt đi số cây lấy gỗ: 68 − 8.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đúng ghi Đ, sai ghi S.',
        blanks: [
          { label: `${col(57, 4, '−', 53)} ...`, answer: 'Đ', validate: dsValidate(true) },
          { label: `${col(48, 1, '−', 37)} ...`, answer: 'S', validate: dsValidate(false) },
          { label: `${col(64, 4, '−', 24)} ...`, answer: 'S', validate: dsValidate(false) },
          { label: `${col(77, 7, '−', 70)} ...`, answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Tự tính lại từng phép trừ rồi so với kết quả đã viết.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [
          { id: 'k72', img: imgB31Cat72 }, { id: 'k98', img: imgB31Cat98 }, { id: 'k55', img: imgB31Cat55 },
          { id: 'k66', img: imgB31Cat66 }, { id: 'k94', img: imgB31Cat94 },
        ],
        right: [
          { id: 'f96', img: imgB31Fish96 }, { id: 'f69', img: imgB31Fish69 }, { id: 'f79', img: imgB31Fish79 },
          { id: 'f95', img: imgB31Fish95 }, { id: 'f59', img: imgB31Fish59 },
        ],
        pairs: [['k72', 'f79'], ['k98', 'f96'], ['k55', 'f59'], ['k66', 'f69'], ['k94', 'f95']],
        matchSample: ['k98', 'f96'],
        hints: ['Tính kết quả của mèo và của cá. Mẫu: 98 − 3 = 95 và 96 − 1 = 95.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết số thích hợp vào ô trống.',
        blanks: [
          { label: `a) ${startSquare(47)}${arrow('− 3')}${shapeTag('o')}...${arrow('− 4')}${shapeTag('t')}...`, boxes: true, answer: '44,40' },
          { label: `b) ${startSquare(82)}${arrow('+ 7')}${shapeTag('t')}...${arrow('− 5')}${shapeTag('o')}...`, boxes: true, answer: '89,84' },
        ],
        hints: ['Đi theo mũi tên: 47 − 3 = 44, rồi lấy 44 − 4.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB31Fridge,
        q: '4. Viết số thích hợp vào ô trống.\nTrong tủ lạnh có 25 hộp sữa chua. Đã ăn hết 5 hộp. Hỏi trong tủ lạnh còn lại bao nhiêu hộp sữa chua?',
        blanks: [
          { label: '... − ... = ...', boxes: true, answer: '25,5,20' },
          { label: 'Trong tủ lạnh còn lại ... hộp sữa chua.', boxes: true, answer: '20' },
        ],
        hints: ['Lấy số hộp có lúc đầu bớt đi số hộp đã ăn: 25 − 5.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          dat(42, '+', 6, 'a) '), dat(48, '−', 6), dat(35, '+', 3), dat(38, '−', 3),
          dat(78, '−', 2, 'b) '), dat(76, '+', 2), dat(87, '−', 7), dat(80, '+', 7),
        ],
        hints: ['Nhìn kĩ dấu + hay dấu − trước khi tính.'],
      },
      {
        type: 'compare', section: 'Tiết 3', img: imgB31Wheel,
        q: '2. a) Tô màu đỏ vào ô ghi phép tính có kết quả bằng 50, màu xanh vào ô ghi phép tính có kết quả lớn hơn 50, màu vàng vào ô ghi phép tính có kết quả bé hơn 50.\nb) Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          ...[['58 − 7', 'Xanh'], ['50 + 0', 'Đỏ'], ['56 − 4', 'Xanh'], ['55 − 5', 'Đỏ'],
            ['48 − 5', 'Vàng'], ['61 − 1', 'Xanh'], ['38 − 1', 'Vàng'], ['49 − 9', 'Vàng']]
            .map(([e, c], i) => ({ left: `${i ? '' : 'a) '}Ô ${e} tô màu:`, options: ['Đỏ', 'Xanh', 'Vàng'], answer: c })),
          { left: 'b) Màu được tô ít nhất là:', options: ['A. Màu đỏ', 'B. Màu vàng', 'C. Màu xanh'], answer: 'A' },
        ],
        hints: ['Tính từng ô rồi so với 50. Sau đó đếm số ô của mỗi màu.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB31Kids,
        q: '3. Viết số thích hợp vào ô trống.\nBạn nữ cao bao nhiêu xăng-ti-mét?',
        blanks: [
          { label: '... − ... = ...', boxes: true, answer: '98,5,93' },
          { label: 'Bạn nữ cao ... cm.', boxes: true, answer: '93' },
        ],
        hints: ['Bạn nam cao 98 cm, bạn nữ thấp hơn bạn nam 5 cm: 98 − 5.'],
      },
      {
        type: 'table', section: 'Tiết 3', img: imgB31Animals,
        q: `4. Trò chơi. <span style="display:inline-flex;align-items:center;gap:6px;vertical-align:middle;font-weight:700">69 − ? = ? <img src="${imgB31Die}" alt="xúc xắc" style="width:40px;height:40px"></span>\n<i>Cách chơi:</i> Em tự chơi. Lần lượt gieo xúc xắc, lấy 69 trừ đi số chấm nhận được ở mặt trên xúc xắc. Tính kết quả, em sẽ bắt được con vật có số là kết quả đó.\nTrò chơi kết thúc khi bắt được 10 con vật.\nTính kết quả với mỗi mặt xúc xắc:`,
        rows: [[1, 2, 3], [4, 5, 6]].map((row) => row.flatMap((n) => [`69 − ${n} =`, blank(69 - n)])),
        hints: ['Xúc xắc có từ 1 đến 6 chấm. 69 − 1 = 68: bắt con vật mang số 68.'],
      },
    ],
  },
];
