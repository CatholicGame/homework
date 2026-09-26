/**
 * 99 đề toán — Chủ đề 2: Số trong phạm vi 100 (trang 32–41).
 * Hình: scripts/pre4/so100.json. Đáp án đối chiếu trang 78 của sách.
 */
import { img, zones } from './assets.js';
import { numberWord as w } from '../numbers.js';

const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
/** Ô bị ẩn trong dãy bắt đầu từ `from`: danh sách giá trị → danh sách chỉ số. */
const hideValues = (from, values) => values.map(v => v - from);

// Trang 34: thứ tự ô chạm trong zones('p34_tranh'), đọc từ trên xuống.
// 46 39 68 38 65 40 41 47 66 89 36 63 52 45 72 44 33 64 61 49 92 34 69 67 48 36
const P34 = [46, 39, 68, 38, 65, 40, 41, 47, 66, 89, 36, 63, 52, 45, 72, 44, 33, 64, 61, 49, 92, 34, 69, 67, 48, 36];
const inRange = (lo, hi) => P34.map((v, k) => (v > lo && v < hi ? k : -1)).filter(k => k >= 0);
const COLOR_RULES = [
  [50, 60, 'màu vàng'], [60, 70, 'màu nâu'], [70, 80, 'màu hồng'], [80, 90, 'màu xanh lá'], [90, 100, 'màu xám'],
];

// Trang 41: phép tính trên các cây nấm → giỏ 40 / 60 / 80.
const BASKETS = [40, 60, 80];
const calc = (text) => { const [a, op, b] = text.split(' '); return op === '+' ? +a + +b : a - b; };
const MUSHROOMS = [
  ['10 + 50', '90 - 10', '40 + 40', '70 - 30', '60 - 20', '60 + 20'],
  ['10 + 30', '70 - 10', '50 - 10', '30 + 30', '30 + 50', '80 - 40'],
];
const mushroomRound = (list, k) => ({
  type: 'link', layout: 'mid',
  from: list.map(text => ({ img: img('p41_nam'), text })),
  to: BASKETS.map(n => ({ img: img(`p41_gio${n}`), say: `giỏ số ${w(n)}` })),
  pairs: list.map((text, i) => [i, BASKETS.indexOf(calc(text))]),
  say: k === 0
    ? 'Mỗi cây nấm có một phép tính. Bé tính rồi nối cây nấm vào giỏ có số đúng nhé!'
    : 'Thêm sáu cây nấm nữa! Bé tính rồi nối vào đúng giỏ nhé!',
  hint: 'Chưa đúng giỏ rồi. Bé tính lại phép tính trên cây nấm nhé!',
});

// Trang 36: bàn tính (hạt hàng chục, hạt hàng đơn vị).
const ABACUS = [[6, 9], [7, 3], [8, 5]];

export const STATIONS = [
  {
    id: 's100-duong-ve', icon: '🐭', color: '#EC4899', title: 'Đường về nhà', name: 'Đi theo thứ tự các số để về nhà',
    rounds: [
      // Trang 32: mê cung của Chuột, các số 51 → 80.
      {
        type: 'seq', img: img('p32_chuot'), cells: range(51, 80), cols: 10,
        hide: hideValues(51, [53, 56, 61, 65, 68, 70, 74, 78, 80]),
        say: 'Chuột con đi theo thứ tự các số để về hang. Bé điền những số còn thiếu giúp Chuột nhé!',
        done: 'Giỏi quá! Chuột con đã về tới hang rồi!',
      },
      // Trang 33: Vịt con đi từ 80 đến 90 (hai ô trống bên phải là chỗ vịt mẹ đứng trong sách).
      {
        type: 'path', from: 80, to: 90,
        grid: [
          [80, 81, 80, 83, 85, 88],
          [85, 82, 83, 84, 87, null],
          [82, 84, 86, 85, 84, null],
          [86, 85, 87, 88, 89, 90],
        ],
        say: 'Vịt con đi theo thứ tự từ tám mươi đến chín mươi để về với mẹ. Bé chạm từng số, đi ngang hoặc dọc, không đi chéo nhé!',
        done: 'Giỏi quá! Vịt con đã về với vịt mẹ rồi!',
      },
      // Trang 33: Nòng nọc đi từ 90 đến 100.
      {
        type: 'path', from: 90, to: 100,
        grid: [
          [90, 93, 94, 93],
          [91, 92, 95, 96],
          [93, 95, 98, 97],
          [94, 96, 99, 100],
        ],
        say: 'Nòng nọc đi theo thứ tự từ chín mươi đến một trăm để tìm mẹ ếch. Bé chạm từng số nhé, không đi chéo đâu!',
        done: 'Tuyệt vời! Nòng nọc đã tìm được mẹ rồi!',
      },
    ],
  },
  {
    id: 's100-to-mau', icon: '🎨', color: '#F59E0B', title: 'Tô màu theo số', name: 'Tìm các số theo yêu cầu để tô màu',
    // Trang 34: mỗi lượt một màu — chạm các số trong khoảng đó.
    rounds: COLOR_RULES.map(([lo, hi, color]) => {
      const answer = inRange(lo, hi);
      return {
        type: 'spot', img: img('p34_tranh'), zones: zones('p34_tranh'), answer,
        say: `Số lớn hơn ${w(lo)}, nhỏ hơn ${w(hi)} thì tô ${color}. Bé tìm và chạm vào ${answer.length > 1 ? `tất cả ${w(answer.length)} số` : 'số'} đó nhé!`,
        hint: `Chưa đúng rồi. Bé tìm số lớn hơn ${w(lo)} và nhỏ hơn ${w(hi)} nhé!`,
        done: answer.length > 1 ? `Giỏi quá! Bé tìm đủ các số để tô ${color} rồi!` : `Đúng rồi! Số ${w(P34[answer[0]])} tô ${color}!`,
      };
    }),
  },
  {
    id: 's100-que-tinh', icon: '🥢', color: '#2563EB', title: 'Bó que tính', name: 'Đếm chục và đơn vị',
    rounds: [
      // Trang 35: ba nhóm que tính (mỗi bó 10 que).
      ...[[1, 86], [2, 62], [3, 75]].map(([k, n]) => ({
        type: 'ask', img: img(`p35_que${k}`),
        asks: [
          { label: 'Có', unit: 'bó mười que', answer: Math.floor(n / 10), say: 'Mỗi bó có mười que tính. Có mấy bó mười que?' },
          { label: 'Còn', unit: 'que lẻ', answer: n % 10, say: 'Còn mấy que lẻ?' },
          { label: 'Tất cả', unit: 'que tính', answer: n, say: 'Vậy có tất cả bao nhiêu que tính? Bé bấm số nhé!' },
        ],
        say: 'Mỗi bó có mười que tính. Có mấy bó mười que?',
      })),
      // Trang 35: sáu bình cá — năm bình mười con và một bình bảy con.
      {
        type: 'ask', img: img('p35_ca'),
        asks: [
          { label: 'Có', unit: 'bình mười con', answer: 5, say: 'Bé đếm cá trong từng bình. Có mấy bình mười con cá?' },
          { label: 'Có', unit: 'bình bảy con', answer: 1, say: 'Có mấy bình bảy con cá?' },
          { label: 'Tất cả', unit: 'con cá', answer: 57, say: 'Năm chục và bảy con. Vậy có tất cả bao nhiêu con cá?' },
        ],
        say: 'Bé đếm cá trong từng bình. Có mấy bình mười con cá?',
      },
    ],
  },
  {
    id: 's100-ban-tinh', icon: '🧮', color: '#7C3AED', title: 'Bàn tính', name: 'Hàng chục, hàng đơn vị',
    rounds: [
      // Trang 36: đọc số trên bàn tính.
      ...ABACUS.map(([t, u], k) => ({
        type: 'ask', img: img(`p36_bt${k + 1}`),
        asks: [
          { label: 'Hàng chục', answer: t, say: 'Cột hàng chục có mấy hạt?' },
          { label: 'Hàng đơn vị', answer: u, say: 'Cột hàng đơn vị có mấy hạt?' },
          { label: 'Số', answer: 10 * t + u, say: `${w(t)} chục và ${w(u)} đơn vị là số mấy? Bé bấm số nhé!` },
        ],
        say: 'Bé đếm hạt trên bàn tính. Cột hàng chục có mấy hạt?',
      })),
      // Trang 36: số cho trước (58, 79, 62) → mỗi cột cần xếp mấy hạt.
      ...[58, 79, 62].map((n, k) => ({
        type: 'ask', img: img(`p36_bt${k + 4}`),
        asks: [
          { label: 'Hàng chục', unit: 'hạt', answer: Math.floor(n / 10), say: `Số ${w(n)}. Cột hàng chục cần xếp mấy hạt?` },
          { label: 'Hàng đơn vị', unit: 'hạt', answer: n % 10, say: 'Cột hàng đơn vị cần xếp mấy hạt?' },
        ],
        say: `Bàn tính chưa có hạt nào. Để được số ${w(n)}, cột hàng chục cần xếp mấy hạt?`,
      })),
    ],
  },
  {
    id: 's100-chon-so', icon: '🐟', color: '#0EA5E9', title: 'Chọn số đúng', name: 'So sánh số, tìm quy luật',
    rounds: [
      // Trang 37: cá có số nhỏ hơn 50 — 48, 45, 28, 36.
      {
        type: 'spot', img: img('p37_meo'), zones: zones('p37_meo'), answer: [0, 2, 3, 5],
        say: 'Mèo con muốn ăn những chú cá có số nhỏ hơn năm mươi. Bé chạm vào các chú cá đó nhé!',
        hint: 'Số này không nhỏ hơn năm mươi đâu. Bé tìm cá khác nhé!',
        done: 'Giỏi quá! Bốn mươi tám, bốn mươi lăm, hai mươi tám, ba mươi sáu đều nhỏ hơn năm mươi!',
      },
      // Trang 37: thuyền có hàng đơn vị lớn hơn 6 và hàng chục nhỏ hơn 6 — 48.
      {
        type: 'spot', img: img('p37_thuyen'), zones: zones('p37_thuyen'), answer: [0],
        say: 'Gấu con muốn mua chiếc thuyền có số hàng đơn vị lớn hơn sáu, số hàng chục nhỏ hơn sáu. Bé chọn giúp Gấu nhé!',
        hint: 'Chưa đúng rồi. Bé xem số hàng chục và số hàng đơn vị của từng thuyền nhé!',
        done: 'Đúng rồi! Số bốn mươi tám: bốn nhỏ hơn sáu, tám lớn hơn sáu!',
      },
      // Trang 38: các dãy số theo quy luật — số trong quả táo.
      {
        type: 'seq', img: img('p38_oc'), cols: 5,
        cells: [5, 10, 15, 20, 25, 10, 20, 30, 40, 50, 15, 25, 35, 45, 55, 10, 30, 50, 70, 90],
        hide: [3, 8, 13, 18],
        say: 'Mỗi hàng số được xếp theo quy luật. Bé xem các số rồi điền số vào quả táo nhé!',
        hint: 'Chưa đúng rồi. Bé xem mỗi lần số tăng thêm bao nhiêu nhé!',
      },
      {
        type: 'choice', img: img('p38_bang'),
        options: [1, 2, 3, 4].map(k => ({ img: img(`p38_dap${k}`), say: `Nhóm số ${w(k)}` })),
        answer: 2, cols: 4,
        say: 'Bé nhớ lại các số vừa điền vào quả táo ở hàng A, B, C, D, rồi chọn nhóm có đúng các số đó nhé!',
        hint: 'Chưa đúng rồi. Bé xem lại số trong quả táo của từng hàng nhé!',
        done: 'Đúng rồi! Hai mươi, bốn mươi, bốn mươi lăm, bảy mươi!',
      },
    ],
  },
  {
    id: 's100-bang-so', icon: '💯', color: '#16A34A', title: 'Bảng số 1–100', name: 'Viết số theo thứ tự',
    rounds: [
      // Trang 39: bảng số 1–100 (app ẩn một số ô để bé điền).
      {
        type: 'seq', img: img('p39_ha_ma'), cells: range(1, 50), cols: 10,
        hide: hideValues(1, [4, 7, 13, 19, 22, 26, 30, 35, 38, 41, 47]),
        say: 'Bảng số từ một đến năm mươi còn thiếu vài số. Bé điền số còn thiếu nhé!',
      },
      {
        type: 'seq', img: img('p39_voi'), cells: range(51, 100), cols: 10,
        hide: hideValues(51, [53, 58, 62, 66, 71, 75, 79, 84, 88, 93, 99]),
        say: 'Tiếp tục nào! Bé điền các số còn thiếu từ năm mươi mốt đến một trăm nhé!',
      },
      // Trang 40: dây cờ cá — các số tròn chục.
      {
        type: 'seq', img: img('p40_ca'), cells: range(1, 10).map(n => n * 10), cols: 5,
        hide: [2, 3, 4, 5, 6, 7, 8],
        say: 'Dây cá có các số tròn chục: mười, hai mươi, … Bé điền số lên thân cá nhé!',
      },
    ],
  },
  {
    id: 's100-tinh-chuc', icon: '🎁', color: '#DB2777', title: 'Cộng trừ số tròn chục', name: 'Tính rồi chọn quà, nối nấm vào giỏ',
    rounds: [
      // Trang 40: 30 + 40 = 70 → hộp quà số 3.
      {
        type: 'choice', img: img('p40_be'),
        options: [1, 2, 3, 4].map(k => ({ img: img(`p40_qua${k}`), say: `hộp quà số ${w([50, 60, 70, 80][k - 1])}` })),
        answer: 2, cols: 4,
        say: 'Ba mươi cộng bốn mươi bằng mấy? Bé tính rồi chọn món quà có số đúng cho bạn nhé!',
        hint: 'Chưa đúng rồi. Ba chục cộng bốn chục là mấy chục nhỉ?',
        done: 'Đúng rồi! Ba mươi cộng bốn mươi bằng bảy mươi!',
      },
      // Trang 41: nối cây nấm vào giỏ.
      ...MUSHROOMS.map(mushroomRound),
    ],
  },
].map(s => ({ ...s, part: 2 }));
