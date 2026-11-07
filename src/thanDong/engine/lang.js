/** Ai tài năng nhất: chỉ tiếng Việt (homework dịch tiếng Anh bằng engine/i18n.js riêng, trường quay chưa dịch). t() giữ chữ, thay {0} {1}…. */
export const getLang = () => 'vi';
export const isEnglish = () => false;
export function t(vi, ...args) {
  return args.length ? vi.replace(/\{(\d+)\}/g, (m, i) => (args[i] ?? m)) : vi;
}
