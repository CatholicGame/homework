/**
 * SGK Toán 4: bài 137–151, Tỉ số, tìm hai số khi biết tổng (hiệu) và tỉ số, tỉ lệ bản đồ (sách trang 146–159).
 * Hình vẽ lại: scripts/redraw/g4t_bai137_151.py (bộ vẽ kit_g4t.py).
 * Bài 150 (Thực hành, trang 158–159: đo độ dài, bước đi ước lượng ngoài sân) không có câu chấm được nên bỏ.
 */
import { blank, fr, fracValidate, dsValidate } from './kit.js';
import imgThung from '../../assets/grade4-textbook/bai140_q4_sodo.svg';
import imgHieu72 from '../../assets/grade4-textbook/bai143_q4_sodo.svg';
import imgCamDua from '../../assets/grade4-textbook/bai144_q4_sodo.svg';
import imgDuong from '../../assets/grade4-textbook/bai145_q4_duong.svg';
import imgHinhH from '../../assets/grade4-textbook/bai146_q5_hinh.svg';

/** Ô "viết tỉ số": phân số viết đúng như đề (không rút gọn). */
const ratio = (label, a, b) => ({ label: `${label} {/}`, answer: `${a},${b}`, validate: fracValidate(a, b, true) });
/** Ô kết quả phân số (nhận mọi phân số bằng). */
const fracRes = (label, a, b) => ({ label: `${label} = {/}`, answer: `${a},${b}`, validate: fracValidate(a, b) });
const unit = (v, u) => blank(v, { suffix: u });
// Nhãn hàng bảng tỉ lệ bản đồ, xuống dòng cho cột nhãn hẹp (điện thoại dọc).
const TL = 'Tỉ lệ<br>bản đồ', TN = 'Độ dài<br>thu nhỏ', DT = 'Độ dài<br>thật';

const HINT_TONG = 'Vẽ sơ đồ, tìm tổng số phần bằng nhau, lấy tổng chia cho số phần để được giá trị một phần.';
const HINT_HIEU = 'Vẽ sơ đồ, tìm hiệu số phần bằng nhau, lấy hiệu chia cho số phần để được giá trị một phần.';

export const QUESTIONS = {
  // ── Bài 137. Giới thiệu tỉ số (trang 146–147) ───────────────────────────────────────────────
  'bai-137': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết tỉ số của a và b, biết:',
      blanks: [
        ratio('a) a = 2, b = 3: tỉ số của a và b là', 2, 3),
        ratio('b) a = 7, b = 4: tỉ số của a và b là', 7, 4),
        ratio('c) a = 6, b = 2: tỉ số của a và b là', 6, 2),
        ratio('d) a = 4, b = 10: tỉ số của a và b là', 4, 10),
      ],
      hints: ['Tỉ số của a và b là a : b, viết thành phân số: a ở trên, b ở dưới.'],
    },
    {
      type: 'fill', stars: 1,
      q: '2. Trong hộp có 2 bút đỏ và 8 bút xanh.',
      blanks: [
        ratio('a) Tỉ số của số bút đỏ và số bút xanh là', 2, 8),
        ratio('b) Tỉ số của số bút xanh và số bút đỏ là', 8, 2),
      ],
      hints: ['Số nào nói trước thì viết ở tử số, số nói sau viết ở mẫu số.'],
    },
    {
      type: 'fill', stars: 2,
      q: '3. Trong một tổ có 5 bạn trai và 6 bạn gái.',
      blanks: [
        ratio('a) Tỉ số của số bạn trai và số bạn của cả tổ là', 5, 11),
        ratio('b) Tỉ số của số bạn gái và số bạn của cả tổ là', 6, 11),
      ],
      hints: ['Tìm số bạn của cả tổ trước: 5 + 6.'],
    },
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: `4. Trên bãi cỏ có 20 con bò và có số trâu bằng ${fr(1, 4)} số bò. Hỏi trên bãi đó có mấy con trâu?`,
      blanks: [{ label: 'Số con trâu là: ... con', answer: '5' }],
      hints: [`Tìm ${fr(1, 4)} của 20: lấy 20 chia cho 4.`],
    },
  ],

  // ── Bài 138. Tìm hai số khi biết tổng và tỉ số của hai số đó (trang 147–148) ─────────────────
  'bai-138': [
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `1. Tổng của hai số là 333. Tỉ số của hai số đó là ${fr(2, 7)}. Tìm hai số đó.`,
      blanks: [{ label: 'Số bé là: ...', answer: '74' }, { label: 'Số lớn là: ...', answer: '259' }],
      hints: [HINT_TONG, 'Số bé 2 phần, số lớn 7 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `2. Hai kho chứa 125 tấn thóc, trong đó số thóc ở kho thứ nhất bằng ${fr(3, 2)} số thóc ở kho thứ hai. Hỏi mỗi kho chứa bao nhiêu tấn thóc?`,
      blanks: [{ label: 'Kho thứ nhất chứa: ... tấn thóc', answer: '75' }, { label: 'Kho thứ hai chứa: ... tấn thóc', answer: '50' }],
      hints: [HINT_TONG, 'Kho thứ nhất 3 phần, kho thứ hai 2 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `3. Tổng của hai số bằng số lớn nhất có hai chữ số. Tỉ số của hai số đó là ${fr(4, 5)}. Tìm hai số đó.`,
      blanks: [{ label: 'Số bé là: ...', answer: '44' }, { label: 'Số lớn là: ...', answer: '55' }],
      hints: ['Số lớn nhất có hai chữ số là 99.', HINT_TONG],
    },
  ],

  // ── Bài 139. Luyện tập (trang 148) ──────────────────────────────────────────────────────────
  'bai-139': [
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: `1. Tìm hai số, biết tổng của chúng bằng 198 và tỉ số của hai số đó là ${fr(3, 8)}.`,
      blanks: [{ label: 'Số bé là: ...', answer: '54' }, { label: 'Số lớn là: ...', answer: '144' }],
      hints: [HINT_TONG],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `2. Một người đã bán được 280 quả cam và quýt, trong đó số cam bằng ${fr(2, 5)} số quýt. Tìm số cam, số quýt đã bán.`,
      blanks: [{ label: 'Số cam đã bán: ... quả', answer: '80' }, { label: 'Số quýt đã bán: ... quả', answer: '200' }],
      hints: [HINT_TONG, 'Số cam 2 phần, số quýt 5 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Lớp 4A và lớp 4B trồng được 330 cây. Lớp 4A có 34 học sinh, lớp 4B có 32 học sinh. Hỏi mỗi lớp trồng được bao nhiêu cây, biết rằng mỗi học sinh đều trồng số cây như nhau?',
      blanks: [{ label: 'Lớp 4A trồng được: ... cây', answer: '170' }, { label: 'Lớp 4B trồng được: ... cây', answer: '160' }],
      hints: ['Tìm số học sinh của cả hai lớp, rồi số cây mỗi học sinh trồng.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `4. Một hình chữ nhật có chu vi là 350m, chiều rộng bằng ${fr(3, 4)} chiều dài. Tìm chiều dài, chiều rộng của hình chữ nhật đó.`,
      blanks: [{ label: 'Chiều dài: ... m', answer: '100' }, { label: 'Chiều rộng: ... m', answer: '75' }],
      hints: ['Nửa chu vi là tổng của chiều dài và chiều rộng: 350 : 2.', 'Chiều rộng 3 phần, chiều dài 4 phần.'],
    },
  ],

  // ── Bài 140. Luyện tập (trang 149) ──────────────────────────────────────────────────────────
  'bai-140': [
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '1. Một sợi dây dài 28m được cắt thành hai đoạn, đoạn thứ nhất dài gấp 3 lần đoạn thứ hai. Hỏi mỗi đoạn dài bao nhiêu mét?',
      blanks: [{ label: 'Đoạn thứ nhất dài: ... m', answer: '21' }, { label: 'Đoạn thứ hai dài: ... m', answer: '7' }],
      hints: ['Đoạn thứ hai 1 phần, đoạn thứ nhất 3 phần như thế.', HINT_TONG],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Một nhóm học sinh có 12 bạn, trong đó số bạn trai bằng một nửa số bạn gái. Hỏi nhóm đó có mấy bạn trai, mấy bạn gái?',
      blanks: [{ label: 'Số bạn trai: ... bạn', answer: '4' }, { label: 'Số bạn gái: ... bạn', answer: '8' }],
      hints: [`Một nửa là ${fr(1, 2)}: bạn trai 1 phần, bạn gái 2 phần.`],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Tổng của hai số là 72. Tìm hai số đó, biết rằng nếu số lớn giảm 5 lần thì được số bé.',
      blanks: [{ label: 'Số bé là: ...', answer: '12' }, { label: 'Số lớn là: ...', answer: '60' }],
      hints: ['Số lớn giảm 5 lần thì được số bé: số lớn gấp 5 lần số bé.', HINT_TONG],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true, img: imgThung,
      q: '4. Nêu bài toán rồi giải bài toán theo sơ đồ sau:',
      blanks: [{ label: 'Thùng 1: ... l', answer: '36' }, { label: 'Thùng 2: ... l', answer: '144' }],
      hints: ['Hai thùng có 180 l, thùng 1 là 1 phần, thùng 2 là 4 phần như thế.'],
    },
  ],

  // ── Bài 141. Luyện tập chung (trang 149) ────────────────────────────────────────────────────
  'bai-141': [
    {
      type: 'fill', stars: 1,
      q: '1. Viết tỉ số của a và b, biết:',
      blanks: [
        ratio('a) a = 3, b = 4: tỉ số của a và b là', 3, 4),
        ratio('b) a = 5m, b = 7m: tỉ số của a và b là', 5, 7),
        ratio('c) a = 12kg, b = 3kg: tỉ số của a và b là', 12, 3),
        ratio('d) a = 6l, b = 8l: tỉ số của a và b là', 6, 8),
      ],
      hints: ['Hai số đo cùng đơn vị: tỉ số là a : b, không ghi đơn vị.'],
    },
    {
      type: 'table', stars: 3, calcFree: true,
      q: '2. Viết số thích hợp vào ô trống:',
      headers: ['Tổng hai số', '72', '120', '45'],
      rows: [
        ['Tỉ số của hai số', fr(1, 5), fr(1, 7), fr(2, 3)],
        ['Số bé', blank(12), blank(15), blank(18)],
        ['Số lớn', blank(60), blank(105), blank(27)],
      ],
      hints: [HINT_TONG],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Hai số có tổng bằng 1080. Tìm hai số đó, biết rằng gấp 7 lần số thứ nhất thì được số thứ hai.',
      blanks: [{ label: 'Số thứ nhất là: ...', answer: '135' }, { label: 'Số thứ hai là: ...', answer: '945' }],
      hints: ['Số thứ nhất 1 phần, số thứ hai 7 phần như thế.', HINT_TONG],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `4. Một hình chữ nhật có nửa chu vi là 125m, chiều rộng bằng ${fr(2, 3)} chiều dài. Tìm chiều dài, chiều rộng của hình đó.`,
      blanks: [{ label: 'Chiều dài: ... m', answer: '75' }, { label: 'Chiều rộng: ... m', answer: '50' }],
      hints: ['Nửa chu vi là tổng của chiều dài và chiều rộng.', 'Chiều rộng 2 phần, chiều dài 3 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '5. Một hình chữ nhật có chu vi là 64m, chiều rộng ngắn hơn chiều dài 8m. Tìm chiều dài, chiều rộng của hình đó.',
      blanks: [{ label: 'Chiều dài: ... m', answer: '20' }, { label: 'Chiều rộng: ... m', answer: '12' }],
      hints: ['Nửa chu vi là tổng của chiều dài và chiều rộng: 64 : 2.', 'Đây là bài toán tổng và hiệu: số lớn = (tổng + hiệu) : 2.'],
    },
  ],

  // ── Bài 142. Tìm hai số khi biết hiệu và tỉ số của hai số đó (trang 150–151) ────────────────
  'bai-142': [
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `1. Số thứ nhất kém số thứ hai là 123. Tỉ số của hai số đó là ${fr(2, 5)}. Tìm hai số đó.`,
      blanks: [{ label: 'Số thứ nhất là: ...', answer: '82' }, { label: 'Số thứ hai là: ...', answer: '205' }],
      hints: [HINT_HIEU, 'Số thứ nhất 2 phần, số thứ hai 5 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `2. Mẹ hơn con 25 tuổi. Tuổi con bằng ${fr(2, 7)} tuổi mẹ. Tính tuổi của mỗi người.`,
      blanks: [{ label: 'Tuổi con: ... tuổi', answer: '10' }, { label: 'Tuổi mẹ: ... tuổi', answer: '35' }],
      hints: [HINT_HIEU, 'Tuổi con 2 phần, tuổi mẹ 7 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `3. Hiệu của hai số bằng số bé nhất có ba chữ số. Tỉ số của hai số đó là ${fr(9, 5)}. Tìm hai số đó.`,
      blanks: [{ label: 'Số thứ nhất (số lớn) là: ...', answer: '225' }, { label: 'Số thứ hai (số bé) là: ...', answer: '125' }],
      hints: ['Số bé nhất có ba chữ số là 100.', HINT_HIEU],
    },
  ],

  // ── Bài 143. Luyện tập (trang 151) ──────────────────────────────────────────────────────────
  'bai-143': [
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: `1. Hiệu của hai số là 85. Tỉ số của hai số đó là ${fr(3, 8)}. Tìm hai số đó.`,
      blanks: [{ label: 'Số bé là: ...', answer: '51' }, { label: 'Số lớn là: ...', answer: '136' }],
      hints: [HINT_HIEU],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `2. Người ta dùng số bóng đèn màu nhiều hơn số bóng đèn trắng là 250 bóng đèn. Tìm số bóng đèn mỗi loại, biết rằng số bóng đèn màu bằng ${fr(5, 3)} số bóng đèn trắng.`,
      blanks: [{ label: 'Bóng đèn màu: ... bóng', answer: '625' }, { label: 'Bóng đèn trắng: ... bóng', answer: '375' }],
      hints: [HINT_HIEU, 'Đèn màu 5 phần, đèn trắng 3 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '3. Lớp 4A có 35 học sinh và lớp 4B có 33 học sinh cùng tham gia trồng cây. Lớp 4A trồng nhiều hơn lớp 4B là 10 cây. Hỏi mỗi lớp trồng được bao nhiêu cây, biết rằng mỗi học sinh đều trồng số cây như nhau?',
      blanks: [{ label: 'Lớp 4A trồng được: ... cây', answer: '175' }, { label: 'Lớp 4B trồng được: ... cây', answer: '165' }],
      hints: ['Lớp 4A nhiều hơn lớp 4B mấy học sinh? Số học sinh đó trồng 10 cây.', 'Tìm số cây mỗi học sinh trồng, rồi nhân với số học sinh mỗi lớp.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true, img: imgHieu72,
      q: '4. Nêu bài toán rồi giải bài toán theo sơ đồ sau:',
      blanks: [{ label: 'Số bé là: ...', answer: '90' }, { label: 'Số lớn là: ...', answer: '162' }],
      hints: ['Đếm số phần của mỗi đoạn: số lớn hơn số bé mấy phần? Mấy phần đó là 72.'],
    },
  ],

  // ── Bài 144. Luyện tập (trang 151) ──────────────────────────────────────────────────────────
  'bai-144': [
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '1. Hiệu của hai số là 30. Số thứ nhất gấp 3 lần số thứ hai. Tìm hai số đó.',
      blanks: [{ label: 'Số thứ nhất là: ...', answer: '45' }, { label: 'Số thứ hai là: ...', answer: '15' }],
      hints: ['Số thứ hai 1 phần, số thứ nhất 3 phần như thế.', HINT_HIEU],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Số thứ hai hơn số thứ nhất là 60. Nếu số thứ nhất gấp lên 5 lần thì được số thứ hai. Tìm hai số đó.',
      blanks: [{ label: 'Số thứ nhất là: ...', answer: '15' }, { label: 'Số thứ hai là: ...', answer: '75' }],
      hints: ['Số thứ nhất 1 phần, số thứ hai 5 phần như thế.', HINT_HIEU],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `3. Một cửa hàng có số gạo nếp ít hơn số gạo tẻ là 540kg. Tính số gạo mỗi loại, biết rằng số gạo nếp bằng ${fr(1, 4)} số gạo tẻ.`,
      blanks: [{ label: 'Gạo nếp: ... kg', answer: '180' }, { label: 'Gạo tẻ: ... kg', answer: '720' }],
      hints: [HINT_HIEU, 'Gạo nếp 1 phần, gạo tẻ 4 phần.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true, img: imgCamDua,
      q: '4. Nêu bài toán rồi giải bài toán theo sơ đồ sau:',
      blanks: [{ label: 'Số cây cam: ... cây', answer: '34' }, { label: 'Số cây dừa: ... cây', answer: '204' }],
      hints: ['Đếm số phần: số cây dừa nhiều hơn số cây cam mấy phần? Mấy phần đó là 170 cây.'],
    },
  ],

  // ── Bài 145. Luyện tập chung (trang 152) ────────────────────────────────────────────────────
  'bai-145': [
    {
      type: 'table', stars: 3, calcFree: true,
      q: '1. Viết số thích hợp vào ô trống:',
      headers: ['Hiệu hai số', 'Tỉ số của hai số', 'Số bé', 'Số lớn'],
      rows: [
        ['15', fr(2, 3), blank(30), blank(45)],
        ['36', fr(1, 4), blank(12), blank(48)],
      ],
      hints: [HINT_HIEU],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: '2. Hiệu của hai số là 738. Tìm hai số đó, biết rằng số thứ nhất giảm 10 lần thì được số thứ hai.',
      blanks: [{ label: 'Số thứ nhất là: ...', answer: '820' }, { label: 'Số thứ hai là: ...', answer: '82' }],
      hints: ['Số thứ nhất gấp 10 lần số thứ hai: số thứ hai 1 phần, số thứ nhất 10 phần.', HINT_HIEU],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Có 10 túi gạo nếp và 12 túi gạo tẻ cân nặng tất cả là 220kg. Biết rằng số gạo trong mỗi túi đều cân nặng bằng nhau. Hỏi có bao nhiêu ki-lô-gam gạo mỗi loại?',
      blanks: [{ label: 'Gạo nếp: ... kg', answer: '100' }, { label: 'Gạo tẻ: ... kg', answer: '120' }],
      hints: ['Tìm tổng số túi gạo, rồi số ki-lô-gam gạo trong một túi.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true, img: imgDuong,
      q: `4. Quãng đường từ nhà An đến trường học dài 840m gồm hai đoạn đường (xem hình vẽ), đoạn đường từ nhà An đến hiệu sách bằng ${fr(3, 5)} đoạn đường từ hiệu sách đến trường học. Tính độ dài mỗi đoạn đường đó.`,
      blanks: [
        { label: 'Đoạn đường từ nhà An đến hiệu sách: ... m', answer: '315' },
        { label: 'Đoạn đường từ hiệu sách đến trường học: ... m', answer: '525' },
      ],
      hints: [HINT_TONG, 'Đoạn thứ nhất 3 phần, đoạn thứ hai 5 phần.'],
    },
  ],

  // ── Bài 146. Luyện tập chung (trang 153) ────────────────────────────────────────────────────
  'bai-146': [
    {
      type: 'fill', stars: 3,
      q: '1. Tính:',
      blanks: [
        fracRes(`a) ${fr(3, 5)} + ${fr(11, 20)}`, 23, 20),
        fracRes(`b) ${fr(5, 8)} − ${fr(4, 9)}`, 13, 72),
        fracRes(`c) ${fr(9, 16)} × ${fr(4, 3)}`, 3, 4),
        fracRes(`d) ${fr(4, 7)} : ${fr(8, 11)}`, 11, 14),
        fracRes(`e) ${fr(3, 5)} + ${fr(4, 5)} : ${fr(2, 5)}`, 13, 5),
      ],
      hints: ['Cộng, trừ hai phân số khác mẫu: quy đồng mẫu số trước. Chia cho một phân số: nhân với phân số đảo ngược.', 'e) Tính phép chia trước rồi mới cộng.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: `2. Tính diện tích của một hình bình hành có độ dài đáy là 18cm, chiều cao bằng ${fr(5, 9)} độ dài đáy.`,
      blanks: [{ label: 'Chiều cao hình bình hành: ... cm', answer: '10' }, { label: 'Diện tích hình bình hành: ... cm²', answer: '180' }],
      hints: [`Chiều cao = 18 × ${fr(5, 9)}.`, 'Diện tích hình bình hành = độ dài đáy × chiều cao.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `3. Một gian hàng có 63 đồ chơi gồm ô tô và búp bê, số búp bê bằng ${fr(2, 5)} số ô tô. Hỏi gian hàng đó có bao nhiêu chiếc ô tô?`,
      blanks: [{ label: 'Số ô tô là: ... chiếc', answer: '45' }],
      hints: [HINT_TONG, 'Búp bê 2 phần, ô tô 5 phần.'],
    },
    {
      type: 'fill', stars: 4, wordProblem: true, calcFree: true,
      q: `4. Năm nay tuổi con ít hơn tuổi bố 35 tuổi và bằng ${fr(2, 9)} tuổi bố. Hỏi năm nay con bao nhiêu tuổi?`,
      blanks: [{ label: 'Tuổi con năm nay: ... tuổi', answer: '10' }],
      hints: [HINT_HIEU, 'Tuổi con 2 phần, tuổi bố 9 phần.'],
    },
    {
      type: 'choice', stars: 2, img: imgHinhH,
      q: '5. Khoanh vào chữ đặt trước hình thích hợp:\nPhân số chỉ phần đã tô màu của hình H bằng phân số chỉ phần đã tô màu của hình:',
      options: ['A', 'B', 'C', 'D'],
      answer: 1,
      hints: [`Hình H tô 1 trong 4 ô, tức là ${fr(1, 4)} hình. Hình nào cũng tô ${fr(1, 4)} số ô?`],
    },
  ],

  // ── Bài 147. Tỉ lệ bản đồ (trang 154–155) ───────────────────────────────────────────────────
  'bai-147': [
    {
      type: 'match', stars: 2,
      q: '1. Trên bản đồ tỉ lệ 1 : 1000, mỗi độ dài 1mm, 1cm, 1dm ứng với độ dài thật nào cho dưới đây?',
      left: [{ id: 'mm', text: '1mm' }, { id: 'cm', text: '1cm' }, { id: 'dm', text: '1dm' }],
      right: [{ id: 'tdm', text: '1000dm' }, { id: 'tcm', text: '1000cm' }, { id: 'tmm', text: '1000mm' }],
      pairs: [['mm', 'tmm'], ['cm', 'tcm'], ['dm', 'tdm']],
      hints: ['Tỉ lệ 1 : 1000: độ dài thật gấp 1000 lần độ dài trên bản đồ, cùng đơn vị đo.'],
    },
    {
      type: 'table', stars: 2,
      q: '2. Viết số thích hợp vào chỗ chấm:',
      // Sách in một bảng 4 cột tỉ lệ; tách đôi để vừa màn hình điện thoại dọc.
      tables: [
        { headers: [TL, '1 : 1000', '1 : 300'], rows: [[TN, '1cm', '1dm'], [DT, unit(1000, 'cm'), unit(300, 'dm')]] },
        { headers: [TL, '1 : 10 000', '1 : 500'], rows: [[TN, '1mm', '1m'], [DT, unit(10000, 'mm'), unit(500, 'm')]] },
      ],
      hints: ['Độ dài thật = độ dài thu nhỏ × số ở mẫu của tỉ lệ (giữ nguyên đơn vị).'],
    },
    {
      type: 'fill', stars: 3,
      q: '3. Đúng ghi Đ, sai ghi S:\nTrên bản đồ tỉ lệ 1 : 10 000, quãng đường từ A đến B đo được 1dm. Như vậy độ dài thật của quãng đường từ A đến B là:',
      blanks: [
        { label: 'a) 10 000m ...', answer: 'S', validate: dsValidate(false) },
        { label: 'b) 10 000dm ...', answer: 'Đ', validate: dsValidate(true) },
        { label: 'c) 10 000cm ...', answer: 'S', validate: dsValidate(false) },
        { label: 'd) 1km ...', answer: 'Đ', validate: dsValidate(true) },
      ],
      hints: ['1dm trên bản đồ ứng với 10 000dm thật. Đổi 10 000dm ra mét, ra ki-lô-mét để so.'],
    },
  ],

  // ── Bài 148. Ứng dụng của tỉ lệ bản đồ (trang 156–157) ──────────────────────────────────────
  'bai-148': [
    {
      type: 'table', stars: 3, calcFree: true,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      headers: [TL, '1 : 500 000', '1 : 15 000', '1 : 2000'],
      rows: [
        [TN, '2cm', '3dm', '50mm'],
        [DT, unit(1000000, 'cm'), unit(45000, 'dm'), unit(100000, 'mm')],
      ],
      hints: ['Độ dài thật = độ dài thu nhỏ × số ở mẫu của tỉ lệ (giữ nguyên đơn vị).'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Trên bản đồ tỉ lệ 1 : 200, chiều dài phòng học lớp em đo được 4cm. Hỏi chiều dài thật của phòng học đó là mấy mét?',
      blanks: [{ label: 'Chiều dài thật của phòng học là: ... m', answer: '8' }],
      hints: ['Tính 4 × 200 (xăng-ti-mét) rồi đổi ra mét.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Trên bản đồ tỉ lệ 1 : 2 500 000, quãng đường Thành phố Hồ Chí Minh - Quy Nhơn đo được 27cm. Tìm độ dài thật của quãng đường Thành phố Hồ Chí Minh - Quy Nhơn.',
      blanks: [{ label: 'Quãng đường Thành phố Hồ Chí Minh - Quy Nhơn dài: ... km', answer: '675' }],
      hints: ['Tính 27 × 2 500 000 (xăng-ti-mét) rồi đổi ra ki-lô-mét: 1km = 100 000cm.'],
    },
  ],

  // ── Bài 149. Ứng dụng của tỉ lệ bản đồ (tiếp theo) (trang 157–158) ──────────────────────────
  'bai-149': [
    {
      type: 'table', stars: 3, calcFree: true,
      q: '1. Viết số thích hợp vào chỗ chấm:',
      headers: [TL, '1 : 10 000', '1 : 5000', '1 : 20 000'],
      rows: [
        [DT, '5km', '25m', '2km'],
        ['Độ dài<br>trên<br>bản đồ', unit(50, 'cm'), unit(5, 'mm'), unit(1, 'dm')],
      ],
      hints: ['Đổi độ dài thật ra đơn vị ghi ở ô (cm, mm, dm) rồi chia cho số ở mẫu của tỉ lệ.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '2. Quãng đường từ bản A đến bản B dài 12km. Trên bản đồ tỉ lệ 1 : 100 000, quãng đường đó dài bao nhiêu xăng-ti-mét?',
      blanks: [{ label: 'Quãng đường trên bản đồ dài: ... cm', answer: '12' }],
      hints: ['Đổi 12km ra xăng-ti-mét rồi chia cho 100 000.'],
    },
    {
      type: 'fill', stars: 3, wordProblem: true, calcFree: true,
      q: '3. Một mảnh đất hình chữ nhật có chiều dài 15m, chiều rộng 10m được vẽ trên bản đồ tỉ lệ 1 : 500. Hỏi trên bản đồ đó, độ dài của mỗi cạnh hình chữ nhật là mấy xăng-ti-mét?',
      blanks: [{ label: 'Chiều dài trên bản đồ: ... cm', answer: '3' }, { label: 'Chiều rộng trên bản đồ: ... cm', answer: '2' }],
      hints: ['Đổi ra xăng-ti-mét: 15m = 1500cm, 10m = 1000cm, rồi chia cho 500.'],
    },
  ],

  // ── Bài 151. Thực hành (tiếp theo) (trang 159): vẽ trên bản đồ → hỏi độ dài trên bản đồ ─────
  'bai-151': [
    {
      type: 'fill', stars: 2, wordProblem: true,
      q: '1. Chiều dài bảng của lớp học là 3m. Em hãy vẽ đoạn thẳng biểu thị chiều dài bảng đó trên bản đồ có tỉ lệ 1 : 50.',
      blanks: [{ label: 'Đoạn thẳng trên bản đồ dài: ... cm', answer: '6' }],
      hints: ['Đổi 3m = 300cm, rồi chia cho 50.'],
      // ✏️ làm đúng rồi mới vẽ (độ dài trên bản đồ là đáp số)
      drawAfter: true,
      drawPlay: { title: 'đoạn thẳng AB biểu thị chiều dài bảng', steps: [{ seg: 'AB', at: [1.2, 2.4], dir: 0, len: 6, say: 'Vẽ đoạn thẳng <b>AB = 6 cm</b> biểu thị chiều dài bảng trên bản đồ.' }] },
    },
    {
      type: 'fill', stars: 3, wordProblem: true,
      q: '2. Nền của một phòng học là hình chữ nhật có chiều dài 8m, chiều rộng 6m. Em hãy vẽ hình chữ nhật biểu thị nền phòng học đó trên bản đồ có tỉ lệ 1 : 200.',
      blanks: [{ label: 'Chiều dài hình chữ nhật trên bản đồ: ... cm', answer: '4' }, { label: 'Chiều rộng hình chữ nhật trên bản đồ: ... cm', answer: '3' }],
      hints: ['Đổi ra xăng-ti-mét: 8m = 800cm, 6m = 600cm, rồi chia cho 200.'],
      drawAfter: true,
      drawPlay: { rect: [4, 3], title: 'hình chữ nhật biểu thị nền phòng học' },
    },
  ],
};
