# 🧰 Công cụ Tiếng Việt 2 (Tập Một), thiết kế

Nguồn: *Vở bài tập Tiếng Việt 2, Tập Một* (Kết nối tri thức), `docs/lop_2/vo-bai-tap-tieng-viet-2-tap-mot.pdf`
(bản scan, 79 trang, **chỉ số trang PDF = số trang in**, vd. trang 5 = Bài 2).
Ghi chép từng bài (chép nguyên văn bài tập trong vở, có đáp án suy ra): `bai-01.md` … `bai-32.md`, `on-tap-giua-ki.md`, `on-tap-cuoi-ki.md`.

## 1. Mục tiêu

Giống 🧰 Công cụ Tiếng Việt 3 (`docs/lop_3/sgk_tv3_tap1/thiet-ke-cong-cu.md`): luyện endless các nội dung cốt yếu của từng bài,
dùng chung bộ máy `src/games/tv3Tools/` (skills.js, play.js, game.js, book.js, màn danh sách `toolsRender` trong tv3Tools.js).
Lớp 2 chỉ khác dữ liệu: `src/games/tv2Tools/catalog.js` (sách `TV2`), `bank.js`, `data/cd1.js … cd4.js`.

## 2. Mục lục (Tuần, Bài, tên bài đọc, trang)

| Chủ điểm | Bài |
|---|---|
| 1. Em lớn lên từng ngày (tr. 4–19) | 1 Tôi là học sinh lớp 2 (4), 2 Ngày hôm qua đâu rồi? (5), 3 Niềm vui của Bi và Bống (8), 4 Làm việc thật là vui (9), 5 Em có xinh không? (12), 6 Một giờ học (13), 7 Cây xấu hổ (16), 8 Cầu thủ dự bị (17) |
| 2. Đi học vui sao (tr. 20–39) | 9 Cô giáo lớp em (20), 10 Thời khoá biểu (21), 11 Cái trống trường em (24), 12 Danh sách học sinh (25), 13 Yêu lắm trường ơi! (28), 14 Em học vẽ (29), 15 Cuốn sách của em (32), 16 Khi trang sách mở ra (33), Ôn tập giữa học kì 1 (36) |
| 3. Niềm vui tuổi thơ (tr. 40–55) | 17 Gọi bạn (40), 18 Tớ nhớ cậu (41), 19 Chữ A và những người bạn (44), 20 Nhím nâu kết bạn (45), 21 Thả diều (48), 22 Tớ là lê-gô (49), 23 Rồng rắn lên mây (52), 24 Nặn đồ chơi (53) |
| 4. Mái ấm gia đình (tr. 56–77) | 25 Sự tích hoa tỉ muội (56), 26 Em mang về yêu thương (57), 27 Mẹ (60), 28 Trò chơi của bố (61), 29 Cánh cửa nhớ bà (64), 30 Thương ông (65), 31 Ánh sáng của yêu thương (68), 32 Chơi chong chóng (69), Ôn tập và đánh giá cuối học kì 1 (72) |

Mỗi tuần có 2 bài: bài lẻ thường là đọc hiểu + từ ngữ + câu; bài chẵn có thêm chính tả (c/k, g/gh, ng/ngh, s/x, ch/tr, iu/ưu, ai/ay, ao/au…),
bảng chữ cái, luyện từ và câu, viết đoạn.

## 3. Định dạng dữ liệu

Đúng như §3 của thiết kế lớp 3. Khác ở lớp 2:

- **Không dùng** `purpose` (câu kể / hỏi / cảm / khiến), `colon`, `compare` trừ khi vở thật sự dạy ở bài đó.
- Kiểu câu lớp 2 (`sentype`): câu giới thiệu (Ai là gì?), câu nêu hoạt động (Ai làm gì?), câu nêu đặc điểm (Ai thế nào?).
- Dấu câu lớp 2 (`punct`): dấu chấm, dấu chấm hỏi, dấu chấm than, dấu phẩy.
- Mới: 🔡 `alpha` (thứ tự bảng chữ cái): danh sách tên (tên bạn, tên đồ vật, tên con vật…), mỗi tên một chữ cái đầu khác nhau càng nhiều càng tốt
  (≥ 4 chữ cái đầu khác nhau). Máy chọn 4 tên khác chữ cái đầu, bé chạm theo thứ tự bảng chữ cái. `alpha: ['Hà', 'Lan', 'Minh', 'An', 'Bình']`
- Giọng văn lớp 2: câu ngắn (thường ≤ 12 tiếng), từ quen thuộc; `build` 2–5 mảnh; `para` 3–4 câu.
- `notes` (📘 Ghi nhớ): vở bài tập không có khung kiến thức, rút ra từ bài tập của bài, nói gọn cho bé lớp 2 (2–3 mục).
- Ưu tiên từ, câu **lấy từ vở** (bài tập, mẫu M:, gợi ý G:) và bài đọc của SGK Tiếng Việt 2 Tập Một mà vở nhắc tới; thêm câu tự soạn cùng chủ đề cho đủ số lượng.

## 4. Kho chung (`tv2Tools/bank.js`)

Từ, câu lớp 2 cho dải 🧰 Luyện theo công cụ.

## 5. Sao

`tvtool2:bai-N`, `tvtool2:tool-<khoá>`; `src/data/starRatings.js`; prefix `tvtool2` lớp 2 (`engine/stars.js` BOOK_GRADE).
Kiểm tra dữ liệu: `node scripts/tv3tools-check.mjs tv2` (hoặc `tv2 cd1` cho một tệp).
