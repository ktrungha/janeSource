import React from 'react';
import { render } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import messages from '../en.json';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core';
import { MUItheme } from '../setupTheme.js';
import { BrowserRouter } from 'react-router-dom';

export const renderElement = (element: React.ReactElement) => {
  return render(
    <ThemeProvider theme={MUItheme}>
      <IntlProvider locale='en' messages={messages}>
        <CssBaseline />
        <BrowserRouter>
          {element}
        </BrowserRouter>
      </IntlProvider>
    </ThemeProvider>
  );
};
