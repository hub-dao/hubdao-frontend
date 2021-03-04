import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  SvgIcon,
  List,
  ListItem
} from '@material-ui/core'
import Web3 from 'web3'
import { useWallet } from 'use-wallet'
import { useSnackbar } from 'notistack'
import { BiMessageSquareX, BiCopyAlt, BiLinkExternal } from 'react-icons/bi'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import LeftMenu from '../components/LeftMenu'
import Transition from '../components/Transition'
import LanguageSelector from '../components/LanguageSelector'
import useInterval from '../lib/useInterval'
import Metamask from '../assets/svg/metamask.svg'

const useStyles = makeStyles(theme => ({
  appBar: {
    boxShadow: '0px 1px 1px -1px rgb(0 0 0 / 20%), 0px 0px 1px 0px rgb(0 0 0 / 14%), 0px 0px 1px 0px rgb(0 0 0 / 12%)'
  },
  contentWrap: {
    display: 'flex',
    flexDirection: 'row'
  },
  logo: {
    width: 256,
    display: 'flex',
    alignItems: 'center',
    '& img': {
      height: 35
    }
  },
  btnWrapper: {
    marginLeft: 'auto',
    display: 'flex',
    flexDirection: 'row'
  },
  walletBtn: {
    marginRight: 20,
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '18px 18px 18px 18px'
  },
  networkStatus: {
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.8rem',
    color: '#888',
    '& > span': {
      fontWeight: 700
    },
    '& > strong': {
      color: '#d76e2d',
      paddingLeft: 24,
      paddingRight: 8
    }
  },
  '@keyframes pulseHealth': {
    '0%': {
      boxShadow: '0 0 0 0 rgb(192 110 53 / 10%)'
    },
    '70%': {
      boxShadow: '0 0 0 1em rgb(192 110 53 / 20%)'
    },
    '100%': {
      boxShadow: '0 0 0 0 rgb(192 110 53 / 30%)'
    }
  },
  status: {
    background: '#d76e2d',
    width: 8,
    height: 8,
    borderRadius: '50%',
    fontSize: 7,
    animation: '$pulseHealth 2s ease-out infinite',
    marginRight: 12
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: '#d76e2d'
  },
  walletList: {
    minWidth: 400,
    '& .MuiListItem-button': {
      borderRadius: 20,
      backgroundColor: '#ffcc80',
      transition: 'all .3s ease-in-out',
      '&:hover': {
        backgroundColor: '#ffe6c1'
      }
    }
  },
  walletItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  },
  walletName: {
    fontSize: '1rem',
    fontWeight: 700,
    color: '#d76e2d'
  },
  walletIcon: {
    width: 24,
    height: 24
  },
  accountBtn: {
    marginRight: 20,
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '18px 18px 18px 18px',
    backgroundColor: '#ffcc80',
    color: '#d76e2d',
    '&:hover': {
      backgroundColor: '#ffe6c1'
    }
  },
  account: {
    fontSize: '1.2rem',
    fontWeight: 700,
    marginBottom: 12
  },
  logout: {
    marginTop: theme.spacing(5),
    textAlign: 'center'
  },
  logoutBtn: {
    textTransform: 'none',
    fontWeight: 700,
    borderRadius: '18px 18px 18px 18px',
    borderWidth: 2,
    '&:hover': {
      borderWidth: 2
    }
  },
  linkBtn: {
    textTransform: 'none',
    padding: 0,
    fontWeight: 700,
    marginRight: 24,
    '& svg': {
      fontSize: 18,
      marginLeft: 8
    }
  },
  modalTitle: {
    fontWeight: 700
  }
}))

const RPC = process.env.NODE_ENV === 'development' ? 'https://http-testnet.hecochain.com' : 'https://http-mainnet.hecochain.com'
const web3 = new Web3(RPC)

const options = {
  anchorOrigin: {
    horizontal: 'center',
    vertical: 'top'
  },
  autoHideDuration: 4000
}

const MainLayout = props => {
  const { Component, pageProps } = props
  const wallet = useWallet()
  const classes = useStyles()
  const { t } = useTranslation()
  const { enqueueSnackbar } = useSnackbar()
  const [walletOpen, setWalletOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [network, setNetwork] = useState('')
  const [blockHeight, setBlockHeight] = useState(0)

  const activate = (connector) => wallet.connect(connector)

  const openAlert = (message, variant) => {
    enqueueSnackbar(message, { variant, ...options })
  }

  const subscribeProvider = async provider => {
    if (!provider.on) {
      return
    }
    provider.on('close', () => wallet.reset())
    provider.on('accountsChanged', async account => {
      wallet.reset()
      if (Number(provider.networkVersion) === wallet.chainId) {
        activate('injected')
      }
    })
    provider.on('chainChanged', async chainId => {
      wallet.reset()
      if (web3.utils.hexToNumber(`${chainId}`) === wallet.chainId) {
        activate('injected')
      }
    })
  }

  const handleWalletOpen = () => {
    setWalletOpen(true)
  }

  const handleWalletClose = () => {
    setWalletOpen(false)
  }

  const handleAccountOpen = () => {
    setAccountOpen(true)
  }

  const handleAccountClose = () => {
    setAccountOpen(false)
  }

  const login = async () => {
    if (Number(window.ethereum.networkVersion) === wallet.chainId) {
      activate('injected')
      if (window.ethereum.selectedAddress !== null) {
        openAlert(t('logined', { address: window.ethereum.selectedAddress }), 'info')
      }
    } else {
      openAlert(t('network-missmatch', { target: wallet.chainId, current: window.ethereum.networkVersion }), 'error')
    }
  }

  useInterval(async () => {
    const blockNumber = await web3.eth.getBlockNumber()
    setBlockHeight(blockNumber)
  }, 1000)

  useEffect(() => {
    if (wallet.status === 'error') {
      wallet.reset()
    }

    if (walletOpen && wallet.status === 'connected') {
      setWalletOpen(false)
    }

    if (accountOpen && wallet.status === 'disconnected') {
      setAccountOpen(false)
    }
  }, [wallet.status])

  useEffect(async () => {
    await subscribeProvider(window.ethereum)
    const chain = await web3.eth.getChainId()
    const blockNumber = await web3.eth.getBlockNumber()

    setBlockHeight(blockNumber)

    if (chain === 128) {
      setNetwork('mainnet')
    } else if (chain === 256) {
      setNetwork('testnet')
    }

    if (wallet.status === 'disconnected') {
      if (Number(window.ethereum.networkVersion) === wallet.chainId) {
        activate('injected')
      }
    }
  }, [])

  return (
    <div>
      <AppBar position="static" color="transparent" className={classes.appBar}>
        <Toolbar variant="dense">
          <div className={classes.logo}>
            <img src="/static/images/logo.png" />
          </div>
          <div className={classes.networkStatus}>
            <div className={classes.status}></div>
            <span>{network}</span>
            <strong>#</strong>
            <span>{blockHeight.toLocaleString()}</span>
          </div>
          <div className={classes.btnWrapper}>
            {wallet.status === 'disconnected' && (
              <Button
                variant="contained"
                disableElevation
                color="primary"
                className={classes.walletBtn}
                onClick={() => handleWalletOpen()}
              >
                {t('connect-wallet')}
              </Button>
            )}
            {wallet.status === 'connected' && (
              <Button
                variant="contained"
                disableElevation
                className={classes.accountBtn}
                onClick={() => handleAccountOpen()}
              >
                {wallet.account?.substr(0, 4)}∙∙∙{wallet.account?.slice(-4)}
              </Button>
            )}
            <LanguageSelector />
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrap}>
        <LeftMenu />
        <div>
          <Component {...pageProps} />
        </div>
      </div>

      <Dialog
        open={walletOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleWalletClose}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Typography variant="h6" className={classes.modalTitle}>{t('wallet-modal-title')}</Typography>
          <IconButton className={classes.closeButton} onClick={handleWalletClose}>
            <BiMessageSquareX />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.walletList}>
            <List>
              <ListItem button onClick={() => login()}>
                <div className={classes.walletItem}>
                  <div className={classes.walletName}>Metamask</div>
                  <div className={classes.walletIcon}>
                    <SvgIcon component={Metamask} viewBox="0 0 96 96" />
                  </div>
                </div>
              </ListItem>
            </List>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog
        open={accountOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleAccountClose}
      >
        <DialogTitle disableTypography className={classes.dialogTitle}>
          <Typography variant="h6" className={classes.modalTitle}>{t('account-modal-title')}</Typography>
          <IconButton className={classes.closeButton} onClick={handleAccountClose}>
            <BiMessageSquareX />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <div className={classes.account}>
            {wallet.account}
          </div>
          <div>
            <Button 
              href={
                process.env.NODE_ENV === 'development' 
                ? `https://testnet.hecoinfo.com/address/${wallet.account}` 
                : `https://hecoinfo.com/address/${wallet.account}`
              }
              color="primary" 
              className={classes.linkBtn}
              target="_blank"
            >
              {t('view-scan')} <BiLinkExternal />
            </Button>
            <CopyToClipboard text={wallet.account} onCopy={() => openAlert('copied', 'info')}>
              <Button color="primary" className={classes.linkBtn}>
                {t('copy-address')} <BiCopyAlt />
              </Button>
            </CopyToClipboard>
          </div>
          <div className={classes.logout}>
            <Button
              variant="outlined"
              color="primary"
              className={classes.logoutBtn}
              onClick={() => wallet.reset()}
            >
              {t('logout')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

MainLayout.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired
}

export default MainLayout