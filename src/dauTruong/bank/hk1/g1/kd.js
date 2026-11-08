/**
 * 🏆 Đấu Trường Nhí · lớp 1 · Khởi động · học kì I (Kết nối tri thức). Kiểm: node scripts/dautruong-check.mjs 1
 * Toán HK I: số 0–10 (tuần 1–2), nhiều hơn ít hơn (3), so sánh (4), mấy và mấy (5), luyện tập (6), hình phẳng (7–8),
 * phép cộng (9–10), phép trừ (11–12), bảng cộng trừ (13–14), khối (15), vị trí (16), ôn (17–18).
 * Tiếng Việt HK I: làm quen, a (1), b c e ê (2), o ô ơ d đ (3), i k h l u ư ch kh (4), m n g gh gi nh ng ngh (5),
 * r s t tr th ia ua ưa (6), ph qu v x y (7), rồi vần từ an ăn ân (8) đến uyên uyêt (17), ôn (18).
 * o[0] là đáp án đúng, o[1] là nhiễu dễ mắc nhất.
 */
const M = (w, lv, t, q, o, ex, fig) => ({ w, m: 'toan', lv, t, q, o, ex, ...(fig ? { fig } : {}) });
const V = (w, lv, t, q, o, ex, fig) => ({ w, m: 'tv', lv, t, q, o, ex, ...(fig ? { fig } : {}) });
const rep = (t, n) => Array(n).fill(t);
const tk = (...row) => ({ type: 'tokens', row: row.flat() });
const tks = (...rows) => ({ type: 'tokens', rows });
const txt = (...lines) => ({ type: 'text', lines });

export default [
  /* ======================= TUẦN 1 ======================= */
  M(1, 1, 'Đếm số lượng', 'Hình bên có mấy con cá?', ['4', '3', '5', '6'], 'Đếm từng con: 1, 2, 3, 4. Có 4 con cá.', tk(rep('🐟', 4))),
  M(1, 1, 'Đếm số lượng', 'Trong hình có mấy quả cam?', ['5', '4', '6', '3'], 'Chỉ tay vào từng quả và đếm: 1, 2, 3, 4, 5. Có 5 quả cam.', tk(rep('🍊', 5))),
  M(1, 2, 'Đếm số lượng', 'Có mấy con gà con đi theo gà mẹ?', ['3', '4', '2', '5'], 'Gà mẹ to đi đầu, không đếm. Gà con: 1, 2, 3. Có 3 con gà con.', tk('🐔', rep('🐤', 3))),
  M(1, 1, 'Số 0', 'Cành cây có 2 con chim. Cả 2 con bay đi hết. Trên cành còn mấy con chim?', ['0', '2', '1', '3'], 'Bay đi hết thì không còn con nào. Không còn con nào viết là số 0.'),
  M(1, 1, 'Đọc viết số', 'Số "năm" viết là số nào?', ['5', '2', '3', '4'], 'Số năm viết là 5. Chữ số 2 dễ nhầm với 5 vì nét cong ngược nhau.'),
  M(1, 1, 'Đếm số lượng', 'Có mấy ngôi sao?', ['3', '2', '4', '5'], 'Đếm: 1, 2, 3. Có 3 ngôi sao.', tk(rep('star', 3))),
  M(1, 1, 'Thứ tự số', 'Đếm 1, 2, 3, … Số tiếp theo sau số 3 là số nào?', ['4', '2', '5', '1'], 'Đếm xuôi: 1, 2, 3, 4. Sau 3 là 4.'),
  M(1, 2, 'Tia số', 'Số nào thay cho dấu hỏi?', ['3', '4', '2', '5'], 'Các số trên tia số tăng dần 0, 1, 2, 3, 4, 5. Ô hỏi nằm giữa 2 và 4 nên là 3.', { type: 'numline', from: 0, to: 5, ask: [3] }),

  V(1, 1, 'Đồ dùng học tập', 'Hình bên là đồ dùng học tập nào?', ['bút chì', 'thước kẻ', 'cục tẩy', 'quyển vở'], 'Hình vẽ cây bút chì, dùng để viết và vẽ.', tk('✏️')),
  V(1, 1, 'Tư thế ngồi viết', 'Khi ngồi viết, bạn cần ngồi thế nào?', ['ngồi thẳng lưng', 'cúi sát mặt xuống vở', 'nằm bò ra bàn', 'ngả người ra sau'], 'Ngồi thẳng lưng, mắt cách vở vừa phải để không hại mắt, không mỏi lưng.'),
  V(1, 1, 'Âm và chữ', 'Chữ cái nào là chữ a?', ['a', 'o', 'e', 'c'], 'Chữ a có nét cong kín và nét móc ngược. Chữ o chỉ có nét cong kín nên dễ nhầm.'),
  V(1, 2, 'Nét cơ bản', 'Chữ a gồm nét cong kín và nét nào?', ['nét móc ngược', 'nét khuyết trên', 'nét thẳng ngang', 'nét cong trái'], 'Viết chữ a: nét cong kín, rồi nét móc ngược ở bên phải.'),
  V(1, 1, 'Đồ dùng học tập', 'Bạn đựng sách vở mang đến trường bằng đồ vật nào?', ['cặp sách', 'hộp bút', 'thước kẻ', 'bảng con'], 'Sách vở để trong cặp sách. Hộp bút chỉ đựng bút, thước, tẩy.'),
  V(1, 2, 'Đồ dùng học tập', 'Có mấy đồ dùng học tập trong hình?', ['3', '4', '2', '5'], 'Bút chì, sách, thước kẻ là đồ dùng học tập. Quả bóng là đồ chơi. Có 3 đồ dùng học tập.', tk('✏️', '⚽', '📖', '📏')),

  /* ======================= TUẦN 2 ======================= */
  M(2, 1, 'Đếm số lượng', 'Có mấy quả bóng bay?', ['7', '6', '8', '9'], 'Đếm: 1, 2, 3, 4, 5, 6, 7. Có 7 quả bóng bay.', tk(rep('🎈', 7))),
  M(2, 2, 'Đếm số lượng', 'Hai mặt xúc xắc có tất cả bao nhiêu chấm?', ['9', '8', '10', '5'], 'Mặt thứ nhất 5 chấm, đếm tiếp mặt thứ hai: 6, 7, 8, 9. Có 9 chấm.', tk('dice.5', 'dice.4')),
  M(2, 2, 'Đếm số lượng', 'Có tất cả bao nhiêu que tính?', ['8', '7', '9', '5'], 'Bó bên trái 5 que, đếm tiếp 3 que: 6, 7, 8. Có 8 que tính.', tk('stick.5', 'stick.3')),
  M(2, 1, 'Thứ tự số', 'Đếm tiếp: 7, 8, 9, … Số tiếp theo là số nào?', ['10', '6', '11', '8'], 'Đếm xuôi: 7, 8, 9, 10. Sau 9 là 10.'),
  M(2, 1, 'Đọc viết số', 'Số "tám" viết là số nào?', ['8', '3', '6', '9'], 'Số tám viết là 8. Chữ số 3 giống nửa bên phải của số 8 nên dễ nhầm.'),
  M(2, 2, 'Đọc viết số', 'Số 10 được viết bằng mấy chữ số?', ['2 chữ số', '1 chữ số', '10 chữ số', '3 chữ số'], 'Số 10 viết bằng chữ số 1 và chữ số 0, là 2 chữ số.'),
  M(2, 1, 'Tia số', 'Số nào thay cho dấu hỏi?', ['6', '7', '5', '4'], 'Trên tia số: 4, 5, 6, 7. Ô hỏi đứng ngay sau 5 nên là 6.', { type: 'numline', from: 0, to: 10, ask: [6] }),
  M(2, 2, 'Đếm số lượng', 'Hai hàng có tất cả mấy bông hoa?', ['8', '5', '7', '9'], 'Hàng trên 5 bông, đếm tiếp hàng dưới: 6, 7, 8. Có 8 bông hoa.', tks(rep('🌸', 5), rep('🌸', 3))),

  V(2, 1, 'Hình và tiếng', 'Tên con vật trong hình bắt đầu bằng âm nào?', ['b', 'd', 'c', 'đ'], 'Con bò: tiếng "bò" bắt đầu bằng âm b. Chữ d viết giống b quay ngược nên dễ nhầm.', tk('🐄')),
  V(2, 2, 'Dấu thanh', 'Tiếng "bé" có dấu thanh gì?', ['dấu sắc', 'dấu huyền', 'dấu hỏi', 'dấu ngã'], 'Dấu sắc là nét xiên phải đặt trên chữ e: bé. Dấu huyền xiên ngược lại.'),
  V(2, 1, 'Âm và chữ', 'Tiếng nào có âm ê?', ['bế', 'bé', 'ba', 'cà'], 'Tiếng "bế" có âm ê (chữ e có dấu mũ). Tiếng "bé" có âm e, không có dấu mũ.'),
  V(2, 2, 'Ghép tiếng', 'Ghép âm c với âm a và dấu huyền được tiếng nào?', ['cà', 'cá', 'ca', 'bà'], 'c + a = ca, thêm dấu huyền được "cà" (quả cà).'),
  V(2, 2, 'Dấu thanh', 'Tiếng nào có dấu huyền?', ['bè', 'bé', 'be', 'bẻ'], 'Dấu huyền là nét xiên trái: bè. "bé" có dấu sắc, "bẻ" có dấu hỏi.'),
  V(2, 1, 'Âm đầu', 'Tiếng "bế" có âm đầu là âm nào?', ['b', 'ê', 'd', 'c'], 'Âm đứng đầu tiếng "bế" là b, sau đó là âm ê và dấu sắc.'),
  V(2, 2, 'Đọc câu', 'Câu bên có mấy tiếng?', ['3', '2', '4', '5'], 'Câu "Bà bế bé." có 3 tiếng: Bà, bế, bé.', txt('Bà bế bé.')),

  /* ======================= TUẦN 3 ======================= */
  M(3, 1, 'Nhiều hơn ít hơn', 'Số thỏ và số cà rốt, bên nào nhiều hơn?', ['Thỏ nhiều hơn', 'Cà rốt nhiều hơn', 'Bằng nhau', 'Thỏ ít hơn 1 con'], 'Nối mỗi thỏ với một cà rốt: còn thừa 2 con thỏ. Thỏ nhiều hơn.', tks(rep('🐰', 5), rep('🥕', 3))),
  M(3, 2, 'Nhiều hơn ít hơn', 'Mỗi bạn đội một cái mũ. Còn mấy bạn chưa có mũ?', ['2', '4', '6', '3'], 'Nối mỗi bạn với một mũ: 4 bạn có mũ, còn thừa 2 bạn chưa có mũ.', tks(rep('🧒', 6), rep('👒', 4))),
  M(3, 1, 'Nhiều hơn ít hơn', 'Ô tô con và xe buýt, loại xe nào ít hơn?', ['Ô tô con ít hơn', 'Xe buýt ít hơn', 'Bằng nhau', 'Xe buýt ít hơn 2 xe'], 'Ô tô con có 4 chiếc, xe buýt có 5 chiếc. Nối từng cặp: thừa 1 xe buýt, vậy ô tô con ít hơn.', tks(rep('🚗', 4), rep('🚌', 5))),
  M(3, 1, 'Bằng nhau', 'Có 4 cái cốc và 4 cái thìa. Số cốc so với số thìa thế nào?', ['Bằng nhau', 'Cốc nhiều hơn', 'Thìa nhiều hơn', 'Cốc ít hơn'], 'Mỗi cốc ghép một thìa thì vừa đủ, không thừa. Số cốc bằng số thìa.'),
  M(3, 3, 'Nhiều hơn ít hơn', 'Cần thêm mấy bông hoa để mỗi con bướm đậu một bông?', ['2', '3', '5', '1'], 'Có 5 con bướm, 3 bông hoa. Nối từng cặp còn 2 con bướm chưa có hoa, cần thêm 2 bông.', tks(rep('🦋', 5), rep('🌻', 3))),
  M(3, 2, 'Bằng nhau', 'Hàng nào có số con vật bằng hàng gà?', ['Hàng mèo', 'Hàng chó', 'Hàng vịt', 'Không hàng nào'], 'Hàng gà có 4 con. Hàng mèo 4 con, hàng chó 3 con, hàng vịt 5 con. Hàng mèo bằng hàng gà.', tks(rep('🐔', 4), rep('🐶', 3), rep('🐱', 4), rep('🦆', 5))),

  V(3, 1, 'Âm và chữ', 'Chữ nào có dấu mũ ở trên đầu?', ['ô', 'ơ', 'o', 'a'], 'Chữ ô có dấu mũ. Chữ ơ có dấu râu bên phải nên dễ nhầm.'),
  V(3, 2, 'Dấu thanh', 'Tiếng "đỏ" có dấu thanh gì?', ['dấu hỏi', 'dấu ngã', 'dấu nặng', 'dấu sắc'], 'Dấu hỏi giống cái móc nhỏ đặt trên chữ o: đỏ. Dấu ngã là nét lượn sóng.'),
  V(3, 2, 'Dấu thanh', 'Tiếng nào có dấu ngã?', ['cỗ', 'cổ', 'cố', 'cộ'], 'Dấu ngã là nét lượn sóng: cỗ (mâm cỗ). "cổ" có dấu hỏi.'),
  V(3, 1, 'Hình và tiếng', 'Đồ vật trong hình là cái ô. Tiếng "ô" có âm nào?', ['ô', 'o', 'ơ', 'a'], 'Tiếng "ô" chỉ có một âm là ô, chữ o có dấu mũ.', tk('☂️')),
  V(3, 1, 'Âm đầu', 'Tiếng "đò" có âm đầu là âm nào?', ['đ', 'd', 'o', 'b'], 'Tiếng "đò" (con đò chở khách qua sông) có âm đầu đ, chữ d có thêm nét ngang.'),
  V(3, 1, 'Hình và tiếng', 'Tên con vật trong hình có âm đầu là gì?', ['d', 'đ', 'b', 'gi'], 'Con dê: tiếng "dê" có âm đầu d, chữ d không có nét ngang.', tk('🐐')),
  V(3, 2, 'Ghép tiếng', 'Ghép âm b với âm ô và dấu nặng được tiếng nào?', ['bộ', 'bố', 'bổ', 'bô'], 'b + ô = bô, thêm dấu nặng dưới chữ ô được "bộ".'),
  V(3, 2, 'Đọc câu', 'Câu bên có mấy tiếng mang dấu sắc?', ['3', '2', '1', '4'], 'Bố, bế, bé đều có dấu sắc. Có 3 tiếng.', txt('Bố bế bé.')),

  /* ======================= TUẦN 4 ======================= */
  M(4, 1, 'So sánh số', 'Trong các số 6, 9, 4, 7, số nào lớn nhất?', ['9', '7', '6', '4'], 'Đếm từ 1 đến 10 thì 9 đến sau cùng trong bốn số, nên 9 lớn nhất.'),
  M(4, 2, 'Dấu so sánh', 'Chọn dấu điền vào chỗ chấm: 5 … 8', ['<', '>', '=', '+'], '5 bé hơn 8 nên điền dấu <. Đầu nhọn của dấu chỉ vào số bé.'),
  M(4, 1, 'Dấu so sánh', 'Dấu nào thay cho dấu hỏi?', ['=', '>', '<', '+'], 'Hai số bằng nhau: 7 = 7.', tk('7', '?', '7')),
  M(4, 1, 'So sánh số', 'Số nào bé hơn 4?', ['3', '5', '4', '8'], 'Đếm 1, 2, 3, 4: số 3 đứng trước 4 nên 3 bé hơn 4.'),
  M(4, 2, 'So sánh số', 'Số nào lớn hơn 6 và bé hơn 8?', ['7', '8', '6', '9'], 'Đếm 6, 7, 8: số nằm giữa 6 và 8 là 7.'),
  M(4, 2, 'Dấu so sánh', 'Hàng trên 6 viên kẹo, hàng dưới 5 viên. Viết đúng là:', ['6 > 5', '6 < 5', '5 > 6', '6 = 5'], 'Hàng trên thừa 1 viên nên 6 lớn hơn 5, viết 6 > 5.', tks(rep('🍬', 6), rep('🍬', 5))),
  M(4, 2, 'So sánh số', 'Bạn Nam có 8 viên bi, bạn Hà có 10 viên bi. Bạn nào có ít bi hơn?', ['Bạn Nam', 'Bạn Hà', 'Hai bạn bằng nhau', 'Không ai có bi'], '8 bé hơn 10 nên bạn Nam có ít bi hơn.'),

  V(4, 2, 'Hình và tiếng', 'Tên con vật trong hình có âm đầu là gì?', ['kh', 'k', 'h', 'ch'], 'Con khỉ: tiếng "khỉ" có âm đầu kh, ghép từ hai chữ k và h.', tk('🐒')),
  V(4, 1, 'Hình và tiếng', 'Tên quả trong hình có âm đầu là gì?', ['l', 'n', 'ê', 'h'], 'Quả lê: tiếng "lê" có âm đầu l. Nhiều bạn đọc lẫn l với n.', tk('🍐')),
  V(4, 2, 'Chính tả c/k', 'Từ nào viết đúng chính tả?', ['kì đà', 'cì đà', 'kì dà', 'cì dà'], 'Trước i viết k: kì đà. Con kì đà viết âm đ.'),
  V(4, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có âm kh?', ['khô', 'cá', 'có', 'bà'], 'Tiếng "khô" có âm đầu kh. Các tiếng khác có âm b, c.', txt('Bà có cá khô.')),
  V(4, 1, 'Âm và chữ', 'Chữ ư khác chữ u ở chỗ nào?', ['có thêm dấu râu', 'có thêm dấu mũ', 'có thêm nét ngang', 'có thêm dấu chấm'], 'Chữ ư là chữ u có thêm dấu râu ở bên phải.'),
  V(4, 2, 'Ghép tiếng', 'Ghép âm l với âm ê và dấu huyền được tiếng nào?', ['lề', 'lế', 'lê', 'nề'], 'l + ê = lê, thêm dấu huyền được "lề" (lề đường).'),
  V(4, 2, 'Đếm tiếng', 'Câu bên có mấy tiếng?', ['5', '4', '6', '3'], 'Câu có 5 tiếng: Bố, cho, bé, đi, hồ.', txt('Bố cho bé đi hồ.')),

  /* ======================= TUẦN 5 ======================= */
  M(5, 1, 'Mấy và mấy', 'Có 6 bông hoa: 4 bông đỏ và mấy bông vàng?', ['2', '6', '4', '3'], 'Đếm bông vàng: 1, 2. Vậy 6 gồm 4 và 2.', tk(rep('🌹', 4), rep('🌻', 2))),
  M(5, 2, 'Mấy và mấy', '8 gồm 5 và mấy?', ['3', '4', '2', '13'], 'Từ 5 đếm tiếp đến 8: 6, 7, 8 là 3 bước. 8 gồm 5 và 3.'),
  M(5, 3, 'Mấy và mấy', 'Hai mặt xúc xắc có tất cả 9 chấm. Mặt có dấu hỏi có mấy chấm?', ['3', '4', '2', '6'], 'Mặt đầu 6 chấm. 9 gồm 6 và 3, nên mặt kia có 3 chấm.', tk('dice.6', '?')),
  M(5, 1, 'Mấy và mấy', '5 gồm 4 và mấy?', ['1', '2', '9', '0'], 'Từ 4 đếm thêm 1 được 5. 5 gồm 4 và 1.'),
  M(5, 2, 'Mấy và mấy', '10 gồm 7 và mấy?', ['3', '4', '2', '17'], 'Từ 7 đếm tiếp 8, 9, 10 là 3 bước. 10 gồm 7 và 3.'),
  M(5, 2, 'Mấy và mấy', 'Có 7 con vịt, 3 con ở trên bờ, còn lại bơi dưới ao. Dưới ao có mấy con vịt?', ['4', '3', '10', '5'], '7 gồm 3 và 4. Dưới ao có 4 con vịt.'),
  M(5, 2, 'Mấy và mấy', 'Có 9 quả bóng, 4 quả màu đỏ. Có mấy quả màu xanh?', ['5', '4', '9', '6'], 'Đếm bóng xanh: 1, 2, 3, 4, 5. Vậy 9 gồm 4 và 5.', tk(rep('circle.red', 4), rep('circle.blue', 5))),

  V(5, 2, 'Hình và tiếng', 'Tên con vật trong hình có âm đầu là gì?', ['g', 'gh', 'c', 'ng'], 'Con gà: tiếng "gà" có âm đầu g. Trước a viết g, chỉ trước e, ê, i mới viết gh.', tk('🐔')),
  V(5, 2, 'Chính tả ng/ngh', 'Từ nào viết đúng chính tả?', ['nghé con', 'ngé con', 'nghé kon', 'ngé kon'], 'Trước e viết ngh: nghé. Trước o viết c: con.'),
  V(5, 2, 'Chính tả g/gh', 'Điền g hay gh vào chỗ trống: "…ồ ghề"', ['g', 'gh', 'ng', 'ngh'], 'Trước ô viết g: gồ ghề.'),
  V(5, 3, 'Chính tả g/gh', 'Trong ba từ "gồ ghề, ghà gô, ghi nhớ", có mấy tiếng viết sai?', ['1', '2', '0', '3'], 'Chỉ "ghà" sai, phải viết "gà" vì trước a viết g. "gồ ghề" và "ghi nhớ" đều đúng.'),
  V(5, 2, 'Hình và tiếng', 'Tên quả trong hình có âm đầu là gì?', ['nh', 'n', 'ng', 'h'], 'Chùm nho: tiếng "nho" có âm đầu nh, ghép từ chữ n và h.', tk('🍇')),
  V(5, 1, 'Âm đầu', 'Tiếng "mũ" có âm đầu là âm nào?', ['m', 'n', 'u', 'b'], 'Tiếng "mũ" gồm âm m, âm u và dấu ngã. Âm đầu là m.'),
  V(5, 2, 'Chính tả ng/ngh', 'Chọn chữ điền vào chỗ trống: củ …ệ', ['ngh', 'ng', 'gh', 'g'], 'Trước ê viết ngh: củ nghệ.'),
  V(5, 2, 'Đọc câu', 'Trong câu bên, tiếng nào bắt đầu bằng gh?', ['ghế', 'gỗ', 'nhà', 'bà'], 'Tiếng "ghế" viết gh vì sau nó là ê. Tiếng "gỗ" viết g.', txt('Ghế gỗ ở nhà bà.')),
  V(5, 2, 'Âm đầu', 'Tiếng "giò" có âm đầu là âm nào?', ['gi', 'g', 'd', 'i'], 'Âm đầu "gi" gồm hai chữ g và i: giò.'),

  /* ======================= TUẦN 6 ======================= */
  M(6, 1, 'Thứ tự số', 'Số nào còn thiếu: 2, 3, 4, …, 6?', ['5', '7', '1', '8'], 'Đếm xuôi 2, 3, 4, 5, 6. Số còn thiếu là 5.'),
  M(6, 2, 'Thứ tự số', 'Đếm ngược: 10, 9, 8, … Số tiếp theo là số nào?', ['7', '9', '11', '6'], 'Đếm ngược mỗi lần bớt 1: 10, 9, 8, 7.'),
  M(6, 2, 'Sắp xếp số', 'Dãy số nào được xếp từ bé đến lớn?', ['2, 5, 7, 9', '2, 7, 5, 9', '9, 7, 5, 2', '5, 2, 7, 9'], 'Từ bé đến lớn: số sau luôn lớn hơn số trước: 2, 5, 7, 9.'),
  M(6, 2, 'Đếm số lượng', 'Có tất cả mấy con kiến?', ['9', '8', '10', '5'], 'Hàng trên 5 con, đếm tiếp hàng dưới: 6, 7, 8, 9. Có 9 con kiến.', tks(rep('🐜', 5), rep('🐜', 4))),
  M(6, 3, 'Thứ tự số', 'Có bao nhiêu số lớn hơn 3 và bé hơn 8?', ['4', '5', '6', '3'], 'Các số đó là 4, 5, 6, 7: có 4 số. Đếm cả 3 hoặc 8 là nhầm.'),
  M(6, 2, 'So sánh số', 'Hàng nào có nhiều hình nhất?', ['Hàng hình tròn', 'Hàng hình vuông', 'Hàng hình tam giác', 'Ba hàng bằng nhau'], 'Tam giác 5 hình, hình tròn 7 hình, hình vuông 6 hình. 7 lớn nhất nên hàng hình tròn nhiều nhất.', tks(rep('tri.red', 5), rep('circle.blue', 7), rep('sq.green', 6))),
  M(6, 2, 'Tia số', 'Số nào thay cho dấu hỏi?', ['7', '8', '6', '9'], 'Vạch có dấu hỏi nằm ngay sau vạch số 6, trước vạch số 8, nên là 7.', { type: 'numline', from: 0, to: 10, label: [0, 2, 4, 6, 8, 10], ask: [7] }),
  M(6, 2, 'So sánh số', 'Số bé nhất trong các số 5, 0, 3, 8 là số nào?', ['0', '3', '5', '8'], 'Số 0 bé hơn mọi số 1, 2, 3, … nên 0 bé nhất. Nhiều bạn quên số 0.'),

  V(6, 2, 'Hình và tiếng', 'Tên con vật trong hình có âm đầu là gì?', ['r', 'd', 'gi', 'l'], 'Con rùa: tiếng "rùa" có âm đầu r. Nhiều nơi đọc r, d, gi gần giống nhau nên dễ nhầm.', tk('🐢')),
  V(6, 2, 'Vần', 'Tiếng "rùa" có vần gì?', ['ua', 'ưa', 'u', 'a'], 'Tiếng "rùa" gồm âm r, vần ua và dấu huyền.'),
  V(6, 1, 'Âm đầu', 'Tiếng "sẻ" (chim sẻ) có âm đầu là âm nào?', ['s', 'x', 'e', 'r'], 'Chim sẻ viết s. s đọc uốn lưỡi, x đọc thẳng lưỡi.'),
  V(6, 2, 'Hình và vần', 'Hình bên là quả dừa. Tiếng "dừa" có vần gì?', ['ưa', 'ua', 'ư', 'ia'], 'Quả dừa: tiếng "dừa" có âm d, vần ưa và dấu huyền.', tk('🥥')),
  V(6, 1, 'Âm đầu', 'Tiếng "trà" có âm đầu là âm nào?', ['tr', 't', 'ch', 'r'], 'Âm đầu "tr" gồm hai chữ t và r: trà.'),
  V(6, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần ia?', ['mía', 'cho', 'bé', 'bà'], 'Tiếng "mía" có âm m, vần ia và dấu sắc.', txt('Bà cho bé mía.')),
  V(6, 2, 'Ghép tiếng', 'Ghép âm m với vần ưa được tiếng nào?', ['mưa', 'mua', 'mứa', 'ma'], 'm + ưa = mưa (trời mưa). "mua" là m + ua.'),

  /* ======================= TUẦN 7 ======================= */
  M(7, 1, 'Hình phẳng', 'Hình bên là hình gì?', ['hình tam giác', 'hình vuông', 'hình tròn', 'hình chữ nhật'], 'Hình có 3 cạnh, 3 góc nhọn là hình tam giác.', tk('tri.orange')),
  M(7, 2, 'Đếm hình', 'Có mấy hình tròn?', ['4', '3', '5', '7'], 'Hình tròn màu đỏ, xanh lá, xanh dương, tím. Có 4 hình tròn.', tk('circle.red', 'sq.blue', 'circle.green', 'tri.yellow', 'circle.blue', 'rect.orange', 'circle.purple')),
  M(7, 3, 'Đếm hình', 'Có mấy hình tam giác?', ['3', '1', '2', '6'], 'Tam giác đỏ, tam giác xanh dương bị lật ngược, tam giác tím nằm nghiêng. Xoay đi vẫn là hình tam giác: có 3 hình.', tk('tri.red', 'sq.green', 'tri.blue.180', 'circle.yellow', 'tri.purple.90', 'rect.blue')),
  M(7, 1, 'Hình trong đời sống', 'Mặt chiếc đồng hồ treo tường thường có dạng hình gì?', ['hình tròn', 'hình vuông', 'hình tam giác', 'hình chữ nhật'], 'Mặt đồng hồ treo tường thường tròn, các số xếp quanh một vòng.'),
  M(7, 2, 'Hình trong đời sống', 'Lá cờ Tổ quốc có dạng hình gì?', ['hình chữ nhật', 'hình vuông', 'hình tam giác', 'hình tròn'], 'Lá cờ có hai cạnh dài, hai cạnh ngắn: hình chữ nhật. Ngôi sao vàng ở giữa.'),
  M(7, 3, 'Đếm hình', 'Có mấy hình vuông?', ['3', '4', '2', '6'], 'Hình vuông xanh dương, đỏ, vàng. Hình thoi tím và hình chữ nhật không phải hình vuông. Có 3 hình.', tk('sq.blue', 'rect.green', 'sq.red', 'diamond.purple', 'sq.yellow', 'rect.orange')),
  M(7, 1, 'Hình phẳng', 'Hình nào khác loại với các hình còn lại?', ['[tri.green]', '[circle.blue]', '[circle.red]', '[circle.yellow]'], 'Ba hình tròn, chỉ có một hình tam giác xanh lá. Hình tam giác khác loại.', tk('circle.red', 'circle.blue', 'tri.green', 'circle.yellow')),

  V(7, 1, 'Hình và tiếng', 'Tên con vật trong hình có âm đầu là gì?', ['v', 'b', 'u', 'x'], 'Con voi: tiếng "voi" có âm đầu v.', tk('🐘')),
  V(7, 2, 'Âm đầu', 'Tiếng "quả" có âm đầu là âm nào?', ['qu', 'q', 'u', 'c'], 'Âm đầu "qu" luôn viết chữ q đi cùng chữ u: quả.'),
  V(7, 2, 'Chính tả s/x', 'Từ nào viết đúng chính tả?', ['sư tử', 'xư tử', 'sư tữ', 'xư tữ'], 'Con sư tử viết s, tiếng "tử" có dấu hỏi.'),
  V(7, 2, 'Âm đầu', 'Tiếng "phố" có âm đầu là âm nào?', ['ph', 'p', 'h', 'f'], 'Âm đầu "ph" gồm chữ p và chữ h: phố.'),
  V(7, 1, 'Âm và chữ', 'Từ nào có tiếng viết bằng chữ y dài?', ['y tá', 'ti vi', 'bi ve', 'li ti'], 'Tiếng "y" trong "y tá" viết chữ y dài. Các từ kia viết chữ i ngắn.'),
  V(7, 3, 'Chính tả', 'Từ nào viết đúng chính tả?', ['quả na', 'qủa na', 'cuả na', 'quả la'], 'Âm qu viết q và u, dấu hỏi đặt trên chữ a: quả na.'),
  V(7, 2, 'Đọc câu', 'Câu bên có mấy tiếng bắt đầu bằng chữ x?', ['2', '1', '3', '4'], 'Hai tiếng "Xe" và "xe" bắt đầu bằng x. Tiếng "và" bắt đầu bằng v.', txt('Xe lu và xe ca đi qua phố.')),

  /* ======================= TUẦN 8 ======================= */
  M(8, 2, 'Ghép hình', 'Hai hình tam giác ghép lại như hình bên được hình gì?', ['hình vuông', 'hình tam giác', 'hình tròn', 'hình chữ nhật'], 'Hai tam giác ghép theo đường chéo tạo thành một hình vuông.', { type: 'lines', labels: false, pts: { A: [0, 0], B: [4, 0], C: [4, 4], D: [0, 4] }, segs: [['A', 'B'], ['B', 'C'], ['C', 'D'], ['D', 'A'], ['A', 'C']] }),
  M(8, 3, 'Đếm hình', 'Hình bên có mấy hình tam giác?', ['3', '2', '4', '1'], 'Có tam giác nhỏ bên trái, tam giác nhỏ bên phải và tam giác to bao cả hai. Tất cả là 3 hình.', { type: 'lines', labels: false, pts: { A: [3, 0], B: [0, 5], C: [6, 5], D: [3, 5] }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['A', 'D']] }),
  M(8, 1, 'Đếm hình', 'Có mấy ô vuông được tô màu?', ['7', '6', '8', '5'], 'Hàng trên 2 ô, hàng giữa 3 ô, hàng dưới 2 ô. Đếm: 7 ô.', { type: 'grid', cols: 4, rows: 3, fill: ['##..', '.###', '..##'] }),
  M(8, 1, 'Dãy hình', 'Hình nào tiếp theo?', ['[sq.blue]', '[circle.red]', '[tri.blue]', '[sq.red]'], 'Lặp lại: tròn đỏ, vuông xanh. Sau tròn đỏ là vuông xanh.', tk('circle.red', 'sq.blue', 'circle.red', 'sq.blue', 'circle.red', '?')),
  M(8, 2, 'Dãy hình', 'Hình nào thay cho dấu hỏi?', ['[tri.green]', '[star]', '[circle.green]', '[tri.red]'], 'Nhóm lặp lại: tam giác, tam giác, ngôi sao. Sau ngôi sao là tam giác xanh, rồi tam giác xanh.', tk('tri.green', 'tri.green', 'star', 'tri.green', 'tri.green', 'star', 'tri.green', '?')),
  M(8, 1, 'Ghép hình', 'Bạn Mai xếp que tính như hình bên. Mai xếp được hình gì?', ['hình tam giác', 'hình vuông', 'hình chữ nhật', 'hình tròn'], 'Ba que tính nối đầu với nhau thành hình có 3 cạnh: hình tam giác.', { type: 'lines', match: true, pts: { a: [0, 4], b: [4, 4], c: [2, 0.6] }, segs: [['a', 'b'], ['b', 'c'], ['c', 'a']] }),
  M(8, 2, 'Ghép hình', 'Cần ít nhất mấy que tính để xếp một hình vuông?', ['4', '3', '5', '8'], 'Hình vuông có 4 cạnh, mỗi cạnh một que tính. Cần 4 que.'),

  V(8, 1, 'Vần', 'Tiếng "bàn" có vần gì?', ['an', 'àn', 'ăn', 'ân'], 'Vần là "an". Dấu huyền là dấu thanh, không viết vào vần.'),
  V(8, 2, 'Hình và vần', 'Đồ vật trong hình có vần gì?', ['ên', 'en', 'in', 'ân'], 'Cây nến: tiếng "nến" có vần ên và dấu sắc.', tk('🕯️')),
  V(8, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần ăn?', ['khăn', 'khan', 'cân', 'căm'], 'Khăn có vần ăn. "khan" có vần an, "cân" có vần ân.'),
  V(8, 2, 'Vần', 'Tiếng "tằm" có vần gì?', ['ăm', 'âm', 'am', 'ằm'], 'Con tằm: âm t, vần ăm (chữ ă có dấu trăng) và dấu huyền.'),
  V(8, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần un?', ['bún', 'ăn', 'bé', 'và'], 'Tiếng "bún" gồm âm b, vần un và dấu sắc.', txt('Bố và bé ăn bún.')),
  V(8, 3, 'Đọc câu', 'Câu bên có mấy tiếng có vần an?', ['2', '4', '3', '1'], 'Bạn, Lan có vần an. "chăn" vần ăn, "sân" vần ân, không đếm. Có 2 tiếng.', txt('Bạn Lan ôm chăn ra sân.')),
  V(8, 2, 'Tìm tiếng có vần', 'Tiếng nào có cùng vần với tiếng "lon"?', ['con', 'môn', 'sơn', 'cân'], '"lon" và "con" cùng vần on. "môn" vần ôn, "sơn" vần ơn.'),

  /* ======================= TUẦN 9 ======================= */
  M(9, 1, 'Phép cộng', 'Tính: 2 + 3 = ?', ['5', '6', '4', '1'], 'Có 2, thêm 3: đếm tiếp 3, 4, 5. Vậy 2 + 3 = 5.'),
  M(9, 1, 'Cộng bằng hình', 'Có tất cả mấy quả táo?', ['6', '5', '7', '2'], 'Bên trái 4 quả, thêm 2 quả: 4 + 2 = 6.', tk(rep('🍎', 4), '+', rep('🍎', 2))),
  M(9, 2, 'Cộng bằng hình', 'Có 3 gà con, 2 gà con nữa chạy tới. Phép tính đúng là:', ['3 + 2 = 5', '5 + 2 = 7', '3 + 3 = 6', '2 + 2 = 4'], 'Nhóm 3 con gộp với nhóm 2 con: 3 + 2 = 5.', tk(rep('🐥', 3), '_', rep('🐥', 2))),
  M(9, 2, 'Nhảy trên tia số', 'Ếch đứng ở số 4, nhảy 3 bước như hình. Ếch đến số nào?', ['7', '6', '8', '3'], 'Mỗi bước thêm 1: 4 lên 5, 6, 7. Vậy 4 + 3 = 7.', { type: 'numline', from: 0, to: 10, hops: [[4, 5, '+1'], [5, 6, '+1'], [6, 7, '+1']] }),
  M(9, 1, 'Phép cộng', 'Tính: 1 + 4 = ?', ['5', '4', '6', '3'], 'Có 4, thêm 1 là 5. 1 + 4 = 5.'),
  M(9, 2, 'Bài toán bằng lời', 'Lan có 3 bông hoa, mẹ cho Lan thêm 4 bông. Lan có tất cả mấy bông hoa?', ['7', '6', '1', '8'], 'Thêm vào là phép cộng: 3 + 4 = 7. Lan có 7 bông.'),
  M(9, 3, 'Phép cộng', 'Số nào thay cho dấu hỏi: ? + 2 = 6', ['4', '8', '3', '2'], '4 + 2 = 6 nên số cần tìm là 4. Lấy 6 + 2 = 8 là nhầm.'),

  V(9, 2, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['ôm', 'om', 'ơm', 'âm'], 'Con tôm: tiếng "tôm" có vần ôm.', tk('🦐')),
  V(9, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần ai?', ['tai', 'tay', 'tây', 'tôi'], 'Cái tai có vần ai. "tay" có vần ay, dễ nhầm với ai.'),
  V(9, 1, 'Vần', 'Tiếng "chim" có vần gì?', ['im', 'in', 'um', 'em'], 'Con chim: âm ch và vần im. Vần im khép môi, vần in không khép môi.'),
  V(9, 1, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['oi', 'ôi', 'ơi', 'ai'], 'Con voi: tiếng "voi" có âm v và vần oi.', tk('🐘')),
  V(9, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần ay?', ['bay', 'trời', 'chim', 'đàn'], 'Tiếng "bay" có âm b và vần ay.', txt('Đàn chim bay trên trời.')),
  V(9, 3, 'Tìm tiếng có vần', 'Tiếng nào khác vần với ba tiếng còn lại?', ['đêm', 'tem', 'kem', 'xem'], 'tem, kem, xem cùng vần em. Riêng "đêm" có vần êm.'),
  V(9, 2, 'Ghép tiếng', 'Ghép âm m với vần ây được tiếng nào?', ['mây', 'may', 'mai', 'mơi'], 'm + ây = mây (đám mây). "may" là m + ay.'),

  /* ======================= TUẦN 10 ======================= */
  M(10, 1, 'Phép cộng', 'Tính: 5 + 0 = ?', ['5', '0', '6', '50'], 'Cộng với 0 thì số đó giữ nguyên: 5 + 0 = 5.'),
  M(10, 2, 'Phép cộng', 'Phép tính nào có kết quả bằng 8?', ['5 + 3', '4 + 3', '6 + 1', '2 + 5'], '5 + 3 = 8. Còn 4 + 3 = 7, 6 + 1 = 7, 2 + 5 = 7.'),
  M(10, 1, 'Cộng bằng hình', 'Số nào thay cho dấu hỏi?', ['6', '5', '7', '2'], 'Mặt xúc xắc 4 chấm và 2 chấm: 4 + 2 = 6.', tk('dice.4', '+', 'dice.2', '=', '?')),
  M(10, 2, 'Bài toán bằng lời', 'Trên xe buýt có 6 bạn. Đến bến, 3 bạn nữa lên xe. Trên xe có tất cả mấy bạn?', ['9', '3', '8', '10'], 'Lên thêm là cộng: 6 + 3 = 9 bạn.'),
  M(10, 3, 'Bài toán bằng lời', 'Rổ có 3 quả cam và 4 quả quýt. Bà bỏ thêm 2 quả cam. Rổ có mấy quả cam?', ['5', '9', '7', '3'], 'Chỉ hỏi số cam: 3 + 2 = 5 quả. Cộng cả quýt ra 9 là nhầm.'),
  M(10, 3, 'So sánh phép tính', 'Chọn dấu điền vào chỗ chấm: 4 + 3 … 6', ['>', '<', '=', '+'], 'Tính trước: 4 + 3 = 7. Mà 7 > 6, nên điền dấu >.'),
  M(10, 3, 'Suy luận hình ảnh', 'Mỗi quả táo là 3. Hai quả táo là mấy?', ['6', '3', '5', '33'], 'Hai quả táo: 3 + 3 = 6.', tks(['🍎', '=', '3', '_', '_'], ['🍎', '+', '🍎', '=', '?'])),
  M(10, 2, 'Nhảy trên tia số', 'Thỏ nhảy từ số 0, mỗi lần 2 bước, nhảy 3 lần như hình. Thỏ dừng ở số nào?', ['6', '3', '5', '8'], 'Nhảy 3 lần, mỗi lần thêm 2: 0, 2, 4, 6. Thỏ dừng ở 6.', { type: 'numline', from: 0, to: 10, hops: [[0, 2, '+2'], [2, 4, '+2'], [4, 6, '+2']] }),
  M(10, 1, 'Phép cộng', 'Tính: 3 + 3 = ?', ['6', '5', '7', '33'], 'Có 3, thêm 3: đếm tiếp 4, 5, 6. Vậy 3 + 3 = 6.'),

  V(10, 1, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['eo', 'ao', 'oe', 'e'], 'Con mèo: tiếng "mèo" có vần eo và dấu huyền.', tk('🐱')),
  V(10, 2, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['ưu', 'iu', 'ươu', 'u'], 'Con cừu: tiếng "cừu" có vần ưu và dấu huyền.', tk('🐑')),
  V(10, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần âu?', ['cầu', 'cau', 'cây', 'kêu'], 'Cây cầu có vần âu. "cau" có vần au, chỉ khác dấu mũ.'),
  V(10, 1, 'Vần', 'Tiếng "túi" có vần gì?', ['ui', 'ưi', 'u', 'oi'], 'Cái túi: âm t, vần ui và dấu sắc.'),
  V(10, 3, 'Đọc câu', 'Câu bên có mấy tiếng có vần ao?', ['2', '3', '1', '4'], 'báo, cao có vần ao. Tiếng "leo" có vần eo, dễ đếm nhầm. Có 2 tiếng.', txt('Chú báo leo cao.')),
  V(10, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần êu?', ['kêu', 'keo', 'cầu', 'kiu'], 'Kêu có vần êu. "keo" có vần eo, "cầu" có vần âu.'),
  V(10, 3, 'Ghép tiếng', 'Ghép âm g, vần ưi và dấu hỏi được tiếng nào?', ['gửi', 'gủi', 'ghửi', 'gưi'], 'g + ưi + dấu hỏi = gửi (gửi thư). Trước ư viết g, không viết gh.'),

  /* ======================= TUẦN 11 ======================= */
  M(11, 1, 'Phép trừ', 'Tính: 5 − 2 = ?', ['3', '7', '2', '4'], 'Có 5, bớt 2: đếm lùi 4, 3. Vậy 5 − 2 = 3. Ra 7 là nhầm sang phép cộng.'),
  M(11, 1, 'Bài toán bằng lời', 'Có 6 con chim đậu trên cành, 2 con bay đi. Còn lại mấy con chim?', ['4', '8', '2', '3'], 'Bay đi là bớt: 6 − 2 = 4 con.'),
  M(11, 2, 'Trừ bằng hình', 'Có 7 quả bóng, 2 quả bên phải bay mất. Phép tính đúng là:', ['7 − 2 = 5', '7 + 2 = 9', '5 − 2 = 3', '7 − 5 = 3'], 'Có 7 quả, bớt đi 2 quả: 7 − 2 = 5. Còn 5 quả.', tk(rep('🎈', 5), '|', '🎈', '🎈')),
  M(11, 2, 'Nhảy trên tia số', 'Ếch đứng ở số 9, nhảy lùi 3 bước như hình. Ếch đến số nào?', ['6', '7', '12', '5'], 'Mỗi bước lùi bớt 1: 9 xuống 8, 7, 6. Vậy 9 − 3 = 6.', { type: 'numline', from: 0, to: 10, hops: [[9, 8, '−1'], [8, 7, '−1'], [7, 6, '−1']] }),
  M(11, 1, 'Phép trừ', 'Tính: 8 − 0 = ?', ['8', '0', '7', '80'], 'Bớt đi 0 thì số đó giữ nguyên: 8 − 0 = 8.'),
  M(11, 3, 'Phép trừ', 'Số nào thay cho dấu hỏi: 9 − ? = 4', ['5', '13', '4', '6'], '9 − 5 = 4 nên số cần tìm là 5. Lấy 9 + 4 = 13 là nhầm.'),
  M(11, 2, 'Phép trừ', 'Tính: 7 − 7 = ?', ['0', '7', '14', '1'], 'Bớt hết thì không còn gì: 7 − 7 = 0.'),
  M(11, 2, 'Bài toán bằng lời', 'Mẹ mua 10 quả trứng, mẹ rán 4 quả. Còn lại mấy quả trứng?', ['6', '14', '5', '4'], 'Rán đi là bớt: 10 − 4 = 6 quả trứng.'),

  V(11, 2, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['ôc', 'oc', 'uc', 'ôt'], 'Con ốc: tiếng "ốc" có vần ôc và dấu sắc.', tk('🐌')),
  V(11, 2, 'Hình và vần', 'Củ trong hình là củ cà rốt. Tiếng "rốt" có vần gì?', ['ôt', 'ot', 'ơt', 'ôc'], 'Tiếng "rốt" gồm âm r, vần ôt và dấu sắc.', tk('🥕')),
  V(11, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần ăt?', ['mặt', 'mật', 'họp', 'mực'], 'Mặt có vần ăt. "mật" (mật ong) có vần ât.'),
  V(11, 1, 'Vần', 'Tiếng "hạt" có vần gì?', ['at', 'ạt', 'ac', 'ăt'], 'Vần là "at". Dấu nặng là dấu thanh, không viết vào vần.'),
  V(11, 2, 'Điền vần', 'Chọn vần điền vào chỗ trống: "con m…"', ['ưc', 'ưt', 'uc', 'ưng'], 'Con mực viết vần ưc: m + ưc + dấu nặng = mực.'),
  V(11, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần ơt?', ['ớt', 'hái', 'mẹ', 'vườn'], 'Tiếng "ớt" có vần ơt và dấu sắc.', txt('Mẹ hái ớt ngoài vườn.')),
  V(11, 2, 'Ghép tiếng', 'Ghép âm h với vần oc và dấu nặng được tiếng nào?', ['học', 'hộc', 'hóc', 'hạc'], 'h + oc + dấu nặng = học (đi học).'),

  /* ======================= TUẦN 12 ======================= */
  M(12, 1, 'Phép trừ', 'Tính: 9 − 4 = ?', ['5', '4', '13', '6'], 'Từ 9 đếm lùi 4 bước: 8, 7, 6, 5. Vậy 9 − 4 = 5.'),
  M(12, 2, 'Phép trừ', 'Tính: 10 − 6 = ?', ['4', '16', '5', '3'], '10 gồm 6 và 4, nên 10 − 6 = 4.'),
  M(12, 3, 'So sánh phép tính', 'Chọn dấu điền vào chỗ chấm: 8 − 3 … 6', ['<', '>', '=', '−'], 'Tính trước: 8 − 3 = 5. Mà 5 < 6, nên điền dấu <. Đem 8 so với 6 là nhầm.'),
  M(12, 2, 'Phép trừ', 'Phép tính nào có kết quả bằng 2?', ['7 − 5', '7 − 4', '5 + 2', '9 − 6'], '7 − 5 = 2. Còn 7 − 4 = 3, 5 + 2 = 7, 9 − 6 = 3.'),
  M(12, 2, 'Trừ bằng hình', 'Hình bên có 10 ô. Có mấy ô chưa tô màu?', ['4', '6', '10', '5'], 'Đã tô 6 ô. 10 − 6 = 4, còn 4 ô trắng.', { type: 'grid', cols: 5, rows: 2, fill: ['#####', '#....'] }),
  M(12, 3, 'Đếm hình', 'Hình bên có mấy hình tam giác?', ['2', '1', '3', '4'], 'Có tam giác nhỏ ở trên và tam giác to cả hình. Phần dưới có 4 cạnh, không phải tam giác. Có 2 hình.', { type: 'lines', labels: false, pts: { A: [3, 0], B: [0, 6], C: [6, 6], D: [1.5, 3], E: [4.5, 3] }, segs: [['A', 'B'], ['A', 'C'], ['B', 'C'], ['D', 'E']] }),
  M(12, 3, 'Suy luận hình ảnh', 'Hai ngôi sao giống nhau cộng lại bằng 8. Một ngôi sao bằng mấy?', ['4', '8', '16', '6'], '4 + 4 = 8, nên mỗi ngôi sao bằng 4.', tks(['star', '+', 'star', '=', '8'], ['star', '=', '?', '_', '_'])),
  M(12, 2, 'Bài toán bằng lời', 'Lớp có 9 chậu hoa, 2 chậu đã nở hoa. Có mấy chậu chưa nở hoa?', ['7', '11', '2', '6'], 'Lấy tất cả bớt số chậu đã nở: 9 − 2 = 7 chậu.'),

  V(12, 2, 'Hình và vần', 'Đồ vật trong hình là cây bút. Tiếng "bút" có vần gì?', ['ut', 'uc', 'ưt', 'up'], 'Tiếng "bút" có âm b, vần ut và dấu sắc.', tk('🖊️')),
  V(12, 2, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['it', 'ich', 'êt', 'iêt'], 'Con vịt: tiếng "vịt" có vần it và dấu nặng.', tk('🦆')),
  V(12, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần ăp?', ['gặp', 'gập', 'họp', 'lớp'], 'Gặp có vần ăp. "gập" có vần âp, chỉ khác dấu mũ.'),
  V(12, 1, 'Vần', 'Tiếng "lớp" có vần gì?', ['ơp', 'op', 'ôp', 'ớp'], 'Tiếng "lớp" có âm l, vần ơp và dấu sắc.'),
  V(12, 1, 'Từ ngữ', 'Từ nào chỉ đồ dùng học tập?', ['bút chì', 'bát cơm', 'quả bóng', 'cái nồi'], 'Bút chì dùng để viết, vẽ khi học. Bát, nồi là đồ dùng trong bếp, bóng là đồ chơi.'),
  V(12, 3, 'Chính tả', 'Từ nào viết đúng chính tả?', ['quả mít', 'quả mích', 'quả mịt', 'quả mét'], 'Quả mít viết vần it, dấu sắc. Nhiều bạn nhầm vần it với ich.'),
  V(12, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần ap?', ['đạp', 'học', 'đưa', 'xe'], 'Tiếng "đạp" có âm đ, vần ap và dấu nặng.', txt('Bố đạp xe đưa bé đi học.')),
  V(12, 3, 'Đọc câu', 'Câu bên có mấy tiếng có vần ut?', ['2', '3', '1', '4'], 'phút, bút có vần ut. "một" có vần ôt, "gọt" có vần ot nên không đếm. Có 2 tiếng.', txt('Bé chỉ cần một phút để gọt bút.')),

  /* ======================= TUẦN 13 ======================= */
  M(13, 3, 'Bảng cộng trừ', 'Phép tính nào có kết quả lớn nhất?', ['4 + 5', '3 + 5', '9 − 1', '6 + 2'], '4 + 5 = 9. Ba phép tính còn lại đều bằng 8.'),
  M(13, 1, 'Bảng cộng trừ', 'Tính: 6 + 4 = ?', ['10', '9', '2', '11'], '6 + 4 = 10. Ra 2 là nhầm sang phép trừ.'),
  M(13, 1, 'Bảng cộng trừ', 'Tính: 10 − 10 = ?', ['0', '10', '20', '1'], 'Bớt hết thì không còn gì: 10 − 10 = 0.'),
  M(13, 3, 'Bảng cộng trừ', 'Biết 3 + 6 = 9. Phép trừ nào đúng?', ['9 − 6 = 3', '9 − 3 = 3', '3 − 6 = 9', '9 + 6 = 3'], 'Lấy tổng 9 bớt đi 6 thì còn 3: 9 − 6 = 3. Cũng có 9 − 3 = 6.'),
  M(13, 2, 'Bảng cộng trừ', 'Số nào thay cho dấu hỏi: 5 + ? = 10', ['5', '15', '4', '10'], '5 + 5 = 10 nên số cần tìm là 5.'),
  M(13, 2, 'Cộng bằng hình', 'Ba mặt xúc xắc có tất cả mấy chấm?', ['10', '9', '11', '7'], '6 chấm, 3 chấm, 1 chấm: 6 + 3 = 9, 9 + 1 = 10.', tk('dice.6', 'dice.3', 'dice.1')),
  M(13, 3, 'Suy luận hình ảnh', 'Mỗi loại quả là một số. Chùm nho bằng mấy?', ['5', '2', '8', '3'], 'Chuối + chuối = 6 nên chuối là 3. Chuối + nho = 8, mà 3 + 5 = 8, nên nho là 5.', tks(['🍌', '+', '🍌', '=', '6'], ['🍌', '+', '🍇', '=', '8'], ['🍇', '=', '?', '_', '_'])),
  M(13, 2, 'Nhảy trên tia số', 'Ếch nhảy từ số 2, một bước dài 5. Ếch đến số nào?', ['7', '6', '3', '8'], 'Bước dài 5 đơn vị: 2 + 5 = 7.', { type: 'numline', from: 0, to: 10, hops: [[2, 7, '+5']], ask: [7] }),

  V(13, 2, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['êch', 'ech', 'ich', 'êt'], 'Con ếch: tiếng "ếch" có vần êch và dấu sắc.', tk('🐸')),
  V(13, 2, 'Hình và vần', 'Đồ vật trong hình là quyển sách. Tiếng "sách" có vần gì?', ['ach', 'ac', 'êch', 'anh'], 'Tiếng "sách" có âm s, vần ach và dấu sắc. Vần ach viết thêm chữ h.', tk('📖')),
  V(13, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần ăng?', ['măng', 'mang', 'tầng', 'canh'], 'Măng (măng tre) có vần ăng. "mang" có vần ang.'),
  V(13, 1, 'Vần', 'Tiếng "xinh" có vần gì?', ['inh', 'in', 'ênh', 'anh'], 'Tiếng "xinh" có âm x và vần inh.'),
  V(13, 3, 'Điền vần', 'Điền vần ang hay anh: "cây b…"', ['ang', 'anh', 'ăng', 'ưng'], 'Cây bàng viết vần ang: b + ang + dấu huyền.'),
  V(13, 2, 'Đọc câu', 'Trong câu bên, tiếng nào có vần ep?', ['dép', 'xếp', 'ngay', 'ngắn'], 'Tiếng "dép" có vần ep. Tiếng "xếp" có vần êp.', txt('Bé xếp dép ngay ngắn.')),
  V(13, 2, 'Hình và vần', 'Hình bên là quả chanh. Tiếng "chanh" có vần gì?', ['anh', 'ăng', 'inh', 'ach'], 'Quả chanh: tiếng "chanh" có âm ch và vần anh.', tk('🍋')),

  /* ======================= TUẦN 14 ======================= */
  M(14, 3, 'Tính liên tiếp', 'Tính: 2 + 3 + 4 = ?', ['9', '5', '8', '10'], 'Tính từ trái sang phải: 2 + 3 = 5, 5 + 4 = 9. Dừng ở 5 là quên bước hai.'),
  M(14, 3, 'Tính liên tiếp', 'Tính: 9 − 3 − 2 = ?', ['4', '6', '8', '5'], 'Tính từ trái sang phải: 9 − 3 = 6, 6 − 2 = 4.'),
  M(14, 1, 'Bài toán bằng lời', 'Trong vườn có 5 cây cam và 4 cây bưởi. Vườn có tất cả mấy cây?', ['9', '1', '8', '10'], 'Gộp lại là cộng: 5 + 4 = 9 cây.'),
  M(14, 2, 'Bài toán bằng lời', 'Chị có 8 cái kẹo, chị cho em 3 cái. Chị còn mấy cái kẹo?', ['5', '11', '3', '6'], 'Cho đi là bớt: 8 − 3 = 5 cái.'),
  M(14, 3, 'Nhiều hơn ít hơn', 'Số vịt nhiều hơn số gà mấy con?', ['3', '11', '4', '7'], 'Vịt 7 con, gà 4 con. Nối từng cặp còn thừa 3 con vịt: 7 − 4 = 3.', tks(rep('🦆', 7), rep('🐔', 4))),
  M(14, 3, 'So sánh phép tính', 'Chọn dấu điền vào chỗ chấm: 3 + 4 … 9 − 2', ['=', '<', '>', '+'], '3 + 4 = 7 và 9 − 2 = 7. Hai bên bằng nhau nên điền dấu =.'),
  M(14, 2, 'Suy luận hình ảnh', 'Số nào thay cho dấu hỏi?', ['3', '13', '2', '4'], '5 + 3 = 8, nên số cần tìm là 3.', tk('5', '+', '?', '=', '8')),

  V(14, 1, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['ong', 'ông', 'ung', 'on'], 'Con ong: tiếng "ong" có vần ong.', tk('🐝')),
  V(14, 2, 'Hình và vần', 'Đồ vật trong hình là cái trống. Tiếng "trống" có vần gì?', ['ông', 'ong', 'ung', 'ôn'], 'Tiếng "trống" có âm tr, vần ông và dấu sắc.', tk('🥁')),
  V(14, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần iên?', ['tiên', 'tiêm', 'tin', 'tên'], 'Cô tiên có vần iên. "tiêm" có vần iêm.'),
  V(14, 3, 'Chính tả iê/yê', 'Từ nào viết đúng chính tả?', ['yêu quý', 'iêu quý', 'yêu qúy', 'iêu qúy'], 'Tiếng không có âm đầu thì viết yê: yêu. Dấu sắc đặt trên chữ y: quý.'),
  V(14, 2, 'Vần', 'Tiếng "biển" có vần gì?', ['iên', 'in', 'iêt', 'ên'], 'Tiếng "biển" có âm b, vần iên và dấu hỏi.'),
  V(14, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần ưng?', ['trứng', 'luộc', 'bé', 'cho'], 'Tiếng "trứng" có âm tr, vần ưng và dấu sắc.', txt('Mẹ luộc trứng cho bé.')),
  V(14, 3, 'Đọc câu', 'Câu bên có mấy tiếng có vần ông?', ['3', '4', '2', '5'], 'Ông, trồng, hồng có vần ông. Tiếng "trong" có vần ong, không đếm. Có 3 tiếng.', txt('Ông trồng cây hồng trong vườn.')),
  V(14, 2, 'Hình và vần', 'Đồ chơi trong hình là cái diều. Tiếng "diều" có vần gì?', ['iêu', 'yêu', 'iu', 'êu'], 'Diều có âm đầu d nên vần viết iêu. Chỉ khi không có âm đầu mới viết yêu.', tk('🪁')),

  /* ======================= TUẦN 15 ======================= */
  M(15, 1, 'Khối hình', 'Con xúc xắc trong hình có dạng khối gì?', ['khối lập phương', 'khối hộp chữ nhật', 'hình vuông', 'hình tròn'], 'Xúc xắc có 6 mặt đều là hình vuông bằng nhau: khối lập phương.', tk('🎲')),
  M(15, 1, 'Đếm khối', 'Có mấy khối lập phương?', ['3', '2', '4', '1'], 'Ba khối xếp thành một hàng: 1, 2, 3.', { type: 'cubes', cols: [[1, 1, 1]] }),
  M(15, 2, 'Đếm khối', 'Có mấy khối lập phương?', ['3', '2', '4', '5'], 'Chồng bên trái có 2 khối, bên phải 1 khối: 2 + 1 = 3.', { type: 'cubes', cols: [[2, 1]] }),
  M(15, 2, 'Đếm khối', 'Có mấy khối lập phương?', ['6', '5', '3', '7'], 'Ba chồng cao 3, 2, 1 khối: 3 + 2 + 1 = 6.', { type: 'cubes', cols: [[3, 2, 1]] }),
  M(15, 3, 'Đếm khối', 'Có mấy khối lập phương?', ['4', '2', '3', '6'], 'Hàng trước 2 khối, hàng sau 2 khối bị che bớt. Có 4 khối.', { type: 'cubes', cols: [[1, 1], [1, 1]] }),
  M(15, 2, 'Khối hình', 'Đồ vật nào có dạng khối hộp chữ nhật?', ['hộp sữa giấy', 'con xúc xắc', 'quả bóng', 'lon nước ngọt'], 'Hộp sữa giấy dài hơn rộng: khối hộp chữ nhật. Xúc xắc là khối lập phương.'),

  V(15, 2, 'Hình và vần', 'Đồ vật trong hình là cái chuông. Tiếng "chuông" có vần gì?', ['uông', 'uôn', 'ương', 'ông'], 'Tiếng "chuông" có âm ch và vần uông.', tk('🔔')),
  V(15, 2, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['uôt', 'uôc', 'ôt', 'ut'], 'Con chuột: tiếng "chuột" có vần uôt và dấu nặng.', tk('🐭')),
  V(15, 2, 'Hình và vần', 'Tên quả trong hình có vần gì?', ['uôi', 'ươi', 'ôi', 'ui'], 'Quả chuối: tiếng "chuối" có vần uôi và dấu sắc.', tk('🍌')),
  V(15, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần ươu?', ['hươu', 'cừu', 'mười', 'lều'], 'Con hươu có vần ươu. "cừu" có vần ưu, "mười" có vần ươi.'),
  V(15, 3, 'Chính tả', 'Từ nào viết đúng chính tả?', ['buổi sáng', 'bưởi sáng', 'buổi xáng', 'bủi sáng'], 'Buổi sáng: vần uôi, âm đầu s. "bưởi" là tên một loại quả.'),
  V(15, 1, 'Vần', 'Tiếng "muối" có vần gì?', ['uôi', 'ươi', 'ôi', 'ui'], 'Tiếng "muối" có âm m, vần uôi và dấu sắc.'),
  V(15, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần uôn?', ['luôn', 'vâng', 'lời', 'bà'], 'Tiếng "luôn" có âm l và vần uôn.', txt('Bé luôn vâng lời bà.')),

  /* ======================= TUẦN 16 ======================= */
  M(16, 1, 'Vị trí', 'Con vật nào ở giữa?', ['con mèo', 'con chó', 'con thỏ', 'con gà'], 'Chó bên trái, thỏ bên phải, mèo ở giữa.', tk('🐶', '🐱', '🐰')),
  M(16, 2, 'Vị trí', 'Quả nào ở bên phải quả táo?', ['chùm nho', 'quả chuối', 'quả táo', 'quả cam'], 'Chuối ở bên trái quả táo, nho ở bên phải quả táo.', tk('🍌', '🍎', '🍇')),
  M(16, 1, 'Vị trí', 'Con gì ở trên con mèo?', ['con chim', 'con chuột', 'con chó', 'con cá'], 'Chim ở trên cùng, mèo ở giữa, chuột ở dưới cùng.', tks(['🐦'], ['🐱'], ['🐭'])),
  M(16, 3, 'Vị trí', 'Đếm từ trái sang phải, con vật thứ ba là con gì?', ['con thỏ', 'con bò', 'con vịt', 'con gà'], 'Từ trái sang: gà, vịt, thỏ. Con thứ ba là thỏ. Đếm từ phải sang thì ra con bò.', tk('🐔', '🦆', '🐰', '🐄', '🐶', '🐱')),
  M(16, 3, 'Vị trí', 'Bạn Hà đứng thứ 3 tính từ trái sang, thứ 2 tính từ phải sang. Hàng có mấy bạn?', ['4', '5', '6', '3'], 'Bên trái Hà có 2 bạn, bên phải Hà có 1 bạn. Hàng có 2 + 1 + 1 = 4 bạn. Lấy 3 + 2 = 5 là đếm Hà hai lần.'),
  M(16, 1, 'Vị trí', 'Hình tròn ở đâu so với hình vuông?', ['ở trên', 'ở dưới', 'bên trái', 'bên phải'], 'Hình tròn đỏ nằm phía trên hình vuông xanh.', tks(['circle.red'], ['sq.blue'])),
  M(16, 1, 'Vị trí', 'Ngôi sao ở bên nào của mặt trăng?', ['bên trái', 'bên phải', 'ở trên', 'ở dưới'], 'Ngôi sao vàng nằm bên trái, mặt trăng nằm bên phải.', tk('star', 'moon')),

  V(16, 2, 'Hình và vần', 'Tên con vật trong hình có vần gì?', ['ươm', 'uôm', 'ươn', 'ơm'], 'Con bướm: tiếng "bướm" có vần ươm và dấu sắc.', tk('🦋')),
  V(16, 1, 'Hình và vần', 'Hình bên là bông hoa. Tiếng "hoa" có vần gì?', ['oa', 'oe', 'o', 'a'], 'Tiếng "hoa" có âm h và vần oa.', tk('🌸')),
  V(16, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần ươn?', ['vườn', 'vương', 'vượt', 'vờn'], 'Vườn có vần ươn. "vương" có vần ương, thêm chữ g.'),
  V(16, 1, 'Tìm tiếng có vần', 'Tiếng nào có vần ương?', ['gương', 'gà', 'ghế', 'gỗ'], 'Cái gương: âm g và vần ương.'),
  V(16, 3, 'Tìm tiếng có vần', 'Tiếng nào khác vần với ba tiếng còn lại?', ['đường', 'vườn', 'mượn', 'lượn'], 'vườn, mượn, lượn cùng vần ươn. Riêng "đường" có vần ương.'),
  V(16, 3, 'Chính tả', 'Từ nào viết đúng chính tả?', ['cầu trượt', 'cầu chượt', 'cầu trược', 'cầu chược'], 'Cầu trượt: âm tr, vần ươt. Nhiều bạn lẫn tr với ch, t với c.'),
  V(16, 2, 'Vần', 'Tiếng "mướp" (quả mướp) có vần gì?', ['ươp', 'ươc', 'uôp', 'ơp'], 'Tiếng "mướp" có âm m, vần ươp và dấu sắc.'),
  V(16, 1, 'Đọc câu', 'Trong câu bên, tiếng nào có vần oe?', ['khoe', 'mào', 'trống', 'đỏ'], 'Tiếng "khoe" có âm kh và vần oe.', txt('Chú gà trống khoe mào đỏ.')),

  /* ======================= TUẦN 17 ======================= */
  M(17, 3, 'Tính liên tiếp', 'Tính: 10 − 5 + 3 = ?', ['8', '2', '5', '18'], 'Tính từ trái sang phải: 10 − 5 = 5, 5 + 3 = 8. Tính 5 + 3 trước ra 2 là sai.'),
  M(17, 2, 'Bảng cộng trừ', 'Bin làm bốn phép tính, có một phép tính bị nhầm kết quả. Đó là phép tính nào?', ['4 + 5 = 8', '6 + 3 = 9', '10 − 2 = 8', '7 − 4 = 3'], '4 + 5 = 9 chứ không bằng 8. Ba phép tính kia đều đúng.'),
  M(17, 3, 'Suy luận hình ảnh', 'Ba con cá giống nhau cộng lại bằng 9. Một con cá bằng mấy?', ['3', '9', '6', '4'], '3 + 3 + 3 = 9, nên mỗi con cá bằng 3.', tks(['🐟', '+', '🐟', '+', '🐟', '=', '9'], ['🐟', '=', '?', '_', '_', '_', '_'])),
  M(17, 3, 'Dãy số', 'Số nào tiếp theo: 1, 3, 5, 7, …', ['9', '8', '10', '11'], 'Mỗi số hơn số trước 2 đơn vị: 7 + 2 = 9.'),
  M(17, 2, 'Đếm hình', 'Có mấy hình chữ nhật?', ['3', '2', '4', '6'], 'Hình chữ nhật xanh dương, xanh lá, cam. Có 3 hình.', tk('rect.blue', 'tri.red', 'rect.green', 'circle.yellow', 'rect.orange', 'diamond.purple')),
  M(17, 3, 'Đếm hình', 'Hình bên có mấy hình chữ nhật?', ['3', '2', '4', '1'], 'Hình nhỏ bên trái, hình nhỏ bên phải và hình to bao cả hai. Có 3 hình chữ nhật.', { type: 'lines', labels: false, pts: { A: [0, 0], B: [4, 0], C: [8, 0], D: [0, 2.5], E: [4, 2.5], F: [8, 2.5] }, segs: [['A', 'B'], ['B', 'C'], ['D', 'E'], ['E', 'F'], ['A', 'D'], ['B', 'E'], ['C', 'F']] }),
  M(17, 2, 'Nhiều hơn ít hơn', 'Tổ Một có 6 bạn, tổ Hai có 4 bạn. Tổ Một nhiều hơn tổ Hai mấy bạn?', ['2', '10', '4', '6'], 'Lấy 6 − 4 = 2. Tổ Một nhiều hơn 2 bạn.'),

  V(17, 2, 'Tìm tiếng có vần', 'Tiếng nào có vần oan?', ['ngoan', 'ngoăn', 'ngan', 'ngon'], 'Ngoan có vần oan. "ngoăn" (ngoằn ngoèo) có vần oăn.'),
  V(17, 2, 'Vần', 'Tiếng "khoai" có vần gì?', ['oai', 'oay', 'ai', 'oa'], 'Củ khoai: âm kh và vần oai.'),
  V(17, 2, 'Chính tả', 'Từ nào viết đúng chính tả?', ['mùa xuân', 'mùa suân', 'mùa xuâng', 'mùa xân'], 'Mùa xuân: âm x, vần uân.'),
  V(17, 2, 'Hình và vần', 'Hình bên là con thuyền. Tiếng "thuyền" có vần gì?', ['uyên', 'iên', 'uyêt', 'uân'], 'Tiếng "thuyền" có âm th, vần uyên và dấu huyền.', tk('⛵')),
  V(17, 3, 'Đọc câu', 'Câu bên có mấy tiếng có vần uyên?', ['2', '1', '3', '4'], 'chuyện, thuyền có vần uyên. Có 2 tiếng.', txt('Bé nghe kể chuyện về con thuyền.')),
  V(17, 2, 'Vần', 'Tiếng "huệ" (hoa huệ) có vần gì?', ['uê', 'ê', 'uy', 'ue'], 'Tiếng "huệ" có âm h, vần uê và dấu nặng.'),
  V(17, 3, 'Ghép tiếng', 'Ghép âm t, vần oan và dấu sắc được tiếng nào?', ['toán', 'toàn', 'tuấn', 'tán'], 't + oan + dấu sắc = toán (môn Toán). "toàn" có dấu huyền.'),

  /* ======================= TUẦN 18 ======================= */
  M(18, 3, 'Ôn tập số', 'Số lớn nhất có một chữ số là số nào?', ['9', '10', '1', '99'], 'Các số có một chữ số là 0 đến 9. Số 10 có hai chữ số.'),
  M(18, 1, 'Cộng bằng hình', 'Có tất cả mấy viên kẹo?', ['10', '9', '5', '11'], 'Mỗi hàng 5 viên, hai hàng: 5 + 5 = 10.', tks(rep('🍬', 5), rep('🍬', 5))),
  M(18, 3, 'Bài toán bằng lời', 'Nhà Nam nuôi 4 con gà và 3 con vịt. Mẹ bán 2 con gà. Nhà Nam còn mấy con gà?', ['2', '5', '7', '9'], 'Chỉ hỏi số gà: 4 − 2 = 2 con. Đem cả vịt vào là nhầm.'),
  M(18, 2, 'Tia số', 'Số nào thay cho dấu hỏi?', ['9', '8', '6', '11'], 'Vạch dấu hỏi nằm ngay trước vạch 10, nên là 9.', { type: 'numline', from: 0, to: 10, label: [0, 5, 10], ask: [9] }),
  M(18, 3, 'So sánh phép tính', 'Số nào lớn hơn 5 + 2?', ['8', '7', '6', '5'], '5 + 2 = 7. Chỉ có 8 lớn hơn 7. Số 7 thì bằng chứ không lớn hơn.'),
  M(18, 3, 'Suy luận hình ảnh', 'Mỗi hình là một số. Hình tròn bằng mấy?', ['4', '7', '1', '3'], 'Vuông + vuông = 6 nên vuông là 3. Vuông + tròn = 7, mà 3 + 4 = 7, nên tròn là 4.', tks(['sq.blue', '+', 'sq.blue', '=', '6'], ['sq.blue', '+', 'circle.red', '=', '7'], ['circle.red', '=', '?', '_', '_'])),
  M(18, 1, 'Đếm số lượng', 'Đêm Trung thu, có mấy chiếc đèn lồng?', ['8', '7', '9', '4'], 'Mỗi hàng 4 chiếc, đếm cả hai hàng: 8 chiếc.', tks(rep('🏮', 4), rep('🏮', 4))),
  M(18, 3, 'Bài toán bằng lời', 'Bi có 5 cái bánh. Bi cho bà 2 cái, cho mẹ 1 cái. Bi còn mấy cái bánh?', ['2', '3', '8', '4'], 'Cho bà: 5 − 2 = 3. Cho mẹ: 3 − 1 = 2. Bi còn 2 cái.'),

  V(18, 1, 'Đọc hiểu', 'Đoạn thơ bên nói về dịp nào?', ['Tết Trung thu', 'Tết Nguyên đán', 'Ngày khai giảng', 'Sinh nhật bé'], 'Có trăng sáng, đèn ông sao, rước đèn: đó là Tết Trung thu.', txt('Trung thu trăng sáng,', 'Đèn ông sao xoay.', 'Bé vui múa hát,', 'Rước đèn vòng quay.')),
  V(18, 1, 'Đọc hiểu', 'Trong đoạn thơ bên, bé làm gì?', ['múa hát', 'ngủ say', 'đi học', 'tưới cây'], 'Dòng thơ thứ ba: "Bé vui múa hát".', txt('Trung thu trăng sáng,', 'Đèn ông sao xoay.', 'Bé vui múa hát,', 'Rước đèn vòng quay.')),
  V(18, 3, 'Tìm tiếng có vần', 'Trong đoạn thơ bên, tiếng nào có vần ang?', ['sáng', 'trăng', 'vòng', 'rước'], 'sáng có vần ang. "trăng" có vần ăng, "vòng" có vần ong.', txt('Trung thu trăng sáng,', 'Đèn ông sao xoay.', 'Bé vui múa hát,', 'Rước đèn vòng quay.')),
  V(18, 1, 'Đếm tiếng', 'Dòng thơ "Đèn ông sao xoay" có mấy tiếng?', ['4', '5', '3', '6'], 'Đèn, ông, sao, xoay: 4 tiếng.'),
  V(18, 1, 'Từ ngữ', 'Từ nào gọi tên một con vật?', ['con công', 'cái cân', 'quả cam', 'cây cau'], 'Con công là con vật. Cái cân là đồ vật, quả cam là quả, cây cau là cây.'),
  V(18, 2, 'Từ ngữ', 'Từ nào gọi tên một loại quả?', ['quả bưởi', 'củ khoai', 'cây bàng', 'lá chuối'], 'Bưởi là quả. Khoai là củ, bàng là cây, lá chuối là lá.'),
  V(18, 3, 'Chính tả', 'Câu nào viết đúng?', ['Bé ghé nhà bà.', 'Bé gé nhà bà.', 'Bé ghe nhà bà.', 'Bé ghé nhá bà.'], 'Trước e viết gh, tiếng "ghé" có dấu sắc, tiếng "nhà" có dấu huyền.'),
  V(18, 2, 'Đọc hiểu', 'Đọc câu bên. Ai đi chợ?', ['mẹ và Hà', 'bố và Hà', 'bà và Hà', 'chỉ có Hà'], 'Câu nói: mẹ đưa Hà đi chợ. Vậy mẹ và Hà đi chợ.', txt('Sáng chủ nhật, mẹ đưa Hà đi chợ mua cá.')),
];
