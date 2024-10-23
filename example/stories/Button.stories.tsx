import React from 'react'
import { View } from 'react-native'

import { Button as ButtonUI } from 'native-uikit'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

export default {
  title: 'Design System/Elements',
  component: ButtonUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 22, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    size: 'normal',
    title: 'Button',
    loading: false,
    type: 'solid',
    disabled: false,
  },
} as ComponentMeta<typeof ButtonUI>

const types = ['clear', 'solid', 'outline']

const Template: ComponentStory<typeof ButtonUI> = (args) => (
  <View style={{ justifyContent: 'center', alignItems: 'center', gap: 30 }}>
    {types.map((type: any) => (
      <View key={type} style={{ gap: 10 }}>
        <ButtonUI type={type} title="Button" />
        <ButtonUI type={type} title="Button" disabled />
      </View>
    ))}
    <ButtonUI {...args} />
  </View>
)

export const Button = Template.bind({})
