import { ComponentStory, ComponentMeta } from '@storybook/react'
import SlickSlider from './SlickSlider'
import images from '@/assets/images'

export default {
  title: 'Components/SlickSlider',
  component: SlickSlider,
  argTypes: {
    className: {
      description: 'class',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    },
    imageList: {
      description: 'List of images',
      table: { type: { summary: 'array' }, defaultValue: { summary: '[]' } }
    }
  }
} as ComponentMeta<typeof SlickSlider>

const Template: ComponentStory<typeof SlickSlider> = (props) => <SlickSlider {...props} />

export const Primary = Template.bind({})

Primary.args = {
  className: '',
  imageList: [images.slider1, images.slider2, images.slider3, images.slider4, images.slider5]
}
