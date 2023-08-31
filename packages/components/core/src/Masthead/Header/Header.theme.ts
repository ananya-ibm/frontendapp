/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { DeepPartial, ResponsiveFont } from '@exo/frontend-theme-base-theme';
import * as CSS from 'csstype';
import merge from 'lodash/merge';

type Props = {
  background: CSS.Property.Background;
  borderBottom: CSS.Property.Border;
  color: CSS.Property.Color;
  padding: CSS.Property.Padding;
  font: ResponsiveFont;
  __action: {
    padding: CSS.Property.Padding;
  };
  __menuToggle: {
    margin: CSS.Property.Margin;
  };
  __logo: {
    padding: CSS.Property.Padding;
    maxWidth: CSS.Property.MaxWidth;
    maxHeight: CSS.Property.MaxHeight;
  };
};

declare global {
  interface EXOComponentStyles {
    core_masthead_header?: DeepPartial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return merge(
    {
      // Default theme
      background: props.theme.colors.backgrounds.panels.primary.base,
      borderBottom: `1px solid ${props.theme.colors.delimiters.lowContrast}`,
      color: props.theme.colors.text.primary,
      padding: '0',
      font: props.theme.typography.body.short.M,
      __menuToggle: {
        margin: '0 0.5rem 0 0'
      },
      __action: {
        padding: '0.875rem'
      },
      __logo: {
        padding: '0 0 0 1rem',
        maxWidth: '2.9rem',
        maxHeight: '2.9rem'
      }
    },
    props.theme?.byComponent?.core_masthead_header
  );
};
