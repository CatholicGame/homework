# 🛤️ Kỹ sư đường sắt: thiết kế chi tiết (Toán 4, Bài 27–30)

> Trạng thái (2026-10-10): **đã code bản đầu (bản dev, cờ `GRADE4_GAMES`)**: `src/games/grade4Games/rail.js`, hình vẽ `grade4Games/art/rail.js`, hub `src/games/grade4Games.js`, nút vào ở thẻ 🧰 Toán 4 công cụ (danh sách bài + màn Bài 27–30). Phần chưa làm ghi ở [§11](#11-bản-đầu-chưa-có). Mở rộng mục §4.7 của [thiet-ke-tro-choi.md](thiet-ke-tro-choi.md). Các quyết định ở [§10](#10-quyết-định). Đây là **trò lớp 4 đầu tiên**, làm cùng khung trò lớp 4.
>
> Nguồn nội dung: SGK Toán 4 Tập Một (Kết nối tri thức), Chủ đề 6: Bài 27 *Hai đường thẳng vuông góc*, Bài 28 *Thực hành vẽ hai đường thẳng vuông góc*, Bài 29 *Hai đường thẳng song song*, Bài 30 *Thực hành vẽ hai đường thẳng song song*. Cách vẽ theo đúng các bước của sách, như công cụ 📐 Ê ke trong `grade4-tools` (`src/games/grade4Tools/square.js`, `lessons/lines.js`).

---

## 1. Ý tưởng

Tỉnh mở một tuyến đường sắt mới đi qua đồng lúa tới nhà ga. Bé là **kỹ sư đường sắt**: kiểm tra bản vẽ, đặt ray, làm đường ngang cho người và xe qua đường ray. Mỗi bản vẽ bé làm xong sẽ **thành thật**: giấy ô mờ đi, nét bút biến thành ray thép, tà vẹt, đường nhựa; tàu chạy qua. Vẽ đúng thì tàu chạy êm, còi "tu tu"; vẽ lệch thì có hậu quả nhìn thấy được, rồi ê ke hiện ra chỉ chỗ sai.

**Vì sao chuyện đường sắt hợp với bài này (số liệu thật):**
- Hai thanh ray của một đường tàu **song song**: cách nhau đúng một khoảng ở mọi chỗ (đường sắt Thống Nhất Bắc – Nam khổ 1 000 mm). Ray chụm lại hay loe ra thì bánh tàu trật khỏi ray.
- Tà vẹt nằm **vuông góc** với ray, cách đều nhau.
- Đường bộ cắt qua đường sắt (đường ngang) phải làm **vuông góc**: quy định về đường ngang của Bộ Giao thông vận tải (Thông tư 25/2018/TT-BGTVT, Điều 6, bản hợp nhất 17/VBHN-BGTVT năm 2022) ghi góc giao cắt là góc vuông (90°), chỉ khi địa hình khó khăn mới được nhỏ hơn, nhưng không dưới 45°. Xe qua nhanh nhất, bánh xe máy không lọt vào khe ray.
- Câu thoại dùng được: *"Đường ngang phải vuông góc với đường ray, xe qua mới an toàn."*
- Ga có nhiều đường ray song song nhau để tàu tránh nhau.

**Nhân vật:** cô kỹ sư trưởng (giao việc, nhận xét) và bác Ba lái tàu của trò 🚆 lớp 3 (lái tàu chạy thử). Lấy từ `npc.js`, không vẽ nhân vật mới.

---

## 2. Mục tiêu học tập

| Bài | Bé làm được sau khi chơi | Cấp |
|---|---|---|
| 27 | Nhận ra hai đường thẳng vuông góc; dùng ê ke kiểm tra góc vuông | 1 |
| 28 | Vẽ đường thẳng vuông góc với một đường thẳng, đi qua một điểm cho trước (điểm nằm trên và nằm ngoài đường thẳng) | 2 |
| 29 | Nhận ra hai đường thẳng song song: kéo dài mãi không gặp nhau | 3 |
| 30 | Vẽ đường thẳng song song với một đường thẳng, đi qua một điểm (vẽ vuông góc hai lần) | 4 |

Cấp 1 và 3 là **nhận biết** (chọn bằng nút to, có công cụ để kiểm trước khi chọn). Cấp 2 và 4 là **vẽ** bằng ê ke theo đúng các bước của sách, không vẽ tay tự do.

---

## 3. Màn hình

### 3.1 Cảnh

- **Phía sau (vẽ SVG, phong cách các trò lớp 3):** trời, núi xa, đồng lúa, hàng cột điện, công trường có cọc tiêu cam, lán kỹ sư. Một đoạn đường ray thật chạy ở mép dưới cảnh, tàu chạy thử đi trên đó khi xong nhiệm vụ.
- **Bản vẽ (bảng đục):** tờ giấy kẻ ô ghim trên bàn kỹ sư. Đây chính là `createSquare` (giấy 20 × 11 ô, ê ke có núm xoay), nhìn từ trên xuống như bản đồ. Đường ray trên bản vẽ là nét đôi có tà vẹt; đường bộ là nét xám rộng có vạch giữa; nhà ga, cổng trường, nhà dân là các điểm có biểu tượng nhỏ cạnh tên điểm (H, M, Ga A…).
- **Khi bản vẽ "thành thật":** lưới ô mờ đi trong 0,6 giây, nền giấy chuyển dần sang màu cỏ, ray và đường bộ được tô màu thật, tàu nhìn từ trên xuống (`locoSvg`, `carSvg` của trò 🚆 lớp 3, thu nhỏ) chạy dọc ray. Làm lại trên chính bản vẽ, không mở màn mới, để không nhảy bố cục.

### 3.2 Bố cục

| | Ngang | Dọc |
|---|---|---|
| Bản vẽ | Chiếm phần lớn bên trái, cao hết khung | Trên cùng, rộng hết khung |
| Cột thao tác | Bên phải: cô kỹ sư + bong bóng một câu, hàng nút công cụ (📐 Ê ke, ↔️ Kéo dài), 2 nút chọn to hoặc nút ✏️ Vẽ, nút **Xong** | Dưới bản vẽ: cô kỹ sư nhỏ bên trái, nút bên phải |
| Thẻ kết quả | Phủ lên cột thao tác | Phủ lên vùng nút |

- Mọi vùng có sẵn từ đầu lượt (bản vẽ, cột thao tác, chỗ nút chọn). Nút chưa dùng thì mờ chứ không ẩn. Không dùng `paddingBottom = card.offsetHeight`.
- Nút chọn là nút to có hình nhỏ bên trong: *"⊥ Vuông góc"* / *"✕ Không vuông góc"*, *"∥ Song song"* / *"✕ Cắt nhau"*.
- Dải hướng dẫn bằng biểu tượng (📐 → ✏️ → ✔) ở đầu mỗi cấp, không đoạn chữ dài.
- Kiểm bằng `scripts/games-preview.html`: ngang + dọc, đầu / giữa / cuối lượt, cả lúc tàu đang chạy.

---

## 4. Một ván

- **6 nhiệm vụ**, mỗi nhiệm vụ một bản vẽ. Mỗi nhiệm vụ chỉ **thành công** / **thất bại**; cuối ván tổng kết như các trò lớp 3 (`loop.js`).
- **Nút "Xong" có từ đầu.** App không báo đúng trước khi bé bấm Xong. Ở cấp nhận biết, bé chọn đáp án rồi bấm Xong; ở cấp vẽ, nét vẽ xong rồi bấm Xong (vẽ lại được trước khi bấm).
- **Kiểm trước khi chọn:** các công cụ luôn dùng được, không trừ điểm. Bé có thể đoán bằng mắt, nhưng trò được dựng để mắt dễ bị lừa (xem §8), nên kiểm thì chắc ăn hơn.
- **Sau khi bấm Xong:** bản vẽ thành thật, tàu chạy thử. Thành công: tàu qua êm, người qua đường ngang vẫy tay, cờ xanh. Thất bại: hậu quả (§7), rồi ê ke hoặc phép kéo dài tự chạy để cho thấy vì sao, rồi hiện cách đúng bằng nét xanh lá.

---

## 5. Các cấp

### Cấp 1: 🔍 Kiểm tra đường ngang (Bài 27)

**Việc:** đội thi công đã vẽ sẵn các đường bộ cắt qua đường ray. Bé kiểm tra từng chỗ giao: có vuông góc không.

**Luồng một nhiệm vụ:**
1. Bản vẽ có một đường ray và một đường bộ cắt nhau tại điểm O (nhiệm vụ sau: 2–3 đường bộ, hỏi một đường được tô sáng).
2. Cô kỹ sư: *"Đường ngang này có vuông góc với đường ray không?"*
3. Bé kéo ê ke tới, đặt đỉnh góc vuông vào O, xoay cho một cạnh nằm dọc ray. Khít thì hiện ô vuông xanh ở góc; hở thì thấy khe đỏ giữa cạnh ê ke và đường bộ (đúng như công cụ của `grade4-tools`).
4. Bé bấm **"⊥ Vuông góc"** hoặc **"✕ Không vuông góc"**, rồi **Xong**.

**Biến thể trong ván:** ván 6 nhiệm vụ trộn: 3 chỗ giao vuông góc, 3 chỗ không; có 1 nhiệm vụ "cả bốn góc": tô bốn góc quanh O, hỏi *"Có mấy góc vuông?"* (vuông góc → 4 góc vuông chung đỉnh, như sách).

**Hậu quả khi đúng / sai:** xem §7.

### Cấp 2: ✏️ Làm đường ngang (Bài 28)

**Việc:** vẽ đường bộ đi qua một chỗ cho trước và vuông góc với đường ray.

**Luồng (2 bước như sách):**
1. Bản vẽ có đường ray AB và điểm H: cổng trường, chợ, hoặc nhà văn hóa. Cô kỹ sư: *"Làm đường từ cổng trường H, cắt vuông góc qua đường ray."*
2. ① Bé đặt một cạnh góc vuông của ê ke nằm dọc ray AB, trượt ê ke cho cạnh kia chạm H (ê ke hít khớp như `drawPerpByChild`).
3. ② Bé bấm **"✏️ Vẽ theo cạnh ê ke"**: bút chạy dọc cạnh ê ke, vẽ đường qua H. Dấu góc vuông hiện ở chỗ giao.
4. Bé bấm **Xong**: nét bút thành đường nhựa có rào chắn, đèn đỏ nhấp nháy, rào hạ xuống, tàu chạy qua, rào nâng lên, một bạn nhỏ đạp xe qua.

| Nhiệm vụ | H ở đâu | Hướng đường ray |
|---|---|---|
| 1–2 | Nằm **ngoài** ray | Ngang hoặc dọc theo lưới |
| 3 | Nằm **trên** ray (làm đường ngang ngay tại điểm đó) | Ngang hoặc dọc |
| 4–6 | Trên hoặc ngoài | Ray chéo theo lưới (dốc 1:1, 1:2) |

- Ê ke chỉ hít khớp khi đặt đúng, nên cấp này **không thể vẽ sai góc**. Cái có thể sai: vẽ đường không qua H (cạnh kia chưa chạm H mà đã vẽ), hoặc đặt ê ke dọc một đường khác (cấp 4–6 có thêm một con đường cũ làm nhiễu). Khi đó nút Vẽ vẫn bấm được, kết quả chỉ lộ sau Xong: đường mới không tới cổng trường, các bạn học sinh phải đi vòng.
- Bé đặt ê ke sai thứ tự (chưa xoay đã trượt) thì cô kỹ sư nói việc cần làm trước và núm xoay nhấp nháy (`stall.js ask`).

### Cấp 3: 🔩 Chọn cặp ray (Bài 29)

**Việc:** xưởng giao một bó thanh ray. Chỉ hai thanh song song mới ghép thành một đường tàu.

**Luồng một nhiệm vụ:**
1. Bản vẽ có 4–5 đoạn thẳng (thanh ray) nằm rải rác. Cô kỹ sư: *"Chọn hai thanh ray song song để ghép thành đường tàu."*
2. Bé chạm hai thanh để chọn (thanh được chọn sáng lên). Có hai cách kiểm:
   - **↔️ Kéo dài:** hai thanh đang chọn kéo dài ra tới mép giấy. Cắt nhau thì có điểm giao, kêu "bốp" (như ↔️ Kéo dài của SGK Toán 4); song song thì chạy tới mép giấy mà không gặp.
   - **📐 Đo khoảng cách bằng ê ke:** đặt ê ke ở hai đầu, đếm số ô giữa hai thanh. Bằng nhau là song song.
3. Bé bấm **Xong**: hai thanh bay vào chỗ, tà vẹt chạy vào giữa, tàu chạy thử.

**Biến thể:** nhiệm vụ 5–6 hỏi ngược: *"Thanh nào làm hỏng đường tàu?"* Bản vẽ có một đường tàu dài 3 đoạn, một đoạn có ray hơi chụm; bé chạm đoạn hỏng.

### Cấp 4: 🛤️ Làm ray thứ hai, đường tránh tàu (Bài 30)

**Việc:** đã có một ray (hoặc một đường tàu). Vẽ ray thứ hai / đường tránh song song với nó, đi qua điểm cho trước.

**Luồng (vẽ vuông góc hai lần, như sách):**
1. Bản vẽ có đường ray AB và điểm M: cọc mốc khổ ray, hoặc nhà ga mới. Cô kỹ sư: *"Làm đường tránh tàu song song với đường AB, đi qua nhà ga M."*
2. **Bước 1:** dùng ê ke vẽ đường thẳng qua M vuông góc với AB, được đường CD (nét xanh dương, đường phụ, sau sẽ mờ đi).
3. **Bước 2:** dùng ê ke vẽ đường thẳng qua M vuông góc với CD, được đường thẳng mới.
4. Bé bấm **Xong**: đường phụ CD mờ đi, đường mới thành đường ray đôi đi qua ga; hai đoàn tàu chạy ngược chiều trên hai đường và tránh nhau ở ga.

| Nhiệm vụ | Nội dung |
|---|---|
| 1–2 | Ray ngang hoặc dọc lưới, M cách 3–5 ô: **ray thứ hai** của một đường tàu |
| 3–4 | Ray chéo theo lưới: **đường tránh tàu** qua nhà ga |
| 5–6 | Hai bước có thêm bẫy: một con đường không song song ở gần, bé phải chọn đúng đường AB để đặt ê ke ở bước 2 (đặt dọc CD chứ không dọc AB) |

- Cái có thể sai: bước 2 đặt ê ke dọc AB thay vì dọc CD (ra đường vuông góc với AB, không phải song song). Hậu quả: đường tránh đâm ngang vào đường chính.

---

## 6. Sinh đề

- **Toạ độ trên lưới ô** của `square.js` (x 0–20, y 0–11). Điểm luôn nằm ở giao điểm ô để bé đếm ô được.
- **Hướng đường:** chỉ dùng các hướng có số ô đẹp: ngang, dọc, dốc 1:1, 1:2, 2:1. Đường vuông góc với dốc 1:2 là dốc 2:−1, vẫn nằm trên lưới.
- **Mồi "gần vuông góc" (cấp 1):** lệch 8–15° so với 90°. Cấp nhiệm vụ đầu lệch nhiều (15°), cuối ván lệch ít (8°), ê ke vẫn thấy rõ khe hở.
- **Mồi "gần song song" (cấp 3):** chênh 3–6°, chọn sao cho hai thanh **gặp nhau ngoài đoạn đang vẽ nhưng trong khổ giấy** khi kéo dài, để ↔️ Kéo dài luôn cho thấy điểm giao. Trong mỗi nhiệm vụ có đúng một cặp song song.
- **Điểm H, M:** cách đường 2–6 ô; chân đường vuông góc nằm trong khổ giấy và cách mép ≥ 2 ô, để ê ke đặt vừa.
- Chơi lại thì đổi toạ độ, đổi tên điểm, đổi biểu tượng (cổng trường, chợ, trạm y tế, nhà văn hóa, ga).
- Hạt giống ngẫu nhiên theo ván (`makeRng` của `loop.js`) để chạy lại được khi kiểm thử.

---

## 7. Hậu quả và phản hồi

| Tình huống | Đúng | Sai |
|---|---|---|
| Đường ngang (cấp 1, 2) | Rào chắn hạ khít, tàu qua, rào nâng, bạn nhỏ đạp xe qua thẳng | Xe đạp đi chéo, bánh xe khựng ở khe ray, chuông rung; ê ke tự bay tới chỗ giao, khe hở đỏ hiện ra, rồi đường đúng hiện bằng nét xanh lá |
| Đường không qua H (cấp 2) | Các bạn đi từ cổng trường thẳng ra đường ngang | Các bạn đứng ở cổng, mũi tên chỉ đường mới đi trượt qua H; ê ke chạy lại bước ① |
| Cặp ray (cấp 3) | Tà vẹt chạy vào, tàu chạy êm | Tàu chạy chậm lại, khựng trước chỗ ray chụm; hai thanh kéo dài ra gặp nhau, chấm đỏ ở điểm giao |
| Đường tránh (cấp 4) | Hai tàu tránh nhau ở ga | Đường mới đâm vào đường chính, tàu phanh gấp, bác Ba thổi còi; hai bước vẽ chạy lại, bước sai tô cam |

- Không có cảnh đổ vỡ đáng sợ: tàu chỉ khựng, phanh, lùi về.
- Máy tắt hiệu ứng (`prefers-reduced-motion`): vẫn chạy đủ các bước dạy (ê ke bay tới, kéo dài), chậm và êm hơn (`calmMotion`), bỏ rung lắc.
- Câu thoại kết bằng "!" hoặc "."; không "nhé"; không dấu gạch dài. Mỗi câu có nút 🔊.

---

## 8. Vì sao đây là trò chơi, không phải bài tập

- **Mắt dễ bị lừa:** mồi gần vuông góc, gần song song được chọn để nhìn qua thì tưởng đúng. Bé học được thói quen của kỹ sư: *kiểm bằng dụng cụ trước khi quyết*.
- **Hậu quả trong cảnh:** đường ngang chéo làm xe đạp khựng, ray chụm làm tàu khựng; đó là lý do thật người ta cần vuông góc và song song.
- **Thành quả nhìn thấy được:** qua 6 nhiệm vụ, tuyến đường hiện dần ở dải cảnh phía dưới (mỗi nhiệm vụ thành công thêm một đoạn ray, một đường ngang, một nhà ga). Cuối ván tàu chạy trọn tuyến, có thể chụp ảnh tuyến đường của mình.

---

## 9. Kỹ thuật

```
src/games/grade4Games/rail.js        ← 4 cấp, luồng nhiệm vụ, sinh đề
src/games/grade4Games/art/rail.js    ← cảnh nền, ray đôi + tà vẹt, đường nhựa, rào chắn, biểu tượng điểm
```

- **Dùng lại `square.js`:** giấy ô, ê ke (kéo, xoay núm, hít khớp, trượt dọc đường nền), `drawAlong`, `rightMark`, `extend`, `lock`. Cần thêm (không đổi hành vi cũ, thử lại Khám phá và Thực hành Bài 27–30 của `grade4-tools` sau khi sửa):
  - kiểu nét cho `t.line`: `style: 'rail' | 'road' | 'guide'`;
  - chọn đoạn bằng chạm (cấp 3), sự kiện `pick`;
  - lớp "thành thật": làm mờ lưới, đổi nền, vẽ tàu chạy dọc một đường (`t.realize()`, `t.runTrain(id)`);
  - ê ke tự bay tới một chỗ để chỉ lỗi (đã có `moveEke`).
- **Tách `drawPerpByChild`** từ `lessons/lines.js` ra `square.js` (hoặc một file chung) để trò dùng lại, có thêm chế độ "cho vẽ cả khi chưa qua H" để cấp 2 có cái để sai.
- **Tàu:** `locoSvg`, `carSvg` của `grade3Games/art/train.js` (đã nhìn từ trên xuống), xoay theo hướng ray.
- **Khung:** `loop.js` (6 nhiệm vụ, tổng kết, chơi lại), `market/stall.js` (NPC, bong bóng, thẻ kết quả), `stall.js ask` (nhắc khi làm sai thứ tự), `fly.js`.
- **Catalog:** id `rail-1` … `rail-4`, `lessons` lần lượt `bai-27`, `bai-28`, `bai-29`, `bai-30`; `also` cấp 4 có `bai-28`. Sao: dòng `'g4games:rail-1'` … `'g4games:rail-4'` trong `src/data/starRatings.js`.
- **Cờ:** sau `GRADE4_GAMES` như cả nhóm trò lớp 4.
- **Kiểm thử:** móc DEV đặt sẵn nhiệm vụ + hạt giống; Playwright chụp 4 cấp × ngang / dọc × đầu / giữa / cuối lượt; một lượt tự giải bằng cách gọi `t.eke({...})` đúng toạ độ.

---

## 10. Quyết định

Chốt ngày 2026-10-10 (bạn giao cho mình quyết định).

| # | Vấn đề | Quyết định | Lý do |
|---|---|---|---|
| 1 | Làm trò này trước Tiệm bánh? | **Có.** 🛤️ là trò lớp 4 đầu tiên, làm cùng khung trò lớp 4 (hub, catalog, cờ `GRADE4_GAMES`, nút vào trong `grade4-tools`). Tiệm bánh làm ngay sau | Trò này đã thiết kế chi tiết; phần khó nhất (ê ke hít khớp, vẽ theo cạnh, kéo dài) đã có và đã chạy trong `square.js`; tàu có sẵn hình của lớp 3. Rủi ro thấp nhất để dựng và thử khung lớp 4. Tiệm bánh còn chờ duyệt phong cách (giai đoạn 0) |
| 2 | Số cấp | **4 cấp**, mỗi cấp một Bài (27, 28, 29, 30) | Nhận biết và vẽ là hai kỹ năng khác nhau; mở từ biểu tượng một Bài (`game.focus`) thì ra đúng một cấp |
| 3 | Cấp vẽ có cho vẽ sai? | **Có, giới hạn:** nút ✏️ Vẽ bấm được khi một cạnh ê ke đã nằm dọc **một** đường trên bản vẽ (kể cả đường nhiễu), chưa cần chạm điểm. Góc luôn vuông (ê ke hít khớp); lỗi có thể là: không qua điểm, đặt dọc nhầm đường, bước 2 cấp 4 đặt dọc AB thay vì CD. Lỗi chỉ lộ sau Xong | Không có khả năng sai thì không còn là trò chơi; nhưng không cho vẽ nét lung tung, để nét vẽ luôn là một đường thẳng sạch như sách |
| 4 | Dải tuyến đường lớn dần qua 6 nhiệm vụ | **Có.** Dải cảnh phía dưới giữ chỗ từ đầu ván, mỗi nhiệm vụ thành công thêm một đoạn; thất bại thì đoạn đó là cọc tiêu cam "đang sửa". Cuối ván tàu chạy trọn tuyến | Thành quả nhìn thấy được, không gây nhảy bố cục |
| 5 | Nút 📸 chụp tuyến đường | **Không làm** ở bản đầu | Không thêm giá trị học; có thể thêm sau |
| 6 | Số nhiệm vụ mỗi ván | **6**, như lớp 3 | Thống nhất với khung `loop.js` |
| 7 | Tiếng Anh | **Không**, như `grade4-tools` | |

---

## 11. Bản đầu chưa có

Làm sau, khi bạn chơi thử bản đầu:

- Cấp 1: nhiệm vụ *"Có mấy góc vuông?"* (bốn góc quanh O).
- Cấp 3: nhiệm vụ ngược *"Thanh nào làm hỏng đường tàu?"*, và cách kiểm thứ hai bằng ê ke (đếm ô khoảng cách ở hai đầu). Bản đầu chỉ có ↔️ Kéo dài, vì mồi "gần song song" phải gặp nhau trong khổ giấy nên lệch 10–20°, không phải 3–6° như §6.
- Nút 🎮 ở thẻ SGK Toán 4 (2011) `grade4-textbook`.
