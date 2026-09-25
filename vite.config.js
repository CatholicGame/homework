import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  server: {
    port: 5173,
    open: true,
    // Sách nguồn PDF (bản quét lớn) không phải mã nguồn — đừng theo dõi, tránh lỗi EBUSY khi file đang mở/chép.
    watch: { ignored: ['**/docs/**'] }
  },
  build: {
    outDir: 'dist',
    // Hình SVG vẽ lại từ sách luôn là file riêng (không nhúng vào JS): trang phóng to
    // cần tra ngược URL → ảnh gốc, và gói JS chính không phình vì ~100 hình.
    assetsInlineLimit: (file) => (file.endsWith('.svg') ? false : undefined)
  }
});
