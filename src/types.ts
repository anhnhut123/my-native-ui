import type { LiteralUnion } from 'type-fest'

export type IconType = LiteralUnion<
  | 'material'
  | 'material-community'
  | 'simple-line-icon'
  | 'zocial'
  | 'font-awesome'
  | 'octicon'
  | 'ionicon'
  | 'foundation'
  | 'evilicon'
  | 'entypo'
  | 'antdesign'
  | 'font-awesome-5'
  | 'feather'
  | 'ant-design'
  | 'fontisto',
  string
>
