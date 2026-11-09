/**
 * Giọng MC Azure của Đấu Trường Nhí bật / tắt (trang admin, tab 🎙️ Giọng MC). Firestore `config/voice`: { mcAzure, updatedAt },
 * ai cũng đọc được, chỉ admin ghi (firestore.rules). Chưa có bản ghi = bật. api/tts.js đọc cùng bản ghi qua REST: tắt thì
 * không gọi Azure nữa (câu đã có trên R2 vẫn phát), máy học sinh dùng giọng của máy.
 */
import { firebaseSession } from './leaderboard.js';

const REST = 'https://firestore.googleapis.com/v1/projects/mathtieuhoc/databases/(default)/documents/config/voice';

/** Đang bật giọng Azure không (đọc lỗi: coi như bật). */
export async function isMcAzureOn() {
  try {
    const r = await fetch(REST, { cache: 'no-store' });
    if (r.status === 404) return true;
    const j = await r.json();
    return j?.fields?.mcAzure?.booleanValue !== false;
  } catch { return true; }
}

/** (Admin) bật / tắt giọng Azure. */
export async function setMcAzureOn(on) {
  const fb = await firebaseSession();
  if (!fb) throw new Error('need-connect');
  const { db, fs } = fb;
  await fs.setDoc(fs.doc(db, 'config', 'voice'), { mcAzure: !!on, updatedAt: fs.serverTimestamp() });
}
