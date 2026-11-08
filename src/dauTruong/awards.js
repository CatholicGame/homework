/**
 * Thành tích Đấu Trường Nhí của em: mỗi lần được giấy chứng nhận (Quán quân, Á quân, Hạng ba, Hạng tư, Khán giả xuất sắc) là một
 * dòng { id, kind, name, grade, score, at, rounds?, right?, total?, demo? }. Lưu theo tài khoản (auth.scopedKey), cloudSync.js
 * đồng bộ khoá `dautruong-awards-v1` lên Firestore như tiến độ các sách. demo: nhận ở sân khấu thử (bản mẫu), vẫn xem được.
 */
import { scopedKey } from '../engine/auth.js';

const KEY = 'dautruong-awards-v1';
const MAX = 300;

/** Mọi lần đạt, mới nhất trước. */
export function loadAwards() {
  let list = [];
  try { list = JSON.parse(localStorage.getItem(scopedKey(KEY))) || []; } catch { /* hỏng: coi như chưa có */ }
  return Array.isArray(list) ? list.filter(a => a && a.kind && a.at).sort((a, b) => b.at - a.at) : [];
}

/** Thêm một lần đạt (trùng id thì bỏ qua). Trả dòng đã lưu. */
export function addAward(a) {
  const row = { id: a.id || `${a.at || Date.now()}-${a.kind}`, at: Date.now(), ...a };
  const list = loadAwards();
  if (list.some(x => x.id === row.id)) return row;
  list.unshift(row);
  try { localStorage.setItem(scopedKey(KEY), JSON.stringify(list.slice(0, MAX))); } catch { /* bộ nhớ đầy / bị chặn */ }
  window.dispatchEvent(new CustomEvent('tth:data-changed'));   // → cloudSync.js
  return row;
}
