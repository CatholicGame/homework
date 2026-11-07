/** Lịch ván theo giờ (kinh-thanh: Firestore events). Ai tài năng nhất chưa có lịch: không có ván hẹn giờ nào. */
export const eventsCached = async () => [];
export const nextOf = () => null;
const pad = (n) => String(n).padStart(2, '0');
export function hhmmVn(ms) { const d = new Date(ms + 7 * 3600e3); return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`; }
export const whenVn = (ms) => hhmmVn(ms);
export function leftText(ms) { const m = Math.max(0, Math.round(ms / 60000)); return m >= 60 ? `${Math.floor(m / 60)} giờ ${m % 60} phút` : `${m} phút`; }
