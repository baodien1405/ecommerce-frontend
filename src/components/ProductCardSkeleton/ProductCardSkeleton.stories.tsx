import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProductCardSkeleton from './ProductCardSkeleton'

export default {
  title: 'Components/ProductCardSkeleton',
  component: ProductCardSkeleton
} as ComponentMeta<typeof ProductCardSkeleton>

const Template: ComponentStory<typeof ProductCardSkeleton> = () => <ProductCardSkeleton />

export const Primary = Template.bind({})
