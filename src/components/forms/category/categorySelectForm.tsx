
import React from 'react';
import { useGetCategories } from '../../../services/category';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({ value, onChange }) => {
  const { data: categories } = useGetCategories(1, 100); 
  
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="form-select"
    >
      <option value="">Select a category</option>
      {categories?.data.map((category) => (
        <option key={category._id} value={category._id}>
          {category.name}
        </option>
      ))}
    </select>
  );
};

export default CategorySelect;