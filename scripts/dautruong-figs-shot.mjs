// Chụp trang xem trước câu có hình của Đấu Trường Nhí (cần `npm run dev` ở cổng 5173):
//   node scripts/dautruong-figs-shot.mjs <lớp> <kd|tt|vd> out.png [from=0] [n=12] [all=0]
// Ảnh gồm từng câu (màn LED 1600 × 760 thu nhỏ) và 4 phương án bên dưới (ô xanh lá là đáp án đúng, câu xếp: thứ tự đúng 1 → 4).
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);
const [g = '3', r = 'tt', out = 'dt-figs.png', from = '0', n = '12', all = '0'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1400, height: 1200 }, deviceScaleFactor: 1 });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
page.on('console', m => { if (m.type() === 'error') console.log('CONSOLE', m.text()); });
await page.goto(`http://localhost:5173/scripts/dautruong-figs.html?g=${g}&r=${r}&from=${from}&n=${n}&all=${all}${process.env.FILE ? `&file=${process.env.FILE}` : ''}`);
await page.waitForFunction(() => document.title.startsWith('dt figs '), null, { timeout: 20000 }).catch(() => console.log('timeout'));
console.log(await page.title());
const hh = await page.evaluate(() => document.documentElement.scrollHeight);
await page.setViewportSize({ width: 1400, height: Math.min(9000, hh) });
await page.waitForTimeout(300);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
