
import { BrowserRouter } from 'react-router-dom'
import { GlobalStyle } from './globalStyle.styles';

import App from './App';
import {store} from './store'
import { Provider } from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
      <BrowserRouter><GlobalStyle/><App /></BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )

