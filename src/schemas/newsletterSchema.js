import * as yup from 'yup';

export default yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Please enter your email'),
  address: yup
    .object()
    .shape({
      location: yup.object().shape({
        type: yup
          .string()
          .trim()
          .required(),
        coordinates: yup
          .array()
          .of(yup.number())
          .required(),
      }),
      formatted_address: yup
        .string()
        .trim()
        .required('Please enter a valid address'),
      country: yup
        .string()
        .trim()
        .required('Please enter a valid address'),
      state: yup
        .string()
        .trim()
        .required('Please enter a valid address'),
    })
    .required(),
  frequency: yup
    .string()
    .required('Please select a frequency')
    .oneOf(
      ['DAILY', 'WEEKLY'],
      'Please select a frequency',
    ),
});
