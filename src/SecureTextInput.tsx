import React from 'react'

import { useTheme } from './context'
import { TextInput, TextInputProps } from './TextInput'

export { SecureTextInput }

function SecureTextInput({ ...rest }: TextInputProps) {
  const { colors } = useTheme()
  const [hide, setHide] = React.useState(true)

  return (
    <TextInput
      secureTextEntry={hide}
      rightIcon={{
        name: !hide ? 'eye-off' : 'eye',
        color: colors.neutral[400],
        size: 18,
        onPress: () => setHide(!hide),
      }}
      {...rest}
    />
  )
}
