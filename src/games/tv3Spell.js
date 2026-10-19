/**
 * 🔤 Luật chính tả (Tiếng Việt 3): mỗi cấp luyện một luật của rules.js (c/k, g/gh, ng/ngh: luật chắc chắn;
 * ch/tr, s/x, r/d/gi, l/n, dấu hỏi/ngã, iêu/ươu, iu/ưu, an/ang, song/xong: mẹo và từ cần nhớ).
 * Một bài = một từ có chỗ trống trên tờ vở. Em chạm nút chữ to ở vùng bàn phím, chữ bay vào chỗ trống.
 * Luật chắc chắn: chữ quyết định (i, e, ê sau chỗ trống) được gạch chân cam và thầy nói vì sao.
 * Sai: nút rung, thầy nhắc luật. Khung lớp học, thầy giáo, vòng chơi: grade3Drills/kit.js, grade3Games/loop.js.
 * Mở từ phần chữa bài Bài tập cuối tuần: ctx.open = { rule } → vào thẳng cấp của luật đó.
 * Mỗi cấp còn có 3 đề luyện 30 từ (📝, tv3SpellTest.js), mở từ màn giới thiệu cấp.
 */

import { renderGamesHub } from './grade3Games.js';
import { mountDrill, shake, setActive, calmMotion, fresh, sfx, sleep, how, TEACHER, INK, EDGE } from './grade3Drills/kit.js';
import { RULES, explainBlank, parseBlanks as parse } from './tiengViet3/rules.js';
import { renderSpellTest, testStatus } from './tv3SpellTest.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const plain = (html) => html.replace(/<[^>]*>/g, '');

const LV = (rule, n, desc, extra = {}) => {
  const r = RULES[rule];
  return {
    // luật không có quy luật (memo): nói thật ngay ở màn giới thiệu cấp
    id: `spell-${rule}`, n, title: r.title, rules: [rule], testKey: rule, missions: 8, desc: r.memo ? `Không có luật, luyện để nhớ mặt chữ. ${desc}` : desc, knowledge: plain(r.tips[0]),
    ask: () => plain(r.tips.join(' ')),
    ...extra,
  };
};

export const SPELL_LEVELS = [
  LV('ck', 1, 'Vd. kim cương, cánh cửa, kì nhông.'),
  LV('ggh', 2, 'Vd. ghế gỗ, gồ ghề, ghi nhớ.'),
  LV('ngngh', 3, 'Vd. nghỉ ngơi, nghe ngóng.'),
  {
    id: 'spell-front-mix', n: 4, title: 'Trộn c/k, g/gh, ng/ngh', rules: ['ck', 'ggh', 'ngngh'], testKey: 'front', missions: 9,
    desc: 'Ba luật cùng một ý: trước i, e, ê thì viết k, gh, ngh.', knowledge: 'k, gh, ngh đứng trước i, e, ê',
    ask: () => 'Trước i, e, ê thì viết k, gh, ngh. Còn lại viết c, g, ng!',
  },
  LV('chtr', 5, 'Vd. chăm chỉ, trung thực, chén bát.'),
  LV('sx', 6, 'Vd. sản xuất, xoè ô, sen hồng.'),
  LV('rdgi', 7, 'Vd. dây mơ rễ má, róc rách, giỏ hoa.'),
  LV('ln', 8, 'Vd. lấp lánh, nắn nót, nón lá.'),
  LV('hoinga', 9, 'Vd. vui vẻ, vội vã, mạnh mẽ.'),
  LV('ieuuou', 10, 'Vd. con hươu, cánh diều, chim khướu.'),
  LV('iuuu', 11, 'Vd. con cừu, cái rìu, quả lựu.'),
  LV('anang', 12, 'Vd. hòn than, bắc thang.'),
  LV('songxong', 13, 'Vd. song ca, xong việc.'),
];

export const SPELL_GAME = {
  id: 'spell3', icon: '🔤', title: 'Luật chính tả',
  purpose: 'Giúp em nhớ luật viết c/k, g/gh, ng/ngh và mẹo viết đúng s/x, ch/tr, r/d/gi, l/n, dấu hỏi, dấu ngã.',
  unitWord: 'từ', starPrefix: 'spell3', npcs: [TEACHER], levels: SPELL_LEVELS,
  stallIcon: () => '🔤',
  summaryText: (ok, total) => `Em viết đúng ngay <strong>${ok}/${total}</strong> từ.`,
  againText: 'Chơi lượt mới',
  howTo: how(['👀', 'Nhìn chữ sau chỗ trống'], ['👆', 'Chạm chữ đúng'], ['📏', 'Nhớ luật']),

  makeMission(rng, level, history) {
    const k = history.length;
    const rule = level.rules[k % level.rules.length];
    return fresh(history, () => ({ rule, item: rng.pick(RULES[rule].bank) }), (m) => m.item);
  },

  mountMission(stage, m, level, api) {
    injectSpellStyles();
    mountSpell(stage, m, api);
  },

  // 📝 Đề luyện 30 từ của cấp (tv3SpellTest.js): hub hiện hàng nút Đề 1, 2, 3 ở màn giới thiệu cấp.
  tests: (level) => (level.testKey ? testStatus(level.testKey) : null),
  openTest: (app, level, i, back) => renderSpellTest(app, { key: level.testKey, idx: i, title: level.title, onBack: back }),
};

function mountSpell(stage, m, api) {
  const rule = RULES[m.rule];
  const { segs, word } = parse(m.item, m.rule);
  const blanks = segs.filter(s => s.ans !== undefined);
  // mọi chỗ trống giữ sẵn bề rộng của lựa chọn dài nhất: điền xong không xô chữ
  const widest = (s) => Math.max(...s.opts.map(o => o.length));
  let bi = 0;
  const board = `
    <div class="sp">
      <div class="sp-rule">📏 ${rule.tips.join(' ')}</div>
      <div class="sp-word">${segs.map((s, k) => (s.ans === undefined
        ? `<span class="sp-t" data-seg="${k}">${esc(s.t).replace(/ /g, '&nbsp;')}</span>`
        : `<span class="sp-blank" data-b="${blanks.indexOf(s)}" style="--w:${widest(s)}"><span class="sp-fill"></span></span>`)).join('')}</div>
      <div class="sp-why">&nbsp;</div>
    </div>`;
  const padHtml = '<div class="sp-pad"></div>';
  const d = mountDrill(stage, { api, board, cls: 'sp-scene' });
  const padzone = d.scene.querySelector('.g3d-padzone');
  padzone.innerHTML = padHtml;
  const pad = padzone.querySelector('.sp-pad');
  const paper = d.paper;
  const why = paper.querySelector('.sp-why');
  let mistakes = 0;
  let tip = '';
  let busy = false;

  const nOpts = Math.max(...blanks.map(b => b.opts.length));
  pad.style.setProperty('--n', nOpts);

  function showPad() {
    const b = blanks[bi];
    // số nút cố định trong cả lượt (bằng số lựa chọn nhiều nhất) để bàn phím không đổi bố cục
    pad.innerHTML = b.opts.map(o => `<button type="button" class="sp-key" data-v="${esc(o)}">${esc(o)}</button>`).join('')
      + Array.from({ length: nOpts - b.opts.length }, () => '<span class="sp-key sp-key-ghost"></span>').join('');
    const longest = Math.max(...b.opts.map(o => o.length));
    pad.style.setProperty('--len', longest);
    setActive(paper, paper.querySelector(`[data-b="${bi}"]`));
  }

  const first = blanks[0];
  d.say(
    blanks.length > 1 ? `Điền chữ vào ${blanks.length} chỗ trống để được từ đúng.` : 'Chọn chữ đúng điền vào chỗ trống.',
    rule.tone ? 'Chọn tiếng viết đúng <b>dấu hỏi</b> hay <b>dấu ngã</b>.' : `Chọn <b>${first.opts.join('</b> hay <b>')}</b>?`,
  );
  showPad();

  pad.addEventListener('click', async (e) => {
    const btn = e.target.closest('button.sp-key');
    if (!btn || busy) return;
    const b = blanks[bi];
    const v = btn.dataset.v;
    const box = paper.querySelector(`[data-b="${bi}"]`);
    const reason = explainBlank(m.rule, { ans: b.ans, after: b.after, word: word.trim() });
    const specific = rule.explain?.(b.after, b.ans, word.trim()); // lý do riêng của từ này (luật chắc chắn, mẹo từ láy, vần…)
    if (v !== b.ans) {
      mistakes++;
      shake(btn);
      const hint = specific ? specific.charAt(0).toUpperCase() + specific.slice(1) : rule.tips.join(' ');
      tip ||= plain(hint);
      d.hint(plain(hint), hint);
      cue(b, true);
      return;
    }
    busy = true;
    sfx.tap();
    const fill = box.querySelector('.sp-fill');
    await flyLetter(v, btn, box);
    fill.textContent = v;
    box.classList.add('is-ok', 'is-land');
    sfx.pop?.(2);
    cue(b, false);
    why.innerHTML = reason.includes(`<b>${word.trim()}</b>`) ? reason.charAt(0).toUpperCase() + reason.slice(1) : `<b>${esc(word.trim())}</b>: ${reason}`;
    why.classList.add('is-on');
    bi++;
    if (bi < blanks.length) { await sleep(500); busy = false; showPad(); return; }
    setActive(paper, null);
    pad.querySelectorAll('.sp-key').forEach(k => { k.disabled = true; });
    await sleep(600);
    d.done(mistakes, { ok: `Từ đúng là "${word.trim()}".`, tip });
  });

  /** Gạch chân chữ quyết định ngay sau chỗ trống (luật chắc chắn: i, e, ê). */
  function cue(b, warn) {
    if (!rule.sure) return;
    const k = segs.indexOf(b);
    const next = paper.querySelector(`[data-seg="${k + 1}"]`);
    if (!next || next.querySelector('.sp-cue')) { next?.querySelector('.sp-cue')?.classList.toggle('is-warn', warn); return; }
    const t = segs[k + 1].t;
    next.innerHTML = `<u class="sp-cue${warn ? ' is-warn' : ''}">${esc(t[0])}</u>${esc(t.slice(1)).replace(/ /g, '&nbsp;')}`;
  }

  if (import.meta.env.DEV) {
    window.__g3drill = {
      m,
      step: () => blanks[bi] && pad.querySelector(`[data-v="${CSS.escape(blanks[bi].ans)}"]`)?.click(),
      wrong: () => [...pad.querySelectorAll('button.sp-key')].find(k => k.dataset.v !== blanks[bi].ans)?.click(),
    };
  }
}

/**
 * Chữ bay từ nút vào chỗ trống: bật ra, phóng to dần và vồng lên, tới rất gần ô thì thu nhỏ
 * đúng cỡ chữ trong từ rồi đáp vào ô. Máy tắt hiệu ứng: bay chậm hơn, phóng ít hơn (không bỏ hiệu ứng).
 */
function flyLetter(text, btn, box) {
  const from = btn.getBoundingClientRect();
  const to = box.getBoundingClientRect();
  const startFs = parseFloat(getComputedStyle(btn).fontSize);
  const endFs = parseFloat(getComputedStyle(box).fontSize);
  const el = document.createElement('div');
  el.className = 'sp-fly';
  el.textContent = text;
  Object.assign(el.style, { left: `${from.left + from.width / 2}px`, top: `${from.top + from.height / 2}px`, fontSize: `${startFs}px` });
  document.body.appendChild(el);
  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);
  const end = endFs / startFs;
  const calm = calmMotion();
  const peak = calm ? 1.3 : 1.75;
  const lift = Math.min(160, Math.hypot(dx, dy) * 0.25);
  const at = (k, sc, up = 0) => ({ transform: `translate(-50%, -50%) translate(${dx * k}px, ${dy * k - up}px) scale(${sc})` });
  const anim = el.animate([
    { ...at(0, 1), offset: 0 },
    { ...at(0.3, peak, lift), offset: 0.35 },   // phóng to nhất, vồng lên
    { ...at(0.8, peak * 0.9, lift * 0.4), offset: 0.7 },
    { ...at(0.96, end * 1.15), offset: 0.9 },   // rất gần ô: thu nhỏ nhanh về cỡ chữ
    { ...at(1, end), offset: 1 },
  ], { duration: calm ? 1300 : 950, easing: 'cubic-bezier(0.35, 0.1, 0.35, 1)', fill: 'forwards' });
  return anim.finished.catch(() => {}).then(() => el.remove());
}

let spellStyles = false;
function injectSpellStyles() {
  if (spellStyles) return;
  spellStyles = true;
  const st = document.createElement('style');
  st.textContent = `
    .sp-scene .g3d-paper { container-type: size; }
    .sp { height: 100%; box-sizing: border-box; display: grid; grid-template-rows: auto minmax(0, 1fr) auto; gap: 2cqh; padding: 4cqh 4cqi; }
    .sp-rule { justify-self: center; max-width: 100%; box-sizing: border-box; padding: 1.2cqh 3cqi; border-radius: 999px; background: #FFF7ED;
      border: 2px solid #FDBA74; color: #9A3412; font-weight: 700; font-size: min(5cqh, 3.6cqi, 1.3rem); text-align: center; }
    .sp-word { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; align-content: center;
      font-family: 'Baloo 2', 'Quicksand', sans-serif; font-weight: 700; color: ${INK}; font-size: min(22cqh, 13cqi); line-height: 1.25; }
    .sp-blank { display: inline-flex; align-items: center; justify-content: center; min-width: calc(var(--w) * 0.62em + 0.3em); height: 1.15em;
      margin: 0 0.04em; border-radius: 0.14em; border: 0.05em dashed #94A3B8; background: #F8FAFC; box-sizing: border-box; }
    .sp-blank.g3d-on { border-color: #2563EB; background: #EFF6FF; animation: sp-blink 1.2s ease-in-out infinite; }
    .sp-blank.is-ok { border-style: solid; border-color: #16A34A; background: #DCFCE7; color: #15803D; animation: none; }
    @keyframes sp-blink { 50% { box-shadow: 0 0 0 0.08em #BFDBFE; } }
    .sp-cue { text-decoration: underline 0.07em #F59E0B; text-underline-offset: 0.1em; color: #B45309; }
    .sp-cue.is-warn { text-decoration-color: #DC2626; color: #DC2626; animation: sp-cue 0.5s 2; }
    @keyframes sp-cue { 50% { opacity: 0.4; } }
    .sp-why { justify-self: center; text-align: center; font-size: min(5.2cqh, 3.8cqi, 1.35rem); font-weight: 600; color: #166534; min-height: 2.6em;
      visibility: hidden; }
    .sp-why.is-on { visibility: visible; }
    .sp-why b { color: #15803D; }
    .sp-fly { position: fixed; z-index: 1000; pointer-events: none; line-height: 1; font-family: 'Baloo 2', 'Quicksand', sans-serif; font-weight: 800;
      color: #15803D; transform: translate(-50%, -50%); will-change: transform;
      text-shadow: 0 0 0.06em #fff, 0.04em 0.04em 0 #fff, -0.04em -0.04em 0 #fff, 0.04em -0.04em 0 #fff, -0.04em 0.04em 0 #fff, 0 0.08em 0.12em rgba(0,0,0,0.25); }
    .sp-blank.is-land { animation: sp-land 0.35s ease-out; }
    @keyframes sp-land { 0% { transform: scale(1.18); } 60% { transform: scale(0.94); } 100% { transform: scale(1); } }

    .sp-pad { height: 100%; box-sizing: border-box; display: grid; grid-template-columns: repeat(var(--n), minmax(0, 1fr)); gap: min(4cqh, 3cqi);
      padding: min(4cqh, 3cqi); background: #334155; border-radius: 1.1rem; }
    @container (aspect-ratio < 1.1) { .sp-pad { grid-template-columns: 1fr; grid-template-rows: repeat(var(--n), minmax(0, 1fr)); } }
    .g3g-has-result .sp-pad { visibility: hidden; }
    .sp-key { border: none; border-radius: 0.9rem; background: #FFFBEB; color: #44403C; font-family: 'Baloo 2', 'Quicksand', sans-serif; font-weight: 800;
      line-height: 1; cursor: pointer; padding: 0; min-width: 0; min-height: 0; touch-action: manipulation; box-shadow: 0 6px 0 #D6A15B;
      font-size: min(34cqh, calc(70cqi / var(--n) / max(1.2, var(--len) * 0.62)), 6rem); }
    @container (aspect-ratio < 1.1) { .sp-key { font-size: min(calc(60cqh / var(--n)), calc(80cqi / max(1.2, var(--len) * 0.62)), 6rem); } }
    .sp-key:active { transform: translateY(4px); box-shadow: 0 2px 0 #D6A15B; }
    .sp-key:disabled { cursor: default; opacity: 0.6; }
    .sp-key-ghost { visibility: hidden; }
  `;
  document.head.appendChild(st);
}
void EDGE;

const TOOL = { id: 'spell', icon: SPELL_GAME.icon, title: SPELL_GAME.title, desc: 'Chơi để nhớ luật viết đúng chính tả.', tags: ['c/k', 'g/gh', 'ng/ngh', 's/x', 'hỏi/ngã'], single: true, stalls: [{ game: SPELL_GAME }] };

export function render(app, onBack, ctx = {}) {
  app.setAttribute('data-no-i18n', '');
  const rule = ctx.open?.rule;
  const level = rule && SPELL_LEVELS.find(l => l.rules.length === 1 && l.rules[0] === rule);
  renderGamesHub(app, {
    book: 'tv3', units: [], unitName: () => '', storageKey: 'tv3spell-v1', openUnit() {}, onBack,
  }, level ? { stall: SPELL_GAME.id, level: level.id } : null, {
    games: [TOOL], kicker: '📚 Tiếng Việt 3', title: 'Luật chính tả', icon: '🔤', unitFocus: null,
    lead: 'Mỗi cấp một luật. Mỗi lượt là từ mới!',
    levelLead: 'Chọn luật muốn luyện.',
  });
}
