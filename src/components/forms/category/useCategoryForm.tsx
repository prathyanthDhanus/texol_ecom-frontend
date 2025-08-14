import { useFormik } from "formik";
import * as Yup from "yup";

import type { CategoryFormValues } from "../../../types/category";

//---------- Initial values ------------
const defaultInitialValues: CategoryFormValues = {
  name: "",
  description: "",
};

//------------ Validation Schema ----------
const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string()
    .required("Description is required")
    .min(5, "Description must be at least 5 characters"),
});

const useCategoryForm = (
  onSubmit: (values: CategoryFormValues) => void,
  initialValues: CategoryFormValues = defaultInitialValues
) => {
  return useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema,
    onSubmit,
  });
};

export default useCategoryForm;
