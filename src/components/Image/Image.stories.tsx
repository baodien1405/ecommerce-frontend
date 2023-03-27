import { ComponentStory, ComponentMeta } from '@storybook/react'
import Image from './Image'

export default {
  title: 'Components/Image',
  component: Image,
  argTypes: {
    src: {
      description: 'Image path',
      table: { type: { summary: 'string' } }
    },
    alt: {
      description: 'Image description',
      table: { type: { summary: 'string' } }
    },
    className: {
      description: 'Add custom className for image root DOM and preview mode root DOM',
      table: { type: { summary: 'string' } }
    }
  }
} as ComponentMeta<typeof Image>

const Template: ComponentStory<typeof Image> = (props) => <Image {...props} />

export const Primary = Template.bind({})

Primary.args = {
  src: 'http://res.cloudinary.com/dktajq8sb/image/upload/v1679647428/users/kdxxojlwcvttgbb5wwae.jpg',
  alt: 'avatar account',
  fallback: '',
  className: '',
  onClick: () => {}
}
