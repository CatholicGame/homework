/**
 * 🔍 Máy phóng to – thu nhỏ — cỗ máy biến hình trong phòng thí nghiệm. Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.3.
 *   mul:   n quả vào máy "gấp t lần" → ra bao nhiêu? Máy chạy: ra t hàng, mỗi hàng n quả (lần 1, lần 2…).
 *   div:   N quả vào máy "giảm t lần" → ra bao nhiêu? Máy chia N quả thành t phần bằng nhau, đưa ra 1 phần.
 *   guess: bảng thử máy có 2 lần (vào → ra); bé đoán máy làm gì: gấp / giảm … lần, thêm / bớt … (bẫy "thêm 3" hay "gấp 3").
 *   cmp:   rổ to N quả, rổ nhỏ n quả → rổ to gấp mấy lần rổ nhỏ? Máy gấp rổ nhỏ lên từng lần tới khi bằng rổ to.
 * Bé gõ số trước, rồi kéo cần gạt cho máy chạy để kiểm chứng (bé tự xác nhận — máy không báo trước).
 * Dùng khung quầy của Chợ phiên (market/stall.js), theme 'lab'.
 */

import { machineSvg, machineIcon, numCardSvg, dispSize } from './art/machine.js';
import { FRUITS } from './art/fruits.js';
import { LAB_NPCS as NPCS, cap } from './npc.js';
import { mountStall, Q } from './market/stall.js';
import { stallMeta, levelMeta } from './catalog.js';
import { sfx } from '../preschool/fx.js';
import { flyOne, svgBoxOnScreen, calmMotion } from './fly.js';

const FRUIT_IDS = ['tao', 'cam', 'xoai', 'chanh', 'dau'];
const itemSvg = (f) => `<svg class="g3m-it" viewBox="-20 -24 40 44" aria-hidden="true">${FRUITS[f].draw(0, 0, 14)}</svg>`;
const fruitPic = (f, size = 26) => itemSvg(f).replace('class="g3m-it"', `width="${size}" height="${size}"`);
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
// Khay ra lúc máy chưa chạy: dấu "?" to ở giữa khay.
const WAIT = `<div class="g3m-wait">${Q}</div>`;

const RULES = {
  mul: { word: 'Gấp', unit: 'lần', disp: (x) => `GẤP ${x} LẦN`, apply: (a, x) => a * x, text: (x) => `gấp ${x} lần` },
  div: { word: 'Giảm', unit: 'lần', disp: (x) => `GIẢM ${x} LẦN`, apply: (a, x) => (a % x ? null : a / x), text: (x) => `giảm ${x} lần` },
  add: { word: 'Thêm', unit: '', disp: (x) => `THÊM ${x}`, apply: (a, x) => a + x, text: (x) => `thêm ${x}` },
  sub: { word: 'Bớt', unit: '', disp: (x) => `BỚT ${x}`, apply: (a, x) => (a - x < 0 ? null : a - x), text: (x) => `bớt ${x}` },
};
const SIGN = { mul: '×', div: ':', add: '+', sub: '−' };

export const MACHINE_LEVELS = [
  {
    ...levelMeta('machine-1'), missions: 5,
    knowledge: 'gấp một số lên một số lần',
    ask: (n) => `Máy gấp lên, đoán xem máy ra bao nhiêu quả!`,
    desc: '4 quả táo vào máy "gấp 3 lần" → máy ra 3 hàng, mỗi hàng 4 quả: 4 × 3 = 12 quả.',
    kind: 'mul',
    how: [['🍎', 'Cho vào máy'], ['🧮', 'Đoán số quả'], ['machine', 'Kéo cần gạt']],
  },
  {
    ...levelMeta('machine-2'), missions: 5,
    knowledge: 'giảm một số đi một số lần',
    ask: (n) => `Máy thu nhỏ, đoán xem còn lại bao nhiêu quả!`,
    desc: '12 quả vào máy "giảm 3 lần" → máy chia 12 quả thành 3 phần bằng nhau, ra 1 phần: 12 : 3 = 4 quả.',
    kind: 'div',
    how: [['🍎', 'Cho vào máy'], ['🧮', 'Đoán số quả'], ['machine', 'Kéo cần gạt']],
  },
  {
    ...levelMeta('machine-3'), missions: 6,
    knowledge: 'gấp một số lên một số lần, giảm một số đi một số lần',
    ask: (n) => `Máy này làm gì? Gấp, giảm, thêm hay bớt? Xem bảng thử rồi đoán!`,
    desc: 'Bảng thử máy: 3 → 9, 5 → 15. Máy "gấp 3 lần" (không phải "thêm 6", thử lại với số 5 là thấy).',
    kind: 'guess',
    how: [['📋', 'Xem bảng thử'], ['❓', 'Chọn phép'], ['machine', 'Kéo cần gạt']],
  },
  {
    ...levelMeta('machine-4'), missions: 5,
    knowledge: 'so sánh số lớn gấp mấy lần số bé',
    ask: (n) => `Rổ to gấp mấy lần rổ nhỏ? Cho máy gấp rổ nhỏ lên là biết!`,
    desc: 'Rổ to 24 quả, rổ nhỏ 6 quả: 24 : 6 = 4, rổ to gấp 4 lần rổ nhỏ.',
    kind: 'cmp',
    how: [['🧺', 'Hai rổ'], ['🧮', 'Gấp mấy lần?'], ['machine', 'Kéo cần gạt']],
  },
];

export const MACHINE_GAME = {
  ...stallMeta('machine'),
  unitWord: 'lượt thử',
  npcs: NPCS, // người trong phòng thí nghiệm + bạn nhỏ đến xem máy
  levels: MACHINE_LEVELS,
  stallIcon: () => machineIcon(56),
  summaryText: (ok, total) => `Em đã đoán đúng <strong>${ok}/${total}</strong> lượt thử máy.`,

  howTo(level) {
    const pic = (p) => (p === 'machine' ? machineIcon(46) : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Khách vui' }];
  },

  makeMission(rng, level, history) {
    const prev = history[history.length - 1];
    const recentNpcs = history.slice(-3).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    const f = rng.pick(FRUIT_IDS.filter(x => x !== prev?.f));
    const base = { npc, kind: level.kind, f };
    const pickNot = (lo, hi, not) => { let v; do { v = rng.int(lo, hi); } while (v === not && hi > lo); return v; };
    if (level.kind !== 'guess') {
      // Cặp (số quả, số lần) không lặp lại trong cả ván.
      const seen = new Set(history.map(h => `${h.n ?? h.v}-${h.t}`));
      let a, t;
      do { a = pickNot(2, 9, prev?.n ?? prev?.v); t = pickNot(2, 5, prev?.t); } while (seen.has(`${a}-${t}`));
      if (level.kind === 'div') return { ...base, v: a, t, N: a * t };
      return { ...base, n: a, t, ...(level.kind === 'cmp' ? { N: a * t } : {}) };
    }
    // guess: loại máy đổi lượt nào cũng khác lượt trước; mỗi loại xuất hiện đủ trong một ván.
    const used = history.map(m => m.rule);
    const pool = ['mul', 'div', 'add', 'sub'].filter(r => r !== prev?.rule);
    const fresh = pool.filter(r => !used.slice(-3).includes(r));
    const rule = rng.pick(fresh.length ? fresh : pool);
    let x, ins;
    if (rule === 'mul') { x = rng.int(2, 5); ins = rng.shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2); }
    else if (rule === 'div') { x = rng.int(2, 5); ins = rng.shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 2).map(v => v * x); }
    else if (rule === 'add') { x = rng.int(2, 9); ins = rng.shuffle([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20]).slice(0, 2); }
    else { x = rng.int(2, 9); ins = rng.shuffle([11, 12, 13, 14, 15, 16, 18, 20, 24, 25, 30]).slice(0, 2); }
    ins.sort((a, b) => a - b);
    return { ...base, rule, x, ex: ins.map(a => [a, RULES[rule].apply(a, x)]) };
  },

  mountMission(stage, m, level, api) {
    const n = m.npc;
    const fname = FRUITS[m.f].name;
    const label = m.kind === 'mul' ? RULES.mul.disp(m.t) : m.kind === 'div' ? RULES.div.disp(m.t) : m.kind === 'cmp' ? 'GẤP ? LẦN' : '?';
    const { counter, main, speak, row, ask, nudge, thanks } = mountStall(stage, {
      npc: n, api, theme: 'lab', cameo: false,
      sign: `<span class="g3m-sign-ic">🔬</span><span><strong>Phòng thí nghiệm</strong><br>Máy biến hình</span>`,
      counter: `
        <div class="g3m-bench g3m-k-${m.kind}">
          <div class="g3m-in"><div class="g3m-box"><div class="g3m-tray" data-in></div><span class="g3m-cap" data-incap></span></div></div>
          <div class="g3m-mach">
            <div class="g3m-mbox">${machineSvg(label)}</div>
            <button type="button" class="g3g-btn g3m-run g3m-run-wait" data-run>⚙️ Chạy máy</button>
          </div>
          <div class="g3m-out"><div class="g3m-box g3m-box-out"><div class="g3m-tray" data-out></div><span class="g3m-cap" data-outcap></span></div></div>
        </div>`,
    });
    const bench = counter.querySelector('.g3m-bench');
    const inTray = counter.querySelector('[data-in]');
    const outTray = counter.querySelector('[data-out]');
    const outBox = counter.querySelector('.g3m-box-out');
    const inCap = counter.querySelector('[data-incap]');
    const outCap = counter.querySelector('[data-outcap]');
    const mach = counter.querySelector('.g3m-svg');
    const disp = mach.querySelector('[data-disp]');
    const lever = mach.querySelector('[data-lever]');
    const runBtn = counter.querySelector('[data-run]');

    const setDisp = (t) => { disp.textContent = t; disp.setAttribute('font-size', dispSize(t)); };
    const rowHtml = (count, { tag = '', cls = '', hidden = false } = {}) => `<div class="g3m-row ${cls}">${tag ? `<span class="g3m-tag">${tag}</span>` : ''}<span class="g3m-items">${
      Array.from({ length: count }, () => itemSvg(m.f).replace('<svg ', hidden ? '<svg style="opacity:0" ' : '<svg ')).join('')}</span></div>`;
    /** count quả xếp thành hàng `cols` quả (10 để đếm theo chục; 5 khi khung hẹp và cao). */
    const gridHtml = (count, cols = 10) => Array.from({ length: Math.ceil(count / cols) }, (_, r) => rowHtml(Math.min(cols, count - r * cols))).join('');

    // ── Cỡ quả co giãn theo khung: vừa cả khay vào lẫn khay ra (cùng một cỡ — quả vào máy và quả ra máy là một loại).
    // inOpts: các cách xếp khay vào [{ cols, rows, extra, draw() }] — chọn cách cho quả to nhất (chỉ trước khi máy chạy).
    const layout = { inOpts: [{ cols: 7, rows: 3 }], outCols: 6, outRows: 2, outTag: 0 };
    let inPick = null, started = false;
    // Màn ngang: một hàng khay vào ➜ máy (to, ở giữa) ➜ khay ra. Màn dọc / khung vuông: khay vào + máy ở trên,
    // khay ra rộng hết ở dưới.
    const res0 = () => main.querySelector(':scope > .g3g-result');
    const fit = () => {
      if (!bench.isConnected) return obs.disconnect();
      bench.classList.toggle('g3m-done', !!res0());
      const W = bench.clientWidth, H = bench.clientHeight - parseFloat(getComputedStyle(bench).paddingTop);
      if (!W || !H) return;
      const g = 16, L = layout;
      const btnH = res0() ? 0 : 60; // thẻ kết quả đã hiện: nút Chạy máy ẩn (bench.g3m-done)
      // Máy chạy xong thì khay vào trống (quả đã vào máy) — không cần giữ chỗ cho nó (trừ cấp so sánh: hai rổ còn nguyên).
      const inEmpty = started && (m.kind === 'mul' || m.kind === 'div');
      const sIn = (o, w, h) => (inEmpty ? Infinity : Math.min((w - 34) / (o.cols * 1.12), (h - 56 - (o.extra || 0)) / (o.rows * 1.16)));
      const sOut = (w, h) => Math.min((w - 34) / (L.outCols * 1.12 + L.outTag), (h - 64 - L.outRows * 8) / (L.outRows * 1.22)); // hàng quả nhỏ vẫn cao ít nhất bằng dòng chữ "Lần 1"
      const opts = started && inPick ? [inPick] : L.inOpts;
      const px = (v) => `${Math.floor(v)}px`;
      const row3 = W >= H * 1.2;
      let best = { s: -1 };
      for (const o of opts) {
        if (row3) {
          const mw = Math.min(W * 0.3, H - btnH, 420);
          for (let fi = 0.25; fi <= 0.6; fi += 0.025) {
            const wi = (W - mw - 2 * g) * fi, wo = W - mw - 2 * g - wi;
            const s = Math.min(sIn(o, wi, H), sOut(wo, H));
            if (s > best.s) best = { s, o, areas: '"in mach out"', cols: `${px(wi)} ${px(mw)} ${px(wo)}`, rows: 'minmax(0, 1fr)', inW: wi, inH: H, outW: wo, outH: H };
          }
        } else {
          // Hai tầng: thẻ kết quả nằm ở đáy — khi thẻ hiện thì đo đúng chiều cao thẻ, thu khay ra vừa phần phía trên.
          const res = res0();
          const card = res && m.kind !== 'guess' ? res.offsetHeight + 30 : 0;
          for (let ft = inEmpty ? 0.1 : 0.28; ft <= 0.62; ft += 0.03) {
            const th = H * ft - g / 2, bh = H - th - g - card;
            const mw = Math.min(th - btnH, W * 0.45);
            if (mw < (inEmpty ? 70 : 100)) continue;
            const s = Math.min(sIn(o, W - mw - g, th), sOut(W, bh));
            if (s > best.s) best = { s, o, areas: '"in mach" "out out"', cols: `${px(W - mw - g)} ${px(mw)}`, rows: `${px(th)} ${px(bh)}`, inW: W - mw - g, inH: th, outW: W, outH: bh };
          }
        }
      }
      if (best.s < 0) return;
      if (best.o !== inPick && !started) { inPick = best.o; inPick.draw?.(); }
      Object.assign(bench.style, { gridTemplateAreas: best.areas, gridTemplateColumns: best.cols, gridTemplateRows: best.rows });
      bench.classList.toggle('g3m-row3', row3);
      // Thẻ kết quả không che chỗ kiểm chứng: khay ra (tầng dưới) — hoặc bảng thử máy (tầng trên) ở cấp Đoán máy.
      main.classList.toggle('g3m-two', !row3 && m.kind !== 'guess');
      main.classList.toggle('g3m-card-low', m.kind === 'guess');
      const it = Math.floor(Math.max(12, Math.min(96, best.s)));
      bench.style.setProperty('--it', `${it}px`);
      // Khay ra to đúng bằng chỗ các hàng quả sẽ ra (không phải khung trống to hết cỡ).
      if (m.kind !== 'guess') {
        outBox.style.width = px(Math.min(best.outW, (L.outCols * 1.12 + L.outTag) * it + 34));
        outBox.style.minHeight = px(Math.min(best.outH, L.outRows * 1.22 * it + 60)); // cao theo nội dung, không cắt chữ
      }
      // Cấp Đoán máy: chữ bảng thử máy và nút chọn phép theo khung (bảng ~9 chữ ngang, 5 dòng; nút 2 × 2).
      const clampPx = (v, lo, hi) => `${Math.floor(Math.max(lo, Math.min(hi, v)))}px`;
      bench.style.setProperty('--tf', clampPx(Math.min((best.inW - 40) / 9.6, (best.inH - 60) / 4.6), 14, 44));
      bench.style.setProperty('--rf', clampPx(Math.min((best.outW - 50) / 10, (best.outH - 70) / 5), 14, 38));
    };
    const obs = new ResizeObserver(fit);
    obs.observe(counter);
    new MutationObserver(fit).observe(main, { childList: true }); // thẻ kết quả vừa hiện

    // Chưa gõ số mà bấm máy → khách nhắc tính trước, máy tính rung.
    let armed = false;
    let chosen = null; // cấp Đoán máy: phép bé chọn
    const blocked = () => {
      if (armed) return;
      if (m.kind === 'guess' && !chosen) {
        speak(`${cap(n.you)} chọn máy làm gì trước đã!`, null, 'Chọn máy làm gì trước!');
        const pick = outTray.querySelector('.g3m-pick-rule');
        pick.classList.remove('g3m-hint');
        void pick.offsetWidth;
        pick.classList.add('g3m-hint');
        return;
      }
      speak(`${cap(n.you)} đoán số ở máy tính trước đã!`, null, 'Đoán số ở máy tính trước!');
      nudge();
    };
    let onRun = null;
    const arm = (fn) => {
      armed = true;
      onRun = fn;
      runBtn.classList.remove('g3m-run-wait');
      runBtn.classList.add('g3m-run-ready');
      speak('Kéo cần gạt cho máy chạy!', null, 'Kéo cần gạt cho máy chạy!');
    };
    const pull = () => {
      if (!armed) return blocked();
      if (!onRun) return;
      const go = onRun;
      onRun = null;
      started = true;
      runBtn.classList.remove('g3m-run-ready');
      runBtn.disabled = true;
      lever.animate([{ transform: 'rotate(0deg)' }, { transform: 'rotate(52deg)', offset: 0.45 }, { transform: 'rotate(0deg)' }], { duration: 650, easing: 'ease-in-out' });
      sfx.swish();
      setTimeout(go, 500);
    };
    runBtn.onclick = pull;
    mach.addEventListener('click', pull);

    // ── Chuyển động dùng chung ──────────────────────────────────────────────────────────────────────
    const hopperRect = () => svgBoxOnScreen(mach, 30, 12, 26, 22);
    const chuteRect = () => svgBoxOnScreen(mach, 146, 122, 22, 20);
    const running = (on) => bench.classList.toggle('g3m-on', on);
    /** Các quả `els` bay vào phễu (hide: ẩn quả gốc — quả đi vào máy). Trả về ms tới lúc quả cuối vào. */
    const intoHopper = (els, { hide = true, gap = 90 } = {}) => {
      const to = hopperRect();
      let end = 0;
      els.forEach((el, i) => {
        const from = el.getBoundingClientRect();
        if (hide) setTimeout(() => { el.style.visibility = 'hidden'; }, i * gap);
        end = Math.max(end, flyOne(itemSvg(m.f), from, to, { delay: i * gap, minMs: 420, maxMs: 700, onLand: () => sfx.tap() }));
      });
      return end;
    };
    /** Thêm một hàng quả ở khay ra; các quả bay từ máng ra tới chỗ. Trả về ms tới lúc quả cuối đáp. */
    const outRow = (count, tag, gap = 80) => {
      outTray.querySelector('.g3m-wait')?.remove();
      outTray.insertAdjacentHTML('beforeend', rowHtml(count, { tag, hidden: true }));
      fit();
      const rowEl = outTray.lastElementChild;
      const from = chuteRect();
      let end = 0;
      [...rowEl.querySelectorAll('.g3m-it')].forEach((el, i) => {
        end = Math.max(end, flyOne(itemSvg(m.f), from, el.getBoundingClientRect(), {
          delay: i * gap, minMs: 450, maxMs: 750, spin: (i % 2 ? -1 : 1) * 12, className: 'g3m-fly',
          onLand: () => { el.style.opacity = ''; if (!calmMotion()) el.classList.add('g3m-pop'); sfx.pop(i); },
        }));
      });
      return end;
    };

    const failWith = (line, text, tip) => { speak(line, 'sad', line); api.fail(text, tip); };
    const unitWord = `quả ${fname}`;

    // ════ mul: gấp lên ══════════════════════════════════════════════════════════════════════════════
    if (m.kind === 'mul') {
      const { n: a, t } = m, out = a * t;
      const drawIn = (cols) => () => { inTray.innerHTML = gridHtml(a, cols); };
      Object.assign(layout, {
        inOpts: [{ cols: a, rows: 1, draw: drawIn(a) }, ...(a > 5 ? [{ cols: 5, rows: 2, draw: drawIn(5) }] : [])],
        outCols: a, outRows: t, outTag: 2.4,
      });
      outTray.innerHTML = WAIT;
      inCap.innerHTML = `<b>${a} quả</b>`;
      outCap.innerHTML = `Ra ${Q} quả`;
      fit();
      speak(`${cap(n.me)} cho ${a} ${unitWord} vào máy gấp ${t} lần. Máy sẽ cho ra bao nhiêu quả?`, null,
        `<b class="g3f-want">${a} quả</b> vào máy <b class="g3f-want">gấp ${t} lần</b>. Ra bao nhiêu quả?`);
      ask(row(fruitPic(m.f), 'Vào', `<b>${a} quả</b>`) + row('⚙️', 'Máy', `<b>gấp ${t} lần</b>`) + row(fruitPic(m.f), 'Ra', Q, true), 'quả', (v, pad) => {
        pad.lock();
        arm(async () => {
          await sleep(intoHopper([...inTray.querySelectorAll('.g3m-it')]) + 200);
          running(true);
          for (let r = 0; r < t; r++) {
            await sleep(outRow(a, `Lần ${r + 1}`) + 250);
            outCap.innerHTML = `Ra <b>${(r + 1) * a} quả</b>`;
          }
          running(false);
          await sleep(400);
          if (v === out) { pad.lock('g3g-keypad-ok'); thanks(); return; }
          pad.lock('g3g-keypad-bad');
          failWith(`Máy ra ${out} quả, không phải ${v} quả!`, `Gấp ${a} quả lên ${t} lần: được <b>${out} quả</b>.`,
            `Gấp ${a} lên ${t} lần là lấy ${a} nhân với ${t}: ${a} × ${t} = ${out}.`);
        });
      });
      return;
    }

    // ════ div: giảm đi ══════════════════════════════════════════════════════════════════════════════
    if (m.kind === 'div') {
      const { N, t, v: out } = m;
      const drawIn = (cols) => () => { inTray.innerHTML = gridHtml(N, cols); };
      Object.assign(layout, {
        inOpts: [10, 5].filter(c => c === 10 || c < N).map(c => ({ cols: Math.min(c, N), rows: Math.ceil(N / c), draw: drawIn(c) })),
        outCols: out, outRows: t, outTag: 2.6,
      });
      outTray.innerHTML = WAIT;
      inCap.innerHTML = `<b>${N} quả</b>`;
      outCap.innerHTML = `Ra ${Q} quả`;
      fit();
      speak(`${cap(n.me)} cho ${N} ${unitWord} vào máy giảm ${t} lần. Máy sẽ cho ra bao nhiêu quả?`, null,
        `<b class="g3f-want">${N} quả</b> vào máy <b class="g3f-want">giảm ${t} lần</b>. Ra bao nhiêu quả?`);
      ask(row(fruitPic(m.f), 'Vào', `<b>${N} quả</b>`) + row('⚙️', 'Máy', `<b>giảm ${t} lần</b>`) + row(fruitPic(m.f), 'Ra', Q, true), 'quả', (v, pad) => {
        pad.lock();
        arm(async () => {
          await sleep(intoHopper([...inTray.querySelectorAll('.g3m-it')], { gap: Math.max(35, 1400 / N) }) + 200);
          running(true);
          // Máy chia thành t phần bằng nhau (từng phần hiện ra), rồi chỉ đưa ra 1 phần.
          for (let r = 0; r < t; r++) await sleep(outRow(out, `Phần ${r + 1}`, 60) + 200);
          running(false);
          const rows = [...outTray.querySelectorAll('.g3m-row')];
          rows.forEach((el, i) => el.classList.add(i ? 'g3m-dim' : 'g3m-pick'));
          rows[0].querySelector('.g3m-tag').textContent = 'Ra';
          outCap.innerHTML = `Lấy 1 phần: <b>${out} quả</b>`;
          await sleep(700);
          if (v === out) { pad.lock('g3g-keypad-ok'); thanks(); return; }
          pad.lock('g3g-keypad-bad');
          failWith(`Máy ra ${out} quả, không phải ${v} quả!`, `Giảm ${N} quả đi ${t} lần: còn <b>${out} quả</b>.`,
            `Giảm ${N} đi ${t} lần là chia ${N} thành ${t} phần bằng nhau: ${N} : ${t} = ${out}.`);
        });
      });
      return;
    }

    // ════ cmp: gấp mấy lần ══════════════════════════════════════════════════════════════════════════
    if (m.kind === 'cmp') {
      const { n: a, N, t } = m;
      const drawIn = (cols) => () => {
        inTray.innerHTML = `<div class="g3m-group"><span class="g3m-glabel">Rổ nhỏ: <b>${a} quả</b></span><div data-small>${gridHtml(a, cols)}</div></div>
          <div class="g3m-group"><span class="g3m-glabel">Rổ to: <b>${N} quả</b></span><div data-big>${gridHtml(N, cols)}</div></div>`;
      };
      Object.assign(layout, {
        inOpts: [10, 5].map(c => ({ cols: c, rows: Math.ceil(a / c) + Math.ceil(N / c), extra: 64, draw: drawIn(c) })),
        outCols: a, outRows: t, outTag: 2.4,
      });
      outTray.innerHTML = WAIT;
      inCap.innerHTML = '';
      outCap.innerHTML = `Gấp ${Q} lần`;
      fit();
      speak(`Rổ to có ${N} ${unitWord}, rổ nhỏ có ${a} quả. Số quả ở rổ to gấp mấy lần số quả ở rổ nhỏ?`, null,
        `Rổ to <b class="g3f-want">${N} quả</b>, rổ nhỏ <b class="g3f-want">${a} quả</b>. Rổ to gấp mấy lần?`);
      ask(row(fruitPic(m.f), 'Rổ to', `<b>${N} quả</b>`) + row(fruitPic(m.f), 'Rổ nhỏ', `<b>${a} quả</b>`) + row('⚙️', 'Gấp', Q, true), 'lần', (v, pad) => {
        pad.lock();
        arm(async () => {
          // Máy gấp rổ nhỏ lên từng lần (lần 1, lần 2…) tới khi bằng rổ to.
          const small = [...counter.querySelectorAll('[data-small] .g3m-it')];
          for (let r = 0; r < t; r++) {
            await sleep(intoHopper(small, { hide: false, gap: 60 }) + 100);
            running(true);
            setDisp(`GẤP ${r + 1} LẦN`);
            await sleep(outRow(a, `Lần ${r + 1}`, 60) + 200);
            outCap.innerHTML = `Gấp ${r + 1} lần: <b>${(r + 1) * a} quả</b>${(r + 1) * a === N ? ' = rổ to' : ''}`;
            running(false);
          }
          counter.querySelector('[data-big]').classList.add('g3m-match');
          outTray.classList.add('g3m-match');
          await sleep(700);
          if (v === t) { pad.lock('g3g-keypad-ok'); thanks(); return; }
          pad.lock('g3g-keypad-bad');
          failWith(`Phải gấp ${t} lần mới bằng rổ to!`, `${N} quả gấp <b>${t} lần</b> ${a} quả.`,
            `Muốn biết ${N} gấp mấy lần ${a}, lấy ${N} chia cho ${a}: ${N} : ${a} = ${t}.`);
        });
      });
      return;
    }

    // ════ guess: đoán máy ═══════════════════════════════════════════════════════════════════════════
    const [[a1, b1], [a2, b2]] = m.ex;
    inTray.innerHTML = `<table class="g3m-table"><thead><tr><th>Vào</th><th></th><th>Ra</th><th>Máy em</th></tr></thead><tbody>
      ${m.ex.map(([a, b], i) => `<tr data-ex="${i}"><td class="g3m-num" data-a>${a}</td><td class="g3m-arrow">→</td><td class="g3m-num">${b}</td><td class="g3m-mine" data-mine></td></tr>`).join('')}
      </tbody></table>`;
    inCap.innerHTML = 'Bảng thử máy';
    outTray.innerHTML = `<div class="g3m-pick-rule">${Object.entries(RULES).map(([k, r]) =>
      `<button type="button" class="g3g-btn g3m-rule" data-rule="${k}"><b>${r.word}</b><span>… ${r.unit || ''}</span></button>`).join('')}</div>`;
    outCap.innerHTML = 'Máy làm gì?';
    fit(); // bảng và nút cỡ cố định — layout mặc định chỉ để chia khung
    speak(`Máy này làm gì? ${cap(n.you)} xem bảng thử máy rồi chọn gấp, giảm, thêm hay bớt!`, null,
      `${a1} → ${b1}, ${a2} → ${b2}. <b class="g3f-want">Máy làm gì?</b>`);
    outTray.addEventListener('click', (e) => {
      const b = e.target.closest('[data-rule]');
      if (!b || armed || chosen) return;
      chosen = b.dataset.rule;
      sfx.tap();
      outTray.querySelectorAll('[data-rule]').forEach(x => { x.classList.toggle('g3m-rule-on', x === b); x.disabled = true; });
      const R = RULES[chosen];
      setDisp(R.disp('?'));
      outCap.innerHTML = `Máy <b>${R.word.toLowerCase()} …</b>`;
      ask(row('⚙️', R.word, `${Q}${R.unit ? ` <b>${R.unit}</b>` : ''}`, true), R.unit, (x, pad) => {
        pad.lock();
        setDisp(R.disp(x));
        arm(async () => {
          // Thử máy của bé với từng số trong bảng: số vào bay vào phễu, số ra bay từ máng tới cột "Máy em".
          let good = 0;
          for (const tr of inTray.querySelectorAll('[data-ex]')) {
            const i = Number(tr.dataset.ex);
            const [a, b] = m.ex[i];
            const got = R.apply(a, x);
            const cell = tr.querySelector('[data-mine]');
            running(true);
            await sleep(flyOne(numCardSvg(a), tr.querySelector('[data-a]').getBoundingClientRect(), hopperRect(), { minMs: 450, maxMs: 650 }) + 250);
            cell.innerHTML = `<span style="opacity:0">${got ?? '?'}</span>`;
            const ok = got === b;
            await sleep(flyOne(numCardSvg(got ?? '?', { color: ok ? '#DCFCE7' : '#FEE2E2' }), chuteRect(), cell.firstChild.getBoundingClientRect(), { minMs: 450, maxMs: 700 }));
            cell.innerHTML = `${got ?? '?'} ${ok ? '✓' : '✗'}`;
            cell.classList.add(ok ? 'g3m-mine-ok' : 'g3m-mine-bad');
            if (ok) { good++; sfx.pop(good); } else sfx.boing();
            running(false);
            await sleep(350);
          }
          if (good === 2) { pad.lock('g3g-keypad-ok'); thanks(); return; }
          pad.lock('g3g-keypad-bad');
          const real = RULES[m.rule];
          const s = SIGN[m.rule];
          const tips = {
            mul: `${a1} × ${m.x} = ${b1}, ${a2} × ${m.x} = ${b2}: cả hai lần đều nhân với ${m.x}. Gấp ${m.x} lần là nhân ${m.x}, thêm ${m.x} là cộng ${m.x}.`,
            div: `${a1} : ${m.x} = ${b1}, ${a2} : ${m.x} = ${b2}: cả hai lần đều chia cho ${m.x}. Giảm ${m.x} lần là chia ${m.x}, bớt ${m.x} là trừ ${m.x}.`,
            add: `${a1} + ${m.x} = ${b1}, ${a2} + ${m.x} = ${b2}: cả hai lần đều cộng ${m.x}.`,
            sub: `${a1} − ${m.x} = ${b1}, ${a2} − ${m.x} = ${b2}: cả hai lần đều trừ ${m.x}.`,
          };
          failWith('Máy chưa ra đúng bảng thử rồi!', `Máy này <b>${real.text(m.x)}</b>: ${a1} ${s} ${m.x} = ${b1}.`, tips[m.rule]);
        });
      });
    });
  },
};
