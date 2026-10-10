/**
 * 🚚 Trạm cân nông sản (Toán 4, Bài 17, 20, 21, 22, 23). Thiết kế: docs/lop_4/thiet-ke-tro-choi.md §4.3.
 * Mùa thu hoạch, bé trực trạm cân của chợ đầu mối. Cảnh vẽ (art/weigh.js) ở trên, bảng việc ở dưới, NPC bên phải.
 *   Cấp 1 (Bài 17): đọc kim cân bàn rồi đổi đơn vị — yen (kg → yến), mixed (kg → tạ, yến), toKg (tạ, yến → kg,
 *                   mặt cân che "?", sau Xong mới mở để kiểm chứng)
 *   Cấp 2 (Bài 17): load — đơn hàng "2 tấn 5 tạ gạo", bé chất bao lớn 1 tấn và bao 50 kg lên xe, đồng hồ trạm cân nhảy số
 *   Cấp 3 (Bài 17, 20): bridge — biển cầu 5T / 10T / 13T, ba xe (xe + hàng ghi bằng tấn, tạ, kg): chọn các xe được qua
 *   Cấp 4 (Bài 21, 22, 23): ledger — sổ trạm cân: hàng = cả xe − xe không (net), cả xe = xe không + hàng (gross)
 * Nút "Xong" có từ đầu, đúng sai chỉ lộ sau Xong (kim quay, xe chạy qua cầu hoặc lùi lại, đồng hồ trạm cân).
 */

import { css, sfx } from '../grade4Tools/frame.js';
import { calmMotion, flyOne } from '../grade3Games/fly.js';
import { DETECTIVE_NPCS, npcPic } from '../grade3Games/npc.js';
import imgThao from '../../assets/grade4-games/weigh/tram-can.webp';
import { TRUCK_COLORS } from '../grade3Games/art/trucks.js';
import { stallMeta, levelMeta } from './catalog.js';
import {
  VW, VH, GY, fmt, skySvg, yardSvg, sackSvg, basketSvg, pigSvg, cowSvg, jumboSvg, smallSackSvg, platformScaleSvg, dialAngle,
  truckSvg, cargoSlotsSvg, cargoForKg, weighbridgeSvg, pileSvg, bridgeSceneSvg, BRIDGE, weighIcon,
} from './art/weigh.js';

// Chị Thảo trực trạm cân (src/assets/can_nong_san.png, làm nét bằng scripts/upscale-npc.py, giữ nguyên khổ, không cắt): nhân vật chính. Chưa có mặt buồn: mọi nét mặt dùng một hình;
// khai báo moods để npcPic bỏ khung dáng đứng 21:40 (hình này rộng hơn vì có bao lúa và cân bàn hai bên).
const THAO = { id: 'tramcan', name: 'Chị Thảo trạm cân', me: 'chị', you: 'em', img: imgThao, sad: imgThao, moods: { wait: imgThao, happy: imgThao, sad: imgThao } };
// Người giao việc ở màn giới thiệu cấp 1, 2, 3, 4 (vòng chơi lấy npcs[n − 1]) và cũng là người đứng cạnh bé trong cấp đó.
// Cấp 3 (qua cầu) là chú công an: chú chặn xe quá tải trước cầu.
const NPCS = [THAO, THAO, DETECTIVE_NPCS[0], THAO];

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const slow = (ms) => (calmMotion() ? Math.round(ms * 1.15) : ms);

/** Khối lượng viết theo một dạng: 'tan' (2 tấn 8 tạ), 'ta' (28 tạ), 'yen' (280 yến), 'kg' (2 800 kg). */
export function massText(kg, form = 'tan') {
  if (form === 'ta') return `${kg / 100} tạ`;
  if (form === 'yen') return `${kg / 10} yến`;
  if (form === 'kg') return `${fmt(kg)} kg`;
  const parts = [[Math.floor(kg / 1000), 'tấn'], [Math.floor(kg % 1000 / 100), 'tạ'], [Math.floor(kg % 100 / 10), 'yến'], [kg % 10, 'kg']];
  return parts.filter(([v]) => v).map(([v, u]) => `${v} ${u}`).join(' ') || '0 kg';
}

// ── Cấp 1: đồ vật trên cân bàn ───────────────────────────────────────────────────────────────────────
// Khối lượng sát thực tế: bao lúa, gạo 50 kg; bao cà phê nhân 60 kg; heo xuất chuồng 1 tạ – 2 tạ; bò 3 tạ – 5 tạ.
const SMALL = [
  { id: 'lua', name: 'Bao lúa', art: 'sack', label: 'LÚA', color: '#CA8A04', kgs: [50] },
  { id: 'gao', name: 'Bao gạo', art: 'sack', label: 'GẠO', color: '#16A34A', kgs: [50] },
  { id: 'ngo', name: 'Bao ngô', art: 'sack', label: 'NGÔ', color: '#EAB308', kgs: [40, 50] },
  { id: 'caphe', name: 'Bao cà phê', art: 'sack', label: 'CÀ PHÊ', color: '#7C2D12', kgs: [60] },
  { id: 'khoai', name: 'Bao khoai lang', art: 'sack', label: 'KHOAI', color: '#9333EA', kgs: [30, 40] },
  { id: 'cam', name: 'Sọt cam', art: 'basket', kgs: [30, 40] },
  { id: 'heon', name: 'Con heo con', art: 'pig', s: 0.75, kgs: [70, 80, 90] },
];
const PIG = { id: 'heo', name: 'Con heo', art: 'pig', s: 1.25 };
const COW = { id: 'bo', name: 'Con bò', art: 'cow', s: 1 };

function itemArt(it) {
  if (it.art === 'sack') return sackSvg(it.label, it.color, 190, 215);
  if (it.art === 'basket') return basketSvg();
  if (it.art === 'pig') return `<g transform="translate(-20 0)">${pigSvg(it.s)}</g>`;
  return `<g transform="translate(-14 0)">${cowSvg(it.s)}</g>`;
}
const ITEM_H = { sack: 221, basket: 175, pig: 166, cow: 218 };

function genScale(rng, history) {
  const i = history.length;
  const kind = ['yen', 'mixed', 'toKg'][i % 3];
  const used = new Set(history.map(h => h.itemId).filter(Boolean));
  const fresh = (list) => { const left = list.filter(x => !used.has(x.id)); return rng.pick(left.length ? left : list); };
  if (kind === 'yen') {
    const it = fresh(SMALL), kg = rng.pick(it.kgs);
    return { kind, item: it, itemId: it.id, kg, max: 100, ans: [kg / 10], units: ['yến'] };
  }
  const big = Math.floor(i / 3) % 2 ? COW : PIG;
  const kg = big === PIG ? rng.pick([110, 120, 130, 140, 160, 170, 180, 190]) : rng.int(3, 4) * 100 + rng.int(1, 9) * 10;
  if (kind === 'mixed') return { kind, item: big, itemId: big.id, kg, max: big === PIG ? 200 : 500, ans: [Math.floor(kg / 100), kg % 100 / 10], units: ['tạ', 'yến'] };
  // toKg: đồ vật đeo thẻ khối lượng (yến, tạ), bé đổi ra kg; mặt cân che, Xong mới mở.
  const pick = rng.pick(['small', 'big', 'big']);
  if (pick === 'small') {
    const it = fresh(SMALL), k = rng.pick(it.kgs);
    return { kind, item: it, itemId: it.id, kg: k, max: 100, given: massText(k, 'yen'), ans: [k], units: ['kg'] };
  }
  const k2 = big === COW && rng() < 0.4 ? rng.int(3, 4) * 100 : kg;
  return { kind, item: big, itemId: big.id, kg: k2, max: big === PIG ? 200 : 500, given: massText(k2, 'tan'), ans: [k2], units: ['kg'] };
}

// ── Cấp 2: đơn hàng chất lên xe ─────────────────────────────────────────────────────────────────────
const CROPS = [
  { name: 'gạo', color: '#16A34A' }, { name: 'lúa', color: '#CA8A04' }, { name: 'ngô', color: '#EAB308' },
  { name: 'đậu xanh', color: '#15803D' }, { name: 'sắn lát', color: '#9333EA' },
];
function genLoad(rng, history) {
  const i = history.length;
  const crop = CROPS[(i + rng.int(0, 4)) % CROPS.length];
  const form = ['tanta', 'tantayen', 'ta', 'yen'][i % 4];
  const a = rng.int(1, 4);
  const b = form === 'tantayen' ? rng.int(0, 4) : rng.int(1, 4);
  const half = form === 'tantayen' || (form === 'yen' && rng() < 0.5);
  const kg = a * 1000 + b * 100 + (half ? 50 : 0);
  const text = form === 'ta' ? massText(kg, 'ta') : form === 'yen' ? massText(kg, 'yen') : massText(kg, 'tan');
  return { kind: 'load', crop, kg, text, color: rng.pick(TRUCK_COLORS) };
}

// ── Cấp 3: ba xe trước cầu ──────────────────────────────────────────────────────────────────────────
const TARES = { 5: [1000, 1500, 2000, 2500], 10: [3000, 3500, 4000, 5000], 13: [4000, 5000, 6000, 7000] };
function genBridge(rng, history) {
  const T = [5, 10, 13][history.length % 3], lim = T * 1000;
  const cats = rng.shuffle(['over', rng.pick(['edge', 'edge', 'near']), rng.pick(['under', 'over2'])]);
  const tares = rng.shuffle(TARES[T]);
  const trucks = cats.map((c, i) => {
    const tare = tares[i];
    const total = c === 'over' ? lim + rng.int(1, 4) * 100 : c === 'edge' ? lim : c === 'near' ? lim - rng.int(1, 3) * 100
      : c === 'under' ? lim - rng.int(6, 15) * 100 : lim + rng.int(6, 15) * 100;
    const tareForm = tare % 1000 ? rng.pick(['tan', 'ta']) : 'tan';
    const cargoForm = rng.pick(['ta', 'kg', 'tan'].filter(f => f !== tareForm));
    return { n: i + 1, tare, cargo: total - tare, total, ok: total <= lim, tareText: massText(tare, tareForm), cargoText: massText(total - tare, cargoForm), color: TRUCK_COLORS[(i * 2 + history.length) % TRUCK_COLORS.length] };
  });
  return { kind: 'bridge', T, lim, trucks };
}

// ── Cấp 4: sổ trạm cân ──────────────────────────────────────────────────────────────────────────────
/** Cộng a + b có ít nhất một lần nhớ (cũng là trừ (a + b) − a có ít nhất một lần mượn). */
function carries(a, b) {
  let c = 0, n = 0;
  for (; a || b; a = Math.floor(a / 10), b = Math.floor(b / 10)) { c = (a % 10 + b % 10 + c) >= 10 ? 1 : 0; n += c; }
  return n;
}
function genLedger(rng, history) {
  const kind = history.length % 2 ? 'gross' : 'net';
  let tare, cargo;
  do { tare = rng.int(200, 900) * 10; cargo = rng.int(150, 900) * 10; } while (carries(tare, cargo) < 1 || tare % 100 === 0 || cargo % 100 === 0);
  return { kind, tare, cargo, gross: tare + cargo, color: rng.pick(TRUCK_COLORS), crop: rng.pick(CROPS) };
}

export const WEIGH_LEVELS = [
  {
    ...levelMeta('weigh-1'), missions: 6, gen: genScale,
    knowledge: 'yến, tạ, tấn và đổi đơn vị đo khối lượng',
    ask: (n) => `Đọc kim cân rồi ghi vào phiếu bằng yến, tạ giúp ${n.me}!`,
    desc: '1 yến = 10 kg, 1 tạ = 10 yến = 100 kg, 1 tấn = 10 tạ = 1 000 kg.',
    how: [['⚖️', 'Đọc kim cân'], ['🔁', 'Đổi đơn vị'], ['🔢', 'Ghi phiếu']],
  },
  {
    ...levelMeta('weigh-2'), missions: 6, gen: genLoad,
    knowledge: 'đổi tấn, tạ, yến ra ki-lô-gam',
    ask: (n) => `Chất hàng lên xe cho đúng đơn giúp ${n.me}!`,
    desc: 'Đổi đơn hàng ra ki-lô-gam rồi chất bao lớn 1 tấn và bao nhỏ 50 kg cho đủ.',
    how: [['📋', 'Đọc đơn'], ['🔁', 'Đổi ra kg'], ['📦', 'Chất bao']],
  },
  {
    ...levelMeta('weigh-3'), missions: 6, gen: genBridge,
    knowledge: 'so sánh, cộng các số đo khối lượng',
    ask: (n) => `Cầu yếu, xe nào được qua? Kiểm tra giúp ${n.me}!`,
    desc: 'Đổi khối lượng xe và hàng về cùng một đơn vị, cộng lại rồi so với biển cầu.',
    how: [['🚚', 'Xe + hàng'], ['🔁', 'Cùng đơn vị'], ['🌉', 'So biển cầu']],
  },
  {
    ...levelMeta('weigh-4'), missions: 6, gen: genLedger,
    knowledge: 'cộng, trừ các số có nhiều chữ số',
    ask: (n) => `Ghi sổ trạm cân giúp ${n.me}: hàng nặng bao nhiêu ki-lô-gam?`,
    desc: 'Hàng = cả xe và hàng − xe không. Cả xe và hàng = xe không + hàng.',
    how: [['🚚', 'Cân cả xe'], ['📦', 'Dỡ hàng'], ['➖', 'Tính hàng']],
  },
];

let styled = false;

export const WEIGH_GAME = {
  ...stallMeta('weigh'),
  starPrefix: 'g4games',
  unitWord: 'lượt cân',
  npcs: NPCS,
  levels: WEIGH_LEVELS,
  againText: 'Chơi lại (xe hàng mới)',
  stallIcon: () => weighIcon(56),
  summaryText: (ok, total) => `Em đã làm đúng <strong>${ok}/${total}</strong> lượt cân.`,
  howTo: (level) => [...level.how.map(([pic, label]) => ({ pic, label })), { pic: '✔', label: 'Xong' }],

  makeMission(rng, level, history) {
    return { idx: history.length, ...level.gen(rng, history) };
  },

  mountMission(stage, m, level, api) {
    injectWeighStyles();
    const npc = NPCS[level.n - 1];
    if (import.meta.env.DEV) window.__g4weigh = m;
    stage.innerHTML = `
      <div class="g4w-scene g4w-k-${m.kind} animate-fadeIn">
        <div class="g4w-viewb"><svg class="g4w-view" viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="xMidYMid meet" aria-hidden="true"></svg></div>
        <div class="g4w-work"><div class="g4w-info"></div><div class="g4w-ctrl"></div></div>
        <div class="g4w-side" data-result-host>
          <div class="g4w-npc">
            <div class="g4w-bubble"><b class="g4w-name">${npc.name}</b><span class="g4w-say">&nbsp;</span></div>
            <div class="g4w-npc-pic">${npcPic(npc, 'wait')}</div>
          </div>
          <div class="g4w-acts">
            ${m.kind === 'load' ? '<button type="button" class="g4w-small" data-act="undo">↶ Dỡ bớt</button>' : ''}
            <button type="button" class="g4w-done g4w-wait" data-act="done">✔ Xong</button>
          </div>
        </div>
      </div>`;
    const scene = stage.querySelector('.g4w-scene');
    const view = stage.querySelector('.g4w-view');
    const info = stage.querySelector('.g4w-info');
    const ctrl = stage.querySelector('.g4w-ctrl');
    const sayBox = stage.querySelector('.g4w-say');
    const picBox = stage.querySelector('.g4w-npc-pic');
    const doneBtn = stage.querySelector('[data-act="done"]');
    const speak = (text, mood, shown) => { sayBox.innerHTML = shown || text; if (mood) picBox.innerHTML = npcPic(npc, mood); api.say(text); };
    const blink = (els) => [...els].forEach(el => { el.classList.remove('g4w-blink'); void el.getBoundingClientRect(); el.classList.add('g4w-blink'); });
    const alive = () => scene.isConnected;

    let ready = false, locked = false;
    const setReady = (on) => { ready = on; doneBtn.classList.toggle('g4w-wait', !on); };
    let notReady = () => {};
    let finish = async () => {};
    doneBtn.onclick = () => {
      if (locked) return;
      sfx.tap();
      if (!ready) { notReady(); return; }
      locked = true;
      stage.querySelectorAll('.g4w-acts button, .g4w-work button').forEach(b => { b.disabled = true; });
      finish();
    };
    const conclude = (ok, text, tip, line) => {
      m.ok = ok;
      speak(line, ok ? 'happy' : 'sad');
      if (ok) api.succeed(text); else api.fail(text, tip);
    };
    const steps = [];
    if (import.meta.env.DEV) window.__g3drill = { step: () => steps.shift()?.() };

    /** Phím số + các ô trống (data-b) trong `host`; chạm ô để chọn ô đang gõ. */
    const blanksPad = (host, n, maxLen = 5) => {
      const vals = Array(n).fill('');
      let at = 0, padLocked = false;
      const cells = [...host.querySelectorAll('[data-b]')];
      const sync = () => {
        cells.forEach((c, i) => {
          c.textContent = vals[i] ? fmt(vals[i]) : '?';
          c.classList.toggle('g4w-blank-on', i === at && !locked);
          c.classList.toggle('g4w-blank-empty', !vals[i]);
        });
        setReady(!padLocked && vals.every(Boolean));
      };
      cells.forEach((c, i) => { c.onclick = () => { if (locked || padLocked) return; sfx.tap(); at = i; sync(); }; });
      ctrl.innerHTML = `<div class="g4w-pad">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 'del'].map(k => `<button type="button" class="g4w-key${k === 'del' ? ' g4w-key-del' : ''}" data-k="${k}">${k === 'del' ? '⌫' : k}</button>`).join('')}</div>`;
      ctrl.querySelectorAll('[data-k]').forEach(b => {
        b.onclick = () => {
          if (locked || padLocked) return;
          sfx.tap();
          const k = b.dataset.k, v = vals[at];
          if (k === 'del') vals[at] = v.slice(0, -1);
          else if (v.length < maxLen && !(v === '' && k === '0')) vals[at] = v + k;
          sync();
        };
      });
      sync();
      return {
        vals, cells, sync,
        lock(on) { padLocked = on; ctrl.classList.toggle('g4w-pad-wait', on); sync(); },
        keys: () => ctrl.querySelectorAll('.g4w-key'),
        /** Gõ sẵn đáp án (bước DEV). */
        type: (i, s) => [() => cells[i].click(), ...[...String(s)].map(d => () => ctrl.querySelector(`[data-k="${d}"]`).click())],
      };
    };
    /** Đồng hồ số trạm cân chạy từ a tới b. */
    const led = () => view.querySelector('.g4w-led');
    const runLed = async (a, b, ms = 900) => {
      const el = led();
      const t0 = performance.now(), dur = slow(ms);
      let last = -1;
      await new Promise(res => {
        const tick = () => {
          if (!alive()) return res();
          const k = Math.min(1, Math.max(0, (performance.now() - t0) / dur));
          el.textContent = fmt(k >= 1 ? b : Math.round((a + (b - a) * (1 - (1 - k) ** 2)) / 10) * 10);
          const step = Math.floor(k * 8);
          if (step !== last && k < 1) { last = step; sfx.tick(); }
          if (k < 1) setTimeout(tick, 40); else res();
        };
        tick();
      });
    };
    /** Chạy hoạt ảnh rồi chờ theo giờ (không chờ animation.finished: tab ẩn hay máy bận thì có thể treo mãi). */
    const play = (el, frames, { duration, ...o }) => { el.animate(frames, { duration, fill: 'forwards', ...o }); return sleep(duration + 30); };
    const drive = (el, from, to, ms, easing = 'ease-out') => play(el, [{ transform: `translateX(${from}px)` }, { transform: `translateX(${to}px)` }], { duration: slow(ms), easing });

    // ════════ Cấp 1: cân bàn đồng hồ ════════
    if (m.kind === 'yen' || m.kind === 'mixed' || m.kind === 'toKg') {
      const it = m.item, H = ITEM_H[it.art] * (it.s || 1);
      const top = GY - 46 - H;
      const tw = Math.max(180, (m.given || '').length * 21 + 34);
      const tag = m.kind === 'toKg' ? `<g class="g4w-tag"><path d="M380 ${top + 24} L380 ${top - 6}" stroke="#3F3A40" stroke-width="3"/>
        <rect x="${380 - tw / 2}" y="${top - 70}" width="${tw}" height="64" rx="12" fill="#FEF3C7" stroke="#3F3A40" stroke-width="3"/>
        <text x="380" y="${top - 26}" text-anchor="middle" class="g4w-tagtxt">${m.given}</text></g>` : '';
      view.innerHTML = `${skySvg({ sun: [330, 72] })}${yardSvg()}${platformScaleSvg(m.max)}
        <g transform="translate(380 ${GY - 46})"><g class="g4w-item">${itemArt(it)}</g></g>${tag}`;
      const needle = view.querySelector('.g4w-needle');
      const cover = view.querySelector('.g4w-cover');
      if (m.kind !== 'toKg') cover.remove();
      const spin = async () => {
        needle.style.transition = `transform ${slow(1300)}ms cubic-bezier(.3,1.45,.5,1)`;
        needle.style.transform = `rotate(${dialAngle(m.kg, m.max)}deg)`;
        sfx.swish();
        await sleep(slow(1350));
      };
      const line = m.kind === 'toKg'
        ? `${it.name}: <b>${m.given}</b> = <span class="g4w-nb"><span class="g4w-blank" data-b="0">?</span> kg</span>`
        : m.kind === 'yen'
          ? `${it.name} nặng <span class="g4w-nb"><span class="g4w-blank" data-b="0">?</span> yến</span>`
          : `${it.name} nặng <span class="g4w-nb"><span class="g4w-blank" data-b="0">?</span> tạ</span> <span class="g4w-nb"><span class="g4w-blank" data-b="1">?</span> yến</span>`;
      info.innerHTML = `<div class="g4w-ticket"><div class="g4w-tk-head">🧾 PHIẾU CÂN</div><div class="g4w-tk-line">${line}</div><div class="g4w-tk-fix">&nbsp;</div></div>`;
      const pad = blanksPad(info, m.ans.length, m.kind === 'toKg' ? 4 : 2);
      pad.lock(true);
      (async () => {
        await play(view.querySelector('.g4w-item'), [{ transform: 'translateY(-420px)' }, { transform: 'translateY(0)', offset: 0.75 }, { transform: 'translateY(-18px)', offset: 0.88 }, { transform: 'translateY(0)' }], { duration: slow(800), easing: 'ease-in' });
        if (!alive()) return;
        sfx.pop(2);
        if (m.kind !== 'toKg') await spin();
        if (!alive()) return;
        pad.lock(false);
      })();
      if (m.kind === 'yen') speak(`${it.name} nặng bao nhiêu yến? Đọc kim cân rồi đổi ra yến!`, null, `Đọc kim cân, ghi số <b>yến</b>!`);
      else if (m.kind === 'mixed') speak(`${it.name} nặng mấy tạ mấy yến? Đọc kim cân rồi đổi!`, null, `Đọc kim cân, ghi <b>tạ</b> và <b>yến</b>!`);
      else speak(`${it.name} nặng ${m.given}. Đổi ra ki-lô-gam rồi mở cân kiểm tra!`, null, `Đổi <b>${m.given}</b> ra <b>kg</b>!`);
      notReady = () => {
        const empty = pad.vals.findIndex(v => !v);
        if (m.ans.length > 1 && empty > 0) speak('Em chạm ô trống thứ hai rồi gõ số!', null, 'Chạm ô <b>?</b> còn trống rồi gõ số!');
        else speak('Em gõ số vào phiếu cân trước!', null, 'Gõ số vào phiếu trước!');
        blink(pad.cells.filter((c, i) => !pad.vals[i]));
      };
      finish = async () => {
        pad.sync();
        if (m.kind === 'toKg') {
          await play(cover, [{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-420px)', opacity: 0 }], { duration: slow(600), easing: 'ease-in', fill: 'forwards' });
          await spin();
        }
        const ok = m.ans.every((a, i) => Number(pad.vals[i]) === a);
        pad.cells.forEach((c, i) => c.classList.add(Number(pad.vals[i]) === m.ans[i] ? 'g4w-good' : 'g4w-bad'));
        const right = m.kind === 'toKg' ? `${m.given} = ${fmt(m.kg)} kg` : `${fmt(m.kg)} kg = ${m.ans.map((a, i) => `${a} ${m.units[i]}`).join(' ')}`;
        if (!ok) info.querySelector('.g4w-tk-fix').innerHTML = `Đúng là: <b>${right}</b>`;
        await sleep(slow(400));
        const tip = m.kind === 'yen' ? '1 yến = 10 kg, nên số ki-lô-gam chia cho 10 là ra số yến.'
          : m.kind === 'mixed' ? `1 tạ = 100 kg, 1 yến = 10 kg. ${fmt(m.kg)} kg = ${m.ans[0] * 100} kg + ${m.ans[1] * 10} kg.`
            : '1 tạ = 100 kg, 1 yến = 10 kg. Đổi từng phần rồi cộng lại.';
        if (ok) conclude(true, `Đúng! ${right}.`, null, 'Ghi phiếu chuẩn lắm!');
        else conclude(false, `${m.kind === 'toKg' ? '' : `Kim chỉ ${fmt(m.kg)} kg. `}${right}.`, tip, 'Ơ, phiếu cân ghi chưa đúng rồi.');
      };
      steps.push(() => {}, ...m.ans.flatMap((a, i) => pad.type(i, a)), () => doneBtn.click());
    }

    // ════════ Cấp 2: chất hàng theo đơn ════════
    if (m.kind === 'load') {
      view.innerHTML = `${skySvg()}${yardSvg()}${weighbridgeSvg('HÀNG')}
        <g transform="translate(150 ${GY - 6})"><g class="g4w-drive">${truckSvg(m.color, cargoSlotsSvg(m.crop.color))}</g></g>`;
      const truck = view.querySelector('.g4w-drive');
      info.innerHTML = `<div class="g4w-order"><div class="g4w-tk-head">📋 ĐƠN HÀNG</div><div class="g4w-order-txt"><b>${m.text}</b> ${m.crop.name}</div>
        <div class="g4w-tk-fix">&nbsp;</div></div>`;
      const jumboPic = `<svg viewBox="-4 -100 90 104" aria-hidden="true">${jumboSvg(0, 0, 82)}</svg>`;
      const sackPic = `<svg viewBox="-3 -42 40 46" aria-hidden="true">${smallSackSvg(0, 0, 34, m.crop.color)}</svg>`;
      ctrl.innerHTML = `<div class="g4w-loaders">
        <button type="button" class="g4w-load" data-load="j"><span class="g4w-load-pic">${jumboPic}</span><span class="g4w-load-lab">Bao lớn<b>1 tấn</b></span></button>
        <button type="button" class="g4w-load" data-load="s"><span class="g4w-load-pic">${sackPic}</span><span class="g4w-load-lab">Bao ${m.crop.name}<b>50 kg</b></span></button></div>`;
      const loaded = [];
      let nJ = 0, nS = 0, shown = 0;
      const total = () => nJ * 1000 + nS * 50;
      const slot = (t, i) => view.querySelector(`[data-slot="${t}${i}"]`);
      const flyHtml = (t) => (t === 'j' ? jumboPic : sackPic);
      ctrl.querySelectorAll('[data-load]').forEach(b => {
        b.onclick = () => {
          if (locked) return;
          const t = b.dataset.load;
          if ((t === 'j' && nJ >= 4) || (t === 's' && nS >= 10)) { sfx.boing(); speak('Chỗ đó trên xe đầy rồi!', null, 'Chỗ đó trên xe <b>đầy</b> rồi!'); return; }
          sfx.tap();
          const i = t === 'j' ? nJ++ : nS++;
          loaded.push(t);
          setReady(true);
          const el = slot(t, i), from = b.querySelector('.g4w-load-pic').getBoundingClientRect();
          flyOne(flyHtml(t), from, el.getBoundingClientRect(), {
            minMs: 380, maxMs: 700,
            onLand: () => { if (!alive()) return; if (el.dataset.gone !== '1') el.style.opacity = 1; sfx.pop(loaded.length); const b0 = shown; shown = total(); runLed(b0, shown, 450); },
          });
          el.dataset.gone = '0';
        };
      });
      stage.querySelector('[data-act="undo"]').onclick = () => {
        if (locked || !loaded.length) return;
        sfx.tap();
        const t = loaded.pop();
        const i = t === 'j' ? --nJ : --nS;
        const el = slot(t, i);
        el.dataset.gone = '1';
        const r = el.getBoundingClientRect();
        el.style.opacity = 0;
        const btn = ctrl.querySelector(`[data-load="${t}"] .g4w-load-pic`);
        flyOne(flyHtml(t), r, btn.getBoundingClientRect(), { minMs: 350, maxMs: 600 });
        const before = shown; shown = total();
        runLed(before, shown, 350);
        setReady(loaded.length > 0);
      };
      speak(`Đơn hàng ${m.text} ${m.crop.name}. Chất bao lên xe cho đủ!`, null, `Chất đủ <b>${m.text}</b> ${m.crop.name}!`);
      notReady = () => { speak('Em chất bao lên xe trước!', null, 'Chạm bao để chất lên xe!'); blink(ctrl.querySelectorAll('.g4w-load')); };
      finish = async () => {
        await sleep(slow(700));
        const got = total(), ok = got === m.kg;
        led().classList.add(ok ? 'g4w-led-ok' : 'g4w-led-bad');
        if (!ok) info.querySelector('.g4w-tk-fix').innerHTML = `${m.text} = <b>${fmt(m.kg)} kg</b>`;
        await sleep(slow(500));
        if (ok) {
          sfx.swish();
          await drive(truck, 0, 2400, 1500, 'ease-in');
          conclude(true, `Đúng! ${m.text} = ${fmt(m.kg)} kg.`, null, 'Đủ hàng rồi, xe lên đường thôi!');
        } else {
          conclude(false, `Đơn hàng ${m.text} = ${fmt(m.kg)} kg, xe đang chở ${fmt(got)} kg.`,
            '1 tấn = 1 000 kg, 1 tạ = 100 kg, 1 yến = 10 kg. Đổi đơn hàng ra ki-lô-gam rồi chất cho đúng.', got < m.kg ? 'Ơ, xe còn thiếu hàng rồi.' : 'Ơ, xe chở thừa hàng rồi.');
        }
      };
      const j = Math.floor(m.kg / 1000), s = (m.kg % 1000) / 50;
      steps.push(() => {}, ...Array(j).fill(() => ctrl.querySelector('[data-load="j"]').click()), ...Array(s).fill(() => ctrl.querySelector('[data-load="s"]').click()), () => doneBtn.click());
    }

    // ════════ Cấp 3: qua cầu ════════
    if (m.kind === 'bridge') {
      const SC = 0.62, X0 = 40;
      view.innerHTML = `${skySvg({ field: false })}${yardSvg()}${bridgeSceneSvg(m.T)}
        <g transform="translate(${X0} ${GY - 2}) scale(${SC})"><g class="g4w-drive" style="transform:translateX(-2800px)"></g></g>`;
      const runner = view.querySelector('.g4w-drive');
      const bridge = view.querySelector('.g4w-bridge');
      info.innerHTML = `<div class="g4w-q">Biển cầu <b>${m.T}T</b>: cầu chịu tối đa <b>${m.T} tấn</b>. Chạm chọn các xe <b>được qua cầu</b>!</div>`;
      const mini = (t) => `<svg viewBox="-20 -210 560 220" aria-hidden="true">${truckSvg(t.color, cargoForKg(t.cargo, '#CA8A04'))}</svg>`;
      ctrl.innerHTML = `<div class="g4w-trucks">${m.trucks.map(t => `<button type="button" class="g4w-tcard" data-t="${t.n}">
          <span class="g4w-tc-no">Xe ${t.n}</span><span class="g4w-tc-pic">${mini(t)}</span>
          <span class="g4w-tc-row">Xe: <b>${t.tareText}</b></span><span class="g4w-tc-row">Hàng: <b>${t.cargoText}</b></span>
          <span class="g4w-tc-sum">&nbsp;</span><span class="g4w-tc-tick"></span></button>`).join('')}</div>`;
      const cards = [...ctrl.querySelectorAll('.g4w-tcard')];
      const picks = new Set();
      cards.forEach(c => {
        c.onclick = () => {
          if (locked) return;
          sfx.tap();
          const n = +c.dataset.t;
          if (picks.has(n)) picks.delete(n); else picks.add(n);
          c.classList.toggle('g4w-on', picks.has(n));
          c.querySelector('.g4w-tc-tick').textContent = picks.has(n) ? '✔' : '';
          setReady(picks.size > 0);
        };
      });
      speak(`Cầu chịu tối đa ${m.T} tấn. Xe nào được qua cầu? Chạm chọn!`, null, `Cầu <b>${m.T} tấn</b>. Xe nào được qua?`);
      notReady = () => { speak('Em chạm chọn xe được qua cầu trước!', null, 'Chạm chọn xe được qua!'); blink(cards); };
      finish = async () => {
        let ok = true;
        for (const t of m.trucks) {
          if (!alive()) return;
          const c = cards[t.n - 1];
          c.classList.add('g4w-now');
          runner.innerHTML = truckSvg(t.color, cargoForKg(t.cargo, '#CA8A04'));
          await drive(runner, -2800, 0, 1300);
          const cmp = t.total < m.lim ? '<' : t.total === m.lim ? '=' : '>';
          c.querySelector('.g4w-tc-sum').innerHTML = `= <b>${t.total / 100} tạ</b> ${cmp} ${m.lim / 100} tạ`;
          const mine = picks.has(t.n);
          if (mine !== t.ok) ok = false;
          c.classList.add(mine === t.ok ? 'g4w-good' : 'g4w-bad');
          if (t.ok) {
            sfx.swish();
            await drive(runner, 0, 3200, 1700, 'ease-in');
          } else {
            await drive(runner, 0, 60, 300);
            bridge.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(5px)' }, { transform: 'translateY(-3px)' }, { transform: 'translateY(4px)' }, { transform: 'translateY(0)' }], { duration: slow(600) });
            sfx.boing();
            speak(`Xe ${t.n} quá tải! Lùi lại!`, null, `Xe ${t.n} <b>quá tải</b>! Lùi lại!`);
            await sleep(slow(500));
            await drive(runner, 60, -2800, 1500, 'ease-in');
          }
          c.classList.remove('g4w-now');
        }
        const go = m.trucks.filter(t => t.ok).map(t => `xe ${t.n}`).join(', ');
        const tip = `Đổi hết ra tạ rồi cộng xe với hàng. Tổng không quá ${m.T} tấn = ${m.T * 10} tạ thì được qua cầu.`;
        if (ok) conclude(true, `Đúng! Được qua cầu: ${go}.`, null, 'Kiểm tra giỏi lắm, cầu an toàn!');
        else conclude(false, `Được qua cầu: ${go}.`, tip, 'Ơ, có xe chọn chưa đúng rồi.');
      };
      steps.push(() => {}, ...m.trucks.filter(t => t.ok).map(t => () => cards[t.n - 1].click()), () => doneBtn.click());
    }

    // ════════ Cấp 4: sổ trạm cân ════════
    if (m.kind === 'net' || m.kind === 'gross') {
      view.innerHTML = `${skySvg()}${yardSvg()}${weighbridgeSvg()}${pileSvg()}
        <g transform="translate(150 ${GY - 6})"><g class="g4w-drive" style="transform:translateX(-2200px)">
          <g class="g4w-cargo"${m.kind === 'gross' ? ' style="opacity:0"' : ''}>${cargoForKg(m.cargo, m.crop.color)}</g>${truckSvg(m.color)}</g></g>`;
      // Hàng vẽ dưới thùng xe (vách thùng vẽ đè lên): đặt nhóm hàng trước rồi mới tới xe.
      const truck = view.querySelector('.g4w-drive');
      const cargo = view.querySelector('.g4w-cargo');
      const row = (label, val, ask = false) => `<div class="g4w-row${ask ? ' g4w-row-ask' : ''}"><span>${label}</span><b class="${ask ? '' : 'g4w-val'}">${ask ? '<span class="g4w-blank" data-b="0">?</span>' : fmt(val)} kg</b></div>`;
      const rows = m.kind === 'net'
        ? row('🚚 Cả xe và hàng', m.gross) + row('🚚 Xe không', m.tare) + row(`📦 Hàng (${m.crop.name})`, 0, true)
        : row('🚚 Xe không', m.tare) + row(`📦 Hàng (${m.crop.name}) theo phiếu`, m.cargo) + row('🚚 Cả xe và hàng', 0, true);
      info.innerHTML = `<div class="g4w-ledger"><div class="g4w-tk-head">📒 SỔ TRẠM CÂN</div>${rows}<div class="g4w-calc">&nbsp;</div></div>`;
      const vals = [...info.querySelectorAll('.g4w-val')];
      if (m.kind === 'gross') vals[1].classList.add('g4w-val-on');
      const pad = blanksPad(info, 1, 6);
      pad.lock(true);
      const away = [{ transform: 'translate(0, 0) scale(1)', opacity: 1 }, { transform: 'translate(-300px, -40px) scale(.25)', opacity: 0 }];
      (async () => {
        sfx.swish();
        await drive(truck, -2200, 0, 1500);
        if (!alive()) return;
        if (m.kind === 'net') {
          await runLed(0, m.gross);
          vals[0].classList.add('g4w-val-on');
          speak('Cân cả xe và hàng xong. Giờ dỡ hàng xuống kho!', null, 'Dỡ hàng xuống kho…');
          await sleep(slow(700));
          sfx.swish();
          await play(cargo, away, { duration: slow(900), easing: 'ease-in', fill: 'forwards' });
          if (!alive()) return;
          await runLed(m.gross, m.tare);
          vals[1].classList.add('g4w-val-on');
          speak('Hàng nặng bao nhiêu ki-lô-gam? Ghi vào sổ!', null, 'Hàng nặng bao nhiêu <b>kg</b>? Ghi sổ!');
        } else {
          await runLed(0, m.tare);
          vals[0].classList.add('g4w-val-on');
          speak('Xe không đã cân. Chất hàng xong thì cả xe nặng bao nhiêu? Ghi trước vào sổ!', null, 'Cả xe và hàng nặng bao nhiêu <b>kg</b>?');
        }
        if (alive()) pad.lock(false);
      })();
      speak('Xe vào trạm cân!', null, 'Xe vào trạm cân…');
      notReady = () => { speak('Em gõ số vào sổ trước!', null, 'Gõ số vào sổ trước!'); blink(pad.cells); };
      const ans = m.kind === 'net' ? m.cargo : m.gross;
      finish = async () => {
        pad.sync();
        if (m.kind === 'gross') {
          sfx.swish();
          await play(cargo, [...away].reverse(), { duration: slow(900), easing: 'ease-out', fill: 'forwards' });
          await runLed(m.tare, m.gross);
        }
        const ok = Number(pad.vals[0]) === ans;
        pad.cells[0].classList.add(ok ? 'g4w-good' : 'g4w-bad');
        const calc = m.kind === 'net' ? `${fmt(m.gross)} − ${fmt(m.tare)} = ${fmt(m.cargo)}` : `${fmt(m.tare)} + ${fmt(m.cargo)} = ${fmt(m.gross)}`;
        info.querySelector('.g4w-calc').innerHTML = `${calc} (kg)`;
        await sleep(slow(400));
        if (ok) conclude(true, `Đúng! ${calc} (kg).`, null, 'Sổ ghi chính xác!');
        else conclude(false, `${calc} (kg).`, m.kind === 'net' ? 'Hàng = cả xe và hàng − xe không. Đặt tính rồi trừ từ hàng đơn vị, nhớ mượn khi cần.' : 'Cả xe và hàng = xe không + hàng. Đặt tính rồi cộng từ hàng đơn vị, nhớ khi tổng từ 10 trở lên.', 'Ơ, số trong sổ chưa đúng rồi.');
      };
      steps.push(() => {}, ...pad.type(0, ans), () => doneBtn.click());
    }
  },
};

function injectWeighStyles() {
  if (styled) return;
  styled = true;
  css('g4-weigh', `
    .g4w-scene { position: relative; flex: 1; min-height: 0; display: grid; grid-template-columns: minmax(0, 1fr) clamp(12rem, 22%, 23rem); grid-template-rows: minmax(0, 1.15fr) minmax(0, 1fr);
      gap: 0.55rem; padding: 0.55rem; border-radius: 1rem; overflow: hidden; background: linear-gradient(180deg, #9ED8F5 0%, #E4F6FE 55%, #9BD07A 55%, #7DBF55 100%); font-family: 'Baloo 2', Quicksand, sans-serif; }
    .g4w-viewb { grid-row: 1; grid-column: 1; position: relative; z-index: 1; min-height: 0; min-width: 0; border-radius: 1.1rem; overflow: hidden; background: #D6D3D1; box-shadow: 0 6px 0 rgba(30, 58, 95, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15); border: 4px solid #fff; }
    .g4w-view { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
    .g4w-dialnum { font-size: 27px; font-weight: 800; fill: #1E293B; }
    .g4w-nb { white-space: nowrap; }
    .g4w-dialkg { font-size: 28px; font-weight: 800; fill: #64748B; }
    .g4w-tagtxt { font-size: 38px; font-weight: 900; fill: #B45309; }
    .g4w-led { font-size: 40px; font-weight: 800; fill: #4ADE80; font-variant-numeric: tabular-nums; letter-spacing: 1px; }
    .g4w-led-ok { fill: #4ADE80; animation: g4wLed .4s ease-in-out 3; }
    .g4w-led-bad { fill: #F87171; animation: g4wLed .4s ease-in-out 3; }
    @keyframes g4wLed { 50% { opacity: 0.25; } }
    .g4w-work { grid-row: 2; grid-column: 1; position: relative; z-index: 1; min-width: 0; min-height: 0; display: flex; gap: 0.6rem; background: #fff; border-radius: 1.1rem; padding: 0.6rem; container-type: size;
      box-shadow: 0 6px 0 rgba(30, 58, 95, 0.2), 0 12px 24px rgba(0, 0, 0, 0.15); }
    .g4w-info { flex: 1 1 0; min-width: 0; min-height: 0; display: flex; flex-direction: column; justify-content: center; }
    .g4w-ctrl { flex: 1.25 1 0; min-width: 0; min-height: 0; display: flex; flex-direction: column; }
    .g4w-k-bridge .g4w-info { flex: 0.7 1 0; }
    .g4w-k-bridge .g4w-ctrl { flex: 2.3 1 0; }
    /* Phiếu cân, đơn hàng, sổ: giấy vàng nhạt, chữ to. */
    .g4w-ticket, .g4w-order, .g4w-ledger { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; justify-content: center; gap: 0.3em; background: #FFFBEB; border: 3px solid #FCD34D; border-radius: 1rem;
      padding: 0.5rem 0.9rem; color: #1E293B; font-weight: 800; font-size: clamp(1rem, min(4.6cqw, 12cqh), 3.2rem); line-height: 1.25; }
    .g4w-tk-head { font-size: 0.62em; color: #B45309; letter-spacing: 1px; }
    .g4w-tk-line b { color: #C2410C; }
    .g4w-tk-fix, .g4w-calc { font-size: 0.72em; color: #15803D; min-height: 1.3em; }
    .g4w-order-txt { font-size: 1.15em; }
    .g4w-order-txt b { color: #1D4ED8; }
    .g4w-ledger { font-size: clamp(0.95rem, min(3.6cqw, 8.6cqh), 2.4rem); gap: 0.15em; }
    .g4w-row { display: flex; justify-content: space-between; align-items: center; gap: 0.6em; border-bottom: 2px dashed #FCD34D; padding: 0.1em 0; }
    .g4w-row > span { font-size: 0.82em; color: #57534E; }
    .g4w-val { visibility: hidden; color: #1D4ED8; font-variant-numeric: tabular-nums; }
    .g4w-val-on { visibility: visible; animation: g4wPop .35s ease-out; }
    @keyframes g4wPop { from { transform: scale(1.3); } }
    .g4w-row-ask { border-bottom: 0; }
    .g4w-blank { display: inline-block; min-width: 2.2ch; padding: 0 0.3em; text-align: center; border-radius: 0.5rem; border: 3px dashed #93C5FD; background: #EFF6FF; color: #1D4ED8; cursor: pointer; font-variant-numeric: tabular-nums; }
    .g4w-ledger .g4w-blank, .g4w-k-toKg .g4w-blank { min-width: 4.4ch; }
    .g4w-blank-empty { color: #94A3B8; }
    .g4w-blank-on { border-style: solid; border-color: #F59E0B; background: #FEF3C7; box-shadow: 0 0 0 3px #FDE68A; }
    .g4w-blank.g4w-good { border: 3px solid #22C55E; background: #DCFCE7; color: #15803D; box-shadow: none; }
    .g4w-blank.g4w-bad { border: 3px solid #EF4444; background: #FEE2E2; color: #B91C1C; box-shadow: none; text-decoration: line-through; }
    .g4w-q { font-weight: 800; color: #1E293B; line-height: 1.3; font-size: clamp(1rem, min(3.4cqw, 8cqh), 2rem); }
    .g4w-q b { color: #DC2626; }
    /* Phím số, nút bao hàng, thẻ xe: viền xanh, bóng 3D liền khối. */
    .g4w-key, .g4w-load, .g4w-tcard { border: 3px solid #93C5FD; background: linear-gradient(180deg, #FFFFFF, #E0F2FE); box-shadow: 0 6px 0 #3B82F6, 0 9px 14px rgba(37, 99, 235, 0.18); transition: transform .08s, box-shadow .08s; font-family: inherit; cursor: pointer; }
    .g4w-key:active, .g4w-load:active, .g4w-tcard:active { transform: translateY(4px); box-shadow: 0 2px 0 #3B82F6; }
    .g4w-pad { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(3, 1fr); gap: 0.5rem; padding-bottom: 6px; }
    .g4w-key { border-radius: 0.9rem; font-weight: 800; font-size: clamp(1.2rem, min(5cqw, 11cqh), 2.6rem); color: #1E3A8A; }
    .g4w-key-del { grid-column: span 2; background: linear-gradient(180deg, #FFFFFF, #FFE4E6); border-color: #FDA4AF; color: #BE123C; box-shadow: 0 6px 0 #E11D48; }
    .g4w-pad-wait .g4w-key { opacity: 0.45; }
    .g4w-loaders { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; padding-bottom: 6px; }
    .g4w-load { min-height: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.2rem; border-radius: 1.1rem; padding: 0.4rem; color: #1E3A8A; font-weight: 800; }
    .g4w-load-pic { flex: 1 1 0; min-height: 0; width: 100%; display: flex; justify-content: center; }
    .g4w-load-pic { align-items: center; }
    .g4w-load-pic svg { height: 100%; max-height: 13rem; width: auto; max-width: 100%; }
    .g4w-load-lab { display: flex; flex-direction: column; align-items: center; line-height: 1.1; font-size: clamp(0.9rem, min(3cqw, 7cqh), 1.6rem); }
    .g4w-load-lab b { font-size: 1.35em; color: #C2410C; }
    .g4w-trucks { flex: 1 1 0; min-height: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; padding-bottom: 6px; }
    .g4w-tcard { position: relative; min-height: 0; min-width: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.05rem; border-radius: 1.1rem; padding: 0.3rem 0.4rem; color: #1E293B; font-weight: 700;
      font-size: clamp(0.85rem, min(2.6cqw, 8.4cqh), 2rem); line-height: 1.2; }
    .g4w-tc-no { font-weight: 900; color: #1D4ED8; }
    .g4w-tc-pic { flex: 1 1 0; min-height: 0; width: 100%; display: flex; justify-content: center; }
    .g4w-tc-pic svg { height: 100%; width: auto; max-width: 100%; }
    .g4w-tc-row b { color: #C2410C; }
    .g4w-tc-sum { font-size: 0.9em; color: #334155; }
    .g4w-tc-tick { position: absolute; top: 0.3rem; right: 0.4rem; width: 1.7em; height: 1.7em; border-radius: 50%; display: grid; place-items: center; background: #F59E0B; color: #fff; font-weight: 900; }
    .g4w-tc-tick:empty { visibility: hidden; }
    .g4w-now { outline: 4px solid #F97316; outline-offset: 2px; }
    .g4w-on { background: linear-gradient(180deg, #FFFBEB, #FDE68A) !important; border-color: #F59E0B !important; box-shadow: 0 6px 0 #D97706 !important; }
    .g4w-tcard.g4w-good { background: linear-gradient(180deg, #F0FDF4, #BBF7D0) !important; border-color: #22C55E !important; box-shadow: 0 6px 0 #15803D !important; }
    .g4w-tcard.g4w-bad { background: linear-gradient(180deg, #FFF1F2, #FECACA) !important; border-color: #EF4444 !important; box-shadow: 0 6px 0 #B91C1C !important; }
    .g4w-side { grid-row: 1 / span 2; grid-column: 2; position: relative; z-index: 0; min-height: 0; display: flex; flex-direction: column; gap: 0.5rem; container-type: size; }
    .g4w-npc { flex: 1 1 0; min-height: 0; display: flex; flex-direction: column; }
    .g4w-bubble { position: relative; flex: none; background: #fff; border-radius: 1rem; padding: 0.45rem 0.7rem 0.55rem; color: #1E293B; font-weight: 700; line-height: 1.3; font-size: clamp(0.85rem, min(6cqi, 3.6cqh), 1.4rem); min-height: 4.2em; box-shadow: 0 4px 0 rgba(30, 58, 95, 0.15); }
    .g4w-bubble::after { content: ''; position: absolute; left: 50%; bottom: -10px; border: 10px solid transparent; border-bottom: 0; border-top-color: #fff; transform: translateX(-50%); }
    .g4w-name { display: block; font-size: 0.72em; color: #0369A1; }
    .g4w-say b { color: #DC2626; }
    /* Hình NPC cao hết khung, neo đáy phải; hình rộng hơn cột (chị Thảo có bao lúa, cân bàn hai bên) thì phần dư lùi ra sau
       bảng cảnh, bảng việc (z-index 1) chứ không cắt hình. */
    .g4w-npc-pic { position: relative; flex: 1 1 0; min-height: 0; margin-top: 0.6rem; }
    /* Cao tối đa 170cqi: rộng nhất 1,3 lần cột (hình 492 × 643), chỉ phần bao lúa bên trái lùi ra sau bảng, người luôn hiện đủ. */
    .g4w-npc-pic img { position: absolute; right: 0; bottom: 0; height: min(100%, 170cqi); width: auto; max-width: none; }
    .g4w-acts { flex: none; display: flex; flex-direction: column; gap: 0.45rem; }
    .g3g-has-result .g4w-acts { visibility: hidden; }
    .g4w-small { align-self: center; border: 0; border-radius: 999px; background: #fff; color: #334155; font-weight: 800; cursor: pointer; padding: 0.3rem 1.1rem; font-size: clamp(0.95rem, 6cqi, 1.3rem); box-shadow: 0 4px 0 #CBD5E1; font-family: inherit; }
    .g4w-done { width: 100%; border: 4px solid #fff; border-radius: 1.1rem; background: linear-gradient(180deg, #4ADE80, #22C55E); color: #fff; font-weight: 800; cursor: pointer; font-family: inherit;
      font-size: clamp(1.05rem, min(8cqi, 6cqh), 1.8rem); padding: clamp(0.25rem, 2cqh, 0.7rem) 0.8rem; text-shadow: 0 2px 0 rgba(0, 0, 0, 0.2); box-shadow: 0 6px 0 #15803D; }
    .g4w-done.g4w-wait { background: linear-gradient(180deg, #CBD5E1, #94A3B8); box-shadow: 0 6px 0 #64748B; }
    .g4w-blink { animation: g4wBlink .5s ease-in-out 3; }
    @keyframes g4wBlink { 50% { filter: drop-shadow(0 0 10px #F97316) brightness(1.1); transform: scale(1.04); } }
    .g4w-side > .g3g-result { position: absolute; z-index: 5; left: 0; right: 0; bottom: 0; max-height: 100%; overflow-y: auto; border-width: 3px; border-radius: 1.2rem; text-align: center; align-items: stretch;
      box-shadow: 0 6px 0 rgba(0, 0, 0, 0.1), 0 16px 36px rgba(0, 0, 0, 0.25); }
    .g4w-side > .g3g-result .g3g-result-text { font-size: clamp(1rem, 6cqi, 1.35rem); }
    .g4w-side > .g3g-result .g3g-tip { font-size: clamp(0.9rem, 5.2cqi, 1.2rem); }
    .g4w-side > .g3g-result .g3g-btn { white-space: normal; font-size: clamp(1rem, 6cqi, 1.4rem); }
    @media (orientation: portrait) {
      /* Dọc: cảnh rộng hết khung ở trên; bảng việc và NPC ở dưới, bảng việc xếp dọc. */
      .g4w-scene { grid-template-columns: minmax(0, 1fr) clamp(9rem, 37%, 19rem); grid-template-rows: clamp(12rem, 36%, 28rem) minmax(0, 1fr); }
      .g4w-viewb { grid-column: 1 / span 2; }
      .g4w-side { grid-row: 2; }
      .g4w-work { flex-direction: column; }
      .g4w-info, .g4w-k-bridge .g4w-info { flex: 0.8 1 0; }
      .g4w-ctrl, .g4w-k-bridge .g4w-ctrl { flex: 1.3 1 0; }
      .g4w-ticket, .g4w-order, .g4w-ledger { font-size: clamp(1rem, min(6.4cqw, 5.4cqh), 2.2rem); }
      .g4w-ledger { font-size: clamp(0.9rem, min(5.2cqw, 4.2cqh), 1.8rem); }
      .g4w-q { font-size: clamp(1rem, min(5.6cqw, 5cqh), 1.9rem); }
      .g4w-key { font-size: clamp(1.2rem, min(8cqw, 6cqh), 2.4rem); }
      .g4w-tcard { font-size: clamp(0.8rem, min(4cqw, 3.6cqh), 1.4rem); }
      .g4w-trucks { grid-template-columns: 1fr; grid-template-rows: repeat(3, 1fr); }
      .g4w-tcard { display: grid; grid-template-columns: auto 1fr; grid-template-rows: repeat(4, auto); column-gap: 0.6rem; justify-items: start; align-content: center; }
      .g4w-tc-pic { grid-row: 1 / span 4; grid-column: 1; width: auto; height: 100%; }
    }
  `);
}
