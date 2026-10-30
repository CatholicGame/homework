/**
 * 🧰 Công cụ Tiếng Việt 2: dữ liệu Chủ điểm 1 "Em lớn lên từng ngày", Bài 1–8 (Tuần 1–4).
 * Nguồn: Vở bài tập Tiếng Việt 2, Tập Một (Kết nối tri thức), trang 4–19; ghi chép docs/lop_2/vbt_tv2_tap1/bai-01.md … bai-08.md.
 * Định dạng: docs/lop_3/sgk_tv3_tap1/thiet-ke-cong-cu.md §3 (khác ở lớp 2: docs/lop_2/vbt_tv2_tap1/thiet-ke-cong-cu.md §3).
 * Câu, từ lấy từ vở (và bài đọc SGK mà vở nhắc tới) trước, thêm câu tự soạn cùng chủ đề.
 */

export default [
  // ── Bài 1 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 1, title: 'Tôi là học sinh lớp 2', week: 1, pages: [4, 5],
    learn: ['Ngày khai trường', 'Từ ngữ thay thế', 'Viết về ngày hè của em'],
    notes: [
      {
        icon: '🎒', color: '#2563EB', title: 'Háo hức đến trường',
        text: 'Những chi tiết cho thấy bạn nhỏ rất <b>háo hức</b> đến trường ngày khai trường.',
        ex: ['Bạn nhỏ <b>vùng dậy</b>, <b>chuẩn bị rất nhanh</b>.', 'Bạn nhỏ <b>muốn đến sớm nhất lớp</b>.'],
      },
      {
        icon: '🔁', color: '#16A34A', title: 'Từ ngữ thay thế',
        text: 'Có thể dùng từ ngữ khác có nghĩa giống để thay thế. <b>Loáng một cái</b> nghĩa là <b>trong chớp mắt</b>, rất nhanh.',
        ex: ['<b>Loáng một cái</b>, tôi đã chuẩn bị xong.', '<b>Trong chớp mắt</b>, tôi đã chuẩn bị xong.'],
      },
      {
        icon: '☀️', color: '#CA8A04', title: 'Viết về ngày hè',
        text: 'Kể em đã làm gì, ở đâu, với ai trong những ngày hè, em thấy thế nào.',
        ex: ['Nghỉ hè, em thích nhất là được về quê cùng cả nhà.', 'Em nhớ nhất là lúc được xây lâu đài cát trên bãi biển.'],
      },
    ],
    kinds: {
      sv: ['cặp sách', 'cổng trường', 'lớp học', 'bạn bè', 'mẹ', 'cô giáo', 'bãi biển', 'lâu đài cát', 'quả bóng'],
      hd: ['vùng dậy', 'chuẩn bị', 'đến trường', 'chào', 'chơi bóng đá', 'xây', 'về quê', 'tắm biển'],
    },
    find: [
      { s: 'Tôi vùng_dậy*, chuẩn_bị* rất nhanh.', k: 'hd' },
      { s: 'Tôi muốn đến* sớm nhất lớp.', k: 'hd' },
      { s: 'Mùa_hè, em được chơi* bóng_đá thoả_thích cùng các bạn.', k: 'hd' },
      { s: 'Em nhớ nhất là lúc được xây* lâu_đài_cát trên bãi_biển.', k: 'hd' },
      { s: 'Mẹ dắt* em đến* trường.', k: 'hd' },
      { s: 'Các em lớp 1 rụt_rè* đứng bên cạnh bố mẹ.', k: 'dd' },
      { s: 'Em đeo chiếc cặp_sách* mới đến lớp_học*.', k: 'sv' },
    ],
    build: [
      'Ngày khai trường, / tôi / vùng dậy / rất sớm.',
      'Tôi / muốn đến / sớm nhất lớp.',
      'Năm nay, / tôi / là học sinh lớp 2.',
      'Mùa hè, / em được chơi bóng đá / cùng các bạn.',
      'Nghỉ hè, / em được về quê / cùng cả nhà.',
      'Em / xây lâu đài cát / trên bãi biển.',
    ],
    match: [
      ['Em xây lâu đài cát', 'trên bãi biển.'],
      ['Em chơi bóng đá', 'trên sân cỏ.'],
      ['Cả nhà em về quê', 'thăm ông bà.'],
      ['Các em lớp 1', 'còn rụt rè, bỡ ngỡ.'],
      ['Tôi muốn đến trường', 'sớm nhất lớp.'],
    ],
    fill: [
      { s: 'Tôi vùng dậy, {trong chớp mắt} đã chuẩn bị xong.', opts: ['trong chớp mắt', 'một lúc sau', 'chẳng bao lâu'], hint: '"Loáng một cái" nghĩa là rất nhanh, như trong chớp mắt.' },
      { s: 'Ngày khai trường, các em lớp 1 còn {rụt rè}.', opts: ['rụt rè', 'háo hức', 'ngạc nhiên'] },
      { s: 'Bạn nhỏ rất {háo hức} đến trường vào ngày khai trường.', opts: ['háo hức', 'rụt rè', 'buồn bã'] },
      { s: 'Em nhớ nhất là lúc được xây {lâu đài cát} trên bãi biển.', opts: ['lâu đài cát', 'quả bóng', 'cánh diều'] },
      { s: 'Mùa hè, em được chơi {bóng đá} thoả thích cùng các bạn.', opts: ['bóng đá', 'bài tập', 'cặp sách'] },
    ],
    para: [
      { title: 'Ngày hè của em', sents: ['Hè này, em được về quê thăm ông bà.', 'Buổi sáng, em theo bà ra vườn hái rau.', 'Buổi chiều, em cùng các bạn thả diều trên đê.', 'Em thấy những ngày hè thật vui.'] },
      { title: 'Ngày khai trường', sents: ['Sáng nay là ngày khai trường.', 'Tôi vùng dậy, chuẩn bị thật nhanh.', 'Mẹ đưa tôi đến trường.', 'Năm nay, tôi đã là học sinh lớp 2.'] },
    ],
  },

  // ── Bài 2 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 2, title: 'Ngày hôm qua đâu rồi?', week: 1, pages: [5, 7],
    learn: ['Từ ngữ chỉ người, chỉ vật', 'Bảng chữ cái: a đến ê', 'Câu giới thiệu', 'Giới thiệu bản thân'],
    notes: [
      {
        icon: '🏠', color: '#2563EB', title: 'Từ ngữ chỉ người, chỉ vật',
        text: 'Từ ngữ chỉ <b>người</b>: mẹ, bố, bạn nhỏ… Từ ngữ chỉ <b>vật</b>: cánh đồng, tờ lịch, quyển vở… Đó là các từ chỉ <b>sự vật</b>.',
        ex: ['Chỉ người: <b>mẹ</b>, <b>bố</b>, <b>bạn nhỏ</b>', 'Chỉ vật: <b>cánh đồng</b>, <b>tờ lịch</b>, <b>cặp sách</b>, <b>khăn mặt</b>', 'Chỉ hoạt động: <b>đánh răng</b>, <b>chải đầu</b>, <b>đi học</b>'],
      },
      {
        icon: '🔡', color: '#0EA5E9', title: 'Bảng chữ cái',
        text: 'Chín chữ cái đầu tiên: <b>a, ă, â, b, c, d, đ, e, ê</b>. Tên chữ cái: a, á, ớ, bê, xê, dê, đê, e, ê.',
        ex: ['đ, c, b, d, a, ê → <b>a, b, c, d, đ, ê</b>'],
      },
      {
        icon: '🏷️', color: '#7C3AED', title: 'Câu giới thiệu',
        text: 'Câu giới thiệu trả lời câu hỏi <b>Ai (cái gì, con gì) là gì?</b>, thường có từ <b>là</b>.',
        ex: ['<u>Bạn Hà</u> là học sinh lớp 2A.', '<u>Trường em</u> là Trường Tiểu học Lê Quý Đôn.'],
      },
    ],
    kinds: {
      sv: ['mẹ', 'bố', 'bạn nhỏ', 'cánh đồng', 'tờ lịch', 'quyển vở', 'bàn học', 'hoa hồng', 'khu vườn', 'hạt lúa', 'mũ', 'cặp sách', 'khăn mặt', 'quần áo'],
      hd: ['đánh răng', 'chải đầu', 'đi học', 'ăn sáng', 'học bài', 'trồng lúa', 'gặt lúa', 'tưới hoa', 'cầm', 'hỏi'],
    },
    find: [
      { s: 'Em cầm tờ_lịch* cũ hỏi bố*.', k: 'sv' },
      { s: 'Mẹ* trồng lúa trên cánh_đồng*.', k: 'sv' },
      { s: 'Nụ_hồng* trong vườn lớn lên mãi.', k: 'sv' },
      { s: 'Bạn_nhỏ* ngồi học bên bàn_học*.', k: 'sv' },
      { s: 'Buổi sáng, em đánh_răng*, rửa_mặt* rồi ăn_sáng*.', k: 'hd' },
      { s: 'Em chải_đầu*, đội mũ rồi đi_học*.', k: 'hd' },
      { s: 'Con học_hành* chăm_chỉ.', k: 'hd' },
    ],
    vocab: {
      name: 'đồ dùng và việc làm hằng ngày',
      groups: {
        'Đồ vật (đồ dùng)': ['mũ', 'cặp sách', 'khăn mặt', 'quần áo', 'bàn chải', 'lược', 'dép'],
        'Hoạt động': ['đánh răng', 'chải đầu', 'đi học', 'ăn sáng', 'rửa mặt', 'mặc áo'],
      },
      icons: { 'Đồ vật (đồ dùng)': '🎒', 'Hoạt động': '🪥' },
    },
    sentype: [
      ['Bạn Hà là học sinh lớp 2A.', 'gt'],
      ['Bố em là bác sĩ.', 'gt'],
      ['Trường em là Trường Tiểu học Lê Quý Đôn.', 'gt'],
      ['Tớ là Hải, học sinh Trường Tiểu học Kim Đồng.', 'gt'],
      ['Mẹ em là cô giáo.', 'gt'],
      ['Mẹ đang làm việc trên cánh đồng.', 'hd'],
      ['Bạn nhỏ cầm tờ lịch cũ.', 'hd'],
      ['Hải đang đá bóng cùng bạn.', 'hd'],
      ['Em đánh răng, rửa mặt.', 'hd'],
    ],
    build: [
      'Bạn Hà / là / học sinh lớp 2A.',
      'Bố em / là / bác sĩ.',
      'Trường em / là / Trường Tiểu học Lê Quý Đôn.',
      'Tớ / tên là / Hải.',
      'Hải / học ở / Trường Tiểu học Kim Đồng.',
      'Mẹ / đang làm việc / trên cánh đồng.',
      'Con / học hành / chăm chỉ.',
    ],
    match: [
      ['Bạn Hà', 'là học sinh lớp 2A.'],
      ['Bố em', 'là bác sĩ.'],
      ['Trường em', 'là Trường Tiểu học Lê Quý Đôn.'],
      ['Con mèo', 'là con vật em yêu nhất.'],
      ['Quyển vở', 'là đồ dùng học tập.'],
    ],
    question: [
      { s: '[Bạn Hà] là học sinh lớp 2A.', q: 'Ai' },
      { s: 'Bạn Hà là [học sinh lớp 2A].', q: 'Là gì' },
      { s: 'Bố em là [bác sĩ].', q: 'Là gì' },
      { s: '[Bố em] là bác sĩ.', q: 'Ai' },
      { s: 'Hải [đá bóng] cùng bạn.', q: 'Làm gì' },
    ],
    caps: ['Hà', 'Hải', 'Lê Quý Đôn', 'Kim Đồng'],
    alpha: ['áo khoác', 'ấm nước', 'bút chì', 'cặp sách', 'dép', 'đồng hồ', 'em bé', 'ê ke'],
    para: [
      { title: 'Giới thiệu bản thân', sents: ['Tớ tên là Hải.', 'Tớ là học sinh lớp 2A, Trường Tiểu học Kim Đồng.', 'Tớ thích nhất là đá bóng.', 'Rất vui được làm quen với các bạn!'] },
      { title: 'Ngày hôm qua đâu rồi?', sents: ['Em cầm tờ lịch cũ.', 'Em ra ngoài sân hỏi bố: "Ngày hôm qua đâu rồi?".', 'Bố xoa đầu em và cười.', 'Bố dặn: "Con học hành chăm chỉ là ngày qua vẫn còn."'] },
    ],
  },

  // ── Bài 3 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 3, title: 'Niềm vui của Bi và Bống', week: 2, pages: [8, 8],
    learn: ['Từ ngữ chỉ người, chỉ đồ vật', 'Câu thể hiện sự ngạc nhiên', 'Kể chuyện Niềm vui của Bi và Bống'],
    notes: [
      {
        icon: '👫', color: '#2563EB', title: 'Từ ngữ chỉ người, chỉ đồ vật',
        text: 'Chỉ <b>người</b>: Bi, Bống, anh, em. Chỉ <b>đồ vật</b>: hũ vàng, búp bê, quần áo, ô tô.',
        ex: ['Còn <b>Bi</b> sẽ mua một con ngựa hồng và một cái <b>ô tô</b>.'],
      },
      {
        icon: '🌈', color: '#DC2626', title: 'Câu thể hiện sự ngạc nhiên',
        text: 'Câu thể hiện sự ngạc nhiên, vui mừng thường có từ <b>kìa, quá, ôi</b>; cuối câu có <b>dấu chấm than</b> (!).',
        ex: ['Cầu vồng kìa<b>!</b>', 'Đẹp quá<b>!</b>'],
      },
      {
        icon: '💛', color: '#CA8A04', title: 'Niềm vui của hai anh em',
        text: 'Không có hũ vàng, Bi và Bống vẫn vui vì sẽ vẽ tặng nhau những thứ mình thích.',
      },
    ],
    kinds: {
      sv: ['Bi', 'Bống', 'anh', 'em', 'hũ vàng', 'búp bê', 'quần áo', 'ô tô', 'cầu vồng', 'ngựa hồng', 'bút chì màu', 'trang giấy'],
      hd: ['nhìn', 'mua', 'vẽ', 'tặng', 'cười', 'reo lên', 'chạy ra', 'nói'],
    },
    find: [
      { s: 'Bống* sẽ mua búp_bê* và quần_áo đẹp.', k: 'sv' },
      { s: 'Bi sẽ mua một con ngựa_hồng* và một cái ô_tô*.', k: 'sv' },
      { s: 'Dưới chân cầu_vồng* có bảy hũ_vàng*.', k: 'sv' },
      { s: 'Em sẽ vẽ* tặng* anh một cái ô_tô.', k: 'hd' },
      { s: 'Bi nhìn* lên trời và reo* lên.', k: 'hd' },
      { s: 'Hai anh_em cùng cười* vui_vẻ.', k: 'hd' },
    ],
    vocab: {
      name: 'người và đồ vật',
      groups: {
        'Chỉ người': ['Bi', 'Bống', 'anh', 'em', 'bố', 'mẹ', 'ông', 'bà'],
        'Chỉ đồ vật': ['hũ vàng', 'búp bê', 'quần áo', 'ô tô', 'bút chì', 'quả bóng', 'trang giấy'],
      },
      icons: { 'Chỉ người': '👫', 'Chỉ đồ vật': '🧸' },
    },
    punct: [
      'Cầu vồng kìa{!}',
      'Đẹp quá{!}',
      'Anh ơi, dưới chân cầu vồng có gì thế{?}',
      'Nếu có bảy hũ vàng, em sẽ mua gì{?}',
      'Bống sẽ mua búp bê{,} quần áo đẹp.',
      'Mưa vừa tạnh, cầu vồng hiện lên{.}',
      'Ôi, cầu vồng đẹp quá{!}',
    ],
    fill: [
      { s: 'Nếu có bảy hũ vàng, Bống sẽ mua {búp bê} và quần áo đẹp.', opts: ['búp bê', 'ô tô', 'ngựa hồng'] },
      { s: 'Còn Bi sẽ mua một con ngựa hồng và một cái {ô tô}.', opts: ['ô tô', 'búp bê', 'quần áo'] },
      { s: 'Câu chuyện diễn ra vào một ngày mưa, có {cầu vồng} xuất hiện.', opts: ['cầu vồng', 'mặt trời', 'tuyết rơi'] },
      { s: 'Không có bảy hũ vàng, Bống vẫn {vui vẻ}.', opts: ['vui vẻ', 'buồn bã', 'thất vọng'] },
      { s: 'Bống nghĩ ngay đến việc {vẽ} những gì anh Bi thích.', opts: ['vẽ', 'mua', 'xin'] },
    ],
    build: [
      'Cầu vồng / hiện lên / sau cơn mưa.',
      'Dưới chân cầu vồng / có / bảy hũ vàng.',
      'Bống / sẽ mua / búp bê và quần áo đẹp.',
      'Em / sẽ vẽ tặng anh / một cái ô tô.',
      'Hai anh em / cười / rất vui.',
    ],
    para: [
      { title: 'Niềm vui của Bi và Bống', sents: ['Mưa vừa tạnh, cầu vồng hiện lên.', 'Bi nói dưới chân cầu vồng có bảy hũ vàng.', 'Hai anh em kể sẽ mua những gì mình thích.', 'Cầu vồng biến mất, hai anh em vẫn vui vì sẽ vẽ tặng nhau.'] },
    ],
  },

  // ── Bài 4 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 4, title: 'Làm việc thật là vui', week: 2, pages: [9, 11],
    learn: ['Từ ngữ chỉ hoạt động', 'Câu nêu hoạt động', 'Bảng chữ cái: g đến ơ', 'Kể một việc em làm ở nhà'],
    notes: [
      {
        icon: '🏃', color: '#16A34A', title: 'Từ ngữ chỉ hoạt động',
        text: 'Từ ngữ chỉ <b>hoạt động</b> chỉ việc làm của người, con vật, đồ vật. Trả lời câu hỏi <b>Làm gì?</b>',
        ex: ['Cái đồng hồ: <b>báo phút, báo giờ</b>', 'Con gà trống: <b>gáy vang</b>', 'Bé: <b>làm bài</b>, <b>đi học</b>, <b>quét nhà</b>, <b>nhặt rau</b>'],
      },
      {
        icon: '💬', color: '#7C3AED', title: 'Câu nêu hoạt động',
        text: 'Câu nêu hoạt động trả lời câu hỏi <b>Ai (cái gì, con gì) làm gì?</b>',
        ex: ['Con gà trống <u>gáy vang báo trời sắp sáng</u>.', 'Cành đào <u>nở hoa cho sắc xuân thêm rực rỡ</u>.'],
      },
      {
        icon: '🔡', color: '#0EA5E9', title: 'Xếp theo bảng chữ cái',
        text: 'Muốn xếp tên theo thứ tự bảng chữ cái, em nhìn <b>chữ cái đầu</b> của mỗi tên.',
        ex: ['<b>G</b>à trống nhanh trí, <b>H</b>oa mào gà, <b>K</b>iến và chim bồ câu, <b>N</b>àng tiên Ốc, <b>Ô</b>ng Cản Ngũ'],
      },
    ],
    kinds: {
      sv: ['đồng hồ', 'gà trống', 'tu hú', 'cành đào', 'cú mèo', 'quạt máy', 'mắc áo', 'ghế', 'chổi', 'nồi', 'bé', 'mẹ'],
      hd: ['báo phút', 'báo giờ', 'gáy vang', 'kêu', 'bắt sâu', 'nở hoa', 'làm bài', 'đi học', 'quét nhà', 'nhặt rau', 'chơi với em', 'nấu cơm', 'làm mát', 'treo quần áo'],
    },
    find: [
      { s: 'Bé làm_bài*. Bé đi_học*.', k: 'hd' },
      { s: 'Học xong, bé quét_nhà*, nhặt_rau*, chơi* với em đỡ mẹ.', k: 'hd' },
      { s: 'Cái đồng_hồ báo* phút, báo* giờ.', k: 'hd' },
      { s: 'Con gà_trống gáy* vang báo trời sắp sáng.', k: 'hd' },
      { s: 'Chim bắt* sâu, bảo_vệ* mùa_màng.', k: 'hd' },
      { s: 'Cành_đào nở* hoa cho sắc xuân thêm rực_rỡ.', k: 'hd' },
      { s: 'Con tu_hú* kêu tu hú, tu hú.', k: 'sv' },
      { s: 'Quạt_máy* làm mát, chổi* để quét nhà.', k: 'sv' },
    ],
    sentype: [
      ['Con gà trống gáy vang báo trời sắp sáng.', 'hd'],
      ['Cành đào nở hoa cho sắc xuân thêm rực rỡ.', 'hd'],
      ['Cái đồng hồ tích tắc báo phút, báo giờ.', 'hd'],
      ['Chim bắt sâu, bảo vệ mùa màng.', 'hd'],
      ['Bé quét nhà, nhặt rau giúp mẹ.', 'hd'],
      ['Em quét nhà giúp mẹ.', 'hd'],
      ['Tu hú là loài chim báo mùa vải chín.', 'gt'],
      ['Bé là học sinh chăm ngoan.', 'gt'],
    ],
    build: [
      'Con gà trống / gáy vang / báo trời sắp sáng.',
      'Cành đào / nở hoa / cho sắc xuân thêm rực rỡ.',
      'Chim / bắt sâu, / bảo vệ mùa màng.',
      'Học xong, / bé / quét nhà, nhặt rau.',
      'Em / tưới cây / giúp bà.',
      'Bé / luôn luôn bận rộn, / mà lúc nào cũng vui.',
    ],
    match: [
      ['Con gà trống', 'gáy vang báo trời sắp sáng.'],
      ['Cành đào', 'nở hoa cho sắc xuân thêm rực rỡ.'],
      ['Cái đồng hồ', 'tích tắc, tích tắc, báo phút, báo giờ.'],
      ['Chim', 'bắt sâu, bảo vệ mùa màng.'],
      ['Bé', 'làm bài, đi học, quét nhà, nhặt rau.'],
      ['Con tu hú', 'kêu báo mùa vải chín.'],
    ],
    fill: [
      { s: 'Cái {chổi} dùng để quét nhà.', opts: ['chổi', 'ghế', 'nồi'] },
      { s: 'Cái {mắc áo} dùng để treo quần áo.', opts: ['mắc áo', 'quạt máy', 'chổi'] },
      { s: 'Cái {ghế} dùng để ngồi.', opts: ['ghế', 'mắc áo', 'nồi'] },
      { s: 'Cái {nồi} dùng để nấu thức ăn.', opts: ['nồi', 'ghế', 'quạt máy'] },
      { s: 'Cái {quạt máy} dùng để làm mát.', opts: ['quạt máy', 'chổi', 'mắc áo'] },
      { s: 'Con tu hú kêu, báo sắp đến mùa {vải chín}.', opts: ['vải chín', 'lúa chín', 'hoa nở'] },
    ],
    question: [
      { s: 'Con gà trống [gáy vang báo trời sắp sáng].', q: 'Làm gì' },
      { s: 'Bé [quét nhà, nhặt rau].', q: 'Làm gì' },
      { s: '[Bé] quét nhà, nhặt rau.', q: 'Ai' },
      { s: 'Chim [bắt sâu, bảo vệ mùa màng].', q: 'Làm gì' },
      { s: '[Cái đồng hồ] báo phút, báo giờ.', q: 'Cái gì' },
    ],
    alpha: ['Gà trống nhanh trí', 'Hoa mào gà', 'Kiến và chim bồ câu', 'Nàng tiên Ốc', 'Ông Cản Ngũ', 'Cây khế', 'Tấm Cám', 'Sự tích dưa hấu', 'Dế Mèn phiêu lưu kí'],
    para: [
      { title: 'Việc em làm ở nhà', sents: ['Chủ nhật, em giúp mẹ tưới cây.', 'Em xách bình tưới ra vườn.', 'Em tưới đều cho từng gốc cây.', 'Làm xong, em thấy rất vui.'] },
      { title: 'Bé làm việc', sents: ['Bé làm bài.', 'Bé đi học.', 'Học xong, bé quét nhà, nhặt rau, chơi với em đỡ mẹ.', 'Bé luôn luôn bận rộn, mà lúc nào cũng vui.'] },
    ],
  },

  // ── Bài 5 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 5, title: 'Em có xinh không?', week: 3, pages: [12, 13],
    learn: ['Từ ngữ chỉ bộ phận cơ thể', 'Từ ngữ chỉ hành động', 'Kể chuyện Em có xinh không?'],
    notes: [
      {
        icon: '🐘', color: '#2563EB', title: 'Từ ngữ chỉ bộ phận cơ thể',
        text: 'Từ ngữ chỉ <b>bộ phận cơ thể</b> người, con vật: đầu, tai, râu, sừng, cằm…',
        ex: ['Voi em nhổ khóm cỏ dại gắn lên <b>cằm</b> làm <b>râu</b>.', 'Voi em gài <b>sừng</b> giả lên <b>đầu</b>.'],
      },
      {
        icon: '🏃', color: '#16A34A', title: 'Từ ngữ chỉ hành động',
        text: 'Hành động của voi em: <b>nhặt cành cây</b>, <b>nhổ khóm cỏ dại</b>, <b>ngắm mình trong gương</b>.',
      },
      {
        icon: '💡', color: '#CA8A04', title: 'Đẹp nhất là chính mình',
        text: 'Voi em nhận ra mình chỉ xinh đẹp khi <b>đúng là voi</b>, khi là chính mình.',
      },
    ],
    kinds: {
      sv: ['đầu', 'râu', 'tai', 'sừng', 'cằm', 'vòi', 'voi em', 'voi anh', 'hươu', 'dê', 'cỏ dại', 'gương', 'cành cây'],
      hd: ['nhặt cành cây', 'nhổ', 'gắn', 'gài', 'ngắm', 'hỏi', 'khen', 'chạy về', 'soi gương'],
    },
    find: [
      { s: 'Voi em nhổ* khóm cỏ_dại và gắn* lên cằm làm râu.', k: 'hd' },
      { s: 'Nghe hươu nói, voi em liền gài* sừng giả lên đầu.', k: 'hd' },
      { s: 'Voi em ngắm* mình trong gương.', k: 'hd' },
      { s: 'Voi em nhặt* mấy cành_cây.', k: 'hd' },
      { s: 'Voi em gắn khóm cỏ lên cằm* làm râu*.', k: 'sv' },
      { s: 'Hươu có đôi sừng* trên đầu*.', k: 'sv' },
      { s: 'Con voi có cái vòi* dài và đôi tai* to.', k: 'sv' },
      { s: 'Con voi có cái vòi dài* và đôi tai to*.', k: 'dd' },
    ],
    vocab: {
      name: 'cơ thể',
      groups: {
        'Bộ phận cơ thể': ['đầu', 'râu', 'tai', 'sừng', 'cằm', 'mắt', 'mũi', 'chân'],
        'Không phải bộ phận cơ thể': ['cỏ dại', 'gương', 'cành cây', 'búp bê', 'quả bóng', 'chiếc lá'],
      },
      icons: { 'Bộ phận cơ thể': '👂', 'Không phải bộ phận cơ thể': '🪞' },
    },
    fill: [
      { s: '{Hươu} nói: "Chưa xinh lắm vì em không có đôi sừng giống anh."', opts: ['Hươu', 'Dê', 'Voi anh'] },
      { s: '{Dê} nói: "Không, vì cậu không có bộ râu giống tôi."', opts: ['Dê', 'Hươu', 'Voi anh'] },
      { s: '{Voi anh} nói: "Em xinh lắm!"', opts: ['Voi anh', 'Dê', 'Hươu'] },
      { s: '{Voi em} hỏi: "Em có xinh không?"', opts: ['Voi em', 'Dê', 'Hươu'] },
      { s: 'Voi em nhổ khóm cỏ dại gắn lên {cằm} làm râu.', opts: ['cằm', 'tai', 'chân'] },
      { s: 'Voi em nhận ra mình chỉ xinh đẹp khi đúng là {voi}.', opts: ['voi', 'hươu', 'dê'] },
    ],
    punct: [
      'Em có xinh không{?}',
      'Em xinh lắm{!}',
      'Anh ơi, em có xinh không{?}',
      'Chưa xinh lắm vì em không có đôi sừng giống anh{.}',
      'Voi em gài sừng giả lên đầu{.}',
      'Dê ơi, tớ có xinh không{?}',
    ],
    sentype: [
      ['Voi em ngắm mình trong gương.', 'hd'],
      ['Voi em nhổ khóm cỏ dại.', 'hd'],
      ['Hươu chạy vào rừng.', 'hd'],
      ['Voi em rất xinh.', 'dd'],
      ['Đôi tai voi to như cái quạt.', 'dd'],
      ['Hươu là con vật có sừng.', 'gt'],
      ['Dê là con vật có râu.', 'gt'],
    ],
    build: [
      'Voi em / gài sừng giả / lên đầu.',
      'Voi em / nhổ khóm cỏ dại / gắn lên cằm.',
      'Voi anh / khen / em xinh lắm.',
      'Voi em / ngắm mình / trong gương.',
      'Hươu / có / đôi sừng đẹp.',
    ],
    para: [
      { title: 'Em có xinh không?', sents: ['Voi em luôn hỏi voi anh và nhận được câu trả lời: "Em xinh lắm!".', 'Nghe hươu nói, voi em liền gài sừng giả lên đầu.', 'Sau khi nói chuyện với dê, voi em nhổ khóm cỏ dại và gắn lên cằm làm râu.', 'Voi em nhận ra mình chỉ xinh đẹp khi đúng là voi.'] },
    ],
  },

  // ── Bài 6 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 6, title: 'Một giờ học', week: 3, pages: [13, 15],
    learn: ['Bảng chữ cái: p đến y', 'Từ ngữ chỉ bộ phận cơ thể, chỉ đặc điểm', 'Câu nêu đặc điểm', 'Kể việc làm trước khi đi học'],
    notes: [
      {
        icon: '🎨', color: '#EA580C', title: 'Từ ngữ chỉ đặc điểm',
        text: 'Bộ phận cơ thể: <b>đôi mắt, khuôn mặt, vầng trán, mái tóc</b>. Từ ngữ chỉ <b>đặc điểm</b> cho biết chúng thế nào: <b>đen láy, bầu bĩnh, cao, mượt mà</b>.',
        ex: ['Đôi mắt <b>đen láy</b>.', 'Mái tóc <b>đen nhánh</b>.'],
      },
      {
        icon: '😊', color: '#7C3AED', title: 'Câu nêu đặc điểm',
        text: 'Câu nêu đặc điểm trả lời câu hỏi <b>Ai (cái gì, con gì) thế nào?</b>',
        ex: ['Mái tóc <u>óng mượt</u>.', 'Khuôn mặt <u>bầu bĩnh</u>.'],
      },
      {
        icon: '🪥', color: '#0891B2', title: 'Kể theo thứ tự',
        text: 'Kể các việc theo thứ tự, dùng các từ <b>Trước tiên, Tiếp theo, Sau đó, Cuối cùng</b>.',
        ex: ['<b>Trước tiên</b>, em rửa mặt, đánh răng. <b>Tiếp theo</b>, em chải tóc.'],
      },
    ],
    kinds: {
      sv: ['đôi mắt', 'khuôn mặt', 'vầng trán', 'mái tóc', 'cái mũi', 'đôi tai', 'bàn tay', 'đôi má', 'hàm răng'],
      dd: ['mượt mà', 'bầu bĩnh', 'sáng', 'cao', 'đen láy', 'đen nhánh', 'óng mượt', 'hồng hào', 'trắng', 'tự tin', 'nhút nhát'],
    },
    find: [
      { s: 'Mái_tóc óng_mượt*.', k: 'dd' },
      { s: 'Đôi mắt em đen_láy*.', k: 'dd' },
      { s: 'Khuôn_mặt bé bầu_bĩnh*, đôi má hồng_hào*.', k: 'dd' },
      { s: 'Bạn Lan có vầng_trán cao*.', k: 'dd' },
      { s: 'Quang đã trở_nên tự_tin*.', k: 'dd' },
      { s: 'Mái_tóc* của mẹ đen nhánh.', k: 'sv' },
      { s: 'Bé có đôi_mắt* sáng và khuôn_mặt* tròn.', k: 'sv' },
    ],
    sentype: [
      ['Mái tóc óng mượt.', 'dd'],
      ['Đôi mắt đen láy.', 'dd'],
      ['Khuôn mặt bé bầu bĩnh.', 'dd'],
      ['Vầng trán bạn Lan cao.', 'dd'],
      ['Quang rất tự tin.', 'dd'],
      ['Thầy giáo và các bạn động viên Quang.', 'hd'],
      ['Quang tập nói trước lớp.', 'hd'],
      ['Quang là học sinh lớp 2.', 'gt'],
    ],
    question: [
      { s: 'Mái tóc [óng mượt].', q: 'Thế nào' },
      { s: 'Đôi mắt bé [đen láy].', q: 'Thế nào' },
      { s: 'Khuôn mặt em [bầu bĩnh].', q: 'Thế nào' },
      { s: 'Quang [tập nói trước lớp].', q: 'Làm gì' },
      { s: '[Thầy giáo] động viên Quang.', q: 'Ai' },
    ],
    build: [
      'Mái tóc / óng mượt.',
      'Đôi mắt / của bé / đen láy.',
      'Thầy giáo / động viên, / khích lệ Quang.',
      'Quang / đã trở nên / tự tin.',
      'Trước tiên, / em / rửa mặt, đánh răng.',
    ],
    punct: [
      'Rồi gì nữa{?}',
      'Sáng nay em thức dậy lúc mấy giờ{?}',
      'Quang đã trở nên tự tin{.}',
      'Bạn giỏi quá{!}',
      'Bé có đôi mắt đen láy{,} khuôn mặt bầu bĩnh.',
    ],
    fill: [
      { s: 'Lúc đầu, Quang cảm thấy {lúng túng}, ngượng nghịu.', opts: ['lúng túng', 'tự tin', 'vui vẻ'] },
      { s: 'Được thầy và các bạn động viên, Quang trở nên {tự tin}.', opts: ['tự tin', 'nhút nhát', 'buồn bã'] },
      { s: 'Thầy giáo yêu cầu các bạn tập {nói} trước lớp.', opts: ['nói', 'vẽ', 'hát'] },
      { s: 'Đôi mắt bé {đen láy}.', opts: ['đen láy', 'bầu bĩnh', 'óng mượt'] },
    ],
    alpha: ['Sơn', 'Xuân', 'Quân', 'Tuấn', 'Vân', 'Phương', 'Uyên', 'Yến', 'Thảo', 'Phúc'],
    para: [
      { title: 'Việc em làm trước khi đi học', sents: ['Trước tiên, em rửa mặt, đánh răng.', 'Tiếp theo, em chải tóc.', 'Sau đó, em mặc đồng phục.', 'Cuối cùng, em ăn sáng rồi đi học.'] },
      { title: 'Một giờ học', sents: ['Thầy giáo yêu cầu các bạn tập nói trước lớp về bất cứ điều gì mình thích.', 'Quang cảm thấy lúng túng, ngượng nghịu.', 'Thầy giáo và các bạn động viên, khích lệ Quang.', 'Quang đã trở nên tự tin.'] },
    ],
  },

  // ── Bài 7 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 7, title: 'Cây xấu hổ', week: 4, pages: [16, 17],
    learn: ['Từ ngữ chỉ sự vật, hoạt động, đặc điểm', 'Từ chỉ âm thanh', 'Viết về hành trình hạt đỗ'],
    notes: [
      {
        icon: '🌿', color: '#16A34A', title: 'Sự vật và hoạt động',
        text: 'Mỗi sự vật có hoạt động riêng: <b>cây xấu hổ</b> co rúm mình lại, <b>con chim xanh</b> vội bay đi, <b>cây cỏ</b> xuýt xoa.',
      },
      {
        icon: '🔊', color: '#0891B2', title: 'Từ chỉ âm thanh',
        text: 'Có những từ chỉ <b>âm thanh</b>, tiếng động: <b>xôn xao, lạt xạt, ào ào</b>.',
        ex: ['Gió <b>ào ào</b> nổi lên.', 'Những chiếc lá khô <b>lạt xạt</b>.'],
      },
      {
        icon: '🎨', color: '#EA580C', title: 'Sự vật và đặc điểm',
        text: 'Sự vật: <b>cây xấu hổ, con chim xanh, cành thanh mai, gió</b>. Đặc điểm: <b>xanh biếc, lóng lánh, đẹp</b>.',
      },
    ],
    kinds: {
      sv: ['cây xấu hổ', 'con chim xanh', 'cành thanh mai', 'cây cỏ', 'gió', 'chiếc lá', 'hạt đỗ', 'mầm cây', 'mặt trời'],
      hd: ['hé mắt nhìn', 'co rúm mình lại', 'vội bay đi', 'đậu', 'xuýt xoa', 'mở bừng', 'nảy mầm', 'vươn lên'],
      dd: ['xanh biếc', 'lóng lánh', 'đẹp', 'xanh tươi', 'khô', 'nhỏ bé', 'rực rỡ'],
    },
    find: [
      { s: 'Cây_xấu_hổ co_rúm* mình lại.', k: 'hd' },
      { s: 'Nó hé* mắt nhìn*.', k: 'hd' },
      { s: 'Con chim_xanh đậu* trên cành thanh_mai rồi vội bay* đi.', k: 'hd' },
      { s: 'Những cây_cỏ xung_quanh xuýt_xoa*.', k: 'hd' },
      { s: 'Con chim xanh_biếc*, toàn_thân lóng_lánh*.', k: 'dd' },
      { s: 'Ồ, đẹp* quá!', k: 'dd' },
      { s: 'Con_chim* đậu trên cành_thanh_mai*.', k: 'sv' },
      { s: 'Gió* thổi, cây_xấu_hổ* co rúm mình lại.', k: 'sv' },
    ],
    match: [
      ['Cây xấu hổ', 'co rúm mình lại.'],
      ['Con chim xanh', 'vội bay đi.'],
      ['Gió', 'ào ào nổi lên.'],
      ['Những chiếc lá khô', 'rơi lạt xạt trên mặt đất.'],
      ['Mặt trời', 'chiếu những tia nắng ấm.'],
    ],
    vocab: {
      name: 'âm thanh và đặc điểm',
      groups: {
        'Từ chỉ âm thanh': ['xôn xao', 'lạt xạt', 'ào ào', 'tích tắc', 'ríu rít', 'róc rách', 'lộp độp'],
        'Từ chỉ đặc điểm': ['xanh biếc', 'lóng lánh', 'đẹp', 'xanh tươi', 'rực rỡ', 'nhỏ xinh'],
      },
      icons: { 'Từ chỉ âm thanh': '🔊', 'Từ chỉ đặc điểm': '🎨' },
    },
    sentype: [
      ['Cây xấu hổ co rúm mình lại.', 'hd'],
      ['Con chim xanh vội bay đi.', 'hd'],
      ['Hạt đỗ nảy mầm.', 'hd'],
      ['Con chim xanh biếc, toàn thân lóng lánh.', 'dd'],
      ['Cành thanh mai rất đẹp.', 'dd'],
      ['Cây xấu hổ là một loài cây nhỏ.', 'gt'],
    ],
    fill: [
      { s: 'Mình rất tiếc vì không được nhìn thấy con chim {xanh biếc}.', opts: ['xanh biếc', 'ào ào', 'xôn xao'] },
      { s: 'Gió {ào ào} nổi lên.', opts: ['ào ào', 'lóng lánh', 'xanh biếc'] },
      { s: 'Con chim xanh đậu trên cành {thanh mai}.', opts: ['thanh mai', 'xấu hổ', 'cây cỏ'] },
      { s: 'Toàn thân con chim {lóng lánh} như tự toả sáng.', opts: ['lóng lánh', 'lạt xạt', 'ào ào'] },
      { s: 'Gặp tiếng động lạ, cây xấu hổ {co rúm mình lại}.', opts: ['co rúm mình lại', 'vội bay đi', 'nở hoa'] },
    ],
    build: [
      'Cây xấu hổ / co rúm / mình lại.',
      'Con chim xanh / đậu / trên cành thanh mai.',
      'Những cây cỏ / xuýt xoa / khen đẹp.',
      'Mình / rất tiếc / vì không được ngắm chim xanh.',
      'Hạt đỗ / nảy mầm / trong lòng đất.',
    ],
    para: [
      { title: 'Hạt đỗ thành cây đỗ', sents: ['Hạt đỗ nằm trong lòng đất.', 'Nhờ có mưa và ánh nắng, hạt đỗ nảy mầm.', 'Mầm đỗ vươn lên, lớn dần thành cây đỗ.', 'Cây đỗ ra hoa rồi kết quả.'] },
      { title: 'Cây xấu hổ', sents: ['Gió ào ào nổi lên, cây xấu hổ co rúm mình lại.', 'Nó hé mắt nhìn, rồi mở bừng những con mắt lá.', 'Con chim xanh biếc đã vội bay đi.', 'Cây xấu hổ tiếc quá.'] },
    ],
  },

  // ── Bài 8 ─────────────────────────────────────────────────────────────────────────────────────
  {
    n: 8, title: 'Cầu thủ dự bị', week: 4, pages: [17, 19],
    learn: ['Viết hoa tên riêng', 'Xếp tên theo bảng chữ cái', 'Câu nêu hoạt động', 'Kể về hoạt động thể thao, trò chơi'],
    notes: [
      {
        icon: '🔠', color: '#BE185D', title: 'Viết hoa tên riêng',
        text: 'Tên riêng của người phải viết hoa chữ cái đầu của <b>mỗi tiếng</b>.',
        ex: ['<b>H</b>ồng, <b>H</b>ùng, <b>P</b>hương, <b>G</b>iang', '<b>N</b>guyễn <b>N</b>gọc <b>A</b>nh'],
      },
      {
        icon: '🔡', color: '#0EA5E9', title: 'Xếp tên theo bảng chữ cái',
        text: 'Xếp họ và tên theo bảng chữ cái: nhìn chữ cái đầu của <b>tên</b> (tiếng cuối).',
        ex: ['Nguyễn Ngọc <b>A</b>nh, Hoàng Văn <b>C</b>ường, Phạm Hồng <b>Đ</b>ào, Lê Gia <b>H</b>uy, Nguyễn Mạnh <b>V</b>ũ'],
      },
      {
        icon: '⚽', color: '#16A34A', title: 'Câu nêu hoạt động',
        text: 'Câu nêu hoạt động trả lời câu hỏi <b>Ai (con gì) làm gì?</b>',
        ex: ['Các bạn <u>chơi trốn tìm</u>.', 'Cô giáo <u>dạy chúng em hát</u>.'],
      },
    ],
    kinds: {
      sv: ['gấu con', 'quả bóng', 'sân bóng', 'cầu thủ', 'đội bóng', 'cô giáo', 'con mèo', 'con chuột', 'vợt', 'bàn bóng'],
      hd: ['đá bóng', 'nhặt bóng', 'chạy', 'tập luyện', 'chơi trốn tìm', 'đuổi', 'dạy hát', 'đánh cầu lông', 'ném bóng', 'kéo co'],
    },
    find: [
      { s: 'Gấu con chạy* đi nhặt* bóng.', k: 'hd' },
      { s: 'Các bạn chơi* trốn tìm.', k: 'hd' },
      { s: 'Con mèo đuổi* theo con chuột.', k: 'hd' },
      { s: 'Cô giáo dạy* chúng em hát*.', k: 'hd' },
      { s: 'Hai bạn đang đánh* cầu_lông.', k: 'hd' },
      { s: 'Gấu_con* đá quả_bóng* vào khung thành.', k: 'sv' },
    ],
    sentype: [
      ['Các bạn chơi trốn tìm.', 'hd'],
      ['Con mèo đuổi theo con chuột.', 'hd'],
      ['Cô giáo dạy chúng em hát.', 'hd'],
      ['Hai bạn đang chơi bóng bàn.', 'hd'],
      ['Các bạn đang chơi bóng rổ.', 'hd'],
      ['Gấu con chăm chỉ tập luyện.', 'hd'],
      ['Gấu con là cầu thủ dự bị.', 'gt'],
      ['Gấu con đá bóng rất giỏi.', 'dd'],
    ],
    match: [
      ['Các bạn', 'chơi trốn tìm.'],
      ['Con mèo', 'đuổi theo con chuột.'],
      ['Cô giáo', 'dạy chúng em hát.'],
      ['Chú gà trống', 'gáy ò ó o.'],
      ['Chú chó', 'sủa gâu gâu.'],
    ],
    build: [
      'Các bạn / chơi / trốn tìm.',
      'Cô giáo / dạy / chúng em hát.',
      'Con mèo / đuổi theo / con chuột.',
      'Hai bạn / đang chơi / bóng bàn.',
      'Gấu con / chạy đi / nhặt bóng.',
      'Giờ ra chơi, / chúng em / chơi kéo co.',
    ],
    question: [
      { s: '[Các bạn] chơi trốn tìm.', q: 'Ai' },
      { s: 'Các bạn [chơi trốn tìm].', q: 'Làm gì' },
      { s: 'Con mèo [đuổi theo con chuột].', q: 'Làm gì' },
      { s: '[Cô giáo] dạy chúng em hát.', q: 'Ai' },
      { s: 'Cô giáo [dạy chúng em hát].', q: 'Làm gì' },
    ],
    vocab: {
      name: 'thể thao và trò chơi',
      groups: {
        'Môn thể thao': ['bóng đá', 'bóng bàn', 'cầu lông', 'bóng rổ', 'bơi', 'chạy'],
        'Trò chơi dân gian': ['bịt mắt bắt dê', 'rồng rắn lên mây', 'kéo co', 'nhảy dây', 'ô ăn quan', 'chi chi chành chành', 'nu na nu nống'],
      },
      icons: { 'Môn thể thao': '⚽', 'Trò chơi dân gian': '🪢' },
    },
    caps: ['Hồng', 'Hùng', 'Phương', 'Giang', 'Minh', 'Thuỷ', 'Nguyễn Ngọc Anh', 'Nguyễn Mạnh Vũ', 'Phạm Hồng Đào', 'Hoàng Văn Cường', 'Lê Gia Huy'],
    alpha: ['Anh', 'Vũ', 'Đào', 'Cường', 'Huy', 'Hồng', 'Hùng', 'Phương', 'Giang', 'Minh', 'Thuỷ'],
    fill: [
      { s: 'Cả hai đội đều muốn gấu con về đội vì gấu con đã {đá bóng giỏi}.', opts: ['đá bóng giỏi', 'nhặt bóng', 'chạy chậm'] },
      { s: 'Lúc đầu, gấu con làm {cầu thủ dự bị}.', opts: ['cầu thủ dự bị', 'trọng tài', 'thủ môn'] },
      { s: 'Hai bạn đang chơi {bóng bàn}.', opts: ['bóng bàn', 'trốn tìm', 'kéo co'] },
      { s: 'Một bạn bịt mắt, các bạn khác chạy quanh. Đó là trò {bịt mắt bắt dê}.', opts: ['bịt mắt bắt dê', 'kéo co', 'nhảy dây'] },
    ],
    para: [
      { title: 'Trò chơi kéo co', sents: ['Giờ ra chơi, em chơi kéo co.', 'Em chơi cùng các bạn trong lớp ở sân trường.', 'Hai đội nắm chặt sợi dây và kéo thật mạnh.', 'Em thấy rất vui và khoẻ khoắn.'] },
      { title: 'Cầu thủ dự bị', sents: ['Gấu con chơi bóng chưa giỏi nên làm cầu thủ dự bị.', 'Gấu chạy đi nhặt bóng cho các bạn.', 'Ngày nào gấu cũng chăm chỉ tập luyện.', 'Cuối cùng, cả hai đội đều muốn gấu con về đội của mình.'] },
    ],
  },
];
