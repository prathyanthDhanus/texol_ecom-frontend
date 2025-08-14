import React from "react";
import type { FormikProps } from "formik";

import FormInput from "../../input";
import Button from "../../buttons/Button";

interface CategoryFormValues {
  name: string;
  description: string;
}

interface CategoryFormProps {
  formik: FormikProps<CategoryFormValues>;
  isLoading?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ formik, isLoading }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <FormInput
        inputType="input"
        type="email"
        name="name"
        label="Category name"
        placeholder="Enter category name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.name && errors.name ? errors.name : undefined}
      />

      <FormInput
        inputType="textarea"
        name="description"
        label="Description"
        placeholder="Enter Description"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.description && errors.description
            ? errors.description
            : undefined
        }
      />

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

export default CategoryForm;
