import React from 'react';

interface SearchBoxProps {
  keyword?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearchChange?: (value: string) => void;
}

export default function SearchBox(props: SearchBoxProps) {
  const currentValue = props.keyword ?? props.value ?? '';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (props.onSearchChange) props.onSearchChange(val);
    if (props.onChange) props.onChange(val);
  };

  return (
    <input
      type="text"
      placeholder="Tìm kiếm theo tên môn học..."
      value={currentValue}
      onChange={handleChange}
      style={{
        width: '100%',
        padding: '8px 12px',
        marginBottom: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    />
  );
}