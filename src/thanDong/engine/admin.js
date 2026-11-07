/**
 * Quyền trong trường quay: người thử (admin homework, bản dev, trình duyệt tự động) được bật "Phòng thử nội bộ" (`studio-g<lớp>-test`:
 * không cần đủ người, không cộng sao). Giữ trong sessionStorage của tab, đóng tab là về phòng thật.
 */
import { isAdminUser } from '../../engine/admin.js';

export { isAdminUser };
export const isTester = () => isAdminUser() || !!import.meta.env.DEV || !!navigator.webdriver;
const TEST_KEY = 'td-online-test';
export function testRoom() {
  if (!isTester()) return false;
  try { return sessionStorage.getItem(TEST_KEY) === '1'; } catch { return false; }
}
export function setTestRoom(on) {
  try { if (on) sessionStorage.setItem(TEST_KEY, '1'); else sessionStorage.removeItem(TEST_KEY); } catch { /* không có kho phiên */ }
}
