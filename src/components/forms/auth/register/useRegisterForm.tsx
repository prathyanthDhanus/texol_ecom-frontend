import { useFormik } from "formik";
import * as Yup from "yup";

interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}
//---------- Initial values ------------
const initialValues: RegisterFormValues = {
  username: "",
  email: "",
  password: "",
};

//------------ Validation Schema ----------
const validationSchema = Yup.object({
  username: Yup.string().required("User name is required"),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(4, "Min 4 characters")
    .required("Password required"),
});

const useRegisterForm = (onSubmit: (values: RegisterFormValues) => void) => {
  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
};
export default useRegisterForm;
