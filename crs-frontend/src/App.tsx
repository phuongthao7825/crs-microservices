import { useEffect, useState } from 'react';
import axios from 'axios';

interface Course {
  id: number;
  code: string;
  name: string;
  credits: number;
}

function App() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Gọi API trực tiếp tới Gateway (cổng 8080)
    axios.get('http://localhost:8080/api/courses?page=0&size=10')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.content;
        setCourses(data || []);
      })
      .catch(() => setError('Khong ket noi duoc toi he thong. Kiem tra lai api-gateway da chay chua.'));
  }, []);

  return (
    <div style={{ 
      padding: '40px 20px', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto',
      color: '#333'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        lineHeight: '1.4', 
        fontSize: '28px',
        fontWeight: 'bold',
        marginBottom: '20px' 
      }}>
        Kiem tra ket noi CRS qua Gateway
      </h1>
      
      {error && (
        <p style={{ color: 'red', textAlign: 'center', fontWeight: '500' }}>
          {error}
        </p>
      )}

      <table border={1} cellPadding={12} style={{ 
        width: '100%', 
        marginTop: '20px', 
        borderCollapse: 'collapse',
        borderColor: '#ddd'
      }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th style={{ width: '10%' }}>ID</th>
            <th style={{ width: '20%' }}>Mã môn</th>
            <th style={{ width: '50%' }}>Tên môn học</th>
            <th style={{ width: '20%' }}>Số tín chỉ</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id} style={{ textAlign: 'center' }}>
              <td>{course.id}</td>
              <td><strong>{course.code}</strong></td>
              <td style={{ textAlign: 'left' }}>{course.name}</td>
              <td>{course.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;