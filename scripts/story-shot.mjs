// Chụp truyện hoạt hình (phần 🎧 Nghe) của một bài đọc tiếng Anh để soát hình. Cần `npm run dev` (localhost:5173).
//   node scripts/story-shot.mjs en-003                 → mỗi câu một ảnh: trạng thái SAU câu đó (scripts/.tmp/story/en-003-07.png)
//   node scripts/story-shot.mjs en-003 4 1800          → diễn thật câu 5, chụp ở giây 1,8 (giữa chuyển động)
//   node scripts/story-shot.mjs en-003 --portrait      → khung điện thoại dọc (420×860)
// In ra lỗi trang (PAGEERROR / console error) và số câu ↔ số nhịp.
import { mkdirSync } from 'node:fs';
const PW = 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW}`);
const args = process.argv.slice(2);
const portrait = args.includes('--portrait');
const [id, beatArg, msArg] = args.filter((a) => !a.startsWith('--'));
if (!id) { console.log('usage: node scripts/story-shot.mjs en-003 [beat ms] [--portrait]'); process.exit(1); }
const OUT = 'scripts/.tmp/story';
mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: portrait ? { width: 420, height: 860 } : { width: 1100, height: 820 } });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
page.on('console', (m) => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
const base = `http://localhost:5173/scripts/english-reading-dev.html?app=1&id=${id}&part=listen`;
await page.goto(base);
await page.waitForFunction(() => !!document.querySelector('.enr-story')?.__story, null, { timeout: 30000 });
const info = await page.evaluate(() => ({ chips: document.querySelectorAll('.es-line .es-chip').length }));
const { LESSONS } = await page.evaluate(async () => ({ LESSONS: (await import('/src/data/englishReading/index.js')).LESSONS.map((l) => ({ id: l.id, text: l.text })) }));
const L = LESSONS.find((l) => l.id === id);
const sents = await page.evaluate(async (t) => (await import('/src/games/englishStory/player.js')).sentencesOf(t), L.text);
const story = await page.evaluate(async (i) => { const m = await import('/src/games/englishStory/index.js'); const s = (await m.STORIES[i]()).default; return { beats: s.beats.length, keys: s.beats.map((b) => b.key) }; }, id);
console.log(`${id}: ${sents.length} câu, ${story.beats} nhịp, ${info.chips} ô`);
story.keys.forEach((k, i) => { const miss = (k || []).filter((w) => !sents[i]?.includes(w)); if (miss.length) console.log(`  câu ${i + 1}: key không có trong câu: ${miss.join(' | ')}  ← "${sents[i]}"`); });
const stage = page.locator('.es-stage');
const shot = async (name) => { await stage.screenshot({ path: `${OUT}/${name}.png` }); };
if (beatArg !== undefined) {
  const k = Number(beatArg), ms = Number(msArg || 1500);
  await page.evaluate((k) => { document.querySelector('.enr-story').__story.playFrom(k, true); }, k);
  await page.waitForTimeout(ms);
  await shot(`${id}-${String(k + 1).padStart(2, '0')}-t${ms}${portrait ? '-p' : ''}`);
} else {
  for (let k = 0; k <= story.beats; k++) {
    await page.evaluate((k) => document.querySelector('.enr-story').__story.jump(k), k);
    await page.waitForTimeout(450);
    await shot(`${id}-${String(k).padStart(2, '0')}${portrait ? '-p' : ''}`);
  }
}
console.log(`ảnh: ${OUT}/${id}-*.png  (số trong tên = số câu đã diễn xong)`);
await browser.close();
