# Đề ôn tập giữa học kì 1, Toán 3: định dạng dữ liệu

Nguồn: `docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf` (65 đề, đề N nằm khoảng trang N+1).
Bỏ phần hành chính và tên/nguồn của bộ sách (tiêu đề "TUYỂN TẬP…", tên tác giả, link shopee).
Mỗi đề một file: `src/data/grade3Midterm/deNN.js` (NN = 01…65). Màn hình: `src/games/grade3Worksheet.js`
(dùng chung với Phiếu bài tập, xem `phieu-bai-tap.md`). Kiểm tra dữ liệu: `node scripts/check-worksheets.mjs`.

## Một đề

```js
/** Đề số 1. Nguồn: …pdf trang 1–3. */
export default {
  id: 'de-01',
  title: 'Đề số 1',
  short: 'Đề 1',
  desc: 'Bảng chia 7, một phần mấy, đổi đơn vị đo',   // 3–6 chủ đề chính, ngắn
  review: 'bảng nhân, bảng chia và một phần mấy',     // "Con cần ôn lại {review}."
  time: 40,                                            // thời gian của đề in (màn hình dùng chung 45 phút cho mọi bài)
  numbering: 'part',                                   // số câu bắt đầu lại ở mỗi Phần ('continuous': đánh liên tục cả đề, như đề 63, 64)
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Bài', questions: [ … ] },
    { title: 'B. Phần tự luận',     label: 'Bài', questions: [ … ] },
  ],
};
```

- `title` của Phần chép như đề (`I. Trắc nghiệm`, `Phần II: Tự luận`…), `label` là chữ đứng trước số câu như đề (`Bài`, `Câu`, hoặc `''` nếu đề chỉ ghi `1.`, `2.`).
- Mỗi câu của đề = **một** câu trong dữ liệu (ý a, b, c, d nằm trong `items`). Không tách một câu thành nhiều câu.
- Không ghi điểm `(0,5 điểm)`.

## Chữ trong câu

- `prompt`: lời đề của câu (vd `'Đặt tính rồi tính:'`, `'Kết quả của phép tính 56 : 7 là:'`). Có thể chứa HTML đơn giản (`<b>`).
- Phân số viết `{1/6}` → hiện phân số chồng (tử trên, mẫu dưới). Vd `'{1/6} của 48 m là:'`.
- Dấu nhân `×`, dấu chia trong đề in `:` (giữ như đề) hoặc `÷`; dấu trừ `−` hoặc `-` đều được. **Không dùng chữ x làm dấu nhân.**
- Đơn vị viết như đề: `6 dm 4 mm`, `5 m 6 cm`, `1 hm`, `l` (lít) viết `l`.
- Không dùng "nhé", không dùng dấu gạch dài "—".
- Sửa lỗi chính tả / dính chữ của bản PDF ("biếubà" → "biếu bà"). Đề sai (không có đáp án đúng, hai đáp án giống nhau, chữ cái lệch) thì sửa ít nhất có thể và ghi chú `// sửa: …` ngay trên câu đó.

## Hình vẽ

- `fig`: chuỗi SVG tự vẽ (không chép ảnh). Có `viewBox` và `width` (px, khoảng 160–320), nét `stroke="#1f2937" stroke-width="2" fill="none"`, chữ `font-size="14" fill="#1f2937"`. Tô đậm dùng `fill="#94a3b8"`.
- Đếm hình (tam giác, góc vuông, hình vuông…): **vẽ đúng hình trong đề và tự đếm lại** để đáp án khớp hình vẽ.
- Đồng hồ: kim dừng trước vòng số, không che số nào.
- Phương án là hình (đề 16 câu 5, đề 21 câu d…): mỗi phần tử `options` là một chuỗi SVG nhỏ.

## Các loại câu (`type`)

### `mc`: khoanh vào chữ cái đặt trước câu trả lời đúng

```js
{ type: 'mc', prompt: 'Kết quả của phép tính 56 : 7 = ?', options: ['6', '7', '8', '9'], ans: 2 }
```
`ans` = chỉ số phương án đúng (0 = A). `fig` nếu có hình. `cols` (1, 2, 4) nếu muốn ép số cột (mặc định tự chọn theo độ dài).
Đề ghi chữ thường `a. b. c.` hay `□ a.` vẫn ghi thành `mc` (màn hình hiện A B C D).
Câu trắc nghiệm có nhiều ý (đề 7 Bài 1: a, b, c mỗi ý 3 phương án) → `{ type: 'mc', prompt, items: [{ prompt: '32 giảm 4 lần', options: […], ans: 2 }, …] }`.

### `tf`: Đúng ghi Đ, sai ghi S

```js
{ type: 'tf', prompt: 'Đúng ghi Đ, sai ghi S:', items: ['7 × 5 + 15 = 50', '1 hm = 10 m'], ans: ['Đ', 'S'] }
```
Ý là phép tính dọc hoặc chia cột (đề 1 Bài 5, đề 43, đề 59) → object, màn hình tự vẽ:
- tính dọc: `{ col: '527 + 145', res: '662' }` (dấu `+ − ×`; `res` là kết quả in trong đề, có thể sai),
- chia cột: `{ div: '80 : 4', q: '2', work: ['8', '0'] }` (`q` thương in trong đề; `work` các dòng dưới số bị chia từ trên xuống: số trừ, số dư, … như đề in).

Ví dụ đầy đủ: `src/data/grade3Midterm/de01.js`.

### `calc`: tính, tính nhẩm, đặt tính rồi tính, tính giá trị biểu thức

```js
{ type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['32 × 3', '36 × 4', '87 : 3', '46 : 5'] }
{ type: 'calc', prompt: 'Tính:', items: ['5 × 7 + 27', '80 : 2 − 13'] }
{ type: 'calc', prompt: 'Tính:', items: [{ t: '7 cm + 6 cm', ans: 13, unit: 'cm' }] }
```
- Ý dạng chuỗi chỉ gồm số và dấu: đáp án tự tính (nhân chia trước, trái sang phải). Phép chia có dư (`46 : 5`) tự hiện "= … dư …".
- `col: true` cho "Đặt tính rồi tính" (hiện phép tính dọc / chia cột).
- Có đơn vị → object `{ t, ans, unit }`.

### `fill`: điền vào chỗ trống / ô trống (số hoặc chữ)

```js
{ type: 'fill', prompt: 'Viết số thích hợp vào chỗ chấm:', items: [
  { t: '2 km = … m', ans: 2000 },
  { t: '{1/5} của 40 m là … m', ans: 8 },
  '3 × □ = 12',                                   // phép tính thuần: tự giải
  { t: '25 × □ = □0', ans: [2, 5] },              // nhiều ô: ans là mảng theo thứ tự
  { t: 'Từ lớn đến bé: …, …, …, …', ans: [765, 665, 657, 567] },
  { t: '205 đọc là: …', ans: 'Hai trăm linh năm|Hai trăm lẻ năm' },   // chữ: các cách viết ngăn bằng |
  { t: '… … … … … …', ans: [102, 111, 120, 201, 210, 300], anyOrder: true },
] }
```
- `…` = chỗ chấm (ô gạch dưới), `□` = ô vuông. Mỗi `…`/`□` là một ô, `ans` theo thứ tự.
- Bài toán nhiều bước, bài không giải được bằng một phép tính, hay câu hỏi chỉ cần một số → `fill` với `prompt` là đề bài, mỗi ý là một câu trả lời `'Cô có số quyển vở là: … quyển'`.

### `findx`: tìm x

```js
{ type: 'findx', prompt: 'Tìm X:', items: ['X × 4 = 32', 'X : 6 = 12'] }
```
Biến giữ đúng chữ của đề (`x`, `X`, `y`). Đáp án tự giải. Vế phải có thể là biểu thức (`28 : x = 10 − 3`).

### `compare`: điền dấu >, <, =

```js
{ type: 'compare', prompt: 'Điền dấu >, <, = thích hợp:', items: [
  '36 : 6 □ 35 : 7',                                  // phép tính thuần: tự so
  { t: '3 m 6 cm □ 36 cm', ans: '>' },                // có đơn vị / phân số: ghi đáp án
] }
```

### `pick`: khoanh vào một phần mấy số hình (đề 1 Bài 3)

```js
{ type: 'pick', prompt: 'a) Khoanh vào {1/3} số con thỏ:', icon: 'rabbit', count: 15, cols: 3, ans: 5 }
```
`icon`: `rabbit`, `orange`, `flower`, `star`. Có nhiều ý → `items: [{ prompt, icon, count, cols, ans }, …]`.

### `draw`: vẽ đoạn thẳng (thước kẻ, chạm vạch cm để vẽ)

```js
{ type: 'draw', items: [
  { prompt: 'a) Vẽ đoạn thẳng AB dài 4 cm.', name: 'AB', len: 4 },
  { prompt: 'b) Vẽ đoạn thẳng CD dài gấp đôi đoạn thẳng AB.', name: 'CD', len: 8 },
] }
```

### `word`: bài toán có lời văn một phép tính (giải 4 bước như phiếu bài tập)

Dùng khi lời giải là **một** phép tính `a op b = kết quả`:

```js
{
  type: 'word',
  text: 'Bạn Nam đạt được 6 điểm mười, số điểm mười của bạn Nga gấp 3 lần số điểm mười của bạn Nam. Hỏi bạn Nga được bao nhiêu điểm mười?',
  given: ['Nam được 6 điểm mười.', 'Nga được gấp 3 lần Nam.'],
  ask: 'Nga được bao nhiêu điểm mười?',
  hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
  sentence: ['Bạn Nga', 'được số', 'điểm mười', 'là:'],   // mảnh câu lời giải theo đúng thứ tự
  decoys: ['còn lại'],                                    // 1 mảnh nhiễu
  expr: { a: 6, op: '×', b: 3, result: 18, unit: 'điểm mười' },
  units: ['điểm mười', 'bạn', 'lần'],                     // đơn vị đúng + 2 nhiễu
}
```
- `op` là một trong `+ − × :` (chia viết `:`). `result` phải đúng bằng `a op b`.
- "{1/3} số cam" → chia 3; "gấp 3 lần" → nhân 3; "giảm đi 6 lần" → chia 6.
- Đơn vị ngắn như học sinh viết: `quả cam`, `m`, `l`, `kg`, `học sinh`, `tuổi`.
- Lời văn sửa dính chữ, giữ số liệu của đề.

### `table`: bảng có ô trống (thêm cho Phiếu bài tập)

```js
{ type: 'table', prompt: 'Viết số và đọc số:', head: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
  rows: [[5, 6, 7, '…', '…'], ['…', 8, 1, 681, '…']],
  ans: [[567, readNumber(567)], [6, readNumber(681)]] }
```
- Ô trống là `'…'`; `ans[i]` là đáp án các ô trống của hàng i theo thứ tự. Mỗi hàng chấm là một ý.
- `transpose: true`: mỗi hàng dữ liệu hiện thành một **cột** (bảng nhân ngang như phiếu Bài 4), `head` là cột đầu.
- Nhiều bảng trong một câu (ý a, b): `items: [{ prompt, head, rows, ans, transpose }, …]`.
- Ô "Đọc số": dùng `readNumber(n)` trong `src/games/worksheetCore.js` (sinh sẵn các cách đọc: linh/lẻ, mốt/một, tư/bốn).

### `match`: nối cột

```js
{ type: 'match', prompt: 'Nối…', heads: ['A', 'B'], left: ['Số gồm 6 trăm…', …], right: ['407', '890', …], ans: [4, 0, …] }
```
`ans[i]` = chỉ số ô bên phải nối với ô trái thứ i. Mỗi ô phải chỉ nối một đường; nhiều ô trái cùng nối một ô phải thì thêm `multi: true`.
Ô có thể là chuỗi SVG (nối hình với phân số).

### `chain`: sơ đồ mũi tên

```js
{ type: 'chain', prompt: 'Số?', items: [{ start: 50, steps: [': 5', ': 2', '× 9'] }] }
```
Đáp án tự tính lần lượt từng mũi tên.

### `pick` tô màu theo phần

```js
{ type: 'pick', prompt: 'Tô màu {2/3} hình tròn dưới đây.', shape: 'circle', parts: 3, ans: 2 }
```
`shape`: `circle` (+ `parts`), `square-x` (hình vuông chia 4 bởi hai đường chéo), `rect` (+ `grid: [cols, rows]`). Chấm theo số phần đã tô.

### Ô chọn trong `fill` và đánh số ý

- `choices: ['thừa số', 'tích']` trên một ý `fill`: các chỗ trống có đáp án **chữ** thành ô chạm để chọn (chỗ trống đáp án số vẫn gõ số). Dùng cho tên thành phần, chữ cái bông hoa, phân số `'{1/2}'`.
- `marker: '1'` trên câu: ý đánh `1. 2. 3.` như đề in (mặc định `a) b)`; quá 8 ý tự đánh số).
- `relation` có thể có `text` thay câu đề mặc định.

## Sao

Mỗi Phần của đề có một khoá sao `worksheet:de-NN:p0`, `…:p1` trong `src/data/starRatings.js`.
