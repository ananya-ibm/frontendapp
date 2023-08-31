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
  byComponent: {
    base_button: {
      fontWeight: '700',
      fontSize: '105%'
    },
    core_masthead: {
      border: '0.5rem solid #161616',
      borderWidth: '0.5rem 0 0 0',
      boxShadow: '0 0.06rem 0.5rem #d8d8d8'
    },
    core_masthead_auxilliary: {
      background: '#fff'
    },
    core_masthead_navDesktop: {
      background: '#fff',
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
      background: '#fff',
      padding: '0.25rem',
      $$large: {
        padding: '0.25rem 0.25rem 0 0.75rem'
      },
      __logo: {
        maxWidth: '3rem',
        maxHeight: '2rem',
        $$large: {
          maxWidth: '3rem',
          maxHeight: '2rem'
        }
      }
    },

    automotive_automotiveHero: {
      buttonColor: '#fff'
    },
    core_menu: {
      headerColor: carbonVariables['text-primary'],
      headerColorHover: carbonVariables['text-primary'],
      activeBackground: carbonVariables['layer-01'],
      headerBackground: carbonVariables.background,
      menuBgColor: carbonVariables.background,
      menuFontSize: '0.875rem/.875rem'
    },
    chrome_ui_chrome: {
      contentBgColor: carbonVariables['layer-01'],
      contentSpacing: '0'
    },
    core_footer: {
      background: '#dcdcdc',
      termsBackground: '#000',
      contentBackground: '#dcdcdc',
      termsColor: '#dcdcdc'
    },
    core_heroCarousel: {
      background: '#e9ebeb',
      contentBg: 'rgba(240, 169, 60, 0.72)',
      contentColor: '#fff'
    },
    account_profile_ui_preferences: {
      border: 'none'
    },
    automotive_configurator_ui_configuratorEntryBar: {
      priceBarBgColor: '#fff'
    },
    automotive_trimPriceBar: {
      tabBgColor: '#0062FF',
      tabBorderColor: '#fff',
      tabHoverBgColor: '#fff',
      tabSelectedBgColor: '#fff',
      priceBarBgColor: '#fff'
    },
    catalog_ui_productHero: {
      contentBackground: 'transparent'
    },
    commerce_productCard: {
      borderRadius: '0 none',
      bodySpacing: '1.25rem 0 0',
      boxShadow:
        'rgba(0, 0, 0, 0) 0.125rem 0.125rem 1rem, rgba(0, 0, 0, 0) -0.125rem -0.125rem 1rem',
      contentBorder: '0 none',
      title__font: '700 1.5rem/2rem "IBM Plex Sans", Arial, sans-serif',
      titleColor: carbonVariables['text-primary'],
      priceFont: '400 1.5rem / 2rem "IBM Plex Sans", Arial, sans-serif',
      priceColor: carbonVariables['text-primary'],
      textMarginBottom: '1rem',
      imgMaxHeight: '15rem',
      imgMaxWidth: '16.25rem',
      iconBackground: 'transparent',
      iconColor: carbonVariables['text-primary'],
      iconWidth: '3rem',
      iconHeight: '3rem'
    },
    commerce_productItemCarousel: {
      infoAlignment: 'left',
      titleFont: '700 1.5rem/2rem "IBM Plex Sans", Arial, sans-serif',
      textMarginBottom: '1rem'
    },
    base_card: {
      boxShadow: 'none',
      boxShadowHover: 'none',
      backgroundColor: 'white',
      borderTop: '0.5rem solid #0062ff',
      borderLeft: '0.125rem solid rgba(0,0,0,0.1)',
      borderRight: '0.125rem solid rgba(0,0,0,0.1)',
      borderBottom: '0.125rem solid rgba(0,0,0,0.1)',
      borderRadius: '0.25rem',
      titleFont: '700 1.35rem/1.8rem "IBM Plex Sans", Arial, sans-serif'
    },
    base_modal: {
      background: carbonVariables['layer-02'],
      formElementBackground: carbonVariables['layer-01'],
      titleFont: '700 2rem/1.25 "IBM Plex Sans",Arial,sans-serif',
      padding: '2rem'
    }
  } as EXOComponentStyles,

  static: {
    tempImg:
      'https://i.picsum.photos/id/872/1500/700.jpg?hmac=4B3KkqiEh7u604cbzMBV2tiolz353REQxDuVipbfJ_M',
    Logo
  }
};

const Theme = makeCarbon11Theme({
  name: 'Automotive',
  vars: carbonVariables,
  fontConfig: {
    heading: "'IBM Plex Sans', Arial, sans-serif",
    body: "'IBM Plex Sans', Arial, sans-serif"
  },
  extraGlobalCSS: `
    & .cds--text-input-wrapper {
      display: block;
    }

    h2::after {
      background: #0062ff;
      content: ' ';
      display: block;
      height: 0.07rem;
      margin: 0.5rem 0 0;
      width: 10rem;
    }

    .cds--modal-container {
      padding: 2rem;
    }

    .cds--modal-footer .cds--btn {
      height: 3rem;
    }

    .cds--modal-footer {
      gap: 1rem;
      margin-right: auto;
      margin-left: 1rem;
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
