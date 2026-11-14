// Chạy cả video trong trình duyệt (có giọng mp3), ghi lỗi và thời lượng; "rec" quay webm 540×960 vào ./shots/
const { chromium } = await import('file:///C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs');
const browser = await chromium.launch({ args: ['--autoplay-policy=no-user-gesture-required'] });
const ctx = await browser.newContext({ viewport: { width: 540, height: 960 }, recordVideo: process.argv[2] === 'rec' ? { dir: new URL('./shots/', import.meta.url).pathname.slice(1), size: { width: 540, height: 960 } } : undefined });
const page = await ctx.newPage();
page.on('pageerror', e => console.log('PAGEERROR', e.message));
page.on('console', m => console.log('CONSOLE', m.type(), m.text()));
await page.goto('http://localhost:5173/scripts/.tmp/video-gioi-thieu/');
await page.waitForTimeout(1500);
await page.click('#go');
await page.waitForEvent('console', { predicate: m => m.text().startsWith('video xong'), timeout: 300000 });
await ctx.close(); await browser.close();
