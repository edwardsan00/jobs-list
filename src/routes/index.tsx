import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Main from '../container/layout/Main'
import Jobs from '../container/views/Jobs'
import Detail from '../container/views/Detail'
import NotFound from '../container/views/404'

const RouterMain = () => {
  return (
    <Router>
      <Switch>
        <Route>
          <Main>
            <Switch>
              <Route exact path="/" render={() => (<Redirect to="/jobs" />)} />
              <Route path='/jobs' exact component={Jobs} />
              <Route path='/job:id' component={Detail} />
              <Route path="*" component={NotFound} />   
            </Switch>
          </Main>
        </Route>
      </Switch>
    </Router>
  )
}

export default RouterMain
