import { Badge, Divider,  Image, Spacer, Text, useTheme } from 'native-uikit'
import React from 'react'
import { View } from 'react-native'

import TestImage from '../assets/icon.png'

export function Content() {
  const { colors } = useTheme()

  return (
    <View>
      <Text size="sm" color={colors.primary[500]}>
        Content
      </Text>
      <Spacer size={18} />
      <Divider
        color={colors.danger[500]}
        width={5}
        subHeader="subHeader"
        insetType="middle"
        inset
      />
      <Text size="normal">Content</Text>
      <Image source={TestImage} style={{ width: 100, height: 100 }} />

      <View style={{ flexDirection: 'row' }}>
        <Text color={colors.danger[200]} size="md">
          Content
        </Text>
        <Divider inset color={colors.black} width={2} orientation="vertical" />
        <Text size="lg">Content</Text>
        <Spacer size={40} horizontal />
        <Text size="xs">Content</Text>
      </View>

      <Badge
        textStyle={{ color: colors.primary[600], fontSize: 16 }}
        containerStyle={{
          backgroundColor: colors.primary[50],
          marginHorizontal: 60,
          borderRadius: 999,
        }}
        badgeStyle={{
          height: 32,
        }}
        value="Default"
      />

    </View>
  )
}
