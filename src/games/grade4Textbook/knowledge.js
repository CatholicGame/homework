/**
 * Kiến thức từng bài học của SGK Toán 4 (NXB Giáo dục Việt Nam, 2011): phần lí thuyết ở đầu mỗi bài
 * (trước các bài tập 1, 2, 3…), viết lại bằng lời dễ hiểu cho học sinh lớp 4, giữ đúng cách làm,
 * đúng thứ tự các bước và cách viết số của sách. Nguồn: docs/lop_4/Sách giáo khoa Toán 4.pdf.
 *
 * Nút "📘 Kiến thức" trên mỗi bài tập mở lớp này. Chỉ có các bài dạy kiến thức mới;
 * các bài "Luyện tập", "Luyện tập chung", "Ôn tập …", "Thực hành" (bản đồ) không có mục ở đây.
 *
 *   KNOWLEDGE['bai-4'] = { points: [quy tắc, định nghĩa…], examples: [ví dụ đã giải], demos: [ví dụ xem từng bước] }
 * demos: xem knowledgeDemo.js (so sánh, cộng, trừ, nhân đặt tính), thay cho ví dụ chữ dài cùng nội dung.
 * Được dùng HTML <b>, <br>; phân số viết bằng fr(a, b).
 */

import { fr } from './kit.js';

export const KNOWLEDGE = {
  // ── Chương một ──────────────────────────────────────────────────────────
  'bai-4': {
    points: [
      '<b>3 + a</b> là một <b>biểu thức có chứa một chữ</b>: ngoài các số và dấu phép tính, còn có một chữ (a).',
      'Mỗi lần thay chữ bằng một số rồi tính, ta được <b>một giá trị của biểu thức</b>.',
      'Thay chữ bằng số khác thì thường được giá trị khác.',
    ],
    examples: [
      'Lan có 3 quyển vở, mẹ cho thêm a quyển thì Lan có tất cả 3 + a quyển vở.',
      'Nếu a = 1 thì 3 + a = 3 + 1 = 4; 4 là một giá trị của biểu thức 3 + a.',
      'Nếu a = 3 thì 3 + a = 3 + 3 = 6; 6 là một giá trị của biểu thức 3 + a.',
    ],
  },
  'bai-6': {
    points: [
      '10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = 1 nghìn.',
      '10 nghìn = 1 chục nghìn (viết 10 000), 10 chục nghìn = 1 trăm nghìn (viết 100 000).',
      'Số có sáu chữ số có các hàng: <b>trăm nghìn, chục nghìn, nghìn, trăm, chục, đơn vị</b>.',
      'Viết số và đọc số từ hàng cao nhất (trăm nghìn) đến hàng thấp nhất (đơn vị).',
    ],
    examples: [
      'Số gồm 4 trăm nghìn, 3 chục nghìn, 2 nghìn, 5 trăm, 1 chục, 6 đơn vị.<br>Viết số: 432 516.<br>Đọc số: bốn trăm ba mươi hai nghìn năm trăm mười sáu.',
    ],
  },
  'bai-8': {
    points: [
      'Hàng đơn vị, hàng chục, hàng trăm hợp thành <b>lớp đơn vị</b>.',
      'Hàng nghìn, hàng chục nghìn, hàng trăm nghìn hợp thành <b>lớp nghìn</b>.',
      'Mỗi lớp có ba hàng; khi viết số, giữa hai lớp để một khoảng trống nhỏ.',
    ],
    examples: [
      'Số 654 321: lớp nghìn gồm các chữ số 6, 5, 4; lớp đơn vị gồm các chữ số 3, 2, 1.',
      'Số 654 000: lớp nghìn là 6, 5, 4; lớp đơn vị là 0, 0, 0.',
    ],
  },
  'bai-9': {
    points: [
      'Số nào có <b>ít chữ số hơn</b> thì bé hơn; số nào có nhiều chữ số hơn thì lớn hơn.',
      'Nếu hai số có số chữ số bằng nhau, ta so sánh từng cặp chữ số ở cùng một hàng, bắt đầu từ hàng cao nhất (từ trái sang phải). Cặp đầu tiên khác nhau quyết định số nào lớn hơn.',
    ],
    demos: [{ kind: 'compare', a: 99578, b: 100000 }, { kind: 'compare', a: 693251, b: 693500 }],
  },
  'bai-10': {
    points: [
      '10 trăm nghìn gọi là <b>1 triệu</b>, viết là 1 000 000.',
      '10 triệu gọi là <b>1 chục triệu</b>, viết là 10 000 000.',
      '10 chục triệu gọi là <b>1 trăm triệu</b>, viết là 100 000 000.',
      '<b>Lớp triệu</b> gồm ba hàng: triệu, chục triệu, trăm triệu.',
    ],
    examples: [
      '3 chục triệu viết là 30 000 000; 2 trăm triệu viết là 200 000 000.',
      'Ba trăm mười hai triệu viết là 312 000 000: hàng trăm triệu là 3, hàng chục triệu là 1, hàng triệu là 2, các hàng còn lại là 0.',
    ],
  },
  'bai-11': {
    points: [
      'Để đọc một số lớn, ta tách số thành từng lớp, mỗi lớp ba hàng, tính từ lớp đơn vị đến lớp nghìn rồi lớp triệu.',
      'Sau đó đọc từ trái sang phải: đọc số có ba chữ số của từng lớp, rồi đọc tên lớp đó (triệu, nghìn).',
    ],
    examples: [
      'Lớp triệu: 3, 4, 2; lớp nghìn: 1, 5, 7; lớp đơn vị: 4, 1, 3.<br>Viết số: 342 157 413.<br>Đọc số: ba trăm bốn mươi hai triệu một trăm năm mươi bảy nghìn bốn trăm mười ba.',
    ],
  },
  'bai-14': {
    points: [
      'Các số 0, 1, 2, 3, …, 10, …, 100, … là các <b>số tự nhiên</b>. Xếp chúng từ bé đến lớn ta được <b>dãy số tự nhiên</b>: 0; 1; 2; 3; 4; …',
      'Có thể biểu diễn dãy số tự nhiên trên tia số: số 0 ứng với điểm gốc, mỗi số ứng với một điểm.',
      'Thêm 1 vào số nào cũng được số liền sau, nên <b>không có số tự nhiên lớn nhất</b>, dãy số kéo dài mãi.',
      'Bớt 1 ở một số (khác 0) được số liền trước. Không có số nào liền trước số 0, nên <b>0 là số tự nhiên bé nhất</b>.',
      'Hai số liên tiếp hơn hoặc kém nhau 1 đơn vị.',
    ],
    examples: [
      'Số 1 000 000 thêm 1 được số liền sau là 1 000 001.',
      'Số 1 bớt 1 được số liền trước là 0.',
    ],
  },
  'bai-15': {
    points: [
      'Ở mỗi hàng chỉ viết được một chữ số. Cứ mười đơn vị ở một hàng thì hợp thành một đơn vị ở hàng trên liền nó: 10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = 1 nghìn, …',
      'Chỉ với mười chữ số 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ta viết được mọi số tự nhiên.',
      '<b>Giá trị của mỗi chữ số phụ thuộc vào vị trí của nó trong số đó.</b> Cách viết số như vậy gọi là viết số tự nhiên trong <b>hệ thập phân</b>.',
    ],
    examples: [
      '"Hai nghìn không trăm linh năm" viết là 2005.',
      'Số 999 có ba chữ số 9; từ phải sang trái, mỗi chữ số 9 có giá trị là 9; 90; 900.',
      '387 = 300 + 80 + 7.',
    ],
  },
  'bai-16': {
    points: [
      'Số nào có nhiều chữ số hơn thì lớn hơn, số nào có ít chữ số hơn thì bé hơn.',
      'Nếu hai số có số chữ số bằng nhau thì so sánh từng cặp chữ số ở cùng một hàng, từ trái sang phải. Nếu mọi cặp đều bằng nhau thì hai số bằng nhau.',
      'Trong dãy số tự nhiên, số đứng trước bé hơn số đứng sau. Trên tia số, số ở gần gốc 0 hơn là số bé hơn.',
      'Vì luôn so sánh được, ta có thể <b>xếp thứ tự</b> các số tự nhiên từ bé đến lớn hoặc từ lớn đến bé.',
    ],
    examples: [
      '100 > 99; 99 < 100.',
      'Xếp 7698; 7968; 7896; 7869 từ bé đến lớn: 7698; 7869; 7896; 7968.',
    ],
    demos: [{ kind: 'compare', a: 29869, b: 30005 }],
  },
  'bai-18': {
    points: [
      'Để đo những vật nặng hàng chục, hàng trăm, hàng nghìn ki-lô-gam, người ta còn dùng các đơn vị <b>yến, tạ, tấn</b>.',
      '1 yến = 10kg.',
      '1 tạ = 10 yến = 100kg.',
      '1 tấn = 10 tạ = 1000kg.',
    ],
    examples: [
      '5 yến = 50kg; 1 yến 7kg = 17kg.',
      '2 tấn 85kg = 2085kg.',
    ],
  },
  'bai-19': {
    points: [
      'Để đo những vật nặng hàng chục, hàng trăm gam, người ta còn dùng <b>đề-ca-gam</b> (viết tắt dag) và <b>héc-tô-gam</b> (viết tắt hg).',
      '1dag = 10g; 1hg = 10dag = 100g.',
      'Bảng đơn vị đo khối lượng, từ lớn đến bé: tấn, tạ, yến, kg, hg, dag, g.',
      'Mỗi đơn vị đo khối lượng đều <b>gấp 10 lần</b> đơn vị bé hơn, liền nó.',
    ],
    examples: [
      '1kg = 10hg = 1000g; 1 tấn = 10 tạ = 1000kg.',
      '4dag = 40g; 3kg = 30hg; 2kg 300g = 2300g.',
    ],
  },
  'bai-20': {
    points: [
      '1 giờ = 60 phút; 1 phút = 60 giây.',
      '1 thế kỉ = 100 năm.',
      'Từ năm 1 đến năm 100 là thế kỉ một (thế kỉ I), từ năm 101 đến năm 200 là thế kỉ hai (thế kỉ II), …',
      'Từ năm 1901 đến năm 2000 là thế kỉ hai mươi (thế kỉ XX); từ năm 2001 đến năm 2100 là thế kỉ hai mươi mốt (thế kỉ XXI).',
    ],
    examples: [
      '2 phút = 120 giây; 1 phút 8 giây = 68 giây.',
      'Năm 1945 thuộc thế kỉ XX.',
    ],
  },
  'bai-22': {
    points: [
      'Can thứ nhất có 6 lít dầu, can thứ hai có 4 lít dầu. Rót đều số dầu đó vào 2 can thì mỗi can có (6 + 4) : 2 = 5 (lít). Ta gọi 5 là <b>số trung bình cộng</b> của 6 và 4.',
      '<b>Muốn tìm số trung bình cộng của nhiều số</b>, ta tính tổng của các số đó, rồi chia tổng đó cho số các số hạng.',
    ],
    examples: [
      'Ba lớp có 25, 27 và 32 học sinh.<br>Tổng số học sinh: 25 + 27 + 32 = 84 (học sinh).<br>Trung bình mỗi lớp có: 84 : 3 = 28 (học sinh).',
      'Viết gọn: (25 + 27 + 32) : 3 = 28.',
    ],
  },
  'bai-24': {
    points: [
      'Biểu đồ tranh dùng hình vẽ để cho biết số lượng của từng thứ.',
      'Đọc biểu đồ: xem cột (hoặc hàng) bên trái ghi tên gì, phần bên phải có bao nhiêu hình, mỗi hình chỉ bao nhiêu (đọc phần chú ý nếu có).',
      'Từ biểu đồ ta trả lời được: có những ai (cái gì), mỗi người (mỗi thứ) có bao nhiêu, ai nhiều hơn, ai ít hơn.',
    ],
    examples: [
      'Biểu đồ "Các con của năm gia đình": cột trái ghi tên gia đình, cột phải vẽ các con. Hàng "Gia đình cô Mai" có 2 hình bạn gái, nên gia đình cô Mai có 2 con gái.',
      'Hàng "Gia đình cô Lan" có 1 hình bạn trai, nên gia đình cô Lan có 1 con trai.',
    ],
  },
  'bai-25': {
    points: [
      'Biểu đồ cột dùng các cột cao thấp khác nhau để chỉ số lượng.',
      'Hàng dưới ghi tên từng đối tượng; các số ở bên trái chỉ số lượng; số ghi ở đỉnh cột cho biết cột đó chỉ bao nhiêu.',
      'Cột cao hơn chỉ số lượng nhiều hơn, cột thấp hơn chỉ số lượng ít hơn.',
    ],
    examples: [
      'Biểu đồ "Số chuột bốn thôn đã diệt được": thôn Đông 2000 con, thôn Đoài 2200 con, thôn Trung 1600 con, thôn Thượng 2750 con.<br>Cột thôn Thượng cao nhất nên thôn Thượng diệt được nhiều chuột nhất.',
    ],
  },

  // ── Chương hai ──────────────────────────────────────────────────────────
  'bai-29': {
    points: [
      'Đặt tính: viết số hạng này dưới số hạng kia sao cho các chữ số cùng hàng thẳng cột với nhau, viết dấu +, kẻ gạch ngang.',
      'Cộng theo thứ tự <b>từ phải sang trái</b> (từ hàng đơn vị). Được 10 trở lên thì viết chữ số hàng đơn vị và <b>nhớ 1</b> sang hàng bên trái.',
    ],
    demos: [{ kind: 'add', a: 48352, b: 21026 }, { kind: 'add', a: 367859, b: 541728 }],
  },
  'bai-30': {
    points: [
      'Đặt tính: viết số trừ dưới số bị trừ, các chữ số cùng hàng thẳng cột, viết dấu −, kẻ gạch ngang.',
      'Trừ theo thứ tự <b>từ phải sang trái</b>. Nếu chữ số trên bé hơn chữ số dưới thì lấy thêm 10 để trừ (nhớ 1), rồi thêm 1 vào chữ số của số trừ ở hàng bên trái.',
    ],
    demos: [{ kind: 'sub', a: 865279, b: 450237 }, { kind: 'sub', a: 647253, b: 285749 }],
  },
  'bai-32': {
    points: [
      '<b>a + b</b> là một <b>biểu thức có chứa hai chữ</b>.',
      'Mỗi lần thay hai chữ bằng hai số rồi tính, ta được một <b>giá trị của biểu thức</b> a + b.',
    ],
    examples: [
      'Nếu a = 3 và b = 2 thì a + b = 3 + 2 = 5; 5 là một giá trị của biểu thức a + b.',
      'Nếu a = 4 và b = 0 thì a + b = 4 + 0 = 4.',
      'Nếu a = 0 và b = 1 thì a + b = 0 + 1 = 1.',
    ],
  },
  'bai-33': {
    points: [
      'Giá trị của a + b và của b + a luôn bằng nhau: <b>a + b = b + a</b>.',
      '<b>Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.</b>',
    ],
    examples: [
      '20 + 30 = 50 và 30 + 20 = 50.',
      '1208 + 2764 = 3972 và 2764 + 1208 = 3972.',
    ],
  },
  'bai-34': {
    points: [
      '<b>a + b + c</b> là một <b>biểu thức có chứa ba chữ</b>.',
      'Mỗi lần thay ba chữ bằng ba số rồi tính, ta được một giá trị của biểu thức a + b + c.',
    ],
    examples: [
      'Nếu a = 2, b = 3 và c = 4 thì a + b + c = 2 + 3 + 4 = 5 + 4 = 9.',
      'Nếu a = 5, b = 1 và c = 0 thì a + b + c = 5 + 1 + 0 = 6 + 0 = 6.',
      'Nếu a = 1, b = 0 và c = 2 thì a + b + c = 1 + 0 + 2 = 1 + 2 = 3.',
    ],
  },
  'bai-35': {
    points: [
      'Giá trị của (a + b) + c và của a + (b + c) luôn bằng nhau: <b>(a + b) + c = a + (b + c)</b>.',
      '<b>Khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba.</b>',
      'Vì vậy có thể tính a + b + c = (a + b) + c = a + (b + c), chọn cách nào tính thuận tiện hơn.',
    ],
    examples: [
      '(5 + 4) + 6 = 9 + 6 = 15 và 5 + (4 + 6) = 5 + 10 = 15.',
      '(28 + 49) + 51 = 77 + 51 = 128 và 28 + (49 + 51) = 28 + 100 = 128.',
    ],
  },
  'bai-37': {
    points: [
      '<b>Số bé = (Tổng − Hiệu) : 2</b>; sau đó tìm số lớn = số bé + hiệu.',
      'Hoặc: <b>Số lớn = (Tổng + Hiệu) : 2</b>; sau đó tìm số bé = số lớn − hiệu.',
      'Khi làm bài, có thể giải theo một trong hai cách trên.',
    ],
    examples: [
      'Tổng của hai số là 70, hiệu là 10.<br>Cách 1: Hai lần số bé là 70 − 10 = 60. Số bé là 60 : 2 = 30. Số lớn là 30 + 10 = 40.',
      'Cách 2: Hai lần số lớn là 70 + 10 = 80. Số lớn là 80 : 2 = 40. Số bé là 40 − 10 = 30.<br>Đáp số: Số lớn 40; số bé 30.',
    ],
  },
  'bai-40': {
    points: [
      '<b>Góc nhọn</b> bé hơn góc vuông.',
      '<b>Góc tù</b> lớn hơn góc vuông.',
      '<b>Góc bẹt</b> bằng hai góc vuông; hai cạnh của góc bẹt nằm trên một đường thẳng.',
      'Dùng ê ke để kiểm tra: đặt góc vuông của ê ke trùng đỉnh và một cạnh của góc rồi so cạnh còn lại.',
    ],
    examples: [
      'Góc nhọn đỉnh O; cạnh OA, OB.',
      'Góc bẹt đỉnh O; cạnh OC, OD (C, O, D thẳng hàng).',
    ],
  },
  'bai-41': {
    points: [
      'Kéo dài hai cạnh BC và DC của hình chữ nhật ABCD ta được <b>hai đường thẳng vuông góc</b> với nhau.',
      'Hai đường thẳng vuông góc với nhau tạo thành bốn góc vuông có chung đỉnh.',
      'Ta thường dùng <b>ê ke</b> để kiểm tra hoặc vẽ hai đường thẳng vuông góc.',
    ],
    examples: [
      'Hai đường thẳng OM và ON vuông góc với nhau tạo thành bốn góc vuông chung đỉnh O.',
      'Trong hình chữ nhật ABCD: AB và BC là một cặp cạnh vuông góc với nhau.',
    ],
  },
  'bai-42': {
    points: [
      'Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD ta được <b>hai đường thẳng song song</b> với nhau.',
      'Hai đường thẳng song song với nhau <b>không bao giờ cắt nhau</b>.',
    ],
    examples: [
      'Trong hình chữ nhật ABCD: AB song song với DC, AD song song với BC.',
    ],
  },
  'bai-43': {
    points: [
      'Vẽ đường thẳng CD đi qua điểm E và vuông góc với đường thẳng AB: đặt một cạnh góc vuông của ê ke trùng với đường thẳng AB.',
      'Trượt ê ke dọc theo AB cho đến khi cạnh góc vuông còn lại chạm điểm E, rồi vạch một đường thẳng theo cạnh đó. Cách này dùng được khi E nằm trên hoặc nằm ngoài đường thẳng AB.',
      '<b>Đường cao</b> của hình tam giác ABC: qua đỉnh A vẽ đường thẳng vuông góc với cạnh BC, cắt BC tại H. Đoạn thẳng AH là đường cao của hình tam giác ABC.',
    ],
    examples: [
      'Tam giác ABC, từ A vẽ đường vuông góc xuống BC, gặp BC tại H: AH là đường cao, góc AHB là góc vuông.',
    ],
  },
  'bai-44': {
    points: [
      'Muốn vẽ đường thẳng CD đi qua điểm E và song song với đường thẳng AB, ta làm hai bước:',
      'Bước 1: vẽ đường thẳng MN đi qua E và vuông góc với AB.',
      'Bước 2: vẽ đường thẳng CD đi qua E và vuông góc với MN. Khi đó CD song song với AB.',
    ],
    examples: [
      'Cả AB và CD đều vuông góc với MN, nên CD song song với AB.',
    ],
  },
  'bai-45': {
    points: [
      'Vẽ hình chữ nhật có chiều dài 4cm, chiều rộng 2cm:',
      '1. Vẽ đoạn thẳng DC = 4cm.',
      '2. Vẽ đường thẳng vuông góc với DC tại D, trên đó lấy đoạn DA = 2cm.',
      '3. Vẽ đường thẳng vuông góc với DC tại C, trên đó lấy đoạn CB = 2cm.',
      '4. Nối A với B ta được hình chữ nhật ABCD.',
    ],
    examples: [
      'Hình chữ nhật dài 5cm, rộng 3cm có chu vi (5 + 3) × 2 = 16 (cm).',
      'Hai đoạn thẳng AC và BD là hai <b>đường chéo</b> của hình chữ nhật ABCD.',
    ],
  },
  'bai-46': {
    points: [
      'Vẽ hình vuông có cạnh 3cm:',
      '1. Vẽ đoạn thẳng DC = 3cm.',
      '2. Vẽ đường thẳng vuông góc với DC tại D và đường thẳng vuông góc với DC tại C. Trên mỗi đường đó lấy DA = 3cm, CB = 3cm.',
      '3. Nối A với B ta được hình vuông ABCD.',
    ],
    examples: [
      'Hình vuông cạnh 4cm có chu vi 4 × 4 = 16 (cm) và diện tích 4 × 4 = 16 (cm²).',
    ],
  },
  'bai-49': {
    points: [
      'Đặt tính: viết thừa số có một chữ số dưới hàng đơn vị của thừa số kia, viết dấu ×, kẻ gạch ngang.',
      'Nhân theo thứ tự <b>từ phải sang trái</b>. Được tích từ 10 trở lên thì viết chữ số hàng đơn vị, nhớ chữ số hàng chục để cộng vào lần nhân sau.',
    ],
    demos: [{ kind: 'mul1', a: 241324, b: 2 }, { kind: 'mul1', a: 136204, b: 4 }],
  },
  'bai-50': {
    points: [
      'Giá trị của a × b và của b × a luôn bằng nhau: <b>a × b = b × a</b>.',
      '<b>Khi đổi chỗ các thừa số trong một tích thì tích không thay đổi.</b>',
    ],
    examples: [
      '7 × 5 = 35 và 5 × 7 = 35, vậy 7 × 5 = 5 × 7.',
      '4 × 8 = 32 và 8 × 4 = 32.',
    ],
  },
  'bai-51': {
    points: [
      'Khi nhân một số tự nhiên với 10, 100, 1000, … ta chỉ việc <b>viết thêm</b> một, hai, ba, … chữ số 0 vào bên phải số đó.',
      'Khi chia số tròn chục, tròn trăm, tròn nghìn, … cho 10, 100, 1000, … ta chỉ việc <b>bỏ bớt</b> một, hai, ba, … chữ số 0 ở bên phải số đó.',
    ],
    examples: [
      '35 × 10 = 10 × 35 = 1 chục × 35 = 35 chục = 350; ngược lại 350 : 10 = 35.',
      '35 × 100 = 3500; 3500 : 100 = 35.',
      '35 × 1000 = 35 000; 35 000 : 1000 = 35.',
    ],
  },
  'bai-52': {
    points: [
      'Giá trị của (a × b) × c và của a × (b × c) luôn bằng nhau: <b>(a × b) × c = a × (b × c)</b>.',
      '<b>Khi nhân một tích hai số với số thứ ba, ta có thể nhân số thứ nhất với tích của số thứ hai và số thứ ba.</b>',
      'Vì vậy có thể tính a × b × c = (a × b) × c = a × (b × c), chọn cách nào tính thuận tiện hơn.',
    ],
    examples: [
      '(2 × 3) × 4 = 6 × 4 = 24 và 2 × (3 × 4) = 2 × 12 = 24.',
      '(3 × 4) × 5 = 60 và 3 × (4 × 5) = 60.',
    ],
  },
  'bai-53': {
    points: [
      'Khi một thừa số có tận cùng là chữ số 0, ta nhân phần còn lại trước, rồi <b>viết thêm các chữ số 0</b> vào bên phải kết quả.',
      'Khi đặt tính, viết các chữ số 0 ra ngoài bên phải; nhân các chữ số khác 0 với nhau, rồi viết thêm số chữ số 0 vào bên phải tích.',
    ],
    examples: [
      '1324 × 20 = 1324 × (2 × 10) = (1324 × 2) × 10 = 2648 × 10 = 26 480.<br>Nhân 1324 với 2, được 2648; viết thêm một chữ số 0 vào bên phải 2648, được 26 480.',
      '230 × 70 = (23 × 10) × (7 × 10) = (23 × 7) × (10 × 10) = 161 × 100 = 16 100.<br>Nhân 23 với 7, được 161; viết thêm hai chữ số 0 vào bên phải 161, được 16 100.',
    ],
  },
  'bai-54': {
    points: [
      'Để đo diện tích người ta còn dùng đơn vị <b>đề-xi-mét vuông</b>.',
      'Đề-xi-mét vuông là diện tích của hình vuông có cạnh dài 1dm. Đề-xi-mét vuông viết tắt là <b>dm²</b>.',
      'Hình vuông 1dm² gồm 100 hình vuông 1cm²: <b>1dm² = 100cm²</b>.',
    ],
    examples: [
      '102dm² đọc là: một trăm linh hai đề-xi-mét vuông.',
      '48dm² = 4800cm²; 2000cm² = 20dm².',
    ],
  },
  'bai-55': {
    points: [
      'Để đo diện tích người ta còn dùng đơn vị <b>mét vuông</b>.',
      'Mét vuông là diện tích của hình vuông có cạnh dài 1m. Mét vuông viết tắt là <b>m²</b>.',
      'Hình vuông 1m² gồm 100 hình vuông 1dm²: <b>1m² = 100dm²</b>.',
    ],
    examples: [
      '1m² = 100dm²; 400dm² = 4m².',
      '1dm² = 100cm², nên 1m² = 10 000cm².',
    ],
  },
  'bai-56': {
    points: [
      '<b>Khi nhân một số với một tổng, ta có thể nhân số đó với từng số hạng của tổng, rồi cộng các kết quả với nhau.</b>',
      'a × (b + c) = a × b + a × c',
    ],
    examples: [
      '4 × (3 + 5) = 4 × 8 = 32 và 4 × 3 + 4 × 5 = 12 + 20 = 32.<br>Vậy 4 × (3 + 5) = 4 × 3 + 4 × 5.',
      '38 × 6 + 38 × 4 = 38 × (6 + 4) = 38 × 10 = 380.',
    ],
  },
  'bai-57': {
    points: [
      '<b>Khi nhân một số với một hiệu, ta có thể lần lượt nhân số đó với số bị trừ và số trừ, rồi trừ hai kết quả cho nhau.</b>',
      'a × (b − c) = a × b − a × c',
    ],
    examples: [
      '3 × (7 − 5) = 3 × 2 = 6 và 3 × 7 − 3 × 5 = 21 − 15 = 6.<br>Vậy 3 × (7 − 5) = 3 × 7 − 3 × 5.',
    ],
  },
  'bai-59': {
    points: [
      'Nhân với số có hai chữ số: lấy thừa số thứ nhất nhân lần lượt với chữ số hàng đơn vị, rồi với chữ số hàng chục của thừa số thứ hai, sau đó cộng hai kết quả.',
      'Kết quả nhân với chữ số hàng đơn vị gọi là <b>tích riêng thứ nhất</b>; kết quả nhân với chữ số hàng chục gọi là <b>tích riêng thứ hai</b>.',
      'Tích riêng thứ hai được viết <b>lùi sang bên trái một cột</b>, vì nó là số chục.',
    ],
    examples: [
      '36 × 23 = 36 × (20 + 3) = 36 × 20 + 36 × 3 = 720 + 108 = 828.',
      'Đặt tính 36 × 23: 3 nhân 6 bằng 18, viết 8 nhớ 1; 3 nhân 3 bằng 9, thêm 1 bằng 10, viết 10.<br>2 nhân 6 bằng 12, viết 2 (dưới 0) nhớ 1; 2 nhân 3 bằng 6, thêm 1 bằng 7, viết 7.<br>Hạ 8; 0 cộng 2 bằng 2, viết 2; 1 cộng 7 bằng 8, viết 8. Vậy 36 × 23 = 828.<br>108 là tích riêng thứ nhất, 72 là tích riêng thứ hai (72 chục, tức 720).',
    ],
  },
  'bai-61': {
    points: [
      'Nhân nhẩm số có hai chữ số với 11: cộng hai chữ số của số đó, rồi viết tổng vào giữa hai chữ số.',
      'Nếu tổng hai chữ số từ 10 trở lên: viết chữ số hàng đơn vị của tổng vào giữa, rồi thêm 1 vào chữ số bên trái.',
    ],
    examples: [
      '27 × 11: 2 cộng 7 bằng 9; viết 9 vào giữa hai chữ số của 27, được 297.',
      '48 × 11: 4 cộng 8 bằng 12; viết 2 vào giữa hai chữ số của 48, được 428; thêm 1 vào 4 của 428, được 528.',
    ],
  },
  'bai-62': {
    points: [
      'Nhân với số có ba chữ số: nhân lần lượt với chữ số hàng đơn vị, hàng chục, hàng trăm, được <b>tích riêng thứ nhất, thứ hai, thứ ba</b>, rồi cộng lại.',
      'Tích riêng thứ hai viết lùi sang trái <b>một cột</b> (là số chục); tích riêng thứ ba viết lùi sang trái <b>hai cột</b> (là số trăm), so với tích riêng thứ nhất.',
    ],
    examples: [
      '164 × 123 = 164 × (100 + 20 + 3) = 164 × 100 + 164 × 20 + 164 × 3 = 16 400 + 3280 + 492 = 20 172.',
      'Đặt tính 164 × 123: tích riêng thứ nhất 164 × 3 = 492; tích riêng thứ hai 164 × 2 = 328 (lùi một cột); tích riêng thứ ba 164 × 1 = 164 (lùi hai cột).<br>Cộng lại được 20 172.',
    ],
  },
  'bai-63': {
    points: [
      'Khi thừa số thứ hai có chữ số 0 ở hàng chục, tích riêng thứ hai gồm toàn chữ số 0.',
      'Thường ta <b>không viết</b> tích riêng toàn chữ số 0 đó; khi ấy tích riêng tiếp theo phải viết <b>lùi sang trái hai cột</b> so với tích riêng thứ nhất.',
    ],
    examples: [
      '258 × 203: tích riêng thứ nhất 258 × 3 = 774; bỏ qua tích riêng 000; tích riêng 258 × 2 = 516 viết lùi sang trái hai cột.<br>Cộng lại: 258 × 203 = 52 374.',
    ],
  },
  'bai-66': {
    points: [
      '<b>Khi chia một tổng cho một số, nếu các số hạng của tổng đều chia hết cho số chia thì ta có thể chia từng số hạng cho số chia, rồi cộng các kết quả tìm được với nhau.</b>',
      '(a + b) : c = a : c + b : c (khi a và b đều chia hết cho c).',
    ],
    examples: [
      '(35 + 21) : 7 = 56 : 7 = 8 và 35 : 7 + 21 : 7 = 5 + 3 = 8.<br>Vậy (35 + 21) : 7 = 35 : 7 + 21 : 7.',
      'Ngược lại: 12 : 4 + 20 : 4 = (12 + 20) : 4 = 32 : 4 = 8.',
    ],
  },
  'bai-67': {
    points: [
      'Đặt tính chia: số bị chia bên trái, số chia bên phải, thương viết dưới số chia.',
      'Chia theo thứ tự <b>từ trái sang phải</b>. Mỗi lượt: chia, nhân lại, trừ, rồi hạ chữ số tiếp theo xuống.',
      'Nếu lượt cuối còn số dư thì đó là phép chia có dư; số dư luôn bé hơn số chia.',
    ],
    examples: [
      '128 472 : 6: 12 chia 6 được 2, viết 2; 2 nhân 6 bằng 12; 12 trừ 12 bằng 0, viết 0.<br>Hạ 8; 8 chia 6 được 1, viết 1; 1 nhân 6 bằng 6; 8 trừ 6 bằng 2, viết 2.<br>Hạ 4, được 24; 24 chia 6 được 4, viết 4; 4 nhân 6 bằng 24; 24 trừ 24 bằng 0, viết 0.<br>Hạ 7; 7 chia 6 được 1, viết 1; 1 nhân 6 bằng 6; 7 trừ 6 bằng 1, viết 1.<br>Hạ 2, được 12; 12 chia 6 được 2, viết 2; 2 nhân 6 bằng 12; 12 trừ 12 bằng 0, viết 0.<br>Vậy 128 472 : 6 = 21 412.',
      '230 859 : 5 = 46 171 (dư 4).',
    ],
  },
  'bai-69': {
    points: [
      '<b>Khi chia một số cho một tích hai thừa số, ta có thể chia số đó cho một thừa số, rồi lấy kết quả tìm được chia tiếp cho thừa số kia.</b>',
      'a : (b × c) = a : b : c = a : c : b',
    ],
    examples: [
      '24 : (3 × 2) = 24 : 6 = 4; 24 : 3 : 2 = 8 : 2 = 4; 24 : 2 : 3 = 12 : 3 = 4.',
      '60 : 15 = 60 : (5 × 3) = 60 : 5 : 3 = 12 : 3 = 4.',
    ],
  },
  'bai-70': {
    points: [
      '<b>Khi chia một tích hai thừa số cho một số, ta có thể lấy một thừa số chia cho số đó (nếu chia hết), rồi nhân kết quả với thừa số kia.</b>',
      'Chỉ chọn thừa số chia hết cho số chia; thừa số không chia hết thì không làm theo cách này.',
    ],
    examples: [
      '(9 × 15) : 3 = 135 : 3 = 45; 9 × (15 : 3) = 9 × 5 = 45; (9 : 3) × 15 = 3 × 15 = 45.',
      '(7 × 15) : 3 = 7 × (15 : 3) = 7 × 5 = 35. Ta không tính (7 : 3) × 15 vì 7 không chia hết cho 3.',
    ],
  },
  'bai-71': {
    points: [
      '<b>Khi chia hai số có tận cùng là các chữ số 0, ta có thể cùng xoá một, hai, ba, … chữ số 0 ở tận cùng của số chia và số bị chia, rồi chia như thường.</b>',
      'Số chữ số 0 xoá ở số bị chia phải bằng số chữ số 0 xoá ở số chia.',
    ],
    examples: [
      '320 : 40 = 320 : (10 × 4) = 320 : 10 : 4 = 32 : 4 = 8. Vậy 320 : 40 = 32 : 4.',
      '32 000 : 400 = 32 000 : (100 × 4) = 32 000 : 100 : 4 = 320 : 4 = 80.',
    ],
  },
  'bai-72': {
    points: [
      'Chia cho số có hai chữ số: đặt tính, chia theo thứ tự <b>từ trái sang phải</b>.',
      'Mỗi lượt: lấy phần đầu của số bị chia (đủ lớn để chia) chia cho số chia, viết chữ số thương; nhân chữ số thương với số chia, viết tích dưới; trừ; rồi hạ chữ số tiếp theo.',
    ],
    examples: [
      '672 : 21: 67 chia 21 được 3, viết 3; 3 nhân 1 bằng 3, viết 3; 3 nhân 2 bằng 6, viết 6; 67 trừ 63 bằng 4, viết 4.<br>Hạ 2, được 42; 42 chia 21 được 2, viết 2; 2 nhân 1 bằng 2, viết 2; 2 nhân 2 bằng 4, viết 4; 42 trừ 42 bằng 0, viết 0.<br>Vậy 672 : 21 = 32.',
      '779 : 18: 77 chia 18 được 4, viết 4; 4 nhân 8 bằng 32, viết 2 nhớ 3; 4 nhân 1 bằng 4, thêm 3 bằng 7, viết 7; 77 trừ 72 bằng 5, viết 5.<br>Hạ 9, được 59; 59 chia 18 được 3, viết 3; 3 nhân 8 bằng 24, viết 4 nhớ 2; 3 nhân 1 bằng 3, thêm 2 bằng 5, viết 5; 59 trừ 54 bằng 5, viết 5.<br>Vậy 779 : 18 = 43 (dư 5).',
    ],
  },
  'bai-73': {
    points: [
      'Số bị chia có bốn chữ số: nếu hai chữ số đầu bé hơn số chia thì lấy ba chữ số đầu để chia lượt đầu.',
      'Mỗi lượt vẫn làm: chia, nhân rồi viết tích dưới, trừ, hạ chữ số tiếp theo. Chia theo thứ tự từ trái sang phải.',
    ],
    examples: [
      '8192 : 64: 81 chia 64 được 1, viết 1; 1 nhân 4 bằng 4, viết 4; 1 nhân 6 bằng 6, viết 6; 81 trừ 64 bằng 17, viết 17.<br>Hạ 9, được 179; 179 chia 64 được 2, viết 2; 2 nhân 4 bằng 8, viết 8; 2 nhân 6 bằng 12, viết 12; 179 trừ 128 bằng 51, viết 51.<br>Hạ 2, được 512; 512 chia 64 được 8, viết 8; 8 nhân 4 bằng 32, viết 2 nhớ 3; 8 nhân 6 bằng 48, thêm 3 bằng 51, viết 51; 512 trừ 512 bằng 0, viết 0.<br>Vậy 8192 : 64 = 128.',
      '1154 : 62 = 18 (dư 38).',
    ],
  },
  'bai-75': {
    points: [
      'Số bị chia có năm chữ số, chia cho số có hai chữ số: lấy ba chữ số đầu để chia lượt đầu nếu hai chữ số đầu bé hơn số chia.',
      'Ở bài này, mỗi lượt ta <b>nhân rồi trừ nhẩm</b> luôn: nhân chữ số thương với từng chữ số của số chia, lấy chữ số tương ứng trừ đi (mượn khi cần, rồi nhớ sang lần nhân sau), chỉ viết số dư của lượt đó.',
    ],
    examples: [
      '10 105 : 43: 101 chia 43 được 2, viết 2; 2 nhân 3 bằng 6, 11 trừ 6 bằng 5, viết 5 nhớ 1; 2 nhân 4 bằng 8, thêm 1 bằng 9, 10 trừ 9 bằng 1, viết 1.<br>Hạ 0, được 150; 150 chia 43 được 3, viết 3; 3 nhân 3 bằng 9, 10 trừ 9 bằng 1, viết 1 nhớ 1; 3 nhân 4 bằng 12, thêm 1 bằng 13, 15 trừ 13 bằng 2, viết 2.<br>Hạ 5, được 215; 215 chia 43 được 5, viết 5; 5 nhân 3 bằng 15, 15 trừ 15 bằng 0, viết 0 nhớ 1; 5 nhân 4 bằng 20, thêm 1 bằng 21, 21 trừ 21 bằng 0, viết 0.<br>Vậy 10 105 : 43 = 235.',
      '26 345 : 35 = 752 (dư 25).',
    ],
  },
  'bai-77': {
    points: [
      'Khi chia, nếu ở một lượt số đem chia (sau khi hạ) bé hơn số chia thì ta viết <b>chữ số 0 ở thương</b>.',
      'Không được quên chữ số 0 đó, nếu không thương sẽ sai hàng.',
    ],
    examples: [
      '9450 : 35: 94 chia 35 được 2, viết 2; 2 nhân 5 bằng 10, 14 trừ 10 bằng 4, viết 4 nhớ 1; 2 nhân 3 bằng 6, thêm 1 bằng 7, 9 trừ 7 bằng 2, viết 2.<br>Hạ 5, được 245; 245 chia 35 được 7, viết 7; 7 nhân 5 bằng 35, 35 trừ 35 bằng 0, viết 0 nhớ 3; 7 nhân 3 bằng 21, thêm 3 bằng 24, 24 trừ 24 bằng 0, viết 0.<br>Hạ 0; 0 chia 35 được 0, viết 0. Vậy 9450 : 35 = 270.',
      '2448 : 24: 24 chia 24 được 1, viết 1. Hạ 4; 4 chia 24 được 0, viết 0. Hạ 8, được 48; 48 chia 24 được 2, viết 2.<br>Vậy 2448 : 24 = 102.',
    ],
  },
  'bai-78': {
    points: [
      'Chia cho số có ba chữ số: chia theo thứ tự từ trái sang phải, cách làm giống như chia cho số có hai chữ số.',
      'Lượt đầu lấy đủ số chữ số đầu của số bị chia để được số không bé hơn số chia. Mỗi lượt: chia, nhân rồi trừ nhẩm, hạ chữ số tiếp theo.',
    ],
    examples: [
      '1944 : 162: 194 chia 162 được 1, viết 1; 1 nhân 2 bằng 2, 4 trừ 2 bằng 2, viết 2; 1 nhân 6 bằng 6, 9 trừ 6 bằng 3, viết 3; 1 nhân 1 bằng 1, 1 trừ 1 bằng 0, viết 0.<br>Hạ 4, được 324; 324 chia 162 được 2, viết 2; 2 nhân 2 bằng 4, 4 trừ 4 bằng 0, viết 0; 2 nhân 6 bằng 12, 12 trừ 12 bằng 0, viết 0 nhớ 1; 2 nhân 1 bằng 2, thêm 1 bằng 3, 3 trừ 3 bằng 0, viết 0.<br>Vậy 1944 : 162 = 12.',
      '8469 : 241 = 35 (dư 34).',
    ],
  },
  'bai-80': {
    points: [
      'Số bị chia có năm chữ số, chia cho số có ba chữ số: lượt đầu lấy ba chữ số đầu (nếu không bé hơn số chia).',
      'Mỗi lượt: chia, nhân rồi trừ nhẩm, hạ chữ số tiếp theo, cho đến hết. Số dư phải bé hơn số chia.',
    ],
    examples: [
      '41 535 : 195: 415 chia 195 được 2, viết 2; nhân rồi trừ, còn 25.<br>Hạ 3, được 253; 253 chia 195 được 1, viết 1; còn 58.<br>Hạ 5, được 585; 585 chia 195 được 3, viết 3; còn 0.<br>Vậy 41 535 : 195 = 213.',
      '80 120 : 245 = 327 (dư 5).',
    ],
  },

  // ── Chương ba ───────────────────────────────────────────────────────────
  'bai-84': {
    points: [
      '<b>Các số có chữ số tận cùng là 0; 2; 4; 6; 8 thì chia hết cho 2.</b>',
      'Các số có chữ số tận cùng là 1; 3; 5; 7; 9 thì không chia hết cho 2.',
      'Số chia hết cho 2 là <b>số chẵn</b>; số không chia hết cho 2 là <b>số lẻ</b>.',
    ],
    examples: [
      '32 : 2 = 16 (số 32 tận cùng là 2); 33 : 2 = 16 (dư 1) (số 33 tận cùng là 3).',
      '0; 2; 4; 6; 8; …; 156; 158; 160; … là các số chẵn. 1; 3; 5; 7; …; 567; 569; 571; … là các số lẻ.',
    ],
  },
  'bai-85': {
    points: [
      '<b>Các số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5.</b>',
      'Các số không có chữ số tận cùng là 0 hoặc 5 thì không chia hết cho 5.',
    ],
    examples: [
      '20 : 5 = 4; 35 : 5 = 7.',
      '41 : 5 = 8 (dư 1); 58 : 5 = 11 (dư 3).',
    ],
  },
  'bai-87': {
    points: [
      '<b>Các số có tổng các chữ số chia hết cho 9 thì chia hết cho 9.</b>',
      'Các số có tổng các chữ số không chia hết cho 9 thì không chia hết cho 9.',
    ],
    examples: [
      '657: 6 + 5 + 7 = 18, mà 18 : 9 = 2, nên 657 chia hết cho 9 (657 : 9 = 73).',
      '451: 4 + 5 + 1 = 10, mà 10 : 9 = 1 (dư 1), nên 451 không chia hết cho 9 (451 : 9 = 50, dư 1).',
    ],
  },
  'bai-88': {
    points: [
      '<b>Các số có tổng các chữ số chia hết cho 3 thì chia hết cho 3.</b>',
      'Các số có tổng các chữ số không chia hết cho 3 thì không chia hết cho 3.',
    ],
    examples: [
      '123: 1 + 2 + 3 = 6, mà 6 : 3 = 2, nên 123 chia hết cho 3 (123 : 3 = 41).',
      '125: 1 + 2 + 5 = 8, mà 8 : 3 = 2 (dư 2), nên 125 không chia hết cho 3 (125 : 3 = 41, dư 2).',
    ],
  },
  'bai-91': {
    points: [
      'Để đo diện tích lớn như diện tích một thành phố, một khu rừng hay một vùng biển, người ta thường dùng đơn vị <b>ki-lô-mét vuông</b>.',
      'Ki-lô-mét vuông là diện tích của hình vuông có cạnh dài 1km. Ki-lô-mét vuông viết tắt là <b>km²</b>.',
      '<b>1km² = 1 000 000m²</b>.',
    ],
    examples: [
      'Diện tích Thủ đô Hà Nội (theo số liệu năm 2002) là 921km².',
      '5km² = 5 000 000m².',
    ],
  },
  'bai-93': {
    points: [
      'Hình bình hành ABCD có: AB và DC là hai cạnh đối diện; AD và BC là hai cạnh đối diện.',
      'Cạnh AB song song với cạnh DC; cạnh AD song song với cạnh BC; AB = DC và AD = BC.',
      '<b>Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.</b>',
    ],
    examples: [
      'Hình bình hành MNPQ: MN song song và bằng QP; MQ song song và bằng NP.',
    ],
  },
  'bai-94': {
    points: [
      'Trong hình bình hành ABCD, DC là <b>đáy</b>; kẻ AH vuông góc với DC, độ dài AH là <b>chiều cao</b>.',
      'Cắt hình tam giác ADH rồi ghép sang bên kia, ta được hình chữ nhật ABIH có cùng diện tích, dài a, rộng h.',
      '<b>Diện tích hình bình hành bằng độ dài đáy nhân với chiều cao (cùng một đơn vị đo).</b>',
      'S = a × h (S là diện tích, a là độ dài đáy, h là chiều cao).',
    ],
    examples: [
      'Hình bình hành có độ dài đáy 5cm, chiều cao 3cm: S = 5 × 3 = 15 (cm²).',
    ],
  },

  // ── Chương bốn ──────────────────────────────────────────────────────────
  'bai-96': {
    points: [
      `Chia hình tròn thành 6 phần bằng nhau, tô màu 5 phần: ta nói đã tô màu năm phần sáu hình tròn, viết ${fr(5, 6)}. Ta gọi ${fr(5, 6)} là <b>phân số</b>.`,
      'Mỗi phân số có <b>tử số</b> và <b>mẫu số</b>.',
      '<b>Mẫu số</b> là số tự nhiên khác 0, viết dưới gạch ngang; nó cho biết hình được chia thành mấy phần bằng nhau.',
      '<b>Tử số</b> là số tự nhiên viết trên gạch ngang; nó cho biết đã lấy (đã tô màu) mấy phần bằng nhau đó.',
    ],
    examples: [
      `Phân số ${fr(5, 6)} đọc là năm phần sáu; tử số là 5, mẫu số là 6.`,
      `${fr(1, 2)} đọc là một phần hai; ${fr(3, 4)} đọc là ba phần tư; ${fr(4, 7)} đọc là bốn phần bảy.`,
    ],
  },
  'bai-97': {
    points: [
      'Thương của phép chia số tự nhiên cho số tự nhiên (khác 0) có thể viết thành một <b>phân số</b>: tử số là số bị chia, mẫu số là số chia.',
      'Khi số bị chia không chia hết cho số chia, ta vẫn viết được thương dưới dạng phân số.',
    ],
    examples: [
      `Chia đều 3 cái bánh cho 4 em: chia mỗi cái bánh thành 4 phần bằng nhau, mỗi em được 3 phần, tức là ${fr(3, 4)} cái bánh. Ta viết 3 : 4 = ${fr(3, 4)} (cái bánh).`,
      `8 : 4 = ${fr(8, 4)}; 3 : 4 = ${fr(3, 4)}; 5 : 5 = ${fr(5, 5)}.`,
    ],
  },
  'bai-98': {
    points: [
      `Phân số có <b>tử số lớn hơn mẫu số</b> thì lớn hơn 1, ví dụ ${fr(5, 4)} > 1.`,
      `Phân số có <b>tử số bằng mẫu số</b> thì bằng 1, ví dụ ${fr(4, 4)} = 1.`,
      `Phân số có <b>tử số bé hơn mẫu số</b> thì bé hơn 1, ví dụ ${fr(1, 4)} < 1.`,
    ],
    examples: [
      `Ăn 1 quả cam (tức ${fr(4, 4)} quả) và thêm ${fr(1, 4)} quả cam nữa thì đã ăn ${fr(5, 4)} quả cam.`,
      `Chia đều 5 quả cam cho 4 người: 5 : 4 = ${fr(5, 4)} (quả cam). ${fr(5, 4)} quả cam gồm 1 quả và ${fr(1, 4)} quả, nên nhiều hơn 1 quả.`,
    ],
  },
  'bai-100': {
    points: [
      '<b>Tính chất cơ bản của phân số:</b>',
      'Nếu nhân cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho.',
      'Nếu cả tử số và mẫu số của một phân số cùng chia hết cho một số tự nhiên khác 0 thì sau khi chia ta được một phân số bằng phân số đã cho.',
    ],
    examples: [
      `Tô màu ${fr(3, 4)} băng giấy và ${fr(6, 8)} băng giấy như nhau thì phần tô màu bằng nhau: ${fr(3, 4)} = ${fr(6, 8)}.`,
      `${fr(3, 4)} = ${fr('3 × 2', '4 × 2')} = ${fr(6, 8)} và ${fr(6, 8)} = ${fr('6 : 2', '8 : 2')} = ${fr(3, 4)}.`,
    ],
  },
  'bai-101': {
    points: [
      'Rút gọn phân số là tìm một phân số bằng nó nhưng có tử số và mẫu số bé hơn.',
      'Cách làm: xét xem tử số và mẫu số cùng chia hết cho số tự nhiên nào lớn hơn 1, rồi chia cả tử số và mẫu số cho số đó.',
      'Cứ làm như thế cho đến khi được <b>phân số tối giản</b>: phân số mà tử số và mẫu số không cùng chia hết cho số nào lớn hơn 1.',
    ],
    examples: [
      `${fr(6, 8)} = ${fr('6 : 2', '8 : 2')} = ${fr(3, 4)}; ${fr(3, 4)} là phân số tối giản.`,
      `${fr(18, 54)} = ${fr('18 : 2', '54 : 2')} = ${fr(9, 27)}; ${fr(9, 27)} = ${fr('9 : 9', '27 : 9')} = ${fr(1, 3)}. Vậy ${fr(18, 54)} = ${fr(1, 3)}.`,
    ],
  },
  'bai-103': {
    points: [
      'Quy đồng mẫu số hai phân số là tìm hai phân số <b>có cùng mẫu số</b>, lần lượt bằng hai phân số đã cho. Mẫu số đó gọi là <b>mẫu số chung</b>.',
      'Cách làm: lấy tử số và mẫu số của phân số thứ nhất <b>nhân với mẫu số của phân số thứ hai</b>.',
      'Lấy tử số và mẫu số của phân số thứ hai <b>nhân với mẫu số của phân số thứ nhất</b>.',
    ],
    examples: [
      `Quy đồng mẫu số ${fr(1, 3)} và ${fr(2, 5)}:<br>${fr(1, 3)} = ${fr('1 × 5', '3 × 5')} = ${fr(5, 15)}; ${fr(2, 5)} = ${fr('2 × 3', '5 × 3')} = ${fr(6, 15)}.<br>Mẫu số chung là 15.`,
    ],
  },
  'bai-104': {
    points: [
      'Nếu mẫu số của phân số này <b>chia hết cho</b> mẫu số của phân số kia thì có thể chọn mẫu số lớn hơn đó làm mẫu số chung.',
      'Khi đó: lấy mẫu số chung chia cho mẫu số của phân số kia, rồi nhân cả tử số và mẫu số của phân số kia với thương vừa tìm được. Giữ nguyên phân số có mẫu số chung.',
    ],
    examples: [
      `Quy đồng mẫu số ${fr(7, 6)} và ${fr(5, 12)}: vì 12 : 6 = 2, chọn mẫu số chung là 12.<br>${fr(7, 6)} = ${fr('7 × 2', '6 × 2')} = ${fr(14, 12)} và giữ nguyên ${fr(5, 12)}.<br>Được hai phân số ${fr(14, 12)} và ${fr(5, 12)}.`,
    ],
  },
  'bai-107': {
    points: [
      'Trong hai phân số cùng mẫu số:',
      'Phân số nào có <b>tử số bé hơn thì bé hơn</b>.',
      'Phân số nào có <b>tử số lớn hơn thì lớn hơn</b>.',
      'Nếu tử số bằng nhau thì hai phân số đó bằng nhau.',
    ],
    examples: [
      `${fr(2, 5)} < ${fr(3, 5)} (vì 2 < 3); ${fr(3, 5)} > ${fr(2, 5)}.`,
      `${fr(2, 5)} < ${fr(5, 5)} mà ${fr(5, 5)} = 1, nên ${fr(2, 5)} < 1.`,
    ],
  },
  'bai-109': {
    points: [
      '<b>Muốn so sánh hai phân số khác mẫu số, ta có thể quy đồng mẫu số hai phân số đó, rồi so sánh các tử số của hai phân số mới.</b>',
    ],
    examples: [
      `So sánh ${fr(2, 3)} và ${fr(3, 4)}:<br>Quy đồng: ${fr(2, 3)} = ${fr('2 × 4', '3 × 4')} = ${fr(8, 12)}; ${fr(3, 4)} = ${fr('3 × 3', '4 × 3')} = ${fr(9, 12)}.<br>${fr(8, 12)} < ${fr(9, 12)} (vì 8 < 9). Kết luận: ${fr(2, 3)} < ${fr(3, 4)}.`,
    ],
  },
  'bai-114': {
    points: [
      '<b>Muốn cộng hai phân số cùng mẫu số, ta cộng hai tử số với nhau và giữ nguyên mẫu số.</b>',
      'Khi đổi chỗ hai phân số trong một tổng thì tổng không thay đổi (tính chất giao hoán).',
    ],
    examples: [
      `${fr(3, 8)} + ${fr(2, 8)} = ${fr('3 + 2', 8)} = ${fr(5, 8)}.`,
      `${fr(3, 7)} + ${fr(2, 7)} = ${fr(2, 7)} + ${fr(3, 7)} = ${fr(5, 7)}.`,
    ],
  },
  'bai-115': {
    points: [
      '<b>Muốn cộng hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi cộng hai phân số đó.</b>',
    ],
    examples: [
      `${fr(1, 2)} + ${fr(1, 3)}: quy đồng ${fr(1, 2)} = ${fr('1 × 3', '2 × 3')} = ${fr(3, 6)}; ${fr(1, 3)} = ${fr('1 × 2', '3 × 2')} = ${fr(2, 6)}.<br>${fr(1, 2)} + ${fr(1, 3)} = ${fr(3, 6)} + ${fr(2, 6)} = ${fr(5, 6)}.`,
      `${fr(13, 21)} + ${fr(5, 7)} = ${fr(13, 21)} + ${fr('5 × 3', '7 × 3')} = ${fr(13, 21)} + ${fr(15, 21)} = ${fr(28, 21)}.`,
    ],
  },
  'bai-118': {
    points: [
      '<b>Muốn trừ hai phân số cùng mẫu số, ta trừ tử số của phân số thứ nhất cho tử số của phân số thứ hai và giữ nguyên mẫu số.</b>',
    ],
    examples: [
      `Từ ${fr(5, 6)} băng giấy, lấy ${fr(3, 6)} băng giấy thì còn: ${fr(5, 6)} − ${fr(3, 6)} = ${fr('5 − 3', 6)} = ${fr(2, 6)} (băng giấy).`,
    ],
  },
  'bai-119': {
    points: [
      '<b>Muốn trừ hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi trừ hai phân số đó.</b>',
    ],
    examples: [
      `${fr(4, 5)} − ${fr(2, 3)}: quy đồng ${fr(4, 5)} = ${fr('4 × 3', '5 × 3')} = ${fr(12, 15)} và ${fr(2, 3)} = ${fr('2 × 5', '3 × 5')} = ${fr(10, 15)}.<br>${fr(4, 5)} − ${fr(2, 3)} = ${fr(12, 15)} − ${fr(10, 15)} = ${fr(2, 15)}.`,
    ],
  },
  'bai-122': {
    points: [
      '<b>Muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số.</b>',
    ],
    examples: [
      `Hình chữ nhật dài ${fr(4, 5)}m, rộng ${fr(2, 3)}m: hình vuông 1m² chia thành 15 ô bằng nhau, hình chữ nhật chiếm 8 ô, nên diện tích là ${fr(8, 15)}m².`,
      `${fr(4, 5)} × ${fr(2, 3)} = ${fr('4 × 2', '5 × 3')} = ${fr(8, 15)}.`,
    ],
  },
  'bai-125': {
    points: [
      `Muốn tìm ${fr(2, 3)} của số 12, ta lấy số 12 nhân với ${fr(2, 3)}.`,
      'Nói chung: muốn tìm phân số của một số, ta lấy số đó nhân với phân số.',
    ],
    examples: [
      `Rổ có 12 quả cam. ${fr(1, 3)} số cam là 12 : 3 = 4 (quả); ${fr(2, 3)} số cam là 4 × 2 = 8 (quả).`,
      `Tính gọn: 12 × ${fr(2, 3)} = 8 (quả).`,
    ],
  },
  'bai-126': {
    points: [
      '<b>Muốn chia hai phân số, ta lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.</b>',
      `Đảo ngược một phân số là đổi chỗ tử số và mẫu số: ${fr(3, 2)} là phân số đảo ngược của ${fr(2, 3)}.`,
    ],
    examples: [
      `Hình chữ nhật có diện tích ${fr(7, 15)}m², chiều rộng ${fr(2, 3)}m. Chiều dài là:<br>${fr(7, 15)} : ${fr(2, 3)} = ${fr(7, 15)} × ${fr(3, 2)} = ${fr(21, 30)} (m).`,
    ],
  },
  'bai-133': {
    points: [
      'Hình thoi ABCD có: cạnh AB song song với cạnh DC; cạnh AD song song với cạnh BC.',
      'AB = BC = CD = DA.',
      '<b>Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.</b>',
      'Hình thoi có hai đường chéo <b>vuông góc với nhau</b> và <b>cắt nhau tại trung điểm</b> của mỗi đường.',
    ],
    examples: [
      'Hình thoi ABCD có hai đường chéo AC và BD cắt nhau tại O: AC vuông góc với BD; OA = OC và OB = OD.',
    ],
  },
  'bai-134': {
    points: [
      'Cắt hai tam giác của hình thoi rồi ghép lại, ta được một hình chữ nhật có chiều dài m và chiều rộng bằng nửa n.',
      '<b>Diện tích hình thoi bằng tích của độ dài hai đường chéo chia cho 2 (cùng một đơn vị đo).</b>',
      `S = ${fr('m × n', 2)} (S là diện tích; m, n là độ dài hai đường chéo).`,
    ],
    examples: [
      `Hình thoi có hai đường chéo 3cm và 4cm: S = ${fr('3 × 4', 2)} = 6 (cm²).`,
    ],
  },

  // ── Chương năm ──────────────────────────────────────────────────────────
  'bai-137': {
    points: [
      `<b>Tỉ số</b> của a và b là a : b hay ${fr('a', 'b')} (b khác 0).`,
      'Tỉ số cho biết số thứ nhất bằng mấy phần số thứ hai. Viết tỉ số theo đúng thứ tự: số nào nói trước thì viết trước.',
    ],
    examples: [
      `Một đội xe có 5 xe tải và 7 xe khách. Tỉ số của số xe tải và số xe khách là 5 : 7 hay ${fr(5, 7)}: số xe tải bằng ${fr(5, 7)} số xe khách.`,
      `Tỉ số của số xe khách và số xe tải là 7 : 5 hay ${fr(7, 5)}.`,
    ],
  },
  'bai-138': {
    points: [
      'Các bước giải:',
      'Bước 1: vẽ sơ đồ đoạn thẳng theo tỉ số.',
      'Bước 2: tìm tổng số phần bằng nhau.',
      'Bước 3: tìm giá trị một phần rồi tìm số bé (lấy tổng chia cho tổng số phần, nhân với số phần của số bé).',
      'Bước 4: tìm số lớn (lấy tổng trừ số bé).',
    ],
    examples: [
      `Tổng hai số là 96, tỉ số là ${fr(3, 5)}.<br>Tổng số phần bằng nhau: 3 + 5 = 8 (phần).<br>Số bé: 96 : 8 × 3 = 36.<br>Số lớn: 96 − 36 = 60.`,
      `Minh và Khôi có 25 quyển vở, số vở của Minh bằng ${fr(2, 3)} số vở của Khôi.<br>Tổng số phần: 2 + 3 = 5 (phần). Minh: 25 : 5 × 2 = 10 (quyển). Khôi: 25 − 10 = 15 (quyển).`,
    ],
  },
  'bai-142': {
    points: [
      'Các bước giải:',
      'Bước 1: vẽ sơ đồ đoạn thẳng theo tỉ số.',
      'Bước 2: tìm hiệu số phần bằng nhau.',
      'Bước 3: tìm số bé (lấy hiệu chia cho hiệu số phần, nhân với số phần của số bé).',
      'Bước 4: tìm số lớn (lấy số bé cộng với hiệu).',
    ],
    examples: [
      `Hiệu hai số là 24, tỉ số là ${fr(3, 5)}.<br>Hiệu số phần bằng nhau: 5 − 3 = 2 (phần).<br>Số bé: 24 : 2 × 3 = 36.<br>Số lớn: 36 + 24 = 60.`,
      `Chiều dài hơn chiều rộng 12m, chiều dài bằng ${fr(7, 4)} chiều rộng.<br>Hiệu số phần: 7 − 4 = 3 (phần). Chiều dài: 12 : 3 × 7 = 28 (m). Chiều rộng: 28 − 12 = 16 (m).`,
    ],
  },
  'bai-147': {
    points: [
      'Bản đồ nước Việt Nam có ghi "Tỉ lệ 1 : 10 000 000". Đó là <b>tỉ lệ bản đồ</b>.',
      `Tỉ lệ 1 : 10 000 000 hay ${fr(1, '10 000 000')} cho biết hình nước Việt Nam được vẽ thu nhỏ lại 10 000 000 lần.`,
      'Tỉ lệ bản đồ có thể viết dưới dạng một phân số có tử số là 1.',
    ],
    examples: [
      'Với tỉ lệ 1 : 10 000 000, độ dài 1cm trên bản đồ ứng với độ dài thật là 10 000 000cm hay 100km.',
      `Các tỉ lệ bản đồ: ${fr(1, 1000)}; ${fr(1, 500)}; ${fr(1, '1 000 000')}; …`,
    ],
  },
  'bai-148': {
    points: [
      'Biết tỉ lệ bản đồ và độ dài trên bản đồ, muốn tìm <b>độ dài thật</b>, ta lấy độ dài trên bản đồ nhân với số ở mẫu của tỉ lệ (ví dụ tỉ lệ 1 : 300 thì nhân với 300).',
      'Độ dài thật tính được có cùng đơn vị với độ dài trên bản đồ; sau đó đổi ra đơn vị thích hợp (m, km).',
    ],
    examples: [
      'Bản đồ tỉ lệ 1 : 300, cổng trường rộng 2cm trên bản đồ.<br>Chiều rộng thật: 2 × 300 = 600 (cm); 600cm = 6m.',
      'Bản đồ tỉ lệ 1 : 1 000 000, quãng đường Hà Nội, Hải Phòng đo được 102mm.<br>Độ dài thật: 102 × 1 000 000 = 102 000 000 (mm); 102 000 000mm = 102km.',
    ],
  },
  'bai-149': {
    points: [
      'Biết tỉ lệ bản đồ và độ dài thật, muốn tìm <b>độ dài trên bản đồ</b>, ta đổi độ dài thật ra đơn vị cần tìm, rồi chia cho số ở mẫu của tỉ lệ.',
      'Nhớ đổi đơn vị trước khi chia (ví dụ đổi m ra cm, km ra mm).',
    ],
    examples: [
      'Hai điểm A và B cách nhau 20m. Trên bản đồ tỉ lệ 1 : 500:<br>20m = 2000cm; 2000 : 500 = 4 (cm).',
      'Quãng đường 41km, trên bản đồ tỉ lệ 1 : 1 000 000:<br>41km = 41 000 000mm; 41 000 000 : 1 000 000 = 41 (mm).',
    ],
  },
};
