\# Thiết kế Biên giới Service



\## 1. Danh sách Service

\- api-gateway (Cổng 8080 | Không DB): Điểm vào duy nhất, định tuyến, xác thực sơ bộ, CORS.

\- auth-service (Cổng 8081 | DB: auth\_db): Quản lý User, Student, đăng nhập, sinh/xác thực JWT.

\- course-service (Cổng 8082 | DB: course\_db): Quản lý Course, tìm kiếm, phân trang, quản lý số chỗ.

\- registration-service (Cổng 8083 | DB: registration\_db): Quản lý Registration, gọi sang course-service để đăng ký.



\## 2. Nguyên tắc sở hữu dữ liệu (Data Ownership)

\- Mỗi service sở hữu DATABASE RIÊNG, KHÔNG service nào được truy cập trực tiếp DB của service khác.

\- Muốn lấy/thay đổi dữ liệu của service khác bắt buộc PHẢI gọi REST API sang service đó.

\- Ví dụ: registration-service KHÔNG chứa bảng Course, chỉ lưu courseId (kiểu số, không có khóa ngoại thật kết nối DB).



\## 3. Bảng định tuyến Gateway (Dự kiến)

\- /api/auth/\*\* -> http://localhost:8081 (Public login, phần còn lại cần JWT)

\- /api/courses/\*\* -> http://localhost:8082 (GET public, POST/PUT/DELETE cần role ADMIN)

\- /api/registrations/\*\* -> http://localhost:8083 (Cần JWT STUDENT/ADMIN)

\- /api/public/courses -> http://localhost:8082 (Dùng API Key dành cho đối tác)

```\[cite: 1]



\---

