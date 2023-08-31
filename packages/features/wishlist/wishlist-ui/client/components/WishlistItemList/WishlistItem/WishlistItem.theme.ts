/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  border: string;
  descriptionColor: string;
  propertyColor: string;
  priceColor: string;
  iconColor: string;
};

declare global {
  interface EXOComponentStyles {
    wishlist_ui_wishlistItem?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    border: props.theme.colors.delimiters.lowContrast,
    descriptionColor: props.theme.colors.text.secondary,
    propertyColor: props.theme.colors.text.secondary,
    priceColor: props.theme.colors.text.tertiary,
    iconColor: props.theme.colors.text.tertiary,

    // Override with custom theme
    ...props.theme?.byComponent?.wishlist_ui_wishlistItem
  };
};
