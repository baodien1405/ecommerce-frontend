import * as yup from 'yup'

export const useLoginFormSchema = () => {
  const schema = yup.object().shape({
    email: yup
      .string()
      .strict()
      .email('Please enter a valid email')
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter an email'),
    password: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter an password')
  })
  return schema
}
