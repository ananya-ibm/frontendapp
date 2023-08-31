/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  iconColor: string;
  countBg: string;
  countFg: string;
};

declare global {
  interface EXOComponentStyles {
    cart_ui_miniCart?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Content spacing is applied to the Main content, and controls space between header, main, and footer content
    iconColor: 'unset', // props.theme.colors.icon.primary,
    countBg: props.theme.colors.brand.brand1.base,
    countFg: props.theme.colors.brand.brand1.contrast,

    ...props.theme?.byComponent?.cart_ui_miniCart
  };
};
