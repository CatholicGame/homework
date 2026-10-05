/**
 * Bài 22 (Phép chia số thập phân), ✍️ chia đặt tính kiểu sách (lối rút gọn: chỉ ghi số dư và chữ số hạ xuống).
 * Khám phá: mảnh vườn 92,8 m² chia 4 phần (đổi ra 9 280 dm² : 4, rồi đặt tính 92,8 : 4, mốc "viết dấu phẩy vào bên phải 3"),
 *   19,95 : 19 (thương có chữ số 0), 26 m vải may 8 bộ (còn dư: dấu phẩy + thêm 0), nhận xét 4,5 : 9 = 45 : 90,
 *   nhào 2,48 kg bột với 1,6 l nước (đếm chữ số, gạch dấu phẩy số chia, dời dấu phẩy số bị chia).
 * Thực hành: dùng lại ➗ Chia số thập phân của Luyện Tính lớp 5 (grade5Drills/ddiv.js) cho 4 dạng, cùng các câu chọn:
 *   biết 7 657 : 31 = 247 tìm 765,7 : 31; dây kim tuyến cắt được nhiều nhất mấy sợi; chia đều (gõ số thập phân).
 */

import { createDivView, DDIV_GAME, DDIV_LEVELS, stepSay, showDec, decStr } from '../../grade5Drills/ddiv.js';
import { flyDigit, setUse, popIn, sleep } from '../../grade3Drills/kit.js';
import { createCanvas } from '../../grade4Tools/canvas.js';
import { BOX } from '../../grade4Tools/practice.js';
import { css, INK, sfx } from '../../grade4Tools/frame.js';
import { fmt } from '../num.js';

// ── Khám phá: thầy làm từng bước trên tờ vở ───────────────────────────────────────────────────────────
/** Vẽ kết quả một bước lên tờ vở (có chuyển động). */
async function playStep(v, s) {
  const { at, qCell, dvd, divEls } = v;
  if (s.kind === 'take') { v.taken(s.end); setUse(v.root, [...dvd.slice(0, s.end + 1), ...divEls]); return; }
  if (s.kind === 'q') { setUse(v.root, [...v.partialEls(s), ...divEls]); popIn(v.T(qCell(s.qi)), String(s.q)); return; }
  if (s.kind === 'rem') {
    setUse(v.root, null);
    const R = String(s.r);
    v.remEls(s).forEach((el, j) => setTimeout(() => popIn(v.T(el), R[j]), j * 120));
    await sleep(R.length * 120);
    return;
  }
  if (s.kind === 'comma') { setUse(v.root, null); v.qComma(s.qi); return; }
  if (s.kind === 'down') {
    setUse(v.root, null);
    if (s.inPlace) { dvd[s.col].classList.add('dd-taken'); sfx.pop(2); return; }
    const to = at(s.row, s.col);
    dvd[s.col].classList.add('dd-down');
    await new Promise(res => flyDigit(String(s.dig), dvd[s.col], to, { onLand: () => { v.T(to).textContent = String(s.dig); sfx.pop(2); res(); } }));
    return;
  }
  if (s.kind === 'zero') {
    setUse(v.root, null);
    popIn(v.T(at(s.row, s.col)), '0');
    at(s.row, s.col).classList.add('dd-zero');
    if (s.inPlace) v.inPlaceComma();
  }
}

/**
 * Thầy làm các bước của phép chia trên v. ask(s) → { prompt, options, answer, hint } để em chọn trước bước đó.
 * quick: chỉ hiện chữ (không đọc) cho phép chia đã quen.
 */
async function demo(c, v, { ask = () => null, quick = false } = {}) {
  const d = v.P.d;
  for (const s of v.S.steps) {
    const q = ask(s);
    if (q) {
      c.show(q.prompt);
      await c.choose(q.options.map((html, i) => ({ html, value: i })), q.answer, { hint: q.hint });
    }
    await playStep(v, s);
    const text = stepSay(s, d);
    if (quick) { c.show(text); await c.sleep(750); } else await c.say(text);
  }
  setUse(v.root, null);
  v.answer(showDec(v.S.Q));
}

/** Câu hỏi ở mốc dấu phẩy. */
const askComma = (s) => (s.kind !== 'comma' ? null : s.why === 'digit'
  ? { prompt: `<b>Hết phần nguyên.</b> Trước khi hạ ${s.dig}, em làm gì?`, options: [`Viết dấu phẩy vào bên phải ${s.lastQ} ở thương`, `Hạ ${s.dig} luôn`], answer: 0,
    hint: `Viết dấu phẩy vào thương trước khi lấy chữ số đầu tiên ở phần thập phân.` }
  : { prompt: `Còn dư <b>${s.r}</b>. Chia tiếp thế nào?`, options: [`Viết dấu phẩy vào thương, thêm 0 vào bên phải ${s.r}`, `Dừng lại, còn dư ${s.r}`], answer: 0,
    hint: 'Còn dư thì viết dấu phẩy vào thương rồi viết thêm 0 vào bên phải số dư, chia tiếp.' });

const div = (a, b, opts) => (board) => createDivView(board, a, b, { staticSetup: true, reserve: true, ...opts });

// Mảnh vườn chia 4 phần (hình vẽ riêng: đất nâu, hàng rào, cây con).
function gardenTool(board) {
  injectLessonStyles();
  const t = createCanvas(board, { w: 1000, h: 560, bg: '#E0F2FE' });
  const X = 170, Y = 190, W = 660, H = 270;
  const sprout = (x, y, c) => `<g transform="translate(${x} ${y})"><path d="M0 0 V-34" stroke="#15803D" stroke-width="5" stroke-linecap="round"/>
    <path d="M0 -20 Q-22 -34 -26 -16 Q-12 -10 0 -20 Z M0 -28 Q22 -44 28 -24 Q12 -18 0 -28 Z" fill="${c}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/></g>`;
  const plot = (i, c) => Array.from({ length: 6 }, (_, k) => sprout(X + i * (W / 4) + 38 + (k % 2) * 80, Y + 80 + Math.floor(k / 2) * 72, c)).join('');
  const COL = ['#4ADE80', '#A3E635', '#22C55E', '#86EFAC'];
  t.draw(`
    <rect x="-1000" y="-900" width="3000" height="1100" fill="#BAE6FD"/>
    <rect x="-1000" y="150" width="3000" height="1200" fill="#86EFAC"/>
    <circle cx="890" cy="70" r="40" fill="#FDE047" stroke="${INK}" stroke-width="4"/>
    <g fill="#fff" stroke="${INK}" stroke-width="3"><ellipse cx="160" cy="70" rx="58" ry="22"/><ellipse cx="560" cy="52" rx="48" ry="18"/></g>
    <path d="M-1000 150 Q-750 110 -500 150 T0 150 Q250 110 500 150 T1000 140 Q1250 110 1500 150 T2000 150 V1400 H-1000 Z" fill="#86EFAC" stroke="${INK}" stroke-width="4"/>
    ${Array.from({ length: 61 }, (_, i) => `<rect x="${i * 50 - 994}" y="96" width="22" height="70" rx="4" fill="#FCD34D" stroke="${INK}" stroke-width="3"/>`).join('')}
    <path d="M-1000 116 H2000 M-1000 146 H2000" stroke="${INK}" stroke-width="3"/>
    ${[[60, 600], [900, 640], [120, 760], [820, 820]].map(([x, y]) => `<g transform="translate(${x} ${y})"><path d="M0 0 Q-14 -40 -30 -46 M0 0 Q4 -44 0 -58 M0 0 Q16 -38 32 -44" stroke="#15803D" stroke-width="6" fill="none" stroke-linecap="round"/></g>`).join('')}
    <rect x="${X}" y="${Y}" width="${W}" height="${H}" rx="12" fill="#A16207" stroke="${INK}" stroke-width="5"/>
    ${[1, 2, 3].map(i => `<line class="dd-gline" x1="${X + i * W / 4}" y1="${Y + 6}" x2="${X + i * W / 4}" y2="${Y + H - 6}" stroke="#FEF3C7" stroke-width="7" stroke-dasharray="16 12" pathLength="1" opacity="0"/>`).join('')}
    <g class="dd-plants" opacity="0">${COL.map((cc, i) => plot(i, cc)).join('')}</g>
    <g class="dd-gtag"><rect x="${X + W / 2 - 110}" y="${Y - 30}" width="220" height="60" rx="30" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <text x="${X + W / 2}" y="${Y + 12}" class="g4v-t" font-size="38">92,8 m²</text></g>
    ${[0, 1, 2, 3].map(i => `<g class="dd-ptag" opacity="0"><rect x="${X + i * W / 4 + 22}" y="${Y + H - 62}" width="${W / 4 - 44}" height="46" rx="23" fill="#fff" stroke="${INK}" stroke-width="3"/>
      <text x="${X + i * W / 4 + W / 8}" y="${Y + H - 28}" class="g4v-t" font-size="28">? m²</text></g>`).join('')}
    <text x="500" y="525" class="g4v-t" font-size="44">92,8 : 4 = ? (m²)</text>`);
  t.caption('🌱 Mảnh vườn <b>92,8 m²</b> chia đều thành <b>4 phần</b>');
  t.split = async () => {
    for (const el of t.qa('.dd-gline')) { el.setAttribute('opacity', 1); el.animate([{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 500, fill: 'both' }); sfx.pop(2); await sleep(380); }
    await t.anim('.dd-plants', [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], 600);
    await t.anim('.dd-ptag', [{ opacity: 0 }, { opacity: 1 }], 400, { stagger: 120 });
  };
  return t;
}

// Nhận xét: nhân số bị chia và số chia với cùng một số khác 0 thì thương không đổi.
function compareTool(board) {
  injectLessonStyles();
  const t = createCanvas(board, { w: 1000, h: 560 });
  const line = (y, cls, html) => `<text x="500" y="${y}" class="g4v-t ${cls}" font-size="54" opacity="0">${html}</text>`;
  const R = '<tspan fill="#DC2626">';
  t.draw(`
    <rect x="20" y="20" width="960" height="420" rx="24" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="3"/>
    ${line(110, 'dd-l1', '4,5 : 9 = <tspan fill="#1D4ED8">0,5</tspan>')}
    ${line(215, 'dd-l2', `(4,5 ${R}× 10</tspan>) : (9 ${R}× 10</tspan>)`)}
    ${line(305, 'dd-l3', '= 45 : 90 = <tspan fill="#1D4ED8">0,5</tspan>')}
    ${line(405, 'dd-l4', `57 : 9,5 = (57 ${R}× 10</tspan>) : (9,5 ${R}× 10</tspan>) = 570 : 95`)}
    <text x="500" y="510" class="g4v-t dd-l5" font-size="40" style="fill:#15803D" opacity="0">Thương không thay đổi</text>`);
  t.caption('Tính rồi so sánh kết quả');
  t.show = (k) => t.anim(`.dd-l${k}`, [{ opacity: 0, transform: 'translateY(16px)' }, { opacity: 1, transform: 'none' }], 450);
  return t;
}

const B22 = {
  explore: {
    setup: (board) => gardenTool(board),
    steps: [
      async (c) => {
        await c.say('Mảnh vườn này có diện tích 92,8 mét vuông, chú chia đều thành 4 phần, mỗi phần ươm một giống cây. Diện tích mỗi phần là bao nhiêu mét vuông?');
        await c.t.split();
        await c.say('Lấy diện tích mảnh vườn chia cho 4. Đây là phép chia số thập phân cho số tự nhiên.');
      },
      async (c) => {
        const v = c.use(div('9280', '4', { title: '92,8 m² = 9 280 dm².', unit: '(dm²)' }));
        await c.say('Đổi 92,8 mét vuông bằng 9 280 đề-xi-mét vuông. Ta chuyển về phép chia hai số tự nhiên: 9 280 chia 4.');
        await demo(c, v, { quick: true });
        c.show('2 320 dm² = ? m²');
        await c.choose([{ html: '232 m²', value: 1 }, { html: '23,2 m²', value: 2 }, { html: '2,32 m²', value: 3 }], 2, { hint: '100 dm² = 1 m², nên 2 320 dm² = 23,2 m².' });
        await c.say('2 320 đề-xi-mét vuông bằng 23,2 mét vuông. Vậy 92,8 chia 4 bằng 23,2 mét vuông.', '92,8 : 4 = <b>23,2</b> (m²)');
      },
      async (c) => {
        const v = c.use(div('92,8', '4', { title: 'Ta đặt tính rồi tính:', unit: '(m²)' }));
        await c.say('Bây giờ đặt tính 92,8 chia 4 như sau. Chia phần nguyên trước.');
        await demo(c, v, { ask: askComma });
        await c.say('Vậy 92,8 chia 4 bằng 23,2.', '92,8 : 4 = <b>23,2</b> (m²)');
        await c.say('Muốn chia một số thập phân cho một số tự nhiên: chia phần nguyên, viết dấu phẩy vào bên phải thương trước khi lấy chữ số đầu tiên ở phần thập phân, rồi chia tiếp.',
          '① Chia phần nguyên · ② <b>viết dấu phẩy</b> vào thương trước khi hạ chữ số phần thập phân · ③ chia tiếp');
      },
      async (c) => {
        const v = c.use(div('19,95', '19', { title: 'Đặt tính rồi tính:' }));
        await c.say('Thêm một phép chia: 19,95 chia 19.');
        await demo(c, v, {
          ask: (s) => (s.kind === 'q' && s.q === 0
            ? { prompt: `<b>${s.partial}</b> chia 19 được mấy?`, options: ['0', '1'], answer: 0, hint: `${s.partial} bé hơn 19, được 0. Viết 0 vào thương.` }
            : askComma(s)),
        });
        await c.say('19,95 chia 19 bằng 1,05. Số đem chia bé hơn số chia thì viết 0 vào thương, đừng bỏ sót.', '19,95 : 19 = <b>1,05</b> · nhớ chữ số <b>0</b>');
      },
      async (c) => {
        const v = c.use(div('26', '8', { title: '🧵 26 m vải may 8 bộ:', unit: '(m)' }));
        await c.say('Rô-bốt cần 26 mét vải để may 8 bộ quần áo như nhau. May một bộ cần bao nhiêu mét vải? Ta chia 26 cho 8.');
        let zeroAsked = false;
        await demo(c, v, {
          ask: (s) => {
            if (s.kind === 'zero' && v.S.steps.indexOf(s) > v.S.steps.findIndex(x => x.kind === 'zero') && !zeroAsked) {
              zeroAsked = true;
              return { prompt: `Còn dư <b>${s.from}</b>. Làm gì tiếp?`, options: [`Viết thêm 0 vào bên phải ${s.from}`, 'Viết thêm một dấu phẩy nữa'], answer: 0, hint: 'Thương đã có dấu phẩy rồi. Chỉ viết thêm 0 vào bên phải số dư.' };
            }
            return askComma(s);
          },
        });
        await c.say('Vậy 26 chia 8 bằng 3,25. Mỗi bộ cần 3,25 mét vải.', '26 : 8 = <b>3,25</b> (m)');
        await c.say('Chia số tự nhiên cho số tự nhiên mà còn dư: viết dấu phẩy vào bên phải thương, viết thêm chữ số 0 vào bên phải số dư rồi chia tiếp. Còn dư nữa thì lại thêm 0.',
          'Còn dư: <b>dấu phẩy</b> vào thương · <b>thêm 0</b> vào số dư · chia tiếp');
      },
      async (c) => {
        const t = c.use(compareTool);
        await c.say('Tính rồi so sánh kết quả: 4,5 chia 9, và 4,5 nhân 10 chia cho 9 nhân 10.');
        await t.show(1);
        await c.say('4,5 chia 9 bằng 0,5.');
        await t.show(2);
        await t.show(3);
        await c.say('4,5 nhân 10 là 45, 9 nhân 10 là 90. 45 chia 90 cũng bằng 0,5.');
        c.show('Hai thương thế nào?');
        await c.choose([{ html: 'Bằng nhau', value: 1 }, { html: 'Thương sau gấp 10 lần', value: 2 }], 1, { hint: 'Cả hai đều bằng 0,5.' });
        await t.show(5);
        await c.say('Khi nhân số bị chia và số chia với cùng một số khác 0 thì thương không thay đổi.', 'Nhân số bị chia và số chia với cùng một số khác 0 thì <b>thương không đổi</b>');
        await t.show(4);
        await c.say('Nhờ vậy, 57 chia 9,5 bằng 570 chia 95: số chia không còn dấu phẩy.', '57 : 9,5 = <b>570 : 95</b> = 6');
      },
      async (c) => {
        const v = c.use(div('2,48', '1,6', { title: '🥣 Nhào bột:', unit: '(kg)' }));
        await c.say('Nhào 2,48 ki-lô-gam bột mì thì cần 1,6 lít nước. Mỗi lít nước nhào với bao nhiêu ki-lô-gam bột mì? Ta chuyển về phép chia cho số tự nhiên.');
        c.show('Phần thập phân của <b>1,6</b> có mấy chữ số?');
        await c.choose([{ html: '1 chữ số', value: 1 }, { html: '2 chữ số', value: 2 }], 1, { hint: 'Sau dấu phẩy của 1,6 chỉ có chữ số 6.' });
        v.badge(v.P.B.length - 1, 1);
        await c.say('Phần thập phân của số 1,6 có một chữ số. Bỏ dấu phẩy ở số 1,6 được 16.');
        v.crossDivisor();
        await c.sleep(600);
        await c.say('Chuyển dấu phẩy của số 2,48 sang bên phải một chữ số được 24,8.');
        await v.hop();
        v.clearBadges();
        await v.endHop();
        await c.say('Thực hiện phép chia 24,8 chia 16.', 'Chia <b>24,8 : 16</b>');
        await demo(c, v, { ask: askComma });
        await c.say('Vậy 2,48 chia 1,6 bằng 1,55 ki-lô-gam.', '2,48 : 1,6 = <b>1,55</b> (kg)');
        await c.say('Muốn chia cho số thập phân: đếm chữ số ở phần thập phân của số chia, chuyển dấu phẩy ở số bị chia sang phải bấy nhiêu chữ số, thiếu thì viết thêm 0. Bỏ dấu phẩy ở số chia rồi chia như chia cho số tự nhiên.',
          'Đếm chữ số thập phân của số chia · <b>dời dấu phẩy</b> số bị chia sang phải bấy nhiêu chữ số (thiếu thì thêm 0) · bỏ dấu phẩy số chia');
      },
    ],
  },
  tasks: () => [
    taskDiv('d22a', 0), taskDiv('d22b', 1), taskDiv('d22c', 2), taskDiv('d22d', 3),
    taskKnown(), taskRibbon(), taskShare(),
  ],
};

// ── Thực hành ────────────────────────────────────────────────────────────────────────────────────────
/** Chia đặt tính: giao cả màn cho ➗ Chia số thập phân của Luyện Tính lớp 5. */
function taskDiv(id, lv) {
  return {
    id,
    make: (rng) => { const m = DDIV_LEVELS[lv].gen(rng, rng.int(0, 5)); return { a: m.a, b: m.b }; },
    stage(stage, m, api) { DDIV_GAME.mountMission(stage, m, DDIV_LEVELS[lv], api); },
  };
}

/** Biết 7 657 : 31 = 247, tìm 765,7 : 31 (dấu phẩy số bị chia dời sang trái → thương cũng vậy). */
function taskKnown() {
  return {
    id: 'knowndiv',
    make: (rng) => {
      for (;;) {
        const d = rng.int(12, 48), Q = rng.int(102, 899);
        if (d % 10 === 0 || Q % 10 === 0) continue;
        const N = Q * d;
        if (N < 1000 || N % 10 === 0) continue;
        const s = rng.pick([1, 2]);
        const opts = rng.shuffle([decStr(Q, s), decStr(Q, s - 1), decStr(Q, s + 1)]);
        return { N, d, Q, s, opts };
      }
    },
    async mount(f, { N, d, Q, s, opts }) {
      injectLessonStyles();
      const a = decStr(N, s), ans = decStr(Q, s);
      const k = 10 ** s;
      f.q.innerHTML = `Biết ${fmt(N)} : ${d} = ${fmt(Q)}.<small>Không thực hiện phép tính, tìm kết quả:</small>`;
      // Hai phép chia thẳng hàng; mũi tên đỏ ": 10" chỉ số bị chia giảm, sau khi chọn đúng thì hiện ở thương.
      f.tool.innerHTML = `<div class="dd-known">
          <span class="dd-k1">${fmt(N)}</span><span>: ${d} =</span><span class="dd-k3">${fmt(Q)}</span>
          <span class="dd-kar">⬇ : ${fmt(k)}</span><span></span><span class="dd-kar dd-kar-q">⬇ : ${fmt(k)}</span>
          <span class="dd-k1">${showDec(a)}</span><span>: ${d} =</span><span class="dd-k3">${BOX}</span>
        </div>`;
      await f.choose({
        options: opts.map(o => ({ html: showDec(o), value: o })), answer: ans,
        say: `Biết ${fmt(N)} chia ${d} bằng ${fmt(Q)}. Tìm ${showDec(a)} chia ${d}.`,
        hint: `${fmt(N)} giảm ${fmt(k)} lần được ${showDec(a)}, số chia giữ nguyên, nên thương cũng giảm ${fmt(k)} lần.`,
      });
      const box = f.tool.querySelector('.g4-box');
      box.textContent = showDec(ans);
      box.classList.add('g4-box-ok');
      f.tool.querySelector('.dd-kar-q').classList.add('dd-kar-on');
      sfx.pop(3);
      f.finish({ ok: `${showDec(a)} : ${d} = ${showDec(ans)}` });
    },
  };
}

/** Dây kim tuyến 12,6 m cắt thành sợi 1,2 m: được nhiều nhất mấy sợi (phần thừa không đủ một sợi). */
function taskRibbon() {
  return {
    id: 'ribbon',
    make: (rng) => {
      for (;;) {
        const p = rng.int(8, 25);
        if (p % 10 === 0) continue;
        const n = rng.int(4, 12), rest = rng.int(1, p - 1);
        const L = p * n + rest;
        if (L % 10 === 0) continue;
        return { p, n, rest, L, opts: rng.shuffle([n - 1, n, n + 1]) };
      }
    },
    async mount(f, { p, n, rest, L, opts }) {
      const Ls = showDec(decStr(L, 1)), ps = showDec(decStr(p, 1)), rs = showDec(decStr(rest, 1));
      f.q.innerHTML = `Có ${Ls} m dây kim tuyến, cắt thành các sợi dài ${ps} m.<small>Cắt được nhiều nhất mấy sợi?</small>`;
      f.tool.innerHTML = ribbonPic(L, p, n);
      await f.choose({
        options: opts.map(o => ({ html: `${o} sợi`, value: o })), answer: n,
        say: `Có ${Ls} mét dây kim tuyến, cắt thành các sợi dài ${ps} mét. Cắt được nhiều nhất mấy sợi?`,
        hint: `${Ls} : ${ps} được ${n}, còn thừa ${rs} m, chưa đủ một sợi.`,
      });
      f.tool.querySelectorAll('.dd-rb-cut').forEach((el, i) => setTimeout(() => el.classList.add('dd-rb-on'), i * 90));
      f.tool.querySelector('.dd-rb').classList.add('dd-rb-shown');
      f.finish({ ok: `${Ls} : ${ps} được ${n}, thừa ${rs} m. Nhiều nhất ${n} sợi.` });
    },
  };
}
/** Dây kim tuyến: dải dài tỉ lệ với số mét, vạch cắt mờ; đúng thì vạch đỏ và số thứ tự từng sợi hiện ra. */
function ribbonPic(L, p, n) {
  injectLessonStyles();
  const W = 1000, x0 = 24, k = (W - 48) / L, Ls = showDec(decStr(L, 1)), ps = showDec(decStr(p, 1));
  const x = (m) => x0 + m * k;
  const cuts = Array.from({ length: n }, (_, i) => `<line class="dd-rb-cut" x1="${x((i + 1) * p)}" y1="92" x2="${x((i + 1) * p)}" y2="196"/>`).join('');
  const nums = Array.from({ length: n }, (_, i) => `<text class="dd-rb-n" x="${x(i * p + p / 2)}" y="158" text-anchor="middle" font-weight="900" font-size="${Math.min(44, p * k * 0.55)}">${i + 1}</text>`).join('');
  const brace = (a, b, y, lbl, col) => `<path d="M${x(a)} ${y + 14} V${y} H${x(b)} V${y + 14}" fill="none" stroke="${col}" stroke-width="4"/>
    <text x="${(x(a) + x(b)) / 2}" y="${y - 10}" text-anchor="middle" font-weight="800" font-size="34" fill="${col}">${lbl}</text>`;
  return `<svg class="dd-rb" viewBox="0 0 ${W} 262" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
    <defs><pattern id="ddrb" width="34" height="34" patternUnits="userSpaceOnUse"><rect width="34" height="34" fill="#F472B6"/><path d="M0 34 L34 0" stroke="#FDE047" stroke-width="9"/></pattern></defs>
    ${brace(0, L, 44, `${Ls} m`, INK)}
    <rect x="${x0}" y="104" width="${L * k}" height="80" rx="10" fill="url(#ddrb)" stroke="${INK}" stroke-width="4"/>
    <rect x="${x(n * p)}" y="106" width="${(L - n * p) * k - 2}" height="76" fill="#fff" opacity="0.5"/>
    ${cuts}${nums}
    <path d="M${x(0)} 196 V212 H${x(p)} V196" fill="none" stroke="#0369A1" stroke-width="4"/>
    <text x="${x0}" y="250" font-weight="800" font-size="32" fill="#0369A1">Mỗi sợi ${ps} m</text>
  </svg>`;
}

/** Chia đều (bài toán lời văn): gõ thương là số thập phân. */
const SHARE = [
  { what: 'yến cá', into: 'khay', unit: 'yến', lo: 81, hi: 260, n: [4, 8], fill: '#7DD3FC', box: '#F59E0B' },
  { what: 'kg kẹo', into: 'hộp', unit: 'kg', lo: 105, hi: 480, n: [3, 8], fill: '#F9A8D4', box: '#A855F7' },
  { what: 'l dầu', into: 'can', unit: 'l', lo: 125, hi: 590, n: [2, 6], fill: '#FDE047', box: '#22C55E' },
  { what: 'kg gạo', into: 'túi', unit: 'kg', lo: 112, hi: 365, n: [3, 8], fill: '#F5F5F4', box: '#3B82F6' },
];
/** Một đống lớn (tổng) chia ra n thùng nhỏ có nhãn "?" (đúng thì hiện số). */
function sharePic(S, Ts, n) {
  const W = 1000, bw = Math.min(150, (W - 40) / n - 16), gap = (W - n * bw) / (n + 1);
  const box = (x, y, w, h, lbl, cls) => `<g><rect x="${x}" y="${y + h * 0.28}" width="${w}" height="${h * 0.72}" rx="${w * 0.08}" fill="${S.box}" stroke="${INK}" stroke-width="4"/>
    <path d="M${x + w * 0.1} ${y + h * 0.3} Q${x + w * 0.5} ${y - h * 0.08} ${x + w * 0.9} ${y + h * 0.3} Z" fill="${S.fill}" stroke="${INK}" stroke-width="3"/>
    <rect x="${x + w * 0.12}" y="${y + h * 0.48}" width="${w * 0.76}" height="${h * 0.36}" rx="${h * 0.1}" fill="#fff" stroke="${INK}" stroke-width="2.5"/>
    <text x="${x + w / 2}" y="${y + h * 0.75}" text-anchor="middle" font-weight="800" fill="${INK}" class="${cls}" font-size="${Math.min(h * 0.24, w * 0.24)}">${lbl}</text></g>`;
  const cx = W / 2, top = box(cx - 150, 10, 300, 150, `${Ts} ${S.unit}`, '');
  const ys = 250, bh = 120;
  const lines = Array.from({ length: n }, (_, i) => `<path d="M${cx} 165 Q${cx} 215 ${gap + i * (bw + gap) + bw / 2} ${ys + 10}" fill="none" stroke="#94A3B8" stroke-width="4" stroke-dasharray="10 8"/>`).join('');
  const boxes = Array.from({ length: n }, (_, i) => box(gap + i * (bw + gap), ys, bw, bh, '?', 'dd-sh-q')).join('');
  return `<svg class="dd-share" viewBox="0 0 ${W} ${ys + bh + 10}" preserveAspectRatio="xMidYMid meet" aria-hidden="true">${lines}${top}${boxes}</svg>`;
}
function taskShare() {
  return {
    id: 'share',
    make: (rng) => {
      for (;;) {
        const it = rng.int(0, SHARE.length - 1), S = SHARE[it];
        const n = rng.int(S.n[0], S.n[1]), each = rng.int(S.lo, S.hi);
        if (each % 10 === 0) continue;
        const T = each * n;
        if (T % 10 === 0) continue;
        return { it, n, each, T };
      }
    },
    async mount(f, { it, n, each, T }) {
      injectLessonStyles();
      const S = SHARE[it];
      const Ts = showDec(decStr(T, 2)), ans = decStr(each, 2);
      f.q.innerHTML = `Rô-bốt chia đều ${Ts} ${S.what} vào ${n} ${S.into}.<small>Mỗi ${S.into} có bao nhiêu ${S.unit}?</small>`;
      f.tool.innerHTML = `${sharePic(S, Ts, n)}<div class="dd-big dd-big-s">${Ts} : ${n} = ${BOX} <span class="dd-unit2">(${S.unit})</span></div>`;
      await f.ask({
        box: f.tool.querySelector('.g4-box'), answer: ans, max: ans.length + 1,
        say: `Rô-bốt chia đều ${Ts} ${S.what} vào ${n} ${S.into}. Mỗi ${S.into} có bao nhiêu?`,
        hint: `Đặt tính ${Ts} chia ${n}: chia phần nguyên, viết dấu phẩy vào thương rồi chia tiếp. Được ${showDec(ans)}.`,
      });
      f.tool.querySelectorAll('.dd-sh-q').forEach((el, i) => setTimeout(() => { el.textContent = showDec(ans); el.classList.add('dd-sh-on'); }, i * 90));
      f.finish({ ok: `${Ts} : ${n} = ${showDec(ans)} (${S.unit})` });
    },
  };
}

let styled = false;
function injectLessonStyles() {
  if (styled) return;
  styled = true;
  css('dd-lesson', `
    .dd-big { font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(12cqh, 7cqi); text-align: center; margin: auto; white-space: nowrap; }
    .dd-big .g4-box { min-width: 2.6em; height: 1.2em; }
    .dd-unit2 { color: #64748B; font-size: 0.7em; }
    .dd-known { margin: auto; display: grid; grid-template-columns: auto auto auto; align-items: center; column-gap: 0.3em; row-gap: 0.1em;
      font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; font-size: min(11cqh, 6.4cqi); line-height: 1.15; }
    .dd-k1 { text-align: right; }
    .dd-k3 { text-align: left; }
    .dd-known .g4-box { min-width: 2.6em; height: 1.2em; }
    .dd-kar { color: #DC2626; font-size: 0.5em; text-align: center; }
    .dd-kar-q { visibility: hidden; }
    .dd-kar-q.dd-kar-on { visibility: visible; animation: g3dPopIn .35s cubic-bezier(.2,1.5,.4,1); }
    .dd-share { flex: 1 1 0; min-height: 0; width: 100%; display: block; }
    .dd-big-s { flex: none; margin: 0.2em auto 0; font-size: min(10cqh, 6cqi); }
    .dd-sh-on { fill: #15803D; }
    .dd-rb { width: 100%; flex: 1 1 0; min-height: 0; margin: auto; display: block; }
    .dd-rb-n { fill: #fff; stroke: #3F3A40; stroke-width: 6px; paint-order: stroke; opacity: 0; }
    .dd-rb-on ~ .dd-rb-n, .dd-rb-shown .dd-rb-n { opacity: 1; transition: opacity .3s; }
    .dd-rb-cut { stroke: #94A3B8; stroke-width: 4; stroke-dasharray: 8 7; }
    .dd-rb-cut.dd-rb-on { stroke: #DC2626; stroke-dasharray: none; stroke-width: 5; }
  `);
}

export const DIV_LESSONS = { 22: B22 };
