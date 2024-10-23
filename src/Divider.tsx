import React from 'react'
import {
  View,
  StyleSheet,
  ViewProps,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { useTheme } from './context'

export { Divider, type DividerProps }

type DividerProps = ViewProps & {
  /**  The color of the component. */
  color?: string

  /**  Applies inset to the divider. */
  inset?: boolean

  /**  Applies inset to a specific direction to the divider. */
  insetType?: 'left' | 'right' | 'middle'

  /**  Applies style to the divider. */
  style?: StyleProp<ViewStyle>

  /**  Adds subHeader text to the divider. */
  subHeader?: string

  /**  Adds style to the subHeader text of the divider */
  subHeaderStyle?: StyleProp<TextStyle>

  /**  Apply orientation to the divider. */
  orientation?: 'horizontal' | 'vertical'

  /**  Apply width to the divider. */
  width?: number
}

function Divider({
  color,
  inset = false,
  insetType = 'left',
  orientation = 'horizontal',
  style,
  subHeader,
  subHeaderStyle,
  width,
  ...rest
}: DividerProps) {
  const { colors } = useTheme()

  return (
    <>
      <View
        testID="RNE__Divider"
        style={StyleSheet.flatten([
          styles.divider,
          style,
          inset &&
            (insetType === 'left'
              ? styles.leftInset
              : insetType === 'right'
              ? styles.rightInset
              : { ...styles.leftInset, ...styles.rightInset }),
          orientation === 'vertical' && {
            ...styles.vertical,
            borderRightColor: colors.border,
          },
          width
            ? orientation === 'horizontal'
              ? { borderBottomWidth: width }
              : { borderRightWidth: width }
            : null,
          color
            ? orientation === 'horizontal'
              ? { borderBottomColor: color }
              : { borderRightColor: color }
            : null,
          { borderBottomColor: colors.border },
        ])}
        {...rest}
      />
      {subHeader && orientation === 'horizontal' ? (
        <Text
          style={StyleSheet.flatten([
            styles.subHeader,
            subHeaderStyle,
            inset && styles.leftInset,
          ])}
        >
          {subHeader}
        </Text>
      ) : null}
    </>
  )
}

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  leftInset: {
    marginLeft: 72,
  },
  rightInset: {
    marginRight: 72,
  },
  vertical: {
    borderRightWidth: StyleSheet.hairlineWidth,
    height: 'auto',
    alignSelf: 'stretch',
  },
  subHeader: {
    includeFontPadding: false,
  },
})
