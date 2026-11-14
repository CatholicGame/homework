// Ảnh bìa cho thẻ bài đọc tiếng Anh (danh sách bài): chụp một khung của truyện hoạt hình phần 🎧 Nghe.
// Cần `npm run dev` (localhost:5173).
//   node scripts/story-thumbs.mjs               → mọi bài có truyện
//   node scripts/story-thumbs.mjs en-003 en-021 → chỉ mấy bài này
// Khung chụp = trạng thái SAU câu k (BEAT bên dưới; mặc định khoảng giữa truyện). Lưu src/assets/english-thumbs/en-NNN.jpg (480×270).
import { mkdirSync } from 'node:fs';
const PW = 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW}`);
const OUT = 'src/assets/english-thumbs';
mkdirSync(OUT, { recursive: true });
// Câu chọn làm ảnh bìa (số câu đã diễn xong) khi khoảng giữa truyện không đẹp
const BEAT = { 'en-018': 8, 'en-062': 10, 'en-064': 12, 'en-071': 17, 'en-072': 7, 'en-065': 10, 'en-066': 12, 'en-078': 10, 'en-074': 9, 'en-076': 7, 'en-082': 3, 'en-083': 5, 'en-084': 9, 'en-085': 5, 'en-088': 2, 'en-089': 8, 'en-090': 11, 'en-091': 8, 'en-092': 13, 'en-095': 4, 'en-096': 8, 'en-098': 3, 'en-099': 11, 'en-100': 6 };
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 700 }, deviceScaleFactor: 1.5 });
page.on('pageerror', (e) => console.log('PAGEERROR', e.message));
const load = async (id) => {
  await page.goto(`http://localhost:5173/scripts/english-reading-dev.html?app=1&id=${id}&part=listen`);
  await page.waitForFunction(() => !!document.querySelector('.enr-story')?.__story, null, { timeout: 30000 });
};
await load('en-001');
const all = await page.evaluate(async () => Object.keys((await import('/src/games/englishStory/index.js')).STORIES).sort());
const ids = process.argv.slice(2).length ? process.argv.slice(2) : all;
for (const id of ids) {
  await load(id);
  await page.addStyleTag({ content: '.es-stage { width: 320px !important; max-height: none !important; aspect-ratio: 16 / 9 !important; border-radius: 0 !important; border: 0 !important; }' });
  await page.waitForTimeout(300);
  const n = await page.evaluate(async (i) => { const m = await import('/src/games/englishStory/index.js'); return (await m.STORIES[i]()).default.beats.length; }, id);
  const k = BEAT[id] ?? Math.round(n / 2);
  await page.evaluate((k) => document.querySelector('.enr-story').__story.jump(k), k);
  await page.waitForTimeout(700);
  await page.locator('.es-stage').screenshot({ path: `${OUT}/${id}.jpg`, type: 'jpeg', quality: 80 });
  console.log(`${id}: câu ${k}/${n}`);
}
await browser.close();
