// node shoot-tabs.mjs: ảnh dài (tối đa 2600 px CSS) từng mục của trang chủ lớp 3 (và vài lớp khác) vào ./app/<lớp>-<mục>-dai.png
const { chromium } = await import('file:///C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs');
const JOBS = [[3, ['learn', 'tiengviet', 'challenge', 'sticker']], [-1, ['learn']]];
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true, locale: 'vi-VN', reducedMotion: 'reduce' });
await ctx.route(/(firestore|identitytoolkit|securetoken|firebaseinstallations)\.googleapis\.com/, r => r.abort());
await ctx.addInitScript(() => {
  localStorage.setItem('tth_guest', 'true');
  if (!localStorage.getItem('tth_profile_guest')) localStorage.setItem('tth_profile_guest', JSON.stringify({ setupDone: true, grade: 3, name: 'Bé', gender: 'girl', avatar: 'girls/girl1' }));
});
const page = await ctx.newPage();
page.on('pageerror', e => console.log('PAGEERROR', e.message));
await page.goto('http://localhost:5173/');
await page.waitForFunction(() => typeof window.__navigate === 'function');
await page.waitForTimeout(1500);
for (const [g, tabs] of JOBS) {
  await page.evaluate((g) => {
    const k = 'tth_profile_guest';
    localStorage.setItem(k, JSON.stringify({ ...JSON.parse(localStorage.getItem(k)), grade: g }));
    window.__navigate('home');
  }, g);
  await page.waitForTimeout(1500);
  const ids = await page.evaluate(() => [...document.querySelectorAll('.hm-tab')].map(b => b.dataset.tab));
  console.log(g, ids.join(','));
  for (const want of tabs) {
    const id = ids.find(x => x.includes(want)) || ids.find(x => want === 'learn' && x === 'learn');
    if (!id) { console.log('  thiếu mục', want); continue; }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.click(`.hm-tab[data-tab="${id}"]`);
    await page.waitForTimeout(1600);
    const h = await page.evaluate(() => document.querySelector('#app').scrollHeight);
    await page.setViewportSize({ width: 390, height: Math.min(2600, h) });
    await page.waitForTimeout(400);
    const f = new URL(`./app/g${g}-${want}-dai.png`, import.meta.url).pathname.slice(1);
    await page.screenshot({ path: f, });
    console.log('  ', f, h);
  }
}
await browser.close();
