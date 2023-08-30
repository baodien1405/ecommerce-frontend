import * as yup from 'yup'

export const useRegisterFormSchema = () => {
  const schema = yup.object().shape({
    name: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter a name'),
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
