# 🎤 Ai là thần đồng? (lớp 1–5)

Đấu trường toán học kiểu game show trong trường quay 3D, chép từ "Ai là môn đệ thông thái?" của kinh-thanh
(`E:\ManC\kinh-thanh`: `src/church`, `src/quiz`, `realtime/`). Cách chơi giữ nguyên: chọn ghế trong khán phòng, đăng ký chơi,
lên ghế nóng, 15 câu từ dễ tới khó, mốc câu 5 và câu 10, bốn quyền trợ giúp (50:50, khán giả, bỏ qua, người thân), khán giả
cùng trả lời từng câu, giấy khen từ câu 10.

## Khác với bản kinh-thanh

| Phần | kinh-thanh | homework |
|---|---|---|
| Câu hỏi | 15 tệp JSON Kinh Thánh | sinh theo lớp: `src/thanDong/quiz/bank/g1.js … g5.js` (15 bậc mỗi lớp), kiểm tra `node scripts/thandong-check.mjs` |
| Thưởng | Hạt giống | Sao (sổ sao chung `engine/stars.js`, khoá `thandong<lớp>:hot:<lượt>` và `thandong<lớp>:aud:<ngày>:<n>`) |
| Thang thưởng | 0 → 100 hạt | `HOT` trong `quiz/rules.js`: 0 → 30 sao |
| Vật phẩm, Tủ đồ | đổi bằng hạt | đổi bằng sao: giỏ = tổng sao − sao đã đổi (`bag.paid`), `PRICE_K = 2` |
| Đồ, nhân vật | có đồ tôn giáo, đồ theo mùa phụng vụ | bỏ đồ tôn giáo (`wardrobe.js` cuối ITEMS), thêm Học sinh nam / nữ khăn quàng đỏ |
| MC | tu sĩ (priest.glb), giọng Azure | Thầy Minh dựng từ avatar (`HOST_LOOK`, to hơn 1,3 lần), giọng đọc của máy (`thanDong/engine/voice.js`) |
| Màn hình lớn | ảnh poster | vẽ bằng canvas (`posterArt` trong studio.js) |
| Ghế khán phòng | ghế vàng xếp hình thánh giá | tô cùng màu ghế thường (studio.js `PLAIN`) |
| Phòng | `studio` | `studio-g1` … `studio-g5` (bạn cùng lớp vào chung phòng) |
| Giấy khen | séc Mc 4,20 | `thanDong/pages/cheque.js` (π, thước, compa) |

Giao diện: luôn là bản mặc định "Tươi sáng" (sunny) của kinh-thanh. `churchSunny.css` dùng `:root:not([data-td-dark])` thay cho
`:root[data-theme="sunny"]` (cùng độ ưu tiên), `church.css` đặt bảng màu sáng của kinh-thanh trên `body:has(.ch), .ch` (chỉ khi trường
quay mở), font Be Vietnam Pro + Nunito nạp cùng world.js. Dải câu hỏi, thang sao, thẻ kết quả, giấy khen giữ kiểu truyền hình tối
như kinh-thanh. Sảnh (`thanDong.css` .td-card) theo thẻ chỗ "Gặp gỡ online" (.chs-card): nền kem, thẻ trắng, nút cam nhạt.

Túi đồ (`thandong-bag-v1@<id>`) đồng bộ Firestore qua `cloudSync.js` (SCOPED).

## Tệp

- `src/games/thanDong.js`: sảnh (ảnh trường quay, 4 bước chơi, nút "Vào trường quay"), mở `renderChurch(app, { place: 'studio', grade })`.
- `src/thanDong/church/*`: bộ máy 3D chép từ kinh-thanh (world.js còn mã Sài Gòn / Vatican nhưng trường quay không dùng).
- `src/thanDong/engine/*`, `pages/*`: lớp nối thay cho engine của kinh-thanh (tài khoản, sao, giọng, lịch, chia sẻ).
- `realtime/`: máy chủ phòng (Cloudflare Worker + Durable Object), `realtime/questions.js` rút câu theo lớp.
- `public/thandong/`: studio.glb, studio_layout.json, avatar.glb, draco/, cover-studio.jpg.
- `main.js`: `render()` trả hàm dọn thì `navigate` gọi khi rời trang (`pageDispose`).

## Hai chế độ

- **Chưa có máy chủ phòng** (không đặt `VITE_ROOMS_URL` lúc build): chơi một mình với thầy MC (quizDev `solo`).
- **Có máy chủ phòng**: nhiều người, máy chủ cầm chương trình. Ván bắt đầu khi đủ `MIN_PLAYERS` người thật (mặc định 5,
  đặt trong `realtime/wrangler.toml [vars] MIN_PLAYERS`).

## Deploy máy chủ phòng (chưa làm)

1. `cd realtime && npx wrangler login && npx wrangler deploy` (Worker tên `thandong-rooms`, `ALLOWED_ORIGINS` trong wrangler.toml).
2. Vercel: biến môi trường `VITE_ROOMS_URL = wss://thandong-rooms.<tài khoản>.workers.dev` rồi build lại.
3. Đổi giao thức (`PROTO` trong `quiz/rules.js`) thì deploy Worker cùng lúc với web.

## Thử

- Dev: `npm run dev` + `cd realtime && npm run dev` (cổng 8787, 1 người là đủ). `?solo` = chơi một mình trong bản dev.
- `node scripts/.tmp/td-open.mjs`, `td-play.mjs` (trực tuyến), `td-solo.mjs` (một mình), `td-shop.mjs` (Tủ đồ, Vật phẩm).
- `cd realtime && npm test`.
