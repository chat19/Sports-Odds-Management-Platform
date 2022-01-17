import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import Layout from './Layout';
import messages from './messages';
import './style.scss';
import Aside from './Aside';
function App({ isAdmin, path }) {
  const [locale, setLocale] = useState('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Aside isAdmin={isAdmin} path={path} />
    </IntlProvider>
  );
}

export default App;
