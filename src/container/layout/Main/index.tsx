import React, { FunctionComponent }  from 'react'

const Main: FunctionComponent = ({ children }): JSX.Element => {
  return (
    <div>
      <h1>Container Main</h1>
      {children}
    </div>
  )
}

export default Main