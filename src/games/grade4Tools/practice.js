/**
 * Thực hành của một bài: 5 câu do máy sinh (số mới mỗi lượt), chạy bằng vòng chơi chung grade3Games/loop.js
 * (chấm thành công / thất bại, sao 'tool4:bai-N', kỷ lục). Mỗi câu là một "task":
 *   { id, make(rng) → dữ liệu, mount(f, m) } — f = khung (mountDrill: say, hint, pad, done, board) + ask / choose.
 * Làm đúng ngay từ đầu → câu thành công; sai thì thầy nhắc, em sửa tới khi đúng nhưng câu đó tính thất bại.
 */

import { mountDrill, shake, setActive } from '../grade3Drills/kit.js';
import { css, INK, sfx, injectFrameStyles } from './frame.js';
import { fmt } from './num.js';
import { lessonByN, pagesText } from './catalog.js';

/** Sách mặc định: Toán 4. Toán 5 (grade5Tools) truyền sách riêng: catalog, sao 'tool5', bàn phím có dấu phẩy. */
const G4_BOOK = { label: 'Toán 4', lessonByN, pagesText, starPrefix: 'tool4', idPrefix: 'g4', comma: false };

/** Dòng tham chiếu SGK của câu: kiến thức nằm ở bài nào, trang nào. */
const refHtml = (n, book) => {
  const l = book.lessonByN(n);
  return l ? `<div class="g4-ref"><span>📖 SGK<span class="g4-ref-x"> ${book.label}</span> · <b>Bài ${l.n}</b></span><span class="g4-ref-t">${l.title}</span><span>· ${book.pagesText(l)}</span></div>` : '';
};

/** Trò (theo định dạng của loop.js) cho bài `lesson` với danh sách task. */
export function practiceGame(lesson, tasks, book = G4_BOOK) {
  return {
    id: `${book.idPrefix}-${lesson.id}`, title: `Bài ${lesson.n}`, icon: '✏️', unitWord: 'câu', starPrefix: book.starPrefix,
    againText: 'Làm lại (câu mới)',
    levels: [{ id: lesson.id, n: 1, title: `Bài ${lesson.n}: Thực hành`, missions: 5 }],
    summaryText: (ok, total) => `Em làm đúng ngay ${ok}/${total} câu.`,
    makeMission(rng, level, history) {
      // Đổi dạng câu lần lượt (trộn thứ tự một lần cho cả ván) để 5 câu khác nhau.
      if (!history.length) this._order = rng.shuffle(tasks.map((_, i) => i));
      const order = this._order || tasks.map((_, i) => i);
      const ti = order[history.length % order.length], task = tasks[ti];
      const seen = new Set(history.map(h => h?.key).filter(Boolean));
      let m;
      for (let k = 0; k < 40; k++) { m = task.make(rng); if (!seen.has(`${task.id}:${JSON.stringify(m)}`)) break; }
      // ti: vị trí dạng câu (bài trộn có thể có hai dạng trùng id, tìm theo id sẽ lấy nhầm dạng)
      return { ...m, task: task.id, ti, order, key: `${task.id}:${JSON.stringify(m)}` };
    },
    mountMission(stage, m, level, api) {
      const own = tasks[m.ti] || tasks.find(x => x.id === m.task);
      if (own.stage) { own.stage(stage, m, api); return; } // task tự dựng cả màn (vd. đặt tính của Luyện Tính lớp 3)
      injectFrameStyles();
      injectPracticeStyles();
      const d = mountDrill(stage, { api, board: `<div class="g4-board g4-pboard">${refHtml(own.src ?? lesson.n, book)}<div class="g4-q"></div><div class="g4-tool"></div><div class="g4-choices"></div></div>`, cls: 'g4-scene g4-prac', comma: book.comma });
      const board = d.scene.querySelector('.g4-board');
      const f = {
        ...d, board,
        q: board.querySelector('.g4-q'), tool: board.querySelector('.g4-tool'), choicesBox: board.querySelector('.g4-choices'),
        mistakes: 0,
        ask: (o) => ask(f, o),
        choose: (o) => choose(f, o),
        finish: (o) => d.done(f.mistakes, o),
      };
      own.mount(f, m);
    },
  };
}

/**
 * Hỏi một số bằng bàn phím. box: ô hiện số đang gõ. Trả về Promise khi em gõ đúng.
 * hint(wrong) → câu nhắc; sai 2 lần thì thầy chỉ đáp án (show) rồi cho gõ lại.
 */
export function ask(f, { box, answer, max = String(answer).length + 1, hint, say: sayText, shown }) {
  if (sayText) f.say(sayText, shown);
  setActive(f.board, box);
  // Đáp án là chuỗi "3,25" (số thập phân, Toán 5): so theo giá trị (3,250 = 3,25), hiện đúng như em gõ.
  const isDec = typeof answer === 'string';
  const val = (s) => Number(String(s).replace(',', '.'));
  const show = (s) => (isDec ? fmtDec(s) : fmt(+s));
  if (import.meta.env.DEV) window.__g4ans = { kind: 'ask', answer: String(answer), pad: f.pad };
  let wrong = 0;
  return new Promise((res) => {
    f.pad.want({
      max,
      onType: (s) => { box.textContent = s ? show(s) : ''; },
      onSubmit: (s) => {
        if (isDec ? Math.abs(val(s) - val(answer)) < 1e-9 : +s === answer) {
          box.textContent = isDec ? fmtDec(s) : fmt(answer);
          box.classList.add('g4-box-ok');
          setActive(f.board, null);
          f.pad.off();
          sfx.ding();
          res();
          return;
        }
        wrong++;
        if (wrong === 1) f.mistakes++;
        shake(box);
        f.pad.clear();
        box.textContent = '';
        const h = typeof hint === 'function' ? hint(isDec ? val(s) : +s, wrong) : hint;
        if (h) f.hint(h);
      },
    });
  });
}

/** "1234,5" → "1 234,5" (tách lớp phần nguyên; phần thập phân giữ nguyên như em gõ). */
export const fmtDec = (s) => { const [i, d] = String(s).split(','); return fmt(+i) + (d !== undefined ? `,${d}` : ''); };

/**
 * Nút chọn to (dưới công cụ). options: [{ html, value }] hoặc chuỗi. Trả về Promise(value đúng).
 * Chọn sai: nút đỏ rung, thầy nhắc, chọn lại.
 */
export function choose(f, { options, answer, hint, say: sayText, shown, host = f.choicesBox, cls = '' }) {
  if (sayText) f.say(sayText, shown);
  const opts = options.map(o => (typeof o === 'object' ? o : { html: String(o), value: o }));
  host.innerHTML = opts.map((o, i) => `<button type="button" class="g4-choice ${cls}" data-i="${i}">${o.html}</button>`).join('');
  host.classList.add('g4-choices-on');
  if (import.meta.env.DEV) window.__g4ans = { kind: 'choose', index: opts.findIndex(o => o.value === answer), host };
  let wrong = 0;
  return new Promise((res) => {
    host.onclick = (e) => {
      const b = e.target.closest('.g4-choice');
      if (!b || b.disabled) return;
      const o = opts[+b.dataset.i];
      if (o.value === answer) {
        b.classList.add('g4-choice-ok');
        host.querySelectorAll('.g4-choice').forEach(x => { x.disabled = true; });
        sfx.ding();
        host.onclick = null;
        res(o.value);
        return;
      }
      wrong++;
      if (wrong === 1) f.mistakes++;
      b.classList.add('g4-choice-bad');
      b.disabled = true;
      shake(b);
      const h = typeof hint === 'function' ? hint(o.value, wrong) : hint;
      if (h) f.hint(h);
    };
  });
}

/** Ô trống trong câu hỏi (rỗng thì hiện dấu ? mờ bằng CSS). */
export const BOX = '<span class="g4-box"></span>';

/**
 * Kiểu chung của ô điền (ô số trong câu, ô dấu so sánh): nền xanh rất nhạt, viền đặc, lõm vào trong.
 * Ô rỗng hiện dấu ? mờ; .g3d-on (đang gõ) vàng; -ok xanh lá.
 */
export const SLOT_CSS = (sel) => `
    ${sel} { display: inline-flex; align-items: center; justify-content: center; box-sizing: border-box; border: 2px solid #BFDBFE; border-radius: 0.3em; background: #F0F7FF; color: #1D4ED8;
      box-shadow: inset 0 0.08em 0 rgba(30,64,175,0.12); line-height: 1; }
    ${sel}:empty::before { content: '?'; color: #93C5FD; font-size: 0.8em; }
    ${sel}.g3d-on { background: #FEF9C3; border-color: #F59E0B; box-shadow: inset 0 0.08em 0 rgba(180,83,9,0.15), 0 0 0 0.12em #FDE68A; }
    ${sel}.g3d-on:empty::before { color: #F59E0B; }
    ${sel}.g4-box-ok, ${sel}.g4c-sign-on { border-color: #4ADE80; background: #DCFCE7; color: #15803D; box-shadow: none; }`;

let styled = false;
function injectPracticeStyles() {
  if (styled) return;
  styled = true;
  css('g4-prac', `
    .g4-pboard { gap: 1cqh; padding: 1.4cqh 1.6cqi; box-sizing: border-box; }
    .g4-q { flex: none; font-family: 'Baloo 2', sans-serif; font-weight: 800; color: #1E293B; text-align: center; font-size: min(7.5cqh, 4.6cqi); line-height: 1.25; min-height: 1.25em; }
    .g4-q:empty { display: none; }
    .g4-q small { display: block; font-size: 0.6em; color: #64748B; font-weight: 700; }
    .g4-tool { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; container-type: size; }
    .g4-tool:empty { display: none; }
    /* Câu chỉ có nút chọn (không có công cụ): đề ở giữa, nút to chiếm phần dưới */
    /* khối thường + align-content (không dùng flex: flex tách "Số nào <b>bé nhất</b>?" thành ba dòng) */
    .g4-pboard:has(.g4-tool:empty) .g4-q { flex: 1 1 0; display: block; align-content: center; font-size: min(8.5cqh, 5.4cqi); }
    /* chỉ có đề + bàn phím (tính nhẩm): chữ to kín tờ giấy */
    .g4-pboard:has(.g4-tool:empty):has(.g4-choices:empty) .g4-q { font-size: min(10.5cqh, 5.2cqi); text-wrap: balance; }
    .g4-pboard:has(.g4-tool:empty) .g4-choices { flex: 0 0 34%; }
    .g4-pboard:has(.g4-tool:empty) .g4-choices-col { flex: 0 0 52%; }
    .g4-pboard:has(.g4-tool:empty) .g4-choice { font-size: min(8cqh, 4.6cqi); }
    /* nút chữ dài (cách đọc số: 2 dòng mỗi nút): chữ nhỏ hơn để 3 nút vừa vùng nút */
    .g4-pboard:has(.g4-tool:empty) .g4-choices-long .g4-choice { font-size: min(4.4cqh, 3.4cqi); line-height: 1.15; padding: 0.25em 0.5em; text-wrap: balance; }
    .g4-ref { flex: none; align-self: flex-start; display: flex; gap: 0.3em; max-width: 100%; white-space: nowrap; font-family: 'Baloo 2', sans-serif; font-weight: 700;
      font-size: min(3.2cqh, 3.2cqi); line-height: 1.3; color: #7C2D12; background: #FFEDD5; border-radius: 999px; padding: 0.1em 0.8em; box-sizing: border-box; }
    .g4-ref > span { flex: none; }
    .g4-ref .g4-ref-t { flex: 0 1 auto; min-width: 0; overflow: hidden; text-overflow: ellipsis; }
    /* Màn dọc (tờ giấy hẹp): câu hỏi to hơn theo bề ngang; dòng SGK gọn còn "📖 SGK · Bài 1 · trang 6–8" */
    @container (orientation: portrait) {
      .g4-q { font-size: min(7cqh, 6.2cqi); text-wrap: balance; }
      .g4-q small { font-size: 0.74em; }
      .g4-pboard:has(.g4-tool:empty) .g4-q { font-size: min(8.5cqh, 7.6cqi); }
      .g4-pboard:has(.g4-tool:empty):has(.g4-choices:empty) .g4-q { font-size: min(10cqh, 9cqi); }
      /* nút chọn (chỉ có đề): chữ theo bề ngang tờ giấy, như đề */
      .g4-pboard:has(.g4-tool:empty) .g4-choice { font-size: min(6.4cqh, 7cqi); }
      .g4-pboard:has(.g4-tool:empty) .g4-choices-long .g4-choice { font-size: min(3.8cqh, 5.2cqi); }
      .g4-ref { font-size: min(3.6cqh, 4.4cqi); }
      .g4-ref-x, .g4-ref .g4-ref-t { display: none; }
    }
    .g4-ref b { font-weight: 800; color: #C2410C; }
    /* Ô điền: "giếng" đặc nền nhạt, rỗng thì có dấu ? mờ; đang chờ gõ thì vàng nhấp nháy (g3d-on) */
    ${SLOT_CSS('.g4-box')}
    .g4-box { min-width: 2.4em; height: 1.25em; padding: 0 0.25em; vertical-align: middle; }
    .g4-u { text-decoration: underline; text-decoration-thickness: 0.12em; text-underline-offset: 0.12em; color: #DC2626; }
    .g4-done { position: absolute; right: 1cqi; top: 1cqh; z-index: 3; font-family: 'Baloo 2', sans-serif; font-weight: 800; font-size: min(5.5cqh, 5.4cqi); border: 1.5px solid #15803D; border-radius: 0.7em;
      padding: 0.15em 0.7em; background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; box-shadow: 0 5px 0 #15803D; cursor: pointer; }
    .g4-done:active { transform: translateY(4px); box-shadow: 0 1px 0 #15803D; }
    .g4-done:disabled { background: #CBD5E1; box-shadow: 0 5px 0 #94A3B8; cursor: default; }
  `);
}
