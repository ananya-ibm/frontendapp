/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ResponsiveFont } from '@exo/frontend-theme-base-theme';
import * as CSS from 'csstype';

type Props = {
  background: CSS.Property.Background;
  color: CSS.Property.Color;
  gap: CSS.Property.Gap;
  padding: CSS.Property.Padding;
  justifyContent: CSS.Property.JustifyContent;
  font: ResponsiveFont;
  __action: {
    textDecoration: CSS.Property.TextDecoration;
    $hover: {
      color: CSS.Property.Color;
      textDecoration: CSS.Property.TextDecoration;
    };
  };
};

declare global {
  interface EXOComponentStyles {
    core_masthead_auxilliary?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.panels.tertiary.base,
    color: props.theme.colors.text.secondary,
    gap: '1rem',
    padding: '0.3rem 1rem',
    justifyContent: 'center',
    font: props.theme.typography.body.short.S,
    __action: {
      textDecoration: 'none',
      $hover: {
        color: 'inherit',
        textDecoration: 'underline'
      }
    },

    // Override with custom theme
    ...props.theme?.byComponent?.core_masthead_auxilliary
  };
};
