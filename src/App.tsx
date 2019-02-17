import * as React from 'react';

import { Provider } from 'react-redux'

import Router from './Router'
import { store } from './store'

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App;
