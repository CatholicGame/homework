/** Bài 19: Giây, thế kỉ — ⏱️ Đồng hồ bấm giây và 📜 Dòng thời gian thế kỉ. */

import { createCanvas, anim } from '../canvas.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK } from '../frame.js';
import { fmt } from '../num.js';

export const roman = (n) => {
  const R = [[10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']];
  let s = '';
  for (const [v, r] of R) while (n >= v) { s += r; n -= v; }
  return s;
};
export const centuryOf = (y) => Math.ceil(y / 100);

const CX = 500, CY = 290, R = 230;
/** Mặt đồng hồ bấm giây: 60 vạch giây, kim giây đỏ dài, kim phút nhỏ (đếm số vòng). */
function watchSvg() {
  let ticks = '';
  for (let i = 0; i < 60; i++) {
    const a = (i * 6 - 90) * Math.PI / 180, r1 = R - 6, r2 = R - (i % 5 ? 22 : 40);
    ticks += `<line x1="${CX + r1 * Math.cos(a)}" y1="${CY + r1 * Math.sin(a)}" x2="${CX + r2 * Math.cos(a)}" y2="${CY + r2 * Math.sin(a)}" stroke="${INK}" stroke-width="${i % 5 ? 3 : 6}"/>`;
  }
  let nums = '';
  for (let i = 5; i <= 60; i += 5) { const a = (i * 6 - 90) * Math.PI / 180; nums += `<text x="${CX + (R - 70) * Math.cos(a)}" y="${CY + (R - 70) * Math.sin(a) + 13}" class="g4v-t" font-size="36">${i}</text>`; }
  return `<circle cx="${CX}" cy="${CY}" r="${R + 14}" fill="#FDE68A" stroke="${INK}" stroke-width="8"/>
    <rect x="${CX - 26}" y="${CY - R - 56}" width="52" height="34" rx="8" fill="#FDE68A" stroke="${INK}" stroke-width="6"/>
    <circle cx="${CX}" cy="${CY}" r="${R}" fill="#fff" stroke="${INK}" stroke-width="5"/>${ticks}${nums}
    <g class="g4t-min"><circle cx="${CX}" cy="${CY + 80}" r="44" fill="#F1F5F9" stroke="${INK}" stroke-width="3"/>
      ${Array.from({ length: 30 }, (_, i) => { const a = (i * 12 - 90) * Math.PI / 180; return `<line x1="${CX + 42 * Math.cos(a)}" y1="${CY + 80 + 42 * Math.sin(a)}" x2="${CX + 34 * Math.cos(a)}" y2="${CY + 80 + 34 * Math.sin(a)}" stroke="${INK}" stroke-width="2"/>`; }).join('')}
      <line class="g4t-mhand" x1="${CX}" y1="${CY + 80}" x2="${CX}" y2="${CY + 44}" stroke="#2563EB" stroke-width="6" stroke-linecap="round"/>
</g>
    <line class="g4t-shand" x1="${CX}" y1="${CY + 30}" x2="${CX}" y2="${CY - R + 26}" stroke="#DC2626" stroke-width="7" stroke-linecap="round"/>
    <circle cx="${CX}" cy="${CY}" r="12" fill="#DC2626"/>
    <text class="g4t-read" x="${CX + R + 60}" y="${CY + 16}" font-size="58" style="text-anchor:start;font-weight:800" fill="${INK}">0 giây</text>`;
}

function setWatch(t, sec) {
  t.q('.g4t-shand').setAttribute('transform', `rotate(${(sec % 60) * 6} ${CX} ${CY})`);
  t.q('.g4t-mhand').setAttribute('transform', `rotate(${(sec / 60) * 12} ${CX} ${CY + 80})`);
  const m = Math.floor(sec / 60), s = Math.floor(sec % 60);
  t.q('.g4t-read').textContent = m ? `${m} phút ${s} giây` : `${s} giây`;
}

/** Dòng thời gian các thế kỉ từ năm a+1 tới năm b (bội số của 100). */
function timelineSvg(a, b, { mark = [] } = {}) {
  const n = (b - a) / 100, x0 = 40, w = 920 / n, y = 220;
  let g = '';
  for (let i = 0; i < n; i++) {
    const c = a / 100 + i + 1;
    g += `<g class="g4t-cent" data-c="${c}"><rect x="${x0 + i * w}" y="${y}" width="${w}" height="110" fill="${i % 2 ? '#DBEAFE' : '#E0E7FF'}" stroke="${INK}" stroke-width="3"/>
      <text x="${x0 + i * w + w / 2}" y="${y + 70}" class="g4v-t" font-size="${Math.min(48, (w * 1.5) / Math.max(2, roman(c).length))}">${roman(c)}</text></g>`;
  }
  for (let i = 0; i <= n; i++) if (n <= 8 || i % 5 === 0 || i === n) g += `<text x="${x0 + i * w}" y="${y + 160}" class="g4v-t" font-size="${n <= 8 ? 26 : 22}">${a + i * 100}</text>`;
  return `<text x="500" y="${y - 30}" class="g4v-t" font-size="30" fill="#64748B">thế kỉ</text>${g}${mark.map(([yr, lab]) => {
    const x = x0 + ((yr - a) / 100) * w;
    return `<g class="g4t-mark"><line x1="${x}" y1="${y - 10}" x2="${x}" y2="${y + 120}" stroke="#DC2626" stroke-width="5"/><text x="${x}" y="${y + 200}" class="g4v-t" font-size="28" fill="#DC2626">${lab}</text></g>`;
  }).join('')}`;
}

const B19 = {
  explore: {
    setup: (board) => { const t = createCanvas(board); t.draw(watchSvg()); return t; },
    steps: [
      async (c) => {
        const t = c.t;
        t.caption('Giây là một đơn vị đo thời gian');
        await c.say('Đây là đồng hồ bấm giây. Kim đỏ chạy một vạch là 1 giây.');
        // chạy nhanh một vòng (60 giây trong khoảng 6 giây)
        const ms = anim(6000), t0 = performance.now();
        await new Promise((res) => {
          const step = (now) => {
            const sec = Math.min(60, ((now - t0) / ms) * 60);
            setWatch(t, Math.floor(sec));
            if (Math.floor(sec) % 5 === 0) sfx.tap();
            if (sec < 60) requestAnimationFrame(step); else res();
          };
          requestAnimationFrame(step);
        });
        t.caption('<b>1 phút = 60 giây</b>');
        await c.say('Kim giây chạy hết một vòng là 60 giây. Lúc đó kim phút nhích thêm 1 vạch: 1 phút bằng 60 giây.');
      },
      async (c) => {
        const t = c.t;
        setWatch(t, 0);
        t.caption('Bấm <b>Bắt đầu</b>, đếm thầm tới 10 rồi bấm <b>Dừng</b>');
        await c.say('Em thử đo xem: bấm Bắt đầu, đếm thầm một, hai, ba tới mười, rồi bấm Dừng.');
        await c.choose([{ html: '▶ Bắt đầu', value: 1 }], 1);
        let running = true;
        const t0 = performance.now();
        const loop = () => { if (!running) return; setWatch(t, (performance.now() - t0) / 1000); requestAnimationFrame(loop); };
        requestAnimationFrame(loop);
        await sleep(300);
        await c.choose([{ html: '⏹ Dừng', value: 1 }], 1);
        running = false;
        const s = Math.round((performance.now() - t0) / 1000);
        t.caption(`Em đếm tới 10 hết khoảng <b>${s} giây</b>`);
        await c.say(`Em đếm hết khoảng ${s} giây. Đếm đều từng tiếng thì mỗi tiếng khoảng 1 giây.`);
      },
      async (c) => {
        const t = c.t;
        t.draw(timelineSvg(0, 2100));
        t.caption('<b>1 thế kỉ = 100 năm</b>');
        await c.say('Thế kỉ cũng là đơn vị đo thời gian. 1 thế kỉ bằng 100 năm. Người ta viết thế kỉ bằng số La Mã.');
        await c.say('Từ năm 1 đến năm 100 là thế kỉ một. Từ năm 1901 đến năm 2000 là thế kỉ hai mươi. Từ năm 2001 đến năm 2100 là thế kỉ hai mươi mốt.', 'Năm 1–100: thế kỉ I · 1901–2000: thế kỉ XX · 2001–2100: thế kỉ XXI');
      },
      async (c) => {
        const t = c.t;
        t.draw(timelineSvg(1600, 2100, { mark: [[2025, 'năm nay']] }));
        t.caption('Năm nay thuộc thế kỉ nào?');
        await c.say('Phóng to đoạn cuối. Năm nay thuộc thế kỉ nào?');
        await c.choose(['XIX', 'XX', 'XXI'].map(x => ({ html: `Thế kỉ ${x}`, value: x })), 'XXI', { hint: 'Năm nay nằm trong khối có số La Mã nào?' });
        t.draw(timelineSvg(1600, 2100, { mark: [[1900, 'năm 1900']] }));
        t.caption('Năm 1900 thuộc thế kỉ nào?');
        await c.say('Còn năm 1900 thì sao? Cẩn thận!', 'Năm <b>1900</b> thuộc thế kỉ nào?');
        await c.choose(['XVIII', 'XIX', 'XX'].map(x => ({ html: `Thế kỉ ${x}`, value: x })), 'XIX', { hint: 'Thế kỉ XX bắt đầu từ năm 1901. Năm 1900 là năm cuối của thế kỉ trước.' });
        await c.say('Đúng rồi! Năm 1900 là năm cuối cùng của thế kỉ mười chín. Năm tròn trăm là năm kết thúc một thế kỉ.', 'Năm 1900: năm cuối của thế kỉ <b>XIX</b>');
      },
    ],
  },
  tasks: () => [taskConvert(), taskCentury(), taskConvert({ mixed: true }), taskCentury({ round: true }), taskConvert({ cent: true })],
};

function taskConvert({ mixed = false, cent = false } = {}) {
  return {
    id: `tconv${mixed ? 'm' : ''}${cent ? 'c' : ''}`,
    make: (rng) => ({ a: rng.int(2, 9), b: rng.int(5, 55), up: rng() < 0.4 }),
    async mount(f, { a, b, up }) {
      let q, ans, hint;
      if (cent) {
        if (up) { q = `${a * 100} năm = ${BOX} thế kỉ`; ans = a; } else { q = `${a} thế kỉ = ${BOX} năm`; ans = a * 100; }
        hint = '1 thế kỉ bằng 100 năm.';
      } else if (mixed) { q = `${a} phút ${b} giây = ${BOX} giây`; ans = a * 60 + b; hint = `${a} phút là ${a} lần 60 giây, cộng thêm ${b} giây.`; }
      else if (up) { q = `${a * 60} giây = ${BOX} phút`; ans = a; hint = '60 giây là 1 phút.'; }
      else { q = `${a} phút = ${BOX} giây`; ans = a * 60; hint = '1 phút bằng 60 giây.'; }
      f.q.innerHTML = `<span style="font-size:1.3em">${q}</span>`;
      const t = createCanvas(f.tool);
      if (cent) t.draw(timelineSvg(1600, 2100));
      else { t.draw(watchSvg()); setWatch(t, mixed ? a * 60 + b : a * 60); t.q('.g4t-read').style.display = 'none'; }
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 4, say: 'Điền số thích hợp.', hint });
      f.finish({ ok: q.replace(BOX, fmt(ans)) });
    },
  };
}

function taskCentury({ round = false } = {}) {
  const PEOPLE = [['Đinh Bộ Lĩnh sinh năm', 924], ['Lý Thường Kiệt sinh năm', 1019], ['Trần Hưng Đạo sinh năm', 1228], ['Nguyễn Trãi sinh năm', 1380],
    ['Lê Lợi sinh năm', 1385], ['Nguyễn Du sinh năm', 1765], ['Hồ Chí Minh sinh năm', 1890], ['Chiến thắng Bạch Đằng năm', 938], ['Chiến thắng Điện Biên Phủ năm', 1954]];
  return {
    id: `tcent${round ? 'r' : ''}`,
    make: (rng) => (round ? { y: rng.pick([1800, 1900, 2000, 1700, 1500]), who: 'Năm' } : (() => { const [who, y] = rng.pick(PEOPLE); return { who, y }; })()),
    async mount(f, { who, y }) {
      const c = centuryOf(y);
      f.q.innerHTML = `${who} <b>${y}</b>. Năm đó thuộc thế kỉ nào?`;
      const lo = Math.max(0, (c - 3) * 100), hi = lo + 500;
      const t = createCanvas(f.tool);
      t.draw(timelineSvg(lo, hi, { mark: [[y, String(y)]] }));
      const opts = [c - 1, c, c + 1].filter(x => x >= 1).map(x => ({ html: `Thế kỉ ${roman(x)}`, value: x }));
      await f.choose({ options: opts, answer: c, say: `${who} ${y}. Năm đó thuộc thế kỉ nào?`, hint: round ? 'Năm tròn trăm là năm cuối cùng của một thế kỉ.' : 'Tìm khối thế kỉ có chứa vạch đỏ.' });
      f.finish({ ok: `Năm ${y} thuộc thế kỉ ${roman(c)}.` });
    },
  };
}

export const TIME_LESSONS = { 19: B19 };
