# Thiết kế trò chơi tăng cường: Toán 4, Tập 1

> Trạng thái (2026-10-06): **bản concept, chưa code.** Làm sau, khi bạn chọn trò đầu tiên. Câu hỏi cần chốt ở [§9](#9-câu-hỏi-cần-chốt).
>
> Nguồn nội dung: SGK Toán 4 Tập Một, bộ Kết nối tri thức (Bài 1–37, `docs/lop_4/04-sgk-toan-4-tap-mot.pdf`), cùng nguồn với thẻ 🧰 `grade4-tools` ([thiet-ke-cong-cu-tap1.md](thiet-ke-cong-cu-tap1.md)).
> Khung chung dùng lại của lớp 3 ([../lop_3/thiet-ke-tro-choi-tap1.md](../lop_3/thiet-ke-tro-choi-tap1.md)) và lớp 2 ([../lop_2/thiet-ke-tro-choi.md](../lop_2/thiet-ke-tro-choi.md)).

---

## 1. Mục tiêu và nguyên tắc chung

- **Mục tiêu:** học xong một Bài, bé vào một trò nhập vai để **dùng** kiến thức trong một việc có thật: chở hàng qua cầu, đóng đồ gỗ, chia tiền tiết kiệm, bán bánh. Không phải làm thêm bài tập.
- **Đúng phạm vi đã học:** Bài 1–9 số đến 100 000; từ Bài 10 đến 999 999; từ Bài 12 đến lớp triệu. Cấp nào cần Bài sau thì thẻ giới thiệu ghi *"phù hợp nếu em đã học Bài …"*, không khóa.
- **Là trò chơi, không phải bài kiểm tra:** một ván là chuỗi nhiệm vụ (6 nhiệm vụ, như lớp 3), mỗi nhiệm vụ chỉ **thành công** / **thất bại**, cuối ván tổng kết. Chơi lại thì đổi số, đổi đồ vật, đổi khách.
- **Bé tự xác nhận:** nút "Xong" có sẵn từ đầu, app không báo trước lúc đúng. Đúng hay sai chỉ lộ ra sau khi bé xác nhận.
- **Mọi thao tác đều chuyển động** (`fly.js flyOne`, xoay, lăn, chạy), cảnh phản ứng khi xong. Máy tắt hiệu ứng thì chạy bản êm, không bỏ bước dạy.
- **Số liệu sát thực tế:** giá tiền, cân nặng, năm lịch sử, kích thước phòng như ngoài đời. Giá viết thành câu rõ: *"1 chiếc bánh giá 35 nghìn đồng"*.
- **Bố cục theo skill `game-screen-layout`:** cảnh vẽ phía sau (xưởng, cầu, ngân hàng…), nội dung trên bảng đục, lựa chọn là nút to, không nhảy bố cục trong một lượt, kiểm bằng `scripts/games-preview.html` (ngang + dọc, đầu / giữa / cuối lượt).
- **Ít chữ, có giọng đọc:** một câu yêu cầu, nút 🔊; làm sai thứ tự thì NPC nói phải làm gì trước và nút cần bấm nhấp nháy (`stall.js ask`).
- **Chữ trên màn hình:** không "nhé", kết câu bằng "!" hoặc "."; không dấu gạch dài; không hứa "miễn phí".
- **Đồ hoạ tự vẽ SVG** cùng phong cách các trò lớp 2, 3. Không hình có bản quyền, không logo.

### Khác gì với 🧰 Học bằng công cụ

| | 🧰 Công cụ (`grade4-tools`) | 🎮 Trò chơi (tài liệu này) |
|---|---|---|
| Mục đích | Hiểu khái niệm (vì sao 1 tạ = 100 kg) | Dùng khái niệm để làm việc (chất hàng qua cầu) |
| Màn hình | Một đồ vật cầm được, nền đơn giản | Một nơi chốn có NPC, câu chuyện, hậu quả |
| Sai | Công cụ chỉ ra chỗ sai | Có hậu quả trong cảnh (cầu rung, ghế gãy chân), rồi chỉ cách đúng |

Trò chơi **dùng lại bộ vẽ của công cụ** (thước đo góc `angle.js`, ê ke `square.js`, bảng ghim `quad.js`, bảng hàng `place.js`) đặt vào cảnh, không vẽ lại.

---

## 2. Kỹ năng trọng tâm

| Mã | Nhóm kỹ năng | Bài |
|---|---|---|
| **A** | Số đến 100 000; phép tính trong phạm vi 100 000 | 1, 2 |
| **B** | Số chẵn, số lẻ; dãy số tự nhiên | 3, 15 |
| **C** | Biểu thức chứa chữ; tính chất giao hoán, kết hợp | 4, 24 |
| **D** | Bài toán ba bước tính; tìm hai số biết tổng và hiệu | 5, 25 |
| **E** | Góc, đo góc, góc nhọn / vuông / tù / bẹt | 7, 8 |
| **F** | Số có nhiều chữ số, hàng và lớp, làm tròn, so sánh | 10–14 |
| **G** | Yến, tạ, tấn | 17, 20 |
| **H** | dm², m², mm² | 18 |
| **I** | Giây, thế kỉ | 19 |
| **K** | Cộng, trừ số có nhiều chữ số | 22, 23 |
| **L** | Vuông góc, song song; hình bình hành, hình thoi | 27–31 |
| | Luyện tập chung / Ôn tập: chỉ ở `also` và chế độ "Trộn đề" | 6, 9, 16, 21, 26, 32–37 |

---

## 3. Vào trò chơi

- **Nút "🎮 Trò chơi tăng cường"** ở màn danh sách Bài của thẻ 🧰 `grade4-tools`, và trên games hub chung.
- **Mở từ biểu tượng của một Bài** thì chỉ dùng nội dung Bài đó (`game.focus`, như lớp 3); nút hub giữ tất cả.
- **Làm xong Thực hành của một Bài** → khung *"🎮 Chơi trò chơi luyện bài này"* với các cấp có Bài đó trong `lessons` / `also`.
- **"📖 Xem lại Bài …"** mở đúng Bài trong `grade4-tools` (Khám phá).
- Thẻ SGK Toán 4 (2011) `grade4-textbook`: xem [§9](#9-câu-hỏi-cần-chốt) câu 3.

---

## 4. Danh sách trò chơi

| # | Trò | Kỹ năng | Bài | Dùng lại | Ưu tiên |
|---|---|---|---|---|---|
| 1 | 🍞 **Tiệm bánh công thức** | C, A | 4, 24 (+2) | máy biểu thức `exprm.js`, quầy `stall.js` | ⭐ 1 |
| 2 | 🍬 **Chia phần tổng và hiệu** | D | 5, 25 | sơ đồ `segment.js`, `fly.js` | 2 |
| 3 | 🚚 **Trạm cân nông sản** | G, K | 17, 20, 21 | Thử cân (`balancePlay`), xe chở hàng `trucks.js` | 3 |
| 4 | 🪚 **Xưởng mộc đo góc** | E | 7, 8, 9 | thước đo góc `angle.js` | 4 |
| 5 | 🏦 **Ngân hàng heo đất** | F, A, K | 1, 2, 10–12, 22, 23 | bảng hàng `place.js` | 5 |
| 6 | 🏙️ **Bản đồ thành phố** | F | 12, 13, 14 | tia số `line.js` | 6 |
| 7 | 🛤️ **Kỹ sư đường sắt** | L | 27–30 | ê ke `square.js` | 7 |
| 8 | 🪁 **Xưởng diều** | L | 31, 32 | bảng ghim `quad.js` | 8 |
| 9 | 🧱 **Thợ lát nền** | H | 18 | lưới diện tích `canvas.js` | 9 |
| 10 | ⏳ **Bảo tàng thời gian** | I, K | 19 | đồng hồ bấm giây, dòng thời gian | 10 |
| 11 | 📮 **Bưu tá phố chẵn lẻ** | B | 3, 15 | phố chẵn lẻ của `grade4-tools` | 11 |

Mỗi trò 2–4 cấp. Thứ tự ưu tiên chọn theo: kiến thức trọng tâm và khó nhất của Tập 1 trước (biểu thức chữ, tổng hiệu), rồi tới trò dùng lại nhiều phần sẵn có (cân, thước đo góc).

---

### 4.1 🍞 Tiệm bánh công thức (Bài 4, 24)

**Câu chuyện:** Cô chủ tiệm bánh dán bảng giá có công thức: *"Tiền = 35 000 × n + 15 000 (phí giao hàng)"*. Khách gọi điện đặt bánh, bé là thu ngân.

**Luồng một nhiệm vụ:**
1. Khách nói: *"Cho tôi 4 chiếc bánh mì, giao tận nhà!"*. Thẻ **n = 4** bay vào ô chữ trên bảng giá.
2. Bé tính theo từng dòng như sách (`createExprSteps`): `35 000 × n + 15 000` → `35 000 × 4 + 15 000` → `140 000 + 15 000` → `?`.
3. Bé gõ số tiền, bấm **"Tính tiền"**. Đúng: máy in hóa đơn trượt ra, bánh bay vào hộp, khách cười. Sai: khách nhíu mày, bảng chạy lại từng dòng, dòng sai tô cam.

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Bài 4 | Biểu thức **một chữ**, thay số rồi tính | 35 000 × n với n = 4 |
| 2 | Bài 4 | **Hai, ba chữ**: hàng rào quanh vườn hoa của tiệm, chu vi P = (a + b) × 2, P = a × 4 | a = 12 m, b = 8 m → P = 40 m |
| 3 | Bài 24 | **Tính nhanh hóa đơn**: kéo các món ghép cặp tròn trăm nghìn trước (giao hoán, kết hợp), máy chỉ tính khi bé đã ghép | 175 000 + 68 000 + 25 000 + 32 000 = (175 000 + 25 000) + (68 000 + 32 000) |
| 4 | Bài 4, 24 | **Ngược:** khách trả 155 000 đồng, mua mấy chiếc? Bé thử n bằng cách kéo núm số, máy tính ra tiền ngay | n = 4 |

- **Sinh đề:** giá bánh 5 000–60 000 đồng, tròn nghìn, kết quả ≤ 1 000 000 đồng; cấp 3 luôn có ít nhất một cặp tròn trăm nghìn.
- **Đồ hoạ:** quầy bánh, tủ kính bánh mì / bánh bông lan / bánh su kem, bảng giá phấn, máy in hóa đơn.

### 4.2 🍬 Chia phần tổng và hiệu (Bài 5, 25)

**Câu chuyện:** Hai anh em Bin và Na góp tiền tiết kiệm, nhặt hạt dẻ, chia kẹo. Mẹ nói tổng và phần hơn, bé chia cho công bằng.

**Luồng (cấp tổng, hiệu):**
1. Cả đống kẹo nằm giữa bàn, hai cái đĩa có tên hai bạn. Mẹ nói: *"Có 30 viên, anh nhiều hơn em 6 viên."*
2. Bé kéo **6 viên** ra hộp "phần hơn". Đoạn thẳng của anh dài ra đúng một khúc.
3. Bé chia đôi phần còn lại: mỗi lần chạm, một viên bay vào mỗi đĩa (đếm 1, 2, 3…), hoặc gõ số ở cấp số lớn.
4. Bấm **"Chia xong"**: 6 viên trong hộp bay sang đĩa anh. Sơ đồ đoạn thẳng hiện đủ số, đúng hình trong sách.

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Bài 25 | Tổng, hiệu nhỏ, **kẹo đếm được** (tổng ≤ 40), mỗi viên bay | 30 và 6 → 18, 12 |
| 2 | Bài 25 | **Số lớn:** xấp tiền, bao gạo. Không đếm từng cái, bé gõ số trên sơ đồ | Tổng tiết kiệm 1 200 000 đồng, anh hơn 200 000 đồng |
| 3 | Bài 25 | **Tổng hoặc hiệu ẩn trong câu:** "hai thùng có 96 lít, chuyển 8 lít thì bằng nhau" | hiệu = 16 |
| 4 | Bài 5 | **Ba bước tính:** đi chợ với 200 000 đồng, mua 3 món, còn lại bao nhiêu; mỗi bước là một đoạn thẳng | |

- **Khi sai:** đĩa nghiêng, bạn nhỏ kêu "Không công bằng!", sơ đồ chạy lại: cắt phần hơn, chia đôi, trả phần hơn.
- **Đồ hoạ:** bàn ăn gia đình, hai đĩa, hộp "phần hơn", hai bạn nhỏ (dùng lại bạn Tí, bạn Na).

### 4.3 🚚 Trạm cân nông sản (Bài 17, 20, 21)

**Câu chuyện:** Mùa thu hoạch, xe tải chở nông sản ra chợ đầu mối. Bé là người trực trạm cân.

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Bài 17 | **Đọc cân, đổi đơn vị:** bao lên cân bàn, kim quay; bé ghi bằng yến, tạ, kg | bao lúa 50 kg = 5 yến |
| 2 | Bài 17 | **Chất đủ hàng:** đơn đặt "2 tấn 5 tạ cà phê", bao cà phê 60 kg, 1 tạ… bé kéo bao lên thùng, đồng hồ trạm cân nhảy số | |
| 3 | Bài 17, 20 | **Qua cầu:** biển cầu "5T". Xe 2 tấn chở 28 tạ hàng: qua được không? Bé chọn xe nào đi, xe nào phải dỡ bớt | 2 tấn + 28 tạ = 48 tạ < 50 tạ |
| 4 | Bài 21, 22, 23 | **Sổ trạm cân:** cộng, trừ số nhiều chữ số theo kg | Cân cả xe 7 450 kg, xe rỗng 3 280 kg → hàng 4 170 kg |

- **Số liệu thật:** bao lúa 50 kg, bao cà phê 60 kg, con heo 1 tạ, con bò 4 tạ, xe tải nhỏ 2 tấn, biển cầu 5T / 10T / 13T.
- **Khi sai:** cầu rung, xe phanh lại trước cầu, chú công an giao thông thổi còi; xe lùi về, bao thừa bay xuống.

### 4.4 🪚 Xưởng mộc đo góc (Bài 7, 8, 9)

**Câu chuyện:** Bác thợ mộc nhận đơn đóng ghế, giá sách, cửa, thang. Mỗi món cần góc đúng số đo.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 8 | **Phân loại:** các mảnh gỗ cắt sẵn bay qua băng chuyền, bé thả vào thùng *nhọn / vuông / tù / bẹt*. Có ê ke để kiểm |
| 2 | Bài 7 | **Đo góc đồ vật:** đặt thước đo góc lên lưng ghế, cánh cửa, chân thang (đọc vòng trong hoặc vòng ngoài), gõ số đo |
| 3 | Bài 7, 8 | **Lắp theo đơn:** khách đặt "lưng ghế ngả 100°". Bé xoay thanh gỗ tới đúng số đo rồi bấm **"Đóng đinh"** |

- **Khi sai:** ghế lắc rồi đổ, cửa kẹt không đóng được; thước đo góc hiện lại đúng cách đặt.
- **Đồ hoạ:** xưởng gỗ có bàn bào, mạt cưa, đồ gỗ màu ấm.

### 4.5 🏦 Ngân hàng heo đất (Bài 1, 2, 10–12, 22, 23)

**Câu chuyện:** Quầy giao dịch ngân hàng của khu phố. Khách gửi, rút tiền; bé đếm tiền theo xấp.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 1, 10 | **Đếm xấp:** xấp 10 tờ 100 000 = 1 triệu, tờ 10 000, 1 000. Khách đưa tiền, bé đếm rồi ghi số; tiền bay vào khay của bảng hàng |
| 2 | Bài 11, 12 | **Gom đủ số:** khách cần rút 2 750 000 đồng, bé kéo đúng số xấp và tờ ra khay |
| 3 | Bài 22, 23 | **Sổ tiết kiệm:** số dư, gửi thêm, rút ra; cộng, trừ có nhớ |

- **Tiền thật của Việt Nam:** tờ 500 000, 200 000, 100 000, 50 000, 20 000, 10 000, 5 000, 2 000, 1 000; xấp buộc dây 10 tờ. Không vẽ chép tờ tiền thật, chỉ vẽ tờ giấy màu có mệnh giá.

### 4.6 🏙️ Bản đồ thành phố (Bài 12, 13, 14)

**Câu chuyện:** Bé là phóng viên bản tin thời sự, giới thiệu dân số các tỉnh thành trên bản đồ Việt Nam tự vẽ.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 12 | **Đọc số:** bé chạm thành phố, đọc to số dân (TTS đọc lại để so); hoặc xếp thẻ chữ số lên bảng điện tử theo lời đọc |
| 2 | Bài 14 | **Xếp bục:** kéo các thành phố lên bục từ ít đến nhiều dân |
| 3 | Bài 13 | **Làm tròn đến hàng trăm nghìn:** xe buýt chở số dân chạy về bến "1 200 000" hay "1 300 000", xe lăn về bến gần hơn |

- **Số liệu:** dân số xấp xỉ theo Tổng cục Thống kê, ghi năm nguồn trong code; xem [§9](#9-câu-hỏi-cần-chốt) câu 4.

### 4.7 🛤️ Kỹ sư đường sắt (Bài 27–30)

**Câu chuyện:** Thành phố làm tuyến tàu mới. Bé đặt đường ray và đường ngang cho tàu chạy an toàn.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 29 | **Chọn ray song song:** nhiều thanh ray, chỉ cặp song song mới cho bánh tàu chạy. Bé đặt ê ke kiểm trước khi chọn |
| 2 | Bài 27, 28 | **Đường ngang vuông góc:** vẽ đường cho người đi bộ cắt vuông góc qua đường ray bằng ê ke (chế độ Vẽ của `square.js`) |
| 3 | Bài 30 | **Nối ray qua điểm:** vẽ đường song song với ray cũ đi qua nhà ga đã cho |

- **Khi sai:** tàu chạy chậm lại, khựng trước chỗ ray lệch; ê ke hiện ra cho thấy góc không vuông.

### 4.8 🪁 Xưởng diều (Bài 31, 32)

**Câu chuyện:** Hội thi diều của trường. Bé căng dây trên bảng ghim để làm khung diều theo yêu cầu.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 31 | **Nhận dạng:** khung diều nào là hình thoi, hình bình hành (kiểm bằng thước: cạnh đối song song, bằng nhau) |
| 2 | Bài 31 | **Căng khung:** kéo chốt trên bảng ghim thành đúng hình được yêu cầu, bấm **"Thả diều"** |
| 3 | Bài 32 | **Que tính đố:** dời 1–2 que để thành hình bình hành / hình thoi |

- Diều đúng hình bay lên trời có gió, đuôi phấp phới; sai thì diều chao rồi rơi xuống cỏ.

### 4.9 🧱 Thợ lát nền (Bài 18)

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 18 | **Chọn đơn vị:** con tem (mm²), mặt bàn (dm²), sàn lớp học (m²): thả đồ vật vào đúng giỏ đơn vị |
| 2 | Bài 18 | **Lát 1 m²:** viên gạch 1 dm² bay vào khung, đồng hồ đếm tới 100 viên = 1 m² |
| 3 | Bài 18 | **Mua gạch:** phòng 5 m × 4 m, gạch 50 cm × 50 cm (4 viên một m²) → cần bao nhiêu viên |

### 4.10 ⏳ Bảo tàng thời gian (Bài 19)

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 19 | **Đoán 10 giây:** bấm đồng hồ bấm giây, đồng hồ ẩn; bé dừng khi nghĩ đủ 10 giây. Ước lượng việc thật: chạy 100 m khoảng 15 giây, đánh răng 2 phút |
| 2 | Bài 19 | **Dòng thời gian:** đặt hiện vật lên đúng thế kỉ (số La Mã) |
| 3 | Bài 19, 23 | **Cách đây bao lâu:** từ năm 1010 tới năm nay là bao nhiêu năm, thuộc mấy thế kỉ |

- **Mốc lịch sử thật:** 938 Ngô Quyền thắng trên sông Bạch Đằng (thế kỉ X); 1010 Lý Thái Tổ dời đô về Thăng Long (XI); 1288 chiến thắng Bạch Đằng thời Trần (XIII); 1428 Lê Lợi đánh thắng quân Minh (XV); 1789 Quang Trung đại phá quân Thanh (XVIII); 1945 (XX). Kiểm lại từng mốc trước khi code.

### 4.11 📮 Bưu tá phố chẵn lẻ (Bài 3, 15)

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 3 | **Bên nào?** Thư số nhà chẵn đi bên trái, lẻ bên phải; xe đạp bưu tá rẽ đúng bên |
| 2 | Bài 3, 15 | **Nhà kế tiếp:** nhà 247 thì hai nhà bên cạnh cùng dãy là số mấy |
| 3 | Bài 15 | **Đếm nhà:** từ nhà 120 tới nhà 160 cùng dãy chẵn có bao nhiêu nhà |

---

## 5. Để sau: Tập 2 và SGK 2011

Không làm trước khi xong Tập 1. Ghi lại ý để khỏi quên:

- 🧃 **San nước trung bình cộng:** mấy cốc nước cao thấp khác nhau, bé rót qua lại cho bằng nhau; mực chung là trung bình cộng (dùng lại Thử rót). Trung bình cộng có trong SGK 2011 (`grade4-textbook`).
- 🍕 **Tiệm pizza phân số:** cắt bánh thành phần bằng nhau, khách gọi 3/8 cái.
- ✖️ **Xưởng đóng thùng:** nhân, chia số nhiều chữ số (dùng lại Luyện Tính lớp 4).

---

## 6. Phần thưởng

Giống lớp 2, 3: sao theo số nhiệm vụ thất bại (0 → ⭐⭐⭐, 1–2 → ⭐⭐, nhiều hơn → ⭐), dòng rating `'g4games:<level-id>'` trong `src/data/starRatings.js`, sao vào nhóm lớp 4 của bảng xếp hạng; mỗi ván xong = 1 lượt giải trong quy tắc sticker lớp 2+ (10 lượt = 1 lần quay); kỷ lục mỗi cấp.

---

## 7. Kỹ thuật (dự kiến)

```
src/games/grade4Games.js             ← hub "Trò chơi tăng cường" lớp 4 (renderGamesHub với cấu hình lớp 4)
src/games/grade4Games/
  catalog.js                          ← nguồn duy nhất: trò, cấp, lessons / also (bai-N của grade4-tools)
  bakery.js  share.js  weigh.js  carpenter.js  bank.js  map.js  rail.js  kite.js  tiles.js  museum.js  post.js
  art/                                ← cảnh riêng lớp 4 (tiệm bánh, xưởng mộc, trạm cân, cầu…)
```

- **Dùng chung với lớp 3:** `loop.js` (vòng nhiệm vụ, tổng kết, chơi lại), `market/stall.js` (NPC, bong bóng, máy tính, thẻ kết quả), `npc.js`, `fly.js`, `mountOrientation`.
- **Dùng chung với 🧰 công cụ lớp 4:** các bộ vẽ trong `src/games/grade4Tools/` (`angle.js`, `square.js`, `quad.js`, `place.js`, `line.js`, `exprm.js`, `canvas.js`). Nếu cần sửa để nhúng vào cảnh thì giữ nguyên hành vi trong `grade4-tools`, thử lại Khám phá và Thực hành của các Bài dùng công cụ đó.
- **Cờ phát hành:** `GRADE4_GAMES = import.meta.env.DEV` trong `src/data/features.js`; nạp bằng `import()` động; bật `true` trong commit riêng khi bạn chốt.
- **Trang dev** `/g4games-dev.html` (không cần đăng nhập) + móc DEV để thử bằng Playwright như lớp 2, 3.
- Số lớn luôn nhóm 3 chữ số bằng khoảng trắng hẹp như sách (`2 712 615`).

---

## 8. Lộ trình

| Giai đoạn | Nội dung | Kết quả |
|---|---|---|
| 0 | Cảnh mẫu tĩnh Tiệm bánh công thức | Duyệt phong cách |
| 1 | Nút vào trong `grade4-tools` + hub + catalog + 🍞 Tiệm bánh (4 cấp) | Chơi được trọn một trò lớp 4 |
| 2 | 🍬 Chia phần → 🚚 Trạm cân → 🪚 Xưởng mộc | Phủ phần trọng tâm Tập 1 |
| 3 | 🏦 Ngân hàng → 🏙️ Bản đồ → 🛤️ Đường sắt → 🪁 Diều | Số lớn và hình học |
| 4 | 🧱 Lát nền → ⏳ Bảo tàng → 📮 Bưu tá; chế độ "Trộn đề" | Phủ hết Bài 1–37 |
| Phát hành | Bạn chốt → `GRADE4_GAMES = true` | Lên production |

---

## 9. Câu hỏi cần chốt

| # | Vấn đề | Đề xuất |
|---|---|---|
| 1 | Thứ tự ưu tiên | Như bảng [§4](#4-danh-sách-trò-chơi): Tiệm bánh → Chia phần → Trạm cân → Xưởng mộc → … |
| 2 | Số nhiệm vụ mỗi ván | 6, như lớp 3 |
| 3 | Thẻ SGK Toán 4 (2011) `grade4-textbook` có nút 🎮 không? Đánh số Bài khác bộ Kết nối tri thức | Có, catalog thêm `lessons2011` cho từng cấp; làm sau khi đủ trò Tập 1 |
| 4 | Dân số tỉnh thành ở trò Bản đồ thay đổi theo năm | Dùng số xấp xỉ một năm nguồn cố định, ghi năm trên màn hình ("năm 2024") |
| 5 | Tiếng Anh | Chưa làm, như `grade4-tools` |
| 6 | Phát hành | Chỉ bản dev tới khi bạn chốt |
