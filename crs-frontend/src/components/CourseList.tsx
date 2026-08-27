import type { Course } from '../types/course';
import type { LoadState } from '../api/useCourses';

interface CourseListProps {
  courses: Course[];
  state: LoadState;
  errorMessage: string;
  onRetry: () => void;
}

export default function CourseList({ courses, state, errorMessage, onRetry }: CourseListProps) {
  if (state === 'loading') {
    return <p style={{ color: '#666', fontStyle: 'italic' }}>Dang tai danh sach mon hoc...</p>;
  }

  if (state === 'error') {
    return (
      <div style={{ color: '#b91c1c', padding: 12, border: '1px solid #fca5a5', backgroundColor: '#fef2f2', borderRadius: 6 }}>
        <p style={{ margin: '0 0 8px 0' }}>{errorMessage}</p>
        <button 
          onClick={onRetry} 
          style={{ padding: '6px 12px', backgroundColor: '#b91c1c', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Thu lai
        </button>
      </div>
    );
  }

  if (state === 'empty') {
    return <p style={{ color: '#666' }}>Khong tim thay mon hoc nao phu hop.</p>;
  }

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
      <thead>
        <tr style={{ textAlign: 'left', borderBottom: '2px solid #333', backgroundColor: '#f9fafb' }}>
          <th style={{ padding: 10 }}>Mã / Tên môn hoc</th>
          <th style={{ padding: 10, textAlign: 'center' }}>So tin chi</th>
          <th style={{ padding: 10, textAlign: 'center' }}>So cho con lai</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((course) => {
          const name = course.tenMonHoc || course.name || course.code;
          const credits = course.soTinChi ?? course.credits ?? 0;
          const remaining = course.soChoConLai ?? 10;
          const max = course.soChoToiDa ?? 10;

          return (
            <tr key={course.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: 10 }}>{name}</td>
              <td style={{ padding: 10, textAlign: 'center' }}>{credits}</td>
              <td style={{ padding: 10, textAlign: 'center', color: remaining === 0 ? '#b91c1c' : 'inherit', fontWeight: remaining === 0 ? 'bold' : 'normal' }}>
                {remaining} / {max}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}