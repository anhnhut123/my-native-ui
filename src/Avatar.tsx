import React from 'react'
import {
  ImageSourcePropType,
  ImageStyle,
  Pressable,
  TouchableOpacity,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
  Image as RNImage,
  StyleSheet,
  ImageURISource,
  ColorValue,
  Platform,
} from 'react-native'

import { Icon, IconObject, IconProps } from './Icon'
import { Image, ImageProps } from './Image'

import { useTheme } from './context'
import type { InlinePressableProps } from './helpers'
import renderNode from './renderNode'

export { Avatar, type AvatarProps }

type AvatarIcon = IconObject & {
  iconStyle?: StyleProp<TextStyle>
}

type AvatarProps = InlinePressableProps & {
  /** Component for enclosing element (eg: TouchableHighlight, View, etc). */
  Component?: typeof React.Component

  /** Callback function when pressing component. */
  onPress?(): void

  /** Callback function when long pressing component. */
  onLongPress?(): void

  /** Styling for outer container. */
  containerStyle?: StyleProp<ViewStyle>

  /** Image source to be displayed on avatar. */
  source: ImageSourcePropType

  /** Style for avatar image. */
  avatarStyle?: ImageStyle

  /** Makes the avatar circular. */
  rounded?: boolean

  /** Renders title in the placeholder. */
  title?: string

  /** Style for the title. */
  titleStyle?: StyleProp<TextStyle>

  /** Style for the view outside image or icon. */
  overlayContainerStyle?: StyleProp<TextStyle>

  /** Opacity when pressed. */
  activeOpacity?: number

  /** Displays an icon as the main content of the Avatar. **Cannot be used alongside title**. When used with the `source` prop it will be used as the placeholder. */
  icon?: AvatarIcon

  /** Extra styling for icon component. */
  iconStyle?: StyleProp<TextStyle>

  /** Size of the avatar. */
  size?: ('small' | 'medium' | 'large' | 'xlarge') | number

  /** Adds style to the placeholder wrapper. */
  placeholderStyle?: StyleProp<ViewStyle>

  /** Custom placeholder element (by default, it's the title). */
  renderPlaceholderContent?: React.ReactElement<{}>

  /** Optional properties to pass to the avatar e.g "resizeMode". */
  imageProps?: Partial<ImageProps>

  /** Custom ImageComponent for Avatar. */
  ImageComponent?: typeof RNImage
}

function Avatar({
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  Component = onPress || onLongPress || onPressIn || onPressOut
    ? TouchableOpacity
    : View,
  containerStyle,
  icon,
  iconStyle,
  source,
  size = 'small',
  avatarStyle,
  rounded,
  title,
  titleStyle,
  overlayContainerStyle,
  imageProps,
  placeholderStyle,
  renderPlaceholderContent,
  ImageComponent = RNImage,
  children,
  pressableProps,
  ...rest
}: React.PropsWithChildren<AvatarProps> & { Accessory?: typeof Accessory }) {
  const { avatarSizes } = useTheme()
  const width =
    typeof size === 'number' ? size : avatarSizes[size] || avatarSizes.small

  const height = width
  const titleSize = width / 2
  const iconSize = width / 2

  const PlaceholderContent =
    (renderPlaceholderContent &&
      renderNode(undefined, renderPlaceholderContent)) ||
    (title && (
      <Text
        testID="RNE__Avatar__Placeholder__Title"
        style={StyleSheet.flatten([
          styles.title,
          { fontSize: titleSize },
          titleStyle,
        ])}
      >
        {title}
      </Text>
    )) ||
    (icon && (
      <Icon
        testID="RNE__Avatar__Placeholder__Icon"
        style={StyleSheet.flatten([iconStyle && iconStyle])}
        color={icon.color || 'white'}
        name={icon.name || 'account'}
        size={icon.size || iconSize}
        type={icon.type || 'material-community'}
      />
    ))

  const hidePlaceholder = !(source && (source as ImageURISource).uri)

  const imageContainerStyle = StyleSheet.flatten([
    styles.overlayContainer,
    rounded && { borderRadius: width / 2, overflow: 'hidden' },
    overlayContainerStyle,
    imageProps && imageProps.containerStyle,
  ])

  if (imageProps && imageProps.containerStyle) {
    delete imageProps.containerStyle
  }

  return (
    <Component
      testID="RNE__Avatar__Container"
      style={StyleSheet.flatten([
        styles.container,
        { height, width },
        rounded && { borderRadius: width / 2 },
        containerStyle,
      ])}
      {...{
        onPress,
        onLongPress,
        onPressIn,
        onPressOut,
        ...pressableProps,
        ...rest,
      }}
    >
      <Image
        testID="RNE__Avatar__Image"
        placeholderStyle={StyleSheet.flatten([
          placeholderStyle,
          hidePlaceholder && styles.hiddenPlaceholderStyle,
        ])}
        PlaceholderContent={PlaceholderContent}
        containerStyle={imageContainerStyle as StyleProp<TextStyle>}
        source={source}
        borderRadius={rounded ? width / 2 : undefined}
        {...imageProps}
        style={StyleSheet.flatten([
          styles.avatar,
          imageProps && imageProps.style,
          avatarStyle,
        ])}
        ImageComponent={ImageComponent}
      />
      {children}
    </Component>
  )
}

function Accessory({
  size = 10,
  style,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  source,
  pressableProps,
  type = 'material',
  name = 'mode-edit',
  ...rest
}: Partial<IconProps> &
  Partial<ImageProps> &
  InlinePressableProps & {
    /** Add underlay color to the accessory of avatar. */
    underlayColor?: ColorValue

    /** Add custom styling to the accessory of avatar. */
    style?: StyleProp<ViewStyle>
  }) {
  return (
    <Pressable
      testID="RNE__Avatar__Accessory"
      {...{
        // android_ripple: (onPress || onLongPress) && androidRipple(underlayColor),
        ...pressableProps,
      }}
      style={
        StyleSheet.flatten([
          styles.accessory,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
          },
          style,
        ]) as StyleProp<ViewStyle>
      }
      {...{ onPressOut, onPressIn, onPress, onLongPress }}
    >
      <View>
        {source ? (
          <Image
            testID="RNE__Avatar__Accessory__Image"
            source={source}
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
            }}
            {...rest}
          />
        ) : (
          <Icon
            testID="RNE__Avatar__Accessory__Icon"
            name={name}
            type={type}
            color="#FFF"
            size={size * 0.8}
            {...rest}
          />
        )}
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  avatar: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  overlayContainer: {
    flex: 1,
  },
  title: {
    color: '#FFF',
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
  hiddenPlaceholderStyle: {
    backgroundColor: 'transparent',
  },
  accessory: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#AAA',
    ...Platform.select({
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowRadius: 2,
        shadowOpacity: 0.5,
      },
    }),
  },
})

Avatar.Accessory = Accessory
