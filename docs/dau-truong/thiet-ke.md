# Đấu Trường Nhí: thiết kế sân chơi kiến thức Toán và Tiếng Việt (lớp 1–5)

**Tên tạm**, tên chính thức chờ chủ dự án chọn (không dùng tên một chương trình truyền hình có thật, xem mục 14). Một sân chơi trực
tuyến theo kiểu gameshow kiến thức: sân khấu 3D sáng, xanh dương, nhiều đèn LED; 4 thí sinh đứng bục, **2 MC** đứng chung một bục
thay phiên nhau dẫn, khán phòng 30–50 bạn cùng lớp. Mỗi lượt khoảng **45 phút**, ba vòng **Khởi động, Tăng tốc, Về đích**. Chỉ hai
môn **Toán** và **Tiếng Việt**. Mọi câu trả lời đều bằng **chạm** (trắc nghiệm, sắp xếp, ghép, điền thẻ), **không có ô nhập chữ**.
Lượt chạy **theo lịch admin đặt** (mục 12).

**Ở app Toán Tiểu Học**, cạnh 🎤 Ai là thần đồng? (`docs/thandong.md`): dùng chung bộ máy 3D `src/thanDong/church/*` (chép từ
kinh-thanh), máy chủ phòng `realtime/` (Cloudflare Worker + Durable Object), hồ sơ lớp, tài khoản, sổ sao `engine/stars.js`.
Phần làm mới: sân khấu, luật 4 thí sinh, ngân hàng Tiếng Việt, giọng Azure hai MC, lịch admin.

**Bản mẫu sân khấu:** trong app là thẻ 🏆 "Đấu Trường Nhí (bản mẫu 3D)" ở 🎮 Challenge games lớp 1–5, **chỉ admin thấy**
(`src/games/dauTruong.js`, `admin: true` trong `data/grades.js`, lọc ở `home.js`); bản đứng riêng [`docs/dau-truong/mockup.html`](mockup.html)
(mở thẳng bằng trình duyệt, three.js qua CDN).
Nút dưới màn hình chạy thử từng vòng: đồng hồ, bục chốt đáp án, lật kết quả, điểm chạy số, đèn ghế khán giả, hai MC thay phiên.

> Nhìn và cảm giác "gameshow kiến thức truyền hình" là thể loại; **thiết kế là của riêng mình**: không dùng tên, logo, nhạc hiệu, khung
> hình thoi hay bố cục sân khấu của chương trình thật nào. Họa tiết riêng: tấm lục giác LED, ngôi sao 16 tia trên sàn, cột lăng trụ lục giác.

---

## 1. Ai chơi

| | |
|---|---|
| Phòng | Một phòng = một lớp (1–5), theo lớp trong hồ sơ. 30–50 học sinh (`capOf` = 50, đầy thì mở phòng `~2`). |
| Thí sinh | 4 bạn mỗi lượt, đứng 4 bục, chọn qua **Vòng Chọn** đầu lượt (mục 4). |
| Khán giả | Tất cả các bạn còn lại: **cùng trả lời mọi câu** trên máy mình, có điểm riêng, có bảng "Khán giả xuất sắc". Không ai ngồi chơi không. |
| MC | **2 MC** (một nam, một nữ) đứng chung bục MC, thay phiên nói (mục 8), giọng Azure. Máy chủ dẫn chương trình, không cần người thật điều khiển. |
| Lượt | ~45 phút, giờ bắt đầu theo lịch admin. Bạn đã lên bục trong ngày không được chọn lại (nhường bạn khác). |

---

## 2. Không gian 3D

Xem ảnh trong bản mẫu. Hệ trục giống trường quay: khán phòng nhìn về sân khấu (−Z của three.js).

| Khu | Mô tả | Kích thước (m) |
|---|---|---|
| Sân khấu | Đĩa tròn bóng xanh, viền LED hai vòng, ngôi sao 16 tia trên sàn, bậc lên ở giữa phía trước | r 8.5, cao 0.6, tâm (0, −3) |
| Màn LED lớn | Tường sau, khung bạc, hai thanh đèn vàng trên dưới. Hiện tên vòng, câu hỏi, phương án, đồng hồ, bảng điểm | 13 × 7.3, tâm cao 5.9 |
| Tường LED | Tấm lục giác nổi, viền neon chạy sóng theo nhịp | 34 × 14 |
| Cột LED | 4 lăng trụ lục giác hai bên màn hình, cạnh đèn | cao 11 |
| 4 bục thí sinh | Trên một cung trước màn hình, quay ra khán phòng, hơi nghiêng vào giữa. Mỗi bục: đế tròn viền đèn **màu riêng** (đỏ, cam, xanh lá, xanh dương), thân vát trắng, **màn điểm** mặt trước (tên, điểm, "Đã chốt 5,2 giây"), máy tính bảng trả lời quay về thí sinh, **chuông** màu của bạn ấy, khung đèn sau lưng | mặt bàn cao 0.9 (vừa tầm trẻ 1.2–1.45 m) |
| Bục MC đôi | Bên trái phía trước, quay chéo vào giữa, viền vàng; hai MC đứng cạnh nhau, mỗi người một đèn rọi và một vòng sáng dưới chân, **người đang nói sáng lên** | rộng 2.1, mặt bàn 1.05 |
| Khán phòng | 5 bậc × 10 ghế = **50 chỗ**, lối đi giữa, mỗi lưng ghế có **đèn dải**: sáng xanh khi bạn ngồi đó trả lời đúng | bậc cao 0.42 |
| Giàn đèn | 2 thanh ngang trên cao, 8 đèn quét (nón sáng) đổi màu và tốc độ theo vòng | cao 11 |

**Góc máy** (như `fixedCam.presets` của trường quay): Toàn cảnh, Trực diện, Bục thí sinh, MC, Khán phòng, và **Từ ghế của tôi**
(mặc định cho khán giả). Thí sinh mặc định nhìn **Trực diện**. Máy chủ gợi ý góc theo bước (vào vòng: bay từ toàn cảnh vào màn hình;
Về đích: cận bục người đang trả lời; trao giải: trực diện), người xem vẫn tự đổi được.

**Dựng thật:** Blender như trường quay (`E:\ManC\kinh-thanh\church-online\blender\scripts\build_arena.py`, máy có Blender 5.2) →
`public/dautruong/arena.glb` + `arena_layout.json` của homework (ghế khán giả có `lane`; 4 bục `role: 'pod', i: 0..3`; bục MC
`role: 'host', i: 0..1`; `screen`; vật neon đặt tên `ar_neon_a`, `ar_neon_b`, `ar_gold`, `ar_pod{i}_ring` để đổi màu lúc chạy).
Nhân vật là avatar sẵn có của Ai là thần đồng (`public/thandong/avatar.glb`, học sinh nam / nữ khăn quàng đỏ; hai MC dựng từ avatar
như Thầy Minh, `HOST_LOOK`). Thí sinh **đứng**: clip mới `standIdle`, `standYes`, `standCheer`, `standSad`, `bell`; MC: `talk`, `nod`.
Bản mẫu chỉ dùng hình khối đơn giản để duyệt bố cục.

---

## 3. Kịch bản một lượt 45 phút

| Phút | Bước | Ai chơi | Ghi chú |
|---|---|---|---|
| −15:00–0:00 | Sảnh chờ | Ai vào trước | Phòng mở 15 phút trước giờ: chọn ghế, câu làm nóng cho vui (không điểm) |
| 0:00–2:00 | **Mở màn** | | Nhạc hiệu, đèn quét, hai MC chào cả phòng, giới thiệu môn và lớp |
| 2:00–7:00 | **Vòng Chọn** | Cả phòng | 8 câu (4 Toán, 4 TV), 12 giây/câu; 4 bạn cao điểm nhất lên bục |
| 7:00–9:00 | Mời lên bục | 4 thí sinh | MC gọi tên từng bạn, bạn ấy đi từ ghế lên bục, khán phòng vỗ tay |
| 9:00–17:00 | **Khởi động** | 4 thí sinh + khán giả | Lượt cá nhân + lượt chung bấm chuông, 20 giây/câu |
| 17:00–19:00 | Khán phòng giữa giờ | Khán giả | Bảng điểm thí sinh + top 5 khán giả, 2 câu chớp nhoáng cho khán giả |
| 19:00–28:00 | **Tăng tốc** | 4 thí sinh + khán giả | 4 câu tư duy, 30 giây/câu, nhanh hơn nhiều điểm hơn |
| 28:00–30:00 | Giải lao | Khán giả | 3 câu chớp nhoáng, nhạc nhẹ, thí sinh nghỉ |
| 30:00–41:00 | **Về đích** | Từng thí sinh | Mỗi bạn chọn gói 3 câu, Ngôi sao hy vọng, bạn khác bấm chuông giành quyền |
| 41:00–42:00 | Câu hỏi phụ | Thí sinh hòa điểm | Chỉ khi hòa hạng nhất |
| 42:00–45:00 | **Trao giải** | | Bục vinh danh, pháo giấy, Khán giả xuất sắc, sao thưởng |

Ước lượng: một câu Khởi động ≈ 8 giây MC đọc + 15 giây + 6 giây lật = ~30 giây; Tăng tốc ≈ 10 + 30 + 15 = ~55 giây; Về đích ≈ 50 giây
gồm chọn mức và giành quyền. Mỗi bước có thời gian tối thiểu và tối đa (như `STEP` trong `src/thanDong/quiz/rules.js`), nên lượt
không bao giờ kéo dài vì một máy treo.

---

## 4. Vòng Chọn (chọn 4 thí sinh từ 30–50 bạn)

- Đầu lượt mỗi bạn thấy công tắc **"Em muốn lên bục"** (bật sẵn). Bạn nhút nhát tắt đi vẫn chơi như khán giả.
- 8 câu dễ (độ khó 1–2), mọi người trả lời cùng lúc. Điểm = số câu đúng; bằng nhau thì **tổng thời gian trả lời** ít hơn xếp trên.
- 4 bạn đứng đầu (đã bật công tắc, chưa lên bục trong ngày) được mời lên. Bạn hạng 5–6 là **dự bị**.
- Thí sinh rớt mạng: bục chờ 60 giây (màn điểm "Đang kết nối lại…"), quá hạn thì bạn dự bị lên **giữ nguyên điểm của bục**, MC báo tên bạn mới.
- Phòng ít hơn 4 bạn muốn lên: bục trống do **bạn máy** (tên nhân vật, tỉ lệ đúng 60–75%) để lượt vẫn chạy; bạn máy không nhận thưởng.

---

## 5. Các vòng thi

Chung cho mọi câu: **đồng hồ chạy từ lúc MC đọc xong câu hỏi và phương án**. Mỗi thí sinh chạm đáp án rồi **Chốt** (dạng một chạm
thì chạm là chốt). Bục đã chốt: viền trắng, màn điểm "Đã chốt 5,2 giây" (không lộ đáp án). **Đủ 4 bạn chốt hoặc hết giờ** thì
máy chủ khoá và **công bố kết quả**: màn lớn lật đáp án đúng, từng bục xanh / đỏ, điểm chạy số, MC đọc đáp án và lời giải thích ngắn.
Khán giả cũng có hạn chót như thí sinh.

### 5.0 Thời gian theo lớp và MC chủ trì

Trẻ đọc chậm nên **câu nào cũng từ 30 giây**; lớp càng nhỏ càng nhiều giờ (hệ số lớp 1 ×1,5, lớp 2 ×1,3, lớp 3 ×1,15, lớp 4–5 ×1,
làm tròn 5 giây; `TIME`, `SLOW`, `secs()` trong `games/dauTruong.js`). Đồng hồ chỉ chạy **sau khi MC đọc xong câu hỏi và bốn phương án**.

| Giây | Lớp 1 | Lớp 2 | Lớp 3 | Lớp 4–5 |
|---|---|---|---|---|
| Khởi động | 45 | 40 | 35 | 30 |
| Tăng tốc | 60 | 50 | 45 | 40 |
| Về đích câu 10 / 20 / 30 điểm | 45 / 55 / 70 | 40 / 45 / 60 | 35 / 40 / 50 | 30 / 35 / 45 |
| Bấm chuông được quyền, chọn đáp án | 25 | 20 | 15 | 15 |
| Cửa sổ bấm chuông giành quyền | 8 | 7 | 6 | 5 |
| Chọn gói / đặt Ngôi sao | 25 / 15 | 20 / 15 | 15 / 10 | 15 / 10 |

**MC chủ trì mọi bước** (lời trong `src/dauTruong/mc.js`, từ [kich-ban-mc.md](kich-ban-mc.md) sửa theo luật mới): chào vòng và nêu luật,
mời từng bạn vào lượt, trao lời khi đổi môn (anh Minh Toán, chị Mai Tiếng Việt), đọc số câu, câu hỏi và từng phương án (ô đáp án
bật ra đúng lúc MC đọc tới), "Mời … trả lời!" rồi mới đếm giờ; ai chốt / bấm chuông / hết giờ thì MC nói rồi mới lật; lật xong MC
đọc đáp án, kết quả, gọi tên khán giả dẫn đầu, tổng kết lượt và vòng, rồi mới sang câu sau. Chương trình chạy theo lời MC, không
theo hẹn giờ cố định. Giọng: **giọng đọc của trình duyệt** (`src/dauTruong/mcVoice.js`: anh Minh giọng nam, chị Mai giọng nữ của
máy; chỉ một giọng thì khác cao độ; lớp 1–2 đọc chậm hơn), sau này thay bằng Azure giữ nguyên cách gọi `mcSpeak(text, mc)`.
Lời MC hiện **phụ đề** trên thanh trên cùng; nút 🔊 tắt tiếng (nhớ ở `dt-mute`): tắt tiếng hay máy không có giọng tiếng Việt thì
chương trình vẫn chạy theo phụ đề, chờ đủ thời gian đọc.

### 5.1 Khởi động (làm nóng, tích điểm ban đầu)

| | |
|---|---|
| Lượt cá nhân | Mỗi thí sinh lần lượt trả lời **câu riêng** của mình (bản mẫu: 2 câu mỗi bạn), ba bục kia mờ đèn. Đúng +10, sai / hết giờ 0 |
| Lượt chung | Sau lượt cá nhân (bản mẫu: 4 câu): cả 4 bạn thấy câu, **bấm chuông giành quyền**; ai bấm trước được MC gọi tên rồi chọn đáp án. Đúng +10, **sai −5**. Không ai bấm thì qua câu |
| Thời gian | Theo lớp (mục 5.0, lớp 4–5: 30 giây). Người phải trả lời đã chốt (lượt cá nhân) hoặc người giành quyền đã chọn thì **lật ngay**, bỏ thời gian còn lại |
| Câu | Xen kẽ Toán / Tiếng Việt theo tiến độ học (mục 7). Dạng chọn 1 trong 4 |
| Hiệu ứng | Màu **xanh ngọc + lam**; bục đến lượt viền vàng, đèn rọi mạnh; bấm chuông: chuông và vòng bục nháy màu của bạn ấy, màn LED ghi "🔔 … giành quyền trả lời" |

### 5.2 Tăng tốc (4 câu tư duy, ai nhanh hơn)

| | |
|---|---|
| Câu | **4 câu**, mỗi câu một dạng: **dãy số** (số tiếp theo), **dãy hình** (hình màu lặp / tăng dần), **sắp xếp dữ kiện** (ví dụ "Lan cao hơn Mai… xếp từ thấp đến cao", hoặc xếp số / ghép câu), **tư duy / suy luận hình ảnh** (thứ trong tuần, ai cao nhất, đếm chân, tuổi, phép tính bằng hình quả 🍎 + 🍌). Sinh theo lớp (`speedQ` trong `src/dauTruong/questions.js`) |
| Thời gian | Theo lớp (mục 5.0, lớp 4–5: 40 giây); cả 4 bạn đã chốt thì lật ngay |
| Ai chơi | **Cả 4 thí sinh cùng trả lời** |
| Điểm | Đúng xếp theo **thời gian chốt**: nhanh nhất +40, rồi +30, +20, +10. Sai 0 |
| Hiệu ứng | Màu **cam + hồng**, đèn quét nhanh; màn LED ghi dạng câu ("DÃY HÌNH · CÂU 2/4"); lật: từng tiếng "ting" theo thứ tự chốt |

### 5.3 Về đích (chọn gói, Ngôi sao hy vọng, giành quyền)

| | |
|---|---|
| Thứ tự | Bạn **ít điểm nhất đi trước** |
| Chọn gói | Đầu lượt, bạn đang chơi chọn một **gói 3 câu** (15 giây): **30** (10 · 10 · 10), **50** (10 · 20 · 20), **70** (20 · 20 · 30), **90** (30 · 30 · 30). Thời gian câu theo điểm và lớp (mục 5.0); câu 20, 30 lấy mức khó |
| Ngôi sao hy vọng | Mỗi lượt **một lần**: trước mỗi câu hỏi "Có đặt Ngôi sao hy vọng không?" Đặt sao: đúng **×2**, sai **trừ bằng điểm câu**. Không đặt: sai không bị trừ |
| Giành quyền | Bạn đang chơi sai hoặc hết giờ: đáp án sai tô đỏ, chưa lộ đáp án đúng; 3 bạn kia có **5 giây bấm chuông** (lớp nhỏ lâu hơn). Ai bấm trước, MC gọi tên, rồi bạn ấy chọn: đúng **+điểm câu**, sai không bị trừ |
| Hiệu ứng | Màu **vàng + tím**; đèn rọi tập trung bục đang chơi, ba bục kia mờ; màn LED hiện bốn ô gói, ngôi sao sáng khi đặt; bục đặt sao có ⭐ cạnh tên |

### 5.5 Khán giả cũng thi

- Khán giả trả lời **mọi câu** của cả ba vòng (cả lượt cá nhân của thí sinh), không cần bấm chuông, có **điểm riêng**: đúng +10
  (Khởi động), +20 (Tăng tốc), Về đích bằng điểm câu. Khán giả không làm câu lật sớm: thí sinh chốt xong là lật.
- Điểm hiện **trên đầu từng bạn**: thẻ nổi, điểm (to, vàng) ở trên, tên ở dưới; vừa đúng thì nền xanh, thẻ của mình viền vàng.
  Thẻ chỉ hiện khi camera nhìn về phía khán phòng (sau mỗi câu camera lướt sang Khán phòng), để không chồng lên sân khấu.
- Trên dải trả lời của khán giả: "Điểm của bạn …". Trao giải ghi 3 **Khán giả xuất sắc** trên màn LED.

### 5.4 Câu hỏi phụ và Trao giải

- Hòa hạng nhất: một câu bấm chuông, ai bấm trước trả lời; sai thì quyền sang bạn kia.
- Trao giải: màn lớn bảng xếp hạng, đèn vàng, pháo giấy, bạn hạng nhất bước ra trước bục, khán phòng vỗ tay; Khán giả xuất sắc
  (top 3 điểm khán giả) được MC gọi tên và đèn ghế của các bạn ấy sáng vàng.
- Thưởng **sao** vào sổ sao chung (`awardFixedStars`, khoá `dautruong<lớp>:<lượt>:<vai>`), có trần mỗi ngày như Ai là thần đồng.

---

## 6. Dạng câu hỏi (chỉ chạm, không gõ chữ)

| Mã | Dạng | Cách chơi trên máy | Ví dụ Toán | Ví dụ Tiếng Việt |
|---|---|---|---|---|
| `abcd` | Chọn 1 trong 4 | 4 nút to 2 × 2, chạm là chốt | 36 : 4 + 15 = ? | Từ nào viết đúng chính tả? |
| `ds` | Đúng / Sai | 2 nút to | 7 × 8 = 54. Đúng hay sai? | "Bé nga" viết đúng. Đúng hay sai? |
| `cmp` | So sánh | 3 nút > < = | 3/4 ☐ 2/3 | |
| `multi` | Chọn nhiều | 4–6 thẻ bật / tắt + nút Chốt | Chọn các số chia hết cho 3 | Chọn các từ chỉ hoạt động |
| `order` | Sắp xếp | Chạm thẻ theo thứ tự, thẻ bay vào hàng ô; chạm thẻ trong hàng để gỡ | Xếp từ bé đến lớn: 1 205, 1 052, 1 250 | Xếp thành câu: đàn chim / bay về / tổ / Chiều chiều, |
| `pair` | Ghép đôi | Chạm ô trái rồi ô phải, đường nối hiện ra (2–4 cặp) | 6 × 7 ↔ 42 | Từ ↔ từ trái nghĩa |
| `slot` | Điền thẻ | Câu có 1–2 ô trống, chạm thẻ (chữ, vần, dấu, số) để đặt vào ô | 45 + ☐ = 72 (thẻ 27, 37, 117, 23) | Con mèo ☐ chuột (thẻ bắt, bắc) · ngh / ng + ỉ |
| `tap` | Chạm vào hình / từ | Chạm thẳng vào hình vẽ hoặc một từ trong câu | Chạm vào hình tam giác | Chạm vào từ viết sai chính tả |

`slot` là phần "tự luận trắc nghiệm": em vẫn phải tự nghĩ ra đáp án, nhưng đặt bằng thẻ có sẵn (có thẻ nhiễu là lỗi hay gặp).
Mọi nút tối thiểu 64 px, chữ lớn, lớp 1 có hình minh họa. Kết quả hiện **ngay trong nút** (xanh / đỏ, dấu ✓), không có hộp thoại.

**Nội dung theo lớp** (chương trình 2018, bám sát sách giáo khoa):

| Lớp | Toán | Tiếng Việt |
|---|---|---|
| 1 | Đếm, so sánh, cộng trừ trong 10 / 100, hình phẳng, xem giờ đúng | Âm, vần, ghép tiếng (`slot`), chọn tranh đúng từ, chính tả c/k, g/gh, ng/ngh |
| 2 | Bảng nhân chia 2, 5; cộng trừ có nhớ; kg, lít; ngày giờ | Từ chỉ sự vật / hoạt động / đặc điểm, dấu câu, câu "Ai là gì?" |
| 3 | Nhân chia, biểu thức, chu vi diện tích, số La Mã, tiền | So sánh, từ trái nghĩa, câu "Ai làm gì?", nhân hóa |
| 4 | Số đến lớp triệu, phân số, góc, đơn vị đo | Danh / động / tính từ, chủ ngữ vị ngữ, thành ngữ |
| 5 | Số thập phân, tỉ số phần trăm, thể tích, chuyển động | Đồng nghĩa / trái nghĩa / đồng âm, quan hệ từ, câu ghép |

---

## 7. Ngân hàng câu hỏi

**Đang dùng ở bản mẫu (2026-11-07): `src/dauTruong/questions.js`, chỉ hỏi bài đã học tới hôm nay.**
- Tiến độ: năm học bắt đầu thứ Hai đầu tiên từ 5/9, đếm số tuần trọn; HK I = 18 tuần. Toán đến Bài ≈ số bài HK I
  (`routeTests/g<lớp>/plan.js`, cuối kì) × tuần / 18 (lớp 3 ngày 07/11/2026: Bài 19). Tiếng Việt: bài có `week` ≤ số tuần.
- Toán: câu trắc nghiệm 4 phương án (`type: 'mc'`, có `bai`, không hình) trong đề Kiểm tra theo lộ trình lớp 1–5; Tăng tốc sinh
  câu xếp 4 số trong phạm vi số của lớp. Tiếng Việt: sinh từ dữ liệu 🧰 Công cụ Tiếng Việt 2 / 3 (nhóm từ, tìm từ, nối vế câu,
  dấu câu, ghép câu 4 mảnh). Lớp 1, 4, 5 chưa có dữ liệu Tiếng Việt theo bài nên tạm chỉ có Toán.
- Số câu mỗi vòng (`KD`, `TT`, `VD` trong `games/dauTruong.js`): Khởi động 4 × 2 cá nhân + 4 chung = 12, Tăng tốc 4, Về đích 4 × 3 = 12;
  câu Khởi động / Về đích xen kẽ Toán / Tiếng Việt;
  hết câu thì "Hết vòng" rồi tự sang vòng sau. Mỗi câu: bạn đúng có cột đèn rọi + pháo giấy trên bục trước khi sang câu mới.

Kế hoạch đầy đủ (chưa làm):

```
src/dauTruong/bank/g3/tv.json      // Tiếng Việt: soạn tay, mỗi câu một dòng
src/dauTruong/bank/g3/toan.json    // Toán: câu soạn tay (có hình, có lời)
src/dauTruong/gen/g3.js            // Toán: khuôn sinh câu theo hạt giống
```

```json
{"id":"T3_0142","m":"tv","k":"order","lv":3,"q":"Xếp thành câu đúng:","o":["Chiều chiều,","đàn chim","bay về","tổ."],"say":"Em hãy xếp các từ sau thành câu đúng.","ex":"Câu đúng: Chiều chiều, đàn chim bay về tổ."}
```

- `o` theo **thứ tự đúng** (`order`), `o[0]` đúng (`abcd`), `a: [..]` các chỉ số đúng (`multi`), `pairs` (`pair`), `slots` + `cards`
  (`slot`). Máy chủ tự xáo khi hỏi, giữ đáp án, chỉ gửi đáp án lúc lật.
- `lv` 1–5 độ khó. `say` là lời MC đọc khi chữ trên màn khác lời nói (phép tính, ô trống). `ex` lời giải thích ≤ 160 ký tự.
- **Toán sinh từ khuôn**: dùng lại bộ sinh của Luyện Tính lớp 2–5 và ngân hàng `src/thanDong/quiz/bank/g1–g5.js`; nhiễu là **lỗi
  tính hay gặp** (quên nhớ, nhầm thứ tự phép tính, lệch một hàng). Một khuôn sinh vô hạn câu khác nhau.
- **Tiếng Việt soạn tay**, mỗi lớp ≥ 300 câu, ngữ liệu tự viết hoặc lấy từ công cụ Tiếng Việt 2 / 3 sẵn có (`tv2-tools`, `tv3-tools`).
  Một câu một đáp án đúng, không phủ định, không "tất cả đều đúng"; người thứ hai đọc kiểm trước khi đưa vào.
- `scripts/dautruong-check.mjs`: cấu trúc, trùng id, đáp án trùng, độ dài vừa nút, khuôn Toán sinh 1 000 câu không trùng đáp án với nhiễu.
- Máy chủ rút câu cho lượt: Vòng Chọn lv 1–2; Khởi động 12 câu lv 1 → 3; Tăng tốc lv 2 → 4; Về đích theo mức thí sinh chọn
  (Dễ lv 2, Vừa lv 3, Khó lv 4–5); tránh câu phòng đã gặp trong tuần.

---

## 8. Hai MC, giọng Azure (như Kinh Thánh)

| MC | Giọng Azure | Dẫn phần nào |
|---|---|---|
| MC nam (ví dụ "anh Minh") | `vi-VN-NamMinhNeural` | Mở màn, đọc câu **Toán**, Về đích (chọn mức, chuông, thẻ ×2), trao giải |
| MC nữ (ví dụ "chị Mai") | `vi-VN-HoaiMyNeural` | Vòng Chọn, đọc câu **Tiếng Việt**, chuyển vòng, khán phòng giữa giờ, lời giải thích |

- **Thay phiên tự nhiên**: kịch bản có câu trao lời ("Câu tiếp theo là Tiếng Việt, mời chị Mai!", "Cảm ơn anh Minh!"). Mỗi câu
  trong `SCRIPT` ghi người nói (`mc: 0 | 1`); hai người không nói chồng nhau (cùng một hàng đọc). Người đang nói: vòng sáng dưới
  chân, đèn rọi mạnh, clip `talk`; người kia quay sang, gật đầu.
- **Homework chưa có máy chủ giọng Azure** (Ai là thần đồng đang dùng giọng của máy, `src/thanDong/engine/voice.js`). Cần chép từ
  kinh-thanh: `api/tts.js` + `api/_lib/r2.js` + `ttsAllow.json` + phần MC của `scripts/tts-data.mjs`; khoá `AZURE_SPEECH_KEY` /
  `AZURE_SPEECH_REGION` và R2 đặt trong biến môi trường Vercel (không ghi vào mã). Mp3 mỗi câu tạo một lần, lưu R2
  (`tts/<ver>/vi/<giọng>/<hash>.mp3`), người sau tải thẳng. Ai là thần đồng đổi sang giọng này được luôn.

| Loại lời | Cách đọc | Lưu R2 |
|---|---|---|
| Kịch bản MC (`src/dauTruong/mc.js`, `SCRIPT`): chào, vào vòng, trao lời, mời chốt, đúng, sai, hết giờ, chuông, trao giải… nhiều câu mỗi tình huống, rút theo hạt của bước (mọi máy cùng câu, cùng người nói) | Cố định | Có |
| Câu hỏi soạn tay (TV, Toán có hình): `say` hoặc `q`, lời giải thích `ex` | Cố định | Có |
| Câu Toán sinh từ khuôn: lời đọc tạo bằng `sayMath()`: `36 : 4 + 15 = ?` → "Ba mươi sáu chia bốn cộng mười lăm bằng bao nhiêu?"; `3/4` → "ba phần tư"; `2,5` → "hai phẩy năm"; `☐` → "mấy" | Trực tiếp `live` (máy chủ chỉ nhận câu khớp khuôn `liveOk` của `sayMath`, không thành máy đọc tuỳ ý) | Không |
| Tên thí sinh `{ten}` | Trực tiếp, MC gọi tên | Không |

- **Việc theo lời MC xảy ra sau lời MC** (như trường quay): "Xin mời bạn Linh lên bục" xong bạn ấy mới đi; "Thời gian bắt đầu!"
  xong đồng hồ mới chạy. Câu đã lỡ thời điểm thì bỏ (`say(…, { when })`).
- Phương án bật lên đúng lúc MC đọc tới. Dạng `order` / `pair` / `slot` MC đọc câu dẫn, không đọc từng thẻ.
- Lớp 1–2 đọc chậm hơn một chút (`playbackRate` 0.92).
- Azure tắt / hết hạn mức: giọng tiếng Việt của máy (như hiện nay), không có thì im, chữ vẫn hiện đủ, chương trình tự hẹn giờ.
- Chi phí: một lượt ≈ 40 câu + ~60 lời MC ≈ 8–10 nghìn ký tự lần đầu; lời cố định về sau tải từ R2. Gói F0 500 nghìn ký tự / tháng.

---

## 9. Hiệu ứng theo trạng thái

Mọi vật neon đổi theo `arena.cue(mode)`, như `studio.cue`. Máy bật giảm chuyển động (máy của chủ dự án đang bật): chỉ đổi màu, không
nháy, không quét; đồng hồ, điểm chạy số, bay thẻ vẫn chạy bản êm.

| Trạng thái | Đèn | Màn lớn | Âm thanh | Nhân vật |
|---|---|---|---|---|
| Chờ / sảnh | Lam + tím, thở chậm | Tên chương trình, lớp, môn, đếm ngược tới giờ | Nhạc chờ nhỏ, tiếng phòng | Khán giả ngồi |
| Mở màn | Vàng + lam, đèn quét quét khán phòng | Logo bay vào, vệt sáng | Nhạc hiệu | Hai MC giơ tay chào |
| Vào vòng | Màu của vòng tràn từ màn ra tường lục giác (sóng) | Tên vòng phóng to, luật 1 dòng | Tiếng "vào vòng" riêng mỗi vòng | Camera bay vào màn hình |
| Đọc câu | Neon đứng yên, MC đang nói sáng | Ô câu hỏi mở ra, chữ hiện từng từ, phương án bật theo lời MC | Tiếng "vút" mỗi ô | MC `talk` |
| Suy nghĩ | Neon nhịp nhanh, đèn bục màu riêng | Vòng đồng hồ; 5 giây cuối đỏ | Nhạc nghĩ theo vòng, tích tắc 5 giây cuối | Thí sinh nhìn máy, MC im |
| Một bạn chốt | Viền bục trắng | | Tiếng "cạch" | |
| Lật: đúng | Bục xanh nháy, khung đèn sáng | Ô đúng xanh, điểm +10 bay lên bục | Tiếng đúng, vỗ tay | Bạn ấy nhảy mừng, đèn ghế khán giả đúng sáng xanh |
| Lật: sai | Bục đỏ một nhịp rồi mờ | Ô đã chọn đỏ, ô đúng xanh | Tiếng sai nhẹ (không chê) | Bạn ấy cúi đầu nhẹ |
| Tăng tốc lật | Cam hồng chớp theo thứ tự | 4 thanh thời gian bay vào | Từng tiếng "ting" theo thứ tự | |
| Về đích: lượt một bạn | Đèn rọi một bục, ba bục mờ | Ba ô độ cao để chọn | Trống dồn ngắn | |
| Bấm chuông | Bục bấm nháy màu của bạn ấy | Tên bạn ấy | Tiếng chuông | Bạn ấy giơ tay |
| Trao giải | Vàng, quét nhanh, chớp | Bảng xếp hạng | Nhạc chiến thắng, pháo giấy | Hạng nhất bước ra, cả phòng vỗ tay |

Âm thanh: `engine/sfx.js` `playSfx('tên')` với tệp ElevenLabs mới trong `src/assets/sfx/` (danh sách và lời tạo ghi ở
`docs/dau-truong/sfx.md`), tiếng máy dự phòng.

---

## 10. Máy chủ phòng (dùng lại `realtime/` của homework)

- Phòng `arena-g{lop}` (`arena-g3`, `arena-g3~2`…), cạnh `studio-g{lop}` của Ai là thần đồng, `capOf` = 50. Phòng thử
  `arena-g3-test`: không cần đủ người, bạn máy lấp chỗ.
- Máy chủ phòng chưa deploy (`docs/thandong.md`, mục Deploy): deploy một lần dùng cho cả hai chương trình.
- `realtime/arena.js` lớp `Arena` (như `Show`): giữ câu hỏi, đáp án, đồng hồ, điểm thí sinh và khán giả, thẻ Nhân đôi, chuông; tự
  sang bước theo `STEP_A` [tối thiểu, tối đa] trong `src/dauTruong/rules.js` (dùng chung trình duyệt và máy chủ, hàm thuần).
- Bước: `lobby → open → sel(ask/think/reveal ×8) → invite → kd(intro, ask, think, reveal ×12) → mid → tt(…×8) → break → vd(turn, level, ask, think, bell, steal, reveal) → tie → award → closed`.
- Tin (mảng JSON như phòng trường quay): khách → máy chủ: `want` (muốn lên bục), `ans` [seq, đáp án] (thí sinh và khán giả cùng một
  tin, máy chủ biết ai là ai), `lvl` (Về đích chọn mức), `x2` (thẻ), `bell`, `go` (MC nói xong). Máy chủ → khách: `A` (trạng thái
  lượt: bước, câu không kèm đáp án, mốc hết giờ, điểm 4 bục, ai đã chốt, MC nào nói), `R` (lật: đáp án, đúng sai từng bục, thời gian
  chốt), `me` (điểm khán giả của riêng mình, hạng), `top` (top 5 khán giả).
- Đáp án chỉ gửi lúc lật; thời gian chốt do **máy chủ đo** (lúc nhận tin), không tin đồng hồ máy khách.
- Kiểm thử: `realtime/test-arena.mjs` chạy cả lượt nhanh (đủ 4 người, thiếu người, rớt mạng giữa câu, hòa điểm, không ai trả lời).
- Máy tự động (`navigator.webdriver`) không ghi Firebase, như quy định chung của app.

---

## 11. Màn hình trên máy học sinh

Chỉ màn ngang (như trường quay). Nửa trên là cảnh 3D, **dải trả lời** ở dưới luôn giữ chỗ từ đầu (không nhảy bố cục giữa câu):

- **Thí sinh**: dải trả lời cao ~40% màn, nút rất to, màu bục của mình; trên cùng thanh nhỏ: điểm của mình, hạng, đồng hồ.
  Về đích: ba nút độ cao, nút thẻ ×2, nút chuông tròn to (chỉ sáng lúc được bấm).
- **Khán giả**: dải trả lời giống thí sinh nhưng thấp hơn (~32%), thanh nhỏ: điểm khán giả, hạng trong phòng.
- Hết giờ: nút khoá, kết quả hiện trong nút đã chọn. Không có ô nhập chữ ở bất kỳ đâu.

---

## 12. Lịch lượt chơi (admin đặt)

- Trang `#admin` thêm tab **📅 Lịch** (`src/games/admin.js`, cạnh 👧 Học sinh, ⭐ Đánh giá, 🔊 Giọng đọc): tạo lượt với **lớp**,
  **ngày giờ bắt đầu** (giờ Việt Nam), lặp lại (không / hằng ngày / các thứ trong tuần), ghi chú. Sửa, xoá, xem lượt sắp tới và lượt
  đã chạy (số người vào, 4 thí sinh, người thắng).
- Firestore `arenaEvents/<id>`: `{ grade, start, repeat, days, note }`; ai cũng đọc, chỉ admin ghi (thêm vào `firestore.rules`, nhớ
  deploy rules trên console). Máy chủ phòng đọc lịch qua REST công khai của Firestore.
- Phòng `arena-g{lop}` mở **15 phút trước giờ** (sảnh chờ), tới giờ thì Mở màn; ngoài lịch phòng đóng.
- Trang chủ: thẻ chương trình theo lớp (`grade{n}-dautruong`): "Lượt tiếp theo: 19:30 thứ Bảy", đếm ngược khi còn dưới 1 giờ, chấm
  đỏ "Đang diễn ra" lúc có lượt. Nhắc trước 10 phút qua thông báo khi app đã cài (FCM, làm sau).
- Lúc Mở màn có ít hơn 4 bạn muốn lên bục: bạn máy lấp chỗ (mục 4); phòng dưới 6 người thì lượt vẫn chạy, admin thấy cảnh báo ở lượt đã chạy.

---

## 13. Thứ tự làm

1. **Duyệt bản mẫu** `docs/dau-truong/mockup.html` (bố cục, màu, bục 4 thí sinh, bục MC đôi). ← đang ở đây
2. Giọng Azure cho homework: chép `api/tts.js`, R2, phần MC của `tts-data` (dùng được cho cả Ai là thần đồng).
3. `build_arena.py` → `public/dautruong/arena.glb` + layout; nơi `arena` trong world.js (góc máy, đèn, màn lớn canvas), clip đứng cho
   thí sinh, clip nói cho MC.
4. Ngân hàng **lớp 3** trước: khuôn Toán + 300 câu Tiếng Việt, `scripts/dautruong-check.mjs`.
5. `realtime/arena.js` + `src/dauTruong/rules.js` + test chạy cả lượt.
   **Đã làm phần vào phòng (2026-11-07):** sảnh ngoài `src/dauTruong/lobby.js` (giờ lượt tới, đếm ngược, số bạn trong phòng),
   `src/dauTruong/flow.js` (chọn 1 trong 7 nhân vật + tên MC gọi dùng chung túi đồ với Ai tài năng nhất, sơ đồ ghế 5 × 10 có mặt bạn
   đang ngồi, thẻ chờ giờ + "Em muốn lên bục", báo mất kết nối / nối lại giữ ghế / Thử lại / phòng ngoài giờ, chơi thử một mình khi
   chưa có máy chủ), phòng `arena-g<lớp>` trong `realtime/room.js` (lịch tạm `SLOTS` 19:30 mỗi ngày trong rules.js, chờ tab 📅 Lịch;
   máy dev và phòng thử bắt đầu 90 giây sau người đầu tiên, nút Bắt đầu ngay), kiểm thử `realtime/test-arena.mjs`.
   Tới giờ: tạm chạy bản mẫu vòng thi; còn lại là máy chủ cầm chương trình (Vòng Chọn, mời lên bục, ba vòng, trao giải).
6. Trình duyệt `src/dauTruong/`: vẽ theo trạng thái, dải trả lời 8 dạng, màn bục, hiệu ứng, hai MC; tab 📅 Lịch, thẻ trang chủ.
7. Âm thanh, nhạc hiệu, kịch bản MC đầy đủ (lời đã soạn: [kich-ban-mc.md](kich-ban-mc.md)).
8. Lớp 1, 2, 4, 5.

## 14. Đã quyết (2026-11-07)

| Câu hỏi | Quyết định |
|---|---|
| Đặt ở app nào | App Toán Tiểu Học (homework), dùng chung bộ máy với 🎤 Ai là thần đồng |
| MC | 2 MC đứng chung bục, thay phiên nói (nam: Toán, nữ: Tiếng Việt) |
| Lịch | Lượt theo giờ admin đặt trong tab 📅 Lịch |
| Tên | **Chưa chốt.** Không dùng "Đường lên đỉnh Olympia" (tên chương trình của VTV); cũng không dùng logo, nhạc hiệu, khung sân khấu hay cách gọi riêng của chương trình ấy. Gợi ý: *Chinh Phục Đỉnh Cao*, *Đỉnh Trí Tuệ Nhí*, *Leo Đỉnh Tri Thức*, *Nhà Leo Núi Tri Thức* |
