/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { makeCarbon11Theme } from '@exo/frontend-theme-base-carbon-theme';
import React from 'react';
import carbonVariables from './Carbon11Vars';

const styles = process.env.BUILD_MODE !== 'ssr,client' && process.env.BUILD_MODE !== 'analyze' ? require('!!raw-loader!./carbon.css') : { default: '' };

const overrides = {
  byComponent: {
    core_masthead: {
      boxShadow: '0 0.06rem 0.5rem #d8d8d8'
    },
    core_masthead_auxilliary: {
      background: 'rgb(243, 243, 243)'
    },
    core_masthead_navDesktop: {
      background: 'rgb(243, 243, 243)',
      color: '#000',
      __action: {
        $hover: {
          color: '#000',
          background: 'none',
          textDecoration: 'underline'
        }
      }
    },
    core_masthead_header: {
      background: 'rgb(243, 243, 243)',
      padding: '0.25rem',
      $$large: {
        padding: '0.5rem 0.5rem 0 0.5rem'
      },
      __logo: {
        maxWidth: '8.67rem',
        maxHeight: '1.875rem',
        $$large: {
          maxWidth: '11.56rem',
          maxHeight: '2.5rem'
        }
      }
    },

    chrome_ui_localePreference: {
      color: 'black'
    }
  } as EXOComponentStyles,

  // TODO: Find a better solution for assets ... and rename tempImg
  static: {
    tempImg: '/static/images/homepage/hero-1.jpg',
    Logo: () =>
      React.createElement('img', {
        style: { marginLeft: '0.3rem' },
        src: '/static/theme/impact-solution/SAP_lockup.png'
      })
  }
};

const Theme = makeCarbon11Theme({
  name: 'impact-solution',
  vars: carbonVariables,
  fontConfig: {
    heading: "'IBM Plex Sans', Arial, sans-serif",
    body: "'IBM Plex Sans', Arial, sans-serif"
  },
  extraGlobalCSS: `
    .cds--toast-notification--error {
      margin-top: calc(var(--top) + 1rem) !important;
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
