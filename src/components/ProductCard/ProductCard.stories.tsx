import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProductCard from './ProductCard'

export default {
  title: 'Components/ProductCard',
  component: ProductCard,
  argTypes: {
    product: {
      description: 'Data shaped like an object',
      table: { type: { summary: 'Product' }, defaultValue: { summary: 'undefined' } },
      control: {
        type: 'object'
      }
    }
  }
} as ComponentMeta<typeof ProductCard>

const Template: ComponentStory<typeof ProductCard> = (props) => <ProductCard {...props} />

export const Primary = Template.bind({})

Primary.args = {
  product: {
    countInStock: 123,
    description: 'Điện thoại nè',
    image: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679297374/products/um6rssm7gkrum0by64jl.png',
    name: 'Iphone 13',
    price: 1500444,
    rating: 4.4,
    type: 'phone',
    _id: '64180824c057cc62c5f8decf',
    discount: 14,
    quantitySold: 12
  }
}
