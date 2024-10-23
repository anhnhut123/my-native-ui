import React from 'react'
import { blue, Icon as IconUI } from 'native-uikit'

import { View } from 'react-native'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

export default {
  title: 'Design System/Elements',
  component: IconUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 22, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    name: 'activity',
    type: 'feather',
    color: blue[500],
    size: 24,
    solid: true,
  },
} as ComponentMeta<typeof IconUI>

const Template: ComponentStory<typeof IconUI> = (args) => <IconUI {...args} />

export const Icon = Template.bind({})
