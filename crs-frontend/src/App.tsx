import { useState } from 'react';
import { useCourses } from './api/useCourses';
import { SearchBox } from './components/SearchBox';
import { CourseList } from './components/CourseList';

export function App() {
  const [keyword, setKeyword] = useState('');
  const { courses, loading, error, refetch } = useCourses('');

  // Hàm loại bỏ dấu tiếng Việt để tìm kiếm chính xác hơn
  const removeAccents = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'D');
  };

  // Lọc danh sách môn học theo từ khóa ngay tại Frontend
  const filteredCourses = courses.filter((course) => {
    const searchKey = removeAccents(keyword.toLowerCase().trim());
    const courseName = removeAccents((course.name || '').toLowerCase());
    const courseCode = removeAccents((course.code || '').toLowerCase());

    return courseName.includes(searchKey) || courseCode.includes(searchKey);
  });

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', color: '#0f172a', marginBottom: '24px' }}>
        📚 Danh sách môn học
      </h2>

      {/* Thanh tìm kiếm */}
      <SearchBox keyword={keyword} onSearchChange={setKeyword} />

      {/* Trạng thái Loading / Error / Data */}
      {loading && (
        <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>
          Đang tải dữ liệu...
        </div>
      )}

      {error && (
        <div style={{ padding: '16px', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '8px', color: '#991b1b', marginBottom: '16px' }}>
          <p style={{ margin: '0 0 10px 0' }}>Không kết nối được tới hệ thống. Vui lòng thử lại sau.</p>
          <button 
            onClick={refetch}
            style={{ padding: '6px 12px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Thử lại
          </button>
        </div>
      )}

      {!loading && !error && <CourseList courses={filteredCourses} />}
    </div>
  );
}

export default App;