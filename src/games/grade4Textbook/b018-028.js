/**
 * SGK Toán 4: bài 18–28 (sách trang 23–37): Yến, tạ, tấn; Bảng đơn vị đo khối lượng; Giây, thế kỉ;
 * Tìm số trung bình cộng; Biểu đồ; Luyện tập chung.
 * Hình vẽ lại: scripts/redraw/g4t_bai018_028.py (bộ vẽ kit_g4t.py).
 */
import { listValidate, fr, dsValidate, readBlank, num } from './kit.js';
import imgDongHo from '../../assets/grade4-textbook/bai21_q5_dongho.svg';
import imgTheThao from '../../assets/grade4-textbook/bai24_q1_thethao.svg';
import imgThoc from '../../assets/grade4-textbook/bai24_q2_thoc.svg';
import imgCay from '../../assets/grade4-textbook/bai25_q1_cay.svg';
import imgLopMot from '../../assets/grade4-textbook/bai25_q2_lopmot.svg';
import imgVai from '../../assets/grade4-textbook/bai26_q1_vai.svg';
import imgMua from '../../assets/grade4-textbook/bai26_q2_mua.svg';
import imgCa from '../../assets/grade4-textbook/bai26_q3_ca.svg';
import imgHsg from '../../assets/grade4-textbook/bai27_q3_hsg.svg';
import imgSach from '../../assets/grade4-textbook/bai28_q2_sach.svg';

// ── Đồ dùng riêng của tệp này ────────────────────────────────────────────────────────────────────
const fold = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLowerCase().replace(/\s+/g, ' ').trim();
const items = (v) => String(v).split(/\s*[,;]\s*|\s+và\s+/).map(fold).map(s => s.replace(/^(thang|lop|mon|nam)\s+/, '')).filter(Boolean);

/** Một nhóm câu trả lời không cần đúng thứ tự (các tháng, các lớp, các môn…). */
function setValidate(arr) {
  const want = arr.map(fold).sort().join('|');
  return (v) => items(v).sort().join('|') === want;
}

/** Ô có nhãn chữ / đơn vị: "2 tạ" = "2tạ", hoa thường như nhau. */
const wordValidate = (s) => (v) => fold(v).replace(/\s+/g, '') === fold(s).replace(/\s+/g, '');

/** Thế kỉ: nhận số La Mã (XIX), số thường (19), có hay không chữ "thế kỉ". */
const ROMAN = ['', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI', 'XXII'];
function century(year) {
  const c = Math.ceil(year / 100);
  return {
    answer: ROMAN[c],
    validate: (v) => {
      const t = fold(v).replace(/^the k[iy]\s*/, '').replace(/\s+/g, '').toUpperCase();
      return t === ROMAN[c] || t === String(c);
    },
  };
}

/** Một dòng nhiều chỗ trống mà các số đổi chỗ được (mỗi "..." một số). */
const anyOrder = (label, nums) => ({ label, answer: nums.join(','), validate: setValidate(nums.map(String)) });

/** Nhóm tên chọn từ ô chữ (tiles), không cần đúng thứ tự. */
const pickSet = (label, tiles, ans) => ({ label, answer: ans.join(', '), tiles, validate: setValidate(ans) });
const pickOne = (label, tiles, ans) => ({ label, answer: ans, tiles, tileOne: true, validate: wordValidate(ans) });

const NOW = new Date().getFullYear();
const ABCD = ['A', 'B', 'C', 'D'];

export const QUESTIONS = {
  // ── Bài 18. Yến, tạ, tấn (trang 23) ──────────────────────────────────────────────────────────
  'bai-18': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết "2kg" hoặc "2 tạ" hoặc "2 tấn" vào chỗ chấm cho thích hợp:',
      blanks: [
        pickOne('a) Con bò cân nặng ...', ['2kg', '2 tạ', '2 tấn'], '2 tạ'),
        pickOne('b) Con gà cân nặng ...', ['2kg', '2 tạ', '2 tấn'], '2kg'),
        pickOne('c) Con voi cân nặng ...', ['2kg', '2 tạ', '2 tấn'], '2 tấn'),
      ],
      hints: ['1 tạ = 100kg, 1 tấn = 1000kg. Con gà nhẹ, con voi rất nặng.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 1 yến = ... kg', answer: '10' }, { label: '5 yến = ... kg', answer: '50' }, { label: '1 yến 7kg = ... kg', answer: '17' },
        { label: '10kg = ... yến', answer: '1' }, { label: '8 yến = ... kg', answer: '80' }, { label: '5 yến 3kg = ... kg', answer: '53' },
        { label: 'b) 1 tạ = ... yến', answer: '10' }, { label: '4 tạ = ... yến', answer: '40' },
        { label: '10 yến = ... tạ', answer: '1' }, { label: '2 tạ = ... kg', answer: '200' },
        { label: '1 tạ = ... kg', answer: '100' }, { label: '9 tạ = ... kg', answer: '900' },
        { label: '100kg = ... tạ', answer: '1' }, { label: '4 tạ 60kg = ... kg', answer: '460' },
        { label: 'c) 1 tấn = ... tạ', answer: '10' }, { label: '3 tấn = ... tạ', answer: '30' },
        { label: '10 tạ = ... tấn', answer: '1' }, { label: '8 tấn = ... tạ', answer: '80' },
        { label: '1 tấn = ... kg', answer: '1000' }, { label: '5 tấn = ... kg', answer: '5000' },
        { label: '1000kg = ... tấn', answer: '1' }, { label: '2 tấn 85kg = ... kg', answer: '2085' },
      ],
      hints: ['1 yến = 10kg, 1 tạ = 10 yến = 100kg, 1 tấn = 10 tạ = 1000kg.', '4 tạ 60kg: đổi 4 tạ ra ki-lô-gam rồi cộng thêm 60kg.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Tính:',
      blanks: [
        { label: '18 yến + 26 yến = ... yến', answer: '44', calc: '18 + 26' },
        { label: '135 tạ × 4 = ... tạ', answer: '540', calc: '135 × 4' },
        { label: '648 tạ − 75 tạ = ... tạ', answer: '573', calc: '648 − 75' },
        { label: '512 tấn : 8 = ... tấn', answer: '64', calc: '512 : 8' },
      ],
      hints: ['Tính như với số tự nhiên rồi viết tên đơn vị vào kết quả.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '4. Một xe ô tô chuyến trước chở được 3 tấn muối, chuyến sau chở nhiều hơn chuyến trước 3 tạ. Hỏi cả hai chuyến xe đó chở được bao nhiêu tạ muối?',
      blanks: [
        { label: 'Đổi: 3 tấn = ... tạ', answer: '30' },
        { label: 'Chuyến sau chở được: ... tạ muối', answer: '33' },
        { label: 'Cả hai chuyến chở được: ... tạ muối', answer: '63' },
      ],
      hints: ['Đổi 3 tấn ra tạ trước (1 tấn = 10 tạ).', 'Chuyến sau = chuyến trước + 3 tạ; cả hai chuyến = chuyến trước + chuyến sau.'],
    },
  ],

  // ── Bài 19. Bảng đơn vị đo khối lượng (trang 24) ─────────────────────────────────────────────
  'bai-19': [
    {
      type: 'fill', stars: 2,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 1dag = ... g', answer: '10' }, { label: '1hg = ... dag', answer: '10' },
        { label: '10g = ... dag', answer: '1' }, { label: '10dag = ... hg', answer: '1' },
        { label: 'b) 4dag = ... g', answer: '40' }, { label: '3kg = ... hg', answer: '30' }, { label: '2kg 300g = ... g', answer: '2300' },
        { label: '8hg = ... dag', answer: '80' }, { label: '7kg = ... g', answer: '7000' }, { label: '2kg 30g = ... g', answer: '2030' },
      ],
      hints: ['Mỗi đơn vị đo khối lượng gấp 10 lần đơn vị bé hơn liền nó: kg, hg, dag, g.', '1kg = 1000g.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Tính:',
      blanks: [
        { label: '380g + 195g = ... g', answer: '575', calc: '380 + 195' },
        { label: '452hg × 3 = ... hg', answer: '1356', calc: '452 × 3' },
        { label: '928dag − 274dag = ... dag', answer: '654', calc: '928 − 274' },
        { label: '768hg : 6 = ... hg', answer: '128', calc: '768 : 6' },
      ],
      hints: ['Tính như với số tự nhiên rồi viết tên đơn vị vào kết quả.'],
    },
    {
      type: 'compare', stars: 2,
      q: '3. >, <, = ?',
      rows: [
        { left: '5dag', right: '50g', answer: '=' },
        { left: '4 tạ 30kg', right: '4 tạ 3kg', answer: '>' },
        { left: '8 tấn', right: '8100kg', answer: '<' },
        { left: '3 tấn 500kg', right: '3500kg', answer: '=' },
      ],
      hints: ['Đổi hai bên về cùng một đơn vị rồi so sánh.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '4. Có 4 gói bánh, mỗi gói cân nặng 150g và 2 gói kẹo, mỗi gói cân nặng 200g. Hỏi có tất cả mấy ki-lô-gam bánh và kẹo?',
      blanks: [
        { label: '4 gói bánh cân nặng: ... g', answer: '600' },
        { label: '2 gói kẹo cân nặng: ... g', answer: '400' },
        { label: 'Có tất cả: ... kg bánh và kẹo', answer: '1' },
      ],
      calcFree: true,
      hints: ['Tính cân nặng 4 gói bánh và 2 gói kẹo, cộng lại rồi đổi ra ki-lô-gam (1000g = 1kg).'],
    },
  ],

  // ── Bài 20. Giây, thế kỉ (trang 25) ──────────────────────────────────────────────────────────
  'bai-20': [
    {
      type: 'fill', stars: 2,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: 'a) 1 phút = ... giây', answer: '60' }, { label: '2 phút = ... giây', answer: '120' }, { label: `${fr(1, 3)} phút = ... giây`, answer: '20' },
        { label: '60 giây = ... phút', answer: '1' }, { label: '7 phút = ... giây', answer: '420' }, { label: '1 phút 8 giây = ... giây', answer: '68' },
        { label: 'b) 1 thế kỉ = ... năm', answer: '100' }, { label: '5 thế kỉ = ... năm', answer: '500' }, { label: `${fr(1, 2)} thế kỉ = ... năm`, answer: '50' },
        { label: '100 năm = ... thế kỉ', answer: '1' }, { label: '9 thế kỉ = ... năm', answer: '900' }, { label: `${fr(1, 5)} thế kỉ = ... năm`, answer: '20' },
      ],
      hints: ['1 phút = 60 giây; 1 thế kỉ = 100 năm.', `${fr(1, 3)} phút: chia 60 giây thành 3 phần bằng nhau.`],
    },
    {
      type: 'fill', stars: 2,
      q: '2. a) Bác Hồ sinh năm 1890. Bác Hồ sinh vào thế kỉ nào?\nBác Hồ ra đi tìm đường cứu nước vào năm 1911. Năm đó thuộc thế kỉ nào?\nb) Cách mạng tháng Tám thành công vào năm 1945. Năm đó thuộc thế kỉ nào?\nc) Bà Triệu lãnh đạo khởi nghĩa chống quân Đông Ngô năm 248. Năm đó thuộc thế kỉ nào?',
      blanks: [
        { label: 'a) Bác Hồ sinh vào thế kỉ ...', ...century(1890) },
        { label: 'Năm 1911 thuộc thế kỉ ...', ...century(1911) },
        { label: 'b) Năm 1945 thuộc thế kỉ ...', ...century(1945) },
        { label: 'c) Năm 248 thuộc thế kỉ ...', ...century(248) },
      ],
      hints: ['Từ năm 1801 đến năm 1900 là thế kỉ XIX, từ năm 1901 đến năm 2000 là thế kỉ XX.', 'Viết thế kỉ bằng chữ số La Mã (XIX) hoặc số thường (19) đều được.'],
    },
    {
      type: 'fill', stars: 3,
      q: `3. a) Lý Thái Tổ dời đô về Thăng Long năm 1010. Năm đó thuộc thế kỉ nào? Tính đến nay đã được bao nhiêu năm?\nb) Ngô Quyền đánh tan quân Nam Hán trên sông Bạch Đằng năm 938. Năm đó thuộc thế kỉ nào? Tính đến nay đã được bao nhiêu năm?`,
      blanks: [
        { label: 'a) Năm 1010 thuộc thế kỉ ...', ...century(1010) },
        { label: `Tính đến nay (năm ${NOW}) đã được ... năm`, answer: String(NOW - 1010), calc: `${NOW} − 1010` },
        { label: 'b) Năm 938 thuộc thế kỉ ...', ...century(938) },
        { label: `Tính đến nay (năm ${NOW}) đã được ... năm`, answer: String(NOW - 938), calc: `${NOW} − 938` },
      ],
      hints: ['Từ năm 1001 đến năm 1100 là thế kỉ XI.', 'Số năm đã qua = năm nay − năm xảy ra sự kiện.'],
    },
  ],

  // ── Bài 21. Luyện tập (trang 26) ─────────────────────────────────────────────────────────────
  'bai-21': [
    {
      type: 'fill', stars: 2,
      q: '1. a) Kể tên những tháng có: 30 ngày, 31 ngày, 28 (hoặc 29) ngày.\nb) Cho biết: Năm nhuận là năm mà tháng 2 có 29 ngày. Các năm không nhuận thì tháng 2 chỉ có 28 ngày.\nHỏi: Năm nhuận có bao nhiêu ngày? Năm không nhuận có bao nhiêu ngày?',
      blanks: [
        anyOrder('a) Tháng có 30 ngày: tháng ..., ..., ..., ...', [4, 6, 9, 11]),
        anyOrder('Tháng có 31 ngày: tháng ..., ..., ..., ..., ..., ..., ...', [1, 3, 5, 7, 8, 10, 12]),
        { label: 'Tháng có 28 (hoặc 29) ngày: tháng ...', answer: '2' },
        { label: 'b) Năm nhuận có ... ngày', answer: '366' },
        { label: 'Năm không nhuận có ... ngày', answer: '365' },
      ],
      hints: ['Đếm trên các đốt tay: tháng ở đốt nhô lên có 31 ngày, tháng ở chỗ lõm có 30 ngày (trừ tháng 2).', 'b) Cộng số ngày của 12 tháng: 7 tháng 31 ngày, 4 tháng 30 ngày và tháng 2.'],
    },
    {
      type: 'fill', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      blanks: [
        { label: '3 ngày = ... giờ', answer: '72' }, { label: `${fr(1, 3)} ngày = ... giờ`, answer: '8' }, { label: '3 giờ 10 phút = ... phút', answer: '190' },
        { label: '4 giờ = ... phút', answer: '240' }, { label: `${fr(1, 4)} giờ = ... phút`, answer: '15' }, { label: '2 phút 5 giây = ... giây', answer: '125' },
        { label: '8 phút = ... giây', answer: '480' }, { label: `${fr(1, 2)} phút = ... giây`, answer: '30' }, { label: '4 phút 20 giây = ... giây', answer: '260' },
      ],
      hints: ['1 ngày = 24 giờ, 1 giờ = 60 phút, 1 phút = 60 giây.'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. a) Quang Trung đại phá quân Thanh vào năm 1789. Năm đó thuộc thế kỉ nào?\nb) Lễ kỉ niệm 600 năm ngày sinh của Nguyễn Trãi được tổ chức vào năm 1980. Như vậy Nguyễn Trãi sinh năm nào? Năm đó thuộc thế kỉ nào?',
      blanks: [
        { label: 'a) Năm 1789 thuộc thế kỉ ...', ...century(1789) },
        { label: 'b) Nguyễn Trãi sinh năm ...', answer: '1380', calc: '1980 − 600' },
        { label: 'Năm đó thuộc thế kỉ ...', ...century(1380) },
      ],
      hints: ['Năm sinh = 1980 − 600.', 'Từ năm 1301 đến năm 1400 là thế kỉ XIV.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: `4. Trong cuộc thi chạy 60m, Nam chạy hết ${fr(1, 4)} phút, Bình chạy hết ${fr(1, 5)} phút. Hỏi ai chạy nhanh hơn và nhanh hơn mấy giây?`,
      blanks: [
        { label: 'Nam chạy hết: ... giây', answer: '15' },
        { label: 'Bình chạy hết: ... giây', answer: '12' },
        pickOne('Bạn ... chạy nhanh hơn', ['Nam', 'Bình'], 'Bình'),
        { label: 'Nhanh hơn: ... giây', answer: '3' },
      ],
      hints: ['Đổi ra giây: 1 phút = 60 giây.', 'Ai chạy hết ít thời gian hơn thì chạy nhanh hơn.'],
    },
    {
      type: 'fill', stars: 2, img: imgDongHo,
      q: '5. Khoanh vào chữ đặt trước câu trả lời đúng:',
      blanks: [
        pickOne('a) Chọn chữ: ...', ABCD, 'B'),
        pickOne('b) Chọn chữ: ...', ABCD, 'C'),
      ],
      hints: ['a) Kim ngắn chỉ giờ (đã qua số 8), kim dài chỉ phút (chỉ số 8 là 40 phút).', 'b) 5kg = 5000g.'],
    },
  ],

  // ── Bài 22. Tìm số trung bình cộng (trang 26–27) ─────────────────────────────────────────────
  'bai-22': [
    {
      type: 'fill', stars: 3,
      q: '1. Tìm số trung bình cộng của các số sau:',
      blanks: [
        { label: 'a) 42 và 52: ...', answer: '47' },
        { label: 'b) 36 ; 42 và 57: ...', answer: '45' },
        { label: 'c) 34 ; 43 ; 52 và 39: ...', answer: '42' },
        { label: 'd) 20 ; 35 ; 37 ; 65 và 73: ...', answer: '46' },
      ],
      calcFree: true,
      hints: ['Muốn tìm số trung bình cộng của nhiều số, ta tính tổng các số đó rồi chia tổng cho số các số hạng.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '2. Bốn em Mai, Hoa, Hưng, Thịnh lần lượt cân nặng là 36kg, 38kg, 40kg, 34kg. Hỏi trung bình mỗi em cân nặng bao nhiêu ki-lô-gam?',
      blanks: [
        { label: 'Cả bốn em cân nặng: ... kg', answer: '148' },
        { label: 'Trung bình mỗi em cân nặng: ... kg', answer: '37' },
      ],
      calcFree: true,
      hints: ['Cộng cân nặng của bốn em rồi chia cho 4.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Tìm số trung bình cộng của các số tự nhiên liên tiếp từ 1 đến 9.',
      blanks: [
        { label: 'Tổng các số từ 1 đến 9: ...', answer: '45' },
        { label: 'Số trung bình cộng: ...', answer: '5' },
      ],
      hints: ['Có 9 số hạng. Ghép 1 + 9, 2 + 8, … để cộng nhanh.'],
    },
  ],

  // ── Bài 23. Luyện tập (trang 28) ─────────────────────────────────────────────────────────────
  'bai-23': [
    {
      type: 'fill', stars: 3,
      q: '1. Tìm số trung bình cộng của các số sau:',
      blanks: [
        { label: 'a) 96 ; 121 và 143: ...', answer: '120' },
        { label: 'b) 35 ; 12 ; 24 ; 21 và 43: ...', answer: '27' },
      ],
      calcFree: true,
      hints: ['Tính tổng các số rồi chia cho số các số hạng.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '2. Số dân của một xã trong 3 năm liền tăng thêm lần lượt là: 96 người, 82 người, 71 người. Hỏi trung bình mỗi năm số dân của xã đó tăng thêm bao nhiêu người?',
      blanks: [
        { label: 'Ba năm tăng thêm: ... người', answer: '249' },
        { label: 'Trung bình mỗi năm tăng thêm: ... người', answer: '83' },
      ],
      calcFree: true,
      hints: ['Cộng số người tăng thêm của 3 năm rồi chia cho 3.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '3. Số đo chiều cao của 5 học sinh lớp Bốn lần lượt là 138cm, 132cm, 130cm, 136cm, 134cm. Hỏi trung bình số đo chiều cao của mỗi em là bao nhiêu xăng-ti-mét?',
      blanks: [
        { label: 'Tổng số đo chiều cao của 5 em: ... cm', answer: '670' },
        { label: 'Trung bình chiều cao mỗi em: ... cm', answer: '134' },
      ],
      calcFree: true,
      hints: ['Cộng chiều cao của 5 em rồi chia cho 5.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: '4. Có 9 ô tô chuyển thực phẩm vào thành phố, trong đó 5 ô tô đi đầu, mỗi ô tô chuyển được 36 tạ và 4 ô tô đi sau, mỗi ô tô chuyển được 45 tạ. Hỏi trung bình mỗi ô tô chuyển được bao nhiêu tấn thực phẩm?',
      blanks: [
        { label: '5 ô tô đi đầu chuyển được: ... tạ', answer: '180' },
        { label: '4 ô tô đi sau chuyển được: ... tạ', answer: '180' },
        { label: 'Cả 9 ô tô chuyển được: ... tạ', answer: '360' },
        { label: 'Trung bình mỗi ô tô chuyển được: ... tạ', answer: '40' },
        { label: 'Đổi: ... tạ = ... tấn', answer: '40,4', validate: listValidate(['40', '4']) },
      ],
      calcFree: true,
      hints: ['Tính số tạ của 5 xe đầu và 4 xe sau, cộng lại rồi chia cho 9.', 'Đổi ra tấn: 10 tạ = 1 tấn.'],
    },
    {
      type: 'fill', stars: 3,
      q: '5. a) Số trung bình cộng của hai số bằng 9. Biết một trong hai số đó bằng 12, tìm số kia.\nb) Số trung bình cộng của hai số bằng 28. Biết một trong hai số đó bằng 30, tìm số kia.',
      blanks: [
        { label: 'a) Tổng của hai số: ...', answer: '18' },
        { label: 'Số kia là: ...', answer: '6' },
        { label: 'b) Tổng của hai số: ...', answer: '56' },
        { label: 'Số kia là: ...', answer: '26' },
      ],
      hints: ['Tổng của hai số = số trung bình cộng × 2.', 'Số kia = tổng − số đã biết.'],
    },
  ],

  // ── Bài 24. Biểu đồ (trang 28–29) ────────────────────────────────────────────────────────────
  'bai-24': [
    {
      type: 'fill', stars: 2, img: imgTheThao,
      q: '1. Biểu đồ dưới đây nói về các môn thể thao khối lớp Bốn tham gia. Nhìn vào biểu đồ hãy trả lời các câu hỏi sau:',
      blanks: [
        pickSet('a) Những lớp được nêu tên trong biểu đồ: ...', ['4A', '4B', '4C'], ['4A', '4B', '4C']),
        { label: 'b) Khối lớp Bốn tham gia ... môn thể thao', answer: '4' },
        pickSet('Gồm các môn: ...', ['bơi', 'nhảy dây', 'cờ vua', 'đá cầu'], ['bơi', 'nhảy dây', 'cờ vua', 'đá cầu']),
        { label: 'c) Môn bơi có ... lớp tham gia', answer: '2' },
        pickSet('Đó là các lớp: ...', ['4A', '4B', '4C'], ['4A', '4C']),
        pickOne('d) Môn có ít lớp tham gia nhất: ...', ['bơi', 'nhảy dây', 'cờ vua', 'đá cầu'], 'cờ vua'),
        { label: 'e) Hai lớp 4B và 4C tham gia tất cả ... môn', answer: '3' },
        pickOne('Hai lớp đó cùng tham gia môn: ...', ['bơi', 'nhảy dây', 'cờ vua', 'đá cầu'], 'đá cầu'),
      ],
      hints: ['Mỗi hàng là một lớp, mỗi hình là một môn lớp đó tham gia.', 'e) Đếm các môn của 4B và 4C, môn nào hai lớp cùng có chỉ đếm một lần.'],
    },
    {
      type: 'fill', stars: 3, img: imgThoc,
      q: '2. Biểu đồ bên nói về số thóc gia đình bác Hà đã thu hoạch trong ba năm: 2000, 2001 và 2002. Dựa vào biểu đồ hãy trả lời các câu hỏi dưới đây:',
      blanks: [
        { label: 'a) Năm 2002 gia đình bác Hà thu hoạch được ... tấn thóc', answer: '5' },
        { label: 'b) Năm 2002 thu hoạch nhiều hơn năm 2000: ... tạ thóc', answer: '10' },
        { label: 'c) Cả ba năm thu hoạch được ... tấn thóc', answer: '12' },
        pickOne('Năm thu hoạch được nhiều thóc nhất: năm ...', ['2000', '2001', '2002'], '2002'),
        pickOne('Năm thu hoạch được ít thóc nhất: năm ...', ['2000', '2001', '2002'], '2001'),
      ],
      hints: ['Mỗi bao thóc là 10 tạ. Đếm số bao của từng năm.', '10 tạ = 1 tấn.'],
    },
  ],

  // ── Bài 25. Biểu đồ (tiếp theo) (trang 30–32) ────────────────────────────────────────────────
  'bai-25': [
    {
      type: 'fill', stars: 2, img: imgCay,
      q: '1. Biểu đồ dưới đây nói về số cây của khối lớp Bốn và khối lớp Năm đã trồng. Nhìn vào biểu đồ trên hãy trả lời các câu hỏi sau:',
      blanks: [
        pickSet('a) Những lớp đã tham gia trồng cây: ...', ['4A', '4B', '5A', '5B', '5C'], ['4A', '4B', '5A', '5B', '5C']),
        { label: 'b) Lớp 4A trồng được ... cây', answer: '35' },
        { label: 'Lớp 5B trồng được ... cây', answer: '40' },
        { label: 'Lớp 5C trồng được ... cây', answer: '23' },
        { label: 'c) Khối lớp Năm có ... lớp tham gia trồng cây', answer: '3' },
        pickSet('Đó là các lớp: ...', ['4A', '4B', '5A', '5B', '5C'], ['5A', '5B', '5C']),
        { label: 'd) Có ... lớp trồng được trên 30 cây', answer: '3' },
        pickSet('Đó là các lớp: ...', ['4A', '4B', '5A', '5B', '5C'], ['4A', '5A', '5B']),
        pickOne('e) Lớp trồng được nhiều cây nhất: lớp ...', ['4A', '4B', '5A', '5B', '5C'], '5A'),
        pickOne('Lớp trồng được ít cây nhất: lớp ...', ['4A', '4B', '5A', '5B', '5C'], '5C'),
      ],
      hints: ['Số ghi trên đỉnh mỗi cột là số cây của lớp đó.', 'Cột cao hơn thì trồng được nhiều cây hơn.'],
    },
    {
      type: 'fill', stars: 3, img: imgLopMot,
      q: '2. Số lớp Một của Trường Tiểu học Hoà Bình trong bốn năm học như sau: 2001 – 2002: 4 lớp; 2002 – 2003: 3 lớp; 2003 – 2004: 6 lớp; 2004 – 2005: 4 lớp.\na) Hãy viết tiếp vào chỗ chấm trong biểu đồ. b) Trả lời các câu hỏi.',
      blanks: [
        { label: 'a) Số trên cột năm học 2001 – 2002: ...', answer: '4' },
        { label: 'Tên dưới cột thứ hai: năm học ... – ...', answer: '2002,2003', validate: listValidate(['2002', '2003']) },
        { label: 'Số trên cột năm học 2003 – 2004: ...', answer: '6' },
        { label: 'Tên dưới cột thứ tư: năm học ... – ...', answer: '2004,2005', validate: listValidate(['2004', '2005']) },
        { label: 'Số trên cột thứ tư: ...', answer: '4' },
        { label: 'b) Số lớp Một năm học 2003 – 2004 nhiều hơn năm học 2002 – 2003: ... lớp', answer: '3' },
        { label: 'Năm học 2002 – 2003 mỗi lớp Một có 35 học sinh. Năm học đó trường có ... học sinh lớp Một', answer: '105' },
        { label: 'Năm học 2004 – 2005 mỗi lớp Một có 32 học sinh. Số học sinh lớp Một năm học 2002 – 2003 ít hơn năm học 2004 – 2005: ... học sinh', answer: '23' },
      ],
      calcFree: true,
      hints: ['Các cột xếp theo thứ tự năm học, số trên đỉnh cột là số lớp.', 'Số học sinh = số lớp × số học sinh mỗi lớp.'],
    },
  ],

  // ── Bài 26. Luyện tập (trang 33–34) ──────────────────────────────────────────────────────────
  'bai-26': [
    {
      type: 'fill', stars: 2, img: imgVai,
      q: '1. Biểu đồ dưới đây nói về số vải hoa và vải trắng của một cửa hàng đã bán được trong tháng 9. Dựa vào biểu đồ trên hãy điền Đ (đúng) hoặc S (sai):',
      blanks: [
        { label: 'Tuần 1 cửa hàng bán được 2m vải hoa và 1m vải trắng. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'Tuần 3 cửa hàng bán được 400m vải. ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'Tuần 3 cửa hàng bán được nhiều vải hoa nhất. ...', answer: 'S', validate: dsValidate(false) },
        { label: 'Số mét vải hoa mà tuần 2 cửa hàng bán được nhiều hơn tuần 1 là 100m. ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'Số mét vải hoa mà tuần 4 cửa hàng bán được ít hơn tuần 2 là 100m. ...', answer: 'S', validate: dsValidate(false) },
      ],
      hints: ['Mỗi cuộn vải là 100m, không phải 1m.'],
    },
    {
      type: 'fill', stars: 3, img: imgMua,
      q: '2. Biểu đồ bên nói về số ngày có mưa trong ba tháng của năm 2004 ở một huyện miền núi. Dựa vào biểu đồ hãy trả lời các câu hỏi sau:',
      blanks: [
        { label: 'a) Tháng 7 có ... ngày mưa', answer: '18' },
        { label: 'b) Tháng 8 mưa nhiều hơn tháng 9: ... ngày', answer: '12' },
        { label: 'c) Trung bình mỗi tháng có ... ngày mưa', answer: '12' },
      ],
      hints: ['Đọc đỉnh mỗi cột theo vạch số bên trái (mỗi vạch cách nhau 3 ngày).', 'c) Cộng số ngày mưa của 3 tháng rồi chia cho 3.'],
    },
    {
      type: 'fill', stars: 2, img: imgCa,
      q: '3. Tàu Thắng Lợi trong ba tháng đầu năm đã đánh bắt được số cá như sau:\nTháng 1: 5 tấn; Tháng 2: 2 tấn; Tháng 3: 6 tấn.\nHãy vẽ tiếp biểu đồ: viết chiều cao của các cột còn thiếu.',
      blanks: [
        { label: 'Cột tháng 2 cao đến vạch ... tấn', answer: '2' },
        { label: 'Cột tháng 3 cao đến vạch ... tấn', answer: '6' },
      ],
      hints: ['Mỗi cột cao đến đúng vạch ghi số tấn cá của tháng đó, như cột tháng 1 cao đến vạch 5.'],
    },
  ],

  // ── Bài 27. Luyện tập chung (trang 35–36) ────────────────────────────────────────────────────
  'bai-27': [
    {
      type: 'fill', stars: 3,
      q: `1. a) Viết số tự nhiên liền sau của số ${num(2835917)}.\nb) Viết số tự nhiên liền trước của số ${num(2835917)}.\nc) Đọc số rồi nêu giá trị của chữ số 2 trong mỗi số sau: ${num(82360945)} ; ${num(7283096)} ; ${num(1547238)}.`,
      blanks: [
        { label: 'a) Số liền sau: ...', answer: '2835918' },
        { label: 'b) Số liền trước: ...', answer: '2835916' },
        readBlank(`c) ${num(82360945)}: ...`, 82360945),
        { label: 'Giá trị của chữ số 2: ...', answer: '2000000' },
        readBlank(`${num(7283096)}: ...`, 7283096),
        { label: 'Giá trị của chữ số 2: ...', answer: '200000' },
        readBlank(`${num(1547238)}: ...`, 1547238),
        { label: 'Giá trị của chữ số 2: ...', answer: '200' },
      ],
      hints: ['Số liền sau hơn số đã cho 1 đơn vị, số liền trước kém 1 đơn vị.', 'Chữ số 2 ở hàng nào thì có giá trị là 2 đơn vị của hàng đó.'],
    },
    {
      type: 'fill', stars: 3,
      q: '2. Viết chữ số thích hợp vào ô trống:',
      blanks: [
        { label: `a) 475 ... 36 > ${num(475836)}`, answer: '9', boxes: true },
        { label: `b) 9 ... 3 876 < ${num(913000)}`, answer: '0', boxes: true },
        { label: 'c) 5 tấn 175kg > 5 ... 75kg', answer: '0', boxes: true },
        { label: 'd) ... tấn 750kg = 2750kg', answer: '2', boxes: true },
      ],
      hints: ['So sánh từng hàng từ trái sang phải.', 'c), d) Đổi ra ki-lô-gam: 5 tấn 175kg = 5175kg.'],
    },
    {
      type: 'fill', stars: 3, img: imgHsg,
      q: '3. Dựa vào biểu đồ dưới đây để viết tiếp vào chỗ chấm:',
      blanks: [
        { label: 'a) Khối lớp Ba có ... lớp', answer: '3' },
        pickSet('Đó là các lớp: ...', ['3A', '3B', '3C'], ['3A', '3B', '3C']),
        { label: 'b) Lớp 3A có ... học sinh giỏi toán', answer: '18' },
        { label: 'Lớp 3B có ... học sinh giỏi toán', answer: '27' },
        { label: 'Lớp 3C có ... học sinh giỏi toán', answer: '21' },
        pickOne('c) Lớp có nhiều học sinh giỏi toán nhất: lớp ...', ['3A', '3B', '3C'], '3B'),
        pickOne('Lớp có ít học sinh giỏi toán nhất: lớp ...', ['3A', '3B', '3C'], '3A'),
        { label: 'd) Trung bình mỗi lớp Ba có ... học sinh giỏi toán', answer: '22' },
      ],
      hints: ['Đọc đỉnh mỗi cột theo vạch số bên trái.', 'd) Cộng số học sinh giỏi của 3 lớp rồi chia cho 3.'],
    },
    {
      type: 'fill', stars: 2,
      q: '4. Trả lời các câu hỏi:\na) Năm 2000 thuộc thế kỉ nào?\nb) Năm 2005 thuộc thế kỉ nào?\nc) Thế kỉ XXI kéo dài từ năm nào đến năm nào?',
      blanks: [
        { label: 'a) Năm 2000 thuộc thế kỉ ...', ...century(2000) },
        { label: 'b) Năm 2005 thuộc thế kỉ ...', ...century(2005) },
        { label: 'c) Thế kỉ XXI kéo dài từ năm ... đến năm ...', answer: '2001,2100', validate: listValidate(['2001', '2100']) },
      ],
      hints: ['Từ năm 1901 đến năm 2000 là thế kỉ XX, từ năm 2001 đến năm 2100 là thế kỉ XXI.'],
    },
    {
      type: 'fill', stars: 2,
      q: '5. Tìm số tròn trăm x, biết: 540 < x < 870.',
      blanks: [anyOrder('x = ... ; ... ; ...', [600, 700, 800])],
      hints: ['Số tròn trăm có hai chữ số cuối là 00. Tìm các số tròn trăm lớn hơn 540 và bé hơn 870.'],
    },
  ],

  // ── Bài 28. Luyện tập chung (trang 36–37) ────────────────────────────────────────────────────
  'bai-28': [
    {
      type: 'fill', stars: 3,
      q: `1. Mỗi bài tập dưới đây có nêu kèm theo một số câu trả lời A, B, C, D (là đáp số, kết quả tính,…). Hãy khoanh vào chữ đặt trước câu trả lời đúng.\na) Số gồm năm mươi triệu, năm mươi nghìn và năm mươi viết là:\nA. ${num(505050)}   B. ${num(5050050)}   C. ${num(5005050)}   D. ${num(50050050)}\nb) Giá trị của chữ số 8 trong số ${num(548762)} là:\nA. ${num(80000)}   B. 8000   C. 800   D. 8\nc) Số lớn nhất trong các số ${num(684257)} ; ${num(684275)} ; ${num(684752)} ; ${num(684725)} là:\nA. ${num(684257)}   B. ${num(684275)}   C. ${num(684752)}   D. ${num(684725)}\nd) 4 tấn 85kg = ... kg. Số thích hợp để viết vào chỗ chấm là:\nA. 485   B. 4850   C. 4085   D. 4058\ne) 2 phút 10 giây = ... giây. Số thích hợp để viết vào chỗ chấm là:\nA. 30   B. 210   C. 130   D. 70`,
      blanks: [
        pickOne('a) Chọn chữ: ...', ABCD, 'D'),
        pickOne('b) Chọn chữ: ...', ABCD, 'B'),
        pickOne('c) Chọn chữ: ...', ABCD, 'C'),
        pickOne('d) Chọn chữ: ...', ABCD, 'C'),
        pickOne('e) Chọn chữ: ...', ABCD, 'C'),
      ],
      hints: ['a) Năm mươi triệu là 50 000 000.', 'd) 4 tấn = 4000kg; e) 2 phút = 120 giây.'],
    },
    {
      type: 'fill', stars: 3, img: imgSach,
      q: '2. Biểu đồ dưới đây chỉ số quyển sách các bạn Hiến, Hoà, Trung, Thục đã đọc trong một năm. Dựa vào biểu đồ để trả lời các câu hỏi sau:',
      blanks: [
        { label: 'a) Hiến đã đọc ... quyển sách', answer: '33' },
        { label: 'b) Hoà đã đọc ... quyển sách', answer: '40' },
        { label: 'c) Hoà đã đọc nhiều hơn Thục ... quyển sách', answer: '15' },
        pickOne('d) Bạn đọc ít hơn Thục 3 quyển sách: ...', ['Hiến', 'Hoà', 'Trung', 'Thục'], 'Trung'),
        pickOne('e) Bạn đọc nhiều sách nhất: ...', ['Hiến', 'Hoà', 'Trung', 'Thục'], 'Hoà'),
        pickOne('g) Bạn đọc ít sách nhất: ...', ['Hiến', 'Hoà', 'Trung', 'Thục'], 'Trung'),
        { label: 'h) Trung bình mỗi bạn đọc được ... quyển sách', answer: '30' },
      ],
      hints: ['Đọc đỉnh mỗi cột theo vạch số bên trái.', 'h) Cộng số sách của bốn bạn rồi chia cho 4.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true,
      q: `3. Một cửa hàng ngày đầu bán được 120m vải, ngày thứ hai bán được bằng ${fr(1, 2)} số mét vải bán trong ngày đầu, ngày thứ ba bán được gấp đôi ngày đầu. Hỏi trung bình mỗi ngày cửa hàng đã bán được bao nhiêu mét vải?`,
      blanks: [
        { label: 'Ngày thứ hai bán được: ... m', answer: '60' },
        { label: 'Ngày thứ ba bán được: ... m', answer: '240' },
        { label: 'Trung bình mỗi ngày bán được: ... m', answer: '140' },
      ],
      calcFree: true,
      hints: [`Ngày thứ hai: 120 : 2; ngày thứ ba: 120 × 2.`, 'Cộng số mét vải của ba ngày rồi chia cho 3.'],
    },
  ],
};
