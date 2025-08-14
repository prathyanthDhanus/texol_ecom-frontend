import React from "react";

import CategoryForm from "../../../components/forms/category";
import useCategoryForm from "../../../components/forms/category/useCategoryForm";
import "./category.css"; 

interface FormValues {
  name: string;
  description: string;
}

const AddCategory: React.FC = () => {
  const handleSubmit = (values: FormValues) => {
    console.log("Category submitted:", values);
    // Add your API call or other submission logic here
  };

  const formik = useCategoryForm(handleSubmit);
  const isLoading = false;

  return (
    <div className="add-category-container">
      <h1 className="add-category-title">Add New Category</h1>
      <div className="add-category-form-wrapper">
        <CategoryForm formik={formik} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AddCategory;