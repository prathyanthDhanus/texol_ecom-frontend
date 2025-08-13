import React from "react";
import type { FormikProps } from "formik";
import FormInput from "../../../input/index";
import Button from "../../../buttons/Button";

interface LoginFormValues {
  email: string;
  password: string;
}

interface LoginFormProps {
  formik: FormikProps<LoginFormValues>;
  isLoading?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ formik, isLoading }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <FormInput
        inputType="input"
        type="email"
        name="email"
        label="Email Address"
        placeholder="Enter your email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.email && errors.email ? errors.email : undefined}
      />

      <FormInput
        inputType="input"
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.password && errors.password ? errors.password : undefined
        }
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={isLoading || formik.isSubmitting}
      >
        {isLoading ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
