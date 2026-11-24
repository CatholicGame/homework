/**
 * Kiến thức Toán 5 Tập Hai, chủ đề 7, Bài 36–42 (cùng dạng TEACH trong ../knowledge.js).
 * Nguồn: SGK Toán 5 Tập Hai trang 4–26 (khung ghi nhớ chép nguyên văn). Ví dụ từng bước dùng loại của Toán 4
 * (grade4Textbook/demos/diagram.js: ratio, ratioParts, mapScale).
 */

const pg = (p) => `SGK Toán 5 Tập Hai, trang ${p}`;

export const K5_RATIO = {
  36: {
    title: 'Tỉ số. Tỉ số phần trăm', page: pg(4),
    points: [
      '<b>Tỉ số của a và b là a : b hay a/b (b khác 0).</b> Ví dụ: bến có 7 ô tô, 3 ô tô điện: tỉ số của số ô tô điện và số ô tô ở bến là 3 : 7 hay 3/7.',
      'Số nói trước là tử số: tỉ số của số ô tô điện và số ô tô xăng là 3/4, còn tỉ số của số ô tô xăng và số ô tô điện là 4/3.',
      'Tỉ số có mẫu số 100 gọi là <b>tỉ số phần trăm</b>: 43/100 đọc là bốn mươi ba phần trăm, viết là <b>43%</b>.',
      '"Tỉ số phần trăm của số bạn tham gia môn Bơi và số bạn được khảo sát là 43%. Tỉ số này cho biết: Cứ 100 bạn được khảo sát thì có 43 bạn tham gia môn Bơi."',
      'Viết thành tỉ số phần trăm: 9/25 = 36/100 = 36%; 37,5 : 100 = 37,5%. Tỉ số phần trăm có thể lớn hơn 100% (113%).',
    ],
    demos: [{ kind: 'ratio', a: 3, b: 4 }],
  },
  37: {
    title: 'Tỉ lệ bản đồ và ứng dụng', page: pg(8),
    points: [
      'Ở góc phía dưới của một bản đồ có ghi 1 : 10 000. Tỉ số đó là <b>tỉ lệ bản đồ</b>.',
      'Tỉ lệ 1 : 10 000 hay 1/10 000 cho biết hình ảnh được vẽ thu nhỏ lại 10 000 lần: độ dài 1 cm trên bản đồ ứng với độ dài thật là 10 000 cm hay 100 m.',
      'Tỉ lệ bản đồ có thể viết dưới dạng một phân số có tử số là 1: 1/500; 1/1 000; 1/10 000; 1/10 000 000;…',
      '<b>Độ dài thật = độ dài trên bản đồ × mẫu số tỉ lệ</b> (rồi đổi đơn vị): tỉ lệ 1 : 1 000, AB = 6 cm thì thật là 6 × 1 000 = 6 000 (cm) = 60 m.',
      '<b>Độ dài trên bản đồ = độ dài thật : mẫu số tỉ lệ</b> (đổi độ dài thật ra cm trước): 50 m = 5 000 cm; 5 000 : 1 000 = 5 (cm). Nhớ: 1 m = 100 cm, 1 km = 100 000 cm.',
    ],
    demos: [
      { kind: 'mapScale', mode: 'real', scale: 1000, map: 6, mapUnit: 'cm', realUnit: 'm' },
      { kind: 'mapScale', mode: 'map', scale: 1000000, real: 160, mapUnit: 'cm', realUnit: 'km', thing: 'road' },
    ],
  },
  38: {
    title: 'Tìm hai số khi biết tổng và tỉ số của hai số đó', page: pg(12),
    points: [
      'Vẽ <b>sơ đồ đoạn thẳng</b>: số lịch lớp 5A bằng 7/8 số lịch lớp 5B thì 5B là 8 phần, 5A là 7 phần bằng nhau; ngoặc ghi tổng 60 quyển.',
      'Tìm <b>tổng số phần bằng nhau</b>: 7 + 8 = 15 (phần).',
      'Tìm số thứ nhất: <b>tổng : tổng số phần × số phần</b>: 60 : 15 × 7 = 28 (quyển). Số thứ hai: 60 − 28 = 32 (quyển).',
      '"Gấp 3 lần" nghĩa là tỉ số 1 : 3, tổng số phần là 1 + 3 = 4. Bài cho chu vi hình chữ nhật thì tổng của chiều dài và chiều rộng là <b>nửa chu vi</b>.',
    ],
    demos: [{ kind: 'ratioParts', mode: 'sum', total: 60, a: 7, b: 8, names: ['Lớp 5A', 'Lớp 5B'], unit: 'quyển' }],
  },
  39: {
    title: 'Tìm hai số khi biết hiệu và tỉ số của hai số đó', page: pg(15),
    points: [
      'Vẽ sơ đồ: số hạt dẻ của em bằng 3/5 của chị thì chị 5 phần, em 3 phần; phần chị hơn em ứng với hiệu 6 hạt dẻ.',
      'Tìm <b>hiệu số phần bằng nhau</b>: 5 − 3 = 2 (phần).',
      'Tìm số lớn: <b>hiệu : hiệu số phần × số phần</b>: 6 : 2 × 5 = 15 (hạt). Số bé: 15 − 6 = 9 (hạt).',
      'Tỉ số lớn hơn 1 (7/4) thì số thứ nhất là số lớn. Bài toán tuổi: hiệu số tuổi của hai người không đổi theo thời gian.',
    ],
    demos: [{ kind: 'ratioParts', mode: 'diff', total: 6, a: 3, b: 5, names: ['Sóc em', 'Sóc chị'], unit: 'hạt', first: 1 }],
  },
  40: {
    title: 'Tìm tỉ số phần trăm của hai số', page: pg(18),
    points: [
      'Muốn tìm tỉ số phần trăm của hai số, ta làm như sau: <b>Tìm thương của hai số. Nhân thương của hai số đó với 100 và viết thêm kí hiệu % vào bên phải tích tìm được.</b>',
      'Ví dụ: 37 : 40 = 0,925; 0,925 × 100 = 92,5 → 92,5%. Hoặc đưa về mẫu số 100: 46/50 = 92/100 = 92%.',
      'Thương chia mãi không hết thì lấy đến bốn chữ số ở phần thập phân: 50 : 13 = 3,8461… = 384,61%.',
      'Cộng, trừ, nhân, chia tỉ số phần trăm như với số: 18% + 12% = 30%; 14,8% × 4 = 59,2%. Đạt 115% kế hoạch nghĩa là vượt 15%.',
    ],
  },
  41: {
    title: 'Tìm giá trị phần trăm của một số', page: pg(21),
    points: [
      'Muốn tìm 60% của 300 ta có thể <b>lấy 300 nhân với 60 rồi chia cho 100</b> hoặc <b>lấy 300 chia cho 100 rồi nhân với 60</b>.',
      '300 × 60 : 100 = 180; (300 : 100) × 60 = 180. 1% của 300 là 3, nên 60% là 60 × 3.',
      'Giảm giá 15% cho món hàng 250 000 đồng: số tiền được giảm là 250 000 × 15 : 100 = 37 500 (đồng); giá sau khi giảm là 250 000 − 37 500 = 212 500 (đồng).',
      'Lãi suất 7,4% một năm, gửi 35 000 000 đồng: tiền lãi 2 590 000 đồng, cả gốc và lãi 37 590 000 đồng.',
    ],
  },
  42: {
    title: 'Máy tính cầm tay', page: pg(23),
    points: [
      'Phím <b>ON/C</b> để bật máy, phím <b>OFF</b> để tắt máy. Các phím số từ 0 đến 9 để nhập số; các phím + , − , × , ÷ để chọn phép tính; phím <b>=</b> để hiện kết quả; phím <b>CE</b> để xoá số vừa nhập nếu nhập sai; phím <b>%</b> để biểu diễn tỉ số phần trăm.',
      'Tính 128 + 136: lần lượt bấm 1 2 8 + 1 3 6 =, màn hình hiện 264.',
      'Máy tính làm lần lượt theo thứ tự bấm: bấm 5 + 2 × 3 = thì máy hiện 21 (không phải 11). Phép tính nào cần làm trước thì bấm trước.',
      'Giá trị phần trăm: bấm 780000 × 5 % = được 39 000 (5% của 780 000). Tỉ số phần trăm: bấm 3 ÷ 40 % = được 7.5, tức là 7,5% (em tự viết thêm kí hiệu %).',
      'Màn hình dùng dấu chấm thay cho dấu phẩy: 2.8 nghĩa là 2,8.',
    ],
  },
};
