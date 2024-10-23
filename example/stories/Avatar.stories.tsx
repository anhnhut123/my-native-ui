import React from 'react'
import { View } from 'react-native'

import { Avatar as AvatarUI, Text } from 'native-uikit'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

import TestImage from '../assets/favicon.png'

export default {
  title: 'Design System/Elements',
  component: AvatarUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 22, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    source: TestImage,
    rounded: true,
    size: 'small',
  },
} as ComponentMeta<typeof AvatarUI>

const Template: ComponentStory<typeof AvatarUI> = (args) => (
  <View style={{ justifyContent: 'center', alignItems: 'center', gap: 50 }}>
    <View>
      <AvatarUI {...args} size="small" />
      <Text>Small</Text>
    </View>
    <View>
      <AvatarUI {...args} size="medium" />
      <Text>Medium</Text>
    </View>
    <View>
      <AvatarUI {...args} size="large" />
      <Text>Large</Text>
    </View>
    <View>
      <AvatarUI {...args} size="xlarge" />
      <Text>XLarge</Text>
    </View>
    <AvatarUI {...args} />
  </View>
)

export const Avatar = Template.bind({})
