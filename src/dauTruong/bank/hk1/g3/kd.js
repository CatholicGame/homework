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
];
