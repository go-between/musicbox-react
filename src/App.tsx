import * as React from 'react'

import { Provider } from 'react-redux'

import Router from './Router'
import { store } from './store'
import Container from 'components/container'
import TopNavHeader from 'components/top-nav-header'
// import Footer from 'components/main-footer'

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <TopNavHeader title="MusicBox" />
          <Container as="main" py={4}>
            <Router />
          </Container>
        </Provider>
      </>
    )
  }
}

export default App
