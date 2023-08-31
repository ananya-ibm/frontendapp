/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Theme } from '@exo/frontend-theme-base-theme';
import { Carbon11Vars, PartialCarbonTheme } from './types';
import { easings } from '@carbon/motion';
import React from 'react';
import { css } from 'styled-components';
import { responsiveFontBlock } from '@exo/frontend-common-style-utils';

type CarbonTheme = Theme<Carbon11Vars>;

type FontConfig = {
  heading: string;
  body: string;
  bodyDefaultWeight?: string;
};

const BASE_BREAKPOINTS = {
  small: '320px',
  medium: '672px',
  large: '1056px',
  xLarge: '1312px',
  max: '1584px'
};

const makeInteractive = (carbonVars: Carbon11Vars, name: string) => ({
  base: {
    bg: carbonVars[`button-${name}`],
    fg: carbonVars['text-on-color']
  },
  active: {
    bg: carbonVars[`button-${name}-active`],
    fg: carbonVars['text-on-color']
  },
  hover: {
    bg: carbonVars[`button-${name}-hover`],
    fg: carbonVars['text-on-color']
  }
})

const makeSpacings = ($v: Carbon11Vars) => {
  // TODO: Consider renaming these to align with Carbon
  return {
    sXXXS: $v['spacing-01'],
    sXXS: $v['spacing-02'],
    sXS: $v['spacing-03'],
    sS: $v['spacing-04'],
    sM: $v['spacing-05'],
    sL: $v['spacing-06'],
    sXL: $v['spacing-07'],
    sXXL: $v['spacing-08'],
    sXXXL: $v['spacing-09'],
    lXXS: $v['spacing-05'],
    lXS: $v['spacing-06'],
    lS: $v['spacing-07'],
    lM: $v['spacing-09'],
    lL: $v['spacing-10'],
    lXL: $v['spacing-12'],
    lXXL: $v['spacing-13'],

    s1: $v['spacing-01'],
    s2: $v['spacing-02'],
    s3: $v['spacing-03'],
    s4: $v['spacing-04'],
    s5: $v['spacing-05'],
    s6: $v['spacing-06'],
    s7: $v['spacing-07'],
    s8: $v['spacing-08'],
    s9: $v['spacing-09'],
    s10: $v['spacing-10'],
    s11: $v['spacing-11'],
    s12: $v['spacing-12'],
    s13: $v['spacing-13']
  };
};

export const makePanel = ($v: Carbon11Vars, idx: string) => ({
  base: $v[`layer-${idx}`],
  hover: $v[`layer-hover-${idx}`],
  selected: $v[`layer-selected-${idx}`],
  selected_hover: $v[`layer-selected-hover-${idx}`]
});


// Ordered list of breakpoints; small -> large
const breakpoints = {
  sm: 'small', 
  md: 'medium', 
  lg: 'large', 
  xlg: 'xLarge', 
  max: 'max'
};

const multiplyWithUnit = (a, m) => {
  if ((a as string).endsWith('rem') && (typeof m === 'string' || typeof m === 'number')) {
    return `${a.substring(0, a.length - 3) * (m as any)}rem`;
  } else if (m) {
    return `calc(${m} * ${a})`;
  } else {
    return a;
  }
};

const makeFont = (
  fontConfig: FontConfig,
  $v: Carbon11Vars,
  type: keyof FontConfig,
  name: keyof Carbon11Vars,
  props: {
    weight?: number;
    multiplier?: number;
  }
) => {
  return {
    family: fontConfig[type] ?? 'inherit',
    letterSpacing: $v[name]['letter-spacing'],
    lineHeight: multiplyWithUnit($v[name]['font-size'], $v[name]['line-height']),
    size: multiplyWithUnit($v[name]['font-size'], props.multiplier),
    weight: props?.weight ?? $v[name]['font-weight'],
    breakpoints: Object.fromEntries(
      Object.entries(($v[name] as any).breakpoints ?? {}).map(([k, bp]: any[]) => [
        breakpoints[k],
        {
          size: bp['font-size'],
          lineHeight: multiplyWithUnit(bp['font-size'], bp['line-height']),
          letterSpacing: bp['letter-spacing'],
          weight: bp['font-weight']
        }
      ])
    )
  };
};

const buildTheme = ($v: Carbon11Vars, brandColors: CarbonTheme["colors"]["brand"], ft: boolean, fontConfig: FontConfig) => {
  return {
    colors: {
      brand: brandColors,
      interactive: {
        primary: makeInteractive($v, 'primary'),
        secondary: makeInteractive($v, 'secondary'),
        tertiary: makeInteractive($v, 'tertiary'),
        danger: makeInteractive($v, 'danger'),
        disabled: {
          bg: $v['button-disabled'],
          fg: $v['text-on-color-disabled']
        }
      },
      information: {
        error: $v['support-error'],
        success: $v['support-success'],
        warning: $v['support-warning'],
        information: $v['support-info']
      },
      text: {
        primary: $v['text-primary'],
        secondary: $v['text-secondary'],
        tertiary: $v['text-placeholder']
      },
      icon: {
        primary: $v['icon-primary'],
        secondary: $v['icon-secondary']
      },
      link: {
        base: $v['link-primary'],
        hover: $v['link-primary-hover'],
        visited: $v['link-visited'],
        visited_hover: $v['link-visited'],
        disabled: $v['text-disabled']
      },
      backgrounds: {
        page: $v.background,
        panels: {
          primary: makePanel($v, '01'),
          secondary: makePanel($v, '02'),
          tertiary: makePanel($v, '03')
        },
        overlay: $v.overlay
      },
      table: {
        row: {
          even: $v['layer-accent-01'],
          odd: $v['layer-01'],
          hover: $v['layer-hover-01'],
          selected: $v['layer-hover-01']
        }
      },
      inverse: {
        base: {
          bg: $v['background-inverse'],
          fg: $v['text-inverse']
        },
        danger: {
          bg: $v['background-inverse'],
          fg: $v['support-error-inverse']
        },
        success: {
          bg: $v['background-inverse'],
          fg: $v['support-success-inverse']
        },
        support: {
          bg: $v['background-inverse'],
          fg: $v['support-support-inverse']
        },
        information: {
          bg: $v['background-inverse'],
          fg: $v['support-info-inverse']
        }
      },

      // TODO: Revise this section
      delimiters: {
        primary: $v['border-strong-01'],
        highContrast: $v['border-inverse'],
        lowContrast: $v['border-subtle-01']
      },

      form: {
        field: {
          base: {
            fg: $v['text-primary'],
            bg: $v['field-01']
          },
          onPanel: {
            fg: $v['text-primary'],
            bg: $v['field-02']
          },
          disabled: {
            fg: $v['text-disabled'],
            bg: $v['field-01']
          },

          placeholder: $v['text-placeholder']
        }
      }
    },

    breakpoints: BASE_BREAKPOINTS,

    typography: {
      // TODO: Can we remove some sizes here
      body: {
        short: {
          XS: makeFont(fontConfig, $v, 'body', 'body-compact-01', {
            multiplier: 0.75
          }),
          S: makeFont(fontConfig, $v, 'body', 'body-compact-01', {
            multiplier: 0.85
          }),
          M: makeFont(fontConfig, $v, 'body', 'body-compact-01', {}),
          L: makeFont(fontConfig, $v, 'body', 'body-compact-02', {}),
          XL: makeFont(fontConfig, $v, 'body', 'body-compact-02', {
            multiplier: 1.2
          }),
          emM: makeFont(fontConfig, $v, 'body', 'body-compact-01', {
            weight: 700
          }),
          emL: makeFont(fontConfig, $v, 'body', 'body-compact-02', {
            weight: 700
          }),
          emXL: makeFont(fontConfig, $v, 'body', 'body-compact-02', {
            weight: 700,
            multiplier: 1.2
          })
        },
        long: {
          XS: makeFont(fontConfig, $v, 'body', 'body-01', {
            multiplier: 0.75
          }),
          S: makeFont(fontConfig, $v, 'body', 'body-01', {
            multiplier: 0.85
          }),
          M: makeFont(fontConfig, $v, 'body', 'body-01', {}),
          L: makeFont(fontConfig, $v, 'body', 'body-02', {}),
          XL: makeFont(fontConfig, $v, 'body', 'body-02', {
            multiplier: 1.2
          }),
          emM: makeFont(fontConfig, $v, 'body', 'body-01', {
            weight: 700
          }),
          emL: makeFont(fontConfig, $v, 'body', 'body-02', {
            weight: 700
          }),
          emXL: makeFont(fontConfig, $v, 'body', 'body-02', {
            weight: 700,
            multiplier: 1.2
          })
        }
      },

      labels: {
        help: makeFont(fontConfig, $v, 'body', 'helper-text-01', {}),
        label: makeFont(fontConfig, $v, 'body', 'label-01', {})
      },

      heading: {
        heading1: makeFont(fontConfig, $v, 'heading', ft ? 'fluid-heading-06' : 'heading-06', {}),
        heading2: makeFont(fontConfig, $v, 'heading', ft ? 'fluid-heading-05' : 'heading-05', {}),
        heading3: makeFont(fontConfig, $v, 'heading', ft ? 'fluid-heading-04' : 'heading-04', {}),
        heading4: makeFont(fontConfig, $v, 'heading', ft ? 'fluid-heading-03' : 'heading-03', {}),
        heading5: makeFont(fontConfig, $v, 'heading', 'heading-02', {}),
        heading6: makeFont(fontConfig, $v, 'heading', 'heading-01', {})

        // TODO: Missing an additional heading level here
        // TODO: Adding compact headers
      },

      // TODO: Add fluid headings - maybe just a flag?

      display: {
        body1: makeFont(fontConfig, $v, 'body', 'fluid-paragraph-01', {}),
        body2: makeFont(fontConfig, $v, 'body', 'fluid-quotation-01', {}),
        heading1: makeFont(fontConfig, $v, 'heading', 'fluid-display-04', {}),
        heading2: makeFont(fontConfig, $v, 'heading', 'fluid-display-03', {}),
        heading3: makeFont(fontConfig, $v, 'heading', 'fluid-display-02', {}),
        heading4: makeFont(fontConfig, $v, 'heading', 'fluid-display-01', {})
      }
    },

    spacing: {
      inline: makeSpacings($v),
      stack: makeSpacings($v),
      inset: {
        XS: `${$v['spacing-03']} ${$v['spacing-03']}`,
        S: `${$v['spacing-04']} ${$v['spacing-04']}`,
        M: `${$v['spacing-05']} ${$v['spacing-05']}`,
        L: `${$v['spacing-06']} ${$v['spacing-06']}`,
        XL: `${$v['spacing-07']} ${$v['spacing-07']}`
      },
      squishedInset: {
        XS: `${$v['spacing-03']} ${$v['spacing-05']}`,
        S: `${$v['spacing-04']} ${$v['spacing-06']}`,
        M: `${$v['spacing-05']} ${$v['spacing-07']}`,
        L: `${$v['spacing-06']} ${$v['spacing-08']}`,
        XL: `${$v['spacing-07']} ${$v['spacing-09']}`
      },
      stretchInset: {
        XS: `${$v['spacing-05']} ${$v['spacing-03']}`,
        S: `${$v['spacing-06']} ${$v['spacing-04']}`,
        M: `${$v['spacing-07']} ${$v['spacing-05']}`,
        L: `${$v['spacing-08']} ${$v['spacing-06']}`,
        XL: `${$v['spacing-09']} ${$v['spacing-07']}`
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

          // TODO: This is a rather strange color to choose
          hover: `${$v['button-primary']} 0px 4px 6px`
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
          // TODO: is this correct?
          base: {
            border: `0.075rem solid ${$v['button-primary']}`,
            radius: '0.25rem'
          },
          hover: {
            border: `0.125rem solid ${$v['button-primary']}`,
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
          // TODO: is this correct?
          base: {
            border: `0.075rem solid ${$v['button-primary']}`,
            radius: '0.25rem'
          },
          hover: {
            border: `0.125rem solid ${$v['button-primary']}`,
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
    }
  }
}

export const makeCarbon11Theme = ({
  name,
  version='0.4',
  vars,
  overrides,
  carbonStyles,
  fontConfig,
  extraGlobalCSS,
  brandColors,
  useFluidTypes = false
}: {
  name: string;
  version?: string;
  vars: Carbon11Vars;
  fontConfig: FontConfig;
  overrides: PartialCarbonTheme;
  carbonStyles: string;
  extraGlobalCSS: string | 
    (({ theme }: { theme: ReturnType<typeof buildTheme>}) => string) |
    React.ReactElement |
    React.ClassType<any, any, any>;
  brandColors: CarbonTheme["colors"]["brand"];
  useFluidTypes?: boolean;
}): CarbonTheme => {
  const ft = useFluidTypes;
  const $v = vars;

  const themeVars = buildTheme($v, brandColors, ft, fontConfig);

  const extraGlobalCSSAsString = !extraGlobalCSS
    ? ''
    : typeof extraGlobalCSS === 'function'
    ? extraGlobalCSS({ theme: themeVars })
    : typeof extraGlobalCSS === 'string' 
    ? extraGlobalCSS 
    : '';

  const extraGlobalCSSAsComponent = !extraGlobalCSS 
    ? undefined
    : (extraGlobalCSS as any).type
    ? extraGlobalCSS as React.ReactElement
    : undefined; 

  return {
    name,
    version,
    frameworkVars: $v,
    byComponent: overrides.byComponent ?? {},

    ...themeVars,

    globalStyles: {
      cssComponent: extraGlobalCSSAsComponent, //createGlobalStyle`body { background: red !important; }` as any,
      cssRules: `
        ${carbonStyles}

        :root { 
          --top: 0rem;
          --max-width: 99rem; 
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

        ${extraGlobalCSSAsString}
      `
    },

    ...overrides
  };
}

export const makeDefaultFontBlock = (h1Level: number) => css`
    html, body {
    }
    p {
      ${props => responsiveFontBlock(props.theme.typography.body.short.M)};
    }
    h1 {
      ${props => responsiveFontBlock(props.theme.typography.heading[`heading${h1Level}`])};
    }
    h2 {
      ${props => responsiveFontBlock(props.theme.typography.heading[`heading${h1Level + 1}`])};
    }
    h3 {
      ${props => responsiveFontBlock(props.theme.typography.heading[`heading${h1Level + 2}`])};
    }
`;