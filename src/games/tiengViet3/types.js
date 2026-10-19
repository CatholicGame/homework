/**
 * Các dạng câu của Bài tập cuối tuần Tiếng Việt 3. Mỗi dạng:
 *   empty(q) · answered(q, a) · grade(q, a) → { score 0..1, full } (dạng không chấm: graded = false)
 *   mount(el, q, { a, set, mode })  mode 'do' (bé làm) | 'show' (bài của bé, đánh dấu đúng sai) | 'key' (đáp án)
 *   explain(q, a) → HTML lời giải thích cho phần chữa bài (ngoài q.why).
 */

import { RULES, blankOptions, explainBlank, WORD_KINDS } from './rules.js';
import { mountUnderline, gradeUnderline, underlineAnswered, expectedMarks } from './underline.js';
import { picSvg } from './pics.js';

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const LETTERS = 'ABCDEFGH';
/** So sánh chữ bé gõ: bỏ hoa thường, khoảng trắng thừa, dấu câu ở hai đầu. */
export const norm = (s) => String(s ?? '').normalize('NFC').toLowerCase().replace(/\s+/g, ' ').trim().replace(/^[\s.,!?;:…"“”'-]+|[\s.,!?;:…"“”'-]+$/g, '');
const mark = (ok) => `<span class="tv-mk ${ok ? 'is-ok' : 'is-no'}">${ok ? '✓' : '✗'}</span>`;

// ── Chọn đáp án (một hoặc nhiều ý); layout 'cells' = ô để tô màu / khoanh ──
const choice = {
  empty: (q) => (Array.isArray(q.ans) ? [] : null),
  answered: (q, a) => (Array.isArray(q.ans) ? a?.length > 0 : a !== null && a !== undefined),
  grade(q, a) {
    if (!Array.isArray(q.ans)) return { score: a === q.ans ? 1 : 0, full: a === q.ans };
    const want = new Set(q.ans);
    const got = new Set(a || []);
    const hit = [...got].filter(x => want.has(x)).length;
    const wrong = got.size - hit;
    const full = hit === want.size && wrong === 0;
    return { score: full ? 1 : Math.max(0, (hit - wrong) / want.size), full };
  },
  mount(el, q, { a, set, mode }) {
    const multi = Array.isArray(q.ans);
    const cells = q.layout === 'cells';
    const isSel = (k) => (multi ? (a || []).includes(k) : a === k);
    const isAns = (k) => (multi ? q.ans.includes(k) : q.ans === k);
    el.innerHTML = `
      ${multi && mode === 'do' && !cells ? '<p class="tv-note">Có thể chọn nhiều ý.</p>' : ''}
      <div class="tvc${cells ? ' is-cells' : ''}${q.mark === 'color' ? ' is-color' : ''}">
        ${q.opts.map((o, k) => {
          const sel = mode === 'key' ? isAns(k) : isSel(k);
          let cls = sel ? ' is-sel' : '';
          if (mode === 'show') cls += isAns(k) ? ' is-right' : sel ? ' is-wrong' : '';
          if (mode === 'key' && isAns(k)) cls += ' is-right';
          return `<button type="button" class="tvc-opt${cls}" data-k="${k}" ${mode === 'do' ? '' : 'disabled'}>
            ${cells ? '' : `<span class="tvc-letter">${q.letters?.[k] || LETTERS[k]}</span>`}<span class="tvc-text">${esc(o)}</span>
            ${mode === 'show' && sel ? mark(isAns(k)) : ''}${mode === 'show' && !sel && isAns(k) ? '<span class="tvc-tag">Đáp án đúng</span>' : ''}
          </button>`;
        }).join('')}
      </div>`;
    if (mode !== 'do') return;
    el.querySelectorAll('.tvc-opt').forEach(btn => btn.addEventListener('click', () => {
      const k = Number(btn.dataset.k);
      if (multi) { const s = new Set(a || []); s.has(k) ? s.delete(k) : s.add(k); a = [...s].sort(); } else a = k;
      set(a);
      choice.mount(el, q, { a, set, mode });
    }));
  },
  explain(q) {
    const right = (Array.isArray(q.ans) ? q.ans : [q.ans]).map(k => `${q.layout === 'cells' ? '' : `${LETTERS[k]}. `}${esc(q.opts[k])}`);
    return `<p class="tv-key">Đáp án đúng: <b>${right.join('</b>; <b>')}</b></p>`;
  },
};

// ── Điền chính tả: '[k]im [c]ương'; '[ans/khác/khác]' = lựa chọn riêng ──
function parseSpell(item) {
  const segs = [];
  let at = 0;
  const re = /\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(item))) {
    if (m.index > at) segs.push({ t: item.slice(at, m.index) });
    const [ans, ...alts] = m[1].split('/');
    segs.push({ ans, alts });
    at = m.index + m[0].length;
  }
  if (at < item.length) segs.push({ t: item.slice(at) });
  // chữ ngay sau chỗ trống (để giải thích luật) và cả từ đã điền
  const word = segs.map(s => s.t ?? s.ans).join('');
  segs.forEach((s, k) => {
    if (s.ans === undefined) return;
    s.after = segs.slice(k + 1).map(x => x.t ?? x.ans).join('').split(/\s/)[0];
    s.word = word.trim();
    // tiếng chứa chỗ trống (để tra q.notes theo từng tiếng)
    const before = segs.slice(0, k).map(x => x.t ?? x.ans).join('').split(/\s/).pop();
    s.syl = (before + s.ans + s.after).replace(/[.,!?;:…"“”]/g, '');
  });
  return segs;
}
const spellBlanks = (q) => q.items.flatMap(parseSpell).filter(s => s.ans !== undefined);

const spell = {
  empty: (q) => spellBlanks(q).map(() => null),
  answered: (q, a) => spellBlanks(q).every((_, k) => a?.[k]),
  grade(q, a) {
    const bl = spellBlanks(q);
    const ok = bl.map((s, k) => a?.[k] === s.ans);
    const good = ok.filter(Boolean).length;
    return { score: good / bl.length, full: good === bl.length, items: ok };
  },
  mount(el, q, { a, set, mode }) {
    let n = 0;
    const cards = q.items.map(item => {
      const segs = parseSpell(item);
      const sure = RULES[q.rule]?.sure && mode !== 'do';
      const html = segs.map((s, si) => {
        if (s.ans === undefined) {
          // chữ quyết định (ngay sau chỗ trống) được gạch dưới để thấy vì sao viết k / gh / ngh
          if (sure && segs[si - 1]?.ans !== undefined && s.t) return `<span class="tvs-t"><u class="tvs-cue">${esc(s.t[0])}</u>${esc(s.t.slice(1))}</span>`;
          return `<span class="tvs-t">${esc(s.t)}</span>`;
        }
        const k = n++;
        const opts = blankOptions(q.rule, s.ans, s.alts);
        const got = mode === 'key' ? s.ans : a?.[k];
        if (mode !== 'do') {
          const right = mode === 'key' || got === s.ans;
          return `<span class="tvs-fill ${right ? 'is-right' : 'is-wrong'}">${!right && got ? `<s class="tvs-was">${esc(got)}</s>` : ''}${esc(s.ans)}</span>`;
        }
        return `<span class="tvs-blank${got ? ' is-done' : ''}">${opts.map(o => `<button type="button" class="tvs-opt${got === o ? ' is-on' : ''}" data-k="${k}" data-v="${esc(o)}">${esc(o)}</button>`).join('')}</span>`;
      }).join('');
      // mỗi từ không bị ngắt giữa chừng, cụm dài thì xuống dòng giữa các từ
      return `<div class="tvs-item"><span class="tvs-word">${html.replace(/<span class="tvs-t">([^<]*)<\/span>/g, (m0, t) => `<span class="tvs-t">${t.replace(/ /g, '</span></span> <span class="tvs-word"><span class="tvs-t">')}</span>`)}</span></div>`;
    });
    // lựa chọn dài (ng/ngh, cả tiếng như nghỉ/nghĩ) cần ô rộng hơn để hai từ nằm trên một dòng
    const wide = RULES[q.rule]?.variants || spellBlanks(q).some(b => blankOptions(q.rule, b.ans, b.alts).some(o => o.length > 1));
    el.innerHTML = `<div class="tvs${wide ? ' is-wide' : ''}">${cards.join('')}</div>`;
    if (mode !== 'do') return;
    el.querySelectorAll('.tvs-opt').forEach(btn => btn.addEventListener('click', () => {
      a = [...(a || [])];
      a[Number(btn.dataset.k)] = btn.dataset.v;
      set(a);
      const blank = btn.closest('.tvs-blank');
      blank.classList.add('is-done');
      blank.querySelectorAll('.tvs-opt').forEach(b => b.classList.toggle('is-on', b === btn));
    }));
  },
  explain(q, a) {
    const r = RULES[q.rule];
    if (!r && !q.notes) return ''; // điền dấu câu…: lời giải thích nằm ở q.why
    let k = 0;
    const rows = q.items.map(item => {
      const bl = parseSpell(item).filter(s => s.ans !== undefined);
      const parts = bl.map(s => {
        const ok = a?.[k++] === s.ans;
        return { ok, why: explainBlank(q.rule, { ans: s.ans, after: s.after, word: s.word, note: q.notes?.[s.syl] ?? q.notes?.[s.word] }) };
      });
      const allOk = parts.every(p => p.ok);
      return `<li class="${allOk ? 'is-ok' : 'is-no'}">${mark(allOk)} <b>${esc(bl[0]?.word || '')}</b>: ${parts.map(p => p.why.replace(/\.$/, '')).join('; ')}.</li>`;
    });
    return `
      ${r ? `<div class="tv-rule"><div class="tv-rule-h">📏 ${r.sure ? 'Quy luật' : 'Mẹo nhớ'}: ${esc(r.title)}</div><p>${r.rule}</p>
        <button type="button" class="btn tv-play" data-rule="${r.id}">🎮 Chơi luyện luật này</button></div>` : ''}
      <ul class="tv-why-list">${rows.join('')}</ul>`;
  },
};

// ── Xếp từ vào nhóm: q.words, q.groups [{label, kind?, words:[…]}] ──
const sort = {
  empty: () => ({}),
  answered: (q, a) => q.words.every(w => a?.[w] !== undefined),
  grade(q, a) {
    const ok = q.words.map(w => q.groups[a?.[w]]?.words.includes(w));
    const good = ok.filter(Boolean).length;
    return { score: good / q.words.length, full: good === q.words.length, items: ok };
  },
  mount(el, q, { a, set, mode }) {
    a = { ...(a || {}) };
    const right = (w) => q.groups.findIndex(g => g.words.includes(w));
    const where = (w) => (mode === 'key' ? right(w) : a[w]);
    let picked = null;
    const chip = (w) => {
      let cls = '';
      if (mode === 'show') cls = a[w] === right(w) ? ' is-right' : ' is-wrong';
      if (mode === 'key') cls = ' is-right';
      return `<button type="button" class="tvg-chip${cls}" data-w="${esc(w)}" ${mode === 'do' ? '' : 'disabled'}>${esc(w)}</button>`;
    };
    const draw = () => {
      const pool = q.words.filter(w => where(w) === undefined || where(w) === null);
      el.innerHTML = `
        ${mode === 'do' ? `<div class="tvg-pool${pool.length ? '' : ' is-empty'}" data-g="-1">${pool.map(chip).join('') || '<span class="tv-note">Đã xếp hết. Chạm một từ để đổi nhóm.</span>'}</div>` : ''}
        <div class="tvg-groups" style="--n:${q.groups.length}">
          ${q.groups.map((g, gi) => `
            <div class="tvg-box" data-g="${gi}">
              <div class="tvg-label">${esc(g.label)}</div>
              <div class="tvg-in">${q.words.filter(w => where(w) === gi).map(chip).join('')}</div>
            </div>`).join('')}
        </div>
        ${mode === 'show' ? missingHtml() : ''}`;
      if (mode !== 'do') return;
      el.querySelectorAll('.tvg-chip').forEach(c => c.addEventListener('click', (e) => {
        e.stopPropagation();
        picked = picked === c.dataset.w ? null : c.dataset.w;
        el.querySelectorAll('.tvg-chip').forEach(x => x.classList.toggle('is-picked', x.dataset.w === picked));
        el.classList.toggle('is-picking', !!picked);
      }));
      el.querySelectorAll('.tvg-box, .tvg-pool').forEach(box => box.addEventListener('click', () => {
        if (!picked) return;
        const gi = Number(box.dataset.g);
        if (gi < 0) delete a[picked]; else a[picked] = gi;
        picked = null;
        el.classList.remove('is-picking');
        set({ ...a });
        draw();
      }));
    };
    const missingHtml = () => {
      const miss = q.words.filter(w => a[w] === undefined);
      return miss.length ? `<p class="tv-note">Em chưa xếp: ${miss.map(esc).join(', ')}</p>` : '';
    };
    draw();
  },
  explain(q) {
    return `<ul class="tv-why-list">${q.groups.map(g => {
      const k = WORD_KINDS[g.kind];
      return `<li><b>${esc(g.label)}</b>${k ? ` (${k.def}; hỏi: ${k.ask})` : ''}: ${g.words.map(esc).join(', ')}</li>`;
    }).join('')}</ul>`;
  },
};

// ── Nối cột A với cột B: q.left, q.right, q.ans[i] = chỉ số bên phải nối với left[i] ──
const PAIR_COLORS = ['#2563EB', '#16A34A', '#EA580C', '#9333EA', '#DB2777', '#0891B2', '#CA8A04', '#4F46E5'];
const match = {
  empty: (q) => q.left.map(() => null),
  answered: (q, a) => q.left.every((_, i) => a?.[i] !== null && a?.[i] !== undefined),
  grade(q, a) {
    const ok = q.left.map((_, i) => a?.[i] === q.ans[i]);
    const good = ok.filter(Boolean).length;
    return { score: good / ok.length, full: good === ok.length, items: ok };
  },
  mount(el, q, { a, set, mode }) {
    a = [...(a || q.left.map(() => null))];
    let pick = null;
    const pairOf = (j) => (mode === 'key' ? q.ans : a).indexOf(j);
    const draw = () => {
      const src = mode === 'key' ? q.ans : a;
      el.innerHTML = `
        <div class="tvm">
          <div class="tvm-col">${q.left.map((t, i) => {
            const j = src[i];
            let cls = j !== null && j !== undefined ? ' is-paired' : '';
            if (pick === i) cls += ' is-picked';
            if (mode === 'show') cls += a[i] === q.ans[i] ? ' is-right' : ' is-wrong';
            return `<button type="button" class="tvm-item" data-side="l" data-i="${i}" style="--c:${PAIR_COLORS[i % 8]}" ${mode === 'do' ? '' : 'disabled'}>
              <span>${esc(t)}</span>${j !== null && j !== undefined ? `<b class="tvm-tag">${i + 1}</b>` : ''}</button>`;
          }).join('')}</div>
          <div class="tvm-col">${q.right.map((t, j) => {
            const i = pairOf(j);
            return `<button type="button" class="tvm-item${i >= 0 ? ' is-paired' : ''}" data-side="r" data-j="${j}" style="--c:${i >= 0 ? PAIR_COLORS[i % 8] : '#CBD5E1'}" ${mode === 'do' ? '' : 'disabled'}>
              ${i >= 0 ? `<b class="tvm-tag">${i + 1}</b>` : ''}<span>${esc(t)}</span></button>`;
          }).join('')}</div>
        </div>
        ${mode === 'show' ? `<p class="tv-note">Nối đúng: ${q.left.map((t, i) => `${esc(t)} → ${esc(q.right[q.ans[i]])}`).join('; ')}</p>` : ''}`;
      if (mode !== 'do') return;
      el.querySelectorAll('.tvm-item').forEach(btn => btn.addEventListener('click', () => {
        if (btn.dataset.side === 'l') { pick = pick === Number(btn.dataset.i) ? null : Number(btn.dataset.i); draw(); return; }
        if (pick === null) { el.querySelector('.tvm').classList.add('is-nudge'); return; }
        const j = Number(btn.dataset.j);
        a = a.map(x => (x === j ? null : x));
        a[pick] = j;
        pick = null;
        set([...a]);
        draw();
      }));
    };
    draw();
  },
  explain(q) {
    return `<ul class="tv-why-list">${q.left.map((t, i) => `<li><b>${esc(t)}</b> → ${esc(q.right[q.ans[i]])}</li>`).join('')}</ul>`;
  },
};

// ── Điền vào chỗ chấm: 'Đây là {cô giáo|cô}.' · '{*mẫu}' = viết tự do (không chấm) ──
function parseFill(t) {
  const segs = [];
  let at = 0;
  const re = /\{([^}]*)\}/g;
  let m;
  while ((m = re.exec(t))) {
    if (m.index > at) segs.push({ t: t.slice(at, m.index) });
    const free = m[1].startsWith('*');
    const alts = (free ? m[1].slice(1) : m[1]).split('|');
    segs.push({ alts, free });
    at = m.index + m[0].length;
  }
  if (at < t.length) segs.push({ t: t.slice(at) });
  return segs;
}
const fillBlanks = (q) => q.items.flatMap(it => parseFill(it.t)).filter(s => s.alts);
const fill = {
  empty: (q) => fillBlanks(q).map(() => ''),
  answered: (q, a) => fillBlanks(q).every((s, k) => s.free || (a?.[k] || '').trim()),
  grade(q, a) {
    const bl = fillBlanks(q).map((s, k) => ({ s, k })).filter(x => !x.s.free);
    const ok = bl.map(({ s, k }) => s.alts.some(x => norm(x) === norm(a?.[k])));
    const good = ok.filter(Boolean).length;
    return { score: bl.length ? good / bl.length : 1, full: good === bl.length, items: ok };
  },
  mount(el, q, { a, set, mode }) {
    a = [...(a || [])];
    let n = 0;
    const grid = q.items.length > 2 && q.items.every(it => it.pic); // nhiều tranh: xếp lưới cho đỡ dài
    el.innerHTML = `<div class="tvf${grid ? ' is-grid' : ''}">${q.items.map(it => `
      <div class="tvf-item">
        ${it.pic ? `<div class="tv-pic">${picSvg(it.pic)}</div>` : ''}
        <div class="tvf-line">${parseFill(it.t).map(s => {
          if (!s.alts) return esc(s.t);
          const k = n++;
          const size = Math.max(6, ...s.alts.map(x => x.length)) + 2;
          if (mode === 'do') return `<input class="tvf-in" data-k="${k}" value="${esc(a[k] || '')}" style="--w:${size}ch" autocomplete="off" autocapitalize="off" spellcheck="false">`;
          if (mode === 'key') return `<span class="tvf-fill is-right">${esc(s.alts[0])}</span>`;
          const ok = s.free ? (a[k] || '').trim() !== '' : s.alts.some(x => norm(x) === norm(a[k]));
          return `<span class="tvf-fill ${s.free ? 'is-free' : ok ? 'is-right' : 'is-wrong'}">${esc(a[k] || '…')}</span>${!s.free && !ok ? `<span class="tvs-fix">${esc(s.alts[0])}</span>` : ''}`;
        }).join('')}</div>
      </div>`).join('')}</div>`;
    if (mode !== 'do') return;
    el.querySelectorAll('.tvf-in').forEach(inp => inp.addEventListener('input', () => {
      a[Number(inp.dataset.k)] = inp.value;
      set([...a]);
    }));
  },
  explain(q) {
    const bl = fillBlanks(q);
    const free = bl.filter(s => s.free).map(s => s.alts[0]);
    const graded = bl.filter(s => !s.free);
    return `${graded.length ? `<p class="tv-key">Đáp án: <b>${graded.map(s => esc(s.alts.join(' / '))).join('</b>; <b>')}</b></p>` : ''}
      ${free.length ? `<p class="tv-key">Phần tự viết, ví dụ: <i>${free.map(esc).join('; ')}</i></p>` : ''}`;
  },
};

// ── Điền dấu câu vào chỗ thích hợp: 'Mẹ mua nhiều thứ^ bút, vở.' (^ = chỗ đúng) ──
function parsePunct(s) {
  const words = s.split(/\s+/).filter(Boolean);
  const ans = [];
  const clean = words.map((w, k) => { if (w.endsWith('^')) { ans.push(k); return w.slice(0, -1); } return w; });
  return { words: clean, ans };
}
const punct = {
  empty: (q) => q.items.map(() => []),
  answered: (q, a) => (a || []).some(x => x?.length),
  grade(q, a) {
    const ok = q.items.map((s, i) => {
      const { ans } = parsePunct(s);
      const got = [...(a?.[i] || [])].sort((x, y) => x - y);
      return got.length === ans.length && got.every((x, k) => x === ans[k]);
    });
    const good = ok.filter(Boolean).length;
    return { score: good / ok.length, full: good === ok.length, items: ok };
  },
  mount(el, q, { a, set, mode }) {
    a = (a || q.items.map(() => [])).map(x => [...(x || [])]);
    const sign = q.mark || ':';
    const draw = () => {
      el.innerHTML = `<div class="tvp">${q.items.map((s, i) => {
        const { words, ans } = parsePunct(s);
        const got = mode === 'key' ? ans : a[i];
        return `<div class="tvp-item">${mode === 'show' ? mark(punct.grade({ items: [s] }, { 0: a[i] }).full) : ''}${words.map((w, k) => {
          const last = k === words.length - 1;
          const on = got.includes(k);
          let cls = on ? ' is-on' : '';
          if (mode === 'show') cls += on ? (ans.includes(k) ? ' is-right' : ' is-wrong') : (ans.includes(k) ? ' is-missed' : '');
          if (mode === 'key' && on) cls += ' is-right';
          return `<span class="tvp-w">${esc(w)}</span>${last ? '' : `<button type="button" class="tvp-gap${cls}" data-i="${i}" data-k="${k}" ${mode === 'do' ? '' : 'disabled'}>${on || cls.includes('missed') ? sign : ''}</button>`}`;
        }).join('')}</div>`;
      }).join('')}</div>`;
      if (mode !== 'do') return;
      el.querySelectorAll('.tvp-gap').forEach(g => g.addEventListener('click', () => {
        const i = Number(g.dataset.i);
        const k = Number(g.dataset.k);
        a[i] = a[i].includes(k) ? a[i].filter(x => x !== k) : [...a[i], k];
        set(a.map(x => [...x]));
        draw();
      }));
    };
    draw();
  },
  explain(q) {
    return `<ul class="tv-why-list">${q.items.map(s => {
      const { words, ans } = parsePunct(s);
      return `<li>${words.map((w, k) => esc(w) + (ans.includes(k) ? `<b class="tvp-sign">${q.mark || ':'}</b>` : '')).join(' ')}</li>`;
    }).join('')}</ul>`;
  },
};

// ── Viết tự do (không chấm): q.parts [{label, sample}] hoặc một ô với q.sample ──
/** 'a) Tìm …' → 'a)' (nhãn ngắn ở phần chữa bài). */
const labelTag = (label) => (label || '').match(/^\s*([a-zđ0-9][).])/i)?.[1] || '';
const writeParts = (q) => q.parts || [{ label: '', sample: q.sample, lines: q.lines }];
const write = {
  graded: false,
  empty: (q) => writeParts(q).map(() => ''),
  answered: () => true,
  grade: () => ({ score: 1, full: true }),
  mount(el, q, { a, set, mode }) {
    a = [...(a || [])];
    el.innerHTML = `
      ${q.pic ? `<div class="tv-pic is-big">${picSvg(q.pic)}</div>` : ''}
      <div class="tvw">${writeParts(q).map((p, k) => `
        <div class="tvw-part">
          ${p.label ? `<div class="tvw-label">${esc(p.label)}</div>` : ''}
          ${mode === 'do'
            ? `<textarea class="tvw-in" data-k="${k}" rows="${p.lines || q.lines || 2}" placeholder="Em viết vào đây…">${esc(a[k] || '')}</textarea>`
            : mode === 'key'
              ? `<div class="tvw-sample">${esc(p.sample || '')}</div>`
              : `<div class="tvw-mine${(a[k] || '').trim() ? '' : ' is-empty'}">${esc((a[k] || '').trim() || 'Em chưa viết phần này.')}</div>`}
        </div>`).join('')}</div>`;
    if (mode !== 'do') return;
    el.querySelectorAll('.tvw-in').forEach(t => t.addEventListener('input', () => {
      a[Number(t.dataset.k)] = t.value;
      set([...a]);
    }));
  },
  explain(q, a) {
    const parts = writeParts(q);
    const checks = parts.map((p, k) => {
      const s = (a?.[k] || '').trim();
      if (!s) return '';
      const list = [
        [/^[\p{Lu}]/u.test(s), 'Viết hoa chữ cái đầu câu'],
        [/[.!?…]["”]?$/.test(s), 'Có dấu kết thúc câu (. ! ?)'],
      ];
      return `<ul class="tvw-checks">${labelTag(p.label) ? `<li class="tvw-checks-h">${esc(labelTag(p.label))}</li>` : ''}${list.map(([ok, t]) => `<li class="${ok ? 'is-ok' : 'is-no'}">${ok ? '✓' : '○'} ${t}</li>`).join('')}</ul>`;
    }).join('');
    return `
      ${checks ? `<div class="tv-self"><b>Em tự kiểm tra bài viết:</b>${checks}</div>` : ''}
      <div class="tv-sample-h">📝 Bài mẫu để em tham khảo (em có thể viết khác, miễn là đúng ý):</div>
      ${parts.map(p => `<div class="tvw-sample">${labelTag(p.label) ? `<b>${esc(labelTag(p.label))}</b> ` : ''}${esc(p.sample || '')}</div>`).join('')}
      ${q.tip ? `<p class="tv-tip">💡 ${esc(q.tip)}</p>` : ''}`;
  },
};

// ── Gạch chân ──
const underline = {
  empty: () => ({}),
  answered: underlineAnswered,
  grade: gradeUnderline,
  mount(el, q, { a, set, mode, hint }) { return mountUnderline(el, q, { a, set, mode, hint }); },
  explain(q) {
    const { phrases } = expectedMarks(q);
    const marks = q.marks || [{ n: 1, kind: q.kind }];
    return `<ul class="tv-why-list">${marks.map(m => {
      const k = WORD_KINDS[m.kind];
      const list = phrases.filter(p => p.n === m.n).map(p => esc(p.text));
      return `<li><b>${m.n === 2 ? '2 gạch' : marks.length > 1 ? '1 gạch' : 'Gạch dưới'}: ${esc(k?.name || m.label || '')}</b>${k ? ` (${k.def}; hỏi: ${k.ask})` : ''}: ${list.join(', ')}</li>`;
    }).join('')}</ul>`;
  },
};

export const TYPES = { choice, spell, sort, match, fill, punct, write, underline };
export const isGraded = (q) => TYPES[q.type]?.graded !== false;

/** Bài làm đúng hoàn toàn của một câu: dùng để kiểm tra dữ liệu (chấm đáp án phải được trọn điểm) và trang thử. */
export function keyAnswer(q) {
  switch (q.type) {
    case 'choice': return Array.isArray(q.ans) ? [...q.ans].sort() : q.ans;
    case 'spell': return spellBlanks(q).map(s => s.ans);
    case 'sort': return Object.fromEntries(q.words.map(w => [w, q.groups.findIndex(g => g.words.includes(w))]));
    case 'match': return [...q.ans];
    case 'fill': return fillBlanks(q).map(s => s.alts[0]);
    case 'punct': return q.items.map(s => parsePunct(s).ans);
    case 'underline': return { ...expectedMarks(q).expect };
    case 'write': return writeParts(q).map(p => p.sample || '');
    default: return null;
  }
}
