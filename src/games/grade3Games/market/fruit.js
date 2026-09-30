/**
 * 🍎 Chợ phiên — Quầy trái cây: bé đặt quả cân đúng số khách mua, nhặt từng quả (to nhỏ khác nhau)
 * từ sạp lên đĩa cân cho tới khi cân thăng bằng,
 * tính tiền (và trả tiền thừa ở cấp 4). Thiết kế: docs/lop_3/thiet-ke-tro-choi-tap1.md §4.1.
 */

import { mountScale } from '../art/scale.js';
import { weightIcon, weightLabel, weightSize } from '../art/weights.js';
import { FRUITS, fruitIcon, pieceIcon, panHeapSvg } from '../art/fruits.js';
import { NPCS, cap } from '../npc.js';
import { mountStall, Q } from './stall.js';
import { stallMeta, levelMeta, tablesText } from '../catalog.js';
import { flyOne, svgBoxOnScreen } from '../fly.js';
import { sfx } from '../../preschool/fx.js';

// Giá và cân nặng sát chợ thật (2026), để bé không hiểu sai thực tế:
//   tens: giá tròn chục (nghìn đồng / 1 kg) · mixed: giá lẻ · Quả bán theo gam: per100 = giá cho 100 g.
//   sizes: các cỡ quả (hoặc chùm) có trên sạp, gam — sát thực tế, cách nhau đủ rõ để nhìn là thấy quả
//   to, quả nhỏ. Cân nặng KHÔNG ghi trên quả: bé ước chừng (1 quả to ≈ 2 quả nhỏ) rồi nhìn cân
//   để sửa — không thì cần gì cân. min: khách mua ít nhất bao nhiêu kg (100 g).
const KG_FRUITS = {
  cam: { tens: [20, 30], mixed: [22, 25, 28, 32, 35], sizes: [150, 200, 250, 300] },
  tao: { tens: [40, 50, 60], mixed: [45, 48, 55, 65], sizes: [150, 200, 250, 300] },
  xoai: { tens: [30, 40, 50], mixed: [35, 38, 42, 45], sizes: [300, 400, 500, 600] },
  thanhlong: { tens: [20, 30], mixed: [25, 28, 32, 35], sizes: [300, 400, 500, 700] },
  buoi: { tens: [30, 40], mixed: [32, 35, 38, 45], sizes: [1000, 1500, 2000], min: 2 },
  duahau: { tens: [20], mixed: [12, 15, 18], sizes: [1500, 2000, 3000, 4000], min: 2 },
};
const G_FRUITS = {
  nho: { per100: [8, 9, 10, 12, 15], sizes: [150, 200, 300, 400], min: 2 },
  dau: { per100: [25, 30, 35, 40], sizes: [20, 25, 30, 40] },
  nhan: { per100: [5, 6, 7, 8], sizes: [200, 250, 300, 500], min: 2 },
  chanh: { per100: [2, 3, 4], sizes: [50, 70, 100] },
};
// Khách mua vừa đủ để nhặt: phần đúng có tối đa MAX_PICK quả; sạp bày thêm level.extra quả khác
// (cùng các cỡ đó) để bé phải ước chừng, chọn quả to/nhỏ, không nhặt bừa.
const MAX_PICK = 6;
// Bộ quả cân như ở trường: mỗi loại 1–2 quả, đủ cân mọi số từ 1 tới 9 (hoặc 100 tới 900 g).
const KG_SET = [5000, 2000, 2000, 1000, 1000];
const G_SET = [500, 200, 200, 100, 100];
// Tờ tiền thật khách hay đưa (nghìn đồng).
const NOTES = [100, 200, 500];

// price(info, rng-free): các giá hợp lệ cho một loại quả ở cấp này.
export const FRUIT_LEVELS = [
  {
    ...levelMeta('fruit-1'), missions: 5,
    knowledge: 'ki-lô-gam (lớp 2), bảng nhân 2, bảng nhân 5 và số tròn chục',
    ask: (n) => `Cân đúng số ki-lô-gam rồi tính tiền giúp ${n.me}!`,
    desc: 'Khách mua mấy ki-lô-gam, em chọn quả cân cộng lại đúng bằng số đó. Giá tròn chục: 20 hoặc 50 nghìn đồng 1 kg.',
    unit: 'kg', mass: [1, 9], price: (f) => f.tens.filter(p => p === 20 || p === 50), steps: ['pick', 'total'],
    sizes: 2, extra: [4, 5], // sạp có 2 cỡ quả: to / nhỏ
  },
  {
    ...levelMeta('fruit-2'), missions: 5,
    knowledge: 'bảng nhân 3 đến bảng nhân 9 và số tròn chục',
    ask: (n) => `Giá 30, 40, 60 nghìn đồng 1 kg, cân rồi tính tiền giúp ${n.me}!`,
    desc: 'Giá tròn chục như 30, 40, 60 nghìn đồng 1 kg: 3 chục × 4 = 12 chục.',
    unit: 'kg', mass: [2, 9], price: (f) => f.tens.filter(p => p !== 20 && p !== 50), steps: ['pick', 'total'],
    sizes: 2, extra: [5, 6],
  },
  {
    ...levelMeta('fruit-3'), missions: 5,
    knowledge: 'nhân số có hai chữ số với số có một chữ số',
    ask: (n) => `Giá lẻ như ở chợ thật, cân rồi tính tiền giúp ${n.me}!`,
    desc: 'Giá như ở chợ: 25, 38, 45 nghìn đồng 1 kg.',
    unit: 'kg', mass: [2, 6], price: (f) => f.mixed, steps: ['pick', 'total'],
    sizes: 3, extra: [5, 7], // to / vừa / nhỏ
  },
  {
    ...levelMeta('fruit-4'), missions: 5,
    knowledge: 'bài toán giải bằng hai bước tính',
    ask: (n) => `Cân, tính tiền rồi trả lại tiền thừa cho ${n.me}!`,
    desc: 'Tính tiền rồi trả lại tiền thừa khi khách đưa tờ 100, 200 hay 500 nghìn đồng.',
    unit: 'kg', mass: [2, 5], price: (f) => [...f.tens, ...f.mixed], steps: ['pick', 'total', 'change'],
    sizes: 4, extra: [6, 8],
  },
  {
    ...levelMeta('fruit-5'), missions: 5,
    knowledge: 'gam, ki-lô-gam (1 kg = 1 000 g)',
    ask: (n) => `Hôm nay cân bằng gam, cân rồi tính tiền giúp ${n.me}!`,
    desc: 'Khách mua mấy trăm gam nho, dâu tây, nhãn, chanh: chọn quả cân 100 g, 200 g, 500 g cho đúng; giá tính cho 100 g.',
    unit: 'g', mass: [1, 9], price: (f) => f.per100, steps: ['pick', 'total'],
    sizes: 3, extra: [5, 7],
  },
];

function range(a, b) {
  const out = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}

const fmt = (n) => (n >= 1000 ? `${Math.floor(n / 1000)} ${String(n % 1000).padStart(3, '0')}` : String(n));

/** Mọi cách chọn ≤ MAX_PICK quả từ các cỡ `sizes` (gam) cho đủ đúng `g` gam: mảng số quả mỗi cỡ. */
function combos(sizes, g) {
  const out = [];
  const counts = Array(sizes.length).fill(0);
  const rec = (i, left, picked) => {
    if (left === 0) { out.push(counts.slice()); return; }
    if (i === sizes.length || picked === MAX_PICK) return;
    for (let c = 0; c * sizes[i] <= left && picked + c <= MAX_PICK; c++) {
      counts[i] = c;
      rec(i + 1, left - c * sizes[i], picked + c);
    }
    counts[i] = 0;
  };
  rec(0, g, 0);
  return out;
}

/**
 * Các bộ `n` cỡ quả (lấy từ info.sizes) bày được lên sạp sao cho nhặt đủ đúng `g` gam — mỗi bộ kèm
 * các cách nhặt. Ưu tiên cách nhặt phải phối ít nhất 2 cỡ (bé phải so quả to với quả nhỏ).
 */
function sizeSets(info, n, g) {
  const all = info.sizes;
  const k = Math.min(n, all.length);
  const sets = [];
  const choose = (start, cur) => {
    if (cur.length === k) {
      const ways = combos(cur, g);
      if (ways.length) sets.push({ sizes: cur, ways, mixed: ways.filter(w => w.filter(Boolean).length >= Math.min(2, k)) });
      return;
    }
    for (let i = start; i < all.length; i++) choose(i + 1, [...cur, all[i]]);
  };
  choose(0, []);
  const mixed = sets.filter(st => st.mixed.length).map(st => ({ ...st, ways: st.mixed }));
  return mixed.length ? mixed : sets;
}

/**
 * Sạp hàng: một cách nhặt đúng `g` gam (các quả to nhỏ theo bộ cỡ đã chọn) + vài quả thêm cùng các cỡ
 * đó, trộn lẫn — luôn nhặt được cho cân thăng bằng. Trả về mảng cân nặng (gam), không hiện cho bé.
 */
function makeStock(rng, info, n, g, extraRange) {
  const set = rng.pick(sizeSets(info, n, g));
  const way = rng.pick(set.ways);
  const parts = way.flatMap((c, i) => Array(c).fill(set.sizes[i]));
  const extra = Array.from({ length: rng.int(...extraRange) }, () => rng.pick(set.sizes));
  const all = [...parts, ...extra];
  for (let i = all.length - 1; i > 0; i--) { const j = rng.int(0, i); [all[i], all[j]] = [all[j], all[i]]; }
  return all;
}

/** Chọn quả cân (lớn trước) để cân đúng `g` — bộ quả cân trên luôn chọn được. */
function solveWeights(set, g) {
  const out = [];
  let left = g;
  set.forEach((w, i) => { if (w <= left) { out.push(i); left -= w; } });
  return left === 0 ? out : null;
}

export const FRUIT_GAME = {
  ...stallMeta('fruit'),
  unitWord: 'khách',
  levels: FRUIT_LEVELS,
  stallIcon: () => fruitIcon('cam', 56),
  summaryText: (ok, total) => `Em đã phục vụ <strong>${ok}/${total}</strong> khách hài lòng.`,

  /** Mở từ biểu tượng của một bài bảng nhân (catalog.js tablesForUnit): chỉ phép nhân trong các bảng đó. */
  focus(level, { tables } = {}) {
    if (!tables) return level;
    return {
      ...level, tables,
      knowledge: level.knowledge.replace(/bảng nhân.*(?= và số tròn chục)/, tablesText(tables)),
      ask: (n) => `Cân đúng số ki-lô-gam rồi tính tiền giúp ${n.me}!`,
    };
  },

  makeMission(rng, level, history) {
    const prev = history[history.length - 1];
    const recentNpcs = history.slice(-3).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    const table = level.unit === 'g' ? G_FRUITS : KG_FRUITS;
    const unitG = level.unit === 'g' ? 100 : 1000;
    // Số kg (100 g) khách mua chọn trước, trải đều cả khoảng của cấp (để bảng nhân nào cũng gặp);
    // rồi chọn loại quả có giá hợp lệ ở cấp này và nhặt được vừa tay (vd. 8 kg thì là bưởi, dưa hấu —
    // không ai nhặt 40 quả cam).
    // Mở từ bài một bảng (focus): một thừa số là số của bảng — số kg, hoặc số chục của giá (30 → 3).
    const T = level.tables;
    const prices = (id, a) => level.price(table[id]).filter(p => !T || T.includes(a) || T.includes(p / 10));
    const fits = (id, a) => prices(id, a).length && a >= (table[id].min || 1) && sizeSets(table[id], level.sizes, a * unitG).length;
    const amounts = range(level.mass[0], level.mass[1]).filter(a => Object.keys(table).some(id => fits(id, a)));
    let amount;
    do { amount = rng.pick(amounts); } while (prev && amount === prev.amount && amounts.length > 1);
    const pool = Object.keys(table).filter(id => fits(id, amount));
    const fresh = pool.filter(id => id !== prev?.fruit).length ? pool.filter(id => id !== prev?.fruit) : pool;
    const fruit = rng.pick(fresh);
    const info = table[fruit];
    const price = rng.pick(prices(fruit, amount));
    const grams = amount * unitG;
    const total = price * amount;
    const paid = level.steps.includes('change') ? NOTES.find(n => n > total) : 0;
    const stock = makeStock(rng, info, level.sizes, grams, level.extra);
    return { npc, fruit, amount, grams, price, total, paid, stock };
  },

  /** Cách chơi của cấp — dãy hình ở màn giới thiệu, thay cho đoạn chữ dài. */
  howTo(level) {
    const pics = {
      pick: { pic: weightIcon(level.unit === 'g' ? 200 : 2000), label: 'Chọn quả cân' },
      fill: { pic: fruitIcon(level.unit === 'g' ? 'nho' : 'thanhlong', 44), label: 'Nhặt quả cho cân bằng' },
      total: { pic: '🧾', label: 'Tính tiền' },
      change: { pic: '💵', label: 'Trả tiền thừa' },
    };
    const steps = level.steps.flatMap(s => (s === 'pick' ? ['pick', 'fill'] : [s]));
    return [...steps.map(s => pics[s]), { pic: '😊', label: 'Khách vui' }];
  },

  mountMission(stage, m, level, api) {
    const f = FRUITS[m.fruit];
    const inG = level.unit === 'g';
    const info = (inG ? G_FRUITS : KG_FRUITS)[m.fruit];
    const set = inG ? G_SET : KG_SET;
    const massText = inG ? `${fmt(m.grams)} g` : `${m.amount} kg`;
    const unitAmount = inG ? '100 g' : '1 kg';
    const n = m.npc;

    // Bố cục tập trung (khung chung stall.js): khách | quầy — cân ở giữa; dưới cân là sạp quả
    // (dưới đĩa trái) và khay quả cân (dưới đĩa phải). Bước tính tiền mở thêm cột máy tính tiền cạnh cân.
    const { counter, speak, row, ask, fail: failWith, thanks } = mountStall(stage, {
      npc: n, api,
      sign: `${fruitIcon(m.fruit, 34)}<span><strong>${cap(f.name)}</strong><br>${unitAmount} giá <b>${m.price} nghìn đồng</b></span>`,
      counter: `
        <div class="g3f-scale-host"></div>
        <div class="g3f-dock">
          <div class="g3f-tray g3f-stock" aria-label="Sạp ${f.name}"></div>
          <div class="g3f-weights">
            <span class="g3f-hand" aria-hidden="true">👉</span>
            <div class="g3f-tray g3f-wtray" aria-label="Khay quả cân"></div>
          </div>
        </div>
        `,
    });
    const dock = stage.querySelector('.g3f-dock');
    const tray = stage.querySelector('.g3f-wtray');
    const stockTray = stage.querySelector('.g3f-stock');
    // "Cân xong" có sẵn từ đầu, đặt trên trụ cân sát đế: bé tự nhìn đòn cân / kim để quyết định
    // lúc nào đã thăng bằng rồi tự xác nhận — app không báo trước (không tô xanh, không hiện nút).
    const doneBtn = Object.assign(document.createElement('button'), { type: 'button', className: 'g3g-btn g3g-btn-primary g3f-done', disabled: true });
    doneBtn.innerHTML = '<b>✓ Cân xong</b><small>Cân xong hãy xác nhận</small>';
    const scaleHost = stage.querySelector('.g3f-scale-host');

    // ── Cân (như người bán thật): khách nói trước mua bao nhiêu → đặt quả cân đúng bằng số đó
    //    lên đĩa phải (bé tách số: 7 kg = 5 kg + 2 kg) → nhặt từng quả trên sạp đặt lên đĩa trái,
    //    nhìn cân nâng dần lên, đổi quả to/nhỏ cho tới khi thăng bằng → "Cân xong". ──
    const onPan = new Set();     // quả cân trên đĩa phải (chỉ số trong set)
    const onLeft = new Set();    // quả trên đĩa trái (chỉ số trong m.stock)
    let weighLocked = false;
    const ref = info.sizes.reduce((a, b) => a + b, 0) / info.sizes.length; // quả cỡ trung bình
    const fmtMass = (g) => (inG ? `${fmt(g)} g` : `${g / 1000} kg`);
    const scale = mountScale(scaleHost, {
      onRightTap: (id) => { if (!weighLocked && !flying.has(`w${id}`)) moveWeight(Number(id), false); },
      onLeftTap: (id) => { if (!weighLocked && !flying.has(`p${id}`)) movePiece(Number(id), false); },
    });
    scale.center.appendChild(doneBtn);
    const panSum = () => [...onPan].reduce((s, i) => s + set[i], 0);
    const leftSum = () => [...onLeft].reduce((s, i) => s + m.stock[i], 0);
    const partsOf = (idx) => idx.map(i => set[i]).sort((x, y) => y - x).map(fmtMass).join(' + ');
    // Cân thật: lệch ít nghiêng ít, lệch từ khoảng nửa số khách mua trở lên thì chạm chốt;
    // lệch một chút vẫn thấy rõ (cân ở chợ nhạy) để bé không tưởng là đã bằng.
    const span = Math.max(m.grams * 0.5, Math.max(...info.sizes));
    const tiltOf = (d) => (d === 0 ? 0 : Math.sign(d) * Math.min(1, 0.3 + 0.7 * Math.abs(d) / span));
    // ── Bay lên / xuống cân: quả (sạp ↔ đĩa trái) và quả cân (khay ↔ đĩa phải) bay theo đường cong.
    //    Đồ đang bay tới đâu thì chỗ đó ẩn cho tới lúc đáp; cân chỉ nghiêng khi đồ đã chạm đĩa. ──
    const flying = new Map(); // "p3" / "w1" → true nếu đang bay LÊN đĩa, false nếu đang bay về sạp / khay
    const landingOnPan = () => [...flying.values()].some(Boolean);
    const applyTilt = () => scale.setTilt(tiltOf(panSum() - leftSum()), false);
    // Khung màn hình của một quả / quả cân trên đĩa, cùng khung với hình ở sạp / khay (để bay khớp cỡ).
    const pieceOnPan = (i) => {
      const g = scaleHost.querySelector(`[data-pid="${i}"]`);
      if (!g) return null;
      const r = Number(g.dataset.r), w = r * 2.6, h = r * 2.9; // khung của pieceIcon
      return svgBoxOnScreen(g, Number(g.dataset.cx) - w / 2, Number(g.dataset.cy) - h * 0.56, w, h);
    };
    const weightOnPan = (i) => {
      const g = scaleHost.querySelector(`[data-wid="${i}"]`);
      if (!g) return null;
      const { w, h } = weightSize(set[i]);
      return svgBoxOnScreen(g, -w / 2 - 4, -h - 4, w + 8, h + 8); // khung của weightIcon
    };
    const elOf = (key) => (key[0] === 'p'
      ? (flying.get(key) ? scaleHost.querySelector(`[data-pid="${key.slice(1)}"]`) : stockTray.querySelector(`[data-p="${key.slice(1)}"]`))
      : (flying.get(key) ? scaleHost.querySelector(`[data-wid="${key.slice(1)}"]`) : tray.querySelector(`[data-i="${key.slice(1)}"]`)));
    /** Bay một đồ vật: key "p…" quả / "w…" quả cân, up = lên đĩa. from/to: khung màn hình; html: hình bay. */
    function flyItem(key, up, html, from, getTo) {
      flying.set(key, up);
      redraw();
      const to = getTo();
      flyOne(html, from, to, {
        minMs: 500, maxMs: 850, spin: up ? 10 : -10,
        onLand: () => {
          flying.delete(key);
          const el = elOf(key);
          if (el) el.style.opacity = '';
          sfx.tap();
          if (up && !landingOnPan()) applyTilt();
          redraw();
        },
      });
    }
    function movePiece(i, up) {
      const { svg } = pieceIcon(m.fruit, m.stock[i], ref);
      const from = up ? stockTray.querySelector(`[data-p="${i}"] svg`)?.getBoundingClientRect() : pieceOnPan(i);
      if (up) onLeft.add(i); else onLeft.delete(i);
      flyItem(`p${i}`, up, svg, from, () => (up ? pieceOnPan(i) : stockTray.querySelector(`[data-p="${i}"] svg`)?.getBoundingClientRect()));
    }
    function moveWeight(i, up) {
      const from = up ? tray.querySelector(`[data-i="${i}"] svg`)?.getBoundingClientRect() : weightOnPan(i);
      if (up) onPan.add(i); else onPan.delete(i);
      flyItem(`w${i}`, up, weightIcon(set[i]), from, () => (up ? weightOnPan(i) : tray.querySelector(`[data-i="${i}"] svg`)?.getBoundingClientRect()));
    }

    function redraw() {
      scale.setLeft(panHeapSvg(m.fruit, [...onLeft].map(i => ({ id: i, g: m.stock[i] })), ref));
      scale.setRight([...onPan].map(i => ({ id: i, g: set[i] })));
      // Đồ đang bay lên đĩa thì chưa tính — cân nghiêng khi nó chạm đĩa (applyTilt lúc đáp).
      if (!landingOnPan()) applyTilt();
      tray.innerHTML = set.map((g, i) => onPan.has(i) ? `<span class="g3f-tray-slot"></span>` :
        `<button type="button" class="g3f-weight" data-i="${i}" aria-label="Quả cân ${weightLabel(g)}">${weightIcon(g)}</button>`).join('');
      stockTray.innerHTML = m.stock.map((g, i) => {
        const { svg, r } = pieceIcon(m.fruit, g, ref);
        const k = (r / (13 * Math.sqrt(f.size))).toFixed(2); // quả loại to (dưa hấu) vẽ to hơn quả cam
        return onLeft.has(i) ? `<span class="g3f-piece-slot" style="--k:${k}"></span>`
          : `<button type="button" class="g3f-piece" data-p="${i}" style="--k:${k}" aria-label="Một quả ${f.name}">${svg}</button>`;
      }).join('');
      // Gợi ý bằng chuyển động thay cho chữ: chưa có quả cân → bàn tay chỉ vào khay; có rồi → quả trên sạp nhún nhảy.
      dock.classList.toggle('g3f-dock-pick', !weighLocked && onPan.size === 0);
      dock.classList.toggle('g3f-dock-fill', !weighLocked && onPan.size > 0 && onLeft.size === 0);
      doneBtn.disabled = weighLocked || onPan.size === 0 || onLeft.size === 0 || flying.size > 0;
      // Chỗ đồ đang bay tới: ẩn cho tới lúc đáp (vẽ lại giữa chừng cũng vẫn ẩn).
      for (const key of flying.keys()) { const el = elOf(key); if (el) el.style.opacity = '0'; }
    }
    tray.addEventListener('click', (e) => {
      const b = e.target.closest('[data-i]');
      if (!b || weighLocked || flying.has(`w${b.dataset.i}`)) return;
      moveWeight(Number(b.dataset.i), true);
    });
    stockTray.addEventListener('click', (e) => {
      const b = e.target.closest('[data-p]');
      if (!b || weighLocked || flying.has(`p${b.dataset.p}`)) return;
      movePiece(Number(b.dataset.p), true);
    });

    const steps = [...level.steps];
    const run = () => {
      const s = steps.shift();
      if (!s) return thanks();
      STEP[s]();
    };
    /** Hỏi số tiền trên máy tính tiền: đúng thì sang bước sau, sai thì nhiệm vụ thất bại. */
    const askNumber = (bill, answer, onWrong) => ask(bill, 'nghìn đồng', (v, pad) => {
      if (v === answer) { pad.lock('g3g-keypad-ok'); run(); } else { pad.lock('g3g-keypad-bad'); onWrong(v); }
    });

    const STEP = {
      pick() {
        const spoken = inG ? `${m.grams} gam` : `${m.amount} ki-lô-gam`;
        speak(`${cap(n.you)} bán cho ${n.me} ${spoken} ${f.name}!`, null, `Bán cho ${n.me} <b class="g3f-want">${massText}</b> ${f.name}!`);
        redraw();
        // Bé tự xác nhận: cân chưa thăng bằng thì khách phàn nàn (như ngoài chợ), thăng bằng thì
        // quả trên đĩa nặng đúng bằng các quả cân — còn phải đúng số khách mua.
        doneBtn.onclick = () => {
          weighLocked = true;
          tray.classList.add('g3f-tray-locked');
          stockTray.classList.add('g3f-tray-locked');
          redraw();
          const sum = panSum();
          const d = sum - leftSum();
          if (d !== 0) {
            const few = d > 0; // bên quả cân nặng hơn → quả chưa đủ
            speak(few ? `Cân còn nghiêng mà ${n.you}, chưa đủ đâu!` : `Cân lệch sang bên ${f.name} rồi, nhiều quá!`, 'sad',
              few ? 'Cân còn nghiêng, chưa đủ!' : 'Cân lệch, nhiều quá!');
            api.fail(`Cân còn nghiêng về bên <b>${few ? 'quả cân' : f.name}</b>: ${f.name} ${few ? 'nhẹ hơn' : 'nặng hơn'} ${fmtMass(sum)}.`,
              'Đòn cân nằm ngang, kim chỉ đúng giữa mới là cân xong. Bên nào thấp hơn thì bên đó nặng hơn.');
            return;
          }
          if (sum === m.grams) {
            scale.setTilt(0, true); // xác nhận đúng mới tô xanh đòn cân
            scaleHost.classList.add('g3f-scale-ok');
            return run();
          }
          // Quả cân sai → cân đủ nhưng sai số khách mua: khách phản ứng đúng như ngoài chợ.
          const right = solveWeights(set, m.grams);
          speak(sum > m.grams ? `${cap(n.me)} chỉ mua ${spoken} thôi mà!` : `${cap(n.me)} mua ${spoken} cơ mà, sao ít vậy?`, 'sad',
            sum > m.grams ? `Nhiều quá! ${cap(n.me)} mua <b>${massText}</b> thôi.` : `Ít quá! ${cap(n.me)} mua <b>${massText}</b> cơ.`);
          api.fail(`Đĩa cân có <b>${fmtMass(sum)}</b> ${f.name}, còn ${n.name} mua <b>${massText}</b>.`,
            right.length === 1 ? `Chỉ cần quả cân <b>${massText}</b>.` : `Chọn: <b>${partsOf(right)} = ${massText}</b>`);
        };
      },
      total() {
        speak(`Rổ ${f.name} này bao nhiêu tiền hả ${n.you}?`, null, `Bao nhiêu tiền hả ${n.you}?`);
        const tens = !inG && m.price % 10 === 0 ? ` (${m.price / 10} chục × ${m.amount} = ${m.total / 10} chục)` : '';
        const how = inG
          ? `${fmt(m.grams)} g = ${m.amount} lần 100 g: ${m.price} × ${m.amount} = ${m.total}`
          : `${m.price} × ${m.amount} = ${m.total}${tens}`;
        const pic = fruitIcon(m.fruit, 30);
        askNumber(
          row(pic, unitAmount, `<b>${m.price} nghìn đồng</b>`) + row(pic, massText, Q, true),
          m.total,
          () => failWith(`${massText} ${f.name} giá <b>${m.total} nghìn đồng</b>.`, how));
      },
      change() {
        speak(`${cap(n.me)} gửi ${n.you} ${m.paid} nghìn đồng.`, null, `Gửi ${n.you} <span class="g3f-note">${m.paid} nghìn đồng</span>`);
        askNumber(
          row('🧾', 'Tiền hàng', `<b>${m.total} nghìn đồng</b>`)
            + row('💵', 'Khách đưa', `<span class="g3f-note">${m.paid} nghìn đồng</span>`)
            + row('🪙', 'Trả lại', Q, true),
          m.paid - m.total,
          () => failWith(`Trả lại <b>${m.paid} − ${m.total} = ${m.paid - m.total} nghìn đồng</b>.`, 'Tiền khách đưa − tiền hàng = tiền thừa.'));
      },
    };

    run();
  },
};
