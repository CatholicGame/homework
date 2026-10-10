/**
 * Vở bài tập Toán 1 — Tập hai (Kết nối tri thức): Bài 34–37 (sách trang 73–88):
 * xem giờ đúng, các ngày trong tuần, thực hành xem lịch và giờ, luyện tập chung.
 * Mọi hình vẽ lại theo nét riêng: scripts/redraw/g1t2_bai34.py … g1t2_bai37.py (bộ vẽ kit_l1t2_e.py).
 * Đồng hồ: kim dài dừng trước vòng số, không che số nào.
 */
import { blank, sampleCell, stripVN } from '../grade3Workbook.js';
import imgClock1 from '../../assets/grade1-workbook-2/bai34_clock_1.svg';
import imgClock2 from '../../assets/grade1-workbook-2/bai34_clock_2.svg';
import imgClock3 from '../../assets/grade1-workbook-2/bai34_clock_3.svg';
import imgClock4 from '../../assets/grade1-workbook-2/bai34_clock_4.svg';
import imgClock6 from '../../assets/grade1-workbook-2/bai34_clock_6.svg';
import imgClock7 from '../../assets/grade1-workbook-2/bai34_clock_7.svg';
import imgClock8 from '../../assets/grade1-workbook-2/bai34_clock_8.svg';
import imgClock9 from '../../assets/grade1-workbook-2/bai34_clock_9.svg';
import imgClock10 from '../../assets/grade1-workbook-2/bai34_clock_10.svg';
import imgClock11 from '../../assets/grade1-workbook-2/bai34_clock_11.svg';
import imgB34Scenes from '../../assets/grade1-workbook-2/bai34_t1_q2_scenes.svg';
import imgB34EagleDino from '../../assets/grade1-workbook-2/bai34_t1_q3_eagle_dino.svg';
import imgB34Alarms from '../../assets/grade1-workbook-2/bai34_t1_q4_alarms.svg';
import imgB34NoHour from '../../assets/grade1-workbook-2/bai34_t2_q1_clocks.svg';
import imgB34Fancy from '../../assets/grade1-workbook-2/bai34_t2_q2_fancy.svg';
import imgB34Mai from '../../assets/grade1-workbook-2/bai34_t2_q3_mai.svg';

import imgB35Boats from '../../assets/grade1-workbook-2/bai35_t1_q2_boats.svg';
import imgB35AppleBa from '../../assets/grade1-workbook-2/bai35_t1_q3_apple_ba.svg';
import imgB35AppleTu from '../../assets/grade1-workbook-2/bai35_t1_q3_apple_tu.svg';
import imgB35AppleNam from '../../assets/grade1-workbook-2/bai35_t1_q3_apple_nam.svg';
import imgB35BasketHomQua from '../../assets/grade1-workbook-2/bai35_t1_q3_basket_homqua.svg';
import imgB35BasketNgayMai from '../../assets/grade1-workbook-2/bai35_t1_q3_basket_ngaymai.svg';
import imgB35BasketHomNay from '../../assets/grade1-workbook-2/bai35_t1_q3_basket_homnay.svg';
import imgB35Roses from '../../assets/grade1-workbook-2/bai35_t1_q4_roses.svg';
import imgB35Frog from '../../assets/grade1-workbook-2/bai35_t2_q1_frog.svg';
import imgB35BflyBay from '../../assets/grade1-workbook-2/bai35_t2_q2_bfly_bay.svg';
import imgB35BflyCn from '../../assets/grade1-workbook-2/bai35_t2_q2_bfly_cn.svg';
import imgB35BflySau from '../../assets/grade1-workbook-2/bai35_t2_q2_bfly_sau.svg';
import imgB35FlowerHomQua from '../../assets/grade1-workbook-2/bai35_t2_q2_flower_homqua.svg';
import imgB35FlowerNgayMai from '../../assets/grade1-workbook-2/bai35_t2_q2_flower_ngaymai.svg';
import imgB35FlowerHomNay from '../../assets/grade1-workbook-2/bai35_t2_q2_flower_homnay.svg';
import imgB35Maze from '../../assets/grade1-workbook-2/bai35_t2_q3_maze.svg';

import imgB36NestBa from '../../assets/grade1-workbook-2/bai36_t1_q1_nest_ba.svg';
import imgB36NestTu from '../../assets/grade1-workbook-2/bai36_t1_q1_nest_tu.svg';
import imgB36NestNam from '../../assets/grade1-workbook-2/bai36_t1_q1_nest_nam.svg';
import imgB36NestSau from '../../assets/grade1-workbook-2/bai36_t1_q1_nest_sau.svg';
import imgB36Hen20 from '../../assets/grade1-workbook-2/bai36_t1_q1_hen_20.svg';
import imgB36Hen19 from '../../assets/grade1-workbook-2/bai36_t1_q1_hen_19.svg';
import imgB36Hen22 from '../../assets/grade1-workbook-2/bai36_t1_q1_hen_22.svg';
import imgB36RabbitHomQua from '../../assets/grade1-workbook-2/bai36_t1_q2_rabbit_homqua.svg';
import imgB36RabbitNgayMai from '../../assets/grade1-workbook-2/bai36_t1_q2_rabbit_ngaymai.svg';
import imgB36RabbitHomNay from '../../assets/grade1-workbook-2/bai36_t1_q2_rabbit_homnay.svg';
import imgB36Carrot23 from '../../assets/grade1-workbook-2/bai36_t1_q2_carrot_23.svg';
import imgB36Carrot24 from '../../assets/grade1-workbook-2/bai36_t1_q2_carrot_24.svg';
import imgB36Carrot25 from '../../assets/grade1-workbook-2/bai36_t1_q2_carrot_25.svg';
import imgB36Robots from '../../assets/grade1-workbook-2/bai36_t1_q4_robots.svg';
import imgB36Coc from '../../assets/grade1-workbook-2/bai36_t2_q1_coc.svg';
import imgB36Trains from '../../assets/grade1-workbook-2/bai36_t2_q2_trains.svg';
import imgB36Zoo from '../../assets/grade1-workbook-2/bai36_t2_q3_zoo.svg';

import imgB37Exercise from '../../assets/grade1-workbook-2/bai37_t1_q1_exercise.svg';
import imgB37Class from '../../assets/grade1-workbook-2/bai37_t1_q1_class.svg';
import imgB37Play from '../../assets/grade1-workbook-2/bai37_t1_q1_play.svg';
import imgB37Lunch from '../../assets/grade1-workbook-2/bai37_t1_q1_lunch.svg';
import imgB37Clocks from '../../assets/grade1-workbook-2/bai37_t1_q2_clocks.svg';
import imgB37Outline from '../../assets/grade1-workbook-2/bai37_t1_q3_outline.svg';
import imgB37Rooster from '../../assets/grade1-workbook-2/bai37_t1_q3_bird_rooster.svg';
import imgB37Wren from '../../assets/grade1-workbook-2/bai37_t1_q3_bird_wren.svg';
import imgB37Eagle from '../../assets/grade1-workbook-2/bai37_t1_q3_bird_eagle.svg';
import imgB37Hoopoe from '../../assets/grade1-workbook-2/bai37_t1_q3_bird_hoopoe.svg';
import imgB37Pelican from '../../assets/grade1-workbook-2/bai37_t1_q3_bird_pelican.svg';
import imgB37Jay from '../../assets/grade1-workbook-2/bai37_t1_q3_bird_jay.svg';
import imgB37Kids from '../../assets/grade1-workbook-2/bai37_t2_q2_kids.svg';
import imgB37Tv from '../../assets/grade1-workbook-2/bai37_t2_q3_tv.svg';

// ── chấm giờ / thứ ──────────────────────────────────────────────────────────
// "8", "8 giờ", "8giờ", "8 gio" đều là 8 giờ.
const gioValidate = (n) => (v) => new RegExp(`^${n}(gio)?$`).test(stripVN(v).replace(/\s+/g, ''));
const gio = (n) => blank(`${n} giờ`, { validate: gioValidate(n) });

// Một ngày trong tuần, viết có hay không có chữ "thứ", có dấu hay không, bằng chữ hay bằng số:
// "Thứ Ba", "ba", "thu ba", "thứ 3" là một; "Chủ nhật", "chu nhat", "CN" là một.
const DAY_NUM = { 2: 'hai', 3: 'ba', 4: 'tu', 5: 'nam', 6: 'sau', 7: 'bay' };
const dayKey = (v) => {
  let s = stripVN(v).replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim().replace(/^thu /, '');
  if (DAY_NUM[s]) s = DAY_NUM[s];
  if (s === 'cn' || s === 'chunhat') s = 'chu nhat';
  return s;
};
// Các chỗ chấm của một dòng, theo thứ tự của sách.
const dayValidate = (...days) => {
  const target = days.map(dayKey).join('|');
  return (v) => String(v).split(',').map(dayKey).join('|') === target;
};

const DAYS = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ nhật'];
// Sau chữ "thứ" đã in sẵn trong sách, bé chỉ viết tên ngày.
const THU = ['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'];
const dayBlank = (label, day, tiles = DAYS) => ({ label, answer: day, validate: dayValidate(day), tiles, tileOne: true });

// Số trong vòng tròn như sách ("lá sen số ①").
const circ = (n) => `<span style="display:inline-flex;align-items:center;justify-content:center;width:1.7em;height:1.7em;border:2px solid currentColor;border-radius:50%;font-weight:700;line-height:1">${n}</span>`;

// Đoàn tàu Bài 35: đầu máy rồi bảy toa, "..." là toa còn trống (ô viết ngay trong toa).
const ENGINE = '<svg viewBox="0 0 120 70" width="96" height="56" aria-hidden="true" style="flex:none"><rect x="40" y="6" width="44" height="46" rx="10" fill="#7CC6E8" stroke="#3F3A40" stroke-width="3"/><rect x="50" y="14" width="24" height="16" rx="4" fill="#fff" stroke="#3F3A40" stroke-width="2.4"/><path d="M6,28 Q6,22 14,22 L40,22 L40,52 L6,52 Z" fill="#B8E5FC" stroke="#3F3A40" stroke-width="3"/><rect x="14" y="8" width="12" height="14" fill="#3F3A40"/><circle cx="20" cy="58" r="9" fill="#2B9BD6" stroke="#3F3A40" stroke-width="3"/><circle cx="48" cy="58" r="9" fill="#2B9BD6" stroke="#3F3A40" stroke-width="3"/><circle cx="74" cy="58" r="9" fill="#2B9BD6" stroke="#3F3A40" stroke-width="3"/><rect x="84" y="40" width="36" height="6" fill="#3F3A40"/></svg>';
const WHEEL = 'position:absolute;bottom:-.75em;width:1.1em;height:1.1em;border-radius:50%;background:#2B9BD6;border:2px solid #3F3A40';
const car = (inner) => `<span style="position:relative;display:inline-flex;align-items:center;justify-content:center;min-width:6.6em;height:3.1em;margin:0 0 .7em;padding:0 .4em .45em;background:#D6EEFB;border:2.5px solid #2B9BD6;border-radius:1em 1em .35em .35em;font-weight:600;line-height:1.2">${inner}<span aria-hidden="true" style="${WHEEL};left:18%"></span><span aria-hidden="true" style="${WHEEL};right:18%"></span></span>`;
const train = (cars) => `<span style="display:flex;flex-wrap:wrap;align-items:flex-end;gap:4px;width:100%">${ENGINE}${cars.map(car).join('')}</span>`;

// Ba tờ lịch tháng 5 liền nhau (Bài 36): [ngày, thứ], "..." là chỗ bé viết ngay trên tờ lịch.
const sheet = ([d, wd]) => `<span style="display:inline-flex;flex-direction:column;align-items:center;min-width:8.5em;border:2.5px solid #2B9BD6;border-radius:.6em;overflow:hidden;background:#fff;line-height:1.3">`
  + '<span style="align-self:stretch;text-align:center;background:#D6EEFB;border-bottom:2.5px solid #2B9BD6;font-weight:700;padding:.15em 0">Tháng 5</span>'
  + `<span style="font-size:${d === '...' ? '1em' : '2.2em'};font-weight:800;padding:.2em .4em 0">${d}</span><span style="padding:.1em .4em .4em">${wd}</span></span>`;
const sheets = (list) => `<span style="display:flex;flex-wrap:wrap;gap:.8em;width:100%;justify-content:center">${list.map(sheet).join('')}</span>`;

// "hổ", "con hổ", "cọp", "ho" đều đúng.
const tigerValidate = (v) => ['ho', 'cop'].includes(stripVN(v).trim().replace(/^con\s+/, '').replace(/\s+/g, ''));

// Bảng in trong đề (chỉ để đọc), viền xanh như sách.
const TB = 'border-collapse:collapse;margin:6px auto;font-size:0.85em;line-height:1.3';
const TD = 'border:1.5px solid #2B9BD6;padding:4px 8px;text-align:center;font-weight:500';
const TH = `${TD};background:#D6EEFB;font-weight:600`;
const birdImg = (src, alt) => `<img src="${src}" alt="${alt}" style="display:block;height:64px;width:auto;margin:0 auto">`;
const BIRD_TABLE = (rows) => `<div style="overflow-x:auto"><table style="${TB}"><tr><th style="${TH}">Thí sinh</th><th style="${TH}">Giờ biểu diễn</th><th style="${TH}">Thí sinh</th><th style="${TH}">Giờ biểu diễn</th></tr>`
  + rows.map(([a, ta, b, tb]) => `<tr><td style="${TD}">${a}</td><td style="${TD}">${ta}</td><td style="${TD}">${b}</td><td style="${TD}">${tb}</td></tr>`).join('')
  + '</table></div>';
const TIMETABLE = `<div style="overflow-x:auto"><table style="${TB};min-width:100%"><tr>${['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu'].map(d => `<th style="${TH}">${d}</th>`).join('')}</tr>`
  + `<tr>${['Tiếng Việt', 'Tập làm văn', 'Toán', 'Tiếng Việt', 'Tiếng Việt'].map(s => `<td style="${TD}">${s}</td>`).join('')}</tr>`
  + `<tr>${['Toán', 'Ngoại ngữ', 'Tập làm văn', 'Ngoại ngữ', 'Tập làm văn'].map(s => `<td style="${TD}">${s}</td>`).join('')}</tr></table></div>`;
const TV_TABLE = `<table style="${TB}"><tr><th style="${TH}">Chương trình</th><th style="${TH}">Thời gian</th></tr>`
  + [['Du lịch', 7], ['Ca nhạc', 8], ['Thể thao', 9], ['Thiếu nhi', 10]].map(([a, h]) => `<tr><td style="${TD};min-width:9em">${a}</td><td style="${TD};min-width:6em">${h} giờ</td></tr>`).join('')
  + '</table>';

// Nhiều tên trong một chỗ chấm, thứ tự nào cũng được ("Toán, Tiếng Việt, ..."; có dấu hay không).
const setValidateBy = (key, names) => {
  const target = names.map(key).sort().join('|');
  return (v) => String(v).split(/\s*[,;]\s*|\s+(?:và|va)\s+/i).map(key).filter(Boolean).sort().join('|') === target;
};
const subjectKey = (s) => stripVN(s).replace(/[^a-z]/g, '');
// Thứ và ngày trong một dòng ("Hôm nay là thứ ... ngày ..."): thứ như dayValidate, ngày đúng số.
const dayDateValidate = (day, date) => (v) => {
  const [a, b] = String(v).split(',');
  return dayKey(a) === dayKey(day) && String(b ?? '').trim() === String(date);
};
const DAY_DATE_TILES = ['Năm', 'Sáu', 'Bảy', '27', '28', '29'];
const TV_TILES = ['Du lịch', 'Ca nhạc', 'Thể thao', 'Thiếu nhi'];
const tvBlank = (letter, name) => ({ label: `${letter}) Chương trình ...`, answer: name, validate: (v) => subjectKey(v) === subjectKey(name), tiles: TV_TILES, tileOne: true });

export const BAI_34_37 = [
  // ── BÀI 34 (trang 73–76) ──────────────────────────────────────────────────
  {
    id: 'bai-34', number: 34, title: 'Xem giờ đúng trên đồng hồ',
    questions: [
      {
        type: 'match', section: 'Tiết 1', bigImg: true,
        q: '1. Nối đồng hồ với giờ thích hợp.',
        left: [
          { id: 'c2', img: imgClock2, text: '' },
          { id: 'c7', img: imgClock7, text: '' },
          { id: 'c3', img: imgClock3, text: '' },
        ],
        right: [
          { id: 'g7', text: '7 giờ' },
          { id: 'g3', text: '3 giờ' },
          { id: 'g2', text: '2 giờ' },
        ],
        pairs: [['c2', 'g2'], ['c7', 'g7'], ['c3', 'g3']],
        hints: ['Kim dài chỉ số 12. Kim ngắn chỉ vào số nào thì đồng hồ chỉ mấy giờ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB34Scenes,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) ... giờ', answer: '6' },
          { label: 'b) ... giờ', answer: '8' },
          { label: 'c) ... giờ', answer: '9' },
          { label: 'd) ... giờ', answer: '11' },
        ],
        hints: ['Xem đồng hồ ở góc mỗi tranh: kim ngắn chỉ số mấy thì là mấy giờ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB34EagleDino,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Đồng hồ của chú đại bàng: ... giờ', answer: '12' },
          { label: 'Đồng hồ của chú khủng long: ... giờ', answer: '5' },
        ],
        hints: ['Ở đồng hồ của đại bàng, kim ngắn và kim dài cùng chỉ số 12.'],
      },
      {
        type: 'match', section: 'Tiết 1', img: imgB34Alarms, bigImg: true,
        q: '4. Tô màu cho mỗi đồng hồ theo bảng màu.\nNối mỗi đồng hồ với màu em tô cho đồng hồ đó.',
        left: [
          { id: 'c4', img: imgClock4, text: '' },
          { id: 'c1', img: imgClock1, text: '' },
          { id: 'c7', img: imgClock7, text: '' },
          { id: 'c10', img: imgClock10, text: '' },
          { id: 'c11', img: imgClock11, text: '' },
        ],
        right: [
          { id: 'xanh', text: 'xanh' },
          { id: 'do', text: 'đỏ' },
          { id: 'vang', text: 'vàng' },
          { id: 'tim', text: 'tím' },
          { id: 'cam', text: 'cam' },
        ],
        pairs: [['c4', 'do'], ['c1', 'xanh'], ['c7', 'vang'], ['c10', 'tim'], ['c11', 'cam']],
        hints: ['Đọc giờ của mỗi đồng hồ rồi tìm giờ đó trong bảng màu: 1 giờ tô xanh, 4 giờ tô đỏ, 7 giờ tô vàng, 10 giờ tô tím, 11 giờ tô cam.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB34NoHour, paint: true,
        q: '1. Vẽ thêm kim ngắn để đồng hồ chỉ giờ đúng.\nVẽ kim ngắn lên đồng hồ, rồi viết số mà kim ngắn chỉ vào.',
        blanks: [
          { label: '4 giờ: kim ngắn chỉ vào số ...', answer: '4' },
          { label: '7 giờ: kim ngắn chỉ vào số ...', answer: '7' },
          { label: '11 giờ: kim ngắn chỉ vào số ...', answer: '11' },
        ],
        hints: ['Giờ đúng: kim dài chỉ số 12, kim ngắn chỉ vào số giờ. Vẽ kim ngắn từ giữa đồng hồ, ngắn hơn kim dài.'],
      },
      {
        type: 'match', section: 'Tiết 2', img: imgB34Fancy, bigImg: true,
        q: '2. Tô màu đồng hồ và chiếc kệ đặt đồng hồ ghi giờ tương ứng bởi cùng một màu. Các đồng hồ khác nhau được tô bởi các màu khác nhau.\nNối mỗi đồng hồ với chiếc kệ ghi giờ của nó.',
        left: [
          { id: 'owl', img: imgClock1, text: 'Cú mèo' },
          { id: 'flower', img: imgClock6, text: 'Bông hoa' },
          { id: 'wings', img: imgClock10, text: 'Đôi cánh' },
          { id: 'alarm', img: imgClock8, text: 'Báo thức' },
        ],
        right: [
          { id: 'k6', text: '6 giờ' },
          { id: 'k1', text: '1 giờ' },
          { id: 'k8', text: '8 giờ' },
          { id: 'k10', text: '10 giờ' },
        ],
        pairs: [['owl', 'k1'], ['flower', 'k6'], ['wings', 'k10'], ['alarm', 'k8']],
        hints: ['Đồng hồ cú mèo chỉ 1 giờ, đồng hồ bông hoa chỉ 6 giờ.'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB34Mai,
        q: '3. Vào ngày nghỉ, mẹ cho Mai về thăm ông bà. Quan sát tranh rồi viết thời gian tương ứng với từng hoạt động của Mai (theo mẫu).',
        headers: ['Hoạt động', 'Thời gian'],
        colWidths: ['72%', '28%'],
        rows: [
          ['Mai được mẹ chở về thăm ông bà', sampleCell('7 giờ')],
          ['Mai về đến nhà ông bà', gio(8)],
          ['Mai cho gà ăn', gio(9)],
          ['Mai hái xoài', gio(10)],
          ['Mai ăn cơm trưa cùng với gia đình', gio(11)],
        ],
        hints: ['Mỗi tranh có một đồng hồ. Tranh mẹ chở Mai là 7 giờ, các tranh sau lần lượt muộn hơn.'],
      },
    ],
  },
  // ── BÀI 35 (trang 77–80) ──────────────────────────────────────────────────
  {
    id: 'bai-35', number: 35, title: 'Các ngày trong tuần',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết ngày thích hợp vào chỗ chấm.',
        blanks: [{
          label: train(['Thứ Hai', '...', 'Thứ Tư', 'Thứ Năm', '...', 'Thứ Bảy', '...']),
          answer: 'Thứ Ba,Thứ Sáu,Chủ nhật', validate: dayValidate('Thứ Ba', 'Thứ Sáu', 'Chủ nhật'), tiles: DAYS,
        }],
        hints: ['Một tuần có bảy ngày: thứ Hai, thứ Ba, thứ Tư, thứ Năm, thứ Sáu, thứ Bảy, Chủ nhật.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB35Boats,
        q: '2. Dưới đây là số thuyền bạn Mai gấp được trong một tuần.\nViết vào chỗ chấm cho thích hợp.',
        blanks: [
          dayBlank('a) Vào ngày thứ ..., Mai gấp được 6 chiếc thuyền.', 'Tư', THU),
          { label: 'b) Vào ngày thứ Bảy, Mai gấp được ... chiếc thuyền.', answer: '12' },
        ],
        hints: ['Đếm số thuyền trong từng ô. Mỗi ngày Mai gấp nhiều hơn hôm trước 2 chiếc.'],
      },
      {
        type: 'match', section: 'Tiết 1', bigImg: true,
        q: '3. Nối quả táo với giỏ thích hợp (theo mẫu).',
        left: [
          { id: 'ba', img: imgB35AppleBa, text: '' },
          { id: 'tu', img: imgB35AppleTu, text: '' },
          { id: 'nam', img: imgB35AppleNam, text: '' },
        ],
        right: [
          { id: 'homqua', img: imgB35BasketHomQua, text: '' },
          { id: 'ngaymai', img: imgB35BasketNgayMai, text: '' },
          { id: 'homnay', img: imgB35BasketHomNay, text: '' },
        ],
        pairs: [['ba', 'homqua'], ['tu', 'homnay'], ['nam', 'ngaymai']],
        matchSample: ['ba', 'homqua'],
        hints: ['Hôm qua là thứ Ba, vậy hôm nay là thứ Tư, ngày mai là thứ Năm.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB35Roses,
        q: '4. Quan sát tranh rồi trả lời câu hỏi.',
        blanks: [
          dayBlank('a) Vào ngày nào trong tuần, trong lọ có 3 bông hoa hồng?<br>...', 'Thứ Hai'),
          dayBlank('b) Vào ngày nào trong tuần, trong lọ có nhiều hoa hồng nhất?<br>...', 'Thứ Tư'),
        ],
        hints: ['Hôm nay là thứ Ba. Hôm qua là thứ mấy? Ngày mai là thứ mấy?', 'Đếm số bông hồng trong mỗi lọ.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB35Frog,
        q: '1. Quan sát tranh rồi viết tiếp vào chỗ chấm cho thích hợp.\nSau mỗi ngày, chú ếch lại nhảy đến chiếc lá sen khác theo thứ tự: 1 → 2 → 3 → 4 → 5 → 6 → 7.',
        blanks: [
          dayBlank(`a) Chú ếch ở trên chiếc lá sen số ${circ(1)} vào thứ ...`, 'Hai', THU),
          dayBlank(`b) Chú ếch ở trên chiếc lá sen số ${circ(7)} vào ...`, 'Chủ nhật'),
        ],
        hints: ['Lá sen số 4 là thứ Năm. Đếm lùi về lá số 1, rồi đếm tiếp đến lá số 7.'],
      },
      {
        type: 'match', section: 'Tiết 2', bigImg: true,
        q: '2. Nối mỗi con bướm với bông hoa thích hợp.',
        left: [
          { id: 'bay', img: imgB35BflyBay, text: '' },
          { id: 'cn', img: imgB35BflyCn, text: '' },
          { id: 'sau', img: imgB35BflySau, text: '' },
        ],
        right: [
          { id: 'homqua', img: imgB35FlowerHomQua, text: '' },
          { id: 'ngaymai', img: imgB35FlowerNgayMai, text: '' },
          { id: 'homnay', img: imgB35FlowerHomNay, text: '' },
        ],
        pairs: [['bay', 'homnay'], ['cn', 'ngaymai'], ['sau', 'homqua']],
        hints: ['Thứ Sáu, thứ Bảy, Chủ nhật là ba ngày liền nhau. Ngày ở giữa là hôm nay.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB35Maze, paint: true,
        q: '3. a) Em hãy vẽ đường giúp bạn thỏ thoát khỏi mê cung.\nb) Đường thoát khỏi mê cung đi qua các chỗ chấm. Mỗi chỗ chấm ghi một ngày trong tuần. Viết ngày thích hợp vào chỗ chấm (các chỗ chấm có chữ A, B, C, D, E, G).',
        blanks: [
          dayBlank('A: ...', 'Thứ Sáu'),
          dayBlank('B: ...', 'Thứ Ba'),
          dayBlank('C: ...', 'Thứ Tư'),
          dayBlank('D: ...', 'Thứ Năm'),
          dayBlank('E: ...', 'Thứ Bảy'),
          dayBlank('G: ...', 'Chủ nhật'),
        ],
        hints: ['Vẽ đường đi từ thỏ (thứ Hai) đến mũi tên. Chỗ chấm gặp đầu tiên là thứ Ba, rồi đến thứ Tư, ...'],
      },
    ],
  },
  // ── BÀI 36 (trang 81–84) ──────────────────────────────────────────────────
  {
    id: 'bai-36', number: 36, title: 'Thực hành xem lịch và giờ',
    questions: [
      {
        type: 'match', section: 'Tiết 1', bigImg: true,
        q: '1. Nối ổ rơm thích hợp cho mỗi gà mẹ, biết thứ Năm là ngày 21.',
        left: [
          { id: 'ba', img: imgB36NestBa, text: '' },
          { id: 'tu', img: imgB36NestTu, text: '' },
          { id: 'nam', img: imgB36NestNam, text: '' },
          { id: 'sau', img: imgB36NestSau, text: '' },
        ],
        right: [
          { id: 'n20', img: imgB36Hen20, text: '' },
          { id: 'n19', img: imgB36Hen19, text: '' },
          { id: 'n22', img: imgB36Hen22, text: '' },
        ],
        pairs: [['ba', 'n19'], ['tu', 'n20'], ['sau', 'n22']],
        hints: ['Thứ Năm là ngày 21, vậy thứ Tư là ngày 20 (lùi 1 ngày), thứ Sáu là ngày 22 (thêm 1 ngày).'],
      },
      {
        type: 'match', section: 'Tiết 1', bigImg: true,
        q: '2. Nối thỏ với củ cà rốt thích hợp (theo mẫu).',
        left: [
          { id: 'homqua', img: imgB36RabbitHomQua, text: '' },
          { id: 'ngaymai', img: imgB36RabbitNgayMai, text: '' },
          { id: 'homnay', img: imgB36RabbitHomNay, text: '' },
        ],
        right: [
          { id: 'n23', img: imgB36Carrot23, text: '' },
          { id: 'n24', img: imgB36Carrot24, text: '' },
          { id: 'n25', img: imgB36Carrot25, text: '' },
        ],
        pairs: [['homqua', 'n23'], ['ngaymai', 'n25'], ['homnay', 'n24']],
        matchSample: ['homnay', 'n24'],
        hints: ['Hôm nay là ngày 24. Hôm qua kém hôm nay 1 ngày, ngày mai hơn hôm nay 1 ngày.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Bạn Mai xé ba tờ lịch liền nhau và xếp theo thứ tự từ trái sang phải.\nViết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [{
          label: sheets([[19, 'Thứ Bảy'], [20, '...'], ['...', '...']]),
          answer: 'Chủ nhật,21,Thứ Hai',
          validate: (v) => {
            const [a, b, c] = String(v).split(',');
            return dayKey(a) === dayKey('Chủ nhật') && String(b).trim() === '21' && dayKey(c) === dayKey('Thứ Hai');
          },
          tiles: ['Thứ Bảy', 'Chủ nhật', 'Thứ Hai', 'Thứ Ba', '20', '21', '22'],
        }],
        hints: ['Sau thứ Bảy là Chủ nhật, sau Chủ nhật là thứ Hai. Mỗi tờ lịch sau hơn tờ trước 1 ngày.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB36Robots,
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Rô-bốt đã xé đi ... tờ lịch.', answer: '4' },
          dayBlank('b) Ngày 13 là thứ ...', 'Sáu', THU),
        ],
        hints: ['Rô-bốt xé các tờ ngày 9, 10, 11, 12 rồi mới đến tờ ngày 13.', 'Ngày 9 là thứ Hai, ngày 10 là thứ Ba, ...'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB36Coc,
        q: '1. Quan sát tranh rồi viết tiếp vào chỗ chấm cho thích hợp.\n<span style="color:#1d8fd1">Cóc kiện Trời</span>',
        blanks: [
          { label: 'a) Cóc gặp cua lúc ... giờ.', answer: '8' },
          { label: 'b) Lúc 9 giờ, cóc và cua gặp ...', answer: 'hổ', validate: tigerValidate, tiles: ['cua', 'hổ', 'cáo', 'ong'], tileOne: true },
          { label: 'c) Cóc gặp đàn ong lúc ... giờ.', answer: '10' },
          { label: 'd) Cóc, cua, hổ, cáo và đàn ong lên đến cổng Trời lúc ... giờ.', answer: '12' },
        ],
        hints: ['Mỗi tranh có một đồng hồ ở góc. Tranh 9 giờ có con vật nào đang nằm bên suối?'],
      },
      {
        type: 'table', section: 'Tiết 2', img: imgB36Trains,
        q: '2. Viết giờ thích hợp vào bảng.',
        headers: ['Chuyến tàu', 'Giờ khởi hành'],
        colWidths: ['62%', '38%'],
        rows: [
          ['Hà Nội – Hải Phòng', gio(10)],
          ['Hà Nội – Lào Cai', gio(7)],
          ['Hà Nội – Thái Nguyên', gio(8)],
        ],
        hints: ['Đồng hồ đứng đầu mỗi đường tàu cho biết giờ tàu khởi hành từ Hà Nội.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB36Zoo,
        q: '3. Vào ngày nghỉ, Mai được mẹ cho đi chơi ở vườn bách thú. Quan sát tranh rồi viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Bạn Mai đến chỗ hươu cao cổ lúc ... giờ.', answer: '8' },
          { label: 'b) Bạn Mai rời khỏi vườn bách thú lúc ... giờ.', answer: '10' },
        ],
        hints: ['Tranh có hươu cao cổ là lúc Mai đến xem hươu; tranh ở cổng vườn là lúc Mai ra về.'],
      },
    ],
  },
  // ── BÀI 37 (trang 85–88) ──────────────────────────────────────────────────
  {
    id: 'bai-37', number: 37, title: 'Luyện tập chung',
    questions: [
      {
        type: 'match', section: 'Tiết 1', bigImg: true,
        q: '1. Nối tranh với đồng hồ thích hợp.',
        left: [
          { id: 'exercise', img: imgB37Exercise, text: '' },
          { id: 'class', img: imgB37Class, text: '' },
          { id: 'play', img: imgB37Play, text: '' },
          { id: 'lunch', img: imgB37Lunch, text: '' },
        ],
        right: [
          { id: 'c6', img: imgClock6, text: '' },
          { id: 'c7', img: imgClock7, text: '' },
          { id: 'c9', img: imgClock9, text: '' },
          { id: 'c11', img: imgClock11, text: '' },
        ],
        pairs: [['exercise', 'c6'], ['class', 'c7'], ['play', 'c9'], ['lunch', 'c11']],
        hints: ['Buổi sáng sớm, bạn nhỏ tập thể dục. Các bạn vào lớp học bài, rồi ra chơi, buổi trưa thì ăn cơm.', 'Đọc giờ từng đồng hồ: 6 giờ, 7 giờ, 9 giờ, 11 giờ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgB37Clocks,
        q: '2. Viết số thích hợp vào chỗ chấm.\nVào ngày Chủ nhật, Mi được mẹ cho đi chơi công viên.',
        blanks: [
          { label: 'a) Hai mẹ con đi từ nhà lúc 8 giờ sáng. Một giờ sau, Mi đến công viên.<br>Mi đến công viên lúc ... giờ.', answer: '9' },
          { label: 'b) Mẹ và Mi về đến nhà lúc 12 giờ trưa. Vậy mẹ và Mi đi chơi công viên hết ... giờ.', answer: '4' },
        ],
        hints: ['a) Sau 8 giờ một giờ là 9 giờ.', 'b) Từ lúc đi (8 giờ) đến lúc về (12 giờ), đếm thêm: 9, 10, 11, 12.'],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgB37Outline, multi: true,
        q: `3. Dưới đây là giờ biểu diễn của các thí sinh trong hội thi “Dân vũ”:\n${BIRD_TABLE([
          [birdImg(imgB37Rooster, 'gà trống'), '6 giờ', birdImg(imgB37Wren, 'chim nhỏ đuôi dài'), '7 giờ'],
          [birdImg(imgB37Eagle, 'đại bàng'), '8 giờ', birdImg(imgB37Hoopoe, 'chim đầu rìu'), '10 giờ'],
          [birdImg(imgB37Pelican, 'bồ nông'), '11 giờ', birdImg(imgB37Jay, 'chim giẻ cùi'), '12 giờ'],
        ])}Thỏ đến xem các thí sinh biểu diễn lúc 9 giờ. Em hãy tô màu vào hình thí sinh mà thỏ có thể kịp xem thí sinh đó biểu diễn.\n(Chọn tất cả các thí sinh đó.)`,
        options: [
          birdImg(imgB37Wren, 'chim nhỏ đuôi dài'), birdImg(imgB37Hoopoe, 'chim đầu rìu'), birdImg(imgB37Eagle, 'đại bàng'),
          birdImg(imgB37Rooster, 'gà trống'), birdImg(imgB37Pelican, 'bồ nông'), birdImg(imgB37Jay, 'chim giẻ cùi'),
        ],
        answer: [1, 4, 5],
        hints: ['Thỏ đến lúc 9 giờ nên chỉ xem được các thí sinh biểu diễn sau 9 giờ: 10 giờ, 11 giờ, 12 giờ.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: `1. Dưới đây là thời khoá biểu trong “Tuần văn hoá” của bạn Rô-bốt:\n${TIMETABLE}Viết tiếp vào chỗ chấm cho thích hợp.\nTrong “Tuần văn hoá”:`,
        blanks: [
          { label: 'a) Bạn Rô-bốt học tất cả ... môn học.', answer: '4' },
          {
            label: 'Tên các môn đó là: ...', answer: 'Tiếng Việt, Tập làm văn, Toán, Ngoại ngữ',
            validate: setValidateBy(subjectKey, ['Tiếng Việt', 'Tập làm văn', 'Toán', 'Ngoại ngữ']),
            tiles: ['Tiếng Việt', 'Tập làm văn', 'Toán', 'Ngoại ngữ'],
          },
          {
            label: 'b) Bạn Rô-bốt học Tiếng Việt vào các ngày: ...', answer: 'Thứ Hai, Thứ Năm, Thứ Sáu',
            validate: setValidateBy(dayKey, ['Thứ Hai', 'Thứ Năm', 'Thứ Sáu']), tiles: DAYS.slice(0, 5),
          },
        ],
        hints: ['Đọc từng ô của bảng, môn nào đã đếm rồi thì không đếm lại.', 'Tìm các ô "Tiếng Việt" rồi nhìn lên hàng trên cùng xem đó là thứ mấy.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB37Kids,
        q: '2. Quan sát tranh rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Hôm nay là thứ ... ngày ...', answer: 'Sáu,28', validate: dayDateValidate('Sáu', 28), tiles: DAY_DATE_TILES },
          { label: 'b) Hôm qua là thứ ... ngày ...', answer: 'Năm,27', validate: dayDateValidate('Năm', 27), tiles: DAY_DATE_TILES },
          dayBlank('c) Ngày 25 là thứ ...', 'Ba', THU),
        ],
        hints: ['Ngày mai là thứ Bảy ngày 29, vậy hôm nay kém 1 ngày: thứ Sáu ngày 28.', 'Đếm lùi: ngày 28 thứ Sáu, ngày 27 thứ Năm, ngày 26 thứ Tư, ngày 25 ...'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgB37Tv,
        q: `3. Dưới đây là khung giờ phát sóng của một số chương trình truyền hình trong buổi sáng Chủ nhật:\n${TV_TABLE}Viết tên chương trình thích hợp vào chỗ chấm.`,
        blanks: [tvBlank('a', 'Du lịch'), tvBlank('b', 'Thiếu nhi'), tvBlank('c', 'Ca nhạc'), tvBlank('d', 'Thể thao')],
        hints: ['Đọc giờ trên đồng hồ của mỗi ti vi rồi tìm giờ đó trong bảng.'],
      },
    ],
  },
];
