# Thiết kế trò chơi: 🐦 Săn chim (Lớp 2 + Lớp 3)

> Trạng thái (2026-10-04): **đã code, chưa commit.** Lớp 2 + lớp 3 có hai quầy 🥅 Lưới và lồng, 🎯 Ná cao su: `src/games/grade3Games/birds.js` + `art/birds.js`, cấp `bird-*` (lớp 3) và `bird2-*` (lớp 2). **Quầy 📷 Máy ảnh đã bỏ khỏi lớp 2, 3** (chụp xong chỉ là đếm, chỉ hợp với mẫu giáo và lớp 1). Nó thành sách riêng **"📷 Bé Chụp Ảnh Chim"**: Tiền tiểu học (`preschoolPhoto.js`, khoá sao `pre5`) và Lớp 1 (`grade1Photo.js`, khoá `g1bird`), dùng engine mẫu giáo, dạng lượt `photo` ở `preschool/play5.js`, dữ liệu `preschool/data5.js`. Mục §4 bên dưới là bản thiết kế cũ, không còn dùng.
>
> Khung chung (thẻ giới thiệu, không khóa, vòng nhiệm vụ, sao, sticker) giữ nguyên như [docs/lop_3/thiet-ke-tro-choi-tap1.md §3, §6](lop_3/thiet-ke-tro-choi-tap1.md) và [docs/lop_2/thiet-ke-tro-choi.md](lop_2/thiet-ke-tro-choi.md). Tài liệu này chỉ mô tả phần riêng của trò Săn chim.

---

## 1. Ý tưởng chung

Một cánh đồng ven rừng, chim bay qua bầu trời. Bé chọn **một trong ba dụng cụ**, mỗi dụng cụ là một "quầy" (giống Chợ phiên) với kiểu toán riêng:

| Dụng cụ | Thao tác | Toán luyện | Vì sao dụng cụ hợp với toán |
|---|---|---|---|
| 📷 **Máy ảnh** | Kéo khung ngắm, bấm chụp | Đếm, đếm theo nhóm → **phép nhân**, một phần mấy | Chim bay thì không đếm được; **ảnh chụp đứng yên** nên bé đếm được. Đàn chim bay thành nhóm đều (đôi, hàng chữ V) chính là mô hình phép nhân. |
| 🪤 **Lưới và lồng** | Vung lưới bắt chim, kéo chim vào lồng | Thêm/bớt, **phép chia** (chia đều, chia theo nhóm), chia có dư | Lồng có sức chứa ghi trên cửa; chia chim vào lồng chính là phép chia. Chim dư đậu trên nóc lồng = **số dư**. |
| 🎯 **Ná cao su** | Kéo dây ná, ngắm, thả | Tính nhẩm: cộng, trừ, nhân, chia, biểu thức | Mỗi chim đeo một **vòng số** ở chân; bắn đúng con mang kết quả của phép tính trên bảng. |

Một trò, ba quầy, cùng một bầu trời và cùng một bộ chim. Cấp được chia theo lớp: cấp lớp 2 chỉ dùng kiến thức lớp 2, cấp lớp 3 dùng kiến thức Tập 1 lớp 3.

**Câu chuyện:** bé là "nhà điểu học nhí" của trạm chim. Mỗi ván, trạm giao 5 nhiệm vụ (chụp ảnh đàn chim cho sổ đếm chim, bắt chim để đeo vòng rồi thả, thi bắn ná ở hội làng). Cuối mỗi nhiệm vụ bắt chim, **chim được thả bay đi**.

---

## 2. Nguyên tắc riêng của trò

- **Không có đồng hồ đếm ngược.** Chim bay vòng lại mãi cho tới khi bé thao tác, nên bé đọc chậm vẫn chơi được. Chim bay **chậm**, đường bay theo làn cố định, không đổi hướng bất ngờ.
- **Đánh trượt không tính là thất bại.** Chụp hụt (khung không có chim), vung lưới trượt, đá ná rơi xuống cỏ thì chỉ cần làm lại. **Thất bại chỉ khi trả lời sai** (gõ sai số, bắn nhầm chim mang số sai, chia sai lồng).
- **Tính trước, thao tác để kiểm chứng** (với nhiệm vụ "bắt thêm mấy con", "chia mấy lồng"): bé gõ số trước, rồi bắt/chia chim đúng số đó để thấy kết quả khớp. Thao tác không tự điền đáp số.
- **Số liệu sát thực tế:** chim thật của Việt Nam (chim sẻ, chào mào, sáo, bồ câu, cò trắng, én, vịt trời), đàn có số con như ngoài đời (sẻ đậu dây điện 10–40 con, cò bay đàn 4–30 con, lồng sẻ chứa 2–6 con).
- Chung với mọi trò: lời ngắn + giọng đọc + nút 🔊, dải biểu tượng hướng dẫn, mọi thứ bay bằng `flyOne`, bản êm khi `prefers-reduced-motion`, không "nhé", không gạch ngang dài trong chữ trên màn.

---

## 3. Bố cục màn hình (theo skill game-screen-layout)

```
Màn ngang                                      Màn dọc
┌───────────────────────────────┬─────────┐   ┌───────────────────────┐
│ [Bảng nhiệm vụ]   ☁    ☀       │         │   │ [Bảng nhiệm vụ]       │
│    🐦→      🐦→                │ Bàn phím│   │  ☁   🐦→     ☀        │
│  BẦU TRỜI (chim bay theo làn)  │ số      │   │  BẦU TRỜI             │
│        🐦→        🐦→          │ (có sẵn │   │     🐦→      🐦→      │
│  ~~~ đồi, cây, dây điện ~~~    │  từ đầu │   │  ~~ đồi, cây ~~       │
│ ĐẤT: dụng cụ / lồng / album    │  lượt)  │   │ ĐẤT: dụng cụ / lồng   │
└───────────────────────────────┴─────────┘   ├───────────────────────┤
                                               │ Bàn phím số           │
                                               └───────────────────────┘
```

- **Cảnh vẽ SVG** phủ kín: bầu trời, mây, mặt trời, đồi cỏ, hàng cây, cột điện, ao sen (cò), trạm chim bằng gỗ. Thêm backdrop `field` vào `reporter.js` (hoặc tách ra module art dùng chung).
- **Các vùng giữ cố định từ đầu lượt:** bầu trời (làn bay), dải đất (dụng cụ, lồng, album), bàn phím. Không vùng nào đổi kích thước giữa lượt.
- **Chim to:** cao khoảng 18–22% chiều cao bầu trời; vòng số trên chân chim đọc rõ (chữ to, nền trắng, viền đậm).
- **Thẻ kết quả** hiện đè lên vùng trời (lúc đó chim đã bay đi hết), không đẩy gì xuống.

---

## 4. 📷 Quầy Máy ảnh: đếm và nhân (ĐÃ BỎ khỏi lớp 2, 3; xem §10)

**Luồng một nhiệm vụ:**
1. Bảng nhiệm vụ: *"Chụp đàn cò!"* (kèm giọng đọc).
2. Đàn chim bay ngang trời. Bé kéo **khung ngắm** (khung to, có 4 góc như máy ảnh) theo đàn, bấm nút chụp 📸 to ở dải đất.
3. Ánh chớp, ảnh rơi vào **album** ở dải đất rồi phóng to ra giữa màn: đàn chim **đứng yên**, xếp đúng nhóm như lúc bay.
4. Bé trả lời trên bàn phím (đếm, hoặc viết phép nhân).
5. Đúng: ảnh dán vào sổ đếm chim, có dấu ✓. Sai: chim trong ảnh lần lượt sáng lên theo nhóm và đếm to (*"5, 10, 15, 20"*), nhiệm vụ thất bại.

Chụp không trọn đàn (khung cắt mất chim) thì ảnh báo *"Thiếu chim rồi, chụp lại!"*, không tính thất bại.

| Cấp | Lớp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|---|
| 1 | 2 | Bài 1, 2 (số đến 100) | Sẻ đậu dây điện, mỗi đoạn dây giữa hai cột đúng **10 con**; đếm chục và đơn vị | 3 đoạn đầy + 4 con → 34 |
| 2 | 2 | Bài 37–40 (nhân 2, 5) | Cò bay **từng đôi**, én bay **nhóm 5**; viết phép nhân | 4 nhóm 5 con → 5 × 4 = 20 |
| 3 | 3 | Bài 4–6, 9–13 (bảng nhân 3–9) | Đàn chữ V nhỏ, mỗi nhóm 3–9 con | 6 nhóm 7 con → 7 × 6 = 42 |
| 4 | 3 | Bài 14 (một phần mấy) | Ảnh đàn chim trộn hai loài, bé tính một phần mấy | 24 con, 1/4 là cò → 6 con cò |

---

## 5. 🪤 Quầy Lưới và lồng: thêm bớt, chia

**Luồng một nhiệm vụ:**
1. Bảng nhiệm vụ kèm hình các lồng ghi sức chứa trên cửa: *"Có 3 lồng, mỗi lồng 5 con. Cần bắt bao nhiêu con?"*
2. Bé gõ số trên bàn phím trước (bàn phím có sẵn từ đầu lượt).
3. Bé **vung lưới**: chạm vào chim đang bay, lưới chụp xuống, chim bay vào túi lưới (bộ đếm trên túi lưới tăng dần).
4. Bé **kéo chim** (hoặc chạm từng con) từ túi lưới vào lồng. Lồng đầy thì cửa khép lại.
5. Lồng đầy đủ và đúng số đã gõ: thành công. Cuối nhiệm vụ, trạm đeo vòng cho chim, **mở cửa lồng, chim bay đi**.
6. Số gõ sai: thao tác vẫn cho bé làm để thấy chỗ thiếu/thừa (lồng thiếu chim hoặc chim thừa không có chỗ), rồi nhiệm vụ tính thất bại kèm mẹo.

| Cấp | Lớp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|---|
| 1 | 2 | Bài 7, 8, 9, 13 (qua 10, thêm bớt) | Lồng to đã có sẵn chim, cần đủ số | Lồng có 8 con, cần 13 con → bắt thêm 5 |
| 2 | 2 | Bài 37–40 (nhân 2, 5) | Mỗi lồng 2 hoặc 5 con, mấy lồng thì bắt bao nhiêu | 4 lồng, mỗi lồng 5 → 20 con |
| 3 | 2 | Bài 41–44 (chia 2, 5) | Đã bắt sẵn, chia đều vào lồng | 10 con chia đều 2 lồng → mỗi lồng 5 |
| 4 | 3 | Bài 9–13 (bảng chia 3–9) | Hai kiểu: chia đều / chia theo nhóm | 24 con, mỗi lồng 6 → 4 lồng |
| 5 | 3 | Bài 26 (chia có dư) | Chim dư đậu trên **nóc lồng** | 17 con, mỗi lồng 5 → 3 lồng, dư 2 |
| 6 | 3 | Bài 28 (hai bước tính) | Bắt, rồi thả bớt | 3 lồng × 6 con, thả 5 con → còn 13 |

---

## 6. 🎯 Quầy Ná cao su: tính nhẩm

**Luồng một nhiệm vụ:**
1. Bảng nhiệm vụ hiện phép tính to: **7 × 8 = ?**
2. 3–4 con chim bay theo làn, mỗi con đeo **vòng số** (một số đúng, các số còn lại là lỗi hay gặp: nhầm bảng, quên nhớ, lệch 1 hàng).
3. Bé **kéo dây ná** ở giữa dải đất, đường bay dự kiến hiện bằng chấm mờ, thả tay thì viên đạn bay theo đường cong.
4. Trúng con mang số đúng: thành công (xem cách chim phản ứng ở [§9 câu 1](#9-câu-hỏi-cần-chốt)).
5. Trúng con mang số sai: con đó kêu và bay mất, con đúng sáng lên, mẹo hiện ra, nhiệm vụ thất bại.
6. Trượt (không trúng con nào): viên đạn rơi xuống cỏ, bắn lại, không giới hạn.

Ngắm bắn chỉ là phần vui; không chấm độ chính xác. Chim gần ná bay thấp, dễ trúng.

| Cấp | Lớp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|---|
| 1 | 2 | Bài 7, 8, 11, 12 | Cộng, trừ qua 10 trong phạm vi 20 | 8 + 7 → con số 15 |
| 2 | 2 | Bài 19, 20, 22, 23 | Cộng, trừ có nhớ trong phạm vi 100 | 46 + 28 → 74 (nhiễu 64, 714) |
| 3 | 2 | Bài 37–44 | Bảng nhân, chia 2 và 5 | 35 : 5 → 7 |
| 4 | 2 | Bài 59–62 | Cộng, trừ trong phạm vi 1 000 | 452 + 236 → 688 |
| 5 | 3 | Bài 4–6, 9–13 | Bảng nhân, chia 2–9 | 7 × 8 → 56 (nhiễu 54, 48) |
| 6 | 3 | Bài 23, 25, 36, 37 | Nhân, chia số có 2, 3 chữ số với số có 1 chữ số | 124 × 3 → 372 |
| 7 | 3 | Bài 38, 42 | Giá trị biểu thức | 20 + 4 × 5 → 40 (nhiễu 120) |

---

## 7. Ván chơi, phần thưởng, đồ hoạ

- **Một ván = 5 nhiệm vụ** cùng quầy, cùng cấp. Có thêm chế độ **"Trộn đề"** chung với các trò khác khi làm.
- **Sao** theo số nhiệm vụ thất bại (như §6 lớp 3). Mỗi cấp một dòng trong `src/data/starRatings.js`. Mỗi ván xong = 1 lượt giải cho sticker.
- **Sổ chim:** mỗi loài chim chụp/bắt được lần đầu thì có một trang trong "Sổ chim của em" (tên, hình, một câu thật về loài đó). Bé có mục tiêu sưu tầm khi chơi lại.
- **Đồ hoạ cần vẽ (SVG, phong cách viền INK đậm):** 7 loài chim, mỗi loài 3 tư thế (bay, đậu, giật mình); vòng số ở chân; khung ngắm máy ảnh; lưới cán dài; lồng tre có bảng sức chứa; ná cao su; cảnh đồng cỏ ven rừng có cột điện, ao sen, trạm chim bằng gỗ.
- **Âm thanh:** tiếng chim hót nền khẽ, tiếng chụp ảnh, tiếng vụt của lưới, tiếng bật dây ná.
- **Code dự kiến:** một module `src/games/birds/` (chim bay, làn bay, cảnh) dùng chung; mỗi quầy một file; khai báo cấp trong catalog của **cả lớp 2 và lớp 3** (cấp lớp 2 vào `grade2Games`, cấp lớp 3 vào `grade3Games`), để gợi ý "🎮 Chơi trò chơi luyện bài này" tự hiện ở các bài tương ứng.

---

## 8. Lộ trình đề xuất

1. Vẽ **một cảnh mẫu tĩnh** (bầu trời, 3 con chim có vòng số, ná, bàn phím) để duyệt phong cách và bố cục, chụp màn ngang + dọc.
2. Làm quầy **🎯 Ná** trước (đơn giản nhất, dùng được ngay cho cả hai lớp).
3. Quầy **📷 Máy ảnh**.
4. Quầy **🪤 Lưới và lồng** (nhiều thao tác kéo thả nhất).
5. Sổ chim.

---

## 9. Quyết định đã chốt (2026-10-04)

1. **Chim trúng ná:** giật mình, sao quay quanh đầu, rơi vào giỏ của bé. Trúng con sai thì nó kêu và bay mất. Không có cảnh chim chết.
2. **Thứ tự làm:** làm cả ba quầy cùng lúc.
3. **Vị trí trong app:** một thẻ "🐦 Săn chim" có 3 quầy (như Chợ phiên), ở trang trò chơi lớp 2 và lớp 3.
4. **Sổ chim:** để sau.

### Đã chỉnh so với bản nháp khi code

- Lớp 3 quầy Máy ảnh bỏ cấp "tens" (đếm chục là của lớp 2); cấp 1 lớp 3 là đếm theo nhóm (bảng nhân 2 → 9), cấp 2 là một phần mấy.
- Lớp 3 quầy Lưới gộp "bảng chia" thành một cấp xen kẽ chia đều / chia theo lồng (bảng chia 7, 8, 9 luôn là chia theo lồng vì không đủ chỗ cho 7–9 lồng). Lớp 2 thêm cấp "Mỗi lồng 2 con, 5 con" (phép nhân).
- Đàn chim ở quầy Máy ảnh tự chọn cách xếp nhóm (số cột, 1 hoặc 2 dải) cho chim to nhất; khung ngắm làm đàn bay chậm lại khi đã vào khung.
- Lượt "Chia đều": số ô trong lồng bằng đúng thương nhưng không viền, nên không lộ đáp án; chim đậu từ đáy lồng lên.

## 10. 📷 Bé Chụp Ảnh Chim (Tiền tiểu học, Lớp 1)

Người dùng chốt (2026-10-04): chụp ảnh chỉ hợp với mẫu giáo và lớp 1; mỗi lần chụp thì bé chạm từng con để đếm, như làm quen số ở mẫu giáo.

- **Một lượt:** đàn chim bay qua khung ảnh (bay chậm lại khi vào khung). Bé bấm 📷 Chụp khi cả đàn nằm trong khung (chụp hụt: Thỏ nhắc đợi rồi chụp lại, không trừ sao). Ảnh đứng yên, bé chạm từng con: hiện số, Thỏ đọc to. Rồi chọn số đúng ở hàng số bên dưới (hàng số có sẵn từ đầu, mờ tới lúc chụp xong). Chấm ngay như các sách mẫu giáo.
- **Chế độ:** `all` đếm cả đàn · `kind` đàn có hai loài, chỉ đếm loài được hỏi (chạm nhầm loài: Thỏ nhắc, không trừ sao) · `tens` mỗi cột 10 con như bó que tính, chạm cột đếm "mười, hai mươi…" rồi đếm con lẻ.
- **Tiền tiểu học:** đếm đến 5, đến 10, chỉ đếm một loài, đếm đến 20. **Lớp 1:** đếm đến 10, đến 20, chỉ đếm một loài, đếm theo chục đến 100.
