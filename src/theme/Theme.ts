import { createMuiTheme } from '@material-ui/core/styles'
import createBreakpoints from '@material-ui/core/styles/createBreakpoints'

const arcBlue = '#0B72B9'
const lightGray = '#eaeaea'
const slateTan = '#b9ac92' // 1 Background
const slateBrown = '#4a3f35' // 2 Seconde BG
const goldenRodOrange = '#ffa225' // 3 Highlight
const antiqueWhite = '#fbe6d4' // 4 Brighter Highlight
const offWhite = '#f4f7f8' //Off white Background color
// const antiquePeach = '#fbddd4';// Brighter Highlight
const dimegray = '#6e6656'
const dimGray = '#363e45'

const brightMudBrown = '#2e2210' // Highlight
// const saddleBrown = '#643c0f'
// const darkSaddleBrown = '#3a2000';
// const cadetBlue = rgb(95,158,160)
const caribbeanBlue = '#46bfdc'
const navyBlue = '#111833'
const darkSlateBlue = '#161b22'
const kitkatOrange = 'rgba(205,100,45, 1)'
const breakpoints = createBreakpoints({})

declare module '@material-ui/core/styles/createTypography' {
  interface TypographyOptions {
    caption: {
      color: string
      opacity?: string
      fontFamily: string
      fontWeight?: number
      fontSize: string
      textTransform?: string
      textAlign?: string
      margin?: string
    }
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface CommonColors {
    navyBlue: string
    dimGray: string
    offWhite: string
    lightBlue: string
    lightGray: string
    darkSlateBlue: string
  }
}

export default createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        textTransform: 'none',
      },
    },
  },
  palette: {
    common: {
      navyBlue: `${navyBlue}`,
      dimGray: `${dimGray}`,
      offWhite: `${offWhite}`,
      lightBlue: `${caribbeanBlue}`,
      lightGray: `${lightGray}`,
      darkSlateBlue: `${darkSlateBlue}`,
    },
    primary: {
      main: `${navyBlue}`,
      // main: white,
    },
    secondary: {
      main: `${offWhite}`,
    },
    action: {
      active: `${caribbeanBlue}`,
    },
  },
  typography: {
    body1: {
      color: `${offWhite}a9`,
      fontSize: '0.88rem',
      fontFamily: 'Inter',
      fontWeight: 400,
      lineHeight: 1.35,
      [breakpoints.up('md')]: {
        fontSize: '1rem',
      },
    },
    body2: {
      color: `${dimGray}`,
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '0.95rem',
      [breakpoints.up('md')]: {
        fontSize: '1.05rem',
      },
    },
    h5: {
      color: `${offWhite}`,
    },
    h6: {
      color:  `${offWhite}`
    },
    caption: {
      color: `${dimGray}`,
      fontFamily: 'Inter',
      fontWeight: 500,
      fontSize: '0.9rem',
      textTransform: 'none',
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {},
    },
  },
})
