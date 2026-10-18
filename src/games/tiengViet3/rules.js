/**
 * Luật chính tả và nghĩa các nhóm từ của Tiếng Việt 3: dùng cho phần chữa bài (tiengViet3.js)
 * và trò 🔤 Luật chính tả (tv3Spell.js).
 *
 * Một luật: { id, title, opts, rule (HTML), tips[], explain(word, ans) → HTML | null, bank[] }.
 *  - opts: các lựa chọn điền vào chỗ trống (vd. ['c', 'k']); luật đổi cả tiếng (hỏi/ngã, iêu/ươu)
 *    thì có variants(syllable) → các cách viết để bé chọn.
 *  - explain: lời giải thích cho đúng một từ (luật chắc chắn như c/k); null = từ phải ghi nhớ.
 *  - bank: từ để luyện trong trò chơi, chỗ cần điền đặt trong [ ] (vd. '[k]im [c]ương').
 */

const strip = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC').toLowerCase();
const FRONT = new Set(['i', 'e', 'ê', 'y']);
/** Chữ cái đầu của phần sau chỗ trống (bỏ dấu thanh, giữ ê). */
function nextLetter(after) {
  const ch = (after || '').normalize('NFD').replace(/[̣̀́̃̉]/g, '').normalize('NFC')[0] || '';
  return ch.toLowerCase();
}
const b = (s) => `<b>${s}</b>`;

/** Luật đứng trước i, e, ê (c/k, g/gh, ng/ngh): chắc chắn, giải thích được từng từ. */
function frontRule(id, plain, front, title) {
  return {
    id, title, opts: [plain, front], sure: true,
    rule: `Viết ${b(front)} khi đứng trước ${b('i, e, ê')}. Đứng trước các âm còn lại (a, ă, â, o, ô, ơ, u, ư) thì viết ${b(plain)}.`,
    tips: [`${b(front)} đi với ${b('i, e, ê')}, còn lại là ${b(plain)}.`],
    explain(after, ans) {
      const n = nextLetter(after);
      if (!n) return null;
      return FRONT.has(n) ? `viết ${b(ans)} vì đứng trước ${b(n)}.` : `viết ${b(ans)} vì đứng trước ${b(n)}, không phải i, e, ê.`;
    },
  };
}

export const RULES = {
  ck: {
    ...frontRule('ck', 'c', 'k', 'c hay k?'),
    bank: ['[k]im [c]ương', '[k]ính [c]ận', '[c]ánh [c]ửa', '[k]ì nhông', '[k]iềm chế', '[k]ì [c]ọ', '[c]ảm [c]úm', '[k]èm [c]ặp',
      '[c]on [k]iến', '[c]ái [k]éo', '[k]ể chuyện', '[c]ây [c]au', '[k]ênh rạch', '[c]ô giáo', '[c]ủ khoai', '[k]iên nhẫn',
      '[c]ơm nắm', '[c]ặp sách', '[k]ẹo dừa', '[c]ầu thang', '[k]ính lúp', '[c]ua đồng', '[k]ì lân', '[c]ánh diều',
      '[c]on [c]á', '[c]ái [k]ẻng', '[k]ỉ niệm', '[c]ổng trường', '[k]ia kìa', '[c]ằm', '[k]ê bàn', '[c]ò trắng'],
  },
  ggh: {
    ...frontRule('ggh', 'g', 'gh', 'g hay gh?'),
    bank: ['[g]à [g]áy', '[gh]i nhớ', '[gh]ế [g]ỗ', '[g]ọn [g]àng', '[gh]é thăm', '[g]ồ [gh]ề', '[g]ạo nếp', '[gh]en tị',
      '[g]ói quà', '[gh]i chép', '[g]ương mẫu', '[gh]ềnh thác', '[g]ừng', '[g]ấu bông', '[gh]ẹ biển', '[g]ác chuông',
      '[gh]ép hình', '[g]ạch ngói', '[g]ặp [g]ỡ', '[gh]i-ta'],
  },
  ngngh: {
    ...frontRule('ngngh', 'ng', 'ngh', 'ng hay ngh?'),
    bank: ['[ngh]ỉ [ng]ơi', '[ngh]e [ng]óng', '[ng]ày [ngh]ỉ', '[ngh]ề [ng]hiệp', '[ng]ôi nhà', '[ngh]iêng [ng]ả', '[ng]ủ [ng]on',
      '[ngh]ĩ [ng]ợi', '[ng]ã ba', '[ngh]é [ng]ọ', '[ng]ựa', '[ngh]ệ sĩ', '[ng]ọn [ng]ành', '[ngh]iên cứu', '[ng]ỗng', '[ngh]ịch [ng]ợm'],
  },
  chtr: {
    id: 'chtr', title: 'ch hay tr?', opts: ['ch', 'tr'],
    rule: `Không có luật chắc chắn, phải nhớ từng từ. Mẹo: chỉ ${b('ch')} đứng trước ${b('oa, oă, oe, uê')} (choàng, choắt, choé, chuệch choạc). Tên đồ dùng trong nhà, tên người thân thường viết ${b('ch')}: chén, chổi, chiếu, chăn, cha, chú, chị, cháu.`,
    tips: [`Trước ${b('oa, oă, oe, uê')} chỉ có ${b('ch')}.`, `Đồ dùng trong nhà, người thân thường là ${b('ch')}: chén, chạn, chum, chõng, cha, chú.`],
    explain(after, ans) {
      if (/^(oa|oă|oe|uê)/.test(strip(after || ''))) return `viết ${b('ch')} vì đứng trước vần ${b(after.slice(0, 2))}, chỉ ch đi được với vần này.`;
      return null;
    },
    bank: ['[ch]ăm [ch]ỉ', '[tr]ung thực', '[tr]ường học', '[ch]ổi quét', '[tr]ăng sáng', '[ch]ú [ch]im', '[tr]ời mưa', '[ch]oàng tỉnh',
      '[tr]e xanh', '[ch]én bát', '[tr]ái cây', '[ch]ị gái', '[tr]ống trường', '[ch]iếc [ch]iếu', '[tr]ò [ch]ơi', '[ch]ân [tr]ời',
      '[tr]ứng gà', '[ch]ữa bài', '[tr]ưa hè', '[ch]ạy nhảy'],
  },
  sx: {
    id: 'sx', title: 's hay x?', opts: ['s', 'x'],
    rule: `Không có luật chắc chắn, phải nhớ từng từ. Mẹo: chỉ ${b('x')} đứng trước ${b('oa, oă, oe, uê')} (xoa, xoăn, xoè, xuề xoà). Tên cây cối, con vật dưới nước thường viết ${b('s')}: sen, sim, sung, sò, sứa, sam.`,
    tips: [`Trước ${b('oa, oă, oe, uê')} chỉ có ${b('x')}.`, `Cây cối, con vật dưới nước hay viết ${b('s')}: sen, sung, sim, sò, sứa.`],
    explain(after) {
      if (/^(oa|oă|oe|uê)/.test(strip(after || ''))) return `viết ${b('x')} vì đứng trước vần ${b(after.slice(0, 2))}, chỉ x đi được với vần này.`;
      return null;
    },
    bank: ['[s]ản [x]uất', '[x]ơ dừa', '[s]ơ lược', '[x]e máy', '[s]úc [s]ích', '[x]inh đẹp', '[s]ông [s]âu', '[x]oè ô',
      '[s]ạch [s]ẽ', '[x]anh [x]ao', '[s]ách vở', '[x]ôi gấc', '[s]ân trường', '[x]a [x]ôi', '[s]en hồng', '[x]oăn tít',
      '[s]ao [s]áng', '[x]ếp hàng', '[s]ữa chua', '[x]uất [s]ắc'],
  },
  rdgi: {
    id: 'rdgi', title: 'r, d hay gi?', opts: ['r', 'd', 'gi'],
    rule: `Không có luật chắc chắn, phải nhớ từng từ. Mẹo: ${b('r')} hay gặp ở từ tả âm thanh, từ láy (róc rách, rì rào, rung rinh). Chỉ ${b('d')} đứng trước ${b('oa, oă, oe, uy')} (doạ, doãng, duy). Từ Hán Việt mang dấu ngã, dấu nặng hay viết ${b('d')} (dũng cảm, diễn, dự), mang dấu sắc, dấu hỏi hay viết ${b('gi')} (giải, giản, giáo).`,
    tips: [`Từ tả âm thanh, từ láy hay viết ${b('r')}: róc rách, rì rào.`, `Trước ${b('oa, oă, oe, uy')} chỉ có ${b('d')}.`],
    explain(after) {
      if (/^(oa|oă|oe|uy)/.test(strip(after || ''))) return `viết ${b('d')} vì đứng trước vần ${b(after.slice(0, 2))}, chỉ d đi được với vần này.`;
      return null;
    },
    bank: ['[d]ây mơ [r]ễ má', '[gi]ấy trắng', '[gi]eo hạt', '[d]ãi gió [d]ầm mưa', '[r]óc [r]ách', '[gi]ương buồm', '[d]ũng cảm',
      '[r]ung [r]inh', '[gi]ỏ hoa', '[d]ịu [d]àng', '[r]ổ rá', '[gi]a đình', '[d]òng sông', '[r]ì [r]ào', '[gi]ọt nước', '[d]u lịch',
      '[r]ừng [r]ậm', '[gi]ờ ra chơi', '[d]ạy học', '[r]a vào'],
  },
  ln: {
    id: 'ln', title: 'l hay n?', opts: ['l', 'n'],
    rule: `Không có luật chắc chắn, phải nhớ từng từ. Mẹo: ${b('l')} đứng được trước ${b('oa, oe, uâ, uy')} (loa, loè, luật, luỹ), ${b('n')} gần như không. Trong từ láy, ${b('n')} chỉ láy với ${b('n')} (nắn nót, nao núng), còn ${b('l')} láy với nhiều âm (lấp lánh, long lanh, lo lắng).`,
    tips: [`Trước ${b('oa, oe, uâ, uy')} viết ${b('l')}: loa, loè, luật.`, `Từ láy có ${b('n')} thì cả hai tiếng đều ${b('n')}: nắn nót, nết na.`],
    explain(after) {
      if (/^(oa|oe|ua|uy)/.test(strip(after || ''))) return `viết ${b('l')} vì đứng trước vần ${b(after.slice(0, 2))}, chỉ l đi được với vần này.`;
      return null;
    },
    bank: ['[l]ấp [l]ánh', '[n]ắn [n]ót', '[l]o [l]ắng', '[n]ết [n]a', '[n]ón [l]á', '[l]àng quê', '[n]ước [n]on', '[l]oa phát thanh',
      '[n]o [n]ê', '[l]ung [l]inh', '[n]ăm học', '[l]ửa hồng', '[n]ai vàng', '[l]ạnh giá', '[n]ụ cười', '[l]ên [n]on'],
  },
  hoinga: {
    id: 'hoinga', title: 'Dấu hỏi hay dấu ngã?', tone: true,
    rule: `Mẹo với từ láy: ${b('“Chị Huyền mang nặng ngã đau, anh Sắc khoẻ (không) hỏi”')}. Tiếng kia mang dấu huyền, nặng, ngã thì tiếng này dấu ${b('ngã')} (vội vã, mạnh mẽ, lững thững). Tiếng kia mang dấu sắc, không dấu, dấu hỏi thì tiếng này dấu ${b('hỏi')} (vui vẻ, nhỏ nhắn, hổn hển).`,
    tips: [`Láy với tiếng ${b('huyền, nặng, ngã')} → dấu ${b('ngã')}: vội vã, mạnh mẽ.`, `Láy với tiếng ${b('sắc, không dấu, hỏi')} → dấu ${b('hỏi')}: vui vẻ, nhỏ nhắn.`],
    variants: (syl) => toneVariants(syl, ['̉', '̃']),
    explain(after, ans, word) { return laybExplain(word, ans); },
    bank: ['vui [vẻ]', 'vội [vã]', 'mạnh [mẽ]', '[nhỏ] nhắn', 'lặng [lẽ]', 'sạch [sẽ]', '[nghỉ] ngơi', '[mãi] mãi', 'hổn [hển]',
      'nhõng [nhẽo]', 'đầy [đủ]', 'gần [gũi]', '[rõ] ràng', '[lững] thững', 'kĩ [lưỡng]', 'thỉnh [thoảng]', '[nghĩ] ngợi', '[vẻ] vang',
      'bãi [biển]', 'cửa [sổ]', '[sẵn] sàng', '[mỏi] mệt', 'vất [vả]', 'nhẹ [nhõm]', '[bỡ] ngỡ', 'ngẫm [nghĩ]'],
  },
  ieuuou: {
    id: 'ieuuou', title: 'iêu hay ươu?', swap: [['iêu', 'ươu']],
    rule: `Vần ${b('ươu')} rất ít từ, chỉ cần nhớ: ${b('con hươu, chim khướu, bướu, rượu, ốc bươu, ngươu ngướu')}. Các từ còn lại viết ${b('iêu')}: chiều, diều, nhiều, hiểu, yêu chiều.`,
    tips: [`${b('ươu')} chỉ có: hươu, khướu, bướu, rượu, bươu. Còn lại là ${b('iêu')}.`],
    variants: (syl) => swapVariants(syl, 'iêu', 'ươu'),
    explain(after, ans, word) {
      return /ươu|ướu|ườu|ưởu|ượu|ưỡu/.test(word) ? `${b(word)} là một trong số ít từ có vần ${b('ươu')}.` : `Vần ${b('ươu')} chỉ có ở vài từ (hươu, khướu, bướu, rượu), nên ${b(word)} viết ${b('iêu')}.`;
    },
    bank: ['con [hươu]', 'chim [khướu]', 'cánh [diều]', 'buổi [chiều]', '[nhiều] màu', 'ốc [bươu]', '[hiểu] bài', 'cái [bướu]', 'đáng [yêu]', '[siêu] nhân', 'thả [diều]', '[tiêu] xài'],
  },
  iuuu: {
    id: 'iuuu', title: 'iu hay ưu?', swap: [['iu', 'ưu']],
    rule: `Vần ${b('ưu')} ít từ hơn, hay gặp: ${b('con cừu, quả lựu, bưu điện, cứu giúp, nghỉ hưu, sưu tầm, mưu trí, tựu trường')}. Còn lại thường là ${b('iu')}: cái rìu, địu con, chịu khó, nhỏ xíu, níu tay, trĩu quả.`,
    tips: [`${b('ưu')}: cừu, lựu, bưu điện, cứu, hưu, sưu tầm, mưu, tựu trường.`, `${b('iu')}: rìu, địu, chịu, xíu, níu, dịu, trĩu.`],
    variants: (syl) => swapVariants(syl, 'iu', 'ưu'),
    explain(after, ans, word) { return /ưu|ừu|ứu|ửu|ữu|ựu/.test(word) ? `${b(word)} thuộc nhóm từ có vần ${b('ưu')} cần nhớ.` : `${b(word)} viết vần ${b('iu')}.`; },
    bank: ['con [cừu]', 'cái [rìu]', 'quả [lựu]', '[địu] em', '[bưu] điện', '[chịu] khó', 'cấp [cứu]', 'nhỏ [xíu]', 'nghỉ [hưu]', '[trĩu] quả', '[sưu] tầm', '[níu] tay'],
  },
  anang: {
    id: 'anang', title: 'an hay ang?', swap: [['an', 'ang']],
    rule: `Vần ${b('an')} và ${b('ang')} không có luật, phải nhớ từng từ. Đọc to, nghe kĩ âm cuối: ${b('an')} kết thúc bằng n (lưỡi chạm răng), ${b('ang')} kết thúc bằng ng (miệng mở).`,
    tips: ['Đọc to để nghe âm cuối n hay ng.'],
    variants: (syl) => swapVariants(syl, 'an', 'ang'),
    explain() { return null; },
    bank: ['hòn [than]', 'bắc [thang]', 'một ngày [đàng]', 'học một [sàng] khôn', 'cái [bàn]', '[làng] quê', '[ngan] ngỗng', 'bạn [bàn]', '[sáng] sớm', 'lan [man]'],
  },
  songxong: {
    id: 'songxong', title: 'song hay xong?', opts: ['song', 'xong'],
    rule: `${b('song')} nghĩa là hai, đôi, cùng nhau (song ca, song song, song hành) hoặc thanh chắn cửa sổ (song cửa). ${b('xong')} nghĩa là làm hết, kết thúc (xong việc, xong xuôi, xong chuyện).`,
    tips: [`${b('song')} = hai, cùng nhau. ${b('xong')} = làm hết rồi.`],
    explain(after, ans) { return ans === 'song' ? `${b('song')} ở đây mang nghĩa hai, cùng nhau (hoặc song cửa).` : `${b('xong')} ở đây nghĩa là đã làm hết, kết thúc.`; },
    bank: ['[song] ca', '[xong] việc', '[song] song', '[xong] xuôi', '[song] cửa', '[xong] chuyện', '[song] hành', 'làm [xong]'],
  },
};

/** Các cách viết của một tiếng khi đổi dấu thanh (vd. nghỉ → nghỉ, nghĩ). */
function toneVariants(syl, tones) {
  const d = syl.normalize('NFD');
  const TONE = /[̣̀́̃̉]/;
  const at = d.search(TONE);
  if (at < 0) return [syl];
  return tones.map(t => (d.slice(0, at) + t + d.slice(at + 1)).normalize('NFC'));
}

/** Đổi vần (iêu ↔ ươu, iu ↔ ưu, an ↔ ang), giữ dấu thanh; dấu đặt trên nguyên âm chính (ê, ơ, ư, i, a). */
function swapVariants(syl, a, c) {
  const d = syl.normalize('NFD');
  const tone = (d.match(/[̣̀́̃̉]/) || [''])[0];
  const base = d.replace(/[̣̀́̃̉]/g, '').normalize('NFC');
  const withTone = (w, rime) => {
    const chars = [...rime];
    const k = chars.indexOf([...'êơưia'].find(v => chars.includes(v)));
    const r = [...rime].map((ch, i) => (i === k ? (ch + tone).normalize('NFC') : ch)).join('');
    return w.slice(0, w.length - rime.length) + r;
  };
  // vần dài hơn xét trước (ang trước an)
  const [long, short] = c.length >= a.length ? [c, a] : [a, c];
  const mine = base.endsWith(long) ? long : base.endsWith(short) ? short : null;
  if (!mine) return [syl];
  const other = mine === long ? short : long;
  const otherWord = base.slice(0, base.length - mine.length) + other;
  return [withTone(base, mine), withTone(otherWord, other)];
}

const TONE_OF = (syl) => {
  const m = syl.normalize('NFD').match(/[̣̀́̃̉]/);
  return m ? { '̀': 'huyền', '́': 'sắc', '̃': 'ngã', '̉': 'hỏi', '̣': 'nặng' }[m[0]] : 'không dấu';
};

// Từ láy (đã kiểm tra đúng mẹo "huyền, nặng, ngã → ngã; sắc, ngang, hỏi → hỏi"). Từ ghép như "mỏi mệt",
// "đầy đủ", "bãi biển" có hai tiếng cùng âm đầu nhưng KHÔNG theo mẹo, nên chỉ giải thích theo mẹo khi từ nằm trong danh sách này.
export const LAY_WORDS = new Set(['vui vẻ', 'vội vã', 'mạnh mẽ', 'nhỏ nhắn', 'lặng lẽ', 'sạch sẽ', 'nghỉ ngơi', 'mãi mãi', 'hổn hển',
  'nhõng nhẽo', 'gần gũi', 'rõ ràng', 'lững thững', 'thỉnh thoảng', 'nghĩ ngợi', 'vẻ vang', 'sẵn sàng', 'vất vả', 'nhẹ nhõm', 'ngẫm nghĩ',
  'lẻ loi', 'bẽn lẽn', 'lỏng lẻo', 'nhỏ nhẻ', 'ngỡ ngàng', 'đẹp đẽ', 'mỡ màng', 'dễ dàng', 'rộn rã', 'vững vàng', 'gọn ghẽ',
  'đủng đỉnh', 'lủng lẳng', 'hối hả', 'lạnh lẽo', 'nhanh nhảu']);

/** Giải thích dấu hỏi/ngã theo tiếng láy đứng cạnh (chỉ với từ láy trong LAY_WORDS). */
function laybExplain(word, ans) {
  const w = (word || '').toLowerCase().trim();
  if (!LAY_WORDS.has(w)) return null;
  const parts = w.split(/\s+/);
  const other = parts.find(p => p !== ans.toLowerCase()) || parts[0];
  if (other === ans.toLowerCase()) return `${b(word)} là từ láy lặp lại cả tiếng: hai tiếng cùng dấu ${b(TONE_OF(ans) === 'ngã' ? 'ngã' : 'hỏi')}.`;
  const t = TONE_OF(other);
  const nga = ['huyền', 'nặng', 'ngã'].includes(t);
  return `${b(word)} là từ láy. Tiếng ${b(other)} mang ${t === 'không dấu' ? 'thanh ngang (không dấu)' : `dấu ${t}`} nên ${b(ans)} mang dấu ${b(nga ? 'ngã' : 'hỏi')}.`;
}

/** Các lựa chọn cho một chỗ trống: luật có opts thì dùng opts, luật đổi cả tiếng thì sinh biến thể. */
export function blankOptions(ruleId, ans, explicit) {
  if (explicit?.length) return [...new Set([ans, ...explicit])].sort((x, y) => x.localeCompare(y, 'vi'));
  const r = RULES[ruleId];
  if (!r) return [ans];
  if (r.opts) return r.opts.includes(ans) ? r.opts : [...r.opts, ans];
  const v = r.variants?.(ans) || [ans];
  return [...new Set(v.includes(ans) ? v : [ans, ...v])].sort((x, y) => x.localeCompare(y, 'vi'));
}

/** '[k]im [c]ương' → { segs: đoạn chữ { t } và chỗ trống { ans, opts, after }, word } (trò 🔤 và 📝 đề luyện). */
export function parseBlanks(item, rule) {
  const segs = [];
  let at = 0;
  const re = /\[([^\]]+)\]/g;
  let m;
  while ((m = re.exec(item))) {
    if (m.index > at) segs.push({ t: item.slice(at, m.index) });
    segs.push({ ans: m[1] });
    at = m.index + m[0].length;
  }
  if (at < item.length) segs.push({ t: item.slice(at) });
  const word = segs.map(s => s.t ?? s.ans).join('');
  segs.forEach((s, k) => {
    if (s.ans === undefined) return;
    s.opts = blankOptions(rule, s.ans);
    s.after = segs.slice(k + 1).map(x => x.t ?? x.ans).join('').split(/\s/)[0];
  });
  return { segs, word };
}

/** Lời giải thích một chỗ trống: theo luật chắc chắn, theo mẹo, hoặc "từ cần nhớ". */
export function explainBlank(ruleId, { ans, after, word, note }) {
  if (note) return note;
  const r = RULES[ruleId];
  if (!r) return '';
  const e = r.explain?.(after, ans, word);
  if (e) return e;
  return `viết ${b(ans)}: từ này cần ghi nhớ cách viết.`;
}

// ── Nhóm từ (gạch chân, xếp nhóm): định nghĩa ngắn + câu hỏi để nhận ra ─────
export const WORD_KINDS = {
  sv: { name: 'từ chỉ sự vật', def: 'chỉ người, con vật, đồ vật, cây cối, cảnh vật', ask: 'Ai? Cái gì? Con gì?' },
  hd: { name: 'từ chỉ hoạt động', def: 'chỉ việc làm, cử động của người, con vật', ask: 'Làm gì?' },
  dd: { name: 'từ chỉ đặc điểm', def: 'chỉ màu sắc, hình dáng, kích thước, tính tình, mùi vị… của sự vật', ask: 'Thế nào?' },
  tt: { name: 'từ chỉ trạng thái', def: 'chỉ cảm xúc, tâm trạng hoặc tình trạng (vui, buồn, ngủ, mệt…)', ask: 'Đang thế nào? Cảm thấy ra sao?' },
  ss: { name: 'hình ảnh so sánh', def: 'hai sự vật được so sánh với nhau, thường nối bằng từ như, là, tựa, giống như, như là', ask: 'Cái gì như cái gì?' },
  tr: { name: 'tên riêng', def: 'tên riêng của người, địa danh, sông núi… phải viết hoa chữ cái đầu mỗi tiếng', ask: 'Tên riêng là gì?' },
};
