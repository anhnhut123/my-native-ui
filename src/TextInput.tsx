import React from 'react'
import {
  TextInput as RNTextInput,
  View,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  Platform,
  TouchableOpacity,
} from 'react-native'

import { useTheme } from './context'

import { Icon, IconProps } from './Icon'
import { Text, TextProps } from './Text'

export type TextInputProps = RNTextInputProps & {
  containerStyle?: StyleProp<ViewStyle>
  label?: string
  labelProps?: TextProps
  leftIcon?: IconProps
  leftIconContainerStyle?: StyleProp<ViewStyle>
  rightIcon?: IconProps
  rightIconContainerStyle?: StyleProp<ViewStyle>
  inputContainerStyle?: StyleProp<ViewStyle>
  inputStyle?: StyleProp<TextStyle>
  error?: boolean
  errorStyle?: StyleProp<TextStyle>
  help?: string
  helpProps?: TextProps
  required?: boolean
  onPressRightIcon?: () => void
}
export const TextInput = React.forwardRef(
  (
    {
      containerStyle,
      leftIcon,
      leftIconContainerStyle,
      rightIcon,
      rightIconContainerStyle,
      label,
      labelProps,
      inputContainerStyle,
      inputStyle,
      error,
      help,
      helpProps,
      errorStyle,
      required,
      onPressRightIcon,
      ...props
    }: TextInputProps,
    ref: any
  ) => {
    const { colors, fontFamily } = useTheme()
    return (
      <View
        testID="RNE__TEXT__INPUT__CONTAINER"
        style={StyleSheet.flatten([styles.container, containerStyle])}
      >
        {!!label && (
          <Text testID="RNE__TEXT__LABEL" {...labelProps}>
            {label} {required && <Text color={colors.danger[500]}>*</Text>}
          </Text>
        )}

        <View
          testID="RNE__INPUT__CONTAINER"
          style={StyleSheet.flatten([
            styles.inputContainer,
            { borderColor: error ? colors.danger[500] : colors.border },
            inputContainerStyle,
          ])}
        >
          {leftIcon && (
            <View
              testID="RNE__TEXT__LEFTICON__CONTAINER"
              style={StyleSheet.flatten([
                styles.iconContainer,
                leftIconContainerStyle,
              ])}
            >
              <Icon testID="RNE__TEXT__LEFTICON" {...leftIcon} />
            </View>
          )}
          <RNTextInput
            testID="RNE__TEXT__INPUT"
            ref={ref}
            style={StyleSheet.flatten([
              styles.input,
              { color: colors.text, fontFamily: fontFamily?.regular },
              inputStyle,
              errorStyle,
            ])}
            placeholderTextColor={colors.neutral[300]}
            underlineColorAndroid="transparent"
            {...props}
          />

          {rightIcon &&
            (onPressRightIcon ? (
              <TouchableOpacity onPress={onPressRightIcon}>
                <View
                  testID="RNE__TEXT__RIGHTICON__CONTAINER"
                  style={StyleSheet.flatten([
                    styles.iconContainer,
                    rightIconContainerStyle,
                  ])}
                >
                  <Icon testID="RNE__TEXT__RIGHTICON" {...rightIcon} />
                </View>
              </TouchableOpacity>
            ) : (
              <View
                testID="RNE__TEXT__RIGHTICON__CONTAINER"
                style={StyleSheet.flatten([
                  styles.iconContainer,
                  rightIconContainerStyle,
                ])}
              >
                <Icon testID="RNE__TEXT__RIGHTICON" {...rightIcon} />
              </View>
            ))}
        </View>

        {!!help && (
          <Text
            testID="RNE__TEXT__HELP"
            color={error ? colors.danger[500] : colors.border}
            style={helpProps?.style}
            {...helpProps}
          >
            {help}
          </Text>
        )}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    height: 40,
    padding: 10,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    height: Platform.OS === 'ios' ? 35 : 50,
    paddingBottom: Platform.OS === 'ios' ? 0 : 7,
  },
  iconContainer: {
    height: Platform.OS === 'ios' ? 35 : 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 4,
    marginVertical: 4,
  },
})
