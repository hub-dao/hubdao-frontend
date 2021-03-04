import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useCookies } from 'react-cookie'
import { makeStyles } from '@material-ui/core/styles'
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import { Us, Kr, Cn } from 'react-flags-select'
import { BiChevronDown } from 'react-icons/bi'
import clsx from 'clsx'

const useStyles = makeStyles(theme => ({
  selectLanguage: {
    paddingLeft: 20,
    borderLeft: '1px solid #eee',
    position: 'relative'
  },
  selector: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer'
  },
  flag: {
    borderRadius: '50%',
    width: 25,
    height: 25,
    overflow: 'hidden',
    position: 'relative',
    marginRight: 12,
    '& > svg': {
      position: 'absolute',
      fontSize: 44,
      top: -8,
      left: -3
    }
  },
  subtitle: {
    fontSize: '0.7rem',
    color: '#777'
  },
  langTitle: {
    minWidth: 90,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& svg': {
      color: '#777'
    },
    '& > span': {
      fontWeight: 700
    }
  },
  arrow: {
    transition: 'all .3s ease-in-out'
  },
  arrowTransfrom: {
    transform: 'rotate(180deg)'
  },
  subMenu: {
    position: 'absolute',
    width: 120,
    top: 43,
    height: 0,
    overflow: 'hidden',
    borderLeft: '1px solid #eee',
    borderRight: '1px solid #eee',
    borderBottom: '1px solid #eee',
    borderRadius: '0 0 8px 8px',
    transition: 'all .3s ease-in-out'
  },
  openMenu: {
    height: 149
  },
  item: {
    cursor: 'pointer',
    transition: 'all .3s ease-in-out',
    '&:hover': {
      background: '#d76e2d',
      color: '#fff',
      '& .MuiTypography-body1': {
        fontWeight: 700
      }
    }
  },
  itemActive: {
    background: '#d76e2d',
    color: '#fff',
    '& .MuiTypography-body1': {
      fontWeight: 700
    }
  },
  icon: {
    minWidth: 30
  },
  text: {
    '& span': {
      fontSize: '0.85rem'
    }
  }
}))

const languageOptions = [
  {
    url: 'en',
    name: 'English',
    icon: <Us />
  },
  {
    url: 'ko',
    name: '한국어',
    icon: <Kr />
  },
  {
    url: 'zh',
    name: '简体中文',
    icon: <Cn />
  }
]

const LanguageSelector = () => {
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const [cookies, setCookie] = useCookies(['hub_lang'])
  const [open, setOpen] = useState(false)

  const toggleMenu = () => {
    setOpen(!open)
  }

  const changeLanguage = lang => {
    setCookie('hub_lang', lang, { path: '/' })
    i18n.changeLanguage(lang)
  }

  useEffect(() => {
    if (cookies.hub_lang !== undefined) {
      i18n.changeLanguage(cookies.hub_lang)
    }
  }, [])

  return (
    <div className={classes.selectLanguage}>
      <div className={classes.selector} onClick={() => toggleMenu()}>
        <div className={classes.flag}>
          {languageOptions.filter(item => item.url === i18n.language)[0].icon}
        </div>
        <div>
          <div className={classes.subtitle}>{t('language')}</div>
          <div className={classes.langTitle}>
            <span>{languageOptions.filter(item => item.url === i18n.language)[0].name}</span>
            <BiChevronDown className={open ? clsx(classes.arrow, classes.arrowTransfrom) : classes.arrow} />
          </div>
        </div>
      </div>
      <div className={open ? clsx(classes.subMenu, classes.openMenu) : classes.subMenu}>
        <List className={classes.subList}>
          {languageOptions.map(item => (
            <ListItem key={item.url} className={i18n.language === item.url ? clsx(classes.item, classes.itemActive) : classes.item} onClick={() => changeLanguage(item.url)}>
              <ListItemIcon className={classes.icon}>
                {item.icon}
              </ListItemIcon>
              <ListItemText className={classes.text}>{item.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  )
}

export default LanguageSelector