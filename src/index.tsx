import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { CurrentUserContextProvider } from './contexts/CurrentUser';
import { CurrentOfferContextProvider } from './contexts/Offer';

ReactDOM.render(
  <React.StrictMode>
    <CurrentOfferContextProvider>
      <CurrentUserContextProvider>
        <App />
      </CurrentUserContextProvider>
    </CurrentOfferContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
