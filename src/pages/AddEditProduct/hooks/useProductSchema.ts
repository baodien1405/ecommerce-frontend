import * as yup from 'yup'

import { ACCEPT_FILE_TYPES, MAX_SIZE_UPLOAD } from '@/constants'
import { ProductPayload } from '@/types'

export const useProductSchema = (initialValues?: Partial<ProductPayload>) => {
  const schema = yup.object().shape({
    product_thumbnail: yup
      .object()
      .nullable()
      .test((value: any, context) => {
        if (Boolean(initialValues?._id) || Boolean(value?.file)) return true

        return context.createError({ message: 'Please select an image.' })
      })
      .test('accept-file', 'Please upload the correct file type', (value: any) => {
        if (!value.file) return true

        return ACCEPT_FILE_TYPES.includes(value?.file?.type)
      })
      .test('test-size', 'Maximum file exceeded. Please select another file.', (value: any) => {
        const fileSize = value?.file?.['size'] || 0

        return fileSize <= MAX_SIZE_UPLOAD
      }),
    product_name: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter a product name'),

    product_description: yup
      .string()
      .strict()
      .trim('Please enter a suffix with no leading or trailing spaces')
      .required('Please enter a product description'),

    product_type: yup.string().oneOf(['Clothing', 'Electronics', 'Furniture']).required('Please select a product type'),

    product_attributes: yup.object().shape({
      brand: yup.string().when('product_type', {
        is: 'Clothing',
        then: (schema) => schema.required('Please enter a brand'),
        otherwise: (schema) => schema.notRequired()
      }),
      size: yup.string().when('product_type', {
        is: 'Clothing',
        then: (schema) => schema.required('Please enter a size'),
        otherwise: (schema) => schema.notRequired()
      }),

      material: yup.string().when('product_type', {
        is: 'Clothing',
        then: (schema) => schema.required('Please enter a material'),
        otherwise: (schema) => schema.notRequired()
      }),

      manufacturer: yup.string().when('product_type', {
        is: 'Electronics',
        then: (schema) => schema.required('Please enter a manufacturer'),
        otherwise: (schema) => schema.notRequired()
      }),

      model: yup.string().when('product_type', {
        is: 'Electronics',
        then: (schema) => schema.required('Please enter a model'),
        otherwise: (schema) => schema.notRequired()
      }),

      color: yup.string().when('product_type', {
        is: 'Electronics',
        then: (schema) => schema.required('Please enter a color'),
        otherwise: (schema) => schema.notRequired()
      })
    }),

    product_ratingsAverage: yup.number().strict().required('Please select a product rating'),

    product_quantity: yup.number().strict().required('Please enter a product quantity'),

    product_price: yup.number().strict().required('Please enter a product price')
  })
  return schema
}
