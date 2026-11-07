# Kịch bản âm thanh (SFX), Đấu Trường Nhí (tên tạm)

Đi kèm [thiet-ke.md](thiet-ke.md) §9 (hiệu ứng theo trạng thái) và [kich-ban-mc.md](kich-ban-mc.md) (lời MC, dòng chảy §5).
Tiếng là file ElevenLabs trong kho chung với 🎤 Ai tài năng nhất (mục 2); tiếng mới tạo bằng MCP `elevenlabs-mcp` (`text_to_sound_effects`).
Giọng MC là Azure, không làm ở đây.

---

## 1. Nguyên tắc

1. **Của riêng mình.** Không bắt chước nhạc hiệu, tiếng chuông, tiếng đồng hồ của chương trình truyền hình thật nào. Prompt chỉ tả
   cảm giác (bright, kids, game show) và nhạc cụ, **không** nhắc tên chương trình hay bài nhạc.
2. **Trẻ nghe dễ chịu.** Không tiếng còi hú, không tiếng nổ trầm mạnh, không tiếng "buzzer" chói khi sai. Tiếng sai là nốt đi xuống nhẹ.
3. **Lời MC luôn rõ.** Khi MC nói, mọi tiếng nền tự hạ (ducking) −10 dB, trong 0,2 giây; nói xong lên lại trong 0,6 giây.
   Tiếng ngắn (chốt, ting) không bị hạ.
4. **Âm thanh báo trước, MC nói sau.** Mỗi mốc lớn: tiếng hiệu → khoảng lặng 0,3–0,5 giây → MC nói. Không để tiếng hiệu đè lên câu đầu của MC.
5. **Dùng lại kho của Ai tài năng nhất** (mục 2); chỉ tạo tiếng mới khi kho không có tiếng hợp vai.
6. Mỗi tiếng có **một vai**: nghe tiếng là biết chuyện gì xảy ra, kể cả khi không nhìn màn hình.

---

## 2. Danh sách tiếng: dùng chung kho của Ai tài năng nhất

Ai tài năng nhất đã có **46 tiếng gameshow** tạo bằng ElevenLabs (`src/thanDong/SFX/<nhóm>/*.mp3`, prompt gốc ở
`E:\ManC\kinh-thanh\docs\QuizSfx.md`), phát qua `src/thanDong/church/quizSfx.js`. Hai chương trình cùng một trường quay, cùng
kiểu gameshow, cùng lứa tuổi, nên Đấu Trường Nhí **dùng lại kho này**: 32 vai trong kịch bản chỉ cần **3 tiếng mới**.
Lớp nối: `src/dauTruong/arenaSfx.js` (đã gắn vào bản mẫu 3D, chạy thử từng vòng là nghe).

Cột "Vai" là tên dùng ở mục 3, 4 bên dưới; cột "File" là tiếng thật được phát.

### 2.1 Nền (lặp)

| Vai | File trong kho | `arenaSfx` | Ghi chú |
|---|---|---|---|
| `ar-lobby-loop`, `ar-break-loop` | **`lobby-loop` (mới)** | `lobby()` | Một bản cho cả sảnh, giải lao, giữa giờ. Chưa có file thì chỉ còn khán phòng rì rầm |
| `ar-crowd-loop` | `crowd-murmur` | `lobby()` | |
| `ar-think-kd` | `think-bed-easy` | `go('khoidong')` | |
| `ar-think-tt` | `poll-bed` | `go('tangtoc')`, `hurry()` | Nhạc dồn dập của bình chọn khán giả; phát nhanh dần 1,0 → 1,15 theo đồng hồ |
| `ar-think-vd` | `think-bed-easy` / `-mid` / `-hard` | `go('vedich', mức)` | Theo mức thí sinh chọn: Dễ / Vừa / Khó |

### 2.2 Mốc lớn

| Vai | File | `arenaSfx` |
|---|---|---|
| `ar-intro-rise` + `ar-intro-hit` + `ar-theme` | `show-intro` (14 s: trống dồn → kèn, tự lùi dưới lời MC) + `applause-rhythmic` nhỏ | `intro()` |
| `ar-round-sel` | `welcome-sting` | `round('sel')` |
| `ar-round-kd` | `q-sting-easy` | `round('khoidong')` |
| `ar-round-tt` | `q-sting-mid` | `round('tangtoc')` |
| `ar-round-vd` | `q-sting-final` | `round('vedich')` |
| `ar-podium` | `player-walkup` + `lights-sweep` (đi lên), `relative-spotlight` (tới bục) | `walkup()`, `podium()` |

### 2.3 Trong một câu

| Vai | File | `arenaSfx` |
|---|---|---|
| `ar-q-open` | `q-box-open` | `open()` |
| `swish` (phương án bật lên) | `option-pop`, cao dần A → D | `option(i)` |
| `ar-go` | `poll-start` | `go()` |
| `tick` | tích tắc tổng hợp của quizSfx | `tick(urgent)` |
| `ar-lock` | `lock-in` (phát nhanh 1,2 cho gọn) | `lock()` |
| `ar-timeup` | `time-up` | `stop(true)` |
| `ar-drumroll` | `suspense-drumroll` | `drum(giây)` |
| `correct` | `right` + `applause-short` | `result(true)` |
| `ar-aww` | `wrong-crowd-aww` | `result(false)` |
| `wrong` (máy mình, rất nhỏ) | `wrong` | `mine(false)` |
| `ar-ting` | `option-pop` rate 1,0 / 1,12 / 1,25 / 1,4 | `ting(k)` |
| `ar-points` | **`score-tally` (mới)**; chưa có thì 5 tiếng `option-pop` cao dần | `points()` |
| `ar-applause-s` / `-l` | `applause-short` / `crowd-cheer` + vỗ tay dài của `win()` | |

### 2.4 Về đích

| Vai | File | `arenaSfx` |
|---|---|---|
| `ar-spot` | `hotseat-sit` (tiếng trầm, đèn hạ) | `spot()` |
| `ar-level` | `ui-confirm` rate 1,0 / 1,1 / 1,2 | `level(n)` |
| `ar-x2` | `help-use` | `double()` |
| `ar-bell` | **`pod-bell` (mới)**, 4 cao độ; chưa có thì `option-pop` trầm | `bell(i)` |
| `ar-bell-open` | bốn chuông lướt từ thấp lên cao | `bellOpen()` |
| `ar-minus` | `lights-down` | `minus()` |

### 2.5 Trao giải, sự cố

| Vai | File | `arenaSfx` |
|---|---|---|
| `ar-rank` | `welcome-sting` + `applause-short` | `rank()` |
| `ar-champ` + `confetti` + `ar-applause-l` | `win` + `confetti-burst` + `crowd-cheer` + vỗ tay dài | `champ()` |
| `ar-seat-gold` | `help-use` | `seatGold()` |
| `ar-outro` | `show-outro` | `outro()` |
| `ar-lost` / `ar-back` | `ui-deny` / `relative-spotlight` | `lost()`, `back()` |

### 2.6 Ba tiếng mới (tạo bằng ElevenLabs)

Đặt vào kho chung `src/thanDong/SFX/<nhóm>/`, nên **Ai tài năng nhất dùng được luôn**.

| File | Nhóm | Dài | Prompt | Ai tài năng nhất dùng vào |
|---|---|---|---|---|
| `lobby-loop.mp3` | `mo-man` | 20 s, lặp | `Calm cheerful waiting music for a kids TV studio, soft marimba and light synth pads, gentle pulse, warm, no drums, seamless loop` | Lúc chờ đủ người (`waitMore`), nền rất nhỏ dưới `crowd-murmur` |
| `score-tally.mp3` | `ket-qua` | 1,5 s | `Coins counting up quickly, light arcade score tally ticks, cheerful, short` | Sao bay vào sổ sao, thang sao leo bậc |
| `pod-bell.mp3` | `chot-dap-an` | 1 s | `Clear bright tabletop buzzer bell, single strike, friendly, short decay, no harsh buzz` | (chưa cần) |

### 2.7 Khi nào nên tạo tiếng riêng

- **Nhạc hiệu riêng** (`arena-theme`): hai chương trình đang dùng chung `show-intro`. Khi chốt tên chính thức, tạo một nhạc hiệu
  12–14 s riêng cho Đấu Trường Nhí để hai chương trình nghe khác nhau ngay từ giây đầu (prompt gợi ý: `Original upbeat theme jingle for a
  kids knowledge game show, bright brass, bells and pop drums, confident and joyful, clear ending`). Đổi một dòng trong `intro()`.
- Nghe thử trên bản mẫu; vai nào nghe chưa hợp (ví dụ `q-sting-mid` hơi nghiêm cho Tăng tốc) thì mới tạo tiếng riêng cho vai ấy.

---

## 3. Màn intro (Mở màn 0:00 → 2:00) theo từng giây

Giờ tính từ lúc máy chủ chuyển bước `lobby → open`. MC chỉ nói khi tiếng hiệu đã tắt hoặc đã hạ nền.

| Thời điểm | Âm thanh | Hình | MC |
|---|---|---|---|
| −0:10 | `ar-lobby-loop` hạ dần về 0 trong 3 s; `ar-crowd-loop` lên to hơn một chút | Đèn khán phòng mờ dần | |
| 0:00 | Lặng 0,8 s | Tối toàn sân khấu | |
| 0:00,8 | `ar-intro-rise` (3 s) | Viền LED sân khấu sáng chạy vòng | |
| 0:03,8 | `ar-intro-hit` | Logo bay vào màn LED, tường lục giác bừng sáng | |
| 0:04 | `ar-theme` (12 s) bắt đầu; `ar-crowd-loop` tắt | Đèn quét quét khán phòng theo nhịp | |
| 0:06 | `ar-applause-l` nhỏ (−12 dB) trộn dưới nhạc | | |
| 0:16 | Nhạc hiệu kết; vỗ tay còn đuôi | Hai MC giơ tay chào, đèn rọi hai MC | |
| 0:16,5 | `ar-break-loop` rất nhỏ làm nền (−24 dB) cho phần chào | | `openHi` (anh Minh) |
| | | MC đang nói sáng | `openMe0`, `openMe1`, `openPlan`, `openAud` |
| cuối | nền tắt 1 s | | `openGo` (chị Mai): "Nào, chúng ta bắt đầu với Vòng Chọn!" |
| +0,4 s | `ar-round-sel` | Tên "Vòng Chọn" phóng to trên màn | |

Máy giảm chuyển động vẫn phát đủ tiếng, chỉ hình đổi sang bản êm.

---

## 4. Các tình huống

Ký hiệu: `→` nối tiếp, `‖` cùng lúc, `(MC: key)` là lời trong kich-ban-mc.md.

### 4.1 Sảnh chờ
- Vào phòng: `ar-lobby-loop` (−18 dB) ‖ `ar-crowd-loop` (−26 dB).
- Bạn chọn ghế: `pop` (chỉ máy bạn ấy).
- Câu làm nóng: `ar-q-open` → (MC: lobbyWarm) → `ar-go` → lật `correct` nhỏ. Không tiếng sai.
- Còn 1 phút: nhạc chờ nhỏ dần trong 60 s.

### 4.2 Vào vòng (Khởi động, Tăng tốc, Về đích, Vòng Chọn)
`ar-round-xx` ‖ màu vòng tràn ra tường → lặng 0,4 s → (MC: xxIntro, xxRule). Nền suy nghĩ của vòng **chưa** chạy cho tới câu đầu.

### 4.3 Một câu (mọi vòng)
1. `ar-q-open` → (MC: ask) → mỗi phương án bật lên: `swish` (rate 1,0 / 1,05 / 1,1 / 1,15 theo thứ tự).
2. (MC: go "Thời gian bắt đầu!") → `ar-go` ‖ nền suy nghĩ của vòng lên trong 0,5 s.
3. Mỗi bạn chốt: `ar-lock` (máy nào cũng nghe; bục ấy viền trắng).
4. 5 giây cuối: `tick` mỗi giây, giây cuối `rate` 1,2.
5. Đủ 4 bạn chốt: nền tắt ngay → (MC: allLock). Hết giờ: nền tắt → `ar-timeup` → (MC: timeUp).
6. Lật: `ar-drumroll` 1,5 s → ô đúng xanh ‖ `correct` (nếu ≥ 1 bạn đúng) hoặc `ar-aww` nhỏ (không ai đúng).
7. Điểm bay lên bục: `ar-points`; có bạn đúng thì `ar-applause-s` (−6 dB).
8. Trên máy khán giả: chọn đúng `correct` nhỏ, ghế sáng xanh; chọn sai `wrong` rất nhỏ (−12 dB), chỉ máy mình.
9. (MC: answer, …, explain) không có nền.

### 4.4 Tăng tốc, lật
Nền tắt → (MC: ttTimes) → 4 thanh bay vào theo thứ tự chốt: mỗi thanh `ar-ting` cao dần; thanh sai phát `ar-ting` rate 0,8, nhỏ.
→ `ar-points` cho các bạn đúng → (MC: ttFast).

### 4.5 Khán phòng giữa giờ, giải lao
`ar-break-loop` (−18 dB) suốt bước. Câu chớp nhoáng: `ar-round-sel` (thay cho `ar-q-open`) → `ar-go` → lật `correct` → `ar-points` trên máy những bạn đúng.
Cặp `banter` của hai MC: nền hạ như thường.

### 4.6 Về đích
- Đến lượt một bạn: `ar-spot` ‖ đèn rọi bục ấy → (MC: vdTurn, vdPick).
- Chạm mức: `ar-level` (cao dần theo mức); mức Khó thêm `ar-applause-s` (−10 dB).
- Thẻ Nhân đôi: `ar-x2` ‖ chữ ×2 vàng bay lên → (MC: x2Use).
- Câu hỏi: như 4.3, nền `ar-think-vd`.
- Đúng: `correct` → `ar-points` → `ar-applause-s`. Đúng có ×2: thêm `ar-x2` rate 1,2 trước `ar-points`.
- Chưa đúng: nền tắt, lặng 0,5 s → (MC: vdWrong). Có ×2: `ar-minus` khi điểm giảm.
- Giành quyền: (MC: bellOpen) → `ar-bell-open` → 5 s nền `ar-think-vd` rate 1,15 → bạn bấm: `ar-bell` theo cao độ của bục ấy, nền tắt ngay → (MC: bellHit) → `ar-go` → 10 s. Không ai bấm: `ar-timeup` → (MC: bellNone).

### 4.7 Câu hỏi phụ
`ar-round-sel` → câu → `ar-bell-open` ngay lúc đọc xong → chuông như 4.6.

### 4.8 Trao giải
1. `ar-intro-hit` → (MC: awardOpen).
2. Hạng 4, 3, 2: `ar-rank` → (MC: rankN) → `ar-applause-s`.
3. `ar-drumroll` dài (lặp 2 lần, 3 s) → (MC: champ, đọc tới "là...") → `ar-champ` ‖ `confetti` ‖ `ar-applause-l`.
4. `ar-theme` (−8 dB) chạy nền khi bạn hạng nhất bước ra.
5. (MC: audBest) → `ar-seat-gold` ‖ ba ghế sáng vàng.
6. Sao vào sổ: `ar-points` trên máy từng bạn có sao.
7. (MC: bye0, bye1) → `ar-outro` → `ar-lobby-loop` lên lại nhỏ.

### 4.9 Sự cố
- Thí sinh mất kết nối: `ar-lost` một lần (−10 dB), không lặp.
- Bạn trở lại hoặc dự bị lên: `ar-podium` → (MC: backOn / swapIn).
- Không ai chốt: `ar-timeup` → (MC: noLock).

---

## 5. Mức âm lượng (so với lời MC = 0 dB)

| Nhóm | Mức | Ghi chú |
|---|---|---|
| Lời MC | 0 dB | |
| Stinger vào vòng, nhạc hiệu, chiến thắng | −4 dB | MC không nói đè |
| correct, chuông, x2 | −6 dB | |
| Click, swish, ting, tick | −10 dB | |
| Nền suy nghĩ | −14 dB, khi MC nói −24 dB | |
| Nền sảnh, giải lao | −18 dB | |
| Tiếng khán phòng xôn xao | −26 dB | |

## 6. Tạo và đưa vào app

1. Tạo 3 tiếng ở mục 2.6 bằng MCP, mỗi tiếng 2 bản vào `docs/sfx/dautruong/`; chủ dự án nghe, chọn bản dùng.
2. Xử lý như đợt sfx trước: cắt lặng đầu cuối, mono, cân âm lượng với các file cùng nhóm, MP3 96k; `lobby-loop` nối mượt (crossfade như `car-loop`).
3. Chép bản đã chọn vào `src/thanDong/SFX/<nhóm>/`: quizSfx tự nhận (glob), `arenaSfx` thôi dùng tiếng thay. `docs/sfx/dautruong/` không commit.
4. Thử: chạy bản mẫu (🎮 Challenge games, thẻ chỉ admin thấy), chọn từng vòng ở nút trên phải; `node scripts/.tmp/dt-sfx.mjs` in ra file nào phát lúc nào.
