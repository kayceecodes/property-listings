import React from 'react'
import '../styles/globals.scss'
import theme from '../src/theme/Theme'
import { ThemeProvider } from '@material-ui/styles'
import Animate, { AnimatePresence } from 'framer-motion'
import FramerMotionProvider from '../src/hoc/FramerMotionProvider'
import Header from '../src/header/Header'
import Head from 'next/head'
import CssBaseline from '@material-ui/core/CssBaseline'
import { useRouter } from 'next/router'
import { wrapper } from '../src/store/store'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AnimatePresence exitBeforeEnter>
          <FramerMotionProvider>
            {(props) => (
              <React.Fragment key={router.pathname}>
                <Component {...props} {...pageProps} />
              </React.Fragment>
            )}
          </FramerMotionProvider>
        </AnimatePresence>
      </ThemeProvider>
    </>
  )
}

export default wrapper.withRedux(MyApp)
