/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
  borderRadius: string;
  bordertTop: string;
  borderColor: string;
  height: string;
  imageBorder: string;
  marginLarge: string;
  marginSmall: string;
  padding: string;
  uiBackground: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_dealerDetails?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.panels.secondary.base,
    borderRadius: props.theme.borders.panels.accented.base.radius ?? 'none',
    bordertTop: props.theme.colors.brand.brand1.base,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    height: props.theme.spacing.stack.lXXL,
    imageBorder: '#808080',
    marginLarge: props.theme.spacing.stack.s7,
    marginSmall: props.theme.spacing.stack.s5,
    padding: '1.25rem',
    uiBackground: 'none',

    // Override with custom theme
    ...props.theme?.byComponent?.automotive_dealerDetails
  };
};
