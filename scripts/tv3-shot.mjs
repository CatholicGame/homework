// Chụp trang thử Tiếng Việt 3: node scripts/tv3-shot.mjs "?w=1&solve=half&r=0" out.png [rộng] [cao] [full]
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);
const [query = '?w=1', out = 'tv3.png', w = '1100', h = '900', full = ''] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) }, reducedMotion: 'reduce' });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
page.on('console', m => { if ((m.type() === 'error' || m.type() === 'warning') && !m.text().includes('404')) console.log('CONSOLE', m.text()); });
await page.goto(`http://localhost:5173/scripts/tv3-dev.html${query}`);
await page.waitForFunction(() => document.title !== 'tv3 dev', null, { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(600);
console.log('title:', await page.title());
if (full === 'full') {
  // #app là vùng cuộn: nới khung nhìn bằng chiều cao nội dung
  const hh = await page.evaluate(() => document.getElementById('app').scrollHeight);
  await page.setViewportSize({ width: Number(w), height: Math.min(12000, hh) });
  await page.waitForTimeout(300);
}
await page.screenshot({ path: out });
await browser.close();
