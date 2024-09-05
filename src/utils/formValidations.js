import * as Yup from "yup";

const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
});

 // Signup Schema
const step1SignupSchema = Yup.object().shape({
  city: Yup.string().required('City is required'),
});

const step2SignupSchema = Yup.object().shape({
  max_price: Yup.string().required('Max rental price is required'),
  no_of_rooms: Yup.string().required('Number of bedrooms is required'),
  area: Yup.string().required('Minimum surface is required'),
});

  const step3SignupSchema = Yup.object().shape({
    f_name: Yup.string()
      .required("First name is required")
      .matches(/^[A-Za-z ]+$/, "First name should contain only alphabets"),
    l_name: Yup.string()
      .required("Last name is required")
      .matches(/^[A-Za-z ]+$/, "Last name should contain only alphabets"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string()
    .nullable()
    .notRequired()
    // .matches(/^\+?[0-9]{7,15}$/, "Phone number is not valid")
    ,
    password: Yup.string()
      .required("Password is required")
      // .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must be atleast 8 characters and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const forgetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

const profileModalSchema = {
  updatePassword: Yup.object().shape({
    password: Yup.string()
      .min(8, 'New password must be at least 8 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      )
      .required('New password is required'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm new password is required'),
  }),
  updateUserData: Yup.object().shape({
    f_name: Yup.string(),
    l_name: Yup.string(),
    phone: Yup.string()
      // .matches(/^\d{4}-\d{3}-\d{4}$/, 'Phone number must be in the format 123-456-7890'),
  }),
  updateFilters: Yup.object().shape({
    city: Yup.string(),
    max_price: Yup.string(),
    no_of_rooms: Yup.string(),
    area: Yup.string(),
  }),
};
  
export {
  loginSchema,
  step1SignupSchema,
  step2SignupSchema,
  step3SignupSchema,
  forgetPasswordSchema,
  profileModalSchema
}