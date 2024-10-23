import React from 'react'
import {
  Animated,
  ImageLoadEventData,
  ImageProps as RNImageProps,
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  View,
  Pressable,
  ViewStyle,
  Image as ImageNative,
} from 'react-native'
import type { InlinePressableProps } from './helpers'

export interface ImageProps extends RNImageProps, InlinePressableProps {
  /** Define the component passed to image.
   *  @default `Press handlers present then Pressable else View`
   */
  Component?: any

  /** Specify a different component as the Image component. */
  ImageComponent?: typeof ImageNative
  /** Content to load when Image is rendering.
   */
  PlaceholderContent?: React.ReactElement

  /** Additional styling for the container. */
  containerStyle?: StyleProp<ViewStyle>

  /** Additional styling for the children container. */
  childrenContainerStyle?: StyleProp<ViewStyle>

  /** Additional styling for the placeholder container. */
  placeholderStyle?: StyleProp<ViewStyle>

  /** Perform fade transition on image load. */
  transition?: boolean

  /** Perform fade transition on image load. */
  transitionDuration?: number
}

export function Image({
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
  Component = onPress || onLongPress || onPressIn || onPressOut
    ? Pressable
    : View,
  containerStyle,
  childrenContainerStyle = null,
  style = {},
  ImageComponent = ImageNative,
  onLoad,
  children,
  transition,
  transitionDuration = 360,
  pressableProps,
  ...props
}: React.PropsWithChildren<ImageProps>) {
  const placeholderOpacity = React.useRef(new Animated.Value(1))

  const onLoadHandler = React.useCallback(
    (event: NativeSyntheticEvent<ImageLoadEventData>) => {
      if (transition) {
        Animated.timing(placeholderOpacity.current, {
          toValue: 0,
          duration: transitionDuration,
          useNativeDriver: true,
        }).start()
      } else {
        placeholderOpacity.current.setValue(0)
      }
      onLoad?.(event)
    },
    [transition, transitionDuration, onLoad]
  )

  return (
    <Component
      {...pressableProps}
      {...{ onPress, onPressIn, onPressOut, onLongPress }}
      accessibilityIgnoresInvertColors={true}
      style={StyleSheet.flatten([styles.container, containerStyle])}
    >
      <ImageComponent
        testID="RNE__Image"
        {...props}
        {...{ transition, transitionDuration }}
        onLoad={onLoadHandler}
        style={StyleSheet.flatten([StyleSheet.absoluteFill, style])}
      />
      {/* Children for Image */}
      <View
        testID="RNE__Image__children__container"
        style={childrenContainerStyle ?? style}
      >
        {children}
      </View>
    </Component>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  },
  placeholder: {
    backgroundColor: '#BDBDBD',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
