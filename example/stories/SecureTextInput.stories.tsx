import React from 'react'
import { View } from 'react-native'

import { SecureTextInput as SecureTextInputUI } from 'native-uikit'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

export default {
  title: 'Design System/Elements',
  component: SecureTextInputUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 20, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    placeholder: 'Input anything',
    label: 'Secure Text Field Label',
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
} as ComponentMeta<typeof SecureTextInputUI>

const Template: ComponentStory<typeof SecureTextInputUI> = (args) => <SecureTextInputUI {...args} />

export const SecureTextInput = Template.bind({})
