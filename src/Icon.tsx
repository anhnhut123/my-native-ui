import React from 'react'
import {
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  TextStyle,
  TextProps,
  View,
  ViewStyle,
  ColorValue,
  TouchableHighlightProps,
  TouchableNativeFeedbackProps,
} from 'react-native'

import { useTheme } from './context'
import { getIconStyle, getIconType, InlinePressableProps } from './helpers'
import type { IconType } from './types'

export { type IconProps, type IconObject, Icon }

type VectorIconProps = TextProps & {
  /**
   * Size of the icon, can also be passed as fontSize in the style object.
   *
   * @default 12
   */
  size?: number | undefined

  /**
   * Name of the icon to show
   *
   */
  name: string

  /**
   * Color of the icon
   *
   */
  color?: ColorValue | number | undefined
}

type IconButtonProps = VectorIconProps &
  TouchableHighlightProps &
  TouchableNativeFeedbackProps & {
    /**
     * Text and icon color
     * Use iconStyle or nest a Text component if you need different colors.
     *
     * @default 'white'
     */
    color?: ColorValue | number | undefined

    /**
     * Border radius of the button
     * Set to 0 to disable.
     *
     * @default 5
     */
    borderRadius?: number | undefined

    /**
     * Styles applied to the icon only
     * Good for setting margins or a different color.
     *
     * @default {marginRight: 10}
     */
    iconStyle?: TextStyle | undefined

    /**
     * Style prop inherited from TextProps and TouchableWithoutFeedbackProperties
     * Only exist here so we can have ViewStyle or TextStyle
     *
     */
    style?: ViewStyle | TextStyle | undefined

    /**
     * Background color of the button
     *
     * @default '#007AFF'
     */
    backgroundColor?: ColorValue | number | undefined
  }

type IconProps = InlinePressableProps &
  IconButtonProps & {
    name: string
    type?: IconType
    style?: TextStyle
    offset?: number
    size?: number
    color?: string
    solid?: boolean /** Uses the solid font. */
    brand?: boolean /** Uses the brands font (FontAwesome5 only). */

    /** Provide all props from react-native Icon component. */
    iconProps?: VectorIconProps

    /** Update React Native Component.
     *  @default `Press handlers present then Pressable else View`
     */
    Component?: any

    /** Disables onPress events. Only works when `onPress` has a handler. */
    disabled?: boolean

    /** Style for the button when disabled. Only works when `onPress` has a handler. */
    disabledStyle?: StyleProp<ViewStyle>
  }

type IconObject = {
  /** Name of icon. */
  name?: string

  /** Color of icon. */
  color?: string

  /** Size of icon. */
  size?: number

  /** Type of icon */
  type?: IconType

  /** Apply style to the icon using iconStyle. */
  iconStyle?: StyleProp<TextStyle>
}

export type IconNode = boolean | React.ReactElement<{}> | Partial<IconProps>

function Icon({
  name,
  size = 24,
  color,
  type = 'feather',
  solid = false,
  brand = false,

  iconStyle,
  iconProps,
  // underlayColor = 'transparent',

  disabled = false,
  // disabledStyle,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  Component = onPress || onLongPress || onPressIn || onPressOut
    ? Pressable
    : View,

  pressableProps,
  ...rest
}: IconProps) {
  const { colors } = useTheme()
  const IconComponent = type ? getIconType(type) : null
  const iconSpecificStyle = type ? getIconStyle(type, { solid, brand }) : null

  return (
    <View
      style={StyleSheet.flatten([
        styles.container,

        iconStyle && iconStyle.borderRadius
          ? {
              borderRadius: iconStyle.borderRadius,
            }
          : {},
      ])}
      testID="RNE__ICON__CONTAINER"
    >
      <Component
        testID="RNE__ICON__CONTAINER_ACTION"
        {...{
          onPress,
          onLongPress,
          onPressIn,
          onPressOut,
          disabled,
          accessibilityRole: 'button',
          ...pressableProps,
          ...rest,
        }}
      >
        <IconComponent
          testID="RNE__ICON__Component"
          style={StyleSheet.flatten([
            { backgroundColor: 'transparent' },
            iconStyle && iconStyle,
          ])}
          size={size}
          name={name}
          color={color || colors.primary[500]}
          {...iconSpecificStyle}
          {...iconProps}
        />
      </Component>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  button: {
    margin: 7,
  },
  raised: {
    ...Platform.select({
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  disabled: {
    backgroundColor: '#D1D5D8',
  },
})
