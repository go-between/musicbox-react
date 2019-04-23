import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components'
import theme from 'theme'
import { DragDropContextProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

// tslint:disable no-import-side-effect
import './styles/main.css'

ReactDOM.render(
  <ThemeProvider theme={theme as any}>
    <DragDropContextProvider backend={HTML5Backend}>
      <App />
    </DragDropContextProvider>
  </ThemeProvider>,
  document.getElementById('root') as HTMLElement
);
