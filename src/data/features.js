/**
 * Cờ bật/tắt tính năng chưa phát hành.
 * `import.meta.env.DEV`: chỉ có ở bản dev (npm run dev); bản build production bỏ hẳn phần code sau cờ.
 */

// Trò chơi tăng cường Toán 3 (docs/lop_3/thiet-ke-tro-choi-tap1.md).
// Đã phát hành 2026-09-28 (Chợ phiên: 5 quầy). Muốn tạm ẩn lại trên production: đổi thành import.meta.env.DEV.
export const GRADE3_GAMES = true;

// Trò chơi tăng cường Toán 2 (docs/lop_2/thiet-ke-tro-choi.md).
// Đã phát hành 2026-09-29 (🐸 Ếch nhảy tia số, Chợ phiên 2 quầy). Muốn tạm ẩn lại trên production: đổi thành import.meta.env.DEV.
export const GRADE2_GAMES = true;

// 🏝️ Đảo Trí Nhớ (docs/thiet-ke-tro-choi-tri-nho.md): trò trí nhớ ôn kiến thức, đang làm (giai đoạn 1: Bãi Lật Thẻ lớp 3).
// Chỉ hiện ở bản dev; bật production khi chốt: đổi thành true.
export const MEMORY_ISLAND = import.meta.env.DEV;

// Trò chơi tăng cường Toán 4 (docs/lop_4/thiet-ke-tro-choi.md): 🛤️ Kỹ sư đường sắt, 🏙️ Bản đồ dân số, 🚚 Trạm cân nông sản.
// Đã phát hành 2026-10-11. Muốn tạm ẩn lại trên production: đổi thành import.meta.env.DEV.
export const GRADE4_GAMES = true;

// 🏘️ Phố Kỹ Năng (docs/ky-nang-song/thiet-ke.md): truyện tương tác kỹ năng sống, một thẻ chung cho mọi lớp.
// Đợt 1 (3 truyện) chỉ hiện ở bản dev; bật production khi chốt: đổi thành true.
export const LIFE_SKILLS = import.meta.env.DEV;
