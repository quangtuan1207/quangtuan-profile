# 🚀 Hướng Dẫn Tùy Chỉnh ProFile Website & Đăng Ký Tên Miền .XYZ + Hosting Miễn Phí

Chào bạn! Dự án này đã được xây dựng hoàn chỉnh với giao diện **Cyber Luxury Dark Aesthetic** siêu đẹp, hiện đại và mượt mà giống hệt trang `duongtran.xyz`.

---

## 🛠️ 1. Hướng Dẫn Tùy Chỉnh Thông Tin Cá Nhân

Bạn có thể dễ dàng sửa đổi thông tin của mình bằng cách mở các file trong dự án:

### 1.1 Sửa đổi nội dung chữ & Liên kết trong `index.html`:
- **Đổi Tên & Tiểu sử**: Mở file `index.html`, tìm các thẻ `<h1>Quang Tuấn</h1>`, địa điểm `Đồng Nai, Việt Nam`, đoạn mô tả `Một người bình thường...` và sửa thành thông tin của bạn.
- **Đổi các Tag sở thích**: Sửa trong khối `<div class="interest-tags">`.
- **Đổi Link Mạng Xã Hội**: Tìm khối `<div class="social-links-grid">` và thay đổi các đường link `href="https://..."` thành trang cá nhân Facebook, TikTok, Instagram, GitHub,... của bạn.
- **Đổi Link Discord Server**: Tìm khối `<div class="discord-server-card">` và thay link nút `Join` thành link mời Discord server của bạn.

### 1.2 Sửa đổi Nhạc & ID Discord trong `script.js`:
- **Đổi ID Discord trạng thái thời gian thực**:
  Mở file `script.js`, tìm dòng `DISCORD_USER_ID: "..."` ở đầu file và dán ID tài khoản Discord của bạn vào (Lấy ID bằng cách bật Developer Mode trong Discord -> Chuột phải vào tên bạn -> Copy User ID).
- **Đổi Bài Hát**:
  Tìm mảng `PLAYLIST: [...]` trong `script.js` để thêm/sửa tên bài hát và đường link file nhạc `.mp3`.
- **Đổi các câu gõ chữ tự động**:
  Tìm mảng `TYPING_QUOTES: [...]` để thay đổi các câu hiển thị trong ô status.

---

## 🌐 2. Hướng Dẫn Đăng Ký Tên Miền `.XYZ`

### 2.1 Mua tên miền `.xyz` ở đâu rẻ nhất?
Tên miền `.xyz` là tên miền quốc tế cực kỳ phổ biến cho bio profile cá nhân.
- Các nhà cung cấp tên miền uy tín rẻ nhất (năm đầu chỉ từ **0.99$ - 1.5$** ~ **25.000đ - 40.000đ**):
  1. **Namecheap.com**: Tìm tên miền bạn thích (ví dụ `tenban.xyz`), thêm vào giỏ hàng và thanh toán bằng thẻ Visa/Mastercard/PayPal.
  2. **Porkbun.com**: Rất rẻ và hỗ trợ SSL miễn phí, giao diện quản lý đơn giản.
  3. **Hostinger.vn**: Có hỗ trợ thanh toán qua MoMo/Mã QR Ngân hàng Việt Nam vô cùng tiện lợi.

### 2.2 Nhận tên miền miễn phí (FREE):
- Nếu bạn là **Học sinh / Sinh viên** có Email trường đuôi `.edu`: Hãy đăng ký gói **GitHub Student Developer Pack** (https://education.github.com/pack). Bạn sẽ nhận được tên miền miễn phí 1 năm từ Namecheap hoặc Name.com (`.me`, `.tech`, `.live`,...).

---

## 🚀 3. Hướng Dẫn Treo Web (Hosting) Miễn Phí 100%

### Cách 1: Treo Web bằng Vercel (Kéo thả siêu nhanh - Khuyên dùng)
1. Truy cập [https://vercel.com/](https://vercel.com/) và đăng ký/đăng nhập bằng tài khoản GitHub hoặc Google.
2. Vào trang Dashboard -> Bấm **Add New** -> Chọn **Project**.
3. Chọn **Upload** thư mục dự án `profire` từ máy tính lên.
4. Bấm **Deploy** -> Chỉ sau 10 giây, bạn sẽ có ngay link web online vĩnh viễn dạng `tenbanchon.vercel.app`.

### Cách 2: Treo Web bằng GitHub Pages
1. Tạo một tài khoản trên [GitHub.com](https://github.com/).
2. Tạo một Repository mới với tên bất kỳ (ví dụ: `my-profile`).
3. Tải tất cả các file (`index.html`, `style.css`, `script.js`) lên Repository đó.
4. Vào mục **Settings** của Repository -> Chọn **Pages** ở cột bên trái -> Tại mục **Branch**, chọn `main` và bấm **Save**.
5. Đợi 1-2 phút, web của bạn sẽ online tại đường link: `https://tentaikhoan.github.io/my-profile/`.

---

## 🔗 4. Hướng Dẫn Trỏ Tên Miền `.XYZ` Vào Web (Custom Domain)

Sau khi đã mua tên miền `.xyz` và treo web trên Vercel hoặc GitHub Pages, bạn trỏ tên miền về như sau:

### Trỏ tên miền trên Vercel:
1. Vào dự án của bạn trên Vercel -> Vào **Settings** -> **Domains**.
2. Nhập tên miền `.xyz` của bạn vào (ví dụ: `tenban.xyz`) -> Bấm **Add**.
3. Vercel sẽ hiển thị các bản ghi DNS cần cài đặt.
4. Mở trang quản trị tên miền `.xyz` bạn đã mua (ví dụ Namecheap/Hostinger), vào phần **DNS Management**:
   - Thêm bản ghi **A Record**: Host `@` -> Value `76.76.21.21`
   - Thêm bản ghi **CNAME Record**: Host `www` -> Value `cname.vercel-dns.com`
5. Đợi 5 - 15 phút để hệ thống cập nhật DNS, trang web `.xyz` của bạn sẽ chính thức hoạt động!
