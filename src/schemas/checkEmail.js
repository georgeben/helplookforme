import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Please enter a valid email')
});