import { useFormik } from "formik";
import * as Yup from "yup";

 interface LoginFormValues {
  email: string;
  password: string;
}
//---------- Initial values ------------
const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

//------------ Validation Schema ----------
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string()
    .min(4, "Min 4 characters")
    .required("Password required"),
});

 const useLoginForm = (onSubmit: (values: LoginFormValues) => void) => {
  return useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
};
export default useLoginForm;