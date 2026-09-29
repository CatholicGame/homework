/**
 * 🐸 Ếch nhảy tia số — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.1.
 * Hàng lá sen đánh số là tia số; bé đưa ếch tới đúng lá rồi tự bấm "✓ Tới nơi" (app không báo trước lúc tới đúng).
 *   near:    chạm lá có số liền sau / liền trước / ở giữa (một số lá không ghi số — bé đếm từ lá bên cạnh).
 *   add10:   a + b qua 10 bằng thẻ bước nhảy +1…+9; phải dừng ở lá 10 (nhảy vượt qua 10 là rơi xuống nước).
 *   sub10:   a − b qua 10, thẻ −1…−9, cũng phải dừng ở lá 10.
 *   missing: ếch ở lá s, muốn tới lá t bằng MỘT lần nhảy → chọn thẻ ±k (s + ? = t).
 *   carry:   cộng, trừ có nhớ trong phạm vi 100, thẻ 1…9 và 10, 20, 30.
 * Dùng vòng chơi của trò lớp 3 (grade3Games/loop.js): api.succeed / api.fail, thẻ kết quả vào [data-result-host].
 */

import { lilyPadSvg, padLabelSvg, pondBgSvg } from './art/pond.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectFrogStyles } from './styles.js';
import { npcPic, cap } from '../grade3Games/npc.js';
import { sfx } from '../preschool/fx.js';
import { calmMotion } from '../grade3Games/fly.js';
import imgSit from '../../assets/grade2-games/frog/sit.webp';
import imgWorry from '../../assets/grade2-games/frog/worry.webp';
import imgJump from '../../assets/grade2-games/frog/jump.webp';
import imgWet from '../../assets/grade2-games/frog/wet.webp';
import imgMomWait from '../../assets/grade2-games/frog/mom-wait.webp';
import imgMomHappy from '../../assets/grade2-games/frog/mom-happy.webp';
import imgMomSad from '../../assets/grade2-games/frog/mom-sad.webp';

// Cỡ ảnh cắt (px) — để giữ đúng tỉ lệ khi vẽ.
const SPRITE = {
  sit: { src: imgSit, w: 393, h: 438 },
  worry: { src: imgWorry, w: 393, h: 438 },
  jump: { src: imgJump, w: 747, h: 567 },
  wet: { src: imgWet, w: 501, h: 474 },
};

// Mẹ Ếch ngồi trên lá sen, gọi ếch con về: nhân vật duy nhất của trò (ảnh cắt từ src/assets/frog_mom.png, ba nét mặt).
const FROG_MOM = {
  id: 'meech', name: 'Mẹ Ếch', me: 'mẹ', you: 'con', img: imgMomWait, sad: imgMomSad,
  moods: { wait: imgMomWait, happy: imgMomHappy, sad: imgMomSad },
};
const FROG_NPCS = [FROG_MOM];

const MINUS = '−';
const signTxt = (s) => (s > 0 ? '+' : MINUS);
const sayOp = (s) => (s > 0 ? 'cộng' : 'trừ');
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const WANT = (t) => `<b class="g3f-want">${t}</b>`;

export const FROG_LEVELS = [
  {
    ...levelMeta('frog-1'), missions: 5, kind: 'near',
    knowledge: 'tia số, số liền trước, số liền sau',
    ask: (n) => `Chạm vào lá sen đúng số để đưa ếch con về với ${n.me}!`,
    desc: 'Tìm lá có số liền sau, liền trước hoặc ở giữa hai số. Có lá không ghi số: đếm từ lá bên cạnh.',
    how: [['🍃', 'Chạm lá sen'], ['🐸', 'Ếch nhảy'], ['✅', 'Tới nơi']],
  },
  {
    ...levelMeta('frog-2'), missions: 5, kind: 'add10',
    knowledge: 'phép cộng qua 10 trong phạm vi 20',
    ask: (n) => `Nhảy tới lá 10 có hoa sen trước, rồi nhảy tiếp!`,
    desc: '8 + 5: nhảy 2 bước tới lá 10, rồi nhảy 3 bước tới lá 13. Nhảy vượt qua lá 10 là ếch rơi xuống nước.',
    how: [['+2', 'Chọn bước'], ['🪷', 'Dừng ở lá 10'], ['✅', 'Tới nơi']],
  },
  {
    ...levelMeta('frog-3'), missions: 5, kind: 'sub10',
    knowledge: 'phép trừ qua 10 trong phạm vi 20',
    ask: (n) => `Lùi về lá 10 có hoa sen trước, rồi lùi tiếp!`,
    desc: '13 − 5: lùi 3 bước về lá 10, rồi lùi 2 bước về lá 8. Nhảy vượt qua lá 10 là ếch rơi xuống nước.',
    how: [[`${MINUS}3`, 'Chọn bước'], ['🪷', 'Dừng ở lá 10'], ['✅', 'Tới nơi']],
  },
  {
    ...levelMeta('frog-4'), missions: 5, kind: 'missing',
    knowledge: 'số hạng, tổng, số bị trừ, số trừ, hiệu',
    ask: (n) => `Ếch con chỉ nhảy một lần thôi. Nhảy mấy bước thì tới lá cắm cờ?`,
    desc: 'Ếch ở lá 9, muốn tới lá 16: 9 + ? = 16. Lấy 16 − 9 = 7, chọn thẻ +7.',
    how: [['🚩', 'Xem lá cắm cờ'], ['+7', 'Chọn một thẻ'], ['✅', 'Tới nơi']],
  },
  {
    ...levelMeta('frog-5'), missions: 5, kind: 'carry',
    knowledge: 'phép cộng, phép trừ có nhớ trong phạm vi 100',
    ask: (n) => `Nhảy xa trên tia số tới 100! Nhảy chục trước cho nhanh.`,
    desc: '45 + 27: nhảy 20 tới lá 65, nhảy 5 tới lá 70, nhảy 2 tới lá 72.',
    how: [['+20', 'Nhảy chục'], ['+5', 'Nhảy đơn vị'], ['✅', 'Tới nơi']],
  },
];

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
function makeNear(rng, history) {
  const used = history.map(h => h.q);
  const prevQ = used[used.length - 1];
  const fresh = ['after', 'before', 'between'].filter(q => q !== prevQ && !used.slice(-2).includes(q));
  const q = rng.pick(fresh.length ? fresh : ['after', 'before', 'between'].filter(q2 => q2 !== prevQ));
  const seen = new Set(history.map(h => h.target));
  let x, target;
  do {
    x = rng.int(11, 98);
    target = q === 'after' ? x + 1 : q === 'before' ? x - 1 : x;
  } while (seen.has(target));
  const refs = q === 'between' ? [x - 1, x + 1] : [x];
  const lo = Math.max(0, Math.min(100 - 8, target - rng.int(2, 6))), hi = lo + 8; // 9 lá — cả hàng vừa màn hình để bé thấy lá mà chạm
  // Lá không ghi số: lá đích + 2–3 lá khác (không phải số khách nói) — bé đếm từ lá bên cạnh.
  const others = rng.shuffle(Array.from({ length: hi - lo + 1 }, (_, i) => lo + i).filter(v => v !== target && !refs.includes(v)));
  const hidden = [target, ...others.slice(0, rng.int(2, 3))];
  let start;
  do { start = rng.int(lo, hi); } while (Math.abs(start - target) < 2);
  return { kind: 'near', q, x, refs, target, start, lo, hi, hidden };
}

function makeCross(rng, history, sign) {
  const seen = new Set(history.map(h => `${h.a}${h.b}`));
  let a, b;
  do {
    if (sign > 0) { a = rng.int(3, 9); b = rng.int(11 - a, 9); } else { a = rng.int(11, 18); b = rng.int(a - 9, 9); }
  } while (seen.has(`${a}${b}`) || (history.length && history[history.length - 1].a === a));
  return { kind: sign > 0 ? 'add10' : 'sub10', sign, a, b, start: a, target: a + sign * b, lo: 0, hi: 20, cards: [1, 2, 3, 4, 5, 6, 7, 8, 9] };
}

function makeMissing(rng, history) {
  const prev = history[history.length - 1];
  const sign = prev ? -prev.sign : rng.pick([1, -1]);
  const seen = new Set(history.map(h => `${h.start}-${h.target}`));
  let s, k;
  do {
    k = rng.int(3, 9);
    s = sign > 0 ? rng.int(1, 20 - k) : rng.int(k + 1, 20);
  } while (seen.has(`${s}-${s + sign * k}`));
  return { kind: 'missing', sign, start: s, target: s + sign * k, k, lo: 0, hi: 20, cards: [1, 2, 3, 4, 5, 6, 7, 8, 9] };
}

function makeCarry(rng, history) {
  const prev = history[history.length - 1];
  const sign = prev ? -prev.sign : rng.pick([1, -1]);
  const seen = new Set(history.map(h => `${h.a}${h.sign}${h.b}`));
  let a, b;
  do {
    const two = rng() < 0.6; // số trừ / số hạng có hai chữ số
    if (sign > 0) {
      a = rng.int(1, 7) * 10 + rng.int(2, 9);
      const u = rng.int(10 - (a % 10), 9);
      const maxT = Math.floor((99 - a - u) / 10);
      b = two && maxT >= 1 ? rng.int(1, Math.min(maxT, 5)) * 10 + u : u;
    } else {
      a = rng.int(2, 9) * 10 + rng.int(0, 7);
      const u = rng.int((a % 10) + 1, 9);
      const maxT = Math.floor((a - u - 1) / 10);
      b = two && maxT >= 1 ? rng.int(1, Math.min(maxT, 5)) * 10 + u : u;
    }
  } while (seen.has(`${a}${sign}${b}`) || a + sign * b < 1 || a + sign * b > 99);
  return { kind: 'carry', sign, a, b, start: a, target: a + sign * b, lo: 0, hi: 100, cards: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30] };
}

/** Các cú nhảy đúng (để chỉ cho bé khi sai): [[từ, tới], …]. */
function rightPath(m) {
  const { start: s, target: t } = m;
  if (m.kind === 'near' || m.kind === 'missing') return [[s, t]];
  if (m.kind === 'add10' || m.kind === 'sub10') return [[s, 10], [10, t]];
  // carry: chục trước, rồi tới số tròn chục, rồi phần còn lại.
  const hops = [];
  let x = s;
  const T = Math.floor(m.b / 10) * 10, u = m.b % 10;
  if (T) { hops.push([x, x + m.sign * T]); x += m.sign * T; }
  const d = m.sign > 0 ? 10 - (x % 10) : x % 10;
  if (d && d < u) { hops.push([x, x + m.sign * d]); x += m.sign * d; }
  if (x !== t) hops.push([x, t]);
  return hops;
}

const hopText = (a, b) => `${a} ${signTxt(b - a)} ${Math.abs(b - a)} = ${b}`;

// ── Trò chơi ────────────────────────────────────────────────────────────────────────────────────
export const FROG_GAME = {
  ...stallMeta('frog'),
  unitWord: 'lượt',
  npcs: FROG_NPCS,
  starPrefix: 'g2games',
  levels: FROG_LEVELS,
  stallIcon: () => `<img src="${imgSit}" alt="" style="width:56px;height:56px;object-fit:contain">`,
  summaryText: (ok, total) => `Em đã đưa ếch tới đúng lá <strong>${ok}/${total}</strong> lượt.`,

  howTo(level) {
    const pic = (p) => (/^[+−]\d+$/.test(p) ? `<span class="g2f-how-card">${p}</span>` : p);
    return [...level.how.map(([p, label]) => ({ pic: pic(p), label })), { pic: '😊', label: 'Bạn vui' }];
  },

  makeMission(rng, level, history) {
    const npc = FROG_MOM;
    const k = level.kind;
    const m = k === 'near' ? makeNear(rng, history)
      : k === 'add10' ? makeCross(rng, history, 1)
      : k === 'sub10' ? makeCross(rng, history, -1)
      : k === 'missing' ? makeMissing(rng, history)
      : makeCarry(rng, history);
    return { ...m, npc };
  },

  mountMission(stage, m, level, api) {
    injectFrogStyles();
    const n = m.npc;
    const usesCards = m.kind !== 'near';
    const cardsHtml = usesCards ? m.cards.map(k => {
      const s = m.kind === 'add10' ? 1 : m.kind === 'sub10' ? -1 : m.kind === 'missing' ? m.sign : m.sign;
      return `<button type="button" class="g2f-card${k >= 10 ? ' g2f-card-ten' : ''}" data-k="${s * k}">${signTxt(s)}${k}</button>`;
    }).join('') : `<div class="g2f-tray-hint">👆 Chạm vào lá sen để ếch nhảy tới đó</div>`;

    stage.innerHTML = `
      <div class="g2f-scene animate-fadeIn" data-result-host>
        <div class="g2f-pond"><svg class="g2f-svg" xmlns="http://www.w3.org/2000/svg"></svg>
          <div class="g2f-npc">
            <div class="g2f-npc-pic">${npcPic(n, 'wait')}</div>
            <div class="g2f-bubble"><span class="g2f-npc-name">${n.name}</span><span class="g2f-say"></span></div>
          </div>
          <div class="g2f-log" hidden></div>
          <button type="button" class="g2f-go" data-act="done" hidden>✓ Tới nơi</button>
          <button type="button" class="g2f-pan-btn g2f-pan-l" data-pan="-1" aria-label="Xem lá bên trái" hidden>‹</button>
          <button type="button" class="g2f-pan-btn g2f-pan-r" data-pan="1" aria-label="Xem lá bên phải" hidden>›</button>
        </div>
        <div class="g2f-tray">
          <div class="g2f-cards">${cardsHtml}</div>
          <div class="g2f-tray-end">
            <button type="button" class="g2f-say-btn" data-act="say" aria-label="Nghe lại">🔊</button>
          </div>
        </div>
      </div>`;
    const scene = stage.querySelector('.g2f-scene');
    const pond = stage.querySelector('.g2f-pond');
    const svg = stage.querySelector('.g2f-svg');
    const sayBox = stage.querySelector('.g2f-say');
    const npcBox = stage.querySelector('.g2f-npc-pic');
    const logBox = stage.querySelector('.g2f-log');
    const cardsBox = stage.querySelector('.g2f-cards');
    const doneBtn = stage.querySelector('[data-act="done"]');
    const trayHint = stage.querySelector('.g2f-tray-hint');
    const panL = stage.querySelector('.g2f-pan-l');
    const panR = stage.querySelector('.g2f-pan-r');
    [imgMomHappy, imgMomSad].forEach(src => { new Image().src = src; });

    // ── Trạng thái ──
    const st = {
      pos: m.start, moved: false, busy: false, over: false, fell: null, // fell = { x } (toạ độ thế giới) khi rơi xuống nước
      log: [], revealed: false, path: null,
    };
    let G = null; // hình học hiện tại (dựng lại khi đổi cỡ)
    if (import.meta.env.DEV) window.__g2frog = { m, st, rightPath: () => rightPath(m) }; // cho kịch bản thử tự động

    let lastLine = '';
    const speak = (text, mood, shown) => {
      sayBox.innerHTML = shown || text;
      if (mood) npcBox.innerHTML = npcPic(n, mood);
      lastLine = text;
      api.say(text);
    };
    stage.querySelector('[data-act="say"]').onclick = () => api.say(lastLine);

    // ── Dựng cảnh theo cỡ khung ──
    function build() {
      const W = pond.clientWidth, H = pond.clientHeight;
      if (!W || !H) return;
      const tall = scene.clientHeight > scene.clientWidth; // theo cả cảnh (khay đổi cỡ theo kiểu dọc → không đổi qua lại)
      scene.classList.toggle('g2f-tall', tall);
      const count = m.hi - m.lo + 1;
      // Lá to theo chiều cao khung; số lá nhìn thấy theo chiều ngang (khung trượt theo ếch khi hàng dài hơn màn).
      // Màn dọc hẹp: khoảng 5 lá to trên màn, vuốt ngang (hoặc bấm ‹ ›) để xem thêm. Màn ngang rộng: lá to hẳn lên.
      let r = Math.max(20, Math.min(tall ? 46 : 78, H * (tall ? 0.12 : 0.105), W / (tall ? 11 : 9)));
      // Cấp chạm lá (màn ngang): cả hàng 9 lá nằm gọn trong màn hình để bé thấy mà chạm.
      if (m.kind === 'near' && !tall) r = Math.max(20, Math.min(r, W / ((count - 1) * 2.28 + 2.6)));
      const step = r * 2.28;
      const margin = r * 1.3;
      const padY = H * (tall ? 0.64 : 0.7);
      const fw = r * 2.25;
      const fits = (count - 1) * step <= W - 2 * margin;
      G = { W, H, r, step, margin, padY, fw, fits, tall, cam: 0 };
      scene.style.setProperty('--go-fs', `${Math.round(Math.max(17, Math.min(30, r * 0.46)))}px`);
      // Bạn nhỏ: màn dọc đứng trên bờ phía trên; màn ngang đứng ngay trên đầu hàng lá (sát chỗ bé chạm), to theo khoảng trống.
      // Hình mẹ ếch gần vuông (rộng ≈ cao): màn dọc giữ chừng 40% bề ngang để bóng nói bên cạnh còn chỗ.
      const npcH = Math.round(Math.max(70, Math.min(tall ? Math.min(260, W * 0.4) : 330, padY - r * (tall ? 3.6 : 3))));
      scene.style.setProperty('--npc-h', `${npcH}px`);
      scene.style.setProperty('--pan-y', `${Math.round(padY + r * 1.1)}px`); // nút ‹ › ngay dưới hàng lá, không che lá ở mép
      if (!tall) {
        const total = (count - 1) * step + 2 * margin;
        const side = fits ? Math.max(8, (W - total) / 2 + margin - r * 1.2) : 8; // mép trái / phải của hàng lá trên màn
        scene.style.setProperty('--row-side', `${Math.round(side)}px`);
        scene.style.setProperty('--npc-top', `${Math.round(Math.max(6, padY - r * 2.6 - npcH))}px`);
        scene.style.setProperty('--say-fs', `${Math.round(Math.max(16, Math.min(32, npcH * 0.095)))}px`);
      }
      svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svg.setAttribute('width', W);
      svg.setAttribute('height', H);
      svg.classList.toggle('g2f-pan', !fits);
      let pads = '', nums = '';
      const lab = Math.max(0.75, Math.min(1.9, r / 36)); // nhãn số co giãn theo cỡ lá
      const hidden = new Set(st.revealed ? [] : m.hidden || []);
      for (let v = m.lo; v <= m.hi; v++) {
        const big = v % 10 === 0;
        const at = `translate(${X(v).toFixed(1)},${padY.toFixed(1)})`;
        // Vòng sóng lan quanh lá (mặt nước động), mỗi lá lệch nhịp một chút.
        const ring = `<ellipse class="g2f-ring" rx="${(r * 1.12).toFixed(1)}" ry="${(r * 0.72).toFixed(1)}" cy="${(r * 0.12).toFixed(1)}" style="animation-delay:-${((v * 0.73) % 3).toFixed(2)}s"/>`;
        pads += `<g class="g2f-padwrap" data-v="${v}" transform="${at}">${ring}<g class="g2f-bob">${lilyPadSvg(big ? r * 1.15 : r, { tone: v % 3, notch: 235 + (v * 37) % 70, big })}</g>
          <ellipse class="g2f-hit" rx="${r * 1.15}" ry="${r * 0.9}" fill="transparent"/></g>`;
        nums += `<g transform="${at} scale(${lab.toFixed(2)})" class="g2f-num${hidden.has(v) ? ' g2f-num-blank' : ''}">${hidden.has(v) ? blankLabel(r / lab, big) : padLabelSvg(v, r / lab, big)}</g>`;
      }
      const flag = m.kind === 'missing' ? flagSvg(X(m.target), padY, r) : '';
      svg.innerHTML = `${pondBgSvg(W, H, { bank: 0, live: true })}
        <g class="g2f-world">${pads}<g class="g2f-trail"></g><g class="g2f-ghost"></g>${flag}
          <g class="g2f-frog"><image href="${SPRITE.sit.src}" preserveAspectRatio="xMidYMid meet"/></g>${nums}<g class="g2f-fx"></g></g>`;
      G.world = svg.querySelector('.g2f-world');
      G.frog = svg.querySelector('.g2f-frog image');
      G.trail = svg.querySelector('.g2f-trail');
      G.ghost = svg.querySelector('.g2f-ghost');
      G.fx = svg.querySelector('.g2f-fx');
      // Cấp chạm lá: chưa nhảy thì nhìn giữa hàng lá (không nhìn thẳng vào lá đích, cũng không bám ếch ở mép).
      setCam(st.over ? overCam() : camFor(m.kind === 'near' && !st.moved ? (m.lo + m.hi) / 2 : st.pos));
      if (st.fell) placeFrog(st.fell.x, padY + r * 1.75, 'wet');
      else placeFrog(X(st.pos), baseY(), st.over && st.pos !== m.target ? 'worry' : 'sit');
      st.log.forEach(([a, b]) => drawArc(G.trail, a, b, 'g2f-arc'));
      if (st.path) drawPath(st.path);
    }
    const X = (v) => G.margin + (v - m.lo) * G.step;
    const baseY = () => G.padY + G.r * 0.12;
    /** Độ dời khung nhìn để lá v nằm giữa (hàng ngắn vừa màn: đặt giữa cả hàng). */
    function camFor(v) {
      const total = (m.hi - m.lo) * G.step + 2 * G.margin;
      if (G.fits) return (G.W - total) / 2;
      const want = G.W / 2 - X(v ?? st.pos);
      return Math.max(G.W - total, Math.min(0, want));
    }
    /** Hết lượt: khung nhìn lùi lại cho thấy cả đoạn từ lá xuất phát tới lá đích (và chỗ ếch đang đứng). */
    function overCam() {
      const vs = [m.start, m.target, st.pos];
      const lo = Math.min(...vs), hi = Math.max(...vs);
      // Quãng dài hơn màn hình (cấp có nhớ): nhìn vào chỗ ếch đang đứng.
      if ((hi - lo) * G.step > G.W - 2 * G.margin) return camFor(st.fell ? m.start : st.pos);
      return camFor((lo + hi) / 2);
    }
    function panTo(c1, dur = 450) {
      const c0 = G.cam, t0 = performance.now();
      const f = (now) => {
        if (!G.world.isConnected) return;
        const t = Math.min(1, (now - t0) / dur);
        setCam(c0 + (c1 - c0) * (1 - (1 - t) ** 2));
        if (t < 1) requestAnimationFrame(f);
      };
      requestAnimationFrame(f);
    }
    function setCam(c) {
      G.cam = c;
      G.world.setAttribute('transform', `translate(${c.toFixed(1)},0)`);
      // Nút ‹ › chỉ hiện khi hàng lá dài hơn màn; mờ đi ở đầu hàng.
      const minCam = G.W - ((m.hi - m.lo) * G.step + 2 * G.margin);
      panL.hidden = panR.hidden = G.fits;
      panL.disabled = c >= -1;
      panR.disabled = c <= minCam + 1;
      placeGo();
    }
    /** Nút "✓ Tới nơi" nổi ngay trên đầu ếch (chỗ bé đang nhìn), chỉ hiện khi ếch đã nhảy và đang đứng yên. */
    function placeGo() {
      const show = !!G && st.moved && !st.busy && !st.over;
      doneBtn.hidden = !show;
      if (!show) return;
      const w = doneBtn.offsetWidth;
      const x = Math.max(w / 2 + 6, Math.min(G.W - w / 2 - 6, G.cam + X(st.pos)));
      doneBtn.style.left = `${x.toFixed(1)}px`;
      // Cấp chọn thẻ: nhãn ±k của cú nhảy vừa rồi nằm sát đầu ếch → đặt nút cao hơn để không che nhãn.
      doneBtn.style.top = `${(G.padY - G.r * (usesCards ? 3.35 : 2.55)).toFixed(1)}px`;
    }

    function placeFrog(cx, bottom, kind, flip = false) {
      const sp = SPRITE[kind];
      const w = kind === 'jump' ? G.fw * 1.55 : kind === 'wet' ? G.fw * 1.2 : G.fw;
      const h = w * sp.h / sp.w;
      const x = cx - w / 2, y = bottom - h;
      if (G.frog.getAttribute('href') !== sp.src) G.frog.setAttribute('href', sp.src);
      G.frog.setAttribute('x', x.toFixed(1)); G.frog.setAttribute('y', y.toFixed(1));
      G.frog.setAttribute('width', w.toFixed(1)); G.frog.setAttribute('height', h.toFixed(1));
      G.frog.setAttribute('transform', flip ? `translate(${(2 * cx).toFixed(1)},0) scale(-1,1)` : '');
    }

    /** Vòng cung nhảy a → b (nét chấm + nhãn ±k). */
    function drawArc(layer, a, b, cls, label = true) {
      const xa = X(a), xb = X(b), top = G.padY - G.r * (2.2 + Math.min(2.2, Math.abs(b - a) * 0.12));
      const k = b - a;
      const lx = (xa + xb) / 2, ly = G.padY - G.r * 0.4 - (G.padY - G.r * 0.4 - top) * 0.5 - G.r * 0.9;
      layer.insertAdjacentHTML('beforeend', `<g class="${cls}">
        <path d="M${xa.toFixed(1)},${(G.padY - G.r * 0.4).toFixed(1)} Q${lx.toFixed(1)},${top.toFixed(1)} ${xb.toFixed(1)},${(G.padY - G.r * 0.4).toFixed(1)}"/>
        ${label ? `<g transform="translate(${lx.toFixed(1)},${ly.toFixed(1)}) scale(${Math.max(1, Math.min(1.8, G.r / 40)).toFixed(2)})"><rect x="-24" y="-15" width="48" height="28" rx="14"/><text text-anchor="middle" dy="6">${signTxt(k)}${Math.abs(k)}</text></g>` : ''}</g>`);
    }
    function drawPath(path) {
      G.ghost.innerHTML = '';
      path.forEach(([a, b]) => drawArc(G.ghost, a, b, 'g2f-arc g2f-arc-right'));
    }

    const lift = (d) => G.r * (2.2 + Math.min(2.4, d * 0.14));
    /** Ếch nhảy từ lá a tới lá b (hoặc rơi xuống nước ở toạ độ fallX). Khung nhìn trượt theo. */
    function hop(a, b, { fallX = null } = {}) {
      return new Promise((done) => {
        const x0 = X(a), x1 = fallX ?? X(b), dist = Math.abs(b - a);
        const dur = Math.round(Math.min(1300, 480 + dist * (m.kind === 'carry' ? 22 : 55)));
        const c0 = G.cam, c1 = fallX != null ? camFor(a) : camFor(b);
        const hgt = lift(dist), y0 = baseY();
        const flip = x1 < x0;
        const t0 = performance.now();
        sfx.swish();
        const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
        const frame = (now) => {
          if (!G.frog.isConnected) return done();
          const t = Math.min(1, (now - t0) / dur), e = ease(t);
          const x = x0 + (x1 - x0) * e;
          let y = y0 - Math.sin(Math.PI * e) * hgt;
          if (fallX != null && e > 0.7) y = y0 - Math.sin(Math.PI * e) * hgt + ((e - 0.7) / 0.3) * G.r * 1.6; // lọt xuống nước giữa hai lá
          placeFrog(x, y + (t < 1 ? G.r * 0.3 : 0), t < 1 ? 'jump' : 'sit', flip);
          setCam(c0 + (c1 - c0) * e);
          if (t < 1) return requestAnimationFrame(frame);
          done();
        };
        requestAnimationFrame(frame);
      });
    }
    function bob(v) {
      const g = svg.querySelector(`.g2f-padwrap[data-v="${v}"] .g2f-bob`);
      if (!g) return;
      g.classList.remove('g2f-bobbing'); void g.getBBox(); g.classList.add('g2f-bobbing');
    }
    function splash(x) {
      G.fx.insertAdjacentHTML('beforeend', `<g class="g2f-splash" transform="translate(${x.toFixed(1)},${(G.padY + G.r * 1.6).toFixed(1)})">
        <ellipse rx="${G.r}" ry="${G.r * 0.35}"/><ellipse rx="${G.r * 0.6}" ry="${G.r * 0.2}"/></g>`);
    }

    // ── Bước nhảy ──
    const renderLog = () => {
      logBox.hidden = !st.log.length;
      logBox.innerHTML = st.log.map(([a, b]) => `<div>${hopText(a, b)}</div>`).join('');
    };
    async function jumpTo(b) {
      if (st.busy || st.over) return;
      const a = st.pos;
      if (a === b) return;
      st.busy = true;
      scene.classList.add('g2f-busy');
      placeGo();
      const lo = m.lo, hi = m.hi;
      const off = b < lo || b > hi;
      const cross = (m.kind === 'add10' || m.kind === 'sub10') && ((a < 10 && b > 10) || (a > 10 && b < 10));
      if (off || cross) {
        // Rơi xuống nước: ngay sau lá 10 (nhảy vượt qua) hoặc ngay ngoài hàng lá.
        const dir = Math.sign(b - a);
        const edge = cross ? 10 : dir > 0 ? hi : lo;
        const fx = X(edge) + dir * G.step * 0.5;
        await hop(a, cross ? 10 + dir : edge, { fallX: fx });
        st.fell = { x: fx };
        placeFrog(fx, G.padY + G.r * 1.75, 'wet');
        splash(fx);
        st.log.push([a, b]);
        renderLog();
        finishFail(cross
          ? { line: 'Ối, ếch con nhảy qua lá 10 nên rơi xuống nước rồi!', text: `Ếch nhảy ${signTxt(b - a)}${Math.abs(b - a)} từ lá ${a}, vượt qua lá 10 nên rơi xuống nước.` }
          : { line: 'Ối, ếch con nhảy ra ngoài hàng lá sen rồi!', text: `Từ lá ${a} nhảy ${signTxt(b - a)}${Math.abs(b - a)} là ra ngoài hàng lá sen.` });
        return;
      }
      await hop(a, b);
      st.pos = b;
      st.moved = true;
      if (usesCards) { st.log.push([a, b]); drawArc(G.trail, a, b, 'g2f-arc'); renderLog(); }
      bob(b);
      sfx.pop(Math.min(6, st.log.length));
      st.busy = false;
      scene.classList.remove('g2f-busy');
      placeGo();
      if (m.kind === 'near') trayHint.innerHTML = '✓ Đúng lá rồi? Bấm nút trên đầu ếch';
      if (m.kind === 'missing') lockCards(); // chỉ một lần nhảy
    }
    const lockCards = () => cardsBox.querySelectorAll('button').forEach(bt => { bt.disabled = true; });

    cardsBox.addEventListener('click', (e) => {
      const bt = e.target.closest('[data-k]');
      if (!bt || bt.disabled) return;
      sfx.tap();
      if (m.kind === 'missing') bt.classList.add('g2f-card-on');
      jumpTo(st.pos + Number(bt.dataset.k));
    });
    // Vuốt ngang mặt suối để xem lá ở xa (hàng dài hơn màn hình). Vuốt xong không tính là chạm lá.
    // CSS .g2f-pan đặt touch-action: pan-y → trình duyệt không giành cú vuốt ngang (trước đây vuốt trên điện thoại hay bị huỷ).
    // Thả tay khi đang vuốt nhanh: hàng lá trôi tiếp một đoạn rồi dừng.
    const clampCam = (c) => Math.max(G.W - ((m.hi - m.lo) * G.step + 2 * G.margin), Math.min(0, c));
    let drag = null, dragged = false, glide = 0;
    svg.addEventListener('pointerdown', (e) => {
      cancelAnimationFrame(glide);
      if (G && !G.fits && !st.busy) drag = { x: e.clientX, cam: G.cam, on: false, id: e.pointerId, vx: 0, lx: e.clientX, lt: e.timeStamp };
    });
    svg.addEventListener('pointermove', (e) => {
      if (!drag || e.pointerId !== drag.id || st.busy) return;
      const dx = e.clientX - drag.x;
      if (!drag.on && Math.abs(dx) < 8) return;
      if (!drag.on) { drag.on = true; try { svg.setPointerCapture(e.pointerId); } catch { /* đã nhả */ } }
      const dt = Math.max(1, e.timeStamp - drag.lt);
      drag.vx = 0.7 * drag.vx + 0.3 * ((e.clientX - drag.lx) / dt); // px/ms, làm mượt
      drag.lx = e.clientX; drag.lt = e.timeStamp;
      setCam(clampCam(drag.cam + dx));
    });
    const endDrag = (e) => {
      if (!drag || (e && e.pointerId !== drag.id)) return;
      if (drag.on) {
        dragged = true;
        setTimeout(() => { dragged = false; }, 0); // chỉ nuốt cú click ngay sau khi vuốt
        let v = e?.type === 'pointerup' && e.timeStamp - drag.lt < 80 ? drag.vx * 16 : 0; // px mỗi khung hình
        const f = () => {
          if (!G.world.isConnected || Math.abs(v) < 0.5 || st.busy) return;
          const c = clampCam(G.cam + v);
          if (c === G.cam) return;
          setCam(c);
          v *= 0.92;
          glide = requestAnimationFrame(f);
        };
        glide = requestAnimationFrame(f);
      }
      drag = null;
    };
    svg.addEventListener('pointerup', endDrag);
    svg.addEventListener('pointercancel', endDrag);
    // Nút ‹ › ở hai mép: trượt hàng lá 3 lá một lần (cho bé chưa quen vuốt).
    [panL, panR].forEach(b => b.addEventListener('click', () => {
      if (st.busy) return;
      cancelAnimationFrame(glide);
      sfx.tap();
      panTo(clampCam(G.cam - Number(b.dataset.pan) * G.step * 3), 380);
    }));
    svg.addEventListener('click', (e) => {
      if (dragged) { dragged = false; return; }
      if (usesCards) {
        // Chạm lá thay vì chọn thẻ → nhắc chọn bước nhảy.
        if (e.target.closest('.g2f-padwrap') && !st.over && !st.busy) blocked();
        return;
      }
      const p = e.target.closest('.g2f-padwrap');
      if (p) jumpTo(Number(p.dataset.v));
    });

    function blocked() {
      if (usesCards) {
        speak(`${cap(n.you)} chọn bước nhảy ở dưới cho ếch con!`, null, 'Chọn bước nhảy ở dưới!');
        cardsBox.classList.remove('g2f-nudge'); void cardsBox.offsetWidth; cardsBox.classList.add('g2f-nudge');
      } else {
        speak(`${cap(n.you)} chạm vào một lá sen để ếch con nhảy tới!`, null, 'Chạm vào lá sen!');
        scene.classList.remove('g2f-hint-pads'); void scene.offsetWidth; scene.classList.add('g2f-hint-pads');
      }
    }

    // ── Xác nhận ──
    doneBtn.onclick = () => {
      if (st.over || st.busy) return;
      if (!st.moved) return blocked();
      st.over = true;
      lockCards();
      doneBtn.disabled = true;
      placeGo();
      if (m.kind === 'near') { st.revealed = true; build(); }
      if (st.pos === m.target) return win();
      placeFrog(X(st.pos), baseY(), 'worry');
      const wrong = { line: `Ếch con đang ở lá ${st.pos}, chưa đúng lá ${n.me} dặn!`, text: `Ếch đang ở lá ${st.pos}. Lá cần tới là <b>lá ${m.target}</b>.` };
      finishFail(wrong);
    };

    async function win() {
      // Ếch nhảy cẫng lên tại chỗ, lá nhún.
      const x = X(st.pos), y0 = baseY();
      const t0 = performance.now(), dur = calmMotion() ? 500 : 650;
      await new Promise((ok) => {
        const f = (now) => {
          if (!G.frog.isConnected) return ok();
          const t = Math.min(1, (now - t0) / dur);
          placeFrog(x, y0 - Math.sin(Math.PI * t) * G.r * 1.3, t < 1 ? 'jump' : 'sit');
          if (t < 1) requestAnimationFrame(f); else ok();
        };
        requestAnimationFrame(f);
      });
      bob(st.pos);
      panTo(overCam());
      speak(`Giỏi quá ${n.you} ơi! Ếch con về đúng lá ${m.target} rồi!`, 'happy', `Giỏi quá ${n.you} ơi! 🎉`);
      api.succeed(`${n.name} rất vui! ${successText()}`);
    }

    function finishFail({ line, text }) {
      st.over = true;
      lockCards();
      doneBtn.disabled = true;
      st.busy = false;
      scene.classList.remove('g2f-busy');
      placeGo();
      st.path = rightPath(m);
      drawPath(st.path);
      panTo(overCam());
      speak(line, 'sad', line);
      api.fail(text, tipText());
    }

    // ── Lời nói, lời giải ──
    function successText() {
      const { start: s, target: t } = m;
      if (m.kind === 'near') {
        return m.q === 'after' ? `Số liền sau của ${m.x} là <b>${t}</b>.` : m.q === 'before' ? `Số liền trước của ${m.x} là <b>${t}</b>.`
          : `Số ở giữa ${m.refs[0]} và ${m.refs[1]} là <b>${t}</b>.`;
      }
      if (m.kind === 'missing') return `<b>${s} ${signTxt(m.sign)} ${m.k} = ${t}</b>`;
      return `<b>${m.a} ${signTxt(m.sign)} ${m.b} = ${t}</b>`;
    }
    function tipText() {
      const { start: s, target: t } = m;
      if (m.kind === 'near') {
        return m.q === 'after' ? `Số liền sau của ${m.x} là ${m.x} + 1 = ${t}: lá ngay bên phải lá ${m.x}.`
          : m.q === 'before' ? `Số liền trước của ${m.x} là ${m.x} ${MINUS} 1 = ${t}: lá ngay bên trái lá ${m.x}.`
          : `${m.refs[0]}, ${t}, ${m.refs[1]}: số ở giữa là số liền sau của ${m.refs[0]}.`;
      }
      if (m.kind === 'add10') {
        const d = 10 - m.a;
        return `Tách ${m.b} = ${d} + ${m.b - d}: nhảy ${d} bước tới lá 10 (${m.a} + ${d} = 10), rồi nhảy ${m.b - d} bước (10 + ${m.b - d} = ${t}).`;
      }
      if (m.kind === 'sub10') {
        const d = m.a - 10;
        return `Tách ${m.b} = ${d} + ${m.b - d}: lùi ${d} bước về lá 10 (${m.a} ${MINUS} ${d} = 10), rồi lùi ${m.b - d} bước (10 ${MINUS} ${m.b - d} = ${t}).`;
      }
      if (m.kind === 'missing') {
        return m.sign > 0 ? `${s} + ${m.k} = ${t}. Muốn tìm số bước, lấy ${t} ${MINUS} ${s} = ${m.k}: chọn thẻ +${m.k}.`
          : `${s} ${MINUS} ${m.k} = ${t}. Muốn tìm số bước, lấy ${s} ${MINUS} ${t} = ${m.k}: chọn thẻ ${MINUS}${m.k}.`;
      }
      const steps = rightPath(m).map(([a, b]) => `${a} ${signTxt(b - a)} ${Math.abs(b - a)} = ${b}`).join(', rồi ');
      return `${m.a} ${signTxt(m.sign)} ${m.b}: ${steps}.`;
    }

    function intro() {
      const { start: s, target: t } = m;
      const you = cap(n.you);
      if (m.kind === 'near') {
        const what = m.q === 'after' ? `số liền sau của ${m.x}` : m.q === 'before' ? `số liền trước của ${m.x}` : `số ở giữa ${m.refs[0]} và ${m.refs[1]}`;
        const shown = m.q === 'between' ? `Lá ở <b>giữa</b> ${WANT(m.refs[0])} và ${WANT(m.refs[1])}` : `Lá <b>${m.q === 'after' ? 'liền sau' : 'liền trước'}</b> của ${WANT(m.x)}`;
        speak(`Đưa ếch con tới lá có ${what}. ${you} chạm vào lá đó rồi bấm Tới nơi!`, null, shown);
      } else if (m.kind === 'add10' || m.kind === 'sub10') {
        const verb = m.sign > 0 ? 'tới' : 'về';
        speak(`Ếch con đang ở lá ${s}. ${you} đưa ếch con ${verb} lá ${m.a} ${sayOp(m.sign)} ${m.b}! Nhớ dừng ở lá 10.`, null,
          `Đưa ếch ${verb} lá ${WANT(`${m.a} ${signTxt(m.sign)} ${m.b}`)}`);
      } else if (m.kind === 'missing') {
        speak(`Ếch con ở lá ${s}, muốn tới lá ${t} có cắm cờ, chỉ bằng một lần nhảy. Nhảy mấy bước?`, null,
          `Nhảy một lần tới lá 🚩<br>${WANT(`${s} ${signTxt(m.sign)} ? = ${t}`)}`);
      } else {
        speak(`Ếch con đang ở lá ${s}. ${you} đưa ếch con tới lá ${m.a} ${sayOp(m.sign)} ${m.b}! Nhảy chục trước cho nhanh.`, null,
          `Đưa ếch tới lá ${WANT(`${m.a} ${signTxt(m.sign)} ${m.b}`)}`);
      }
    }

    const obs = new ResizeObserver(() => { if (!scene.isConnected) return obs.disconnect(); if (!st.busy) build(); });
    obs.observe(pond);
    build();
    intro();
  },
};

/** Nhãn số bỏ trống (lá chưa ghi số) — bé đếm từ lá bên cạnh. */
function blankLabel(r, big) {
  const k = big ? 1.25 : 1, y = r * 0.62 * 0.5;
  return `<g transform="translate(0,${y.toFixed(1)}) scale(${k})"><rect x="-17" y="-12" width="34" height="24" rx="12" fill="#FFFDF2" stroke="#2F6B3A" stroke-width="1.8" stroke-dasharray="4 3"/></g>`;
}

/** Cờ đỏ cắm ở lá đích (cấp "Nhảy mấy bước?" — lá đích là đề bài, không phải đáp án). */
function flagSvg(x, y, r) {
  return `<g class="g2f-flag" transform="translate(${(x + r * 0.55).toFixed(1)},${(y - r * 0.05).toFixed(1)})">
    <line x1="0" y1="0" x2="0" y2="${(-r * 1.9).toFixed(1)}" stroke="#7C2D12" stroke-width="3" stroke-linecap="round"/>
    <path d="M0,${(-r * 1.9).toFixed(1)} L${(r * 0.95).toFixed(1)},${(-r * 1.6).toFixed(1)} L0,${(-r * 1.3).toFixed(1)} Z" fill="#EF4444" stroke="#7F1D1D" stroke-width="1.5"/></g>`;
}
