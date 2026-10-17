// Chụp trò 🔤 Luật chính tả: đầu lượt → bấm sai (giữa lượt) → bấm đúng hết (cuối lượt). node scripts/tv3-spell-shot.mjs <lv> <outPrefix> <w> <h>
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);
const [lv = '0', out = 'sp', w = '1900', h = '1000'] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: +w, height: +h }, reducedMotion: 'reduce' });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
await page.goto(`http://localhost:5173/scripts/games-preview.html?mod=tv3Spell.js&game=SPELL_GAME&lv=${lv}&h=1&mute=1`);
await page.waitForFunction(() => window.__g3drill, null, { timeout: 15000 });
await page.waitForTimeout(800);
console.log('item:', await page.evaluate(() => window.__g3drill.m.item));
await page.evaluate(() => window.__g3drill.wrong());
await page.waitForTimeout(700);
await page.screenshot({ path: `${out}-mid.png` });
for (let k = 0; k < 3; k++) { await page.evaluate(() => window.__g3drill.step()); await page.waitForTimeout(1600); }
await page.waitForTimeout(1500);
await page.screenshot({ path: `${out}-end.png` });
await browser.close();
