/**
 * Chủ đề 7 (Toán 5 Tập Hai): Bài 36–42, tỉ số, tỉ số phần trăm, tỉ lệ bản đồ, tổng tỉ, hiệu tỉ, máy tính cầm tay.
 * Công cụ: 🟦 sơ đồ phần bằng nhau (ratio.js), 💯 lưới phần trăm (pct.js), 📍 bản đồ tỉ lệ (map.js), 📟 máy tính cầm tay (calc.js).
 * Khám phá theo đúng mô hình sách (sơ đồ đoạn thẳng, lưới 100 ô, thước trên bản đồ, dãy phím); số trong Thực hành do máy sinh,
 * phương án nhiễu là lỗi hay gặp (đảo thứ tự tỉ số, "gấp 3 lần" lấy 3 phần, dấu phẩy trong %, chữ số 0 khi đổi cm ra km,
 * chu vi thay cho nửa chu vi, máy tính làm lần lượt).
 * Nguồn: SGK Toán 5 Tập Hai trang 4–29 (tóm tắt: docs/lop_5/kien-thuc-toan5-tap2.md).
 */

import { createRatio, RC } from '../ratio.js';
import { createPct } from '../pct.js';
import { createMap } from '../map.js';
import { createCalc, keyChips } from '../calc.js';
import { createCanvas, anim } from '../../grade4Tools/canvas.js';
import { BOX } from '../../grade4Tools/practice.js';
import { sfx, INK } from '../../grade4Tools/frame.js';
import { sleep } from '../../grade3Drills/kit.js';
import { dec, decKey, readDec, fr, frSay, clean, simp, gcd, fmt, readVN } from '../num.js';

/** Chờ em thao tác (c.until); DEV: window.__g5solve làm thay để chạy tự động. */
async function waitDo(c, t, pred, opts, solve) {
  if (import.meta.env.DEV) window.__g5solve = () => { window.__g5solve = null; solve(); };
  try { await c.until(t, pred, opts); } finally { if (import.meta.env.DEV) window.__g5solve = null; }
}
const mark = (id) => { if (import.meta.env.DEV) window.__g5sh = { task: id }; };
const D = (x) => dec(clean(x));
/** Số đọc cho giọng: số thập phân đọc "phẩy". */
const RD = (x) => readDec(clean(x));
const PC = (x) => `${D(x)}%`;
const PS = (x) => `${RD(x)} phần trăm`;
const big = (html) => `<span style="font-size:1.3em">${html}</span>`;
const F = (a, b) => fr(fmt(a), fmt(b));
/** Trộn cố định theo hạt (mount không có rng). */
function shuffleBy(arr, seed) {
  const a = [...arr];
  let s = Math.abs(Math.round(seed)) * 9301 + 49297;
  for (let i = a.length - 1; i > 0; i--) { s = (s * 9301 + 49297) % 233280; const j = Math.floor((s / 233280) * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
/** Phương án khác nhau (giữ đáp án đầu tiên). */
const uniq = (arr) => arr.filter((v, i) => arr.indexOf(v) === i);
/** Nút ✓ Xong cho câu tự làm trên công cụ. */
function doneBtn(f) {
  f.choicesBox.innerHTML = '<button type="button" class="g4-choice g4-choice-go">✓ Xong</button>';
  f.choicesBox.classList.add('g4-choices-on');
  return f.choicesBox.firstElementChild;
}

// ═══ Bài 36. Tỉ số. Tỉ số phần trăm ══════════════════════════════════════════════════════════════════
/** Một chiếc ô tô buýt nhìn ngang (đơn vị vẽ: dài w). */
function bus(x, y, w, color, electric) {
  const h = w * 0.5;
  return `<g><rect x="${x}" y="${y - h}" width="${w}" height="${h * 0.82}" rx="${w * 0.08}" fill="${color}" stroke="${INK}" stroke-width="3"/>
    ${[0, 1, 2, 3].map((k) => `<rect x="${x + w * (0.08 + k * 0.2)}" y="${y - h * 0.86}" width="${w * 0.15}" height="${h * 0.3}" rx="4" fill="#E0F2FE" stroke="${INK}" stroke-width="2"/>`).join('')}
    <circle cx="${x + w * 0.22}" cy="${y - h * 0.16}" r="${w * 0.09}" fill="#374151" stroke="${INK}" stroke-width="2"/><circle cx="${x + w * 0.78}" cy="${y - h * 0.16}" r="${w * 0.09}" fill="#374151" stroke="${INK}" stroke-width="2"/>
    ${electric ? `<path d="M${x + w * 0.52} ${y - h * 0.5} l${-w * 0.08} ${h * 0.2} h${w * 0.06} l${-w * 0.05} ${h * 0.18} l${w * 0.12} ${-h * 0.24} h${-w * 0.06} l${w * 0.04} ${-h * 0.14}z" fill="#FDE047" stroke="${INK}" stroke-width="1.5"/>` : `<rect x="${x + w * 0.44}" y="${y - h * 0.46}" width="${w * 0.12}" height="${h * 0.16}" rx="3" fill="#FED7AA" stroke="${INK}" stroke-width="1.5"/>`}</g>`;
}
/** Bến xe: kinds = mảng true (ô tô điện) / false (xăng). Trả về toạ độ để đánh số. */
function busStation(t, kinds) {
  const r = t.svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(1500, Math.max(380, (1000 * r.height) / r.width))) : 520;
  t.frame(0, 0, 1000, H);
  const tall = H > 820;
  const perRow = Math.min(4, kinds.length);
  const rows = Math.ceil(kinds.length / perRow);
  const w = Math.min(220, 940 / perRow - 14, ((H * 0.74 - H * 0.2) / rows) / 0.9);
  const rowH = w * 0.85;
  const y0 = H * 0.2;
  let g = `<rect x="0" y="0" width="1000" height="${H}" fill="#E0F2FE"/><rect x="0" y="${H * 0.78}" width="1000" height="${H * 0.22}" fill="#86EFAC"/>
    <rect x="20" y="${y0 - 30}" width="960" height="${rows * rowH + 50}" rx="16" fill="#F1F5F9" stroke="#94A3B8" stroke-width="3"/>
    <text x="500" y="${y0 - 42}" class="g4v-t" font-size="${Math.min(48, H / 12)}">BẾN XE BUÝT</text>`;
  const pos = kinds.map((e, i) => {
    const row = Math.floor(i / perRow), col = i % perRow;
    const inRow = Math.min(perRow, kinds.length - row * perRow);
    const x = 500 - (inRow * (w + 14)) / 2 + col * (w + 14) + 7;
    const y = y0 + (row + 1) * rowH;
    return { x, y, w, e };
  });
  pos.forEach((p, i) => { g += `<g class="b36-bus" data-i="${i}" style="cursor:pointer">${bus(p.x, p.y, p.w, p.e ? '#4ADE80' : '#FB923C', p.e)}</g>`; });
  t.draw(g);
  return pos;
}

const B36 = {
  explore: {
    setup: (board) => createCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        const kinds = [false, true, false, false, true, false, true];
        const pos = busStation(t, kinds);
        t.caption('Bến có <b>7</b> ô tô. Ô tô điện có tia sét ⚡');
        await c.say('Ở bến xe buýt có 7 ô tô. Ô tô màu xanh lá chạy bằng điện, ô tô màu cam chạy bằng xăng.');
        await c.say('Em bấm vào từng ô tô điện để đếm.', 'Bấm vào từng <b>ô tô điện</b> ⚡');
        let n = 0;
        const tapped = new Set();
        const mark1 = (i) => {
          if (tapped.has(i)) return;
          if (!kinds[i]) { c.hint('Ô tô này chạy bằng xăng. Tìm ô tô màu xanh lá có tia sét.'); sfx.boing?.(); return; }
          tapped.add(i); n++;
          const p = pos[i];
          t.add(`<g><circle cx="${p.x + p.w / 2}" cy="${p.y - p.w * 0.72}" r="${p.w * 0.17}" fill="#16A34A" stroke="#fff" stroke-width="4"/><text x="${p.x + p.w / 2}" y="${p.y - p.w * 0.72 + p.w * 0.07}" class="g4v-t" font-size="${p.w * 0.2}" fill="#fff">${n}</text></g>`);
          sfx.pop(n);
          t.emit('tap');
        };
        t.svg.onclick = (e) => { const b = e.target.closest('.b36-bus'); if (b) mark1(+b.dataset.i); };
        await waitDo(c, t, () => n === 3, { nudge: 'Còn ô tô điện chưa bấm. Tìm ô tô xanh lá.' }, () => kinds.forEach((e, i) => e && mark1(i)));
        t.svg.onclick = null;
        t.caption(`Ô tô điện: <b>3</b> phần · cả bến: <b>7</b> phần`);
        await c.say('Số ô tô ở bến là 7 phần thì số ô tô điện là 3 phần như thế. Số ô tô điện bằng ba phần bảy số ô tô ở bến.');
        t.caption(`Tỉ số của số ô tô điện và số ô tô ở bến là <b>3 : 7</b> hay ${big(fr(3, 7))}`);
        await c.say('Ta nói: tỉ số của số ô tô điện và số ô tô ở bến là 3 chia 7, hay ba phần bảy.');
      },
      async (c) => {
        const t = c.use((b) => createRatio(b, { mode: 'plain', rows: [{ name: 'Ô tô điện', parts: 3 }, { name: 'Ô tô xăng', parts: 4 }], cap: 7 }));
        t.caption('Ô tô điện <b>3</b> phần · ô tô xăng <b>4</b> phần');
        await c.say('So sánh ô tô điện với ô tô xăng: ô tô điện 3 phần, ô tô xăng 4 phần.');
        await c.say('Tỉ số của số ô tô điện và số ô tô xăng là bao nhiêu?', 'Tỉ số của số <b>ô tô điện</b> và số <b>ô tô xăng</b>?');
        await c.choose([[3, 4], [4, 3], [3, 7]].map(([a, b]) => ({ html: big(fr(a, b)), value: `${a}/${b}` })), '3/4',
          { hint: (v) => (v === '4/3' ? 'Số nói trước (ô tô điện) đứng trên, làm tử số.' : 'Không so với cả bến, chỉ so với số ô tô xăng.') });
        t.caption(`Điện và xăng: <b>3 : 4</b> = ${fr(3, 4)}`);
        await c.say('Đúng rồi! Số nói trước là tử số: ba phần tư.');
        await c.say('Còn tỉ số của số ô tô xăng và số ô tô điện?', 'Tỉ số của số <b>ô tô xăng</b> và số <b>ô tô điện</b>?');
        await c.choose([[3, 4], [4, 3], [4, 7]].map(([a, b]) => ({ html: big(fr(a, b)), value: `${a}/${b}` })), '4/3', { hint: 'Lần này ô tô xăng nói trước, nên 4 là tử số.' });
        t.caption(`Xăng và điện: <b>4 : 3</b> = ${fr(4, 3)} · Tỉ số của a và b là <b>a : b</b> hay ${fr('a', 'b')} (b khác 0)`);
        await c.say('Tỉ số của a và b là a chia b, hay a phần b, với b khác 0. Đổi thứ tự thì tỉ số cũng đổi.');
      },
      async (c) => {
        const t = c.use((b) => createPct(b, { value: 0 }));
        await c.say('Rô-bốt hỏi 100 bạn khối 5 thích môn thể thao nào. Có 43 bạn chọn môn Bơi. Mỗi ô là một bạn. Em tô 43 ô.', 'Mỗi ô là 1 bạn. Tô <b>43 ô</b> (4 cột và 3 ô)');
        await waitDo(c, t, () => t.n === 43, {
          nudge: () => (t.n < 40 ? 'Mỗi cột có 10 ô. Bấm cộng 1 cột cho đủ 4 cột.' : 'Bấm cộng 1 ô cho đủ 43 ô.'),
          el: () => t.btn(t.n < 40 ? 10 : 1),
        }, () => t.set(43));
        t.lock(true);
        await c.say('Tỉ số của số bạn bơi và số bạn được khảo sát là bốn mươi ba phần một trăm. Tỉ số có mẫu số 100 gọi là tỉ số phần trăm, viết là 43 %, đọc là bốn mươi ba phần trăm.');
        await c.say('43 phần trăm cho biết điều gì?', '<b>43%</b> cho biết điều gì?');
        await c.choose([
          { html: 'Cứ 100 bạn thì có 43 bạn bơi', value: 1 },
          { html: 'Có 43 bạn được khảo sát', value: 2 },
          { html: 'Cứ 43 bạn thì có 100 bạn bơi', value: 3 },
        ], 1, { hint: '43% là 43 phần trăm: 43 phần trong 100 phần.' });
        await c.say('Đúng rồi! Cứ 100 bạn được khảo sát thì có 43 bạn tham gia môn Bơi.');
      },
      async (c) => {
        const t = c.use((b) => createPct(b, { value: 0, buttons: false, edit: false, note: (n) => (n ? `Mỗi phần 25 là <b>4</b> ô · ${n / 4} phần = <b>${n}</b> ô` : 'Chia 100 ô thành 25 phần, mỗi phần 4 ô') }));
        await c.say('Viết chín phần hai mươi lăm thành tỉ số phần trăm. Chia 100 ô thành 25 phần bằng nhau, mỗi phần 4 ô.', `${fr(9, 25)} = ${fr('?', 100)} = ?%`);
        await c.say('Nhân cả tử số và mẫu số với mấy để mẫu số thành 100?');
        await c.choose([2, 4, 5].map((k) => ({ html: `× ${k}`, value: k })), 4, { hint: '25 nhân mấy bằng 100?' });
        await t.fillTo(36, { gap: 90 });
        await c.say('Chín phần hai mươi lăm bằng ba mươi sáu phần một trăm, tức là 36 phần trăm.', `${fr(9, 25)} = ${fr('9 × 4', '25 × 4')} = ${fr(36, 100)} = <b>36%</b>`);
      },
      async (c) => {
        const t = c.use((b) => createPct(b, { grids: 2, value: 0, buttons: false, edit: false, color: '#60A5FA', note: (n) => `Cứ 100 bé gái thì có <b>${n}</b> bé trai` }));
        await c.say('Ở Hà Nội, sáu tháng đầu năm 2022, cứ 100 bé gái chào đời thì có 113 bé trai. Mỗi hình vuông là 100 ô.');
        await t.fillTo(113, { gap: 160 });
        await c.say('Tỉ số của số bé trai và số bé gái là bao nhiêu phần trăm?', 'Tỉ số phần trăm của số bé trai và số bé gái?');
        await c.choose(['113%', '13%', '100%'].map((v) => ({ html: v, value: v })), '113%', { hint: '113 phần 100 là 113 phần trăm.' });
        await c.say('Đúng rồi! 113 phần trăm. Tỉ số phần trăm có thể lớn hơn 100 phần trăm.');
      },
    ],
  },
  tasks: () => [task36Write(), task36Pick(), task36Shade(), task36ToPct(), task36Dec(), task36Rest(), task36Diagram()],
};

const PEOPLE = [
  ['bạn nữ', 'bạn nam', 'thi Trạng nguyên nhí', 'bạn tham gia'],
  ['quả cam', 'quả quýt', 'trong giỏ', 'quả trong giỏ'],
  ['cây bàng', 'cây phượng', 'trong sân trường', 'cây'],
  ['con gà', 'con vịt', 'trong trại', 'con'],
  ['bông hồng', 'bông cúc', 'trong lọ', 'bông hoa'],
];
/** Viết tỉ số: a và b, b và a, hoặc a và tổng. */
function task36Write() {
  return {
    id: 'r36-write',
    make: (rng) => { const k = rng.int(0, PEOPLE.length - 1); let a = rng.int(3, 15), b = rng.int(3, 15); while (b === a) b = rng.int(3, 15); return { k, a, b, v: rng.int(0, 2) }; },
    async mount(f, { k, a, b, v }) {
      mark('r36-write');
      const [A, B, ctx, G] = PEOPLE[k];
      const [n, d, what] = v === 0 ? [a, b, `số ${A} và số ${B}`] : v === 1 ? [b, a, `số ${B} và số ${A}`] : [a, a + b, `số ${A} và tổng số ${G}`];
      f.q.innerHTML = `<small>Có ${a} ${A} và ${b} ${B} ${ctx}.</small>Tỉ số của ${what} là ${big(fr(BOX, BOX))}`;
      const t = createRatio(f.tool, { mode: 'plain', rows: [{ name: A, parts: a }, { name: B, parts: b }], cap: 15 });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: n, max: 3, say: `Tỉ số của ${what}. Tử số là bao nhiêu?`, hint: 'Số nói trước trong "tỉ số của … và …" là tử số.' });
      await f.ask({ box: b2, answer: d, max: 3, hint: v === 2 ? `Tổng là ${a} + ${b}.` : 'Số nói sau là mẫu số.' });
      t.caption(`${n} : ${d} = ${fr(n, d)}`);
      f.finish({ ok: `Tỉ số là ${frSay(n, d)}.` });
    },
  };
}

/** Ba dải băng (lớp, số bạn), dài theo số bạn. */
function ribbons(t, names, v) {
  const r = t.svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(1500, Math.max(360, (1000 * r.height) / r.width))) : 520;
  t.frame(0, 0, 1000, H);
  const slot = (H - 20) / 3, h = Math.min(slot * 0.62, 130), max = Math.max(...v);
  const cols = ['#60A5FA', '#F472B6', '#FBBF24'];
  t.draw(names.map((nm, i) => {
    const y = 10 + slot * i + (slot - h) / 2, w = 200 + (560 * v[i]) / max;
    return `<rect class="rb${i}" x="${500 - w / 2}" y="${y}" width="${w}" height="${h}" rx="${h * 0.2}" fill="${cols[i]}" stroke="${INK}" stroke-width="3"/>
      <text x="500" y="${y + h / 2 + h * 0.17}" class="g4v-t" font-size="${h * 0.48}" fill="#fff" style="paint-order:stroke;stroke:${INK};stroke-width:5px">Lớp ${nm}: ${v[i]} bạn</text>`;
  }).join(''));
}

/** Tỉ số đã cho ứng với cặp nào (3 lớp). */
function task36Pick() {
  return {
    id: 'r36-pick',
    make: (rng) => { const v = rng.shuffle([rng.int(12, 20), rng.int(21, 28), rng.int(29, 36)]); return { v, i: rng.int(0, 2), j: rng.int(1, 2) }; },
    async mount(f, { v, i, j }) {
      mark('r36-pick');
      const names = ['5A', '5B', '5C'];
      const jj = (i + j) % 3;
      f.q.innerHTML = `<small>Lớp 5A có ${v[0]} bạn, 5B có ${v[1]} bạn, 5C có ${v[2]} bạn đi nhặt rác.</small>Tỉ số ${big(fr(v[i], v[jj]))} là tỉ số của số bạn:`;
      const t = createCanvas(f.tool);
      ribbons(t, names, v);
      const opts = [[i, jj], [jj, i], [i, 3 - i - jj], [3 - i - jj, jj]].map(([p, q]) => `${names[p]} và ${names[q]}`);
      await f.choose({ options: shuffleBy(opts, v[0] + v[1]).map((o) => ({ html: o, value: o })), answer: opts[0], say: `Tỉ số ${frSay(v[i], v[jj])} là tỉ số của số bạn lớp nào và lớp nào?`,
        hint: (o) => (o === opts[1] ? 'Đảo thứ tự rồi. Tử số là số nói trước.' : `Tử số ${v[i]} là số bạn lớp nào? Mẫu số ${v[jj]} là lớp nào?`) });
      t.qa(`.rb${i}, .rb${jj}`).forEach((e) => e.setAttribute('stroke-width', 8));
      f.finish({ ok: `${v[i]} bạn lớp ${names[i]}, ${v[jj]} bạn lớp ${names[jj]}.` });
    },
  };
}

/** Tô k% lưới. */
function task36Shade() {
  return {
    id: 'r36-shade',
    make: (rng) => ({ n: rng.int(7, 93) }),
    mount(f, { n }) {
      mark('r36-shade');
      f.q.innerHTML = `Tô màu <b>${n}%</b> hình vuông rồi bấm <b>Xong</b>`;
      const t = createPct(f.tool, { value: 0 });
      t.root.querySelector('.g5g-read').style.visibility = 'hidden';
      f.say(`Tô màu ${PS(n)} hình vuông.`, `Tô màu <b>${n}%</b> hình vuông.`);
      const btn = doneBtn(f);
      if (import.meta.env.DEV) window.__g4solve = () => { t.set(n); btn.click(); };
      btn.onclick = () => {
        sfx.tap();
        t.root.querySelector('.g5g-read').style.visibility = '';
        if (t.n === n) { btn.disabled = true; btn.classList.add('g4-choice-ok'); t.lock(true); f.finish({ ok: `${n}% là ${n} ô trong 100 ô.` }); return; }
        f.mistakes++;
        f.hint(`Em đã tô ${t.n} ô. ${n} phần trăm là ${n} ô trong 100 ô.`, `Em đã tô <b>${t.n}</b> ô. Cần <b>${n}</b> ô: ${Math.floor(n / 10)} cột và ${n % 10} ô.`);
      };
    },
  };
}

/** Phân số → tỉ số phần trăm (mẫu là ước hoặc bội của 100). */
function task36ToPct() {
  return {
    id: 'r36-topct',
    make: (rng) => {
      const d = rng.pick([2, 4, 5, 10, 20, 25, 50, 200, 300, 400, 500]);
      let a;
      if (d <= 100) a = rng.int(1, d - 1); else { const p = rng.int(1, 19); a = (p * d) / 100; if (!Number.isInteger(a)) a = (rng.int(1, 9) * d) / 100; }
      return { a, d };
    },
    async mount(f, { a, d }) {
      mark('r36-topct');
      const p = clean((a * 100) / d);
      const k = d <= 100 ? 100 / d : null;
      f.q.innerHTML = `${big(F(a, d))} = ${big(fr(BOX, 100))} = ${BOX} %`;
      const t = createPct(f.tool, { value: 0, buttons: false, edit: false });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: p, max: 3, say: `Viết ${frSay(a, d)} thành phân số có mẫu số 100.`,
        hint: k ? `Nhân cả tử số và mẫu số với ${k}.` : `Chia cả tử số và mẫu số cho ${d / 100}.` });
      await t.fillTo(p, { gap: 60 });
      await f.ask({ box: b2, answer: p, max: 3, hint: `${p} phần 100 là ${p} phần trăm.` });
      f.finish({ ok: `${frSay(a, d)} bằng ${PS(p)}.` });
    },
  };
}

/** a : 100 = a% (có phần thập phân, có thể lớn hơn 100). */
function task36Dec() {
  return {
    id: 'r36-dec',
    make: (rng) => { const v = rng.int(0, 2); const x = v === 0 ? rng.int(1, 99) + rng.int(1, 9) / 10 : v === 1 ? rng.int(101, 130) + rng.int(1, 9) / 10 : rng.int(1, 9) / 10; return { x: clean(x) }; },
    async mount(f, { x }) {
      mark('r36-dec');
      f.q.innerHTML = `${big(`${D(x)} : 100`)} = ${BOX} %`;
      const t = createPct(f.tool, { grids: x > 100 ? 2 : 1, value: Math.floor(x), buttons: false, edit: false, note: () => `Phần thập phân vẫn giữ nguyên: <b>${D(x)}%</b>` });
      t.root.querySelector('.g5g-read').style.visibility = 'hidden';
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(x), max: 6, say: `${RD(x)} chia 100 bằng bao nhiêu phần trăm?`,
        hint: (v) => (Math.abs(v - x / 100) < 1e-9 || Math.abs(v - x * 10) < 1e-9 ? 'Giữ nguyên số, chỉ viết thêm kí hiệu phần trăm.' : `${D(x)} : 100 viết là ${D(x)}%.`) });
      t.root.querySelector('.g5g-read').style.visibility = '';
      f.finish({ ok: `${D(x)} : 100 = ${PC(x)}` });
    },
  };
}

/** Kiểm tra 100 / N thứ: đạt k → không đạt bao nhiêu %. */
function task36Rest() {
  const CTX = [['ô tô qua trạm cân', 'xe', 'đạt chuẩn', 'không đạt chuẩn'], ['quả trứng ấp', 'quả', 'nở thành gà con', 'không nở'], ['hạt giống', 'hạt', 'nảy mầm', 'không nảy mầm'], ['bạn', 'bạn', 'biết bơi', 'chưa biết bơi']];
  return {
    id: 'r36-rest',
    make: (rng) => ({ k: rng.int(0, CTX.length - 1), n: rng.int(55, 97) }),
    async mount(f, { k, n }) {
      mark('r36-rest');
      const [thing, unitW, good, bad] = CTX[k];
      const cap1 = (s) => s[0].toUpperCase() + s.slice(1);
      f.q.innerHTML = `<small>Kiểm tra 100 ${thing}, có ${n} ${unitW} ${good}.</small>${cap1(good)}: ${BOX} % · ${bad}: ${BOX} %`;
      const t = createPct(f.tool, { value: n, buttons: false, edit: false });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: n, max: 3, say: `Có bao nhiêu phần trăm ${good}?`, hint: `${n} trong 100 là ${n} phần trăm.` });
      await f.ask({ box: b2, answer: 100 - n, max: 3, say: `Có bao nhiêu phần trăm ${bad}?`, hint: `Cả 100 ${unitW} là 100%. Lấy 100% trừ ${n}%.` });
      t.mode({ note: () => `Ô trắng: <b>${100 - n}</b> ô = <b>${100 - n}%</b>` });
      f.finish({ ok: `${n}% và 100% − ${n}% = ${100 - n}%.` });
    },
  };
}

/** Đọc tỉ số từ sơ đồ phần. */
function task36Diagram() {
  return {
    id: 'r36-diag',
    make: (rng) => { let a = rng.int(2, 7), b = rng.int(2, 8); while (gcd(a, b) !== 1 || a === b) { a = rng.int(2, 7); b = rng.int(2, 8); } return { a, b, rev: rng.int(0, 1) }; },
    async mount(f, { a, b, rev }) {
      mark('r36-diag');
      const [P, Q] = rev ? ['Số thứ hai', 'Số thứ nhất'] : ['Số thứ nhất', 'Số thứ hai'];
      const [n, d] = rev ? [b, a] : [a, b];
      f.q.innerHTML = `Tỉ số của <b>${P.toLowerCase()}</b> và <b>${Q.toLowerCase()}</b> là:`;
      createRatio(f.tool, { mode: 'plain', rows: [{ name: 'Số thứ nhất', parts: a }, { name: 'Số thứ hai', parts: b }], cap: 8 });
      const opts = uniq([`${n}/${d}`, `${d}/${n}`, `${n}/${n + d}`, `${d}/${n + d}`]);
      await f.choose({ options: shuffleBy(opts, a * 7 + b).map((o) => ({ html: big(fr(...o.split('/'))), value: o })), answer: `${n}/${d}`, say: `Tỉ số của ${P.toLowerCase()} và ${Q.toLowerCase()} là bao nhiêu?`,
        hint: (o) => (o === `${d}/${n}` ? 'Đảo thứ tự rồi. Số nói trước là tử số.' : 'Không lấy tổng. So số phần của số này với số phần của số kia.') });
      f.finish({ ok: `${n} phần so với ${d} phần: ${frSay(n, d)}.` });
    },
  };
}

// ═══ Bài 37. Tỉ lệ bản đồ và ứng dụng ═══════════════════════════════════════════════════════════════
/** cm → đơn vị đẹp nhất (m khi dưới 1 km, km khi từ 1 km). */
const UF = { cm: 1, m: 100, km: 100000 };
const UW = { cm: 'xăng-ti-mét', m: 'mét', km: 'ki-lô-mét' };
const fmtU = (cm, u) => `${D(cm / UF[u])} ${u}`;
/** Các dòng tính độ dài thật. */
const realLines = (map, scale, u) => [`${D(map)} × ${fmt(scale)} = ${fmt(clean(map * scale))} (cm)`, `${fmt(clean(map * scale))} cm = ${fmtU(map * scale, u)}`];
const mapLines = (realCm, scale, u) => [`${fmtU(realCm, u)} = ${fmt(realCm)} cm`, `${fmt(realCm)} : ${fmt(scale)} = ${D(realCm / scale)} (cm)`];
/** Khung vẽ theo tỉ lệ chỗ trống (rộng 1000). */
function frameH(t) {
  const r = t.svg.getBoundingClientRect();
  const H = r.width > 10 && r.height > 10 ? Math.round(Math.min(1400, Math.max(360, (1000 * r.height) / r.width))) : 520;
  t.frame(0, 0, 1000, H);
  return H;
}

const B37 = {
  explore: {
    setup: (board) => createMap(board, { scale: 1000, ab: 6, scene: 'park', measure: true, what: 'Vườn hoa' }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Bản đồ công viên · <b>TỈ LỆ 1 : 1 000</b>');
        await c.say('Đây là bản đồ một công viên. Góc bản đồ ghi tỉ lệ 1 : 1 000. Đó là tỉ lệ bản đồ.');
        await c.say('Tỉ lệ 1 : 1 000 cho biết công viên được vẽ thu nhỏ 1 000 lần. 1 xăng-ti-mét trên bản đồ ứng với 1 000 xăng-ti-mét thật, tức là 10 mét.', '1 cm trên bản đồ ứng với <b>1 000 cm</b> = 10 m thật');
        await c.say('Em kéo chấm đỏ trên thước để đo chiều dài vườn hoa, từ A đến B.', 'Kéo chấm đỏ từ <b>A</b> tới <b>B</b> để đo');
        await waitDo(c, t, () => t.tape === 6, { nudge: () => (t.tape < 6 ? 'Kéo chấm đỏ sang phải, tới điểm B.' : 'Quá điểm B rồi. Kéo lùi lại.'), el: () => t.q('.mp-h') }, () => t.measureTo(6));
        t.lock(true);
        await c.say('Trên bản đồ, AB dài 6 xăng-ti-mét.', 'Trên bản đồ AB = <b>6 cm</b>');
      },
      async (c) => {
        const t = c.t;
        await c.say('Chiều dài thật của vườn hoa là bao nhiêu? Chọn phép tính.', 'Độ dài thật = ?');
        await c.choose([{ html: '6 × 1 000', value: 1 }, { html: '6 : 1 000', value: 2 }, { html: '6 + 1 000', value: 3 }], 1, { hint: 'Hình vẽ thu nhỏ 1 000 lần, nên độ dài thật gấp 1 000 lần.' });
        await t.lines(['6 × 1 000 = 6 000 (cm)']);
        await c.say('6 nhân 1 000 bằng 6 000 xăng-ti-mét. Đổi ra mét.', '6 000 cm = ? m');
        await c.choose(['6 m', '60 m', '600 m'].map((v) => ({ html: v, value: v })), '60 m', { hint: '1 mét bằng 100 xăng-ti-mét. Bỏ đi hai chữ số 0.' });
        await t.lines(['6 × 1 000 = 6 000 (cm)', '6 000 cm = 60 m']);
        await c.say('Đúng rồi! 6 000 xăng-ti-mét bằng 60 mét. Chiều dài thật của vườn hoa là 60 mét.', 'Chiều dài thật: <b>60 m</b>');
      },
      async (c) => {
        const t = c.use((b) => createMap(b, { scale: 1000, ab: 5, scene: 'route', tape: 0, hideB: true, names: ['M', 'N'] }));
        t.caption('Khu vui chơi rộng <b>50 m</b> · TỈ LỆ 1 : 1 000');
        await c.say('Ngược lại: khu vui chơi thật rộng 50 mét. Trên bản đồ tỉ lệ 1 : 1 000, đoạn MN dài bao nhiêu xăng-ti-mét?');
        await c.say('Trước hết đổi 50 mét ra xăng-ti-mét.', '50 m = ? cm');
        await c.choose(['500 cm', '5 000 cm', '50 000 cm'].map((v) => ({ html: v, value: v })), '5 000 cm', { hint: '1 m = 100 cm. 50 nhân 100.' });
        await t.lines(['50 m = 5 000 cm']);
        await c.say('Trên bản đồ hình vẽ nhỏ đi 1 000 lần. Chọn phép tính.', 'Trên bản đồ = ?');
        await c.choose([{ html: '5 000 × 1 000', value: 1 }, { html: '5 000 : 1 000', value: 2 }], 2, { hint: 'Trên bản đồ thì ngắn hơn, nên chia.' });
        await t.lines(['50 m = 5 000 cm', '5 000 : 1 000 = 5 (cm)']);
        t.showB();
        await t.measureTo(5);
        await c.say('5 000 chia 1 000 bằng 5. Trên bản đồ, MN dài 5 xăng-ti-mét.', 'Trên bản đồ MN = <b>5 cm</b>');
      },
      async (c) => {
        const t = c.use((b) => createMap(b, { scale: 10000000, ab: 5, scene: 'route', measure: true, names: ['Đà Nẵng', 'Nha Trang'] }));
        t.caption('Đường sắt Đà Nẵng · Nha Trang · <b>TỈ LỆ 1 : 10 000 000</b>');
        await c.say('Trên bản đồ tỉ lệ 1 : 10 000 000, em đo đường sắt từ ga Đà Nẵng đến ga Nha Trang.', 'Kéo chấm đỏ để đo');
        await waitDo(c, t, () => t.tape === 5, { nudge: 'Kéo chấm đỏ tới ga Nha Trang.', el: () => t.q('.mp-h') }, () => t.measureTo(5));
        t.lock(true);
        await t.lines(['5 × 10 000 000', '= 50 000 000 (cm)']);
        await c.say('5 nhân 10 triệu bằng 50 triệu xăng-ti-mét. Bằng bao nhiêu ki-lô-mét?', '50 000 000 cm = ? km');
        await c.choose(['50 km', '500 km', '5 000 km'].map((v) => ({ html: v, value: v })), '500 km', { hint: '1 km = 100 000 cm. Bỏ đi năm chữ số 0.' });
        await t.lines(['5 × 10 000 000', '= 50 000 000 (cm)', '50 000 000 cm = 500 km']);
        await c.say('Đúng rồi! 1 ki-lô-mét bằng 100 000 xăng-ti-mét. Quãng đường thật dài 500 ki-lô-mét.', 'Độ dài thật: <b>500 km</b>');
      },
    ],
  },
  tasks: () => [task37Real(), task37ToMap(), task37Measure(), task37Meaning(), task37Convert(), task37Bigger()],
};

/** Tỉ lệ và đơn vị hợp lí: nhỏ → m, lớn → km. */
const SCALES = [[500, 'm'], [1000, 'm'], [2000, 'm'], [5000, 'm'], [10000, 'km'], [500000, 'km'], [1000000, 'km'], [10000000, 'km']];
const ROUTES = [['Hà Nội', 'Hải Phòng'], ['Huế', 'Đà Nẵng'], ['Cần Thơ', 'Cà Mau'], ['Lạng Sơn', 'Hà Nội'], ['Vinh', 'Hà Tĩnh']];

function task37Real() {
  return {
    id: 'r37-real',
    make: (rng) => { const [scale, u] = rng.pick(SCALES); const map = rng.int(2, 9) + (rng() < 0.3 ? 0.5 : 0); return { scale, u, map, r: rng.int(0, ROUTES.length - 1) }; },
    async mount(f, { scale, u, map, r }) {
      mark('r37-real');
      const real = clean((map * scale) / UF[u]);
      const far = scale >= 10000;
      f.q.innerHTML = `Tỉ lệ <b>1 : ${fmt(scale)}</b>, AB đo được ${D(map)} cm. Độ dài thật: ${BOX} ${u}`;
      const t = createMap(f.tool, { scale, ab: map, scene: far ? 'route' : 'park', names: far ? ROUTES[r] : ['A', 'B'], what: far ? '' : 'Bể bơi' });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(real), max: 8, say: `Bản đồ tỉ lệ 1 phần ${fmt(scale)}. Trên bản đồ dài ${RD(map)} xăng-ti-mét. Độ dài thật là bao nhiêu ${UW[u]}?`,
        hint: (v) => (Math.abs(v - map * scale) < 1e-6 ? `Đó là xăng-ti-mét. Đổi ra ${UW[u]}.` : Math.abs(v * scale - map) < 1e-6 ? 'Độ dài thật dài hơn, phải nhân.' : `Lấy ${D(map)} × ${fmt(scale)} rồi đổi xăng-ti-mét ra ${UW[u]}.`) });
      await t.lines(realLines(map, scale, u));
      f.finish({ ok: `${D(map)} × ${fmt(scale)} = ${fmt(clean(map * scale))} cm = ${D(real)} ${u}` });
    },
  };
}

function task37ToMap() {
  return {
    id: 'r37-tomap',
    make: (rng) => { const [scale, u] = rng.pick(SCALES.filter(([s]) => s !== 500)); return { scale, u, map: rng.int(2, 9), r: rng.int(0, ROUTES.length - 1) }; },
    async mount(f, { scale, u, map, r }) {
      mark('r37-tomap');
      const realCm = map * scale;
      f.q.innerHTML = `Độ dài thật <b>${fmtU(realCm, u)}</b>, tỉ lệ <b>1 : ${fmt(scale)}</b>. Trên bản đồ: ${BOX} cm`;
      const t = createMap(f.tool, { scale, ab: map, scene: 'route', names: scale >= 10000 ? ROUTES[r] : ['A', 'B'], tape: 0, hideB: true });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: map, max: 3, say: `Độ dài thật ${RD(realCm / UF[u])} ${UW[u]}. Trên bản đồ tỉ lệ 1 phần ${fmt(scale)} dài bao nhiêu xăng-ti-mét?`,
        hint: `Đổi ${fmtU(realCm, u)} ra xăng-ti-mét rồi chia cho ${fmt(scale)}.` });
      await t.lines(mapLines(realCm, scale, u));
      t.showB();
      await t.measureTo(map, 600);
      f.finish({ ok: `${fmt(realCm)} : ${fmt(scale)} = ${map} cm` });
    },
  };
}

function task37Measure() {
  return {
    id: 'r37-measure',
    make: (rng) => { const [scale, u] = rng.pick(SCALES.filter(([s]) => s <= 10000)); return { scale, u, map: rng.int(3, 8) }; },
    async mount(f, { scale, u, map }) {
      mark('r37-measure');
      const real = clean((map * scale) / UF[u]);
      f.q.innerHTML = `Kéo chấm đỏ đo AB: ${BOX} cm · Độ dài thật: ${BOX} ${u}`;
      const t = createMap(f.tool, { scale, ab: map, scene: 'park', measure: true, what: 'Sân bóng' });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: map, max: 2, say: 'Kéo chấm đỏ trên thước để đo đoạn AB, rồi ghi số xăng-ti-mét.', hint: 'Kéo chấm đỏ tới điểm B, đọc số trên thước.' });
      t.lock(true);
      if (t.tape !== map) await t.measureTo(map, 500);
      await f.ask({ box: b2, answer: decKey(real), max: 6, say: `Tỉ lệ 1 phần ${fmt(scale)}. Độ dài thật là bao nhiêu ${UW[u]}?`, hint: `${map} × ${fmt(scale)} xăng-ti-mét, rồi đổi ra ${UW[u]}.` });
      await t.lines(realLines(map, scale, u));
      f.finish({ ok: `${map} × ${fmt(scale)} = ${fmt(map * scale)} cm = ${D(real)} ${u}` });
    },
  };
}

function task37Meaning() {
  return {
    id: 'r37-mean',
    make: (rng) => ({ s: rng.pick([300, 500, 1000, 2000, 5000, 10000, 100000]) }),
    async mount(f, { s }) {
      mark('r37-mean');
      f.q.innerHTML = `Tỉ lệ bản đồ <b>1 : ${fmt(s)}</b>: 1 cm trên bản đồ ứng với độ dài thật là:`;
      createMap(f.tool, { scale: s, ab: 1, scene: 'route' });
      const opts = [`${fmt(s)} cm`, `${fmt(s)} m`, `${fmt(s)} km`, `${fmt(s / 10)} cm`];
      await f.choose({ options: shuffleBy(opts, s / 100).map((o) => ({ html: o, value: o })), answer: opts[0], say: `Tỉ lệ 1 phần ${fmt(s)}. 1 xăng-ti-mét trên bản đồ ứng với bao nhiêu thật?`,
        hint: 'Hình thu nhỏ bao nhiêu lần thì 1 cm trên bản đồ ứng với bấy nhiêu xăng-ti-mét thật.' });
      f.finish({ ok: `1 cm trên bản đồ ứng với ${fmt(s)} cm thật${s % 100 === 0 ? ` = ${fmt(s / 100)} m` : ''}.` });
    },
  };
}

/** Bước đổi đơn vị: x cm = ? m / km (đếm chữ số 0). */
function task37Convert() {
  return {
    id: 'r37-conv',
    make: (rng) => { const u = rng.pick(['m', 'km', 'km']); const v = u === 'm' ? rng.int(2, 99) * rng.pick([1, 10]) : rng.int(1, 9) * rng.pick([1, 10, 100]) + (rng() < 0.3 ? 0.5 : 0); return { u, v: clean(v), rev: rng.int(0, 1) }; },
    async mount(f, { u, v, rev }) {
      mark('r37-conv');
      const cm = clean(v * UF[u]);
      f.q.innerHTML = rev ? `${big(`${D(v)} ${u}`)} = ${BOX} cm` : `${big(`${fmt(cm)} cm`)} = ${BOX} ${u}`;
      const t = createCanvas(f.tool);
      unitStairs(t, u);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: rev ? cm : decKey(v), max: 10, say: rev ? `${RD(v)} ${UW[u]} bằng bao nhiêu xăng-ti-mét?` : `${fmt(cm)} xăng-ti-mét bằng bao nhiêu ${UW[u]}?`,
        hint: u === 'm' ? '1 m = 100 cm: hai chữ số 0.' : '1 km = 100 000 cm: năm chữ số 0.' });
      f.finish({ ok: `${fmt(cm)} cm = ${D(v)} ${u}` });
    },
  };
}
/** Bậc thang đơn vị km → cm, mỗi bậc × 10; tô các bậc cần đi. */
function unitStairs(t, u) {
  const H = frameH(t);
  const U = ['km', 'hm', 'dam', 'm', 'dm', 'cm'];
  const from = U.indexOf(u), w = 150, h = Math.min(110, H / 5);
  let g = '';
  U.forEach((nm, i) => {
    const x = 50 + i * w, y = 30 + i * ((H - 60 - h) / 5);
    const on = i >= from;
    g += `<rect x="${x}" y="${y}" width="${w - 14}" height="${h}" rx="14" fill="${on ? '#FDE68A' : '#F1F5F9'}" stroke="${INK}" stroke-width="3"/>
      <text x="${x + (w - 14) / 2}" y="${y + h * 0.66}" class="g4v-t" font-size="${h * 0.5}">${nm}</text>`;
    if (i > from) g += `<text x="${x - 8}" y="${y - 8}" class="g4v-t" font-size="${h * 0.32}" fill="#DC2626">× 10</text>`;
  });
  g += `<text x="950" y="${H - 20}" class="g4v-t" font-size="${Math.min(46, H / 10)}" fill="#DC2626" style="text-anchor:end">1 ${u} = ${fmt(UF[u])} cm</text>`;
  t.draw(g);
}

/** Hai bản đồ cùng vẽ một sân: bản đồ nào vẽ to hơn. */
function task37Bigger() {
  return {
    id: 'r37-big',
    make: (rng) => { const a = rng.pick([500, 1000, 2000]); const k = rng.pick([2, 4, 5]); return { a, b: a * k }; },
    async mount(f, { a, b }) {
      mark('r37-big');
      f.q.innerHTML = `Cùng vẽ một sân trường trên hai bản đồ tỉ lệ <b>1 : ${fmt(a)}</b> và <b>1 : ${fmt(b)}</b>. Bản đồ nào vẽ sân to hơn?`;
      const t = createCanvas(f.tool);
      const H = frameH(t);
      const card = (x, s) => `<rect x="${x}" y="20" width="440" height="${H - 40}" rx="20" fill="#DCFCE7" stroke="#A3A3A3" stroke-width="3"/>
        <text x="${x + 220}" y="${H - 40}" class="g4v-t" font-size="40">1 : ${fmt(s)}</text><text class="b37-q" x="${x + 220}" y="${H / 2}" font-size="90" fill="#94A3B8" text-anchor="middle" font-weight="800">?</text>`;
      t.draw(card(30, a) + card(530, b));
      await f.choose({ options: [{ html: `Tỉ lệ 1 : ${fmt(a)}`, value: 'a' }, { html: `Tỉ lệ 1 : ${fmt(b)}`, value: 'b' }], answer: 'a', say: 'Bản đồ nào vẽ sân trường to hơn?',
        hint: `1 : ${fmt(b)} nghĩa là thu nhỏ ${fmt(b)} lần, nhỏ hơn nhiều.` });
      const k = b / a, w1 = Math.min(380, (H - 140) * 1.4), h1 = w1 / 1.6;
      t.qa('.b37-q').forEach((e) => e.remove());
      t.add(`<rect class="b37-s" x="${250 - w1 / 2}" y="${(H - 60 - h1) / 2}" width="${w1}" height="${h1}" fill="#86EFAC" stroke="#15803D" stroke-width="4"/>`);
      t.add(`<rect class="b37-s" x="${750 - w1 / k / 2}" y="${(H - 60 - h1 / k) / 2}" width="${w1 / k}" height="${h1 / k}" fill="#86EFAC" stroke="#15803D" stroke-width="3"/>`);
      t.qa('.b37-s').forEach((e) => { e.style.transformBox = 'fill-box'; e.style.transformOrigin = 'center'; });
      await t.anim('.b37-s', [{ transform: 'scale(0)' }, { transform: 'none' }], 500, { stagger: 250 });
      f.finish({ ok: `Thu nhỏ ít lần hơn thì hình to hơn: tỉ lệ 1 : ${fmt(a)} vẽ sân dài gấp ${k} lần.` });
    },
  };
}

// ═══ Bài 38. Tìm hai số khi biết tổng và tỉ số ══════════════════════════════════════════════════════
/** Bài toán tổng tỉ: [tên số thứ nhất, tên số thứ hai, đơn vị, câu mở đầu (tổng)]. Số thứ nhất = a/b số thứ hai. */
const SUMCTX = [
  ['Lớp 5A', 'Lớp 5B', 'quyển', (T) => `Hai lớp quyên góp ${fmt(T)} quyển lịch cũ`],
  ['Bò khoang', 'Bò vàng', 'con', (T) => `Trang trại có ${fmt(T)} con bò khoang và bò vàng`],
  ['Lên dốc', 'Xuống dốc', 'm', (T) => `Quãng đường dài ${fmt(T)} m gồm đoạn lên dốc và xuống dốc`],
  ['Gà', 'Vịt', 'con', (T) => `Trại có ${fmt(T)} con gà và vịt`],
  ['Thỏ', 'Rùa', 'cây nấm', (T) => `Thỏ và Rùa hái ${fmt(T)} cây nấm`],
  ['Đội Một', 'Đội Hai', 'cây', (T) => `Hai đội trồng ${fmt(T)} cây`],
];
const sumGen = (rng, { gt1 = false } = {}) => {
  let a, b;
  do { a = rng.int(1, 9); b = rng.int(1, 9); } while (a === b || gcd(a, b) !== 1 || (gt1 ? a <= b : a >= b) || a + b > 15);
  const one = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 20, 25, 40, 50, 100, 200]);
  return { a, b, one, k: rng.int(0, SUMCTX.length - 1) };
};
const low = (s) => s[0].toLowerCase() + s.slice(1);

const B38 = {
  explore: {
    setup: (board) => createRatio(board, { mode: 'sum', edit: true, rows: [{ name: 'Lớp 5A', parts: 1 }, { name: 'Lớp 5B', parts: 1 }], cap: 10 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption(`Hai lớp góp <b>60</b> quyển lịch · 5A = ${fr(7, 8)} 5B`);
        await c.say('Lớp 5A và lớp 5B quyên góp được 60 quyển lịch cũ. Số lịch của lớp 5A bằng bảy phần tám số lịch của lớp 5B. Mỗi lớp góp bao nhiêu quyển?');
        await c.say('Vẽ sơ đồ: số lịch lớp 5B chia làm 8 phần bằng nhau thì lớp 5A là 7 phần như thế. Bấm dấu cộng để thêm phần.', '5B: <b>8 phần</b> · 5A: <b>7 phần</b>. Bấm <b>+</b>');
        await waitDo(c, t, () => t.parts(0) === 7 && t.parts(1) === 8, {
          nudge: () => (t.parts(1) !== 8 ? 'Dòng lớp 5B cần 8 phần.' : 'Dòng lớp 5A cần 7 phần.'),
          el: () => t.q(`.rt-btn[data-i="${t.parts(1) !== 8 ? 1 : 0}"][data-d="${t.parts(1) !== 8 ? (t.parts(1) < 8 ? 1 : -1) : (t.parts(0) < 7 ? 1 : -1)}"]`),
        }, () => t.set({ rows: [{ parts: 7 }, { parts: 8 }] }));
        t.set({ edit: false, cap: 8, label: '60 quyển', rows: [{ over: '?' }, { over: '?' }] });
        await c.say('Ngoặc bên phải ôm cả hai dòng: tổng là 60 quyển.', 'Ta có sơ đồ');
      },
      async (c) => {
        const t = c.t;
        await c.say('Tổng số phần bằng nhau là bao nhiêu? Đếm cùng thầy.', 'Tổng số phần = ?');
        await t.countParts('all', { gap: 260 });
        await c.choose([{ html: '7 + 8 = 15 (phần)', value: 1 }, { html: '8 − 7 = 1 (phần)', value: 2 }, { html: '8 (phần)', value: 3 }], 1, { hint: 'Tổng 60 quyển ứng với tất cả các phần của cả hai dòng.' });
        t.caption('Tổng số phần: 7 + 8 = <b>15</b> (phần)');
        await c.say('Tổng số phần bằng nhau là 7 cộng 8 bằng 15 phần.');
      },
      async (c) => {
        const t = c.t;
        await c.say('60 quyển chia đều cho 15 phần. Mỗi phần là bao nhiêu quyển?', '1 phần = 60 : 15 = ?');
        await c.choose(['3', '4', '5'].map((v) => ({ html: v, value: v })), '4', { hint: '15 nhân mấy bằng 60?' });
        await t.fillOne('4');
        t.caption('1 phần: 60 : 15 = <b>4</b> (quyển)');
        await c.say('Mỗi phần là 4 quyển.');
      },
      async (c) => {
        const t = c.t;
        await c.say('Lớp 5A có 7 phần. Chọn phép tính số lịch lớp 5A.', 'Lớp 5A = ?');
        await c.choose([{ html: '60 : 15 × 7', value: 1 }, { html: '60 : 15 × 8', value: 2 }, { html: '60 : 7', value: 3 }], 1, { hint: 'Lớp 5A là 7 phần, mỗi phần 60 : 15.' });
        await t.over(0, '28');
        await c.say('60 chia 15 nhân 7 bằng 28. Lớp 5A góp 28 quyển.', 'Lớp 5A: 60 : 15 × 7 = <b>28</b> (quyển)');
        await c.say('Lớp 5B góp bao nhiêu quyển?', 'Lớp 5B = ?');
        await c.choose([{ html: '60 − 28 = 32', value: 1 }, { html: '60 + 28 = 88', value: 2 }, { html: '28 − 4 = 24', value: 3 }], 1, { hint: 'Tổng là 60, lớp 5A đã có 28.' });
        await t.over(1, '32');
        t.caption('Lớp 5A: <b>28</b> quyển · Lớp 5B: 60 − 28 = <b>32</b> quyển');
        await c.say('Lớp 5B góp 60 trừ 28 bằng 32 quyển. Thử lại: 28 cộng 32 bằng 60.');
      },
      async (c) => {
        const t = c.use((b) => createRatio(b, { mode: 'sum', rows: [{ name: '75 inch', parts: 1 }, { name: '55 inch', parts: 3 }], cap: 3, label: '36 chiếc', ask: true }));
        t.caption('<b>36</b> chiếc ti vi · số ti vi 55 inch <b>gấp 3 lần</b> số ti vi 75 inch');
        await c.say('Cửa hàng có 36 chiếc ti vi. Số ti vi 55 inch gấp 3 lần số ti vi 75 inch. Gấp 3 lần: ti vi 75 inch là 1 phần thì ti vi 55 inch là 3 phần.');
        await c.say('Tổng số phần là bao nhiêu?', 'Tổng số phần = ?');
        await c.choose(['3 phần', '4 phần', '2 phần'].map((v) => ({ html: v, value: v })), '4 phần', { hint: 'Đếm cả phần của ti vi 75 inch: 1 + 3.' });
        await t.fillOne('9');
        await t.over(0, '9');
        await t.over(1, '27');
        t.caption('1 + 3 = 4 (phần) · 36 : 4 = 9 · 75 inch: <b>9</b> chiếc · 55 inch: <b>27</b> chiếc');
        await c.say('1 cộng 3 bằng 4 phần. Mỗi phần 9 chiếc. Ti vi 75 inch có 9 chiếc, ti vi 55 inch có 27 chiếc.');
      },
    ],
  },
  tasks: () => [task38Basic(), task38Times(), task38Gt1(), task38Rect(), task38Diff(), task38Op()],
};

/** Hỏi tổng số phần, số thứ nhất, số thứ hai. */
function task38Basic() {
  return {
    id: 'r38-basic',
    make: (rng) => sumGen(rng),
    async mount(f, { a, b, one, k }) {
      mark('r38-basic');
      const [A, B, u, txt] = SUMCTX[k];
      const T = one * (a + b);
      f.q.innerHTML = `<small>${txt(T)}. ${A} bằng ${fr(a, b)} ${low(B)}.</small>Tổng số phần: ${BOX} · ${A}: ${BOX} · ${B}: ${BOX}`;
      const t = createRatio(f.tool, { mode: 'sum', rows: [{ name: A, parts: a }, { name: B, parts: b }], cap: Math.max(a, b), label: `${fmt(T)} ${u}`, ask: true });
      const [b1, b2, b3] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: a + b, max: 2, say: 'Tổng số phần bằng nhau là bao nhiêu?', hint: (v) => (v === b - a ? 'Đây là tổng, phải cộng số phần.' : `${a} + ${b}.`) });
      await t.fillOne(fmt(one));
      await f.ask({ box: b2, answer: one * a, max: 6, say: `${A} là bao nhiêu?`, hint: (v) => (v === one * b ? `Đó là ${low(B)}. ${A} có ${a} phần.` : `Một phần: ${fmt(T)} : ${a + b} = ${fmt(one)}. Nhân với ${a}.`) });
      await t.over(0, fmt(one * a));
      await f.ask({ box: b3, answer: one * b, max: 6, hint: `${fmt(T)} − ${fmt(one * a)}.` });
      await t.over(1, fmt(one * b));
      f.finish({ ok: `${A}: ${fmt(T)} : ${a + b} × ${a} = ${fmt(one * a)}; ${low(B)}: ${fmt(T)} − ${fmt(one * a)} = ${fmt(one * b)}.` });
    },
  };
}

/** "Gấp k lần": 1 phần và k phần. */
function task38Times() {
  const CTX = [['75 inch', '55 inch', 'chiếc', 'Cửa hàng có', 'chiếc ti vi', 'ti vi'], ['Bút đỏ', 'Bút xanh', 'cái', 'Hộp có', 'cái bút đỏ và xanh', ''], ['Cam', 'Quýt', 'quả', 'Giỏ có', 'quả cam và quýt', '']];
  return {
    id: 'r38-times',
    make: (rng) => ({ k: rng.int(2, 6), one: rng.int(4, 30), c: rng.int(0, CTX.length - 1) }),
    async mount(f, { k, one, c }) {
      mark('r38-times');
      const [A, B, u, pre, all, kind] = CTX[c];
      const nm = (s) => (kind ? `${kind} ${s}` : low(s));
      const T = one * (k + 1);
      f.q.innerHTML = `<small>${pre} ${T} ${all}. Số ${nm(B)} gấp ${k} lần số ${nm(A)}.</small>${A}: ${BOX} ${u} · ${B}: ${BOX} ${u}`;
      const t = createRatio(f.tool, { mode: 'sum', rows: [{ name: A, parts: 1 }, { name: B, parts: k }], cap: k, label: `${T} ${u}`, ask: true });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: one, max: 4, say: `Số ${nm(A)} là bao nhiêu?`,
        hint: (v) => (v * k === T ? `Gấp ${k} lần: ${nm(A)} 1 phần, ${nm(B)} ${k} phần. Tổng là ${k + 1} phần.` : `Tổng số phần 1 + ${k} = ${k + 1}. ${T} : ${k + 1}.`) });
      await t.fillOne(String(one));
      await t.over(0, String(one));
      await f.ask({ box: b2, answer: one * k, max: 4, hint: `${T} − ${one}, hoặc ${one} × ${k}.` });
      await t.over(1, String(one * k));
      f.finish({ ok: `1 + ${k} = ${k + 1} phần; ${nm(A)} ${one}, ${nm(B)} ${one * k}.` });
    },
  };
}

/** Tỉ số lớn hơn 1 (tiền buổi sáng bằng 3/2 buổi chiều). */
function task38Gt1() {
  return {
    id: 'r38-gt1',
    make: (rng) => { const g = sumGen(rng, { gt1: true }); return { a: g.a, b: g.b, one: rng.pick([200000, 400000, 600000, 1000000, 1200000]) }; },
    async mount(f, { a, b, one }) {
      mark('r38-gt1');
      const T = one * (a + b);
      f.q.innerHTML = `<small>Một ngày cửa hàng thu được ${fmt(T)} đồng. Tiền buổi sáng bằng ${fr(a, b)} tiền buổi chiều.</small>Sáng: ${BOX} đồng · Chiều: ${BOX} đồng`;
      const t = createRatio(f.tool, { mode: 'sum', rows: [{ name: 'Sáng', parts: a }, { name: 'Chiều', parts: b }], cap: Math.max(a, b), label: `${fmt(T)} đồng`, ask: true });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: one * a, max: 9, say: 'Buổi sáng thu được bao nhiêu tiền?', hint: (v) => (v === one * b ? `Đó là buổi chiều. Buổi sáng có ${a} phần, nhiều hơn.` : `Tổng số phần ${a} + ${b} = ${a + b}. ${fmt(T)} : ${a + b} × ${a}.`) });
      await t.over(0, fmt(one * a));
      await f.ask({ box: b2, answer: one * b, max: 9, hint: `${fmt(T)} − ${fmt(one * a)}.` });
      await t.over(1, fmt(one * b));
      f.finish({ ok: `Sáng ${fmt(one * a)} đồng, chiều ${fmt(one * b)} đồng.` });
    },
  };
}

/** Chu vi hình chữ nhật, chiều rộng bằng a/b chiều dài (dùng nửa chu vi). */
function task38Rect() {
  return {
    id: 'r38-rect',
    make: (rng) => { const g = sumGen(rng); return { a: g.a, b: g.b, one: rng.int(2, 12) }; },
    async mount(f, { a, b, one }) {
      mark('r38-rect');
      const P = 2 * one * (a + b);
      f.q.innerHTML = `<small>Mảnh đất hình chữ nhật có chu vi ${P} m, chiều rộng bằng ${fr(a, b)} chiều dài.</small>Chiều rộng: ${BOX} m · Chiều dài: ${BOX} m`;
      const t = createRatio(f.tool, { mode: 'sum', rows: [{ name: 'Rộng', parts: a }, { name: 'Dài', parts: b }], cap: Math.max(a, b), label: '? m', ask: true });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: one * a, max: 4, say: 'Chiều rộng là bao nhiêu mét?', hint: (v) => (v === 2 * one * a ? `Tổng của chiều dài và chiều rộng là nửa chu vi: ${P} : 2 = ${P / 2}.` : `Nửa chu vi ${P / 2} m. ${P / 2} : ${a + b} × ${a}.`) });
      t.set({ label: `${P / 2} m` });
      await t.over(0, String(one * a));
      await f.ask({ box: b2, answer: one * b, max: 4, hint: `${P / 2} − ${one * a}.` });
      await t.over(1, String(one * b));
      f.finish({ ok: `Nửa chu vi ${P / 2} m; rộng ${one * a} m, dài ${one * b} m.` });
    },
  };
}

/** Hỏi hiệu sau khi tìm hai số (gà ít hơn vịt bao nhiêu). */
function task38Diff() {
  return {
    id: 'r38-diff',
    make: (rng) => { const g = sumGen(rng); return { a: g.a, b: g.b, one: rng.pick([100, 200, 500, 1000, 2000]) }; },
    async mount(f, { a, b, one }) {
      mark('r38-diff');
      const T = one * (a + b);
      f.q.innerHTML = `<small>Trại có ${fmt(T)} con gà và vịt, số gà bằng ${fr(a, b)} số vịt.</small>Số gà ít hơn số vịt ${BOX} con`;
      const t = createRatio(f.tool, { mode: 'sum', rows: [{ name: 'Gà', parts: a }, { name: 'Vịt', parts: b }], cap: Math.max(a, b), label: `${fmt(T)} con`, ask: true });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: one * (b - a), max: 7, say: 'Số gà ít hơn số vịt bao nhiêu con?',
        hint: (v) => (v === one * a || v === one * b ? 'Em mới tìm một số. Đề hỏi số gà ít hơn số vịt bao nhiêu.' : `Một phần: ${fmt(T)} : ${a + b} = ${fmt(one)}. Vịt hơn gà ${b - a} phần.`) });
      await t.fillOne(fmt(one));
      await t.over(0, fmt(one * a));
      await t.over(1, fmt(one * b));
      f.finish({ ok: `Gà ${fmt(one * a)}, vịt ${fmt(one * b)}; ít hơn ${fmt(one * (b - a))} con.` });
    },
  };
}

/** Chọn biểu thức tính số thứ nhất. */
function task38Op() {
  return {
    id: 'r38-op',
    make: (rng) => sumGen(rng),
    async mount(f, { a, b, one, k }) {
      mark('r38-op');
      const [A, B, u, txt] = SUMCTX[k];
      const T = one * (a + b);
      f.q.innerHTML = `<small>${txt(T)}. ${A} bằng ${fr(a, b)} ${low(B)}.</small>Phép tính tìm <b>${low(A)}</b> là:`;
      createRatio(f.tool, { mode: 'sum', rows: [{ name: A, parts: a }, { name: B, parts: b }], cap: Math.max(a, b), label: `${fmt(T)} ${u}`, ask: true });
      const right = `${fmt(T)} : ${a + b} × ${a}`;
      const opts = uniq([right, `${fmt(T)} : ${a + b} × ${b}`, `${fmt(T)} : ${b} × ${a}`, `${fmt(T)} : ${b - a} × ${a}`]);
      await f.choose({ options: shuffleBy(opts, T).map((o) => ({ html: o, value: o })), answer: right, say: `Chọn phép tính tìm ${low(A)}.`,
        hint: (o) => (o.endsWith(`× ${b}`) ? `${A} có ${a} phần.` : `Chia tổng cho tổng số phần ${a} + ${b} = ${a + b}.`) });
      f.finish({ ok: `${right} = ${fmt(one * a)} ${u}` });
    },
  };
}

// ═══ Bài 39. Tìm hai số khi biết hiệu và tỉ số ══════════════════════════════════════════════════════
/** Bài toán hiệu tỉ: số bé = a/b số lớn (a < b). [lớn, bé, đơn vị, câu]. */
const DIFFCTX = [
  ['Sóc chị', 'Sóc em', 'hạt', (d, a, b) => `Số hạt dẻ sóc em nhặt bằng ${fr(a, b)} số hạt dẻ sóc chị, em nhặt ít hơn chị ${d} hạt`],
  ['Nam', 'Nữ', 'bạn', (d, a, b) => `Đội cờ vua có số bạn nữ bằng ${fr(a, b)} số bạn nam, nam nhiều hơn nữ ${d} bạn`],
  ['Loại B', 'Loại A', 'kg', (d, a, b) => `Rác loại A bằng ${fr(a, b)} rác loại B và ít hơn loại B ${d} kg`],
  ['Thùng to', 'Thùng nhỏ', 'l', (d, a, b) => `Thùng nhỏ chứa bằng ${fr(a, b)} thùng to, ít hơn thùng to ${d} l nước`],
];
const diffGen = (rng) => {
  let a, b;
  do { a = rng.int(1, 8); b = rng.int(2, 9); } while (a >= b || gcd(a, b) !== 1);
  return { a, b, one: rng.int(2, 25), k: rng.int(0, DIFFCTX.length - 1) };
};

const B39 = {
  explore: {
    setup: (board) => createRatio(board, { mode: 'diff', edit: true, rows: [{ name: 'Sóc chị', parts: 1 }, { name: 'Sóc em', parts: 1 }], cap: 7 }),
    steps: [
      async (c) => {
        const t = c.t;
        t.caption(`Em = ${fr(3, 5)} chị · em ít hơn chị <b>6</b> hạt dẻ`);
        await c.say('Số hạt dẻ của sóc em bằng ba phần năm số hạt dẻ của sóc chị. Em nhặt ít hơn chị 6 hạt. Mỗi bạn nhặt bao nhiêu hạt dẻ?');
        await c.say('Số hạt của chị chia 5 phần bằng nhau thì số hạt của em là 3 phần. Bấm dấu cộng để dựng sơ đồ.', 'Chị: <b>5 phần</b> · Em: <b>3 phần</b>');
        await waitDo(c, t, () => t.parts(0) === 5 && t.parts(1) === 3, {
          nudge: () => (t.parts(0) !== 5 ? 'Dòng sóc chị cần 5 phần.' : 'Dòng sóc em cần 3 phần.'),
          el: () => t.q(`.rt-btn[data-i="${t.parts(0) !== 5 ? 0 : 1}"][data-d="${t.parts(0) !== 5 ? (t.parts(0) < 5 ? 1 : -1) : (t.parts(1) < 3 ? 1 : -1)}"]`),
        }, () => t.set({ rows: [{ parts: 5 }, { parts: 3 }] }));
        t.set({ edit: false, cap: 5, label: '6 hạt dẻ', rows: [{ over: '?' }, { over: '?' }] });
        await c.say('Phần chị hơn em ứng với 6 hạt dẻ.', 'Ta có sơ đồ');
      },
      async (c) => {
        const t = c.t;
        t.hiExtra(true);
        await c.say('6 hạt dẻ ứng với mấy phần? Đếm các phần hơn.', 'Hiệu số phần = ?');
        await t.countParts('extra', { gap: 500 });
        await c.choose([{ html: '5 − 3 = 2 (phần)', value: 1 }, { html: '5 + 3 = 8 (phần)', value: 2 }, { html: '5 (phần)', value: 3 }], 1, { hint: 'Hiệu 6 hạt chỉ ứng với các phần chị hơn em.' });
        t.caption('Hiệu số phần: 5 − 3 = <b>2</b> (phần)');
        await c.say('Hiệu số phần bằng nhau là 5 trừ 3 bằng 2 phần.');
      },
      async (c) => {
        const t = c.t;
        await c.say('2 phần ứng với 6 hạt. 1 phần là bao nhiêu hạt?', '1 phần = 6 : 2 = ?');
        await c.choose(['2', '3', '12'].map((v) => ({ html: v, value: v })), '3', { hint: 'Chia 6 hạt cho 2 phần.' });
        await t.fillOne('3');
        await c.say('Mỗi phần 3 hạt. Sóc chị có 5 phần. Chọn phép tính.', 'Sóc chị = ?');
        await c.choose([{ html: '6 : 2 × 5', value: 1 }, { html: '6 : 2 × 3', value: 2 }, { html: '6 × 5', value: 3 }], 1, { hint: 'Một phần là 6 : 2, sóc chị 5 phần.' });
        await t.over(0, '15');
        await t.over(1, '9');
        t.caption('Sóc chị: 6 : 2 × 5 = <b>15</b> (hạt) · Sóc em: 15 − 6 = <b>9</b> (hạt)');
        await c.say('Sóc chị nhặt 15 hạt. Sóc em nhặt 15 trừ 6 bằng 9 hạt. Thử lại: 15 trừ 9 bằng 6.');
      },
      async (c) => {
        const t = c.use((b) => createRatio(b, { mode: 'diff', rows: [{ name: 'Số lớn', parts: 7 }, { name: 'Số bé', parts: 4 }], cap: 7, label: '42', ask: true }));
        t.caption(`Hiệu <b>42</b>, tỉ số của hai số là ${fr(7, 4)}`);
        await c.say('Hai số có hiệu là 42, tỉ số của hai số là bảy phần tư. Tỉ số lớn hơn 1 nên số thứ nhất lớn hơn: số lớn 7 phần, số bé 4 phần.');
        await c.say('Hiệu số phần là bao nhiêu?', 'Hiệu số phần = ?');
        await c.choose(['3 phần', '11 phần', '4 phần'].map((v) => ({ html: v, value: v })), '3 phần', { hint: '7 − 4.' });
        t.hiExtra(true);
        await t.fillOne('14');
        await t.over(0, '98');
        await t.over(1, '56');
        t.caption('42 : 3 = 14 · Số lớn: 14 × 7 = <b>98</b> · Số bé: 98 − 42 = <b>56</b>');
        await c.say('Một phần là 42 chia 3 bằng 14. Số lớn 98, số bé 56.');
      },
    ],
  },
  tasks: () => [task39Basic(), task39Table(), task39Rect(), task39Age(), task39Kind(), task39Candy()],
};

function task39Basic() {
  return {
    id: 'r39-basic',
    make: (rng) => diffGen(rng),
    async mount(f, { a, b, one, k }) {
      mark('r39-basic');
      const [Big, Small, u, txt] = DIFFCTX[k];
      const d = one * (b - a);
      f.q.innerHTML = `<small>${txt(d, a, b)}.</small>Hiệu số phần: ${BOX} · ${Big}: ${BOX} · ${Small}: ${BOX}`;
      const t = createRatio(f.tool, { mode: 'diff', rows: [{ name: Big, parts: b }, { name: Small, parts: a }], cap: b, label: `${d} ${u}`, ask: true });
      const [b1, b2, b3] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: b - a, max: 2, say: 'Hiệu số phần bằng nhau là bao nhiêu?', hint: (v) => (v === a + b ? 'Đây là hiệu, phải trừ số phần.' : `${b} − ${a}.`) });
      t.hiExtra(true);
      await t.fillOne(String(one));
      await f.ask({ box: b2, answer: one * b, max: 4, say: `${Big} là bao nhiêu?`, hint: (v) => (v === d ? `Đó là hiệu, ứng với ${b - a} phần.` : `Một phần: ${d} : ${b - a} = ${one}. Nhân với ${b}.`) });
      await t.over(0, String(one * b));
      await f.ask({ box: b3, answer: one * a, max: 4, hint: `${one * b} − ${d}.` });
      await t.over(1, String(one * a));
      f.finish({ ok: `${Big}: ${d} : ${b - a} × ${b} = ${one * b}; ${low(Small)}: ${one * b} − ${d} = ${one * a}.` });
    },
  };
}

/** Bảng: hiệu, tỉ số (có thể lớn hơn 1) → số bé, số lớn. */
function task39Table() {
  return {
    id: 'r39-table',
    make: (rng) => ({ ...diffGen(rng), gt: rng.int(0, 1) }),
    async mount(f, { a, b, one, gt }) {
      mark('r39-table');
      const d = one * (b - a);
      const [n, m] = gt ? [b, a] : [a, b]; // tỉ số của số thứ nhất và số thứ hai
      f.q.innerHTML = `Hiệu hai số: <b>${d}</b> · Tỉ số: ${big(fr(n, m))} · Số bé: ${BOX} · Số lớn: ${BOX}`;
      const t = createRatio(f.tool, { mode: 'diff', rows: [{ name: 'Số lớn', parts: b }, { name: 'Số bé', parts: a }], cap: b, label: String(d), ask: true });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: one * a, max: 4, say: `Hiệu ${d}, tỉ số ${frSay(n, m)}. Số bé là bao nhiêu?`,
        hint: (v) => (v === one * b ? 'Đó là số lớn.' : `${gt ? `Tỉ số lớn hơn 1: số bé ${a} phần, số lớn ${b} phần.` : `Số bé ${a} phần, số lớn ${b} phần.`} Một phần: ${d} : ${b - a}.`) });
      t.hiExtra(true);
      await t.fillOne(String(one));
      await t.over(1, String(one * a));
      await f.ask({ box: b2, answer: one * b, max: 4, hint: `${one * a} + ${d}.` });
      await t.over(0, String(one * b));
      f.finish({ ok: `Một phần ${one}; số bé ${one * a}, số lớn ${one * b}.` });
    },
  };
}

/** Hình chữ nhật: dài hơn rộng d, dài = b/a rộng → dài, rộng, diện tích. */
function task39Rect() {
  return {
    id: 'r39-rect',
    make: (rng) => { let a, b; do { a = rng.int(1, 5); b = rng.int(2, 6); } while (a >= b || gcd(a, b) !== 1); return { a, b, one: rng.int(2, 15) }; },
    async mount(f, { a, b, one }) {
      mark('r39-rect');
      const d = one * (b - a);
      f.q.innerHTML = `<small>Hình chữ nhật có chiều dài hơn chiều rộng ${d} m, chiều dài bằng ${fr(b, a)} chiều rộng.</small>Dài: ${BOX} m · Rộng: ${BOX} m · Diện tích: ${BOX} m²`;
      const t = createRatio(f.tool, { mode: 'diff', rows: [{ name: 'Dài', parts: b }, { name: 'Rộng', parts: a }], cap: b, label: `${d} m`, ask: true });
      const [b1, b2, b3] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: one * b, max: 4, say: 'Chiều dài là bao nhiêu mét?', hint: `Chiều dài ${b} phần, chiều rộng ${a} phần. Hiệu số phần ${b - a}. ${d} : ${b - a} × ${b}.` });
      t.hiExtra(true);
      await t.fillOne(String(one));
      await t.over(0, String(one * b));
      await f.ask({ box: b2, answer: one * a, max: 4, hint: `${one * b} − ${d}.` });
      await t.over(1, String(one * a));
      await f.ask({ box: b3, answer: one * a * one * b, max: 6, say: 'Diện tích là bao nhiêu mét vuông?', hint: `${one * b} × ${one * a}.` });
      f.finish({ ok: `Dài ${one * b} m, rộng ${one * a} m, diện tích ${one * a * one * b} m².` });
    },
  };
}

/** Tuổi: mẹ hơn con h tuổi; sau n năm tuổi con bằng a/b tuổi mẹ → tuổi hiện nay. */
function task39Age() {
  return {
    id: 'r39-age',
    make: (rng) => {
      for (;;) {
        const a = rng.int(1, 3), b = rng.int(a + 2, 8);
        if (gcd(a, b) !== 1) continue;
        const one = rng.int(3, 12), n = rng.int(2, 5);
        const kid = one * a - n, h = one * (b - a);
        if (kid >= 3 && h >= 20 && h <= 35) return { a, b, one, n };
      }
    },
    async mount(f, { a, b, one, n }) {
      mark('r39-age');
      const h = one * (b - a), kid = one * a - n, mom = one * b - n;
      f.q.innerHTML = `<small>Hiện nay mẹ hơn con ${h} tuổi. Sau ${n} năm nữa, tuổi con bằng ${fr(a, b)} tuổi mẹ.</small>Hiện nay: con ${BOX} tuổi · mẹ ${BOX} tuổi`;
      const t = createRatio(f.tool, { mode: 'diff', rows: [{ name: 'Mẹ', parts: b }, { name: 'Con', parts: a }], cap: b, label: `${h} tuổi`, ask: true, caption: `Tuổi sau ${n} năm nữa` });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: kid, max: 3, say: 'Hiện nay con bao nhiêu tuổi?',
        hint: (v) => (v === one * a ? `Đó là tuổi con sau ${n} năm. Trừ đi ${n} để ra tuổi hiện nay.` : `Mẹ luôn hơn con ${h} tuổi. Hiệu số phần ${b - a}; một phần ${h} : ${b - a} = ${one}.`) });
      t.hiExtra(true);
      await t.fillOne(String(one));
      await t.over(1, String(one * a));
      await t.over(0, String(one * b));
      await f.ask({ box: b2, answer: mom, max: 3, hint: `${kid} + ${h}.` });
      f.finish({ ok: `Sau ${n} năm: con ${one * a}, mẹ ${one * b}. Hiện nay con ${kid}, mẹ ${mom} tuổi.` });
    },
  };
}

/** Nhận dạng: tổng tỉ hay hiệu tỉ → chọn phép tính một phần. */
function task39Kind() {
  return {
    id: 'r39-kind',
    make: (rng) => ({ ...diffGen(rng), sum: rng.int(0, 1) }),
    async mount(f, { a, b, one, sum }) {
      mark('r39-kind');
      const v = sum ? one * (a + b) : one * (b - a);
      f.q.innerHTML = `<small>Hai số có ${sum ? 'tổng' : 'hiệu'} là ${v}, số bé bằng ${fr(a, b)} số lớn.</small>Giá trị một phần là:`;
      createRatio(f.tool, { mode: sum ? 'sum' : 'diff', rows: sum ? [{ name: 'Số bé', parts: a }, { name: 'Số lớn', parts: b }] : [{ name: 'Số lớn', parts: b }, { name: 'Số bé', parts: a }], cap: b, label: String(v), ask: true });
      const right = sum ? `${v} : (${a} + ${b})` : `${v} : (${b} − ${a})`;
      const opts = [right, sum ? `${v} : (${b} − ${a})` : `${v} : (${a} + ${b})`, `${v} : ${b}`];
      await f.choose({ options: shuffleBy(opts, v + a).map((o) => ({ html: o, value: o })), answer: right, say: 'Giá trị một phần tính thế nào?',
        hint: sum ? 'Biết tổng: chia cho tổng số phần.' : 'Biết hiệu: chia cho hiệu số phần.' });
      f.finish({ ok: `${right} = ${one}` });
    },
  };
}

/** Hai chị em: tỉ số của số kẹo em và chị là b/a (em nhiều hơn), em hơn chị d cái. */
function task39Candy() {
  return {
    id: 'r39-candy',
    make: (rng) => diffGen(rng),
    async mount(f, { a, b, one }) {
      mark('r39-candy');
      const d = one * (b - a);
      f.q.innerHTML = `<small>Mai (chị): "Tỉ số của số kẹo em có và số kẹo chị có là ${fr(b, a)}." Mi (em): "Em hơn chị ${d} cái kẹo."</small>Mi: ${BOX} cái · Mai: ${BOX} cái`;
      const t = createRatio(f.tool, { mode: 'diff', rows: [{ name: 'Mi', parts: b }, { name: 'Mai', parts: a }], cap: b, label: `${d} cái`, ask: true });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: one * b, max: 4, say: 'Mi có bao nhiêu cái kẹo?', hint: (v) => (v === one * a ? 'Em Mi nhiều kẹo hơn chị Mai.' : `Mi ${b} phần, Mai ${a} phần. ${d} : ${b - a} × ${b}.`) });
      t.hiExtra(true);
      await t.fillOne(String(one));
      await t.over(0, String(one * b));
      await f.ask({ box: b2, answer: one * a, max: 4, hint: `${one * b} − ${d}.` });
      await t.over(1, String(one * a));
      f.finish({ ok: `Mi ${one * b} cái, Mai ${one * a} cái.` });
    },
  };
}

// ═══ Bài 40. Tìm tỉ số phần trăm của hai số ═════════════════════════════════════════════════════════
/** Thương lấy 4 chữ số thập phân (không làm tròn, như sách: 3,8461…), rồi × 100. */
const cut4 = (x) => Math.floor(clean(x * 10000)) / 10000;
const pctOf = (a, b) => clean(cut4(a / b) * 100);

const B40 = {
  explore: {
    setup: (board) => createPct(board, { value: 0, per: 2, unitWord: 'bạn' }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Sau khoá học bơi, lớp thứ nhất có 50 bạn, 46 bạn bơi đạt chuẩn. 100 ô là cả lớp 50 bạn, nên mỗi bạn là 2 ô.', 'Lớp thứ nhất: <b>46</b> trong <b>50</b> bạn đạt chuẩn');
        await c.say('Em tô số ô ứng với 46 bạn đạt chuẩn.', 'Mỗi bạn 2 ô. Tô ô cho <b>46 bạn</b>');
        await waitDo(c, t, () => t.n === 92, {
          nudge: () => (t.n < 92 ? `Mới được ${t.n / 2} bạn. 46 bạn là 92 ô: 9 cột và 2 ô.` : 'Nhiều quá rồi. 46 bạn là 92 ô.'),
          el: () => t.btn(t.n < 90 ? 10 : 1),
        }, () => t.set(92));
        t.lock(true);
        await c.say('46 bạn là 92 ô trong 100 ô. Bốn mươi sáu phần năm mươi bằng chín mươi hai phần một trăm, tức là 92 phần trăm.', `${fr(46, 50)} = ${fr('46 × 2', '50 × 2')} = ${fr(92, 100)} = <b>92%</b>`);
      },
      async (c) => {
        const t = c.use((b) => createPct(b, { value: 0, buttons: false, edit: false, per: 2.5, unitWord: 'bạn', note: (n) => (n ? `37 bạn trong 40 bạn: <b>92,5%</b>` : 'Lớp thứ hai: 40 bạn, mỗi bạn 2,5 ô') }));
        await c.say('Lớp thứ hai có 40 bạn, 37 bạn đạt chuẩn. Ta làm cách khác: tìm thương 37 chia 40.', '37 : 40 = 0,925');
        await c.say('Nhân thương với 100 rồi viết thêm kí hiệu phần trăm. 0,925 nhân 100 bằng bao nhiêu?', '0,925 × 100 = ?');
        await c.choose(['9,25', '92,5', '925'].map((v) => ({ html: v, value: v })), '92,5', { hint: 'Nhân với 100: chuyển dấu phẩy sang phải hai chữ số.' });
        await t.fillTo(92, { gap: 40 });
        await c.say('92,5. Vậy tỉ số phần trăm là 92,5 phần trăm.', '37 : 40 = 0,925 = <b>92,5%</b>');
        await c.say('Lớp nào có tỉ lệ bơi đạt chuẩn cao hơn?', 'Lớp thứ nhất 92% · lớp thứ hai 92,5%');
        await c.choose([{ html: 'Lớp thứ nhất (46 bạn)', value: 1 }, { html: 'Lớp thứ hai (37 bạn)', value: 2 }], 2, { hint: 'So hai tỉ số phần trăm, không so số bạn: 92% và 92,5%.' });
        await c.say('Đúng rồi! Lớp thứ hai ít bạn đạt chuẩn hơn nhưng tỉ lệ lại cao hơn: 92,5 phần trăm lớn hơn 92 phần trăm.');
      },
      async (c) => {
        const t = c.use((b) => createCanvas(b));
        const H = frameH(t), fs = Math.min(70, H / 7);
        t.draw(`<rect x="60" y="20" width="880" height="${fs * 2.6}" rx="20" fill="#ECFDF5" stroke="#34D399" stroke-width="3"/>
          <text x="500" y="${20 + fs * 1.05}" class="g4v-t" font-size="${fs * 0.7}">① Tìm thương của hai số</text>
          <text x="500" y="${20 + fs * 2.05}" class="g4v-t" font-size="${fs * 0.7}">② Nhân thương với 100, viết thêm kí hiệu %</text>
          <text x="500" y="${H * 0.62}" class="g4v-t" font-size="${fs}">1,4 : 40 = 0,035</text>`);
        await c.say('Muốn tìm tỉ số phần trăm của hai số: tìm thương của hai số, nhân thương với 100 rồi viết thêm kí hiệu phần trăm.');
        await c.say('40 ki-lô-gam nước biển có 1,4 ki-lô-gam muối. Muối chiếm bao nhiêu phần trăm?', '1,4 : 40 = 0,035 · tỉ số phần trăm = ?');
        await c.choose(['0,035%', '3,5%', '35%'].map((v) => ({ html: v, value: v })), '3,5%', { hint: (v) => (v === '0,035%' ? 'Em quên nhân thương với 100.' : '0,035 × 100: dấu phẩy sang phải hai chữ số.') });
        t.add(`<text class="b40-r" x="500" y="${H * 0.86}" font-size="${fs}" fill="#16A34A" text-anchor="middle" font-weight="800">0,035 × 100 = 3,5 → 3,5%</text>`);
        await t.anim('.b40-r', [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], 450);
        await c.say('Đúng rồi! 0,035 bằng 3,5 phần trăm. Cứ 100 ki-lô-gam nước biển có 3,5 ki-lô-gam muối.');
      },
      async (c) => {
        const t = c.use((b) => createPct(b, { value: 0, buttons: false, edit: false }));
        await c.say('Cộng, trừ, nhân, chia tỉ số phần trăm như với số, rồi viết thêm kí hiệu phần trăm. 18 phần trăm cộng 12 phần trăm bằng bao nhiêu?', '18% + 12% = ?');
        await t.fillTo(18, { gap: 90 });
        await c.choose(['30%', '30', '216%'].map((v) => ({ html: v, value: v })), '30%', { hint: 'Cộng 18 với 12 rồi viết thêm kí hiệu %.' });
        await t.fillTo(30, { gap: 90 });
        await c.say('18 phần trăm cộng 12 phần trăm bằng 30 phần trăm.', '18% + 12% = <b>30%</b>');
      },
    ],
  },
  tasks: () => [task40Two(), task40Div4(), task40Ops(), task40Plan(), task40Compare(), task40Share()],
};

/** Tỉ số phần trăm của a và b (đẹp). */
function task40Two() {
  return {
    id: 'r40-two',
    make: (rng) => { const b = rng.pick([20, 25, 40, 50, 80, 200, 300, 400, 500]); let a = rng.int(1, b - 1); if (b >= 200) a = (rng.int(1, 19) * b) / 100; return { a, b }; },
    async mount(f, { a, b }) {
      mark('r40-two');
      const p = clean((a / b) * 100);
      f.q.innerHTML = `Tỉ số phần trăm của <b>${a}</b> và <b>${b}</b> là ${BOX} %`;
      const t = createPct(f.tool, { value: 0, buttons: false, edit: false, note: () => `${a} : ${b} = ${D(a / b)} = <b>${PC(p)}</b>` });
      t.root.querySelector('.g5g-parts').style.visibility = 'hidden';
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(p), max: 5, say: `Tỉ số phần trăm của ${a} và ${b} là bao nhiêu?`,
        hint: (v) => (Math.abs(v - a / b) < 1e-9 ? 'Nhân thương với 100.' : Math.abs(v - (b / a) * 100) < 1e-6 ? `Lấy ${a} chia ${b}, số nói trước chia số nói sau.` : `Tìm thương ${a} : ${b} rồi nhân với 100.`) });
      t.root.querySelector('.g5g-parts').style.visibility = '';
      await t.fillTo(Math.floor(p), { gap: 30 });
      t.mode({ exact: p });
      f.finish({ ok: `${a} : ${b} = ${D(a / b)} = ${PC(p)}` });
    },
  };
}

/** Thương lấy 4 chữ số thập phân: chọn kết quả đúng dấu phẩy. */
function task40Div4() {
  return {
    id: 'r40-div4',
    make: (rng) => { let a, b; do { a = rng.int(11, 95); b = rng.pick([13, 17, 19, 21, 23, 29, 31, 33, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73]); } while (a === b || Number.isInteger((a * 10000) / b)); return { a, b }; },
    async mount(f, { a, b }) {
      mark('r40-div4');
      const p = pctOf(a, b), q = cut4(a / b);
      f.q.innerHTML = `Tỉ số phần trăm của <b>${a}</b> và <b>${b}</b> là: <small>(thương lấy 4 chữ số ở phần thập phân)</small>`;
      const t = createCanvas(f.tool);
      const H = frameH(t);
      t.draw(`<text x="500" y="${H * 0.42}" class="g4v-t" font-size="${Math.min(90, H / 4.5)}">${a} : ${b} = ${D(q)}…</text>`);
      const opts = [p / 1000, p / 100, p / 10, p, p * 10].map((x) => `${D(clean(x))}%`);
      const right = `${D(p)}%`;
      const pick = shuffleBy(opts.filter((o) => o !== right).slice(0, 3).concat(right), a * b);
      await f.choose({ options: pick.map((o) => ({ html: o, value: o })), answer: right, say: `Tỉ số phần trăm của ${a} và ${b} là bao nhiêu?`,
        hint: (o) => (o === `${D(q)}%` ? 'Em quên nhân thương với 100.' : 'Nhân thương với 100: dấu phẩy sang phải hai chữ số.') });
      t.add(`<text x="500" y="${H * 0.75}" class="g4v-t" font-size="${Math.min(90, H / 4.5)}" fill="#16A34A">${D(q)} × 100 = ${D(p)}%</text>`);
      f.finish({ ok: `${a} : ${b} = ${D(q)}… = ${D(p)}%` });
    },
  };
}

/** Cộng, trừ, nhân, chia tỉ số phần trăm. */
function task40Ops() {
  return {
    id: 'r40-ops',
    make: (rng) => {
      const op = rng.pick(['+', '−', '×', ':']);
      const x = clean(rng.int(5, 60) + (rng() < 0.5 ? rng.int(1, 9) / 10 : 0));
      if (op === '+') return { op, x, y: clean(rng.int(5, 40) + (rng() < 0.5 ? rng.int(1, 9) / 10 : 0)) };
      if (op === '−') { const y = clean(rng.int(5, 40) + (rng() < 0.5 ? rng.int(1, 9) / 10 : 0)); return { op, x: clean(y + rng.int(5, 50) + (rng() < 0.5 ? rng.int(1, 9) / 10 : 0)), y }; }
      if (op === '×') return { op, x: clean(rng.int(2, 20) + rng.int(0, 9) / 10), y: rng.int(2, 6) };
      const k = rng.int(2, 6); return { op, x: clean((rng.int(2, 15) + rng.int(0, 9) / 10) * k), y: k };
    },
    async mount(f, { op, x, y }) {
      mark('r40-ops');
      const r = clean(op === '+' ? x + y : op === '−' ? x - y : op === '×' ? x * y : x / y);
      const yTxt = op === '+' || op === '−' ? `${D(y)}%` : String(y);
      f.q.innerHTML = `${big(`${D(x)}% ${op} ${yTxt}`)} = ${BOX} %`;
      const t = createPct(f.tool, { grids: r > 100 ? 2 : 1, value: 0, buttons: false, edit: false, note: () => `${D(x)}% ${op} ${yTxt} = <b>${D(r)}%</b>` });
      t.root.querySelector('.g5g-parts').style.visibility = 'hidden';
      t.root.querySelector('.g5g-read').style.visibility = 'hidden';
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(r), max: 6, say: 'Tính rồi viết kết quả.', hint: `Tính như với số: ${D(x)} ${op} ${D(y)}, rồi viết thêm kí hiệu %.` });
      t.root.querySelector('.g5g-parts').style.visibility = '';
      t.root.querySelector('.g5g-read').style.visibility = '';
      t.mode({ exact: r });
      await t.fillTo(Math.min(t.cap, Math.floor(r)), { gap: 25 });
      f.finish({ ok: `${D(x)}% ${op} ${yTxt} = ${D(r)}%` });
    },
  };
}

/** Kế hoạch: đạt bao nhiêu %, vượt bao nhiêu %. */
function task40Plan() {
  const CTX = [['trồng', 'cây'], ['sản xuất', 'sản phẩm'], ['thu hoạch', 'tấn lúa'], ['đọc', 'quyển sách']];
  return {
    id: 'r40-plan',
    make: (rng) => { const P = rng.pick([200, 400, 500, 600, 800, 1000]); const p = rng.pick([rng.int(4, 19) * 5, rng.int(21, 26) * 5]); return { P, p, c: rng.int(0, CTX.length - 1) }; },
    async mount(f, { P, p, c }) {
      mark('r40-plan');
      const [verb, thing] = CTX[c];
      const done = (P * p) / 100;
      const over = p > 100;
      f.q.innerHTML = `<small>Kế hoạch ${verb} ${fmt(P)} ${thing}, đã ${verb} ${fmt(done)} ${thing}.</small>Đạt ${BOX} % kế hoạch${over ? ` · vượt ${BOX} %` : ''}`;
      const t = createPct(f.tool, { grids: over ? 2 : 1, value: 0, buttons: false, edit: false, note: () => `${fmt(done)} : ${fmt(P)} = ${D(done / P)} = <b>${p}%</b>` });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: p, max: 3, say: 'Đã đạt bao nhiêu phần trăm kế hoạch?', hint: (v) => (v === p - 100 ? 'Đó là phần vượt. Đạt là cả số đã làm so với kế hoạch.' : `${fmt(done)} : ${fmt(P)} rồi nhân với 100.`) });
      await t.fillTo(p, { gap: 30 });
      if (over) await f.ask({ box: b2, answer: p - 100, max: 3, say: 'Vượt kế hoạch bao nhiêu phần trăm?', hint: `Kế hoạch là 100%. ${p}% − 100%.` });
      f.finish({ ok: over ? `Đạt ${p}%, vượt ${p - 100}% kế hoạch.` : `Đạt ${p}% kế hoạch.` });
    },
  };
}

/** So sánh tỉ lệ hai lớp (bẫy: số lớn hơn chưa chắc tỉ lệ cao hơn). */
function task40Compare() {
  return {
    id: 'r40-cmp',
    make: (rng) => {
      for (;;) {
        const n1 = rng.pick([40, 50, 25, 20]), n2 = rng.pick([40, 50, 25, 20]);
        if (n1 === n2) continue;
        const k1 = rng.int(Math.ceil(n1 * 0.6), n1 - 1), k2 = rng.int(Math.ceil(n2 * 0.6), n2 - 1);
        const p1 = (k1 / n1) * 100, p2 = (k2 / n2) * 100;
        if (p1 !== p2 && (k1 > k2) !== (p1 > p2)) return { n1, k1, n2, k2 };
      }
    },
    async mount(f, { n1, k1, n2, k2 }) {
      mark('r40-cmp');
      const p1 = clean((k1 / n1) * 100), p2 = clean((k2 / n2) * 100);
      f.q.innerHTML = `<small>Lớp 5A: ${k1}/${n1} bạn đạt chuẩn. Lớp 5B: ${k2}/${n2} bạn đạt chuẩn.</small>Lớp nào có tỉ lệ đạt chuẩn cao hơn?`;
      const t = createCanvas(f.tool);
      const H = frameH(t);
      const col = (x, nm, k, n, p) => `<rect x="${x}" y="30" width="420" height="${H - 60}" rx="20" fill="#F0FDF4" stroke="#A3A3A3" stroke-width="3"/>
        <text x="${x + 210}" y="${H * 0.3}" class="g4v-t" font-size="${Math.min(70, H / 6)}">Lớp ${nm}</text>
        <text x="${x + 210}" y="${H * 0.55}" class="g4v-t" font-size="${Math.min(60, H / 7)}">${k} / ${n} bạn</text>
        <text class="r40-p" x="${x + 210}" y="${H * 0.8}" font-size="${Math.min(70, H / 6)}" fill="#16A34A" text-anchor="middle" font-weight="800" opacity="0">${D(p)}%</text>`;
      t.draw(col(40, '5A', k1, n1, p1) + col(540, '5B', k2, n2, p2));
      const right = p1 > p2 ? '5A' : '5B';
      await f.choose({ options: ['5A', '5B'].map((v) => ({ html: `Lớp ${v}`, value: v })), answer: right, say: 'Lớp nào có tỉ lệ đạt chuẩn cao hơn?',
        hint: 'Không so số bạn. Tìm tỉ số phần trăm của mỗi lớp rồi so.' });
      t.qa('.r40-p').forEach((e) => e.setAttribute('opacity', 1));
      await t.anim('.r40-p', [{ transform: 'translateY(20px)', opacity: 0 }, { transform: 'none', opacity: 1 }], 400, { stagger: 200 });
      f.finish({ ok: `5A: ${D(p1)}%, 5B: ${D(p2)}%. Lớp ${right} cao hơn.` });
    },
  };
}

/** Một nhóm chiếm bao nhiêu % tổng (chia cho tổng, không chia cho số lớn nhất). */
function task40Share() {
  const SPORTS = ['Cờ vua', 'Bóng đá', 'Bơi', 'Võ'];
  return {
    id: 'r40-share',
    make: (rng) => {
      const T = rng.pick([20, 25, 40, 50, 80]);
      const v = [];
      let left = T;
      for (let i = 0; i < 3; i++) { const x = rng.int(2, Math.max(2, Math.floor(left / 2))); v.push(x); left -= x; }
      v.push(left);
      return { v, i: rng.int(0, 3) };
    },
    async mount(f, { v, i }) {
      mark('r40-share');
      const T = v.reduce((s, x) => s + x, 0), p = clean((v[i] / T) * 100);
      f.q.innerHTML = `Số bạn thích <b>${SPORTS[i]}</b> chiếm ${BOX} % số bạn của cả nhóm`;
      const t = createCanvas(f.tool);
      const H = frameH(t);
      const max = Math.max(...v), base = H - 70, top = 40, cw = 150;
      let g = `<line x1="80" y1="${base}" x2="960" y2="${base}" stroke="${INK}" stroke-width="3"/>`;
      v.forEach((x, k) => {
        const h = ((base - top - 40) * x) / max, cx = 160 + k * 220;
        g += `<rect x="${cx - cw / 2}" y="${base - h}" width="${cw}" height="${h}" fill="${k === i ? '#F59E0B' : '#60A5FA'}" stroke="${INK}" stroke-width="2.5"/>
          <text x="${cx}" y="${base - h - 10}" class="g4v-t" font-size="40">${x}</text><text x="${cx}" y="${base + 44}" class="g4v-t" font-size="36">${SPORTS[k]}</text>`;
      });
      t.draw(g);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(p), max: 5, say: `Số bạn thích ${SPORTS[i]} chiếm bao nhiêu phần trăm cả nhóm?`,
        hint: (x) => (Math.abs(x - (v[i] / max) * 100) < 1e-6 ? `Chia cho tổng số bạn, không chia cho cột cao nhất. Tổng là ${T}.` : `Tổng số bạn: ${v.join(' + ')} = ${T}. ${v[i]} : ${T} × 100.`) });
      t.add(`<text x="960" y="${top + 10}" class="g4v-t" font-size="40" fill="#B45309" style="text-anchor:end">${v[i]} : ${T} = ${D(v[i] / T)} = ${D(p)}%</text>`);
      f.finish({ ok: `${v[i]} : ${T} = ${D(v[i] / T)} = ${D(p)}%` });
    },
  };
}

// ═══ Bài 41. Tìm giá trị phần trăm của một số ═══════════════════════════════════════════════════════
const B41 = {
  explore: {
    setup: (board) => createPct(board, { value: 0, of: 300, unitWord: 'tấn' }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Nhà máy đặt kế hoạch tái chế 300 tấn rác. Nửa năm đã làm được 60 phần trăm kế hoạch. Đó là bao nhiêu tấn?', '60% của <b>300 tấn</b> = ?');
        await c.say('100 ô là cả 300 tấn, nên mỗi ô là 300 chia 100 bằng 3 tấn. Em tô 60 ô.', 'Mỗi ô 3 tấn. Tô <b>60 ô</b> (6 cột)');
        await waitDo(c, t, () => t.n === 60, { nudge: 'Bấm cộng 1 cột cho đủ 6 cột.', el: () => t.btn(10) }, () => t.set(60));
        t.lock(true);
        await c.say('60 ô, mỗi ô 3 tấn: 60 nhân 3 bằng 180 tấn.', '60% của 300 tấn = <b>180 tấn</b>');
      },
      async (c) => {
        await c.say('Muốn tìm 60 phần trăm của 300, ta lấy 300 nhân 60 rồi chia 100, hoặc lấy 300 chia 100 rồi nhân 60. Phép tính nào đúng?', '60% của 300 = ?');
        await c.choose([{ html: '300 × 60 : 100', value: 1 }, { html: '300 : 60 × 100', value: 2 }, { html: '300 × 100 : 60', value: 3 }], 1, { hint: 'Chia 100 để được 1%, nhân 60 để được 60%.' });
        await c.say('Đúng rồi! 300 nhân 60 chia 100 bằng 180. Hoặc 300 chia 100 bằng 3, nhân 60 bằng 180.', '300 × 60 : 100 = 180 · (300 : 100) × 60 = 180');
      },
      async (c) => {
        const t = c.use((b) => createPct(b, { value: 0, of: 250000, unitWord: 'đồng', buttons: false, edit: false }));
        await c.say('Siêu thị giảm giá 15 phần trăm. Chiếc ba lô giá 250 000 đồng. Được giảm bao nhiêu tiền?', 'Ba lô <b>250 000 đồng</b>, giảm <b>15%</b>');
        await t.fillTo(15, { gap: 120 });
        await c.choose(['37 500 đồng', '212 500 đồng', '3 750 đồng'].map((v) => ({ html: v, value: v })), '37 500 đồng', { hint: (v) => (v.startsWith('212') ? 'Đó là giá sau khi giảm. Đề hỏi số tiền được giảm.' : '250 000 : 100 × 15.') });
        await c.say('Được giảm 37 500 đồng. Giá sau khi giảm là 250 000 trừ 37 500 bằng 212 500 đồng.', 'Giảm: <b>37 500 đồng</b> · Còn phải trả: 212 500 đồng');
      },
      async (c) => {
        const t = c.use((b) => createPct(b, { value: 0, of: 300, unitWord: 'người', buttons: false, edit: false, color: '#F87171' }));
        await c.say('Đội đồng diễn có 300 người: 40 phần trăm mặc áo đỏ, 25 phần trăm mặc áo vàng, còn lại mặc áo xanh.', '300 người · đỏ 40% · vàng 25% · xanh ?');
        await t.fillTo(65, { gap: 50 });
        await c.say('Áo xanh chiếm bao nhiêu phần trăm?', 'Áo xanh = ?%');
        await c.choose(['35%', '65%', '25%'].map((v) => ({ html: v, value: v })), '35%', { hint: '100% − 40% − 25%.' });
        await c.say('35 phần trăm của 300 người là 300 nhân 35 chia 100 bằng 105 người mặc áo xanh.', '35% của 300 = <b>105</b> người');
      },
    ],
  },
  tasks: () => [task41Value(), task41Choose(), task41Discount(), task41Interest(), task41Remain(), task41Protein()],
};

/** k% của N. */
function task41Value() {
  const U = ['m²', 'kg', 'l', 'đồng', 'học sinh', 'cây'];
  return {
    id: 'r41-val',
    make: (rng) => {
      const v = rng.int(0, 2);
      if (v === 0) return { k: rng.int(1, 19) * 5, N: rng.int(1, 20) * 20, u: rng.int(0, U.length - 1) };
      if (v === 1) return { k: rng.int(1, 99), N: rng.pick([100, 200, 300, 500, 1000]), u: rng.int(0, U.length - 1) };
      return { k: clean(rng.int(1, 30) + 0.5), N: rng.pick([2, 4, 6, 8, 10, 20]), u: 1 };
    },
    async mount(f, { k, N, u }) {
      mark('r41-val');
      const r = clean((N * k) / 100);
      f.q.innerHTML = `${big(`${D(k)}% của ${fmt(N)} ${U[u]}`)} = ${BOX} ${U[u]}`;
      const t = createPct(f.tool, { value: 0, of: N, unitWord: U[u], buttons: false, edit: false });
      t.root.querySelector('.g5g-parts').style.visibility = 'hidden';
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(r), max: 8, say: `${PS(k)} của ${fmt(N)} ${U[u]} là bao nhiêu?`,
        hint: (v) => (Math.abs(v - (N / k) * 100) < 1e-6 ? 'Em làm như tìm tỉ số phần trăm. Phải lấy số nhân với phần trăm rồi chia 100.' : `${fmt(N)} × ${D(k)} : 100.`) });
      t.root.querySelector('.g5g-parts').style.visibility = '';
      await t.fillTo(Math.floor(k), { gap: 25 });
      if (!Number.isInteger(k)) t.mode({ exact: k, note: () => `${fmt(N)} × ${D(k)} : 100 = <b>${D(r)}</b> ${U[u]}` });
      f.finish({ ok: `${fmt(N)} × ${D(k)} : 100 = ${D(r)} ${U[u]}` });
    },
  };
}

function task41Choose() {
  return {
    id: 'r41-choose',
    make: (rng) => ({ k: rng.int(5, 95), N: rng.int(2, 30) * 10 }),
    async mount(f, { k, N }) {
      mark('r41-choose');
      f.q.innerHTML = `Phép tính tìm <b>${k}% của ${N}</b> là:`;
      createPct(f.tool, { value: k, of: N, buttons: false, edit: false });
      const right = `${N} × ${k} : 100`;
      const opts = [right, `${N} : ${k} × 100`, `${N} × 100 : ${k}`, `${N} : 100 + ${k}`];
      await f.choose({ options: shuffleBy(opts, N + k).map((o) => ({ html: o, value: o })), answer: right, say: `Chọn phép tính tìm ${k} phần trăm của ${N}.`,
        hint: (o) => (o.startsWith(`${N} : ${k}`) ? 'Đó là cách tìm tỉ số phần trăm. Ở đây phải nhân với phần trăm.' : 'Lấy số nhân với phần trăm rồi chia cho 100.') });
      f.finish({ ok: `${right} = ${D((N * k) / 100)}` });
    },
  };
}

/** Giảm giá: tiền giảm và giá sau giảm. */
function task41Discount() {
  const ITEMS = [['ba lô', [250000, 300000, 350000]], ['thú bông', [120000, 150000, 180000]], ['ti vi', [8000000, 12000000, 15000000]], ['xe đạp', [1800000, 2500000, 3200000]], ['đôi giày', [400000, 500000, 600000]]];
  return {
    id: 'r41-disc',
    make: (rng) => { const it = rng.int(0, ITEMS.length - 1); return { it, price: rng.pick(ITEMS[it][1]), k: rng.pick([5, 8, 10, 15, 20, 25, 30]) }; },
    async mount(f, { it, price, k }) {
      mark('r41-disc');
      const off = (price * k) / 100;
      f.q.innerHTML = `<small>Chiếc ${ITEMS[it][0]} giá ${fmt(price)} đồng, được giảm giá ${k}%.</small>Giảm: ${BOX} đồng · Còn phải trả: ${BOX} đồng`;
      const t = createPct(f.tool, { value: 0, of: price, unitWord: 'đồng', buttons: false, edit: false, color: '#F87171' });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: off, max: 9, say: 'Được giảm bao nhiêu tiền?', hint: (v) => (v === price - off ? 'Đó là giá sau khi giảm. Ô này ghi số tiền được giảm.' : `${fmt(price)} × ${k} : 100.`) });
      await t.fillTo(k, { gap: 40 });
      await f.ask({ box: b2, answer: price - off, max: 9, say: 'Còn phải trả bao nhiêu tiền?', hint: `${fmt(price)} − ${fmt(off)}.` });
      f.finish({ ok: `Giảm ${fmt(off)} đồng, còn ${fmt(price - off)} đồng.` });
    },
  };
}

/** Lãi suất tiết kiệm một năm. */
function task41Interest() {
  return {
    id: 'r41-int',
    make: (rng) => ({ M: rng.pick([10, 20, 25, 30, 35, 50, 100]) * 1000000, k: rng.pick([4, 5, 5.5, 6, 6.5, 7, 7.4, 8]) }),
    async mount(f, { M, k }) {
      mark('r41-int');
      const lai = clean((M * k) / 100);
      f.q.innerHTML = `<small>Gửi tiết kiệm ${fmt(M)} đồng, lãi suất ${D(k)}% một năm.</small>Tiền lãi sau 1 năm: ${BOX} đồng · Cả gốc và lãi: ${BOX} đồng`;
      const t = createPct(f.tool, { value: 0, of: M, unitWord: 'đồng', buttons: false, edit: false });
      const [b1, b2] = f.q.querySelectorAll('.g4-box');
      await f.ask({ box: b1, answer: lai, max: 10, say: 'Sau một năm được bao nhiêu tiền lãi?', hint: `${fmt(M)} × ${D(k)} : 100.` });
      await t.fillTo(Math.floor(k), { gap: 120 });
      if (!Number.isInteger(k)) t.mode({ exact: k, note: () => `${D(k)}% của ${fmt(M)} = <b>${fmt(lai)}</b> đồng` });
      await f.ask({ box: b2, answer: M + lai, max: 10, say: 'Cả tiền gốc và tiền lãi là bao nhiêu?', hint: `${fmt(M)} + ${fmt(lai)}.` });
      f.finish({ ok: `Lãi ${fmt(lai)} đồng; cả gốc và lãi ${fmt(M + lai)} đồng.` });
    },
  };
}

/** Còn lại: N người, p1% áo đỏ, p2% áo vàng → áo xanh. */
function task41Remain() {
  return {
    id: 'r41-rem',
    make: (rng) => { const p1 = rng.int(4, 9) * 5, p2 = rng.int(2, 7) * 5; return { N: rng.pick([200, 300, 400, 500, 600, 800]), p1, p2 }; },
    async mount(f, { N, p1, p2 }) {
      mark('r41-rem');
      const p3 = 100 - p1 - p2, r = (N * p3) / 100;
      f.q.innerHTML = `<small>Đội đồng diễn có ${N} người: ${p1}% mặc áo đỏ, ${p2}% mặc áo vàng, còn lại mặc áo xanh.</small>Áo xanh: ${BOX} người`;
      const t = createPct(f.tool, { value: 0, of: N, unitWord: 'người', buttons: false, edit: false, color: '#F87171', note: (n) => (n ? `Đỏ và vàng: <b>${n}</b> ô · xanh: <b>${100 - n}</b> ô` : '&nbsp;') });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: r, max: 4, say: 'Có bao nhiêu người mặc áo xanh?',
        hint: (v) => (v === (N * p2) / 100 || v === (N * p1) / 100 ? 'Đó là áo đỏ hoặc áo vàng. Áo xanh là phần còn lại.' : `Áo xanh chiếm 100% − ${p1}% − ${p2}% = ${p3}%. ${N} × ${p3} : 100.`) });
      await t.fillTo(p1 + p2, { gap: 25 });
      f.finish({ ok: `Áo xanh ${p3}%: ${N} × ${p3} : 100 = ${r} người.` });
    },
  };
}

/** Lượng đạm trong thức ăn. */
function task41Protein() {
  const FOOD = [['thịt bò', 18], ['thịt lợn nạc', 19], ['cá chép', 17], ['đậu phụ', 11], ['trứng gà', 13]];
  return {
    id: 'r41-food',
    make: (rng) => ({ i: rng.int(0, FOOD.length - 1), m: rng.pick([100, 200, 250, 300, 400, 500]) }),
    async mount(f, { i, m }) {
      mark('r41-food');
      const [name, p] = FOOD[i];
      const r = clean((m * p) / 100);
      f.q.innerHTML = `<small>Trong ${name}, chất đạm chiếm khoảng ${p}%.</small>${m} g ${name} có ${BOX} g chất đạm`;
      const t = createPct(f.tool, { value: 0, of: m, unitWord: 'g', buttons: false, edit: false, color: '#FB923C' });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(r), max: 5, say: `${m} gam ${name} có bao nhiêu gam chất đạm?`, hint: `${p}% của ${m} g: ${m} × ${p} : 100.` });
      await t.fillTo(p, { gap: 40 });
      f.finish({ ok: `${m} × ${p} : 100 = ${D(r)} g` });
    },
  };
}

// ═══ Bài 42. Máy tính cầm tay ═══════════════════════════════════════════════════════════════════════
/**
 * Em bấm theo dãy phím seq (chuỗi gõ tắt của calc.js). Phím cần bấm tiếp theo nhấp nháy; bấm sai thì thầy nhắc và
 * bắt đầu lại từ đầu dãy (máy được xoá bằng ON/C).
 */
async function guidedKeys(c, t, seq, done = () => true) {
  const keys = t.tokens(seq);
  let i = 0;
  t.glow(keys[0]);
  let wait = false; // bấm sai: chờ ON/C rồi làm lại từ đầu
  const off = t.on((ev, k, user) => {
    if (ev !== 'key' || !user || i >= keys.length) return;
    if (k === 'ON/C') { wait = false; i = 0; t.glow(keys[0]); return; }
    if (!wait && k === keys[i]) { i++; t.glow(keys[i] ?? null); return; }
    if (!wait) c.hint(`Phím cần bấm là ${keys[i]}. Bấm ON/C rồi bấm lại từ đầu.`, `Cần bấm <b>${keys[i]}</b>. Bấm <b>ON/C</b> rồi làm lại.`);
    wait = true; i = 0;
    t.glow('ON/C');
  });
  await waitDo(c, t, () => i >= keys.length && done(), { nudge: () => `Bấm phím ${keys[i] ?? '='} đang nhấp nháy.` }, async () => { t.key('ON/C'); await t.press(seq, { gap: 60 }); i = keys.length; t.emit('key', '=', false); });
  off();
  t.glow(null);
}

const B42 = {
  explore: {
    setup: (board) => createCalc(board, { on: false }),
    steps: [
      async (c) => {
        const t = c.t;
        await c.say('Đây là máy tính cầm tay. Máy giúp ta làm phép tính nhanh hơn. Bấm phím ON/C màu đỏ để bật máy.', 'Bấm <b>ON/C</b> để bật máy');
        t.glow('ON/C');
        await waitDo(c, t, () => t.power, { nudge: 'Bấm phím đỏ ON/C ở hàng thứ tư.', el: () => t.btn('ON/C') }, () => t.key('ON/C'));
        t.glow(null);
        await c.say('Máy đã bật, màn hình hiện số 0. Phím OFF để tắt máy. Các phím số từ 0 đến 9 để nhập số. Các phím cộng, trừ, nhân, chia để chọn phép tính. Phím bằng để hiện kết quả. Phím CE xoá số vừa nhập sai.');
      },
      async (c) => {
        const t = c.t;
        t.key('ON/C'); t.clearTape();
        await c.say('Tính 128 cộng 136. Lần lượt bấm 1, 2, 8, cộng, 1, 3, 6, bằng.', `Tính 128 + 136: bấm ${keyChips('128+136=')}`);
        await guidedKeys(c, t, '128+136=', () => t.display === '264');
        await c.say('Màn hình hiện 264. Kết quả của phép tính là 264.', '128 + 136 = <b>264</b>');
      },
      async (c) => {
        const t = c.t;
        t.key('ON/C'); t.clearTape();
        await c.say('Rô-bốt bấm 5, cộng, 2, nhân, 3, bằng. Xem màn hình.', `Rô-bốt bấm ${keyChips('5+2×3=')}`);
        await t.press('5+2×3=');
        await c.say('Màn hình hiện 21. Em tự tính 5 cộng 2 nhân 3 bằng bao nhiêu?', 'Máy hiện <b>21</b>. Em tự tính 5 + 2 × 3 = ?');
        await c.choose(['21', '11', '13'].map((v) => ({ html: v, value: v })), '11', { hint: 'Nhân trước, cộng sau: 2 × 3 = 6, 5 + 6.' });
        await c.say('Đúng rồi! 5 cộng 2 nhân 3 bằng 11. Máy tính này làm lần lượt theo thứ tự bấm: 5 cộng 2 bằng 7, rồi 7 nhân 3 bằng 21. Phép tính nào bấm trước thì máy làm trước.', 'Máy làm lần lượt: (5 + 2) × 3 = 21. Phải bấm <b>2 × 3</b> trước!');
      },
      async (c) => {
        const t = c.t;
        t.key('ON/C'); t.clearTape();
        await c.say('Máy đo huyết áp giá 780 000 đồng, được hoàn 5 phần trăm. Dùng máy tính tìm 5 phần trăm của 780 000: bấm 780000, nhân, 5, phần trăm, bằng.', `5% của 780 000: bấm ${keyChips('780000×5%=')}`);
        await guidedKeys(c, t, '780000×5%=', () => t.display === '39000');
        await c.say('Màn hình hiện 39 000. Vậy 5 phần trăm của 780 000 là 39 000 đồng.', '5% của 780 000 = <b>39 000</b>');
      },
      async (c) => {
        const t = c.t;
        t.key('ON/C'); t.clearTape();
        await c.say('Tìm tỉ số phần trăm của 3 và 40: bấm 3, chia, 40, phần trăm, bằng.', `Tỉ số % của 3 và 40: bấm ${keyChips('3÷40%=')}`);
        await guidedKeys(c, t, '3÷40%=', () => t.display === '7.5');
        await c.say('Màn hình hiện 7.5. Dấu chấm trên máy là dấu phẩy. Tỉ số phần trăm của 3 và 40 là bao nhiêu?', 'Màn hình: <b>7.5</b> · tỉ số phần trăm = ?');
        await c.choose(['7,5%', '75%', '0,075%'].map((v) => ({ html: v, value: v })), '7,5%', { hint: 'Màn hình hiện 7.5, nghĩa là 7,5. Em viết thêm kí hiệu %.' });
        await c.say('Đúng rồi! 7,5 phần trăm. Máy không hiện kí hiệu phần trăm, em phải tự viết thêm.');
      },
    ],
  },
  tasks: () => [task42Match(), task42Use(), task42Order(), task42PctVal(), task42PctRatio(), task42Refund()],
};

/** Phép tính ↔ dãy phím. */
function task42Match() {
  return {
    id: 'r42-match',
    make: (rng) => { const op = rng.pick(['+', '-', '×', '÷']); let a = rng.int(100, 999), b = rng.int(11, 99); if (op === '÷') a = b * rng.int(12, 60); return { op, a, b }; },
    async mount(f, { op, a, b }) {
      mark('r42-match');
      const show = { '+': '+', '-': '−', '×': '×', '÷': ':' }[op];
      f.q.innerHTML = `Dãy phím nào tính <b>${fmt(a)} ${show} ${b}</b>?`;
      createCalc(f.tool, { tape: false });
      const wrongOp = { '+': '-', '-': '+', '×': '+', '÷': '×' }[op];
      const opts = [`${a}${op}${b}=`, `${b}${op}${a}=`, `${a}${wrongOp}${b}=`];
      if (op === '+' || op === '×') opts[1] = `${a}${op}${b}+`;
      await f.choose({ options: shuffleBy(opts, a + b).map((o) => ({ html: keyChips(o), value: o })), answer: opts[0], say: `Dãy phím nào tính ${fmt(a)} ${show === ':' ? 'chia' : show === '×' ? 'nhân' : show === '+' ? 'cộng' : 'trừ'} ${b}?`,
        hint: 'Bấm số thứ nhất, phím phép tính, số thứ hai, rồi phím bằng.' });
      f.finish({ ok: `Bấm ${a} ${show} ${b} rồi =.` });
    },
  };
}

/** Dùng máy tính để tính rồi ghi kết quả. */
function task42Use() {
  return {
    id: 'r42-use',
    make: (rng) => {
      const op = rng.pick(['+', '-', '×', '÷']);
      if (op === '÷') { const b = rng.pick([4, 5, 8, 16, 25, 32]); return { op, a: rng.int(101, 3000), b }; }
      if (op === '×') return { op, a: rng.int(101, 999), b: rng.int(11, 99) };
      return { op, a: rng.int(1000, 9999), b: rng.int(100, 999) };
    },
    async mount(f, { op, a, b }) {
      mark('r42-use');
      const r = clean(op === '+' ? a + b : op === '-' ? a - b : op === '×' ? a * b : a / b);
      const show = { '+': '+', '-': '−', '×': '×', '÷': ':' }[op];
      f.q.innerHTML = `Dùng máy tính: ${big(`${fmt(a)} ${show} ${b}`)} = ${BOX}`;
      const t = createCalc(f.tool);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: Number.isInteger(r) ? r : decKey(r), max: 8, say: 'Dùng máy tính để tính rồi ghi kết quả.',
        hint: `Bấm ${a} ${show === ':' ? '÷' : show} ${b} rồi bấm =. Màn hình có dấu chấm thì em viết dấu phẩy.` });
      if (t.display !== String(r)) { t.key('ON/C'); await t.press(`${a}${op}${b}=`, { gap: 120 }); }
      f.finish({ ok: `${fmt(a)} ${show} ${b} = ${D(r)}` });
    },
  };
}

/** Máy làm lần lượt: a + b × c = ? */
function task42Order() {
  return {
    id: 'r42-order',
    make: (rng) => ({ a: rng.int(2, 9), b: rng.int(2, 9), c: rng.int(2, 9), op: rng.pick(['+', '-']) }),
    async mount(f, { a, b, c, op }) {
      mark('r42-order');
      const A = op === '+' ? a : a + b * c + rng0(a);
      const machine = op === '+' ? (A + b) * c : (A - b) * c;
      const right = op === '+' ? A + b * c : A - b * c;
      const s = op === '+' ? '+' : '−';
      f.q.innerHTML = `Bấm ${keyChips(`${A}${op}${b}×${c}=`)} thì màn hình hiện số nào?`;
      const t = createCalc(f.tool);
      await f.choose({ options: shuffleBy(uniq([machine, right, A + b + c, machine + c]).slice(0, 3), a * 7 + c).map((v) => ({ html: String(v), value: v })), answer: machine, say: 'Máy tính làm lần lượt theo thứ tự bấm. Màn hình hiện số nào?',
        hint: (v) => (v === right ? `Đó là kết quả đúng khi tính nhân trước. Máy này làm lần lượt: ${A} ${s} ${b} trước, rồi nhân ${c}.` : `Máy tính ${A} ${s} ${b} trước, rồi nhân ${c}.`) });
      await t.press(`${A}${op}${b}×${c}=`, { gap: 260 });
      f.finish({ ok: `Máy: (${A} ${s} ${b}) × ${c} = ${machine}. Tính đúng: ${A} ${s} ${b} × ${c} = ${right}.` });
    },
  };
}
const rng0 = (a) => (a % 3) + 1;

/** Dùng máy tính tìm k% của N. */
function task42PctVal() {
  return {
    id: 'r42-pval',
    make: (rng) => ({ k: rng.int(2, 45), N: rng.pick([rng.int(12, 99), rng.int(2, 9) * 1000, rng.int(101, 999)]) }),
    async mount(f, { k, N }) {
      mark('r42-pval');
      const r = clean((N * k) / 100);
      f.q.innerHTML = `Dùng máy tính: <b>${k}% của ${fmt(N)}</b> = ${BOX}`;
      const t = createCalc(f.tool);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(r), max: 8, say: `Dùng máy tính tìm ${k} phần trăm của ${fmt(N)}.`,
        hint: `Bấm ${N} × ${k} % =. Màn hình có dấu chấm thì em viết dấu phẩy.` });
      if (Math.abs(t.value - r) > 1e-9) { t.key('ON/C'); await t.press(`${N}×${k}%=`, { gap: 120 }); }
      f.finish({ ok: `${k}% của ${fmt(N)} = ${D(r)}` });
    },
  };
}

/** Dùng máy tính tìm tỉ số phần trăm của a và b. */
function task42PctRatio() {
  return {
    id: 'r42-pratio',
    make: (rng) => { const b = rng.pick([8, 16, 20, 25, 40, 80, 125, 250]); return { a: rng.int(1, b - 1), b }; },
    async mount(f, { a, b }) {
      mark('r42-pratio');
      const p = clean((a / b) * 100);
      f.q.innerHTML = `Dùng máy tính: tỉ số phần trăm của <b>${a}</b> và <b>${b}</b> là ${BOX} %`;
      const t = createCalc(f.tool);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: decKey(p), max: 7, say: `Dùng máy tính tìm tỉ số phần trăm của ${a} và ${b}.`,
        hint: (v) => (Math.abs(v - (b / a) * 100) < 1e-6 ? `Bấm số nói trước: ${a} ÷ ${b} % =.` : `Bấm ${a} ÷ ${b} % =, rồi viết kết quả với kí hiệu %.`) });
      if (Math.abs(t.value - p) > 1e-9) { t.key('ON/C'); await t.press(`${a}÷${b}%=`, { gap: 120 }); }
      f.finish({ ok: `${a} ÷ ${b} % = ${D(p)} → ${D(p)}%` });
    },
  };
}

/** Hoá đơn: hoàn 10% cho đơn từ 1 000 000 đồng trở lên. */
function task42Refund() {
  const ITEMS = [['Áo len', 275000], ['Quần âu', 599000], ['Mũ', 120000], ['Áo khoác', 850000], ['Găng tay', 250000], ['Giày thể thao', 690000], ['Khăn quàng', 180000], ['Ba lô', 420000]];
  return {
    id: 'r42-refund',
    make: (rng) => { const n = rng.int(2, 3); return { pick: rng.shuffle(ITEMS.map((_, i) => i)).slice(0, n) }; },
    async mount(f, { pick }) {
      mark('r42-refund');
      const tot = pick.reduce((s, i) => s + ITEMS[i][1], 0);
      const back = tot >= 1000000 ? tot / 10 : 0;
      f.q.innerHTML = `<small>Hoàn 10% cho mọi đơn hàng <b>từ 1 000 000 đồng trở lên</b>. Hoá đơn: ${pick.map((i) => `${ITEMS[i][0]} ${fmt(ITEMS[i][1])} đ`).join(', ')}.</small>Số tiền được hoàn: ${BOX} đồng`;
      createCalc(f.tool);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: back, max: 8, say: 'Đơn hàng này được hoàn bao nhiêu tiền?',
        hint: (v) => (back === 0 ? `Tổng đơn là ${fmt(tot)} đồng, chưa tới 1 000 000 đồng nên không được hoàn: ghi 0.` : v === tot ? 'Đó là tổng đơn hàng. Tìm 10% của tổng.' : `Tổng đơn ${fmt(tot)} đồng. Bấm ${tot} × 10 % =.`) });
      f.finish({ ok: back ? `Tổng ${fmt(tot)} đồng, hoàn 10%: ${fmt(back)} đồng.` : `Tổng ${fmt(tot)} đồng < 1 000 000 đồng: không được hoàn.` });
    },
  };
}

export const RATIO_LESSONS = { 36: B36, 37: B37, 38: B38, 39: B39, 40: B40, 41: B41, 42: B42 };

/** Cấp Luyện Tính lớp 5 (grade5Drills): mỗi cấp một nhóm dạng câu, số mới mỗi lượt. */
export const RATIO_DRILL_LEVELS = [
  { id: 'd5-ratio-1', n: 1, title: 'Tỉ số, tỉ số phần trăm', desc: 'Vd. tỉ số của 23 và 17; 9/25 = 36%; 37,5 : 100 = 37,5%.', knowledge: 'tỉ số a : b, tỉ số phần trăm', sgk: 36,
    say: 'Số nói trước là tử số. Tỉ số có mẫu số 100 là tỉ số phần trăm!', tasks: [task36Write(), task36ToPct(), task36Dec(), task36Diagram(), task36Rest()] },
  { id: 'd5-ratio-2', n: 2, title: 'Tỉ lệ bản đồ', desc: 'Vd. tỉ lệ 1 : 10 000, trên bản đồ 15 cm thì thật là 1,5 km.', knowledge: 'tỉ lệ bản đồ, đổi cm ra m, km', sgk: 37,
    say: 'Độ dài thật bằng độ dài trên bản đồ nhân với mẫu số tỉ lệ, rồi đổi đơn vị!', tasks: [task37Real(), task37ToMap(), task37Measure(), task37Convert()] },
  { id: 'd5-ratio-3', n: 3, title: 'Tổng và tỉ số', desc: 'Vd. tổng 60, tỉ số 7/8: tìm hai số; "gấp 3 lần"; chu vi hình chữ nhật.', knowledge: 'sơ đồ, tổng số phần', sgk: 38,
    say: 'Vẽ sơ đồ, tìm tổng số phần, rồi chia tổng cho tổng số phần!', tasks: [task38Basic(), task38Times(), task38Gt1(), task38Rect(), task38Diff()] },
  { id: 'd5-ratio-4', n: 4, title: 'Hiệu và tỉ số', desc: 'Vd. hiệu 6, tỉ số 3/5: tìm hai số; bài toán tuổi.', knowledge: 'sơ đồ, hiệu số phần', sgk: 39,
    say: 'Hiệu ứng với các phần hơn: chia hiệu cho hiệu số phần!', tasks: [task39Basic(), task39Table(), task39Rect(), task39Age(), task39Candy()] },
  { id: 'd5-ratio-5', n: 5, title: 'Tìm tỉ số phần trăm', desc: 'Vd. 46 và 50 là 92%; 41 và 73 là 56,16%; vượt kế hoạch 15%.', knowledge: 'thương × 100, viết thêm %', sgk: 40,
    say: 'Tìm thương, nhân với 100 rồi viết thêm kí hiệu phần trăm!', tasks: [task40Two(), task40Div4(), task40Ops(), task40Plan(), task40Share()] },
  { id: 'd5-ratio-6', n: 6, title: 'Giá trị phần trăm của một số', desc: 'Vd. 60% của 300 tấn; giảm giá 15%; lãi suất 7,4% một năm.', knowledge: 'số × phần trăm : 100', sgk: 41,
    say: 'Muốn tìm phần trăm của một số: nhân với số phần trăm rồi chia 100!', tasks: [task41Value(), task41Discount(), task41Interest(), task41Remain(), task41Protein()] },
];
