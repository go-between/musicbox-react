import * as React from 'react'
import { Box } from 'rebass'
import { Provider } from 'react-redux'

import Router from './Router'
import { store } from './store'

import TopNavHeader from 'components/top-nav-header'
// import Footer from 'components/main-footer'

class App extends React.Component {
  render() {
    return (
      <>
        <Provider store={store}>
          <TopNavHeader title="MusicBox" />
          <Box
            as="main"
            px={[4, 5]}
            py={4}
          >
            <Router />
          </Box>
        </Provider>
      </>
    )
  }
}

export default App
