/**
 * Chat trong phòng Gặp gỡ online (mọi khu: nhà thờ, Vatican, trường quay): ai cũng gõ được vài chữ cho cả phòng cùng thấy.
 * Mỗi lời hiện hai nơi: bong bóng trên đầu người nói (trên thẻ tên, vài giây rồi tắt) và khung chat chung (nút 💬 trong cột
 * bên trái, chấm đỏ đếm lời chưa đọc). Máy chủ phòng làm sạch (realtime/chatText.js: ký tự lạ, đường dẫn, số điện thoại, từ
 * tục) rồi gửi lại cho mọi người, kể cả người nói, nên ai cũng thấy cùng một bản. Mỗi 2 giây một lời; vào phòng thì thấy vài
 * lời gần nhất. Không có tin nhắn riêng.
 *
 * makeChat({ root, mount, net, actorOf(id), calm }) → { say, says, tick(camera), status(on), dispose }
 */
import * as THREE from 'three';
import { t } from '../engine/lang.js';
import { icon } from './icons.js';
import { CHAT_MAX, cleanChat } from '../../../realtime/chatText.js';

const LOG_MAX = 60;           // lời giữ trong khung chat
const LIFT = 0.5;             // m: từ xương head lên đỉnh đầu (như thẻ tên)
const at = new THREE.Vector3();

export function makeChat({ root, mount, net, actorOf, calm = false }) {
  // nút mở khung chat (cột trái) + khung chat (bên phải) + lớp bong bóng
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'ch-ic ch-chatbtn';
  btn.hidden = true;
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', t('Trò chuyện'));
  btn.title = t('Trò chuyện');
  btn.innerHTML = `${icon('chat')}<b class="ch-badge" hidden></b>`;
  mount.appendChild(btn);
  const badge = btn.querySelector('.ch-badge');

  const box = document.createElement('div');
  box.className = 'ch-chat';
  box.hidden = true;
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-label', t('Trò chuyện'));
  box.innerHTML = `<div class="ch-chat-head"><b>${t('Trò chuyện')}</b><span>${t('Cả phòng cùng thấy')}</span>
      <button type="button" class="ch-chat-x" aria-label="${t('Đóng')}" title="${t('Đóng')}">${icon('x')}</button></div>
    <ol class="ch-chat-log" aria-live="polite"></ol>
    <form class="ch-chat-form"><input type="text" maxlength="${CHAT_MAX}" enterkeyhint="send" autocomplete="off" placeholder="${t('Nhắn cho cả phòng…')}" aria-label="${t('Lời nhắn')}">
      <button type="submit" aria-label="${t('Gửi')}" title="${t('Gửi')}">${icon('send')}</button></form>`;
  root.appendChild(box);
  const log = box.querySelector('.ch-chat-log'), form = box.querySelector('form'), input = form.querySelector('input');
  // gõ phím / chạm trong khung không đi xuống cảnh (WASD điều khiển camera, kéo xoay)
  for (const el of [box, btn]) for (const ev of ['pointerdown', 'wheel', 'keydown', 'keyup']) el.addEventListener(ev, (e) => e.stopPropagation());

  const layer = document.createElement('div');
  layer.className = 'ch-bubs';
  layer.setAttribute('aria-hidden', 'true');
  root.appendChild(layer);

  let unread = 0, gone = false;
  const paintBadge = () => { badge.hidden = !unread; badge.textContent = unread > 9 ? '9+' : unread; };
  function open(on) {
    box.hidden = !on;
    btn.setAttribute('aria-expanded', on);
    btn.classList.toggle('is-on', on);
    if (on) {
      unread = 0; paintBadge();
      log.scrollTop = log.scrollHeight;
      placedAt = 0; place(performance.now());
      if (!matchMedia('(pointer: coarse)').matches) input.focus();
    } else input.blur();
  }
  btn.onclick = () => open(box.hidden);
  box.querySelector('.ch-chat-x').onclick = () => open(false);
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape') open(false); });
  let lastSent = 0;
  form.onsubmit = (e) => {
    e.preventDefault();
    const text = cleanChat(input.value);
    if (!text || !net.ready) return;
    if (performance.now() - lastSent < 1200) return;   // máy chủ cũng giới hạn: khỏi gửi lời sẽ bị bỏ
    lastSent = performance.now();
    net.say(text);
    input.value = '';
  };

  function line(id, name, text) {
    const li = document.createElement('li');
    const mine = id === net.id;
    li.className = mine ? 'is-me' : '';
    const who = document.createElement('b');
    who.textContent = mine ? t('Bạn') : (name || t('Một người'));
    const span = document.createElement('span');
    span.textContent = text;
    li.append(who, span);
    const stick = log.scrollTop + log.clientHeight >= log.scrollHeight - 8;
    log.appendChild(li);
    while (log.children.length > LOG_MAX) log.firstElementChild.remove();
    if (stick || mine) log.scrollTop = log.scrollHeight;
  }

  // bong bóng: một cái mỗi người (lời mới thay lời cũ), sống 4 s + theo độ dài, tối đa 10 s
  const bubs = new Map();   // id → { el, until }
  function bubble(id, text) {
    let b = bubs.get(id);
    if (!b) {
      const el = document.createElement('div');
      el.className = 'ch-bub';
      layer.appendChild(el);
      b = { el, until: 0 };
      bubs.set(id, b);
    }
    b.el.textContent = text;
    b.el.classList.remove('is-out');
    if (!calm) { b.el.classList.remove('is-pop'); void b.el.offsetWidth; b.el.classList.add('is-pop'); }
    b.until = performance.now() + Math.min(10000, 4000 + Array.from(text).length * 60);
  }

  // khung ở góc dưới phải (church.css); đang có câu hỏi (trường quay) thì đứng ngay trên dải câu hỏi, đo mỗi 0,2 s vì dải
  // cao thấp theo lúc (chưa / đã hiện đáp án, màn ngang thấp xếp một hàng); còn ít chỗ thì chỉ giữ đầu khung và ô gõ (is-tight)
  let placedAt = 0;
  function place(now) {
    if (box.hidden || now - placedAt < 200) return;
    placedAt = now;
    const ov = root.querySelector('.ch-qov');
    if (ov && !ov.hidden) {
      const top = (ov.querySelector('.ch-qov-box') || ov).getBoundingClientRect().top, r0 = root.getBoundingClientRect();
      const b = Math.round(r0.bottom - top + 10);
      box.style.setProperty('--chat-b', `${b}px`);
      box.classList.toggle('is-tight', r0.height - b - 64 < 170);
    } else {
      box.style.removeProperty('--chat-b');
      box.classList.remove('is-tight');
    }
  }

  return {
    /** Một lời mới của người id (cả lời của mình, máy chủ gửi lại). */
    say(id, name, text) {
      if (gone || typeof text !== 'string' || !text) return;
      line(id, name, text);
      bubble(id, text);
      if (box.hidden && id !== net.id) { unread++; paintBadge(); }
    },
    /** Vài lời gần nhất của phòng, lúc vừa vào: chỉ vào khung chat, không bong bóng, không tính chưa đọc. */
    says(list) {
      if (gone || !Array.isArray(list)) return;
      log.textContent = '';
      for (const [id, name, text] of list) if (typeof text === 'string') line(id, name, text);
    },
    /** Đặt bong bóng theo đầu từng người (sau khi camera và xương đã cập nhật khung hình này). */
    tick(camera) {
      const now = performance.now();
      place(now);
      if (!bubs.size) return;
      const w = root.clientWidth, h = root.clientHeight;
      for (const [id, b] of bubs) {
        if (now > b.until + 400) { b.el.remove(); bubs.delete(id); continue; }
        if (now > b.until) b.el.classList.add('is-out');
        const a = actorOf(id);
        if (!a || !a.root.visible) { b.el.style.visibility = 'hidden'; continue; }
        // có thẻ tên (người khác): bong bóng đứng ngay trên đỉnh thẻ, kể cả khi thẻ được nhấc lên bậc trên (nameTag.js declutter)
        const tag = a.tag?.sprite?.visible ? a.tag.sprite : null;
        if (tag) { at.copy(tag.position); at.y += tag.scale.y; }
        else {
          a.chatHead ||= a.root.getObjectByName('head') || a.root;
          a.chatHead.getWorldPosition(at);
          at.y += a.chatHead === a.root ? 1.9 : LIFT;
        }
        at.project(camera);
        if (at.z > 1 || Math.abs(at.x) > 1.2 || Math.abs(at.y) > 1.2) { b.el.style.visibility = 'hidden'; continue; }
        // trên thẻ tên: thẻ cao ít nhất ~5 % màn hình (nameTag.js)
        // người đứng sát mép: bong bóng không tràn ra ngoài màn (đuôi vẫn ở giữa bong bóng)
        const half = b.el.offsetWidth / 2 + 8;
        const x = Math.min(w - half, Math.max(half, (at.x + 1) / 2 * w)), y = (1 - at.y) / 2 * h - (tag ? 6 : 0.06 * h + 6);
        b.el.style.visibility = '';
        b.el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -100%)`;
      }
    },
    /** Có / mất kết nối máy chủ phòng: chỉ có nút khi đã nối. */
    status(on) {
      btn.hidden = !on;
      if (!on) { open(false); for (const b of bubs.values()) b.el.remove(); bubs.clear(); }
    },
    get isOpen() { return !box.hidden; },
    close() { open(false); },
    dispose() { gone = true; btn.remove(); box.remove(); layer.remove(); bubs.clear(); },
  };
}
