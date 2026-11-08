/**
 * 🏆 Đấu Trường Nhí · lớp 2 · Khởi động · học kì I (Kết nối tri thức). Kiểm: node scripts/dautruong-check.mjs 2
 */
export default [
  // ══════════════════════════════ TOÁN ══════════════════════════════

  // ── Số đến 100 (tuần 1) ──
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 100', q: 'Hình bên có tất cả bao nhiêu que tính?', fig: { type: 'tokens', row: ['stick.10', 'stick.10', 'stick.10', 'stick.5'] },
    o: ['35', '53', '8', '305'], ex: '3 bó, mỗi bó 1 chục que là 30 que, thêm 5 que lẻ: 35 que.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 100', q: 'Số gồm 7 chục và 4 đơn vị viết là:', o: ['74', '47', '704', '11'], ex: '7 chục viết chữ số 7 ở hàng chục, 4 đơn vị viết 4 ở hàng đơn vị: 74.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 100', q: 'Số 58 gồm mấy chục và mấy đơn vị?', o: ['5 chục và 8 đơn vị', '8 chục và 5 đơn vị', '58 chục', '50 chục và 8 đơn vị'], ex: 'Chữ số 5 ở hàng chục, chữ số 8 ở hàng đơn vị: 5 chục và 8 đơn vị.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số đến 100', q: 'Số 61 đọc là:', o: ['sáu mươi mốt', 'sáu mươi một', 'mười sáu', 'sáu một'], ex: 'Số có hàng chục từ 2 trở lên, hàng đơn vị là 1 thì đọc "mốt": sáu mươi mốt.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số đến 100', q: 'Số 45 đọc là:', o: ['bốn mươi lăm', 'bốn mươi năm', 'năm mươi tư', 'bốn lăm'], ex: 'Hàng đơn vị là 5 đứng sau "mươi" thì đọc "lăm": bốn mươi lăm.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 100', q: 'Mỗi bó có 10 que tính. Hình bên có bao nhiêu que tính?', fig: { type: 'tokens', row: ['stick.10', 'stick.10', 'stick.10', 'stick.10', 'stick.10', 'stick.10'] },
    o: ['60', '6', '16', '600'], ex: '6 bó, mỗi bó 1 chục: 6 chục que, tức là 60 que.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số đến 100', q: 'Số lớn nhất có hai chữ số là:', o: ['99', '100', '98', '90'], ex: '100 có ba chữ số. Số lớn nhất có hai chữ số là 99.' },
  { w: 1, m: 'toan', lv: 3, t: 'Số đến 100', q: 'Số tròn chục bé nhất có hai chữ số là:', o: ['10', '11', '0', '20'], ex: 'Số tròn chục có hàng đơn vị là 0. Bé nhất có hai chữ số là 10 (11 không phải số tròn chục).' },
  { w: 1, m: 'toan', lv: 2, t: 'Số đến 100', q: 'Số có hai chữ số giống nhau, lớn hơn 20 và bé hơn 30 là:', o: ['22', '20', '33', '11'], ex: 'Các số từ 21 đến 29, chỉ có 22 có hai chữ số giống nhau.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số đến 100', q: 'Viết số 83 thành tổng của số chục và số đơn vị:', o: ['80 + 3', '8 + 3', '30 + 8', '80 + 30'], ex: '83 gồm 8 chục (80) và 3 đơn vị: 83 = 80 + 3.' },
  { w: 2, m: 'toan', lv: 2, t: 'Số đến 100', q: 'Hình bên có bao nhiêu que tính?', fig: { type: 'tokens', row: ['stick.10', 'stick.10', 'stick.10', 'stick.10', 'stick.5', 'stick.3'] },
    o: ['48', '45', '413', '43'], ex: '4 bó là 40 que, que lẻ 5 + 3 = 8 que. 40 + 8 = 48 que.' },

  // ── So sánh số (tuần 1) ──
  { w: 1, m: 'toan', lv: 1, t: 'So sánh số', q: 'Dấu thích hợp điền vào chỗ trống: 67 … 76', o: ['<', '>', '=', '+'], ex: 'So hàng chục: 6 chục bé hơn 7 chục, nên 67 < 76.' },
  { w: 1, m: 'toan', lv: 2, t: 'So sánh số', q: 'Số nào lớn nhất trong các số 59, 95, 90, 85?', o: ['95', '90', '59', '85'], ex: '95, 90 cùng 9 chục; 95 có 5 đơn vị nhiều hơn 0 đơn vị nên 95 lớn nhất.' },
  { w: 1, m: 'toan', lv: 2, t: 'So sánh số', q: 'Dãy số nào xếp theo thứ tự từ bé đến lớn?', o: ['38, 43, 70, 72', '43, 38, 70, 72', '72, 70, 43, 38', '38, 70, 43, 72'], ex: 'So hàng chục trước: 3 chục < 4 chục < 7 chục; 70 < 72.' },
  { w: 1, m: 'toan', lv: 3, t: 'So sánh số', q: 'Có bao nhiêu số tròn chục lớn hơn 40 và bé hơn 80?', o: ['3', '4', '5', '2'], ex: 'Đó là 50, 60, 70: có 3 số. Không tính 40 và 80.' },
  { w: 1, m: 'toan', lv: 2, t: 'So sánh số', q: 'Chữ số nào điền vào ô trống để có 4□ > 48?', o: ['9', '8', '7', '0'], ex: 'Cùng 4 chục, cần hàng đơn vị lớn hơn 8: chỉ có 9. 49 > 48.' },
  { w: 2, m: 'toan', lv: 1, t: 'So sánh số', q: 'Nhìn hình, hàng nào có nhiều hình hơn?', fig: { type: 'tokens', rows: [['🐝', '🐝', '🐝', '🐝', '🐝', '🐝'], ['🦋', '🦋', '🦋', '🦋', '🦋', '🦋', '🦋']] },
    o: ['Hàng bướm', 'Hàng ong', 'Hai hàng bằng nhau', 'Chưa biết'], ex: 'Có 6 con ong, 7 con bướm. 7 > 6 nên hàng bướm nhiều hơn.' },

  // ── Tia số, số liền trước, số liền sau (tuần 1–2) ──
  { w: 1, m: 'toan', lv: 1, t: 'Tia số', q: 'Số thích hợp ở dấu hỏi là số nào?', fig: { type: 'numline', from: 30, to: 40, ask: [33] }, o: ['33', '34', '32', '43'], ex: 'Sau 32 là 33, trước 34 là 33.' },
  { w: 2, m: 'toan', lv: 1, t: 'Tia số', q: 'Số thích hợp ở dấu hỏi là số nào?', fig: { type: 'numline', from: 0, to: 100, step: 10, ask: [70] }, o: ['70', '60', '80', '7'], ex: 'Các vạch cách nhau 10: 60, 70, 80. Dấu hỏi ở giữa 60 và 80 là 70.' },
  { w: 2, m: 'toan', lv: 2, t: 'Tia số', q: 'Các số trên tia số cách đều nhau. Số ở dấu hỏi là số nào?', fig: { type: 'numline', from: 40, to: 60, step: 2, ask: [52] }, o: ['52', '51', '54', '50'], ex: 'Mỗi vạch cách nhau 2 đơn vị: 48, 50, 52, 54. Dấu hỏi là 52.' },
  { w: 2, m: 'toan', lv: 2, t: 'Tia số', q: 'Điểm A trên tia số ứng với số nào?', fig: { type: 'numline', from: 20, to: 30, label: [20, 25, 30], mark: { 26: 'A' } }, o: ['26', '27', '24', '16'], ex: 'Mỗi vạch cách nhau 1. Từ 25 đi thêm 1 vạch là 26.' },
  { w: 2, m: 'toan', lv: 2, t: 'Tia số', q: 'Điểm M trên tia số ứng với số nào?', fig: { type: 'numline', from: 0, to: 100, step: 10, label: [0, 50, 100], mark: { 80: 'M' } }, o: ['80', '70', '90', '8'], ex: 'Mỗi vạch cách nhau 10. Từ 50 đếm 60, 70, 80: M là 80.' },
  { w: 2, m: 'toan', lv: 2, t: 'Tia số', q: 'Thỏ nhảy từ số 12, mỗi lần nhảy 3 đơn vị. Sau hai lần nhảy, thỏ ở số nào?', fig: { type: 'numline', from: 10, to: 20, hops: [[12, 15, '+3'], [15, 18, '+3']] },
    o: ['18', '15', '17', '21'], ex: 'Lần một: 12 + 3 = 15. Lần hai: 15 + 3 = 18.' },
  { w: 2, m: 'toan', lv: 2, t: 'Tia số', q: 'Số ở dấu hỏi là số nào?', fig: { type: 'numline', from: 50, to: 70, step: 5, ask: [60] }, o: ['60', '56', '65', '61'], ex: 'Các vạch cách nhau 5: 50, 55, 60, 65, 70.' },
  { w: 2, m: 'toan', lv: 3, t: 'Tia số', q: 'Từ điểm A đến điểm B trên tia số cách nhau mấy đơn vị?', fig: { type: 'numline', from: 90, to: 100, mark: { 94: 'A', 97: 'B' } }, o: ['3', '4', '2', '7'], ex: 'A là 94, B là 97. 97 − 94 = 3 (đếm khoảng cách, không đếm vạch).' },
  { w: 1, m: 'toan', lv: 1, t: 'Số liền trước, liền sau', q: 'Số liền sau của 39 là:', o: ['40', '38', '310', '49'], ex: '39 thêm 1 là 40.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số liền trước, liền sau', q: 'Số liền trước của 70 là:', o: ['69', '71', '60', '79'], ex: '70 bớt 1 là 69.' },
  { w: 2, m: 'toan', lv: 3, t: 'Số liền trước, liền sau', q: 'Số liền trước của số liền sau 54 là số nào?', o: ['54', '55', '53', '56'], ex: 'Liền sau 54 là 55. Liền trước 55 là 54.' },
  { w: 2, m: 'toan', lv: 3, t: 'Số liền trước, liền sau', q: 'Số liền sau của số lớn nhất có hai chữ số là:', o: ['100', '99', '98', '101'], ex: 'Số lớn nhất có hai chữ số là 99. Liền sau 99 là 100.' },
  { w: 2, m: 'toan', lv: 1, t: 'Số liền trước, liền sau', q: 'Số còn thiếu trong ô dấu hỏi là số nào?', fig: { type: 'tokens', row: ['?', '80', '81'] }, o: ['79', '82', '70', '78'], ex: 'Ba số liên tiếp: 79, 80, 81. Liền trước 80 là 79.' },
  { w: 2, m: 'toan', lv: 3, t: 'Số liền trước, liền sau', q: 'Số ở giữa số liền trước và số liền sau của 66 là:', o: ['66', '65', '67', '76'], ex: 'Liền trước 66 là 65, liền sau là 67. Ở giữa 65 và 67 là 66.' },

  // ── Số hạng, tổng; số bị trừ, số trừ, hiệu (tuần 2) ──
  { w: 2, m: 'toan', lv: 1, t: 'Thành phần phép tính', q: 'Trong phép tính 32 + 15 = 47, số 47 gọi là gì?', o: ['tổng', 'số hạng', 'hiệu', 'số trừ'], ex: 'Trong phép cộng, kết quả là tổng; 32 và 15 là số hạng.' },
  { w: 2, m: 'toan', lv: 1, t: 'Thành phần phép tính', q: 'Hai số hạng là 40 và 25. Tổng là bao nhiêu?', o: ['65', '15', '45', '605'], ex: '40 + 25 = 65.' },
  { w: 2, m: 'toan', lv: 3, t: 'Thành phần phép tính', q: 'Tổng là 58, một số hạng là 8. Số hạng kia là bao nhiêu?', o: ['50', '66', '58', '40'], ex: 'Lấy tổng trừ số hạng đã biết: 58 − 8 = 50.' },
  { w: 2, m: 'toan', lv: 2, t: 'Thành phần phép tính', q: 'Số nào thay cho dấu hỏi?', fig: { type: 'tokens', row: ['24', '+', '?', '=', '29'] }, o: ['5', '53', '6', '4'], ex: '24 cộng mấy được 29? 29 − 24 = 5.' },
  { w: 2, m: 'toan', lv: 1, t: 'Thành phần phép tính', q: 'Trong phép tính 68 − 23 = 45, số 23 gọi là gì?', o: ['số trừ', 'số bị trừ', 'hiệu', 'số hạng'], ex: '68 là số bị trừ, 23 là số trừ, 45 là hiệu.' },
  { w: 2, m: 'toan', lv: 3, t: 'Thành phần phép tính', q: 'Số nào thay cho dấu hỏi?', fig: { type: 'tokens', row: ['?', '−', '20', '=', '36'] }, o: ['56', '16', '36', '46'], ex: 'Số nào trừ 20 còn 36? Lấy 36 + 20 = 56.' },
  { w: 3, m: 'toan', lv: 3, t: 'Thành phần phép tính', q: 'Số bị trừ là 90, hiệu là 30. Số trừ là bao nhiêu?', o: ['60', '120', '30', '70'], ex: '90 trừ mấy còn 30? 90 − 30 = 60.' },

  // ── Hơn, kém nhau bao nhiêu (tuần 2–3) ──
  { w: 2, m: 'toan', lv: 1, t: 'Hơn, kém bao nhiêu', q: 'Số gà nhiều hơn số vịt bao nhiêu con?', fig: { type: 'tokens', rows: [['🐔', '🐔', '🐔', '🐔', '🐔', '🐔', '🐔'], ['🦆', '🦆', '🦆', '🦆']] },
    o: ['3', '11', '4', '7'], ex: 'Có 7 con gà, 4 con vịt: 7 − 4 = 3 con.' },
  { w: 3, m: 'toan', lv: 1, t: 'Hơn, kém bao nhiêu', q: 'Lan có 18 nhãn vở, Hồng có 12 nhãn vở. Lan có nhiều hơn Hồng bao nhiêu nhãn vở?', o: ['6', '30', '12', '8'], ex: '18 − 12 = 6 nhãn vở.' },
  { w: 3, m: 'toan', lv: 2, t: 'Hơn, kém bao nhiêu', q: '45 hơn 20 bao nhiêu đơn vị?', o: ['25', '65', '20', '15'], ex: '45 − 20 = 25.' },
  { w: 3, m: 'toan', lv: 2, t: 'Hơn, kém bao nhiêu', q: 'Lớp 2A có 35 bạn, lớp 2B có 32 bạn. Lớp 2B ít hơn lớp 2A mấy bạn?', o: ['3 bạn', '67 bạn', '2 bạn', '35 bạn'], ex: '35 − 32 = 3 (bạn).' },
  { w: 3, m: 'toan', lv: 1, t: 'Hơn, kém bao nhiêu', q: 'Số hoa hồng ít hơn số hoa hướng dương mấy bông?', fig: { type: 'tokens', rows: [['🌹', '🌹', '🌹', '🌹', '🌹', '🌹'], ['🌻', '🌻', '🌻', '🌻', '🌻', '🌻', '🌻', '🌻', '🌻']] },
    o: ['3', '15', '6', '9'], ex: 'Có 6 bông hồng, 9 bông hướng dương: 9 − 6 = 3 bông.' },

  // ── Đo độ dài bằng xăng-ti-mét (tuần 3; đề-xi-mét học ở Tập Hai) ──
  { w: 3, m: 'toan', lv: 1, t: 'Đo độ dài', q: 'Thước kẻ dài 20 cm, bút chì dài 15 cm. Thước kẻ dài hơn bút chì bao nhiêu xăng-ti-mét?', o: ['5 cm', '35 cm', '15 cm', '10 cm'], ex: '20 − 15 = 5 (cm).' },
  { w: 3, m: 'toan', lv: 1, t: 'Đo độ dài', q: '12 cm + 5 cm = ?', o: ['17 cm', '17', '7 cm', '16 cm'], ex: '12 + 5 = 17, nhớ viết đơn vị: 17 cm.' },
  { w: 3, m: 'toan', lv: 2, t: 'Đo độ dài', q: '48 cm − 6 cm = ?', o: ['42 cm', '54 cm', '42', '44 cm'], ex: '48 − 6 = 42, nhớ viết đơn vị: 42 cm.' },
  { w: 3, m: 'toan', lv: 3, t: 'Đo độ dài', q: 'Đoạn thẳng AB dài 23 cm, đoạn thẳng BC dài 14 cm. Cả hai đoạn dài bao nhiêu xăng-ti-mét?', o: ['37 cm', '9 cm', '36 cm', '47 cm'], ex: '23 + 14 = 37 (cm).' },
  { w: 3, m: 'toan', lv: 2, t: 'Đo độ dài', q: 'Chiếc bút chì mới dài khoảng bao nhiêu?', o: ['18 cm', '2 cm', '80 cm', '180 cm'], ex: 'Bút chì mới dài cỡ hai gang tay em bé: khoảng 18 cm.' },
  { w: 3, m: 'toan', lv: 3, t: 'Đo độ dài', q: 'Dây đỏ dài 45 cm, dây xanh dài 54 cm, dây vàng dài 50 cm. Sợi dây nào dài nhất?', o: ['Sợi dây xanh', 'Sợi dây đỏ', 'Sợi dây vàng', 'Ba sợi dài bằng nhau'], ex: '54 > 50 > 45 nên sợi dây xanh dài nhất.' },
  { w: 3, m: 'toan', lv: 1, t: 'Đo độ dài', q: 'Bút chì dài bao nhiêu xăng-ti-mét?', fig: { type: 'ruler', len: 6, start: 0, max: 10 }, o: ['6 cm', '7 cm', '5 cm', '10 cm'], ex: 'Đầu bút ở vạch 0, cuối bút ở vạch 6: 6 cm.' },
  { w: 3, m: 'toan', lv: 2, t: 'Đo độ dài', q: 'Sợi ruy băng dài bao nhiêu xăng-ti-mét?', fig: { type: 'ruler', len: 5, start: 3, max: 10, obj: 'ribbon' }, o: ['5 cm', '8 cm', '3 cm', '6 cm'], ex: 'Ruy băng từ vạch 3 đến vạch 8: 8 − 3 = 5 cm.' },
  { w: 3, m: 'toan', lv: 2, t: 'Đo độ dài', q: 'Bút chì dài bao nhiêu xăng-ti-mét?', fig: { type: 'ruler', len: 10, start: 2, max: 12 }, o: ['10 cm', '12 cm', '2 cm', '8 cm'], ex: 'Bút từ vạch 2 đến vạch 12: 12 − 2 = 10 cm.' },

  // ── Cộng, trừ không nhớ (tuần 3) ──
  { w: 3, m: 'toan', lv: 1, t: 'Cộng, trừ không nhớ', q: '43 + 25 = ?', o: ['68', '58', '18', '78'], ex: '3 + 5 = 8, 4 + 2 = 6: được 68.' },
  { w: 3, m: 'toan', lv: 1, t: 'Cộng, trừ không nhớ', q: '87 − 34 = ?', o: ['53', '43', '121', '54'], ex: '7 − 4 = 3, 8 − 3 = 5: được 53.' },
  { w: 3, m: 'toan', lv: 2, t: 'Cộng, trừ không nhớ', q: '60 + 30 − 40 = ?', o: ['50', '90', '130', '40'], ex: '60 + 30 = 90, 90 − 40 = 50.' },
  { w: 3, m: 'toan', lv: 1, t: 'Cộng, trừ không nhớ', q: '56 + 3 = ?', o: ['59', '86', '53', '69'], ex: 'Cộng 3 vào hàng đơn vị: 6 + 3 = 9, được 59.' },
  { w: 3, m: 'toan', lv: 1, t: 'Cộng, trừ không nhớ', q: '78 − 8 = ?', o: ['70', '71', '60', '86'], ex: '8 − 8 = 0, giữ 7 chục: 70.' },
  { w: 3, m: 'toan', lv: 1, t: 'Cộng, trừ không nhớ', q: 'Mẹ hái 35 quả cam, bà hái 24 quả cam. Cả hai người hái được bao nhiêu quả cam?', o: ['59', '11', '58', '69'], ex: '35 + 24 = 59 quả cam.' },
  { w: 3, m: 'toan', lv: 1, t: 'Đặt tính', q: 'Kết quả phép tính đặt cột bên là bao nhiêu?', fig: { type: 'vcalc', a: 64, b: 23, op: '−', res: '?' }, o: ['41', '87', '31', '42'], ex: '4 − 3 = 1, 6 − 2 = 4: được 41.' },

  // ── Cộng qua 10 trong phạm vi 20 (tuần 4–5) ──
  { w: 4, m: 'toan', lv: 1, t: 'Cộng qua 10', q: '9 + 4 = ?', o: ['13', '12', '14', '5'], ex: '9 + 1 = 10, 10 + 3 = 13.' },
  { w: 4, m: 'toan', lv: 1, t: 'Cộng qua 10', q: 'Có tất cả bao nhiêu cái kẹo?', fig: { type: 'tokens', rows: [['🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬', '🍬'], ['🍭', '🍭', '🍭', '🍭', '🍭']] },
    o: ['13', '12', '3', '14'], ex: '8 viên kẹo và 5 cây kẹo mút: 8 + 5 = 13.' },
  { w: 4, m: 'toan', lv: 2, t: 'Cộng qua 10', q: 'Tính 8 + 6: tách 6 = 2 + 4, lấy 8 + 2 = 10, rồi cộng tiếp với số nào?', o: ['4', '6', '2', '10'], ex: '8 + 2 = 10, còn lại 4: 10 + 4 = 14.' },
  { w: 5, m: 'toan', lv: 2, t: 'Cộng qua 10', q: 'Dấu thích hợp điền vào chỗ trống: 9 + 6 … 8 + 7', o: ['=', '>', '<', '+'], ex: '9 + 6 = 15 và 8 + 7 = 15, hai bên bằng nhau.' },
  { w: 5, m: 'toan', lv: 2, t: 'Cộng qua 10', q: 'Số nào cộng với 9 được 17?', o: ['8', '26', '7', '9'], ex: '9 + 8 = 17.' },
  { w: 4, m: 'toan', lv: 1, t: 'Cộng qua 10', q: 'Hai khung có tất cả bao nhiêu ô tô màu?', fig: [{ type: 'grid', cols: 5, rows: 2, fill: ['#####', '#####'] }, { type: 'grid', cols: 5, rows: 2, fill: ['###..', '.....'] }],
    o: ['13', '12', '3', '23'], ex: 'Khung đầu đủ 10 ô, khung sau 3 ô: 10 + 3 = 13.' },
  { w: 5, m: 'toan', lv: 2, t: 'Cộng qua 10', q: 'Phép tính nào có kết quả bằng 12?', o: ['5 + 7', '6 + 5', '4 + 7', '9 + 4'], ex: '5 + 7 = 12; 6 + 5 = 11; 4 + 7 = 11; 9 + 4 = 13.' },

  // ── Bài toán thêm, bớt (tuần 5–6) ──
  { w: 5, m: 'toan', lv: 1, t: 'Bài toán thêm, bớt', q: 'Trên cành có 8 con chim, thêm 5 con bay đến. Trên cành có tất cả bao nhiêu con chim?', o: ['13', '3', '12', '85'], ex: 'Thêm thì làm phép cộng: 8 + 5 = 13 con.' },
  { w: 5, m: 'toan', lv: 1, t: 'Bài toán thêm, bớt', q: 'Bà có 7 quả trứng gà, bà mua thêm 6 quả. Bà có tất cả bao nhiêu quả trứng?', o: ['13', '1', '12', '76'], ex: '7 + 6 = 13 quả trứng.' },
  { w: 6, m: 'toan', lv: 2, t: 'Bài toán thêm, bớt', q: 'Bình có 15 viên bi, Bình cho em 6 viên. Bình còn lại bao nhiêu viên bi?', o: ['9', '21', '11', '8'], ex: 'Cho bớt đi thì làm phép trừ: 15 − 6 = 9 viên.' },
  { w: 6, m: 'toan', lv: 2, t: 'Bài toán thêm, bớt', q: 'Xe buýt chở 16 người. Đến bến, 7 người xuống xe. Trên xe còn lại bao nhiêu người?', o: ['9', '23', '8', '11'], ex: '16 − 7 = 9 người.' },
  { w: 6, m: 'toan', lv: 3, t: 'Bài toán thêm, bớt', q: 'Chuồng có 12 con thỏ. 4 con chạy ra vườn, sau đó 3 con chạy về chuồng. Trong chuồng có mấy con thỏ?', o: ['11', '5', '8', '19'], ex: '12 − 4 = 8 con, thêm 3 con về: 8 + 3 = 11 con.' },

  // ── Trừ qua 10 trong phạm vi 20 (tuần 6) ──
  { w: 6, m: 'toan', lv: 1, t: 'Trừ qua 10', q: '13 − 5 = ?', o: ['8', '7', '18', '9'], ex: '13 − 3 = 10, 10 − 2 = 8.' },
  { w: 6, m: 'toan', lv: 2, t: 'Trừ qua 10', q: 'Tính 15 − 7: lấy 15 − 5 = 10, rồi trừ tiếp đi mấy?', o: ['2', '7', '5', '3'], ex: 'Tách 7 = 5 + 2. 15 − 5 = 10, 10 − 2 = 8.' },
  { w: 6, m: 'toan', lv: 2, t: 'Trừ qua 10', q: 'Số nào thay cho dấu hỏi?', fig: { type: 'tokens', row: ['14', '−', '?', '=', '6'] }, o: ['8', '20', '7', '9'], ex: '14 trừ mấy còn 6? 14 − 6 = 8.' },
  { w: 6, m: 'toan', lv: 2, t: 'Trừ qua 10', q: 'Dấu thích hợp điền vào chỗ trống: 17 − 9 … 6 + 3', o: ['<', '>', '=', '−'], ex: '17 − 9 = 8, 6 + 3 = 9. 8 < 9.' },
  { w: 7, m: 'toan', lv: 2, t: 'Trừ qua 10', q: 'Phép trừ nào có hiệu lớn nhất?', o: ['16 − 7', '12 − 4', '15 − 8', '13 − 6'], ex: '16 − 7 = 9; 12 − 4 = 8; 15 − 8 = 7; 13 − 6 = 7. Lớn nhất là 9.' },
  { w: 6, m: 'toan', lv: 3, t: 'Trừ qua 10', q: 'Số nào trừ đi 8 thì được 7?', o: ['15', '1', '14', '16'], ex: 'Lấy 7 + 8 = 15. Thử lại: 15 − 8 = 7.' },
  { w: 6, m: 'toan', lv: 1, t: 'Trừ qua 10', q: 'Có 12 quả bóng bay, 3 quả bị vỡ. Còn lại bao nhiêu quả bóng bay?', fig: { type: 'tokens', rows: [['🎈', '🎈', '🎈', '🎈', '🎈', '🎈'], ['🎈', '🎈', '🎈', '💥', '💥', '💥']] },
    o: ['9', '15', '8', '12'], ex: '12 − 3 = 9 quả bóng.' },

  // ── Bài toán nhiều hơn, ít hơn (tuần 7) ──
  { w: 7, m: 'toan', lv: 1, t: 'Nhiều hơn, ít hơn', q: 'Lan gấp 8 con hạc, Mai gấp nhiều hơn Lan 4 con. Mai gấp bao nhiêu con hạc?', o: ['12', '4', '11', '84'], ex: 'Nhiều hơn thì cộng: 8 + 4 = 12 con hạc.' },
  { w: 7, m: 'toan', lv: 2, t: 'Nhiều hơn, ít hơn', q: 'Thùng thứ nhất có 15 quả bưởi, thùng thứ hai ít hơn thùng thứ nhất 6 quả. Thùng thứ hai có mấy quả?', o: ['9', '21', '8', '6'], ex: 'Ít hơn thì trừ: 15 − 6 = 9 quả.' },
  { w: 7, m: 'toan', lv: 3, t: 'Nhiều hơn, ít hơn', q: 'Anh 13 tuổi, em kém anh 5 tuổi. Em bao nhiêu tuổi?', o: ['8', '18', '7', '5'], ex: 'Kém thì trừ: 13 − 5 = 8 tuổi.' },
  { w: 7, m: 'toan', lv: 3, t: 'Nhiều hơn, ít hơn', q: 'Lan có 16 cái kẹo, Lan có nhiều hơn Hà 7 cái. Hà có mấy cái kẹo?', o: ['9', '23', '7', '16'], ex: 'Lan nhiều hơn Hà, nghĩa là Hà ít hơn Lan 7 cái: 16 − 7 = 9.' },
  { w: 7, m: 'toan', lv: 2, t: 'Nhiều hơn, ít hơn', q: 'Hàng trên có 9 cái bánh. Hàng dưới nhiều hơn hàng trên 2 cái. Hàng dưới có mấy cái bánh?', fig: { type: 'tokens', rows: [['🥮', '🥮', '🥮', '🥮', '🥮', '🥮', '🥮', '🥮', '🥮'], ['🥮', '🥮', '🥮', '🥮', '🥮', '🥮', '🥮', '🥮', '🥮', '?', '?']] },
    o: ['11', '7', '10', '2'], ex: '9 + 2 = 11 cái bánh.' },

  // ── Ki-lô-gam (tuần 8) ──
  { w: 8, m: 'toan', lv: 1, t: 'Ki-lô-gam', q: 'Cân thăng bằng. Quả dưa hấu nặng mấy ki-lô-gam?', fig: { type: 'balance', left: ['🍉'], right: ['2 kg', '1 kg'], tilt: 0 },
    o: ['3 kg', '2 kg', '1 kg', '21 kg'], ex: 'Đĩa bên kia có 2 kg và 1 kg: 2 + 1 = 3 kg.' },
  { w: 8, m: 'toan', lv: 1, t: 'Ki-lô-gam', q: 'Nhìn cân, quả bí ngô nặng hơn hay nhẹ hơn 1 kg?', fig: { type: 'balance', left: ['🎃'], right: ['1 kg'], tilt: -1 },
    o: ['Nặng hơn 1 kg', 'Nhẹ hơn 1 kg', 'Nặng bằng 1 kg', 'Chưa biết'], ex: 'Đĩa có quả bí ngô bị kéo xuống thấp hơn nên bí ngô nặng hơn 1 kg.' },
  { w: 8, m: 'toan', lv: 2, t: 'Ki-lô-gam', q: 'Cân thăng bằng, hai quả dứa nặng như nhau. Mỗi quả dứa nặng mấy ki-lô-gam?', fig: { type: 'balance', left: ['🍍', '🍍'], right: ['2 kg'], tilt: 0 },
    o: ['1 kg', '2 kg', '4 kg', '3 kg'], ex: 'Hai quả nặng 2 kg, mà 1 kg + 1 kg = 2 kg nên mỗi quả nặng 1 kg.' },
  { w: 8, m: 'toan', lv: 3, t: 'Ki-lô-gam', q: 'Cân thăng bằng. Con cá nặng mấy ki-lô-gam?', fig: { type: 'balance', left: ['🐟', '1 kg'], right: ['5 kg'], tilt: 0 },
    o: ['4 kg', '6 kg', '5 kg', '1 kg'], ex: 'Cá cùng quả cân 1 kg nặng bằng 5 kg: cá nặng 5 − 1 = 4 kg.' },
  { w: 8, m: 'toan', lv: 1, t: 'Ki-lô-gam', q: '12 kg + 7 kg = ?', o: ['19 kg', '19', '5 kg', '18 kg'], ex: '12 + 7 = 19, nhớ viết đơn vị: 19 kg.' },
  { w: 8, m: 'toan', lv: 2, t: 'Ki-lô-gam', q: 'Bao gạo nặng 10 kg, bao đường nhẹ hơn bao gạo 4 kg. Bao đường nặng mấy ki-lô-gam?', o: ['6 kg', '14 kg', '4 kg', '10 kg'], ex: 'Nhẹ hơn thì trừ: 10 − 4 = 6 kg.' },
  { w: 9, m: 'toan', lv: 3, t: 'Ki-lô-gam', q: 'Mỗi quả dưa lưới nặng 2 kg. Cân thăng bằng. Quả dưa hấu nặng mấy ki-lô-gam?', fig: { type: 'balance', left: ['🍉'], right: ['🍈', '🍈', '🍈'], tilt: 0 },
    o: ['6 kg', '3 kg', '2 kg', '5 kg'], ex: 'Ba quả dưa lưới: 2 + 2 + 2 = 6 kg. Dưa hấu nặng 6 kg.' },

  // ── Lít (tuần 8–9) ──
  { w: 8, m: 'toan', lv: 1, t: 'Lít', q: 'Bình đang có mấy lít nước?', fig: { type: 'jug', items: [{ cap: 5, v: 3, unit: 'l' }] }, o: ['3 l', '5 l', '2 l', '8 l'], ex: 'Mặt nước ngang vạch 3: bình có 3 l nước (bình chứa được 5 l).' },
  { w: 8, m: 'toan', lv: 2, t: 'Lít', q: 'Bình thứ nhất nhiều hơn bình thứ hai mấy lít nước?', fig: { type: 'jug', items: [{ cap: 10, v: 6, unit: 'l' }, { cap: 10, v: 2, unit: 'l' }] },
    o: ['4 l', '8 l', '6 l', '2 l'], ex: 'Bình một có 6 l, bình hai có 2 l: 6 − 2 = 4 l.' },
  { w: 9, m: 'toan', lv: 2, t: 'Lít', q: 'Cả hai can có tất cả bao nhiêu lít nước?', fig: { type: 'jug', items: [{ cap: 4, v: 1, unit: 'l' }, { cap: 4, v: 4, unit: 'l' }] },
    o: ['5 l', '8 l', '4 l', '3 l'], ex: 'Can một có 1 l, can hai đầy 4 l: 1 + 4 = 5 l.' },
  { w: 9, m: 'toan', lv: 3, t: 'Lít', q: 'Cần đổ thêm mấy lít nước nữa thì đầy bình?', fig: { type: 'jug', items: [{ cap: 5, v: 2, unit: 'l' }] }, o: ['3 l', '2 l', '5 l', '7 l'], ex: 'Bình chứa 5 l, đang có 2 l: 5 − 2 = 3 l.' },
  { w: 8, m: 'toan', lv: 1, t: 'Lít', q: '8 l + 5 l = ?', o: ['13 l', '3 l', '13', '12 l'], ex: '8 + 5 = 13, viết đơn vị lít: 13 l.' },
  { w: 9, m: 'toan', lv: 2, t: 'Lít', q: 'Can to đựng 15 l dầu, can bé đựng ít hơn can to 7 l. Can bé đựng mấy lít dầu?', o: ['8 l', '22 l', '7 l', '9 l'], ex: '15 − 7 = 8 l.' },
  { w: 9, m: 'toan', lv: 3, t: 'Lít', q: 'Can đầy 10 l nước. Rót ra 3 ca, mỗi ca 2 l. Trong can còn lại mấy lít nước?', o: ['4 l', '7 l', '8 l', '6 l'], ex: 'Rót ra 2 + 2 + 2 = 6 l. Còn lại 10 − 6 = 4 l.' },

  // ── Phép cộng có nhớ trong phạm vi 100 (tuần 10–11) ──
  { w: 10, m: 'toan', lv: 1, t: 'Cộng có nhớ', q: '37 + 5 = ?', o: ['42', '32', '87', '41'], ex: '7 + 5 = 12, viết 2 nhớ 1; 3 thêm 1 là 4: được 42.' },
  { w: 10, m: 'toan', lv: 2, t: 'Cộng có nhớ', q: '48 + 26 = ?', o: ['74', '64', '614', '72'], ex: '8 + 6 = 14, viết 4 nhớ 1; 4 + 2 = 6, thêm 1 là 7: được 74.' },
  { w: 10, m: 'toan', lv: 2, t: 'Đặt tính', q: 'Kết quả phép tính đặt cột bên là bao nhiêu?', fig: { type: 'vcalc', a: 29, b: 35, op: '+', res: '?' }, o: ['64', '54', '514', '63'], ex: '9 + 5 = 14, viết 4 nhớ 1; 2 + 3 = 5, thêm 1 là 6: 64.' },
  { w: 11, m: 'toan', lv: 2, t: 'Cộng có nhớ', q: '56 + 44 = ?', o: ['100', '90', '910', '99'], ex: '6 + 4 = 10, viết 0 nhớ 1; 5 + 4 = 9, thêm 1 là 10: được 100.' },
  { w: 11, m: 'toan', lv: 2, t: 'Cộng có nhớ', q: 'Lớp 2A có 18 bạn nữ và 17 bạn nam. Lớp 2A có bao nhiêu học sinh?', o: ['35', '25', '36', '1'], ex: '18 + 17 = 35 học sinh.' },
  { w: 10, m: 'toan', lv: 3, t: 'Đặt tính', q: 'Chữ số nào thay cho dấu hỏi trong phép tính bên?', fig: { type: 'vcalc', a: 46, b: 27, op: '+', res: 73, hide: { res: [0] } },
    o: ['7', '6', '8', '5'], ex: '6 + 7 = 13, viết 3 nhớ 1; 4 + 2 = 6, thêm 1 là 7. Kết quả 73.' },
  { w: 11, m: 'toan', lv: 2, t: 'Cộng có nhớ', q: '27 + 8 + 5 = ?', o: ['40', '30', '39', '41'], ex: '27 + 8 = 35, 35 + 5 = 40.' },
  { w: 10, m: 'toan', lv: 3, t: 'Nhiều hơn, ít hơn', q: 'Tổ Một trồng 9 cây, tổ Hai trồng nhiều hơn tổ Một 3 cây. Cả hai tổ trồng được bao nhiêu cây?', o: ['21', '12', '15', '18'], ex: 'Tổ Hai: 9 + 3 = 12 cây. Cả hai tổ: 9 + 12 = 21 cây.' },

  // ── Phép trừ có nhớ trong phạm vi 100 (tuần 11–13) ──
  { w: 11, m: 'toan', lv: 1, t: 'Trừ có nhớ', q: '32 − 5 = ?', o: ['27', '33', '37', '23'], ex: '2 không trừ được 5, lấy 12 − 5 = 7, nhớ 1; 3 − 1 = 2: được 27.' },
  { w: 12, m: 'toan', lv: 3, t: 'Trừ có nhớ', q: '71 − 36 = ?', o: ['35', '45', '25', '47'], ex: '11 − 6 = 5, nhớ 1; 3 thêm 1 là 4, 7 − 4 = 3: được 35.' },
  { w: 12, m: 'toan', lv: 2, t: 'Đặt tính', q: 'Kết quả phép tính đặt cột bên là bao nhiêu?', fig: { type: 'vcalc', a: 60, b: 24, op: '−', res: '?' }, o: ['36', '44', '46', '84'], ex: '0 không trừ được 4, lấy 10 − 4 = 6, nhớ 1; 2 thêm 1 là 3, 6 − 3 = 3: được 36.' },
  { w: 12, m: 'toan', lv: 2, t: 'Trừ có nhớ', q: 'Cửa hàng có 63 quả dưa hấu, đã bán 28 quả. Cửa hàng còn lại bao nhiêu quả dưa hấu?', o: ['35', '45', '91', '25'], ex: '63 − 28 = 35 quả.' },
  { w: 12, m: 'toan', lv: 3, t: 'Đặt tính', q: 'Chữ số nào thay cho dấu hỏi trong phép tính bên?', fig: { type: 'vcalc', a: 54, b: 18, op: '−', res: 36, hide: { a: [1] } },
    o: ['4', '2', '14', '6'], ex: 'Hàng đơn vị: ? − 8 được 6 phải mượn 1 chục, 14 − 8 = 6. Chữ số đó là 4: 54 − 18 = 36.' },
  { w: 13, m: 'toan', lv: 3, t: 'Trừ có nhớ', q: 'Số thích hợp điền vào chỗ trống: 45 − … = 18', o: ['27', '63', '33', '37'], ex: 'Lấy 45 − 18 = 27. Thử lại: 45 − 27 = 18.' },
  { w: 12, m: 'toan', lv: 1, t: 'Trừ có nhớ', q: '50 − 8 = ?', o: ['42', '48', '58', '38'], ex: '10 − 8 = 2, nhớ 1; 5 − 1 = 4: được 42.' },

  // ── Điểm, đoạn thẳng (tuần 13) ──
  { w: 13, m: 'toan', lv: 1, t: 'Điểm, đoạn thẳng', q: 'Hình bên có bao nhiêu đoạn thẳng?', fig: { type: 'lines', pts: { A: [0, 4], B: [6, 4], C: [3, 0] }, segs: [['A', 'B'], ['B', 'C'], ['C', 'A']] },
    o: ['3', '2', '4', '6'], ex: 'Các đoạn thẳng: AB, BC, CA. Có 3 đoạn thẳng.' },
  { w: 13, m: 'toan', lv: 3, t: 'Điểm, đoạn thẳng', q: 'Hình bên có bao nhiêu đoạn thẳng?', fig: { type: 'lines', pts: { A: [0, 3], B: [2, 2], C: [6, 0] }, segs: [['A', 'B'], ['B', 'C']] },
    o: ['3', '2', '4', '1'], ex: 'Các đoạn thẳng: AB, BC và AC (đoạn dài nhất). Có 3 đoạn thẳng.' },
  { w: 13, m: 'toan', lv: 2, t: 'Điểm, đoạn thẳng', q: 'Trong hình bên, ba điểm nào thẳng hàng?', fig: { type: 'lines', pts: { A: [0, 3], B: [3, 3], C: [6, 3], D: [3, 0] }, segs: [['A', 'B'], ['B', 'C'], ['B', 'D']] },
    o: ['A, B, C', 'A, B, D', 'B, C, D', 'A, C, D'], ex: 'A, B, C cùng nằm trên một đường thẳng nằm ngang.' },
  { w: 13, m: 'toan', lv: 1, t: 'Điểm, đoạn thẳng', q: 'Đoạn thẳng AB dài 8 cm, đoạn thẳng CD dài hơn AB 2 cm. Đoạn thẳng CD dài bao nhiêu?', o: ['10 cm', '6 cm', '2 cm', '82 cm'], ex: '8 + 2 = 10 cm.' },

  // ── Đường gấp khúc (tuần 13–14) ──
  { w: 14, m: 'toan', lv: 1, t: 'Đường gấp khúc', q: 'Đường gấp khúc ABCD gồm mấy đoạn thẳng?', fig: { type: 'lines', pts: { A: [0, 3], B: [2, 0], C: [4, 3], D: [6, 0] }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D']] },
    o: ['3', '4', '2', '5'], ex: 'Gồm AB, BC, CD: 3 đoạn thẳng (4 điểm A, B, C, D).' },
  { w: 13, m: 'toan', lv: 1, t: 'Đường gấp khúc', q: 'Đường gấp khúc ABC có AB = 5 cm, BC = 7 cm. Độ dài đường gấp khúc ABC là:', o: ['12 cm', '2 cm', '11 cm', '57 cm'], ex: 'Cộng độ dài các đoạn: 5 + 7 = 12 cm.' },
  { w: 14, m: 'toan', lv: 2, t: 'Đường gấp khúc', q: 'Đường gấp khúc gồm 3 đoạn thẳng, mỗi đoạn dài 4 cm. Độ dài đường gấp khúc là:', o: ['12 cm', '7 cm', '4 cm', '16 cm'], ex: '4 + 4 + 4 = 12 cm.' },
  { w: 14, m: 'toan', lv: 3, t: 'Đường gấp khúc', q: 'Đường gấp khúc ABCD dài 20 cm, đoạn AB = 6 cm, đoạn BC = 8 cm. Đoạn CD dài bao nhiêu?', o: ['6 cm', '14 cm', '34 cm', '8 cm'], ex: 'AB + BC = 6 + 8 = 14 cm. CD = 20 − 14 = 6 cm.' },
  { w: 14, m: 'toan', lv: 2, t: 'Đường gấp khúc', q: 'Đường gấp khúc bên gồm mấy đoạn thẳng?', fig: { type: 'lines', pts: { M: [0, 0], N: [2, 3], P: [4, 0], Q: [6, 3], R: [8, 0] }, segs: [['M', 'N'], ['N', 'P'], ['P', 'Q'], ['Q', 'R']] },
    o: ['4', '5', '3', '6'], ex: 'Gồm MN, NP, PQ, QR: 4 đoạn thẳng.' },

  // ── Hình tứ giác, đếm hình (tuần 14) ──
  { w: 14, m: 'toan', lv: 2, t: 'Hình tứ giác', q: 'Hình bên có bao nhiêu hình tứ giác?', fig: { type: 'tokens', row: ['tri.red', 'sq.blue', 'circle.green', 'rect.orange', 'diamond.purple'] },
    o: ['3', '2', '1', '5'], ex: 'Hình vuông, hình chữ nhật và hình thoi đều có 4 cạnh: 3 hình tứ giác.' },
  { w: 14, m: 'toan', lv: 1, t: 'Hình tứ giác', q: 'Hình tứ giác có mấy cạnh?', o: ['4 cạnh', '3 cạnh', '5 cạnh', '6 cạnh'], ex: 'Hình tứ giác có 4 cạnh và 4 đỉnh.' },
  { w: 14, m: 'toan', lv: 1, t: 'Hình tứ giác', q: 'Hình bên là hình gì?', fig: { type: 'poly', pts: [[0, 0], [5, 0], [6, 3], [1, 4]], names: ['A', 'B', 'C', 'D'], fill: 'green' },
    o: ['Hình tứ giác', 'Hình tam giác', 'Hình tròn', 'Đường gấp khúc'], ex: 'Hình khép kín có 4 cạnh AB, BC, CD, DA: hình tứ giác.' },
  { w: 14, m: 'toan', lv: 3, t: 'Đếm hình', q: 'Hình bên có bao nhiêu hình tứ giác?', fig: { type: 'lines', pts: { A: [0, 0], B: [3, 0], C: [6, 0], D: [0, 3], E: [3, 3], G: [6, 3] }, segs: [['A', 'B'], ['B', 'C'], ['D', 'E'], ['E', 'G'], ['A', 'D'], ['B', 'E'], ['C', 'G']] },
    o: ['3', '2', '4', '6'], ex: 'Hai hình nhỏ ABED, BCGE và hình lớn ACGD: 3 hình tứ giác.' },
  { w: 14, m: 'toan', lv: 3, t: 'Đếm hình', q: 'Hình bên có bao nhiêu hình tam giác?', fig: { type: 'lines', pts: { A: [3, 0], B: [0, 4], C: [6, 4], D: [2, 4] }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'D']] },
    o: ['3', '2', '4', '1'], ex: 'Hai hình nhỏ ABD, ADC và hình lớn ABC: 3 hình tam giác.' },
  { w: 14, m: 'toan', lv: 2, t: 'Hình tứ giác', q: 'Tổng độ dài bốn cạnh của hình tứ giác bên là bao nhiêu?', fig: { type: 'poly', pts: [[0, 4], [5, 4], [6, 0], [0, 0]], sides: ['5 cm', '4 cm', '6 cm', '4 cm'], names: ['A', 'B', 'C', 'D'] },
    o: ['19 cm', '15 cm', '18 cm', '20 cm'], ex: '5 + 4 + 6 + 4 = 19 cm. Nhớ cộng đủ 4 cạnh.' },
  { w: 14, m: 'toan', lv: 1, t: 'Đếm hình', q: 'Hình bên có bao nhiêu khối lập phương?', fig: { type: 'cubes', cols: [[3, 1, 2]] },
    o: ['6', '3', '5', '7'], ex: 'Đếm từng chồng: 3 + 1 + 2 = 6 khối lập phương.' },

  // ── Ngày, giờ, xem đồng hồ (tuần 15–16) ──
  { w: 15, m: 'toan', lv: 1, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 9, m: 0 }, o: ['9 giờ', '12 giờ 45 phút', '12 giờ', '3 giờ'], ex: 'Kim ngắn chỉ số 9, kim dài chỉ số 12: 9 giờ.' },
  { w: 15, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 4, m: 30 }, o: ['4 giờ 30 phút', '5 giờ 30 phút', '6 giờ 20 phút', '4 giờ'], ex: 'Kim ngắn ở giữa 4 và 5 (đã qua 4), kim dài chỉ 6: 4 giờ 30 phút.' },
  { w: 15, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 7, m: 15 }, o: ['7 giờ 15 phút', '7 giờ 3 phút', '3 giờ 35 phút', '8 giờ 15 phút'], ex: 'Kim dài chỉ số 3 là 15 phút, kim ngắn qua số 7: 7 giờ 15 phút.' },
  { w: 15, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ giờ buổi chiều. Đó là mấy giờ?', fig: { type: 'clock', h: 2, m: 0 }, o: ['14 giờ', '12 giờ', '2 giờ sáng', '16 giờ'], ex: 'Đồng hồ chỉ 2 giờ. 2 giờ chiều còn gọi là 12 + 2 = 14 giờ.' },
  { w: 15, m: 'toan', lv: 1, t: 'Xem giờ', q: 'Một ngày có bao nhiêu giờ?', o: ['24 giờ', '12 giờ', '60 giờ', '10 giờ'], ex: 'Một ngày có 24 giờ, tính từ 12 giờ đêm hôm trước đến 12 giờ đêm hôm sau.' },
  { w: 15, m: 'toan', lv: 2, t: 'Xem giờ', q: '20 giờ còn gọi là mấy giờ tối?', o: ['8 giờ tối', '10 giờ tối', '6 giờ tối', '2 giờ tối'], ex: '20 − 12 = 8: 20 giờ là 8 giờ tối.' },
  { w: 16, m: 'toan', lv: 3, t: 'Xem giờ', q: 'Em bắt đầu đọc sách lúc đồng hồ chỉ như hình và đọc trong 1 giờ. Em đọc xong lúc mấy giờ?', fig: { type: 'clock', h: 10, m: 30 },
    o: ['11 giờ 30 phút', '11 giờ', '10 giờ 30 phút', '12 giờ 30 phút'], ex: 'Đồng hồ chỉ 10 giờ 30 phút. Thêm 1 giờ: 11 giờ 30 phút.' },
  { w: 16, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Đồng hồ chỉ mấy giờ?', fig: { type: 'clock', h: 12, m: 30 }, o: ['12 giờ 30 phút', '1 giờ 30 phút', '6 giờ', '6 giờ 12 phút'], ex: 'Kim ngắn đã qua số 12 (chưa tới 1), kim dài chỉ 6: 12 giờ 30 phút.' },
  { w: 16, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Khi kim dài chỉ vào số 6 thì đồng hồ chỉ:', o: ['giờ rưỡi (30 phút)', '6 phút', '6 giờ', '15 phút'], ex: 'Kim dài chỉ số 6 là 30 phút, còn gọi là giờ rưỡi.' },

  // ── Ngày, tháng, xem lịch (tuần 15–16) ──
  { w: 15, m: 'toan', lv: 1, t: 'Xem lịch', q: 'Một tuần lễ có mấy ngày?', o: ['7 ngày', '5 ngày', '6 ngày', '10 ngày'], ex: 'Thứ Hai đến thứ Bảy và Chủ nhật: 7 ngày.' },
  { w: 16, m: 'toan', lv: 1, t: 'Xem lịch', q: 'Nhìn tờ lịch. Ngày 2 tháng 9 là thứ mấy?', fig: { type: 'calendar', days: 30, start: 1, mark: [2], title: 'Tháng 9' },
    o: ['Thứ Tư', 'Thứ Ba', 'Thứ Năm', 'Thứ Hai'], ex: 'Ngày 2 nằm ở cột thứ Tư.' },
  { w: 16, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Nhìn tờ lịch. Ngày 15 tháng 10 là thứ mấy?', fig: { type: 'calendar', days: 31, start: 0, mark: [15], title: 'Tháng 10' },
    o: ['Thứ Hai', 'Chủ nhật', 'Thứ Ba', 'Thứ Bảy'], ex: 'Ngày 1, 8, 15 cùng ở cột thứ Hai.' },
  { w: 16, m: 'toan', lv: 3, t: 'Xem lịch', q: 'Nhìn tờ lịch. Tháng 11 có mấy ngày Chủ nhật?', fig: { type: 'calendar', days: 30, start: 6, title: 'Tháng 11' },
    o: ['5', '4', '6', '7'], ex: 'Các ngày Chủ nhật: 1, 8, 15, 22, 29. Có 5 ngày.' },
  { w: 16, m: 'toan', lv: 3, t: 'Xem lịch', q: 'Hôm nay là thứ Ba ngày 10. Thứ Ba tuần sau là ngày bao nhiêu?', o: ['ngày 17', 'ngày 11', 'ngày 18', 'ngày 16'], ex: 'Một tuần có 7 ngày: 10 + 7 = 17.' },
  { w: 16, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Nhìn tờ lịch. Ngày 19 tháng 12 là thứ mấy?', fig: { type: 'calendar', days: 31, start: 2, mark: [19], title: 'Tháng 12' },
    o: ['Chủ nhật', 'Thứ Bảy', 'Thứ Hai', 'Thứ Sáu'], ex: 'Ngày 19 nằm ở cột Chủ nhật.' },
  { w: 16, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Hôm nay là thứ Sáu. Hai ngày nữa là thứ mấy?', o: ['Chủ nhật', 'Thứ Bảy', 'Thứ Hai', 'Thứ Năm'], ex: 'Sau thứ Sáu là thứ Bảy, rồi Chủ nhật.' },
  { w: 16, m: 'toan', lv: 3, t: 'Xem lịch', q: 'Nhìn tờ lịch. Trong tháng 9, có mấy ngày thứ Hai?', fig: { type: 'calendar', days: 30, start: 1, title: 'Tháng 9' },
    o: ['4', '5', '3', '30'], ex: 'Ngày 1 là thứ Ba nên thứ Hai là ngày 7, 14, 21, 28: có 4 ngày.' },

  // ── Ôn tập học kì I (tuần 17–18) ──
  { w: 17, m: 'toan', lv: 2, t: 'Ôn tập', q: '36 + 47 − 20 = ?', o: ['63', '83', '53', '73'], ex: '36 + 47 = 83, 83 − 20 = 63.' },
  { w: 17, m: 'toan', lv: 3, t: 'Ôn tập', q: 'Mỗi quả cam có cùng một số. Số nào thay cho dấu hỏi?', fig: { type: 'tokens', rows: [['🍊', '+', '🍊', '=', '16'], ['🍊', '+', '5', '=', '?']] },
    o: ['13', '21', '8', '11'], ex: '8 + 8 = 16 nên mỗi quả cam là 8. 8 + 5 = 13.' },
  { w: 18, m: 'toan', lv: 3, t: 'Ôn tập', q: 'Số lớn nhất có hai chữ số khác nhau là:', o: ['98', '99', '97', '89'], ex: '99 có hai chữ số giống nhau. Lớn nhất có hai chữ số khác nhau là 98.' },
  { w: 17, m: 'toan', lv: 2, t: 'Ôn tập', q: 'Nhà An nuôi 24 con gà và 18 con vịt. Số gà nhiều hơn số vịt bao nhiêu con?', o: ['6', '42', '16', '14'], ex: '24 − 18 = 6 con.' },
  { w: 17, m: 'toan', lv: 2, t: 'Ôn tập', q: 'Cả hai thùng có tất cả bao nhiêu lít nước?', fig: { type: 'jug', items: [{ cap: 10, v: 7, unit: 'l' }, { cap: 10, v: 8, unit: 'l' }] },
    o: ['15 l', '20 l', '14 l', '1 l'], ex: 'Thùng một 7 l, thùng hai 8 l: 7 + 8 = 15 l.' },
  { w: 18, m: 'toan', lv: 2, t: 'Ôn tập', q: 'Châu chấu nhảy từ số 3 như hình. Sau hai lần nhảy, châu chấu ở số nào?', fig: { type: 'numline', from: 0, to: 20, step: 1, label: [0, 5, 10, 15, 20], hops: [[3, 10, '+7'], [10, 16, '+6']] },
    o: ['16', '10', '13', '17'], ex: '3 + 7 = 10, 10 + 6 = 16.' },
  { w: 18, m: 'toan', lv: 1, t: 'Ôn tập', q: 'Kim ngắn chỉ số 5, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?', o: ['5 giờ', '12 giờ 25 phút', '12 giờ 5 phút', '5 giờ 12 phút'], ex: 'Kim dài chỉ 12 là giờ đúng, kim ngắn chỉ 5: 5 giờ.' },
  { w: 18, m: 'toan', lv: 3, t: 'Ôn tập', q: 'Sợi dây dài 90 cm, cắt đi 25 cm. Sợi dây còn lại dài bao nhiêu xăng-ti-mét?', o: ['65 cm', '115 cm', '75 cm', '55 cm'], ex: '90 − 25 = 65 (cm).' },
  { w: 17, m: 'toan', lv: 1, t: 'Ôn tập', q: 'Đoạn thẳng AB dài 15 cm, đoạn thẳng CD dài hơn AB 6 cm. Đoạn CD dài bao nhiêu?', o: ['21 cm', '9 cm', '20 cm', '6 cm'], ex: 'Dài hơn thì cộng: 15 + 6 = 21 (cm).' },

  // ══════════════════════════════ TIẾNG VIỆT ══════════════════════════════

  // ── Bảng chữ cái (tuần 1–6) ──
  { w: 1, m: 'tv', lv: 1, t: 'Bảng chữ cái', q: 'Chữ cái nào thay cho dấu hỏi trong bảng chữ cái?', fig: { type: 'tokens', row: ['a', 'ă', '?', 'b'] }, o: ['â', 'c', 'e', 'ơ'], ex: 'Bảng chữ cái: a, ă, â, b, c…' },
  { w: 1, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Chữ cái nào thay cho dấu hỏi trong bảng chữ cái?', fig: { type: 'tokens', row: ['o', 'ô', '?', 'p'] }, o: ['ơ', 'q', 'u', 'ư'], ex: 'Thứ tự: o, ô, ơ, p, q.' },
  { w: 1, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Chữ cái cuối cùng trong bảng chữ cái tiếng Việt là chữ nào?', o: ['y', 'z', 'x', 'v'], ex: 'Bảng chữ cái tiếng Việt kết thúc: … u, ư, v, x, y. Không có chữ z.' },
  { w: 1, m: 'tv', lv: 3, t: 'Bảng chữ cái', q: 'Chữ cái "g" có tên gọi là gì?', o: ['giê', 'gờ', 'gi', 'ghê'], ex: '"gờ" là âm khi đánh vần, còn tên chữ cái g là "giê".' },
  { w: 2, m: 'tv', lv: 3, t: 'Bảng chữ cái', q: 'Chữ cái "h" có tên gọi là gì?', o: ['hát', 'hờ', 'hắt', 'hê'], ex: 'Chữ h đọc tên là "hát"; "hờ" là âm khi đánh vần.' },
  { w: 2, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Chữ cái nào đứng ngay trước chữ "i" trong bảng chữ cái?', o: ['h', 'k', 'g', 'e'], ex: 'Thứ tự: g, h, i, k. Đứng ngay trước i là h.' },
  { w: 4, m: 'tv', lv: 3, t: 'Bảng chữ cái', q: 'Chữ cái "q" có tên gọi là gì?', o: ['quy', 'cu', 'quờ', 'ku'], ex: 'Chữ q đọc tên là "quy".' },
  { w: 6, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Chữ cái nào thay cho dấu hỏi trong bảng chữ cái?', fig: { type: 'tokens', row: ['s', 't', '?', 'ư'] }, o: ['u', 'v', 'ơ', 'x'], ex: 'Thứ tự: s, t, u, ư, v, x, y.' },
  { w: 1, m: 'tv', lv: 1, t: 'Bảng chữ cái', q: 'Chữ cái nào đứng ngay sau chữ "d" trong bảng chữ cái?', o: ['đ', 'e', 'c', 'g'], ex: 'Thứ tự: c, d, đ, e.' },

  // ── Xếp tên theo bảng chữ cái (tuần 2–6) ──
  { w: 2, m: 'tv', lv: 2, t: 'Xếp tên theo chữ cái', q: 'Xếp các tên Lan, Dũng, Hà, Bình theo thứ tự bảng chữ cái thì tên nào đứng đầu?', o: ['Bình', 'Dũng', 'Hà', 'Lan'], ex: 'Chữ cái đầu: B, D, H, L. B đứng trước nên Bình đứng đầu.' },
  { w: 4, m: 'tv', lv: 2, t: 'Xếp tên theo chữ cái', q: 'Xếp các tên Mai, Tú, Sơn, Vy theo thứ tự bảng chữ cái thì tên nào đứng cuối?', o: ['Vy', 'Tú', 'Sơn', 'Mai'], ex: 'Thứ tự: M, S, T, V. Vy đứng cuối.' },
  { w: 6, m: 'tv', lv: 3, t: 'Xếp tên theo chữ cái', q: 'Danh sách lớp xếp theo thứ tự bảng chữ cái của tên (không xét họ). Bạn nào đứng đầu?', o: ['Trần Văn An', 'Đỗ Minh Châu', 'Lê Thị Bình', 'Phạm Thu Hà'], ex: 'Xét tên: An, Bình, Châu, Hà. A đứng trước nên Trần Văn An đứng đầu.' },
  { w: 6, m: 'tv', lv: 2, t: 'Xếp tên theo chữ cái', q: 'Danh sách tổ xếp theo bảng chữ cái. Tên nào điền vào dấu hỏi?', fig: { type: 'table', head: ['STT', 'Tên'], rows: [['1', 'An'], ['2', 'Bảo'], ['3', '?'], ['4', 'Hùng']] },
    o: ['Dương', 'Khoa', 'Yến', 'Ánh'], ex: 'Tên phải đứng sau B và trước H: chữ D hợp lí, Dương.' },

  // ── Từ chỉ sự vật, bộ phận cơ thể (tuần 1–4) ──
  { w: 1, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ người?', o: ['học sinh', 'bàn ghế', 'chạy nhảy', 'xanh biếc'], ex: 'Học sinh là người; bàn ghế là đồ vật.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Hình bên vẽ đồ dùng học tập nào?', fig: { type: 'tokens', row: ['✏️'] }, o: ['bút chì', 'bút mực', 'thước kẻ', 'cục tẩy'], ex: 'Hình vẽ chiếc bút chì có đầu nhọn.' },
  { w: 2, m: 'tv', lv: 2, t: 'Từ chỉ sự vật', q: 'Dòng nào gồm các từ chỉ đồ vật?', o: ['bút, vở, thước', 'bút, viết, đọc', 'mẹ, bố, anh', 'đỏ, xanh, vàng'], ex: 'Bút, vở, thước đều là đồ vật; viết, đọc là hoạt động.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Hình bên có những con vật nào?', fig: { type: 'tokens', row: ['🐘', '🦒', '🐒'] }, o: ['voi, hươu cao cổ, khỉ', 'voi, ngựa, khỉ', 'trâu, hươu cao cổ, khỉ', 'voi, hươu cao cổ, gấu'], ex: 'Hình vẽ con voi, con hươu cao cổ và con khỉ.' },
  { w: 4, m: 'tv', lv: 2, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ cây cối?', o: ['cây bàng', 'tưới cây', 'con sáo', 'quả bóng'], ex: 'Cây bàng là tên cây; tưới cây là hoạt động.' },
  { w: 3, m: 'tv', lv: 1, t: 'Bộ phận cơ thể', q: 'Từ nào chỉ bộ phận cơ thể?', o: ['bàn tay', 'vẫy tay', 'bàn học', 'cái mũ'], ex: 'Bàn tay là bộ phận cơ thể; vẫy tay là hoạt động.' },
  { w: 3, m: 'tv', lv: 1, t: 'Bộ phận cơ thể', q: 'Hình bên là bộ phận nào của cơ thể?', fig: { type: 'tokens', row: ['👂'] }, o: ['cái tai', 'cái mũi', 'cái miệng', 'con mắt'], ex: 'Hình vẽ cái tai, dùng để nghe.' },
  { w: 3, m: 'tv', lv: 2, t: 'Bộ phận cơ thể', q: 'Con voi dùng bộ phận nào dài và mềm để lấy thức ăn?', o: ['cái vòi', 'cái ngà', 'cái đuôi', 'cái tai'], ex: 'Voi dùng vòi để cuốn lá, lấy thức ăn và uống nước.' },

  // ── Từ chỉ hoạt động (tuần 2–5) ──
  { w: 2, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động?', o: ['quét nhà', 'cái chổi', 'sạch sẽ', 'ngôi nhà'], ex: 'Quét nhà là việc làm; cái chổi là đồ vật.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Bạn nhỏ trong hình đang làm gì?', fig: { type: 'tokens', row: ['🏊'] }, o: ['bơi', 'chạy', 'nhảy dây', 'đá bóng'], ex: 'Bạn nhỏ đang bơi dưới nước.' },
  { w: 3, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động của đôi chân?', o: ['đá', 'vẫy', 'nhìn', 'nghe'], ex: 'Chân dùng để đá, chạy, nhảy. Vẫy là của tay, nhìn là của mắt.' },
  { w: 5, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Trong câu "Cô giáo giảng bài cho cả lớp.", từ chỉ hoạt động là:', o: ['giảng bài', 'cô giáo', 'cả lớp', 'cho'], ex: 'Cô giáo làm gì? Giảng bài.' },
  { w: 8, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Trong câu "Bé đọc sách ở thư viện.", từ chỉ hoạt động là:', o: ['đọc', 'sách', 'thư viện', 'bé'], ex: 'Bé làm gì? Đọc (sách).' },
  { w: 4, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Bạn nhỏ trong hình đang làm gì?', fig: { type: 'tokens', row: ['🚴'] }, o: ['đạp xe', 'bơi lội', 'chạy bộ', 'đá bóng'], ex: 'Bạn nhỏ đang đạp xe.' },

  // ── Từ chỉ đặc điểm, âm thanh (tuần 3–7) ──
  { w: 3, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm?', o: ['xinh xắn', 'con voi', 'đi học', 'cái mũ'], ex: 'Xinh xắn cho biết sự vật thế nào.' },
  { w: 7, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Dòng nào gồm các từ chỉ đặc điểm?', o: ['cao, thấp, tròn', 'cao, nhảy, tròn', 'bàn, ghế, tủ', 'chạy, nhảy, bơi'], ex: 'Cao, thấp, tròn cho biết sự vật thế nào. Nhảy là hoạt động.' },
  { w: 7, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào tả đúng con vật trong hình?', fig: { type: 'tokens', row: ['🐢'] }, o: ['chậm chạp', 'nhanh nhẹn', 'cao lớn', 'líu lo'], ex: 'Con rùa bò rất chậm: chậm chạp.' },
  { w: 4, m: 'tv', lv: 1, t: 'Từ chỉ âm thanh', q: 'Từ nào tả tiếng gió thổi mạnh?', o: ['ào ào', 'líu lo', 'ríu rít', 'meo meo'], ex: 'Gió thổi mạnh nghe ào ào. Líu lo, ríu rít là tiếng chim.' },
  { w: 6, m: 'tv', lv: 1, t: 'Từ chỉ âm thanh', q: 'Tiếng trống trường kêu thế nào?', o: ['tùng tùng', 'reng reng', 'tích tắc', 'leng keng'], ex: 'Trống kêu tùng tùng; reng reng là chuông, tích tắc là đồng hồ.' },
  { w: 4, m: 'tv', lv: 2, t: 'Từ chỉ âm thanh', q: 'Từ nào tả tiếng suối chảy?', o: ['róc rách', 'lộp độp', 'ò ó o', 'cạc cạc'], ex: 'Suối chảy róc rách; mưa rơi lộp độp.' },

  // ── Câu giới thiệu, câu nêu hoạt động, câu nêu đặc điểm (tuần 1–9) ──
  { w: 1, m: 'tv', lv: 1, t: 'Câu giới thiệu', q: 'Câu nào là câu giới thiệu?', o: ['Tớ là học sinh lớp 2A.', 'Tớ đang đọc sách.', 'Tớ rất vui.', 'Bạn tên là gì?'], ex: 'Câu giới thiệu theo mẫu Ai là gì?: Tớ là học sinh lớp 2A.' },
  { w: 1, m: 'tv', lv: 2, t: 'Câu giới thiệu', q: 'Câu "Đây là bạn Minh." trả lời câu hỏi nào?', o: ['Ai là gì?', 'Ai làm gì?', 'Ai thế nào?', 'Ở đâu?'], ex: 'Câu giới thiệu trả lời câu hỏi Ai là gì?' },
  { w: 1, m: 'tv', lv: 2, t: 'Câu giới thiệu', q: 'Trong câu "Mẹ em là bác sĩ.", bộ phận nào trả lời câu hỏi "Là gì?"', o: ['là bác sĩ', 'Mẹ em', 'Mẹ', 'em'], ex: 'Mẹ em là gì? Là bác sĩ.' },
  { w: 2, m: 'tv', lv: 1, t: 'Câu nêu hoạt động', q: 'Câu nào là câu nêu hoạt động?', o: ['Các bạn đang tưới cây.', 'Cây bàng rất cao.', 'Đây là cây bàng.', 'Cây bàng ở đâu?'], ex: 'Các bạn làm gì? Đang tưới cây.' },
  { w: 5, m: 'tv', lv: 2, t: 'Câu nêu hoạt động', q: 'Trong câu "Chú bộ đội hát cho bé nghe.", bộ phận nào trả lời câu hỏi "Làm gì?"', o: ['hát cho bé nghe', 'Chú bộ đội', 'bé nghe', 'Chú'], ex: 'Chú bộ đội làm gì? Hát cho bé nghe.' },
  { w: 3, m: 'tv', lv: 1, t: 'Câu nêu đặc điểm', q: 'Câu nào là câu nêu đặc điểm?', o: ['Mái tóc bà bạc trắng.', 'Bà kể chuyện cổ tích.', 'Đây là bà của em.', 'Bà đi chợ.'], ex: 'Mái tóc bà thế nào? Bạc trắng.' },
  { w: 7, m: 'tv', lv: 2, t: 'Câu nêu đặc điểm', q: 'Câu "Sân trường em rộng và sạch." trả lời câu hỏi nào?', o: ['Cái gì thế nào?', 'Cái gì làm gì?', 'Cái gì là gì?', 'Ở đâu?'], ex: 'Sân trường thế nào? Rộng và sạch.' },
  { w: 8, m: 'tv', lv: 2, t: 'Ba kiểu câu', q: 'Câu nào thuộc kiểu câu Ai là gì?', o: ['Bố em là thợ điện.', 'Bố em sửa quạt.', 'Bố em rất khéo tay.', 'Bố em ở đâu?'], ex: 'Bố em là gì? Là thợ điện.' },
  { w: 8, m: 'tv', lv: 2, t: 'Ba kiểu câu', q: 'Câu nào thuộc kiểu câu Ai thế nào?', o: ['Hoa hồng rất thơm.', 'Bé tưới hoa hồng.', 'Đây là hoa hồng.', 'Hoa hồng ở đâu?'], ex: 'Hoa hồng thế nào? Rất thơm.' },
  { w: 8, m: 'tv', lv: 2, t: 'Ba kiểu câu', q: 'Câu "Lớp em đang tập văn nghệ." thuộc kiểu câu nào?', o: ['Ai làm gì?', 'Ai thế nào?', 'Ai là gì?', 'Ở đâu?'], ex: 'Lớp em làm gì? Đang tập văn nghệ.' },
  { w: 9, m: 'tv', lv: 3, t: 'Ba kiểu câu', q: 'Câu "Chú mèo mướp là bạn thân của em." thuộc kiểu câu nào?', o: ['Ai là gì?', 'Ai thế nào?', 'Ai làm gì?', 'Câu hỏi'], ex: 'Chú mèo mướp là gì? Là bạn thân của em.' },
  { w: 9, m: 'tv', lv: 3, t: 'Ba kiểu câu', q: 'Câu "Đôi mắt chú mèo tròn xoe." thuộc kiểu câu nào?', o: ['Ai thế nào?', 'Ai làm gì?', 'Ai là gì?', 'Câu hỏi'], ex: 'Đôi mắt chú mèo thế nào? Tròn xoe.' },

  // ── Câu bày tỏ cảm xúc, dấu câu (tuần 2–9) ──
  { w: 2, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Câu nào thể hiện sự ngạc nhiên, thích thú?', o: ['Ôi, cầu vồng đẹp quá!', 'Cầu vồng có bảy màu.', 'Cầu vồng ở đâu?', 'Bé vẽ cầu vồng.'], ex: 'Câu có từ "ôi, quá" và dấu chấm than thể hiện ngạc nhiên.' },
  { w: 5, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Cuối câu "Ôi, bông hoa đẹp quá" cần đặt dấu gì?', o: ['dấu chấm than', 'dấu chấm', 'dấu chấm hỏi', 'dấu phẩy'], ex: 'Câu bộc lộ cảm xúc kết thúc bằng dấu chấm than.' },
  { w: 7, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Cuối câu "Bạn học lớp nào" cần đặt dấu gì?', o: ['dấu chấm hỏi', 'dấu chấm', 'dấu chấm than', 'dấu phẩy'], ex: 'Câu dùng để hỏi kết thúc bằng dấu chấm hỏi.' },
  { w: 7, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Câu nào dùng đúng dấu câu?', o: ['Em thích học vẽ.', 'Em có thích học vẽ không.', 'Bạn thích học gì.', 'Bạn ở đâu.'], ex: 'Câu kể kết thúc bằng dấu chấm; câu hỏi phải dùng dấu chấm hỏi.' },
  { w: 7, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Ô (1) và ô (2) lần lượt cần đặt dấu gì?', fig: { type: 'text', lines: ['Hôm nay là thứ mấy (1)', 'Hôm nay là thứ Hai (2)'] },
    o: ['(1) chấm hỏi, (2) chấm', '(1) chấm, (2) chấm hỏi', '(1) chấm, (2) chấm', '(1) chấm hỏi, (2) chấm hỏi'], ex: 'Câu (1) là câu hỏi: dấu chấm hỏi. Câu (2) là câu kể: dấu chấm.' },
  { w: 9, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Câu nào là câu hỏi?', o: ['Mẹ ơi, mẹ đi đâu đấy?', 'Mẹ đi chợ.', 'Mẹ ơi, con yêu mẹ!', 'Mẹ mua cá.'], ex: 'Câu hỏi để hỏi điều chưa biết, cuối câu có dấu chấm hỏi.' },

  // ── Chính tả (tuần 5–9) ──
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả c/k', q: 'Từ nào viết đúng chính tả?', o: ['con kiến', 'con ciến', 'kon kiến', 'kon ciến'], ex: 'Viết k trước i, viết c trước o: con kiến.' },
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả c/k', q: 'Điền c hay k vào chỗ trống: …ây cầu', o: ['c', 'k', 'q', 'g'], ex: 'Viết k trước e, ê, i; trước â viết c: cây cầu.' },
  { w: 5, m: 'tv', lv: 3, t: 'Chính tả âm đầu', q: 'Điền ch hay tr: quả …anh, …ăm chỉ', o: ['ch, ch', 'tr, ch', 'ch, tr', 'tr, tr'], ex: 'Viết đúng: quả chanh, chăm chỉ.' },
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['trường học', 'chường học', 'trườn học', 'trường hộc'], ex: 'Viết đúng: trường học.' },
  { w: 6, m: 'tv', lv: 1, t: 'Chính tả g/gh', q: 'Điền g hay gh: con …à', o: ['g', 'gh', 'ng', 'k'], ex: 'Viết gh trước e, ê, i; trước a viết g: con gà.' },
  { w: 6, m: 'tv', lv: 2, t: 'Chính tả g/gh', q: 'Từ nào viết đúng chính tả?', o: ['gồ ghề', 'ghồ ghề', 'gồ gề', 'ghồ gề'], ex: 'Trước ô viết g (gồ), trước ê viết gh (ghề).' },
  { w: 7, m: 'tv', lv: 1, t: 'Chính tả ng/ngh', q: 'Điền ng hay ngh: …ỉ ngơi', o: ['ngh', 'ng', 'gh', 'nh'], ex: 'Viết ngh trước e, ê, i: nghỉ ngơi.' },
  { w: 7, m: 'tv', lv: 1, t: 'Chính tả ng/ngh', q: 'Từ nào viết đúng chính tả?', o: ['nghe nhạc', 'nge nhạc', 'nghe nhạt', 'ngê nhạc'], ex: 'Trước e viết ngh: nghe nhạc.' },
  { w: 8, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Điền l hay n: …o lắng, …ồi cơm', o: ['l, n', 'n, l', 'l, l', 'n, n'], ex: 'Viết đúng: lo lắng, nồi cơm.' },
  { w: 8, m: 'tv', lv: 1, t: 'Chính tả vần', q: 'Điền ăn hay ăng: mặt tr… sáng', o: ['ăng', 'ăn', 'ang', 'âng'], ex: 'Viết đúng: mặt trăng.' },

  // ── Viết hoa tên riêng (tuần 4) ──
  { w: 4, m: 'tv', lv: 2, t: 'Viết hoa tên riêng', q: 'Viết tên bạn "nguyễn văn nam" cho đúng thì cần viết hoa chữ cái đầu của những tiếng nào?', o: ['cả ba tiếng', '"nguyễn" và "nam"', 'chỉ tiếng "nguyễn"', 'chỉ tiếng "nam"'], ex: 'Tên người viết hoa chữ cái đầu của mỗi tiếng: Nguyễn Văn Nam.' },
  { w: 4, m: 'tv', lv: 1, t: 'Viết hoa tên riêng', q: 'Viết tên thành phố "hà nội" cho đúng thì cần viết hoa những chữ cái nào?', o: ['chữ h và chữ n', 'chỉ chữ h', 'chỉ chữ n', 'mọi chữ cái'], ex: 'Tên địa danh viết hoa chữ cái đầu mỗi tiếng: Hà Nội.' },
  { w: 4, m: 'tv', lv: 2, t: 'Viết hoa tên riêng', q: 'Câu "bạn lan ở đà nẵng." cần viết hoa mấy chữ cái?', o: ['4', '3', '2', '1'], ex: 'Viết hoa chữ đầu câu (B), tên người (L) và tên địa danh (Đ, N): Bạn Lan ở Đà Nẵng.' },
  { w: 4, m: 'tv', lv: 1, t: 'Viết hoa tên riêng', q: 'Từ ngữ nào là tên riêng, cần viết hoa?', o: ['cà mau', 'cánh đồng', 'con sông', 'thành phố'], ex: 'Cà Mau là tên một tỉnh nên phải viết hoa. Các từ còn lại là tên chung.' },

  // ── Đọc hiểu (tuần 1–4) ──
  { w: 1, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Ngày hôm qua đâu rồi?", bạn nhỏ cầm vật gì khi hỏi bố?', o: ['tờ lịch cũ', 'quyển vở', 'chiếc đồng hồ', 'bông hoa'], ex: 'Bạn nhỏ cầm tờ lịch cũ và hỏi bố: "Ngày hôm qua đâu rồi?".' },
  { w: 2, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Niềm vui của Bi và Bống", Bi nói dưới chân cầu vồng có gì?', o: ['bảy hũ vàng', 'bảy con chim', 'một con thuyền', 'bảy cây nến'], ex: 'Bi nói dưới chân cầu vồng có bảy hũ vàng.' },
  { w: 3, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Em có xinh không?", cuối cùng voi em nhận ra mình xinh nhất khi nào?', o: ['khi đúng là voi', 'khi có sừng như hươu', 'khi có râu như dê', 'khi đội mũ thật đẹp'], ex: 'Voi em hiểu: mình chỉ xinh đẹp khi đúng là voi.' },
  { w: 3, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Một giờ học", lúc đầu Quang cảm thấy thế nào khi nói trước lớp?', o: ['lúng túng, ngượng nghịu', 'tự tin, vui vẻ', 'buồn ngủ', 'tức giận'], ex: 'Lúc đầu Quang lúng túng, ngượng nghịu; được động viên, Quang tự tin hơn.' },
  { w: 4, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Cầu thủ dự bị", gấu con làm gì khi chưa được vào sân chơi bóng?', o: ['chạy đi nhặt bóng cho các bạn', 'ngồi khóc một mình', 'bỏ về nhà', 'đi ngủ'], ex: 'Gấu con chạy đi nhặt bóng cho các bạn và chăm chỉ tập luyện.' },
  { w: 4, m: 'tv', lv: 3, t: 'Đọc hiểu', q: 'Trong bài "Cây xấu hổ", vì sao cây xấu hổ tiếc quá?', o: ['Vì chưa kịp nhìn con chim xanh', 'Vì gió thổi gãy cành', 'Vì trời mưa to', 'Vì các bạn cây trêu nó'], ex: 'Cây xấu hổ co mình lại nên chưa kịp ngắm con chim xanh biếc đã bay đi.' },

  // ── Đọc đoạn văn, đoạn thơ (tuần 2–7) ──
  { w: 2, m: 'tv', lv: 1, t: 'Đọc đoạn văn', q: 'Theo đoạn văn, Hà làm những việc gì trước khi đi học?', fig: { type: 'text', lines: ['Sáng nay, Hà dậy sớm.', 'Hà quét sân, tưới cây', 'rồi mới đi học.'] },
    o: ['quét sân, tưới cây', 'nấu cơm, rửa bát', 'đọc sách, vẽ tranh', 'chơi bóng, thả diều'], ex: 'Đoạn văn viết: Hà quét sân, tưới cây rồi mới đi học.' },
  { w: 3, m: 'tv', lv: 1, t: 'Đọc đoạn văn', q: 'Trong đoạn văn, từ nào tả đôi mắt mèo?', fig: { type: 'text', lines: ['Chú mèo nhà em lông trắng muốt.', 'Đôi mắt mèo tròn xoe.', 'Mèo bắt chuột rất giỏi.'] },
    o: ['tròn xoe', 'trắng muốt', 'rất giỏi', 'bắt chuột'], ex: '"Đôi mắt mèo tròn xoe": tròn xoe tả mắt. Trắng muốt tả bộ lông.' },
  { w: 6, m: 'tv', lv: 1, t: 'Đọc thơ', q: 'Trong đoạn thơ, từ nào chỉ âm thanh?', fig: { type: 'text', lines: ['Trống ơi trống ngủ', 'Suốt cả mùa hè', 'Hôm nay trống gọi', 'Tùng! Tùng! Cả lớp nghe.'] },
    o: ['tùng', 'gọi', 'ngủ', 'mùa hè'], ex: '"Tùng! Tùng!" là tiếng trống. Gọi, ngủ là hoạt động.' },
  { w: 7, m: 'tv', lv: 1, t: 'Đọc thơ', q: 'Trong hai dòng thơ, từ nào tả mái ngói?', fig: { type: 'text', lines: ['Trường em mái ngói đỏ tươi,', 'Hàng cây xanh mát, nắng cười trên sân.'] },
    o: ['đỏ tươi', 'xanh mát', 'nắng cười', 'trên sân'], ex: '"Mái ngói đỏ tươi". Xanh mát tả hàng cây.' },

  // ── Mục lục, thời khoá biểu (tuần 5–8) ──
  { w: 5, m: 'tv', lv: 2, t: 'Thời khoá biểu, mục lục', q: 'Theo thời khoá biểu, thứ Ba tiết 2 là môn gì?', fig: { type: 'table', head: ['Thứ', 'Tiết 1', 'Tiết 2'], rows: [['Hai', 'Toán', 'Tiếng Việt'], ['Ba', 'Tiếng Việt', 'Âm nhạc'], ['Tư', 'Mĩ thuật', 'Toán']] },
    o: ['Âm nhạc', 'Tiếng Việt', 'Toán', 'Mĩ thuật'], ex: 'Dòng thứ Ba, cột Tiết 2: Âm nhạc.' },
  { w: 5, m: 'tv', lv: 1, t: 'Thời khoá biểu, mục lục', q: 'Theo thời khoá biểu, thứ mấy có tiết Mĩ thuật?', fig: { type: 'table', head: ['Thứ', 'Tiết 1', 'Tiết 2'], rows: [['Hai', 'Toán', 'Tiếng Việt'], ['Ba', 'Tiếng Việt', 'Âm nhạc'], ['Tư', 'Mĩ thuật', 'Toán']] },
    o: ['thứ Tư', 'thứ Ba', 'thứ Hai', 'thứ Năm'], ex: 'Mĩ thuật nằm ở dòng thứ Tư, tiết 1.' },
  { w: 8, m: 'tv', lv: 1, t: 'Thời khoá biểu, mục lục', q: 'Theo mục lục, bài "Gọi bạn" ở trang nào?', fig: { type: 'table', head: ['Tên bài', 'Trang'], rows: [['Cuốn sách của em', '32'], ['Khi trang sách mở ra', '33'], ['Gọi bạn', '40']] },
    o: ['40', '33', '32', '3'], ex: 'Dòng "Gọi bạn" ghi trang 40.' },
  { w: 8, m: 'tv', lv: 2, t: 'Thời khoá biểu, mục lục', q: 'Mục lục của cuốn sách cho em biết điều gì?', o: ['tên các bài và số trang', 'tên tác giả', 'giá tiền cuốn sách', 'tên nhà xuất bản'], ex: 'Mục lục ghi tên các bài (các mục) và số trang của chúng.' },
  { w: 8, m: 'tv', lv: 2, t: 'Thời khoá biểu, mục lục', q: 'Tên sách và tên tác giả thường được in ở đâu?', o: ['ở bìa sách', 'ở mục lục', 'ở trang giữa', 'ở thời khoá biểu'], ex: 'Tên sách, tên tác giả, tên nhà xuất bản in ở bìa sách.' },

  // ── Kể theo thứ tự, ôn giữa kì (tuần 3–9) ──
  { w: 3, m: 'tv', lv: 1, t: 'Thứ tự sự việc', q: 'Buổi sáng trước khi đi học, việc nào em nên làm đầu tiên?', o: ['rửa mặt, đánh răng', 'mặc đồng phục', 'ăn sáng', 'đeo cặp đi học'], ex: 'Trước tiên rửa mặt, đánh răng; sau đó mặc đồng phục, ăn sáng rồi đi học.' },
  { w: 9, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ việc em làm ở nhà giúp mẹ?', o: ['nhặt rau', 'bó rau', 'rổ rau', 'rau xanh'], ex: 'Nhặt rau là việc làm. Bó rau, rổ rau, rau xanh chỉ sự vật.' },
  { w: 9, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm tính nết của người?', o: ['chăm chỉ', 'chăm sóc', 'học tập', 'bạn bè'], ex: 'Chăm chỉ cho biết người thế nào; chăm sóc là hoạt động.' },

  // ── Tuần 10: Gọi bạn, Tớ nhớ cậu ──
  { w: 10, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài thơ "Gọi bạn", vì sao Bê Vàng bị lạc?', o: ['vì đi tìm cỏ, quên đường về', 'vì đi học về muộn', 'vì mải đi chơi chợ', 'vì trời tối quá'], ex: 'Trời hạn, Bê Vàng đi tìm cỏ, lang thang quên đường về.' },
  { w: 10, m: 'tv', lv: 1, t: 'Từ chỉ tình cảm', q: 'Từ nào nói về tình cảm bạn bè?', o: ['thân thiết', 'đá bóng', 'lớp học', 'cao lớn'], ex: 'Thân thiết nói về tình cảm gắn bó giữa bạn bè.' },
  { w: 10, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['con hươu', 'con hưu', 'con hiêu', 'con hiu'], ex: 'Vần ươu: con hươu, bướu cổ.' },
  { w: 10, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['cái xẻng', 'cái xẻn', 'cái sẻng', 'cái xẽng'], ex: 'Viết đúng: cái xẻng (âm x, vần eng, dấu hỏi).' },
  { w: 10, m: 'tv', lv: 2, t: 'Chính tả c/k', q: 'Từ nào viết đúng chính tả?', o: ['con cò', 'kon cò', 'con kò', 'kon kò'], ex: 'Trước o phải viết c: con cò. Chỉ viết k trước e, ê, i (kéo, kẹo).' },
  { w: 10, m: 'tv', lv: 2, t: 'Đọc thơ', q: 'Trong hai dòng thơ, ai đã giúp kiến đen?', fig: { type: 'text', lines: ['Kiến đen gặp lúc mưa to,', 'Bồ câu thả lá, kiến bò lên ngay.'] },
    o: ['bồ câu', 'chiếc lá', 'mưa to', 'kiến đen'], ex: 'Bồ câu thả lá xuống cho kiến bò lên.' },

  // ── Tuần 11: Chữ A và những người bạn, Nhím nâu kết bạn ──
  { w: 11, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Trong bài "Chữ A và những người bạn", chữ A đứng ở đâu trong bảng chữ cái?', o: ['đứng đầu', 'đứng cuối', 'đứng giữa', 'đứng thứ hai'], ex: 'Chữ A đứng đầu bảng chữ cái.' },
  { w: 11, m: 'tv', lv: 1, t: 'Từ chỉ cảm xúc', q: 'Gương mặt trong hình cho thấy cảm xúc gì?', fig: { type: 'tokens', row: ['😢'] }, o: ['buồn', 'vui', 'tức giận', 'ngạc nhiên'], ex: 'Gương mặt rơi nước mắt: buồn.' },
  { w: 11, m: 'tv', lv: 2, t: 'Từ chỉ cảm xúc', q: 'Gương mặt trong hình cho thấy cảm xúc gì?', fig: { type: 'tokens', row: ['😲'] }, o: ['ngạc nhiên', 'sợ hãi', 'vui vẻ', 'buồn bã'], ex: 'Mắt mở to, miệng tròn: ngạc nhiên.' },
  { w: 11, m: 'tv', lv: 1, t: 'Từ chỉ cảm xúc', q: 'Từ nào chỉ cảm xúc?', o: ['vui mừng', 'chạy nhảy', 'nhà cửa', 'xanh tươi'], ex: 'Vui mừng là cảm xúc; chạy nhảy là hoạt động.' },
  { w: 11, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Từ nào có nghĩa trái ngược với "vui mừng"?', o: ['buồn bã', 'hớn hở', 'phấn khởi', 'vui vẻ'], ex: 'Hớn hở, phấn khởi, vui vẻ gần nghĩa với vui mừng. Trái ngược là buồn bã.' },
  { w: 11, m: 'tv', lv: 2, t: 'Chính tả g/gh', q: 'Điền g hay gh: …ế đá, …ọn gàng', o: ['gh, g', 'g, gh', 'gh, gh', 'g, g'], ex: 'Trước ê viết gh (ghế đá), trước o viết g (gọn gàng).' },
  { w: 11, m: 'tv', lv: 3, t: 'Chính tả g/gh', q: 'Vì sao từ "ghé thăm" viết bằng gh?', o: ['Vì đứng trước e', 'Vì là từ chỉ hoạt động', 'Vì có dấu sắc', 'Vì đứng đầu câu'], ex: 'Quy tắc: viết gh trước e, ê, i. "ghé" có e nên viết gh.' },
  { w: 11, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Điền iu hay ưu vào chỗ trống: con c… (con vật có bộ lông xoăn)', o: ['ưu', 'iu', 'iêu', 'ươu'], ex: 'Viết đúng: con cừu.' },
  { w: 11, m: 'tv', lv: 3, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['cái chiêng', 'cái chiên', 'cái chiềng', 'cái chêng'], ex: 'Vần iêng: cái chiêng (nhạc cụ gõ).' },
  { w: 11, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Nhím nâu kết bạn", nhím nâu kết bạn với ai?', o: ['nhím trắng', 'sóc nâu', 'thỏ trắng', 'gấu con'], ex: 'Nhím nâu nhút nhát, được nhím trắng giúp đỡ và hai bạn kết bạn với nhau.' },

  // ── Tuần 12: Thả diều, Tớ là lê-gô ──
  { w: 12, m: 'tv', lv: 2, t: 'Đọc thơ', q: 'Trong hai dòng thơ, cánh diều được so sánh với gì?', fig: { type: 'text', lines: ['Diều em no gió trên cao,', 'Như con thuyền nhỏ lướt vào trời xanh.'] },
    o: ['con thuyền nhỏ', 'trời xanh', 'ngọn gió', 'em bé'], ex: 'Từ "như" nối cánh diều với con thuyền nhỏ.' },
  { w: 12, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ đồ chơi?', o: ['con diều', 'thả diều', 'bầu trời', 'bay cao'], ex: 'Con diều là đồ chơi; thả diều là hoạt động.' },
  { w: 12, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Hình bên là đồ chơi gì?', fig: { type: 'tokens', row: ['🪁'] }, o: ['con diều', 'chong chóng', 'quả bóng', 'con quay'], ex: 'Hình vẽ con diều có dây và đuôi.' },
  { w: 12, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Trong câu "Cánh diều đỏ thắm bay trên trời.", từ chỉ đặc điểm là:', o: ['đỏ thắm', 'cánh diều', 'bay', 'trời'], ex: 'Cánh diều thế nào? Đỏ thắm. "Bay" là hoạt động.' },
  { w: 12, m: 'tv', lv: 2, t: 'Chính tả ng/ngh', q: 'Điền ng hay ngh: bắp …ô, củ …ệ', o: ['ng, ngh', 'ngh, ng', 'ng, ng', 'ngh, ngh'], ex: 'Trước ô viết ng (ngô), trước ê viết ngh (nghệ).' },
  { w: 12, m: 'tv', lv: 2, t: 'Chính tả ng/ngh', q: 'Chữ ngh được viết trước những chữ cái nào?', o: ['e, ê, i', 'a, o, u', 'ô, ơ, ư', 'ă, â, a'], ex: 'Viết ngh trước e, ê, i; viết ng trước các chữ còn lại.' },
  { w: 12, m: 'tv', lv: 2, t: 'Câu nêu đặc điểm', q: 'Trong câu "Chú gà trống rất oai vệ.", bộ phận nào trả lời câu hỏi "Thế nào?"', o: ['rất oai vệ', 'Chú gà trống', 'gà trống', 'Chú gà'], ex: 'Chú gà trống thế nào? Rất oai vệ.' },
  { w: 12, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Từ nào có nghĩa trái ngược với "chăm chỉ"?', o: ['lười biếng', 'siêng năng', 'cần cù', 'chịu khó'], ex: 'Siêng năng, cần cù, chịu khó giống nghĩa chăm chỉ. Trái ngược là lười biếng.' },
  { w: 12, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào có nghĩa trái ngược với "cao"?', o: ['thấp', 'to', 'lớn', 'dài'], ex: 'Cao trái ngược với thấp.' },

  // ── Tuần 13: Rồng rắn lên mây, Nặn đồ chơi ──
  { w: 13, m: 'tv', lv: 2, t: 'Dấu phẩy', q: 'Câu nào đặt dấu phẩy đúng?', o: ['Em có bút, thước, vở.', 'Em có bút thước, vở.', 'Em có, bút thước vở.', 'Em, có bút thước vở.'], ex: 'Dấu phẩy ngăn cách các từ cùng loại: bút, thước, vở.' },
  { w: 13, m: 'tv', lv: 2, t: 'Dấu phẩy', q: 'Dấu phẩy trong câu "Mẹ mua cam, xoài, ổi." dùng để làm gì?', o: ['ngăn cách các từ cùng loại', 'kết thúc câu', 'hỏi điều chưa biết', 'bộc lộ cảm xúc'], ex: 'Cam, xoài, ổi là các từ cùng chỉ quả, dấu phẩy ngăn cách chúng.' },
  { w: 13, m: 'tv', lv: 3, t: 'Dấu phẩy', q: 'Cần đặt dấu phẩy ở đâu trong câu bên?', fig: { type: 'text', lines: ['Vườn nhà em có cam bưởi nhãn.'] },
    o: ['sau "cam" và "bưởi"', 'sau "có" và "cam"', 'sau "em" và "cam"', 'sau "bưởi" và "nhãn"'], ex: 'Ngăn cách ba loại quả: Vườn nhà em có cam, bưởi, nhãn.' },
  { w: 13, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Điền s hay x: hoa …en, …e đạp', o: ['s, x', 'x, s', 's, s', 'x, x'], ex: 'Viết đúng: hoa sen, xe đạp.' },
  { w: 13, m: 'tv', lv: 3, t: 'Chính tả âm đầu', q: 'Điền d hay gi: cơn …ó, …a đình', o: ['gi, gi', 'd, gi', 'gi, d', 'd, d'], ex: 'Viết đúng: cơn gió, gia đình.' },
  { w: 13, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['vườn rau', 'vường rau', 'vờn rau', 'vườm rau'], ex: 'Vần ươn: vườn rau.' },
  { w: 13, m: 'tv', lv: 2, t: 'Thứ tự sự việc', q: 'Khi nặn con vật bằng đất, việc nào làm trước tiên?', o: ['nhào đất cho dẻo', 'phơi khô con vật', 'tô màu cho con vật', 'bày lên bàn'], ex: 'Trước tiên nhào đất cho dẻo, rồi nặn, phơi khô, tô màu và bày lên.' },
  { w: 13, m: 'tv', lv: 1, t: 'Đọc đoạn văn', q: 'Trong đoạn văn, từ nào chỉ hoạt động?', fig: { type: 'text', lines: ['Chúng em xếp hàng, bám vai nhau,', 'vừa đi vừa hát "Rồng rắn lên mây".'] },
    o: ['xếp hàng', 'chúng em', 'vai', 'mây'], ex: 'Xếp hàng là việc làm. Chúng em, vai, mây chỉ sự vật.' },

  // ── Tuần 14: Sự tích hoa tỉ muội, Em mang về yêu thương ──
  { w: 14, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong "Sự tích hoa tỉ muội", chị Nết làm gì khi nước lũ dâng lên?', o: ['cõng em Na chạy', 'ngồi khóc', 'bỏ em ở nhà', 'trèo lên cây một mình'], ex: 'Nết cõng em Na chạy theo dân làng, chân bị đau vẫn không bỏ em.' },
  { w: 14, m: 'tv', lv: 1, t: 'Từ chỉ tình cảm', q: 'Từ nào nói về tình cảm anh chị em?', o: ['nhường nhịn', 'tranh giành', 'cãi nhau', 'giận dỗi'], ex: 'Anh chị em thương yêu, nhường nhịn nhau.' },
  { w: 14, m: 'tv', lv: 2, t: 'Họ nội, họ ngoại', q: 'Em trai của mẹ, em gọi là gì?', o: ['cậu', 'chú', 'bác', 'dượng'], ex: 'Em trai của mẹ là cậu; em trai của bố mới là chú.' },
  { w: 14, m: 'tv', lv: 2, t: 'Họ nội, họ ngoại', q: 'Em gái của bố, em gọi là gì?', o: ['cô', 'dì', 'mợ', 'thím'], ex: 'Em gái của bố là cô; em gái của mẹ là dì.' },
  { w: 14, m: 'tv', lv: 1, t: 'Họ nội, họ ngoại', q: 'Bố của mẹ, em gọi là gì?', o: ['ông ngoại', 'ông nội', 'bác', 'cậu'], ex: 'Họ hàng bên mẹ là bên ngoại: bố của mẹ là ông ngoại.' },
  { w: 14, m: 'tv', lv: 2, t: 'Họ nội, họ ngoại', q: 'Em gái của mẹ, em gọi là gì?', o: ['dì', 'cô', 'thím', 'mợ'], ex: 'Em gái của mẹ là dì.' },
  { w: 14, m: 'tv', lv: 3, t: 'Họ nội, họ ngoại', q: 'Vợ của chú, em gọi là gì?', o: ['thím', 'mợ', 'dì', 'cô'], ex: 'Vợ của chú là thím; vợ của cậu là mợ.' },
  { w: 14, m: 'tv', lv: 3, t: 'Chính tả vần', q: 'Điền iên, yên hay uyên: bình …', o: ['yên', 'iên', 'uyên', 'iêng'], ex: 'Tiếng không có âm đầu viết yên: bình yên.' },
  { w: 14, m: 'tv', lv: 3, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['chim yến', 'chim iến', 'chim uyến', 'chim yếng'], ex: 'Tiếng không có âm đầu viết yên: chim yến.' },
  { w: 14, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm của bông hoa?', o: ['thơm ngát', 'hái hoa', 'cánh hoa', 'tưới hoa'], ex: 'Thơm ngát cho biết hoa thế nào. Hái, tưới là hoạt động.' },

  // ── Tuần 15: Mẹ, Trò chơi của bố ──
  { w: 15, m: 'tv', lv: 3, t: 'Đọc hiểu', q: 'Câu thơ "Mẹ là ngọn gió của con suốt đời" muốn nói điều gì?', o: ['Mẹ luôn yêu thương, chăm sóc con', 'Mẹ biết thổi ra gió', 'Mẹ thích trời có gió', 'Mẹ hay đi ra ngoài'], ex: 'Mẹ quạt mát cho con ngủ; câu thơ nói mẹ luôn che chở, yêu thương con suốt đời.' },
  { w: 15, m: 'tv', lv: 2, t: 'Đọc thơ', q: 'Trong hai dòng thơ, từ nào chỉ hoạt động của mẹ?', fig: { type: 'text', lines: ['Ngoài kia nắng đã lên cao,', 'Mẹ còn lặn lội ruộng sâu cấy cày.'] },
    o: ['cấy cày', 'nắng', 'ruộng sâu', 'lên cao'], ex: 'Mẹ làm gì? Cấy cày. "Lên cao" là của nắng.' },
  { w: 15, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Từ nào tả nắng mùa hè?', o: ['chói chang', 'mát mẻ', 'lạnh buốt', 'ẩm ướt'], ex: 'Nắng mùa hè gắt, chói chang.' },
  { w: 15, m: 'tv', lv: 1, t: 'Nói và đáp', q: 'Câu nào chào ông bà lễ phép nhất?', o: ['Dạ, cháu chào ông bà ạ!', 'Chào ông bà!', 'Ông bà đi đâu đấy?', 'Ê, ông bà ơi!'], ex: 'Nói với người lớn thêm "dạ, ạ" cho lễ phép.' },
  { w: 15, m: 'tv', lv: 2, t: 'Từ chỉ tình cảm', q: 'Từ nào chỉ tình cảm gia đình?', o: ['yêu thương', 'chăm chỉ', 'vui chơi', 'sạch sẽ'], ex: 'Người trong gia đình yêu thương nhau. Chăm chỉ nói về tính nết.' },
  { w: 15, m: 'tv', lv: 2, t: 'Nói và đáp', q: 'Mẹ nấu cơm cho em. Câu nào là lời cảm ơn có nói rõ lí do?', o: ['Con cảm ơn mẹ đã nấu cơm cho con!', 'Mẹ ơi, con đói quá!', 'Mẹ nấu cơm đi!', 'Cơm hôm nay ngon.'], ex: 'Lời biết ơn: Con cảm ơn (mẹ) vì/đã … Câu đầu nói rõ lí do.' },

  // ── Tuần 16: Cánh cửa nhớ bà, Thương ông ──
  { w: 16, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Cánh cửa nhớ bà", khi cháu còn bé thì ai cài then trên?', o: ['bà', 'cháu', 'bố', 'mẹ'], ex: 'Cháu còn bé cài then dưới, bà cài then trên.' },
  { w: 16, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Trong bài "Thương ông", bạn Việt làm gì khi ông bị đau chân?', o: ['lon ton lại gần giúp ông', 'chạy ra ngoài chơi', 'gọi bác sĩ', 'khóc to'], ex: 'Việt âu yếm, lon ton, nhanh nhảu lại gần đỡ ông.' },
  { w: 16, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ việc em làm với cánh cửa?', o: ['khép', 'cánh', 'then', 'gỗ'], ex: 'Khép (cửa) là hoạt động; cánh, then, gỗ chỉ sự vật.' },
  { w: 16, m: 'tv', lv: 3, t: 'Từ tả dáng vẻ', q: 'Từ nào tả dáng đi của người bị đau chân?', o: ['khập khiễng', 'lon ton', 'nhanh nhảu', 'tung tăng'], ex: 'Đau chân thì đi khập khiễng. Lon ton, tung tăng là dáng em bé vui vẻ.' },
  { w: 16, m: 'tv', lv: 2, t: 'Từ tả dáng vẻ', q: 'Từ nào tả dáng đi của em bé?', o: ['lon ton', 'khập khiễng', 'lom khom', 'cao lớn'], ex: 'Em bé đi lon ton, bước ngắn và nhanh.' },
  { w: 16, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Điền ch hay tr: …ò chơi, cây …e', o: ['tr, tr', 'ch, tr', 'tr, ch', 'ch, ch'], ex: 'Viết đúng: trò chơi, cây tre.' },
  { w: 16, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Điền ac hay at: bãi c… ven biển', o: ['at', 'ac', 'ăt', 'âc'], ex: 'Viết đúng: bãi cát.' },
  { w: 16, m: 'tv', lv: 2, t: 'Câu nêu hoạt động', q: 'Bộ phận nào ghép với "Ông em" để thành câu nêu hoạt động?', o: ['tưới cây ngoài vườn.', 'là thợ mộc.', 'rất hiền.', 'ơi!'], ex: 'Ông em làm gì? Tưới cây ngoài vườn.' },

  // ── Tuần 17: Ánh sáng của yêu thương, Chơi chong chóng ──
  { w: 17, m: 'tv', lv: 3, t: 'Đọc hiểu', q: 'Trong bài "Ánh sáng của yêu thương", Ê-đi-xơn làm gì để phòng sáng hơn?', o: ['đặt đèn nến trước gương', 'thắp thêm đuốc', 'mở cửa sổ', 'đốt lửa trại'], ex: 'Ê-đi-xơn mượn gương, đặt đèn nến trước gương; ánh sáng hắt lại sáng trưng.' },
  { w: 17, m: 'tv', lv: 1, t: 'Viết tin nhắn', q: 'Đoạn chữ bên là gì?', fig: { type: 'text', lines: ['Bà ơi, cháu nhớ bà nhiều!', 'Chủ nhật này cháu về thăm bà.', 'Cháu: Minh'] },
    o: ['tin nhắn', 'bài thơ', 'thời khoá biểu', 'mục lục'], ex: 'Có người nhận (bà), lời nhắn và tên người viết (Minh): đó là tin nhắn.' },
  { w: 17, m: 'tv', lv: 2, t: 'Viết tin nhắn', q: 'Tin nhắn để lại cho mẹ cần có những gì?', o: ['viết cho ai, việc gì, tên người viết', 'chỉ cần tên người viết', 'một bức tranh', 'một bài thơ'], ex: 'Tin nhắn cần nói rõ viết cho ai, việc gì, rồi ghi tên người viết.' },
  { w: 17, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['miền núi', 'mìên núi', 'miềng núi', 'yền núi'], ex: 'Có âm đầu m nên viết iên: miền núi.' },
  { w: 17, m: 'tv', lv: 3, t: 'Dấu câu', q: 'Khi viết lời nói của nhân vật, đầu mỗi lời nói em đặt dấu gì?', o: ['dấu gạch đầu dòng', 'dấu chấm', 'dấu phẩy', 'dấu chấm hỏi'], ex: 'Mỗi lời nói của nhân vật bắt đầu bằng dấu gạch đầu dòng.' },

  // ── Tuần 18: Ôn tập cuối học kì I ──
  { w: 18, m: 'tv', lv: 3, t: 'Đọc đoạn văn', q: 'Đoạn văn bên có mấy câu?', fig: { type: 'text', lines: ['Mùa thu, trời xanh và cao.', 'Gió nhẹ thổi, lá vàng rơi.', 'Em cùng bạn đến trường.'] },
    o: ['3', '4', '6', '2'], ex: 'Đếm dấu chấm cuối câu: có 3 câu. Dấu phẩy không kết thúc câu.' },
  { w: 18, m: 'tv', lv: 2, t: 'Ba kiểu câu', q: 'Câu "Ông em là bác nông dân." thuộc kiểu câu nào?', o: ['Ai là gì?', 'Ai làm gì?', 'Ai thế nào?', 'Câu hỏi'], ex: 'Ông em là gì? Là bác nông dân.' },
  { w: 18, m: 'tv', lv: 3, t: 'Từ chỉ đặc điểm', q: 'Dòng nào gồm toàn từ chỉ đặc điểm?', o: ['hiền lành, chăm chỉ, ngoan', 'hiền lành, chăm sóc, ngoan', 'ngoan, học, hiền', 'bút, mực, vở'], ex: 'Hiền lành, chăm chỉ, ngoan đều cho biết người thế nào. Chăm sóc, học là hoạt động.' },
  { w: 18, m: 'tv', lv: 2, t: 'Từ chỉ sự vật', q: 'Trong câu "Bà bán cho em một cành đào.", các từ chỉ người là:', o: ['bà, em', 'cành đào', 'bán', 'một'], ex: 'Bà và em chỉ người; cành đào chỉ vật; bán là hoạt động.' },
  { w: 18, m: 'tv', lv: 3, t: 'Chính tả ng/ngh', q: 'Từ nào viết đúng chính tả?', o: ['nghiêng ngả', 'nghiên ngả', 'ngiêng ngả', 'nghiêng nghả'], ex: 'Trước i viết ngh (nghiêng), trước a viết ng (ngả).' },
  { w: 18, m: 'tv', lv: 3, t: 'Dấu câu', q: 'Ô (1) và ô (2) lần lượt cần đặt dấu gì?', fig: { type: 'text', lines: ['Ôi, chong chóng quay nhanh quá (1)', 'Bạn làm chong chóng thế nào (2)'] },
    o: ['(1) chấm than, (2) chấm hỏi', '(1) chấm, (2) chấm hỏi', '(1) chấm hỏi, (2) chấm than', '(1) chấm than, (2) chấm'], ex: 'Câu (1) bộc lộ cảm xúc: dấu chấm than. Câu (2) để hỏi: dấu chấm hỏi.' },
  { w: 18, m: 'tv', lv: 3, t: 'Xếp tên theo chữ cái', q: 'Xếp các tên Yến, Sơn, Phúc, Quân theo bảng chữ cái thì tên nào đứng thứ hai?', o: ['Quân', 'Sơn', 'Phúc', 'Yến'], ex: 'Thứ tự: P, Q, S, Y. Đứng thứ hai là Quân.' },
  { w: 18, m: 'tv', lv: 1, t: 'Bảng chữ cái', q: 'Chữ cái nào đứng giữa chữ "l" và chữ "n" trong bảng chữ cái?', o: ['m', 'k', 'o', 'ơ'], ex: 'Thứ tự: l, m, n.' },
  { w: 18, m: 'tv', lv: 2, t: 'Họ nội, họ ngoại', q: 'Bà ngoại là mẹ của ai?', o: ['mẹ em', 'bố em', 'cô em', 'chú em'], ex: 'Bên ngoại là họ hàng bên mẹ: bà ngoại là mẹ của mẹ em.' },

  // ── Bổ sung câu có hình ──
  { w: 9, m: 'toan', lv: 1, t: 'Ki-lô-gam', q: 'Cân thăng bằng. Chiếc cặp sách nặng mấy ki-lô-gam?', fig: { type: 'balance', left: ['🎒'], right: ['1 kg', '1 kg', '1 kg'], tilt: 0 },
    o: ['3 kg', '1 kg', '4 kg', '2 kg'], ex: 'Đĩa bên kia có ba quả cân 1 kg: 1 + 1 + 1 = 3 kg.' },
  { w: 16, m: 'toan', lv: 2, t: 'Xem giờ', q: 'Em đến lớp lúc đồng hồ chỉ như hình. Đó là mấy giờ?', fig: { type: 'clock', h: 8, m: 15 },
    o: ['8 giờ 15 phút', '8 giờ 3 phút', '3 giờ 40 phút', '9 giờ 15 phút'], ex: 'Kim ngắn vừa qua số 8, kim dài chỉ số 3 là 15 phút: 8 giờ 15 phút.' },
  { w: 15, m: 'toan', lv: 3, t: 'Xem giờ', q: 'Đồng hồ chỉ giờ buổi chiều. Đó là mấy giờ?', fig: { type: 'clock', h: 6, m: 30 },
    o: ['18 giờ 30 phút', '6 giờ 30 phút sáng', '16 giờ 30 phút', '19 giờ 30 phút'], ex: 'Đồng hồ chỉ 6 giờ 30 phút. Buổi chiều: 12 + 6 = 18, tức 18 giờ 30 phút.' },
  { w: 13, m: 'toan', lv: 3, t: 'Điểm, đoạn thẳng', q: 'Hình bên có bao nhiêu đoạn thẳng?', fig: { type: 'lines', pts: { A: [0, 3], B: [2, 2], C: [4, 1], D: [6, 0] }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D']] },
    o: ['6', '3', '4', '5'], ex: 'Các đoạn: AB, AC, AD, BC, BD, CD. Có 6 đoạn thẳng.' },
  { w: 11, m: 'toan', lv: 2, t: 'Đặt tính', q: 'Kết quả phép tính đặt cột bên là bao nhiêu?', fig: { type: 'vcalc', a: 38, b: 45, op: '+', res: '?' },
    o: ['83', '73', '713', '82'], ex: '8 + 5 = 13, viết 3 nhớ 1; 3 + 4 = 7, thêm 1 là 8: được 83.' },
  { w: 12, m: 'toan', lv: 3, t: 'Trừ có nhớ', q: 'Số nào thay cho dấu hỏi?', fig: { type: 'tokens', row: ['?', '−', '27', '=', '45'] },
    o: ['72', '18', '62', '82'], ex: 'Số bị trừ = hiệu + số trừ: 45 + 27 = 72.' },
  { w: 9, m: 'tv', lv: 1, t: 'Từ chỉ âm thanh', q: 'Con vật trong hình kêu thế nào?', fig: { type: 'tokens', row: ['🐓'] },
    o: ['ò ó o', 'cục tác', 'meo meo', 'gâu gâu'], ex: 'Gà trống gáy ò ó o; gà mái mới kêu cục tác.' },
  { w: 12, m: 'tv', lv: 2, t: 'Đọc đoạn văn', q: 'Trong đoạn văn, từ nào chỉ màu sắc?', fig: { type: 'text', lines: ['Miếng lê-gô nhỏ xíu,', 'màu đỏ tươi, xếp thành ngôi nhà.'] },
    o: ['đỏ tươi', 'nhỏ xíu', 'ngôi nhà', 'xếp'], ex: 'Đỏ tươi là màu sắc. Nhỏ xíu là đặc điểm về kích thước.' },
];
