import React, { useEffect } from 'react';
import '../styles/globals.css'
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


export const theme = createTheme({
    palette: {
      fontFamily: 'Oswald',
      // mode: 'dark',
      primary: {
        main: '#5d5fef',
      },

      secondary: {
        main: '#a5a6f6',
      },

      tertiary: {
        main: '#ece4e4'
      }
    },

    breakpoints: {
      values: {
        xs: 450,
        sm: 590,
        md: 768,
        mlg: 900,
        lg: 1024,
        xl: 1920,
      },
    }
});

function App({ Component, pageProps }) {

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        <title>My page</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App
