import { createMuiTheme } from "@material-ui/core/styles"
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";

const arcBlue = "#0B72B9";
const lightGray = '#eaeaea';
const slateTan = "#b9ac92"; // 1 Background
const slateBrown = "#4a3f35"; // 2 Seconde BG
const goldenRodOrange = "#ffa225"; // 3 Highlight
const antiqueWhite = "#fbe6d4"; // 4 Brighter Highlight
const offWhite = 'rgb(247,249,250)' //Off white Background color
// const antiquePeach = '#fbddd4';// Brighter Highlight
const dimegray = "#6e6656";
const dimGray = 'rgb(92,106,118)'

const brightMudBrown = '#2e2210'; // Highlight
// const saddleBrown = '#643c0f'
// const darkSaddleBrown = '#3a2000';
// const cadetBlue = rgb(95,158,160)
const caribbeanBlue = '#46bfdc'
const navyBlue = '#111833'
const kitkatOrange = 'rgba(205,100,45, 1)'
const breakpoints = createBreakpoints({});

declare module "@material-ui/core/styles/createTypography" {
  interface TypographyOptions {
    caption: {
      color: string;
      opacity?: string;
      fontFamily: string;
      fontWeight?: number;
      fontSize: string;
      textTransform?: string;
      textAlign?: string;
      margin?: string;
    },
  }
}

declare module "@material-ui/core/styles/createPalette" {
  interface CommonColors {
    navyBlue: string
    dimGray: string
    offWhite: string
    lightBlue: string
    lightGray: string
  }
}

export default createMuiTheme({
  palette: {
    common: {
      navyBlue: `${navyBlue}`,
      dimGray: `${dimGray}`,
      offWhite: `${offWhite}`,
      lightBlue: `${caribbeanBlue}`,
      lightGray: `${lightGray}`
    },
    primary: {
      main: `${navyBlue}`,
      // main: white,
    },
    secondary: {
      main: `${dimGray}`,
    },
    action: {
        active: `${caribbeanBlue}`
    }
  },
  typography: {
    caption: {
      color: `${dimGray}`,
       fontFamily: 'Inter',
       fontWeight: 300,
       fontSize: '0.9rem',
       textTransform: 'none',
    },
  },
  props: {
    MuiTypography: {
      variantMapping: {
       
      },
    },
  }
})
