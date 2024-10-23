import React from 'react'
import {
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native'
import type { InlinePressableProps } from './helpers'

import renderNode from './renderNode'

import { Text, TextProps } from './Text'

export { Badge, type BadgeProps }

type BadgeProps = {
  /** Style for the container. */
  containerStyle?: StyleProp<ViewStyle>

  /** Additional styling for badge (background) view component. */
  badgeStyle?: StyleProp<ViewStyle>

  /** Extra props for text component. */
  textProps?: TextProps

  /** Extra styling for icon component. */
  textStyle?: StyleProp<TextStyle>

  /** Text value to be displayed by badge, defaults to empty. */
  value?: React.ReactNode

  /** Custom component to replace the badge outer component.
   *  @default `Press handlers present then Pressable else View`
   */
  // Component?: typeof React.Component
  Component?: any

  /** Determines size of the indicator. */
  size?: 'xs' | 'sm' | 'normal' | 'md' | 'lg'
} & InlinePressableProps

const _size = 18
const miniSize = 8

function Badge({
  containerStyle,
  textStyle: passedTitleStyle,
  textProps,
  badgeStyle,
  onPress,
  onLongPress,
  onPressOut,
  onPressIn,
  Component = onPress || onLongPress || onPressIn || onPressOut
    ? Pressable
    : View,
  value,
  pressableProps,
  size = 'normal',
  ...rest
}: BadgeProps) {
  const textStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    styles.text,
    passedTitleStyle,
  ])
  const element = renderNode(Text, value, {
    style: { ...textStyle },
    size: textStyle?.fontSize || size,
    color: textProps?.color || textStyle?.color || 'black',
    ...textProps,
  })

  return (
    <View
      testID="RNE__Badge__Container"
      style={StyleSheet.flatten([containerStyle && containerStyle])}
    >
      <Component
        {...{
          onPress,
          onLongPress,
          onPressOut,
          onPressIn,
          ...pressableProps,
          ...rest,
        }}
        testID="RNE__Badge"
        style={StyleSheet.flatten([
          {
            alignSelf: 'center',
            minWidth: _size,
            height: _size,
            borderRadius: _size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#FFF',
          },
          !element && styles.miniBadge,
          badgeStyle && badgeStyle,
        ])}
      >
        {element}
      </Component>
    </View>
  )
}

const styles = StyleSheet.create({
  miniBadge: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    minWidth: miniSize,
    height: miniSize,
    borderRadius: miniSize / 2,
  },
  text: {
    paddingHorizontal: 4,
  },
})
