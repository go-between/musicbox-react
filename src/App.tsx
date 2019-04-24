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
          <Box as="main" p={[4, 5]}>
            <Router />
          </Box>
          {/* <Footer title="footer" /> */}
        </Provider>
      </>
    )
  }
}

export default App
