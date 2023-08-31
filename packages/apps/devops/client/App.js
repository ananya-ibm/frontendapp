/* eslint-disable react/prop-types */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import 'cross-fetch/polyfill';
import { AppShellContextProvider } from '@exo/frontend-common-app-shell';
import PropTypes from 'prop-types';
import Routes from './Routes';

const App = ({ config }) => {
  return (
    <React.StrictMode>
      <AppShellContextProvider config={config}>
        <Routes />
      </AppShellContextProvider>
    </React.StrictMode>
  );
};

App.propTypes = {
  config: PropTypes.shape({
    redirects: PropTypes.objectOf(PropTypes.string),
    modules: PropTypes.shape({
      url: PropTypes.string,
      modules: PropTypes.objectOf(PropTypes.func)
    }),
    translations: PropTypes.arrayOf(PropTypes.shape()),
    rewrite: PropTypes.arrayOf(PropTypes.shape())
  }).isRequired
};

export default App;
