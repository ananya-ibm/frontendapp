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
import Logo from './assets/generic-logo.svg';

const styles = process.env.BUILD_MODE !== 'ssr,client' && process.env.BUILD_MODE !== 'analyze' ? require('!!raw-loader!./carbon.css') : { default: '' };

const overrides = {
  byComponent: {
    core_masthead_navDesktop: {
      padding: '0.25rem 0.1rem',
      font: {
        family: "'IBM Plex Sans', Arial, sans-serif",
        size: '1rem',
        lineHeight: '1rem',
        weight: '400'
      },
      background: 'rgb(60, 56, 56)',
      color: 'white',
      __action: {
        $hover: {
          textDecoration: 'underline',
          background: 'rgb(60, 56, 56)'
        }
      }
    },
    core_masthead_auxilliary: {
      background: 'rgb(6, 23, 39)',
      color: '#ddd'
    },
    core_masthead_header: {
      background: 'rgb(6, 23, 39)',
      borderBottom: 'none',
      color: 'white',
      padding: '0 0 0 0.5rem',
      $$large: {
        padding: '0.25rem 0 0.25rem 0.5rem'
      },
      __logo: {
        maxHeight: '3rem',
        maxWidth: '4rem',
        $$large: {
          maxHeight: '3rem',
          maxWidth: '4rem'
        }
      }
    },

    core_hero: {
      color: 'rgb(60, 56, 56)'
    },
    core_searchInput: {
      iconColor: '#FFFFFF'
    },
    core_footer: {
      background: 'rgb(238, 235, 234)',
      contentBackground: 'rgb(229, 224, 223)',
      contentColor: 'rgb(60, 56, 56)',
      termsBackground: 'rgb(6, 23, 39)'
    },
    core_megaMenu: {
      top: '7rem',
      backgroundColor: 'rgb(173, 168, 168)'
    },
    commerce_productCard: {
      boxShadow: 'none',
      boxShadowHover: 'none',
      borderRadius: '0',
      media__background: 'white'
    }
  } as EXOComponentStyles,

  // TODO: Find a better solution for assets ... and rename tempImg
  static: {
    tempImg:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8eyfzPwAIYwNDve8dtAAAAABJRU5ErkJggg==',
    tempAspot:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkcHT5DwACVAGGAcSgfgAAAABJRU5ErkJggg==',
    Logo
  }
};

const Theme = makeCarbon11Theme({
  name: 'IBM Consulting',
  vars: carbonVariables,
  fontConfig: {
    heading: "'IBM Plex Sans', Arial, sans-serif",
    body: "'IBM Plex Sans', Arial, sans-serif"
  },
  extraGlobalCSS: `.cds--toast-notification--error {
    margin-top: calc(var(--top) + 1rem) !important;
  }`,

  // TODO: Should we disable brand colors
  brandColors: {
    brand1: {
      base: '#0043CE',
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
