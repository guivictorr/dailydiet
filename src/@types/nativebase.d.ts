import { Theme } from 'native-base'
import { CustomColors } from '../style/theme'

declare module 'native-base' {
  export interface ICustomTheme {
    colors: CustomColors & Theme['colors']
  }
}
