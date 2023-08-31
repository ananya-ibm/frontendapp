/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  padding: string;
  marginMedium: string;
  border: string;
  margin: string;
  marginLarge: string;
  marginSmall: string;
  marginExtraLarge: string;
};

declare global {
  interface EXOComponentStyles {
    commerce_orderDetails?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    padding: props.theme.spacing.inline.s5,
    marginMedium: props.theme.spacing.inline.s7,
    border: props.theme.colors.backgrounds.panels.primary.base,
    margin: props.theme.spacing.inline.s5,
    marginLarge: props.theme.spacing.inline.s6,
    marginSmall: props.theme.spacing.inline.s4,
    marginExtraLarge: '2.5rem',

    // Override with custom theme
    ...props.theme?.byComponent?.commerce_orderDetails
  };
};
