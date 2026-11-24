// Kiểm tra từ vựng mở rộng phần 📚 Từ vựng (src/data/englishReading/words/<file>.js).
// node scripts/check-english-words.mjs [level1 | level2 | … | alien | kind | vietsu]
// Mỗi bài: more (từ khác trong bài, phải có trong text) + topics (nhóm chủ đề). Không trùng vocab của bài, không trùng nhau.
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const FILES = ['level1', 'level2', 'level3', 'level4', 'level5', 'alien', 'kind', 'vietsu'];
const only = process.argv[2] ? [process.argv[2]] : FILES;
const dir = path.resolve('src/data/englishReading');
// dạng bất quy tắc thường gặp (từ gốc → dạng trong bài)
const IRREG = {
  child: ['children'], man: ['men'], woman: ['women'], person: ['people'], foot: ['feet'], tooth: ['teeth'], mouse: ['mice'],
  leaf: ['leaves'], knife: ['knives'], wolf: ['wolves'], life: ['lives'], fish: ['fish'], sheep: ['sheep'],
  be: ['is', 'are', 'was', 'were', 'been'], have: ['has', 'had'], do: ['does', 'did', 'done'], go: ['goes', 'went', 'gone'],
  draw: ['drew', 'drawn'], eat: ['ate', 'eaten'], see: ['saw', 'seen'], take: ['took', 'taken'], give: ['gave', 'given'],
  make: ['made'], come: ['came'], run: ['ran'], sit: ['sat'], swim: ['swam'], sing: ['sang', 'sung'], drink: ['drank'],
  write: ['wrote', 'written'], ride: ['rode'], fly: ['flew', 'flown'], buy: ['bought'], bring: ['brought'], think: ['thought'],
  catch: ['caught'], teach: ['taught'], fight: ['fought'], find: ['found'], build: ['built'], send: ['sent'], spend: ['spent'],
  lose: ['lost'], win: ['won'], tell: ['told'], sell: ['sold'], hold: ['held'], keep: ['kept'], sleep: ['slept'], feel: ['felt'],
  leave: ['left'], meet: ['met'], read: ['read'], say: ['said'], pay: ['paid'], hear: ['heard'], know: ['knew', 'known'],
  grow: ['grew', 'grown'], throw: ['threw', 'thrown'], fall: ['fell', 'fallen'], begin: ['began', 'begun'], get: ['got'],
  stand: ['stood'], understand: ['understood'], wear: ['wore', 'worn'], break: ['broke', 'broken'], speak: ['spoke', 'spoken'],
  choose: ['chose', 'chosen'], forget: ['forgot', 'forgotten'], hide: ['hid', 'hidden'], shine: ['shone'], light: ['lit'],
  become: ['became'], lead: ['led'], feed: ['fed'], put: ['put'], cut: ['cut'], hit: ['hit'], let: ['let'], shut: ['shut'],
};
const MIN_TOTAL = 20;
// Emoji Unicode 14–15 (2021+): iPad / điện thoại cũ hiện ô trống, không dùng
const NEW_EMOJI = [[0x1F6DC, 0x1F6DF], [0x1FA75, 0x1FA77], [0x1FA7B, 0x1FA7C], [0x1FA87, 0x1FA88], [0x1FAA9, 0x1FAAF], [0x1FAB7, 0x1FABF],
  [0x1FAC3, 0x1FAC5], [0x1FACE, 0x1FACF], [0x1FAD7, 0x1FADF], [0x1FAE0, 0x1FAFF]];
const tooNew = (s) => [...s].some((ch) => NEW_EMOJI.some(([a, b]) => ch.codePointAt(0) >= a && ch.codePointAt(0) <= b)); // more + topics, mỗi bài ít nhất
let errors = 0, warn = 0, total = 0;
const err = (id, m) => { errors++; console.log(`✗ ${id}: ${m}`); };
const isEmoji = (s) => typeof s === 'string' && /\p{Extended_Pictographic}|\p{Regional_Indicator}/u.test(s) && !/[A-Za-z0-9]/.test(s);

for (const f of only) {
  const wfile = path.join(dir, 'words', `${f}.js`);
  const lessons = (await import(pathToFileURL(path.join(dir, `${f}.js`)).href)).default;
  if (!existsSync(wfile)) { console.log(`- words/${f}.js chưa có`); continue; }
  const data = (await import(pathToFileURL(wfile).href)).default;
  for (const id of Object.keys(data)) if (!lessons.some((L) => L.id === id)) err(id, `không có bài này trong ${f}.js`);
  let n = 0;
  for (const L of lessons) {
    const d = data[L.id];
    if (!d) { err(L.id, 'thiếu'); continue; }
    const text = ` ${L.text.toLowerCase().replace(/[^a-z']+/g, ' ')} `;
    const seen = new Set(L.vocab.map((v) => v.word.toLowerCase()));
    const check = (w, where) => {
      const tag = `${L.id} ${where} "${w?.word}"`;
      for (const k of ['word', 'ipa', 'vi', 'emoji', 'ex']) if (!w?.[k] || typeof w[k] !== 'string') err(tag, `thiếu ${k}`);
      if (!w?.word) return;
      if (!/^[A-Za-z][A-Za-z' -]*[A-Za-z]$|^[A-Za-z]$/.test(w.word)) err(tag, 'word chỉ được có chữ cái, cách, gạch nối, nháy');
      if (w.word.length > 16) err(tag, 'từ quá dài để đánh vần (>16)');
      const k = w.word.toLowerCase();
      if (seen.has(k)) err(tag, 'trùng (vocab hoặc từ khác của bài)');
      seen.add(k);
      if (w.emoji && !isEmoji(w.emoji)) err(tag, `emoji lạ: ${w.emoji}`);
      if (w.emoji && tooNew(w.emoji)) err(tag, `emoji quá mới (Unicode 14+): ${w.emoji}`);
      if (w.ipa && /^\/|\/$/.test(w.ipa)) err(tag, 'ipa không có dấu /');
      if (w.ex && !/[.!?]$/.test(w.ex)) err(tag, 'ex cần dấu câu cuối');
      if (w.vi && /—/.test(w.vi + (w.ex || ''))) err(tag, 'không dùng gạch dài —');
    };
    (d.more || []).forEach((w) => {
      check(w, 'more');
      const base = w.word?.toLowerCase().replace(/[^a-z']+/g, ' ').trim();
      // từ trong bài: có trong text, cho phép dạng chia: s/es/ed/ing/er/est, ies/ied (y), riding (bỏ e), running (gấp đôi phụ âm)
      const forms = base && [base, base.replace(/y$/, 'i'), base.replace(/e$/, ''), base + base.slice(-1), ...(IRREG[base] || [])];
      if (base && !text.includes(` ${base} `) && !forms.some((f) => new RegExp(` ${f}(s|es|d|ed|ing|er|est|ies|ied|ly|ily|'s|s')? `).test(text))) err(`${L.id} more "${w.word}"`, 'không thấy trong bài');
    });
    if (!Array.isArray(d.topics) || !d.topics.length) err(L.id, 'cần ít nhất một nhóm topics');
    (d.topics || []).forEach((t) => {
      if (!t.name) err(L.id, 'topic thiếu name');
      if (!t.words?.length || t.words.length < 6) err(`${L.id} "${t.name}"`, 'nhóm cần ít nhất 6 từ');
      t.words?.forEach((w) => {
        check(w, `topic ${t.name}`);
        if (w.word && text.includes(` ${w.word.toLowerCase()} `)) err(`${L.id} topic "${w.word}"`, 'có sẵn trong bài, chuyển sang more hoặc đổi từ');
      });
    });
    const cnt = (d.more || []).length + (d.topics || []).reduce((a, t) => a + (t.words?.length || 0), 0);
    if (cnt < MIN_TOTAL) { warn++; console.log(`! ${L.id}: mới ${cnt} từ mở rộng (nên ≥ ${MIN_TOTAL})`); }
    n += cnt; total += cnt;
  }
  console.log(`${f}: ${n} từ mở rộng / ${lessons.length} bài`);
}
console.log(errors ? `\n${errors} lỗi, ${warn} cảnh báo` : `\nOK, ${total} từ, ${warn} cảnh báo`);
process.exit(errors ? 1 : 0);
