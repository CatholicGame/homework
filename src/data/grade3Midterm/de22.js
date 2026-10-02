/** Đề số 22. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 24. */

/** Mặt đồng hồ chỉ h giờ m phút; kim dừng trước vòng số. */
const clock = (h, m) => {
  const c = 80, nums = [];
  for (let i = 1; i <= 12; i++) {
    const a = (i * 30 - 90) * Math.PI / 180;
    nums.push(`<text x="${(c + 56 * Math.cos(a)).toFixed(1)}" y="${(c + 56 * Math.sin(a) + 5).toFixed(1)}" font-size="14" fill="#1f2937" text-anchor="middle">${i}</text>`);
  }
  const hand = (deg, len, w) => {
    const a = (deg - 90) * Math.PI / 180;
    return `<line x1="${c}" y1="${c}" x2="${(c + len * Math.cos(a)).toFixed(1)}" y2="${(c + len * Math.sin(a)).toFixed(1)}" stroke="#1f2937" stroke-width="${w}" stroke-linecap="round"/>`;
  };
  return `<svg viewBox="0 0 160 160" width="160"><circle cx="${c}" cy="${c}" r="74" stroke="#1f2937" stroke-width="3" fill="none"/>${nums.join('')}${hand((h % 12) * 30 + m / 2, 28, 4)}${hand(m * 6, 42, 2.5)}<circle cx="${c}" cy="${c}" r="3" fill="#1f2937"/></svg>`;
};

export default {
  id: 'de-22',
  title: 'Đề số 22',
  short: 'Đề 22',
  desc: 'Nhân chia, một phần mấy, phép chia có dư, xem đồng hồ, giảm đi nhiều lần',
  review: 'phép chia có dư, xem đồng hồ và giảm một số đi nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Kết quả của phép tính 53 × 4 là:', options: ['512', '212', '202', '221'], ans: 1 },
        { type: 'mc', prompt: 'Kết quả của phép tính 42 : 7 + 5 là:', options: ['6', '10', '12', '11'], ans: 3 },
        { type: 'mc', prompt: 'Kết quả của x trong phép tính 63 : x = 7 là:', options: ['441', '9', '442', '70'], ans: 1 },
        { type: 'mc', prompt: '{1/5} của 45 m là:', options: ['8 m', '7 m', '6 m', '9 m'], ans: 3 },
        { type: 'mc', prompt: 'Trong phép chia có dư với số chia là 4, số dư lớn nhất của phép chia đó là:', options: ['1', '2', '3', '4'], ans: 2 },
        { type: 'mc', prompt: 'Đồng hồ chỉ:', fig: clock(1, 25), options: ['1 giờ 50 phút', '5 giờ 10 phút', '1 giờ 25 phút', '2 giờ 5 phút'], ans: 2 },
        { type: 'mc', prompt: 'Em có 26 quyển vở, sau khi dùng thì số vở của em giảm đi 2 lần. Hỏi em đã dùng mấy quyển vở?', options: ['24', '20', '12', '13'], ans: 3 },
        { type: 'mc', prompt: '6 m 4 cm = … cm. Số thích hợp để điền vào chỗ chấm là:', options: ['64', '604', '640', '6400'], ans: 1 },
      ],
    },
    {
      title: 'Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['137 + 125', '316 − 108', '27 × 5', '96 : 3'] },
        { type: 'findx', prompt: 'Tìm x:', items: ['X × 6 = 54', '49 : X = 7'] },
        { type: 'calc', prompt: 'Tính:', items: ['15 × 4 − 28', '36 : 3 + 129'] },
        {
          type: 'word',
          text: 'Một cửa hàng ngày đầu bán được 28 kg đường. Ngày thứ hai bán gấp đôi ngày đầu. Hỏi ngày thứ hai cửa hàng bán được bao nhiêu ki-lô-gam đường?',
          given: ['Ngày đầu bán được 28 kg đường.', 'Ngày thứ hai bán gấp đôi ngày đầu.'],
          ask: 'Ngày thứ hai bán được bao nhiêu ki-lô-gam đường?',
          hint: 'Gấp đôi là gấp 2 lần, nên lấy 28 nhân với 2.',
          sentence: ['Ngày thứ hai', 'cửa hàng bán được số', 'ki-lô-gam đường', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 28, op: '×', b: 2, result: 56, unit: 'kg' },
          units: ['kg', 'ngày', 'lần'],
        },
      ],
    },
  ],
};
