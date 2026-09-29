/**
 * Khung chung của một quầy Chợ phiên: cột khách (bong bóng + khách + máy tính tiền ngay cạnh khách) | quầy
 * (bảng hiệu + phần chơi riêng của quầy). Máy tính tiền luôn giữ chỗ trong cột khách (mờ đi khi chưa cần gõ số)
 * để bé chỉ nhìn một phía cho mọi thông tin, và quầy không đổi cỡ khi máy tính hiện ra.
 * Thẻ kết quả của loop.js bật lên đè đáy quầy (data-result-host).
 * Các lớp CSS g3f-* (styles.js) dùng chung cho mọi quầy.
 */

import { npcPic, cap } from '../npc.js';
import { flyOne } from '../fly.js';
import { keypad } from '../loop.js';

/**
 * Vẽ quầy vào `stage`. `counter` là HTML phần chơi riêng (cân, bàn đóng hộp…), đặt dưới bảng hiệu `sign`.
 * theme: đổi màu mái che / quầy (vd. 'lemon' — mái sọc vàng trắng của quầy nước chanh).
 * cameo: false — màn dọc không cho khách nhảy xuống đứng trên thẻ kết quả khi sai.
 * Trả về { counter, main, speak, row, ask, rest, nudge, fail, thanks } — rest(): máy tính tiền về nghỉ sau khi gõ xong.
 */
export function mountStall(stage, { npc, sign, counter, api, theme = '', cameo: withCameo = true }) {
  stage.innerHTML = `
    <div class="g3f-scene g3f-pad-idle animate-fadeIn${theme ? ` g3f-theme-${theme}` : ''}">
      <div class="g3f-awning"></div>
      <div class="g3f-customer">
        <div class="g3f-bubble"><span class="g3f-npc-name">${npc.name}</span><span class="g3f-say"></span></div>
        <div class="g3f-cust-row">
          <div class="g3f-npc">${npcPic(npc, 'wait')}</div>
          <div class="g3f-ask g3f-ask-idle" aria-hidden="true"></div>
        </div>
      </div>
      <div class="g3f-main" data-result-host>
        <div class="g3f-counter">
          <div class="g3f-sign">${sign}</div>
          ${counter}
        </div>
      </div>
    </div>`;
  const npcBox = stage.querySelector('.g3f-npc');
  new Image().src = npc.sad; // tải sẵn hình "không hài lòng" — lúc đổi hình không bị nháy trống
  const sayBox = stage.querySelector('.g3f-say');
  const main = stage.querySelector('.g3f-main');
  const askBox = stage.querySelector('.g3f-ask');
  // Máy tính tiền nghỉ (mờ, khoá) giữ sẵn chỗ — bé biết số sẽ gõ ở đâu, bố cục không nhảy khi tới bước tính.
  const scene = stage.querySelector('.g3f-scene');
  const rest = () => {
    main.classList.remove('g3f-asking');
    scene.classList.add('g3f-pad-idle');
    askBox.classList.add('g3f-ask-idle');
    askBox.classList.remove('g3f-await', 'g3f-typing');
    askBox.setAttribute('aria-hidden', 'true');
    const idlePad = keypad({ unit: '', onSubmit() {} });
    idlePad.lock();
    askBox.innerHTML = '<div class="g3f-bill g3f-bill-idle">🧾</div>';
    askBox.appendChild(idlePad.el);
  };
  rest();

  /** Bong bóng chỉ hiện câu ngắn (shown); giọng đọc nói cả câu. */
  const speak = (text, mood, shown) => {
    sayBox.innerHTML = shown || text;
    if (mood) npcBox.innerHTML = npcPic(npc, mood);
    api.say(text);
  };

  /** Một dòng hoá đơn: hình · nhãn · giá trị (q: dòng cần tìm, gạch trên). */
  const row = (pic, label, value, q) => `<div class="g3f-bill-row${q ? ' g3f-bill-q' : ''}"><span class="g3f-bill-pic">${pic}</span><span class="g3f-bill-label">${label}</span>${value}</div>`;

  /** Máy tính tiền cạnh quầy: tờ hoá đơn ngắn (hình + số) và bàn phím số. onSubmit(value, pad). */
  const ask = (bill, unit, onSubmit) => {
    main.classList.add('g3f-asking');
    scene.classList.remove('g3f-pad-idle');
    askBox.classList.remove('g3f-ask-idle');
    askBox.removeAttribute('aria-hidden');
    askBox.innerHTML = `<div class="g3f-bill">${bill}</div>`;
    const pad = keypad({ unit, onSubmit: (v) => onSubmit(v, pad) });
    askBox.appendChild(pad.el);
    // Kéo mắt bé về chỗ cần làm: ô "?" trên hoá đơn nhấp nháy tới khi bấm OK, màn số nhấp nháy tới khi gõ số đầu tiên.
    askBox.classList.add('g3f-await');
    askBox.classList.remove('g3f-typing');
    pad.el.addEventListener('click', (e) => { if (/^\d$/.test(e.target.closest('[data-k]')?.dataset.k || '')) askBox.classList.add('g3f-typing'); });
    const lock = pad.lock;
    pad.lock = (cls) => { askBox.classList.remove('g3f-await'); lock(cls); };
    return pad;
  };

  /** Nhắc bé nhìn sang máy tính tiền (vd. bấm vòi khi chưa tính xong): hoá đơn và bàn phím rung nhẹ, sáng lên. */
  const nudge = () => {
    askBox.classList.remove('g3f-nudge');
    void askBox.offsetWidth; // chạy lại hiệu ứng
    askBox.classList.add('g3f-nudge');
  };

  // Màn dọc: thẻ kết quả bật lên ở đáy quầy, xa chỗ khách đứng — khách (mặt buồn) nhảy xuống đứng ngay trên
  // thẻ và nhắc bé đọc cách làm. Bọc api.fail để mọi chỗ báo sai của các quầy đều có (kể cả gọi api.fail trực tiếp).
  const apiFail = api.fail;
  // withCameo: false — trò có chỗ kiểm chứng ngay trên thẻ (khay ra của máy biến hình): khách đứng yên ở trên.
  api.fail = (text, tip) => { apiFail(text, tip); if (withCameo) cameo(tip); };
  const cameo = (tip) => {
    if (!matchMedia('(orientation: portrait)').matches) return;
    const card = main.querySelector(':scope > .g3g-result');
    const pic = npcBox.querySelector('img');
    if (!card || !pic) return;
    const line = tip ? `${cap(npc.you)} xem cách làm ở dưới!` : `Lần sau ${npc.you} làm lại!`;
    const el = document.createElement('div');
    el.className = 'g3f-cameo';
    el.style.bottom = `${main.clientHeight - card.offsetTop - 6}px`;
    el.innerHTML = `<div class="g3f-cameo-pic">${npcPic(npc, 'sad')}</div><div class="g3f-cameo-say">${line}</div>`;
    // Khách cao theo khoảng trống phía trên thẻ (≈ 70%, 100–260px) — không bé tí trên màn to
    const h = Math.round(Math.max(100, Math.min(260, card.offsetTop * 0.7)));
    el.querySelector('.g3f-cameo-pic').style.height = `${h}px`;
    el.querySelector('.g3f-cameo-say').style.marginBottom = `${Math.round(h * 0.4)}px`; // bong bóng ngang miệng khách
    main.appendChild(el);
    const to = el.querySelector('.g3f-cameo-pic img');
    const land = () => {
      el.querySelector('.g3f-cameo-pic').innerHTML = npcPic(npc, 'sad'); // lắc đầu lúc vừa đáp
      el.classList.add('g3f-cameo-on');
      api.say(line, { queue: true });
    };
    const go = () => {
      const from = pic.getBoundingClientRect();
      pic.style.visibility = 'hidden';
      stage.querySelector('.g3f-scene').classList.add('g3f-npc-away'); // bong bóng trên thôi chỉ vào chỗ trống
      flyOne(`<img src="${npc.sad}" alt="" style="width:100%;height:100%;object-fit:contain;object-position:bottom;display:block">`,
        from, to.getBoundingClientRect(), { minMs: 550, maxMs: 850, onLand: land });
    };
    // Chờ hình mặt buồn tải xong mới đo khung đích (tải sẵn trong mountStall nên thường có ngay).
    if (to.complete) go(); else to.addEventListener('load', go, { once: true });
  };

  const fail = (text, tip) => {
    speak(`Ơ, hình như chưa đúng rồi ${npc.you} ơi.`, 'sad', 'Ơ, chưa đúng rồi…');
    api.fail(text, tip);
  };
  const thanks = () => {
    speak(`Cảm ơn ${npc.you}!`, 'happy');
    api.succeed(`${npc.name} rất hài lòng!`);
  };

  return { counter: stage.querySelector('.g3f-counter'), main, speak, row, ask, rest, nudge, fail, thanks };
}

/** Dấu "?" màu cam trên hoá đơn — chỗ bé cần tìm. */
export const Q = '<b class="g3f-q">?</b>';
