/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { font } from '@exo/frontend-common-style-utils';

type Props = {
  boxShadow: string;
  boxShadowHover: string;
  backgroundColor: string;
  borderTop: string;
  borderLeft: string;
  borderRight: string;
  borderBottom: string;
  borderRadius: string;
  titleFont: string;
};

declare global {
  interface EXOComponentStyles {
    base_card?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    boxShadowHover: 'rgba(0, 0, 0, 0.25) 1.95px 1.95px 2.6px',
    backgroundColor: props.theme.colors.backgrounds.panels.primary.base,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderRadius: '0',
    titleFont: font(props.theme.typography.heading.heading4),

    // Override with custom theme
    ...props.theme?.byComponent.base_card
  };
};
