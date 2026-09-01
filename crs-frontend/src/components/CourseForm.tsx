import React, { useState, useEffect } from 'react';
import type { CourseFormValues } from '../types/course';

interface CourseFormProps {
  initialValues?: CourseFormValues;
  isEditing?: boolean;
  onSubmit: (values: CourseFormValues) => void;
  onCancel?: () => void;
}

export default function CourseForm({
  initialValues,
  isEditing = false,
  onSubmit,
  onCancel,
}: CourseFormProps) {
  const [tenMonHoc, setTenMonHoc] = useState('');
  const [soTinChi, setSoTinChi] = useState('');
  const [soChoToiDa, setSoChoToiDa] = useState('');

  // Lắng nghe sự thay đổi của initialValues khi bấm nút 'Sửa'
  useEffect(() => {
    if (initialValues) {
      setTenMonHoc(initialValues.tenMonHoc || '');
      setSoTinChi(String(initialValues.soTinChi || ''));
      setSoChoToiDa(String(initialValues.soChoToiDa || ''));
    } else {
      setTenMonHoc('');
      setSoTinChi('');
      setSoChoToiDa('');
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tenMonHoc.trim() || !soTinChi || !soChoToiDa) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }

    onSubmit({ tenMonHoc, soTinChi, soChoToiDa });

    // Reset form nếu đang ở chế độ thêm mới
    if (!isEditing) {
      setTenMonHoc('');
      setSoTinChi('');
      setSoChoToiDa('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: 16, borderRadius: 8, marginBottom: 20 }}>
      <h3>{isEditing ? 'Cập nhật môn học' : 'Thêm môn học mới'}</h3>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }}>Tên môn học</label>
        <input
          type="text"
          value={tenMonHoc}
          onChange={(e) => setTenMonHoc(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }}>Số tín chỉ</label>
        <input
          type="number"
          value={soTinChi}
          onChange={(e) => setSoTinChi(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <div style={{ marginBottom: 12 }}>
        <label style={{ display: 'block' }}>Số chỗ tối đa</label>
        <input
          type="number"
          value={soChoToiDa}
          onChange={(e) => setSoChoToiDa(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>

      <button type="submit" style={{ padding: '8px 16px', backgroundColor: isEditing ? '#2563eb' : '#16a34a', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        {isEditing ? 'Cập nhật' : 'Thêm mới'}
      </button>

      {isEditing && (
        <button
          type="button"
          onClick={onCancel}
          style={{ marginLeft: 8, padding: '8px 16px', backgroundColor: '#6b7280', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}
        >
          Hủy
        </button>
      )}
    </form>
  );
}