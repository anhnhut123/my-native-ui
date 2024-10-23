import React from 'react'
import { View } from 'react-native'

import { Spacer, Text as TextUI } from 'native-uikit'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

export default {
  title: 'Design System/Elements',
  component: TextUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 20, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    size: 'lg',
    fontWeight: 'bold',
    children: 'Hello',
    onPress: () => {},
    color: '#000',
  },
} as ComponentMeta<typeof TextUI>

const Template: ComponentStory<typeof TextUI> = (args) => (
  <View>
    <TextUI fontWeight="normal" size="xs">
      Size xs
    </TextUI>
    <TextUI fontWeight="normal" size="sm">
      Size sm
    </TextUI>
    <TextUI fontWeight="medium" size="normal">
      Size normal
    </TextUI>
    <TextUI fontWeight="semibold" size="md">
      Size md
    </TextUI>
    <TextUI fontWeight="bold" size="lg">
      Size lg{' '}
    </TextUI>
    <Spacer size={12} />
    <TextUI {...args} />
  </View>
)

export const Text = Template.bind({})
