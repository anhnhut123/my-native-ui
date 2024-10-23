import React from 'react'
import { View } from 'react-native'

import { TextInput as TextInputUI } from 'native-uikit'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

export default {
  title: 'Design System/Elements',
  component: TextInputUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 20, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    placeholder: 'Input anything',
    label: 'Text Field Label',
    help: 'This is help text or error message',
    error: true,
    required: true,
    containerStyle: {},
    labelProps: {},
    inputContainerStyle: {},
    inputStyle: {},
    errorStyle: {},
    helpProps: {},
  },
} as ComponentMeta<typeof TextInputUI>

const Template: ComponentStory<typeof TextInputUI> = (args) => <TextInputUI {...args} />

export const TextInput = Template.bind({})
