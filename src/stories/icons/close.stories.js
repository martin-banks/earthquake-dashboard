import React from 'react'

import Close from '../../components/icons/close'


const Template = args => <Close {...args} />

export default {
  title: 'Icons/Close',
  component: Close,
  argTypes: {
    fill: { control: 'color' },
    size: { control: 'number' },
  }
}

export const Demo = Template.bind({})
Demo.args = {
  fill: '#000',
  size: 100,
}

