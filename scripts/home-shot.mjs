// Chụp trang chủ: node scripts/home-shot.mjs "?g=3" out.png [rộng] [cao] [full]
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);
const [query = '?g=3', out = 'home.png', w = '1280', h = '900', full = ''] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) }, reducedMotion: 'reduce' });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
page.on('console', m => { if (m.type() === 'error' && !m.text().includes('404')) console.log('CONSOLE', m.text()); });
await page.goto(`http://localhost:5173/scripts/home-dev.html${query}`);
await page.waitForFunction(() => document.title !== 'home dev', null, { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(1200);
console.log('title:', await page.title());
if (full === 'full') {
  const hh = await page.evaluate(() => Math.max(document.getElementById('app').scrollHeight, document.body.scrollHeight));
  await page.setViewportSize({ width: Number(w), height: Math.min(12000, hh) });
  await page.waitForTimeout(300);
}
await page.screenshot({ path: out });
await browser.close();
