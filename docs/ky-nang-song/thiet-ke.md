# Thiết kế 🏘️ Phố Kỹ Năng: truyện tương tác kỹ năng sống (Lớp 1 → Lớp 5)

> Trạng thái (2026-10-14): **đã code đợt 1, chỉ bật ở bản dev** (cờ `LIFE_SKILLS` trong src/data/features.js). Trang riêng, một thẻ 🏘️ chung cho mọi lớp (kể cả Tiền tiểu học). 3 truyện: 🚦 Qua đường đến trường, 🚪 Ở nhà một mình có người gõ cửa, 🧺 Đi lạc trong siêu thị. Code: src/games/lifeSkills.js + src/games/lifeSkills/ (engine, scenes, stories, styles). Sao: tiền tố `life1`…`life5`, `lifep` theo lớp hồ sơ. Tiến độ: khoá `life-v1`.
>
> Đã chốt: trang riêng mở từ mọi lớp (§12 câu 3). Còn cần vẽ thêm: Bin, Na đeo cặp và mặt lo lắng (hình "buồn" sẵn có là mặt cau có nên không dùng), chú bảo vệ, chị nhân viên mặc đồng phục.
>
> Hình trong [docs/ky-nang-song/](.) là **mockup để duyệt ý tưởng**, chưa phải hình thật trong app.
>
> Bố cục màn hình theo skill `game-screen-layout`. Chỉ có tiếng Việt (giống pre3, giáo lý).

---

## 1. Ý tưởng chính

Bé **nhập vai** một bạn nhỏ trong truyện tranh động. Mỗi truyện là một tình huống đời thường: đi học, qua đường, ở nhà một mình, đi bơi, có người lạ bắt chuyện, bạn bị trêu, có tin nhắn lạ… Truyện chạy bằng **hình + hội thoại**, đến chỗ cần quyết định thì bé **chọn** cách xử lý. Mỗi lựa chọn dẫn sang một nhánh khác và kết thúc ở một **kết cục** khác nhau.

| Bài học kỹ năng sống thông thường | Phố Kỹ Năng |
|---|---|
| Đọc "không được đi theo người lạ" | Bé gặp người lạ trong truyện và **tự chọn**, rồi thấy chuyện gì xảy ra |
| Một đáp án đúng, một đáp án sai | Nhiều kết cục: tốt nhất, tạm được, chưa ổn. Kết cục nào cũng có người lớn giải thích vì sao |
| Học xong là hết | **Sổ kết cục**: bé quay lại để tìm hết các kết cục, so sánh cách xử lý |
| Chỉ đọc chữ | Giọng đọc mọi câu, nút lựa chọn có hình to, có **hành động** nhỏ trong truyện (cài mũ bảo hiểm, bấm số 114, kéo đồ vào cặp) |

![Màn chơi ngang](mockup-ngang.png)

*Hình 1. Màn chơi (ngang). Cảnh vẽ ở trên, nhân vật thật của app đứng trong cảnh. Bảng thoại cố định ở dưới, bên phải là 3 nút lựa chọn to có hình. Mở [mockup.html](mockup.html) để xem trực tiếp.*

![Màn chơi dọc](mockup-doc.png)

*Hình 2. Màn chơi (dọc): cảnh thu vào quanh đèn và vạch kẻ đường, bảng thoại ở giữa, nút lựa chọn xếp dưới.*

> Lưu ý: hình Bin, Na trong mockup đang cầm túi cam, giỏ rau (vẽ cho trò Chợ phiên); chú bảo vệ đang tạm dùng hình chú Hùng đẩy xe siêu thị. Bản thật cần vẽ thêm tư thế đeo cặp, chú bảo vệ, mặt lo lắng (§6).

---

## 2. Bản đồ Phố Kỹ Năng

Màn đầu là **bản đồ một khu phố** vẽ SVG. Mỗi địa điểm là một nút to, bấm vào thì mở danh sách truyện của nơi đó:

| Địa điểm | Chủ đề | Ví dụ truyện |
|---|---|---|
| 🏠 Nhà em | An toàn trong nhà, tự phục vụ | Ở nhà một mình có người gõ cửa; ổ điện; bếp ga; tự chuẩn bị cặp |
| 🚸 Đường đến trường | An toàn giao thông | Qua đường; ngồi sau xe máy; đi xe đạp; xuống xe buýt |
| 🏫 Trường học | Bạn bè, cảm xúc | Bạn bị trêu; nhặt được đồ của bạn; cãi nhau khi chơi; xin lỗi |
| 🛒 Chợ, siêu thị | Tiền và lạc đường | Đi lạc trong siêu thị; trả lại tiền thừa; chọn đồ khi tiền có hạn |
| 🌊 Hồ, sông, bể bơi | Phòng đuối nước | Bạn rủ tắm sông; thấy bạn bị đuối nước; đi bơi không có người lớn |
| 🌳 Công viên | Người lạ, an toàn cơ thể | Người lạ cho kẹo; có người muốn chạm vào em; con chó lạ |
| 📱 Thế giới mạng | An toàn trên mạng | Tin nhắn lạ đòi ảnh; trò chơi đòi mật khẩu của bố mẹ; bị chê trên nhóm lớp |
| 🔥 Khi có sự cố | Cháy, ốm, bị thương | Ngửi thấy mùi khét; bạn bị chảy máu cam; bà bị ngã |

Địa điểm có huy hiệu đếm số kết cục tốt nhất đã tìm được (ví dụ `3/5 ⭐`).

---

## 3. Một truyện gồm những gì

```
Truyện ──► Cảnh 1 ──► Cảnh 2 ──► [Lựa chọn] ─┬─► Cảnh 3a ──► [Lựa chọn] ─┬─► 🌟 Kết cục tốt nhất
                                             │                          └─► 🙂 Kết cục tạm được
                                             └─► Cảnh 3b ──► ⚠️ "Khoan đã!" ──► 💡 Kết cục chưa ổn
```

- **Cảnh**: một hình nền (đường phố, phòng khách, bể bơi…) + 1 đến 3 nhân vật, mỗi nhân vật có tâm trạng (vui, chờ, lo, buồn).
- **Lời thoại**: từng câu ngắn, có tên người nói, có giọng đọc. Bé chạm để sang câu tiếp.
- **Lựa chọn**: 2 hoặc 3 nút to, mỗi nút có **hình** và **một câu ngắn** ("Đợi đèn xanh", "Chạy qua luôn"). Lớp 1 chưa đọc tốt vẫn chọn được nhờ hình và giọng đọc khi chạm giữ.
- **Hành động** (không bắt buộc ở mọi truyện): một việc nhỏ làm bằng tay ngay trong cảnh, ví dụ kéo quai mũ bảo hiểm cài "tách", bấm số 114 trên điện thoại, kéo áo phao mặc cho bạn. Làm sai thì nhân vật nhắc, không phạt.
- **Kết cục**: có 3 loại.

| Loại | Ý nghĩa | Màn kết |
|---|---|---|
| 🌟 Tốt nhất | Cách xử lý an toàn và đúng | Nhân vật vui, pháo giấy, ⭐ |
| 🙂 Tạm được | Không nguy hiểm nhưng còn cách tốt hơn | Người lớn khen phần đúng, gợi ý phần chưa đúng |
| 💡 Chưa ổn | Lựa chọn có nguy cơ | Người lớn **ngăn lại kịp** ("Khoan đã!") và giải thích |

Cuối mỗi kết cục là **thẻ "Điều em học được"**: 1 đến 2 câu ghi nhớ, có hình, có giọng đọc. Ví dụ: *"Muốn qua đường, em đi ở vạch kẻ đường, nhìn trái, nhìn phải, rồi mới đi."*

Sau đó có 2 nút: **🔁 Chọn lại từ chỗ vừa rồi** (quay về lựa chọn cuối) và **📖 Truyện khác**.

### Quy tắc an toàn cho nội dung

1. **Không bao giờ vẽ cảnh bị hại.** Nhánh chưa ổn dừng lại *trước* khi chuyện xấu xảy ra: người lớn xuất hiện ngăn lại, hoặc nhân vật tự nhận ra. Không máu, không đuối nước trên màn hình, không cảnh xâm hại.
2. **Kết cục chưa ổn không làm bé sợ hay xấu hổ.** Lời giải thích nói về *hành động*, không chê *bé*: "Chạy qua đường lúc xe đang tới rất nguy hiểm", không nói "Em hư quá".
3. **Mọi kiến thức an toàn phải có nguồn** (Bộ GD&ĐT, UNICEF Việt Nam, Hội Chữ thập đỏ Việt Nam, Ủy ban An toàn giao thông Quốc gia, Tổng đài 111). Ghi nguồn trong file dữ liệu từng truyện.
4. **Số điện thoại khẩn cấp** dùng đúng: 111 (bảo vệ trẻ em), 113 (công an), 114 (cứu hoả, cứu nạn), 115 (cấp cứu).
5. Truyện về **an toàn cơ thể** và **người lạ** có thẻ "Gợi ý cho bố mẹ" ở trang danh sách truyện (bố mẹ nên ngồi cùng con).

---

## 4. Một truyện mẫu: 🚸 "Qua đường đến trường" (lớp 1–2)

Nhân vật: **Bin** (bé nhập vai), **Na** (bạn), **chú bảo vệ** trường. Cảnh: ngã tư trước cổng trường, có đèn tín hiệu và vạch kẻ đường.

```
C1  (Vỉa hè, đèn đỏ cho người đi bộ, trống trường sắp đánh)
    Na:  Bin ơi, sắp vào lớp rồi! Mình chạy qua đường luôn đi!
    ► Chọn:  [🚦 Đợi đèn xanh]   [🏃 Chạy qua luôn]   [🙋 Hỏi chú bảo vệ]

── Đợi đèn xanh ──► C2a
    Bin: Đèn đỏ, mình đợi một chút.
    (Đèn chuyển xanh. HÀNH ĐỘNG: chạm "nhìn trái", "nhìn phải" theo mũi tên)
    ► Chọn:  [🦓 Đi ở vạch kẻ đường]   [↗️ Đi chéo cho nhanh]
        ── vạch kẻ ──► 🌟 "Qua đường an toàn"
        ── đi chéo ──► 🙂 "Còn nhanh hơn được không?" (chú bảo vệ: đi chéo thì xe khó nhìn thấy em)

── Chạy qua luôn ──► C2b
    (Một xe máy đang tới. Hình đứng lại, có vòng đỏ nhấp nháy quanh xe)
    Chú bảo vệ: Khoan đã! Đứng lại, các cháu!
    ► 💡 "Suýt nữa thì nguy hiểm"

── Hỏi chú bảo vệ ──► C2c
    Chú: Chú dắt hai cháu qua nhé, đợi đèn xanh đã.
    ► 🌟 "Nhờ người lớn giúp"   (cùng là kết cục tốt nhất, khác đường đi)
```

Thẻ "Điều em học được" của truyện này: *Đợi đèn xanh. Nhìn trái, nhìn phải. Đi ở vạch kẻ đường. Không chạy qua đường dù sắp muộn học.*

Sổ kết cục của truyện: 4 kết cục (2 🌟, 1 🙂, 1 💡).

---

## 5. Màn chơi và bố cục

Theo skill `game-screen-layout`:

- **Cảnh vẽ chiếm gần hết màn hình**: bầu trời, đường phố, cây, nhà… vẽ SVG theo phong cách của app. Nhân vật NPC đứng *trong* cảnh, to.
- **Bảng thoại** là một tấm bảng đục (không trong suốt), chiều cao cố định, ở dưới (ngang) hoặc giữa (dọc). Khung tên người nói ở góc bảng, mặt nhân vật nhỏ bên cạnh.
- **Vùng lựa chọn** luôn giữ chỗ sẵn cho 3 nút, kể cả khi đang đọc thoại (nút mờ, chưa bấm được). Khi đến lựa chọn, nút sáng lên và rung nhẹ. **Không đổi bố cục giữa truyện.**
- **Màn kết** phủ lên vùng cảnh, không đẩy bảng thoại.

| | Ngang | Dọc |
|---|---|---|
| Cảnh | 100% rộng, phía trên ~65% | phía trên ~50% |
| Bảng thoại | dưới trái ~60% rộng | giữa, 100% rộng |
| Lựa chọn | dưới phải, 3 nút xếp dọc | dưới cùng, 3 nút xếp dọc hoặc lưới |

Chuyển động: nhân vật vào cảnh bằng bước đi; tâm trạng đổi bằng hình vui/buồn sẵn có + nhún/lắc; chữ hiện dần theo giọng đọc. Máy tắt hiệu ứng (`prefers-reduced-motion`) thì chạy bản êm, không bỏ.

Chữ trong game không dùng "nhé" ở lời nhắc của app (lời thoại nhân vật trong truyện thì vẫn được nói tự nhiên), không dùng dấu gạch dài.

---

## 6. Nhân vật

Dùng lại bộ NPC của trò chơi lớp 3 (`src/games/grade3Games/npc.js`), đã có hình thường và hình buồn:

| Vai | Nhân vật có sẵn |
|---|---|
| Bé nhập vai | Bin (bạn trai), Na (bạn gái). Bé chọn một trong hai lúc mở trò lần đầu |
| Bạn bè | Bé Ti, Na hoặc Bin (bạn còn lại) |
| Người lớn trong nhà | Bà Tư, ông Sáu, chú Hùng, cô Lan |
| Người lớn ở ngoài | anh Minh, chị Mai, bác Ba (bác tài), cô Thu |

Cần vẽ thêm (đợt sau): chú bảo vệ, cô giáo, chú công an giao thông, cô y tá, "người lạ" (trông bình thường, **không vẽ thành người xấu đáng sợ**, vì người lạ ngoài đời không có mặt xấu) và tâm trạng **lo lắng** cho Bin và Na.

---

## 7. Theo lớp

Cùng một khu phố, mỗi truyện có nhãn lớp:

| | Lớp 1–2 | Lớp 3–5 |
|---|---|---|
| Lời thoại | Rất ngắn, mỗi câu dưới 12 chữ | Dài hơn, có lý do |
| Lựa chọn | 2 nút, có hình to | 3 nút, có lựa chọn "nghe có vẻ đúng" để suy nghĩ |
| Chủ đề | Giao thông, đi lạc, người lạ, đồ nóng, đồ điện | Thêm: mạng xã hội, bắt nạt, tiền bạc, sơ cứu đơn giản, giúp người khác |

Bé lớp nào cũng mở được mọi truyện, danh sách chỉ xếp truyện hợp lớp lên trước.

---

## 8. Phần thưởng

- **⭐ Sao**: tìm được kết cục 🌟 lần đầu thì được sao (1 truyện tối đa 3 sao, theo độ dài truyện). Ghi trong `starRatings.js` với tiền tố `life`.
- **📔 Sổ kết cục**: mỗi truyện hiện các ô kết cục, ô chưa tìm thì là dấu "?". Tìm đủ hết kết cục của một địa điểm thì được **huy hiệu** địa điểm (ví dụ 🚸 "Đi đường giỏi").
- Kết cục 💡 **không trừ sao**, chỉ ghi vào sổ. Ý là: thử sai trong truyện an toàn hơn ngoài đời.
- Sticker và bảng xếp hạng: tính như các trò khác (số lần giải xong = số kết cục 🌟 mới).

---

## 9. Kỹ thuật

```
src/games/lifeSkills.js            thẻ trang chủ, bản đồ phố, danh sách truyện
src/games/lifeSkills/engine.js     chạy truyện: cảnh, thoại, lựa chọn, kết cục, sổ kết cục
src/games/lifeSkills/actions.js    các hành động nhỏ (cài mũ, bấm số, nhìn trái phải…)
src/games/lifeSkills/scenes/*.js   cảnh SVG (ngã tư, phòng khách, bể bơi, công viên…)
src/games/lifeSkills/stories/*.js  dữ liệu truyện, mỗi địa điểm một file
scripts/life-dev.html              harness: mở thẳng một truyện, một cảnh
```

Dữ liệu truyện là dữ liệu thuần, người không lập trình cũng sửa được:

```js
export default {
  id: 'qua-duong', place: 'road', grades: [1, 2],
  title: 'Qua đường đến trường',
  source: 'Ủy ban ATGT Quốc gia, tài liệu ATGT cho học sinh tiểu học',
  cast: { me: 'player', na: 'banNa', guard: 'chuBaoVe' },
  start: 'c1',
  nodes: {
    c1: { scene: 'crossing', light: 'red', show: { me: 'wait', na: 'happy' },
          say: [['na', 'Bin ơi, sắp vào lớp rồi! Mình chạy qua đường luôn đi!']],
          choose: [
            { icon: '🚦', text: 'Đợi đèn xanh', go: 'c2a' },
            { icon: '🏃', text: 'Chạy qua luôn', go: 'c2b' },
            { icon: '🙋', text: 'Hỏi chú bảo vệ', go: 'c2c' },
          ] },
    // …
    endBest1: { end: 'best', title: 'Qua đường an toàn',
                learn: 'Đợi đèn xanh. Nhìn trái, nhìn phải. Đi ở vạch kẻ đường.' },
  },
};
```

- Tiến độ (kết cục đã tìm, nhân vật đã chọn) lưu bằng `scopedKey` + `tth:data-changed` để đồng bộ Drive.
- Giọng đọc dùng TTS sẵn có; mỗi câu thoại đọc bằng giọng hợp nhân vật nếu có.
- Không dịch tiếng Anh.
- Có một script kiểm tra dữ liệu: mọi `go` trỏ tới node có thật, mọi nhánh đều đi tới kết cục, mỗi truyện có ít nhất một kết cục 🌟, có `source`.

---

## 10. Lộ trình

| Đợt | Nội dung |
|---|---|
| 1 | Engine + bản đồ phố + 3 truyện: 🚸 Qua đường đến trường, 🛒 Đi lạc trong siêu thị, 🏠 Ở nhà một mình có người gõ cửa. Cờ dev `LIFE_SKILLS`, chờ duyệt |
| 2 | 🌊 Bạn rủ tắm sông, 🌳 Người lạ cho kẹo, 🏫 Bạn bị trêu, 🔥 Ngửi thấy mùi khét. Vẽ thêm NPC chú bảo vệ, cô giáo, người lạ |
| 3 | 📱 Thế giới mạng (lớp 3–5), sơ cứu đơn giản, tiền bạc. Huy hiệu địa điểm |
| sau | Gắn với 📷 Trò chơi camera kỹ năng sống (ví dụ làm động tác "nhìn trái, nhìn phải" trước camera) |

---

## 11. Danh sách truyện dự kiến (khoảng 24 truyện)

| Địa điểm | Truyện | Lớp |
|---|---|---|
| 🏠 | Ở nhà một mình có người gõ cửa · Ổ điện và cái kéo · Nồi canh đang sôi · Tự chuẩn bị cặp sách | 1–5 |
| 🚸 | Qua đường đến trường · Ngồi sau xe máy (mũ bảo hiểm) · Xuống xe buýt · Đi xe đạp trên đường | 1–5 |
| 🏫 | Bạn bị trêu · Nhặt được hộp bút · Tranh đồ chơi · Em làm vỡ cốc của bạn | 1–5 |
| 🛒 | Đi lạc trong siêu thị · Cô bán hàng trả thừa tiền · Có 20 nghìn, mua gì | 1–5 |
| 🌊 | Bạn rủ tắm sông · Thấy bạn bị đuối nước (không nhảy xuống cứu, gọi người lớn, ném phao) | 1–5 |
| 🌳 | Người lạ cho kẹo · Quy tắc 5 ngón tay · Con chó lạ | 1–5 |
| 📱 | Tin nhắn lạ đòi ảnh · Trò chơi đòi mật khẩu · Bị chê trên nhóm lớp | 3–5 |
| 🔥 | Ngửi thấy mùi khét · Bạn chảy máu cam · Bà bị ngã | 3–5 |

---

## 12. Câu hỏi cần chốt

1. **Tên trò**: 🏘️ "Phố Kỹ Năng" hay tên khác ("Em Tự Lập", "Bin và Na lớn rồi")?
2. **Bé nhập vai** Bin/Na có sẵn, hay dùng **avatar hồ sơ** của bé (ảnh đại diện đã chọn lúc tạo hồ sơ)?
3. **Vị trí**: một thẻ riêng trên trang chủ cho mọi lớp 1–5, hay nằm trong 🎮 hub trò chơi?
4. **Đợt 1** ba truyện ở §10 đã đúng ưu tiên chưa, hay muốn bắt đầu bằng 🌊 đuối nước / 🌳 người lạ?
5. Truyện **an toàn cơ thể** (Quy tắc 5 ngón tay): làm trong app, hay chỉ làm khi có nội dung đã được chuyên gia (giáo viên, tổng đài 111) duyệt?
