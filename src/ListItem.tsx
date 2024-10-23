import React from 'react'
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  ViewProps,
} from 'react-native'

import { useTheme } from './context'
import { Icon, IconProps } from './Icon'
import { Text, TextProps } from './Text'

export { ListItem }

const ANDROID_SECONDARY = 'rgba(0, 0, 0, 0.54)'

type ListItemProps = TouchableOpacityProps & {
  /** Additional main container styling. */
  containerStyle?: StyleProp<ViewStyle>
  /** Specific styling to be used when list item is disabled. */
  disabledStyle?: StyleProp<ViewStyle>

  /** Add divider at the top of the list item. */
  topDivider?: boolean

  /** Add divider at the bottom of the list item. */
  bottomDivider?: boolean

  /** Adds spacing between the leftComponent, the title component & right component. */
  pad?: number

  /** Replace element with custom element. */
  Component?: typeof React.Component

  /** Container for linear gradient. */
  ViewComponent?: typeof React.Component

  dividerStyle?: ViewStyle
}

function ListItem({
  topDivider,
  bottomDivider,
  children,
  pad = 18,
  containerStyle,
  disabled,
  disabledStyle,
  onPress,
  onLongPress,
  Component = onPress || onLongPress ? TouchableOpacity : View,
  ViewComponent = View,
  dividerStyle,
  ...rest
}: ListItemProps & {
  Title?: typeof ListItemTitle
  Subtitle?: typeof ListItemSubtitle
  Content?: typeof ListItemContent
  Chevron?: typeof ListItemChevron
}) {
  const { colors } = useTheme()

  return (
    <Component
      testID="RNE__ListItem"
      {...rest}
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
    >
      <PadView
        Component={ViewComponent}
        style={StyleSheet.flatten([
          {
            ...Platform.select({
              ios: {
                padding: 14,
              },
              default: {
                padding: 16,
              },
            }),
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderColor: colors.border,
          },
          topDivider && { borderTopWidth: 1, ...dividerStyle },
          bottomDivider && { borderBottomWidth: 1, ...dividerStyle },
          containerStyle,
          disabled && disabledStyle,
        ])}
        pad={pad}
      >
        {children}
      </PadView>
    </Component>
  )
}

function ListItemTitle({
  style,
  right,
  children,
  size = 'sm',
  ...rest
}: TextProps & {
  right?: boolean /** @description add right title */
}) {
  return (
    <Text
      testID="RNE__ListItem__Title"
      style={StyleSheet.flatten([
        styles.title,
        right && styles.rightTitle,
        style,
      ])}
      size={size}
      {...rest}
    >
      {children}
    </Text>
  )
}

function ListItemSubtitle({ style, children, ...props }: TextProps) {
  const { colors } = useTheme()
  return (
    <Text
      testID="RNE__ListItem__SubTitle"
      size="xs"
      style={StyleSheet.flatten([styles.subtitle, style])}
      color={colors.neutral[400]}
      {...props}
    >
      {children}
    </Text>
  )
}

function ListItemContent({
  style,
  right,
  children,
  ...rest
}: TextProps & { right?: boolean }) {
  const containerStyle = right
    ? styles.contentRightContainer
    : styles.contentContainer
  return (
    <View
      testID="RNE__ListItem__Content"
      style={StyleSheet.flatten([containerStyle, style])}
      {...rest}
    >
      {children}
    </View>
  )
}

function ListItemChevron({ style, color, ...rest }: Partial<IconProps>) {
  const { colors } = useTheme()
  return (
    <Icon
      testID="RNE__ListItem__Chevron"
      name="chevron-right"
      color={color || colors.neutral[400]}
      style={StyleSheet.flatten([{ alignSelf: 'center' }, style])}
      {...rest}
    />
  )
}

function PadView({
  children,
  pad,
  Component,
  ...rest
}: ViewProps & {
  Component: React.ComponentClass
  pad: number
}) {
  const _root = React.useRef(null)

  const length = React.Children.count(children)
  const Container: any = Component || View

  return (
    <Container testID="RNE__PadView" {...rest} ref={_root}>
      {React.Children.map(
        children,
        (child, index) =>
          child && [
            child,
            index !== length - 1 && <View style={{ paddingLeft: pad }} />,
          ]
      )}
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        padding: 14,
      },
      default: {
        padding: 16,
      },
    }),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  contentRightContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontSize: 17,
      },
      default: {
        fontSize: 16,
      },
    }),
  },
  rightTitle: {
    color: ANDROID_SECONDARY,
  },
  subtitle: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
      default: {
        fontSize: 14,
      },
    }),
  },
})

ListItem.Title = ListItemTitle
ListItem.Subtitle = ListItemSubtitle
ListItem.Content = ListItemContent
ListItem.Chevron = ListItemChevron
