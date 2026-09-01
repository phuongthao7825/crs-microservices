import { useState, useEffect } from 'react';
import CourseForm from './components/CourseForm';
import CourseList from './components/CourseList';
import SearchBox from './components/SearchBox';
import type { Course, CourseFormValues } from './types/course';
import * as courseApi from './api/courseApi'; // Sử dụng trực tiếp courseApi

export default function App() {
  const [courses, setCourses] = useState<any>([]);
  const [keyword, setKeyword] = useState('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [state, setState] = useState<'loading' | 'success' | 'error' | 'empty'>('loading');
  const [errorMessage, setErrorMessage] = useState('');

  // Hàm tải danh sách môn học
  const fetchCourses = async () => {
    setState('loading');
    try {
      const res = await fetch(`http://localhost:8080/api/courses?keyword=${encodeURIComponent(keyword)}`);
      if (!res.ok) throw new Error('Khong the tải danh sach mon hoc');
      const data = await res.json();
      setCourses(data);
      
      const list = Array.isArray(data) ? data : (data?.content || []);
      setState(list.length === 0 ? 'empty' : 'success');
    } catch (err: any) {
      setErrorMessage(err.message || 'Da xai ra loi');
      setState('error');
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [keyword]);

  // Thêm / Sửa môn học
  const handleFormSubmit = async (values: CourseFormValues) => {
    try {
      const payload = {
        tenMonHoc: values.tenMonHoc,
        soTinChi: Number(values.soTinChi),
        soChoToiDa: Number(values.soChoToiDa),
      };

      if (editingCourse) {
        await fetch(`http://localhost:8080/api/courses/${editingCourse.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        setEditingCourse(null);
      } else {
        await fetch('http://localhost:8080/api/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }
      fetchCourses();
    } catch (err) {
      alert('Thao tac that bai, vui long thu lai!');
    }
  };

  // Xóa môn học
  const handleDelete = async (course: Course) => {
    if (window.confirm(`Ban co chac muon xoa mon "${course.tenMonHoc}"?`)) {
      try {
        await fetch(`http://localhost:8080/api/courses/${course.id}`, {
          method: 'DELETE',
        });
        fetchCourses();
      } catch (err) {
        alert('Xoa mon hoc that bai!');
      }
    }
  };

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
      <h1>Quan ly mon hoc (Admin)</h1>

      <CourseForm
        initialValues={editingCourse ? {
          tenMonHoc: editingCourse.tenMonHoc,
          soTinChi: String(editingCourse.soTinChi),
          soChoToiDa: String(editingCourse.soChoToiDa),
        } : undefined}
        isEditing={!!editingCourse}
        onSubmit={handleFormSubmit}
        onCancel={() => setEditingCourse(null)}
      />

      <SearchBox
        keyword={keyword}
        onSearchChange={(val) => setKeyword(val)}
      />

      <CourseList
        courses={courses}
        state={state}
        errorMessage={errorMessage}
        onRetry={fetchCourses}
        onEdit={(course) => setEditingCourse(course)}
        onDelete={handleDelete}
      />
    </div>
  );
}