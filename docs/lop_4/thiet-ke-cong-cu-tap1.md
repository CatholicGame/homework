# Thiết kế công cụ học trực quan: Toán 4, Tập 1

> Trạng thái: **đã code đủ Bài 1–37** (2026-10-04), thẻ `grade4-tools` trong khối Lớp 4. Quyết định ở [§8](#8-đã-chốt), mã nguồn ở [§9](#9-mã-nguồn).
>
> Nguồn nội dung: SGK Toán 4 Tập Một, bộ Kết nối tri thức (`docs/lop_4/04-sgk-toan-4-tap-mot.pdf`, 7 chủ đề, Bài 1–37). PDF là ảnh quét, số trang PDF = số trang sách.

---

## 1. Ý tưởng chính

Sách lớp 4 khác sách lớp 2, 3 ở chỗ: số lớn tới **hàng trăm triệu**, có **góc đo bằng độ**, **đơn vị đo mới** (yến, tạ, tấn, dm², m², mm², giây, thế kỉ), **vẽ đường vuông góc, song song**. Đây là những thứ trẻ khó hình dung nếu chỉ nhìn số trên giấy.

Vì vậy thay vì làm "vở bài tập điện tử", phần lớp 4 là một **hộp công cụ**: mỗi công cụ là một đồ vật trẻ cầm được trên màn hình (bảng hàng, tia số phóng to, thước đo góc, ê ke, cân, lưới ô vuông…). Mỗi Bài trong sách dùng một hoặc hai công cụ, theo hai bước:

| Bước | Trẻ làm gì | Ví dụ (Bài 7, Đo góc) |
|---|---|---|
| **① Khám phá** | Làm theo hướng dẫn từng bước, có giọng đọc. Công cụ tự cho thấy quy tắc. Không chấm. | Kéo thước đo góc đặt vào đỉnh O, xoay cho vạch 0 trùng cạnh OA, đọc số 60 ở cạnh OB. |
| **② Thực hành** | Chuỗi 5 nhiệm vụ do máy sinh ngẫu nhiên, mỗi nhiệm vụ thành công / thất bại như các trò lớp 3. Có sao. | Đo 5 góc lạ; có góc phải đọc vòng số trong, có góc phải đọc vòng ngoài. |

Một công cụ dùng lại cho nhiều Bài, mỗi Bài bật một **chế độ** (ví dụ Bảng hàng ở Bài 1 chỉ có 5 cột, tới Bài 12 có đủ 9 cột lớp triệu). Vậy chỉ cần **12 công cụ** cho cả 37 Bài.

### Nguyên tắc (giữ như các trò lớp 2, 3)

- **Đúng phạm vi đã học:** mỗi chế độ chỉ dùng kiến thức đến Bài đó. Bài 1–9 số đến 100 000; từ Bài 10 đến 999 999; từ Bài 12 đến lớp triệu.
- **Không chép bài sách:** số và tình huống do máy sinh, đồ hoạ tự vẽ SVG cùng phong cách. Sách chỉ là nguồn ý tưởng.
- **Số liệu thật:** giá tiền, cân nặng, dân số, năm sinh nhân vật lịch sử là con số hợp lý ngoài đời (con voi 4 tấn, bao gạo 50 kg, xe máy 18 490 000 đồng).
- **Mọi thao tác có chuyển động** (bay, xoay, lăn, phóng to) và cảnh phản ứng khi xong. Máy tắt hiệu ứng thì chạy bản êm, không bỏ bước dạy.
- **Bố cục theo skill `game-screen-layout`:** công cụ chiếm hết chỗ trống, cảnh vẽ phía sau, nút to, không nhảy bố cục trong một lượt, kiểm bằng ảnh chụp ngang + dọc.
- **Ít chữ:** một câu yêu cầu, có giọng đọc; khi trẻ làm sai thứ tự, nhân vật nói phải làm gì trước và nút cần bấm nhấp nháy.
- **Chữ trên màn hình:** không dùng "nhé", không dùng dấu gạch dài, không hứa "miễn phí".
- **Có tiếng Anh** (bộ dịch `engine/i18n.js` như các sách toán khác).

---

## 2. Bản đồ: Bài → công cụ

| Chủ đề | Bài | Công cụ chính | Công cụ phụ |
|---|---|---|---|
| **1. Ôn tập và bổ sung** | 1. Ôn tập các số đến 100 000 | 🧱 Bảng hàng | 📏 Tia số |
| | 2. Ôn tập các phép tính trong phạm vi 100 000 | ✍️ Đặt tính có nhớ | |
| | 3. Số chẵn, số lẻ | 🏘️ Phố chẵn lẻ | |
| | 4. Biểu thức chứa chữ | ⚙️ Máy biểu thức chữ | |
| | 5. Giải bài toán có ba bước tính | 📊 Sơ đồ đoạn thẳng | |
| | 6. Luyện tập chung | Trộn đề công cụ 1–5 | |
| **2. Góc và đơn vị đo góc** | 7. Đo góc, đơn vị đo góc | 📐 Thước đo góc | |
| | 8. Góc nhọn, góc tù, góc bẹt | 📐 Thước đo góc (chế độ Quạt góc) | 🕐 Đồng hồ góc |
| | 9. Luyện tập chung | Trộn đề | |
| **3. Số có nhiều chữ số** | 10. Số có sáu chữ số. Số 1 000 000 | 🧱 Bảng hàng (6 cột, khối lập phương) | |
| | 11. Hàng và lớp | 🧱 Bảng hàng (tô màu lớp) | |
| | 12. Các số trong phạm vi lớp triệu | 🧱 Bảng hàng (9 cột) | |
| | 13. Làm tròn số đến hàng trăm nghìn | 📏 Tia số (chế độ Lăn bi) | |
| | 14. So sánh các số có nhiều chữ số | 🧱 Bảng hàng (chế độ So hàng) | |
| | 15. Làm quen với dãy số tự nhiên | 📏 Tia số (chế độ Bước nhảy) | 🃏 Thẻ số |
| | 16. Luyện tập chung | Trộn đề | 🃏 Thẻ số |
| **4. Một số đơn vị đo đại lượng** | 17. Yến, tạ, tấn | ⚖️ Thang đơn vị và cân | |
| | 18. Đề-xi-mét vuông, mét vuông, mi-li-mét vuông | 🔲 Lưới diện tích | |
| | 19. Giây, thế kỉ | ⏱️ Đồng hồ bấm giây + 📜 Dòng thời gian | |
| | 20. Thực hành, trải nghiệm đơn vị đo | 🛒 Hội chợ trường (ghép các công cụ đo) | |
| | 21. Luyện tập chung | Trộn đề | |
| **5. Phép cộng và phép trừ** | 22. Phép cộng các số có nhiều chữ số | ✍️ Đặt tính có nhớ | |
| | 23. Phép trừ các số có nhiều chữ số | ✍️ Đặt tính có nhớ | |
| | 24. Tính chất giao hoán và kết hợp của phép cộng | 🧩 Thanh ghép số | ⚙️ Máy biểu thức chữ |
| | 25. Tìm hai số biết tổng và hiệu | 📊 Sơ đồ đoạn thẳng (chế độ Cắt phần hơn) | |
| | 26. Luyện tập chung | Trộn đề | |
| **6. Đường thẳng vuông góc, song song** | 27. Hai đường thẳng vuông góc | 📐 Ê ke và giấy ô | |
| | 28. Thực hành vẽ hai đường thẳng vuông góc | 📐 Ê ke và giấy ô (chế độ Vẽ) | |
| | 29. Hai đường thẳng song song | 📐 Ê ke và giấy ô | |
| | 30. Thực hành vẽ hai đường thẳng song song | 📐 Ê ke và giấy ô (chế độ Vẽ) | 🧩 Ghép hình |
| | 31. Hình bình hành, hình thoi | 📌 Bảng ghim tứ giác | 🧩 Ghép hình |
| | 32. Luyện tập chung | Trộn đề | 🥢 Que tính đố |
| **7. Ôn tập học kì 1** | 33–37 | Trộn đề theo nhóm: số (33), cộng trừ (34), hình (35), đo lường (36), chung (37) | |

---

## 3. Mười hai công cụ

Mỗi công cụ ghi: hình dạng trên màn hình, các chế độ theo Bài, nhiệm vụ Thực hành, và **điểm gây hiểu lầm** mà công cụ phải cho trẻ thấy.

### 3.1 🧱 Bảng hàng (Bài 1, 10, 11, 12, 14, 16, 33)

**Hình:** một bàn gỗ dài chia cột, mỗi cột là một hàng (đơn vị, chục, trăm, nghìn…). Phía dưới là khay thẻ giá trị (1, 10, 100, 1 000, 10 000, 100 000, 1 000 000…), giống trang 33 của sách. Trên cùng là **bảng số** hiện con số đang có, dưới là **dòng đọc số** (TTS đọc khi bấm 🔊).

- Kéo thẻ vào cột → thẻ bay vào, chồng lên nhau; số trên bảng đổi ngay.
- **Đủ 10 thẻ trong một cột** thì 10 thẻ bay dồn lại thành 1 thẻ của cột bên trái (đổi 10 lấy 1). Đây là chỗ trẻ hiểu "10 chục nghìn = 1 trăm nghìn".
- Có **nút đổi cách xem**: thẻ giá trị ↔ bàn tính cột hạt (sách dùng cả hai, trang 44, 49, 53) ↔ khối lập phương (Bài 10: 1 000 khối nhỏ = 1 khối nghìn, 1 000 khối nghìn = 1 khối triệu, vẽ phóng to dần).

| Chế độ | Bài | Có gì |
|---|---|---|
| 5 hàng | 1 | Đến hàng chục nghìn. Phân tích số thành tổng (36 515 = 30 000 + 6 000 + 500 + 10 + 5): mỗi cột hiện giá trị của nó, các giá trị bay xuống thành dòng tổng. |
| 6 hàng + 1 triệu | 10 | Thêm hàng trăm nghìn. Đếm thêm 1 từ 999 999: các cột lần lượt tràn, ra 1 000 000. |
| Hàng và lớp | 11 | Ba cột cùng lớp có chung một nền màu (lớp đơn vị xanh lá, lớp nghìn xanh dương, lớp triệu tím). Số trên bảng tự cách nhóm 3 chữ số theo đúng màu. |
| 9 hàng | 12 | Đủ lớp triệu. Bàn dài hơn nên cuộn ngang được, nhưng luôn thấy cả 3 lớp ở chế độ thu nhỏ. |
| So hàng | 14 | Hai số xếp **thẳng cột** trên hai tầng. Máy soi từ trái sang phải, cột nào hai số khác nhau thì sáng lên và dừng lại; ít chữ số hơn thì cột trống hiện rõ. |

**Thực hành (ngẫu nhiên):** lập số theo lời đọc; đọc số (chọn trong 3 cách đọc); chữ số gạch chân thuộc hàng nào, lớp nào; giá trị của chữ số 7; viết số thành tổng; chọn dấu >, <, = rồi xem máy soi kiểm chứng; mở két sắt bằng mã số thoả 3 điều kiện (ý tưởng trang 45).

**Điểm hiểu lầm:** số 0 ở giữa (1 000 001: cột trống vẫn là một hàng); "chữ số" khác "giá trị của chữ số"; số nhiều chữ số hơn thì lớn hơn (trang 48, bạn Việt so chữ số tận cùng là sai).

### 3.2 📏 Tia số phóng to (Bài 1, 13, 14, 15)

**Hình:** một con đường dài có cột mốc, có nút **kính lúp** để phóng to giữa hai mốc (từ bước 100 000 xuống bước 10 000, 1 000…). Cảnh nền đổi theo độ lớn: số nhỏ là con đường làng, số lớn là đường cao tốc.

| Chế độ | Bài | Có gì |
|---|---|---|
| Điền mốc | 1 | Mốc trống trên tia số; kéo thẻ số vào. Số liền trước, liền sau. |
| Lăn bi | 13 | Đặt số (2 712 615) lên tia giữa hai mốc tròn trăm nghìn. Một viên bi đặt ở số đó, **mặt đường nghiêng về mốc gần hơn**, bi lăn về đó. Số đúng giữa (2 750 000) thì đường nghiêng về phía lớn (quy ước "bằng 5 thì làm tròn lên"). Sau đó mới hiện quy tắc nhìn chữ số hàng chục nghìn. |
| Đặt số | 14 | Hai số đặt lên tia; số nằm bên phải là số lớn hơn. |
| Bước nhảy | 15 | Con châu chấu nhảy đều bước (1, 2, 5, 10, 1 000…). Trẻ đoán nó đáp ở đâu. Dãy số tự nhiên: bắt đầu từ 0, nhảy mãi không hết (tia kéo dài ra mép màn hình). |

**Thực hành:** làm tròn giá tiền (xe máy, xe đạp) đến hàng trăm nghìn; tìm số làm tròn ra kết quả cho trước; điền số còn thiếu trong dãy có quy luật; số liền trước / liền sau.

### 3.3 ✍️ Đặt tính có nhớ (Bài 2, 22, 23, 34)

Mở rộng `grade3Drills/column.js` lên 9 chữ số. Điểm mới là **chế độ Khám phá đọc từng bước** đúng như sách (trang 76): mỗi cột sáng lên, giọng đọc "6 cộng 5 bằng 11, viết 1 nhớ 1", chữ số 1 nhỏ bay lên đầu cột bên trái. Trẻ bấm "Tiếp" để đi từng cột.

- Phép trừ có mượn: "0 không trừ được 7, lấy 10 trừ 7 bằng 3, viết 3 nhớ 1"; số 1 nhớ bay xuống cộng vào số trừ của cột bên.
- Thực hành: trẻ tự gõ từng cột từ phải sang trái; quên nhớ thì cột đó rung và số nhớ nhấp nháy.
- Chế độ **Tìm chữ số bị che** (trang 78, 81): ô "?" trong phép tính, trẻ suy ngược theo cột.
- Nhân, chia số có 5 chữ số với số có 1 chữ số (Bài 2) dùng lại `division.js` và phần nhân sẵn có.

### 3.4 🏘️ Phố chẵn lẻ (Bài 3)

**Hình:** một con phố, bên trái nhà số chẵn, bên phải nhà số lẻ (như tranh trang 12).

- **Khám phá:** một số hiện thành các chấm tròn, các chấm tự **xếp thành từng đôi**. Hết đôi, không thừa → chẵn, cờ xanh. Thừa 1 chấm → lẻ, cờ cam. Sau 4–5 số, máy làm mờ mọi chữ số, chỉ chừa chữ số tận cùng sáng lên: "Chỉ cần nhìn chữ số cuối".
- **Thực hành:** người đưa thư cầm thư có số nhà, trẻ kéo thư sang đúng bên phố; con ong bay theo đường số chẵn tới bông hoa; điền số nhà còn thiếu (116, 118, ?…); lập số chẵn / số lẻ từ 3 thẻ số.

### 3.5 ⚙️ Máy biểu thức chữ (Bài 4, 24)

**Hình:** một cỗ máy có **khe chữ** (a, b, c) và màn hình biểu thức (ví dụ `2 + a`). Mỗi khe có một **núm vặn số**.

- Vặn núm a = 4 → số 4 bay vào chỗ chữ a trong biểu thức, máy chạy, ra giá trị 6, giá trị được ghi xuống **bảng kết quả** bên cạnh. Vặn tiếp a = 12 → thêm dòng mới. Trẻ thấy "mỗi lần thay chữ bằng một số thì được một giá trị".
- **Công thức chu vi sống:** hình vuông cạnh a, hình chữ nhật a, b, tam giác a, b, c. Kéo góc hình để kéo dài cạnh, số a đổi theo, P tính lại ngay.
- **Bài 24:** máy có hai màn hình `a + b` và `b + a`, vặn bao nhiêu lần thì hai kết quả vẫn bằng nhau. Tương tự `(a + b) + c` và `a + (b + c)`.
- **Thực hành:** tính giá trị biểu thức với giá trị chữ cho trước; chọn giá trị chữ để biểu thức lớn nhất; nối biểu thức với kết quả (đàn hải cẩu trang 15); trò "Hái bưởi" của sách làm lại thành đường đi có ô biểu thức.

Dùng lại cách hiện và chấm biểu thức của 🤖 Rô-bốt biểu thức (lớp 3).

### 3.6 📊 Sơ đồ đoạn thẳng (Bài 5, 25)

Mở rộng `grade3Drills/segment.js`.

- **Ba bước tính (Bài 5):** ba thanh màu (Đội Một, Đội Hai, Đội Ba), phần hơn / kém vẽ đúng tỉ lệ. Bài giải là **chuỗi 3 toa tàu**: mỗi toa là một bước (tìm đội Hai, tìm đội Ba, tìm tổng). Toa trước xong mới mở toa sau, kết quả toa trước bay sang toa sau.
- **Tổng và hiệu (Bài 25), chế độ Cắt phần hơn:** hai thanh, thanh dài hơn có phần thừa bằng hiệu. Trẻ cầm **kéo** cắt phần thừa → hai thanh bằng nhau → thanh tổng co lại đúng bằng (tổng − hiệu) → chia đôi thành số bé. Cách thứ hai: **dán thêm** phần thiếu vào thanh ngắn → tìm số lớn trước. Đúng hai cách giải của sách trang 86–87.
- **Thực hành:** đề có lời văn ngắn, số thật (trứng vịt, trứng gà ở chợ; tuổi hai chị em; học sinh nam nữ). Trẻ kéo số vào sơ đồ trước, rồi mới viết phép tính.

### 3.7 📐 Thước đo góc (Bài 7, 8, 9, 35)

**Hình:** tờ giấy lớn có góc vẽ sẵn, một thước đo góc bán nguyệt trong suốt có **hai vòng số** (trong và ngoài, như thước thật).

- **Khám phá đo góc:** 3 bước, mỗi bước một nút nhấp nháy: ① kéo tâm thước vào đỉnh O (hít vào khi gần), ② xoay thước cho vạch 0 nằm trên cạnh OA, ③ đọc số ở cạnh OB. Vòng số chứa vạch 0 vừa đặt sẽ **sáng lên**, vòng còn lại mờ đi. Đây là lỗi hay gặp nhất (đọc 120 thay vì 60).
- **Chế độ Quạt góc (Bài 8):** một chiếc quạt giấy (hoặc cái kéo, như sách trang 27) mở dần. Nền đổi màu theo vùng: nhỏ hơn 90° là góc nhọn, đúng 90° có ô vuông nhỏ góc vuông, từ 90° đến 180° là góc tù, 180° là góc bẹt (quạt mở thẳng). Trẻ mở quạt theo yêu cầu "mở thành góc tù".
- **🕐 Đồng hồ góc:** dùng lại mặt đồng hồ của `grade3Drills/time.js`. Hai kim tạo góc; chọn loại góc; tìm giờ để hai kim vuông góc. Trò "Giải cứu khủng long" của sách thành bàn cờ ô đồng hồ.
- **Thực hành:** đo góc (đọc số trên thước, sai ±0); vẽ góc theo số đo (xoay tia tới số độ); phân loại góc trong hình (bánh pizza, nan bánh xe, hình ngôi sao); con nhện tìm đường đi qua góc tù.

### 3.8 ⚖️ Thang đơn vị và cân (Bài 17, 20, 21, 36)

**Hình:** **cầu thang 4 bậc**: kg → yến → tạ → tấn. Mỗi bậc có hình đại diện: bao 10 kg (1 yến), 10 bao chất lên xe ba gác (1 tạ), 10 xe ba gác đổ lên xe tải (1 tấn).

- **Khám phá:** kéo bao gạo lên xe; đủ 10 bao thì xe chạy lên bậc trên, bảng ghi "10 yến = 1 tạ". Đi xuống bậc thì xe đổ ra thành 10 phần.
- **Đổi đơn vị:** đặt "3 tạ 2 yến" lên thang, các vật trượt xuống bậc kg và hiện 320 kg.
- **Cân thật:** dùng lại cân bàn và cân đồng hồ của lớp 3 (`kit_measure`, Thử cân) cho chọn cân nặng hợp lý (voi 4 tấn, mèo 4 kg, bò 4 tạ, khỉ 4 yến).
- **Trò Voi qua cầu** (ý tưởng trang 59): các cây cầu có biển giới hạn (1 tấn, 160 kg, 1 tạ 20 kg…), voi con nặng 150 kg; trẻ chọn đường chỉ đi qua cầu chịu được. Thuyền chở tối đa 1 tạ: xếp người qua sông theo nhiều chuyến.

### 3.9 🔲 Lưới diện tích (Bài 18)

**Hình:** một căn phòng nhìn từ trên xuống, nền chưa lát; khay gạch vuông 1 cm², 1 dm², 1 m².

- **Kính lúp đơn vị:** chạm vào 1 ô dm² thì phóng to ra thấy 10 × 10 = 100 ô cm². Chạm ô cm² thì thấy 100 ô mm² (một con kiến đứng cạnh cho cảm giác cỡ). Chạm 1 m² thì lùi ra thấy 100 ô dm² và một bạn nhỏ đứng trong ô cho cảm giác lớn.
- **Lát sàn:** kéo gạch phủ kín phòng; đếm số gạch → diện tích. Gạch to quá hoặc nhỏ quá thì nhân vật nhắc chọn đơn vị hợp lý.
- **Kích thước thật:** đồ vật vẽ **đúng tỉ lệ** với ô lưới (mặt bàn 3 dm², bìa sách 6 dm², tem thư 6 cm², sân bóng 7 140 m²), diện tích vẽ tỉ lệ với số đo.
- **Thực hành:** chọn đơn vị hợp lý; đổi đơn vị (1 m² 50 dm² = ? dm²); so sánh diện tích hình chữ nhật và hình vuông bằng cách đặt chồng lưới; tính số tấm gỗ lát sàn.

### 3.10 ⏱️ Đồng hồ bấm giây và 📜 Dòng thời gian (Bài 19)

- **Đồng hồ bấm giây:** kim giây chạy, mỗi vạch là 1 giây; đủ một vòng 60 giây thì kim phút nhích 1 vạch ("1 phút = 60 giây"). Trẻ bấm Bắt đầu / Dừng để thử "nín thở được bao nhiêu giây", "vỗ tay 10 lần mất mấy giây". Đổi phút giây: kim quay 2 vòng 30 giây thì ra 150 giây.
- **Dòng thời gian thế kỉ:** một dải dài chia khối 100 năm, mỗi khối ghi thế kỉ bằng số La Mã (I, II… XXI). Kéo nhân vật lịch sử hoặc sự kiện (Trần Hưng Đạo 1228, Đinh Bộ Lĩnh 924, Sài Gòn 1698…) theo năm vào đúng khối. Năm 1900 thuộc thế kỉ XIX, năm 2000 thuộc thế kỉ XX: khối kết thúc ở năm tròn trăm, khối sáng lên để thấy rõ chỗ dễ nhầm.
- **Năm nhuận:** lịch tháng Hai lật nhanh qua các năm, năm nào có ngày 29 thì sáng lên; trẻ thấy cứ 4 năm một lần.

### 3.11 🧩 Thanh ghép số (Bài 24) và Thẻ số (Bài 15, 16, 26)

- **Thanh ghép:** các thanh màu dài a, b, c (như sách trang 83). Đổi chỗ các thanh trên đường ray, tổng chiều dài không đổi. Chế độ **Tìm cặp tròn trăm**: trong `75 + 219 + 25`, chạm hai số cộng được số tròn thì chúng nối lại thành một thanh tròn, tính nhanh hơn. Máy so số bước của cách nhanh và cách lần lượt.
- **Thẻ số:** các tấm thẻ chữ số; lập số lớn nhất / bé nhất có n chữ số, lập số chẵn lớn nhất; đổi chỗ hai thẻ (đếm số lượt ít nhất, trang 89); que tính tạo chữ số (dời 1, 2 que để được số bé nhất, trang 8, 52).

### 3.12 📐 Ê ke và giấy ô, 📌 Bảng ghim tứ giác (Bài 27–32, 35)

Mở rộng 🏗️ Kiến trúc sư bảng ghim (lớp 3) và thêm ê ke.

- **Ê ke ảo:** một ê ke kéo xoay được trên giấy ô. Đặt góc vuông của ê ke vào chỗ hai đường cắt nhau: khít thì hiện ô vuông xanh "vuông góc", hở thì thấy khe hở đỏ.
- **Vẽ đường vuông góc qua điểm H (Bài 28):** 2 bước như sách: ① đặt một cạnh ê ke trùng đường AB, trượt cho cạnh kia chạm H; ② kéo bút dọc cạnh ê ke. Hai trường hợp: H nằm trên AB và H nằm ngoài AB.
- **Vẽ đường song song (Bài 30):** vẽ vuông góc hai lần (qua H vuông góc với AB được MN, rồi qua H vuông góc với MN được CD). Kiểm chứng: kéo dài hai đường mãi ra mép giấy, chúng không gặp nhau; đo khoảng cách ở hai đầu bằng nhau.
- **Bảng ghim tứ giác (Bài 31):** 4 dây chun căng trên các đinh. Kéo đỉnh thì máy hiện **ký hiệu sống**: vạch nhỏ trên các cạnh bằng nhau, mũi tên trên các cạnh song song, ô vuông ở góc vuông. Tên hình đổi theo: tứ giác → hình bình hành → hình thoi → hình chữ nhật → hình vuông. Nhiệm vụ: "kéo một đỉnh để thành hình thoi", "đỉnh C bị che, cắm đinh đúng chỗ".
- **🧩 Ghép hình:** tangram 7 miếng tự cắt từ hình vuông (Bài 30), ghép các miếng tam giác thành hình bình hành / hình thoi (trang 109). Gấp giấy cắt hình thoi (hoạt hình gấp, cắt, mở ra).
- **🥢 Que tính đố:** dời 2 que để được 2 hình thoi, bớt que để không còn hình bình hành (trò "Lấy que tính" trang 124).
- **Tìm trong tranh:** cảnh (cối xay gió, đường ray, diều, khung tranh) có các đoạn ẩn; trẻ chạm để tô các cặp vuông góc / song song.

---

## 4. Vị trí trong app

Đề xuất (cần chốt, xem [§8](#8-cần-chốt)):

- Thêm khối **Lớp 4** trong `src/data/grades.js`, có thẻ **"Toán 4: Học bằng công cụ, Tập Một"** (biểu tượng 🧰).
- Mở thẻ → danh sách **7 chủ đề, 37 Bài** đúng thứ tự sách. Mỗi Bài có 2 nút: **① Khám phá** và **② Thực hành** (có sao). Bài Luyện tập chung và Ôn tập chỉ có Thực hành dạng trộn đề.
- Có thêm trang **"Hộp công cụ"**: mở thẳng một công cụ ở chế độ tự do (chơi, thử số bất kỳ, không chấm). Phụ huynh, giáo viên dùng để giảng.
- Mở Bài nào thì chỉ dùng kiến thức của Bài đó và các bài trước.
- Sao: tiền tố `tool4:` trong `src/data/starRatings.js`. Tiến độ và sao đi qua `scopedKey` + `tth:data-changed` để đồng bộ Drive.

---

## 5. Kỹ thuật

- Thư mục `src/games/grade4Tools/` với một file cho mỗi công cụ, file `catalog.js` khai báo 37 Bài → công cụ, chế độ, phạm vi số (nguồn duy nhất, giống `grade3Games/catalog.js`).
- Dùng lại: `grade3Drills/kit.js` (khung luyện, nút to, rung, bay), `grade3Games/fly.js`, `npc.js`, `stall.js` (nhắc chú ý), giọng đọc TTS có fallback, `time.js` (mặt đồng hồ), `segment.js`, `column.js`, `division.js`, `pinboard.js`, Thử cân của lớp 3.
- Mỗi công cụ là một **mô hình dữ liệu + bộ vẽ SVG**, chế độ Khám phá là kịch bản các bước trên chính công cụ đó (không vẽ riêng), để Khám phá và Thực hành luôn giống nhau.
- Kéo thả, xoay (thước đo góc, ê ke) dùng Pointer Events, chạy được cả cảm ứng iPad; có nút xoay ±1° và ±15° cho bé khó xoay bằng hai ngón.
- Số lớn luôn hiện cách nhóm 3 chữ số bằng khoảng trắng hẹp như sách (`2 712 615`).
- Kiểm bố cục bằng `scripts/games-preview.html`, ngang + dọc, đầu / giữa / cuối lượt.

---

## 6. Lộ trình đề xuất

Ưu tiên công cụ dùng cho nhiều Bài và khó hình dung nhất trên giấy:

| Đợt | Công cụ | Phủ Bài |
|---|---|---|
| 1 | 🧱 Bảng hàng, 📏 Tia số, khung thẻ Lớp 4 + danh sách Bài | 1, 10–16, 33 (9 Bài) |
| 2 | 📐 Thước đo góc + 🕐 Đồng hồ góc | 7–9, 35 |
| 3 | 📐 Ê ke và giấy ô, 📌 Bảng ghim tứ giác, 🧩 Ghép hình, 🥢 Que tính | 27–32, 35 |
| 4 | ⚖️ Thang đơn vị và cân, 🔲 Lưới diện tích, ⏱️📜 Giây và thế kỉ | 17–21, 36 |
| 5 | ✍️ Đặt tính, 🏘️ Phố chẵn lẻ, ⚙️ Máy biểu thức, 📊 Sơ đồ, 🧩 Thanh ghép | 2–6, 22–26, 34 |
| 6 | Trộn đề cho các Bài Luyện tập chung, Ôn tập; bộ dịch tiếng Anh | 6, 9, 16, 21, 26, 32, 37 |

Mỗi đợt xong: chụp màn hình kiểm bố cục, thêm dòng sao, cập nhật bộ dịch.

---

## 7. Ngoài phạm vi bản này

- Toán 4 Tập Hai (phân số, nhân chia số nhiều chữ số…). Làm sau khi Tập Một xong.
- Vở bài tập Toán 4 (chưa có file PDF). Nếu sau này có, mỗi Bài trong vở sẽ có nút mở công cụ tương ứng, giống cách các trò lớp 3 gợi ý ở màn kết quả.

---

## 8. Đã chốt

1. **Nơi đặt:** thẻ riêng 🧰 "Toán 4: Học bằng công cụ" trong khối Lớp 4 (`grade4-tools`).
2. **Sao:** Thực hành có sao (`tool4:bai-N`, 3 sao; Luyện tập chung, Ôn tập 4 sao; Bài 37 5 sao). Khám phá không chấm, chỉ đánh dấu "đã xem".
3. **Trọng tâm:** phần công cụ giải thích (Khám phá). Đã làm hết 26 bài có Khám phá; 11 bài Luyện tập chung / Ôn tập chỉ có Thực hành trộn.
4. **Tiếng Anh:** chưa làm cho lớp 4 (sách không có từ điển trong `engine/i18n.js` nên luôn hiện tiếng Việt).

## 9. Mã nguồn

- `src/games/grade4Tools.js`: danh sách chủ đề, màn bài (Khám phá / Thực hành).
- `src/games/grade4Tools/catalog.js`: 37 bài → công cụ, bài trộn (`mix`).
- `src/games/grade4Tools/frame.js`: trình chạy Khám phá (`runExplore`: các bước, `c.say`, `c.until` chờ em thao tác, `c.choose` nút chọn), tiến độ `g4tools-v1`.
- `src/games/grade4Tools/practice.js`: Thực hành trên vòng chơi `grade3Games/loop.js`; câu hỏi `ask` (bàn phím) / `choose` (nút to); task có `stage` thì tự dựng cả màn (đặt tính của Luyện Tính lớp 3).
- Công cụ: `place.js` (bảng hàng, cả đơn vị kg/yến/tạ/tấn, máy soi so sánh), `line.js` (tia số), `angle.js` (thước đo góc, quạt góc, đồng hồ), `square.js` (ê ke, giấy ô), `quad.js` (bảng ghim tứ giác), `exprm.js` (máy biểu thức), `colview.js` (đặt tính từng bước), `canvas.js` (tấm vẽ cho diện tích, thời gian, sơ đồ, chẵn lẻ).
- Nội dung từng bài: `src/games/grade4Tools/lessons/*.js` (gộp ở `lessons/index.js`).
- Kiểm tra (bản dev): `window.__g4ans` (đáp án câu đang hỏi), `window.__g4solve` (tự giải câu kéo thả), `window.__g4ex` / `window.__g4until` (nút chọn / bước chờ của Khám phá).
- Còn có thể làm thêm: màn dọc của các công cụ vẽ trên giấy ô (ê ke, bảng ghim, sơ đồ, diện tích) còn khoảng trống trên dưới vì hình vẽ theo khổ ngang.
