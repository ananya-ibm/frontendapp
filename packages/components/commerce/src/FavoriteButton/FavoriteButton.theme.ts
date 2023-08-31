/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  activeColor: string;
  favoriteSpacing: string;
};

declare global {
  interface EXOComponentStyles {
    commerce_favoriteButton?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    activeColor: props.theme.colors.interactive.primary.base.bg,
    favoriteSpacing: props.theme.spacing.inline.s4,

    // Override with custom theme
    ...props.theme?.byComponent?.commerce_favoriteButton
  };
};
