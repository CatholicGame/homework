# Kiểm tra theo lộ trình: quy tắc tạo đề

Mục tiêu: bé được kiểm tra **thường xuyên** (cứ khoảng 3 Bài mới là có một bài kiểm tra ngắn), **tổng hợp**
sau mỗi khoảng 6 Bài mới, rồi **giữa kì** và **cuối kì**. Đề nhắm vào **kiến thức cốt lõi của từng Bài vừa học**.
Kết quả từng câu cho biết bé hổng ở Bài nào, để bản đồ kiến thức và nút "Luyện thêm" dùng tiếp.

Giao diện và cách làm bài giống hệt **Luyện Đề lớp 3** (`src/games/grade3Worksheet.js`): thư mục bộ đề, danh sách
thẻ đề có ô điểm đỏ viết tay, tờ đề như giấy thật, nộp bài mới chấm, lời phê đỏ. Dữ liệu dùng đúng các loại câu
(`mc`, `tf`, `calc`, `fill`, `findx`, `compare`, `pick`, `draw`, `word`, `table`, `match`, `chain`) của
`docs/lop_3/de-on-tap-giua-ki.md`, chỉ thêm vài trường ở mục 6.

---

## 1. Bốn nhóm bài kiểm tra

Lộ trình của một lớp đi theo **thứ tự Bài của sách chính** của lớp đó:

| Lớp | Sách chính (khoá sao) |
|---|---|
| 1 | Vở BT Toán 1 (`workbook1`) |
| 2 | Vở BT Toán 2 Tập 1, 2 (`workbook2`) |
| 3 | Vở BT Toán 3 Tập 1, 2 (`workbook`), thêm Luyện tập (`practice`) |
| 4 | Toán 4 công cụ (`tool4`), chưa chốt |
| 5 | Toán 5 công cụ (`tool5`) |

"Bài mới" là Bài dạy kiến thức mới, có `points` trong phần kiến thức. Bài Luyện tập, Luyện tập chung, Ôn tập
không tính, nhưng nằm trong khoảng Bài của bài kiểm tra.

| Nhóm | Khi nào | Phủ | Số câu | Lớp 1 | Lớp 2 | Lớp 3–5 |
|---|---|---|---|---|---|---|
| ⚡ **Kiểm tra nhanh** | Sau **khoảng 3 Bài mới** (2 đến 4) | Chỉ các Bài mới vừa học | **5 câu** (mỗi câu 2 điểm) | 15 phút | 15 phút | 20 phút |
| 🧭 **Kiểm tra tổng hợp** | Sau **2 bài kiểm tra nhanh** (khoảng 6 Bài mới) | Hai nhóm nhanh đó + 2 đến 3 câu ôn các Bài trước | **10 câu** | 30 phút | 35 phút | 40 phút |
| 📝 **Giữa học kì** | Giữa học kì | Từ đầu học kì tới đó | **15 câu** (10–11 trắc nghiệm, 4–5 tự luận) | 35 phút | 45 phút | 45 phút |
| 🏆 **Cuối học kì** | Cuối học kì | Cả học kì | **20 câu** (15–16 trắc nghiệm, 4–5 tự luận) | 35 phút | 45 phút | 45 phút |

- Chia nhóm nhanh theo thứ tự sách, giữ các Bài cùng một mạch ở chung một nhóm (đừng cắt đôi "Dấu <" với "Dấu >").
  Một Bài mới lẻ ở cuối chủ đề thì gộp vào nhóm trước.
- Nhóm nhanh cuối học kì không đủ cặp để làm bài tổng hợp thì phần đó do bài **cuối kì** phủ.
- Giữa kì, cuối kì: **mỗi nhóm nhanh trong khoảng** có ít nhất 1 câu. Nửa sau của học kì được nhiều câu hơn
  một chút vì bé mới học xong.
- **Mỗi thư mục có ít nhất 5 đề.** Nhóm nhanh đủ 5 đề nhờ có nhiều chặng (lớp 1 có 7). Nhóm có ít chặng hơn thì
  mỗi chặng thêm đề cùng khoảng Bài (Đề 1, Đề 2…): cùng kiến thức, khác số liệu, đồ vật và dạng câu. Lớp 1:
  tổng hợp 3 chặng × 2 đề, giữa kì 5 đề, cuối kì 5 đề. Bé làm kém thì ôn lại rồi làm đề khác của cùng chặng,
  không làm lại đúng đề cũ (như vậy chỉ là nhớ đáp án).

Lộ trình lớp 1, Tập Một (Vở BT Toán 1 Bài 1–34), ghi trong `src/data/routeTests/g1/plan.js`:

| Bài kiểm tra | Bài | Bài mới |
|---|---|---|
| ⚡ Nhanh 1 | 1–5 | 2 Nhiều hơn, ít hơn · 3 Hình vuông, hình tròn · 4 Hình tam giác |
| ⚡ Nhanh 2 | 6–9 | 6 Các số 1, 2, 3 · 8 Các số 1 đến 5 |
| 🧭 Tổng hợp 1 | 1–9 | Nhanh 1 + Nhanh 2 |
| ⚡ Nhanh 3 | 10–15 | 10 Dấu < · 11 Dấu > · 13 Dấu = |
| ⚡ Nhanh 4 | 16–18 | 16 Số 6 · 17 Số 7 · 18 Số 8 |
| 🧭 Tổng hợp 2 | 10–18 | Nhanh 3 + Nhanh 4, ôn Bài 1–9 |
| ⚡ Nhanh 5 | 19–24 | 19 Số 9 · 20 Số 0 · 21 Số 10 |
| 📝 Giữa kì I | 1–24 | Nhanh 1 đến 5 |
| ⚡ Nhanh 6 | 25–28 | 25 Cộng trong phạm vi 3 · 27 Cộng trong phạm vi 4 |
| 🧭 Tổng hợp 3 | 19–28 | Nhanh 5 + Nhanh 6, ôn Bài 1–18 |
| ⚡ Nhanh 7 | 29–34 | 29 Cộng trong phạm vi 5 · 31 Số 0 trong phép cộng · 34 Trừ trong phạm vi 3 |
| 🏆 Cuối kì I | 1–34 | Nhanh 1 đến 7 |

Cứ khoảng 4 Bài trong vở là bé có một bài kiểm tra.

Lộ trình lớp 2, Học kì I (Vở BT Toán 2 Tập Một, Bài 1–36), ghi trong `src/data/routeTests/g2/plan.js`:

| Bài kiểm tra | Bài | Bài mới |
|---|---|---|
| ⚡ Nhanh 1 | 1–3 | 1 Ôn tập các số đến 100 · 2 Tia số, số liền trước, số liền sau · 3 Thành phần phép cộng, phép trừ |
| ⚡ Nhanh 2 | 4–6 | 4 Hơn, kém nhau bao nhiêu · 5 Cộng, trừ không nhớ trong phạm vi 100 |
| 🧭 Tổng hợp 1 | 1–6 | Nhanh 1 + Nhanh 2 |
| ⚡ Nhanh 3 | 7–10 | 7 Cộng qua 10 · 8 Bảng cộng · 9 Bài toán thêm, bớt |
| ⚡ Nhanh 4 | 11–14 | 11 Trừ qua 10 · 12 Bảng trừ · 13 Bài toán nhiều hơn, ít hơn |
| 🧭 Tổng hợp 2 | 7–14 | Nhanh 3 + Nhanh 4, ôn Bài 1–6 |
| ⚡ Nhanh 5 | 15–18 | 15 Ki-lô-gam · 16 Lít |
| 📝 Giữa kì I | 1–18 | Nhanh 1 đến 5 |
| ⚡ Nhanh 6 | 19–24 | 19, 20 Cộng có nhớ · 22, 23 Trừ có nhớ |
| 🧭 Tổng hợp 3 | 15–24 | Nhanh 5 + Nhanh 6, ôn Bài 1–14 |
| ⚡ Nhanh 7 | 25–28 | 25 Điểm, đoạn thẳng, ba điểm thẳng hàng · 26 Đường gấp khúc, hình tứ giác · 27 Vẽ đoạn thẳng |
| ⚡ Nhanh 8 | 29–36 | 29 Ngày, giờ, phút · 30 Ngày, tháng (31–36 thực hành, ôn tập) |
| 🧭 Tổng hợp 4 | 25–36 | Nhanh 7 + Nhanh 8, ôn Bài 1–24 |
| 🏆 Cuối kì I | 1–36 | Nhanh 1 đến 8 |

Lớp 2 có 4 chặng tổng hợp, mỗi chặng 2 đề (8 đề).

---

## 2. Chọn kiến thức cốt lõi của từng Bài

Nguồn là phần kiến thức của từng Bài đã viết sẵn, mục `points` trong:
`src/games/grade3Knowledge/tap1.js`, `tap2.js` (lớp 3), và thư mục kiến thức của lớp 1, 2, 5 (`lessonHelp.js`).

1. Bài nhanh và bài tổng hợp: mỗi **Bài mới** trong khoảng có **ít nhất 1 câu**. Bài Luyện tập chung, Ôn tập, Thực hành trải nghiệm không có
   câu riêng.
2. Mỗi câu nhắm đúng **một điểm cốt lõi** (một dòng trong `points`). Ghi lại điểm đó ở trường `point` (mục 6).
3. Ưu tiên chọn điểm cốt lõi theo thứ tự:
   - Kỹ năng **các Bài sau phải dùng tới**, ví dụ bảng nhân, đặt tính, tìm thành phần, đổi đơn vị.
   - Chỗ học sinh **hay nhầm**, ví dụ "gấp lên" với "thêm", "giảm đi" với "bớt", chia có dư mà số dư lớn hơn số chia,
     đơn vị đo bị viết lẫn.
   - Điểm chỉ để làm quen, chưa chấm điểm ở trường thì bỏ qua, ví dụ thực hành vẽ trang trí.
4. Bài có kỹ năng then chốt (bảng nhân chia, đặt tính, giải toán) được **2 câu**: một câu nhận biết, một câu vận dụng.
5. Chặng có nhiều Bài giống nhau (bảng nhân 6, 7, 8, 9) thì gộp vào **một câu nhiều ý**, mỗi ý một Bài.
   Ví dụ: `Tính nhẩm: a) 7 × 8, b) 54 : 6, c) 9 × 4, d) 63 : 9`.

---

## 3. Ôn lại kiến thức cũ (xoắn ốc)

- Bài **nhanh** chỉ hỏi các Bài vừa học (được 1 câu ôn nếu cần cho Bài mới).
- Bài **tổng hợp** gồm **khoảng 7 câu của hai nhóm nhanh** và **2 đến 3 câu ôn các Bài trước đó**.
  Tổng hợp 1 không có Bài trước nên cả 10 câu là của hai nhóm nhanh.
- Giữa kì, cuối kì không cần đánh dấu câu ôn, vì cả học kì đều nằm trong khoảng.
- Câu ôn lại chọn theo thứ tự:
  1. Kiến thức của chặng trước mà **chặng này cần dùng**. Ví dụ Kiểm tra 4 (nhân số có hai chữ số) ôn bảng nhân.
  2. Kiến thức **đã lâu chưa gặp lại**, tức là không có trong 2 chặng ngay trước đó.
- Câu ôn lại ghi `review: true`. Câu ôn có thể trộn với kiến thức mới, ví dụ bài toán hai bước có một bước
  dùng "một phần mấy".

---

## 4. Ma trận một đề

Theo ba mức của Thông tư 27 (đánh giá học sinh tiểu học):

| Mức | Ý nghĩa | Nhanh 5 câu | Tổng hợp 10 câu | Giữa kì 15 câu | Cuối kì 20 câu |
|---|---|---|---|---|---|
| M1 | Nhận biết, nhớ, làm theo mẫu | 3 | 5 | 8 | 10 |
| M2 | Hiểu, kết nối, làm bài quen thuộc | 1 | 3 | 4 | 6 |
| M3 | Vận dụng vào bài mới, bài toán thực tế | 1 | 2 | 3 | 4 |

Số câu giữa kì, cuối kì theo đề thi thật ở trường (người dùng cho biết, 2026-10-10): giữa kì thường 15 câu,
cuối kì thường 20 câu, phần tự luận chiếm 4–5 câu, còn lại là trắc nghiệm. Thời gian làm bài thường 45 phút.
Lớp 1 (`src/data/routeTests/g1`) làm trước quy tắc này nên giữa kì, cuối kì vẫn 10 câu, chờ chốt có đổi hay không.

Bố cục giống đề giữa kì lớp 3. Các câu **đánh số liên tục** (`numbering: 'continuous'`), các câu cùng số điểm.
Engine chấm theo tỉ lệ đúng của từng câu rồi quy ra thang 10. Câu nhiều ý thì mỗi ý được một phần điểm.
Bài nhanh 5 câu: Phần A câu 1–3, Phần B câu 4–5.
Giữa kì 15 câu: Phần A câu 1–11 (hoặc 1–10), Phần B 4–5 câu cuối. Cuối kì 20 câu: Phần A câu 1–16 (hoặc 1–15),
Phần B 4–5 câu cuối. Phần B vẫn có đặt tính, một câu điền / tính, bài toán có lời văn và câu thử thách M3.

```
Bài tổng hợp 10 câu (giữa kì, cuối kì: Phần A dài hơn, Phần B vẫn 4–5 câu):
A. Phần trắc nghiệm     Câu 1–6   mc, tf, match, pick        (M1 phần lớn, 1 câu M2)
B. Phần tự luận         Câu 7–10  calc (đặt tính), fill / findx / compare / table / chain, word
                                  Câu 9: bài toán có lời văn (M2 hoặc M3)
                                  Câu 10: câu thử thách M3
```

- Câu dễ đứng trước, câu khó đứng sau. Câu 1 luôn là câu M1 bé chắc chắn làm được.
- Mỗi đề có **ít nhất 4 loại câu khác nhau**, không để 3 câu `mc` liền nhau cùng một dạng.
- Có hình (đồng hồ, hình học, đo lường) thì vẽ SVG theo mục "Hình vẽ" của `de-on-tap-giua-ki.md`.

Điều chỉnh theo lớp:

Thời gian theo bảng ở mục 1. Điều chỉnh theo lớp:

| Lớp | Ghi chú |
|---|---|
| 1 | Nhiều hình, ít chữ, nút 🔊 đọc đề. Không có `word` 4 bước, thay bằng "Viết phép tính thích hợp" theo tranh (`fill` có `fig`). Bài trước khi học số (Nhanh 1) chỉ dùng hình, chọn, nối. |
| 2 | Có `word` 4 bước, chỉ một phép tính. |
| 3 | Như ma trận trên. |
| 4, 5 | Câu 10 có thể là bài toán nhiều bước. Lớp 5 có số thập phân (bàn phím có dấu phẩy). |

---

## 5. Viết câu hỏi

- **Không chép nguyên câu trong vở bài tập.** Giữ dạng bài, đổi số liệu và đổi đồ vật. Bé đã làm vở rồi, chép lại
  thì chỉ đo được trí nhớ.
- Số liệu thật và vừa sức: giá tiền, cân nặng, số người phải giống ngoài đời (xem memory
  `feedback_games_realistic_data`). Kết quả không vượt phạm vi số của chặng.
- **Phương án sai = lỗi tính hay gặp**, không lấy số ngẫu nhiên. Ví dụ `7 × 8`: 54, 56, 63, 15
  (nhầm sang 9 × 6, đúng, nhầm sang 7 × 9, lấy 7 cộng 8). Đ/S có ít nhất một ý sai vì một lỗi hay gặp.
- Một câu chỉ đo một điểm cốt lõi. Không để câu bảng nhân bị sai vì bé đọc nhầm một đề dài.
- Chữ trong đề: không dùng "nhé", không dùng dấu gạch dài. Dấu nhân `×`, dấu chia `:` như sách.
- Đáp án phải tự kiểm tra được. Câu tính thuần thì để engine tự tính. Câu đếm hình thì vẽ xong rồi tự đếm lại.

---

## 6. Dữ liệu

Mỗi đề một file trong `src/data/routeTests/g{lớp}/`, tên theo nhóm:
`nhNN.js` (nhanh), `thNN.js` (tổng hợp), `gkN.js` (giữa kì N), `ckN.js` (cuối kì N). Đề thứ 2, 3… của cùng chặng
thêm chữ `b`, `c`… (`th01b.js`, `gk1e.js`; id `l1-th-01b`), tiêu đề "(Đề 2)", tên ngắn "Tổng hợp 1 · Đề 2".
Lộ trình của lớp (các nhóm nhanh, tổng hợp, giữa kì, cuối kì và khoảng Bài) ghi trong `plan.js` cùng thư mục.
Định dạng của `de-on-tap-giua-ki.md`, thêm:

```js
export default {
  id: 'l1-nh-02',                       // l{lớp}-{nh|th|gk|ck}-NN
  kind: 'nhanh',                        // 'nhanh' | 'tonghop' | 'giuaki' | 'cuoiki'
  title: 'Kiểm tra nhanh 2',
  short: 'Nhanh 2',
  after: { book: 'workbook1', units: '6-9' },   // khoảng Bài (khớp plan.js)
  desc: 'Các số 1, 2, 3, 4, 5',
  time: 15,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      { type: 'mc', bai: 6, point: 0, level: 1, prompt: 'Có mấy con gà con?', fig: …, options: […], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [ … ] },
  ],
};
```

Trường mới trên mỗi câu:

| Trường | Ý nghĩa |
|---|---|
| `bai` | Số Bài mà câu này kiểm tra (một số, hoặc mảng nếu câu gộp nhiều Bài) |
| `point` | Chỉ số dòng trong `points` của Bài đó (điểm cốt lõi) |
| `level` | 1, 2, 3 (M1, M2, M3) |
| `review` | `true` nếu là câu ôn các Bài trước khoảng (bài nhanh, bài tổng hợp) |
| `say` | (lớp 1) lời đọc của nút 🔊 khi khác lời đề |
| `fig` trên một ý `fill` | hình riêng của ý đó (đếm rồi viết số) |

Sao: mỗi Phần một khoá `route{lớp}:{id}:p0`, `…:p1` trong `starRatings.js`; `route{lớp}` có trong `BOOK_GRADE`
của `engine/stars.js`.

---

## 7. Sau khi nộp bài

- Điểm và lời phê đỏ như Luyện Đề. Dòng thứ hai của lời phê **lấy từ các câu bé làm sai**:
  gom các `bai` của câu sai, ví dụ "Con ôn lại Bài 2, 4, 11."
- Dưới tờ đề có dải **"📒 Ôn lại trong Vở bài tập"**: mỗi Bài có câu sai là một nút, chạm vào thì mở thẳng Bài đó
  trong vở (ở đó có 📘 Kiến thức). Về sau có thêm nút **"Làm đề khác"** (đề B hoặc C).
- Kết quả từng câu ghi vào sổ theo `bai` và `point`. **Bản đồ kiến thức** dùng sổ này để tô mức
  "🟠 Cần luyện thêm": làm sai câu kiểm tra của một Bài là tín hiệu mạnh hơn sai trong lúc làm vở,
  vì lúc làm vở bé được thử lại nhiều lần. (Chưa làm.)

---

## 8. Mở đề và gợi ý

- Thẻ Luyện Đề của lớp mở ra **bốn thư mục**: ⚡ Kiểm tra nhanh, 🧭 Kiểm tra tổng hợp, 📝 Giữa học kì,
  🏆 Cuối học kì (như Luyện Đề lớp 3 có các thư mục Phiếu bài tập, Đề giữa kì).
- **Mọi đề đều mở**, giống quy ước của trò chơi. Thẻ đề ghi "Sau Bài 6–9".
- Cờ **▶ Làm tiếp** trong mỗi thư mục: đề đầu tiên mà bé đã giải ít nhất 70% số câu của các Bài trong khoảng
  (tính từ sổ sao, như bản đồ kiến thức) và chưa có lần làm nào đạt 8 điểm trở lên.
- Khách dùng thử: như Luyện Đề, mỗi thư mục chỉ làm được 2 đề đầu.

---

## 9. Chỗ đặt trong app

- **Lớp 1** (đã làm mẫu): thẻ ✏️ Luyện Đề `grade1-tests`, `grade1Render` trong `src/games/grade3Worksheet.js`
  (cấu hình `CONFIGS`, `ROUTE_COLLECTIONS`).
- **Lớp 3**: thêm bốn thư mục vào Luyện Đề có sẵn. Giữa kì I có thể trỏ thêm tới bộ 65 đề giữa kì.
- **Lớp 2**: thẻ ✏️ Luyện Đề `grade2-tests`, `grade2Render` (Học kì I, `src/data/routeTests/g2/`).
- **Lớp 4, 5**: mỗi lớp một thẻ Luyện Đề như lớp 1.

---

## 10. Kiểm tra dữ liệu

`node scripts/check-worksheets.mjs`. Đề có `kind` thì kiểm tra thêm:

- Số câu: nhanh 5, tổng hợp 10, giữa kì 15, cuối kì 20 (lớp 1 giữa kì, cuối kì còn 10). Giữa kì, cuối kì: Phần B 4–5 câu.
  Số câu M1, M2, M3 đúng ma trận mục 4 (lệch ±1 được).
- `bai` và `point` có thật trong `points` của Bài đó.
- Nhanh, tổng hợp: mỗi Bài mới trong khoảng có ít nhất 1 câu không phải câu ôn. Câu ôn chỉ dùng Bài **trước** khoảng.
  Nhanh: tối đa 1 câu ôn. Tổng hợp: 2 đến 4 câu ôn (trừ khi khoảng bắt đầu từ Bài 1).
- Giữa kì, cuối kì: mỗi nhóm nhanh trong khoảng (theo `plan.js`) có ít nhất 1 câu.
- Khoảng Bài (`after.units`) phải khớp một mục của `plan.js`.
- Đáp án tự tính khớp với `ans`. Phương án `mc` không trùng nhau. Không có "nhé", không có dấu gạch dài.

---

## Đã làm (lớp 1)

23 đề trong `src/data/routeTests/g1/`: ⚡ Nhanh 1–7 (`nh01`–`nh07`), 🧭 Tổng hợp 1–3 mỗi chặng 2 đề
(`th01`, `th01b`… `th03b`), 📝 Giữa kì I 5 đề (`gk1`, `gk1b`–`gk1e`), 🏆 Cuối kì I 5 đề (`ck1`, `ck1b`–`ck1e`).
Hình vẽ: `art.js` (đồ vật của `src/games/grade1Knowledge/things.js`).

Riêng lớp 1: chữ to (`big`), nút 🔊 đọc đề trên mỗi câu, ý `fill` có hình riêng.
Xem thử: `scripts/games-preview.html?book=grade3Worksheet.js&fn=grade1Render&open=l1-nh-01&click=.ws-start`.

## Đã làm (lớp 2, Học kì I)

26 đề trong `src/data/routeTests/g2/`: ⚡ Nhanh 1–8 (`nh01`–`nh08`), 🧭 Tổng hợp 1–4 mỗi chặng 2 đề (`th01`, `th01b`… `th04b`),
📝 Giữa kì I 5 đề (`gk1`–`gk1e`), 🏆 Cuối kì I 5 đề (`ck1`–`ck1e`). Hình vẽ: `art.js` (tia số, que tính, cân đĩa, can và ca lít,
đồng hồ, tờ lịch, điểm và đoạn thẳng, thước kẻ). Không có nút 🔊, chữ cỡ thường.
Xem thử: `scripts/games-preview.html?book=grade3Worksheet.js&fn=grade2Render&open=l2-nh-01&click=.ws-start`.
Còn: Học kì II (Bài 37–75).

## Còn phải chốt

1. Lớp 4 đi theo sách nào: SGK Toán 4 cũ (`textbook4`, 175 bài) hay Toán 4 công cụ (`tool4`, sách mới).
2. Làm đủ đề A, B, C cho mỗi bài kiểm tra, hay mỗi bài một đề trước.
