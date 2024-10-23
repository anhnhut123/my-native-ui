import React from 'react'
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  Platform,
  TextStyle,
  ViewStyle,
  View,
  StyleProp,
  Pressable,
  PressableProps,
} from 'react-native'

import type { Theme } from './theme'
import { useTheme } from './context'
import renderNode from './renderNode'

import { Icon, IconNode } from './Icon'
import { Text, TextProps } from './Text'

const positionStyle = {
  top: 'column',
  bottom: 'column-reverse',
  left: 'row',
  right: 'row-reverse',
}

const defaultLoadingProps = (
  type: 'solid' | 'clear' | 'outline',
  theme: Theme
): ActivityIndicatorProps => ({
  color: type === 'solid' ? 'white' : theme.colors.primary[500],
  size: 'small',
})

export type ButtonProps = PressableProps & {
  containerStyle?: StyleProp<ViewStyle>
  title?: string
  titleStyle?: StyleProp<TextStyle>
  titleProps?: TextProps
  buttonStyle?: StyleProp<ViewStyle>

  /** Prop to display a loading spinner. */
  loading?: boolean

  /** Add additional styling for loading component. */
  loadingStyle?: StyleProp<ViewStyle>

  /** Add additional props for ActivityIndicator component. */
  loadingProps?: ActivityIndicatorProps

  /** Style of the button when disabled. */
  disabledStyle?: StyleProp<ViewStyle>

  /** Style of the title when disabled. */
  disabledTitleStyle?: StyleProp<TextStyle>

  type?: 'solid' | 'clear' | 'outline'
  /** Displays a centered icon (when no title) or to the left (with text). (can be used along with iconRight as well). Can be an object or a custom component. */
  icon?: IconNode

  /** Styling for Icon Component container. */
  iconContainerStyle?: StyleProp<ViewStyle>

  /** Displays Icon to the right of title. Needs to be used along with `icon` prop. */
  iconRight?: boolean

  /** Add raised button styling (optional). Has no effect if `type="clear"`. */
  raised?: boolean

  /** Displays Icon to the position mentioned. Needs to be used along with `icon` prop. */
  iconPosition?: 'left' | 'right' | 'top' | 'bottom'

  size?: 'xs' | 'sm' | 'normal' | 'md' | 'lg' | number
}

function ButtonComp({
  title = '',
  titleStyle: passedTitleStyle,
  titleProps,
  buttonStyle,
  loading,
  loadingStyle,
  loadingProps: passedLoadingProps,
  containerStyle,
  type = 'solid',
  disabled,
  disabledStyle,
  disabledTitleStyle,
  icon,
  iconContainerStyle,
  iconRight = false,
  raised = false,
  iconPosition = 'left',
  size = 'normal',
  ...rest
}: ButtonProps) {
  const theme = useTheme()

  const titleStyle: StyleProp<TextStyle> = StyleSheet.flatten([
    {
      color: type === 'solid' ? 'white' : theme.colors.primary[500],
    },
    styles.title,
    passedTitleStyle,
    disabled && disabledTitleStyle,
  ])

  const loadingProps: ActivityIndicatorProps = {
    ...defaultLoadingProps(type, theme),
    ...passedLoadingProps,
  }

  return (
    <View
      testID="RNE__Button__Container"
      style={[
        styles.container,
        containerStyle,
        raised && !disabled && type !== 'clear' && styles.raised,
      ]}
    >
      <Pressable
        disabled={loading || disabled}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.5 : 1,
          },
        ]}
        {...rest}
      >
        <View
          testID="RNE__Button"
          style={StyleSheet.flatten([
            styles.button,
            {
              // flex direction based on iconPosition
              // if iconRight is true, default to right
              flexDirection:
                (positionStyle as any)[iconRight ? 'right' : iconPosition] ||
                'row',
            },
            {
              backgroundColor:
                type === 'solid' ? theme.colors.primary[500] : 'transparent',
              borderColor: theme.colors.primary[500],
              borderWidth: type === 'outline' ? StyleSheet.hairlineWidth : 0,
            },
            buttonStyle,
            (loading || disabled) &&
              type === 'solid' && {
                backgroundColor: theme?.colors?.disabled,
              },
            (loading || disabled) &&
              type === 'outline' && {
                borderColor: theme?.colors?.disabled,
              },
            (loading || disabled) && disabledStyle,
          ])}
        >
          {loading && (
            <ActivityIndicator
              testID="RNE__Button__Loading"
              style={StyleSheet.flatten([styles.loading, loadingStyle])}
              color={loadingProps?.color || theme.colors.neutral[300]}
              size={loadingProps?.size}
              {...loadingProps}
            />
          )}

          {!loading &&
            icon &&
            renderNode(Icon, icon, {
              style: StyleSheet.flatten(iconContainerStyle),
            })}

          {!loading &&
            !!title &&
            renderNode(Text, title, {
              style: { ...titleStyle },
              size: titleStyle.fontSize || size,
              color: titleStyle.color,
              ...titleProps,
            })}
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 8,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  title: {
    textAlign: 'center',
    paddingVertical: 1,
  },
  raised: {
    backgroundColor: '#FFF',
    overflow: 'visible',
    ...Platform.select({
      android: {
        elevation: 4,
      },
      default: {
        shadowColor: 'rgba(0,0,0, .4)',
        shadowOffset: { height: 1, width: 1 },
        shadowOpacity: 1,
        shadowRadius: 1,
      },
    }),
  },
  loading: {
    marginVertical: 2,
  },
})

const withPreventDoubleClick = (WrappedComponent: React.FC<ButtonProps>) => {
  class PreventDoubleClick extends React.PureComponent<ButtonProps> {
    busy = false

    debouncedOnPress = (event: any) => {
      if (typeof this.props.onPress === 'function') this.props.onPress(event)
    }

    debounce = (callback: (event?: any) => void, wait: number) => {
      if (this.busy) return
      this.busy = true
      setTimeout(() => {
        this.busy = false
      }, wait)
      callback()
    }

    onPress = () => this.debounce(this.debouncedOnPress, 300)

    render() {
      return <WrappedComponent {...this.props} onPress={this.onPress} />
    }
  }

  return PreventDoubleClick
}

export const Button = withPreventDoubleClick(ButtonComp)
