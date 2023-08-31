/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as CSS from 'csstype';

interface Props {
  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/color */
  color: CSS.Property.Color;

  /** @see https://developer.mozilla.org/en-US/docs/Web/CSS/background */
  content__background: CSS.Property.Background;
}

declare global {
  interface EXOComponentStyles {
    core_hero?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    color: props.theme.colors.inverse.base.fg,
    content__background: 'transparent',

    ...props.theme?.byComponent?.core_hero
  };
};
