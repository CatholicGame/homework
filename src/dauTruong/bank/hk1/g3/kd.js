/**
 * 🏆 Đấu Trường Nhí · lớp 3 · Khởi động · học kì I (Kết nối tri thức). Kiểm: node scripts/dautruong-check.mjs 3
 * Tuần Toán theo bài SGK: 1 số đến 1 000, cộng trừ, tìm thành phần · 2 bảng 2, 3, 4, 5 · 3 ôn hình học, đo lường · 4 bảng 6, 7 ·
 * 5 bảng 8, 9 · 6 tìm thừa số, số bị chia, số chia; một phần mấy · 7 trung điểm · 8 hình tròn, góc vuông · 9 tam giác, tứ giác ·
 * 10 khối lập phương, khối hộp · 11 nhân số có hai chữ số, gấp lên · 12 chia có dư, chia số có hai chữ số · 13 giảm đi, toán hai bước ·
 * 14 mm, gam · 15 ml, nhiệt độ · 16 nhân chia số có ba chữ số · 17 biểu thức, so sánh gấp mấy lần · 18 ôn tập.
 */
export default [
  // ===================== TOÁN =====================
  // Tuần 1
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 1 000', q: 'Số "bảy trăm linh năm" viết là:', o: ['705', '750', '7005', '715'], ex: 'Bảy trăm linh năm gồm 7 trăm, 0 chục, 5 đơn vị nên viết là 705.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 1 000', q: 'Số gồm 6 trăm và 8 đơn vị là:', o: ['608', '68', '680', '6008'], ex: '6 trăm, 0 chục, 8 đơn vị: viết 608. Hàng chục không có thì viết chữ số 0.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 1 000', q: 'Số liền sau của 499 là:', o: ['500', '498', '4910', '490'], ex: 'Số liền sau thì thêm 1: 499 + 1 = 500.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số đến 1 000', q: 'Số lớn nhất trong các số 689, 698, 869, 896 là:', o: ['896', '869', '698', '689'], ex: 'Cùng 8 trăm thì so hàng chục: 896 có 9 chục lớn hơn 869 có 6 chục. Vậy 896 lớn nhất.' },
  { w: 1, m: 'toan', lv: 1, t: 'Tia số', q: 'Số thích hợp ở dấu hỏi là số nào?', fig: { type: 'numline', from: 0, to: 1000, step: 100, label: [0, 500, 1000], ask: [600] }, o: ['600', '700', '550', '60'], ex: 'Mỗi vạch cách nhau 100. Sau 500 một vạch là 600.' },
  { w: 1, m: 'toan', lv: 2, t: 'Tia số', q: 'Số thích hợp ở dấu hỏi là số nào?', fig: { type: 'numline', from: 300, to: 400, step: 10, label: [300, 350, 400], ask: [370] }, o: ['370', '360', '307', '380'], ex: 'Mỗi vạch cách nhau 10. Từ 350 đếm thêm hai vạch: 360, 370.' },
  { w: 1, m: 'toan', lv: 2, t: 'Cộng trừ', q: '367 + 25 = ?', o: ['392', '382', '617', '3612'], ex: '7 + 5 = 12, viết 2 nhớ 1; 6 + 2 = 8, thêm 1 là 9; hạ 3. Kết quả 392.' },
  { w: 1, m: 'toan', lv: 2, t: 'Đặt tính', q: 'Kết quả phép tính bên là bao nhiêu?', fig: { type: 'vcalc', a: 528, b: 263, op: '−', res: '?' }, o: ['265', '345', '275', '255'], ex: '8 − 3 = 5. 2 không trừ được 6, lấy 12 − 6 = 6, nhớ 1. 5 − (2 + 1) = 2. Kết quả 265.' },
  { w: 1, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '? + 45 = 120. Số thích hợp ở dấu hỏi là:', o: ['75', '165', '85', '65'], ex: 'Muốn tìm số hạng, lấy tổng trừ số hạng kia: 120 − 45 = 75.' },
  { w: 1, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '80 − ? = 35. Số thích hợp ở dấu hỏi là:', o: ['45', '115', '55', '35'], ex: 'Muốn tìm số trừ, lấy số bị trừ trừ hiệu: 80 − 35 = 45.' },
  { w: 1, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '? − 27 = 48. Số thích hợp ở dấu hỏi là:', o: ['75', '21', '65', '85'], ex: 'Muốn tìm số bị trừ, lấy hiệu cộng số trừ: 48 + 27 = 75.' },
  { w: 1, m: 'toan', lv: 1, t: 'Cộng trừ', q: 'Có tất cả bao nhiêu que tính?', fig: { type: 'tokens', row: ['stick.10', 'stick.10', 'stick.10', 'stick.4'] }, o: ['34', '7', '31', '43'], ex: 'Ba bó, mỗi bó 10 que là 30 que, thêm 4 que rời: 34 que.' },

  // Tuần 2
  { w: 2, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Mỗi hàng có 3 quả cam như hình. Phép tính nào đúng?', fig: { type: 'tokens', rows: [['🍊', '🍊', '🍊'], ['🍊', '🍊', '🍊'], ['🍊', '🍊', '🍊'], ['🍊', '🍊', '🍊']] }, o: ['3 × 4 = 12', '3 + 4 = 7', '3 × 3 = 9', '4 × 4 = 16'], ex: '3 quả được lấy 4 lần: 3 × 4 = 12 quả cam.' },
  { w: 2, m: 'toan', lv: 1, t: 'Toán lời văn', q: 'Mỗi con gà có 2 chân. 9 con gà có bao nhiêu chân?', o: ['18', '11', '16', '20'], ex: '2 chân được lấy 9 lần: 2 × 9 = 18 chân.' },
  { w: 2, m: 'toan', lv: 1, t: 'Phép chia', q: 'Chia đều số ngôi sao trong hình thành 4 hàng. Mỗi hàng có mấy ngôi sao?', fig: { type: 'tokens', rows: [['star', 'star', 'star', 'star', 'star'], ['star', 'star', 'star', 'star', 'star'], ['star', 'star', 'star', 'star', 'star'], ['star', 'star', 'star', 'star', 'star']] }, o: ['5', '4', '16', '20'], ex: 'Có 20 ngôi sao chia 4 hàng: 20 : 4 = 5 ngôi sao mỗi hàng.' },
  { w: 2, m: 'toan', lv: 2, t: 'Tia số', q: 'Thỏ nhảy như hình, mỗi bước 4 đơn vị. Phép tính nào đúng?', fig: { type: 'numline', from: 0, to: 24, label: [0, 4, 8, 12, 16, 20, 24], hops: [[0, 4, '+4'], [4, 8, '+4'], [8, 12, '+4'], [12, 16, '+4'], [16, 20, '+4'], [20, 24, '+4']] }, o: ['4 × 6 = 24', '4 + 6 = 10', '4 × 5 = 20', '6 × 6 = 36'], ex: 'Có 6 bước, mỗi bước 4 đơn vị: 4 × 6 = 24.' },
  { w: 2, m: 'toan', lv: 2, t: 'Bảng nhân', q: 'Số nào nhân với 5 được 45?', o: ['9', '8', '40', '50'], ex: '5 × 9 = 45, vậy số cần tìm là 9.' },
  { w: 2, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Các mặt xúc xắc trong hình có tất cả bao nhiêu chấm?', fig: { type: 'tokens', row: ['dice.5', 'dice.5', 'dice.5', 'dice.5', 'dice.5', 'dice.5'] }, o: ['30', '11', '25', '35'], ex: 'Có 6 mặt, mỗi mặt 5 chấm: 5 × 6 = 30 chấm.' },
  { w: 2, m: 'toan', lv: 2, t: 'Bảng chia', q: 'Có 32 cái bút chia đều vào 4 hộp. Mỗi hộp có mấy cái bút?', o: ['8', '28', '7', '36'], ex: '32 : 4 = 8 cái bút mỗi hộp.' },

  // Tuần 3
  { w: 3, m: 'toan', lv: 1, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 4, m: 15 }, o: ['4 giờ 15 phút', '4 giờ 3 phút', '3 giờ 15 phút', '3 giờ 20 phút'], ex: 'Kim ngắn qua số 4 một chút, kim dài chỉ số 3 là 15 phút: 4 giờ 15 phút.' },
  { w: 3, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 8, m: 30 }, o: ['8 giờ 30 phút', '9 giờ 30 phút', '6 giờ 40 phút', '8 giờ 6 phút'], ex: 'Kim ngắn ở giữa 8 và 9 (chưa tới 9), kim dài chỉ số 6: 8 giờ 30 phút.' },
  { w: 3, m: 'toan', lv: 1, t: 'Xem lịch', q: 'Ngày 2 tháng 9 là thứ mấy?', fig: { type: 'calendar', days: 30, start: 2, mark: [2], title: 'Tháng 9' }, o: ['Thứ Năm', 'Thứ Tư', 'Thứ Sáu', 'Thứ Ba'], ex: 'Ngày 2 nằm ở cột T5 nên là thứ Năm.' },
  { w: 3, m: 'toan', lv: 2, t: 'Đo độ dài', q: 'Bút chì dài bao nhiêu xăng-ti-mét?', fig: { type: 'ruler', len: 6, start: 2, max: 10 }, o: ['6 cm', '8 cm', '2 cm', '10 cm'], ex: 'Bút chì bắt đầu ở vạch 2, kết thúc ở vạch 8: 8 − 2 = 6 cm.' },
  { w: 3, m: 'toan', lv: 1, t: 'Đo độ dài', q: '1 m bằng bao nhiêu xăng-ti-mét?', o: ['100 cm', '10 cm', '1000 cm', '50 cm'], ex: '1 m = 10 dm = 100 cm.' },
  { w: 3, m: 'toan', lv: 2, t: 'Khối lượng', q: 'Cân thăng bằng. Quả bí nặng bao nhiêu ki-lô-gam?', fig: { type: 'balance', left: ['🎃', '2 kg'], right: ['5 kg', '1 kg'], tilt: 0 }, o: ['4 kg', '6 kg', '8 kg', '3 kg'], ex: 'Đĩa phải nặng 5 + 1 = 6 kg. Quả bí cùng quả cân 2 kg nặng 6 kg, nên quả bí nặng 6 − 2 = 4 kg.' },
  { w: 3, m: 'toan', lv: 1, t: 'Dung tích', q: 'Cả hai can có bao nhiêu lít nước?', fig: { type: 'jug', items: [{ cap: 5, v: 2, unit: 'l' }, { cap: 5, v: 3, unit: 'l' }] }, o: ['5 l', '10 l', '1 l', '6 l'], ex: 'Can thứ nhất 2 l, can thứ hai 3 l: 2 + 3 = 5 l. Số 5 trên vạch cao nhất là sức chứa của can.' },
  { w: 3, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Đường gấp khúc gồm ba đoạn dài 12 cm, 15 cm và 9 cm. Đường gấp khúc dài bao nhiêu?', o: ['36 cm', '27 cm', '35 cm', '24 cm'], ex: 'Độ dài đường gấp khúc là tổng các đoạn: 12 + 15 + 9 = 36 cm.' },
  { w: 3, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình bên có mấy hình tứ giác?', fig: { type: 'tokens', row: ['sq.blue', 'tri.red', 'rect.green', 'circle.yellow', 'diamond.purple', 'tri.orange'] }, o: ['3', '2', '4', '6'], ex: 'Tứ giác có 4 cạnh: hình vuông, hình chữ nhật và hình thoi. Có 3 hình.' },

  // Tuần 4
  { w: 4, m: 'toan', lv: 1, t: 'Bảng nhân', q: '6 × 7 = ?', o: ['42', '48', '36', '13'], ex: 'Bảng nhân 6: 6 × 7 = 42.' },
  { w: 4, m: 'toan', lv: 2, t: 'Bảng nhân', q: '7 × 8 = ?', o: ['56', '54', '63', '15'], ex: 'Bảng nhân 7: 7 × 8 = 56.' },
  { w: 4, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Mỗi hàng có 6 chiếc bánh trung thu. Hình bên có bao nhiêu chiếc bánh?', fig: { type: 'tokens', rows: [['🥮', '🥮', '🥮', '🥮', '🥮', '🥮'], ['🥮', '🥮', '🥮', '🥮', '🥮', '🥮'], ['🥮', '🥮', '🥮', '🥮', '🥮', '🥮'], ['🥮', '🥮', '🥮', '🥮', '🥮', '🥮']] }, o: ['24', '10', '18', '30'], ex: '4 hàng, mỗi hàng 6 chiếc: 6 × 4 = 24 chiếc bánh.' },
  { w: 4, m: 'toan', lv: 1, t: 'Phép chia', q: 'Có 42 bạn xếp đều thành 7 hàng. Mỗi hàng có mấy bạn?', o: ['6', '35', '7', '49'], ex: '42 : 7 = 6 bạn mỗi hàng.' },
  { w: 4, m: 'toan', lv: 1, t: 'Bảng nhân', q: 'Số tiếp theo của dãy 6, 12, 18, … là số nào?', o: ['24', '22', '20', '36'], ex: 'Dãy đếm thêm 6 (bảng nhân 6): 18 + 6 = 24.' },
  { w: 4, m: 'toan', lv: 3, t: 'Bảng nhân', q: '7 × 6 + 7 bằng 7 nhân với số nào?', o: ['7', '13', '6', '8'], ex: '7 × 6 là 6 lần số 7, thêm một lần 7 nữa thành 7 lần: 7 × 7.' },
  { w: 4, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Có tất cả bao nhiêu chấm?', fig: { type: 'tokens', row: ['dice.6', 'dice.6', 'dice.6', 'dice.6'] }, o: ['24', '10', '20', '18'], ex: '4 mặt, mỗi mặt 6 chấm: 6 × 4 = 24 chấm.' },
  { w: 4, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Trường trồng 3 hàng cây như hình. Có tất cả bao nhiêu cây?', fig: { type: 'tokens', rows: [['🌳', '🌳', '🌳', '🌳', '🌳', '🌳', '🌳'], ['🌳', '🌳', '🌳', '🌳', '🌳', '🌳', '🌳'], ['🌳', '🌳', '🌳', '🌳', '🌳', '🌳', '🌳']] }, o: ['21', '10', '24', '18'], ex: '3 hàng, mỗi hàng 7 cây: 7 × 3 = 21 cây.' },

  // Tuần 5
  { w: 5, m: 'toan', lv: 2, t: 'Bảng chia', q: '72 : 8 = ?', o: ['9', '8', '64', '7'], ex: 'Vì 8 × 9 = 72 nên 72 : 8 = 9.' },
  { w: 5, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Hình bên có bao nhiêu ô vuông?', fig: { type: 'grid', cols: 9, rows: 4, fill: ['#########', '#########', '#########', '#########'] }, o: ['36', '13', '32', '27'], ex: '4 hàng, mỗi hàng 9 ô: 9 × 4 = 36 ô vuông.' },
  { w: 5, m: 'toan', lv: 1, t: 'Toán lời văn', q: 'Mỗi con nhện có 8 chân. 5 con nhện có bao nhiêu chân?', o: ['40', '13', '45', '35'], ex: '8 chân được lấy 5 lần: 8 × 5 = 40 chân.' },
  { w: 5, m: 'toan', lv: 1, t: 'Toán lời văn', q: 'Cô chia đều 56 quyển vở cho 8 bạn. Mỗi bạn được mấy quyển?', o: ['7', '6', '48', '8'], ex: '56 : 8 = 7 quyển vở.' },
  { w: 5, m: 'toan', lv: 2, t: 'Bảng nhân', q: '9 × ? = 54. Số thích hợp ở dấu hỏi là:', o: ['6', '7', '45', '63'], ex: 'Bảng nhân 9: 9 × 6 = 54.' },
  { w: 5, m: 'toan', lv: 1, t: 'Tia số', q: 'Ếch nhảy mỗi bước 8 đơn vị. Số ở dấu hỏi là số nào?', fig: { type: 'numline', from: 0, to: 40, step: 4, label: [0, 8, 16, 24, 40], ask: [32], hops: [[0, 8, '+8'], [8, 16, '+8'], [16, 24, '+8'], [24, 32, '+8']] }, o: ['32', '28', '30', '36'], ex: 'Bước thứ tư: 24 + 8 = 32, cũng là 8 × 4 = 32.' },
  { w: 5, m: 'toan', lv: 2, t: 'Bảng chia', q: 'Cô xếp 63 cái ghế đều thành 9 hàng. Mỗi hàng có mấy cái ghế?', o: ['7', '8', '54', '6'], ex: '63 : 9 = 7 cái ghế mỗi hàng.' },

  // Tuần 6
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '? × 4 = 36. Số thích hợp ở dấu hỏi là:', o: ['9', '32', '8', '40'], ex: 'Muốn tìm thừa số, lấy tích chia cho thừa số kia: 36 : 4 = 9.' },
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '? : 5 = 7. Số thích hợp ở dấu hỏi là:', o: ['35', '12', '2', '30'], ex: 'Muốn tìm số bị chia, lấy thương nhân số chia: 7 × 5 = 35.' },
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '42 : ? = 6. Số thích hợp ở dấu hỏi là:', o: ['7', '36', '8', '48'], ex: 'Muốn tìm số chia, lấy số bị chia chia cho thương: 42 : 6 = 7.' },
  { w: 6, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy hình tròn?', fig: { type: 'frac', shape: 'circle', n: 3, k: 1 }, o: ['1/3', '1/2', '1/4', '3/1'], ex: 'Hình tròn chia 3 phần bằng nhau, tô 1 phần: đã tô 1/3 hình.' },
  { w: 6, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy băng giấy?', fig: { type: 'frac', shape: 'bar', n: 6, k: 1 }, o: ['1/6', '1/5', '1/7', '6/1'], ex: 'Băng giấy chia 6 phần bằng nhau, tô 1 phần: 1/6.' },
  { w: 6, m: 'toan', lv: 1, t: 'Một phần mấy', q: '1/4 của 20 cái kẹo là mấy cái kẹo?', o: ['5', '16', '24', '80'], ex: 'Lấy 20 chia thành 4 phần bằng nhau: 20 : 4 = 5 cái kẹo.' },
  { w: 6, m: 'toan', lv: 2, t: 'Một phần mấy', q: 'Lấy 1/3 số quả táo trong hình. Được mấy quả táo?', fig: { type: 'tokens', rows: [['🍎', '🍎', '🍎', '🍎'], ['🍎', '🍎', '🍎', '🍎'], ['🍎', '🍎', '🍎', '🍎']] }, o: ['4', '3', '9', '6'], ex: 'Có 12 quả táo. 1/3 của 12 là 12 : 3 = 4 quả.' },
  { w: 6, m: 'toan', lv: 2, t: 'Một phần mấy', q: 'Mẹ có 18 quả trứng, đã dùng 1/6 số trứng. Mẹ đã dùng mấy quả trứng?', o: ['3', '12', '6', '15'], ex: '1/6 của 18 quả là 18 : 6 = 3 quả trứng.' },
  { w: 6, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy hình chữ nhật?', fig: { type: 'frac', shape: 'grid', n: 8, k: 1, cols: 4 }, o: ['1/8', '1/7', '1/4', '8/1'], ex: 'Hình chia 8 phần bằng nhau, tô 1 phần: 1/8.' },

  // Tuần 7
  { w: 7, m: 'toan', lv: 2, t: 'Trung điểm', q: 'Điểm nào là trung điểm của đoạn thẳng AB?', fig: { type: 'lines', pts: { A: [0, 4], B: [8, 4], C: [4, 0], M: [4, 4], N: [6, 4] }, segs: [['A', 'B'], ['A', 'C'], ['C', 'B']] }, o: ['M', 'C', 'N', 'A'], ex: 'Trung điểm phải nằm trên đoạn AB và ở chính giữa: điểm M. Điểm C ở giữa nhưng không nằm trên AB.' },
  { w: 7, m: 'toan', lv: 1, t: 'Trung điểm', q: 'O là trung điểm của đoạn thẳng AB dài 10 cm. Đoạn OA dài bao nhiêu?', o: ['5 cm', '10 cm', '20 cm', '2 cm'], ex: 'Trung điểm chia đoạn thẳng thành hai phần bằng nhau: 10 : 2 = 5 cm.' },
  { w: 7, m: 'toan', lv: 2, t: 'Trung điểm', q: 'M là trung điểm của đoạn thẳng CD, CM dài 7 cm. Đoạn CD dài bao nhiêu?', o: ['14 cm', '7 cm', '3 cm', '21 cm'], ex: 'CD gấp đôi CM: 7 × 2 = 14 cm.' },
  { w: 7, m: 'toan', lv: 3, t: 'Trung điểm', q: 'Trung điểm của băng giấy hồng ứng với vạch số mấy trên thước?', fig: { type: 'ruler', len: 8, start: 2, max: 12, obj: 'ribbon' }, o: ['6', '4', '5', '8'], ex: 'Băng giấy từ vạch 2 đến vạch 10, dài 8 cm. Một nửa là 4 cm, tính từ vạch 2: 2 + 4 = 6.' },
  { w: 7, m: 'toan', lv: 2, t: 'Một phần mấy', q: '1/5 của 45 kg là bao nhiêu?', o: ['9 kg', '40 kg', '50 kg', '8 kg'], ex: '45 : 5 = 9 kg.' },
  { w: 7, m: 'toan', lv: 2, t: 'Trung điểm', q: 'Điểm ở chính giữa vạch 20 và vạch 40 trên thước ứng với số nào?', o: ['30', '20', '25', '60'], ex: 'Từ 20 đến 40 là 20 đơn vị, một nửa là 10. 20 + 10 = 30.' },

  // Tuần 8
  { w: 8, m: 'toan', lv: 1, t: 'Hình tròn', q: 'Đoạn thẳng nào là đường kính của hình tròn tâm O?', fig: { type: 'lines', pts: { O: [0, 0], A: [-3, 0], B: [3, 0], C: [0, -3] }, segs: [['A', 'B'], ['O', 'C']], circles: [[0, 0, 3]] }, o: ['AB', 'OC', 'OA', 'AC'], ex: 'Đường kính đi qua tâm O, hai đầu nằm trên đường tròn: AB. OC là bán kính.' },
  { w: 8, m: 'toan', lv: 1, t: 'Hình tròn', q: 'Hình tròn có bán kính 4 cm. Đường kính dài bao nhiêu?', o: ['8 cm', '2 cm', '4 cm', '16 cm'], ex: 'Đường kính dài gấp 2 lần bán kính: 4 × 2 = 8 cm.' },
  { w: 8, m: 'toan', lv: 2, t: 'Hình tròn', q: 'Hình tròn có đường kính 10 cm. Bán kính dài bao nhiêu?', o: ['5 cm', '20 cm', '10 cm', '2 cm'], ex: 'Bán kính bằng một nửa đường kính: 10 : 2 = 5 cm.' },
  { w: 8, m: 'toan', lv: 2, t: 'Hình tròn', q: 'Hình bên có mấy bán kính của hình tròn tâm O?', fig: { type: 'lines', pts: { O: [0, 0], A: [3, 0], B: [-1.5, -2.6], C: [-2.6, 1.5], D: [0, 3], E: [2.6, 1.5] }, segs: [['O', 'A'], ['O', 'B'], ['O', 'C'], ['D', 'E']], circles: [[0, 0, 3]] }, o: ['3', '4', '5', '2'], ex: 'Bán kính nối tâm O với một điểm trên đường tròn: OA, OB, OC. Đoạn DE không đi qua tâm.' },
  { w: 8, m: 'toan', lv: 3, t: 'Góc vuông', q: 'Hình tứ giác ABCD có mấy góc vuông?', fig: { type: 'poly', pts: [[0, 0], [6, 0], [6, 4], [2, 4]], names: ['A', 'B', 'C', 'D'] }, o: ['2', '4', '1', '3'], ex: 'Chỉ có góc đỉnh B và góc đỉnh C là góc vuông. Góc A và góc D bị xiên.' },
  { w: 8, m: 'toan', lv: 2, t: 'Góc vuông', q: 'Hình tam giác ABC có góc vuông ở đỉnh nào?', fig: { type: 'poly', pts: [[0, 0], [0, 5], [6, 5]], names: ['A', 'B', 'C'] }, o: ['đỉnh B', 'đỉnh A', 'đỉnh C', 'đỉnh A và đỉnh C'], ex: 'Cạnh BA thẳng đứng, cạnh BC nằm ngang nên góc đỉnh B là góc vuông.' },
  { w: 8, m: 'toan', lv: 2, t: 'Góc vuông', q: 'Lúc mấy giờ đúng thì hai kim đồng hồ tạo thành một góc vuông?', o: ['3 giờ', '6 giờ', '12 giờ', '2 giờ'], ex: 'Lúc 3 giờ kim dài chỉ 12, kim ngắn chỉ 3, tạo góc vuông. Lúc 6 giờ hai kim thẳng hàng.' },
  { w: 8, m: 'toan', lv: 1, t: 'Góc vuông', q: 'Góc đỉnh O cạnh OA, OB là góc gì?', fig: { type: 'angle', deg: 90, names: ['A', 'O', 'B'] }, o: ['góc vuông', 'góc không vuông', 'đường thẳng', 'hình tam giác'], ex: 'Hai cạnh OA, OB vuông với nhau, có kí hiệu góc vuông ở đỉnh O.' },

  // Tuần 9
  { w: 9, m: 'toan', lv: 3, t: 'Đếm hình', q: 'Hình bên có bao nhiêu hình tam giác?', fig: { type: 'lines', pts: { A: [3, 0], B: [0, 5], D: [2, 5], E: [4, 5], C: [6, 5] }, segs: [['A', 'B'], ['A', 'D'], ['A', 'E'], ['A', 'C'], ['B', 'C']] }, o: ['6', '3', '4', '5'], ex: 'Tam giác ABD, ADE, AEC (3 hình nhỏ), ABE, ADC (ghép 2), ABC (ghép 3): 6 hình.' },
  { w: 9, m: 'toan', lv: 1, t: 'Hình phẳng', q: 'Hình vuông ABCD có cạnh AB dài 6 cm. Cạnh CD dài bao nhiêu?', o: ['6 cm', '12 cm', '24 cm', '3 cm'], ex: 'Hình vuông có 4 cạnh dài bằng nhau nên CD = AB = 6 cm.' },
  { w: 9, m: 'toan', lv: 1, t: 'Hình phẳng', q: 'Nhìn hình chữ nhật ABCD, cạnh CD dài bao nhiêu?', fig: { type: 'poly', pts: [[0, 0], [8, 0], [8, 4], [0, 4]], sides: ['8 cm', '4 cm', '', ''], names: ['A', 'B', 'C', 'D'], right: [0, 1, 2, 3] }, o: ['8 cm', '4 cm', '12 cm', '16 cm'], ex: 'Hình chữ nhật có hai cạnh dài bằng nhau: CD = AB = 8 cm.' },
  { w: 9, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình bên có mấy hình tam giác?', fig: { type: 'tokens', row: ['tri.red', 'sq.blue', 'tri.green.180', 'circle.yellow', 'tri.orange.90', 'rect.purple'] }, o: ['3', '2', '1', '4'], ex: 'Có 3 hình tam giác (đỏ, xanh lá, cam). Hình bị xoay vẫn là hình tam giác.' },
  { w: 9, m: 'toan', lv: 2, t: 'Đếm hình', q: 'Hình bên có bao nhiêu hình tứ giác?', fig: { type: 'lines', pts: { A: [0, 0], B: [4, 0], C: [8, 0], D: [0, 4], E: [4, 4], F: [8, 4] }, segs: [['A', 'B'], ['B', 'C'], ['D', 'E'], ['E', 'F'], ['A', 'D'], ['B', 'E'], ['C', 'F']] }, o: ['3', '2', '4', '6'], ex: 'Hai hình nhỏ ABED, BCFE và hình lớn ACFD: 3 hình tứ giác.' },
  { w: 9, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình tứ giác có mấy cạnh và mấy đỉnh?', o: ['4 cạnh, 4 đỉnh', '4 cạnh, 3 đỉnh', '3 cạnh, 4 đỉnh', '4 cạnh, 8 đỉnh'], ex: 'Hình tứ giác có 4 cạnh và 4 đỉnh.' },

  // Tuần 10
  { w: 10, m: 'toan', lv: 3, t: 'Khối hình', q: 'Hình bên có bao nhiêu khối lập phương?', fig: { type: 'cubes', cols: [[2, 1], [1, 1]] }, o: ['5', '4', '6', '3'], ex: 'Hàng sau có 2 + 1 = 3 khối, hàng trước có 1 + 1 = 2 khối: 5 khối. Có khối bị che phía sau.' },
  { w: 10, m: 'toan', lv: 2, t: 'Khối hình', q: 'Khối hộp chữ nhật có mấy đỉnh?', o: ['8', '6', '12', '4'], ex: 'Khối hộp chữ nhật có 8 đỉnh, 12 cạnh, 6 mặt.' },
  { w: 10, m: 'toan', lv: 2, t: 'Khối hình', q: 'Khối lập phương có mấy cạnh?', o: ['12', '8', '6', '4'], ex: 'Mặt trên 4 cạnh, mặt dưới 4 cạnh, 4 cạnh đứng: 12 cạnh.' },
  { w: 10, m: 'toan', lv: 1, t: 'Khối hình', q: 'Đồ vật nào có dạng khối lập phương?', o: ['con xúc xắc', 'hộp bút', 'quả bóng', 'lon nước ngọt'], ex: 'Con xúc xắc có 6 mặt vuông bằng nhau. Hộp bút có dạng khối hộp chữ nhật.' },
  { w: 10, m: 'toan', lv: 1, t: 'Khối hình', q: 'Hình bên có bao nhiêu khối lập phương?', fig: { type: 'cubes', cols: [[1, 2, 3]] }, o: ['6', '3', '5', '4'], ex: 'Ba cột cao 1, 2, 3 khối: 1 + 2 + 3 = 6 khối.' },
  { w: 10, m: 'toan', lv: 3, t: 'Khối hình', q: 'Hình bên có bao nhiêu khối lập phương?', fig: { type: 'cubes', cols: [[2, 2], [2, 2]] }, o: ['8', '4', '6', '12'], ex: 'Hai hàng, mỗi hàng 2 cột, mỗi cột 2 khối: 2 × 2 × 2 = 8 khối. Hàng sau bị che.' },

  // Tuần 11
  { w: 11, m: 'toan', lv: 2, t: 'Nhân với số có một chữ số', q: 'Kết quả phép nhân bên là bao nhiêu?', fig: { type: 'vcalc', a: 24, b: 3, op: '×', res: '?' }, o: ['72', '62', '27', '612'], ex: '3 × 4 = 12, viết 2 nhớ 1; 3 × 2 = 6, thêm 1 là 7. Kết quả 72.' },
  { w: 11, m: 'toan', lv: 2, t: 'Nhân với số có một chữ số', q: 'Kết quả phép nhân bên là bao nhiêu?', fig: { type: 'vcalc', a: 16, b: 5, op: '×', res: '?' }, o: ['80', '50', '530', '21'], ex: '5 × 6 = 30, viết 0 nhớ 3; 5 × 1 = 5, thêm 3 là 8. Kết quả 80.' },
  { w: 11, m: 'toan', lv: 1, t: 'Gấp một số lần', q: 'Hàng dưới có số bông hoa gấp 3 lần hàng trên trong hình. Hàng dưới có mấy bông?', fig: { type: 'tokens', row: ['🌸', '🌸', '🌸'] }, o: ['9', '6', '3', '12'], ex: 'Hàng trên 3 bông. Gấp 3 lần: 3 × 3 = 9 bông.' },
  { w: 11, m: 'toan', lv: 2, t: 'Gấp một số lần', q: 'Đoạn AB dài 5 cm, đoạn CD dài gấp 4 lần đoạn AB. Đoạn CD dài bao nhiêu?', o: ['20 cm', '9 cm', '1 cm', '25 cm'], ex: 'Gấp 4 lần: 5 × 4 = 20 cm.' },
  { w: 11, m: 'toan', lv: 3, t: 'Đặt tính', q: 'Chữ số nào thay cho dấu hỏi?', fig: { type: 'vcalc', a: 27, b: 3, op: '×', res: 81, hide: { a: [0] } }, o: ['2', '3', '8', '1'], ex: '3 × 7 = 21, viết 1 nhớ 2. Hàng chục được 8 nên 3 × ? + 2 = 8, ? = 2. Thử: 27 × 3 = 81.' },
  { w: 11, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi xe chở 18 thùng hàng. 4 xe chở bao nhiêu thùng hàng?', o: ['72', '42', '22', '62'], ex: '18 × 4: 4 × 8 = 32, viết 2 nhớ 3; 4 × 1 = 4, thêm 3 là 7. Được 72 thùng.' },
  { w: 11, m: 'toan', lv: 1, t: 'Gấp một số lần', q: 'Nam câu được số cá gấp 2 lần số cá trong hình. Nam câu được mấy con cá?', fig: { type: 'tokens', row: ['🐟', '🐟', '🐟', '🐟', '🐟'] }, o: ['10', '7', '5', '3'], ex: 'Trong hình có 5 con. Gấp 2 lần: 5 × 2 = 10 con cá.' },

  // Tuần 12
  { w: 12, m: 'toan', lv: 2, t: 'Chia có dư', q: '17 : 5 = ?', o: ['3 (dư 2)', '2 (dư 7)', '3 (dư 1)', '4 (dư 3)'], ex: '5 × 3 = 15, 17 − 15 = 2. Số dư 2 bé hơn số chia 5. Dư 7 là sai vì 7 lớn hơn 5.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia có dư', q: 'Trong phép chia cho 6, số dư lớn nhất có thể là bao nhiêu?', o: ['5', '6', '7', '1'], ex: 'Số dư luôn bé hơn số chia. Số lớn nhất bé hơn 6 là 5.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia có dư', q: 'Xếp số kẹo trong hình vào các túi, mỗi túi 4 cái. Được mấy túi, thừa mấy cái?', fig: { type: 'tokens', rows: [['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬'], ['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬']] }, o: ['3 túi, thừa 2 cái', '4 túi, thừa 2 cái', '3 túi, thừa 1 cái', '2 túi, thừa 6 cái'], ex: 'Có 14 cái kẹo. 14 : 4 = 3 (dư 2): 3 túi, thừa 2 cái.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia cho số có một chữ số', q: '96 : 3 = ?', o: ['32', '23', '33', '31'], ex: '9 : 3 = 3, 6 : 3 = 2. Viết lần lượt từ hàng chục: 32.' },
  { w: 12, m: 'toan', lv: 3, t: 'Chia cho số có một chữ số', q: '72 : 3 = ?', o: ['24', '20', '21', '23'], ex: '7 : 3 = 2 dư 1. Hạ 2 được 12, 12 : 3 = 4. Kết quả 24.' },
  { w: 12, m: 'toan', lv: 3, t: 'Chia có dư', q: 'Lớp có 30 bạn, mỗi bàn ngồi 4 bạn. Cần ít nhất mấy cái bàn?', o: ['8', '7', '6', '9'], ex: '30 : 4 = 7 (dư 2). 7 bàn còn 2 bạn chưa có chỗ nên cần thêm 1 bàn: 8 bàn.' },
  { w: 12, m: 'toan', lv: 1, t: 'Chia có dư', q: 'Phép chia nào là phép chia hết?', o: ['36 : 4', '38 : 4', '37 : 4', '35 : 4'], ex: '36 : 4 = 9, không còn dư. Các phép còn lại đều có dư.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia có dư', q: 'Số bị chia là 45, số chia là 7. Số dư là bao nhiêu?', o: ['3', '6', '2', '4'], ex: '7 × 6 = 42, 45 − 42 = 3. Thương là 6, số dư là 3.' },

  // Tuần 13
  { w: 13, m: 'toan', lv: 1, t: 'Giảm một số lần', q: 'Giảm 24 đi 4 lần được bao nhiêu?', o: ['6', '20', '28', '96'], ex: 'Giảm đi 4 lần thì chia cho 4: 24 : 4 = 6.' },
  { w: 13, m: 'toan', lv: 1, t: 'Giảm một số lần', q: 'Giảm số con gà trong hình đi 3 lần thì còn mấy con?', fig: { type: 'tokens', rows: [['🐔', '🐔', '🐔', '🐔', '🐔', '🐔'], ['🐔', '🐔', '🐔', '🐔', '🐔', '🐔']] }, o: ['4', '9', '3', '36'], ex: 'Có 12 con gà. Giảm 3 lần: 12 : 3 = 4 con. Bớt đi 3 con là cách làm sai.' },
  { w: 13, m: 'toan', lv: 2, t: 'Giảm một số lần', q: 'Số 56 giảm đi 7 lần được số nào?', o: ['8', '49', '63', '7'], ex: '56 : 7 = 8.' },
  { w: 13, m: 'toan', lv: 2, t: 'Bài toán hai bước', q: 'Lan có 12 nhãn vở, Hà có nhiều hơn Lan 5 nhãn vở. Cả hai bạn có bao nhiêu nhãn vở?', o: ['29', '17', '24', '19'], ex: 'Hà có 12 + 5 = 17 nhãn vở. Cả hai có 12 + 17 = 29 nhãn vở.' },
  { w: 13, m: 'toan', lv: 2, t: 'Bài toán hai bước', q: 'Thùng thứ nhất có 24 l dầu, thùng thứ hai ít hơn 6 l. Cả hai thùng có bao nhiêu lít dầu?', o: ['42 l', '18 l', '54 l', '30 l'], ex: 'Thùng hai: 24 − 6 = 18 l. Cả hai: 24 + 18 = 42 l.' },
  { w: 13, m: 'toan', lv: 2, t: 'Bài toán hai bước', q: 'Hàng dưới có số quả cam gấp 2 lần hàng trên trong hình. Cả hai hàng có bao nhiêu quả?', fig: { type: 'tokens', row: ['🍊', '🍊', '🍊', '🍊'] }, o: ['12', '8', '6', '10'], ex: 'Hàng dưới: 4 × 2 = 8 quả. Cả hai hàng: 4 + 8 = 12 quả.' },
  { w: 13, m: 'toan', lv: 3, t: 'Bài toán hai bước', q: 'Đàn gà có 28 con, 1/4 số gà là gà trống, còn lại là gà mái. Có bao nhiêu con gà mái?', o: ['21', '7', '24', '32'], ex: 'Gà trống: 28 : 4 = 7 con. Gà mái: 28 − 7 = 21 con.' },
  { w: 13, m: 'toan', lv: 3, t: 'Bài toán hai bước', q: 'Tấm vải dài 36 m, đã cắt đi 1/3 tấm vải. Tấm vải còn lại bao nhiêu mét?', o: ['24 m', '12 m', '33 m', '18 m'], ex: 'Đã cắt 36 : 3 = 12 m. Còn lại 36 − 12 = 24 m.' },

  // Tuần 14
  { w: 14, m: 'toan', lv: 3, t: 'Mi-li-mét', q: 'Chiếc đinh dài bao nhiêu mi-li-mét?', fig: { type: 'ruler', len: 3.5, start: 0, max: 6, obj: 'nail' }, o: ['35 mm', '30 mm', '3 mm', '40 mm'], ex: 'Đinh dài 3 cm và thêm 5 vạch nhỏ: 30 mm + 5 mm = 35 mm.' },
  { w: 14, m: 'toan', lv: 2, t: 'Mi-li-mét', q: '5 cm 3 mm bằng bao nhiêu mi-li-mét?', o: ['53 mm', '8 mm', '503 mm', '35 mm'], ex: '5 cm = 50 mm, thêm 3 mm: 53 mm.' },
  { w: 14, m: 'toan', lv: 2, t: 'Mi-li-mét', q: 'Băng giấy dài bao nhiêu mi-li-mét?', fig: { type: 'ruler', len: 2, start: 1, max: 5, obj: 'ribbon' }, o: ['20 mm', '30 mm', '2 mm', '10 mm'], ex: 'Băng giấy từ vạch 1 đến vạch 3: dài 2 cm = 20 mm.' },
  { w: 14, m: 'toan', lv: 1, t: 'Gam', q: '1 kg bằng bao nhiêu gam?', o: ['1000 g', '100 g', '10 g', '10 000 g'], ex: '1 kg = 1000 g.' },
  { w: 14, m: 'toan', lv: 2, t: 'Gam', q: 'Cân thăng bằng. Quả táo nặng bao nhiêu gam?', fig: { type: 'balance', left: ['🍎'], right: ['100 g', '100 g', '50 g'], tilt: 0 }, o: ['250 g', '200 g', '150 g', '300 g'], ex: 'Quả táo nặng bằng các quả cân: 100 + 100 + 50 = 250 g.' },
  { w: 14, m: 'toan', lv: 1, t: 'Gam', q: 'Gói kẹo nặng 300 g, gói bánh nặng 450 g. Cả hai gói nặng bao nhiêu?', o: ['750 g', '750 kg', '150 g', '700 g'], ex: '300 g + 450 g = 750 g. Đơn vị vẫn là gam.' },
  { w: 14, m: 'toan', lv: 1, t: 'Gam', q: 'Cân nghiêng như hình. Quả nào nặng hơn?', fig: { type: 'balance', left: ['🍍'], right: ['🍌'], tilt: -1 }, o: ['quả dứa', 'quả chuối', 'hai quả nặng bằng nhau', 'chưa biết được'], ex: 'Đĩa cân bên dứa thấp xuống nên quả dứa nặng hơn.' },
  { w: 14, m: 'toan', lv: 2, t: 'Gam', q: 'Cân thăng bằng. Gói kẹo nặng bao nhiêu gam?', fig: { type: 'balance', left: ['🍬', '200 g'], right: ['500 g'], tilt: 0 }, o: ['300 g', '700 g', '500 g', '200 g'], ex: 'Gói kẹo cùng quả cân 200 g nặng bằng 500 g: 500 − 200 = 300 g.' },
  { w: 14, m: 'toan', lv: 2, t: 'Gam', q: '800 g + 200 g bằng bao nhiêu?', o: ['1 kg', '10 kg', '1000 kg', '100 g'], ex: '800 g + 200 g = 1000 g = 1 kg.' },

  // Tuần 15
  { w: 15, m: 'toan', lv: 1, t: 'Mi-li-lít', q: 'Bình bên có bao nhiêu mi-li-lít nước?', fig: { type: 'jug', items: [{ cap: 500, v: 300, unit: 'ml' }] }, o: ['300 ml', '500 ml', '200 ml', '3 ml'], ex: 'Mặt nước ngang vạch 300: có 300 ml. Vạch 500 là sức chứa của bình.' },
  { w: 15, m: 'toan', lv: 2, t: 'Mi-li-lít', q: 'Cả hai bình có bao nhiêu mi-li-lít nước?', fig: { type: 'jug', items: [{ cap: 1000, v: 600, unit: 'ml' }, { cap: 1000, v: 400, unit: 'ml' }] }, o: ['1000 ml', '200 ml', '2000 ml', '900 ml'], ex: '600 ml + 400 ml = 1000 ml, đúng bằng 1 l.' },
  { w: 15, m: 'toan', lv: 2, t: 'Nhiệt độ', q: 'Nhiệt kế chỉ bao nhiêu độ C?', fig: { type: 'thermo', v: 37, min: 30, max: 42 }, o: ['37 °C', '36 °C', '40 °C', '73 °C'], ex: 'Cột đỏ dừng ở vạch 37: nhiệt kế chỉ 37 °C, bằng thân nhiệt người khỏe.' },
  { w: 15, m: 'toan', lv: 1, t: 'Nhiệt độ', q: 'Nhiệt kế chỉ bao nhiêu độ C?', fig: { type: 'thermo', v: 18, min: 0, max: 50 }, o: ['18 °C', '20 °C', '81 °C', '15 °C'], ex: 'Cột đỏ dừng ở vạch 18: 18 °C.' },
  { w: 15, m: 'toan', lv: 1, t: 'Nhiệt độ', q: 'Ngày hè nắng nóng ở Hà Nội, nhiệt độ ngoài trời có thể khoảng bao nhiêu?', o: ['35 °C', '5 °C', '100 °C', '0 °C'], ex: 'Ngày hè nóng thường khoảng 35 °C. 0 °C là nước đóng băng, 100 °C là nước sôi.' },
  { w: 15, m: 'toan', lv: 2, t: 'Mi-li-lít', q: 'Rót đều chai nước 500 ml vào 5 cốc. Mỗi cốc có bao nhiêu mi-li-lít?', o: ['100 ml', '50 ml', '495 ml', '2500 ml'], ex: '500 : 5 = 100 ml mỗi cốc.' },
  { w: 15, m: 'toan', lv: 2, t: 'Nhiệt độ', q: 'Nhiệt kế chỉ bao nhiêu độ C?', fig: { type: 'thermo', v: 25, min: 0, max: 40 }, o: ['25 °C', '30 °C', '52 °C', '20 °C'], ex: 'Mỗi vạch nhỏ là 1 °C. Cột đỏ dừng ở vạch thứ năm sau 20: 25 °C.' },

  // Tuần 16
  { w: 16, m: 'toan', lv: 1, t: 'Nhân với số có một chữ số', q: 'Kết quả phép nhân bên là bao nhiêu?', fig: { type: 'vcalc', a: 213, b: 3, op: '×', res: '?' }, o: ['639', '216', '636', '693'], ex: '3 × 3 = 9, 3 × 1 = 3, 3 × 2 = 6: kết quả 639.' },
  { w: 16, m: 'toan', lv: 3, t: 'Nhân với số có một chữ số', q: '125 × 4 = ?', o: ['500', '480', '129', '400'], ex: '4 × 5 = 20, viết 0 nhớ 2; 4 × 2 = 8, thêm 2 là 10, viết 0 nhớ 1; 4 × 1 = 4, thêm 1 là 5. Được 500.' },
  { w: 16, m: 'toan', lv: 3, t: 'Chia cho số có một chữ số', q: '648 : 6 = ?', o: ['108', '18', '180', '118'], ex: '6 : 6 = 1; 4 không chia được cho 6, viết 0; 48 : 6 = 8. Kết quả 108.' },
  { w: 16, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi hộp có 125 cái bút. 3 hộp có bao nhiêu cái bút?', o: ['375', '128', '365', '355'], ex: '125 × 3 = 375 cái bút.' },
  { w: 16, m: 'toan', lv: 3, t: 'Toán lời văn', q: 'Quãng đường dài 850 m được chia thành 5 đoạn bằng nhau. Mỗi đoạn dài bao nhiêu mét?', o: ['170 m', '17 m', '160 m', '845 m'], ex: '8 : 5 = 1 dư 3; 35 : 5 = 7; 0 : 5 = 0. Được 170 m.' },
  { w: 16, m: 'toan', lv: 3, t: 'Đặt tính', q: 'Chữ số nào thay cho dấu hỏi?', fig: { type: 'vcalc', a: 184, b: 2, op: '×', res: 368, hide: { a: [1] } }, o: ['8', '6', '3', '4'], ex: '2 × 4 = 8. Hàng chục được 6, nên 2 × ? = 16, ? = 8 (viết 6 nhớ 1). Thử: 184 × 2 = 368.' },
  { w: 16, m: 'toan', lv: 3, t: 'Chia cho số có một chữ số', q: '427 : 4 = ?', o: ['106 (dư 3)', '16 (dư 3)', '106 (dư 1)', '107'], ex: '4 : 4 = 1; 2 : 4 được 0, viết 0; 27 : 4 = 6 dư 3. Kết quả 106, dư 3.' },
  { w: 16, m: 'toan', lv: 2, t: 'Nhân với số có một chữ số', q: 'Kết quả phép nhân bên là bao nhiêu?', fig: { type: 'vcalc', a: 107, b: 6, op: '×', res: '?' }, o: ['642', '602', '6042', '113'], ex: '6 × 7 = 42, viết 2 nhớ 4; 6 × 0 = 0, thêm 4 là 4; 6 × 1 = 6. Kết quả 642.' },

  // Tuần 17
  { w: 17, m: 'toan', lv: 2, t: 'Biểu thức', q: '20 + 5 × 4 = ?', o: ['40', '100', '29', '45'], ex: 'Nhân trước, cộng sau: 5 × 4 = 20, 20 + 20 = 40.' },
  { w: 17, m: 'toan', lv: 2, t: 'Biểu thức', q: '(20 + 5) × 4 = ?', o: ['100', '40', '29', '80'], ex: 'Trong ngoặc làm trước: 20 + 5 = 25, 25 × 4 = 100.' },
  { w: 17, m: 'toan', lv: 2, t: 'Biểu thức', q: '48 : 6 − 2 = ?', o: ['6', '12', '8', '4'], ex: 'Chia trước, trừ sau: 48 : 6 = 8, 8 − 2 = 6.' },
  { w: 17, m: 'toan', lv: 2, t: 'Biểu thức', q: '90 − 30 − 20 = ?', o: ['40', '80', '60', '50'], ex: 'Chỉ có phép trừ thì làm từ trái sang phải: 90 − 30 = 60, 60 − 20 = 40.' },
  { w: 17, m: 'toan', lv: 3, t: 'Biểu thức', q: 'Giá trị của biểu thức 7 × (10 − 4) là:', o: ['42', '66', '30', '64'], ex: 'Trong ngoặc trước: 10 − 4 = 6, rồi 7 × 6 = 42.' },
  { w: 17, m: 'toan', lv: 1, t: 'So sánh gấp mấy lần', q: '12 gấp mấy lần 3?', o: ['4', '9', '36', '15'], ex: 'Lấy số lớn chia số bé: 12 : 3 = 4 lần.' },
  { w: 17, m: 'toan', lv: 1, t: 'So sánh gấp mấy lần', q: 'Số bông hồng gấp mấy lần số bông cúc trong hình?', fig: { type: 'tokens', rows: [['🌹', '🌹', '🌹', '🌹', '🌹', '🌹', '🌹', '🌹'], ['🌼', '🌼']] }, o: ['4', '6', '10', '2'], ex: 'Có 8 bông hồng, 2 bông cúc: 8 : 2 = 4 lần.' },
  { w: 17, m: 'toan', lv: 2, t: 'So sánh gấp mấy lần', q: 'Mẹ 36 tuổi, con 9 tuổi. Tuổi mẹ gấp mấy lần tuổi con?', o: ['4 lần', '27 lần', '3 lần', '5 lần'], ex: '36 : 9 = 4. Tuổi mẹ gấp 4 lần tuổi con. 27 là mẹ hơn con 27 tuổi.' },
  { w: 17, m: 'toan', lv: 2, t: 'So sánh gấp mấy lần', q: 'Đoạn AB dài 30 cm, đoạn CD dài 5 cm. Đoạn AB dài gấp mấy lần đoạn CD?', o: ['6 lần', '25 lần', '5 lần', '150 lần'], ex: '30 : 5 = 6 lần.' },

  // Tuần 18
  { w: 18, m: 'toan', lv: 3, t: 'Bài toán hai bước', q: 'Hội trường có 5 hàng ghế, mỗi hàng 8 ghế. Đã có 27 bạn ngồi. Còn bao nhiêu ghế trống?', o: ['13', '40', '14', '23'], ex: 'Có 8 × 5 = 40 ghế. Còn trống 40 − 27 = 13 ghế.' },
  { w: 18, m: 'toan', lv: 2, t: 'Số đến 1 000', q: 'Số liền trước của số lớn nhất có ba chữ số là:', o: ['998', '1000', '999', '100'], ex: 'Số lớn nhất có ba chữ số là 999. Số liền trước của 999 là 998.' },
  { w: 18, m: 'toan', lv: 2, t: 'Hình tròn', q: 'O là tâm, AB là đường kính dài 12 cm. Đoạn OA dài bao nhiêu?', fig: { type: 'lines', pts: { O: [0, 0], A: [-3, 0], B: [3, 0] }, segs: [['A', 'B']], circles: [[0, 0, 3]] }, o: ['6 cm', '12 cm', '24 cm', '3 cm'], ex: 'OA là bán kính, bằng một nửa đường kính: 12 : 2 = 6 cm.' },
  { w: 18, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy hình tròn?', fig: { type: 'frac', shape: 'circle', n: 8, k: 1 }, o: ['1/8', '1/7', '1/6', '8/1'], ex: 'Hình tròn chia 8 phần bằng nhau, tô 1 phần: 1/8.' },
  { w: 18, m: 'toan', lv: 3, t: 'Biểu thức', q: 'Mua 3 quyển vở, mỗi quyển 8 nghìn đồng, và 1 cái bút 5 nghìn đồng. Hết bao nhiêu tiền?', o: ['29 nghìn đồng', '39 nghìn đồng', '16 nghìn đồng', '24 nghìn đồng'], ex: '8 × 3 + 5 = 24 + 5 = 29 nghìn đồng.' },
  { w: 18, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 10, m: 30 }, o: ['10 giờ 30 phút', '11 giờ 30 phút', '6 giờ 50 phút', '10 giờ 6 phút'], ex: 'Kim ngắn giữa 10 và 11, kim dài chỉ số 6: 10 giờ 30 phút.' },
  { w: 18, m: 'toan', lv: 3, t: 'Dung tích', q: 'Can thứ nhất có 3 l nước, can thứ hai có 500 ml. Can nào nhiều nước hơn?', o: ['can thứ nhất', 'can thứ hai', 'bằng nhau', 'chưa so được'], ex: '3 l = 3000 ml, nhiều hơn 500 ml. Đừng chỉ so 3 với 500.' },

  // ===================== TIẾNG VIỆT =====================
  // Tuần 1
  { w: 1, m: 'tv', lv: 1, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Từ nào viết đúng chính tả?', o: ['thước kẻ', 'thước cẻ', 'thướk kẻ', 'thước kẽ'], ex: 'Trước e viết k: thước kẻ. Chữ "kẻ" mang dấu hỏi.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động?', o: ['tưới cây', 'tươi tốt', 'khu vườn', 'bông hoa'], ex: 'Tưới cây là việc làm. Tươi tốt là đặc điểm, khu vườn và bông hoa là sự vật.' },
  { w: 1, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu nào là câu giới thiệu?', o: ['Em là học sinh lớp 3A.', 'Em đang tưới cây.', 'Bạn Lan rất chăm chỉ.', 'Em đi học lúc mấy giờ?'], ex: 'Câu giới thiệu trả lời câu hỏi "Ai là gì?": Em là học sinh lớp 3A.' },
  { w: 1, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu "Ông em đang tỉa cây cảnh." là câu gì?', o: ['câu nêu hoạt động', 'câu giới thiệu', 'câu nêu đặc điểm', 'câu hỏi'], ex: 'Câu cho biết ông đang làm gì (tỉa cây cảnh) nên là câu nêu hoạt động.' },
  { w: 1, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Câu bên có mấy từ chỉ hoạt động?', fig: { type: 'text', lines: ['Bà hái rau, em nhặt rau,', 'mẹ nấu canh.'] }, o: ['3', '2', '4', '6'], ex: 'Các từ chỉ hoạt động: hái, nhặt, nấu. Rau, canh là sự vật.' },
  { w: 1, m: 'tv', lv: 1, t: 'Văn bản thông dụng', q: 'Khi viết tin nhắn để lại cho mẹ, em cần ghi rõ điều gì?', o: ['em đi đâu, làm gì, khi nào về', 'tên bài hát em thích', 'thời tiết hôm qua', 'số trang sách em đọc'], ex: 'Tin nhắn cần ngắn gọn, cho người nhận biết rõ việc: em đi đâu, làm gì, khi nào về.' },
  { w: 1, m: 'tv', lv: 1, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Đồ vật trong hình tên là gì?', fig: { type: 'tokens', row: ['🪑'] }, o: ['cái ghế', 'cái gế', 'cái ghé', 'cái ghể'], ex: 'Trước ê viết gh: cái ghế, mang dấu sắc.' },

  // Tuần 2
  { w: 2, m: 'tv', lv: 1, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Điền g hay gh vào chỗ trống: "…õ cửa"?', o: ['g', 'gh', 'gi', 'ng'], ex: 'Trước o viết g: gõ cửa. Chỉ viết gh trước e, ê, i.' },
  { w: 2, m: 'tv', lv: 2, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Từ nào viết đúng chính tả?', o: ['gồ ghề', 'ghồ ghề', 'gồ gề', 'ghồ gề'], ex: 'Trước ô viết g (gồ), trước ê viết gh (ghề): gồ ghề.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm?', o: ['rực rỡ', 'ánh nắng', 'chim hót', 'lá cây'], ex: 'Rực rỡ nói lên vẻ của sự vật nên là từ chỉ đặc điểm.' },
  { w: 2, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Trong câu bên, từ nào chỉ đặc điểm?', fig: { type: 'text', lines: ['Những tán lá xanh mướt', 'đung đưa trong nắng sớm.'] }, o: ['xanh mướt', 'đung đưa', 'tán lá', 'nắng'], ex: 'Xanh mướt chỉ màu sắc của lá. Đung đưa chỉ hoạt động, tán lá và nắng là sự vật.' },
  { w: 2, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu nào là câu nêu đặc điểm?', o: ['Biển hôm nay xanh thẳm.', 'Em chạy ra bãi cát.', 'Bố em là thợ lặn.', 'Em nhặt vỏ ốc.'], ex: 'Câu nêu đặc điểm cho biết sự vật thế nào: biển xanh thẳm.' },
  { w: 2, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Từ nào tả tiếng chim hót trong rừng?', o: ['líu lo', 'róc rách', 'ầm ầm', 'lộp độp'], ex: 'Líu lo tả tiếng chim. Róc rách là tiếng suối, lộp độp là tiếng mưa.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm của biển?', o: ['mênh mông', 'vỗ bờ', 'con sóng', 'bãi cát'], ex: 'Mênh mông tả biển rộng lớn. Vỗ bờ chỉ hoạt động của sóng.' },
  { w: 2, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Cụm từ nào tả cảnh rừng buổi sáng?', o: ['nắng vàng óng ả', 'sóng biển rì rào', 'phố xá đông vui', 'tuyết trắng xóa'], ex: 'Rừng buổi sáng có nắng vàng chiếu qua tán lá. Sóng biển, phố xá, tuyết không tả cảnh rừng.' },

  // Tuần 3
  { w: 3, m: 'tv', lv: 1, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Tên con vật trong hình viết đúng là:', fig: { type: 'tokens', row: ['🐎'] }, o: ['con ngựa', 'con nghựa', 'con ngự', 'con nhựa'], ex: 'Trước ư viết ng: con ngựa. Chỉ viết ngh trước e, ê, i.' },
  { w: 3, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Các hình bên cùng chỉ loại hoạt động nào?', fig: { type: 'tokens', row: ['🏊', '🚴', '🏃'] }, o: ['hoạt động di chuyển', 'hoạt động nấu ăn', 'hoạt động học tập', 'hoạt động ngủ nghỉ'], ex: 'Bơi, đạp xe, chạy đều là hoạt động di chuyển.' },
  { w: 3, m: 'tv', lv: 1, t: 'Văn bản thông dụng', q: 'Nhật kí dùng để ghi lại điều gì?', o: ['việc em làm, điều em thấy trong ngày', 'thời khóa biểu của lớp', 'tên các bạn trong lớp', 'lời bài hát'], ex: 'Nhật kí ghi những việc đã làm, điều đã thấy, cảm xúc của em trong ngày.' },
  { w: 3, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Mỗi trang nhật kí thường mở đầu bằng gì?', o: ['ngày, tháng', 'lời chào', 'chữ kí', 'tên trường'], ex: 'Nhật kí ghi ngày, tháng ở đầu để nhớ việc xảy ra hôm nào. Lời chào thường có trong thư.' },
  { w: 3, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Bước thứ hai phù hợp là bước nào?', fig: { type: 'text', lines: ['Cách luộc trứng:', '1. Cho trứng vào nồi nước.', '2. (…)', '3. Vớt trứng ra bát.'] }, o: ['Đun sôi khoảng 10 phút.', 'Bóc vỏ trứng.', 'Đập trứng vào bát.', 'Rửa sạch nồi.'], ex: 'Cho trứng vào nước rồi phải đun sôi thì trứng mới chín, sau đó mới vớt ra. Bóc vỏ làm sau cùng.' },
  { w: 3, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Trong câu "Em khuấy đều cốc nước chanh.", từ chỉ hoạt động là:', o: ['khuấy', 'đều', 'cốc', 'nước chanh'], ex: 'Khuấy là việc em làm. Cốc, nước chanh là sự vật.' },

  // Tuần 4
  { w: 4, m: 'tv', lv: 1, t: 'Chính tả ch/tr', q: 'Điền ch hay tr vào chỗ trống: "bầu trời …ong xanh"?', o: ['tr', 'ch', 'gi', 'th'], ex: 'Trời trong xanh: viết tr.' },
  { w: 4, m: 'tv', lv: 1, t: 'Chính tả ch/tr', q: 'Đồ vật trong hình tên là gì?', fig: { type: 'tokens', row: ['🥁'] }, o: ['cái trống', 'cái chống', 'cái trốn', 'cái tróng'], ex: 'Cái trống viết tr, vần ông.' },
  { w: 4, m: 'tv', lv: 1, t: 'Chính tả d/gi/r/v', q: 'Điền v hay d vào chỗ trống: "mùa hè …ui vẻ"?', o: ['v', 'd', 'gi', 'r'], ex: 'Vui vẻ viết v ở cả hai tiếng.' },
  { w: 4, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ ngữ nào nói về mùa hè?', o: ['ve kêu râm ran', 'lá vàng rơi', 'tuyết trắng', 'hoa đào nở'], ex: 'Mùa hè có tiếng ve kêu. Lá vàng rơi là mùa thu, hoa đào nở là mùa xuân.' },
  { w: 4, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Chỗ (…) trong câu bên cần dấu câu nào?', fig: { type: 'text', lines: ['Vườn nhà em có nhiều loài hoa (…)', 'hoa hồng, hoa cúc, hoa mai.'] }, o: ['dấu hai chấm', 'dấu chấm', 'dấu phẩy', 'dấu chấm hỏi'], ex: 'Phía sau là các loài hoa được kể ra, nên dùng dấu hai chấm để báo hiệu phần liệt kê.' },
  { w: 4, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Dấu hai chấm trong câu "Em mang theo: mũ, áo phao, kem chống nắng." dùng để làm gì?', o: ['báo hiệu phần liệt kê', 'kết thúc câu', 'hỏi điều chưa biết', 'bộc lộ cảm xúc'], ex: 'Sau dấu hai chấm là các đồ vật được kể ra: báo hiệu phần liệt kê.' },
  { w: 4, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Câu nào dùng đúng dấu hai chấm?', o: ['Em mang theo: mũ, áo phao, kem.', 'Em: mang theo mũ, áo phao, kem.', 'Em mang: theo mũ, áo phao, kem.', 'Em mang theo mũ: áo phao, kem.'], ex: 'Dấu hai chấm đặt ngay trước phần liệt kê: Em mang theo: mũ, áo phao, kem.' },
  { w: 4, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào tả nắng mùa hè?', o: ['chói chang', 'lạnh buốt', 'mát rượi', 'ẩm ướt'], ex: 'Nắng hè gay gắt, chói chang. Lạnh buốt dùng cho mùa đông.' },
  { w: 4, m: 'tv', lv: 2, t: 'Chính tả d/gi/r/v', q: 'Từ nào viết đúng chính tả?', o: ['vườn rau', 'dườn rau', 'giườn rau', 'vườn dau'], ex: 'Vườn viết v, rau viết r: vườn rau.' },

  // Tuần 5
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả s/x', q: 'Tên đồ vật trong hình viết đúng là:', fig: { type: 'tokens', row: ['🚲'] }, o: ['xe đạp', 'se đạp', 'xe đặp', 'xe dạp'], ex: 'Xe đạp: xe viết x, đạp viết đ.' },
  { w: 5, m: 'tv', lv: 2, t: 'Dấu hỏi, dấu ngã', q: 'Từ nào viết đúng dấu thanh?', o: ['sạch sẽ', 'sạch sẻ', 'sạch xẽ', 'xạch sẽ'], ex: 'Sạch sẽ: tiếng "sẽ" mang dấu ngã.' },
  { w: 5, m: 'tv', lv: 2, t: 'Dấu hỏi, dấu ngã', q: 'Tiếng "nghi" trong từ "suy nghi" cần thêm dấu gì?', o: ['dấu ngã', 'dấu hỏi', 'dấu sắc', 'dấu nặng'], ex: 'Suy nghĩ: tiếng "nghĩ" mang dấu ngã.' },
  { w: 5, m: 'tv', lv: 3, t: 'Tìm từ trong thơ', q: 'Đoạn thơ bên có mấy từ chỉ màu sắc?', fig: { type: 'text', lines: ['Đường em đến trường', 'Qua hàng tre xanh', 'Qua đồng lúa vàng', 'Qua dòng sông trong'] }, o: ['2', '3', '1', '4'], ex: 'Từ chỉ màu sắc: xanh, vàng. "Trong" tả nước sông trong veo, không phải màu.' },
  { w: 5, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm của một bạn học sinh?', o: ['chăm chỉ', 'học bài', 'cặp sách', 'lớp học'], ex: 'Chăm chỉ nói lên tính nết. Học bài là hoạt động, cặp sách và lớp học là sự vật.' },
  { w: 5, m: 'tv', lv: 2, t: 'Chính tả s/x', q: 'Từ nào viết đúng chính tả?', o: ['xinh xắn', 'sinh xắn', 'xinh sắn', 'sinh sắn'], ex: 'Xinh xắn: cả hai tiếng viết x.' },

  // Tuần 6
  { w: 6, m: 'tv', lv: 2, t: 'Chính tả d/gi/r/v', q: 'Điền r, d hay gi vào chỗ trống: "…a đình"?', o: ['gi', 'd', 'r', 'v'], ex: 'Gia đình viết gi.' },
  { w: 6, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Điền an hay ang vào chỗ trống: "l… xóm"?', o: ['ang', 'an', 'ăng', 'âng'], ex: 'Làng xóm: vần ang, dấu huyền.' },
  { w: 6, m: 'tv', lv: 2, t: 'Viết hoa', q: 'Tên người nước ngoài nào viết đúng?', o: ['Cô-li-a', 'Cô li a', 'Côlia', 'Cô - Li - A'], ex: 'Tên nước ngoài phiên âm: viết hoa chữ đầu, giữa các tiếng có gạch nối: Cô-li-a.' },
  { w: 6, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu nào là câu hỏi?', o: ['Bạn đã làm bài tập chưa?', 'Bạn làm bài nhanh quá!', 'Mình làm bài tập rồi.', 'Bạn hãy làm bài đi!'], ex: 'Câu hỏi dùng để hỏi, cuối câu có dấu chấm hỏi.' },
  { w: 6, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Cuối câu bên cần dấu câu nào?', fig: { type: 'text', lines: ['Hôm nay ai trực nhật (…)'] }, o: ['dấu chấm hỏi', 'dấu chấm', 'dấu chấm than', 'dấu hai chấm'], ex: 'Câu có từ "ai" để hỏi nên cuối câu dùng dấu chấm hỏi.' },
  { w: 6, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Đơn xin vào Đội gửi tới ai?', o: ['Ban Chỉ huy Liên đội', 'bạn cùng bàn', 'bố mẹ', 'cô thủ thư'], ex: 'Đơn xin vào Đội viết: "Kính gửi: Ban Chỉ huy Liên đội" của trường.' },
  { w: 6, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào chỉ người làm việc ở trường học?', o: ['thầy hiệu trưởng', 'sân trường', 'lớp học', 'bục giảng'], ex: 'Thầy hiệu trưởng là người. Sân trường, lớp học, bục giảng là sự vật.' },
  { w: 6, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu "Ai là người giải được bài toán này?" dùng để làm gì?', o: ['để hỏi', 'để kể', 'để khen', 'để ra lệnh'], ex: 'Câu có từ "ai" và dấu chấm hỏi, dùng để hỏi.' },

  // Tuần 7
  { w: 7, m: 'tv', lv: 1, t: 'Chính tả l/n', q: 'Hình bên vẽ gì?', fig: { type: 'tokens', row: ['🔥'] }, o: ['ngọn lửa', 'ngọn nửa', 'ngọn lữa', 'ngọn lủa'], ex: 'Ngọn lửa: viết l, dấu hỏi.' },
  { w: 7, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu kể dùng để làm gì?', o: ['kể, tả, giới thiệu sự việc', 'bộc lộ cảm xúc', 'hỏi điều chưa biết', 'đề nghị, yêu cầu'], ex: 'Câu kể dùng để kể, tả hoặc giới thiệu, cuối câu thường có dấu chấm.' },
  { w: 7, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Cuối câu kể bên cần dấu câu nào?', fig: { type: 'text', lines: ['Cô gấp tờ giấy đỏ', 'thành chiếc thuyền xinh xắn (…)'] }, o: ['dấu chấm', 'dấu chấm hỏi', 'dấu hai chấm', 'dấu phẩy'], ex: 'Câu kể lại việc cô làm, kết thúc bằng dấu chấm.' },
  { w: 7, m: 'tv', lv: 1, t: 'Nói và nghe', q: 'Khi giới thiệu bản thân với lớp, em nên nói gì trước tiên?', o: ['họ và tên của em', 'điểm các môn học', 'món ăn em ghét', 'tên người bạn thân'], ex: 'Giới thiệu bản thân bắt đầu bằng họ tên, rồi đến tuổi, lớp, sở thích.' },
  { w: 7, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu nào cần kết thúc bằng dấu chấm hỏi?', o: ['Cậu có thích đọc truyện không', 'Tớ rất thích đọc truyện', 'Truyện này kể về chú mèo', 'Tớ đọc xong truyện rồi'], ex: '"Cậu có thích … không" là câu hỏi nên kết thúc bằng dấu chấm hỏi.' },
  { w: 7, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Trong câu "Bạn Nam đang lau bảng.", từ chỉ hoạt động là:', o: ['lau', 'đang', 'bảng', 'Nam'], ex: 'Lau là việc Nam làm. "Đang" chỉ việc xảy ra lúc nói, không chỉ hoạt động.' },
  { w: 7, m: 'tv', lv: 2, t: 'Chính tả l/n', q: 'Từ nào viết đúng chính tả?', o: ['nắn nót', 'lắn nót', 'nắn lót', 'lắn lót'], ex: 'Nắn nót: cả hai tiếng viết n.' },

  // Tuần 8
  { w: 8, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền ân hay âng vào chỗ trống: "th… thiết"?', o: ['ân', 'âng', 'ăn', 'an'], ex: 'Thân thiết: vần ân.' },
  { w: 8, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu nào là câu cảm?', o: ['Ôi, thư viện rộng quá!', 'Các em hãy giữ trật tự!', 'Thư viện ở tầng hai.', 'Thư viện mở cửa lúc nào?'], ex: 'Câu cảm bộc lộ cảm xúc, có từ "ôi", "quá". Câu có "hãy" là câu khiến.' },
  { w: 8, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu cảm thường có những từ nào?', o: ['ôi, quá, lắm', 'hãy, đừng, chớ', 'ai, gì, nào', 'là, và, của'], ex: 'Câu cảm thường có ôi, chao ôi, quá, lắm, thật. Hãy, đừng, chớ là từ của câu khiến.' },
  { w: 8, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Bản thông báo cần ghi rõ những gì?', o: ['việc gì, thời gian, địa điểm', 'cảm xúc của người viết', 'lời chúc sức khỏe', 'bài hát em yêu thích'], ex: 'Thông báo cho mọi người biết có việc gì, diễn ra lúc nào, ở đâu.' },
  { w: 8, m: 'tv', lv: 2, t: 'Chính tả ch/tr', q: 'Điền ch hay tr vào chỗ trống: "ngày vào Đội …ọng đại"?', o: ['tr', 'ch', 'gi', 'r'], ex: 'Trọng đại viết tr.' },

  // Tuần 9
  { w: 9, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Chỗ (…) cần dấu câu nào?', fig: { type: 'text', lines: ['Mẹ dặn em (…)', '"Con nhớ mang áo mưa."'] }, o: ['dấu hai chấm', 'dấu phẩy', 'dấu chấm', 'dấu chấm hỏi'], ex: 'Trước lời nói của mẹ đặt trong ngoặc kép, ta dùng dấu hai chấm.' },
  { w: 9, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Hà làm việc gì sau cùng?', fig: { type: 'text', lines: ['Sáng chủ nhật, Hà dậy sớm.', 'Hà quét nhà, tưới rau rồi sang', 'nhà bà đọc truyện cho bà nghe.'] }, o: ['đọc truyện cho bà nghe', 'tưới rau', 'quét nhà', 'dậy sớm'], ex: 'Thứ tự: dậy sớm, quét nhà, tưới rau, rồi sang đọc truyện cho bà. Chữ "rồi" cho biết việc sau.' },
  { w: 9, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Câu chuyện bên diễn ra vào lúc nào?', fig: { type: 'text', lines: ['Sáng chủ nhật, Hà dậy sớm.', 'Hà quét nhà, tưới rau rồi sang', 'nhà bà đọc truyện cho bà nghe.'] }, o: ['sáng chủ nhật', 'chiều chủ nhật', 'sáng thứ Hai', 'tối thứ Bảy'], ex: 'Câu đầu cho biết: "Sáng chủ nhật".' },
  { w: 9, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Dấu phẩy trong câu "Em thích hoa hồng, hoa cúc, hoa lan." dùng để làm gì?', o: ['ngăn cách các từ cùng loại', 'kết thúc câu', 'báo hiệu câu hỏi', 'báo hiệu lời nói'], ex: 'Dấu phẩy ngăn cách các tên hoa được kể liền nhau.' },
  { w: 9, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ sự vật?', o: ['ngôi trường', 'tung tăng', 'chăm ngoan', 'vẫy tay'], ex: 'Ngôi trường là sự vật. Tung tăng, vẫy tay là hoạt động, chăm ngoan là đặc điểm.' },
  { w: 9, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu "Bạn Minh là lớp trưởng lớp em." trả lời câu hỏi nào?', o: ['Ai là gì?', 'Ai làm gì?', 'Ai thế nào?', 'Ở đâu?'], ex: 'Câu giới thiệu Minh là ai: kiểu câu "Ai là gì?".' },

  // Tuần 10
  { w: 10, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Nhạc cụ trong hình tên là gì?', fig: { type: 'tokens', row: ['🎺'] }, o: ['cái kèn', 'cái kèng', 'cái kén', 'cái kẻn'], ex: 'Cái kèn: vần en, dấu huyền.' },
  { w: 10, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu nào là câu khiến?', o: ['Em hãy đóng cửa lại!', 'Ôi, cánh cửa đẹp quá!', 'Cánh cửa màu nâu.', 'Ai đóng cửa thế?'], ex: 'Câu khiến dùng để đề nghị, yêu cầu, thường có từ "hãy".' },
  { w: 10, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu khiến thường có những từ nào?', o: ['hãy, đừng, chớ', 'quá, lắm, thật', 'ai, gì, nào', 'là, của, và'], ex: 'Câu khiến thường có hãy, đừng, chớ, đi, nào. Quá, lắm, thật hay gặp trong câu cảm.' },
  { w: 10, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ màu sắc của chiếc cặp?', fig: { type: 'text', lines: ['Chiếc cặp của em màu đỏ tươi,', 'có hai ngăn rộng và hai quai đeo.'] }, o: ['đỏ tươi', 'rộng', 'quai đeo', 'hai ngăn'], ex: 'Đỏ tươi chỉ màu sắc. Rộng là đặc điểm về kích thước.' },
  { w: 10, m: 'tv', lv: 2, t: 'Nói và nghe', q: 'Khi tả một đồ vật, em nên tả theo thứ tự nào?', o: ['tả bao quát rồi tả từng bộ phận', 'chỉ tả một bộ phận nhỏ', 'tả bộ phận rồi mới nói tên', 'chỉ kể giá tiền đồ vật'], ex: 'Tả đồ vật: giới thiệu, tả bao quát (hình dáng, màu sắc), rồi tả từng bộ phận, nêu cảm nghĩ.' },
  { w: 10, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền en hay eng vào chỗ trống: "cái x… "?', say: 'Điền en hay eng vào chỗ trống: cái xẻng?', o: ['eng', 'en', 'ên', 'ênh'], ex: 'Cái xẻng (dụng cụ xúc đất): vần eng.' },
  { w: 10, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu "Con đừng chạy ra đường!" là kiểu câu nào?', o: ['câu khiến', 'câu cảm', 'câu kể', 'câu hỏi'], ex: 'Câu có từ "đừng", là lời yêu cầu, khuyên bảo: câu khiến.' },

  // Tuần 11
  { w: 11, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền iu hay ưu vào chỗ trống: "ch… khó"?', o: ['iu', 'ưu', 'iêu', 'ươu'], ex: 'Chịu khó: vần iu, dấu nặng.' },
  { w: 11, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Điền iên hay iêng vào chỗ trống: "t… chim hót"?', o: ['iêng', 'iên', 'inh', 'in'], ex: 'Tiếng chim: vần iêng, dấu sắc.' },
  { w: 11, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Người nào thuộc họ hàng bên nội?', o: ['cô (em gái của bố)', 'dì (em gái của mẹ)', 'cậu (em trai của mẹ)', 'bà ngoại'], ex: 'Họ hàng bên nội là họ hàng của bố. Dì, cậu, bà ngoại là bên mẹ.' },
  { w: 11, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Em trai của bố, em gọi là gì?', o: ['chú', 'cậu', 'dì', 'bác gái'], ex: 'Em trai của bố là chú. Em trai của mẹ là cậu.' },
  { w: 11, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Chỗ (…) cần dấu câu nào?', fig: { type: 'text', lines: ['Nhà bà em có ba gian (…)', 'gian giữa thờ tổ tiên, hai gian bên để ở.'] }, o: ['dấu hai chấm', 'dấu chấm', 'dấu chấm hỏi', 'dấu chấm than'], ex: 'Phần sau nói rõ ba gian gồm những gì, nên dùng dấu hai chấm.' },
  { w: 11, m: 'tv', lv: 3, t: 'Dấu câu', q: 'Dấu hai chấm trong câu "Bé rất vui: hôm nay mẹ về sớm." báo hiệu điều gì?', o: ['phần giải thích', 'phần liệt kê', 'lời nói nhân vật', 'câu hỏi'], ex: 'Phần sau dấu hai chấm giải thích vì sao bé vui, không kể ra nhiều sự vật.' },

  // Tuần 12
  { w: 12, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Điền uôn hay uông vào chỗ trống: "ch… gió"?', o: ['uông', 'uôn', 'ôn', 'ông'], ex: 'Chuông gió: vần uông.' },
  { w: 12, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động của tia nắng?', fig: { type: 'text', lines: ['Tia nắng nhỏ chui qua khe cửa,', 'nhảy nhót trên bàn học của em.'] }, o: ['nhảy nhót', 'nhỏ', 'bàn học', 'khe cửa'], ex: 'Nhảy nhót là hoạt động (tia nắng được tả như người). Nhỏ là đặc điểm.' },
  { w: 12, m: 'tv', lv: 3, t: 'Từ chỉ đặc điểm', q: 'Cặp từ nào gồm một từ chỉ hoạt động và một từ chỉ đặc điểm?', o: ['chạy, nhanh', 'đi, đứng', 'bàn, ghế', 'đẹp, xinh'], ex: 'Chạy là hoạt động, nhanh là đặc điểm. Đi, đứng đều là hoạt động; đẹp, xinh đều là đặc điểm.' },
  { w: 12, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu nào là câu nêu đặc điểm?', o: ['Ông em tóc bạc phơ.', 'Ông em đi dạo.', 'Ông em là bác sĩ.', 'Ông em có khỏe không?'], ex: 'Tóc bạc phơ cho biết ông trông thế nào: câu nêu đặc điểm.' },
  { w: 12, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu "Ông ơi, ông có mệt không?" là kiểu câu nào?', o: ['câu hỏi', 'câu cảm', 'câu kể', 'câu khiến'], ex: 'Câu hỏi thăm ông, có "có … không" và dấu chấm hỏi.' },
  { w: 12, m: 'tv', lv: 2, t: 'Chính tả s/x', q: 'Từ nào viết đúng chính tả?', o: ['sáng sớm', 'xáng sớm', 'sáng xớm', 'xáng xớm'], ex: 'Sáng sớm: cả hai tiếng viết s.' },

  // Tuần 13
  { w: 13, m: 'tv', lv: 2, t: 'So sánh', q: 'Hai sự vật nào được so sánh với nhau?', fig: { type: 'text', lines: ['Mắt bé tròn như hạt nhãn.'] }, o: ['mắt bé và hạt nhãn', 'mắt bé và tròn', 'tròn và hạt nhãn', 'bé và hạt nhãn'], ex: 'Mắt bé được so sánh với hạt nhãn, đặc điểm giống nhau là tròn, từ so sánh là "như".' },
  { w: 13, m: 'tv', lv: 1, t: 'So sánh', q: 'Trong câu "Lá bàng đỏ như ngọn lửa.", từ dùng để so sánh là:', o: ['như', 'đỏ', 'lá bàng', 'ngọn lửa'], ex: 'Từ so sánh là "như". "Đỏ" là đặc điểm giống nhau.' },
  { w: 13, m: 'tv', lv: 1, t: 'So sánh', q: 'Câu nào có hình ảnh so sánh?', o: ['Trăng tròn như cái đĩa.', 'Trăng sáng quá!', 'Trăng lên cao.', 'Ai ngắm trăng?'], ex: 'Trăng được so sánh với cái đĩa bằng từ "như".' },
  { w: 13, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Điền ươn hay ương vào chỗ trống: "v… rau"?', o: ['ươn', 'ương', 'ơn', 'uôn'], ex: 'Vườn rau: vần ươn, dấu huyền.' },
  { w: 13, m: 'tv', lv: 1, t: 'So sánh', q: 'Chú mèo được so sánh với gì?', fig: { type: 'text', lines: ['Chú mèo nằm cuộn tròn', 'như một cuộn len trắng.'] }, o: ['cuộn len trắng', 'cuộn tròn', 'chú mèo', 'màu trắng'], ex: 'Sau từ "như" là sự vật dùng để so sánh: cuộn len trắng.' },
  { w: 13, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào nói về tình cảm tốt đẹp giữa anh chị em?', o: ['nhường nhịn', 'ganh tị', 'tranh giành', 'cãi nhau'], ex: 'Anh chị em yêu thương thì nhường nhịn nhau.' },
  { w: 13, m: 'tv', lv: 1, t: 'So sánh', q: 'Từ nào điền vào chỗ trống để có câu so sánh: "Cánh diều … con chim."?', o: ['như', 'với', 'và', 'của'], ex: 'Cánh diều như con chim: "như" là từ so sánh.' },
  { w: 13, m: 'tv', lv: 2, t: 'Chính tả d/gi/r/v', q: 'Từ nào viết đúng chính tả?', o: ['rổ rá', 'dổ dá', 'giổ giá', 'rổ dá'], ex: 'Rổ rá: cả hai tiếng viết r.' },

  // Tuần 14
  { w: 14, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Cặp từ nào trái nghĩa?', o: ['sáng, tối', 'sáng, tỏ', 'to, lớn', 'nhanh, lẹ'], ex: 'Sáng và tối có nghĩa trái ngược. Sáng, tỏ có nghĩa gần giống nhau.' },
  { w: 14, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "chăm chỉ"?', o: ['lười biếng', 'siêng năng', 'cần cù', 'chịu khó'], ex: 'Chăm chỉ trái nghĩa với lười biếng. Siêng năng, cần cù có nghĩa giống chăm chỉ.' },
  { w: 14, m: 'tv', lv: 3, t: 'Từ trái nghĩa', q: 'Cặp từ trái nghĩa có trong câu bên là:', fig: { type: 'text', lines: ['Đường lên núi dốc và hẹp,', 'đường xuống làng thì thoải và rộng.'] }, o: ['hẹp, rộng', 'núi, làng', 'dốc, hẹp', 'đường, núi'], ex: 'Hẹp trái nghĩa với rộng. Núi, làng là sự vật, không trái nghĩa.' },
  { w: 14, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu khiến nào dùng để nhờ bạn?', o: ['Cậu cho tớ mượn bút với!', 'Bút của cậu đẹp quá!', 'Bút của cậu màu gì?', 'Tớ có một cái bút.'], ex: 'Lời nhờ bạn là câu khiến: "Cậu cho tớ mượn bút với!".' },
  { w: 14, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền ăn hay ăng vào chỗ trống: "l… nghe"?', o: ['ăng', 'ăn', 'ân', 'âng'], ex: 'Lắng nghe: vần ăng, dấu sắc.' },
  { w: 14, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Cuối câu "Các bạn hãy xếp hàng ngay ngắn" nên đặt dấu gì?', o: ['dấu chấm than', 'dấu chấm hỏi', 'dấu hai chấm', 'dấu phẩy'], ex: 'Câu có "hãy" là câu khiến, cuối câu thường đặt dấu chấm than.' },
  { w: 14, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "dũng cảm"?', o: ['hèn nhát', 'gan dạ', 'mạnh mẽ', 'can đảm'], ex: 'Dũng cảm trái nghĩa với hèn nhát. Gan dạ, can đảm có nghĩa giống dũng cảm.' },

  // Tuần 15
  { w: 15, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào chỉ nghề nghiệp?', o: ['bác sĩ', 'khám bệnh', 'bệnh viện', 'ống nghe'], ex: 'Bác sĩ là tên nghề. Khám bệnh là hoạt động, bệnh viện là nơi làm việc.' },
  { w: 15, m: 'tv', lv: 2, t: 'Từ để hỏi', q: 'Thêm từ nào vào cuối câu "Bạn Lan là lớp trưởng" để thành câu hỏi?', o: ['phải không', 'quá', 'rồi', 'lắm'], ex: 'Bạn Lan là lớp trưởng phải không? Thêm "quá", "lắm" thành câu cảm.' },
  { w: 15, m: 'tv', lv: 2, t: 'Chính tả l/n', q: 'Điền l hay n vào chỗ trống: "…ặng lẽ"?', o: ['l', 'n', 'nh', 'đ'], ex: 'Lặng lẽ viết l. "Nặng" (nặng nề) là từ khác nghĩa.' },
  { w: 15, m: 'tv', lv: 1, t: 'Chính tả l/n', q: 'Từ nào viết đúng chính tả?', o: ['nặng nề', 'lặng nề', 'nặng lề', 'lặng lề'], ex: 'Nặng nề: cả hai tiếng viết n.' },
  { w: 15, m: 'tv', lv: 2, t: 'Dấu hỏi, dấu ngã', q: 'Từ nào viết đúng?', o: ['vẽ tranh', 'vẻ tranh', 'vẽ trang', 'vẻ chanh'], ex: 'Vẽ tranh: "vẽ" mang dấu ngã. "Vẻ" (dấu hỏi) dùng trong vẻ đẹp.' },
  { w: 15, m: 'tv', lv: 1, t: 'Từ để hỏi', q: 'Từ nào điền vào chỗ trống: "Mẹ bạn làm nghề …?"', o: ['gì', 'ai', 'đâu', 'bao giờ'], ex: 'Hỏi về nghề nghiệp dùng "gì": Mẹ bạn làm nghề gì?' },
  { w: 15, m: 'tv', lv: 2, t: 'Từ để hỏi', q: 'Câu "Chú công nhân làm việc ở nhà máy." trả lời câu hỏi có từ để hỏi nào?', o: ['ở đâu', 'khi nào', 'vì sao', 'bao nhiêu'], ex: '"Ở nhà máy" chỉ nơi chốn, trả lời câu hỏi "ở đâu?".' },

  // Tuần 16
  { w: 16, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền ao hay au vào chỗ trống: "chim ch… mào"?', o: ['ao', 'au', 'âu', 'ô'], ex: 'Chim chào mào: vần ao, dấu huyền.' },
  { w: 16, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ sự vật trong câu bên?', fig: { type: 'text', lines: ['Trên bãi cỏ, chú dế mèn', 'đang kéo đàn cho các bạn nghe.'] }, o: ['dế mèn', 'kéo đàn', 'đang', 'nghe'], ex: 'Dế mèn là con vật (sự vật). Kéo đàn, nghe là hoạt động.' },
  { w: 16, m: 'tv', lv: 3, t: 'Mẫu câu', q: 'Bộ phận nào trả lời câu hỏi "Làm gì?" trong câu "Người gác hải đăng thắp đèn mỗi tối."?', o: ['thắp đèn mỗi tối', 'người gác hải đăng', 'mỗi tối', 'hải đăng'], ex: 'Người gác hải đăng (Ai?) thắp đèn mỗi tối (làm gì?).' },
  { w: 16, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Bộ phận nào trả lời câu hỏi "Ai?" trong câu "Bà em kể chuyện cổ tích."?', o: ['Bà em', 'kể chuyện', 'chuyện cổ tích', 'kể chuyện cổ tích'], ex: 'Ai kể chuyện cổ tích? Bà em.' },
  { w: 16, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Phần cuối của một bức thư thường có gì?', o: ['lời chúc và chữ kí', 'lời chào hỏi', 'nơi viết, ngày viết', 'tên trường học'], ex: 'Thư mở đầu bằng nơi viết, ngày viết, lời chào; cuối thư là lời chúc, chữ kí và tên.' },
  { w: 16, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động?', o: ['thắp sáng', 'sáng rực', 'ngọn đèn', 'hải đăng'], ex: 'Thắp sáng là việc làm. Sáng rực là đặc điểm.' },

  // Tuần 17
  { w: 17, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Sự vật nào thường thấy ở nông thôn?', o: ['lũy tre', 'tòa nhà cao tầng', 'tàu điện trên cao', 'trung tâm thương mại'], ex: 'Lũy tre bao quanh làng quê. Các sự vật còn lại thường ở thành phố.' },
  { w: 17, m: 'tv', lv: 1, t: 'So sánh', q: 'Âm thanh nào được so sánh với tiếng hát xa?', fig: { type: 'text', lines: ['Tiếng suối trong như tiếng hát xa.'] }, o: ['tiếng suối', 'tiếng hát', 'trong', 'xa'], ex: 'Tiếng suối được so sánh với tiếng hát xa bằng từ "như".' },
  { w: 17, m: 'tv', lv: 2, t: 'So sánh', q: 'Câu nào so sánh âm thanh với âm thanh?', o: ['Tiếng mưa rơi như tiếng trống.', 'Hạt mưa trong như hạt ngọc.', 'Mưa rơi lộp độp trên mái.', 'Trời mưa to quá!'], ex: 'Tiếng mưa (âm thanh) so với tiếng trống (âm thanh). Câu hạt mưa so sánh sự vật.' },
  { w: 17, m: 'tv', lv: 1, t: 'Văn bản thông dụng', q: 'Phiếu mượn sách cần ghi những gì?', o: ['tên sách và tác giả', 'số tiền em có', 'món ăn em thích', 'giờ đi ngủ'], ex: 'Phiếu mượn sách ghi họ tên người mượn, địa chỉ, tên sách, tác giả.' },
  { w: 17, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào tả màu sắc của đồ chơi bột màu?', o: ['sặc sỡ', 'nặn', 'tò he', 'bày bán'], ex: 'Sặc sỡ tả nhiều màu tươi. Tò he là tên đồ chơi, nặn và bày bán là hoạt động.' },
  { w: 17, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Trên phong bì thư, ngoài tên người nhận còn phải ghi gì?', o: ['địa chỉ người nhận', 'lời chúc của em', 'nội dung bức thư', 'ngày sinh của em'], ex: 'Phong bì ghi tên, địa chỉ người gửi và người nhận để bưu điện chuyển thư.' },
  { w: 17, m: 'tv', lv: 2, t: 'So sánh', q: 'Trong câu "Tiếng ve kêu rộn rã như dàn đồng ca.", âm thanh được so sánh là:', o: ['tiếng ve', 'dàn đồng ca', 'rộn rã', 'như'], ex: 'Tiếng ve được so sánh với dàn đồng ca; "rộn rã" là đặc điểm, "như" là từ so sánh.' },

  // Tuần 18
  { w: 18, m: 'tv', lv: 3, t: 'Đọc hiểu', q: 'Hai câu ca dao nói về công lao của ai?', fig: { type: 'text', lines: ['Lên non mới biết non cao,', 'Nuôi con mới biết công lao mẹ thầy.'] }, o: ['cha mẹ', 'thầy giáo', 'ngọn núi', 'bạn bè'], ex: '"Mẹ thầy" ở đây là mẹ và cha. Có nuôi con mới hiểu công lao cha mẹ.' },
  { w: 18, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Cặp từ trái nghĩa trong câu bên là:', fig: { type: 'text', lines: ['Thức khuya dậy sớm.'] }, o: ['khuya, sớm', 'thức, khuya', 'dậy, sớm', 'thức, sớm'], ex: 'Khuya (đêm muộn) trái nghĩa với sớm.' },
  { w: 18, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu "Hôm nay trời đẹp quá!" là kiểu câu nào?', o: ['câu cảm', 'câu khiến', 'câu kể', 'câu hỏi'], ex: 'Câu bộc lộ cảm xúc khen ngợi, có từ "quá": câu cảm.' },
  { w: 18, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu nào là câu kể?', o: ['Cây cam của ông sai trĩu quả.', 'Cây cam sai quả quá!', 'Cây cam này ai trồng?', 'Cháu hãy hái cam đi!'], ex: 'Câu kể tả cây cam, kết thúc bằng dấu chấm.' },
  { w: 18, m: 'tv', lv: 1, t: 'Từ có nghĩa giống nhau', q: 'Từ nào có nghĩa giống từ "chăm chỉ"?', o: ['siêng năng', 'thông minh', 'lười biếng', 'nhanh nhẹn'], ex: 'Chăm chỉ và siêng năng có nghĩa giống nhau. Lười biếng là từ trái nghĩa.' },
  { w: 18, m: 'tv', lv: 2, t: 'Từ có nghĩa giống nhau', q: 'Từ nào có nghĩa giống từ "to lớn"?', o: ['khổng lồ', 'bé nhỏ', 'cao ráo', 'mập mạp'], ex: 'Khổng lồ nghĩa là rất to lớn. Bé nhỏ trái nghĩa.' },
  { w: 18, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu "Bạn đừng đi học muộn!" là kiểu câu nào?', o: ['câu khiến', 'câu cảm', 'câu kể', 'câu hỏi'], ex: 'Câu có "đừng", là lời khuyên, yêu cầu: câu khiến.' },
  { w: 18, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Cặp từ trái nghĩa trong câu tục ngữ bên là:', fig: { type: 'text', lines: ['Gần mực thì đen,', 'gần đèn thì sáng.'] }, o: ['đen, sáng', 'mực, đèn', 'gần, đen', 'gần, sáng'], ex: 'Đen trái nghĩa với sáng. Mực, đèn là sự vật.' },
  { w: 18, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm trong câu "Quả cam chín vàng, ngọt lịm."?', o: ['ngọt lịm', 'quả cam', 'hái cam', 'cây cam'], ex: 'Ngọt lịm tả vị của quả cam. Quả cam là sự vật.' },
  { w: 18, m: 'tv', lv: 2, t: 'Tìm từ trong thơ', q: 'Trong hai dòng thơ bên, từ nào chỉ hoạt động?', fig: { type: 'text', lines: ['Mẹ ru con ngủ trưa hè,', 'Ngoài hiên râm ran tiếng ve gọi bầy.'] }, o: ['ru', 'râm ran', 'trưa hè', 'hiên'], ex: 'Ru là việc mẹ làm. Râm ran tả tiếng ve (đặc điểm), trưa hè và hiên là sự vật.' },

  // ===================== Câu khó hơn (lv 3), cả hai môn =====================
  { w: 1, m: 'toan', lv: 3, t: 'Số đến 1 000', q: 'Số lớn nhất có ba chữ số khác nhau là:', o: ['987', '999', '789', '998'], ex: 'Các chữ số phải khác nhau, chọn chữ số lớn nhất cho hàng trăm rồi giảm dần: 9, 8, 7. Số 987.' },
  { w: 2, m: 'toan', lv: 3, t: 'Toán lời văn', q: 'Mỗi xe ba bánh có 3 bánh, mỗi ô tô có 4 bánh. 2 xe ba bánh và 3 ô tô có tất cả bao nhiêu bánh xe?', o: ['18', '17', '20', '12'], ex: '3 × 2 = 6 bánh, 4 × 3 = 12 bánh. Tất cả 6 + 12 = 18 bánh xe.' },
  { w: 3, m: 'toan', lv: 3, t: 'Xem giờ', q: 'Đồng hồ chỉ giờ như hình. 30 phút nữa là mấy giờ?', fig: { type: 'clock', h: 9, m: 30 }, o: ['10 giờ', '10 giờ 30 phút', '11 giờ', '9 giờ'], ex: 'Bây giờ là 9 giờ 30 phút. Thêm 30 phút nữa là tròn 60 phút, tức là 10 giờ.' },
  { w: 4, m: 'toan', lv: 3, t: 'Bảng nhân', q: 'Phép nhân nào có kết quả lớn nhất?', o: ['7 × 7', '6 × 8', '5 × 9', '6 × 7'], ex: '7 × 7 = 49, 6 × 8 = 48, 5 × 9 = 45, 6 × 7 = 42. Lớn nhất là 7 × 7.' },
  { w: 5, m: 'toan', lv: 3, t: 'Bảng nhân', q: '9 × 8 − 9 bằng 9 nhân với số nào?', o: ['7', '8', '63', '9'], ex: '9 × 8 là 8 lần số 9, bớt đi một lần 9 còn 7 lần: 9 × 7 = 63.' },
  { w: 6, m: 'toan', lv: 3, t: 'Một phần mấy', q: 'Lan có số kẹo như hình. Lan cho em 1/4 số kẹo. Lan còn lại mấy cái kẹo?', fig: { type: 'tokens', rows: [['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬'], ['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬']] }, o: ['12', '4', '15', '8'], ex: 'Có 16 cái. Cho em 16 : 4 = 4 cái. Lan còn 16 − 4 = 12 cái.' },
  { w: 6, m: 'toan', lv: 3, t: 'Tìm thành phần', q: 'Số nào nhân với 6 thì được kết quả bằng 42 cộng 6?', o: ['8', '7', '48', '9'], ex: 'Tích là 42 + 6 = 48. Số cần tìm: 48 : 6 = 8.' },
  { w: 7, m: 'toan', lv: 3, t: 'Trung điểm', q: 'M là trung điểm của AB, N là trung điểm của MB. AB dài 12 cm. Đoạn AN dài bao nhiêu?', fig: { type: 'numline', from: 0, to: 12, step: 3, label: [], mark: { 0: 'A', 6: 'M', 9: 'N', 12: 'B' } }, o: ['9 cm', '3 cm', '6 cm', '8 cm'], ex: 'AM = MB = 12 : 2 = 6 cm. MN = 6 : 2 = 3 cm. AN = AM + MN = 6 + 3 = 9 cm.' },
  { w: 8, m: 'toan', lv: 3, t: 'Hình tròn', q: 'Hai hình tròn bằng nhau, mỗi hình có bán kính 3 cm. Đoạn thẳng AB dài bao nhiêu?', fig: { type: 'lines', pts: { A: [-3, 0], _O: [0, 0], _P: [6, 0], B: [9, 0] }, segs: [['A', 'B']], circles: [[0, 0, 3], [6, 0, 3]] }, o: ['12 cm', '6 cm', '9 cm', '3 cm'], ex: 'AB gồm hai đường kính, mỗi đường kính 3 × 2 = 6 cm. AB = 6 + 6 = 12 cm.' },
  { w: 9, m: 'toan', lv: 3, t: 'Đếm hình', q: 'Hình chữ nhật có hai đường chéo như hình. Có bao nhiêu hình tam giác?', fig: { type: 'lines', pts: { A: [0, 0], B: [6, 0], C: [6, 4], D: [0, 4], O: [3, 2] }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C'], ['B', 'D']] }, o: ['8', '4', '6', '10'], ex: '4 hình nhỏ: OAB, OBC, OCD, ODA. 4 hình lớn: ABC, BCD, CDA, DAB. Tất cả 8 hình.' },
  { w: 10, m: 'toan', lv: 3, t: 'Khối hình', q: 'Cần thêm ít nhất mấy khối lập phương nhỏ để được một khối lập phương lớn 2 hàng, 2 cột, cao 2 tầng?', fig: { type: 'cubes', cols: [[2, 2], [1, 1]] }, o: ['2', '3', '4', '6'], ex: 'Hình có 2 + 2 + 1 + 1 = 6 khối. Khối lớn cần 2 × 2 × 2 = 8 khối. Thêm 8 − 6 = 2 khối.' },
  { w: 12, m: 'toan', lv: 3, t: 'Chia có dư', q: '? : 5 = 6 (dư 4). Số bị chia là bao nhiêu?', o: ['34', '30', '26', '35'], ex: 'Số bị chia = thương × số chia + số dư = 6 × 5 + 4 = 34.' },
  { w: 13, m: 'toan', lv: 3, t: 'Bài toán hai bước', q: 'Bao gạo nặng 40 kg. Buổi sáng bán 1/4 bao gạo, buổi chiều bán thêm 5 kg. Bao gạo còn lại bao nhiêu ki-lô-gam?', o: ['25 kg', '30 kg', '35 kg', '5 kg'], ex: 'Buổi sáng bán 40 : 4 = 10 kg. Còn lại 40 − 10 − 5 = 25 kg.' },
  { w: 14, m: 'toan', lv: 3, t: 'Gam', q: 'Cân thăng bằng, ba quả táo nặng bằng nhau. Mỗi quả táo nặng bao nhiêu gam?', fig: { type: 'balance', left: ['🍎', '🍎', '🍎'], right: ['500 g', '100 g'], tilt: 0 }, o: ['200 g', '600 g', '300 g', '150 g'], ex: 'Ba quả nặng 500 + 100 = 600 g. Mỗi quả 600 : 3 = 200 g.' },
  { w: 15, m: 'toan', lv: 3, t: 'Mi-li-lít', q: 'Rót hết nước trong bình sang các cốc 200 ml. Rót đầy được mấy cốc?', fig: { type: 'jug', items: [{ cap: 1000, v: 800, unit: 'ml' }] }, o: ['4', '5', '8', '3'], ex: 'Bình có 800 ml (vạch 1000 chỉ là sức chứa). 800 : 200 = 4 cốc.' },
  { w: 16, m: 'toan', lv: 3, t: 'Toán lời văn', q: 'Mỗi ngày tổ may làm được 215 cái áo. Trong 4 ngày tổ may làm được bao nhiêu cái áo?', o: ['860', '840', '219', '820'], ex: '215 × 4: 4 × 5 = 20, viết 0 nhớ 2; 4 × 1 = 4, thêm 2 là 6; 4 × 2 = 8. Được 860 cái áo.' },
  { w: 17, m: 'toan', lv: 3, t: 'Biểu thức', q: '81 − 18 : 9 = ?', o: ['79', '7', '63', '9'], ex: 'Chia trước, trừ sau: 18 : 9 = 2, 81 − 2 = 79.' },
  { w: 18, m: 'toan', lv: 3, t: 'Chia cho số có một chữ số', q: 'Số bé nhất có ba chữ số giống nhau chia cho 3 được bao nhiêu?', o: ['37', '33', '111', '36'], ex: 'Số bé nhất có ba chữ số giống nhau là 111. 111 : 3 = 37.' },

  { w: 1, m: 'tv', lv: 3, t: 'Từ chỉ sự vật', q: 'Dòng nào gồm toàn từ chỉ sự vật?', o: ['bàn, ghế, cặp sách', 'bàn, ngồi, cặp sách', 'đẹp, ghế, bút chì', 'đọc, viết, vẽ'], ex: 'Bàn, ghế, cặp sách đều là đồ vật. Dòng thứ hai có "ngồi" là hoạt động.' },
  { w: 2, m: 'tv', lv: 3, t: 'Từ chỉ đặc điểm', q: 'Dòng nào gồm toàn từ chỉ đặc điểm?', o: ['xanh, mát, rộng', 'xanh, mát, rừng', 'hót, bay, đẹp', 'cây, lá, hoa'], ex: 'Xanh, mát, rộng đều chỉ đặc điểm. "Rừng" là sự vật.' },
  { w: 3, m: 'tv', lv: 3, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Dòng nào viết đúng chính tả cả ba từ?', o: ['nghỉ ngơi, con kiến, ghế', 'ngỉ ngơi, con kiến, ghế', 'nghỉ nghơi, con kiến, ghế', 'nghỉ ngơi, con ciến, gế'], ex: 'Trước i, ê viết ngh, k, gh: nghỉ, kiến, ghế. Trước ơ viết ng: ngơi.' },
  { w: 5, m: 'tv', lv: 3, t: 'Tìm từ trong thơ', q: 'Từ nào chỉ đặc điểm của con đường?', fig: { type: 'text', lines: ['Con đường làng nhỏ nhỏ', 'Uốn quanh cánh đồng xanh', 'Em đi học buổi sớm', 'Nghe chim hót trên cành'] }, o: ['nhỏ nhỏ', 'xanh', 'uốn quanh', 'buổi sớm'], ex: 'Nhỏ nhỏ tả con đường. "Xanh" cũng là đặc điểm nhưng là của cánh đồng.' },
  { w: 5, m: 'tv', lv: 3, t: 'Viết hoa', q: 'Trong câu "bạn hà sống ở thành phố huế.", những chữ nào cần viết hoa?', o: ['Bạn, Hà, Huế', 'Hà, Huế', 'Bạn, Hà', 'Bạn, Hà, Thành, Phố, Huế'], ex: 'Viết hoa chữ đầu câu (Bạn) và tên riêng (Hà, Huế). "Thành phố" là tên chung.' },
  { w: 6, m: 'tv', lv: 3, t: 'Kiểu câu', q: 'Câu nào là câu hỏi?', o: ['Ai vẽ bức tranh này thế?', 'Tớ không biết ai vẽ tranh.', 'Bức tranh này đẹp quá!', 'Bạn xem bức tranh này đi!'], ex: 'Câu "Tớ không biết ai vẽ tranh." có chữ "ai" nhưng là câu kể. Câu hỏi là câu dùng để hỏi.' },
  { w: 7, m: 'tv', lv: 3, t: 'Dấu câu', q: 'Đoạn bên có mấy câu cần sửa lại dấu kết thúc câu?', fig: { type: 'text', lines: ['Hôm nay em đi học?', 'Bạn có đi cùng em không.', 'Trời đẹp quá!'] }, o: ['2', '1', '3', '0'], ex: 'Câu 1 là câu kể, cần dấu chấm. Câu 2 là câu hỏi, cần dấu chấm hỏi. Câu 3 đã đúng. Có 2 câu cần sửa.' },
  { w: 8, m: 'tv', lv: 3, t: 'Kiểu câu', q: 'Chuyển câu kể "Thư viện rất rộng." thành câu cảm, ta được câu nào?', o: ['Ôi, thư viện rộng quá!', 'Thư viện có rộng không?', 'Thư viện rộng.', 'Hãy mở cửa thư viện!'], ex: 'Câu cảm bộc lộ cảm xúc, thêm "ôi", "quá" và dấu chấm than.' },
  { w: 9, m: 'tv', lv: 3, t: 'Dấu câu', q: 'Câu nào đặt dấu phẩy đúng?', o: ['Sân trường có cây bàng, cây phượng.', 'Sân trường, có cây bàng cây phượng.', 'Sân trường có, cây bàng cây phượng.', 'Sân trường có cây, bàng cây phượng.'], ex: 'Dấu phẩy ngăn cách hai tên cây được kể liền nhau: cây bàng, cây phượng.' },
  { w: 10, m: 'tv', lv: 3, t: 'Vần dễ lẫn', q: 'Dòng nào viết đúng cả hai từ?', o: ['cái xẻng, leng keng', 'cái xẻn, leng keng', 'cái xẻng, len ken', 'cái xẻn, len keng'], ex: 'Cái xẻng, leng keng đều viết vần eng.' },
  { w: 11, m: 'tv', lv: 3, t: 'Mở rộng vốn từ', q: 'Những người nào thuộc họ hàng bên ngoại?', o: ['cậu, dì', 'chú, cô', 'chú, thím', 'bác, cô'], ex: 'Bên ngoại là họ hàng của mẹ: cậu, dì, mợ. Chú, cô, thím thuộc bên nội.' },
  { w: 12, m: 'tv', lv: 3, t: 'Đọc hiểu', q: 'Vì sao cháu nắm tay ông?', fig: { type: 'text', lines: ['Ông đã già, chân bước chậm.', 'Mỗi sáng, cháu nắm tay ông', 'dắt ông đi dạo quanh hồ.'] }, o: ['vì ông già, chân bước chậm', 'vì cháu sợ bị lạc', 'vì hồ rất rộng', 'vì ông muốn chạy nhanh'], ex: 'Câu đầu cho biết ông đã già, bước chậm nên cháu nắm tay dắt ông.' },
  { w: 13, m: 'tv', lv: 3, t: 'So sánh', q: 'Trong câu "Mắt mèo sáng như hai ngọn đèn.", đặc điểm giống nhau của hai sự vật là:', o: ['sáng', 'như', 'mắt mèo', 'hai ngọn đèn'], ex: 'Mắt mèo và ngọn đèn giống nhau ở chỗ cùng sáng. "Như" là từ so sánh.' },
  { w: 14, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Cặp từ trái nghĩa trong câu bên là:', fig: { type: 'text', lines: ['Lá lành đùm lá rách.'] }, o: ['lành, rách', 'đùm, rách', 'lá, lá', 'lành, đùm'], ex: 'Lành (còn nguyên) trái nghĩa với rách.' },
  { w: 15, m: 'tv', lv: 3, t: 'Từ để hỏi', q: 'Phần "Mùa đông" trong câu "Mùa đông, bà đan áo ấm cho cháu." trả lời câu hỏi nào?', o: ['Khi nào?', 'Làm gì?', 'Ở đâu?', 'Vì sao?'], ex: '"Mùa đông" chỉ thời gian, trả lời câu hỏi "Khi nào?".' },
  { w: 16, m: 'tv', lv: 3, t: 'Từ để hỏi', q: 'Phần "Vì trời mưa" trong câu "Vì trời mưa, buổi tập bị hoãn." trả lời câu hỏi nào?', o: ['Vì sao?', 'Khi nào?', 'Ở đâu?', 'Làm gì?'], ex: '"Vì trời mưa" nêu lí do, trả lời câu hỏi "Vì sao?".' },
  { w: 17, m: 'tv', lv: 2, t: 'So sánh', q: 'Đoạn bên có mấy hình ảnh so sánh âm thanh với âm thanh?', fig: { type: 'text', lines: ['Tiếng chim hót như tiếng sáo,', 'tiếng gà gáy như tiếng kèn.'] }, o: ['2', '1', '4', '3'], ex: 'Tiếng chim so với tiếng sáo, tiếng gà gáy so với tiếng kèn: 2 hình ảnh.' },
  { w: 18, m: 'tv', lv: 3, t: 'Đọc hiểu', q: 'Câu tục ngữ bên khuyên em điều gì?', fig: { type: 'text', lines: ['Ăn quả nhớ kẻ trồng cây.'] }, o: ['biết ơn người làm ra thành quả', 'chăm chỉ trồng nhiều cây', 'ăn nhiều hoa quả', 'hái quả khi còn xanh'], ex: 'Khi được hưởng thành quả, phải nhớ ơn người đã làm ra nó.' },
  { w: 18, m: 'tv', lv: 3, t: 'Kiểu câu', q: 'Câu nào là câu khiến?', o: ['Mời các bạn vào lớp!', 'Ôi, các bạn vào lớp đông quá!', 'Các bạn đã vào lớp rồi.', 'Các bạn đã vào lớp chưa?'], ex: 'Lời mời là đề nghị người khác làm việc: câu khiến. Câu có "ôi", "quá" là câu cảm.' },

  // ════════════ Bổ sung 11/2026: Toán ════════════
  // Tuần 1
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 1 000', q: 'Số 640 đọc là:', o: ['Sáu trăm bốn mươi', 'Sáu trăm linh bốn', 'Sáu bốn mươi', 'Sáu trăm bốn'], ex: '640 gồm 6 trăm, 4 chục, 0 đơn vị: đọc là sáu trăm bốn mươi.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 1 000', q: 'Số 482 gồm:', o: ['4 trăm, 8 chục, 2 đơn vị', '4 trăm, 2 chục, 8 đơn vị', '8 trăm, 4 chục, 2 đơn vị', '48 trăm, 2 đơn vị'], ex: 'Chữ số 4 ở hàng trăm, 8 ở hàng chục, 2 ở hàng đơn vị.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số đến 1 000', q: 'Tổng 500 + 40 + 9 là số nào?', o: ['549', '5409', '594', '945'], ex: '5 trăm, 4 chục, 9 đơn vị: viết 549.' },
  { w: 1, m: 'toan', lv: 2, t: 'So sánh số', q: 'Dấu thích hợp điền vào chỗ trống: 708 ... 780', o: ['<', '>', '=', '+'], ex: 'Cùng 7 trăm, so hàng chục: 0 chục bé hơn 8 chục. Vậy 708 < 780.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 1 000', q: 'Số tròn chục liền sau số 350 là:', o: ['360', '351', '400', '340'], ex: 'Các số tròn chục cách nhau 10: sau 350 là 360. Số 351 là số liền sau, chưa tròn chục.' },
  { w: 1, m: 'toan', lv: 2, t: 'So sánh số', q: 'Xếp các số 512, 251, 125, 215 theo thứ tự từ bé đến lớn:', o: ['125, 215, 251, 512', '125, 251, 215, 512', '512, 251, 215, 125', '215, 125, 251, 512'], ex: 'So hàng trăm trước: 125 và 215, 251 rồi 512. Giữa 215 và 251 so hàng chục: 1 < 5.' },
  { w: 1, m: 'toan', lv: 2, t: 'Cộng trừ', q: '600 − 245 = ?', o: ['355', '445', '365', '345'], ex: '0 không trừ được 5, lấy 10 − 5 = 5 nhớ 1; 0 không trừ được 5, lấy 10 − 5 = 5 nhớ 1; 6 − 3 = 3. Kết quả 355.' },
  { w: 1, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Thư viện có 435 quyển truyện, mua thêm 168 quyển. Thư viện có tất cả bao nhiêu quyển truyện?', o: ['603', '593', '503', '267'], ex: '435 + 168: 5 + 8 = 13 viết 3 nhớ 1; 3 + 6 + 1 = 10 viết 0 nhớ 1; 4 + 1 + 1 = 6. Được 603 quyển.' },
  { w: 1, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '254 + ? = 500. Số thích hợp ở dấu hỏi là:', o: ['246', '754', '256', '356'], ex: 'Muốn tìm số hạng, lấy tổng trừ số hạng kia: 500 − 254 = 246.' },
  { w: 1, m: 'toan', lv: 3, t: 'Ước lượng', q: 'Tổng 298 + 405 gần nhất với số tròn trăm nào?', o: ['700', '600', '800', '500'], ex: '298 gần 300, 405 gần 400. 300 + 400 = 700. Tính đúng: 298 + 405 = 703.' },
  { w: 1, m: 'toan', lv: 3, t: 'Số đến 1 000', q: 'Từ ba chữ số 3, 0, 6 lập được số bé nhất có ba chữ số khác nhau là:', o: ['306', '036', '360', '603'], ex: 'Chữ số 0 không đứng đầu được. Hàng trăm chọn 3, rồi 0, rồi 6: số 306.' },

  // Tuần 2
  { w: 2, m: 'toan', lv: 1, t: 'Bảng nhân', q: '3 × 8 = ?', o: ['24', '11', '21', '27'], ex: 'Bảng nhân 3: 3 × 8 = 24.' },
  { w: 2, m: 'toan', lv: 1, t: 'Bảng chia', q: '27 : 3 = ?', o: ['9', '8', '24', '30'], ex: 'Vì 3 × 9 = 27 nên 27 : 3 = 9.' },
  { w: 2, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi cái bàn có 4 chân. 7 cái bàn có bao nhiêu chân?', o: ['28', '11', '24', '32'], ex: '4 chân được lấy 7 lần: 4 × 7 = 28 chân.' },
  { w: 2, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Có 35 quả trứng xếp vào các khay, mỗi khay 5 quả. Cần mấy khay?', o: ['7', '30', '40', '6'], ex: '35 : 5 = 7 khay.' },
  { w: 2, m: 'toan', lv: 1, t: 'Bảng nhân', q: 'Phép tính nào có kết quả bằng 12?', o: ['3 × 4', '3 + 4', '2 × 5', '4 × 4'], ex: '3 × 4 = 12. Còn 3 + 4 = 7, 2 × 5 = 10, 4 × 4 = 16.' },
  { w: 2, m: 'toan', lv: 2, t: 'Quy luật', q: 'Số tiếp theo của dãy 4, 8, 12, 16, … là:', o: ['20', '18', '24', '17'], ex: 'Dãy đếm thêm 4 (bảng nhân 4): 16 + 4 = 20.' },
  { w: 2, m: 'toan', lv: 2, t: 'Tiền Việt Nam', q: 'Mỗi cái bút chì giá 5 nghìn đồng. Mua 3 cái bút chì hết bao nhiêu tiền?', o: ['15 nghìn đồng', '8 nghìn đồng', '10 nghìn đồng', '20 nghìn đồng'], ex: '5 nghìn đồng được lấy 3 lần: 5 × 3 = 15 nghìn đồng.' },
  { w: 2, m: 'toan', lv: 1, t: 'Phép chia', q: 'Chia đều số bánh trong hình cho 3 bạn. Mỗi bạn được mấy cái bánh?', fig: { type: 'tokens', rows: [['🍪', '🍪', '🍪', '🍪', '🍪', '🍪'], ['🍪', '🍪', '🍪', '🍪', '🍪', '🍪']] }, o: ['4', '3', '12', '6'], ex: 'Có 12 cái bánh. 12 : 3 = 4 cái mỗi bạn.' },
  { w: 2, m: 'toan', lv: 3, t: 'So sánh số', q: 'Dấu thích hợp điền vào chỗ trống: 4 × 6 ... 5 × 5', o: ['<', '>', '=', '×'], ex: '4 × 6 = 24, 5 × 5 = 25. Vì 24 < 25 nên điền dấu <.' },
  { w: 2, m: 'toan', lv: 1, t: 'Bảng chia', q: '18 : 2 = ?', o: ['9', '16', '8', '20'], ex: 'Vì 2 × 9 = 18 nên 18 : 2 = 9.' },
  { w: 2, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi lọ cắm 3 bông hoa. Cắm 6 lọ thì cần bao nhiêu bông hoa?', o: ['18', '9', '15', '21'], ex: '3 bông được lấy 6 lần: 3 × 6 = 18 bông hoa.' },

  // Tuần 3
  { w: 3, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 7, m: 45 }, o: ['7 giờ 45 phút', '8 giờ 45 phút', '9 giờ 35 phút', '7 giờ 9 phút'], ex: 'Kim ngắn gần tới số 8 nhưng chưa tới, kim dài chỉ số 9 là 45 phút: 7 giờ 45 phút.' },
  { w: 3, m: 'toan', lv: 1, t: 'Đo độ dài', q: '1 dm bằng bao nhiêu xăng-ti-mét?', o: ['10 cm', '100 cm', '1 cm', '1 000 cm'], ex: '1 dm = 10 cm.' },
  { w: 3, m: 'toan', lv: 2, t: 'Đo độ dài', q: 'Quãng đường từ nhà Bình đến trường dài 2 km. Quãng đường đó dài bao nhiêu mét?', o: ['2 000 m', '200 m', '20 m', '2 m'], ex: '1 km = 1 000 m, nên 2 km = 2 000 m.' },
  { w: 3, m: 'toan', lv: 1, t: 'Ước lượng', q: 'Chiếc bàn học của em cao khoảng bao nhiêu?', o: ['7 dm', '7 cm', '7 m', '7 km'], ex: 'Bàn học cao khoảng 70 cm, tức là 7 dm. 7 cm chỉ bằng ngón tay, 7 m cao hơn cả ngôi nhà.' },
  { w: 3, m: 'toan', lv: 1, t: 'Khối lượng', q: 'Bao gạo nặng 10 kg, mẹ đã nấu hết 3 kg. Bao gạo còn lại bao nhiêu ki-lô-gam?', o: ['7 kg', '13 kg', '3 kg', '6 kg'], ex: '10 kg − 3 kg = 7 kg.' },
  { w: 3, m: 'toan', lv: 1, t: 'Dung tích', q: 'Có 4 can, mỗi can đựng 5 l nước. Cả 4 can đựng bao nhiêu lít nước?', o: ['20 l', '9 l', '25 l', '15 l'], ex: '5 l được lấy 4 lần: 5 × 4 = 20 l.' },
  { w: 3, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Ngày 20 tháng 10 là thứ mấy?', fig: { type: 'calendar', days: 31, start: 3, mark: [20], title: 'Tháng 10' }, o: ['Thứ Ba', 'Thứ Tư', 'Thứ Hai', 'Chủ nhật'], ex: 'Ngày 20 nằm ở cột T3 nên là thứ Ba.' },
  { w: 3, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Hôm nay là thứ Hai ngày 8. Thứ Hai tuần sau là ngày mấy?', o: ['15', '9', '14', '16'], ex: 'Một tuần có 7 ngày: 8 + 7 = 15.' },
  { w: 3, m: 'toan', lv: 2, t: 'Đếm hình', q: 'Hình bên có bao nhiêu đoạn thẳng?', fig: { type: 'lines', pts: { A: [0, 0], M: [4, 0], B: [8, 0] }, segs: [['A', 'B']] }, o: ['3', '2', '1', '4'], ex: 'Có các đoạn thẳng AM, MB và AB: 3 đoạn thẳng.' },
  { w: 3, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Bố làm việc từ 7 giờ sáng đến 11 giờ trưa. Bố làm việc trong mấy giờ?', o: ['4 giờ', '18 giờ', '3 giờ', '5 giờ'], ex: 'Từ 7 giờ đến 11 giờ: 11 − 7 = 4 giờ.' },
  { w: 3, m: 'toan', lv: 3, t: 'Đo độ dài', q: 'Sợi dây dài 1 m, cắt đi 35 cm. Sợi dây còn lại dài bao nhiêu xăng-ti-mét?', o: ['65 cm', '75 cm', '34 cm', '135 cm'], ex: 'Đổi 1 m = 100 cm. 100 − 35 = 65 cm.' },

  // Tuần 4
  { w: 4, m: 'toan', lv: 1, t: 'Bảng nhân', q: '6 × 9 = ?', o: ['54', '56', '48', '15'], ex: 'Bảng nhân 6: 6 × 9 = 54.' },
  { w: 4, m: 'toan', lv: 1, t: 'Bảng chia', q: '49 : 7 = ?', o: ['7', '6', '42', '8'], ex: 'Vì 7 × 7 = 49 nên 49 : 7 = 7.' },
  { w: 4, m: 'toan', lv: 1, t: 'Toán lời văn', q: 'Mỗi tuần lễ có 7 ngày. 4 tuần lễ có bao nhiêu ngày?', o: ['28', '11', '21', '35'], ex: '7 ngày được lấy 4 lần: 7 × 4 = 28 ngày.' },
  { w: 4, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi con kiến có 6 chân. 8 con kiến có bao nhiêu chân?', o: ['48', '14', '42', '54'], ex: '6 chân được lấy 8 lần: 6 × 8 = 48 chân.' },
  { w: 4, m: 'toan', lv: 2, t: 'Bảng chia', q: 'Có 35 l nước mắm chia đều vào 7 can. Mỗi can có bao nhiêu lít?', o: ['5 l', '28 l', '6 l', '42 l'], ex: '35 : 7 = 5 l mỗi can.' },
  { w: 4, m: 'toan', lv: 2, t: 'Bảng nhân', q: 'Trong các số 36, 46, 56, 26, số nào là kết quả của bảng nhân 6?', o: ['36', '46', '56', '26'], ex: '6 × 6 = 36. Bảng nhân 6 có 6, 12, 18, 24, 30, 36, 42, 48, 54, 60, không có 46, 56, 26.' },
  { w: 4, m: 'toan', lv: 2, t: 'Tia số', q: 'Số thích hợp ở dấu hỏi là số nào?', fig: { type: 'numline', from: 0, to: 42, step: 7, label: [0, 7, 14, 21, 35, 42], ask: [28] }, o: ['28', '27', '24', '30'], ex: 'Mỗi vạch cách nhau 7. Sau 21 là 21 + 7 = 28.' },
  { w: 4, m: 'toan', lv: 3, t: 'Toán lời văn', q: 'Có 6 bạn, mỗi bạn gấp được 7 con hạc giấy. Cô gấp thêm 8 con nữa. Có tất cả bao nhiêu con hạc giấy?', o: ['50', '42', '21', '56'], ex: 'Các bạn gấp 7 × 6 = 42 con. Thêm 8 con: 42 + 8 = 50 con hạc giấy.' },
  { w: 4, m: 'toan', lv: 1, t: 'Phép chia', q: 'Chia đều số quả dâu trong hình cho 6 bạn. Mỗi bạn được mấy quả?', fig: { type: 'tokens', rows: [['🍓', '🍓', '🍓', '🍓', '🍓', '🍓'], ['🍓', '🍓', '🍓', '🍓', '🍓', '🍓'], ['🍓', '🍓', '🍓', '🍓', '🍓', '🍓']] }, o: ['3', '6', '18', '12'], ex: 'Có 18 quả dâu. 18 : 6 = 3 quả mỗi bạn.' },
  { w: 4, m: 'toan', lv: 1, t: 'Bảng nhân', q: 'Tích của 7 và 5 là:', o: ['35', '12', '30', '40'], ex: 'Tích là kết quả phép nhân: 7 × 5 = 35. 12 là tổng của 7 và 5.' },
  { w: 4, m: 'toan', lv: 3, t: 'Bảng chia', q: 'Phép chia nào có thương lớn nhất?', o: ['42 : 6', '42 : 7', '36 : 6', '35 : 7'], ex: '42 : 6 = 7, 42 : 7 = 6, 36 : 6 = 6, 35 : 7 = 5. Lớn nhất là 42 : 6.' },

  // Tuần 5
  { w: 5, m: 'toan', lv: 1, t: 'Bảng nhân', q: '8 × 6 = ?', o: ['48', '42', '54', '14'], ex: 'Bảng nhân 8: 8 × 6 = 48.' },
  { w: 5, m: 'toan', lv: 1, t: 'Bảng chia', q: '81 : 9 = ?', o: ['9', '8', '72', '1'], ex: 'Vì 9 × 9 = 81 nên 81 : 9 = 9.' },
  { w: 5, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi hộp bút màu có 8 cây. 9 hộp có bao nhiêu cây bút màu?', o: ['72', '17', '63', '81'], ex: '8 cây được lấy 9 lần: 8 × 9 = 72 cây bút màu.' },
  { w: 5, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Cuộn dây dài 64 m, cắt thành các đoạn dài 8 m. Cắt được mấy đoạn?', o: ['8 đoạn', '56 đoạn', '72 đoạn', '7 đoạn'], ex: '64 : 8 = 8 đoạn.' },
  { w: 5, m: 'toan', lv: 2, t: 'Quy luật', q: 'Số thích hợp ở dấu hỏi: 9, 18, 27, ?, 45', o: ['36', '35', '28', '54'], ex: 'Dãy đếm thêm 9 (bảng nhân 9): 27 + 9 = 36, 36 + 9 = 45.' },
  { w: 5, m: 'toan', lv: 2, t: 'Bảng nhân', q: 'Bạn Minh nói: "8 × 7 = 54". Kết quả đúng của 8 × 7 là bao nhiêu?', o: ['56', '54', '48', '63'], ex: 'Bảng nhân 8: 8 × 7 = 56. Số 54 là kết quả của 6 × 9.' },
  { w: 5, m: 'toan', lv: 1, t: 'Phép chia', q: 'Buộc đều số bóng bay trong hình thành 8 chùm. Mỗi chùm có mấy quả bóng?', fig: { type: 'tokens', rows: [['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'], ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈'], ['🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈', '🎈']] }, o: ['3', '8', '24', '4'], ex: 'Có 24 quả bóng. 24 : 8 = 3 quả mỗi chùm.' },
  { w: 5, m: 'toan', lv: 1, t: 'Bảng nhân', q: 'Phép nhân nào có kết quả bằng 72?', o: ['8 × 9', '7 × 9', '8 × 8', '6 × 9'], ex: '8 × 9 = 72. Còn 7 × 9 = 63, 8 × 8 = 64, 6 × 9 = 54.' },
  { w: 5, m: 'toan', lv: 1, t: 'Toán lời văn', q: 'Mỗi con bạch tuộc có 8 xúc tu. 3 con bạch tuộc có bao nhiêu xúc tu?', o: ['24', '11', '32', '16'], ex: '8 xúc tu được lấy 3 lần: 8 × 3 = 24 xúc tu.' },
  { w: 5, m: 'toan', lv: 2, t: 'Tiền Việt Nam', q: 'Mỗi quyển vở giá 8 nghìn đồng. Mua 5 quyển vở hết bao nhiêu tiền?', o: ['40 nghìn đồng', '13 nghìn đồng', '45 nghìn đồng', '35 nghìn đồng'], ex: '8 nghìn đồng được lấy 5 lần: 8 × 5 = 40 nghìn đồng.' },
  { w: 5, m: 'toan', lv: 2, t: 'Bảng chia', q: 'Số nào chia cho 9 thì được 7?', o: ['63', '16', '2', '56'], ex: 'Vì 9 × 7 = 63 nên 63 : 9 = 7.' },

  // Tuần 6
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '6 × ? = 48. Số thích hợp ở dấu hỏi là:', o: ['8', '42', '7', '54'], ex: 'Muốn tìm thừa số, lấy tích chia cho thừa số kia: 48 : 6 = 8.' },
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '? : 7 = 4. Số thích hợp ở dấu hỏi là:', o: ['28', '11', '3', '21'], ex: 'Muốn tìm số bị chia, lấy thương nhân số chia: 4 × 7 = 28.' },
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '56 : ? = 8. Số thích hợp ở dấu hỏi là:', o: ['7', '48', '64', '6'], ex: 'Muốn tìm số chia, lấy số bị chia chia cho thương: 56 : 8 = 7.' },
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: 'Một số nhân với 3 thì được 27. Số đó là:', o: ['9', '24', '30', '81'], ex: 'Số cần tìm là thừa số: 27 : 3 = 9.' },
  { w: 6, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy hình tròn?', fig: { type: 'frac', shape: 'circle', n: 4, k: 1 }, o: ['1/4', '1/3', '1/5', '4/1'], ex: 'Hình tròn chia 4 phần bằng nhau, tô 1 phần: 1/4.' },
  { w: 6, m: 'toan', lv: 1, t: 'Một phần mấy', q: '1/2 của 14 quả cam là bao nhiêu quả?', o: ['7 quả', '12 quả', '16 quả', '28 quả'], ex: '14 : 2 = 7 quả cam.' },
  { w: 6, m: 'toan', lv: 2, t: 'Một phần mấy', q: 'Một giờ có 60 phút. 1/6 giờ là bao nhiêu phút?', o: ['10 phút', '54 phút', '6 phút', '66 phút'], ex: '1/6 của 60 phút là 60 : 6 = 10 phút.' },
  { w: 6, m: 'toan', lv: 2, t: 'Một phần mấy', q: '1/7 của một tuần lễ là mấy ngày?', o: ['1 ngày', '7 ngày', '6 ngày', '14 ngày'], ex: 'Một tuần lễ có 7 ngày. 7 : 7 = 1 ngày.' },
  { w: 6, m: 'toan', lv: 2, t: 'Một phần mấy', q: 'Hoa có 24 viên bi, Hoa cho bạn 1/3 số bi. Hoa đã cho bạn mấy viên bi?', o: ['8', '21', '16', '6'], ex: '1/3 của 24 viên là 24 : 3 = 8 viên bi.' },
  { w: 6, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy hình vuông?', fig: { type: 'frac', shape: 'grid', n: 9, k: 1, cols: 3 }, o: ['1/9', '1/8', '1/3', '9/1'], ex: 'Hình vuông chia 9 ô bằng nhau, tô 1 ô: 1/9.' },
  { w: 6, m: 'toan', lv: 2, t: 'Tìm thành phần', q: 'Mẹ chia đều số kẹo cho 3 anh em, mỗi người được 6 cái. Mẹ có bao nhiêu cái kẹo?', o: ['18 cái', '9 cái', '2 cái', '3 cái'], ex: 'Tìm số bị chia: lấy 6 × 3 = 18 cái kẹo.' },

  // Tuần 7
  { w: 7, m: 'toan', lv: 1, t: 'Trung điểm', q: 'Điểm O ở giữa hai điểm nào?', fig: { type: 'lines', pts: { A: [0, 0], O: [4, 0], B: [8, 0], C: [4, -3] }, segs: [['A', 'B']] }, o: ['A và B', 'A và C', 'O và B', 'C và B'], ex: 'Ba điểm A, O, B thẳng hàng và O nằm giữa A và B.' },
  { w: 7, m: 'toan', lv: 2, t: 'Trung điểm', q: 'M là trung điểm của đoạn thẳng AB. Điểm M ứng với số nào?', fig: { type: 'numline', from: 0, to: 16, step: 2, label: [0, 16], mark: { 0: 'A', 16: 'B' } }, o: ['8', '16', '6', '10'], ex: 'Từ 0 đến 16, một nửa là 16 : 2 = 8. M ứng với số 8.' },
  { w: 7, m: 'toan', lv: 2, t: 'Trung điểm', q: 'Sợi ruy băng dài 24 cm. Gập đôi cho hai đầu trùng nhau rồi cắt ở nếp gấp. Mỗi đoạn dài bao nhiêu?', o: ['12 cm', '24 cm', '48 cm', '22 cm'], ex: 'Nếp gấp là trung điểm của sợi ruy băng: 24 : 2 = 12 cm.' },
  { w: 7, m: 'toan', lv: 3, t: 'Trung điểm', q: 'Điểm M nằm giữa A và B, AM = 3 cm, MB = 5 cm. Dời M về phía B bao nhiêu xăng-ti-mét thì M là trung điểm?', o: ['1 cm', '2 cm', '4 cm', '8 cm'], ex: 'AB = 3 + 5 = 8 cm. Trung điểm cách A 8 : 2 = 4 cm. Dời M thêm 4 − 3 = 1 cm.' },
  { w: 7, m: 'toan', lv: 2, t: 'Cộng trừ', q: '456 + 278 = ?', o: ['734', '624', '724', '634'], ex: '6 + 8 = 14 viết 4 nhớ 1; 5 + 7 + 1 = 13 viết 3 nhớ 1; 4 + 2 + 1 = 7. Kết quả 734.' },
  { w: 7, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi lốc sữa có 4 hộp. 9 lốc sữa có bao nhiêu hộp sữa?', o: ['36', '13', '32', '45'], ex: '4 hộp được lấy 9 lần: 4 × 9 = 36 hộp sữa.' },
  { w: 7, m: 'toan', lv: 2, t: 'Tìm thành phần', q: '? − 158 = 342. Số thích hợp ở dấu hỏi là:', o: ['500', '184', '400', '490'], ex: 'Muốn tìm số bị trừ, lấy hiệu cộng số trừ: 342 + 158 = 500.' },
  { w: 7, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy hình vuông?', fig: { type: 'frac', shape: 'grid', n: 4, k: 1, cols: 2 }, o: ['1/4', '1/2', '1/3', '4/1'], ex: 'Hình vuông chia 4 phần bằng nhau, tô 1 phần: 1/4.' },
  { w: 7, m: 'toan', lv: 3, t: 'Một phần mấy', q: '1/3 của 27 lớn hơn 1/4 của 24 bao nhiêu đơn vị?', o: ['3', '9', '6', '15'], ex: '1/3 của 27 là 27 : 3 = 9. 1/4 của 24 là 24 : 4 = 6. 9 − 6 = 3.' },

  // Tuần 8
  { w: 8, m: 'toan', lv: 1, t: 'Hình tròn', q: 'Tâm của hình tròn là điểm nào?', fig: { type: 'lines', pts: { I: [0, 0], M: [3, 0], N: [0, -3] }, segs: [['I', 'M']], circles: [[0, 0, 3]] }, o: ['I', 'M', 'N', 'MN'], ex: 'Tâm là điểm ở chính giữa hình tròn: điểm I. M và N nằm trên đường tròn.' },
  { w: 8, m: 'toan', lv: 2, t: 'Hình tròn', q: 'Trong một hình tròn, đường kính so với bán kính thì:', o: ['dài gấp 2 lần', 'ngắn hơn', 'dài bằng nhau', 'dài gấp 4 lần'], ex: 'Đường kính gồm hai bán kính nối tiếp qua tâm nên dài gấp 2 lần bán kính.' },
  { w: 8, m: 'toan', lv: 2, t: 'Hình tròn', q: 'Các bán kính của cùng một hình tròn thì:', o: ['dài bằng nhau', 'dài gấp đôi nhau', 'dài khác nhau', 'dài bằng đường kính'], ex: 'Mọi bán kính đều nối tâm với đường tròn nên dài bằng nhau.' },
  { w: 8, m: 'toan', lv: 3, t: 'Hình tròn', q: 'Hộp xếp vừa khít 3 cái bánh tròn thành một hàng, mỗi bánh có bán kính 5 cm. Hộp dài bao nhiêu?', o: ['30 cm', '15 cm', '10 cm', '20 cm'], ex: 'Mỗi bánh có đường kính 5 × 2 = 10 cm. Ba bánh dài 10 × 3 = 30 cm.' },
  { w: 8, m: 'toan', lv: 1, t: 'Góc vuông', q: 'Góc đỉnh O cạnh OM, ON là góc gì?', fig: { type: 'angle', deg: 120, names: ['M', 'O', 'N'] }, o: ['góc không vuông', 'góc vuông', 'hình tam giác', 'đường thẳng'], ex: 'Hai cạnh OM, ON mở rộng hơn góc vuông nên đây là góc không vuông.' },
  { w: 8, m: 'toan', lv: 1, t: 'Góc vuông', q: 'Dụng cụ nào dùng để kiểm tra góc vuông?', o: ['ê ke', 'com-pa', 'cân đĩa', 'nhiệt kế'], ex: 'Đặt góc vuông của ê ke trùng với góc cần kiểm tra để biết góc đó có vuông hay chưa.' },
  { w: 8, m: 'toan', lv: 1, t: 'Hình tròn', q: 'Dụng cụ dùng để vẽ hình tròn là:', o: ['com-pa', 'ê ke', 'thước kẻ', 'cân đĩa'], ex: 'Com-pa có một đầu nhọn đặt ở tâm, đầu kia quay một vòng vẽ nên hình tròn.' },
  { w: 8, m: 'toan', lv: 1, t: 'Góc vuông', q: 'Hình vuông có mấy góc vuông?', o: ['4', '2', '3', '1'], ex: 'Hình vuông có 4 góc, cả 4 góc đều là góc vuông.' },
  { w: 8, m: 'toan', lv: 2, t: 'Góc vuông', q: 'Hình ngôi nhà bên có mấy góc vuông?', fig: { type: 'poly', pts: [[0, 3], [0, 8], [6, 8], [6, 3], [3, 1]] }, o: ['2', '4', '3', '5'], ex: 'Chỉ hai góc ở chân tường là góc vuông. Hai góc chỗ mái nối tường và góc đỉnh mái là góc không vuông.' },

  // Tuần 9
  { w: 9, m: 'toan', lv: 1, t: 'Hình phẳng', q: 'Hình tam giác có mấy đỉnh?', o: ['3', '4', '2', '6'], ex: 'Hình tam giác có 3 cạnh và 3 đỉnh.' },
  { w: 9, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình nào có 4 góc vuông và 4 cạnh dài bằng nhau?', o: ['hình vuông', 'hình chữ nhật', 'hình tam giác', 'hình tròn'], ex: 'Hình chữ nhật cũng có 4 góc vuông nhưng cạnh dài và cạnh ngắn khác nhau. Hình vuông có 4 cạnh bằng nhau.' },
  { w: 9, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình chữ nhật có chiều dài 9 cm, chiều rộng 5 cm. Hai cạnh dài cộng lại dài bao nhiêu?', o: ['18 cm', '14 cm', '10 cm', '28 cm'], ex: 'Hai cạnh dài của hình chữ nhật bằng nhau, mỗi cạnh 9 cm: 9 + 9 = 18 cm.' },
  { w: 9, m: 'toan', lv: 2, t: 'Đếm hình', q: 'Hình bên có bao nhiêu hình tam giác?', fig: { type: 'lines', pts: { A: [3, 0], B: [0, 5], D: [2, 5], C: [6, 5] }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'D']] }, o: ['3', '2', '4', '1'], ex: 'Hai hình nhỏ ABD, ADC và hình lớn ABC: 3 hình tam giác.' },
  { w: 9, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình bên có mấy hình vuông?', fig: { type: 'tokens', row: ['sq.red', 'rect.blue', 'sq.green', 'diamond.yellow', 'tri.purple', 'sq.orange'] }, o: ['3', '4', '2', '5'], ex: 'Có 3 hình vuông: đỏ, xanh lá, cam. Hình xanh dương là hình chữ nhật, hình vàng là hình thoi.' },
  { w: 9, m: 'toan', lv: 1, t: 'Hình phẳng', q: 'Hình bên là hình gì?', fig: { type: 'poly', pts: [[0, 0], [7, 1], [6, 5], [1, 4]] }, o: ['hình tứ giác', 'hình tam giác', 'hình tròn', 'hình vuông'], ex: 'Hình có 4 cạnh, 4 đỉnh nên là hình tứ giác. Các góc không vuông nên chưa phải hình vuông.' },
  { w: 9, m: 'toan', lv: 3, t: 'Đếm hình', q: 'Hình bên có bao nhiêu hình chữ nhật?', fig: { type: 'lines', pts: { A: [0, 0], B: [3, 0], C: [6, 0], D: [9, 0], E: [0, 4], F: [3, 4], G: [6, 4], H: [9, 4] }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['E', 'F'], ['F', 'G'], ['G', 'H'], ['A', 'E'], ['B', 'F'], ['C', 'G'], ['D', 'H']] }, o: ['6', '3', '4', '5'], ex: '3 hình nhỏ, 2 hình ghép đôi (ACGE, BDHF) và 1 hình lớn ADHE: 3 + 2 + 1 = 6 hình.' },
  { w: 9, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình vuông có cạnh 5 cm. Tổng độ dài bốn cạnh của hình vuông là:', o: ['20 cm', '10 cm', '25 cm', '9 cm'], ex: 'Bốn cạnh bằng nhau, mỗi cạnh 5 cm: 5 × 4 = 20 cm.' },
  { w: 9, m: 'toan', lv: 2, t: 'Hình tròn', q: 'Muốn vẽ hình tròn có bán kính 3 cm, em mở com-pa rộng bao nhiêu?', o: ['3 cm', '6 cm', '1 cm', '9 cm'], ex: 'Khoảng cách hai đầu com-pa chính là bán kính: mở 3 cm.' },

  // Tuần 10
  { w: 10, m: 'toan', lv: 1, t: 'Khối hình', q: 'Khối lập phương có mấy mặt?', o: ['6', '4', '8', '12'], ex: 'Khối lập phương có 6 mặt là các hình vuông bằng nhau, giống con xúc xắc.' },
  { w: 10, m: 'toan', lv: 1, t: 'Khối hình', q: 'Đồ vật nào có dạng khối hộp chữ nhật?', o: ['viên gạch', 'quả bóng', 'lon sữa', 'cái nón'], ex: 'Viên gạch có 6 mặt là hình chữ nhật. Quả bóng tròn, lon sữa hình trụ, cái nón hình chóp.' },
  { w: 10, m: 'toan', lv: 2, t: 'Khối hình', q: 'Các mặt của khối lập phương đều là hình gì?', o: ['hình vuông', 'hình tam giác', 'hình tròn', 'đường gấp khúc'], ex: 'Khối lập phương có 6 mặt đều là hình vuông bằng nhau.' },
  { w: 10, m: 'toan', lv: 2, t: 'Khối hình', q: 'Hình bên có bao nhiêu khối lập phương?', fig: { type: 'cubes', cols: [[2, 1, 2]] }, o: ['5', '3', '4', '6'], ex: 'Ba cột cao 2, 1, 2 khối: 2 + 1 + 2 = 5 khối.' },
  { w: 10, m: 'toan', lv: 3, t: 'Khối hình', q: 'Xếp các khối lập phương thành 2 tầng, mỗi tầng 3 hàng, mỗi hàng 3 khối. Cần bao nhiêu khối?', o: ['18', '8', '9', '12'], ex: 'Mỗi tầng 3 × 3 = 9 khối. Hai tầng: 9 × 2 = 18 khối.' },
  { w: 10, m: 'toan', lv: 3, t: 'Khối hình', q: 'Khối lập phương có cạnh dài 3 cm. Tổng độ dài tất cả các cạnh của khối là bao nhiêu?', o: ['36 cm', '24 cm', '18 cm', '9 cm'], ex: 'Khối lập phương có 12 cạnh bằng nhau: 3 × 12 = 36 cm. 24 cm là chỉ tính 8 cạnh.' },
  { w: 10, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Trường có 324 học sinh nam và 296 học sinh nữ. Trường có tất cả bao nhiêu học sinh?', o: ['620', '610', '520', '28'], ex: '4 + 6 = 10 viết 0 nhớ 1; 2 + 9 + 1 = 12 viết 2 nhớ 1; 3 + 2 + 1 = 6. Có 620 học sinh.' },
  { w: 10, m: 'toan', lv: 2, t: 'Một phần mấy', q: '1/8 của 40 cm là bao nhiêu?', o: ['5 cm', '32 cm', '48 cm', '8 cm'], ex: '40 : 8 = 5 cm.' },
  { w: 10, m: 'toan', lv: 2, t: 'So sánh số', q: 'Dấu thích hợp điền vào chỗ trống: 6 × 7 ... 8 × 5', o: ['>', '<', '=', '−'], ex: '6 × 7 = 42, 8 × 5 = 40. Vì 42 > 40 nên điền dấu >.' },
  { w: 10, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 5, m: 5 }, o: ['5 giờ 5 phút', '5 giờ 1 phút', '1 giờ 25 phút', '6 giờ 5 phút'], ex: 'Kim ngắn vừa qua số 5, kim dài chỉ số 1 là 5 phút: 5 giờ 5 phút.' },

  // Tuần 11
  { w: 11, m: 'toan', lv: 1, t: 'Nhân với số có một chữ số', q: '32 × 3 = ?', o: ['96', '35', '69', '93'], ex: '3 × 2 = 6, 3 × 3 = 9. Kết quả 96.' },
  { w: 11, m: 'toan', lv: 2, t: 'Nhân với số có một chữ số', q: '45 × 2 = ?', o: ['90', '810', '80', '47'], ex: '2 × 5 = 10, viết 0 nhớ 1; 2 × 4 = 8, thêm 1 là 9. Kết quả 90.' },
  { w: 11, m: 'toan', lv: 1, t: 'Gấp một số lần', q: 'Gấp 7 lên 6 lần được bao nhiêu?', o: ['42', '13', '1', '48'], ex: 'Gấp lên 6 lần thì nhân với 6: 7 × 6 = 42. Thêm 6 là cách làm sai.' },
  { w: 11, m: 'toan', lv: 2, t: 'Gấp một số lần', q: 'Em 6 tuổi, tuổi bố gấp 5 lần tuổi em. Bố bao nhiêu tuổi?', o: ['30 tuổi', '11 tuổi', '35 tuổi', '25 tuổi'], ex: '6 × 5 = 30 tuổi.' },
  { w: 11, m: 'toan', lv: 3, t: 'Gấp một số lần', q: 'Gấp 8 lên 3 lần rồi thêm 4 đơn vị thì được số nào?', o: ['28', '36', '15', '24'], ex: 'Gấp 8 lên 3 lần: 8 × 3 = 24. Thêm 4: 24 + 4 = 28.' },
  { w: 11, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi ngày có 24 giờ. 3 ngày có bao nhiêu giờ?', o: ['72', '62', '27', '48'], ex: '24 × 3: 3 × 4 = 12, viết 2 nhớ 1; 3 × 2 = 6, thêm 1 là 7. Được 72 giờ.' },
  { w: 11, m: 'toan', lv: 3, t: 'Nhân với số có một chữ số', q: 'Phép nhân nào có kết quả lớn nhất?', o: ['19 × 5', '47 × 2', '31 × 3', '23 × 4'], ex: '19 × 5 = 95, 47 × 2 = 94, 31 × 3 = 93, 23 × 4 = 92. Lớn nhất là 19 × 5.' },
  { w: 11, m: 'toan', lv: 2, t: 'Đặt tính', q: 'Kết quả phép nhân bên là bao nhiêu?', fig: { type: 'vcalc', a: 38, b: 2, op: '×', res: '?' }, o: ['76', '66', '616', '40'], ex: '2 × 8 = 16, viết 6 nhớ 1; 2 × 3 = 6, thêm 1 là 7. Kết quả 76.' },

  // Tuần 12
  { w: 12, m: 'toan', lv: 1, t: 'Chia cho số có một chữ số', q: '84 : 4 = ?', o: ['21', '12', '22', '80'], ex: '8 : 4 = 2, 4 : 4 = 1. Viết lần lượt từ hàng chục: 21.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia cho số có một chữ số', q: '75 : 5 = ?', o: ['15', '14', '13', '70'], ex: '7 : 5 = 1 dư 2. Hạ 5 được 25, 25 : 5 = 5. Kết quả 15.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia có dư', q: '29 : 6 = ?', o: ['4 (dư 5)', '4 (dư 3)', '5 (dư 1)', '3 (dư 11)'], ex: '6 × 4 = 24, 29 − 24 = 5. Số dư 5 bé hơn số chia 6.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia có dư', q: 'Trong phép chia có dư với số chia là 4, số dư có thể là số nào?', o: ['3', '4', '5', '8'], ex: 'Số dư luôn bé hơn số chia, nên chỉ có thể là 1, 2 hoặc 3.' },
  { w: 12, m: 'toan', lv: 3, t: 'Chia có dư', q: 'Có 50 quả trứng xếp vào các khay, mỗi khay 6 quả. Được mấy khay đầy, thừa mấy quả?', o: ['8 khay, thừa 2 quả', '7 khay, thừa 8 quả', '8 khay, thừa 4 quả', '9 khay, thừa 2 quả'], ex: '50 : 6 = 8 (dư 2): 8 khay đầy, thừa 2 quả.' },
  { w: 12, m: 'toan', lv: 2, t: 'Một phần mấy', q: '1/2 của 68 là bao nhiêu?', o: ['34', '36', '32', '66'], ex: '68 : 2: 6 : 2 = 3, 8 : 2 = 4. Được 34.' },
  { w: 12, m: 'toan', lv: 3, t: 'Chia cho số có một chữ số', q: 'Mẹ mua 96 cái bánh, xếp đều vào 8 hộp. Mỗi hộp có mấy cái bánh?', o: ['12', '11', '88', '14'], ex: '9 : 8 = 1 dư 1. Hạ 6 được 16, 16 : 8 = 2. Mỗi hộp 12 cái.' },
  { w: 12, m: 'toan', lv: 2, t: 'Chia có dư', q: 'Một tuần lễ có 7 ngày. 30 ngày là mấy tuần lễ và mấy ngày?', o: ['4 tuần 2 ngày', '3 tuần 9 ngày', '4 tuần 3 ngày', '5 tuần'], ex: '30 : 7 = 4 (dư 2): 4 tuần lễ và 2 ngày.' },

  // Tuần 13
  { w: 13, m: 'toan', lv: 1, t: 'Giảm một số lần', q: 'Mẹ mua 30 quả trứng. Sau một tuần, số trứng giảm đi 3 lần. Còn lại mấy quả trứng?', o: ['10 quả', '27 quả', '33 quả', '90 quả'], ex: 'Giảm đi 3 lần thì chia cho 3: 30 : 3 = 10 quả.' },
  { w: 13, m: 'toan', lv: 2, t: 'Giảm một số lần', q: 'Quyển truyện giá 40 nghìn đồng, nay giá giảm đi 2 lần. Giá mới là bao nhiêu?', o: ['20 nghìn đồng', '38 nghìn đồng', '80 nghìn đồng', '42 nghìn đồng'], ex: 'Giảm đi 2 lần: 40 : 2 = 20 nghìn đồng.' },
  { w: 13, m: 'toan', lv: 3, t: 'Giảm một số lần', q: 'Số 48 giảm đi 6 lần và số 48 bớt đi 6 đơn vị. Hai kết quả hơn kém nhau bao nhiêu?', o: ['34', '36', '8', '42'], ex: 'Giảm 6 lần: 48 : 6 = 8. Bớt 6 đơn vị: 48 − 6 = 42. 42 − 8 = 34.' },
  { w: 13, m: 'toan', lv: 2, t: 'Bài toán hai bước', q: 'Mua 2 quyển vở, mỗi quyển 8 nghìn đồng. Đưa cô bán hàng 20 nghìn đồng. Được trả lại bao nhiêu?', o: ['4 nghìn đồng', '12 nghìn đồng', '16 nghìn đồng', '6 nghìn đồng'], ex: 'Hai quyển vở: 8 × 2 = 16 nghìn đồng. Trả lại 20 − 16 = 4 nghìn đồng.' },
  { w: 13, m: 'toan', lv: 2, t: 'Bài toán hai bước', q: 'Lớp 3A có 18 bạn nữ, số bạn nam ít hơn số bạn nữ 3 bạn. Lớp 3A có bao nhiêu bạn?', o: ['33', '15', '39', '21'], ex: 'Bạn nam: 18 − 3 = 15 bạn. Cả lớp: 18 + 15 = 33 bạn.' },
  { w: 13, m: 'toan', lv: 3, t: 'Bài toán hai bước', q: 'Mỗi hộp có 6 cái bánh. Mẹ mua 4 hộp, cả nhà đã ăn 9 cái. Còn lại bao nhiêu cái bánh?', o: ['15', '24', '1', '33'], ex: 'Có 6 × 4 = 24 cái bánh. Còn lại 24 − 9 = 15 cái.' },
  { w: 13, m: 'toan', lv: 2, t: 'Bài toán hai bước', q: 'Túi đường nặng 5 kg, bao gạo nặng gấp 5 lần túi đường. Cả túi đường và bao gạo nặng bao nhiêu?', o: ['30 kg', '25 kg', '10 kg', '35 kg'], ex: 'Bao gạo: 5 × 5 = 25 kg. Cả hai: 25 + 5 = 30 kg.' },
  { w: 13, m: 'toan', lv: 1, t: 'Giảm một số lần', q: 'Muốn giảm 9 đi 3 lần, ta làm phép tính nào?', o: ['9 : 3', '9 − 3', '9 × 3', '9 + 3'], ex: 'Giảm một số đi nhiều lần thì chia số đó cho số lần: 9 : 3 = 3.' },

  // Tuần 14
  { w: 14, m: 'toan', lv: 1, t: 'Mi-li-mét', q: '1 cm bằng bao nhiêu mi-li-mét?', o: ['10 mm', '100 mm', '1 000 mm', '1 mm'], ex: '1 cm = 10 mm.' },
  { w: 14, m: 'toan', lv: 2, t: 'Mi-li-mét', q: '40 mm bằng bao nhiêu xăng-ti-mét?', o: ['4 cm', '40 cm', '400 cm', '14 cm'], ex: '10 mm = 1 cm, nên 40 mm = 4 cm.' },
  { w: 14, m: 'toan', lv: 1, t: 'Ước lượng', q: 'Con kiến dài khoảng bao nhiêu?', o: ['5 mm', '5 cm', '5 dm', '5 m'], ex: 'Con kiến rất nhỏ, chỉ dài khoảng 5 mm. 5 cm đã dài bằng ngón tay.' },
  { w: 14, m: 'toan', lv: 2, t: 'Mi-li-mét', q: 'Dấu thích hợp điền vào chỗ trống: 3 cm ... 29 mm', o: ['>', '<', '=', '+'], ex: 'Đổi 3 cm = 30 mm. Vì 30 mm > 29 mm nên điền dấu >.' },
  { w: 14, m: 'toan', lv: 1, t: 'Gam', q: 'Một quả trứng gà nặng khoảng bao nhiêu?', o: ['50 g', '50 kg', '5 kg', '500 g'], ex: 'Quả trứng gà nặng khoảng 50 g. 500 g đã nặng bằng gần 10 quả trứng.' },
  { w: 14, m: 'toan', lv: 2, t: 'Gam', q: 'Mỗi gói mì nặng 75 g. 4 gói mì nặng bao nhiêu gam?', o: ['300 g', '280 g', '79 g', '300 kg'], ex: '75 × 4: 4 × 5 = 20, viết 0 nhớ 2; 4 × 7 = 28, thêm 2 là 30. Được 300 g.' },
  { w: 14, m: 'toan', lv: 3, t: 'Gam', q: 'Hộp bánh nặng 1 kg, riêng vỏ hộp nặng 150 g. Bánh trong hộp nặng bao nhiêu gam?', o: ['850 g', '950 g', '149 g', '750 g'], ex: 'Đổi 1 kg = 1 000 g. 1 000 − 150 = 850 g.' },
  { w: 14, m: 'toan', lv: 3, t: 'Gam', q: 'Cân thăng bằng. Quả xoài nặng bao nhiêu gam?', fig: { type: 'balance', left: ['🥭', '100 g', '50 g'], right: ['500 g'], tilt: 0 }, o: ['350 g', '650 g', '450 g', '400 g'], ex: 'Xoài cùng hai quả cân 100 g và 50 g nặng bằng 500 g: 500 − 100 − 50 = 350 g.' },
  { w: 14, m: 'toan', lv: 3, t: 'Mi-li-mét', q: 'Chiếc đinh dài bao nhiêu mi-li-mét?', fig: { type: 'ruler', len: 4.2, start: 0, max: 6, obj: 'nail' }, o: ['42 mm', '40 mm', '24 mm', '52 mm'], ex: 'Đinh dài 4 cm và thêm 2 vạch nhỏ: 40 mm + 2 mm = 42 mm.' },

  // Tuần 15
  { w: 15, m: 'toan', lv: 1, t: 'Mi-li-lít', q: '1 l bằng bao nhiêu mi-li-lít?', o: ['1 000 ml', '100 ml', '10 ml', '10 000 ml'], ex: '1 l = 1 000 ml.' },
  { w: 15, m: 'toan', lv: 1, t: 'Ước lượng', q: 'Một cốc nước em uống chứa khoảng bao nhiêu?', o: ['200 ml', '200 l', '2 ml', '20 l'], ex: 'Cốc nước thường chứa khoảng 200 ml. 2 ml chỉ bằng nửa thìa nhỏ.' },
  { w: 15, m: 'toan', lv: 2, t: 'Mi-li-lít', q: 'Cần rót thêm bao nhiêu mi-li-lít nước nữa thì bình đầy tới vạch 500?', fig: { type: 'jug', items: [{ cap: 500, v: 200, unit: 'ml' }] }, o: ['300 ml', '200 ml', '500 ml', '700 ml'], ex: 'Bình đang có 200 ml. 500 − 200 = 300 ml.' },
  { w: 15, m: 'toan', lv: 2, t: 'Mi-li-lít', q: 'Chai nước mắm có 500 ml, mẹ đã dùng 150 ml. Chai còn lại bao nhiêu mi-li-lít?', o: ['350 ml', '450 ml', '650 ml', '150 ml'], ex: '500 − 150 = 350 ml.' },
  { w: 15, m: 'toan', lv: 2, t: 'Nhiệt độ', q: 'Sáng mùa đông ở Sa Pa, nhiệt kế chỉ bao nhiêu độ C?', fig: { type: 'thermo', v: 9, min: 0, max: 20 }, o: ['9 °C', '11 °C', '90 °C', '19 °C'], ex: 'Cột đỏ dừng ở vạch thứ 9, chưa tới 10: 9 °C. Trời lạnh.' },
  { w: 15, m: 'toan', lv: 2, t: 'Nhiệt độ', q: 'Cốc nước đá đang tan có nhiệt độ khoảng bao nhiêu?', o: ['0 °C', '100 °C', '37 °C', '25 °C'], ex: 'Nước đá tan ở khoảng 0 °C. 100 °C là nước sôi, 37 °C là thân nhiệt người.' },
  { w: 15, m: 'toan', lv: 2, t: 'Nhiệt độ', q: 'Buổi sáng trời 24 °C, buổi trưa nóng hơn buổi sáng 8 °C. Buổi trưa trời bao nhiêu độ C?', o: ['32 °C', '16 °C', '28 °C', '34 °C'], ex: 'Nóng hơn thì cộng thêm: 24 + 8 = 32 °C.' },
  { w: 15, m: 'toan', lv: 1, t: 'Nhiệt độ', q: 'Bé bị sốt. Nhiệt kế đo thân nhiệt của bé có thể chỉ bao nhiêu?', o: ['39 °C', '37 °C', '30 °C', '60 °C'], ex: 'Người khỏe khoảng 37 °C. Sốt thì nóng hơn, khoảng 38 °C đến 39 °C.' },
  { w: 15, m: 'toan', lv: 3, t: 'Mi-li-lít', q: 'Lọ si-rô có 100 ml, mỗi lần uống 5 ml. Lọ si-rô uống được mấy lần?', o: ['20 lần', '95 lần', '50 lần', '500 lần'], ex: '100 : 5 = 20 lần. Mười chục chia 5 được hai chục.' },

  // Tuần 16
  { w: 16, m: 'toan', lv: 1, t: 'Nhân với số có một chữ số', q: '312 × 3 = ?', o: ['936', '315', '639', '926'], ex: '3 × 2 = 6, 3 × 1 = 3, 3 × 3 = 9. Kết quả 936.' },
  { w: 16, m: 'toan', lv: 2, t: 'Nhân với số có một chữ số', q: '208 × 4 = ?', o: ['832', '82', '812', '8032'], ex: '4 × 8 = 32, viết 2 nhớ 3; 4 × 0 = 0, thêm 3 là 3; 4 × 2 = 8. Kết quả 832.' },
  { w: 16, m: 'toan', lv: 2, t: 'Chia cho số có một chữ số', q: '963 : 3 = ?', o: ['321', '312', '300', '960'], ex: '9 : 3 = 3, 6 : 3 = 2, 3 : 3 = 1. Kết quả 321.' },
  { w: 16, m: 'toan', lv: 3, t: 'Chia cho số có một chữ số', q: '816 : 8 = ?', o: ['102', '12', '120', '112'], ex: '8 : 8 = 1; 1 không chia được cho 8, viết 0; 16 : 8 = 2. Kết quả 102.' },
  { w: 16, m: 'toan', lv: 2, t: 'Toán lời văn', q: 'Mỗi gói kẹo nặng 150 g. 6 gói kẹo nặng bao nhiêu gam?', o: ['900 g', '600 g', '156 g', '960 g'], ex: '150 × 6: 6 × 0 = 0; 6 × 5 = 30, viết 0 nhớ 3; 6 × 1 = 6, thêm 3 là 9. Được 900 g.' },
  { w: 16, m: 'toan', lv: 3, t: 'Toán lời văn', q: 'Có 945 quyển sách xếp đều vào 9 ngăn tủ. Mỗi ngăn có bao nhiêu quyển sách?', o: ['105', '15', '150', '936'], ex: '9 : 9 = 1; 4 không chia được cho 9, viết 0; 45 : 9 = 5. Mỗi ngăn 105 quyển.' },
  { w: 16, m: 'toan', lv: 3, t: 'Chia có dư', q: 'Phép chia 725 : 7 có số dư là bao nhiêu?', o: ['4', '3', '5', '0'], ex: '7 : 7 = 1; 2 : 7 được 0, viết 0; 25 : 7 = 3 dư 4. 725 : 7 = 103 (dư 4).' },
  { w: 16, m: 'toan', lv: 2, t: 'Gấp một số lần', q: 'Gấp 125 lên 5 lần được bao nhiêu?', o: ['625', '130', '525', '120'], ex: '125 × 5: 5 × 5 = 25 viết 5 nhớ 2; 5 × 2 = 10, thêm 2 là 12 viết 2 nhớ 1; 5 × 1 = 5, thêm 1 là 6. Được 625.' },

  // Tuần 17
  { w: 17, m: 'toan', lv: 1, t: 'Biểu thức', q: '120 + 30 − 50 = ?', o: ['100', '40', '200', '150'], ex: 'Chỉ có cộng, trừ thì tính từ trái sang phải: 120 + 30 = 150, 150 − 50 = 100.' },
  { w: 17, m: 'toan', lv: 2, t: 'Biểu thức', q: '60 : (2 × 3) = ?', o: ['10', '90', '20', '6'], ex: 'Trong ngoặc làm trước: 2 × 3 = 6, rồi 60 : 6 = 10. Tính từ trái sang phải bỏ qua ngoặc sẽ ra 90 là sai.' },
  { w: 17, m: 'toan', lv: 2, t: 'Biểu thức', q: '9 × 4 + 64 = ?', o: ['100', '90', '110', '45'], ex: 'Nhân trước, cộng sau: 9 × 4 = 36, 36 + 64 = 100.' },
  { w: 17, m: 'toan', lv: 3, t: 'Biểu thức', q: 'Biểu thức nào có giá trị lớn nhất?', o: ['(8 + 2) × 5', '8 + 2 × 5', '8 × 2 + 5', '8 × 5 − 2'], ex: '(8 + 2) × 5 = 50, 8 + 2 × 5 = 18, 8 × 2 + 5 = 21, 8 × 5 − 2 = 38. Lớn nhất là 50.' },
  { w: 17, m: 'toan', lv: 1, t: 'So sánh gấp mấy lần', q: 'Bao gạo nặng 50 kg, túi đường nặng 5 kg. Bao gạo nặng gấp mấy lần túi đường?', o: ['10 lần', '45 lần', '5 lần', '55 lần'], ex: 'Lấy số lớn chia số bé: 50 : 5 = 10 lần.' },
  { w: 17, m: 'toan', lv: 2, t: 'So sánh gấp mấy lần', q: 'Số xe đạp gấp mấy lần số ô tô trong hình?', fig: { type: 'tokens', rows: [['🚲', '🚲', '🚲', '🚲', '🚲', '🚲'], ['🚗', '🚗']] }, o: ['3', '4', '8', '12'], ex: 'Có 6 xe đạp, 2 ô tô: 6 : 2 = 3 lần. 4 là số xe đạp nhiều hơn số ô tô.' },
  { w: 17, m: 'toan', lv: 2, t: 'So sánh gấp mấy lần', q: 'Từ nhà Lan đến trường dài 400 m, đến chợ dài 100 m. Đường đến trường dài gấp mấy lần đường đến chợ?', o: ['4 lần', '300 lần', '3 lần', '5 lần'], ex: '400 : 100 = 4 lần.' },

  // Tuần 18
  { w: 18, m: 'toan', lv: 2, t: 'Số đến 1 000', q: 'Số tròn trăm lớn nhất bé hơn 850 là:', o: ['800', '900', '850', '700'], ex: 'Các số tròn trăm bé hơn 850 là 100, 200, …, 800. Lớn nhất là 800.' },
  { w: 18, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 3, m: 40 }, o: ['3 giờ 40 phút', '4 giờ 40 phút', '8 giờ 15 phút', '3 giờ 8 phút'], ex: 'Kim ngắn giữa 3 và 4 (chưa tới 4), kim dài chỉ số 8 là 40 phút: 3 giờ 40 phút.' },
  { w: 18, m: 'toan', lv: 1, t: 'Khối lượng', q: 'Đơn vị nào thích hợp điền vào chỗ trống: Quả dưa hấu nặng 2 ...', o: ['kg', 'g', 'l', 'm'], ex: 'Quả dưa hấu nặng khoảng 2 kg. 2 g nhẹ như một chiếc kẹp giấy. l đo nước, m đo độ dài.' },
  { w: 18, m: 'toan', lv: 3, t: 'Bài toán hai bước', q: 'Cửa hàng có 5 thùng nước, mỗi thùng 24 chai. Đã bán 38 chai. Cửa hàng còn lại bao nhiêu chai nước?', o: ['82', '92', '120', '158'], ex: 'Có 24 × 5 = 120 chai. Còn lại 120 − 38 = 82 chai nước.' },
  { w: 18, m: 'toan', lv: 2, t: 'Chia có dư', q: '58 : 9 = ?', o: ['6 (dư 4)', '6 (dư 3)', '5 (dư 13)', '7 (dư 5)'], ex: '9 × 6 = 54, 58 − 54 = 4. Số dư 4 bé hơn số chia 9.' },
  { w: 18, m: 'toan', lv: 3, t: 'Gấp một số lần', q: 'Gấp 4 lên 8 lần rồi giảm đi 2 lần thì được số nào?', o: ['16', '32', '10', '6'], ex: 'Gấp 4 lên 8 lần: 4 × 8 = 32. Giảm đi 2 lần: 32 : 2 = 16.' },
  { w: 18, m: 'toan', lv: 2, t: 'Góc vuông', q: 'Lúc 9 giờ đúng, kim giờ và kim phút tạo thành:', o: ['góc vuông', 'góc không vuông', 'một đường thẳng', 'hai kim trùng nhau'], ex: 'Lúc 9 giờ kim phút chỉ số 12, kim giờ chỉ số 9, hai kim tạo thành góc vuông.' },
  { w: 18, m: 'toan', lv: 1, t: 'Một phần mấy', q: 'Đã tô màu một phần mấy băng giấy?', fig: { type: 'frac', shape: 'bar', n: 7, k: 1 }, o: ['1/7', '1/6', '1/8', '7/1'], ex: 'Băng giấy chia 7 phần bằng nhau, tô 1 phần: 1/7.' },

  // ════════════ Bổ sung 11/2026: Tiếng Việt ════════════
  // ── Tuần 1: Ngày gặp lại, Về thăm quê ──
  { w: 1, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài "Ngày gặp lại", mùa hè Sơn về quê làm những gì?', o: ['trồng rau, câu cá, thả diều', 'tập đi xe đạp với bố', 'học bơi ở bể bơi', 'đi tham quan thành phố'], ex: 'Ở quê, Sơn được theo ông bà trồng rau, câu cá và thả diều. Tập đi xe đạp là chuyện của Chi.' },
  { w: 1, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài "Ngày gặp lại", mùa hè Chi được bố dạy gì?', o: ['đi xe đạp', 'thả diều', 'câu cá', 'bơi lội'], ex: 'Chi ở lại thành phố và được bố dạy đi xe đạp.' },
  { w: 1, m: 'tv', lv: 1, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Điền c hay k vào chỗ trống: "…ể chuyện"?', o: ['k', 'c', 'q', 'kh'], ex: 'Viết k trước e, ê, i. Tiếng "kể" có âm ê nên viết k: kể chuyện.' },
  { w: 1, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Từ chỉ hoạt động nào có tiếng bắt đầu bằng k?', o: ['kể chuyện', 'cắt giấy', 'con kiến', 'cái kẻng'], ex: 'Kể chuyện là hoạt động, bắt đầu bằng k. Cắt giấy bắt đầu bằng c; con kiến, cái kẻng là sự vật.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào là từ chỉ người?', o: ['bác nông dân', 'con trâu', 'cánh đồng', 'cái liềm'], ex: 'Bác nông dân chỉ người. Con trâu chỉ con vật, cánh đồng chỉ nơi chốn, cái liềm chỉ đồ vật.' },
  { w: 1, m: 'tv', lv: 1, t: 'Mẫu câu', q: 'Câu giới thiệu trả lời cho câu hỏi nào?', o: ['Ai (cái gì) là gì?', 'Ai (cái gì) làm gì?', 'Ai (cái gì) thế nào?', 'Ở đâu?'], ex: 'Câu giới thiệu trả lời câu hỏi Ai (cái gì, con gì) là gì? Ví dụ: Con trâu là bạn của nhà nông.' },
  { w: 1, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu nào là câu nêu hoạt động?', o: ['Đàn vịt đang bơi dưới mương.', 'Con trâu là bạn của nhà nông.', 'Cánh đồng lúa vàng óng.', 'Ai đang gặt lúa ngoài đồng?'], ex: 'Câu nêu hoạt động cho biết ai, con gì làm gì: đàn vịt đang bơi.' },
  { w: 1, m: 'tv', lv: 1, t: 'Văn bản thông dụng', q: 'Dòng cuối cùng của một tin nhắn thường ghi gì?', o: ['tên người viết tin nhắn', 'lời gọi người nhận', 'địa chỉ nhà', 'giờ đi ngủ'], ex: 'Tin nhắn mở đầu bằng lời gọi người nhận, cuối cùng ghi tên người viết, ví dụ: Cháu Phương.' },
  { w: 1, m: 'tv', lv: 1, t: 'Câu đố chữ', q: 'Tiếng nào thêm dấu sắc thì thành tên một con vật sống dưới nước?', o: ['ca', 'co', 'ke', 'ki'], ex: 'Ca thêm dấu sắc thành cá. Co thành có, ke thành ké, ki thành kí, đều không phải con vật.' },

  // ── Tuần 2: Cánh rừng trong nắng, Lần đầu ra biển ──
  { w: 2, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Cánh rừng trong nắng", ông kể bầy vượn làm gì?', o: ['đánh đu trên cành cao', 'rủ nhau ra suối', 'nhảy qua các cành cây', 'nhìn người ngơ ngác'], ex: 'Bầy vượn tinh nghịch đánh đu trên cành cao. Hươu nai rủ nhau ra suối, sóc nâu nhảy qua cành cây.' },
  { w: 2, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài "Cánh rừng trong nắng", ông đưa cho mỗi bạn nhỏ vật gì để che nắng?', o: ['một tàu lá cọ', 'một chiếc nón lá', 'một chiếc ô', 'một cành cây'], ex: 'Ông đưa cho mỗi bạn nhỏ một tàu lá cọ để che nắng.' },
  { w: 2, m: 'tv', lv: 2, t: 'Kể chuyện', q: 'Trong chuyện "Sự tích loài hoa của mùa hạ", cây nào che nắng cho các loài hoa?', o: ['cây xương rồng', 'cây phượng', 'cây bàng', 'cây hoa sen'], ex: 'Mùa hè nắng gắt, các loài hoa héo rũ. Cây xương rồng đã che nắng cho các loài hoa.' },
  { w: 2, m: 'tv', lv: 1, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Tiếng nào điền vào chỗ trống để được từ đúng: "… thăm"?', o: ['ghé', 'gé', 'ghế', 'ngé'], ex: 'Trước e viết gh: ghé thăm. Ghế là đồ vật để ngồi.' },
  { w: 2, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào tả tiếng suối chảy trong rừng?', o: ['róc rách', 'líu lo', 'râm ran', 'ríu rít'], ex: 'Tiếng suối chảy róc rách. Líu lo, ríu rít tả tiếng chim, râm ran tả tiếng ve.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Trong câu "Nai con có bộ lông màu nâu nhạt, mịn màng.", từ nào chỉ đặc điểm?', o: ['mịn màng', 'nai con', 'bộ lông', 'có'], ex: 'Mịn màng cho biết bộ lông thế nào nên là từ chỉ đặc điểm. Nai con, bộ lông là sự vật.' },
  { w: 2, m: 'tv', lv: 1, t: 'Mẫu câu', q: 'Câu nêu đặc điểm trả lời cho câu hỏi nào?', o: ['Ai (cái gì) thế nào?', 'Ai (cái gì) là gì?', 'Ai (cái gì) làm gì?', 'Khi nào?'], ex: 'Câu nêu đặc điểm trả lời câu hỏi Ai (cái gì, con gì) thế nào? Ví dụ: Hoa mướp màu vàng rực rỡ.' },
  { w: 2, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài "Lần đầu ra biển", ai dẫn Thắng đi dọc bờ biển?', o: ['Hải', 'bố Thắng', 'mẹ Thắng', 'ông nội'], ex: 'Bạn Hải dẫn Thắng đi dọc bờ biển.' },
  { w: 2, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Khi kể lại một hoạt động, phần nào kể việc đầu tiên, việc tiếp theo, việc cuối cùng?', o: ['Diễn biến', 'Giới thiệu', 'Cảm nghĩ', 'Lời chào'], ex: 'Bài kể có ba phần: Giới thiệu, Diễn biến (các việc theo thứ tự), Cảm nghĩ.' },
  { w: 2, m: 'tv', lv: 1, t: 'Câu đố chữ', q: 'Tiếng "gà" bỏ dấu huyền thành tiếng chỉ nơi tàu dừng đón khách. Đó là tiếng nào?', o: ['ga', 'gá', 'gả', 'gạ'], ex: 'Bỏ dấu huyền ở "gà" ta được "ga": tàu vào ga đón khách.' },

  // ── Tuần 3: Nhật kí tập bơi, Tập nấu ăn ──
  { w: 3, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Nhật kí tập bơi", đầu tiên cô dạy bạn nhỏ tập gì?', o: ['tập thở', 'tập bơi ếch', 'tập lặn sâu', 'tập nhảy cầu'], ex: 'Đầu tiên, cô dạy bạn nhỏ tập thở.' },
  { w: 3, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Cuối buổi tập bơi đầu tiên, bạn nhỏ cảm thấy thế nào?', o: ['hơi buồn', 'rất phấn khích', 'tức giận', 'buồn ngủ'], ex: 'Cuối buổi, bạn nhỏ chưa thở dưới nước được nên thấy hơi buồn. Phấn khích là lúc mới được đi tập.' },
  { w: 3, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Nhật kí tập bơi", bạn nhỏ đạp chân và quạt tay như con gì?', o: ['con ếch', 'con cá', 'con vịt', 'con rùa'], ex: 'Mình đạp chân và quạt tay như con ếch: đó là kiểu bơi ếch.' },
  { w: 3, m: 'tv', lv: 1, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Điền ng hay ngh vào chỗ trống: "đàn …é con"?', o: ['ngh', 'ng', 'g', 'gh'], ex: 'Viết ngh trước e, ê, i: đàn nghé con.' },
  { w: 3, m: 'tv', lv: 2, t: 'Quy tắc c/k, g/gh, ng/ngh', q: 'Từ nào viết sai chính tả?', o: ['nghơ ngác', 'nghe nhạc', 'ngước nhìn', 'suy nghĩ'], ex: 'Trước ơ phải viết ng: ngơ ngác. Chỉ viết ngh trước e, ê, i.' },
  { w: 3, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['kho', 'đi', 'vào', 'ra'], ex: 'Đi, vào, ra là hoạt động di chuyển. Kho là hoạt động nấu ăn.' },
  { w: 3, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Cụm từ nào nói đúng một việc làm với thịt khi nấu ăn?', o: ['thái thịt', 'nhặt thịt', 'gọt thịt', 'vo thịt'], ex: 'Ta thái thịt, băm thịt. Nhặt dùng cho rau, gọt cho khoai, vo cho gạo.' },
  { w: 3, m: 'tv', lv: 1, t: 'Văn bản thông dụng', q: 'Khi viết các bước làm một món ăn, bước sau cùng thường mở đầu bằng từ nào?', o: ['Cuối cùng', 'Đầu tiên', 'Sau đó', 'Tiếp theo'], ex: 'Các bước nối nhau bằng: Đầu tiên, Sau đó (Tiếp theo), Cuối cùng.' },
  { w: 3, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu "Nam vào bếp giúp mẹ." trả lời cho câu hỏi nào?', o: ['Ai làm gì?', 'Ai là gì?', 'Ai thế nào?', 'Vì sao?'], ex: 'Câu cho biết Nam làm gì (vào bếp giúp mẹ) nên là câu nêu hoạt động, trả lời câu hỏi Ai làm gì?' },

  // ── Tuần 4: Mùa hè lấp lánh, Tạm biệt mùa hè ──
  { w: 4, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Theo bài "Mùa hè lấp lánh", vì sao ngày hè rất dài?', o: ['mặt trời dậy sớm mà mãi chưa lặn', 'trời mưa suốt cả ngày', 'bạn nhỏ được nghỉ học', 'mặt trăng lên rất sớm'], ex: 'Mùa hè, mặt trời dậy sớm mà mải rong chơi, mãi chưa lặn nên ngày hè rất dài.' },
  { w: 4, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Theo bài "Mùa hè lấp lánh", mùa hè có những gì?', o: ['nắng, kem, những cơn gió êm', 'mưa phùn và gió bấc', 'tuyết trắng và băng giá', 'lá vàng rơi đầy sân'], ex: 'Mùa hè có nắng lại có kem, có những cơn gió êm và ngày dài lấp lánh.' },
  { w: 4, m: 'tv', lv: 1, t: 'Kể chuyện', q: 'Trong chuyện "Chó đốm con và mặt trời", chó đốm con nghĩ mặt trời có mấy ngôi nhà?', o: ['hai', 'một', 'ba', 'bốn'], ex: 'Thấy mặt trời mọc sau dãy núi, lặn ở cuối dòng sông, chó đốm con nghĩ mặt trời có hai nhà.' },
  { w: 4, m: 'tv', lv: 1, t: 'Chính tả ch/tr', q: 'Điền ch hay tr vào chỗ trống: "…ung thành"?', o: ['tr', 'ch', 'gi', 's'], ex: 'Viết là trung thành, giống trung thực, trung tâm. Chung dùng trong chung cư, chung thuỷ.' },
  { w: 4, m: 'tv', lv: 1, t: 'Chính tả ch/tr', q: 'Từ nào viết đúng chính tả?', o: ['trốn tìm', 'chốn tìm', 'trốn tìn', 'chốn tìn'], ex: 'Viết đúng là trốn tìm: tr trong "trốn", vần im trong "tìm".' },
  { w: 4, m: 'tv', lv: 1, t: 'Chính tả d/gi/r/v', q: 'Điền v hay d vào chỗ trống: "quả …ưa hấu"?', o: ['d', 'v', 'gi', 'r'], ex: 'Viết là quả dưa hấu. Chú ý: vừa chạy vừa kêu thì viết v.' },
  { w: 4, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào chỉ trang phục mặc vào mùa hè?', o: ['áo phông', 'áo bông', 'áo len', 'găng tay len'], ex: 'Mùa hè nóng nực nên mặc áo phông, quần soóc. Áo bông, áo len, găng tay len mặc vào mùa đông.' },
  { w: 4, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Dấu chấm thường đặt ở đâu?', o: ['cuối câu kể', 'trước phần liệt kê', 'giữa các từ cùng loại', 'cuối câu hỏi'], ex: 'Cuối câu kể dùng dấu chấm. Trước phần liệt kê dùng dấu hai chấm, giữa các từ cùng loại dùng dấu phẩy.' },
  { w: 4, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào nói về tình cảm tốt đẹp giữa bạn bè?', o: ['thân thiết', 'ganh tị', 'xa lạ', 'lạnh nhạt'], ex: 'Bạn bè yêu quý nhau thì thân thiết, gắn bó. Ganh tị, xa lạ, lạnh nhạt là điều chưa tốt.' },

  // ── Tuần 5: Đi học vui sao, Con đường đến trường ──
  { w: 5, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài thơ "Đi học vui sao", trang sách mới thế nào?', o: ['thơm tho', 'cũ kĩ', 'nhàu nát', 'dày cộp'], ex: 'Lật từng trang sách mới, chao ôi là thơm tho!' },
  { w: 5, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Theo bài "Con đường đến trường", vào mùa mưa con đường thế nào?', o: ['lầy lội và trơn trượt', 'khô ráo, bằng phẳng', 'đầy hoa phượng đỏ', 'rộng thênh thang'], ex: 'Mùa mưa, con đường lầy lội và trơn trượt.' },
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả s/x', q: 'Điền s hay x vào chỗ trống: "dòng …uối"?', o: ['s', 'x', 'ch', 'tr'], ex: 'Viết là dòng suối, giống con sóc, hòn sỏi.' },
  { w: 5, m: 'tv', lv: 2, t: 'Dấu hỏi, dấu ngã', q: 'Theo mẹo từ láy, tiếng còn thiếu dấu trong từ "mạnh me" cần dấu gì?', o: ['dấu ngã', 'dấu hỏi', 'dấu sắc', 'dấu huyền'], ex: 'Tiếng "mạnh" mang dấu nặng nên tiếng kia mang dấu ngã: mạnh mẽ.' },
  { w: 5, m: 'tv', lv: 1, t: 'Dấu hỏi, dấu ngã', q: 'Tiếng nào điền đúng: "cây cầu …" (cầu làm bằng gỗ)?', o: ['gỗ', 'gổ', 'gố', 'gồ'], ex: 'Gỗ viết dấu ngã: cầu gỗ.' },
  { w: 5, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào tả âm thanh của mưa rơi trên mái nhà?', o: ['tí tách', 'xanh ngắt', 'lầy lội', 'mấp mô'], ex: 'Mưa rơi tí tách trên mái nhà. Tí tách là từ chỉ đặc điểm về âm thanh.' },
  { w: 5, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ hương vị?', o: ['ngọt lịm', 'đỏ rực', 'mấp mô', 'rì rào'], ex: 'Ngọt lịm chỉ hương vị. Đỏ rực chỉ màu sắc, mấp mô chỉ hình dáng, rì rào chỉ âm thanh.' },
  { w: 5, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu nào nêu đặc điểm của bầu trời?', o: ['Bầu trời mùa thu xanh ngắt.', 'Em ngắm bầu trời mùa thu.', 'Bầu trời là mái nhà chung.', 'Ai vẽ bầu trời xanh thế?'], ex: 'Câu "Bầu trời mùa thu xanh ngắt." cho biết bầu trời thế nào nên là câu nêu đặc điểm.' },
  { w: 5, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Đoạn văn nêu tình cảm về một người thường mở đầu bằng ý nào?', o: ['giới thiệu người em yêu quý', 'kể tên các đồ chơi', 'tả thời tiết hôm đó', 'nêu lời chúc cuối thư'], ex: 'Đoạn văn có 3 ý: giới thiệu người em yêu quý, điều em ấn tượng về người đó, cảm xúc của em.' },

  // ── Tuần 6: Lời giải toán đặc biệt, Bài tập làm văn ──
  { w: 6, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài "Lời giải toán đặc biệt", Huy-gô viết lời giải bài toán bằng gì?', o: ['bằng thơ', 'bằng hình vẽ', 'bằng tiếng nước ngoài', 'bằng bút màu đỏ'], ex: 'Lời giải bài toán của Huy-gô được viết bằng thơ, thầy giáo đọc mà reo lên.' },
  { w: 6, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Lớn lên, Vích-to Huy-gô trở thành ai?', o: ['nhà văn, nhà thơ nổi tiếng', 'nhà toán học nổi tiếng', 'thầy giáo dạy toán', 'nhạc sĩ nổi tiếng'], ex: 'Sau này, Huy-gô trở thành nhà văn, nhà thơ nổi tiếng của nước Pháp.' },
  { w: 6, m: 'tv', lv: 3, t: 'Đọc hiểu', q: 'Trong "Bài tập làm văn", vì sao Cô-li-a vui vẻ đi giặt quần áo khi mẹ bảo?', o: ['vì đã viết việc đó vào bài văn', 'vì bạn rất thích giặt quần áo', 'vì cô giáo bắt phải làm', 'vì bạn muốn được thưởng'], ex: 'Cô-li-a đã viết trong bài văn là mình giặt quần áo, nên bạn muốn làm đúng điều mình đã viết.' },
  { w: 6, m: 'tv', lv: 1, t: 'Chính tả d/gi/r/v', q: 'Từ nào viết đúng chính tả?', o: ['dịu dàng', 'rịu dàng', 'dịu ràng', 'giịu dàng'], ex: 'Viết đúng là dịu dàng, cả hai tiếng đều bắt đầu bằng d.' },
  { w: 6, m: 'tv', lv: 2, t: 'Chính tả d/gi/r/v', q: 'Từ tả âm thanh nào viết đúng chính tả?', o: ['rì rào', 'dì dào', 'gì gào', 'rì dào'], ex: 'Mẹo: từ tả âm thanh hay viết r, như rì rào, róc rách.' },
  { w: 6, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền an hay ang vào chỗ trống: "cái đ…" (một loại nhạc cụ)?', o: ['an', 'ang', 'ăn', 'âng'], ex: 'Cái đàn là nhạc cụ, vần an kết thúc bằng n.' },
  { w: 6, m: 'tv', lv: 2, t: 'Viết hoa', q: 'Tên nhà văn người Pháp nào viết đúng?', o: ['Vích-to Huy-gô', 'Vích-to Huy gô', 'Vích to Huy-gô', 'Víchto Huygô'], ex: 'Viết hoa chữ cái đầu mỗi bộ phận, giữa các tiếng trong một bộ phận có gạch nối: Vích-to Huy-gô.' },
  { w: 6, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào chỉ một địa điểm trong trường học?', o: ['thư viện', 'viên phấn', 'phát biểu', 'học sinh'], ex: 'Thư viện là địa điểm. Viên phấn là đồ vật, phát biểu là hoạt động, học sinh là người.' },
  { w: 6, m: 'tv', lv: 1, t: 'Từ để hỏi', q: 'Từ nào là từ để hỏi?', o: ['bao giờ', 'đã', 'đang', 'sẽ'], ex: 'Bao giờ dùng để hỏi thời gian. Đã, đang, sẽ chỉ thời gian của việc làm.' },

  // ── Tuần 7: Bàn tay cô giáo, Cuộc họp của chữ viết ──
  { w: 7, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài thơ "Bàn tay cô giáo", cô gấp tờ giấy trắng thành gì?', o: ['chiếc thuyền', 'mặt trời', 'mặt nước', 'con chim'], ex: 'Một tờ giấy trắng, cô gấp cong cong thành chiếc thuyền xinh.' },
  { w: 7, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài thơ "Bàn tay cô giáo", từ tờ giấy đỏ cô làm ra gì?', o: ['mặt trời toả nắng', 'chiếc thuyền', 'mặt nước dập dềnh', 'đám mây trắng'], ex: 'Giấy trắng thành chiếc thuyền, giấy đỏ thành mặt trời toả nắng, giấy xanh thành mặt nước dập dềnh.' },
  { w: 7, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong "Cuộc họp của chữ viết", các chữ cái và dấu câu họp để làm gì?', o: ['giúp bạn Hoàng chấm câu đúng', 'chuẩn bị đón năm học mới', 'chọn chữ cái đẹp nhất', 'tập hát cho buổi lễ'], ex: 'Bạn Hoàng đặt dấu chấm sai chỗ làm câu văn buồn cười, nên cả cuộc họp bàn cách giúp Hoàng.' },
  { w: 7, m: 'tv', lv: 2, t: 'Chính tả l/n', q: 'Theo mẹo "trước vần oa viết l", từ nào viết đúng?', o: ['cái loa', 'cái noa', 'cái nhoa', 'cái loà'], ex: 'Trước vần oa, oe, uâ, uy viết l: cái loa, loè, luật.' },
  { w: 7, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Cụm từ nào viết đúng chính tả?', o: ['sóng lăn tăn', 'sóng lăng tăng', 'sóng lăn tăng', 'sóng lăng tăn'], ex: 'Viết đúng là lăn tăn, cả hai tiếng đều có vần ăn.' },
  { w: 7, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Cuối câu "Tên của cậu đẹp quá" cần đặt dấu gì?', o: ['dấu chấm than', 'dấu chấm', 'dấu chấm hỏi', 'dấu hai chấm'], ex: 'Câu bộc lộ cảm xúc khen ngợi (có từ "quá") nên cuối câu đặt dấu chấm than.' },
  { w: 7, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu "Tớ là bút nâu." thuộc kiểu câu kể nào?', o: ['câu giới thiệu', 'câu nêu hoạt động', 'câu nêu đặc điểm', 'câu cảm'], ex: 'Câu trả lời câu hỏi Ai là gì? nên là câu giới thiệu, một kiểu câu kể.' },
  { w: 7, m: 'tv', lv: 1, t: 'Viết hoa', q: 'Sau dấu chấm, chữ cái đầu của câu tiếp theo phải viết thế nào?', o: ['viết hoa', 'viết thường', 'viết nghiêng', 'viết gạch chân'], ex: 'Hết câu đặt dấu chấm, chữ đầu câu sau phải viết hoa.' },
  { w: 7, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Câu tục ngữ nào nói về vai trò của thầy cô?', o: ['Không thầy đố mày làm nên.', 'Chị ngã em nâng.', 'Lá lành đùm lá rách.', 'Có công mài sắt, có ngày nên kim.'], ex: 'Không thầy đố mày làm nên: nhờ thầy cô dạy dỗ, ta mới học giỏi, thành người có ích.' },

  // ── Tuần 8: Thư viện, Ngày em vào Đội ──
  { w: 8, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Thư viện", lúc đông học sinh, thư viện trông như gì?', o: ['toa tàu điện đông đúc', 'một khu vườn rộng', 'một con thuyền nhỏ', 'một ngôi nhà sàn'], ex: 'Thư viện trông như toa tàu điện đông đúc: một nửa học sinh ngồi đọc, số còn lại đứng đọc.' },
  { w: 8, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Thư viện", thầy hiệu trưởng dặn học sinh được làm gì?', o: ['mượn sách về đọc rồi trả lại', 'chỉ được đọc một quyển', 'giữ luôn sách mượn về', 'mỗi tuần vào một lần'], ex: 'Các em được đọc bất kì quyển sách nào, mượn sách về đọc và trả lại, mang sách cho bạn cùng đọc.' },
  { w: 8, m: 'tv', lv: 1, t: 'Chính tả ch/tr', q: 'Từ nào viết đúng chính tả?', o: ['chân thành', 'trân thành', 'chân thàng', 'trân thàng'], ex: 'Viết là chân thành, giống chân dung, chân lí. Trân dùng trong trân trọng.' },
  { w: 8, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền ân hay âng vào chỗ trống: "hiến d…"?', o: ['âng', 'ân', 'ăng', 'ăn'], ex: 'Viết là hiến dâng, dâng trào (vần âng). Dân dùng trong dân làng, dân tộc.' },
  { w: 8, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Người trông coi, cho mượn sách ở thư viện gọi là gì?', o: ['thủ thư', 'thủ quỹ', 'thủ môn', 'thủ công'], ex: 'Thủ thư làm việc ở thư viện. Thủ quỹ giữ tiền, thủ môn giữ khung thành.' },
  { w: 8, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Thêm từ nào vào cuối câu "Quyển từ điển này hữu ích" để thành câu cảm?', o: ['quá', 'không', 'chưa', 'à'], ex: 'Quyển từ điển này hữu ích quá! là câu cảm. Thêm không, chưa, à sẽ thành câu hỏi.' },
  { w: 8, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Bản thông báo có ba phần theo thứ tự nào?', o: ['tiêu đề, nội dung, người viết', 'nội dung, tiêu đề, người viết', 'người viết, tiêu đề, nội dung', 'tiêu đề, người viết, nội dung'], ex: 'Thông báo mở đầu bằng tiêu đề, tiếp theo là nội dung, cuối cùng là người viết.' },
  { w: 8, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài thơ "Ngày em vào Đội", màu khăn tuổi thiếu niên thế nào?', o: ['suốt đời tươi thắm mãi', 'bạc màu theo năm tháng', 'xanh như màu lá', 'trắng như mây'], ex: 'Màu khăn tuổi thiếu niên suốt đời tươi thắm mãi.' },

  // ── Tuần 9: Ôn tập giữa học kì I ──
  { w: 9, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong trò chơi lớp học, bé đội nón của má rồi bắt chước dáng đi khoan thai của ai?', o: ['cô giáo', 'mẹ', 'bà', 'chị gái'], ex: 'Bé kẹp tóc, thả ống quần, đội nón của má, bắt chước dáng đi khoan thai của cô giáo.' },
  { w: 9, m: 'tv', lv: 3, t: 'Từ có nghĩa giống nhau', q: 'Từ nào có nghĩa giống từ "khoan thai"?', o: ['thong thả', 'vội vàng', 'hấp tấp', 'lật đật'], ex: 'Khoan thai là thong thả, nhẹ nhàng. Vội vàng, hấp tấp, lật đật có nghĩa ngược lại.' },
  { w: 9, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ màu sắc trong câu "Trời mây bát ngát, xanh ngắt mùa thu."?', o: ['xanh ngắt', 'bát ngát', 'mùa thu', 'trời mây'], ex: 'Xanh ngắt chỉ màu sắc. Bát ngát chỉ đặc điểm rộng lớn, mùa thu và trời mây là sự vật.' },
  { w: 9, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bức tranh của bạn nhỏ, cây gạo đầu xóm được tô màu gì?', o: ['đỏ thắm', 'xanh ngắt', 'vàng óng', 'tím biếc'], ex: 'Em tô đỏ thắm cây gạo đầu xóm.' },
  { w: 9, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['chăm chỉ', 'bút chì', 'thước kẻ', 'cục tẩy'], ex: 'Bút chì, thước kẻ, cục tẩy là từ chỉ sự vật (đồ dùng học tập). Chăm chỉ là từ chỉ đặc điểm.' },
  { w: 9, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu "Các anh thật chậm quá!" dùng để làm gì?', o: ['bộc lộ cảm xúc', 'hỏi điều chưa biết', 'giới thiệu một người', 'kể lại sự việc'], ex: 'Câu có "thật", "quá" và dấu chấm than, bộc lộ cảm xúc nên là câu cảm.' },
  { w: 9, m: 'tv', lv: 2, t: 'Từ để hỏi', q: 'Câu hỏi nào hỏi về thời gian?', o: ['Bao giờ lớp mình đi tham quan?', 'Lớp mình đi tham quan ở đâu?', 'Ai dẫn lớp đi tham quan?', 'Vì sao lớp đi tham quan?'], ex: 'Từ "bao giờ" dùng để hỏi thời gian. Ở đâu hỏi nơi chốn, ai hỏi người, vì sao hỏi lí do.' },
  { w: 9, m: 'tv', lv: 2, t: 'Mẫu câu', q: 'Câu "Ngói mới đỏ tươi." trả lời cho câu hỏi nào?', o: ['Cái gì thế nào?', 'Cái gì là gì?', 'Cái gì làm gì?', 'Ở đâu?'], ex: 'Đỏ tươi cho biết ngói thế nào nên câu trả lời câu hỏi Cái gì thế nào?' },
  { w: 9, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Trong câu "Các bạn lớp 3A đang thảo luận sôi nổi.", từ chỉ đặc điểm là:', o: ['sôi nổi', 'thảo luận', 'các bạn', 'lớp 3A'], ex: 'Sôi nổi cho biết cuộc thảo luận thế nào. Thảo luận là hoạt động.' },

  // ── Tuần 10: Ngưỡng cửa, Món quà đặc biệt ──
  { w: 10, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Theo bài thơ "Ngưỡng cửa", hồi bé, bạn nhỏ tập làm gì ở ngưỡng cửa?', o: ['tập đi men', 'tập đọc sách', 'tập viết chữ', 'tập đạp xe'], ex: 'Khi tay bà, tay mẹ còn dắt vòng đi men: bạn nhỏ tập đi bên ngưỡng cửa.' },
  { w: 10, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Ngưỡng cửa là gì?', o: ['thanh dưới của khung cửa ra vào', 'cánh cửa sổ nhỏ', 'bậc thềm trước sân', 'chiếc then cài cửa'], ex: 'Ngưỡng cửa là thanh dưới của khung cửa ra vào.' },
  { w: 10, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Tên loài chim hót hay nào viết đúng?', o: ['chim khướu', 'chim khiếu', 'chim khứu', 'chim khưu'], ex: 'Chim khướu có vần ươu, giống con hươu, ốc bươu.' },
  { w: 10, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Điền iêu hay ươu vào chỗ trống: "đà đ…"?', o: ['iêu', 'ươu', 'iu', 'ưu'], ex: 'Đà điểu có vần iêu, giống thả diều, buổi chiều.' },
  { w: 10, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Từ nào viết đúng chính tả?', o: ['giấy khen', 'giấy kheng', 'dấy khen', 'giấy khèn'], ex: 'Viết đúng là giấy khen, vần en.' },
  { w: 10, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài "Món quà đặc biệt", hai chị em làm gì để tặng bố?', o: ['một tấm thiệp', 'một chiếc bánh', 'một bức tượng', 'một bó hoa'], ex: 'Hai chị em hì hụi làm tấm thiệp tặng bố, bố đọc rồi cười giòn giã.' },
  { w: 10, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ tính tình của người mẹ?', o: ['dịu dàng', 'tóc dài', 'đi chợ', 'chiếc áo'], ex: 'Dịu dàng, đảm đang, tần tảo là từ chỉ tính tình. Đi chợ là hoạt động, chiếc áo là sự vật.' },
  { w: 10, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Cuối câu khiến thường đặt dấu câu nào?', o: ['dấu chấm than', 'dấu chấm hỏi', 'dấu phẩy', 'dấu hai chấm'], ex: 'Câu khiến dùng để yêu cầu, đề nghị, cuối câu thường có dấu chấm than.' },
  { w: 10, m: 'tv', lv: 1, t: 'Viết hoa', q: 'Từ ngữ nào là tên riêng nên phải viết hoa?', o: ['Hà Giang', 'cao nguyên', 'ngọn núi', 'dòng sông'], ex: 'Hà Giang là tên riêng của một tỉnh nên viết hoa chữ cái đầu mỗi tiếng. Các từ còn lại là tên chung.' },

  // ── Tuần 11: Khi cả nhà bé tí, Trò chuyện cùng mẹ ──
  { w: 11, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài thơ "Khi cả nhà bé tí", bạn nhỏ hỏi ông có chau mặt làm gì?', o: ['chơi cờ', 'chơi bi', 'thả diều', 'đánh đàn'], ex: 'Ông có chau mặt chơi cờ, có uống trà buổi sáng?' },
  { w: 11, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài thơ "Khi cả nhà bé tí", bạn nhỏ hỏi bố có say mê làm gì?', o: ['sửa đồ', 'nấu ăn', 'trồng cây', 'cắm hoa'], ex: 'Bố có say mê sửa đồ, có hay xem bóng đá? Cắm hoa là việc mẹ thích.' },
  { w: 11, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Tên cây nào viết đúng chính tả?', o: ['cây lựu', 'cây lịu', 'cây lụu', 'cây lượu'], ex: 'Cây lựu có vần ưu. Trong vườn, cây lựu sai trĩu quả.' },
  { w: 11, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền iên hay iêng vào chỗ trống: "lười b…"?', o: ['iêng', 'iên', 'inh', 'ing'], ex: 'Viết là lười biếng (vần iêng). Còn "biến" gỗ vụn thành đồ chơi thì vần iên.' },
  { w: 11, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Vợ của cậu, em gọi là gì?', o: ['mợ', 'thím', 'dì', 'cô'], ex: 'Cậu là anh em trai của mẹ, vợ của cậu là mợ. Thím là vợ của chú.' },
  { w: 11, m: 'tv', lv: 3, t: 'Dấu câu', q: 'Câu nào dùng dấu hai chấm để báo hiệu lời nói của nhân vật?', o: ['Mẹ bảo: "Con ngủ sớm đi!"', 'Vườn có nhiều cây: cam, bưởi.', 'Em rất vui: mẹ đã về.', 'Bé mua đồ: bút, thước.'], ex: 'Sau dấu hai chấm là lời mẹ nói, đặt trong ngoặc kép. Các câu còn lại báo hiệu liệt kê hoặc giải thích.' },
  { w: 11, m: 'tv', lv: 1, t: 'Văn bản thông dụng', q: 'Khi viết đoạn văn tả ngôi nhà, cuối đoạn em nên nêu gì?', o: ['tình cảm của em với ngôi nhà', 'số người trong xóm', 'giá tiền ngôi nhà', 'tên các con đường'], ex: 'Đoạn văn tả ngôi nhà kết thúc bằng tình cảm, cảm xúc của em với ngôi nhà.' },
  { w: 11, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ "Con hiền cháu thảo" khen ai?', o: ['con cháu ngoan, hiếu thảo', 'ông bà sống lâu', 'cha mẹ chăm làm', 'bạn bè thân thiết'], ex: 'Con hiền cháu thảo khen con cháu ngoan ngoãn, biết yêu thương, kính trọng ông bà, cha mẹ.' },

  // ── Tuần 12: Tia nắng bé nhỏ, Để cháu nắm tay ông ──
  { w: 12, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong "Tia nắng bé nhỏ", Na mang nắng về cho bà bằng cách nào?', o: ['bắt nắng trên vạt áo', 'đựng nắng trong lọ', 'mở toang cửa sổ', 'vẽ tranh mặt trời'], ex: 'Na bắt nắng trên vạt áo rồi chạy vào phòng, xổ vạt áo ra để mang nắng cho bà.' },
  { w: 12, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong "Tia nắng bé nhỏ", bà nói nắng long lanh ở đâu?', o: ['trong ánh mắt cháu', 'trong vạt áo của Na', 'trên bậu cửa sổ', 'ngoài vườn cây'], ex: 'Bà nói: "Kìa, nắng long lanh trong ánh mắt cháu." Bà hiểu tình yêu thương của Na.' },
  { w: 12, m: 'tv', lv: 1, t: 'Chính tả s/x', q: 'Tên món ăn nào viết đúng chính tả?', o: ['xôi gấc', 'sôi gấc', 'xôi gất', 'sôi gất'], ex: 'Viết là xôi gấc. Chú ý: nước sôi thì viết s.' },
  { w: 12, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Từ nào viết đúng chính tả?', o: ['cuồn cuộn', 'cuồng cuộn', 'cuồn cuộng', 'cuồng cuộng'], ex: 'Bụi bay cuồn cuộn: cả hai tiếng đều có vần uôn.' },
  { w: 12, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Kho sách của ông bà", buổi tối bạn nhỏ làm gì?', o: ['say sưa nghe kho sách của bà', 'mải miết đọc sách với ông', 'đi ngủ thật sớm', 'xem phim hoạt hình'], ex: 'Ban ngày bạn nhỏ đọc sách với ông, buổi tối say sưa nghe bà kể chuyện, đó là kho sách của bà.' },
  { w: 12, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Trong câu "Ông vác cây tre dài.", từ chỉ đặc điểm là:', o: ['dài', 'vác', 'ông', 'cây tre'], ex: 'Dài cho biết cây tre thế nào. Vác là hoạt động, ông và cây tre là sự vật.' },
  { w: 12, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu "Tháp Bà Pô-na-ga ở đâu?" là kiểu câu nào?', o: ['câu hỏi', 'câu kể', 'câu cảm', 'câu khiến'], ex: 'Câu có từ để hỏi "ở đâu" và dấu chấm hỏi nên là câu hỏi.' },
  { w: 12, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Câu "Kính già, yêu trẻ" khuyên em điều gì?', o: ['kính trọng người già, thương trẻ nhỏ', 'chỉ chơi với bạn cùng tuổi', 'người già phải nghỉ ngơi', 'trẻ nhỏ phải tự lập'], ex: 'Kính già, yêu trẻ: kính trọng người già, yêu thương em nhỏ.' },
  { w: 12, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào nói về tình cảm với người thân?', o: ['trìu mến', 'giận dữ', 'sợ hãi', 'chán nản'], ex: 'Trìu mến là tình cảm yêu thương, gần gũi dành cho người thân.' },

  // ── Tuần 13: Tôi yêu em tôi, Bạn nhỏ trong nhà ──
  { w: 13, m: 'tv', lv: 1, t: 'So sánh', q: 'Trong bài thơ "Tôi yêu em tôi", em gái nói như gì?', o: ['như khướu hót', 'như chim sẻ', 'như suối chảy', 'như ve kêu'], ex: 'Miệng nó tươi hồng, nói như khướu hót: em gái nói nhiều và hay.' },
  { w: 13, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài thơ "Tôi yêu em tôi", vì sao em gái vẽ thỏ có đôi?', o: ['sợ thỏ một không có bạn chơi', 'vì em thích vẽ nhiều thỏ', 'vì cô giáo dặn vẽ hai con', 'vì một con thỏ trông xấu'], ex: 'Em gái vẽ thỏ có đôi vì sợ thỏ một mình không có bạn chơi. Em rất giàu tình thương.' },
  { w: 13, m: 'tv', lv: 1, t: 'So sánh', q: 'Từ ngữ nào dùng để so sánh?', o: ['giống như', 'cùng với', 'bởi vì', 'cho nên'], ex: 'Từ so sánh: như, là, như là, tựa, giống như…' },
  { w: 13, m: 'tv', lv: 1, t: 'So sánh', q: 'Trong câu "Mỗi cánh buồm nom cứ như là một con bướm nhỏ.", cánh buồm được so sánh với gì?', o: ['con bướm nhỏ', 'dòng sông', 'cánh chim', 'đám mây'], ex: 'Cánh buồm (sự vật 1) + như là (từ so sánh) + con bướm nhỏ (sự vật 2).' },
  { w: 13, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào chỉ vật nuôi trong nhà?', o: ['cá vàng', 'quạt điện', 'đồng hồ', 'cái giường'], ex: 'Cá vàng là vật nuôi. Quạt điện, đồng hồ, cái giường là đồ đạc trong nhà.' },
  { w: 13, m: 'tv', lv: 1, t: 'Chính tả d/gi/r/v', q: 'Điền r, d hay gi vào chỗ trống: "cà …ốt"?', o: ['r', 'd', 'gi', 'v'], ex: 'Viết là cà rốt, giống hàng rào, rổ rau.' },
  { w: 13, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Tiếng nào điền đúng: "hoa … dương"?', o: ['hướng', 'hướn', 'hứng', 'hường'], ex: 'Hoa hướng dương có vần ương, giống con đường, mướp hương.' },
  { w: 13, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Câu nào nói về tình anh em trong nhà?', o: ['Anh em như thể chân tay.', 'Ăn quả nhớ kẻ trồng cây.', 'Tốt gỗ hơn tốt nước sơn.', 'Có công mài sắt, có ngày nên kim.'], ex: 'Anh em như thể chân tay, rách lành đùm bọc, dở hay đỡ đần.' },
  { w: 13, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Câu "Chị ngã em nâng" khuyên điều gì?', o: ['anh chị em giúp đỡ nhau', 'em phải ngồi yên', 'chị phải đi cẩn thận', 'em nên chơi một mình'], ex: 'Khi người này gặp khó khăn, người kia giúp đỡ: anh chị em phải thương yêu, đỡ đần nhau.' },

  // ── Tuần 14: Những bậc đá chạm mây, Đi tìm mặt trời ──
  { w: 14, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Những bậc đá chạm mây", cố Đương ghép đá thành bậc thang lên núi để làm gì?', o: ['để bà con đi lại dễ dàng', 'để ngắm cảnh trên núi', 'để tìm vàng trong núi', 'để trồng cây trên núi'], ex: 'Sườn núi dựng đứng, bà con phải đi đường vòng rất xa, nên cố Đương ghép đá làm đường cho mọi người.' },
  { w: 14, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Khi cố Đương bàn ghép đá làm bậc thang, lúc đầu mọi người thế nào?', o: ['lắc đầu bảo việc ấy khó lắm', 'vui vẻ góp sức ngay', 'bỏ đi nơi khác sống', 'cười chê ông lười biếng'], ex: 'Ai nấy đều lắc đầu bảo việc ấy khó lắm, nhưng cố Đương vẫn kiên trì làm.' },
  { w: 14, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Việc làm của cố Đương cho thấy ông là người thế nào?', o: ['biết hi sinh vì mọi người', 'chỉ nghĩ cho bản thân', 'thích đi chơi xa', 'sợ khó, sợ khổ'], ex: 'Công việc rất nặng nhọc nhưng ông vẫn làm để bà con đi lại dễ dàng: ông sống vì mọi người.' },
  { w: 14, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Từ nào giúp em nhận ra câu "Bác công ơi, bác hãy đi tìm mặt trời giúp chúng tôi!" là câu khiến?', o: ['hãy', 'tìm', 'giúp', 'chúng tôi'], ex: 'Câu khiến thường có từ hãy, đừng, chớ, xin, đi, nào. Ở đây có từ "hãy".' },
  { w: 14, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "nóng"?', o: ['lạnh', 'ấm', 'nắng', 'oi'], ex: 'Nóng trái nghĩa với lạnh. Ấm, nắng, oi đều gần với nóng.' },
  { w: 14, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Điền từ trái nghĩa với "già" vào chỗ trống: "Đi hỏi già, về nhà hỏi …"', o: ['trẻ', 'mẹ', 'ông', 'cha'], ex: 'Già trái nghĩa với trẻ. Câu tục ngữ khuyên em biết hỏi người già lẫn người trẻ để học hỏi.' },
  { w: 14, m: 'tv', lv: 1, t: 'Chính tả ch/tr', q: 'Điền ch hay tr vào chỗ trống: "gà …ống gáy"?', o: ['tr', 'ch', 's', 'x'], ex: 'Viết là gà trống. Gà trống gọi đấy, mặt trời mau dậy.' },
  { w: 14, m: 'tv', lv: 1, t: 'Vần dễ lẫn', q: 'Tên con vật nào viết đúng chính tả?', o: ['thằn lằn', 'thằng lằn', 'thằn lằng', 'thằng lằng'], ex: 'Thằn lằn: cả hai tiếng đều có vần ăn, giống con rắn, con trăn.' },
  { w: 14, m: 'tv', lv: 1, t: 'Nói và nghe', q: 'Khi nêu lí do thích một nhân vật, em nên nói về điều gì?', o: ['tính nết, việc làm của nhân vật', 'giá tiền cuốn truyện', 'số trang của truyện', 'tên nhà in sách'], ex: 'Em nói tên nhân vật, điều em thích ở nhân vật (ngoại hình, tính nết, hành động, lời nói) và vì sao.' },

  // ── Tuần 15: Những chiếc áo ấm, Con đường của bé ──
  { w: 15, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Những chiếc áo ấm", bạn nào xe chỉ?', o: ['tằm', 'thỏ', 'ốc sên', 'bọ ngựa'], ex: 'Thỏ trải vải, ốc sên kẻ đường vạch, bọ ngựa cắt vải, tằm xe chỉ, nhím chắp vải.' },
  { w: 15, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Câu chuyện "Những chiếc áo ấm" muốn nói điều gì?', o: ['cùng góp sức thì làm được việc lớn', 'ai cũng nên làm một mình', 'chỉ thỏ mới may được áo', 'mùa đông chẳng cần áo ấm'], ex: 'Mỗi bạn góp một việc, cùng nhau may được áo ấm cho tất cả mọi người.' },
  { w: 15, m: 'tv', lv: 2, t: 'Dấu hỏi, dấu ngã', q: 'Điền "nở" hay "nỡ": "Hoa sen … đẹp trong đầm."', o: ['nở', 'nỡ', 'nớ', 'nọ'], ex: 'Nở (dấu hỏi): hoa nở. Nỡ (dấu ngã): đành lòng, như ai nỡ.' },
  { w: 15, m: 'tv', lv: 2, t: 'Dấu hỏi, dấu ngã', q: 'Câu nào viết đúng chính tả?', o: ['Mồ hôi đổ xuống đồng.', 'Mồ hôi đỗ xuống đồng.', 'Mồ hồi đổ xuống đồng.', 'Mồ hôi đổ xuống đông.'], ex: 'Đổ (dấu hỏi): mồ hôi đổ xuống. Đỗ (dấu ngã): hạt đỗ, trồng đỗ.' },
  { w: 15, m: 'tv', lv: 2, t: 'Chính tả l/n', q: 'Điền l hay n vào chỗ trống: "…uồn kim"?', o: ['l', 'n', 'nh', 'đ'], ex: 'Viết là luồn kim: luồn sợi chỉ qua lỗ kim.' },
  { w: 15, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Người bán thuốc, hướng dẫn cách dùng thuốc làm nghề gì?', o: ['dược sĩ', 'bác sĩ', 'kĩ sư', 'thợ may'], ex: 'Dược sĩ làm nghề dược. Bác sĩ khám, chữa bệnh.' },
  { w: 15, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Công việc chính của bác nông dân là gì?', o: ['trồng trọt, chăn nuôi', 'chữa bệnh cho người', 'dạy học ở trường', 'xây nhà cao tầng'], ex: 'Nghề nông: nông dân trồng trọt, chăn nuôi.' },
  { w: 15, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu nào là câu hỏi được chuyển từ câu kể "Nam đi học."?', o: ['Nam có đi học không?', 'Nam đi học đi!', 'Nam hãy đi học!', 'Nam đi học rồi.'], ex: 'Thêm "có … không" và đổi dấu chấm thành dấu chấm hỏi: Nam có đi học không?' },
  { w: 15, m: 'tv', lv: 1, t: 'Từ để hỏi', q: 'Từ để hỏi nào dùng để hỏi số lượng?', o: ['bao nhiêu', 'bao giờ', 'vì sao', 'ở đâu'], ex: 'Bao nhiêu hỏi số lượng. Bao giờ hỏi thời gian, vì sao hỏi lí do, ở đâu hỏi nơi chốn.' },

  // ── Tuần 16: Ngôi nhà trong cỏ, Những ngọn hải đăng ──
  { w: 16, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Ngôi nhà trong cỏ", ai đang xây nhà dưới lớp cỏ xanh?', o: ['dế than', 'cào cào', 'nhái bén', 'chuồn chuồn'], ex: 'Dưới lớp cỏ xanh rì, dế than đang xây nhà. Cào cào, nhái bén, chuồn chuồn xúm vào giúp.' },
  { w: 16, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Ngôi nhà trong cỏ", ngôi nhà của dế than làm bằng gì?', o: ['bằng đất', 'bằng gỗ', 'bằng lá', 'bằng đá'], ex: 'Ngôi nhà xinh xắn bằng đất được xây dưới ô nấm giữa vùng cỏ xanh tươi.' },
  { w: 16, m: 'tv', lv: 1, t: 'Từ có nghĩa giống nhau', q: 'Từ nào có nghĩa giống từ "láng giềng"?', o: ['hàng xóm', 'họ hàng', 'bạn học', 'khách lạ'], ex: 'Láng giềng là hàng xóm, những nhà ở gần nhau.' },
  { w: 16, m: 'tv', lv: 1, t: 'Chính tả s/x', q: 'Điền s hay x vào chỗ trống: "…ào rau"?', o: ['x', 's', 'd', 'r'], ex: 'Xào rau viết x. Cây sào (để chống thuyền) viết s.' },
  { w: 16, m: 'tv', lv: 2, t: 'Vần dễ lẫn', q: 'Điền ao hay au vào chỗ trống: "Hạt trước hạt s…"?', o: ['au', 'ao', 'âu', 'ây'], ex: 'Hạt trước hạt sau, không xô đẩy nhau: sau có vần au.' },
  { w: 16, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Theo bài "Những ngọn hải đăng", hải đăng giúp tàu thuyền việc gì?', o: ['định hướng giữa đại dương', 'đánh bắt thật nhiều cá', 'chở hàng vào đất liền', 'chạy nhanh hơn trên biển'], ex: 'Hải đăng giúp tàu thuyền định hướng giữa đại dương.' },
  { w: 16, m: 'tv', lv: 2, t: 'Từ để hỏi', q: 'Câu hỏi nào hỏi về hoạt động trong câu "Dã tràng cõng nắng."?', o: ['Dã tràng làm gì?', 'Con gì cõng nắng?', 'Dã tràng là gì?', 'Dã tràng thế nào?'], ex: 'Hỏi về hoạt động dùng "làm gì?": Dã tràng làm gì? Dã tràng cõng nắng.' },
  { w: 16, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Dòng đầu tiên của một bức thư thường ghi gì?', o: ['địa điểm, ngày tháng năm viết', 'lời chúc và chữ kí', 'họ tên người viết thư', 'lời hỏi thăm sức khoẻ'], ex: 'Dòng đầu thư ghi nơi viết và ngày tháng năm, ví dụ: Hà Nội, ngày 16 tháng 12 năm 2018.' },
  { w: 16, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Trong câu "Sóng lắc ông trời thức dậy.", từ chỉ sự vật là:', o: ['sóng', 'lắc', 'thức dậy', 'dậy'], ex: 'Sóng là sự vật. Lắc, thức dậy là hoạt động.' },

  // ── Tuần 17: Người làm đồ chơi, Cây bút thần ──
  { w: 17, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Người làm đồ chơi", bác Nhân nặn đồ chơi bằng gì?', o: ['bột màu', 'gỗ', 'giấy màu', 'nhựa'], ex: 'Bác Nhân nặn đồ chơi bằng bột màu: con rồng, con vịt, con gà.' },
  { w: 17, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Bạn nhỏ đã làm gì để buổi bán hàng cuối cùng của bác Nhân vui hơn?', o: ['đập lợn đất, nhờ bạn mua hàng', 'mời bác về nhà ăn cơm', 'tặng bác một bức tranh', 'xin bác dạy nặn đồ chơi'], ex: 'Đêm ấy, bạn nhỏ đập con lợn đất, rồi nhờ mấy bạn trong lớp mua đồ chơi của bác.' },
  { w: 17, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Trong "Người làm đồ chơi", bác Nhân nặn những con gà thế nào?', o: ['tinh nhanh, chăm chỉ', 'ngây thơ, chậm chạp', 'to lớn, dữ tợn', 'buồn bã, ủ rũ'], ex: 'Bác nặn những con vịt ngây thơ, chậm chạp, những con gà tinh nhanh, chăm chỉ.' },
  { w: 17, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong "Cây bút thần", ai đưa cho Mã Lương cây bút?', o: ['một cụ già tóc bạc phơ', 'phú ông tham lam', 'thầy giáo ở trường', 'một người lái buôn'], ex: 'Một cụ già tóc bạc phơ đưa cho Mã Lương cây bút sáng lấp lánh.' },
  { w: 17, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Phú ông trong "Cây bút thần" là người thế nào?', o: ['giàu có mà tham lam', 'nghèo khổ, hiền lành', 'chăm chỉ, tốt bụng', 'thông minh, dũng cảm'], ex: 'Phú ông đã giàu có lại còn tham lam.' },
  { w: 17, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Sự vật nào thường thấy ở thành thị?', o: ['nhà cao tầng', 'cổng làng', 'cây đa', 'cánh đồng'], ex: 'Thành thị có đường phố, nhà cao tầng, xe buýt. Cổng làng, cây đa, cánh đồng ở nông thôn.' },
  { w: 17, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Từ nào thường dùng để tả đường phố ở thành thị?', o: ['tấp nập', 'yên bình', 'thoáng đãng', 'mênh mông'], ex: 'Đường phố tấp nập, đông đúc. Yên bình, thoáng đãng, mênh mông thường tả nông thôn.' },
  { w: 17, m: 'tv', lv: 2, t: 'So sánh', q: 'Trong câu "Tiếng chim sáo ríu ran như một cái chợ vừa mở.", tiếng chim được so sánh với gì?', o: ['một cái chợ vừa mở', 'tiếng chim sáo', 'tiếng mưa rơi', 'tiếng trống trường'], ex: 'Âm thanh tiếng chim sáo được so sánh với âm thanh của một cái chợ vừa mở.' },
  { w: 17, m: 'tv', lv: 2, t: 'Văn bản thông dụng', q: 'Tem thư được dán ở đâu trên phong bì?', o: ['góc trên bên phải', 'góc dưới bên trái', 'chính giữa phong bì', 'mặt sau phong bì'], ex: 'Tem dán ở góc trên bên phải của phong bì.' },

  // ── Tuần 18: Ôn tập cuối học kì I ──
  { w: 18, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Cặp từ trái nghĩa trong câu "Trăng mờ còn tỏ hơn sao." là:', o: ['mờ, tỏ', 'trăng, sao', 'tỏ, hơn', 'còn, sao'], ex: 'Mờ (không rõ) trái nghĩa với tỏ (sáng rõ). Trăng, sao là sự vật.' },
  { w: 18, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "cạn"?', o: ['sâu', 'nông', 'cao', 'rộng'], ex: 'Xuống biển cầm sào cho biết cạn, sâu. Nông có nghĩa gần giống cạn.' },
  { w: 18, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Hai kiểu câu nào có thể kết thúc bằng dấu chấm than?', o: ['câu cảm và câu khiến', 'câu kể và câu hỏi', 'câu hỏi và câu cảm', 'câu kể và câu khiến'], ex: 'Câu cảm (Thật là oách!) và câu khiến (Hãy bảo vệ sách!) đều có thể kết thúc bằng dấu chấm than.' },
  { w: 18, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào hợp để tả độ cao của ngọn tháp?', o: ['cao vút', 'róc rách', 'im ắng', 'ăm ắp'], ex: 'Ngọn tháp cao vút. Róc rách tả tiếng suối, im ắng tả sự yên lặng, ăm ắp tả độ đầy.' },
  { w: 18, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Từ "đầy ăm ắp" có nghĩa là gì?', o: ['đầy đến mức như sắp tràn', 'trống rỗng, không có gì', 'sạch sẽ, gọn gàng', 'cũ kĩ, rách nát'], ex: 'Ăm ắp là rất đầy, như sắp tràn ra ngoài.' },
  { w: 18, m: 'tv', lv: 1, t: 'Từ có nghĩa giống nhau', q: 'Từ nào có nghĩa giống từ "xinh đẹp"?', o: ['xinh xắn', 'xấu xí', 'to lớn', 'cao ráo'], ex: 'Xinh đẹp và xinh xắn có nghĩa giống nhau. Xấu xí có nghĩa trái ngược.' },
  { w: 18, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Câu nào đặt dấu câu đúng?', o: ['Bạn tên là gì?', 'Bạn tên là gì.', 'Bạn tên là gì!', 'Bạn tên là gì:'], ex: 'Câu có từ để hỏi "gì" là câu hỏi, cuối câu đặt dấu chấm hỏi.' },
  { w: 18, m: 'tv', lv: 3, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ nào nói về sự vất vả, chăm chỉ của người nông dân?', o: ['một nắng hai sương', 'ăn không ngồi rồi', 'đầu voi đuôi chuột', 'nói như vẹt'], ex: 'Một nắng hai sương: làm lụng vất vả từ sáng sớm đến tối mịt, ngoài nắng ngoài sương.' },
  { w: 18, m: 'tv', lv: 2, t: 'Nối vế câu', q: 'Chọn vế phù hợp để hoàn thành câu: "Vì trời mưa to, …"', o: ['đường làng lầy lội.', 'hoa nở thật đẹp.', 'em đi tắm biển.', 'nắng chiếu chói chang.'], ex: 'Mưa to là nguyên nhân làm đường làng lầy lội. Các vế khác không hợp với trời mưa.' },
];
