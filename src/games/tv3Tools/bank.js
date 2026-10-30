/**
 * Kho từ ngữ, câu chung của 🧰 Tiếng Việt 3: Công cụ. Chỉ dùng ở dải "🧰 Luyện theo công cụ" (gộp với dữ liệu mọi bài)
 * để đề không lặp; Luyện tập của từng bài chỉ dùng dữ liệu của bài đó. Cùng định dạng với một bài (thiet-ke-cong-cu.md §3).
 */

export const BANK = {
  kinds: {
    sv: ['cô giáo', 'học sinh', 'bác sĩ', 'chú bộ đội', 'ông nội', 'em bé', 'con mèo', 'chú gà trống', 'đàn kiến', 'con trâu', 'cái bàn', 'quyển vở',
      'bút chì', 'cặp sách', 'chiếc xe đạp', 'cây bàng', 'bông hoa', 'dòng sông', 'ngọn núi', 'bầu trời', 'mặt trời', 'cánh đồng', 'sân trường', 'lớp học'],
    hd: ['chạy', 'nhảy dây', 'đọc sách', 'viết bài', 'quét nhà', 'tưới cây', 'nấu cơm', 'hát', 'múa', 'bơi', 'leo núi', 'đá bóng', 'gặt lúa', 'cày ruộng',
      'thả diều', 'gấp quần áo', 'rửa bát', 'vẽ tranh', 'giảng bài', 'chăn trâu', 'bay lượn', 'gáy', 'mổ thóc', 'trồng cây'],
    dd: ['xanh biếc', 'đỏ thắm', 'vàng óng', 'trắng tinh', 'cao', 'thấp', 'tròn xoe', 'nhỏ xíu', 'to lớn', 'dài', 'ngắn', 'thơm ngát', 'ngọt lịm', 'chua',
      'mềm mại', 'cứng', 'chăm chỉ', 'hiền lành', 'dũng cảm', 'nhanh nhẹn', 'thông minh', 'rộng rãi', 'sạch sẽ', 'ồn ào'],
  },
  find: [
    { s: 'Buổi_sáng, ông *tưới_cây ngoài vườn.', k: 'hd' },
    { s: 'Chú gà_trống *vỗ_cánh rồi *gáy vang.', k: 'hd' },
    { s: 'Mẹ *nấu_cơm, chị *quét_nhà.', k: 'hd' },
    { s: 'Bầu_trời mùa_thu *xanh_ngắt.', k: 'dd' },
    { s: 'Quả cam *chín_vàng, *ngọt_lịm.', k: 'dd' },
    { s: 'Con_đường đến trường *rộng và *sạch_sẽ.', k: 'dd' },
    { s: '*Đàn_cò trắng bay trên *cánh_đồng.', k: 'sv' },
    { s: '*Bà mua cho em một *chiếc_mũ mới.', k: 'sv' },
  ],
  sentype: [
    ['Bố em là bác sĩ.', 'gt'], ['Đây là ngôi trường của em.', 'gt'], ['Mèo Mướp là bạn thân của em.', 'gt'], ['Hà Nội là thủ đô của nước ta.', 'gt'],
    ['Các bạn đang tập thể dục trên sân trường.', 'hd'], ['Ông em đọc báo mỗi sáng.', 'hd'], ['Đàn chim bay về tổ.', 'hd'], ['Em giúp mẹ nhặt rau.', 'hd'],
    ['Cánh đồng lúa vàng óng.', 'dd'], ['Bộ lông của chú mèo mềm mại.', 'dd'], ['Lớp học của em rất sạch sẽ.', 'dd'], ['Nước biển xanh biếc.', 'dd'],
  ],
  build: [
    'Mẹ / đưa em / đến trường / mỗi sáng.', 'Bạn Lan / là / lớp trưởng / lớp em.', 'Những bông hoa / trong vườn / nở rộ.',
    'Chúng em / chăm chú / nghe cô giảng bài.', 'Ông em / trồng / một cây bưởi / trước sân.', 'Bầu trời / hôm nay / trong xanh.',
  ],
  match: [
    ['Đàn cá', 'tung tăng bơi lội.'], ['Chú gà trống', 'gáy vang đánh thức cả xóm.'], ['Những chú ong', 'chăm chỉ hút mật.'],
    ['Cô giáo', 'đang giảng bài.'], ['Bác nông dân', 'đang cày ruộng.'], ['Mặt trời', 'chiếu những tia nắng ấm áp.'],
  ],
  purpose: [
    ['Em đang làm bài tập.', 'ke'], ['Hôm nay trời nắng đẹp.', 'ke'], ['Nhà bạn ở đâu?', 'hoi'], ['Bạn đã ăn sáng chưa?', 'hoi'], ['Vì sao lá cây màu xanh?', 'hoi'],
    ['Ôi, bông hoa đẹp quá!', 'cam'], ['Chao ôi, biển rộng thật!', 'cam'], ['Bạn hãy giữ trật tự!', 'khien'], ['Em đừng ra đường một mình!', 'khien'], ['Chúng mình cùng đi nào!', 'khien'],
  ],
  punct: [
    'Bạn tên là gì{?}', 'Ôi, chiếc diều đẹp quá{!}', 'Sáng nào em cũng dậy sớm tập thể dục{.}', 'Trong vườn có nhiều loại cây{:} cam, bưởi, xoài, nhãn.',
    'Em thích đọc truyện cổ tích{,} truyện tranh và thơ.', 'Bao giờ lớp mình đi tham quan{?}', 'Mẹ dặn em{:} "Con nhớ đội mũ khi ra nắng."',
  ],
  colon: [
    ['Trên bàn học có: sách, vở, bút, thước kẻ.', 'lk'], ['Cô giáo nói: "Các em hãy giữ gìn sách vở."', 'ln'],
    ['Em rất vui: hôm nay em được điểm mười.', 'gt'], ['Vườn nhà bà trồng nhiều rau: rau muống, rau cải, mồng tơi.', 'lk'],
  ],
  antonym: [['cao', 'thấp'], ['to', 'nhỏ'], ['dài', 'ngắn'], ['nóng', 'lạnh'], ['vui', 'buồn'], ['nhanh', 'chậm'], ['sáng', 'tối'], ['khoẻ', 'yếu'],
    ['mới', 'cũ'], ['đẹp', 'xấu'], ['chăm chỉ', 'lười biếng'], ['rộng', 'hẹp'], ['đầy', 'vơi'], ['trên', 'dưới']],
  synonym: [['chăm chỉ', 'siêng năng'], ['to lớn', 'khổng lồ'], ['nhỏ bé', 'bé xíu'], ['vui vẻ', 'vui tươi'], ['xinh đẹp', 'xinh xắn'], ['thông minh', 'sáng dạ'],
    ['bố', 'ba'], ['mẹ', 'má'], ['hiền lành', 'hiền hậu'], ['nhanh nhẹn', 'nhanh nhảu']],
  compare: [
    'Mặt_trời*a tròn như*w quả_bóng_lửa*b.', 'Trăng*a tròn như*w cái_đĩa*b.', 'Mắt_bé*a sáng như*w sao*b.',
    'Tiếng_suối*a trong như*w tiếng_hát*b.', 'Lá_cọ*a xoè ra như*w chiếc_quạt*b.', 'Đôi_má_em_bé*a đỏ như*w quả_táo*b.',
  ],
  question: [
    { s: '[Bạn Nam] đang tưới cây.', q: 'Ai' }, { s: 'Bạn Nam [đang tưới cây].', q: 'Làm gì' }, { s: 'Bông hoa hồng [đỏ thắm].', q: 'Thế nào' },
    { s: 'Chú mèo nằm ngủ [trên chiếc ghế].', q: 'Ở đâu' }, { s: '[Sáng mai], lớp em đi tham quan.', q: 'Khi nào' }, { s: 'Mẹ em là [cô giáo].', q: 'Là gì', not: ['Ai'] },
  ],
  caps: ['Hà Nội', 'Đà Nẵng', 'Huế', 'Phú Quốc', 'Nguyễn Văn An', 'Trần Thị Mai', 'Hạ Long', 'Tây Nguyên'],
};
