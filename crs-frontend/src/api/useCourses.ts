import { useState, useEffect, useCallback } from 'react';

export function useCourses(keyword: string = '') {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/api/courses?keyword=${keyword}`);
      if (!response.ok) {
        throw new Error('Lỗi kết nối máy chủ');
      }
      const data = await response.json();
      setCourses(data);
    } catch (err: any) {
      setError(err.message || 'Không kết nối được tới hệ thống');
    } finally {
      setLoading(false);
    }
  }, [keyword]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return { courses, loading, error, refetch: fetchCourses };
}