/**
 * Dò chữ tiếng Việt chưa có bản dịch tiếng Anh trong một sách Vở Bài Tập (engine renderWorkbook).
 *
 *   node scripts/i18n-crawl.mjs --book grade3-workbook --grade 3 --port 5301 [--units bai-1,bai-2] [--out missing.json]
 *
 * Tự chạy vite dev ở cổng --port, mở app ở chế độ khách + English, mở từng bài, lật qua từng câu
 * (và mở gợi ý), rồi in window.__i18nMissing (engine/i18n.js, chỉ có ở bản dev) theo từng bài.
 * Chữ trong hình SVG có tiền tố "[svg] ". Cần Playwright (npx cache, xem PW bên dưới).
 */

import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const PW = process.env.PLAYWRIGHT_MJS
  || 'C:/Users/MGUser/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright/index.mjs';
const { chromium } = await import(`file:///${PW.replace(/^\/+/, '')}`);

const args = {};
for (let i = 2; i < process.argv.length; i++) {
  const a = process.argv[i];
  if (!a.startsWith('--')) continue;
  const next = process.argv[i + 1];
  args[a.slice(2)] = next && !next.startsWith('--') ? (i++, next) : true;
}
const book = args.book;
const grade = Number(args.grade || 3);
const port = Number(args.port || 5301);
const only = args.units ? new Set(String(args.units).split(',')) : null;
if (!book) { console.error('--book <id> is required'); process.exit(1); }

const vite = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', '--port', String(port), '--strictPort'], {
  stdio: ['ignore', 'pipe', 'pipe'], shell: process.platform === 'win32',
});
const url = `http://localhost:${port}/`;
const killVite = () => { try { process.platform === 'win32' ? spawn('taskkill', ['/pid', String(vite.pid), '/T', '/F']) : vite.kill(); } catch { /* */ } };
process.on('exit', killVite);

for (let i = 0; i < 120; i++) {
  try { if ((await fetch(url)).ok) break; } catch { /* not ready */ }
  await new Promise(r => setTimeout(r, 500));
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1100, height: 900 } });
await page.addInitScript((g) => {
  localStorage.setItem('tth_guest', 'true');
  localStorage.setItem('tth_profile_guest', JSON.stringify({ setupDone: true, grade: g, name: 'Test', gender: 'boy', avatar: 'boys/boy1' }));
  localStorage.setItem('tth-lang', 'en');
}, grade);
page.on('pageerror', e => console.error('[pageerror]', e.message));
await page.goto(url);
await page.waitForFunction(() => typeof window.__navigate === 'function');

const settle = (ms = 250) => page.waitForTimeout(ms);
const takeMissing = () => page.evaluate(() => { const a = [...window.__i18nMissing]; window.__i18nMissing.clear(); return a; });

await page.evaluate((b) => window.__navigate(b), book);
await page.waitForSelector('.gw-unit-row[data-unit]:not([data-unit="all"])', { timeout: 20000 });
await settle(800);
const out = { menu: await takeMissing() };
const units = await page.$$eval('.gw-unit-row[data-unit]', els => els.map(e => e.dataset.unit).filter(u => u !== 'all'));

const save = () => { if (args.out) writeFileSync(args.out, JSON.stringify(out, null, 1)); };
async function crawlUnit(uid) {
  await page.evaluate(() => document.querySelectorAll('.cp-overlay').forEach(o => o.remove()));
  await page.evaluate((b) => window.__navigate(b), book);
  await page.waitForSelector(`.gw-unit-row[data-unit="${uid}"]`);
  // evaluate thay vì page.click: lớp phủ tô màu (colorPaint) có thể che hàng bài.
  await page.evaluate((u) => document.querySelector(`.gw-unit-row[data-unit="${u}"]`).click(), uid);
  await page.waitForSelector('.e3-q-text');
  const n = await page.$$eval('.e3-qitem', els => els.length);
  for (let i = 0; i < n; i++) {
    await page.evaluate((idx) => document.querySelector(`.e3-qitem[data-idx="${idx}"]`)?.click(), i);
    await settle();
    // Mở gợi ý / nút phụ để chữ bên trong hiện ra (không bấm Kiểm tra).
    await page.evaluate(() => document.querySelectorAll('details').forEach(d => { d.open = true; }));
    await page.evaluate(() => document.querySelectorAll('[class*="hint"] button, button[class*="hint"]').forEach(b => { if (!b.className.includes('cp-')) b.click(); }));
    await settle(400); // hình SVG tải + dịch bất đồng bộ
  }
  out[uid] = await takeMissing();
  console.error(`${uid}: ${n} câu, ${out[uid].length} chuỗi chưa dịch`);
}

for (const uid of units) {
  if (only && !only.has(uid)) continue;
  // Vite tải lại trang khi có tệp trong src/ đổi (agent khác đang ghi): thử lại tối đa 3 lần.
  for (let attempt = 1; ; attempt++) {
    try { await crawlUnit(uid); break; } catch (e) {
      if (attempt >= 3) { console.error(`${uid}: lỗi ${e.message}`); out[uid] = [`[crawl error] ${e.message}`]; break; }
      await page.waitForFunction(() => typeof window.__navigate === 'function', null, { timeout: 30000 }).catch(() => {});
      await page.evaluate(() => window.__i18nMissing?.clear()).catch(() => {});
    }
  }
  save();
}

await browser.close();
if (args.out) save(); else console.log(JSON.stringify(out, null, 1));
killVite();
process.exit(0);
