/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  border: string;
  propertyColor: string;
  priceColor: string;
};

declare global {
  interface EXOComponentStyles {
    cart_ui_cartItem?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    border: props.theme.colors.delimiters.lowContrast,
    propertyColor: props.theme.colors.text.secondary,
    priceColor: props.theme.colors.text.tertiary,

    // Override with custom theme
    ...props.theme?.byComponent?.cart_ui_cartItem
  };
};
