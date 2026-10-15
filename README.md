# 🎮 Pixel Mystery Quiz - Trắc Nghiệm Mảnh Ghép Pixel

Ứng dụng web trắc nghiệm tương tác phong cách **Retro Arcade 8-Bit**, nơi mỗi câu trả lời đúng sẽ tô màu và lật mở dần từng mảnh ghép pixel của một bức tranh thông điệp bí ẩn!

---

## ✨ Tính Năng Nổi Bật

1. **Cơ Chế Mảnh Ghép Pixel Bí Ẩn (Pixel Reveal)**:
   - Ban đầu bức tranh là lưới ô vuông bóng mờ bí ẩn.
   - Mỗi câu trả lời đúng sẽ tính toán tỷ lệ và kích hoạt hiệu ứng bừng sáng, bung nảy (pop & glow) tô màu thật cho một nhóm ô pixel.
   - Hoàn thành bộ câu hỏi sẽ mở khóa 100% tác phẩm nghệ thuật pixel rực rỡ.

2. **Hệ Thống Gameplay & Thưởng Điểm**:
   - Tính điểm cơ bản kèm hệ số nhân chuỗi đúng liên tiếp (**Streak Combo** 🔥 x2, x3...).
   - Hiệu ứng pháo hoa giấy ăn mừng (**Confetti**) phủ kín màn hình bằng HTML5 Canvas khi chiến thắng.
   - Bảng tổng kết vinh danh: Tổng điểm, tỷ lệ chính xác, chuỗi đúng dài nhất.
   - Hỗ trợ tải bức tranh pixel đã hoàn thành về máy tính dạng file ảnh PNG chất lượng cao.

3. **Âm Thanh Điện Tử 8-Bit Sống Động (Web Audio API)**:
   - Tự động tổng hợp âm thanh bằng Web Audio API ngay trong trình duyệt:
     - 🔔 Tiếng chuông hợp âm trong trẻo khi trả lời ĐÚNG.
     - 💥 Tiếng buzz điện tử khi trả lời SAI.
     - ✨ Tiếng chime ngân vang khi đạt chuỗi STREAK liên tiếp.
     - 🎺 Bản nhạc khải hoàn (Fanfare) khi CHIẾN THẮNG.
   - **Ưu điểm**: Không cần tải bất kỳ file mp3/wav nào bên ngoài, hoạt động 100% mượt mà khi mất mạng và không bị lỗi CORS trình duyệt. Có nút Bật/Tắt âm thanh tiện lợi.

4. **Studio Quản Lý Câu Hỏi & Tự Động Pixel Hóa Ảnh (Image & Quiz Studio)**:
   - **Tải ảnh cá nhân**: Người dùng có thể chọn bất kỳ ảnh nào từ máy tính (ảnh chân dung, logo, ảnh kỷ yếu...). Thuật toán Canvas sẽ tự động co tỷ lệ và biến ảnh thành tranh pixel theo kích thước lưới bạn chọn (12x12, 16x16, 20x20, 24x24).
   - **Soạn thảo câu hỏi**: Dễ dàng thêm mới, sửa đổi nội dung, 4 phương án, chọn đáp án đúng và thêm phần giải thích.
   - **Lưu trữ tự động**: Tự động lưu mọi thay đổi vào `localStorage` của trình duyệt, không lo mất dữ liệu khi tải lại trang.
   - **Xuất / Nhập JSON**: Chia sẻ toàn bộ bộ câu hỏi và tranh cho học sinh, đồng nghiệp, bạn bè qua 1 file JSON duy nhất.

5. **Giao Diện Hiện Đại & Thân Thiện**:
   - Thiết kế kết hợp giữa Cyberpunk/Arcade hoài niệm và Glassmorphism tinh tế.
   - Tương thích tốt trên cả máy tính (Desktop) và điện thoại di động (Responsive).
   - Hỗ trợ phím tắt bàn phím: Bấm phím **1, 2, 3, 4** hoặc **A, B, C, D** để chọn đáp án, bấm **Enter / Space** để sang câu tiếp theo.

---

## 🚀 Cách Chạy Trực Tiếp Trên Máy Tính

Không cần cài đặt Node.js hay bất kỳ công cụ phức tạp nào:
- Cách 1: Nhấp đúp chuột trực tiếp vào file `index.html` để mở trong trình duyệt Chrome, Edge, Firefox hoặc Safari.
- Cách 2: Nếu có tiện ích mở rộng Live Server trong VS Code, nhấp chuột phải vào `index.html` và chọn **Open with Live Server**.

---

## 🌐 Hướng Dẫn Đưa Lên GitHub Pages (Miễn Phí)

Dự án đã được cấu hình sẵn cấu trúc tệp tĩnh chuẩn để đưa lên GitHub Pages chỉ trong 3 bước:

### Bước 1: Khởi tạo Git và Push mã nguồn lên GitHub
Nếu bạn đã tạo một Repository mới trên tài khoản GitHub của mình (ví dụ tên là `pixel-mystery-quiz`), hãy mở Terminal tại thư mục này và chạy các lệnh:

```bash
# Thêm toàn bộ file vào git
git add .
git commit -m "Initial commit: Pixel Mystery Quiz web app"

# Đổi nhánh chính thành main
git branch -M main

# Liên kết với repo GitHub của bạn (thay URL bằng repo của bạn)
git remote add origin https://github.com/<tai-khoan-cua-ban>/<ten-repo>.git

# Đẩy code lên GitHub
git push -u origin main
```

### Bước 2: Kích hoạt GitHub Pages
1. Truy cập vào trang Repository của bạn trên GitHub.
2. Nhấp vào tab **Settings** (Cài đặt) ở thanh menu trên cùng.
3. Ở cột bên trái, tìm và chọn mục **Pages** (dưới nhóm *Code and automation*).
4. Tại mục **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`.
   - **Branch**: Chọn nhánh `main` và thư mục `/ (root)`.
5. Nhấp nút **Save**.

### Bước 3: Truy cập trang web
Sau khoảng 1 - 2 phút, GitHub sẽ hoàn tất triển khai và cung cấp đường link công khai có dạng:
`https://<tai-khoan-cua-ban>.github.io/<ten-repo>/`

Bạn có thể gửi đường link này cho bất kỳ ai để cùng chơi và trải nghiệm!
