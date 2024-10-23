import React from 'react'
import { StyleSheet } from 'react-native'
import {
  Text as RNText,
  TextProps as RNTextProps,
  Dimensions,
  Platform,
  PixelRatio,
} from 'react-native'
import { useTheme } from './context'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

// based on screen width
const scale = SCREEN_WIDTH / (Platform.OS === 'ios' ? 410 : 360)

const normalize = (size: number) => {
  const newSize = size * scale
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 4
  }
}

export type TextProps = RNTextProps & {
  /**
   * @description
   * default: sm
   * xs: 14
   * sm: 16
   * normal: 18
   * md: 24
   * lg: 36
   */
  size?: 'xs' | 'sm' | 'normal' | 'md' | 'lg' | number
  /**
   * @description
   * use normal fontWeight when have no custom font family
   * */
  fontWeight?: 'normal' | 'bold' | 'medium' | 'semibold'
  color?: string
}

export function Text({
  style,
  size = 'sm',
  fontWeight = 'normal',
  color = '',
  children,
  ...rest
}: React.PropsWithChildren<TextProps>) {
  const { colors, fontFamily, fontSize: _fontSize } = useTheme()

  let styles = { bold: {}, normal: {}, medium: {}, semibold: {} }

  let fontSize = 16

  switch (size) {
    case 'lg':
      fontSize = normalize(_fontSize.lg)
      break
    case 'md':
      fontSize = normalize(_fontSize.md)
      break
    case 'sm':
      fontSize = normalize(_fontSize.sm)
      break
    case 'xs':
      fontSize = normalize(_fontSize.xs)
      break
    default:
      fontSize = normalize(_fontSize.normal)
      break
  }

  if (typeof size === 'number') fontSize = normalize(size)

  switch (fontWeight) {
    case 'bold':
      styles.bold = { fontFamily: fontFamily?.bold }
      break
    case 'medium':
      styles.medium = { fontFamily: fontFamily?.medium }
      break
    case 'semibold':
      styles.semibold = { fontFamily: fontFamily?.semibold }
      break
    default:
      styles.normal = { fontFamily: fontFamily?.regular }
      break
  }

  return (
    <RNText
      testID="RNE__TEXT"
      style={StyleSheet.flatten([
        style,
        { ...styles[fontWeight], fontSize, color: color || colors.text },
      ])}
      {...rest}
    >
      {children}
    </RNText>
  )
}
