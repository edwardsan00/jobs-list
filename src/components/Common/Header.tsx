import React from 'react'
import { createUseStyles, useTheme } from 'react-jss'
import { Link } from 'react-router-dom'

import { CustomTheme } from '../../interface/common'
import { Logo } from '../Icons'

const useStyles = createUseStyles((theme: CustomTheme) => ({
    containerHeader: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    containerLeft: {
      display: 'flex',
      alignItems: 'center'
    },
    containerRight:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end'
    },
    listMenu: {
      listStyle: 'none',
      marginLeft: '10px'
    },
    itemMenu: {
  
    },
    linkMenu: {
      color: theme.black,
      textDecoration: 'none',
      paddingBottom: '4px',
      transition: 'all .15s ease',
      fontWeight: 'bold',
      '&:hover':{
        borderBottom: `solid 2px ${theme.black}`,
        transition: 'all .15s ease'
      }
    },
    user: {
      margin: 0,
      fontSize: '13px',
      fontWeight: 'bold'
    },
    avatar: {
      width: '40px',
      height: '40px',
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
      borderRadius: '50%',
      fontSize: '13px',
      marginLeft: '10px',
      backgroundColor: theme.gray,
      color: 'rgba(0,0,0,.7)'
    }
}))

const Header = (): JSX.Element => {
  const theme = useTheme()
  const classes = useStyles(theme)
  return (
    <div className={classes.containerHeader}>
      <div className={classes.containerLeft}>
        <Logo />
        <ul className={classes.listMenu}>
          <li className={classes.itemMenu}><Link to='/jobs' className={classes.linkMenu}>Jobs</Link></li>
        </ul>
      </div>
      <div className={classes.containerRight}>
        <p className={classes.user}>Edward Sanchez</p>
        <div className={classes.avatar}>ES</div>
      </div>
    </div>
  )
}

export default Header