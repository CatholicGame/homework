/** Phiếu ôn tập cuối Tuần 17. Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 30–34. */

// Kẹo Bài 1: bốn chiếc kẹo, chữ cái trên, phép tính trong nhãn trắng.
const candy = (cx, letter, expr) => `
  <text x="${cx}" y="16" font-size="14" font-weight="700" text-anchor="middle" fill="#1f2937">${letter}</text>
  <path d="M${cx - 34} 55 L${cx - 54} 38 L${cx - 54} 72 Z M${cx + 34} 55 L${cx + 54} 38 L${cx + 54} 72 Z" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <ellipse cx="${cx}" cy="55" rx="36" ry="27" fill="#ef4444" stroke="#991b1b" stroke-width="1.5"/>
  <rect x="${cx - 30}" y="45" width="60" height="20" rx="4" fill="#fff" stroke="#991b1b" stroke-width="1"/>
  <text x="${cx}" y="60" font-size="13" text-anchor="middle" fill="#1f2937">${expr}</text>`;
const CANDIES = `<svg viewBox="0 0 440 92" width="320" xmlns="http://www.w3.org/2000/svg">${
  candy(56, 'A', '800 : 4') + candy(164, 'B', '200 : 2') + candy(272, 'C', '60 × 2') + candy(380, 'D', '400 : 2')}</svg>`;

export default {
  id: 'tuan-17',
  title: 'Đề kiểm tra Tuần 17',
  short: 'Tuần 17',
  desc: 'Nhân, chia trong phạm vi 1000, biểu thức số, gấp một số lên nhiều lần, một phần mấy',
  review: 'phép nhân, phép chia trong phạm vi 1000 và tính giá trị biểu thức',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Một giờ gấp 5 phút số lần là:', options: ['20 lần', '15 lần', '10 lần', '12 lần'], ans: 3 },
        // sửa: đề in phương án "15 lần, 49 lần, 70 lần, 17 lần" cho câu hỏi về lít, đổi đơn vị thành l.
        { type: 'mc', prompt: 'Gấp 7 lần của 10 lít là:', options: ['15 l', '49 l', '70 l', '17 l'], ans: 2 },
        { type: 'mc', prompt: 'Giá trị biểu thức 84 − 12 × 3 là:', options: ['48', '216', '120', '100'], ans: 0 },
        { type: 'mc', prompt: 'Con năm nay 5 tuổi. Tuổi của mẹ gấp 6 lần tuổi con. Hỏi mẹ bao nhiêu tuổi?', options: ['11 tuổi', '30 tuổi', '56 tuổi', '28 tuổi'], ans: 1 },
        {
          type: 'pick',
          prompt: 'Khoanh vào {1/7} số con mèo trong các hình sau:',
          items: [
            { prompt: 'a)', icon: 'cat', count: 14, cols: 5, ans: 2 },
            { prompt: 'b)', icon: 'cat', count: 7, cols: 4, ans: 1 },
            { prompt: 'c)', icon: 'cat', count: 21, cols: 7, ans: 3 },
          ],
        },
        {
          type: 'match',
          prompt: 'Nối biểu thức với giá trị của biểu thức đó:',
          heads: ['Biểu thức', 'Giá trị'],
          left: ['428 + 237', '948 − 293', '137 × 5', '225 × 3', '15 × 9 × 5', '35 × 5 + 490'],
          right: ['655', '665', '675', '685'],
          ans: [1, 0, 3, 2, 2, 1],
          multi: true,
        },
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S:',
          items: ['15 × 1 + 9 = 150', '120 − 10 + 10 = 100', '10 × 10 + 10 = 110', '45 × (10 − 5) = 225'],
          ans: ['S', 'S', 'Đ', 'Đ'],
        },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        {
          type: 'tf',
          prompt: 'Tìm giúp bạn Bi những chiếc kẹo có giá trị là 200. Kẹo có giá trị 200 ghi Đ, không phải ghi S:',
          fig: CANDIES,
          items: ['Kẹo A: 800 : 4', 'Kẹo B: 200 : 2', 'Kẹo C: 60 × 2', 'Kẹo D: 400 : 2'],
          ans: ['Đ', 'S', 'S', 'Đ'],
        },
        // sửa: đề gốc chỉ ghi phép tính 203 × 4, ba ô kia để trống; thêm ba phép tính cùng dạng.
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['203 × 4', '126 × 3', '848 : 4', '675 : 5'] },
        // sửa: đề gốc để trống nhãn trên các đồ vật (chỉ có ba dấu >, <, = trên tay các bạn), đặt bốn phép so sánh cùng dạng.
        {
          type: 'match',
          prompt: 'Giúp các bạn lấy lại đúng đồ của mình bằng cách nối dấu >, <, = vào chỗ chấm phù hợp ở mỗi đồ vật:',
          heads: ['Đồ vật', 'Dấu'],
          left: ['Găng tay: 125 × 4 … 450', 'Mũ len: 96 : 3 … 4 × 8', 'Áo len: 248 : 2 … 25 × 5', 'Khăn quàng: 300 − 15 × 4 … 240'],
          right: ['>', '<', '='],
          ans: [0, 2, 1, 2],
          multi: true,
        },
        {
          type: 'fill',
          prompt: 'Tâm có hai ngăn sách, mỗi ngăn có 14 quyển. Tâm lấy 7 quyển từ ngăn thứ nhất chuyển sang ngăn thứ hai. Hỏi sau khi chuyển như vậy thì: a) Mỗi ngăn có bao nhiêu quyển sách? b) Số sách ở ngăn thứ hai gấp mấy lần số sách ngăn thứ nhất?',
          items: [
            { t: 'a) Ngăn thứ nhất còn số quyển sách là: … − … = … (quyển)', ans: [14, 7, 7] },
            { t: 'Ngăn thứ hai có số quyển sách là: … + … = … (quyển)', ans: [14, 7, 21] },
            { t: 'b) Số sách ngăn thứ hai gấp số sách ngăn thứ nhất số lần là: … : … = … (lần)', ans: [21, 7, 3] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Mỗi gói mì cân nặng 100 g, mỗi quả trứng cân nặng 50 g. Vậy 3 gói mì và 5 quả trứng cân nặng bao nhiêu gam?',
          items: [
            { t: '3 gói mì cân nặng là: … × … = … (g)', ans: [100, 3, 300] },
            { t: '5 quả trứng cân nặng là: … × … = … (g)', ans: [50, 5, 250] },
            { t: '3 gói mì và 5 quả trứng cân nặng là: … + … = … (g)', ans: [300, 250, 550] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Một xe máy trong 2 giờ đầu đi được 84 km, trong 3 giờ sau mỗi giờ đi được 39 km. Hỏi xe máy đã đi được quãng đường dài bao nhiêu ki-lô-mét?',
          items: [
            { t: 'Trong 3 giờ sau xe máy đi được là: … × … = … (km)', ans: [39, 3, 117] },
            { t: 'Xe máy đã đi được quãng đường dài là: … + … = … (km)', ans: [84, 117, 201] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Lớp 3A có 35 học sinh, lớp 3B có 40 học sinh. Số học sinh hai lớp được chia vào 5 nhóm. Hỏi mỗi nhóm có bao nhiêu học sinh?',
          items: [
            { t: 'Hai lớp có số học sinh là: … + … = … (học sinh)', ans: [35, 40, 75] },
            { t: 'Mỗi nhóm có số học sinh là: … : … = … (học sinh)', ans: [75, 5, 15] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Thửa ruộng thứ nhất thu hoạch được 236 kg ngô. Thửa ruộng thứ hai thu hoạch được gấp đôi thửa ruộng thứ nhất. Hỏi cả hai thửa ruộng thu hoạch được bao nhiêu ki-lô-gam ngô?',
          items: [
            { t: 'Thửa ruộng thứ hai thu hoạch được là: … × … = … (kg)', ans: [236, 2, 472] },
            { t: 'Cả hai thửa ruộng thu hoạch được là: … + … = … (kg)', ans: [236, 472, 708] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Số cam nhiều hơn số quýt là 14 kg. Biết rằng số quýt là 7 kg. Hỏi số quýt bằng một phần mấy số cam?',
          items: [
            { t: 'Số cam có là: … + … = … (kg)', ans: [7, 14, 21] },
            { t: 'Số cam gấp số quýt số lần là: … : … = … (lần)', ans: [21, 7, 3] },
            { t: 'Số quýt bằng … số cam.', ans: '{1/3}', choices: ['{1/2}', '{1/3}', '{1/7}', '{1/21}'] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Một đội công nhân lúc đầu có 156 người. Sau đó có 31 người chuyển sang đội khác, số người còn lại được chia thành 5 nhóm. Hỏi mỗi nhóm công nhân có bao nhiêu người?',
          items: [
            { t: 'Số người còn lại là: … − … = … (người)', ans: [156, 31, 125] },
            { t: 'Mỗi nhóm có số người là: … : … = … (người)', ans: [125, 5, 25] },
          ],
        },
        { type: 'calc', prompt: 'Tính giá trị của biểu thức:', items: ['12 × 3 + 5 × 12 + 12 × 2'] },
      ],
    },
  ],
};
