/**
 * Toán 5, Chủ đề 2–4: số đo đại lượng và dịch dấu phẩy.
 *   Bài 12 (Viết số đo đại lượng dưới dạng số thập phân): 🪜 bảng đơn vị có ô chữ số (units.js).
 *   Bài 15 (Ki-lô-mét vuông. Héc-ta): 🗺️ phóng 1 m² → 1 ha → 1 km² (bigarea.js).
 *   Bài 16 (Các đơn vị đo diện tích): 🪜 bảng đơn vị diện tích, mỗi đơn vị 2 ô.
 *   Bài 23 (Nhân, chia với 10; 100; 1 000… và 0,1; 0,01…): 🔀 băng chữ số, dấu phẩy nhảy (shift.js).
 * Ngoài ra: SHIFT_DRILL_TASKS (nhân chia nhẩm) và UNIT_DRILL_TASKS (đổi đơn vị) cho Luyện Tính lớp 5,
 * cùng định dạng task { id, make(rng), mount(f, m) } với practiceGame(…, BOOK5).
 */

import { createUnits, unitIdx, sayUnits } from '../units.js';
import { createBigArea, fieldsSvg, HX, HY, HA, KM, SQX, SQY, M } from '../bigarea.js';
import { createShift, parseOp, shiftStr, prettyDec } from '../shift.js';
import { createCanvas } from '../../grade4Tools/canvas.js';
import { BOX } from '../../grade4Tools/practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK } from '../../grade4Tools/frame.js';
import { fmt, fr, readDec, readVN } from '../num.js';

const ui = unitIdx;
/** Tờ giấy dựng đứng (đo khung chứa, không phụ thuộc viewBox). */
const tall = (t) => { const b = t.svg.parentElement.getBoundingClientRect(); return b.height > b.width * 0.9; };
/** Chuỗi số thập phân "1234,5" → hiện "1 234,5". */
const P = prettyDec;
/** Đọc số thập phân cho giọng: "3,08" → "ba phẩy không tám". */
const R = (s) => readDec(String(s).replace(/\s/g, ''));
/** Số đo nhiều phần [[v, 'm'], [8, 'cm']] → "3 m 8 cm". */
const mStr = (ps) => ps.map(([v, u]) => `${fmt(v)} ${u}`).join(' ');
const mSay = (ps) => ps.map(([v, u]) => `${readVN(v)} ${sayUnits(u).trim()}`).join(' ');
const uSay = (u) => sayUnits(u).trim();

/**
 * Đổi số đo nhiều phần sang đơn vị `to` (cùng loại kind), trả về chuỗi số thập phân "3,08".
 * Tính bằng chữ số (không sai số dấu phẩy động).
 */
function toDecimal(kind, ps, to) {
  const per = kind === 'area' ? 2 : 1;
  const T = ui(kind, to);
  // giá trị theo đơn vị nhỏ nhất trong ps
  const lo = Math.max(T, ...ps.map(([, u]) => ui(kind, u)));
  let n = 0n;
  for (const [v, u] of ps) n += BigInt(v) * 10n ** BigInt((lo - ui(kind, u)) * per);
  const sh = (lo - T) * per; // số chữ số phần thập phân
  const s = n.toString().padStart(sh + 1, '0');
  return shiftStr(sh ? `${s.slice(0, s.length - sh)},${s.slice(s.length - sh)}` : s, 0);
}
/** Phân số thập phân của phần lẻ như sách: 2 m 15 cm = 2 15/100 m. */
function bookLine(kind, ps, to) {
  const per = kind === 'area' ? 2 : 1;
  const T = ui(kind, to);
  const whole = ps.filter(([, u]) => ui(kind, u) === T).reduce((s, [v]) => s + v, 0);
  const rest = ps.filter(([, u]) => ui(kind, u) > T);
  if (!rest.length) return '';
  const lo = Math.max(...rest.map(([, u]) => ui(kind, u)));
  const num = rest.reduce((s, [v, u]) => s + v * 10 ** ((lo - ui(kind, u)) * per), 0);
  const den = 10 ** ((lo - T) * per);
  return `${whole ? fmt(whole) : ''}${fr(fmt(num), fmt(den))} ${to}`;
}
/** Thẻ của bảng đơn vị cho số đo ps. */
const partsOf = (kind, ps) => ps.map(([v, u]) => ({ u: ui(kind, u), v }));

// ── Khám phá: chờ em thao tác trên bảng đơn vị ─────────────────────────────────────────────────────────
async function waitDrop(c, t, i, nudge = 'Bấm vào thẻ số đo màu cam.') {
  t.only([]);
  await c.until(t, () => t.dropped(i), { nudge, el: () => t.chip(i) });
  await t.drop(i, { quiet: true }); // (đã thả thì bỏ qua; dùng khi bỏ qua bằng móc dev)
  await sleep(300);
}
async function waitTarget(c, t, kind, u, say) {
  const k = ui(kind, u);
  t.only([k]); t.glow(k);
  if (say) await c.say(say[0], say[1]);
  await c.until(t, () => t.target === k, { nudge: `Bấm vào chữ ${u} ở hàng tên đơn vị.`, el: () => t.head(k) });
  t.glow(null);
  if (t.target !== k) await t.setTarget(k, { quiet: true });
}
async function waitOp(c, t, op, nudge) {
  t.only([op]);
  let got = false;
  const off = t.on((ev, o) => { if (ev === 'op' && o === op) got = true; });
  await c.until(t, () => got, { nudge: nudge || 'Bấm vào thẻ phép tính đang sáng.', el: () => t.card(op) });
  off();
  t.mark(op);
}

// ── Bài 12 ─────────────────────────────────────────────────────────────────────────────────────────────
const B12 = {
  explore: {
    setup: (board) => createUnits(board, { kind: 'len' }),
    steps: [
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('len', [[2, 'm'], [15, 'cm']]));
        t.read('Mỗi đơn vị một ô chữ số');
        await c.say('Đây là bảng đơn vị đo độ dài. Mỗi đơn vị có một ô chữ số, đơn vị liền trước gấp 10 lần đơn vị liền sau.', 'Mỗi đơn vị <b>một ô</b> chữ số.');
        await c.say('Bấm thẻ 2 m để đặt chữ số 2 vào ô mét.', 'Bấm thẻ <b>2 m</b>.');
        await waitDrop(c, t, 0);
        await c.say('Bấm tiếp thẻ 15 xăng-ti-mét.', 'Bấm thẻ <b>15 cm</b>.');
        await waitDrop(c, t, 1);
        t.read('15 cm = 1 dm 5 cm');
        await c.say('Chữ số 5 vào ô xăng-ti-mét, chữ số 1 vào ô đề-xi-mét, vì 15 xăng-ti-mét là 1 đề-xi-mét 5 xăng-ti-mét.');
      },
      async (c) => {
        const t = c.t;
        await waitTarget(c, t, 'len', 'm', ['Muốn viết ra mét, đặt dấu phẩy ngay sau ô mét. Bấm vào chữ m.', 'Viết ra <b>mét</b>: bấm chữ <b>m</b>.']);
        t.read(`2 m 15 cm = ${bookLine('len', [[2, 'm'], [15, 'cm']], 'm')} = <b>2,15 m</b>`);
        await c.say('2 mét 15 xăng-ti-mét bằng 2 và 15 phần trăm mét, viết là 2 phẩy 15 mét.');
      },
      async (c) => {
        const t = c.t;
        await waitTarget(c, t, 'len', 'cm', ['Đổi ra xăng-ti-mét thì sao? Bấm chữ cm.', 'Bấm chữ <b>cm</b>.']);
        t.read('2 m 15 cm = <b>215 cm</b>');
        await c.say('Dấu phẩy trượt tới sau ô xăng-ti-mét: 215 xăng-ti-mét.');
        await waitTarget(c, t, 'len', 'km', ['Bây giờ bấm chữ km.', 'Bấm chữ <b>km</b>.']);
        t.read('2 m 15 cm = <b>0,00215 km</b>');
        await c.say('Các ô trống trước số đều viết 0: không phẩy không không hai một năm ki-lô-mét. Dấu phẩy luôn đứng ngay sau ô của đơn vị cần viết.', 'Dấu phẩy đứng <b>ngay sau ô</b> của đơn vị cần viết.');
      },
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('len', [[3, 'm'], [8, 'cm']]));
        t.read('&nbsp;');
        await c.say('Thử với sợi dây dài 3 mét 8 xăng-ti-mét. Bấm hai thẻ.', 'Sợi dây dài <b>3 m 8 cm</b>. Bấm hai thẻ.');
        await waitDrop(c, t, 0);
        await waitDrop(c, t, 1);
        await c.say('Ô đề-xi-mét còn trống. 3 mét 8 xăng-ti-mét bằng bao nhiêu mét?', '3 m 8 cm = ? m');
        await c.choose([{ html: '3,8 m', value: '3,8' }, { html: '3,08 m', value: '3,08' }, { html: '3,008 m', value: '3,008' }], '3,08', { hint: '8 cm là 8 phần trăm mét. Ô đề-xi-mét trống phải viết 0.' });
        await t.fillZeros();
        await t.setTarget(ui('len', 'm'), { quiet: true });
        t.read(`3 m 8 cm = ${bookLine('len', [[3, 'm'], [8, 'cm']], 'm')} = <b>3,08 m</b>`);
        await c.say('Ô trống viết chữ số 0 giữ chỗ. 3 mét 8 xăng-ti-mét bằng 3 phẩy không tám mét, không phải 3 phẩy 8.', 'Ô trống viết <b>0</b> giữ chỗ: <b>3,08 m</b>, không phải 3,8 m.');
      },
      async (c) => {
        const t = c.use((b) => createUnits(b, { kind: 'mass' }));
        t.setParts(partsOf('mass', [[1, 'kg'], [250, 'g']]));
        await c.say('Bảng đơn vị đo khối lượng cũng mỗi đơn vị một ô. Quả dưa cân nặng 1 ki-lô-gam 250 gam. Bấm hai thẻ.', 'Quả dưa nặng <b>1 kg 250 g</b>. Bấm hai thẻ.');
        await waitDrop(c, t, 0);
        await waitDrop(c, t, 1);
        await waitTarget(c, t, 'mass', 'kg', ['Viết ra ki-lô-gam: bấm chữ kg.', 'Bấm chữ <b>kg</b>.']);
        t.read(`1 kg 250 g = ${bookLine('mass', [[1, 'kg'], [250, 'g']], 'kg')} = 1,250 kg = <b>1,25 kg</b>`);
        await c.say('Được 1 phẩy 250. Chữ số 0 ở cuối phần thập phân bỏ đi được: 1 phẩy 25 ki-lô-gam.', 'Bỏ chữ số 0 ở cuối: <b>1,25 kg</b>');
      },
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('mass', [[275, 'g']]));
        t.read('&nbsp;');
        await c.say('Gói bánh nặng 275 gam. Bấm thẻ rồi viết ra ki-lô-gam.', 'Gói bánh nặng <b>275 g</b>. Viết ra kg.');
        await waitDrop(c, t, 0);
        await waitTarget(c, t, 'mass', 'kg');
        t.read(`275 g = ${fr(275, '1 000')} kg = <b>0,275 kg</b>`);
        await c.say('Ô ki-lô-gam trống nên viết 0: không phẩy 275 ki-lô-gam.');
        t.setParts(partsOf('mass', [[8, 'kg'], [75, 'g']]));
        t.read('&nbsp;');
        await t.drop(0, { quiet: true }); await t.drop(1, { quiet: true });
        await c.say('Bao gạo nặng 8 ki-lô-gam 75 gam. Bằng bao nhiêu ki-lô-gam?', '8 kg 75 g = ? kg');
        await c.choose([{ html: '8,75 kg', value: '8,75' }, { html: '8,075 kg', value: '8,075' }, { html: '8,0075 kg', value: '8,0075' }], '8,075', { hint: '75 g là 75 phần nghìn ki-lô-gam. Ô héc-tô-gam trống phải viết 0.' });
        await t.fillZeros();
        await t.setTarget(ui('mass', 'kg'), { quiet: true });
        t.read(`8 kg 75 g = ${bookLine('mass', [[8, 'kg'], [75, 'g']], 'kg')} = <b>8,075 kg</b>`);
        await c.say('8 ki-lô-gam 75 gam bằng 8 phẩy không bảy lăm ki-lô-gam.');
        await t.play(partsOf('mass', [[1, 'tấn'], [5, 'tạ']]), ui('mass', 'tấn'));
        t.read(`Con voi nặng 1 tấn 5 tạ = 1${fr(5, 10)} tấn = <b>1,5 tấn</b>`);
        await c.say('Con voi nặng 1 tấn 5 tạ, tức là 1 phẩy 5 tấn.');
      },
      async (c) => {
        const t = c.use((b) => createUnits(b, { kind: 'area', from: ui('area', 'm²'), to: ui('area', 'cm²') }));
        t.setParts(partsOf('area', [[1, 'm²'], [60, 'dm²']]));
        await c.say('Đơn vị đo diện tích gấp nhau 100 lần, nên mỗi đơn vị có 2 ô chữ số. Tấm kính rộng 1 mét vuông 60 đề-xi-mét vuông. Bấm hai thẻ.', 'Diện tích: mỗi đơn vị <b>2 ô</b>. Bấm hai thẻ.');
        await waitDrop(c, t, 0);
        await waitDrop(c, t, 1);
        await waitTarget(c, t, 'area', 'm²', ['Viết ra mét vuông: bấm chữ m².', 'Bấm chữ <b>m²</b>.']);
        t.read(`1 m² 60 dm² = ${bookLine('area', [[1, 'm²'], [60, 'dm²']], 'm²')} = <b>1,6 m²</b>`);
        await c.say('1 mét vuông 60 đề-xi-mét vuông bằng 1 phẩy 6 mét vuông.');
        t.setParts(partsOf('area', [[3, 'm²'], [6, 'dm²']]));
        t.read('&nbsp;');
        await t.drop(0, { quiet: true }); await t.drop(1, { quiet: true });
        await c.say('Còn 3 mét vuông 6 đề-xi-mét vuông?', '3 m² 6 dm² = ? m²');
        await c.choose([{ html: '3,6 m²', value: '3,6' }, { html: '3,06 m²', value: '3,06' }, { html: '3,006 m²', value: '3,006' }], '3,06', { hint: '6 dm² là 6 phần trăm mét vuông: hai ô của dm² là 0 và 6.' });
        await t.fillZeros();
        await t.setTarget(ui('area', 'm²'), { quiet: true });
        t.read(`3 m² 6 dm² = ${bookLine('area', [[3, 'm²'], [6, 'dm²']], 'm²')} = <b>3,06 m²</b>`);
        await c.say('Hai ô của đề-xi-mét vuông là 0 và 6: 3 phẩy không sáu mét vuông.');
      },
    ],
  },
  tasks: () => [taskMix(), taskSmall(), taskAreaDec(), taskTrap(), taskBack()],
};

// ── Thực hành Bài 12 ───────────────────────────────────────────────────────────────────────────────────
/** Đồ vật thật và khoảng số đo hợp lý: [tên, kind, đơn vị lớn, [min, max], đơn vị nhỏ, [min, max]]. */
const MEASURES = [
  ['Sợi dây dài', 'len', 'm', [2, 9], 'cm', [1, 99]],
  ['Bạn Nam cao', 'len', 'm', [1, 1], 'cm', [5, 55]],
  ['Cây cột cờ cao', 'len', 'm', [6, 12], 'cm', [5, 95]],
  ['Quãng đường từ nhà đến trường dài', 'len', 'km', [1, 4], 'm', [5, 950]],
  ['Tấm vải dài', 'len', 'm', [2, 8], 'dm', [1, 9]],
  ['Quả dưa hấu cân nặng', 'mass', 'kg', [2, 6], 'g', [50, 950]],
  ['Bao gạo cân nặng', 'mass', 'kg', [5, 25], 'g', [5, 500]],
  ['Con mèo cân nặng', 'mass', 'kg', [3, 5], 'g', [5, 900]],
  ['Con voi cân nặng', 'mass', 'tấn', [2, 5], 'tạ', [1, 9]],
  ['Xe tải chở', 'mass', 'tấn', [2, 8], 'kg', [50, 950]],
];
const fixRange = (k, u, a) => (k === 'mass' && u === 'kg' && a > 9 ? a : a); // (giữ chỗ)

function makeMeasure(rng, { zero = rng() < 0.6 } = {}) {
  const [name, kind, U, [a0, a1], u, [b0, b1]] = rng.pick(MEASURES);
  const a = fixRange(kind, U, rng.int(a0, a1));
  const f = 10 ** (ui(kind, u) - ui(kind, U)); // số đơn vị nhỏ trong 1 đơn vị lớn
  let b;
  if (f === 10) b = rng.int(Math.max(1, b0), Math.min(9, b1));
  else if (zero) b = rng.int(Math.max(1, b0), Math.min(b1, f / 10 - 1)); // cần 0 giữ chỗ
  else b = rng.int(Math.max(f / 10, b0), b1);
  if (!b) b = 1;
  return { name, kind, U, u, a, b };
}

/** Bảng đơn vị trong câu Thực hành (khoảng đơn vị vừa đủ để ô to). */
function practiceTable(f, kind, us) {
  const is = us.map(u => ui(kind, u));
  const lo = Math.min(...is), hi = Math.max(...is); // độ dài, khối lượng: ô thừa bên trái (lead) chứa chữ số hàng chục
  return createUnits(f.tool, { kind, from: lo, to: hi, top: false });
}

function taskMix() {
  return {
    id: 'u12mix',
    make: (rng) => makeMeasure(rng),
    async mount(f, { name, kind, U, u, a, b }) {
      const ps = [[a, U], [b, u]];
      const ans = toDecimal(kind, ps, U);
      f.q.innerHTML = `${name} ${mStr(ps)} = ${BOX} ${U}`;
      const t = practiceTable(f, kind, [U, u]);
      let shown = false;
      await f.ask({
        box: f.q.querySelector('.g4-box'), answer: ans, max: ans.length + 2,
        say: `${name} ${mSay(ps)}. Viết thành số thập phân theo ${uSay(U)}.`,
        hint: () => {
          if (!shown) { shown = true; t.play(partsOf(kind, ps)); }
          return `Mỗi đơn vị một ô chữ số. Ô trống viết 0 giữ chỗ, dấu phẩy ngay sau ô ${U}.`;
        },
      });
      if (!shown) await t.play(partsOf(kind, ps), ui(kind, U)); else await t.setTarget(ui(kind, U), { quiet: true });
      t.read(`${mStr(ps)} = ${bookLine(kind, ps, U)} = <b>${P(ans)} ${U}</b>`);
      f.finish({ ok: `${mStr(ps)} = ${P(ans)} ${U}` });
    },
  };
}

/** Một đơn vị nhỏ → đơn vị lớn: 275 g = 0,275 kg; 8 cm = 0,08 m; 125 m = 0,125 km. */
function taskSmall() {
  const ITEMS = [['Chiếc bút chì dài', 'len', 'cm', [8, 18], 'm'], ['Quyển sách dày', 'len', 'mm', [8, 35], 'm'], ['Đoạn đường từ cổng đến lớp dài', 'len', 'm', [45, 350], 'km'],
    ['Gói bánh cân nặng', 'mass', 'g', [150, 500], 'kg'], ['Quả cam cân nặng', 'mass', 'g', [150, 300], 'kg'], ['Quả trứng cân nặng', 'mass', 'g', [50, 70], 'kg'],
    ['Chiếc bàn học dài', 'len', 'cm', [60, 99], 'm']];
  return {
    id: 'u12small',
    make: (rng) => { const k = rng.int(0, ITEMS.length - 1); const [, , , [lo, hi]] = ITEMS[k]; return { k, v: rng.int(lo, hi) }; },
    async mount(f, { k, v }) {
      const [name, kind, u, , U] = ITEMS[k];
      const ans = toDecimal(kind, [[v, u]], U);
      f.q.innerHTML = `${name} ${fmt(v)} ${u} = ${BOX} ${U}`;
      const t = practiceTable(f, kind, [U, u]);
      let shown = false;
      await f.ask({
        box: f.q.querySelector('.g4-box'), answer: ans, max: ans.length + 2,
        say: `${name} ${readVN(v)} ${uSay(u)}. Viết theo ${uSay(U)}.`,
        hint: () => { if (!shown) { shown = true; t.play(partsOf(kind, [[v, u]])); } return `Ô ${U} trống thì viết 0, rồi dấu phẩy ngay sau ô ${U}.`; },
      });
      if (!shown) await t.play(partsOf(kind, [[v, u]]), ui(kind, U)); else await t.setTarget(ui(kind, U), { quiet: true });
      const den = 10 ** (ui(kind, u) - ui(kind, U));
      t.read(`${fmt(v)} ${u} = ${fr(fmt(v), fmt(den))} ${U} = <b>${P(ans)} ${U}</b>`);
      f.finish({ ok: `${fmt(v)} ${u} = ${P(ans)} ${U}` });
    },
  };
}

/** Diện tích: 1 m² 60 dm² = 1,6 m²; 3 m² 6 dm² = 3,06 m²; 56 dm² = 0,56 m²; 4 cm² 15 mm² = 4,15 cm². */
function taskAreaDec() {
  const ITEMS = [['Tấm kính', 'm²', 'dm²', [1, 4]], ['Mặt bàn', 'm²', 'dm²', [1, 2]], ['Tờ giấy màu', 'dm²', 'cm²', [1, 6]], ['Con tem', 'cm²', 'mm²', [3, 9]], ['Bức tường', 'm²', 'dm²', [8, 15]]];
  return {
    id: 'u12area',
    make: (rng) => ({ k: rng.int(0, ITEMS.length - 1), a: rng() < 0.2 ? 0 : -1, b: rng() < 0.5 ? rng.int(1, 9) : rng.int(1, 9) * 10 + rng.int(0, 9), s: rng() }),
    async mount(f, { k, a: a0, b, s }) {
      const [name, U, u, [lo, hi]] = ITEMS[k];
      const a = a0 === 0 ? 0 : lo + Math.floor(s * (hi - lo + 1));
      const ps = a ? [[a, U], [b, u]] : [[b, u]];
      const ans = toDecimal('area', ps, U);
      f.q.innerHTML = `${name} có diện tích ${mStr(ps)} = ${BOX} ${U}`;
      const t = practiceTable(f, 'area', [U, u]);
      let shown = false;
      await f.ask({
        box: f.q.querySelector('.g4-box'), answer: ans, max: ans.length + 2,
        say: `${name} có diện tích ${mSay(ps)}. Viết theo ${uSay(U)}.`,
        hint: () => { if (!shown) { shown = true; t.play(partsOf('area', ps)); } return `Đơn vị diện tích mỗi đơn vị 2 ô: ${b < 10 ? `${b} ${u} là 0${b} phần trăm ${U}` : `${b} ${u} là ${b} phần trăm ${U}`}.`; },
      });
      if (!shown) await t.play(partsOf('area', ps), ui('area', U)); else await t.setTarget(ui('area', U), { quiet: true });
      t.read(`${mStr(ps)} = ${bookLine('area', ps, U)} = <b>${P(ans)} ${U}</b>`);
      f.finish({ ok: `${mStr(ps)} = ${P(ans)} ${U}` });
    },
  };
}

/** Chọn cách viết đúng (bẫy thiếu / thừa chữ số 0). */
function taskTrap() {
  return {
    id: 'u12trap',
    make: (rng) => makeMeasure(rng, { zero: true }),
    async mount(f, { name, kind, U, u, a, b }) {
      const ps = [[a, U], [b, u]];
      const ans = toDecimal(kind, ps, U);
      const noZero = `${a},${b}`;
      const extra = toDecimal(kind, [[a, U], [b, u]], U).replace(',', ',0');
      const opts = [...new Set([ans, noZero, extra])];
      f.q.innerHTML = `${name} ${mStr(ps)}, tức là:`;
      const t = practiceTable(f, kind, [U, u]);
      await f.choose({
        options: opts.map(o => ({ html: `${P(o)} ${U}`, value: o })).sort((x, y) => x.value.length - y.value.length), answer: ans,
        say: `${name} ${mSay(ps)}. Chọn cách viết đúng theo ${uSay(U)}.`,
        hint: 'Mỗi đơn vị một ô chữ số, ô trống phải viết 0 giữ chỗ.',
      });
      await t.play(partsOf(kind, ps), ui(kind, U));
      t.read(`${mStr(ps)} = ${bookLine(kind, ps, U)} = <b>${P(ans)} ${U}</b>`);
      f.finish({ ok: `${mStr(ps)} = ${P(ans)} ${U}` });
    },
  };
}

/** Ngược lại: 2,15 m = 2 m 15 cm (hai ô). */
function taskBack() {
  return {
    id: 'u12back',
    make: (rng) => makeMeasure(rng),
    async mount(f, { name, kind, U, u, a, b }) {
      const ps = [[a, U], [b, u]];
      const d = toDecimal(kind, ps, U);
      f.q.innerHTML = `${name} ${P(d)} ${U} = ${BOX} ${U} ${BOX} ${u}`;
      const t = practiceTable(f, kind, [U, u]);
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: a, say: `${name} ${R(d)} ${uSay(U)}. Viết thành ${uSay(U)} và ${uSay(u)}.`, hint: `Phần nguyên là số ${U}.` });
      await f.ask({ box: b2, answer: b, max: 4, hint: `Phần thập phân: các chữ số sau dấu phẩy đến hết ô ${u}.` });
      t.setDecimal(d, ui(kind, U));
      await sleep(300);
      t.read(`${P(d)} ${U} = <b>${mStr(ps)}</b>`);
      f.finish({ ok: `${P(d)} ${U} = ${mStr(ps)}` });
    },
  };
}

// ── Bài 15 ─────────────────────────────────────────────────────────────────────────────────────────────
const B15 = {
  explore: {
    setup: (board) => createBigArea(board),
    steps: [
      async (c) => {
        const t = c.t;
        await t.go('m', 0);
        t.label(`${t.text(SQX + M / 2, SQY - 2.5, 3.2, '1 m²', '#B45309')}${t.text(SQX + M / 2, SQY + M + 3.6, 2.4, 'cạnh 1 m')}`);
        t.caption('<b>1 m²</b>: hình vuông cạnh 1 m');
        await c.say('Đây là 1 mét vuông, hình vuông cạnh 1 mét. Bạn nhỏ đứng bên cạnh để em thấy nó to cỡ nào.');
      },
      async (c) => {
        const t = c.t;
        t.caption('Thu nhỏ để nhìn xa hơn…');
        await c.say('Bây giờ thu nhỏ để nhìn xa hơn.');
        await t.go('ha');
        t.label(`${t.text(HX + HA / 2, HY - 30, 80, '1 ha', '#DC2626')}${t.text(HX + HA / 2, HY + HA + 75, 52, '100 m')}
          ${t.text(HX + HA + 30, HY + HA / 2, 52, '100 m').replace('class="g4v-t"', 'class="g4v-t" style="text-anchor:start"')}
          <circle cx="${SQX + M / 2}" cy="${SQY + M / 2}" r="26" fill="none" stroke="#DC2626" stroke-width="3" vector-effect="non-scaling-stroke"/>${t.text(SQX + M / 2, SQY - 34, 34, '1 m²', '#B45309')}`);
        t.caption('Héc-ta: hình vuông cạnh <b>100 m</b>');
        await c.say('Thửa đất hình vuông cạnh 100 mét, rộng hơn một sân bóng đá một chút. Diện tích của nó là 1 héc-ta. Ô 1 mét vuông chỉ còn là một chấm nhỏ.');
      },
      async (c) => {
        const t = c.t;
        t.caption('Đếm ô 1 m²: <b>0</b>');
        await c.say('Mỗi dải dài 100 mét, rộng 10 mét có 1 000 ô 1 mét vuông. Cùng đếm.');
        await t.sweepHa((k) => t.caption(`Đếm ô 1 m²: <b>${fmt(k * 1000)}</b>`));
        await c.say('1 héc-ta bằng bao nhiêu mét vuông?', '1 ha = ? m²');
        await c.choose([{ html: '100 m²', value: 100 }, { html: '1 000 m²', value: 1000 }, { html: '10 000 m²', value: 10000 }], 10000, { hint: '10 dải, mỗi dải 1 000 ô.' });
        t.caption('<b>1 ha = 10 000 m²</b>');
        await c.say('Đúng rồi! 1 héc-ta bằng 10 000 mét vuông.');
      },
      async (c) => {
        const t = c.t;
        t.caption('Thu nhỏ nữa…');
        await c.say('Thu nhỏ nữa.');
        await t.go('km');
        t.label(`${t.text(KM / 2, -140, 440, '1 km²', '#DC2626')}${t.text(KM / 2, KM + 360, 300, '1 km')}`);
        t.caption('Ki-lô-mét vuông: hình vuông cạnh <b>1 km</b>');
        await c.say('Cả một phường nhỏ có nhà, trường học, công viên, hồ nước. Hình vuông cạnh 1 ki-lô-mét có diện tích 1 ki-lô-mét vuông. Thửa đất 1 héc-ta viền đỏ nằm ở giữa.');
        t.caption('Đếm thửa 1 ha: <b>0</b>');
        await t.sweepKm((k) => t.caption(`Đếm thửa 1 ha: <b>${k * 10}</b>`));
        await c.say('1 ki-lô-mét vuông bằng bao nhiêu héc-ta?', '1 km² = ? ha');
        await c.choose([{ html: '10 ha', value: 10 }, { html: '100 ha', value: 100 }, { html: '1 000 ha', value: 1000 }], 100, { hint: '10 hàng, mỗi hàng 10 thửa 1 ha.' });
        t.caption('<b>1 km² = 100 ha = 1 000 000 m²</b>');
        await c.say('1 ki-lô-mét vuông bằng 100 héc-ta, bằng 1 triệu mét vuông.');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        const ITEMS = [['🗺️', 'Nước Việt Nam rộng khoảng', '331 344', 'km²', ['m²', 'ha', 'km²'], 'nước Việt Nam rộng khoảng ba trăm ba mươi mốt nghìn ba trăm bốn mươi bốn'],
          ['🐦', 'Vườn quốc gia Tràm Chim rộng hơn', '7 500', 'ha', ['dm²', 'm²', 'ha'], 'vườn quốc gia Tràm Chim rộng hơn bảy nghìn năm trăm']];
        for (const [ic, name, n, u, opts, spoken] of ITEMS) {
          t.draw(`<text x="500" y="200" class="g4v-t" font-size="150">${ic}</text><text x="500" y="300" class="g4v-t" font-size="44">${name}</text><text x="500" y="370" class="g4v-t" font-size="60">${n} … ?</text>`);
          t.caption('Chọn đơn vị đo thích hợp');
          t.frame(120, 40, 760, 380);
          await c.say(`Diện tích ${spoken}, đơn vị nào?`);
          await c.choose(opts.map(x => ({ html: `${n} ${x}`, value: x })), u, { hint: 'Vùng đất rất rộng thì dùng đơn vị lớn.' });
          t.draw(`<text x="500" y="200" class="g4v-t" font-size="150">${ic}</text><text x="500" y="300" class="g4v-t" font-size="44">${name}</text><text x="500" y="370" class="g4v-t" font-size="60" fill="#16A34A">${n} ${u}</text>`);
          await sleep(600);
        }
        t.caption('7 500 ha = <b>75 km²</b>');
        await c.say('7 500 héc-ta bằng 75 ki-lô-mét vuông, vì 100 héc-ta là 1 ki-lô-mét vuông.');
      },
      async (c) => {
        const list = [[7, 3], [5, 5], [6, 4]];
        const t = c.use((b) => createCanvas(b));
        const { svg, width, height } = fieldsSvg(list, { s: 70, vertical: tall(t) });
        t.draw(svg);
        t.frame(-110, 0, width + 110, height + (tall(t) ? 0 : 120));
        t.caption('Mảnh đất nào có diện tích <b>lớn nhất</b>?');
        await c.say('Ba mảnh đất hình chữ nhật. Mảnh nào có diện tích lớn nhất? Hãy tính, đừng chỉ nhìn chiều dài.');
        await c.choose(list.map((_, i) => ({ html: `Mảnh ${'ABC'[i]}`, value: i })), 1, { hint: 'Tính chiều dài nhân chiều rộng của từng mảnh.' });
        await t.anim('.g5b-fa', [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], 400, { stagger: 350 });
        t.caption('21 km² < 24 km² < <b>25 km²</b>');
        await c.say('Mảnh A dài nhất nhưng chỉ 21 ki-lô-mét vuông. Mảnh B là 25 ki-lô-mét vuông, lớn nhất.');
      },
    ],
  },
  tasks: () => [taskKmConv(), taskBiggest(), taskSquareHa(), taskAreaUnit(), taskFact()],
};

/** Đổi km², ha, m². */
function taskKmConv() {
  const KINDS = ['km2m2', 'ha2m2', 'km2ha', 'ha2km', 'kmm2', 'm2km'];
  return {
    id: 'b15conv',
    make: (rng) => ({ k: rng.pick(KINDS), a: rng.int(2, 9), b: rng.int(1, 9), c: rng.int(1, 99) }),
    async mount(f, { k, a, b, c }) {
      let q, ans, hint, say;
      if (k === 'km2m2') { q = `${a} km² = ${BOX} m²`; ans = a * 1e6; hint = '1 km² = 1 000 000 m².'; }
      else if (k === 'ha2m2') { q = `${a} ha = ${BOX} m²`; ans = a * 1e4; hint = '1 ha = 10 000 m².'; }
      else if (k === 'km2ha') { q = `${a} km² = ${BOX} ha`; ans = a * 100; hint = '1 km² = 100 ha.'; }
      else if (k === 'ha2km') { q = `${fmt(c * 100)} ha = ${BOX} km²`; ans = c; hint = '100 ha = 1 km².'; }
      else if (k === 'kmm2') { q = `${a} km² ${fmt(b * 100)} m² = ${BOX} m²`; ans = a * 1e6 + b * 100; hint = `${a} km² = ${fmt(a * 1e6)} m², rồi cộng thêm.`; }
      else { q = `${fmt(a * 1e6 + c * 1e4)} m² = ${BOX} km²`; ans = String(a + c / 100).replace('.', ','); hint = '1 000 000 m² = 1 km².'; }
      say = 'Đổi đơn vị đo diện tích.';
      f.q.innerHTML = `<span style="font-size:1.25em">${q}</span>`;
      const t = createCanvas(f.tool);
      ladder(t);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: String(ans).length + 2, say, hint });
      f.finish({ ok: q.replace(BOX, typeof ans === 'string' ? P(ans) : fmt(ans)) });
    },
  };
}
/** Bậc thang km² → ha → m² (hình nhắc trong câu Thực hành). */
function ladder(t) {
  const step = (x, y, w, h, c, s) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="${c}" stroke="${INK}" stroke-width="3"/><text x="${x + w / 2}" y="${y + h / 2 + 22}" class="g4v-t" font-size="60">${s}</text>`;
  const arr = (x1, x2, y, s) => `<path d="M${x1} ${y} Q${(x1 + x2) / 2} ${y - 90} ${x2} ${y}" fill="none" stroke="#DC2626" stroke-width="5" marker-end="url(#g5ar)"/><text x="${(x1 + x2) / 2}" y="${y - 80}" class="g4v-t" font-size="40" fill="#DC2626">${s}</text>`;
  t.draw(`<defs><marker id="g5ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#DC2626"/></marker></defs>
    ${step(40, 300, 250, 130, '#FECACA', 'km²')}${step(375, 300, 250, 130, '#FEF08A', 'ha')}${step(710, 300, 250, 130, '#BBF7D0', 'm²')}
    ${arr(165, 490, 290, '× 100')}${arr(500, 835, 290, '× 10 000')}`);
  t.frame(20, 150, 960, 300);
}

function taskBiggest() {
  return {
    id: 'b15big',
    make: (rng) => {
      for (let k = 0; k < 60; k++) {
        const list = [0, 1, 2].map(() => { const a = rng.int(2, 8), b = rng.int(2, 8); return [Math.max(a, b), Math.min(a, b)]; });
        const ar = list.map(([a, b]) => a * b);
        if (new Set(ar).size < 3) continue;
        const best = ar.indexOf(Math.max(...ar));
        const longest = list.map(([a]) => a).indexOf(Math.max(...list.map(([a]) => a)));
        if (best === longest) continue; // bẫy: mảnh dài nhất không phải mảnh lớn nhất
        if (list.reduce((s, [a]) => s + a, 0) > 18) continue;
        return { list };
      }
      return { list: [[7, 3], [5, 5], [6, 4]] };
    },
    async mount(f, { list }) {
      const ar = list.map(([a, b]) => a * b);
      const best = ar.indexOf(Math.max(...ar));
      f.q.innerHTML = 'Mảnh đất nào có diện tích lớn nhất?';
      const t = createCanvas(f.tool);
      const { svg, width, height } = fieldsSvg(list, { s: 60, vertical: tall(t) });
      t.draw(svg);
      t.frame(-110, 0, width + 110, height);
      await f.choose({ options: list.map((_, i) => ({ html: `Mảnh ${'ABC'[i]}`, value: i })), answer: best, say: 'Mảnh đất nào có diện tích lớn nhất? Tính rồi chọn.', hint: 'Tính chiều dài nhân chiều rộng của từng mảnh.' });
      await t.anim('.g5b-fa', [{ opacity: 0, transform: 'translateY(20px)' }, { opacity: 1, transform: 'none' }], 400, { stagger: 300 });
      f.finish({ ok: `Mảnh ${'ABC'[best]}: ${list[best][0]} × ${list[best][1]} = ${ar[best]} km².` });
    },
  };
}

/** Khu đất hình vuông cạnh 200 m có diện tích 4 ha. */
function taskSquareHa() {
  return {
    id: 'b15side',
    make: (rng) => (rng() < 0.6 ? { a: rng.int(1, 5) * 100, b: 0 } : { a: rng.int(2, 6) * 100, b: rng.int(1, 4) * 100 }),
    async mount(f, { a, b: b0 }) {
      const b = b0 || a;
      const ans = (a * b) / 10000;
      f.q.innerHTML = `${b0 ? `Khu đất hình chữ nhật dài ${a} m, rộng ${b} m` : `Khu đất hình vuông cạnh ${a} m`} có diện tích ${BOX} ha`;
      const t = createCanvas(f.tool);
      const s = Math.min(760 / (a / 100), 420 / (b / 100));
      const W = (a / 100) * s, H = (b / 100) * s, x0 = 500 - W / 2, y0 = 40;
      let g = '';
      for (let j = 0; j < b / 100; j++) for (let i = 0; i < a / 100; i++) g += `<rect class="g5b-hc" x="${x0 + i * s}" y="${y0 + j * s}" width="${s}" height="${s}" fill="#BBF7D0" stroke="#16A34A" stroke-width="2"/><text class="g5b-hl" x="${x0 + i * s + s / 2}" y="${y0 + j * s + s / 2 + 14}" font-size="${Math.min(40, s * 0.3)}" opacity="0" style="font-weight:800;text-anchor:middle" fill="#166534">1 ha</text>`;
      t.draw(`<g>${g}</g><rect x="${x0}" y="${y0}" width="${W}" height="${H}" fill="none" stroke="${INK}" stroke-width="3.5"/>
        <text x="500" y="${y0 + H + 46}" class="g4v-t" font-size="36">${a} m</text><text x="${x0 - 14}" y="${y0 + H / 2 + 12}" class="g4v-t" font-size="36" style="text-anchor:end">${b} m</text>`);
      t.frame(80, 0, 840, Math.max(300, y0 + H + 70));
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, say: 'Tính diện tích khu đất theo héc-ta.', hint: 'Mỗi ô vuông cạnh 100 m là 1 ha. Đếm số ô.' });
      await t.anim('.g5b-hl', [{ opacity: 0 }, { opacity: 1 }], 300, { stagger: 120 });
      f.finish({ ok: `${a} × ${b} = ${fmt(a * b)} m² = ${ans} ha` });
    },
  };
}

function taskAreaUnit() {
  const ITEMS = [['🗺️', 'Nước Việt Nam', '331 344', 'km²'], ['🐦', 'Vườn quốc gia Tràm Chim', '7 500', 'ha'], ['🏙️', 'Thủ đô Hà Nội', '3 359', 'km²'], ['🌊', 'Hồ Tây (Hà Nội)', '500', 'ha'],
    ['🏫', 'Phòng học', '60', 'm²'], ['⚽', 'Sân bóng đá', '7 000', 'm²'], ['🌾', 'Cánh đồng lúa của xã', '120', 'ha'], ['🏝️', 'Đảo Phú Quốc', '589', 'km²']];
  return {
    id: 'b15unit',
    make: (rng) => ({ k: rng.int(0, ITEMS.length - 1) }),
    async mount(f, { k }) {
      const [ic, name, n, u] = ITEMS[k];
      f.q.innerHTML = `<span style="font-size:2.2em">${ic}</span><br>${name} có diện tích khoảng ${n} …`;
      await f.choose({ options: ['m²', 'ha', 'km²'].map(x => ({ html: `${n} ${x}`, value: x })), answer: u, say: `${name} có diện tích khoảng bao nhiêu?`, hint: 'Nghĩ xem nơi đó rộng cỡ nào: phòng, thửa ruộng hay cả một vùng.' });
      f.finish({ ok: `${name}: khoảng ${n} ${u}.` });
    },
  };
}

function taskFact() {
  const FACTS = [['1 km² =', 'm²', [1000, 1000000, 10000], 1000000], ['1 ha =', 'm²', [100, 1000, 10000], 10000], ['1 km² =', 'ha', [10, 100, 1000], 100]];
  return {
    id: 'b15fact',
    make: (rng) => ({ k: rng.int(0, FACTS.length - 1) }),
    async mount(f, { k }) {
      const [q, u, opts, ans] = FACTS[k];
      f.q.innerHTML = `<span style="font-size:1.3em">${q} ?</span>`;
      await f.choose({ options: opts.map(x => ({ html: `${fmt(x)} ${u}`, value: x })), answer: ans, say: sayUnits(`${q.replace('=', 'bằng bao nhiêu')} ${u}?`), hint: 'Héc-ta là hình vuông cạnh 100 m; ki-lô-mét vuông là hình vuông cạnh 1 000 m.' });
      f.finish({ ok: `${q} ${fmt(ans)} ${u}` });
    },
  };
}

// ── Bài 16 ─────────────────────────────────────────────────────────────────────────────────────────────
const AU = (u) => ui('area', u);
const B16 = {
  explore: {
    setup: (board) => createUnits(board, { kind: 'area' }),
    steps: [
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('area', [[1, 'm²']]));
        t.read('Mỗi đơn vị <b>2 ô</b> chữ số');
        await c.say('Bảng đơn vị đo diện tích. Đơn vị lớn gấp 100 lần đơn vị bé liền sau, nên mỗi đơn vị có 2 ô chữ số. Bấm thẻ 1 mét vuông.', 'Bấm thẻ <b>1 m²</b>.');
        await waitDrop(c, t, 0);
        await t.setTarget(AU('m²'), { quiet: true });
        await waitTarget(c, t, 'area', 'dm²', ['Đổi ra đề-xi-mét vuông: bấm chữ dm².', 'Bấm chữ <b>dm²</b>.']);
        t.read('1 m² = <b>100 dm²</b>');
        await c.say('Dấu phẩy nhảy qua 2 ô: 1 mét vuông bằng 100 đề-xi-mét vuông.');
        await waitTarget(c, t, 'area', 'cm²', ['Bấm tiếp chữ cm².', 'Bấm chữ <b>cm²</b>.']);
        t.read('1 m² = 100 dm² = <b>10 000 cm²</b>');
        await c.say('1 mét vuông bằng 10 000 xăng-ti-mét vuông.');
      },
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('area', [[1, 'ha']]));
        t.read('&nbsp;');
        await c.say('Bấm thẻ 1 héc-ta.', 'Bấm thẻ <b>1 ha</b>.');
        await waitDrop(c, t, 0);
        await t.setTarget(AU('ha'), { quiet: true });
        await waitTarget(c, t, 'area', 'm²', ['Đổi ra mét vuông: bấm chữ m².', 'Bấm chữ <b>m²</b>.']);
        t.read('1 ha = <b>10 000 m²</b>');
        await c.say('Giữa héc-ta và mét vuông có 4 ô: 1 héc-ta bằng 10 000 mét vuông.', 'Giữa ha và m² có <b>4 ô</b>: 1 ha = 10 000 m²');
        t.setParts(partsOf('area', [[1, 'km²']]));
        await t.drop(0, { quiet: true });
        await t.setTarget(AU('km²'), { quiet: true });
        await waitTarget(c, t, 'area', 'ha', ['Còn 1 ki-lô-mét vuông? Bấm chữ ha.', 'Bấm chữ <b>ha</b>.']);
        t.read('1 km² = <b>100 ha</b>');
        await c.say('1 ki-lô-mét vuông bằng 100 héc-ta.');
      },
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('area', [[2, 'm²'], [5, 'dm²']]));
        t.read('&nbsp;');
        await c.say('Nền nhà tắm rộng 2 mét vuông 5 đề-xi-mét vuông. Bấm hai thẻ.', 'Nền nhà tắm <b>2 m² 5 dm²</b>. Bấm hai thẻ.');
        await waitDrop(c, t, 0);
        await waitDrop(c, t, 1);
        await c.say('2 mét vuông 5 đề-xi-mét vuông bằng bao nhiêu đề-xi-mét vuông?', '2 m² 5 dm² = ? dm²');
        await c.choose([{ html: '25 dm²', value: 25 }, { html: '205 dm²', value: 205 }, { html: '2 005 dm²', value: 2005 }], 205, { hint: 'Ô dm² có 2 chữ số: 5 dm² viết là 05.' });
        await t.fillZeros();
        await t.setTarget(AU('dm²'), { quiet: true });
        t.read('2 m² 5 dm² = 200 dm² + 5 dm² = <b>205 dm²</b>');
        await c.say('Hai ô của đề-xi-mét vuông là 0 và 5. 2 mét vuông 5 đề-xi-mét vuông bằng 205 đề-xi-mét vuông.');
      },
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('area', [[40, 'cm²'], [4, 'mm²']]));
        t.read('&nbsp;');
        await c.say('Con tem rộng 40 xăng-ti-mét vuông 4 mi-li-mét vuông. Bấm hai thẻ rồi viết ra mi-li-mét vuông.', '<b>40 cm² 4 mm²</b> = ? mm²');
        await waitDrop(c, t, 0);
        await waitDrop(c, t, 1);
        await t.fillZeros();
        await waitTarget(c, t, 'area', 'mm²');
        t.read('40 cm² 4 mm² = 4 000 mm² + 4 mm² = <b>4 004 mm²</b>');
        await c.say('40 xăng-ti-mét vuông 4 mi-li-mét vuông bằng 4 004 mi-li-mét vuông.');
      },
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('area', [[12, 'km²'], [50, 'ha']]));
        t.read('&nbsp;');
        await c.say('Một huyện đảo rộng 12 ki-lô-mét vuông 50 héc-ta. Bấm hai thẻ rồi viết ra ki-lô-mét vuông.', '<b>12 km² 50 ha</b> = ? km²');
        await waitDrop(c, t, 0);
        await waitDrop(c, t, 1);
        await waitTarget(c, t, 'area', 'km²');
        t.read(`12 km² 50 ha = 12${fr(50, 100)} km² = <b>12,5 km²</b>`);
        await c.say('12 phẩy 50, bỏ chữ số 0 ở cuối: 12 phẩy 5 ki-lô-mét vuông.');
      },
      async (c) => {
        const t = c.t;
        t.setParts(partsOf('area', [[615, 'dm²']]));
        t.read('&nbsp;');
        await c.say('Tấm thảm rộng 615 đề-xi-mét vuông. Bấm thẻ rồi viết ra mét vuông.', '<b>615 dm²</b> = ? m²');
        await waitDrop(c, t, 0);
        await waitTarget(c, t, 'area', 'm²');
        t.read('615 dm² = <b>6 m² 15 dm²</b> = <b>6,15 m²</b>');
        await c.say('Chữ số 6 nằm ở ô mét vuông: 615 đề-xi-mét vuông bằng 6 mét vuông 15 đề-xi-mét vuông, tức là 6 phẩy 15 mét vuông.');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        t.draw(`<rect x="300" y="170" width="400" height="200" rx="10" fill="#FCD34D" stroke="${INK}" stroke-width="4"/>
          <rect x="320" y="370" width="26" height="150" fill="#B45309" stroke="${INK}" stroke-width="3"/><rect x="654" y="370" width="26" height="150" fill="#B45309" stroke="${INK}" stroke-width="3"/>
          <rect x="360" y="200" width="120" height="80" fill="#fff" stroke="${INK}" stroke-width="2.5"/><path d="M380 225 h80 M380 250 h60" stroke="#94A3B8" stroke-width="5"/>
          <text x="500" y="150" class="g4v-t" font-size="34">dài 1 m, rộng 5 dm</text>`);
        t.caption('Mặt bàn học có diện tích khoảng…');
        await c.say('Mặt bàn học của em có diện tích khoảng bao nhiêu?');
        await c.choose([{ html: '50 cm²', value: 'cm²' }, { html: '50 dm²', value: 'dm²' }, { html: '50 m²', value: 'm²' }], 'dm²', { hint: '50 cm² chỉ bằng bàn tay; 50 m² rộng bằng cả lớp học.' });
        t.caption('1 m = 10 dm · 10 × 5 = <b>50 dm²</b>');
        await c.say('Bàn dài 1 mét tức 10 đề-xi-mét, rộng 5 đề-xi-mét: 10 nhân 5 bằng 50 đề-xi-mét vuông.');
      },
    ],
  },
  tasks: () => [taskAreaJoin(), taskAreaSplit(), taskAreaToDec(), taskAreaEst(), taskHaM2()],
};

/** Ghép về đơn vị bé: 2 m² 5 dm² = 205 dm²; 40 cm² 4 mm² = 4 004 mm². */
function taskAreaJoin() {
  const PAIRS = [['m²', 'dm²'], ['dm²', 'cm²'], ['cm²', 'mm²'], ['km²', 'ha']];
  return {
    id: 'b16join',
    make: (rng) => ({ k: rng.int(0, PAIRS.length - 1), a: rng() < 0.3 ? rng.int(10, 60) : rng.int(2, 9), b: rng() < 0.6 ? rng.int(1, 9) : rng.int(10, 99) }),
    async mount(f, { k, a, b }) {
      const [U, u] = PAIRS[k];
      const ps = [[a, U], [b, u]];
      const ans = a * 100 + b;
      f.q.innerHTML = `${mStr(ps)} = ${BOX} ${u}`;
      const t = practiceTable(f, 'area', [U, u]);
      let shown = false;
      await f.ask({
        box: f.q.querySelector('.g4-box'), answer: ans, say: `Viết ${mSay(ps)} theo ${uSay(u)}.`,
        hint: () => { if (!shown) { shown = true; t.play(partsOf('area', ps)); } return `1 ${U} = 100 ${u}. Mỗi đơn vị 2 ô chữ số.`; },
      });
      if (!shown) await t.play(partsOf('area', ps), AU(u)); else await t.setTarget(AU(u), { quiet: true });
      t.read(`${mStr(ps)} = ${fmt(a * 100)} ${u} + ${b} ${u} = <b>${fmt(ans)} ${u}</b>`);
      f.finish({ ok: `${mStr(ps)} = ${fmt(ans)} ${u}` });
    },
  };
}
/** Tách: 615 dm² = 6 m² 15 dm². */
function taskAreaSplit() {
  const PAIRS = [['m²', 'dm²'], ['dm²', 'cm²'], ['cm²', 'mm²']];
  return {
    id: 'b16split',
    make: (rng) => ({ k: rng.int(0, PAIRS.length - 1), v: rng.int(1, 9) * 100 + (rng() < 0.4 ? rng.int(1, 9) : rng.int(10, 99)) }),
    async mount(f, { k, v }) {
      const [U, u] = PAIRS[k];
      f.q.innerHTML = `${fmt(v)} ${u} = ${BOX} ${U} ${BOX} ${u}`;
      const t = practiceTable(f, 'area', [U, u]);
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: Math.floor(v / 100), say: `Viết ${readVN(v)} ${uSay(u)} thành ${uSay(U)} và ${uSay(u)}.`, hint: `100 ${u} = 1 ${U}.` });
      await f.ask({ box: b2, answer: v % 100, max: 3, hint: `Còn lại bao nhiêu ${u}?` });
      await t.play(partsOf('area', [[v, u]]), AU(U));
      t.read(`${fmt(v)} ${u} = <b>${Math.floor(v / 100)} ${U} ${v % 100} ${u}</b>`);
      f.finish({ ok: `${fmt(v)} ${u} = ${Math.floor(v / 100)} ${U} ${v % 100} ${u}` });
    },
  };
}
/** Viết số thập phân: 12 km² 50 ha = 12,5 km²; 271 mm² = 0,0271 dm². */
function taskAreaToDec() {
  return {
    id: 'b16dec',
    make: (rng) => (rng() < 0.6
      ? { ps: [[rng.int(2, 30), 'km²'], [rng() < 0.5 ? rng.int(1, 9) : rng.int(1, 9) * 10, 'ha']], to: 'km²' }
      : { ps: [[rng.int(110, 990), 'mm²']], to: 'dm²' }),
    async mount(f, { ps, to }) {
      const ans = toDecimal('area', ps, to);
      f.q.innerHTML = `${mStr(ps)} = ${BOX} ${to}`;
      const t = practiceTable(f, 'area', [to, ...ps.map(p => p[1])]);
      let shown = false;
      await f.ask({
        box: f.q.querySelector('.g4-box'), answer: ans, max: ans.length + 2, say: `Viết ${mSay(ps)} thành số đo theo ${uSay(to)}.`,
        hint: () => { if (!shown) { shown = true; t.play(partsOf('area', ps)); } return `Mỗi đơn vị 2 ô. Dấu phẩy ngay sau ô ${to}, ô trống viết 0.`; },
      });
      if (!shown) await t.play(partsOf('area', ps), AU(to)); else await t.setTarget(AU(to), { quiet: true });
      t.read(`${mStr(ps)} = ${bookLine('area', ps, to)} = <b>${P(ans)} ${to}</b>`);
      f.finish({ ok: `${mStr(ps)} = ${P(ans)} ${to}` });
    },
  };
}
function taskAreaEst() {
  const ITEMS = [['📚', 'Mặt bàn học', '50', 'dm²'], ['📱', 'Màn hình điện thoại', '90', 'cm²'], ['🏫', 'Sân trường', '2 000', 'm²'], ['🚪', 'Cánh cửa ra vào', '2', 'm²'],
    ['💅', 'Móng tay cái', '80', 'mm²'], ['🌾', 'Cánh đồng lúa', '25', 'ha'], ['📒', 'Bìa quyển vở', '4', 'dm²'], ['🛏️', 'Mặt giường', '3', 'm²']];
  return {
    id: 'b16est',
    make: (rng) => ({ k: rng.int(0, ITEMS.length - 1) }),
    async mount(f, { k }) {
      const [ic, name, n, u] = ITEMS[k];
      const pool = ['mm²', 'cm²', 'dm²', 'm²', 'ha'];
      const i = pool.indexOf(u);
      const opts = pool.slice(Math.max(0, Math.min(i - 1, pool.length - 3)), Math.max(0, Math.min(i - 1, pool.length - 3)) + 3);
      f.q.innerHTML = `<span style="font-size:2.2em">${ic}</span><br>${name} có diện tích khoảng:`;
      await f.choose({ options: opts.map(x => ({ html: `${n} ${x}`, value: x })), answer: u, say: `${name} có diện tích khoảng bao nhiêu?`, hint: 'Hình dung vật đó so với bàn tay, mặt bàn, lớp học.' });
      f.finish({ ok: `${name}: khoảng ${n} ${u}.` });
    },
  };
}
/** ha ↔ m²: 3 ha = 30 000 m²; 25 000 m² = 2,5 ha. */
function taskHaM2() {
  return {
    id: 'b16ha',
    make: (rng) => (rng() < 0.5 ? { a: rng.int(2, 9), back: 0 } : { a: rng.int(12, 95), back: 1 }),
    async mount(f, { a, back }) {
      const q = back ? `${fmt(a * 1000)} m² = ${BOX} ha` : `${a} ha = ${BOX} m²`;
      const ans = back ? decStr(a / 10) : a * 10000;
      f.q.innerHTML = `Thửa ruộng rộng ${q}`;
      const t = practiceTable(f, 'area', ['ha', 'm²']);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: String(ans).length + 2, say: 'Đổi héc-ta và mét vuông.', hint: '1 ha = 10 000 m²: giữa ha và m² có 4 ô.' });
      if (back) await t.play(partsOf('area', [[a * 1000, 'm²']]), AU('ha')); else await t.play(partsOf('area', [[a, 'ha']]), AU('m²'));
      f.finish({ ok: q.replace(BOX, back ? P(ans) : fmt(ans)) });
    },
  };
}
const decStr = (x) => shiftStr(String(Math.round(x * 1e6) / 1e6).replace('.', ','), 0);

// ── Bài 23 ─────────────────────────────────────────────────────────────────────────────────────────────
const MUL = ['×10', '×100', '×1000'], MUL01 = ['×0,1', '×0,01', '×0,001'], DIV = [':10', ':100', ':1000'], DIV01 = [':0,1', ':0,01', ':0,001'];
const B23 = {
  explore: {
    setup: (board) => createShift(board, { values: ['27,86'], cards: [...MUL, ...DIV] }),
    steps: [
      async (c) => {
        const t = c.t, r = t.rows[0];
        r.eq('27,86 × 10 = <span class="g5s-q">?</span>');
        await c.say('Băng chữ số có dấu phẩy đỏ. Nhân với 10: bấm thẻ nhân 10 và xem dấu phẩy.', 'Bấm thẻ <b>× 10</b>.');
        await waitOp(c, t, '×10');
        const s = await r.apply('×10');
        r.eq(`27,86 × 10 = <b>${P(s)}</b>`);
        await c.say('Dấu phẩy chuyển sang phải 1 chữ số: 27 phẩy 86 nhân 10 bằng 278 phẩy 6.');
      },
      async (c) => {
        const t = c.t, r = t.rows[0];
        r.set('53,28'); t.mark(null);
        r.eq('53,28 × 1 000 = <span class="g5s-q">?</span>');
        await c.say('Nhân với 1 000 thì dấu phẩy chuyển sang phải 3 chữ số. Bấm thẻ nhân 1 000.', 'Bấm thẻ <b>× 1 000</b>.');
        await waitOp(c, t, '×1000');
        const s = await r.apply('×1000');
        r.eq(`53,28 × 1 000 = <b>${P(s)}</b>`);
        await c.say('Hết chữ số mà dấu phẩy còn phải đi, ta viết thêm chữ số 0: 53 280.', 'Hết chữ số thì <b>viết thêm 0</b>: 53 280');
      },
      async (c) => {
        const t = c.t, r = t.rows[0];
        r.set('534,28'); t.mark(null);
        r.eq('534,28 : 100 = <span class="g5s-q">?</span>');
        t.only([]);
        await c.say('Chia cho 100 thì dấu phẩy chuyển sang đâu?', '534,28 : 100: dấu phẩy chuyển…');
        await c.choose([{ html: 'sang phải 2 chữ số', value: 'r' }, { html: 'sang trái 2 chữ số', value: 'l' }], 'l', { hint: 'Chia cho 100 thì số bé đi.' });
        await waitOp(c, t, ':100');
        const s = await r.apply(':100');
        r.eq(`534,28 : 100 = <b>${P(s)}</b>`);
        await c.say('Chia cho 100: dấu phẩy chuyển sang trái 2 chữ số, được 5 phẩy 3428.');
        r.set('0,3'); t.mark(null);
        r.eq('0,3 : 10 = <span class="g5s-q">?</span>');
        await c.say('Còn 0 phẩy 3 chia 10?', 'Bấm thẻ <b>: 10</b>.');
        await waitOp(c, t, ':10');
        const s2 = await r.apply(':10');
        r.eq(`0,3 : 10 = <b>${P(s2)}</b>`);
        await c.say('Thiếu chữ số thì thêm 0 ở bên trái: 0 phẩy 3 chia 10 bằng 0 phẩy không ba.');
      },
      async (c) => {
        const t = c.use((b) => createShift(b, { values: ['15,23', '15,23'], cards: ['×0,1', ':10'] }));
        const [r0, r1] = t.rows;
        r0.eq('15,23 × 0,1 = <span class="g5s-q">?</span>');
        r1.eq('15,23 : 10 = <span class="g5s-q">?</span>');
        await c.say('Nhân với 0 phẩy 1 thì sao? Bấm thẻ nhân 0 phẩy 1.', 'Bấm thẻ <b>× 0,1</b>.');
        await waitOp(c, t, '×0,1');
        const s = await r0.apply('×0,1');
        r0.eq(`15,23 × 0,1 = <b>${P(s)}</b>`);
        await c.say('Bấm tiếp thẻ chia 10.', 'Bấm thẻ <b>: 10</b>.');
        await waitOp(c, t, ':10');
        const s1 = await r1.apply(':10');
        r1.eq(`15,23 : 10 = <b>${P(s1)}</b>`);
        await c.say('Hai kết quả bằng nhau! Nhân với 0 phẩy 1 cũng là chia cho 10: dấu phẩy chuyển sang trái 1 chữ số.', '<b>× 0,1</b> giống <b>: 10</b>: dấu phẩy sang trái');
      },
      async (c) => {
        const t = c.use((b) => createShift(b, { values: ['79,6'], cards: [...MUL01, ...DIV01] }));
        const r = t.rows[0];
        r.eq('79,6 × 0,01 = <span class="g5s-q">?</span>');
        await c.say('79 phẩy 6 nhân 0 phẩy không một.', 'Bấm thẻ <b>× 0,01</b>.');
        await waitOp(c, t, '×0,01');
        const s = await r.apply('×0,01');
        r.eq(`79,6 × 0,01 = <b>${P(s)}</b>`);
        await c.say('Nhân với 0 phẩy không một: dấu phẩy sang trái 2 chữ số, được 0 phẩy 796.');
        r.set('36,5'); t.mark(null);
        r.eq('36,5 : 0,1 = <span class="g5s-q">?</span>');
        await c.say('Mỗi tờ giấy dày 0 phẩy 1 mi-li-mét. Chồng giấy dày 36 phẩy 5 mi-li-mét có bao nhiêu tờ? Ta tính 36 phẩy 5 chia 0 phẩy 1.', 'Chồng giấy dày <b>36,5 mm</b>, mỗi tờ <b>0,1 mm</b>. Bấm <b>: 0,1</b>.');
        await waitOp(c, t, ':0,1');
        const s2 = await r.apply(':0,1');
        r.eq(`36,5 : 0,1 = <b>${P(s2)}</b>`);
        await c.say('Chia cho 0 phẩy 1 là nhân với 10: dấu phẩy sang phải 1 chữ số. Chồng giấy có 365 tờ.', 'Chồng giấy có <b>365 tờ</b>.');
      },
      async (c) => {
        const ops = [':100', ':0,01', '×0,01', '×100'];
        const t = c.use((b) => createShift(b, { values: ['10,8'], cards: ops }));
        const r = t.rows[0];
        let v = '10,8';
        await c.say('Chuỗi phép tính: bắt đầu từ 10 phẩy 8, bấm lần lượt từng thẻ.', 'Bắt đầu từ <b>10,8</b>. Bấm lần lượt từng thẻ.');
        for (const op of ops) {
          const o = parseOp(op);
          r.eq(`${P(v)} ${o.m} ${P(o.ks)} = <span class="g5s-q">?</span>`);
          await waitOp(c, t, op);
          const s = await r.apply(op);
          r.eq(`${P(v)} ${o.m} ${P(o.ks)} = <b>${P(s)}</b>`);
          v = s;
          await sleep(500);
        }
        await c.say('Lại được 10 phẩy 8! Chia 100 rồi chia 0 phẩy không một thì như nhân 100. Nhân 0 phẩy không một rồi nhân 100 thì về như cũ.', 'Về lại <b>10,8</b>');
      },
    ],
  },
  tasks: () => [taskShift(MUL, 's23mul'), taskShift(MUL01, 's23mul01'), taskShift(DIV, 's23div'), taskShift(DIV01, 's23div01'), taskShiftCtx(), taskSame(), taskChain()],
};

// ── Thực hành Bài 23 / nhân chia nhẩm ──────────────────────────────────────────────────────────────────
/** Số thập phân ngẫu nhiên dạng chuỗi: ints chữ số phần nguyên (0 → "0"), dps chữ số phần thập phân. */
function randDec(rng, ints, dps) {
  let i = ints ? String(rng.int(1, 9)) : '0';
  for (let k = 1; k < ints; k++) i += rng.int(0, 9);
  let f = '';
  for (let k = 0; k < dps; k++) f += k === dps - 1 ? rng.int(1, 9) : rng.int(0, 9);
  return i + (dps ? `,${f}` : '');
}
/** Số cho phép tính op: có khi cần thêm 0 (53,28 × 1 000; 0,8 : 100). */
function numFor(rng, op, zeros) {
  const n = parseOp(op).n;
  if (zeros) return n > 0 ? randDec(rng, rng.int(1, 2), Math.max(1, n - 1)) : randDec(rng, 0, 1);
  return n > 0 ? randDec(rng, rng.int(1, 2), rng.int(n, n + 1)) : randDec(rng, rng.int(-n, -n + 1), rng.int(1, 2));
}
const opWord = (op) => { const o = parseOp(op); return `${o.m === '×' ? 'nhân' : 'chia'} ${R(o.ks)}`; };
const ruleText = (op) => { const n = parseOp(op).n; return `${opWord(op).replace(/^./, ch => ch.toUpperCase())}: chuyển dấu phẩy sang ${n > 0 ? 'phải' : 'trái'} ${Math.abs(n)} chữ số. Thiếu chữ số thì thêm 0.`; };
/** Băng dịch dấu phẩy trong câu Thực hành: hiện số, sau khi đúng thì dấu phẩy chạy. */
function shiftTool(f, v, op) {
  const t = createShift(f.tool, { values: [v], cards: [] });
  const o = parseOp(op);
  t.rows[0].eq(`${P(v)} ${o.m} ${P(o.ks)}`);
  return t;
}

function taskShift(ops, id) {
  return {
    id,
    make: (rng) => { const op = rng.pick(ops); const z = rng() < 0.35; return { op, v: numFor(rng, op, z) }; },
    async mount(f, { op, v }) {
      const o = parseOp(op);
      const ans = shiftStr(v, o.n);
      f.q.innerHTML = `<span style="font-size:1.25em">${P(v)} ${o.m} ${P(o.ks)} = ${BOX}</span>`;
      const t = shiftTool(f, v, op);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans.includes(',') ? ans : +ans, max: ans.length + 2, say: `Tính nhẩm: ${R(v)} ${opWord(op)}.`, hint: ruleText(op) });
      await t.apply(op);
      t.rows[0].eq(`${P(v)} ${o.m} ${P(o.ks)} = <b>${P(ans)}</b>`);
      f.finish({ ok: `${P(v)} ${o.m} ${P(o.ks)} = ${P(ans)}` });
    },
  };
}

/** Bài toán thật: chồng giấy, đổi đơn vị bằng dịch dấu phẩy, giá 10 / 100 món. */
function taskShiftCtx() {
  const CTX = [
    (rng) => { const v = randDec(rng, 2, 1); return { q: `Mỗi tờ giấy dày 0,1 mm. Chồng giấy dày ${P(v)} mm có ${BOX} tờ`, v, op: ':0,1', say: `Mỗi tờ giấy dày không phẩy một mi-li-mét. Chồng giấy dày ${R(v)} mi-li-mét có bao nhiêu tờ?` }; },
    (rng) => { const v = randDec(rng, rng.int(1, 2), 2); return { q: `${P(v)} kg = ${BOX} g`, v, op: '×1000', say: `Đổi ${R(v)} ki-lô-gam ra gam.` }; },
    (rng) => { const v = randDec(rng, 2, 1); return { q: `${P(v)} cm = ${BOX} m`, v, op: ':100', say: `Đổi ${R(v)} xăng-ti-mét ra mét.` }; },
    (rng) => { const v = randDec(rng, 1, 1); return { q: `${P(v)} m = ${BOX} km`, v, op: ':1000', say: `Đổi ${R(v)} mét ra ki-lô-mét.` }; },
    (rng) => { const v = randDec(rng, 0, 2); return { q: `Mỗi hộp sữa chứa ${P(v)} l. 10 hộp chứa ${BOX} l`, v, op: '×10', say: `Mỗi hộp sữa chứa ${R(v)} lít. 10 hộp chứa bao nhiêu lít?` }; },
    (rng) => { const v = randDec(rng, 0, 2); return { q: `Mỗi bước chân dài ${P(v)} m. 100 bước dài ${BOX} m`, v, op: '×100', say: `Mỗi bước chân dài ${R(v)} mét. 100 bước dài bao nhiêu mét?` }; },
  ];
  return {
    id: 's23ctx',
    make: (rng) => { const k = rng.int(0, CTX.length - 1); return { k, ...CTX[k](rng) }; },
    async mount(f, { q, v, op, say }) {
      const ans = shiftStr(v, parseOp(op).n);
      f.q.innerHTML = q;
      const t = shiftTool(f, v, op);
      t.rows[0].eq(`${P(v)} ${parseOp(op).m} ${P(parseOp(op).ks)} = <span class="g5s-q">?</span>`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans.includes(',') ? ans : +ans, max: ans.length + 2, say, hint: ruleText(op) });
      await t.apply(op);
      t.rows[0].eq(`${P(v)} ${parseOp(op).m} ${P(parseOp(op).ks)} = <b>${P(ans)}</b>`);
      f.finish({ ok: q.replace(BOX, P(ans)) });
    },
  };
}

/** × 0,1 giống : 10 (chọn phép tính cho cùng kết quả). */
function taskSame() {
  const PAIRS = [['×0,1', ':10'], ['×0,01', ':100'], ['×0,001', ':1000'], [':0,1', '×10'], [':0,01', '×100']];
  return {
    id: 's23same',
    make: (rng) => ({ k: rng.int(0, PAIRS.length - 1), v: randDec(rng, 2, 2) }),
    async mount(f, { k, v }) {
      const [a, b] = PAIRS[k];
      const oa = parseOp(a), ob = parseOp(b);
      const flip = (op) => { const o = parseOp(op); return `${o.m === '×' ? ':' : '×'}${o.ks}`; };
      f.q.innerHTML = `${P(v)} ${oa.m} ${P(oa.ks)} cho cùng kết quả với:`;
      const opts = [b, flip(b), flip(a)].map(op => { const o = parseOp(op); return { html: `${P(v)} ${o.m} ${P(o.ks)}`, value: op }; });
      const t = createShift(f.tool, { values: [v, v], cards: [] });
      t.rows[0].eq(`${P(v)} ${oa.m} ${P(oa.ks)}`);
      t.rows[1].eq('&nbsp;');
      await f.choose({ options: opts, answer: b, say: `${R(v)} ${opWord(a)} cho cùng kết quả với phép tính nào?`, hint: 'Xem dấu phẩy chuyển sang bên nào, mấy chữ số.' });
      t.rows[1].eq(`${P(v)} ${ob.m} ${P(ob.ks)}`);
      const [s] = await Promise.all([t.rows[0].apply(a), t.rows[1].apply(b)]);
      t.rows[0].eq(`${P(v)} ${oa.m} ${P(oa.ks)} = <b>${P(s)}</b>`);
      t.rows[1].eq(`${P(v)} ${ob.m} ${P(ob.ks)} = <b>${P(s)}</b>`);
      f.finish({ ok: `${P(v)} ${oa.m} ${P(oa.ks)} = ${P(v)} ${ob.m} ${P(ob.ks)} = ${P(s)}` });
    },
  };
}

/** Chuỗi 4 phép tính trên cùng một băng. */
function taskChain() {
  return {
    id: 's23chain',
    make: (rng) => {
      const v = randDec(rng, 2, 1);
      const ops = [];
      let n = 0;
      for (let k = 0; k < 3; k++) {
        const pool = [...MUL, ...MUL01, ...DIV, ...DIV01].filter(op => { const m = n + parseOp(op).n; return m >= -3 && m <= 2 && op !== ops[ops.length - 1]; });
        const op = rng.pick(pool);
        ops.push(op); n += parseOp(op).n;
      }
      return { v, ops };
    },
    async mount(f, { v, ops }) {
      f.q.innerHTML = `${P(v)} ${ops.map((op, i) => { const o = parseOp(op); return `<span style="white-space:nowrap">→ ${o.m} ${P(o.ks)} → <span class="g4-box" data-i="${i}"></span></span>`; }).join(' ')}`;
      const t = createShift(f.tool, { values: [v], cards: [] });
      let cur = v;
      for (let i = 0; i < ops.length; i++) {
        const op = ops[i], o = parseOp(op);
        const ans = shiftStr(cur, o.n);
        t.rows[0].eq(`${P(cur)} ${o.m} ${P(o.ks)} = <span class="g5s-q">?</span>`);
        await f.ask({ box: f.q.querySelector(`.g4-box[data-i="${i}"]`), answer: ans.includes(',') ? ans : +ans, max: ans.length + 2, say: i ? `Tiếp: ${opWord(op)}.` : `Bắt đầu từ ${R(v)}. ${opWord(op)}.`, hint: ruleText(op) });
        await t.apply(op);
        t.rows[0].eq(`${P(cur)} ${o.m} ${P(o.ks)} = <b>${P(ans)}</b>`);
        cur = ans;
      }
      f.finish({ ok: `Kết quả cuối: ${P(cur)}` });
    },
  };
}

export const UNIT_LESSONS = { 12: B12, 15: B15, 16: B16, 23: B23 };

/** Luyện Tính lớp 5 🔀 Nhân chia nhẩm: × và : với 10, 100, 1 000 và 0,1; 0,01; 0,001 (trộn, có câu phải thêm 0). */
export const SHIFT_DRILL_TASKS = [taskShift(MUL, 's23mul'), taskShift(MUL01, 's23mul01'), taskShift(DIV, 's23div'), taskShift(DIV01, 's23div01'), taskShift([...MUL, ...MUL01, ...DIV, ...DIV01], 's23mix'), taskShiftCtx()];
/** Luyện Tính lớp 5 🪜 Đổi đơn vị: độ dài, khối lượng, diện tích sang số thập phân và ngược lại. */
export const UNIT_DRILL_TASKS = [taskMix(), taskSmall(), taskAreaDec(), taskBack(), taskAreaJoin(), taskAreaSplit(), taskAreaToDec()];
