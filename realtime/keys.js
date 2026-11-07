/** Khoá phòng từ đường dẫn /room/<khu>[~<số phòng>], ví dụ /room/saigon, /room/vatican-in~2. Sai dạng thì null. */
export function roomKey(path) {
  const m = /^\/room\/([a-z][a-z0-9-]{0,31}(?:~[1-9][0-9]?)?)$/.exec(path);
  return m ? m[1] : null;
}

/** Khoá phòng của đường đọc trạng thái /status/<khu>[~<số phòng>] (trang chủ hỏi trường quay có bao nhiêu người). */
export const statusKey = (path) => (path.startsWith('/status/') ? roomKey(`/room/${path.slice(8)}`) : null);
/** Trạng thái phòng trống (chưa ai vào, Durable Object chưa có phòng). */
export const EMPTY_STATUS = { people: 0, need: 0, playing: false, q: 0, queue: 0, here: 0, startIn: 0 };
