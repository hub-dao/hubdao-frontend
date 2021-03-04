import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  active: {
    borderLeft: '2px solid #d76e2d',
    '& svg': {
      color: '#d76e2d'
    },
    '& .MuiListItemText-primary': {
      fontWeight: 700
    }
  }
}))

const SingleMenu = props => {
  const { menu } = props
  const classes = useStyles()
  const router = useRouter()

  return (
    <ListItem key={menu.name} button className={router.pathname === menu.link ? classes.active : undefined}>
      <ListItemIcon>
        {menu.icon}
      </ListItemIcon>
      <ListItemText>{menu.name}</ListItemText>
    </ListItem>
  )
}

export default SingleMenu