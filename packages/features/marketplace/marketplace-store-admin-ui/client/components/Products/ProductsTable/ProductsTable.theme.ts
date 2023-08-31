/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as CSS from 'csstype';

type Props = {
  hoverBackground: CSS.Property.Background;
};

declare global {
  interface EXOComponentStyles {
    marketplace_store_admin_ui_productsTable?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    hoverBackground: props.theme.colors.backgrounds.panels.primary.hover,
    // Override with custom theme
    ...props.theme?.byComponent?.marketplace_store_admin_ui_productsTable
  };
};
