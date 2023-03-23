import * as yup from 'yup'

export const useLoginFormSchema = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .strict()
      .required('Please enter an email')
      .email('Please enter a valid email')
      .trim('Please enter a suffix with no leading or trailing spaces'),
    password: yup
      .string()
      .strict()
      .required('Please enter a password')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .min(6, 'Length from 6 - 160 characters')
      .max(160, 'Length from 6 - 160 characters')
  })
  return schema
}
