import React from "react";
import "../styles/globals.scss";
import theme from "../src/theme/Theme";
import { ThemeProvider } from "@material-ui/styles";
import Animate, { AnimatePresence } from "framer-motion";
import FramerMotionProvider from "../src/hoc/FramerMotionProvider";
import Header from "../src/header/Header";
import Head from "next/head";
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter()  
  
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <FramerMotionProvider>
          {(props) => (
            <AnimatePresence exitBeforeEnter>
              <Component 
              key={router.pathname}
              {...props} {...pageProps} />
            </AnimatePresence>
          )}
        </FramerMotionProvider>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
