/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

require('ts-node').register({ transpileOnly: true });

const { builder } = require('@exo/frontend-theme-base-carbon-theme/webpackBuilder');
module.exports = builder({
  theme: require('./src/Carbon11Vars').default,
  name: 'carbon.css'
});
