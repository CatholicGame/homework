/**
 * TikTok cho phụ huynh: Toán 4, Bài 3 Số chẵn, số lẻ (🏘️ Phố chẵn lẻ), phần Khám phá.
 *   node scripts/video/record.mjs scripts/video/scenes/g4-chan-le.mjs
 *
 * Thông điệp: con thuộc quy tắc nhưng có hiểu vì sao? App cho thấy bằng hình trước (xếp chấm từng đôi),
 * rồi mới rút ra mẹo (chữ số tận cùng); con tự tay làm, sai thì thầy nhắc cách nghĩ.
 * Vùng an toàn TikTok: chữ quan trọng tránh 20% đáy (chú thích, tên tài khoản) và cột nút bên phải.
 */

const EVEN = '#2563EB', ODD = '#EA580C';

export default {
  name: 'g4-chan-le',
  grade: 4,
  warm: ['grade4-tools'],
  viewport: { width: 432 },          // giống điện thoại đời mới: chữ gọn, hình to
  voice: 'vi-VN-NamMinhNeural',     // thầy Quang trong app
  narrator: 'vi-VN-HoaiMyNeural',   // người dẫn nói với phụ huynh
  css: `
    .v-hook, .v-outro { background: linear-gradient(170deg, #FEF3C7 0%, #FDE68A 45%, #BBF7D0 100%); color: #1E293B; justify-content: flex-start; padding: 64px 46px 0; gap: 12px; }
    .v-hook .v-k { font-size: 21px; font-weight: 800; line-height: 1.25; }
    .v-hook .v-rule { font-size: 19px; font-weight: 800; background: #fff; border: 3px solid #1E293B; border-radius: 16px; padding: 8px 12px; line-height: 1.3; }
    .v-hook .v-big { font-size: 40px; font-weight: 800; line-height: 1.05; color: #B91C1C; }
    .v-hook .v-em { font-size: 64px; line-height: 1; }
    .v-hook .v-sub { font-size: 18px; font-weight: 700; }
    .v-outro { padding-top: 40px; gap: 10px; }
    .v-outro .v-t { font-size: 27px; font-weight: 800; line-height: 1.1; }
    .v-outro ul { list-style: none; margin: 0; padding: 0; text-align: left; font-size: 16.5px; font-weight: 700; display: flex; flex-direction: column; gap: 7px; width: 100%; }
    .v-outro li { background: #fff; border: 3px solid #1E293B; border-radius: 14px; padding: 5px 10px; line-height: 1.25; }
    .v-outro .v-s { font-size: 15px; font-weight: 700; color: #334155; }
    #v-label { font-size: 16px; padding: 8px 14px; white-space: nowrap; max-width: none; }
    .v-hook .v-sub { white-space: nowrap; }
  `,
  async run(v) {
    // 1. Mở đầu: chạm đúng nỗi lo của bố mẹ (con học thuộc mà không hiểu)
    await v.card(`
      <div class="v-em">🤔</div>
      <div class="v-k">Con thuộc lòng:</div>
      <div class="v-rule">Tận cùng <span style="color:${EVEN}">0, 2, 4, 6, 8</span> là số chẵn</div>
      <div class="v-k">Nhưng con có hiểu</div>
      <div class="v-big">VÌ SAO?</div>
      <div class="v-sub">Xem cách thầy dạy bằng hình 👇</div>`,
    { cls: 'v-hook', say: 'Con thuộc lòng số chẵn là số tận cùng không, hai, bốn, sáu, tám. Nhưng con có hiểu vì sao không?', hold: 200 });
    await v.uncard();

    // 2. Đường vào: Lớp 4 → Học bằng công cụ → Bài 3 → Khám phá
    await v.label('Lớp 4 · 🧰 Học bằng công cụ');
    await v.tap('.game-card[data-game="grade4-tools"]', { after: 600 });
    await v.label('Bài 3: Số chẵn, số lẻ');
    await v.tap('.g4h-tile[data-n="3"]', { after: 600 });
    await v.label('🔎 Khám phá cùng thầy');
    await v.tap('[data-act="explore"]', { after: 300 });

    // 3. Thấy bằng hình trước: xếp chấm từng đôi (giữ 6 và 7 chấm)
    await v.label('👀 Hiểu vì sao: xếp từng đôi');
    await v.heard('7 chấm');
    v.cut((await v.heard({ sfx: 'ding' })).t + 1);
    // Bỏ 10, 13 chấm và câu "chia hết cho 2"; sang bước 2 (bấm Tiếp trong đoạn cắt).
    const tip = v.heard('Muốn biết một số chẵn hay lẻ');
    await v.tap('.g4-next.g4-ready', { after: 300 });
    await v.label('💡 Rồi mới rút ra mẹo');
    v.uncut((await tip).t);

    // 4. Con tự làm: lá thư 2049 (bỏ lời giới thiệu con phố và lá thư 152)
    const street = v.heard('Trên một con phố');
    await v.tap('.g4-next.g4-ready', { after: 300 });
    v.cut((await street).t);
    // Chạy trong trang: nút đáp án đúng (wrong = nút sai) của lá thư đang chờ.
    const choice = (wrong) => {
      const ex = window.__g4ex;
      if (!ex?.box?.isConnected) return null;
      const b = ex.box.querySelector(`.g4-choice[data-i="${wrong ? 1 - ex.index : ex.index}"]`);
      return b && !b.disabled ? b : null;
    };
    const letter = v.heard('hai nghìn không trăm bốn mươi chín');
    await v.tap(choice, { arg: false, after: 600 });     // 152: bên chẵn (bị cắt)
    await v.label('✋ Nhầm? Thầy nhắc cách nghĩ');
    v.uncut((await letter).t);
    await v.tap(choice, { arg: true, after: 3600 });     // 2049: thử chọn nhầm, nghe hết lời nhắc
    const right = v.heard({ sfx: 'ding' });
    await v.tap(choice, { arg: false, after: 300 });
    await v.label('');
    v.cut((await right).t + 700);                        // bỏ lá thư 3786
    const praise = v.heard('Giỏi lắm');
    await v.tap(choice, { arg: false, after: 300 });
    v.uncut((await praise).t);
    await v.waitFor('.g4-end');
    await v.wait(1800);

    // 5. Khung kết: vì sao con hiểu bài hơn
    await v.card(`
      <div class="v-t">Vì sao con hiểu bài hơn?</div>
      <ul>
        <li>👀 Thấy bằng hình, rồi mới học quy tắc</li>
        <li>✋ Con tự tay làm trên công cụ</li>
        <li>💡 Nhầm thì thầy nhắc cách nghĩ</li>
        <li>📖 Đúng bài, đúng trang SGK Toán 4</li>
      </ul>
      <div class="v-s">Toán Tiểu Học · Toán 4: 37 bài Tập Một</div>`,
    { cls: 'v-outro', say: 'Thấy bằng hình, con tự tay làm, nhầm thì được nhắc cách nghĩ. Con hiểu bài, không học vẹt.', hold: 3500 });
  },
};
