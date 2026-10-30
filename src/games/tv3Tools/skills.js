/**
 * Các công cụ (kĩ năng) của 🧰 Công cụ Tiếng Việt (lớp 2, 3) và cách sinh đề từ dữ liệu bài (data/*.js) + kho chung (bank.js) của một sách (book.js).
 * Mỗi công cụ: { icon, name, desc, color, has(pool) → có đủ dữ liệu không, make(rng, pool) → đề cho play.js }.
 * pool = dữ liệu gộp của một bài (Luyện tập của bài) hoặc của mọi bài (dải 🧰 Luyện theo công cụ), xem poolOf().
 * Định dạng dữ liệu một bài: docs/lop_3/sgk_tv3_tap1/thiet-ke-cong-cu.md §3.
 */

import { RULES } from '../tiengViet3/rules.js';
import { SPELL_GAME } from '../tv3Spell.js';
import { esc } from './play.js';

export const KIND = {
  sv: { name: 'Sự vật', icon: '🏠', color: '#2563EB', long: 'từ chỉ sự vật', def: 'chỉ người, con vật, đồ vật, cây cối, cảnh vật', ask: 'Ai? Cái gì? Con gì?' },
  hd: { name: 'Hoạt động', icon: '🏃', color: '#16A34A', long: 'từ chỉ hoạt động', def: 'chỉ việc làm, cử động của người, con vật', ask: 'Làm gì?' },
  dd: { name: 'Đặc điểm', icon: '🎨', color: '#EA580C', long: 'từ chỉ đặc điểm', def: 'chỉ màu sắc, hình dáng, kích thước, mùi vị, tính tình… của sự vật', ask: 'Thế nào?' },
};
const SENTYPE = {
  gt: { name: 'Câu giới thiệu', hint: 'Câu giới thiệu trả lời câu hỏi <b>Ai (cái gì, con gì) là gì?</b>, thường có từ <b>là</b>.' },
  hd: { name: 'Câu nêu hoạt động', hint: 'Câu nêu hoạt động trả lời câu hỏi <b>Ai (cái gì, con gì) làm gì?</b>' },
  dd: { name: 'Câu nêu đặc điểm', hint: 'Câu nêu đặc điểm trả lời câu hỏi <b>Ai (cái gì, con gì) thế nào?</b>' },
};
const PURPOSE = {
  ke: { name: 'Câu kể', hint: 'Câu kể dùng để kể, tả hoặc giới thiệu; cuối câu có <b>dấu chấm</b>.' },
  hoi: { name: 'Câu hỏi', hint: 'Câu hỏi dùng để hỏi; cuối câu có <b>dấu chấm hỏi</b>.' },
  cam: { name: 'Câu cảm', hint: 'Câu cảm bộc lộ cảm xúc (vui, buồn, ngạc nhiên…), thường có từ <b>ôi, chao ôi, quá, lắm, thật</b>; cuối câu có <b>dấu chấm than</b>.' },
  khien: { name: 'Câu khiến', hint: 'Câu khiến dùng để đề nghị, yêu cầu, nhờ, khuyên; thường có từ <b>hãy, đừng, chớ, đi, thôi, nào, nhé</b>.' },
};
const PUNCT = {
  '.': { name: 'dấu chấm', hint: 'Cuối câu kể dùng <b>dấu chấm</b>.' },
  '?': { name: 'dấu chấm hỏi', hint: 'Cuối câu hỏi dùng <b>dấu chấm hỏi</b>.' },
  '!': { name: 'dấu chấm than', hint: 'Cuối câu cảm, câu khiến dùng <b>dấu chấm than</b>.' },
  ':': { name: 'dấu hai chấm', hint: '<b>Dấu hai chấm</b> báo hiệu phần liệt kê, phần giải thích hoặc lời nói của nhân vật.' },
  ',': { name: 'dấu phẩy', hint: '<b>Dấu phẩy</b> ngăn cách các từ ngữ cùng loại trong câu.' },
  '“”': { name: 'dấu ngoặc kép', hint: '<b>Dấu ngoặc kép</b> đánh dấu lời nói trực tiếp hoặc tên riêng, từ ngữ đặc biệt.' },
};
const QWORDS = ['Ai', 'Cái gì', 'Con gì', 'Làm gì', 'Thế nào', 'Là gì', 'Ở đâu', 'Khi nào', 'Vì sao', 'Để làm gì'];

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const lastPunct = (s) => (s.match(/[.?!…]+$/) || [''])[0];
const uniq = (a) => [...new Set(a)];

/**
 * Gộp dữ liệu các bài: mảng nối lại, nhóm từ (kinds, vocab) gộp theo khoá.
 * bank: kho chung của sách (chỉ dải 🧰 Luyện theo công cụ); book: sách (book.js), cho nghĩa từ của cả sách (phương án sai của 📖)
 * và các dấu câu sách dạy (lớp 2 chưa có dấu hai chấm).
 */
export function poolOf(lessons, { bank = null, book = null } = {}) {
  const P = { kinds: { sv: [], hd: [], dd: [] }, vocab: [], spell: [], notes: [], moreMeanings: book?.meanings || [], marks: book?.punct };
  const srcs = bank ? [...lessons, bank] : lessons;
  for (const l of srcs) {
    for (const [k, v] of Object.entries(l)) {
      if (k === 'kinds') { for (const c of Object.keys(P.kinds)) P.kinds[c].push(...(v[c] || [])); continue; }
      if (k === 'vocab') { P.vocab.push(...[].concat(v)); continue; }
      if (Array.isArray(v) && !['pages', 'learn', 'mix', 'notes', 'skills'].includes(k)) (P[k] ||= []).push(...v);
    }
  }
  for (const c of Object.keys(P.kinds)) P.kinds[c] = uniq(P.kinds[c]);
  return P;
}

const nonEmpty = (k) => (P) => (P[k]?.length || 0) > 0;

export const SKILLS = {
  kinds: {
    icon: '🧺', name: 'Xếp từ vào nhóm', color: '#2563EB', desc: 'Từ chỉ sự vật, hoạt động, đặc điểm',
    has: (P) => ['sv', 'hd', 'dd'].filter(c => P.kinds[c].length >= 2).length >= 2,
    make(rng, P) {
      const cs = ['sv', 'hd', 'dd'].filter(c => P.kinds[c].length >= 2);
      const cats = cs.length === 3 && rng() < 0.5 ? rng.shuffle(cs).slice(0, 2) : cs;
      const items = [];
      const n = cats.length === 2 ? 6 : 6;
      for (let i = 0; items.length < n && i < 60; i++) {
        const c = cats[items.length % cats.length], t = rng.pick(P.kinds[c]);
        if (!items.some(x => x.t === t)) items.push({ t, cat: c });
      }
      const order = ['sv', 'hd', 'dd'].filter(c => cats.includes(c));
      return {
        kind: 'sort', head: `Xếp mỗi từ vào đúng nhóm: ${order.map(c => `<b>${KIND[c].long}</b>`).join(', ')}.`,
        say: 'Từ đang sáng thuộc nhóm nào? Chạm vào giỏ của nhóm đó.',
        items: rng.shuffle(items), cats: order.map(c => ({ id: c, ...KIND[c] })),
        hint: (it) => `"${it.t}" là ${KIND[it.cat].long}: ${KIND[it.cat].def}, trả lời câu hỏi <b>${KIND[it.cat].ask}</b>`,
      };
    },
  },
  find: {
    icon: '🔍', name: 'Tìm từ trong câu', color: '#0891B2', desc: 'Chạm đúng từ chỉ hoạt động, đặc điểm, sự vật',
    has: nonEmpty('find'),
    make(rng, P) {
      const it = rng.pick(P.find);
      const K = KIND[it.k];
      const n = (it.s.match(/\*/g) || []).length;
      return {
        kind: 'tap', head: `Chạm vào ${n > 1 ? `<b>${n}</b> ` : ''}<b>${K.long}</b> trong câu.`, text: it.s, slotName: `${K.icon} ${K.name}`,
        slots: [{ role: 'x', name: `${K.icon} ${K.name}`, color: K.color }],
        hint: (t) => `"${t.t}" không phải ${K.long}. ${cap(K.long)} ${K.def}, trả lời câu hỏi <b>${K.ask}</b>`,
      };
    },
  },
  sentype: {
    icon: '🏷️', name: 'Kiểu câu', color: '#7C3AED', desc: 'Câu giới thiệu, nêu hoạt động, nêu đặc điểm',
    has: nonEmpty('sentype'),
    make(rng, P) {
      const [s, k] = rng.pick(P.sentype);
      const keys = ['gt', 'hd', 'dd'];
      return {
        kind: 'pick', head: 'Câu dưới đây thuộc kiểu câu nào?', body: esc(s), small: s.length > 60,
        options: keys.map(x => SENTYPE[x].name), answer: SENTYPE[k].name,
        hint: () => 'Thử hỏi về người, vật trong câu: câu trả lời cho câu hỏi <b>là gì?</b>, <b>làm gì?</b> hay <b>thế nào?</b>',
        why: `${SENTYPE[k].hint}`,
      };
    },
  },
  build: {
    icon: '🧩', name: 'Ghép câu', color: '#DB2777', desc: 'Sắp xếp từ ngữ thành câu đúng',
    has: nonEmpty('build'),
    make(rng, P) {
      const raw = rng.pick(P.build);
      const end = lastPunct(raw);
      const pieces = raw.slice(0, raw.length - end.length).split(' / ').map(s => s.trim());
      let shuffled;
      for (let k = 0; k < 10; k++) { shuffled = rng.shuffle(pieces.slice()); if (shuffled.join() !== pieces.join()) break; }
      return {
        kind: 'order', head: 'Chạm lần lượt các mảnh để ghép thành câu đúng.', pieces, shuffled, end,
        say: 'Ghép các mảnh thành câu. Câu bắt đầu bằng chữ viết hoa.',
      };
    },
  },
  match: {
    icon: '🔗', name: 'Nối vế câu', color: '#0D9488', desc: 'Chọn bộ phận còn thiếu để tạo câu',
    has: (P) => (P.match?.length || 0) >= 3,
    make(rng, P) {
      const [a, b] = rng.pick(P.match);
      const others = rng.shuffle(uniq(P.match.filter(x => x[1] !== b && x[0] !== a).map(x => x[1]))).slice(0, 2);
      return {
        kind: 'pick', head: 'Chọn từ ngữ thích hợp để tạo thành câu.', body: `${esc(a)} {_}`,
        options: rng.shuffle([b, ...others]), answer: b, read: `${a} ${b}`,
        hint: (v) => `"${a} ${v}" nghe chưa hợp. Ai (con gì, cái gì) thì làm được việc đó?`,
      };
    },
  },
  purpose: {
    icon: '💬', name: 'Câu kể, hỏi, cảm, khiến', color: '#9333EA', desc: 'Nhận ra câu theo mục đích nói',
    has: nonEmpty('purpose'),
    make(rng, P) {
      const [s, k] = rng.pick(P.purpose);
      const keys = ['ke', 'hoi', 'cam', 'khien'];
      return {
        kind: 'pick', head: 'Câu dưới đây là kiểu câu gì?', body: esc(s), small: s.length > 60,
        options: keys.map(x => PURPOSE[x].name), answer: PURPOSE[k].name,
        hint: () => 'Câu này dùng để làm gì: để kể, để hỏi, để bộc lộ cảm xúc hay để đề nghị, yêu cầu? Nhìn cả dấu cuối câu.',
        why: PURPOSE[k].hint,
      };
    },
  },
  punct: {
    icon: '❗', name: 'Dấu câu', color: '#DC2626', desc: 'Chọn dấu chấm, chấm hỏi, chấm than, hai chấm, phẩy',
    has: nonEmpty('punct'),
    make(rng, P) {
      const s = rng.pick(P.punct);
      const m = s.match(/\{(.+?)\}/);
      const ans = m[1];
      const all = P.marks || Object.keys(PUNCT).filter(x => x !== '“”');
      const opts = uniq([ans, ...rng.shuffle(all.filter(x => x !== ans)).slice(0, 3)]);
      return {
        kind: 'pick', head: 'Chọn dấu câu thích hợp cho ô trống.', body: esc(s.replace(m[0], '\u0000')).replace('\u0000', '{_}'), small: s.length > 70,
        options: opts.sort((x, y) => all.indexOf(x) - all.indexOf(y)), answer: ans,
        hint: () => 'Đọc kĩ câu: câu kể, câu hỏi hay câu bộc lộ cảm xúc? Phần sau ô trống có kể ra nhiều sự vật không?',
        why: PUNCT[ans].hint,
      };
    },
  },
  colon: {
    icon: '➗', name: 'Dấu hai chấm dùng để làm gì', color: '#B91C1C', desc: 'Báo hiệu liệt kê, giải thích, lời nói',
    has: nonEmpty('colon'),
    make(rng, P) {
      const [s, k] = rng.pick(P.colon);
      const opts = { lk: 'Báo hiệu phần liệt kê', gt: 'Báo hiệu phần giải thích', ln: 'Báo hiệu lời nói trực tiếp' };
      return {
        kind: 'pick', head: '<b>Dấu hai chấm</b> trong câu được dùng để làm gì?', body: esc(s).replace(':', '<mark>:</mark>'), small: true,
        options: Object.values(opts), answer: opts[k],
        hint: () => 'Xem phần sau dấu hai chấm: kể ra nhiều sự vật (liệt kê), nói rõ vì sao, là gì (giải thích), hay lời của một người nói ra?',
      };
    },
  },
  vocab: {
    icon: '🌻', name: 'Vốn từ theo chủ đề', color: '#CA8A04', desc: 'Mùa hè, nhà trường, thư viện, người thân, nghề nghiệp…',
    has: nonEmpty('vocab'),
    make(rng, P) {
      const v = rng.pick(P.vocab);
      const names = Object.keys(v.groups);
      const cats = names.length > 3 ? rng.shuffle(names).slice(0, 3) : names;
      const items = [];
      for (let i = 0; items.length < 6 && i < 60; i++) {
        const c = cats[items.length % cats.length], t = rng.pick(v.groups[c]);
        if (!items.some(x => x.t === t)) items.push({ t, cat: c });
      }
      const colors = ['#2563EB', '#16A34A', '#EA580C'];
      return {
        kind: 'sort', head: `Chủ đề <b>${v.name}</b>: xếp mỗi từ vào đúng nhóm.`, say: `Từ ngữ về ${v.name}. Từ đang sáng thuộc nhóm nào?`,
        items: rng.shuffle(items), cats: cats.map((c, i) => ({ id: c, name: c, color: colors[i], icon: v.icons?.[c] })),
        hint: (it) => `"${it.t}" thuộc nhóm <b>${it.cat}</b>.`,
      };
    },
  },
  fill: {
    icon: '✏️', name: 'Chọn từ điền chỗ trống', color: '#EA580C', desc: 'Dùng từ ngữ đúng chỗ trong câu',
    has: nonEmpty('fill'),
    make(rng, P) {
      const it = rng.pick(P.fill);
      const m = it.s.match(/\{(.+?)\}/);
      return {
        kind: 'pick', head: 'Chọn từ ngữ thích hợp cho chỗ trống.', body: esc(it.s.replace(m[0], '\u0000')).replace('\u0000', '{_}'), small: it.s.length > 70,
        options: rng.shuffle(it.opts.slice()), answer: m[1], read: it.s.replace(/[{}]/g, ''),
        hint: () => it.hint || 'Đọc cả câu với từ em chọn: câu có hợp nghĩa không?',
      };
    },
  },
  antonym: {
    icon: '↔️', name: 'Từ trái nghĩa', color: '#4F46E5', desc: 'Tìm từ có nghĩa trái ngược',
    has: nonEmpty('antonym'),
    make(rng, P) { return pairPick(rng, P.antonym, 'trái nghĩa với', 'Từ trái nghĩa có nghĩa <b>trái ngược</b> nhau, vd. cao – thấp, vui – buồn.'); },
  },
  synonym: {
    icon: '🟰', name: 'Từ có nghĩa giống nhau', color: '#059669', desc: 'Tìm từ cùng nghĩa, gần nghĩa',
    has: nonEmpty('synonym'),
    make(rng, P) { return pairPick(rng, P.synonym, 'có nghĩa giống với', 'Từ có nghĩa giống nhau dùng thay được cho nhau, vd. chăm chỉ – siêng năng.'); },
  },
  compare: {
    icon: '🌟', name: 'So sánh', color: '#F59E0B', desc: 'Tìm sự vật được so sánh và từ so sánh',
    has: nonEmpty('compare'),
    make(rng, P) {
      const s = rng.pick(P.compare);
      return {
        kind: 'tap', head: 'Tìm hình ảnh so sánh: <b>sự vật</b>, <b>từ so sánh</b>, <b>sự vật được so sánh với</b>.', text: s,
        say: 'Cái gì được so sánh với cái gì? Chạm vào hai sự vật và từ so sánh.',
        slots: [{ role: 'a', name: 'Sự vật 1', color: '#2563EB' }, { role: 'w', name: 'Từ so sánh', color: '#DC2626' }, { role: 'b', name: 'Sự vật 2', color: '#16A34A' }],
        hint: () => 'Tìm từ so sánh trước (như, là, tựa, giống như, như là…), rồi xem hai sự vật đứng hai bên.',
        why: 'Hình ảnh so sánh: sự vật 1 + từ so sánh + sự vật 2.',
      };
    },
  },
  question: {
    icon: '❓', name: 'Đặt câu hỏi', color: '#0284C7', desc: 'Hỏi đúng bộ phận gạch chân: Ai? Làm gì? Ở đâu?…',
    has: nonEmpty('question'),
    make(rng, P) {
      const it = rng.pick(P.question);
      const others = rng.shuffle(QWORDS.filter(q => q !== it.q && !(it.not || []).includes(q))).slice(0, 3);
      return {
        kind: 'pick', head: 'Bộ phận <u>gạch chân</u> trả lời cho câu hỏi nào?', body: it.s.replace(/\[(.+?)\]/, '<u>$1</u>'), small: it.s.length > 60,
        options: rng.shuffle([it.q, ...others]).map(x => `${x}?`), answer: `${it.q}?`,
        hint: () => 'Che bộ phận gạch chân lại, rồi hỏi: Ai? Làm gì? Thế nào? Ở đâu? Khi nào? Vì sao?',
      };
    },
  },
  meaning: {
    icon: '📖', name: 'Hiểu nghĩa từ', color: '#0F766E', desc: 'Từ ngữ khó trong bài đọc',
    has: (P) => (P.meaning?.length || 0) >= 2,
    make(rng, P) {
      const [w, m] = rng.pick(P.meaning);
      // nghĩa sai: ưu tiên từ cùng bài, thiếu thì lấy nghĩa của từ ở các bài khác
      const other = (list) => rng.shuffle(list.filter(x => x[0] !== w && x[1] !== m)).map(x => x[1]);
      const others = uniq([...other(P.meaning), ...other(P.moreMeanings)]).slice(0, 2);
      return {
        kind: 'pick', head: `Từ <b>"${esc(w)}"</b> có nghĩa là gì?`, body: `<mark>${esc(w)}</mark>`,
        options: rng.shuffle([m, ...others]), answer: m, read: `${w}: ${m}`,
        hint: () => 'Đọc lại câu có từ đó trong bài đọc, nghĩ xem nghĩa nào hợp.',
      };
    },
  },
  caps: {
    icon: '🔠', name: 'Viết hoa tên riêng', color: '#BE185D', desc: 'Chọn cách viết hoa đúng',
    has: nonEmpty('caps'),
    make(rng, P) {
      const right = rng.pick(P.caps);
      return {
        kind: 'pick', head: 'Tên riêng nào được viết <b>đúng</b>?', body: '<span class="tt-icon">🔠</span>',
        options: rng.shuffle([right, ...wrongCaps(rng, right)]), answer: right,
        hint: () => 'Tên riêng của người, địa danh: viết hoa chữ cái đầu của <b>mỗi tiếng</b>.',
        why: `<b>${esc(right)}</b>: viết hoa chữ cái đầu mỗi tiếng.`,
      };
    },
  },
  alpha: {
    icon: '🔡', name: 'Thứ tự bảng chữ cái', color: '#0EA5E9', desc: 'Xếp tên bạn, tên đồ vật theo chữ cái đầu',
    has: (P) => uniq((P.alpha || []).map(firstLetter)).length >= 4,
    make(rng, P) {
      const picked = [];
      for (const w of rng.shuffle(uniq(P.alpha))) {
        if (!picked.some(x => firstLetter(x) === firstLetter(w))) picked.push(w);
        if (picked.length === 4) break;
      }
      const pieces = picked.sort((a, b) => ABC.indexOf(firstLetter(a)) - ABC.indexOf(firstLetter(b)));
      let shuffled;
      for (let k = 0; k < 10; k++) { shuffled = rng.shuffle(pieces.slice()); if (shuffled.join() !== pieces.join()) break; }
      return {
        kind: 'order', end: '', head: 'Chạm các tên theo đúng <b>thứ tự bảng chữ cái</b>.', pieces, shuffled, ok: 'Đúng thứ tự bảng chữ cái!',
        say: 'Xem chữ cái đầu của mỗi tên. Chữ nào đứng trước trong bảng chữ cái thì chạm trước.',
        hint: () => `Bảng chữ cái: ${ABC.map(x => x.toUpperCase()).join(', ')}. Tìm chữ cái đầu đứng trước nhất.`,
      };
    },
  },
  para: {
    icon: '📝', name: 'Sắp xếp đoạn văn', color: '#65A30D', desc: 'Xếp câu theo đúng thứ tự',
    has: nonEmpty('para'),
    make(rng, P) {
      const it = rng.pick(P.para);
      const pieces = it.sents.slice(0, 5);
      let shuffled;
      for (let k = 0; k < 10; k++) { shuffled = rng.shuffle(pieces.slice()); if (shuffled.join() !== pieces.join()) break; }
      // loose [i, j]: các câu i…j đổi chỗ được cho nhau (câu tả ở giữa đoạn) → mọi hoán vị đều đúng
      const alts = it.loose ? perms(pieces.slice(it.loose[0], it.loose[1] + 1)).map(mid => [...pieces.slice(0, it.loose[0]), ...mid, ...pieces.slice(it.loose[1] + 1)]) : [];
      return {
        kind: 'order', para: true, wide: true, alts, head: `<b>${esc(it.title)}</b>: chạm các câu theo đúng thứ tự.`, pieces, shuffled,
        say: 'Câu nào đứng đầu đoạn văn? Chạm lần lượt các câu theo thứ tự.',
        hint: (p, k) => (k === 0 ? 'Câu đầu tiên thường giới thiệu điều sẽ kể, sẽ tả.' : it.hint || 'Việc nào xảy ra trước? Ý nào nối tiếp câu vừa xếp?'),
      };
    },
  },
  spell: {
    icon: '🔤', name: 'Chính tả', color: '#EA580C', desc: 'c/k, g/gh, ng/ngh, s/x, ch/tr, l/n, vần dễ lẫn',
    has: (P) => P.spell.length > 0 || (P.spellx?.length || 0) > 0,
    make(rng, P) {
      const rules = P.spell.filter(r => RULES[r]);
      if (rules.length && (!P.spellx?.length || rng() < 0.5)) {
        const rule = rng.pick(rules);
        return { kind: 'spell', spell: SPELL_GAME.makeMission(rng, { rules: [rule] }, []) };
      }
      // Vần / âm không có luật (en/eng, iên/iêng, uôn/uông…): "cái k{èn|èng}" — lựa chọn đầu là đúng.
      const raw = rng.pick(P.spellx);
      const m = raw.match(/\{(.+?)\}/);
      const opts = m[1].split('|');
      const before = raw.slice(0, m.index), after = raw.slice(m.index + m[0].length);
      return {
        kind: 'pick', head: 'Chọn vần (âm) đúng điền vào chỗ trống.', body: `${esc(before)}{_}${esc(after)}`,
        options: rng.shuffle(opts.slice()), answer: opts[0], read: before + opts[0] + after,
        hint: () => 'Đọc to cả từ, nghe kĩ âm cuối và nghĩ nghĩa của từ.',
        why: `Viết đúng: <b>${esc(before + opts[0] + after)}</b>`,
      };
    },
  },
};

const ABC = ['a', 'ă', 'â', 'b', 'c', 'd', 'đ', 'e', 'ê', 'g', 'h', 'i', 'k', 'l', 'm', 'n', 'o', 'ô', 'ơ', 'p', 'q', 'r', 's', 't', 'u', 'ư', 'v', 'x', 'y'];
// chữ cái đầu, bỏ dấu thanh (Ánh → a, Ấn → â, Ước → ư)
const firstLetter = (w) => {
  const c = w.trim().charAt(0).toLowerCase().normalize('NFD');
  const base = c.charAt(0), marks = c.slice(1);
  if (base === 'a' && marks.includes('̆')) return 'ă';
  if ('aeo'.includes(base) && marks.includes('̂')) return { a: 'â', e: 'ê', o: 'ô' }[base];
  if ('ou'.includes(base) && marks.includes('̛')) return { o: 'ơ', u: 'ư' }[base];
  return base;
};

const perms = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => perms([...a.slice(0, i), ...a.slice(i + 1)]).map(p => [x, ...p])));

function pairPick(rng, pairs, rel, rule) {
  const [a, b] = rng.pick(pairs);
  const [w, ans] = rng() < 0.5 ? [a, b] : [b, a];
  // phương án sai: không được là từ nào đã ghép cặp với w (vd. sáng – tối, sáng – mờ đều trái nghĩa)
  const mates = new Set(pairs.filter(p => p.includes(w)).flat());
  const pool = uniq(pairs.flat()).filter(x => !mates.has(x) && x !== ans);
  return {
    kind: 'pick', head: `Từ nào <b>${rel}</b> từ "${esc(w)}"?`, body: `<mark>${esc(w)}</mark>`,
    options: rng.shuffle([ans, ...rng.shuffle(pool).slice(0, 2)]), answer: ans, read: `${w}, ${ans}`,
    hint: () => rule, why: `<b>${esc(w)}</b> – <b>${esc(ans)}</b>. ${rule}`,
  };
}

/** Hai cách viết sai của một tên riêng: viết thường tiếng sau / tiếng đầu, hoặc viết hoa cả tên. */
function wrongCaps(rng, name) {
  const ws = name.split(' ');
  const low = (w) => w.charAt(0).toLowerCase() + w.slice(1);
  const out = [];
  if (ws.length > 1) {
    out.push([ws[0], ...ws.slice(1).map(low)].join(' '));
    out.push([low(ws[0]), ...ws.slice(1)].join(' '));
  }
  out.push(name.toLowerCase(), name.toUpperCase());
  return rng.shuffle(uniq(out.filter(x => x !== name))).slice(0, 2);
}

/** Công cụ có đủ dữ liệu trong bài (theo thứ tự lesson.skills nếu có). */
export function skillsOf(lesson) {
  const P = poolOf(lesson.mix ? [lesson, ...lesson.mix] : [lesson]);
  const order = lesson.skills || Object.keys(SKILLS);
  return order.filter(k => SKILLS[k]?.has(P));
}

/** Khung ghi nhớ của bài (bài ôn tập: gộp các bài trong mix). */
export const notesOf = (lesson) => [...(lesson.notes || []), ...(lesson.mix || []).flatMap(l => l.notes || [])];
