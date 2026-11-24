# Thiết kế công cụ học trực quan và Luyện Tính: Toán 5, Tập Hai

> Kiến thức từng bài: [kien-thuc-toan5-tap2.md](kien-thuc-toan5-tap2.md). Sách mẫu: `docs/lop_5/SGK Toán 5, tập hai-mau.pdf` (70 trang ảnh quét; mục lục đủ Bài 36–75 ở PDF trang 4–5, nội dung chỉ có trang sách 4–67 = Bài 36–57; **trang PDF = trang sách + 1**).
> Cùng thẻ 🧰 `grade5-tools` (tab 📗 Tập Một / 📘 Tập Hai) và 🧮 `grade5-drills`. Cùng khung Tập Một ([thiet-ke-cong-cu-tap1.md](thiet-ke-cong-cu-tap1.md)): ① Khám phá, ② Thực hành 5 câu, 📘 Kiến thức; sao `tool5:bai-N`.

## 1. Ý tưởng

Tập Hai có bốn mảng mới: **tỉ số và phần trăm** (chủ đề 7), **thể tích và hình khối** (8, 9), **thời gian và chuyển động đều** (10), **biểu đồ quạt tròn, tỉ số số lần** (11). Mỗi mảng có một mô hình trẻ nhìn và tự tay làm được:

- Tỉ số: **sơ đồ phần bằng nhau** (mỗi số là một dãy ô bằng nhau, tổng hoặc hiệu chia đều cho số phần), **lưới 100 ô** cho phần trăm.
- Thể tích: **xếp hình lập phương 1 cm³** thành lớp, đếm lớp; khối 1 dm³ tách thành 1 000 khối 1 cm³.
- Hình khối: **gấp, mở hình khai triển** có chuyển động; mặt xung quanh trải thành một hình chữ nhật dài bằng chu vi đáy.
- Thời gian: **đặt tính có cột giờ, phút, giây**, đủ 60 thì đổi sang cột bên trái; mượn 1 giờ = 60 phút.
- Chuyển động: **đường có vạch km và đồng hồ**, xe chạy đều từng giờ, quãng đường mỗi giờ bằng vận tốc.

Nguyên tắc giữ như Tập Một: đúng phạm vi đã học; số do máy sinh, hình tự vẽ SVG; số liệu thật; mọi thao tác có chuyển động (bản êm khi máy tắt hiệu ứng); bố cục theo skill `game-screen-layout`; ít chữ; không "nhé", không gạch dài, không hứa miễn phí. Chưa làm tiếng Anh.

## 2. Bài → công cụ

| Chủ đề | Bài | Công cụ |
|---|---|---|
| 7 | 36. Tỉ số. Tỉ số phần trăm | 🟦 Sơ đồ phần bằng nhau, 💯 Lưới phần trăm |
| | 37. Tỉ lệ bản đồ và ứng dụng | 📍 Bản đồ tỉ lệ (thước đo trên bản đồ, nhân với tỉ lệ) |
| | 38. Tìm hai số khi biết tổng và tỉ số | 🟦 Sơ đồ phần bằng nhau: tổng chia đều cho tổng số phần |
| | 39. Tìm hai số khi biết hiệu và tỉ số | 🟦 Sơ đồ phần bằng nhau: hiệu ứng với số phần hơn |
| | 40. Tìm tỉ số phần trăm của hai số | 💯 Lưới phần trăm |
| | 41. Tìm giá trị phần trăm của một số | 💯 Lưới phần trăm |
| | 42. Máy tính cầm tay | 📟 Máy tính cầm tay (bấm phím, màn hình) |
| | 44 | Trộn đề |
| | 43. Thực hành máy tính cầm tay | Trộn đề 42, 40, 41 |
| 8 | 45. Thể tích của một hình | 🧊 Xếp hình lập phương |
| | 46. cm³, dm³ | 🧊 + 🪜 Bảng đơn vị thể tích (mỗi bậc gấp 1 000) |
| | 47. m³ | 🧊 + 🪜 |
| | 48 | Trộn đề |
| 9 | 49. Hình khai triển | 📦 Gấp, mở hình khai triển (hình lập phương, hộp chữ nhật, hình trụ) |
| | 50, 51. Sxq, Stp | 📦 Trải mặt xung quanh thành một hình chữ nhật |
| | 52, 53. Thể tích hộp chữ nhật, lập phương | 🧊 Xếp lớp: một lớp dài × rộng hình, chồng cao lớp |
| | 54, 55 | Trộn đề |
| 10 | 56. Đơn vị đo thời gian | ⏱️ Đặt tính số đo thời gian (đổi đơn vị) |
| | 57. Cộng, trừ số đo thời gian | ⏱️ Cột giờ, phút: đủ 60 thì đổi, mượn 1 giờ = 60 phút |
| | 58. Nhân, chia số đo thời gian | ⏱️ Chia: số dư đổi sang đơn vị bé hơn |
| | 59. Vận tốc | 🚗 Đường chuyển động: quãng đường đi được trong 1 giờ |
| | 60. Quãng đường, thời gian | 🚗 |
| | 61, 62 | Trộn đề |
| 11 | 63. Thu thập, phân loại, sắp xếp số liệu | 📋 Bảng số liệu |
| | 64. Biểu đồ hình quạt tròn | 🥧 Biểu đồ quạt tròn (phần trăm ứng với góc) |
| | 65. Tỉ số số lần lặp lại | 🎲 Kiểm đếm: số lần xảy ra / tổng số lần |
| | 66, 67 | Trộn đề |
| 12 | 68–75 | Trộn đề theo nhóm (cả bài Tập Một) |

## 3. Kỹ thuật

- `grade5Tools/catalog.js`: chủ đề 7–12 có `tap: 2`, `START2` từ mục lục, `tapName()`; công cụ mới trong `TOOLS`.
- Nội dung: `grade5Tools/lessons/tap2ratio.js`, `tap2volume.js`, `tap2time.js`, `tap2stats.js`; kiến thức `grade5Tools/knowledge/tap2*.js` gộp vào `KNOWLEDGE5`.
- Hub `grade5Tools.js`: tab 📗 Tập Một / 📘 Tập Hai (nhớ tab `g5tools-tap-v1`), dòng SGK ghi đúng tập.
- Sao `tool5:bai-36…75` (bài trộn 4, Bài 75 5) trong `src/data/starRatings.js`.
- Công cụ mới: `ratio.js` (sơ đồ phần), `pct.js` (lưới phần trăm, bọc `grid.js`), `map.js` (bản đồ, thước kéo), `calc.js` (máy tính 5×5 như sách, làm lần lượt, phím %), `cubes.js` (xếp hình lập phương phối cảnh xiên), `net.js` (gấp, mở hình khai triển 3D), `units.js` thêm `kind: 'cube'` (m³, dm³, cm³, 3 ô mỗi đơn vị), `tcol.js` (đặt tính số đo thời gian + mặt đồng hồ 10 phần), `move.js` (đường chuyển động), `pie.js` (biểu đồ quạt tròn). Bài 63, 65 dùng lại `grade4Tools/stats.js`, `chance.js` (`createChance` nhận thêm đồ vật là hàm).
- Bài 57 (từ tr. 68) đến Bài 67 soạn theo chương trình, code ghi `// chưa đối chiếu sách`: kiểm lại khi có sách đủ.

## 4. Luyện Tính lớp 5 (thêm cho Tập Hai)

| Công cụ | Cấp |
|---|---|
| 🟦 Tỉ số, phần trăm | `d5-ratio-1…6`: tỉ số và tỉ số %, tỉ lệ bản đồ, tổng tỉ, hiệu tỉ, tìm tỉ số %, giá trị % |
| 🧊 Thể tích, hình khối | `d5-vol-1…4`: đếm thể tích, đổi đơn vị thể tích, Sxq Stp, thể tích hộp và lập phương |
| ⏱️ Số đo thời gian | `d5-time-1…2`: đổi đơn vị, cộng trừ nhân chia |
| 🚗 Chuyển động đều | `d5-move-1…2`: vận tốc, quãng đường và thời gian |
| 🥧 Số liệu, biểu đồ quạt | `d5-stats-1…3`: bảng số liệu, biểu đồ quạt tròn, tỉ số số lần |

Cấp lấy từ `*_DRILL_LEVELS` cuối mỗi file `lessons/tap2*.js`; sao `drill5:<id>`.

## 5. Kiểm tra

- `scripts/.tmp/g5allsmoke.*`: dựng mọi dạng câu Bài 1–75, mọi Khám phá và mọi cấp Luyện Tính lớp 5.
- Theo chủ đề (tự làm hết câu, chạy hết Khám phá, chụp ngang 1280×800 và dọc 412×860): `g5t7*`, `g5t89*`, `g5t10*`, `g5t11*`.
