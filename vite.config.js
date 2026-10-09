import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import { existsSync } from 'node:fs';

// `npm run dev`: chạy luôn các hàm /api/* (trên production là Vercel Functions) — đọc
// GOOGLE_CLIENT_SECRET từ .env.local. Chưa có biến này thì app đăng nhập kiểu cũ (popup, token 1 giờ).
function devApi(mode) {
  return {
    name: 'dev-api',
    configureServer(server) {
      Object.assign(process.env, loadEnv(mode, process.cwd(), ''));
      server.middlewares.use(async (req, res, next) => {
        const m = req.url.match(/^\/api\/([\w/-]+?)\/?(?:\?|$)/);
        const file = m && `/api/${m[1]}.js`;
        if (!file || m[1].startsWith('_') || !existsSync(`.${file}`)) return next();
        try {
          const mod = await server.ssrLoadModule(file);
          await mod.default(req, res);
        } catch (e) {
          console.error(e);
          res.statusCode = 500;
          res.end(String(e));
        }
      });
    },
  };
}

export default defineConfig(({ command, mode }) => ({
  root: '.',
  plugins: command === 'serve' ? [devApi(mode)] : [],
  publicDir: 'public',
  // Bản build: thay danh sách ảnh scan gốc của sách bằng module rỗng — production không có
  // nút "📷 Ảnh gốc" và không đóng gói ảnh scan (src/engine/origImages.js).
  resolve: command === 'build'
    ? { alias: [{ find: /^\.\/origImages\.js$/, replacement: fileURLToPath(new URL('./src/engine/origImages.prod.js', import.meta.url)) }] }
    : {},
  server: {
    port: 5173,
    open: true,
    // Sách nguồn PDF (bản quét lớn) không phải mã nguồn — đừng theo dõi, tránh lỗi EBUSY khi file đang mở/chép.
    // scripts/.tmp: ảnh chụp, hồ sơ Chrome của các lần thử (file bị khoá làm dev server dừng).
    watch: { ignored: ['**/docs/**', '**/scripts/.tmp/**'] }
  },
  build: {
    outDir: 'dist',
    // Hình SVG vẽ lại từ sách luôn là file riêng (không nhúng vào JS): trang phóng to
    // cần tra ngược URL → ảnh gốc, và gói JS chính không phình vì ~100 hình.
    assetsInlineLimit: (file) => (file.endsWith('.svg') ? false : undefined)
  }
}));
