import { ComponentStory, ComponentMeta } from '@storybook/react'
import QuantityController from './QuantityController'

export default {
  title: 'Components/QuantityController',
  component: QuantityController,
  argTypes: {
    max: {
      description: 'Maximum quantity',
      table: { type: { summary: 'number' }, defaultValue: { summary: '0' } }
    },
    onIncrease: {
      description: 'The callback function that is triggered when click plus buttons',
      table: { type: { summary: 'function' } }
    },
    onDecrease: {
      description: 'The callback function that is triggered when click minus buttons',
      table: { type: { summary: 'function' } }
    },
    classNameWrapper: {
      description: 'CSS for wrapper quantity',
      table: { type: { summary: 'string' }, defaultValue: { summary: '' } }
    }
  }
} as ComponentMeta<typeof QuantityController>

const Template: ComponentStory<typeof QuantityController> = (props) => <QuantityController {...props} />

export const Primary = Template.bind({})

Primary.args = {
  max: 10,
  onIncrease: (value: number) => {},
  onDecrease: (value: number) => {},
  onType: (value: number) => {},
  onFocusOut: (value: number) => {},
  classNameWrapper: ''
}
