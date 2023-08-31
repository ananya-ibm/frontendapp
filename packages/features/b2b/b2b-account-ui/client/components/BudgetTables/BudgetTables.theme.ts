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
    b2b_account_ui_budgetTable?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    hoverBackground: props.theme.colors.backgrounds.panels.primary.hover,

    // Override with custom theme
    ...props.theme?.byComponent?.b2b_account_ui_budgetTable
  };
};
