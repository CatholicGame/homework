# 🧰 Công cụ Tiếng Việt 3 (Tập Một) — thiết kế

Nguồn: SGK *Tiếng Việt 3, Tập Một* (Kết nối tri thức), `docs/lop_3/tieng-viet-3-tap-mot.pdf`.
Ghi chép từng bài (chép nguyên văn bài tập, có đáp án suy ra): `bai-01.md` … `bai-32.md`, `on-tap-giua-ki.md`, `on-tap-cuoi-ki.md`, `muc-luc.md`.

## 1. Mục tiêu

Giúp bé rèn **những nội dung cốt yếu** của sách bằng công cụ chơi được, mỗi lượt đề mới:
từ ngữ (sự vật, hoạt động, đặc điểm, vốn từ theo chủ điểm, trái nghĩa, nghĩa của từ), câu (kiểu câu, câu kể / hỏi / cảm / khiến,
ghép câu, nối vế câu, đặt câu hỏi), dấu câu, biện pháp so sánh, chính tả, viết hoa tên riêng, kĩ thuật viết đoạn (sắp xếp câu thành đoạn).
Không thay bài đọc, nói và nghe, viết đoạn văn tự do (đã có ✍️ Luyện Viết Văn).

## 2. Màn hình

- Thẻ `tv3-tools` trong 📚 Tiếng Việt (lớp 3) → `src/games/tv3Tools.js`.
- Danh sách: dải **🧰 Luyện theo công cụ** (mỗi công cụ dùng từ ngữ của mọi bài + kho chung, sao `tvtool3:tool-<khoá>`),
  rồi 4 chủ điểm → thẻ Bài (số bài, trang, tên bài đọc, các công cụ của bài).
- Màn bài: 📘 **Ghi nhớ** (khung kiến thức, thầy đọc 🔊), ✏️ **Luyện tập** (8 câu trộn các công cụ của bài, sao `tvtool3:bai-N`),
  nút luyện riêng từng công cụ của bài.
- Màn chơi: lớp học + thầy giáo của Luyện Tính (`grade3Drills/kit.js mountDrill`), vòng chơi `grade3Games/loop.js`.
  Năm dạng thao tác trong `tv3Tools/play.js`: `pick` (nút chọn to, chữ bay vào chỗ trống), `sort` (giỏ là nút to, từ đã xếp nằm trong nút),
  `tap` (chạm từ trong câu, từ bay vào ô), `order` (ghép mảnh thành câu / xếp câu thành đoạn), `spell` (dùng nguyên 🔤 Luật chính tả).
  Bố cục cố định cả lượt, thẻ kết quả đè vùng nút (luật `game-screen-layout`).

## 3. Định dạng dữ liệu một bài (`src/games/tv3Tools/data/cdN.js`)

Mỗi tệp `export default [ {bài}, … ]`. Mọi khoá nội dung đều **không bắt buộc**: công cụ nào có dữ liệu thì bài có công cụ đó.
Chữ phải đúng chính tả, dấu thanh kiểu sách (hoà, khoẻ, thuỷ: dấu đặt kiểu cũ như sách). **Không dùng dấu gạch dài (—)** trong chữ hiện cho bé.
Ưu tiên câu, từ **lấy từ sách** (bài đọc, bài tập, mẫu); thêm câu tự soạn cùng chủ đề cho đủ số lượng, giọng văn lớp 3, đúng thực tế.

```js
{
  n: 2, title: 'Về thăm quê', week: 1, pages: [13, 16],
  learn: ['Từ chỉ sự vật, hoạt động', 'Câu giới thiệu, câu nêu hoạt động', 'Viết tin nhắn', 'Chữ hoa A, Ă, Â'], // dòng "em học gì" (mục lục)
  skills: ['kinds', 'sentype', 'match', ...],  // tuỳ chọn: thứ tự công cụ ưu tiên của bài (mặc định theo SKILLS)

  // 📘 Ghi nhớ: khung kiến thức (sách có thì chép nguyên văn; không có thì rút ra từ bài tập, nói gọn, đúng sách). 2–4 mục.
  notes: [{ icon: '🏷️', color: '#7C3AED', title: 'Câu giới thiệu', text: 'Câu giới thiệu trả lời câu hỏi <b>Ai (cái gì, con gì) là gì?</b>',
            ex: ['<u>Các cô bác nông dân</u> là những người làm ra lúa gạo.'] }],

  // 🧺 kinds: từ chỉ sự vật / hoạt động / đặc điểm (mỗi nhóm ≥ 2 từ mới thành công cụ; nên 6–15 từ mỗi nhóm có trong bài)
  kinds: { sv: ['bác nông dân', 'con trâu'], hd: ['gặt lúa', 'gặm cỏ'], dd: ['vàng óng'] },
  // 🔍 find: câu có từ cần tìm, đánh dấu bằng * ngay sau từ (trước dấu câu); "_" nối các tiếng của một từ; k = sv | hd | dd. 1–3 dấu * mỗi câu.
  find: [{ s: 'Đàn_vịt bơi* dưới mương, chuồn_chuồn bay* trên ngọn_lúa.', k: 'hd' }],
  // 🏷️ sentype: [câu, 'gt' | 'hd' | 'dd'] (câu giới thiệu / nêu hoạt động / nêu đặc điểm)
  sentype: [['Con trâu là bạn của nhà nông.', 'gt']],
  // 🧩 build: câu chia mảnh bằng " / " (2–6 mảnh, thứ tự duy nhất hợp lí), dấu cuối câu dính vào mảnh cuối
  build: ['Các cô bác nông dân / đang / gặt lúa / trên cánh đồng.'],
  // 🔗 match: [vế A, vế B] (≥ 3 cặp; vế B của cặp khác phải KHÔNG hợp với vế A)
  match: [['Bầy ong', 'bay đi tìm hoa.'], ['Chim chóc', 'đua nhau hót trong vòm cây.']],
  // 💬 purpose: [câu, 'ke' | 'hoi' | 'cam' | 'khien']
  purpose: [['Ôi, biển đẹp quá!', 'cam']],
  // ❗ punct: câu có một ô {dấu}: . ? ! : ,
  punct: ['Mùa hè có rất nhiều loài hoa{:} hoa hồng, hoa phượng, hoa mười giờ.'],
  // ➗ colon: [câu có dấu hai chấm, 'lk' (liệt kê) | 'gt' (giải thích) | 'ln' (lời nói trực tiếp)]
  colon: [['Bà mua cho em nhiều thứ: bút, vở, thước kẻ.', 'lk']],
  // 🌻 vocab: chủ đề + các nhóm (≥ 2 nhóm, mỗi nhóm ≥ 3 từ); icons tuỳ chọn
  vocab: { name: 'mùa hè', groups: { 'Thời tiết': ['nóng nực', 'oi bức'], 'Hoạt động': ['bơi', 'thả diều'] }, icons: { 'Thời tiết': '☀️' } },
  // ✏️ fill: câu có {đáp án} + opts (gồm đáp án, 3 lựa chọn)
  fill: [{ s: 'Cô có chiếc váy {vàng óng}, không ai đẹp bằng.', opts: ['bé', 'xinh xắn', 'vàng óng'] }],
  // ↔️ antonym / 🟰 synonym: cặp từ
  antonym: [['vui', 'buồn']], synonym: [['chăm chỉ', 'siêng năng']],
  // 🌟 compare: câu so sánh, *a = sự vật 1, *w = từ so sánh, *b = sự vật 2 ("_" nối tiếng)
  compare: ['Cánh_buồm*a như*w con_bướm_nhỏ*b đậu trên sông.'],
  // ❓ question: bộ phận trong [ ] trả lời câu hỏi q (Ai | Cái gì | Con gì | Làm gì | Thế nào | Là gì | Ở đâu | Khi nào | Vì sao | Để làm gì);
  //    not: các từ hỏi cũng đúng, không được làm lựa chọn sai
  question: [{ s: '[Bạn Na] đang xếp bút vào hộp.', q: 'Ai' }],
  // 📖 meaning: [từ, nghĩa] — lấy từ phần giải nghĩa của bài đọc (nguyên văn)
  meaning: [['chập chờn', 'ở trạng thái nửa ngủ nửa thức']],
  // 🔠 caps: tên riêng viết đúng (máy tự tạo cách viết sai)
  caps: ['Đông Anh', 'Loa Thành'],
  // 📝 para: đoạn văn ngắn tách câu, đúng thứ tự (3–5 câu, thứ tự rõ: các bước, mở – thân – kết)
  //    loose: [i, j] = các câu i…j (đếm từ 0) đổi chỗ được cho nhau, vd. các câu tả ở giữa đoạn tả đồ vật
  para: [{ title: 'Trứng đúc thịt', sents: ['Đầu tiên, …', 'Tiếp theo, …', 'Cuối cùng, …'] }],
  // 🔤 spell: luật có sẵn trong tiengViet3/rules.js: ck ggh ngngh chtr sx rdgi ln hoinga ieuuou iuuu anang songxong
  spell: ['ck'],
  // spellx: từ có chỗ trống vần / âm không có luật, {đúng|sai}: en/eng, iên/iêng, uôn/uông, ươn/ương, ăn/ăng, ân/âng, ao/au, v/d…
  spellx: ['cái k{èn|èng}', 'xà b{eng|en}'],
}
```

Bài ôn tập: `{ n: 'gk', title: 'Ôn tập giữa học kì 1', mix: [1, …, 16], pages: [74, 80], … }` — luyện tập trộn dữ liệu của các bài trong `mix` và dữ liệu riêng của bài ôn tập.

## 4. Kho chung (`tv3Tools/bank.js`)

Thêm từ, câu cho dải 🧰 Luyện theo công cụ (để đề không lặp). Cùng định dạng với một bài (không có n, title).

## 5. Sao

`tvtool3:bai-N` (một lần mỗi bài, 8 câu), `tvtool3:tool-<khoá>`; độ khó trong `src/data/starRatings.js`; prefix `tvtool3` lớp 3 (`engine/stars.js` BOOK_GRADE).
