// Kiểm tra dữ liệu Bài tập cuối tuần Tiếng Việt 3 (cần `npm run dev` ở :5173): node scripts/tv3-check.mjs
// Chấm đáp án mỗi câu phải trọn điểm, bỏ trống không được đúng, câu trích có trong bài đọc, cụm gạch chân tìm thấy,
// tranh có trong tiengViet3/pics/*.js, chỗ trống chính tả có ít nhất 2 lựa chọn.
const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on('pageerror', e => errors.push('PAGEERROR ' + e.message));
await page.goto('http://localhost:5173/scripts/tv3-dev.html?check=1');
await page.waitForFunction(() => /^(OK|LỖI|ERR|REJ)/.test(document.title), null, { timeout: 20000 }).catch(() => {});
console.log(await page.evaluate(() => document.querySelector('pre')?.textContent || document.title));
for (const e of errors) console.log(e);
await browser.close();
