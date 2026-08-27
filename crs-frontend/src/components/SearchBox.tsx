import React from 'react';

interface SearchBoxProps {
  keyword: string;
  onSearchChange: (value: string) => void;
}

export const SearchBox: React.FC<SearchBoxProps> = ({ keyword, onSearchChange }) => {
  return (
    <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
      <input
        type="text"
        placeholder="🔍 Tìm kiếm theo tên môn học..."
        value={keyword}
        onChange={(e) => onSearchChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '8px',
          border: '1px solid #cbd5e1',
          outline: 'none',
          fontSize: '14px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
        }}
      />
    </div>
  );
};