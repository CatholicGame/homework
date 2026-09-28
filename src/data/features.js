/**
 * Cờ bật/tắt tính năng chưa phát hành.
 * `import.meta.env.DEV`: chỉ có ở bản dev (npm run dev); bản build production bỏ hẳn phần code sau cờ.
 */

// Trò chơi tăng cường Toán 3 (docs/lop_3/thiet-ke-tro-choi-tap1.md).
// Đã phát hành 2026-09-28 (Chợ phiên: 5 quầy). Muốn tạm ẩn lại trên production: đổi thành import.meta.env.DEV.
export const GRADE3_GAMES = true;
