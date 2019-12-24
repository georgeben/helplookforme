import * as yup from 'yup';

const personalInformation = yup.object().shape({
  fullname: yup
    .string()
    .trim()
    .required('Please enter fullname')
    .min(3),
  nicknames: yup.string().trim(),
  residentialAddress: yup
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
  language: yup
    .string()
    .trim()
    .required('Please specify a language'),
  age: yup
    .number()
    .integer()
    .min(1, 'Please select a valid age')
    .required(),
  gender: yup
    .string()
    .required('please select a gender')
    .oneOf(['MALE', 'FEMALE'], 'Please select a gender'),
});
export default {
  personalInformation,
};
