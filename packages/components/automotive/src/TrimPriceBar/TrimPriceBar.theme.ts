/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  tabBgColor: string;
  tabBorderColor: string;
  tabHoverBgColor: string;
  tabSelectedBgColor: string;
  priceBarBgColor: string;
  selectedLinkColor: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_trimPriceBar?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    tabBgColor: props.theme.colors.interactive.primary.base.bg,
    tabBorderColor: props.theme.colors.interactive.disabled.bg,
    tabHoverBgColor: props.theme.colors.interactive.primary.hover.bg,
    tabSelectedBgColor: props.theme.colors.interactive.primary.active.bg,
    priceBarBgColor: props.theme.colors.backgrounds.panels.secondary.base,
    selectedLinkColor: '#000',

    ...props.theme?.byComponent?.automotive_trimPriceBar
  };
};
