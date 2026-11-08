/**
 * 🏆 Đấu Trường Nhí: ngân hàng câu soạn tay lớp 2 (Toán + Tiếng Việt, chương trình 2018, bám sách Kết nối tri thức).
 * w: tuần học (1–35; HK I 1–18, HK II 19–35), chỉ hỏi khi lớp đã học tới tuần đó. abcd: o[0] đúng. order: o theo thứ tự đúng.
 * Kiểm tra: node scripts/dautruong-check.mjs 2
 */
export default [
  // ══════════════════════════════ TIẾNG VIỆT ══════════════════════════════

  // ── Bảng chữ cái ──
  { w: 1, m: 'tv', lv: 1, t: 'Bảng chữ cái', q: 'Chữ cái nào đứng ngay sau chữ a trong bảng chữ cái?', o: ['ă', 'â', 'b', 'c'], ex: 'Bảng chữ cái: a, ă, â, b, c…' },
  { w: 1, m: 'tv', lv: 1, t: 'Bảng chữ cái', q: 'Chữ cái nào đứng ngay trước chữ c trong bảng chữ cái?', o: ['b', 'd', 'a', 'e'], ex: 'a, ă, â, b, c: đứng trước c là b.' },
  { w: 2, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Bảng chữ cái tiếng Việt có bao nhiêu chữ cái?', o: ['29 chữ cái', '26 chữ cái', '24 chữ cái', '30 chữ cái'], ex: 'Bảng chữ cái tiếng Việt có 29 chữ cái.' },
  { w: 2, m: 'tv', lv: 1, t: 'Bảng chữ cái', q: 'Chữ cái nào đứng ngay sau chữ đ trong bảng chữ cái?', o: ['e', 'ê', 'd', 'g'], ex: 'd, đ, e, ê: sau đ là e.' },
  { w: 3, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Chữ cái nào đứng ngay sau chữ g trong bảng chữ cái?', o: ['h', 'i', 'k', 'ê'], ex: 'ê, g, h, i, k: sau g là h.' },
  { w: 3, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Chữ cái "k" có tên gọi là gì?', o: ['ca', 'cờ', 'ki', 'kê'], ex: 'Chữ k đọc tên là "ca".' },
  { w: 4, m: 'tv', lv: 2, t: 'Bảng chữ cái', q: 'Chữ cái "y" có tên gọi là gì?', o: ['i dài', 'i ngắn', 'y-ê', 'ích-xì'], ex: 'Chữ y đọc tên là "i dài", chữ i là "i ngắn".' },

  // ── Xếp chữ cái (order) ──
  { w: 2, m: 'tv', k: 'order', lv: 1, t: 'Xếp chữ cái', q: 'Xếp các chữ cái theo thứ tự trong bảng chữ cái', o: ['a', 'b', 'd', 'e'], ex: 'a, b, d, e.' },
  { w: 3, m: 'tv', k: 'order', lv: 2, t: 'Xếp chữ cái', q: 'Xếp các chữ cái theo thứ tự trong bảng chữ cái', o: ['ă', 'â', 'đ', 'ê'], ex: 'a, ă, â, b, c, d, đ, e, ê.' },
  { w: 4, m: 'tv', k: 'order', lv: 1, t: 'Xếp chữ cái', q: 'Xếp tên các bạn theo thứ tự bảng chữ cái', o: ['An', 'Bình', 'Dũng', 'Hoa'], ex: 'A, B, D, H theo thứ tự bảng chữ cái.' },
  { w: 8, m: 'tv', k: 'order', lv: 2, t: 'Xếp chữ cái', q: 'Xếp tên các bạn theo thứ tự bảng chữ cái', o: ['Lan', 'Mai', 'Nam', 'Oanh'], ex: 'L, M, N, O theo thứ tự bảng chữ cái.' },
  { w: 12, m: 'tv', k: 'order', lv: 2, t: 'Xếp chữ cái', q: 'Xếp tên các bạn theo thứ tự bảng chữ cái', o: ['Phúc', 'Quân', 'Sơn', 'Tú'], ex: 'P, Q, S, T theo thứ tự bảng chữ cái.' },
  { w: 16, m: 'tv', k: 'order', lv: 3, t: 'Xếp chữ cái', q: 'Xếp tên các bạn theo thứ tự bảng chữ cái', o: ['Ân', 'Bảo', 'Đạt', 'Giang'], ex: 'Â, B, Đ, G theo thứ tự bảng chữ cái.' },

  // ── Chính tả âm đầu ──
  { w: 1, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: thước …ẻ', o: ['k', 'c', 'g', 'gh'], ex: 'Viết k trước e, ê, i: thước kẻ.' },
  { w: 1, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['cái kéo', 'cái céo', 'kái kéo', 'kái céo'], ex: 'Viết c trước a, viết k trước e: cái kéo.' },
  { w: 2, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['ghế gỗ', 'gế gỗ', 'ghế ghỗ', 'gế ghỗ'], ex: 'Viết gh trước e, ê, i; viết g trước o: ghế gỗ.' },
  { w: 2, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: …i nhớ', o: ['gh', 'g', 'ng', 'k'], ex: 'Viết gh trước e, ê, i: ghi nhớ.' },
  { w: 3, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['nghỉ ngơi', 'ngỉ ngơi', 'nghỉ nghơi', 'ngỉ nghơi'], ex: 'Viết ngh trước i, viết ng trước ơ: nghỉ ngơi.' },
  { w: 3, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: củ …ệ', o: ['ngh', 'ng', 'gh', 'nh'], ex: 'Viết ngh trước e, ê, i: củ nghệ.' },
  { w: 5, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['trống trường', 'chống trường', 'trống chường', 'chống chường'], ex: 'Viết là "trống trường".' },
  { w: 6, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: quả …anh', o: ['ch', 'tr', 'gi', 's'], ex: 'Viết là "quả chanh".' },
  { w: 7, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['xe đạp', 'se đạp', 'xe đặp', 'se đặp'], ex: 'Viết là "xe đạp".' },
  { w: 8, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: hoa …en', o: ['s', 'x', 'ch', 'tr'], ex: 'Viết là "hoa sen".' },
  { w: 9, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['cô giáo', 'cô dáo', 'cô ráo', 'cô giáu'], ex: 'Viết là "cô giáo".' },
  { w: 10, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: …òng sông', o: ['d', 'nh', 'r', 'v'], ex: 'Viết là "dòng sông".' },
  { w: 11, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['rổ rá', 'dổ dá', 'giổ giá', 'rổ dá'], ex: 'Viết là "rổ rá".' },
  { w: 12, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['nắng nóng', 'lắng lóng', 'nắng lóng', 'lắng nóng'], ex: 'Viết là "nắng nóng", cả hai tiếng đều bắt đầu bằng n.' },
  { w: 13, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: con …ợn', o: ['l', 'n', 'nh', 'd'], ex: 'Viết là "con lợn".' },
  { w: 14, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['quả na', 'quả la', 'qủa na', 'quả nà'], ex: 'Viết là "quả na".' },
  { w: 20, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: …ăng sáng', o: ['tr', 'ch', 'x', 's'], ex: 'Viết là "trăng sáng".' },
  { w: 22, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: mùa …uân', o: ['x', 's', 'ch', 'tr'], ex: 'Viết là "mùa xuân".' },
  { w: 24, m: 'tv', lv: 1, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['sao biển', 'xao biển', 'sao biểng', 'xao biểng'], ex: 'Viết là "sao biển".' },
  { w: 26, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['giọt nước', 'dọt nước', 'rọt nước', 'giọt nướt'], ex: 'Viết là "giọt nước".' },
  { w: 30, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Chọn chữ thích hợp điền vào chỗ trống: …ữ gìn', o: ['gi', 'd', 'r', 'g'], ex: 'Viết là "giữ gìn".' },
  { w: 33, m: 'tv', lv: 2, t: 'Chính tả âm đầu', q: 'Từ nào viết đúng chính tả?', o: ['hòn đảo xa', 'hòn đảo sa', 'hòn đão xa', 'hòn đão sa'], ex: 'Viết là "hòn đảo xa": đảo dấu hỏi, xa chữ x.' },

  // ── Chính tả vần ──
  { w: 4, m: 'tv', lv: 1, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['bàn tay', 'bàn tai', 'bàng tay', 'bàng tai'], ex: 'Viết là "bàn tay".' },
  { w: 6, m: 'tv', lv: 1, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['ngôi sao', 'ngôi sau', 'ngôi xao', 'ngôi xau'], ex: 'Viết là "ngôi sao".' },
  { w: 9, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['cái rìu', 'cái rừu', 'cái dìu', 'cái giừu'], ex: 'Viết là "cái rìu", vần iu.' },
  { w: 10, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['con cừu', 'con cìu', 'con kừu', 'con cưù'], ex: 'Viết là "con cừu", vần ưu.' },
  { w: 11, m: 'tv', lv: 1, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['cây bàng', 'cây bàn', 'cây bằng', 'cây bành'], ex: 'Viết là "cây bàng", vần ang.' },
  { w: 13, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['leng keng', 'len ken', 'leng ken', 'len keng'], ex: 'Viết là "leng keng", vần eng.' },
  { w: 15, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['khuy áo', 'khui áo', 'khuy ao', 'khui ao'], ex: 'Viết là "khuy áo", vần uy.' },
  { w: 17, m: 'tv', lv: 3, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['loay hoay', 'loai hoai', 'loay hoai', 'loai hoay'], ex: 'Viết là "loay hoay", vần oay.' },
  { w: 19, m: 'tv', lv: 1, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['vườn rau', 'vường rau', 'vườn dau', 'vường dau'], ex: 'Viết là "vườn rau".' },
  { w: 21, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['chim yến', 'chim iến', 'chim yếng', 'chim iếng'], ex: 'Viết là "chim yến": vần yên đứng đầu tiếng viết y.' },
  { w: 23, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['buôn làng', 'buông làng', 'buôn làn', 'buông làn'], ex: 'Viết là "buôn làng".' },
  { w: 25, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['mênh mông', 'mên mông', 'mênh môn', 'mên môn'], ex: 'Viết là "mênh mông".' },
  { w: 27, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['bát ngát', 'bác ngát', 'bát ngác', 'bác ngác'], ex: 'Viết là "bát ngát", vần at.' },
  { w: 29, m: 'tv', lv: 2, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['chim cút', 'chim cúc', 'chim kút', 'chim kúc'], ex: 'Viết là "chim cút", vần ut.' },
  { w: 31, m: 'tv', lv: 3, t: 'Chính tả vần', q: 'Từ nào viết đúng chính tả?', o: ['khuyên bảo', 'khiên bảo', 'khuyêng bảo', 'khuyên bão'], ex: 'Viết là "khuyên bảo".' },

  // ── Từ chỉ sự vật ──
  { w: 1, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào là từ chỉ sự vật?', o: ['cặp sách', 'đọc', 'chăm chỉ', 'vui vẻ'], ex: 'Cặp sách là đồ vật, là từ chỉ sự vật.' },
  { w: 1, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ người?', o: ['cô giáo', 'bảng đen', 'viết bài', 'hiền lành'], ex: 'Cô giáo là từ chỉ người.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào là từ chỉ sự vật?', o: ['đồng hồ', 'chạy', 'xinh xắn', 'nhanh nhẹn'], ex: 'Đồng hồ là đồ vật.' },
  { w: 3, m: 'tv', lv: 2, t: 'Từ chỉ sự vật', q: 'Trong câu "Chú mèo nằm trên ghế.", từ nào chỉ đồ vật?', o: ['ghế', 'mèo', 'nằm', 'trên'], ex: 'Ghế là đồ vật; mèo là con vật.' },
  { w: 4, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ con vật?', o: ['con thỏ', 'cái bàn', 'nhảy nhót', 'trắng muốt'], ex: 'Con thỏ là con vật.' },
  { w: 5, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Từ nào chỉ cây cối?', o: ['cây phượng', 'cái trống', 'học bài', 'đỏ rực'], ex: 'Cây phượng là cây cối.' },
  { w: 8, m: 'tv', lv: 2, t: 'Từ chỉ sự vật', q: 'Nhóm từ nào đều chỉ sự vật?', o: ['sách, vở, bút', 'sách, đọc, viết', 'bút, đẹp, xinh', 'học, chơi, vẽ'], ex: 'Sách, vở, bút đều là đồ vật.' },
  { w: 20, m: 'tv', lv: 1, t: 'Từ chỉ sự vật', q: 'Trong câu "Đàn chim hót líu lo.", từ nào chỉ con vật?', o: ['chim', 'hót', 'líu lo', 'đàn chim hót'], ex: 'Chim là con vật; hót là hoạt động.' },

  // ── Từ chỉ hoạt động ──
  { w: 3, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động?', o: ['quét nhà', 'cái chổi', 'sạch sẽ', 'ngôi nhà'], ex: 'Quét nhà là việc làm, là từ chỉ hoạt động.' },
  { w: 3, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động?', o: ['nhảy dây', 'sợi dây', 'vui vẻ', 'sân trường'], ex: 'Nhảy dây là hoạt động.' },
  { w: 4, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Trong câu "Mẹ tưới cây ngoài vườn.", từ nào chỉ hoạt động?', o: ['tưới', 'mẹ', 'cây', 'vườn'], ex: 'Tưới là việc mẹ làm, là từ chỉ hoạt động.' },
  { w: 5, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Mỗi sáng, con gà trống làm gì?', o: ['gáy', 'sủa', 'kêu meo meo', 'bơi'], ex: 'Gà trống gáy ò ó o.' },
  { w: 6, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Nhóm từ nào đều chỉ hoạt động?', o: ['đọc, viết, vẽ', 'đọc, sách, vẽ', 'bút, viết, vở', 'đẹp, viết, vẽ'], ex: 'Đọc, viết, vẽ đều là hoạt động.' },
  { w: 7, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Bé dùng cái chổi để làm gì?', o: ['quét nhà', 'nấu cơm', 'tưới cây', 'giặt áo'], ex: 'Cái chổi dùng để quét nhà.' },
  { w: 10, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Trong câu "Bà kể chuyện cổ tích cho cháu nghe.", từ nào chỉ hoạt động của bà?', o: ['kể', 'nghe', 'chuyện', 'cháu'], ex: 'Bà kể chuyện; nghe là hoạt động của cháu.' },
  { w: 12, m: 'tv', lv: 1, t: 'Từ chỉ hoạt động', q: 'Từ nào chỉ hoạt động?', o: ['thả diều', 'cánh diều', 'bầu trời', 'cao vút'], ex: 'Thả diều là hoạt động.' },
  { w: 20, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Trong câu "Họa mi hót trong vườn.", từ nào chỉ hoạt động?', o: ['hót', 'họa mi', 'vườn', 'trong'], ex: 'Hót là hoạt động của họa mi.' },
  { w: 28, m: 'tv', lv: 2, t: 'Từ chỉ hoạt động', q: 'Nhóm từ nào đều chỉ hoạt động?', o: ['gọi điện, nhắn tin, viết thư', 'điện thoại, nhắn tin, thư', 'gọi điện, lá thư, bưu thiếp', 'bức thư, tem, phong bì'], ex: 'Gọi điện, nhắn tin, viết thư đều là việc làm.' },

  // ── Từ chỉ đặc điểm ──
  { w: 4, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm?', o: ['xinh xắn', 'cái gương', 'soi gương', 'chiếc nơ'], ex: 'Xinh xắn nêu đặc điểm, là từ chỉ đặc điểm.' },
  { w: 4, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ màu sắc?', o: ['xanh lá', 'lá cây', 'hái lá', 'lá rơi'], ex: 'Xanh lá là màu sắc.' },
  { w: 5, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Trong câu "Bông hoa cúc rất thơm.", từ nào chỉ đặc điểm?', o: ['thơm', 'hoa', 'cúc', 'rất'], ex: 'Thơm nêu đặc điểm của hoa cúc.' },
  { w: 9, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ vị của quả chanh?', o: ['chua', 'ngọt', 'đắng', 'mặn'], ex: 'Quả chanh có vị chua.' },
  { w: 11, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Nhóm từ nào đều chỉ đặc điểm?', o: ['cao, thấp, béo, gầy', 'cao, chạy, béo, gầy', 'nhà, cao, thấp, gầy', 'ăn, uống, béo, gầy'], ex: 'Cao, thấp, béo, gầy đều chỉ đặc điểm.' },
  { w: 13, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ tính nết tốt của bạn nhỏ?', o: ['chăm chỉ', 'lười biếng', 'ích kỉ', 'cẩu thả'], ex: 'Chăm chỉ là tính nết tốt.' },
  { w: 16, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm của con thỏ?', o: ['nhanh nhẹn', 'gáy vang', 'có vây', 'bơi lội'], ex: 'Thỏ chạy nhanh, nhanh nhẹn là đặc điểm của thỏ.' },
  { w: 19, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào tả thời tiết mùa hè?', o: ['nóng nực', 'giá rét', 'se lạnh', 'ấm áp'], ex: 'Mùa hè nóng nực.' },
  { w: 22, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ màu sắc trong câu "Cánh đồng lúa chín vàng óng."?', o: ['vàng óng', 'cánh đồng', 'lúa', 'chín'], ex: 'Vàng óng chỉ màu của lúa chín.' },
  { w: 25, m: 'tv', lv: 1, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ đặc điểm của hòn đá?', o: ['cứng', 'mềm', 'dẻo', 'lỏng'], ex: 'Hòn đá cứng.' },
  { w: 30, m: 'tv', lv: 2, t: 'Từ chỉ đặc điểm', q: 'Từ nào chỉ phẩm chất tốt của người Việt Nam?', o: ['cần cù', 'lười nhác', 'tham lam', 'gian dối'], ex: 'Người Việt Nam cần cù, chịu khó.' },

  // ── Câu giới thiệu ──
  { w: 1, m: 'tv', lv: 1, t: 'Câu giới thiệu', q: 'Câu nào là câu giới thiệu?', o: ['Em là học sinh lớp 2.', 'Em đang đọc sách.', 'Em rất vui.', 'Em đi học.'], ex: 'Câu giới thiệu có dạng "Ai là gì?".' },
  { w: 2, m: 'tv', lv: 2, t: 'Câu giới thiệu', q: 'Trong câu "Bạn Lan là lớp trưởng.", bộ phận nào trả lời câu hỏi "Ai?"', o: ['Bạn Lan', 'là lớp trưởng', 'lớp trưởng', 'là'], ex: 'Ai là lớp trưởng? Bạn Lan.' },
  { w: 2, m: 'tv', lv: 1, t: 'Câu giới thiệu', q: 'Chọn từ ngữ thích hợp để tạo câu giới thiệu: "Bố em là …"', o: ['bác sĩ.', 'rất cao.', 'đang đọc báo.', 'đi làm.'], ex: 'Bố em là bác sĩ: câu giới thiệu "Ai là gì?".' },
  { w: 6, m: 'tv', lv: 2, t: 'Câu giới thiệu', q: 'Câu "Đây là thư viện của trường em." dùng để làm gì?', o: ['Giới thiệu một sự vật', 'Hỏi về một sự vật', 'Nêu hoạt động', 'Nêu đặc điểm'], ex: 'Câu "Đây là…" giới thiệu sự vật.' },
  { w: 8, m: 'tv', lv: 2, t: 'Câu giới thiệu', q: 'Câu hỏi nào hợp với câu "Mai là bạn thân của em."?', o: ['Mai là ai?', 'Mai làm gì?', 'Mai thế nào?', 'Mai ở đâu?'], ex: 'Câu giới thiệu trả lời câu hỏi "là ai?", "là gì?".' },
  { w: 15, m: 'tv', lv: 1, t: 'Câu giới thiệu', q: 'Chọn từ ngữ thích hợp để tạo câu giới thiệu: "Ông bà là …"', o: ['những người em yêu quý.', 'đang tưới cây.', 'rất hiền.', 'đi chợ.'], ex: 'Ông bà là những người em yêu quý.' },
  { w: 18, m: 'tv', lv: 2, t: 'Câu giới thiệu', q: 'Câu nào là câu giới thiệu?', o: ['Con chó là bạn của bé.', 'Con chó sủa gâu gâu.', 'Con chó rất khôn.', 'Con chó chạy ra cổng.'], ex: 'Câu "Ai (cái gì, con gì) là gì?" là câu giới thiệu.' },

  // ── Câu nêu hoạt động ──
  { w: 4, m: 'tv', lv: 1, t: 'Câu nêu hoạt động', q: 'Câu nào là câu nêu hoạt động?', o: ['Bố đang sửa xe.', 'Bố rất cao.', 'Bố là kĩ sư.', 'Bố của em.'], ex: 'Sửa xe là hoạt động.' },
  { w: 5, m: 'tv', lv: 2, t: 'Câu nêu hoạt động', q: 'Trong câu "Các bạn đang tập thể dục.", bộ phận nào trả lời câu hỏi "Làm gì?"', o: ['đang tập thể dục', 'Các bạn', 'thể dục', 'các bạn đang'], ex: 'Các bạn làm gì? Đang tập thể dục.' },
  { w: 9, m: 'tv', lv: 2, t: 'Câu nêu hoạt động', q: 'Câu hỏi nào hợp với câu "Bé Na đang tô màu bức tranh."?', o: ['Bé Na đang làm gì?', 'Bé Na là ai?', 'Bé Na thế nào?', 'Bức tranh là gì?'], ex: 'Câu nêu hoạt động trả lời câu hỏi "làm gì?".' },
  { w: 12, m: 'tv', lv: 1, t: 'Câu nêu hoạt động', q: 'Chọn từ ngữ để tạo câu nêu hoạt động: "Chú bộ đội …"', o: ['đang canh giữ biển đảo.', 'rất dũng cảm.', 'là người lính.', 'của đất nước.'], ex: 'Canh giữ là hoạt động của chú bộ đội.' },
  { w: 21, m: 'tv', lv: 1, t: 'Câu nêu hoạt động', q: 'Câu nào là câu nêu hoạt động?', o: ['Bác nông dân gặt lúa.', 'Lúa chín vàng.', 'Đây là cánh đồng lúa.', 'Cánh đồng rất rộng.'], ex: 'Gặt lúa là hoạt động.' },
  { w: 27, m: 'tv', lv: 1, t: 'Câu nêu hoạt động', q: 'Chọn từ ngữ để tạo câu nêu hoạt động: "Hà mã …"', o: ['cõng các bạn qua sông.', 'to lớn và hiền lành.', 'là con vật to lớn.', 'của khu rừng.'], ex: 'Cõng là hoạt động.' },

  // ── Câu nêu đặc điểm ──
  { w: 5, m: 'tv', lv: 1, t: 'Câu nêu đặc điểm', q: 'Câu nào là câu nêu đặc điểm?', o: ['Mái tóc của bà bạc trắng.', 'Bà kể chuyện cho em.', 'Bà là người em yêu.', 'Bà đi chợ.'], ex: 'Bạc trắng nêu đặc điểm mái tóc.' },
  { w: 6, m: 'tv', lv: 2, t: 'Câu nêu đặc điểm', q: 'Câu hỏi nào hợp với câu "Đôi mắt bé tròn xoe."?', o: ['Đôi mắt bé thế nào?', 'Đôi mắt bé làm gì?', 'Đôi mắt bé là gì?', 'Ai có đôi mắt?'], ex: 'Câu nêu đặc điểm trả lời câu hỏi "thế nào?".' },
  { w: 10, m: 'tv', lv: 1, t: 'Câu nêu đặc điểm', q: 'Chọn từ ngữ để tạo câu nêu đặc điểm: "Chú mèo nhà em …"', o: ['rất tinh nghịch.', 'đang bắt chuột.', 'là con vật nuôi.', 'đi rón rén.'], ex: 'Tinh nghịch là đặc điểm của chú mèo.' },
  { w: 20, m: 'tv', lv: 1, t: 'Câu nêu đặc điểm', q: 'Câu nào là câu nêu đặc điểm?', o: ['Bầu trời mùa thu xanh ngắt.', 'Mùa thu, em đến trường.', 'Đây là mùa thu.', 'Gió thổi lá bay.'], ex: 'Xanh ngắt nêu đặc điểm bầu trời.' },
  { w: 23, m: 'tv', lv: 2, t: 'Câu nêu đặc điểm', q: 'Trong câu "Con khủng long rất to lớn.", bộ phận nào trả lời câu hỏi "Thế nào?"', o: ['rất to lớn', 'Con khủng long', 'khủng long', 'con khủng long rất'], ex: 'Khủng long thế nào? Rất to lớn.' },
  { w: 31, m: 'tv', lv: 2, t: 'Câu nêu đặc điểm', q: 'Chọn từ ngữ để tạo câu nêu đặc điểm: "Biển Trường Sa …"', o: ['xanh biếc và rộng lớn.', 'là vùng biển của ta.', 'đón các chú bộ đội.', 'vỗ sóng vào bờ đá.'], ex: 'Xanh biếc, rộng lớn là đặc điểm của biển.' },

  // ── Dấu câu ──
  { w: 2, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Em tên là Minh …"', o: ['dấu chấm', 'dấu chấm hỏi', 'dấu chấm than', 'dấu phẩy'], ex: 'Câu kể kết thúc bằng dấu chấm.' },
  { w: 3, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Bạn tên là gì …"', o: ['dấu chấm hỏi', 'dấu chấm', 'dấu chấm than', 'dấu phẩy'], ex: 'Câu hỏi kết thúc bằng dấu chấm hỏi.' },
  { w: 4, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Ôi, bông hoa đẹp quá …"', o: ['dấu chấm than', 'dấu chấm', 'dấu chấm hỏi', 'dấu phẩy'], ex: 'Câu bộc lộ cảm xúc dùng dấu chấm than.' },
  { w: 7, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Câu nào cần đặt dấu chấm hỏi ở cuối?', o: ['Cậu đã làm bài tập chưa', 'Tớ đã làm xong bài tập', 'Bài tập hôm nay dễ quá', 'Tớ làm bài tập rồi'], ex: '"…chưa" là câu hỏi, cuối câu đặt dấu chấm hỏi.' },
  { w: 8, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Em có bút … thước và tẩy."', o: ['dấu phẩy', 'dấu chấm', 'dấu chấm hỏi', 'dấu chấm than'], ex: 'Dấu phẩy ngăn cách các từ cùng loại.' },
  { w: 11, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Câu nào đặt dấu phẩy đúng?', o: ['Mẹ mua cam, quýt và bưởi.', 'Mẹ mua, cam quýt và bưởi.', 'Mẹ, mua cam quýt và bưởi.', 'Mẹ mua cam quýt, và bưởi.'], ex: 'Dấu phẩy đặt giữa cam và quýt.' },
  { w: 14, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Mẹ ơi, con yêu mẹ lắm …"', o: ['dấu chấm than', 'dấu chấm hỏi', 'dấu phẩy', 'dấu hai chấm'], ex: 'Câu bộc lộ tình cảm dùng dấu chấm than.' },
  { w: 17, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Câu nào viết đúng dấu câu?', o: ['Hôm nay là thứ mấy?', 'Hôm nay là thứ mấy.', 'Hôm nay là thứ mấy!', 'Hôm nay, là thứ mấy?'], ex: 'Đây là câu hỏi, cuối câu dùng dấu chấm hỏi.' },
  { w: 19, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Mùa xuân … cây cối đâm chồi nảy lộc."', o: ['dấu phẩy', 'dấu chấm', 'dấu chấm hỏi', 'dấu chấm than'], ex: 'Sau bộ phận chỉ thời gian ở đầu câu đặt dấu phẩy.' },
  { w: 22, m: 'tv', lv: 3, t: 'Dấu câu', q: 'Câu nào đặt dấu phẩy đúng?', o: ['Trên sân, lá vàng rơi đầy.', 'Trên, sân lá vàng rơi đầy.', 'Trên sân lá, vàng rơi đầy.', 'Trên sân lá vàng, rơi đầy.'], ex: 'Dấu phẩy đặt sau "Trên sân" chỉ nơi chốn.' },
  { w: 25, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Vì sao sao biển có năm cánh …"', o: ['dấu chấm hỏi', 'dấu chấm', 'dấu chấm than', 'dấu phẩy'], ex: 'Câu hỏi "Vì sao…" kết thúc bằng dấu chấm hỏi.' },
  { w: 29, m: 'tv', lv: 2, t: 'Dấu câu', q: 'Lời cảm ơn nào viết đúng dấu câu?', o: ['Cảm ơn bạn nhiều lắm!', 'Cảm ơn bạn nhiều lắm?', 'Cảm ơn, bạn nhiều lắm!', 'Cảm ơn bạn, nhiều lắm?'], ex: 'Lời cảm ơn bộc lộ tình cảm, dùng dấu chấm than.' },
  { w: 32, m: 'tv', lv: 1, t: 'Dấu câu', q: 'Chọn dấu câu thích hợp điền vào chỗ trống: "Ôi, Hồ Gươm đẹp quá …"', o: ['dấu chấm than', 'dấu chấm hỏi', 'dấu phẩy', 'dấu hai chấm'], ex: 'Câu cảm "Ôi, … quá" dùng dấu chấm than.' },

  // ── Từ trái nghĩa ──
  { w: 20, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "nóng"?', o: ['lạnh', 'ấm', 'nực', 'oi'], ex: 'Nóng trái nghĩa với lạnh.' },
  { w: 21, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "cao"?', o: ['thấp', 'to', 'dài', 'lớn'], ex: 'Cao trái nghĩa với thấp.' },
  { w: 22, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "chăm chỉ"?', o: ['lười biếng', 'siêng năng', 'cần cù', 'chịu khó'], ex: 'Chăm chỉ trái nghĩa với lười biếng.' },
  { w: 24, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "khỏe"?', o: ['yếu', 'mạnh', 'to', 'béo'], ex: 'Khỏe trái nghĩa với yếu.' },
  { w: 25, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "nhanh"?', o: ['chậm', 'vội', 'gấp', 'lẹ'], ex: 'Nhanh trái nghĩa với chậm.' },
  { w: 26, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Cặp từ nào trái nghĩa?', o: ['to - nhỏ', 'to - lớn', 'nhỏ - bé', 'xinh - đẹp'], ex: 'To và nhỏ có nghĩa trái ngược nhau.' },
  { w: 27, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "vui"?', o: ['buồn', 'mừng', 'sướng', 'thích'], ex: 'Vui trái nghĩa với buồn.' },
  { w: 29, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "đoàn kết"?', o: ['chia rẽ', 'gắn bó', 'thương yêu', 'đùm bọc'], ex: 'Đoàn kết trái nghĩa với chia rẽ.' },
  { w: 31, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Chọn từ trái nghĩa với "già" điền vào chỗ trống: "Kính già, yêu …"', o: ['trẻ', 'em', 'bạn', 'mẹ'], ex: 'Kính già, yêu trẻ: già trái nghĩa với trẻ.' },
  { w: 33, m: 'tv', lv: 1, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "rộng"?', o: ['hẹp', 'dài', 'to', 'lớn'], ex: 'Rộng trái nghĩa với hẹp.' },
  { w: 34, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Cặp từ nào trái nghĩa?', o: ['ngày - đêm', 'sáng - sớm', 'trưa - chiều', 'tối - khuya'], ex: 'Ngày và đêm có nghĩa trái ngược nhau.' },
  { w: 35, m: 'tv', lv: 2, t: 'Từ trái nghĩa', q: 'Từ nào trái nghĩa với "bắt đầu"?', o: ['kết thúc', 'mở đầu', 'khởi đầu', 'ban đầu'], ex: 'Bắt đầu trái nghĩa với kết thúc.' },

  // ── Từ cùng nghĩa ──
  { w: 12, m: 'tv', lv: 1, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "chăm chỉ"?', o: ['siêng năng', 'lười biếng', 'nhanh nhẹn', 'thông minh'], ex: 'Chăm chỉ và siêng năng có nghĩa giống nhau.' },
  { w: 14, m: 'tv', lv: 1, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "bố"?', o: ['ba', 'mẹ', 'ông', 'chú'], ex: 'Nhiều nơi gọi bố là ba.' },
  { w: 16, m: 'tv', lv: 2, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "yêu thương"?', o: ['quý mến', 'ghét bỏ', 'giận dỗi', 'trêu chọc'], ex: 'Yêu thương gần nghĩa với quý mến.' },
  { w: 18, m: 'tv', lv: 1, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "hiền lành"?', o: ['hiền hậu', 'dữ tợn', 'hung dữ', 'nóng nảy'], ex: 'Hiền lành gần nghĩa với hiền hậu.' },
  { w: 22, m: 'tv', lv: 1, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "to lớn"?', o: ['khổng lồ', 'bé xíu', 'nhỏ nhắn', 'tí hon'], ex: 'To lớn gần nghĩa với khổng lồ.' },
  { w: 26, m: 'tv', lv: 1, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "xinh đẹp"?', o: ['xinh xắn', 'xấu xí', 'cao lớn', 'gầy gò'], ex: 'Xinh đẹp gần nghĩa với xinh xắn.' },
  { w: 30, m: 'tv', lv: 2, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "dũng cảm"?', o: ['gan dạ', 'nhút nhát', 'hèn nhát', 'sợ sệt'], ex: 'Dũng cảm gần nghĩa với gan dạ.' },
  { w: 32, m: 'tv', lv: 2, t: 'Từ cùng nghĩa', q: 'Từ nào có nghĩa giống "đất nước"?', o: ['Tổ quốc', 'làng xóm', 'thành phố', 'khu phố'], ex: 'Đất nước còn gọi là Tổ quốc.' },

  // ── Tìm từ khác loại ──
  { w: 3, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['chạy', 'bàn', 'ghế', 'tủ'], ex: 'Bàn, ghế, tủ là đồ vật; chạy là hoạt động.' },
  { w: 6, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['quả cam', 'con mèo', 'con chó', 'con gà'], ex: 'Mèo, chó, gà là con vật; quả cam là trái cây.' },
  { w: 9, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['đỏ', 'hát', 'múa', 'vẽ'], ex: 'Hát, múa, vẽ là hoạt động; đỏ là màu sắc.' },
  { w: 13, m: 'tv', lv: 1, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['bàn chải', 'ông', 'bà', 'cháu'], ex: 'Ông, bà, cháu chỉ người; bàn chải là đồ vật.' },
  { w: 19, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['cơn mưa', 'mùa xuân', 'mùa hạ', 'mùa thu'], ex: 'Mùa xuân, mùa hạ, mùa thu là tên các mùa trong năm; cơn mưa là hiện tượng thời tiết.' },
  { w: 23, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Con vật nào khác loại với các con còn lại?', o: ['cá heo', 'hổ', 'voi', 'khỉ'], ex: 'Hổ, voi, khỉ sống trong rừng; cá heo sống dưới biển.' },
  { w: 28, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['quyển vở', 'điện thoại', 'máy tính', 'ti vi'], ex: 'Điện thoại, máy tính, ti vi là đồ dùng chạy bằng điện.' },
  { w: 33, m: 'tv', lv: 2, t: 'Tìm từ khác loại', q: 'Từ nào khác loại với các từ còn lại?', o: ['núi', 'biển', 'sông', 'hồ'], ex: 'Biển, sông, hồ đều có nước; núi là đất đá.' },

  // ── Từ ngữ theo chủ đề ──
  { w: 1, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Ai dạy học ở trường?', o: ['thầy giáo', 'bác sĩ', 'nông dân', 'phi công'], ex: 'Thầy giáo dạy học ở trường.' },
  { w: 2, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Từ nào chỉ đồ dùng học tập?', o: ['thước kẻ', 'cái nồi', 'quả bóng', 'đôi dép'], ex: 'Thước kẻ là đồ dùng học tập.' },
  { w: 5, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Đồ vật nào dùng để báo giờ vào lớp?', o: ['cái trống', 'cái chổi', 'cái bảng', 'cái ghế'], ex: 'Tiếng trống trường báo giờ vào lớp.' },
  { w: 7, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Nơi nào trong trường để mượn sách đọc?', o: ['thư viện', 'nhà ăn', 'sân trường', 'phòng y tế'], ex: 'Thư viện cho mượn sách.' },
  { w: 10, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Trò chơi nào cần có gió?', o: ['thả diều', 'nhảy dây', 'đá cầu', 'trốn tìm'], ex: 'Có gió diều mới bay lên được.' },
  { w: 11, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Đồ chơi nào làm bằng giấy, quay tít khi có gió?', o: ['chong chóng', 'búp bê', 'ô tô', 'quả bóng'], ex: 'Chong chóng quay khi gặp gió.' },
  { w: 14, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Nhóm từ nào đều chỉ người trong gia đình?', o: ['ông, bà, bố, mẹ', 'ông, bàn, ghế, mẹ', 'bố, đi, về, mẹ', 'cô, chú, bàn, ghế'], ex: 'Ông, bà, bố, mẹ là người trong gia đình.' },
  { w: 15, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Từ nào nói về tình cảm tốt giữa anh chị em?', o: ['nhường nhịn', 'tranh giành', 'cãi nhau', 'giận hờn'], ex: 'Anh chị em biết nhường nhịn nhau.' },
  { w: 17, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Con vật nào là vật nuôi trong nhà?', o: ['con mèo', 'con hổ', 'con sư tử', 'con sói'], ex: 'Mèo là vật nuôi; hổ, sư tử, sói là thú rừng.' },
  { w: 21, m: 'tv', lv: 2, t: 'Từ ngữ theo chủ đề', q: 'Loài chim nào nổi tiếng hót hay?', o: ['họa mi', 'đại bàng', 'cò', 'chim cánh cụt'], ex: 'Họa mi có tiếng hót rất hay.' },
  { w: 23, m: 'tv', lv: 2, t: 'Từ ngữ theo chủ đề', q: 'Loài vật nào đã tuyệt chủng từ rất lâu?', o: ['khủng long', 'voi', 'hươu cao cổ', 'tê giác'], ex: 'Khủng long sống cách đây hàng triệu năm.' },
  { w: 24, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Việc làm nào giúp bảo vệ môi trường?', o: ['trồng cây', 'chặt cây', 'xả rác', 'bẻ cành'], ex: 'Trồng cây giúp bảo vệ môi trường.' },
  { w: 26, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Việc làm nào giúp bảo vệ biển?', o: ['nhặt rác trên bãi biển', 'vứt túi ni lông xuống biển', 'bẻ san hô làm quà', 'đánh bắt cá con'], ex: 'Nhặt rác giữ cho biển sạch.' },
  { w: 30, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Ai canh giữ biển đảo của Tổ quốc?', o: ['chú bộ đội hải quân', 'bác nông dân', 'cô giáo', 'chú công nhân'], ex: 'Các chú hải quân canh giữ biển đảo.' },
  { w: 32, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Thủ đô của nước Việt Nam là thành phố nào?', o: ['Hà Nội', 'Huế', 'Đà Nẵng', 'Cần Thơ'], ex: 'Thủ đô của Việt Nam là Hà Nội.' },
  { w: 34, m: 'tv', lv: 2, t: 'Từ ngữ theo chủ đề', q: 'Hồ Gươm còn có tên gọi khác là gì?', o: ['hồ Hoàn Kiếm', 'hồ Tây', 'hồ Ba Bể', 'hồ Núi Cốc'], ex: 'Hồ Gươm còn gọi là hồ Hoàn Kiếm.' },
  { w: 35, m: 'tv', lv: 1, t: 'Từ ngữ theo chủ đề', q: 'Việc nào thường làm trong kì nghỉ hè?', o: ['đi tắm biển', 'làm bài kiểm tra', 'trực nhật lớp', 'chào cờ đầu tuần'], ex: 'Nghỉ hè, nhiều bạn được đi tắm biển.' },

  // ── Câu đố ──
  { w: 2, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: cái gì dùng để kẻ cho thẳng hàng?', o: ['cái thước', 'cái bút', 'cục tẩy', 'quyển vở'], ex: 'Thước kẻ giúp kẻ thẳng.' },
  { w: 4, m: 'tv', lv: 2, t: 'Câu đố', q: 'Đố em: "Mình tròn thân trắng dáng thon, viết lên bảng đen mòn dần từng ngày." Là gì?', o: ['viên phấn', 'cây bút chì', 'cục tẩy', 'cái thước'], ex: 'Viên phấn viết lên bảng đen.' },
  { w: 8, m: 'tv', lv: 2, t: 'Câu đố', q: 'Đố em: "Ruột dài từ mũi đến chân, mũi mòn ruột cũng dần dần mòn theo." Là cái gì?', o: ['bút chì', 'thước kẻ', 'cục tẩy', 'cái kéo'], ex: 'Ruột bút chì là lõi chì, gọt mũi thì ruột mòn theo.' },
  { w: 10, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: cái gì có cánh, gặp gió thì quay tít?', o: ['chong chóng', 'con diều', 'con chim', 'cái ô'], ex: 'Chong chóng quay khi có gió.' },
  { w: 13, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: con gì đuôi ngắn tai dài, mắt hồng lông mượt, chạy nhanh?', o: ['con thỏ', 'con mèo', 'con chuột', 'con chó'], ex: 'Thỏ có tai dài, đuôi ngắn.' },
  { w: 16, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: con gì gáy ò ó o, gọi cả xóm thức dậy?', o: ['gà trống', 'con vịt', 'con chim', 'con mèo'], ex: 'Gà trống gáy vào buổi sáng.' },
  { w: 19, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: mùa nào hoa phượng đỏ rực, ve kêu râm ran?', o: ['mùa hè', 'mùa xuân', 'mùa thu', 'mùa đông'], ex: 'Mùa hè hoa phượng nở, ve kêu.' },
  { w: 21, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: mùa nào có Tết, cây cối đâm chồi nảy lộc?', o: ['mùa xuân', 'mùa hè', 'mùa thu', 'mùa đông'], ex: 'Tết đến vào mùa xuân.' },
  { w: 24, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: con gì có năm cánh như ngôi sao, sống dưới biển?', o: ['sao biển', 'cá heo', 'con cua', 'con mực'], ex: 'Sao biển có năm cánh.' },
  { w: 27, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: con vật nào có cổ dài nhất?', o: ['hươu cao cổ', 'con voi', 'con ngựa', 'lạc đà'], ex: 'Hươu cao cổ có cổ rất dài.' },
  { w: 29, m: 'tv', lv: 1, t: 'Câu đố', q: 'Đố em: vật gì giúp người ở xa nói chuyện được với nhau?', o: ['điện thoại', 'cái quạt', 'tủ lạnh', 'nồi cơm điện'], ex: 'Điện thoại giúp ta nói chuyện từ xa.' },
  { w: 34, m: 'tv', lv: 2, t: 'Câu đố', q: 'Đố em: cây gì mọc thành lũy quanh làng, thân có nhiều đốt?', o: ['cây tre', 'cây bàng', 'cây phượng', 'cây dừa'], ex: 'Lũy tre xanh bao quanh làng quê.' },

  // ── Thành ngữ, tục ngữ ──
  { w: 14, m: 'tv', lv: 2, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Công cha như núi …"', o: ['Thái Sơn', 'cao', 'xanh', 'đá'], ex: 'Công cha như núi Thái Sơn.' },
  { w: 15, m: 'tv', lv: 1, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Anh em như thể tay …"', o: ['chân', 'mắt', 'tai', 'đầu'], ex: 'Anh em như thể tay chân.' },
  { w: 16, m: 'tv', lv: 2, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Một con ngựa đau, cả tàu bỏ …"', o: ['cỏ', 'ăn', 'chạy', 'ngủ'], ex: 'Một con ngựa đau, cả tàu bỏ cỏ.' },
  { w: 18, m: 'tv', lv: 1, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Lá lành đùm lá …"', o: ['rách', 'xanh', 'vàng', 'to'], ex: 'Lá lành đùm lá rách.' },
  { w: 22, m: 'tv', lv: 1, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Ăn quả nhớ kẻ trồng …"', o: ['cây', 'hoa', 'lúa', 'rau'], ex: 'Ăn quả nhớ kẻ trồng cây.' },
  { w: 25, m: 'tv', lv: 1, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Uống nước nhớ …"', o: ['nguồn', 'sông', 'suối', 'mưa'], ex: 'Uống nước nhớ nguồn.' },
  { w: 28, m: 'tv', lv: 2, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Một cây làm chẳng nên non, ba cây chụm lại nên hòn núi …"', o: ['cao', 'xanh', 'to', 'đá'], ex: 'Ba cây chụm lại nên hòn núi cao.' },
  { w: 30, m: 'tv', lv: 2, t: 'Thành ngữ tục ngữ', q: 'Chọn từ điền vào chỗ trống: "Tốt gỗ hơn tốt nước …"', o: ['sơn', 'sông', 'màu', 'mưa'], ex: 'Tốt gỗ hơn tốt nước sơn.' },

  // ── Đặt câu hỏi ──
  { w: 20, m: 'tv', lv: 2, t: 'Câu hỏi Khi nào Ở đâu', q: 'Bộ phận nào trả lời câu hỏi "Khi nào?" trong câu "Mùa hè, hoa phượng nở đỏ rực."?', o: ['Mùa hè', 'hoa phượng', 'nở đỏ rực', 'đỏ rực'], ex: 'Hoa phượng nở khi nào? Mùa hè.' },
  { w: 23, m: 'tv', lv: 2, t: 'Câu hỏi Khi nào Ở đâu', q: 'Bộ phận nào trả lời câu hỏi "Ở đâu?" trong câu "Sao biển sống dưới đáy biển."?', o: ['dưới đáy biển', 'Sao biển', 'sống', 'sao biển sống'], ex: 'Sao biển sống ở đâu? Dưới đáy biển.' },
  { w: 25, m: 'tv', lv: 2, t: 'Câu hỏi Khi nào Ở đâu', q: 'Bộ phận nào trả lời câu hỏi "Vì sao?" trong câu "Cây héo vì thiếu nước."?', o: ['vì thiếu nước', 'Cây', 'héo', 'Cây héo'], ex: 'Vì sao cây héo? Vì thiếu nước.' },
  { w: 26, m: 'tv', lv: 2, t: 'Câu hỏi Khi nào Ở đâu', q: 'Bộ phận nào trả lời câu hỏi "Để làm gì?" trong câu "Em tưới cây để cây mau lớn."?', o: ['để cây mau lớn', 'Em', 'tưới cây', 'Em tưới cây'], ex: 'Em tưới cây để làm gì? Để cây mau lớn.' },
  { w: 27, m: 'tv', lv: 2, t: 'Câu hỏi Khi nào Ở đâu', q: 'Câu hỏi nào hợp với câu "Chúng em trồng cây vào mùa xuân."?', o: ['Chúng em trồng cây khi nào?', 'Chúng em trồng cây ở đâu?', 'Chúng em trồng cây để làm gì?', 'Vì sao chúng em trồng cây?'], ex: '"Vào mùa xuân" trả lời câu hỏi "Khi nào?".' },
  { w: 28, m: 'tv', lv: 2, t: 'Câu hỏi Khi nào Ở đâu', q: 'Câu hỏi nào hợp với câu "Bạn Nam nghỉ học vì bị ốm."?', o: ['Vì sao bạn Nam nghỉ học?', 'Bạn Nam nghỉ học khi nào?', 'Bạn Nam nghỉ học ở đâu?', 'Bạn Nam là ai?'], ex: '"Vì bị ốm" trả lời câu hỏi "Vì sao?".' },
  { w: 31, m: 'tv', lv: 3, t: 'Câu hỏi Khi nào Ở đâu', q: 'Bộ phận nào trả lời câu hỏi "Ở đâu?" trong câu "Ngoài đảo xa, các chú bộ đội canh gác."?', o: ['Ngoài đảo xa', 'các chú bộ đội', 'canh gác', 'chú bộ đội canh gác'], ex: 'Các chú canh gác ở đâu? Ngoài đảo xa.' },

  // ── Lời chào, lời cảm ơn (giao tiếp) ──
  { w: 1, m: 'tv', lv: 1, t: 'Giao tiếp', q: 'Gặp cô giáo ở cổng trường, em nói thế nào?', o: ['Em chào cô ạ!', 'Cô ơi, đứng lại!', 'Cô đi đâu đấy?', 'Ê, cô ơi!'], ex: 'Gặp thầy cô, em lễ phép chào.' },
  { w: 3, m: 'tv', lv: 1, t: 'Giao tiếp', q: 'Bạn cho em mượn bút, em nói gì?', o: ['Tớ cảm ơn bạn!', 'Tớ xin lỗi bạn!', 'Chào bạn!', 'Bạn ơi, đi chơi!'], ex: 'Được giúp đỡ thì nói lời cảm ơn.' },
  { w: 6, m: 'tv', lv: 1, t: 'Giao tiếp', q: 'Lỡ làm rơi đồ dùng của bạn, em nói gì?', o: ['Tớ xin lỗi bạn!', 'Tớ cảm ơn bạn!', 'Kệ bạn!', 'Bạn tự nhặt đi!'], ex: 'Làm phiền người khác thì nói lời xin lỗi.' },
  { w: 12, m: 'tv', lv: 1, t: 'Giao tiếp', q: 'Muốn mượn sách của bạn, em nói thế nào?', o: ['Bạn cho tớ mượn sách với!', 'Đưa sách đây!', 'Sách này của tớ!', 'Tớ lấy sách đấy!'], ex: 'Hỏi mượn lịch sự: "Bạn cho tớ mượn… với!".' },
  { w: 15, m: 'tv', lv: 1, t: 'Giao tiếp', q: 'Được bà tặng quà sinh nhật, em nói gì?', o: ['Cháu cảm ơn bà ạ!', 'Cháu xin lỗi bà ạ!', 'Quà gì thế?', 'Bà đưa đây!'], ex: 'Nhận quà thì cảm ơn người tặng.' },
  { w: 28, m: 'tv', lv: 2, t: 'Giao tiếp', q: 'Gọi điện thoại cho bạn, câu đầu tiên em nói thế nào?', o: ['A lô, tớ là Minh đây!', 'Tạm biệt cậu!', 'Cậu ở đâu thế?', 'Thôi, tớ cúp máy đây!'], ex: 'Gọi điện, trước hết chào và xưng tên mình.' },
  { w: 29, m: 'tv', lv: 1, t: 'Giao tiếp', q: 'Chia tay bạn ra về, em nói gì?', o: ['Tạm biệt bạn, hẹn gặp lại!', 'Chào buổi sáng!', 'Tớ xin lỗi bạn!', 'Bạn ăn cơm chưa?'], ex: 'Lúc chia tay, em nói lời tạm biệt.' },

  // ── Đọc hiểu ──
  { w: 2, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Sáng nào Hà cũng dậy sớm, tập thể dục rồi ăn sáng." Hà làm gì sau khi tập thể dục?', o: ['ăn sáng', 'dậy sớm', 'đi ngủ', 'đánh răng'], ex: 'Hà tập thể dục rồi ăn sáng.' },
  { w: 5, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Trống trường kêu tùng tùng, các bạn ùa vào lớp." Tiếng trống kêu thế nào?', o: ['tùng tùng', 'tích tắc', 'reng reng', 'bim bim'], ex: 'Trống kêu tùng tùng.' },
  { w: 9, m: 'tv', lv: 2, t: 'Đọc hiểu', q: '"Nam có ba quyển truyện: một quyển truyện cổ tích và hai quyển truyện tranh." Nam có mấy quyển truyện tranh?', o: ['2 quyển', '1 quyển', '3 quyển', '5 quyển'], ex: 'Nam có hai quyển truyện tranh.' },
  { w: 11, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Bi có một chiếc chong chóng màu xanh. Bé chạy thật nhanh cho chong chóng quay." Chong chóng của Bi màu gì?', o: ['màu xanh', 'màu đỏ', 'màu vàng', 'màu tím'], ex: 'Chong chóng của Bi màu xanh.' },
  { w: 13, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Nhím nâu nhút nhát, lúc đầu chỉ dám nấp sau gốc cây." Nhím nâu có tính gì?', o: ['nhút nhát', 'dũng cảm', 'tham ăn', 'lười biếng'], ex: 'Câu văn nói nhím nâu nhút nhát.' },
  { w: 16, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Bà nội em năm nay bảy mươi tuổi, tóc bà đã bạc trắng." Tóc bà màu gì?', o: ['bạc trắng', 'đen nhánh', 'vàng óng', 'nâu đỏ'], ex: 'Tóc bà đã bạc trắng.' },
  { w: 19, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Bốn nàng tiên Xuân, Hạ, Thu, Đông, mỗi nàng một vẻ." Có mấy nàng tiên?', o: ['4 nàng', '3 nàng', '2 nàng', '5 nàng'], ex: 'Xuân, Hạ, Thu, Đông: bốn nàng tiên.' },
  { w: 22, m: 'tv', lv: 2, t: 'Đọc hiểu', q: '"Hạt thóc nằm ngủ dưới đất. Mưa xuống, hạt thóc nảy mầm." Khi nào hạt thóc nảy mầm?', o: ['khi mưa xuống', 'khi trời nắng', 'khi có gió', 'khi trời tối'], ex: 'Mưa xuống, hạt thóc nảy mầm.' },
  { w: 24, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Khủng long có thân hình to lớn, chân khỏe, đuôi dài." Đuôi khủng long thế nào?', o: ['dài', 'ngắn', 'cụt', 'xoăn'], ex: 'Câu văn nói đuôi khủng long dài.' },
  { w: 27, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Thỏ con bị lạc bên bờ sông. Hà mã cõng thỏ qua sông về nhà." Ai giúp thỏ con?', o: ['hà mã', 'cá sấu', 'voi', 'khỉ'], ex: 'Hà mã cõng thỏ con về nhà.' },
  { w: 30, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Trên đảo, các chú bộ đội trồng rau và nuôi gà." Các chú trồng gì?', o: ['rau', 'lúa', 'hoa', 'ngô'], ex: 'Các chú trồng rau và nuôi gà.' },
  { w: 33, m: 'tv', lv: 1, t: 'Đọc hiểu', q: '"Cánh đồng quê em lúa chín vàng, đàn cò trắng bay rập rờn." Đàn cò màu gì?', o: ['trắng', 'vàng', 'đen', 'xám'], ex: 'Câu văn nói cò trắng.' },

  // ── Viết hoa ──
  { w: 8, m: 'tv', lv: 1, t: 'Viết hoa', q: 'Tên bạn nào viết đúng?', o: ['Nguyễn Minh Anh', 'trần thu hà', 'Lê văn Nam', 'phạm Bảo ngọc'], ex: 'Tên người viết hoa chữ cái đầu mỗi tiếng.' },
  { w: 9, m: 'tv', lv: 1, t: 'Viết hoa', q: 'Chữ cái đầu câu phải viết thế nào?', o: ['viết hoa', 'viết thường', 'viết nghiêng', 'viết thật nhỏ'], ex: 'Chữ đầu câu phải viết hoa.' },
  { w: 10, m: 'tv', lv: 1, t: 'Viết hoa', q: 'Tên thành phố nào viết đúng?', o: ['Hà Nội', 'hải phòng', 'Đà nẵng', 'cần Thơ'], ex: 'Tên riêng viết hoa chữ cái đầu mỗi tiếng.' },
  { w: 31, m: 'tv', lv: 2, t: 'Viết hoa', q: 'Tên riêng nào viết đúng?', o: ['Trường Sa', 'hoàng sa', 'Phú quốc', 'côn Đảo'], ex: 'Tên riêng viết hoa chữ cái đầu mỗi tiếng.' },
  { w: 32, m: 'tv', lv: 2, t: 'Viết hoa', q: 'Tên tỉnh nào viết đúng?', o: ['Lào Cai', 'tuyên quang', 'Cao bằng', 'sơn La'], ex: 'Tên riêng viết hoa chữ cái đầu mỗi tiếng.' },

  // ── Xếp câu (order) ──
  { w: 1, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Em', 'là', 'học sinh', 'lớp 2.'] },
  { w: 3, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bé', 'giúp mẹ', 'quét nhà', 'sạch sẽ.'] },
  { w: 4, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Các bạn', 'chơi', 'nhảy dây', 'ở sân trường.'] },
  { w: 5, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Tiếng trống', 'trường', 'vang lên', 'tùng tùng.'] },
  { w: 6, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Cô giáo', 'dạy', 'chúng em', 'tập viết.'] },
  { w: 7, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Thư viện', 'trường em', 'có rất nhiều', 'sách hay.'] },
  { w: 9, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Chú bọ rùa', 'đi lạc', 'trong', 'vườn hoa.'] },
  { w: 10, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Ông', 'dạy em', 'thả diều', 'trên đê.'] },
  { w: 11, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Chiếc chong chóng', 'quay', 'tít', 'trong gió.'] },
  { w: 12, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Hai bạn', 'viết thư', 'hỏi thăm', 'nhau.'] },
  { w: 14, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Chị', 'nhường', 'đồ chơi', 'cho em.'] },
  { w: 15, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bố', 'đọc truyện', 'cho', 'em nghe.'] },
  { w: 16, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bà', 'kể chuyện', 'cổ tích', 'rất hay.'] },
  { w: 17, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Chú gà tơ', 'tập gáy', 'mỗi', 'buổi sáng.'] },
  { w: 19, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Mùa xuân,', 'cây cối', 'đâm chồi', 'nảy lộc.'] },
  { w: 20, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Họa mi', 'hót', 'vang', 'khắp vườn.'] },
  { w: 22, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Cánh đồng', 'lúa chín', 'vàng', 'óng ả.'] },
  { w: 23, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Khủng long', 'sống', 'cách đây', 'rất lâu.'] },
  { w: 24, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Những con sao biển', 'nằm', 'trên', 'bãi cát.'] },
  { w: 26, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Chúng em', 'trồng cây', 'để bảo vệ', 'môi trường.'] },
  { w: 28, m: 'tv', k: 'order', lv: 3, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bạn bè', 'ở xa', 'vẫn có thể', 'gọi điện cho nhau.'] },
  { w: 30, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Bác Hồ', 'rất yêu', 'các cháu', 'thiếu nhi.'] },
  { w: 32, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Hồ Gươm', 'nằm', 'giữa', 'thủ đô Hà Nội.'] },
  { w: 34, m: 'tv', k: 'order', lv: 2, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Quê hương', 'em', 'có', 'cánh đồng xanh.'] },
  { w: 35, m: 'tv', k: 'order', lv: 1, t: 'Xếp câu', q: 'Xếp thành câu đúng', o: ['Chúng em', 'chuẩn bị', 'nghỉ', 'hè.'] },

  // ── Xếp sự việc (order) ──
  { w: 2, m: 'tv', k: 'order', lv: 1, t: 'Xếp sự việc', q: 'Xếp các việc buổi sáng theo thứ tự hợp lý', o: ['Thức dậy', 'Đánh răng', 'Ăn sáng', 'Đi học'] },
  { w: 8, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp các việc theo thứ tự khi làm bài tập', o: ['Đọc kĩ đề bài', 'Nghĩ cách làm', 'Làm bài', 'Soát lại bài'] },
  { w: 18, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp các việc theo thứ tự khi trồng cây', o: ['Đào hố', 'Đặt cây xuống', 'Lấp đất', 'Tưới nước'] },
  { w: 21, m: 'tv', k: 'order', lv: 1, t: 'Xếp sự việc', q: 'Xếp bốn mùa theo thứ tự trong năm, bắt đầu từ mùa xuân', o: ['mùa xuân', 'mùa hạ', 'mùa thu', 'mùa đông'] },
  { w: 22, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp theo thứ tự lớn lên của cây lúa', o: ['Hạt thóc', 'Nảy mầm', 'Cây mạ', 'Bông lúa chín'] },
  { w: 25, m: 'tv', k: 'order', lv: 2, t: 'Xếp sự việc', q: 'Xếp theo thứ tự lớn lên của con gà', o: ['Quả trứng', 'Gà con nở ra', 'Gà con lớn dần', 'Gà trưởng thành'] },
  { w: 29, m: 'tv', k: 'order', lv: 3, t: 'Xếp sự việc', q: 'Xếp các việc theo thứ tự khi gửi thư', o: ['Viết thư', 'Cho thư vào phong bì', 'Dán kín phong bì', 'Bỏ thư vào hòm thư'] },

  // ══════════════════════════════ TOÁN ══════════════════════════════

  // ── Số và tia số ──
  { w: 1, m: 'toan', lv: 1, t: 'Số và cấu tạo số', q: 'Số liền sau của 79 là số nào?', o: ['80', '78', '70', '89'], ex: '79 thêm 1 là 80.' },
  { w: 1, m: 'toan', lv: 1, t: 'Số và cấu tạo số', q: 'Số gồm 6 chục và 4 đơn vị là số nào?', o: ['64', '46', '604', '10'], ex: '6 chục 4 đơn vị viết là 64.' },
  { w: 1, m: 'toan', lv: 2, t: 'Số và cấu tạo số', q: 'Số tròn chục lớn nhất có hai chữ số là số nào?', o: ['90', '99', '100', '80'], ex: 'Số tròn chục có chữ số đơn vị là 0; lớn nhất là 90.' },
  { w: 2, m: 'toan', lv: 3, t: 'Số và cấu tạo số', q: 'Số lớn nhất có hai chữ số khác nhau là số nào?', o: ['98', '99', '89', '90'], ex: '99 có hai chữ số giống nhau; lớn nhất mà khác nhau là 98.' },
  { w: 2, m: 'toan', lv: 1, t: 'Số và cấu tạo số', q: 'Số liền trước của 100 là số nào?', o: ['99', '101', '90', '98'], ex: '100 bớt 1 là 99.' },
  { w: 2, m: 'toan', lv: 1, t: 'Số và cấu tạo số', q: 'Số 57 viết thành tổng các chục và đơn vị là gì?', o: ['50 + 7', '5 + 7', '57 + 0', '70 + 5'], ex: '57 gồm 5 chục và 7 đơn vị: 57 = 50 + 7.' },

  // ── Đề-xi-mét ──
  { w: 26, m: 'toan', lv: 1, t: 'Đề-xi-mét', q: '1 dm bằng bao nhiêu xăng-ti-mét?', o: ['10 cm', '100 cm', '1 cm', '20 cm'], ex: '1 dm = 10 cm.' },
  { w: 26, m: 'toan', lv: 1, t: 'Đề-xi-mét', q: 'Chiếc bút chì của em dài khoảng bao nhiêu?', o: ['15 cm', '15 dm', '15 m', '15 km'], ex: 'Bút chì dài khoảng 15 cm, ngắn hơn gang tay một chút.' },
  { w: 26, m: 'toan', lv: 1, t: 'Đề-xi-mét', q: '3 dm + 5 dm = ?', o: ['8 dm', '8 cm', '35 dm', '2 dm'], ex: '3 + 5 = 8, nhớ viết đơn vị dm.' },
  { w: 26, m: 'toan', lv: 2, t: 'Đề-xi-mét', q: 'Thanh gỗ dài 2 dm, sợi dây dài 15 cm. Vật nào dài hơn?', o: ['Thanh gỗ dài hơn', 'Sợi dây dài hơn', 'Hai vật dài bằng nhau', 'Chưa so sánh được'], ex: '2 dm = 20 cm, mà 20 cm > 15 cm.' },

  // ── Thành phần phép tính ──
  { w: 2, m: 'toan', lv: 1, t: 'Tên thành phần phép tính', q: 'Trong phép tính 35 + 12 = 47, số 47 gọi là gì?', o: ['tổng', 'số hạng', 'hiệu', 'số trừ'], ex: 'Số hạng + số hạng = tổng.' },
  { w: 3, m: 'toan', lv: 1, t: 'Tên thành phần phép tính', q: 'Trong phép tính 68 − 25 = 43, số 25 gọi là gì?', o: ['số trừ', 'số bị trừ', 'hiệu', 'số hạng'], ex: 'Số bị trừ − số trừ = hiệu.' },
  { w: 3, m: 'toan', lv: 1, t: 'Tên thành phần phép tính', q: 'Hai số hạng là 40 và 25. Tổng của chúng là bao nhiêu?', o: ['65', '15', '45', '56'], ex: '40 + 25 = 65.' },
  { w: 3, m: 'toan', lv: 1, t: 'Tên thành phần phép tính', q: 'Số bị trừ là 90, số trừ là 30. Hiệu là bao nhiêu?', o: ['60', '120', '70', '30'], ex: '90 − 30 = 60.' },

  // ── Nhiều hơn, ít hơn ──
  { w: 7, m: 'toan', lv: 1, t: 'Nhiều hơn, ít hơn', q: 'Lan có 12 cái kẹo, Hà có nhiều hơn Lan 5 cái. Hà có bao nhiêu cái kẹo?', o: ['17 cái', '7 cái', '15 cái', '12 cái'], ex: 'Nhiều hơn thì cộng: 12 + 5 = 17.' },
  { w: 7, m: 'toan', lv: 2, t: 'Nhiều hơn, ít hơn', q: 'Tổ Một trồng 18 cây, tổ Hai trồng ít hơn tổ Một 6 cây. Tổ Hai trồng bao nhiêu cây?', o: ['12 cây', '24 cây', '14 cây', '6 cây'], ex: 'Ít hơn thì trừ: 18 − 6 = 12.' },
  { w: 4, m: 'toan', lv: 1, t: 'Nhiều hơn, ít hơn', q: 'Anh 10 tuổi, em 6 tuổi. Anh hơn em mấy tuổi?', o: ['4 tuổi', '16 tuổi', '6 tuổi', '3 tuổi'], ex: '10 − 6 = 4.' },

  // ── Cộng, trừ trong phạm vi 20 ──
  { w: 4, m: 'toan', lv: 1, t: 'Cộng trừ qua 10', q: 'Tính 9 + 6 bằng cách tách 6 = 1 + 5: 9 + 1 + 5 = ?', o: ['15', '16', '14', '10'], ex: '9 + 1 = 10, 10 + 5 = 15.' },
  { w: 5, m: 'toan', lv: 1, t: 'Cộng trừ qua 10', q: 'Trong giỏ có 8 quả cam, mẹ bỏ thêm 7 quả. Giỏ có bao nhiêu quả cam?', o: ['15 quả', '14 quả', '1 quả', '16 quả'], ex: '8 + 7 = 15.' },
  { w: 6, m: 'toan', lv: 1, t: 'Cộng trừ qua 10', q: 'Có 13 con chim đậu trên cành, 5 con bay đi. Còn lại mấy con?', o: ['8 con', '18 con', '7 con', '9 con'], ex: '13 − 5 = 8.' },
  { w: 6, m: 'toan', lv: 1, t: 'Cộng trừ qua 10', q: 'Số nào điền vào chỗ trống: 7 + … = 12?', o: ['5', '19', '6', '4'], ex: '12 − 7 = 5.' },
  { w: 7, m: 'toan', lv: 2, t: 'Cộng trừ qua 10', q: 'Số nào điền vào chỗ trống: … − 8 = 9?', o: ['17', '1', '16', '18'], ex: 'Số bị trừ = hiệu + số trừ: 9 + 8 = 17.' },
  { w: 7, m: 'toan', lv: 1, t: 'Cộng trừ qua 10', q: 'Mai có 15 bông hoa, Mai tặng bạn 7 bông. Mai còn bao nhiêu bông hoa?', o: ['8 bông', '22 bông', '9 bông', '7 bông'], ex: '15 − 7 = 8.' },
  { w: 8, m: 'toan', lv: 2, t: 'Cộng trừ qua 10', q: 'Phép tính nào có kết quả bằng 11?', o: ['6 + 5', '6 + 6', '17 − 5', '4 + 8'], ex: '6 + 5 = 11; các phép kia đều bằng 12.' },

  // ── Ki-lô-gam, lít ──
  { w: 9, m: 'toan', lv: 1, t: 'Ki-lô-gam', q: 'Quả dưa hấu nặng 3 kg, quả bí nặng 5 kg. Cả hai quả nặng bao nhiêu?', o: ['8 kg', '2 kg', '35 kg', '15 kg'], ex: '3 + 5 = 8 (kg).' },
  { w: 9, m: 'toan', lv: 1, t: 'Ki-lô-gam', q: 'Bao gạo nặng 25 kg, mẹ lấy ra 10 kg. Bao gạo còn lại bao nhiêu ki-lô-gam?', o: ['15 kg', '35 kg', '10 kg', '5 kg'], ex: '25 − 10 = 15 (kg).' },
  { w: 9, m: 'toan', lv: 1, t: 'Ki-lô-gam', q: 'Vật nào nặng khoảng 1 kg?', o: ['một túi đường', 'một chiếc lá', 'một cái tủ', 'một con voi'], ex: 'Túi đường ở chợ thường nặng 1 kg.' },
  { w: 10, m: 'toan', lv: 1, t: 'Lít', q: 'Can to đựng 10 l nước, can bé đựng 5 l. Cả hai can đựng bao nhiêu lít?', o: ['15 l', '5 l', '50 l', '105 l'], ex: '10 + 5 = 15 (l).' },
  { w: 10, m: 'toan', lv: 1, t: 'Lít', q: 'Vật nào đựng được khoảng 1 l nước?', o: ['một chai dầu ăn', 'một cái chén', 'một cái thùng phuy', 'một bể bơi'], ex: 'Chai dầu ăn ở cửa hàng thường đựng 1 l.' },
  { w: 10, m: 'toan', lv: 2, t: 'Lít', q: 'Bình có 12 l nước, rót ra 4 l rồi đổ thêm 3 l. Bình có bao nhiêu lít?', o: ['11 l', '19 l', '5 l', '13 l'], ex: '12 − 4 = 8; 8 + 3 = 11 (l).' },

  // ── Cộng, trừ có nhớ trong phạm vi 100 ──
  { w: 11, m: 'toan', lv: 1, t: 'Cộng trừ có nhớ', q: '38 + 25 = ?', o: ['63', '53', '513', '73'], ex: '8 + 5 = 13, viết 3 nhớ 1; 3 + 2 + 1 = 6. Kết quả 63.' },
  { w: 12, m: 'toan', lv: 1, t: 'Cộng trừ có nhớ', q: 'Lớp 2A có 36 bạn, lớp 2B có 38 bạn. Hai lớp có bao nhiêu bạn?', o: ['74 bạn', '64 bạn', '2 bạn', '84 bạn'], ex: '36 + 38 = 74 (nhớ 1 sang hàng chục).' },
  { w: 13, m: 'toan', lv: 2, t: 'Cộng trừ có nhớ', q: '72 − 37 = ?', o: ['35', '45', '25', '109'], ex: '12 − 7 = 5, viết 5 nhớ 1; 3 + 1 = 4, 7 − 4 = 3. Kết quả 35.' },
  { w: 13, m: 'toan', lv: 2, t: 'Cộng trừ có nhớ', q: 'Cửa hàng có 60 quả trứng, đã bán 24 quả. Còn lại bao nhiêu quả?', o: ['36 quả', '44 quả', '84 quả', '46 quả'], ex: '60 − 24 = 36.' },
  { w: 14, m: 'toan', lv: 2, t: 'Cộng trừ có nhớ', q: 'Số nào điền vào chỗ trống: 45 + … = 72?', o: ['27', '37', '117', '23'], ex: '72 − 45 = 27.' },
  { w: 14, m: 'toan', lv: 2, t: 'Cộng trừ có nhớ', q: 'Thùng có 100 l nước, đã dùng 35 l. Thùng còn bao nhiêu lít?', o: ['65 l', '75 l', '135 l', '35 l'], ex: '100 − 35 = 65 (l).' },
  { w: 15, m: 'toan', lv: 2, t: 'Cộng trừ có nhớ', q: 'Sợi dây đỏ dài 48 cm, sợi dây xanh dài hơn sợi dây đỏ 15 cm. Sợi dây xanh dài bao nhiêu?', o: ['63 cm', '33 cm', '53 cm', '73 cm'], ex: 'Dài hơn thì cộng: 48 + 15 = 63 (cm).' },
  { w: 15, m: 'toan', lv: 2, t: 'Cộng trừ có nhớ', q: 'Tổng hai số là 50, một số là 18. Số kia là bao nhiêu?', o: ['32', '68', '42', '22'], ex: 'Lấy tổng trừ số đã biết: 50 − 18 = 32.' },

  // ── Hình học ──
  { w: 15, m: 'toan', lv: 1, t: 'Hình phẳng', q: 'Hình tứ giác có mấy cạnh?', o: ['4 cạnh', '3 cạnh', '5 cạnh', '6 cạnh'], ex: 'Tứ giác có 4 cạnh, 4 đỉnh.' },
  { w: 15, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Đường gấp khúc gồm ba đoạn dài 3 cm, 4 cm, 5 cm. Đường gấp khúc dài bao nhiêu?', o: ['12 cm', '7 cm', '9 cm', '345 cm'], ex: '3 + 4 + 5 = 12 (cm).' },
  { w: 16, m: 'toan', lv: 1, t: 'Hình phẳng', q: 'Hình nào có ba cạnh, ba đỉnh?', o: ['hình tam giác', 'hình tứ giác', 'hình tròn', 'hình vuông'], ex: 'Hình tam giác có 3 cạnh, 3 đỉnh.' },
  { w: 16, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Ba điểm thẳng hàng là ba điểm thế nào?', o: ['cùng nằm trên một đường thẳng', 'tạo thành hình tam giác', 'cách đều nhau', 'nằm trên hình tròn'], ex: 'Ba điểm thẳng hàng cùng nằm trên một đường thẳng.' },
  { w: 34, m: 'toan', lv: 2, t: 'Hình phẳng', q: 'Hình vuông có 4 cạnh, mỗi cạnh dài 5 cm. Tổng độ dài các cạnh là bao nhiêu?', o: ['20 cm', '9 cm', '10 cm', '25 cm'], ex: '5 + 5 + 5 + 5 = 20 (cm), hay 5 × 4 = 20.' },

  // ── Ngày, giờ ──
  { w: 16, m: 'toan', lv: 1, t: 'Ngày giờ', q: 'Một ngày có bao nhiêu giờ?', o: ['24 giờ', '12 giờ', '60 giờ', '7 giờ'], ex: 'Một ngày có 24 giờ.' },
  { w: 16, m: 'toan', lv: 1, t: 'Ngày giờ', q: '1 giờ bằng bao nhiêu phút?', o: ['60 phút', '100 phút', '24 phút', '30 phút'], ex: '1 giờ = 60 phút.' },
  { w: 17, m: 'toan', lv: 1, t: 'Ngày giờ', q: 'Kim ngắn chỉ số 3, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?', o: ['3 giờ', '12 giờ 15 phút', '12 giờ 3 phút', '3 giờ 12 phút'], ex: 'Kim dài chỉ 12 là giờ đúng; kim ngắn chỉ 3: 3 giờ.' },
  { w: 17, m: 'toan', lv: 2, t: 'Ngày giờ', q: 'Kim ngắn ở giữa số 7 và số 8, kim dài chỉ số 6. Đồng hồ chỉ mấy giờ?', o: ['7 giờ 30 phút', '8 giờ 30 phút', '6 giờ 7 phút', '7 giờ 6 phút'], ex: 'Kim dài chỉ 6 là 30 phút; kim ngắn đã qua 7: 7 giờ 30 phút.' },
  { w: 17, m: 'toan', lv: 2, t: 'Ngày giờ', q: '20 giờ còn gọi là mấy giờ tối?', o: ['8 giờ tối', '10 giờ tối', '2 giờ tối', '6 giờ tối'], ex: '20 − 12 = 8: 20 giờ là 8 giờ tối.' },
  { w: 17, m: 'toan', lv: 2, t: 'Ngày giờ', q: 'Em vào học lúc 7 giờ sáng, học 4 giờ thì tan. Em tan học lúc mấy giờ?', o: ['11 giờ', '3 giờ', '10 giờ', '12 giờ'], ex: '7 + 4 = 11: tan học lúc 11 giờ.' },

  // ── Xem lịch ──
  { w: 17, m: 'toan', lv: 1, t: 'Xem lịch', q: 'Tháng 12 có bao nhiêu ngày?', o: ['31 ngày', '30 ngày', '28 ngày', '29 ngày'], ex: 'Tháng 12 có 31 ngày.' },
  { w: 17, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Thứ Hai tuần này là ngày 7. Thứ Hai tuần sau là ngày mấy?', o: ['ngày 14', 'ngày 8', 'ngày 13', 'ngày 15'], ex: 'Một tuần có 7 ngày: 7 + 7 = 14.' },
  { w: 18, m: 'toan', lv: 1, t: 'Xem lịch', q: 'Hôm nay là thứ Năm. Ngày mai là thứ mấy?', o: ['thứ Sáu', 'thứ Tư', 'thứ Bảy', 'Chủ nhật'], ex: 'Sau thứ Năm là thứ Sáu.' },
  { w: 18, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Ngày 2 tháng 9 là thứ Hai. Ngày 5 tháng 9 là thứ mấy?', o: ['thứ Năm', 'thứ Tư', 'thứ Sáu', 'thứ Ba'], ex: 'Ngày 3 thứ Ba, ngày 4 thứ Tư, ngày 5 thứ Năm.' },
  { w: 34, m: 'toan', lv: 2, t: 'Xem lịch', q: 'Hôm qua là thứ Ba. Ngày mai là thứ mấy?', o: ['thứ Năm', 'thứ Tư', 'thứ Sáu', 'thứ Hai'], ex: 'Hôm qua thứ Ba nên hôm nay thứ Tư, ngày mai thứ Năm.' },

  // ── Phép nhân ──
  { w: 19, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Phép cộng 4 + 4 + 4 viết thành phép nhân nào?', o: ['4 × 3', '3 × 3', '4 × 4', '4 + 3'], ex: '4 được lấy 3 lần: 4 × 3.' },
  { w: 19, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Trong phép nhân 5 × 2 = 10, số 10 gọi là gì?', o: ['tích', 'thừa số', 'tổng', 'thương'], ex: 'Thừa số × thừa số = tích.' },
  { w: 20, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Mỗi con gà có 2 chân. 6 con gà có bao nhiêu chân?', o: ['12 chân', '8 chân', '6 chân', '10 chân'], ex: '2 × 6 = 12.' },
  { w: 20, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Mỗi bàn tay có 5 ngón. 4 bàn tay có bao nhiêu ngón?', o: ['20 ngón', '9 ngón', '15 ngón', '25 ngón'], ex: '5 × 4 = 20.' },
  { w: 20, m: 'toan', lv: 2, t: 'Phép nhân', q: 'Phép nhân nào có tích bằng 30?', o: ['5 × 6', '5 × 5', '2 × 9', '5 × 7'], ex: '5 × 6 = 30.' },
  { w: 21, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Mỗi hộp có 5 cái bánh. 7 hộp như thế có bao nhiêu cái bánh?', o: ['35 cái', '12 cái', '30 cái', '40 cái'], ex: '5 × 7 = 35.' },
  { w: 21, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Mỗi đôi đũa có 2 chiếc. 9 đôi đũa có bao nhiêu chiếc?', o: ['18 chiếc', '11 chiếc', '16 chiếc', '20 chiếc'], ex: '2 × 9 = 18.' },
  { w: 34, m: 'toan', lv: 1, t: 'Phép nhân', q: 'Mỗi túi có 5 kg gạo. 4 túi như thế có bao nhiêu ki-lô-gam gạo?', o: ['20 kg', '9 kg', '1 kg', '25 kg'], ex: '5 × 4 = 20 (kg).' },

  // ── Phép chia ──
  { w: 21, m: 'toan', lv: 1, t: 'Phép chia', q: 'Chia đều 10 cái kẹo cho 2 bạn. Mỗi bạn được mấy cái?', o: ['5 cái', '8 cái', '12 cái', '20 cái'], ex: '10 : 2 = 5.' },
  { w: 22, m: 'toan', lv: 1, t: 'Phép chia', q: 'Có 20 bạn xếp đều thành 5 hàng. Mỗi hàng có mấy bạn?', o: ['4 bạn', '15 bạn', '25 bạn', '5 bạn'], ex: '20 : 5 = 4.' },
  { w: 22, m: 'toan', lv: 2, t: 'Phép chia', q: 'Có 16 bánh xe, mỗi xe đạp cần 2 bánh. Lắp được bao nhiêu xe đạp?', o: ['8 xe', '14 xe', '18 xe', '32 xe'], ex: '16 : 2 = 8.' },
  { w: 22, m: 'toan', lv: 1, t: 'Phép chia', q: 'Trong phép chia 15 : 5 = 3, số 5 gọi là gì?', o: ['số chia', 'số bị chia', 'thương', 'tích'], ex: 'Số bị chia : số chia = thương.' },
  { w: 22, m: 'toan', lv: 2, t: 'Phép chia', q: 'Số nào điền vào chỗ trống: … : 5 = 9?', o: ['45', '14', '4', '40'], ex: 'Số bị chia = thương × số chia: 9 × 5 = 45.' },
  { w: 35, m: 'toan', lv: 1, t: 'Phép chia', q: 'Có 40 l nước rót đều vào 5 can. Mỗi can có mấy lít?', o: ['8 l', '35 l', '45 l', '9 l'], ex: '40 : 5 = 8 (l).' },

  // ── Khối trụ, khối cầu ──
  { w: 23, m: 'toan', lv: 1, t: 'Khối trụ, khối cầu', q: 'Quả bóng đá có dạng khối gì?', o: ['khối cầu', 'khối trụ', 'khối lập phương', 'khối hộp chữ nhật'], ex: 'Quả bóng tròn đều mọi phía: khối cầu.' },
  { w: 23, m: 'toan', lv: 1, t: 'Khối trụ, khối cầu', q: 'Lon nước ngọt có dạng khối gì?', o: ['khối trụ', 'khối cầu', 'khối lập phương', 'khối hộp chữ nhật'], ex: 'Lon nước có hai đáy tròn: khối trụ.' },
  { w: 23, m: 'toan', lv: 2, t: 'Khối trụ, khối cầu', q: 'Đồ vật nào có dạng khối cầu?', o: ['quả địa cầu', 'hộp bút', 'lon sữa', 'viên gạch'], ex: 'Quả địa cầu có dạng khối cầu.' },

  // ── Số trong phạm vi 1000 ──
  { w: 24, m: 'toan', lv: 1, t: 'Số đến 1000', q: '1 nghìn bằng bao nhiêu trăm?', o: ['10 trăm', '100 trăm', '1 trăm', '1000 trăm'], ex: '10 trăm = 1 nghìn.' },
  { w: 24, m: 'toan', lv: 2, t: 'Số đến 1000', q: 'Số gồm 3 trăm, 0 chục và 5 đơn vị là số nào?', o: ['305', '35', '350', '503'], ex: '3 trăm 0 chục 5 đơn vị viết là 305.' },
  { w: 25, m: 'toan', lv: 1, t: 'Số đến 1000', q: 'Số nào lớn nhất?', o: ['970', '907', '790', '709'], ex: 'So hàng trăm trước: 9 > 7; rồi hàng chục: 7 > 0. Vậy 970 lớn nhất.' },
  { w: 25, m: 'toan', lv: 1, t: 'Số đến 1000', q: 'Số liền sau của 399 là số nào?', o: ['400', '398', '3910', '390'], ex: '399 + 1 = 400.' },
  { w: 26, m: 'toan', lv: 2, t: 'Số đến 1000', q: 'Số 482 viết thành tổng các trăm, chục, đơn vị là gì?', o: ['400 + 80 + 2', '4 + 8 + 2', '400 + 8 + 2', '40 + 80 + 2'], ex: '482 = 4 trăm 8 chục 2 đơn vị = 400 + 80 + 2.' },
  { w: 26, m: 'toan', lv: 2, t: 'Số đến 1000', q: 'Số tròn trăm nào ở giữa 590 và 610?', o: ['600', '500', '700', '595'], ex: '590 < 600 < 610.' },
  { w: 26, m: 'toan', lv: 1, t: 'Số đến 1000', q: 'Số lớn nhất có ba chữ số là số nào?', o: ['999', '900', '100', '989'], ex: 'Mỗi hàng là 9: 999.' },
  { w: 26, m: 'toan', lv: 3, t: 'Số đến 1000', q: 'Số bé nhất có ba chữ số khác nhau là số nào?', o: ['102', '100', '123', '111'], ex: 'Hàng trăm bé nhất là 1, hàng chục 0, hàng đơn vị 2: 102.' },
  { w: 33, m: 'toan', lv: 2, t: 'Số đến 1000', q: 'Tổng của số lớn nhất có hai chữ số và 1 là bao nhiêu?', o: ['100', '91', '98', '101'], ex: 'Số lớn nhất có hai chữ số là 99; 99 + 1 = 100.' },

  // ── Mét, ki-lô-mét ──
  { w: 27, m: 'toan', lv: 1, t: 'Mét, ki-lô-mét', q: '1 m bằng bao nhiêu xăng-ti-mét?', o: ['100 cm', '10 cm', '1000 cm', '60 cm'], ex: '1 m = 100 cm.' },
  { w: 27, m: 'toan', lv: 1, t: 'Mét, ki-lô-mét', q: '1 km bằng bao nhiêu mét?', o: ['1000 m', '100 m', '10 m', '60 m'], ex: '1 km = 1000 m.' },
  { w: 27, m: 'toan', lv: 2, t: 'Mét, ki-lô-mét', q: 'Quãng đường từ Hà Nội đến Hải Phòng dài khoảng bao nhiêu?', o: ['100 km', '100 m', '100 dm', '100 cm'], ex: 'Đường giữa hai thành phố tính bằng ki-lô-mét.' },
  { w: 27, m: 'toan', lv: 1, t: 'Mét, ki-lô-mét', q: 'Phòng học của em dài khoảng bao nhiêu?', o: ['8 m', '8 cm', '8 km', '8 dm'], ex: 'Phòng học dài khoảng 8 m.' },
  { w: 33, m: 'toan', lv: 2, t: 'Mét, ki-lô-mét', q: 'Mảnh vải dài 1 m, cắt đi 35 cm. Còn lại bao nhiêu xăng-ti-mét?', o: ['65 cm', '75 cm', '35 cm', '135 cm'], ex: '1 m = 100 cm; 100 − 35 = 65 (cm).' },

  // ── Tiền Việt Nam ──
  { w: 28, m: 'toan', lv: 1, t: 'Tiền Việt Nam', q: 'Mẹ đưa em 1 tờ 10 nghìn đồng và 1 tờ 5 nghìn đồng. Em có bao nhiêu tiền?', o: ['15 nghìn đồng', '105 nghìn đồng', '5 nghìn đồng', '6 nghìn đồng'], ex: '10 + 5 = 15 (nghìn đồng).' },
  { w: 28, m: 'toan', lv: 2, t: 'Tiền Việt Nam', q: 'Quyển vở giá 8 nghìn đồng. Em đưa 10 nghìn đồng. Em được trả lại bao nhiêu?', o: ['2 nghìn đồng', '18 nghìn đồng', '8 nghìn đồng', '3 nghìn đồng'], ex: '10 − 8 = 2 (nghìn đồng).' },
  { w: 28, m: 'toan', lv: 1, t: 'Tiền Việt Nam', q: 'Mua 1 cây bút giá 5 nghìn đồng và 1 cục tẩy giá 3 nghìn đồng. Hết bao nhiêu tiền?', o: ['8 nghìn đồng', '2 nghìn đồng', '53 nghìn đồng', '15 nghìn đồng'], ex: '5 + 3 = 8 (nghìn đồng).' },
  { w: 28, m: 'toan', lv: 1, t: 'Tiền Việt Nam', q: 'Tờ tiền nào có giá trị lớn nhất?', o: ['1000 đồng', '500 đồng', '200 đồng', '100 đồng'], ex: '1000 > 500 > 200 > 100.' },

  // ── Cộng, trừ trong phạm vi 1000 ──
  { w: 29, m: 'toan', lv: 1, t: 'Cộng trừ trong 1000', q: 'Trường em có 245 bạn nam và 230 bạn nữ. Trường có bao nhiêu học sinh?', o: ['475 bạn', '465 bạn', '15 bạn', '485 bạn'], ex: '245 + 230 = 475.' },
  { w: 29, m: 'toan', lv: 1, t: 'Cộng trừ trong 1000', q: 'Tính nhẩm: 300 + 500 = ?', o: ['800', '80', '8000', '700'], ex: '3 trăm + 5 trăm = 8 trăm.' },
  { w: 30, m: 'toan', lv: 1, t: 'Cộng trừ trong 1000', q: 'Cuộn dây dài 500 m, đã cắt đi 150 m. Còn lại bao nhiêu mét?', o: ['350 m', '650 m', '450 m', '250 m'], ex: '500 − 150 = 350 (m).' },
  { w: 30, m: 'toan', lv: 2, t: 'Cộng trừ trong 1000', q: '456 + 127 = ?', o: ['583', '573', '593', '329'], ex: '6 + 7 = 13, viết 3 nhớ 1; 5 + 2 + 1 = 8; 4 + 1 = 5. Kết quả 583.' },
  { w: 31, m: 'toan', lv: 3, t: 'Cộng trừ trong 1000', q: '642 − 318 = ?', o: ['324', '336', '334', '960'], ex: '12 − 8 = 4, nhớ 1; 4 − (1 + 1) = 2; 6 − 3 = 3. Kết quả 324.' },
  { w: 31, m: 'toan', lv: 2, t: 'Cộng trừ trong 1000', q: 'Voi con nặng 750 kg, con bò nặng 350 kg. Voi con nặng hơn bò bao nhiêu?', o: ['400 kg', '1100 kg', '300 kg', '450 kg'], ex: '750 − 350 = 400 (kg).' },
  { w: 31, m: 'toan', lv: 2, t: 'Cộng trừ trong 1000', q: 'Số nào điền vào chỗ trống: … + 200 = 900?', o: ['700', '1100', '500', '600'], ex: '900 − 200 = 700.' },

  // ── Thống kê, xác suất ──
  { w: 32, m: 'toan', lv: 1, t: 'Thống kê, xác suất', q: 'Trong hộp chỉ có bi xanh. Lấy ra 1 viên bi, viên bi đó chắc chắn màu gì?', o: ['màu xanh', 'màu đỏ', 'màu vàng', 'màu trắng'], ex: 'Hộp chỉ có bi xanh nên chắc chắn lấy được bi xanh.' },
  { w: 32, m: 'toan', lv: 2, t: 'Thống kê, xác suất', q: 'Hộp có 3 bi đỏ và 2 bi xanh. Lấy ra 1 viên, viên bi đó có thể màu gì?', o: ['đỏ hoặc xanh', 'chỉ có thể màu đỏ', 'chỉ có thể màu xanh', 'màu vàng'], ex: 'Trong hộp có cả bi đỏ và bi xanh.' },
  { w: 32, m: 'toan', lv: 1, t: 'Thống kê, xác suất', q: 'Lớp em: 8 bạn thích mèo, 12 bạn thích chó, 5 bạn thích thỏ. Con vật nào được thích nhiều nhất?', o: ['con chó', 'con mèo', 'con thỏ', 'con gà'], ex: '12 lớn nhất nên con chó được thích nhiều nhất.' },
  { w: 32, m: 'toan', lv: 2, t: 'Thống kê, xác suất', q: 'Biểu đồ tranh, mỗi 🍎 là 1 quả. Nam: 🍎🍎🍎🍎🍎, Lan: 🍎🍎. Nam hái nhiều hơn Lan mấy quả?', o: ['3 quả', '7 quả', '5 quả', '2 quả'], ex: 'Nam 5 quả, Lan 2 quả: 5 − 2 = 3.' },

  // ── Quy luật ──
  { w: 5, m: 'toan', lv: 1, t: 'Quy luật dãy số', q: 'Số tiếp theo của dãy 2, 4, 6, 8, … là số nào?', o: ['10', '9', '12', '11'], ex: 'Mỗi số hơn số trước 2: 8 + 2 = 10.' },
  { w: 14, m: 'toan', lv: 1, t: 'Quy luật dãy số', q: 'Số tiếp theo của dãy 90, 80, 70, 60, … là số nào?', o: ['50', '40', '59', '61'], ex: 'Mỗi số kém số trước 10: 60 − 10 = 50.' },
  { w: 20, m: 'toan', lv: 1, t: 'Quy luật dãy số', q: 'Số tiếp theo của dãy 5, 10, 15, 20, … là số nào?', o: ['25', '21', '30', '24'], ex: 'Đếm thêm 5: 20 + 5 = 25.' },
  { w: 25, m: 'toan', lv: 1, t: 'Quy luật dãy số', q: 'Số tiếp theo của dãy 100, 200, 300, 400, … là số nào?', o: ['500', '401', '410', '600'], ex: 'Đếm thêm 100: 400 + 100 = 500.' },
  { w: 33, m: 'toan', lv: 3, t: 'Quy luật dãy số', q: 'Số tiếp theo của dãy 1, 3, 6, 10, … là số nào?', o: ['15', '14', '13', '16'], ex: 'Lần lượt cộng thêm 2, 3, 4 rồi 5: 10 + 5 = 15.' },

  // ── Đố vui toán học ──
  { w: 8, m: 'toan', lv: 3, t: 'Đố vui toán học', q: 'Nhà An nuôi 3 con gà và 1 con chó. Tất cả có bao nhiêu cái chân?', o: ['10 chân', '8 chân', '4 chân', '16 chân'], ex: 'Gà 2 chân: 2 + 2 + 2 = 6; chó 4 chân; 6 + 4 = 10.' },
  { w: 10, m: 'toan', lv: 3, t: 'Đố vui toán học', q: 'Có 5 bạn xếp một hàng. Lan đứng thứ 2 tính từ đầu hàng. Lan đứng thứ mấy tính từ cuối hàng?', o: ['thứ 4', 'thứ 3', 'thứ 2', 'thứ 5'], ex: 'Sau Lan còn 3 bạn, nên tính từ cuối Lan đứng thứ 4.' },
  { w: 13, m: 'toan', lv: 3, t: 'Đố vui toán học', q: 'Hà cưa một khúc gỗ thành 4 đoạn. Hà phải cưa mấy lần?', o: ['3 lần', '4 lần', '5 lần', '2 lần'], ex: 'Mỗi lần cưa thêm 1 đoạn: 1 lần ra 2 đoạn, 3 lần ra 4 đoạn.' },
  { w: 18, m: 'toan', lv: 1, t: 'Đố vui toán học', q: 'Bố đi công tác đúng 1 tuần lễ. Bố đi bao nhiêu ngày?', o: ['7 ngày', '5 ngày', '10 ngày', '30 ngày'], ex: '1 tuần lễ có 7 ngày.' },
  { w: 21, m: 'toan', lv: 2, t: 'Đố vui toán học', q: 'Một đàn vịt có tất cả 10 cái chân. Đàn vịt có bao nhiêu con?', o: ['5 con', '10 con', '20 con', '2 con'], ex: 'Mỗi con vịt 2 chân: 10 : 2 = 5.' },
  { w: 26, m: 'toan', lv: 2, t: 'Đố vui toán học', q: 'Dùng ba chữ số 1, 5, 0 viết số lớn nhất có ba chữ số (mỗi chữ số dùng một lần). Đó là số nào?', o: ['510', '501', '150', '105'], ex: 'Chữ số lớn nhất đặt ở hàng trăm: 5, rồi 1, rồi 0.' },
  { w: 35, m: 'toan', lv: 2, t: 'Đố vui toán học', q: 'Mỗi bước chân của em dài khoảng 4 dm. Em đi 5 bước được khoảng bao nhiêu?', o: ['20 dm', '9 dm', '20 cm', '45 dm'], ex: '4 × 5 = 20 (dm).' },

  // ── Toán order ──
  { w: 1, m: 'toan', k: 'order', lv: 1, t: 'So sánh, sắp xếp số', q: 'Xếp các số từ bé đến lớn', o: ['19', '46', '64', '91'], ex: '19 < 46 < 64 < 91.' },
  { w: 2, m: 'toan', k: 'order', lv: 1, t: 'So sánh, sắp xếp số', q: 'Xếp các số từ lớn đến bé', o: ['87', '78', '70', '8'], ex: '87 > 78 > 70 > 8.' },
  { w: 12, m: 'toan', k: 'order', lv: 2, t: 'So sánh, sắp xếp số', q: 'Xếp các số từ bé đến lớn', o: ['29', '38', '83', '92'], ex: '29 < 38 < 83 < 92.' },
  { w: 25, m: 'toan', k: 'order', lv: 2, t: 'So sánh, sắp xếp số', q: 'Xếp các số từ bé đến lớn', o: ['199', '219', '291', '912'], ex: '199 < 219 < 291 < 912.' },
  { w: 26, m: 'toan', k: 'order', lv: 3, t: 'So sánh, sắp xếp số', q: 'Xếp các số từ lớn đến bé', o: ['650', '605', '560', '506'], ex: '650 > 605 > 560 > 506.' },
  { w: 34, m: 'toan', k: 'order', lv: 2, t: 'So sánh, sắp xếp số', q: 'Xếp các số từ lớn đến bé', o: ['1000', '999', '990', '909'], ex: '1000 > 999 > 990 > 909.' },
  { w: 4, m: 'toan', k: 'order', lv: 2, t: 'Tính nhẩm', q: 'Xếp các phép tính theo kết quả từ bé đến lớn', o: ['9 + 2', '8 + 5', '7 + 7', '9 + 6'], ex: '11, 13, 14, 15.' },
  { w: 20, m: 'toan', k: 'order', lv: 2, t: 'Tính nhẩm', q: 'Xếp các phép nhân theo tích từ bé đến lớn', o: ['2 × 3', '5 × 2', '2 × 7', '5 × 4'], ex: '6, 10, 14, 20.' },
  { w: 30, m: 'toan', k: 'order', lv: 3, t: 'Tính nhẩm', q: 'Xếp các phép tính theo kết quả từ bé đến lớn', o: ['100 + 50', '300 − 100', '200 + 50', '500 − 200'], ex: '150, 200, 250, 300.' },
  { w: 9, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp đại lượng', q: 'Xếp từ nhẹ nhất đến nặng nhất', o: ['quả cam', 'quả dưa hấu', 'bao gạo 25 kg', 'con bò'], ex: 'Quả cam nhẹ nhất, con bò nặng nhất.' },
  { w: 17, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp đại lượng', q: 'Xếp các khoảng thời gian từ ngắn đến dài', o: ['1 phút', '1 giờ', '1 ngày', '1 tuần'], ex: '1 giờ = 60 phút, 1 ngày = 24 giờ, 1 tuần = 7 ngày.' },
  { w: 27, m: 'toan', k: 'order', lv: 2, t: 'Sắp xếp đại lượng', q: 'Xếp các độ dài từ ngắn đến dài', o: ['1 cm', '1 dm', '1 m', '1 km'], ex: '1 dm = 10 cm, 1 m = 10 dm, 1 km = 1000 m.' },
  { w: 28, m: 'toan', k: 'order', lv: 1, t: 'Sắp xếp đại lượng', q: 'Xếp các tờ tiền từ giá trị bé đến lớn', o: ['100 đồng', '200 đồng', '500 đồng', '1000 đồng'], ex: '100 < 200 < 500 < 1000.' },
  { w: 16, m: 'toan', k: 'order', lv: 1, t: 'Ngày giờ', q: 'Xếp các buổi trong ngày theo thứ tự thời gian', o: ['buổi sáng', 'buổi trưa', 'buổi chiều', 'buổi tối'], ex: 'Sáng, trưa, chiều, tối.' },
  { w: 18, m: 'toan', k: 'order', lv: 1, t: 'Xem lịch', q: 'Xếp các ngày theo thứ tự trong tuần', o: ['thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy'], ex: 'Thứ Tư, thứ Năm, thứ Sáu, thứ Bảy.' },
];
