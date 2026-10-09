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
    demos: [
      { kind: 'expr', title: 'Biểu thức 3 + a', rows: [{ expr: '3 + a' }], vars: { a: 1 }, then: v => `${v} là một giá trị của biểu thức 3 + a.`,
        intro: 'Lan có 3 quyển vở, mẹ cho thêm a quyển. Lan có tất cả 3 + a quyển vở. Thay a bằng một số rồi tính.',
        tries: [{ label: 'a = 1', vars: { a: 1 } }, { label: 'a = 2', vars: { a: 2 } }, { label: 'a = 3', vars: { a: 3 } }] },
    ],
  },
  'bai-6': {
    points: [
      '10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = 1 nghìn.',
      '10 nghìn = 1 chục nghìn (viết 10 000), 10 chục nghìn = 1 trăm nghìn (viết 100 000).',
      'Số có sáu chữ số có các hàng: <b>trăm nghìn, chục nghìn, nghìn, trăm, chục, đơn vị</b>.',
      'Viết số và đọc số từ hàng cao nhất (trăm nghìn) đến hàng thấp nhất (đơn vị).',
    ],
    demos: [
      { kind: 'place', n: 432516, mode: 'build' },
    ],
  },
  'bai-8': {
    points: [
      'Hàng đơn vị, hàng chục, hàng trăm hợp thành <b>lớp đơn vị</b>.',
      'Hàng nghìn, hàng chục nghìn, hàng trăm nghìn hợp thành <b>lớp nghìn</b>.',
      'Mỗi lớp có ba hàng; khi viết số, giữa hai lớp để một khoảng trống nhỏ.',
    ],
    demos: [
      { kind: 'place', mode: 'classes', n: 654321, ask: 5, tries: [{ label: '654 321', n: 654321, ask: 5 }, { label: '654 000', n: 654000, ask: 4 }] },
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
    demos: [
      { kind: 'expr', title: 'Triệu, chục triệu, trăm triệu', ask: false, intro: 'Cứ 10 đơn vị ở một hàng hợp thành 1 đơn vị ở hàng trên liền nó.',
        rows: [{ segs: ['10 trăm nghìn', '1 triệu', '1 000 000'], caps: ['', 'Mười trăm nghìn gọi là <b>một triệu</b>.', 'Một triệu viết là <b>1 000 000</b> (sáu chữ số 0).'] },
          { segs: ['10 triệu', '1 chục triệu', '10 000 000'], caps: ['', 'Mười triệu gọi là <b>một chục triệu</b>.', 'Viết là <b>10 000 000</b>.'] },
          { segs: ['10 chục triệu', '1 trăm triệu', '100 000 000'], caps: ['', 'Mười chục triệu gọi là <b>một trăm triệu</b>.', 'Viết là <b>100 000 000</b>.'] }],
        outro: 'Hàng triệu, hàng chục triệu, hàng trăm triệu hợp thành <b>lớp triệu</b>.' },
      { kind: 'place', mode: 'classes', n: 312000000, ask: 3 },
    ],
  },
  'bai-11': {
    points: [
      'Để đọc một số lớn, ta tách số thành từng lớp, mỗi lớp ba hàng, tính từ lớp đơn vị đến lớp nghìn rồi lớp triệu.',
      'Sau đó đọc từ trái sang phải: đọc số có ba chữ số của từng lớp, rồi đọc tên lớp đó (triệu, nghìn).',
    ],
    demos: [
      { kind: 'place', mode: 'read', n: 342157413 },
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
    demos: [
      { kind: 'numline' },
    ],
  },
  'bai-15': {
    points: [
      'Ở mỗi hàng chỉ viết được một chữ số. Cứ mười đơn vị ở một hàng thì hợp thành một đơn vị ở hàng trên liền nó: 10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = 1 nghìn, …',
      'Chỉ với mười chữ số 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ta viết được mọi số tự nhiên.',
      '<b>Giá trị của mỗi chữ số phụ thuộc vào vị trí của nó trong số đó.</b> Cách viết số như vậy gọi là viết số tự nhiên trong <b>hệ thập phân</b>.',
    ],
    demos: [
      { kind: 'place', mode: 'value', n: 999, tries: [{ label: '999', n: 999 }, { label: '387', n: 387 }, { label: '2005', n: 2005 }] },
    ],
  },
  'bai-16': {
    points: [
      'Số nào có nhiều chữ số hơn thì lớn hơn, số nào có ít chữ số hơn thì bé hơn.',
      'Nếu hai số có số chữ số bằng nhau thì so sánh từng cặp chữ số ở cùng một hàng, từ trái sang phải. Nếu mọi cặp đều bằng nhau thì hai số bằng nhau.',
      'Trong dãy số tự nhiên, số đứng trước bé hơn số đứng sau. Trên tia số, số ở gần gốc 0 hơn là số bé hơn.',
      'Vì luôn so sánh được, ta có thể <b>xếp thứ tự</b> các số tự nhiên từ bé đến lớn hoặc từ lớn đến bé.',
    ],
    demos: [
      { kind: 'compare', a: 29869, b: 30005, tries: [{ label: '29 869 và 30 005', a: 29869, b: 30005 }, { label: '100 và 99', a: 100, b: 99 }] },
      { kind: 'order', nums: [7698, 7968, 7896, 7869] },
    ],
  },
  'bai-18': {
    points: [
      'Để đo những vật nặng hàng chục, hàng trăm, hàng nghìn ki-lô-gam, người ta còn dùng các đơn vị <b>yến, tạ, tấn</b>.',
      '1 yến = 10kg.',
      '1 tạ = 10 yến = 100kg.',
      '1 tấn = 10 tạ = 1000kg.',
    ],
    demos: [
      { kind: 'units', units: ['tấn', 'tạ', 'yến', 'kg'], parts: [[2, 'tấn'], [85, 'kg']], to: 'kg',
        tries: [{ label: '2 tấn 85kg', parts: [[2, 'tấn'], [85, 'kg']] }, { label: '5 yến', parts: [[5, 'yến']] }, { label: '1 yến 7kg', parts: [[1, 'yến'], [7, 'kg']] }] },
    ],
  },
  'bai-19': {
    points: [
      'Để đo những vật nặng hàng chục, hàng trăm gam, người ta còn dùng <b>đề-ca-gam</b> (viết tắt dag) và <b>héc-tô-gam</b> (viết tắt hg).',
      '1dag = 10g; 1hg = 10dag = 100g.',
      'Bảng đơn vị đo khối lượng, từ lớn đến bé: tấn, tạ, yến, kg, hg, dag, g.',
      'Mỗi đơn vị đo khối lượng đều <b>gấp 10 lần</b> đơn vị bé hơn, liền nó.',
    ],
    demos: [
      { kind: 'units', units: ['kg', 'hg', 'dag', 'g'], parts: [[2, 'kg'], [300, 'g']], to: 'g',
        tries: [{ label: '2kg 300g', parts: [[2, 'kg'], [300, 'g']], to: 'g' }, { label: '4dag', parts: [[4, 'dag']], to: 'g' }, { label: '3kg', parts: [[3, 'kg']], to: 'hg' }] },
    ],
  },
  'bai-20': {
    points: [
      '1 giờ = 60 phút; 1 phút = 60 giây.',
      '1 thế kỉ = 100 năm.',
      'Từ năm 1 đến năm 100 là thế kỉ một (thế kỉ I), từ năm 101 đến năm 200 là thế kỉ hai (thế kỉ II), …',
      'Từ năm 1901 đến năm 2000 là thế kỉ hai mươi (thế kỉ XX); từ năm 2001 đến năm 2100 là thế kỉ hai mươi mốt (thế kỉ XXI).',
    ],
    demos: [
      { kind: 'century', year: 1945, tries: [{ label: '1945', year: 1945 }, { label: '2025', year: 2025 }, { label: '1890', year: 1890 }, { label: '2000', year: 2000 }] },
      { kind: 'expr', title: 'Đổi phút ra giây', ask: false, rows: [
          { segs: ['2 phút', '60 giây × 2', '120 giây'], caps: ['', '1 phút = 60 giây, nên 2 phút = 60 giây × 2.', '60 × 2 = 120: <b>2 phút = 120 giây</b>.'] },
          { segs: ['1 phút 8 giây', '60 giây + 8 giây', '68 giây'], caps: ['', '1 phút = 60 giây, thêm 8 giây.', '60 + 8 = 68: <b>1 phút 8 giây = 68 giây</b>.'] }] },
    ],
  },
  'bai-22': {
    points: [
      'Can thứ nhất có 6 lít dầu, can thứ hai có 4 lít dầu. Rót đều số dầu đó vào 2 can thì mỗi can có (6 + 4) : 2 = 5 (lít). Ta gọi 5 là <b>số trung bình cộng</b> của 6 và 4.',
      '<b>Muốn tìm số trung bình cộng của nhiều số</b>, ta tính tổng của các số đó, rồi chia tổng đó cho số các số hạng.',
    ],
    demos: [
      { kind: 'avg', values: [6, 4], unit: 'lít' },
      { kind: 'avg', values: [25, 27, 32], unit: 'học sinh', names: ['Lớp 4A', 'Lớp 4B', 'Lớp 4C'], each: 'lớp' },
    ],
  },
  'bai-24': {
    points: [
      'Biểu đồ tranh dùng hình vẽ để cho biết số lượng của từng thứ.',
      'Đọc biểu đồ: xem cột (hoặc hàng) bên trái ghi tên gì, phần bên phải có bao nhiêu hình, mỗi hình chỉ bao nhiêu (đọc phần chú ý nếu có).',
      'Từ biểu đồ ta trả lời được: có những ai (cái gì), mỗi người (mỗi thứ) có bao nhiêu, ai nhiều hơn, ai ít hơn.',
    ],
    demos: [
      { kind: 'picto' },
    ],
  },
  'bai-25': {
    points: [
      'Biểu đồ cột dùng các cột cao thấp khác nhau để chỉ số lượng.',
      'Hàng dưới ghi tên từng đối tượng; các số ở bên trái chỉ số lượng; số ghi ở đỉnh cột cho biết cột đó chỉ bao nhiêu.',
      'Cột cao hơn chỉ số lượng nhiều hơn, cột thấp hơn chỉ số lượng ít hơn.',
    ],
    demos: [
      { kind: 'barchart' },
    ],
  },

  // ── Chương hai ──────────────────────────────────────────────────────────
  'bai-29': {
    points: [
      'Đặt tính: viết số hạng này dưới số hạng kia sao cho các chữ số cùng hàng thẳng cột với nhau, viết dấu +, kẻ gạch ngang.',
      'Cộng theo thứ tự <b>từ phải sang trái</b> (từ hàng đơn vị). Được 10 trở lên thì viết chữ số hàng đơn vị và <b>nhớ 1</b> sang hàng bên trái.',
    ],
    demos: [
      { kind: 'add', a: 48352, b: 21026, tries: [{ label: '48 352 + 21 026', a: 48352, b: 21026 }, { label: '367 859 + 541 728', a: 367859, b: 541728 }] },
    ],
  },
  'bai-30': {
    points: [
      'Đặt tính: viết số trừ dưới số bị trừ, các chữ số cùng hàng thẳng cột, viết dấu −, kẻ gạch ngang.',
      'Trừ theo thứ tự <b>từ phải sang trái</b>. Nếu chữ số trên bé hơn chữ số dưới thì lấy thêm 10 để trừ (nhớ 1), rồi thêm 1 vào chữ số của số trừ ở hàng bên trái.',
    ],
    demos: [
      { kind: 'sub', a: 865279, b: 450237, tries: [{ label: '865 279 − 450 237', a: 865279, b: 450237 }, { label: '647 253 − 285 749', a: 647253, b: 285749 }] },
    ],
  },
  'bai-32': {
    points: [
      '<b>a + b</b> là một <b>biểu thức có chứa hai chữ</b>.',
      'Mỗi lần thay hai chữ bằng hai số rồi tính, ta được một <b>giá trị của biểu thức</b> a + b.',
    ],
    demos: [
      { kind: 'expr', title: 'Biểu thức a + b', rows: [{ expr: 'a + b' }], vars: { a: 3, b: 2 }, then: v => `${v} là một giá trị của biểu thức a + b.`,
        tries: [{ label: 'a = 3, b = 2', vars: { a: 3, b: 2 } }, { label: 'a = 4, b = 0', vars: { a: 4, b: 0 } }, { label: 'a = 0, b = 1', vars: { a: 0, b: 1 } }] },
    ],
  },
  'bai-33': {
    points: [
      'Giá trị của a + b và của b + a luôn bằng nhau: <b>a + b = b + a</b>.',
      '<b>Khi đổi chỗ các số hạng trong một tổng thì tổng không thay đổi.</b>',
    ],
    demos: [
      { kind: 'expr', rows: [{ expr: '20 + 30' }, { expr: '30 + 20' }], same: true, outro: 'Đổi chỗ hai số hạng, tổng <b>không thay đổi</b>: a + b = b + a.',
        tries: [{ label: '20 + 30', rows: [{ expr: '20 + 30' }, { expr: '30 + 20' }] }, { label: '1208 + 2764', rows: [{ expr: '1208 + 2764' }, { expr: '2764 + 1208' }] }] },
    ],
  },
  'bai-34': {
    points: [
      '<b>a + b + c</b> là một <b>biểu thức có chứa ba chữ</b>.',
      'Mỗi lần thay ba chữ bằng ba số rồi tính, ta được một giá trị của biểu thức a + b + c.',
    ],
    demos: [
      { kind: 'expr', title: 'Biểu thức a + b + c', rows: [{ expr: 'a + b + c' }], vars: { a: 2, b: 3, c: 4 }, then: v => `${v} là một giá trị của biểu thức a + b + c.`,
        tries: [{ label: '2, 3, 4', vars: { a: 2, b: 3, c: 4 } }, { label: '5, 1, 0', vars: { a: 5, b: 1, c: 0 } }, { label: '1, 0, 2', vars: { a: 1, b: 0, c: 2 } }] },
    ],
  },
  'bai-35': {
    points: [
      'Giá trị của (a + b) + c và của a + (b + c) luôn bằng nhau: <b>(a + b) + c = a + (b + c)</b>.',
      '<b>Khi cộng một tổng hai số với số thứ ba, ta có thể cộng số thứ nhất với tổng của số thứ hai và số thứ ba.</b>',
      'Vì vậy có thể tính a + b + c = (a + b) + c = a + (b + c), chọn cách nào tính thuận tiện hơn.',
    ],
    demos: [
      { kind: 'expr', rows: [{ expr: '(5 + 4) + 6' }, { expr: '5 + (4 + 6)' }], same: true, outro: 'Hai cách cộng cho cùng kết quả: (a + b) + c = a + (b + c). Cách thứ hai tròn chục nên <b>tính nhanh hơn</b>.',
        tries: [{ label: '(5 + 4) + 6', rows: [{ expr: '(5 + 4) + 6' }, { expr: '5 + (4 + 6)' }] }, { label: '(28 + 49) + 51', rows: [{ expr: '(28 + 49) + 51' }, { expr: '28 + (49 + 51)' }] }] },
    ],
  },
  'bai-37': {
    points: [
      '<b>Số bé = (Tổng − Hiệu) : 2</b>; sau đó tìm số lớn = số bé + hiệu.',
      'Hoặc: <b>Số lớn = (Tổng + Hiệu) : 2</b>; sau đó tìm số bé = số lớn − hiệu.',
      'Khi làm bài, có thể giải theo một trong hai cách trên.',
    ],
    demos: [
      { kind: 'sumDiff', sum: 70, diff: 10, way: 1, tries: [{ label: 'Cách 1', way: 1 }, { label: 'Cách 2', way: 2 }] },
    ],
  },
  'bai-40': {
    points: [
      '<b>Góc nhọn</b> bé hơn góc vuông.',
      '<b>Góc tù</b> lớn hơn góc vuông.',
      '<b>Góc bẹt</b> bằng hai góc vuông; hai cạnh của góc bẹt nằm trên một đường thẳng.',
      'Dùng ê ke để kiểm tra: đặt góc vuông của ê ke trùng đỉnh và một cạnh của góc rồi so cạnh còn lại.',
    ],
    demos: [
      { kind: 'angles' },
    ],
  },
  'bai-41': {
    points: [
      'Kéo dài hai cạnh BC và DC của hình chữ nhật ABCD ta được <b>hai đường thẳng vuông góc</b> với nhau.',
      'Hai đường thẳng vuông góc với nhau tạo thành bốn góc vuông có chung đỉnh.',
      'Ta thường dùng <b>ê ke</b> để kiểm tra hoặc vẽ hai đường thẳng vuông góc.',
    ],
    demos: [
      { kind: 'perp' },
    ],
  },
  'bai-42': {
    points: [
      'Kéo dài hai cạnh AB và DC của hình chữ nhật ABCD ta được <b>hai đường thẳng song song</b> với nhau.',
      'Hai đường thẳng song song với nhau <b>không bao giờ cắt nhau</b>.',
    ],
    demos: [
      { kind: 'parallel' },
    ],
  },
  'bai-43': {
    points: [
      'Vẽ đường thẳng CD đi qua điểm E và vuông góc với đường thẳng AB: đặt một cạnh góc vuông của ê ke trùng với đường thẳng AB.',
      'Trượt ê ke dọc theo AB cho đến khi cạnh góc vuông còn lại chạm điểm E, rồi vạch một đường thẳng theo cạnh đó. Cách này dùng được khi E nằm trên hoặc nằm ngoài đường thẳng AB.',
      '<b>Đường cao</b> của hình tam giác ABC: qua đỉnh A vẽ đường thẳng vuông góc với cạnh BC, cắt BC tại H. Đoạn thẳng AH là đường cao của hình tam giác ABC.',
    ],
    demos: [
      { kind: 'drawPerp', tries: [{ label: 'E ở ngoài AB' }, { label: 'E ở trên AB', onLine: true }] },
      { kind: 'drawPerp', mode: 'height' },
    ],
  },
  'bai-44': {
    points: [
      'Muốn vẽ đường thẳng CD đi qua điểm E và song song với đường thẳng AB, ta làm hai bước:',
      'Bước 1: vẽ đường thẳng MN đi qua E và vuông góc với AB.',
      'Bước 2: vẽ đường thẳng CD đi qua E và vuông góc với MN. Khi đó CD song song với AB.',
    ],
    demos: [
      { kind: 'drawPar' },
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
      'Hai đoạn thẳng AC và BD là hai <b>đường chéo</b> của hình chữ nhật ABCD.',
    ],
    demos: [
      { kind: 'drawRect', w: 4, h: 2, tries: [{ label: '4cm × 2cm' }, { label: '5cm × 3cm', w: 5, h: 3 }] },
    ],
  },
  'bai-46': {
    points: [
      'Vẽ hình vuông có cạnh 3cm:',
      '1. Vẽ đoạn thẳng DC = 3cm.',
      '2. Vẽ đường thẳng vuông góc với DC tại D và đường thẳng vuông góc với DC tại C. Trên mỗi đường đó lấy DA = 3cm, CB = 3cm.',
      '3. Nối A với B ta được hình vuông ABCD.',
    ],
    demos: [
      { kind: 'drawRect', square: true, w: 3, tries: [{ label: 'cạnh 3cm' }, { label: 'cạnh 4cm', w: 4 }] },
    ],
  },
  'bai-49': {
    points: [
      'Đặt tính: viết thừa số có một chữ số dưới hàng đơn vị của thừa số kia, viết dấu ×, kẻ gạch ngang.',
      'Nhân theo thứ tự <b>từ phải sang trái</b>. Được tích từ 10 trở lên thì viết chữ số hàng đơn vị, nhớ chữ số hàng chục để cộng vào lần nhân sau.',
    ],
    demos: [
      { kind: 'mul', a: 241324, b: 2, tries: [{ label: '241 324 × 2', a: 241324, b: 2 }, { label: '136 204 × 4', a: 136204, b: 4 }] },
    ],
  },
  'bai-50': {
    points: [
      'Giá trị của a × b và của b × a luôn bằng nhau: <b>a × b = b × a</b>.',
      '<b>Khi đổi chỗ các thừa số trong một tích thì tích không thay đổi.</b>',
    ],
    demos: [
      { kind: 'array', cols: 7, rows: 5, tries: [{ label: '7 × 5', cols: 7, rows: 5 }, { label: '4 × 8', cols: 4, rows: 8 }] },
    ],
  },
  'bai-51': {
    points: [
      'Khi nhân một số tự nhiên với 10, 100, 1000, … ta chỉ việc <b>viết thêm</b> một, hai, ba, … chữ số 0 vào bên phải số đó.',
      'Khi chia số tròn chục, tròn trăm, tròn nghìn, … cho 10, 100, 1000, … ta chỉ việc <b>bỏ bớt</b> một, hai, ba, … chữ số 0 ở bên phải số đó.',
    ],
    demos: [
      { kind: 'shift', n: 35 },
    ],
  },
  'bai-52': {
    points: [
      'Giá trị của (a × b) × c và của a × (b × c) luôn bằng nhau: <b>(a × b) × c = a × (b × c)</b>.',
      '<b>Khi nhân một tích hai số với số thứ ba, ta có thể nhân số thứ nhất với tích của số thứ hai và số thứ ba.</b>',
      'Vì vậy có thể tính a × b × c = (a × b) × c = a × (b × c), chọn cách nào tính thuận tiện hơn.',
    ],
    demos: [
      { kind: 'expr', rows: [{ expr: '(2 × 3) × 4' }, { expr: '2 × (3 × 4)' }], same: true, outro: 'Hai cách nhân cho cùng kết quả: (a × b) × c = a × (b × c).',
        tries: [{ label: '(2 × 3) × 4', rows: [{ expr: '(2 × 3) × 4' }, { expr: '2 × (3 × 4)' }] }, { label: '(3 × 4) × 5', rows: [{ expr: '(3 × 4) × 5' }, { expr: '3 × (4 × 5)' }] }] },
    ],
  },
  'bai-53': {
    points: [
      'Khi một thừa số có tận cùng là chữ số 0, ta nhân phần còn lại trước, rồi <b>viết thêm các chữ số 0</b> vào bên phải kết quả.',
      'Khi đặt tính, viết các chữ số 0 ra ngoài bên phải; nhân các chữ số khác 0 với nhau, rồi viết thêm số chữ số 0 vào bên phải tích.',
    ],
    demos: [
      { kind: 'mul', a: 1324, b: 20, tries: [{ label: '1324 × 20', a: 1324, b: 20 }, { label: '230 × 70', a: 230, b: 70 }] },
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
    ],
    demos: [
      { kind: 'areaUnit', unit: 'dm' },
      { kind: 'units', units: ['dm²', 'cm²'], w: 2, parts: [[48, 'dm²']], to: 'cm²', tries: [{ label: '48dm²', parts: [[48, 'dm²']], to: 'cm²' }, { label: '2000cm²', parts: [[2000, 'cm²']], to: 'dm²' }] },
    ],
  },
  'bai-55': {
    points: [
      'Để đo diện tích người ta còn dùng đơn vị <b>mét vuông</b>.',
      'Mét vuông là diện tích của hình vuông có cạnh dài 1m. Mét vuông viết tắt là <b>m²</b>.',
      'Hình vuông 1m² gồm 100 hình vuông 1dm²: <b>1m² = 100dm²</b>.',
    ],
    demos: [
      { kind: 'areaUnit', unit: 'm' },
      { kind: 'units', units: ['m²', 'dm²'], w: 2, parts: [[400, 'dm²']], to: 'm²' },
    ],
  },
  'bai-56': {
    points: [
      '<b>Khi nhân một số với một tổng, ta có thể nhân số đó với từng số hạng của tổng, rồi cộng các kết quả với nhau.</b>',
      'a × (b + c) = a × b + a × c',
    ],
    demos: [
      { kind: 'distrib', a: 4, b: 3, c: 5, op: '+' },
      { kind: 'expr', title: '38 × 6 + 38 × 4', ask: false, rows: [{ segs: ['38 × 6 + 38 × 4', '38 × (6 + 4)', '38 × 10', '380'],
          caps: ['', 'Hai tích có chung thừa số 38: viết thành 38 nhân với một tổng.', '6 + 4 = 10, tròn chục.', '38 × 10 = <b>380</b>. Tính nhanh hơn nhiều.'] }] },
    ],
  },
  'bai-57': {
    points: [
      '<b>Khi nhân một số với một hiệu, ta có thể lần lượt nhân số đó với số bị trừ và số trừ, rồi trừ hai kết quả cho nhau.</b>',
      'a × (b − c) = a × b − a × c',
    ],
    demos: [
      { kind: 'distrib', a: 3, b: 7, c: 5, op: '-' },
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
    ],
    demos: [
      { kind: 'mul', a: 36, b: 23 },
    ],
  },
  'bai-61': {
    points: [
      'Nhân nhẩm số có hai chữ số với 11: cộng hai chữ số của số đó, rồi viết tổng vào giữa hai chữ số.',
      'Nếu tổng hai chữ số từ 10 trở lên: viết chữ số hàng đơn vị của tổng vào giữa, rồi thêm 1 vào chữ số bên trái.',
    ],
    demos: [
      { kind: 'eleven', n: 27, tries: [{ label: '27 × 11', n: 27 }, { label: '48 × 11', n: 48 }, { label: '35 × 11', n: 35 }] },
    ],
  },
  'bai-62': {
    points: [
      'Nhân với số có ba chữ số: nhân lần lượt với chữ số hàng đơn vị, hàng chục, hàng trăm, được <b>tích riêng thứ nhất, thứ hai, thứ ba</b>, rồi cộng lại.',
      'Tích riêng thứ hai viết lùi sang trái <b>một cột</b> (là số chục); tích riêng thứ ba viết lùi sang trái <b>hai cột</b> (là số trăm), so với tích riêng thứ nhất.',
    ],
    examples: [
      '164 × 123 = 164 × (100 + 20 + 3) = 164 × 100 + 164 × 20 + 164 × 3 = 16 400 + 3280 + 492 = 20 172.',
    ],
    demos: [
      { kind: 'mul', a: 164, b: 123 },
    ],
  },
  'bai-63': {
    points: [
      'Khi thừa số thứ hai có chữ số 0 ở hàng chục, tích riêng thứ hai gồm toàn chữ số 0.',
      'Thường ta <b>không viết</b> tích riêng toàn chữ số 0 đó; khi ấy tích riêng tiếp theo phải viết <b>lùi sang trái hai cột</b> so với tích riêng thứ nhất.',
    ],
    demos: [
      { kind: 'mul', a: 258, b: 203 },
    ],
  },
  'bai-66': {
    points: [
      '<b>Khi chia một tổng cho một số, nếu các số hạng của tổng đều chia hết cho số chia thì ta có thể chia từng số hạng cho số chia, rồi cộng các kết quả tìm được với nhau.</b>',
      '(a + b) : c = a : c + b : c (khi a và b đều chia hết cho c).',
    ],
    demos: [
      { kind: 'expr', rows: [{ expr: '(35 + 21) : 7' }, { expr: '35 : 7 + 21 : 7' }], same: true, outro: 'Chia một tổng cho một số: chia từng số hạng cho số chia rồi cộng các kết quả (khi các số hạng đều chia hết).' },
    ],
  },
  'bai-67': {
    points: [
      'Đặt tính chia: số bị chia bên trái, số chia bên phải, thương viết dưới số chia.',
      'Chia theo thứ tự <b>từ trái sang phải</b>. Mỗi lượt: chia, nhân lại, trừ, rồi hạ chữ số tiếp theo xuống.',
      'Nếu lượt cuối còn số dư thì đó là phép chia có dư; số dư luôn bé hơn số chia.',
    ],
    demos: [
      { kind: 'div', a: 128472, b: 6, tries: [{ label: '128 472 : 6', a: 128472, b: 6 }, { label: '230 859 : 5', a: 230859, b: 5 }] },
    ],
  },
  'bai-69': {
    points: [
      '<b>Khi chia một số cho một tích hai thừa số, ta có thể chia số đó cho một thừa số, rồi lấy kết quả tìm được chia tiếp cho thừa số kia.</b>',
      'a : (b × c) = a : b : c = a : c : b',
    ],
    demos: [
      { kind: 'expr', rows: [{ expr: '24 : (3 × 2)' }, { expr: '24 : 3 : 2' }, { expr: '24 : 2 : 3' }], same: true, outro: 'Ba cách cho cùng kết quả: a : (b × c) = a : b : c = a : c : b.' },
    ],
  },
  'bai-70': {
    points: [
      '<b>Khi chia một tích hai thừa số cho một số, ta có thể lấy một thừa số chia cho số đó (nếu chia hết), rồi nhân kết quả với thừa số kia.</b>',
      'Chỉ chọn thừa số chia hết cho số chia; thừa số không chia hết thì không làm theo cách này.',
    ],
    examples: [
      '(7 × 15) : 3 = 7 × (15 : 3) = 7 × 5 = 35. Ta không tính (7 : 3) × 15 vì 7 không chia hết cho 3.',
    ],
    demos: [
      { kind: 'expr', rows: [{ expr: '(9 × 15) : 3' }, { expr: '9 × (15 : 3)' }, { expr: '(9 : 3) × 15' }], same: true, outro: 'Chia một tích cho một số: lấy một thừa số chia hết cho số đó, rồi nhân kết quả với thừa số kia.' },
    ],
  },
  'bai-71': {
    points: [
      '<b>Khi chia hai số có tận cùng là các chữ số 0, ta có thể cùng xoá một, hai, ba, … chữ số 0 ở tận cùng của số chia và số bị chia, rồi chia như thường.</b>',
      'Số chữ số 0 xoá ở số bị chia phải bằng số chữ số 0 xoá ở số chia.',
    ],
    examples: [
      '32 000 : 400 = 32 000 : (100 × 4) = 32 000 : 100 : 4 = 320 : 4 = 80.',
    ],
    demos: [
      { kind: 'expr', title: '320 : 40', ask: false, rows: [{ segs: ['320 : 40', '320 : (10 × 4)', '320 : 10 : 4', '32 : 4', '8'],
          caps: ['', '40 = 10 × 4.', 'Chia một số cho một tích: chia lần lượt cho từng thừa số.', '320 : 10 = 32 (bỏ một chữ số 0).', '32 : 4 = <b>8</b>.'] },
        { label: 'Gọn:', segs: ['32<s class="kx-x">0</s> : 4<s class="kx-x">0</s>', '32 : 4', '8'], caps: ['', 'Cùng xoá <b>một chữ số 0</b> ở tận cùng của số bị chia và số chia.', 'Rồi chia như thường: 32 : 4 = <b>8</b>.'] }],
        result: '320 : 40 = 32 : 4 = 8' },
    ],
  },
  'bai-72': {
    points: [
      'Chia cho số có hai chữ số: đặt tính, chia theo thứ tự <b>từ trái sang phải</b>.',
      'Mỗi lượt: lấy phần đầu của số bị chia (đủ lớn để chia) chia cho số chia, viết chữ số thương; nhân chữ số thương với số chia, viết tích dưới; trừ; rồi hạ chữ số tiếp theo.',
    ],
    demos: [
      { kind: 'div', a: 672, b: 21, mode: 'full', tries: [{ label: '672 : 21', a: 672, b: 21 }, { label: '779 : 18', a: 779, b: 18 }] },
    ],
  },
  'bai-73': {
    points: [
      'Số bị chia có bốn chữ số: nếu hai chữ số đầu bé hơn số chia thì lấy ba chữ số đầu để chia lượt đầu.',
      'Mỗi lượt vẫn làm: chia, nhân rồi viết tích dưới, trừ, hạ chữ số tiếp theo. Chia theo thứ tự từ trái sang phải.',
    ],
    demos: [
      { kind: 'div', a: 8192, b: 64, mode: 'full', tries: [{ label: '8192 : 64', a: 8192, b: 64 }, { label: '1154 : 62', a: 1154, b: 62 }] },
    ],
  },
  'bai-75': {
    points: [
      'Số bị chia có năm chữ số, chia cho số có hai chữ số: lấy ba chữ số đầu để chia lượt đầu nếu hai chữ số đầu bé hơn số chia.',
      'Ở bài này, mỗi lượt ta <b>nhân rồi trừ nhẩm</b> luôn: nhân chữ số thương với từng chữ số của số chia, lấy chữ số tương ứng trừ đi (mượn khi cần, rồi nhớ sang lần nhân sau), chỉ viết số dư của lượt đó.',
    ],
    demos: [
      { kind: 'div', a: 10105, b: 43, tries: [{ label: '10 105 : 43', a: 10105, b: 43 }, { label: '26 345 : 35', a: 26345, b: 35 }] },
    ],
  },
  'bai-77': {
    points: [
      'Khi chia, nếu ở một lượt số đem chia (sau khi hạ) bé hơn số chia thì ta viết <b>chữ số 0 ở thương</b>.',
      'Không được quên chữ số 0 đó, nếu không thương sẽ sai hàng.',
    ],
    demos: [
      { kind: 'div', a: 9450, b: 35, tries: [{ label: '9450 : 35', a: 9450, b: 35 }, { label: '2448 : 24', a: 2448, b: 24 }] },
    ],
  },
  'bai-78': {
    points: [
      'Chia cho số có ba chữ số: chia theo thứ tự từ trái sang phải, cách làm giống như chia cho số có hai chữ số.',
      'Lượt đầu lấy đủ số chữ số đầu của số bị chia để được số không bé hơn số chia. Mỗi lượt: chia, nhân rồi trừ nhẩm, hạ chữ số tiếp theo.',
    ],
    demos: [
      { kind: 'div', a: 1944, b: 162, tries: [{ label: '1944 : 162', a: 1944, b: 162 }, { label: '8469 : 241', a: 8469, b: 241 }] },
    ],
  },
  'bai-80': {
    points: [
      'Số bị chia có năm chữ số, chia cho số có ba chữ số: lượt đầu lấy ba chữ số đầu (nếu không bé hơn số chia).',
      'Mỗi lượt: chia, nhân rồi trừ nhẩm, hạ chữ số tiếp theo, cho đến hết. Số dư phải bé hơn số chia.',
    ],
    demos: [
      { kind: 'div', a: 41535, b: 195, tries: [{ label: '41 535 : 195', a: 41535, b: 195 }, { label: '80 120 : 245', a: 80120, b: 245 }] },
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
      '0; 2; 4; 6; 8; …; 156; 158; 160; … là các số chẵn. 1; 3; 5; 7; …; 567; 569; 571; … là các số lẻ.',
    ],
    demos: [
      { kind: 'lastDigit', by: 2, n: 32, tries: [32, 33, 156, 571].map(n => ({ label: String(n), n })) },
    ],
  },
  'bai-85': {
    points: [
      '<b>Các số có chữ số tận cùng là 0 hoặc 5 thì chia hết cho 5.</b>',
      'Các số không có chữ số tận cùng là 0 hoặc 5 thì không chia hết cho 5.',
    ],
    demos: [
      { kind: 'lastDigit', by: 5, n: 20, tries: [20, 35, 41, 58].map(n => ({ label: String(n), n })) },
    ],
  },
  'bai-87': {
    points: [
      '<b>Các số có tổng các chữ số chia hết cho 9 thì chia hết cho 9.</b>',
      'Các số có tổng các chữ số không chia hết cho 9 thì không chia hết cho 9.',
    ],
    demos: [
      { kind: 'digitSum', by: 9, n: 657, tries: [657, 451, 2349].map(n => ({ label: String(n), n })) },
    ],
  },
  'bai-88': {
    points: [
      '<b>Các số có tổng các chữ số chia hết cho 3 thì chia hết cho 3.</b>',
      'Các số có tổng các chữ số không chia hết cho 3 thì không chia hết cho 3.',
    ],
    demos: [
      { kind: 'digitSum', by: 3, n: 123, tries: [123, 125, 4083].map(n => ({ label: String(n), n })) },
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
    ],
    demos: [
      { kind: 'areaUnit', unit: 'km' },
    ],
  },
  'bai-93': {
    points: [
      'Hình bình hành ABCD có: AB và DC là hai cạnh đối diện; AD và BC là hai cạnh đối diện.',
      'Cạnh AB song song với cạnh DC; cạnh AD song song với cạnh BC; AB = DC và AD = BC.',
      '<b>Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.</b>',
    ],
    demos: [
      { kind: 'parallelogram' },
    ],
  },
  'bai-94': {
    points: [
      'Trong hình bình hành ABCD, DC là <b>đáy</b>; kẻ AH vuông góc với DC, độ dài AH là <b>chiều cao</b>.',
      'Cắt hình tam giác ADH rồi ghép sang bên kia, ta được hình chữ nhật ABIH có cùng diện tích, dài a, rộng h.',
      '<b>Diện tích hình bình hành bằng độ dài đáy nhân với chiều cao (cùng một đơn vị đo).</b>',
      'S = a × h (S là diện tích, a là độ dài đáy, h là chiều cao).',
    ],
    demos: [
      { kind: 'paraArea', a: 5, h: 3, tries: [{ label: 'a = 5, h = 3' }, { label: 'a = 4, h = 2', a: 4, h: 2, s: 1 }] },
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
      `${fr(1, 2)} đọc là một phần hai; ${fr(3, 4)} đọc là ba phần tư; ${fr(4, 7)} đọc là bốn phần bảy.`,
    ],
    demos: [
      { kind: 'frac', a: 5, b: 6, tries: [{ label: fr(5, 6), a: 5, b: 6, shape: 'circle' }, { label: fr(3, 4), a: 3, b: 4, shape: 'bar' }, { label: fr(4, 7), a: 4, b: 7, shape: 'circle' }] },
    ],
  },
  'bai-97': {
    points: [
      'Thương của phép chia số tự nhiên cho số tự nhiên (khác 0) có thể viết thành một <b>phân số</b>: tử số là số bị chia, mẫu số là số chia.',
      'Khi số bị chia không chia hết cho số chia, ta vẫn viết được thương dưới dạng phân số.',
    ],
    examples: [
      `8 : 4 = ${fr(8, 4)}; 3 : 4 = ${fr(3, 4)}; 5 : 5 = ${fr(5, 5)}.`,
    ],
    demos: [
      { kind: 'share', cakes: 3, kids: 4 },
    ],
  },
  'bai-98': {
    points: [
      `Phân số có <b>tử số lớn hơn mẫu số</b> thì lớn hơn 1, ví dụ ${fr(5, 4)} > 1.`,
      `Phân số có <b>tử số bằng mẫu số</b> thì bằng 1, ví dụ ${fr(4, 4)} = 1.`,
      `Phân số có <b>tử số bé hơn mẫu số</b> thì bé hơn 1, ví dụ ${fr(1, 4)} < 1.`,
    ],
    demos: [
      { kind: 'over1', a: 5, b: 4, tries: [{ label: fr(5, 4), a: 5, b: 4 }, { label: fr(4, 4), a: 4, b: 4 }, { label: fr(1, 4), a: 1, b: 4 }] },
    ],
  },
  'bai-100': {
    points: [
      '<b>Tính chất cơ bản của phân số:</b>',
      'Nếu nhân cả tử số và mẫu số của một phân số với cùng một số tự nhiên khác 0 thì được một phân số bằng phân số đã cho.',
      'Nếu cả tử số và mẫu số của một phân số cùng chia hết cho một số tự nhiên khác 0 thì sau khi chia ta được một phân số bằng phân số đã cho.',
    ],
    demos: [
      { kind: 'equiv', a: 3, b: 4, k: 2, tries: [{ label: `${fr(3, 4)} và ${fr(6, 8)}`, a: 3, b: 4, k: 2 }, { label: `${fr(1, 2)} và ${fr(3, 6)}`, a: 1, b: 2, k: 3 }] },
    ],
  },
  'bai-101': {
    points: [
      'Rút gọn phân số là tìm một phân số bằng nó nhưng có tử số và mẫu số bé hơn.',
      'Cách làm: xét xem tử số và mẫu số cùng chia hết cho số tự nhiên nào lớn hơn 1, rồi chia cả tử số và mẫu số cho số đó.',
      'Cứ làm như thế cho đến khi được <b>phân số tối giản</b>: phân số mà tử số và mẫu số không cùng chia hết cho số nào lớn hơn 1.',
    ],
    demos: [
      { kind: 'simplify', a: 6, b: 8, tries: [{ label: fr(6, 8), a: 6, b: 8 }, { label: fr(18, 54), a: 18, b: 54 }] },
    ],
  },
  'bai-103': {
    points: [
      'Quy đồng mẫu số hai phân số là tìm hai phân số <b>có cùng mẫu số</b>, lần lượt bằng hai phân số đã cho. Mẫu số đó gọi là <b>mẫu số chung</b>.',
      'Cách làm: lấy tử số và mẫu số của phân số thứ nhất <b>nhân với mẫu số của phân số thứ hai</b>.',
      'Lấy tử số và mẫu số của phân số thứ hai <b>nhân với mẫu số của phân số thứ nhất</b>.',
    ],
    demos: [
      { kind: 'common', a: 1, b: 3, c: 2, d: 5 },
    ],
  },
  'bai-104': {
    points: [
      'Nếu mẫu số của phân số này <b>chia hết cho</b> mẫu số của phân số kia thì có thể chọn mẫu số lớn hơn đó làm mẫu số chung.',
      'Khi đó: lấy mẫu số chung chia cho mẫu số của phân số kia, rồi nhân cả tử số và mẫu số của phân số kia với thương vừa tìm được. Giữ nguyên phân số có mẫu số chung.',
    ],
    demos: [
      { kind: 'common', a: 7, b: 6, c: 5, d: 12 },
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
      `${fr(2, 5)} < ${fr(5, 5)} mà ${fr(5, 5)} = 1, nên ${fr(2, 5)} < 1.`,
    ],
    demos: [
      { kind: 'fcmp', a: 2, b: 5, c: 3, d: 5 },
    ],
  },
  'bai-109': {
    points: [
      '<b>Muốn so sánh hai phân số khác mẫu số, ta có thể quy đồng mẫu số hai phân số đó, rồi so sánh các tử số của hai phân số mới.</b>',
    ],
    demos: [
      { kind: 'fcmp', a: 2, b: 3, c: 3, d: 4 },
    ],
  },
  'bai-114': {
    points: [
      '<b>Muốn cộng hai phân số cùng mẫu số, ta cộng hai tử số với nhau và giữ nguyên mẫu số.</b>',
      'Khi đổi chỗ hai phân số trong một tổng thì tổng không thay đổi (tính chất giao hoán).',
    ],
    examples: [
      `${fr(3, 7)} + ${fr(2, 7)} = ${fr(2, 7)} + ${fr(3, 7)} = ${fr(5, 7)}.`,
    ],
    demos: [
      { kind: 'fop', a: 3, b: 8, c: 2, d: 8, op: '+' },
    ],
  },
  'bai-115': {
    points: [
      '<b>Muốn cộng hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi cộng hai phân số đó.</b>',
    ],
    demos: [
      { kind: 'fop', a: 1, b: 2, c: 1, d: 3, op: '+', tries: [{ label: `${fr(1, 2)} + ${fr(1, 3)}`, a: 1, b: 2, c: 1, d: 3 }, { label: `${fr(13, 21)} + ${fr(5, 7)}`, a: 13, b: 21, c: 5, d: 7 }] },
    ],
  },
  'bai-118': {
    points: [
      '<b>Muốn trừ hai phân số cùng mẫu số, ta trừ tử số của phân số thứ nhất cho tử số của phân số thứ hai và giữ nguyên mẫu số.</b>',
    ],
    demos: [
      { kind: 'fop', a: 5, b: 6, c: 3, d: 6, op: '−' },
    ],
  },
  'bai-119': {
    points: [
      '<b>Muốn trừ hai phân số khác mẫu số, ta quy đồng mẫu số hai phân số, rồi trừ hai phân số đó.</b>',
    ],
    demos: [
      { kind: 'fop', a: 4, b: 5, c: 2, d: 3, op: '−' },
    ],
  },
  'bai-122': {
    points: [
      '<b>Muốn nhân hai phân số, ta lấy tử số nhân với tử số, mẫu số nhân với mẫu số.</b>',
    ],
    demos: [
      { kind: 'fmul', a: 4, b: 5, c: 2, d: 3 },
    ],
  },
  'bai-125': {
    points: [
      `Muốn tìm ${fr(2, 3)} của số 12, ta lấy số 12 nhân với ${fr(2, 3)}.`,
      'Nói chung: muốn tìm phân số của một số, ta lấy số đó nhân với phân số.',
    ],
    demos: [
      { kind: 'fof', n: 12, a: 2, b: 3 },
    ],
  },
  'bai-126': {
    points: [
      '<b>Muốn chia hai phân số, ta lấy phân số thứ nhất nhân với phân số thứ hai đảo ngược.</b>',
      `Đảo ngược một phân số là đổi chỗ tử số và mẫu số: ${fr(3, 2)} là phân số đảo ngược của ${fr(2, 3)}.`,
    ],
    demos: [
      { kind: 'expr', title: 'Chia hai phân số', ask: false, rows: [{ segs: [`${fr(7, 15)} : ${fr(2, 3)}`, `${fr(7, 15)} × <span class="kx-flip">${fr(3, 2)}</span>`, fr('7 × 3', '15 × 2'), fr(21, 30)],
          caps: ['', `Đảo ngược phân số thứ hai: ${fr(2, 3)} thành ${fr(3, 2)}, rồi <b>nhân</b>.`, 'Tử số nhân tử số, mẫu số nhân mẫu số.', `Được <b>${fr(21, 30)}</b> (m).`] }],
        intro: `Hình chữ nhật có diện tích ${fr(7, 15)}m², chiều rộng ${fr(2, 3)}m. Chiều dài là ${fr(7, 15)} : ${fr(2, 3)}.`, result: `${fr(7, 15)} : ${fr(2, 3)} = ${fr(21, 30)} (m)` },
    ],
  },
  'bai-133': {
    points: [
      'Hình thoi ABCD có: cạnh AB song song với cạnh DC; cạnh AD song song với cạnh BC.',
      'AB = BC = CD = DA.',
      '<b>Hình thoi có hai cặp cạnh đối diện song song và bốn cạnh bằng nhau.</b>',
      'Hình thoi có hai đường chéo <b>vuông góc với nhau</b> và <b>cắt nhau tại trung điểm</b> của mỗi đường.',
    ],
    demos: [
      { kind: 'rhombus' },
    ],
  },
  'bai-134': {
    points: [
      'Cắt hai tam giác của hình thoi rồi ghép lại, ta được một hình chữ nhật có chiều dài m và chiều rộng bằng nửa n.',
      '<b>Diện tích hình thoi bằng tích của độ dài hai đường chéo chia cho 2 (cùng một đơn vị đo).</b>',
      `S = ${fr('m × n', 2)} (S là diện tích; m, n là độ dài hai đường chéo).`,
    ],
    demos: [
      { kind: 'rhombusArea', m: 4, n: 3, tries: [{ label: '4cm và 3cm' }, { label: '6cm và 2cm', m: 6, n: 2 }] },
    ],
  },

  // ── Chương năm ──────────────────────────────────────────────────────────
  'bai-137': {
    points: [
      `<b>Tỉ số</b> của a và b là a : b hay ${fr('a', 'b')} (b khác 0).`,
      'Tỉ số cho biết số thứ nhất bằng mấy phần số thứ hai. Viết tỉ số theo đúng thứ tự: số nào nói trước thì viết trước.',
    ],
    demos: [
      { kind: 'ratio', a: 5, b: 7 },
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
    demos: [
      { kind: 'ratioParts', mode: 'sum', total: 96, a: 3, b: 5, tries: [
        { label: `Tổng 96, tỉ số ${fr(3, 5)}` },
        { label: 'Minh và Khôi', total: 25, a: 2, b: 3, names: ['Minh', 'Khôi'], unit: 'quyển' },
      ] },
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
    demos: [
      { kind: 'ratioParts', mode: 'diff', total: 24, a: 3, b: 5, tries: [
        { label: `Hiệu 24, tỉ số ${fr(3, 5)}` },
        { label: 'Chiều dài, chiều rộng', total: 12, a: 4, b: 7, names: ['Chiều rộng', 'Chiều dài'], unit: 'm', first: 1 },
      ] },
    ],
  },
  'bai-147': {
    points: [
      'Bản đồ nước Việt Nam có ghi "Tỉ lệ 1 : 10 000 000". Đó là <b>tỉ lệ bản đồ</b>.',
      `Tỉ lệ 1 : 10 000 000 hay ${fr(1, '10 000 000')} cho biết hình nước Việt Nam được vẽ thu nhỏ lại 10 000 000 lần.`,
      'Tỉ lệ bản đồ có thể viết dưới dạng một phân số có tử số là 1.',
    ],
    examples: [
      `Các tỉ lệ bản đồ: ${fr(1, 1000)}; ${fr(1, 500)}; ${fr(1, '1 000 000')}; …`,
    ],
    demos: [
      { kind: 'mapScale', mode: 'real', scale: 10000000, map: 1, mapUnit: 'cm', realUnit: 'km' },
    ],
  },
  'bai-148': {
    points: [
      'Biết tỉ lệ bản đồ và độ dài trên bản đồ, muốn tìm <b>độ dài thật</b>, ta lấy độ dài trên bản đồ nhân với số ở mẫu của tỉ lệ (ví dụ tỉ lệ 1 : 300 thì nhân với 300).',
      'Độ dài thật tính được có cùng đơn vị với độ dài trên bản đồ; sau đó đổi ra đơn vị thích hợp (m, km).',
    ],
    demos: [
      { kind: 'mapScale', mode: 'real', scale: 300, map: 2, mapUnit: 'cm', realUnit: 'm', tries: [
        { label: 'Cổng trường' },
        { label: 'Hà Nội, Hải Phòng', scale: 1000000, map: 102, mapUnit: 'mm', realUnit: 'km', thing: 'road', what: 'quãng đường Hà Nội, Hải Phòng dài' },
      ] },
    ],
  },
  'bai-149': {
    points: [
      'Biết tỉ lệ bản đồ và độ dài thật, muốn tìm <b>độ dài trên bản đồ</b>, ta đổi độ dài thật ra đơn vị cần tìm, rồi chia cho số ở mẫu của tỉ lệ.',
      'Nhớ đổi đơn vị trước khi chia (ví dụ đổi m ra cm, km ra mm).',
    ],
    demos: [
      { kind: 'mapScale', mode: 'map', real: 20, realUnit: 'm', mapUnit: 'cm', scale: 500, tries: [
        { label: '20m, 1 : 500' },
        { label: '41km, 1 : 1 000 000', real: 41, realUnit: 'km', mapUnit: 'mm', scale: 1000000 },
      ] },
    ],
  },
};
