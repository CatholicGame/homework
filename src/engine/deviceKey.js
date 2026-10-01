/**
 * Mã máy cho chế độ khách: mỗi máy chỉ được một tài khoản dùng thử (leaderboard.js, guestDevices/{mã}).
 *
 * Băm các đặc điểm giống nhau giữa mọi trình duyệt / cửa sổ ẩn danh trên cùng một máy (loại máy,
 * hệ điều hành không kèm số phiên bản, màn hình, múi giờ, số nhân CPU, số điểm chạm) cộng mạng
 * đang dùng (/api/device băm địa chỉ IP) để hai máy cùng đời ở hai nhà khác nhau không trùng mã.
 * Không có máy chủ (chạy vite dev) thì chỉ dùng đặc điểm máy.
 */

import { describeDevice } from './voiceReport.js';

async function networkTag() {
  try {
    const res = await fetch('/api/device', { cache: 'no-store' });
    if (!res.ok) return '';
    return String((await res.json())?.net || '').slice(0, 64);
  } catch {
    return '';
  }
}

async function sha256Hex(text) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

let keyPromise = null;
/** @returns {Promise<string>} 32 ký tự hex, giống nhau ở mọi trình duyệt trên cùng máy, cùng mạng. */
export function deviceKey() {
  if (!keyPromise) {
    keyPromise = (async () => {
      const d = describeDevice();
      const { width, height, colorDepth } = screen;
      const parts = [
        d.device, d.model, d.os.replace(/[\d._]+/g, '').trim(),
        `${Math.max(width, height)}x${Math.min(width, height)}x${colorDepth}`,
        Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        navigator.hardwareConcurrency || 0,
        navigator.maxTouchPoints || 0,
        await networkTag(),
      ];
      return (await sha256Hex(parts.join('|'))).slice(0, 32);
    })().catch((e) => { keyPromise = null; throw e; });
  }
  return keyPromise;
}
