/**
 * Trò chơi "bớt" cho phép trừ có hình (99 đề, vòng 'eq'): thay vì chỉ nhìn hình đếm, bé tự bớt.
 *   16 − 5 − 3 = ?  →  16 cái kẹo bày trên bảng, hai hộp "−5", "−3" bên cạnh. Bé chạm từng cái kẹo,
 *   kẹo bay vào hộp đang mở (Thỏ đếm to). Đủ 5 thì sang hộp −3. Bớt xong, các cái còn lại sáng lên,
 *   bé chạm đếm (hiện số) rồi điền phép tính như cũ.
 * Đồ vật: ô cắt từ sách hoặc hình vẽ lại (tiles.js / tileArt.js), chỗ cái đã bớt để lại vết mờ, bảng
 * không xô lệch. Hộp giữ chỗ từ đầu lượt.
 */
import { numberWord } from '../numbers.js';
import { say, sfx, shake } from '../fx.js';
import { itemsOf, nameOf } from './assets.js';
import { buildTiles, fitTiles } from '../tiles.js';

/** Vòng 'eq' bớt được: một dòng chỉ có phép trừ, hình có đúng số đồ vật bằng số bị trừ. */
export function takeAwayPlan(round) {
  if (round.noTakeAway || !round.img || round.lines?.length !== 1) return null;
  const line = round.lines[0];
  const eq = line.indexOf('=');
  const left = line.slice(0, eq);
  if (left.some(x => x === '+')) return null;
  const nums = left.filter(x => typeof x === 'number');
  const items = itemsOf(round.img);
  if (nums.length < 2 || !items || items.length !== nums[0]) return null;
  return { total: nums[0], subs: nums.slice(1), left: nums[0] - nums.slice(1).reduce((s, v) => s + v, 0) };
}

const unit = (round) => round.unit || 'cái';

/** Bản sao hình của một ô để bay / bỏ vào hộp (canvas thì vẽ lại, cloneNode không chép điểm ảnh). */
function copyPic(cell) {
  const pic = cell.querySelector('.pk-tile-pic');
  const copy = pic.cloneNode(true);
  if (pic.tagName === 'CANVAS') {
    copy.width = pic.width; copy.height = pic.height;
    copy.getContext('2d').drawImage(pic, 0, 0);
  }
  copy.removeAttribute('style');
  copy.style.width = '100%';
  copy.style.height = '100%';
  return copy;
}

/** Bay một ô sang `to` (cuối hành trình nhỏ lại cỡ ô trong hộp). */
function flyCell(cell, to, onLand) {
  const a = cell.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  const fly = document.createElement('div');
  fly.className = 'pk4-take-fly';
  Object.assign(fly.style, { left: `${a.left}px`, top: `${a.top}px`, width: `${a.width}px`, height: `${a.height}px` });
  fly.append(copyPic(cell));
  document.body.append(fly);
  const dx = b.left + b.width / 2 - (a.left + a.width / 2);
  const dy = b.top + b.height / 2 - (a.top + a.height / 2);
  const s = Math.max(0.25, Math.min(1, b.height / a.height));
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const anim = fly.animate(calm
    ? [{ transform: 'none', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(${s})`, opacity: 1 }]
    : [
      { transform: 'none' },
      { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 60}px) scale(${(1 + s) / 2}) rotate(-10deg)`, offset: 0.5 },
      { transform: `translate(${dx}px, ${dy}px) scale(${s})` },
    ], { duration: calm ? 420 : 560, easing: 'cubic-bezier(.45,.05,.4,1)', fill: 'forwards' });
  anim.onfinish = () => { fly.remove(); onLand(); };
}

/**
 * Dựng trò bớt vào `host`. Trả về { done(): bool, remind() } — playEq chặn bàn phím tới khi bớt xong.
 * `talk(câu)`: bong bóng + giọng Thỏ; `onDone()`: bớt xong.
 */
export function mountTakeAway(ctx, host, round, plan, { onDone }) {
  const { talk, right } = ctx;
  const u = unit(round);
  host.classList.add('pk4-take');
  host.innerHTML = `
    <div class="pk4-take-board pk-pic is-tiles"></div>
    <div class="pk4-take-bins">${plan.subs.map((n, k) => `
      <div class="pk4-bin${k ? ' is-wait' : ' is-on'}" data-k="${k}" style="--n:${n}">
        <b class="pk4-bin-tag">−${n}</b>
        <div class="pk4-bin-in">${Array.from({ length: n }, () => '<span class="pk4-bin-slot"></span>').join('')}</div>
      </div>`).join('')}
    </div>`;
  const board = host.querySelector('.pk4-take-board');
  const bins = [...host.querySelectorAll('.pk4-bin')];
  let step = 0, taken = 0, finished = false, counted = 0;
  const cells = [];

  const stepSay = (k) => (k === 0
    ? `Có ${numberWord(plan.total)} ${u}. Bé chạm ${numberWord(plan.subs[0])} ${u} để bớt đi!`
    : `Bớt thêm ${numberWord(plan.subs[k])} ${u} nữa! Bé chạm để bớt!`);

  const finish = () => {
    finished = true;
    bins.forEach(b => b.classList.remove('is-on', 'is-wait'));
    cells.forEach(c => { if (!c.classList.contains('is-gone')) c.classList.add('is-left'); });
    talk(`Còn lại mấy ${u}? Bé chạm đếm, rồi điền phép tính!`);
    onDone();
  };

  const tap = (cell) => {
    if (cell.classList.contains('is-gone')) return;
    if (finished) {
      // Đếm phần còn lại: mỗi cái một số.
      if (cell.querySelector('.pk-mark')) { shake(cell); return; }
      counted++;
      const m = document.createElement('span');
      m.className = 'pk-mark';
      m.textContent = counted;
      m.style.background = '#22C55E';
      cell.append(m);
      sfx.pop(Math.min(counted, 12));
      say(numberWord(counted));
      return;
    }
    const bin = bins[step];
    const slot = bin.querySelectorAll('.pk4-bin-slot')[taken];
    cell.classList.add('is-gone');
    taken++;
    sfx.swish();
    say(numberWord(taken));
    const k = step, done = taken === plan.subs[step];
    if (done) { step++; taken = 0; }
    flyCell(cell, slot, () => {
      slot.classList.add('is-full');
      slot.append(copyPic(cell));
      if (!done) return;
      bins[k].classList.remove('is-on');
      bins[k].classList.add('is-done');
      if (step < plan.subs.length) {
        bins[step].classList.remove('is-wait');
        bins[step].classList.add('is-on');
        right(bins[k], `Bớt đi ${numberWord(plan.subs[k])} ${u} rồi! ${stepSay(step)}`);
      } else {
        setTimeout(finish, 250);
      }
    });
  };

  const img = new Image();
  img.onload = () => {
    if (!host.isConnected) return;
    const items = itemsOf(round.img);
    const groups = [{ g: 0, list: items.map((it, idx) => ({ it, idx })) }];
    const { el, cells: built } = buildTiles(round.img, items, groups, img.naturalWidth, img.naturalHeight, img,
      `pre4/${nameOf(round.img)}`, { bookMarks: false });
    board.append(el);
    built.forEach(({ el: cell }) => { cells.push(cell); cell.onclick = (e) => { e.stopPropagation(); tap(cell); }; });
    // Màn ngang: ô to hết bề ngang bảng; phần cao = màn hình trừ những gì phía trên bảng, phép tính và
    // bàn phím số bên dưới, để không phải cuộn.
    el.landSize = () => {
      const n = items.length, rows = n > 6 ? 2 : 1, ar = Number(el.dataset.ar);
      const cols = Math.ceil(n / rows);
      const byW = (board.clientWidth - 24 - (cols - 1) * 8) / cols;
      // Phần dưới bảng (phép tính, bàn phím) đo thật, cộng khe giữa các khối.
      let below = 0;
      for (let e = host.nextElementSibling; e; e = e.nextElementSibling) below += e.offsetHeight + 16;
      const top = board.getBoundingClientRect().top;
      const byH = (innerHeight - top - below - 24 - 20 - (rows - 1) * 8) / (rows * ar);
      return Math.max(44, Math.floor(Math.min(130, byW, byH)));
    };
    fitTiles(el);
  };
  img.src = round.img;
  talk(stepSay(0));

  return {
    done: () => finished,
    /** Bé bấm phép tính khi chưa bớt xong: Thỏ nhắc, hộp đang mở rung. */
    remind() {
      talk(`Bé bớt trước đã! ${stepSay(step)}`);
      shake(bins[step]);
    },
  };
}
