import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

import { useAppSelector, useAppDispatch } from "../../../store/store";
import { useUpdateProduct, useGetProducts } from "../../../services/product";
import ProductForm from "../../../components/forms/product";
import type { ProductFormValues } from "../../../types/product";
import useProductForm from "../../../components/forms/product/useCategoryForm";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import { updateProduct as updateProductAction } from "../../../store/slices/productSlice";
import "./Product.css";

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) =>
    state.product.list.find((p) => p._id === id)
  );

  const {
    mutate: updateProduct,
    isPending: isLoading,
    error: updateError,
    isSuccess: updateSuccess,
  } = useUpdateProduct();

  // Get the products query to force refetch
  const { refetch: refetchProducts } = useGetProducts(1, 10);

  const [existingImages, setExistingImages] = React.useState<string[]>([]);

  useEffect(() => {
    if (product) {
      setExistingImages(product.images || []);
    }
  }, [product]);

  const handleSubmit = (values: ProductFormValues) => {
    if (!id) return;

    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());
    formData.append("category", values.category); // Already string
    formData.append("stock", values.stock.toString());

    // Add new images
    values.images.forEach((file) => {
      formData.append("images", file);
    });

    // Add existing images that weren't removed
    existingImages.forEach((imageUrl) => {
      formData.append("existingImages", imageUrl);
    });

    updateProduct(
      { id, data: formData },
      {
        onSuccess: (data) => {
          // Update Redux state with the updated product
          dispatch(updateProductAction(data.data));
          // Force refetch products to ensure fresh data
          refetchProducts();
          toastSuccess("Product updated successfully");
          navigate("/admin/products");
        },
      }
    );
  };

  const handleRemoveImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const formik = useProductForm(handleSubmit, {
    ...product,
    category:
      typeof product?.category === "object"
        ? product.category._id
        : product?.category || "",
    images: [],
    price: product?.price || 0,
    stock: product?.stock || 0,
  }, true); // Enable edit mode

  useEffect(() => {
    if (updateError) {
      toastError(
        (updateError as AxiosError<{ message: string }>)?.response?.data
          ?.message || "Failed to update product"
      );
    }
  }, [updateError]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="add-product-container">
      <h1 className="add-product-title">Edit Product</h1>
      <ProductForm
        formik={formik}
        isLoading={isLoading}
        existingImages={existingImages}
        onRemoveImage={handleRemoveImage}
      />
    </div>
  );
};
export default EditProduct;
