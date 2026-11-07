# Kịch bản lời hai MC, Đấu Trường Nhí (tên tạm)

Đi kèm [thiet-ke.md](thiet-ke.md) mục 3 (một lượt 45 phút), mục 5 (các vòng), mục 8 (hai MC, giọng Azure).
**Đã đưa vào code (2026-11-08):** `src/dauTruong/mc.js` (lời đã sửa theo luật mới ở thiet-ke.md mục 5: lượt cá nhân, lượt chung bấm chuông, Tăng tốc 4 câu tư duy, Về đích chọn gói + Ngôi sao hy vọng), đọc bằng giọng trình duyệt `src/dauTruong/mcVoice.js`; sửa lời thì sửa ở đó trước.
Khuôn giống `SCRIPT` của 🎤 Ai tài năng nhất (`src/thanDong/quiz/mc.js`): mỗi **tình huống** một danh sách câu, máy chủ rút một câu
theo hạt của bước (mọi máy nghe cùng câu, cùng người nói). Khi làm code, phần 4 chép thẳng vào `src/dauTruong/mc.js`.

---

## 1. Hai MC

| | **Anh Minh** (`mc: 0`) | **Chị Mai** (`mc: 1`) |
|---|---|---|
| Giọng | `vi-VN-NamMinhNeural` | `vi-VN-HoaiMyNeural` |
| Tính cách | Sôi nổi, hay reo, thích số liệu ("chỉ 4,2 giây!") | Dịu, ân cần, hay hỏi han khán phòng, giải thích chậm rãi |
| Dẫn | Mở màn, câu **Toán**, Về đích (chọn mức, thẻ ×2, chuông), trao giải | Sảnh chờ, Vòng Chọn, câu **Tiếng Việt**, chuyển vòng, khán phòng, lời giải thích |
| Gọi nhau | "chị Mai" | "anh Minh" |

> Ai tài năng nhất đã có **Thầy Minh**. Nếu sợ các em lẫn, đổi MC nam thành **anh Khang** (giọng vẫn NamMinh): chỉ sửa chữ trong phần 4.

## 2. Nguyên tắc viết lời

1. **Ngắn khi đang thi**: lời trong lúc hỏi / lật ≤ 20 chữ (≈ 5 giây). Lời dài chỉ ở Mở màn, đầu vòng, trao giải.
2. **Không chê.** Sai thì "chưa đúng", "tiếc quá", rồi khen sự cố gắng hoặc chuyển sang lời giải. Không nói "sai rồi", "kém", "thua".
3. **Gọi tên** thí sinh bằng tên gọi (chữ cuối họ tên, `callName`). Khán giả gọi chung "các bạn khán phòng".
4. **Không "nhé"**, không gạch ngang dài; câu kết bằng `.` hoặc `!` (quy định chung của game trong app).
5. **Việc xảy ra sau lời** (thiet-ke §8): câu có dấu `→` ở phần 4 là câu mốc, đọc xong máy chủ mới làm việc ghi sau mũi tên
   (đồng hồ chạy, bạn đứng dậy đi lên, mở chuông…). Lời lỡ thời điểm thì bỏ, không đọc muộn.
6. **MC im khi các bạn đang nghĩ.** Không nhắc "còn năm giây"; đồng hồ đỏ và tiếng tích tắc làm việc ấy.
7. **Trao lời** khi đổi người nói: người đang nói gọi người kia ("Mời chị Mai!"), người kia có thể đáp một câu ngắn ("Cảm ơn anh Minh!").
   Câu đáp là tuỳ chọn, máy chủ bỏ khi bước đang chậm hơn lịch.
8. Mỗi tình huống ≥ 2 câu để nghe không lặp; câu chỉ khác chỗ trống hữu hạn được bung ra lúc tạo mp3.

## 3. Chỗ trống

| Chỗ | Loại | Giá trị | Ghi chú |
|---|---|---|---|
| `{tenCT}` | cố định | `SHOW_NAME` | Bung lúc tạo mp3; đổi tên chương trình thì chạy lại tts-data |
| `{lop}` | hữu hạn | một … năm | |
| `{so}` | hữu hạn | một … mười hai | số câu trong vòng |
| `{chu}` | hữu hạn | a, bê, xê, đê | đọc theo tên tiếng Việt như mc.js |
| `{mon}` | hữu hạn | Toán, Tiếng Việt | |
| `{mau}` `{mau2}` | hữu hạn | đỏ, cam, xanh lá, xanh dương | màu bục |
| `{thu}` | hữu hạn | thứ nhất, thứ hai, thứ ba, thứ tư | |
| `{soBan}` | hữu hạn | một … bốn | số thí sinh đúng |
| `{giayHan}` | hữu hạn | mười hai, mười lăm, hai mươi, ba mươi | giới hạn giờ của câu |
| `{muc}` / `{diemMuc}` / `{diemX2}` | hữu hạn | Dễ / Vừa / Khó · mười / hai mươi / ba mươi · hai mươi / bốn mươi / sáu mươi | Về đích |
| `{phut}` | hữu hạn | một, hai, ba, năm, mười, mười lăm | sảnh chờ |
| `{ten}` `{ten2}` `{ten3}` | tự do | tên gọi | đọc trực tiếp, không lưu R2 |
| `{diem}` | tự do | 0 … 999 | |
| `{giay}` | tự do | "4,2" | thời gian chốt, đọc "bốn phẩy hai" |
| `{phanTram}` | tự do | 0 … 100 | |
| `{gio}` | tự do | "bảy giờ tối thứ Bảy" | lượt tiếp theo trong lịch |

Câu có chỗ tự do: đọc trực tiếp (`live`), máy chủ chỉ nhận câu khớp khuôn (`liveOk`), như mc.js.

---

## 4. Lời theo từng bước

Ký hiệu người nói: `0` anh Minh, `1` chị Mai, `mon` = MC của môn câu đang hỏi (Toán → 0, Tiếng Việt → 1), `khac` = người còn lại.

### 4.1 Sảnh chờ (−15:00 → 0:00)

```js
lobbyHi: [1,                       // người đầu tiên vào phòng, rồi mỗi 3 phút một lần nếu có người mới
  'Chào các bạn lớp {lop}! Chương trình sắp bắt đầu, các bạn chọn một chỗ ngồi thật đẹp nào!',
  'Chị Mai chào các bạn! Mời các bạn ngồi vào ghế, chúng ta sắp bắt đầu rồi.',
],
lobbyWant: [1,
  'Bạn nào muốn lên bục thi thì nhớ bật nút Em muốn lên bục.',
  'Muốn thử sức trên bục thi? Hãy bật nút Em muốn lên bục ở dưới màn hình!',
],
lobbyWarm: [0,                     // trước mỗi câu làm nóng (không điểm)
  'Trong lúc chờ, mình làm nóng một chút. Câu này không tính điểm đâu!',
  'Một câu khởi động cho tỉnh táo nào, không tính điểm!',
],
lobbyCount: [1,                    // còn {phut} phút
  'Còn {phut} phút nữa là chúng ta bắt đầu!',
  'Chỉ còn {phut} phút thôi. Các bạn đã sẵn sàng chưa?',
],
```

### 4.2 Mở màn (0:00 → 2:00), đọc theo thứ tự

```js
openHi: [0,
  'Xin chào các bạn học sinh lớp {lop} thân mến! Chào mừng các bạn đến với {tenCT}!',
  'Xin chào cả khán phòng! Chào mừng các bạn lớp {lop} đến với {tenCT}!',
],
openMe0: [0,
  'Mình là anh Minh. Hôm nay mình sẽ cùng các bạn chinh phục những câu hỏi Toán.',
  'Mình là anh Minh, và những con số hôm nay đang chờ các bạn đấy!',
],
openMe1: [1,
  'Còn mình là chị Mai, người bạn đồng hành của các bạn ở những câu hỏi Tiếng Việt.',
  'Và mình là chị Mai. Mình sẽ mang đến những câu hỏi Tiếng Việt thật thú vị!',
],
openPlan: [1,
  'Hôm nay có ba vòng thi: Khởi động, Tăng tốc và Về đích. Bốn bạn giỏi nhất ở Vòng Chọn sẽ lên bục thi.',
],
openAud: [0,
  'Các bạn ngồi ở khán phòng cũng trả lời mọi câu hỏi trên máy của mình. Cuối chương trình, ba bạn khán giả xuất sắc nhất sẽ được gọi tên!',
  'Không ai ngồi chơi không đâu! Khán phòng cũng trả lời từng câu và có bảng điểm riêng.',
],
openGo: [1,  // → vào Vòng Chọn
  'Nào, chúng ta bắt đầu với Vòng Chọn!',
  'Và bây giờ, Vòng Chọn bắt đầu!',
],
```

### 4.3 Vòng Chọn (8 câu, cả phòng)

```js
selRule: [1,
  'Vòng Chọn có tám câu, mỗi câu {giayHan} giây. Bốn bạn đúng nhiều nhất và nhanh nhất sẽ được mời lên bục.',
],
selIntro: [1, 'Câu số {so} của Vòng Chọn.', 'Câu số {so}.'],
selLast:  [1, 'Câu cuối cùng của Vòng Chọn!', 'Câu số tám, câu quyết định ai lên bục!'],
selPct:   [1,                      // sau khi lật
  '{phanTram} phần trăm các bạn đã trả lời đúng!',
  'Có {phanTram} phần trăm khán phòng chọn đúng. Giỏi lắm!',
],
selFew:   [1,                      // dưới 30% đúng
  'Câu này khá khó, chỉ một số bạn trả lời đúng thôi.',
  'Câu này làm khó nhiều bạn đấy. Cùng nhớ lời giải nào.',
],
selDone:  [1, 'Vòng Chọn đã kết thúc. Bốn bạn nào sẽ lên bục đây?', 'Xong Vòng Chọn rồi! Cùng xem bốn gương mặt sáng giá nhất.'],
```

Câu hỏi đọc như ở 4.5 (`ask`, `go`, `answer`).

### 4.4 Mời lên bục (7:00 → 9:00)

```js
invite: [0,  // → bạn ấy đứng dậy đi lên bục; đọc lần lượt bục đỏ, cam, xanh lá, xanh dương
  'Bạn {thu}, {ten}! Xin mời bạn lên bục màu {mau}.',
  '{ten}, xin mời bạn lên bục màu {mau}!',
  'Và bạn tiếp theo là {ten}! Mời bạn lên bục màu {mau}.',
],
inviteBot: [0,                     // bục trống do bạn máy lấp (thiet-ke §4)
  'Bục màu {mau} hôm nay có bạn {ten} của chương trình cùng thi với các bạn.',
],
inviteClap: [1,  // → khán phòng vỗ tay
  'Cả khán phòng cho bốn bạn một tràng pháo tay thật lớn nào!',
  'Một tràng pháo tay chào đón bốn thí sinh của chúng ta!',
],
inviteCheer: [1,
  'Bốn bạn đã sẵn sàng. Chúc các bạn thật bình tĩnh và tự tin!',
  'Thi hết mình, vui hết mình nào!',
],
```

### 4.5 Khởi động (12 câu, 15 giây; lớp 1–2: 20 giây)

```js
kdIntro: [1, 'Vòng thứ nhất, Khởi động!', 'Chúng ta bước vào vòng Khởi động!'],
kdRule:  [0,
  'Mười hai câu hỏi, mỗi câu {giayHan} giây. Trả lời đúng được mười điểm, sai không bị trừ.',
],
// vào câu (người nói = mon)
ask:     ['mon', 'Câu số {so}, môn {mon}.', 'Câu số {so}.'],
kdLast:  ['mon', 'Câu số mười hai, câu cuối của vòng Khởi động!'],
// đổi môn: người vừa nói trao lời, người kia đáp (đáp là tuỳ chọn)
toTV:    [0, 'Câu tiếp theo là Tiếng Việt. Mời chị Mai!', 'Đến lượt chị Mai với một câu Tiếng Việt.'],
toToan:  [1, 'Câu tiếp theo là Toán, mời anh Minh!', 'Anh Minh ơi, câu Toán của anh đây!'],
thank0:  [0, 'Cảm ơn chị Mai!', 'Có ngay!'],
thank1:  [1, 'Cảm ơn anh Minh!', 'Vâng ạ!'],
// sau khi đọc câu và phương án
go:      ['mon',  // → đồng hồ chạy
  'Thời gian bắt đầu!', 'Các bạn bắt đầu!', 'Mời các bạn trả lời!',
],
allLock: ['mon', 'Cả bốn bạn đã chốt đáp án!', 'Nhanh quá, bốn bạn đều đã chốt!'],
timeUp:  ['mon', 'Hết giờ!', 'Thời gian đã hết!'],
// lật
answer:    ['mon', 'Đáp án đúng là {chu}.', 'Và đáp án đúng là {chu}!'],   // dạng abcd
answerShow:['mon', 'Và đây là đáp án đúng.', 'Cùng xem đáp án đúng nào!'],  // ds, cmp, multi, order, pair, slot, tap
all4:      ['mon', 'Cả bốn bạn đều đúng! Giỏi quá!', 'Bốn bạn, bốn câu trả lời chính xác!'],
someRight: ['mon', '{soBan} bạn trả lời đúng, mỗi bạn được cộng mười điểm!', 'Có {soBan} bạn chọn đúng. Mười điểm cho các bạn ấy!'],
oneRight:  ['mon', 'Chỉ có {ten} trả lời đúng. Mười điểm cho {ten}!', 'Xuất sắc {ten}, bạn là người duy nhất trả lời đúng!'],
noneRight: ['mon', 'Câu này hơi khó, chưa bạn nào trả lời đúng. Cùng nghe lời giải nào.', 'Tiếc quá, câu này chưa ai chinh phục được.'],
explain:   [1, '{ex}'],             // lời giải thích của câu, luôn do chị Mai đọc (câu hỏi Toán: anh Minh nhường lời: 'Chị Mai giải thích giúp các bạn nào!')
explainAsk:[0, 'Chị Mai giải thích giúp các bạn nào!', 'Chị Mai ơi, vì sao lại như vậy?'],
audGreen:  [1,                      // thỉnh thoảng (1 câu trong 3), sau khi lật
  'Ở khán phòng, những ghế sáng xanh là các bạn đã trả lời đúng!',
  'Khán phòng có {phanTram} phần trăm các bạn trả lời đúng. Tuyệt vời!',
],
kdEnd:  [0,
  'Vòng Khởi động đã khép lại. {ten} đang dẫn đầu với {diem} điểm!',
  'Hết vòng Khởi động! Người dẫn đầu lúc này là {ten}, {diem} điểm.',
],
kdEndTie: [0, '{ten} và {ten2} đang cùng dẫn đầu! Cuộc đua còn rất hấp dẫn.'],
```

### 4.6 Khán phòng giữa giờ (17:00 → 19:00)

```js
midHi:    [1, 'Bây giờ là phút dành riêng cho khán phòng!', 'Khán phòng ơi, đến lượt các bạn rồi!'],
midTop:   [1, 'Bạn {ten} đang đứng đầu khán phòng với {diem} điểm!', 'Dẫn đầu khán phòng lúc này là {ten}, {diem} điểm. Ai sẽ vượt lên đây?'],
flash:    [1,  // → câu chớp nhoáng bắt đầu
  'Câu chớp nhoáng! Sẵn sàng chưa nào?', 'Một câu chớp nhoáng nữa đây!',
],
midBack:  [1, 'Cảm ơn các bạn khán phòng. Bốn thí sinh ơi, vòng Tăng tốc đang chờ!'],
```

### 4.7 Tăng tốc (8 câu, 30 giây, nhanh hơn nhiều điểm hơn)

```js
ttIntro: [1, 'Vòng thứ hai, Tăng tốc!', 'Chuẩn bị nào, vòng Tăng tốc đã tới!'],
ttRule:  [0,
  'Tám câu hỏi, mỗi câu ba mươi giây. Đúng và nhanh nhất được bốn mươi điểm, rồi ba mươi, hai mươi, mười điểm.',
],
ttRule2: [1, 'Câu nào cũng có cách làm riêng, chúng mình sẽ nói trước mỗi câu.'],
// gợi ý cách làm, đọc thay cho từng thẻ (dùng ở mọi vòng khi câu không phải abcd)
kindOrder: ['mon', 'Hãy chạm các thẻ theo đúng thứ tự.', 'Xếp các thẻ cho đúng thứ tự nào!'],
kindPair:  ['mon', 'Hãy ghép mỗi ô bên trái với một ô bên phải.', 'Chạm một ô bên trái, rồi chạm ô hợp với nó bên phải.'],
kindMulti: ['mon', 'Câu này có thể có nhiều đáp án đúng. Chọn xong nhớ bấm Chốt!'],
kindSlot:  ['mon', 'Chạm vào thẻ để điền vào chỗ trống.', 'Chọn thẻ đúng đặt vào ô trống.'],
kindTap:   ['mon', 'Hãy chạm thẳng vào đáp án trên màn hình.'],
kindDs:    ['mon', 'Đúng hay sai?'],
kindCmp:   ['mon', 'Lớn hơn, bé hơn hay bằng?'],
// lật
ttTimes:   ['mon', 'Cùng xem thời gian của bốn bạn!', 'Ai nhanh nhất đây?'],
ttFast:    [0,                     // luôn anh Minh: thích số liệu
  'Nhanh nhất là {ten}, chỉ {giay} giây! Bốn mươi điểm!',
  'Wow, {ten} chỉ cần {giay} giây. Bốn mươi điểm cho {ten}!',
],
ttNone:    ['mon', 'Câu này chưa bạn nào làm đúng. Cùng xem lời giải.'],
ttHalf:    [1, 'Chúng ta đã đi được nửa chặng Tăng tốc!'],
ttEnd:     [0, 'Kết thúc vòng Tăng tốc! {ten} đang dẫn đầu với {diem} điểm.', 'Tăng tốc đã xong! Bảng điểm đang rất sát nhau.'],
```

### 4.8 Giải lao (28:00 → 30:00)

```js
breakHi:  [1, 'Bốn bạn thí sinh nghỉ một chút nào. Khán phòng ơi, ba câu chớp nhoáng đang tới!'],
banter:   [                          // một cặp đối đáp mỗi lượt, cho hai MC "sống"; đọc 2 câu liền nhau
  [[1, 'Anh Minh ơi, vòng vừa rồi anh thấy câu nào khó nhất?'], [0, 'Câu sắp xếp đấy chị Mai! Nhưng các bạn lớp {lop} làm nhanh lắm.']],
  [[0, 'Chị Mai này, các bạn hôm nay trả lời nhanh quá!'],       [1, 'Đúng vậy, chắc các bạn ôn bài kỹ lắm đây!']],
  [[1, 'Anh Minh có hồi hộp không?'],                            [0, 'Có chứ! Vòng Về đích sắp tới mới là hồi hộp nhất.']],
],
breakEnd: [1, 'Hết giờ giải lao! Bốn thí sinh ơi, mời các bạn trở lại bục.'],
```

### 4.9 Về đích (từng bạn, 3 câu tự chọn mức)

```js
vdIntro: [0, 'Và đây là vòng quyết định, Về đích!', 'Vòng cuối cùng, Về đích!'],
vdRule:  [1, 'Mỗi bạn ba câu, tự chọn độ khó: Dễ mười điểm, Vừa hai mươi điểm, Khó ba mươi điểm.'],
vdRule2: [0, 'Mỗi bạn có một thẻ Nhân đôi. Đúng được gấp đôi điểm, nhưng sai sẽ bị trừ. Hãy dùng thật khéo!'],
vdRule3: [1, 'Nếu bạn đang thi chưa trả lời đúng, ba bạn còn lại được bấm chuông giành quyền.'],
vdOrder: [0, 'Bạn có ít điểm nhất sẽ đi trước, để có cơ hội đuổi kịp.'],
// lượt của một bạn
vdTurn:  [0,  // → đèn rọi bục ấy
  'Mời {ten} bắt đầu phần thi Về đích!',
  'Đến lượt {ten}, bạn đang có {diem} điểm.',
],
vdPick:  [0, '{ten} chọn câu mức nào?', 'Câu tiếp theo, {ten} chọn mức nào đây?'],
vdPicked:[0, 'Câu mức {muc}, {diemMuc} điểm!'],
vdHard:  [0, 'Câu Khó, ba mươi điểm! Thật dũng cảm!'],
x2Remind:[1, 'Đây là câu cuối của bạn, thẻ Nhân đôi vẫn còn đấy.'],   // chỉ khi chưa dùng
x2Use:   [0, 'Thẻ Nhân đôi! Đúng được {diemX2} điểm, chưa đúng sẽ bị trừ {diemMuc} điểm.', 'Nhân đôi! {ten} rất tự tin.'],
// câu hỏi đọc như 4.5 (ask → go), rồi
vdRight: [0, 'Chính xác! {ten} được cộng {diemMuc} điểm.', 'Đúng rồi! Thêm {diemMuc} điểm cho {ten}!'],
vdRightX2:[0, 'Chính xác! Thẻ Nhân đôi phát huy, {ten} được {diemX2} điểm!'],
vdWrong: [0, 'Tiếc quá, chưa đúng rồi.', 'Chưa chính xác.'],
vdWrongX2:[0, 'Tiếc quá, lần này thẻ Nhân đôi chưa may mắn. {ten} bị trừ {diemMuc} điểm, nhưng vẫn còn cơ hội!'],
bellOpen:[0,  // → mở chuông 5 giây
  'Ba bạn còn lại, ai muốn giành quyền trả lời?', 'Chuông đã mở!',
],
bellHit: [0,  // → đồng hồ 10 giây
  '{ten2} bấm chuông nhanh nhất! Mời bạn trả lời.', 'Chuông màu {mau2}! Mời {ten2}.',
],
bellNone:[0, 'Không bạn nào bấm chuông. Đáp án đúng là {chu}.', 'Không ai bấm chuông. Cùng xem đáp án nào.'],
stealRight:[0, 'Chính xác! {ten2} giành được {diemMuc} điểm!', 'Giỏi lắm {ten2}, {diemMuc} điểm là của bạn!'],
stealWrong:[0, 'Chưa đúng, nhưng {ten2} không bị trừ điểm. Cảm ơn bạn đã dũng cảm!'],
vdDone:  [1, '{ten} đã hoàn thành phần thi Về đích với {diem} điểm. Cảm ơn bạn!', 'Một phần thi thật hay của {ten}! Bạn có {diem} điểm.'],
vdNext:  [1, 'Bạn tiếp theo, mời anh Minh!'],
```

### 4.10 Câu hỏi phụ (khi hòa hạng nhất)

```js
tie:     [0, '{ten} và {ten2} đang bằng điểm nhau ở vị trí cao nhất! Chúng ta cần một câu hỏi phụ.'],
tieRule: [1, 'Ai bấm chuông trước sẽ được trả lời. Chưa đúng thì quyền trả lời sang bạn kia.'],
tieTurn: [0, 'Quyền trả lời sang {ten2}!'],
```

### 4.11 Trao giải (42:00 → 45:00)

```js
awardOpen: [0, 'Và bây giờ là giây phút trao giải!', 'Đã đến lúc vinh danh rồi!'],
rank4:  [1, 'Vị trí thứ tư thuộc về {ten} với {diem} điểm. Bạn đã thi rất cố gắng!'],
rank3:  [1, 'Vị trí thứ ba là {ten} với {diem} điểm!'],
rank2:  [0, 'Vị trí thứ hai, {ten}, {diem} điểm!'],
champ:  [0,  // → bạn hạng nhất bước ra, pháo giấy
  'Và người chiến thắng của {tenCT} hôm nay là... {ten}!',
  'Xin chúc mừng nhà vô địch hôm nay, {ten}!',
],
champPts:[1, '{ten} đã giành được {diem} điểm. Cả khán phòng vỗ tay chúc mừng nào!'],
audBest: [1,  // → đèn ghế ba bạn sáng vàng
  'Ba bạn khán giả xuất sắc nhất hôm nay là {ten}, {ten2} và {ten3}! Ghế của các bạn đang sáng vàng đấy.',
],
stars:   [0, 'Sao thưởng đã được gửi vào sổ sao của các bạn.', 'Các bạn nhớ xem sổ sao, phần thưởng đã ở trong đó rồi!'],
thanks:  [1, 'Cảm ơn bốn bạn thí sinh và tất cả các bạn khán phòng. Hôm nay ai cũng học thêm được điều hay!'],
next:    [0, 'Hẹn gặp lại các bạn lúc {gio}!', 'Lượt tiếp theo là {gio}. Nhớ rủ bạn bè cùng vào!'],
nextNone:[0, 'Hẹn gặp lại các bạn ở lượt sau!'],
bye0:    [0, 'Anh Minh xin chào và hẹn gặp lại!'],
bye1:    [1, 'Chị Mai cũng xin tạm biệt các bạn!'],
```

### 4.12 Tình huống phát sinh

```js
lost:     ['khac', '{ten} đang kết nối lại. Chúng ta chờ bạn ấy một chút.'],
backOn:   ['khac', '{ten} đã trở lại! Tiếp tục nào.'],
swapIn:   [1, '{ten2} sẽ thay {ten} ở bục màu {mau}, giữ nguyên số điểm. Cố lên {ten2}!'],
noLock:   ['mon', 'Chưa bạn nào kịp chốt đáp án.'],
fewPeople:[1, 'Hôm nay khán phòng hơi vắng. Các bạn nhớ rủ thêm bạn bè vào lượt sau!'],
```

---

## 5. Dòng chảy: bước nào đọc gì

| Bước máy chủ | Lời (theo thứ tự) | Ai |
|---|---|---|
| `lobby` | `lobbyHi` · `lobbyWant` · (mỗi câu) `lobbyWarm` · `lobbyCount` lúc 10, 5, 1 phút | 1, 0 |
| `open` | `openHi` → `openMe0` → `openMe1` → `openPlan` → `openAud` → `openGo` | 0 0 1 1 0 1 |
| `sel` ×8 | `selRule` (câu 1) · `selIntro`/`selLast` → câu → `go` → `timeUp` → `answer` → `selPct`/`selFew` · `selDone` | 1 + mon |
| `invite` | `invite` ×4 (hoặc `inviteBot`) → `inviteClap` → `inviteCheer` | 0, 1 |
| `kd` ×12 | `kdIntro` → `kdRule` · mỗi câu: [`toTV`/`toToan` → `thank`] → `ask` → (`kind*`) → câu → `go` → `allLock`/`timeUp` → `answer` → `all4`/`someRight`/`oneRight`/`noneRight` → [`explainAsk`] `explain` → (`audGreen`) · `kdEnd` | |
| `mid` | `midHi` → `midTop` → `flash` ×2 → `midBack` | 1 |
| `tt` ×8 | `ttIntro` → `ttRule` → `ttRule2` · mỗi câu như `kd` + `kind*` bắt buộc, lật bằng `ttTimes` → `ttFast` · `ttHalf` (câu 4) · `ttEnd` | |
| `break` | `breakHi` → một cặp `banter` → `flash` ×3 → `breakEnd` | 1, 0 |
| `vd` | `vdIntro` → `vdRule` → `vdRule2` → `vdRule3` → `vdOrder` · mỗi bạn: `vdTurn` → (×3: `vdPick` → `vdPicked`/`vdHard` → [`x2Remind`] [`x2Use`] → câu → `go` → `vdRight*`/`vdWrong*` → [`bellOpen` → `bellHit`/`bellNone` → `steal*`] → `explain`) → `vdDone` → `vdNext` | |
| `tie` | `tie` → `tieRule` → câu → `tieTurn`? | 0, 1 |
| `award` | `awardOpen` → `rank4` → `rank3` → `rank2` → `champ` → `champPts` → `audBest` → `stars` → `thanks` → `next` → `bye0` → `bye1` | |

Câu đặt trong `[…]` là tuỳ chọn: bỏ khi bước đã trễ so với `STEP_A` tối đa.

---

## 6. Đọc thử: Mở màn + một câu Khởi động (lớp 3)

> **Anh Minh:** Xin chào các bạn học sinh lớp ba thân mến! Chào mừng các bạn đến với Đấu Trường Nhí!
> **Anh Minh:** Mình là anh Minh. Hôm nay mình sẽ cùng các bạn chinh phục những câu hỏi Toán.
> **Chị Mai:** Còn mình là chị Mai, người bạn đồng hành của các bạn ở những câu hỏi Tiếng Việt.
> **Chị Mai:** Hôm nay có ba vòng thi: Khởi động, Tăng tốc và Về đích. Bốn bạn giỏi nhất ở Vòng Chọn sẽ lên bục thi.
> **Anh Minh:** Không ai ngồi chơi không đâu! Khán phòng cũng trả lời từng câu và có bảng điểm riêng.
> **Chị Mai:** Nào, chúng ta bắt đầu với Vòng Chọn!
>
> *(…Vòng Chọn, mời lên bục, vào Khởi động…)*
>
> **Anh Minh:** Câu tiếp theo là Tiếng Việt. Mời chị Mai!
> **Chị Mai:** Cảm ơn anh Minh! Câu số bốn, môn Tiếng Việt.
> **Chị Mai:** Từ nào trái nghĩa với "chăm chỉ"? A, siêng năng. Bê, lười biếng. Xê, cần cù. Đê, chịu khó.
> **Chị Mai:** Thời gian bắt đầu! *(đồng hồ chạy, MC im)*
> **Chị Mai:** Nhanh quá, bốn bạn đều đã chốt!
> **Chị Mai:** Và đáp án đúng là bê! Có ba bạn chọn đúng. Mười điểm cho các bạn ấy!
> **Chị Mai:** Lười biếng là trái nghĩa của chăm chỉ, còn siêng năng, cần cù, chịu khó là những từ cùng nghĩa.
> **Chị Mai:** Ở khán phòng, những ghế sáng xanh là các bạn đã trả lời đúng!

## 7. Đọc thử: một lượt Về đích

> **Anh Minh:** Đến lượt Linh, bạn đang có một trăm mười điểm.
> **Anh Minh:** Linh chọn câu mức nào? *(Linh chạm Khó)* Câu Khó, ba mươi điểm! Thật dũng cảm!
> **Anh Minh:** Thẻ Nhân đôi! Đúng được sáu mươi điểm, chưa đúng sẽ bị trừ ba mươi điểm.
> **Anh Minh:** Câu số một. *(đọc câu)* Thời gian bắt đầu!
> **Anh Minh:** Tiếc quá, lần này thẻ Nhân đôi chưa may mắn. Linh bị trừ ba mươi điểm, nhưng vẫn còn cơ hội!
> **Anh Minh:** Ba bạn còn lại, ai muốn giành quyền trả lời? *(chuông mở 5 giây)*
> **Anh Minh:** Chuông màu xanh lá! Mời Khoa. *(10 giây)*
> **Anh Minh:** Giỏi lắm Khoa, ba mươi điểm là của bạn!
> **Anh Minh:** Chị Mai giải thích giúp các bạn nào!
> **Chị Mai:** *(lời giải)*

---

## 8. Khi làm code

- `src/dauTruong/mc.js`: `SCRIPT[key] = { mc, lines }` (mc là 0, 1, `'mon'`, `'khac'`), dùng lại `mcLine`, `mcFixed`, `liveOk`,
  `speakLetters`, `callName` của `src/thanDong/quiz/mc.js` (tách phần chung ra `src/shared/mcScript.js` để hai chương trình cùng dùng).
- Máy chủ chọn câu bằng hạt `seed(lượt, bước, câu)` để mọi máy cùng câu; gửi trong tin `A` khoá tình huống + chỉ số câu + biến, máy
  khách tự ghép chữ và đọc.
- `banter` là cặp: chọn một cặp, đọc hai câu liền, người nói theo từng câu.
- `scripts/tts-data.mjs` bung mọi câu cố định cho **cả hai giọng** (mỗi câu chỉ một giọng theo `mc`; câu `'mon'` / `'khac'` tạo cả hai).
- Kiểm: không câu nào có "nhé" hay "—", mỗi tình huống ≥ 1 câu đọc được khi thiếu tên (câu không có `{ten}`), câu trong lúc thi ≤ 20 chữ.
