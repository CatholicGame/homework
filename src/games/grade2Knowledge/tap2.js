/** Kiến thức từng bài Toán 2 Tập Hai (SGK Kết nối tri thức). Định dạng mục: lessonHelp.js. Ví dụ từng bước: demos-tap2.js. */
import './demos-tap2.js';

const P = 'SGK Toán 2 Tập Hai';

export const KNOWLEDGE2_TAP2 = {
  37: {
    title: 'Phép nhân', page: P,
    points: [
      'Khi cộng các <b>số hạng bằng nhau</b>, ta viết thành <b>phép nhân</b>: 2 + 2 + 2 = 6 viết là <b>2 × 3 = 6</b>.',
      '2 × 3 = 6 đọc là: <b>hai nhân ba bằng sáu</b>. Dấu <b>×</b> là dấu nhân.',
      'Trong 2 × 3: <b>2</b> là số đồ vật của mỗi nhóm, <b>3</b> là số nhóm (2 được lấy 3 lần).',
      'Tính 3 × 4: viết thành tổng 3 + 3 + 3 + 3 = 12. Vậy 3 × 4 = 12.',
    ],
    demos: [{
      kind: 'g2b-groups', mode: 'mul', per: 2, n: 3, item: 'cam',
      tries: [{ label: '2 × 3' }, { label: '5 × 2', per: 5, n: 2, item: 'sao' }, { label: '3 × 4', per: 3, n: 4, item: 'tao' }],
    }],
  },
  38: {
    title: 'Thừa số, tích', page: P,
    points: [
      'Trong phép nhân <b>2 × 5 = 10</b>: 2 và 5 là <b>thừa số</b>, 10 là <b>tích</b>.',
      '2 × 5 cũng gọi là <b>tích</b>.',
      'Muốn tìm tích, viết thành tổng các số hạng bằng nhau: 6 × 3 = 6 + 6 + 6 = 18.',
      'Mỗi xe đạp có 2 bánh xe. 4 xe đạp có 2 × 4 = 8 bánh xe.',
    ],
    demos: [{
      kind: 'g2b-groups', mode: 'mul', per: 2, n: 5, item: 'banh', names: true,
      tries: [{ label: '2 × 5' }, { label: '4 × 3', per: 4, n: 3, item: 'hoa' }],
    }],
  },
  39: {
    title: 'Bảng nhân 2', page: P,
    points: [
      '<b>Bảng nhân 2</b>: 2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6, …, 2 × 10 = 20.',
      'Các kết quả là <b>đếm thêm 2</b>: 2, 4, 6, 8, 10, 12, 14, 16, 18, 20.',
      'Quên kết quả thì lấy kết quả dòng trước <b>cộng thêm 2</b>: 2 × 6 = 12 nên 2 × 7 = 12 + 2 = 14.',
    ],
    demos: [{ kind: 'g2b-table', n: 2, op: 'mul', ask: 4, tries: [{ label: '2 × 4' }, { label: '2 × 7', ask: 7 }, { label: '2 × 9', ask: 9 }] }],
  },
  40: {
    title: 'Bảng nhân 5', page: P,
    points: [
      '<b>Bảng nhân 5</b>: 5 × 1 = 5, 5 × 2 = 10, 5 × 3 = 15, …, 5 × 10 = 50.',
      'Các kết quả là <b>đếm thêm 5</b>: 5, 10, 15, 20, 25, 30, 35, 40, 45, 50.',
      'Kết quả của bảng nhân 5 có chữ số tận cùng là <b>0</b> hoặc <b>5</b>.',
    ],
    demos: [{ kind: 'g2b-table', n: 5, op: 'mul', ask: 4, tries: [{ label: '5 × 4' }, { label: '5 × 6', ask: 6 }, { label: '5 × 8', ask: 8 }] }],
  },
  41: {
    title: 'Phép chia', page: P,
    points: [
      'Chia đều 6 quả cam vào 3 đĩa, mỗi đĩa được 2 quả: <b>6 : 3 = 2</b>. Dấu <b>:</b> là dấu chia.',
      '6 : 3 = 2 đọc là: <b>sáu chia ba bằng hai</b>.',
      'Có 6 quả cam, xếp mỗi đĩa 2 quả, được 3 đĩa: <b>6 : 2 = 3</b>.',
      'Từ một phép nhân lập được hai phép chia: 2 × 3 = 6 → <b>6 : 2 = 3</b> và <b>6 : 3 = 2</b>.',
    ],
    demos: [
      { kind: 'g2b-groups', mode: 'share', total: 6, k: 3, item: 'cam', tries: [{ label: '6 : 3' }, { label: '8 : 2', total: 8, k: 2, item: 'tao' }] },
      { kind: 'g2b-groups', mode: 'group', total: 6, m: 2, item: 'cam', tries: [{ label: '6 : 2' }, { label: '10 : 5', total: 10, m: 5, item: 'sao' }] },
    ],
  },
  42: {
    title: 'Số bị chia, số chia, thương', page: P,
    points: [
      'Trong phép chia <b>10 : 2 = 5</b>: 10 là <b>số bị chia</b>, 2 là <b>số chia</b>, 5 là <b>thương</b>.',
      '10 : 2 cũng gọi là <b>thương</b>.',
      'Muốn tìm thương, nhớ lại phép nhân: 2 × 5 = 10 nên 10 : 2 = 5.',
      'Chia 8 bạn thành các cặp, mỗi cặp 2 bạn: 8 : 2 = 4 (cặp).',
    ],
    demos: [{
      kind: 'g2b-groups', mode: 'share', total: 10, k: 2, item: 'banh', names: true,
      tries: [{ label: '10 : 2' }, { label: '12 : 3', total: 12, k: 3, item: 'cam' }],
    }],
  },
  43: {
    title: 'Bảng chia 2', page: P,
    points: [
      '<b>Bảng chia 2</b>: 2 : 2 = 1, 4 : 2 = 2, 6 : 2 = 3, …, 20 : 2 = 10.',
      'Bảng chia 2 suy ra từ <b>bảng nhân 2</b>: 2 × 7 = 14 nên 14 : 2 = 7.',
      'Có 12 chiếc tất, mỗi đôi 2 chiếc: 12 : 2 = 6 (đôi).',
    ],
    demos: [
      { kind: 'g2b-table', n: 2, op: 'div', ask: 4, tries: [{ label: '8 : 2' }, { label: '14 : 2', ask: 7 }, { label: '18 : 2', ask: 9 }] },
      { kind: 'g2b-groups', mode: 'group', total: 12, m: 2, item: 'tat' },
    ],
  },
  44: {
    title: 'Bảng chia 5', page: P,
    points: [
      '<b>Bảng chia 5</b>: 5 : 5 = 1, 10 : 5 = 2, 15 : 5 = 3, …, 50 : 5 = 10.',
      'Bảng chia 5 suy ra từ <b>bảng nhân 5</b>: 5 × 6 = 30 nên 30 : 5 = 6.',
      'Chia đều 15 bạn vào 5 nhóm: 15 : 5 = 3 (bạn).',
    ],
    demos: [
      { kind: 'g2b-table', n: 5, op: 'div', ask: 4, tries: [{ label: '20 : 5' }, { label: '30 : 5', ask: 6 }, { label: '45 : 5', ask: 9 }] },
      { kind: 'g2b-groups', mode: 'share', total: 15, k: 5, item: 'ban' },
    ],
  },
  45: {
    title: 'Luyện tập chung', page: P,
    points: [
      'Nhân: nhớ <b>bảng nhân 2</b> (đếm thêm 2) và <b>bảng nhân 5</b> (đếm thêm 5).',
      'Chia: nhớ phép nhân tương ứng: 5 × 7 = 35 nên <b>35 : 5 = 7</b> và 35 : 7 = 5.',
      'Dãy tính có nhân, chia: tính lần lượt <b>từ trái sang phải</b>: 10 : 5 × 7 = 2 × 7 = 14.',
      'Bài toán "mỗi hộp 5 cái, 6 hộp có bao nhiêu cái?": dùng phép nhân 5 × 6. "25 cái, mỗi hộp 5 cái, được mấy hộp?": dùng phép chia 25 : 5.',
    ],
    demos: [
      { kind: 'g2b-table', n: 5, op: 'mul', ask: 6, tries: [{ label: '5 × 6' }, { label: '2 × 8', n: 2, ask: 8 }] },
      { kind: 'g2b-table', n: 2, op: 'div', ask: 7, tries: [{ label: '14 : 2' }, { label: '40 : 5', n: 5, ask: 8 }] },
    ],
  },
  46: {
    title: 'Khối trụ, khối cầu', page: P,
    points: [
      '<b>Khối trụ</b> có hai mặt đáy là hình tròn, thân tròn đều. Ví dụ: lon nước, cái trống, cây nến.',
      '<b>Khối cầu</b> tròn đều về mọi phía. Ví dụ: quả bóng, viên bi, quả địa cầu.',
      'Khối cầu lăn được về mọi phía. Khối trụ đặt đứng được và lăn được khi đặt nằm.',
    ],
    demos: [{ kind: 'g2b-solids' }],
  },
  47: { title: 'Luyện tập chung', see: [46] },
  48: {
    title: 'Đơn vị, chục, trăm, nghìn', page: P,
    points: [
      '<b>10 đơn vị = 1 chục</b>. <b>10 chục = 1 trăm</b>. <b>10 trăm = 1 nghìn</b>.',
      '1 chục viết là 10, 1 trăm viết là <b>100</b>, 1 nghìn viết là <b>1 000</b>.',
      '2 chục là 20; 3 trăm là 300. Mỗi túi 100 đồng xu, 4 túi có 400 đồng xu.',
    ],
    demos: [
      { kind: 'g2b-blocks', mode: 'units' },
      { kind: 'g2b-blocks', n: 320, mode: 'read', tries: [{ label: '320' }, { label: '500', n: 500 }, { label: '140', n: 140 }] },
    ],
  },
  49: {
    title: 'Các số tròn trăm, tròn chục', page: P,
    points: [
      'Các số <b>tròn trăm</b>: 100, 200, 300, …, 900. Số tròn trăm có chữ số hàng chục và hàng đơn vị đều là <b>0</b>.',
      'Các số <b>tròn chục</b>: 10, 20, …, 110, 120, … Số tròn chục có chữ số hàng đơn vị là <b>0</b>.',
      'Trên tia số các số tròn trăm, mỗi vạch thêm 100; trên tia số các số tròn chục, mỗi vạch thêm 10.',
    ],
    demos: [
      { kind: 'g2b-round', step: 100, tries: [{ label: 'Tròn trăm' }, { label: 'Ô khác', missing: [400, 900] }] },
      { kind: 'g2b-round', step: 10, lo: 100, tries: [{ label: '100 đến 200' }, { label: '500 đến 600', lo: 500, missing: [520, 570] }] },
    ],
  },
  50: {
    title: 'So sánh các số tròn trăm, tròn chục', page: P,
    points: [
      'So sánh hai số tròn trăm: so chữ số hàng trăm. <b>300 &lt; 500</b> vì 3 &lt; 5.',
      'Hai số tròn chục có hàng trăm bằng nhau thì so hàng chục: <b>370 &gt; 340</b> vì 7 &gt; 4.',
      'Trên tia số, số ở bên phải lớn hơn số ở bên trái.',
    ],
    demos: [
      { kind: 'compare', a: 300, b: 500, tries: [{ label: '300 và 500' }, { label: '370 và 340', a: 370, b: 340 }, { label: '640 và 460', a: 640, b: 460 }] },
      { kind: 'order', nums: [450, 540, 350, 530], tries: [{ label: 'bé đến lớn' }, { label: 'lớn đến bé', desc: true }] },
    ],
  },
  51: {
    title: 'Số có ba chữ số', page: P,
    points: [
      'Số có ba chữ số gồm <b>trăm, chục, đơn vị</b>. Số 243 gồm 2 trăm, 4 chục, 3 đơn vị.',
      '<b>Viết số</b>: viết lần lượt chữ số hàng trăm, hàng chục, hàng đơn vị: 243.',
      '<b>Đọc số</b>: 243 đọc là hai trăm bốn mươi ba; 205 đọc là hai trăm <b>linh</b> năm; 215 đọc là hai trăm mười <b>lăm</b>.',
      'Chú ý cách đọc: 241 hai trăm bốn mươi <b>mốt</b>; 244 hai trăm bốn mươi <b>tư</b>; 245 hai trăm bốn mươi <b>lăm</b>.',
    ],
    demos: [{ kind: 'g2b-blocks', n: 243, mode: 'read', tries: [{ label: '243' }, { label: '205', n: 205 }, { label: '315', n: 315 }] }],
  },
  52: {
    title: 'Viết số thành tổng các trăm, chục, đơn vị', page: P,
    points: [
      '<b>375 = 300 + 70 + 5</b> (3 trăm, 7 chục, 5 đơn vị).',
      'Hàng nào là 0 thì không viết vào tổng: <b>408 = 400 + 8</b>; 230 = 200 + 30.',
      'Ngược lại, từ tổng tìm số: 500 + 10 + 2 = 512.',
    ],
    demos: [{ kind: 'g2b-blocks', n: 375, mode: 'sum', tries: [{ label: '375' }, { label: '408', n: 408 }, { label: '230', n: 230 }] }],
  },
  53: {
    title: 'So sánh các số có ba chữ số', page: P,
    points: [
      'So sánh từ <b>hàng trăm</b>: số nào có chữ số hàng trăm lớn hơn thì lớn hơn.',
      'Hàng trăm bằng nhau thì so <b>hàng chục</b>; hàng chục cũng bằng nhau thì so <b>hàng đơn vị</b>.',
      'Mọi chữ số cùng hàng đều bằng nhau thì hai số bằng nhau.',
      'Số có ba chữ số luôn lớn hơn số có hai chữ số: 105 &gt; 98.',
    ],
    demos: [
      { kind: 'compare', a: 428, b: 437, tries: [{ label: '428 và 437' }, { label: '765 và 756', a: 765, b: 756 }, { label: '105 và 98', a: 105, b: 98 }] },
      { kind: 'order', nums: [629, 362, 372, 257], tries: [{ label: 'bé đến lớn' }, { label: 'lớn đến bé', desc: true }] },
    ],
  },
  54: { title: 'Luyện tập chung', see: [51, 52, 53] },
  55: {
    title: 'Đề-xi-mét. Mét. Ki-lô-mét', page: P,
    points: [
      '<b>Đề-xi-mét</b> viết tắt là <b>dm</b>. <b>1 dm = 10 cm</b>; 10 cm = 1 dm.',
      '<b>Mét</b> viết tắt là <b>m</b>. <b>1 m = 10 dm</b>; <b>1 m = 100 cm</b>.',
      '<b>Ki-lô-mét</b> viết tắt là <b>km</b>. <b>1 km = 1 000 m</b>.',
      'Đo vật nhỏ (bút chì, gang tay) dùng cm, dm. Đo bảng lớp, sân trường dùng m. Đo quãng đường giữa hai nơi dùng km.',
    ],
    demos: [{ kind: 'g2b-ruler', mode: 'dm' }, { kind: 'g2b-ruler', mode: 'm' }],
  },
  56: {
    title: 'Giới thiệu tiền Việt Nam', page: P,
    points: [
      'Đơn vị tiền Việt Nam là <b>đồng</b>.',
      'Một số tờ tiền: <b>100 đồng, 200 đồng, 500 đồng, 1 000 đồng</b>.',
      'Muốn biết có bao nhiêu tiền, <b>cộng</b> giá trị các tờ tiền: 200 + 200 + 100 = 500 (đồng).',
      'Đổi tiền: 1 tờ 500 đồng bằng 5 tờ 100 đồng; 1 tờ 1 000 đồng bằng 2 tờ 500 đồng.',
    ],
    demos: [{ kind: 'g2b-money', notes: [200, 200, 100], tries: [{ label: '200 + 200 + 100' }, { label: '500 + 200 + 100', notes: [500, 200, 100] }, { label: '500 + 500', notes: [500, 500] }] }],
  },
  58: { title: 'Luyện tập chung', see: [55, 56] },
  59: {
    title: 'Phép cộng (không nhớ) trong phạm vi 1 000', page: P,
    points: [
      '<b>Đặt tính</b>: viết các chữ số cùng hàng thẳng cột: trăm dưới trăm, chục dưới chục, đơn vị dưới đơn vị.',
      '<b>Tính</b> từ phải sang trái: cộng đơn vị, rồi cộng chục, rồi cộng trăm.',
      '234 + 152: 4 cộng 2 bằng 6, viết 6; 3 cộng 5 bằng 8, viết 8; 2 cộng 1 bằng 3, viết 3. Vậy 234 + 152 = 386.',
      'Cộng nhẩm số tròn trăm: 300 + 400 = 700 (3 trăm + 4 trăm = 7 trăm).',
    ],
    demos: [{ kind: 'add', a: 234, b: 152, tries: [{ label: '234 + 152' }, { label: '425 + 63', a: 425, b: 63 }, { label: '503 + 241', a: 503, b: 241 }] }],
  },
  60: {
    title: 'Phép cộng (có nhớ) trong phạm vi 1 000', page: P,
    points: [
      'Đặt tính thẳng cột, cộng từ phải sang trái như phép cộng không nhớ.',
      'Hàng nào cộng được <b>10 trở lên</b> thì viết chữ số hàng đơn vị của kết quả, <b>nhớ 1</b> sang hàng bên trái.',
      '358 + 126: 8 cộng 6 bằng 14, viết 4 nhớ 1; 5 cộng 2 bằng 7, thêm 1 bằng 8, viết 8; 3 cộng 1 bằng 4, viết 4. Vậy 358 + 126 = 484.',
    ],
    demos: [{ kind: 'add', a: 358, b: 126, tries: [{ label: '358 + 126' }, { label: '264 + 172', a: 264, b: 172 }, { label: '247 + 38', a: 247, b: 38 }] }],
  },
  61: {
    title: 'Phép trừ (không nhớ) trong phạm vi 1 000', page: P,
    points: [
      'Đặt tính thẳng cột, <b>trừ từ phải sang trái</b>: đơn vị, chục, trăm.',
      '586 − 243: 6 trừ 3 bằng 3, viết 3; 8 trừ 4 bằng 4, viết 4; 5 trừ 2 bằng 3, viết 3. Vậy 586 − 243 = 343.',
      'Trừ nhẩm số tròn trăm: 800 − 300 = 500 (8 trăm − 3 trăm = 5 trăm).',
    ],
    demos: [{ kind: 'sub', a: 586, b: 243, tries: [{ label: '586 − 243' }, { label: '478 − 56', a: 478, b: 56 }, { label: '750 − 320', a: 750, b: 320 }] }],
  },
  62: {
    title: 'Phép trừ (có nhớ) trong phạm vi 1 000', page: P,
    points: [
      'Hàng nào <b>không trừ được</b> thì lấy chữ số đó cộng thêm 10 rồi trừ, sau đó <b>nhớ 1</b> sang số trừ ở hàng bên trái.',
      '462 − 237: 2 không trừ được 7, lấy 12 trừ 7 bằng 5, viết 5 nhớ 1; 3 thêm 1 bằng 4, 6 trừ 4 bằng 2, viết 2; 4 trừ 2 bằng 2, viết 2. Vậy 462 − 237 = 225.',
      'Thử lại: lấy hiệu cộng số trừ, được số bị trừ: 225 + 237 = 462.',
    ],
    demos: [{ kind: 'sub', a: 462, b: 237, tries: [{ label: '462 − 237' }, { label: '534 − 162', a: 534, b: 162 }, { label: '640 − 218', a: 640, b: 218 }] }],
  },
  63: { title: 'Luyện tập chung', see: [60, 62] },
  64: {
    title: 'Thu thập, phân loại, kiểm đếm số liệu', page: P,
    points: [
      '<b>Phân loại</b>: xếp các đồ vật cùng loại vào một nhóm.',
      '<b>Kiểm đếm</b>: mỗi đồ vật đếm được thì vạch <b>một vạch</b>. Vạch thứ năm gạch chéo qua bốn vạch trước, thành một nhóm 5.',
      'Đếm các vạch rồi viết số. Số nào lớn nhất thì loại đó nhiều nhất.',
    ],
    demos: [{ kind: 'g2b-tally' }],
  },
  65: {
    title: 'Biểu đồ tranh', page: P,
    points: [
      '<b>Biểu đồ tranh</b> dùng hình vẽ để cho biết số lượng. Đọc dòng ghi chú: mỗi hình chỉ 1 đồ vật.',
      'Đọc theo từng hàng: đếm số hình của hàng đó.',
      'Hàng nhiều hình nhất là loại <b>nhiều nhất</b>, hàng ít hình nhất là loại <b>ít nhất</b>.',
    ],
    demos: [{ kind: 'g2b-picto', tries: [{ label: 'Hái quả' }, { label: 'Đồ chơi', what: 'Số đồ chơi của Việt', rows: [['bong', 'Bóng', 5], ['ca', 'Cá', 3], ['sao', 'Sao', 4]] }] }],
  },
  66: {
    title: 'Chắc chắn, có thể, không thể', page: P,
    points: [
      '<b>Chắc chắn</b>: việc đó luôn xảy ra. Hộp toàn bóng xanh thì chắc chắn lấy được bóng xanh.',
      '<b>Có thể</b>: việc đó lúc xảy ra, lúc không. Hộp có bóng xanh và bóng đỏ thì có thể lấy được bóng đỏ.',
      '<b>Không thể</b>: việc đó không bao giờ xảy ra. Hộp không có bóng vàng thì không thể lấy được bóng vàng.',
    ],
    demos: [{
      kind: 'g2b-chance', box: ['xanh', 'xanh', 'xanh', 'đỏ'],
      tries: [{ label: '3 xanh, 1 đỏ' }, { label: '4 xanh', box: ['xanh', 'xanh', 'xanh', 'xanh'], ask: ['xanh', 'đỏ'] }, { label: '2 đỏ, 2 vàng', box: ['đỏ', 'vàng', 'đỏ', 'vàng'], ask: ['vàng', 'xanh'] }],
    }],
  },
  67: { title: 'Thực hành và trải nghiệm thu thập, phân loại, kiểm đếm số liệu', see: [64, 65] },
  68: { title: 'Ôn tập các số trong phạm vi 1 000', see: [51, 52, 53] },
  69: {
    title: 'Ôn tập phép cộng, phép trừ trong phạm vi 100', page: P,
    points: [
      'Đặt tính thẳng cột: chục dưới chục, đơn vị dưới đơn vị. Tính từ hàng đơn vị.',
      '<b>Cộng có nhớ</b> 37 + 25: 7 cộng 5 bằng 12, viết 2 nhớ 1; 3 cộng 2 bằng 5, thêm 1 bằng 6, viết 6. Vậy 37 + 25 = 62.',
      '<b>Trừ có nhớ</b> 62 − 28: 2 không trừ được 8, lấy 12 trừ 8 bằng 4, viết 4 nhớ 1; 2 thêm 1 bằng 3, 6 trừ 3 bằng 3, viết 3. Vậy 62 − 28 = 34.',
      'Cộng, trừ nhẩm: 9 + 5 = 14; 14 − 6 = 8; 40 + 30 = 70; 90 − 50 = 40.',
    ],
    demos: [
      { kind: 'add', a: 37, b: 25, tries: [{ label: '37 + 25' }, { label: '48 + 36', a: 48, b: 36 }, { label: '65 + 8', a: 65, b: 8 }] },
      { kind: 'sub', a: 62, b: 28, tries: [{ label: '62 − 28' }, { label: '80 − 47', a: 80, b: 47 }, { label: '53 − 9', a: 53, b: 9 }] },
    ],
  },
  70: { title: 'Ôn tập phép cộng, phép trừ trong phạm vi 1 000', see: [60, 62] },
  71: { title: 'Ôn tập phép nhân, phép chia', see: [38, 42, 45] },
  72: {
    title: 'Ôn tập hình học', page: P,
    points: [
      '<b>Ba điểm thẳng hàng</b> là ba điểm cùng nằm trên một đường thẳng.',
      'Độ dài <b>đường gấp khúc</b> bằng tổng độ dài các đoạn thẳng của nó: đường gấp khúc ABCD dài AB + BC + CD.',
      'Hình tam giác có 3 cạnh, hình tứ giác có 4 cạnh.',
      '<b>Khối trụ</b>: lon nước, cái trống. <b>Khối cầu</b>: quả bóng, viên bi. Khối hộp chữ nhật, khối lập phương: hộp quà, xúc xắc.',
    ],
    demos: [{ kind: 'g2b-solids' }],
  },
  73: {
    title: 'Ôn tập đo lường', page: P,
    points: [
      'Đo độ dài: <b>1 dm = 10 cm</b>; <b>1 m = 10 dm = 100 cm</b>; <b>1 km = 1 000 m</b>.',
      'Cân nặng đo bằng <b>ki-lô-gam (kg)</b>; dung tích đo bằng <b>lít (l)</b>. Cộng, trừ số đo như cộng, trừ số, rồi viết đơn vị: 250 kg + 92 kg = 342 kg.',
      'Xem đồng hồ: 13 giờ là 1 giờ chiều, 19 giờ là 7 giờ tối; 7 giờ 15 phút kim phút chỉ số 3.',
      'Tiền Việt Nam: 100 đồng, 200 đồng, 500 đồng, 1 000 đồng.',
    ],
    demos: [{ kind: 'g2b-ruler', mode: 'm' }],
  },
  74: { title: 'Ôn tập kiểm đếm số liệu và lựa chọn khả năng', see: [64, 65, 66] },
  75: { title: 'Ôn tập chung', see: [52, 53, 60, 62] },
};
