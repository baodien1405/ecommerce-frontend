import { ComponentStory, ComponentMeta } from '@storybook/react'
import { DefaultLayout } from '@/layouts'
import { path } from '@/constants'
import Login from './Login'

export default {
  title: 'pages/Login',
  component: Login
} as ComponentMeta<typeof Login>

const Template: ComponentStory<typeof Login> = () => {
  return (
    <DefaultLayout>
      <Login />
    </DefaultLayout>
  )
}

export const Primary = Template.bind({})
Primary.story = {
  parameters: {
    reactRouter: {
      routePath: path.login
    }
  }
}
