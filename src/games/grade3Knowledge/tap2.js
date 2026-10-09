/**
 * Kiến thức từng bài Toán 3 Tập Hai (SGK Kết nối tri thức), Bài 45–81. Định dạng mục: lessonHelp.js.
 * Ví dụ xem từng bước: loại 'g3b-…' trong demos-tap2.js (và bảng chữ số của grade4Textbook/demos/board.js).
 * Số từ bốn chữ số viết tách lớp như Vở bài tập: 2 191, 10 000.
 */
import './demos-tap2.js';

const PAGE = 'SGK Toán 3 Tập Hai';

export const KNOWLEDGE3_TAP2 = {
  45: {
    title: 'Các số có bốn chữ số. Số 10 000', page: PAGE,
    points: [
      '10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = <b>1 nghìn</b> (viết 1 000).',
      'Số có bốn chữ số có các hàng: <b>nghìn, trăm, chục, đơn vị</b>. Viết và đọc số từ hàng nghìn đến hàng đơn vị: 2 191 đọc là "hai nghìn một trăm chín mươi mốt".',
      'Chữ số 0 ở hàng chục đọc là "linh": 4 805 đọc là "bốn nghìn tám trăm linh năm". Hàng trăm là 0 thì đọc "không trăm": 7 054 đọc là "bảy nghìn không trăm năm mươi tư".',
      'Viết số thành tổng các nghìn, trăm, chục, đơn vị: <b>5 437 = 5 000 + 400 + 30 + 7</b>.',
      'Số <b>tròn trăm</b> có hai chữ số tận cùng là 0 (2 100), số <b>tròn nghìn</b> có ba chữ số tận cùng là 0 (4 000). <b>10 nghìn</b> = 1 chục nghìn, viết <b>10 000</b>, đọc là "mười nghìn".',
    ],
    demos: [
      { kind: 'g3b-place', n: 2191, tries: [{ label: '2 191', n: 2191 }, { label: '4 805', n: 4805 }, { label: '7 054', n: 7054 }] },
      { kind: 'g3b-place', mode: 'sum', n: 5437, tries: [{ label: '5 437', n: 5437 }, { label: '8 065', n: 8065 }] },
    ],
  },
  46: {
    title: 'So sánh các số trong phạm vi 10 000', page: PAGE,
    points: [
      'Số nào có <b>ít chữ số hơn</b> thì bé hơn: 999 &lt; 1 000.',
      'Hai số có cùng số chữ số: so sánh từng cặp chữ số cùng hàng, <b>từ trái sang phải</b> (từ hàng nghìn). Cặp đầu tiên khác nhau cho biết số nào lớn hơn: 9 685 &lt; 9 852 vì 6 trăm &lt; 8 trăm.',
      'Nếu mọi cặp chữ số đều bằng nhau thì hai số bằng nhau.',
      'Muốn xếp các số theo thứ tự, so sánh các số rồi viết từ bé đến lớn (hoặc từ lớn đến bé).',
    ],
    demos: [
      { kind: 'g3b-compare', a: 9685, b: 9852, tries: [{ label: '9 685 và 9 852', a: 9685, b: 9852 }, { label: '999 và 1 000', a: 999, b: 1000 }, { label: '3 001 và 2 999', a: 3001, b: 2999 }] },
      { kind: 'g3b-order', nums: [2965, 2598, 3143, 2419], title: 'Xếp độ cao bốn ngọn núi từ thấp đến cao' },
    ],
  },
  47: {
    title: 'Làm quen với chữ số La Mã', page: PAGE,
    points: [
      'Ba chữ số La Mã cơ bản: <b>I</b> (một), <b>V</b> (năm), <b>X</b> (mười).',
      'Chữ số nhỏ đứng <b>sau</b> chữ số lớn thì <b>cộng thêm</b>: VI = 5 + 1 = 6, XII = 10 + 2 = 12.',
      'Chữ số I đứng <b>trước</b> V hoặc X thì <b>bớt đi 1</b>: IV = 5 − 1 = 4, IX = 10 − 1 = 9.',
      'Các số từ 1 đến 20: I, II, III, IV, V, VI, VII, VIII, IX, X, XI, XII, XIII, XIV, XV, XVI, XVII, XVIII, XIX, XX.',
      'Số La Mã thường gặp trên mặt đồng hồ, ở số chương, số trang sách.',
    ],
    demos: [
      { kind: 'g3b-roman', n: 14, tries: [{ label: '14', n: 14 }, { label: '9', n: 9 }, { label: '17', n: 17 }, { label: '20', n: 20 }] },
      { kind: 'g3b-roman', s: 'XIX', tries: [{ label: 'XIX', s: 'XIX' }, { label: 'XVIII', s: 'XVIII' }, { label: 'IV', s: 'IV' }] },
    ],
  },
  48: {
    title: 'Làm tròn số đến hàng chục, hàng trăm', page: PAGE,
    points: [
      'Khi làm tròn số đến hàng <b>chục</b>, ta so sánh chữ số hàng <b>đơn vị</b> với 5. Bé hơn 5 thì làm tròn <b>xuống</b>, còn lại thì làm tròn <b>lên</b>: 32 → 30; 37 → 40; 35 → 40.',
      'Khi làm tròn số đến hàng <b>trăm</b>, ta so sánh chữ số hàng <b>chục</b> với 5: 3 012 → 3 000; 3 945 → 3 900; 5 072 → 5 100.',
      'Trên tia số: số được làm tròn về số tròn chục (tròn trăm) <b>gần nó hơn</b>. Số ở chính giữa thì làm tròn lên.',
    ],
    demos: [
      { kind: 'g3b-round', n: 37, to: 10, tries: [{ label: '37 (chục)', n: 37, to: 10 }, { label: '32 (chục)', n: 32, to: 10 }, { label: '35 (chục)', n: 35, to: 10 }] },
      { kind: 'g3b-round', n: 3012, to: 100, tries: [{ label: '3 012 (trăm)', n: 3012, to: 100 }, { label: '3 945 (trăm)', n: 3945, to: 100 }, { label: '5 072 (trăm)', n: 5072, to: 100 }] },
    ],
  },
  49: { title: 'Luyện tập chung', see: [45, 46, 47, 48] },
  50: {
    title: 'Chu vi hình tam giác, hình tứ giác, hình chữ nhật, hình vuông', page: PAGE,
    points: [
      '<b>Chu vi</b> của một hình là <b>tổng độ dài các cạnh</b> của hình đó.',
      'Chu vi hình tam giác = tổng độ dài ba cạnh. Chu vi hình tứ giác = tổng độ dài bốn cạnh.',
      'Muốn tính chu vi <b>hình chữ nhật</b>, ta lấy chiều dài cộng với chiều rộng (cùng đơn vị đo) rồi nhân với 2: <b>(dài + rộng) × 2</b>.',
      'Muốn tính chu vi <b>hình vuông</b>, ta lấy độ dài một cạnh nhân với 4: <b>cạnh × 4</b>.',
      'Các cạnh phải cùng đơn vị đo. Ví dụ dài 3 dm, rộng 5 cm: đổi 3 dm = 30 cm rồi mới tính.',
    ],
    demos: [
      { kind: 'g3b-perim', shape: 'tri', sides: [4, 7, 10], unit: 'cm', tries: [{ label: '4, 7, 10 cm', shape: 'tri', sides: [4, 7, 10], unit: 'cm' }, { label: '9, 9, 9 dm', shape: 'tri', sides: [9, 9, 9], unit: 'dm' }, { label: 'Tứ giác', shape: 'quad', sides: [20, 30, 20, 30], unit: 'dm' }] },
      { kind: 'g3b-perim', shape: 'rect', a: 7, b: 3, unit: 'cm', tries: [{ label: 'HCN 7 cm, 3 cm', shape: 'rect', a: 7, b: 3 }, { label: 'Hình vuông 9 cm', shape: 'square', a: 9 }] },
    ],
  },
  51: {
    title: 'Diện tích của một hình. Xăng-ti-mét vuông', page: PAGE,
    points: [
      '<b>Diện tích</b> của một hình là phần mặt phẳng mà hình đó chiếm. Hình P nằm trọn trong hình Q thì diện tích hình P bé hơn diện tích hình Q.',
      'Hai hình gồm số ô vuông như nhau thì có diện tích bằng nhau; hình nào gồm nhiều ô vuông hơn thì có diện tích lớn hơn.',
      '<b>Xăng-ti-mét vuông</b> là diện tích của hình vuông có cạnh dài 1 cm, viết tắt là <b>cm²</b>. Đọc 15 cm² là "mười lăm xăng-ti-mét vuông".',
      'Cộng, trừ, nhân, chia số đo diện tích như với số, rồi viết cm² sau kết quả: 23 cm² + 17 cm² = 40 cm²; 40 cm² : 8 = 5 cm².',
    ],
    demos: [{ kind: 'g3b-area', mode: 'count' }],
  },
  52: {
    title: 'Diện tích hình chữ nhật, diện tích hình vuông', page: PAGE,
    points: [
      'Muốn tính diện tích <b>hình chữ nhật</b>, ta lấy <b>chiều dài nhân với chiều rộng</b> (cùng đơn vị đo).',
      'Muốn tính diện tích <b>hình vuông</b>, ta lấy <b>độ dài một cạnh nhân với chính nó</b>.',
      'Ví dụ: hình chữ nhật dài 17 cm, rộng 8 cm có diện tích 17 × 8 = 136 (cm²). Hình vuông cạnh 9 cm có diện tích 9 × 9 = 81 (cm²).',
      'Đừng nhầm: chu vi đo đường viền quanh hình (cm), diện tích đo phần bên trong hình (cm²).',
    ],
    demos: [
      { kind: 'g3b-area', w: 5, h: 3, tries: [{ label: '5 cm × 3 cm', w: 5, h: 3 }, { label: '6 cm × 4 cm', w: 6, h: 4 }, { label: 'Vuông 4 cm', w: 4, h: 4 }] },
    ],
  },
  53: { title: 'Luyện tập chung', see: [50, 51, 52] },
  54: {
    title: 'Phép cộng trong phạm vi 10 000', page: PAGE,
    points: [
      'Đặt tính: viết các chữ số <b>cùng hàng thẳng cột</b> với nhau (đơn vị dưới đơn vị, chục dưới chục, …).',
      'Cộng <b>từ phải sang trái</b>: hàng đơn vị, hàng chục, hàng trăm, hàng nghìn. Tổng một hàng từ 10 trở lên thì viết chữ số hàng đơn vị và <b>nhớ 1</b> sang hàng bên trái.',
      'Tính nhẩm số tròn nghìn, tròn trăm: 2 000 + 3 000 = ? Nhẩm 2 nghìn + 3 nghìn = 5 nghìn, vậy 2 000 + 3 000 = 5 000.',
    ],
    demos: [
      { kind: 'g3b-add', a: 2475, b: 3818, tries: [{ label: '2 475 + 3 818', a: 2475, b: 3818 }, { label: '5 500 + 1 500', a: 5500, b: 1500 }, { label: '3 726 + 1 259', a: 3726, b: 1259 }] },
      { kind: 'g3b-mental', a: 2000, b: 3000, op: '+', unit: 1000, tries: [{ label: '2 000 + 3 000', a: 2000, b: 3000, unit: 1000 }, { label: '3 200 + 400', a: 3200, b: 400, unit: 100 }] },
    ],
  },
  55: {
    title: 'Phép trừ trong phạm vi 10 000', page: PAGE,
    points: [
      'Đặt tính: viết số trừ dưới số bị trừ, các chữ số cùng hàng thẳng cột. Trừ <b>từ phải sang trái</b>.',
      'Chữ số trên bé hơn chữ số dưới thì <b>lấy thêm 10</b> để trừ, rồi <b>nhớ 1</b> cộng vào chữ số hàng bên trái của số trừ.',
      'Thử lại: lấy hiệu cộng với số trừ, được số bị trừ là đúng.',
      'Tính nhẩm: 8 000 − 5 000 = ? Nhẩm 8 nghìn − 5 nghìn = 3 nghìn, vậy 8 000 − 5 000 = 3 000.',
    ],
    demos: [
      { kind: 'g3b-sub', a: 3143, b: 2427, tries: [{ label: '3 143 − 2 427', a: 3143, b: 2427 }, { label: '6 385 − 2 927', a: 6385, b: 2927 }, { label: '5 250 − 1 300', a: 5250, b: 1300 }] },
      { kind: 'g3b-mental', a: 8000, b: 5000, op: '-', unit: 1000, tries: [{ label: '8 000 − 5 000', a: 8000, b: 5000, unit: 1000 }, { label: '5 700 − 200', a: 5700, b: 200, unit: 100 }] },
    ],
  },
  56: {
    title: 'Nhân số có bốn chữ số với số có một chữ số', page: PAGE,
    points: [
      'Đặt tính: viết thừa số có một chữ số dưới hàng đơn vị của thừa số kia, viết dấu ×, kẻ gạch ngang.',
      'Nhân <b>từ phải sang trái</b>: lấy thừa số có một chữ số nhân lần lượt với từng chữ số. Tích một hàng từ 10 trở lên thì viết chữ số hàng đơn vị, <b>nhớ</b> số chục sang hàng bên trái (cộng vào sau khi nhân).',
      'Tính nhẩm số tròn nghìn: 2 000 × 3 = ? Nhẩm 2 nghìn × 3 = 6 nghìn, vậy 2 000 × 3 = 6 000.',
    ],
    demos: [
      { kind: 'g3b-mul', a: 1427, b: 3, tries: [{ label: '1 427 × 3', a: 1427, b: 3 }, { label: '1 324 × 2', a: 1324, b: 2 }, { label: '2 409 × 4', a: 2409, b: 4 }] },
      { kind: 'g3b-mental', a: 2000, b: 3, op: '×', unit: 1000, tries: [{ label: '2 000 × 3', a: 2000, b: 3 }, { label: '4 000 × 2', a: 4000, b: 2 }] },
    ],
  },
  57: {
    title: 'Chia số có bốn chữ số cho số có một chữ số', page: PAGE,
    points: [
      'Chia <b>từ trái sang phải</b>. Mỗi lượt làm bốn việc: <b>chia</b>, <b>nhân</b>, <b>trừ</b>, <b>hạ</b> chữ số tiếp theo.',
      'Nếu chữ số đầu bé hơn số chia thì lấy hai chữ số đầu để chia: 1 276 : 4, lấy 12 chia 4.',
      'Lượt nào số đem chia bé hơn số chia thì viết <b>0</b> vào thương rồi hạ tiếp.',
      'Lượt cuối còn lại một số bé hơn số chia: đó là <b>số dư</b>. Số dư luôn <b>bé hơn số chia</b>. Phép chia hết thì số dư là 0.',
      'Tính nhẩm: 6 000 : 3 = ? Nhẩm 6 nghìn : 3 = 2 nghìn, vậy 6 000 : 3 = 2 000.',
    ],
    demos: [
      { kind: 'g3b-div', a: 6369, b: 3, tries: [{ label: '6 369 : 3', a: 6369, b: 3 }, { label: '1 276 : 4', a: 1276, b: 4 }, { label: '1 809 : 9', a: 1809, b: 9 }, { label: '2 249 : 4', a: 2249, b: 4 }] },
    ],
  },
  58: { title: 'Luyện tập chung', see: [54, 55, 56, 57, 38] },
  59: {
    title: 'Các số có năm chữ số. Số 100 000', page: PAGE,
    points: [
      '10 nghìn = <b>1 chục nghìn</b> (viết 10 000), 10 chục nghìn = <b>1 trăm nghìn</b> (viết 100 000, đọc là "một trăm nghìn").',
      'Số có năm chữ số có các hàng: <b>chục nghìn, nghìn, trăm, chục, đơn vị</b>.',
      'Viết và đọc số từ trái sang phải. Ba chữ số cuối viết cách ra một chút: 42 316 đọc là "bốn mươi hai nghìn ba trăm mười sáu".',
      'Viết số thành tổng: <b>12 307 = 10 000 + 2 000 + 300 + 7</b>. Số tròn chục nghìn có bốn chữ số tận cùng là 0: 50 000.',
    ],
    demos: [
      { kind: 'g3b-place', n: 42316, tries: [{ label: '42 316', n: 42316 }, { label: '70 508', n: 70508 }, { label: '91 430', n: 91430 }] },
      { kind: 'g3b-place', mode: 'sum', n: 12307, tries: [{ label: '12 307', n: 12307 }, { label: '63 725', n: 63725 }] },
    ],
  },
  60: {
    title: 'So sánh các số trong phạm vi 100 000', page: PAGE,
    points: [
      'Số nào có ít chữ số hơn thì bé hơn: 9 999 &lt; 10 000.',
      'Hai số cùng có năm chữ số: so sánh từng cặp chữ số cùng hàng, bắt đầu từ hàng <b>chục nghìn</b> (bên trái). Cặp đầu tiên khác nhau quyết định số nào lớn hơn.',
      'Muốn tìm số lớn nhất, số bé nhất hay xếp thứ tự, so sánh từng cặp rồi sắp xếp.',
    ],
    demos: [
      { kind: 'g3b-compare', a: 94598, b: 91430, tries: [{ label: '94 598 và 91 430', a: 94598, b: 91430 }, { label: '76 200 và 76 199', a: 76200, b: 76199 }, { label: '9 999 và 10 000', a: 9999, b: 10000 }] },
      { kind: 'g3b-order', nums: [39283, 44930, 39400], tries: [{ label: 'Từ bé đến lớn', nums: [39283, 44930, 39400], desc: false }, { label: 'Từ lớn đến bé', nums: [39283, 44930, 39400], desc: true }] },
    ],
  },
  61: {
    title: 'Làm tròn số đến hàng nghìn, hàng chục nghìn', page: PAGE,
    points: [
      'Khi làm tròn số đến hàng <b>nghìn</b>, ta so sánh chữ số hàng <b>trăm</b> với 5. Bé hơn 5 thì làm tròn xuống, còn lại thì làm tròn lên: 97 418 → 97 000.',
      'Khi làm tròn số đến hàng <b>chục nghìn</b>, ta so sánh chữ số hàng <b>nghìn</b> với 5: 97 418 → 100 000; 21 229 → 20 000.',
      'Các chữ số ở bên phải hàng được làm tròn đều trở thành 0.',
    ],
    demos: [
      { kind: 'g3b-round', n: 97418, to: 1000, tries: [{ label: '97 418 (nghìn)', n: 97418, to: 1000 }, { label: '21 729 (nghìn)', n: 21729, to: 1000 }] },
      { kind: 'g3b-round', n: 97418, to: 10000, tries: [{ label: '97 418 (chục nghìn)', n: 97418, to: 10000 }, { label: '21 229 (chục nghìn)', n: 21229, to: 10000 }, { label: '63 725 (chục nghìn)', n: 63725, to: 10000 }] },
    ],
  },
  62: { title: 'Luyện tập chung', see: [59, 60, 61] },
  63: {
    title: 'Phép cộng trong phạm vi 100 000', page: PAGE,
    points: [
      'Đặt tính và cộng như trong phạm vi 10 000: các chữ số cùng hàng thẳng cột, cộng <b>từ phải sang trái</b>, tổng một hàng từ 10 trở lên thì <b>nhớ 1</b> sang hàng bên trái.',
      'Tính nhẩm theo nghìn, chục nghìn: 20 000 + 30 000 = ? Nhẩm 2 chục nghìn + 3 chục nghìn = 5 chục nghìn, vậy 20 000 + 30 000 = 50 000.',
      'Cộng nhiều số: đặt tính các số thẳng cột rồi cộng từng hàng như cộng hai số.',
    ],
    demos: [
      { kind: 'g3b-add', a: 36528, b: 49347, tries: [{ label: '36 528 + 49 347', a: 36528, b: 49347 }, { label: '9 500 + 13 000', a: 9500, b: 13000 }] },
      { kind: 'g3b-mental', a: 20000, b: 30000, op: '+', unit: 10000, tries: [{ label: '20 000 + 30 000', a: 20000, b: 30000, unit: 10000 }, { label: '35 000 + 3 000', a: 35000, b: 3000, unit: 1000 }] },
    ],
  },
  64: {
    title: 'Phép trừ trong phạm vi 100 000', page: PAGE,
    points: [
      'Đặt tính và trừ như trong phạm vi 10 000: trừ <b>từ phải sang trái</b>; chữ số trên bé hơn thì lấy thêm 10 rồi <b>nhớ 1</b> vào hàng bên trái của số trừ.',
      'Tính nhẩm: 90 000 − 30 000 = ? Nhẩm 9 chục nghìn − 3 chục nghìn = 6 chục nghìn, vậy 90 000 − 30 000 = 60 000.',
      'Thử lại phép trừ bằng phép cộng: hiệu + số trừ = số bị trừ.',
    ],
    demos: [
      { kind: 'g3b-sub', a: 85674, b: 58329, tries: [{ label: '85 674 − 58 329', a: 85674, b: 58329 }, { label: '45 000 − 14 500', a: 45000, b: 14500 }] },
      { kind: 'g3b-mental', a: 90000, b: 30000, op: '-', unit: 10000, tries: [{ label: '90 000 − 30 000', a: 90000, b: 30000, unit: 10000 }, { label: '15 000 − 8 000', a: 15000, b: 8000, unit: 1000 }] },
    ],
  },
  65: { title: 'Luyện tập chung', see: [63, 64, 38] },
  66: {
    title: 'Xem đồng hồ. Tháng, năm', page: PAGE,
    points: [
      'Kim ngắn chỉ <b>giờ</b>, kim dài chỉ <b>phút</b>. Từ số 12, kim phút đi qua mỗi số là thêm <b>5 phút</b>; mỗi vạch nhỏ là 1 phút.',
      'Khi kim phút qua số 6 (quá 30 phút), có thể đọc theo cách <b>kém</b>: 8 giờ 50 phút còn gọi là <b>9 giờ kém 10 phút</b>.',
      'Buổi chiều, buổi tối đọc thêm 12 giờ: 8 giờ tối là <b>20 giờ</b>. 1 giờ = 60 phút.',
      'Một năm có <b>12 tháng</b>. Tháng 1, 3, 5, 7, 8, 10, 12 có <b>31 ngày</b>; tháng 4, 6, 9, 11 có <b>30 ngày</b>; tháng 2 có <b>28 hoặc 29 ngày</b>.',
      'Một tuần có <b>7 ngày</b>. Trên tờ lịch, các ngày cùng một cột cách nhau 7 ngày và là cùng một thứ.',
    ],
    demos: [
      { kind: 'g3b-clock', h: 8, m: 50, tries: [{ label: '8 giờ 50 phút', h: 8, m: 50, pm: false }, { label: '3 giờ 25 phút', h: 3, m: 25, pm: false }, { label: '7 giờ 23 phút', h: 7, m: 23, pm: false }, { label: 'Buổi tối', h: 9, m: 15, pm: true }] },
      { kind: 'g3b-months', ask: 2, tries: [{ label: 'Tháng 2', ask: 2 }, { label: 'Tháng 9', ask: 9 }, { label: 'Tháng 8', ask: 8 }] },
      { kind: 'g3b-cal', month: 12, start: 2, days: 31, d: 10, tries: [{ label: 'Ngày 10', d: 10 }, { label: 'Ngày 24', d: 24 }] },
    ],
  },
  67: { title: 'Thực hành xem đồng hồ, xem lịch', see: [66] },
  68: {
    title: 'Tiền Việt Nam', page: PAGE,
    points: [
      'Một số tờ tiền Việt Nam: 1 000 đồng, 2 000 đồng, 5 000 đồng, 10 000 đồng, 20 000 đồng, 50 000 đồng, 100 000 đồng.',
      'Đếm tiền: xếp các tờ tiền từ mệnh giá lớn đến bé rồi cộng dần. 2 tờ 20 000 đồng và 1 tờ 10 000 đồng là 50 000 đồng.',
      'Đổi tiền: 5 tờ 10 000 đồng đổi được 1 tờ 50 000 đồng; 2 tờ 50 000 đồng đổi được 1 tờ 100 000 đồng.',
      'Tiền trả lại = số tiền đưa − số tiền phải trả.',
    ],
    demos: [
      { kind: 'g3b-money', notes: [20000, 20000, 10000], tries: [{ label: '20 000 + 20 000 + 10 000', notes: [20000, 20000, 10000] }, { label: '50 000 + 5 000 + 2 000', notes: [50000, 5000, 2000, 2000] }] },
      { kind: 'g3b-money', items: [['Rau', 20000], ['Thịt', 70000]], pay: 100000, tries: [{ label: 'Rau và thịt', items: [['Rau', 20000], ['Thịt', 70000]], pay: 100000 }, { label: 'Giày và bút', items: [['Giày', 54000], ['Hộp bút', 16000]], pay: 100000 }] },
    ],
  },
  69: { title: 'Luyện tập chung', see: [66, 68] },
  70: {
    title: 'Nhân số có năm chữ số với số có một chữ số', page: PAGE,
    points: [
      'Đặt tính và nhân như nhân số có bốn chữ số: nhân <b>từ phải sang trái</b>, tích một hàng từ 10 trở lên thì viết chữ số hàng đơn vị, <b>nhớ</b> số chục sang hàng bên trái.',
      'Nhớ cộng số đã nhớ <b>sau khi nhân</b> ở hàng tiếp theo.',
      'Tính nhẩm: 12 000 × 3 = ? Nhẩm 12 nghìn × 3 = 36 nghìn, vậy 12 000 × 3 = 36 000.',
    ],
    demos: [
      { kind: 'g3b-mul', a: 21526, b: 3, tries: [{ label: '21 526 × 3', a: 21526, b: 3 }, { label: '12 125 × 3', a: 12125, b: 3 }, { label: '10 715 × 6', a: 10715, b: 6 }] },
      { kind: 'g3b-mental', a: 12000, b: 3, op: '×', unit: 1000, tries: [{ label: '12 000 × 3', a: 12000, b: 3 }, { label: '20 000 × 4', a: 20000, b: 4, unit: 10000 }] },
    ],
  },
  71: {
    title: 'Chia số có năm chữ số cho số có một chữ số', page: PAGE,
    points: [
      'Chia <b>từ trái sang phải</b>, mỗi lượt: <b>chia, nhân, trừ, hạ</b>. Chữ số đầu bé hơn số chia thì lấy hai chữ số đầu.',
      'Số đem chia bé hơn số chia thì viết <b>0</b> vào thương rồi hạ tiếp.',
      'Số dư luôn <b>bé hơn số chia</b>. Thử lại: thương × số chia + số dư = số bị chia.',
      'Tính nhẩm: 60 000 : 3 = ? Nhẩm 6 chục nghìn : 3 = 2 chục nghìn, vậy 60 000 : 3 = 20 000.',
    ],
    demos: [
      { kind: 'g3b-div', a: 10560, b: 4, tries: [{ label: '10 560 : 4', a: 10560, b: 4 }, { label: '10 243 : 4', a: 10243, b: 4 }, { label: '97 687 : 8', a: 97687, b: 8 }] },
    ],
  },
  72: { title: 'Luyện tập chung', see: [70, 71, 38] },
  73: {
    title: 'Thu thập, phân loại, ghi chép số liệu. Bảng số liệu', page: PAGE,
    points: [
      'Muốn biết các bạn thích gì, ta <b>thu thập</b> số liệu (hỏi, quan sát) và <b>phân loại</b> theo từng nhóm.',
      'Ghi chép bằng <b>vạch kiểm đếm</b>: mỗi lần đếm được một, vạch một vạch; vạch thứ năm gạch chéo thành một nhóm 5.',
      'Ghi kết quả vào <b>bảng số liệu</b>: một hàng ghi tên, một hàng ghi số tương ứng.',
      'Đọc bảng số liệu để trả lời: cái nào nhiều nhất, ít nhất, nhiều hơn bao nhiêu, tất cả bao nhiêu.',
    ],
    demos: [
      { kind: 'g3b-table', items: [['Bóng đá', 8], ['Cầu lông', 5], ['Bơi', 12], ['Cờ vua', 3]], what: 'bạn', head: 'Môn thể thao', rowName: 'Số bạn' },
    ],
  },
  74: {
    title: 'Khả năng xảy ra của một sự kiện', page: PAGE,
    points: [
      'Có những sự kiện <b>chắc chắn</b> xảy ra, <b>có thể</b> xảy ra hoặc <b>không thể</b> xảy ra.',
      'Hộp chỉ có bi đỏ: lấy 1 viên thì <b>chắc chắn</b> được bi đỏ, <b>không thể</b> được bi vàng.',
      'Hộp có cả bi đỏ và bi vàng: lấy 1 viên thì <b>có thể</b> được bi đỏ, cũng <b>có thể</b> được bi vàng.',
      'Gieo xúc xắc 6 mặt (1 đến 6): <b>có thể</b> được mặt 6 chấm; <b>không thể</b> được mặt 7 chấm.',
    ],
    demos: [
      { kind: 'g3b-chance', want: 'red', tries: [{ label: 'Bi đỏ', want: 'red' }, { label: 'Bi vàng', want: 'yellow' }] },
    ],
  },
  75: { title: 'Hoạt động thực hành và trải nghiệm', see: [73, 74] },
  76: { title: 'Ôn tập các số trong phạm vi 10 000, 100 000', see: [59, 60, 61, 47] },
  77: { title: 'Ôn tập phép cộng, phép trừ trong phạm vi 100 000', see: [63, 64, 68, 38] },
  78: { title: 'Ôn tập phép nhân, phép chia trong phạm vi 100 000', see: [70, 71, 38] },
  79: { title: 'Ôn tập hình học và đo lường', see: [50, 52, 66, 68] },
  80: { title: 'Ôn tập bảng số liệu, khả năng xảy ra của một sự kiện', see: [73, 74] },
  81: { title: 'Ôn tập chung', see: [59, 60, 63, 64, 70, 71, 52, 66] },
};
