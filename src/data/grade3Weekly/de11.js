/** Đề kiểm tra Tuần 11 (Toán 3 Kết nối tri thức). Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 1–4. */

const S = 'stroke="#1f2937" stroke-width="2" fill="none"';
const T = 'font-size="14" fill="#1f2937"';

// Bài 4: tóm tắt, cả đoạn 36 phút chia 4 phần bằng nhau, ? phút là một phần.
const SUM36 = `<svg viewBox="0 0 280 96" width="280" aria-hidden="true">
  <path d="M20 40 Q140 6 260 40" stroke="#1f2937" stroke-width="1.5" fill="none" stroke-dasharray="6 4"/>
  <text x="140" y="18" text-anchor="middle" ${T}>36 phút</text>
  <path d="M20 48 H260" ${S}/>
  ${[20, 80, 140, 200, 260].map(x => `<path d="M${x} 41 V55" ${S}/>`).join('')}
  <path d="M20 74 H80" ${S}/><path d="M20 67 V81 M80 67 V81" ${S}/>
  <text x="50" y="94" text-anchor="middle" ${T}>? phút</text>
</svg>`;

// Bài 11: đoạn thẳng AB đặt trên thước, vạch 0 trùng điểm A.
const RULER_AB = `<svg viewBox="0 0 280 92" width="300" aria-hidden="true">
  <circle cx="16" cy="22" r="3" fill="#1f2937"/><circle cx="256" cy="22" r="3" fill="#1f2937"/>
  <path d="M16 22 H256" ${S}/>
  <text x="10" y="14" ${T}>A</text><text x="252" y="14" ${T}>B</text>
  <rect x="6" y="34" width="268" height="40" rx="4" fill="#fef9c3" stroke="#1f2937" stroke-width="1.5"/>
  ${Array.from({ length: 13 }, (_, i) => `<path d="M${16 + i * 20} 34 V48" stroke="#1f2937" stroke-width="1.5"/><text x="${16 + i * 20}" y="66" text-anchor="middle" font-size="11" fill="#1f2937">${i}</text>`).join('')}
  ${Array.from({ length: 12 }, (_, i) => `<path d="M${26 + i * 20} 34 V41" stroke="#1f2937" stroke-width="1"/>`).join('')}
  <text x="262" y="86" font-size="11" fill="#1f2937">cm</text>
</svg>`;

export default {
  id: 'tuan-11',
  title: 'Đề kiểm tra Tuần 11',
  short: 'Tuần 11',
  desc: 'Chia số có hai chữ số cho số có một chữ số, giảm một số đi một số lần, một phần mấy',
  review: 'phép chia số có hai chữ số, giảm một số đi một số lần và một phần mấy',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Kết quả của phép chia 48 : 3 là:', options: ['13', '14', '16', '15'], ans: 2 },
        { type: 'mc', prompt: 'Cho: 81 : … = 3. Số thích hợp điền vào chỗ chấm là:', options: ['27', '25', '17', '16'], ans: 0 },
        { type: 'mc', prompt: 'Hoa có 45 cái kẹo. Hoa chia cho Hồng {1/3} số kẹo Hoa có. Hỏi Hồng được chia bao nhiêu cái kẹo?', options: ['30 cái kẹo', '15 cái kẹo', '16 cái kẹo', '20 cái kẹo'], ans: 1 },
        { type: 'mc', prompt: '{1/2} của một giờ bằng bao nhiêu phút?', options: ['12 phút', '30 phút', '10 phút', '20 phút'], ans: 1 },
        { type: 'mc', prompt: 'Bố đi công tác 2 tuần lễ và 5 ngày. Hỏi bố đi công tác tất cả bao nhiêu ngày?', options: ['7 ngày', '10 ngày', '14 ngày', '19 ngày'], ans: 3 },
        { type: 'mc', prompt: 'Mai có số bông hoa bằng số bông hoa của Hà giảm đi 4 lần. Biết số hoa của Hà là 96 bông. Tìm số hoa của Mai.', options: ['100 bông', '24 bông', '42 bông', '92 bông'], ans: 1 },
        // sửa: bản in có hai phân số {1/2} chồng lên nhau, giữ một.
        { type: 'mc', prompt: 'Cửa hàng có 58 l dầu, cửa hàng đã bán đi {1/2} số dầu đó. Hỏi cửa hàng đã bán đi bao nhiêu lít dầu?', options: ['29 l', '24 l', '26 l', '30 l'], ans: 0 },
        {
          type: 'pick',
          prompt: 'Khoanh vào {1/2} số cái bánh và {1/4} số cái bút:',
          items: [
            { prompt: 'a) {1/2} số cái bánh:', icon: 'cake', count: 6, cols: 3, ans: 3 },
            { prompt: 'b) {1/4} số cái bút:', icon: 'pen', count: 8, cols: 4, ans: 2 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Một lớp có 38 học sinh đi liên hoan bằng xe taxi. Biết mỗi xe chở được 4 học sinh. Hỏi cô giáo cần gọi bao nhiêu xe để chở hết cả lớp?',
          items: [{ t: 'Trả lời: Để chở hết cả lớp, cô giáo cần gọi … xe taxi.', ans: 10 }],
        },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính', col: true, items: ['84 : 6', '52 : 2', '77 : 3', '98 : 3'] },
        {
          type: 'chain',
          prompt: 'Số?',
          items: [
            { start: 45, steps: [{ op: ': 9', label: 'giảm 9 lần' }, { op: '+ 85', label: 'thêm 85 đơn vị' }] },
            { start: 48, steps: [{ op: ': 6', label: 'giảm 6 lần' }, { op: '− 2', label: 'bớt 2 đơn vị' }] },
            { start: 2, steps: [{ op: '× 4', label: 'gấp 4 lần' }, { op: ': 2', label: 'giảm 2 lần' }] },
            { start: 56, steps: [{ op: ': 7', label: 'giảm 7 lần' }, { op: '× 3', label: 'gấp 3 lần' }] },
            { start: 56, blank: [0, 2], steps: [{ op: ': 7', label: 'giảm 7 lần' }, { op: '× 5', label: 'gấp 5 lần' }, { op: ': 4', label: 'giảm … lần', ans: 4 }] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Tìm thành phần chưa biết trong các phép tính sau:',
          items: ['72 : □ = 3', '9 × □ = 63', '□ × 10 = 80', '54 : □ = 9'],
        },
        // Đề in: "Đặt đề toán theo tóm tắt sau rồi giải". Trên máy đưa sẵn một đề toán đúng tóm tắt để bé giải.
        {
          type: 'word',
          fig: SUM36,
          text: 'Đặt đề toán theo tóm tắt rồi giải. Đề toán: Lan làm xong 4 bài toán hết 36 phút, thời gian làm mỗi bài như nhau. Hỏi Lan làm mỗi bài toán hết bao nhiêu phút?',
          given: ['4 bài toán hết 36 phút.', 'Mỗi bài làm trong thời gian như nhau.'],
          ask: 'Mỗi bài toán làm hết bao nhiêu phút?',
          hint: 'Chia 36 phút thành 4 phần bằng nhau thì lấy 36 chia cho 4.',
          sentence: ['Lan làm', 'mỗi bài toán', 'hết số phút', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 36, op: ':', b: 4, result: 9, unit: 'phút' },
          units: ['phút', 'giờ', 'bài'],
        },
        // sửa: đề gốc ghi cửa "90 : 3" (= 30, không có chìa khóa nào); đổi thành "9 : 3" để khớp chìa khóa số 3.
        {
          type: 'match',
          prompt: 'Giúp Conan tìm đúng chìa khóa để mở cửa:',
          scene: 'doors',
          left: [
            '96 giảm 3 lần rồi bớt đi 27 đơn vị',
            '35 giảm đi 5 lần rồi lại giảm tiếp 7 lần',
            '50 : 5',
            '9 : 3',
          ],
          right: ['10', '1', '5', '3'],
          ans: [2, 1, 0, 3],
        },
        {
          type: 'word',
          text: 'Mẹ có 18 quả cam, mẹ chia cho Lan {1/3} số cam mà mẹ có. Hỏi Lan có bao nhiêu quả cam?',
          given: ['Mẹ có 18 quả cam.', 'Lan được {1/3} số cam.'],
          ask: 'Lan có bao nhiêu quả cam?',
          hint: 'Tìm {1/3} của 18 thì lấy 18 chia cho 3.',
          sentence: ['Lan có', 'số', 'quả cam', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 18, op: ':', b: 3, result: 6, unit: 'quả cam' },
          units: ['quả cam', 'phần', 'lần'],
        },
        {
          type: 'fill',
          prompt: 'Đoạn thẳng AB dài 2 dm 4 cm. Đoạn thẳng CD dài gấp 2 lần đoạn thẳng AB bớt 3 cm. Độ dài đoạn thẳng CD là bao nhiêu xăng-ti-mét?',
          items: [
            { t: 'Đổi: 2 dm 4 cm = … cm', ans: 24 },
            { t: 'Gấp 2 lần đoạn thẳng AB được: … cm', ans: 48 },
            { t: 'Độ dài đoạn thẳng CD là: … cm', ans: 45 },
          ],
        },
        {
          type: 'word',
          text: 'Hằng ngày Hải phải đi bộ tới trường với thời gian là {1/5} giờ. Hỏi thời gian mà Hải đi từ nhà tới trường là bao nhiêu phút?',
          given: ['Hải đi bộ tới trường hết {1/5} giờ.', '1 giờ = 60 phút.'],
          ask: 'Hải đi từ nhà tới trường hết bao nhiêu phút?',
          hint: '{1/5} giờ là 60 phút chia cho 5.',
          sentence: ['Thời gian', 'Hải đi từ nhà', 'tới trường', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 60, op: ':', b: 5, result: 12, unit: 'phút' },
          units: ['phút', 'giờ', 'ngày'],
        },
        {
          type: 'word',
          text: 'Một cửa hàng ngày thứ nhất bán được 69 quyển sách, số quyển sách bán được trong ngày thứ hai giảm đi 3 lần so với ngày thứ nhất. Hỏi ngày thứ hai cửa hàng đó bán được bao nhiêu quyển sách?',
          given: ['Ngày thứ nhất bán 69 quyển sách.', 'Ngày thứ hai giảm đi 3 lần so với ngày thứ nhất.'],
          ask: 'Ngày thứ hai bán được bao nhiêu quyển sách?',
          hint: 'Giảm 69 đi 3 lần thì lấy 69 chia cho 3.',
          sentence: ['Ngày thứ hai', 'cửa hàng bán được', 'số quyển sách', 'là:'],
          decoys: ['cả hai ngày'],
          expr: { a: 69, op: ':', b: 3, result: 23, unit: 'quyển sách' },
          units: ['quyển sách', 'ngày', 'lần'],
        },
        {
          type: 'fill',
          prompt: 'Năm nay bố 45 tuổi, biết tuổi bố giảm đi 5 lần thì được tuổi con và tuổi bố giảm đi 5 tuổi thì bằng tuổi mẹ. Hỏi mẹ bao nhiêu tuổi? Con bao nhiêu tuổi?',
          items: [
            { t: 'Tuổi mẹ là: … tuổi', ans: 40 },
            { t: 'Tuổi con là: … tuổi', ans: 9 },
          ],
        },
        // sửa: đoạn AB in dài khoảng 10,6 cm (không chia hết cho 3), vẽ lại AB = 12 cm trên thước.
        // Ý a, b ghi trong lời đề; bé vẽ đoạn MN ở ý c (đáp án 12 : 3 = 4 cm).
        {
          type: 'draw',
          prompt: 'a) Đo độ dài đoạn thẳng AB. b) Giảm độ dài đoạn thẳng AB đi 3 lần thì được độ dài đoạn thẳng MN.',
          fig: RULER_AB,
          items: [{ prompt: 'c) Hãy vẽ đoạn thẳng MN đó.', name: 'MN', len: 4 }],
        },
      ],
    },
  ],
};
