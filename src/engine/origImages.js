// Ảnh scan gốc của sách (thư mục orig/) cho nút "📷 Ảnh gốc" — CHỈ bản dev.
// Khi build, vite.config.js thay module này bằng origImages.prod.js (rỗng): bản production
// không có nút "Ảnh gốc" và không đóng gói ảnh scan.
export default import.meta.glob('../assets/grade[23]-*/orig/*.png', { query: '?url', import: 'default' });
