import * as yup from 'yup'

import { ACCEPT_FILE_TYPES, MAX_SIZE_UPLOAD, ProductType } from '@/constants'
import { ProductPayload } from '@/types'
import { useRef } from 'react'

export const useProductSchema = (initialValues?: Partial<ProductPayload>) => {
  const productRef = useRef<string>(initialValues?.product_type || '')

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

    product_type: yup
      .string()
      .oneOf([ProductType.CLOTHING, ProductType.ELECTRONICS, ProductType.FURNITURE])
      .required('Please select a product type')
      .test((value) => {
        productRef.current = value
        return true
      }),

    product_attributes: yup.object().shape({
      brand:
        productRef.current === ProductType.CLOTHING || productRef.current === ProductType.FURNITURE
          ? yup.string().required('Please enter a brand')
          : yup.string().notRequired(),

      size:
        productRef.current === ProductType.CLOTHING || productRef.current === ProductType.FURNITURE
          ? yup.string().required('Please enter a size')
          : yup.string().notRequired(),

      material:
        productRef.current === ProductType.CLOTHING || productRef.current === ProductType.FURNITURE
          ? yup.string().required('Please enter a material')
          : yup.string().notRequired(),

      manufacturer:
        productRef.current === ProductType.ELECTRONICS
          ? yup.string().required('Please enter a manufacturer')
          : yup.string().notRequired(),

      model:
        productRef.current === ProductType.ELECTRONICS
          ? yup.string().required('Please enter a model')
          : yup.string().notRequired(),

      color:
        productRef.current === ProductType.ELECTRONICS
          ? yup.string().required('Please enter a color')
          : yup.string().notRequired()
    }),

    product_ratingsAverage: yup.number().strict().required('Please select a product rating'),

    product_quantity: yup.number().strict().required('Please enter a product quantity'),

    product_price: yup.number().strict().required('Please enter a product price')
  })
  return schema
}
