/** Đề kiểm tra Tuần 12 (Toán 3 Kết nối tri thức). Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 5–10. */

const S = 'stroke="#1f2937" stroke-width="2" fill="none"';
const T = 'font-size="14" fill="#1f2937"';

// Câu 4: bảng ba cột, cột thứ ba = cột thứ nhất × cột thứ hai.
const TABLE4 = `<svg viewBox="0 0 150 96" width="150" aria-hidden="true">
  <rect x="2" y="2" width="146" height="92" fill="#fff" ${S}/>
  <path d="M2 32.7 H148 M2 63.3 H148 M50.7 2 V94 M99.3 2 V94" ${S}/>
  ${[[2, 2, 4], [5, 4, 20], [6, '?', 30]].map((r, i) => r.map((v, k) => `<text x="${26.3 + k * 48.7}" y="${23 + i * 30.7}" text-anchor="middle" ${T}>${v}</text>`).join('')).join('')}
</svg>`;

// Câu 5: ba khung ô tô, vòng khoanh một số xe.
const car = (x, y) => `<g transform="translate(${x} ${y})">
  <path d="M2 12 q0 -4 4 -4 h4 l4 -6 h10 l5 6 h3 q4 0 4 4 v4 h-34 z" fill="#2dd4bf" stroke="#0f766e" stroke-width="1.2"/>
  <path d="M15 3 h8 l4 5 h-15 z" fill="#e0f2fe"/>
  <circle cx="10" cy="16" r="3.4" fill="#1f2937"/><circle cx="28" cy="16" r="3.4" fill="#1f2937"/></g>`;
const panel = (x, w, label, cars, ring) => `<g transform="translate(${x} 0)">
  <rect x="1" y="1" width="${w}" height="124" fill="#fff" stroke="#1f2937" stroke-width="1.5"/>
  <ellipse cx="${ring[0]}" cy="${ring[1]}" rx="${ring[2]}" ry="${ring[3]}" fill="none" stroke="#4f46e5" stroke-width="2"/>
  ${cars.map(([cx, cy]) => car(cx, cy)).join('')}
  <text x="${w / 2}" y="142" text-anchor="middle" ${T}>${label}</text></g>`;
const CARS = `<svg viewBox="0 0 400 150" width="400" aria-hidden="true">
  ${panel(0, 110, 'Hình a', [[10, 14], [10, 50], [10, 86], [64, 14], [64, 50], [64, 86]], [29, 62, 26, 56])}
  ${panel(126, 110, 'Hình b', [[12, 38], [12, 70], [64, 8], [64, 38], [64, 68], [64, 98]], [31, 62, 26, 40])}
  ${panel(252, 146, 'Hình c', [[10, 38], [10, 70], [62, 8], [62, 38], [62, 68], [62, 98], [104, 8], [104, 38], [104, 68], [104, 98]], [29, 62, 26, 40])}
</svg>`;

// Bài 11: tóm tắt, đoạn dây thứ nhất 15 cm, đoạn dây thứ hai gấp 3 lần, ? cm cả hai đoạn.
const ROPES = `<svg viewBox="0 0 330 92" width="320" aria-hidden="true">
  <text x="2" y="30" ${T}>Đoạn thứ nhất:</text>
  <text x="2" y="70" ${T}>Đoạn thứ hai:</text>
  <path d="M110 26 H160" ${S}/><path d="M110 19 V33 M160 19 V33" ${S}/>
  <text x="135" y="14" text-anchor="middle" font-size="12" fill="#1f2937">15 cm</text>
  <path d="M110 66 H260" ${S}/>${[110, 160, 210, 260].map(x => `<path d="M${x} 59 V73" ${S}/>`).join('')}
  <path d="M272 20 q8 0 8 10 v12 q0 4 6 4 q-6 0 -6 4 v12 q0 10 -8 10" ${S}/>
  <text x="290" y="51" font-size="13" fill="#1f2937">? cm</text>
</svg>`;

export default {
  id: 'tuan-12',
  title: 'Đề kiểm tra Tuần 12',
  short: 'Tuần 12',
  desc: 'Bài toán hai bước tính, gấp và giảm một số lần, một phần mấy, mi-li-mét',
  review: 'bài toán giải bằng hai bước tính, gấp và giảm một số lần và đổi đơn vị mi-li-mét',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Anh Bình 30 tuổi, bé An 5 tuổi. Tuổi anh Bình gấp tuổi bé An số lần là:', options: ['3', '6', '7', '4'], ans: 1 },
        { type: 'mc', prompt: 'Một chuyến tàu chở được 18 hành khách. Hỏi 5 chuyến tàu như thế chở được bao nhiêu hành khách?', options: ['90', '100', '50', '23'], ans: 0 },
        { type: 'mc', prompt: 'Trên sân trường có 7 cây bàng, số cây phượng vĩ gấp 3 lần số cây bàng. Hỏi trên sân trường có tất cả bao nhiêu cây bàng và cây phượng vĩ?', options: ['27', '28', '29', '10'], ans: 1 },
        { type: 'mc', prompt: 'Điền số thích hợp vào chỗ trống (dấu ?):', fig: TABLE4, options: ['5', '6', '7', '8'], ans: 0 },
        {
          type: 'fill',
          prompt: 'Đã khoanh vào một phần mấy số xe ô tô?',
          fig: CARS,
          items: [
            { t: 'Hình a: đã khoanh vào … số xe ô tô.', ans: '{1/2}', choices: ['{1/2}', '{1/3}', '{1/4}', '{1/5}'] },
            { t: 'Hình b: đã khoanh vào … số xe ô tô.', ans: '{1/3}', choices: ['{1/2}', '{1/3}', '{1/4}', '{1/5}'] },
            { t: 'Hình c: đã khoanh vào … số xe ô tô.', ans: '{1/5}', choices: ['{1/2}', '{1/3}', '{1/4}', '{1/5}'] },
          ],
        },
        { type: 'mc', prompt: 'Mẹ nuôi được 24 con gà, số vịt mẹ nuôi nhiều gấp 3 lần số gà. Hỏi mẹ đã nuôi được tất cả bao nhiêu con gà và con vịt?', options: ['72 con', '27 con', '54 con', '96 con'], ans: 3 },
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S',
          items: [
            'Các đơn vị đo bé hơn mét là xăng-ti-mét, đề-xi-mét, mi-li-mét',
            'Độ dài một gang tay người khoảng 20 mm',
            'Bề dày quyển vở khoảng 5 mm',
          ],
          ans: ['Đ', 'S', 'Đ'],
        },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        {
          type: 'table',
          prompt: 'Viết số thích hợp vào chỗ trống:',
          head: ['Số đã cho', 'Gấp 6 lần', 'Giảm 6 lần'],
          transpose: true,
          rows: [[12, '…', '…'], [18, '…', '…'], [42, '…', '…'], [36, '…', '…']],
          ans: [[72, 2], [108, 3], [252, 7], [216, 6]],
        },
        {
          type: 'match',
          prompt: 'Hãy tiêu diệt những con virus để đẩy lùi dịch bệnh Covid-19 bằng cách nối các kết quả có giá trị bằng nhau:',
          heads: ['Bình xịt', 'Virus'],
          left: ['50 mm', '5000 mm', '500 mm'],
          right: ['50 cm', '5 cm', '500 cm'],
          ans: [1, 2, 0],
        },
        {
          type: 'match',
          prompt: 'Nối (theo mẫu: 3 cm 3 mm nối với 33 mm)',
          heads: ['Bướm', 'Hoa'],
          left: ['3 cm 3 mm', '3 dm 3 mm', '3 dm 3 cm', '3 m 3 dm', '3 m 3 cm', '3 dm'],
          right: ['33 cm', '33 mm', '303 mm', '33 dm', '303 cm', '300 mm'],
          ans: [1, 2, 0, 3, 4, 5],
        },
        {
          type: 'fill',
          prompt: 'Số:',
          items: [
            { t: '2 cm = … mm', ans: 20 },
            { t: '… cm = 40 mm', ans: 4 },
            { t: '3 cm 2 mm = … mm', ans: 32 },
            { t: '4 dm = … mm', ans: 400 },
            { t: '800 mm = … dm', ans: 8 },
            { t: '4 dm 1 mm = … mm', ans: 401 },
            { t: '3 m = … mm', ans: 3000 },
            { t: '200 mm = … cm', ans: 20 },
            { t: '502 mm = … dm … mm', ans: [5, 2] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết đơn vị vào chỗ chấm cho thích hợp?',
          items: [
            { t: 'Chú ong dài khoảng 30 …', ans: 'mm', choices: ['mm', 'cm', 'dm', 'm'] },
            { t: 'Hộp bút dài khoảng 30 …', ans: 'cm', choices: ['mm', 'cm', 'dm', 'm'] },
            { t: 'Ngôi nhà cao khoảng 6 …', ans: 'm', choices: ['mm', 'cm', 'dm', 'm'] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Lớp 3A có 3 tổ mỗi tổ có 9 bạn và tổ thứ tư chỉ có 8 bạn. Hỏi lớp 3A có tất cả bao nhiêu học sinh?',
          items: [
            { t: 'Ba tổ đầu có số học sinh là: … học sinh', ans: 27 },
            { t: 'Lớp 3A có tất cả số học sinh là: … học sinh', ans: 35 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Có hai thùng dầu, mỗi thùng chứa 12 l. Nếu đổ 4 l dầu ở thùng thứ hai sang thùng thứ nhất thì số dầu ở thùng thứ nhất gấp mấy lần số dầu ở thùng thứ hai?',
          items: [
            { t: 'Sau khi đổ, thùng thứ nhất có: … l', ans: 16 },
            { t: 'Sau khi đổ, thùng thứ hai còn: … l', ans: 8 },
            { t: 'Số dầu ở thùng thứ nhất gấp số dầu ở thùng thứ hai số lần là: … lần', ans: 2 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Cửa hàng có 120 kg gạo. Cửa hàng mua thêm 3 bao gạo, biết mỗi bao nặng 50 kg. Hỏi cửa hàng có tất cả bao nhiêu ki-lô-gam gạo?',
          items: [
            { t: '3 bao gạo nặng là: … kg', ans: 150 },
            { t: 'Cửa hàng có tất cả số gạo là: … kg', ans: 270 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Một câu lạc bộ năng khiếu có ba lớp đàn, võ và vẽ. Trong đó có 52 học sinh tham gia học đàn. Số bạn tham gia học võ bằng {1/4} số học sinh học đàn. Số học sinh tham gia vẽ gấp đôi số bạn học võ. Hỏi:',
          items: [
            { t: 'Có bao nhiêu học sinh học võ? … học sinh', ans: 13 },
            { t: 'Có bao nhiêu học sinh học vẽ? … học sinh', ans: 26 },
            { t: 'Câu lạc bộ có tất cả bao nhiêu học sinh? … học sinh', ans: 91 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Tuổi bố gấp 10 lần tuổi con. Tuổi của mẹ gấp 8 lần tuổi con. Bố hơn mẹ 8 tuổi. Hỏi:',
          items: [
            { t: 'Con bao nhiêu tuổi? … tuổi', ans: 4 },
            { t: 'Mẹ bao nhiêu tuổi? … tuổi', ans: 32 },
          ],
        },
        // Đề in: "Dựa vào tóm tắt, nêu bài toán và giải". Trên máy đưa sẵn bài toán đúng tóm tắt để bé giải.
        {
          type: 'fill',
          prompt: 'Dựa vào tóm tắt, nêu bài toán và giải bài toán sau. Bài toán: Đoạn dây thứ nhất dài 15 cm, đoạn dây thứ hai dài gấp 3 lần đoạn dây thứ nhất. Hỏi cả hai đoạn dây dài bao nhiêu xăng-ti-mét?',
          fig: ROPES,
          items: [
            { t: 'Đoạn dây thứ hai dài là: … cm', ans: 45 },
            { t: 'Cả hai đoạn dây dài là: … cm', ans: 60 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Có 2 bao gạo. Bao thứ nhất nặng 10 kg. Bao thứ hai nặng gấp 3 lần bao thứ nhất. Hỏi cả 2 bao nặng bao nhiêu ki-lô-gam?',
          items: [
            { t: 'Bao thứ hai nặng là: … kg', ans: 30 },
            { t: 'Cả 2 bao nặng là: … kg', ans: 40 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Tích của hai số là 15. Nếu thừa số thứ nhất tăng lên 3 lần, thừa số thứ hai tăng lên 2 lần thì tích mới là bao nhiêu?',
          items: [
            { t: 'Tăng thừa số thứ nhất lên 3 lần thì tích là: … ', ans: 45 },
            { t: 'Tăng tiếp thừa số thứ hai lên 2 lần thì tích mới là: …', ans: 90 },
          ],
        },
        { type: 'fill', prompt: 'Điền số thích hợp vào ô trống', items: [{ t: '49 × 2 &lt; 3 × □ &lt; 20 × 5', ans: 33 }] },
      ],
    },
  ],
};
