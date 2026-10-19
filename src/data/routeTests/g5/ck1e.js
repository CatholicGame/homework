/** Kiểm tra cuối học kì I (Đề 5): Bài 1–35 Toán 5 (Nhanh 1 đến 8). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { triangle, round } from './art.js';

export default {
  id: 'l5-ck-1e',
  kind: 'cuoiki',
  title: 'Kiểm tra cuối học kì I (Đề 5)',
  short: 'Cuối kì I · Đề 5',
  after: { book: 'tool5', units: '1-35' },
  desc: 'Hàng và lớp, tính thuận tiện, quy đồng mẫu số; chia phân số, trừ số tự nhiên với phân số, diện tích hình chữ nhật; đọc số thập phân, so sánh, làm tròn, viết số đo, đơn vị đo diện tích; trừ, nhân, chia số thập phân, đổi đơn vị; diện tích hình tam giác, hình thang, hình tròn',
  time: 45,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // 12,004: phần thập phân "không không bốn". Nhiễu: bỏ hai chữ số 0 (phẩy bốn), bỏ một chữ số 0 (phẩy không bốn), đọc phần nguyên sai.
      { type: 'mc', bai: 10, point: 3, level: 1,
        prompt: 'Số 12,004 đọc là:',
        options: ['Mười hai phẩy bốn', 'Mười hai phẩy không bốn', 'Mười hai phẩy không không bốn', 'Một trăm hai mươi phẩy không bốn'], ans: 2 },
      // 25 708 316: lớp triệu 25, lớp nghìn 708, lớp đơn vị 316.
      // Nhiễu: lớp đơn vị (3, 1, 6), lớp triệu (2, 5), lấy lệch một hàng sang trái (5, 7, 0).
      { type: 'mc', bai: 1, point: 0, level: 1,
        prompt: 'Lớp nghìn của số 25 708 316 gồm các chữ số:',
        options: ['3; 1; 6', '7; 0; 8', '2; 5', '5; 7; 0'], ans: 1 },
      // 8 chia hết cho 4 nên lấy mẫu số chung 8: {3/4} = {6/8}. Nhiễu: chỉ đổi mẫu số ({3/8}), nhân tử của phân số kia ({10/16}),
      // cộng 4 vào tử số ({7/8}).
      { type: 'mc', bai: 3, point: 3, level: 1,
        prompt: 'Quy đồng mẫu số hai phân số {3/4} và {5/8} được:',
        options: ['{3/8} và {5/8}', '{6/8} và {5/8}', '{6/8} và {10/16}', '{7/8} và {5/8}'], ans: 1 },
      // Nhân với phân số thứ hai đảo ngược: {3/4} × {2/1} = {6/4} = {3/2}.
      // Nhiễu: nhân thẳng ({3/8}), đảo phân số thứ nhất ({2/3}), lấy phân số thứ hai chia cho phân số thứ nhất ({4/6}).
      { type: 'mc', bai: 5, point: 3, level: 1,
        prompt: '{3/4} : {1/2} = ? (rút gọn nếu được)',
        options: ['{3/8}', '{3/2}', '{2/3}', '{4/6}'], ans: 1 },
      // 2 − {3/5} = {10/5} − {3/5} = {7/5}. Nhiễu: trừ ngược 3 − 2 ({1/5}), coi 2 là 1 ({2/5}), cộng ({13/5}).
      { type: 'mc', bai: 6, point: 3, level: 1,
        prompt: '2 − {3/5} = ?',
        options: ['{1/5}', '{7/5}', '{2/5}', '{13/5}'], ans: 1 },
      // 5 kg 6 g: 1 kg = 1 000 g nên 6 g = 0,006 kg: 5,006 kg. Nhiễu: 5,6 (thiếu hai chữ số 0), 5,06 (coi 1 kg = 100 g), 56 (quên dấu phẩy).
      { type: 'mc', bai: 12, point: 3, level: 1,
        prompt: 'Một túi bột nặng 5 kg 6 g. Viết số đo đó dưới dạng số thập phân có đơn vị là ki-lô-gam:',
        options: ['5,6 kg', '5,06 kg', '5,006 kg', '56 kg'], ans: 2 },
      // Đơn vị đo diện tích liền nhau gấp kém nhau 100 lần. Ý sai: 1 m² = 100 dm², không phải 10 dm².
      { type: 'tf', bai: 16, point: 1, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['1 m² = 10 dm²', '1 dm² = 100 cm²', '1 cm² = 100 mm²', '1 km² = 100 ha'],
        ans: ['S', 'Đ', 'Đ', 'Đ'] },
      // 2,48: chữ số hàng phần mười là 4 < 5 nên làm tròn xuống 2 kg. Nhiễu: làm tròn lên (3 kg), làm tròn đến hàng phần mười thay vì số tự nhiên (2,5 kg), bỏ bớt chữ số thay vì làm tròn (2,4 kg).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Một quả dưa hấu nặng 2,48 kg. Làm tròn số đo đó đến số tự nhiên gần nhất thì được:',
        options: ['3 kg', '2,5 kg', '2 kg', '2,4 kg'], ans: 2 },
      // 20 − 7,35 = 20,00 − 7,35 = 12,65 l. Nhiễu: trừ phần nguyên rồi giữ phần thập phân (13,35), quên trả mượn (13,65), cộng (27,35).
      { type: 'mc', bai: 20, point: 2, level: 1,
        prompt: 'Một can có 20 l nước. Người ta đã dùng 7,35 l. Trong can còn lại bao nhiêu lít nước?',
        options: ['13,35 l', '12,65 l', '13,65 l', '27,35 l'], ans: 1 },
      // Đổi đơn vị như nhân, chia với 10, 100, 1 000: 23,45 × 1 000 = 23 450; 12,6 : 100 = 0,126; 0,75 × 1 000 = 750; 450 : 1 000 = 0,45.
      { type: 'match', bai: 23, point: 3, level: 2,
        prompt: 'Nối mỗi dòng ở cột A với số thích hợp ở cột B:',
        heads: ['A', 'B'],
        left: ['23,45 kg = … g', '12,6 cm = … m', '0,75 km = … m', '450 g = … kg'],
        right: ['750', '0,126', '23 450', '0,45'], ans: [2, 1, 0, 3] },
      // 2 m = 20 dm; S = 20 × 15 = 300 dm². Nhiễu: quên đổi (2 × 15 = 30), tính chu vi (20 + 15) × 2 = 70, coi 1 m = 100 dm (3 000).
      { type: 'mc', bai: 8, point: 4, level: 2,
        prompt: 'Một tấm thảm hình chữ nhật dài 2 m, rộng 15 dm. Diện tích tấm thảm là:',
        options: ['30 dm²', '300 dm²', '70 dm²', '3 000 dm²'], ans: 1 },
      // 4,7□ > 4,78: phần nguyên và hàng phần mười bằng nhau, cần chữ số hàng phần trăm lớn hơn 8, nên là 9.
      // Nhiễu: 8 (cho ra hai số bằng nhau), 7, 0 (nghĩ số ít chữ số hơn thì lớn hơn).
      { type: 'mc', bai: 11, point: 1, level: 2,
        prompt: 'Chữ số thích hợp viết vào ô trống để 4,7□ > 4,78 là:',
        options: ['7', '8', '9', '0'], ans: 2 },
      // Lượt nào số bị chia bé hơn số chia thì viết 0 vào thương: 18,54 : 9 = 2,06 (ý sai: 2,6).
      { type: 'tf', bai: 22, point: 2, level: 2,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['24,36 : 12 = 2,03', '18,54 : 9 = 2,6', '5,4 : 9 = 0,6', '9,1 : 7 = 1,3'],
        ans: ['Đ', 'S', 'Đ', 'Đ'] },
      // S = 12 × 7 : 2 = 42 cm². Nhiễu: quên chia 2 (84), cộng đáy và chiều cao (19), (12 + 7) × 2 (38).
      { type: 'mc', bai: 25, point: 2, level: 2,
        prompt: 'Hình tam giác MNP có đáy NP = 12 cm, chiều cao MK = 7 cm. Diện tích hình tam giác MNP là:',
        fig: triangle({ base: '12 cm', h: '7 cm', names: ['M', 'N', 'P', 'K'], width: 250 }),
        options: ['84 cm²', '42 cm²', '19 cm²', '38 cm²'], ans: 1 },
      // 85 000 × 2,5 = 212 500 đồng. Nhiễu: tách thừa một chữ số ở tích (21 250), chỉ nhân 2 (170 000), tách thiếu chữ số ở tích (2 125 000).
      { type: 'mc', bai: 21, point: 0, level: 3,
        prompt: 'Một mét vải giá 85 000 đồng. Mẹ mua 2,5 m vải như thế. Mẹ phải trả bao nhiêu tiền?',
        options: ['21 250 đồng', '170 000 đồng', '212 500 đồng', '2 125 000 đồng'], ans: 2 },
      // Chiều cao (15 + 25) : 2 = 20 m; S = (15 + 25) × 20 : 2 = 400 m².
      // Nhiễu: quên chia 2 (800), cộng ba số đo (60), lấy 15 × 25 (375).
      { type: 'mc', bai: 26, point: 2, level: 3,
        prompt: 'Một mảnh đất hình thang có đáy bé 15 m, đáy lớn 25 m, chiều cao bằng trung bình cộng của hai đáy. Diện tích mảnh đất là:',
        options: ['800 m²', '400 m²', '60 m²', '375 m²'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      { type: 'calc', bai: [19, 20, 21, 22], point: 0, level: 1,
        prompt: 'Đặt tính rồi tính:', col: true,
        items: ['258,4 + 37,96', '100 − 45,8', '6,8 × 0,45', '58,5 : 13'] },
      // (0,25 × 4) × 7,8 = 1 × 7,8 = 7,8; 12,5 × 3,7 + 12,5 × 6,3 = 12,5 × (3,7 + 6,3) = 12,5 × 10 = 125.
      { type: 'fill', bai: 2, point: 3, level: 2,
        prompt: 'Tính bằng cách thuận tiện:',
        items: [
          { t: '0,25 × 7,8 × 4 = (0,25 × …) × 7,8 = … × 7,8 = …', ans: [4, 1, 7.8] },
          { t: '12,5 × 3,7 + 12,5 × 6,3 = 12,5 × (3,7 + …) = 12,5 × … = …', ans: [6.3, 10, 125] },
        ] },
      // r = 10 : 2 = 5 m; C = 3,14 × 10 = 31,4 m; S = 3,14 × 5 × 5 = 78,5 m².
      { type: 'fill', bai: 27, point: 3, level: 3,
        prompt: 'Một hồ nước hình tròn có đường kính 10 m. Tính chu vi và diện tích mặt hồ.',
        fig: round({ d: '10 m', size: 150 }),
        items: [
          { t: 'Chu vi mặt hồ: 3,14 × … = … (m)', ans: [10, 31.4] },
          { t: 'Bán kính mặt hồ là … m.', ans: 5 },
          { t: 'Diện tích mặt hồ là … m².', ans: 78.5 },
        ] },
      // 37,5 : 1,5 = 375 : 15 = 25 túi; 25 × 32 000 = 800 000 đồng.
      { type: 'fill', bai: 22, point: 3, level: 3,
        prompt: 'Cô Mai có 37,5 kg đường, chia đều vào các túi, mỗi túi 1,5 kg. Cô bán mỗi túi đường giá 32 000 đồng. Hỏi bán hết số đường đó, cô Mai thu được bao nhiêu tiền?',
        items: [
          { t: 'Số túi đường: 37,5 : 1,5 = … (túi)', ans: 25 },
          { t: 'Cô Mai thu được … đồng.', ans: 800000 },
        ] },
    ] },
  ],
};
