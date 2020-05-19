import React, { FunctionComponent }  from 'react'
import { createUseStyles } from 'react-jss'

import Header from '../../../components/Common/Header'

const useStyles = createUseStyles({
  containerMain: {
    width: '90%',
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '20px 0',
  }
})

const Main: FunctionComponent = ({ children }): JSX.Element => {
  const classes = useStyles()
  return (
    <div className={classes.containerMain}>
      <Header />
      {children}
    </div>
  )
}

export default Main