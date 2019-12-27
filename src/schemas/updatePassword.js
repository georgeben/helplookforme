import * as yup from 'yup';

export default yup.object().shape({
  currentPassword: yup
    .string()
    .trim()
    .min(4, 'Password must have at least four characters'),
  newPassword: yup
    .string()
    .trim()
    .required('Please enter a new password')
    .min(4, 'Password must have at least four characters'),
});