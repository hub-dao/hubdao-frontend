import { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { I18nextProvider } from 'react-i18next'
import { UseWalletProvider } from 'use-wallet'
import { SnackbarProvider } from 'notistack'
import { CookiesProvider } from 'react-cookie'

import theme from '../styles/theme'
import i18n from '../lib/i18n'

const Noop = ({ Component, pageProps }) => <Component {...pageProps} />

const useStyles = makeStyles({
  success: {
    backgroundColor: '#739574 !important'
  },
  info: {
    backgroundColor: '#648dae !important'
  },
  warning: {
    backgroundColor: '#b28e59 !important'
  },
  error: {
    backgroundColor: '#aa647b !important'
  }
})

const MyApp = props => {
  const { Component, pageProps } = props
  const classes = useStyles()
  const Layout = Component.Layout || Noop

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, [])

  return (
    <Fragment>
      <Head>
        <title>HubDAO</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <CookiesProvider>
        <UseWalletProvider
          chainId={process.env.NODE_ENV === 'development' ? 256 : 128}
          connectors={{
            walletconnect: { rpcUrl: process.env.NODE_ENV === 'development' ? 'https://http-testnet.hecochain.com' : 'https://http-mainnet.hecochain.com' }
          }}
        >
          <I18nextProvider i18n={i18n}>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <SnackbarProvider 
                maxSnack={3}
                classes={{
                  variantSuccess: classes.success,
                  variantError: classes.error,
                  variantWarning: classes.warning,
                  variantInfo: classes.info,
                }}
              >
                <Layout Component={Component} pageProps={pageProps} />
              </SnackbarProvider>
            </ThemeProvider>
          </I18nextProvider>
        </UseWalletProvider>
      </CookiesProvider>
    </Fragment>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MyApp
