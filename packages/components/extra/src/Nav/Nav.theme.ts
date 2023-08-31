/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { font } from '@exo/frontend-common-style-utils';
import * as CSS from 'csstype';

type Props = {
  background: string;
  overlayColor: string;
  linkColor: string;
  linkFont: string;
  navPadding: string;
  textTransform: string;
  hoverDecoration: string;
  hoverBackground: string;

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border */
  borderColor: CSS.Property.BorderColor;

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/border */
  borderWidth: CSS.Property.BorderWidth;
};

declare global {
  interface EXOComponentStyles {
    extra_nav?: Partial<Props>;
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
    linkFont: font(props.theme.typography.body.short.M),
    navPadding: `calc(0.4rem + ${props.theme.spacing.stack.s3}) ${props.theme.spacing.stack.s4}`,
    textTransform: 'none',
    hoverBackground: props.theme.colors.interactive.primary.hover.bg,
    hoverDecoration: 'none',
    // Override with custom theme
    ...props.theme?.byComponent?.extra_nav
  };
};
