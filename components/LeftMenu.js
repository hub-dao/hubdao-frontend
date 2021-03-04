import { makeStyles } from '@material-ui/core/styles'
import { List } from '@material-ui/core'

import sideMenu from '../lib/menuConfig'
import SingleMenu from '../components/SingleMenu'
import CollapseMenu from '../components/CollapseMenu'

const useStyles = makeStyles(theme => ({
  leftMenu: {
    width: 280,
    height: 'calc(100vh - 48px)',
    padding: theme.spacing(1)
  },
  menuInner: {
    background: '#f4f3f7',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 15,
    height: '100%'
  }
}))

const LeftMenu = () => {
  const classes = useStyles()

  return (
    <div className={classes.leftMenu}>
      <div className={classes.menuInner}>
        <List>
          {sideMenu.map((item, index) => item.type === 'single' ? <SingleMenu key={index} menu={item.menu} /> : <CollapseMenu key={index} menu={item.menu} />)}
        </List>
      </div>
    </div>
  )
}

export default LeftMenu