---
name: game-screen-layout
description: Mandatory screen-layout rules for every game in src/games (grade2Games, grade3Games, preschool, market stalls…) — fill the space, big content, drawn scenery instead of empty panels, no relayout during a turn, result card placement, and screenshot verification. Use whenever creating a new game or level, changing a game's markup/CSS, or fixing any visual/layout complaint in a game.
---

# Game screen layout

The user's standing rule, after repeatedly finding screens where everything was "nhỏ xíu, không gian thì thừa thãi" and the layout jumped around during play:

> Cần tối ưu không gian. Đưa vào rule chặt cho mọi game.
> Sao không vẽ bầu trời, đồng cỏ, trang trại… thay vì để trống?
> Khu vực bấm chọn từng loại là một cái nút lớn.

Every rule below is **mandatory** for every game screen, in both landscape and portrait. A change is not finished until it passes the checklist at the end.

## 1. Fill the space: content big, no empty panels

- The play area (`.g3f-counter` / bench / `play`) must be **filled**. Do not leave a large box with a few small items floating in it.
- Size content **from the space it has**, not with fixed small rem values. Use flex `1 1 0` + `min-height: 0` for the area that should grow, and container query units (`container-type: size` + `cqh`/`cqi`) for the items in it. For example, picture-graph cells use `font-size: min(74cqh, 8.4cqi)` so 10 cells fit and each row is as tall as possible.
- Rows/columns that hold a variable number of items divide the space evenly (`flex: 1 1 0`), sized for the **maximum** count (e.g. 10 cells, 6 vehicles).
- Moving or key objects are big. On a road, a vehicle is about 60% of the road height. A bag, scale, or other main object takes the full height of its zone (`height: 100%; aspect-ratio`).
- Don't stack secondary info vertically when it steals height from the main content. Put it beside the content in landscape (e.g. the data table becomes a vertical table left of the graph) and on top in portrait.

## 2. Use drawn scenery instead of empty background

- When there is space left after the content is maximised, fill it with a **drawn scene in our own SVG style**: sky + clouds/sun/moon, grass/hills, trees, fence, and a place that fits the story (school, farm/barn, orchard, bus station, lantern street…).
- Scene = a full-bleed wrapper with a sky/ground gradient plus an SVG backdrop `preserveAspectRatio="xMidYMax slice"` anchored to the bottom. Content sits on top of it in **opaque** white boards (a semi-transparent board over a drawing looks muddy).
- Reuse the helpers in `src/games/grade2Games/reporter.js`: `BACKDROP` (`xe` school, `vat` farm, `buyt` bus station, `orchard`, `lantern`), `tree`, `cloud`, `fence`, `label`, `windows`, `sceneWrap(id, inner, cls)`. Add new backdrops there (or move them to a shared art module once a second game needs them).
- Style: bright flat colours, thick ink outline (`INK = #3F3A40`, stroke 3–4), simple shapes. No copyrighted images (see the SVG redraw memory). Objects that must stand out against the scene get a white drop-shadow halo: `filter: drop-shadow(3px 0 0 #fff) drop-shadow(-3px 0 0 #fff) drop-shadow(0 3px 0 #fff) drop-shadow(0 -3px 0 #fff)`.

## 3. Choices are big buttons with their content inside

- Each choice the child taps (a kind, a box, a column) is **one big button**. The whole card is tappable, with a 3D press (`box-shadow: 0 6px 0 …`, `:active` translateY).
- Put the result of tapping **inside** that button: tally marks, the count, and the numbered line-up for checking. Don't put a small button on top of a big empty column.

## 4. Nothing relayouts during a turn

Only the thing that is moving may move. Before the turn starts, every zone must already have its final size.

- A status board starts with `&nbsp;` and `visibility: hidden`. Never `hidden`/`display: none`, which inserts it later and pushes everything down.
- Roads, belts, and strips keep their height after use. Never collapse them at the end of the turn. When a belt is empty, show the message on it.
- Item sizes are fixed for the expected capacity. Never shrink placed items because another one arrived (rare overflow excepted).
- A centred "current item" sits in a fixed-width grid column, so the shrinking queue beside it doesn't push it sideways.
- A text blank that gets filled in (`…` → "Không thể") reserves the width of the longest option (`min-width`).
- If a turn will ask for a number, the idle keypad is shown **from the start of the turn** (keep `g3f-pad-idle`). Don't add or remove the no-pad class mid-turn.
- **Never** `bench.style.paddingBottom = card.offsetHeight` (the old result-card hack, still present in ant, bus, busLong, clock, factory, party, shop, veg, water, train and robot: migrate them when touched). The result card **overlays**:
  - either reserve a constant bottom zone from the start (padding inside the boxes, chips limited to the top part of a column), or
  - move the card over a zone that is empty by then, e.g. `.g2r-tally-on .g3f-main > .g3g-result { bottom: auto; top: … }` over the sky of the scene.
- Animate with `transform`/`opacity` (keyframes using `cqw` for off-screen distances), not `left`/`width`/`height`.

## 5. Related rules that still apply

Focused UI with minimal text, an icon how-to strip, and actions next to the object. Every move flies (`flyOne`). Guide attention when an action is blocked. Use the calm version with prefers-reduced-motion instead of skipping animations. No "nhé" and no em dash in UI text. Measuring games: drawn size is proportional to the value.

## Verification checklist (do it every time)

Render the real screen and **look at it** before saying it is done. The Vite dev server runs on :5173.

```bash
CH="$HOME/AppData/Local/ms-playwright/chromium-1243/chrome-win64/chrome.exe"
OUT="<scratchpad>"
U="http://localhost:5173/scripts/games-preview.html?mod=grade2Games/reporter.js&game=REPORTER_GAME&lv=0&h=0"
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=1900,1000 --virtual-time-budget=3000 --screenshot="$OUT/land.png" "$U"
"$CH" --headless=new --disable-gpu --hide-scrollbars --window-size=820,1180  --virtual-time-budget=3000 --screenshot="$OUT/port.png" "$U"
```

- `h` = number of fake earlier turns (many games choose the variant by turn index). `fast=6` divides timers so you can script clicks in a copy of the harness and capture the end of a turn with `--virtual-time-budget`. Game modules expose `window.__g2xxx` / `__g3xxx` in DEV with the mission data, for scripted answers.
- Capture at least: the start of the turn, mid-play, and the end of the turn with the result card. Do this in landscape **and** portrait.
- Check each one:
  1. Is there any large empty area? If so, enlarge the content or draw scenery.
  2. Is the main object/picture big for the space it has?
  3. Are the choices big buttons?
  4. Compare start, mid, and end: did any zone change size or position?
  5. Does the result card cover anything the child still needs to read?
