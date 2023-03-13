import * as yup from 'yup'

export const useActionFormSchema = () => {
  const schema = yup.object().shape({
    action: yup.string().required('Please select an action')
  })
  return schema
}
