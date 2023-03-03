import { extendTheme } from 'native-base'

export const theme = extendTheme({
  components: {
    Text: {
      defaultProps: {
        color: 'gray.200',
      },
    },
    Heading: {
      defaultProps: {
        color: 'gray.100',
      },
    },
  },
  fontSizes: {
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    '2xl': 24,
    '3xl': 32,
  },
  colors: {
    redDark: '#BF3B44',
    redMid: '#F3BABD',
    redLight: '#F4E6E7',
    greenDark: '#639339',
    greenMid: '#CBE4B4',
    greenLight: '#E5F0DB',

    gray: {
      100: '#1B1D1E',
      200: '#333638',
      300: '#5c6265',
      400: '#b9bbbc',
      500: '#dddedf',
      600: '#eff0f0',
      700: '#fafafa',
    },
  },
  fonts: {
    heading: 'Nunito',
    body: 'Nunito',
    mono: 'Nunito',
  },
  fontConfig: {
    Nunito: {
      400: {
        normal: 'NunitoSans_400Regular',
      },
      700: {
        normal: 'NunitoSans_700Bold',
      },
    },
  },
})
