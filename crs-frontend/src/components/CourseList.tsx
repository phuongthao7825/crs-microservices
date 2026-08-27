import React from 'react';

interface Course {
  id?: string;
  code?: string;
  name?: string;
  credits?: number;
  availableSeats?: number;
  totalSeats?: number;
  // Bổ sung các trường có thể có từ Backend
  available_seats?: number;
  total_seats?: number;
  seats?: number;
}

interface CourseListProps {
  courses: Course[];
}

export const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  if (!courses || courses.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: 'gray', background: '#fff', borderRadius: '12px' }}>
        Không tìm thấy môn học phù hợp.
      </div>
    );
  }

  return (
    <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569' }}>
            <th style={{ padding: '14px 16px' }}>MÃ / TÊN MÔN HỌC</th>
            <th style={{ padding: '14px 16px', textAlign: 'center' }}>SỐ TÍN CHỈ</th>
            <th style={{ padding: '14px 16px', textAlign: 'center' }}>SỐ CHỖ CÒN LẠI</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => {
            // Kiểm tra và lấy đúng tên trường từ Backend
            const avail = course.availableSeats ?? course.available_seats ?? 10;
            const total = course.totalSeats ?? course.total_seats ?? 10;
            const credits = course.credits ?? 3;

            return (
              <tr key={course.id || course.code || index} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '14px 16px', fontWeight: '500', color: '#1e293b' }}>
                  {course.name}
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {credits} TC
                  </span>
                </td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <span style={{ background: '#dcfce7', color: '#15803d', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {avail} / {total}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};