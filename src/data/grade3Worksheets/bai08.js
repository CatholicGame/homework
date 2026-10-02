/**
 * Phiếu bài tập Bài 8: Luyện tập.
 * Nguồn: docs/lop_3/De_thi/Bài 8_ Luyện tập - Toán LỚP 3 (Có File Tải Về).pdf
 * Bỏ phần "Em tự đánh giá" cuối phiếu.
 */
import { readNumber as R } from '../../games/worksheetCore.js';

const ST = 'stroke="#1f2937" stroke-width="2.5" fill="none"';
const lbl = (x, y, t) => `<text x="${x}" y="${y}" font-size="15" font-weight="700" fill="#1f2937" text-anchor="middle">${t}</text>`;

// Hình 1: hình vuông ABCD, GH nối trung điểm AD và BC, EF chia đôi hình chữ nhật dưới, GE là đường chéo.
// Hình 2: tam giác ABC, CD từ đỉnh xuống cạnh AB.
const FIG_COUNT = `<svg viewBox="0 0 400 200" width="400" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  <g transform="translate(26 24)">
    <rect x="0" y="0" width="140" height="140" ${ST}/><path d="M0 70 H140 M70 70 V140 M0 70 L70 140" ${ST}/>
    ${lbl(-12, 4, 'D')}${lbl(152, 4, 'C')}${lbl(-12, 75, 'G')}${lbl(70, 62, 'F')}${lbl(152, 75, 'H')}${lbl(-12, 150, 'A')}${lbl(70, 158, 'E')}${lbl(152, 150, 'B')}
    ${lbl(70, 182, 'Hình 1')}
  </g>
  <g transform="translate(224 24)">
    <path d="M0 140 L150 140 L75 0 Z M75 0 V140" ${ST}/>
    ${lbl(-10, 146, 'A')}${lbl(160, 146, 'B')}${lbl(75, -8, 'C')}${lbl(75, 158, 'D')}
    ${lbl(75, 182, 'Hình 2')}
  </g>
</svg>`;

const sort4 = (nums) => {
  const up = [...nums].sort((x, y) => x - y);
  const list = nums.join(', ');
  return [
    { t: `${list}. Từ bé đến lớn: …, …, …, …`, ans: up },
    { t: `${list}. Từ lớn đến bé: …, …, …, …`, ans: [...up].reverse() },
  ];
};
const sum3 = (n) => ({ t: `${n} = … + … + …`, ans: [Math.floor(n / 100) * 100, Math.floor(n / 10) % 10 * 10, n % 10] });

const word = (o) => ({ type: 'word', decoys: ['còn lại'], ...o });

export default {
  id: 'bai-8',
  title: 'Bài 8: Luyện tập',
  short: 'Bài 8',
  desc: 'Luyện tập: số đến 1000, cộng trừ, bảng nhân chia, hình học, đo lường',
  review: 'các số đến 1000, phép cộng, phép trừ và bảng nhân, bảng chia',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phần A. Ôn tập các số đến 1000',
      label: 'Bài',
      questions: [
        {
          type: 'table',
          prompt: 'Đọc số và viết số:',
          head: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
          rows: [648, 290, 715, 302, 853].map(n => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10, '…', '…']),
          ans: [648, 290, 715, 302, 853].map(n => [n, R(n)]),
        },
        { type: 'fill', prompt: 'Viết số thành tổng:', marker: '1', items: [627, 489, 350, 914, 205].map(sum3) },
        {
          type: 'compare',
          prompt: 'Điền dấu >, < hoặc =',
          marker: '1',
          items: ['476 □ 467', '820 □ 802', '999 □ 999', '314 □ 413', '650 □ 605', '728 □ 782', '501 □ 510', '888 □ 889'],
        },
        { type: 'fill', prompt: 'Sắp xếp các số:', items: [...sort4([358, 274, 627, 419]), ...sort4([502, 890, 710, 305]), ...sort4([765, 573, 684, 792])] },
      ],
    },
    {
      title: 'Phần B. Phép cộng và phép trừ trong phạm vi 1000',
      label: 'Bài',
      questions: [
        {
          type: 'calc',
          prompt: 'Tính nhẩm:',
          marker: '1',
          items: ['400 + 300', '900 − 600', '150 + 20', '750 − 40', '230 + 50', '800 − 250', '670 + 100', '980 − 80', '560 + 30', '430 − 200'],
        },
        { type: 'calc', prompt: 'Đặt tính rồi tính (phép cộng, phép trừ):', col: true, marker: '1', items: ['286 + 157', '409 + 492', '135 + 68', '524 + 376', '745 − 328', '600 − 255', '813 − 279', '520 − 184'] },
        { type: 'findx', prompt: 'Tìm x:', marker: '1', items: ['x + 124 = 569', '840 − x = 315', 'x − 238 = 407', '500 + x = 947', 'x − 105 = 300', '720 − x = 425'] },
      ],
    },
    {
      title: 'Phần C. Bảng nhân và bảng chia',
      label: 'Bài',
      questions: [
        {
          type: 'calc',
          prompt: 'Tính nhẩm:',
          items: ['2 × 9', '18 : 2', '3 × 7', '21 : 3', '4 × 6', '24 : 4', '5 × 8', '40 : 5', '2 × 5', '10 : 2', '3 × 4', '12 : 3', '4 × 7', '28 : 4', '5 × 3', '15 : 5'],
        },
        { type: 'fill', prompt: 'Điền số thích hợp:', items: ['2 × □ = 16', '□ : 5 = 7', '3 × □ = 21', '□ : 2 = 12', '4 × □ = 32', '□ : 4 = 6', '5 × □ = 40', '□ : 3 = 5', '2 × □ = 18', '□ : 2 = 8'] },
        { type: 'compare', prompt: 'Điền dấu >, < hoặc =', marker: '1', items: ['2 × 8 □ 18', '20 : 5 □ 3', '4 × 5 □ 22', '16 : 4 □ 4', '3 × 6 □ 18', '24 : 3 □ 8', '5 × 2 □ 12', '30 : 5 □ 7'] },
      ],
    },
    {
      title: 'Phần D. Hình học',
      label: 'Bài',
      questions: [
        {
          type: 'mc',
          prompt: 'Nhận biết hình:',
          items: [
            { prompt: '1. Hình nào là hình vuông?', options: ['Có 4 cạnh bằng nhau', 'Có 3 cạnh', 'Có 2 cạnh dài, 2 cạnh ngắn'], ans: 0 },
            { prompt: '2. Hình nào là hình chữ nhật?', options: ['Có 4 cạnh bằng nhau', 'Có 2 cạnh dài, 2 cạnh ngắn', 'Có 3 cạnh'], ans: 1 },
            { prompt: '3. Hình nào là hình tam giác?', options: ['Có 3 cạnh', 'Có 4 cạnh bằng nhau', 'Có 2 cạnh dài, 2 cạnh ngắn'], ans: 0 },
            { prompt: '4. Hình nào là hình tròn?', options: ['Không có cạnh nào', 'Có 3 cạnh', 'Có 4 cạnh bằng nhau'], ans: 0 },
            // sửa: phương án c in "Có 1 cạnh cong" (cũng không phải tam giác, hai đáp án đúng); đổi thành "Có 3 đỉnh".
            { prompt: '5. Hình nào không phải là hình tam giác?', options: ['Có 3 cạnh', 'Có 4 cạnh', 'Có 3 đỉnh'], ans: 1 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Đếm hình:',
          fig: FIG_COUNT,
          items: [
            { t: 'Hình 1 có … hình vuông.', ans: 3 },
            { t: 'Hình 2 có … hình tam giác.', ans: 3 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Tính chu vi:',
          marker: '1',
          items: [
            { t: 'Hình vuông có cạnh 5 cm. Chu vi: … cm', ans: 20 },
            { t: 'Hình vuông có cạnh 8 cm. Chu vi: … cm', ans: 32 },
            { t: 'Hình chữ nhật có chiều dài 9 cm, chiều rộng 4 cm. Chu vi: … cm', ans: 26 },
            { t: 'Hình chữ nhật có chiều dài 7 cm, chiều rộng 3 cm. Chu vi: … cm', ans: 20 },
            { t: 'Tam giác có các cạnh 5 cm, 6 cm, 7 cm. Chu vi: … cm', ans: 18 },
            { t: 'Tam giác có các cạnh 8 cm, 5 cm, 4 cm. Chu vi: … cm', ans: 17 },
          ],
        },
      ],
    },
    {
      title: 'Phần E. Đo lường',
      label: 'Bài',
      questions: [
        {
          type: 'fill',
          prompt: 'Đổi đơn vị độ dài:',
          marker: '1',
          items: [
            { t: '5 m = … cm', ans: 500 },
            { t: '600 cm = … m', ans: 6 },
            { t: '3 m 25 cm = … cm', ans: 325 },
            { t: '450 cm = … m … cm', ans: [4, 50] },
            { t: '2 m 19 cm = … cm', ans: 219 },
            { t: '800 cm = … m', ans: 8 },
            { t: '7 m = … cm', ans: 700 },
            { t: '1 m 60 cm = … cm', ans: 160 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Đổi đơn vị khối lượng:',
          marker: '1',
          items: [
            { t: '4 kg = … g', ans: 4000 },
            // sửa: đề in "2500 g = … kg" (không ra số tròn kg); ghi thành "… kg … g".
            { t: '2500 g = … kg … g', ans: [2, 500] },
            { t: '3 kg 400 g = … g', ans: 3400 },
            { t: '5200 g = … kg … g', ans: [5, 200] },
            { t: '2 kg 50 g = … g', ans: 2050 },
            { t: '7000 g = … kg', ans: 7 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Đổi đơn vị thời gian:',
          marker: '1',
          items: [
            { t: '2 giờ = … phút', ans: 120 },
            { t: '180 phút = … giờ', ans: 3 },
            { t: '3 ngày = … giờ', ans: 72 },
            { t: '1 tuần = … ngày', ans: 7 },
            { t: '48 giờ = … ngày', ans: 2 },
            { t: '2 tuần = … ngày', ans: 14 },
          ],
        },
      ],
    },
    {
      title: 'Phần F. Toán có lời văn',
      label: 'Bài',
      questions: [
        word({
          text: 'Một cửa hàng bán được 235 quyển vở buổi sáng và 187 quyển vở buổi chiều. Hỏi cả ngày cửa hàng bán được bao nhiêu quyển vở?',
          given: ['Buổi sáng bán 235 quyển vở.', 'Buổi chiều bán 187 quyển vở.'],
          ask: 'Cả ngày bán được bao nhiêu quyển vở?',
          hint: 'Gộp số vở của hai buổi lại: đó là phép cộng.',
          sentence: ['Cả ngày', 'cửa hàng bán được', 'số quyển vở', 'là:'],
          expr: { a: 235, op: '+', b: 187, result: 422, unit: 'quyển vở' },
          units: ['quyển vở', 'buổi', 'cửa hàng'],
        }),
        word({
          text: 'Trong kho có 600 kg gạo. Người ta đã lấy ra 245 kg gạo. Hỏi trong kho còn lại bao nhiêu ki-lô-gam gạo?',
          given: ['Kho có 600 kg gạo.', 'Đã lấy ra 245 kg gạo.'],
          ask: 'Trong kho còn lại bao nhiêu ki-lô-gam gạo?',
          hint: 'Lấy ra thì số gạo bớt đi: đó là phép trừ.',
          sentence: ['Trong kho', 'còn lại', 'số ki-lô-gam gạo', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 600, op: '−', b: 245, result: 355, unit: 'kg' },
          units: ['kg', 'g', 'kho'],
        }),
        word({
          text: 'Một thùng có 5 lít nước. Hỏi 7 thùng như vậy có tất cả bao nhiêu lít nước?',
          given: ['Mỗi thùng có 5 lít nước.', 'Có 7 thùng như vậy.'],
          ask: '7 thùng có tất cả bao nhiêu lít nước?',
          hint: '7 thùng, thùng nào cũng có 5 lít: lấy 5 lặp lại 7 lần, đó là phép nhân.',
          sentence: ['7 thùng', 'có tất cả', 'số lít nước', 'là:'],
          expr: { a: 5, op: '×', b: 7, result: 35, unit: 'l' },
          units: ['l', 'thùng', 'kg'],
        }),
        word({
          text: 'Có 48 cái kẹo chia đều cho 4 bạn. Hỏi mỗi bạn được mấy cái kẹo?',
          given: ['Có 48 cái kẹo.', 'Chia đều cho 4 bạn.'],
          ask: 'Mỗi bạn được mấy cái kẹo?',
          hint: 'Chia đều cho các bạn, mỗi bạn được bằng nhau: đó là phép chia.',
          sentence: ['Mỗi bạn', 'được số', 'cái kẹo', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 48, op: ':', b: 4, result: 12, unit: 'cái kẹo' },
          units: ['cái kẹo', 'bạn', 'gói'],
        }),
        {
          type: 'fill',
          prompt: 'Một mảnh vườn hình chữ nhật có chiều dài 12 m, chiều rộng 5 m. Tính chu vi mảnh vườn đó.',
          items: [{ t: 'Chu vi mảnh vườn là: (… + …) × 2 = … m', ans: [12, 5, 34] }],
        },
      ],
    },
    {
      title: 'Phần G. Thử thách',
      label: 'Bài',
      questions: [
        {
          type: 'fill',
          prompt: 'Thử thách:',
          marker: '1',
          items: [
            { t: 'Số lớn nhất có 3 chữ số là …', ans: 999 },
            { t: 'Số bé nhất có 3 chữ số là …', ans: 100 },
            { t: 'An có nhiều hơn Bình 28 viên bi. Bình có 47 viên bi. An có … viên bi.', ans: 75 },
            { t: 'Một đoạn dây dài 2 m 40 cm, Lan cắt đi 85 cm. Đoạn dây còn lại dài … cm.', ans: 155 },
          ],
        },
      ],
    },
  ],
};
