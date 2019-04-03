import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components'
import theme from 'theme'

ReactDOM.render(
  <ThemeProvider theme={theme as any}>
    <App />
  </ThemeProvider>,
  document.getElementById('root') as HTMLElement
);
