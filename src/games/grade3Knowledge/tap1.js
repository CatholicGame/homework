/**
 * Kiến thức từng bài Toán 3 Tập Một (SGK Kết nối tri thức), Bài 1–44. Định dạng mục: lessonHelp.js.
 * Vở bài tập không có phần bài học, nên ở đây viết lại phần bài học của SGK bằng lời dễ hiểu cho học sinh lớp 3,
 * cùng cách gọi tên (số hạng, số bị trừ, thừa số, số bị chia…) và cách đặt tính như sách.
 * Ví dụ xem từng bước: loại của SGK Toán 4 (compare, add, sub, mul, div 'full', expr) và loại riêng 'g3a-…' (./demos-tap1.js).
 * Bài 16–21 có mục riêng nên mục hình học thêm theo câu (grade3Knowledge.js TOPICS) của các bài đó không hiện lặp lại.
 */
import './demos-tap1.js';
import { fr } from '../grade4Textbook/demos/util.js';

const tries = (list) => list.map(([label, extra]) => ({ label, ...extra }));

export const KNOWLEDGE3_TAP1 = {
  // ── Chủ đề 1: Ôn tập và bổ sung ──────────────────────────────────────────
  1: {
    title: 'Ôn tập các số đến 1 000',
    points: [
      'Số có ba chữ số gồm <b>hàng trăm, hàng chục, hàng đơn vị</b>. 10 đơn vị = 1 chục, 10 chục = 1 trăm, 10 trăm = 1 nghìn (1 000).',
      'Viết số và đọc số từ hàng trăm đến hàng đơn vị. Ví dụ 405 đọc là "bốn trăm linh năm", 415 đọc là "bốn trăm mười lăm".',
      'Viết số thành tổng: <b>243 = 200 + 40 + 3</b>.',
      'So sánh hai số có ba chữ số: so <b>chữ số hàng trăm</b> trước; hàng trăm bằng nhau thì so hàng chục; hàng chục cũng bằng nhau thì so hàng đơn vị.',
      'Ba số liên tiếp hơn kém nhau 1 đơn vị, ví dụ 399, 400, 401.',
    ],
    demos: [
      { kind: 'g3a-blocks', n: 243, tries: tries([['243', { n: 243 }], ['405', { n: 405 }], ['370', { n: 370 }]]) },
      { kind: 'compare', a: 786, b: 768, tries: tries([['786 và 768', { a: 786, b: 768 }], ['243 và 234', { a: 243, b: 234 }], ['99 và 101', { a: 99, b: 101 }]]) },
    ],
  },
  2: {
    title: 'Ôn tập phép cộng, phép trừ trong phạm vi 1 000',
    points: [
      'Cộng, trừ nhẩm các số tròn trăm, tròn chục: <b>300 + 200</b> là 3 trăm + 2 trăm = 5 trăm, vậy 300 + 200 = 500.',
      'Đặt tính: viết các chữ số <b>cùng hàng thẳng cột</b> với nhau, rồi tính <b>từ phải sang trái</b> (hàng đơn vị trước).',
      'Phép cộng: cộng hai chữ số được 10 trở lên thì viết chữ số hàng đơn vị, <b>nhớ 1</b> sang hàng bên trái.',
      'Phép trừ: chữ số trên bé hơn chữ số dưới thì lấy thêm 10 để trừ, rồi <b>thêm 1</b> vào chữ số hàng bên trái của số trừ.',
      '"Nhiều hơn" thì làm phép cộng; "ít hơn" thì làm phép trừ.',
    ],
    demos: [
      { kind: 'add', a: 456, b: 238, tries: tries([['456 + 238', { a: 456, b: 238 }], ['375 + 162', { a: 375, b: 162 }], ['674 + 45', { a: 674, b: 45 }]]) },
      { kind: 'sub', a: 645, b: 182, tries: tries([['645 − 182', { a: 645, b: 182 }], ['572 − 236', { a: 572, b: 236 }], ['100 − 25', { a: 100, b: 25 }]]) },
    ],
  },
  3: {
    title: 'Tìm thành phần trong phép cộng, phép trừ',
    points: [
      'Trong phép cộng 32 + 28 = 60: 32 và 28 là <b>số hạng</b>, 60 là <b>tổng</b>.',
      'Muốn tìm <b>số hạng</b>, ta lấy tổng trừ đi số hạng kia.',
      'Trong phép trừ 70 − 15 = 55: 70 là <b>số bị trừ</b>, 15 là <b>số trừ</b>, 55 là <b>hiệu</b>.',
      'Muốn tìm <b>số bị trừ</b>, ta lấy hiệu cộng với số trừ.',
      'Muốn tìm <b>số trừ</b>, ta lấy số bị trừ trừ đi hiệu.',
    ],
    demos: [
      { kind: 'g3a-find', op: '+', a: 32, b: 28, hide: 0,
        tries: tries([['Tìm số hạng', { op: '+', a: 32, b: 28, hide: 0 }], ['Tìm số bị trừ', { op: '−', a: 35, b: 20, hide: 0 }], ['Tìm số trừ', { op: '−', a: 70, b: 55, hide: 1 }]]) },
    ],
  },
  4: {
    title: 'Ôn tập bảng nhân 2; 5, bảng chia 2; 5',
    points: [
      '<b>2 × 6 = 12</b> nghĩa là 2 được lấy 6 lần: 2 + 2 + 2 + 2 + 2 + 2 = 12.',
      'Bảng nhân 2: đếm thêm 2 (2, 4, 6, 8, …, 20). Bảng nhân 5: đếm thêm 5 (5, 10, 15, …, 50).',
      'Từ một phép nhân ta có hai phép chia: 2 × 6 = 12 thì <b>12 : 2 = 6</b> và <b>12 : 6 = 2</b>.',
      'Chia đều thành các phần (mỗi phần mấy?) hay chia theo nhóm (được mấy nhóm?) đều dùng phép chia.',
    ],
    demos: [
      { kind: 'g3a-table', a: 2, n: 6, tries: tries([['Bảng 2: 2 × 6', { a: 2, n: 6 }], ['Bảng 5: 5 × 4', { a: 5, n: 4 }], ['Bảng 5: 5 × 7', { a: 5, n: 7 }]]) },
    ],
  },
  5: {
    title: 'Bảng nhân 3, bảng chia 3',
    points: [
      '<b>3 × 4 = 12</b> nghĩa là 3 được lấy 4 lần: 3 + 3 + 3 + 3 = 12.',
      'Bảng nhân 3: đếm thêm 3 (3, 6, 9, 12, 15, 18, 21, 24, 27, 30). Mỗi kết quả hơn kết quả liền trước 3 đơn vị.',
      'Bảng chia 3 suy ra từ bảng nhân 3: 3 × 4 = 12 thì <b>12 : 3 = 4</b>.',
      'Học thuộc: 3 × 1 = 3, 3 × 2 = 6, … , 3 × 10 = 30 và 3 : 3 = 1, 6 : 3 = 2, … , 30 : 3 = 10.',
    ],
    demos: [
      { kind: 'g3a-table', a: 3, n: 4, tries: tries([['3 × 4', { a: 3, n: 4 }], ['3 × 7', { a: 3, n: 7 }], ['3 × 9', { a: 3, n: 9 }]]) },
    ],
  },
  6: {
    title: 'Bảng nhân 4, bảng chia 4',
    points: [
      '<b>4 × 3 = 12</b> nghĩa là 4 được lấy 3 lần: 4 + 4 + 4 = 12.',
      'Bảng nhân 4: đếm thêm 4 (4, 8, 12, 16, 20, 24, 28, 32, 36, 40).',
      'Bảng chia 4 suy ra từ bảng nhân 4: 4 × 3 = 12 thì <b>12 : 4 = 3</b>.',
      'Mỗi con thỏ có 4 cái chân: 6 con thỏ có 4 × 6 = 24 (cái chân).',
    ],
    demos: [
      { kind: 'g3a-table', a: 4, n: 3, tries: tries([['4 × 3', { a: 4, n: 3 }], ['4 × 6', { a: 4, n: 6 }], ['4 × 8', { a: 4, n: 8 }]]) },
    ],
  },
  7: {
    title: 'Ôn tập hình học và đo lường',
    points: [
      'Ba điểm cùng nằm trên <b>một đường thẳng</b> là <b>ba điểm thẳng hàng</b>. Kiểm tra: đặt mép thước qua hai điểm, điểm thứ ba cũng nằm sát mép thước thì ba điểm thẳng hàng.',
      'Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng của nó.',
      'Đồng hồ: kim ngắn chỉ giờ, kim dài chỉ phút. Giờ buổi chiều, buổi tối: <b>cộng thêm 12</b>, ví dụ 3 giờ chiều là 15 giờ.',
      'Một tuần lễ có 7 ngày. Thứ Bảy ngày 14 thì thứ Bảy tuần sau là ngày 14 + 7 = 21.',
      '1 kg là một ki-lô-gam; 1 l là một lít; 1 m = 100 cm, 1 dm = 10 cm.',
    ],
    demos: [
      { kind: 'g3a-line3' },
      { kind: 'g3a-clock', h: 15, m: 30, tries: tries([['3 giờ 30 phút chiều', { h: 15, m: 30 }], ['8 giờ 15 phút tối', { h: 20, m: 15 }]]) },
    ],
  },
  8: { title: 'Luyện tập chung', see: [1, 2, 4, 5, 6] },
  // ── Chủ đề 2: Bảng nhân, bảng chia ───────────────────────────────────────
  9: {
    title: 'Bảng nhân 6, bảng chia 6',
    points: [
      '<b>6 × 5 = 30</b> nghĩa là 6 được lấy 5 lần: 6 + 6 + 6 + 6 + 6 = 30.',
      'Bảng nhân 6: đếm thêm 6 (6, 12, 18, 24, 30, 36, 42, 48, 54, 60).',
      'Bảng chia 6 suy ra từ bảng nhân 6: 6 × 8 = 48 thì <b>48 : 6 = 8</b>.',
      'Xếp 48 cái bánh, mỗi hộp 6 cái: được 48 : 6 = 8 (hộp).',
    ],
    demos: [
      { kind: 'g3a-table', a: 6, n: 5, tries: tries([['6 × 5', { a: 6, n: 5 }], ['6 × 8', { a: 6, n: 8 }]]) },
    ],
  },
  10: {
    title: 'Bảng nhân 7, bảng chia 7',
    points: [
      '<b>7 × 4 = 28</b> nghĩa là 7 được lấy 4 lần: 7 + 7 + 7 + 7 = 28.',
      'Bảng nhân 7: đếm thêm 7 (7, 14, 21, 28, 35, 42, 49, 56, 63, 70).',
      'Bảng chia 7 suy ra từ bảng nhân 7: 7 × 7 = 49 thì <b>49 : 7 = 7</b>.',
      'Một tuần lễ có 7 ngày: 3 tuần lễ có 7 × 3 = 21 (ngày).',
    ],
    demos: [
      { kind: 'g3a-table', a: 7, n: 4, tries: tries([['7 × 4', { a: 7, n: 4 }], ['7 × 6', { a: 7, n: 6 }]]) },
    ],
  },
  11: {
    title: 'Bảng nhân 8, bảng chia 8',
    points: [
      '<b>8 × 3 = 24</b> nghĩa là 8 được lấy 3 lần: 8 + 8 + 8 = 24.',
      'Bảng nhân 8: đếm thêm 8 (8, 16, 24, 32, 40, 48, 56, 64, 72, 80).',
      'Bảng chia 8 suy ra từ bảng nhân 8: 8 × 8 = 64 thì <b>64 : 8 = 8</b>.',
      'Có 64 viên bi chia đều vào 8 hộp: mỗi hộp có 64 : 8 = 8 (viên bi).',
    ],
    demos: [
      { kind: 'g3a-table', a: 8, n: 3, tries: tries([['8 × 3', { a: 8, n: 3 }], ['8 × 5', { a: 8, n: 5 }]]) },
    ],
  },
  12: {
    title: 'Bảng nhân 9, bảng chia 9',
    points: [
      '<b>9 × 3 = 27</b> nghĩa là 9 được lấy 3 lần: 9 + 9 + 9 = 27.',
      'Bảng nhân 9: đếm thêm 9 (9, 18, 27, 36, 45, 54, 63, 72, 81, 90).',
      'Bảng chia 9 suy ra từ bảng nhân 9: 9 × 4 = 36 thì <b>36 : 9 = 4</b>.',
      'Số nào nhân với 1 cũng bằng chính số đó; số nào chia cho 1 cũng bằng chính số đó.',
    ],
    demos: [
      { kind: 'g3a-table', a: 9, n: 3, tries: tries([['9 × 3', { a: 9, n: 3 }], ['9 × 4', { a: 9, n: 4 }]]) },
    ],
  },
  13: {
    title: 'Tìm thành phần trong phép nhân, phép chia',
    points: [
      'Trong phép nhân 6 × 9 = 54: 6 và 9 là <b>thừa số</b>, 54 là <b>tích</b>. Muốn tìm <b>thừa số</b>, ta lấy tích chia cho thừa số kia.',
      'Trong phép chia 35 : 5 = 7: 35 là <b>số bị chia</b>, 5 là <b>số chia</b>, 7 là <b>thương</b>.',
      'Muốn tìm <b>số bị chia</b>, ta lấy thương nhân với số chia.',
      'Muốn tìm <b>số chia</b>, ta lấy số bị chia chia cho thương.',
    ],
    demos: [
      { kind: 'g3a-find', op: '×', a: 6, b: 9, hide: 1,
        tries: tries([['Tìm thừa số', { op: '×', a: 6, b: 9, hide: 1 }], ['Tìm số bị chia', { op: ':', a: 24, b: 3, hide: 0 }], ['Tìm số chia', { op: ':', a: 35, b: 5, hide: 1 }]]) },
    ],
  },
  14: {
    title: 'Một phần mấy',
    points: [
      'Chia một hình thành <b>2 phần bằng nhau</b>, tô màu 1 phần: đã tô màu <span class="gw-frac"><span>1</span><span>2</span></span> hình (một phần hai).',
      'Tương tự: <span class="gw-frac"><span>1</span><span>3</span></span> một phần ba, <span class="gw-frac"><span>1</span><span>4</span></span> một phần tư, <span class="gw-frac"><span>1</span><span>5</span></span> một phần năm, … , <span class="gw-frac"><span>1</span><span>9</span></span> một phần chín.',
      'Các phần phải <b>bằng nhau</b>. Hình chia thành các phần không bằng nhau thì không nói được "một phần mấy".',
      'Muốn tìm <span class="gw-frac"><span>1</span><span>3</span></span> của 12 con cá: chia 12 con thành 3 phần bằng nhau, lấy 1 phần: 12 : 3 = 4 (con cá).',
    ],
    demos: [
      { kind: 'g3a-part', n: 3, shape: 'circle', tries: tries([['Hình tròn, 3 phần', { n: 3, shape: 'circle' }], ['Băng giấy, 5 phần', { n: 5, shape: 'rect' }], ['Hình tròn, 8 phần', { n: 8, shape: 'circle' }]]) },
      { kind: 'g3a-part', shape: 'set', n: 2, count: 8, thing: 'con cá', tries: tries([[`${fr(1, 2)} của 8 con cá`, { n: 2, count: 8, thing: 'con cá' }], [`${fr(1, 4)} của 12 bông hoa`, { n: 4, count: 12, thing: 'bông hoa' }], [`${fr(1, 3)} của 12 con cá`, { n: 3, count: 12, thing: 'con cá' }]]) },
    ],
  },
  15: { title: 'Luyện tập chung', see: [9, 10, 11, 12, 14] },
  // ── Chủ đề 3: Làm quen với hình phẳng, hình khối ─────────────────────────
  16: {
    title: 'Điểm ở giữa, trung điểm của đoạn thẳng',
    points: [
      'A, O, B là ba điểm thẳng hàng, O nằm giữa A và B: ta nói <b>O là điểm ở giữa</b> hai điểm A và B.',
      'M là điểm ở giữa A và B, lại có <b>AM = MB</b> thì <b>M là trung điểm</b> của đoạn thẳng AB.',
      'Tìm trung điểm: đo độ dài đoạn thẳng rồi lấy <b>một nửa</b>. AB = 6 cm thì M cách A là 6 : 2 = 3 (cm).',
      'Trên giấy ô vuông: đếm số ô từ mỗi đầu tới điểm đó, hai bên bằng nhau thì đó là trung điểm.',
    ],
    demos: [
      { kind: 'g3a-mid', len: 6, tries: tries([['AB = 6 cm', { len: 6 }], ['AB = 8 cm', { len: 8 }], ['AB = 4 cm', { len: 4 }]]) },
    ],
  },
  17: {
    title: 'Hình tròn. Tâm, bán kính, đường kính của hình tròn',
    points: [
      'Điểm O ở chính giữa là <b>tâm</b> của hình tròn.',
      '<b>Bán kính</b> là đoạn thẳng nối tâm với một điểm trên đường tròn. Mọi bán kính của một hình tròn đều dài bằng nhau.',
      '<b>Đường kính</b> là đoạn thẳng <b>đi qua tâm</b>, nối hai điểm trên đường tròn. Đường kính dài <b>gấp 2 lần</b> bán kính.',
      'Tâm là <b>trung điểm</b> của đường kính.',
      'Vẽ hình tròn bằng com-pa: đặt đầu nhọn ở tâm, mở com-pa rộng bằng bán kính rồi quay một vòng.',
    ],
    demos: [
      { kind: 'g3a-circle', r: 3, tries: tries([['Bán kính 3 cm', { r: 3 }], ['Bán kính 2 cm', { r: 2 }]]) },
    ],
  },
  18: {
    title: 'Góc, góc vuông, góc không vuông',
    points: [
      'Góc gồm <b>một đỉnh</b> và <b>hai cạnh</b> đi ra từ đỉnh đó. Ví dụ: góc đỉnh O; cạnh OA, OB.',
      'Dùng <b>ê ke</b> để kiểm tra: đặt góc vuông của ê ke trùng đỉnh, một cạnh ê ke nằm trên một cạnh của góc.',
      'Cạnh kia của góc nằm khít cạnh ê ke thì đó là <b>góc vuông</b>; không khít thì đó là <b>góc không vuông</b>.',
      'Mỗi góc của hình chữ nhật, hình vuông đều là góc vuông.',
    ],
    demos: [{ kind: 'g3a-right' }],
  },
  19: {
    title: 'Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông',
    points: [
      '<b>Hình tam giác</b> ABC có 3 đỉnh A, B, C và 3 cạnh AB, BC, CA.',
      '<b>Hình tứ giác</b> MNPQ có 4 đỉnh M, N, P, Q và 4 cạnh MN, NP, PQ, QM. Gọi tên hình: đọc các đỉnh lần lượt đi vòng quanh hình.',
      '<b>Hình chữ nhật</b> có 4 góc vuông; hai cạnh dài bằng nhau (chiều dài), hai cạnh ngắn bằng nhau (chiều rộng).',
      '<b>Hình vuông</b> có 4 góc vuông và <b>4 cạnh bằng nhau</b>.',
      'Đếm hình: đếm các hình nhỏ trước, rồi đếm các hình ghép từ 2, 3, … hình nhỏ.',
    ],
    demos: [
      { kind: 'g3a-poly', shape: 'tri', tries: tries([['Tam giác', { shape: 'tri' }], ['Tứ giác', { shape: 'quad' }]]) },
      { kind: 'g3a-poly', shape: 'rect', tries: tries([['Hình chữ nhật', { shape: 'rect' }], ['Hình vuông', { shape: 'square' }]]) },
    ],
  },
  20: {
    title: 'Thực hành vẽ góc vuông, vẽ đường tròn, hình vuông, hình chữ nhật và vẽ trang trí',
    points: [
      'Vẽ <b>góc vuông</b>: đặt ê ke, kẻ theo hai cạnh góc vuông của ê ke; hoặc kẻ theo một đường kẻ ngang và một đường kẻ dọc của giấy ô vuông.',
      'Vẽ <b>đường tròn</b>: mở com-pa rộng bằng bán kính, đặt đầu nhọn ở tâm rồi quay một vòng.',
      'Vẽ <b>hình chữ nhật, hình vuông</b> trên giấy ô vuông: kẻ theo các đường kẻ của ô, đếm đủ số ô của mỗi cạnh. Hình vuông thì 4 cạnh có số ô bằng nhau.',
      'Vẽ trang trí: ghép các hình đã vẽ (hình tròn, hình vuông, …) rồi tô màu.',
    ],
    demos: [
      { kind: 'g3a-grid', w: 4, h: 3, tries: tries([['Hình chữ nhật 4 × 3 ô', { w: 4, h: 3 }], ['Hình vuông 3 ô', { w: 3, h: 3 }]]) },
      { kind: 'g3a-circle', r: 2, title: 'Vẽ hình tròn bằng com-pa' },
    ],
  },
  21: {
    title: 'Khối lập phương, khối hộp chữ nhật',
    points: [
      'Khối lập phương và khối hộp chữ nhật đều có <b>8 đỉnh, 12 cạnh, 6 mặt</b>.',
      'Các mặt của khối lập phương là <b>hình vuông</b> bằng nhau (như con xúc xắc).',
      'Các mặt của khối hộp chữ nhật là <b>hình chữ nhật</b> (như bao diêm, hộp bánh).',
      'Khi đếm, nhớ cả các đỉnh, cạnh, mặt bị khuất phía sau.',
    ],
    demos: [
      { kind: 'g3a-cube', box: false, tries: tries([['Khối lập phương', { box: false }], ['Khối hộp chữ nhật', { box: true }]]) },
    ],
  },
  22: { title: 'Luyện tập chung', see: [16, 17, 18, 19, 21] },
  // ── Chủ đề 4: Phép nhân, phép chia trong phạm vi 100 ─────────────────────
  23: {
    title: 'Nhân số có hai chữ số với số có một chữ số',
    points: [
      'Đặt tính: viết thừa số có một chữ số dưới hàng đơn vị, viết dấu ×, kẻ gạch ngang.',
      'Nhân <b>từ phải sang trái</b>: nhân với chữ số hàng đơn vị trước, rồi hàng chục.',
      'Tích được 10 trở lên thì viết chữ số hàng đơn vị, <b>nhớ</b> sang hàng chục; nhân hàng chục xong thì <b>thêm</b> số nhớ.',
      'Nhân nhẩm số tròn chục: 20 × 3 là 2 chục × 3 = 6 chục, vậy 20 × 3 = 60.',
    ],
    demos: [
      { kind: 'mul', a: 12, b: 4, tries: tries([['12 × 4', { a: 12, b: 4 }], ['26 × 3', { a: 26, b: 3 }], ['18 × 4', { a: 18, b: 4 }]]) },
    ],
  },
  24: {
    title: 'Gấp một số lên một số lần',
    points: [
      'Muốn <b>gấp một số lên nhiều lần</b>, ta lấy số đó <b>nhân</b> với số lần.',
      'Ví dụ: gấp 5 lên 3 lần được 5 × 3 = 15.',
      'Con 5 tuổi, tuổi bố gấp 7 lần tuổi con: bố 5 × 7 = 35 (tuổi).',
      'Chú ý: "gấp lên 3 lần" là nhân 3, khác với "thêm 3" là cộng 3.',
    ],
    demos: [
      { kind: 'g3a-times', mode: 'up', a: 2, k: 3, tries: tries([['Gấp 2 cm lên 3 lần', { a: 2, k: 3 }], ['Gấp 3 cm lên 4 lần', { a: 3, k: 4 }]]) },
    ],
  },
  25: {
    title: 'Phép chia hết, phép chia có dư',
    points: [
      '8 : 2 = 4, không còn thừa: đó là <b>phép chia hết</b> (số dư là 0).',
      '9 : 2 = 4 (dư 1), còn thừa 1: đó là <b>phép chia có dư</b>.',
      '<b>Số dư luôn bé hơn số chia</b>. Chia cho 2 thì số dư chỉ có thể là 1; chia cho 5 thì số dư có thể là 1, 2, 3, 4.',
      'Đặt tính chia: chia, nhân, trừ như sách; hiệu cuối cùng là số dư.',
    ],
    demos: [
      { kind: 'g3a-share', n: 9, k: 2, thing: 'quả cam', tries: tries([['9 : 2', { n: 9, k: 2 }], ['8 : 2', { n: 8, k: 2 }], ['14 : 4', { n: 14, k: 4 }]]) },
      { kind: 'div', mode: 'full', a: 9, b: 2, tries: tries([['9 : 2', { a: 9, b: 2 }], ['8 : 2', { a: 8, b: 2 }], ['29 : 5', { a: 29, b: 5 }]]) },
    ],
  },
  26: {
    title: 'Chia số có hai chữ số cho số có một chữ số',
    points: [
      'Đặt tính: viết số bị chia bên trái, số chia bên phải, kẻ gạch; thương viết dưới số chia.',
      'Chia <b>từ trái sang phải</b>, mỗi lượt làm: <b>chia</b>, <b>nhân</b>, <b>trừ</b>, rồi <b>hạ</b> chữ số tiếp theo.',
      'Chữ số hàng chục bé hơn số chia thì lấy cả hai chữ số để chia (ví dụ 25 : 3, lấy 25 chia 3).',
      'Hiệu cuối cùng là số dư, số dư phải bé hơn số chia. Không dư thì đó là phép chia hết.',
    ],
    demos: [
      { kind: 'div', mode: 'full', a: 48, b: 2, tries: tries([['48 : 2', { a: 48, b: 2 }], ['72 : 3', { a: 72, b: 3 }], ['65 : 4', { a: 65, b: 4 }]]) },
    ],
  },
  27: {
    title: 'Giảm một số đi một số lần',
    points: [
      'Muốn <b>giảm một số đi nhiều lần</b>, ta lấy số đó <b>chia</b> cho số lần.',
      'Ví dụ: giảm 12 đi 3 lần được 12 : 3 = 4.',
      'Chú ý: "giảm đi 3 lần" là chia 3, khác với "bớt đi 3" là trừ 3.',
      'Gấp lên mấy lần thì nhân; giảm đi mấy lần thì chia.',
    ],
    demos: [
      { kind: 'g3a-times', mode: 'down', a: 6, k: 3, tries: tries([['Giảm 6 cm đi 3 lần', { a: 6, k: 3 }], ['Giảm 8 cm đi 2 lần', { a: 8, k: 2 }]]) },
    ],
  },
  28: {
    title: 'Bài toán giải bằng hai bước tính',
    points: [
      'Đọc kĩ đề: cái gì <b>đã biết</b>, cái gì <b>phải tìm</b>. Vẽ sơ đồ đoạn thẳng cho dễ thấy.',
      '<b>Bước 1</b>: tìm số chưa biết mà câu hỏi cần đến (ví dụ số cá ở bể thứ hai).',
      '<b>Bước 2</b>: dùng kết quả bước 1 để trả lời câu hỏi (ví dụ cả hai bể có bao nhiêu con cá).',
      'Mỗi bước viết một câu lời giải và một phép tính, cuối cùng viết đáp số.',
    ],
    demos: [
      { kind: 'g3a-twostep', a: 4, rel: '+', d: 3, want: 'total', names: ['Bể thứ nhất', 'Bể thứ hai'], unit: 'con cá',
        tries: tries([
          ['Nhiều hơn, cả hai', { a: 4, rel: '+', d: 3, want: 'total', names: ['Bể thứ nhất', 'Bể thứ hai'], unit: 'con cá' }],
          ['Gấp lần, cả hai', { a: 3, rel: '×', d: 4, want: 'total', names: ['Trong chuồng', 'Ngoài sân'], unit: 'con thỏ' }],
          ['Gấp lần, hơn bao nhiêu', { a: 3, rel: '×', d: 4, want: 'diff', names: ['Trong chuồng', 'Ngoài sân'], unit: 'con thỏ' }],
        ]) },
    ],
  },
  29: { title: 'Luyện tập chung', see: [23, 24, 25, 26, 27] },
  // ── Chủ đề 5: Một số đơn vị đo độ dài, khối lượng, dung tích, nhiệt độ ────
  30: {
    title: 'Mi-li-mét',
    points: [
      '<b>Mi-li-mét</b> là một đơn vị đo độ dài, viết tắt là <b>mm</b>.',
      '<b>1 cm = 10 mm</b>; <b>1 m = 1000 mm</b>.',
      'Trên thước, từ vạch 0 đến vạch 1 cm có 10 khoảng nhỏ, mỗi khoảng là 1 mm.',
      'So sánh hai độ dài khác đơn vị: đổi về cùng một đơn vị rồi so sánh. Ví dụ 3 cm = 30 mm, mà 30 mm &gt; 20 mm.',
    ],
    demos: [
      { kind: 'g3a-ruler', mm: 35, thing: 'chiếc bút chì', tries: tries([['35 mm', { mm: 35 }], ['52 mm', { mm: 52 }], ['20 mm', { mm: 20 }]]) },
    ],
  },
  31: {
    title: 'Gam',
    points: [
      '<b>Gam</b> là một đơn vị đo khối lượng, viết tắt là <b>g</b>.',
      '<b>1 kg = 1000 g</b>.',
      'Cân đĩa thăng bằng thì vật ở đĩa bên này nặng bằng các quả cân ở đĩa bên kia.',
      'Cộng, trừ, nhân, chia số đo khối lượng như với số, rồi viết đơn vị g. Ví dụ 1 kg − 350 g = 1000 g − 350 g = 650 g.',
    ],
    demos: [
      { kind: 'g3a-scale', weights: [500, 200], thing: 'gói đường', tries: tries([['500 g + 200 g', { weights: [500, 200] }], ['200 g + 100 g + 50 g', { weights: [200, 100, 50], thing: 'quả táo' }]]) },
    ],
  },
  32: {
    title: 'Mi-li-lít',
    points: [
      '<b>Mi-li-lít</b> là một đơn vị đo dung tích, viết tắt là <b>ml</b>.',
      '<b>1 l = 1000 ml</b>.',
      'Đọc số trên ca có vạch chia: nhìn mặt nước ngang vạch nào.',
      'Ví dụ: bình có 1 l nước, rót ra 500 ml và 300 ml thì còn 1000 ml − 500 ml − 300 ml = 200 ml.',
    ],
    demos: [
      { kind: 'g3a-jug', v: 400, tries: tries([['400 ml', { v: 400 }], ['700 ml', { v: 700 }], ['300 ml', { v: 300 }]]) },
    ],
  },
  33: {
    title: 'Nhiệt độ. Đơn vị đo nhiệt độ',
    points: [
      '<b>Độ C</b> là một đơn vị đo nhiệt độ, viết là <b>°C</b>. 30 °C đọc là ba mươi độ C.',
      'Dùng <b>nhiệt kế</b> để đo nhiệt độ: đọc số ở vạch ngang đầu cột màu đỏ.',
      'Nhiệt độ cơ thể người khoẻ mạnh khoảng <b>37 °C</b>; cao hơn thì có thể bị sốt.',
      'Số °C càng lớn thì càng nóng; số °C càng bé thì càng lạnh.',
    ],
    demos: [
      { kind: 'g3a-thermo', t: 30, tries: tries([['30 °C', { t: 30 }], ['37 °C', { t: 37 }], ['18 °C', { t: 18 }]]) },
    ],
  },
  34: { title: 'Thực hành và trải nghiệm với các đơn vị mi-li-mét, gam, mi-li-lít, độ C', see: [30, 31, 32, 33] },
  35: { title: 'Luyện tập chung', see: [30, 31, 32, 33] },
  // ── Chủ đề 6: Phép nhân, phép chia trong phạm vi 1 000 ───────────────────
  36: {
    title: 'Nhân số có ba chữ số với số có một chữ số',
    points: [
      'Đặt tính: viết thừa số có một chữ số dưới hàng đơn vị, viết dấu ×, kẻ gạch ngang.',
      'Nhân <b>từ phải sang trái</b>: hàng đơn vị, hàng chục, rồi hàng trăm.',
      'Mỗi lần tích được 10 trở lên thì viết chữ số hàng đơn vị, <b>nhớ</b> sang hàng bên trái; nhân hàng tiếp theo xong thì <b>thêm</b> số nhớ.',
      'Nhân nhẩm số tròn trăm: 200 × 3 là 2 trăm × 3 = 6 trăm, vậy 200 × 3 = 600.',
    ],
    demos: [
      { kind: 'mul', a: 213, b: 3, tries: tries([['213 × 3', { a: 213, b: 3 }], ['125 × 4', { a: 125, b: 4 }], ['250 × 3', { a: 250, b: 3 }]]) },
    ],
  },
  37: {
    title: 'Chia số có ba chữ số cho số có một chữ số',
    points: [
      'Chia <b>từ trái sang phải</b>, mỗi lượt: <b>chia</b>, <b>nhân</b>, <b>trừ</b>, rồi <b>hạ</b> chữ số tiếp theo.',
      'Chữ số hàng trăm bé hơn số chia thì lấy hai chữ số đầu để chia; thương chỉ có hai chữ số (ví dụ 236 : 4 = 59).',
      'Lượt nào số đem chia bé hơn số chia thì viết <b>0</b> vào thương rồi hạ tiếp (ví dụ 816 : 4 = 204).',
      'Chia nhẩm số tròn trăm: 600 : 3 là 6 trăm : 3 = 2 trăm, vậy 600 : 3 = 200.',
    ],
    demos: [
      { kind: 'div', mode: 'full', a: 639, b: 3, tries: tries([['639 : 3', { a: 639, b: 3 }], ['236 : 4', { a: 236, b: 4 }], ['816 : 4', { a: 816, b: 4 }], ['457 : 2', { a: 457, b: 2 }]]) },
    ],
  },
  38: {
    title: 'Biểu thức số. Tính giá trị của biểu thức số',
    points: [
      '<b>Biểu thức</b> gồm các số nối với nhau bởi dấu phép tính, ví dụ 60 + 35 − 20; 12 × (7 − 4).',
      'Chỉ có phép cộng, trừ (hoặc chỉ có nhân, chia): tính <b>từ trái sang phải</b>.',
      'Có cả cộng, trừ và nhân, chia: tính <b>nhân, chia trước</b>; cộng, trừ sau.',
      'Có dấu ngoặc ( ): tính <b>trong ngoặc trước</b>.',
      'Viết từng bước: 60 + 35 : 5 = 60 + 7 = 67. Kết quả cuối cùng là giá trị của biểu thức.',
    ],
    demos: [
      { kind: 'expr', rows: [{ expr: '60 + 35 − 20' }], intro: 'Tính giá trị của biểu thức, viết từng bước như sách.',
        tries: [['60 + 35 − 20', 75], ['60 + 35 : 5', 67], ['12 × (7 − 4)', 36], ['(80 + 40) : 4', 30]].map(([e, v]) => ({
          label: e, rows: [{ expr: e }], outro: `Giá trị của biểu thức ${e} là <b>${v}</b>.`, result: `${e} = ${v}` })) },
    ],
  },
  39: {
    title: 'So sánh số lớn gấp mấy lần số bé',
    points: [
      'Muốn tìm <b>số lớn gấp mấy lần số bé</b>, ta lấy số lớn <b>chia</b> cho số bé.',
      'Ví dụ: 6 cm gấp 2 cm số lần là 6 : 2 = 3 (lần).',
      'Lớp cờ vua có 27 bạn, lớp đá cầu có 9 bạn: số bạn học cờ vua gấp 27 : 9 = 3 (lần) số bạn học đá cầu.',
      'Hai số đo phải <b>cùng đơn vị</b> rồi mới chia.',
    ],
    demos: [
      { kind: 'g3a-times', mode: 'ratio', a: 6, b: 2, tries: tries([['6 cm và 2 cm', { a: 6, b: 2 }], ['8 cm và 2 cm', { a: 8, b: 2 }], ['6 cm và 3 cm', { a: 6, b: 3 }]]) },
    ],
  },
  40: { title: 'Luyện tập chung', see: [37, 38, 39, 28] },
  // ── Chủ đề 7: Ôn tập học kì 1 ────────────────────────────────────────────
  41: { title: 'Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000', see: [36, 37, 25, 28] },
  42: { title: 'Ôn tập biểu thức số', see: [38] },
  43: {
    title: 'Ôn tập hình học và đo lường',
    points: [
      'Độ dài: <b>1 cm = 10 mm</b>, <b>1 dm = 10 cm</b>, <b>1 m = 100 cm = 1000 mm</b>.',
      'Khối lượng: <b>1 kg = 1000 g</b>. Dung tích: <b>1 l = 1000 ml</b>. Nhiệt độ đo bằng <b>độ C</b> (°C).',
      'Tính với số đo: đổi về <b>cùng một đơn vị</b> rồi mới cộng, trừ, so sánh. Ví dụ 5 gói mì 75 g và 1 hộp 500 g: 75 × 5 + 500 = 875 (g).',
      'Hình: hình chữ nhật, hình vuông có 4 góc vuông; trung điểm chia đoạn thẳng thành hai phần bằng nhau; đường kính gấp 2 lần bán kính; khối lập phương, khối hộp chữ nhật có 8 đỉnh, 12 cạnh, 6 mặt.',
    ],
    demos: [
      { kind: 'g3a-scale', weights: [500, 200, 100], thing: 'hộp ngũ cốc', title: 'Đọc cân nặng bằng gam' },
    ],
  },
  44: { title: 'Ôn tập chung', see: [36, 37, 38, 28] },
};
