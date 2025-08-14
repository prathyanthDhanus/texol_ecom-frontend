import React from "react";
import { useEffect } from "react";
import { AxiosError } from "axios";

import CategoryForm from "../../../components/forms/category";
import useCategoryForm from "../../../components/forms/category/useCategoryForm";
import type { CategoryFormValues } from "../../../types/category";
import { useCreateCategory } from "../../../services/category";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import "./category.css";

const AddCategory: React.FC = () => {
  // Create category api hook
  const {
    mutate: category,
    isPending: isLoading,
    isSuccess: categorySuccess,
    error: categoryError,
    data: categoryData,
  } = useCreateCategory();

  // Category form submit function
  const handleSubmit = (values: CategoryFormValues) => {
    category(values, {
      onError: (error: any) => {
        toastError(error?.message || "Category creation failed");
      },
    });
  };

  useEffect(() => {
    if (categorySuccess && categoryData) {
      toastSuccess(categoryData.message || "Category creation failed");
      formik.resetForm();
    }
  }, [categorySuccess, categoryData]);
  const formik = useCategoryForm(handleSubmit);

  return (
    <div className="add-category-container">
      <h1 className="add-category-title">Add New Category</h1>
      <div className="add-category-form-wrapper">
        {categoryError && (
          <div
            className="auth-error-message"
            style={{ color: "red", marginBottom: "1rem" }}
          >
            ⚠️{" "}
            {(categoryError as AxiosError<{ message: string }>)?.response?.data
              ?.message || "Category creation is failed"}
          </div>
        )}
        <CategoryForm formik={formik} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AddCategory;
