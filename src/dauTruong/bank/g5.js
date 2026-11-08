/**
 * 🏆 Đấu Trường Nhí: ngân hàng câu soạn tay lớp 5 (Toán + Tiếng Việt, chương trình 2018, bám sách Kết nối tri thức).
 * w: tuần học (1–35; HK I 1–18, HK II 19–35), chỉ hỏi khi lớp đã học tới tuần đó. abcd: o[0] đúng. order: o theo thứ tự đúng.
 * Toán HK I theo Bài 1–35 SGK Toán 5 Tập Một (khoảng 2 Bài một tuần); HK II: tỉ số, phần trăm, thể tích, thời gian, chuyển động.
 * Tiếng Việt: đồng nghĩa, đa nghĩa (HK I đầu), đại từ, kết từ (HK I cuối); câu ghép, liên kết câu, dấu câu, điệp từ (HK II).
 * Kiểm tra: node scripts/dautruong-check.mjs 5
 */
export default [
  // ══════════════════════════════════ TIẾNG VIỆT ══════════════════════════════════

  // ── Từ đồng nghĩa ──
  { w: 1, m: 'tv', lv: 1, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "siêng năng"?', o: ['chăm chỉ', 'lười biếng', 'thông minh', 'vui vẻ'], ex: 'Siêng năng, chăm chỉ đều chỉ người chịu khó làm việc.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "to lớn"?', o: ['khổng lồ', 'nhỏ bé', 'xinh xắn', 'tí hon'], ex: 'Khổng lồ nghĩa là rất to lớn.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "Tổ quốc"?', o: ['đất nước', 'làng xóm', 'gia đình', 'trường học'], ex: 'Tổ quốc, đất nước, non sông là các từ đồng nghĩa.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "hạnh phúc"?', o: ['sung sướng', 'đau khổ', 'buồn bã', 'vất vả'], ex: 'Hạnh phúc, sung sướng đều chỉ cảm giác vui, đầy đủ.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "quê hương"?', o: ['quê quán', 'thành thị', 'nước ngoài', 'phố phường'], ex: 'Quê hương, quê quán đều chỉ nơi mình sinh ra.' },
  { w: 2, m: 'tv', lv: 2, t: 'Từ đồng nghĩa', q: 'Nhóm nào gồm các từ đồng nghĩa?', o: ['xanh biếc, xanh thẳm, xanh lơ', 'đỏ tươi, vàng óng, tím than', 'cao vút, thấp lè tè, dài ngoằng', 'nóng bức, lạnh giá, mát mẻ'], ex: 'Các từ xanh biếc, xanh thẳm, xanh lơ đều chỉ màu xanh.' },
  { w: 2, m: 'tv', lv: 2, t: 'Từ đồng nghĩa', q: 'Từ nào thay cho "ăn" trong câu "Mời bác ăn cơm ạ!" để lời mời lễ phép hơn?', o: ['xơi', 'đớp', 'tọng', 'nhai'], ex: '"Xơi" là cách nói lịch sự, kính trọng của "ăn".' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "dũng cảm"?', o: ['gan dạ', 'nhút nhát', 'hiền lành', 'cẩn thận'], ex: 'Dũng cảm, gan dạ, can đảm là các từ đồng nghĩa.' },
  { w: 2, m: 'tv', lv: 2, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "chết" nhưng nói trang trọng?', o: ['qua đời', 'ngủ say', 'biến mất', 'đi vắng'], ex: '"Qua đời" là cách nói trang trọng, nhẹ nhàng của "chết".' },
  { w: 3, m: 'tv', lv: 3, t: 'Từ đồng nghĩa', q: 'Chọn từ hợp nhất với chỗ trống: "Cánh đồng lúa chín … một màu."', o: ['vàng óng', 'vàng khè', 'vàng ệch', 'vàng vọt'], ex: '"Vàng óng" là vàng đẹp, có ánh; các từ kia mang nghĩa chê.' },
  { w: 3, m: 'tv', lv: 1, t: 'Từ đồng nghĩa', q: 'Từ nào đồng nghĩa với "nhanh nhẹn"?', o: ['hoạt bát', 'chậm chạp', 'lề mề', 'uể oải'], ex: 'Hoạt bát nghĩa là nhanh nhẹn, linh hoạt.' },
  { w: 3, m: 'tv', lv: 2, t: 'Từ đồng nghĩa', q: 'Cặp từ nào là cặp từ đồng nghĩa?', o: ['tổ tiên, ông cha', 'cao, thấp', 'chăm, lười', 'sáng, tối'], ex: 'Tổ tiên và ông cha cùng chỉ những người đời trước.' },

  // ── Từ đa nghĩa ──
  { w: 4, m: 'tv', lv: 2, t: 'Từ đa nghĩa', q: 'Trong câu nào, từ "chân" mang nghĩa gốc?', o: ['Bé bị đau chân.', 'Chân bàn bị gãy.', 'Mây trôi dưới chân núi.', 'Chân tường bị ẩm.'], ex: 'Nghĩa gốc của "chân" là bộ phận cơ thể người, con vật.' },
  { w: 4, m: 'tv', lv: 2, t: 'Từ đa nghĩa', q: 'Trong câu nào, từ "mắt" mang nghĩa chuyển?', o: ['Quả na đã mở mắt.', 'Mắt bé tròn xoe.', 'Bà đeo kính cho đỡ mỏi mắt.', 'Em nhắm mắt lại.'], ex: '"Mắt" của quả na là phần vỏ nứt ra, đó là nghĩa chuyển.' },
  { w: 4, m: 'tv', lv: 1, t: 'Từ đa nghĩa', q: 'Từ "ăn" trong câu nào mang nghĩa gốc?', o: ['Cả nhà ăn cơm tối.', 'Tàu ăn hàng ở cảng.', 'Da bé ăn nắng.', 'Nước ăn chân.'], ex: 'Nghĩa gốc của "ăn" là đưa thức ăn vào miệng.' },
  { w: 5, m: 'tv', lv: 2, t: 'Từ đa nghĩa', q: 'Từ "đầu" trong câu nào mang nghĩa chuyển?', o: ['Em đứng ở đầu hàng.', 'Bé đội mũ lên đầu.', 'Bố gội đầu.', 'Em lắc đầu.'], ex: '"Đầu" ở đây là vị trí trước nhất của hàng, nghĩa chuyển.' },
  { w: 5, m: 'tv', lv: 2, t: 'Từ đa nghĩa', q: 'Từ "lưỡi" trong cụm từ nào mang nghĩa chuyển?', o: ['lưỡi liềm', 'thè lưỡi', 'bỏng lưỡi', 'lưỡi chú chó'], ex: 'Lưỡi liềm là phần sắc của cái liềm, nghĩa chuyển.' },
  { w: 6, m: 'tv', lv: 2, t: 'Từ đa nghĩa', q: 'Từ "chạy" trong câu nào mang nghĩa chuyển?', o: ['Đồng hồ chạy đúng giờ.', 'Em chạy ra sân.', 'Con ngựa chạy nhanh.', 'Bạn Nam chạy thi.'], ex: 'Đồng hồ "chạy" là hoạt động của máy, nghĩa chuyển.' },
  { w: 6, m: 'tv', lv: 2, t: 'Từ đa nghĩa', q: 'Câu nào có từ "ngọt" mang nghĩa chuyển?', o: ['Bạn ấy nói ngọt, ai cũng nghe.', 'Quả xoài này rất ngọt.', 'Nước mía ngọt lịm.', 'Bánh kẹo ngọt quá.'], ex: '"Nói ngọt" là nói dịu dàng, dễ nghe, nghĩa chuyển.' },
  { w: 6, m: 'tv', lv: 1, t: 'Từ đa nghĩa', q: 'Từ "lá" trong câu nào mang nghĩa gốc?', o: ['Lá bàng đỏ rực.', 'Em gửi lá thư cho bà.', 'Lá cờ bay phấp phới.', 'Cô phát cho em lá phiếu.'], ex: 'Nghĩa gốc của "lá" là bộ phận của cây.' },
  { w: 7, m: 'tv', lv: 3, t: 'Từ đa nghĩa', q: 'Nghĩa gốc của từ "mũi" là gì?', o: ['bộ phận để thở, ngửi trên mặt', 'phần nhọn ở trước con thuyền', 'dải đất nhô ra biển', 'đầu nhọn của con dao'], ex: 'Các nghĩa kia đều chuyển từ hình dáng cái mũi.' },
  { w: 7, m: 'tv', lv: 2, t: 'Từ đa nghĩa', q: 'Từ "cổ" trong câu nào mang nghĩa chuyển?', o: ['Cổ chai bị mẻ.', 'Con hươu cao cổ.', 'Bé quàng khăn vào cổ.', 'Em bị đau cổ.'], ex: 'Cổ chai là chỗ thắt nhỏ của cái chai, nghĩa chuyển.' },

  // ── Từ đồng âm ──
  { w: 7, m: 'tv', lv: 2, t: 'Từ đồng âm', q: 'Trong câu "Con ruồi đậu mâm xôi đậu.", hai từ "đậu" là:', o: ['từ đồng âm', 'từ đồng nghĩa', 'từ trái nghĩa', 'từ nhiều nghĩa'], ex: '"Đậu" (đỗ lại) và "đậu" (hạt đậu) giống âm, khác hẳn nghĩa.' },
  { w: 8, m: 'tv', lv: 2, t: 'Từ đồng âm', q: 'Từ "bàn" trong "bàn học" và "bàn bạc" là:', o: ['từ đồng âm', 'từ đồng nghĩa', 'từ trái nghĩa', 'từ láy'], ex: 'Một chỉ đồ vật, một chỉ hoạt động trao đổi: đồng âm.' },
  { w: 8, m: 'tv', lv: 2, t: 'Từ đồng âm', q: '"Đá" trong "hòn đá" và "đá bóng" là hai từ có quan hệ gì?', o: ['đồng âm', 'đồng nghĩa', 'trái nghĩa', 'nhiều nghĩa'], ex: 'Hòn đá là vật, đá bóng là hoạt động: hai từ đồng âm.' },
  { w: 8, m: 'tv', lv: 3, t: 'Từ đồng âm', q: 'Trong câu "Kiến bò đĩa thịt bò.", hai từ "bò" là:', o: ['từ đồng âm', 'từ nhiều nghĩa', 'từ đồng nghĩa', 'từ trái nghĩa'], ex: '"Bò" (di chuyển) và "bò" (con bò) là hai từ đồng âm.' },

  // ── Từ trái nghĩa ──
  { w: 9, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "chăm chỉ"?', o: ['lười biếng', 'siêng năng', 'cần cù', 'chịu khó'], ex: 'Chăm chỉ trái nghĩa với lười biếng.' },
  { w: 9, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Chọn từ trái nghĩa điền vào chỗ trống: "Lá lành đùm lá …"', o: ['rách', 'xanh', 'vàng', 'non'], ex: 'Lành và rách là cặp từ trái nghĩa.' },
  { w: 9, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Chọn từ điền vào chỗ trống: "Chết … còn hơn sống nhục."', o: ['vinh', 'sướng', 'khổ', 'đẹp'], ex: 'Vinh (vẻ vang) trái nghĩa với nhục.' },
  { w: 9, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "hòa bình"?', o: ['chiến tranh', 'thanh bình', 'yên ổn', 'thái bình'], ex: 'Hòa bình trái nghĩa với chiến tranh.' },
  { w: 9, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "trung thực"?', o: ['gian dối', 'thật thà', 'ngay thẳng', 'thẳng thắn'], ex: 'Trung thực trái nghĩa với gian dối.' },
  { w: 9, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Câu tục ngữ nào có cặp từ trái nghĩa?', o: ['Ăn ít ngon nhiều.', 'Uống nước nhớ nguồn.', 'Tốt gỗ hơn tốt nước sơn.', 'Có chí thì nên.'], ex: '"Ít" và "nhiều" là cặp từ trái nghĩa.' },
  { w: 34, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "đoàn kết"?', o: ['chia rẽ', 'gắn bó', 'yêu thương', 'đùm bọc'], ex: 'Đoàn kết trái nghĩa với chia rẽ.' },

  // ── Đại từ ──
  { w: 10, m: 'tv', lv: 1, t: 'Đại từ', q: 'Từ nào là đại từ?', o: ['chúng tôi', 'học sinh', 'bàn ghế', 'chạy nhảy'], ex: '"Chúng tôi" là đại từ xưng hô.' },
  { w: 10, m: 'tv', lv: 2, t: 'Đại từ', q: 'Trong đoạn "Con mèo nhà em rất lười. Suốt ngày nó nằm sưởi nắng.", từ "nó" thay cho từ ngữ nào?', o: ['con mèo', 'nhà em', 'sưởi nắng', 'suốt ngày'], ex: '"Nó" thay cho "con mèo" để khỏi lặp từ.' },
  { w: 10, m: 'tv', lv: 2, t: 'Đại từ', q: 'Trong câu "Tôi thích đọc sách, Lan cũng vậy.", từ "vậy" thay cho cụm từ nào?', o: ['thích đọc sách', 'Tôi', 'Lan', 'cũng'], ex: '"Vậy" thay cho "thích đọc sách".' },
  { w: 11, m: 'tv', lv: 1, t: 'Đại từ', q: 'Đại từ xưng hô nào dùng để chỉ người nói?', o: ['tôi', 'bạn', 'nó', 'họ'], ex: '"Tôi" chỉ chính người đang nói.' },
  { w: 11, m: 'tv', lv: 1, t: 'Đại từ', q: 'Từ nào là đại từ chỉ người nghe?', o: ['cậu', 'tớ', 'mình', 'chúng tôi'], ex: 'Khi nói với bạn, "cậu" chỉ người nghe; "tớ", "mình" chỉ người nói.' },
  { w: 11, m: 'tv', lv: 1, t: 'Đại từ', q: 'Đại từ nào chỉ người được nói tới?', o: ['họ', 'chúng ta', 'tôi', 'bạn'], ex: '"Họ" chỉ những người được nhắc tới, ngoài người nói và người nghe.' },
  { w: 11, m: 'tv', lv: 2, t: 'Đại từ', q: 'Khi nói chuyện với cô giáo, em xưng hô thế nào cho lễ phép?', o: ['xưng "em", gọi "cô"', 'xưng "tớ", gọi "cậu"', 'xưng "tao", gọi "mày"', 'xưng "tôi", gọi "bạn"'], ex: 'Với thầy cô, em xưng "em" để tỏ lòng kính trọng.' },
  { w: 12, m: 'tv', lv: 2, t: 'Đại từ', q: 'Trong câu "Bạn tên là gì?", đại từ dùng để hỏi là từ nào?', o: ['gì', 'bạn', 'tên', 'là'], ex: '"Gì" là đại từ dùng để hỏi.' },
  { w: 12, m: 'tv', lv: 2, t: 'Đại từ', q: 'Trong câu "Cô bé ấy đi đâu?", đại từ dùng để hỏi là từ nào?', o: ['đâu', 'cô bé', 'ấy', 'đi'], ex: '"Đâu" là đại từ dùng để hỏi nơi chốn.' },
  { w: 12, m: 'tv', lv: 2, t: 'Đại từ', q: 'Câu nào dùng đại từ để tránh lặp từ?', o: ['Chú chó rất khôn, nó biết giữ nhà.', 'Chú chó rất khôn, chú chó giữ nhà.', 'Chú chó rất khôn và giữ nhà.', 'Chú chó khôn, biết giữ nhà.'], ex: '"Nó" thay cho "chú chó" ở vế sau.' },

  // ── Kết từ ──
  { w: 13, m: 'tv', lv: 1, t: 'Kết từ', q: 'Từ nào là kết từ?', o: ['nhưng', 'bàn', 'đẹp', 'chạy'], ex: '"Nhưng" dùng để nối các từ ngữ, các câu.' },
  { w: 13, m: 'tv', lv: 1, t: 'Kết từ', q: 'Chọn kết từ điền vào chỗ trống: "Trời mưa … đường trơn."', o: ['nên', 'nhưng', 'hay', 'hoặc'], ex: 'Mưa là nguyên nhân, đường trơn là kết quả: dùng "nên".' },
  { w: 13, m: 'tv', lv: 1, t: 'Kết từ', q: 'Chọn kết từ điền vào chỗ trống: "Nhà em nghèo … em vẫn học giỏi."', o: ['nhưng', 'nên', 'vì', 'nếu'], ex: 'Hai ý trái ngược nhau: dùng "nhưng".' },
  { w: 14, m: 'tv', lv: 1, t: 'Kết từ', q: 'Trong câu "Bố đi làm bằng xe máy.", kết từ là từ nào?', o: ['bằng', 'bố', 'đi làm', 'xe máy'], ex: '"Bằng" nối "đi làm" với "xe máy", chỉ phương tiện.' },
  { w: 14, m: 'tv', lv: 2, t: 'Kết từ', q: 'Trong câu "Đây là cặp sách của Lan.", kết từ "của" nối "cặp sách" với từ nào?', o: ['Lan', 'Đây', 'là', 'sách'], ex: '"Của" chỉ cặp sách thuộc về Lan.' },
  { w: 15, m: 'tv', lv: 2, t: 'Kết từ', q: 'Chọn cặp kết từ hợp với câu: "… trời mưa to … em vẫn đi học đúng giờ."', o: ['Tuy … nhưng …', 'Vì … nên …', 'Do … nên …', 'Nhờ … mà …'], ex: 'Mưa to mà vẫn đúng giờ là hai ý tương phản: Tuy … nhưng …' },
  { w: 20, m: 'tv', lv: 2, t: 'Kết từ', q: 'Cặp kết từ "Nếu … thì …" biểu thị quan hệ gì?', o: ['điều kiện, kết quả', 'nguyên nhân, kết quả', 'tương phản', 'tăng tiến'], ex: 'Nếu (điều kiện) … thì (kết quả) …' },
  { w: 20, m: 'tv', lv: 2, t: 'Kết từ', q: 'Cặp kết từ "Tuy … nhưng …" biểu thị quan hệ gì?', o: ['tương phản', 'nguyên nhân, kết quả', 'điều kiện, kết quả', 'tăng tiến'], ex: 'Hai vế có ý trái ngược nhau: quan hệ tương phản.' },
  { w: 21, m: 'tv', lv: 2, t: 'Kết từ', q: 'Cặp kết từ "Vì … nên …" biểu thị quan hệ gì?', o: ['nguyên nhân, kết quả', 'tương phản', 'tăng tiến', 'điều kiện, kết quả'], ex: 'Vì (nguyên nhân) … nên (kết quả) …' },
  { w: 21, m: 'tv', lv: 3, t: 'Kết từ', q: 'Cặp kết từ "Chẳng những … mà còn …" biểu thị quan hệ gì?', o: ['tăng tiến', 'tương phản', 'nguyên nhân, kết quả', 'điều kiện, kết quả'], ex: 'Ý sau nâng cao hơn ý trước: quan hệ tăng tiến.' },

  // ── Câu ghép ──
  { w: 19, m: 'tv', lv: 1, t: 'Câu ghép', q: 'Câu nào là câu ghép?', o: ['Mặt trời mọc, sương tan dần.', 'Mặt trời mọc ở phía đông.', 'Sáng nay, em đi học sớm.', 'Đàn chim bay về tổ.'], ex: 'Câu ghép có hai vế, mỗi vế có chủ ngữ và vị ngữ riêng.' },
  { w: 19, m: 'tv', lv: 1, t: 'Câu ghép', q: 'Câu ghép "Mưa rào rào, gió thổi ào ào." có mấy vế câu?', o: ['2 vế', '1 vế', '3 vế', '4 vế'], ex: 'Vế 1: Mưa rào rào. Vế 2: gió thổi ào ào.' },
  { w: 20, m: 'tv', lv: 2, t: 'Câu ghép', q: 'Câu "Lan học bài còn Huệ quét nhà." có hai vế nối với nhau bằng từ nào?', o: ['còn', 'Lan', 'học bài', 'quét'], ex: 'Kết từ "còn" nối hai vế câu ghép.' },
  { w: 20, m: 'tv', lv: 2, t: 'Câu ghép', q: 'Câu ghép "Em đi học, mẹ đi làm, bố đi công tác." có mấy vế?', o: ['3 vế', '2 vế', '4 vế', '1 vế'], ex: 'Có ba cụm chủ ngữ, vị ngữ: em đi học, mẹ đi làm, bố đi công tác.' },
  { w: 21, m: 'tv', lv: 1, t: 'Câu ghép', q: 'Chọn vế câu thích hợp: "Vì Nam chăm chỉ luyện tập nên …"', o: ['bạn ấy đã đạt giải nhất.', 'bạn ấy bị điểm kém.', 'trời mưa rất to.', 'con mèo ngủ say.'], ex: 'Chăm luyện tập (nguyên nhân) nên đạt giải (kết quả).' },
  { w: 21, m: 'tv', lv: 2, t: 'Câu ghép', q: 'Chọn vế câu thích hợp: "Tuy nhà xa trường nhưng …"', o: ['Hà chưa bao giờ đi học muộn.', 'Hà thường đi học muộn.', 'Hà ở gần trường.', 'trường của Hà rất đẹp.'], ex: 'Tuy … nhưng … nối hai ý trái ngược: xa mà vẫn đúng giờ.' },
  { w: 22, m: 'tv', lv: 2, t: 'Câu ghép', q: 'Trong câu "Nếu chăm học thì em sẽ tiến bộ.", vế nào nêu điều kiện?', o: ['Nếu chăm học', 'thì em sẽ tiến bộ', 'em sẽ', 'tiến bộ'], ex: 'Vế có "nếu" nêu điều kiện, vế có "thì" nêu kết quả.' },
  { w: 22, m: 'tv', lv: 2, t: 'Câu ghép', q: 'Cặp từ hô ứng nào điền được vào câu: "Trời … tối, đèn … sáng."', o: ['càng … càng …', 'vì … nên …', 'tuy … nhưng …', 'nếu … thì …'], ex: '"Trời càng tối, đèn càng sáng." dùng cặp từ hô ứng càng … càng.' },

  // ── Liên kết câu ──
  { w: 23, m: 'tv', lv: 2, t: 'Liên kết câu', q: '"Bé Na có con búp bê. Na rất yêu con búp bê ấy." Hai câu liên kết bằng cách nào?', o: ['lặp từ ngữ', 'thay thế từ ngữ', 'dùng từ nối', 'dùng dấu câu'], ex: 'Từ "Na", "con búp bê" được lặp lại ở câu sau.' },
  { w: 23, m: 'tv', lv: 1, t: 'Liên kết câu', q: '"Hôm qua trời mưa. Vì vậy, sân trường ngập nước." Hai câu nối với nhau bằng từ ngữ nào?', o: ['Vì vậy', 'Hôm qua', 'trời mưa', 'sân trường'], ex: '"Vì vậy" là từ ngữ nối hai câu.' },
  { w: 24, m: 'tv', lv: 2, t: 'Liên kết câu', q: '"Hoa sen mọc trong đầm. Loài hoa ấy thơm ngát." Từ ngữ nào thay thế cho "hoa sen"?', o: ['loài hoa ấy', 'trong đầm', 'thơm ngát', 'mọc'], ex: '"Loài hoa ấy" thay cho "hoa sen" để liên kết hai câu.' },
  { w: 24, m: 'tv', lv: 2, t: 'Liên kết câu', q: 'Chọn từ nối: "Nam học rất giỏi. …, bạn ấy còn hay giúp đỡ bạn bè."', o: ['Ngoài ra', 'Tuy nhiên', 'Vì vậy', 'Trái lại'], ex: 'Câu sau nói thêm một điều tốt: dùng "Ngoài ra".' },
  { w: 25, m: 'tv', lv: 2, t: 'Liên kết câu', q: 'Chọn từ nối: "Em rất thích đọc sách. …, em chưa có nhiều thời gian để đọc."', o: ['Tuy nhiên', 'Vì vậy', 'Ngoài ra', 'Do đó'], ex: 'Ý câu sau trái với mong muốn ở câu trước: dùng "Tuy nhiên".' },
  { w: 25, m: 'tv', lv: 1, t: 'Liên kết câu', q: 'Chọn từ nối: "Đêm qua mưa to. …, sáng nay đường ngập nước."', o: ['Vì thế', 'Tuy nhiên', 'Trái lại', 'Mặc dù'], ex: 'Câu sau là kết quả của câu trước: dùng "Vì thế".' },
  { w: 26, m: 'tv', lv: 2, t: 'Liên kết câu', q: '"Thạch Sanh hiền lành, tốt bụng. Chàng sống bằng nghề kiếm củi." Từ "chàng" thay cho từ nào?', o: ['Thạch Sanh', 'nghề', 'củi', 'tốt bụng'], ex: '"Chàng" thay thế cho "Thạch Sanh".' },
  { w: 26, m: 'tv', lv: 2, t: 'Liên kết câu', q: '"Ông em là bộ đội. Ông thường kể chuyện chiến trường cho em nghe." Hai câu liên kết bằng cách nào?', o: ['lặp từ ngữ', 'dùng từ nối', 'thay thế từ ngữ', 'dùng dấu hai chấm'], ex: 'Từ "ông" được lặp lại ở câu sau.' },

  // ── Dấu câu ──
  { w: 29, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Trong đoạn hội thoại, dấu gạch ngang đặt ở đầu dòng để làm gì?', o: ['đánh dấu lời nói của nhân vật', 'kết thúc câu', 'đánh dấu câu hỏi', 'ngăn cách các vế câu ghép'], ex: 'Dấu gạch ngang đầu dòng báo lời nói của nhân vật.' },
  { w: 29, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Trong "chuyến tàu Hà Nội … Huế", dấu nào đặt ở chỗ "…" để nối hai địa danh?', o: ['dấu gạch ngang', 'dấu phẩy', 'dấu hai chấm', 'dấu chấm phẩy'], ex: 'Dấu gạch ngang nối các từ trong một liên danh: Hà Nội - Huế.' },
  { w: 30, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Dấu câu nào đặt ở đầu mỗi dòng khi liệt kê các ý?', o: ['dấu gạch ngang', 'dấu chấm than', 'dấu chấm hỏi', 'dấu ngoặc đơn'], ex: 'Dấu gạch ngang đánh dấu các ý liệt kê, mỗi ý một dòng.' },
  { w: 30, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Bé gọi con mèo là "ông hoàng nhỏ". Dấu ngoặc kép ở đây dùng để làm gì?', o: ['đánh dấu từ dùng với nghĩa đặc biệt', 'đánh dấu lời nói trực tiếp', 'kết thúc câu', 'liệt kê sự vật'], ex: 'Con mèo được gọi vui là "ông hoàng", nghĩa đặc biệt.' },
  { w: 16, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Dấu phẩy trong câu "Sáng nay, em đi học sớm." dùng để làm gì?', o: ['ngăn cách trạng ngữ với chủ ngữ', 'ngăn cách các vế câu ghép', 'liệt kê sự vật', 'đánh dấu lời nói'], ex: '"Sáng nay" là trạng ngữ, dấu phẩy tách nó với phần sau.' },
  { w: 16, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Dấu phẩy trong câu "Vườn nhà em có cam, quýt, bưởi." dùng để làm gì?', o: ['ngăn cách các từ cùng loại', 'ngăn cách trạng ngữ', 'ngăn cách các vế câu ghép', 'kết thúc câu'], ex: 'Cam, quýt, bưởi là các từ cùng loại được liệt kê.' },
  { w: 31, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Trong câu Mẹ dặn: “Con nhớ về sớm!”, dấu hai chấm dùng để làm gì?', o: ['báo hiệu lời nói trực tiếp', 'báo hiệu phần liệt kê', 'kết thúc câu', 'ngăn cách các vế câu'], ex: 'Sau dấu hai chấm là lời mẹ nói, đặt trong ngoặc kép.' },

  // ── Điệp từ, điệp ngữ ──
  { w: 31, m: 'tv', lv: 2, t: 'Điệp từ, điệp ngữ', q: 'Câu "Học, học nữa, học mãi." dùng biện pháp nào?', o: ['điệp từ', 'so sánh', 'nhân hóa', 'đảo ngữ'], ex: 'Từ "học" được lặp lại để nhấn mạnh.' },
  { w: 31, m: 'tv', lv: 1, t: 'Điệp từ, điệp ngữ', q: 'Trong câu "Quê em có lúa, quê em có sông, quê em có những cánh diều.", cụm từ nào được lặp lại?', o: ['quê em có', 'cánh diều', 'lúa', 'sông'], ex: '"Quê em có" lặp lại ba lần, đó là điệp ngữ.' },
  { w: 32, m: 'tv', lv: 2, t: 'Điệp từ, điệp ngữ', q: 'Điệp từ, điệp ngữ có tác dụng gì?', o: ['nhấn mạnh ý, gây ấn tượng', 'làm câu ngắn hơn', 'tránh lặp từ', 'kết thúc đoạn văn'], ex: 'Lặp lại có chủ ý để nhấn mạnh và gây ấn tượng.' },
  { w: 32, m: 'tv', lv: 2, t: 'Điệp từ, điệp ngữ', q: 'Câu nào dùng điệp ngữ?', o: ['Cháu yêu bà, cháu yêu bà lắm!', 'Bà em năm nay bảy mươi tuổi.', 'Bà kể chuyện cổ tích.', 'Tóc bà bạc trắng như mây.'], ex: '"Cháu yêu bà" được lặp lại để nhấn mạnh tình cảm.' },

  // ── So sánh, nhân hóa ──
  { w: 5, m: 'tv', lv: 1, t: 'So sánh, nhân hóa', q: 'Câu nào dùng biện pháp nhân hóa?', o: ['Ông mặt trời thức dậy.', 'Mặt trời đỏ như quả cầu lửa.', 'Mặt trời mọc ở phía đông.', 'Trời nắng to.'], ex: 'Mặt trời được gọi là "ông" và "thức dậy" như người.' },
  { w: 5, m: 'tv', lv: 1, t: 'So sánh, nhân hóa', q: 'Câu "Mặt hồ phẳng lặng như tấm gương." dùng biện pháp gì?', o: ['so sánh', 'nhân hóa', 'điệp từ', 'đảo ngữ'], ex: 'Mặt hồ được so sánh với tấm gương bằng từ "như".' },
  { w: 6, m: 'tv', lv: 2, t: 'So sánh, nhân hóa', q: 'Trong câu "Chị gió hát vang trên cánh đồng.", sự vật nào được nhân hóa?', o: ['gió', 'cánh đồng', 'hát', 'vang'], ex: 'Gió được gọi là "chị" và biết "hát" như người.' },
  { w: 7, m: 'tv', lv: 1, t: 'So sánh, nhân hóa', q: 'Chọn hình ảnh so sánh hợp với chỗ trống: "Trăng tròn như …"', o: ['cái đĩa bạc', 'cây cột điện', 'con đường dài', 'chiếc lá dài'], ex: 'Trăng tròn, sáng như cái đĩa bạc.' },
  { w: 8, m: 'tv', lv: 1, t: 'So sánh, nhân hóa', q: 'Trong câu "Những ngôi sao như những con mắt lấp lánh.", từ so sánh là từ nào?', o: ['như', 'ngôi sao', 'con mắt', 'lấp lánh'], ex: '"Như" là từ so sánh.' },

  // ── Thành ngữ, tục ngữ ──
  { w: 2, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào câu tục ngữ: "Uống nước nhớ …"', o: ['nguồn', 'sông', 'suối', 'biển'], ex: 'Uống nước nhớ nguồn: nhớ ơn người đi trước.' },
  { w: 3, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào câu tục ngữ: "Ăn quả nhớ kẻ trồng …"', o: ['cây', 'hoa', 'rau', 'lúa'], ex: 'Ăn quả nhớ kẻ trồng cây: biết ơn người làm ra thành quả.' },
  { w: 3, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào câu: "Có công mài sắt, có ngày nên …"', o: ['kim', 'dao', 'búa', 'đinh'], ex: 'Kiên trì thì việc khó mấy cũng làm được.' },
  { w: 4, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào thành ngữ: "Lá rụng về …"', o: ['cội', 'đất', 'rừng', 'cành'], ex: 'Lá rụng về cội: người đi xa luôn nhớ về quê cha đất tổ.' },
  { w: 10, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào câu: "Học thầy chẳng tày học …"', o: ['bạn', 'sách', 'chữ', 'trò'], ex: 'Học bạn bè cũng quý như học thầy.' },
  { w: 10, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào câu: "Đi một ngày đàng, học một sàng …"', o: ['khôn', 'gạo', 'chữ', 'sách'], ex: 'Đi nhiều nơi thì học được nhiều điều hay.' },
  { w: 11, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào câu: "Muốn biết phải hỏi, muốn giỏi phải …"', o: ['học', 'chơi', 'ăn', 'ngủ'], ex: 'Muốn giỏi thì phải chăm học.' },
  { w: 14, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào câu: "Tốt gỗ hơn tốt nước …"', o: ['sơn', 'mưa', 'sông', 'biển'], ex: 'Phẩm chất bên trong quý hơn vẻ bề ngoài.' },
  { w: 6, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào thành ngữ: "Non xanh nước …"', o: ['biếc', 'trong', 'đục', 'sâu'], ex: 'Non xanh nước biếc: cảnh thiên nhiên tươi đẹp.' },
  { w: 12, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Câu tục ngữ nào nói về tình đoàn kết?', o: ['Một cây làm chẳng nên non', 'Nước chảy đá mòn', 'Ăn cháo đá bát', 'Đẽo cày giữa đường'], ex: 'Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi cao.' },
  { w: 13, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ "Nước chảy đá mòn" khuyên ta điều gì?', o: ['kiên trì thì sẽ thành công', 'phải bảo vệ nguồn nước', 'đá là vật rất cứng', 'phải đi bơi thường xuyên'], ex: 'Nước chảy mãi làm mòn cả đá: kiên trì sẽ thành công.' },
  { w: 15, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ "Chân cứng đá mềm" nói lên điều gì?', o: ['vững vàng vượt qua khó khăn', 'đi chân đất trên đá', 'đôi chân bị đau', 'đá rất mềm'], ex: 'Lời chúc vững vàng, vượt qua mọi khó khăn.' },
  { w: 17, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Câu tục ngữ "Thương người như thể thương thân" khuyên ta điều gì?', o: ['yêu thương người khác như mình', 'chăm sóc sức khỏe', 'chăm chỉ học hành', 'tiết kiệm tiền bạc'], ex: 'Hãy thương người khác như thương chính mình.' },
  { w: 35, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Điền từ vào thành ngữ: "Bốn biển một …"', o: ['nhà', 'làng', 'trời', 'nước'], ex: 'Bốn biển một nhà: mọi người trên thế giới như anh em.' },

  // ── Chính tả ──
  { w: 1, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['xinh xắn', 'sinh sắn', 'xinh sắn', 'sinh xắn'], ex: 'Viết là "xinh xắn" (hai chữ x).' },
  { w: 3, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['chăm chỉ', 'trăm chỉ', 'chăm trỉ', 'trăm trỉ'], ex: 'Viết là "chăm chỉ" (hai chữ ch).' },
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['giữ gìn', 'dữ gìn', 'giữ dìn', 'rữ gìn'], ex: 'Viết là "giữ gìn" (hai chữ gi).' },
  { w: 8, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['lung linh', 'nung ninh', 'lung ninh', 'nung linh'], ex: 'Viết là "lung linh" (hai chữ l).' },
  { w: 11, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['sạch sẽ', 'xạch sẽ', 'sạch xẽ', 'xạch xẽ'], ex: 'Viết là "sạch sẽ" (hai chữ s).' },
  { w: 14, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['rực rỡ', 'dực dỡ', 'rực dỡ', 'giực giỡ'], ex: 'Viết là "rực rỡ" (hai chữ r).' },
  { w: 18, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['nghỉ ngơi', 'ngỉ ngơi', 'nghỉ nghơi', 'ngỉ nghơi'], ex: 'Viết "ngh" trước i, e, ê; viết "ng" trước ơ.' },
  { w: 22, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['kiên trì', 'kiên chì', 'kiêng trì', 'kiêng chì'], ex: 'Viết là "kiên trì".' },
  { w: 27, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['dũng cảm', 'rũng cảm', 'giũng cảm', 'dũng cãm'], ex: 'Viết là "dũng cảm".' },
  { w: 24, m: 'tv', lv: 2, t: 'Chính tả', q: 'Tên địa lí nào viết hoa đúng quy tắc?', o: ['Tây Nguyên', 'đồng tháp mười', 'sông hồng', 'vịnh hạ long'], ex: 'Tên địa lí Việt Nam viết hoa chữ cái đầu mỗi tiếng: Tây Nguyên.' },
  { w: 28, m: 'tv', lv: 2, t: 'Chính tả', q: 'Tên người nào viết hoa đúng quy tắc?', o: ['Nguyễn Văn Trỗi', 'trần quốc toản', 'võ thị Sáu', 'lê lợi'], ex: 'Tên người Việt Nam viết hoa chữ cái đầu của mỗi tiếng.' },
  { w: 33, m: 'tv', lv: 3, t: 'Chính tả', q: 'Tên người nước ngoài nào viết đúng quy tắc?', o: ['Lép Tôn-xtôi', 'an-đéc-xen', 'va-xi-li', 'mi-sa'], ex: 'Viết hoa chữ cái đầu mỗi bộ phận, nối các tiếng bằng gạch nối.' },

  // ── Nghĩa của từ, từ điển ──
  { w: 6, m: 'tv', lv: 2, t: 'Nghĩa của từ', q: 'Từ "thiên nhiên" có nghĩa là gì?', o: ['những gì tự nhiên có quanh ta', 'những thứ do con người làm ra', 'nhà cửa, đường phố', 'máy móc, xe cộ'], ex: 'Thiên nhiên là trời, đất, sông, núi, cây cỏ… có sẵn.' },
  { w: 33, m: 'tv', lv: 2, t: 'Nghĩa của từ', q: 'Từ "hữu nghị" có nghĩa là gì?', o: ['tình thân thiện giữa các nước', 'có ích', 'bạn học cùng lớp', 'sự giàu có'], ex: 'Hữu nghị là tình cảm thân thiện giữa các nước.' },
  { w: 33, m: 'tv', lv: 3, t: 'Nghĩa của từ', q: 'Tiếng "hữu" trong từ nào có nghĩa là "bạn"?', o: ['bằng hữu', 'hữu ích', 'hữu hạn', 'sở hữu'], ex: 'Bằng hữu là bạn bè; "hữu" trong các từ kia nghĩa là "có".' },
  { w: 34, m: 'tv', lv: 3, t: 'Nghĩa của từ', q: 'Tiếng "hợp" trong từ nào có nghĩa là "gộp lại"?', o: ['hợp tác', 'hợp lí', 'phù hợp', 'thích hợp'], ex: 'Hợp tác là cùng góp sức làm chung; các từ kia nghĩa là "đúng, vừa".' },
  { w: 28, m: 'tv', lv: 2, t: 'Nghĩa của từ', q: 'Từ "truyền thống" có nghĩa là gì?', o: ['nếp hay được giữ từ đời trước', 'đồ dùng mới mua', 'một trò chơi', 'chương trình ti vi'], ex: 'Truyền thống là nếp tốt được truyền từ đời này sang đời khác.' },
  { w: 7, m: 'tv', lv: 2, t: 'Từ điển', q: 'Trong từ điển, từ nào đứng trước nhất?', o: ['mai', 'minh', 'mơ', 'mưa'], ex: 'Cùng chữ m, xét chữ thứ hai: a đứng trước i, ơ, ư.' },

  // ── Từ ngữ theo chủ điểm ──
  { w: 9, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Từ nào tả âm thanh của gió?', o: ['vi vu', 'lấp lánh', 'thơm ngát', 'mềm mại'], ex: '"Vi vu" là từ gợi tả tiếng gió.' },
  { w: 9, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Từ nào tả màu sắc?', o: ['xanh ngắt', 'líu lo', 'thoang thoảng', 'rì rào'], ex: '"Xanh ngắt" tả màu xanh đậm.' },
  { w: 15, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Người vẽ tranh được gọi là gì?', o: ['họa sĩ', 'kĩ sư', 'bác sĩ', 'nông dân'], ex: 'Họa sĩ là người vẽ tranh.' },
  { w: 16, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Người sáng tác bài hát được gọi là gì?', o: ['nhạc sĩ', 'họa sĩ', 'nhà thơ', 'diễn viên'], ex: 'Nhạc sĩ là người sáng tác nhạc.' },
  { w: 24, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Từ nào cùng nghĩa với "bảo vệ"?', o: ['giữ gìn', 'phá hoại', 'tàn phá', 'vứt bỏ'], ex: 'Bảo vệ, giữ gìn là các từ cùng nghĩa.' },
  { w: 26, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Việc làm nào góp phần bảo vệ môi trường?', o: ['trồng cây xanh', 'xả rác ra sông', 'chặt phá rừng', 'đốt rác bừa bãi'], ex: 'Trồng cây làm không khí trong lành hơn.' },
  { w: 27, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Từ nào chỉ phẩm chất của người chiến sĩ?', o: ['kiên cường', 'nhút nhát', 'lười biếng', 'ích kỉ'], ex: 'Kiên cường là vững vàng, không chịu khuất phục.' },
  { w: 28, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Câu "Uống nước nhớ nguồn" nói về truyền thống nào?', o: ['biết ơn', 'hiếu học', 'cần cù', 'tiết kiệm'], ex: 'Nhớ ơn những người đi trước: truyền thống biết ơn.' },
  { w: 32, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Từ nào đồng nghĩa với "hòa bình"?', o: ['thanh bình', 'chiến tranh', 'xung đột', 'loạn lạc'], ex: 'Thanh bình là yên ổn, không có chiến tranh.' },
  { w: 33, m: 'tv', lv: 1, t: 'Từ ngữ chủ điểm', q: 'Từ nào chỉ việc các nước cùng làm chung để giúp nhau?', o: ['hợp tác', 'chiến tranh', 'xâm lược', 'chia rẽ'], ex: 'Hợp tác là cùng chung sức làm một việc.' },
  { w: 25, m: 'tv', lv: 1, t: 'Hương sắc trăm miền', q: 'Bánh chưng thường được gói vào dịp nào?', o: ['Tết Nguyên đán', 'Tết Trung thu', 'ngày khai trường', 'ngày sinh nhật'], ex: 'Bánh chưng là món truyền thống ngày Tết Nguyên đán.' },
  { w: 25, m: 'tv', lv: 2, t: 'Hương sắc trăm miền', q: 'Dân ca quan họ là làn điệu nổi tiếng của tỉnh nào?', o: ['Bắc Ninh', 'Cà Mau', 'Lâm Đồng', 'Khánh Hòa'], ex: 'Quan họ Bắc Ninh là di sản văn hóa của nhân loại.' },
  { w: 26, m: 'tv', lv: 2, t: 'Hương sắc trăm miền', q: 'Chợ nổi Cái Răng nằm ở vùng nào?', o: ['đồng bằng sông Cửu Long', 'Tây Bắc', 'Tây Nguyên', 'đồng bằng sông Hồng'], ex: 'Chợ nổi Cái Răng ở Cần Thơ, miền Tây Nam Bộ.' },
  { w: 30, m: 'tv', lv: 2, t: 'Tiếp bước cha ông', q: 'Ngày 2 tháng 9 năm 1945 gắn với sự kiện nào?', o: ['Bác Hồ đọc Tuyên ngôn Độc lập', 'Chiến thắng Điện Biên Phủ', 'Giải phóng miền Nam', 'Thành lập Đội Thiếu niên'], ex: 'Tại Ba Đình, Bác Hồ đọc Tuyên ngôn Độc lập khai sinh nước Việt Nam mới.' },
  { w: 29, m: 'tv', lv: 2, t: 'Tiếp bước cha ông', q: 'Giỗ Tổ Hùng Vương là ngày nào theo âm lịch?', o: ['mùng 10 tháng 3', 'rằm tháng 8', 'mùng 1 tháng 1', 'mùng 5 tháng 5'], ex: '"Dù ai đi ngược về xuôi, nhớ ngày Giỗ Tổ mùng mười tháng ba."' },

  // ── Câu, từ loại (ôn) ──
  { w: 2, m: 'tv', lv: 1, t: 'Từ loại', q: 'Từ nào là danh từ?', o: ['dòng sông', 'chảy', 'trong xanh', 'hiền hòa'], ex: '"Dòng sông" là từ chỉ sự vật, là danh từ.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ loại', q: 'Từ nào là động từ?', o: ['nhảy múa', 'bông hoa', 'xinh đẹp', 'cái bàn'], ex: '"Nhảy múa" chỉ hoạt động, là động từ.' },
  { w: 3, m: 'tv', lv: 1, t: 'Từ loại', q: 'Từ nào là tính từ?', o: ['rực rỡ', 'con mèo', 'chạy', 'ngôi nhà'], ex: '"Rực rỡ" chỉ đặc điểm, là tính từ.' },
  { w: 4, m: 'tv', lv: 1, t: 'Câu', q: 'Chủ ngữ của câu "Những bông hoa phượng đỏ rực." là gì?', o: ['Những bông hoa phượng', 'đỏ rực', 'hoa phượng đỏ', 'Những bông'], ex: 'Hỏi "Cái gì đỏ rực?": Những bông hoa phượng.' },
  { w: 4, m: 'tv', lv: 2, t: 'Câu', q: 'Vị ngữ của câu "Đàn trâu thong thả gặm cỏ." là gì?', o: ['thong thả gặm cỏ', 'Đàn trâu', 'Đàn trâu thong thả', 'cỏ'], ex: 'Hỏi "Đàn trâu làm gì?": thong thả gặm cỏ.' },
  { w: 8, m: 'tv', lv: 1, t: 'Câu', q: 'Trạng ngữ trong câu "Trên cành cây, chim hót líu lo." là gì?', o: ['Trên cành cây', 'chim', 'hót líu lo', 'chim hót'], ex: '"Trên cành cây" chỉ nơi chốn, là trạng ngữ.' },
  { w: 12, m: 'tv', lv: 1, t: 'Câu', q: 'Câu "Ôi, hoa đẹp quá!" là kiểu câu gì?', o: ['câu cảm', 'câu hỏi', 'câu kể', 'câu khiến'], ex: 'Câu bộc lộ cảm xúc, có "ôi", "quá" và dấu chấm than.' },
  { w: 13, m: 'tv', lv: 1, t: 'Câu', q: 'Câu "Em hãy đóng cửa sổ lại." là kiểu câu gì?', o: ['câu khiến', 'câu cảm', 'câu hỏi', 'câu kể'], ex: 'Câu có "hãy", dùng để yêu cầu: câu khiến.' },

  // ── Đọc hiểu nhanh, làm văn ──
  { w: 1, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Đọc câu: "Sáng sớm, bà ra vườn tưới rau." Bà tưới rau lúc nào?', o: ['sáng sớm', 'buổi trưa', 'chiều tối', 'ban đêm'], ex: 'Câu nói rõ: "Sáng sớm".' },
  { w: 10, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Đọc câu: "Vì mải chơi, Tùng quên làm bài tập." Vì sao Tùng quên làm bài?', o: ['vì mải chơi', 'vì bị ốm', 'vì bài khó', 'vì mất vở'], ex: 'Vế "Vì mải chơi" nêu nguyên nhân.' },
  { w: 25, m: 'tv', lv: 1, t: 'Đọc hiểu', q: 'Đọc câu: "Hội làng em mở vào mùa xuân, có thi thả diều và kéo co." Hội làng có trò chơi nào?', o: ['thả diều', 'đá cầu', 'nhảy dây', 'bịt mắt bắt dê'], ex: 'Câu nêu hai trò: thả diều và kéo co.' },
  { w: 34, m: 'tv', lv: 2, t: 'Đọc hiểu', q: 'Đọc câu: "Dù trời rét, các chú bộ đội vẫn đứng gác suốt đêm." Câu cho thấy các chú thế nào?', o: ['kiên cường, chịu đựng gian khổ', 'sợ rét', 'thích đi chơi đêm', 'đang nghỉ ngơi'], ex: 'Rét mà vẫn gác suốt đêm: rất kiên cường.' },
  { w: 5, m: 'tv', lv: 1, t: 'Làm văn', q: 'Bài văn tả cảnh thường có mấy phần?', o: ['3 phần', '2 phần', '4 phần', '5 phần'], ex: 'Mở bài, thân bài, kết bài.' },
  { w: 7, m: 'tv', lv: 2, t: 'Làm văn', q: 'Mở bài gián tiếp là mở bài như thế nào?', o: ['dẫn dắt từ chuyện khác vào bài', 'giới thiệu ngay điều cần tả', 'tả chi tiết từng bộ phận', 'nêu cảm nghĩ cuối bài'], ex: 'Mở bài gián tiếp nói chuyện khác rồi mới dẫn vào điều cần tả.' },
  { w: 17, m: 'tv', lv: 2, t: 'Làm văn', q: 'Kết bài mở rộng là kết bài như thế nào?', o: ['nêu cảm nghĩ, liên hệ thêm', 'chỉ nêu tên đồ vật', 'tả lại từ đầu', 'giới thiệu nhân vật'], ex: 'Kết bài mở rộng nêu cảm nghĩ, bình luận thêm.' },

  // ── Câu đố ──
  { w: 3, m: 'tv', lv: 1, t: 'Câu đố', q: 'Câu đố: "Ruột dài từ mũi đến chân, mũi mòn ruột cũng dần dần mòn theo." Là cái gì?', o: ['bút chì', 'thước kẻ', 'cục tẩy', 'quyển vở'], ex: 'Ruột chì chạy dọc thân, gọt mũi thì ruột mòn dần.' },
  { w: 9, m: 'tv', lv: 1, t: 'Câu đố', q: 'Câu đố: "Mình bằng hạt đỗ, ăn giỗ cả làng." Là con gì?', o: ['con ruồi', 'con kiến', 'con ong', 'con chuồn chuồn'], ex: 'Con ruồi nhỏ, nhà nào có cỗ cũng bay tới.' },
  { w: 15, m: 'tv', lv: 1, t: 'Câu đố', q: 'Câu đố: "Có cổ mà chẳng có đầu, hai tay mà chẳng có bàn tay." Là cái gì?', o: ['cái áo', 'cái quần', 'cái mũ', 'đôi giày'], ex: 'Áo có cổ áo và hai tay áo.' },
  { w: 20, m: 'tv', lv: 3, t: 'Câu đố', q: 'Câu đố chữ: "Để nguyên là tên một loài chim. Bỏ dấu sắc thì lấp lánh trên trời đêm." Là chữ gì?', o: ['sáo', 'cú', 'quạ', 'én'], ex: '"Sáo" bỏ dấu sắc thành "sao".' },
  { w: 27, m: 'tv', lv: 1, t: 'Câu đố', q: 'Câu đố: "Quả gì có múi, vỏ xanh, Trung thu bày cỗ, quả lành ngọt thơm?"', o: ['quả bưởi', 'quả dưa hấu', 'quả chuối', 'quả xoài'], ex: 'Quả bưởi có múi, thường bày mâm cỗ Trung thu.' },

  // ── Xếp câu (order) ──
  { w: 1, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Tuổi thơ của em', 'gắn với', 'những cánh diều', 'trên đồng quê.'] },
  { w: 2, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Mỗi sáng,', 'ông nội', 'tưới nước', 'cho vườn rau.'] },
  { w: 3, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bạn Nam', 'là người', 'chăm chỉ nhất', 'lớp em.'] },
  { w: 4, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Dòng sông quê em', 'uốn khúc', 'quanh những', 'bãi ngô xanh.'] },
  { w: 5, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Vịnh Hạ Long', 'có hàng nghìn', 'hòn đảo', 'lớn nhỏ.'] },
  { w: 6, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Mùa xuân,', 'cây cối', 'đâm chồi', 'nảy lộc.'] },
  { w: 7, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Ruộng bậc thang', 'vàng óng', 'trên', 'sườn núi.'] },
  { w: 8, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Đêm trăng,', 'cả xóm', 'ngồi', 'hóng mát.'] },
  { w: 9, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Thư viện trường em', 'có rất nhiều', 'sách', 'truyện tranh.'] },
  { w: 10, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Cô giáo', 'dạy chúng em', 'biết yêu thương', 'mọi người.'] },
  { w: 11, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Trong giờ ra chơi,', 'chúng em', 'chơi', 'đá cầu.'] },
  { w: 12, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Lan thích vẽ', 'nhưng', 'em gái Lan', 'lại thích hát.'] },
  { w: 13, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Vì trời mưa to', 'nên', 'buổi cắm trại', 'bị hoãn lại.'] },
  { w: 14, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Tuy nhà nghèo', 'nhưng', 'Minh', 'luôn học giỏi.'] },
  { w: 15, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Nếu chăm luyện tập', 'thì', 'em sẽ', 'bơi giỏi.'] },
  { w: 16, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Tiếng đàn bầu', 'ngân nga', 'trong', 'đêm khuya.'] },
  { w: 17, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Những chiếc đèn lồng', 'đỏ rực', 'dưới', 'ánh trăng rằm.'] },
  { w: 19, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu ghép đúng', o: ['Mưa', 'càng to,', 'gió', 'càng mạnh.'] },
  { w: 20, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Mặt trời lên cao,', 'sương sớm', 'tan dần', 'trên ngọn cỏ.'] },
  { w: 23, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành hai câu đúng', o: ['Bé có một chú mèo.', 'Nó', 'rất', 'thích bắt chuột.'] },
  { w: 25, m: 'tv', k: 'order', lv: 3, t: 'Xếp câu', q: 'Xếp thành câu ghép đúng', o: ['Chẳng những Hoa', 'học giỏi', 'mà bạn ấy còn', 'hát hay.'] },
  { w: 27, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Các chú bộ đội', 'đang canh giữ', 'vùng biển', 'của Tổ quốc.'] },
  { w: 29, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Đồng bào', 'các dân tộc', 'Việt Nam', 'là anh em một nhà.'] },
  { w: 31, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Trái Đất', 'là', 'ngôi nhà chung', 'của chúng ta.'] },
  { w: 33, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Em mong', 'mọi trẻ em', 'trên thế giới', 'đều được đến trường.'] },
  { w: 35, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Hè đến,', 'chúng em', 'được về quê', 'thăm ông bà.'] },

  // ── Xếp thứ tự (order) ──
  { w: 4, m: 'tv', k: 'order', lv: 1, t: 'Xếp thứ tự', q: 'Xếp các bước trồng cây theo thứ tự hợp lý', o: ['đào hố', 'đặt cây con xuống', 'lấp đất, nén chặt', 'tưới nước'] },
  { w: 8, m: 'tv', k: 'order', lv: 1, t: 'Xếp thứ tự', q: 'Xếp các việc buổi sáng theo thứ tự hợp lý', o: ['thức dậy', 'đánh răng, rửa mặt', 'ăn sáng', 'đi học'] },
  { w: 12, m: 'tv', k: 'order', lv: 2, t: 'Xếp thứ tự', q: 'Xếp các bước viết bài văn theo thứ tự hợp lý', o: ['tìm hiểu đề', 'lập dàn ý', 'viết bài', 'đọc lại, sửa lỗi'] },
  { w: 18, m: 'tv', k: 'order', lv: 2, t: 'Xếp thứ tự', q: 'Xếp các từ theo thứ tự trong từ điển', o: ['hoa', 'lá', 'mây', 'sông'] },
  { w: 22, m: 'tv', k: 'order', lv: 1, t: 'Xếp thứ tự', q: 'Xếp các mùa trong năm theo thứ tự, bắt đầu từ mùa xuân', o: ['mùa xuân', 'mùa hạ', 'mùa thu', 'mùa đông'] },
  { w: 26, m: 'tv', k: 'order', lv: 2, t: 'Xếp thứ tự', q: 'Xếp các từ theo thứ tự trong từ điển', o: ['bàn', 'cam', 'đá', 'em'] },
  { w: 30, m: 'tv', k: 'order', lv: 2, t: 'Xếp thứ tự', q: 'Xếp các bước gửi thư theo thứ tự hợp lý', o: ['viết thư', 'cho thư vào phong bì', 'dán tem, ghi địa chỉ', 'bỏ thư vào hòm thư'] },
  { w: 34, m: 'tv', k: 'order', lv: 1, t: 'Xếp thứ tự', q: 'Xếp các giai đoạn lớn lên của cây lúa theo thứ tự', o: ['hạt thóc nảy mầm', 'cây mạ', 'lúa trổ bông', 'lúa chín vàng'] },

  // ══════════════════════════════════ TOÁN ══════════════════════════════════
  // ── Số tự nhiên (Bài 1–2) ──
  { w: 1, m: 'toan', lv: 1, t: 'Số tự nhiên', q: 'Chữ số 7 trong số 3 754 268 thuộc hàng nào?', o: ['hàng trăm nghìn', 'hàng chục nghìn', 'hàng triệu', 'hàng nghìn'], ex: '3 754 268: chữ số 7 ở hàng trăm nghìn.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số tự nhiên', q: 'Giá trị của chữ số 5 trong số 45 302 là bao nhiêu?', o: ['5000', '500', '50 000', '5'], ex: 'Chữ số 5 ở hàng nghìn nên có giá trị 5000.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số tự nhiên', q: 'Số chẵn lớn nhất có ba chữ số khác nhau là số nào?', o: ['986', '998', '988', '987'], ex: '998, 988 có chữ số lặp; 987 là số lẻ. Đáp án 986.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số tự nhiên', q: 'Làm tròn số 4 586 732 đến hàng trăm nghìn được số nào?', o: ['4 600 000', '4 500 000', '4 590 000', '5 000 000'], ex: 'Chữ số hàng chục nghìn là 8 ≥ 5 nên làm tròn lên: 4 600 000.' },
  { w: 1, m: 'toan', lv: 2, t: 'Tính nhanh', q: 'Tính nhẩm: 25 × 4 × 37 = ?', o: ['3700', '3740', '925', '1000'], ex: '25 × 4 = 100; 100 × 37 = 3700.' },
  { w: 2, m: 'toan', lv: 2, t: 'Toán có lời văn', q: 'Mẹ mua 3 hộp sữa, mỗi hộp 12 nghìn đồng, và 1 gói bánh 25 nghìn đồng. Mẹ trả hết bao nhiêu tiền?', o: ['61 nghìn đồng', '40 nghìn đồng', '37 nghìn đồng', '73 nghìn đồng'], ex: '12 × 3 = 36; 36 + 25 = 61 (nghìn đồng).' },
  { w: 2, m: 'toan', lv: 2, t: 'Tính nhanh', q: 'Tính nhanh: 48 × 99 + 48 = ?', o: ['4800', '4752', '4848', '4700'], ex: '48 × 99 + 48 × 1 = 48 × 100 = 4800.' },
  { w: 35, m: 'toan', lv: 1, t: 'Số tự nhiên', q: 'Số nào chia hết cho cả 2 và 5?', o: ['350', '355', '352', '525'], ex: 'Số có chữ số tận cùng là 0 thì chia hết cho cả 2 và 5.' },

  // ── Phân số (Bài 3–7) ──
  { w: 2, m: 'toan', lv: 1, t: 'Phân số', q: 'Phân số nào bằng 3/4?', o: ['9/12', '6/9', '4/3', '3/8'], ex: 'Nhân cả tử và mẫu của 3/4 với 3 được 9/12.' },
  { w: 2, m: 'toan', lv: 1, t: 'Phân số', q: 'Rút gọn 18/24 được phân số tối giản nào?', o: ['3/4', '9/12', '6/8', '2/3'], ex: 'Chia cả tử và mẫu cho 6: 18/24 = 3/4.' },
  { w: 2, m: 'toan', lv: 2, t: 'Phân số', q: 'Phân số nào lớn nhất?', o: ['5/6', '2/3', '3/4', '1/2'], ex: 'Quy đồng mẫu 12: 10/12, 8/12, 9/12, 6/12.' },
  { w: 2, m: 'toan', lv: 2, t: 'Phân số', q: 'Số 3 viết thành phân số có mẫu số 5 là:', o: ['15/5', '3/5', '5/15', '8/5'], ex: '3 = 15 : 5 = 15/5.' },
  { w: 2, m: 'toan', lv: 1, t: 'Phân số thập phân', q: 'Phân số nào là phân số thập phân?', o: ['7/100', '7/50', '3/20', '10/7'], ex: 'Phân số thập phân có mẫu số là 10, 100, 1000…' },
  { w: 3, m: 'toan', lv: 2, t: 'Phân số thập phân', q: 'Viết 3/5 thành phân số thập phân:', o: ['6/10', '3/10', '5/10', '30/50'], ex: 'Nhân cả tử và mẫu với 2: 3/5 = 6/10.' },
  { w: 3, m: 'toan', lv: 1, t: 'Phép tính phân số', q: '1/2 + 1/3 = ?', o: ['5/6', '2/5', '2/6', '1/6'], ex: '1/2 + 1/3 = 3/6 + 2/6 = 5/6. Lỗi hay gặp: cộng tử với tử, mẫu với mẫu.' },
  { w: 3, m: 'toan', lv: 2, t: 'Phép tính phân số', q: '3/4 − 1/6 = ?', o: ['7/12', '1/3', '5/12', '2/12'], ex: '3/4 − 1/6 = 9/12 − 2/12 = 7/12.' },
  { w: 3, m: 'toan', lv: 2, t: 'Phép tính phân số', q: 'Một tấm vải dài 3/4 m, may túi hết 2/5 m. Còn lại bao nhiêu mét vải?', o: ['7/20 m', '1/20 m', '5/9 m', '23/20 m'], ex: '3/4 − 2/5 = 15/20 − 8/20 = 7/20 (m).' },
  { w: 3, m: 'toan', lv: 1, t: 'Phép tính phân số', q: '2/3 × 3/5 = ?', o: ['2/5', '5/8', '10/9', '6/8'], ex: '2/3 × 3/5 = 6/15 = 2/5.' },
  { w: 3, m: 'toan', lv: 2, t: 'Phép tính phân số', q: '4/5 : 2/3 = ?', o: ['6/5', '8/15', '5/6', '2/15'], ex: '4/5 × 3/2 = 12/10 = 6/5. Nhầm hay gặp: nhân luôn ra 8/15.' },
  { w: 4, m: 'toan', lv: 1, t: 'Hỗn số', q: 'Hỗn số 2 3/4 viết thành phân số là:', o: ['11/4', '10/4', '5/4', '23/4'], ex: '2 × 4 + 3 = 11, giữ mẫu 4: 11/4.' },
  { w: 4, m: 'toan', lv: 2, t: 'Hỗn số', q: 'Phân số 17/5 viết thành hỗn số là:', o: ['3 2/5', '2 3/5', '3 1/5', '5 2/3'], ex: '17 : 5 = 3 dư 2, nên 17/5 = 3 2/5.' },
  { w: 4, m: 'toan', lv: 2, t: 'Hỗn số', q: 'Một chai dầu có 1 1/2 lít. Hai chai như vậy có bao nhiêu lít?', o: ['3 lít', '2 1/2 lít', '2 lít', '4 lít'], ex: '1 1/2 + 1 1/2 = 3 (lít).' },

  // ── Ôn hình học và đo lường (Bài 8–9) ──
  { w: 4, m: 'toan', lv: 1, t: 'Chu vi, diện tích', q: 'Hình chữ nhật dài 12 cm, rộng 8 cm có diện tích bao nhiêu?', o: ['96 cm²', '40 cm²', '20 cm²', '80 cm²'], ex: '12 × 8 = 96 (cm²). 40 cm là chu vi.' },
  { w: 4, m: 'toan', lv: 2, t: 'Đổi đơn vị', q: '3 tấn 50 kg = … kg', o: ['3050 kg', '350 kg', '3500 kg', '30 050 kg'], ex: '3 tấn = 3000 kg; 3000 + 50 = 3050 (kg).' },
  { w: 5, m: 'toan', lv: 2, t: 'Chu vi, diện tích', q: 'Hình vuông có chu vi 36 cm thì diện tích là bao nhiêu?', o: ['81 cm²', '36 cm²', '144 cm²', '324 cm²'], ex: 'Cạnh: 36 : 4 = 9 (cm). Diện tích: 9 × 9 = 81 (cm²).' },

  // ── Số thập phân (Bài 10–14) ──
  { w: 6, m: 'toan', lv: 1, t: 'Số thập phân', q: 'Phân số 7/10 viết dưới dạng số thập phân là:', o: ['0,7', '0,07', '7,0', '7,10'], ex: '7/10 = 0,7 (bảy phần mười).' },
  { w: 6, m: 'toan', lv: 1, t: 'Số thập phân', q: 'Số 3,25 đọc là:', o: ['ba phẩy hai mươi lăm', 'ba hai mươi lăm', 'ba mươi hai phẩy năm', 'ba trăm hai mươi lăm'], ex: 'Đọc phần nguyên, đọc "phẩy", rồi đọc phần thập phân.' },
  { w: 6, m: 'toan', lv: 2, t: 'Số thập phân', q: 'Chữ số 4 trong số 12,345 thuộc hàng nào?', o: ['hàng phần trăm', 'hàng phần mười', 'hàng phần nghìn', 'hàng chục'], ex: 'Sau dấu phẩy: 3 phần mười, 4 phần trăm, 5 phần nghìn.' },
  { w: 6, m: 'toan', lv: 1, t: 'Số thập phân', q: 'Số thập phân gồm 5 đơn vị và 6 phần trăm viết là:', o: ['5,06', '5,6', '5,006', '0,56'], ex: 'Hàng phần mười là 0, hàng phần trăm là 6: 5,06.' },
  { w: 6, m: 'toan', lv: 2, t: 'Số thập phân', q: 'Hỗn số 2 3/100 viết thành số thập phân là:', o: ['2,03', '2,3', '2,003', '3,02'], ex: '3/100 = 0,03 nên 2 3/100 = 2,03.' },
  { w: 7, m: 'toan', lv: 1, t: 'So sánh số thập phân', q: 'Số nào lớn nhất?', o: ['8,9', '8,09', '8,89', '8,099'], ex: 'Phần nguyên bằng nhau, so phần mười: 9 lớn nhất.' },
  { w: 7, m: 'toan', lv: 2, t: 'So sánh số thập phân', q: 'Số nào bé nhất?', o: ['0,105', '0,15', '0,51', '0,5'], ex: 'So hàng phần mười: 1 < 5; rồi hàng phần trăm: 0 < 5.' },
  { w: 7, m: 'toan', lv: 2, t: 'So sánh số thập phân', q: 'So sánh 7,5 và 7,50:', o: ['7,5 = 7,50', '7,5 < 7,50', '7,5 > 7,50', '7,50 gấp 10 lần 7,5'], ex: 'Thêm chữ số 0 vào tận cùng phần thập phân, giá trị số giữ nguyên.' },
  { w: 7, m: 'toan', lv: 1, t: 'Đổi đơn vị', q: '3 m 5 cm = … m', o: ['3,05 m', '3,5 m', '3,005 m', '35 m'], ex: '5 cm = 5/100 m = 0,05 m.' },
  { w: 7, m: 'toan', lv: 2, t: 'Đổi đơn vị', q: '2 kg 45 g = … kg', o: ['2,045 kg', '2,45 kg', '2,0045 kg', '24,5 kg'], ex: '45 g = 45/1000 kg = 0,045 kg.' },
  { w: 7, m: 'toan', lv: 1, t: 'Đổi đơn vị', q: '750 g = … kg', o: ['0,75 kg', '7,5 kg', '0,075 kg', '75 kg'], ex: '750 g = 750/1000 kg = 0,75 kg.' },
  { w: 7, m: 'toan', lv: 2, t: 'Đổi đơn vị', q: '1 tấn 2 tạ = … tấn', o: ['1,2 tấn', '1,02 tấn', '12 tấn', '1,002 tấn'], ex: '1 tạ = 1/10 tấn nên 2 tạ = 0,2 tấn.' },
  { w: 8, m: 'toan', lv: 1, t: 'Làm tròn số thập phân', q: 'Làm tròn 6,78 đến hàng phần mười được:', o: ['6,8', '6,7', '7', '6,9'], ex: 'Chữ số hàng phần trăm là 8 ≥ 5 nên làm tròn lên: 6,8.' },
  { w: 8, m: 'toan', lv: 2, t: 'Làm tròn số thập phân', q: 'Làm tròn 12,345 đến số tự nhiên gần nhất được:', o: ['12', '13', '12,3', '12,35'], ex: 'Chữ số hàng phần mười là 3 < 5 nên giữ 12.' },

  // ── Đơn vị đo diện tích (Bài 15–18) ──
  { w: 9, m: 'toan', lv: 1, t: 'Đơn vị diện tích', q: '1 ha = … m²', o: ['10 000 m²', '1000 m²', '100 m²', '100 000 m²'], ex: '1 ha = 1 hm² = 10 000 m².' },
  { w: 9, m: 'toan', lv: 2, t: 'Đơn vị diện tích', q: '1 km² = … ha', o: ['100 ha', '10 ha', '1000 ha', '10 000 ha'], ex: '1 km² = 100 hm² = 100 ha.' },
  { w: 9, m: 'toan', lv: 1, t: 'Đơn vị diện tích', q: 'Diện tích một sân bóng đá vào khoảng bao nhiêu?', o: ['7000 m²', '70 m²', '70 km²', '7 cm²'], ex: 'Sân bóng đá dài khoảng 100 m, rộng khoảng 70 m.' },
  { w: 9, m: 'toan', lv: 2, t: 'Đơn vị diện tích', q: '3 ha 25 m² = … m²', o: ['30 025 m²', '3025 m²', '325 m²', '300 025 m²'], ex: '3 ha = 30 000 m²; 30 000 + 25 = 30 025 (m²).' },
  { w: 9, m: 'toan', lv: 3, t: 'Đơn vị diện tích', q: 'Mảnh vườn hình chữ nhật dài 200 m, rộng 150 m. Diện tích mảnh vườn là bao nhiêu héc-ta?', o: ['3 ha', '30 ha', '0,3 ha', '300 ha'], ex: '200 × 150 = 30 000 m² = 3 ha.' },
  { w: 9, m: 'toan', lv: 2, t: 'Đơn vị diện tích', q: '5 m² 8 dm² = … m²', o: ['5,08 m²', '5,8 m²', '5,008 m²', '58 m²'], ex: '1 dm² = 1/100 m², nên 8 dm² = 0,08 m².' },
  { w: 9, m: 'toan', lv: 1, t: 'Đơn vị diện tích', q: 'Nên dùng đơn vị nào để đo diện tích một tỉnh?', o: ['ki-lô-mét vuông', 'xăng-ti-mét vuông', 'đề-xi-mét vuông', 'mi-li-mét vuông'], ex: 'Diện tích rất rộng thì dùng ki-lô-mét vuông.' },

  // ── Phép tính với số thập phân (Bài 19–24) ──
  { w: 11, m: 'toan', lv: 1, t: 'Phép tính số thập phân', q: '4,5 + 2,75 = ?', o: ['7,25', '3,2', '6,8', '7,3'], ex: 'Đặt các dấu phẩy thẳng cột: 4,50 + 2,75 = 7,25.' },
  { w: 11, m: 'toan', lv: 2, t: 'Toán có lời văn', q: 'Lan cao 1,35 m, Mai cao hơn Lan 0,08 m. Mai cao bao nhiêu mét?', o: ['1,43 m', '1,27 m', '2,15 m', '1,35 m'], ex: '1,35 + 0,08 = 1,43 (m).' },
  { w: 11, m: 'toan', lv: 1, t: 'Phép tính số thập phân', q: '10 − 3,7 = ?', o: ['6,3', '7,3', '7,7', '6,7'], ex: '10,0 − 3,7 = 6,3.' },
  { w: 11, m: 'toan', lv: 2, t: 'Toán có lời văn', q: 'Một can có 20 l dầu, đã dùng 7,25 l. Can còn bao nhiêu lít dầu?', o: ['12,75 l', '13,25 l', '12,25 l', '27,25 l'], ex: '20 − 7,25 = 12,75 (l).' },
  { w: 12, m: 'toan', lv: 1, t: 'Phép tính số thập phân', q: '2,5 × 4 = ?', o: ['10', '1', '100', '6,5'], ex: '2,5 × 4 = 10,0 = 10.' },
  { w: 12, m: 'toan', lv: 2, t: 'Phép tính số thập phân', q: '0,2 × 0,3 = ?', o: ['0,06', '0,6', '6', '0,006'], ex: '2 × 3 = 6; hai thừa số có tất cả 2 chữ số sau dấu phẩy: 0,06.' },
  { w: 12, m: 'toan', lv: 2, t: 'Toán có lời văn', q: '1 kg cam giá 32 nghìn đồng. Mua 1,5 kg cam hết bao nhiêu tiền?', o: ['48 nghìn đồng', '33,5 nghìn đồng', '64 nghìn đồng', '45 nghìn đồng'], ex: '32 × 1,5 = 48 (nghìn đồng).' },
  { w: 13, m: 'toan', lv: 1, t: 'Phép tính số thập phân', q: '7,2 : 3 = ?', o: ['2,4', '24', '0,24', '2,04'], ex: '7,2 : 3 = 2,4.' },
  { w: 13, m: 'toan', lv: 2, t: 'Phép tính số thập phân', q: '9 : 0,5 = ?', o: ['18', '4,5', '1,8', '0,18'], ex: 'Chia cho 0,5 tức là nhân với 2: 9 × 2 = 18.' },
  { w: 13, m: 'toan', lv: 3, t: 'Toán có lời văn', q: 'Sợi dây dài 6,3 m được cắt thành các đoạn dài 0,9 m. Cắt được bao nhiêu đoạn?', o: ['7 đoạn', '70 đoạn', '5,4 đoạn', '8 đoạn'], ex: '6,3 : 0,9 = 7 (đoạn).' },
  { w: 13, m: 'toan', lv: 1, t: 'Nhân chia với 10, 0,1', q: '3,45 × 100 = ?', o: ['345', '34,5', '3450', '0,0345'], ex: 'Nhân với 100: dời dấu phẩy sang phải hai chữ số.' },
  { w: 13, m: 'toan', lv: 2, t: 'Nhân chia với 10, 0,1', q: '56,7 × 0,1 = ?', o: ['5,67', '567', '0,567', '56,8'], ex: 'Nhân với 0,1: dời dấu phẩy sang trái một chữ số.' },
  { w: 13, m: 'toan', lv: 2, t: 'Nhân chia với 10, 0,1', q: 'Nhân một số với 0,01 cũng giống như chia số đó cho:', o: ['100', '10', '1000', '0,01'], ex: 'Cả hai cách đều dời dấu phẩy sang trái hai chữ số.' },
  { w: 13, m: 'toan', lv: 2, t: 'Nhân chia với 10, 0,1', q: '4,8 : 0,1 = ?', o: ['48', '0,48', '4,7', '480'], ex: 'Chia cho 0,1 tức là nhân với 10: 48.' },

  // ── Hình phẳng (Bài 25–29) ──
  { w: 14, m: 'toan', lv: 1, t: 'Hình tam giác', q: 'Tam giác có đáy 8 cm, chiều cao 5 cm thì diện tích là bao nhiêu?', o: ['20 cm²', '40 cm²', '13 cm²', '26 cm²'], ex: '8 × 5 : 2 = 20 (cm²). Quên chia 2 sẽ ra 40.' },
  { w: 14, m: 'toan', lv: 2, t: 'Hình tam giác', q: 'Tam giác vuông có hai cạnh góc vuông dài 6 cm và 4 cm. Diện tích là:', o: ['12 cm²', '24 cm²', '10 cm²', '20 cm²'], ex: '6 × 4 : 2 = 12 (cm²).' },
  { w: 14, m: 'toan', lv: 1, t: 'Hình tam giác', q: 'Hình tam giác có một góc tù gọi là tam giác gì?', o: ['tam giác tù', 'tam giác nhọn', 'tam giác vuông', 'tam giác đều'], ex: 'Tam giác có một góc tù là tam giác tù.' },
  { w: 15, m: 'toan', lv: 1, t: 'Hình thang', q: 'Hình thang có đáy lớn 10 cm, đáy bé 6 cm, chiều cao 4 cm. Diện tích là:', o: ['32 cm²', '64 cm²', '240 cm²', '20 cm²'], ex: '(10 + 6) × 4 : 2 = 32 (cm²).' },
  { w: 15, m: 'toan', lv: 1, t: 'Hình thang', q: 'Hình thang có mấy cặp cạnh đối diện song song?', o: ['1 cặp', '2 cặp', '3 cặp', '4 cặp'], ex: 'Hình thang có một cặp cạnh đối diện song song (hai đáy).' },
  { w: 15, m: 'toan', lv: 3, t: 'Hình thang', q: 'Thửa ruộng hình thang có tổng hai đáy 50 m, chiều cao 20 m. Diện tích thửa ruộng là:', o: ['500 m²', '1000 m²', '70 m²', '250 m²'], ex: '50 × 20 : 2 = 500 (m²).' },
  { w: 16, m: 'toan', lv: 1, t: 'Hình tròn', q: 'Hình tròn có bán kính 5 cm thì đường kính là:', o: ['10 cm', '2,5 cm', '5 cm', '15,7 cm'], ex: 'Đường kính gấp 2 lần bán kính: 5 × 2 = 10 (cm).' },
  { w: 16, m: 'toan', lv: 2, t: 'Hình tròn', q: 'Chu vi hình tròn có đường kính 10 cm là:', o: ['31,4 cm', '15,7 cm', '78,5 cm', '62,8 cm'], ex: 'C = d × 3,14 = 10 × 3,14 = 31,4 (cm).' },
  { w: 16, m: 'toan', lv: 2, t: 'Hình tròn', q: 'Diện tích hình tròn có bán kính 2 cm là:', o: ['12,56 cm²', '6,28 cm²', '4 cm²', '25,12 cm²'], ex: 'S = r × r × 3,14 = 2 × 2 × 3,14 = 12,56 (cm²).' },
  { w: 16, m: 'toan', lv: 3, t: 'Hình tròn', q: 'Bánh xe có đường kính 0,6 m. Bánh xe lăn 1 vòng thì đi được bao nhiêu mét?', o: ['1,884 m', '0,942 m', '1,2 m', '3,768 m'], ex: 'Một vòng bằng chu vi: 0,6 × 3,14 = 1,884 (m).' },
  { w: 16, m: 'toan', lv: 3, t: 'Hình tròn', q: 'Hình tròn có chu vi 6,28 cm thì bán kính là:', o: ['1 cm', '2 cm', '3,14 cm', '0,5 cm'], ex: 'd = 6,28 : 3,14 = 2 (cm); r = 2 : 2 = 1 (cm).' },

  // ── Ôn tập học kì I ──
  { w: 16, m: 'toan', lv: 2, t: 'Logic', q: 'Lớp có 35 học sinh xếp một hàng dọc, Hà đứng thứ 12 tính từ đầu hàng. Tính từ cuối hàng, Hà đứng thứ mấy?', o: ['thứ 24', 'thứ 23', 'thứ 25', 'thứ 22'], ex: 'Sau Hà có 35 − 12 = 23 bạn, nên từ cuối Hà đứng thứ 24.' },
  { w: 17, m: 'toan', lv: 2, t: 'Trung bình cộng', q: 'Trung bình cộng của 2,5; 3,5 và 6 là:', o: ['4', '12', '6', '3,5'], ex: '(2,5 + 3,5 + 6) : 3 = 12 : 3 = 4.' },
  { w: 17, m: 'toan', lv: 2, t: 'Chu vi, diện tích', q: 'Hình chữ nhật có chiều dài 4,5 m, chiều rộng 2 m. Chu vi là:', o: ['13 m', '9 m', '6,5 m', '11 m'], ex: '(4,5 + 2) × 2 = 13 (m). 6,5 m là nửa chu vi.' },
  { w: 18, m: 'toan', lv: 3, t: 'Toán có lời văn', q: 'Có 3 can, mỗi can 4,5 l dầu. Rót đều vào 9 chai. Mỗi chai có bao nhiêu lít?', o: ['1,5 l', '0,5 l', '13,5 l', '3 l'], ex: '4,5 × 3 = 13,5 (l); 13,5 : 9 = 1,5 (l).' },
  { w: 18, m: 'toan', lv: 2, t: 'Biểu thức', q: 'Giá trị của biểu thức 0,5 + 0,5 × 4 là:', o: ['2,5', '4', '2,1', '0,7'], ex: 'Nhân trước, cộng sau: 0,5 × 4 = 2; 0,5 + 2 = 2,5.' },

  // ── Tỉ số, tỉ lệ bản đồ ──
  { w: 19, m: 'toan', lv: 1, t: 'Tỉ số', q: 'Lớp có 12 bạn nam và 18 bạn nữ. Tỉ số của số bạn nam và số bạn nữ là:', o: ['2/3', '3/2', '2/5', '3/5'], ex: '12 : 18 = 12/18 = 2/3.' },
  { w: 19, m: 'toan', lv: 2, t: 'Tỉ lệ bản đồ', q: 'Tỉ lệ bản đồ 1 : 1000 cho biết điều gì?', o: ['1 cm bản đồ ứng với 1000 cm thật', '1 cm bản đồ ứng với 1000 m thật', '1000 cm bản đồ ứng với 1 cm thật', '1 cm bản đồ ứng với 100 cm thật'], ex: 'Độ dài thật gấp 1000 lần độ dài trên bản đồ, cùng đơn vị.' },
  { w: 20, m: 'toan', lv: 2, t: 'Tỉ lệ bản đồ', q: 'Bản đồ tỉ lệ 1 : 100 000, quãng đường dài 5 cm. Quãng đường thật dài bao nhiêu ki-lô-mét?', o: ['5 km', '50 km', '500 km', '0,5 km'], ex: '5 × 100 000 = 500 000 cm = 5 km.' },
  { w: 20, m: 'toan', lv: 2, t: 'Tổng tỉ, hiệu tỉ', q: 'Tổng hai số là 40, tỉ số của hai số là 3/5. Số bé là:', o: ['15', '25', '24', '8'], ex: 'Tổng số phần 3 + 5 = 8; số bé: 40 : 8 × 3 = 15.' },
  { w: 20, m: 'toan', lv: 3, t: 'Tổng tỉ, hiệu tỉ', q: 'Hiệu hai số là 24, số lớn gấp 3 lần số bé. Số lớn là:', o: ['36', '12', '72', '48'], ex: 'Hiệu số phần 3 − 1 = 2; số bé 24 : 2 = 12; số lớn 12 × 3 = 36.' },
  { w: 21, m: 'toan', lv: 3, t: 'Tổng tỉ, hiệu tỉ', q: 'Mẹ hơn con 28 tuổi. Tuổi con bằng 1/5 tuổi mẹ. Con bao nhiêu tuổi?', o: ['7 tuổi', '35 tuổi', '5 tuổi', '14 tuổi'], ex: 'Hiệu số phần 5 − 1 = 4; tuổi con: 28 : 4 = 7.' },

  // ── Tỉ số phần trăm ──
  { w: 21, m: 'toan', lv: 1, t: 'Tỉ số phần trăm', q: 'Tỉ số phần trăm của 3 và 4 là:', o: ['75%', '34%', '43%', '0,75%'], ex: '3 : 4 = 0,75 = 75%.' },
  { w: 21, m: 'toan', lv: 1, t: 'Tỉ số phần trăm', q: 'Phân số 1/4 viết dưới dạng tỉ số phần trăm là:', o: ['25%', '14%', '40%', '4%'], ex: '1/4 = 25/100 = 25%.' },
  { w: 21, m: 'toan', lv: 2, t: 'Tỉ số phần trăm', q: 'Người bán 120 kg gạo, trong đó gạo nếp chiếm 25%. Người đó bán bao nhiêu ki-lô-gam gạo nếp?', o: ['30 kg', '25 kg', '90 kg', '48 kg'], ex: '120 × 25 : 100 = 30 (kg).' },
  { w: 22, m: 'toan', lv: 2, t: 'Tỉ số phần trăm', q: '20% của 150 là bao nhiêu?', o: ['30', '300', '7,5', '170'], ex: '150 × 20 : 100 = 30.' },
  { w: 22, m: 'toan', lv: 2, t: 'Tỉ số phần trăm', q: 'Cái áo giá 200 nghìn đồng, nay giảm giá 10%. Giá áo bây giờ là bao nhiêu?', o: ['180 nghìn đồng', '20 nghìn đồng', '190 nghìn đồng', '210 nghìn đồng'], ex: 'Giảm 200 × 10 : 100 = 20; còn 200 − 20 = 180 (nghìn đồng).' },
  { w: 22, m: 'toan', lv: 2, t: 'Tỉ số phần trăm', q: 'Lớp có 40 bạn, 25% số bạn thích bơi. Có bao nhiêu bạn thích bơi?', o: ['10 bạn', '25 bạn', '15 bạn', '30 bạn'], ex: '40 × 25 : 100 = 10 (bạn).' },
  { w: 23, m: 'toan', lv: 3, t: 'Tỉ số phần trăm', q: '10% của một số là 8. Số đó là:', o: ['80', '0,8', '8', '18'], ex: '8 : 10 × 100 = 80.' },
  { w: 23, m: 'toan', lv: 3, t: 'Tỉ số phần trăm', q: 'Gửi tiết kiệm 1 triệu đồng, lãi 6% một năm. Sau 1 năm, tiền lãi là bao nhiêu?', o: ['60 nghìn đồng', '6 nghìn đồng', '600 nghìn đồng', '160 nghìn đồng'], ex: '1 000 000 × 6 : 100 = 60 000 (đồng).' },
  { w: 23, m: 'toan', lv: 2, t: 'Tỉ số phần trăm', q: 'Lớp 5B có 40% số bạn là nam. Số bạn nữ chiếm bao nhiêu phần trăm?', o: ['60%', '40%', '50%', '140%'], ex: 'Cả lớp là 100%: 100% − 40% = 60%.' },

  // ── Thể tích, hình hộp, hình lập phương ──
  { w: 24, m: 'toan', lv: 1, t: 'Thể tích', q: '1 dm³ = … cm³', o: ['1000 cm³', '100 cm³', '10 cm³', '10 000 cm³'], ex: 'Mỗi đơn vị thể tích gấp 1000 lần đơn vị bé hơn liền sau.' },
  { w: 24, m: 'toan', lv: 2, t: 'Thể tích', q: '1 m³ = … dm³', o: ['1000 dm³', '100 dm³', '10 dm³', '1 000 000 dm³'], ex: '1 m³ = 1000 dm³.' },
  { w: 27, m: 'toan', lv: 1, t: 'Thể tích', q: 'Hình lập phương có cạnh 3 cm thì thể tích là:', o: ['27 cm³', '9 cm³', '54 cm³', '12 cm³'], ex: '3 × 3 × 3 = 27 (cm³).' },
  { w: 27, m: 'toan', lv: 2, t: 'Thể tích', q: 'Hình hộp chữ nhật dài 5 cm, rộng 4 cm, cao 3 cm có thể tích là:', o: ['60 cm³', '12 cm³', '94 cm³', '47 cm³'], ex: '5 × 4 × 3 = 60 (cm³).' },
  { w: 26, m: 'toan', lv: 2, t: 'Diện tích xung quanh', q: 'Hình hộp chữ nhật dài 5 cm, rộng 4 cm, cao 3 cm có diện tích xung quanh là:', o: ['54 cm²', '60 cm²', '94 cm²', '27 cm²'], ex: '(5 + 4) × 2 × 3 = 54 (cm²).' },
  { w: 26, m: 'toan', lv: 2, t: 'Diện tích xung quanh', q: 'Hình lập phương cạnh 4 cm có diện tích toàn phần là:', o: ['96 cm²', '64 cm²', '16 cm²', '24 cm²'], ex: '4 × 4 × 6 = 96 (cm²). 64 là thể tích (cm³).' },
  { w: 26, m: 'toan', lv: 1, t: 'Hình khối', q: 'Hình hộp chữ nhật có mấy cạnh?', o: ['12 cạnh', '6 cạnh', '8 cạnh', '4 cạnh'], ex: 'Hình hộp chữ nhật có 6 mặt, 8 đỉnh, 12 cạnh.' },
  { w: 27, m: 'toan', lv: 3, t: 'Thể tích', q: 'Bể nước hình hộp chữ nhật dài 2 m, rộng 1,5 m, cao 1 m. Bể chứa đầy được bao nhiêu lít nước?', o: ['3000 l', '300 l', '3 l', '30 000 l'], ex: '2 × 1,5 × 1 = 3 m³ = 3000 dm³ = 3000 l.' },
  { w: 27, m: 'toan', lv: 3, t: 'Thể tích', q: 'Cạnh hình lập phương gấp lên 2 lần thì thể tích gấp lên mấy lần?', o: ['8 lần', '2 lần', '4 lần', '6 lần'], ex: '2 × 2 × 2 = 8 (lần).' },
  { w: 27, m: 'toan', lv: 1, t: 'Hình khối', q: 'Hình lập phương có mấy mặt?', o: ['6 mặt', '4 mặt', '8 mặt', '12 mặt'], ex: 'Hình lập phương có 6 mặt là các hình vuông bằng nhau.' },

  // ── Số đo thời gian ──
  { w: 29, m: 'toan', lv: 1, t: 'Số đo thời gian', q: '1,5 giờ = … phút', o: ['90 phút', '150 phút', '105 phút', '15 phút'], ex: '1,5 × 60 = 90 (phút). Nhầm hay gặp: coi 1,5 giờ là 1 giờ 50 phút.' },
  { w: 29, m: 'toan', lv: 2, t: 'Số đo thời gian', q: '2 giờ 45 phút + 1 giờ 30 phút = ?', o: ['4 giờ 15 phút', '3 giờ 15 phút', '4 giờ 25 phút', '3 giờ 45 phút'], ex: '3 giờ 75 phút = 4 giờ 15 phút.' },
  { w: 30, m: 'toan', lv: 2, t: 'Số đo thời gian', q: '3 phút 20 giây × 3 = ?', o: ['10 phút', '9 phút 20 giây', '10 phút 20 giây', '9 phút 40 giây'], ex: '9 phút 60 giây = 10 phút.' },
  { w: 29, m: 'toan', lv: 1, t: 'Số đo thời gian', q: 'Năm 2026 thuộc thế kỉ nào?', o: ['thế kỉ XXI', 'thế kỉ XX', 'thế kỉ XXII', 'thế kỉ XIX'], ex: 'Thế kỉ XXI gồm các năm từ 2001 đến 2100.' },
  { w: 30, m: 'toan', lv: 2, t: 'Số đo thời gian', q: 'Làm 1 sản phẩm hết 1 giờ 15 phút. Làm 4 sản phẩm như vậy hết bao nhiêu thời gian?', o: ['5 giờ', '4 giờ 15 phút', '4 giờ 45 phút', '5 giờ 15 phút'], ex: '4 giờ 60 phút = 5 giờ.' },

  // ── Chuyển động đều ──
  { w: 30, m: 'toan', lv: 1, t: 'Chuyển động', q: 'Ô tô đi 120 km trong 2 giờ. Vận tốc của ô tô là:', o: ['60 km/giờ', '240 km/giờ', '30 km/giờ', '120 km/giờ'], ex: 'v = s : t = 120 : 2 = 60 (km/giờ).' },
  { w: 31, m: 'toan', lv: 2, t: 'Chuyển động', q: 'Người đi xe đạp với vận tốc 12 km/giờ trong 2,5 giờ. Quãng đường đi được là:', o: ['30 km', '14,5 km', '4,8 km', '24 km'], ex: 's = v × t = 12 × 2,5 = 30 (km).' },
  { w: 31, m: 'toan', lv: 2, t: 'Chuyển động', q: 'Quãng đường 150 km, ô tô đi với vận tốc 50 km/giờ. Thời gian đi là:', o: ['3 giờ', '2 giờ 30 phút', '3 giờ 30 phút', '2 giờ'], ex: 't = s : v = 150 : 50 = 3 (giờ).' },
  { w: 31, m: 'toan', lv: 3, t: 'Chuyển động', q: 'Ốc sên bò 6 cm mỗi phút. Sau 1 giờ ốc sên bò được bao nhiêu mét?', o: ['3,6 m', '36 m', '0,36 m', '6 m'], ex: '6 × 60 = 360 cm = 3,6 m.' },
  { w: 32, m: 'toan', lv: 3, t: 'Chuyển động', q: 'Hai xe đi ngược chiều từ hai đầu quãng đường 180 km, vận tốc 40 km/giờ và 50 km/giờ. Sau bao lâu hai xe gặp nhau?', o: ['2 giờ', '18 giờ', '4,5 giờ', '1 giờ 30 phút'], ex: 'Mỗi giờ hai xe gần nhau 40 + 50 = 90 km; 180 : 90 = 2 (giờ).' },
  { w: 31, m: 'toan', lv: 3, t: 'Chuyển động', q: '36 km/giờ bằng bao nhiêu mét mỗi giây?', o: ['10 m/giây', '36 m/giây', '3,6 m/giây', '100 m/giây'], ex: '36 km = 36 000 m; 1 giờ = 3600 giây; 36 000 : 3600 = 10.' },

  // ── Thống kê, xác suất ──
  { w: 33, m: 'toan', lv: 2, t: 'Thống kê, xác suất', q: 'Gieo xúc xắc 20 lần, mặt 6 chấm xuất hiện 5 lần. Tỉ số số lần xuất hiện mặt 6 chấm và tổng số lần gieo là:', o: ['5/20', '5/6', '6/20', '15/20'], ex: 'Lấy số lần xuất hiện chia tổng số lần gieo: 5/20 (bằng 1/4).' },
  { w: 33, m: 'toan', lv: 1, t: 'Thống kê, xác suất', q: 'Trên biểu đồ hình quạt tròn, cả hình tròn ứng với bao nhiêu phần trăm?', o: ['100%', '50%', '360%', '10%'], ex: 'Cả hình tròn biểu diễn toàn bộ, tức 100%.' },
  { w: 33, m: 'toan', lv: 2, t: 'Thống kê, xác suất', q: 'Biểu đồ hình quạt cho thấy 50% học sinh thích bóng đá. Lớp có 30 bạn. Số bạn thích bóng đá là:', o: ['15 bạn', '50 bạn', '20 bạn', '30 bạn'], ex: '50% là một nửa: 30 : 2 = 15 (bạn).' },

  // ── Ôn tập cuối năm, quy luật, logic ──
  { w: 33, m: 'toan', lv: 2, t: 'Quy luật', q: 'Số tiếp theo của dãy 0,1; 0,3; 0,9; 2,7; … là:', o: ['8,1', '5,4', '3,6', '2,9'], ex: 'Mỗi số gấp 3 lần số liền trước: 2,7 × 3 = 8,1.' },
  { w: 33, m: 'toan', lv: 3, t: 'Logic', q: 'Có 5 bạn, mỗi bạn bắt tay mỗi bạn khác đúng một lần. Có tất cả bao nhiêu cái bắt tay?', o: ['10', '20', '25', '5'], ex: '4 + 3 + 2 + 1 = 10 (cái bắt tay).' },
  { w: 34, m: 'toan', lv: 2, t: 'Tính nhanh', q: 'Tính nhanh: 0,25 × 7,9 × 4 = ?', o: ['7,9', '79', '0,79', '31,6'], ex: '0,25 × 4 = 1; 1 × 7,9 = 7,9.' },
  { w: 34, m: 'toan', lv: 3, t: 'Logic', q: 'Dời dấu phẩy của một số thập phân sang phải một chữ số thì số đó tăng thêm 27,9. Số đó là:', o: ['3,1', '2,79', '27,9', '31'], ex: 'Số mới gấp 10 lần số cũ, tăng thêm 9 lần số cũ: 27,9 : 9 = 3,1.' },
  { w: 35, m: 'toan', lv: 2, t: 'Thể tích', q: 'Một vòi chảy 0,5 m³ nước mỗi giờ. Sau 4 giờ vòi chảy được bao nhiêu lít?', o: ['2000 l', '2 l', '200 l', '20 000 l'], ex: '0,5 × 4 = 2 m³ = 2000 dm³ = 2000 l.' },

  // ── Sắp xếp (order) ──
  { w: 1, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp', q: 'Xếp các số theo thứ tự từ bé đến lớn', o: ['98 765', '100 234', '102 345', '120 345'] },
  { w: 2, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp', q: 'Xếp các phân số theo thứ tự từ bé đến lớn', o: ['1/6', '1/4', '1/3', '1/2'] },
  { w: 3, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp', q: 'Xếp các phân số theo thứ tự từ bé đến lớn', o: ['2/5', '1/2', '3/5', '4/5'] },
  { w: 7, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp', q: 'Xếp các số theo thứ tự từ bé đến lớn', o: ['0,09', '0,1', '0,19', '0,9'] },
  { w: 7, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp', q: 'Xếp các số theo thứ tự từ lớn đến bé', o: ['5,7', '5,69', '5,096', '5,09'] },
  { w: 7, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp', q: 'Xếp các số đo theo thứ tự từ nhẹ đến nặng', o: ['350 g', '0,4 kg', '1 kg 5 g', '1,2 kg'] },
  { w: 9, m: 'toan', k: 'order', lv: 3, t: 'Sắp xếp', q: 'Xếp các số đo diện tích theo thứ tự từ bé đến lớn', o: ['5000 m²', '1 ha', '2 ha 5 m²', '1 km²'] },
  { w: 12, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp', q: 'Xếp các bước nhân hai số thập phân theo thứ tự đúng', o: ['viết thừa số này dưới kia', 'nhân như số tự nhiên', 'đếm chữ số sau dấu phẩy', 'đặt dấu phẩy ở tích'] },
  { w: 14, m: 'toan', k: 'order', lv: 3, t: 'Sắp xếp', q: 'Xếp các hình theo diện tích từ bé đến lớn (độ dài tính bằng cm)', o: ['tam giác đáy 4, cao 3', 'hình vuông cạnh 3', 'tam giác đáy 6, cao 4', 'chữ nhật 4 × 5'] },
  { w: 17, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp', q: 'Xếp các bước giải bài toán có lời văn theo thứ tự hợp lý', o: ['đọc kĩ đề bài', 'tìm cách giải', 'trình bày bài giải', 'kiểm tra lại kết quả'] },
  { w: 21, m: 'toan', k: 'order', lv: 3, t: 'Sắp xếp', q: 'Xếp theo thứ tự từ bé đến lớn', o: ['0,2', '1/4', '30%', '0,35'] },
  { w: 24, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp', q: 'Xếp các số đo thể tích theo thứ tự từ bé đến lớn', o: ['900 cm³', '1 dm³', '1,5 dm³', '1 m³'] },
  { w: 29, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp', q: 'Xếp các khoảng thời gian từ ngắn đến dài', o: ['100 giây', '2 phút', '0,5 giờ', '45 phút'] },
  { w: 30, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp', q: 'Xếp theo vận tốc từ chậm đến nhanh', o: ['người đi bộ 5 km/giờ', 'xe đạp 15 km/giờ', 'ô tô 60 km/giờ', 'máy bay 800 km/giờ'] },
  { w: 33, m: 'toan', k: 'order', lv: 3, t: 'Sắp xếp', q: 'Xếp các số theo thứ tự từ bé đến lớn', o: ['1 1/2', '1,6', '7/4', '2'] },
  { w: 35, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp', q: 'Xếp các đơn vị đo độ dài từ lớn đến bé', o: ['km', 'hm', 'dam', 'm'] },
];
