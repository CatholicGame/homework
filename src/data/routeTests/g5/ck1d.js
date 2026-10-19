/** Kiểm tra cuối học kì I (Đề 4): Bài 1–35 Toán 5 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { trapezoid, triangle } from './art.js';

export default {
  id: 'l5-ck-1d',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 4)',
  short: 'Cuối kì I · Đề 4',
  after: { book: 'tool5', units: '1-35' },
  desc: 'Số chẵn, thứ tự phép tính; nhân phân số, hỗn số, giờ và phút; viết số thập phân, so sánh, viết số đo khối lượng, làm tròn, ha; cộng, nhân, chia số thập phân, nhân chia với 10, 100, 0,1; đường kính, diện tích hình thang vuông, hình tam giác, hình tròn',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 7 đơn vị, 5 phần mười, 0 phần trăm, 4 phần nghìn: 7,504. Nhiễu: bỏ hàng phần trăm (7,54), thừa chữ số 0 (7,0504), đặt dấu phẩy sai (75,04).
      { type: 'mc', bai: 10, point: 2, level: 1,
        prompt: 'Số thập phân gồm 7 đơn vị, 5 phần mười và 4 phần nghìn viết là:',
        options: ['7,54', '7,504', '7,0504', '75,04'], ans: 1 },
      // Hai số chẵn liên tiếp hơn kém nhau 2: 2 349 998 + 2 = 2 350 000.
      // Nhiễu: số liền sau (2 349 999, là số lẻ), chỉ đổi hàng nghìn (2 350 998), số chẵn liền trước (2 349 996).
      { type: 'mc', bai: 1, point: 4, level: 1,
        prompt: 'Số chẵn liền sau số 2 349 998 là:',
        options: ['2 349 999', '2 350 000', '2 350 998', '2 349 996'], ans: 1 },
      // Tử nhân tử, mẫu nhân mẫu: {8/15}. Nhiễu: cộng tử, cộng mẫu ({6/8}), nhân chéo ({10/12}), nhân tử mà giữ mẫu kiểu cộng ({6/15}).
      { type: 'mc', bai: 5, point: 2, level: 1,
        prompt: '{2/3} × {4/5} = ?',
        options: ['{6/8}', '{10/12}', '{6/15}', '{8/15}'], ans: 3 },
      // {19/100} bé hơn 1, không viết được thành hỗn số, nên ý "{19/100} = 1{9/100}" sai; 1{9/100} = {109/100} đúng.
      { type: 'tf', bai: 7, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{31/10} = 3{1/10}', '{109/100} = 1{9/100}', '{19/100} = 1{9/100}', '{27/10} = 2{7/10}'],
        ans: ['Đ', 'Đ', 'S', 'Đ'] },
      // 2 giờ = 120 phút; 120 + 15 = 135 phút. Nhiễu: ghép chữ số (215), coi 1 giờ = 10 phút (35), quên 15 phút (120).
      { type: 'mc', bai: 8, point: 1, level: 1,
        prompt: 'Bộ phim dài 2 giờ 15 phút. Bộ phim dài bao nhiêu phút?',
        options: ['215 phút', '135 phút', '35 phút', '120 phút'], ans: 1 },
      // Ý sai: 0,9 = 0,90 > 0,45 (không phải số nhiều chữ số hơn thì lớn hơn).
      { type: 'tf', bai: 11, point: 3, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['5,8 > 5,79', '0,9 < 0,45', '10,5070 = 10,507', '2,875 < 3,1'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // 1 tấn = 1 000 kg nên 35 kg = 0,035 tấn: 2 tấn 35 kg = 2,035 tấn.
      // Nhiễu: viết 35 ngay sau dấu phẩy (2,35), thừa chữ số 0 (2,0035), quên dấu phẩy chỗ đúng (20,35).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: '2 tấn 35 kg = … tấn. Số thích hợp viết vào chỗ chấm là:',
        options: ['2,35', '2,035', '2,0035', '20,35'], ans: 1 },
      // 1 ha = 10 000 m² nên 3 ha = 30 000 m². Nhiễu: coi 1 ha = 100 m² (300), 1 000 m² (3 000), 100 000 m² (300 000).
      { type: 'mc', bai: 15, point: 1, level: 1,
        prompt: 'Một trang trại rộng 3 ha. Diện tích trang trại là bao nhiêu mét vuông?',
        options: ['300 m²', '3 000 m²', '30 000 m²', '300 000 m²'], ans: 2 },
      // d = r × 2 = 4,5 × 2 = 9 cm. Nhiễu: chia 2 (2,25 cm), tính chu vi 3,14 × 4,5 (14,13 cm), giữ nguyên bán kính (4,5 cm).
      { type: 'mc', bai: 27, point: 0, level: 1,
        prompt: 'Một hình tròn có bán kính 4,5 cm. Đường kính của hình tròn đó là:',
        options: ['2,25 cm', '9 cm', '14,13 cm', '4,5 cm'], ans: 1 },
      // 5 640 − 120 × 6 = 5 640 − 720 = 4 920. Nhiễu: tính trừ trước rồi nhân (33 120), trừ 120 (5 520), sai khi trừ (4 820).
      { type: 'mc', bai: 2, point: 2, level: 2,
        prompt: 'Giá trị của biểu thức 5 640 − 120 × 6 là:',
        options: ['33 120', '4 920', '5 520', '4 820'], ans: 1 },
      // 1,449: chỉ nhìn chữ số hàng phần trăm (4 < 5) nên được 1,4. Nhiễu: làm tròn hai lần 1,449 → 1,45 → 1,5;
      // làm tròn đến hàng phần trăm (1,45); làm tròn đến số tự nhiên (1).
      { type: 'mc', bai: 13, point: 3, level: 2,
        prompt: 'Làm tròn số 1,449 đến hàng phần mười thì được số:',
        options: ['1,5', '1,4', '1,45', '1'], ans: 1 },
      // 2,75 + 1,5 = 4,25 kg. Nhiễu: căn phải như số tự nhiên (2,90), quên nhớ (3,25), viết sai hàng (4,2).
      { type: 'mc', bai: 19, point: 3, level: 2,
        prompt: 'Mẹ mua 2,75 kg cam và 1,5 kg táo. Mẹ mua tất cả bao nhiêu ki-lô-gam cam và táo?',
        options: ['2,9 kg', '4,25 kg', '3,25 kg', '4,2 kg'], ans: 1 },
      // Tích không đủ chữ số thì thêm 0 bên trái: 0,2 × 0,3 = 0,06. Nhiễu: đếm một chữ số thập phân (0,6), bỏ dấu phẩy (6), thừa chữ số 0 (0,006).
      { type: 'mc', bai: 21, point: 3, level: 2,
        prompt: '0,2 × 0,3 = ?',
        options: ['0,6', '0,06', '6', '0,006'], ans: 1 },
      // Chia cho 0,1 là chuyển dấu phẩy sang phải: 36,5 : 0,1 = 365 (ý sai: 3,65).
      { type: 'tf', bai: 23, point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['27,86 × 10 = 278,6', '36,5 : 0,1 = 3,65', '0,8 : 100 = 0,008', '53,28 × 1 000 = 53 280'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // 45,6 : 6 = 7,6 m. Nhiễu: quên dấu phẩy ở thương (76), đặt dấu phẩy sai (0,76), thêm 0 thừa vào thương (7,06).
      { type: 'mc', bai: 22, point: 0, level: 2,
        prompt: 'Một cuộn dây dài 45,6 m được cắt thành 6 đoạn dài bằng nhau. Mỗi đoạn dây dài:',
        options: ['76 m', '7,6 m', '0,76 m', '7,06 m'], ans: 1 },
      // Hình thang vuông: AD là chiều cao. S = (12 + 8) × 6 : 2 = 60 m².
      // Nhiễu: quên chia 2 (120), cộng ba số đo (26), nhân cả ba số (576).
      { type: 'mc', bai: 26, point: 2, level: 3,
        prompt: 'Mảnh đất của nhà bác Ba có dạng hình thang vuông như hình. Diện tích mảnh đất là:',
        fig: trapezoid({ right: true, top: '8 m', bottom: '12 m', h: '6 m', width: 260 }),
        options: ['120 m²', '26 m²', '60 m²', '576 m²'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 21, 22], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['127,5 + 46,85', '80,3 − 45,76', '1,25 × 3,6', '17,1 : 9'] },
      // x = 8,7 + 12,35 = 21,05; x = 3,5 × 2,4 = 8,4; x = 6,9 : 1,5 = 4,6.
      { type: 'findx', bai: [20, 21, 22], point: 0, level: 2,
        prompt: 'Tìm x:',
        items: [{ t: 'x − 12,35 = 8,7', ans: 21.05 }, { t: 'x : 2,4 = 3,5', ans: 8.4 }, { t: 'x × 1,5 = 6,9', ans: 4.6 }] },
      // Đổi 2,4 dm = 24 cm cùng đơn vị với chiều cao; S = 24 × 15 : 2 = 180 cm².
      { type: 'fill', bai: 25, point: 3, level: 3,
        prompt: 'Một tấm bìa hình tam giác có đáy dài 2,4 dm, chiều cao 15 cm. Tính diện tích tấm bìa theo xăng-ti-mét vuông.',
        fig: triangle({ base: '2,4 dm', h: '15 cm', width: 240 }),
        items: [
          { t: '2,4 dm = … cm', ans: 24 },
          { t: 'Diện tích tấm bìa: … × … : 2 = … (cm²)', ans: [24, 15, 180] },
        ] },
      // C = 3,14 × 1,2 = 3,768 m; r = 1,2 : 2 = 0,6 m; S = 3,14 × 0,6 × 0,6 = 1,1304 m².
      { type: 'fill', bai: 27, point: 2, level: 3,
        prompt: 'Một mặt bàn hình tròn có đường kính 1,2 m. Tính chu vi và diện tích mặt bàn.',
        items: [
          { t: 'Chu vi mặt bàn: 3,14 × 1,2 = … (m)', ans: 3.768 },
          { t: 'Bán kính mặt bàn là … m.', ans: 0.6 },
          { t: 'Diện tích mặt bàn: 3,14 × … × … = … (m²)', ans: [0.6, 0.6, 1.1304] },
        ] },
    ] },
  ],
};
