import React from "react";
import type { FormikProps } from "formik";
import FormInput from "../../input";
import Button from "../../buttons/Button";
import FileUpload from "../../fileUpload/FileUpload";
import { useGetCategories } from "../../../services/category";
import "./ProductForm.css"
interface ProductFormValues {
  name: string;
  description: string;
  price: number;
  category: string; // Only accepts string ID
  stock: number;
  images: File[];
}

interface ProductFormProps {
  formik: FormikProps<ProductFormValues>;
  isLoading?: boolean;
  existingImages?: string[];
  onRemoveImage?: (index: number) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  formik,
  isLoading,
  existingImages = [],
  onRemoveImage,
}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  // Fetch all categories
  const { data: categoriesResponse } = useGetCategories(1, 100);
  const categories = categoriesResponse?.data || [];

  const handleImageChange = (files: File[]) => {
    setFieldValue("images", [...values.images, ...files]);
  };

  const handleRemoveNewImage = (index: number) => {
    const newImages = [...values.images];
    newImages.splice(index, 1);
    setFieldValue("images", newImages);
  };

  // Get current category name for display
  const getCurrentCategoryName = () => {
    const selectedCategory = categories.find(c => c._id === values.category);
    return selectedCategory?.name || "Select a category";
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* Product Name */}
      <FormInput
        inputType="input"
        type="text"
        name="name"
        label="Product name"
        placeholder="Enter product name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name ? errors.name : undefined}
      />

      {/* Description */}
      <FormInput
        inputType="textarea"
        name="description"
        label="Description"
        placeholder="Enter product description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.description && errors.description
            ? errors.description
            : undefined
        }
      />

      {/* Price */}
      <FormInput
        inputType="input"
        type="number"
        name="price"
        label="Price"
        placeholder="Enter product price"
        value={values.price.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.price && errors.price ? errors.price : undefined}
        min="0"
        step="0.01"
      />

      {/* Category Selection */}
      <div className="form-group">
        <label>Category</label>
        <div className="category-selection">
          <input
            type="text"
            className="form-control mb-2"
            value={getCurrentCategoryName()}
            readOnly
          />
          <select
            name="category"
            value={values.category || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="form-control"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        {touched.category && errors.category && (
          <div className="error-message">{errors.category}</div>
        )}
      </div>

      {/* Stock Quantity */}
      <FormInput
        inputType="input"
        type="number"
        name="stock"
        label="Stock Quantity"
        placeholder="Enter stock quantity"
        value={values.stock.toString()}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.stock && errors.stock ? errors.stock : undefined}
        min="0"
      />

      {/* Image Upload */}
      <div className="form-group">
        <label>Product Images</label>
        <FileUpload multiple onChange={handleImageChange} accept="image/*" />

        {/* New Images Preview */}
        {values.images.length > 0 && (
          <div className="image-preview-container">
            <h4>New Images</h4>
            <div className="image-grid">
              {values.images.map((file, index) => (
                <div key={`new-${index}`} className="image-preview-item">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index}`}
                    className="image-preview"
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => handleRemoveNewImage(index)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Existing Images Preview */}
        {existingImages && existingImages.length > 0 && (
          <div className="image-preview-container">
            <h4>Existing Images</h4>
            <div className="image-grid">
              {existingImages.map((imageUrl, index) => (
                <div key={`existing-${index}`} className="image-preview-item">
                  <img
                    src={imageUrl}
                    alt={`Existing ${index}`}
                    className="image-preview"
                  />
                  {onRemoveImage && (
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => onRemoveImage(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading || formik.isSubmitting}
      >
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </form>
  );
};

export default ProductForm;