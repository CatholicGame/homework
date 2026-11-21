/** Đề kiểm tra Tuần 15. Nguồn: docs/lop_3/De_thi/Toan3-KN-Tuan11-18.pdf trang 20–24 (Phiếu ôn tập cuối tuần 15). */

export default {
  id: 'tuan-15',
  title: 'Đề kiểm tra Tuần 15',
  short: 'Tuần 15',
  desc: 'Nhân, chia số có ba chữ số cho số có một chữ số, phép chia có dư, giảm đi một số lần',
  review: 'nhân, chia số có ba chữ số cho số có một chữ số và phép chia có dư',
  time: 45,
  numbering: 'part',
  parts: [
    {
      title: 'Phần 1. Trắc nghiệm',
      label: '',
      questions: [
        { type: 'mc', prompt: 'Một đơn vị Thanh niên xung phong có 410 người chia thành 5 đội. Hỏi mỗi đội có bao nhiêu người?', options: ['80', '85', '95', '82'], ans: 3 },
        { type: 'mc', prompt: 'Tìm một số, biết rằng nếu gấp số đó lên 7 lần thì được 182.', options: ['25', '26', '90', '46'], ans: 1 },
        { type: 'mc', prompt: 'Một phép chia có số bị chia bằng 267, thương bằng 8 và số dư bằng 3. Số chia của phép chia đó là:', options: ['32', '33', '34', '35'], ans: 1 },
        { type: 'fill', prompt: '816 chia cho số chẵn lớn nhất có một chữ số được kết quả là:', items: [{ t: 'Kết quả là: …', ans: 102 }] },
        { type: 'mc', prompt: 'Năm 2022 có 365 ngày, 1 tuần lễ có 7 ngày. Vậy năm 2022 có:', options: ['52 tuần lễ', '5 tuần lễ và 15 ngày', '52 tuần lễ và 1 ngày', '52 tuần lễ và 15 ngày'], ans: 2, cols: 2 },
        { type: 'mc', prompt: 'Tích của 229 và 3 là:', options: ['371', '361', '687', '42 (dư 1)'], ans: 2 },
        { type: 'mc', prompt: 'Kết quả của phép tính 967 : 4 là:', options: ['836', '844', '241 (dư 3)', '241'], ans: 2 },
        { type: 'mc', prompt: '420 giảm 7 lần là:', options: ['413', '427', '60', '6'], ans: 2 },
        { type: 'mc', prompt: 'Phép chia 984 : 6 có số dư là:', options: ['0', '2', '3', '4'], ans: 0 },
        { type: 'mc', prompt: 'Bà có 79 kg gạo nếp. Bà định cho số gạo nếp đó vào các túi nhỏ, mỗi túi chỉ chứa được 7 kg. Bà cần ít nhất số túi như vậy là:', options: ['11 túi', '11 (dư 2)', '12 túi', '13 túi'], ans: 2 },
        // sửa: đề in "trong giỏ … trong rổ", thống nhất là "giỏ".
        { type: 'mc', prompt: 'Lúc đầu trong giỏ có 126 quả trứng. Sau một buổi bán hàng, trong giỏ còn lại {1/6} số trứng. Hỏi người ta đã bán bao nhiêu quả trứng?', options: ['21 quả', '147 quả', '105 quả', '120 quả'], ans: 2 },
        { type: 'mc', prompt: 'Số có ba chữ số mà chữ số hàng chục bằng {1/2} chữ số hàng trăm và nhiều hơn chữ số hàng đơn vị là 4 là:', options: ['820', '840', '841', '804'], ans: 1 },
      ],
    },
    {
      title: 'Phần 2. Tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['319 × 2', '235 × 3', '124 × 4', '243 : 3', '147 : 7', '475 : 4'] },
        {
          type: 'table',
          prompt: 'Viết kết quả tính vào ô trống:',
          head: ['Số đã cho', '216 m', '432 l', '108 kg', '720 giờ', '576 g'],
          rows: [['Giảm 4 lần', '…', '…', '…', '…', '…'], ['Giảm 9 lần', '…', '…', '…', '…', '…']],
          ans: [[54, 108, 27, 180, 144], [24, 48, 12, 80, 64]],
        },
        // sửa: đề gốc để trống biển ô tô màu cam, ô tô đỏ ghi "48 : 6" (= 8, không bằng phép tính nào);
        // điền 63 : 3 (= 168 : 8) và đổi thành 486 : 9 (= 270 : 5) để mỗi phép tính có đúng một ô tô.
        {
          type: 'match',
          prompt: 'Nối mỗi phép tính với ô tô có kết quả bằng nhau:',
          left: ['168 : 8', '270 : 5', '147 × 5', '88 : 8', '96 : 8'],
          scene: 'cars',
          right: ['245 × 3', '36 : 3', '63 : 3', '33 : 3', '486 : 9'],
          ans: [2, 4, 0, 3, 1],
        },
        {
          type: 'table',
          prompt: 'Điền số:',
          head: ['Thừa số', 'Thừa số', 'Tích'],
          rows: [[134, 6, '…'], ['…', 5, 600], [216, 3, '…'], [6, '…', 468]],
          ans: [[804], [120], [648], [78]],
          transpose: true,
        },
        {
          type: 'word',
          text: 'Có 120 học sinh xếp đều thành 8 hàng. Hỏi mỗi hàng có bao nhiêu học sinh?',
          given: ['Có 120 học sinh.', 'Xếp đều thành 8 hàng.'],
          ask: 'Mỗi hàng có bao nhiêu học sinh?',
          hint: 'Chia đều 120 học sinh thành 8 hàng thì lấy 120 chia cho 8.',
          sentence: ['Mỗi hàng', 'có số', 'học sinh', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 120, op: ':', b: 8, result: 15, unit: 'học sinh' },
          units: ['học sinh', 'hàng', 'lần'],
        },
        {
          type: 'fill',
          prompt: 'Có 259 cái bát xếp vào các hộp, mỗi hộp xếp được nhiều nhất 8 cái. Vậy cần ít nhất bao nhiêu cái hộp để đựng hết số bát đó?',
          items: [
            { t: '259 : 8 = … (dư …)', ans: [32, 3] },
            { t: 'Xếp được … hộp đầy, còn thừa … cái bát cần thêm 1 hộp nữa.', ans: [32, 3] },
            { t: 'Cần ít nhất số hộp là: … hộp', ans: 33 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Một cửa hàng có 945 cái quạt, người ta đã bán đi {1/9} số quạt đó. Hỏi cửa hàng còn lại bao nhiêu cái quạt?',
          items: [
            { t: 'Số quạt đã bán là: 945 : 9 = … (cái)', ans: 105 },
            { t: 'Cửa hàng còn lại số quạt là: … − … = … (cái)', ans: [945, 105, 840] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Đội Một trồng được 153 cây, đội Hai trồng được gấp 3 lần số cây của đội Một. Hỏi cả hai đội trồng được bao nhiêu cây?',
          items: [
            { t: 'Đội Hai trồng được số cây là: 153 × 3 = … (cây)', ans: 459 },
            { t: 'Cả hai đội trồng được số cây là: … + … = … (cây)', ans: [153, 459, 612] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Thửa ruộng thứ nhất thu hoạch được 236 kg ngô. Thửa ruộng thứ hai thu hoạch được gấp đôi thửa ruộng thứ nhất. Hỏi cả hai thửa ruộng thu hoạch được bao nhiêu ki-lô-gam ngô?',
          items: [
            { t: 'Thửa ruộng thứ hai thu hoạch được: 236 × 2 = … (kg)', ans: 472 },
            { t: 'Cả hai thửa ruộng thu hoạch được: … + … = … (kg)', ans: [236, 472, 708] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Một đội công nhân lúc đầu có 156 người. Sau đó có 31 người chuyển sang đội khác, số người còn lại được chia thành 5 nhóm. Hỏi mỗi nhóm công nhân có bao nhiêu người?',
          items: [
            { t: 'Số người còn lại là: 156 − 31 = … (người)', ans: 125 },
            { t: 'Mỗi nhóm có số người là: … : 5 = … (người)', ans: [125, 25] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Ba gói kẹo to, mỗi gói kẹo to cân nặng 250 g. Hai gói kẹo nhỏ, mỗi gói cân nặng 150 g. Hỏi cả năm gói kẹo đó cân nặng bao nhiêu gam?',
          items: [{ t: 'Trả lời: Cả năm gói kẹo đó cân nặng … g', ans: 1050 }],
        },
        {
          type: 'fill',
          prompt: 'Tìm số có ba chữ số, biết khi đọc số đó theo thứ tự ngược lại thì giá trị số đó không đổi và chữ số hàng chục là số chẵn lớn nhất có một chữ số và bằng tổng chữ số các hàng còn lại.',
          items: [{ t: 'Trả lời: Số cần tìm là …', ans: 484 }],
        },
      ],
    },
  ],
};
