/**
 * Kiến thức từng bài Toán 1 (SGK Kết nối tri thức) cho nút 📘 trên Vở BT Toán 1 (grade1Workbook.js).
 * Định dạng mục: lessonHelp.js. Ví dụ xem từng bước: demos của knowledgeDemo.js và loại riêng ở ./demos.js.
 * Bé lớp 1 mới tập đọc: câu rất ngắn, hình là chính.
 */
import './demos.js';


export const KNOWLEDGE1 = {
  1: {
    title: 'Em học toán',
    points: [
      'Em học <b>đếm</b>, <b>đọc số</b>, <b>viết số</b>.',
      'Em học <b>so sánh</b>, làm tính <b>cộng</b>, <b>trừ</b>.',
      'Em biết <b>hình vuông</b>, <b>hình tròn</b>, <b>hình tam giác</b>.',
    ],
  },
  2: {
    title: 'Nhiều hơn, ít hơn',
    points: [
      'Nối <b>mỗi cái</b> với <b>một cái</b>.',
      'Bên nào <b>còn thừa</b> thì bên đó <b>nhiều hơn</b>.',
      'Bên kia <b>ít hơn</b>.',
    ],
    demos: [
      { kind: 'g1-pair', top: 'cup', bottom: 'spoon', a: 4, b: 3,
        tries: [{ label: 'Cốc và thìa', top: 'cup', bottom: 'spoon', a: 4, b: 3 }, { label: 'Thỏ và cà rốt', top: 'rabbit', bottom: 'carrot', a: 3, b: 5 }] },
    ],
  },
  3: {
    title: 'Hình vuông, hình tròn',
    points: [
      '<b>Hình vuông</b> có 4 cạnh bằng nhau.',
      '<b>Hình tròn</b> tròn như mặt đồng hồ.',
      'Xếp 4 que tính được hình vuông.',
    ],
    demos: [{ kind: 'g1-shape', focus: ['square', 'circle'], ask: 'circle' }],
  },
  4: {
    title: 'Hình tam giác',
    points: [
      '<b>Hình tam giác</b> có 3 cạnh, 3 góc nhọn.',
      'Xếp 3 que tính được hình tam giác.',
    ],
    demos: [{ kind: 'g1-shape', focus: ['triangle'], ask: 'triangle' }],
  },
  5: { title: 'Luyện tập', see: [3, 4] },
  6: {
    title: 'Các số 1, 2, 3',
    points: [
      'Đếm: <b>một, hai, ba</b>.',
      'Viết số: <b>1, 2, 3</b>.',
      'Đếm xuôi: 1, 2, 3. Đếm ngược: 3, 2, 1.',
    ],
    demos: [
      { kind: 'g1-count', n: 3, thing: 'chick',
        tries: [{ label: '1', n: 1, thing: 'ball' }, { label: '2', n: 2, thing: 'flower' }, { label: '3', n: 3, thing: 'chick' }] },
      { kind: 'g1-stairs', from: 1, to: 3, ask: 2 },
    ],
  },
  7: { title: 'Luyện tập', see: [6] },
  8: {
    title: 'Các số 1, 2, 3, 4, 5',
    points: [
      'Đếm: một, hai, ba, <b>bốn</b>, <b>năm</b>.',
      'Viết số: 1, 2, 3, <b>4</b>, <b>5</b>.',
      'Đếm xuôi: 1, 2, 3, 4, 5. Đếm ngược: 5, 4, 3, 2, 1.',
    ],
    demos: [
      { kind: 'g1-count', n: 4, thing: 'star', tries: [{ label: '4', n: 4, thing: 'star' }, { label: '5', n: 5, thing: 'fish' }] },
      { kind: 'g1-stairs', from: 1, to: 5, ask: 3 },
    ],
  },
  9: { title: 'Luyện tập', see: [8] },
  10: {
    title: 'Bé hơn. Dấu <',
    points: [
      'Nối từng cặp. Bên nào <b>ít hơn</b> thì số đó <b>bé hơn</b>.',
      '<b>2 bé hơn 5</b>, viết <b>2 &lt; 5</b>.',
      'Mũi nhọn của dấu &lt; chỉ vào <b>số bé</b>.',
    ],
    demos: [
      { kind: 'g1-cmp', a: 2, b: 5, thing: 'apple', tries: [{ label: '2 và 5', a: 2, b: 5 }, { label: '3 và 4', a: 3, b: 4, thing: 'bird' }, { label: '1 và 3', a: 1, b: 3, thing: 'star' }] },
    ],
  },
  11: {
    title: 'Lớn hơn. Dấu >',
    points: [
      'Bên nào <b>nhiều hơn</b> thì số đó <b>lớn hơn</b>.',
      '<b>5 lớn hơn 2</b>, viết <b>5 &gt; 2</b>.',
      'Miệng dấu luôn <b>há về phía số lớn</b>.',
    ],
    demos: [
      { kind: 'g1-cmp', a: 5, b: 2, thing: 'fish', tries: [{ label: '5 và 2', a: 5, b: 2 }, { label: '4 và 3', a: 4, b: 3, thing: 'ball' }, { label: '3 và 1', a: 3, b: 1, thing: 'flower' }] },
    ],
  },
  12: { title: 'Luyện tập', see: [10, 11] },
  13: {
    title: 'Bằng nhau. Dấu =',
    points: [
      'Nối từng cặp. <b>Không thừa</b> cái nào thì hai bên <b>bằng nhau</b>.',
      '<b>3 bằng 3</b>, viết <b>3 = 3</b>.',
      'Mỗi số bằng chính nó: 1 = 1, 4 = 4.',
    ],
    demos: [
      { kind: 'g1-cmp', a: 3, b: 3, thing: 'chick', tries: [{ label: '3 và 3', a: 3, b: 3 }, { label: '4 và 4', a: 4, b: 4, thing: 'apple' }, { label: '4 và 2', a: 4, b: 2, thing: 'star' }] },
    ],
  },
  14: { title: 'Luyện tập', see: [10, 11, 13] },
  15: { title: 'Luyện tập chung', see: [13, 10, 11] },
  16: {
    title: 'Số 6',
    points: [
      '5 thêm 1 là <b>6</b>. Đọc là <b>sáu</b>.',
      'Đếm: 1, 2, 3, 4, 5, <b>6</b>.',
      '6 gồm 5 và 1, 4 và 2, 3 và 3.',
    ],
    demos: [
      { kind: 'g1-count', n: 6, from: 5, thing: 'bird' },
      { kind: 'g1-bond', n: 6, a: 4, tries: [{ label: '5 và 1', a: 5 }, { label: '4 và 2', a: 4 }, { label: '3 và 3', a: 3 }] },
    ],
  },
  17: {
    title: 'Số 7',
    points: [
      '6 thêm 1 là <b>7</b>. Đọc là <b>bảy</b>.',
      'Đếm: 1, 2, 3, 4, 5, 6, <b>7</b>.',
      '7 gồm 6 và 1, 5 và 2, 4 và 3.',
    ],
    demos: [
      { kind: 'g1-count', n: 7, from: 6, thing: 'flower' },
      { kind: 'g1-bond', n: 7, a: 5, tries: [{ label: '6 và 1', a: 6 }, { label: '5 và 2', a: 5 }, { label: '4 và 3', a: 4 }] },
    ],
  },
  18: {
    title: 'Số 8',
    points: [
      '7 thêm 1 là <b>8</b>. Đọc là <b>tám</b>.',
      'Đếm: 1, 2, 3, 4, 5, 6, 7, <b>8</b>.',
      '8 gồm 7 và 1, 6 và 2, 5 và 3, 4 và 4.',
    ],
    demos: [
      { kind: 'g1-count', n: 8, from: 7, thing: 'fish' },
      { kind: 'g1-bond', n: 8, a: 5, tries: [{ label: '7 và 1', a: 7 }, { label: '5 và 3', a: 5 }, { label: '4 và 4', a: 4 }] },
    ],
  },
  19: {
    title: 'Số 9',
    points: [
      '8 thêm 1 là <b>9</b>. Đọc là <b>chín</b>.',
      'Đếm: 1, 2, 3, 4, 5, 6, 7, 8, <b>9</b>.',
      '9 gồm 8 và 1, 7 và 2, 6 và 3, 5 và 4.',
    ],
    demos: [
      { kind: 'g1-count', n: 9, from: 8, thing: 'star' },
      { kind: 'g1-bond', n: 9, a: 6, tries: [{ label: '8 và 1', a: 8 }, { label: '6 và 3', a: 6 }, { label: '5 và 4', a: 5 }] },
    ],
  },
  20: {
    title: 'Số 0',
    points: [
      'Không có cái nào: viết số <b>0</b>. Đọc là <b>không</b>.',
      '0 đứng trước 1. <b>0 &lt; 1</b>.',
      '0 là số <b>bé nhất</b>: 0, 1, 2, 3, ..., 9.',
    ],
    demos: [
      { kind: 'g1-zero', n: 3 },
      { kind: 'g1-stairs', from: 0, to: 9, ask: 0 },
    ],
  },
  21: {
    title: 'Số 10',
    points: [
      '9 thêm 1 là <b>10</b>. Đọc là <b>mười</b>.',
      'Số 10 có hai chữ số: chữ số 1 và chữ số 0.',
      '10 gồm 9 và 1, 8 và 2, 7 và 3, 6 và 4, 5 và 5.',
      'Từ 0 đến 10: 0, 1, 2, ..., 9, <b>10</b>. Số 10 <b>lớn nhất</b>.',
    ],
    demos: [
      { kind: 'g1-count', n: 10, from: 9, thing: 'apple' },
      { kind: 'g1-bond', n: 10, a: 9, tries: [{ label: '9 và 1', a: 9 }, { label: '7 và 3', a: 7 }, { label: '5 và 5', a: 5 }] },
    ],
  },
  22: { title: 'Luyện tập', see: [21, 20, 13] },
  23: { title: 'Luyện tập chung', see: [21, 10, 11] },
  24: { title: 'Luyện tập chung', see: [21, 13, 16] },
  25: {
    title: 'Phép cộng trong phạm vi 3',
    points: [
      'Thêm vào, gộp lại: làm tính <b>cộng</b>. Dấu <b>+</b> đọc là <b>cộng</b>.',
      '<b>1 + 1 = 2</b>. <b>1 + 2 = 3</b>. <b>2 + 1 = 3</b>.',
      'Viết theo cột: số dưới thẳng số trên.',
    ],
    demos: [
      { kind: 'g1-add', a: 1, b: 2, thing: 'bird', col: true,
        tries: [{ label: '1 + 2', a: 1, b: 2 }, { label: '1 + 1', a: 1, b: 1, thing: 'apple' }, { label: '2 + 1', a: 2, b: 1, thing: 'chick' }] },
    ],
  },
  26: { title: 'Luyện tập', see: [25] },
  27: {
    title: 'Phép cộng trong phạm vi 4',
    points: [
      '<b>3 + 1 = 4</b>. <b>2 + 2 = 4</b>. <b>1 + 3 = 4</b>.',
      'Đổi chỗ hai số, kết quả <b>không đổi</b>: 3 + 1 = 1 + 3.',
    ],
    demos: [
      { kind: 'g1-add', a: 3, b: 1, thing: 'apple', swap: true,
        tries: [{ label: '3 + 1', a: 3, b: 1 }, { label: '2 + 2', a: 2, b: 2, thing: 'fish', swap: false }, { label: '1 + 3', a: 1, b: 3, thing: 'chick' }] },
    ],
  },
  28: { title: 'Luyện tập', see: [27, 25] },
  29: {
    title: 'Phép cộng trong phạm vi 5',
    points: [
      '<b>4 + 1 = 5</b>. <b>3 + 2 = 5</b>. <b>2 + 3 = 5</b>. <b>1 + 4 = 5</b>.',
      'Đổi chỗ hai số, kết quả <b>không đổi</b>: 3 + 2 = 2 + 3.',
      '5 gồm 4 và 1, 3 và 2.',
    ],
    demos: [
      { kind: 'g1-add', a: 3, b: 2, thing: 'star', swap: true,
        tries: [{ label: '3 + 2', a: 3, b: 2 }, { label: '4 + 1', a: 4, b: 1, thing: 'ball' }, { label: '1 + 4', a: 1, b: 4, thing: 'bird' }] },
      { kind: 'g1-bond', n: 5, a: 3, tries: [{ label: '4 và 1', a: 4 }, { label: '3 và 2', a: 3 }] },
    ],
  },
  30: { title: 'Luyện tập', see: [29] },
  31: {
    title: 'Số 0 trong phép cộng',
    points: [
      'Một số cộng với <b>0</b> bằng <b>chính số đó</b>: 3 + 0 = 3.',
      '<b>0</b> cộng với một số bằng <b>chính số đó</b>: 0 + 3 = 3.',
      'Đĩa không có quả nào thì viết số 0.',
    ],
    demos: [
      { kind: 'g1-add', a: 3, b: 0, thing: 'apple', plate: true,
        tries: [{ label: '3 + 0', a: 3, b: 0 }, { label: '0 + 2', a: 0, b: 2 }, { label: '4 + 0', a: 4, b: 0 }] },
    ],
  },
  32: { title: 'Luyện tập', see: [31, 29] },
  33: { title: 'Luyện tập chung', see: [29, 31] },
  34: {
    title: 'Phép trừ trong phạm vi 3',
    points: [
      'Bớt đi, bay đi, nhảy đi: làm tính <b>trừ</b>. Dấu <b>−</b> đọc là <b>trừ</b>.',
      '<b>2 − 1 = 1</b>. <b>3 − 1 = 2</b>. <b>3 − 2 = 1</b>.',
      '2 + 1 = 3 nên 3 − 1 = 2 và 3 − 2 = 1.',
    ],
    demos: [
      { kind: 'g1-sub', a: 3, b: 1, tries: [{ label: '3 − 1', a: 3, b: 1 }, { label: '3 − 2', a: 3, b: 2 }, { label: '2 − 1', a: 2, b: 1 }] },
    ],
  },
};
