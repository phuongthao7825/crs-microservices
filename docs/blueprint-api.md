\# Blueprint API



\## auth-service (Cổng 8081, Prefix: /api/auth)

\- POST /auth/login - Đăng nhập, trả về JWT (Public)

\- POST /auth/register - Đăng ký tài khoản (Public)



\## course-service (Cổng 8082, Prefix: /api/courses)

\- GET /courses - Danh sách môn học, search \& phân trang (Public)

\- GET /courses/{id} - Chi tiết 1 môn học (Public)

\- POST /courses - Thêm môn học (ADMIN)

\- PUT /courses/{id} - Sửa môn học (ADMIN)

\- DELETE /courses/{id} - Xóa môn học (ADMIN)



\### API nội bộ (Chỉ gọi từ registration-service, KHÔNG qua Gateway)

\- PATCH /internal/courses/{id}/reserve-seat - Trừ số chỗ còn lại khi đăng ký

\- PATCH /internal/courses/{id}/release-seat - Hoàn trả 1 chỗ khi hủy đăng ký



\## registration-service (Cổng 8083, Prefix: /api/registrations)

\- POST /registrations - Đăng ký học phần (STUDENT)

\- GET /registrations/my - Danh sách đăng ký của tôi (STUDENT)

\- DELETE /registrations/{id} - Hủy đăng ký (STUDENT/ADMIN)

```\[cite: 1]



\---



Lưu file lại xong bạn báo mình để chuyển sang \*\*Bước 3: Tạo Database trên MySQL Workbench\*\* nhé\[cite: 1]!

