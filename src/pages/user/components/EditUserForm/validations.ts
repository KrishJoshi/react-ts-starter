import * as Yup from "yup";

const userValidationSchema = Yup.object().shape<Partial<User>>({
  first_name: Yup.string()
    .max(40, "Please enter no more than 40 characters")
    .required("Please enter a first name"),
  last_name: Yup.string()
    .max(40, "Please enter no more than 40 characters")
    .required("Please enter a last name"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Please enter an email"),
});

export default userValidationSchema;
