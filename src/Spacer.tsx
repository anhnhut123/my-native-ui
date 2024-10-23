import React from 'react'
import { StyleSheet, View } from 'react-native'

type Props = {
  horizontal?: boolean
  size?: number
}

export function Spacer({ horizontal = false, size = 0 }: Props) {
  return (
    <View
      testID="RNE__Spacer"
      style={
        size === 0
          ? styles.container
          : !horizontal
          ? { height: size }
          : { width: size }
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
