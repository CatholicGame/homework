/** Chia sẻ đường dẫn mời bạn vào trường quay: hộp chia sẻ của máy, không có thì chép vào bộ nhớ tạm. Trả 'shared' | 'copied' | ''. */
export async function share({ title, text, url }) {
  try { if (navigator.share) { await navigator.share({ title, text, url }); return 'shared'; } } catch (e) { if (e?.name === 'AbortError') return ''; }
  try { await navigator.clipboard.writeText([text, url].filter(Boolean).join(' ')); return 'copied'; } catch { return ''; }
}
