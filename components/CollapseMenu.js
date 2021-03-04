import { useState } from 'react'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse
} from '@material-ui/core'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  active: {
    borderLeft: '2px solid #d76e2d',
    '& svg': {
      color: '#d76e2d'
    },
    '& .MuiListItemText-primary': {
      fontWeight: 700
    }
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}))

const CollapseMenu = props => {
  const { menu } = props
  const classes = useStyles()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(!open)
  }

  return (
    <div>
      <ListItem key={menu.name} button onClick={handleClick}>
        <ListItemIcon>
          {menu.icon}
        </ListItemIcon>
        <ListItemText>{menu.name}</ListItemText>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {menu.sub.map((item, index) => (
            <ListItem button key={index} className={router.pathname === menu.link ? clsx(classes.active, classes.nested) : classes.nested}>
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  )
}

export default CollapseMenu