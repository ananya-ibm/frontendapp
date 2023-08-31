/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { font } from '@exo/frontend-common-style-utils';

type Props = {
  titleColor: string;
  titleFont: string;
  textTransform: string;
};

declare global {
  interface EXOComponentStyles {
    marketplace_ui_storesPage?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    titleColor: props.theme.colors.brand.brand1.base,
    titleFont: font(props.theme.typography.heading.heading3),
    textTransform: 'none',
    // Override with custom theme
    ...props.theme?.byComponent?.marketplace_ui_storesPage
  };
};
