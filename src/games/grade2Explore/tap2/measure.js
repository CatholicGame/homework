/** Khám phá Bài 55 (Đề-xi-mét, mét, ki-lô-mét) và Bài 56 (Giới thiệu tiền Việt Nam). */

import { createRuler } from './ruler.js';
import { createMoney } from './money.js';
import { devDo } from './dev.js';
import { sleep } from '../../grade3Drills/kit.js';

const W = ['không', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín', 'mười'];

/** Em bấm lần lượt 10 ô / khúc / xe; mỗi lần sáng một ô với chữ text(i). */
async function lightAll(c, t, text, cap, nudge) {
  let busy = false;
  const go = async (i) => {
    const want = t.lit;
    if (busy || (i !== -1 && i !== want && !(t.seg(want)?.classList.contains('x2zr-road')))) {
      if (!busy) c.hint('Em bấm lần lượt từ trái sang phải.');
      return;
    }
    busy = true;
    await t.light(want, text(want));
    t.caption(cap(want + 1));
    busy = false;
    t.emit('done');
  };
  const off = t.on((ev, i) => { if (ev === 'seg') go(i); });
  devDo(() => go(t.lit));
  await c.until(t, () => t.lit >= 10 && !busy, { nudge, el: () => t.seg(t.lit) });
  off(); devDo(null);
}

// ── Bài 55: Đề-xi-mét. Mét. Ki-lô-mét ────────────────────────────────────────────────────────────────
const B55 = {
  title: 'Bài 55: Đề-xi-mét. Mét. Ki-lô-mét',
  setup: (board) => createRuler(board, { mode: 'cm' }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Băng giấy dài bao nhiêu xăng-ti-mét?');
      await c.say('Đặt băng giấy lên thước. Bấm lần lượt từng ô, mỗi ô dài 1 xăng-ti-mét.', 'Mỗi ô dài <b>1 cm</b>. Bấm lần lượt từng ô.');
      await lightAll(c, t, (i) => String(i + 1), (k) => `<span><b>${k} cm</b></span>`, 'Bấm vào ô trắng tiếp theo trên băng giấy.');
      t.bracket('1 dm');
      t.caption('<span><b>10 cm = 1 dm</b></span>');
      await c.say('Mười xăng-ti-mét là một đề-xi-mét. Đề-xi-mét viết tắt là d m.', '<b>10 cm = 1 dm</b> (đề-xi-mét)');
    },
    async (c) => {
      await c.say('Một đề-xi-mét bằng bao nhiêu xăng-ti-mét?', '1 dm = <b>?</b> cm');
      await c.choose(['1', '10', '100'], '10', { hint: 'Đếm số ô trên băng giấy.' });
      await c.say('Hai đề-xi-mét bằng bao nhiêu xăng-ti-mét?', '2 dm = <b>?</b> cm');
      await c.choose(['2', '12', '20'], '20', { hint: 'Mỗi đề-xi-mét là 10 cm: 10 cm và 10 cm nữa.' });
      c.t.caption('<span>1 dm = 10 cm · <b>2 dm = 20 cm</b></span>');
      await c.say('Đúng rồi. Hai đề-xi-mét bằng hai mươi xăng-ti-mét.');
    },
    async (c) => {
      const t = c.use((bd) => createRuler(bd, { mode: 'dm' }));
      t.caption('Cây gậy dài bao nhiêu đề-xi-mét?');
      await c.say('Cây gậy này gồm các khúc dài 1 đề-xi-mét. Bấm lần lượt từng khúc.', 'Mỗi khúc dài <b>1 dm</b>. Bấm lần lượt từng khúc.');
      await lightAll(c, t, () => '1 dm', (k) => `<span><b>${k} dm</b></span>`, 'Bấm vào khúc trắng tiếp theo.');
      t.bracket('1 m');
      t.caption('<span><b>10 dm = 1 m</b> · 1 m = 100 cm</span>');
      await c.say('Mười đề-xi-mét là một mét. Một mét cũng bằng một trăm xăng-ti-mét.', '<b>10 dm = 1 m</b>, <b>1 m = 100 cm</b>');
    },
    async (c) => {
      const t = c.use((bd) => createRuler(bd, { mode: 'km' }));
      t.caption('Từ nhà tới trường');
      await c.say('Bấm vào chiếc xe. Mỗi lần xe chạy thêm 100 mét.', 'Bấm vào xe: mỗi lần chạy thêm <b>100 m</b>.');
      await lightAll(c, t, () => '', (k) => `<span><b>${k === 10 ? '1 000' : k * 100} m</b></span>`, 'Bấm vào chiếc xe màu cam.');
      t.bracket('1 km');
      t.caption('<span><b>1 000 m = 1 km</b></span>');
      await c.say('Xe đã chạy một nghìn mét. Một nghìn mét là một ki-lô-mét, viết tắt là k m.', '<b>1 km = 1 000 m</b> (ki-lô-mét)');
    },
    async (c) => {
      await c.say('Chiếc bút chì dài khoảng 15 gì?', 'Chiếc bút chì dài khoảng 15 <b>?</b>');
      await c.choose(['cm', 'm', 'km'], 'cm', { hint: 'Bút chì ngắn, đo bằng thước kẻ.' });
      await c.say('Quãng đường từ Hà Nội đến Hải Phòng dài khoảng 100 gì?', 'Hà Nội đến Hải Phòng dài khoảng 100 <b>?</b>');
      await c.choose(['cm', 'm', 'km'], 'km', { hint: 'Quãng đường rất dài giữa hai thành phố đo bằng ki-lô-mét.' });
      await c.say('Đúng rồi. Đo vật ngắn dùng xăng-ti-mét, đề-xi-mét. Đo quãng đường dài dùng ki-lô-mét.');
    },
  ],
};

// ── Bài 56: Giới thiệu tiền Việt Nam ─────────────────────────────────────────────────────────────────
const say$ = (v) => (v === 1000 ? 'một nghìn' : `${W[v / 100]} trăm`);

/** Em đưa tiền lên khay cho tới khi ok(); quá nhiều thì nhắc lấy lại. devPlan: chỉ số các tờ đúng. */
async function payUntil(c, t, ok, { over, nudge, plan }) {
  let warned = false;
  const off = t.on((ev) => {
    if (ev !== 'pay') return;
    const o = over();
    if (o && !warned) { warned = true; c.hint(o); }
    if (!o) warned = false;
  });
  devDo(async () => {
    if (t.paid.length && over()) { await t.clearTray(); return; }
    const want = plan.find(v => t.paid.filter(x => x === v).length < plan.filter(x => x === v).length);
    if (want != null) { const i = t.noteIndex(want); if (i >= 0) t.pay(i); }
  });
  await c.until(t, ok, { nudge, el: () => t.root.querySelector('.x2zm-wallet') });
  off(); devDo(null);
  t.lock(true);
  await sleep(300);
}

const B56 = {
  title: 'Bài 56: Giới thiệu tiền Việt Nam',
  setup: (board) => createMoney(board, { wallet: [100, 200, 500, 1000] }),
  steps: [
    async (c) => {
      const t = c.t;
      t.caption('Các tờ tiền: <b>100</b>, <b>200</b>, <b>500</b>, <b>1 000</b> đồng');
      await c.say('Đây là các tờ tiền: một trăm đồng, hai trăm đồng, năm trăm đồng và một nghìn đồng.', 'Tờ <b>100</b>, <b>200</b>, <b>500</b> và <b>1 000</b> đồng');
      await c.say('Bấm vào tờ năm trăm đồng để đưa lên quầy.', 'Bấm vào tờ <b>500 đồng</b>.');
      t.lock(false);
      await payUntil(c, t, () => t.total === 500 && t.paid.length === 1, {
        over: () => (t.paid.some(v => v !== 500) ? 'Đó chưa phải tờ năm trăm đồng. Bấm tờ tiền trên quầy để lấy lại.' : ''), nudge: 'Tìm tờ có số 500.', plan: [500],
      });
      await c.say('Đúng rồi, tờ năm trăm đồng.');
    },
    async (c) => {
      const t = c.t;
      t.lock(false);
      await t.clearTray();
      t.setItem({ art: 'onion', name: 'Bó hành', price: 500 });
      t.caption('Mẹ mua hành hết <b>500 đồng</b>');
      await c.say('Mẹ đi chợ mua hành hết năm trăm đồng. Mẹ đưa đúng một tờ tiền. Em chọn tờ nào?', 'Mua hành hết <b>500 đồng</b>. Đưa <b>một tờ</b>.');
      await payUntil(c, t, () => t.total === 500, {
        over: () => (t.total > 500 || (t.paid.length && t.paid[0] !== 500) ? 'Chưa đúng. Nhìn số trên tờ tiền, cần đúng 500 đồng.' : ''), nudge: 'Chọn tờ có ghi 500.', plan: [500],
      });
      await c.say('Đúng rồi. Mẹ đưa tờ năm trăm đồng.');
    },
    async (c) => {
      const t = c.use((bd) => createMoney(bd, { wallet: [200, 500, 100, 200], item: { art: 'pencil', name: 'Bút chì', price: 700 } }));
      t.caption('Bút chì giá <b>700 đồng</b>');
      await c.say('Bút chì giá bảy trăm đồng. Em đưa các tờ tiền cho đủ bảy trăm đồng.', 'Đưa đủ <b>700 đồng</b>.');
      await payUntil(c, t, () => t.total === 700, {
        over: () => (t.total > 700 ? 'Nhiều hơn bảy trăm đồng rồi. Bấm tờ tiền trên quầy để lấy lại.' : ''), nudge: 'Năm trăm đồng thêm hai trăm đồng là bảy trăm đồng.', plan: [500, 200],
      });
      await c.say(`Đủ rồi: ${t.paid.map(say$).join(' và ')} là bảy trăm đồng.`, `${t.paid.join(' + ')} = <b>700</b> đồng`);
    },
    async (c) => {
      const t = c.use((bd) => createMoney(bd, { wallet: [500, 500, 200, 100] }));
      t.caption('<b>2</b> tờ <b>500 đồng</b>');
      await c.say('Bấm hai tờ năm trăm đồng đưa lên quầy.', 'Đưa <b>hai tờ 500 đồng</b> lên quầy.');
      await payUntil(c, t, () => t.total === 1000 && t.paid.length === 2, {
        over: () => (t.paid.some(v => v !== 500) ? 'Chỉ lấy các tờ năm trăm đồng thôi. Bấm tờ trên quầy để lấy lại.' : ''), nudge: 'Bấm hai tờ có ghi 500.', plan: [500, 500],
      });
      await c.say('Hai tờ năm trăm đồng bằng một tờ bao nhiêu đồng?', '500 + 500 = <b>?</b> đồng');
      await c.choose(['200', '500', '1 000'], '1 000', { hint: 'Năm trăm cộng năm trăm.' });
      await c.say('Hai tờ năm trăm đồng bằng một tờ một nghìn đồng.', '2 tờ 500 đồng = 1 tờ <b>1 000 đồng</b>');
    },
  ],
};

export const MEASURE_EXPLORES = { b55: B55, b56: B56 };
