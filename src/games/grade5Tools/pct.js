/**
 * 💯 Lưới phần trăm (Toán 5 Tập Hai, Bài 36, 40, 41): bọc lưới 100 ô (grid.js). Mỗi ô là 1% của cả hình vuông.
 * Dòng trên ghi k/100 = k%; dòng dưới tuỳ bài:
 *   of: N  → mỗi ô là N : 100, dòng dưới "k ô × (N : 100) = …" (giá trị phần trăm của một số, Bài 41).
 *   per: m → mỗi m ô là 1 (vd. 50 bạn: mỗi bạn 2 ô), dòng dưới "… bạn = k ô" (tỉ số phần trăm, Bài 40).
 *   note(k) → chữ tự đặt. exact (qua mode): số phần trăm có phần thập phân hiện ở dòng trên.
 * grids: 2 để có tỉ số phần trăm lớn hơn 100% (113%).
 */

import { createGrid } from './grid.js';
import { fr, dec, clean } from './num.js';
import { fmt } from '../grade4Tools/num.js';

export function createPct(host, { value = 0, grids = 1, edit = true, buttons = true, color = '#34D399', of = null, per = null, unitWord = '', note = null } = {}) {
  const g = createGrid(host, { grids, value: 0, show: 'none', split: false, buttons, edit, color });
  const read = g.root.querySelector('.g5g-read'), parts = g.root.querySelector('.g5g-parts');
  const opt = { of, per, unitWord, note, exact: null };
  const render = () => {
    const n = g.n;
    const v = opt.exact ?? n; // exact: tỉ số có phần thập phân (92,5%) mà lưới chỉ tô được số ô nguyên
    read.innerHTML = `${fr(dec(v), 100)} <span class="g5g-eq">=</span> <b style="color:#059669">${dec(v)}%</b>`;
    let line = '';
    if (opt.note) line = opt.note(n);
    else if (opt.of != null) { const one = clean(opt.of / 100); line = `1 ô = ${dec(one)}${opt.unitWord ? ` ${opt.unitWord}` : ''} · <b>${n}</b> ô = <b>${dec(clean(one * n))}</b>${opt.unitWord ? ` ${opt.unitWord}` : ''}`; }
    else if (opt.per) line = `Mỗi ${opt.unitWord || 'phần'} = ${dec(opt.per)} ô · <b>${dec(clean(n / opt.per))}</b> ${opt.unitWord || 'phần'} = <b>${n}</b> ô`;
    else line = `Cứ 100 ô thì có <b>${n}</b> ô tô màu`;
    parts.innerHTML = line;
  };
  const base = g.set;
  g.set = (k, o) => { base(k, o); render(); };
  /** Đổi dòng dưới (of / per / note). */
  g.mode = (patch) => { Object.assign(opt, patch); render(); };
  g.pct = () => g.n;
  g.set(value);
  return g;
}
