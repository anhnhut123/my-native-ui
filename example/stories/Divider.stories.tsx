import React from 'react'
import { View } from 'react-native'

import { Divider as DividerUI, Text } from 'native-uikit'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

export default {
  title: 'Design System/Elements',
  component: DividerUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 20, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    width: 10,
    color: '#000',
    inset: true,
    insetType: 'middle',
    subHeader: 'Sub Header',
  },
} as ComponentMeta<typeof DividerUI>

const Template: ComponentStory<typeof DividerUI> = (args) => (
  <View style={{ gap: 20 }}>
    <Text>AAA</Text>
    <DividerUI {...args} />
    <Text>BBB</Text>
  </View>
)

export const Divider = Template.bind({})
