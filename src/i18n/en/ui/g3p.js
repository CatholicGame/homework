/** Luyện Tập Toán 3: chữ giao diện của menu theo tuần (grade3Practice.js → renderWorkbook) — Việt → Anh. */
export default {
  entries: {
    'Chọn tuần để luyện tập:': 'Choose a week to practice:',
    '{0} câu — {1} tuần hiện có': '{0} questions, {1} weeks',
    'Có trò chơi luyện tuần này': 'This week has a practice game',
    'tuần': 'week',
    'Tuần…': 'Week…',
    '🎮 Chơi trò chơi luyện tuần này': '🎮 Play a game to practice this week',
    '🏠 Chọn tuần khác': '🏠 Choose another week',
    'Tuần {0}': 'Week {0}',
    // Tên trò chơi Lớp 3 (chip "Chơi …" ở menu tuần)
    'Quầy trái cây': 'Fruit stall',
    'Tiệm bánh': 'Bakery',
    'Kiến trúc sư bảng ghim': 'Pinboard architect',
    'Thám tử góc vuông': 'Right angle detective',
    'Quầy may ruy băng': 'Ribbon stall',
    'Xe chở hàng': 'Delivery trucks',
    'Máy phóng to – thu nhỏ': 'Enlarge and shrink machine',
    'Quầy nước chanh': 'Lemonade stall',
    'Rô-bốt biểu thức': 'Expression Robot',
    // Săn chim (birds.js): hai quầy
    'Lưới và lồng': 'Net and cages',
    'Ná cao su': 'Slingshot',
  },
  patterns: [
    // "Tuần 3. Bảng nhân 4, …" (cfg.unitName): dịch phần tên tuần.
    [/^Tuần (\d+)\. (.+)$/, (m, tr) => { const t = tr(m[2]); return t == null ? null : `Week ${m[1]}. ${t}`; }],
    [/^Tuần (\d+)$/, (m) => `Week ${m[1]}`],
  ],
};
