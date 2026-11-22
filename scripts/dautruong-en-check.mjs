/**
 * Kiểm tra ngân hàng câu 🏆 Đấu Trường Nhí TIẾNG ANH: src/dauTruong/bank/en/g<lớp>/{kd,tt,vd}.js.
 * `node scripts/dautruong-en-check.mjs [lớp…] [--stats]`
 *
 * Mỗi câu (một dòng):
 * { w: tuần 1–35, sk: 'nghe' | 'tu' | 'np' | 'doc', lv: 1–5, t: chủ đề (tiếng Việt, ngắn),
 *   q: chữ hiện trên màn LED (hướng dẫn tiếng Việt + phần tiếng Anh; câu nghe KHÔNG chứa câu được đọc),
 *   say: lời MC đọc bằng giọng Việt (phần hướng dẫn), en?: câu giọng Anh đọc sau lời MC,
 *   sayEn: lời MC đọc đề bằng TIẾNG ANH (thay say; giọng Anh). BẮT BUỘC ở mọi câu (người dùng 2026-11-22: mọi hướng dẫn
 *   tiếng Anh). Chữ tiếng Việt cần đọc (câu dịch nghĩa: "How do you say «thư viện» in English?") đặt trong «…», đọc giọng Việt.
 *   Phương án tiếng Việt vẫn đọc giọng Việt.
 *   qEn: chữ đề trên màn LED bằng TIẾNG ANH (thay q khi hiện; q vẫn là khoá câu). BẮT BUỘC. Giữ định dạng của q (emoji đầu
 *   câu, "___", đoạn đọc trong ngoặc kép); chữ tiếng Việt cần hiện đặt trong «…» (hiện thành “…”). Câu nghe: không lộ en. Câu nghe (hide): sayEn chỉ là lời hướng dẫn, không lộ câu en. Câu khác: sayEn
 *   gồm phần tiếng Anh cần nghe (chỗ trống đọc "blank"), chứa en thì en không đọc lại.
 *   hide?: true (câu nghe: `en` không hiện trên màn, lật đáp án mới hiện), o: [đúng, bẫy, nhiễu, nhiễu] (order: 4 mảnh theo
 *   thứ tự đúng), k?: 'order', ex: lời giải tiếng Việt, fig?: hình thẻ emoji { type: 'tokens', row | rows },
 *   tt?: 'nghe' | 'xep' | 'doc' | 'tu' (chỉ tt.js), pt?: 10 | 20 | 30 (chỉ vd.js) }
 */
import { existsSync } from 'node:fs';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

const dir = join(dirname(fileURLToPath(import.meta.url)), '../src/dauTruong/bank/en');
const args = process.argv.slice(2);
const stats = args.includes('--stats');
const only = args.filter(a => /^[1-5]$/.test(a)).map(Number);
const SK = ['nghe', 'tu', 'np', 'doc'], TT = ['nghe', 'xep', 'doc', 'tu'];
const MAX_Q = 200, MAX_O = 40, MAX_PIECE = 24, MAX_EX = 200, MAX_SAY = 300;
const VI = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
let errors = 0;
const missQ = [];   // câu chưa có qEn (màn LED sẽ hiện đề tiếng Việt)
const missing = [];   // câu chưa có sayEn (MC sẽ đọc lời tiếng Việt)
const err = (f, i, q, msg) => { errors++; console.log(`${f} #${i} (${String(q?.q ?? '?').slice(0, 50)}): ${msg}`); };

for (let g = 1; g <= 5; g++) for (const r of ['kd', 'tt', 'vd']) {
  if (only.length && !only.includes(g)) continue;
  const f = `g${g}/${r}.js`;
  if (!existsSync(join(dir, f))) { if (only.length) console.log(`${f}: chưa có`); continue; }
  const bank = (await import(pathToFileURL(join(dir, f)).href)).default;
  if (!Array.isArray(bank)) { errors++; console.log(`${f}: export default phải là mảng`); continue; }
  const seen = new Map(), count = {};
  bank.forEach((q, i) => {
    const e = (m) => err(f, i, q, m);
    if (!(Number.isInteger(q.w) && q.w >= 1 && q.w <= 35)) e('w phải 1–35');
    if (!SK.includes(q.sk)) e(`sk lạ: ${q.sk}`);
    if (!(Number.isInteger(q.lv) && q.lv >= 1 && q.lv <= 5)) e('lv phải 1–5');
    if (!q.t || typeof q.t !== 'string' || q.t.length > 24) e('t (chủ đề) thiếu hoặc dài quá 24');
    if (!q.q || typeof q.q !== 'string') e('thiếu q');
    else if (q.q.length > MAX_Q) e(`q dài ${q.q.length} > ${MAX_Q}`);
    if (!q.say || typeof q.say !== 'string') e('thiếu say (lời MC tiếng Việt)');
    else if (q.say.length > MAX_SAY) e('say dài quá');
    if (q.en != null && (typeof q.en !== 'string' || !q.en.trim() || VI.test(q.en))) e('en phải là câu tiếng Anh (không dấu tiếng Việt)');
    if (q.en && q.en.length > 380) e('en dài quá 380');
    if (q.hide && !q.en) e('câu nghe (hide) phải có en');
    if (q.hide && q.en && q.q.toLowerCase().includes(q.en.toLowerCase().replace(/[.?!]$/, ''))) e('câu nghe: q lộ nội dung en');
    if (q.sk === 'nghe' && !q.en) e('kỹ năng nghe phải có en');
    if (!Array.isArray(q.o) || q.o.length !== 4) e('o phải có 4 phương án');
    else {
      if (new Set(q.o.map(x => String(x).trim().toLowerCase())).size !== 4) e('phương án trùng');
      q.o.forEach(o => { if (typeof o !== 'string' || !o.trim()) e('phương án rỗng / không phải chữ'); });
      const lim = q.k === 'order' ? MAX_PIECE : MAX_O;
      q.o.forEach(o => { if (String(o).length > lim) e(`phương án dài > ${lim}: ${o}`); });
    }
    const viOpt = Array.isArray(q.o) && q.o.some(o => VI.test(String(o)));   // câu dịch nghĩa (chỉ để ghi chú)
    if (q.sayEn != null) {
      if (typeof q.sayEn !== 'string' || !q.sayEn.trim()) e('sayEn rỗng');
      else {
        if (VI.test(q.sayEn.replace(/«[^»]*»/g, ''))) e('sayEn có chữ tiếng Việt ngoài «…»');
        if ((q.sayEn.match(/«/g) || []).length !== (q.sayEn.match(/»/g) || []).length) e('sayEn: «» không khớp');
        if (/_{2,}/.test(q.sayEn)) e('sayEn còn "___" (đọc là "blank")');
        if (q.sayEn.length > MAX_SAY) e('sayEn dài quá');
        const n = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
        if (q.hide && q.en && n(q.en).length > 6 && n(q.sayEn).includes(n(q.en))) e('câu nghe: sayEn lộ câu en');
      }
    } else missing.push(`${f} #${i}: ${String(q.q).slice(0, 60)}${viOpt ? ' (dịch nghĩa)' : ''}`);
    if (q.viSay != null) e('viSay đã bỏ: viết sayEn, chữ tiếng Việt trong «…»');
    if (q.qEn == null) missQ.push(`${f} #${i}: ${String(q.q).slice(0, 60)}`);
    else if (typeof q.qEn !== 'string' || !q.qEn.trim()) e('qEn rỗng');
    else {
      if (VI.test(q.qEn.replace(/«[^»]*»/g, ''))) e('qEn có chữ tiếng Việt ngoài «…»');
      if ((q.qEn.match(/«/g) || []).length !== (q.qEn.match(/»/g) || []).length) e('qEn: «» không khớp');
      if (q.qEn.length > MAX_Q + 60) e(`qEn dài ${q.qEn.length}`);
      const n = (t) => String(t).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
      if (q.hide && q.en && n(q.en).length > 6 && n(q.qEn).includes(n(q.en))) e('câu nghe: qEn lộ câu en');
      if (/_{2,}/.test(q.q) && !/_{2,}/.test(q.qEn)) e('q có "___" mà qEn không có');
    }
    if (q.k != null && q.k !== 'order') e(`k lạ: ${q.k}`);
    if (!q.ex || q.ex.length > MAX_EX) e(`ex thiếu hoặc dài quá ${MAX_EX}`);
    if (q.fig && !(q.fig.type === 'tokens' && Array.isArray(q.fig.row || q.fig.rows))) e('fig chỉ nhận { type: "tokens", row | rows }');
    if (r === 'tt' && !TT.includes(q.tt)) e(`tt.js: tt phải là ${TT.join('/')}`);
    if (r === 'tt' && q.tt === 'xep' && q.k !== 'order') e('tt xep phải k: "order"');
    if (r !== 'tt' && q.tt) e('chỉ tt.js có tt');
    if (r === 'vd' && ![10, 20, 30].includes(q.pt)) e('vd.js: pt phải 10/20/30');
    if (r !== 'vd' && q.pt) e('chỉ vd.js có pt');
    if (r !== 'tt' && q.k === 'order') e('order chỉ dùng ở tt.js');
    const all = [q.q, q.say, q.ex, ...(q.o || [])].join(' ');
    if (/—/.test(all)) e('có gạch ngang dài —');
    if (/\bnhé\b/i.test(all)) e('có chữ "nhé"');
    if (/không phải|tất cả đều/i.test(q.q || '')) e('tránh câu phủ định / "tất cả đều"');
    const key = `${String(q.q).toLowerCase()}|${q.en || ''}|${q.o?.[0]}`;
    if (seen.has(key)) e(`trùng câu #${seen.get(key)}`); else seen.set(key, i);
    const c = `${q.sk}${q.tt ? `/${q.tt}` : ''}${q.pt ? `/${q.pt}` : ''}`;
    count[c] = (count[c] || 0) + 1;
  });
  console.log(`${f}: ${bank.length} câu${stats ? `  ${JSON.stringify(count)}` : ''}`);
}
if (missQ.length) {
  console.log(`\n⚠️ ${missQ.length} câu chưa có qEn (màn LED hiện đề tiếng Việt)${args.includes('--missing') ? ':' : ', thêm --missing để xem'}`);
  if (args.includes('--missing')) missQ.forEach(m => console.log('  qEn ' + m));
}
if (missing.length) {
  console.log(`\n⚠️ ${missing.length} câu chưa có sayEn (MC sẽ đọc tiếng Việt)${args.includes('--missing') ? ':' : ', thêm --missing để xem'}`);
  if (args.includes('--missing')) missing.forEach(m => console.log('  ' + m));
}
console.log(errors ? `\n❌ ${errors} lỗi` : '\n✅ Không có lỗi');
process.exit(errors ? 1 : 0);
