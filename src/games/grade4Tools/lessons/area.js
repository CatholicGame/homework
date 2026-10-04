/**
 * Bài 18: Đề-xi-mét vuông, mét vuông, mi-li-mét vuông — 🔲 Lưới diện tích.
 * Một khung nhìn liền mạch: 1 cm² → 1 dm² (100 ô cm²) → thu nhỏ ra 1 m² (100 ô dm², có bạn nhỏ đứng cạnh) →
 * phóng vào 1 cm² (100 ô mm², có con kiến). Đơn vị vẽ: 1 cm = 34.
 */

import { createCanvas } from '../canvas.js';
import { BOX } from '../practice.js';
import { sleep } from '../../grade3Drills/kit.js';
import { sfx, INK } from '../frame.js';
import { fmt, fmtSp } from '../num.js';

const CM = 34;
const DX = 560, DY = 130; // góc trái trên của hình vuông 1 dm²
const NS = 'vector-effect="non-scaling-stroke"';

function gridSq(x, y, n, s, { fill = '#fff', line = '#93C5FD', w = 2, outer = INK, ow = 5, cls = '' } = {}) {
  let g = `<g class="${cls}"><rect x="${x}" y="${y}" width="${n * s}" height="${n * s}" fill="${fill}"/>`;
  for (let i = 1; i < n; i++) g += `<line x1="${x + i * s}" y1="${y}" x2="${x + i * s}" y2="${y + n * s}" stroke="${line}" stroke-width="${w}" ${NS}/><line x1="${x}" y1="${y + i * s}" x2="${x + n * s}" y2="${y + i * s}" stroke="${line}" stroke-width="${w}" ${NS}/>`;
  return `${g}<rect x="${x}" y="${y}" width="${n * s}" height="${n * s}" fill="none" stroke="${outer}" stroke-width="${ow}" ${NS}/></g>`;
}
/** Bạn nhỏ đứng (cao h, chân tại x, y). */
const kid = (x, y, h) => {
  const k = h / 130;
  return `<g transform="translate(${x} ${y}) scale(${k})"><circle cx="0" cy="-112" r="16" fill="#FCD9B6" stroke="${INK}" stroke-width="3" ${NS}/>
    <path d="M-14 -122 Q0 -138 14 -122" fill="#7C2D12"/><rect x="-16" y="-94" width="32" height="44" rx="8" fill="#38BDF8" stroke="${INK}" stroke-width="3" ${NS}/>
    <rect x="-14" y="-52" width="12" height="52" fill="#1E3A8A" stroke="${INK}" stroke-width="3" ${NS}/><rect x="2" y="-52" width="12" height="52" fill="#1E3A8A" stroke="${INK}" stroke-width="3" ${NS}/></g>`;
};
/** Con kiến nhỏ (dài khoảng l). */
const ant = (x, y, l) => {
  const k = l / 30;
  return `<g transform="translate(${x} ${y}) scale(${k})" fill="${INK}"><ellipse cx="-10" cy="0" rx="7" ry="5"/><ellipse cx="2" cy="0" rx="5" ry="4"/><circle cx="11" cy="-1" r="4.5"/>
    <path d="M-8 3 L-14 9 M-2 3 L-2 10 M4 3 L9 9 M-8 -3 L-14 -9 M-2 -3 L-2 -10 M4 -3 L9 -9 M13 -4 L18 -10" stroke="${INK}" stroke-width="1.6" fill="none"/></g>`;
};

const B18 = {
  explore: {
    setup: (board) => createCanvas(board),
    steps: [
      async (c) => {
        const t = c.t;
        t.draw(`
          <g class="g4ar-cm"><rect x="200" y="${DY + 150}" width="${CM}" height="${CM}" fill="#F472B6" stroke="${INK}" stroke-width="4" ${NS}/>
            <text x="${200 + CM / 2}" y="${DY + 125}" class="g4v-t" font-size="34">1 cm²</text>
            <text x="${200 + CM / 2}" y="${DY + 230}" class="g4v-t" font-size="24" fill="#64748B">cạnh 1 cm</text></g>
          ${gridSq(DX, DY, 10, CM, { cls: 'g4ar-dm', line: '#E2E8F0' })}
          <text x="${DX + 5 * CM}" y="${DY - 22}" class="g4v-t" font-size="34">1 dm²</text>
          <text x="${DX + 5 * CM}" y="${DY + 10 * CM + 36}" class="g4v-t" font-size="24" fill="#64748B">cạnh 1 dm</text>`);
        t.caption('Đề-xi-mét vuông là diện tích hình vuông cạnh <b>1 dm</b>');
        await c.say('Hình vuông nhỏ màu hồng có cạnh 1 xăng-ti-mét, diện tích là 1 xăng-ti-mét vuông. Hình vuông lớn có cạnh 1 đề-xi-mét, diện tích là 1 đề-xi-mét vuông.');
        // lát ô 1 cm² kín hình vuông 1 dm², từng hàng
        let cells = '';
        for (let j = 0; j < 10; j++) for (let i = 0; i < 10; i++) cells += `<rect class="g4ar-c g4ar-r${j}" x="${DX + i * CM + 2}" y="${DY + j * CM + 2}" width="${CM - 4}" height="${CM - 4}" rx="3" fill="#F9A8D4"/>`;
        t.add(`<g>${cells}</g>`);
        t.qa('.g4ar-c').forEach(e => { e.style.opacity = 0; });
        await c.say('Lát kín hình vuông lớn bằng các ô 1 xăng-ti-mét vuông.');
        for (let j = 0; j < 10; j++) {
          await t.anim(`.g4ar-r${j}`, [{ opacity: 0, transform: 'translateY(-20px)' }, { opacity: 1, transform: 'none' }], 260, { stagger: 22 });
          sfx.pop(j);
        }
      },
      async (c) => {
        const t = c.t;
        t.caption('1 dm² gồm bao nhiêu ô 1 cm²?');
        await c.say('Hình vuông 1 đề-xi-mét vuông gồm bao nhiêu ô 1 xăng-ti-mét vuông?');
        await c.choose([{ html: '10 ô', value: 10 }, { html: '100 ô', value: 100 }, { html: '1 000 ô', value: 1000 }], 100, { hint: 'Mỗi hàng có 10 ô, có 10 hàng như vậy.' });
        t.caption('<b>1 dm² = 100 cm²</b>');
        await c.say('Đúng rồi! 10 hàng, mỗi hàng 10 ô: 100 ô. Vậy 1 đề-xi-mét vuông bằng 100 xăng-ti-mét vuông.');
      },
      async (c) => {
        const t = c.t;
        // 1 m² = 10 × 10 ô dm²: mỗi ô 340 đơn vị, ô đầu tiên trùng hình vuông 1 dm² vừa lát.
        const S = 10 * CM;
        t.add(`${gridSq(DX, DY, 10, S, { fill: 'none', line: '#60A5FA', w: 2.5, ow: 6 })}
          <rect x="${DX}" y="${DY}" width="${S}" height="${S}" fill="#F9A8D4" opacity="0.6"/>
          <text x="${DX + 5 * S}" y="${DY - 240}" class="g4v-t" font-size="300">1 m²</text>
          ${kid(DX - 900, DY + 10 * S, 13 * S)}
          <text x="${DX - 900}" y="${DY + 10 * S + 330}" class="g4v-t" font-size="230" fill="#64748B">cao khoảng 1 m 3 dm</text>`);
        t.caption('Thu nhỏ để nhìn xa hơn…');
        await c.say('Bây giờ thu nhỏ để nhìn xa hơn.');
        await t.view(DX - 2100, DY - 1300, 6400, 5300, 2200);
        t.caption('Mét vuông: hình vuông cạnh <b>1 m</b> · <b>1 m² = 100 dm²</b>');
        await c.say('Ô màu hồng chính là 1 đề-xi-mét vuông. Hình vuông cạnh 1 mét có 10 hàng, mỗi hàng 10 ô như vậy. 1 mét vuông bằng 100 đề-xi-mét vuông.');
        await c.say('Bạn nhỏ cao khoảng 1 mét 3 đề-xi-mét đứng cạnh. 1 mét vuông vừa đủ chỗ cho một bạn nằm co chân.');
      },
      async (c) => {
        const t = c.t;
        // mm²: phóng vào ô 1 cm² màu hồng bên trái
        const x = 200, y = DY + 150;
        t.add(`${gridSq(x, y, 10, CM / 10, { fill: 'none', line: '#BE185D', w: 1.2, ow: 2.5 })}${ant(x + CM * 0.55, y + CM * 0.62, CM * 0.32)}
          <text x="${x + CM / 2}" y="${y - 4}" class="g4v-t" font-size="3.6">1 cm² = 100 mm²</text>`);
        t.caption('Phóng to ô 1 cm²…');
        await c.say('Còn những vật rất nhỏ thì sao? Phóng to ô 1 xăng-ti-mét vuông.');
        await t.view(x - CM * 0.35, y - CM * 0.42, CM * 1.7, CM * 1.6, 2200);
        t.caption('Mi-li-mét vuông: hình vuông cạnh <b>1 mm</b> · <b>1 cm² = 100 mm²</b>');
        await c.say('Ô nhỏ nhất có cạnh 1 mi-li-mét, diện tích là 1 mi-li-mét vuông. 1 xăng-ti-mét vuông bằng 100 mi-li-mét vuông. Chú kiến chỉ chiếm vài mi-li-mét vuông.');
      },
      async (c) => {
        const t = c.t;
        t.resetView();
        t.draw('');
        t.caption('Chọn đơn vị đo thích hợp');
        for (const [ic, name, n, u] of [['📮', 'Con tem', 6, 'cm²'], ['🏫', 'Nền lớp học', 60, 'm²'], ['🪑', 'Mặt bàn học', 30, 'dm²']]) {
          t.draw(`<text x="500" y="250" class="g4v-t" font-size="170">${ic}</text><text x="500" y="350" class="g4v-t" font-size="52">${name}: ${n} … ?</text>`);
          await c.say(`${name} có diện tích khoảng ${n}, đơn vị nào?`);
          await c.choose(['mm²', 'cm²', 'dm²', 'm²'].map(x => ({ html: `${n} ${x}`, value: x })), u, { hint: 'Vật nhỏ dùng đơn vị nhỏ, vật lớn dùng đơn vị lớn.' });
          await sleep(400);
        }
      },
      async (c) => {
        const t = c.t;
        t.draw('');
        t.caption('Lát mặt bàn dài 6 dm, rộng 4 dm bằng các tấm <b>1 dm²</b>');
        const s = 90, x0 = 500 - 3 * s, y0 = 120;
        t.tiles(x0, y0, 6, 4, s, { color: '#FDBA74', label: true });
        t.add(`<text x="500" y="${y0 - 20}" class="g4v-t" font-size="34">6 dm</text><text x="${x0 - 20}" y="${y0 + 2 * s + 12}" class="g4v-t" font-size="34" style="text-anchor:end">4 dm</text>`);
        await c.say('Bấm vào các ô để lát kín mặt bàn bằng các tấm 1 đề-xi-mét vuông.', 'Bấm các ô để lát kín.');
        await c.until(t, () => t.tileCount() >= 24, { nudge: 'Bấm vào những ô còn trống.' });
        t.caption('6 × 4 = <b>24 dm²</b>');
        await c.say('Cần 24 tấm. Mỗi hàng 6 tấm, có 4 hàng: 6 nhân 4 bằng 24. Mặt bàn có diện tích 24 đề-xi-mét vuông.');
      },
    ],
  },
  tasks: () => [taskConvert(), taskConvert({ back: true }), taskUnit(), taskTiles(), taskConvert({ mixed: true })],
};

// ── Thực hành ─────────────────────────────────────────────────────────────────────────────────────────
const U = ['mm²', 'cm²', 'dm²', 'm²'];

function taskConvert({ back = false, mixed = false } = {}) {
  return {
    id: `aconv${back ? 'b' : ''}${mixed ? 'm' : ''}`,
    make: (rng) => ({ i: rng.int(1, 3), a: rng.int(2, 9), b: rng.int(1, 99) }),
    async mount(f, { i, a, b }) {
      // i: đơn vị lớn (cm², dm², m²); đơn vị nhỏ = i − 1
      let q, ans, spoken;
      if (mixed) { q = `${a} ${U[i]} ${b} ${U[i - 1]} = ${BOX} ${U[i - 1]}`; ans = a * 100 + b; spoken = 'Đổi ra đơn vị nhỏ hơn.'; }
      else if (back) { q = `${fmt(a * 100)} ${U[i - 1]} = ${BOX} ${U[i]}`; ans = a; spoken = 'Đổi ra đơn vị lớn hơn.'; }
      else { q = `${a} ${U[i]} = ${BOX} ${U[i - 1]}`; ans = a * 100; spoken = 'Đổi ra đơn vị nhỏ hơn.'; }
      f.q.innerHTML = `<span style="font-size:1.3em">${q}</span>`;
      const t = createCanvas(f.tool);
      t.draw(`${gridSq(330, 40, 10, 34)}<rect x="330" y="40" width="34" height="34" fill="#F9A8D4"/>
        <text x="500" y="440" class="g4v-t" font-size="40">1 ${U[i]} = 100 ${U[i - 1]}</text>`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: ans, max: 5, say: spoken, hint: `1 ${U[i]} bằng 100 ${U[i - 1]}.`.replace(/²/g, ' vuông') });
      f.finish({ ok: q.replace(BOX, fmt(ans)) });
    },
  };
}

function taskUnit() {
  const ITEMS = [['📮', 'Con tem', 6, 'cm²'], ['🏫', 'Nền lớp học', 60, 'm²'], ['🪑', 'Mặt bàn học', 30, 'dm²'], ['🔘', 'Mặt cúc áo', 80, 'mm²'],
    ['📕', 'Bìa quyển sách', 6, 'dm²'], ['⚽', 'Sân bóng đá mini', 800, 'm²'], ['🧽', 'Mặt cục tẩy', 8, 'cm²'], ['🖼️', 'Bức tranh treo tường', 40, 'dm²']];
  return {
    id: 'aunit',
    make: (rng) => ({ k: rng.int(0, ITEMS.length - 1) }),
    async mount(f, { k }) {
      const [ic, name, n, u] = ITEMS[k];
      f.q.innerHTML = `<span style="font-size:2.4em">${ic}</span><br>${name} có diện tích khoảng:`;
      await f.choose({ options: U.map(x => ({ html: `${n} ${x}`, value: x })), answer: u, say: `${name} có diện tích khoảng bao nhiêu?`, hint: 'Vật nhỏ dùng đơn vị nhỏ, vật lớn dùng đơn vị lớn.' });
      f.finish({ ok: `${name}: khoảng ${n} ${u}.` });
    },
  };
}

function taskTiles() {
  return {
    id: 'atiles',
    make: (rng) => ({ w: rng.int(3, 8), h: rng.int(2, 5), u: rng.pick(['dm', 'm', 'cm']) }),
    async mount(f, { w, h, u }) {
      f.q.innerHTML = `Hình chữ nhật dài ${w} ${u}, rộng ${h} ${u} có diện tích ${BOX} ${u}²`;
      const t = createCanvas(f.tool);
      const s = Math.min(800 / w, 420 / h), x0 = 500 - (w * s) / 2, y0 = 40;
      let g = '';
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) g += `<rect class="g4ar-t" x="${x0 + i * s}" y="${y0 + j * s}" width="${s}" height="${s}" fill="#FED7AA" stroke="${INK}" stroke-width="2"/>`;
      t.draw(`<g>${g}</g><rect x="${x0}" y="${y0}" width="${w * s}" height="${h * s}" fill="none" stroke="${INK}" stroke-width="5"/>
        <text x="500" y="${y0 + h * s + 50}" class="g4v-t" font-size="36">mỗi ô là 1 ${u}²</text>`);
      await f.ask({ box: f.q.querySelector('.g4-box'), answer: w * h, max: 3, say: 'Tính diện tích hình chữ nhật.', hint: `Mỗi hàng có ${w} ô, có ${h} hàng.` });
      await t.anim('.g4ar-t', [{ fill: '#FDBA74' }, { fill: '#86EFAC' }], 300, { stagger: 30 });
      f.finish({ ok: `${w} × ${h} = ${w * h} ${u}²` });
    },
  };
}

export const AREA_LESSONS = { 18: B18 };
export { fmtSp };
