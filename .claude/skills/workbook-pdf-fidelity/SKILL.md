---
name: workbook-pdf-fidelity
description: Rules for keeping any question in src/games/grade3Workbook.js visually faithful to its source page in docs/SBT TOAN 3 TAP 1.pdf — layout, colors, and blank/input styling. Use whenever adding a new Bài, editing an existing question's rendering, or reviewing/fixing a visual bug in the workbook feature.
---

# Workbook PDF fidelity

`grade3Workbook.js` digitizes "Vở bài tập Toán 3 — Tập một" page by page.
The user's standing rule, stated after repeatedly catching mismatches:

> 1. Tuân thủ tối đa 100% format PDF, kể cả màu sắc.
> 2. Input field phải fit hết phần container còn trống, và có thể dùng
>    kiểu dashed line (giống dòng chấm trong PDF) làm placeholder cho
>    chỗ viết đáp án.

## Rule 1 — match the PDF page, not just "close enough"

Before finalizing (or fixing) any question's rendering:

1. Render the actual PDF page and look at it — don't reason from the
   label text alone. `pip install pymupdf`, then:
   ```python
   import fitz
   fitz.open(r"docs/SBT TOAN 3 TAP 1.pdf")[pageIndex0based].get_pixmap(dpi=150).save("page.png")
   ```
   Page index is 0-based and equals this PDF's own printed footer number
   (footer "6" → `doc[6]`), so there's no off-by-one to worry about. Read
   the PNG with the Read tool.
2. Match structure (table vs. sentence-with-blank vs. lettered a)/b)/c)
   sub-items), color accents (e.g. section number badges, blue sample
   rows), and spacing — not just "the numbers are right."
3. When a fix is reported for one question, **check every other question
   using the same rendering path** for the same mismatch before calling
   it done. A rule stated once applies to the whole file, not just the
   reported instance — see the incident below.

## Rule 2 — blanks fill the line, styled as a dotted answer line

The printed workbook almost never boxes an answer — it prints the
prompt/label then a dotted/dashed line the student writes on, and that
line runs to the edge of the available width, not a fixed-size box stuck
in a corner with dead space in between.

`renderBlankRow()` in `grade3Workbook.js` implements this for `fill`-type
questions: **every blank with exactly one input slot** — whether the
label has no `"..."` at all (`{ label: 'a) Từ lớn đến bé', ... }`) or ends
in a trailing `"..."` (`{ label: '139 = ...', ... }`) — renders as
`.gw-blank-inline.gw-blank-fill`: `flex: 1 1 auto` inside a full-width
flex label, dashed `border-bottom`, transparent background, no boxed
border. It grows to fill whatever room the row has left, so it never
clips a long typed answer and never leaves a visible gap before a
corner-docked box.

**Multi-slot rows** (a label with 2+ literal `"..."`, e.g.
`'a) 35, ..., ...'`, or a blank mid-sentence with more text after it, e.g.
`'a) Bông hoa ... ghi phép tính có kết quả lớn nhất.'`) can't flex-grow
without swallowing or wrapping away the rest of the sentence, so they
keep a fixed-`ch`-width, dashed-underline box (`.gw-blank-inline.gw-blank-dashed`,
no `gw-blank-fill`) per slot instead. That width still needs a
**comfortable typing floor — currently `Math.max(9, ...)` ch** — never
just enough characters to fit the expected answer (a 1-letter answer
like `'B'` sized to 3ch both looks cramped *and* gives away that the
answer is exactly one character).

When adding a new `fill` question or touching this code:
- Don't reintroduce a fixed `width:Nch` box for a single-answer blank.
  If it needs a numeric mobile keypad hint, that's still just
  `inputmode="numeric"` on the same dashed input — numeric-ness affects
  the keyboard, not the box shape or width.
- Every inline blank input (trailing-fill or fixed-width mid-sentence)
  gets `gw-blank-dashed` — that's what gives it the dotted-line look
  instead of a boxed border. `gw-blank-fill` is a separate, additive
  modifier that only applies to the trailing/flex-grow case.
- If a row's PDF source is a genuine small table cell (not a sentence
  needing a dotted line), that's a `table`/`cells` question type with its
  own render path (`renderTableArea`) — don't force a `fill` blank to
  look boxy to fake a table; use the right question type instead.

## Rule 3 — question images are tap-to-enlarge

Any `<img class="e3-q-img">` (geometric figures, flowcharts, clocks,
etc. — see [[project_grade3_workbook_feature]] for when an image is used
at all instead of a real interactive element) is already click-to-zoom
app-wide via `src/engine/lightbox.js`, wired once in `main.js` alongside
`initVirtualKeyboard()`. It's event-delegated on `document`, so a new
`img.e3-q-img` anywhere needs **no per-question or per-file wiring** —
don't add a custom click handler or a second overlay for it. Native
pinch-zoom works inside the opened overlay because `index.html`'s
viewport meta doesn't set `user-scalable=no`/`maximum-scale` — don't add
either of those, it would silently break zooming for every image at once.

## Rule 4 — once a question is solved, its check/submit button disappears

Every question type has its own `attach*Handlers(q)` function
(`attachFillHandlers`, `attachTableHandlers`, `attachChoiceHandlers`,
`attachCompareHandlers`, `attachMatchHandlers`) and its own submit/check
button (`#e3-submit-fill`, `#gw-table-check`, `#e3-submit-multi`,
`#gw-compare-check` — `match` has none, it auto-checks per click). Each
handler has two branches: `if (solved[current])` (revisiting an
already-solved question) and the live `onclick` (just answered
correctly). **Both branches must remove the button** once solved —
disabling it or leaving it as-is still shows a stray, clickable-looking
"Kiểm tra" bar sitting right next to "✅ Đúng rồi!" and "Câu tiếp theo →",
which reads as broken even though re-clicking it is harmless (inputs are
already disabled with the right value, so a re-click just re-shows the
same correct feedback).

`attachCompareHandlers` already did this correctly (`checkBtn.remove()`
in both branches) when the other four handlers were written/touched —
that's the reference implementation to copy, not `disabled = true`.

## Rule 5 — a headers-less table's columns must be visibly equal-width

`renderTableArea()`'s `table` question type (every "Số?" sequence/fact-family
drill without column headers) must render all-equal column widths — the
book prints a uniform grid, and default browser auto table-layout instead
sizes each column off whichever cell in it is widest, which visibly
jitters column widths when a column happens to hold a given number in one
row and a blank input in another.

Two approaches that look right but silently break:
- `table-layout: fixed` alone locks column widths but then **ignores every
  cell's own `min-width`** once locked — a wide (10+ column) table of
  3-digit numbers got columns narrower than their own content and clipped
  it (e.g. "409" rendered as "40" with the last digit cut off).
- An explicit width in `ch` on each cell doesn't work either, because `ch`
  is relative to *that element's own font-size* — `.gw-table-given` and
  `.gw-table-input` use slightly different font-sizes, so the "same" `9ch`
  renders as a different pixel width on a given-cell than on an
  input-cell, reintroducing uneven columns from a different cause than
  the one being fixed.

What actually works (see `tableColWidthsPx()`): `table-layout: fixed`
**with an explicit pixel width on a `<col>` per column** (a `<colgroup>`
before `<thead>`/`<tbody>`). A `<col>` width is one value applied to the
whole column regardless of any individual cell's font, so it's immune to
both failure modes above. Size it off *that column's own* values only
(`maxLen * 8 + 18`, floor `32`) — **not** the longest value anywhere in
the table. A first attempt used one table-wide max, which looked right
for a plain number sequence but broke the very next table checked: "Thừa
số/Thừa số/Tích" has a first column holding those 7-character words next
to nine 1–2-digit number columns, and sizing every column off the
table-wide longest value ("Thừa số") made all nine number columns as
wide as the word column — the same wide/narrow visual complaint, just
inverted (now every column was *unnecessarily* wide), and forced
horizontal scroll a same-shape 1–2 digit table doesn't need. Per-column
sizing keeps the word column wide and the number columns compact. A
column whose own values genuinely need more room (a 3-digit number, or a
"Thừa số"-style label) still grows past 100% and scrolls via the
existing `.gw-table-wrap { overflow-x: auto }` — just that column, not
the whole table. Don't reintroduce a fixed touch-target floor like
`52px` here — it forces unnecessary horizontal scroll on tables that
would otherwise fit natively.

A table *with* `headers` (only two in Bài 1–8: "Trăm/Chục/Đơn vị/Viết
số/Đọc số" and "Số liền trước/Số đã cho/Số liền sau") is left on plain
auto layout — "Đọc số" spells a number out in words next to single-digit
columns and genuinely needs an uneven column, so don't extend this fix
to headers-tables without checking the specific table's content first.

## Rule 6 — a table's blank cell is the `<td>` itself, not a boxed input dropped inside it

`renderTableArea()`'s blank cells (e.g. "Tích"/"Thương" rows) must render
the `<input>` as a borderless, transparent-background, 100%-width/height
fill of its `<td>` (`.gw-table-input-cell { padding: 0 }` on the cell,
`border: none; border-radius: 0; background: transparent` on the input) —
the table's own cell border (`.gw-table td { border: 1.5px solid ... }`)
is what the student sees as the cell boundary. Giving the input its own
`border` + `border-radius` on top of that draws a second, rounded box
floating inside the cell with visible gaps on every side, which reads as
a UI widget bolted onto the table rather than a fillable cell in the
table — the PDF prints an ordinary table where the answer just gets
written directly in the cell. Correct/wrong feedback still needs to be
visible without reintroducing that second box: use `box-shadow: inset 0
0 0 2px <color>` (colors the existing cell edge red/green) plus the
background-color change, not a `border-color` change.

A table blank also needs the same `inputmode="numeric"` treatment as a
`fill`-question blank (see `isPlainInt()`, reused by both call sites) —
without it the app's own virtual number keypad
(`src/engine/virtualKeyboard.js`, which only attaches to
`input[type="number"], input[inputmode="numeric"]`) never shows up when
the cell is tapped. Gate it on `isPlainInt(cell.answer)` rather than
adding it unconditionally — a table can hold a non-numeric answer (e.g.
the "Đọc số" word-form blank at line ~91, validated with `textValidate`),
which must stay free-typing.

## Rule 7 — geometric figures are redrawn as SVG, not scan crops

Figures that are geometry/diagrams (shapes, grids, flowcharts, clocks,
rulers, column calculations, 3D boxes…) live as hand-written SVG next to
where the PNG crop would be (`src/assets/grade3-*/X.svg`), imported like
any image so `.e3-q-img` and the lightbox keep working. Only detailed
illustrations (animals, objects, people, scales with objects) stay PNG.

- Same pixel size as the crop (`viewBox="0 0 W H" width="W" height="H"`),
  same layout, labels, blanks and colours as the book; drop the publisher
  watermark, show-through text and crop slivers of neighbouring content.
- Palette: light fill `#B8E5FC`, cyan `#00AEEF`, practice-book line
  `#4BA3E3`, dark `#231F20` (sample the scan when it clearly differs).
- Text uses `font-family="Quicksand"`; after writing/editing an SVG run
  `python scripts/embed-svg-fonts.py <file.svg>` — an SVG inside `<img>`
  can't use the page's web font, so the script embeds a per-file subset
  (re-runnable; it replaces the previous embedded block).
- Verify side by side against the PDF crop before swapping the import.
- Keep the scan crop as `src/assets/grade3-*/orig/X.png`: the lightbox
  (`src/engine/lightbox.js`) shows a "📷 Ảnh gốc" toggle whenever an SVG has
  an `orig/` twin, loaded lazily only when tapped. SVGs must stay separate
  files (`assetsInlineLimit` in vite.config.js) for that URL lookup to work.

## Incidents this came from

- A "139 = ..." blank was fixed to flex-grow into its row (2026-09-21).
  The very next report was a *different* question — `{ label: 'a) Từ lớn
  đến bé', answer: '867, 786, 768, 687' }` — which has **no literal
  `"..."`** in its label, so it went through a separate code branch that
  hadn't been touched and still rendered a fixed corner box with a gap
  and no dotted line. Fixed by unifying both branches into the same
  dashed-fill treatment.
- Same day, a *third* code path — a blank mid-sentence with text after it
  (`'a) Bông hoa ... ghi phép tính...'`) — was still a tiny boxed
  3ch-wide input sized exactly to its 1-letter answer, plus the app's
  question images weren't clickable/zoomable at all. The user's reaction
  both times: a rule stated once applies to *every* place that pattern
  occurs, not just the exact instance first reported — always grep the
  render function for every call site/branch before calling a fix done.
- Same day again — after a `fill` question was answered correctly, its
  "Kiểm tra" button was still sitting there, active, right next to
  "Câu tiếp theo →". `attachCompareHandlers` had already solved this
  exact problem (`checkBtn.remove()`) but `attachFillHandlers`,
  `attachTableHandlers`, and `attachChoiceHandlers`'s multi-select path
  never got the same treatment. Same lesson as above, this time about
  post-solve UI state rather than visual styling — see Rule 4.
- Next day — a headers-less `table` question's columns were visibly uneven
  ("toàn là số sao lại cột rộng cột hẹp" — they're all just numbers, why
  are the columns wide/narrow?). Took four attempts to actually fix (see
  Rule 5): `table-layout:fixed` alone clipped 3-digit numbers in a wide
  table by ignoring `min-width`; per-cell `ch` widths silently disagreed
  between given-cells and input-cells because `ch` depends on each
  element's own font-size; `<colgroup><col style="width:Npx">` fixed both
  of those but, sized off one table-wide longest value, made every number
  column in "Thừa số/Tích" as wide as the "Thừa số" label column, forcing
  unnecessary scroll the user immediately caught ("vì các số chủ yếu 1-3
  digits... horizontal scroll bị không cần thiết quá nhiều"). Fixed for
  real by computing each `<col>`'s width from only its own column's
  values.
- Same day again — a "Tích"/"Thương" table's blank cells had a rounded,
  bordered `<input>` sitting inside the `<td>` with visible dead space
  around it ("không thể dùng chính cell của table để như inputfield luôn,
  thay vì insert 1 inputfield phá vỡ cell sao" — use the cell itself as
  the input field instead of inserting an inputfield that breaks the
  cell). Fixed per Rule 6: input now fills the `<td>` edge-to-edge with no
  border/radius of its own, cell padding moved to 0, correct/wrong state
  shown via `inset box-shadow` instead of `border-color`.
