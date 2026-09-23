/**
 * Lớp 3 — Vở Bài Tập Toán 3 (Tập Một)
 * Nguồn: Vở bài tập Toán 3 — Tập một, bộ sách "Kết nối tri thức với cuộc sống" (NXB Giáo dục Việt Nam).
 * Ảnh minh họa được cắt trực tiếp từ các trang có hình vẽ/sơ đồ không thể diễn tả bằng chữ.
 */

import imgBai2Flowchart from '../assets/grade3-workbook/bai2_ex2_flowchart.png';
import imgBai2Flowers from '../assets/grade3-workbook/bai2_ex3_flowers.png';
import imgBai2Shapes from '../assets/grade3-workbook/bai2_ex4_shapes.png';
import imgBai4Flowchart from '../assets/grade3-workbook/bai4_ex3_flowchart.png';
import imgBai6Flowchart from '../assets/grade3-workbook/bai6_ex3_flowchart.png';
import imgClock1 from '../assets/grade3-workbook/bai7_clock1.png';
import imgClock2 from '../assets/grade3-workbook/bai7_clock2.png';
import imgClock3 from '../assets/grade3-workbook/bai7_clock3.png';
import imgClock4 from '../assets/grade3-workbook/bai7_clock4.png';
import imgBai7Pattern from '../assets/grade3-workbook/bai7_ex1b_pattern.png';
import imgBai7Triangle from '../assets/grade3-workbook/bai7_ex2_triangle.png';
import imgBai7Trapezoid from '../assets/grade3-workbook/bai7_ex5_trapezoid.png';
import imgObjBall from '../assets/grade3-workbook/bai7_obj_ball.png';
import imgObjBowl from '../assets/grade3-workbook/bai7_obj_bowl.png';
import imgObjBox from '../assets/grade3-workbook/bai7_obj_box.png';
import imgObjCup from '../assets/grade3-workbook/bai7_obj_cup.png';
import imgObjWardrobe from '../assets/grade3-workbook/bai7_obj_wardrobe.png';
import imgScales from '../assets/grade3-workbook/bai7t2_ex1_scales.png';
import imgAlarmClock from '../assets/grade3-workbook/bai7t2_ex2_clock.png';
import imgBai8Flowchart from '../assets/grade3-workbook/bai8_ex5_flowchart.png';
import imgBai8Pyramid from '../assets/grade3-workbook/bai8_ex5_pyramid.png';
import imgBai8Circles from '../assets/grade3-workbook/bai8_ex5b_circles.png';
import imgBai9Flowchart from '../assets/grade3-workbook/bai9_ex3_flowchart.png';
import imgBai11Flowchart from '../assets/grade3-workbook/bai11_ex2_flowchart.png';
import imgBai12Flowchart from '../assets/grade3-workbook/bai12_t2_ex2_flowchart.png';
import imgBai14Circles from '../assets/grade3-workbook/bai14_ex1_circles.png';
import imgBai14Grids from '../assets/grade3-workbook/bai14_ex3_grids.png';
import imgBai14Shapes from '../assets/grade3-workbook/bai14_ex4_shapes.png';
import imgBai14T2Squares from '../assets/grade3-workbook/bai14_t2_ex1_squares.png';
import imgBai14T2Circles2a from '../assets/grade3-workbook/bai14_t2_ex2a_circles.png';
import imgBai14T2Circles2b from '../assets/grade3-workbook/bai14_t2_ex2b_circles.png';
import imgBai14T2Shapes3 from '../assets/grade3-workbook/bai14_t2_ex3_shapes.png';
import imgBai14T2Shapes4 from '../assets/grade3-workbook/bai14_t2_ex4_shapes.png';
import imgBai14T2FishFlowers from '../assets/grade3-workbook/bai14_t2_ex5_fish_flowers.png';
import imgBai15Clouds from '../assets/grade3-workbook/bai15_ex2_clouds.png';
import imgBai15Flowchart from '../assets/grade3-workbook/bai15_ex3_flowchart.png';
import imgBai15Triangles from '../assets/grade3-workbook/bai15_ex5_triangles.png';
import imgBai15T2Shapes from '../assets/grade3-workbook/bai15_t2_ex3a_shapes.png';
import imgBai15T2Stars from '../assets/grade3-workbook/bai15_t2_ex3b_stars.png';
import imgBai15T2Flowchart from '../assets/grade3-workbook/bai15_t2_ex5_flowchart.png';
import imgBai16Segment from '../assets/grade3-workbook/bai16_ex1_segment.png';
import imgBai16Segments2 from '../assets/grade3-workbook/bai16_ex2_segments.png';
import imgBai16Trapezoid from '../assets/grade3-workbook/bai16_ex3_trapezoid.png';
import imgBai16NumberLine from '../assets/grade3-workbook/bai16_ex4_numberline.png';
import imgBai16T2Ruler from '../assets/grade3-workbook/bai16_t2_ex1_ruler.png';
import imgBai16T2Kangaroo from '../assets/grade3-workbook/bai16_t2_ex3_kangaroo.png';
import imgBai17Circles from '../assets/grade3-workbook/bai17_q1_circles.png';
import imgBai17Bees from '../assets/grade3-workbook/bai17_q3_bees.png';
import imgBai18Angles from '../assets/grade3-workbook/bai18_q1_angles.png';
import imgBai18Shapes from '../assets/grade3-workbook/bai18_q3_shapes.png';
import imgBai19Shape1 from '../assets/grade3-workbook/bai19_q1_shape1.png';
import imgBai19Shape2 from '../assets/grade3-workbook/bai19_q1_shape2.png';
import imgBai19Shape3 from '../assets/grade3-workbook/bai19_q1_shape3.png';
import imgBai19Trapezoid from '../assets/grade3-workbook/bai19_q2_trapezoid.png';
import imgBai19T2Q1aShapes from '../assets/grade3-workbook/bai19_t2_q1a_shapes.png';
import imgBai19T2Q1bShapes from '../assets/grade3-workbook/bai19_t2_q1b_shapes.png';
import imgBai19T2Colored from '../assets/grade3-workbook/bai19_t2_q2_colored.png';
import imgBai19T2Tiles from '../assets/grade3-workbook/bai19_t2_q4_tiles.png';
import imgBai19T3Ant from '../assets/grade3-workbook/bai19_t3_q1_ant.png';
import imgBai19T3Snail from '../assets/grade3-workbook/bai19_t3_q2_snail.png';
import imgBai20Envelope from '../assets/grade3-workbook/bai20_q2_envelope.png';
import imgBai21Cube from '../assets/grade3-workbook/bai21_q1_cube.png';
import imgBai21Eraser from '../assets/grade3-workbook/bai21_q2_eraser.png';
import imgBai21Blocks from '../assets/grade3-workbook/bai21_q3_blocks.png';
import imgBai21Lantern from '../assets/grade3-workbook/bai21_q4_lantern.png';
import imgBai21Artists from '../assets/grade3-workbook/bai21_q5_artists.png';
import imgBai22T1Rects from '../assets/grade3-workbook/bai22_t1_q1_rects.png';
import imgBai22T1Circles from '../assets/grade3-workbook/bai22_t1_q2_circles.png';
import imgBai22T1Pond from '../assets/grade3-workbook/bai22_t1_q3_pond.png';
import imgBai22T2Figure from '../assets/grade3-workbook/bai22_t2_q1_figure.png';
import imgBai22T2Cube from '../assets/grade3-workbook/bai22_t2_q2_cube.png';
import imgBai22T2ClocksA from '../assets/grade3-workbook/bai22_t2_q3a_clocks.png';
import imgBai22T2ClocksB from '../assets/grade3-workbook/bai22_t2_q3b_clocks.png';
import imgBai23T2Puzzle from '../assets/grade3-workbook/bai23_t2_q3_puzzle.png';
import imgBai26T2Divisions from '../assets/grade3-workbook/bai26_t2_q2_divisions.png';
import imgBai28T1Polyline from '../assets/grade3-workbook/bai28_t1_q2_polyline.png';
import imgBai28T2Summary from '../assets/grade3-workbook/bai28_t2_q3_summary.png';
import imgBai30T1Rulers from '../assets/grade3-workbook/bai30_t1_q2_rulers.png';
import imgBai31Scales from '../assets/grade3-workbook/bai31_q1_scales.png';
import imgBai31Dials from '../assets/grade3-workbook/bai31_q2_dials.png';
import imgBai32Bottle from '../assets/grade3-workbook/bai32_q1_bottle.png';
import imgBai32Flask from '../assets/grade3-workbook/bai32_q2_flask.png';
import imgBai34T2Thermometers from '../assets/grade3-workbook/bai34_t2_q1_thermometers.png';
import imgBai34T2Bike from '../assets/grade3-workbook/bai34_t2_q2_bike.png';
import imgBai34T2Laptop from '../assets/grade3-workbook/bai34_t2_q2_laptop.png';
import imgBai34T2Pen from '../assets/grade3-workbook/bai34_t2_q2_pen.png';
import imgBai34T2Cups from '../assets/grade3-workbook/bai34_t2_q3_cups.png';
import imgBai35T1Scales from '../assets/grade3-workbook/bai35_t1_q2_scales.png';
import imgBai35T2Thermometer from '../assets/grade3-workbook/bai35_t2_q2_thermometer.png';
import imgBai35T2Gifts from '../assets/grade3-workbook/bai35_t2_q4_gifts.png';
import imgBai37T2Divisions from '../assets/grade3-workbook/bai37_t2_q3_divisions.png';
import imgBai37T2Hexagons from '../assets/grade3-workbook/bai37_t2_q4_hexagons.png';
import imgBai37T3Archery from '../assets/grade3-workbook/bai37_t3_q4_archery.png';
import imgBai39T1Segments from '../assets/grade3-workbook/bai39_t1_q2_segments.png';
import imgBai41T1Calcs from '../assets/grade3-workbook/bai41_t1_q3_calcs.png';
import imgBai41T2Calcs from '../assets/grade3-workbook/bai41_t2_q3_calcs.png';
import imgBai41T2Puzzles from '../assets/grade3-workbook/bai41_t2_q5_puzzles.png';
import imgBai41T3Strawberries from '../assets/grade3-workbook/bai41_t3_q4_strawberries.png';
import imgBai41T3Puzzle from '../assets/grade3-workbook/bai41_t3_q5_puzzle.png';
import imgBai43T1Figure from '../assets/grade3-workbook/bai43_t1_q1_figure.png';
import imgBai43T1Circle from '../assets/grade3-workbook/bai43_t1_q3_circle.png';
import imgBai43T1Castle from '../assets/grade3-workbook/bai43_t1_q4_castle.png';
import imgBai43T1Box from '../assets/grade3-workbook/bai43_t1_q5_box.png';
import imgBai43T2Figures from '../assets/grade3-workbook/bai43_t2_q1_figures.png';
import imgBai43T2Objects from '../assets/grade3-workbook/bai43_t2_q2_objects.png';
import imgBai44T1Rect from '../assets/grade3-workbook/bai44_t1_q3_rect.png';
import imgBai44T2Figures from '../assets/grade3-workbook/bai44_t2_q3_figures.png';

// ── TEXT / ANSWER HELPERS ───────────────────────────────────────────────────

function soDoc(n) {
  const ones = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const h = Math.floor(n / 100), rem = n % 100, t = Math.floor(rem / 10), u = rem % 10;
  const parts = [];
  if (h > 0) parts.push(ones[h] + ' trăm');
  if (h > 0 && t === 0 && u > 0) parts.push('linh ' + (u === 1 ? 'một' : ones[u]));
  else if (t === 0 && u > 0 && h === 0) parts.push(ones[u]);
  else if (t === 1) parts.push('mười' + (u === 0 ? '' : u === 1 ? ' một' : u === 5 ? ' lăm' : ' ' + ones[u]));
  else if (t >= 2) parts.push(ones[t] + ' mươi' + (u === 0 ? '' : u === 1 ? ' mốt' : u === 5 ? ' lăm' : ' ' + ones[u]));
  if (parts.length === 0) return 'không';
  return parts.join(' ');
}

function foldVN(s) {
  return String(s).toLowerCase().trim().replace(/\s+/g, ' ')
    .replace(/mốt/g, 'một').replace(/lăm/g, 'năm').replace(/linh/g, 'lẻ');
}

function textValidate(expected) {
  const target = foldVN(expected);
  return (value) => foldVN(value) === target;
}

function sumValidate(target) {
  return (value) => {
    const parts = String(value).split('+').map(s => parseFloat(s.trim().replace(',', '.')));
    if (parts.some(Number.isNaN)) return false;
    return parts.reduce((a, b) => a + b, 0) === target;
  };
}

function setValidate(expectedArr) {
  const norm = (arr) => arr.map(x => String(x).trim().toUpperCase()).filter(Boolean).sort().join(',');
  const target = norm(expectedArr);
  return (value) => norm(String(value).split(/[,;\s]+/)) === target;
}

function listValidate(expectedArr) {
  const norm = (arr) => arr.map(x => foldVN(x)).filter(Boolean).join('|');
  const target = norm(expectedArr);
  return (value) => norm(String(value).split(/[,;>]+/)) === target;
}

function blank(answer, opts = {}) {
  return { blank: true, answer: String(answer), ...opts };
}

// "Đ, S ?" true/false blanks (Bài 14, Bài 16): a plain default compare would
// reject a very likely typo — typing the plain ASCII "d" instead of the
// Vietnamese "Đ" (they look alike, and not every on-screen keyboard makes
// "Đ" easy to reach) — so accept both, plus the written-out words.
function dsValidate(isTrue) {
  const accepted = isTrue ? ['đ', 'd', 'đúng', 'dung'] : ['s', 'sai'];
  return (value) => accepted.includes(String(value).trim().toLowerCase());
}

// Bài 13 Tiết 2 Q4: "lập được các phép nhân hoặc phép chia thích hợp" from
// three of the given numbers has 4 equally-valid written forms (a × b = p,
// b × a = p, p : a = b, p : b = a) — accept any one of them, in either ×/x
// or :/÷ notation.
function factFamilyValidate(a, b, product) {
  const valid = new Set([
    `${a}x${b}=${product}`, `${b}x${a}=${product}`,
    `${product}:${a}=${b}`, `${product}:${b}=${a}`,
  ]);
  return (value) => {
    const norm = String(value).toLowerCase().replace(/\s+/g, '').replace(/[×*]/g, 'x').replace(/÷/g, ':');
    return valid.has(norm);
  };
}

// Order-independent validator for a list of letter-groups (each group's own
// internal letter order doesn't matter, e.g. naming a radius "IA" or "AI",
// and the order the groups are listed in doesn't matter either). Reused for:
// Bài 17 radii/diameter ("IA, IB", "MN"), Bài 19 shape edges ("DE, EH, HD")
// and shape enumeration ("ABI, ICD, IBC").
function letterGroupsValidate(expectedGroups) {
  const normGroup = (s) => String(s).trim().toUpperCase().replace(/[^A-ZÀ-Ỹ]/g, '').split('').sort().join('');
  const target = expectedGroups.map(normGroup).sort().join('|');
  return (value) => {
    const got = String(value).split(/[,;]+/).map(normGroup).filter(Boolean).sort().join('|');
    return got === target;
  };
}

// Bài 18's "Góc đỉnh ...; cạnh ..., ..." rows have 3 slots: the vertex letter,
// then its two rays' endpoint letters. The book prints 2 interchangeable rows
// under "a) Các góc vuông là" and 4 under "b) Các góc không vuông là", so a row
// accepts ANY angle belonging to its own group — filling them in a different
// order than the answer key is still correct. Each ray name also accepts either
// letter order ("AB" or "BA"), and the two rays may be listed in either order.
function angleGroupValidate(angles) {
  const normPair = (s) => String(s).trim().toUpperCase().replace(/[^A-Z]/g, '').split('').sort().join('');
  const key = (vertex, rayEnds) => {
    const V = vertex.trim().toUpperCase();
    return V + '#' + rayEnds.map(e => normPair(V + e)).sort().join('|');
  };
  const targets = angles.map(([v, ends]) => key(v, ends));
  return (value) => {
    const parts = String(value).split(',').map(s => s.trim());
    if (parts.length < 3) return false;
    const got = parts[0].toUpperCase().replace(/[^A-Z]/g, '') + '#'
      + parts.slice(1, 3).map(normPair).sort().join('|');
    return targets.includes(got);
  };
}
// Strips every Vietnamese diacritic (and đ → d) so a free-typed name/phrase is
// accepted with or without accents: "Rô-bốt" / "Robot", "Địa đạo" / "dia dao".
function stripVN(s) {
  return String(s).normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd').toLowerCase();
}

// Bài 23 Tiết 2 Q2 (ô chữ): one letter per table cell, case-insensitive. The
// letter "Đ" also accepts a plain "D" (same typo allowance as dsValidate).
function letterValidate(letter) {
  const target = stripVN(letter);
  return (value) => stripVN(String(value).trim()) === target;
}

// A whole phrase compared without accents, case or spacing — "Địa đạo Củ Chi",
// "ĐỊA ĐẠO CỦ CHI", "dia dao cu chi" and "ĐIA ĐAO CU CHI" (the literal
// unaccented letters the cipher spells out) are all the same answer.
function phraseValidate(phrase) {
  const norm = (s) => stripVN(s).replace(/[^a-z0-9]/g, '');
  const target = norm(phrase);
  return (value) => norm(value) === target;
}

// An unordered set of names written in one blank ("Rô-bốt và Mai",
// "Mai, Rô-bốt", "Robot va Mai" are all the same answer).
function nameSetValidate(names) {
  const norm = (s) => stripVN(s).replace(/[^a-z0-9]/g, '');
  const target = names.map(norm).sort().join('|');
  return (value) => stripVN(value).split(/\s*(?:,|;|&|\+|\bva\b)\s*/)
    .map(norm).filter(Boolean).sort().join('|') === target;
}

// A given table cell printed in the book's blue "theo mẫu" color when the
// sample is a single column/cell rather than a whole row (Bài 23, Bài 24).
function sampleCell(value) {
  return { sample: true, value };
}

// "Tính." / "Đặt tính rồi tính." for a division (Bài 25, Bài 26): the book's
// long-division layout ends with the quotient under the divisor and the
// remainder on the last line (0 for an exact division), so each one asks for
// both. Computed here rather than hand-typed so a quotient/remainder typo is
// impossible.
function divBlank(dividend, divisor) {
  const quot = Math.floor(dividend / divisor);
  const rem = dividend % divisor;
  return {
    label: `${dividend} : ${divisor} = ... (dư ...)`,
    answer: `${quot},${rem}`,
    validate: listValidate([String(quot), String(rem)]),
  };
}

// Several phrase blanks in one row (Bài 27 "Viết “gấp 2 lần” hoặc “giảm 3
// lần”" — two dotted lines on one arrow chain): each slot is compared like
// phraseValidate (no accents/case/spacing needed), in the book's order.
function phraseListValidate(phrases) {
  const norm = (s) => stripVN(s).replace(/[^a-z0-9]/g, '');
  const target = phrases.map(norm).join('|');
  return (value) => String(value).split(',').map(norm).join('|') === target;
}

// A name answer that may be written with or without the word "con" in front
// ("cào cào" / "con cào cào" / "cao cao").
function animalValidate(name) {
  const check = phraseValidate(name);
  return (value) => check(String(value).trim().replace(/^con\s+/i, ''));
}

// A measurement result whose unit the book leaves for the child to write
// (Bài 32 "250 ml + 100 ml = ........"): "350", "350 ml" and "350ml" are all
// accepted, but not a wrong unit ("350 g").
function unitValidate(n, unit) {
  const target = String(n);
  const u = unit.toLowerCase().replace(/\s+/g, '');
  return (value) => {
    const v = String(value).toLowerCase().replace(/\s+/g, '');
    return v === target || v === target + u;
  };
}

// A temperature written in the "Viết" column (Bài 33): "35", "35 °C", "35°C",
// "35 độ C", "35 oC" are all the same answer.
function tempValidate(n) {
  const re = new RegExp(`^${n}(°c?|oc|c|doc|doxe)?$`);
  return (value) => re.test(stripVN(value).replace(/\s+/g, ''));
}

// A temperature read out in words (Bài 33 "Đọc" column): "Mười lăm độ xê",
// also accepted as "mười lăm độ C", with or without accents/case.
function tempReadValidate(numberWords) {
  const n = stripVN(numberWords).replace(/[^a-z]/g, '');
  const ok = new Set([n + 'doxe', n + 'doc']);
  return (value) => ok.has(stripVN(value).replace(/[^a-z]/g, ''));
}

// Names that must be written in one specific order in a single blank (Bài 33
// "từ cao nhất đến thấp nhất": "Trưa, Chiều, Sáng sớm, Đêm"). Separators,
// accents, case and any temperatures copied from the table ("Trưa (30 °C)")
// don't matter — only the order of the names.
function phraseOrderValidate(phrases) {
  const norm = (x) => stripVN(x).replace(/\d+\s*(°\s*c?|do\s*(c|xe)\b)?/g, '').replace(/[^a-z]/g, '');
  const target = phrases.map(norm).join('');
  return (value) => norm(value) === target;
}

// A "Mẫu:" worked example inside q, printed in the book's blue sample color
// (the same blue as a sampleCell) — the word "Mẫu:" itself stays black.
function mau(text) {
  return `Mẫu: <span class="gw-sample-text">${text}</span>`;
}

// One step line of "Tính giá trị của biểu thức" (Bài 38): the book's first
// "= ......" line holds the expression left after the first operation
// ("162 + 29 − 18 = 191 − 18"). Spacing, a leading "=", and the ASCII/typed
// variants of each operator (- for −, x or * for ×, / or ÷ for :) don't matter.
function exprValidate(...exprs) {
  const norm = (s) => String(s).replace(/\s+/g, '').replace(/^=/, '')
    .replace(/[−–—]/g, '-').replace(/[x*]/gi, '×').replace(/[÷/]/g, ':');
  const targets = new Set(exprs.map(norm));
  return (value) => targets.has(norm(value));
}

// A multi-slot row whose first two slots are the two operands of a + or ×
// and may come in either order (Bài 38 "50 − ... × ... = ...": 10 × 3 or
// 3 × 10), followed by slots that must match exactly.
function swapPairValidate(a, b, ...rest) {
  return (value) => {
    const v = String(value).split(',').map(x => x.trim());
    const pairOk = (v[0] === String(a) && v[1] === String(b)) || (v[0] === String(b) && v[1] === String(a));
    return pairOk && rest.every((r, i) => v[i + 2] === String(r));
  };
}

// Bài 35 "Theo em, Nam có bị sốt không? Vì sao?" (38 °C): the reason is free
// wording, so only the yes/no part is graded — an answer that says Nam has a
// fever ("Có, vì ...", "Nam bị sốt vì 38 °C > 37 °C") is accepted, one that
// starts with "Không" or says "không bị sốt" is not.
function feverValidate() {
  return (value) => {
    const v = stripVN(value).trim().replace(/\s+/g, ' ');
    if (/^khong\b/.test(v) || /khong (bi )?sot/.test(v)) return false;
    return /^co\b/.test(v) || /\bsot\b/.test(v);
  };
}

// Operation signs written into boxes (Bài 42 "Viết dấu phép tính “+, ×, :”").
// Each combo lists one sign per box of the row; any listed combo is accepted
// (Bài 42 "4 ☐ 4 ☐ 4 = 20" has two ways, Cách 1 / Cách 2, in either order).
// The typed look-alikes count too: x, X or * for ×, ÷ or / for :, - for −.
function opsValidate(...combos) {
  const norm = (s) => String(s).trim().replace(/[xX*]/g, '×').replace(/[÷/]/g, ':').replace(/[-–—]/g, '−');
  const targets = new Set(combos.map(c => c.map(norm).join('|')));
  return (value) => targets.has(String(value).split(',').map(norm).join('|'));
}

// "Độ dài đường gấp khúc ABCD là: ........ = ........" (Bài 43): the first
// slot is the calculation, the second its value. The sides may be added in any
// order, equal sides may be written as a multiplication (35 × 3), and the unit
// may be written or left out ("35 mm + 35 mm + 35 mm", "105 mm").
function polylineValidate(sides, unit) {
  const total = sides.reduce((a, b) => a + b, 0);
  const strip = (s) => String(s).toLowerCase().split(unit).join('').replace(/\s+/g, '').replace(/[x*]/g, '×');
  const sorted = (arr) => [...arr].map(Number).sort((a, b) => a - b).join('+');
  const sumKey = sorted(sides);
  const products = new Set();
  if (sides.every(s => s === sides[0])) {
    products.add(`${sides[0]}×${sides.length}`);
    products.add(`${sides.length}×${sides[0]}`);
  }
  return (value) => {
    const parts = String(value).split(',');
    if (parts.length !== 2) return false;
    const e = strip(parts[0]);
    const exprOk = products.has(e) || (/^\d+(\+\d+)+$/.test(e) && sorted(e.split('+')) === sumKey);
    return exprOk && strip(parts[1]) === String(total);
  };
}

const bai18RightAngles = angleGroupValidate([['A', ['B', 'C']], ['R', ['Q', 'P']]]);
const bai18OtherAngles = angleGroupValidate([['I', ['L', 'T']], ['M', ['N', 'P']], ['G', ['H', 'K']], ['E', ['X', 'Y']]]);
// Bài 44 Tiết 1 Q3: rectangle ABCD with diagonals AC, BD crossing at O. The
// four right angles are the rectangle's corners; the four angles at O are not
// right (the rectangle is not a square). The book already fixes the vertex O
// for c), so those rows only ask for the two sides.
const bai44RightAngles = angleGroupValidate([['A', ['B', 'D']], ['B', ['A', 'C']], ['C', ['B', 'D']], ['D', ['A', 'C']]]);
const bai44AnglesAtO = angleGroupValidate([['O', ['A', 'B']], ['O', ['B', 'C']], ['O', ['C', 'D']], ['O', ['D', 'A']]]);
const bai44OtherAngles = (value) => bai44AnglesAtO('O,' + value);

// ── CONTENT: BÀI 1–8 (Tập Một) ──────────────────────────────────────────────

const UNITS = [
  {
    id: 'bai-1', number: 1, title: 'Ôn tập các số đến 1 000',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết số và cách đọc số thích hợp vào ô trống (theo mẫu).',
        headers: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
        rows: [
          { sample: true, cells: [3, 7, 5, 375, soDoc(375)] },
          [4, 0, 4, blank(404), blank(soDoc(404), { validate: textValidate(soDoc(404)) })],
          [7, 3, 1, blank(731), blank(soDoc(731), { validate: textValidate(soDoc(731)) })],
          [8, 8, 8, blank(888), blank(soDoc(888), { validate: textValidate(soDoc(888)) })],
        ],
        hints: ['Chữ số ở cột "Trăm" cho biết số trăm, cột "Chục" cho biết số chục, cột "Đơn vị" cho biết số đơn vị — ghép lại theo đúng thứ tự để viết số.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: 'Số gồm 7 trăm, 0 chục và 7 đơn vị.' },
          { id: 'l2', text: 'Số gồm 2 trăm, 3 chục và 1 đơn vị.' },
          { id: 'l3', text: 'Số gồm 5 trăm, 5 chục và 5 đơn vị.' },
          { id: 'l4', text: 'Số gồm 9 trăm, 8 chục và 4 đơn vị.' },
        ],
        right: [
          { id: 'r984', text: '984' }, { id: 'r555', text: '555' },
          { id: 'r707', text: '707' }, { id: 'r231', text: '231' },
        ],
        pairs: [['l1', 'r707'], ['l2', 'r231'], ['l3', 'r555'], ['l4', 'r984']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết các số dưới đây thành tổng các trăm, chục và đơn vị.',
        blanks: [
          { label: '139 = ...', answer: '100+30+9', validate: sumValidate(139) },
          { label: '321 = ...', answer: '300+20+1', validate: sumValidate(321) },
          { label: '803 = ...', answer: '800+3', validate: sumValidate(803) },
          { label: '950 = ...', answer: '900+50', validate: sumValidate(950) },
          { label: '777 = ...', answer: '700+70+7', validate: sumValidate(777) },
          { label: '614 = ...', answer: '600+10+4', validate: sumValidate(614) },
        ],
        hints: ['Xác định chữ số hàng trăm, hàng chục, hàng đơn vị rồi viết mỗi chữ số kèm giá trị hàng của nó, ví dụ 139 = 100 + 30 + 9.'],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '4. Số?',
        headers: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
        rows: [
          [blank(119), 120, blank(121)],
          [blank(499), 500, blank(501)],
          [120, blank(121), blank(122)],
          [blank(298), blank(299), 300],
        ],
        hints: ['Số liền trước nhỏ hơn số đã cho 1 đơn vị; số liền sau lớn hơn số đã cho 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết số thích hợp vào chỗ chấm để được ba số liên tiếp.',
        blanks: [
          { label: 'a) 35, ..., ...', answer: '36,37', validate: listValidate(['36', '37']) },
          { label: 'b) ..., 40, ...', answer: '39,41', validate: listValidate(['39', '41']) },
        ],
        hints: ['Ba số liên tiếp hơn kém nhau 1 đơn vị.'],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '1. >; <; = ?',
        rows: [
          { left: '770', right: '707', answer: '>' },
          { left: '989', right: '990', answer: '<' },
          { left: '1 000', right: '999', answer: '>' },
          { left: '453', right: '400 + 50 + 3', answer: '=' },
          { left: '660', right: '600 + 50 + 9', answer: '>' },
          { left: '300 + 10 + 9', right: '300 + 20', answer: '<' },
        ],
        hints: ['Với vế có tổng các trăm/chục/đơn vị, hãy tính giá trị của tổng đó trước khi so sánh.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [400, 401, 402, blank(403), blank(404), blank(405), blank(406), 407, blank(408), 409] },
          { label: 'b)', cells: [900, 899, 898, blank(897), blank(896), blank(895), blank(894), 893, blank(892), 891] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 1 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 1 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Viết các số 786, 768, 867, 687 theo thứ tự.',
        blanks: [
          { label: 'a) Từ lớn đến bé', answer: '867, 786, 768, 687', validate: listValidate(['867', '786', '768', '687']) },
          { label: 'b) Từ bé đến lớn', answer: '687, 768, 786, 867', validate: listValidate(['687', '768', '786', '867']) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Ba con gấu có cân nặng lần lượt là 243 kg, 231 kg, 234 kg. Biết gấu trắng nặng nhất, gấu nâu nhẹ hơn gấu đen. Vậy gấu trắng cân nặng ... kg; gấu nâu cân nặng ... kg; gấu đen cân nặng ... kg.',
        blanks: [
          { label: 'Gấu trắng (kg)', answer: '243' },
          { label: 'Gấu nâu (kg)', answer: '231' },
          { label: 'Gấu đen (kg)', answer: '234' },
        ],
        hints: ['Số lớn nhất trong ba số là cân nặng của gấu trắng.', 'Trong hai số còn lại, số bé hơn là gấu nâu (vì gấu nâu nhẹ hơn gấu đen).'],
      },
    ],
  },

  {
    id: 'bai-2', number: 2, title: 'Ôn tập phép cộng, phép trừ trong phạm vi 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: '60 + 20 =', answer: '80' }, { label: '500 + 300 =', answer: '800' }, { label: '900 + 100 =', answer: '1000' },
          { label: '80 − 60 =', answer: '20' }, { label: '800 − 500 =', answer: '300' }, { label: '1 000 − 900 =', answer: '100' },
          { label: '80 − 20 =', answer: '60' }, { label: '800 − 300 =', answer: '500' }, { label: '1 000 − 100 =', answer: '900' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '47 + 53', answer: '100' }, { label: '100 − 35', answer: '65' },
          { label: '275 + 18', answer: '293' }, { label: '482 − 247', answer: '235' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Con lợn cân nặng 75 kg, con chó cân nặng 25 kg. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Con lợn và con chó cân nặng tất cả bao nhiêu ki-lô-gam?', answer: '100' },
          { label: 'b) Con chó nhẹ hơn con lợn bao nhiêu ki-lô-gam?', answer: '50' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai2Shapes,
        q: '4. Chọn câu trả lời đúng.\nPhép tính ghi ở hình nào có kết quả lớn nhất?',
        options: ['Hình tam giác (225 + 38)', 'Hình tròn (281 − 19)', 'Hình chữ nhật (125 + 161)'],
        answer: 2,
        hints: ['Tính kết quả của cả ba phép tính rồi so sánh.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['Số hạng', 216, 308, 451], ['Số hạng', 432, 327, 173], ['Tổng', blank(648), blank(635), blank(624)]] },
          { label: 'b)', rows: [['Số bị trừ', 456, 527, 634], ['Số trừ', 231, 342, 208], ['Hiệu', blank(225), blank(185), blank(426)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai2Flowchart,
        q: '2. Số?\n(Hai sơ đồ tính liên tiếp: vòng tròn → lục giác → ô vuông/tròn)',
        blanks: [
          { label: 'Sơ đồ 1 — hình lục giác (34 + 48)', answer: '82' },
          { label: 'Sơ đồ 1 — hình vuông (kết quả − 27)', answer: '55' },
          { label: 'Sơ đồ 2 — hình lục giác (100 − 42)', answer: '58' },
          { label: 'Sơ đồ 2 — hình tròn (kết quả − 33)', answer: '25' },
        ],
        hints: ['Đi theo chiều mũi tên, thực hiện phép tính ghi trên mỗi mũi tên với kết quả của ô liền trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai2Flowers,
        q: '3. Viết A, B, C, D, E thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Bông hoa ... ghi phép tính có kết quả lớn nhất.', answer: 'B', validate: setValidate(['B']) },
          { label: 'b) Bông hoa ... ghi phép tính có kết quả bé nhất.', answer: 'C', validate: setValidate(['C']) },
          { label: 'c) Hai bông hoa ... và ... ghi hai phép tính có kết quả bằng nhau.', answer: 'A và E', validate: setValidate(['A', 'E']) },
        ],
        hints: ['Tính giá trị của cả 5 phép tính: A = 125+35, B = 168+103, C = 472−317, D = 392−125, E = 270−110.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một cửa hàng buổi sáng bán được 100 lít nước mắm, buổi chiều bán ít hơn buổi sáng 25 lít nước mắm. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Buổi chiều cửa hàng bán được bao nhiêu lít nước mắm?', answer: '75' },
          { label: 'b) Cả hai buổi cửa hàng bán được bao nhiêu lít nước mắm?', answer: '175' },
        ],
      },
    ],
  },

  {
    id: 'bai-3', number: 3, title: 'Tìm thành phần trong phép cộng, phép trừ',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... + 14 = 31', answer: '17' },
          { label: 'b) 45 + ... = 80', answer: '35' },
          { label: 'c) ... + 15 = 100', answer: '85' },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          ['Số hạng', 35, 27, 16, blank(6), blank(32)],
          ['Số hạng', 14, blank(15), blank(34), 36, 68],
          ['Tổng', blank(49), 42, 50, 42, 100],
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Một đội đồng diễn thể dục có 100 người, trong đó có 60 nữ. Hỏi đội đồng diễn đó có bao nhiêu nam?',
        wordProblem: true,
        blanks: [{ label: 'Số nam', answer: '40' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Số?\n12 + 28 + ... = 60',
        blanks: [{ label: 'Giá trị cần tìm', answer: '20' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... − 25 = 56', answer: '81' },
          { label: 'b) ... − 35 = 47', answer: '82' },
          { label: 'c) ... − 18 = 82', answer: '100' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?',
        blanks: [
          { label: 'a) 72 − ... = 28', answer: '44' },
          { label: 'b) 45 − ... = 10', answer: '35' },
          { label: 'c) 100 − ... = 64', answer: '36' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '3. Số?',
        rows: [
          ['Số bị trừ', 72, blank(71), 36, blank(100), 100],
          ['Số trừ', 18, 24, blank(17), 27, blank(59)],
          ['Hiệu', blank(54), 47, 19, 73, 41],
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Rô-bốt có một số viên bi. Sau khi cho Việt 20 viên bi thì Rô-bốt còn lại 15 viên. Hỏi lúc đầu Rô-bốt có bao nhiêu viên bi?',
        wordProblem: true,
        blanks: [{ label: 'Số bi lúc đầu', answer: '35' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Trong thúng có 70 quả trứng. Sau khi mẹ bán đi một số quả trứng thì trong thúng còn lại 15 quả. Hỏi mẹ đã bán đi bao nhiêu quả trứng?',
        wordProblem: true,
        blanks: [{ label: 'Số trứng đã bán', answer: '55' }],
      },
    ],
  },

  {
    id: 'bai-4', number: 4, title: 'Ôn tập bảng nhân 2; 5, bảng chia 2; 5',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [['Thừa số', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2], ['Thừa số', 1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
              ['Tích', blank(2), blank(6), blank(10), blank(14), blank(18), blank(4), blank(8), blank(12), blank(16), blank(20)]],
          },
          {
            label: 'b)',
            rows: [['Số bị chia', 20, 18, 16, 14, 12, 10, 8, 6, 4, 2], ['Số chia', 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
              ['Thương', blank(10), blank(9), blank(8), blank(7), blank(6), blank(5), blank(4), blank(3), blank(2), blank(1)]],
          },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [2, blank(4), 6, blank(8), 10, 12, blank(14), blank(16), 18, 20] },
          { label: 'b)', cells: [20, 18, blank(16), 14, blank(12), blank(10), blank(8), 6, 4, 2] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 2 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 2 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai4Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'Hình lục giác (8 : 2)', answer: '4' },
          { label: 'Hình vuông (kết quả : 2)', answer: '2' },
          { label: 'Hình tròn (kết quả × 7)', answer: '14' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Mỗi lọ hoa cắm 2 bông hoa cúc. Hỏi 6 lọ như vậy có bao nhiêu bông hoa cúc?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa cúc', answer: '12' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        tables: [
          {
            label: 'a)',
            rows: [['×', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], ['', 1, 3, 5, 7, 9, 2, 4, 6, 8, 10],
              ['', blank(5), blank(15), blank(25), blank(35), blank(45), blank(10), blank(20), blank(30), blank(40), blank(50)]],
          },
          {
            label: 'b)',
            rows: [[':', 5, 10, 15, 20, 25, 30, 35, 40, 45, 50], ['', 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
              ['', blank(1), blank(2), blank(3), blank(4), blank(5), blank(6), blank(7), blank(8), blank(9), blank(10)]],
          },
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '5 × 9' }, { id: 'l2', text: '15 : 5' }, { id: 'l3', text: '10 : 2' },
          { id: 'l4', text: '5 × 7' }, { id: 'l5', text: '5 × 8' }, { id: 'l6', text: '45 : 5' },
        ],
        right: [
          { id: 'r45', text: '45' }, { id: 'r3', text: '3' }, { id: 'r5', text: '5' },
          { id: 'r35', text: '35' }, { id: 'r40', text: '40' }, { id: 'r9', text: '9' },
        ],
        pairs: [['l1', 'r45'], ['l2', 'r3'], ['l3', 'r5'], ['l4', 'r35'], ['l5', 'r40'], ['l6', 'r9']],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '3. >; <; = ?',
        rows: [
          { left: '5 × 3', right: '40 : 5', answer: '>' },
          { left: '45 : 5', right: '2 × 6', answer: '<' },
          { left: '50 : 5', right: '5 × 2', answer: '=' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Cắm 50 bông hoa cúc vào các lọ, mỗi lọ 5 bông. Hỏi cắm được mấy lọ hoa cúc như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số lọ hoa', answer: '10' }],
      },
    ],
  },

  {
    id: 'bai-5', number: 5, title: 'Bảng nhân 3, bảng chia 3',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [['×', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3], ['', 1, 3, 5, 7, 9, 10, 8, 6, 4, 2],
          ['', blank(3), blank(9), blank(15), blank(21), blank(27), blank(30), blank(24), blank(18), blank(12), blank(6)]],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [3, 6, 9, blank(12), blank(15), 18, blank(21), 24, blank(27), 30] },
          { label: 'b)', cells: [30, blank(27), 24, 21, blank(18), blank(15), 12, blank(9), 6, 3] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 3 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 3 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Rô-bốt làm những chiếc khung hình tam giác bằng nan tre, mỗi khung cần 3 nan tre. Hỏi để làm 8 chiếc khung như vậy, Rô-bốt cần bao nhiêu nan tre?',
        wordProblem: true,
        blanks: [{ label: 'Số nan tre', answer: '24' }],
      },
      {
        type: 'compare', section: 'Tiết 1',
        q: '4. >; <; = ?',
        rows: [
          { left: '3 × 5', right: '5 × 3', answer: '=' },
          { left: '3 × 8', right: '3 × 9', answer: '<' },
          { left: '3 × 7', right: '3 × 6', answer: '>' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [[':', 3, 9, 21, 6, 15, 18, 12, 30, 24, 27], ['', 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
          ['', blank(1), blank(3), blank(7), blank(2), blank(5), blank(6), blank(4), blank(10), blank(8), blank(9)]],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).',
        left: [{ id: 'l1', text: '21 : 3' }, { id: 'l2', text: '6 : 3' }, { id: 'l3', text: '15 : 3' }, { id: 'l4', text: '24 : 3' }, { id: 'l5', text: '18 : 3' }, { id: 'l6', text: '30 : 3' }],
        right: [{ id: 'r7', text: '7' }, { id: 'r2', text: '2' }, { id: 'r5', text: '5' }, { id: 'r8', text: '8' }, { id: 'r6', text: '6' }, { id: 'r10', text: '10' }],
        pairs: [['l1', 'r7'], ['l2', 'r2'], ['l3', 'r5'], ['l4', 'r8'], ['l5', 'r6'], ['l6', 'r10']],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [{ id: 'l1', text: '27 : 3' }, { id: 'l2', text: '3 × 2' }, { id: 'l3', text: '24 : 3' }, { id: 'l4', text: '30 : 3' }, { id: 'l5', text: '10 : 5' }],
        right: [{ id: 'r1', text: '2 × 4' }, { id: 'r2', text: '3 × 3' }, { id: 'r3', text: '6 : 3' }, { id: 'r4', text: '18 : 3' }, { id: 'r5', text: '5 × 2' }],
        pairs: [['l1', 'r2'], ['l2', 'r4'], ['l3', 'r1'], ['l4', 'r5'], ['l5', 'r3']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một lớp học võ dân tộc có 30 bạn chia thành các nhóm, mỗi nhóm 3 bạn. Hỏi lớp học đó được chia thành bao nhiêu nhóm như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số nhóm', answer: '10' }],
      },
    ],
  },

  {
    id: 'bai-6', number: 6, title: 'Bảng nhân 4, bảng chia 4',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [['Thừa số', 4, 4, 4, 4, 4, 4, 4, 4], ['Thừa số', 6, 5, 8, 3, 10, 7, 9, 4],
          ['Tích', blank(24), blank(20), blank(32), blank(12), blank(40), blank(28), blank(36), blank(16)]],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          { label: 'a)', cells: [4, 8, 12, blank(16), blank(20), 24, blank(28), 32, blank(36), 40] },
          { label: 'b)', cells: [40, blank(36), 32, 28, blank(24), blank(20), 16, blank(12), 8, 4] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 4 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 4 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi bàn ăn xếp 4 cái ghế. Hỏi 10 bàn ăn như vậy xếp bao nhiêu cái ghế?',
        wordProblem: true,
        blanks: [{ label: 'Số cái ghế', answer: '40' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết số thích hợp vào chỗ chấm.\nMỗi con thỏ có 4 cái chân và 2 cái tai. Vậy 6 con thỏ có tất cả:',
        blanks: [
          { label: 'a) ... cái chân', answer: '24' },
          { label: 'b) ... cái tai', answer: '12' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [['Số bị chia', 12, 24, 20, 36, 32, 8, 40, 28], ['Số chia', 4, 4, 4, 4, 4, 4, 4, 4],
          ['Thương', blank(3), blank(6), blank(5), blank(9), blank(8), blank(2), blank(10), blank(7)]],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả bé nhất?',
        options: ['24 : 4', '32 : 4', '12 : 4', '20 : 4'],
        answer: 2,
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai6Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'Hình lục giác (32 : 4)', answer: '8' },
          { label: 'Hình vuông (kết quả : 4)', answer: '2' },
          { label: 'Hình tròn (kết quả : 2)', answer: '1' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Có một số xe ô tô con đang ở điểm đỗ xe. Bạn Nam đếm được có tất cả 16 bánh xe. Hỏi có bao nhiêu xe ô tô con đang ở điểm đỗ đó? Biết rằng mỗi xe ô tô con đều có 4 bánh xe.',
        wordProblem: true,
        blanks: [{ label: 'Số xe ô tô', answer: '4' }],
      },
    ],
  },

  {
    id: 'bai-7', number: 7, title: 'Ôn tập hình học và đo lường',
    questions: [
      {
        type: 'match', section: 'Tiết 1',
        q: '1. a) Nối (theo mẫu).',
        left: [
          { id: 'box', img: imgObjBox },
          { id: 'bowl', img: imgObjBowl },
          { id: 'ball', img: imgObjBall },
          { id: 'wardrobe', img: imgObjWardrobe },
          { id: 'cup', img: imgObjCup },
        ],
        right: [
          { id: 'tru', text: 'Dạng khối trụ' },
          { id: 'cau', text: 'Dạng khối cầu' },
          { id: 'lp', text: 'Dạng khối lập phương' },
          { id: 'hcn', text: 'Dạng khối hộp chữ nhật' },
        ],
        pairs: [['box', 'lp'], ['bowl', 'tru'], ['ball', 'cau'], ['wardrobe', 'hcn'], ['cup', 'tru']],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai7Pattern,
        q: '1b. Khoanh vào chữ đặt trước câu trả lời đúng.\nHình thích hợp đặt vào dấu "?" là:',
        options: ['A. Khối trụ', 'B. Khối lập phương', 'C. Khối cầu', 'D. Khối lập phương'], answer: 2,
        hints: ['Các hình lặp lại theo chu kì "trụ, lập phương, cầu, lập phương" — tìm vị trí của dấu "?" trong chu kì đó.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai7Triangle,
        q: '2. Viết tiếp vào chỗ chấm (theo mẫu).\nBa điểm thẳng hàng có trong hình bên là: A, N, B; hãy tìm 3 bộ ba điểm thẳng hàng còn lại.',
        blanks: [
          { label: 'Bộ ba thứ 2', answer: 'B, M, C', validate: setValidate(['B', 'M', 'C']) },
          { label: 'Bộ ba thứ 3', answer: 'A, H, M', validate: setValidate(['A', 'H', 'M']) },
          { label: 'Bộ ba thứ 4', answer: 'C, H, N', validate: setValidate(['C', 'H', 'N']) },
        ],
        hints: ['Nhìn theo từng đường thẳng được vẽ trong hình: có 4 đường thẳng, mỗi đường đi qua đúng 3 điểm đã đánh dấu.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Con kiến bò đến miếng bánh theo đường gấp khúc ABCD với AB = 252 cm, BC = 138 cm, CD = 210 cm. Tính độ dài quãng đường con kiến phải bò.',
        wordProblem: true,
        blanks: [{ label: 'Độ dài quãng đường (cm)', answer: '600' }],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai7Trapezoid,
        q: '5. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố hình tứ giác có trong hình bên là:',
        options: ['A. 8', 'B. 7', 'C. 5', 'D. 6'], answer: 3,
        hints: ['Đừng chỉ đếm các hình nhỏ nhất — hãy đếm cả những hình tứ giác được ghép từ 2 hình nhỏ trở lên.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgScales,
        q: '1. Số?',
        blanks: [
          { label: 'a) Quả dưa hấu cân nặng (kg)', answer: '5' },
          { label: 'a) Quả sầu riêng cân nặng (kg)', answer: '2' },
          { label: 'a) Quả sầu riêng nhẹ hơn quả dưa hấu (kg)', answer: '3' },
          { label: 'b) Hai can (bé 10 lít, to 15 lít) — cả hai can có (lít)', answer: '25' },
          { label: 'b) Can to đựng nhiều hơn can bé (lít)', answer: '5' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgAlarmClock,
        q: '2a. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐồng hồ bên đổ chuông lúc:',
        options: ['7 giờ 6 phút', '7 giờ 30 phút', '6 giờ 7 phút', '6 giờ 8 phút'], answer: 1,
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '2b. Nếu ngày 14 tháng 10 là thứ Bảy thì ngày 20 tháng 10 (ngày Phụ nữ Việt Nam) là:',
        options: ['Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'], answer: 2,
        hints: ['Đếm số ngày từ 14 đến 20 (6 ngày) rồi đếm tiếp từ thứ Bảy.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Cô Bình mua về 15 kg gạo. Biết rằng mỗi tuần gia đình cô Bình ăn hết 5 kg gạo. Hỏi gia đình cô Bình ăn trong mấy tuần thì hết số gạo đó?',
        wordProblem: true,
        blanks: [{ label: 'Số tuần', answer: '3' }],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '4. Nối hai đồng hồ chỉ cùng giờ vào buổi chiều hoặc buổi tối (theo mẫu).',
        left: [{ id: 'c1', img: imgClock1 }, { id: 'c2', img: imgClock2 }, { id: 'c3', img: imgClock3 }, { id: 'c4', img: imgClock4 }],
        right: [{ id: 't2100', text: '21:00' }, { id: 't1515', text: '15:15' }, { id: 't1615', text: '16:15' }, { id: 't2030', text: '20:30' }],
        pairs: [['c1', 't1515'], ['c2', 't2030'], ['c3', 't2100'], ['c4', 't1615']],
      },
    ],
  },

  {
    id: 'bai-8', number: 8, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. a) Viết tên các con vật dưới đây theo thứ tự cân nặng từ lớn đến bé: Gấu đen 118 kg, Báo hoa 85 kg, Linh dương 520 kg, Cá sấu 246 kg.\nb) Viết số thành tổng các trăm, chục và đơn vị (theo mẫu). ' + mau('457 = 400 + 50 + 7'),
        blanks: [
          { label: 'a) Thứ tự từ lớn đến bé', answer: 'Linh dương, Cá sấu, Gấu đen, Báo hoa', validate: listValidate(['Linh dương', 'Cá sấu', 'Gấu đen', 'Báo hoa']) },
          { label: 'b) 285 = ...', answer: '200+80+5', validate: sumValidate(285) },
          { label: 'b) 666 = ...', answer: '600+60+6', validate: sumValidate(666) },
          { label: 'b) 309 = ...', answer: '300+9', validate: sumValidate(309) },
          { label: 'b) 710 = ...', answer: '700+10', validate: sumValidate(710) },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '38 + 45', answer: '83' }, { label: '463 + 82', answer: '545' }, { label: '638 + 254', answer: '892' },
          { label: '175 − 92', answer: '83' }, { label: '595 − 346', answer: '249' }, { label: '739 − 683', answer: '56' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Trường Tiểu học Nguyễn Trãi có 674 học sinh, Trường Tiểu học Nguyễn Huệ có nhiều hơn Trường Tiểu học Nguyễn Trãi 45 học sinh. Hỏi Trường Tiểu học Nguyễn Huệ có bao nhiêu học sinh?',
        wordProblem: true,
        blanks: [{ label: 'Số học sinh trường Nguyễn Huệ', answer: '719' }],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '4. Số?',
        tables: [
          { label: 'a)', rows: [['Số hạng', 58, 38, blank(72)], ['Số hạng', 23, blank(53), 64], ['Tổng', blank(81), 91, 136]] },
          { label: 'b)', rows: [['Số bị trừ', 72, 65, blank(265)], ['Số trừ', 38, blank(38), 46], ['Hiệu', blank(34), 27, 219]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai8Pyramid,
        q: '5. Số? (mỗi ô ở hàng trên bằng tổng hai ô liền kề ở hàng dưới)',
        blanks: [
          { label: 'Hàng 6 (6 ô), ô 5', answer: '12' }, { label: 'Hàng 6 (6 ô), ô 6', answer: '11' },
          { label: 'Hàng 5 (5 ô), ô 4', answer: '25' }, { label: 'Hàng 5 (5 ô), ô 5', answer: '23' },
          { label: 'Hàng 4 (4 ô), ô 2', answer: '56' }, { label: 'Hàng 4 (4 ô), ô 3', answer: '52' }, { label: 'Hàng 4 (4 ô), ô 4', answer: '48' },
          { label: 'Hàng 3 (3 ô), ô 1', answer: '116' }, { label: 'Hàng 3 (3 ô), ô 2', answer: '108' }, { label: 'Hàng 3 (3 ô), ô 3', answer: '100' },
          { label: 'Hàng 2 (2 ô), ô 1', answer: '224' }, { label: 'Hàng 2 (2 ô), ô 2', answer: '208' },
          { label: 'Hàng 1 (1 ô, đỉnh)', answer: '432' },
        ],
        hints: ['Hàng dưới cùng đã cho đủ 7 số — hãy tính hàng ngay phía trên trước, rồi cứ thế đi dần lên đỉnh.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: '5 × 1 =', answer: '5' }, { label: '4 × 1 =', answer: '4' }, { label: '2 × 1 =', answer: '2' }, { label: '3 × 1 =', answer: '3' },
          { label: '5 : 1 =', answer: '5' }, { label: '4 : 1 =', answer: '4' }, { label: '2 : 1 =', answer: '2' }, { label: '3 : 1 =', answer: '3' },
          { label: 'Nhận xét: Số nào nhân với 1 cũng bằng', answer: 'chính số đó', validate: textValidate('chính số đó') },
          { label: 'Nhận xét: Số nào chia cho 1 cũng bằng', answer: 'chính số đó', validate: textValidate('chính số đó') },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính (theo mẫu). ' + mau('1 × 3 = 1 + 1 + 1 = 3. Vậy: 1 × 3 = 3.'),
        blanks: [
          { label: '1 × 4 =', answer: '4' }, { label: '1 × 5 =', answer: '5' }, { label: '1 × 7 =', answer: '7' }, { label: '1 × 8 =', answer: '8' },
          { label: 'Nhận xét: Số 1 nhân với số nào cũng bằng', answer: 'chính số đó', validate: textValidate('chính số đó') },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Số? (đường đua)',
        blanks: [
          { label: '2 × 8 =', answer: '16' }, { label: '1 × 8 =', answer: '8' }, { label: '15 : 5 =', answer: '3' },
          { label: '7 × 6 =', answer: '42' }, { label: '6 × 1 =', answer: '6' }, { label: '4 × 5 =', answer: '20' },
          { label: '18 : 3 =', answer: '6' }, { label: '16 : 4 =', answer: '4' }, { label: '3 × 9 =', answer: '27' },
          { label: '6 : 1 =', answer: '6' }, { label: '9 × 1 =', answer: '9' }, { label: '7 : 1 =', answer: '7' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Mẹ của Lan mua về 3 chục bông hoa. Mẹ bảo Lan mang số bông hoa đó cắm đều vào 3 lọ. Hỏi Lan đã cắm mỗi lọ bao nhiêu bông hoa?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa mỗi lọ', answer: '10' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai8Circles,
        q: '5. Số? (mỗi hình tròn ở hàng trên bằng tích hai hình tròn liền kề ở hàng dưới)',
        blanks: [
          { label: 'Hàng 3 (3 hình), hình thứ 3', answer: '5' },
          { label: 'Hàng 2 (2 hình), hình thứ 1', answer: '5' },
          { label: 'Hàng 2 (2 hình), hình thứ 2', answer: '5' },
          { label: 'Hàng 1 (đỉnh)', answer: '25' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. a) Tính (theo mẫu). ' + mau('0 × 3 = 0 + 0 + 0 = 0. Vậy: 0 × 3 = 0.') + '\nb) Số?',
        blanks: [
          { label: 'a) 0 × 4 =', answer: '0' }, { label: 'a) 0 × 6 =', answer: '0' }, { label: 'a) 0 × 7 =', answer: '0' },
          { label: 'a) Nhận xét: Số 0 nhân với số nào cũng bằng', answer: '0' },
          { label: 'b) 0 × 2 =', answer: '0' }, { label: 'b) 0 × 5 =', answer: '0' }, { label: 'b) 0 × 8 =', answer: '0' }, { label: 'b) 0 × 9 =', answer: '0' },
          { label: 'b) 0 : 2 =', answer: '0' }, { label: 'b) 0 : 5 =', answer: '0' }, { label: 'b) 0 : 8 =', answer: '0' }, { label: 'b) 0 : 9 =', answer: '0' },
          { label: 'b) Nhận xét: Số 0 chia cho số nào khác 0 cũng bằng', answer: '0' },
        ],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Nối hai phép tính có cùng kết quả.',
        left: [{ id: 'l1', text: '4 × 3' }, { id: 'l2', text: '30 : 5' }, { id: 'l3', text: '15 : 3' }, { id: 'l4', text: '0 : 2' }],
        right: [{ id: 'r1', text: '12 : 2' }, { id: 'r2', text: '20 : 4' }, { id: 'r3', text: '3 × 4' }, { id: 'r4', text: '6 × 0' }],
        pairs: [['l1', 'r3'], ['l2', 'r1'], ['l3', 'r2'], ['l4', 'r4']],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Tổ Hai có 9 bạn, mỗi bạn góp 4 quyển vở để giúp đỡ các bạn vùng bị lũ lụt. Hỏi tổ Hai đã góp được bao nhiêu quyển vở?',
        wordProblem: true,
        blanks: [{ label: 'Số quyển vở', answer: '36' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Đường gấp khúc ABCDE có AB = BC = CD = DE = 4 cm. Viết tiếp vào chỗ chấm cho thích hợp: Độ dài đường gấp khúc ABCDE là ...',
        blanks: [{ label: 'Độ dài (cm)', answer: '16' }],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai8Flowchart,
        q: '5. Số?',
        blanks: [
          { label: 'Hình thoi (3 × 8)', answer: '24' },
          { label: 'Ô vuông (để 24 : 6 = 4, rồi 4 × ô vuông = 20)', answer: '5' },
        ],
      },
    ],
  },

  {
    id: 'bai-9', number: 9, title: 'Bảng nhân 6, bảng chia 6',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['×', 6, 6, 6, 6], ['', 5, 8, 9, 10], ['', blank(30), blank(48), blank(54), blank(60)]] },
          { label: 'b)', rows: [[':', 24, 18, 36, 42], ['', 6, 6, 6, 6], ['', blank(4), blank(3), blank(6), blank(7)]] },
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '42 : 6' }, { id: 'l2', text: '6 × 7' }, { id: 'l3', text: '6 × 9' },
          { id: 'l4', text: '18 : 6' }, { id: 'l5', text: '6 × 5' }, { id: 'l6', text: '36 : 6' },
        ],
        right: [
          { id: 'r54', text: '54' }, { id: 'r42', text: '42' }, { id: 'r3', text: '3' },
          { id: 'r7', text: '7' }, { id: 'r6', text: '6' }, { id: 'r30', text: '30' },
        ],
        pairs: [['l1', 'r7'], ['l2', 'r42'], ['l3', 'r54'], ['l4', 'r3'], ['l5', 'r30'], ['l6', 'r6']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi hộp có 6 chiếc bút chì màu. Hỏi 5 hộp như vậy có bao nhiêu chiếc bút chì màu?',
        wordProblem: true,
        blanks: [{ label: 'Số bút chì màu', answer: '30' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Xếp 48 cái bánh vào các hộp, mỗi hộp 6 cái. Hỏi xếp được bao nhiêu hộp bánh như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số hộp bánh', answer: '8' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [6, 12, blank(18), 24, blank(30), blank(36), blank(42), blank(48), blank(54), 60] },
          { label: 'b)', cells: [60, 54, 48, blank(42), blank(36), blank(30), blank(24), blank(18), blank(12), 6] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 6 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 6 đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        tables: [
          { label: 'a)', rows: [['×', 6, 6, 6, 6], ['', 3, 5, 7, 9], ['', blank(18), blank(30), blank(42), blank(54)]] },
          { label: 'b)', rows: [[':', 24, 36, 48, 60], ['', 6, 6, 6, 6], ['', blank(4), blank(6), blank(8), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai9Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'Hình lục giác (6 × 3)', answer: '18' },
          { label: 'Hình vuông (kết quả : 2)', answer: '9' },
          { label: 'Hình tròn (kết quả : 3)', answer: '3' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một phòng họp có 36 cái ghế ngồi. Người ta đã xếp ghế thành 6 hàng đều nhau.',
        wordProblem: true,
        blanks: [
          { label: 'a) Hỏi mỗi hàng có bao nhiêu cái ghế?', answer: '6' },
          { label: 'b) Trong một buổi họp, số người tham dự ngồi vừa đủ 5 hàng ghế. Hỏi buổi họp đó có bao nhiêu người tham dự?', answer: '30' },
        ],
      },
    ],
  },

  {
    id: 'bai-10', number: 10, title: 'Bảng nhân 7, bảng chia 7',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          { label: '7 × 6 =', answer: '42' },
          { label: '42 : 7 =', answer: '6' },
          { label: '42 : 6 =', answer: '7' },
          { label: '7 × 4 =', answer: '28' },
          { label: '28 : 4 =', answer: '7' },
          { label: '28 : 7 =', answer: '4' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '2. Khoanh vào chữ đặt trước câu trả lời đúng.\nCác hạt dẻ ghi các phép tính: 7 × 4, 7 × 5, 70 : 7, 7 × 7, 7 × 6, 7 × 2, 63 : 7, 7 × 3.\nCó mấy hạt dẻ ghi phép tính có kết quả bé hơn 35?',
        options: ['4', '5', '6', '7'],
        answer: 1,
        hints: ['Tính kết quả của cả 8 phép tính rồi đếm xem có bao nhiêu kết quả nhỏ hơn 35.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mỗi lọ cắm 7 bông hoa. Hỏi 6 lọ như vậy cắm bao nhiêu bông hoa?',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa', answer: '42' }],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '4. Nối hai phép tính có kết quả bằng nhau (theo mẫu).',
        left: [
          { id: 'l1', text: '7 × 5' }, { id: 'l2', text: '42 : 7' }, { id: 'l3', text: '14 : 2' },
          { id: 'l4', text: '21 : 7' }, { id: 'l5', text: '28 : 7' },
        ],
        right: [
          { id: 'r1', text: '30 : 5' }, { id: 'r2', text: '5 × 7' }, { id: 'r3', text: '24 : 6' },
          { id: 'r4', text: '49 : 7' }, { id: 'r5', text: '18 : 6' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r5'], ['l5', 'r3']],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [7, 14, blank(21), 28, blank(35), blank(42), blank(49), blank(56), blank(63), 70] },
          { label: 'b)', cells: [70, 63, blank(56), 49, blank(42), blank(35), blank(28), blank(21), blank(14), 7] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 7 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 7 đơn vị.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        tables: [
          { label: 'a)', rows: [['Thừa số', 7, 7, 7, 7], ['Thừa số', 3, 6, 7, 8], ['Tích', blank(21), blank(42), blank(49), blank(56)]] },
          { label: 'b)', rows: [['Số bị chia', 28, 35, 63, 70], ['Số chia', 7, 7, 7, 7], ['Thương', blank(4), blank(5), blank(9), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Một thanh tre dài 49 cm. Rô-bốt cắt thanh tre đó thành 7 đoạn dài bằng nhau.',
        wordProblem: true,
        blanks: [
          { label: 'a) Hỏi mỗi đoạn tre dài bao nhiêu xăng-ti-mét?', answer: '7' },
          { label: 'b) Nếu lấy 4 đoạn tre đó xếp thành một hình vuông thì tổng độ dài các cạnh của hình vuông đó là bao nhiêu xăng-ti-mét?', answer: '28' },
        ],
      },
      {
        type: 'compare', section: 'Tiết 2',
        q: '4. >; <; = ?',
        rows: [
          { left: '7 × 5', right: '7 × 9', answer: '<' },
          { left: '7 × 6', right: '6 × 7', answer: '=' },
          { left: '7 × 4', right: '6 × 4', answer: '>' },
        ],
      },
    ],
  },

  {
    id: 'bai-11', number: 11, title: 'Bảng nhân 8, bảng chia 8',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        tables: [
          { label: 'a)', rows: [['×', 8, 8, 8, 8], ['', 3, 5, 7, 9], ['', blank(24), blank(40), blank(56), blank(72)]] },
          { label: 'b)', rows: [[':', 32, 48, 64, 80], ['', 8, 8, 8, 8], ['', blank(4), blank(6), blank(8), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Số?',
        blanks: [
          { label: 'a) 8 × 5 =', answer: '40' },
          { label: 'a) 40 : 8 =', answer: '5' },
          { label: 'a) 40 : 5 =', answer: '8' },
          { label: 'b) 8 × 7 =', answer: '56' },
          { label: 'b) 56 : 8 =', answer: '7' },
          { label: 'b) 56 : 7 =', answer: '8' },
          { label: 'c) 8 × 6 =', answer: '48' },
          { label: 'c) 48 : 8 =', answer: '6' },
          { label: 'c) 48 : 6 =', answer: '8' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '3. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả bé nhất?',
        options: ['72 : 8', '8 × 1', '80 : 8', '8 × 2'],
        answer: 1,
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Có 64 viên bi chia đều vào 8 hộp. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Mỗi hộp có bao nhiêu viên bi?', answer: '8' },
          { label: 'b) 3 hộp bi như vậy có bao nhiêu viên bi?', answer: '24' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [8, 16, blank(24), blank(32), 40, blank(48), blank(56), blank(64), blank(72), 80] },
          { label: 'b)', cells: [80, blank(72), 64, 56, blank(48), blank(40), blank(32), blank(24), blank(16), 8] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 8 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 8 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai11Flowchart,
        q: '2. Số?',
        blanks: [
          { label: 'Hình lục giác (48 : 8)', answer: '6' },
          { label: 'Hình vuông (kết quả × 8)', answer: '48' },
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '72 : 8' }, { id: 'l2', text: '64 : 8' }, { id: 'l3', text: '8 × 3' },
          { id: 'l4', text: '30 : 5' }, { id: 'l5', text: '8 × 5' }, { id: 'l6', text: '8 × 4' },
        ],
        right: [
          { id: 'r9', text: '9' }, { id: 'r24', text: '24' }, { id: 'r8', text: '8' },
          { id: 'r40', text: '40' }, { id: 'r6', text: '6' }, { id: 'r32', text: '32' },
        ],
        pairs: [['l1', 'r9'], ['l2', 'r8'], ['l3', 'r24'], ['l4', 'r6'], ['l5', 'r40'], ['l6', 'r32']],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. a) Mỗi hộp có 8 cái bánh. Hỏi 5 hộp như vậy có bao nhiêu cái bánh?\nb) Có 48 cái bánh chia đều vào 8 khay để vào lò nướng. Hỏi mỗi khay có bao nhiêu cái bánh?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số cái bánh', answer: '40' },
          { label: 'b) Số cái bánh mỗi khay', answer: '6' },
        ],
      },
    ],
  },

  {
    id: 'bai-12', number: 12, title: 'Bảng nhân 9, bảng chia 9',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [
          ['Thừa số', 9, 9, 9, 9, 9, 9, 9, 9],
          ['Thừa số', 3, 5, 7, 9, 4, 6, 8, 10],
          ['Tích', blank(27), blank(45), blank(63), blank(81), blank(36), blank(54), blank(72), blank(90)],
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          ['Số bị chia', 36, 54, 90, 72, 81, 45, 63, 27],
          ['Số chia', 9, 9, 9, 9, 9, 9, 9, 9],
          ['Thương', blank(4), blank(6), blank(10), blank(8), blank(9), blank(5), blank(7), blank(3)],
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối hai phép tính có cùng kết quả (theo mẫu).',
        left: [
          { id: 'l1', text: '9 × 2' }, { id: 'l2', text: '54 : 9' }, { id: 'l3', text: '28 : 7' }, { id: 'l4', text: '9 × 5' },
        ],
        right: [
          { id: 'r1', text: '42 : 7' }, { id: 'r2', text: '6 × 3' }, { id: 'r3', text: '5 × 9' }, { id: 'r4', text: '36 : 9' },
        ],
        pairs: [['l1', 'r2'], ['l2', 'r1'], ['l3', 'r4'], ['l4', 'r3']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Cô Lan có 36 bông hoa hồng. Cô Lan cắm hoa vào các lọ, mỗi lọ có 9 bông hoa. Hỏi cô Lan cắm được bao nhiêu lọ hoa như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số lọ hoa', answer: '4' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          { label: 'a)', cells: [9, 18, blank(27), 36, blank(45), 54, blank(63), blank(72), 81, blank(90)] },
          { label: 'b)', cells: [90, 81, 72, blank(63), 54, blank(45), blank(36), blank(27), 18, blank(9)] },
        ],
        hints: ['a) Mỗi số trong dãy hơn số đứng trước nó 9 đơn vị.', 'b) Mỗi số trong dãy kém số đứng trước nó 9 đơn vị.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai12Flowchart,
        q: '2. Số?',
        blanks: [
          { label: 'Hình vuông thứ nhất (81 : 9)', answer: '9' },
          { label: 'Hình vuông thứ hai (kết quả × 3)', answer: '27' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '3. Khoanh vào chữ đặt dưới hình tam giác ghi phép tính có kết quả lớn hơn 7 và bé hơn 10.',
        options: ['A. 36 : 9', 'B. 9 × 2', 'C. 72 : 9', 'D. 63 : 9'],
        answer: 2,
        hints: ['Tính kết quả của cả 4 phép tính rồi tìm kết quả nằm trong khoảng lớn hơn 7 và bé hơn 10 (tức là bằng 8 hoặc 9).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Có 27 bạn tập nhảy dây. Cô giáo đã chia đều các bạn thành 9 nhóm. Hỏi:',
        wordProblem: true,
        blanks: [
          { label: 'a) Mỗi nhóm tập nhảy dây có mấy bạn?', answer: '3' },
          { label: 'b) 2 nhóm tập nhảy dây như vậy có bao nhiêu bạn?', answer: '6' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Tô màu đỏ vào hình tròn ghi phép tính có kết quả bé nhất, tô màu xanh vào hình tròn ghi phép tính có kết quả lớn nhất.\nCác hình tròn ghi: 90 : 9, 2 × 4, 9 × 1, 54 : 9.',
        blanks: [
          { label: 'Kết quả bé nhất (tô màu đỏ)', answer: '6' },
          { label: 'Kết quả lớn nhất (tô màu xanh)', answer: '10' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Dựa vào bảng nhân, chia hãy tính:',
        blanks: [
          { label: 'a) 9 × 5 =', answer: '45' },
          { label: 'b) 6 × 4 =', answer: '24' },
          { label: 'c) 72 : 9 =', answer: '8' },
          { label: 'd) 42 : 6 =', answer: '7' },
        ],
      },
      {
        type: 'table', section: 'Tiết 3',
        q: '2. Số?',
        tables: [
          { label: 'a)', rows: [['×', 9, 7, 8], ['', 3, 4, 10], ['', blank(27), blank(28), blank(80)]] },
          { label: 'b)', rows: [[':', 45, 36, 70], ['', 5, 6, 7], ['', blank(9), blank(6), blank(10)]] },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. a) Mỗi đội múa rồng có 9 người. Hỏi 3 đội múa rồng như vậy có bao nhiêu người?\nb) Nếu tất cả số người múa rồng ở câu a chuyển sang múa lân, mỗi đội 3 người thì được bao nhiêu đội múa lân?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số người múa rồng', answer: '27' },
          { label: 'b) Số đội múa lân', answer: '9' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Tìm hai số bé hơn 5 và có thương là 2.',
        wordProblem: true,
        blanks: [
          {
            label: 'Hai số đó là: ... và ...',
            answer: '4,2',
            validate: (value) => {
              const parts = String(value).split(/[,;]+/).map(s => parseFloat(String(s).trim()));
              if (parts.length !== 2 || parts.some(Number.isNaN)) return false;
              const [a, b] = parts;
              return a < 5 && b < 5 && b !== 0 && a / b === 2;
            },
          },
        ],
        hints: ['Có nhiều đáp số đúng, ví dụ 4 và 2 (vì 4 : 2 = 2), miễn là cả hai số đều bé hơn 5.'],
      },
    ],
  },

  {
    id: 'bai-13', number: 13, title: 'Tìm thành phần trong phép nhân, phép chia',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... × 4 = 12', answer: '3' },
          { label: 'b) 8 × ... = 40', answer: '5' },
          { label: 'c) ... × 9 = 45', answer: '5' },
        ],
      },
      {
        type: 'table', section: 'Tiết 1',
        q: '2. Số?',
        rows: [
          ['Thừa số', 9, blank(6), 8, blank(4), 4],
          ['Thừa số', 6, 5, blank(9), 7, blank(10)],
          ['Tích', 54, 30, 72, 28, 40],
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: '? × 6 = 24' },
          { id: 'l2', text: '? × 5 = 45' },
          { id: 'l3', text: '7 × ? = 49' },
          { id: 'l4', text: '9 × ? = 72' },
        ],
        right: [
          { id: 'r4', text: 'Thừa số cần tìm là 4.' },
          { id: 'r9', text: 'Thừa số cần tìm là 9.' },
          { id: 'r8', text: 'Thừa số cần tìm là 8.' },
          { id: 'r7', text: 'Thừa số cần tìm là 7.' },
        ],
        pairs: [['l1', 'r4'], ['l2', 'r9'], ['l3', 'r7'], ['l4', 'r8']],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Có 6 can nước mắm như nhau chứa được tất cả 54 l nước mắm. Hỏi mỗi can đó chứa được bao nhiêu lít nước mắm?',
        wordProblem: true,
        blanks: [{ label: 'Số lít nước mắm mỗi can', answer: '9' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: 'a) ... : 4 = 9', answer: '36' },
          { label: 'a) ... : 7 = 5', answer: '35' },
          { label: 'a) ... : 8 = 6', answer: '48' },
          { label: 'b) 18 : ... = 2', answer: '9' },
          { label: 'b) 42 : ... = 7', answer: '6' },
          { label: 'b) 40 : ... = 8', answer: '5' },
        ],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Số?',
        rows: [
          ['Số bị chia', 72, 45, 36, blank(28), blank(60)],
          ['Số chia', 8, blank(9), blank(4), 7, 6],
          ['Thương', 9, 5, 9, 4, 10],
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Có 30 khách du lịch đi tham quan trên các thuyền. Biết rằng mỗi thuyền có 6 khách du lịch. Hỏi có mấy thuyền chở khách du lịch như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số thuyền', answer: '5' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Viết các phép tính thích hợp vào chỗ chấm.\nTừ ba trong các số 35, 3, 7, 5, 24, lập được các phép nhân hoặc phép chia thích hợp là: ...',
        blanks: [
          { label: 'Phép tính', answer: '5 × 7 = 35', validate: factFamilyValidate(5, 7, 35) },
        ],
        hints: ['Trong các số đã cho, chỉ có 5, 7 và 35 lập thành một "họ phép tính" đúng — viết một trong bốn phép tính: 5 × 7 = 35, 7 × 5 = 35, 35 : 5 = 7 hoặc 35 : 7 = 5.'],
      },
    ],
  },

  {
    id: 'bai-14', number: 14, title: 'Một phần mấy',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai14Circles,
        q: '1. Đ, S?\nQuan sát hình rồi cho biết mỗi nhận định sau đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) Đã tô màu 1/5 hình tròn.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Đã tô màu 1/6 hình tròn.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Đã tô màu 1/2 hình tròn.', answer: 'S', validate: dsValidate(false) },
          { label: 'd) Đã tô màu 1/3 hình tròn.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Đếm hình tròn được chia thành mấy phần bằng nhau rồi so với số phần đã tô màu xanh.', 'Ở hình c), đường chia không đi qua đúng tâm hình tròn nên hai phần không bằng nhau — phần tô màu bé hơn một nửa hình tròn.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'l1', text: 'Một phần hai' },
          { id: 'l2', text: 'Một phần năm' },
          { id: 'l3', text: 'Một phần ba' },
          { id: 'l4', text: 'Một phần sáu' },
          { id: 'l5', text: 'Một phần tư' },
        ],
        right: [
          { id: 'r12', text: '1/2' },
          { id: 'r15', text: '1/5' },
          { id: 'r16', text: '1/6' },
          { id: 'r13', text: '1/3' },
          { id: 'r14', text: '1/4' },
        ],
        pairs: [['l1', 'r12'], ['l2', 'r15'], ['l3', 'r13'], ['l4', 'r16'], ['l5', 'r14']],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai14Grids,
        q: '3. Viết dấu "x" vào ô trống dưới hình đã tô màu 1/3 số hình tròn của hình đó.\nHình nào (bên trái hay bên phải) đã tô màu đúng 1/3 số hình tròn của hình đó?',
        options: ['Hình bên trái', 'Hình bên phải'],
        answer: 0,
        hints: ['Đếm tổng số hình tròn và số hình tròn đã tô màu xanh ở mỗi hình rồi rút gọn thành "1 phần mấy".'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai14Shapes,
        q: '4. Tô màu 1/5 mỗi hình sau.\nMỗi hình dưới đây có 5 phần bằng nhau — cần tô màu mấy phần để được 1/5 hình đó?',
        blanks: [
          { label: 'Hình bậc thang (5 ô vuông)', answer: '1' },
          { label: 'Hình bông hoa (5 hình tròn)', answer: '1' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai14T2Squares,
        q: '1. Đ, S?\nQuan sát hình rồi cho biết mỗi nhận định sau đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) Đã tô màu 1/8 hình vuông.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Đã tô màu 1/5 hình vuông.', answer: 'S', validate: dsValidate(false) },
          { label: 'c) Đã tô màu 1/9 hình vuông.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) Đã tô màu 1/7 hình vuông.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Đếm hình vuông được chia thành mấy phần bằng nhau rồi so với số phần đã tô màu xanh.', 'Ở hình b), hình vuông có 6 phần bằng nhau (không phải 5) và chỉ 1 phần tô màu — vậy phần tô màu là 1/6, không phải 1/5.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai14T2Circles2a,
        q: '2a. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐã tô màu 1/7 hình nào?',
        options: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
        answer: 2,
        hints: ['Đếm số phần bằng nhau của mỗi hình tròn — hình cần tìm phải có đúng 7 phần bằng nhau.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai14T2Circles2b,
        q: '2b. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐã tô màu 1/9 hình nào?',
        options: ['Hình A', 'Hình B', 'Hình C', 'Hình D'],
        answer: 3,
        hints: ['Đếm số phần bằng nhau của mỗi hình tròn — hình cần tìm phải có đúng 9 phần bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai14T2Shapes3,
        q: '3. Tô màu 1/8 mỗi hình sau.\nMỗi hình dưới đây có 8 phần bằng nhau — cần tô màu mấy phần để được 1/8 hình đó?',
        blanks: [
          { label: 'a) Hình vuông có 2 đường chéo và 1 hình thoi ở giữa', answer: '1' },
          { label: 'b) Lưới hình chữ nhật (4 cột × 2 hàng)', answer: '1' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai14T2Shapes4,
        q: '4. Viết dấu "x" vào ô trống dưới hình đã tô màu 1/5 số ô vuông của hình đó.\nHình nào đã tô màu đúng 1/5 số ô vuông của hình đó? (có thể có nhiều đáp án đúng)',
        options: ['Hình a) (hình chữ thập, 5 ô)', 'Hình b) (lưới 5×3, cột giữa)', 'Hình c) (lưới 3×2, hàng giữa)'],
        multi: true,
        answer: [0, 1],
        hints: ['Đếm tổng số ô vuông của mỗi hình và số ô đã tô màu xanh rồi rút gọn thành "1 phần mấy".', 'Hình c) có 6 ô vuông và 3 ô tô màu, tức là 3/6 = 1/2, không phải 1/5.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai14T2FishFlowers,
        q: '5. a) Tô màu 1/2 số con cá rồi viết số thích hợp vào ô trống.\nb) Tô màu 1/4 số bông hoa rồi viết số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 1/2 số con cá là ... con cá.', answer: '3' },
          { label: 'b) 1/4 số bông hoa là ... bông hoa.', answer: '4' },
        ],
      },
    ],
  },

  {
    id: 'bai-15', number: 15, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 7 × 4 =', answer: '28' }, { label: 'a) 8 × 6 =', answer: '48' }, { label: 'a) 9 × 5 =', answer: '45' }, { label: 'a) 6 × 9 =', answer: '54' },
          { label: 'b) 5 × 8 =', answer: '40' }, { label: 'b) 4 × 9 =', answer: '36' }, { label: 'b) 8 × 8 =', answer: '64' }, { label: 'b) 3 × 7 =', answer: '21' },
        ],
      },
      {
        type: 'choice', section: 'Tiết 1', img: imgBai15Clouds,
        q: '2. Tô màu vào những đám mây ghi phép tính có kết quả bé hơn 7.',
        options: ['28 : 7', '35 : 5', '45 : 9', '48 : 8', '72 : 9'],
        multi: true,
        answer: [0, 2, 3],
        hints: ['Tính kết quả của cả 5 phép tính rồi so sánh với 7 — chỉ chọn những kết quả thực sự bé hơn 7 (35 : 5 = 7 không tính vì bằng 7, không bé hơn).'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai15Flowchart,
        q: '3. Số?',
        blanks: [
          { label: 'a) ... × 8 = 56', answer: '7' },
          { label: 'b) ... : 7 = 6', answer: '42' },
          { label: 'c) 5 × ... = 45', answer: '9' },
          { label: 'd) 45 : ... = 9', answer: '5' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Mai xếp mỗi bàn 6 cái li và xếp 8 bàn như vậy. Hỏi Mai xếp tất cả bao nhiêu cái li?',
        wordProblem: true,
        blanks: [{ label: 'Số cái li', answer: '48' }],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai15Triangles,
        q: '5. Số?\n(Ở mỗi hình tam giác: hình vuông bên trái = hình tròn trái × hình tròn đỉnh; hình vuông bên phải = hình tròn phải × hình tròn đỉnh; hình vuông giữa hàng dưới = hình tròn trái × hình tròn phải.)',
        blanks: [
          { label: 'b) Hình vuông bên trái (6 × 2)', answer: '12' },
          { label: 'b) Hình vuông bên phải (5 × 2)', answer: '10' },
          { label: 'c) Hình vuông bên trái (7 × 9)', answer: '63' },
          { label: 'c) Hình vuông bên phải (8 × 9)', answer: '72' },
          { label: 'c) Hình vuông giữa, hàng dưới (7 × 8)', answer: '56' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: '5 × 7 =', answer: '35' }, { label: '6 × 8 =', answer: '48' }, { label: '9 × 7 =', answer: '63' }, { label: '8 × 4 =', answer: '32' },
          { label: '7 × 5 =', answer: '35' }, { label: '8 × 6 =', answer: '48' }, { label: '7 × 9 =', answer: '63' }, { label: '4 × 8 =', answer: '32' },
          { label: '35 : 5 =', answer: '7' }, { label: '48 : 6 =', answer: '8' }, { label: '63 : 9 =', answer: '7' }, { label: '32 : 8 =', answer: '4' },
          { label: '35 : 7 =', answer: '5' }, { label: '48 : 8 =', answer: '6' }, { label: '63 : 7 =', answer: '9' }, { label: '32 : 4 =', answer: '8' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Mẹ của Nam mua về 21 quả cam. Mẹ bảo Nam xếp cam vào các đĩa, mỗi đĩa 7 quả. Hỏi Nam xếp được bao nhiêu đĩa cam như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số đĩa cam', answer: '3' }],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai15T2Shapes,
        q: '3a. Viết dấu "x" vào ô trống dưới hình đã tô màu 1/6 hình đó.\nHình nào đã tô màu đúng 1/6 hình đó? (có thể có nhiều đáp án đúng)',
        options: ['Hình lục giác (6 phần)', 'Hình ngũ giác (5 phần)', 'Hình chữ nhật (lưới 3×2)'],
        multi: true,
        answer: [0, 2],
        hints: ['Đếm tổng số phần bằng nhau của mỗi hình rồi so với số phần tô màu — hình cần tìm phải có đúng 6 phần bằng nhau.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai15T2Stars,
        q: '3b. Số?',
        blanks: [
          { label: '1/8 số ngôi sao là ... ngôi sao.', answer: '3' },
          { label: '1/4 số ngôi sao là ... ngôi sao.', answer: '6' },
        ],
        hints: ['Đếm tổng số ngôi sao rồi chia cho 8 hoặc chia cho 4.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4a. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả lớn nhất?',
        options: ['A. 6 × 5', 'B. 4 × 7', 'C. 3 × 9', 'D. 8 × 4'],
        answer: 3,
        hints: ['Tính kết quả của cả 4 phép tính rồi so sánh.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4b. Khoanh vào chữ đặt trước câu trả lời đúng.\nPhép tính nào dưới đây có kết quả bé nhất?',
        options: ['A. 16 : 2', 'B. 42 : 6', 'C. 70 : 7', 'D. 72 : 8'],
        answer: 1,
        hints: ['Tính kết quả của cả 4 phép tính rồi so sánh.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai15T2Flowchart,
        q: '5. Số?',
        blanks: [
          { label: 'a) Hình tam giác (32 : 4)', answer: '8' },
          { label: 'a) Ô vuông (kết quả × ... = 48)', answer: '6' },
          { label: 'b) Hình tam giác (6 × 6)', answer: '36' },
          { label: 'b) Ô vuông (kết quả : ... = 9)', answer: '4' },
        ],
      },
    ],
  },

  {
    id: 'bai-16', number: 16, title: 'Điểm ở giữa, trung điểm của đoạn thẳng',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16Segment,
        q: '1. Đ, S?\nQuan sát hình vẽ (các điểm A, B, C, D, E) rồi cho biết mỗi nhận định sau đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) B là trung điểm của đoạn thẳng AC.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) D là trung điểm của đoạn thẳng CE.', answer: 'S', validate: dsValidate(false) },
          { label: 'c) C là điểm ở giữa hai điểm B và D.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) D là điểm ở giữa hai điểm C và E.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Trung điểm phải cách đều hai đầu đoạn thẳng — đếm số ô vuông từ mỗi điểm.', 'D và E rất gần nhau trong khi C cách D tới 3 ô, nên D không cách đều C và E — D không phải trung điểm của CE.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16Segments2,
        q: '2. Quan sát hình vẽ rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          {
            label: 'a) Các nhóm ba điểm thẳng hàng là: ...',
            answer: 'A, M, B và C, N, D',
            validate: (value) => {
              const groups = String(value).split(/và|;/i).map(g => g.trim()).filter(Boolean);
              if (groups.length !== 2) return false;
              const norm = (g) => g.split(/[,\s]+/).filter(Boolean).map(s => s.trim().toUpperCase()).sort().join(',');
              const got = groups.map(norm).sort();
              const exp = [['A', 'M', 'B'].sort().join(','), ['C', 'N', 'D'].sort().join(',')].sort();
              return JSON.stringify(got) === JSON.stringify(exp);
            },
          },
          { label: 'b) M là điểm ở giữa hai điểm ... và ...', answer: 'A,B', validate: setValidate(['A', 'B']) },
          {
            label: 'b) M là trung điểm của đoạn thẳng ...',
            answer: 'AB',
            validate: (value) => String(value).toUpperCase().replace(/[^A-Z]/g, '').split('').sort().join('') === 'AB',
          },
          { label: 'c) ... là điểm ở giữa hai điểm C và D.', answer: 'N', validate: setValidate(['N']) },
        ],
        hints: ['O nằm bên dưới đường thẳng CD nên không thẳng hàng với C, N, D — chỉ có hai nhóm ba điểm thẳng hàng trong hình.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16Trapezoid,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Trung điểm của đoạn thẳng CD là điểm ...', answer: 'Q', validate: setValidate(['Q']) },
          { label: 'b) Trung điểm của đoạn thẳng MQ là điểm ...', answer: 'P', validate: setValidate(['P']) },
        ],
        hints: ['Đếm số ô vuông từ M đến N và từ N đến Q, rồi từ M đến P và từ P đến Q — trung điểm phải cách đều hai đầu đoạn MQ.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai16NumberLine,
        q: '4. Cho biết vị trí nhà và khoảng cách giữa các nhà của các bạn Nghêu, Sò, Ốc, Hến như hình vẽ. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Nhà các bạn ... và ... ở giữa nhà Nghêu và nhà Hến.', answer: 'Sò,Ốc', validate: setValidate(['Sò', 'Ốc']) },
          { label: 'b) Nhà bạn ... ở chính giữa quãng đường từ nhà Nghêu đến nhà Hến.', answer: 'Sò', validate: setValidate(['Sò']) },
        ],
        hints: ['Đếm số ô vuông từ nhà Nghêu đến từng nhà — nhà ở chính giữa phải cách đều nhà Nghêu và nhà Hến.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai16T2Ruler,
        q: '1. Xác định trung điểm của đoạn thẳng AB và đoạn thẳng AC.',
        blanks: [
          { label: 'Trung điểm của đoạn thẳng AB cách điểm A ... cm.', answer: '2' },
          { label: 'Trung điểm của đoạn thẳng AC cách điểm A ... cm.', answer: '5' },
        ],
        hints: ['Xem trên thước: A ở vạch 0cm, B ở vạch 4cm, C ở vạch 10cm — trung điểm cách đều hai đầu đoạn thẳng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai16T2Kangaroo,
        q: '3. Một cây cầu đá có 11 tảng đá. Chú chuột túi đang ở tảng đá ghi số 1 (như hình vẽ). Mỗi lần nhảy, chuột túi sẽ nhảy từ một tảng đá sang tảng đá ghi số liền sau nó. Vậy: Chuột túi cần nhảy thêm bao nhiêu lần để đến được tảng đá chính giữa của cây cầu?',
        blanks: [{ label: 'Số lần cần nhảy thêm', answer: '4' }],
        hints: ['Cây cầu có 11 tảng đá ghi số từ 0 đến 10 — tảng đá chính giữa ghi số 5.'],
      },
    ],
  },
  {
    id: 'bai-17', number: 17, title: 'Hình tròn. Tâm, bán kính, đường kính của hình tròn',
    questions: [
      {
        type: 'fill', img: imgBai17Circles,
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Hình tròn tâm ...', answer: 'I' },
          { label: 'a) Bán kính là các đoạn thẳng ...', answer: 'IA, IB', validate: letterGroupsValidate(['IA', 'IB']) },
          { label: 'b) Hình tròn tâm ...', answer: 'O' },
          { label: 'b) Bán kính là các đoạn thẳng ...', answer: 'OM, ON', validate: letterGroupsValidate(['OM', 'ON']) },
          { label: 'b) Đường kính là đoạn thẳng ...', answer: 'MN', validate: letterGroupsValidate(['MN']) },
        ],
        hints: [
          'Bán kính nối tâm hình tròn với một điểm trên đường tròn — ở hình a) có hai bán kính là IA và IB.',
          'Đường kính là đoạn thẳng đi qua tâm, nối hai điểm trên đường tròn — ở hình b) đó là đoạn MN, và bán kính là OM, ON.',
        ],
      },
      {
        type: 'fill', img: imgBai17Bees,
        q: '3. Viết số thích hợp vào chỗ chấm.\nTrong hình vẽ bên có ba hình tròn, mỗi hình tròn đều có bán kính 9cm. Chú ong bay đi lấy mật từ điểm A đến điểm C theo đường gấp khúc ABC. Vậy chú ong đã bay ... cm.',
        blanks: [{ label: 'Độ dài đường gấp khúc ABC', answer: '36' }],
        hints: [
          'A, B, C là tâm của ba hình tròn đôi một tiếp xúc nhau, nên AB = BC = 9 + 9 = 18cm.',
          'Độ dài đường gấp khúc ABC = AB + BC = 18 + 18 = 36cm.',
        ],
      },
    ],
  },
  {
    id: 'bai-18', number: 18, title: 'Góc, góc vuông, góc không vuông',
    questions: [
      {
        type: 'fill', img: imgBai18Angles,
        q: '1. Dùng ê ke để kiểm tra góc vuông rồi viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình vẽ có:',
        blanks: [
          { label: 'a) Các góc vuông là: Góc đỉnh ...; cạnh ..., ...', answer: 'A, AB, AC', validate: bai18RightAngles },
          { label: 'a) Góc vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'R, RQ, RP', validate: bai18RightAngles },
          { label: 'b) Các góc không vuông là: Góc đỉnh ...; cạnh ..., ...', answer: 'I, IL, IT', validate: bai18OtherAngles },
          { label: 'b) Góc không vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'M, MN, MP', validate: bai18OtherAngles },
          { label: 'b) Góc không vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'G, GH, GK', validate: bai18OtherAngles },
          { label: 'b) Góc không vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'E, EX, EY', validate: bai18OtherAngles },
        ],
        hints: [
          'Dùng ê ke áp vào từng góc: góc vuông là góc mà ê ke áp khít vào cả hai cạnh.',
          'Hai góc vuông trong hình là góc đỉnh A (cạnh AB, AC) và góc đỉnh R (cạnh RQ, RP) — bốn góc còn lại (đỉnh I, M, G, E) đều không vuông.',
        ],
      },
      {
        type: 'choice', img: imgBai18Shapes,
        q: '3. Tô màu vào hình có nhiều góc vuông nhất.\nHình nào có nhiều góc vuông nhất?',
        options: ['Hình 1', 'Hình 2', 'Hình 3'],
        answer: 2,
        hints: [
          'Hình 1 (hình chữ nhật) có 4 góc vuông. Hình 2 bị cắt một góc nên chỉ còn 3 góc vuông.',
          'Hình 3 có thêm một chỗ khuyết vuông góc nên có tới 5 góc vuông — nhiều nhất trong ba hình.',
        ],
      },
    ],
  },
  {
    id: 'bai-19', number: 19, title: 'Hình tam giác, hình tứ giác. Hình chữ nhật, hình vuông',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Viết tên các đỉnh và các cạnh của mỗi hình (theo mẫu).',
        headers: [
          `<img class="e3-q-img" style="max-width:120px;margin-top:0" src="${imgBai19Shape1}" alt="Hình tam giác DEH (mẫu)">`,
          `<img class="e3-q-img" style="max-width:120px;margin-top:0" src="${imgBai19Shape2}" alt="Hình tam giác SAC">`,
          `<img class="e3-q-img" style="max-width:120px;margin-top:0" src="${imgBai19Shape3}" alt="Hình tứ giác IKNM">`,
        ],
        rows: [
          { label: 'Các đỉnh', cells: ['D, E, H', blank('A, S, C', { validate: letterGroupsValidate(['A', 'S', 'C']) }), blank('I, K, M, N', { validate: letterGroupsValidate(['I', 'K', 'M', 'N']) })] },
          { label: 'Các cạnh', cells: ['DE, EH, HD', blank('SA, AC, CS', { validate: letterGroupsValidate(['SA', 'AC', 'CS']) }), blank('IK, KM, MN, NI', { validate: letterGroupsValidate(['IK', 'KM', 'MN', 'NI']) })] },
        ],
        hints: ['Đi vòng quanh hình theo đúng thứ tự các đỉnh nối tiếp nhau, giống cách làm ở cột mẫu.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai19Trapezoid,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nTrong hình vẽ bên có:',
        blanks: [
          { label: 'a) Các hình tam giác là: ...', answer: 'ABI, ICD, IBC', validate: letterGroupsValidate(['ABI', 'ICD', 'IBC']) },
          { label: 'b) Các hình tứ giác là: ...', answer: 'ABCI, IBCD, ABCD', validate: letterGroupsValidate(['ABCI', 'IBCD', 'ABCD']) },
        ],
        hints: [
          'Hai tam giác nhỏ hai bên là ABI và ICD; tam giác ở giữa là IBC (hai cạnh IB, IC và đáy BC).',
          'Ghép hai tam giác liền kề được một tứ giác: ABI + IBC = tứ giác ABCI; IBC + ICD = tứ giác IBCD. Cả hình lớn ABCD cũng là một tứ giác.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai19T2Q1aShapes,
        q: '1a. Tô màu vàng vào hình vuông, màu xanh vào hình chữ nhật.',
        blanks: [
          { label: 'Hình vuông (tô màu vàng) là hình ...', answer: 'MNPQ', validate: letterGroupsValidate(['MNPQ']) },
          { label: 'Hình chữ nhật (tô màu xanh) là hình ...', answer: 'CDIH', validate: letterGroupsValidate(['CDIH']) },
        ],
        hints: ['Đếm số ô vuông theo chiều ngang và chiều dọc của mỗi hình trên lưới — hình vuông có hai chiều bằng nhau.'],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai19T2Q1bShapes,
        q: '1b. Khoanh vào chữ đặt trước câu trả lời đúng.\nTrong hình vẽ có mấy hình chữ nhật?',
        options: ['1 hình', '2 hình', '3 hình', '4 hình'],
        answer: 1,
        hints: [
          'Hình chữ nhật phải có 4 góc vuông. Hai hình bị nghiêng (MNPQ và RTXY) không có góc vuông nên không phải hình chữ nhật.',
          'Chỉ có ABCD và EGIH là hình chữ nhật — 2 hình.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai19T2Colored,
        q: '2. Đ, S?\nDùng thước có vạch chia xăng-ti-mét để đo độ dài các đoạn thẳng trong hình đã cho, ta có:',
        blanks: [
          { label: 'a) Hình vuông có cạnh 5cm.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Hình chữ nhật có chiều rộng 4cm.', answer: 'S', validate: dsValidate(false) },
          { label: 'c) Hình chữ nhật có chiều dài 2cm.', answer: 'S', validate: dsValidate(false) },
        ],
        hints: [
          'Đo hình vuông: cạnh đúng bằng 5cm.',
          'Đo hình chữ nhật: chiều dài khoảng 5cm, chiều rộng khoảng 2,5cm — không khớp với "chiều rộng 4cm" hay "chiều dài 2cm".',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai19T2Tiles,
        q: '4. Viết số thích hợp vào chỗ chấm.\nMỗi viên gạch hoa trang trí có cạnh 5dm. Một hình chữ nhật được ghép bởi 6 viên gạch hoa như hình vẽ.',
        blanks: [
          { label: 'a) Chiều dài của hình chữ nhật đó là ... dm.', answer: '15' },
          { label: 'b) Chiều rộng của hình chữ nhật đó là ... dm.', answer: '10' },
        ],
        hints: ['Hình chữ nhật ghép bởi 3 viên gạch theo chiều dài và 2 viên gạch theo chiều rộng, mỗi viên cạnh 5dm.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai19T3Ant,
        q: '1. Viết số thích hợp vào chỗ chấm.\nCho ABCD là hình chữ nhật có BC = 20cm, CD = 50cm. Một con kiến đang ở điểm A (như hình vẽ).',
        blanks: [
          { label: 'a) Nếu con kiến muốn bò đến điểm B theo cạnh AB thì phải bò một đoạn đường dài ... cm.', answer: '50' },
          { label: 'b) Nếu con kiến muốn bò đến điểm D theo cạnh AD thì phải bò một đoạn đường dài ... cm.', answer: '20' },
          { label: 'c) Nếu con kiến muốn bò đến điểm C theo đường gấp khúc ABC thì phải bò một đoạn đường dài ... cm.', answer: '70' },
        ],
        hints: [
          'AB = DC = 50cm và AD = BC = 20cm (hai cặp cạnh đối diện của hình chữ nhật bằng nhau).',
          'Đường gấp khúc ABC = AB + BC = 50 + 20 = 70cm.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai19T3Snail,
        q: '2. Viết số thích hợp vào chỗ chấm.\nRùa và Ốc sên thi chạy. Hai bạn cùng xuất phát từ điểm M chạy đến đích ở điểm N nhưng theo hai đường khác nhau. Ốc sên chạy đến đích theo cạnh MN, còn Rùa chạy đến đích theo đường gấp khúc MQPN. Biết rằng MNPQ là hình chữ nhật có NP = 50cm.',
        blanks: [{ label: 'Đoạn đường Rùa chạy dài hơn đoạn đường Ốc sên chạy là ... cm.', answer: '100' }],
        hints: [
          'Rùa chạy MQ + QP + PN; Ốc sên chạy MN. Vì QP = MN (hai cạnh đối của hình chữ nhật) nên phần chênh lệch chỉ còn lại MQ + PN.',
          'MQ = PN = NP = 50cm, nên chênh lệch = 50 + 50 = 100cm.',
        ],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3a. Khoanh vào chữ đặt trước câu trả lời đúng.\nVới số lượng các que tính giống nhau nào dưới đây thì xếp được một hình vuông (không thừa que tính nào)?',
        options: ['6 que tính', '7 que tính', '8 que tính'],
        answer: 2,
        hints: ['Hình vuông có 4 cạnh bằng nhau nên tổng số que tính phải chia hết cho 4 — chỉ có 8 chia hết cho 4.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3b. Khoanh vào chữ đặt trước câu trả lời đúng.\nVới số lượng các que tính giống nhau nào dưới đây thì không thể xếp được một hình chữ nhật (không thừa que tính nào)?',
        options: ['6 que tính', '7 que tính', '10 que tính'],
        answer: 1,
        hints: ['Hình chữ nhật có 2 cặp cạnh bằng nhau nên tổng số que tính phải là số chẵn — 7 là số lẻ nên không thể xếp được.'],
      },
    ],
  },
  {
    // Bài 20 là bài "thực hành vẽ": hầu hết các bài tập đều là vẽ tay trên giấy
    // ô vuông (vẽ góc vuông, vẽ đường tròn, vẽ hình theo mẫu, vẽ trang trí) hoặc
    // tìm đồ vật quanh em — không thể chấm trên máy. Chỉ có Tiết 1 bài 2a là
    // câu hỏi đếm có đáp án xác định.
    id: 'bai-20', number: 20, title: 'Thực hành vẽ góc vuông, vẽ đường tròn, hình vuông, hình chữ nhật và vẽ trang trí',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai20Envelope,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Dùng ê ke để kiểm tra góc vuông, em tìm được trong hình bên có ... góc vuông.', answer: '5' },
        ],
        hints: [
          'Hình chiếc phong bì có một hình chữ nhật bao ngoài — riêng bốn góc của hình chữ nhật đã là 4 góc vuông.',
          'Nắp phong bì là hai nét chéo gặp nhau ở chính giữa cạnh dưới; áp ê ke vào đỉnh chữ V đó cũng được một góc vuông nữa, tất cả là 5 góc vuông.',
        ],
      },
    ],
  },
  {
    id: 'bai-21', number: 21, title: 'Khối lập phương, khối hộp chữ nhật',
    questions: [
      {
        type: 'fill', img: imgBai21Cube,
        q: '1. Số?\nChiếc khung sắt của rạp xiếc có dạng khối lập phương với các cạnh được sơn màu xanh và đen (như hình vẽ).',
        blanks: [
          { label: 'a) Khung sắt đó có tất cả ... cạnh màu đen, ... cạnh màu xanh.', answer: '4,8', validate: listValidate(['4', '8']) },
          { label: 'b) Nghệ sĩ xiếc ảo thuật cần lắp các tấm gỗ hình vuông vừa khít các mặt của chiếc khung đó. Nghệ sĩ cần dùng tất cả ... tấm gỗ như vậy.', answer: '6' },
        ],
        hints: [
          'Khối lập phương có 12 cạnh. Đếm trên hình: 4 cạnh chéo được sơn màu đen, 12 − 4 = 8 cạnh còn lại màu xanh.',
          'Khối lập phương có 6 mặt, mỗi mặt cần một tấm gỗ hình vuông nên cần 6 tấm.',
        ],
      },
      {
        type: 'fill', img: imgBai21Eraser,
        q: '2. Số?\nMột cục tẩy dạng khối hộp chữ nhật gồm hai nửa màu xám và màu xanh (như hình vẽ).',
        blanks: [
          { label: 'Khối hộp chữ nhật đó có ... đỉnh ở nửa màu xanh và ... đỉnh ở nửa màu xám.', answer: '4,4', validate: listValidate(['4', '4']) },
        ],
        hints: ['Khối hộp chữ nhật có 8 đỉnh. Cục tẩy được chia đôi ở giữa nên mỗi nửa giữ 4 đỉnh: 4 đỉnh ở nửa màu xanh và 4 đỉnh ở nửa màu xám.'],
      },
      {
        type: 'fill', img: imgBai21Blocks,
        q: '3. Số?\nTrong hình là các khối gỗ dạng khối lập phương đặt sát nhau. Một con kiến bò từ A đến B theo đường kẻ màu trắng (như hình vẽ).',
        blanks: [
          { label: 'Đường đi của con kiến đã chạm vào tất cả ... cạnh của các khối gỗ.', answer: '5' },
        ],
        hints: [
          'Điểm A nằm ngay trên một cạnh của khối gỗ thứ nhất và điểm B nằm ngay trên một cạnh của khối gỗ nhỏ cuối cùng — đó đã là 2 cạnh.',
          'Trên đường đi, con kiến còn vượt qua cạnh giữa hai khối gỗ liền nhau 3 lần nữa, tất cả là 2 + 3 = 5 cạnh.',
        ],
      },
      {
        type: 'fill', img: imgBai21Lantern,
        q: '4. Viết số thích hợp vào chỗ chấm.\nChú Tư làm những chiếc đèn lồng có khung dạng khối lập phương (như hình vẽ). Ở mỗi đỉnh của chiếc khung, chú Tư dùng một sợi dây lạt để buộc.',
        blanks: [
          { label: 'Để làm 5 chiếc khung đèn như vậy thì chú Tư cần dùng ... sợi dây lạt.', answer: '40' },
        ],
        hints: ['Mỗi khung dạng khối lập phương có 8 đỉnh nên cần 8 sợi dây lạt. Làm 5 chiếc khung cần 8 × 5 = 40 sợi dây lạt.'],
      },
      {
        // Câu 5a của sách là "tô màu xanh các cạnh mà nghệ sĩ đang bám vào" —
        // bài tô màu nên không đưa vào ứng dụng; chỉ giữ câu 5b có đáp án số.
        type: 'fill', img: imgBai21Artists,
        q: '5b. Số?\nBa nghệ sĩ xiếc đang biểu diễn trên chiếc khung thép dạng khối hộp chữ nhật (như hình vẽ).',
        blanks: [
          { label: 'Có ... cạnh của chiếc khung mà các nghệ sĩ không bám vào.', answer: '9' },
        ],
        hints: [
          'Khối hộp chữ nhật có 12 cạnh. Nhìn kĩ hình: bạn gái bám hai tay vào cùng một cạnh phía trên, chú nghệ sĩ nằm ngang bám hai tay vào cùng một cạnh đứng, bạn trồng chuối chống hai tay xuống cùng một cạnh dưới.',
          'Vậy chỉ có 3 cạnh được bám vào, còn lại 12 − 3 = 9 cạnh không có ai bám.',
        ],
      },
    ],
  },
  {
    id: 'bai-22', number: 22, title: 'Luyện tập chung',
    questions: [
      {
        type: 'choice', section: 'Tiết 1', img: imgBai22T1Rects,
        q: '1. Bạn Việt vẽ một hình chữ nhật trên giấy ô vuông rồi vẽ trung điểm mỗi cạnh của hình chữ nhật đó. Em hãy khoanh vào chữ đặt dưới hình mà bạn Việt đã vẽ.',
        options: ['Hình A', 'Hình B', 'Hình C'],
        answer: 2,
        hints: [
          'Trung điểm của một cạnh phải nằm đúng chính giữa cạnh đó — hãy đếm số ô vuông từ mỗi đầu cạnh đến chấm tròn.',
          'Hình A có chấm ở cạnh trái và cạnh dưới bị lệch, hình B có chấm ở cạnh trên bị lệch. Chỉ hình C có cả 4 chấm đều nằm đúng chính giữa mỗi cạnh.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai22T1Circles,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Dán bốn tờ giấy hình tròn bán kính 3cm vào một hình vuông (như hình vẽ). Vậy cạnh hình vuông đó dài ... cm.', answer: '12' },
        ],
        hints: [
          'Mỗi hình tròn có bán kính 3cm nên đường kính là 3 + 3 = 6cm.',
          'Theo mỗi cạnh của hình vuông có 2 hình tròn nằm sát nhau, vậy cạnh hình vuông dài 6 + 6 = 12cm.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai22T1Pond,
        q: '3. Viết số thích hợp vào chỗ chấm.\nNgôi nhà của gọng vó là một cái ao nhỏ hình chữ nhật, trong đó có các lá súng dạng hình tròn (như hình vẽ). Biết rằng các lá to có đường kính 10cm và các lá nhỏ có đường kính 5cm.',
        blanks: [
          { label: 'a) Chiều dài của cái ao là ... cm.', answer: '30' },
          { label: 'b) Chiều rộng của cái ao là ... cm.', answer: '20' },
        ],
        hints: [
          'Theo chiều dài (từ trên xuống) có 2 lá to và 2 lá nhỏ xếp sát nhau: 10 + 10 + 5 + 5 = 30cm.',
          'Theo chiều rộng (hàng trên cùng) có 2 lá nhỏ và 1 lá to xếp sát nhau: 5 + 5 + 10 = 20cm.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai22T2Figure,
        q: '1. Quan sát hình vẽ dưới đây rồi viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          {
            label: 'a) Trong hình vẽ có: Các hình tam giác là: ...',
            answer: 'ACD, ABC, BCE, ABG',
            validate: letterGroupsValidate(['ACD', 'ABC', 'BCE', 'ABG']),
          },
          {
            label: 'a) Các hình tứ giác là: ...',
            answer: 'ABCD, ACEB, ACBG, DCBG',
            validate: letterGroupsValidate(['ABCD', 'ACEB', 'ACBG', 'DCBG']),
          },
          { label: 'b) Dùng ê ke, em tìm được trong hình vẽ có tất cả ... góc vuông.', answer: '4' },
        ],
        hints: [
          'Ba điểm D, A, G nằm trên cùng một đường thẳng. Bốn hình tam giác là ACD, ABC, BCE và ABG.',
          'Ghép các tam giác liền kề lại được bốn hình tứ giác: ABCD, ACEB, ACBG và DCBG.',
          'Bốn góc vuông là: góc đỉnh C (cạnh CD, CA), góc đỉnh A (cạnh AC, AB), góc đỉnh B (cạnh BA, BG) và góc đỉnh B (cạnh BC, BE).',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai22T2Cube,
        q: '2. Số?\nGhép 8 khối lập phương nhỏ thành một khối lập phương lớn (như hình vẽ). Người ta sơn màu xanh bốn mặt xung quanh của khối lập phương lớn.',
        blanks: [
          { label: 'Như vậy, có tất cả ... mặt của các khối lập phương nhỏ được sơn màu xanh.', answer: '16' },
        ],
        hints: [
          'Mỗi mặt của khối lập phương lớn được ghép bởi 4 mặt của các khối lập phương nhỏ.',
          'Sơn 4 mặt xung quanh nên có 4 × 4 = 16 mặt của các khối lập phương nhỏ được sơn màu xanh.',
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai22T2ClocksA,
        q: '3a. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐồng hồ nào sau đây có kim giờ và kim phút tạo thành một góc vuông?',
        options: ['Đồng hồ A', 'Đồng hồ B', 'Đồng hồ C'],
        answer: 1,
        hints: [
          'Đồng hồ A chỉ 6 giờ — hai kim tạo thành một đường thẳng, không phải góc vuông. Đồng hồ C chỉ 10 giờ — góc nhỏ hơn góc vuông.',
          'Đồng hồ B chỉ 9 giờ: kim phút chỉ số 12, kim giờ chỉ số 9 nên hai kim tạo thành một góc vuông.',
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai22T2ClocksB,
        q: '3b. Khoanh vào chữ đặt trước câu trả lời đúng.\nĐồng hồ nào sau đây có kim giờ và kim phút tạo thành một góc không vuông?',
        options: ['Đồng hồ A', 'Đồng hồ B', 'Đồng hồ C'],
        answer: 2,
        hints: [
          'Đồng hồ A chỉ 9 giờ và đồng hồ B chỉ 3 giờ — cả hai đều có hai kim tạo thành góc vuông.',
          'Đồng hồ C chỉ 5 giờ: góc giữa hai kim lớn hơn góc vuông nên đó là góc không vuông.',
        ],
      },
    ],
  },
  {
    id: 'bai-23', number: 23, title: 'Nhân số có hai chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          { label: '12 × 3 =', answer: '36' }, { label: '22 × 4 =', answer: '88' },
          { label: '11 × 6 =', answer: '66' }, { label: '30 × 3 =', answer: '90' },
        ],
        hints: ['Nhân lần lượt từ phải sang trái: nhân hàng đơn vị trước, rồi nhân hàng chục.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Tính nhẩm (theo mẫu).\n' + mau('40 × 2 = ?  Nhẩm: 4 chục × 2 = 8 chục. Vậy: 40 × 2 = 80.'),
        blanks: [
          { label: '10 × 9 =', answer: '90' }, { label: '40 × 1 =', answer: '40' },
          { label: '20 × 2 =', answer: '40' }, { label: '30 × 2 =', answer: '60' },
        ],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '3. Nối (theo mẫu).',
        left: [
          { id: 's32', text: '32 + 32 + 32' },
          { id: 's11', text: '11 + 11 + 11 + 11' },
          { id: 's14', text: '14 + 14' },
        ],
        middle: [
          { id: 'm11', text: '11 × 4' },
          { id: 'm32', text: '32 × 3' },
          { id: 'm14', text: '14 × 2' },
        ],
        right: [
          { id: 'r28', text: '28' },
          { id: 'r44', text: '44' },
          { id: 'r96', text: '96' },
        ],
        pairs: [['s32', 'm32'], ['m32', 'r96'], ['s11', 'm11'], ['m11', 'r44'], ['s14', 'm14'], ['m14', 'r28']],
        hints: ['Một số được cộng lặp lại mấy lần thì viết thành phép nhân số đó với mấy, ví dụ 32 + 32 + 32 = 32 × 3 = 96.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Cô Mai cần 12 giờ để đan xong một chiếc mũ len. Hỏi cô Mai cần bao nhiêu giờ để đan được 4 chiếc mũ len như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số giờ', answer: '48' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.',
        blanks: [
          { label: '12 × 6 =', answer: '72' }, { label: '28 × 3 =', answer: '84' },
          { label: '45 × 2 =', answer: '90' }, { label: '24 × 4 =', answer: '96' },
        ],
        hints: ['Nhân hàng đơn vị trước: nếu được kết quả từ 10 trở lên thì viết chữ số hàng đơn vị và nhớ số chục sang hàng chục.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '2. Kết quả của mỗi phép tính được gắn với một chữ như sau:\nA: 11 × 2;  C: 13 × 3;  Đ: 25 × 3;  H: 42 × 2;\nI: 18 × 4;  O: 27 × 3;  U: 13 × 5.\nViết các chữ cái thích hợp vào ô trống (theo mẫu) rồi viết ô chữ giải được vào chỗ chấm.',
        tables: [
          { rows: [[sampleCell(75), 72, 22], [sampleCell('Đ'), blank('I', { validate: letterValidate('I') }), blank('A', { validate: letterValidate('A') })]] },
          { rows: [[75, 22, 81], [blank('Đ', { validate: letterValidate('Đ') }), blank('A', { validate: letterValidate('A') }), blank('O', { validate: letterValidate('O') })]] },
          { rows: [[39, 65], [blank('C', { validate: letterValidate('C') }), blank('U', { validate: letterValidate('U') })]] },
          { rows: [[39, 84, 72], [blank('C', { validate: letterValidate('C') }), blank('H', { validate: letterValidate('H') }), blank('I', { validate: letterValidate('I') })]] },
        ],
        blanks: [
          { label: 'Ô chữ giải được là: ...', answer: 'Địa đạo Củ Chi', validate: phraseValidate('Địa đạo Củ Chi') },
        ],
        hints: [
          'Tính kết quả của cả 7 phép tính trước: A = 22, C = 39, Đ = 75, H = 84, I = 72, O = 81, U = 65.',
          'Ghép các chữ cái tìm được theo thứ tự từng nhóm ô: ĐIA — ĐAO — CU — CHI, rồi thêm dấu để được tên một địa danh.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai23T2Puzzle,
        q: '3. Viết mỗi chữ số 1, 2, 3 vào một ô trống trong hình bên để được phép tính đúng.',
        blanks: [
          // One blank per empty box of the figure (two adjacent inline boxes
          // for the 2-digit number read as one long dotted line on screen).
          { label: 'Ô trống hàng trên, bên trái (chữ số hàng chục của thừa số thứ nhất):', answer: '1' },
          { label: 'Ô trống hàng trên, bên phải (chữ số hàng đơn vị của thừa số thứ nhất):', answer: '2' },
          { label: 'Ô trống hàng dưới (chữ số hàng chục của tích):', answer: '3' },
        ],
        hints: [
          'Chữ số hàng đơn vị của thừa số thứ nhất nhân với 3 phải có tận cùng là 6 — trong ba chữ số 1, 2, 3 chỉ có 2 × 3 = 6.',
          'Hai chữ số còn lại là 1 và 3: thử 12 × 3 = 36 (dùng đủ 1, 2, 3) và 32 × 3 = 96 (không có chữ số 9) — vậy phép tính là 12 × 3 = 36.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Mỗi ngày Nam đọc được 24 trang truyện. Hỏi sau 3 ngày, Nam đọc được bao nhiêu trang truyện?',
        wordProblem: true,
        blanks: [{ label: 'Số trang truyện', answer: '72' }],
      },
    ],
  },
  {
    id: 'bai-24', number: 24, title: 'Gấp một số lên một số lần',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [
          ['Số đã cho', sampleCell(3), 8, 11, 13, 14],
          ['Thêm vào số đã cho 7 đơn vị', sampleCell(10), blank(15), blank(18), blank(20), blank(21)],
          ['Gấp 7 lần số đã cho', sampleCell(21), blank(56), blank(77), blank(91), blank(98)],
        ],
        hints: ['"Thêm 7 đơn vị" là cộng thêm 7 (3 + 7 = 10); "gấp 7 lần" là nhân với 7 (3 × 7 = 21).'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối (theo mẫu).\nỞ mỗi khung, nối số bên trái với phép tính thích hợp rồi nối tới số bên phải.',
        // Each of the book's 4 framed boxes is one left number, two stacked
        // operation boxes and one right number; the left/right numbers span
        // both operation rows, with an empty spacer row between boxes.
        left: [
          { id: 'n5', text: '5', row: 1, span: 2 },
          { id: 'n11', text: '11', row: 4, span: 2 },
          { id: 'n17', text: '17', row: 7, span: 2 },
          { id: 'n24', text: '24', row: 10, span: 2 },
        ],
        middle: [
          { id: 'o5a', text: 'thêm 3 đơn vị', row: 1 }, { id: 'o5b', text: 'gấp 3 lần', row: 2 },
          { id: 'o11a', text: 'thêm 8 đơn vị', row: 4 }, { id: 'o11b', text: 'gấp 8 lần', row: 5 },
          { id: 'o17a', text: 'thêm 2 đơn vị', row: 7 }, { id: 'o17b', text: 'gấp 2 lần', row: 8 },
          { id: 'o24a', text: 'thêm 4 đơn vị', row: 10 }, { id: 'o24b', text: 'gấp 4 lần', row: 11 },
        ],
        right: [
          { id: 'e8', text: '8', row: 1, span: 2 },
          { id: 'e88', text: '88', row: 4, span: 2 },
          { id: 'e34', text: '34', row: 7, span: 2 },
          { id: 'e28', text: '28', row: 10, span: 2 },
        ],
        pairs: [
          ['n5', 'o5a'], ['o5a', 'e8'],
          ['n11', 'o11b'], ['o11b', 'e88'],
          ['n17', 'o17b'], ['o17b', 'e34'],
          ['n24', 'o24a'], ['o24a', 'e28'],
        ],
        hints: ['Thử cả hai phép tính: ví dụ 5 thêm 3 đơn vị là 5 + 3 = 8, còn 5 gấp 3 lần là 5 × 3 = 15 — chọn phép tính cho đúng số bên phải.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Năm nay con 5 tuổi, tuổi bố gấp 7 lần tuổi con. Hỏi năm nay bố bao nhiêu tuổi?',
        wordProblem: true,
        blanks: [{ label: 'Tuổi bố', answer: '35' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Có 8 bạn nữ và một số bạn nam tham gia bữa tiệc sinh nhật của Rô-bốt. Biết số bạn nam gấp 3 lần số bạn nữ. Hỏi có bao nhiêu bạn nam tham gia bữa tiệc sinh nhật của Rô-bốt?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn nam', answer: '24' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: 'a) 3 —thêm 7 đơn vị→ ...', answer: '10' },
          { label: 'b) 7 —gấp 9 lần→ ...', answer: '63' },
          { label: 'c) 8 —thêm 3 đơn vị→ ...', answer: '11' },
          { label: 'd) 3 —gấp 7 lần→ ...', answer: '21' },
        ],
        hints: ['"Thêm" là phép cộng, "gấp ... lần" là phép nhân.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đ, S?',
        blanks: [
          { label: 'a) Gấp 6 lên 3 lần thì được 18.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) Gấp 7 lên 5 lần thì được 30.', answer: 'S', validate: dsValidate(false) },
          { label: 'c) Thêm 3 đơn vị vào 6 thì được 18.', answer: 'S', validate: dsValidate(false) },
          { label: 'd) Thêm 5 đơn vị vào 7 thì được 12.', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: ['Gấp 7 lên 5 lần là 7 × 5 = 35; thêm 3 đơn vị vào 6 là 6 + 3 = 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Mỗi cái bánh có thể mời 3 bạn ăn chung. Hỏi với 9 cái bánh thì có thể mời bao nhiêu bạn ăn chung?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn', answer: '27' }],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '4. Tô màu các ô ghi phép tính có kết quả bằng 75.\nChọn tất cả các ô cần tô màu (có thể có nhiều đáp án đúng).',
        options: ['25 × 3', '90 − 15', '20 × 4', '17 × 5', '7 × 5', '15 × 5', '57 + 8', '16 × 3'],
        multi: true,
        answer: [0, 1, 5],
        hints: ['Tính kết quả của cả 8 phép tính: 25 × 3 = 75, 90 − 15 = 75, 20 × 4 = 80, 17 × 5 = 85, 7 × 5 = 35, 15 × 5 = 75, 57 + 8 = 65, 16 × 3 = 48.'],
      },
    ],
  },
  {
    id: 'bai-25', number: 25, title: 'Phép chia hết, phép chia có dư',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(35, 7), divBlank(45, 8), divBlank(23, 3), divBlank(45, 5)],
        hints: ['Tìm số lớn nhất nhân với số chia mà không vượt quá số bị chia — đó là thương; lấy số bị chia trừ đi tích đó được số dư.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '2. Tô màu đỏ vào ô ghi phép chia hết, màu vàng vào ô ghi phép chia có dư.\nChọn tất cả các ô cần tô màu đỏ (phép chia hết) — các ô còn lại tô màu vàng.',
        options: ['30 : 6', '42 : 7', '18 : 5', '27 : 9', '41 : 5', '34 : 4'],
        multi: true,
        answer: [0, 1, 3],
        hints: ['Phép chia hết có số dư là 0: 30 : 6 = 5, 42 : 7 = 6, 27 : 9 = 3. Còn 18 : 5 = 3 (dư 3), 41 : 5 = 8 (dư 1), 34 : 4 = 8 (dư 2) là phép chia có dư.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nCô giáo muốn chia 20 quả táo vào các đĩa. Các bạn Rô-bốt, Nam và Mai đưa ra các ý kiến về cách chia táo như sau:\n– Rô-bốt: "Chia đều số quả táo vào 2 đĩa";\n– Nam: "Chia đều số quả táo vào 3 đĩa";\n– Mai: "Chia đều số quả táo vào 4 đĩa".',
        blanks: [
          { label: 'Cách chia táo của ... cho ta phép chia hết.', answer: 'Rô-bốt và Mai', validate: nameSetValidate(['Rô-bốt', 'Mai']) },
        ],
        hints: ['20 : 2 = 10 và 20 : 4 = 5 là phép chia hết; 20 : 3 = 6 (dư 2) là phép chia có dư.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Lớp 3A có 30 học sinh được chia đều thành 6 nhóm để tổ chức hoạt động ngoại khoá. Hỏi mỗi nhóm như vậy có bao nhiêu học sinh?',
        wordProblem: true,
        blanks: [{ label: 'Số học sinh mỗi nhóm', answer: '5' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(18, 3), divBlank(23, 4), divBlank(41, 8), divBlank(48, 9)],
        hints: ['Số dư luôn phải bé hơn số chia.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(34, 3), divBlank(29, 5), divBlank(70, 9), divBlank(47, 8)],
        hints: ['Số dư luôn phải bé hơn số chia.'],
      },
      {
        type: 'choice', section: 'Tiết 2',
        q: '3. Tô màu vào những ô tô ghi phép chia có số dư là 4.\nChọn tất cả các ô tô cần tô màu (có thể có nhiều đáp án đúng).',
        options: ['49 : 5', '23 : 6', '22 : 9', '17 : 7', '42 : 7', '36 : 8', '27 : 3', '56 : 9'],
        multi: true,
        answer: [0, 2, 5],
        hints: ['Tìm số dư của từng phép chia: 49 : 5 = 9 (dư 4), 23 : 6 = 3 (dư 5), 22 : 9 = 2 (dư 4), 17 : 7 = 2 (dư 3), 42 : 7 = 6, 36 : 8 = 4 (dư 4), 27 : 3 = 9, 56 : 9 = 6 (dư 2).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Bà nướng được 36 cái bánh. Bà cho bánh nướng được vào các hộp, mỗi hộp 9 cái bánh. Hỏi bà nướng được bao nhiêu hộp bánh như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số hộp bánh', answer: '4' }],
      },
    ],
  },
  {
    id: 'bai-26', number: 26, title: 'Chia số có hai chữ số cho số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(46, 2), divBlank(55, 5), divBlank(96, 3), divBlank(84, 4)],
        hints: ['Chia lần lượt từ trái sang phải: chia hàng chục trước, rồi hạ hàng đơn vị xuống để chia tiếp.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(39, 3), divBlank(64, 2), divBlank(63, 3), divBlank(88, 2)],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Tính nhẩm (theo mẫu).\n' + mau('60 : 2 = ?  Nhẩm: 6 chục : 2 = 3 chục. Vậy: 60 : 2 = 30.'),
        blanks: [
          { label: '80 : 2 =', answer: '40' }, { label: '30 : 3 =', answer: '10' },
          { label: '90 : 3 =', answer: '30' }, { label: '40 : 2 =', answer: '20' },
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Số?',
        blanks: [
          { label: 'a) ... × 4 = 48', answer: '12' },
          { label: 'b) 5 × ... = 55', answer: '11' },
          { label: 'c) ... × 3 = 93', answer: '31' },
        ],
        hints: ['Muốn tìm một thừa số, ta lấy tích chia cho thừa số kia: 48 : 4, 55 : 5, 93 : 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(57, 3), divBlank(58, 2), divBlank(86, 7), divBlank(65, 4)],
        hints: ['Sau khi chia hàng chục, số dư của hàng chục được ghép với chữ số hàng đơn vị hạ xuống để chia tiếp (ví dụ 57 : 3: 5 : 3 = 1 dư 2, hạ 7 được 27, 27 : 3 = 9).'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai26T2Divisions,
        q: '2. Đ, S?\nQuan sát các phép chia trong hình rồi cho biết mỗi phép chia đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) 39 : 3 = 13', answer: 'Đ', validate: dsValidate(true) },
          { label: 'b) 35 : 2 = 12 (dư 1)', answer: 'S', validate: dsValidate(false) },
          { label: 'c) 89 : 5 = 17 (dư 4)', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) 53 : 4 = 13 (dư 1)', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: [
          'Thử lại bằng phép nhân: thương × số chia + số dư phải bằng số bị chia.',
          'Ở b), 3 − 2 = 1 rồi hạ 5 phải được 15 chứ không phải 5; 35 : 2 = 17 (dư 1), không phải 12.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Nam chia đều 60 quyển truyện vào 4 ngăn của giá sách. Hỏi mỗi ngăn chứa bao nhiêu quyển truyện?',
        wordProblem: true,
        blanks: [{ label: 'Số quyển truyện mỗi ngăn', answer: '15' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Bác An chia đều 40 cái kẹo cho 3 bạn nhỏ thì còn dư ra mấy cái kẹo?',
        wordProblem: true,
        blanks: [{ label: 'Số kẹo còn dư', answer: '1' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(53, 3), divBlank(67, 4), divBlank(35, 3), divBlank(99, 8)],
        hints: ['Số dư luôn phải bé hơn số chia.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Bà Huyền chuẩn bị 87 quả cam để làm các suất quà cho các hộ gia đình nghèo, mỗi suất quà có 3 quả cam. Hỏi bà Huyền chuẩn bị được bao nhiêu suất quà?',
        wordProblem: true,
        blanks: [{ label: 'Số suất quà', answer: '29' }],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Có 32 khách du lịch đi thuyền tham quan. Mỗi chiếc thuyền chở được 5 hành khách. Hỏi cần ít nhất mấy chiếc thuyền để chở hết số khách du lịch đó?',
        wordProblem: true,
        blanks: [{ label: 'Số thuyền ít nhất', answer: '7' }],
        hints: ['32 : 5 = 6 (dư 2): 6 thuyền chở được 30 khách, vẫn còn 2 khách nên cần thêm 1 thuyền nữa.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Số?',
        blanks: [
          { label: 'a) ... : 8 = 12', answer: '96' },
          { label: 'b) ... : 4 = 23', answer: '92' },
          { label: 'c) ... : 3 = 26', answer: '78' },
          { label: 'd) ... : 2 = 47', answer: '94' },
        ],
        hints: ['Muốn tìm số bị chia, ta lấy thương nhân với số chia: 12 × 8, 23 × 4, 26 × 3, 47 × 2.'],
      },
    ],
  },
  {
    id: 'bai-27', number: 27, title: 'Giảm một số đi một số lần',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Số?',
        blanks: [
          { label: 'a) 36 —giảm 2 lần→ ...', answer: '18' },
          { label: 'b) 48 —giảm 6 lần→ ...', answer: '8' },
          { label: 'c) 45 —giảm 3 lần→ ...', answer: '15' },
        ],
        hints: ['"Giảm một số đi mấy lần" là chia số đó cho số lần: 36 : 2, 48 : 6, 45 : 3.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Viết “gấp” hoặc “giảm” vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) 24 —... 4 lần→ 6', answer: 'giảm', validate: phraseValidate('giảm') },
          { label: 'b) 72 —... 6 lần→ 12', answer: 'giảm', validate: phraseValidate('giảm') },
          { label: 'c) 48 —... 2 lần→ 96', answer: 'gấp', validate: phraseValidate('gấp') },
          { label: 'd) 56 —... 4 lần→ 14', answer: 'giảm', validate: phraseValidate('giảm') },
        ],
        hints: ['Số ở ô bên phải lớn hơn số ở hình tròn thì là "gấp", bé hơn thì là "giảm". Thử lại: 24 : 4 = 6, 48 × 2 = 96.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Bác Bình thu hoạch được 78 kg cam. Tuy nhiên, do không bảo quản đúng cách nên có một lượng cam bị hỏng. Số ki-lô-gam cam còn lại so với lúc đầu giảm đi 3 lần. Hỏi bác Bình còn lại bao nhiêu ki-lô-gam cam?',
        wordProblem: true,
        blanks: [{ label: 'Số ki-lô-gam cam còn lại', answer: '26' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Viết “gấp 2 lần” hoặc “giảm 3 lần” vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) 18 —...→ 6 —...→ 12', answer: 'giảm 3 lần,gấp 2 lần', validate: phraseListValidate(['giảm 3 lần', 'gấp 2 lần']) },
          { label: 'b) 18 —...→ 36 —...→ 12', answer: 'gấp 2 lần,giảm 3 lần', validate: phraseListValidate(['gấp 2 lần', 'giảm 3 lần']) },
        ],
        hints: ['Từ 18 đến 6 là số bé đi (18 : 3 = 6), từ 18 đến 36 là số lớn lên (18 × 2 = 36).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Số?',
        blanks: [
          { label: 'a) 52 —giảm 4 lần→ ... —gấp 6 lần→ ...', answer: '13,78', validate: listValidate(['13', '78']) },
          { label: 'b) 26 —gấp 3 lần→ ... —giảm 2 lần→ ...', answer: '78,39', validate: listValidate(['78', '39']) },
        ],
        hints: ['Đi theo chiều mũi tên: tính ô vuông trước, rồi lấy kết quả đó tính tiếp ô hình lục giác (ví dụ a) 52 : 4 = 13, rồi 13 × 6).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.\nMũi của bạn người gỗ rất đặc biệt. Sau mỗi lần bạn ấy nói thật, chiều dài chiếc mũi so với trước khi nói thật giảm đi 2 lần. Sau mỗi lần bạn ấy nói dối, chiều dài chiếc mũi gấp 3 lần so với trước khi nói dối.',
        blanks: [
          { label: 'a) Nếu mũi của bạn người gỗ đang dài 52 cm thì sau khi nói thật 1 lần, mũi của bạn ấy dài ... cm.', answer: '26' },
          { label: 'b) Nếu mũi của bạn người gỗ đang dài 9 cm thì sau khi nói dối 2 lần liên tiếp, mũi của bạn ấy dài ... cm.', answer: '81' },
        ],
        hints: ['Nói thật 1 lần: 52 : 2. Nói dối 2 lần liên tiếp là gấp 3 lần hai lần: 9 × 3 = 27, rồi 27 × 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Mai có 42 tờ giấy màu. Sau giờ học thủ công, số tờ giấy màu còn lại của Mai so với lúc đầu giảm đi 6 lần. Hỏi Mai còn lại bao nhiêu tờ giấy màu?',
        wordProblem: true,
        blanks: [{ label: 'Số tờ giấy màu còn lại', answer: '7' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Số?',
        blanks: [
          { label: 'a) 72 : ... = 8', answer: '9' },
          { label: 'b) 48 : ... = 6', answer: '8' },
          { label: 'c) 81 : ... = 9', answer: '9' },
          { label: 'd) 45 : ... = 5', answer: '9' },
        ],
        hints: ['Muốn tìm số chia, ta lấy số bị chia chia cho thương: 72 : 8, 48 : 6, 81 : 9, 45 : 5.'],
      },
    ],
  },
  {
    id: 'bai-28', number: 28, title: 'Bài toán giải bằng hai bước tính',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Trong chuồng có 3 con thỏ. Số con thỏ ở ngoài sân gấp 4 lần số con thỏ ở trong chuồng. Hỏi:\na) Số thỏ ở trong chuồng và ở ngoài sân có tất cả bao nhiêu con?\nb) Số thỏ ở ngoài sân nhiều hơn số thỏ ở trong chuồng bao nhiêu con?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số thỏ có tất cả', answer: '15' },
          { label: 'b) Số thỏ ở ngoài sân nhiều hơn', answer: '9' },
        ],
        hints: ['Bước 1: tìm số thỏ ở ngoài sân (3 × 4 = 12). Bước 2: a) cộng với số thỏ trong chuồng, b) trừ đi số thỏ trong chuồng.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai28T1Polyline,
        q: '2. Đường gấp khúc ABC có đoạn thẳng AB dài 15 cm, đoạn thẳng BC ngắn hơn đoạn thẳng AB là 5 cm. Tính độ dài đường gấp khúc ABC.',
        wordProblem: true,
        blanks: [{ label: 'Độ dài đường gấp khúc ABC (cm)', answer: '25' }],
        hints: ['Bước 1: BC = 15 − 5 = 10 (cm). Bước 2: độ dài đường gấp khúc = AB + BC.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Lớp học có 15 bạn nam. Số bạn nữ nhiều hơn số bạn nam là 2 bạn. Hỏi lớp học đó có tất cả bao nhiêu bạn?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn của lớp học', answer: '32' }],
        hints: ['Bước 1: số bạn nữ là 15 + 2 = 17. Bước 2: cộng số bạn nam và số bạn nữ.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Con lợn đen cân nặng 65 kg. Con lợn trắng nặng hơn con lợn đen 8 kg. Hỏi cả hai con lợn cân nặng bao nhiêu ki-lô-gam?',
        wordProblem: true,
        blanks: [{ label: 'Cả hai con lợn cân nặng (kg)', answer: '138' }],
        hints: ['Bước 1: con lợn trắng nặng 65 + 8 = 73 (kg). Bước 2: cộng cân nặng của hai con lợn.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Lúc đầu trong thùng có 15 l nước mắm. Lúc sau, mẹ đổ thêm vào thùng 6 can, mỗi can 3 l nước mắm. Hỏi lúc sau trong thùng có tất cả bao nhiêu lít nước mắm?',
        wordProblem: true,
        blanks: [{ label: 'Số lít nước mắm lúc sau', answer: '33' }],
        hints: ['Bước 1: 6 can có 3 × 6 = 18 (l). Bước 2: cộng với 15 l lúc đầu.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai28T2Summary,
        q: '3. Nêu bài toán theo tóm tắt sau rồi giải bài toán đó.',
        wordProblem: true,
        blanks: [{ label: 'Cả hai con cân nặng (kg)', answer: '10' }],
        hints: [
          'Đoạn thẳng của con ngỗng gồm 4 đoạn bằng đoạn của con gà, nên con ngỗng cân nặng gấp 4 lần con gà: 2 × 4 = 8 (kg).',
          'Dấu ngoặc "? kg" ôm cả hai dòng: hỏi cả con gà và con ngỗng cân nặng bao nhiêu ki-lô-gam.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Số?\nHiện nay, Mi 5 tuổi, chị Mai hơn Mi 3 tuổi.',
        blanks: [{ label: 'Vậy sau 2 năm nữa, tuổi của chị Mai là ... tuổi.', answer: '10' }],
        hints: ['Hiện nay chị Mai 5 + 3 = 8 tuổi; sau 2 năm nữa mỗi người thêm 2 tuổi.'],
      },
    ],
  },
  {
    id: 'bai-29', number: 29, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: '50 × 2 =', answer: '100' }, { label: '30 × 2 =', answer: '60' }, { label: '10 × 5 =', answer: '50' },
          { label: '60 : 3 =', answer: '20' }, { label: '80 : 2 =', answer: '40' }, { label: '90 : 9 =', answer: '10' },
        ],
        hints: ['Nhẩm theo chục: 5 chục × 2 = 10 chục = 100; 6 chục : 3 = 2 chục = 20.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(32, 2), divBlank(54, 3), divBlank(84, 7), divBlank(44, 4)],
        hints: ['Chia lần lượt từ trái sang phải: chia hàng chục trước, rồi hạ hàng đơn vị xuống để chia tiếp.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Số?',
        blanks: [
          { label: 'a) 72 —giảm 6 lần→ ...', answer: '12' },
          { label: 'b) 14 —gấp 7 lần→ ...', answer: '98' },
          { label: 'c) 81 —giảm 3 lần→ ...', answer: '27' },
          { label: 'd) 29 —gấp 3 lần→ ...', answer: '87' },
        ],
        hints: ['"Giảm ... lần" là phép chia, "gấp ... lần" là phép nhân.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Năm ngoái, cây sầu riêng nhà bác Ba cho 27 quả. Năm nay, bác áp dụng kĩ thuật tiên tiến nên cây sầu riêng đó cho số quả gấp 3 lần năm ngoái.\na) Hỏi năm nay cây sầu riêng nhà bác Ba cho bao nhiêu quả?\nb) Sau khi bán đi, số quả sầu riêng còn lại giảm đi 3 lần. Hỏi bác Ba còn lại bao nhiêu quả sầu riêng?',
        wordProblem: true,
        blanks: [
          { label: 'a) Số quả sầu riêng năm nay', answer: '81' },
          { label: 'b) Số quả sầu riêng còn lại', answer: '27' },
        ],
        hints: ['a) 27 × 3. b) Lấy số quả năm nay chia cho 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(43, 2), divBlank(73, 3), divBlank(64, 4), divBlank(84, 5)],
        hints: ['Số dư luôn phải bé hơn số chia.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?',
        blanks: [
          { label: 'a) 30 —giảm 6 lần→ ... —thêm 7 đơn vị→ ...', answer: '5,12', validate: listValidate(['5', '12']) },
          { label: 'b) 21 —gấp 2 lần→ ... —giảm ... lần→ 7', answer: '42,6', validate: listValidate(['42', '6']) },
        ],
        hints: ['b) Tính ô vuông trước: 21 × 2 = 42. Sau đó tìm xem 42 giảm đi mấy lần thì được 7 (42 : 7).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Bờm có một cây tre dài 19 m. Để làm chiếc cổng tre, Bờm phải chặt cây tre đó thành các đoạn dài 3 m. Hỏi Bờm có thể có nhiều nhất bao nhiêu đoạn tre như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số đoạn tre nhiều nhất', answer: '6' }],
        hints: ['19 : 3 = 6 (dư 1): chặt được 6 đoạn dài 3 m, còn thừa 1 m không đủ một đoạn nữa.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Hôm qua cửa hàng của bác Sáu bán được 47 kg chà bông. Hôm nay áp dụng khuyến mãi, số chà bông bác Sáu bán được gấp 2 lần so với hôm qua. Hỏi hôm nay bác Sáu bán được bao nhiêu ki-lô-gam chà bông?',
        wordProblem: true,
        blanks: [{ label: 'Số ki-lô-gam chà bông hôm nay', answer: '94' }],
      },
    ],
  },
  {
    id: 'bai-30', number: 30, title: 'Mi-li-mét',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: '3 cm = ... mm', answer: '30' },
          { label: '20 mm = ... cm', answer: '2' },
          { label: '5 cm = ... mm', answer: '50' },
          { label: '10 cm = ... mm', answer: '100' },
          { label: '1 m = ... cm', answer: '100' },
          { label: '1 m = ... mm', answer: '1000' },
        ],
        hints: ['1 cm = 10 mm, 1 m = 100 cm = 1000 mm.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai30T1Rulers,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'Đoạn thẳng AB dài ... mm.', answer: '10' },
          { label: 'Đoạn thẳng CD dài ... mm.', answer: '40' },
        ],
        hints: ['Mỗi vạch nhỏ trên thước là 1 mm; từ vạch 0 đến vạch 1 cm có 10 vạch nhỏ, tức là 1 cm = 10 mm.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.\nCào cào, bọ ngựa và châu chấu thi nhảy xa được thành tích lần lượt là 3 cm, 15 mm, 20 mm.',
        blanks: [
          { label: 'a) Thành tích nhảy xa của ... là tốt nhất.', answer: 'cào cào', validate: animalValidate('cào cào') },
          { label: 'b) Thành tích nhảy xa của ... là kém nhất.', answer: 'bọ ngựa', validate: animalValidate('bọ ngựa') },
        ],
        hints: ['Đổi về cùng đơn vị mi-li-mét: 3 cm = 30 mm, rồi so sánh 30 mm, 15 mm và 20 mm.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Mỗi tấm gỗ ép dày 2 mm. Người ta ghép chồng 7 tấm gỗ như vậy với nhau để làm một tấm gỗ công nghiệp. Hỏi tấm gỗ công nghiệp dày bao nhiêu mi-li-mét? (Bỏ qua độ dày của lớp keo dính.)',
        wordProblem: true,
        blanks: [{ label: 'Độ dày tấm gỗ công nghiệp (mm)', answer: '14' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 150 mm + 400 mm = ... mm', answer: '550' },
          { label: 'a) 45 mm + 2 mm = ... mm', answer: '47' },
          { label: 'b) 450 mm − 180 mm = ... mm', answer: '270' },
          { label: 'b) 72 mm − 34 mm = ... mm', answer: '38' },
          { label: 'c) 37 mm × 2 = ... mm', answer: '74' },
          { label: 'c) 72 mm : 3 = ... mm', answer: '24' },
        ],
        hints: ['Tính như với các số tự nhiên rồi viết thêm đơn vị mm vào kết quả.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 24 mm —giảm 8 lần→ ... mm', answer: '3' },
          { label: 'b) 49 mm —gấp 2 lần→ ... mm', answer: '98' },
          { label: 'c) 96 mm —giảm 4 lần→ ... mm', answer: '24' },
          { label: 'd) 18 mm —gấp 5 lần→ ... mm', answer: '90' },
        ],
        hints: ['"Giảm ... lần" là phép chia, "gấp ... lần" là phép nhân.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Một búp măng ngày hôm qua cao 173 mm so với mặt đất. Ngày hôm nay búp măng đó đã cao 292 mm so với mặt đất. Hỏi sau một ngày, búp măng đó cao thêm được bao nhiêu mi-li-mét?',
        wordProblem: true,
        blanks: [{ label: 'Búp măng cao thêm được (mm)', answer: '119' }],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Lượng mưa đo được vào ngày thứ Ba là 17 mm. Ngày thứ Tư cùng tuần đó lượng mưa đo được gấp 4 lần ngày thứ Ba. Hỏi lượng mưa đo được vào ngày thứ Tư là bao nhiêu mi-li-mét?',
        wordProblem: true,
        blanks: [{ label: 'Lượng mưa ngày thứ Tư (mm)', answer: '68' }],
      },
    ],
  },
  {
    id: 'bai-31', number: 31, title: 'Gam',
    questions: [
      {
        type: 'fill', img: imgBai31Scales,
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Ba quả cam cân nặng ... g.', answer: '550' },
          { label: 'b) Hộp sữa cân nặng ... g.', answer: '600' },
          { label: 'c) Gói mì chính cân nặng ... g.', answer: '120' },
          { label: 'd) Gói bột canh cân nặng ... g.', answer: '300' },
        ],
        hints: ['Cân thăng bằng nên vật ở đĩa bên phải nặng bằng tổng các quả cân ở đĩa bên trái, ví dụ a) 500 g + 50 g.'],
      },
      {
        type: 'fill', img: imgBai31Dials,
        q: '2. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Túi táo cân nặng ... g.', answer: '750' },
          { label: 'b) Gói bột mì cân nặng ... g.', answer: '500' },
          { label: 'c) Gói bột mì nhẹ hơn túi táo là ... g.', answer: '250' },
        ],
        hints: [
          'Xem kim của mỗi cân chỉ vào vạch nào: 1 kg ở trên cùng, 250 g bên phải, 500 g ở dưới, 750 g bên trái.',
          'c) Lấy cân nặng của túi táo trừ đi cân nặng của gói bột mì.',
        ],
      },
      {
        type: 'fill',
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 250 g + 180 g = ... g', answer: '430' },
          { label: 'a) 430 g − 250 g = ... g', answer: '180' },
          { label: 'a) 430 g − 180 g = ... g', answer: '250' },
          { label: 'b) 8 g × 9 = ... g', answer: '72' },
          { label: 'b) 72 g : 9 = ... g', answer: '8' },
          { label: 'b) 72 g : 8 = ... g', answer: '9' },
        ],
        hints: ['Tính như với các số tự nhiên rồi viết thêm đơn vị g vào kết quả.'],
      },
      {
        type: 'fill',
        q: '4. Trong lọ có 1 kg đường. Mẹ đã lấy ra hai lần, một lần 150 g và một lần 200 g để nấu chè đỗ đen. Hỏi trong lọ còn lại bao nhiêu gam đường?',
        wordProblem: true,
        // "Đổi: 1 kg = ... g" is the first line of the book's own Bài giải,
        // not a second question — don't repeat it in the question card.
        subQuestions: false,
        blanks: [
          { label: 'Đổi: 1 kg = ... g', answer: '1000' },
          { label: 'Số gam đường còn lại', answer: '650' },
        ],
        hints: ['Đổi 1 kg = 1000 g, rồi lấy 1000 g trừ đi số đường mẹ đã lấy ra cả hai lần (150 g + 200 g).'],
      },
    ],
  },
  {
    id: 'bai-32', number: 32, title: 'Mi-li-lít',
    questions: [
      {
        type: 'fill', img: imgBai32Bottle,
        q: '1. Viết số thích hợp vào chỗ chấm.\nRót hết nước từ bình sang 3 ca (như hình vẽ).',
        blanks: [
          { label: 'a) Ca A có 500 ml nước, ca B có ... ml nước, ca C có ... ml nước.', answer: '400,100', validate: listValidate(['400', '100']) },
          { label: 'b) Lúc đầu, lượng nước trong bình có là ... ml.', answer: '1000' },
        ],
        hints: [
          'Mỗi ca có vạch 500 ml ở trên cùng và 4 vạch nhỏ bên dưới: mỗi khoảng giữa hai vạch là 100 ml.',
          'b) Cộng lượng nước của cả 3 ca: 500 ml + ca B + ca C.',
        ],
      },
      {
        type: 'fill', img: imgBai32Flask,
        q: '2. Viết số thích hợp vào chỗ chấm.\nTrong phích có 1 l nước. Rót nước ở phích sang 3 ca (như hình vẽ).',
        blanks: [
          { label: 'a) 1 l = ... ml.', answer: '1000' },
          { label: 'b) Sau khi rót, lượng nước còn lại trong phích là ... ml.', answer: '200' },
        ],
        hints: ['Ba ca đã rót được 400 ml + 300 ml + 100 ml = 800 ml; lấy 1000 ml trừ đi 800 ml.'],
      },
      {
        type: 'fill',
        q: '3. Tính.',
        blanks: [
          { label: 'a) 250 ml + 100 ml =', answer: '350 ml', validate: unitValidate(350, 'ml') },
          { label: 'a) 350 ml − 250 ml =', answer: '100 ml', validate: unitValidate(100, 'ml') },
          { label: 'a) 350 ml − 100 ml =', answer: '250 ml', validate: unitValidate(250, 'ml') },
          { label: 'b) 9 ml × 3 =', answer: '27 ml', validate: unitValidate(27, 'ml') },
          { label: 'b) 27 ml : 3 =', answer: '9 ml', validate: unitValidate(9, 'ml') },
          { label: 'b) 27 ml : 9 =', answer: '3 ml', validate: unitValidate(3, 'ml') },
        ],
        hints: ['Tính như với các số tự nhiên rồi viết thêm đơn vị ml vào kết quả, ví dụ 250 ml + 100 ml = 350 ml.'],
      },
      {
        type: 'fill',
        q: '4. Trong bình có 1 l nước. Việt rót nước từ trong bình đó vào đầy một ca 500 ml và một ca 300 ml. Hỏi trong bình còn lại bao nhiêu mi-li-lít nước?',
        wordProblem: true,
        subQuestions: false,
        blanks: [
          { label: 'Đổi 1 l = ... ml', answer: '1000' },
          { label: 'Số mi-li-lít nước còn lại', answer: '200' },
        ],
        hints: ['Đổi 1 l = 1000 ml, rồi lấy 1000 ml trừ đi lượng nước đã rót ra (500 ml + 300 ml).'],
      },
    ],
  },
  {
    id: 'bai-33', number: 33, title: 'Nhiệt độ. Đơn vị đo nhiệt độ',
    questions: [
      {
        type: 'table',
        q: '1. Viết tiếp vào chỗ chấm cho thích hợp.\nCó một ngày, nhiệt độ không khí ở ba địa phương được cho như bảng bên.',
        rows: [
          ['Nha Trang', 'Sa Pa', 'Hạ Long'],
          ['32 °C', '15 °C', '26 °C'],
        ],
        blanks: [
          { label: 'a) Nhiệt độ không khí ở Hạ Long cao hơn nhiệt độ không khí ở ...', answer: 'Sa Pa', validate: phraseValidate('Sa Pa') },
          { label: 'b) Nhiệt độ không khí ở ... cao nhất.', answer: 'Nha Trang', validate: phraseValidate('Nha Trang') },
          { label: 'c) Nhiệt độ không khí ở ... thấp nhất.', answer: 'Sa Pa', validate: phraseValidate('Sa Pa') },
        ],
        hints: ['So sánh ba nhiệt độ: 32 °C > 26 °C > 15 °C.'],
      },
      {
        type: 'table',
        q: '2. Hoàn thành bảng (theo mẫu).',
        headers: ['Viết', 'Đọc'],
        rows: [
          { sample: true, cells: ['20 °C', 'Hai mươi độ xê'] },
          [blank('35 °C', { validate: tempValidate(35) }), 'Ba mươi lăm độ xê'],
          [blank('31 °C', { validate: tempValidate(31) }), 'Ba mươi mốt độ xê'],
          ['15 °C', blank('Mười lăm độ xê', { validate: tempReadValidate('mười lăm') })],
        ],
        hints: ['°C đọc là "độ xê": 20 °C đọc là "Hai mươi độ xê".'],
      },
      {
        type: 'fill',
        q: '3. Số?\nNhiệt độ cơ thể của ba người lần lượt đo được là 38 °C, 36 °C, 37 °C. Biết rằng nhiệt độ cơ thể của người thứ nhất cao nhất, của người thứ hai thấp nhất.',
        blanks: [{ label: 'Người thứ ba có nhiệt độ cơ thể là ... °C.', answer: '37' }],
        hints: ['Người thứ nhất có nhiệt độ cao nhất là 38 °C, người thứ hai thấp nhất là 36 °C.'],
      },
      {
        type: 'table',
        q: '4. Viết tiếp vào chỗ chấm cho thích hợp.\nNhiệt độ không khí trong cùng một ngày vào một số buổi ở một địa phương theo bảng bên.',
        rows: [
          ['Sáng sớm', 'Trưa', 'Chiều', 'Đêm'],
          ['18 °C', '30 °C', '24 °C', '12 °C'],
        ],
        blanks: [
          { label: 'Nhiệt độ không khí từng buổi viết theo thứ tự từ cao nhất đến thấp nhất là: ...', answer: 'Trưa, Chiều, Sáng sớm, Đêm', validate: phraseOrderValidate(['Trưa', 'Chiều', 'Sáng sớm', 'Đêm']) },
        ],
        hints: ['Sắp xếp các nhiệt độ: 30 °C > 24 °C > 18 °C > 12 °C, rồi viết tên buổi tương ứng, cách nhau bởi dấu phẩy.'],
      },
    ],
  },
  {
    id: 'bai-34', number: 34, title: 'Thực hành và trải nghiệm với các đơn vị mi-li-mét, gam, mi-li-lít, độ C',
    questions: [
      {
        // Each row is its own "Khoanh vào chữ" with two choices, so the
        // three rows share one screen as choice rows graded on "Kiểm tra".
        type: 'compare', section: 'Tiết 1',
        q: '2. Khoanh vào chữ đặt trước kết quả thích hợp.',
        rows: [
          { left: 'a) Quân xe trong bộ cờ vua cân nặng khoảng:', options: ['A. 10 g', 'B. 1 kg'], answer: 'A' },
          { left: 'b) Gói đường cân nặng khoảng:', options: ['A. 10 g', 'B. 1 kg'], answer: 'B' },
          { left: 'c) Quả tạ tay cân nặng khoảng:', options: ['A. 500 g', 'B. 5 kg'], answer: 'B' },
        ],
        hints: ['Hãy nghĩ tới đồ vật thật: một quân cờ rất nhẹ, cầm trong lòng bàn tay; một gói đường thường là 1 kg; quả tạ tay dùng để tập thể dục thì khá nặng.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai34T2Thermometers,
        q: '1. Đọc số đo nhiệt độ ở mỗi nhiệt kế sau rồi viết kết quả vào chỗ chấm.',
        blanks: [
          { label: 'Nhiệt kế thứ nhất: ... °C', answer: '40' },
          { label: 'Nhiệt kế thứ hai: ... °C', answer: '0' },
          { label: 'Nhiệt kế thứ ba: ... °C', answer: '38' },
        ],
        hints: [
          'Đọc số ở vạch ngang với đỉnh cột màu xám trong ống nhiệt kế, dùng các số bên phải (50, 40, 30, ..., 0).',
          'Giữa hai số liền nhau (ví dụ 30 và 40) có 10 khoảng nhỏ, mỗi khoảng là 1 °C.',
        ],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối mỗi vật với cân nặng thích hợp trong thực tế.',
        left: [
          { id: 'bike', img: imgBai34T2Bike, text: 'Xe đạp trẻ em' },
          { id: 'laptop', img: imgBai34T2Laptop, text: 'Máy tính xách tay' },
          { id: 'pen', img: imgBai34T2Pen, text: 'Bút máy' },
        ],
        right: [
          { id: 'w20g', text: '20 g' },
          { id: 'w20kg', text: '20 kg' },
          { id: 'w2kg', text: '2 kg' },
        ],
        pairs: [['bike', 'w20kg'], ['laptop', 'w2kg'], ['pen', 'w20g']],
        hints: ['Vật nhỏ, nhẹ nhất cầm trên tay được là 20 g; vật to, nặng nhất là 20 kg.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai34T2Cups,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Ca ... đựng nhiều nước nhất.', answer: 'A', validate: letterValidate('A') },
          { label: 'b) Hai ca ... và ... đựng tất cả 500 ml nước.', answer: 'B,C', validate: setValidate(['B', 'C']) },
          { label: 'c) Ca A đựng nhiều hơn ca D ... ml nước.', answer: '350' },
        ],
        hints: ['Các ca đựng 500 ml, 200 ml, 300 ml, 150 ml. b) Tìm hai số có tổng là 500. c) 500 − 150.'],
      },
    ],
  },
  {
    id: 'bai-35', number: 35, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 832 mm − 228 mm = ... mm', answer: '604' },
          { label: 'a) 37 g + 182 g = ... g', answer: '219' },
          { label: 'a) 127 mm + 328 mm = ... mm', answer: '455' },
          { label: 'b) 215 ml + 37 ml = ... ml', answer: '252' },
          { label: 'b) 32 ml − 15 ml + 80 ml = ... ml', answer: '97' },
          { label: 'b) 57 g − 37 g + 50 g = ... g', answer: '70' },
        ],
        hints: ['Tính như với các số tự nhiên rồi viết thêm đơn vị vào kết quả. Dãy có hai dấu phép tính thì tính lần lượt từ trái sang phải: 32 − 15 = 17, rồi 17 + 80.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai35T1Scales,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp (theo mẫu).',
        blanks: [
          { label: 'a) Mỗi kiện hàng cân nặng ... g.', answer: '500' },
          { label: 'b) Chiếc cốc cân nặng ... g.', answer: '250' },
        ],
        hints: [
          'a) Cân thăng bằng: hai kiện hàng nặng bằng hai quả cân 500 g, nên mỗi kiện hàng nặng bằng một quả cân 500 g.',
          'b) Chiếc cốc cùng quả cân 50 g nặng bằng 200 g + 100 g = 300 g; lấy 300 g trừ đi 50 g.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 42 mm —giảm 2 lần→ ... mm', answer: '21' },
          { label: 'b) 42 mm —gấp 2 lần→ ... mm', answer: '84' },
          { label: 'c) 72 mm —giảm 3 lần→ ... mm', answer: '24' },
          { label: 'd) 38 mm —gấp 2 lần→ ... mm', answer: '76' },
        ],
        hints: ['"Giảm ... lần" là phép chia, "gấp ... lần" là phép nhân.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 24 mm —× 4→ ... mm —: 3→ ... mm', answer: '96,32', validate: listValidate(['96', '32']) },
          { label: 'b) 60 ml —: 4→ ... ml —× 2→ ... ml', answer: '15,30', validate: listValidate(['15', '30']) },
        ],
        hints: ['Đi theo chiều mũi tên: tính ô thứ nhất trước (24 mm × 4), rồi lấy kết quả đó tính tiếp ô thứ hai.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai35T2Thermometer,
        q: '2. Viết tiếp vào chỗ chấm cho thích hợp.\nBạn Nam bị ốm. Bác sĩ vừa đo nhiệt độ cơ thể của bạn Nam được kết quả như hình dưới đây.',
        blanks: [
          { label: 'a) Nhiệt độ cơ thể của Nam mà bác sĩ đo được là ... °C.', answer: '38' },
          { label: 'b) Theo em, Nam có bị sốt không? Vì sao? Trả lời:', answer: 'Có, vì nhiệt độ cơ thể của Nam là 38 °C, cao hơn nhiệt độ bình thường 37 °C.', validate: feverValidate() },
        ],
        hints: [
          'Đọc số ở vạch mà cột màu xanh trong ống nhiệt kế dừng lại. Giữa hai số liền nhau (ví dụ 37 và 38) có 10 vạch nhỏ.',
          'Nhiệt độ cơ thể bình thường của người khoảng 37 °C (vạch có dấu ▼). Cao hơn thế là bị sốt.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Việt dùng một hộp sữa loại 250 ml để làm bánh. Theo công thức làm bánh, bạn ấy chỉ cần dùng 80 ml sữa. Hỏi sau khi làm bánh xong, Việt còn lại bao nhiêu mi-li-lít sữa?',
        wordProblem: true,
        blanks: [{ label: 'Số mi-li-lít sữa còn lại', answer: '170' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai35T2Gifts,
        q: '4. Quan sát hình sau rồi tìm cân nặng của hộp quà A và mỗi hộp quà B. Biết rằng các hộp quà B có cân nặng như nhau.',
        wordProblem: true,
        // Both blanks answer the single question already in q (two results of
        // one Bài giải), not separate sub-questions to print again.
        subQuestions: false,
        blanks: [
          { label: 'Mỗi hộp quà B cân nặng (g)', answer: '400' },
          { label: 'Hộp quà A cân nặng (g)', answer: '800' },
        ],
        hints: [
          'Cân bên phải: một hộp quà B và quả cân 100 g nặng bằng quả cân 500 g, nên hộp quà B nặng 500 g − 100 g.',
          'Cân bên trái: hộp quà A nặng bằng hai hộp quà B.',
        ],
      },
    ],
  },
  {
    id: 'bai-36', number: 36, title: 'Nhân số có ba chữ số với số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.',
        blanks: [
          { label: '314 × 2 =', answer: '628' }, { label: '150 × 5 =', answer: '750' },
          { label: '251 × 3 =', answer: '753' }, { label: '224 × 4 =', answer: '896' },
        ],
        hints: ['Nhân lần lượt từ phải sang trái: hàng đơn vị, hàng chục rồi hàng trăm; nhân được từ 10 trở lên thì nhớ sang hàng bên trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.',
        blanks: [
          { label: '230 × 3 =', answer: '690' }, { label: '123 × 2 =', answer: '246' },
          { label: '237 × 2 =', answer: '474' }, { label: '205 × 4 =', answer: '820' },
        ],
        hints: ['Viết thừa số thứ hai thẳng cột với hàng đơn vị của thừa số thứ nhất, rồi nhân từ phải sang trái.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Mai vừa hoàn thành quãng đường chạy dài 250 m. Cùng thời gian đó, Việt chạy được quãng đường dài gấp 3 lần quãng đường chạy của Mai. Hỏi Việt chạy được quãng đường dài bao nhiêu mét?',
        wordProblem: true,
        blanks: [{ label: 'Quãng đường Việt chạy được (m)', answer: '750' }],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nRô-bốt đã viết 4 trong 5 số: 2, 3, 5, 100, 250 vào các ô trống ở hình bên để được so sánh đúng.\n☐ × ☐ = ☐ × ☐\nHỏi Rô-bốt không viết số nào?',
        options: ['2', '3', '5', '250'],
        answer: 1,
        hints: ['Tìm hai cặp số có cùng tích: 2 × 250 = 500 và 5 × 100 = 500. Số còn lại không dùng đến.'],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          ['Thừa số', 105, 120, 126, 141],
          ['Thừa số', 2, 5, 4, 6],
          ['Tích', blank(210), blank(600), blank(504), blank(846)],
        ],
        hints: ['Tích = Thừa số × Thừa số, ví dụ 105 × 2 = 210.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính nhẩm.\n' + mau('200 × 4 = ?  Nhẩm: 2 trăm × 4 = 8 trăm. Vậy: 200 × 4 = 800.'),
        blanks: [
          { label: '200 × 3 =', answer: '600' }, { label: '500 × 2 =', answer: '1000' },
          { label: '300 × 2 =', answer: '600' }, { label: '600 × 1 =', answer: '600' },
        ],
        hints: ['Nhẩm theo trăm: 5 trăm × 2 = 10 trăm = 1000.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Trên một hòn đảo đang có 420 con cừu. Sau mỗi năm số lượng cừu trên đảo sẽ tăng thêm 180 con. Hỏi sau 2 năm, trên đảo đó sẽ có tất cả bao nhiêu con cừu?',
        wordProblem: true,
        blanks: [{ label: 'Số con cừu sau 2 năm', answer: '780' }],
        hints: ['Sau 2 năm số cừu tăng thêm 180 × 2 = 360 (con); cộng với 420 con đang có.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Mai có 1 kg bột mì. Bạn ấy đã làm 3 chiếc bánh gối, mỗi chiếc bánh dùng 200 g bột mì. Hỏi Mai còn lại bao nhiêu gam bột mì?',
        wordProblem: true,
        subQuestions: false,
        blanks: [
          { label: 'Đổi: 1 kg = ... g', answer: '1000' },
          { label: 'Số gam bột mì còn lại', answer: '400' },
        ],
        hints: ['Đổi 1 kg = 1000 g. Ba chiếc bánh dùng 200 × 3 = 600 (g) bột mì; lấy 1000 g trừ đi 600 g.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Tính nhẩm (theo mẫu).\n' + mau('120 × 2 = ? Nhẩm: 12 chục × 2 = 24 chục. Vậy: 120 × 2 = 240.'),
        blanks: [
          { label: '210 × 3 =', answer: '630' }, { label: '340 × 2 =', answer: '680' },
          { label: '110 × 4 =', answer: '440' },
        ],
        hints: ['Nhẩm theo chục: 21 chục × 3 = 63 chục = 630.'],
      },
    ],
  },
  {
    id: 'bai-37', number: 37, title: 'Chia số có ba chữ số cho số có một chữ số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(375, 3), divBlank(448, 2), divBlank(627, 4)],
        hints: ['Chia lần lượt từ trái sang phải: hàng trăm, hàng chục rồi hàng đơn vị. Số dư luôn phải bé hơn số chia.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Thuyền trưởng tìm được một chiếc hòm đựng rất nhiều đồng vàng. Thuyền phó tìm được chiếc hòm đựng 548 đồng vàng, nhiều gấp 2 lần số đồng vàng mà thuyền trưởng tìm được. Hỏi thuyền trưởng tìm được bao nhiêu đồng vàng?',
        wordProblem: true,
        blanks: [{ label: 'Số đồng vàng thuyền trưởng tìm được', answer: '274' }],
        hints: ['548 gấp 2 lần số đồng vàng của thuyền trưởng, nên số đồng vàng của thuyền trưởng là 548 : 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) 124 giờ —giảm 4 lần→ ... giờ', answer: '31' },
          { label: 'b) 702 dm —giảm 9 lần→ ... dm', answer: '78' },
          { label: 'c) 384 kg —giảm 6 lần→ ... kg', answer: '64' },
          { label: 'd) 343 l —giảm 7 lần→ ... l', answer: '49' },
        ],
        hints: ['"Giảm ... lần" là phép chia: 124 : 4, 702 : 9, 384 : 6, 343 : 7.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nRô-bốt đã điền 4 trong 5 số: 2, 4, 5, 124, 155 vào các ô trống ở hình bên để được so sánh đúng.\n☐ : ☐ = ☐ : ☐\nHỏi Rô-bốt có thể viết những số nào vào ô trống cuối cùng?',
        options: ['2 hoặc 4', '4 hoặc 5', '2 hoặc 5', '124 hoặc 155'],
        answer: 1,
        hints: ['Tìm hai phép chia có cùng thương: 124 : 4 = 31 và 155 : 5 = 31. Vậy có thể viết 124 : 4 = 155 : 5 hoặc 155 : 5 = 124 : 4.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(250, 2), divBlank(407, 4), divBlank(210, 7)],
        hints: ['Ở 407 : 4, sau khi chia hàng trăm (4 : 4 = 1), hạ 0 xuống: 0 : 4 = 0, viết 0 vào thương rồi hạ tiếp 7.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Hôm qua là ngày cuối tuần nên cửa hàng bánh rất đông khách. Họ bán được 450 cái bánh. Hôm nay là ngày đi làm, nên số bánh bán được giảm đi 5 lần so với hôm qua. Hỏi hôm nay cửa hàng bán được bao nhiêu cái bánh?',
        wordProblem: true,
        blanks: [{ label: 'Số bánh bán được hôm nay', answer: '90' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai37T2Divisions,
        q: '3. Đ, S?\nQuan sát các phép chia trong hình rồi cho biết mỗi kết luận đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) Vậy 240 : 4 = 6 (dư 0).', answer: 'S', validate: dsValidate(false) },
          { label: 'b) Vậy 425 : 6 = 70 (dư 5).', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) Vậy 812 : 8 = 104.', answer: 'S', validate: dsValidate(false) },
          { label: 'd) Vậy 354 : 5 = 7 (dư 4).', answer: 'S', validate: dsValidate(false) },
        ],
        hints: [
          'Thử lại: thương × số chia + số dư phải bằng số bị chia. Ví dụ 6 × 4 = 24, không phải 240.',
          'Mỗi lần hạ một chữ số xuống mà chia không được thì phải viết 0 vào thương: 240 : 4 = 60, 354 : 5 = 70 (dư 4). Ở c), 12 : 8 = 1 (dư 4), nên 812 : 8 = 101 (dư 4).',
        ],
      },
      {
        type: 'choice', section: 'Tiết 2', img: imgBai37T2Hexagons,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nSố nào dưới đây thích hợp để điền vào dấu “?” trong hình trên?',
        options: ['80', '800', '400', '440'],
        answer: 3,
        hints: [
          'Hình thứ nhất có 4 ô vuông và ghi 40, nên mỗi ô vuông là 10. Hình thứ hai có 6 ô tròn và ghi 600, nên mỗi ô tròn là 100.',
          'Thử lại với hình thứ ba: 4 ô vuông và 2 ô tròn là 40 + 200 = 240. Hình cuối cùng có 4 ô vuông và 4 ô tròn.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(317, 3), divBlank(625, 5), divBlank(125, 6)],
        hints: ['Ở 125 : 6, hàng trăm 1 bé hơn 6 nên lấy 12 : 6 = 2 trước; hạ 5 xuống, 5 : 6 = 0 (dư 5), viết 0 vào thương.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Tính nhẩm (theo mẫu).\n' + mau('240 : 4 = ?  Nhẩm: 24 chục : 4 = 6 chục. Vậy: 240 : 4 = 60.'),
        blanks: [
          { label: '270 : 3 =', answer: '90' }, { label: '450 : 9 =', answer: '50' },
          { label: '360 : 6 =', answer: '60' },
        ],
        hints: ['Nhẩm theo chục: 27 chục : 3 = 9 chục = 90.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Bác gấu vừa thu hoạch được 930 ml mật ong. Bác đã chia đều lượng mật ong đó vào 3 cái hũ. Hỏi mỗi hũ chứa bao nhiêu mi-li-lít mật ong?',
        wordProblem: true,
        blanks: [{ label: 'Số mi-li-lít mật ong mỗi hũ', answer: '310' }],
      },
      {
        type: 'choice', section: 'Tiết 3', img: imgBai37T3Archery,
        q: '4. Khoanh vào chữ đặt trước câu trả lời đúng.\nMỗi vận động viên A, B, C vừa hoàn thành 3 lượt bắn cung. Kết quả và số điểm mà họ nhận được như sau:\nSố điểm mà vận động viên C nhận được là:',
        options: ['500 điểm', '450 điểm', '400 điểm'],
        answer: 2,
        hints: [
          'A bắn cả 3 mũi vào vòng ngoài được 300 điểm, nên mỗi mũi ở vòng ngoài được 100 điểm.',
          'B có 2 mũi ở vòng ngoài và 1 mũi ở vòng tròn nhỏ ở giữa: 350 − 200 = 150, nên mỗi mũi ở vòng giữa được 150 điểm. C có 2 mũi ở giữa và 1 mũi ở vòng ngoài.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '5. Viết số thích hợp vào chỗ chấm.\nRô-bốt đã thực hiện một dãy các phép tính như trong hình dưới đây.',
        // The first row is the book's chain of empty boxes (480 : 3 = ☐ —: 4→
        // ☐ × 5 = ☐ —: 2→ ☐ × 8 = ▲); the dotted line below it is the answer.
        blanks: [
          { label: '480 : 3 = ... —: 4→ ... × 5 = ... —: 2→ ... × 8 = ▲', answer: '160,40,200,100', validate: listValidate(['160', '40', '200', '100']) },
          { label: 'Số được điền ở vị trí hình tam giác màu đen là:', answer: '800' },
        ],
        hints: ['Tính lần lượt theo mũi tên: 480 : 3 = 160, rồi 160 : 4, rồi nhân với 5, ...'],
      },
    ],
  },
  {
    id: 'bai-38', number: 38, title: 'Biểu thức số. Tính giá trị của biểu thức số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính giá trị của biểu thức (theo mẫu).\n' + mau('48 − 25 + 29 = 23 + 29\n= 52'),
        blanks: [
          { label: 'a) 162 + 29 − 18 = ...', answer: '191 − 18', validate: exprValidate('191 − 18') },
          { label: '= ...', answer: '173' },
          // One operation only — the value is the whole answer.
          { label: 'b) 18 × 7 = ...', answer: '126' },
          { label: 'c) 84 : 6 = ...', answer: '14' },
        ],
        hints: ['Biểu thức chỉ có phép cộng, phép trừ thì tính lần lượt từ trái sang phải: 162 + 29 = 191, rồi 191 − 18.'],
      },
      {
        type: 'match', section: 'Tiết 1',
        q: '2. Nối mỗi biểu thức với số là giá trị của biểu thức đó (theo mẫu).',
        left: [
          { id: 'e81', text: '81 : 9' },
          { id: 'e36', text: '36 + 17 − 45' },
          { id: 'e62', text: '62 − 45 + 28' },
          { id: 'e17', text: '17 × 3' },
        ],
        right: [
          { id: 'v51', text: '51' },
          { id: 'v9', text: '9' },
          { id: 'v8', text: '8' },
          { id: 'v45', text: '45' },
        ],
        pairs: [['e81', 'v9'], ['e36', 'v8'], ['e62', 'v45'], ['e17', 'v51']],
        hints: ['Tính giá trị từng biểu thức, cộng trừ lần lượt từ trái sang phải: 36 + 17 = 53, 53 − 45 = 8.'],
      },
      {
        // One book question, two rings to draw: a red one and a blue one.
        type: 'compare', section: 'Tiết 1',
        q: '3. Khoanh màu đỏ vào chữ đặt dưới ô ghi biểu thức có giá trị lớn nhất, màu xanh vào chữ đặt dưới ô ghi biểu thức có giá trị bé nhất.\nA: 49 + 27 − 58;  B: 18 × 4;\nC: 56 − 18 + 23;  D: 93 : 3.',
        rows: [
          { left: 'Khoanh màu đỏ (biểu thức có giá trị lớn nhất):', options: ['A', 'B', 'C', 'D'], answer: 'B' },
          { left: 'Khoanh màu xanh (biểu thức có giá trị bé nhất):', options: ['A', 'B', 'C', 'D'], answer: 'A' },
        ],
        hints: ['Tính giá trị của cả bốn biểu thức: A = 18, B = 72, C = 61, D = 31.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính giá trị của biểu thức (theo mẫu).\n' + mau('30 + 9 : 3 = 30 + 3\n= 33.'),
        blanks: [
          { label: 'a) 64 − 25 : 5 = ...', answer: '64 − 5', validate: exprValidate('64 − 5') },
          { label: '= ...', answer: '59' },
          { label: 'b) 15 + 4 × 9 = ...', answer: '15 + 36', validate: exprValidate('15 + 36') },
          { label: '= ...', answer: '51' },
          { label: 'c) 90 − 7 × 3 = ...', answer: '90 − 21', validate: exprValidate('90 − 21') },
          { label: '= ...', answer: '69' },
          { label: 'd) 98 + 42 : 6 = ...', answer: '98 + 7', validate: exprValidate('98 + 7') },
          { label: '= ...', answer: '105' },
        ],
        hints: ['Biểu thức có phép cộng, trừ và phép nhân, chia thì thực hiện phép nhân, chia trước: 25 : 5 = 5, rồi 64 − 5.'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'e25', text: '25 + 17 × 2' },
          { id: 'e92', text: '92 − 26 × 3' },
          { id: 'e40', text: '40 − 36 : 2' },
          { id: 'e87', text: '87 + 48 : 6' },
        ],
        right: [
          { id: 'v22', text: '22' },
          { id: 'v59', text: '59' },
          { id: 'v14', text: '14' },
          { id: 'v95', text: '95' },
        ],
        pairs: [['e25', 'v59'], ['e92', 'v14'], ['e40', 'v22'], ['e87', 'v95']],
        hints: ['Thực hiện phép nhân, chia trước: 26 × 3 = 78, rồi 92 − 78.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Đ, S?',
        blanks: [
          { label: 'a) 40 + 60 : 2 = 100 : 2 = 50.', answer: 'S', validate: dsValidate(false) },
          { label: 'b) 40 + 60 : 2 = 40 + 30 = 70.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) 70 − 30 : 5 = 70 − 6 = 64.', answer: 'Đ', validate: dsValidate(true) },
          { label: 'd) 70 − 30 : 5 = 40 : 5 = 8.', answer: 'S', validate: dsValidate(false) },
        ],
        hints: ['Trong biểu thức có phép cộng, trừ và phép chia thì phải chia trước, không được cộng/trừ trước.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Số?\nTừ một thùng có 50 l dầu, người ta đã lấy ra 3 lần, mỗi lần 10 l dầu.',
        blanks: [
          { label: 'Số lít dầu còn lại trong thùng là: 50 − ... × ... = ... (l).', answer: '10,3,20', validate: swapPairValidate(10, 3, 20) },
        ],
        hints: ['Số lít dầu đã lấy ra là 10 × 3 = 30 (l); lấy 50 trừ đi số đó.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '1. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 64 : (25 − 17) = ...', answer: '64 : 8', validate: exprValidate('64 : 8') },
          { label: '= ...', answer: '8' },
          { label: 'b) (70 − 15) : 5 = ...', answer: '55 : 5', validate: exprValidate('55 : 5') },
          { label: '= ...', answer: '11' },
          { label: 'c) 26 × (71 − 68) = ...', answer: '26 × 3', validate: exprValidate('26 × 3') },
          { label: '= ...', answer: '78' },
          { label: 'd) 50 − (50 − 10) = ...', answer: '50 − 40', validate: exprValidate('50 − 40') },
          { label: '= ...', answer: '10' },
        ],
        hints: ['Biểu thức có dấu ngoặc thì tính trong ngoặc trước: 25 − 17 = 8, rồi 64 : 8.'],
      },
      {
        type: 'match', section: 'Tiết 3',
        q: '2. Nối (theo mẫu).',
        left: [
          { id: 'e23', text: '23 × (42 − 38)' },
          { id: 'e75', text: '75 : (18 − 13)' },
          { id: 'e30', text: '(30 + 10) : 8' },
          { id: 'e48', text: '(48 − 21) × 3' },
        ],
        right: [
          { id: 'v5', text: '5' },
          { id: 'v92', text: '92' },
          { id: 'v81', text: '81' },
          { id: 'v15', text: '15' },
        ],
        pairs: [['e23', 'v92'], ['e75', 'v15'], ['e30', 'v5'], ['e48', 'v81']],
        hints: ['Tính trong ngoặc trước: 18 − 13 = 5, rồi 75 : 5.'],
      },
      {
        type: 'choice', section: 'Tiết 3',
        q: '3. Khoanh vào chữ đặt trước biểu thức có giá trị lớn nhất.',
        options: ['72 : (16 − 8)', '2 × (35 − 31)', '80 : (3 + 5)'],
        answer: 2,
        hints: ['Tính trong ngoặc trước: 72 : 8 = 9, 2 × 4 = 8, 80 : 8 = 10.'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '4. Số?\nTrên sân có 8 con thỏ và 8 con gà. Để tính tổng số chân của 8 con thỏ và 8 con gà, ta có thể làm như sau:\nGhép 1 con thỏ và 1 con gà thành 1 cặp, được 8 cặp như vậy.',
        blanks: [
          { label: 'Số chân thỏ và gà ở 1 cặp là: ... + ... = ... (chân).', answer: '4,2,6', validate: swapPairValidate(4, 2, 6) },
          { label: 'Số chân thỏ và gà ở 8 cặp là: ... × ... = ... (chân).', answer: '6,8,48', validate: swapPairValidate(6, 8, 48) },
        ],
        hints: ['Một con thỏ có 4 chân, một con gà có 2 chân. Mỗi cặp có 6 chân, 8 cặp thì nhân với 8.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '1. Viết chữ cái thích hợp vào chỗ chấm.\nA: 12 × (7 − 4);  B: 12 × 7 − 4;\nC: (80 + 40) : 4;  D: 80 + 40 : 4.',
        blanks: [
          { label: 'a) Biểu thức có giá trị lớn nhất là biểu thức', answer: 'D', validate: letterValidate('D') },
          { label: 'b) Biểu thức có giá trị bé nhất là biểu thức', answer: 'C', validate: letterValidate('C') },
        ],
        hints: ['Tính giá trị từng biểu thức: A = 12 × 3 = 36, B = 84 − 4 = 80, C = 120 : 4 = 30, D = 80 + 10 = 90.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '2. Lúc đầu Mai cắm được 5 lọ hoa, sau đó Mai cắm thêm được 3 lọ hoa như vậy. Hỏi có tất cả bao nhiêu bông hoa trong các lọ hoa đó? Biết mỗi lọ đều cắm 10 bông hoa.',
        wordProblem: true,
        blanks: [{ label: 'Số bông hoa', answer: '80' }],
        hints: ['Có tất cả 5 + 3 = 8 lọ hoa; mỗi lọ 10 bông nên có (5 + 3) × 10 bông hoa.'],
      },
      {
        type: 'fill', section: 'Tiết 4',
        q: '3. Tính giá trị của biểu thức bằng cách thuận tiện.',
        blanks: [
          { label: 'a) 476 + 70 + 30 = ...', answer: '476 + 100', validate: exprValidate('476 + 100', '100 + 476', '476 + (70 + 30)') },
          { label: '= ...', answer: '576' },
          { label: 'b) 67 + 125 + 75 = ...', answer: '67 + 200', validate: exprValidate('67 + 200', '200 + 67', '67 + (125 + 75)') },
          { label: '= ...', answer: '267' },
        ],
        hints: ['Cộng hai số có tổng tròn trăm trước: 70 + 30 = 100, 125 + 75 = 200.'],
      },
      {
        type: 'table', section: 'Tiết 4',
        q: '4. Cho các biểu thức:\n15 × (7 − 4);  74 : (6 − 4);  (24 + 60) : 4.\nViết giá trị của các biểu thức đã cho theo thứ tự từ bé đến lớn.',
        rows: [[blank(21), blank(37), blank(45)]],
        hints: ['Tính trong ngoặc trước: 15 × 3 = 45, 74 : 2 = 37, 84 : 4 = 21.'],
      },
    ],
  },
  {
    id: 'bai-39', number: 39, title: 'So sánh số lớn gấp mấy lần số bé',
    questions: [
      {
        type: 'table', section: 'Tiết 1',
        q: '1. Số?',
        rows: [
          ['Số lớn', sampleCell(8), 8, 20, 70],
          ['Số bé', sampleCell(4), 2, 5, 7],
          ['Số lớn gấp mấy lần số bé?', sampleCell(2), blank(4), blank(4), blank(10)],
        ],
        hints: ['Muốn biết số lớn gấp mấy lần số bé, ta lấy số lớn chia cho số bé: 8 : 4 = 2.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai39T1Segments,
        q: '2. Số?',
        blanks: [
          { label: 'a) Đoạn thẳng AB dài hơn đoạn thẳng CD là ... cm.', answer: '12' },
          { label: 'b) Đoạn thẳng AB dài gấp ... lần đoạn thẳng CD.', answer: '3' },
        ],
        hints: ['a) "Dài hơn bao nhiêu" là phép trừ: 18 − 6. b) "Gấp mấy lần" là phép chia: 18 : 6.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Lớp học cờ vua có 27 bạn, lớp học đá cầu có 9 bạn. Hỏi số bạn học cờ vua gấp mấy lần số bạn học đá cầu?',
        wordProblem: true,
        blanks: [{ label: 'Số bạn học cờ vua gấp số bạn học đá cầu (lần)', answer: '3' }],
      },
      {
        type: 'table', section: 'Tiết 2',
        q: '1. Số?',
        rows: [
          ['Số lớn', sampleCell(10), 18, 35, 48],
          ['Số bé', sampleCell(2), 6, 7, 8],
          ['Số lớn hơn số bé bao nhiêu đơn vị?', sampleCell(8), blank(12), blank(28), blank(40)],
          ['Số lớn gấp mấy lần số bé?', sampleCell(5), blank(3), blank(5), blank(6)],
        ],
        hints: ['"Hơn bao nhiêu đơn vị" là phép trừ (10 − 2 = 8); "gấp mấy lần" là phép chia (10 : 2 = 5).'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Số?',
        blanks: [
          { label: '21 —: 3→ ... —× 7→ ...', answer: '7,49', validate: listValidate(['7', '49']) },
        ],
        hints: ['Tính theo chiều mũi tên: 21 : 3 = 7, rồi lấy 7 × 7.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Con chó cân nặng 18 kg. Con gà cân nặng 2 kg. Con ngỗng cân nặng 6 kg. Hỏi:\na) Con chó nặng gấp mấy lần con ngỗng?\nb) Con ngỗng nặng gấp mấy lần con gà?\nc) Con chó nặng gấp mấy lần con gà?',
        wordProblem: true,
        blanks: [
          { label: 'a) Con chó nặng gấp con ngỗng (lần)', answer: '3' },
          { label: 'b) Con ngỗng nặng gấp con gà (lần)', answer: '3' },
          { label: 'c) Con chó nặng gấp con gà (lần)', answer: '9' },
        ],
        hints: ['Muốn biết con nặng hơn gấp mấy lần con nhẹ hơn, lấy cân nặng lớn chia cho cân nặng bé: 18 : 6, 6 : 2, 18 : 2.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Số?',
        blanks: [
          { label: 'a) Số 24 gấp ... lần số 6.', answer: '4' },
          { label: 'b) Số 24 gấp ... lần số 2.', answer: '12' },
          { label: 'c) Số 24 gấp ... lần số 8.', answer: '3' },
          { label: 'd) Số 24 gấp ... lần số 4.', answer: '6' },
        ],
        hints: ['Lấy 24 chia cho số bé: 24 : 6, 24 : 2, 24 : 8, 24 : 4.'],
      },
    ],
  },
  {
    id: 'bai-40', number: 40, title: 'Luyện tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [
          { label: '116 × 5 =', answer: '580' },
          { label: '308 × 3 =', answer: '924' },
          divBlank(815, 5),
          divBlank(642, 3),
        ],
        hints: ['Nhân, chia lần lượt từng hàng: 308 × 3 thì 8 × 3 = 24, viết 4 nhớ 2; 0 × 3 = 0, thêm 2 bằng 2; 3 × 3 = 9.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Số?',
        blanks: [
          { label: 'a) Số 12 gấp lên 3 lần được số ....', answer: '36' },
          { label: 'b) Số 12 giảm đi 2 lần được số ....', answer: '6' },
          { label: 'c) Số tìm được ở câu a gấp ... lần số tìm được ở câu b.', answer: '6' },
        ],
        hints: ['"Gấp lên 3 lần" là nhân với 3, "giảm đi 2 lần" là chia cho 2. c) Muốn biết số lớn gấp mấy lần số bé, lấy số lớn chia cho số bé.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Can thứ nhất có 2 l nước. Số lít nước ở can thứ hai gấp 5 lần số lít nước ở can thứ nhất. Hỏi:\na) Cả hai can có bao nhiêu lít nước?\nb) Can thứ hai có nhiều hơn can thứ nhất bao nhiêu lít nước?',
        wordProblem: true,
        blanks: [
          { label: 'a) Cả hai can có (l)', answer: '12' },
          { label: 'b) Can thứ hai nhiều hơn can thứ nhất (l)', answer: '8' },
        ],
        hints: ['Can thứ hai có 2 × 5 = 10 (l) nước. a) Cộng số lít của hai can. b) Lấy 10 trừ đi 2.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. a) Tính giá trị của biểu thức.',
        blanks: [
          { label: '473 + 18 − 215 = ...', answer: '491 − 215', validate: exprValidate('491 − 215') },
          { label: '= ...', answer: '276' },
          { label: '370 − (319 − 270) = ...', answer: '370 − 49', validate: exprValidate('370 − 49') },
          { label: '= ...', answer: '321' },
          { label: '185 + 71 × 2 = ...', answer: '185 + 142', validate: exprValidate('185 + 142') },
          { label: '= ...', answer: '327' },
          { label: '38 + 72 × 3 = ...', answer: '38 + 216', validate: exprValidate('38 + 216') },
          { label: '= ...', answer: '254' },
          { label: 'b) Viết biểu thức vào chỗ chấm cho thích hợp.<br>Trong câu a, biểu thức có giá trị lớn nhất là ...', answer: '185 + 71 × 2', validate: exprValidate('185 + 71 × 2', '185 + 71 × 2 = 327') },
          { label: 'biểu thức có giá trị bé nhất là ...', answer: '38 + 72 × 3', validate: exprValidate('38 + 72 × 3', '38 + 72 × 3 = 254') },
        ],
        hints: [
          'Có dấu ngoặc thì tính trong ngoặc trước; có phép nhân thì nhân trước rồi mới cộng, trừ; chỉ có cộng, trừ thì tính từ trái sang phải.',
          'b) So sánh bốn giá trị 276, 321, 327, 254 rồi chép lại biểu thức có giá trị lớn nhất và biểu thức có giá trị bé nhất.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Mấy tháng trước, bác Năm mua một con lợn cân nặng 9 kg về nuôi. Bây giờ con lợn đó cân nặng 36 kg. Hỏi:\na) Bây giờ con lợn cân nặng gấp mấy lần lúc mới mua về?\nb) Bây giờ con lợn đó nặng hơn lúc mới mua về bao nhiêu ki-lô-gam?',
        wordProblem: true,
        blanks: [
          { label: 'a) Con lợn bây giờ nặng gấp lúc mới mua về (lần)', answer: '4' },
          { label: 'b) Con lợn bây giờ nặng hơn lúc mới mua về (kg)', answer: '27' },
        ],
        hints: ['a) "Gấp mấy lần" là phép chia: 36 : 9. b) "Nặng hơn bao nhiêu" là phép trừ: 36 − 9.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Tính giá trị của biểu thức bằng cách thuận tiện.',
        blanks: [
          { label: 'a) 9 × 2 × 5 = ...', answer: '9 × 10', validate: exprValidate('9 × 10', '10 × 9', '9 × (2 × 5)') },
          { label: '= ...', answer: '90' },
          { label: 'b) 5 × 7 × 2 = ...', answer: '5 × 2 × 7', validate: exprValidate('5 × 2 × 7', '2 × 5 × 7', '7 × 5 × 2', '7 × 2 × 5', '(5 × 2) × 7', '7 × (5 × 2)', '(2 × 5) × 7', '7 × (2 × 5)') },
          { label: '= ...', answer: '10 × 7', validate: exprValidate('10 × 7', '7 × 10') },
          { label: '= ...', answer: '70' },
        ],
        hints: ['Nhân hai số có tích tròn chục trước: 2 × 5 = 10. Ở câu b), đổi chỗ 7 và 2 để được 5 × 2 × 7.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Số?',
        blanks: [
          { label: '40 giảm đi 5 lần thì được một số. Vậy 40 gấp số đó là ... lần.', answer: '5' },
        ],
        hints: ['40 giảm đi 5 lần được 40 : 5 = 8. Lấy 40 chia cho 8 để biết 40 gấp 8 mấy lần.'],
      },
    ],
  },
  {
    id: 'bai-41', number: 41, title: 'Ôn tập phép nhân, phép chia trong phạm vi 100, 1 000',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 30 × 2 =', answer: '60' }, { label: 'a) 20 × 4 =', answer: '80' },
          { label: 'a) 50 × 2 =', answer: '100' }, { label: 'a) 20 × 2 =', answer: '40' },
          { label: 'b) 60 : 3 =', answer: '20' }, { label: 'b) 100 : 2 =', answer: '50' },
          { label: 'b) 40 : 2 =', answer: '20' }, { label: 'b) 90 : 3 =', answer: '30' },
        ],
        hints: ['Nhẩm theo chục: 3 chục × 2 = 6 chục = 60; 6 chục : 3 = 2 chục = 20; 10 chục : 2 = 5 chục = 50.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [
          { label: 'a) 46 × 2 =', answer: '92' },
          { label: 'a) 13 × 7 =', answer: '91' },
          { label: 'a) 29 × 3 =', answer: '87' },
          { ...divBlank(82, 2), label: 'b) 82 : 2 = ... (dư ...)' },
          { ...divBlank(72, 6), label: 'b) 72 : 6 = ... (dư ...)' },
          { ...divBlank(97, 9), label: 'b) 97 : 9 = ... (dư ...)' },
        ],
        hints: ['Ở 97 : 9: 9 : 9 = 1, hạ 7 xuống; 7 : 9 = 0 (dư 7), viết 0 vào thương.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai41T1Calcs,
        q: '3. Đ, S?\nQuan sát các phép tính trong hình rồi cho biết mỗi phép tính đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) 23 × 4 = 62', answer: 'S', validate: dsValidate(false) },
          { label: 'b) 18 × 5 = 90', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) 92 : 7 = 12 (dư 8)', answer: 'S', validate: dsValidate(false) },
          { label: 'd) 74 : 4 = 18 (dư 2)', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: [
          'a) 3 × 4 = 12, viết 2 nhớ 1; 2 × 4 = 8, thêm 1 bằng 9 — phép tính đã quên số nhớ.',
          'c) Số dư phải bé hơn số chia: 22 : 7 được 3 chứ không phải 2 (7 × 3 = 21, dư 1). Thử lại d): 18 × 4 + 2 = 74.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Có 6 xe ô tô chở học sinh đi thăm Bảo tàng Lịch sử Việt Nam, mỗi xe chở 32 học sinh. Hỏi có tất cả bao nhiêu học sinh đi thăm Bảo tàng Lịch sử Việt Nam?',
        wordProblem: true,
        blanks: [{ label: 'Số học sinh', answer: '192' }],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Một thùng có 46 l nước mắm. Hỏi cần ít nhất bao nhiêu cái can loại 7 l để chứa hết lượng nước mắm đó?',
        wordProblem: true,
        blanks: [{ label: 'Số cái can ít nhất', answer: '7' }],
        hints: ['46 : 7 = 6 (dư 4): 6 can đựng được 42 l, còn thừa 4 l nước mắm nên cần thêm 1 can nữa.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính nhẩm.',
        blanks: [
          { label: 'a) 200 × 3 =', answer: '600' }, { label: 'a) 300 × 2 =', answer: '600' },
          { label: 'a) 200 × 2 =', answer: '400' }, { label: 'a) 100 × 6 =', answer: '600' },
          { label: 'b) 900 : 3 =', answer: '300' }, { label: 'b) 600 : 2 =', answer: '300' },
          { label: 'b) 800 : 8 =', answer: '100' }, { label: 'b) 1 000 : 5 =', answer: '200' },
        ],
        hints: ['Nhẩm theo trăm: 2 trăm × 3 = 6 trăm = 600; 9 trăm : 3 = 3 trăm = 300; 10 trăm : 5 = 2 trăm = 200.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [
          { label: 'a) 312 × 3 =', answer: '936' },
          { label: 'a) 105 × 7 =', answer: '735' },
          { label: 'a) 81 × 9 =', answer: '729' },
          { ...divBlank(936, 3), label: 'b) 936 : 3 = ... (dư ...)' },
          { ...divBlank(852, 6), label: 'b) 852 : 6 = ... (dư ...)' },
          { ...divBlank(690, 8), label: 'b) 690 : 8 = ... (dư ...)' },
        ],
        hints: ['Ở 690 : 8: hàng trăm 6 bé hơn 8 nên lấy 69 : 8 = 8 (dư 5); hạ 0 xuống được 50, 50 : 8 = 6 (dư 2).'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai41T2Calcs,
        q: '3. Đ, S?\nQuan sát các phép tính trong hình rồi cho biết mỗi phép tính đúng hay sai (viết Đ hoặc S).',
        blanks: [
          { label: 'a) 96 × 8 = 728', answer: 'S', validate: dsValidate(false) },
          { label: 'b) 108 × 5 = 540', answer: 'Đ', validate: dsValidate(true) },
          { label: 'c) 839 : 4 = 29 (dư 3)', answer: 'S', validate: dsValidate(false) },
          { label: 'd) 740 : 8 = 92 (dư 4)', answer: 'Đ', validate: dsValidate(true) },
        ],
        hints: [
          'a) 6 × 8 = 48, viết 8 nhớ 4; 9 × 8 = 72, thêm 4 bằng 76 — tích đúng là 768.',
          'c) Sau khi chia 8 : 4 = 2, hạ 3 xuống: 3 : 4 = 0, phải viết 0 vào thương, nên 839 : 4 = 209 (dư 3). Thử lại d): 92 × 8 + 4 = 740.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một cửa hàng có 132 quả táo. Người ta xếp vào các khay, mỗi khay 6 quả táo. Hỏi xếp được bao nhiêu khay táo như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số khay táo', answer: '22' }],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai41T2Puzzles,
        q: '5. Viết chữ số thích hợp vào ô trống.',
        blanks: [
          { label: 'a) 1...3 × 6 = 61...', boxes: true, answer: '0,8', validate: listValidate(['0', '8']) },
          { label: 'b) 4... × 7 = ......8', boxes: true, answer: '4,3,0', validate: listValidate(['4', '3', '0']) },
          { label: 'c) ......5 × 3 = 64...', boxes: true, answer: '2,1,5', validate: listValidate(['2', '1', '5']) },
        ],
        hints: [
          'a) Tích bắt đầu bằng 61 nên thừa số thứ nhất chỉ có thể là 103 (vì 113 × 6 đã là 678).',
          'b) Chữ số hàng đơn vị nhân với 7 phải có tận cùng là 8: chỉ có 4 × 7 = 28. c) Tích là 64... nên thừa số thứ nhất khoảng 640 : 3, có tận cùng là 5.',
        ],
      },
      {
        // Each row is its own "Khoanh vào chữ" with four choices, so the three
        // rows share one screen as choice rows graded on "Kiểm tra".
        type: 'compare', section: 'Tiết 3',
        q: '1. Khoanh vào chữ đặt trước câu trả lời đúng.',
        rows: [
          { left: 'a) Kết quả của phép nhân 181 × 4 là:', options: ['A. 424', 'B. 742', 'C. 724', 'D. 721'], answer: 'C' },
          { left: 'b) Kết quả của phép chia 806 : 2 là:', options: ['A. 43', 'B. 403', 'C. 430', 'D. 304'], answer: 'B' },
          { left: 'c) Số dư của phép chia 465 : 7 là:', options: ['A. 6', 'B. 5', 'C. 4', 'D. 3'], answer: 'D' },
        ],
        hints: ['Đặt tính ra nháp: 181 × 4, 806 : 2 (nhớ viết 0 vào thương khi hạ 0 xuống), 465 : 7 = 66 (dư ...).'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '2. Số?',
        blanks: [
          { label: 'a) ... × 8 = 280', answer: '35' },
          { label: 'b) ... : 9 = 108', answer: '972' },
          { label: 'c) 84 : ... = 6', answer: '14' },
          { label: 'd) ... × 7 = 161', answer: '23' },
        ],
        hints: ['Muốn tìm thừa số, lấy tích chia cho thừa số kia (280 : 8). Muốn tìm số bị chia, lấy thương nhân với số chia (108 × 9). Muốn tìm số chia, lấy số bị chia chia cho thương (84 : 6).'],
      },
      {
        type: 'fill', section: 'Tiết 3',
        q: '3. Trong vườn nhà An có 19 cây chanh, số cây cam gấp 4 lần số cây chanh. Hỏi trong vườn nhà An có bao nhiêu cây chanh và cây cam?',
        wordProblem: true,
        blanks: [{ label: 'Số cây chanh và cây cam', answer: '95' }],
        hints: ['Bước 1: số cây cam là 19 × 4 = 76 (cây). Bước 2: cộng số cây chanh và số cây cam.'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai41T3Strawberries,
        q: '4. Số?',
        blanks: [
          { label: 'a) 1/6 số quả dâu tây là ... quả dâu tây.', answer: '4' },
          { label: 'b) 1/8 số quả dâu tây là ... quả dâu tây.', answer: '3' },
        ],
        hints: ['Đếm số quả dâu tây: 4 hàng, mỗi hàng 6 quả. Lấy số quả chia cho 6 (câu a) và chia cho 8 (câu b).'],
      },
      {
        type: 'fill', section: 'Tiết 3', img: imgBai41T3Puzzle,
        q: '5. Viết chữ số 0, 1, 2, 3 thích hợp vào ô trống.\n(Mỗi chữ số dùng một lần.)',
        blanks: [
          { label: '......... × ... = 306', boxes: true, answer: '1,0,2,3', validate: listValidate(['1', '0', '2', '3']) },
        ],
        hints: ['Tích có tận cùng là 6 nên thử thừa số thứ hai là 2 hoặc 3: 306 : 3 = 102 dùng đúng các chữ số còn lại.'],
      },
    ],
  },
  {
    id: 'bai-42', number: 42, title: 'Ôn tập biểu thức số',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 527 − 346 + 74 = ...', answer: '181 + 74', validate: exprValidate('181 + 74') },
          { label: '= ...', answer: '255' },
          { label: 'b) 72 × 3 : 9 = ...', answer: '216 : 9', validate: exprValidate('216 : 9', '8 × 3', '3 × 8') },
          { label: '= ...', answer: '24' },
          { label: 'c) 28 + 45 − 60 = ...', answer: '73 − 60', validate: exprValidate('73 − 60') },
          { label: '= ...', answer: '13' },
          { label: 'd) 96 : 6 × 8 = ...', answer: '16 × 8', validate: exprValidate('16 × 8') },
          { label: '= ...', answer: '128' },
        ],
        hints: ['Biểu thức chỉ có phép cộng, trừ (hoặc chỉ có phép nhân, chia) thì tính lần lượt từ trái sang phải: 527 − 346 = 181, rồi 181 + 74.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 24 × 3 − 52 = ...', answer: '72 − 52', validate: exprValidate('72 − 52') },
          { label: '= ...', answer: '20' },
          { label: 'b) 518 + 70 : 5 = ...', answer: '518 + 14', validate: exprValidate('518 + 14') },
          { label: '= ...', answer: '532' },
          { label: 'c) 91 : 7 + 69 = ...', answer: '13 + 69', validate: exprValidate('13 + 69') },
          { label: '= ...', answer: '82' },
          { label: 'd) 200 − 18 × 5 = ...', answer: '200 − 90', validate: exprValidate('200 − 90') },
          { label: '= ...', answer: '110' },
        ],
        hints: ['Biểu thức có phép cộng, trừ và phép nhân, chia thì thực hiện phép nhân, chia trước: 70 : 5 = 14, rồi 518 + 14.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '3. Khối lớp Ba của một trường tiểu học có 7 lớp, mỗi lớp có 31 học sinh và 1 lớp có 34 học sinh. Hỏi khối lớp Ba của trường đó có tất cả bao nhiêu học sinh?',
        wordProblem: true,
        blanks: [{ label: 'Số học sinh khối lớp Ba', answer: '251' }],
        hints: ['Bước 1: 7 lớp, mỗi lớp 31 học sinh có 31 × 7 = 217 (học sinh). Bước 2: cộng thêm 34 học sinh của lớp còn lại.'],
      },
      {
        // One book question, two colorings (a, then b in a different color) —
        // a multi-select and a single choice can't share one choice screen.
        type: 'choice', section: 'Tiết 1', multi: true,
        q: '4. a) Tô màu vào các ô tô ghi biểu thức có giá trị lớn hơn 90.\nChọn tất cả các ô tô cần tô màu (có thể có nhiều đáp án đúng).',
        options: ['20 × 3 + 30', '70 + 80 : 2', '100 : 5 + 80', '20 × 5 − 20', '30 + 40 × 2'],
        answer: [1, 2, 4],
        hints: ['Tính giá trị từng biểu thức (nhân, chia trước): 20 × 3 + 30 = 90, 70 + 80 : 2 = 110, 100 : 5 + 80 = 100, 20 × 5 − 20 = 80, 30 + 40 × 2 = 110. "Lớn hơn 90" thì không tính ô tô có giá trị bằng 90.'],
      },
      {
        type: 'choice', section: 'Tiết 1',
        q: '4. b) Tô màu (khác với màu đã tô ở câu a) vào ô tô ghi biểu thức có giá trị bé nhất trong các biểu thức trên.',
        options: ['20 × 3 + 30', '70 + 80 : 2', '100 : 5 + 80', '20 × 5 − 20', '30 + 40 × 2'],
        answer: 3,
        hints: ['Giá trị các biểu thức là 90, 110, 100, 80, 110.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Viết dấu phép tính “<span class="gw-sample-text">+</span>, <span class="gw-sample-text">×</span>” thích hợp vào ô trống.\n4 ☐ 4 ☐ 4 = 20',
        blanks: [
          { label: 'Cách 1: 4 ... 4 ... 4 = 20', boxes: true, answer: '×,+', validate: opsValidate(['×', '+'], ['+', '×']) },
          { label: 'Cách 2: 4 ... 4 ... 4 = 20', boxes: true, answer: '+,×', validate: opsValidate(['+', '×'], ['×', '+']) },
        ],
        hints: ['Thử lần lượt: 4 + 4 + 4 = 12, 4 × 4 × 4 = 64. Khi có cả dấu + và dấu × thì nhân trước: 4 × 4 + 4 = 16 + 4.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 75 − (68 − 23) = ...', answer: '75 − 45', validate: exprValidate('75 − 45') },
          { label: '= ...', answer: '30' },
          { label: 'b) 8 × (63 : 7) = ...', answer: '8 × 9', validate: exprValidate('8 × 9') },
          { label: '= ...', answer: '72' },
          { label: 'c) 67 + (56 + 44) = ...', answer: '67 + 100', validate: exprValidate('67 + 100') },
          { label: '= ...', answer: '167' },
          { label: 'd) 42 : (2 × 3) = ...', answer: '42 : 6', validate: exprValidate('42 : 6') },
          { label: '= ...', answer: '7' },
        ],
        hints: ['Biểu thức có dấu ngoặc thì tính trong ngoặc trước: 68 − 23 = 45, rồi 75 − 45.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Tính giá trị của biểu thức bằng cách thuận tiện.',
        blanks: [
          { label: 'a) 79 + 57 + 43 = ...', answer: '79 + 100', validate: exprValidate('79 + 100', '100 + 79', '79 + (57 + 43)') },
          { label: '= ...', answer: '179' },
          { label: 'b) 50 × 4 × 2 = ...', answer: '50 × 8', validate: exprValidate('50 × 8', '8 × 50', '50 × (4 × 2)', '100 × 4', '4 × 100', '(50 × 2) × 4', '50 × 2 × 4') },
          { label: '= ...', answer: '400' },
        ],
        hints: ['a) Cộng hai số có tổng tròn trăm trước: 57 + 43 = 100. b) Nhân 4 × 2 = 8 trước (hoặc 50 × 2 = 100).'],
      },
      {
        type: 'match', section: 'Tiết 2',
        q: '3. Nối mỗi biểu thức với số là giá trị của biểu thức đó.',
        left: [
          { id: 'e5', text: '5 × (35 − 25)' },
          { id: 'e54', text: '(54 + 36) : 3' },
          { id: 'e12', text: '(12 + 18) × 4' },
          { id: 'e132', text: '132 − 84 : 2' },
        ],
        right: [
          { id: 'v120', text: '120' },
          { id: 'v90', text: '90' },
          { id: 'v50', text: '50' },
          { id: 'v30', text: '30' },
        ],
        pairs: [['e5', 'v50'], ['e54', 'v30'], ['e12', 'v120'], ['e132', 'v90']],
        hints: ['Tính trong ngoặc trước; không có ngoặc thì chia trước: 84 : 2 = 42, rồi 132 − 42.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Người ta đóng 280 cái bánh vào các hộp, mỗi hộp 8 cái bánh. Sau đó đóng các hộp vào các thùng, mỗi thùng 5 hộp. Hỏi người ta đóng được bao nhiêu thùng bánh như vậy?',
        wordProblem: true,
        blanks: [{ label: 'Số thùng bánh', answer: '7' }],
        hints: ['Bước 1: số hộp bánh là 280 : 8 = 35 (hộp). Bước 2: chia số hộp vào các thùng, mỗi thùng 5 hộp.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Viết dấu phép tính “<span class="gw-sample-text">+</span>, <span class="gw-sample-text">×</span>, <span class="gw-sample-text">:</span>” thích hợp vào ô trống để được biểu thức:',
        blanks: [
          { label: 'a) Có giá trị lớn nhất có thể: 3 × (3 ... 3)', boxes: true, answer: '×', validate: opsValidate(['×']) },
          { label: 'b) Có giá trị bé nhất có thể: 3 × (3 ... 3)', boxes: true, answer: ':', validate: opsValidate([':']) },
        ],
        hints: ['Thử cả ba dấu trong ngoặc: 3 + 3 = 6, 3 × 3 = 9, 3 : 3 = 1 — rồi nhân với 3.'],
      },
    ],
  },
  {
    id: 'bai-43', number: 43, title: 'Ôn tập hình học và đo lường',
    questions: [
      {
        type: 'fill', section: 'Tiết 1', img: imgBai43T1Figure,
        q: '1. a) Số?\nTrong hình bên có:',
        blanks: [
          { label: '... góc không vuông đỉnh B;', answer: '2' },
          { label: '... góc không vuông đỉnh A;', answer: '3' },
          { label: '... góc vuông.', answer: '11' },
          { label: 'b) Viết tiếp vào chỗ chấm cho thích hợp.<br>Trong hình vẽ trên:<br>– Trung điểm của đoạn thẳng AC là điểm ...', answer: 'K', validate: letterValidate('K') },
          { label: '– Trung điểm của đoạn thẳng ED là điểm ...', answer: 'I', validate: letterValidate('I') },
          { label: '– Trung điểm của đoạn thẳng KH là điểm ...', answer: 'I', validate: letterValidate('I') },
          { label: '– Trung điểm của đoạn thẳng BH là điểm ...', answer: 'K', validate: letterValidate('K') },
          { label: '– Trung điểm của đoạn thẳng MN là điểm ...', answer: 'H', validate: letterValidate('H') },
        ],
        hints: [
          'Đếm ô vuông: từ B xuống K là 4 ô, từ K sang A và sang C cũng là 4 ô, nên góc đỉnh B cạnh BA, BC là góc vuông; hai góc còn lại ở đỉnh B (tạo bởi BK với BA, với BC) không vuông. Ở đỉnh A có ba góc: tạo bởi AB, AC và AE.',
          'Góc vuông: 4 góc ở đỉnh K, 4 góc ở đỉnh I, 2 góc ở đỉnh H và góc đỉnh B cạnh BA, BC. Trung điểm cách đều hai đầu đoạn thẳng — hãy đếm ô vuông.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai43T1Circle,
        q: '3. Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'a) Các đường kính của hình tròn có trong hình bên là: ...', answer: 'AB, CD', validate: letterGroupsValidate(['AB', 'CD']) },
          { label: 'b) Các bán kính của hình tròn có trong hình bên là ...', answer: 'OA, OB, OC, OD, OE', validate: letterGroupsValidate(['OA', 'OB', 'OC', 'OD', 'OE']) },
          { label: 'c) Đường kính AB gấp ... lần bán kính OB.', answer: '2' },
        ],
        hints: [
          'Đường kính là đoạn thẳng đi qua tâm O, nối hai điểm trên đường tròn. Đoạn AC không đi qua tâm O nên không phải đường kính.',
          'Bán kính nối tâm O với một điểm trên đường tròn: O nối với A, B, C, D và E. Đường kính dài gấp 2 lần bán kính.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai43T1Castle,
        q: '4. Số?\nTrong hình trên có:',
        blanks: [
          { label: '... khối lập phương nhỏ;', answer: '20' },
          { label: '... khối trụ;', answer: '2' },
          { label: '... khối cầu.', answer: '1' },
        ],
        hints: [
          'Tầng dưới xếp thành hình vuông, mỗi cạnh 4 khối lập phương (4 hàng, mỗi hàng 4 khối); tầng trên có 4 khối lập phương ở 4 góc.',
          'Hai khối trụ là khối to ở giữa và khối cao, nhỏ đặt trên nó; khối cầu ở trên cùng.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai43T1Box,
        q: '5. Số?\nNgười ta xếp các khối gỗ dạng khối lập phương nhỏ thành khối hộp chữ nhật (như hình vẽ) rồi sơn màu xanh tất cả các mặt bên ngoài.\nTrong hình bên có:',
        blanks: [
          { label: 'a) ... khối gỗ được sơn 3 mặt.', answer: '8' },
          { label: 'b) ... khối gỗ được sơn 2 mặt.', answer: '8' },
        ],
        hints: [
          'Khối hộp gồm 2 tầng, mỗi tầng 2 hàng, mỗi hàng 4 khối gỗ. Khối gỗ ở góc được sơn 3 mặt — khối hộp chữ nhật có 8 góc.',
          'Các khối gỗ còn lại (2 khối ở giữa mỗi hàng) nằm trên cạnh dài của khối hộp nên được sơn 2 mặt.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai43T2Figures,
        q: '1. a) Viết tiếp vào chỗ chấm cho thích hợp.',
        blanks: [
          { label: 'Độ dài đường gấp khúc ABCD là: ... = ...', answer: '35 + 35 + 35,105 mm', validate: polylineValidate([35, 35, 35], 'mm') },
          { label: 'b) Viết số thích hợp vào chỗ chấm.<br>Cả ba quả xoài cân nặng ... g.', answer: '800' },
        ],
        hints: [
          'a) Độ dài đường gấp khúc bằng tổng độ dài các đoạn thẳng: 35 mm + 35 mm + 35 mm (hoặc 35 mm × 3).',
          'b) Cân thăng bằng: ba quả xoài cùng quả cân 200 g nặng bằng 500 g + 500 g = 1 000 g. Lấy 1 000 g trừ đi 200 g.',
        ],
      },
      {
        // Four "Khoanh vào chữ" rows with three choices each, graded together.
        type: 'compare', section: 'Tiết 2', img: imgBai43T2Objects,
        q: '2. Khoanh vào chữ đặt trước kết quả thích hợp.',
        rows: [
          { left: 'a) Hộp bút dày khoảng:', options: ['A. 15 cm', 'B. 15 mm', 'C. 15 dm'], answer: 'B' },
          { left: 'b) Cái bút bi cân nặng khoảng:', options: ['A. 8 g', 'B. 80 g', 'C. 8 kg'], answer: 'A' },
          { left: 'c) Một bát (chén) đầy nước có khoảng:', options: ['A. 2 l nước', 'B. 20 ml nước', 'C. 200 ml nước'], answer: 'C' },
          { left: 'd) Em nên uống nước ở nhiệt độ khoảng:', options: ['A. 25 °C', 'B. 70 °C', 'C. 100 °C'], answer: 'A' },
        ],
        hints: ['Hãy nghĩ tới đồ vật thật: hộp bút dày chưa tới 2 cm; cái bút bi rất nhẹ; một bát nước uống được vài ngụm lớn; nước 70 °C hay 100 °C thì rất nóng, uống sẽ bị bỏng.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '3. Tính.',
        blanks: [
          { label: 'a) 540 mm + 260 mm =', answer: '800 mm', validate: unitValidate(800, 'mm') },
          { label: 'a) 180 mm × 4 =', answer: '720 mm', validate: unitValidate(720, 'mm') },
          { label: 'a) 732 mm − 32 mm =', answer: '700 mm', validate: unitValidate(700, 'mm') },
          { label: 'a) 720 mm : 8 =', answer: '90 mm', validate: unitValidate(90, 'mm') },
          { label: 'b) 327 ml + 400 ml =', answer: '727 ml', validate: unitValidate(727, 'ml') },
          { label: 'b) 150 ml × 6 =', answer: '900 ml', validate: unitValidate(900, 'ml') },
          { label: 'b) 1 000 ml − 300 ml =', answer: '700 ml', validate: unitValidate(700, 'ml') },
          { label: 'b) 700 ml : 7 =', answer: '100 ml', validate: unitValidate(100, 'ml') },
          { label: 'c) 270 g + 538 g =', answer: '808 g', validate: unitValidate(808, 'g') },
          { label: 'c) 240 g × 3 =', answer: '720 g', validate: unitValidate(720, 'g') },
          { label: 'c) 730 g − 430 g =', answer: '300 g', validate: unitValidate(300, 'g') },
          { label: 'c) 960 g : 6 =', answer: '160 g', validate: unitValidate(160, 'g') },
        ],
        hints: ['Tính như với các số rồi viết thêm tên đơn vị vào kết quả, ví dụ 540 mm + 260 mm = 800 mm.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Một gói mì tôm cân nặng 75 g, một hộp ngũ cốc cân nặng 500 g. Hỏi 5 gói mì tôm và 1 hộp ngũ cốc cân nặng bao nhiêu gam?',
        wordProblem: true,
        blanks: [{ label: '5 gói mì tôm và 1 hộp ngũ cốc cân nặng (g)', answer: '875' }],
        hints: ['Bước 1: 5 gói mì tôm cân nặng 75 × 5 = 375 (g). Bước 2: cộng thêm cân nặng của hộp ngũ cốc.'],
      },
    ],
  },
  {
    id: 'bai-44', number: 44, title: 'Ôn tập chung',
    questions: [
      {
        type: 'fill', section: 'Tiết 1',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          { label: '132 × 4 =', answer: '528' },
          { label: '209 × 4 =', answer: '836' },
          { label: '113 × 6 =', answer: '678' },
        ],
        hints: ['Nhân lần lượt từ phải sang trái; ở 209 × 4: 9 × 4 = 36, viết 6 nhớ 3; 0 × 4 = 0, thêm 3 bằng 3; 2 × 4 = 8.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(75, 5), divBlank(68, 4), divBlank(96, 6)],
        hints: ['Chia lần lượt từ trái sang phải: 7 : 5 = 1 (dư 2), hạ 5 xuống được 25, 25 : 5 = 5.'],
      },
      {
        type: 'fill', section: 'Tiết 1', img: imgBai44T1Rect,
        q: '3. Viết vào chỗ chấm cho thích hợp.\nCho hình chữ nhật ABCD và hình tròn tâm O như hình vẽ.',
        blanks: [
          { label: 'a) O là trung điểm của đoạn thẳng ... và đoạn thẳng ....', answer: 'AC,BD', validate: letterGroupsValidate(['AC', 'BD']) },
          { label: 'b) Các góc vuông có trong hình vẽ là: Góc đỉnh ...; cạnh ..., ...', answer: 'A, AB, AD', validate: bai44RightAngles },
          { label: 'b) Góc vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'B, BA, BC', validate: bai44RightAngles },
          { label: 'b) Góc vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'C, CB, CD', validate: bai44RightAngles },
          { label: 'b) Góc vuông: Góc đỉnh ...; cạnh ..., ...', answer: 'D, DA, DC', validate: bai44RightAngles },
          { label: 'c) Các góc không vuông có chung đỉnh O là: Góc đỉnh O; cạnh ..., ...', answer: 'OA, OB', validate: bai44OtherAngles },
          { label: 'c) Góc không vuông: Góc đỉnh O; cạnh ..., ...', answer: 'OB, OC', validate: bai44OtherAngles },
          { label: 'c) Góc không vuông: Góc đỉnh O; cạnh ..., ...', answer: 'OC, OD', validate: bai44OtherAngles },
          { label: 'c) Góc không vuông: Góc đỉnh O; cạnh ..., ...', answer: 'OD, OA', validate: bai44OtherAngles },
        ],
        hints: [
          'a) Hai đường chéo AC và BD của hình chữ nhật cắt nhau tại O, và O là tâm hình tròn nên OA = OB = OC = OD.',
          'b) Hình chữ nhật có 4 góc vuông ở 4 đỉnh A, B, C, D. c) Hai đường chéo cắt nhau tại O tạo thành 4 góc không vuông: cạnh OA, OB; OB, OC; OC, OD; OD, OA.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '4. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 216 + 148 − 144 = ...', answer: '364 − 144', validate: exprValidate('364 − 144', '216 + 4', '216 + (148 − 144)') },
          { label: '= ...', answer: '220' },
          { label: 'b) 216 × (148 − 144) = ...', answer: '216 × 4', validate: exprValidate('216 × 4') },
          { label: '= ...', answer: '864' },
        ],
        hints: ['a) Chỉ có phép cộng, trừ thì tính lần lượt từ trái sang phải. b) Có dấu ngoặc thì tính trong ngoặc trước: 148 − 144 = 4.'],
      },
      {
        type: 'fill', section: 'Tiết 1',
        q: '5. Cửa hàng có một thùng đựng 120 l nước mắm. Cửa hàng đã lấy ra 7 can, mỗi can 10 l nước mắm. Hỏi trong thùng còn lại bao nhiêu lít nước mắm?',
        wordProblem: true,
        blanks: [{ label: 'Số lít nước mắm còn lại (l)', answer: '50' }],
        hints: ['Bước 1: số lít nước mắm đã lấy ra là 10 × 7 = 70 (l). Bước 2: lấy 120 trừ đi số đó.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '1. Đặt tính rồi tính.',
        blanks: [
          { label: '217 × 4 =', answer: '868' },
          { label: '309 × 3 =', answer: '927' },
          { label: '160 × 5 =', answer: '800' },
        ],
        hints: ['Nhân lần lượt từ phải sang trái, nhớ sang hàng bên trái khi tích từ 10 trở lên.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '2. Đặt tính rồi tính.\n(Viết thương và số dư; phép chia hết thì số dư là 0.)',
        blanks: [divBlank(576, 3), divBlank(645, 5), divBlank(847, 7)],
        hints: ['Ở 847 : 7: 8 : 7 = 1 (dư 1), hạ 4 được 14, 14 : 7 = 2; hạ 7 xuống, 7 : 7 = 1.'],
      },
      {
        type: 'fill', section: 'Tiết 2', img: imgBai44T2Figures,
        q: '3. Viết số thích hợp vào chỗ chấm.',
        blanks: [
          { label: 'a) Độ dài đường gấp khúc ABCD như hình dưới đây là ... mm.', answer: '97' },
          { label: 'b) Túi đường trong hình bên cân nặng ... g.', answer: '800' },
          { label: 'c) Rót hết nước từ một cái bình được 3 ca nước như hình vẽ.<br>Lượng nước ban đầu trong bình là ... ml.', answer: '600' },
        ],
        hints: [
          'a) Cộng độ dài ba đoạn thẳng: 34 + 18 + 45. b) Cân thăng bằng nên túi đường nặng bằng 100 g + 200 g + 500 g.',
          'c) Nước trong mỗi ca lên đến vạch 200 ml; có 3 ca như vậy.',
        ],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '4. Tính giá trị của biểu thức.',
        blanks: [
          { label: 'a) 32 × 6 : 3 = ...', answer: '192 : 3', validate: exprValidate('192 : 3', '32 × 2', '2 × 32') },
          { label: '= ...', answer: '64' },
          { label: 'b) 32 × (6 − 3) = ...', answer: '32 × 3', validate: exprValidate('32 × 3') },
          { label: '= ...', answer: '96' },
        ],
        hints: ['a) Chỉ có phép nhân, chia thì tính từ trái sang phải: 32 × 6 = 192. b) Tính trong ngoặc trước: 6 − 3 = 3.'],
      },
      {
        type: 'fill', section: 'Tiết 2',
        q: '5. Một đội trồng cây, ngày đầu trồng được 235 cây, ngày sau trồng được nhiều hơn ngày đầu 80 cây. Hỏi cả hai ngày đội trồng cây đó trồng được bao nhiêu cây?',
        wordProblem: true,
        blanks: [{ label: 'Số cây cả hai ngày', answer: '550' }],
        hints: ['Bước 1: ngày sau trồng được 235 + 80 = 315 (cây). Bước 2: cộng số cây của hai ngày.'],
      },
    ],
  },
];

// ── PERSISTENT PROGRESS (localStorage) ──────────────────────────────────────

const STORAGE_KEY = 'gw-progress-v1';
const PALETTE = ['#34D399', '#60A5FA', '#F59E0B', '#F472B6', '#A78BFA', '#22D3EE', '#FB923C', '#4ADE80'];

function loadStorage() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; }
}
function saveStorage(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* ignore */ }
}
function getRecord(unitId, idx) {
  const data = loadStorage();
  return (data[unitId] && data[unitId][idx]) || null;
}
function setRecord(unitId, idx, rec) {
  const data = loadStorage();
  if (!data[unitId]) data[unitId] = {};
  data[unitId][idx] = rec;
  saveStorage(data);
}
function clearUnitStorage(unitId) {
  const data = loadStorage();
  delete data[unitId];
  saveStorage(data);
}
// The unit the child last opened, so the unit menu can jump back to it (after
// ✕ / "Chọn bài khác", and also when the workbook is reopened from home).
const LAST_UNIT_KEY = 'gw-last-unit';
function getLastUnit() {
  try { return localStorage.getItem(LAST_UNIT_KEY); } catch { return null; }
}
function setLastUnit(unitId) {
  try { localStorage.setItem(LAST_UNIT_KEY, unitId); } catch { /* storage unavailable */ }
}

function getUnitSummary(unit) {
  let solvedCount = 0, attemptsSum = 0;
  unit.questions.forEach((_, i) => {
    const rec = getRecord(unit.id, i);
    if (rec) { if (rec.solved) solvedCount++; attemptsSum += rec.attempts || 0; }
  });
  return { solvedCount, total: unit.questions.length, attemptsSum };
}

// ── ENGINE ───────────────────────────────────────────────────────────────────

export function render(app, onBack) {
  let activeQuestions = [];
  let activeTitle = '';
  let activeColor = '#34D399';
  let activeUnitIds = [];
  let current = 0;
  let solved = [];
  let attempted = [];
  let wrongCounts = [];
  let solutionRows = [];
  let solutionConfirmed = [];
  let lastFocusedFormulaInput = null;
  let multiSelected = [];
  let compareSelected = [];
  let matchLocked = new Set(); // leftIds confirmed correct after checking
  let matchPairs = new Map(); // leftId -> rightId, tentative pairs not yet checked
  let selectedMatchItem = null; // { side: 'left'|'right', id } — the item awaiting its pair

  injectStyles();

  // ── INTRO / UNIT MENU ──────────────────────────────────────────────────────
  function showIntro() {
    const totalQ = UNITS.reduce((s, u) => s + u.questions.length, 0);
    app.innerHTML = `
      <div class="e3-wrap gw-app">
        <div class="e3-intro animate-fadeIn gw-intro-wide">
          <div class="e3-badge">📗</div>
          <h1 class="e3-title">Vở Bài Tập Toán 3</h1>
          <p class="e3-sub">Tập Một — Kết nối tri thức với cuộc sống</p>

          <div class="e3-section-label">Chọn bài để luyện tập:</div>
          <div class="gw-unit-list">
            <button class="gw-unit-row gw-unit-all" data-unit="all">
              <span class="gw-unit-badge" style="background:#334155">📋</span>
              <span class="gw-unit-info"><strong>Tất cả</strong><span class="gw-unit-sub">${totalQ} câu — ${UNITS.length} bài hiện có</span></span>
              <span class="gw-unit-arrow">›</span>
            </button>
            ${UNITS.map((u, idx) => {
              const color = PALETTE[idx % PALETTE.length];
              const sum = getUnitSummary(u);
              const badges = [
                sum.solvedCount ? `✓ ${sum.solvedCount}/${sum.total}` : `${sum.total} câu`,
                sum.attemptsSum ? `🔁 ${sum.attemptsSum} lượt` : '',
              ].filter(Boolean).join(' · ');
              return `
                <button class="gw-unit-row" data-unit="${u.id}">
                  <span class="gw-unit-badge" style="background:${color}">${u.number}</span>
                  <span class="gw-unit-info"><strong>Bài ${u.number}. ${u.title}</strong><span class="gw-unit-sub">${badges}</span></span>
                  <span class="gw-unit-arrow">›</span>
                </button>
              `;
            }).join('')}
          </div>

          <div class="e3-divider"></div>
          <p class="e3-note">Nguồn: Vở bài tập Toán 3 — Tập một, bộ sách Kết nối tri thức với cuộc sống (NXB Giáo dục Việt Nam).</p>
          <button class="e3-btn e3-btn-ghost" id="e3-back-btn">← Quay lại</button>
        </div>
      </div>
    `;

    app.querySelectorAll('.gw-unit-row').forEach(btn => {
      btn.addEventListener('click', () => {
        const uid = btn.dataset.unit;
        setLastUnit(uid);
        if (uid === 'all') {
          activeQuestions = UNITS.flatMap(u => u.questions.map((q, i) => ({ ...q, __unitId: u.id, __qIdx: i })));
          activeTitle = `Tất cả — ${totalQ} câu`;
          activeColor = '#34D399';
          activeUnitIds = UNITS.map(u => u.id);
        } else {
          const unitIdx = UNITS.findIndex(u => u.id === uid);
          const u = UNITS[unitIdx];
          activeQuestions = u.questions.map((q, i) => ({ ...q, __unitId: u.id, __qIdx: i }));
          activeTitle = `Bài ${u.number}. ${u.title}`;
          activeColor = PALETTE[unitIdx % PALETTE.length];
          activeUnitIds = [u.id];
        }
        resetProgress();
        current = 0;
        showQuestion();
      });
    });

    app.querySelector('#e3-back-btn').onclick = onBack;
    jumpToLastUnit();
  }

  // Scrolls the menu (the unit list and #app, the page's scroll container) so
  // the last-opened unit's card is centered, then pulses it briefly in that
  // unit's own color. Nothing stored yet (first visit) = stay at the top.
  function jumpToLastUnit() {
    const last = getLastUnit();
    if (!last) return;
    const card = [...app.querySelectorAll('.gw-unit-row')].find(b => b.dataset.unit === last);
    if (!card) return;
    const unitIdx = UNITS.findIndex(u => u.id === last);
    card.style.setProperty('--gw-flash', unitIdx >= 0 ? PALETTE[unitIdx % PALETTE.length] : '#334155');
    requestAnimationFrame(() => {
      if (!card.isConnected) return;
      card.scrollIntoView({ block: 'center' });
      card.classList.add('gw-unit-flash');
      setTimeout(() => card.classList.remove('gw-unit-flash'), 1600);
    });
  }

  function resetProgress() {
    solved = activeQuestions.map(() => false);
    attempted = activeQuestions.map(() => false);
    wrongCounts = activeQuestions.map(() => 0);
    solutionRows = activeQuestions.map(() => [{ type: 'text', value: '' }]);
    solutionConfirmed = activeQuestions.map(() => false);
    activeQuestions.forEach((q, i) => {
      const rec = getRecord(q.__unitId, q.__qIdx);
      if (rec) {
        solved[i] = !!rec.solved;
        attempted[i] = (rec.attempts || 0) > 0;
        wrongCounts[i] = rec.solved ? Math.max(0, (rec.attempts || 0) - 1) : (rec.attempts || 0);
      }
    });
  }

  function persistAttempt(idx, isSolve) {
    const q = activeQuestions[idx];
    const rec = getRecord(q.__unitId, q.__qIdx) || { solved: false, attempts: 0 };
    rec.attempts++;
    if (isSolve) rec.solved = true;
    setRecord(q.__unitId, q.__qIdx, rec);
  }

  // ── QUIZ ──────────────────────────────────────────────────────────────────
  function showQuestion(idx = current) {
    current = idx;
    multiSelected = [];
    selectedMatchItem = null;
    const q = activeQuestions[current];
    compareSelected = q.type === 'compare' ? new Array(q.rows.length).fill(null) : [];
    matchPairs = new Map();
    matchLocked = new Set();
    if (q.type === 'match' && solved[current]) matchLocked = new Set(q.pairs.map(p => p[0]));

    const visitedCount = solved.filter(Boolean).length + attempted.filter((a, i) => a && !solved[i]).length;
    const pct = Math.round((visitedCount / activeQuestions.length) * 100);
    const answerUnlocked = !q.wordProblem || solutionConfirmed[current] || solved[current];
    // The quiz screen is split into two zones filling the viewport: the top
    // zone (header ✕ / progress / ☰, never moves) and the scroll zone below
    // it, which alone scrolls. Picture / essay-style questions put their
    // question card (text + image) in the top zone too, so the child can
    // keep looking at the figure while scrolling through the answer boxes.
    const pinQuestion = !!(q.img || q.wordProblem);
    const questionCard = `
          <div class="e3-question-card${q.img ? ' gw-card-has-img' : ''}">
            <div class="e3-q-num" style="color:${activeColor}">${q.section ? `${q.section} — ` : ''}Câu ${current + 1}</div>
            <div class="e3-q-text">${q.q.replace(/\n/g, '<br>')}</div>
            ${q.img ? `<img class="e3-q-img" src="${q.img}" alt="Hình minh họa câu ${current + 1}" loading="lazy">` : ''}
            ${q.wordProblem ? renderSubQuestions(q) : ''}
          </div>`;

    app.innerHTML = `
      <div class="e3-wrap gw-app gw-quiz-screen">
        <div class="e3-quiz animate-fadeIn">
          <div class="gw-pin-zone${pinQuestion ? ' gw-pin-zone-q' : ''}">
          <div class="e3-topbar">
            <button class="e3-back-icon" id="e3-quit">✕</button>
            <div class="e3-progress-wrap">
              <div class="e3-progress-track">
                <div class="e3-progress-fill" style="width:${pct}%; background:${activeColor}"></div>
              </div>
              <span class="e3-progress-label">${current + 1} / ${activeQuestions.length}</span>
            </div>
            <button class="e3-back-icon" id="e3-list-toggle" title="Danh sách câu hỏi">☰</button>
          </div>
          ${pinQuestion ? questionCard : ''}
          </div>

          <div class="gw-scroll-zone">
          ${pinQuestion ? '' : questionCard}

          ${q.wordProblem ? renderSolutionBlock(q) : ''}

          ${answerUnlocked ? renderAnswerArea(q) : `<div class="e3-answer-locked" inert>${renderAnswerArea(q)}</div>${renderAnswerLockNotice()}`}

          ${answerUnlocked && !solved[current] ? renderHints(q) : ''}

          <div class="e3-nav" id="e3-nav" style="display:none">
            <button class="e3-btn e3-btn-primary" id="e3-next" style="background:linear-gradient(135deg,${activeColor},${activeColor}cc)">
              ${current < activeQuestions.length - 1 ? 'Câu tiếp theo →' : 'Xem kết quả 🏅'}
            </button>
          </div>
          </div>
        </div>

        ${renderQuestionList()}
      </div>
    `;

    app.querySelector('#e3-quit').onclick = showIntro;
    app.querySelector('#e3-list-toggle').onclick = toggleQuestionList;
    attachQuestionListHandlers();
    if (q.wordProblem) attachSolutionHandlers(q);
    if (answerUnlocked) attachAnswerHandlers(q);
  }

  // ── SOLUTION EDITOR (write the working before answering) ────────────────────
  // A *multi-part* word problem's a)/b) sub-questions (e.g. "a) Buổi chiều
  // cửa hàng bán được bao nhiêu lít nước mắm?") live only in each blank's
  // label, not in q.q (which is just the setup ending in "Hỏi:") — so they
  // belong inside the question card itself, printed once, right where the
  // book shows them, above the "write your solution" editor. They stay
  // visible whether the answer boxes below are locked or not; only the
  // boxes themselves depend on solutionConfirmed, never the question text.
  //
  // A *single*-blank word problem is different: q.q already asks the full
  // question itself (e.g. "...Hỏi đội đồng diễn đó có bao nhiêu nam?"), and
  // the one blank's label (e.g. "Số nam") is just an app-only caption for
  // its input box, not a second question — printing it here too would
  // dangle a redundant fragment right after the question mark.
  function renderSubQuestions(q) {
    if (!q.blanks || q.blanks.length < 2) return '';
    // q.subQuestions === false: the extra blanks are lines of the book's own
    // Bài giải (Bài 31/32 "Đổi: 1 kg = ... g"), not questions to print here.
    if (q.subQuestions === false) return '';
    // q already holds the a)/b) sub-questions as the book prints them (Bài 11,
    // 12, 28, 29) — the blank labels are then just short captions for the
    // answer boxes, and repeating them here would print the question twice.
    if (/(^|\n)\s*(\d+\.\s*)?a\)/.test(q.q)) return '';
    const prompts = q.blanks.map(b => `<div class="e3-subq">${b.label}</div>`).join('');
    return `<div class="e3-subquestions">${prompts}</div>`;
  }

  function renderAnswerLockNotice() {
    return `<div class="e3-answer-locked-note">🔒 Hoàn thành lời giải ở trên rồi bấm "Xong, chọn đáp án" để mở khóa phần trả lời.</div>`;
  }

  function escapeHtml(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  function renderSolutionRow(row, i) {
    const icon = row.type === 'formula' ? '🧮' : '📝';
    const placeholder = row.type === 'formula' ? 'VD: a + b = c' : 'Viết giải thích...';
    const cls = row.type === 'formula' ? 'e3-sol-row-formula-input' : 'e3-sol-row-text-input';
    return `
      <div class="e3-sol-row" data-row-idx="${i}">
        <span class="e3-sol-row-icon">${icon}</span>
        <input type="text" class="e3-sol-row-input ${cls}" data-row-idx="${i}" placeholder="${placeholder}" value="${escapeAttr(row.value)}" autocomplete="off">
        <button type="button" class="e3-sol-row-remove" data-row-idx="${i}" title="Xóa dòng">✕</button>
      </div>
    `;
  }

  function renderSolutionBlock(q) {
    const rows = solutionRows[current];
    const confirmed = solutionConfirmed[current] || solved[current];

    if (confirmed) {
      const nonEmpty = rows.filter(r => r.value.trim() !== '');
      return `
        <div class="e3-solution e3-solution-locked">
          <div class="e3-solution-label">✍️ Lời giải của em</div>
          <div class="e3-solution-rows">
            ${nonEmpty.length ? nonEmpty.map(r => `
              <div class="e3-sol-row e3-sol-row-readonly">
                <span class="e3-sol-row-icon">${r.type === 'formula' ? '🧮' : '📝'}</span>
                <span class="e3-sol-row-text-display">${escapeHtml(r.value)}</span>
              </div>
            `).join('') : '<div class="e3-sol-empty">(chưa ghi nội dung)</div>'}
          </div>
          ${!solved[current] ? '<button type="button" class="e3-btn e3-btn-ghost e3-btn-sm" id="e3-edit-solution">✏️ Sửa lời giải</button>' : ''}
        </div>
      `;
    }

    return `
      <div class="e3-solution">
        <div class="e3-solution-label">✍️ Trình bày lời giải trước khi trả lời:</div>
        <div class="e3-solution-rows" id="e3-solution-rows">
          ${rows.map((r, i) => renderSolutionRow(r, i)).join('')}
        </div>
        <div class="e3-solution-toolbar">
          ${['+', '−', '×', '÷', '=', '(', ')'].map(s => `<button type="button" class="e3-sym-btn" data-sym="${s}">${s}</button>`).join('')}
        </div>
        <div class="e3-solution-hint">💡 Viết lời giải bằng nút <span class="e3-hint-chip">+ Dòng chữ</span>, viết phép tính bằng nút <span class="e3-hint-chip">+ Dòng phép tính</span>.</div>
        <div class="e3-solution-controls">
          <button type="button" class="e3-btn e3-btn-ghost e3-btn-sm" id="e3-add-text-row">+ Dòng chữ</button>
          <button type="button" class="e3-btn e3-btn-ghost e3-btn-sm" id="e3-add-formula-row">+ Dòng phép tính</button>
        </div>
        <button type="button" class="e3-btn e3-btn-primary" id="e3-solution-ok" disabled>Xong, chọn đáp án →</button>
      </div>
    `;
  }

  function insertAtCursor(input, text) {
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + text + input.value.slice(end);
    const pos = start + text.length;
    input.setSelectionRange(pos, pos);
  }

  function focusLastSolutionRow() {
    const inputs = app.querySelectorAll('.e3-sol-row-input');
    inputs[inputs.length - 1]?.focus();
  }

  function attachSolutionHandlers(q) {
    if (solutionConfirmed[current] || solved[current]) {
      const editBtn = app.querySelector('#e3-edit-solution');
      if (editBtn) editBtn.onclick = () => { solutionConfirmed[current] = false; showQuestion(); };
      return;
    }

    const rowsContainer = app.querySelector('#e3-solution-rows');
    const okBtn = app.querySelector('#e3-solution-ok');

    const syncOkState = () => { okBtn.disabled = !solutionRows[current].some(r => r.value.trim() !== ''); };

    rowsContainer.querySelectorAll('.e3-sol-row-input').forEach(inp => {
      inp.oninput = () => {
        const i = parseInt(inp.dataset.rowIdx, 10);
        solutionRows[current][i].value = inp.value;
        syncOkState();
      };
      if (inp.classList.contains('e3-sol-row-formula-input')) {
        inp.addEventListener('focus', () => { lastFocusedFormulaInput = inp; });
      }
    });
    rowsContainer.querySelectorAll('.e3-sol-row-remove').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.rowIdx, 10);
        solutionRows[current].splice(i, 1);
        showQuestion();
      };
    });
    syncOkState();

    app.querySelector('#e3-add-text-row').onclick = () => {
      solutionRows[current].push({ type: 'text', value: '' });
      showQuestion();
      focusLastSolutionRow();
    };
    app.querySelector('#e3-add-formula-row').onclick = () => {
      solutionRows[current].push({ type: 'formula', value: '' });
      showQuestion();
      focusLastSolutionRow();
    };

    app.querySelectorAll('.e3-sym-btn').forEach(btn => {
      btn.onclick = () => {
        const target = lastFocusedFormulaInput && rowsContainer.contains(lastFocusedFormulaInput)
          ? lastFocusedFormulaInput
          : rowsContainer.querySelector('.e3-sol-row-formula-input');
        if (!target) return;
        insertAtCursor(target, btn.dataset.sym);
        const i = parseInt(target.dataset.rowIdx, 10);
        solutionRows[current][i].value = target.value;
        syncOkState();
        target.focus();
      };
    });

    okBtn.onclick = () => { solutionConfirmed[current] = true; showQuestion(); };
  }

  // ── HINTS ─────────────────────────────────────────────────────────────────
  function renderHints(q) {
    if (!q.hints || q.hints.length === 0) return '';
    const unlocked = Math.min(wrongCounts[current], q.hints.length);
    return `
      <div class="e3-hints" id="e3-hints">
        ${q.hints.map((h, i) => i < unlocked
          ? `<div class="e3-hint-item e3-hint-unlocked">💡 <strong>Gợi ý ${i + 1}:</strong> ${h}</div>`
          : `<div class="e3-hint-item e3-hint-locked">🔒 Gợi ý ${i + 1} — trả lời sai để mở khóa</div>`
        ).join('')}
      </div>
    `;
  }
  function refreshHints(q) {
    const box = app.querySelector('#e3-hints');
    if (!box) return;
    box.outerHTML = renderHints(q);
  }

  // ── SIDE QUESTION LIST ───────────────────────────────────────────────────────
  function getQuestionStatus(i) {
    if (solved[i]) return 'correct';
    if (attempted[i]) return 'wrong';
    return 'unanswered';
  }

  function renderQuestionList() {
    const statusIcon = { unanswered: '', correct: '✓', wrong: '✕' };
    return `
      <div class="e3-qlist-overlay" id="e3-qlist-overlay" style="display:none">
        <div class="e3-qlist-panel">
          <div class="e3-qlist-header">
            <span>Danh sách câu hỏi</span>
            <button class="e3-qlist-close" id="e3-qlist-close">✕</button>
          </div>
          <div class="e3-qlist-grid">
            ${activeQuestions.map((_, i) => {
              const status = getQuestionStatus(i);
              return `<button class="e3-qitem e3-qitem-${status} ${i === current ? 'e3-qitem-current' : ''}" data-idx="${i}">${statusIcon[status] || (i + 1)}</button>`;
            }).join('')}
          </div>
          <div class="e3-qlist-legend">
            <span><i class="e3-legend-dot e3-legend-unanswered"></i>Chưa làm</span>
            <span><i class="e3-legend-dot e3-legend-correct"></i>Đúng</span>
            <span><i class="e3-legend-dot e3-legend-wrong"></i>Sai</span>
          </div>
          <button class="e3-btn e3-btn-primary" id="e3-qlist-finish">🏁 Nộp bài / Xem kết quả</button>
        </div>
      </div>
    `;
  }

  function attachQuestionListHandlers() {
    const overlay = app.querySelector('#e3-qlist-overlay');
    app.querySelector('#e3-qlist-close').onclick = () => { overlay.style.display = 'none'; };
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.style.display = 'none'; });
    app.querySelectorAll('.e3-qitem').forEach(btn => {
      btn.onclick = () => showQuestion(parseInt(btn.dataset.idx, 10));
    });
    app.querySelector('#e3-qlist-finish').onclick = showResult;
  }

  function toggleQuestionList() {
    const overlay = app.querySelector('#e3-qlist-overlay');
    overlay.style.display = overlay.style.display === 'flex' ? 'none' : 'flex';
  }

  // ── ANSWER AREA (dispatch by type) ──────────────────────────────────────────
  function renderAnswerArea(q) {
    if (q.type === 'choice') return renderChoiceArea(q);
    if (q.type === 'fill') return renderFillArea(q);
    if (q.type === 'table') return renderTableArea(q);
    if (q.type === 'compare') return renderCompareArea(q);
    if (q.type === 'match') return renderMatchArea(q);
    return '';
  }

  function renderChoiceArea(q) {
    // Multi-select "tô màu" questions can list more than 4 cells/cards
    // (Bài 15 has 5 clouds, Bài 24/25 have 6–8 boxes/cars).
    const labels = ['A', 'B', 'C', 'D', 'E', 'G', 'H', 'I'];
    return `
      <div class="e3-options" id="e3-options">
        ${q.options.map((opt, i) => `
          <button class="e3-option" data-idx="${i}">
            <span class="e3-option-label">${labels[i]}</span>
            <span class="e3-option-text">${opt}</span>
          </button>
        `).join('')}
      </div>
      ${q.multi ? `<button class="e3-btn e3-btn-primary" id="e3-submit-multi" style="margin-top:12px" disabled>Xác nhận đáp án đã chọn</button>` : ''}
    `;
  }

  // Sizes a text input to roughly fit its expected answer, so a 3-digit
  // number column stays narrow while a full-sentence answer column stays wide.
  function inputWidthCh(answer) {
    return Math.max(3, Math.min(24, String(answer).length + 2));
  }

  // Table rows are normally a plain array of cells. A row can also be
  // { sample: true, cells: [...] } to render as a given "theo mẫu" row
  // inside the table itself (matching the book), instead of prose above it.
  function rowCells(row) { return Array.isArray(row) ? row : row.cells; }
  function isSampleRow(row) { return !Array.isArray(row) && !!row.sample; }
  // A row can also carry { label: 'a)', cells: [...] } to prefix it with a plain
  // (unbordered) label — used when the book shows two variants of one exercise
  // (e.g. a rising and a falling number sequence) as two labeled rows of one table.
  function rowLabelOf(row) { return !Array.isArray(row) && row.label; }

  // Whether an expected answer is a plain integer (so the input can safely use
  // the digit-only virtual keypad). Anything else (a sum like "100+30+9", a
  // letter like "B", a list like "687, 768, 786, 867") needs free typing.
  function isPlainInt(s) {
    return /^-?\d+$/.test(String(s).trim());
  }

  function renderFillArea(q) {
    return `
      <div class="e3-blanks" id="e3-blanks">
        ${q.blanks.map((b, i) => renderBlankRow(b, i)).join('')}
      </div>
      <button class="e3-btn e3-btn-primary" id="e3-submit-fill" style="margin-top:12px">Kiểm tra</button>
    `;
  }

  // A blank whose label has no "..." is a caption written directly on the
  // book's own dotted answer line (e.g. "a) Từ lớn đến bé:  ....................")
  // rather than a blank embedded mid-sentence, so it renders the same
  // dashed, flex-filled line as a trailing "..." blank below — never a boxed
  // input floated to the row's far edge, which leaves the book's dotted line
  // unrepresented and clips long answers instead of growing into the space.
  // A blank whose label has one or more "..." gets an input inlined at each "..."
  // position instead — this matches the workbook page, where the student writes
  // straight into the blank wherever it falls in the sentence/equation (start,
  // middle, or after "="), and lets a row with several "..." (e.g. "35, ..., ...")
  // get one box per blank instead of forcing multiple answers into a single field.
  function renderBlankRow(b, i) {
    // A "<br>" in a label (Bài 40, 43, 44: a b) instruction line printed just
    // above its first answer line) must really start a new line, but a plain
    // <br> is ignored inside the inline-flex label — a full-width, zero-height
    // flex item forces the wrap instead.
    const label = b.label.replace(/<br\s*\/?>/g, '<span class="gw-line-break"></span>');
    const parts = label.split('...');
    if (parts.length === 1) {
      const numeric = isPlainInt(b.answer);
      const input = `<input type="text" ${numeric ? 'inputmode="numeric"' : ''} class="game-input e3-blank-input gw-blank-inline gw-blank-dashed gw-blank-fill" style="min-width:3ch" data-idx="${i}" autocomplete="off">`;
      return `
        <div class="e3-blank-row e3-blank-row-inline">
          <label class="e3-blank-label e3-blank-label-inline">${label}${input}</label>
        </div>
      `;
    }
    const slotCount = parts.length - 1;
    // Only plain digits/commas/spaces (e.g. "36,37") get the digit-only virtual
    // keypad. A "+" (sum expressions like "100+30+9") or a letter (like "A và E")
    // must fall back to a normal free-typing field, or that character could never be entered.
    const numeric = /^[\d\s,;-]+$/.test(String(b.answer));
    // Best-effort per-slot expected value, just to size each box to its own
    // content (a short number vs. a full sum like "100+30+9") — never shown to the student.
    const slotAnswers = slotCount > 1 ? splitAnswerParts(b.answer) : [b.answer];
    // A single blank that ends the row (e.g. "139 = ...", nothing typed after
    // the "...") has no sibling box to line up with, so instead of a fixed
    // ch-width box it flex-grows to fill whatever room the row has left —
    // matching how the printed workbook just leaves a long blank line to
    // write on, rather than a fixed little box that clips longer answers.
    const isTrailingBlank = slotCount === 1 && !parts[parts.length - 1].trim();
    // A blank mid-sentence (more text follows on the same line, e.g. "Bông
    // hoa ... ghi phép tính...") can't flex-grow without either swallowing
    // the rest of the sentence or wrapping it away, so it keeps a fixed
    // width — but that width still needs a comfortable typing floor (~9ch),
    // not just enough characters to fit the expected answer, which cramped
    // a 1-letter answer into a 3ch box that also gave away the answer length.
    // Free-text slots in one row share the row's widest width: Bài 27's
    // "giảm 3 lần" / "gấp 2 lần" slots sized one by one came out 12ch vs 11ch,
    // which told the child which phrase belonged in which slot.
    const textSlotCh = Math.max(...slotAnswers.map(inputWidthCh));
    let slot = 0;
    // b.boxes: the book prints each slot as its own small "ô trống" square
    // holding exactly one character, and says so in the instruction ("Viết
    // chữ số ... vào ô trống", "Viết dấu phép tính ... vào ô trống" — Bài 41,
    // 42), so a one-character box gives nothing away, and a 9ch dotted line per
    // digit would break "1☐3 × 6 = 61☐" over several lines on a phone.
    if (b.boxes) {
      const boxHtml = parts.map((text, idx) => idx === parts.length - 1 ? text
        : `${text}<input type="text" ${numeric ? 'inputmode="numeric"' : ''} maxlength="1" class="game-input e3-blank-input gw-blank-inline gw-blank-box" data-idx="${i}" data-slot="${slot++}" autocomplete="off">`
      ).join('');
      return `
        <div class="e3-blank-row e3-blank-row-inline">
          <label class="e3-blank-label e3-blank-label-inline gw-blank-label-boxes">${boxHtml}</label>
        </div>
      `;
    }
    const html = parts.map((text, idx) => {
      const isLast = idx === parts.length - 1;
      if (isLast) return text;
      const slotAnswer = slotAnswers[slot] ?? slotAnswers[0];
      const fillClass = isTrailingBlank ? ' gw-blank-fill' : '';
      const style = isTrailingBlank
        ? 'min-width:3ch'
        : `width:${Math.max(9, numeric ? String(slotAnswer).length + 2 : textSlotCh)}ch`;
      const input = `<input type="text" ${numeric ? 'inputmode="numeric"' : ''} class="game-input e3-blank-input gw-blank-inline gw-blank-dashed${fillClass}" style="${style}" data-idx="${i}" data-slot="${slot++}" autocomplete="off">`;
      return `${text}${input}`;
    }).join('');
    return `
      <div class="e3-blank-row e3-blank-row-inline">
        <label class="e3-blank-label e3-blank-label-inline">${html}</label>
      </div>
    `;
  }

  // For reveal-on-solved display of a multi-slot blank's answer (e.g. "36,37"
  // or "A và E") back into its individual boxes.
  function splitAnswerParts(answer) {
    return String(answer).split(/\s*,\s*|\s+và\s+/).map(s => s.trim());
  }

  // A question is normally one table (q.rows). It can instead be q.tables: an
  // array of { label?, headers?, rows } to render several distinct tables side
  // by side under one question — the book shows this for e.g. "1. Số?" with a
  // separate a) addition table and b) subtraction table, which don't share
  // columns and so can't be merged into rows of a single table.
  function tableGroups(q) { return q.tables || [{ rows: q.rows, headers: q.headers }]; }
  function tableCell(q, t, r, c) { return rowCells(tableGroups(q)[t].rows[r])[c]; }

  // A headers-less table (every "Số?" sequence/fact-family drill: a)/b) rows
  // of plain numbers and blanks, or a first-cell label like "Số hạng"/"Tổng")
  // holds uniformly-sized content, so its columns should read as one even
  // grid. The browser's default auto layout instead sizes each column off
  // whichever cell happens to be widest: a column landing on a given-number
  // row only needed enough width for "6", while the same column's
  // blank-input row forced a wider min-width — two rows disagreeing about
  // one column's width, which is what visibly jittered the columns.
  //
  // Two things that look like they'd fix it, but don't:
  // - table-layout:fixed alone locks column widths but then ignores every
  //   cell's own min-width, so wide (10+ column) tables of 3-digit numbers
  //   got columns narrower than their content and clipped it.
  // - an explicit width in `ch` on each cell doesn't work either, because
  //   `ch` is relative to *that element's own* font-size — .gw-table-given
  //   and .gw-table-input use slightly different font-sizes, so the "same"
  //   `9ch` renders as a different pixel width on a given-cell than on an
  //   input-cell, reintroducing uneven columns from a different cause.
  //
  // What actually works: table-layout:fixed *with* an explicit pixel width
  // on a <col> per column. A <col> width is a single value applied to the
  // whole column regardless of any individual cell's font, so every cell in
  // that column gets the identical pixel width, content-mismatch-proof.
  //
  // Each column's px is sized off *that column's own* values only, not the
  // longest value anywhere in the table — a table like "Thừa số/Thừa
  // số/Tích" has a first column holding those (7-char) words while every
  // other column holds a 1–2 digit number; sizing every column off the
  // table-wide longest value made all ten number columns as wide as the
  // word column, wasting space and forcing horizontal scroll that a
  // same-shape 1–2 digit table otherwise doesn't need. A column whose own
  // values genuinely need more room (e.g. one column happens to hold a
  // 3-digit number) still grows past 100% and scrolls via .gw-table-wrap
  // instead of clipping — just that column, not the whole table.
  //
  // A table WITH headers (e.g. "Đọc số" spelling a number out in words next
  // to single-digit "Trăm"/"Chục"/"Đơn vị" columns) can genuinely need
  // uneven columns, so it keeps plain auto layout untouched.
  function tableColWidthsPx(t) {
    const dataColCount = rowCells(t.rows[0]).length;
    return Array.from({ length: dataColCount }, (_, c) => {
      const colVals = t.rows.map(row => {
        const cell = rowCells(row)[c];
        if (cell && typeof cell === 'object') return cell.blank ? cell.answer : cell.value;
        return cell;
      });
      const maxLen = Math.max(1, ...colVals.map(v => String(v).length));
      // A long sentence-like row label (Bài 24's "Thêm vào số đã cho 7 đơn
      // vị") would otherwise claim a 230px+ column that clips its own bold
      // text on a phone and crushes the number columns; it's capped and
      // allowed to wrap instead (see isWrapLabel / .gw-table-given-wrap).
      if (colVals.some(isWrapLabel)) return 150;
      // ~8px/character plus the cell's own horizontal padding.
      return Math.max(32, maxLen * 8 + 18);
    });
  }
  function isWrapLabel(v) {
    return typeof v === 'string' && v.length > 14 && /[^\d\s]/.test(v);
  }

  function renderTableArea(q) {
    const groups = tableGroups(q);
    const isGroup = !!q.tables;
    return `
      <div class="${isGroup ? 'gw-table-group' : ''}" id="gw-table">
        ${groups.map((t, ti) => {
          const colWidths = t.headers ? null : tableColWidthsPx(t);
          const hasRowLabel = t.rows.some(rowLabelOf);
          const colgroup = colWidths ? `
            <colgroup>
              ${hasRowLabel ? '<col style="width:1.8rem">' : ''}
              ${colWidths.map(w => `<col style="width:${w}px">`).join('')}
            </colgroup>
          ` : '';
          return `
          <div class="${isGroup ? 'gw-table-group-item' : ''}">
            ${t.label ? `<div class="gw-table-group-label">${t.label}</div>` : ''}
            <div class="gw-table-wrap">
              <table class="gw-table${colWidths ? ' gw-table-fixed' : ''}">
                ${colgroup}
                ${t.headers ? `<thead><tr>${t.rows.some(rowLabelOf) ? '<th></th>' : ''}${t.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>` : ''}
                <tbody>
                  ${t.rows.map((row, r) => `<tr class="${isSampleRow(row) ? 'gw-table-sample-row' : ''}">${rowLabelOf(row) ? `<td class="gw-table-rowlabel">${rowLabelOf(row)}</td>` : ''}${rowCells(row).map((cell, c) => {
                    if (cell && typeof cell === 'object' && cell.blank) {
                      const numeric = isPlainInt(cell.answer);
                      return `<td class="gw-table-input-cell"><input type="text" ${numeric ? 'inputmode="numeric"' : ''} class="game-input gw-table-input" data-t="${ti}" data-r="${r}" data-c="${c}" autocomplete="off"></td>`;
                    }
                    // sampleCell(): a single blue "theo mẫu" cell/column, for
                    // when the book's sample isn't a whole row.
                    if (cell && typeof cell === 'object' && cell.sample) {
                      return `<td class="gw-table-given gw-table-sample-cell">${cell.value}</td>`;
                    }
                    return `<td class="gw-table-given${colWidths && isWrapLabel(cell) ? ' gw-table-given-wrap' : ''}">${cell}</td>`;
                  }).join('')}</tr>`).join('')}
                </tbody>
              </table>
            </div>
          </div>
        `;
        }).join('')}
      </div>
      ${q.blanks ? `<div class="e3-blanks gw-table-blanks" id="e3-blanks">${q.blanks.map((b, i) => renderBlankRow(b, i)).join('')}</div>` : ''}
      <button class="e3-btn e3-btn-primary" id="gw-table-check" style="margin-top:12px">Kiểm tra</button>
    `;
  }

  function renderCompareArea(q) {
    return `
      <div class="gw-compare" id="gw-compare">
        ${q.rows.map((row, i) => row.options ? `
          <div class="gw-compare-row gw-compare-row-opt" data-idx="${i}">
            <span class="gw-compare-expr">${row.left}</span>
            <div class="gw-compare-btns">
              ${row.options.map(opt => `<button type="button" class="gw-compare-btn gw-compare-opt${opt.length <= 2 ? ' gw-compare-opt-short' : ''}" data-idx="${i}" data-sym="${opt.split('.')[0].trim()}">${opt}</button>`).join('')}
            </div>
          </div>
        ` : `
          <div class="gw-compare-row" data-idx="${i}">
            <span class="gw-compare-expr">${row.left}</span>
            <div class="gw-compare-btns">
              ${['>', '<', '='].map(s => `<button type="button" class="gw-compare-btn" data-idx="${i}" data-sym="${s}">${s}</button>`).join('')}
            </div>
            <span class="gw-compare-expr">${row.right}</span>
          </div>
        `).join('')}
      </div>
      <button class="e3-btn e3-btn-primary" id="gw-compare-check" style="margin-top:12px" disabled>Kiểm tra</button>
    `;
  }

  function renderMatchArea(q) {
    // An image item may also carry a text caption printed under it, like the
    // book's name label below each object (Bài 34 "Xe đạp trẻ em").
    const renderItem = (item) => item.img
      ? `<img src="${item.img}" class="gw-match-img" alt="">${item.text ? `<span class="gw-match-cap">${escapeHtml(item.text)}</span>` : ''}`
      : `<span>${escapeHtml(item.text)}</span>`;
    const btn = (item, col, side, style = '') =>
      `<button type="button" class="gw-match-item" data-side="${side}" data-col="${col}" data-id="${item.id}"${style ? ` style="${style}"` : ''}>${renderItem(item)}</button>`;
    // A 3-column "nối" (q.middle, e.g. Bài 23 "32 + 32 + 32 → 32 × 3 → 96")
    // links each column to the next one. Items are placed explicitly on the
    // grid so an item can span several rows (item.row / item.span, Bài 24's
    // framed boxes: one number beside two stacked operation boxes).
    const grid = q.middle
      ? [q.left, q.middle, q.right].map((col, c) => col.map((item, i) =>
          btn(item, c, ['left', 'middle', 'right'][c], `grid-column:${c + 1};grid-row:${item.row || i + 1} / span ${item.span || 1}`)
        ).join('')).join('')
      : Array.from({ length: Math.max(q.left.length, q.right.length) }, (_, i) => `
            ${q.left[i] ? btn(q.left[i], 0, 'left') : '<span></span>'}
            ${q.right[i] ? btn(q.right[i], 1, 'right') : '<span></span>'}
          `).join('');
    return `
      <div class="gw-match${q.middle ? ' gw-match-3' : ''}" id="gw-match">
        <svg class="gw-match-svg" id="gw-match-svg"></svg>
        <div class="gw-match-grid">
          ${grid}
        </div>
      </div>
      <p class="gw-match-hint">${q.middle ? 'Bấm 1 ô rồi bấm ô tương ứng ở cột bên cạnh để nối (cột trái → cột giữa → cột phải), sau đó bấm Kiểm tra.' : 'Bấm 1 ô bên trái rồi bấm ô tương ứng bên phải để nối, sau đó bấm Kiểm tra.'}</p>
      <button class="e3-btn e3-btn-primary" id="gw-match-check" style="margin-top:12px" disabled>Kiểm tra</button>
    `;
  }

  // Removes the drawn line (if any) for a given left item.
  function removeMatchLine(leftId) {
    app.querySelector(`#gw-match-svg path[data-left-id="${leftId}"]`)?.remove();
  }

  // Draws (or redraws) an SVG line connecting a matched left/right button pair.
  function drawMatchLine(leftId, rightId, color) {
    const container = app.querySelector('#gw-match');
    const svg = app.querySelector('#gw-match-svg');
    if (!container || !svg) return;
    removeMatchLine(leftId);
    const leftBtn = container.querySelector(`.gw-match-item[data-id="${leftId}"]`);
    const rightBtn = container.querySelector(`.gw-match-item[data-id="${rightId}"]`);
    if (!leftBtn || !rightBtn) return;
    const box = container.getBoundingClientRect();
    const lr = leftBtn.getBoundingClientRect();
    const rr = rightBtn.getBoundingClientRect();
    const x1 = lr.right - box.left, y1 = lr.top + lr.height / 2 - box.top;
    const x2 = rr.left - box.left, y2 = rr.top + rr.height / 2 - box.top;
    const midX = (x1 + x2) / 2;
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`);
    path.setAttribute('class', 'gw-match-line');
    path.setAttribute('stroke', color || '#22c55e');
    path.dataset.leftId = leftId;
    path.dataset.rightId = rightId;
    svg.appendChild(path);
  }

  // ── ANSWER HANDLERS (dispatch by type) ──────────────────────────────────────
  function attachAnswerHandlers(q) {
    if (q.type === 'choice') return attachChoiceHandlers(q);
    if (q.type === 'fill') return attachFillHandlers(q);
    if (q.type === 'table') return attachTableHandlers(q);
    if (q.type === 'compare') return attachCompareHandlers(q);
    if (q.type === 'match') return attachMatchHandlers(q);
  }

  function normalize(v) {
    const n = parseFloat(String(v).replace(',', '.').replace(/\s+/g, ''));
    return isNaN(n) ? String(v).trim().toLowerCase().replace(/\s+/g, ' ') : n;
  }

  function checkBlank(b, value) {
    if (b.validate) return b.validate(value);
    return normalize(value) === normalize(b.answer);
  }

  function revealChoiceAnswer(q, correctIndices, chosenIndices) {
    const chosenSet = new Set(chosenIndices);
    app.querySelectorAll('.e3-option').forEach((btn, i) => {
      btn.disabled = true;
      if (correctIndices.includes(i)) btn.classList.add('e3-correct');
      else if (chosenSet.has(i)) btn.classList.add('e3-wrong');
    });
    app.querySelector('#e3-submit-multi')?.remove();
  }

  function attachChoiceHandlers(q) {
    if (solved[current]) {
      if (q.multi) {
        revealChoiceAnswer(q, [...q.answer], [...q.answer]);
        app.querySelector('#e3-submit-multi')?.remove();
      } else {
        revealChoiceAnswer(q, [q.answer], [q.answer]);
      }
      showFeedback(true);
      return;
    }

    if (q.multi) {
      const submitBtn = app.querySelector('#e3-submit-multi');
      app.querySelectorAll('.e3-option').forEach(btn => {
        btn.onclick = () => {
          const idx = parseInt(btn.dataset.idx);
          btn.classList.toggle('e3-selected');
          const pos = multiSelected.indexOf(idx);
          if (pos === -1) multiSelected.push(idx); else multiSelected.splice(pos, 1);
          submitBtn.disabled = multiSelected.length === 0;
        };
      });
      submitBtn.onclick = () => {
        const chosen = [...multiSelected].sort();
        const correct = [...q.answer].sort();
        const isRight = chosen.length === correct.length && chosen.every((v, i) => v === correct[i]);
        attempted[current] = true;
        if (isRight) {
          solved[current] = true;
          persistAttempt(current, true);
          submitBtn.remove();
          revealChoiceAnswer(q, correct, chosen);
          showFeedback(true);
        } else {
          wrongCounts[current]++;
          persistAttempt(current, false);
          app.querySelectorAll('.e3-option').forEach((btn, i) => { if (chosen.includes(i)) btn.classList.add('e3-wrong'); });
          showFeedback(false);
          refreshHints(q);
          submitBtn.disabled = true;
          setTimeout(() => {
            multiSelected = [];
            app.querySelectorAll('.e3-option').forEach(btn => btn.classList.remove('e3-selected', 'e3-wrong'));
          }, 700);
        }
      };
      return;
    }

    app.querySelectorAll('.e3-option').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        attempted[current] = true;
        if (idx === q.answer) {
          solved[current] = true;
          persistAttempt(current, true);
          revealChoiceAnswer(q, [q.answer], [idx]);
          showFeedback(true);
        } else {
          wrongCounts[current]++;
          persistAttempt(current, false);
          btn.classList.add('e3-wrong');
          showFeedback(false);
          refreshHints(q);
          setTimeout(() => btn.classList.remove('e3-wrong'), 700);
        }
      };
    });
  }

  function attachFillHandlers(q) {
    // Group inputs by their blank index — a multi-slot blank (several "..." in
    // one label) has more than one input sharing the same data-idx.
    const groups = q.blanks.map((b, i) => [...app.querySelectorAll(`.e3-blank-input[data-idx="${i}"]`)]);
    const inputs = groups.flat();
    const submitBtn = app.querySelector('#e3-submit-fill');
    if (solved[current]) {
      q.blanks.forEach((b, i) => {
        const group = groups[i];
        const parts = group.length > 1 ? splitAnswerParts(b.answer) : [b.answer];
        group.forEach((inp, j) => {
          inp.value = parts[j] ?? '';
          inp.disabled = true;
          inp.classList.add('e3-correct-input');
        });
      });
      submitBtn.remove();
      showFeedback(true);
      return;
    }

    submitBtn.onclick = () => {
      const valuesPerBlank = groups.map(group => group.map(inp => inp.value.trim()));
      if (valuesPerBlank.some(vals => vals.some(v => v === ''))) return;
      attempted[current] = true;
      const correctFlags = q.blanks.map((b, i) => checkBlank(b, valuesPerBlank[i].join(',')));
      const allCorrect = correctFlags.every(Boolean);
      if (allCorrect) {
        solved[current] = true;
        persistAttempt(current, true);
        inputs.forEach(inp => { inp.disabled = true; inp.classList.add('e3-correct-input'); });
        submitBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        q.blanks.forEach((b, i) => { if (!correctFlags[i]) groups[i].forEach(inp => inp.classList.add('e3-wrong-input')); });
        showFeedback(false);
        refreshHints(q);
        setTimeout(() => inputs.forEach(inp => inp.classList.remove('e3-wrong-input')), 700);
      }
    };
  }

  function attachTableHandlers(q) {
    const inputs = [...app.querySelectorAll('.gw-table-input')];
    // A table question may also carry trailing fill blanks below the table
    // (Bài 23 Tiết 2 Q2: "Ô chữ giải được là: ..." under the cipher table) —
    // graded together with the cells on the same "Kiểm tra".
    const blankGroups = (q.blanks || []).map((b, i) => [...app.querySelectorAll(`.e3-blank-input[data-idx="${i}"]`)]);
    const blankInputs = blankGroups.flat();
    const allInputs = [...inputs, ...blankInputs];
    const checkBtn = app.querySelector('#gw-table-check');
    if (solved[current]) {
      inputs.forEach(inp => {
        const cell = tableCell(q, inp.dataset.t, inp.dataset.r, inp.dataset.c);
        inp.value = cell.answer;
      });
      (q.blanks || []).forEach((b, i) => {
        const parts = blankGroups[i].length > 1 ? splitAnswerParts(b.answer) : [b.answer];
        blankGroups[i].forEach((inp, j) => { inp.value = parts[j] ?? ''; });
      });
      allInputs.forEach(inp => { inp.disabled = true; inp.classList.add('e3-correct-input'); });
      checkBtn.remove();
      showFeedback(true);
      return;
    }

    checkBtn.onclick = () => {
      const values = allInputs.map(inp => inp.value.trim());
      if (values.some(v => v === '')) return;
      attempted[current] = true;
      const flags = inputs.map(inp => {
        const cell = tableCell(q, inp.dataset.t, inp.dataset.r, inp.dataset.c);
        return checkBlank(cell, inp.value.trim());
      });
      const blankFlags = (q.blanks || []).map((b, i) => checkBlank(b, blankGroups[i].map(inp => inp.value.trim()).join(',')));
      const allCorrect = flags.every(Boolean) && blankFlags.every(Boolean);
      if (allCorrect) {
        solved[current] = true;
        persistAttempt(current, true);
        allInputs.forEach(inp => { inp.disabled = true; inp.classList.add('e3-correct-input'); });
        checkBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        inputs.forEach((inp, i) => { if (!flags[i]) inp.classList.add('e3-wrong-input'); });
        blankFlags.forEach((ok, i) => { if (!ok) blankGroups[i].forEach(inp => inp.classList.add('e3-wrong-input')); });
        showFeedback(false);
        refreshHints(q);
        setTimeout(() => allInputs.forEach(inp => inp.classList.remove('e3-wrong-input')), 700);
      }
    };
  }

  function attachCompareHandlers(q) {
    const checkBtn = app.querySelector('#gw-compare-check');
    if (solved[current]) {
      q.rows.forEach((row, i) => {
        const btn = app.querySelector(`.gw-compare-btn[data-idx="${i}"][data-sym="${row.answer === '=' ? '=' : row.answer}"]`);
        btn?.classList.add('gw-compare-selected', 'gw-compare-correct');
      });
      app.querySelectorAll('.gw-compare-btn').forEach(b => { b.disabled = true; });
      checkBtn.remove();
      showFeedback(true);
      return;
    }

    app.querySelectorAll('.gw-compare-btn').forEach(btn => {
      btn.onclick = () => {
        const i = parseInt(btn.dataset.idx, 10);
        compareSelected[i] = btn.dataset.sym;
        app.querySelectorAll(`.gw-compare-btn[data-idx="${i}"]`).forEach(b => b.classList.remove('gw-compare-selected'));
        btn.classList.add('gw-compare-selected');
        checkBtn.disabled = compareSelected.some(v => v === null);
      };
    });

    checkBtn.onclick = () => {
      attempted[current] = true;
      const allCorrect = q.rows.every((row, i) => compareSelected[i] === row.answer);
      if (allCorrect) {
        solved[current] = true;
        persistAttempt(current, true);
        app.querySelectorAll('.gw-compare-btn').forEach(b => { b.disabled = true; });
        q.rows.forEach((row, i) => {
          app.querySelector(`.gw-compare-btn[data-idx="${i}"][data-sym="${row.answer}"]`)?.classList.add('gw-compare-correct');
        });
        checkBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        q.rows.forEach((row, i) => {
          if (compareSelected[i] !== row.answer) {
            app.querySelector(`.gw-compare-btn[data-idx="${i}"].gw-compare-selected`)?.classList.add('gw-compare-wrong');
          }
        });
        showFeedback(false);
        refreshHints(q);
        setTimeout(() => app.querySelectorAll('.gw-compare-wrong').forEach(b => b.classList.remove('gw-compare-wrong')), 700);
      }
    };
  }

  function attachMatchHandlers(q) {
    const checkBtn = app.querySelector('#gw-match-check');
    // A link is always stored under its lower-column item's id (left→right for
    // a 2-column nối; left→middle and middle→right for a 3-column one), so
    // matchPairs/matchLocked keys are exactly the q.pairs[i][0] ids.
    const itemBtn = (id) => app.querySelector(`.gw-match-item[data-id="${id}"]`);
    const pairLocked = (p) => matchLocked.has(p[0]);
    // An item is done (disabled) only once every expected link touching it is
    // locked in — a middle item has two, a many-to-one right item may have
    // several. An item with no expected link at all (a distractor) never is.
    const isFullyLocked = (id) => {
      const involved = q.pairs.filter(p => p[0] === id || p[1] === id);
      return involved.length > 0 && involved.every(pairLocked);
    };

    if (solved[current]) {
      app.querySelectorAll('.gw-match-item').forEach(btn => { btn.disabled = true; });
      q.pairs.forEach(([a, b]) => { itemBtn(a)?.classList.add('gw-match-correct'); itemBtn(b)?.classList.add('gw-match-correct'); });
      q.pairs.forEach(([leftId, rightId]) => drawMatchLine(leftId, rightId));
      checkBtn?.remove();
      showFeedback(true);
      return;
    }

    const allBtns = [...app.querySelectorAll('.gw-match-item')];

    const updateCheckBtn = () => {
      checkBtn.disabled = (matchLocked.size + matchPairs.size) < q.pairs.length;
    };

    // Recomputes the neutral "tentatively linked" highlight from matchPairs —
    // a middle item can be one end of two different pending links.
    const refreshLinked = () => {
      const linked = new Set();
      for (const [a, b] of matchPairs) { linked.add(a); linked.add(b); }
      allBtns.forEach(b => b.classList.toggle('gw-match-linked', linked.has(b.dataset.id)));
    };

    const unlinkLeft = (leftId) => {
      if (!matchPairs.has(leftId)) return;
      matchPairs.delete(leftId);
      removeMatchLine(leftId);
    };

    const clearSelection = () => {
      allBtns.forEach(b => b.classList.remove('gw-match-selected'));
      selectedMatchItem = null;
    };

    const makePair = (leftId, rightId) => {
      // Free up either item if it was already tentatively linked to something
      // else in this same pair of columns — except a right item the book
      // links several left items to (Bài 7: two objects are both "khối trụ"),
      // which keeps its other links.
      const manyToOne = q.pairs.filter(p => p[1] === rightId).length > 1;
      for (const [otherLeft, otherRight] of [...matchPairs]) {
        if (otherLeft === leftId || (!manyToOne && otherRight === rightId)) unlinkLeft(otherLeft);
      }
      matchPairs.set(leftId, rightId);
      clearSelection();
      refreshLinked();
      drawMatchLine(leftId, rightId, '#60A5FA');
      updateCheckBtn();
    };

    const onItemClick = (btn) => {
      const col = parseInt(btn.dataset.col, 10);
      const id = btn.dataset.id;
      if (btn.disabled) return;

      if (selectedMatchItem && Math.abs(selectedMatchItem.col - col) === 1) {
        // Completing a link started from the neighbouring column.
        const [leftId, rightId] = selectedMatchItem.col < col ? [selectedMatchItem.id, id] : [id, selectedMatchItem.id];
        if (matchLocked.has(leftId)) { clearSelection(); return; }
        makePair(leftId, rightId);
        return;
      }

      // Selecting (or re-selecting) the starting item.
      clearSelection();
      selectedMatchItem = { col, id };
      btn.classList.add('gw-match-selected');
    };

    allBtns.forEach(btn => { btn.onclick = () => onItemClick(btn); });

    checkBtn.onclick = () => {
      if (checkBtn.disabled) return;
      attempted[current] = true;
      const pendingLeftIds = [...matchPairs.keys()];
      const allCorrect = pendingLeftIds.every(leftId => q.pairs.some(p => p[0] === leftId && p[1] === matchPairs.get(leftId)));

      pendingLeftIds.forEach(leftId => {
        const rightId = matchPairs.get(leftId);
        const isCorrect = q.pairs.some(p => p[0] === leftId && p[1] === rightId);
        if (isCorrect) {
          matchLocked.add(leftId);
          matchPairs.delete(leftId);
          drawMatchLine(leftId, rightId, '#22c55e');
        } else {
          itemBtn(leftId)?.classList.add('gw-match-wrong');
          itemBtn(rightId)?.classList.add('gw-match-wrong');
        }
      });
      q.pairs.filter(pairLocked).forEach(([a, b]) => {
        [a, b].forEach(id => {
          const el = itemBtn(id);
          if (!el) return;
          el.classList.add('gw-match-correct');
          el.disabled = isFullyLocked(id);
        });
      });
      refreshLinked();

      if (allCorrect && matchLocked.size === q.pairs.length) {
        solved[current] = true;
        persistAttempt(current, true);
        checkBtn.remove();
        showFeedback(true);
      } else {
        wrongCounts[current]++;
        persistAttempt(current, false);
        showFeedback(false);
        refreshHints(q);
        checkBtn.disabled = true;
        setTimeout(() => {
          [...matchPairs.keys()].forEach(leftId => unlinkLeft(leftId));
          allBtns.forEach(b => b.classList.remove('gw-match-wrong'));
          refreshLinked();
          updateCheckBtn();
        }, 700);
      }
    };

    updateCheckBtn();
  }

  function showFeedback(isRight) {
    app.querySelector('.e3-feedback')?.remove();
    const banner = document.createElement('div');
    banner.className = `e3-feedback ${isRight ? 'e3-feedback-right' : 'e3-feedback-wrong'}`;
    banner.innerHTML = isRight ? '✅ Đúng rồi! Giỏi lắm!' : '❌ Chưa đúng! Thử lại nhé.';
    const anchor = app.querySelector('#e3-blanks') || app.querySelector('#e3-options')
      || app.querySelector('#gw-table') || app.querySelector('#gw-compare') || app.querySelector('#gw-match');
    anchor.after(banner);

    if (isRight) {
      app.querySelector('#e3-nav').style.display = 'flex';
      app.querySelector('#e3-next').onclick = () => {
        current++;
        if (current >= activeQuestions.length) showResult();
        else showQuestion();
      };
    } else {
      setTimeout(() => banner.remove(), 1600);
    }
  }

  // ── RESULT ────────────────────────────────────────────────────────────────
  function showResult() {
    const correctCount = solved.filter(Boolean).length;
    const total = activeQuestions.length;
    const pct = Math.round((correctCount / total) * 100);
    const { emoji, label, color } = getGrade(pct);

    app.innerHTML = `
      <div class="e3-wrap gw-app">
        <div class="e3-result animate-fadeIn">
          <div class="e3-result-tag" style="color:${activeColor}">${activeTitle}</div>
          <div class="e3-result-icon">${emoji}</div>
          <h2 class="e3-result-grade" style="color:${color}">${label}</h2>
          <div class="e3-result-score">${correctCount} / ${total}</div>
          <div class="e3-result-pct">${pct}% câu đúng</div>

          <div class="e3-result-list">
            ${activeQuestions.map((q, i) => {
              const ok = solved[i];
              return `
                <div class="e3-result-row ${ok ? 'e3-row-ok' : 'e3-row-fail'}">
                  <span class="e3-row-num">${i + 1}</span>
                  <span class="e3-row-q">${q.q.split('\n')[0]}</span>
                  <span class="e3-row-mark">${ok ? '✅' : '❌'}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="e3-result-actions">
            <button class="e3-btn e3-btn-primary" id="e3-retry">🔄 Làm lại</button>
            <button class="e3-btn e3-btn-ghost" id="e3-home-result">🏠 Chọn bài khác</button>
          </div>
        </div>
      </div>
    `;

    app.querySelector('#e3-retry').onclick = () => {
      activeUnitIds.forEach(id => clearUnitStorage(id));
      resetProgress();
      current = 0;
      showQuestion();
    };
    app.querySelector('#e3-home-result').onclick = showIntro;
  }

  showIntro();
}

function getGrade(pct) {
  if (pct >= 90) return { emoji: '🏆', label: 'Xuất sắc!', color: '#F59E0B' };
  if (pct >= 75) return { emoji: '🌟', label: 'Giỏi!', color: '#10B981' };
  if (pct >= 60) return { emoji: '😊', label: 'Khá!', color: '#3B82F6' };
  if (pct >= 40) return { emoji: '📖', label: 'Cần ôn thêm', color: '#8B5CF6' };
  return { emoji: '💪', label: 'Cố lên nhé!', color: '#EF4444' };
}

// ── STYLES ───────────────────────────────────────────────────────────────────
// Reuses the exact same "e3-*" visual language as grade3Exam.js (same #e3-styles
// guard, so whichever module loads first injects it once) plus "gw-*" additions
// for the new unit menu, table, compare and match components.

function injectStyles() {
  if (!document.getElementById('e3-styles')) {
    const style = document.createElement('style');
    style.id = 'e3-styles';
    style.textContent = `
      .e3-wrap { min-height: 100vh; background: linear-gradient(160deg, #ECFDF5 0%, #EFF6FF 50%, #F5F3FF 100%); display: flex; justify-content: center; align-items: flex-start; padding: 1rem; box-sizing: border-box; }
      .e3-intro { background: #fff; border-radius: 1.5rem; padding: 2.5rem 2rem; max-width: 560px; width: 100%; margin: auto; text-align: center; box-shadow: var(--shadow-lg, 0 8px 30px rgba(0,0,0,0.12)); }
      .e3-badge { font-size: 3rem; margin-bottom: 0.5rem; }
      .e3-title { font-size: clamp(1.4rem, 5vw, 1.9rem); font-weight: 800; color: #1E293B; margin: 0 0 0.3rem; }
      .e3-sub { color: #64748B; font-size: 1rem; margin: 0 0 1.5rem; }
      .e3-section-label { font-weight: 700; color: #374151; margin-bottom: 0.75rem; font-size: 0.95rem; }
      .e3-section-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-bottom: 1.2rem; }
      .e3-section-btn { display: flex; flex-direction: column; align-items: center; gap: 0.2rem; padding: 0.9rem 0.5rem; border: 2px solid #e2e8f0; border-radius: 1rem; background: #f8fafc; cursor: pointer; font-family: inherit; transition: border-color 0.15s, background 0.15s, transform 0.1s; }
      .e3-section-btn:hover { border-color: var(--sec-color, #34D399); background: #fff; transform: translateY(-2px); }
      .e3-section-all { grid-column: 1 / -1; flex-direction: row; gap: 0.6rem; justify-content: center; }
      .e3-sec-icon { font-size: 1.4rem; }
      .e3-sec-title { font-weight: 700; font-size: 0.9rem; color: #1E293B; }
      .e3-sec-count { font-size: 0.8rem; color: #64748B; }
      .e3-divider { height: 1px; background: #e2e8f0; margin: 0.8rem 0; }
      .e3-note { font-size: 0.8rem; color: #94a3b8; margin-bottom: 1rem; }
      .e3-note a { color: #60A5FA; }
      .e3-btn { border: none; border-radius: 0.75rem; padding: 0.85rem 1.5rem; font-size: 1rem; font-weight: 700; cursor: pointer; transition: transform 0.12s, box-shadow 0.12s; font-family: inherit; }
      .e3-btn:active { transform: scale(0.97); }
      .e3-btn:disabled { opacity: 0.5; cursor: default; }
      .e3-btn-primary { background: linear-gradient(135deg, #34D399, #22D3EE); color: #fff; box-shadow: 0 4px 16px rgba(52,211,153,0.35); width: 100%; }
      .e3-btn-ghost { background: #f1f5f9; color: #475569; }
      .e3-btn-ghost:hover { background: #e2e8f0; }
      .e3-intro .e3-btn { width: auto; }
      .e3-back-icon { background: rgba(0,0,0,0.08); border: none; color: #1E293B; font-size: 1rem; width: 2.2rem; height: 2.2rem; border-radius: 0.6rem; cursor: pointer; font-weight: 700; flex-shrink: 0; }
      .e3-qlist-overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.45); z-index: 1000; display: flex; justify-content: flex-end; align-items: stretch; }
      .e3-qlist-panel { width: min(320px, 85vw); background: #fff; box-shadow: -8px 0 30px rgba(0,0,0,0.18); padding: 1.2rem; display: flex; flex-direction: column; gap: 1rem; overflow-y: auto; animation: e3SlideIn 0.2s ease; }
      @keyframes e3SlideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      .e3-qlist-header { display: flex; justify-content: space-between; align-items: center; font-weight: 800; color: #1E293B; font-size: 1rem; }
      .e3-qlist-close { background: rgba(0,0,0,0.08); border: none; color: #1E293B; width: 1.9rem; height: 1.9rem; border-radius: 0.5rem; cursor: pointer; font-weight: 700; }
      .e3-qlist-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; }
      .e3-qitem { aspect-ratio: 1; border-radius: 0.6rem; border: 2px solid #e2e8f0; background: #f8fafc; color: #475569; font-weight: 700; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; font-family: inherit; transition: transform 0.1s, border-color 0.15s; }
      .e3-qitem:hover { transform: translateY(-2px); }
      .e3-qitem-current { border-color: #1E293B; box-shadow: 0 0 0 2px rgba(30,41,59,0.15); }
      .e3-qitem-correct { background: #dcfce7; border-color: #22c55e; color: #166534; }
      .e3-qitem-wrong { background: #fee2e2; border-color: #ef4444; color: #991b1b; }
      .e3-qlist-legend { display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.82rem; color: #475569; }
      .e3-qlist-legend span { display: flex; align-items: center; gap: 0.5rem; }
      .e3-legend-dot { width: 0.85rem; height: 0.85rem; border-radius: 0.25rem; display: inline-block; border: 2px solid #e2e8f0; background: #f8fafc; }
      .e3-legend-dot.e3-legend-correct { background: #dcfce7; border-color: #22c55e; }
      .e3-legend-dot.e3-legend-wrong { background: #fee2e2; border-color: #ef4444; }
      .e3-quiz { max-width: 640px; width: 100%; margin: 0 auto; padding-bottom: 2rem; }
      .e3-topbar { display: flex; align-items: center; gap: 0.8rem; padding: 0.5rem 0 1rem; }
      .e3-progress-wrap { flex: 1; display: flex; align-items: center; gap: 0.6rem; }
      .e3-progress-track { flex: 1; height: 8px; background: rgba(0,0,0,0.08); border-radius: 999px; overflow: hidden; }
      .e3-progress-fill { height: 100%; border-radius: 999px; transition: width 0.4s ease; }
      .e3-progress-label { color: #475569; font-size: 0.85rem; white-space: nowrap; font-weight: 600; }
      .e3-question-card { background: #fff; border-radius: 1.2rem; padding: 1.4rem 1.5rem; margin-bottom: 1rem; box-shadow: 0 4px 20px rgba(0,0,0,0.08); }
      .e3-q-num { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 0.5rem; }
      .e3-q-text { font-size: clamp(1.05rem, 3.1vw, 1.25rem); font-weight: 700; color: #1E293B; line-height: 1.5; white-space: pre-line; }
      .e3-q-img { max-width: 100%; margin-top: 0.8rem; border-radius: 0.75rem; display: block; }
      .e3-options { display: flex; flex-direction: column; gap: 0.6rem; }
      .e3-option { display: flex; align-items: flex-start; gap: 0.8rem; background: #fff; border: 2px solid transparent; border-radius: 1rem; padding: 0.9rem 1rem; cursor: pointer; text-align: left; font-family: inherit; font-size: 1.05rem; font-weight: 600; color: #1e293b; transition: background 0.15s, border-color 0.15s, transform 0.1s; box-shadow: 0 2px 8px rgba(0,0,0,0.08); line-height: 1.4; }
      .e3-option:hover:not(:disabled) { border-color: #34D399; transform: translateX(3px); }
      .e3-option:disabled { cursor: default; }
      .e3-option-label { width: 2rem; height: 2rem; background: #1E293B; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800; flex-shrink: 0; }
      .e3-option-text { flex: 1; }
      .e3-option.e3-selected { border-color: #60A5FA; background: #EFF6FF; }
      .e3-option.e3-correct { background: #dcfce7; border-color: #22c55e; }
      .e3-option.e3-correct .e3-option-label { background: #22c55e; }
      .e3-option.e3-wrong { background: #fee2e2; border-color: #ef4444; }
      .e3-option.e3-wrong .e3-option-label { background: #ef4444; }
      .e3-blanks { display: flex; flex-direction: column; gap: 0.7rem; }
      .e3-blank-row { display: flex; align-items: center; justify-content: space-between; gap: 0.8rem; background: #fff; border-radius: 0.9rem; padding: 0.7rem 1rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
      .e3-blank-label { font-size: 1rem; font-weight: 600; color: #374151; flex: 1; }
      .e3-blank-input { width: 90px; height: 42px; text-align: center; font-size: 1.2rem; font-weight: 700; border: 2px solid #e2e8f0; border-radius: 0.6rem; }
      .e3-blank-input:disabled.e3-correct-input { border-color: #22c55e; background: #dcfce7; color: #166534; }
      .e3-blank-input:disabled.e3-wrong-input { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
      .e3-blank-row-inline { justify-content: flex-start; }
      .e3-blank-label-inline { flex: 1; width: 100%; display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.35rem; line-height: 2.2; }
      .gw-blank-inline { width: 3.4rem; height: 36px; text-align: center; font-size: 1.2rem; font-weight: 700; vertical-align: middle; }
      .gw-blank-inline.gw-blank-dashed { height: 34px; text-align: center; padding: 0 0.2rem; border: none; border-bottom: 2px dashed #94a3b8; border-radius: 0; background: transparent; }
      .gw-blank-inline.gw-blank-dashed:focus { outline: none; border-bottom-color: #34D399; border-bottom-style: solid; }
      .gw-blank-inline.gw-blank-dashed:disabled.e3-correct-input { background: transparent; border-bottom-style: solid; border-bottom-color: #22c55e; color: #166534; }
      .gw-blank-inline.gw-blank-dashed:disabled.e3-wrong-input { background: transparent; border-bottom-style: solid; border-bottom-color: #ef4444; color: #991b1b; }
      .gw-blank-inline.gw-blank-fill { flex: 1 1 auto; width: auto; text-align: left; }
      .e3-feedback { border-radius: 0.85rem; padding: 0.85rem 1.1rem; font-size: 1.05rem; font-weight: 600; margin-top: 0.8rem; line-height: 1.45; }
      .e3-feedback-right { background: #dcfce7; color: #166534; border: 1.5px solid #86efac; }
      .e3-feedback-wrong { background: #fee2e2; color: #991b1b; border: 1.5px solid #fca5a5; }
      .e3-nav { margin-top: 1rem; justify-content: flex-end; }
      .e3-nav .e3-btn { width: auto; }
      .e3-solution { background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 1rem; padding: 1rem; margin-top: 1rem; display: flex; flex-direction: column; gap: 0.7rem; }
      .e3-solution-locked { border-style: solid; border-color: #e2e8f0; background: #fff; }
      .e3-solution-label { font-weight: 700; font-size: 1rem; color: #334155; }
      .e3-solution-rows { display: flex; flex-direction: column; gap: 0.5rem; }
      .e3-sol-row { display: flex; align-items: center; gap: 0.5rem; }
      .e3-sol-row-icon { font-size: 1rem; flex-shrink: 0; }
      .e3-sol-row-input { flex: 1; border: 2px solid #e2e8f0; border-radius: 0.6rem; padding: 0.5rem 0.7rem; font-family: inherit; font-size: 1rem; min-width: 0; }
      .e3-sol-row-input:focus { outline: none; border-color: #34D399; }
      .e3-sol-row-formula-input { font-family: 'Courier New', monospace; font-weight: 700; }
      .e3-sol-row-remove { background: none; border: none; color: #94a3b8; font-size: 0.9rem; cursor: pointer; flex-shrink: 0; width: 1.7rem; height: 1.7rem; border-radius: 0.4rem; }
      .e3-sol-row-remove:hover { background: #fee2e2; color: #ef4444; }
      .e3-sol-row-readonly { background: #f8fafc; border-radius: 0.6rem; padding: 0.5rem 0.7rem; }
      .e3-sol-row-text-display { flex: 1; font-size: 1rem; color: #334155; white-space: pre-wrap; word-break: break-word; }
      .e3-sol-empty { font-size: 0.85rem; color: #94a3b8; font-style: italic; }
      .e3-solution-toolbar { display: flex; flex-wrap: wrap; gap: 0.4rem; }
      .e3-solution-hint { font-size: 0.85rem; color: #64748b; }
      .e3-hint-chip { background: #e0f2fe; color: #0369a1; font-weight: 700; padding: 0.1rem 0.45rem; border-radius: 0.4rem; white-space: nowrap; }
      .e3-sym-btn { width: 2.1rem; height: 2.1rem; border-radius: 0.5rem; border: 2px solid #e2e8f0; background: #fff; font-weight: 800; font-size: 1rem; cursor: pointer; color: #1e293b; font-family: inherit; }
      .e3-sym-btn:hover { border-color: #34D399; }
      .e3-solution-controls { display: flex; gap: 0.5rem; flex-wrap: wrap; }
      .e3-btn-sm { width: auto; padding: 0.5rem 0.9rem; font-size: 0.85rem; }
      .e3-solution-controls .e3-btn-sm { flex: 1; }
      .e3-answer-locked { opacity: 0.6; }
      .e3-answer-locked-note { text-align: center; padding: 0.9rem; color: #94a3b8; font-size: 0.95rem; font-style: italic; background: #f8fafc; border-radius: 0.8rem; margin-top: 0.9rem; }
      .e3-subquestions { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.9rem; }
      .e3-subq { font-size: clamp(1.05rem, 3.1vw, 1.25rem); font-weight: 700; color: #1E293B; line-height: 1.5; }
      .e3-hints { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.9rem; }
      .e3-hint-item { border-radius: 0.75rem; padding: 0.7rem 0.9rem; font-size: 0.95rem; line-height: 1.45; }
      .e3-hint-item.e3-hint-unlocked { background: #fef9c3; color: #713f12; border: 1.5px solid #fde68a; }
      .e3-hint-item.e3-hint-locked { background: #f1f5f9; color: #94a3b8; border: 1.5px dashed #cbd5e1; font-style: italic; }
      .e3-result { background: #fff; border-radius: 1.5rem; padding: 2rem 1.5rem; max-width: 600px; width: 100%; margin: 1rem auto; box-shadow: var(--shadow-lg, 0 8px 30px rgba(0,0,0,0.12)); }
      .e3-result-tag { text-align: center; font-size: 0.85rem; font-weight: 700; margin-bottom: 0.5rem; }
      .e3-result-icon { font-size: 4rem; text-align: center; }
      .e3-result-grade { font-size: 2rem; font-weight: 800; text-align: center; margin: 0.3rem 0 0.2rem; }
      .e3-result-score { font-size: 2.5rem; font-weight: 900; text-align: center; color: #1E293B; }
      .e3-result-pct { text-align: center; color: #64748B; font-size: 1rem; margin-bottom: 1.5rem; }
      .e3-result-list { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.5rem; max-height: 320px; overflow-y: auto; }
      .e3-result-row { display: flex; align-items: flex-start; gap: 0.6rem; padding: 0.55rem 0.7rem; border-radius: 0.6rem; font-size: 0.87rem; }
      .e3-row-ok { background: #f0fdf4; }
      .e3-row-fail { background: #fef2f2; }
      .e3-row-num { font-weight: 800; color: #64748B; min-width: 1.4rem; flex-shrink: 0; }
      .e3-row-q { flex: 1; color: #374151; line-height: 1.35; }
      .e3-row-mark { flex-shrink: 0; }
      .e3-result-actions { display: flex; flex-direction: column; gap: 0.6rem; }
      @media (min-width: 768px) {
        .e3-intro { padding: 3rem 2.5rem; }
        .e3-result-actions { flex-direction: row; flex-wrap: wrap; }
        .e3-result-actions .e3-btn { flex: 1; }
      }
      @media (max-width: 400px) {
        .e3-wrap { padding: 0.5rem; }
        .e3-intro { padding: 1.8rem 1.2rem; }
      }
    `;
    document.head.appendChild(style);
  }

  if (document.getElementById('gw-styles')) return;
  const gwStyle = document.createElement('style');
  gwStyle.id = 'gw-styles';
  gwStyle.textContent = `
    /* Use the whole viewport on tablets/desktops instead of a fixed narrow
       mobile-width column — grade3Exam.js's shared "#e3-styles" caps at
       640px, which leaves huge unused margins for kids on iPads/laptops. */
    .gw-app.e3-wrap { align-items: stretch; }
    .gw-app .e3-quiz { max-width: min(1400px, 97vw); }
    .gw-app .e3-intro.gw-intro-wide { max-width: min(1000px, 97vw); }
    .gw-app .e3-result { max-width: min(1000px, 97vw); }
    @media (min-width: 720px) {
      .gw-app .e3-wrap { padding: 2rem; }
      .gw-app .e3-q-text { font-size: 1.45rem; }
      .gw-app .e3-question-card { padding: 1.8rem 2rem; }
      .gw-app .e3-option { padding: 1.15rem 1.4rem; font-size: 1.15rem; }
      .gw-app .e3-btn { font-size: 1.15rem; padding: 1rem 1.8rem; }
      .gw-app .e3-blank-input { height: 50px; font-size: 1.3rem; }
      .gw-app .gw-table-given, .gw-app .gw-table th { font-size: 1.15rem; padding: 0.75rem 0.9rem !important; }
      .gw-app .gw-table-input { height: 48px; font-size: 1.2rem; }
      .gw-app .gw-compare-expr { font-size: 1.2rem; }
      .gw-app .gw-compare-btn { width: 3rem; height: 3rem; font-size: 1.35rem; }
      .gw-app .gw-compare-btn.gw-compare-opt { width: auto; font-size: 1.15rem; }
      .gw-app .gw-match-item { font-size: 1.15rem; padding: 1rem 1.1rem; min-height: 3.4rem; }
      .gw-app .gw-match-img { max-height: 90px; }
      .gw-app .gw-unit-row { padding: 1rem 1.2rem; }
      .gw-app .gw-unit-info strong { font-size: 1.05rem; }
      .gw-app .gw-unit-sub { font-size: 0.88rem; }
    }
    /* Quiz screen = two zones filling #app's height: the top zone (header
       always, plus the question card for picture / essay questions) never
       moves, and only the scroll zone below it scrolls — with its own
       scrollbar, so nothing in the top zone ever scrolls with the page.
       The top zone is capped in height so the answer zone keeps enough
       room; the image shrinks to fit (tap it to open the full-size
       lightbox) and a long question scrolls inside its own card. */
    .gw-app.gw-quiz-screen { height: 100%; min-height: 0; padding-bottom: 0; overflow: hidden; }
    .gw-quiz-screen .e3-quiz { display: flex; flex-direction: column; height: 100%; min-height: 0; padding-bottom: 0; }
    .gw-quiz-screen .gw-pin-zone { flex: 0 0 auto; display: flex; flex-direction: column; min-height: 0; }
    .gw-quiz-screen .gw-pin-zone-q { max-height: 55%; padding-bottom: 0.75rem; }
    .gw-quiz-screen .gw-scroll-zone {
      flex: 1 1 auto; min-height: 0;
      overflow-y: auto; overflow-x: hidden; overscroll-behavior: contain;
      -webkit-overflow-scrolling: touch;
      padding: 2px 2px 2rem; margin: 0 -2px;
    }
    .gw-app .gw-pin-zone .e3-topbar { flex-shrink: 0; }
    /* The card is itself a flex column so the image (the only shrinkable
       child) gives up height first: on short screens (landscape laptop /
       tablet) it scales down to whatever the zone has left after the text,
       instead of being cut off at the bottom. Only when even the 120px
       floor doesn't fit does the card fall back to scrolling inside. */
    .gw-app .gw-pin-zone .e3-question-card {
      flex: 0 1 auto; min-height: 0; margin-bottom: 0;
      display: flex; flex-direction: column;
      overflow-y: auto; overscroll-behavior: contain;
    }
    .gw-app .gw-pin-zone .e3-question-card > * { flex-shrink: 0; }
    .gw-app .gw-pin-zone .e3-question-card > .e3-q-img {
      flex: 0 1 auto; min-height: 120px;
      width: 100%; height: auto; max-height: 30vh; max-height: 30dvh;
      object-fit: contain; object-position: center;
    }
    @media (min-width: 720px) {
      .gw-app .gw-pin-zone .e3-question-card > .e3-q-img { max-height: 34vh; max-height: 34dvh; }
    }
    /* Short, wide screens (landscape laptop / tablet): stacking text above
       the image leaves the image only a sliver of height, so put the image
       in its own column to the right of the text, sized to the zone's
       height (zone 62% − header − card padding ≈ 62dvh − 9.5rem). */
    @media (min-width: 720px) and (max-height: 760px) {
      .gw-quiz-screen .gw-pin-zone-q { max-height: 62%; }
      .gw-app .gw-pin-zone .e3-question-card.gw-card-has-img {
        display: grid; grid-template-columns: minmax(0, 1fr) auto;
        column-gap: 1.5rem; align-items: start;
      }
      .gw-app .gw-pin-zone .gw-card-has-img > * { grid-column: 1; }
      .gw-app .gw-pin-zone .gw-card-has-img > .e3-q-img {
        grid-column: 2; grid-row: 1 / span 12; margin-top: 0;
        width: auto; max-width: 48vw; min-height: 120px;
        height: calc(62dvh - 9.5rem); max-height: none;
      }
    }
    .gw-intro-wide { max-width: 640px; }
    .gw-unit-list { display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.2rem; max-height: 55vh; overflow-y: auto; padding-right: 2px; }
    .gw-unit-row { display: flex; align-items: center; gap: 0.8rem; padding: 0.75rem 0.9rem; border: 2px solid #e2e8f0; border-radius: 1rem; background: #f8fafc; cursor: pointer; font-family: inherit; text-align: left; transition: border-color 0.15s, background 0.15s, transform 0.1s; }
    .gw-unit-row:hover { border-color: #34D399; background: #fff; transform: translateY(-1px); }
    .gw-unit-row.gw-unit-all { background: #f1f5f9; }
    .gw-unit-row.gw-unit-flash { border-color: var(--gw-flash, #34D399); animation: gw-unit-flash 1.5s ease-out; }
    @keyframes gw-unit-flash {
      0%, 25% { box-shadow: 0 0 0 4px var(--gw-flash, #34D399); background: #fff; }
      100% { box-shadow: 0 0 0 0 transparent; }
    }
    .gw-unit-badge { width: 2.3rem; height: 2.3rem; border-radius: 0.7rem; color: #fff; font-weight: 800; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 1rem; }
    .gw-unit-info { flex: 1; display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
    .gw-unit-info strong { font-size: 0.92rem; color: #1E293B; line-height: 1.3; }
    .gw-unit-sub { font-size: 0.78rem; color: #64748B; }
    .gw-unit-arrow { color: #94a3b8; font-size: 1.3rem; flex-shrink: 0; }

    .gw-table-wrap { overflow-x: auto; margin-top: 0.4rem; }
    .gw-table { border-collapse: collapse; width: 100%; min-width: 100%; }
    .gw-table.gw-table-fixed { table-layout: fixed; }
    .gw-table th { background: #e0f2fe; color: #0c4a6e; font-size: 0.88rem; font-weight: 700; padding: 0.5rem 0.4rem; border: 1.5px solid #bae6fd; white-space: nowrap; }
    .gw-table td { border: 1.5px solid #bae6fd; padding: 0.35rem; text-align: center; }
    .gw-table-given { background: #e0f2fe; color: #0c4a6e; font-weight: 700; font-size: 1.02rem; white-space: nowrap; padding: 0.55rem 0.6rem !important; }
    .gw-table-sample-row .gw-table-given,
    .gw-table-given.gw-table-sample-cell { background: #dbeafe; color: #2563eb; }
    .gw-sample-text { color: #2563eb; }
    .gw-line-break { flex-basis: 100%; height: 0; }
    .gw-blank-label-boxes { gap: 0.3rem; }
    .gw-blank-inline.gw-blank-box { flex: 0 0 auto; width: 2.6rem; height: 2.6rem; padding: 0; border: 2px solid #475569; border-radius: 0.55rem; background: #fff; text-align: center; font-size: 1.25rem; }
    .gw-blank-inline.gw-blank-box:focus { outline: none; border-color: #34D399; box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25); }
    .gw-blank-inline.gw-blank-box.e3-wrong-input { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
    .gw-blank-inline.gw-blank-box:disabled.e3-correct-input { border-color: #22c55e; background: #dcfce7; color: #166534; }
    .gw-table-blanks { margin-top: 0.9rem; }
    .gw-table-given.gw-table-given-wrap { white-space: normal; line-height: 1.25; }
    .gw-table-input-cell { padding: 0 !important; min-width: 52px; }
    .gw-table-input { display: block; width: 100%; height: 40px; text-align: center; font-size: 1.05rem; font-weight: 700; font-family: inherit; color: inherit; background: transparent; border: none; border-radius: 0; box-sizing: border-box; }
    .gw-table-input:focus { outline: none; box-shadow: inset 0 0 0 2px #34D399; }
    .gw-table-input.e3-wrong-input { background: #fee2e2; color: #991b1b; box-shadow: inset 0 0 0 2px #ef4444; }
    .gw-table-input:disabled.e3-correct-input { background: #dcfce7; color: #166534; box-shadow: inset 0 0 0 2px #22c55e; }
    .gw-table-rowlabel { border: none !important; background: transparent !important; font-weight: 700; color: #334155; white-space: nowrap; text-align: right !important; padding-right: 0.5rem !important; }
    .gw-table-group { display: flex; flex-direction: column; gap: 1rem; }
    .gw-table-group-label { font-weight: 700; color: #334155; margin-bottom: 0.3rem; }
    @media (min-width: 720px) { .gw-table-group { flex-direction: row; align-items: flex-start; } .gw-table-group-item { flex: 1; min-width: 0; } }

    .gw-compare { display: flex; flex-direction: column; gap: 0.6rem; }
    .gw-compare-row { display: flex; align-items: center; justify-content: center; gap: 0.7rem; background: #fff; border-radius: 0.9rem; padding: 0.7rem 0.9rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); flex-wrap: wrap; }
    .gw-compare-expr { font-weight: 700; color: #1E293B; font-size: 1.05rem; }
    .gw-compare-btns { display: flex; gap: 0.35rem; }
    .gw-compare-btn { width: 2.4rem; height: 2.4rem; border-radius: 0.6rem; border: 2px solid #e2e8f0; background: #f8fafc; font-weight: 800; font-size: 1.15rem; cursor: pointer; color: #1e293b; font-family: inherit; }
    .gw-compare-btn:hover { border-color: #60A5FA; }
    .gw-compare-btn.gw-compare-selected { border-color: #60A5FA; background: #EFF6FF; }
    .gw-compare-btn.gw-compare-correct { border-color: #22c55e; background: #dcfce7; color: #166534; }
    .gw-compare-btn.gw-compare-wrong { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
    .gw-compare-btn:disabled { cursor: default; }
    /* "Khoanh vào chữ" rows (Bài 34): each row has its own lettered options. */
    .gw-compare-row-opt { justify-content: space-between; }
    .gw-compare-row-opt .gw-compare-expr { flex: 1 1 14rem; font-weight: 600; }
    .gw-compare-btn.gw-compare-opt { width: auto; min-width: 5.5rem; padding: 0 0.8rem; font-size: 1.05rem; font-weight: 700; white-space: nowrap; }
    .gw-compare-row-opt .gw-compare-btns { flex-wrap: wrap; }
    .gw-compare-btn.gw-compare-opt.gw-compare-opt-short { min-width: 3rem; }

    /* A wide, visible gutter between the two columns so the connecting line
       (drawn on a correct match) actually reads as a "nối" line, instead of
       being squeezed into a 1rem gap between two edge-to-edge columns. */
    .gw-match { position: relative; max-width: 620px; margin: 0 auto; }
    .gw-match-svg { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; }
    .gw-match-line { fill: none; stroke-width: 3; opacity: 0.9; }
    .gw-match-grid { display: grid; grid-template-columns: 1fr 1fr; column-gap: clamp(1.5rem, 8vw, 5rem); row-gap: 0.6rem; align-items: stretch; position: relative; z-index: 1; }
    .gw-match.gw-match-3 { max-width: 860px; }
    .gw-match-3 .gw-match-grid { grid-template-columns: 1fr 1fr 1fr; column-gap: clamp(1.1rem, 6vw, 4.5rem); }
    .gw-match-item { display: flex; align-items: center; justify-content: center; gap: 0.4rem; padding: 0.6rem 0.7rem; border: 2px solid #e2e8f0; border-radius: 0.8rem; background: #fff; cursor: pointer; font-family: inherit; font-weight: 700; font-size: 1rem; color: #1e293b; box-shadow: 0 2px 6px rgba(0,0,0,0.06); text-align: center; min-height: 2.6rem; height: 100%; box-sizing: border-box; }
    .gw-match-item:hover:not(:disabled) { border-color: #60A5FA; }
    .gw-match-item.gw-match-selected,
    .gw-match-item.gw-match-linked { border-color: #60A5FA; background: #EFF6FF; }
    .gw-match-item.gw-match-correct { border-color: #22c55e; background: #dcfce7; color: #166534; }
    .gw-match-item.gw-match-wrong { border-color: #ef4444; background: #fee2e2; color: #991b1b; }
    .gw-match-item:disabled { cursor: default; }
    .gw-match-img { max-width: 100%; max-height: 64px; object-fit: contain; border-radius: 0.4rem; }
    .gw-match-item:has(.gw-match-cap) { flex-direction: column; gap: 0.3rem; }
    .gw-match-cap { display: inline-block; background: #bae6fd; color: #1e293b; padding: 0.1rem 0.6rem; font-weight: 600; }
    .gw-match-hint { font-size: 0.8rem; color: #94a3b8; text-align: center; margin-top: 0.6rem; font-style: italic; }
  `;
  document.head.appendChild(gwStyle);
}
