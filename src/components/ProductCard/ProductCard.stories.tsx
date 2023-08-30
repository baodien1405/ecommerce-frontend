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
    _id: '6446366efe2b894925b51ca0',
    product_name: 'Mango Self Striped A Line Dress',
    product_thumb: 'link-image-3',
    product_description: 'Off-White self-striped knitted midi A-line dress, has a scoop neck, sleeveless, straight hem',
    product_price: 550,
    product_quantity: 25,
    product_type: 'Clothing',
    product_attributes: {
      brand: 'MRN VietNam 5',
      size: 'XL',
      material: 'Coton',
      color: '',
      manufacturer: '',
      model: ''
    },
    product_ratingsAverage: 4.5,
    product_variations: [],
    product_slug: 'mango-self-striped-a-line-dress'
  }
}
