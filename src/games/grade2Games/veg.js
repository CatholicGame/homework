/**
 * 🥕 Quầy rau củ (Chợ phiên của bé, lớp 2) — thiết kế: docs/lop_2/thiet-ke-tro-choi.md §4.3.
 * Cấp 1 "Nặng hơn, nhẹ hơn" (Bài 15 tiết 1, trước khi học ki-lô-gam): khách đưa hai món, bé đặt từng món lên một đĩa
 * cân, nhìn cân nghiêng rồi chọn câu đúng như trong vở: "… nhẹ hơn / nặng hơn / nặng bằng …". Không có số, không có tiền.
 * Có lượt hai bên nặng bằng nhau (cân thăng bằng) và lượt món to mà nhẹ (bó rau muống) — nhìn cân, không nhìn cỡ.
 * Câu trả lời chỉ hiện sau khi cả hai món đã nằm trên cân: bé phải cân rồi mới chọn.
 * Dùng khung quầy của Chợ phiên lớp 3 (market/stall.js) và cân đĩa (art/scale.js), theme 'veg'.
 */

import { VEG, vegHeap, vegIcon, vegLabel, vegLooks } from './art/veg.js';
import { stallMeta, levelMeta } from './catalog.js';
import { injectVegStyles } from './styles.js';
import { NPCS, cap } from '../grade3Games/npc.js';
import { mountStall } from '../grade3Games/market/stall.js';
import { mountScale } from '../grade3Games/art/scale.js';
import { flyOne, svgBoxOnScreen } from '../grade3Games/fly.js';
import { sfx } from '../preschool/fx.js';

export const VEG_LEVELS = [
  {
    ...levelMeta('veg-1'), missions: 5,
    knowledge: 'nặng hơn, nhẹ hơn, nặng bằng',
    ask: (n) => `${cap(n.you)} cân giúp ${n.me} xem bên nào nặng hơn!`,
    desc: 'Đặt hai món lên hai đĩa cân. Bên nào thấp hơn thì bên đó nặng hơn. Cân thăng bằng là nặng bằng nhau.',
  },
];

const PAN = 132; // bề rộng đống rau củ trên đĩa cân (đĩa rộng 144)
const ANS = ['lighter', 'heavier', 'equal']; // thứ tự ba câu như trong vở: nhẹ hơn, nặng hơn, nặng bằng
const WORD = { lighter: 'nhẹ hơn', heavier: 'nặng hơn', equal: 'nặng bằng' };

// ── Sinh nhiệm vụ ───────────────────────────────────────────────────────────────────────────────
// Mọi cặp nhóm (loại, số củ) khác loại nhau, chia 3 kiểu:
//   equal:  nặng bằng nhau (cân thăng bằng);
//   tricky: bên nặng hơn lại trông nhỏ hơn hẳn (bó rau muống to mà nhẹ…);
//   normal: lệch rõ (gấp rưỡi trở lên), bên nặng trông cũng to hơn hoặc ngang.
const weight = (s) => VEG[s.id].g * s.n;
const PAIRS = (() => {
  const groups = Object.keys(VEG).flatMap(id => Array.from({ length: VEG[id].max }, (_, i) => ({ id, n: i + 1 })));
  const out = { equal: [], tricky: [], normal: [] };
  groups.forEach((a, i) => groups.slice(i + 1).forEach(b => {
    if (a.id === b.id) return;
    const wa = weight(a), wb = weight(b);
    if (wa === wb) return out.equal.push([a, b]);
    const [hi, lo] = wa > wb ? [a, b] : [b, a];
    const lookHi = vegLooks(hi.id, hi.n), lookLo = vegLooks(lo.id, lo.n);
    if (lookHi < lookLo * 0.8) out.tricky.push([a, b]);
    else if (weight(hi) >= weight(lo) * 1.5 && lookHi >= lookLo * 0.9) out.normal.push([a, b]);
  }));
  return out;
})();

function shuffle(rng, arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = rng.int(0, i); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

export const VEG_GAME = {
  ...stallMeta('veg'),
  unitWord: 'khách',
  starPrefix: 'g2games',
  levels: VEG_LEVELS,
  stallIcon: () => vegIcon('bi', 56),
  summaryText: (ok, total) => `Em đã cân đúng cho <strong>${ok}/${total}</strong> khách.`,

  howTo() {
    return [
      { pic: vegIcon('bapcai', 44), label: 'Đặt lên cân' },
      { pic: '⚖️', label: 'Nhìn cân' },
      { pic: '👆', label: 'Chọn câu đúng' },
      { pic: '😊', label: 'Khách vui' },
    ];
  },

  makeMission(rng, level, history) {
    // 5 lượt: lượt đầu dễ (lệch rõ), sau đó có một lượt nặng bằng và một lượt "to mà nhẹ", xếp ngẫu nhiên.
    const plan = history[0]?.plan || ['normal', ...shuffle(rng, ['normal', 'normal', 'equal', 'tricky'])];
    const kind = plan[history.length % plan.length];
    const prev = history[history.length - 1];
    const used = new Set(prev ? [prev.L.id, prev.R.id] : []);
    const seen = new Set(history.map(h => [h.L, h.R].map(s => s.id + s.n).sort().join()));
    const key = ([a, b]) => [a, b].map(s => s.id + s.n).sort().join();
    let pool = PAIRS[kind].filter(p => !seen.has(key(p)) && !p.some(s => used.has(s.id)));
    if (!pool.length) pool = PAIRS[kind].filter(p => !seen.has(key(p)));
    const pair = shuffle(rng, rng.pick(pool));
    const [L, R] = pair;
    const subj = rng.pick(['L', 'R']);
    const [S, O] = subj === 'L' ? [L, R] : [R, L];
    const ans = weight(S) === weight(O) ? 'equal' : weight(S) > weight(O) ? 'heavier' : 'lighter';
    const recentNpcs = history.slice(-3).map(m => m.npc.id);
    const npc = rng.pick(NPCS.filter(n => !recentNpcs.includes(n.id)));
    return { plan, kind, L, R, subj, ans, npc };
  },

  mountMission(stage, m, level, api) {
    injectVegStyles();
    if (import.meta.env.DEV) window.__g2veg = m;
    const n = m.npc;
    const lab = { '-1': vegLabel(m.L.id, m.L.n), 1: vegLabel(m.R.id, m.R.n) };
    const grp = { '-1': m.L, 1: m.R };
    const heaps = { '-1': vegHeap(m.L.id, m.L.n, PAN), 1: vegHeap(m.R.id, m.R.n, PAN) };
    const [S, O] = m.subj === 'L' ? [lab[-1], lab[1]] : [lab[1], lab[-1]];
    const sentence = (a) => `${cap(S)} ${WORD[a]} ${O}.`;
    // Hai khay vẽ cùng một tỉ lệ (--u, styles.js): củ to trông to, củ nhỏ trông nhỏ, như lúc nằm trên cân.
    const vb = (b) => `${b.x.toFixed(1)} ${b.y.toFixed(1)} ${b.w.toFixed(1)} ${b.h.toFixed(1)}`;

    const { counter, speak, fail } = mountStall(stage, {
      npc: n, api, theme: 'veg', cameo: false, // chỗ đúng / sai nằm trên cân: khách không nhảy xuống đứng che cân
      sign: `${vegIcon('bapcai', 30)}<span><strong>Quầy rau củ</strong><br>Cân xem bên nào nặng hơn</span>`,
      counter: `
        <div class="g3f-scale-host"></div>
        <div class="g2v-dock g2v-dock-hint" style="--hmax:${Math.max(heaps[-1].box.h, heaps[1].box.h).toFixed(1)};--wmax:${Math.max(heaps[-1].box.w, heaps[1].box.w).toFixed(1)}">
          ${[-1, 1].map(side => `
            <button type="button" class="g2v-tray" data-side="${side}" aria-label="Đặt ${lab[side]} lên đĩa cân bên ${side < 0 ? 'trái' : 'phải'}">
              <svg viewBox="${vb(heaps[side].box)}" style="--w:${heaps[side].box.w.toFixed(1)};--h:${heaps[side].box.h.toFixed(1)}" aria-hidden="true">${heaps[side].svg}</svg>
              <span class="g2v-tray-name">${cap(lab[side])}</span>
            </button>`).join('')}
        </div>
        <div class="g2v-choices" hidden>
          ${ANS.map((a, i) => `<button type="button" class="g2v-choice" data-a="${a}"><b>${'ABC'[i]}</b><span>${sentence(a)}</span></button>`).join('')}
        </div>`,
    });
    const scaleHost = counter.querySelector('.g3f-scale-host');
    const dock = counter.querySelector('.g2v-dock');
    const choices = counter.querySelector('.g2v-choices');
    const scale = mountScale(scaleHost, { tight: true });
    scale.setTilt(0, false);

    // Cân thật: có một bên thì nghiêng hết cỡ về bên đó; hai bên thì lệch nhiều nghiêng nhiều, bằng nhau thì thăng bằng.
    const on = { '-1': false, 1: false };
    const flying = new Set();
    const tilt = () => {
      const wl = on[-1] ? weight(grp[-1]) : 0, wr = on[1] ? weight(grp[1]) : 0;
      const d = wr - wl;
      scale.setTilt(d === 0 ? 0 : Math.sign(d) * Math.min(1, 0.55 + 0.45 * Math.abs(d) / Math.max(wl, wr)), false);
    };

    function place(side) {
      if (on[side] || flying.has(side)) return;
      const btn = dock.querySelector(`[data-side="${side}"]`);
      const pic = btn.querySelector('svg');
      const { box, svg } = heaps[side];
      flying.add(side);
      dock.classList.remove('g2v-dock-hint');
      sfx.tap();
      const from = pic.getBoundingClientRect();
      const to = svgBoxOnScreen(scale.load(side), box.x, box.y, box.w, box.h);
      btn.classList.add('g2v-tray-empty');
      btn.disabled = true;
      flyOne(`<svg viewBox="${vb(box)}" style="width:100%;height:100%;display:block">${svg}</svg>`, from, to, {
        minMs: 550, maxMs: 900, spin: side * 8,
        onLand: () => {
          flying.delete(side);
          on[side] = true;
          (side < 0 ? scale.setLeft : scale.setRightSvg)(svg);
          sfx.pop(side < 0 ? 2 : 4);
          tilt();
          if (on[-1] && on[1]) setTimeout(showChoices, 750); // chờ đòn cân nghiêng xong
          else {
            const other = side < 0 ? 1 : -1;
            dock.classList.add('g2v-dock-hint');
            speak(`Đặt tiếp ${lab[other]} lên cân!`, null, `👉 Đặt tiếp <b>${lab[other]}</b> lên cân!`);
          }
        },
      });
    }
    dock.addEventListener('click', (e) => {
      const b = e.target.closest('[data-side]');
      if (b) place(Number(b.dataset.side));
    });

    function showChoices() {
      dock.hidden = true;
      choices.hidden = false;
      counter.classList.add('g2v-asking');
      speak('Nhìn cân rồi chọn câu đúng!', null, '👉 Nhìn cân rồi chọn câu đúng!');
    }

    choices.addEventListener('click', (e) => {
      const b = e.target.closest('[data-a]');
      if (!b || choices.classList.contains('g2v-locked')) return;
      choices.classList.add('g2v-locked');
      const pick = b.dataset.a;
      choices.querySelector(`[data-a="${m.ans}"]`).classList.add('g2v-right');
      if (pick === m.ans) {
        sfx.tap();
        speak(`Đúng rồi! ${sentence(m.ans)}`, 'happy', `Đúng rồi ${n.you} ơi! 🎉`);
        const extra = m.kind === 'tricky' ? ' To chưa chắc đã nặng!' : m.kind === 'equal' ? ' Cân thăng bằng.' : '';
        api.succeed(`<b>${sentence(m.ans)}</b>${extra}`);
        return afterCard();
      }
      b.classList.add('g2v-wrong');
      const heavy = weight(m.L) > weight(m.R) ? -1 : 1;
      const tip = m.ans === 'equal'
        ? 'Đòn cân nằm ngang, kim chỉ giữa: hai bên nặng bằng nhau.'
        : `Đĩa bên ${lab[heavy]} thấp hơn nên ${lab[heavy]} nặng hơn.${m.kind === 'tricky' ? ' Món trông to chưa chắc đã nặng: nhìn cân.' : ''}`;
      fail(`Câu đúng là: <b>${sentence(m.ans)}</b>`, tip);
      afterCard();
    });

    /** Thẻ kết quả bật lên ở đáy quầy: cất ba câu (thẻ đã ghi câu đúng), thu cân lên phía trên thẻ để bé vẫn nhìn thấy cân. */
    function afterCard() {
      requestAnimationFrame(() => {
        const card = counter.parentElement.querySelector(':scope > .g3g-result');
        if (!card) return;
        choices.hidden = true;
        counter.style.paddingBottom = `${card.offsetHeight + 12}px`;
      });
    }

    speak(`${cap(n.you)} cân giúp ${n.me}: ${lab[-1]} và ${lab[1]}, bên nào nặng hơn?`, null,
      `<b>${cap(lab[-1])}</b> và <b>${lab[1]}</b>: bên nào nặng hơn?`);
  },
};
