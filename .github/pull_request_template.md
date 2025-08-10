<!--
Lưu ý:
- Điền đầy đủ các mục dưới đây. Không xóa tiêu đề mục, có thể để trống nếu không áp dụng.
- Ưu tiên viết tiêu đề PR theo Conventional Commits (ví dụ: feat(cart): áp dụng voucher qua API verify).
-->

## Mục tiêu PR

- Mô tả ngắn gọn vấn đề và mục tiêu cần đạt được.
- Liên kết đến issue/ticket liên quan: Closes #, Relates #.

## Thay đổi chính

- [ ] Tính năng mới / Sửa lỗi / Refactor (chọn 1)
- Tóm tắt các thay đổi nổi bật (bullet points):
  - ...

## Ảnh chụp màn hình / Video (nếu là UI)

- Trước / Sau:
- Flow chính (gif/mp4):

## Cách kiểm thử (How to test)

- Bước 1: ...
- Bước 2: ...
- Kết quả mong đợi: ...
- Biến môi trường/secret cần có (nếu có): ...

## Checklist chất lượng

- Code
  - [ ] Tuân thủ detailed design đã phê duyệt
  - [ ] Đặt tên rõ ràng, không trùng lặp logic, xử lý lỗi hợp lý
  - [ ] Không hardcode secret/credential (dùng GitHub Secrets/env)
  - [ ] Có log ở mức cần thiết, không rò rỉ thông tin nhạy cảm
- UI/UX (nếu có)
  - [ ] Responsive cơ bản, trạng thái loading/empty/error
  - [ ] Ảnh/asset hợp lệ, i18n (nếu áp dụng), a11y cơ bản
  - [ ] Ảnh/video minh họa đã đính kèm
- Chất lượng kỹ thuật
  - [ ] ESLint/Prettier pass cục bộ
  - [ ] Unit test/Integration test (nếu có) xanh
  - [ ] Build pass cục bộ (Vite)
  - [ ] CI xanh (install, lint, test, build)
  - [ ] Không tăng bundle size bất hợp lý; cân nhắc code-splitting nếu cần
- Tài liệu
  - [ ] Cập nhật README/Docs/changelog (nếu có thay đổi public behavior)

## Ảnh hưởng & Rủi ro

- Phạm vi ảnh hưởng (module/tính năng): ...
- Breaking changes / Migration: ...
- Kế hoạch rollback: ...

## Ghi chú triển khai (Deploy notes)

- Bước triển khai / cấu hình cần thiết (nếu có): ...
- Feature flags / toggle (nếu có): ...

## Yêu cầu review

- Reviewer gợi ý: @...
- Điểm cần chú ý khi review: ...
