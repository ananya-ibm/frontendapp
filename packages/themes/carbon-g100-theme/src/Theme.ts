/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { makeCarbon11Theme, PartialCarbonTheme } from '@exo/frontend-theme-base-carbon-theme';
import carbonVariables from './Carbon11Vars';

/* @ts-ignore */
import Logo from './assets/ixlogo.svg';

const styles = process.env.BUILD_MODE !== 'ssr,client' && process.env.BUILD_MODE !== 'analyze' ? require('!!raw-loader!./carbon.css') : { default: '' };

const overrides: PartialCarbonTheme = {
  byComponent: {
    core_hero: {
      color: 'white'
    },
    core_masthead_navDesktop: {
      background: carbonVariables.background,
      color: carbonVariables['text-secondary']
    },
    core_masthead_header: {
      padding: '0.25rem'
    },
    core_footer: {
      background: carbonVariables.background
    }
  },

  static: {
    tempImg:
      'https://images.unsplash.com/photo-1573767291321-c0af2eaf5266?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2203&q=80',
    tempAspot:
      'https://images.unsplash.com/photo-1633154350245-22d6e56d9291?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2929&q=80',
    Logo
  }
};

const Theme = makeCarbon11Theme({
  name: 'Carbon (g100)',
  vars: carbonVariables,
  fontConfig: {
    heading: "'IBM Plex Sans', Arial, sans-serif",
    body: "'IBM Plex Sans', Arial, sans-serif"
  },
  extraGlobalCSS: `
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
