import * as yup from 'yup';

export default yup.object().shape({
  message: yup
    .string()
    .required('Please enter a message')
    .min(20, 'Your message must be at least 20 characters long'),
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  fullname: yup
    .string()
    .trim()
    .min(2, 'Fullname must have at least two characters')
    .required('Please enter your fullname'),
});
