import React from 'react'
import { View } from 'react-native'

import { Image as ImageUI, Text } from 'native-uikit'
import type { ComponentMeta, ComponentStory } from '@storybook/react-native'

import TestImage from '../assets/icon.png'

export default {
  title: 'Design System/Elements',
  component: ImageUI,
  decorators: [
    (Story: any) => (
      <View style={{ padding: 20, flex: 1 }}>
        <Story />
      </View>
    ),
  ],
  args: {
    source: TestImage,
    style: { width: 100, height: 100 },
    PlaceholderContent: <Text>Test</Text>,
    placeholderStyle: {
      height: 100,
      width: 100,
    },
  },
} as ComponentMeta<typeof ImageUI>

const Template: ComponentStory<typeof ImageUI> = (args) => <ImageUI {...args} />

export const Image = Template.bind({})
