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
  breakpoints: ['960px'],
  colors,
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
    `inset 0 0 0 1px ${colors.grayLight}`,
    `inset 0 0 0 1px ${colors.grayLight}, 0 0 4px ${colors.gray}`,
    `0 2px 6px 0 ${colors.grayLight}`,
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
