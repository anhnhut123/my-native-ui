import type { PressableProps } from 'react-native'

import type { IconType } from './types'

type Inline<T, K extends keyof T> = Partial<
  {
    pressableProps: Omit<T, K>
  } & Pick<T, K>
>

export type InlinePressableProps = Inline<
  PressableProps,
  'onPress' | 'onLongPress' | 'onPressIn' | 'onPressOut'
>

export function getIconStyle(type: IconType, extraProps: any) {
  switch (type) {
    case 'zocial':
      return {}
    case 'octicon':
      return {}
    case 'material':
      return {}
    case 'material-community':
      return {}
    case 'ionicon':
      return {}
    case 'foundation':
      return {}
    case 'evilicon':
      return {}
    case 'entypo':
      return {}
    case 'font-awesome':
      return {}
    case 'font-awesome-5':
      return {
        solid: extraProps.solid || false,
        brand: extraProps.brand || false,
      }
    case 'simple-line-icon':
      return {}
    case 'feather':
      return {}
    case 'antdesign':
    case 'ant-design':
      return {}
    case 'fontisto':
      return {}
    default:
      return {}
  }
}

const customIcons: any = {}

export function registerCustomIconType(id: string, customIcon: any) {
  customIcons[id] = customIcon
}

export function getIconType(type: IconType) {
  switch (type) {
    case 'zocial':
      return require('react-native-vector-icons/Zocial').default
    case 'octicon':
      return require('react-native-vector-icons/Octicons').default
    case 'material':
      return require('react-native-vector-icons/MaterialIcons').default
    case 'material-community':
      return require('react-native-vector-icons/MaterialCommunityIcons').default
    case 'ionicon':
      return require('react-native-vector-icons/Ionicons').default
    case 'foundation':
      return require('react-native-vector-icons/Foundation').default
    case 'evilicon':
      return require('react-native-vector-icons/EvilIcons').default
    case 'entypo':
      return require('react-native-vector-icons/Entypo').default
    case 'font-awesome':
      return require('react-native-vector-icons/FontAwesome').default
    case 'font-awesome-5':
      return require('react-native-vector-icons/FontAwesome5').default
    case 'simple-line-icon':
      return require('react-native-vector-icons/SimpleLineIcons').default
    case 'feather':
      return require('react-native-vector-icons/Feather').default
    case 'ant-design':
      return require('react-native-vector-icons/AntDesign').default
    case 'fontisto':
      return require('react-native-vector-icons/Fontisto').default
    default:
      if (Object.prototype.hasOwnProperty.call(customIcons, type)) {
        return customIcons[type]
      }
      return require('react-native-vector-icons/Feather').default
  }
}
