// Kiểm tra bảng tra từ theo bài (src/data/englishReading/gloss/levelN.js).
// node scripts/check-english-gloss.mjs [level]
// - mọi từ trong text (theo WORD_RE) phải có trong words (khoá chữ thường, dấu ' thẳng)
// - không có khoá thừa; cụm từ phải có trong bài; vi không rỗng; ipa đúng bộ ký tự (trừ tên riêng tiếng Việt)
// - cùng một từ phải cùng IPA ở mọi bài; trùng với src/i18n/en/ipa.js thì báo nếu khác (cảnh báo)
import { pathToFileURL } from 'node:url';
import { existsSync } from 'node:fs';
import path from 'node:path';

const WORD_RE = /[A-Za-z]+(?:['’-][A-Za-z]+)*/g;
// Kiểu Cambridge giọng Mỹ như src/i18n/en/ipa.js: dʒ / tʃ (không dùng ʤ ʧ), ɡ (U+0261, không phải g), e (không ɛ), ər / ɜːr.
const IPA_OK = /^[abdefhijklmnoprstuvwzæɑɔəɜɪʊʌθðŋʃʒɡːˈˌ ]+$/;
// Từ viết giống mà đọc khác tuỳ nghĩa (read hiện tại / quá khứ, used to / đã dùng, live…): IPA theo từng bài.
const HETERO = new Set(['read', 'used', 'use', 'live', 'lives', 'close', 'wind', 'tear', 'lead', 'minute', 'present', 'record', 'desert', 'wound', 'row', 'bow']);
const only = /^\d$/.test(process.argv[2] || '') ? [Number(process.argv[2])] : [1, 2, 3, 4, 5];
const dir = path.resolve('src/data/englishReading');
const key = (w) => w.toLowerCase().replace(/’/g, "'");
const appIpa = (await import(pathToFileURL(path.resolve('src/i18n/en/ipa.js')).href)).default;

let errors = 0, warns = 0;
const err = (id, m) => { errors++; console.log(`✗ ${id}: ${m}`); };
const seen = new Map(); // từ → { ipa, id }

for (const lv of only) {
  const lf = path.join(dir, `level${lv}.js`), gf = path.join(dir, 'gloss', `level${lv}.js`);
  if (!existsSync(gf)) { console.log(`- gloss/level${lv}.js chưa có`); continue; }
  const lessons = (await import(pathToFileURL(lf).href)).default;
  const gloss = (await import(pathToFileURL(gf).href)).default;
  let nWords = 0, nPhr = 0;
  for (const L of lessons) {
    const g = gloss[L.id];
    if (!g) { err(L.id, 'thiếu bảng gloss'); continue; }
    const toks = new Set([...L.text.matchAll(WORD_RE)].map((m) => key(m[0])));
    const words = g.words || {};
    for (const t of toks) if (!words[t]) err(L.id, `thiếu từ "${t}"`);
    for (const [k, v] of Object.entries(words)) {
      nWords++;
      if (!toks.has(k)) err(L.id, `khoá thừa "${k}" (không có trong bài)`);
      if (!v.vi?.trim()) err(L.id, `"${k}" thiếu vi`);
      if (/—/.test(v.vi || '')) err(L.id, `"${k}" có dấu —`);
      if (!v.name && !v.ipa) err(L.id, `"${k}" thiếu ipa`);
      if (v.ipa && !IPA_OK.test(v.ipa)) err(L.id, `"${k}" ipa lạ: ${v.ipa}`);
      if (v.ipa && !HETERO.has(k)) {
        const prev = seen.get(k);
        if (prev && prev.ipa !== v.ipa) err(L.id, `"${k}" ipa ${v.ipa} khác ${prev.id} (${prev.ipa})`);
        else if (!prev) seen.set(k, { ipa: v.ipa, id: L.id });
        if (appIpa[k] && appIpa[k] !== v.ipa) { warns++; if (process.argv.includes('-v')) console.log(`  ! ${L.id} "${k}" ${v.ipa} ≠ ipa.js ${appIpa[k]}`); }
      }
    }
    const low = ' ' + [...L.text.matchAll(WORD_RE)].map((m) => key(m[0])).join(' ') + ' ';
    for (const [k, v] of Object.entries(g.phrases || {})) {
      nPhr++;
      if (k.split(' ').length < 2) err(L.id, `cụm "${k}" chỉ có 1 từ`);
      if (!low.includes(` ${k} `)) err(L.id, `cụm "${k}" không có trong bài`);
      if (!v.vi?.trim() || !v.ipa) err(L.id, `cụm "${k}" thiếu vi / ipa`);
      if (v.ipa && !IPA_OK.test(v.ipa)) err(L.id, `cụm "${k}" ipa lạ: ${v.ipa}`);
    }
  }
  console.log(`gloss level${lv}: ${nWords} mục từ, ${nPhr} cụm`);
}
if (warns) console.log(`(${warns} IPA khác src/i18n/en/ipa.js, thêm -v để xem)`);
console.log(errors ? `\n${errors} lỗi` : '\nOK');
process.exit(errors ? 1 : 0);
