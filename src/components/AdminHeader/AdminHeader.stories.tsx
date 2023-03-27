import { ComponentStory, ComponentMeta } from '@storybook/react'
import AdminHeader from './AdminHeader'

export default {
  title: 'Components/AdminHeader',
  component: AdminHeader
} as ComponentMeta<typeof AdminHeader>

const Template: ComponentStory<typeof AdminHeader> = () => <AdminHeader />

export const Primary = Template.bind({})
