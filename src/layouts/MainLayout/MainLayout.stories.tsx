import { ComponentStory, ComponentMeta } from '@storybook/react'
import ProductDetail from '@/pages/ProductDetail'
import { MainLayout } from './MainLayout'

export default {
  title: 'Layouts/MainLayout',
  component: MainLayout,
  argTypes: {
    children: {
      description: 'Body of layout',
      table: { type: { summary: 'ReactNode' } }
    }
  }
} as ComponentMeta<typeof MainLayout>

const Template: ComponentStory<typeof MainLayout> = (props) => <MainLayout {...props} />

export const Primary = Template.bind({})
export const PageProductDetail = Template.bind({})

PageProductDetail.args = {
  children: <ProductDetail />
}

PageProductDetail.story = {
  parameters: {
    reactRouter: {
      routePath: '/:productId',
      routeParams: { productId: '64180824c057cc62c5f8decf' }
    }
  }
}
