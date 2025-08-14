import React from "react";
import { AxiosError } from "axios";

import ProductForm from "../../../components/forms/product";
import useProductForm from "../../../components/forms/product/useCategoryForm";
import type { ProductFormValues } from "../../../types/product";
import { useCreateProduct } from "../../../services/product";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import "./Product.css";

const AddProduct: React.FC = () => {
  const {
    mutate: createProduct,
    isPending: isLoading,
    isSuccess: productSuccess,
    error: productError,
    data: productData,
  } = useCreateProduct();

  const handleSubmit = (values: ProductFormValues) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("category", values.category);
    formData.append("stock", values.stock.toString());
    values.images.forEach((file) => {
      formData.append("images", file);
    });

    createProduct(formData, {
      onError: (error: AxiosError<{ message: string }>) => {
        toastError(error.response?.data?.message || "Product creation failed");
      },
    });
  };

  const formik = useProductForm(handleSubmit);

  React.useEffect(() => {
    if (productSuccess && productData) {
      toastSuccess(productData.message || "Product created successfully");
      formik.resetForm();
    }
  }, [productSuccess, productData]);

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Add New Product</h1>
      <div className="add-product-form-wrapper">
        {productError && (
          <div className="auth-error-message" style={{ color: "red", marginBottom: "1rem" }}>
            ⚠️ {(productError as AxiosError<{ message: string }>)?.response?.data?.message || "Product creation failed"}
          </div>
        )}
        <ProductForm formik={formik} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default AddProduct;