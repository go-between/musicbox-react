const colors = {
  black: '#232323',
  blue: '#3ca1df',
  blueDark: '#2d5d95',
  blueLight: '#CDECFF',
  grayLight: '#dfdfdf',
  gray: '#999999',
  grayDark: '#666666',
  offBlack: '#484848',
  offWhite: '#f7f7f7',
  offWhite90: 'hsla(0, 0%, 90%)',
  purple: '#5E50B5',
  purpleLight: '#796fb5',
  red: '#c34848',
  redDark: '#9c292d',
  redLight: '#f7e2e2',
  white: '#ffffff',
  yellow: '#ffc58b',
  yellowLight: '#fceddf',
  yellowDark: '#594430',
}

const fontSizes = [10, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72, 96]
const space = [0, 4, 8, 16, 32, 64, 128, 256]

export default {
  borders: [0, '1px solid', '2px solid'],
  breakpoints: ['800px'],
  buttons: {
    primary: {
      color: colors.white,
      cursor: 'pointer',
      backgroundColor: colors.purple,
    },
    outline: {
      color: colors.purple,
      backgroundColor: 'transparent',
      boxShadow: 'inset 0 0 0 2px'
    }
  },
  colors,
  fonts: {
    sans: 'system-ui, sans-serif',
    mono: 'Menlo, monospace',
  },
  fontSizes,
  fontWeights: {
    light: 300,
    normal: 400,
    bold: 900,
  },
  lineHeight: '1.5',
  listTypes: ['none', 'disc'],
  shadows: [
    'none',
    '0 2px 4px 0 hsla(0, 0%, 0%, 0.2)',
  ],
  space,
  textColor: colors.offBlack,
  textStyles: {
    normal: {
      textTransform: 'none',
    },
    uppercase: {
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
    },
    lowercase: {
      textTransform: 'lowercase',
    },
  },
}
