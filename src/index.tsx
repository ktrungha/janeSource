import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core';
import { MUItheme } from './setupTheme';
import { IntlProvider } from 'react-intl';
import messages from './en.json';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import fetchMock from 'fetch-mock';
import deals from './mock.json';

// Cannot find a public API that has CORS, need to mock API here
fetchMock.get('https://jane.com/mock/deals?page=0', JSON.stringify({
  totalPages: 4,
  deals: deals.slice(0, 10)
}), {delay: 800});

fetchMock.get('https://jane.com/mock/deals?page=1', JSON.stringify({
  totalPages: 4,
  deals: deals.slice(10, 20)
}), {delay: 800});

fetchMock.get('https://jane.com/mock/deals?page=2', JSON.stringify({
  totalPages: 4,
  deals: deals.slice(20, 30)
}), {delay: 800});

fetchMock.get('https://jane.com/mock/deals?page=3', JSON.stringify({
  totalPages: 4,
  deals: deals.slice(30, 40)
}), {delay: 800});

ReactDOM.render(<ThemeProvider theme={MUItheme}>
  <IntlProvider locale='en' messages={messages}>
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IntlProvider>
</ThemeProvider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
