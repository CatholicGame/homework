# Prompt ElevenLabs cho tiếng động của app

Tất cả file trong `src/assets/sfx` (phát qua `engine/sfx.js`). Tạo lại từng tiếng theo bảng dưới,
lưu bản gốc `.wav` vào `docs/sfx/`, đặt đúng tên file.

## Đã xong, không cần tạo lại

`pop`, `tap`, `tick`: cắt từ bản gốc trong `docs/sfx/*.wav` (giữ một tiếng, bỏ đuôi, hạ mức to theo bảng),
lưu `src/assets/sfx/*.wav` mono. Bản gốc từng bị: `pop` to sát ngưỡng méo, `tap` có hai tiếng gõ,
`tick` có tiếng rè phía sau. Khi tạo các tiếng khác cũng tránh đúng những lỗi đó.

`zap`: cắt ở 0,46 s (bỏ tiếng lách tách thừa ở 0,5 s), hạ dải trên 5 kHz tới −6 dB cho bớt chói, mono, đỉnh −16 dB.

`ocean-loop`: mono 16 kHz (gần như không có âm trên 1,5 kHz), bỏ ầm dưới 70 Hz, 2 s cuối hoà vào 2 s đầu cho lặp liền (còn 18,2 s), đỉnh −18 dB, code phát vol 0,6.
`shark-in`: cắt ở 0,45 s, mono, đỉnh −22 dB (phát 6 lần mỗi đàn).
`shark-near`: cắt ở 0,72 s, hai nốt 123 / 138 Hz quá trầm cho loa máy tính bảng nên thêm quãng tám trên (chỉnh lưu |x| lọc 180–2500 Hz, trộn 0,9), mono, đỉnh −18 dB.
`chomp` (file `shark-chomp`): bản gốc có 3 cú đớp, giữ cú đầu (0–0,22 s), mono, đỉnh −14 dB.

## Cài đặt chung trên ElevenLabs (Sound Effects)

| Mục | Giá trị |
|---|---|
| Duration | đặt tay theo cột "Dài" (không để Auto) |
| Prompt influence | 0,7 (bám sát prompt) |
| Loop | chỉ bật cho `car-loop` |
| Xuất | WAV 48 kHz |
| Mỗi tiếng | tạo 4 bản, nghe trên loa điện thoại/iPad, chọn bản êm nhất |

**Câu đuôi dán vào cuối mọi prompt:**

> soft and gentle sound for a toddler learning app, warm and rounded tone, no harsh high frequencies, single clean sound, dry with no reverb, no music, no voice, no background noise, silence at the end

ElevenLabs cho ngắn nhất 0,5 giây. Tiếng ngắn hơn thì chọn 0,5 giây, mình sẽ cắt phần im lặng phía sau.

## Bảng tiếng

Mức to là đỉnh âm (peak) sau khi mình chuẩn hoá. Bạn không cần chỉnh, chỉ cần tiếng không bị méo.

| File | Dùng ở đâu | Dài | Mức to | Prompt (ghép thêm câu đuôi) |
|---|---|---|---|---|
| `tap` | chạm nút, chọn bút, bỏ chọn | 0,1 s | −18 dB | a single very soft muted wooden tap, like a fingertip tapping a small wooden block once |
| `pop` | **đếm từng đồ vật, chọn số, điền số vào ô** (phát liên tục, có đổi cao độ) | 0,15 s | −16 dB | a single soft low bubble pop, round and mellow, like a small soap bubble popping gently, medium-low pitch |
| `tick` | thước, kim đồng hồ xoay từng nấc | 0,05 s | −22 dB | a single tiny soft click, like a quiet plastic ratchet notch, very short |
| `step` | con kiến bò trên cạnh hình (Đo chu vi) | 0,1 s | −22 dB | a single tiny soft footstep, like a little cartoon ant tiptoeing once on paper |
| `piece` | xong một đoạn, tìm đúng thêm một hình | 0,3 s | −16 dB | two quick soft marimba notes going up, gentle and happy, a small "found it" sound |
| `correct` | trả lời đúng | 0,6 s | −14 dB | a short cheerful chime, three soft rising marimba and glockenspiel notes, warm and happy, a gentle "well done" |
| `wrong` | trả lời sai | 0,4 s | −16 dB | a short soft friendly "boing", a low cartoon spring wobble going down, playful and not scary, not a buzzer |
| `swish` | tô xong một nét, đồ vật bay đi | 0,3 s | −20 dB | a short soft airy swish, like a light paper card sliding quickly through the air |
| `bump` | hai đường kéo dài cắt nhau "BỐP" | 0,3 s | −14 dB | a soft cartoon bonk, a muffled wooden knock with a small rubbery bounce, funny and gentle |
| `complete` | xong cả lượt / cả bài | 1,5 s | −12 dB | a short joyful completion jingle, five rising xylophone notes ending with a sparkling chime, celebratory but soft |
| `whoosh-long` | hai đường song song chạy mãi | 1,5 s | −20 dB | a long gentle wind whoosh passing smoothly from near to far, soft and airy, fading out slowly |
| `confetti` | trúng sticker trên vòng quay | 2 s | −14 dB | a soft party popper burst followed by light paper confetti falling and a few twinkling sparkles, cheerful |
| `wheel-spin` | vòng quay sticker đang quay | 3,5 s | −18 dB | a prize wheel spinning with soft plastic clicks, starting fast and slowing down gradually until it stops |
| `car-loop` | bé kéo xe tô số (lặp liên tục) | 3 s, Loop bật | −24 dB | a tiny toy car engine humming softly at a steady speed, cute and low, seamless loop, no start or stop |
| `zap` | 🦈 Săn cá mập: thợ lặn bắn súng điện trúng cá (tia sét vàng hiện 0,3 s) | 0,4 s | −16 dB | **Không ghép câu đuôi chung**, dùng nguyên prompt ở mục "Tiếng zap" bên dưới |
| `ocean-loop` | 🦈 Săn cá mập: nền dưới biển suốt lượt chơi (lặp liên tục) | 20 s, Loop bật | −28 dB | **Không ghép câu đuôi chung**, dùng nguyên prompt ở mục "Nền đại dương" bên dưới |
| `shark-in` | 🦈 một con cá mập xuất hiện ở mép biển (6 lần mỗi đàn) | 0,5 s | −22 dB | xem mục "Tiếng cá mập" |
| `shark-near` | 🦈 cá mập bơi gần tới thợ lặn (còn ít giây, cá đổi màu) | 1 s | −18 dB | xem mục "Tiếng cá mập" |
| `chomp` | 🦈 cá mập đớp thợ lặn, mất một mạng (thay tiếng `wrong`) | 0,5 s | −14 dB | xem mục "Tiếng cá mập" |

## Lưu ý riêng

- **pop** quan trọng nhất: app phát nó mỗi lần bé chạm đếm, và đẩy cao dần theo số đếm. Vì vậy bản gốc phải **trầm và tròn**. Bản nào nghe sắc hoặc cao thì bỏ.
- **tap, tick, step** phải là đúng **một** tiếng. Bản nào có hai tiếng gõ hoặc có đuôi thì bỏ.
- **wrong** không được giống còi báo lỗi; bé 4–5 tuổi nghe phải thấy buồn cười chứ không sợ.
- **car-loop** nghe thử chỗ nối: chạy hết file rồi quay lại đầu không được có tiếng "cộp".
- **correct, complete** không dùng kèn, trống hay tiếng vỗ tay (app còn đọc lời khen ngay sau đó).

## Tiếng zap (súng điện, trò Săn cá mập)

Trò dành cho lớp 1–5 nên tiếng được phép giòn và "điện" hơn các tiếng khác, nhưng vẫn là đồ chơi hoạt hình,
không giống điện giật thật. Bé trả lời nhanh thì tiếng này phát liên tục nhiều lần, nên phải ngắn và gọn.

Duration 0,5 s, Prompt influence 0,7, tạo 4 bản:

> a short cartoon electric zap from a toy laser stun gun: a quick crackling electric buzz with a few sparkling snaps, starting with a sharp bright "bzzt" and ending with a tiny fizzle, playful arcade video game sound, energetic but not painful or scary, mid-range tone without piercing high hiss, single clean sound, dry with no reverb, no music, no voice, no explosion, no screaming, silence at the end

Chọn bản:
- tiếng "bzzt" nằm trong 0,3 s đầu, khớp với tia sét; bản nào kéo dài rè rè quá 0,4 s thì bỏ.
- không có tiếng xì cao chói tai (nghe trên loa iPad thấy nhói tai là bỏ).
- không có tiếng nổ trầm "bùm" ở cuối, vì ngay sau đó cá hoá bộ xương đã có tiếng `pop`.

## Nền đại dương (ocean-loop, trò Săn cá mập)

Phát nhỏ suốt lượt chơi, nằm dưới giọng đọc của Chú Hải, tiếng súng điện và tiếng cá đớp. Vì vậy phải đều,
êm, không có tiếng nào nổi bật lên làm bé tưởng có chuyện xảy ra.

Duration 20 s, **Loop bật**, Prompt influence 0,6, tạo 4 bản:

> calm underwater ocean ambience heard from below the surface, a soft deep muffled water hum with slow gentle swaying currents, small clusters of tiny bubbles rising now and then, light soft bubble pops and gurgles spread evenly through the whole clip, peaceful and relaxing like a children's aquarium, steady level from start to end, seamless loop, no waves crashing, no whale or dolphin calls, no boat engine, no scuba breathing, no music, no voice, no sudden loud bubble burst

Chọn bản:
- nghe chỗ nối: chạy hết file rồi quay lại đầu không được có tiếng "cộp" hay đổi mức to.
- bọt nước rải đều cả 20 giây, không dồn một chỗ; không có tràng bọt to bất ngờ (nghe như cá bị bắn trúng).
- tiếng nền trầm, không rè, không có tiếng xì như máy lọc bể cá.

## Tiếng cá mập (shark-in, shark-near, chomp)

Hoạt hình, vui, không đáng sợ: bé lớp 1 cũng chơi. Không ghép câu đuôi chung, Prompt influence 0,7, mỗi tiếng 4 bản.
Không dùng nhạc phim cá mập nổi tiếng (bản quyền), chỉ là tiếng động.

**shark-in** (0,5 s): phát 6 lần mỗi đàn, nên phải nhỏ và nhẹ.

> a short soft underwater swoosh of a cartoon fish swimming in quickly, a gentle muffled water whoosh with two or three tiny bubbles, light and playful, single clean sound, dry with no reverb, no music, no voice, silence at the end

**shark-near** (1 s): báo "sắp bị đớp", để bé tính nhanh lên.

> a short playful cartoon warning sound underwater, two low plucked bass notes repeating quickly getting a little closer, like a funny sneaky fish approaching in a children's cartoon, tense but cute and not scary, muffled underwater tone, single clean sound, dry with no reverb, no melody, no voice, no siren, no alarm beep, silence at the end

**chomp** (0,5 s): cá đớp thợ lặn.

> a single cartoon chomp, a big rubbery jaw snapping shut with a soft wet underwater gulp, funny and bouncy like a toy shark bite in a children's cartoon, not violent, no crunching bones, no screaming, single clean sound, dry with no reverb, no music, no voice, silence at the end

Chọn bản:
- `shark-in` không có tiếng nước bắn to (nghe như sóng vỗ), phát 6 lần liền không thấy ồn.
- `shark-near` phải nghe ra "sắp tới rồi" nhưng bé không giật mình; bản giống còi báo động thì bỏ.
- `chomp` đúng **một** cú đớp; bản nào nghe như cắn xương, có máu me thì bỏ.

## Sau khi tạo xong

Bỏ các file `.wav` vào `docs/sfx/`, đúng tên như bảng, rồi báo mình. Mình sẽ cắt im lặng, chuẩn hoá
mức to theo cột "Mức to", nén sang `src/assets/sfx` và bỏ phần giảm âm lượng tạm cho `pop` trong code.

## 🛸 Bảo vệ Trái Đất (trò Zíp Zắp, `grade3Drills/ufo.js`)

Trò cho lớp 1–5, nhịp nhanh kiểu máy chơi điện tử, nên tiếng được phép "điện tử" hơn các tiếng của sách,
nhưng vẫn là **đồ chơi hoạt hình**: bọn Zíp Zắp dễ thương, tàu bị bắn chỉ vỡ khiên rồi bay về, không nổ, không chết.
Không ghép câu đuôi chung; mỗi tiếng dùng nguyên prompt ở dưới, Prompt influence 0,7, tạo 4 bản.
Đặt tên file đúng cột "File" (tên trong code ở cột "Tên"). Chưa có file thì game tự phát tiếng tổng hợp thay thế.

| File | Tên | Dùng ở đâu | Dài | Mức to |
|---|---|---|---|---|
| `space-loop` | `spaceLoop` | **nhạc nền** suốt lượt (lặp liên tục), tự nhỏ lại khi Bíp nói | 30 s, Loop bật | −14 dB |
| `ufo-in` | `ufoIn` | một đĩa bay xuất hiện ở mép trời (5–6 lần mỗi đợt) | 0,6 s | −22 dB |
| `ufo-near` | `ufoNear` | đĩa bay sắp chạm vòm khiên (ổ khoá chuyển cam) | 1 s | −18 dB |
| `ufo-load` | `ufoLoad` | chạm nút đạn: viên pha lê bay vào pháo, khớp vào ổ nạp | 0,3 s | −18 dB |
| `laser` | `laser` | pháo bắn tia sáng (mỗi phát, đúng hay sai) | 0,4 s | −16 dB |
| `shield-break` | `shieldBreak` | bắn đúng: khiên bong bóng của tàu vỡ (cả vòng khiên tàu mẹ) | 0,8 s | −14 dB |
| `deflect` | `deflect` | bắn sai: đạn bật khỏi khiên (thay `wrong`); ngay sau đó tàu bắn trả (`alienShot` = `laser` phát chậm 0,7) | 0,5 s | −16 dB |
| `ufo-away` | `ufoAway` | tàu vỡ khiên quay tít bay ngược về vũ trụ | 1,2 s | −20 dB |
| `number-home` | `numberHome` | con số bị cướp bay về, ô cửa sổ sáng đèn lại | 0,5 s | −18 dB |
| `dome-hit` | `domeHit` | vòm khiên trúng một phát (quả cầu bắn trả hoặc tàu lọt xuống), nứt thêm, mất một vạch; vòm vỡ hẳn dùng `shield-break` phát chậm 0,55 (`domeBreak`) | 0,7 s | −14 dB |
| `radar-alarm` | `radarAlarm` | rađa báo: tàu mẹ tới, đổi mật mã (lớp 4, 5) | 1 s | −18 dB |
| `mother-in` | `motherIn` | tàu mẹ từ từ hạ xuống | 2 s | −18 dB |
| `fireworks` | `fireworks` | thắng đợt: phố sáng đèn, pháo hoa | 2,5 s | −16 dB |

**Đã xử lý (2026-10-08)** từ `docs/sfx/zip zap/` sang `src/assets/sfx/`, mono 16-bit 48 kHz, đỉnh theo cột "Mức to",
vuốt đầu 2 ms, vuốt đuôi 12 %, cắt chỗ hết tiếng (đường bao dưới đỉnh − 42 dB) và giới hạn độ dài:
`ufo-in` 0,62 s, `ufo-near` 0,70 s, `ufo-load` 0,30 s, `laser` 0,40 s, `shield-break` 0,55 s, `deflect` 0,45 s,
`ufo-away` 1,10 s, `number-home` 0,65 s, `dome-hit` 0,55 s, `radar-alarm` 0,70 s, `mother-in` 2,05 s,
`fireworks` 1,35 s (file gốc tên `firework.wav`). Bản gốc nhiều file chạm 0 dB. Hạ dải cao cho bớt chói:
`ufo-load`, `number-home` trên 3,5 kHz −12 dB (vẫn là tiếng chuông cao, nghe thử trên iPad), `laser`, `fireworks`
trên 6 kHz −4 dB, `shield-break` trên 6 kHz −5 dB.

Tiếng dùng lại, không tạo mới: `tap` (bàn phím, chạm chọn tàu), `correct` / `wrong` (thẻ kết quả cuối đợt do vòng chơi chung phát),
`complete` (xong cả cấp). Giọng Rô-bốt Bíp là giọng đọc, không phải file tiếng.

**space-loop: nhạc nền** (định nghĩa lại 2026-10-08).

Bản đầu (tiếng ù vũ trụ, −28 dB) **quá nhỏ và không rõ**: gần như toàn âm trầm dưới 300 Hz mà loa iPad,
điện thoại không phát được, lại không có nhịp hay giai điệu nên nghe như tiếng ồn. Bản mới là **nhạc thật**:
nhịp vui, giai điệu ngắn dễ nhớ, âm sắc dồn ở dải giữa (300–4000 Hz) cho loa nhỏ nghe rõ.
Code phát ở âm lượng 0,5 và tự hạ còn 35 % trong lúc Rô-bốt Bíp đọc, nên nhạc được phép to và đầy.

Cách tạo (chọn một):
- **ElevenLabs Sound Effects**: Duration 30 s, **Loop bật**, Prompt influence 0,5. Ưu tiên cách này vì nối vòng liền.
- **ElevenLabs Music**: 30–45 s, cùng prompt. Nhạc hay hơn nhưng không tự lặp; mình sẽ cắt đúng số ô nhịp và hoà chỗ nối.

> upbeat cute space arcade background music loop for a kids math game, about 110 BPM, bright bouncy synth plucks playing a simple catchy repeating melody in a major key, round warm synth bass line, light soft drums with a gentle kick, soft snare and shaker, sparkly bell arpeggios on top, clear and present, mixed for small tablet speakers with most energy in the mid range, full and steady from start to end, playful adventure mood like friendly cartoon heroes defending a city at night from cute aliens, seamless loop, instrumental only, no vocals, no voice, no long intro, no fade in or fade out, no breakdown or silence, no laser or spaceship sound effects, no siren, no heavy sub bass, no distortion

Chọn bản (nghe trên loa iPad hoặc điện thoại, âm lượng khoảng 50 %):
- nghe **rõ giai điệu và nhịp** ngay từ giây đầu; bản nào nghe như tiếng ù, tiếng gió thì bỏ.
- năng lượng đều cả 30 giây: không có đoạn lặng, không có đoạn cao trào bất ngờ (bé tưởng có chuyện xảy ra).
- không có tiếng giống `laser`, `ufo-in` hay còi, để không lẫn với tiếng hiệu ứng của trò.
- chạy hết file rồi quay lại đầu không có tiếng "cộp", không lệch nhịp.
- nghe chung với giọng đọc 1 phút không thấy mệt tai.

**Đã xử lý (2026-10-08)**, bản gốc `docs/sfx/zip zap/space-loop.wav` (30 s, 110 BPM, hai kênh giống nhau):
gốc có 69 % năng lượng dưới 300 Hz (26 % dưới 60 Hz) và 50 ms cuối tắt dần (lặp sẽ hụt nhịp, có tiếng "tách").
Bản trong app: mono 22,05 kHz, lặp đúng **13 ô nhịp = 28,37 s** (điểm lặp chỉnh ±30 ms theo độ giống 1 s đầu),
hoà chỗ nối 0,4 s, bỏ dưới 80 Hz, hạ dưới 250 Hz 5 dB, nâng 1,5–4 kHz 4 dB (lọc vòng tròn để không có vết ở chỗ nối),
chỉnh theo độ to trung bình rms −20 dB, chặn đỉnh mềm ở −3 dB. Code phát âm lượng 0,45, hạ còn 35 % khi Bíp đọc.

**ufo-in** (0,6 s): phát nhiều lần mỗi đợt, nên nhỏ, nhẹ, vui.

> a short cute cartoon flying saucer arriving, a soft wobbly "woo-oo" synth warble sliding down in pitch with a gentle airy whoosh, toy UFO from a children's cartoon, playful and light, single clean sound, dry with no reverb, no music, no voice, silence at the end

**ufo-near** (1 s): báo "sắp chạm khiên" để bé bắn nhanh, nhưng không làm bé giật mình.

> a short playful cartoon warning from a little alien spaceship coming close, two quick soft wobbly synth beeps going "bee-boo" repeated twice, cute and sneaky, mid-low pitch, not an alarm siren, single clean sound, dry with no reverb, no melody, no voice, silence at the end

**ufo-load** (0,3 s): viên pha lê bay vào pháo.

> a short crisp crystal clink followed by a soft mechanical click, like a small glowing glass crystal snapping into a toy cannon slot, bright but gentle, single clean sound, dry with no reverb, no music, no voice, silence at the end

**laser** (0,4 s): phát mỗi phát bắn, có lúc liên tục, nên ngắn và gọn.

> a short soft cartoon laser shot, a smooth "pew" sliding quickly downward, light and bubbly like a toy ray gun in a children's arcade game, mid-range tone without piercing high hiss, single clean sound, dry with no reverb, no explosion, no music, no voice, silence at the end

**shield-break** (0,8 s): khiên bong bóng vỡ, đây là tiếng "thưởng" của mỗi phát đúng.

> a magical energy bubble shield shattering softly, a bright glassy crack followed by a cascade of tiny tinkling sparkles falling, satisfying and cheerful like breaking a crystal bubble in a cartoon, no explosion, no heavy glass smash, single clean sound, dry with no reverb, no music, no voice, silence at the end

**deflect** (0,5 s): đạn sai bật ra; buồn cười, không như còi báo lỗi.

> a short rubbery energy "bwong", a light cartoon ray bouncing off a wobbly force field bubble, a springy wobble going down in pitch, funny and harmless, not a buzzer, single clean sound, dry with no reverb, no music, no voice, silence at the end

**ufo-away** (1,2 s): tàu quay tít bay đi xa.

> a cartoon flying saucer spinning dizzily and zooming away into the sky, a wobbly whistling synth swirl rising in pitch and fading into the distance, funny and light like a defeated toy spaceship flying home, no explosion, single clean sound, dry with no reverb, no music, no voice, silence at the end

**number-home** (0,5 s): số về cửa sổ, đèn sáng.

> a short magical twinkle, two soft bright bell notes going up with a tiny sparkle shimmer, like a little light switching on in a cozy window, gentle and happy, single clean sound, dry with no reverb, no music, no voice, silence at the end

**dome-hit** (0,7 s): tàu chạm vòm khiên; báo mất một vạch nhưng không đáng sợ.

> a soft muffled energy thud on a big force field dome, a low rubbery "bwum" with a short shimmering electric wobble, like a toy ball bumping a bubble shield, noticeable but not scary, no explosion, no crash, single clean sound, dry with no reverb, no music, no voice, silence at the end

**radar-alarm** (1 s): rađa của Rô-bốt Bíp, đúng tên "Bíp".

> a cute robot radar alert, two pairs of soft two-tone electronic beeps "beep-boop, beep-boop" with a light sweeping radar ping, friendly and playful like a small cartoon robot, not a siren, single clean sound, dry with no reverb, no melody, no voice, silence at the end

**mother-in** (2 s): tàu mẹ to hạ xuống, "trùm cuối" nhưng dễ thương.

> a big cartoon mothership slowly descending, a deep soft warbling synth hum sliding down with gentle pulsing light blips, grand but cute and friendly like a giant toy UFO, not menacing, no bass rumble shaking, single clean sound, dry with no reverb, no music, no voice, silence at the end

**fireworks** (2,5 s): thắng đợt.

> soft distant festive fireworks over a city at night, three gentle muffled pops followed by sparkling crackles and twinkles fading out, cheerful and celebratory but soft, no loud bangs, no explosions close up, no crowd, no music, no voice, silence at the end

Chọn bản:
- `laser`, `ufo-load`, `ufo-in` phát rất nhiều lần: bản nào nghe 10 lần liền thấy chói hay mệt tai thì bỏ.
- `shield-break` phải nghe "sướng", không giống kính vỡ thật; `deflect` và `dome-hit` không được giống còi báo lỗi hay tiếng nổ.
- `space-loop` nghe chỗ nối (hết file quay lại đầu không có tiếng "cộp"), không có tiếng nào nổi lên giữa chừng làm bé tưởng có tàu tới.
- `radar-alarm` và `ufo-near` không được giống còi xe cứu thương, báo cháy.
