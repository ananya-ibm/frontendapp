/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as CSS from 'csstype';

type Props = {
  background: string;
  overlayColor: string;
  linkColor: string;
  linkFont: string;
  navPadding: string;
  textTransform: string;
  hoverDecoration: string;

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border */
  borderColor: CSS.Property.BorderColor;

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border */
  borderWidth: CSS.Property.BorderWidth;
};

declare global {
  interface EXOComponentStyles {
    b2b_chrome_ui?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    borderColor: 'none',
    borderWidth: 0,
    background: props.theme.colors.brand.brand1.base,
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    linkColor: props.theme.colors.brand.brand1.contrast,
    linkFont: `700 0.75rem/.75rem ${props.theme.typography.body.short.M.family}`,
    navPadding: `calc(0.4rem + ${props.theme.spacing.stack.s3}) ${props.theme.spacing.stack.s4}`,
    textTransform: 'none',
    hoverDecoration: 'underline',
    // Override with custom theme
    ...props.theme?.byComponent?.b2b_chrome_ui
  };
};
