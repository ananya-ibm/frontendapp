/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  tableBg: string;
  tableHeadBg: string;
  tableBorder: string;
  tableHeadText: string;
};

declare global {
  interface EXOComponentStyles {
    b2b_quick_order_ui_quickOrder?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    tableBg: props.theme.colors.backgrounds.panels.primary.base,
    tableHeadBg: props.theme.colors.backgrounds.panels.tertiary.base,
    tableBorder: props.theme.colors.backgrounds.page,
    tableHeadText: props.theme.colors.text.primary,

    ...props.theme?.byComponent?.b2b_quick_order_ui_quickOrder
  };
};
