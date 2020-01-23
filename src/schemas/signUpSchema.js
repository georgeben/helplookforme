import * as yup from 'yup';

export default yup.object().shape({
  password: yup
    .string()
    .required('Please enter your password')
    .min(4, 'Password must be at least 4 characters'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  fullname: yup
    .string()
    .trim()
    .min(2)
    .required('Please enter your fullname'),
});
