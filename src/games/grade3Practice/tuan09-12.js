/**
 * Luyện tập Toán 3 — Tập một: Tuần 9–12 (sách trang 32–44).
 * Bỏ qua: Tuần 9 Tiết 1 bài 1 (vẽ hình theo mẫu trên lưới ô vuông — vẽ tự do).
 */
import {
  blank, listValidate, setValidate, dsValidate, letterValidate, divBlank, mau, stripVN,
} from '../grade3Workbook.js';
import imgT9T1Frames from '../../assets/grade3-practice/tuan9_t1_q2_frames.svg';
import imgT9T1Cube from '../../assets/grade3-practice/tuan9_t1_q4_cube.svg';
import imgT9T2Box from '../../assets/grade3-practice/tuan9_t2_q2_box.svg';
import imgT9T3Rubik from '../../assets/grade3-practice/tuan9_t3_q4_rubik.png';
import imgT12T1Diagram from '../../assets/grade3-practice/tuan12_t1_q3_diagram.svg';

// Long division laid out "theo mẫu" (Tuần 10 Tiết 2 bài 2): the book's blanks
// are the product written under the dividend, the quotient and the remainder.
function divSteps(dividend, divisor) {
  const quot = Math.floor(dividend / divisor);
  const rem = dividend % divisor;
  return { quot, rem, prod: quot * divisor };
}
function divStepBlank(prefix, dividend, divisor, tail = '') {
  const { quot, rem, prod } = divSteps(dividend, divisor);
  const extra = tail === 'eq' ? [quot, rem] : tail === 'full' ? [dividend, divisor, quot, rem] : [];
  const tailLabel = tail === 'eq' ? `; ${dividend} : ${divisor} = ... (dư ...)`
    : tail === 'full' ? '; ... : ... = ... (dư ...)' : '';
  const parts = [prod, quot, rem, ...extra].map(String);
  return {
    label: `${prefix}${dividend} | ${divisor}: viết ... dưới ${dividend}, thương ..., số dư ...${tailLabel}`,
    answer: parts.join(','),
    validate: listValidate(parts),
  };
}

// "Trong các phép chia có dư, số dư bao giờ cũng ... số chia." — "bé hơn" or
// its synonym "nhỏ hơn", with or without accents.
const smallerValidate = (value) => ['behon', 'nhohon'].includes(stripVN(value).replace(/[^a-z]/g, ''));

export const WEEKS_9_12 = [
  {
    id: 'tuan-9', number: 9, title: 'Khối lập phương, khối hộp chữ nhật. Nhân số có hai chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgT9T1Frames,
        q: '2. Tô màu đỏ vào các cạnh, màu vàng vào các mặt, vẽ các chấm màu xanh vào các đỉnh của các chiếc khung dạng khối lập phương và khối hộp chữ nhật bên.\n(Đếm xem mỗi chiếc khung có bao nhiêu cạnh, bao nhiêu mặt và bao nhiêu đỉnh cần tô.)',
        blanks: [
          { label: 'Khung dạng khối lập phương: ... cạnh, ... mặt, ... đỉnh', answer: '12,6,8', validate: listValidate(['12', '6', '8']) },
          { label: 'Khung dạng khối hộp chữ nhật: ... cạnh, ... mặt, ... đỉnh', answer: '12,6,8', validate: listValidate(['12', '6', '8']) },
        ],
        hints: ['Khối lập phương và khối hộp chữ nhật đều có 12 cạnh, 6 mặt và 8 đỉnh.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Đ, S?',
        blanks: [
          { label: 'a) Khối lập phương có các mặt đều là hình vuông.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Khối hộp chữ nhật và khối lập phương có cùng số đỉnh.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Khối lập phương và khối hộp chữ nhật khác nhau về số cạnh.', answer: 'S', validate: dsValidate(false) },
          { label: 'd) Khối lập phương và khối hộp chữ nhật đều có 6 mặt.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Cả hai khối đều có 8 đỉnh, 12 cạnh và 6 mặt.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT9T1Cube,
        q: '4. Viết số thích hợp vào chỗ chấm.\nĐể làm một chiếc khung sắt dạng khối lập phương, bác thợ phải sử dụng các thanh sắt dài bằng nhau làm cạnh của chiếc khung. Biết mỗi cạnh của chiếc khung được làm từ một thanh sắt dài 5 dm.',
        blanks: [{ label: 'Vậy bác thợ cần chuẩn bị tất cả ... thanh sắt 5 dm để làm xong chiếc khung.', answer: '12' }],
        hints: ['Khối lập phương có 12 cạnh, mỗi cạnh là một thanh sắt.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. a) Hãy vẽ hình vuông MNPQ và hình vuông NXYP trên lưới ô vuông.\nb) Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình vẽ ở câu a:',
        blanks: [
          { label: '• Điểm N là điểm ở giữa hai điểm ... và ...', answer: 'M,X', validate: setValidate(['M', 'X']) },
          { label: '• Điểm ... là trung điểm của đoạn thẳng QY.', answer: 'P', validate: letterValidate('P') },
        ],
        hints: ['Hai hình vuông MNPQ và NXYP có chung cạnh NP, nên M, N, X thẳng hàng và Q, P, Y thẳng hàng; QP = PY vì đều là cạnh hình vuông.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT9T2Box,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nBạn Nguyên cần cắt và dán các tờ giấy màu lên các mặt của một chiếc hộp dạng khối lập phương. Biết rằng mỗi tờ giấy màu cần dán vừa khít một mặt của khối lập phương.',
        blanks: [
          { label: 'a) Nguyên cần cắt ... tờ giấy màu hình vuông.', answer: '6' },
          { label: 'b) Ở gần mỗi đỉnh của chiếc hộp, Nguyên cắt và dán 3 bông hoa giấy lên đó. Vậy Nguyên cần cắt và dán tất cả ... bông hoa giấy.', answer: '24' },
        ],
        hints: ['Khối lập phương có 6 mặt và 8 đỉnh; 8 đỉnh, mỗi đỉnh 3 bông hoa: 3 × 8.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. a) Tính.\nb) Tính nhẩm.',
        blanks: [
          { label: 'a) 21 × 3 =', answer: '63' }, { label: 'a) 34 × 2 =', answer: '68' },
          { label: 'a) 11 × 8 =', answer: '88' }, { label: 'a) 68 × 1 =', answer: '68' },
          { label: 'b) 20 × 4 =', answer: '80' }, { label: 'b) 30 × 3 =', answer: '90' },
          { label: 'b) 40 × 2 =', answer: '80' }, { label: 'b) 80 × 1 =', answer: '80' },
        ],
        hints: ['Nhân hàng đơn vị trước rồi nhân hàng chục. Tính nhẩm: 2 chục × 4 = 8 chục.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết số thích hợp vào chỗ chấm.\nGia đình bác Lâm làm nghề thủ công. Bác đang cần làm 4 chiếc đèn lồng có dạng khối lập phương. Mỗi cạnh làm từ một nan tre.',
        blanks: [{ label: 'Vậy bác Lâm cần chuẩn bị ... nan tre như vậy.', answer: '48' }],
        hints: ['Mỗi chiếc đèn lồng có 12 cạnh: 12 × 4.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Viết số thích hợp vào chỗ chấm.\nNgười ta làm một chiếc khung bằng nhôm có dạng khối hộp chữ nhật, mỗi cạnh làm từ một thanh nhôm. Sau đó ghép các tấm kính vừa các mặt của khung nhôm để tạo thành một chiếc tủ kính.',
        blanks: [
          { label: 'a) Để làm xong chiếc tủ kính đó, người ta phải chuẩn bị ... thanh nhôm và ... tấm kính.', answer: '12,6', validate: listValidate(['12', '6']) },
          { label: 'b) Bạn Nguyên đếm các hình chữ nhật của chiếc tủ kính vừa làm được. Vậy Nguyên đếm được ... hình chữ nhật.', answer: '6' },
        ],
        hints: ['Khối hộp chữ nhật có 12 cạnh và 6 mặt; mỗi mặt là một hình chữ nhật.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [
          { id: 'a', text: '12 × 4' }, { id: 'b', text: '14 × 2' }, { id: 'c', text: '20 × 3' },
          { id: 'd', text: '23 × 3' }, { id: 'e', text: '80 × 1' },
        ],
        right: [
          { id: 'r60', text: '60' }, { id: 'r48', text: '48' }, { id: 'r80', text: '80' },
          { id: 'r28', text: '28' }, { id: 'r69', text: '69' },
        ],
        pairs: [['a', 'r48'], ['b', 'r28'], ['c', 'r60'], ['d', 'r69'], ['e', 'r80']],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Mẹ mua về 3 hộp bánh sô-cô-la, mỗi hộp có 12 cái bánh. Hỏi mẹ mua về bao nhiêu cái bánh sô-cô-la?',
        wordProblem: true,
        blanks: [{ label: 'Số cái bánh sô-cô-la', answer: '36' }],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT9T3Rubik,
        q: '4. Viết số thích hợp vào chỗ chấm.\nMột khối ru-bích có dạng khối lập phương (như hình vẽ), các mặt được sơn bởi các màu khác nhau.',
        blanks: [
          { label: 'a) Người ta đã dùng ... màu khác nhau để sơn các mặt của khối ru-bích đó.', answer: '6' },
          { label: 'b) Mỗi mặt của khối ru-bích có ... hình vuông nhỏ như nhau. Các mặt của khối ru-bích đó có tất cả ... hình vuông nhỏ.', answer: '4,24', validate: listValidate(['4', '24']) },
        ],
        hints: ['Khối lập phương có 6 mặt; mỗi mặt có 4 hình vuông nhỏ nên có 4 × 6 hình vuông nhỏ.'],
      },
    ],
  },
  {
    id: 'tuan-10', number: 10, title: 'Gấp một số lên một số lần. Phép chia hết, phép chia có dư',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          { label: '15 × 6 =', answer: '90' }, { label: '49 × 2 =', answer: '98' },
          { label: '28 × 3 =', answer: '84' }, { label: '12 × 8 =', answer: '96' },
        ],
        hints: ['Viết thừa số thứ hai dưới hàng đơn vị của thừa số thứ nhất, nhân từ phải sang trái, nhớ sang hàng chục nếu cần.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        headers: ['Số đã cho', 'Thêm vào số đã cho 9 đơn vị', 'Gấp số đã cho lên 9 lần'],
        rows: [
          [3, blank(12), blank(27)],
          [9, blank(18), blank(81)],
          [11, blank(20), blank(99)],
          [6, blank(15), blank(54)],
        ],
        hints: ['"Thêm 9 đơn vị" là cộng 9; "gấp lên 9 lần" là nhân với 9.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi bàn xếp 12 cái bát, Mai phải xếp bát vào 5 bàn như vậy. Hỏi Mai cần bao nhiêu cái bát?',
        wordProblem: true,
        blanks: [{ label: 'Số cái bát', answer: '60' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.\na) Chuồng thứ nhất có 12 con gà, chuồng thứ hai có số con gà gấp 2 lần chuồng thứ nhất. Vậy số gà ở chuồng thứ hai là ....... con.\nb) Đàn vịt có 26 con ở trên bờ và số vịt đang bơi ở dưới ao gấp 3 lần số vịt ở trên bờ. Vậy số vịt cả đàn là ....... con.',
        blanks: [
          { label: 'a) Số gà ở chuồng thứ hai là ... con.', answer: '24' },
          { label: 'b) Số vịt cả đàn là ... con.', answer: '104' },
        ],
        hints: ['a) 12 × 2.', 'b) Số vịt dưới ao: 26 × 3 = 78; cả đàn: 26 + 78.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: '8 —gấp 5 lần→ ...', answer: '40' },
          { label: '7 —gấp 9 lần→ ...', answer: '63' },
          { label: '18 —gấp 3 lần→ ...', answer: '54' },
          { label: '35 —gấp 2 lần→ ...', answer: '70' },
        ],
        hints: ['"Gấp ... lần" là nhân với số lần.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm (theo mẫu).\na) ' + mau('20 | 5: viết 20 dưới 20, thương 4, số dư 0') + '\nb) ' + mau('21 | 5: viết 20 dưới 21, thương 4, số dư 1; 21 : 5 = 4 (dư 1)'),
        blanks: [
          divStepBlank('a) ', 21, 3),
          divStepBlank('a) ', 36, 4),
          divStepBlank('a) ', 56, 8),
          divStepBlank('b) ', 30, 4, 'eq'),
          divStepBlank('b) ', 57, 6, 'full'),
        ],
        hints: ['Tìm thương lớn nhất sao cho thương × số chia không vượt quá số bị chia; viết tích đó dưới số bị chia rồi trừ để được số dư.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Có 40 bông hoa cắm vào các lọ, mỗi lọ 7 bông. Hỏi cắm được bao nhiêu lọ hoa và còn thừa mấy bông hoa?',
        wordProblem: true,
        blanks: [
          { label: 'Số lọ hoa', answer: '5' },
          { label: 'Số bông hoa còn thừa', answer: '5' },
        ],
        hints: ['40 : 7 = 5 (dư 5).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Đ, S?',
        blanks: [
          { label: 'a) 14 chia cho 4 được: 2 (dư 6)', answer: 'S', validate: dsValidate(false) },
          { label: 'a) 14 chia cho 4 được: 3 (dư 2)', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) 52 chia cho 6 được: 9 (dư 2)', answer: 'S', validate: dsValidate(false) },
          { label: 'b) 52 chia cho 6 được: 8 (dư 4)', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) 68 chia cho 9 được: 7 (dư 5)', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) 68 chia cho 9 được: 8 (dư 4)', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Số dư phải bé hơn số chia, và thương × số chia + số dư phải bằng số bị chia.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '1. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [
          { id: 't1', text: '18 × 1' }, { id: 't2', text: '24 : 6' }, { id: 't3', text: '42 × 2' }, { id: 't4', text: '36 × 2' },
        ],
        middle: [
          { id: 'm84', text: '84' }, { id: 'm4', text: '4' }, { id: 'm72', text: '72' }, { id: 'm18', text: '18' },
        ],
        right: [
          { id: 'b1', text: '32 : 8' }, { id: 'b2', text: '18 : 1' }, { id: 'b3', text: '21 × 4' }, { id: 'b4', text: '18 × 4' },
        ],
        pairs: [
          ['t1', 'm18'], ['t2', 'm4'], ['t3', 'm84'], ['t4', 'm72'],
          ['m4', 'b1'], ['m18', 'b2'], ['m84', 'b3'], ['m72', 'b4'],
        ],
        hints: ['Mỗi kết quả ở giữa được nối với một phép tính ở hàng trên và một phép tính ở hàng dưới.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Số?',
        rows: [
          ['Số đã cho', 4, 6, 11, 15],
          ['Thêm vào số đã cho 6 đơn vị', 10, blank(12), blank(17), blank(21)],
          ['Gấp số đã cho lên 6 lần', 24, blank(36), blank(66), blank(90)],
        ],
        hints: ['"Thêm 6 đơn vị" là cộng 6 (4 + 6 = 10); "gấp lên 6 lần" là nhân với 6 (4 × 6 = 24).'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Mẹ mua 5 kg gạo nếp và mua số gạo tẻ gấp 4 lần số gạo nếp. Hỏi:\na) Mẹ mua bao nhiêu ki-lô-gam gạo tẻ?\nb) Mẹ mua tất cả bao nhiêu ki-lô-gam gạo tẻ và gạo nếp?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số ki-lô-gam gạo tẻ', answer: '20' },
          { label: 'b) Số ki-lô-gam gạo tẻ và gạo nếp', answer: '25' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong các phép chia dưới đây, phép chia nào có số dư là 3?',
        options: ['17 : 2', '17 : 4', '17 : 3', '17 : 7'],
        answer: 3,
        hints: ['17 : 2 = 8 (dư 1); 17 : 4 = 4 (dư 1); 17 : 3 = 5 (dư 2); 17 : 7 = 2 (dư 3).'],
      },
    ],
  },
  {
    id: 'tuan-11', number: 11, title: 'Chia số có hai chữ số cho số có một chữ số. Giảm một số đi một số lần',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(28, 2), divBlank(39, 3), divBlank(84, 4), divBlank(34, 3), divBlank(75, 5), divBlank(90, 6)],
        hints: ['Chia lần lượt từ trái sang phải: chia hàng chục trước, rồi hạ hàng đơn vị xuống để chia tiếp.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Tính rồi viết số thích hợp vào chỗ chấm (theo mẫu).\n' + mau('52 : 3 = 17 (dư 1)'),
        blanks: [divBlank(65, 4), divBlank(89, 7)],
        hints: ['65 : 4: 6 : 4 = 1 dư 2, hạ 5 được 25, 25 : 4 = 6 dư 1.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Bà Sáu đem 65 quả chanh ra chợ bán, bà chia đều số chanh đó vào 5 túi. Hỏi mỗi túi có bao nhiêu quả chanh?',
        wordProblem: true,
        blanks: [{ label: 'Số quả chanh mỗi túi', answer: '13' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.\na) Cho phép chia 69 : 5. Tìm tổng của số bị chia, số chia, thương và số dư của phép chia đó.\nb) Một phép chia có thương bằng 5, số chia là 7, số dư là 3. Tìm số bị chia của phép chia đó.',
        blanks: [
          { label: 'a) Đáp số: ...', answer: '91' },
          { label: 'b) Đáp số: ...', answer: '38' },
        ],
        hints: ['a) 69 : 5 = 13 (dư 4); 69 + 5 + 13 + 4.', 'b) Số bị chia = thương × số chia + số dư = 5 × 7 + 3.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '1. Nối hai phép tính có cùng kết quả.',
        left: [
          { id: 'a', text: '15 × 3' }, { id: 'b', text: '15 × 2' }, { id: 'c', text: '14 × 3' }, { id: 'd', text: '11 × 3' },
        ],
        right: [
          { id: 'r42', text: '84 : 2' }, { id: 'r33', text: '99 : 3' }, { id: 'r30', text: '60 : 2' }, { id: 'r45', text: '90 : 2' },
        ],
        pairs: [['a', 'r45'], ['b', 'r30'], ['c', 'r42'], ['d', 'r33']],
        hints: ['15 × 3 = 45, 15 × 2 = 30, 14 × 3 = 42, 11 × 3 = 33; 84 : 2 = 42, 99 : 3 = 33, 60 : 2 = 30, 90 : 2 = 45.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?',
        blanks: [
          { label: '18 —giảm 2 lần→ ...', answer: '9' },
          { label: '28 —giảm 4 lần→ ...', answer: '7' },
          { label: '33 —gấp 3 lần→ ...', answer: '99' },
          { label: '36 —giảm 6 lần→ ...', answer: '6' },
          { label: '81 —giảm 9 lần→ ...', answer: '9' },
          { label: '18 —gấp 5 lần→ ...', answer: '90' },
        ],
        hints: ['"Giảm ... lần" là chia cho số lần; "gấp ... lần" là nhân với số lần.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Lúc đầu trong thùng có 72 kg gạo, sau khi bán đi một số ki-lô-gam gạo thì số gạo còn lại trong thùng so với lúc đầu giảm đi 8 lần. Hỏi trong thùng còn lại bao nhiêu ki-lô-gam gạo?',
        wordProblem: true,
        blanks: [{ label: 'Số ki-lô-gam gạo còn lại', answer: '9' }],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nNgười ta nhốt 53 con thỏ vào các chuồng, mỗi chuồng chứa được nhiều nhất 5 con. Hỏi cần ít nhất bao nhiêu chuồng để nhốt hết số thỏ đó?',
        options: ['8 chuồng', '9 chuồng', '10 chuồng', '11 chuồng'],
        answer: 3,
        hints: ['53 : 5 = 10 (dư 3): 10 chuồng nhốt được 50 con, còn 3 con cần thêm 1 chuồng nữa.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính rồi viết (theo mẫu).\n' + mau('39 : 4 = 9 (dư 3)'),
        blanks: [divBlank(13, 2), divBlank(35, 6), divBlank(43, 5)],
        hints: ['Số dư luôn phải bé hơn số chia.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Số?',
        rows: [
          ['Phép chia', '31 : 3', '74 : 4', '26 : 5', '87 : 8'],
          ['Thương', blank(10), blank(18), blank(5), blank(10)],
          ['Số dư', blank(1), blank(2), blank(1), blank(7)],
        ],
        hints: ['31 : 3 = 10 (dư 1); 74 : 4 = 18 (dư 2); 26 : 5 = 5 (dư 1); 87 : 8 = 10 (dư 7).'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Năm nay, bố bạn Mai 40 tuổi. Tuổi bố giảm đi 5 lần thì được tuổi Mai, tuổi Mai gấp lên 9 lần thì được tuổi ông nội.\na) Tính tuổi của Mai và tuổi của ông nội.\nb) Ông nội hơn bố bạn Mai bao nhiêu tuổi?',
        wordProblem: true,
        blanks: [
          { label: 'a) Tuổi của Mai', answer: '8' },
          { label: 'a) Tuổi của ông nội', answer: '72' },
          { label: 'b) Ông nội hơn bố bạn Mai (tuổi)', answer: '32' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nTìm một số, biết số đó giảm đi 7 lần rồi gấp lên 5 lần thì được 35.',
        options: ['7', '14', '25', '49'],
        answer: 3,
        hints: ['Làm ngược lại: 35 : 5 = 7, rồi 7 × 7 = 49.'],
      },
    ],
  },
  {
    id: 'tuan-12', number: 12, title: 'Bài toán giải bằng hai bước tính. Luyện tập chung. Mi-li-mét',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Một cửa hàng buổi sáng bán được 48 kg bột mì, buổi chiều bán được ít hơn buổi sáng 8 kg bột mì. Hỏi trong cả hai buổi, cửa hàng đã bán được bao nhiêu ki-lô-gam bột mì?',
        wordProblem: true,
        blanks: [{ label: 'Số ki-lô-gam bột mì cả hai buổi', answer: '88' }],
        hints: ['Buổi chiều: 48 − 8 = 40 (kg); cả hai buổi: 48 + 40.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Trong vườn bác Sáu trồng 25 cây bưởi, số cây cam bác trồng nhiều hơn số cây bưởi là 16 cây. Hỏi bác Sáu trồng trong vườn bao nhiêu cây cam và cây bưởi?',
        wordProblem: true,
        blanks: [{ label: 'Số cây cam và cây bưởi', answer: '66' }],
        hints: ['Số cây cam: 25 + 16 = 41; cả cam và bưởi: 41 + 25.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT12T1Diagram,
        q: '3. Giải bài toán theo tóm tắt sau:',
        wordProblem: true,
        blanks: [{ label: 'Số quả cam cả hai thùng', answer: '72' }],
        hints: ['Thùng 2 gồm 3 đoạn bằng thùng 1: 18 × 3 = 54 (quả); cả hai thùng: 18 + 54.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Một đội công nhân ngày thứ nhất sửa được 32 m mương, ngày thứ hai do được tăng cường thêm người nên đội công nhân sửa được số mét mương gấp đôi ngày thứ nhất. Hỏi cả hai ngày, đội công nhân đó sửa được bao nhiêu mét mương?',
        wordProblem: true,
        blanks: [{ label: 'Số mét mương cả hai ngày', answer: '96' }],
        hints: ['Ngày thứ hai: 32 × 2 = 64 (m); cả hai ngày: 32 + 64.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: '24 —giảm 3 lần→ ...', answer: '8' },
          { label: '60 —giảm 6 lần→ ...', answer: '10' },
          { label: '12 —gấp 8 lần→ ...', answer: '96' },
          { label: '96 —giảm 8 lần→ ...', answer: '12' },
          { label: '49 —gấp 2 lần→ ...', answer: '98' },
          { label: '18 —gấp 4 lần→ ...', answer: '72' },
        ],
        hints: ['"Giảm ... lần" là chia cho số lần; "gấp ... lần" là nhân với số lần.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Số dư lớn nhất trong các phép chia có dư với số chia là 7 là ...', answer: '6' },
          { label: 'b) Số dư lớn nhất trong các phép chia có dư với số chia là 8 là ...', answer: '7' },
          { label: 'c) Số dư lớn nhất trong các phép chia có dư với số chia là 9 là ...', answer: '8' },
          { label: 'd) Trong các phép chia có dư, số dư bao giờ cũng ... số chia.', answer: 'bé hơn', validate: smallerValidate },
        ],
        hints: ['Số dư luôn bé hơn số chia, nên số dư lớn nhất bằng số chia trừ đi 1.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Người ta dùng 80 m vải để may quần áo, mỗi bộ quần áo hết 3 m vải. Hỏi may được nhiều nhất bao nhiêu bộ quần áo và còn thừa mấy mét vải?',
        wordProblem: true,
        blanks: [
          { label: 'Số bộ quần áo may được nhiều nhất', answer: '26' },
          { label: 'Số mét vải còn thừa', answer: '2' },
        ],
        hints: ['80 : 3 = 26 (dư 2).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Quang có 29 viên bi, số bi của Quân gấp 3 lần số bi của Quang. Hỏi:\na) Cả hai bạn có bao nhiêu viên bi?\nb) Quân cần cho Quang bao nhiêu viên bi để số bi của hai bạn bằng nhau?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số viên bi của cả hai bạn', answer: '116' },
          { label: 'b) Số viên bi Quân cần cho Quang', answer: '29' },
        ],
        hints: ['Quân có 29 × 3 = 87 viên bi; cả hai có 29 + 87 = 116 viên.', 'Khi bằng nhau mỗi bạn có 116 : 2 = 58 viên, nên Quân cho Quang 87 − 58 viên.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính.',
        blanks: [
          { label: '25 × 2 =', answer: '50' },
          { label: '36 : 2 =', answer: '18' },
          { label: '17 × 4 =', answer: '68' },
          { label: '68 : 4 =', answer: '17' },
          { label: '84 : 6 =', answer: '14' },
          { label: '32 × 3 =', answer: '96' },
        ],
        hints: ['Đi theo chiều mũi tên từ chiếc ô tô đến bãi đỗ xe, tính lần lượt từng ô.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Số?',
        rows: [
          ['Số đã cho', 48, 88, 96, 72],
          ['Giảm số đã cho đi 8 lần', 6, blank(11), blank(12), blank(9)],
          ['Bớt số đã cho 8 đơn vị', 40, blank(80), blank(88), blank(64)],
        ],
        hints: ['"Giảm đi 8 lần" là chia cho 8 (48 : 8 = 6); "bớt 8 đơn vị" là trừ 8 (48 − 8 = 40).'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Mai có một số cuốn sách, bạn ấy đã xếp lên 3 ngăn của giá sách, mỗi ngăn 20 cuốn và vẫn còn thừa ra 12 cuốn nữa. Hỏi Mai có tất cả bao nhiêu cuốn sách?',
        wordProblem: true,
        blanks: [{ label: 'Số cuốn sách', answer: '72' }],
        hints: ['Số sách trên giá: 20 × 3 = 60 (cuốn); tất cả: 60 + 12.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Viết số thích hợp vào chỗ chấm.\nTìm một số, biết rằng nếu gấp số đó lên 8 lần rồi giảm đi 3 lần thì được số 16.',
        blanks: [{ label: 'Số đó là ...', answer: '6' }],
        hints: ['Làm ngược lại: 16 × 3 = 48, rồi 48 : 8 = 6.'],
      },
    ],
  },
];
