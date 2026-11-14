// node shot.mjs [0|0.3|…|end]: chụp video giới thiệu (dev server app cổng 5173), ảnh 540×960 ×2 vào ./shots/
import { mkdirSync } from 'node:fs';
const { chromium } = await import('file:///C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs');
const list = process.argv.slice(2).length ? process.argv.slice(2) : [...Array(10).keys()].map(String).concat('end');
mkdirSync(new URL('./shots/', import.meta.url), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 540, height: 960 }, deviceScaleFactor: 2, reducedMotion: 'no-preference' });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
for (const s of list) {
  await page.goto(`http://localhost:5173/scripts/.tmp/video-gioi-thieu/?shot=${s}`);
  await page.waitForFunction(() => document.title === 'shot-ready', null, { timeout: 30000 });
  await page.waitForTimeout(2500);
  const f = new URL(`./shots/${s}.png`, import.meta.url).pathname.slice(1);
  await page.screenshot({ path: f });
  console.log(f);
}
await browser.close();
