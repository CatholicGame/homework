# Thiết kế trò chơi: 🛸 Bảo vệ Trái Đất (Lớp 1 → Lớp 5)

> Trạng thái (2026-10-08): **đã code, chưa commit.** Trò ở `src/games/grade3Drills/ufo.js` (đề, màn chơi, kiểu dáng) + `ufoArt.js` (hình SVG); thẻ riêng ở trang chủ lớp 1–5 (`gradeUfo.js`, `grade{1..5}-ufo` trong `main.js`, `data/grades.js`) và một mục trong Luyện Tính lớp 2–5. Câu hỏi §10 lấy theo đề xuất: lớp 3 viết x, chọn đạn là chính (gõ số cho cấp số lớn), giữ tên, có lớp 1, bắn sai thì tàu bắn trả, vòm khiên nứt thêm (5 vạch).
>
> Cấp: lớp 1 `ufo1:g1-ufo-1..2` (tàu dừng chờ trên khiên), lớp 2 `drill2:d2-ufo-1..3`, lớp 3 `drill:drill-ufo-1..3`, lớp 4 `drill4:d4-ufo-1..3`, lớp 5 `drill5:d5-ufo-1..3`. Mỗi cấp 3 đợt, mỗi đợt 6 đĩa bay (cấp gõ số và lớp 1: 5) + tàu mẹ. Thử nhanh: `scripts/games-preview.html?mod=grade3Drills/ufo.js&game=UFO_GAME&lv=0`, `window.__g3drill.step()` / `.miss()` / `.rush()`.
>
> Còn thiếu so với thiết kế: cảnh mở đầu 3 khung (§2.1) chưa làm, mới có câu Bíp khi vào đợt; chưa có chế độ 🐢 / ⚡ chọn được (tốc độ cố định theo cấp, lớp 1 tàu dừng chờ); bản tiếng Anh chưa có.
>
> Hình minh hoạ nằm ở [docs/bao-ve-trai-dat/](bao-ve-trai-dat/), là **mockup để duyệt ý tưởng**, vẽ bằng SVG theo nét của app (màu phẳng tươi, viền mực `#3F3A40`), chưa phải hình thật trong app.
>
> Khung chung giữ như các trò khác: không khóa, thẻ giới thiệu "phù hợp nếu em đã học Bài …", sao, sticker, bảng xếp hạng. Bố cục theo skill `game-screen-layout`.

| Hình | Nội dung |
|---|---|
| [kich-ban.svg](bao-ve-trai-dat/kich-ban.svg) | 4 khung kịch bản: mở đầu (3 khung) và thắng đợt |
| [man-ngang.svg](bao-ve-trai-dat/man-ngang.svg) | Màn ngang, giữa lượt, lớp 3 tìm x, chế độ Nạp đạn |
| [man-doc.svg](bao-ve-trai-dat/man-doc.svg) | Màn dọc, cùng lúc đó |
| [ban-dung-sai.svg](bao-ve-trai-dat/ban-dung-sai.svg) | Chuỗi khung khi bắn đúng và khi bắn sai |
| [tau-me.svg](bao-ve-trai-dat/tau-me.svg) | Tàu mẹ cuối đợt, lớp 4, biểu thức có hai chữ, mỗi khiên là một bước tính |
| [nhan-vat.svg](bao-ve-trai-dat/nhan-vat.svg) | Bảng nhân vật, đồ vật, biển phép tính theo lớp |

---

## 1. Ý tưởng chính

Một đêm, đoàn đĩa bay của **bọn Zíp Zắp** từ **hành tinh Lộn Xộn** kéo tới cướp các con số của Trái Đất. Mỗi đĩa bay được bọc **khiên**, và khiên chỉ mở bằng một **ổ khoá phép tính** treo dưới bụng tàu, trong đó có **một số bị giấu** (biến số).

Bé là **Đội trưởng** điều khiển **Pháo Ánh Sáng** trên tháp giữa thành phố. Muốn phá khiên, bé phải nạp đúng viên đạn mang **giá trị của số bị giấu**:

```
Ổ khoá:  x − 18 = 27          Đạn bé chọn:  x = 45
Đạn trúng → 45 thay vào chỗ x → 45 − 18 = 27 ✓ → khiên vỡ
```

Điểm dạy học cốt lõi: **mỗi phát bắn là một lần thử lại bằng cách thay số vào đề.** Bé thấy tận mắt con số bay vào chỗ x, phép tính hiện ra và được kiểm. Bắn sai thì phép tính sai hiện ngay trên ổ khoá (`35 − 18 = 17 ≠ 27`), nên bé hiểu vì sao sai chứ không chỉ nghe "sai rồi".

Ngoài dạng tìm x, trò còn có dạng **biểu thức chứa chữ** (lớp 4, 5): rađa bắt được **mật mã của đợt** (`a = 7`), mỗi tàu mang một biểu thức (`a × 8`, `125 − a`), bé bắn đạn mang **giá trị của biểu thức**. Dạng **phép tính thường** vẫn có (ổ khoá `24 × 3 = ?`) để trộn vào đợt cho lớp 1, 2 hoặc khi bé chọn.

---

## 2. Kịch bản

### 2.1. Mở đầu (lần đầu vào trò, khoảng 12 giây, có nút Bỏ qua)

Xem [kich-ban.svg](bao-ve-trai-dat/kich-ban.svg).

1. **Đêm yên bình.** Thành phố sáng đèn dưới khiên năng lượng. Rô-bốt Bíp (trợ lý của bé) đèn đầu chuyển đỏ: *"Bíp bíp! Tàu lạ!"* Xa xa, hành tinh Lộn Xộn và ba chấm đĩa bay.
2. **Bọn Zíp Zắp cướp số.** Đĩa bay chiếu tia hút vàng xuống phố, các con số bay lên khỏi cửa sổ, biển số nhà, mặt đồng hồ. Đồng hồ không còn số, cửa sổ tắt đèn. (Lý do toán học dễ hiểu: không có số thì đồng hồ, cửa hàng, xe buýt đều rối.)
3. **Bé nhận nhiệm vụ.** Pháo Ánh Sáng mở nắp, viên đạn pha lê ghi `x = ?`. Bíp: *"Tìm đúng x, khiên tàu sẽ vỡ!"*

Từ lần sau chỉ còn một câu của Bíp khi vào đợt: *"Đợt 2! Có 6 đĩa bay."*

### 2.2. Trong một đợt

- Đĩa bay xuất hiện từ trên trời, **bay chậm dần xuống** theo các làn cố định (tối đa 4 tàu trên màn cùng lúc).
- **Rađa tự khoá tàu gần nhất** (khung ngắm đỏ bốn góc). Bé chạm tàu khác để đổi mục tiêu. Ổ khoá của tàu đang khoá được phóng to trên bàn điều khiển.
- Bé chạm một **nút đạn pha lê** → viên đạn bay vào pháo (`flyOne`) → pháo xoay về tàu → bắn tia sáng mang nhãn `x = 45`.
- **Đúng:** số bay vào chỗ x trên ổ khoá, phép tính chuyển xanh với ✓, khiên nứt rồi vỡ, phi công Zíp choáng, tàu quay tít bay ngược về vũ trụ. **Con số tàu đó cướp bay về lại thành phố**, một ô cửa sổ sáng đèn lại. (Không có cảnh nổ chết: tàu chỉ bị đuổi về.)
- **Sai:** số vào chỗ x, phép tính chuyển đỏ (`35 − 18 = 17 ≠ 27`), đạn bật khỏi khiên, **tàu Zíp bắn trả một quả cầu năng lượng** (màu của tàu) xuống vòm khiên ngay bên dưới. Nút đạn vừa bắn mờ đi. Bíp nói quy tắc tìm (dùng đúng câu của sách, xem §4.4). Sai lần hai trên cùng tàu: nút đạn đúng nhấp nháy viền vàng.
- **Vòm khiên Trái Đất có 5 vạch.** Mỗi phát trúng (quả cầu bắn trả khi bé chọn sai, hoặc tàu lọt xuống chạm vòm) trừ một vạch và để lại **một vết nứt đúng chỗ trúng**; vết nứt tích lại, viền vòm đổi màu xanh → vàng → cam → đỏ nhấp nháy. Hết vạch thì vòm vỡ tan, thua đợt. Tàu lọt xuống còn hút một con số (một cửa sổ tắt), ổ khoá hiện lời giải và được đọc to, phép đó vào sổ phép hay sai (`noteFact`).
- Hết các tàu thường thì **Tàu mẹ** xuất hiện (§3.3).

### 2.3. Kết thúc đợt

- **Thắng** (vòm còn ít nhất 1 vạch sau tàu mẹ): mọi số bị cướp bay về, cả phố sáng đèn, pháo hoa ba màu, Bíp nhảy. Thẻ kết quả nổi giữa bầu trời (lúc này trời đã trống): số tàu bắn đúng ngay phát đầu, số vạch khiên còn lại → sao.
- **Thua** (hết 5 vạch, vòm vỡ): tàu còn lại bay về hành tinh Lộn Xộn mang theo vài con số, Bíp: *"Đợt sau ta giữ khiên chặt hơn!"*. Không có cảnh Trái Đất bị phá. Thẻ kết quả liệt kê các ổ khoá đã để lọt, kèm lời giải.
- Chơi lại thì đổi số, đổi màu tàu, đổi thứ tự.

---

## 3. Luật chơi và các chế độ

### 3.1. 💎 Nạp đạn (chọn đạn), chế độ chính

Bốn nút đạn to cho **tàu đang khoá**. Một đáp án đúng, ba đáp án sai là **lỗi hay gặp** của đúng dạng đó (§4.4), không phải số ngẫu nhiên. Đổi mục tiêu thì bốn nút đổi chữ, khung nút giữ nguyên chỗ.

Đây là chế độ khớp nhất với ý "phải bắn đạn đúng biến số": viên đạn chính là một giá trị của x, bắn vào là thử giá trị đó.

### 3.2. ⌨️ Gõ mật mã (bàn phím), cho bé đã thạo

Như 🦈 Săn cá mập: bé gõ số, tia sáng bắn vào **tàu nào có x bằng số đó**. Đợt không có hai tàu cùng đáp số hay đáp số này là phần đầu của đáp số kia (luật của `shark.js`), nên gõ xong là bắn ngay. Dùng cho các cấp số lớn (tìm x với số có 4, 5 chữ số), chỗ mà bốn nút đạn sẽ lộ đáp án quá dễ.

### 3.3. 👾 Tàu mẹ cuối đợt: biến số dùng nhiều bước

Tàu mẹ có **nhiều lớp khiên, mỗi lớp là một bước tính**, viết từng dòng như trong vở (theo quy tắc "Show steps like the book"). Bảng bên phải hiện các dòng đã xong (✓), dòng đang bắn (nền vàng), dòng sau (mờ). Xem [tau-me.svg](bao-ve-trai-dat/tau-me.svg).

| Lớp | Ví dụ tàu mẹ | Các khiên |
|---|---|---|
| 1 | Hai ô Zíp: `2 + ▢ = 5`, rồi `▢ + 4 = ?` | tìm ▢ → dùng lại ▢ |
| 2 | `? + 8 = 15`, rồi `? × 2 = ?` | tìm ? → dùng lại |
| 3 | `x + 18 = 50`, lõi `x : 4 = ?` | tìm x = 32 → 32 : 4 = 8 |
| 4 | Mật mã `a = 6, b = 9`, biểu thức `(a + b) × 4` | `= (6 + 9) × 4` → `= 15 × 4` → `= 60` |
| 5 | Mật mã `a = 2,5`, `P = (a + 4) × 2` | thay chữ → tính ngoặc → nhân |

Điểm hay: **x vừa tìm được ở khiên ngoài trở thành số đã biết cho khiên trong**, bé hiểu biến số là một con số thật, dùng tiếp được.

### 3.4. Nhịp độ

- **🐢 Luyện tập:** tàu bay rất chậm và **dừng lại ở vạch trên khiên** chờ bé bắn, không mất vạch khiên. Mặc định cho lớp 1 và lần đầu chơi mỗi cấp.
- **⚡ Chiến đấu:** tàu bay xuống đều, tốc độ theo cấp. Mở sau khi thắng cấp đó ở Luyện tập (không khoá cứng, chỉ gợi ý).
- Một đợt: **6 đĩa bay + 1 tàu mẹ**, khiên thành phố **3 vạch**. Sao: 3 sao khi không mất vạch nào và tàu mẹ bắn đúng mọi khiên ngay phát đầu.

---

## 4. Dạng biến số theo lớp

Chữ biến số luôn tô **cam** (`#EA580C`, nghiêng) ở mọi chỗ: ổ khoá, nút đạn, nhãn tia sáng, bảng các bước. Nhìn màu là biết đâu là số bị giấu.

### 4.1. Cách viết số bị giấu

| Lớp | Cách viết | Lý do |
|---|---|---|
| 1 | Ô có **con Zíp nhỏ** ngồi bên trong: `3 + [👾] = 7` (vẽ SVG, không dùng emoji) | Bé lớp 1 chưa học chữ làm số; "con Zíp trốn trong phép tính" dễ hiểu |
| 2 | Ô **?** như trong sách: `? + 8 = 15` | Giống Vở BT Toán 2 |
| 3 | Chữ **x**: `x : 4 = 9` (xem câu hỏi §10.1) | Bước đệm sang lớp 4 |
| 4, 5 | Chữ **x**, **a**, **b**, **c** | Đúng SGK: biểu thức chứa chữ, tìm x |

### 4.2. Các cấp

| Lớp | Cấp | Ví dụ ổ khoá | Đạn đúng | Kiến thức / Bài |
|---|---|---|---|---|
| 1 | 1 | `3 + ▢ = 7`, `▢ − 2 = 5` (trong 10) | `4`, `7` | cộng trừ trong 10 |
| 1 | 2 | `12 + ▢ = 17`, `▢ − 30 = 40` | `5`, `70` | trong 20, số tròn chục |
| 2 | 1 | `? + 8 = 15`, `13 − ? = 6` | `7`, `7` | bảng cộng, trừ qua 10 |
| 2 | 2 | `? + 25 = 63`, `? − 18 = 47` | `38`, `65` | cộng trừ có nhớ trong 100 |
| 2 | 3 | `? × 5 = 35`, `? : 2 = 8` | `7`, `16` | bảng nhân, chia 2 và 5 |
| 3 | 1 | `x + 25 = 60`, `70 − x = 32` | `35`, `38` | Bài 3 (tìm thành phần trong + −) |
| 3 | 2 | `x × 4 = 28`, `56 : x = 8` | `7`, `7` | Bài 13 (trong × :) |
| 3 | 3 | `x − 2 518 = 4 736` (⌨️ gõ) | `7 254` | Bài 54–57, số đến 10 000 |
| 4 | 1 | Mật mã `a = 7`: `a × 8`, `125 − a`, `a + a + a` | `56`, `118`, `21` | Bài 4 biểu thức chứa chữ |
| 4 | 2 | Mật mã `a = 6, b = 9`: `a + b`, `a × b`, `(a + b) × 2` | `15`, `54`, `30` | biểu thức chứa hai, ba chữ |
| 4 | 3 | `x + 4 250 = 9 000`, `x × 6 = 4 800` (⌨️) | `4 750`, `800` | tìm x số lớn |
| 5 | 1 | `x + 2,5 = 7`, `x − 1,2 = 3,8` | `4,5`, `5` | cộng trừ số thập phân |
| 5 | 2 | `x × 10 = 45`, `x : 100 = 0,3` | `4,5`, `30` | nhân chia với 10, 100 |
| 5 | 3 | Mật mã `a = 6, b = 4`: `S = a × b`, `P = (a + b) × 2` | `24`, `20` | công thức chu vi, diện tích |

Mỗi đợt **trộn một hai tàu phép tính thường** (`24 × 3 = ?`) để giữ nhịp nhanh, trừ khi bé chọn cấp "chỉ biến số".

Ở lớp 4, 5, **mật mã của đợt đổi giữa chừng** (sau tàu thứ 3): rađa kêu, Bíp báo *"Đổi mật mã! a = 9."*, bảng mật mã nhấp nháy. Các tàu sau dùng giá trị mới. Bé học được rằng **cùng một biểu thức, chữ đổi giá trị thì kết quả đổi**.

### 4.3. Vị trí của biến

Đủ sáu vị trí như `findx.js`: số hạng, số bị trừ, số trừ, thừa số, số bị chia, số chia. Mỗi đợt có ít nhất hai vị trí khác nhau để bé không bắn theo thói quen.

### 4.4. Đạn sai là lỗi hay gặp

| Dạng | Đạn đúng | Ba đạn sai (lỗi bé hay mắc) |
|---|---|---|
| `x + a = b` | `b − a` | `b + a` (làm ngược phép), `b − a ± 1`, `b − a ± 10` (nhớ / mượn sai) |
| `x − a = b` | `b + a` | `b − a` (trừ thay vì cộng), cộng quên nhớ (`27 + 18 → 35`), `b + a − 1` |
| `a − x = b` | `a − b` | `a + b`, `b` (chép lại hiệu), `a − b ± 1` |
| `x × a = b` | `b : a` | `b × a`, `b − a`, thương liền kề |
| `x : a = b` | `b × a` | `b : a`, `b + a`, tích liền kề |
| `a : x = b` | `a : b` | `a × b`, `a − b`, thương liền kề |
| `a × 8` khi `a = 7` | `56` | `15` (cộng thay nhân), `78` (ghép chữ số), `48` / `64` (bảng liền kề) |
| `(a + b) × 2` | `(a + b) × 2` | `a + b × 2` (bỏ ngoặc), `a + b`, `a × b × 2` |
| STP `x + 2,5 = 7` | `4,5` | `9,5`, `5,5`, `0,45` (sai dấu phẩy) |

Lời Bíp khi bắn sai lấy đúng câu quy tắc trong `findx.js solveRule` (*"x là số bị trừ: lấy hiệu cộng với số trừ, 27 + 18."*), kèm dòng tính hiện trên bảng ổ khoá.

---

## 5. Hình ảnh

Toàn bộ vẽ SVG riêng theo nét của app (màu phẳng, viền mực dày 3–4, bóng trắng quanh vật cần nổi). Không dùng emoji hay hình có bản quyền trong game thật. Xem [nhan-vat.svg](bao-ve-trai-dat/nhan-vat.svg).

### 5.1. Cảnh: đêm trên thành phố

- **Trời:** dải màu `#0B1033 → #26205A → #5B2C83`, sao nhỏ lấp lánh (nhấp nháy chậm), vài ngôi sao bốn cánh vàng, **trăng** vàng nhạt, **hành tinh Lộn Xộn** tím có vành hồng ở góc trời (nơi tàu bay tới).
- **Thành phố:** dãy nhà cao thấp xanh tím than, cửa sổ vàng sáng; vài nóc có đèn đỏ. Cửa sổ **tắt** khi tàu cướp số và **sáng lại** khi số bay về.
- **Khiên thành phố:** vòm xanh ngọc mờ ôm cả phố, viền đứt nét chạy chậm. Mất vạch thì vòm có vết nứt đỏ.
- **Pháo Ánh Sáng:** tháp xám ở giữa đồi, vòm xoay, nòng trắng đầu xanh ngọc, ô kính tròn phát sáng là chỗ viên đạn nạp vào.

### 5.2. Bọn Zíp Zắp (dễ thương, nghịch, không đáng sợ)

- **Đĩa bay:** thân bầu dục năm màu (xanh lá, vàng, cam, hồng, tím), đèn trắng vàng xen kẽ quanh vành, vòm kính có phi công một mắt, hai râu ăng-ten đầu tròn vàng.
- **Ổ khoá:** bảng trắng đục treo dưới bụng tàu bằng hai dây, chữ đen to, biến số cam. Khi được kiểm: nền xanh `#DCFCE7` viền xanh (đúng) hoặc nền đỏ nhạt viền đỏ (sai).
- **Khiên tàu:** bong bóng xanh nhạt viền đứt nét. Trúng đạn: viền sáng trắng + hai vòng sóng lan. Vỡ: các mảnh cong bay ra.
- **Phi công Zíp:** ba nét mặt: cười nhe răng (bay tới), choáng mắt chéo (bị bắn trúng), mếu (ngồi bong bóng thoát hiểm phất cờ trắng khi tàu mẹ thua).
- **Tàu mẹ:** đĩa tím rất to, vòm kính có ba phi công, nhiều vòng khiên màu khác nhau (xanh, hồng, vàng = các bước).

### 5.3. Phe ta

- **Rô-bốt Bíp:** đầu vuông bo tròn, màn hình mặt đen mắt xanh ngọc, đèn ăng-ten. Ba trạng thái: **vui** (mắt cười, đèn vàng), **nhắc cách** (mắt nheo, khi bé bắn sai), **báo động** (đèn đỏ, miệng tròn, khi tàu lại gần khiên hoặc đổi mật mã). Mấp máy miệng khi đọc.
- **Đạn pha lê:** viên pha lê lục giác xanh ngọc có vệt sáng. Trên nút đạn: pha lê ở trên, giá trị ở dưới (`x = 45`). Ba trạng thái nút: thường, **gợi ý** (viền vàng chấm chạy, sau 2 lần sai), **đã bắn sai** (mờ xám).

### 5.4. Chuyển động (mọi thứ đều bay)

| Lúc | Chuyển động |
|---|---|
| Chạm nút đạn | Pha lê bay theo đường cong vào ô kính của pháo (`flyOne`), nút nhún |
| Bắn | Pháo xoay về tàu, nòng giật, tia sáng xanh mang nhãn `x = 45` chạy lên |
| Trúng | Nhãn số bay vào chỗ x trên ổ khoá (lật thẻ), phép tính chuyển màu, ✓ bật lên |
| Khiên vỡ | Mảnh khiên văng, sao lấp lánh, tàu quay tít bay chéo lên rồi nhỏ dần |
| Số về phố | Con số bị cướp bay từ tàu xuống một cửa sổ tối, cửa sổ sáng |
| Sai | Nhãn số vào chỗ x, phép tính đỏ và rung, pha lê bật khỏi khiên, tàu bắn trả quả cầu năng lượng xuống vòm, vòm nứt thêm tại chỗ trúng |
| Mất vạch khiên | Tàu chạm vòm, vòm rung, nứt, tia hút vàng kéo một số khỏi cửa sổ |
| Đổi mật mã (lớp 4, 5) | Rađa quét một vòng, bảng mật mã lật sang số mới |

Máy tắt hiệu ứng (`prefers-reduced-motion`): vẫn chạy đủ các bước dạy (số vào chỗ x, phép tính đổi màu), chỉ bỏ rung, xoay tít và pháo hoa, bay thẳng thay vì đường cong.

---

## 6. Bố cục màn hình

Theo skill `game-screen-layout`. Không vùng nào đổi cỡ trong một đợt.

```
Màn ngang (man-ngang.svg)                         Màn dọc (man-doc.svg)
┌──────────────────────────────────┬──────────┐  ┌────────────────────────┐
│  🪐        🛸[x × 4 = 36]     🌕   │ Đợt 2 🛸5 🛡🛡│  │[Đợt 2 🛸5 🛡🛡🛡]      🌕 │
│  🛸[x + 25 = 60]                  │ 🤖 "Bắn   │  │  🛸        🛸           │
│                 🛸[56 : x = 7]    │  tàu cam!"│  │       🛸               │
│       ┌🛸┐                         │ 🔒 ổ khoá │  │      ┌🛸┐ ← khoá        │
│       └[x − 18 = 27]┘ ← khoá       │ x − 18=27 │  │      └[x − 18 = 27]┘   │
│  ╭──────── khiên ──────────╮      │ ┌───┬───┐ │  │ ╭──── khiên ────╮      │
│  │ 🏢🏢🏢   🗼pháo  🏢🏢🏢   │      │ │x=9│x=45│ │  │ 🏢🏢🏢 🗼 🏢🏢🏢       │
│  ┴──────────────────────────┴     │ ├───┼───┤ │  ├────────────────────────┤
│                                   │ │x=35│x=44│ │  │ 🤖   x − 18 = 27       │
│                                   │ └───┴───┘ │  │ [x = 9 ]   [x = 45]    │
└───────────────────────────────────┴──────────┘  │ [x = 35]   [x = 44]    │
                                                   └────────────────────────┘
```

- **Bầu trời** là vùng chơi, chiếm phần lớn (ngang ~71% chiều rộng, dọc ~66% chiều cao). Tàu có cỡ cố định tính theo chiều rộng vùng trời (`cqi`), đủ chỗ cho **4 làn**. Không thu nhỏ tàu khi có thêm tàu.
- **Bàn điều khiển** (nền kim loại tối, các bảng trắng đục): ngang là cột phải; dọc là dải dưới. Thứ tự: bảng đợt (số đợt, số tàu còn lại, 3 vạch khiên) → Bíp + lời nói → **ổ khoá phóng to** → **4 nút đạn to** (2 × 2).
- Chế độ ⌨️ Gõ mật mã: bàn phím **thay đúng chỗ** khung 4 nút đạn, cùng cỡ, có sẵn từ đầu đợt.
- Bảng lời Bíp giữ chỗ từ đầu (`&nbsp;` + `visibility: hidden`), không chèn thêm.
- **Thẻ kết quả** đè giữa bầu trời (lúc đó trời đã trống), không đẩy bàn điều khiển.
- Ổ khoá dài (biểu thức lớp 4, 5, số có dấu cách nghìn) co chữ theo `cqi` của bảng, bảng không đổi cỡ.
- Kiểm bằng `scripts/games-preview.html`: ngang + dọc, đầu đợt / giữa đợt / tàu mẹ / thẻ kết quả.

---

## 7. Âm thanh và giọng đọc

- **Giọng đọc** (TTS): Bíp đọc ổ khoá khi bé chạm 🔊 hoặc khi khoá mục tiêu ở chế độ Luyện tập (*"x trừ 18 bằng 27."*), đọc quy tắc khi sai, đọc lời giải khi tàu lọt. Không dùng "nhé", câu kết bằng `!` hoặc `.`.
- **Tiếng**: 13 tiếng riêng (nền trời đêm `space-loop`, `ufo-in`, `ufo-near`, `ufo-load`, `laser`, `shield-break`, `deflect`, `ufo-away`, `number-home`, `dome-hit`, `radar-alarm`, `mother-in`, `fireworks`), prompt ElevenLabs và cách chọn bản ở [docs/sfx/PROMPTS.md](sfx/PROMPTS.md#-bảo-vệ-trái-đất-trò-zíp-zắp-grade3drillsufojs). Hàm phát ở `preschool/fx.js` (`sfx.laser()`…), chưa có file thì phát tiếng tổng hợp; có file thì thêm tên vào `SHORT` / `LONG` trong `engine/sfx.js`.

---

## 8. Kỹ thuật (dự kiến)

- **Dùng lại khung 🦈 Săn cá mập** (`grade3Drills/shark.js`): đã có làn, tốc độ theo cấp, mạng, bàn phím, luật không trùng đáp số, sổ phép hay sai. Tách phần chung thành mẫu, mỗi trò chỉ khác hình vẽ và kiểu "đề".
- **Kiểu đề mới** bên cạnh `fact` của shark: `eq` (tìm x, vị trí và phép tính, dùng `solveRule` của `findx.js` cho lời nhắc), `expr` (biểu thức chứa chữ, cần `vars` của đợt), mỗi đề có `distractors()` theo bảng §4.4.
- **Hình vẽ**: module mới `grade3Drills/ufoArt.js` (cảnh, đĩa bay, tàu mẹ, pháo, Bíp, pha lê), cùng kiểu `sharkArt.js`.
- **Thẻ trong app**: nút trên trang Luyện Tính lớp 2, 3, 4, 5 (như cá mập) và thẻ riêng cho lớp 1. Khoá sao theo prefix của Luyện Tính từng lớp (`drill`, `drill2`, `drill4`, `drill5`), mỗi cấp một dòng trong `starRatings.js`.
- **Tiếng Anh**: dùng `engine/i18n.js` như các sách toán (Captain, Zip-Zap, Robo Beep).

---

## 9. Thứ tự làm đề xuất

1. Hình vẽ thật (`ufoArt.js`) + màn hình lớp 3 cấp 1, chế độ 💎 Nạp đạn, chưa có tàu mẹ. Chụp ngang + dọc để duyệt.
2. Bắn đúng / sai đủ chuyển động, lời Bíp, mất vạch khiên, thẻ kết quả.
3. Tàu mẹ, rồi các cấp lớp 3 còn lại và ⌨️ Gõ mật mã.
4. Lớp 4, 5 (biểu thức chứa chữ, đổi mật mã), rồi lớp 2, lớp 1.

---

## 10. Câu hỏi cần chốt

1. **Lớp 3 viết x hay ô "?"**: sách Kết nối tri thức lớp 3 dùng ô "?", nhưng ý trò là "biến số". Đề xuất: viết **x**, câu nhắc của Bíp vẫn dùng tên thành phần như sách ("x là số bị trừ").
2. **Chế độ chính là 💎 Nạp đạn (chọn) hay ⌨️ Gõ mật mã?** Đề xuất: Nạp đạn mặc định cho mọi lớp, Gõ chỉ cho cấp số lớn.
3. **Tên gọi**: "Bảo vệ Trái Đất", bọn "Zíp Zắp", hành tinh "Lộn Xộn", "Rô-bốt Bíp", "Pháo Ánh Sáng" có ổn không?
4. **Lớp 1 có làm không**, hay bắt đầu từ lớp 2?
5. ~~Bắn sai có phạt?~~ Đã chốt (2026-10-08): bắn sai thì tàu bắn trả, vòm nứt thêm một vạch (5 vạch).
