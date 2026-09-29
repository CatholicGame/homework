# Thiết kế trò chơi tăng cường — Toán 2 (Tập 1 + Tập 2)

> Trạng thái (2026-09-29): 🐸 Ếch nhảy tia số và Chợ phiên (quầy trứng cấp 1; quầy trái cây đã gỡ, xem dưới §4) đã phát hành trên production (cờ `GRADE2_GAMES = true`). 🚌 Xe buýt lên xuống đã code (cấp 1–5, chưa push). 🥕 Quầy rau củ cấp 1–4 (nặng nhẹ, so với 1 kg, cân kg, cộng trừ kg) đã code (chưa push), thay quầy trái cây ở Bài 15; quầy trứng thu hẹp còn hộp 2, 5 quả (chưa push). Các trò khác chưa code. Câu hỏi còn mở ở [§9](#9-câu-hỏi-cần-chốt).
>
> Nguồn nội dung: Vở Bài tập Toán 2 Tập 1 (Bài 1–36, `src/games/grade2Workbook.js`) và Tập 2 (Bài 37–75, `src/games/grade2Workbook2.js`), bộ Kết nối tri thức.
> Khung chung dùng lại của Toán 3: [docs/lop_3/thiet-ke-tro-choi-tap1.md](../lop_3/thiet-ke-tro-choi-tap1.md).

---

## 1. Mục tiêu và nguyên tắc chung

- **Mục tiêu:** học xong một bài, bé vào một trò nhập vai để **dùng** kiến thức (đi xe buýt, bán hàng, chia kẹo, hẹn giờ…), không chỉ điền đáp số.
- **Đúng phạm vi đã học:**
  - Tập 1: số đến **100**; cộng, trừ qua 10 trong phạm vi 20; cộng, trừ có nhớ trong phạm vi 100; kg, lít; điểm, đoạn thẳng, đường gấp khúc, tứ giác; giờ, ngày, tháng.
  - Tập 2: phép nhân, phép chia **chỉ bảng 2 và bảng 5**; số đến **1 000**; cộng, trừ trong phạm vi 1 000; dm, m, km; tiền Việt Nam; khối trụ, khối cầu; kiểm đếm, biểu đồ tranh, chắc chắn – có thể – không thể.
  - Cấp nào dùng Tập 2 thì không xuất hiện trong gợi ý của các bài Tập 1.
- **Là trò chơi, không phải bài kiểm tra** (giống lớp 3): một ván = chuỗi nhiệm vụ, mỗi thao tác chỉ **thành công** / **thất bại**, cuối ván tổng kết. Chơi lại thì đổi số, đổi đồ vật, đổi khách.
- **Bé tự làm chủ:** mọi thao tác có nút tự xác nhận ("Cân xong", "Xếp xong", "Đặt giờ xong"…) có sẵn từ đầu; app **không báo trước** lúc đúng (không tô xanh, không hiện nút khi đạt). Đúng hay sai chỉ lộ ra sau khi bé xác nhận.
- **Bé lớp 2 đọc còn chậm:** câu yêu cầu ngắn, luôn có **giọng đọc** (TTS + fallback của phần Tiền tiểu học) và nút 🔊 đọc lại; hướng dẫn bằng dải biểu tượng + chuyển động gợi ý, ít chữ. Lời NPC không dùng "nhé", kết câu bằng "!" hoặc ".".
- **Mọi thứ đều chuyển động:** đồ vật bay (`fly.js flyOne`), cảnh phản ứng khi hạ xuống. Máy tắt hiệu ứng (`prefers-reduced-motion`) thì chạy bản êm, **không bỏ** chuyển động dạy học (ví dụ ếch vẫn nhảy từng bước tới 10).
- **Số liệu sát thực tế:** cân nặng, dung tích, giá tiền, số người trên xe như ngoài đời.
- **Không để khoảng trống:** màn dọc xếp khay trên – cảnh dưới; chỗ trống thì phóng to đồ vật / NPC.
- **Đồ hoạ tự vẽ** theo đúng phong cách đã duyệt: dụng cụ đo chép từ `scripts/redraw/kit_*.py` (cân Rô-béc-van, ca đong, đồng hồ, thước), NPC chibi mềm như bộ `npc-sheet*.png`. Không dùng hình có bản quyền, không logo.

---

## 2. Kỹ năng trọng tâm

| Mã | Nhóm kỹ năng | Bài (Vở BT) | Tập |
|---|---|---|---|
| **A** | Số đến 100: tia số, liền trước / liền sau, so sánh | 1, 2 | 1 |
| **B** | Thành phần phép cộng, phép trừ; hơn, kém nhau bao nhiêu | 3, 4 | 1 |
| **C** | Cộng, trừ **qua 10** trong phạm vi 20; bảng cộng, bảng trừ | 7, 8, 11, 12 | 1 |
| **D** | Bài toán thêm / bớt, nhiều hơn / ít hơn | 9, 13 | 1 |
| **E** | Cộng, trừ **có nhớ** trong phạm vi 100 | 19, 20, 22, 23 | 1 |
| **F** | Ki-lô-gam, lít | 15, 16, 17 | 1 |
| **G** | Điểm, đoạn thẳng, đường thẳng, đường cong, ba điểm thẳng hàng, đường gấp khúc, tứ giác | 25, 26, 27 | 1 |
| **H** | Giờ, phút, ngày, tháng; xem đồng hồ, xem lịch | 29, 30, 31 | 1 |
| **I** | Phép nhân, thừa số – tích, bảng nhân 2, 5 | 37, 38, 39, 40 | 2 |
| **K** | Phép chia, số bị chia – số chia – thương, bảng chia 2, 5 | 41, 42, 43, 44 | 2 |
| **L** | Khối trụ, khối cầu | 46 | 2 |
| **M** | Trăm, chục, đơn vị; số tròn trăm, tròn chục; số có ba chữ số; so sánh | 48–53 | 2 |
| **N** | Đề-xi-mét, mét, ki-lô-mét | 55 | 2 |
| **P** | Tiền Việt Nam | 56 | 2 |
| **Q** | Cộng, trừ (không nhớ / có nhớ) trong phạm vi 1 000 | 59–62 | 2 |
| **R** | Kiểm đếm, biểu đồ tranh, chắc chắn – có thể – không thể | 64–67 | 2 |
| — | Luyện tập chung / Ôn tập | 5, 6, 10, 14, 18, 21, 24, 28, 32–36, 45, 47, 54, 58, 63, 68–75 | |

Bài Luyện tập chung / Ôn tập chỉ nằm ở `also` (gợi ý khi có câu cùng kỹ năng) và dùng chế độ **"Trộn đề"**. Bài 57 (đo đồ vật thật) không có trong app nên không gắn.

---

## 3. Vào trò chơi, thông tin kiến thức, vòng lặp chơi

Giống hệt lớp 3 (§3 tài liệu lớp 3), chỉ khác:

- **Nút "🎮 Trò chơi tăng cường"** ở menu bài của **cả hai thẻ** Vở BT Toán 2 Tập Một và Tập Hai. Hai thẻ dùng **chung một danh sách trò**; trò / cấp nào chỉ thuộc Tập 2 vẫn hiện ở Tập 1 (không khóa) nhưng thẻ giới thiệu ghi rõ *"phù hợp nếu em đã học Bài 39: Bảng nhân 2 — Vở bài tập Tập Hai"*.
- **"📖 Xem lại Bài …"** mở đúng thẻ sách (Bài 1–36 → `grade2-workbook`, Bài 37–75 → `grade2-workbook-2`).
- **Làm xong một bài** → khung **"🎮 Chơi trò chơi luyện bài này"** với các cấp có bài đó trong `lessons` / `also` (như lớp 3).
- **Tiến độ "✓ Em đã làm bài này"** đọc `g2w-progress-v1` và `g2w2-progress-v1`.
- **Ván ngắn hơn lớp 3:** 5 nhiệm vụ / ván (lớp 3 có trò 6), mỗi nhiệm vụ tối đa 2 bước.

---

## 4. Danh sách trò chơi

| # | Trò | Kỹ năng | Bài liên quan | Dùng lại của lớp 3 | Ưu tiên |
|---|---|---|---|---|---|
| 1 | 🐸 **Ếch nhảy tia số** | A, B, C, E | 2, 3, 7, 8, 11, 12, 19–23 | khung quầy, máy tính | ⭐ 1 |
| 2 | 🚌 **Xe buýt lên xuống** | B, D, E, Q | 3, 4, 9, 13, 19–23, 59–62 | khung quầy, NPC khách | 2 |
| 3 | 🏪 **Chợ phiên nhí** (3 quầy) | F, P | 15, 16, 17, 56 | quầy trái cây, quầy nước chanh | 3 |
| 4 | 🎂 **Tiệc sinh nhật chia kẹo** | I, K | 37–44 | quầy trứng (đóng hộp) | 4 |
| 5 | ⏰ **Đồng hồ hẹn giờ & Tờ lịch** | H | 29, 30, 31 | — (đồng hồ chép `kit` đồng hồ của Vở BT) | 5 |
| 6 | 🏭 **Xưởng đóng gói trăm – chục** | M, Q | 48–53, 59–62 | xe chở hàng (thùng bay) | 6 |
| 7 | 🐜 **Chú kiến tìm đường** | G, N | 25, 26, 27, 55 | thước + kính lúp của quầy ruy băng | 7 |
| 8 | 📊 **Phóng viên nhí** | R | 64–67 | — | 8 |
| 9 | 🎳 **Thử lăn khối hình** | L | 46 | — | 9 |

Ngoài ra **gắn thêm vào sách lớp 2** các cấp lớp 3 vốn ghi "kiến thức lớp 2": 🥚 Trứng cấp 1 → Bài 39, 40 (gợi ý thêm ở Bài 37 Phép nhân, 38 Thừa số, tích, 45 Luyện tập chung), **thu hẹp còn hộp 2 quả và 5 quả, 2–10 hộp** (bản lớp 3 có hộp 10 quả, mà lớp 2 chỉ học bảng nhân 2, 5). Thẻ chọn quầy của lớp 2 ghi bài học ("📚 Bài 39, 40", `stallLessons` của hub); bài ở thẻ sách kia vẫn ghi số (đọc từ mã `bai-39`). Không cần code mới: `only(game, id, over)` trong `src/games/grade2Games.js` lấy tên cấp, bài học theo catalog lớp 2 và ghi đè `sizes`, `boxes`.

> **Bỏ hẳn quầy trái cây lớp 3 khỏi sách lớp 2 (chốt 2026-09-29).** Cấp 1 của nó bắt bé cộng quả cân 1, 2, 5 kg rồi **tính tiền** 20 hoặc 50 nghìn đồng × số kg (nhân số tròn chục, tiền hàng trăm nghìn: kiến thức lớp 3). Bài 15 tiết 1 mới học nặng hơn, nhẹ hơn trên cân. Bài 15 dùng 🥕 Quầy rau củ (§4.3); cân kg của lớp 2 sẽ là cấp 2 quầy rau củ (không tính tiền). Giữ dòng sao `g2games:fruit-1` trong starRatings.js để sao bé đã nhận vẫn được tính.

Mỗi trò dưới đây có: **câu chuyện**, **luồng một nhiệm vụ**, **các cấp**, **sinh đề**, **khi sai**, **đồ hoạ**.

---

### 4.1 🐸 Ếch nhảy tia số

**Câu chuyện:** Chú ếch Xanh muốn qua suối trên hàng lá sen đánh số. Bạn NPC đứng ở bờ bên kia, nhờ bé đưa ếch tới đúng lá. Ếch chỉ nhảy khi bé **chọn bước nhảy** (thẻ +1 … +9, +10, +20…) — mỗi cú nhảy bay theo đường vòng, lá sen chìm nhẹ khi ếch đáp.

**Luồng một nhiệm vụ:**
1. NPC nói: *"Đưa ếch từ lá 8 tới lá 8 + 5!"* (kèm phép tính trên biển gỗ).
2. Bé kéo / chạm thẻ bước nhảy. Ếch nhảy ngay theo từng thẻ, có thể nhảy nhiều lần.
3. Bé gõ kết quả vào máy tính (hoặc chạm lá đích ở cấp dễ), rồi bấm **"✓ Tới nơi"**.
4. Kiểm chứng: dãy cú nhảy vừa làm hiện thành phép tính dưới tia số (*8 + 2 + 3 = 13*).

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Bài 2 | Tia số 0–20 rồi 0–100 (theo chục): tìm **số liền trước / liền sau**, lá nằm giữa hai lá | "Ếch đang ở 39. Nhảy tới số liền sau!" → 40 |
| 2 | Bài 7, 8 | **Cộng qua 10**: bắt buộc ghé lá 10 — lá 10 là lá to có bông sen, nhảy vượt qua 10 trong một cú thì ếch rơi xuống nước (thất bại + mẹo "Tách 5 = 2 + 3, nhảy tới 10 trước") | 8 + 5: +2 tới 10, +3 tới 13 |
| 3 | Bài 11, 12 | **Trừ qua 10**: nhảy lùi, ghé lá 10 | 13 − 5: −3 tới 10, −2 tới 8 |
| 4 | Bài 3 | **Tìm số hạng / số trừ**: "Ếch ở 9, muốn tới 16. Nhảy mấy?" → bé chỉ được **một** cú nhảy, chọn thẻ rồi xác nhận | 16 − 9 = 7 → thẻ +7 |
| 5 | Bài 19–23 | **Có nhớ trong phạm vi 100**: tia số 0–100 có thẻ +10, +20… và +1…+9; khuyến khích nhảy tròn chục trước | 45 + 27: +20 tới 65, +5 tới 70, +2 tới 72 |

- **Sinh đề:** cấp 2–3 luôn qua 10 (a + b > 10, a, b ≤ 9); cấp 5 luôn có nhớ, kết quả ≤ 100. Cấp 1 xen kẽ liền trước / liền sau / "ở giữa".
- **Khi sai:** ếch rơi xuống nước (chuyển động bắn nước, ếch ngoi lên đứng lại lá cũ), NPC nói lý do; lời giải chạy lại các cú nhảy đúng.
- **Đồ hoạ:** suối, hàng lá sen (lá tròn chục to hơn, có số đậm), ếch 3 tư thế (ngồi, nhảy, ướt), thẻ bước nhảy, biển gỗ.

**Đã làm (bản dev, 2026-09-29):** cả 5 cấp — `src/games/grade2Games/frog.js`, CSS `styles.js`, lá sen vẽ SVG `art/pond.js`, ếch cắt từ tranh của bạn (`scripts/g2games/frog-ref/sheet.png` → `cut_sprites.py` → `src/assets/grade2-games/frog/{sit,worry,jump,wet}.webp`). Chơi thử không cần đăng nhập: `npm run dev` rồi mở `/g2games-dev.html` (`?tap=2` cho Tập Hai).

| Cấp | Tên | Nhiệm vụ |
|---|---|---|
| 1 | Liền trước, liền sau | Hàng 9 lá quanh một số 10–99, 3–4 lá không ghi số (luôn có lá đích); bé **chạm lá** để ếch nhảy tới. Xen kẽ *liền sau / liền trước / ở giữa* |
| 2 | Cộng qua 10 | a + b (a 3–9, tổng 11–18), thẻ +1…+9; nhảy vượt qua lá 10 thì ếch rơi xuống nước |
| 3 | Trừ qua 10 | a − b (a 11–18, hiệu ≤ 9), thẻ −1…−9, cũng phải dừng ở lá 10 |
| 4 | Nhảy mấy bước? | Lá đích cắm cờ 🚩, chỉ **một** lần nhảy: s + ? = t / s − ? = t (xen kẽ), thẻ theo chiều nhảy |
| 5 | Nhảy xa có nhớ | Tia số 0–100, cộng / trừ có nhớ (xen kẽ), số thứ hai có 1 hoặc 2 chữ số; thẻ 1…9 và 10, 20, 30 dùng nhiều lần |

- Bấm "✓ Tới nơi" khi chưa nhảy → bạn nhỏ nhắc, thẻ rung (cấp 1: lá nhún). Chạm lá ở cấp dùng thẻ → nhắc chọn thẻ.
- Khi sai: đường nhảy đúng hiện bằng nét đứt cam kèm nhãn ±k, khung nhìn lùi lại cho thấy cả đoạn; mẹo tách số ("Tách 5 = 2 + 3…").
- Khung nhìn trượt theo ếch khi hàng lá dài hơn màn hình; **vuốt ngang** mặt suối để xem lá ở xa. Màn dọc thấy khoảng 5 lá to.
- Chợ phiên của bé trong sách lớp 2: 🥕 quầy rau củ cấp 1 (Bài 15, của lớp 2) và quầy trứng cấp 1 bản thu hẹp hộp 2, 5 quả (Bài 39, 40) của trò lớp 3, sao ghi vào lớp 2 (`g2games:veg-1`, `g2games:egg-1`).

---

### 4.2 🚌 Xe buýt lên xuống

**Câu chuyện:** Bé là phụ xe. Xe buýt có ghế xếp **hàng 10** (mỗi hàng 10 ghế, cách giữa sau ghế thứ 5) để đếm theo chục. Tới mỗi trạm có khách lên, khách xuống.

**Luồng một nhiệm vụ:**
1. Xe dừng ở trạm, bác tài (NPC) hỏi: *"Xe đang có 12 người. Lên thêm 5 người. Bây giờ xe có bao nhiêu người?"*
2. Bé **gõ số trước** vào máy đếm khách.
3. Bé bấm **"🚪 Mở cửa"** → khách lần lượt đi lên / đi xuống (bay vào ghế trống đầu tiên / rời ghế), máy đếm chạy.
4. Đúng → xe chạy tiếp, còi vui. Sai → số trên máy đếm và số bé gõ hiện cạnh nhau, bác tài nhắc mẹo.

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Bài 9 | **Thêm, bớt** một số đơn vị (≤ 20) | 12 người, lên 5 → 17 |
| 2 | Bài 13 | **Nhiều hơn, ít hơn**: hai xe đỗ cạnh nhau | Xe xanh 15 người, xe đỏ nhiều hơn 4 người → 19 |
| 3 | Bài 4 | **Hơn, kém nhau bao nhiêu**: bé ghép từng cặp ghế hai xe (khách xe này nối dây với khách xe kia), đếm phần thừa | 23 và 17 → hơn nhau 6 người |
| 4 | Bài 3 | **Tìm thành phần**: "Xe có 30 người, tới trạm còn 22 người. Mấy người đã xuống?" · "Xuống 6 người thì còn 14. Lúc đầu có mấy người?" | 8 · 20 |
| 5 | Bài 19–23 | **Có nhớ trong phạm vi 100**: xe hai tầng / tàu hỏa nhiều toa (mỗi toa 10 ghế × 4 hàng) | 38 người, xuống 19 → 19 |
| 6 | Bài 59–62 | **Phạm vi 1 000**: tàu hỏa đường dài, ghi số khách mỗi toa theo trăm | Tàu có 456 khách, ga này lên 138 → 594 |

- **Sinh đề:** số người không vượt số ghế (xe 30 ghế; xe hai tầng 60; tàu tới 999). Bài toán "ít hơn" không để kết quả âm.
- **Khi sai:** gõ thiếu → còn khách đứng ở cửa không có ghế; gõ thừa → ghế trống bị viền đỏ. Mẹo: *"Lên xe là thêm, xuống xe là bớt."*
- **Đồ hoạ:** xe buýt nhìn ngang có cửa sổ trong suốt (thấy ghế), trạm chờ, xe hai tầng, tàu hỏa; khách dùng NPC chibi thu nhỏ.

**Đã làm (2026-09-29):** cấp 1–5 — `src/games/grade2Games/bus.js`, hình SVG `art/bus.js`, CSS `injectBusStyles` trong `styles.js`. Dùng khung quầy Chợ phiên (`mountStall`, theme `bus`, không có cameo), người giao việc là Bác Ba tài xế.

| Cấp | Tên | Nhiệm vụ | Nút kiểm chứng |
|---|---|---|---|
| 1 | Lên xe, xuống xe | Xe 2 tầng 20 ghế (hàng 10), có a người, lên / xuống k người (xen kẽ, phần lớn qua 10) | 🚪 Mở cửa: khách bay lên ghế / xuống đứng ở trạm, bảng đếm chạy theo từng người |
| 2 | Nhiều hơn, ít hơn | Xe xanh a người, xe đỏ nhiều hơn / ít hơn d người, xe đỏ kéo rèm kín | 🪟 Mở rèm từng cửa sổ; phần hơn được tô vàng và đánh số 1, 2, 3… |
| 3 | Hơn kém mấy người? | Hai xe a, b người; hỏi "nhiều hơn mấy" / "ít hơn mấy" xen kẽ | 🔗 Ghép cặp ghế cùng chỗ của hai xe, người không có cặp được đánh số |
| 4 | Mấy người lên, xuống? | "Có a, còn c: mấy người xuống?" / "Có a, cần đủ c: mấy người nữa lên?" (trạm đứng chờ nhiều hơn số cần) | 🚪 Mở cửa, người lên / xuống được đánh số |
| 5 | Tàu hỏa có nhớ | Tàu 5 toa × 20 ghế + đầu máy có bảng đếm; lên / xuống có nhớ trong phạm vi 100 | 🚪 Mở cửa |

- Bé gõ số trước (nút kiểm chứng mờ, bấm sớm thì bác tài nhắc và máy tính rung), OK xong nút mới nhún.
- Sai: ghế thừa (gõ nhiều) viền đỏ nét đứt, người ngồi quá số bé gõ (gõ ít) viền đỏ; hoá đơn hiện đáp số thật. Đúng: xe / tàu chạy đi.
- Chưa làm: cấp 6 (phạm vi 1 000, Tập 2).

---

### 4.3 🏪 Chợ phiên nhí

Dùng lại khung `mountStall` của Chợ phiên lớp 3, **bản dễ hơn**, số nhỏ, không tính giá theo phép nhân.

#### Quầy 🥔 Rau củ — cân ki-lô-gam (Bài 15, 17)

| Cấp | Nội dung | Ví dụ |
|---|---|---|
| 1 ✅ | Cân **so sánh** (Bài 15 tiết 1, chưa có số): khách đưa hai nhóm rau củ, bé chạm từng khay cho món bay lên đĩa cân, cân nghiêng; cả hai món đã lên cân mới hiện ba câu như vở *nhẹ hơn / nặng hơn / nặng bằng*. 5 lượt: lượt đầu lệch rõ, có 1 lượt nặng bằng, 1 lượt món to mà nhẹ (bó rau muống) | "3 củ khoai lang và 4 củ su hào: bên nào nặng hơn?" |
| 2 ✅ | **So với 1 kg** (Bài 15 tiết 2, "Con thỏ nặng hơn 1 kg?"): rau củ lên một đĩa, quả cân 1 kg lên đĩa kia, chọn *nặng hơn / nhẹ hơn / nặng bằng 1 kg*. 5 lượt có đủ ba trường hợp | "4 củ su hào nặng hơn 1 kg." |
| 3 ✅ | **Cân mấy ki-lô-gam?** (Bài 15 tiết 3 câu 2, Bài 17): túi gạo / túi đường / bao khoai chưa biết cân nặng; bé đặt túi lên cân, thêm, bớt quả cân 5, 2, 2, 1, 1 kg (chạm quả cân trên đĩa để nhấc xuống), tự bấm "Cân xong" (app không báo trước), rồi gõ số kg. Túi được treo thẻ số kg vừa cân | Cân thăng bằng với 5 kg + 1 kg → gõ 6 |
| 4 ✅ | **Cộng, trừ ki-lô-gam** (Bài 15 tiết 3, Bài 17, 18): hai túi có thẻ số kg; "Cả hai túi nặng bao nhiêu?" / "Túi gạo nặng hơn túi đường mấy kg?" / "… nhẹ hơn … mấy kg?". Bé gõ số trước, rồi cân kiểm chứng: cộng thì hai túi lên đĩa trái, quả cân đúng số bé gõ (bộ 10, 5, 2, 2, 1 kg) lên đĩa phải; trừ thì túi nặng một bên, túi nhẹ và quả cân bên kia. Thăng bằng là đúng | Túi gạo 10 kg + bao khoai 5 kg → 15 kg |

Bỏ ý "chọn quả cân cho đúng số khách mua rồi nhặt củ" (giống trái cây lớp 3): vở lớp 2 không có dạng này, dạng của vở là *đọc cân* (túi nặng bằng tổng các quả cân) và *cộng, trừ số đo kg*.

Củ quả thật: khoai lang (≈ 250 g), bí đỏ (1–3 kg), bắp cải (≈ 1 kg), bao gạo 5 / 10 kg. Không ghi cân nặng trên củ.

**Đã làm cấp 1 (2026-09-29):** `src/games/grade2Games/veg.js`, hình SVG `art/veg.js` (bí đỏ 2 kg, bắp cải 1 kg, su hào 500 g, khoai lang / bắp ngô / bó rau muống 250 g, cà rốt / cà chua 125 g: số tròn để có cặp nặng bằng nhau), CSS `injectVegStyles` trong `styles.js`. Dùng `mountStall` (theme `veg`, không máy tính tiền, không cameo) và cân `mountScale` với `tight` + `setRightSvg` (thêm vào `grade3Games/art/scale.js`). Hai khay vẽ cùng tỉ lệ để củ to trông to.

**Đã làm cấp 2–4 (2026-09-29):** cùng file `veg.js` (`mountCompare` cho cấp 1–2, `mountWeigh`, `mountAddSub`); túi hàng SVG `bagArt` trong `art/veg.js` (bao gạo 5–10 kg, túi đường 1–3 kg, bao khoai 2–6 kg, vẽ to theo căn bậc hai số kg); thêm quả cân 10 kg vào `grade3Games/art/weights.js`. Khay túi + quả cân cùng một tỉ lệ, vừa một hàng cả trên điện thoại dọc (`--hmax`, `--wsum`, container query).

#### Quầy 💧 Nước — lít (Bài 16, 17)

| Cấp | Nội dung | Ví dụ |
|---|---|---|
| 1 | Rót đầy **can 2 l, 3 l, 5 l** bằng **ca 1 l**: bé bấm giữ vòi rót đầy ca, rồi chạm để đổ ca vào can; đếm số ca | "Rót đầy can 5 lít" → 5 ca |
| 2 | Chọn can phù hợp / so sánh: can nào chứa nhiều hơn; "Can 5 l đã có 2 l. Rót thêm mấy lít cho đầy?" | 3 l |

Dùng ca đong và vòi của quầy nước chanh; vạch trên can chỉ theo lít (không có ml).

**Đã làm (2026-09-29):** 3 cấp trong `src/games/grade2Games/water.js`, hình SVG `art/water.js` (thùng nước có vòi, ca 1 l lấy từ ca đong lớp 3, can, xô, bình, chai, cốc, ấm, thùng có vạch lít), CSS `injectWaterStyles`. Theme `water`, không cameo.

| Cấp | Tên | Nhiệm vụ |
|---|---|---|
| 1 | Đong bằng ca 1 lít (Bài 16, 17) | Xen kẽ: **rót đầy can 2–6 l** (can ghi số lít) và **đồ đựng chứa mấy lít** (xô, bình, ấm chưa ghi số: rót đầy rồi gõ số lít). Bấm giữ vòi, ca đầy tới vạch 1 l thì vòi tự khoá; chạm ca (hoặc nút) để đổ; ca chưa đầy thì không cho đổ. Bé tự bấm "Đầy rồi"; đổ thêm khi đã đầy thì nước tràn ra sàn, lượt đó thất bại. Dưới cảnh đếm "Đã đổ: 1, 2, 3 ca" |
| 2 | Nhiều hơn, ít hơn 1 lít (Bài 16 tiết 1 câu 1) | Đồ đựng có sẵn nước đổ vào ca 1 l (dừng khi ca tới vạch 1 l), rồi chọn câu như vở: *… đựng nhiều hơn / ít hơn / đúng 1 l nước*. Có lượt bình, xô to mà ít nước hoặc chai thon mà nhiều nước |
| 3 | Cộng, trừ số lít (Bài 16 tiết 2, Bài 18) | Xen kẽ **đổ hai can vào thùng** (a + b ≤ 18) và **can to rót ra đầy can nhỏ** (a − b). Gõ số trước, bấm "Đổ nước kiểm tra": thùng có vạch lít, vạch đúng số lít sáng lên, dấu "?" trên hoá đơn hiện đáp số |

- Khi nghiêng đổ, mặt nước luôn nằm ngang (lớp nước xoay ngược góc nghiêng).
- Khung nhìn ôm sát đồ vật cho cảnh to hết cỡ; màn dọc xếp đồ vật sát nhau hơn.

#### Quầy 🪙 Tạp hóa — tiền Việt Nam (Bài 56, cần chốt §9)

| Cấp | Nội dung | Ví dụ |
|---|---|---|
| 1 | **Chọn tờ tiền** vừa đúng giá (một tờ) | Gói kẹo giá 500 đồng → chọn tờ 500 |
| 2 | **Ghép tờ tiền** cho đủ giá (2–3 tờ), khay tiền có thêm tờ thừa | 700 đồng = 500 + 200 |
| 3 | Tổng hai món (cộng trong phạm vi 1 000, Bài 59–62) rồi trả | Bút chì 200 đồng + tẩy 500 đồng → 700 đồng |

Tờ tiền **vẽ lại đơn giản** (màu và số mệnh giá), không chép mẫu tiền thật.

---

### 4.4 🎂 Tiệc sinh nhật chia kẹo

**Câu chuyện:** Bé chuẩn bị tiệc sinh nhật cho các bạn. Mọi thứ đi theo nhóm: đôi dép (2), bàn tay (5 ngón), đĩa kẹo, túi quà.

| Cấp | Phù hợp khi đã học | Nội dung | Thao tác |
|---|---|---|---|
| 1 | Bài 37 | **Phép nhân là cộng nhiều lần**: "4 đĩa, mỗi đĩa 5 cái kẹo" | Bé chạm từng đĩa → 5 kẹo bay vào; dưới đĩa hiện 5 + 5 + 5 + 5; bé chọn phép nhân **5 × 4** (thẻ bẫy 4 × 5 kèm câu "5 được lấy 4 lần") rồi gõ 20 |
| 2 | Bài 39, 40 | Bảng nhân 2, 5 trong đồ vật thật: đôi tất, bàn tay, bông hoa 5 cánh | "Cần bao nhiêu chiếc tất cho 7 bạn?" → 2 × 7 = 14; kiểm chứng: tất bay vào từng bạn |
| 3 | Bài 41, 43, 44 | **Chia đều**: "15 cái kẹo chia đều cho 5 bạn" | Bé gõ số kẹo mỗi bạn trước, rồi bấm **"Chia"**: kẹo bay lần lượt, mỗi bạn một cái, vòng tới vòng; gõ sai thì thiếu / thừa kẹo lộ ra |
| 4 | Bài 41, 43, 44 | **Chia theo nhóm**: "Có 10 cái bánh, mỗi túi 2 cái. Được mấy túi?" — xen kẽ với cấp 3 để bé phân biệt hai kiểu chia | túi quà hiện đúng số bé gõ, bánh bay vào từng túi |
| 5 | Bài 38, 42 | **Tên thành phần**: kéo nhãn *Thừa số / Tích / Số bị chia / Số chia / Thương* vào phép tính trên bảng tiệc; nhiệm vụ "Tích là 10, một thừa số là 2, thừa số kia là mấy?" | nhãn bay tới đúng chỗ khi thả |

- **Sinh đề:** chỉ bảng 2 và 5, thừa số 1–10; chia luôn chia hết (lớp 2 chưa học chia có dư).
- **Khi sai:** kẹo còn thừa trên đĩa hoặc bạn không đủ kẹo (mặt buồn); mẹo *"Chia đều là mỗi bạn nhận bằng nhau."*
- **Đồ hoạ:** bàn tiệc, bánh kem, đĩa, kẹo nhiều màu, túi quà, đôi tất, găng tay; các bạn dùng NPC trẻ em.

---

### 4.5 ⏰ Đồng hồ hẹn giờ & Tờ lịch

**Câu chuyện:** Bé là "thư ký" của cả nhà: đặt đồng hồ báo thức, ghi lịch hẹn.

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Bài 29 | **Giờ đúng**: kéo kim giờ (kim phút tự đứng số 12) | "Mẹ nhờ đặt báo thức 6 giờ sáng" |
| 2 | Bài 29 | **Giờ rưỡi, 15 phút**: kéo cả hai kim; kim giờ trượt theo kim phút như đồng hồ thật (7 giờ 30 thì kim giờ nằm giữa 7 và 8) | "Xe đón lúc 7 giờ 30 phút" |
| 3 | Bài 29 | **Giờ buổi chiều / tối**: 15 giờ = 3 giờ chiều; chọn cảnh trời (sáng / trưa / chiều / tối) khớp giờ | "20 giờ" → đặt 8 giờ, chọn cảnh tối |
| 4 | Bài 30, 31 | **Tờ lịch tháng**: tìm ngày, thứ; đếm tuần | "Hôm nay thứ Tư ngày 12. Thứ Bảy tuần này là ngày mấy?" → 15 |
| 5 | Bài 30, 31 | Tháng có 30 / 31 ngày; đánh dấu các ngày Chủ nhật; "Còn mấy ngày nữa đến sinh nhật?" | |

- **Tự xác nhận:** nút **"✓ Đặt giờ xong"**; kiểm chứng: đồng hồ reo, con gà gáy / mặt trời lên đúng cảnh.
- **Theo nguyên tắc đã chốt:** kim dừng trước vòng số, không che số nào; kim bám theo nấc 5 phút (cấp 2) để bé không phải chỉnh từng phút.
- **Đồ hoạ:** đồng hồ báo thức (chép kiểu mặt số của Vở BT), 4 cảnh trời, tờ lịch treo tường có thể lật.

---

### 4.6 🏭 Xưởng đóng gói trăm – chục

**Câu chuyện:** Xưởng làm khối gỗ. **10 khối lẻ** đóng thành **1 thanh chục**, **10 thanh** đóng thành **1 tấm trăm**. Khách đặt hàng theo số.

| Cấp | Phù hợp khi đã học | Nội dung | Thao tác |
|---|---|---|---|
| 1 | Bài 48 | **Đóng gói**: băng chuyền đổ ra khối lẻ; bé gom đủ 10 thì bấm **"📦 Đóng thanh"** (gom 9 mà bấm thì máy kêu); đếm được bao nhiêu chục, bao nhiêu trăm | 10 chục → máy ép thành 1 trăm |
| 2 | Bài 49, 50 | **Số tròn chục, tròn trăm**; so sánh hai đơn hàng | "Xe A chở 300 khối, xe B chở 500 khối. Xe nào chở nhiều hơn?" |
| 3 | Bài 51, 52 | **Số có ba chữ số**: đơn hàng đọc bằng chữ, bé lấy tấm, thanh, khối từ kho vào khay giao hàng; rồi viết thành tổng | "Năm trăm linh sáu" → 5 tấm + 6 khối (bẫy: không có thanh chục) → 506 = 500 + 6 |
| 4 | Bài 53 | **So sánh** hai khay: so trăm trước, bằng thì so chục | 362 và 326 |
| 5 | Bài 59–62 | **Cộng, trừ có nhớ trong phạm vi 1 000**: gộp hai khay, đủ 10 khối lẻ thì máy **tự đóng thành 1 thanh** bay sang cột chục (thấy "nhớ 1"); trừ thì **tháo** 1 thanh thành 10 khối | 147 + 35 = 182 |

- **Tự xác nhận:** nút **"🚚 Giao hàng"**; khách đếm lại từng loại, sai thì chỉ ra thiếu/thừa ở loại nào.
- **Đồ hoạ:** khối lẻ, thanh 10, tấm 100 (vẽ phẳng như hình sách), băng chuyền, máy ép, xe tải của trò Xe chở hàng.

---

### 4.7 🐜 Chú kiến tìm đường

**Câu chuyện:** Kiến Vàng tha mồi về tổ qua các cành cây, hòn sỏi. Bé vẽ đường và đo đường cho kiến.

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Bài 25 | **Ba điểm thẳng hàng**: căng sợi chỉ thẳng qua 3 hạt đường; nhận ra đường thẳng / đường cong / đoạn thẳng | "Nối 3 hạt đường sao cho kiến đi thẳng một mạch" |
| 2 | Bài 26 | **Đường gấp khúc**: kiến đi A → B → C → D, bé đặt thước đo từng đoạn (thước bám vạch cm, như quầy ruy băng), gõ độ dài cả đường | 3 cm + 4 cm + 2 cm = 9 cm |
| 3 | Bài 26 | **Chọn đường ngắn hơn** trong 2 đường gấp khúc; đếm **hình tứ giác** trên mạng đường đi | |
| 4 | Bài 27 | **Vẽ đoạn thẳng** dài cho trước trên lưới chấm: kéo từ chấm 0 tới vạch đúng, tự xác nhận | "Vẽ đoạn 6 cm" |
| 5 | Bài 55 | **Bản đồ km** (như bài đảo trong Vở BT): kiến đổi thành tàu thủy đi giữa các đảo; đổi 1 m = 10 dm, 1 km = 1 000 m | "Từ đảo V qua đảo I hết bao nhiêu ki-lô-mét?" |

- **Khi sai:** kiến đi theo đường bé chọn và lộ ra đoạn dài hơn; mẹo *"Cộng độ dài từng đoạn."*
- **Đồ hoạ:** mặt đất nhìn từ trên, kiến, tổ kiến, hạt đường, thước thẳng (chép thước của `kit`), bản đồ đảo.

---

### 4.8 📊 Phóng viên nhí

**Câu chuyện:** Bé làm phóng viên cho báo tường của lớp: đếm, ghi lại, vẽ biểu đồ và dự đoán.

| Cấp | Phù hợp khi đã học | Nội dung | Thao tác |
|---|---|---|---|
| 1 | Bài 64, 67 | **Kiểm đếm**: các con vật / xe cộ chạy qua đường, bé chạm đúng cột để gạch một vạch (//// gạch chéo nhóm 5); cuối lượt gõ số mỗi loại | 12 xe đạp, 7 xe máy… (tốc độ chậm, có nút ⏸) |
| 2 | Bài 65 | **Biểu đồ tranh**: kéo hình con vật vào đúng hàng của biểu đồ theo bảng kiểm đếm; trả lời *nhiều nhất, ít nhất, hơn kém mấy* | |
| 3 | Bài 66 | **Chắc chắn – có thể – không thể**: nhìn túi bi (thấy bên trong), chọn một trong ba thẻ cho câu "lấy được bi đỏ"; rồi bé **bốc thử** 5 lần để thấy kết quả | Túi toàn bi xanh → *không thể* lấy bi đỏ |

- **Sinh đề:** số mỗi loại 2–15; cấp 3 luôn có ít nhất một câu của mỗi loại trong ván.
- **Đồ hoạ:** con đường, xe cộ, thú nuôi; bảng kiểm đếm; khung biểu đồ tranh; túi lưới trong suốt với bi màu.

---

### 4.9 🎳 Thử lăn khối hình

**Câu chuyện:** Sân chơi có dốc trượt. Bé đặt đồ chơi lên dốc để xem cái nào lăn, cái nào trượt, cái nào đứng yên.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 46 | Phân loại đồ vật vào hộp **khối trụ / khối cầu / khối khác**: quả bóng, lon nước, cuộn chỉ, quả cam, hộp sữa, xúc xắc |
| 2 | Bài 46 | **Đoán trước rồi thử**: "Lon nước nằm ngang có lăn không? Dựng đứng thì sao?" → chọn *lăn / không lăn*, rồi đặt lên dốc xem |

- **Đồ hoạ:** dốc trượt, đồ vật 3D góc nhìn chéo (vẽ SVG), hiệu ứng lăn / trượt.
- Trò ngắn, làm cuối.

---

## 5. Phong cách đồ hoạ và âm thanh

- Giữ nguyên bảng màu và phong cách của trò lớp 3; dụng cụ đo **chép từ `scripts/redraw/kit_*.py`** chứ không vẽ kiểu mới.
- **NPC:** dùng lại 9 khách của Chợ phiên + bạn Tí, bạn Na; trò mới cần thêm: **bác tài xe buýt**, **mẹ** (tiệc sinh nhật), **cô phóng viên** — vẽ trên một tờ nhân vật mới cùng phong cách, cắt bằng `cut_npcs.py`, có bản mặt buồn.
- **Âm thanh:** TTS cho lời NPC, tiếng "ting", tiếng còi xe, tiếng ếch, tiếng chuông đồng hồ (dùng lại `fx.js` nếu có).
- **Bước đầu tiên:** vẽ **một cảnh mẫu tĩnh** của Ếch nhảy tia số để bạn duyệt phong cách.

---

## 6. Phần thưởng

Giống lớp 3: sao theo số nhiệm vụ thất bại (0 → ⭐⭐⭐, 1–2 → ⭐⭐, nhiều hơn → ⭐), dòng rating `'g2games:<level-id>'` trong `src/data/starRatings.js`, sao đi vào nhóm lớp 2 của bảng xếp hạng; mỗi ván xong = 1 lượt giải trong quy tắc sticker lớp 2+ (10 lượt = 1 lần quay); kỷ lục mỗi cấp.

---

## 7. Kỹ thuật (dự kiến)

```
src/games/grade2Games.js             ← hub "Trò chơi tăng cường" lớp 2 (có thể là renderGamesHub với cấu hình lớp 2)
src/games/grade2Games/
  catalog.js                          ← nguồn duy nhất: trò, cấp, lessons / also (bai-xx của Tập 1 và Tập 2)
  frog.js  bus.js  kids-market.js  party.js  clock.js  factory.js  ant.js  reporter.js  roll.js
  art/                                ← hình riêng của lớp 2 (lá sen, ếch, xe buýt, khối trăm chục…)
```

- **Dùng chung với lớp 3:** `loop.js` (vòng nhiệm vụ, tổng kết, chơi lại), `market/stall.js` (`mountStall`: NPC, bong bóng, máy tính, thẻ kết quả), `npc.js`, `fly.js`, `mountOrientation`, cân và ca đong trong `art/`. Nếu cần thì tách những file này ra `src/games/gameKit/` để hai lớp cùng import — làm trong một commit riêng và thử lại toàn bộ trò lớp 3 trước khi push.
- **Nút vào:** `renderWorkbook` của `grade2Workbook.js` và `grade2Workbook2.js` nhận `cfg.gamesBook` như sách lớp 3.
- **Cờ phát hành:** `GRADE2_GAMES = import.meta.env.DEV` trong `src/data/features.js`; nạp bằng `import()` động; bật `true` trong commit riêng khi bạn chốt. (Lớp 3 đã lên production nên mọi sửa đổi phần dùng chung phải giữ trò lớp 3 chạy đúng.)
- **Trang dev** `/g2games-dev.html` (không cần đăng nhập) + móc DEV `window.__g2…` để thử bằng Playwright như các trò lớp 3.

---

## 8. Lộ trình

| Giai đoạn | Nội dung | Kết quả |
|---|---|---|
| 0 | Cảnh mẫu tĩnh Ếch nhảy tia số | Duyệt phong cách |
| 1 | Nút vào trong 2 sách lớp 2 + hub + catalog + gắn Trái cây cấp 1, Trứng cấp 1 + 🐸 Ếch nhảy tia số (5 cấp) | Chơi được trọn một trò lớp 2 |
| 2 | 🚌 Xe buýt → 🏪 Chợ phiên nhí → 🎂 Tiệc chia kẹo | Phủ phần lớn Tập 1 và phép nhân, chia Tập 2 |
| 3 | ⏰ Đồng hồ & lịch → 🏭 Xưởng trăm – chục | |
| 4 | 🐜 Chú kiến → 📊 Phóng viên nhí → 🎳 Thử lăn; chế độ "Trộn đề" | Phủ hết Bài 1–75 |
| Phát hành | Bạn chốt → `GRADE2_GAMES = true` | Lên production |

---

## 9. Câu hỏi cần chốt

| # | Vấn đề | Đề xuất |
|---|---|---|
| 1 | **Tiền ở quầy Tạp hóa.** Vở BT Bài 56 dùng tờ 100, 200, 500, 1 000 đồng, nhưng ngoài đời không món nào giá 500 đồng — trái nguyên tắc "số liệu sát thực tế". | Giữ đúng mệnh giá của sách (bé cần nhận biết đúng các tờ đó), bối cảnh là **"chợ đồ chơi của lớp"** với món nhỏ (kẹo, nhãn dán, bút chì) để giá nghe hợp lý. Hoặc bỏ quầy này. |
| 2 | Thứ tự ưu tiên | Như bảng [§4](#4-danh-sách-trò-chơi): Ếch → Xe buýt → Chợ → Tiệc → Đồng hồ → Xưởng → Kiến → Phóng viên → Thử lăn |
| 3 | Số nhiệm vụ mỗi ván | 5 (ngắn hơn lớp 3) |
| 4 | Tách phần dùng chung ra `gameKit/` hay import thẳng từ `grade3Games/` | Import thẳng lúc đầu; tách khi trò lớp 2 thứ hai cần sửa phần chung |
| 5 | Phát hành | Chỉ bản dev tới khi bạn chốt, như lớp 3 lúc đầu |
