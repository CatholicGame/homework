/**
 * Vở bài tập Toán 1 — Tập một: Bài 1–6 (sách trang 3–8).
 * Bài 1 "Em học toán" chỉ có tranh lớp học, không có bài tập nên không có bài ở đây.
 * Mọi hình vẽ lại bằng nét riêng: scripts/redraw/g1_bai2.py, g1_bai3.py, g1_bai4.py, g1_bai5_6.py.
 */
import imgB2Trees from '../../assets/grade1-workbook/bai2_trees.svg';
import imgB2Flowers from '../../assets/grade1-workbook/bai2_flowers_oranges.svg';
import imgB2Caps from '../../assets/grade1-workbook/bai2_caps_girls.svg';
import imgB2Cranes from '../../assets/grade1-workbook/bai2_cranes_boats.svg';
import imgB2Stars from '../../assets/grade1-workbook/bai2_stars_balloons.svg';
import imgB2Dots from '../../assets/grade1-workbook/bai2_dots.svg';
import imgB3Squares from '../../assets/grade1-workbook/bai3_q1_squares.svg';
import imgB3Circles from '../../assets/grade1-workbook/bai3_q2_circles.svg';
import imgB3Nested from '../../assets/grade1-workbook/bai3_q3_nested.svg';
import imgB3Opt1 from '../../assets/grade1-workbook/bai3_q3_opt1.svg';
import imgB3Opt2 from '../../assets/grade1-workbook/bai3_q3_opt2.svg';
import imgB3Opt3 from '../../assets/grade1-workbook/bai3_q3_opt3.svg';
import imgB3Sticks from '../../assets/grade1-workbook/bai3_q4_sticks.svg';
import imgB4Triangles from '../../assets/grade1-workbook/bai4_q1_triangles.svg';
import imgB4Pictures from '../../assets/grade1-workbook/bai4_q2_pictures.svg';
import imgB4House from '../../assets/grade1-workbook/bai4_q3_pictures.svg';
import imgB4Sticks from '../../assets/grade1-workbook/bai4_q4_sticks.svg';
import imgB5Shapes from '../../assets/grade1-workbook/bai5_q1_shapes.svg';
import imgB6Chick from '../../assets/grade1-workbook/bai6_q2_chick.svg';
import imgB6Flowers from '../../assets/grade1-workbook/bai6_q2_flowers.svg';
import imgB6Oranges from '../../assets/grade1-workbook/bai6_q2_oranges.svg';
import imgB6Trees from '../../assets/grade1-workbook/bai6_q2_trees.svg';
import imgB6Birds from '../../assets/grade1-workbook/bai6_q2_birds.svg';
import imgB6Boat from '../../assets/grade1-workbook/bai6_q2_boat.svg';
import imgB6Dots1 from '../../assets/grade1-workbook/bai6_q3_dots1.svg';
import imgB6Dots2 from '../../assets/grade1-workbook/bai6_q3_dots2.svg';
import imgB6Dots3 from '../../assets/grade1-workbook/bai6_q3_dots3.svg';
import { mau } from '../grade3Workbook.js';

const pic = (src, h = 64) => `<img src="${src}" alt="" style="height:${h}px;width:auto;vertical-align:middle;margin-right:8px">`;
const SHAPES2 = ['Hình vuông', 'Hình tròn'];
const SHAPES3 = ['Hình vuông', 'Hình tròn', 'Hình tam giác'];
const MORE_LESS = ['nhiều hơn', 'ít hơn'];
const PAIR_HINT = 'Nối mỗi đồ vật ở hàng này với một đồ vật ở hàng kia. Bên nào còn thừa ra thì bên đó nhiều hơn, bên kia ít hơn.';

export const BAI_1_6 = [
  {
    id: 'bai-2', number: 2, title: 'Nhiều hơn, ít hơn',
    questions: [
      {
        type: 'choice', img: imgB2Trees,
        q: 'Số cây có quả nhiều hơn hay số cây không có quả nhiều hơn?',
        options: ['Số cây có quả nhiều hơn', 'Số cây không có quả nhiều hơn'],
        answer: 0,
        hints: ['Mỗi cây có quả ở hàng trên ghép với một cây ở hàng dưới. Hàng trên còn thừa một cây.'],
      },
      {
        type: 'choice', img: imgB2Flowers,
        q: 'Số bông hoa ít hơn hay số quả cam ít hơn?',
        options: ['Số bông hoa ít hơn', 'Số quả cam ít hơn'],
        answer: 1,
        hints: ['Dưới mỗi bông hoa đặt một quả cam. Bông hoa nào không có quả cam ở dưới?'],
      },
      {
        type: 'choice', img: imgB2Caps,
        q: 'Số mũ ít hơn hay số bạn gái ít hơn?',
        options: ['Số mũ ít hơn', 'Số bạn gái ít hơn'],
        answer: 0,
        hints: ['Mỗi bạn gái đội một cái mũ. Có bạn nào chưa có mũ không?'],
      },
      {
        type: 'choice', img: imgB2Cranes,
        q: 'Số thuyền giấy nhiều hơn hay số hạc giấy nhiều hơn?',
        options: ['Số thuyền giấy nhiều hơn', 'Số hạc giấy nhiều hơn'],
        answer: 1,
        hints: [PAIR_HINT],
      },
      {
        type: 'choice', img: imgB2Stars,
        q: 'Số ngôi sao nhiều hơn hay số quả bóng bay nhiều hơn?',
        options: ['Số ngôi sao nhiều hơn', 'Số quả bóng bay nhiều hơn'],
        answer: 0,
        hints: [PAIR_HINT],
      },
      {
        type: 'choice', img: imgB2Dots,
        q: 'Số chấm tròn xanh ít hơn hay số chấm tròn trắng ít hơn?',
        options: ['Số chấm tròn xanh ít hơn', 'Số chấm tròn trắng ít hơn'],
        answer: 1,
        hints: ['Nối mỗi chấm tròn trắng với một chấm tròn xanh. Cột nào còn thừa chấm tròn thì cột đó nhiều hơn.'],
      },
    ],
  },
  {
    id: 'bai-3', number: 3, title: 'Hình vuông, hình tròn',
    questions: [
      {
        type: 'choice', img: imgB3Squares,
        q: '1. Tô màu :\nCác hình em vừa tô là hình gì?',
        options: SHAPES2,
        answer: 0,
        hints: ['Hình có 4 cạnh thẳng dài bằng nhau và 4 góc vuông.'],
      },
      {
        type: 'choice', img: imgB3Circles,
        q: '2. Tô màu :\nCác hình em vừa tô là hình gì?',
        options: SHAPES2,
        answer: 1,
        hints: ['Hình tròn xoe như cái đĩa, không có cạnh thẳng nào.'],
      },
      {
        type: 'choice', img: imgB3Nested,
        q: '3. Tô màu :\nHình nào có hình tròn nằm bên trong hình vuông?',
        options: [pic(imgB3Opt1, 72), pic(imgB3Opt2, 72), pic(imgB3Opt3, 72)],
        answer: 0,
        hints: ['Tìm hình mà hình vuông ở ngoài, hình tròn ở trong.'],
      },
      {
        type: 'choice', img: imgB3Sticks,
        q: '4. Xếp thành các hình sau :\nEm dùng que tính xếp được những hình gì?',
        options: SHAPES2,
        answer: 0,
        hints: ['Mỗi hình nhỏ được xếp bằng 4 que tính.'],
      },
    ],
  },
  {
    id: 'bai-4', number: 4, title: 'Hình tam giác',
    questions: [
      {
        type: 'choice', img: imgB4Triangles,
        q: '1. Tô màu :\nCác hình em vừa tô là hình gì?',
        options: SHAPES3,
        answer: 2,
        hints: ['Hình có 3 cạnh thẳng và 3 góc.'],
      },
      {
        type: 'choice', img: imgB4Pictures,
        q: '2. Tô màu :\nNgôi nhà, chiếc thuyền và chong chóng đều được ghép từ những hình gì?',
        options: SHAPES3,
        answer: 2,
        hints: ['Đếm số cạnh của từng mảnh nhỏ, kể cả các mảnh trong thân ngôi nhà.'],
      },
      {
        type: 'compare', img: imgB4House,
        q: '3. Tô màu :\nMỗi phần dưới đây là hình gì?',
        rows: [
          { left: 'Mái nhà', options: SHAPES3, answer: 'Hình tam giác' },
          { left: 'Cửa ra vào', options: SHAPES3, answer: 'Hình vuông' },
          { left: 'Tán cây thông', options: SHAPES3, answer: 'Hình tam giác' },
        ],
        hints: ['Hình tam giác có 3 cạnh, hình vuông có 4 cạnh.'],
      },
      {
        type: 'choice', img: imgB4Sticks, multi: true,
        q: '4. Xếp thành các hình sau :\nEm dùng que tính xếp được những hình gì? (Chọn tất cả các đáp án đúng.)',
        options: SHAPES3,
        answer: [0, 2],
        hints: ['Có hình gồm 3 que tính, có hình gồm 4 que tính.'],
      },
    ],
  },
  {
    id: 'bai-5', number: 5, title: 'Luyện tập',
    questions: [
      {
        type: 'compare', img: imgB5Shapes,
        q: '1. Tô màu vào các hình : cùng hình dạng thì cùng một màu.\nĐếm các hình rồi chọn:',
        rows: [
          { left: 'Số hình vuông so với số hình tròn:', options: MORE_LESS, answer: 'nhiều hơn' },
          { left: 'Số hình tam giác so với số hình vuông:', options: MORE_LESS, answer: 'ít hơn' },
        ],
        hints: ['Hình vuông đặt nghiêng vẫn là hình vuông. Có 4 hình vuông, 3 hình tròn, 3 hình tam giác.'],
      },
    ],
  },
  {
    id: 'bai-6', number: 6, title: 'Các số 1, 2, 3',
    questions: [
      {
        type: 'fill',
        q: `2. Số ?\n${mau(`${pic(imgB6Chick, 72)} 1`)}`,
        blanks: [
          { label: `${pic(imgB6Flowers, 72)} ...`, answer: '2', boxes: true },
          { label: `${pic(imgB6Oranges, 72)} ...`, answer: '3', boxes: true },
          { label: `${pic(imgB6Trees, 72)} ...`, answer: '3', boxes: true },
          { label: `${pic(imgB6Birds, 72)} ...`, answer: '2', boxes: true },
          { label: `${pic(imgB6Boat, 72)} ...`, answer: '1', boxes: true },
        ],
        hints: ['Chỉ tay vào từng hình và đếm: một, hai, ba.'],
      },
      {
        type: 'fill',
        q: '3. Viết số hoặc vẽ số chấm tròn thích hợp :\na) Viết số chỉ số chấm tròn:',
        blanks: [
          { label: `${pic(imgB6Dots1, 56)} ...`, answer: '1', boxes: true },
          { label: `${pic(imgB6Dots2, 56)} ...`, answer: '2', boxes: true },
          { label: `${pic(imgB6Dots3, 56)} ...`, answer: '3', boxes: true },
        ],
        hints: ['Đếm số chấm tròn trong mỗi ô.'],
      },
      {
        type: 'match',
        q: '3. Viết số hoặc vẽ số chấm tròn thích hợp :\nb) Nối mỗi số với ô có số chấm tròn thích hợp:',
        left: [{ id: 'n3', text: '3' }, { id: 'n2', text: '2' }, { id: 'n1', text: '1' }],
        right: [{ id: 'd2', img: imgB6Dots2 }, { id: 'd1', img: imgB6Dots1 }, { id: 'd3', img: imgB6Dots3 }],
        pairs: [['n3', 'd3'], ['n2', 'd2'], ['n1', 'd1']],
        hints: ['Số 3 cần 3 chấm tròn, số 2 cần 2 chấm tròn, số 1 cần 1 chấm tròn. Em vẽ các chấm tròn vào vở.'],
      },
    ],
  },
];
