/**
 * Vở bài tập Toán 1 — Tập hai (Kết nối tri thức): Bài 38–41, ôn tập cuối năm (sách trang 89–107).
 * Bài 38 Ôn tập các số và phép tính trong phạm vi 10, Bài 39 … trong phạm vi 100,
 * Bài 40 Ôn tập hình học và đo lường, Bài 41 Ôn tập chung.
 * Mọi hình là SVG vẽ lại theo nét riêng: scripts/redraw/g1t2_bai38.py … g1t2_bai41.py (bộ vẽ kit_l1t2_f.py).
 */
import { blank, sampleCell, dsValidate, setValidate, listValidate, swapPairValidate, phraseValidate, mau } from '../grade3Workbook.js';
// Bài 38
import imgB38Flowers from '../../assets/grade1-workbook-2/bai38_t1_q2_flowers.svg';
import imgB38Birds from '../../assets/grade1-workbook-2/bai38_t1_q3_birds.svg';
import imgB38Rabbits from '../../assets/grade1-workbook-2/bai38_t1_q4_rabbits.svg';
import imgB38Hex from '../../assets/grade1-workbook-2/bai38_t2_q1_hex.svg';
import imgB38Turtles from '../../assets/grade1-workbook-2/bai38_t2_q2_turtles.svg';
import imgB38Bees from '../../assets/grade1-workbook-2/bai38_t2_q5_bees.svg';
import icFl2 from '../../assets/grade1-workbook-2/bai38_t2_q5_flower2.svg';
import icFl4 from '../../assets/grade1-workbook-2/bai38_t2_q5_flower4.svg';
import icFl5 from '../../assets/grade1-workbook-2/bai38_t2_q5_flower5.svg';
import icFl7 from '../../assets/grade1-workbook-2/bai38_t2_q5_flower7.svg';
import icFl8 from '../../assets/grade1-workbook-2/bai38_t2_q5_flower8.svg';
import imgB38Sticks1 from '../../assets/grade1-workbook-2/bai38_t3_q1_sticks.svg';
import imgB38Sticks2 from '../../assets/grade1-workbook-2/bai38_t3_q2_sticks.svg';
import imgB38Sticks3 from '../../assets/grade1-workbook-2/bai38_t3_q3_sticks.svg';
import imgB38Gates from '../../assets/grade1-workbook-2/bai38_t3_q4_gates.svg';
// Bài 39
import imgN54 from '../../assets/grade1-workbook-2/bai39_t1_q1_n54.svg';
import imgN45 from '../../assets/grade1-workbook-2/bai39_t1_q1_n45.svg';
import imgN71 from '../../assets/grade1-workbook-2/bai39_t1_q1_n71.svg';
import imgN80 from '../../assets/grade1-workbook-2/bai39_t1_q1_n80.svg';
import imgB39Snowmen from '../../assets/grade1-workbook-2/bai39_t1_q2_snowmen.svg';
import imgB39Cards from '../../assets/grade1-workbook-2/bai39_t1_q4_cards.svg';
import icCat from '../../assets/grade1-workbook-2/bai39_t2_q2_cat.svg';
import icFish from '../../assets/grade1-workbook-2/bai39_t2_q2_fish.svg';
import imgB39Train from '../../assets/grade1-workbook-2/bai39_t2_q4_train.svg';
import imgB39Flowers from '../../assets/grade1-workbook-2/bai39_t3_q2_flowers.svg';
import imgB39Garden from '../../assets/grade1-workbook-2/bai39_t3_q3_garden.svg';
import imgB39Sticks from '../../assets/grade1-workbook-2/bai39_t3_q5_sticks.svg';
import svgB39Sticks from '../../assets/grade1-workbook-2/bai39_t3_q5_sticks.svg?raw';
// Bài 40
import imgB40Solids from '../../assets/grade1-workbook-2/bai40_t1_q1_solids.svg';
import imgB40Shapes from '../../assets/grade1-workbook-2/bai40_t1_q2_shapes.svg';
import svgB40Shapes from '../../assets/grade1-workbook-2/bai40_t1_q2_shapes.svg?raw';
import imgB40Sticks from '../../assets/grade1-workbook-2/bai40_t1_q3_sticks.svg';
import imgSeqA from '../../assets/grade1-workbook-2/bai40_t1_q4_seqA.svg';
import imgSeqB from '../../assets/grade1-workbook-2/bai40_t1_q4_seqB.svg';
import icASq from '../../assets/grade1-workbook-2/bai40_t1_q4_optA_sq.svg';
import icACi from '../../assets/grade1-workbook-2/bai40_t1_q4_optA_ci.svg';
import icARe from '../../assets/grade1-workbook-2/bai40_t1_q4_optA_re.svg';
import icATr from '../../assets/grade1-workbook-2/bai40_t1_q4_optA_tr.svg';
import icBBig from '../../assets/grade1-workbook-2/bai40_t1_q4_optB_big.svg';
import icBTall from '../../assets/grade1-workbook-2/bai40_t1_q4_optB_tall.svg';
import icBSmall from '../../assets/grade1-workbook-2/bai40_t1_q4_optB_small.svg';
import icBFlat from '../../assets/grade1-workbook-2/bai40_t1_q4_optB_flat.svg';
import imgB40Tri from '../../assets/grade1-workbook-2/bai40_t1_q5_triangle.svg';
import imgPark from '../../assets/grade1-workbook-2/bai40_t2_q1_park.svg';
import imgZoo from '../../assets/grade1-workbook-2/bai40_t2_q1_zoo.svg';
import imgBoat from '../../assets/grade1-workbook-2/bai40_t2_q1_boat.svg';
import imgHome from '../../assets/grade1-workbook-2/bai40_t2_q1_home.svg';
import imgPiano from '../../assets/grade1-workbook-2/bai40_t2_q1_piano.svg';
import imgWater from '../../assets/grade1-workbook-2/bai40_t2_q1_water.svg';
import icClock10 from '../../assets/grade1-workbook-2/bai40_t2_q1_clock10.svg';
import icClock9 from '../../assets/grade1-workbook-2/bai40_t2_q1_clock9.svg';
import icClock8 from '../../assets/grade1-workbook-2/bai40_t2_q1_clock8.svg';
import icClock5 from '../../assets/grade1-workbook-2/bai40_t2_q1_clock5.svg';
import icClock11 from '../../assets/grade1-workbook-2/bai40_t2_q1_clock11.svg';
import icClock3 from '../../assets/grade1-workbook-2/bai40_t2_q1_clock3.svg';
import imgB40Measure from '../../assets/grade1-workbook-2/bai40_t2_q3_measure.svg';
import imgB40Strips from '../../assets/grade1-workbook-2/bai40_t2_q4_strips.svg';

// Bài 41
import imgB41Road from '../../assets/grade1-workbook-2/bai41_q1b_road.svg';
import imgB41Clocks from '../../assets/grade1-workbook-2/bai41_q3_clocks_pencil.svg';
import imgB41Marbles from '../../assets/grade1-workbook-2/bai41_q4_marbles.svg';
import imgB41Tri from '../../assets/grade1-workbook-2/bai41_q6_triangle.svg';

// ── helpers ────────────────────────────────────────────────────────────────

const INK = '#3F3A40';
// Nhiều ô trống một hàng, đáp án đúng là một trong các cách ghi (que tính: 6 > 5 hoặc 9 > 5).
const oneOf = (...answers) => {
  const ok = new Set(answers.map(a => a.join('|')));
  return (v) => ok.has(String(v).split(',').map(s => s.trim()).join('|'));
};
const signTiles = ['>', '<', '='];
const svgUri = (svg) => `url(&quot;data:image/svg+xml,${encodeURIComponent(svg).replace(/'/g, '%27')}&quot;)`;

// Ngôi sao sáu cánh trên sợi dây (Bài 38 Tiết 1 Q1): số cho sẵn hoặc ô trống nằm giữa ngôi sao.
const STAR_PTS = Array.from({ length: 12 }, (_, i) => {
  const a = -Math.PI / 2 + i * Math.PI / 6, r = i % 2 ? 27 : 46;
  return `${(50 + r * Math.cos(a)).toFixed(1)},${(50 + r * Math.sin(a)).toFixed(1)}`;
}).join(' ');
const STAR_BG = svgUri(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><line x1='0' y1='54' x2='100' y2='50' stroke='#8B93A0' stroke-width='3'/><polygon points='${STAR_PTS}' fill='#7CC6E8' stroke='${INK}' stroke-width='3' stroke-linejoin='round'/><circle cx='50' cy='50' r='22' fill='#fff' stroke='${INK}' stroke-width='2'/></svg>`);
const star = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:clamp(3.2rem,11vw,5.2rem);height:clamp(3.2rem,11vw,5.2rem);background:${STAR_BG} center/contain no-repeat;font-weight:700;font-size:1.35rem;line-height:1">${n}</span>`;
const stars = (items) => `<span style="display:inline-flex;flex-wrap:wrap;align-items:center">${items.map(star).join('')}</span>`;

// Sơ đồ có ô trống đặt đúng chỗ trên hình (cây cộng Bài 38, tam giác số Bài 41): hình vẽ là SVG
// inline co theo bề rộng, mỗi "..." là một ô đặt ở toạ độ (x, y) của hình.
const figure = (vbW, vbH, svgInner, slots, maxW = 700) => `<span style="position:relative;display:block;width:min(100%,${maxW}px);aspect-ratio:${vbW}/${vbH};margin:4px auto">`
  + `<svg viewBox="0 0 ${vbW} ${vbH}" style="position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${svgInner}</svg>`
  + slots.map(([x, y, inner]) => `<span style="position:absolute;left:${(x / vbW * 100).toFixed(2)}%;top:${(y / vbH * 100).toFixed(2)}%;transform:translate(-50%,-50%);display:flex;font-weight:700;font-size:1.15rem">${inner}</span>`).join('')
  + '</span>';
// Vòng tròn có viền răng cưa (bông hoa nhỏ của sách) chứa một số cho sẵn.
const ring = (x, y, r = 25) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="#7CC6E8" stroke-width="9" stroke-dasharray="3 3"/><circle cx="${x}" cy="${y}" r="${r - 6}" fill="#fff" stroke="${INK}" stroke-width="2"/>`;
const arrowLine = (x1, y1, x2, y2, r = 30) => {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L;
  const ax = x1 + ux * r, ay = y1 + uy * r, bx = x2 - ux * (r + 4), by = y2 - uy * (r + 4);
  const hx = bx - ux * 14, hy = by - uy * 14;
  return `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="#2F9FD8" stroke-width="4"/>`
    + `<polygon points="${bx.toFixed(1)},${by.toFixed(1)} ${(hx - uy * 8).toFixed(1)},${(hy + ux * 8).toFixed(1)} ${(hx + uy * 8).toFixed(1)},${(hy - ux * 8).toFixed(1)}" fill="#2F9FD8"/>`;
};

// Bài 38 Tiết 2 Q4: cây cộng — mỗi ô bằng tổng hai ô nối mũi tên vào nó.
const TREE = (() => {
  const B = [40, 155, 220, 335, 410, 525, 600, 715].map(x => [x, 225]);
  const L2 = [100, 280, 470, 655].map(x => [x, 160]);
  const L3 = [190, 565].map(x => [x, 95]);
  const T = [375, 38];
  let s = '';
  B.forEach((p, i) => { s += arrowLine(...p, ...L2[i >> 1]); });
  L2.forEach((p, i) => { s += arrowLine(...p, ...L3[i >> 1]); });
  L3.forEach((p) => { s += arrowLine(...p, ...T); });
  const given = [...B.map((p, i) => [...p, [1, 0, 3, 1, 1, 1, 2, 1][i]]), [...L2[0], 1], [...L2[3], 3]];
  given.forEach(([x, y]) => { s += ring(x, y); });
  given.forEach(([x, y, n]) => { s += `<text x="${x}" y="${y + 8}" text-anchor="middle" font-family="Quicksand, sans-serif" font-weight="700" font-size="24" fill="${INK}">${n}</text>`; });
  return figure(760, 260, s, [[...L2[1], '...'], [...L2[2], '...'], [...L3[0], '...'], [...L3[1], '...'], [...T, '...']]);
})();

// Bông hoa có số (đầu cột của bảng Bài 38 Tiết 2 Q5).
const flowerIc = (src, n) => `<img src="${src}" alt="bông hoa số ${n}" style="height:2.6rem;display:block;margin:0 auto">`;

// Bông hoa tô màu: "Số bông hoa màu đỏ: ... ; màu vàng: ..." — mọi cách tô đúng đều được.
const redMoreThanYellow = (v) => {
  const [r, y] = String(v).split(',').map(s => Number(s.trim()));
  return Number.isInteger(r) && Number.isInteger(y) && r + y === 5 && r > y && y >= 0;
};

// ── Bài 39 helpers ─────────────────────────────────────────────────────────
// Bó que tính trong ô đầu hàng của bảng "Chục / Đơn vị / Viết số / Đọc số".
const sticksPic = (src, t, u) => `<img src="${src}" alt="${t} bó que tính và ${u} que rời" style="height:4.4rem;max-width:13rem;display:block;margin:0 auto">`;
// Phép tính viết cột như sách: hai hàng chữ số thẳng cột, dấu bên trái, gạch ngang, kết quả.
// Mỗi phần tử là một chữ số; "..." là một ô trống bé viết một chữ số.
const DG = 'display:flex;align-items:center;justify-content:center;min-width:2.8rem;height:2.9rem';
const colD = (top, bot, op, res) => '<span style="display:inline-grid;grid-template-columns:auto auto auto;column-gap:4px;align-items:center;font-size:1.3rem;font-weight:700;margin:2px 10px 4px 2px;vertical-align:middle;line-height:1">'
  + `<span style="grid-row:1 / 3;padding-right:2px">${op}</span>`
  + [...top, ...bot].map(d => `<span style="${DG}">${d}</span>`).join('')
  + '<span style="grid-column:2 / 4;border-top:2px solid currentColor;margin:2px 0"></span><span></span>'
  + res.map(d => `<span style="${DG}">${d}</span>`).join('') + '</span>';
const digits = (n) => (n < 10 ? ['', String(n)] : String(n).split(''));
// "Đặt tính rồi tính": hai số đặt sẵn thẳng cột, bé viết từng chữ số của kết quả.
const dt = (a, op, b, prefix = '') => {
  const r = op === '+' ? a + b : a - b;
  const rd = digits(r);
  return {
    label: `${prefix}${a} ${op} ${b}<br>${colD(digits(a), digits(b), op, rd.map(d => (d ? '...' : '')))}`,
    answer: rd.filter(Boolean).join(','), boxes: true,
  };
};
const circNum = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:3rem;height:3rem;border:2px solid ${INK};border-radius:50%;background:#CFEFFF;font-weight:700;line-height:1">${n}</span>`;
// Mũi tên có ghi phép tính ở trên ("+ 10 ⟶").
const ar = (op) => `<span style="display:inline-flex;flex-direction:column;align-items:center;line-height:1;margin:0 4px;color:#1F8FC9;font-weight:700"><span style="font-size:.9em">${op}</span><span style="font-size:1.4em;color:${INK}">⟶</span></span>`;
const NAMES = ['Hồng', 'Xuân', 'Thắng', 'Lợi'];
const nameCell = (n) => blank(n, { tiles: NAMES, validate: phraseValidate(n) });
const namesInOrder = (...names) => (v) => {
  const got = String(v).split(',');
  return got.length === names.length && names.every((n, i) => phraseValidate(n)(got[i]));
};
const nums = (s) => (String(s).match(/\d+/g) || []).map(Number);
const numSetValidate = (expected) => {
  const t = [...expected].sort((a, b) => a - b).join('|');
  return (v) => nums(v).sort((a, b) => a - b).join('|') === t;
};
const CAR_LETTERS = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'K'];
const ROOMS = ['A. Phòng học', 'B. Phòng tập múa', 'C. Phòng thể dục'];

// ── Bài 40 helpers ─────────────────────────────────────────────────────────
const seqPic = (src, alt) => `<img src="${src}" alt="${alt}" style="display:block;width:100%;max-width:640px;height:auto;margin:4px 0">`;
const optPic = (letter, src, alt) => `${letter}. <img src="${src}" alt="${alt}" style="height:2.6rem;vertical-align:middle">`;
const STRIP_COLORS = ['Đỏ', 'Xanh', 'Vàng'];

// ── Bài 41 helpers ─────────────────────────────────────────────────────────
// "Viết phép tính thích hợp": 5 ô, mỗi ô một số hoặc một dấu (16 − 6 = 10); "-" gõ thay "−" cũng được.
const normEq = (v) => String(v).replace(/[,\s]/g, '').replace(/[-–—]/g, '−');
const eqBoxes = (eq) => ({ label: '... ... ... ... ...', boxes: true, answer: eq.split(' ').join(','), validate: (v) => normEq(v) === normEq(eq) });
// Tam giác số (Q7): mỗi cạnh ba số cộng lại bằng 9.
const TRI = (() => {
  const T = [150, 34], L = [95, 132], R = [205, 132], B = [[40, 232], [150, 232], [260, 232]];
  let s = `<path d="M${T} L${B[0]} L${B[2]} Z" fill="none" stroke="#2F9FD8" stroke-width="4" stroke-linejoin="round"/>`;
  [[T, 2], [L, 4], [R, 6]].forEach(([[x, y], n]) => {
    s += `<circle cx="${x}" cy="${y}" r="24" fill="#CFEFFF" stroke="${INK}" stroke-width="2.5"/><text x="${x}" y="${y + 8}" text-anchor="middle" font-family="Quicksand, sans-serif" font-weight="700" font-size="24" fill="${INK}">${n}</text>`;
  });
  B.forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="26" fill="#fff" stroke="${INK}" stroke-width="2.5"/>`; });
  return figure(300, 266, s, B.map(([x, y]) => [x, y, '...']), 360);
})();

export const BAI_38_41 = [
  // ── BÀI 38 (trang 89–94) ─────────────────────────────────────────────────
  {
    id: 'bai-38', number: 38, title: 'Ôn tập các số và phép tính trong phạm vi 10',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết các số 8, 4, 7, 1 vào ô trống cho thích hợp.',
        blanks: [
          { label: `a) Theo thứ tự từ bé đến lớn:<br>${stars(['...', 3, '...', 6, '...', '...', 10])}`, answer: '1,4,7,8', boxes: true, tiles: ['8', '4', '7', '1'] },
          { label: `b) Theo thứ tự từ lớn đến bé:<br>${stars([10, '...', '...', 5, '...', 2, '...'])}`, answer: '8,7,4,1', boxes: true, tiles: ['8', '4', '7', '1'] },
        ],
        hints: ['a) Đếm từ bé đến lớn: 1, 2, 3, ... Số 1 đứng trước số 3.', 'b) Đếm lùi: 10, 9, 8, 7, ...'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB38Flowers,
        q: '2. Em hãy tô màu đỏ hoặc màu vàng vào cả 5 bông hoa, mỗi bông một màu, sao cho số bông hoa màu đỏ nhiều hơn số bông hoa màu vàng.\nTô xong, viết số bông hoa mỗi màu em đã tô.',
        blanks: [{ label: 'Màu đỏ: ... bông. Màu vàng: ... bông.', answer: '3,2', boxes: true, validate: redMoreThanYellow }],
        hints: ['Hai số cộng lại phải bằng 5, số bông màu đỏ lớn hơn. Ví dụ: 3 bông đỏ, 2 bông vàng.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB38Birds,
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nLúc đầu cành trên có 7 con chim, cành dưới có 5 con chim. Sau đó có 1 con chim bay từ cành trên xuống cành dưới. Khi đó:',
        options: ['A. Số chim ở cành trên nhiều hơn.', 'B. Số chim ở cành dưới nhiều hơn.', 'C. Số chim ở hai cành bằng nhau.'],
        answer: 2,
        hints: ['Cành trên bớt 1 con: 7 − 1 = 6. Cành dưới thêm 1 con: 5 + 1 = 6.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB38Rabbits,
        q: '4. Có 6 chú thỏ chạy hết vào cả ba chuồng A, B, C. Biết rằng số thỏ ở các chuồng là khác nhau. Chuồng C có nhiều thỏ nhất, chuồng A có ít thỏ nhất. Hỏi mỗi chuồng có mấy chú thỏ?',
        blanks: [
          { label: 'Chuồng A có ... chú thỏ.', answer: '1', boxes: true },
          { label: 'Chuồng B có ... chú thỏ.', answer: '2', boxes: true },
          { label: 'Chuồng C có ... chú thỏ.', answer: '3', boxes: true },
        ],
        hints: ['Ba số khác nhau, cộng lại bằng 6: 1 + 2 + 3 = 6.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB38Hex,
        q: '1. Tô màu vàng vào ô ghi phép tính có kết quả bằng 8, màu đỏ vào ô ghi phép tính có kết quả bé hơn 8, màu xanh vào ô ghi phép tính có kết quả lớn hơn 8.\nChọn màu cho từng ô.',
        rows: [
          ['4 + 6', 10], ['10 − 1', 9], ['5 + 4', 9], ['6 + 2', 8], ['9 − 1', 8], ['6 + 1', 7],
          ['7 + 3', 10], ['8 + 2', 10], ['4 + 4', 8], ['3 + 5', 8], ['10 − 2', 8],
        ].map(([e, r]) => ({ left: e, options: ['Vàng', 'Đỏ', 'Xanh'], answer: r === 8 ? 'Vàng' : r < 8 ? 'Đỏ' : 'Xanh' })),
        hints: ['Tính kết quả từng ô rồi so sánh với 8. Ví dụ: 4 + 6 = 10, 10 > 8 nên tô màu xanh.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgB38Turtles,
        q: '2. Mỗi bạn rùa sẽ chạy vào ngôi nhà có số là kết quả phép tính ghi trên bạn rùa đó. Hỏi nhà nào sẽ chỉ có một bạn rùa chạy vào?\nKhoanh vào chữ đặt trước câu trả lời đúng.',
        options: ['A. Nhà số 5', 'B. Nhà số 4', 'C. Nhà số 10'],
        answer: 0,
        hints: ['7 + 3 = 10, 2 + 2 = 4, 3 + 7 = 10, 9 − 5 = 4, 9 − 4 = 5.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. a) Viết dấu >; <; = thích hợp vào ô trống.\nb) Viết số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 5 + 2 ... 6', answer: '>', boxes: true, tiles: signTiles },
          { label: '5 − 2 ... 5', answer: '<', boxes: true, tiles: signTiles },
          { label: '4 + 1 ... 10 − 5', answer: '=', boxes: true, tiles: signTiles },
          { label: 'b) 6 < ... < 8', answer: '7', boxes: true },
          { label: '3 + 4 < ... < 3 + 6', answer: '8', boxes: true },
        ],
        hints: ['Tính kết quả phép tính trước rồi mới so sánh.', '3 + 4 = 7, 3 + 6 = 9. Số nào lớn hơn 7 và bé hơn 9?'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào ô trống.',
        blanks: [{ label: TREE, answer: '4,2,5,5,10', boxes: true }],
        hints: ['Mỗi ô bằng tổng hai số có mũi tên chỉ vào ô đó. Ví dụ: 1 + 0 = 1.'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB38Bees,
        q: '5. Chú ong sẽ đậu vào bông hoa có ghi số là kết quả phép tính trên chú ong đó.\nViết số thích hợp vào ô trống.',
        headers: ['Bông hoa', flowerIc(icFl2, 2), flowerIc(icFl4, 4), flowerIc(icFl5, 5), flowerIc(icFl7, 7), flowerIc(icFl8, 8)],
        colWidths: ['30%', '14%', '14%', '14%', '14%', '14%'],
        rows: [['Số ong đậu', sampleCell(3), blank(2), blank(1), blank(2), blank(2)]],
        blanks: [
          { label: 'b) Bông hoa số ... có nhiều ong đậu nhất.', answer: '2', boxes: true },
          { label: 'Bông hoa số ... có ít ong đậu nhất.', answer: '5', boxes: true },
        ],
        hints: ['Tính phép tính trên từng chú ong. Bông hoa số 2 có 3 chú ong: 6 − 4, 1 + 1, 10 − 8.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB38Sticks1,
        q: '1. Bạn Việt xếp các que tính thành một kết quả so sánh sai (như hình vẽ).\nEm hãy chuyển chỗ chỉ 1 que tính ở một số để có kết quả so sánh đúng (vẫn giữ nguyên dấu >) rồi viết số thích hợp vào ô trống.',
        blanks: [{ label: 'So sánh đúng là: ... > ...', answer: '6,5', boxes: true, validate: oneOf(['6', '5'], ['9', '5']) }],
        hints: ['0 bé hơn 5. Chuyển 1 que của số 0 vào giữa thì được số nào?'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB38Sticks2,
        q: '2. Bạn Nam xếp các que tính thành phép tính sai (như hình vẽ).\nEm hãy bỏ bớt 1 que tính ở một số để được phép tính đúng (vẫn giữ nguyên dấu −) rồi viết số thích hợp vào ô trống.',
        blanks: [{ label: 'Phép tính đúng là: ... − ... = ...', answer: '9,3,6', boxes: true, validate: oneOf(['9', '3', '6'], ['8', '3', '5']) }],
        hints: ['Bỏ 1 que ở số 8 thì được số 9, số 6 hoặc số 0. Thử xem số nào đúng.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB38Sticks3,
        q: '3. Bạn Mai xếp các que tính thành phép tính sai (như hình vẽ).\nEm hãy chuyển chỗ chỉ 1 que tính ở một số để được phép tính đúng (vẫn giữ nguyên dấu +) rồi viết số thích hợp vào ô trống.',
        blanks: [{ label: 'Phép tính đúng là: ... + ... = ...', answer: '0,5,5', boxes: true }],
        hints: ['Số nào cộng với 5 vẫn bằng 5? Chuyển 1 que của số 9 để được số đó.'],
      },
      {
        type: 'choice', section: 'Tiết 3', img: imgB38Gates,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nThỏ lấy được cà rốt nếu đi qua hai cửa có hai số cộng với nhau được 10 hoặc trừ cho nhau được 3. Hỏi có mấy cách để thỏ lấy được cà rốt?',
        options: ['A. 3 cách', 'B. 4 cách', 'C. 6 cách'],
        answer: 1,
        hints: ['Thử từng cặp: một cửa ở bức tường thứ nhất (3 hoặc 4) với một cửa ở bức tường thứ hai (6, 5 hoặc 7).'],
      },
    ],
  },

  // ── BÀI 39 (trang 95–100) ────────────────────────────────────────────────
  {
    id: 'bai-39', number: 39, title: 'Ôn tập các số và phép tính trong phạm vi 100',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết vào ô trống (theo mẫu).',
        tables: [
          {
            label: 'a)',
            headers: ['', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
            rows: [
              { sample: true, cells: [sticksPic(imgN54, 5, 4), 5, 4, 54, 'năm mươi tư'] },
              [sticksPic(imgN45, 4, 5), 4, blank(5), blank(45), blank('bốn mươi lăm')],
              [sticksPic(imgN71, 7, 1), blank(7), blank(1), blank(71), blank('bảy mươi mốt')],
              [sticksPic(imgN80, 8, 0), blank(8), 0, blank(80), blank('tám mươi')],
            ],
          },
          {
            label: 'b)',
            headers: ['Số gồm', 'Viết số', 'Đọc số'],
            rows: [
              { sample: true, cells: ['5 chục và 6 đơn vị', 56, 'năm mươi sáu'] },
              ['3 chục và 5 đơn vị', blank(35), blank('ba mươi lăm')],
              ['8 chục và 1 đơn vị', blank(81), blank('tám mươi mốt')],
              ['6 chục và 4 đơn vị', blank(64), blank('sáu mươi tư')],
            ],
          },
        ],
        hints: ['Mỗi bó là 1 chục que tính, que rời là đơn vị. 4 bó và 5 que rời là 45.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB39Snowmen,
        q: `2. Viết số thích hợp vào ô trống (theo mẫu).\n${mau('46 = 40 + 6')}`,
        blanks: [
          { label: '75 = ... + ...', answer: '70,5', boxes: true },
          { label: '... = ... + ...', answer: '54,50,4', boxes: true },
          { label: '... = ... + ...', answer: '33,30,3', boxes: true },
        ],
        hints: ['Số trên thân người tuyết bằng số chục cộng số đơn vị trên hai quả bóng: 75 = 70 + 5.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '3. Các bạn Hồng, Xuân, Thắng, Lợi lần lượt cao là: 89 cm, 91 cm, 97 cm, 96 cm.\na) Viết vào ô trống tương ứng theo thứ tự các bạn từ thấp đến cao.\nb) Viết tên bạn thích hợp vào chỗ chấm.',
        rows: [
          ['Tên', ...['Hồng', 'Xuân', 'Lợi', 'Thắng'].map(nameCell)],
          ['Cao', blank(89), blank(91), blank(96), blank(97)],
        ],
        blanks: [
          { label: 'Bạn ... cao nhất. Bạn ... thấp nhất.', answer: 'Thắng,Hồng', tiles: NAMES, validate: namesInOrder('Thắng', 'Hồng') },
          { label: 'Bạn thấp hơn Lợi và cao hơn Hồng là ...', answer: 'Xuân', tiles: NAMES, tileOne: true, validate: phraseValidate('Xuân') },
        ],
        hints: ['Xếp các số đo từ bé đến lớn: 89, 91, 96, 97. Ai cao 89 cm?'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB39Cards,
        q: '4. Bạn Việt ghép hai trong ba tấm thẻ (hình vẽ) để được các số có hai chữ số.\nViết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Bạn Việt ghép được các số là: ...', answer: '40, 49, 90, 94', validate: numSetValidate([40, 49, 90, 94]) },
          { label: 'b) Trong các số ghép được, số lớn nhất là ...; số bé nhất là ...', answer: '94,40' },
        ],
        hints: ['Thẻ 0 không đứng đầu được. Bắt đầu bằng thẻ 4: 40, 49. Bắt đầu bằng thẻ 9 thì sao?'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. a) Viết số thích hợp vào ô trống.\nb) Đặt tính rồi tính.',
        blanks: [
          { label: 'a) 40 + 30 = ...', answer: '70', boxes: true },
          { label: '60 + 10 = ...', answer: '70', boxes: true },
          { label: '30 + 50 = ...', answer: '80', boxes: true },
          dt(41, '+', 46, 'b) '), dt(57, '+', 22), dt(86, '+', 13), dt(15, '+', 72),
        ],
        hints: ['Cộng các số tròn chục: 4 chục + 3 chục = 7 chục.', 'Đặt tính: cộng hàng đơn vị trước, rồi cộng hàng chục.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối hai phép tính có cùng kết quả.',
        left: [['c1', '46 + 23'], ['c2', '42 + 6'], ['c3', '62 + 17'], ['c4', '50 + 30'], ['c5', '29 + 20']].map(([id, text]) => ({ id, text, img: icCat })),
        right: [['f1', '33 + 15'], ['f2', '40 + 9'], ['f3', '60 + 9'], ['f4', '33 + 46'], ['f5', '20 + 60']].map(([id, text]) => ({ id, text, img: icFish })),
        pairs: [['c1', 'f3'], ['c2', 'f1'], ['c3', 'f4'], ['c4', 'f5'], ['c5', 'f2']],
        hints: ['Tính kết quả từng phép tính: 46 + 23 = 69, 60 + 9 = 69.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. a) Đặt tính rồi tính.\nb) Viết số thích hợp vào ô trống.',
        blanks: [
          dt(69, '−', 35, 'a) '), dt(77, '−', 42), dt(85, '−', 41), dt(96, '−', 72),
          { label: 'b) 90 − 30 = ...', answer: '60', boxes: true },
          { label: '70 − 30 = ...', answer: '40', boxes: true },
          { label: '50 − 10 = ...', answer: '40', boxes: true },
        ],
        hints: ['Trừ hàng đơn vị trước, rồi trừ hàng chục.'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB39Train,
        q: '4. Viết vào ô trống cho thích hợp.\na) Kết quả phép tính ở mỗi toa là:',
        headers: ['Toa', 'A', 'B', 'C', 'D', 'E', 'G', 'H', 'K'],
        colWidths: ['20%', '10%', '10%', '10%', '10%', '10%', '10%', '10%', '10%'],
        rows: [['Kết quả', sampleCell(50), blank(60), blank(50), blank(20), blank(50), blank(40), blank(70), blank(50)]],
        blanks: [{ label: 'b) Các toa có kết quả bằng nhau là: toa ..., toa ..., toa ..., toa ....', answer: 'A,C,E,K', boxes: true, tiles: CAR_LETTERS, validate: setValidate(['A', 'C', 'E', 'K']) }],
        hints: ['Toa A: 66 − 16 = 50. Tìm các toa khác cũng có kết quả 50.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. a) Viết chữ số thích hợp vào ô trống.\nb) Viết số thích hợp vào ô trống.',
        blanks: [
          { label: `a) ${colD(['5', '...'], ['2', '7'], '+', ['...', '8'])}`, answer: '1,7', boxes: true },
          { label: colD(['6', '...'], ['3', '2'], '−', ['...', '5']), answer: '7,3', boxes: true },
          { label: colD(['...', '...'], ['3', '5'], '+', ['6', '9']), answer: '3,4', boxes: true },
          { label: colD(['8', '7'], ['...', '...'], '−', ['4', '4']), answer: '4,3', boxes: true },
          { label: '5... < 30 + 21', answer: '0', boxes: true },
          { label: '65 < 6... < 60 + 7', answer: '6', boxes: true },
          { label: `b) ${circNum(70)}${ar('+ 10')}...${ar('− 20')}...${ar('+ 30')}...`, answer: '80,60,90', boxes: true },
        ],
        hints: ['Ở hàng đơn vị: mấy cộng 7 được 8? Ở hàng chục: 5 + 2 = ?', '30 + 21 = 51. Số 5 chục mấy bé hơn 51?'],
      },
      {
        type: 'table', section: 'Tiết 3', img: imgB39Flowers,
        q: '2. a) Tô màu đỏ vào bông hoa ghi phép tính có kết quả bằng 27, màu vàng vào bông hoa ghi phép tính có kết quả bằng 28, màu xanh vào bông hoa ghi phép tính có kết quả bằng 29.\nb) Viết số thích hợp vào ô trống.',
        headers: ['Màu', 'Đỏ', 'Vàng', 'Xanh'],
        colWidths: ['34%', '22%', '22%', '22%'],
        rows: [['Số bông hoa', blank(3), blank(2), blank(1)]],
        hints: ['Tính kết quả trên từng bông hoa. Ví dụ: 67 − 40 = 27, bông này tô màu đỏ.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB39Garden,
        q: '3. Viết số thích hợp vào ô trống.\nLớp 1A được nhà trường giao chăm sóc 35 chậu hoa. Lớp 1B được nhà trường giao chăm sóc 42 chậu hoa. Hỏi hai lớp được nhà trường giao chăm sóc tất cả bao nhiêu chậu hoa?',
        blanks: [
          { label: '... + ... = ...', answer: '35,42,77', boxes: true, validate: swapPairValidate(35, 42, 77) },
          { label: 'Hai lớp chăm sóc tất cả ... chậu hoa.', answer: '77', boxes: true },
        ],
        hints: ['Muốn biết tất cả bao nhiêu chậu hoa, em làm phép cộng: 35 + 42.'],
      },
      {
        type: 'compare', section: 'Tiết 3',
        q: '4. Khi đo độ dài bằng bước chân, bạn Việt đo được độ dài phòng học là 24 bước chân, độ dài phòng tập múa là 46 bước chân, độ dài phòng thể dục là 90 bước chân.\nKhoanh vào chữ đặt trước câu trả lời đúng:',
        rows: [
          { left: 'a) Phòng dài nhất là:', options: ROOMS, answer: 'C' },
          { left: 'b) Phòng ngắn nhất là:', options: ROOMS, answer: 'A' },
        ],
        hints: ['So sánh ba số 24, 46, 90. Phòng có nhiều bước chân nhất là phòng dài nhất.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgB39Sticks,
        tapCount: { svg: svgB39Sticks, groups: { a: 'que ở hình A', b: 'que ở hình B' } },
        q: '5. Viết số thích hợp vào ô trống.\nCả hai hình sau đây được xếp bởi bao nhiêu que tính?',
        blanks: [
          { label: '... + ... = ...', answer: '13,16,29', boxes: true, validate: swapPairValidate(13, 16, 29) },
          { label: 'Cả hai hình A và B có ... que tính.', answer: '29', boxes: true },
        ],
        hints: ['Chạm vào từng que để đếm. Đếm số que của hình A, rồi số que của hình B.'],
      },
    ],
  },

  // ── BÀI 40 (trang 101–104) ───────────────────────────────────────────────
  {
    id: 'bai-40', number: 40, title: 'Ôn tập hình học và đo lường',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgB40Solids,
        q: '1. a) Tô màu đỏ vào khối lập phương.\nb) Tô màu xanh vào khối hộp chữ nhật.\nTô xong, viết số của các hình em đã tô.',
        blanks: [
          { label: 'a) Khối lập phương: hình ... và hình ...', answer: '2,4', boxes: true, validate: swapPairValidate(2, 4) },
          { label: 'b) Khối hộp chữ nhật: hình ... và hình ...', answer: '1,4', boxes: true, validate: swapPairValidate(1, 4) },
        ],
        hints: ['Khối lập phương có các mặt đều là hình vuông bằng nhau, kể cả khi nó nằm nghiêng.', 'Khối hộp chữ nhật có các mặt là hình chữ nhật. Khối có mặt nhọn và khối trụ không phải.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB40Shapes,
        tapCount: { svg: svgB40Shapes, groups: { t: 'hình tam giác', r: 'hình chữ nhật', v: 'hình vuông', c: 'hình tròn' } },
        q: '2. Viết số thích hợp vào ô trống.\nTrong hình trên có:',
        blanks: [
          { label: '... hình tam giác.', answer: '6', boxes: true },
          { label: '... hình chữ nhật.', answer: '3', boxes: true },
          { label: '... hình vuông.', answer: '3', boxes: true },
          { label: '... hình tròn.', answer: '4', boxes: true },
        ],
        hints: ['Chạm vào từng hình để đếm. Hình vuông nằm nghiêng vẫn là hình vuông.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB40Sticks,
        q: '3. Hình bên được xếp bởi 12 que tính.\na) Viết số thích hợp vào chỗ chấm.\nb) Gạch bớt 2 que tính để hình còn lại có 3 hình vuông (em làm vào vở).',
        blanks: [{ label: 'a) Trong hình bên có ... hình vuông.', answer: '5' }],
        hints: ['Có 4 hình vuông nhỏ và 1 hình vuông to gồm cả 4 hình nhỏ.', 'b) Bỏ 2 que ở góc ngoài của một hình vuông nhỏ: còn 3 hình vuông nhỏ.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: `4. Khoanh vào chữ đặt trước câu trả lời đúng.
a) ${seqPic(imgSeqA, 'vuông, tròn, chữ nhật, tam giác lặp lại; dấu ? ở giữa hình tròn và hình tam giác')}b) ${seqPic(imgSeqB, 'khối to, khối cao, khối nhỏ, khối dẹt lặp lại; dấu ? ở cuối')}`,
        rows: [
          {
            left: 'a) Hình thích hợp đặt vào dấu “?” là:',
            options: [optPic('A', icASq, 'hình vuông'), optPic('B', icACi, 'hình tròn'), optPic('C', icARe, 'hình chữ nhật'), optPic('D', icATr, 'hình tam giác')],
            answer: 'C',
          },
          {
            left: 'b) Hình thích hợp đặt vào dấu “?” là:',
            options: [optPic('A', icBBig, 'khối lập phương to'), optPic('B', icBTall, 'khối hộp cao'), optPic('C', icBSmall, 'khối lập phương nhỏ'), optPic('D', icBFlat, 'khối hộp dẹt')],
            answer: 'D',
          },
        ],
        hints: ['Tìm nhóm hình lặp lại: vuông, tròn, chữ nhật, tam giác, rồi lại vuông, tròn, ...'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB40Tri,
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố hình tam giác có trong hình bên là:',
        options: ['A. 1', 'B. 2', 'C. 3'],
        answer: 2,
        hints: ['Có 2 hình tam giác nhỏ, và cả hình to cũng là một hình tam giác.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '1. Nối mỗi bức tranh với đồng hồ thích hợp (theo mẫu).', bigImg: true,
        left: [
          { id: 's8', img: imgPark, text: 'Mai cùng bố mẹ tới công viên lúc 8 giờ sáng.' },
          { id: 's9', img: imgZoo, text: 'Mai cùng bố mẹ tới vườn thú lúc 9 giờ sáng.' },
          { id: 's10', img: imgBoat, text: 'Mai cùng bố mẹ bơi thuyền lúc 10 giờ sáng.' },
          { id: 's11', img: imgHome, text: 'Mai cùng bố mẹ về nhà lúc 11 giờ trưa.' },
          { id: 's3', img: imgPiano, text: 'Mai tập đàn lúc 3 giờ chiều.' },
          { id: 's5', img: imgWater, text: 'Mai tưới cây lúc 5 giờ chiều.' },
        ],
        right: [[10, icClock10], [9, icClock9], [8, icClock8], [5, icClock5], [11, icClock11], [3, icClock3]]
          .map(([h, img]) => ({ id: `k${h}`, img })),
        pairs: [['s8', 'k8'], ['s9', 'k9'], ['s10', 'k10'], ['s11', 'k11'], ['s3', 'k3'], ['s5', 'k5']],
        matchSample: ['s8', 'k8'],
        hints: ['Kim dài chỉ số 12, kim ngắn chỉ số mấy thì là mấy giờ. 3 giờ chiều: kim ngắn chỉ số 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đúng ghi Đ, sai ghi S.',
        blanks: [
          { label: 'a) Nếu ngày 27 tháng 4 là thứ Hai thì ngày 30 tháng 4 là:<br>• Thứ Năm ...', answer: 'Đ', validate: dsValidate(true) },
          { label: '• Thứ Sáu ...', answer: 'S', validate: dsValidate(false) },
          { label: 'b) Buổi sáng Chủ nhật, Nam tập đàn từ 8 giờ đến 10 giờ. Vậy thời gian Nam tập đàn là:<br>• 10 giờ ...', answer: 'S', validate: dsValidate(false) },
          { label: '• 2 giờ ...', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Đếm tiếp từ thứ Hai ngày 27: ngày 28 là thứ Ba, ngày 29 là thứ Tư, ...', 'Từ 8 giờ đến 10 giờ: 8 giờ, 9 giờ, 10 giờ, là mấy giờ đồng hồ?'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB40Measure,
        // 📏 Thước: toạ độ theo bai40_t2_q3_measure.svg; 1 cm = 40 (thìa 6 cm, kéo 10 cm, tuýp 13 cm như sách).
        rulerPlay: {
          points: { _a: [30, 70], _b: [270, 70], _c: [330, 80], _d: [730, 80], _e: [150, 260], _f: [670, 260] },
          segs: [['_a', '_b'], ['_c', '_d'], ['_e', '_f']], unit: 'cm', per: 40,
          fill: [{ blank: 0, len: [['_a', '_b']] }, { blank: 1, len: [['_c', '_d']] }, { blank: 2, len: [['_e', '_f']] }],
        },
        q: '3. Đo độ dài mỗi đồ vật rồi viết số thích hợp vào ô trống.',
        blanks: [
          { label: 'Cái thìa: ... cm', answer: '6', boxes: true },
          { label: 'Cái kéo: ... cm', answer: '10', boxes: true },
          { label: 'Tuýp kem đánh răng: ... cm', answer: '13', boxes: true },
        ],
        hints: ['Đặt vạch 0 của thước trùng với một vạch chấm, đọc số ở vạch chấm bên kia.'],
      },
      {
        type: 'compare', section: 'Tiết 2', img: imgB40Strips,
        q: '4. Tô màu đỏ vào băng giấy dài nhất, màu xanh vào băng giấy ngắn nhất, màu vàng vào hai băng giấy dài bằng nhau.\nChọn màu cho từng băng giấy.',
        rows: [
          { left: 'Băng giấy A', options: STRIP_COLORS, answer: 'Vàng' },
          { left: 'Băng giấy B', options: STRIP_COLORS, answer: 'Đỏ' },
          { left: 'Băng giấy C', options: STRIP_COLORS, answer: 'Vàng' },
          { left: 'Băng giấy D', options: STRIP_COLORS, answer: 'Xanh' },
        ],
        hints: ['Đếm số ô vuông dọc theo mỗi băng giấy: A dài 6 ô.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '5. Khoanh vào chữ đặt trước câu trả lời thích hợp.',
        rows: [
          { left: 'a) Bàn chân của em dài khoảng:', options: ['A. 1 cm', 'B. 15 cm', 'C. 20 cm'], answer: 'B' },
          { left: 'b) Bàn giáo viên của lớp em cao khoảng:', options: ['A. 8 gang tay', 'B. 8 cm', 'C. 20 bước chân'], answer: 'A' },
        ],
        hints: ['1 cm chỉ bằng bề ngang một ngón tay. Thử đo bàn chân em bằng thước.'],
      },
    ],
  },
  // ── BÀI 41 (trang 105–107) ───────────────────────────────────────────────
  {
    id: 'bai-41', number: 41, title: 'Ôn tập chung',
    questions: [
      {
        type: 'match',
        q: '1. a) Nối (theo mẫu).',
        left: [
          { id: 'w45', text: 'Bốn mươi lăm', row: 1 }, { id: 'w66', text: 'Sáu mươi sáu', row: 2 },
          { id: 'w84', text: 'Tám mươi tư', row: 3 }, { id: 'w91', text: 'Chín mươi mốt', row: 4 },
        ],
        middle: [{ id: 'n66', text: '66' }, { id: 'n45', text: '45' }, { id: 'n91', text: '91' }, { id: 'n84', text: '84' }],
        right: [{ id: 'e66', text: '60 + 6' }, { id: 'e91', text: '90 + 1' }, { id: 'e45', text: '40 + 5' }, { id: 'e84', text: '80 + 4' }],
        pairs: [['w45', 'n45'], ['w66', 'n66'], ['w84', 'n84'], ['w91', 'n91'], ['n45', 'e45'], ['n66', 'e66'], ['n84', 'e84'], ['n91', 'e91']],
        matchSample: [['w45', 'n45'], ['n45', 'e45']],
        hints: ['Sáu mươi sáu viết là 66, 66 gồm 6 chục và 6 đơn vị: 60 + 6.'],
      },
      {
        type: 'fill', img: imgB41Road,
        q: '1. b) Viết các số 52, 74, 57, 80 theo thứ tự từ lớn đến bé vào cột mốc.',
        blanks: [{ label: 'Các cột mốc (từ trái sang phải): ... ... ... ...', answer: '80,74,57,52', boxes: true, tiles: ['52', '74', '57', '80'] }],
        hints: ['So sánh hàng chục trước: 8 chục lớn nhất. 52 và 57 cùng 5 chục, so sánh hàng đơn vị.'],
      },
      {
        type: 'fill',
        q: '2. Đặt tính rồi tính.',
        blanks: [dt(35, '+', 4), dt(52, '+', 16), dt(17, '−', 6), dt(88, '−', 75)],
        hints: ['Viết các chữ số cùng hàng thẳng cột: 4 thẳng cột với 5 (hàng đơn vị).'],
      },
      {
        type: 'fill', img: imgB41Clocks,
        // 📏 Thước: toạ độ theo bai41_q3_clocks_pencil.svg; 1 cm = 40 (bút chì 11 cm như sách).
        rulerPlay: {
          points: { _a: [160, 345], _b: [600, 345] }, segs: [['_a', '_b']], unit: 'cm', per: 40,
          fill: [{ blank: 2, len: [['_a', '_b']] }],
        },
        q: '3. a) Vẽ thêm kim ngắn để đồng hồ chỉ giờ đúng.\nb) Đo độ dài rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Đồng hồ chỉ 4 giờ: kim ngắn chỉ vào số ...', answer: '4', boxes: true },
          { label: 'Đồng hồ chỉ 9 giờ: kim ngắn chỉ vào số ...', answer: '9', boxes: true },
          { label: 'b) Bút chì dài ... cm.', answer: '11' },
        ],
        hints: ['Giờ đúng: kim dài chỉ số 12, kim ngắn chỉ vào số giờ.', 'Đặt vạch 0 của thước ở vạch chấm bên trái bút chì.'],
      },
      {
        type: 'fill', img: imgB41Marbles,
        q: '4. a) Viết phép tính thích hợp.\nViệt có 16 viên bi, Việt cho Nam 6 viên bi. Hỏi Việt còn lại bao nhiêu viên bi?\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { ...eqBoxes('16 − 6 = 10'), label: 'a) ... ... ... ... ...' },
          { label: 'b) Việt còn lại ... viên bi.', answer: '10' },
        ],
        hints: ['Cho bạn bớt đi thì làm phép trừ. Mỗi ô viết một số hoặc một dấu.'],
      },
      {
        type: 'fill',
        q: '5. Đúng ghi Đ, sai ghi S.\nMột lớp có 20 học sinh nữ và 18 học sinh nam đi tham quan. Hỏi một ô tô loại 40 chỗ ngồi có chở hết học sinh lớp đó không?',
        blanks: [
          { label: 'a) Có chở hết. ...', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Không chở hết. ...', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Cả lớp có 20 + 18 = 38 học sinh. So sánh 38 với 40.'],
      },
      {
        type: 'compare', img: imgB41Tri,
        q: '6. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Nếu ngày 19 tháng 5 là thứ Tư thì ngày 22 tháng 5 là:', options: ['A. Thứ Sáu', 'B. Thứ Bảy', 'C. Chủ nhật'], answer: 'B' },
          { left: 'b) Hình bên có:', options: ['A. 3 hình tam giác', 'B. 4 hình tam giác', 'C. 6 hình tam giác'], answer: 'C' },
        ],
        hints: ['Ngày 20 là thứ Năm, ngày 21 là thứ Sáu, ...', 'Đếm 3 hình nhỏ, rồi các hình ghép từ 2 hình nhỏ, rồi cả hình to.'],
      },
      {
        type: 'fill',
        q: '7. Viết mỗi số 1, 3, 5 vào một ô trống sao cho khi cộng ba số theo từng hàng đều có kết quả bằng 9.',
        blanks: [{ label: TRI, answer: '3,5,1', boxes: true, tiles: ['1', '3', '5'] }],
        hints: ['Cạnh bên trái: 2 + 4 + ... = 9. Cạnh bên phải: 2 + 6 + ... = 9.'],
      },
    ],
  },
];
