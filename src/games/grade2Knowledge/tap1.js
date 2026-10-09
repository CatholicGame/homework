/**
 * Kiến thức từng bài Toán 2 Tập Một (SGK Kết nối tri thức), Bài 1–36. Định dạng mục: lessonHelp.js.
 * Ví dụ xem từng bước: loại của SGK Toán 4 (compare, add, sub trong grade4Textbook/demos/board.js)
 * và loại riêng 'g2a-…' trong demos-tap1.js.
 */
import './demos-tap1.js';

const L = '<i class="g2a-l">l</i>';

export const KNOWLEDGE2_TAP1 = {
  1: {
    title: 'Ôn tập các số đến 100',
    points: [
      'Số có hai chữ số gồm <b>chục</b> và <b>đơn vị</b>: 45 gồm 4 chục và 5 đơn vị, viết thành tổng <b>45 = 40 + 5</b>.',
      'Đọc số: 45 đọc là <b>bốn mươi lăm</b>, 21 là <b>hai mươi mốt</b>, 15 là <b>mười lăm</b>, 70 là <b>bảy mươi</b>.',
      'So sánh hai số có hai chữ số: so chữ số <b>hàng chục</b> trước; hàng chục bằng nhau thì so <b>hàng đơn vị</b>.',
      'Số bé nhất có hai chữ số là <b>10</b>, số lớn nhất có hai chữ số là <b>99</b>. Số 100 đọc là một trăm.',
    ],
    demos: [
      { kind: 'g2a-tens', n: 45, tries: [{ label: '45', n: 45 }, { label: '21', n: 21 }, { label: '70', n: 70 }, { label: '15', n: 15 }] },
      { kind: 'compare', a: 58, b: 61, tries: [{ label: '58 và 61', a: 58, b: 61 }, { label: '74 và 71', a: 74, b: 71 }] },
    ],
  },
  2: {
    title: 'Tia số. Số liền trước, số liền sau',
    points: [
      'Trên <b>tia số</b>, các số xếp theo thứ tự từ bé đến lớn, từ trái sang phải. Số ở bên trái bé hơn số ở bên phải.',
      '<b>Số liền sau</b> của một số thì hơn số đó 1 đơn vị: số liền sau của 47 là 48 (47 + 1 = 48).',
      '<b>Số liền trước</b> của một số thì kém số đó 1 đơn vị: số liền trước của 47 là 46 (47 − 1 = 46).',
    ],
    demos: [
      { kind: 'g2a-ray', from: 40, n: 47, tries: [{ label: '47', from: 40, n: 47 }, { label: '30', from: 25, n: 30 }, { label: '99', from: 90, n: 99 }] },
    ],
  },
  3: {
    title: 'Các thành phần của phép cộng, phép trừ',
    points: [
      'Trong phép cộng 32 + 4 = 36: 32 và 4 là các <b>số hạng</b>, 36 là <b>tổng</b>. 32 + 4 cũng gọi là tổng.',
      'Trong phép trừ 40 − 10 = 30: 40 là <b>số bị trừ</b>, 10 là <b>số trừ</b>, 30 là <b>hiệu</b>. 40 − 10 cũng gọi là hiệu.',
      'Muốn tìm tổng, ta cộng các số hạng. Muốn tìm hiệu, ta lấy số bị trừ trừ đi số trừ.',
    ],
    demos: [
      { kind: 'g2a-parts', op: '+', a: 32, b: 4, tries: [{ label: '32 + 4', a: 32, b: 4 }, { label: '50 + 20', a: 50, b: 20 }] },
      { kind: 'g2a-parts', op: '-', a: 40, b: 10, tries: [{ label: '40 − 10', a: 40, b: 10 }, { label: '58 − 6', a: 58, b: 6 }] },
    ],
  },
  4: {
    title: 'Hơn, kém nhau bao nhiêu',
    points: [
      'Muốn biết số này <b>hơn</b> (hoặc <b>kém</b>) số kia bao nhiêu, ta lấy <b>số lớn trừ số bé</b>.',
      'Ví dụ: 7 − 4 = 3, nên 7 hơn 4 là 3, và 4 kém 7 là 3.',
      'Ghép từng cặp một: phần còn thừa ra chính là số hơn.',
    ],
    demos: [
      { kind: 'g2a-story', mode: 'diff', a: 7, b: 4, icon: '🦆', names: ['Trên bờ', 'Dưới ao'], short: 'con', unit: 'con vịt',
        tries: [{ label: '7 và 4', a: 7, b: 4 }, { label: '9 và 6', a: 9, b: 6 }] },
    ],
  },
  5: {
    title: 'Ôn tập phép cộng, phép trừ (không nhớ) trong phạm vi 100',
    points: [
      'Cộng, trừ nhẩm số tròn chục: <b>40 + 30 = 70</b> (4 chục cộng 3 chục bằng 7 chục), <b>80 − 50 = 30</b>.',
      'Đặt tính: viết các chữ số <b>cùng hàng thẳng cột</b> (đơn vị thẳng đơn vị, chục thẳng chục), viết dấu, kẻ gạch ngang.',
      'Tính <b>từ phải sang trái</b>: hàng đơn vị trước, hàng chục sau.',
    ],
    demos: [
      { kind: 'add', a: 32, b: 45, tries: [{ label: '32 + 45', a: 32, b: 45 }, { label: '23 + 51', a: 23, b: 51 }] },
      { kind: 'sub', a: 68, b: 25, tries: [{ label: '68 − 25', a: 68, b: 25 }, { label: '79 − 46', a: 79, b: 46 }] },
    ],
  },
  6: { title: 'Luyện tập chung', see: [1, 2, 3, 4, 5] },
  7: {
    title: 'Phép cộng (qua 10) trong phạm vi 20',
    points: [
      'Cộng qua 10 bằng cách <b>làm tròn 10</b>: tách số thứ hai để số thứ nhất đủ 10, rồi cộng phần còn lại.',
      'Ví dụ 7 + 6: tách 6 = 3 + 3; 7 + 3 = 10; 10 + 3 = 13. Vậy <b>7 + 6 = 13</b>.',
      'Cũng có thể đếm tiếp: 9 + 3, đếm 10, 11, 12. Vậy 9 + 3 = 12.',
      'Đổi chỗ các số hạng thì tổng không thay đổi: 7 + 6 = 6 + 7.',
    ],
    demos: [
      { kind: 'g2a-ten', op: '+', a: 7, b: 6, tries: [{ label: '7 + 6', a: 7, b: 6 }, { label: '9 + 5', a: 9, b: 5 }, { label: '6 + 8', a: 6, b: 8 }] },
    ],
  },
  8: {
    title: 'Bảng cộng (qua 10)',
    points: [
      'Bảng cộng (qua 10) gồm các phép cộng hai số có một chữ số mà tổng lớn hơn 10: 9 + 2 = 11, 9 + 3 = 12, …, 9 + 9 = 18; 8 + 3 = 11, …',
      'Đổi chỗ các số hạng thì tổng không đổi: biết 9 + 4 = 13 thì 4 + 9 = 13.',
      'Thuộc bảng cộng giúp em tính nhẩm nhanh và so sánh kết quả các phép tính.',
    ],
    demos: [
      { kind: 'g2a-table', op: '+', n: 9, tries: [{ label: '9 + …', n: 9 }, { label: '8 + …', n: 8 }, { label: '7 + …', n: 7 }, { label: '6 + …', n: 6 }] },
    ],
  },
  9: {
    title: 'Bài toán về thêm, bớt một số đơn vị',
    points: [
      'Bài toán <b>thêm</b> (có thêm, mua thêm, chạy đến…): hỏi có tất cả bao nhiêu, ta làm <b>phép cộng</b>.',
      'Bài toán <b>bớt</b> (bay đi, bán đi, xuống xe, lấy ra…): hỏi còn lại bao nhiêu, ta làm <b>phép trừ</b>.',
      'Bài giải gồm ba dòng: <b>câu lời giải</b>, <b>phép tính</b> (tên đơn vị viết trong ngoặc), <b>đáp số</b>.',
    ],
    demos: [
      { kind: 'g2a-story', mode: 'add', a: 7, b: 4, icon: '🐔', unit: 'con gà', short: 'con',
        intro: 'Trên sân có 7 con gà.', event: 'Có thêm 4 con gà chạy đến.', question: 'Hỏi trên sân có tất cả bao nhiêu con gà? Em làm phép tính nào?',
        say: 'Trên sân có tất cả số con gà là:' },
      { kind: 'g2a-story', mode: 'take', a: 12, b: 5, icon: '🐦', unit: 'con chim', short: 'con',
        intro: 'Trên cành có 12 con chim đậu.', event: 'Có 5 con chim bay đi.', question: 'Hỏi trên cành còn lại bao nhiêu con chim? Em làm phép tính nào?',
        say: 'Trên cành còn lại số con chim là:' },
    ],
  },
  10: { title: 'Luyện tập chung', see: [7, 8, 9] },
  11: {
    title: 'Phép trừ (qua 10) trong phạm vi 20',
    points: [
      'Trừ qua 10 bằng cách <b>tách số bị trừ</b> thành 10 và phần lẻ: lấy 10 trừ trước, rồi cộng phần lẻ.',
      'Ví dụ 13 − 5: tách 13 = 10 + 3; 10 − 5 = 5; 5 + 3 = 8. Vậy <b>13 − 5 = 8</b>.',
      'Thử lại bằng phép cộng: 8 + 5 = 13.',
    ],
    demos: [
      { kind: 'g2a-ten', op: '-', a: 13, b: 5, tries: [{ label: '13 − 5', a: 13, b: 5 }, { label: '12 − 7', a: 12, b: 7 }, { label: '16 − 8', a: 16, b: 8 }] },
    ],
  },
  12: {
    title: 'Bảng trừ (qua 10)',
    points: [
      'Bảng trừ (qua 10): 11 − 2 = 9, 11 − 3 = 8, …; 12 − 3 = 9, …; …; 18 − 9 = 9.',
      'Dựa vào bảng cộng để trừ nhẩm: 9 + 2 = 11 nên <b>11 − 2 = 9</b> và <b>11 − 9 = 2</b>.',
      'Số trừ thêm 1 thì hiệu bớt đi 1: 11 − 2 = 9, 11 − 3 = 8, 11 − 4 = 7.',
    ],
    demos: [
      { kind: 'g2a-table', op: '-', n: 11, tries: [{ label: '11 − …', n: 11 }, { label: '13 − …', n: 13 }, { label: '15 − …', n: 15 }] },
    ],
  },
  13: {
    title: 'Bài toán về nhiều hơn, ít hơn một số đơn vị',
    points: [
      '“B <b>nhiều hơn</b> A … đơn vị”: muốn tìm B, ta lấy số của A <b>cộng</b> với số đơn vị nhiều hơn.',
      '“B <b>ít hơn</b> A … đơn vị”: muốn tìm B, ta lấy số của A <b>trừ</b> đi số đơn vị ít hơn.',
      'Vẽ hai hàng đồ vật thẳng cột với nhau để thấy phần nhiều hơn (hoặc phần còn thiếu).',
    ],
    demos: [
      { kind: 'g2a-story', mode: 'more', a: 8, b: 3, icon: '🌸', names: ['Việt', 'Mai'], unit: 'bông hoa', short: 'bông',
        event: 'Mai cắt được nhiều hơn Việt 3 bông hoa.', intro: 'Việt cắt được 8 bông hoa.', question: 'Hỏi Mai cắt được bao nhiêu bông hoa? Em làm phép tính nào?',
        say: 'Mai cắt được số bông hoa là:' },
      { kind: 'g2a-story', mode: 'less', a: 11, b: 3, icon: '🌰', names: ['Sóc nâu', 'Sóc xám'], unit: 'hạt dẻ', short: 'hạt',
        event: 'Sóc xám nhặt được ít hơn sóc nâu 3 hạt dẻ.', intro: 'Sóc nâu nhặt được 11 hạt dẻ.', question: 'Hỏi sóc xám nhặt được bao nhiêu hạt dẻ? Em làm phép tính nào?',
        say: 'Sóc xám nhặt được số hạt dẻ là:' },
    ],
  },
  14: { title: 'Luyện tập chung', see: [11, 12, 13] },
  15: {
    title: 'Ki-lô-gam',
    points: [
      'Dùng <b>cân đĩa</b> để so sánh: đĩa nào thấp hơn thì vật trên đĩa đó <b>nặng hơn</b>; hai đĩa ngang nhau (cân thăng bằng) thì hai bên <b>nặng bằng nhau</b>.',
      '<b>Ki-lô-gam</b> là đơn vị đo khối lượng, viết tắt là <b>kg</b>. Có các quả cân 1 kg, 2 kg, 5 kg.',
      'Cân thăng bằng thì vật nặng bằng tổng các quả cân ở đĩa bên kia: 2 kg + 1 kg = 3 kg.',
      'Cộng, trừ số đo khối lượng như cộng, trừ số rồi viết kg: 5 kg + 3 kg = 8 kg, 10 kg − 4 kg = 6 kg.',
    ],
    demos: [
      { kind: 'g2a-scale', mode: 'compare', left: { icon: '🍉', name: 'quả dưa hấu' }, right: { icon: '🍊', name: 'quả cam' }, heavier: 'left' },
      { kind: 'g2a-scale', mode: 'weigh', name: 'túi gạo', tag: 'Gạo', weights: [2, 1],
        tries: [{ label: '2 kg + 1 kg', weights: [2, 1] }, { label: '5 kg + 2 kg', weights: [5, 2] }, { label: '1 kg + 1 kg + 2 kg', weights: [1, 1, 2] }] },
    ],
  },
  16: {
    title: 'Lít',
    points: [
      `<b>Lít</b> là đơn vị đo lượng nước, dầu, sữa… có trong một đồ vật (ca, can, bình). Lít viết tắt là <b>${L}</b>.`,
      `Ca 1 ${L} chứa được 1 lít nước. Rót hết nước sang được đầy mấy ca 1 ${L} thì có bấy nhiêu lít.`,
      `Cộng, trừ số đo lít như cộng, trừ số rồi viết ${L}: 4 ${L} + 6 ${L} = 10 ${L}, 15 ${L} − 5 ${L} = 10 ${L}.`,
    ],
    demos: [
      { kind: 'g2a-jug', l: 4, tries: [{ label: `4 ${L}`, l: 4 }, { label: `3 ${L}`, l: 3 }, { label: `5 ${L}`, l: 5 }] },
    ],
  },
  17: { title: 'Thực hành và trải nghiệm với các đơn vị ki-lô-gam, lít', see: [15, 16] },
  18: { title: 'Luyện tập chung', see: [15, 16] },
  19: {
    title: 'Phép cộng (có nhớ) số có hai chữ số với số có một chữ số',
    points: [
      'Đặt tính: viết số có một chữ số <b>thẳng cột với hàng đơn vị</b>, viết dấu +, kẻ gạch ngang.',
      'Cộng từ phải sang trái. Hàng đơn vị cộng được 10 trở lên thì viết chữ số đơn vị và <b>nhớ 1</b> sang hàng chục.',
      'Ví dụ 27 + 5: 7 cộng 5 bằng 12, viết 2 nhớ 1; 2 thêm 1 bằng 3, viết 3. Vậy <b>27 + 5 = 32</b>.',
    ],
    demos: [
      { kind: 'add', a: 27, b: 5, tries: [{ label: '27 + 5', a: 27, b: 5 }, { label: '38 + 6', a: 38, b: 6 }, { label: '49 + 1', a: 49, b: 1 }] },
    ],
  },
  20: {
    title: 'Phép cộng (có nhớ) số có hai chữ số với số có hai chữ số',
    points: [
      'Đặt tính: viết các chữ số cùng hàng thẳng cột (đơn vị thẳng đơn vị, chục thẳng chục).',
      'Cộng hàng đơn vị trước. Được 10 trở lên thì <b>nhớ 1</b>; khi cộng hàng chục nhớ <b>thêm 1</b>.',
      'Ví dụ 36 + 28: 6 cộng 8 bằng 14, viết 4 nhớ 1; 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6. Vậy <b>36 + 28 = 64</b>.',
    ],
    demos: [
      { kind: 'add', a: 36, b: 28, tries: [{ label: '36 + 28', a: 36, b: 28 }, { label: '45 + 35', a: 45, b: 35 }, { label: '58 + 37', a: 58, b: 37 }] },
    ],
  },
  21: { title: 'Luyện tập chung', see: [19, 20] },
  22: {
    title: 'Phép trừ (có nhớ) số có hai chữ số cho số có một chữ số',
    points: [
      'Đặt tính: viết số có một chữ số <b>thẳng cột với hàng đơn vị</b>, viết dấu −, kẻ gạch ngang.',
      'Trừ từ phải sang trái. Chữ số hàng đơn vị bé hơn số trừ thì <b>mượn 1 chục</b>: lấy 10 cộng thêm rồi trừ, nhớ 1 sang hàng chục.',
      'Ví dụ 32 − 5: 2 không trừ được 5, lấy 12 trừ 5 bằng 7, viết 7 nhớ 1; 3 trừ 1 bằng 2, viết 2. Vậy <b>32 − 5 = 27</b>.',
    ],
    demos: [
      { kind: 'sub', a: 32, b: 5, tries: [{ label: '32 − 5', a: 32, b: 5 }, { label: '40 − 6', a: 40, b: 6 }, { label: '51 − 8', a: 51, b: 8 }] },
    ],
  },
  23: {
    title: 'Phép trừ (có nhớ) số có hai chữ số cho số có hai chữ số',
    points: [
      'Đặt tính: các chữ số cùng hàng thẳng cột. Trừ từ phải sang trái.',
      'Hàng đơn vị không trừ được thì lấy thêm 10 rồi trừ, <b>nhớ 1</b>; sang hàng chục, cộng 1 vào chữ số hàng chục của số trừ rồi mới trừ.',
      'Ví dụ 52 − 28: 2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4 nhớ 1; 2 thêm 1 bằng 3, 5 trừ 3 bằng 2, viết 2. Vậy <b>52 − 28 = 24</b>.',
      'Thử lại: lấy hiệu cộng số trừ được số bị trừ (24 + 28 = 52).',
    ],
    demos: [
      { kind: 'sub', a: 52, b: 28, tries: [{ label: '52 − 28', a: 52, b: 28 }, { label: '70 − 36', a: 70, b: 36 }, { label: '64 − 39', a: 64, b: 39 }] },
    ],
  },
  24: { title: 'Luyện tập chung', see: [22, 23] },
  25: {
    title: 'Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng',
    points: [
      '<b>Điểm</b> được vẽ bằng một dấu chấm và đặt tên bằng chữ in hoa: điểm A, điểm B.',
      'Dùng thước nối điểm A với điểm B được <b>đoạn thẳng AB</b>. Đo độ dài đoạn thẳng bằng thước có vạch xăng-ti-mét.',
      'Kéo dài đoạn thẳng về hai phía được <b>đường thẳng</b>. Đường không thẳng là <b>đường cong</b>.',
      'Ba điểm cùng nằm trên một đường thẳng là <b>ba điểm thẳng hàng</b>.',
    ],
    demos: [{ kind: 'g2a-geo', mode: 'lines' }],
  },
  26: {
    title: 'Đường gấp khúc. Hình tứ giác',
    points: [
      '<b>Đường gấp khúc</b> gồm các đoạn thẳng nối tiếp nhau: đường gấp khúc ABCD gồm ba đoạn thẳng AB, BC, CD.',
      '<b>Độ dài đường gấp khúc</b> là tổng độ dài các đoạn thẳng của nó: 3 cm + 2 cm + 4 cm = 9 cm.',
      '<b>Hình tứ giác</b> có 4 cạnh và 4 đỉnh. Hình vuông, hình chữ nhật cũng là hình tứ giác.',
    ],
    demos: [
      { kind: 'g2a-geo', mode: 'polyline', lens: [3, 2, 4], tries: [{ label: 'ABCD', lens: [3, 2, 4] }, { label: 'ABCDE', lens: [2, 3, 4, 3] }] },
      { kind: 'g2a-geo', mode: 'quad' },
    ],
  },
  27: {
    title: 'Thực hành gấp, cắt, ghép, xếp hình. Vẽ đoạn thẳng',
    points: [
      'Vẽ đoạn thẳng AB dài 5 cm: đặt thước, chấm điểm A ở vạch 0, chấm điểm B ở vạch 5, rồi nối A với B theo mép thước.',
      'Ghép các hình nhỏ (hình tam giác, hình vuông) thành hình mới: đếm xem hình mới dùng bao nhiêu hình nhỏ.',
      'Xếp hình theo quy luật: nhìn các hình đã có để đoán hình tiếp theo.',
    ],
    demos: [
      { kind: 'g2a-geo', mode: 'draw', len: 5, tries: [{ label: '5 cm', len: 5 }, { label: '8 cm', len: 8 }, { label: '3 cm', len: 3 }] },
    ],
  },
  28: { title: 'Luyện tập chung', see: [25, 26, 27] },
  29: {
    title: 'Ngày – giờ, giờ – phút',
    points: [
      'Một ngày có <b>24 giờ</b>, tính từ 12 giờ đêm hôm trước đến 12 giờ đêm hôm sau.',
      'Buổi chiều, tối, đêm: 1 giờ chiều là <b>13 giờ</b>, 5 giờ chiều là 17 giờ, 8 giờ tối là <b>20 giờ</b>, 12 giờ đêm là 24 giờ.',
      '<b>1 giờ = 60 phút</b>. Kim ngắn chỉ giờ, kim dài chỉ phút. Kim dài chỉ số 12: đúng giờ; chỉ số 3: <b>15 phút</b>; chỉ số 6: <b>30 phút</b> (giờ rưỡi).',
      'Đồng hồ điện tử: 08:00 là 8 giờ sáng, 20:00 là 8 giờ tối.',
    ],
    demos: [
      { kind: 'g2a-clock', h: 8, m: 0, pm: true, tries: [{ label: '8 giờ', h: 8, m: 0, pm: true }, { label: '8 giờ 15 phút', h: 8, m: 15, pm: false }, { label: '3 giờ 30 phút', h: 3, m: 30, pm: true }] },
      { kind: 'g2a-day', h: 15, tries: [{ label: '15 giờ', h: 15 }, { label: '20 giờ', h: 20 }, { label: '17 giờ', h: 17 }] },
    ],
  },
  30: {
    title: 'Ngày – tháng',
    points: [
      'Tờ lịch tháng cho biết tháng có bao nhiêu ngày và mỗi ngày là <b>thứ mấy</b>. Đọc ngày: “ngày 20 tháng 10”.',
      'Mỗi tháng có <b>30 hoặc 31 ngày</b>; riêng tháng 2 có 28 hoặc 29 ngày. Ngày cuối cùng trên tờ lịch cho biết tháng có mấy ngày.',
      'Một tuần lễ có <b>7 ngày</b>: Thứ Hai, Thứ Ba, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy, Chủ nhật. Cùng một thứ, ngày của tuần sau hơn ngày tuần trước 7.',
    ],
    demos: [
      { kind: 'g2a-cal', month: 10, first: 3, days: 31, day: 20,
        tries: [{ label: 'Tháng 10', month: 10, first: 3, days: 31, day: 20 }, { label: 'Tháng 4', month: 4, first: 2, days: 30, day: 12 }, { label: 'Tháng 2', month: 2, first: 6, days: 28, day: 14 }] },
    ],
  },
  31: { title: 'Thực hành và trải nghiệm xem đồng hồ, xem lịch', see: [29, 30] },
  32: { title: 'Luyện tập chung', see: [29, 30] },
  33: { title: 'Ôn tập phép cộng, phép trừ trong phạm vi 20, 100', see: [7, 11, 13, 20, 23] },
  34: { title: 'Ôn tập hình phẳng', see: [25, 26] },
  35: { title: 'Ôn tập đo lường', see: [15, 16, 29, 30] },
  36: { title: 'Ôn tập chung', see: [20, 23, 13, 15, 29, 26] },
};
