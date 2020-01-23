import * as yup from 'yup';

export default yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .required('Please enter your fullname')
    .min(3),
  residentialAddress: yup.object().shape({
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
      .required('Please specify a country'),
    state: yup
      .string()
      .trim()
      .required('Please specify a state'),
  }),
});
