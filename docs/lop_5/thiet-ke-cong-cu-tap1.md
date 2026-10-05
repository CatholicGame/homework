# Thiết kế công cụ học trực quan và Luyện Tính: Toán 5, Tập Một

> Kiến thức từng bài: [kien-thuc-toan5-tap1.md](kien-thuc-toan5-tap1.md). Sách: `docs/lop_5/05-sgk-toan-5-tap-mot.pdf` (trang PDF = trang sách + 1).
> Hai thẻ trong khối **Lớp 5**: 🧰 `grade5-tools` (Học bằng công cụ, Bài 1–35) và 🧮 `grade5-drills` (Luyện Tính).
> Cùng khung với Toán 4 ([../lop_4/thiet-ke-cong-cu-tap1.md](../lop_4/thiet-ke-cong-cu-tap1.md)): mỗi bài có ① Khám phá (thầy hướng dẫn từng bước trên công cụ, không chấm) và ② Thực hành (5 câu máy sinh, sao `tool5:bai-N`).

## 1. Ý tưởng

Lớp 5 Tập Một xoay quanh **số thập phân**: đọc viết, so sánh, đổi đơn vị, bốn phép tính. Trẻ hay sai vì không thấy giá trị thật của từng chữ số sau dấu phẩy (thiếu 0 giữ chỗ, đặt dấu phẩy sai). Vì vậy các công cụ đều cho **nhìn thấy** phần mười, phần trăm, phần nghìn: lưới 100 ô, bảng hàng có cột dấu phẩy, tia số phóng to, bảng đơn vị có ô chữ số. Chủ đề hình học dùng **cắt ghép có chuyển động** đúng như sách (tam giác thành chữ nhật, hình thang thành tam giác, hình tròn thành hình gần chữ nhật).

Nguyên tắc giữ như lớp 4: đúng phạm vi đã học; không chép bài sách (số do máy sinh, hình tự vẽ SVG); số liệu thật; mọi thao tác có chuyển động (bản êm khi máy tắt hiệu ứng); bố cục theo skill `game-screen-layout`; ít chữ; không "nhé", không gạch dài, không hứa miễn phí. Chưa làm tiếng Anh (như lớp 4).

## 2. Bài → công cụ

| Chủ đề | Bài | Công cụ |
|---|---|---|
| 1 | 1. Ôn tập số tự nhiên | 🧱 Bảng hàng (dùng lại lớp 4) |
| | 2. Ôn tập phép tính với số tự nhiên | ✍️ Đặt tính (dùng lại lớp 4) |
| | 3. Ôn tập phân số | 🍫 Băng phân số: phân số bằng nhau, rút gọn, quy đồng, so sánh |
| | 4. Phân số thập phân | 🟩 Lưới 100 ô + tia số có kính lúp |
| | 5. Ôn tập phép tính với phân số | 🍫 Băng phân số + mô hình diện tích (nhân) |
| | 6. Cộng, trừ phân số khác mẫu | 🍫 Hai bình nước có vạch: quy đồng thì vạch chia lại, đổ chung |
| | 7. Hỗn số | 🍫 Bánh trung thu chia đều: phần nguyên + phần phân số |
| | 8. Ôn tập hình học và đo lường | 🔁 Dạng câu lớp 4 (cân, góc, thời gian), chỉ Thực hành |
| | 9. Luyện tập chung | Trộn đề |
| 2 | 10. Khái niệm số thập phân | 🟩 Lưới 100 ô + 🧮 Bảng hàng thập phân (thẻ 100, 10, 1, 1/10, 1/100, 1/1000; đủ 10 thẻ gộp sang trái) |
| | 11. So sánh số thập phân | 🧮 Máy soi hàng: hai số thẳng dấu phẩy, ô trống hiện 0 mờ, soi trái sang phải |
| | 12. Viết số đo dưới dạng số thập phân | 🪜 Bảng đơn vị có ô chữ số (1 ô mỗi đơn vị độ dài, khối lượng; 2 ô mỗi đơn vị diện tích), dấu phẩy đặt sau đơn vị đích |
| | 13. Làm tròn số thập phân | 📏 Tia số phóng to, bóng lăn về mốc gần hơn; kính lúp chữ số so với 5 |
| | 14. Luyện tập chung | Trộn đề (có câu "Cầu thang, cầu trượt": chọn số lớn hơn) |
| 3 | 15. km², ha | 🗺️ Phóng to: 1 m² có bạn nhỏ → 1 ha (sân bóng 100 m × 100 m) → 1 km² |
| | 16. Các đơn vị đo diện tích | 🪜 Bảng đơn vị diện tích (bậc ×100, ha sang m² ×10 000) |
| | 17, 18 | Trộn đề |
| 4 | 19, 20. Cộng, trừ số thập phân | ✍️ Đặt tính có **cột dấu phẩy**: các dấu phẩy thẳng cột, ô trống phần thập phân hiện 0 mờ, em tự đặt dấu phẩy ở tổng/hiệu |
| | 21. Nhân số thập phân | ✍️ Đặt tính căn phải, nhân như số tự nhiên, đếm chữ số thập phân của hai thừa số rồi dấu phẩy nhảy từ phải sang trái |
| | 22. Chia số thập phân | ✍️ Chia kiểu sách (ghi số dư, hạ chữ số); mốc "viết dấu phẩy vào thương" chặn nút hạ; thêm 0 vào số dư; chia cho số thập phân: gạch dấu phẩy, dời dấu phẩy số bị chia |
| | 23. Nhân, chia với 10; 0,1… | 🔀 Băng chữ số có dấu phẩy chạy, hết chữ số thì mọc ô 0 |
| | 24. Luyện tập chung | Trộn đề |
| 5 | 25. Tam giác | 🔺 Kéo đỉnh (nhọn, vuông, tù), ê ke hạ đường cao (kéo dài đáy khi tù); cắt ghép thành chữ nhật |
| | 26. Hình thang | 🔷 Xoay tam giác ABM quanh trung điểm M thành tam giác ADK; thanh trượt hai đáy |
| | 27. Đường tròn | ⭕ Com-pa vẽ; bánh xe lăn một vòng đo chu vi (hơn 3 đường kính); cắt múi 4, 8, 16, 32 ghép thành gần chữ nhật |
| | 28, 29 | Trộn đề |
| 6 | 30–35 | Trộn đề theo nhóm |

## 3. Luyện Tính lớp 5 (thẻ `grade5-drills`, sao `drill5:*`)

Cùng khung Luyện Tính lớp 2, 3, 4 (lớp học, tờ vở ô li, thầy nhắc từng bước, bàn phím số **có phím dấu phẩy**):

| Công cụ | Cấp |
|---|---|
| ➕ Cộng, trừ số thập phân | cùng số chữ số thập phân · khác số chữ số · với số tự nhiên · trừ · số bị trừ ít chữ số thập phân hơn |
| ✖️ Nhân số thập phân | × số tự nhiên một chữ số · × số có hai chữ số · × số thập phân · tích phải thêm 0 |
| ➗ Chia số thập phân | số thập phân : số tự nhiên · thương có chữ số 0 · số tự nhiên : số tự nhiên thương thập phân · chia cho số thập phân |
| 🔀 Nhân chia nhẩm | × 10, 100, 1 000 · × 0,1… · : 10… · : 0,1… · trộn |
| 🍫 Phân số | quy đồng, cộng trừ khác mẫu · nhân chia · hỗn số |
| 🪜 Đổi đơn vị | độ dài, khối lượng, diện tích sang số thập phân |

## 4. Kỹ thuật

- `src/games/grade5Tools.js` (hub), `grade5Tools/catalog.js` (35 bài, trang), `grade5Tools/num.js` (số thập phân: `dec`, `decKey`, `readDec`; phân số `fr`, `mixed`, `simp`), `grade5Tools/lessons/*.js`.
- Dùng lại khung Toán 4: `grade4Tools/frame.js` (`runExplore`), `practice.js` (`practiceGame(lesson, tasks, BOOK5)`; `ask` nhận đáp án chuỗi "3,25" và so theo giá trị), `canvas.js`.
- Bàn phím số có dấu phẩy: `mountDrill(…, { comma: true })` trong `grade3Drills/kit.js`.
- Kiểm tra: `scripts/games-preview.html?book=grade5Tools.js&open=bai-10`, ảnh ngang + dọc; móc dev `window.__g4ans`, `__g4until`, `__g4ex`.
