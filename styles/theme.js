import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#d76e2d'
    }
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          fontFamily: '"Rubik", "Noto Sans KR", "Noto Sans SC", sans-serif'
        }
      }
    },
    MuiTypography: {
      root: {
        fontFamily: '"Rubik", "Noto Sans KR", "Noto Sans SC", sans-serif'
      },
      body1: {
        fontFamily: '"Rubik", "Noto Sans KR", "Noto Sans SC", sans-serif',
        fontSize: '0.9rem'
      }
    },
    MuiListItemIcon: {
      root: {
        '& svg': {
          fontSize: '1.3rem'
        }
      }
    }
  }
})

export default theme