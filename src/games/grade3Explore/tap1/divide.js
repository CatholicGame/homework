/**
 * ➗ Chia đặt tính (Bài 26, 37): cách viết đầy đủ của lớp 3, như trong vở:
 *     72 | 3          Mỗi vòng: chia (em chọn chữ số của thương), nhân (viết tích dưới), trừ (viết hiệu),
 *   − 6  |----        hạ chữ số tiếp theo (chữ số bay xuống).
 *     12 | 24
 *   − 12
 *      0
 * Lưới chữ số dựng sẵn đủ hàng ngay từ đầu (không xê dịch), chữ to theo tờ giấy (container query).
 */

import { css, emitter, INK, sfx } from '../../grade4Tools/frame.js';
import { flyOne } from '../../grade3Games/fly.js';
import { divSteps } from '../../grade3Drills/division.js';
import { sleep } from './kit.js';

export function createDivide(host, D, d) {
  injectDivStyles();
  const t = emitter({});
  const { steps, rows, rem, q } = divSteps(D, d);
  const S = String(D), n = S.length, Q = String(q), right = Math.max(String(d).length, Q.length) + 0.4;
  const R = rows + 1; // hàng 0: số bị chia
  const cells = [];
  for (let r = 0; r < R; r++) {
    cells.push(`<div class="x3d-c x3d-sign" style="grid-row:${r + 1};grid-column:1" data-r="${r}" data-c="s"></div>`);
    for (let k = 0; k < n; k++) cells.push(`<div class="x3d-c" style="grid-row:${r + 1};grid-column:${k + 2}" data-r="${r}" data-c="${k}">${r === 0 ? S[k] : ''}</div>`);
  }
  host.innerHTML = `
    <div class="x3d" style="--n:${n};--rows:${R};--right:${right}">
      <div class="x3d-grid">
        ${cells.join('')}
        <div class="x3d-bar" style="grid-row:1 / span ${R};grid-column:${n + 2}"></div>
        <div class="x3d-c x3d-dv" style="grid-row:1;grid-column:${n + 3}">${d}</div>
        <div class="x3d-c x3d-q" style="grid-row:2;grid-column:${n + 3}" data-q></div>
      </div>
    </div>`;
  const root = host.querySelector('.x3d');
  const at = (r, c) => root.querySelector(`[data-r="${r}"][data-c="${c}"]`);
  const qEl = root.querySelector('[data-q]');
  t.root = root; t.steps = steps; t.q = q; t.rem = rem; t.D = D; t.d = d;
  /** Viết số v canh phải ở cột end, hàng r. */
  const writeAt = (r, end, v, cls = '') => {
    const s = String(v);
    for (let k = 0; k < s.length; k++) { const e = at(r, end - s.length + 1 + k); if (e) { e.textContent = s[k]; e.className = `x3d-c x3d-new ${cls}`; } }
  };
  t.glow = (r, from, to) => {
    root.querySelectorAll('.x3d-on').forEach(e => e.classList.remove('x3d-on'));
    if (r == null) return;
    for (let k = from; k <= to; k++) at(r, k)?.classList.add('x3d-on');
  };
  t.glowDv = (on) => root.querySelector('.x3d-dv').classList.toggle('x3d-on', on);
  t.writeQ = (digit) => { qEl.textContent += digit; qEl.classList.remove('x3d-new'); void qEl.offsetWidth; qEl.classList.add('x3d-new'); sfx.pop(2); };
  t.mul = (s) => { writeAt(s.row, s.end, s.p, 'x3d-under'); at(s.row, 's').textContent = '−'; sfx.pop(3); };
  t.sub = (s) => { writeAt(s.row, s.end, s.r); sfx.pop(4); };
  t.down = (s) => new Promise((res) => {
    const from = at(0, s.col), to = at(s.row, s.col);
    const fs = parseFloat(getComputedStyle(from).fontSize);
    flyOne(`<div class="x3d-fly" style="font-size:${fs}px">${s.dig}</div>`, from.getBoundingClientRect(), to.getBoundingClientRect(), {
      minMs: 450, maxMs: 700, onLand: () => { to.textContent = s.dig; to.className = 'x3d-c x3d-new'; sfx.tap(); res(); },
    });
  });
  return t;
}

/** Chạy các bước chia: thầy làm mẫu vòng đầu (demo = số chữ số thương thầy tự viết), sau đó em chọn chữ số thương. */
export async function runDivide(c, t, { demo = 1 } = {}) {
  const { d } = t;
  let cur = { r: 0, from: 0, to: 0 }, qNo = 0;
  for (const s of t.steps) {
    if (s.kind === 'take') {
      cur = { r: 0, from: 0, to: s.end };
      t.glow(0, 0, s.end);
      await c.say(s.end === 0 ? `Lấy ${s.partial} chia ${d}.` : `${String(t.D)[0]} bé hơn ${d}, lấy ${s.partial} chia ${d}.`, `Lấy <b>${s.partial}</b> chia ${d}`);
    } else if (s.kind === 'q') {
      t.glow(cur.r, cur.from, cur.to); t.glowDv(true);
      if (qNo < demo) {
        await c.say(`${s.partial} chia ${d} được ${s.q}, viết ${s.q}.`, `${s.partial} : ${d} được <b>${s.q}</b>`);
      } else {
        c.show(`<b>${s.partial} : ${d}</b> được mấy?`);
        const opts = [...new Set([s.q, s.q + 1, Math.max(0, s.q - 1), s.q + 2])].slice(0, 3).sort((a, b) => a - b);
        await c.choose(opts.map(v => ({ html: String(v), value: v })), s.q, { hint: `Nhẩm: ${d} nhân mấy gần bằng ${s.partial} mà không quá ${s.partial}?` });
        await c.say(`${s.partial} chia ${d} được ${s.q}, viết ${s.q}.`);
      }
      t.writeQ(s.q);
      t.glowDv(false);
      qNo++;
    } else if (s.kind === 'mul') {
      t.mul(s);
      await c.say(`${s.q} nhân ${d} bằng ${s.p}, viết ${s.p} dưới ${s.partial}.`, `${s.q} × ${d} = <b>${s.p}</b>`);
    } else if (s.kind === 'sub') {
      t.sub(s);
      cur = { r: s.row, from: s.end, to: s.end };
      await c.say(`${s.partial} trừ ${s.p} bằng ${s.r}, viết ${s.r}.`, `${s.partial} − ${s.p} = <b>${s.r}</b>`);
    } else if (s.kind === 'down') {
      await t.down(s);
      cur = { r: s.row, from: Math.min(cur.from, s.col), to: s.col };
      t.glow(cur.r, cur.from, cur.to);
      await c.say(`Hạ ${s.dig}.`, `Hạ <b>${s.dig}</b>`);
    }
  }
  t.glow(null);
  await sleep(200);
}

let styled = false;
function injectDivStyles() {
  if (styled) return;
  styled = true;
  css('x3d-div', `
    .x3d { flex: 1; min-height: 0; display: flex; align-items: center; justify-content: center; font-family: 'Baloo 2', sans-serif; padding-bottom: 16cqh; }
    .x3d-grid { --cell: min(calc(70cqh / var(--rows)), calc(80cqi / (var(--n) + var(--right) + 2.2))); display: grid;
      grid-template-columns: calc(var(--cell) * 0.8) repeat(var(--n), var(--cell)) calc(var(--cell) * 0.4) calc(var(--cell) * var(--right));
      grid-template-rows: repeat(var(--rows), calc(var(--cell) * 1.12)); }
    .x3d-c { font-weight: 800; color: #1E293B; text-align: center; font-size: calc(var(--cell) * 0.95); line-height: 1.12; border-radius: 0.15em; transition: background .2s; }
    .x3d-sign { color: #64748B; font-size: calc(var(--cell) * 0.7); align-self: end; }
    .x3d-under { box-shadow: inset 0 -3px 0 ${INK}; }
    .x3d-bar { border-left: 3px solid ${INK}; margin-left: calc(var(--cell) * 0.15); }
    .x3d-dv { text-align: left; padding-left: 0.15em; box-shadow: inset 0 -3px 0 ${INK}; color: #7C3AED; }
    .x3d-q { text-align: left; padding-left: 0.15em; color: #DC2626; letter-spacing: 0.02em; }
    .x3d-on { background: #FEF08A; }
    .x3d-new { animation: x3dNew .4s ease; }
    @keyframes x3dNew { from { transform: scale(1.5); color: #16A34A; } }
    .x3d-fly { width: 100%; height: 100%; display: grid; place-items: center; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #2563EB; }
    @media (prefers-reduced-motion: reduce) { .x3d-new { animation: x3dCalm .5s ease; } @keyframes x3dCalm { from { color: #16A34A; } } }
  `);
}

// ── Kịch bản ──────────────────────────────────────────────────────────────────────────────────────────
function divSteps3(D, d, intro, { demo = 1, after = '' } = {}) {
  return [
    async (c) => {
      if (c.t.D !== D) c.use((b) => createDivide(b, D, d));
      await c.say(intro, `Đặt tính: <b>${D} : ${d}</b>`);
      await c.say('Chia từ trái sang phải. Mỗi lượt: chia, nhân, trừ, rồi hạ chữ số tiếp theo.', 'Chia · nhân · trừ · hạ');
    },
    async (c) => { await runDivide(c, c.t, { demo }); },
    async (c) => {
      const { q, rem } = c.t;
      await c.say(rem ? `Vậy ${D} chia ${d} bằng ${q}, dư ${rem}.` : `Vậy ${D} chia ${d} bằng ${q}.`, `${D} : ${d} = <b>${q}</b>${rem ? ` (dư ${rem})` : ''}`);
      if (after) await c.say(after);
    },
  ];
}

export const B26 = {
  title: 'Bài 26: Chia số có hai chữ số cho số có một chữ số',
  setup: (b) => createDivide(b, 72, 3),
  steps: [
    ...divSteps3(72, 3, 'Đặt tính rồi tính 72 chia 3.', { after: 'Thử lại: 24 nhân 3 bằng 72, đúng.' }),
    ...divSteps3(65, 2, 'Thử với: 65 chia 2.', { demo: 0, after: 'Số dư 1 bé hơn số chia 2. Thử lại: 32 nhân 2 bằng 64, thêm 1 dư được 65.' }),
  ],
};

export const B37 = {
  title: 'Bài 37: Chia số có ba chữ số cho số có một chữ số',
  setup: (b) => createDivide(b, 648, 3),
  steps: [
    ...divSteps3(648, 3, 'Đặt tính rồi tính 648 chia 3.', { after: 'Thử lại: 216 nhân 3 bằng 648.' }),
    ...divSteps3(245, 5, 'Thử với: 245 chia 5. Chữ số 2 bé hơn 5 nên phải lấy hai chữ số.', { demo: 0, after: 'Thương 49 chỉ có hai chữ số.' }),
  ],
};
