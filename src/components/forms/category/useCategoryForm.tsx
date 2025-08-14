import { useFormik } from "formik";
import * as Yup from "yup";

import type { CategoryFormValues } from "../../../types/category";

//---------- Initial values ------------
const initialValues: CategoryFormValues = {
  name: "",
  description: "",
};

//------------ Validation Schema ----------
const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  description: Yup.string().required("Description is required"),
});

const useCategoryForm = (onSubmit: (values: CategoryFormValues) => void) => {
  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
};

export default useCategoryForm;
