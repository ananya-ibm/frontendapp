/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { InteractiveColor } from '@exo/frontend-theme-base-theme';
import { easings } from '@carbon/motion';
import { readableColor, lighten } from 'color2k';
import { carbonCssVariables } from './tools';
import { CarbonTheme, PartialCarbonTheme } from './types';

// eslint-disable-next-line import/no-webpack-loader-syntax
const styles = { default: '' }; // process.env.BUILD_MODE !== 'ssr,client' && process.env.BUILD_MODE !== 'analyze' ? require('!!raw-loader!../carbon/carbon.css') : { default: '' };

const BASE_BREAKPOINTS = {
  small: '320px',
  medium: '672px',
  large: '1056px',
  xLarge: '1312px',
  max: '1584px'
};


const makeInteractive = (carbonVars: any, index: string, name: string): InteractiveColor => {
  return {
    base: {
      bg: carbonVars[index],
      fg: carbonVars.text04
    },
    hover: {
      bg: carbonVars[`hover${name}`],
      fg: carbonVars.text04
    },
    active: {
      bg: carbonVars[`active${name}`],
      fg: carbonVars.text04
    }
  };
};

const makePanel = (carbonVars: any, name: string) => {
  return {
    base: carbonVars[name],
    hover: carbonVars.hoverUi,
    selected: carbonVars.selectedUi,
    selected_hover: carbonVars.hoverSelectedUi
  };
};

const multiplyWithUnit = (a, m) => {
  if (m) {
    return `calc(${m} * ${a})`;
  } else {
    return a;
  }
};

const parseResponsiveVar = (val: string) => {
  const fixLen = (v: string) => (v.split(',').length <= 4 ? fixLen(`${v},`) : v);
  return fixLen(val ?? '')
    .split(',')
    .map(e => (e === '' ? undefined : Number(e)));
};

const makeCSSVal = (v: string) => {
  if (v.endsWith('px')) {
    return {
      asRems: Number(v.replace('px', '')) / 16
    };
  } else if (v.endsWith('rem')) {
    return {
      asRems: Number(v.replace('rem', ''))
    };
  } else {
    throw new Error('Only rem and px supported');
  }
};

// Ordered list of breakpoints; small -> large
const breakpoints = ['small', 'medium', 'large', 'xLarge', 'max'];

const fluid = (
  useFluidTypes?: boolean,
  minBP?: number,
  maxBP?: number,
  minFS?: number,
  maxFS?: number
) => {
  if (!useFluidTypes) return minFS;
  if (!maxBP || !minBP || !maxFS) return minFS;

  const base = minFS! - (minBP * (maxFS - minFS!)) / (maxBP - minBP);
  const mult = (100 * (maxFS - minFS!)) / (maxBP - minBP);
  if (base < 0.0001 && mult < 0.0001) return '0';

  return `calc(${base.toPrecision(5)}rem + ${mult.toPrecision(6)}vw)`;
};

const makeFont = (fontConfig, useFluidTypes, bps, carbonVars, type, name, props) => {
  const sizeV = parseResponsiveVar(carbonVars[`${name}ResponsiveFontSize`]);
  const heightV = parseResponsiveVar(carbonVars[`${name}ResponsiveLineHeight`]);
  const weightV = parseResponsiveVar(carbonVars[`${name}ResponsiveFontWeight`]);
  const spacingV = parseResponsiveVar(carbonVars[`${name}ResponsiveLetterSpacing`]);

  const bpToRem = (b?: string) => (b ? makeCSSVal(bps[b]).asRems : undefined);
  const bpIdx = (b?: string) => breakpoints.findIndex(a => a === b);
  const get = (v: number[], idx: number) => v[idx];
  const has = get;
  const nextBP = (v: number[], idx: number) =>
    breakpoints.slice(idx + 1).find((_, i) => has(v, i + idx + 1));
  const nextV = (v: number[], idx: number) => v[bpIdx(nextBP(v, idx))];
  const make = (v: number[], bp: string, idx: number) =>
    has(v, idx)
      ? fluid(useFluidTypes, bpToRem(bp), bpToRem(nextBP(v, idx)), get(v, idx), nextV(v, idx))
      : undefined;

  return {
    family: fontConfig[type],
    letterSpacing: carbonVars[`${name}LetterSpacing`],
    lineHeight: carbonVars[`${name}LineHeight`],
    size: multiplyWithUnit(carbonVars[`${name}FontSize`], props.multiplier),
    weight: props?.weight ?? carbonVars[`${name}FontWeight`],
    breakpoints: Object.fromEntries(
      breakpoints
        .map((bp, idx) => [
          bp,
          {
            size: make(sizeV, bp, idx),
            lineHeight: has(heightV, idx) ? get(heightV, idx) : undefined,
            letterSpacing: has(spacingV, idx) ? get(spacingV, idx) : undefined,
            weight: has(weightV, idx) ? get(weightV, idx) : undefined
          }
        ])
        // @ts-ignore
        .filter(([_, v]) => v.size ?? v.lineHeight ?? v.letterSpacing ?? v.weight)
    )
  };
};

const makeSpacings = carbonVars => {
  return {
    sXXXS: carbonVars.spacing3xs,
    sXXS: carbonVars.spacing2xs,
    sXS: carbonVars.spacingXs,
    sS: carbonVars.spacingSm,
    sM: carbonVars.spacingMd,
    sL: carbonVars.spacingLg,
    sXL: carbonVars.spacingXl,
    sXXL: carbonVars.spacing2xl,
    sXXXL: carbonVars.spacing3xl,

    lXXS: carbonVars.layout2xs,
    lXS: carbonVars.layoutXs,
    lS: carbonVars.layoutSm,
    lM: carbonVars.layoutMd,
    lL: carbonVars.layoutLg,
    lXL: carbonVars.layoutXl,
    lXXL: carbonVars.layout2xl,

    s1: '',
    s2: '',
    s3: '',
    s4: '',
    s5: '',
    s6: '',
    s7: '',
    s8: '',
    s9: '',
    s10: '',
    s11: '',
    s12: '',
    s13: ''
  };
};

export type FontConfig = {
  heading: string;
  body: string;
  bodyDefaultWeight?: string;
};

type ExtraVars = {
  brand1Contrast?: string;
  brand2Contrast?: string;
};

export const makeCarbonTheme = (
  name: string,
  version: string,
  carbonVars: any,
  fontConfig: FontConfig,
  base: PartialCarbonTheme,
  extraGlobalCSS: string,
  extraVars?: ExtraVars,
  useFluidTypes = true
): CarbonTheme => {
  // eslint-disable-next-line no-param-reassign
  carbonVars.fieldHover = carbonVars.hoverUi;
  // eslint-disable-next-line no-param-reassign
  carbonVars.field = carbonVars.field01;

  const bps = base?.breakpoints ?? BASE_BREAKPOINTS;
  const ft = useFluidTypes;
  return {
    name,
    version,
    frameworkVars: carbonVars,
    byComponent: base.byComponent ?? {},
    globalStyles: {
      cssRules: `
        ${styles.default}
        :root { 
          ${carbonCssVariables(carbonVars)};
          --top: 0rem;
        }

        button {
          background-color: initial;
        }
                
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          text-decoration: none;
        }
      
        *::before,
        *::after {
          box-sizing: inherit;
        }

        html, body {
          font-family: 'IBM Plex Sans', Arial, sans-serif;
          font-size: 100%; /* 16px base font */
        }
      
        body {
          overflow-x: hidden;
        }
      
        /* Screen reader only */
        .sr {
          height: 0;
          overflow: hidden;
          visibility: hidden;
          width: 0;
        }

        /* Workaround for https://github.com/carbon-design-system/carbon/issues/9786 */
        .cds--number__controls {
          top: 0 !important;
          transform: none !important;
        }
    
        .cds--aspect-ratio--object {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }

        @keyframes exoFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes exoFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes exoHover {
          from { transform: scale(1.0); }
          50% { transform: scale(1.2); }
          to { transform: scale(1.0); }
        }
        @keyframes exoAction {
          from { transform: scale(1.0); }
          20% { transform: scale(0.9); }
          to { transform: scale(1.0); }
        }

        ${extraGlobalCSS ?? ''}
      `
    },

    colors: {
      brand: {
        brand1: {
          base: carbonVars.brand01,
          contrast: extraVars?.brand1Contrast ?? readableColor(carbonVars.brand01)
        },
        brand2: {
          base: carbonVars.brand02,
          contrast: extraVars?.brand2Contrast ?? readableColor(carbonVars.brand02)
        }
      },
      interactive: {
        primary: makeInteractive(carbonVars, 'interactive01', 'Primary'),
        secondary: makeInteractive(carbonVars, 'interactive02', 'Secondary'),
        tertiary: makeInteractive(carbonVars, 'interactive03', 'Tertiary'),
        danger: makeInteractive(carbonVars, 'danger', 'Danger'),
        disabled: {
          fg: carbonVars.disabled03,
          bg: carbonVars.disabled02
        }
      },
      information: {
        error: carbonVars.support01,
        success: carbonVars.support02,
        warning: carbonVars.support03,
        information: carbonVars.support04
      },
      text: {
        primary: carbonVars.text01,
        secondary: carbonVars.text02,
        tertiary: carbonVars.text03
      },
      icon: {
        primary: carbonVars.icon01,
        secondary: carbonVars.icon02
      },
      link: {
        base: carbonVars.link01,
        hover: carbonVars.link01,
        visited: carbonVars.visitedLink,
        visited_hover: carbonVars.visitedLink,
        disabled: carbonVars.disabled03
      },
      backgrounds: {
        page: carbonVars.uiBackground,
        panels: {
          primary: makePanel(carbonVars, 'ui01'),
          secondary: makePanel(carbonVars, 'ui02'),
          tertiary: makePanel(carbonVars, 'ui03')
        },
        overlay: carbonVars.overlay01
      },
      table: {
        row: {
          even: 'none',
          odd: 'none',
          hover: carbonVars.hoverRow,
          selected: 'none'
        }
      },
      inverse: {
        base: {
          bg: carbonVars.inverse02,
          fg: carbonVars.inverse01
        },
        danger: {
          bg: carbonVars.inverse02,
          fg: carbonVars.inverseSupport01
        },
        success: {
          bg: carbonVars.inverse02,
          fg: carbonVars.inverseSupport02
        },
        support: {
          bg: carbonVars.inverse02,
          fg: carbonVars.inverseSupport03
        },
        information: {
          bg: carbonVars.inverse02,
          fg: carbonVars.inverseSupport04
        }
      },
      delimiters: {
        primary: carbonVars.ui04,
        highContrast: carbonVars.ui05,
        lowContrast: lighten(carbonVars.ui04, 0.25)
      },
      form: {
        field: {
          base: {
            fg: carbonVars.text01,
            bg: carbonVars.field01
          },
          onPanel: {
            fg: carbonVars.text01,
            bg: carbonVars.field02
          },
          disabled: {
            fg: carbonVars.disabled02,
            bg: carbonVars.disabled01
          },
          placeholder: carbonVars.text03
        }
      }
    },

    breakpoints: BASE_BREAKPOINTS,

    typography: {
      body: {
        short: {
          XS: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort01', {
            multiplier: 0.75
          }),
          S: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort01', {
            multiplier: 0.85
          }),
          M: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort01', {}),
          L: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort02', {}),
          XL: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort02', {
            multiplier: 1.2
          }),
          emM: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort01', {
            weight: 700
          }),
          emL: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort02', {
            weight: 700
          }),
          emXL: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort02', {
            weight: 700,
            multiplier: 1.2
          })
        },
        long: {
          XS: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyLong01', {
            multiplier: 0.75
          }),
          S: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyLong01', {
            multiplier: 0.85
          }),
          M: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyLong01', {}),
          L: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyLong02', {}),
          XL: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort02', {
            multiplier: 1.2
          }),
          emM: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyLong01', {
            weight: 700
          }),
          emL: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyLong02', {
            weight: 700
          }),
          emXL: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'bodyShort02', {
            weight: 700,
            multiplier: 1.2
          })
        }
      },

      labels: {
        help: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'helperText01', {}),
        label: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'label01', {})
      },

      heading: {
        heading1: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'productiveHeading06', {}),
        heading2: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'productiveHeading05', {}),
        heading3: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'productiveHeading04', {}),
        heading4: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'productiveHeading03', {}),
        heading5: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'productiveHeading02', {}),
        heading6: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'productiveHeading01', {})
      },

      // TODO: Use the correct vars for this
      display: {
        heading1: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'expressiveHeading06', {}),
        heading2: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'expressiveHeading05', {}),
        heading3: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'expressiveHeading04', {}),
        heading4: makeFont(fontConfig, ft, bps, carbonVars, 'heading', 'expressiveHeading03', {}),
        body2: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'expressiveQuotation01', {}),
        body1: makeFont(fontConfig, ft, bps, carbonVars, 'body', 'expressiveParagraph01', {})
      }
    },

    spacing: {
      inline: makeSpacings(carbonVars),
      stack: makeSpacings(carbonVars),
      inset: {
        XS: `${carbonVars.spacingXs} ${carbonVars.spacingXs}`,
        S: `${carbonVars.spacingSm} ${carbonVars.spacingSm}`,
        M: `${carbonVars.spacingMd} ${carbonVars.spacingMd}`,
        L: `${carbonVars.spacingLg} ${carbonVars.spacingLg}`,
        XL: `${carbonVars.spacingXl} ${carbonVars.spacingXl}`
      },
      squishedInset: {
        XS: `${carbonVars.spacingXs} ${carbonVars.spacingMd}`,
        S: `${carbonVars.spacingSm} ${carbonVars.spacingLg}`,
        M: `${carbonVars.spacingMd} ${carbonVars.spacingXl}`,
        L: `${carbonVars.spacingLg} ${carbonVars.spacing2xl}`,
        XL: `${carbonVars.spacingXl} ${carbonVars.spacing3xl}`
      },
      stretchInset: {
        XS: `${carbonVars.spacingMd} ${carbonVars.spacingXs}`,
        S: `${carbonVars.spacingLg} ${carbonVars.spacingSm}`,
        M: `${carbonVars.spacingXl} ${carbonVars.spacingMd}`,
        L: `${carbonVars.spacing2xl} ${carbonVars.spacingLg}`,
        XL: `${carbonVars.spacing3xl} ${carbonVars.spacingXl}`
      }
    },

    elevation: {
      interactive: {
        accented: {
          base: 'rgba(149, 157, 165, 0.6) 0px 8px 24px',
          hover: 'rgba(149, 157, 165, 0.6) 0px 8px 24px'
        },
        primary: {
          base: 'inherit',
          hover: 'inherit'
        },
        secondary: {
          base: 'inherit',
          hover: 'inherit'
        },
        tertiary: {
          base: 'inherit',
          hover: 'inherit'
        },
        danger: {
          base: 'inherit',
          hover: 'inherit'
        }
      },
      panels: {
        accented: {
          base: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
          hover: `${carbonVars.interactive01} 0px 4px 6px`
        },
        primary: {
          base: 'inherit',
          hover: 'inherit'
        },
        secondary: {
          base: 'inherit',
          hover: 'inherit'
        },
        tertiary: {
          base: 'inherit',
          hover: 'inherit'
        }
      }
    },

    borders: {
      interactive: {
        accented: {
          base: {
            border: `0.075rem solid ${carbonVars.interactive01}`,
            radius: '0.25rem'
          },
          hover: {
            border: `0.125rem solid ${carbonVars.interactive01}`,
            radius: '0.25rem'
          }
        },
        primary: {
          base: {
            border: 'inherit',
            radius: 'inherit'
          },
          hover: {
            border: 'inherit',
            radius: 'inherit'
          }
        },
        secondary: {
          base: {
            border: 'inherit',
            radius: 'inherit'
          },
          hover: {
            border: 'inherit',
            radius: 'inherit'
          }
        },
        tertiary: {
          base: {
            border: 'inherit',
            radius: 'inherit'
          },
          hover: {
            border: 'inherit',
            radius: 'inherit'
          }
        },
        danger: {
          base: {
            border: 'inherit',
            radius: 'inherit'
          },
          hover: {
            border: 'inherit',
            radius: 'inherit'
          }
        }
      },
      panels: {
        accented: {
          base: {
            border: `0.075rem solid ${carbonVars.interactive01}`,
            radius: '0.25rem'
          },
          hover: {
            border: `0.125rem solid ${carbonVars.interactive01}`,
            radius: '0.25rem'
          }
        },
        primary: {
          base: {
            border: 'inherit',
            radius: 'inherit'
          },
          hover: {
            border: 'inherit',
            radius: 'inherit'
          }
        },
        secondary: {
          base: {
            border: 'inherit',
            radius: 'inherit'
          },
          hover: {
            border: 'inherit',
            radius: 'inherit'
          }
        },
        tertiary: {
          base: {
            border: 'inherit',
            radius: 'inherit'
          },
          hover: {
            border: 'inherit',
            radius: 'inherit'
          }
        }
      }
    },

    motion: {
      easings: {
        easeIn: {
          fast: `80ms ${easings.entrance.productive}`,
          regular: `120ms ${easings.entrance.productive}`,
          slow: `400ms ${easings.entrance.productive}`
        },
        easeOut: {
          fast: `80ms ${easings.exit.productive}`,
          regular: `120ms ${easings.exit.productive}`,
          slow: `400ms ${easings.exit.productive}`
        },
        easeInOut: {
          fast: `80ms ${easings.standard.productive}`,
          regular: `120ms ${easings.standard.productive}`,
          slow: `400ms ${easings.standard.productive}`
        }
      },
      entry: {
        fast: `exoFadeIn 70ms ${easings.entrance.productive}`,
        regular: `exoFadeIn 110ms ${easings.entrance.productive}`,
        slow: `exoFadeIn 180ms ${easings.entrance.productive}`
      },
      exit: {
        fast: `exoFadeOut 70ms ${easings.exit.productive}`,
        regular: `exoFadeOut 110ms ${easings.exit.productive}`,
        slow: `exoFadeOut 180ms ${easings.exit.productive}`
      },
      interactive: {
        hover: `exoHover 280ms ${easings.exit.productive}`,
        action: `exoAction 280ms ${easings.exit.productive}`
      }
    },

    ...base
  };
};
