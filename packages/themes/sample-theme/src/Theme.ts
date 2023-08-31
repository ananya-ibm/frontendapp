/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { makeCarbon11Theme } from '@exo/frontend-theme-base-carbon-theme';
import carbonVariables from './Carbon11Vars';

/* @ts-ignore */
import Logo from './assets/ixlogo.svg';

const styles = process.env.BUILD_MODE !== 'ssr,client' && process.env.BUILD_MODE !== 'analyze' ? require('!!raw-loader!./carbon.css') : { default: '' };

const overrides = {
  byComponent: {} as EXOComponentStyles,

  // TODO: Find a better solution for assets ... and rename tempImg
  static: {
    tempImg: '/static/images/homepage/hero-1.jpg',
    Logo
  }
};

const Theme = makeCarbon11Theme({
  name: 'Sample',
  vars: carbonVariables,
  fontConfig: {
    heading: "'IBM Plex Sans', Arial, sans-serif",
    body: "'IBM Plex Sans', Arial, sans-serif"
  },
  extraGlobalCSS: `
    .cds--toast-notification--error {
      margin-top: calc(var(--top) + 1rem) !important;
    }
    
    html, body {
      background: #161616;
      color: ${carbonVariables['text-primary']};
    }
  `,

  // TODO: Should we disable brand colors
  brandColors: {
    brand1: {
      base: '#0062ff',
      contrast: carbonVariables['text-on-color']
    },
    brand2: {
      base: '#171717',
      contrast: carbonVariables['text-on-color']
    }
  }, 
  carbonStyles: styles.default,
  overrides
});

export default Theme;
