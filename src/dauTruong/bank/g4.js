/**
 * 🏆 Đấu Trường Nhí: ngân hàng câu soạn tay lớp 4 (Toán + Tiếng Việt, chương trình 2018, bám sách Kết nối tri thức).
 * w: tuần học (1–35; HK I 1–18, HK II 19–35), chỉ hỏi khi lớp đã học tới tuần đó. abcd: o[0] đúng. order: o theo thứ tự đúng.
 * Kiểm tra: node scripts/dautruong-check.mjs 4
 */
export default [
  // ── Tiếng Việt · Danh từ ──
  { w: 1, m: 'tv', lv: 1, t: 'Danh từ', q: 'Từ nào là danh từ?', o: ['dòng sông', 'chạy nhảy', 'xanh biếc', 'vui vẻ'], ex: 'Danh từ là từ chỉ sự vật: dòng sông.' },
  { w: 1, m: 'tv', lv: 1, t: 'Danh từ', q: 'Danh từ nào chỉ hiện tượng tự nhiên?', o: ['cơn mưa', 'cái bàn', 'cô giáo', 'con mèo'], ex: 'Mưa, gió, sấm, chớp là hiện tượng tự nhiên.' },
  { w: 1, m: 'tv', lv: 1, t: 'Danh từ', q: 'Danh từ nào chỉ thời gian?', o: ['buổi sáng', 'quyển vở', 'dòng suối', 'bác sĩ'], ex: 'Buổi sáng là danh từ chỉ thời gian.' },
  { w: 1, m: 'tv', lv: 1, t: 'Danh từ', q: 'Danh từ nào chỉ con vật?', o: ['con sóc', 'hót líu lo', 'nhanh nhẹn', 'leo trèo'], ex: 'Con sóc là danh từ chỉ con vật.' },
  { w: 2, m: 'tv', lv: 2, t: 'Danh từ', q: 'Trong câu "Bà em trồng một vườn rau cải.", các danh từ là những từ nào?', o: ['bà, vườn, rau cải', 'trồng, vườn', 'bà, trồng', 'một, rau cải'], ex: 'Trồng là động từ, một là số từ.' },
  { w: 2, m: 'tv', lv: 1, t: 'Danh từ', q: 'Danh từ nào chỉ người?', o: ['nông dân', 'cánh đồng', 'gặt lúa', 'chăm chỉ'], ex: 'Nông dân là danh từ chỉ người.' },
  { w: 2, m: 'tv', lv: 2, t: 'Danh từ', q: 'Từ "nắng" trong câu "Nắng vàng trải khắp sân." là từ loại gì?', o: ['danh từ', 'động từ', 'tính từ', 'đại từ'], ex: '"Nắng" chỉ hiện tượng tự nhiên nên là danh từ.' },
  { w: 2, m: 'tv', lv: 1, t: 'Danh từ', q: 'Nhóm nào gồm toàn danh từ?', o: ['sách, bút, thước', 'đọc, viết, vẽ', 'đỏ, xanh, tím', 'to, nhỏ, cao'], ex: 'Sách, bút, thước đều chỉ đồ vật.' },
  { w: 2, m: 'tv', lv: 1, t: 'Danh từ', q: 'Chọn danh từ thích hợp: "Đàn cá tung tăng bơi dưới …"', o: ['dòng suối', 'bơi lội', 'trong vắt', 'nhanh nhẹn'], ex: 'Cá bơi dưới dòng suối.' },

  // ── Tiếng Việt · Danh từ chung, danh từ riêng ──
  { w: 3, m: 'tv', lv: 1, t: 'Danh từ riêng', q: 'Từ nào là danh từ riêng?', o: ['Hà Nội', 'thành phố', 'dòng sông', 'ngọn núi'], ex: 'Hà Nội là tên riêng của một thành phố, viết hoa.' },
  { w: 3, m: 'tv', lv: 1, t: 'Danh từ riêng', q: '"Phan Xi Păng" là tên riêng của gì?', o: ['một ngọn núi', 'một dòng sông', 'một thành phố', 'một hòn đảo'], ex: 'Phan Xi Păng là ngọn núi cao nhất Việt Nam.' },
  { w: 3, m: 'tv', lv: 2, t: 'Danh từ riêng', q: 'Trong câu "em đi thăm vịnh hạ long cùng bố mẹ.", những chữ nào cần viết hoa?', o: ['Em, Hạ, Long', 'Em, Vịnh, Hạ', 'Hạ, Long, Bố', 'Em, Bố, Mẹ'], ex: 'Viết hoa chữ đầu câu và tên riêng: Em đi thăm vịnh Hạ Long.' },
  { w: 3, m: 'tv', lv: 1, t: 'Danh từ riêng', q: 'Từ nào là danh từ chung?', o: ['học sinh', 'Lan', 'Đà Nẵng', 'Mê Kông'], ex: 'Học sinh là tên chung của nhiều người, viết thường.' },
  { w: 3, m: 'tv', lv: 1, t: 'Danh từ riêng', q: '"Cửu Long" là tên riêng của gì?', o: ['một dòng sông', 'một ngọn núi', 'một con đường', 'một ngôi trường'], ex: 'Sông Cửu Long chảy qua miền Tây Nam Bộ.' },

  // ── Tiếng Việt · Động từ ──
  { w: 4, m: 'tv', lv: 1, t: 'Động từ', q: 'Từ nào là động từ?', o: ['bơi lội', 'hồ nước', 'trong veo', 'mát lạnh'], ex: 'Bơi lội chỉ hoạt động nên là động từ.' },
  { w: 4, m: 'tv', lv: 1, t: 'Động từ', q: 'Trong câu "Chú chim sâu nhảy nhót trên cành.", động từ là từ nào?', o: ['nhảy nhót', 'chim sâu', 'cành', 'trên'], ex: 'Nhảy nhót chỉ hoạt động của chú chim.' },
  { w: 4, m: 'tv', lv: 2, t: 'Động từ', q: 'Từ nào là động từ chỉ trạng thái?', o: ['yêu thương', 'cái bàn', 'màu đỏ', 'dòng sông'], ex: 'Yêu, ghét, lo lắng, yêu thương là động từ chỉ trạng thái.' },
  { w: 4, m: 'tv', lv: 1, t: 'Động từ', q: 'Động từ nào chỉ hoạt động của chim?', o: ['bay', 'bò', 'cày', 'đọc'], ex: 'Chim bay trên trời.' },
  { w: 5, m: 'tv', lv: 1, t: 'Động từ', q: 'Chọn động từ thích hợp điền vào chỗ trống: "Mẹ … cơm cho cả nhà."', o: ['nấu', 'xanh', 'bếp', 'ngon'], ex: 'Mẹ nấu cơm: "nấu" là động từ.' },
  { w: 5, m: 'tv', lv: 1, t: 'Động từ', q: 'Nhóm nào gồm toàn động từ?', o: ['đi, đứng, ngồi', 'bàn, ghế, tủ', 'cao, thấp, gầy', 'sáng, trưa, chiều'], ex: 'Đi, đứng, ngồi đều chỉ hoạt động.' },
  { w: 5, m: 'tv', lv: 3, t: 'Động từ', q: 'Từ "đã" trong câu "Em đã làm xong bài." cho biết điều gì?', o: ['Việc đã xảy ra rồi', 'Việc sắp xảy ra', 'Việc đang xảy ra', 'Nơi xảy ra việc'], ex: '"Đã" đứng trước động từ, chỉ việc đã xảy ra.' },
  { w: 5, m: 'tv', lv: 2, t: 'Động từ', q: 'Từ nào điền vào chỗ trống để chỉ việc sắp xảy ra: "Ngày mai, lớp em … đi tham quan."', o: ['sẽ', 'đã', 'vừa', 'từng'], ex: '"Sẽ" chỉ việc sắp xảy ra.' },
  { w: 5, m: 'tv', lv: 2, t: 'Động từ', q: 'Trong câu "Gió thổi, cây lá đung đưa." có mấy động từ?', o: ['2', '1', '3', '4'], ex: 'Hai động từ: thổi, đung đưa.' },

  // ── Tiếng Việt · Dấu câu ──
  { w: 6, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Dấu gạch ngang ở đầu dòng trong bài kể chuyện thường dùng để làm gì?', o: ['Đánh dấu lời nói của nhân vật', 'Kết thúc câu hỏi', 'Ngăn chủ ngữ với vị ngữ', 'Bày tỏ cảm xúc'], ex: 'Dấu gạch ngang đầu dòng đánh dấu lời nói của nhân vật.' },
  { w: 6, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Chỗ trống trong "Chuyến tàu Hà Nội … Huế khởi hành lúc 8 giờ." điền dấu gì?', o: ['dấu gạch ngang', 'dấu chấm hỏi', 'dấu hai chấm', 'dấu chấm than'], ex: 'Dấu gạch ngang nối các địa danh: Hà Nội – Huế.' },
  { w: 7, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Dấu gạch ngang trong dòng "– Bút chì: dùng để vẽ" có tác dụng gì?', o: ['Đánh dấu các ý liệt kê', 'Đánh dấu lời nói', 'Kết thúc câu', 'Nối hai địa danh'], ex: 'Đầu mỗi dòng liệt kê có dấu gạch ngang.' },
  { w: 7, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Khi đánh dấu lời nói của nhân vật, dấu gạch ngang đặt ở đâu?', o: ['Đầu dòng, trước lời nói', 'Cuối câu', 'Sau chủ ngữ', 'Giữa hai tiếng'], ex: 'Dấu gạch ngang đặt ở đầu dòng, trước lời nhân vật.' },
  { w: 28, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Dấu ngoặc kép trong câu: Bố bảo: "Con cố gắng lên!" dùng để làm gì?', o: ['Đánh dấu lời nói trực tiếp', 'Liệt kê sự vật', 'Nối hai địa danh', 'Kết thúc câu'], ex: 'Lời nói trực tiếp của bố được đặt trong ngoặc kép.' },
  { w: 28, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu điền vào chỗ trống: Mẹ dặn … "Con nhớ đội mũ khi ra nắng."', o: ['dấu hai chấm', 'dấu chấm hỏi', 'dấu chấm than', 'dấu phẩy'], ex: 'Trước lời nói trực tiếp dùng dấu hai chấm.' },
  { w: 29, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Dấu ngoặc đơn trong câu "Thánh Gióng (nhân vật trong truyền thuyết) bay về trời." dùng để làm gì?', o: ['Đánh dấu phần chú thích', 'Đánh dấu lời nói', 'Đánh dấu ý liệt kê', 'Kết thúc câu hỏi'], ex: 'Phần trong ngoặc đơn giải thích thêm về Thánh Gióng.' },
  { w: 29, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Em thích đọc truyện … Dế Mèn phiêu lưu kí … của nhà văn Tô Hoài. Hai chỗ trống điền dấu gì?', o: ['dấu ngoặc kép', 'dấu gạch ngang', 'dấu chấm hỏi', 'dấu chấm than'], ex: 'Tên tác phẩm đặt trong ngoặc kép: "Dế Mèn phiêu lưu kí".' },

  // ── Tiếng Việt · Tính từ ──
  { w: 8, m: 'tv', lv: 1, t: 'Tính từ', q: 'Từ nào là tính từ?', o: ['chăm chỉ', 'học bài', 'quyển vở', 'bạn bè'], ex: 'Chăm chỉ chỉ đặc điểm, tính chất nên là tính từ.' },
  { w: 8, m: 'tv', lv: 1, t: 'Tính từ', q: 'Tính từ nào chỉ màu sắc?', o: ['xanh thẳm', 'cao vút', 'tròn xoe', 'thơm ngát'], ex: 'Xanh thẳm chỉ màu sắc.' },
  { w: 8, m: 'tv', lv: 1, t: 'Tính từ', q: 'Tính từ nào chỉ hình dáng?', o: ['tròn xoe', 'đỏ thắm', 'ngọt lịm', 'ồn ào'], ex: 'Tròn xoe tả hình dáng.' },
  { w: 9, m: 'tv', lv: 2, t: 'Tính từ', q: 'Trong câu "Bầu trời mùa thu trong xanh và cao vời vợi.", tính từ là những từ nào?', o: ['trong xanh, cao vời vợi', 'bầu trời, mùa thu', 'mùa thu, trong xanh', 'bầu trời, cao vời vợi'], ex: 'Trong xanh, cao vời vợi tả đặc điểm của bầu trời.' },
  { w: 9, m: 'tv', lv: 2, t: 'Tính từ', q: 'Cách nói nào chỉ mức độ cao nhất của "đẹp"?', o: ['đẹp nhất', 'hơi đẹp', 'khá đẹp', 'đẹp hơn'], ex: 'Thêm "nhất" để chỉ mức độ cao nhất.' },
  { w: 9, m: 'tv', lv: 1, t: 'Tính từ', q: 'Từ nào tả âm thanh?', o: ['ríu rít', 'đỏ chót', 'mềm mịn', 'thẳng tắp'], ex: 'Ríu rít tả tiếng chim, tiếng trẻ em.' },
  { w: 10, m: 'tv', lv: 1, t: 'Tính từ', q: 'Chọn tính từ thích hợp: "Dòng sông quê em … như một dải lụa."', o: ['mềm mại', 'chạy nhảy', 'con thuyền', 'buổi chiều'], ex: 'Mềm mại là tính từ tả dòng sông.' },
  { w: 10, m: 'tv', lv: 1, t: 'Tính từ', q: 'Tính từ nào tả vị của quả chanh?', o: ['chua', 'ngọt', 'đắng', 'mặn'], ex: 'Quả chanh có vị chua.' },
  { w: 10, m: 'tv', lv: 1, t: 'Tính từ', q: 'Nhóm nào gồm toàn tính từ?', o: ['nhanh, chậm, khỏe', 'chạy, nhảy, bơi', 'mèo, chó, gà', 'sông, núi, biển'], ex: 'Nhanh, chậm, khỏe chỉ đặc điểm.' },
  { w: 10, m: 'tv', lv: 1, t: 'Tính từ', q: 'Tính từ nào chỉ tính tình con người?', o: ['hiền hậu', 'xanh lơ', 'tròn trịa', 'mặn chát'], ex: 'Hiền hậu nói về tính tình.' },

  // ── Tiếng Việt · Nhân hóa ──
  { w: 12, m: 'tv', lv: 1, t: 'Nhân hóa', q: 'Câu nào có sử dụng biện pháp nhân hóa?', o: ['Chị gió nhẹ nhàng ru cây ngủ.', 'Gió thổi mạnh làm cây đổ.', 'Trời có gió mùa đông bắc.', 'Gió ở đây rất mát.'], ex: 'Gió được gọi là "chị" và biết "ru" như người.' },
  { w: 12, m: 'tv', lv: 1, t: 'Nhân hóa', q: 'Trong câu "Ông mặt trời thức dậy sau rặng tre.", sự vật nào được nhân hóa?', o: ['mặt trời', 'rặng tre', 'buổi sáng', 'xóm làng'], ex: 'Mặt trời được gọi là "ông" và biết "thức dậy".' },
  { w: 12, m: 'tv', lv: 2, t: 'Nhân hóa', q: 'Từ nào làm cho con mèo được nhân hóa: "Mèo con … đi học."', o: ['xách cặp', 'kêu meo meo', 'bắt chuột', 'nằm sưởi nắng'], ex: 'Xách cặp đi học là hoạt động của người.' },
  { w: 13, m: 'tv', lv: 3, t: 'Nhân hóa', q: '"Cây bàng đứng trầm ngâm giữa sân trường." Cây bàng được nhân hóa bằng cách nào?', o: ['Tả bằng từ chỉ trạng thái của người', 'Gọi cây bằng từ chỉ người', 'Nói với cây như nói với người', 'So sánh cây với người'], ex: '"Đứng trầm ngâm" vốn tả người.' },
  { w: 13, m: 'tv', lv: 2, t: 'Nhân hóa', q: 'Câu nào gọi con vật bằng từ ngữ dùng để gọi người?', o: ['Bác trâu cần mẫn cày ruộng.', 'Con trâu đang cày ruộng.', 'Trâu ăn cỏ ngoài đồng.', 'Đàn trâu về chuồng.'], ex: '"Bác" là từ dùng để gọi người.' },
  { w: 13, m: 'tv', lv: 3, t: 'Nhân hóa', q: 'Câu nào nhân hóa bằng cách nói với sự vật như nói với người?', o: ['Trăng ơi, từ đâu đến?', 'Trăng tròn như quả bóng.', 'Đêm nay trăng sáng.', 'Trăng lên cao dần.'], ex: 'Gọi "Trăng ơi" và hỏi trăng như hỏi người.' },
  { w: 13, m: 'tv', lv: 2, t: 'Nhân hóa', q: 'Từ nào điền vào chỗ trống để nhân hóa con đường: "Con đường làng … đón em đi học."', o: ['vui vẻ', 'lầy lội', 'dài ngoằng', 'quanh co'], ex: 'Vui vẻ là trạng thái của người.' },

  // ── Tiếng Việt · Đoạn văn ──
  { w: 11, m: 'tv', lv: 2, t: 'Đoạn văn', q: 'Câu chủ đề của một đoạn văn là câu như thế nào?', o: ['Câu nêu ý chính của cả đoạn', 'Câu dài nhất trong đoạn', 'Câu có dấu chấm than', 'Câu cuối cùng của bài'], ex: 'Câu chủ đề nêu ý chính, thường đứng đầu đoạn.' },
  { w: 14, m: 'tv', lv: 2, t: 'Đoạn văn', q: 'Đoạn văn: "Vườn nhà em có nhiều cây ăn quả. Cây xoài trĩu quả. Cây ổi thơm lừng. Cây bưởi sai trĩu cành." Câu nào là câu chủ đề?', o: ['Vườn nhà em có nhiều cây ăn quả.', 'Cây xoài trĩu quả.', 'Cây ổi thơm lừng.', 'Cây bưởi sai trĩu cành.'], ex: 'Câu đầu nêu ý chính, các câu sau nói rõ từng cây.' },
  { w: 22, m: 'tv', lv: 2, t: 'Đoạn văn', q: 'Khi viết bài văn miêu tả cây cối, phần mở bài thường làm gì?', o: ['Giới thiệu cây định tả', 'Tả từng bộ phận của cây', 'Nêu cảm nghĩ cuối bài', 'Kể về người trồng cây'], ex: 'Mở bài giới thiệu cây em định tả.' },
  { w: 20, m: 'tv', lv: 1, t: 'Đoạn văn', q: 'Bài văn miêu tả con vật thường gồm mấy phần?', o: ['3 phần', '2 phần', '4 phần', '5 phần'], ex: 'Mở bài, thân bài, kết bài.' },
  { w: 31, m: 'tv', lv: 2, t: 'Đoạn văn', q: 'Trong đoạn văn tả con mèo, câu nào tả ngoại hình?', o: ['Bộ lông mèo mượt như nhung.', 'Mèo rình chuột rất giỏi.', 'Em rất yêu chú mèo.', 'Mèo thường ngủ cả buổi trưa.'], ex: 'Bộ lông là ngoại hình; các câu kia tả hoạt động, cảm nghĩ.' },

  // ── Tiếng Việt · Chủ ngữ, vị ngữ ──
  { w: 19, m: 'tv', lv: 1, t: 'Chủ ngữ, vị ngữ', q: 'Chủ ngữ của câu "Những bông hoa phượng nở đỏ rực." là gì?', o: ['Những bông hoa phượng', 'nở đỏ rực', 'đỏ rực', 'Những bông hoa'], ex: 'Cái gì nở đỏ rực? Những bông hoa phượng.' },
  { w: 19, m: 'tv', lv: 1, t: 'Chủ ngữ, vị ngữ', q: 'Vị ngữ của câu "Bạn Nam là lớp trưởng lớp em." là gì?', o: ['là lớp trưởng lớp em', 'Bạn Nam', 'lớp trưởng', 'lớp em'], ex: 'Bạn Nam là gì? Là lớp trưởng lớp em.' },
  { w: 20, m: 'tv', lv: 1, t: 'Chủ ngữ, vị ngữ', q: 'Chủ ngữ thường trả lời cho câu hỏi nào?', o: ['Ai? Cái gì? Con gì?', 'Làm gì? Thế nào?', 'Ở đâu?', 'Khi nào?'], ex: 'Chủ ngữ trả lời: Ai? Cái gì? Con gì?' },
  { w: 20, m: 'tv', lv: 1, t: 'Chủ ngữ, vị ngữ', q: 'Chọn vị ngữ phù hợp: "Đàn cò trắng …"', o: ['bay lượn trên cánh đồng', 'trên cánh đồng lúa', 'của bà em', 'sáng hôm qua'], ex: 'Đàn cò trắng làm gì? Bay lượn trên cánh đồng.' },
  { w: 23, m: 'tv', lv: 2, t: 'Chủ ngữ, vị ngữ', q: 'Chủ ngữ của câu "Trên cành cao, chú sóc nhảy tót lên ngọn." là gì?', o: ['chú sóc', 'Trên cành cao', 'nhảy tót lên ngọn', 'ngọn'], ex: '"Trên cành cao" là trạng ngữ; con gì nhảy? Chú sóc.' },
  { w: 21, m: 'tv', lv: 1, t: 'Chủ ngữ, vị ngữ', q: 'Chọn chủ ngữ phù hợp: "… đang gặt lúa trên đồng."', o: ['Các bác nông dân', 'Cánh đồng vàng óng', 'Mùa gặt năm nay', 'Hôm qua'], ex: 'Ai đang gặt lúa? Các bác nông dân.' },
  { w: 21, m: 'tv', lv: 2, t: 'Chủ ngữ, vị ngữ', q: 'Câu "Mặt hồ phẳng lặng như gương." có vị ngữ là gì?', o: ['phẳng lặng như gương', 'Mặt hồ', 'như gương', 'Mặt hồ phẳng lặng'], ex: 'Mặt hồ thế nào? Phẳng lặng như gương.' },
  { w: 22, m: 'tv', lv: 3, t: 'Chủ ngữ, vị ngữ', q: 'Câu nào có chủ ngữ gồm hai người?', o: ['Lan và Hoa cùng tưới cây.', 'Lan tưới cây và nhổ cỏ.', 'Lan tưới cây trong vườn.', 'Sáng nay, Lan tưới cây.'], ex: 'Chủ ngữ "Lan và Hoa" gồm hai người.' },
  { w: 22, m: 'tv', lv: 1, t: 'Chủ ngữ, vị ngữ', q: 'Vị ngữ thường trả lời cho câu hỏi nào?', o: ['Làm gì? Thế nào? Là gì?', 'Ai? Cái gì?', 'Ở đâu?', 'Vì sao?'], ex: 'Vị ngữ trả lời: Làm gì? Thế nào? Là gì?' },

  // ── Tiếng Việt · Trạng ngữ ──
  { w: 23, m: 'tv', lv: 1, t: 'Trạng ngữ', q: 'Trạng ngữ trong câu "Sáng nay, em dậy sớm tập thể dục." là gì?', o: ['Sáng nay', 'em', 'dậy sớm', 'tập thể dục'], ex: '"Sáng nay" chỉ thời gian, đứng đầu câu.' },
  { w: 23, m: 'tv', lv: 1, t: 'Trạng ngữ', q: 'Trạng ngữ "Trên cành cây," chỉ điều gì?', o: ['nơi chốn', 'thời gian', 'nguyên nhân', 'mục đích'], ex: 'Trên cành cây trả lời câu hỏi "Ở đâu?".' },
  { w: 24, m: 'tv', lv: 2, t: 'Trạng ngữ', q: 'Trạng ngữ nào chỉ nguyên nhân?', o: ['Vì trời mưa to,', 'Để học giỏi,', 'Ngoài sân,', 'Chiều nay,'], ex: '"Vì…" trả lời câu hỏi "Vì sao?".' },
  { w: 24, m: 'tv', lv: 2, t: 'Trạng ngữ', q: 'Trạng ngữ nào chỉ mục đích?', o: ['Để bảo vệ môi trường,', 'Nhờ chăm chỉ,', 'Bằng xe đạp,', 'Mùa xuân,'], ex: '"Để…" trả lời câu hỏi "Để làm gì?".' },
  { w: 25, m: 'tv', lv: 2, t: 'Trạng ngữ', q: 'Trạng ngữ nào chỉ phương tiện?', o: ['Bằng chiếc xe đạp cũ,', 'Vì ốm,', 'Trong lớp học,', 'Năm ngoái,'], ex: '"Bằng…" trả lời câu hỏi "Bằng gì?".' },
  { w: 25, m: 'tv', lv: 2, t: 'Trạng ngữ', q: 'Chọn trạng ngữ phù hợp: "…, chúng em trồng thêm cây xanh."', o: ['Để sân trường thêm mát,', 'Vì cây xanh,', 'Bằng cây xanh,', 'Nhờ sân trường,'], ex: 'Trồng cây để làm gì? Để sân trường thêm mát.' },
  { w: 26, m: 'tv', lv: 1, t: 'Trạng ngữ', q: 'Trạng ngữ đứng đầu câu thường được ngăn cách với chủ ngữ, vị ngữ bằng dấu gì?', o: ['dấu phẩy', 'dấu chấm', 'dấu chấm hỏi', 'dấu ngoặc kép'], ex: 'Sau trạng ngữ đầu câu có dấu phẩy.' },
  { w: 26, m: 'tv', lv: 1, t: 'Trạng ngữ', q: 'Câu hỏi "Để làm gì?" dùng để tìm trạng ngữ chỉ gì?', o: ['mục đích', 'thời gian', 'nơi chốn', 'phương tiện'], ex: 'Trạng ngữ chỉ mục đích trả lời "Để làm gì?".' },
  { w: 27, m: 'tv', lv: 2, t: 'Trạng ngữ', q: 'Trạng ngữ trong câu "Nhờ siêng năng, Minh đạt giải nhất." chỉ gì?', o: ['nguyên nhân', 'mục đích', 'thời gian', 'nơi chốn'], ex: '"Nhờ siêng năng" nêu lí do Minh đạt giải.' },
  { w: 27, m: 'tv', lv: 2, t: 'Trạng ngữ', q: 'Câu nào có trạng ngữ chỉ thời gian?', o: ['Đầu năm học, em được tặng sách mới.', 'Ở trường, em học rất vui.', 'Vì chăm học, em được khen.', 'Để khỏe, em tập thể dục.'], ex: '"Đầu năm học" trả lời câu hỏi "Khi nào?".' },

  // ── Tiếng Việt · Viết hoa ──
  { w: 30, m: 'tv', lv: 2, t: 'Viết hoa', q: 'Viết tên "trường tiểu học kim đồng" cho đúng, cần viết hoa những chữ nào?', o: ['Trường, Tiểu, Kim, Đồng', 'Trường, Kim, Đồng', 'Tiểu, Học, Kim, Đồng', 'Trường, Tiểu, Học, Kim, Đồng'], ex: 'Viết đúng: Trường Tiểu học Kim Đồng.' },
  { w: 30, m: 'tv', lv: 3, t: 'Viết hoa', q: 'Viết tên "đội thiếu niên tiền phong hồ chí minh" cho đúng, cần viết hoa những chữ nào?', o: ['Đội, Thiếu, Tiền, Hồ, Chí, Minh', 'Đội, Hồ, Chí, Minh', 'Thiếu, Niên, Tiền, Phong', 'Mọi chữ trong tên'], ex: 'Viết đúng: Đội Thiếu niên Tiền phong Hồ Chí Minh.' },
  { w: 31, m: 'tv', lv: 3, t: 'Viết hoa', q: 'Tên thủ đô nước Nga phiên âm sang tiếng Việt viết đúng là gì?', o: ['Mát-xcơ-va', 'Mát xcơ va', 'Mátxcơva', 'Mát-xơ-va'], ex: 'Viết hoa chữ đầu, các tiếng nối bằng dấu gạch nối.' },
  { w: 31, m: 'tv', lv: 3, t: 'Viết hoa', q: 'Tên nhà bác học người Pháp, đọc là "lu i pa xtơ", viết đúng là gì?', o: ['Lu-i Pa-xtơ', 'Lu-i-Pa-xtơ', 'Lui Pa xtơ', 'Lu-iPa-xtơ'], ex: 'Mỗi bộ phận tên viết hoa chữ đầu, các tiếng trong bộ phận nối bằng gạch nối.' },

  // ── Tiếng Việt · Thành ngữ, tục ngữ ──
  { w: 15, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Câu tục ngữ nào khuyên ta phải kiên trì?', o: ['Có công mài sắt, có ngày nên kim.', 'Ăn quả nhớ kẻ trồng cây.', 'Lá lành đùm lá rách.', 'Uống nước nhớ nguồn.'], ex: 'Kiên trì mài sắt thì sẽ thành kim.' },
  { w: 15, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Câu nào nói về lòng biết ơn?', o: ['Uống nước nhớ nguồn.', 'Chậm như rùa.', 'Nước chảy đá mòn.', 'Chân cứng đá mềm.'], ex: 'Uống nước phải nhớ tới nguồn nước: biết ơn.' },
  { w: 16, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ "Chân cứng đá mềm" nói về điều gì?', o: ['Ý chí vượt qua khó khăn', 'Đôi chân bị đau', 'Đường đi nhiều đá', 'Người hay đi bộ'], ex: 'Chân cứng thì đá cũng phải mềm: vững vàng vượt khó.' },
  { w: 16, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ còn thiếu: "Thương người như thể … thân."', o: ['thương', 'yêu', 'quý', 'giúp'], ex: 'Thương người như thể thương thân.' },
  { w: 17, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ "Nước đổ đầu vịt" nói về việc gì?', o: ['Nói mãi mà chẳng ai nghe theo', 'Con vịt thích tắm', 'Trời mưa rất to', 'Rửa sạch sẽ'], ex: 'Nước đổ lên đầu vịt trôi đi hết: khuyên mấy cũng chẳng vào.' },
  { w: 32, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ còn thiếu: "Một cây làm chẳng nên non, ba cây chụm lại nên hòn … cao."', o: ['núi', 'đồi', 'đá', 'non'], ex: 'Ba cây chụm lại nên hòn núi cao: đoàn kết tạo sức mạnh.' },
  { w: 32, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ "Nhanh như cắt" dùng để tả điều gì?', o: ['Rất nhanh nhẹn', 'Rất sắc bén', 'Rất chăm chỉ', 'Rất cẩn thận'], ex: '"Cắt" là loài chim bay rất nhanh.' },
  { w: 33, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Câu tục ngữ "Tốt gỗ hơn tốt nước sơn" khuyên ta điều gì?', o: ['Vẻ đẹp bên trong quý hơn bề ngoài', 'Nên sơn đồ gỗ thật đẹp', 'Gỗ tốt thì đắt tiền', 'Nước sơn quan trọng nhất'], ex: 'Phẩm chất bên trong quan trọng hơn vẻ ngoài.' },
  { w: 33, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Điền từ còn thiếu: "Gần mực thì đen, gần đèn thì …"', o: ['rạng', 'tối', 'xanh', 'mờ'], ex: 'Gần mực thì đen, gần đèn thì rạng.' },
  { w: 34, m: 'tv', lv: 1, t: 'Thành ngữ, tục ngữ', q: 'Câu tục ngữ nào nói về thời tiết?', o: ['Chuồn chuồn bay thấp thì mưa.', 'Học thầy chẳng tày học bạn.', 'Có chí thì nên.', 'Đói cho sạch, rách cho thơm.'], ex: 'Chuồn chuồn bay thấp báo trời sắp mưa.' },
  { w: 34, m: 'tv', lv: 2, t: 'Thành ngữ, tục ngữ', q: 'Thành ngữ nào nói về sự đoàn kết?', o: ['Đồng tâm hiệp lực', 'Nước đổ đầu vịt', 'Đầu voi đuôi chuột', 'Mò kim đáy bể'], ex: 'Đồng tâm hiệp lực: cùng lòng, chung sức.' },

  // ── Tiếng Việt · Mở rộng vốn từ ──
  { w: 1, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào cùng nghĩa với "chăm chỉ"?', o: ['siêng năng', 'lười biếng', 'nhanh nhẹn', 'thông minh'], ex: 'Chăm chỉ và siêng năng cùng nghĩa.' },
  { w: 3, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào trái nghĩa với "dũng cảm"?', o: ['hèn nhát', 'gan dạ', 'anh hùng', 'can đảm'], ex: 'Dũng cảm trái nghĩa với hèn nhát.' },
  { w: 7, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào nói về ước mơ?', o: ['khát vọng', 'thất vọng', 'chán nản', 'buồn bã'], ex: 'Khát vọng là mong muốn lớn lao.' },
  { w: 8, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào cùng nghĩa với "to lớn"?', o: ['khổng lồ', 'tí hon', 'nhỏ xíu', 'bé bỏng'], ex: 'Khổng lồ nghĩa là rất to lớn.' },
  { w: 11, m: 'tv', lv: 3, t: 'Mở rộng vốn từ', q: 'Trong từ nào, tiếng "tài" có nghĩa là "có khả năng hơn người"?', o: ['tài giỏi', 'tài sản', 'tài trợ', 'tài chính'], ex: 'Tài sản, tài trợ, tài chính: "tài" là tiền của.' },
  { w: 14, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào trái nghĩa với "siêng năng"?', o: ['lười biếng', 'chăm chỉ', 'cần cù', 'chịu khó'], ex: 'Siêng năng trái nghĩa với lười biếng.' },
  { w: 18, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào nói về lòng nhân hậu?', o: ['thương người', 'độc ác', 'ích kỉ', 'keo kiệt'], ex: 'Nhân hậu là biết thương người.' },
  { w: 20, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào cùng nghĩa với "xinh đẹp"?', o: ['xinh xắn', 'xấu xí', 'to lớn', 'cao ráo'], ex: 'Xinh đẹp, xinh xắn cùng nghĩa.' },
  { w: 24, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào trái nghĩa với "hiền lành"?', o: ['hung dữ', 'tốt bụng', 'dịu dàng', 'nhân hậu'], ex: 'Hiền lành trái nghĩa với hung dữ.' },
  { w: 26, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào trái nghĩa với "hòa bình"?', o: ['chiến tranh', 'yên vui', 'thanh bình', 'hạnh phúc'], ex: 'Hòa bình trái nghĩa với chiến tranh.' },
  { w: 28, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào chỉ hoạt động du lịch, khám phá?', o: ['tham quan', 'ngủ trưa', 'nấu ăn', 'quét nhà'], ex: 'Tham quan là đi xem, tìm hiểu nơi mới.' },
  { w: 30, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Từ "trung thực" có nghĩa là gì?', o: ['Ngay thẳng, thật thà', 'Rất thông minh', 'Rất mạnh khỏe', 'Hay giúp đỡ người khác'], ex: 'Trung thực là ngay thẳng, thật thà.' },
  { w: 33, m: 'tv', lv: 2, t: 'Mở rộng vốn từ', q: 'Từ nào trái nghĩa với "lạc quan"?', o: ['bi quan', 'vui vẻ', 'yêu đời', 'tin tưởng'], ex: 'Lạc quan trái nghĩa với bi quan.' },
  { w: 35, m: 'tv', lv: 1, t: 'Mở rộng vốn từ', q: 'Từ nào chỉ người làm nghề khám chữa bệnh?', o: ['bác sĩ', 'kĩ sư', 'nông dân', 'họa sĩ'], ex: 'Bác sĩ khám và chữa bệnh.' },

  // ── Tiếng Việt · Chính tả ──
  { w: 2, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['sáng suốt', 'xáng suốt', 'sáng xuốt', 'xáng xuốt'], ex: 'Viết đúng: sáng suốt.' },
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['trung thực', 'chung thực', 'trung thựt', 'chung thựt'], ex: 'Viết đúng: trung thực.' },
  { w: 9, m: 'tv', lv: 1, t: 'Chính tả', q: 'Chọn từ viết đúng: "Mẹ … rau ngoài vườn."', o: ['trồng', 'chồng', 'chòng', 'dồng'], ex: 'Trồng rau viết với tr.' },
  { w: 11, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['rực rỡ', 'rực rở', 'dực dỡ', 'rựt rỡ'], ex: 'Viết đúng: rực rỡ (dấu ngã).' },
  { w: 13, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['dịu dàng', 'giịu dàng', 'rịu ràng', 'dịu giàng'], ex: 'Viết đúng: dịu dàng.' },
  { w: 16, m: 'tv', lv: 2, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['nghiêng ngả', 'nghiêng ngã', 'ngiêng ngả', 'nghiên ngả'], ex: 'Viết đúng: nghiêng ngả (ngh trước i, ê, e).' },
  { w: 18, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['lấp lánh', 'nấp lánh', 'lấp nánh', 'nấp nánh'], ex: 'Viết đúng: lấp lánh.' },
  { w: 22, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['bát ngát', 'bác ngác', 'bát ngác', 'bác ngát'], ex: 'Viết đúng: bát ngát.' },
  { w: 26, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['khuyên bảo', 'khuyêng bảo', 'khiên bảo', 'khuyên bão'], ex: 'Viết đúng: khuyên bảo.' },
  { w: 29, m: 'tv', lv: 2, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['xao xuyến', 'sao xuyến', 'xao suyến', 'sao suyến'], ex: 'Viết đúng: xao xuyến.' },
  { w: 31, m: 'tv', lv: 1, t: 'Chính tả', q: 'Chọn chữ đúng điền vào chỗ trống: "Cánh đồng lúa chín … ươm."', o: ['vàng', 'dàng', 'giàng', 'ràng'], ex: 'Viết đúng: vàng ươm.' },
  { w: 35, m: 'tv', lv: 1, t: 'Chính tả', q: 'Từ nào viết đúng chính tả?', o: ['sừng sững', 'xừng xững', 'sừng xững', 'xừng sững'], ex: 'Viết đúng: sừng sững.' },

  // ── Tiếng Việt · Tìm từ khác loại ──
  { w: 4, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Tìm từ khác loại: viết, đọc, vẽ, quyển vở', o: ['quyển vở', 'viết', 'đọc', 'vẽ'], ex: 'Quyển vở là danh từ, ba từ kia là động từ.' },
  { w: 6, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Tìm từ khác loại: bàn, ghế, chạy, tủ', o: ['chạy', 'bàn', 'ghế', 'tủ'], ex: 'Chạy là động từ, ba từ kia là danh từ.' },
  { w: 10, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Tìm từ khác loại: đỏ, xanh, vàng, hoa', o: ['hoa', 'đỏ', 'xanh', 'vàng'], ex: 'Hoa là danh từ, ba từ kia chỉ màu sắc.' },
  { w: 16, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Tìm từ khác loại: bút chì, thước kẻ, tẩy, ăn cơm', o: ['ăn cơm', 'bút chì', 'thước kẻ', 'tẩy'], ex: 'Ba từ kia là đồ dùng học tập.' },
  { w: 21, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Tìm từ khác loại: Hà Nội, Huế, thành phố, Cần Thơ', o: ['thành phố', 'Hà Nội', 'Huế', 'Cần Thơ'], ex: 'Thành phố là danh từ chung, ba từ kia là danh từ riêng.' },
  { w: 27, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Tìm từ khác loại: hát, múa, vẽ, sân khấu', o: ['sân khấu', 'hát', 'múa', 'vẽ'], ex: 'Sân khấu là danh từ, ba từ kia chỉ hoạt động.' },
  { w: 32, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Tìm từ khác loại: cao, gầy, béo, cân', o: ['cân', 'cao', 'gầy', 'béo'], ex: 'Cao, gầy, béo là tính từ chỉ dáng người.' },

  // ── Tiếng Việt · Từ điển ──
  { w: 18, m: 'tv', lv: 1, t: 'Từ điển', q: 'Trong từ điển, từ nào được xếp trước nhất?', o: ['an', 'bàn', 'cây', 'dừa'], ex: 'Xếp theo thứ tự chữ cái: a, b, c, d.' },
  { w: 23, m: 'tv', lv: 1, t: 'Từ điển', q: 'Trong từ điển, từ nào được xếp sau cùng?', o: ['vườn', 'hoa', 'lá', 'cành'], ex: 'Chữ v đứng sau c, h, l.' },
  { w: 23, m: 'tv', lv: 2, t: 'Từ điển', q: 'Muốn tìm nghĩa của từ "khiêm tốn", em mở từ điển ở phần chữ cái nào?', o: ['K', 'H', 'T', 'C'], ex: 'Từ "khiêm tốn" bắt đầu bằng chữ K.' },

  // ── Tiếng Việt · Kiểu câu ──
  { w: 17, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu nào là câu hỏi?', o: ['Bạn đã làm bài tập chưa?', 'Bạn làm bài tập đi!', 'Bạn làm bài tập giỏi quá!', 'Bạn đã làm bài tập.'], ex: 'Câu hỏi kết thúc bằng dấu chấm hỏi.' },
  { w: 17, m: 'tv', lv: 2, t: 'Kiểu câu', q: 'Câu "Cậu cho tớ mượn bút với!" dùng để làm gì?', o: ['Đề nghị, nhờ vả', 'Kể một việc', 'Hỏi điều chưa biết', 'Khen ngợi'], ex: 'Đây là câu khiến, dùng để nhờ bạn.' },
  { w: 19, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu "Hoa phượng nở đỏ rực sân trường." là kiểu câu gì?', o: ['Câu kể', 'Câu hỏi', 'Câu khiến', 'Câu cảm'], ex: 'Câu kể dùng để kể, tả, kết thúc bằng dấu chấm.' },
  { w: 25, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu nào là câu khiến?', o: ['Em hãy đóng cửa sổ lại!', 'Cửa sổ đã đóng.', 'Ai đóng cửa sổ?', 'Cửa sổ đẹp quá!'], ex: 'Câu khiến có từ "hãy", dùng để yêu cầu.' },
  { w: 34, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu cảm thường kết thúc bằng dấu gì?', o: ['dấu chấm than', 'dấu chấm hỏi', 'dấu phẩy', 'dấu hai chấm'], ex: 'Câu cảm bộc lộ cảm xúc, có dấu chấm than.' },
  { w: 34, m: 'tv', lv: 1, t: 'Kiểu câu', q: 'Câu nào là câu cảm?', o: ['Ôi, bông hoa đẹp quá!', 'Bông hoa màu đỏ.', 'Bông hoa này tên gì?', 'Bạn hái giúp tớ bông hoa!'], ex: '"Ôi… quá!" bộc lộ cảm xúc.' },

  // ── Tiếng Việt · Đọc hiểu ──
  { w: 2, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Mỗi sáng, ông em đều tưới cho giàn mướp sau nhà." Ông tưới cây vào lúc nào?', o: ['mỗi sáng', 'mỗi tối', 'buổi trưa', 'cuối tuần'], ex: 'Câu nói rõ: mỗi sáng.' },
  { w: 6, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Vì mải chơi, Tý quên mang vở bài tập." Vì sao Tý quên mang vở?', o: ['vì mải chơi', 'vì bị ốm', 'vì trời mưa', 'vì vở bị mất'], ex: 'Trạng ngữ "Vì mải chơi" nêu nguyên nhân.' },
  { w: 9, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Chú gà trống gáy vang, đánh thức cả xóm." Chú gà trống làm gì?', o: ['gáy vang', 'mổ thóc', 'bay lên cây', 'tắm nắng'], ex: 'Gà trống gáy vang đánh thức cả xóm.' },
  { w: 12, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Bé Na xếp gọn đồ chơi rồi mới đi ngủ." Việc nào Na làm trước?', o: ['xếp gọn đồ chơi', 'đi ngủ', 'đọc truyện', 'đánh răng'], ex: '"rồi mới" cho biết xếp đồ chơi làm trước.' },
  { w: 16, m: 'tv', lv: 2, t: 'Đọc hiểu', q: '"Minh đã đọc xong cuốn truyện mà bạn Nam cho mượn." Cuốn truyện là của ai?', o: ['của Nam', 'của Minh', 'của cô giáo', 'của thư viện'], ex: 'Nam cho Minh mượn nên truyện là của Nam.' },
  { w: 19, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Chiếc lá vàng xoay tròn rồi đậu nhẹ xuống mặt hồ." Chiếc lá rơi xuống đâu?', o: ['mặt hồ', 'sân trường', 'bãi cỏ', 'mái nhà'], ex: 'Lá đậu xuống mặt hồ.' },
  { w: 24, m: 'tv', lv: 2, t: 'Đọc hiểu', q: '"Dù trời mưa to, các chú công nhân vẫn miệt mài làm việc." Câu này khen các chú điều gì?', o: ['chăm chỉ, chịu khó', 'thích trời mưa', 'nói chuyện vui', 'mặc áo đẹp'], ex: 'Mưa to vẫn miệt mài làm: chăm chỉ, chịu khó.' },
  { w: 29, m: 'tv', lv: 2, t: 'Đọc hiểu', q: '"Hoa đến lớp sớm hơn Mai, Mai đến sớm hơn Lan." Ai đến lớp sớm nhất?', o: ['Hoa', 'Mai', 'Lan', 'Ba bạn đến cùng lúc'], ex: 'Hoa sớm hơn Mai, Mai sớm hơn Lan: Hoa sớm nhất.' },
  { w: 31, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Trời vừa hửng sáng, bà đã ra chợ bán rau." Bà ra chợ lúc nào?', o: ['lúc trời vừa hửng sáng', 'buổi trưa', 'buổi chiều', 'lúc trời tối'], ex: 'Hửng sáng là lúc trời bắt đầu sáng.' },
  { w: 35, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Nghe tiếng trống trường, đàn chim sẻ vụt bay lên." Vì sao đàn chim bay lên?', o: ['nghe tiếng trống trường', 'thấy con mèo', 'trời đổ mưa', 'đi tìm thức ăn'], ex: 'Đàn chim bay lên vì nghe tiếng trống.' },

  // ── Tiếng Việt · Câu đố ──
  { w: 4, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố vui: Con gì mang nhà trên lưng, bò chậm từng chút một?', o: ['con ốc sên', 'con mèo', 'con chim', 'con thỏ'], ex: 'Ốc sên mang vỏ như mang nhà trên lưng.' },
  { w: 11, m: 'tv', lv: 2, t: 'Câu đố', q: 'Đố vui: Cái gì của em mà người khác dùng nhiều hơn em?', o: ['tên của em', 'chiếc áo', 'quyển vở', 'đôi giày'], ex: 'Mọi người gọi tên em nhiều hơn em tự gọi.' },
  { w: 14, m: 'tv', lv: 2, t: 'Câu đố', q: 'Đố vui: Cái gì càng lấy đi nhiều thì càng to ra?', o: ['cái hố', 'quả bóng', 'cái bánh', 'cây nến'], ex: 'Càng lấy đất đi, cái hố càng to.' },
  { w: 24, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố vui: Cái gì có bốn chân, có lưng mà chẳng biết đi?', o: ['cái ghế', 'con chó', 'con rùa', 'con ngựa'], ex: 'Ghế có bốn chân và lưng tựa.' },
  { w: 27, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố vui: Cái gì có răng mà chẳng bao giờ cắn?', o: ['cái lược', 'con chó', 'con cá sấu', 'con mèo'], ex: 'Lược có răng để chải tóc.' },
  { w: 30, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố vui: Cái gì có mặt mà chẳng có miệng, có kim mà chẳng biết khâu?', o: ['cái đồng hồ', 'cái gương', 'cái kéo', 'cái bàn'], ex: 'Đồng hồ có mặt số và kim giờ, kim phút.' },
  { w: 33, m: 'tv', lv: 2, t: 'Câu đố', q: 'Đố vui: Cái gì càng phơi nắng càng ướt?', o: ['cục nước đá', 'bộ quần áo', 'hạt thóc', 'cái nón'], ex: 'Nước đá phơi nắng tan ra nước.' },

  // ── Tiếng Việt · Xếp câu (order) ──
  { w: 1, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Mỗi buổi sáng,', 'bà em', 'tưới rau', 'ngoài vườn.'], ex: 'Mỗi buổi sáng, bà em tưới rau ngoài vườn.' },
  { w: 2, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Những cánh diều', 'bay lượn', 'trên bầu trời', 'xanh thẳm.'], ex: 'Những cánh diều bay lượn trên bầu trời xanh thẳm.' },
  { w: 3, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Cô giáo', 'kể cho chúng em', 'một câu chuyện', 'rất hay.'], ex: 'Cô giáo kể cho chúng em một câu chuyện rất hay.' },
  { w: 5, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Sáng nay,', 'chú mèo mướp', 'nằm sưởi nắng', 'bên hiên nhà.'], ex: 'Sáng nay, chú mèo mướp nằm sưởi nắng bên hiên nhà.' },
  { w: 7, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Trên cành cây,', 'hai chú chim sâu', 'đang hót', 'líu lo.'], ex: 'Trên cành cây, hai chú chim sâu đang hót líu lo.' },
  { w: 9, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Em', 'luôn giữ gìn', 'sách vở', 'sạch đẹp.'], ex: 'Em luôn giữ gìn sách vở sạch đẹp.' },
  { w: 11, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Mùa thu,', 'lá vàng', 'rơi đầy', 'khắp sân trường.'], ex: 'Mùa thu, lá vàng rơi đầy khắp sân trường.' },
  { w: 13, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Ông mặt trời', 'tỏa những tia nắng', 'ấm áp', 'xuống xóm làng.'], ex: 'Ông mặt trời tỏa những tia nắng ấm áp xuống xóm làng.' },
  { w: 15, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bố em', 'làm việc', 'ở một nhà máy', 'sản xuất giấy.'], ex: 'Bố em làm việc ở một nhà máy sản xuất giấy.' },
  { w: 18, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Cuối tuần,', 'cả nhà em', 'về quê', 'thăm ông bà.'], ex: 'Cuối tuần, cả nhà em về quê thăm ông bà.' },
  { w: 20, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Hoa sen', 'nở hồng', 'khắp mặt hồ', 'vào mùa hạ.'], ex: 'Hoa sen nở hồng khắp mặt hồ vào mùa hạ.' },
  { w: 22, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Các bạn học sinh', 'xếp hàng', 'ngay ngắn', 'dưới sân trường.'], ex: 'Các bạn học sinh xếp hàng ngay ngắn dưới sân trường.' },
  { w: 24, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Vì trời mưa to,', 'buổi cắm trại', 'phải dời', 'sang tuần sau.'], ex: 'Vì trời mưa to, buổi cắm trại phải dời sang tuần sau.' },
  { w: 26, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Để có sức khỏe tốt,', 'em', 'tập thể dục', 'mỗi ngày.'], ex: 'Để có sức khỏe tốt, em tập thể dục mỗi ngày.' },
  { w: 28, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bằng đôi tay khéo léo,', 'mẹ', 'đan cho em', 'chiếc khăn len.'], ex: 'Bằng đôi tay khéo léo, mẹ đan cho em chiếc khăn len.' },
  { w: 30, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Nhờ chăm chỉ luyện tập,', 'đội bóng lớp em', 'đã giành', 'chức vô địch.'], ex: 'Nhờ chăm chỉ luyện tập, đội bóng lớp em đã giành chức vô địch.' },
  { w: 32, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Dòng sông quê em', 'uốn lượn', 'như một', 'dải lụa đào.'], ex: 'Dòng sông quê em uốn lượn như một dải lụa đào.' },
  { w: 35, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Mùa hè đến,', 'tiếng ve', 'râm ran', 'trên vòm lá.'], ex: 'Mùa hè đến, tiếng ve râm ran trên vòm lá.' },

  // ── Tiếng Việt · Xếp sự việc (order) ──
  { w: 4, m: 'tv', k: 'order', lv: 1, t: 'Xếp sự việc', q: 'Xếp các bước trồng cây theo thứ tự hợp lý', o: ['Đào hố', 'Đặt cây xuống hố', 'Lấp đất', 'Tưới nước'], ex: 'Đào hố, đặt cây, lấp đất rồi tưới nước.' },
  { w: 8, m: 'tv', k: 'order', lv: 1, t: 'Xếp sự việc', q: 'Xếp các việc buổi sáng theo thứ tự hợp lý', o: ['Thức dậy', 'Đánh răng, rửa mặt', 'Ăn sáng', 'Đến trường'], ex: 'Thức dậy, vệ sinh cá nhân, ăn sáng rồi đi học.' },
  { w: 12, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp các phần của một bức thư theo thứ tự', o: ['Địa điểm, thời gian', 'Lời xưng hô', 'Nội dung thư', 'Lời chúc, chữ kí'], ex: 'Thư mở đầu bằng nơi viết, ngày viết, rồi xưng hô.' },
  { w: 16, m: 'tv', k: 'order', lv: 1, t: 'Xếp sự việc', q: 'Xếp các giai đoạn lớn lên của cây đậu theo thứ tự', o: ['Hạt đậu', 'Nảy mầm', 'Ra lá, lớn lên', 'Ra hoa, kết quả'], ex: 'Từ hạt nảy mầm, lớn lên rồi ra hoa kết quả.' },
  { w: 21, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp các bước làm một chiếc diều theo thứ tự', o: ['Vót nan tre', 'Buộc khung diều', 'Dán giấy lên khung', 'Buộc dây, thả diều'], ex: 'Có nan mới làm khung, có khung mới dán giấy.' },
  { w: 25, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp các việc khi viết đoạn văn theo thứ tự hợp lý', o: ['Chọn ý chính', 'Viết câu chủ đề', 'Viết các câu nói rõ ý', 'Đọc lại, sửa lỗi'], ex: 'Chọn ý, viết câu chủ đề, viết tiếp, cuối cùng soát lỗi.' },
  { w: 29, m: 'tv', k: 'order', lv: 1, t: 'Xếp sự việc', q: 'Xếp các mùa trong năm theo thứ tự, bắt đầu từ mùa xuân', o: ['Mùa xuân', 'Mùa hạ', 'Mùa thu', 'Mùa đông'], ex: 'Xuân, hạ, thu, đông.' },
  { w: 33, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp vòng đời của con bướm theo thứ tự', o: ['Trứng', 'Sâu', 'Nhộng', 'Bướm'], ex: 'Trứng nở ra sâu, sâu hóa nhộng, nhộng thành bướm.' },

  // ── Tiếng Việt · Xếp theo chữ cái (order) ──
  { w: 18, m: 'tv', k: 'order', lv: 1, t: 'Xếp theo chữ cái', q: 'Xếp các từ theo thứ tự trong từ điển', o: ['bàn', 'ghế', 'sách', 'vở'], ex: 'Thứ tự chữ cái: b, g, s, v.' },
  { w: 23, m: 'tv', k: 'order', lv: 2, t: 'Xếp theo chữ cái', q: 'Xếp các từ theo thứ tự trong từ điển', o: ['cam', 'chanh', 'dưa', 'nho'], ex: 'Từ điển xếp c, rồi ch, rồi d, rồi n.' },
  { w: 27, m: 'tv', k: 'order', lv: 1, t: 'Xếp theo chữ cái', q: 'Xếp các tên theo thứ tự bảng chữ cái', o: ['An', 'Bình', 'Hà', 'Tuấn'], ex: 'Thứ tự chữ cái: A, B, H, T.' },
  { w: 31, m: 'tv', k: 'order', lv: 2, t: 'Xếp theo chữ cái', q: 'Xếp các từ theo thứ tự trong từ điển', o: ['hoa', 'khế', 'lựu', 'mận'], ex: 'Từ điển xếp h, rồi k (kh), rồi l, rồi m.' },

  // ══════════════════════════════ TOÁN ══════════════════════════════

  // ── Toán · Số tự nhiên, chẵn lẻ ──
  { w: 2, m: 'toan', lv: 1, t: 'Số chẵn, số lẻ', q: 'Số nào là số chẵn?', o: ['3578', '4561', '2093', '7005'], ex: 'Số chẵn có chữ số tận cùng là 0, 2, 4, 6, 8.' },
  { w: 2, m: 'toan', lv: 2, t: 'Số chẵn, số lẻ', q: 'Có bao nhiêu số lẻ từ 1 đến 20?', o: ['10', '9', '11', '20'], ex: '1, 3, 5, …, 19: có 10 số lẻ.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số đến 100 000', q: 'Số gồm 4 chục nghìn, 5 nghìn và 6 đơn vị viết là gì?', o: ['45 006', '4506', '45 060', '40 506'], ex: '4 chục nghìn, 5 nghìn, 0 trăm, 0 chục, 6 đơn vị: 45 006.' },
  { w: 2, m: 'toan', lv: 2, t: 'Số chẵn, số lẻ', q: 'Nhà Lan có số nhà là số lẻ lớn nhất có hai chữ số. Đó là số nào?', o: ['99', '98', '97', '89'], ex: 'Số lớn nhất có hai chữ số là 99, và 99 là số lẻ.' },
  { w: 2, m: 'toan', lv: 2, t: 'Số chẵn, số lẻ', q: 'Số chẵn liền sau số 1998 là số nào?', o: ['2000', '1999', '1996', '2002'], ex: 'Hai số chẵn liên tiếp hơn kém nhau 2: 1998 + 2 = 2000.' },

  // ── Toán · Biểu thức chứa chữ ──
  { w: 2, m: 'toan', lv: 2, t: 'Biểu thức chứa chữ', q: 'Với a = 6, giá trị của biểu thức 35 + a × 4 là bao nhiêu?', o: ['59', '164', '45', '74'], ex: 'Nhân trước, cộng sau: 6 × 4 = 24; 35 + 24 = 59.' },
  { w: 3, m: 'toan', lv: 1, t: 'Biểu thức chứa chữ', q: 'Hình vuông có cạnh a. Với a = 9 cm, chu vi hình vuông là bao nhiêu?', o: ['36 cm', '81 cm', '18 cm', '27 cm'], ex: 'Chu vi P = a × 4 = 9 × 4 = 36 (cm).' },
  { w: 3, m: 'toan', lv: 2, t: 'Biểu thức chứa chữ', q: 'Với m = 3 và n = 8, giá trị của m × n − m là bao nhiêu?', o: ['21', '24', '0', '15'], ex: '3 × 8 = 24; 24 − 3 = 21.' },
  { w: 3, m: 'toan', lv: 3, t: 'Biểu thức chứa chữ', q: 'Với b = 5, biểu thức nào có giá trị lớn nhất?', o: ['b × 20', 'b + 40', '100 : b', '60 − b'], ex: 'b × 20 = 100; b + 40 = 45; 100 : b = 20; 60 − b = 55.' },

  // ── Toán · Bài toán ba bước ──
  { w: 3, m: 'toan', lv: 3, t: 'Bài toán ba bước', q: '1 kg cam giá 30 nghìn đồng. Mẹ mua 3 kg cam và 1 hộp sữa giá 25 nghìn đồng, đưa 200 nghìn đồng. Mẹ được trả lại bao nhiêu tiền?', o: ['85 nghìn đồng', '115 nghìn đồng', '145 nghìn đồng', '55 nghìn đồng'], ex: 'Cam: 30 × 3 = 90; cả hai: 90 + 25 = 115; trả lại: 200 − 115 = 85 (nghìn đồng).' },
  { w: 3, m: 'toan', lv: 2, t: 'Bài toán ba bước', q: 'Lớp 4A có 32 bạn chia đều thành 4 tổ. Sau đó mỗi tổ có thêm 2 bạn mới. Bây giờ mỗi tổ có bao nhiêu bạn?', o: ['10 bạn', '8 bạn', '34 bạn', '12 bạn'], ex: '32 : 4 = 8; 8 + 2 = 10 (bạn).' },
  { w: 4, m: 'toan', lv: 3, t: 'Bài toán ba bước', q: 'Cửa hàng có 5 thùng nước, mỗi thùng 24 chai. Sáng bán 38 chai, chiều bán 47 chai. Cửa hàng còn bao nhiêu chai?', o: ['35 chai', '85 chai', '45 chai', '25 chai'], ex: '24 × 5 = 120; 38 + 47 = 85; 120 − 85 = 35 (chai).' },

  // ── Toán · Góc ──
  { w: 4, m: 'toan', lv: 1, t: 'Góc', q: 'Góc nhọn là góc như thế nào?', o: ['Bé hơn góc vuông', 'Bằng góc vuông', 'Lớn hơn góc vuông', 'Bằng hai góc vuông'], ex: 'Góc nhọn bé hơn 90°.' },
  { w: 4, m: 'toan', lv: 1, t: 'Góc', q: 'Góc bẹt có số đo bao nhiêu độ?', o: ['180°', '90°', '360°', '100°'], ex: 'Góc bẹt bằng hai góc vuông: 180°.' },
  { w: 5, m: 'toan', lv: 1, t: 'Góc', q: 'Lúc 3 giờ đúng, kim giờ và kim phút tạo thành góc gì?', o: ['Góc vuông', 'Góc nhọn', 'Góc tù', 'Góc bẹt'], ex: 'Kim phút chỉ 12, kim giờ chỉ 3: góc vuông.' },
  { w: 5, m: 'toan', lv: 1, t: 'Góc', q: 'Lúc 6 giờ đúng, kim giờ và kim phút tạo thành góc gì?', o: ['Góc bẹt', 'Góc vuông', 'Góc nhọn', 'Góc tù'], ex: 'Hai kim chỉ 12 và 6, thẳng hàng: góc bẹt.' },
  { w: 5, m: 'toan', lv: 2, t: 'Góc', q: 'Góc có số đo 120° là góc gì?', o: ['Góc tù', 'Góc nhọn', 'Góc vuông', 'Góc bẹt'], ex: '120° lớn hơn 90° và bé hơn 180°: góc tù.' },
  { w: 5, m: 'toan', lv: 1, t: 'Góc', q: 'Dụng cụ nào dùng để đo góc?', o: ['Thước đo góc', 'Com-pa', 'Thước dây', 'Cân đĩa'], ex: 'Thước đo góc có vạch từ 0° đến 180°.' },
  { w: 5, m: 'toan', lv: 2, t: 'Góc', q: 'Lúc 2 giờ đúng, hai kim đồng hồ tạo thành góc gì?', o: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'], ex: 'Hai kim cách nhau 2 khoảng số (60°): góc nhọn.' },

  // ── Toán · Số đến lớp triệu ──
  { w: 5, m: 'toan', lv: 1, t: 'Số đến lớp triệu', q: 'Số một triệu có mấy chữ số 0?', o: ['6', '5', '7', '3'], ex: '1 000 000 có 6 chữ số 0.' },
  { w: 6, m: 'toan', lv: 2, t: 'Số đến lớp triệu', q: 'Trong số 3 456 789, chữ số 4 thuộc hàng nào?', o: ['hàng trăm nghìn', 'hàng chục nghìn', 'hàng triệu', 'hàng nghìn'], ex: '3 triệu, 4 trăm nghìn, 5 chục nghìn, 6 nghìn…' },
  { w: 6, m: 'toan', lv: 2, t: 'Số đến lớp triệu', q: 'Số gồm 2 triệu và 5 nghìn viết là gì?', o: ['2 005 000', '2 500 000', '2 050 000', '205 000'], ex: '2 triệu, 0 trăm nghìn, 0 chục nghìn, 5 nghìn: 2 005 000.' },
  { w: 6, m: 'toan', lv: 1, t: 'Số đến lớp triệu', q: 'Lớp triệu gồm những hàng nào?', o: ['triệu, chục triệu, trăm triệu', 'nghìn, chục nghìn, trăm nghìn', 'đơn vị, chục, trăm', 'chục, trăm, nghìn'], ex: 'Lớp triệu: hàng triệu, chục triệu, trăm triệu.' },
  { w: 7, m: 'toan', lv: 2, t: 'Số đến lớp triệu', q: 'Dân số một tỉnh là 1 250 000 người. Số đó đọc là gì?', o: ['Một triệu hai trăm năm mươi nghìn', 'Mười hai triệu năm mươi nghìn', 'Một trăm hai mươi lăm nghìn', 'Một triệu hai trăm năm mươi'], ex: '1 250 000: một triệu hai trăm năm mươi nghìn.' },
  { w: 7, m: 'toan', lv: 2, t: 'Số đến lớp triệu', q: 'Giá trị của chữ số 7 trong số 27 300 000 là bao nhiêu?', o: ['7 000 000', '700 000', '70 000 000', '7000'], ex: 'Chữ số 7 ở hàng triệu: 7 000 000.' },

  // ── Toán · Làm tròn, so sánh, dãy số ──
  { w: 7, m: 'toan', lv: 2, t: 'Làm tròn số', q: 'Làm tròn số 348 520 đến hàng trăm nghìn được số nào?', o: ['300 000', '400 000', '350 000', '340 000'], ex: 'Chữ số hàng chục nghìn là 4 (bé hơn 5) nên làm tròn xuống: 300 000.' },
  { w: 7, m: 'toan', lv: 2, t: 'Làm tròn số', q: 'Làm tròn số 1 650 000 đến hàng trăm nghìn được số nào?', o: ['1 700 000', '1 600 000', '2 000 000', '1 650 000'], ex: 'Chữ số hàng chục nghìn là 5 nên làm tròn lên: 1 700 000.' },
  { w: 8, m: 'toan', lv: 2, t: 'Làm tròn số', q: 'Sân vận động có 45 280 chỗ ngồi. Làm tròn đến hàng nghìn là khoảng bao nhiêu chỗ?', o: ['45 000', '46 000', '45 300', '40 000'], ex: 'Chữ số hàng trăm là 2 (bé hơn 5): 45 000.' },
  { w: 8, m: 'toan', lv: 1, t: 'So sánh số', q: 'Số nào lớn nhất?', o: ['1 000 001', '999 999', '1 000 000', '99 999'], ex: 'Số có nhiều chữ số hơn thì lớn hơn; 1 000 001 > 1 000 000.' },
  { w: 8, m: 'toan', lv: 2, t: 'So sánh số', q: 'Số lớn nhất có sáu chữ số khác nhau là số nào?', o: ['987 654', '999 999', '987 650', '876 543'], ex: 'Lấy các chữ số lớn nhất, khác nhau, xếp giảm dần: 987 654.' },
  { w: 8, m: 'toan', lv: 1, t: 'So sánh số', q: 'Số bé nhất có bảy chữ số là số nào?', o: ['1 000 000', '999 999', '1 111 111', '10 000 000'], ex: 'Số bé nhất có bảy chữ số là 1 000 000.' },
  { w: 8, m: 'toan', lv: 1, t: 'So sánh số', q: 'Số tự nhiên bé nhất là số nào?', o: ['0', '1', '2', '10'], ex: 'Dãy số tự nhiên bắt đầu từ 0.' },
  { w: 8, m: 'toan', lv: 1, t: 'So sánh số', q: 'Hai số tự nhiên liên tiếp hơn kém nhau bao nhiêu đơn vị?', o: ['1', '2', '0', '10'], ex: 'Ví dụ 7 và 8 hơn kém nhau 1.' },

  // ── Toán · Đơn vị khối lượng ──
  { w: 9, m: 'toan', lv: 1, t: 'Đơn vị khối lượng', q: '1 tấn bằng bao nhiêu ki-lô-gam?', o: ['1000 kg', '100 kg', '10 kg', '10 000 kg'], ex: '1 tấn = 10 tạ = 1000 kg.' },
  { w: 9, m: 'toan', lv: 1, t: 'Đơn vị khối lượng', q: 'Một con bò nặng 4 tạ. Con bò nặng bao nhiêu ki-lô-gam?', o: ['400 kg', '40 kg', '4000 kg', '4 kg'], ex: '1 tạ = 100 kg nên 4 tạ = 400 kg.' },
  { w: 9, m: 'toan', lv: 1, t: 'Đơn vị khối lượng', q: 'Bao gạo nặng 5 yến. 5 yến bằng bao nhiêu ki-lô-gam?', o: ['50 kg', '500 kg', '5 kg', '5000 kg'], ex: '1 yến = 10 kg nên 5 yến = 50 kg.' },
  { w: 10, m: 'toan', lv: 1, t: 'Đơn vị khối lượng', q: 'Con vật nào có thể nặng khoảng 5 tấn?', o: ['con voi', 'con mèo', 'con gà', 'con chó'], ex: 'Voi trưởng thành nặng vài tấn.' },
  { w: 10, m: 'toan', lv: 2, t: 'Đơn vị khối lượng', q: 'Một xe tải chở 3 tấn 2 tạ hàng. Đổi ra ki-lô-gam được bao nhiêu?', o: ['3200 kg', '3020 kg', '320 kg', '32 000 kg'], ex: '3 tấn = 3000 kg, 2 tạ = 200 kg; 3000 + 200 = 3200 (kg).' },
  { w: 10, m: 'toan', lv: 2, t: 'Đơn vị khối lượng', q: 'Một bao xi măng nặng 50 kg. 20 bao như thế nặng bao nhiêu tạ?', o: ['10 tạ', '1 tạ', '100 tạ', '20 tạ'], ex: '50 × 20 = 1000 kg = 10 tạ.' },

  // ── Toán · Diện tích ──
  { w: 10, m: 'toan', lv: 1, t: 'Diện tích', q: '1 m² bằng bao nhiêu đề-xi-mét vuông?', o: ['100 dm²', '10 dm²', '1000 dm²', '10 000 dm²'], ex: '1 m² = 100 dm².' },
  { w: 10, m: 'toan', lv: 1, t: 'Diện tích', q: '1 dm² bằng bao nhiêu xăng-ti-mét vuông?', o: ['100 cm²', '10 cm²', '1000 cm²', '10 000 cm²'], ex: '1 dm² = 100 cm².' },
  { w: 10, m: 'toan', lv: 1, t: 'Diện tích', q: 'Đơn vị nào thích hợp để đo diện tích phòng học?', o: ['m²', 'cm²', 'mm²', 'dm²'], ex: 'Phòng học rộng vài chục mét vuông.' },
  { w: 11, m: 'toan', lv: 2, t: 'Diện tích', q: 'Một tấm thảm hình vuông cạnh 2 m. Diện tích tấm thảm là bao nhiêu?', o: ['4 m²', '8 m²', '2 m²', '4 m'], ex: '2 × 2 = 4 (m²). Còn 8 m là chu vi.' },
  { w: 11, m: 'toan', lv: 3, t: 'Diện tích', q: 'Viên gạch hình vuông cạnh 5 dm. Lát kín 1 m² nền nhà cần mấy viên gạch như thế?', o: ['4 viên', '5 viên', '20 viên', '25 viên'], ex: 'Mỗi viên 5 × 5 = 25 dm²; 1 m² = 100 dm²; 100 : 25 = 4 (viên).' },
  { w: 16, m: 'toan', lv: 2, t: 'Diện tích', q: 'Bác An lát nền căn phòng rộng 20 m², mỗi mét vuông cần 4 viên gạch. Cần bao nhiêu viên gạch?', o: ['80 viên', '24 viên', '5 viên', '16 viên'], ex: '20 × 4 = 80 (viên).' },

  // ── Toán · Giây, thế kỉ ──
  { w: 11, m: 'toan', lv: 1, t: 'Giây, thế kỉ', q: '1 phút bằng bao nhiêu giây?', o: ['60 giây', '100 giây', '30 giây', '90 giây'], ex: '1 phút = 60 giây.' },
  { w: 11, m: 'toan', lv: 1, t: 'Giây, thế kỉ', q: '1 thế kỉ bằng bao nhiêu năm?', o: ['100 năm', '10 năm', '1000 năm', '50 năm'], ex: '1 thế kỉ = 100 năm.' },
  { w: 11, m: 'toan', lv: 2, t: 'Giây, thế kỉ', q: 'Năm 2026 thuộc thế kỉ thứ mấy?', o: ['XXI', 'XX', 'XXII', 'XIX'], ex: 'Từ năm 2001 đến năm 2100 là thế kỉ XXI.' },
  { w: 11, m: 'toan', lv: 3, t: 'Giây, thế kỉ', q: 'Bác Hồ sinh năm 1890. Năm đó thuộc thế kỉ nào?', o: ['XIX', 'XVIII', 'XX', 'XXI'], ex: 'Từ năm 1801 đến năm 1900 là thế kỉ XIX.' },
  { w: 12, m: 'toan', lv: 2, t: 'Giây, thế kỉ', q: 'Bạn Nam bơi 50 m hết 1 phút 5 giây. Đổi ra giây được bao nhiêu?', o: ['65 giây', '105 giây', '15 giây', '56 giây'], ex: '1 phút = 60 giây; 60 + 5 = 65 (giây).' },
  { w: 12, m: 'toan', lv: 2, t: 'Giây, thế kỉ', q: '3 phút 20 giây bằng bao nhiêu giây?', o: ['200 giây', '320 giây', '180 giây', '230 giây'], ex: '3 × 60 = 180; 180 + 20 = 200 (giây).' },

  // ── Toán · Tính nhanh, cộng trừ số lớn ──
  { w: 13, m: 'toan', lv: 2, t: 'Tính nhanh', q: 'Tính nhanh: 37 + 48 + 63 = ?', o: ['148', '138', '158', '248'], ex: '(37 + 63) + 48 = 100 + 48 = 148.' },
  { w: 13, m: 'toan', lv: 2, t: 'Tính nhanh', q: 'Tính nhanh: 125 + 279 + 875 = ?', o: ['1279', '1179', '1379', '1289'], ex: '(125 + 875) + 279 = 1000 + 279 = 1279.' },
  { w: 13, m: 'toan', lv: 1, t: 'Tính nhanh', q: 'Biết a + b = 450. Vậy b + a bằng bao nhiêu?', o: ['450', '540', '900', '45'], ex: 'Đổi chỗ các số hạng thì tổng giữ nguyên.' },
  { w: 12, m: 'toan', lv: 2, t: 'Cộng, trừ số lớn', q: 'Kết quả của 52 000 − 18 500 là bao nhiêu?', o: ['33 500', '34 500', '44 500', '33 000'], ex: '52 000 − 18 500 = 33 500.' },
  { w: 12, m: 'toan', lv: 2, t: 'Cộng, trừ số lớn', q: 'Thư viện có 12 450 quyển sách, năm nay mua thêm 2550 quyển. Thư viện có bao nhiêu quyển sách?', o: ['15 000', '14 000', '14 900', '15 100'], ex: '12 450 + 2550 = 15 000 (quyển).' },
  { w: 13, m: 'toan', lv: 1, t: 'Cộng, trừ số lớn', q: 'Tính: 10 000 − 1 = ?', o: ['9999', '9000', '99 999', '10 001'], ex: 'Số liền trước 10 000 là 9999.' },

  // ── Toán · Tổng và hiệu ──
  { w: 13, m: 'toan', lv: 1, t: 'Tổng và hiệu', q: 'Tổng hai số là 50, hiệu là 10. Số lớn là bao nhiêu?', o: ['30', '20', '25', '40'], ex: 'Số lớn = (50 + 10) : 2 = 30.' },
  { w: 13, m: 'toan', lv: 1, t: 'Tổng và hiệu', q: 'Tổng hai số là 80, hiệu là 20. Số bé là bao nhiêu?', o: ['30', '50', '40', '60'], ex: 'Số bé = (80 − 20) : 2 = 30.' },
  { w: 13, m: 'toan', lv: 2, t: 'Tổng và hiệu', q: 'An và Bình có tất cả 36 viên bi. An có nhiều hơn Bình 6 viên. An có bao nhiêu viên bi?', o: ['21 viên', '15 viên', '30 viên', '18 viên'], ex: 'An: (36 + 6) : 2 = 21 (viên).' },
  { w: 13, m: 'toan', lv: 2, t: 'Tổng và hiệu', q: 'Bố hơn con 30 tuổi. Tổng số tuổi hai bố con là 46. Con bao nhiêu tuổi?', o: ['8 tuổi', '16 tuổi', '38 tuổi', '23 tuổi'], ex: 'Tuổi con: (46 − 30) : 2 = 8 (tuổi).' },
  { w: 14, m: 'toan', lv: 3, t: 'Tổng và hiệu', q: 'Hình chữ nhật có nửa chu vi 30 cm, chiều dài hơn chiều rộng 4 cm. Chiều rộng là bao nhiêu?', o: ['13 cm', '17 cm', '26 cm', '15 cm'], ex: 'Dài + rộng = 30; rộng = (30 − 4) : 2 = 13 (cm).' },

  // ── Toán · Đường thẳng, hình ──
  { w: 14, m: 'toan', lv: 1, t: 'Đường thẳng, hình', q: 'Hai đường thẳng vuông góc cắt nhau tạo thành mấy góc vuông?', o: ['4', '2', '1', '3'], ex: 'Hai đường thẳng vuông góc tạo thành 4 góc vuông.' },
  { w: 14, m: 'toan', lv: 1, t: 'Đường thẳng, hình', q: 'Hai đường thẳng song song thì thế nào?', o: ['Kéo dài mãi chẳng bao giờ cắt nhau', 'Cắt nhau tạo góc vuông', 'Cắt nhau tại một điểm', 'Trùng lên nhau'], ex: 'Hai đường thẳng song song kéo dài mãi vẫn chẳng gặp nhau.' },
  { w: 15, m: 'toan', lv: 1, t: 'Đường thẳng, hình', q: 'Hình chữ nhật có mấy cặp cạnh song song?', o: ['2 cặp', '1 cặp', '4 cặp', '3 cặp'], ex: 'Hai cạnh dài song song, hai cạnh ngắn song song.' },
  { w: 16, m: 'toan', lv: 2, t: 'Đường thẳng, hình', q: 'Hình nào có bốn cạnh bằng nhau và hai cặp cạnh đối diện song song?', o: ['Hình thoi', 'Hình thang', 'Hình tam giác', 'Hình chữ nhật'], ex: 'Hình thoi có hai cặp cạnh song song và bốn cạnh bằng nhau.' },
  { w: 16, m: 'toan', lv: 2, t: 'Đường thẳng, hình', q: 'Hình bình hành có hai cặp cạnh đối diện thế nào?', o: ['Song song và bằng nhau', 'Vuông góc với nhau', 'Cắt nhau', 'Dài gấp đôi nhau'], ex: 'Hình bình hành có hai cặp cạnh đối diện song song và bằng nhau.' },
  { w: 16, m: 'toan', lv: 1, t: 'Đường thẳng, hình', q: 'Hai cạnh kề nhau của khung cửa sổ hình chữ nhật thế nào với nhau?', o: ['Vuông góc', 'Song song', 'Trùng nhau', 'Tạo góc tù'], ex: 'Các góc hình chữ nhật là góc vuông.' },

  // ── Toán · Nhân, chia ──
  { w: 20, m: 'toan', lv: 1, t: 'Nhân, chia', q: 'Tính nhẩm: 45 × 100 = ?', o: ['4500', '450', '45 000', '4510'], ex: 'Nhân với 100: viết thêm hai chữ số 0.' },
  { w: 20, m: 'toan', lv: 2, t: 'Nhân, chia', q: 'Tính nhanh: 25 × 7 × 4 = ?', o: ['700', '175', '1400', '350'], ex: '(25 × 4) × 7 = 100 × 7 = 700.' },
  { w: 21, m: 'toan', lv: 3, t: 'Nhân, chia', q: 'Tính nhẩm: 36 × 11 = ?', o: ['396', '366', '386', '3611'], ex: '3 + 6 = 9, viết 9 vào giữa 3 và 6: 396.' },
  { w: 20, m: 'toan', lv: 2, t: 'Nhân, chia', q: 'Tính nhanh: 47 × 5 + 47 × 5 = ?', o: ['470', '235', '940', '4705'], ex: '47 × (5 + 5) = 47 × 10 = 470.' },
  { w: 21, m: 'toan', lv: 1, t: 'Nhân, chia', q: 'Mỗi hộp bút có 12 chiếc. 25 hộp có bao nhiêu chiếc bút?', o: ['300 chiếc', '37 chiếc', '250 chiếc', '312 chiếc'], ex: '12 × 25 = 300 (chiếc).' },
  { w: 21, m: 'toan', lv: 2, t: 'Nhân, chia', q: 'Một người đi bộ mỗi ngày 2500 bước. Một tuần người đó đi bao nhiêu bước?', o: ['17 500', '14 500', '2507', '15 500'], ex: 'Một tuần có 7 ngày: 2500 × 7 = 17 500 (bước).' },
  { w: 21, m: 'toan', lv: 1, t: 'Nhân, chia', q: 'Tính nhẩm: 7200 : 100 = ?', o: ['72', '720', '7', '7100'], ex: 'Chia cho 100: bỏ hai chữ số 0 ở cuối.' },
  { w: 22, m: 'toan', lv: 2, t: 'Nhân, chia', q: 'Có 156 quyển vở chia đều cho 12 bạn. Mỗi bạn được bao nhiêu quyển?', o: ['13 quyển', '12 quyển', '14 quyển', '144 quyển'], ex: '156 : 12 = 13 (quyển).' },

  // ── Toán · Chia có dư ──
  { w: 22, m: 'toan', lv: 3, t: 'Chia có dư', q: 'Xếp 250 quả trứng vào khay, mỗi khay 30 quả. Cần ít nhất bao nhiêu khay?', o: ['9 khay', '8 khay', '10 khay', '7 khay'], ex: '250 : 30 = 8 dư 10; 10 quả còn lại cần thêm 1 khay: 9 khay.' },
  { w: 22, m: 'toan', lv: 3, t: 'Chia có dư', q: 'Mỗi xe chở được 40 người. Có 130 người đi tham quan thì cần ít nhất mấy xe?', o: ['4 xe', '3 xe', '5 xe', '13 xe'], ex: '130 : 40 = 3 dư 10; 10 người còn lại cần thêm 1 xe.' },
  { w: 22, m: 'toan', lv: 2, t: 'Chia có dư', q: 'Trong phép chia cho 9, số dư lớn nhất có thể là bao nhiêu?', o: ['8', '9', '1', '0'], ex: 'Số dư luôn bé hơn số chia nên lớn nhất là 8.' },

  // ── Toán · Trung bình cộng ──
  { w: 23, m: 'toan', lv: 1, t: 'Trung bình cộng', q: 'Trung bình cộng của 10, 20 và 30 là bao nhiêu?', o: ['20', '60', '30', '15'], ex: '(10 + 20 + 30) : 3 = 20.' },
  { w: 23, m: 'toan', lv: 1, t: 'Trung bình cộng', q: 'An được các điểm 8, 9, 10. Điểm trung bình của An là bao nhiêu?', o: ['9', '27', '8', '10'], ex: '(8 + 9 + 10) : 3 = 9.' },
  { w: 23, m: 'toan', lv: 2, t: 'Trung bình cộng', q: 'Ba ngày, cửa hàng bán 45 kg, 52 kg và 41 kg gạo. Trung bình mỗi ngày bán bao nhiêu ki-lô-gam?', o: ['46 kg', '138 kg', '45 kg', '47 kg'], ex: '45 + 52 + 41 = 138; 138 : 3 = 46 (kg).' },
  { w: 24, m: 'toan', lv: 3, t: 'Trung bình cộng', q: 'Trung bình cộng của hai số là 25. Một số là 18. Số kia là bao nhiêu?', o: ['32', '7', '25', '43'], ex: 'Tổng hai số: 25 × 2 = 50; số kia: 50 − 18 = 32.' },
  { w: 24, m: 'toan', lv: 2, t: 'Trung bình cộng', q: 'Bốn bạn cao 130 cm, 134 cm, 128 cm và 132 cm. Chiều cao trung bình là bao nhiêu?', o: ['131 cm', '130 cm', '132 cm', '524 cm'], ex: '130 + 134 + 128 + 132 = 524; 524 : 4 = 131 (cm).' },

  // ── Toán · Thống kê, xác suất ──
  { w: 25, m: 'toan', lv: 1, t: 'Thống kê, xác suất', q: 'Trong hộp chỉ có 5 viên bi đỏ. Lấy ra một viên, việc lấy được bi đỏ là thế nào?', o: ['Chắc chắn', 'Có thể', 'Hiếm khi', 'Một nửa'], ex: 'Hộp toàn bi đỏ nên chắc chắn lấy được bi đỏ.' },
  { w: 25, m: 'toan', lv: 1, t: 'Thống kê, xác suất', q: 'Tung một đồng xu 20 lần, có 12 lần xuất hiện mặt sấp. Có bao nhiêu lần mặt ngửa?', o: ['8 lần', '12 lần', '20 lần', '32 lần'], ex: '20 − 12 = 8 (lần).' },
  { w: 25, m: 'toan', lv: 1, t: 'Thống kê, xác suất', q: 'Cân nặng của bốn bạn (kg): 30, 28, 35, 31. Bạn nặng nhất nặng bao nhiêu?', o: ['35 kg', '31 kg', '30 kg', '28 kg'], ex: 'Số lớn nhất trong dãy là 35.' },
  { w: 26, m: 'toan', lv: 1, t: 'Thống kê, xác suất', q: 'Biểu đồ cột: lớp 4A trồng 25 cây, 4B trồng 30 cây, 4C trồng 20 cây. Cả ba lớp trồng bao nhiêu cây?', o: ['75 cây', '70 cây', '80 cây', '55 cây'], ex: '25 + 30 + 20 = 75 (cây).' },
  { w: 26, m: 'toan', lv: 2, t: 'Thống kê, xác suất', q: 'Túi có 3 bi xanh và 7 bi đỏ. Lấy ra một viên, dễ lấy được bi màu nào hơn?', o: ['Bi đỏ', 'Bi xanh', 'Hai màu như nhau', 'Bi vàng'], ex: 'Bi đỏ nhiều hơn nên dễ lấy được hơn.' },

  // ── Toán · Phân số ──
  { w: 26, m: 'toan', lv: 1, t: 'Phân số', q: 'Cái bánh chia thành 8 phần bằng nhau, Mai ăn 3 phần. Mai đã ăn mấy phần cái bánh?', o: ['3/8', '8/3', '5/8', '3/5'], ex: 'Mẫu số 8 là số phần chia, tử số 3 là số phần đã ăn.' },
  { w: 26, m: 'toan', lv: 1, t: 'Phân số', q: 'Phân số "năm phần bảy" viết là gì?', o: ['5/7', '7/5', '5,7', '57'], ex: 'Tử số 5, mẫu số 7.' },
  { w: 27, m: 'toan', lv: 1, t: 'Phân số', q: 'Phân số nào bằng 1/2?', o: ['4/8', '2/3', '3/4', '1/4'], ex: '4/8 = 4 : 4 / 8 : 4 = 1/2.' },
  { w: 27, m: 'toan', lv: 2, t: 'Phân số', q: 'Rút gọn phân số 12/18 được phân số tối giản nào?', o: ['2/3', '6/9', '4/6', '3/2'], ex: 'Chia cả tử và mẫu cho 6: 12/18 = 2/3.' },
  { w: 28, m: 'toan', lv: 1, t: 'Phân số', q: 'Phân số nào lớn hơn 1?', o: ['7/5', '5/7', '3/3', '1/2'], ex: 'Tử số lớn hơn mẫu số thì phân số lớn hơn 1.' },
  { w: 28, m: 'toan', lv: 2, t: 'Phân số', q: 'So sánh 3/5 và 3/7. Kết luận nào đúng?', o: ['3/5 > 3/7', '3/5 < 3/7', '3/5 = 3/7', 'Chưa so sánh được'], ex: 'Cùng tử số, mẫu số bé hơn thì phân số lớn hơn.' },
  { w: 29, m: 'toan', lv: 2, t: 'Phân số', q: 'Quy đồng mẫu số hai phân số 1/3 và 1/4 (mẫu số chung 12) được gì?', o: ['4/12 và 3/12', '3/12 và 4/12', '1/12 và 1/12', '4/12 và 4/12'], ex: '1/3 = 4/12; 1/4 = 3/12.' },
  { w: 31, m: 'toan', lv: 2, t: 'Phân số', q: 'Lớp 4B có 35 bạn, 3/7 số bạn thích bóng đá. Có bao nhiêu bạn thích bóng đá?', o: ['15 bạn', '20 bạn', '5 bạn', '21 bạn'], ex: '35 : 7 × 3 = 15 (bạn).' },
  { w: 30, m: 'toan', lv: 1, t: 'Phân số', q: 'Tính: 2/7 + 3/7 = ?', o: ['5/7', '5/14', '6/7', '1/7'], ex: 'Cùng mẫu số: cộng tử số, giữ mẫu số.' },
  { w: 30, m: 'toan', lv: 2, t: 'Phân số', q: 'Tính: 1/2 + 1/4 = ?', o: ['3/4', '2/6', '2/4', '1/6'], ex: '1/2 = 2/4; 2/4 + 1/4 = 3/4.' },
  { w: 31, m: 'toan', lv: 2, t: 'Phân số', q: 'Tính: 5/6 − 1/3 = ?', o: ['1/2', '4/3', '4/6', '1/3'], ex: '1/3 = 2/6; 5/6 − 2/6 = 3/6 = 1/2.' },
  { w: 31, m: 'toan', lv: 2, t: 'Phân số', q: 'Tính: 2/3 × 3/5 = ?', o: ['2/5', '6/8', '5/8', '9/10'], ex: '2 × 3 / 3 × 5 = 6/15 = 2/5.' },
  { w: 32, m: 'toan', lv: 3, t: 'Phân số', q: 'Tính: 3/4 : 1/2 = ?', o: ['3/2', '3/8', '2/3', '1/2'], ex: 'Nhân với phân số đảo ngược: 3/4 × 2/1 = 6/4 = 3/2.' },
  { w: 32, m: 'toan', lv: 2, t: 'Phân số', q: 'Một tấm vải dài 20 m. Đã bán 3/4 tấm vải. Đã bán bao nhiêu mét?', o: ['15 m', '5 m', '12 m', '16 m'], ex: '20 : 4 × 3 = 15 (m).' },
  { w: 33, m: 'toan', lv: 2, t: 'Phân số', q: 'Lớp em có 30 bạn, 2/5 số bạn là nam. Lớp có bao nhiêu bạn nam?', o: ['12 bạn', '18 bạn', '6 bạn', '15 bạn'], ex: '30 : 5 × 2 = 12 (bạn).' },
  { w: 33, m: 'toan', lv: 1, t: 'Phân số', q: 'Trong các phân số 1/2, 1/5, 1/3, 1/9, phân số nào bé nhất?', o: ['1/9', '1/2', '1/5', '1/3'], ex: 'Cùng tử số 1, mẫu số lớn nhất thì phân số bé nhất.' },

  // ── Toán · Quy luật, tư duy ──
  { w: 6, m: 'toan', lv: 2, t: 'Quy luật, tư duy', q: 'Tìm số tiếp theo của dãy: 1, 4, 9, 16, 25, …', o: ['36', '30', '35', '49'], ex: '1 × 1, 2 × 2, 3 × 3, 4 × 4, 5 × 5, rồi 6 × 6 = 36.' },
  { w: 9, m: 'toan', lv: 3, t: 'Quy luật, tư duy', q: 'Cây cầu dài 30 m, cứ 5 m cắm một cột đèn, hai đầu cầu đều có cột. Có bao nhiêu cột đèn?', o: ['7 cột', '6 cột', '5 cột', '8 cột'], ex: '30 : 5 = 6 khoảng; số cột = 6 + 1 = 7.' },
  { w: 14, m: 'toan', lv: 3, t: 'Quy luật, tư duy', q: 'Cưa một khúc gỗ thành 5 đoạn, mỗi lần cưa mất 2 phút. Cưa xong hết bao nhiêu phút?', o: ['8 phút', '10 phút', '5 phút', '12 phút'], ex: '5 đoạn cần 4 lần cưa; 4 × 2 = 8 (phút).' },
  { w: 17, m: 'toan', lv: 3, t: 'Quy luật, tư duy', q: 'Đánh số trang một quyển sách từ trang 1 đến trang 20 cần dùng bao nhiêu chữ số?', o: ['31 chữ số', '20 chữ số', '29 chữ số', '40 chữ số'], ex: 'Trang 1–9: 9 chữ số; trang 10–20: 11 × 2 = 22; 9 + 22 = 31.' },
  { w: 18, m: 'toan', lv: 2, t: 'Quy luật, tư duy', q: 'Tìm số tiếp theo của dãy: 2, 6, 18, 54, …', o: ['162', '108', '72', '58'], ex: 'Mỗi số gấp 3 lần số trước: 54 × 3 = 162.' },
  { w: 24, m: 'toan', lv: 3, t: 'Quy luật, tư duy', q: 'Hôm nay là thứ Hai. 100 ngày nữa là thứ mấy?', o: ['thứ Tư', 'thứ Ba', 'thứ Năm', 'thứ Hai'], ex: '100 = 7 × 14 + 2; thứ Hai thêm 2 ngày là thứ Tư.' },
  { w: 27, m: 'toan', lv: 3, t: 'Quy luật, tư duy', q: 'Có 4 bạn, mỗi bạn bắt tay mỗi bạn khác đúng một lần. Có tất cả bao nhiêu cái bắt tay?', o: ['6', '4', '8', '12'], ex: '3 + 2 + 1 = 6 (cái bắt tay).' },
  { w: 34, m: 'toan', lv: 3, t: 'Quy luật, tư duy', q: 'Ốc sên bò lên cột cao 5 m. Ban ngày bò lên 3 m, ban đêm tụt xuống 2 m. Đến ngày thứ mấy ốc lên tới đỉnh?', o: ['Ngày thứ 3', 'Ngày thứ 5', 'Ngày thứ 2', 'Ngày thứ 4'], ex: 'Hết ngày 2 ốc ở 2 m; ngày thứ 3 bò thêm 3 m là tới đỉnh 5 m.' },

  // ── Toán · Toán đời sống ──
  { w: 20, m: 'toan', lv: 2, t: 'Toán đời sống', q: 'Chiếc xe đạp giá 1 250 000 đồng, mẹ trả trước 500 000 đồng. Mẹ còn phải trả bao nhiêu?', o: ['750 000 đồng', '850 000 đồng', '650 000 đồng', '1 750 000 đồng'], ex: '1 250 000 − 500 000 = 750 000 (đồng).' },
  { w: 34, m: 'toan', lv: 2, t: 'Toán đời sống', q: 'Một quyển truyện giá 24 nghìn đồng. Mua 3 quyển, đưa 100 nghìn đồng thì được trả lại bao nhiêu?', o: ['28 nghìn đồng', '72 nghìn đồng', '76 nghìn đồng', '38 nghìn đồng'], ex: '24 × 3 = 72; 100 − 72 = 28 (nghìn đồng).' },
  { w: 35, m: 'toan', lv: 3, t: 'Toán đời sống', q: 'Bộ phim bắt đầu lúc 19 giờ 30 phút, dài 1 giờ 45 phút. Phim kết thúc lúc mấy giờ?', o: ['21 giờ 15 phút', '21 giờ 5 phút', '21 giờ 45 phút', '20 giờ 15 phút'], ex: '19 giờ 30 + 1 giờ 45 = 20 giờ 75 phút = 21 giờ 15 phút.' },
  { w: 35, m: 'toan', lv: 2, t: 'Toán đời sống', q: 'Bể cá dạng hình chữ nhật dài 8 dm, rộng 5 dm. Mặt đáy bể có diện tích bao nhiêu?', o: ['40 dm²', '26 dm²', '13 dm²', '40 dm'], ex: '8 × 5 = 40 (dm²).' },

  // ── Toán · Sắp xếp (order) ──
  { w: 1, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp số', q: 'Xếp các số từ bé đến lớn', o: ['8579', '8759', '8795', '8957'], ex: 'So sánh từ hàng nghìn, rồi hàng trăm, hàng chục.' },
  { w: 6, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp số', q: 'Xếp các số từ bé đến lớn', o: ['105 000', '150 000', '501 000', '510 000'], ex: 'So sánh hàng trăm nghìn trước, rồi hàng chục nghìn.' },
  { w: 8, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp số', q: 'Xếp các số từ lớn đến bé', o: ['2 000 000', '1 999 999', '1 099 999', '999 999'], ex: 'Số có bảy chữ số lớn hơn số có sáu chữ số.' },
  { w: 15, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp số', q: 'Xếp các số từ lớn đến bé', o: ['45 600', '45 060', '40 560', '4560'], ex: '4560 chỉ có bốn chữ số nên bé nhất.' },
  { w: 23, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp số', q: 'Xếp các số từ bé đến lớn', o: ['12 345', '12 354', '12 435', '13 245'], ex: 'So sánh lần lượt từng hàng từ trái sang phải.' },
  { w: 20, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp số', q: 'Xếp các phép tính theo kết quả từ bé đến lớn', o: ['200 : 4', '25 × 3', '99 + 2', '12 × 10'], ex: '50, 75, 101, 120.' },
  { w: 3, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp đại lượng', q: 'Xếp các bước giải bài toán có lời văn theo thứ tự', o: ['Đọc kĩ đề bài', 'Tìm cái đã cho, cần tìm', 'Làm phép tính', 'Viết đáp số'], ex: 'Đọc đề, tìm hiểu đề, tính rồi ghi đáp số.' },
  { w: 5, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp đại lượng', q: 'Xếp các góc từ bé đến lớn', o: ['Góc nhọn', 'Góc vuông', 'Góc tù', 'Góc bẹt'], ex: 'Nhọn < 90° = vuông < tù < 180° = bẹt.' },
  { w: 9, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp đại lượng', q: 'Xếp từ nhẹ đến nặng', o: ['5 kg', '3 yến', '2 tạ', '1 tấn'], ex: '5 kg, 30 kg, 200 kg, 1000 kg.' },
  { w: 10, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp đại lượng', q: 'Xếp các đơn vị đo diện tích từ bé đến lớn', o: ['mm²', 'cm²', 'dm²', 'm²'], ex: 'Mỗi đơn vị gấp 100 lần đơn vị bé hơn liền sau.' },
  { w: 11, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp đại lượng', q: 'Xếp các khoảng thời gian từ ngắn đến dài', o: ['50 giây', '2 phút', '1 giờ', '1 thế kỉ'], ex: '50 giây < 120 giây < 60 phút < 100 năm.' },
  { w: 12, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp đại lượng', q: 'Xếp các thế kỉ theo thứ tự thời gian, từ xưa đến nay', o: ['Thế kỉ XVIII', 'Thế kỉ XIX', 'Thế kỉ XX', 'Thế kỉ XXI'], ex: 'XVIII là 18, XIX là 19, XX là 20, XXI là 21.' },
  { w: 27, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp phân số', q: 'Xếp các phân số từ bé đến lớn', o: ['1/8', '1/4', '1/3', '1/2'], ex: 'Cùng tử số 1, mẫu số càng lớn phân số càng bé.' },
  { w: 28, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp phân số', q: 'Xếp các phân số từ bé đến lớn', o: ['2/9', '4/9', '5/9', '8/9'], ex: 'Cùng mẫu số, tử số bé hơn thì phân số bé hơn.' },
  { w: 29, m: 'toan', k: 'order', lv: 3, t: 'Sắp xếp phân số', q: 'Xếp các phân số từ bé đến lớn', o: ['1/2', '3/4', '7/8', '9/8'], ex: 'Quy đồng mẫu 8: 4/8, 6/8, 7/8, 9/8.' },
  { w: 33, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp phân số', q: 'Xếp các phân số từ lớn đến bé', o: ['7/4', '5/4', '3/4', '1/4'], ex: 'Cùng mẫu số, tử số lớn hơn thì phân số lớn hơn.' },
];
