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
  color: CSS.Property.Color;
  gap: CSS.Property.Gap;
  padding: CSS.Property.Padding;
  font: ResponsiveFont;
  __action: {
    padding: CSS.Property.Padding;
    textDecoration: CSS.Property.TextDecoration;
    $hover: {
      color: CSS.Property.Color;
      background: CSS.Property.Background;
      textDecoration: CSS.Property.TextDecoration;
    };
  };
};

declare global {
  interface EXOComponentStyles {
    core_masthead_navDesktop?: DeepPartial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return merge(
    {
      // Default theme
      background: props.theme.colors.interactive.secondary.base.bg,
      color: props.theme.colors.interactive.secondary.base.fg,
      gap: '0',
      padding: '0',
      font: props.theme.typography.body.short.M,
      __action: {
        padding: '1rem',
        textDecoration: 'none',
        $hover: {
          color: props.theme.colors.interactive.secondary.hover.fg,
          background: props.theme.colors.interactive.secondary.hover.bg,
          textDecoration: 'none'
        }
      }
    },

    props.theme?.byComponent?.core_masthead_navDesktop
  );
};
