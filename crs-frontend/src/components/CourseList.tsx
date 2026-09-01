import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
  courses: Course[] | { content: Course[] } | any;
  state: LoadState;
  errorMessage: string;
  onRetry: () => void;
  onEdit: (course: Course) => void;
  onDelete: (course: Course) => void;
}

export default function CourseList({
  courses, state, errorMessage, onRetry, onEdit, onDelete,
}: CourseListProps) {
  if (state === 'loading') return <p>Dang tai danh sach mon hoc...</p>;
  if (state === 'error') {
    return (
      <div style={{ color: '#b91c1c' }}>
        <p>{errorMessage}</p>
        <button onClick={onRetry}>Thu lai</button>
      </div>
    );
  }

  // Tự động lấy mảng từ `content` nếu Backend trả về dạng Page
  const courseList: Course[] = Array.isArray(courses) 
    ? courses 
    : (courses?.content && Array.isArray(courses.content) ? courses.content : []);

  if (state === 'empty' || courseList.length === 0) return <p>Khong tim thay mon hoc nao phu hop.</p>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '2px solid #333' }}>
          <th>Ten mon hoc</th>
          <th>So tin chi</th>
          <th>So cho con lai</th>
          <th>Thao tac</th>
        </tr>
      </thead>
      <tbody>
        {courseList.map((course) => (
          <tr key={course.id} style={{ borderBottom: '1px solid #eee' }}>
            <td>{course.tenMonHoc}</td>
            <td>{course.soTinChi} TC</td>
            <td style={{ color: course.soChoConLai === 0 ? '#b91c1c' : 'inherit' }}>
              {course.soChoConLai ?? course.soChoToiDa} / {course.soChoToiDa}
            </td>
            <td>
              <button onClick={() => onEdit(course)}>Sua</button>
              <button onClick={() => onDelete(course)} style={{ marginLeft: 8, color: '#b91c1c' }}>
                Xoa
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}