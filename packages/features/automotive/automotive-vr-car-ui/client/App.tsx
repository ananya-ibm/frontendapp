/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import 'cross-fetch/polyfill';
import Routes from './Routes';

const App = ({ config, children }: Props) => {
  const AppRoot = config.appWrapper;
  return <AppRoot config={config}>{children ?? <Routes />}</AppRoot>;
};

type Props = {
  config: any;
  children: any;
};

export default App;
