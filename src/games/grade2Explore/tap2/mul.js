/**
 * Khám phá Bài 37–44 (Phép nhân, Thừa số tích, Bảng nhân 2, 5, Phép chia, Số bị chia số chia thương, Bảng chia 2, 5).
 * Công cụ: groups.js (đĩa, rổ, hộp trên bàn + khay). Phép nhân viết như sách: (số đồ mỗi nhóm) × (số nhóm).
 */

import { createGroups } from './groups.js';
import { css, sfx } from '../../grade4Tools/frame.js';
import { sleep } from '../../grade3Drills/kit.js';
import { devDo } from './dev.js';

const W = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];
/** Đọc số nhỏ (≤ 99) thành chữ cho giọng đọc. */
export function rd(n) {
  if (n <= 10) return W[n];
  const t = Math.floor(n / 10), u = n % 10;
  const head = t === 1 ? 'mười' : `${W[t]} mươi`;
  if (!u) return head;
  return `${head} ${u === 5 ? 'lăm' : u === 1 && t > 1 ? 'mốt' : u === 4 && t > 1 ? 'tư' : W[u]}`;
}
const C = { a: '#DC2626', b: '#2563EB', r: '#16A34A' };
const b = (x, c = '#1D4ED8') => `<b style="color:${c}">${x}</b>`;

/** Phép tính có nhãn dưới từng số: [[chữ, nhãn?, màu?], …]. */
export function lab(parts) {
  injectLabStyles();
  return `<span class="x2zg-lab">${parts.map(([v, l = '', c = '#1E293B']) => `<span class="x2zg-lp" style="--c:${c}"><span>${v}</span><small>${l || '&nbsp;'}</small></span>`).join('')}</span>`;
}

/** Em bấm lần lượt từng đĩa (theo thứ tự), mỗi đĩa nhận `per` quả. after(k) cập nhật dòng phép tính. */
async function fillBoxes(c, t, per, upto, after, { nudge = 'Bấm vào đĩa còn trống.' } = {}) {
  const busy = new Set();
  const off = t.on((ev, i) => {
    if (ev === 'put') { busy.delete(i); const k = t.counts.filter(x => x === per).length; t.tag(i, after.tag ? after.tag(i + 1) : per); after(k); return; }
    if (ev !== 'box') return;
    const next = t.counts.findIndex((x, j) => x === 0 && !busy.has(j));
    if (t.counts[i] || busy.has(i)) return;
    if (i !== next) { c.hint('Em bấm lần lượt từng đĩa, từ trái sang phải.'); t.glow(next); return; }
    busy.add(i); t.glow(null);
    t.put(i, per, { gap: per > 4 ? 110 : 170 });
  });
  devDo(() => { const i = t.counts.findIndex(x => x === 0); if (i >= 0 && !busy.size) t.emit('box', i); });
  await c.until(t, () => t.counts.slice(0, upto).every(x => x === per) && !busy.size, {
    nudge, el: () => t.box(Math.max(0, t.counts.findIndex(x => x === 0))),
  });
  off(); devDo(null);
}

/** Bấm khay: mỗi lần `per` quả bay vào đĩa trống tiếp theo (chia theo nhóm). */
async function packTray(c, t, per, { nudge = 'Bấm vào khay để xếp tiếp.' } = {}) {
  let busy = false;
  const off = t.on((ev) => {
    if (ev === 'put') { busy = false; return; }
    if (ev !== 'tray' || busy || t.left < per) return;
    const i = t.counts.findIndex(x => x === 0);
    if (i < 0) return;
    busy = true;
    t.show(i + 1);
    t.put(i, per, { gap: per > 4 ? 110 : 170 }).then(() => { t.tag(i, i + 1); });
  });
  devDo(() => t.emit('tray'));
  await c.until(t, () => t.left === 0 && !busy, { nudge, el: () => t.trayEl });
  off(); devDo(null);
  await sleep(200);
}

/** Bấm khay: chia lần lượt mỗi đĩa một quả (chia đều). */
async function dealTray(c, t, n, { nudge = 'Bấm vào khay để chia tiếp mỗi đĩa một quả.' } = {}) {
  let busy = false;
  const off = t.on((ev) => {
    if (ev !== 'tray' || busy || t.left < n) return;
    busy = true;
    (async () => { for (let i = 0; i < n; i++) await t.put(i, 1); busy = false; t.emit('dealt'); })();
  });
  devDo(() => t.emit('tray'));
  await c.until(t, () => t.left === 0 && !busy, { nudge, el: () => t.trayEl });
  off(); devDo(null);
}

const addChain = (per, k) => Array(k).fill(per).join(' + ');

// ── Bài 37: Phép nhân ─────────────────────────────────────────────────────────────────────────────────
const B37 = {
  title: 'Bài 37: Phép nhân',
  setup: (board) => createGroups(board, { n: 3, cap: 5, item: 'orange', tray: 15, trayCap: 15 }),
  steps: [
    async (c) => {
      const t = c.t;
      t.glow(0);
      await c.say('Có 3 cái đĩa. Mỗi đĩa em đặt 5 quả cam. Bấm vào từng đĩa.', 'Mỗi đĩa có <b>5 quả cam</b>. Bấm vào từng đĩa.');
      await fillBoxes(c, t, 5, 3, (k) => t.expr(k ? addChain(5, k) : ''));
    },
    async (c) => {
      const t = c.t;
      await c.say('Ba đĩa, mỗi đĩa năm quả. Có tất cả bao nhiêu quả cam?', '5 + 5 + 5 = <b>?</b>');
      await c.choose(['10', '15', '20'], '15', { hint: 'Đếm thêm 5: năm, mười, mười lăm.' });
      t.expr(`5 + 5 + 5 = ${b(15, C.r)}`);
      await c.say('Năm cộng năm cộng năm bằng mười lăm.');
    },
    async (c) => {
      const t = c.t;
      await c.say('Số 5 được lấy 3 lần. Ta viết thành phép nhân: năm nhân ba bằng mười lăm.', '5 được lấy <b>3</b> lần, ta viết <b>5 × 3 = 15</b>');
      t.expr(`${b(5)} × ${b(3, C.a)} = ${b(15, C.r)}`);
      await c.say('Dấu nhân viết như dấu cộng nằm nghiêng. Đọc là: năm nhân ba bằng mười lăm.', 'Đọc: <b>năm nhân ba bằng mười lăm</b>');
    },
    async (c) => {
      const t = c.use((bd) => createGroups(bd, { n: 4, cap: 2, item: 'carrot', box: 'basket', tray: 8, trayCap: 8 }));
      await c.say('Bây giờ có 4 cái rổ, mỗi rổ 2 củ cà rốt. Bấm vào từng rổ.', 'Mỗi rổ <b>2 củ cà rốt</b>. Bấm vào từng rổ.');
      await fillBoxes(c, t, 2, 4, (k) => t.expr(k ? addChain(2, k) : ''), { nudge: 'Bấm vào rổ còn trống.' });
      await c.say('Số 2 được lấy 4 lần. Phép nhân nào đúng?', '2 + 2 + 2 + 2 = 8. Phép nhân nào đúng?');
      await c.choose(['2 × 4 = 8', '4 × 4 = 16', '2 + 4 = 6'], '2 × 4 = 8', { hint: 'Mỗi rổ có 2 củ, có 4 rổ: 2 được lấy 4 lần.' });
      t.expr(`2 + 2 + 2 + 2 = ${b(8, C.r)} <small>→</small> ${b(2)} × ${b(4, C.a)} = ${b(8, C.r)}`);
      await c.say('Đúng rồi. Hai nhân bốn bằng tám.');
    },
  ],
};

// ── Bài 38: Thừa số, tích ─────────────────────────────────────────────────────────────────────────────
const B38 = {
  title: 'Bài 38: Thừa số, tích',
  setup: (board) => createGroups(board, { n: 5, cap: 2, item: 'sock', box: 'basket' }),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Mỗi rổ có một đôi tất, tức là 2 chiếc. Bấm vào từng rổ cho đủ 5 rổ.', 'Mỗi rổ <b>2 chiếc tất</b>. Bấm đủ 5 rổ.');
      await fillBoxes(c, t, 2, 5, (k) => t.expr(k ? `2 × ${k} = ${2 * k}` : ''), { nudge: 'Bấm vào rổ còn trống.' });
    },
    async (c) => {
      const t = c.t;
      t.expr(lab([['2', 'Thừa số', C.a], ['×'], ['5', 'Thừa số', C.a], ['='], ['10', 'Tích', C.r]]));
      await c.say('Trong phép nhân hai nhân năm bằng mười: 2 và 5 là thừa số, 10 là tích.', '2 và 5 là <b style="color:#DC2626">thừa số</b>, 10 là <b style="color:#16A34A">tích</b>');
      await c.say('Hai nhân năm cũng gọi là tích.', '<b>2 × 5</b> cũng gọi là tích');
    },
    async (c) => {
      const t = c.t;
      t.expr(lab([['5', '?'], ['×'], ['3', '?'], ['='], ['15', '?']]));
      await c.say('Trong phép nhân năm nhân ba bằng mười lăm, tích là số nào?', '5 × 3 = 15. <b>Tích</b> là số nào?');
      await c.choose(['5', '3', '15'], '15', { hint: 'Tích là kết quả, số đứng sau dấu bằng.' });
      t.expr(lab([['5', '?'], ['×'], ['3', '?'], ['='], ['15', 'Tích', C.r]]));
      await c.say('Các thừa số là những số nào?', 'Các <b>thừa số</b> là?');
      await c.choose(['5 và 15', '5 và 3', '3 và 15'], '5 và 3', { hint: 'Thừa số là hai số được nhân với nhau.' });
      t.expr(lab([['5', 'Thừa số', C.a], ['×'], ['3', 'Thừa số', C.a], ['='], ['15', 'Tích', C.r]]));
      await c.say('Đúng rồi. 5 và 3 là thừa số, 15 là tích.');
    },
    async (c) => {
      const t = c.t;
      t.expr(lab([['?', 'Thừa số', C.a], ['×'], ['?', 'Thừa số', C.a], ['='], ['8', 'Tích', C.r]]));
      await c.say('Thừa số là 2 và 4. Tích là bao nhiêu?', 'Thừa số <b>2</b> và <b>4</b>. Tích là?');
      await c.choose(['6', '8', '10'], '8', { hint: '2 được lấy 4 lần: 2 + 2 + 2 + 2.' });
      t.expr(lab([['2', 'Thừa số', C.a], ['×'], ['4', 'Thừa số', C.a], ['='], ['8', 'Tích', C.r]]));
      await c.say('Hai nhân bốn bằng tám. Tích là 8.');
    },
  ],
};

// ── Bài 39, 40: Bảng nhân 2, 5 ───────────────────────────────────────────────────────────────────────
function tableExplore(k, { item, box, unit, many }) {
  const tagAt = (j) => k * j;
  return {
    title: `Bài ${k === 2 ? 39 : 40}: Bảng nhân ${k}`,
    setup: (board) => createGroups(board, { n: 10, cap: k, item, box }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say(`Mỗi ${box === 'basket' ? 'rổ' : 'hộp'} có ${k} ${unit}. Bấm lần lượt từng ${box === 'basket' ? 'rổ' : 'hộp'}, đếm thêm ${k}.`, `Mỗi ${box === 'basket' ? 'rổ' : 'hộp'} <b>${k} ${unit}</b>. Đếm thêm ${k}!`);
        const after = (j) => { t.expr(j ? `${b(k)} × ${b(j, C.a)} = ${b(k * j, C.r)}` : ''); };
        after.tag = tagAt;
        await fillBoxes(c, t, k, 5, after, { nudge: `Bấm vào ${box === 'basket' ? 'rổ' : 'hộp'} trống tiếp theo.` });
        await c.say(`Mỗi lần thêm một ${box === 'basket' ? 'rổ' : 'hộp'}, tích thêm ${k}.`, `${k} × 1 = ${k}, ${k} × 2 = ${2 * k}, ${k} × 3 = ${3 * k}… mỗi lần thêm <b>${k}</b>`);
      },
      async (c) => {
        const t = c.t;
        await c.say('Bấm tiếp cho đủ 10.', 'Bấm tiếp cho đủ <b>10</b>.');
        const after = (j) => { t.expr(`${b(k)} × ${b(j, C.a)} = ${b(k * j, C.r)}`); };
        after.tag = tagAt;
        await fillBoxes(c, t, k, 10, after);
        await c.say(`Đó là bảng nhân ${k}: các tích ${k}, ${2 * k}, ${3 * k}, cho tới ${10 * k}.`, `Bảng nhân ${k}: ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(j => k * j).join(', ')}`);
      },
      async (c) => {
        const t = c.t;
        t.glow([5, 6]);
        t.expr(`${k} × 6 = ${6 * k} <small>→</small> ${k} × 7 = ${b('?', C.r)}`);
        await c.say(`${rd(k)} nhân sáu bằng ${rd(6 * k)}. Vậy ${rd(k)} nhân bảy bằng bao nhiêu?`, `${k} × 6 = ${6 * k}. Vậy <b>${k} × 7</b> = ?`);
        await c.choose([7 * k - k, 7 * k, 7 * k + k].map(String), String(7 * k), { hint: `Thêm ${k} vào ${6 * k}.` });
        t.expr(`${k} × 7 = ${b(7 * k, C.r)}`);
        await c.say(`Đúng rồi. ${rd(6 * k)} thêm ${rd(k)} là ${rd(7 * k)}.`);
        t.glow(null);
      },
      async (c) => {
        const t = c.t;
        t.expr(`${k} × 9 = ${b('?', C.r)}`);
        t.glow([8]);
        await c.say(`${many}. ${rd(k)} nhân chín bằng bao nhiêu?`, `<b>${k} × 9</b> = ?`);
        await c.choose([9 * k - k, 9 * k, 9 * k + 1].map(String), String(9 * k), { hint: `${k} × 10 = ${10 * k}, bớt đi ${k}.` });
        t.expr(`${k} × 9 = ${b(9 * k, C.r)}`);
        t.glow(null);
        await c.say(`${rd(k)} nhân chín bằng ${rd(9 * k)}. Em đọc thuộc bảng nhân ${rd(k)} để tính nhanh.`);
      },
    ],
  };
}
const B39 = tableExplore(2, { item: 'sock', box: 'basket', unit: 'chiếc tất', many: 'Nhìn rổ thứ chín' });
const B40 = tableExplore(5, { item: 'cake', box: 'carton', unit: 'cái bánh', many: 'Nhìn hộp thứ chín' });

// ── Bài 41: Phép chia ─────────────────────────────────────────────────────────────────────────────────
const B41 = {
  title: 'Bài 41: Phép chia',
  setup: (board) => createGroups(board, { n: 2, cap: 4, item: 'cake', tray: 6, trayCap: 6 }),
  steps: [
    async (c) => {
      const t = c.t;
      await c.say('Có 6 cái bánh, chia đều vào 2 đĩa. Bấm vào khay: mỗi lần mỗi đĩa nhận một cái.', '<b>6 cái bánh</b> chia đều vào <b>2 đĩa</b>. Bấm vào khay.');
      await dealTray(c, t, 2);
      t.tag(0, 3); t.tag(1, 3);
      await c.say('Mỗi đĩa được mấy cái bánh?', 'Mỗi đĩa được mấy cái?');
      await c.choose(['2', '3', '4'], '3', { hint: 'Đếm số bánh trên một đĩa.' });
    },
    async (c) => {
      const t = c.t;
      t.expr(`${b(6)} : ${b(2, C.a)} = ${b(3, C.r)}`);
      await c.say('Sáu cái bánh chia đều vào hai đĩa, mỗi đĩa ba cái. Ta viết sáu chia hai bằng ba.', '6 chia đều cho 2, ta viết <b>6 : 2 = 3</b>');
      await c.say('Dấu chia là hai chấm. Đọc là: sáu chia hai bằng ba.', 'Đọc: <b>sáu chia hai bằng ba</b>');
    },
    async (c) => {
      const t = c.use((bd) => createGroups(bd, { n: 4, cap: 2, item: 'cake', tray: 6, trayCap: 6, shown: 0 }));
      await c.say('Lần này mỗi đĩa xếp 2 cái bánh. Bấm vào khay để xếp từng đĩa.', '6 cái bánh, <b>mỗi đĩa 2 cái</b>. Bấm vào khay.');
      await packTray(c, t, 2);
      await c.say('Được mấy đĩa?', 'Được mấy đĩa?');
      await c.choose(['2', '3', '4'], '3', { hint: 'Đếm số đĩa có bánh.' });
      t.expr(`${b(6)} : ${b(2, C.a)} = ${b(3, C.r)}`);
      await c.say('Được ba đĩa. Sáu chia hai bằng ba.', '6 : 2 = 3 (đĩa)');
    },
    async (c) => {
      const t = c.t;
      t.expr(`${b(2)} × ${b(3, C.a)} = ${b(6, C.r)}`);
      await c.say('Từ phép nhân hai nhân ba bằng sáu, ta có hai phép chia. Sáu chia hai bằng ba, và sáu chia ba bằng mấy?', '2 × 3 = 6 → 6 : 2 = 3 và 6 : 3 = <b>?</b>');
      await c.choose(['2', '3', '6'], '2', { hint: 'Lấy tích chia cho thừa số này thì được thừa số kia.' });
      t.expr(`6 : 2 = 3 <small>và</small> 6 : 3 = ${b(2, C.r)}`);
      await c.say('Đúng rồi. Sáu chia ba bằng hai.');
    },
  ],
};

// ── Bài 42: Số bị chia, số chia, thương ──────────────────────────────────────────────────────────────
const B42 = {
  title: 'Bài 42: Số bị chia, số chia, thương',
  setup: (board) => createGroups(board, { n: 2, cap: 6, item: 'apple', box: 'basket', tray: 10, trayCap: 10 }),
  steps: [
    async (c) => {
      await c.say('Có 10 quả táo, chia đều vào 2 rổ. Bấm vào khay để chia.', '<b>10 quả táo</b> chia đều vào <b>2 rổ</b>.');
      await dealTray(c, c.t, 2);
      c.t.tag(0, 5); c.t.tag(1, 5);
      c.t.expr(`10 : 2 = ${b(5, C.r)}`);
      await c.say('Mỗi rổ năm quả. Mười chia hai bằng năm.', '<b>10 : 2 = 5</b>');
    },
    async (c) => {
      c.t.expr(lab([['10', 'Số bị chia', C.b], [':'], ['2', 'Số chia', C.a], ['='], ['5', 'Thương', C.r]]));
      await c.say('Trong phép chia mười chia hai bằng năm: 10 là số bị chia, 2 là số chia, 5 là thương.', '10 là <b style="color:#2563EB">số bị chia</b>, 2 là <b style="color:#DC2626">số chia</b>, 5 là <b style="color:#16A34A">thương</b>');
      await c.say('Mười chia hai cũng gọi là thương.', '<b>10 : 2</b> cũng gọi là thương');
    },
    async (c) => {
      c.t.expr(lab([['12', '?'], [':'], ['2', '?'], ['='], ['6', '?']]));
      await c.say('Trong phép chia mười hai chia hai bằng sáu, số bị chia là số nào?', '12 : 2 = 6. <b>Số bị chia</b> là?');
      await c.choose(['12', '2', '6'], '12', { hint: 'Số bị chia là số đứng đầu, số được đem chia.' });
      c.t.expr(lab([['12', 'Số bị chia', C.b], [':'], ['2', '?'], ['='], ['6', '?']]));
      await c.say('Thương là số nào?', '<b>Thương</b> là?');
      await c.choose(['12', '2', '6'], '6', { hint: 'Thương là kết quả, số đứng sau dấu bằng.' });
      c.t.expr(lab([['12', 'Số bị chia', C.b], [':'], ['2', 'Số chia', C.a], ['='], ['6', 'Thương', C.r]]));
      await c.say('Giỏi lắm. 12 là số bị chia, 2 là số chia, 6 là thương.');
    },
    async (c) => {
      c.t.expr(lab([['15', 'Số bị chia', C.b], [':'], ['5', 'Số chia', C.a], ['='], ['?', 'Thương', C.r]]));
      await c.say('Số bị chia là 15, số chia là 5. Thương là bao nhiêu?', 'Số bị chia <b>15</b>, số chia <b>5</b>. Thương = ?');
      await c.choose(['3', '5', '10'], '3', { hint: 'Năm nhân mấy bằng mười lăm?' });
      c.t.expr(lab([['15', 'Số bị chia', C.b], [':'], ['5', 'Số chia', C.a], ['='], ['3', 'Thương', C.r]]));
      await c.say('Vì năm nhân ba bằng mười lăm nên mười lăm chia năm bằng ba.', 'Vì 5 × 3 = 15 nên <b>15 : 5 = 3</b>');
    },
  ],
};

// ── Bài 43, 44: Bảng chia 2, 5 ───────────────────────────────────────────────────────────────────────
function divExplore(k, { item, box, unit, group, first, second, asks }) {
  const nb = Math.max(first, second) / k;
  return {
    title: `Bài ${k === 2 ? 43 : 44}: Bảng chia ${k}`,
    setup: (board) => createGroups(board, { n: nb, cap: k, item, box, tray: first, trayCap: second, shown: 0 }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say(`Có ${rd(first)} ${unit}, mỗi ${group} ${rd(k)} cái. Bấm vào khay để xếp.`, `<b>${first} ${unit}</b>, mỗi ${group} <b>${k}</b>. Bấm vào khay.`);
        await packTray(c, t, k);
        const q = first / k;
        await c.say(`Được mấy ${group}?`, `Được mấy ${group}?`);
        await c.choose([q - 1, q, q + 1].map(String), String(q), { hint: `Đếm số ${group} đã xếp.` });
        t.expr(`${k} × ${q} = ${first} <small>nên</small> ${first} : ${k} = ${b(q, C.r)}`);
        await c.say(`Vì ${rd(k)} nhân ${rd(q)} bằng ${rd(first)} nên ${rd(first)} chia ${rd(k)} bằng ${rd(q)}.`, `Vì ${k} × ${q} = ${first} nên <b>${first} : ${k} = ${q}</b>`);
      },
      async (c) => {
        const t = c.t;
        t.clear(); t.show(0); t.setTray(second); t.expr('');
        await c.say(`Bây giờ có ${rd(second)} ${unit}. Bấm vào khay để xếp tiếp.`, `<b>${second} ${unit}</b>, mỗi ${group} <b>${k}</b>.`);
        await packTray(c, t, k);
        const q = second / k;
        t.expr(`${k} × ${q} = ${second} <small>nên</small> ${second} : ${k} = ${b(q, C.r)}`);
        await c.say(`Được ${rd(q)} ${group}. ${rd(second)} chia ${rd(k)} bằng ${rd(q)}.`, `<b>${second} : ${k} = ${q}</b>`);
      },
      ...asks.map(([n]) => async (c) => {
        const t = c.t;
        const q = n / k;
        t.expr(`${n} : ${k} = ${b('?', C.r)}`);
        await c.say(`${rd(n)} chia ${rd(k)} bằng bao nhiêu? Em nhớ lại bảng nhân ${rd(k)}: ${rd(k)} nhân mấy bằng ${rd(n)}?`, `<b>${n} : ${k}</b> = ? (${k} × <b>?</b> = ${n})`);
        await c.choose([q - 1, q, q + 1].map(String), String(q), { hint: `${k} × ${q - 1} = ${k * (q - 1)}, chưa đủ ${n}.` });
        t.expr(`${k} × ${q} = ${n} <small>nên</small> ${n} : ${k} = ${b(q, C.r)}`);
        await c.say(`Đúng rồi. ${rd(k)} nhân ${rd(q)} bằng ${rd(n)} nên ${rd(n)} chia ${rd(k)} bằng ${rd(q)}.`);
      }),
    ],
  };
}
const B43 = divExplore(2, { item: 'sock', box: 'basket', unit: 'chiếc tất', group: 'đôi', first: 8, second: 12, asks: [[14], [18]] });
const B44 = divExplore(5, { item: 'cake', box: 'carton', unit: 'cái bánh', group: 'hộp', first: 15, second: 20, asks: [[30], [45]] });

export const MUL_EXPLORES = { b37: B37, b38: B38, b39: B39, b40: B40, b41: B41, b42: B42, b43: B43, b44: B44 };

function injectLabStyles() {
  css('x2zg-lab', `
    .x2zg-lab { display: inline-flex; align-items: flex-start; gap: 0.25em; }
    .x2zg-lp { display: inline-flex; flex-direction: column; align-items: center; color: var(--c); }
    .x2zg-lp > span { font-size: 1em; line-height: 1; }
    .x2zg-lp > small { font-size: 0.36em; line-height: 1.1; font-weight: 800; color: var(--c); white-space: nowrap; margin-top: 0.15em; }
  `);
  void sfx;
}
