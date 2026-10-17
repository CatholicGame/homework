// Chụp phim tranh Tiếng Việt 3: node scripts/tv3-film-shot.mjs <tuần> out.png [query thêm, vd "&l=1"] [rộng]
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);
const [w = '3', out = 'film.png', extra = '', width = '1200'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: Number(process.env.VH || 2800) }, reducedMotion: 'reduce' });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
page.on('console', m => { if (m.type() === 'error' || m.type() === 'warning') console.log('CONSOLE', m.text()); });
await page.goto(`http://localhost:5173/scripts/tv3-film-dev.html?w=${w}${extra}`);
await page.waitForFunction(() => document.title !== 'tv3 film', null, { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(1200);
console.log('title:', await page.title());
// cảnh ở dưới khung nhìn không được vẽ khi chụp fullPage: nới khung nhìn bằng cả trang
const hh = await page.evaluate(() => document.documentElement.scrollHeight);
await page.setViewportSize({ width: Number(width), height: Math.min(8000, hh) });
await page.waitForTimeout(600);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
