# Thiết kế trò chơi thực hành — Toán 3, Tập 1

> Trạng thái: **thiết kế đã chốt các quyết định chính** (2026-09-27). Chưa code. Xem [§9](#9-quyết-định-đã-chốt).
>
> Nguồn nội dung: Vở Bài tập Toán 3 Tập 1 (Bài 1–44, `src/games/grade3Workbook.js`) và sách Luyện tập Toán 3 (Tuần 1–18, `src/games/grade3Practice/`), bộ Kết nối tri thức.

---

## 1. Mục tiêu và nguyên tắc chung

- **Mục tiêu:** sau khi học một bài trên lớp và làm bài tập trong app, bé có một trò chơi nhập vai để **dùng** kiến thức trong tình huống đời thường (bán hàng, giao hàng, xây nhà…), không chỉ điền đáp số.
- **Giữ đúng phạm vi đã học:** mọi số do trò chơi sinh ra nằm trong phạm vi của Tập 1 — số đến **1 000**, nhân/chia số có 2–3 chữ số với số có 1 chữ số. Không dùng kiến thức của Tập 2 (ví dụ tiền Việt Nam phạm vi 100 000, số đến 10 000).
- **Tiền trong trò chơi:** tiền Việt Nam, ghi theo đơn vị **"nghìn đồng"** với số nhỏ (5 nghìn đồng đồng, 12 nghìn đồng đồng…), để phép tính vẫn trong phạm vi 1 000.
- **Một trò – nhiều cấp:** mỗi trò có các cấp sắp theo thứ tự bài trong sách. Cấp sau dùng thêm kiến thức của bài sau.
- **Là trò chơi, không phải bài kiểm tra:** không "chấm điểm". Mỗi trò là một **chuỗi nhiệm vụ**, mỗi thao tác chỉ có **thành công** hoặc **thất bại** (xem [§3.5](#35-vòng-lặp-trò-chơi)). Cuối ván tổng kết số nhiệm vụ thành công và thất bại. Chơi lại thì **đổi số, đổi đồ vật, đổi khách**, để bé lặp lại cùng các bước với dữ liệu mới.
- **Có giọng đọc:** NPC đọc yêu cầu bằng TTS (dùng lại hệ giọng đọc của phần Tiền tiểu học, có fallback). Lớp 3 đã biết đọc nên luôn hiện chữ song song với giọng.
- **Đồ hoạ tự vẽ bằng SVG** trong code, cùng một phong cách, không dùng hình có bản quyền (xem [§5](#5-phong-cách-đồ-hoạ-và-âm-thanh)).

---

## 2. Kỹ năng trọng tâm của Tập 1

| Mã | Nhóm kỹ năng | Bài (Vở BT) | Tuần (Luyện tập) |
|---|---|---|---|
| **A** | Số đến 1 000; cộng, trừ trong phạm vi 1 000; tìm thành phần của phép cộng, phép trừ | 1, 2, 3 | 1, 2 |
| **B** | Bảng nhân, bảng chia 2 → 9; tìm thành phần của phép nhân, phép chia | 4, 5, 6, 9, 10, 11, 12, 13 | 2 → 6 |
| **C** | Một phần mấy (1/2 … 1/9) | 14 | 6 |
| **D** | Hình học: trung điểm; hình tròn (tâm, bán kính, đường kính); góc vuông; tam giác, tứ giác, hình chữ nhật, hình vuông; vẽ hình; khối lập phương, khối hộp chữ nhật | 16, 17, 18, 19, 20, 21 | 7, 8, 9 |
| **E** | Nhân số có 2, 3 chữ số với số có 1 chữ số; chia hết, chia có dư; chia số có 2, 3 chữ số cho số có 1 chữ số | 23, 25, 26, 36, 37 | 9, 10, 11, 14, 15 |
| **F** | Gấp một số lên một số lần; giảm một số đi một số lần; so sánh số lớn gấp mấy lần số bé | 24, 27, 39 | 10, 11, 16 |
| **G** | Bài toán giải bằng hai bước tính; biểu thức số, tính giá trị biểu thức | 28, 38, 42 | 12, 15, 16, 17, 18 |
| **H** | Đo lường: mi-li-mét, gam, mi-li-lít, nhiệt độ (°C); thực hành đo | 30, 31, 32, 33, 34 | 12, 13, 14 |
| — | Luyện tập chung / Ôn tập (tổng hợp) | 7, 8, 15, 22, 29, 35, 40, 41, 43, 44 | 3, 4, 7, 12, 14, 17, 18 |

Các bài Luyện tập chung và Ôn tập không có trò riêng. Chúng dùng **chế độ "Trộn đề"** của mỗi trò (trộn nhiệm vụ của mọi cấp).

---

## 3. Vào trò chơi, thông tin kiến thức, vòng lặp chơi

### 3.1 Vị trí trong app

- Trong **mỗi sách** (Vở Bài tập Toán 3 Tập 1 và Luyện tập Toán 3), ở màn hình danh sách bài, có một nút **"🎮 Trò chơi tăng cường"**.
- Bấm nút → mở **danh sách các trò đang có**, dạng lưới thẻ. Mỗi thẻ có hình minh họa, tên trò và các nhãn kiến thức (ví dụ *Khối lượng · Nhân*).
- Hai sách dùng **chung một danh sách trò**. Chỉ khác ở chỗ lời gợi ý ghi tên bài của sách đang mở (Bài … hoặc Tuần …).

### 3.2 Không khóa trò nào

- **Mọi trò và mọi cấp đều mở** ngay từ đầu. Không khóa theo lịch, theo tiến độ hay bằng bài thử.
- Các cấp vẫn sắp theo thứ tự bài trong sách để bé thấy đường đi từ dễ đến khó.

### 3.3 Màn hình giới thiệu khi vào trò / chọn cấp

Trước khi bắt đầu, app hiện một thẻ thông tin:

> 🍎 **Quầy trái cây – Cấp 5: Cân bằng gam**
> Trò này phù hợp nếu em đã học kiến thức về **gam và ki-lô-gam**,
> ứng với **Bài 31: Gam** trong Vở bài tập (Tuần 13 trong sách Luyện tập).
> [ ▶ Chơi ] [ 📖 Xem lại Bài 31 ]

- Nút **"Xem lại Bài …"** mở thẳng bài đó trong sách (dùng `setLastUnit` của engine vở bài tập).
- Nếu tiến độ trong app cho thấy bé **đã làm** bài đó (có bản ghi trong `gw-progress-v1[bai-xx]` hoặc `gp-progress-v1[tuan-xx]`), thẻ hiện thêm **"✓ Em đã làm bài này"**. Dấu này chỉ để bé và phụ huynh yên tâm, **không** dùng để chặn.

Dữ liệu khai báo cho mỗi cấp:

```js
knowledge: 'gam và ki-lô-gam',
lessons: { workbook: ['bai-31'], practice: ['tuan-13'] },
```

### 3.4 Khi bé gặp khó

- Nhiệm vụ **thất bại** → NPC phản ứng (ví dụ *"Ơ, cân còn lệch kìa!"*), cho bé xem kết quả đúng kèm một **mẹo ngắn** có hình (*"1 kg = 1 000 g đó em"*), rồi chuyển sang nhiệm vụ tiếp theo.
- Nếu **quá nửa** số nhiệm vụ trong ván thất bại, màn tổng kết gợi ý: *"Thử cấp dễ hơn"* hoặc *"Xem lại Bài 31"*.

### 3.5 Vòng lặp trò chơi

```
Chọn trò → Chọn cấp → [Thẻ giới thiệu] → Ván chơi (chuỗi N nhiệm vụ) → Tổng kết → Chơi lại / Cấp khác
                                               ↑__________________________________|
```

- **Một ván = chuỗi nhiệm vụ.** Ví dụ Chợ phiên: 1 ván = 5 khách, mỗi khách là 1 nhiệm vụ.
- **Một nhiệm vụ = vài thao tác** (cân → tính tiền → trả tiền thừa). Mỗi thao tác chỉ có **thành công** hoặc **thất bại**:
  - Thành công → hiệu ứng vui, sang thao tác kế tiếp.
  - Thất bại → nhiệm vụ đó tính là **thất bại** (xem cách xử lý ở [§3.4](#34-khi-bé-gặp-khó)), sang nhiệm vụ tiếp theo. Không có điểm, không có "sai/đúng" kiểu bài kiểm tra.
- **Tổng kết cuối ván:** *"Em đã phục vụ 4/5 khách thành công, 1 khách chưa hài lòng"* kèm số sao (xem [§6](#6-phần-thưởng)). Có nút **Chơi lại**, **Cấp khó hơn**, **Chọn trò khác**.
- **Chơi lại = dữ liệu mới:** mỗi ván sinh ngẫu nhiên số, đồ vật, khách và giá, nhưng giữ **đúng các bước** của cấp đó. Nhờ vậy bé lặp lại kỹ năng mà không học thuộc đáp án.

### 3.6 Lưu ý kỹ thuật

Tiến độ bài tập hiện lưu trong `localStorage` theo từng thiết bị, nên dấu "✓ Em đã làm bài này" có thể không hiện khi bé đổi máy. Việc này không ảnh hưởng đến việc chơi.

## 4. Danh sách trò chơi

| # | Trò | Kỹ năng | Bài liên quan | Ưu tiên |
|---|---|---|---|---|
| 1 | **Chợ phiên của bé** (5 quầy) | A, B, C, E, G, H | 2, 14, 17, 23, 25, 28, 30, 31, 32, 36 | ⭐ Làm đầu tiên |
| 2 | Xe chở hàng | E, G | 25, 26, 28, 37 | 2 |
| 3 | Máy phóng to – thu nhỏ | F | 24, 27, 39 | 3 |
| 4 | Thám tử góc vuông | D | 18, 19 | 4 |
| 5 | Rô-bốt biểu thức | G | 38, 42 | 5 |
| 6 | Kiến trúc sư bảng ghim | D | 16, 17, 19, 20 | 6 |
| 7 | Xe buýt lên xuống | A | 2, 3 | 7 |
| 8 | Vườn trồng theo hàng | B | 4–6, 9–13 | 8 |
| 9 | Bác sĩ thú y & Trạm thời tiết | H | 33, 34 | 9 |
| 10 | Bác đưa thư | A | 1 | 10 |
| 11 | Kho xếp hộp | D | 21 | 11 |

Mỗi trò bên dưới có: **câu chuyện**, **luồng chơi**, **các cấp** (kèm bài phù hợp), **sinh đề**, **phản hồi** và **đồ hoạ cần vẽ**.

---

### 4.1 🏪 Chợ phiên của bé

**Câu chuyện:** Bé là chủ các quầy trong chợ phiên cuối tuần. Khách NPC lần lượt đến quầy, đưa phiếu mua hàng và nói yêu cầu. Một phiên (một ván) = **5 khách** (5 nhiệm vụ). Cuối phiên tổng kết số khách hài lòng và chưa hài lòng, nhận sao, và chợ đông dần (thêm trang trí, thêm khách).

**Luồng một nhiệm vụ (một khách):**
1. Khách đến, bong bóng lời nói hiện yêu cầu kèm giọng đọc.
2. Bé **thao tác** (cân / đếm / đong / cắt / đo).
3. Bé **tính tiền**: gõ số vào ô trên máy tính tiền, hoặc chọn thẻ đáp án.
4. (Cấp cao) Khách đưa tiền, bé **tính tiền thừa**.
5. Mọi thao tác thành công → khách vui vẻ cảm ơn, **nhiệm vụ thành công**. Một thao tác thất bại (ví dụ cân lệch rồi bấm "Xong", tính sai tiền) → khách phản ứng, app cho xem kết quả đúng kèm mẹo, **nhiệm vụ thất bại**, khách rời quầy và khách tiếp theo đến.

Chọn quầy trên **bản đồ chợ**. Mọi quầy đều vào được; bấm vào quầy thì hiện thẻ giới thiệu kiến thức ([§3.3](#33-màn-hình-giới-thiệu-khi-vào-trò--chọn-cấp)).

#### Quầy 🍎 Trái cây — cân và tính tiền

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Kiến thức lớp 2 (kg) · Bài 4, 7 / Tuần 2, 3 | Cân **kg nguyên** (1–9 kg); giá tròn chục 20 hoặc 50 nghìn đồng 1 kg | Rổ cam 3 kg → quả cân 2 kg + 1 kg → "3 kg" → 20 × 3 = 60 nghìn đồng (2 chục × 3 = 6 chục) |
| 2 | Bài 5, 6, 9–12 / Tuần 2–6 (bảng nhân 3–9) | Giá tròn chục 30, 40, 60 nghìn đồng 1 kg | 1 kg táo giá 40 nghìn đồng → 3 kg táo giá 120 nghìn đồng |
| 3 | Bài 23 / Tuần 9 | Giá lẻ như ở chợ (22–65 nghìn đồng 1 kg) × 2–6 kg | 1 kg xoài giá 38 nghìn đồng → 4 kg giá 152 nghìn đồng |
| 4 | Bài 28 / Tuần 12 | Hai bước: tổng tiền → tiền thừa (khách đưa tờ 100 / 200 / 500 nghìn đồng) | 3 kg cam 25 nghìn đồng/kg = 75 → đưa 100 → trả lại 25 nghìn đồng |
| 5 | Bài 31 / Tuần 13 | **Gam**: quả cân 100 g, 200 g, 500 g; rổ 100–900 g; giá cho 100 g | 100 g nho giá 12 nghìn đồng → 700 g = 7 lần 100 g → 84 nghìn đồng |

**Số liệu sát thực tế** (để bé không hiểu sai): giá và cân nặng một quả lấy theo chợ thật, số quả vẽ trong rổ khớp cân nặng.

| Quả | Giá | 1 quả (chùm) nặng khoảng |
|---|---|---|
| Cam | 20–35 nghìn đồng / 1 kg | 200 g |
| Táo | 40–65 nghìn đồng / 1 kg | 200 g |
| Xoài | 30–50 nghìn đồng / 1 kg | 400 g |
| Thanh long | 20–35 nghìn đồng / 1 kg | 450 g |
| Bưởi | 30–45 nghìn đồng / 1 kg | 1,7 kg (rổ ít nhất 2 kg) |
| Nho | 8–15 nghìn đồng / 100 g | chùm 350 g |
| Dâu tây | 25–40 nghìn đồng / 100 g | 20 g |
| Nhãn | 5–8 nghìn đồng / 100 g | chùm 250 g |
| Chanh | 2–4 nghìn đồng / 100 g | 70 g |

Giá ghi thành câu rõ nghĩa: bảng giá "1 kg giá 30 nghìn đồng", câu hỏi "1 kg cam giá 30 nghìn đồng. Vậy 3 kg cam giá bao nhiêu tiền?".

**Bước cân — có tư duy, không dò** (như người bán thật):
1. Khách nói trước mua bao nhiêu: *"Bán cho cô 7 kg thanh long nhé!"*
2. Bé **chọn quả cân có tổng đúng bằng số đó** (tách số: 7 kg = 5 kg + 2 kg; 700 g = 500 g + 200 g) và đặt lên đĩa phải. Không có gợi ý tổng trên màn hình — bé tự cộng.
3. Bé **nhặt từng quả trên sạp** (dưới đĩa trái) đặt lên đĩa trái; chạm quả trên đĩa để trả về sạp. Quả **to nhỏ khác nhau** như ngoài chợ (vẽ to theo cân nặng) và **không ghi cân nặng** — ghi số thì cần gì cân. Bé **ước chừng** (1 quả to ≈ 2 quả nhỏ), nhìn cân nâng dần lên, đổi quả to/nhỏ cho tới khi thăng bằng, rồi **tự xác nhận** bằng nút **"✓ Cân xong — Cân xong hãy xác nhận"** trên trụ cân. Nút có sẵn từ đầu (mờ khi một bên đĩa còn trống); app **không báo trước** lúc thăng bằng (không tô xanh, không hiện nút) — bé tự đọc đòn cân và kim. Bấm khi cân còn nghiêng → khách phàn nàn *"Cân còn nghiêng mà cháu, chưa đủ đâu!"*, nhiệm vụ thất bại, mẹo: *"Đòn cân nằm ngang, kim chỉ đúng giữa mới là cân xong."* Xác nhận đúng mới tô xanh đòn cân.
- Mỗi loại quả có vài cỡ sát thực tế, cách nhau đủ rõ để nhìn là phân biệt (thanh long 300 / 400 / 500 / 700 g; bưởi 1 / 1,5 / 2 kg; dưa hấu 1,5 / 2 / 3 / 4 kg; chùm nho 150–400 g…). Sạp cấp 1–2 có 2 cỡ, cấp 3 và 5 có 3 cỡ, cấp 4 có 4 cỡ; cách nhặt đúng phối ít nhất 2 cỡ (khi được). Khách chỉ mua lượng nhặt được bằng tối đa 6 quả — 8 kg là bưởi hay dưa hấu, không ai nhặt 40 quả cam. Sạp luôn có ít nhất một cách nhặt cho cân thăng bằng, cộng thêm 4–8 quả cùng các cỡ đó để bé phải chọn.
- Chọn sai tổng quả cân → cân vẫn thăng bằng được nhưng sai số khách mua; bấm "Cân xong" thì khách phản ứng như ngoài chợ: *"Bác chỉ mua 5 ki-lô-gam thôi mà!"*; lời giải: *"Chọn: 5 kg"*.
- Quả và quả cân nằm **trên mặt đĩa cân**.

**Đã làm (bản dev, 2026-09-27):** cả 5 cấp. Mỗi khách là một nhiệm vụ gồm các bước *chọn quả cân đúng số khách mua → nhặt quả cho cân thăng bằng → tính tiền (→ trả tiền thừa)*. Bộ quả cân: 5 kg, 2 kg × 2, 1 kg × 2 (cấp 1–4) và 500 g, 200 g × 2, 100 g × 2 (cấp 5). Code: `src/games/grade3Games/market/fruit.js`. Chơi thử không cần đăng nhập: `npm run dev` rồi mở `/g3games-dev.html` (thêm `?book=practice` để mở từ sách Luyện tập).

- **Thao tác cân:** chạm quả cân ở khay để đặt lên đĩa phải, chạm quả cân trên đĩa để nhấc ra; quả nằm ở đĩa trái. Như cân thật: lệch ít nghiêng ít, lệch từ khoảng nửa số khách mua trở lên thì chạm chốt (nghiêng hết cỡ); lệch một chút vẫn thấy rõ; bằng nhau thì thăng bằng. Cân kiểu Rô-béc-van giống hình vở bài tập (`art/scale.js`, chép từ `balance_scale()` trong `scripts/redraw/kit_measure.py`), không hiện số.
- **Tiền khách đưa** luôn lớn hơn tiền hàng.
- **Sinh đề:** khối lượng cấp 1 từ 1–9 kg; cấp 5 từ 100–1 000 g (bội của 100). Mọi tổng tiền ≤ 1 000 nghìn đồng, thực tế giữ ≤ 100 nghìn đồng. Tiền khách đưa là 20 / 50 / 100 nghìn đồng.
- **Mẹo khi sai:** "Cân lệch về bên nào thì bên đó nặng hơn"; "1 kg = 1 000 g".
- **Đồ hoạ:** cân đĩa, bộ quả cân (1, 2, 5 kg; 100, 200, 500 g), 6–8 loại quả (cam, táo, nho, xoài, thanh long, dưa hấu, chuối, bưởi), túi giấy, bảng giá, máy tính tiền.

#### Quầy 🥚 Trứng — đóng hộp

| Cấp | Phù hợp khi đã học | Nội dung | Ví dụ |
|---|---|---|---|
| 1 | Kiến thức lớp 2 | Hộp 2 / 5 quả (bảng 2, 5 đã học lớp 2) | "Cô lấy 4 hộp 5 quả" → 20 quả |
| 2 | Bài 5, 6, 9–12 hoặc Tuần 2–6 | Hộp 3, 4, 6, 8, 9 quả; cả nhân lẫn chia | Có 42 quả, xếp hộp 6 → mấy hộp? |
| 3 | Bài 25 hoặc Tuần 10 | **Chia có dư**: số trứng lẻ ra | 50 quả, hộp 6 → 8 hộp, dư 2 quả |
| 4 | Bài 26, 37 hoặc Tuần 11, 15 | Số lớn hơn (2–3 chữ số) | 96 quả, hộp 8 → 12 hộp |

- **Thao tác:** kéo trứng vào khay (cấp 1–2 để thấy "nhóm đều"). Cấp cao chỉ còn tính, rồi bấm "Đóng hộp" để xem hình kiểm chứng.
- **Đồ hoạ:** trứng, khay các cỡ, giỏ, trứng lẻ lăn ra ngoài.

**Đã làm (bản dev, 2026-09-28):** cả 4 cấp — `src/games/grade3Games/market/eggs.js`, hình ở `art/eggs.js`.
- **Nhân** (cấp 1: hộp 2, 5, 10 quả; cấp 2: hộp 3, 4, 6, 8, 9): khách lấy *n* hộp → bé chạm từng hộp trống để đóng trứng vào (bàn tay chỉ hộp kế tiếp) → gõ tất cả bao nhiêu quả.
- **Chia** (cấp 2 xen kẽ với nhân; cấp 4): khách mang *N* quả đến nhờ xếp hộp → bé gõ số hộp → máy **đóng hộp theo đúng số bé gõ** để kiểm chứng: đúng thì vừa hết trứng; gõ ít thì còn trứng đủ đóng thêm hộp; gõ nhiều thì hộp cuối thiếu / trống (viền đỏ).
- **Chia có dư** (cấp 3; cấp 4 trộn): bé gõ số hộp rồi số quả thừa, sau đó mới đóng hộp. Cấp 3 thỉnh thoảng ra phép chia hết để bé không đoán "lúc nào cũng dư". Mẹo khi gõ số thừa ≥ số quả một hộp: "đủ 6 quả thì đóng thêm được 1 hộp".
- Trứng rời xếp **hàng 10** (cách sau quả thứ 5) để dễ đếm theo chục. Cấp 4 tối đa 150 quả, 10–30 hộp.
- Khung quầy (khách, bong bóng, máy tính tiền, thẻ kết quả) dùng chung với quầy trái cây: `market/stall.js`.

#### Quầy 🍋 Nước chanh — đong mi-li-lít

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 32 hoặc Tuần 13 | Đong theo công thức bằng cốc 100 ml, 50 ml. Ví dụ: "Pha 350 ml". |
| 2 | Bài 32 + Bài 28 | Hai bước: pha 3 ly, mỗi ly 200 ml → bình cần 600 ml. Bình 1 l = 1 000 ml, còn lại bao nhiêu? |

- **Thao tác:** bấm giữ vòi để rót, mực nước dâng dần. Bình có vạch ml, thả tay đúng vạch là đạt.
- **Đồ hoạ:** bình chia vạch, cốc đong, ly, chanh, đá, vòi rót, hiệu ứng nước dâng.

**Đã làm (bản dev, 2026-09-28):** 3 cấp — `src/games/grade3Games/market/lemonade.js`, hình vẽ `art/lemonade.js` (ca đong chép từ `ml_cup()` của Bài 32 trong `scripts/redraw/kit_w1.py`; bình có vòi, ly, quầy vẽ lại theo ảnh mẫu `scripts/g3games/lemonade-ref/`).

| Cấp | Tên | Ca đong | Khách cần |
|---|---|---|---|
| 1 | Rót theo vạch | 500 ml, vạch mỗi 100 ml, chỉ ghi "500 ml" như Bài 32 — bé đếm vạch | 100–400 ml |
| 2 | Vạch 50 ml | 1 l, số ở mỗi vạch 100 ml, vạch ngắn giữa là 50 ml | 150–850 ml, khoảng 2/3 số lần là "… 50 ml" |
| 3 | Pha nhiều ly | như cấp 2; bình ghi "1 l" | *n* ly × *k* ml (2–4 ly, 100–300 ml, tổng ≤ 900) → gõ tổng → rót → gõ số ml còn lại trong bình |

- **Rót:** bấm giữ cần gạt của vòi — vòi mở dần (chạm nhẹ chỉ rót một ít để chỉnh cho khớp vạch); rót quá thì bấm giữ **"Đổ bớt"** (ca nghiêng, đổ ra khay hứng). Bé **tự xác nhận** bằng nút **"✓ Rót xong — Rót xong hãy xác nhận"**; app không báo trước lúc đủ. Đạt khi mặt nước lệch vạch không quá bề dày vạch (±18 ml ở ca 500 ml, ±12 ml ở ca 1 l).
- **Sai:** khách phàn nàn ("Chưa đủ 350 mi-li-lít mà cháu!" / "Nhiều quá…"), vạch đích tô cam kèm số ml; mẹo theo kiểu ca (đếm vạch / vạch ngắn nằm giữa hai số).
- **Đúng:** vạch đích tô xanh → giọt nước chanh bay sang từng ly, ca vơi dần, ly đầy dần rồi thêm đá, lát chanh, ống hút → ly bay tới tay khách.
- Điện thoại xoay ngang: cảnh cắt bớt nửa trên bình (vẫn thấy vòi) để ca đong to, số trên ca to hơn.

#### Quầy 🍰 Tiệm bánh — một phần mấy

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 14 hoặc Tuần 6 | Cắt bánh thành các phần **bằng nhau**, đưa khách 1/2, 1/3, 1/4… |
| 2 | Bài 14 | 1/n **của một nhóm**: "Lấy 1/3 số bánh quy trên đĩa (12 cái)" → 4 cái |
| 3 | Bài 17 hoặc Tuần 7 | Bánh tròn: đặt dao **qua tâm** (đường kính), phân biệt đường cắt qua tâm và đường cắt không qua tâm |

- **Bẫy cần có:** bánh bị cắt thành các phần **không bằng nhau**. Bé phải nhận ra đó không phải 1/4.
- **Đồ hoạ:** bánh tròn, bánh chữ nhật, dao, đĩa bánh quy, hộp bánh.

#### Quầy 🧵 May ruy băng — mi-li-mét

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 30 hoặc Tuần 12 | Kéo kéo cắt đến đúng vạch: "Cắt 45 mm" |
| 2 | Bài 30 hoặc Tuần 13 | Đổi đơn vị: 1 cm = 10 mm ("Cắt 6 cm 5 mm" → 65 mm) |
| 3 | Bài 30 + Bài 23 | Giá theo cm: 3 nghìn đồng/cm × 8 cm |

- **Đồ hoạ:** thước có vạch mm (phóng to được), cuộn ruy băng nhiều màu, kéo.

**Đã làm (bản dev, 2026-09-28):** 3 cấp — `src/games/grade3Games/market/ribbon.js` (theme 'ribbon', ribbon-1..3), hình vẽ `art/ribbon.js` theo ảnh mẫu `scripts/g3games/ribbon-ref/ref1.png` (xem thử: `node scripts/g3games/preview-ribbon.mjs`).
- **Cảnh:** giá treo 6 màu ruy băng, bàn may có tấm lót cắt, thước nhựa (chỉ vạch cm có số), dải ruy băng màu khách chọn nằm trên thước — **đầu dải đúng vạch 0, cuộn ở bên phải**. Kính lúp góc trên luôn soi chỗ lưỡi kéo (dùng `<use>` nên thấy đúng cảnh thật).
- **Thao tác:** chạm / kéo bất cứ đâu trên dải hay thước, cây kéo đi theo ngón tay và bám vạch mm gần nhất; ◀ ▶ nhích từng mm (phím mũi tên cũng được). Bé **tự xác nhận** bằng nút **"✂️ Cắt — Đặt kéo đúng vạch rồi bấm"**; app không báo trước. Cắt → lưỡi kéo khép, đoạn ruy băng nhấc lên → đúng thì bay tới tay khách.
- **Sai:** khách phàn nàn "Ngắn quá / Dài quá", vạch đích tô cam kèm nhãn; thẻ kết quả nằm **phía trên** (chỗ giá treo, kính lúp) để vẫn thấy thước. Mẹo: "Tìm vạch số 7 (70 mm) rồi đếm thêm 2 vạch nhỏ là 72 mm".

| Cấp | Tên | Nhiệm vụ |
|---|---|---|
| 1 | Cắt theo mi-li-mét | "Cắt 45 mm", 12–96 mm, khoảng 2/3 số lần không tròn chục; thước 10 cm |
| 2 | Xăng-ti-mét và mi-li-mét | Xen kẽ *đổi* ("4 cm 4 mm" → gõ 44 mm ở máy tính rồi mới cắt; động vào kéo trước thì khách nhắc + máy tính rung) · *đo* (đoạn cắt sẵn nằm từ vạch 0, gõ dài bao nhiêu mm) · *cắt thẳng* theo "9 cm 1 mm" |
| 3 | Tính tiền ruy băng | Bảng hiệu "1 cm giá *p* nghìn đồng"; cắt *k* cm (3–14 cm, lượt 2 và 4 khách nói bằng mm: "70 mm") rồi gõ *p* × *k* (≤ 90 nghìn đồng); thước 15 cm |

- Điện thoại xoay ngang: thước nhỏ, bé chủ yếu nhìn kính lúp — nếu thấy khó thì cắt bớt giá treo (như quầy nước chanh) để thước to hơn.

---

### 4.2 🚚 Xe chở hàng

**Câu chuyện:** Bé điều phối kho hàng. Mỗi đơn cần chở một số thùng, mỗi xe chở được tối đa *n* thùng.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 25 hoặc Tuần 10 | 53 thùng, mỗi xe 8 thùng → **cần mấy xe?** (dư 5 thùng vẫn phải thêm 1 xe → 7 xe) |
| 2 | Bài 26 hoặc Tuần 11 | Số 2 chữ số chia số 1 chữ số, có và không có dư |
| 3 | Bài 28 hoặc Tuần 12 | Hai bước: kho có 2 dãy × 24 thùng, xe chở 6 thùng → mấy chuyến? |
| 4 | Bài 37 hoặc Tuần 15 | Số 3 chữ số |

- **Điểm học chính:** phân biệt "chia có dư → **thêm 1 xe**" với "**bỏ phần dư**" (ví dụ: đủ may mấy bộ áo?). Cấp 2 trở lên trộn cả hai loại câu hỏi.
- **Thao tác:** kéo thùng lên xe (cấp 1), xe đầy thì chạy đi. Xe cuối chở phần dư và chạy đi với thùng xe trống một phần.
- **Đồ hoạ:** xe tải nhiều màu, thùng hàng, kho, bến xe.

### 4.3 🔍 Máy phóng to – thu nhỏ

**Câu chuyện:** Phòng thí nghiệm của giáo sư Cú có máy biến hình.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 24 hoặc Tuần 10 | Máy "**gấp 3 lần**": 4 quả táo đi vào → ra mấy quả? |
| 2 | Bài 27 hoặc Tuần 11 | Máy "**giảm 2 lần**" |
| 3 | Bài 24 + 27 | **Đoán máy:** vào 5, ra 15 → máy "gấp mấy lần"? Có câu bẫy "thêm 3" hay "gấp 3" |
| 4 | Bài 39 hoặc Tuần 16 | So sánh: con voi 42 kg… cái gì lớn **gấp mấy lần** cái kia? |

- **Đồ hoạ:** cỗ máy có ống vào, ống ra và đèn; các vật đi qua máy (táo, sao, cá); giáo sư Cú.

### 4.4 📐 Thám tử góc vuông

**Câu chuyện:** Bé là thám tử, dùng ê-ke kiểm tra các góc trong một căn phòng hay khu vườn.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 18 hoặc Tuần 8 | Kéo ê-ke áp vào góc, đánh dấu góc vuông hay không vuông |
| 2 | Bài 19 hoặc Tuần 8 | Dùng ê-ke để kết luận hình nào là hình chữ nhật, hình vuông (đủ 4 góc vuông, cạnh bằng nhau), hình nào chỉ là tứ giác |
| 3 | Bài 19 | Đếm số tam giác, tứ giác trong hình ghép |

- **Đồ hoạ:** cảnh phòng (cửa sổ, tranh, bàn, diều, khung ảnh xiêu vẹo), ê-ke kéo xoay được, kính lúp.

### 4.5 🤖 Rô-bốt biểu thức

**Câu chuyện:** Rô-bốt cần đúng một "mã năng lượng" để chạy. Bé lắp thẻ số và thẻ phép tính để tạo ra mã đó.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 38 hoặc Tuần 15 | Tính giá trị biểu thức chỉ có + −, hoặc chỉ có × : (tính từ trái sang phải) |
| 2 | Bài 38 hoặc Tuần 16 | Có cả + − × : → **nhân chia trước** |
| 3 | Bài 38 | Có ngoặc |
| 4 | Bài 42 hoặc Tuần 17–18 | Ngược lại: cho số đích, bé tự xếp thẻ để ra số đó |

- **Thao tác:** rô-bốt "chạy" từng bước tính và làm sáng phép tính đang làm, nhờ vậy bé thấy thứ tự thực hiện.
- **Đồ hoạ:** rô-bốt có cục pin năng lượng, các thẻ số, đèn báo.

### 4.6 🏗️ Kiến trúc sư bảng ghim

**Câu chuyện:** Bé là kiến trúc sư nhận đơn thiết kế.

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 16 hoặc Tuần 7 | Đặt ghim vào **điểm ở giữa** / **trung điểm** của đoạn thẳng trên lưới |
| 2 | Bài 19 hoặc Tuần 8 | Căng dây chun tạo hình theo đơn: "hình chữ nhật dài 4 ô, rộng 2 ô", "một hình tam giác" |
| 3 | Bài 17, 20 hoặc Tuần 7 | **Compa:** đặt tâm, kéo độ mở bằng bán kính cho trước, vẽ đường tròn; nhận biết đường kính = 2 × bán kính |
| 4 | Bài 20 | Vẽ trang trí: hoàn thành hình đối xứng theo mẫu |

- **Đồ hoạ:** bảng ghim (lưới điểm), dây chun nhiều màu, compa, phiếu đặt hàng.

### 4.7 🚌 Xe buýt lên xuống

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Kiến thức lớp 2 | Xe có 45 người, lên 12 người → có bao nhiêu người? |
| 2 | Bài 3 hoặc Tuần 1–2 | **Tìm thành phần:** xe có 45 người, đến trạm thì còn 28 → mấy người xuống? Hoặc biết số người lúc sau, tìm số người lúc đầu |
| 3 | Bài 2 + 3 | Qua nhiều trạm liên tiếp; số đến 1 000 (tàu hỏa nhiều toa) |

- **Đồ hoạ:** xe buýt, trạm, hành khách (dùng lại vài NPC của Chợ phiên), tàu hỏa.

### 4.8 🌱 Vườn trồng theo hàng

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Kiến thức lớp 2 (bảng 2, 5) | Trồng 4 hàng, mỗi hàng 5 cây → bao nhiêu cây? |
| 2 | Bài 5–12 hoặc Tuần 2–6 | Bảng 3–9, xoay vườn để thấy 4 × 6 = 6 × 4, rồi chia ngược lại |
| 3 | Bài 13 hoặc Tuần 6 | **Tìm thừa số:** có 42 cây trồng thành 6 hàng → mỗi hàng mấy cây? |

- **Đồ hoạ:** mảnh vườn dạng lưới, cây con, cây lớn, bình tưới.

### 4.9 🌡️ Bác sĩ thú y & Trạm thời tiết

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 33 hoặc Tuần 13 | Đọc nhiệt kế (vạch chia 1 °C, 2 °C) |
| 2 | Bài 33 | Chọn nhiệt độ hợp lý: nước đá 0 °C, cơ thể người 37 °C, trời nóng 35 °C, nước sôi 100 °C |
| 3 | Bài 33 + Bài 2 | Thú bị sốt 39 °C, bình thường 37 °C → cao hơn mấy độ? So sánh nhiệt độ các thành phố |

- **Đồ hoạ:** nhiệt kế (kéo chỉnh được), thú cưng (chó, mèo, thỏ), bản đồ thời tiết đơn giản.

### 4.10 ✉️ Bác đưa thư

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Kiến thức lớp 2 | Đưa thư đến đúng nhà: số nhà có 3 chữ số, đọc số dưới dạng chữ ("ba trăm linh năm" → 305) |
| 2 | Bài 1 hoặc Tuần 1 | Nhà xếp theo thứ tự; tìm nhà nằm giữa, số liền trước, số liền sau; so sánh để đi đúng hướng |

- **Đồ hoạ:** dãy phố, các ngôi nhà có biển số, xe đạp của bác đưa thư, thư.

### 4.11 📦 Kho xếp hộp

| Cấp | Phù hợp khi đã học | Nội dung |
|---|---|---|
| 1 | Bài 21 hoặc Tuần 9 | Phân loại khối lập phương và khối hộp chữ nhật (hộp quà, xúc xắc, hộp sữa…) |
| 2 | Bài 21 | Đếm số mặt, cạnh, đỉnh; đếm số khối lập phương trong một chồng hộp |

- **Đồ hoạ:** hộp 3D (vẽ SVG góc nhìn chéo), xúc xắc, kệ kho.

---

## 5. Phong cách đồ hoạ và âm thanh

- **SVG vẽ bằng code**, phong cách phẳng, nét viền mềm, góc bo tròn, màu tươi. Dùng cùng bảng màu với app: `#34D399 #60A5FA #F59E0B #F472B6 #A78BFA #22D3EE #FB923C #4ADE80`.
- **Hình sinh từ số liệu:** cân nghiêng theo khối lượng thật, mực nước theo đúng số ml, vạch thước và nhiệt kế đúng tỉ lệ. Đề nào cũng tự vẽ đúng, không phải vẽ tay từng câu.
- **Nhân vật NPC:** khoảng 6 khách dùng chung cho mọi trò (bà cụ, chú công nhân, cô giáo, bạn nhỏ, bác nông dân, anh shipper). Mỗi nhân vật có 3 biểu cảm: chờ, vui, suy nghĩ. Mỗi nhân vật là một hàm hoặc file riêng, sau này thay bằng tranh của họa sĩ được.
- **Chuyển động:** CSS/JS nhẹ (nghiêng, dâng, trượt, sao bay), chạy tốt trên iPad.
- **Âm thanh:** TTS cho lời NPC; hiệu ứng đúng/sai và tiếng "ting" của máy tính tiền (dùng lại `fx.js` nếu phù hợp).
- **Bước đầu tiên:** vẽ **một cảnh mẫu tĩnh** của quầy trái cây (NPC + cân + quả cân + bảng giá) để duyệt phong cách, rồi mới vẽ hàng loạt.

---

## 6. Phần thưởng

- Sao tính theo **số nhiệm vụ thất bại** trong ván: không thất bại nhiệm vụ nào → ⭐⭐⭐; 1–2 nhiệm vụ thất bại → ⭐⭐; nhiều hơn → ⭐, miễn là hoàn thành ván. Sao cộng vào hệ sao hiện có, nên bảng xếp hạng tự tính theo. Mỗi cấp cần bổ sung một dòng rating trong `src/data/starRatings.js`.
- Mỗi ván hoàn thành được tính là một **lượt giải** trong quy tắc quay sticker của lớp 2+ (10 lượt giải = 1 lần quay).
- Riêng Chợ phiên: xong một phiên thì chợ có thêm trang trí (đèn lồng, cờ, thêm quầy) để bé thấy mình tiến bộ.
- Mỗi cấp lưu **kỷ lục** (ván ít thất bại nhất) để bé có mục tiêu khi chơi lại.

---

## 7. Kỹ thuật (dự kiến)

```
src/games/grade3Games.js            ← danh sách "Trò chơi tăng cường" (mở từ nút trong mỗi sách), thẻ cấp, thẻ giới thiệu
src/games/grade3Games/
  lessons.js                         ← map cấp → Bài / Tuần; đọc gw-progress-v1 / gp-progress-v1 để hiện "✓ Em đã làm bài này"
  loop.js                            ← vòng lặp chung: ván = N nhiệm vụ, thao tác thành công/thất bại, tổng kết, chơi lại
  npc.js                             ← nhân vật SVG + bong bóng lời + TTS
  market/                            ← Chợ phiên
    index.js  fruit.js  eggs.js  lemonade.js  bakery.js  ribbon.js
  trucks.js  machine.js  rightAngle.js  robot.js  geoboard.js
  bus.js  garden.js  thermo.js  postman.js  boxes.js
  art/                               ← hàm vẽ SVG dùng chung (quả, cân, thước, nhiệt kế…)
```

- **Nút vào:** thêm nút "🎮 Trò chơi tăng cường" vào menu bài của `grade3Workbook.js` và `grade3Practice.js`. Nút truyền sách đang mở (`workbook` hoặc `practice`) để lời gợi ý ghi đúng Bài hay Tuần.
- **Khai báo mỗi cấp:**
  ```js
  { id: 'fruit-5', title: 'Cân bằng gam', skill: 'H',
    knowledge: 'gam và ki-lô-gam',
    lessons: { workbook: ['bai-31'], practice: ['tuan-13'] },
    missions: 5,                         // số nhiệm vụ mỗi ván
    makeMission: (rng) => ({ ... }),     // sinh một nhiệm vụ mới (số, đồ vật, khách)
    tip: '1 kg = 1 000 g' }
  ```
- **Sinh nhiệm vụ** dùng RNG có seed. Mỗi ván dùng seed mới để dữ liệu luôn khác. Seed được ghi lại để tái hiện khi debug.
- **Dùng lại:** bộ cân "Thử cân" (`kit_measure`, `data-bal-*`), cơ chế kéo thả của `pairDrop.js`, TTS và fallback của phần Tiền tiểu học, hệ sao, sticker, leaderboard.
- **Trang dev** kiểu `pre4-dev.html` để chạy thử từng cấp với seed cố định.

### 7.1 Chỉ có trên bản dev cho tới khi chốt phát hành

Tính năng này **chỉ xuất hiện ở bản dev** (`npm run dev`). Bản production (`npm run build`) không hiện nút và không đóng gói code trò chơi. Khi đủ trò và bạn chốt phát hành thì mới bật.

- **Một cờ duy nhất** trong `src/data/features.js`:
  ```js
  // Bật trên production khi chốt phát hành trò chơi tăng cường: đổi thành true.
  export const GRADE3_GAMES = import.meta.env.DEV;
  ```
- **Nút "🎮 Trò chơi tăng cường"** trong hai sách chỉ được tạo khi `GRADE3_GAMES` là `true`.
- **Code trò chơi nạp bằng `import()` động** nằm sau cờ này. Khi build production, Vite bỏ nhánh `false` nên không có file trò chơi nào trong `dist/`, và không có hình SVG nào bị lộ trước.
- **Dữ liệu phụ đi kèm** (dòng rating trong `starRatings.js`, lượt quay sticker, điểm leaderboard) cũng chỉ ghi khi cờ bật. Nhờ vậy production không có sao "ma" từ trò chơi chưa ra mắt.
- **Kiểm tra trước khi push:** sau `npm run build`, tìm trong `dist/` không có chuỗi "Trò chơi tăng cường".
- **Ngày phát hành:** đổi cờ thành `true` trong một commit riêng, có thể đồng thời thêm thông báo "Mới!" trên nút.

---

## 8. Lộ trình

| Giai đoạn | Nội dung | Kết quả |
|---|---|---|
| 0 | Cảnh mẫu tĩnh quầy trái cây | Duyệt phong cách đồ hoạ |
| 1 | Nút "Trò chơi tăng cường" trong 2 sách + danh sách trò + `loop.js` + `lessons.js` + Chợ phiên / quầy Trái cây cấp 1–5 | Chơi được trọn một quầy: thẻ giới thiệu, chuỗi nhiệm vụ, tổng kết, chơi lại |
| 2 | Các quầy Trứng, Nước chanh, Tiệm bánh, May ruy băng | Chợ phiên đầy đủ |
| 3 | Xe chở hàng → Máy phóng to thu nhỏ → Thám tử góc vuông → Rô-bốt biểu thức | Các trò ưu tiên |
| 4 | Kiến trúc sư → Xe buýt → Vườn → Bác sĩ thú y → Bác đưa thư → Kho xếp hộp; chế độ "Trộn đề" | Phủ hết Bài 1–44 |
| Phát hành | Chốt danh sách trò đủ để ra mắt → đổi `GRADE3_GAMES = true` | Hiện trên production |

Mọi giai đoạn 0–4 chỉ chạy trên bản dev.

---

## 9. Quyết định đã chốt

| # | Vấn đề | Quyết định |
|---|---|---|
| 1 | Tiền | Tiền Việt Nam, đơn vị **nghìn đồng**, số nhỏ trong phạm vi đã học |
| 2 | Cách chơi | Không "chấm điểm". Mỗi trò là **chuỗi nhiệm vụ**, mỗi thao tác thành công hoặc thất bại, cuối ván tổng kết số nhiệm vụ thất bại. Chơi lại thì đổi số, đổi đồ vật (vòng lặp chơi, [§3.5](#35-vòng-lặp-trò-chơi)) |
| 3 | Vị trí | Nút **"🎮 Trò chơi tăng cường"** trong mỗi sách → mở danh sách trò đang có |
| 4 | Mở khóa | **Không khóa** trò hay cấp nào. Khi vào trò, hiện thông tin "phù hợp nếu em đã học … — Bài … trong vở bài tập" ([§3.3](#33-màn-hình-giới-thiệu-khi-vào-trò--chọn-cấp)) |
| 5 | Thứ tự ưu tiên | Giữ như [§4](#4-danh-sách-trò-chơi) |
| 6 | Phát hành | **Chỉ có trên bản dev** cho tới khi đủ trò và được chốt; bật bằng cờ `GRADE3_GAMES` ([§7.1](#71-chỉ-có-trên-bản-dev-cho-tới-khi-chốt-phát-hành)) |
