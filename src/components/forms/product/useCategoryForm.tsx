import { useFormik } from "formik";
import * as Yup from "yup";

import type { ProductFormValues } from "../../../types/product";

//---------- Initial values ------------
const defaultInitialValues: ProductFormValues = {
  name: "",
  description: "",
  price: 0,
  category: "",
  stock: 0,
  images: [],
};

//------------ Validation Schema ----------
const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  category: Yup.string().required("Category is required"),
  stock: Yup.number()
    .required("Stock quantity is required")
    .min(0, "Stock must be positive"),
  images: Yup.array()
    .of(
      Yup.mixed<File>().test(
        "fileSize",
        "File too large",
        (value) => value && value.size <= 1024 * 1024 * 5 // 5MB
      )
    )
    .min(1, "At least one image is required")
    .required("Images are required"),
});

const useProductForm = (
  onSubmit: (values: ProductFormValues) => void,
  initialValues: ProductFormValues = defaultInitialValues
) => {
  return useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });
};

export default useProductForm;
