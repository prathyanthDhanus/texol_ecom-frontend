import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useAppSelector } from "../../../store/store";
import { useUpdateCategory } from "../../../services/category";
import CategoryForm from "../../../components/forms/category";
import useCategoryForm from "../../../components/forms/category/useCategoryForm";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import type { CategoryFormValues } from "../../../types/category";

const EditCategory = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const category = useAppSelector((state) =>
    state.category.list.find((c) => c._id === id)
  );

  const {
    mutate: updateCategory,
    error: updateCategoryError,
    isPending: updateCategoryLoading,
  } = useUpdateCategory();

  const handleSubmit = (values: CategoryFormValues) => {
    if (!id) return;

    // Create clean payload with only allowed fields
    const cleanPayload = {
      name: values.name,
      description: values.description,
    };

    updateCategory(
      { id, data: cleanPayload },
      {
        onSuccess: () => {
          toastSuccess("Category updated successfully");
          navigate("/category");
        },
      }
    );
  };

  const formik = useCategoryForm(handleSubmit, category);

  useEffect(() => {
    if (updateCategoryError) {
      toastError(
        (updateCategoryError as AxiosError<{ message: string }>)?.response?.data
          ?.message || "Failed to update category"
      );
    }
  }, [updateCategoryError]);

  if (!category) {
    return <p>Category not found</p>;
  }

  return (
    <div className="edit-category-container">
      <h1>Edit Category</h1>
      <CategoryForm formik={formik} isLoading={updateCategoryLoading} />
    </div>
  );
};
export default EditCategory;
