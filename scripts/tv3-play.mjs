// Thử thao tác gạch chân Tuần 1 câu 6: kéo thước tới hàng 1, kẻ dưới "Ngôi trường"; hàng 2 kẻ 2 gạch "mong đợi".
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);
const out = process.argv[2] || 'play.png';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 900 }, hasTouch: false });
page.on('pageerror', e => console.log('PAGEERROR', e.message));
await page.goto('http://localhost:5173/scripts/tv3-dev.html?w=1');
await page.waitForFunction(() => document.title === 'ready');
const q = page.locator('#tvq-6');
await q.scrollIntoViewIfNeeded();
const box = async (sel) => (await q.locator(sel).first().boundingBox());
const word = async (i) => (await q.locator(`.tvu-w[data-i="${i}"]`).boundingBox());
// 1) chạm vào chữ khi chưa có thước → nhắc
let w0 = await word(0);
await page.mouse.click(w0.x + 5, w0.y + w0.height / 2);
console.log('hint:', await q.locator('.tv-hint').textContent().catch(() => '-'));
// 2) kéo thước từ khay tới dưới hàng 1
const dock = await box('.tvu-dock');
await page.mouse.move(dock.x + 20, dock.y + dock.height / 2);
await page.mouse.down();
await page.mouse.move(w0.x + 40, w0.y + w0.height + 6, { steps: 8 });
await page.mouse.up();
console.log('ruler visible:', await q.locator('.tvu-ruler').isVisible());
// 3) kẻ từ đầu "Ngôi" tới cuối "trường"
w0 = await word(0); const w1 = await word(1);
await page.mouse.move(w0.x + 1, w0.y + w0.height + 2);
await page.mouse.down();
await page.mouse.move(w1.x + w1.width - 2, w1.y + w1.height + 2, { steps: 10 });
await page.mouse.up();
// 4) đổi sang bút 2 gạch, đặt thước hàng 2, kẻ "mong đợi" (chữ 5, 6)
await q.locator('.tvu-pen[data-pen="2"]').click();
const w5 = await word(5); const w6 = await word(6);
const grip = await box('.tvu-ruler .tvu-grip');
await page.mouse.move(grip.x + 5, grip.y + 5);
await page.mouse.down();
await page.mouse.move(w5.x, w5.y + w5.height + 6, { steps: 8 });
await page.mouse.up();
await page.mouse.move(w5.x + 1, w5.y + w5.height + 2);
await page.mouse.down();
await page.mouse.move(w6.x + w6.width - 2, w6.y + w6.height + 2, { steps: 10 });
await page.mouse.up();
const store = await page.evaluate(() => Object.entries(localStorage).filter(([k]) => k.startsWith('tv3w-v1')).map(([, v]) => v)[0]);
console.log('answer q6:', JSON.stringify(JSON.parse(store)['tuan-1'].draft[6]));
await page.waitForTimeout(300);
await q.screenshot({ path: out });
await browser.close();
