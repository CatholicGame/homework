# Người đang xem

Dòng "🟢 N người đang xem" ở đầu trang chủ, ngay dưới nút "Đổi lớp".

**N = số thật + số đệm.**

Mã: `src/engine/liveCount.js`. Gắn vào trang chủ trong `src/games/home.js` (`liveCountHtml`, `startLiveCount`). Kiểu chữ ở `src/styles/home.css` (`.home-live…`).

## Số đệm

Số đệm được tính từ đồng hồ theo giờ Việt Nam (UTC+7), không cần máy chủ. Vì vậy mọi máy cùng một thời điểm thấy cùng một số.

| Khung giờ | Ngày thường (T2–T6) | Thứ Bảy, Chúa Nhật |
|---|---|---|
| Giờ học | 17h30–22h: 100–200 | 9h–22h: 100–200 |
| Buổi trưa (phụ huynh vào xem) | 11h30–12h30: 30–60 | nằm trong giờ học |
| Giờ khác | 4–14 | 4–14 |

- **Lên xuống dần:** số tăng dần trong 45 phút trước giờ bắt đầu (vd. 16h45–17h30, 10h45–11h30, 8h15–9h) và giảm dần trong 45 phút sau giờ kết thúc (`RAMP`), không nhảy bậc.
- **Dao động:** trong mỗi khung số đi lên đi xuống trong khoảng của khung (vd. 100–200), cộng thêm ±1–2. Dao động dùng "nhiễu trơn" có hạt giống là mốc thời gian (một nút mỗi 40 giây, 90 giây, 7 phút và 25 phút; sóng 25 phút quyết định mức). Mỗi 5 giây số đổi nhiều nhất 2, không giật, và mọi máy nhích giống nhau.
- **Lệch giờ:** máy lệch giờ vài giây thì số chỉ lệch vài giây.

### Đổi mức số đệm

Sửa các hằng ở đầu `liveCount.js`:

```js
// [giờ bắt đầu, giờ kết thúc, số đệm thấp, cao] (17.5 = 17h30)
const PEAKS = {
  weekday: [[17.5, 22, 100, 200], [11.5, 12.5, 30, 60]],
  weekend: [[9, 22, 100, 200]],
};
const WEEKEND = [6, 0];   // thứ Bảy, Chúa Nhật
const QUIET = [4, 14];    // ngoài giờ đông người
const RAMP = 0.75;        // giờ lên / xuống dần
```

Muốn thêm một khung giờ đông người thì thêm một dòng vào `PEAKS`. Hai khung chồng nhau thì lấy khung cao hơn.


## Số thật

- Chỉ đếm người đã đăng nhập. Khách chưa đăng nhập vẫn thấy số, chỉ không được tính vào.
- **Ghi:** mỗi máy ghi `presence/{uid}` = `{ at: serverTimestamp }` mỗi 4 phút (`BEAT`), chỉ khi tab đang hiện, và ghi ngay khi quay lại tab.
- **Đếm:** dùng `getCountFromServer`, đếm các bản ghi có `at` trong 6 phút gần nhất (`WINDOW`).
- **Thời điểm đếm:** cứ 2 phút một lần (`COUNT_EVERY`), vào mốc chung của mọi máy (mốc chia hết cho 2 phút, cộng 3 giây), nên các máy cập nhật cùng lúc.
- **Khi không đếm được** (chưa đăng nhập, lỗi mạng, chạy webdriver): chỉ tính chính máy này là 1.
- **Màn hình** vẽ lại số mỗi 5 giây (`TICK`).

### Luật Firestore

Luật đã có trong `firestore.rules`. Sau khi sửa luật phải dán lại vào Firebase Console → Firestore Database → Rules → Publish.

```
match /presence/{uid} {
  allow read: if request.auth != null;
  allow write: if isOwner(uid) && request.resource.data.keys().hasOnly(['at'])
    && request.resource.data.at == request.time;
}
```

### Chi phí

- **Ghi:** mỗi người đang mở app ghi 15 lần mỗi giờ. Gói miễn phí của Firestore có 20.000 lượt ghi mỗi ngày, tức khoảng 1.300 giờ mở app mỗi ngày.
- **Đếm:** mỗi lần đếm tính 1 lượt đọc cho mỗi 1.000 bản ghi khớp. Mỗi máy đếm 30 lần mỗi giờ.

Bản ghi `presence` cũ không tự xoá. Chúng không làm sai số (đã lọc theo `at`), chỉ chiếm chỗ: mỗi tài khoản một bản ghi.

## Hiển thị

- **Khung:** viên thuốc nền tối, viền xanh lá phát sáng.
- **Con số:** to, đậm, màu xanh lá. Mỗi lần số đổi, nó loé vàng rồi thu về.
- **Chấm xanh:** nhấp nháy, có vòng sáng lan ra.
- **Khi máy bật giảm chuyển động:** chấm chỉ sáng lên mờ đi chậm (2,4 giây một nhịp), số đổi không phóng to.
- **Tiếng Anh:** "N watching now" (`src/i18n/en/ui.js`).

## Kiểm tra nhanh

In số đệm theo giờ trong ngày, chạy bằng node. Trước khi chạy phải bỏ dòng `import` ở đầu `liveCount.js` (`sed '/^import /d'`), vì `leaderboard.js` cần `import.meta.env` của Vite:

```js
const day = Date.UTC(2026, 10, 1) - 7 * 3600e3; // 0h Chúa Nhật 1/11/2026 giờ Việt Nam
for (let h = 0; h < 24; h++) console.log(h, buffer(day + h * 3600e3));
```
