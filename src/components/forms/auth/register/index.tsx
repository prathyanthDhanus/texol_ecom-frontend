import React from "react";

import type { RegisterFormProps } from "../../../../types/auth";
import FormInput from "../../../input/index";
import Button from "../../../buttons/Button";

const RegisterForm: React.FC<RegisterFormProps> = ({ formik, isLoading }) => {
  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* Add username field if needed */}
      <FormInput
        inputType="input"
        type="text"
        name="username"
        label="Username"
        placeholder="Enter your username"
        value={values.username || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={
          touched.username && errors.username ? errors.username : undefined
        }
      />

      {/* Existing email and password fields */}
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
        disabled={isLoading || formik.isSubmitting}
        fullWidth
      >
        {isLoading ? "Registering..." : "Register"}
      </Button>
    </form>
  );
};

export default RegisterForm;
