/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

const props = {
  'aria-label': 'icon',
  fill: 'currentColor',
  focusable: 'false',
  height: '20',
  preserveAspectRatio: 'xMidYMid meet',
  role: 'img',
  viewBox: '0 0 32 32',
  width: '20',
  xmlns: 'http://www.w3.org/2000/svg'
};

const handler = {
  get: (target, prop, receiver) => p => React.createElement('svg', { ...props, ...p })
};

module.exports = new Proxy({}, handler);
