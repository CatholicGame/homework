# Đấu Trường Nhí: dựng máy chủ phòng để chơi cùng người thật

Hướng dẫn từng bước, từ thử trên một máy, thử nhiều máy trong nhà (cùng Wi-Fi), tới chạy thật trên Internet (Cloudflare + Vercel).
Viết ngày 2026-11-08, theo mã ở `realtime/` và `src/dauTruong/`.

> **Đọc trước mục 0.** Máy chủ phòng hiện mới đồng bộ phần **vào phòng** (ai vào, ngồi ghế nào, nhân vật, tên, công tắc lên bục,
> giờ bắt đầu). Còn **vòng thi** (câu hỏi, đồng hồ, điểm) thì mỗi máy vẫn tự chạy bản mẫu riêng. Muốn mọi người thi chung một
> chương trình thì phải làm thêm `realtime/arena.js` (mục 7).

---

## 0. Hiện đồng bộ được gì

| Phần | Đồng bộ giữa các máy? | Ghi chú |
|---|---|---|
| Ai đang trong phòng, ghế, nhân vật, tên MC gọi | **Có** | Máy chủ giữ ghế: hai bạn không ngồi trùng ghế; rớt mạng nối lại vẫn giữ ghế |
| Công tắc "Em muốn lên bục" | **Có** (máy chủ đếm) | Nhưng chưa xếp bục chung, xem dòng dưới |
| Giờ bắt đầu, đếm ngược, phòng mở / đóng | **Có** | Theo lịch `SLOTS` trong `src/dauTruong/rules.js` (tạm 19:30 mỗi ngày, lớp 1–5) |
| Bạn ảo trong khán phòng | **Giống nhau** trên mọi máy | Mỗi máy tự tính nhưng cùng hạt giống (phòng + giờ bắt đầu), nên cùng bạn, cùng ghế |
| Bạn ảo được mời lên bục | Giống nhau | Cùng thứ tự mời trên mọi máy |
| Hai bạn thật cùng muốn lên bục | **Chưa** | Mỗi máy chỉ đưa chính mình lên bục 1. Hai bạn sẽ thấy hai đội hình khác nhau |
| Câu hỏi, đồng hồ câu, đáp án, điểm thí sinh, điểm khán giả | **Chưa** | Mỗi máy chạy bản mẫu vòng thi riêng (câu và điểm khác nhau) |

Như vậy, sau khi làm theo hướng dẫn này, mọi người **vào chung một phòng và thấy nhau** trong khán phòng. Còn phần thi chung
thì chờ mục 7.

---

## 1. Chuẩn bị

- Node.js 20 trở lên (máy dev đang dùng Node 24).
- Cài thư viện một lần:
  ```bash
  npm install                    # thư mục homework
  cd realtime && npm install     # máy chủ phòng
  ```
- Tài khoản **Cloudflare** (gói miễn phí dùng được: Durable Object kiểu SQLite) và quyền sửa biến môi trường trên **Vercel**
  (dự án `mathtieuhoc`). Chỉ cần cho mục 4–5.

---

## 2. Thử trên một máy

1. Mở hai cửa sổ dòng lệnh.
2. Cửa sổ 1, máy chủ phòng:
   ```bash
   cd realtime
   npm run dev
   ```
   Thấy dòng `Phòng Gặp gỡ online (dev): ws://localhost:8787/room/<khoá>` là chạy.
3. Cửa sổ 2, trang web:
   ```bash
   npm run dev
   ```
   Mở `http://localhost:5173`.
4. Đăng nhập tài khoản admin (thẻ 🏆 Đấu Trường Nhí hiện chỉ admin thấy, mục 6), vào lớp 1–5, 🎮 Challenge games, 🏆, bấm
   **Vào trường quay**.
5. Mở thêm một cửa sổ **ẩn danh** (hoặc trình duyệt khác), vào như bước 4 với tên khác. Hai cửa sổ thấy nhau trong sơ đồ ghế.

Máy dev không theo lịch: phòng bắt đầu khi đủ 4 bạn trên bục (bạn ảo được mời dần), chậm nhất 90 giây sau người đầu tiên.
Muốn theo lịch thật: `ARENA_DEMO=0 npm run dev` (trong `realtime/`).

**Kiểm tra máy chủ đúng bản:** mở `http://localhost:8787/status/arena-g3` khi đang có người trong phòng `arena-g3`. Bản đúng trả
về có `"need":0` và `startIn`. Nếu trong trường quay sơ đồ ghế vẫn chạy nhưng không thấy bạn khác, xem mục 8.

---

## 3. Thử nhiều máy trong nhà (cùng Wi-Fi)

Điện thoại, máy tính bảng của các bạn nhỏ cùng mạng Wi-Fi với máy dev.

1. Tìm địa chỉ IP của máy dev: `ipconfig` (Windows), dòng **IPv4 Address**, ví dụ `192.168.1.20`.
2. Chạy máy chủ phòng như mục 2 (nó nghe mọi địa chỉ, cổng 8787).
3. Chạy trang web cho máy khác vào được:
   ```bash
   npx vite --host
   ```
4. Trên điện thoại mở `http://192.168.1.20:5173`. Trang dev tự nối tới `ws://192.168.1.20:8787` (cùng tên máy với trang).
5. Windows hỏi tường lửa cho Node.js: chọn **Cho phép** trên mạng riêng (Private). Không hỏi mà điện thoại không vào được: mở
   Windows Defender Firewall, cho phép `node.exe` (cổng 5173 và 8787).

Lưu ý: trình duyệt điện thoại có thể không cho bật toàn màn hình trên `http://`. Chơi vẫn được, chỉ không tự xoay ngang.

---

## 4. Đưa máy chủ phòng lên Internet (Cloudflare Worker)

Máy chủ phòng là Worker `thandong-rooms` (dùng chung cho Đấu Trường Nhí và 🎤 Ai tài năng nhất). Mỗi phòng (`arena-g3`,
`studio-g3`…) là một Durable Object.

1. Đăng nhập Cloudflare từ máy dev (mở trình duyệt để xác nhận):
   ```bash
   cd realtime
   npx wrangler login
   ```
2. Xem lại `realtime/wrangler.toml`:
   - `ALLOWED_ORIGINS`: các trang được phép nối, cách nhau dấu phẩy, `*` thay một phần tên miền. Đang là
     `https://mathtieuhoc.vercel.app,https://mathtieuhoc*.vercel.app`. Có tên miền riêng thì thêm vào.
   - `MIN_PLAYERS` (tuỳ chọn, trong `[vars]`): chỉ dùng cho trường quay Ai tài năng nhất, Đấu Trường Nhí không dùng.
3. Chạy kiểm thử rồi đẩy lên:
   ```bash
   npm test
   npm run deploy
   ```
   Cuối lệnh có địa chỉ, ví dụ `https://thandong-rooms.<tài-khoản>.workers.dev`.
4. Thử nhanh: mở `https://thandong-rooms.<tài-khoản>.workers.dev/status/arena-g3`, thấy một dòng JSON là được.

Trên Worker, phòng `arena-g<lớp>` **theo lịch thật**: mở 15 phút trước giờ (`OPEN_BEFORE`), diễn 45 phút (`LIVE_MS`), ngoài giờ
không nhận ai (trang báo "Phòng chưa mở hoặc lượt đã xong").

---

## 5. Nối trang web với máy chủ phòng (Vercel)

1. Vercel, dự án `mathtieuhoc`, **Settings → Environment Variables**, thêm:
   ```
   VITE_ROOMS_URL = wss://thandong-rooms.<tài-khoản>.workers.dev
   ```
   (dùng `wss://`, không có `/` ở cuối). Chọn cả Production và Preview.
2. **Deploy lại** (biến `VITE_…` chỉ có hiệu lực lúc build).
3. Không đặt biến này thì bản web chơi một mình với bạn ảo (không nối máy chủ).

---

## 6. Mở cho học sinh và đặt lịch

1. **Mở thẻ cho mọi người:** trong `src/data/grades.js`, thẻ `DAUTRUONG` đang có `admin: true` (chỉ admin thấy). Bỏ cờ này khi
   muốn học sinh vào. Có thể đổi `title` bỏ chữ "(bản mẫu 3D)".
2. **Lịch:** sửa `SLOTS` trong `src/dauTruong/rules.js`, ví dụ:
   ```js
   export const SLOTS = [
     { at: '19:30', days: [1, 3, 5], grades: [3] },        // thứ Hai, Tư, Sáu, lớp 3
     { at: '20:00', days: [6, 0], grades: [1, 2, 4, 5] },  // thứ Bảy, Chủ nhật
   ];
   ```
   `days`: 0 = Chủ nhật, 1 = thứ Hai… Giờ là giờ Việt Nam. **Đổi lịch thì deploy cả Worker (mục 4) lẫn web (mục 5)**, vì máy chủ và
   trang cùng đọc tệp này. (Sau này thay bằng tab 📅 Lịch của admin, thiết kế mục 12.)
3. **Đổi giao thức:** sửa tin nhắn giữa trang và máy chủ thì tăng `ARENA_PROTO` trong `rules.js` và deploy hai bên cùng lúc. Trang
   cũ sẽ được báo tải lại.
4. **Phòng thử nội bộ** (admin thử trên bản thật, không chờ lịch): đăng nhập tài khoản admin, mở bảng điều khiển trình duyệt (F12)
   và gõ `sessionStorage.setItem('td-online-test', '1')`, tải lại trang. Tab đó vào phòng `arena-g<lớp>-test`: vào lúc nào cũng
   được, đủ 4 bục là bắt đầu. Đóng tab là về phòng thật. (Chưa có nút bật trong giao diện.)

---

## 7. Việc còn lại để thi chung thật sự (`realtime/arena.js`)

Cần làm để mọi máy thấy cùng một chương trình (thiết kế mục 10):

1. **Máy chủ cầm chương trình:** lớp `Arena` trong `realtime/arena.js` giữ vòng, câu hỏi, đồng hồ, chuông, điểm; gửi `A` (trạng thái)
   và `R` (lật đáp án); nhận `ans`, `bell`, `lvl`, `x2`, `go` (MC đọc xong).
2. **Bục chung:** máy chủ xếp 4 bục: người thật bật công tắc trước, rồi bạn ảo (gọi `podiumAt` trong `src/dauTruong/npc.js`). Mỗi
   máy nhận danh sách bục từ máy chủ thay vì tự tính.
3. **Bạn ảo trên máy chủ:** chuyển phần trả lời (`decide`, `buzzPlan`, `pickPackage`, `wantStar`) lên máy chủ, mỗi câu bốc một lần.
   `npc.js` không import gì của trình duyệt nên máy chủ import thẳng được (đã kiểm tra bằng Node).
4. **Trang:** `src/games/dauTruong.js` vẽ theo `A`/`R` từ máy chủ thay vì tự chạy vòng (hiện `goLive` trong `flow.js` chỉ gọi
   `api.setMode('open')` để chạy bản mẫu).
5. **Kiểm thử:** `realtime/test-arena.mjs` chạy cả lượt (đủ 4 người, thiếu người, rớt mạng giữa câu, hòa điểm, không ai trả lời).

---

## 8. Gặp lỗi thường gặp

| Hiện tượng | Nguyên nhân | Cách sửa |
|---|---|---|
| "Không kết nối được tới trường quay" | Máy chủ phòng chưa chạy | `cd realtime && npm run dev` (dev) hoặc kiểm tra `VITE_ROOMS_URL` (bản thật) |
| Vào được nhưng không thấy bạn khác, không có đếm ngược của máy chủ | Cổng 8787 đang có **máy chủ khác** (ví dụ máy chủ phòng của dự án kinh-thanh, hay bản homework cũ chưa có phòng `arena`). Trang vẫn chạy bằng đồng hồ trên máy nên trông như bình thường | Tắt tiến trình đang chiếm 8787 rồi chạy lại mục 2. Hoặc chạy `PORT=8788 npm run dev` và thêm `VITE_ROOMS_URL=ws://localhost:8788` vào `.env.local`, chạy lại `npm run dev` của web |
| Bản thật báo 403 / không nối | Tên miền trang không có trong `ALLOWED_ORIGINS` | Thêm tên miền vào `wrangler.toml`, `npm run deploy` |
| "Phòng chưa mở hoặc lượt đã xong" | Ngoài lịch `SLOTS` | Chờ giờ, sửa lịch (mục 6.2), hoặc dùng phòng thử (mục 6.4) |
| Trang báo cần tải lại | `ARENA_PROTO` của trang và máy chủ khác nhau | Deploy cả hai bên cùng bản |
| Phòng đầy | 50 người một phòng (`capOf`) | Máy tự chuyển sang phòng `arena-g<lớp>~2` |

Xem cổng 8787 do tiến trình nào giữ (Windows PowerShell):
```powershell
Get-NetTCPConnection -LocalPort 8787 -State Listen | Select-Object OwningProcess
```

---

## 9. Tệp liên quan

| Tệp | Việc |
|---|---|
| `realtime/worker.js` | Worker Cloudflare: nhận `wss://…/room/<khoá>`, kiểm tra tên miền, `GET /status/<khoá>` |
| `realtime/dev.mjs` | Máy chủ phòng trên máy dev (Node + ws), cùng logic |
| `realtime/room.js` | Logic phòng: ghế, người, phòng `arena` (lịch, `want`, `start`) |
| `realtime/wrangler.toml` | Tên Worker, `ALLOWED_ORIGINS`, Durable Object |
| `src/thanDong/church/net.js` | Phía trang: nối, nối lại, giữ ghế; đọc `VITE_ROOMS_URL` |
| `src/dauTruong/rules.js` | Lịch `SLOTS`, `ARENA_PROTO`, ghế, dùng chung trang và máy chủ |
| `src/dauTruong/flow.js` | Vào phòng: nhân vật, ghế, thẻ chờ, bạn ảo, tự bắt đầu khi đủ bục |
| `src/dauTruong/npc.js` | Bạn ảo (dùng được cả trên máy chủ) |
| `docs/dau-truong/thiet-ke.md` | Thiết kế đầy đủ (mục 4b bạn ảo, mục 10 máy chủ, mục 12 lịch) |
