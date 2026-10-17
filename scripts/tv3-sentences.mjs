// In các đơn vị đọc của bài truyện (để viết groups trong tiengViet3/scenes/tuanNN.js):
//   node scripts/tv3-sentences.mjs 6        từng câu (scenes có sentences: true), đánh số từ 0
//   node scripts/tv3-sentences.mjs 6 para   từng đoạn
import { pathToFileURL } from 'url';
import { proseUnits } from '../src/games/tiengViet3/sentences.js';
const [w, mode] = process.argv.slice(2);
const wk = (await import(pathToFileURL(`src/data/tv3Weekly/tuan${String(w).padStart(2, '0')}.js`).href)).default;
proseUnits(wk.read, mode !== 'para').forEach((u, i) => console.log(`${i}\t[đoạn ${u.para}] ${u.t}`));
