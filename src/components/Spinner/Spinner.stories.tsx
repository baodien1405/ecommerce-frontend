import { ComponentStory, ComponentMeta } from '@storybook/react'
import Spinner from './Spinner'

export default {
  title: 'Components/Spinner',
  component: Spinner
} as ComponentMeta<typeof Spinner>

const Template: ComponentStory<typeof Spinner> = () => <Spinner />

export const Primary = Template.bind({})