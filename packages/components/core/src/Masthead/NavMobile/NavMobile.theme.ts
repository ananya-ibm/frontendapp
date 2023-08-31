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
  gap: CSS.Property.Gap;
  padding: CSS.Property.Padding;
  font: ResponsiveFont;
  color: CSS.Property.Color;
  __secondaryAction: {
    color: CSS.Property.Color;
  };
  __delimiter: {
    color: CSS.Property.Color;
  };
};

declare global {
  interface EXOComponentStyles {
    core_masthead_navMobile?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    gap: '1rem',
    padding: '0 2rem',
    font: props.theme.typography.heading.heading6,
    color: props.theme.colors.text.secondary,
    __secondaryAction: {
      color: props.theme.colors.text.secondary
    },
    __delimiter: {
      color: props.theme.colors.delimiters.lowContrast
    },

    // Override with custom theme
    ...props.theme?.byComponent?.core_masthead_navMobile
  };
};
