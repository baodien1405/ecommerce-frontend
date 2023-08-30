import * as yup from 'yup'

export const useProfileFormSchema = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter an name'),
    email: yup
      .string()
      .strict()
      .email('Please enter a valid email')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter an email'),
    phone: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter a phone'),
    address: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter an address')
  })
  return schema
}
