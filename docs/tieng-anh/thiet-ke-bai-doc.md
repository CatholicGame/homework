# 📖 Đọc tiếng Anh cùng Minh: thiết kế 100 bài đọc

Mục tiêu: mỗi bài là một đoạn đọc khoảng 100 từ (cấp 1 khoảng 80–100 từ), gắn với **một điểm ngữ pháp**, dùng để bé
**nghe, đọc, học từ vựng, trả lời câu hỏi, tự đặt câu hỏi, viết chính tả và viết lại câu**.
Ngữ pháp đi từ dễ đến khó, bài sau dùng lại những gì bài trước đã học.

Dữ liệu: `src/data/englishReading/level1.js` … `level5.js` (mỗi file 20 bài), gom ở `index.js`.
Kiểm tra: `node scripts/check-english-reading.mjs` (đếm từ, kiểm tra trường bắt buộc, câu chính tả phải có trong bài).

## 1. Nhân vật dùng chung (để các bài nối với nhau thành một câu chuyện)

| Nhân vật | Mô tả |
|---|---|
| **Minh** | cậu bé 8 tuổi, sống ở Hà Nội, thích bóng đá và vẽ |
| **Lan** | chị gái của Minh, 11 tuổi, thích đọc sách và nấu ăn |
| **Mum / Dad** | mẹ là giáo viên, bố là bác sĩ |
| **Grandma / Grandpa** | ông bà ở quê (Nam Định), có vườn và ao cá |
| **Tom** | bạn cùng lớp của Minh, đến từ Úc (Sydney), đang học tiếng Việt |
| **Ms Hoa** | cô giáo chủ nhiệm |
| **Lucky** | chú chó nâu của nhà Minh |
| **Kitty** | cô mèo trắng hay trốn |

Bối cảnh Việt Nam (Tết, Trung thu, phở, nem, Hạ Long, Hội An…) xen với chuyện của Tom ở Úc để bé gặp cả từ về văn hoá.
Bé lớn dần cùng nhân vật: cấp 1–2 Minh 8 tuổi, cấp 4–5 Minh đã lên lớp 6.

## 2. Năm cấp độ

| Cấp | Bài | Trình độ | Hợp với | Độ dài | Câu |
|---|---|---|---|---|---|
| 1 ⭐ Starter | 1–20 | Pre-A1 | lớp 1–3, mới học | 80–100 từ | câu đơn 4–8 từ, lặp mẫu |
| 2 ⭐⭐ Elementary 1 | 21–40 | A1 | lớp 3–4 | 90–110 từ | câu đơn, nối bằng and/but/because |
| 3 ⭐⭐⭐ Elementary 2 | 41–60 | A1+ / A2 | lớp 4–5 | 95–115 từ | quá khứ, tương lai, so sánh |
| 4 ⭐⭐⭐⭐ Pre-intermediate | 61–80 | A2 | lớp 5–6 | 100–120 từ | câu ghép, mệnh đề quan hệ |
| 5 ⭐⭐⭐⭐⭐ Intermediate | 81–100 | A2+ / B1 | lớp 6+ | 100–125 từ | bị động, câu điều kiện, tường thuật |

Từ vựng: mỗi bài 6–8 từ mới, ưu tiên từ trong danh sách Cambridge YLE (Starters → Movers → Flyers) và KET cho cấp 5.
Từ mới chỉ được dùng nếu đã học ở bài trước hoặc nằm trong danh sách từ mới của bài này (cấp 1–2 làm chặt, cấp 3–5 nới).

## 3. Cấu trúc một bài (8 phần)

| # | Phần | Bé làm gì | Dữ liệu |
|---|---|---|---|
| 1 | 🎧 **Nghe** | nghe cả bài (giọng đọc máy, chậm / thường), mỗi câu sáng lên khi đọc; sau đó trả lời 2 câu nghe không nhìn chữ | `text`, `questions[].listen = true` |
| 2 | 📖 **Đọc** | đọc to theo, chạm vào từ để xem nghĩa | `text`, `vocab` |
| 3 | 📚 **Từ vựng** | thẻ từ: hình (emoji), nghĩa, câu ví dụ; trò ghép từ – nghĩa | `vocab[]` |
| 4 | 📐 **Ngữ pháp** | đọc giải thích ngắn bằng tiếng Việt, xem mẫu câu, các câu trong bài có điểm ngữ pháp được tô màu | `grammar` |
| 5 | ❓ **Trả lời câu hỏi** | 5 câu: chọn đáp án, Đúng/Sai, trả lời ngắn | `questions[]` |
| 6 | 🙋 **Đặt câu hỏi** | cho câu trả lời, bé viết câu hỏi (có gợi ý từ để hỏi) | `makeQuestion[]` |
| 7 | 🎤 **Nói** | bấm mic, nói câu trả lời; máy nghe ra chữ và chấm theo từ khoá (§9) | `speak/level<n>.js` |
| 8 | ✍️ **Viết** | nghe – chép chính tả 3 câu trong bài; sắp xếp từ thành câu; viết lại câu theo ngữ pháp | `dictation[]`, `reorder[]`, `rewrite[]` |

Chấm điểm (khi làm app): so khớp không phân biệt hoa thường, bỏ dấu câu thừa, chấp nhận dạng rút gọn
(`he's` = `he is`, `don't` = `do not`); mỗi câu có thể có nhiều đáp án đúng (`accept`).

## 4. Định dạng dữ liệu

```js
{
  id: 'en-001', no: 1, level: 1,
  title: 'Hello, I Am Minh',
  topic: 'Giới thiệu bản thân',
  grammar: {
    point: 'Động từ to be: I am / he is / she is / it is',
    explainVi: 'Dùng "am" với I, "is" với he / she / it và một người, "are" với you / we / they.',
    pattern: 'I am + tên / tuổi.  He is + …',
    examples: ['I am Minh.', 'She is my sister.', 'It is a brown dog.'],
  },
  text: 'Hello! I am Minh. I am eight years old. …',   // ~100 từ, một đoạn hoặc vài đoạn ngăn bằng \n\n
  vocab: [
    { word: 'sister', vi: 'chị / em gái', emoji: '👧', example: 'Lan is my sister.' },
    …                                                 // 6–8 từ
  ],
  questions: [                                        // 5 câu
    { type: 'mc', q: 'How old is Minh?', options: ['seven', 'eight', 'eleven'], answer: 1, listen: true },
    { type: 'tf', q: 'Lucky is a cat.', answer: false, listen: true },
    { type: 'short', q: 'What is the name of his sister?', answer: 'Her name is Lan.', accept: ['Lan', 'It is Lan.'] },
  ],
  makeQuestion: [                                     // 2–3 câu: bé đặt câu hỏi cho câu trả lời
    { answer: 'I am eight years old.', question: 'How old are you?', hint: 'How old …?' },
  ],
  dictation: ['I am eight years old.', …],           // 3 câu, chép đúng nguyên văn trong text
  reorder: [{ words: ['is', 'Lan', 'my', 'sister'], answer: 'Lan is my sister.' }],   // 2 câu
  rewrite: [                                          // 2 câu viết lại theo ngữ pháp của bài
    { prompt: 'I am Minh. (He)', answer: 'He is Minh.', instructionVi: 'Viết lại câu, bắt đầu bằng từ trong ngoặc.' },
  ],
}
```

Quy ước:
- `questions`: luôn có 2 câu `listen: true` (dùng cho phần Nghe), phần còn lại pha `mc` / `tf` / `short`.
  Cấp 1–2 chủ yếu `mc` + `tf`; cấp 3–5 có ít nhất 2 câu `short`, cấp 4–5 có 1 câu hỏi suy luận ("Why …?", "How did … feel?").
- `dictation`: câu có trong `text` y nguyên (kể cả dấu câu), độ dài tăng theo cấp (cấp 1: 4–6 từ, cấp 5: 10–15 từ).
- `rewrite`: luôn luyện đúng điểm ngữ pháp của bài (đổi chủ ngữ, phủ định, câu hỏi, đổi thì, chủ động → bị động, nối câu…).
- Văn bản không dùng gạch ngang dài "—" (quy ước chung của app).

## 5. Danh sách 100 bài

### Cấp 1 ⭐ Starter (Pre-A1)

| # | Tên bài | Chủ đề | Ngữ pháp |
|---|---|---|---|
| 1 | Hello, I Am Minh | Giới thiệu bản thân | to be: I am / he is / she is |
| 2 | My Family | Gia đình | This is / These are |
| 3 | My Dog Lucky | Thú cưng, bộ phận cơ thể | have got / has got |
| 4 | Colours in My Room | Màu sắc, đồ vật | a / an; It is + tính từ màu |
| 5 | My School Bag | Đồ dùng học tập | danh từ số nhiều -s / -es; What is this? |
| 6 | Toys on the Floor | Số đếm 1–20, đồ chơi | How many …? There are + số |
| 7 | In the Kitchen | Nhà bếp | There is / There are |
| 8 | Where Is Kitty? | Vị trí | in / on / under / next to / behind |
| 9 | I Can Swim | Khả năng | can / can't |
| 10 | My Favourite Food | Đồ ăn | like / don't like |
| 11 | At the Zoo | Con vật | tính từ big / small / tall / long + be |
| 12 | Simon Says | Cơ thể, trò chơi | câu mệnh lệnh: Touch… / Don't… |
| 13 | Our Classroom | Lớp học | tính từ sở hữu my / your / his / her / our |
| 14 | What's the Weather Like? | Thời tiết | It's sunny / rainy …; What's the weather like? |
| 15 | My Week | Các ngày trong tuần | hiện tại đơn với I / we / they; on + thứ |
| 16 | Our House | Phòng trong nhà | Where is …? / Where are …? |
| 17 | What Are You Wearing? | Quần áo | hiện tại tiếp diễn: I am wearing … |
| 18 | At the Park | Hoạt động ngoài trời | hiện tại tiếp diễn: he / she is …ing |
| 19 | At the Fruit Market | Trái cây | I want … / some + danh từ |
| 20 | Happy Birthday, Lan! | Sinh nhật, tháng | When is …? số thứ tự, in + tháng |

### Cấp 2 ⭐⭐ Elementary 1 (A1)

| # | Tên bài | Chủ đề | Ngữ pháp |
|---|---|---|---|
| 21 | Minh's Morning | Thói quen buổi sáng | hiện tại đơn ngôi 3: gets up, brushes |
| 22 | Lan's Busy Week | Lịch trong tuần | trạng từ tần suất always / usually / sometimes / never |
| 23 | What Time Is It? | Giờ giấc | nói giờ; at + giờ |
| 24 | Tom from Australia | Quốc gia, quốc tịch | Where are you from? / Do you …? / Does he …? |
| 25 | A Day on the Farm | Nông trại của ông bà | phủ định don't / doesn't |
| 26 | A Busy Saturday | Cuối tuần | hiện tại đơn và hiện tại tiếp diễn |
| 27 | A Rainy Day Inside | Ở nhà ngày mưa | some / any |
| 28 | Making Spring Rolls | Nấu nem | danh từ đếm được / không đếm được; How many / How much |
| 29 | Jobs in My Town | Nghề nghiệp | What does he do? He is a / an … |
| 30 | In the Library | Nội quy | must / mustn't |
| 31 | Let's Play! | Rủ bạn chơi | Let's … / Shall we …? / Why don't we …? |
| 32 | Tet Holiday | Tết Nguyên đán | giới từ thời gian in / on / at |
| 33 | Sports Day | Ngày hội thể thao | đại từ tân ngữ me / him / her / us / them |
| 34 | Grandma's Garden | Vườn của bà | sở hữu cách 's |
| 35 | At the Pet Shop | Cửa hàng thú cưng | would like / want to |
| 36 | How Do You Go to School? | Phương tiện | by bus / on foot; How do you …? |
| 37 | My Best Friend | Tả người | tả ngoại hình: has got + tính từ; He is tall |
| 38 | My Hobbies | Sở thích | love / like / enjoy + V-ing |
| 39 | Four Seasons | Mùa trong năm | and / but / because / so |
| 40 | Whose Umbrella Is It? | Đồ thất lạc | Whose …? mine / yours / his / hers |

### Cấp 3 ⭐⭐⭐ Elementary 2 (A1+ / A2)

| # | Tên bài | Chủ đề | Ngữ pháp |
|---|---|---|---|
| 41 | Yesterday at School | Một ngày ở trường | quá khứ của to be: was / were |
| 42 | A Visit to Grandpa | Về quê | quá khứ đơn có quy tắc -ed |
| 43 | The Picnic | Dã ngoại | quá khứ đơn bất quy tắc went / ate / saw |
| 44 | Did You Have Fun? | Kể chuyện cuối tuần | Did …? / didn't |
| 45 | Plans for Ha Long Bay | Lên kế hoạch | be going to |
| 46 | The Science Fair | Hội thi khoa học | will / won't (dự đoán, hứa) |
| 47 | Bigger and Faster | So sánh con vật | so sánh hơn -er / more |
| 48 | The Tallest Tree | Kỷ lục thiên nhiên | so sánh nhất -est / most |
| 49 | At the Doctor's | Sức khoẻ | should / shouldn't |
| 50 | Chores at Home | Việc nhà | have to / don't have to |
| 51 | The Big Race | Cuộc đua | trạng từ cách thức quickly / slowly / well |
| 52 | Mid-Autumn Festival | Trung thu | kể chuyện quá khứ: first / then / after that / finally |
| 53 | Too Hot to Play | Mùa hè | too / enough |
| 54 | When Grandpa Was Young | Ngày xưa | could / couldn't (khả năng trong quá khứ) |
| 55 | The Lost Kitten | Tìm Kitty | mệnh đề when + quá khứ đơn |
| 56 | Saving Water | Tiết kiệm nước | động từ + to V: need to / try to / want to |
| 57 | New Shoes | Mua sắm | Which one? / one / ones; How much is / are …? |
| 58 | My Dream Job | Ước mơ nghề nghiệp | want to be … because … |
| 59 | The Robot Show | Triển lãm robot | there was / there were |
| 60 | The Mystery Box | Truyện ôn tập | ôn quá khứ + từ để hỏi Who / What / Where / Why |

### Cấp 4 ⭐⭐⭐⭐ Pre-intermediate (A2)

| # | Tên bài | Chủ đề | Ngữ pháp |
|---|---|---|---|
| 61 | Have You Ever Seen Snow? | Trải nghiệm | hiện tại hoàn thành: ever / never |
| 62 | Not Finished Yet | Chuẩn bị đi học | hiện tại hoàn thành: just / already / yet |
| 63 | Friends for Five Years | Tình bạn | hiện tại hoàn thành: since / for |
| 64 | The Power Cut | Mất điện | quá khứ tiếp diễn: was / were …ing |
| 65 | While We Were Sleeping | Bão đêm | quá khứ tiếp diễn + while / when |
| 66 | If It Rains Tomorrow | Kế hoạch dã ngoại | câu điều kiện loại 1 |
| 67 | The Girl Who Loved Stars | Thiên văn | mệnh đề quan hệ who / which / that |
| 68 | Grandpa Used to Fish | Làng quê xưa và nay | used to |
| 69 | How Paper Is Made | Quy trình làm giấy | bị động hiện tại đơn |
| 70 | Healthy Habits | Sống khoẻ | a lot of / a few / a little; danh động từ làm chủ ngữ |
| 71 | A Phone Call to Tom | Lời mời, đề nghị | Would you like …? / Could you …? / Can I …? |
| 72 | The Football Final | Trận chung kết | quá khứ đơn và hiện tại hoàn thành |
| 73 | The Recycling Club | Tái chế | may / might (khả năng) |
| 74 | Helping Our Neighbours | Giúp hàng xóm | động từ + to V và động từ + V-ing |
| 75 | The Treasure Map | Đọc bản đồ | giới từ chuyển động across / through / along / past |
| 76 | Saving the Sea Turtles | Động vật quý hiếm | so / because / so that |
| 77 | Safe on the Internet | An toàn trên mạng | must / have to / should (so sánh) |
| 78 | Boring or Bored? | Cảm xúc | tính từ -ed / -ing |
| 79 | Hoi An Lantern Night | Phố cổ Hội An | trật tự tính từ; very / quite / really |
| 80 | Camping Under the Stars | Truyện ôn tập | ôn các thì đã học |

### Cấp 5 ⭐⭐⭐⭐⭐ Intermediate (A2+ / B1)

| # | Tên bài | Chủ đề | Ngữ pháp |
|---|---|---|---|
| 81 | The Old Bridge | Cầu Long Biên | bị động quá khứ đơn |
| 82 | If I Were a Bird | Tưởng tượng | câu điều kiện loại 2 |
| 83 | What the Teacher Said | Lời cô dặn | câu tường thuật (câu kể) |
| 84 | She Asked Me Why | Phỏng vấn | câu tường thuật (câu hỏi) |
| 85 | I Have Been Practising | Luyện đàn | hiện tại hoàn thành tiếp diễn |
| 86 | The Village Where Mum Grew Up | Quê mẹ | mệnh đề quan hệ where / whose |
| 87 | It Must Be a Fox! | Bí ẩn trong vườn | must / might / can't (suy đoán) |
| 88 | I Wish I Could Fly | Điều ước | wish + quá khứ |
| 89 | Although It Was Raining | Vượt khó | although / despite / however |
| 90 | By the Time We Arrived | Lỡ chuyến tàu | quá khứ hoàn thành |
| 91 | This Time Tomorrow | Chuyến bay sang Úc | tương lai tiếp diễn |
| 92 | It's Beautiful, Isn't It? | Trò chuyện | câu hỏi đuôi |
| 93 | Could You Tell Me Where …? | Hỏi đường ở Sydney | câu hỏi gián tiếp |
| 94 | Getting My Bike Repaired | Sửa xe | have / get something done |
| 95 | Amazing Inventions | Phát minh | bị động với động từ khuyết thiếu: can be used |
| 96 | The Flood Hero | Truyện người tốt | các thì kể chuyện (quá khứ đơn / tiếp diễn / hoàn thành) |
| 97 | Unless You Water It | Thí nghiệm khoa học | câu điều kiện loại 0; unless |
| 98 | So Many Plastic Bags | Môi trường | so … that / such … that |
| 99 | Vote for Me! | Ứng cử lớp trưởng | từ nối firstly / moreover / however / in conclusion |
| 100 | A Letter to My Future Self | Thư gửi chính mình | ôn tổng hợp |

## 6. Bấm vào từ: IPA, nghĩa theo ngữ cảnh, nghe đọc

Bé bấm vào **bất kỳ từ nào** trong bài → từ được tô vàng, máy đọc to từ đó, bong bóng hiện:
- từ + phiên âm IPA (giọng Mỹ, kiểu Cambridge, khớp giọng đọc en-US của máy) + nút 🔊 nghe lại;
- **nghĩa tiếng Việt đúng với câu trong bài** (cùng một từ ở hai bài có thể ghi nghĩa khác nhau);
- dòng nhỏ: từ gốc và giải thích dạng từ (went → go, "quá khứ của go"; brushes → "thêm -es vì chủ ngữ là he / she");
- nếu từ nằm trong một cụm của bài (get up, lucky money, next to…), bong bóng ghi **nghĩa cả cụm** trước (các từ của cụm tô vàng nhạt), rồi đến nghĩa riêng của từ.
Tên riêng tiếng Việt (Minh, Lan, Hà Nội…) chỉ ghi chú thích, không đọc bằng giọng Anh.

Dữ liệu: `src/data/englishReading/gloss/levelN.js`, mỗi bài một mục:

```js
'en-021': {
  words: {   // mọi từ trong text, khoá chữ thường
    gets: { ipa: 'ɡets', vi: 'thức (dậy)', base: 'get', form: 'thêm -s vì chủ ngữ là he' },
    minh: { vi: 'Minh (tên bạn nam)', name: true },
  },
  phrases: { 'gets up': { ipa: 'ɡets ʌp', vi: 'thức dậy' } },
}
```

Mã: `src/engine/readingGloss.js` (`renderGlossText(el, lesson, gloss)`), tải bảng bằng `loadGloss(lesson)` trong `index.js`.
Xem thử: `scripts/english-reading-dev.html?id=en-021` (chạy `npm run dev`).
Từ viết giống mà đọc khác tuỳ nghĩa (read quá khứ /red/, used to /juːst/, live, close…) được ghi IPA theo từng bài,
kèm `say` là chữ đưa cho giọng máy đọc (`say: 'red'`, `say: 'used to'`) vì máy đọc một chữ "read" đứng riêng luôn thành /riːd/.

Kiểm tra: `node scripts/check-english-gloss.mjs` (đủ mọi từ, không khoá thừa, cụm có trong bài, ký hiệu IPA hợp lệ, cùng từ cùng IPA ở mọi bài).

## 7. Gợi ý làm app (sau khi duyệt nội dung)

- Thẻ `📖 Đọc tiếng Anh` trong hub, danh sách 5 cấp, mỗi bài có ⭐ theo số phần đã làm (star prefix `enread`).
- Giọng đọc: Azure TTS en-US / en-GB tạo sẵn file mp3 từng câu (giống kế hoạch giọng tiền tiểu học), dự phòng Web Speech.
- Chính tả: phát từng câu 2 lần (chậm rồi thường), bé gõ; tô đỏ chữ sai, cho xem lại câu đúng.
- Đặt câu hỏi: chấm theo `question` + `accept`; nếu sai chỉ ra từ để hỏi trong `hint`.
- Không chặn bài sau: bài nào cũng mở được, ghi "hợp với bé đã học bài …".

## 8. Truyện hoạt hình cho phần 🎧 Nghe (làm thử: bài 21)

Mục tiêu: bé **nhìn thấy** từng câu đang nghe để hiểu và nhớ lâu.
- **Mỗi câu một hành động:** "brushes his teeth" thì bàn chải chạy, bọt bay. Giọng đọc và hình diễn cùng lúc, xong cả hai mới sang câu sau.
- **Từ khoá ↔ hình:** cụm từ khoá của câu tô cam trong phụ đề và hiện thành một ô có hình trên dải truyện (14 ô cho 14 câu). Chạm ô nào thì diễn lại câu đó.
- **Nhớ theo đường đi:** cả truyện là một thế giới liền mạch (phòng tắm, phòng ngủ, bếp, hành lang, ra phố, tới trường). Nhân vật đi qua từng chỗ theo thứ tự câu chuyện, nên bé nhớ thứ tự bằng vị trí.
- **Gợi nhớ chủ động:** xem hết thì có trò "Xếp lại câu chuyện" (6 ô xáo trộn). Xếp đúng ô nào thì máy đọc lại cụm từ đó.
- **Luyện nghe thật:** bỏ chọn 👁 Hiện chữ thì phụ đề mờ đi; khung phụ đề vẫn giữ chỗ nên không có gì nhảy.

Kỹ thuật (để mượt, không giật):
- **Nhân vật "con rối":** `src/games/englishStory/rig.js` dùng lại nét vẽ Tiếng Việt 3 (`tiengViet3/cast.js`). Vai, khuỷu, hông, đầu là các khớp riêng. Tư thế đổi bằng transition; bước chân, đánh răng… là keyframes lặp.
- **Lớp và di chuyển:** thế giới và mỗi nhân vật là một lớp riêng, chỉ di chuyển bằng `transform` (Web Animations). Camera lia cả lớp thế giới. Hình vẽ lại đúng cỡ khi đổi khung, nên luôn nét.
- **Đi ngang = dáng nghiêng thật** (theo phim Kinh Thánh, `kinh-thanh/src/film/views.js`), không bao giờ đi ngang mà mặt nhìn ra màn hình:
  - đầu một mắt, sống mũi, tai, tóc phủ đỉnh và gáy (đuôi ngựa đung đưa);
  - tay gần đè lên thân, tay xa và chân xa tối màu hơn ở phía sau;
  - đùi xoay ở hông, cẳng chân gập ở gối;
  - đi sang trái thì lật cả hình (xoay mỏng dần 0,24 s). Tới nơi thì đổi về dáng nhìn trước để làm việc (đánh răng, vẫy tay…).
- **Nhịp bước = độ dài bước (trẻ em 30, người lớn 44 đơn vị) / tốc độ,** để chân không trượt. Tốc độ đi tự nhiên của trẻ em khoảng 120–140 đơn vị/giây.
- **Số đo trên Chromium:** trung vị 16,7 ms mỗi khung hình (60 khung/giây), 95% số khung không quá 16,8 ms. Chỉ có một khung dài 70–150 ms lúc dựng lại cảnh khi bấm xem hoặc chạm ô, trước khi chuyển động bắt đầu.
- **Giảm chuyển động** (prefers-reduced-motion): bước ngắn hơn, không nhún, nhưng vẫn diễn đủ mọi hành động.
- **Trạng thái trước câu k** = chạy nhanh (instant) các nhịp 0..k-1. Bấm Dừng hoặc chạm ô khác thì huỷ nhịp cũ (`Stage.view`), nên không điều khiển nhầm nhân vật.

**Thêm truyện cho bài khác:**
1. Viết `src/games/englishStory/stories/enNNN.js` gồm `bg()` / `fg()`, CSS các trạng thái `st-*`, `cast`, `init` và `beats` (mỗi câu một nhịp: `key`, `icon`, `label`, `play(st)`).
2. Không cần sửa `englishStory/index.js`: file `stories/enNNN.js` tự được nhận (import.meta.glob).
3. Dùng chung: cảnh trong `englishStory/kit.js` (trời, cỏ, cây, đường, phòng, cửa, bàn, bảng, trường, nhãn chữ… + `KIT_CSS`), nhân vật chung trong `rig.js` (Minh, Lan, Tom, Mum, Dad, Grandma, Grandpa, Ms Hoa, kèm bộ đồ ở nhà), chó Lucky (`kind: 'dog'`), mèo Kitty (`kind: 'cat'`), đồ vật / con vật riêng (`kind: 'thing'`, `svg` + `box`). Tư thế / đồ cầm riêng của truyện: `poses`, `props` trong truyện. Class CSS tự đặt luôn có tiền tố `eNNN-`.
   - Lệnh sân khấu thêm: `st.face(id, ±1)` quay mặt tại chỗ; `st.place(id, x, y?, face?)` đặt ngay tới chỗ khác; `st.walk(id, x, { y })` đi cả theo chiều cao (lên dốc, lên tầng). Đồ cầm (`hold`), đồ trước ngực (`chest`) và mũ hiện cả lúc đi nghiêng; tay cầm đồ giữ góc của tư thế lúc bắt đầu đi.
   - Nhân vật: mũ `police` / `chef` / `santa` / `sun`, tóc `curly`, `eyeC` (màu mắt), `thin`; nét mặt `sad`, `cry`; tư thế `sitDesk` (tay đặt bàn), `sitHold`. Ngồi chỉ hạ thân, bàn chân vẫn chạm sàn.
   - Chữ trên người / đồ cầm: class `es-unflip` để không bị lật khi quay trái. Kit: `thought()` bong bóng nghĩ, `speaker()` nhãn người nói, `night()` lớp đêm (hiện bằng class của truyện).
4. Xem thử: `scripts/english-reading-dev.html?app=1&id=en-021&part=listen&beat=4`. Chụp soát: `node scripts/story-shot.mjs en-021` (mỗi câu một ảnh, báo câu ↔ nhịp lệch, lỗi trang), `… en-021 4 1500` (giữa chuyển động), `--portrait`.
5. Ảnh bìa thẻ bài: `node scripts/story-thumbs.mjs en-0NN` chụp khung giữa truyện (đổi câu trong bảng `BEAT` nếu khung giữa không đẹp) → `src/assets/english-thumbs/en-0NN.jpg`, thẻ trong danh sách tự hiện ảnh.

## 9. Phần 🎤 Nói

Bé tự nói về bài đọc. Mỗi bài 5 câu, theo thứ tự: 2 câu **📖 Về bài đọc** (`text`), 2 câu **🙂 Về em** (`me`, có khung câu `frame`), 1 câu **🗣️ Kể lại** (`retell`, có từ gợi ý `hints`).

- Dữ liệu: `src/data/englishReading/speak/level1–5.js` = `{ 'en-001': [ { kind, q, vi, model, need, frame?, hints?, min?, minWords? } ] }`, tải bằng `loadSpeak(L)`.
- Nghe giọng: `src/engine/listenEn.js`. Có nhận dạng giọng nói (Chrome, Edge, Safari) thì `listenEn()` (en-US, 3 cách nghe; kể lại thì nghe nối nhiều đoạn tới khi bé bấm ⏹). Không có thì `recordEn()` ghi âm để bé nghe lại giọng mình và so với câu mẫu.
- Chấm: `speakCheck()` trong `src/games/englishCheck.js`. `need` = nhóm từ khoá (`'a|b'` = a hoặc b), `min` = số nhóm phải có (mặc định đủ cả), `minWords` (mặc định text 2, me 3, retell 8). Chữ nghe được qua `norm()` (rút gọn, số thành chữ tới 99), thêm I'd = I would, bỏ 's sở hữu. Từ khoá chỉ dùng từ máy nghe chắc (không bắt tên Việt, địa danh), có cả cách viết Mỹ (mom, color, math).
- Sai: nhắc theo loại câu (nói cả câu / xem lại bài / nói theo khung / thêm từ gợi ý). Sai 2 lần thì hiện câu mẫu và nút "Bỏ qua câu này" (tính như xem đáp án). Đúng thì hiện câu mẫu để so.
- Kiểm tra dữ liệu: `node scripts/check-english-speak.mjs [cấp]` (đủ trường, đúng thứ tự, câu mẫu tự qua chấm, không "—" / "nhé").
- Xem thử: `scripts/english-reading-dev.html?app=1&id=en-021&part=speak`.
