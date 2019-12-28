import * as yup from 'yup';

let today = new Date();
today.setHours(23, 59, 59, 0); // The end of the day 11:59pm
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
    .required('Please select a gender')
    .oneOf(['MALE', 'FEMALE'], 'Please select a gender'),
});

// helper for yup transform function
function emptyStringToNull(value, originalValue) {
  if (typeof originalValue === 'string' && originalValue === '') {
    return null;
  }
  return value;
}
const physicalCharacteristics = yup.object().shape({
  height: yup
    .number()
    .min(0.1)
    .transform(emptyStringToNull).nullable(),
  weight: yup
    .number()
    .min(1)
    .transform(emptyStringToNull).nullable(),
  specialCharacteristics: yup.string().trim(),
  healthInformation: yup
    .string()
    .trim()
});

const eventDescription = yup.object().shape({
  addressLastSeen: yup
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
        .required('Please specify a country'),
      state: yup
        .string()
        .trim()
        .required('Please specify a state'),
    })
    .required(),
  dateLastSeen: yup.date().max(today, 'Please enter a valid date'),
  lastSeenClothing: yup.string().trim(),
  eventCircumstances: yup.string().trim(),
});
export default {
  personalInformation,
  physicalCharacteristics,
  eventDescription,
};
