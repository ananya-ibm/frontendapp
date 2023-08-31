/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  priceBarBgColor: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_configurator_ui_configuratorEntryBar?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    priceBarBgColor: props.theme.colors.backgrounds.panels.secondary.base,

    // Override with custom theme
    ...props.theme?.byComponent?.automotive_configurator_ui_configuratorEntryBar
  };
};
