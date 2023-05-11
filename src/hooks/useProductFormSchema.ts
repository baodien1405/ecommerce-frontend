import { ACCEPT_FILE_TYPES, MAX_SIZE_UPLOAD } from '@/constants'
import * as yup from 'yup'

export const useProductFormSchema = () => {
  const schema = yup.object().shape({
    image: yup
      .mixed()
      .test('required', 'Please select an image to upload', (files: any) => Boolean(files?.[0]?.name))
      .test('max-9mb', 'Please upload the file less than 9MB', (files: any) => {
        const fileSize = files?.[0]?.size || 0
        return fileSize <= MAX_SIZE_UPLOAD
      })
      .test('accept-file', 'Please upload the correct file type', (files: any) => {
        return ACCEPT_FILE_TYPES.includes(files?.[0]?.type)
      }),
    name: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter a name'),
    type: yup.string().oneOf(['Clothing', 'Electronics', 'Furniture']).required('Please enter a type'),
    brand: yup.string().when('type', {
      is: 'Clothing',
      then: (schema) => schema.required('Please enter a brand'),
      otherwise: (schema) => schema.notRequired()
    }),
    size: yup.string().when('type', {
      is: 'Clothing',
      then: (schema) => schema.required('Please enter a size'),
      otherwise: (schema) => schema.notRequired()
    }),
    material: yup.string().when('type', {
      is: 'Clothing',
      then: (schema) => schema.required('Please enter a material'),
      otherwise: (schema) => schema.notRequired()
    }),
    manufacturer: yup.string().when('type', {
      is: 'Electronics',
      then: (schema) => schema.required('Please enter a manufacturer'),
      otherwise: (schema) => schema.notRequired()
    }),
    model: yup.string().when('type', {
      is: 'Electronics',
      then: (schema) => schema.required('Please enter a model'),
      otherwise: (schema) => schema.notRequired()
    }),
    color: yup.string().when('type', {
      is: 'Electronics',
      then: (schema) => schema.required('Please enter a color'),
      otherwise: (schema) => schema.notRequired()
    }),
    quantity: yup.string().strict().required('Please enter a quantity'),
    price: yup.string().strict().required('Please enter a price'),
    description: yup.string().strict().required('Please enter a description')
  })
  return schema
}
