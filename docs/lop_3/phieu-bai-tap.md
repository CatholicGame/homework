# Phiếu bài tập Toán lớp 3: định dạng

Mẫu gốc: `docs/lop_3/De_thi/Bài 5_ Bảng nhân 3, bảng chia 3 - Toán LỚP 3 (Có File Tải Về).pdf`.
Giữ đúng bố cục một bài làm thật trên giấy, **bỏ** các phần hành chính:
trường, giáo viên, phòng thi, SBD, mã phách, đường cắt ✂, chữ ký phụ huynh, chữ ký giáo viên, logo nguồn.

---

## 1. Bố cục một phiếu

```
┌──────────────────────────────────────────────────────────────┐
│  BÀI 5: BẢNG NHÂN 3, BẢNG CHIA 3                              │
│  Môn: Toán | Lớp 3                                            │
│  Họ và tên: (tên hồ sơ)        Ngày làm bài: 02/10/2026        │
├───────────────┬──────────────────────────────────────────────┤
│   ĐIỂM        │  Nhận xét của thầy cô:                        │
│               │                                              │
│    9          │   Con làm bài cẩn thận, lời giải rõ ràng.    │
│  (chữ đỏ,     │   Cần xem lại câu 7c nhé.  (chữ đỏ, viết tay) │
│   viết tay)   │                                              │
├───────────────┴──────────────────────────────────────────────┤
│  Phần 1. Tính nhẩm                                            │
│  Phần 2. Điền số thích hợp vào ô trống                        │
│  Phần 3. So sánh (>, <, =)                                    │
│  Phần 4. Bài toán có lời văn      ← giải theo bước (mục 4)    │
│  Phần 5. Ôn luyện tổng hợp                                    │
├──────────────────────────────────────────────────────────────┤
│                       [ Nộp bài ]                             │
└──────────────────────────────────────────────────────────────┘
```

- **Đầu phiếu**: tên bài, môn, lớp; họ tên lấy từ hồ sơ, ngày làm bài là ngày hiện tại.
- **Ô điểm + ô nhận xét** nằm ngay dưới đầu phiếu như phiếu thật. Trước khi nộp: để trống (khung có kẻ, mờ). Sau khi nộp: hiện điểm và nhận xét viết tay màu đỏ (mục 5).
- **Thân phiếu**: các Phần đánh số liên tục (Câu 1, 2, 3… không reset theo Phần), mỗi câu có ý a, b, c, d như giấy.
- Nền giấy trắng, chữ đen, ô trống `□` kẻ viền như phiếu in. Không thêm màu trang trí ngoài màu đỏ của giáo viên.

---

## 2. Các loại câu

| Loại (`type`) | Phiếu gốc | Cách làm trong app |
|---|---|---|
| `calc` | `3 × 5 = ....` | Ô nhập số sau dấu `=` |
| `fill` | `3 × □ = 12`, `□ ÷ 3 = 8` | Ô nhập số đúng vị trí `□` |
| `compare` | `3 × 5 □ 16` | Chạm ô `□` để chọn `>`, `<`, `=` |
| `word` | Bài toán có lời văn | **Giải theo bước** (mục 4) |
| `relation` | Viết phép nhân, phép chia từ 3, 12, 4 | Nhập 4 phép tính (2 nhân, 2 chia), chấp nhận mọi thứ tự |

---

## 3. Định dạng dữ liệu

File gợi ý: `src/data/grade3Worksheets/bai05.js` (mỗi phiếu một file).

```js
export default {
  id: 'ws3-bai05',
  title: 'Bài 5: Bảng nhân 3, bảng chia 3',
  subject: 'Toán',
  grade: 3,
  parts: [
    {
      title: 'Phần 1. Tính nhẩm',
      questions: [
        { type: 'calc', items: ['3 × 2', '3 × 5', '3 × 7', '3 × 9'] },        // Câu 1 a–d
        { type: 'calc', items: ['6 ÷ 3', '21 ÷ 3', '18 ÷ 3', '27 ÷ 3'] },     // Câu 2
      ],
    },
    {
      title: 'Phần 2. Điền số thích hợp vào ô trống',
      questions: [
        { type: 'fill', items: ['3 × □ = 12', '3 × □ = 27', '□ × 3 = 18', '3 × □ = 24'] },
      ],
    },
    {
      title: 'Phần 3. So sánh (>, <, =)',
      questions: [
        { type: 'compare', items: ['3 × 5 □ 16', '27 ÷ 3 □ 9', '3 × 7 □ 22', '15 ÷ 3 □ 5'] },
      ],
    },
    {
      title: 'Phần 4. Bài toán có lời văn',
      questions: [
        {
          type: 'word',
          text: 'Một lớp học có 15 học sinh, chia đều thành 3 tổ. Hỏi mỗi tổ có bao nhiêu học sinh?',
          // Bước 1: hướng dẫn
          guide: {
            given: ['Có 15 học sinh', 'Chia đều thành 3 tổ'],
            ask: 'Mỗi tổ có bao nhiêu học sinh?',
            hint: 'Chia đều thành các phần bằng nhau thì làm phép chia.',
          },
          // Bước 2: câu lời giải (ghép từ mảnh xáo trộn)
          solutionSentence: 'Mỗi tổ có số học sinh là:',
          decoys: ['tất cả', 'thêm'],          // mảnh gây nhiễu, có thể bỏ trống
          // Bước 3: phép tính (học sinh tự nhập)
          expression: { a: 15, op: ':', b: 3, result: 5, unit: 'học sinh' },
          // Bước 4: đáp số
          answer: 'Đáp số: 5 học sinh.',
        },
      ],
    },
    {
      title: 'Phần 5. Ôn luyện tổng hợp',
      questions: [
        { type: 'relation', numbers: [3, 12, 4] },
      ],
    },
  ],
};
```

Ghi chú:
- Trong phép tính lời giải dùng dấu chia `:` như học sinh viết vở. Phần tính nhẩm giữ `÷` như phiếu in.
- Bài nhiều bước (ví dụ: tìm số bông của 3 bó rồi bớt đi…) thì `solutionSentence`, `expression` là **mảng**, mỗi phần tử là một cặp "câu lời giải + phép tính".

---

## 4. Bài toán có lời văn: giải theo bước

Trên phiếu, mỗi bài là một khung **"Bài giải"** giống vở ô li. Các bước mở lần lượt, bước đã xong giữ nguyên trên phiếu (không bị ẩn, không đổi vị trí). Khung đủ chỗ cho tất cả các dòng ngay từ đầu, dòng chưa tới lượt hiện mờ.

Kết quả cuối cùng trên phiếu đúng như học sinh viết tay:

```
Bài giải
Mỗi tổ có số học sinh là:
15 : 3 = 5 (học sinh)
Đáp số: 5 học sinh.
```

### Bước 1. Hướng dẫn (hiểu đề)

- Đề bài hiện ở trên, các số liệu (`15`, `3 tổ`) được gạch chân.
- Hai dòng tóm tắt:
  - **Bài cho biết:** Có 15 học sinh. Chia đều thành 3 tổ.
  - **Bài hỏi:** Mỗi tổ có bao nhiêu học sinh?
- Một câu gợi ý (`hint`) và câu hỏi chọn phép tính: **Ta làm phép gì?** `[ + ] [ − ] [ × ] [ : ]`.
  Chọn sai: gợi ý lại, không trừ điểm. Chọn đúng: mở Bước 2.

### Bước 2. Ghép câu lời giải

- Câu `solutionSentence` được cắt thành mảnh theo cụm từ và **xáo trộn**:

  ```
  [ học sinh ]  [ là: ]  [ Mỗi tổ ]  [ có số ]  [ tất cả ]
  ```

- Học sinh chạm từng mảnh để đưa lên dòng lời giải theo thứ tự; chạm mảnh đã đặt để trả về.
- Cách cắt mảnh: theo cụm có nghĩa (2–3 từ), giữ dấu `:` dính mảnh cuối. Có thể thêm 1–2 mảnh nhiễu (`decoys`).
- Chấp nhận các câu tương đương nếu khai báo thêm `altSentences` (ví dụ `Số học sinh mỗi tổ là:`).

### Bước 3. Nhập phép tính

Học sinh **tự nhập**, không có mảnh gợi ý:

```
[ 15 ] [ : ] [ 3 ] = [ 5 ]  ( [ học sinh ] )
```

- Ô số và ô kết quả nhập bằng bàn phím số; ô dấu phép tính chọn trong `+ − × :`.
- Đơn vị trong ngoặc: chọn từ 3 mảnh (`học sinh`, `tổ`, một đơn vị nhiễu).
- Phép nhân/cộng chấp nhận đổi chỗ hai số (`3 × 7` = `7 × 3`).

### Bước 4. Đáp số

- Dòng `Đáp số: [ ] [ ]`: nhập số, chọn đơn vị. Đơn vị phải khớp với đơn vị ở Bước 3.

### Chấm Phần 4

Giống cách giáo viên chấm vở (mỗi bài tối đa 1 điểm, quy đổi ở mục 5):

| Phần | Tỉ lệ |
|---|---|
| Câu lời giải đúng | 0,25 |
| Phép tính đúng (số, dấu, kết quả) | 0,5 |
| Đáp số đúng (cả đơn vị) | 0,25 |

Bước 1 chỉ là hướng dẫn, không tính điểm.

---

## 5. Chấm điểm và nhận xét (chữ viết tay màu đỏ)

Theo luật **Kiểm tra một lần**: nút `Nộp bài` chỉ bật khi mọi ô đã được điền; nộp xong mới chấm.

### Điểm

- Thang 10, làm tròn đến 0,5 (`9`, `8,5`…). Mỗi câu có trọng số bằng nhau trong Phần; trọng số Phần khai báo trong dữ liệu (`weight`), mặc định chia đều.
- Hiện trong ô ĐIỂM: số to, **font viết tay**, màu đỏ mực (`#d1232a`), hơi nghiêng (−6°), có gạch chân hoặc khoanh tròn tay như giáo viên.
- Hiệu ứng: nét chữ "viết ra" (vẽ dần theo nét). Máy tắt hiệu ứng (`prefers-reduced-motion`) vẫn chạy bản chậm, nhẹ, không bỏ.

### Nhận xét

- Cùng font viết tay đỏ, viết trên các dòng kẻ của ô nhận xét.
- Câu nhận xét chọn theo mức điểm, ghép thêm phần cụ thể (câu sai đầu tiên, phần làm tốt):

| Điểm | Mẫu nhận xét |
|---|---|
| 10 | Bài làm rất tốt! Con trình bày sạch đẹp, lời giải đầy đủ. |
| 8 – 9,5 | Con làm bài tốt. Cần xem lại câu {câu sai}. |
| 6,5 – 7,5 | Con nắm được bài. Cần cẩn thận hơn ở phần {tên Phần sai nhiều nhất}. |
| 5 – 6 | Con cần ôn lại {tên bài}. Cố gắng lên! |
| dưới 5 | Con hãy làm lại phiếu này cùng bố mẹ. Cô tin con sẽ làm được! |

- Không dùng "nhé", không dùng dấu gạch dài trong câu nhận xét.

### Dấu chấm trên bài

- Ý đúng: dấu ✓ đỏ viết tay bên cạnh. Ý sai: gạch chéo đỏ nhẹ và ghi đáp án đúng nhỏ bên cạnh (chữ đỏ viết tay).
- Bài lời văn: đánh dấu từng dòng (lời giải / phép tính / đáp số).

### Font viết tay (cần hỗ trợ tiếng Việt)

Ứng viên: **Itim**, **Patrick Hand** (Google Fonts, có dấu tiếng Việt). Đóng gói kèm app để dùng được khi không có mạng.

---

## 6. Lưu bài

- Lưu theo người dùng (`scopedKey` + `tth:data-changed` để đồng bộ Drive): đáp án đã nhập, bước đang làm, điểm, nhận xét, ngày nộp.
- Mở lại phiếu đã nộp: xem nguyên bài đã chấm. Nút `Làm lại` tạo lượt mới, giữ điểm cao nhất.
- Mỗi phiếu cần một dòng trong `src/data/starRatings.js`.

---

## 7. Đã làm (2026-10-02)

- Thẻ **Luyện Đề** ✏️ trong Lớp 3 (`grade3-worksheet`, src/data/grades.js). Trang chính có hai cặp hồ sơ: **Phiếu bài tập** và **Đề ôn tập giữa học kì I** (65 đề, xem `de-on-tap-giua-ki.md`); chạm cặp → danh sách → tờ phiếu.
- Màn: `src/games/grade3Worksheet.js` (phần tính toán chung: `src/games/worksheetCore.js`). Dữ liệu: `src/data/grade3Worksheets/bai05.js` (phiếu Bài 5 chép từ `De_thi/`). Kiểm tra dữ liệu: `node scripts/check-worksheets.mjs`.
- Xem nhanh: `scripts/games-preview.html?book=grade3Worksheet.js&open=bai-5` (hoặc `open=de-01`).
- Thực tế khác bản nháp ở trên:
  - Dữ liệu bài lời văn: `sentence` là **mảng mảnh** (tác giả tự cắt cụm), `expr`, `units` (đơn vị đúng + 2 đơn vị nhiễu), `given`, `ask`, `hint`.
  - Điểm: mỗi câu như nhau, điểm câu = tỉ lệ ý đúng (lời văn 0,25 / 0,5 / 0,25). Điểm = 10 × tổng / số câu, làm tròn 0,5.
  - Các bước không chấm ngay: chỉ Bước 1 (chọn phép tính) có phản hồi đúng/sai vì là hướng dẫn. Lời giải, phép tính, đáp số chấm khi nộp bài, như bài thật.
  - Nút bước ①②③④ chạm được để quay lại sửa.
  - Sao: một khoá cho mỗi Phần (`worksheet:bai-5:p0..p4`). Phần đúng hết thì nhận sao, Phần còn sai thì bớt 1 sao.
  - Lưu: `g3ws-v1` (scopedKey, đồng bộ Drive). Bản nháp lưu từng ô; bài đã chấm xem lại được; "Làm lại phiếu" giữ điểm cao nhất.
  - Font viết tay: Dancing Script (Google Fonts).
- Thêm phiếu mới: tạo `src/data/grade3Worksheets/baiXX.js` (cùng số bài có nhiều phiếu thì thêm chữ: `bai01b.js`, id `bai-1b`), màn hình tự nạp mọi file `bai*.js`; thêm một dòng sao cho mỗi Phần trong starRatings.js.
- Các dạng câu dùng chung với Đề ôn tập (xem `de-on-tap-giua-ki.md`), thêm cho phiếu: `table` (bảng có ô trống), `match` (nối cột), `chain` (sơ đồ mũi tên), `pick` với `shape` (tô màu theo phần), ô chọn `choices` trong `fill`, `marker: '1'`.

## 8. Các phiếu đã chép (2026-10-02)

Nguồn: `docs/lop_3/De_thi/Bài N_ … .pdf` và `Phiếu bài tập - Bài N_ … .pdf`. Bỏ phần hành chính, "Em tự đánh giá", chữ ký.

| File | Phiếu |
|---|---|
| bai01.js | Bài 1: Ôn tập các số đến 1000 |
| bai01b.js | Bài 1: Đọc, viết, so sánh các số có 3 chữ số |
| bai01c.js | Phiếu bài tập Bài 1: Ôn tập các số đến 1000 (phiếu 2) |
| bai02.js – bai04.js | Bài 2, 3, 4 |
| bai05.js, bai05b.js | Bài 5 (phiếu 1, phiếu 2 "Phiếu bài tập - Bài 5") |
| bai06.js – bai09.js | Bài 6, 7, 8, 9 |
| bai11.js – bai15.js | Bài 11 – 15 (chưa có PDF Bài 10) |

Lỗi của bản PDF (bảng thiếu dữ liệu, phương án trùng, hình thiếu) đã sửa ít nhất có thể, mỗi chỗ có ghi chú `// sửa:` ngay trên câu.
- Đồng hồ 45 phút (mọi phiếu và đề, `LIMIT_MS`): đếm ngược trên thanh trên cùng, chỉ chạy khi tờ phiếu đang mở và trang đang hiện. Rời phiếu / ẩn trang thì dừng, số giờ đã làm lưu trong `rec.elapsed`; mở lại chạy tiếp. Còn 5 phút: cam; hết giờ: đỏ, nhắc làm nốt rồi nộp (không khoá bài). Bài đã chấm ghi "Làm trong N phút" (`result.used`). "Làm lại" đặt lại về 45 phút.
