import React from 'react'
import jss from 'jss'
import preset from 'jss-preset-default'
import { SheetsRegistry, JssProvider, ThemeProvider } from 'react-jss'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory';

import { CustomTheme } from './interface/common'
import RouterMain from './routes'

const client = new ApolloClient({
  uri: 'https://api.graphql.jobs/',
  cache: new InMemoryCache()
})

const setupJss = () => {
  jss.setup(preset())
  const sheetsRegistry = new SheetsRegistry();

  const globalStyleSheet = jss.createStyleSheet(
    {
      '@global': {
        '*': {
          margin: 0,
          padding: 0,
          boxSizing: 'border-box'
        },
        body: {
          backgroundColor: '#F7F7F9',
          fontFamily: 'Roboto, sans- serif'
        }
      }
    }
  ).attach()

  sheetsRegistry.add(globalStyleSheet)

  return sheetsRegistry
}

const sheets = setupJss()

const themeDefault: CustomTheme = {
  black: '#24292e',
  gray: '#eff3f6',
  gray2: '#a4aaaf',
  gray5: '#e0e1e2'
}

const App = () => {
  return (
    <ApolloProvider client={client}>
      <JssProvider registry={sheets}>
        <ThemeProvider theme={themeDefault}>
          <RouterMain />
        </ThemeProvider>
      </JssProvider>
    </ApolloProvider>
  )
}

export default App
