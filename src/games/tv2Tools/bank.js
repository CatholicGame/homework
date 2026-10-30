/**
 * Kho từ ngữ, câu chung của 🧰 Tiếng Việt 2: Công cụ. Chỉ dùng ở dải "🧰 Luyện theo công cụ" (gộp với dữ liệu mọi bài)
 * để đề không lặp; Luyện tập của từng bài chỉ dùng dữ liệu của bài đó. Định dạng: docs/lop_3/sgk_tv3_tap1/thiet-ke-cong-cu.md §3.
 */

export const BANK = {
  kinds: {
    sv: ['cô giáo', 'học sinh', 'bác sĩ', 'ông', 'bà', 'em bé', 'con mèo', 'con gà', 'con chó', 'con cá', 'cái bàn', 'cái ghế', 'quyển vở',
      'bút chì', 'cặp sách', 'quả bóng', 'búp bê', 'cây bàng', 'bông hoa', 'ông mặt trời', 'sân trường', 'lớp học'],
    hd: ['chạy', 'nhảy dây', 'đọc sách', 'viết bài', 'quét nhà', 'tưới cây', 'nấu cơm', 'hát', 'múa', 'bơi', 'đá bóng', 'thả diều',
      'rửa bát', 'vẽ tranh', 'đi học', 'chơi đùa', 'ăn cơm', 'tập thể dục', 'gấp quần áo', 'nhặt rau'],
    dd: ['xanh', 'đỏ', 'vàng', 'trắng', 'cao', 'thấp', 'tròn', 'nhỏ xíu', 'to', 'dài', 'ngắn', 'thơm', 'ngọt', 'chua', 'mềm', 'cứng',
      'chăm chỉ', 'hiền lành', 'ngoan', 'nhanh nhẹn', 'sạch sẽ', 'đông vui'],
  },
  find: [
    { s: 'Buổi_sáng, ông tưới* cây ngoài vườn.', k: 'hd' },
    { s: 'Chú gà_trống vỗ* cánh rồi gáy* vang.', k: 'hd' },
    { s: 'Mẹ nấu* cơm, chị quét* nhà.', k: 'hd' },
    { s: 'Em đọc* truyện cho bé nghe.', k: 'hd' },
    { s: 'Bầu_trời hôm_nay xanh_ngắt*.', k: 'dd' },
    { s: 'Quả cam chín_vàng*, ngọt_lịm*.', k: 'dd' },
    { s: 'Chú mèo có bộ lông mềm_mượt*.', k: 'dd' },
    { s: 'Đàn_cò* bay trên cánh_đồng*.', k: 'sv' },
    { s: 'Bà* mua cho em một chiếc_mũ* mới.', k: 'sv' },
    { s: 'Em xếp sách_vở* vào cặp*.', k: 'sv' },
  ],
  sentype: [
    ['Bố em là bác sĩ.', 'gt'], ['Đây là lớp học của em.', 'gt'], ['Mèo Mướp là bạn của em.', 'gt'], ['Bạn Hà là lớp trưởng.', 'gt'],
    ['Các bạn đang tập thể dục.', 'hd'], ['Ông em đọc báo.', 'hd'], ['Đàn chim bay về tổ.', 'hd'], ['Em giúp mẹ nhặt rau.', 'hd'],
    ['Cánh đồng lúa vàng óng.', 'dd'], ['Bộ lông của chú mèo mềm mại.', 'dd'], ['Lớp học của em rất sạch sẽ.', 'dd'], ['Bạn Nam rất chăm chỉ.', 'dd'],
  ],
  build: [
    'Mẹ / đưa em / đến trường.', 'Bạn Lan / là / lớp trưởng.', 'Những bông hoa / nở / rất đẹp.',
    'Chúng em / chăm chú / nghe cô giảng bài.', 'Ông em / trồng / một cây bưởi.', 'Bầu trời / hôm nay / trong xanh.',
  ],
  match: [
    ['Đàn cá', 'bơi lội tung tăng.'], ['Chú gà trống', 'gáy vang ò ó o.'], ['Những chú ong', 'bay đi hút mật.'],
    ['Cô giáo', 'đang giảng bài.'], ['Bác nông dân', 'đang cày ruộng.'], ['Chú mèo', 'nằm sưởi nắng.'],
  ],
  punct: [
    'Bạn tên là gì{?}', 'Ôi, chiếc diều đẹp quá{!}', 'Sáng nào em cũng dậy sớm{.}', 'Em thích đọc truyện{,} vẽ tranh và hát.',
    'Bao giờ lớp mình đi tham quan{?}', 'Em là học sinh lớp 2{.}', 'Vườn nhà bà có cam{,} bưởi và xoài.',
  ],
  antonym: [['cao', 'thấp'], ['to', 'nhỏ'], ['dài', 'ngắn'], ['nóng', 'lạnh'], ['vui', 'buồn'], ['nhanh', 'chậm'], ['sáng', 'tối'],
    ['mới', 'cũ'], ['chăm chỉ', 'lười biếng'], ['đầy', 'vơi']],
  question: [
    { s: '[Bạn Nam] đang tưới cây.', q: 'Ai' }, { s: 'Bạn Nam [đang tưới cây].', q: 'Làm gì' }, { s: 'Bông hoa hồng [đỏ thắm].', q: 'Thế nào' },
    { s: 'Mẹ em là [cô giáo].', q: 'Là gì', not: ['Ai'] }, { s: '[Con mèo] nằm ngủ trên ghế.', q: 'Con gì' },
  ],
  caps: ['Hà Nội', 'Đà Nẵng', 'Huế', 'Nguyễn Văn An', 'Trần Thị Mai', 'Hạ Long', 'Lê Minh Khang', 'Phạm Thu Hà'],
  alpha: ['An', 'Bình', 'Cúc', 'Dũng', 'Đào', 'Giang', 'Hà', 'Khánh', 'Lan', 'Minh', 'Nam', 'Oanh', 'Phúc', 'Quang', 'Sơn', 'Tú', 'Uyên', 'Vy', 'Xuân', 'Yến'],
};
