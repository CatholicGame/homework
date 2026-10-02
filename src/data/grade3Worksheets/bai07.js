/**
 * Phiếu bài tập Bài 7: Ôn tập hình học và đo lường.
 * Nguồn: docs/lop_3/De_thi/Bài 7_ Ôn tập hình học và đo lường - Toán LỚP 3 (Có File Tải Về).pdf
 * Bỏ phần "Em tự đánh giá", "Điểm / Nhận xét" cuối phiếu (đã có ô điểm, lời phê ở đầu phiếu).
 */

const ST = 'stroke="#1f2937" stroke-width="2.5" fill="none"';
const lbl = (x, y, t) => `<text x="${x}" y="${y}" font-size="15" font-weight="700" fill="#1f2937" text-anchor="middle">${t}</text>`;

// Hình 1: hình vuông chia 2 × 2. Hình 2: tam giác ABC, đường CD từ đỉnh xuống cạnh AB.
const FIG_COUNT = `<svg viewBox="0 0 400 190" width="400" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  <g transform="translate(26 24)">
    <rect x="0" y="0" width="140" height="140" ${ST}/><path d="M70 0 V140 M0 70 H140" ${ST}/>
    ${lbl(-12, 4, 'G')}${lbl(70, -8, 'H')}${lbl(152, 4, 'I')}${lbl(-12, 75, 'D')}${lbl(80, 64, 'E')}${lbl(152, 75, 'F')}${lbl(-12, 150, 'A')}${lbl(70, 158, 'B')}${lbl(152, 150, 'C')}
    ${lbl(70, 182, 'Hình 1')}
  </g>
  <g transform="translate(224 24)">
    <path d="M0 140 L150 140 L75 0 Z M75 0 V140" ${ST}/>
    ${lbl(-10, 146, 'A')}${lbl(160, 146, 'B')}${lbl(75, -8, 'C')}${lbl(75, 158, 'D')}
    ${lbl(75, 182, 'Hình 2')}
  </g>
</svg>`;

// Đồng hồ có số; kim dừng trước vòng số. h, m: giờ, phút.
function clock(cx, h, m, name) {
  const R = 62, ang = (deg) => ((deg - 90) * Math.PI) / 180;
  const nums = Array.from({ length: 12 }, (_, i) => {
    const a = ang((i + 1) * 30);
    return `<text x="${(cx + 49 * Math.cos(a)).toFixed(1)}" y="${(80 + 49 * Math.sin(a) + 5).toFixed(1)}" font-size="13" font-weight="700" fill="#1f2937" text-anchor="middle">${i + 1}</text>`;
  }).join('');
  const hand = (deg, len, w, c) => `<line x1="${cx}" y1="80" x2="${(cx + len * Math.cos(ang(deg))).toFixed(1)}" y2="${(80 + len * Math.sin(ang(deg))).toFixed(1)}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  return `<circle cx="${cx}" cy="80" r="${R}" fill="#fff" stroke="#1f2937" stroke-width="3"/>${nums}
    ${hand((h % 12) * 30 + m / 2, 24, 5, '#1f2937')}${hand(m * 6, 36, 3, '#dc2626')}<circle cx="${cx}" cy="80" r="3.5" fill="#1f2937"/>
    ${lbl(cx, 164, name)}`;
}
// sửa: đồng hồ 2 của đề có kim giờ chỉ giữa số 1 và số 2 trong khi kim phút chỉ số 12; vẽ kim giờ chỉ đúng số 2.
const FIG_CLOCKS = `<svg viewBox="0 0 330 172" width="330" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  ${clock(80, 12, 15, 'Đồng hồ 1')}${clock(250, 2, 0, 'Đồng hồ 2')}
</svg>`;

export default {
  id: 'bai-7',
  title: 'Bài 7: Ôn tập hình học và đo lường',
  short: 'Bài 7',
  desc: 'Nhận biết hình, đếm hình, chu vi, đổi đơn vị đo, xem đồng hồ',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phiếu bài tập',
      label: 'Bài',
      questions: [
        {
          type: 'mc',
          prompt: 'Nhận biết hình. Khoanh vào chữ cái trước đáp án đúng.',
          items: [
            { prompt: '1. Hình nào có 4 cạnh bằng nhau và 4 góc vuông?', options: ['Hình chữ nhật', 'Hình vuông', 'Hình tam giác', 'Hình tròn'], ans: 1 },
            { prompt: '2. Hình nào có 3 cạnh?', options: ['Hình tròn', 'Hình vuông', 'Hình tam giác', 'Hình chữ nhật'], ans: 2 },
            { prompt: '3. Hình nào không có cạnh?', options: ['Hình vuông', 'Hình chữ nhật', 'Hình tam giác', 'Hình tròn'], ans: 3 },
            { prompt: '4. Hình chữ nhật có bao nhiêu cạnh?', options: ['2', '3', '4', '5'], ans: 2 },
            { prompt: '5. Hình tam giác có bao nhiêu đỉnh?', options: ['2', '3', '4', '5'], ans: 1 },
          ],
        },
        // sửa: đề hỏi "có bao nhiêu hình chữ nhật" ở Hình 1, ghi rõ "kể cả hình vuông" để đáp án là một số (9).
        {
          type: 'fill',
          prompt: 'Đếm hình:',
          fig: FIG_COUNT,
          items: [
            { t: 'Hình 1 có … hình vuông.', ans: 5 },
            { t: 'Hình 1 có … hình chữ nhật (kể cả hình vuông).', ans: 9 },
            { t: 'Hình 2 có … hình tam giác.', ans: 3 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Tính chu vi:',
          marker: '1',
          items: [
            { t: 'Hình tam giác có các cạnh dài 5 cm, 6 cm, 7 cm. Chu vi: … cm', ans: 18 },
            { t: 'Hình tam giác có các cạnh dài 4 cm, 8 cm, 5 cm. Chu vi: … cm', ans: 17 },
            { t: 'Hình vuông có cạnh dài 8 cm. Chu vi: … cm', ans: 32 },
            { t: 'Hình vuông có cạnh dài 9 cm. Chu vi: … cm', ans: 36 },
            { t: 'Hình chữ nhật có chiều dài 10 cm, chiều rộng 5 cm. Chu vi: … cm', ans: 30 },
            { t: 'Hình chữ nhật có chiều dài 12 cm, chiều rộng 4 cm. Chu vi: … cm', ans: 32 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Đổi đơn vị đo độ dài. Điền số thích hợp.',
          marker: '1',
          items: [
            { t: '1 m = … cm', ans: 100 },
            { t: '4 m = … cm', ans: 400 },
            { t: '700 cm = … m', ans: 7 },
            { t: '2 m 35 cm = … cm', ans: 235 },
            { t: '5 m 20 cm = … cm', ans: 520 },
            { t: '180 cm = … m … cm', ans: [1, 80] },
            { t: '250 cm = … m … cm', ans: [2, 50] },
            { t: '900 cm = … m', ans: 9 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Đổi đơn vị khối lượng. Điền số thích hợp.',
          marker: '1',
          items: [
            { t: '1 kg = … g', ans: 1000 },
            { t: '3 kg = … g', ans: 3000 },
            { t: '7 kg = … g', ans: 7000 },
            { t: '2500 g = … kg … g', ans: [2, 500] },
            { t: '4300 g = … kg … g', ans: [4, 300] },
            { t: '6 kg 500 g = … g', ans: 6500 },
            { t: '8 kg 200 g = … g', ans: 8200 },
            { t: '9000 g = … kg', ans: 9 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Đổi đơn vị thời gian:',
          marker: '1',
          items: [
            { t: '1 giờ = … phút', ans: 60 },
            { t: '2 giờ = … phút', ans: 120 },
            { t: '3 giờ = … phút', ans: 180 },
            { t: '120 phút = … giờ', ans: 2 },
            { t: '180 phút = … giờ', ans: 3 },
            { t: '1 ngày = … giờ', ans: 24 },
            { t: '1 tuần = … ngày', ans: 7 },
            { t: '2 ngày = … giờ', ans: 48 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Xem đồng hồ:',
          fig: FIG_CLOCKS,
          items: [
            { t: 'Đồng hồ 1: … giờ … phút', ans: [12, 15] },
            { t: 'Đồng hồ 2: … giờ', ans: 2 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Toán có lời văn:',
          items: [
            { t: '1. Một sợi dây dài 18 m. Người ta cắt đi 7 m. Sợi dây còn lại dài … m.', ans: 11 },
            { t: '2. Một bao gạo nặng 27 kg, một bao ngô nặng 16 kg. Cả hai bao nặng … kg.', ans: 43 },
            { t: '3. Một hình vuông có cạnh dài 9 cm. Chu vi hình vuông đó là … cm.', ans: 36 },
            { t: '4. Mai bắt đầu học bài lúc 18 giờ 30 phút và kết thúc lúc 19 giờ 15 phút. Mai học bài trong … phút.', ans: 45 },
          ],
        },
        {
          type: 'compare',
          prompt: 'Điền dấu >, < hoặc =',
          marker: '1',
          items: [
            { t: '2 m □ 180 cm', ans: '>' },
            { t: '5 kg □ 4500 g', ans: '>' },
            { t: '90 phút □ 1 giờ 30 phút', ans: '=' },
            { t: '72 giờ □ 3 ngày', ans: '=' },
            { t: '8 m □ 750 cm', ans: '>' },
            { t: '3200 g □ 3 kg 200 g', ans: '=' },
            { t: '1 tuần □ 7 ngày', ans: '=' },
            { t: '240 phút □ 4 giờ', ans: '=' },
          ],
        },
        {
          type: 'fill',
          prompt: 'Thử thách:',
          marker: '1',
          items: [
            { t: 'Chu vi hình vuông cạnh 12 cm là … cm.', ans: 48 },
            { t: 'Chu vi hình chữ nhật dài 15 cm, rộng 6 cm là … cm.', ans: 42 },
            { t: 'Một đoạn dây dài 6 m. Cắt đi 250 cm. Đoạn dây còn lại dài … cm.', ans: 350 },
            { t: '5 ngày bằng … giờ.', ans: 120 },
            { t: 'Hình có 4 cạnh bằng nhau và 4 góc vuông là hình ….', ans: 'vuông', choices: ['vuông', 'chữ nhật', 'tam giác', 'tròn'] },
          ],
        },
      ],
    },
  ],
};
