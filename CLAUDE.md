# Project rules

## Games (src/games/**): screen layout is mandatory

Before creating or changing any game screen (markup, CSS, new level), load the `game-screen-layout` skill and follow it. Before calling the work done, verify with screenshots (landscape + portrait, start / mid / end of turn) using `scripts/games-preview.html`.

Short version:
- **Fill the space.** Content is sized from the space it has (flex + container query units). No big box with a few small items in it.
- **Draw scenery instead of empty background**: sky, grass, trees, a place that fits the story, in our own SVG style. Content sits on opaque boards on top.
- **Choices are big buttons**, with their result (tally marks, counts, line-up) inside the button.
- **Nothing relayouts during a turn.** Reserve every zone from the start (board, keypad, belts, roads). Item sizes are fixed. The result card overlays an empty zone. Never use the `paddingBottom = card.offsetHeight` hack.

## Workbooks

Grade 3 workbook visuals follow the `workbook-pdf-fidelity` skill.
