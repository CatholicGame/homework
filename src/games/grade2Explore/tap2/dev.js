/** DEV: hành động đúng tiếp theo của bước đang chờ (trang tự chạy scripts/.tmp/x2zg-auto.html gọi window.__x2bdo). */
export const devDo = (fn) => { if (import.meta.env.DEV) window.__x2bdo = fn || null; };
