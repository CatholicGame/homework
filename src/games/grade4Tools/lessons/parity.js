/**
 * Bài 3: Số chẵn, số lẻ — 🏘️ Phố chẵn lẻ.
 * Các chấm xếp thành từng đôi: không thừa → số chẵn; thừa 1 chấm → số lẻ. Sau đó chỉ cần nhìn chữ số tận cùng.
 * Phố: nhà số chẵn một bên, nhà số lẻ một bên; bác đưa thư mang thư sang đúng bên.
 */

import { createCanvas } from '../canvas.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK } from '../frame.js';
import { fmt, readVN } from '../num.js';

const EVEN = '#2563EB', ODD = '#EA580C';

/**
 * n chấm (n ≤ 20) xếp theo từng đôi; chấm lẻ ra sáng màu cam. Tờ giấy ngang: hai hàng, mỗi đôi một cột
 * (khung DOTS_WIDE); tờ giấy dựng đứng (tall): hai cột, mỗi đôi một hàng (khung DOTS_TALL), chấm to gấp đôi.
 */
const DOTS_WIDE = [150, 60, 700, 350], DOTS_TALL = [300, 20, 400, 860];
function dotsSvg(n, tall = false) {
  const pairs = Math.floor(n / 2), odd = n % 2, s = 92, groups = pairs + odd;
  // vị trí chấm thứ k: theo đôi (a) và trong đôi (b)
  const x0 = 500 - (groups * s) / 2 + s / 2, y0 = 250;               // ngang
  const tx = 500 - s / 2, ty = 470 - (groups * s) / 2 + s / 2;        // dọc: nhóm chấm giữa khung
  const at = (a, b) => (tall ? [tx + b * s, ty + a * s] : [x0 + a * s, y0 + b * s]);
  let g = '';
  for (let k = 0; k < n; k++) {
    const isOdd = odd && k === n - 1;
    const [cx, cy] = at(Math.floor(k / 2), k % 2);
    g += `<circle class="g4pa-d" cx="${cx}" cy="${cy}" r="36" fill="${isOdd ? ODD : '#60A5FA'}" stroke="${INK}" stroke-width="2.5" data-k="${k}"/>`;
  }
  for (let a = 0; a < pairs; a++) {
    const [cx, cy] = at(a, 0);
    g += tall
      ? `<rect class="g4pa-pair" x="${cx - 44}" y="${cy - 44}" width="${s + 88}" height="88" rx="42" fill="none" stroke="#16A34A" stroke-width="4" stroke-dasharray="8 6" opacity="0"/>`
      : `<rect class="g4pa-pair" x="${cx - 44}" y="${cy - 44}" width="88" height="${s + 88}" rx="42" fill="none" stroke="#16A34A" stroke-width="4" stroke-dasharray="8 6" opacity="0"/>`;
  }
  return `<text x="500" y="${tall ? ty - 66 : 160}" class="g4v-t" font-size="110">${n}</text>${g}`;
}

/** Con phố: dãy nhà chẵn trên, dãy nhà lẻ dưới, mỗi nhà một số. */
function streetSvg(evens, odds) {
  // Nhà to hơn (×1,35), biển số rộng gần hết thân nhà: số nhà phải đọc được cả khi tờ giấy dựng đứng.
  const house = (x, y, n, c) => `<g transform="translate(${x} ${y}) scale(1.35)"><path d="M-55 0 L0 -50 L55 0 Z" fill="${c}" stroke="${INK}" stroke-width="2.5" stroke-linejoin="round"/>
    <rect x="-45" y="0" width="90" height="70" fill="#FFF7ED" stroke="${INK}" stroke-width="2.5"/><rect x="-12" y="40" width="24" height="30" fill="#92400E" stroke="${INK}" stroke-width="2"/>
    <rect x="-41" y="4" width="82" height="32" rx="6" fill="#fff" stroke="#94A3B8" stroke-width="1.5"/><text x="0" y="29" class="g4v-t" font-size="${Math.min(28, 74 / (fmt(n).length * 0.56))}">${fmt(n)}</text></g>`;
  return `<rect x="0" y="0" width="1000" height="560" fill="#BBF7D0"/>
    <rect x="0" y="250" width="1000" height="110" fill="#94A3B8"/><path d="M0 305 H1000" stroke="#fff" stroke-width="6" stroke-dasharray="40 30"/>
    <text x="115" y="40" class="g4v-t" font-size="28" style="text-anchor:start" fill="${EVEN}">Bên số chẵn</text>
    <text x="115" y="553" class="g4v-t" font-size="28" style="text-anchor:start" fill="${ODD}">Bên số lẻ</text>
    ${evens.map((n, i) => house(170 + i * 160, 140, n, EVEN)).join('')}
    ${odds.map((n, i) => house(170 + i * 160, 428, n, ODD)).join('')}`;
}

const B3 = {
  explore: {
    setup: (board) => createCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        const tall = t.portrait();
        t.frame(...(tall ? DOTS_TALL : DOTS_WIDE)); // khung đủ cho 13 chấm, giữ nguyên cỡ chấm suốt bước
        t.caption('Xếp các chấm thành <b>từng đôi</b>');
        for (const n of [6, 7, 10, 13]) {
          t.draw(dotsSvg(n, tall));
          await t.anim('.g4pa-d', [{ opacity: 0, transform: 'translateY(-30px)' }, { opacity: 1, transform: 'none' }], 300, { stagger: 50 });
          await t.anim('.g4pa-pair', [{ opacity: 0 }, { opacity: 1 }], 300, { stagger: 80 });
          const even = n % 2 === 0;
          t.caption(even ? `${n}: vừa đủ từng đôi → <b style="color:${EVEN}">số chẵn</b>` : `${n}: thừa 1 chấm → <b style="color:${ODD}">số lẻ</b>`);
          await c.say(even ? `${n} chấm xếp vừa đủ từng đôi, không thừa. ${readVN(n)} là số chẵn.` : `${n} chấm xếp từng đôi thì thừa ra 1 chấm. ${readVN(n)} là số lẻ.`);
          sfx.ding();
        }
        await c.say('Số chia hết cho 2 là số chẵn. Số không chia hết cho 2 là số lẻ.', 'Chia hết cho 2: <b>chẵn</b> · không chia hết cho 2: <b>lẻ</b>');
      },
      async (c) => {
        const t = c.t;
        const ns = [36, 315, 108, 71, 194, 2027];
        t.frame(150, 40, 700, 420);
        t.draw(ns.map((n, i) => {
          const s = String(n), last = s.slice(-1), head = s.slice(0, -1);
          const even = n % 2 === 0;
          return `<text x="${i % 2 ? 700 : 300}" y="${130 + Math.floor(i / 2) * 150}" class="g4v-t" font-size="80"><tspan class="g4pa-head">${head}</tspan><tspan fill="${even ? EVEN : ODD}" text-decoration="underline">${last}</tspan></text>`;
        }).join(''));
        t.caption('Chỉ cần nhìn <b>chữ số tận cùng</b>');
        await c.say('Muốn biết một số chẵn hay lẻ, chỉ cần nhìn chữ số tận cùng.');
        await t.anim('.g4pa-head', [{ opacity: 1 }, { opacity: 0.2 }], 600);
        t.caption(`Tận cùng <b style="color:${EVEN}">0, 2, 4, 6, 8</b>: số chẵn · tận cùng <b style="color:${ODD}">1, 3, 5, 7, 9</b>: số lẻ`);
        await c.say('Các số có chữ số tận cùng là 0, 2, 4, 6, 8 là số chẵn. Các số có chữ số tận cùng là 1, 3, 5, 7, 9 là số lẻ.');
      },
      async (c) => {
        const t = c.t;
        t.frame(100, 0, 800, t.portrait() ? 560 : 670); // sát dãy nhà, ngang chừa dải cỏ đáy cho nút chọn; phần thừa là cỏ
        t.svg.style.background = '#BBF7D0';
        t.draw(streetSvg([10, 12, 14, 16, 18], [11, 13, 15, 17, 19]));
        t.caption('Nhà số chẵn một bên, nhà số lẻ một bên');
        await c.say('Trên một con phố, người ta đánh số nhà chẵn ở một bên, số lẻ ở bên kia, để dễ tìm. Hai nhà cạnh nhau cùng bên hơn kém nhau 2 đơn vị.');
        for (const n of [152, 2049, 3786]) {
          t.add(`<g class="g4pa-letter"><rect x="430" y="270" width="140" height="80" rx="8" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M430 270 L500 315 L570 270" fill="none" stroke="${INK}" stroke-width="2.5"/>
            <text x="500" y="345" class="g4v-t" font-size="26">Số ${fmt(n)}</text></g>`);
          t.caption(`Thư gửi nhà số <b>${fmt(n)}</b>: bên nào?`);
          await c.say(`Bác đưa thư cầm thư gửi nhà số ${readVN(n)}. Mang sang bên nào?`);
          await c.choose([{ html: `<span style="color:${EVEN}">⬆ Bên số chẵn</span>`, value: 0 }, { html: `<span style="color:${ODD}">⬇ Bên số lẻ</span>`, value: 1 }], n % 2, { hint: 'Nhìn chữ số tận cùng của số nhà.' });
          await t.anim('.g4pa-letter', [{ transform: 'none' }, { transform: `translateY(${n % 2 ? 150 : -150}px)`, opacity: 0 }], 600);
          t.q('.g4pa-letter')?.remove();
        }
        await c.say('Giỏi lắm! Em đã đưa thư đúng nhà.');
      },
    ],
  },
  tasks: () => [taskWhich(), taskSeq(), taskWhich({ big: true }), taskMake()],
};

function taskWhich({ big = false } = {}) {
  return {
    id: `par${big ? 'b' : ''}`,
    make: (rng) => ({ n: big ? rng.int(10000, 999999) : rng.int(11, 999) }),
    async mount(f, { n }) {
      f.q.innerHTML = `Số <b style="font-size:1.4em">${fmt(n)}</b> là số chẵn hay số lẻ?`;
      const t = createCanvas(f.tool);
      t.draw(streetSvg([20, 22, 24, 26, 28], [21, 23, 25, 27, 29]));
      await f.choose({ options: [{ html: `<span style="color:${EVEN}">Số chẵn</span>`, value: 0 }, { html: `<span style="color:${ODD}">Số lẻ</span>`, value: 1 }], answer: n % 2, say: 'Số này chẵn hay lẻ?', hint: 'Nhìn chữ số tận cùng: 0, 2, 4, 6, 8 là số chẵn.' });
      f.finish({ ok: `Chữ số tận cùng là ${n % 10}: ${n % 2 ? 'số lẻ' : 'số chẵn'}.` });
    },
  };
}

/** Số nhà còn thiếu trong dãy nhà chẵn / lẻ. */
function taskSeq() {
  return {
    id: 'parseq',
    make: (rng) => { const odd = rng() < 0.5; const a = rng.int(50, 900) * 2 + (odd ? 1 : 0); return { a, k: rng.int(1, 3) }; },
    async mount(f, { a, k }) {
      const ns = [0, 1, 2, 3, 4].map(i => a + 2 * i);
      f.q.innerHTML = ns.map((n, i) => (i === k ? BOX : fmt(n))).join(' · ');
      const t = createCanvas(f.tool);
      t.draw(a % 2 ? streetSvg([], ns) : streetSvg(ns, []));
      t.qa('text').forEach(e => { if (e.textContent === fmt(ns[k])) e.textContent = '?'; });
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ns[k], max: 5, say: 'Điền số nhà còn thiếu.', hint: 'Hai nhà cạnh nhau cùng bên hơn kém nhau 2 đơn vị.' });
      t.qa('text').forEach(e => { if (e.textContent === '?') e.textContent = fmt(ns[k]); });
      f.finish({ ok: `Dãy ${a % 2 ? 'số lẻ' : 'số chẵn'} cách đều 2.` });
    },
  };
}

/** Từ ba thẻ số, chọn số chẵn / lẻ lập được. */
function taskMake() {
  return {
    id: 'parmake',
    make: (rng) => { const ds = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3); return { ds, odd: rng() < 0.5 }; },
    async mount(f, { ds, odd }) {
      const nums = [];
      for (const x of ds) for (const y of ds) if (x !== y) nums.push(x * 10 + y);
      const good = nums.filter(n => n % 2 === (odd ? 1 : 0));
      const bad = nums.filter(n => n % 2 !== (odd ? 1 : 0));
      if (!good.length || bad.length < 2) { f.q.innerHTML = 'Số 48 là số chẵn hay lẻ?'; await f.choose({ options: [{ html: 'Số chẵn', value: 0 }, { html: 'Số lẻ', value: 1 }], answer: 0 }); f.finish({ ok: 'Tận cùng là 8: số chẵn.' }); return; }
      const ans = good[0];
      const opts = [ans, bad[0], bad[bad.length - 1]].sort((p, q) => p - q);
      f.q.innerHTML = `Thẻ số: ${ds.map(d => `<span class="g4-box" style="border-style:solid">${d}</span>`).join(' ')}<br>Số nào là <b style="color:${odd ? ODD : EVEN}">số ${odd ? 'lẻ' : 'chẵn'}</b>?`;
      await f.choose({ options: opts.map(n => ({ html: String(n), value: n })), answer: ans, cls: 'g4-choice-big', say: `Số nào là số ${odd ? 'lẻ' : 'chẵn'}?`, hint: 'Nhìn chữ số tận cùng.' });
      f.finish({ ok: `${ans} có chữ số tận cùng ${ans % 10}: số ${odd ? 'lẻ' : 'chẵn'}.` });
    },
  };
}

export const PARITY_LESSONS = { 3: B3 };
export { sleep };
