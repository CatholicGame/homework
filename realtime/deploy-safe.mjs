/**
 * Deploy máy chủ phòng (`npm run deploy` trong realtime/) CHỈ KHI không có người thật nào trong phòng (luật của chủ dự án,
 * 2026-11-10): deploy khởi động lại mọi Durable Object, ai đang ở sảnh chờ / đang thi / đang xem đều bị ngắt.
 *
 * Hỏi /status/<phòng> của mọi phòng app dùng (Đấu Trường arena-g1…5, Ai tài năng nhất studio-g1…5, cả phòng thử -test, khu
 * saigon; mỗi khoá thêm phòng tách ~2…~20). `here` = số kết nối thật (bạn ảo chạy trên máy chủ trò, không phải kết nối).
 * Còn người: không deploy (thoát mã 1). Không hỏi được phòng nào (mất mạng, sai địa chỉ): cũng không deploy.
 *   node deploy-safe.mjs            kiểm tra rồi deploy
 *   node deploy-safe.mjs --wait     còn người thì chờ, 1 phút hỏi lại một lần, phòng trống hết mới deploy
 *   node deploy-safe.mjs --check    chỉ kiểm tra
 * Địa chỉ máy chủ: biến ROOMS_URL hoặc VITE_ROOMS_URL (môi trường, ../.env.local, ../.env.production), wss:// hay https:// đều được.
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const WAIT = args.includes('--wait'), CHECK = args.includes('--check');
const INST_MAX = 20;   // src/thanDong/church/net.js ROOMS_MAX
const KEYS = [
  ...[1, 2, 3, 4, 5].flatMap(g => [`arena-g${g}`, `arena-g${g}-test`, `studio-g${g}`, `studio-g${g}-test`]),
  'saigon',
];

function roomsUrl() {
  let u = process.env.ROOMS_URL || process.env.VITE_ROOMS_URL || '';
  for (const f of ['.env.local', '.env.production', '.env']) {
    if (u) break;
    try { u = /^\s*VITE_ROOMS_URL\s*=\s*(\S+)/m.exec(readFileSync(join(import.meta.dirname, '..', f), 'utf8'))?.[1] || ''; } catch { /* không có tệp */ }
  }
  return u.replace(/^ws/, 'http').replace(/\/+$/, '');
}

/** [{ key, here, playing }] các phòng còn người thật; lỗi mạng thì ném. */
async function peopleIn(base) {
  const keys = KEYS.flatMap(k => Array.from({ length: INST_MAX }, (_, i) => (i ? `${k}~${i + 1}` : k)));
  const out = [];
  for (let i = 0; i < keys.length; i += 20) {
    await Promise.all(keys.slice(i, i + 20).map(async (k) => {
      const r = await fetch(`${base}/status/${k}`, { cache: 'no-store' });
      if (!r.ok) throw new Error(`/status/${k}: HTTP ${r.status}`);
      const s = await r.json();
      if ((s.here | 0) > 0 || (s.people | 0) > 0) out.push({ key: k, here: s.here | 0, playing: !!s.playing });
    }));
  }
  return out;
}

const base = roomsUrl();
if (!base) {
  console.error('Không biết địa chỉ máy chủ phòng: đặt ROOMS_URL=https://thandong-rooms.<tài khoản>.workers.dev rồi chạy lại. Không deploy.');
  process.exit(1);
}
for (;;) {
  let busy;
  try { busy = await peopleIn(base); } catch (e) {
    console.error(`Không hỏi được tình trạng phòng (${e.message}). Không deploy.`);
    process.exit(1);
  }
  if (!busy.length) break;
  console.log(`${new Date().toLocaleTimeString('vi-VN')} còn người thật trong phòng: ${busy.map(b => `${b.key} (${b.here} người${b.playing ? ', đang diễn' : ''})`).join(', ')}`);
  if (!WAIT) { console.error('Không deploy khi còn người thật trong phòng. Chạy lại với --wait để tự chờ phòng trống.'); process.exit(1); }
  await new Promise(r => setTimeout(r, 60e3));
}
console.log('Mọi phòng đều trống.');
if (CHECK) process.exit(0);
const r = spawnSync('npx', ['wrangler', 'deploy'], { cwd: import.meta.dirname, stdio: 'inherit', shell: true });
process.exit(r.status ?? 1);
