import React from 'react';
import type { FormikProps } from 'formik';
import FormInput from '../../../input/index';
import Button from '../../../buttons/Button';

interface RegisterFormProps {
  formik: FormikProps<{
    userName: string;
    email: string;
    password: string;
  }>;
  isLoading: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ formik, isLoading }) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = formik;

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      {/* Add username field if needed */}
      <FormInput
        inputType="input"
        type="text"
        name="userName"
        label="Username"
        placeholder="Enter your username"
        value={values.userName || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.userName && errors.userName ? errors.userName : undefined}
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
        error={touched.password && errors.password ? errors.password : undefined}
      />

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading || formik.isSubmitting}
        fullWidth
      >
        {isLoading ? 'Registering...' : 'Register'}
      </Button>
    </form>
  );
};

export default RegisterForm;