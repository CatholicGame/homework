/**
 * Luyện tập Toán 3 — Tập một: Tuần 13–15 (sách trang 45–54).
 */
import {
  dsValidate, divBlank, exprValidate, letterValidate, phraseValidate,
  phraseOrderValidate, setValidate, stripVN, tempValidate, unitValidate,
} from '../grade3Workbook.js';
import imgT13T1Scales from '../../assets/grade3-practice/tuan13_t1_q2_scales.png';
import imgT13Bird from '../../assets/grade3-practice/tuan13_t1_q4_bird.png';
import imgT13Pig from '../../assets/grade3-practice/tuan13_t1_q4_pig.png';
import imgT13Dog from '../../assets/grade3-practice/tuan13_t1_q4_dog.png';
import imgT13Buffalo from '../../assets/grade3-practice/tuan13_t1_q4_buffalo.png';
import imgT13T2Jug from '../../assets/grade3-practice/tuan13_t2_q1_jug.png';
import imgT13T3Coffee from '../../assets/grade3-practice/tuan13_t3_q4_coffee.png';
import imgT14T1Temps from '../../assets/grade3-practice/tuan14_t1_q1_temps.svg';
import imgT14T1Scales from '../../assets/grade3-practice/tuan14_t1_q3_scales.png';
import imgT14T2Jug from '../../assets/grade3-practice/tuan14_t2_q3_jug.png';
import imgT14T3Scales from '../../assets/grade3-practice/tuan14_t3_q1_scales.png';
import imgT15Monkey from '../../assets/grade3-practice/tuan15_t2_q2_monkey.png';
import imgT15Gazelle from '../../assets/grade3-practice/tuan15_t2_q2_gazelle.png';
import imgT15Lion from '../../assets/grade3-practice/tuan15_t2_q2_lion.png';
import imgT15Horse from '../../assets/grade3-practice/tuan15_t2_q2_horse.png';
import imgT15Animals from '../../assets/grade3-practice/tuan15_t2_q4_animals.png';

// Tuần 13 Tiết 2 Q3 a) "người ta thường dùng ......": "nhiệt kế", also written
// as "cái nhiệt kế" / "nhiet ke".
const thermometerValidate = (value) => /nhietke/.test(stripVN(value).replace(/[^a-z]/g, ''));

// Tuần 13 Tiết 2 Q3 a) "Nhiệt độ bình thường của cơ thể em khoảng ...... °C":
// a healthy body temperature is about 36–37 °C, so either is accepted.
const bodyTempValidate = (value) => tempValidate(36)(value) || tempValidate(37)(value);

// Tuần 13 Tiết 3 Q4 c) "ta chọn ...... hoặc ......": the two ways to make
// 800 g are packets A và D, or A, B và C. Each line accepts either way (the
// two lines may be filled in either order); words like "gói", "và" are ignored.
const packetsOf = (value) => {
  const letters = stripVN(value).replace(/\b(goi|va|hoac|ta|chon)\b/g, ' ').match(/[a-d]/g) || [];
  return [...new Set(letters)].sort().join('');
};
const coffee800Validate = (value) => ['ad', 'abc'].includes(packetsOf(value));

// Tuần 14 Tiết 3 Q2 a) "vào buổi ......": "trưa" or "buổi trưa".
const noonValidate = (value) => stripVN(value).replace(/[^a-z]/g, '').replace(/^buoi/, '') === 'trua';

export const WEEKS_13_15 = [
  {
    id: 'tuan-13', number: 13, title: 'Mi-li-mét (tiếp theo). Gam. Mi-li-lít. Nhiệt độ. Thực hành và trải nghiệm',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. a) Viết mm hoặc cm thích hợp vào chỗ chấm.\nb) Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Con kiến dài khoảng 3 ...', answer: 'mm', validate: phraseValidate('mm') },
          { label: 'a) Con ong dài khoảng 3 ...', answer: 'cm', validate: phraseValidate('cm') },
          { label: 'b) 1 cm = ... mm', answer: '10' },
          { label: 'b) 10 mm = ... cm', answer: '1' },
          { label: 'b) 2 cm = ... mm', answer: '20' },
          { label: 'b) 1 m = ... cm', answer: '100' },
          { label: 'b) 1 m = ... mm', answer: '1000' },
          { label: 'b) 5 cm = ... mm', answer: '50' },
        ],
        hints: [
          'a) Con kiến rất nhỏ, chỉ dài bằng vài mi-li-mét; con ong to hơn nhiều, dài khoảng bằng một đốt ngón tay.',
          'b) 1 cm = 10 mm, 1 m = 100 cm = 1000 mm.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT13T1Scales,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Túi bột ngọt cân nặng ... g.', answer: '700' },
          { label: 'Túi cam cân nặng ... g.', answer: '750' },
        ],
        hints: [
          'Cân thăng bằng nên túi bột ngọt nặng bằng hai quả cân: 500 g + 200 g.',
          'Ở cân đồng hồ: 1 kg ở trên cùng, 250 g bên phải, 500 g ở dưới, 750 g bên trái. Xem kim chỉ vào số nào.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. a) Viết số thích hợp vào chỗ chấm.\nb) Tính.',
        blanks: [
          { label: 'a) 1 kg = ... g', answer: '1000' },
          { label: 'a) 1 000 g = ... kg', answer: '1' },
          { label: 'b) 10 g + 40 g =', answer: '50 g', validate: unitValidate(50, 'g') },
          { label: 'b) 200 g + 500 g =', answer: '700 g', validate: unitValidate(700, 'g') },
          { label: 'b) 17 g × 4 =', answer: '68 g', validate: unitValidate(68, 'g') },
          { label: 'b) 65 g : 5 =', answer: '13 g', validate: unitValidate(13, 'g') },
        ],
        hints: ['1 kg = 1000 g. Tính như với các số tự nhiên rồi viết thêm đơn vị g vào kết quả.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '4. Nối mỗi con vật với số cân nặng thích hợp.',
        left: [
          { id: 'bird', img: imgT13Bird },
          { id: 'pig', img: imgT13Pig },
          { id: 'dog', img: imgT13Dog },
          { id: 'buffalo', img: imgT13Buffalo },
        ],
        right: [
          { id: 'w3kg', text: '3 kg' },
          { id: 'w300g', text: '300 g' },
          { id: 'w300kg', text: '300 kg' },
          { id: 'w30kg', text: '30 kg' },
        ],
        pairs: [['bird', 'w300g'], ['pig', 'w30kg'], ['dog', 'w3kg'], ['buffalo', 'w300kg']],
        hints: ['Xếp các con vật từ nhẹ đến nặng (chim, chó con, lợn, trâu) rồi xếp các số cân nặng từ bé đến lớn: 300 g < 3 kg < 30 kg < 300 kg.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT13T2Jug,
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 1 l = ... ml', answer: '1000' },
          { label: 'a) 1 000 ml = ... l', answer: '1' },
          { label: 'b) Rót hết nước trong bình ra được 3 ca như hình vẽ dưới đây.<br>Lúc đầu trong bình có ... ml nước.', answer: '1000' },
        ],
        hints: ['b) Cộng lượng nước ở cả 3 ca: 500 ml + 300 ml + 200 ml.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính.',
        blanks: [
          { label: '15 ml + 34 ml =', answer: '49 ml', validate: unitValidate(49, 'ml') },
          { label: '550 ml − 120 ml =', answer: '430 ml', validate: unitValidate(430, 'ml') },
          { label: '26 ml × 3 =', answer: '78 ml', validate: unitValidate(78, 'ml') },
          { label: '84 ml : 4 =', answer: '21 ml', validate: unitValidate(21, 'ml') },
        ],
        hints: ['Tính như với các số tự nhiên rồi viết thêm đơn vị ml vào kết quả.'],
      },
      {
        // Only a) is kept: b) asks for today's real highest/lowest temperature,
        // which has no fixed answer.
        type: 'fill', section: 'Tiết 2',
        q: '3. Tìm hiểu thực tế xung quanh em rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Để đo nhiệt độ cơ thể, người ta thường dùng ...', answer: 'nhiệt kế', validate: thermometerValidate },
          { label: 'Nhiệt độ bình thường của cơ thể em khoảng ... °C.', answer: '37', validate: bodyTempValidate },
        ],
        hints: ['Dụng cụ đo nhiệt độ gọi là nhiệt kế. Nhiệt độ cơ thể người khỏe mạnh khoảng 36 °C – 37 °C.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Mẹ mua hai chai dấm gạo, chai bé có 250 ml và chai to có số mi-li-lít dấm gạo gấp đôi chai bé. Hỏi mẹ đã mua tất cả bao nhiêu mi-li-lít dấm gạo?',
        wordProblem: true,
        blanks: [{ label: 'Số mi-li-lít dấm gạo mẹ đã mua', answer: '750' }],
        hints: ['Chai to có 250 × 2 = 500 (ml). Cộng số dấm ở cả hai chai.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính.',
        blanks: [
          { label: '304 mm + 265 mm =', answer: '569 mm', validate: unitValidate(569, 'mm') },
          { label: '450 mm − 250 mm =', answer: '200 mm', validate: unitValidate(200, 'mm') },
          { label: '46 mm × 2 =', answer: '92 mm', validate: unitValidate(92, 'mm') },
          { label: '68 mm : 4 =', answer: '17 mm', validate: unitValidate(17, 'mm') },
        ],
        hints: ['Tính như với các số tự nhiên rồi viết thêm đơn vị mm vào kết quả.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Một chai có 900 ml mật ong. Mẹ đã rót ra 150 ml mật ong để ngâm tỏi. Hỏi trong chai còn lại bao nhiêu mi-li-lít mật ong?',
        wordProblem: true,
        blanks: [{ label: 'Số mi-li-lít mật ong còn lại', answer: '750' }],
        hints: ['Lấy lượng mật ong lúc đầu trừ đi lượng đã rót ra: 900 − 150.'],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nNhiệt độ không khí đo vào lúc 10 giờ sáng ngày 1 tháng 1 tại một số địa điểm được cho trong bảng sau.',
        headers: ['Địa điểm', 'Hà Nội', 'Đà Nẵng', 'Lạng Sơn', 'Huế'],
        rows: [['Nhiệt độ', '16 °C', '27 °C', '13 °C', '20 °C']],
        blanks: [
          { label: '• Tại thời điểm đó, nơi có nhiệt độ thấp nhất là ...', answer: 'Lạng Sơn', validate: phraseValidate('Lạng Sơn') },
          { label: 'nơi có nhiệt độ cao nhất là ...', answer: 'Đà Nẵng', validate: phraseValidate('Đà Nẵng') },
          { label: '• Tên các địa điểm theo thứ tự từ nơi có nhiệt độ thấp nhất đến nơi có nhiệt độ cao nhất là: ...', answer: 'Lạng Sơn, Hà Nội, Huế, Đà Nẵng', validate: phraseOrderValidate(['Lạng Sơn', 'Hà Nội', 'Huế', 'Đà Nẵng']) },
        ],
        hints: ['Sắp xếp các nhiệt độ từ thấp đến cao: 13 °C < 16 °C < 20 °C < 27 °C, rồi viết tên địa điểm tương ứng, cách nhau bởi dấu phẩy.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT13T3Coffee,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nCó bốn gói đựng cà phê bột như hình dưới đây.',
        blanks: [
          { label: 'a) Gói đựng ít cà phê bột nhất là gói ...', answer: 'B', validate: letterValidate('B') },
          { label: 'b) Chọn hai gói để được 700 g cà phê, ta chọn gói ... và gói ...', answer: 'A,C', validate: setValidate(['A', 'C']) },
          { label: 'c) Chọn các gói để được 800 g cà phê, ta chọn ...', answer: 'A và D', validate: coffee800Validate },
          { label: 'hoặc ...', answer: 'A, B và C', validate: coffee800Validate },
        ],
        hints: [
          'Gói A: 300 g, gói B: 100 g, gói C: 400 g, gói D: 500 g.',
          'c) Có hai cách: 300 g + 500 g = 800 g, hoặc 300 g + 100 g + 400 g = 800 g.',
        ],
      },
    ],
  },
  {
    id: 'tuan-14', number: 14, title: 'Thực hành với mi-li-mét, gam, mi-li-lít, độ C. Luyện tập chung. Nhân số có ba chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgT14T1Temps,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nHình bên là nhiệt độ cao nhất trong một ngày của Hà Nội, Thanh Hoá và Sa Pa. Biết nhiệt độ cao nhất của Hà Nội cao hơn nhiệt độ cao nhất của Sa Pa.',
        blanks: [{ label: 'Vậy nhiệt độ cao nhất của Thanh Hoá là ...', answer: '22 °C', validate: tempValidate(22) }],
        hints: ['Hà Nội cao hơn Sa Pa nên Sa Pa là 11 °C, Hà Nội là 22 °C. Số còn lại là của Thanh Hoá.'],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '2. >; <; = ?',
        rows: [
          { left: 'a) 668 g', right: '686 g', answer: '<' },
          { left: 'b) 720 ml', right: '702 ml', answer: '>' },
          { left: 'c) 1 kg', right: '800 g + 100 g', answer: '>' },
          { left: 'd) 400 g', right: '402 g − 20 g', answer: '>' },
          { left: 'e) 234 ml', right: '204 ml + 30 ml', answer: '=' },
          { left: 'g) 9 mm × 6', right: '60 mm', answer: '<' },
        ],
        hints: ['Tính vế có phép tính trước rồi so sánh. Nhớ 1 kg = 1000 g.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgT14T1Scales,
        q: '3. Viết số đo thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Quả táo cân nặng', answer: '300 g', validate: unitValidate(300, 'g') },
          { label: 'Hộp quà cân nặng', answer: '400 g', validate: unitValidate(400, 'g') },
        ],
        hints: [
          'Cân thăng bằng: quả táo + 200 g = 500 g, nên quả táo nặng 500 g − 200 g.',
          'Hộp quà + 100 g = 500 g, nên hộp quà nặng 500 g − 100 g.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Bác An có chai chứa 1 l dầu ăn. Để nấu một món ăn, bác dùng 100 ml dầu ăn. Hỏi sau khi nấu 5 lần món ăn như thế, bác An còn lại bao nhiêu mi-li-lít dầu ăn?',
        wordProblem: true,
        blanks: [{ label: 'Số mi-li-lít dầu ăn còn lại', answer: '500' }],
        hints: ['Đổi 1 l = 1000 ml. Nấu 5 lần dùng hết 100 × 5 = 500 (ml).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          { label: '113 × 5 =', answer: '565' },
          { label: '223 × 4 =', answer: '892' },
          { label: '102 × 7 =', answer: '714' },
          { label: '321 × 3 =', answer: '963' },
        ],
        hints: ['Nhân lần lượt từ phải sang trái: hàng đơn vị, hàng chục rồi hàng trăm; nhân được từ 10 trở lên thì nhớ sang hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm.',
        blanks: [
          { label: '300 × 2 = ...', answer: '600' },
          { label: '100 × 5 = ...', answer: '500' },
          { label: '200 × 4 = ...', answer: '800' },
          { label: '300 × 3 = ...', answer: '900' },
          { label: '400 × 2 = ...', answer: '800' },
          { label: '500 × 1 = ...', answer: '500' },
        ],
        hints: ['Nhẩm theo trăm: 3 trăm × 2 = 6 trăm, vậy 300 × 2 = 600.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgT14T2Jug,
        q: '3. Viết số thích hợp vào chỗ chấm.\nRót hết một bình nước được 3 ca nước đầy như hình vẽ trên.',
        blanks: [{ label: 'Vậy bình nước lúc đầu chứa ... ml nước.', answer: '900' }],
        hints: ['Ba ca, mỗi ca 300 ml: 300 × 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Mẹ có 3 gói gia vị ướp cá, mỗi gói cân nặng 250 g. Mẹ đã dùng hết 400 gam để ướp cá. Hỏi mẹ còn lại bao nhiêu gam gia vị ướp cá?',
        wordProblem: true,
        blanks: [{ label: 'Số gam gia vị ướp cá còn lại', answer: '350' }],
        hints: ['Ba gói nặng 250 × 3 = 750 (g). Lấy số đó trừ đi 400 g.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgT14T3Scales,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Ba hộp bánh cân nặng', answer: '600 g', validate: unitValidate(600, 'g') },
          { label: 'b) Hai hộp sữa cân nặng', answer: '450 g', validate: unitValidate(450, 'g') },
        ],
        hints: [
          'a) Cân thăng bằng: ba hộp bánh nặng bằng 500 g + 100 g.',
          'b) Hai hộp sữa + 50 g = 500 g, nên hai hộp sữa nặng 500 g − 50 g.',
        ],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nNhiệt độ các buổi trong ngày của một thành phố được cho trong bảng sau:',
        headers: ['Buổi', 'Sáng', 'Trưa', 'Chiều', 'Đêm'],
        rows: [['Nhiệt độ', '18 °C', '23 °C', '22 °C', '15 °C']],
        blanks: [
          { label: 'a) Nhiệt độ cao nhất trong ngày là vào buổi ...', answer: 'trưa', validate: noonValidate },
          { label: 'b) Chênh lệch nhiệt độ (hơn hoặc kém nhau về nhiệt độ) giữa buổi sáng và buổi chiều là ...', answer: '4 °C', validate: tempValidate(4) },
          { label: 'c) Chênh lệch nhiệt độ giữa buổi trưa và buổi đêm là ...', answer: '8 °C', validate: tempValidate(8) },
        ],
        hints: ['Chênh lệch nhiệt độ: lấy nhiệt độ cao hơn trừ đi nhiệt độ thấp hơn, ví dụ 22 °C − 18 °C.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '3. Nối mỗi phép tính với kết quả của phép tính đó.',
        left: [
          { id: 'e104', text: '104 × 5' },
          { id: 'e160', text: '160 × 4' },
          { id: 'e126', text: '126 × 3' },
          { id: 'e300', text: '300 × 2' },
        ],
        right: [
          { id: 'v378', text: '378' },
          { id: 'v600', text: '600' },
          { id: 'v640', text: '640' },
          { id: 'v520', text: '520' },
        ],
        pairs: [['e104', 'v520'], ['e160', 'v640'], ['e126', 'v378'], ['e300', 'v600']],
        hints: ['Tính từng phép nhân, ví dụ 104 × 5 = 520.'],
      },
    ],
  },
  {
    id: 'tuan-15', number: 15, title: 'Chia số có ba chữ số cho số có một chữ số. Biểu thức số. Tính giá trị của biểu thức số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(527, 3), divBlank(685, 5), divBlank(428, 4), divBlank(809, 8)],
        hints: ['Chia lần lượt từ hàng trăm. Ở 428 : 4 và 809 : 8, hạ chữ số tiếp theo xuống mà không chia được thì viết 0 vào thương.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) ... : 2 = 304', answer: '608' },
          { label: 'b) ... × 6 = 648', answer: '108' },
          { label: 'c) 5 × ... = 400', answer: '80' },
        ],
        hints: ['a) Số bị chia = thương × số chia. b), c) Thừa số chưa biết = tích : thừa số đã biết.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Một cửa hàng bán được 532 thùng táo trong tháng 9. Trong tháng 10, số thùng táo bán được giảm 4 lần so với tháng 9. Hỏi trong cả hai tháng 9 và 10, cửa hàng đó bán được bao nhiêu thùng táo?',
        wordProblem: true,
        blanks: [{ label: 'Số thùng táo bán được trong cả hai tháng', answer: '665' }],
        hints: ['Tháng 10 bán được 532 : 4 = 133 (thùng). Cộng số thùng của hai tháng.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nBen vừa nướng được 124 chiếc bánh. Bạn ấy muốn xếp tất cả số bánh đó vào hộp. Biết mỗi hộp đựng được nhiều nhất 5 chiếc bánh. Hỏi Ben cần dùng ít nhất bao nhiêu hộp để đựng hết số bánh đó?',
        options: ['26 hộp', '25 hộp', '24 hộp', '23 hộp'],
        answer: 1,
        hints: ['124 : 5 = 24 (dư 4). 24 hộp đầy vẫn còn thừa 4 chiếc bánh, cần thêm 1 hộp nữa.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(431, 2), divBlank(273, 3), divBlank(600, 4), divBlank(729, 7)],
        hints: ['Ở 273 : 3, chữ số hàng trăm 2 bé hơn 3 nên lấy 27 : 3 trước. Ở 729 : 7, hạ 2 xuống không chia được cho 7 thì viết 0 vào thương.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối mỗi con vật với số cân nặng của con vật đó. Biết số cân nặng theo đơn vị ki-lô-gam của mỗi con vật bằng giá trị của biểu thức dưới con vật đó.',
        left: [
          { id: 'monkey', img: imgT15Monkey, text: '1 + 52 : 4' },
          { id: 'gazelle', img: imgT15Gazelle, text: '600 : 3 − 50' },
          { id: 'lion', img: imgT15Lion, text: '200 − 12 × 5' },
          { id: 'horse', img: imgT15Horse, text: '110 × 2 − 20' },
        ],
        right: [
          { id: 'w150', text: '150 kg' },
          { id: 'w14', text: '14 kg' },
          { id: 'w200', text: '200 kg' },
          { id: 'w140', text: '140 kg' },
        ],
        pairs: [['monkey', 'w14'], ['gazelle', 'w150'], ['lion', 'w140'], ['horse', 'w200']],
        hints: ['Biểu thức có phép nhân, chia và cộng, trừ thì nhân, chia trước: 52 : 4 = 13, rồi 1 + 13.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Sau khi trận đấu bóng đá kết thúc, Nam đi cùng Việt 200 m từ sân vận động về nhà bạn rồi mới đi về nhà mình. Biết quãng đường từ nhà Việt đến nhà Nam dài gấp 3 lần quãng đường từ sân vận động về nhà Việt. Hỏi để trở về nhà sau trận đấu bóng đá đó, Nam phải đi quãng đường dài bao nhiêu mét?',
        wordProblem: true,
        blanks: [{ label: 'Quãng đường Nam phải đi (m)', answer: '800' }],
        hints: ['Quãng đường từ nhà Việt đến nhà Nam là 200 × 3 = 600 (m). Nam đi cả hai đoạn: 200 m và 600 m.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgT15Animals,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nBen xếp 120 hình con vật thành một dãy theo quy tắc: hổ, voi, khỉ, hổ, voi, khỉ,... 6 hình đầu tiên được cho như hình vẽ dưới đây.\nHỏi hình con khỉ cuối cùng trong dãy được xếp ở vị trí nào?',
        options: ['Vị trí thứ 120', 'Vị trí thứ 119', 'Vị trí thứ 118', 'Vị trí thứ 117'],
        answer: 0,
        hints: ['Mỗi nhóm "hổ, voi, khỉ" có 3 hình và con khỉ đứng thứ 3, 6, 9, ... 120 : 3 = 40, không dư.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 216 − 26 − 50 = ...', answer: '190 − 50', validate: exprValidate('190 − 50') },
          { label: '= ...', answer: '140' },
          { label: 'b) 80 − 15 + 5 = ...', answer: '65 + 5', validate: exprValidate('65 + 5') },
          { label: '= ...', answer: '70' },
          { label: 'c) 152 : 4 : 2 = ...', answer: '38 : 2', validate: exprValidate('38 : 2') },
          { label: '= ...', answer: '19' },
          { label: 'd) 378 : 9 × 5 = ...', answer: '42 × 5', validate: exprValidate('42 × 5') },
          { label: '= ...', answer: '210' },
        ],
        hints: ['Biểu thức chỉ có cộng, trừ (hoặc chỉ có nhân, chia) thì tính lần lượt từ trái sang phải: 216 − 26 = 190, rồi 190 − 50.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Đ, S?',
        blanks: [
          { label: 'a) 200 − 35 + 15 = 200 − 50 = 150', answer: 'S', validate: dsValidate(false) },
          { label: 'b) 200 − 35 + 15 = 165 + 15 = 180', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) 40 : 5 × 2 = 8 × 2 = 16', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) 40 : 5 × 2 = 40 : 10 = 4', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Biểu thức chỉ có cộng, trừ hoặc chỉ có nhân, chia thì phải tính lần lượt từ trái sang phải.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Mai dùng 180 g bột mì để làm bánh. Rô-bốt dùng lượng bột gấp 4 lần lượng bột mà Mai đã dùng. Hỏi hai bạn dùng tất cả bao nhiêu gam bột mì để làm bánh?',
        wordProblem: true,
        blanks: [{ label: 'Số gam bột mì hai bạn đã dùng', answer: '900' }],
        hints: ['Rô-bốt dùng 180 × 4 = 720 (g). Cộng lượng bột của cả hai bạn.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nBốn bạn An, Bình, Cường và Dung cùng thi chạy. An về đích đầu tiên hoặc thứ hai. Dung về đích ở một trong hai vị trí cuối cùng. Dung không về đích cuối cùng. Cường về đích thứ hai hoặc thứ ba. Vậy kết quả của cuộc thi kể từ người về đích cuối cùng là:',
        options: ['Bình, Dung, Cường, An', 'An, Bình, Cường, Dung', 'Bình, An, Cường, Dung', 'An, Cường, Dung, Bình'],
        answer: 0,
        hints: ['Dung về thứ ba. Vậy Cường về thứ hai, An về thứ nhất, Bình về cuối cùng.'],
      },
    ],
  },
];
