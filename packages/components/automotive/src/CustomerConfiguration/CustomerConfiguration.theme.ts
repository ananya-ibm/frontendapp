/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  brandColor: string;
  warningColor: string;
  border: string;
  textFontSize: string;
  textFontFamily: string;
  spacing: string;
  smallSpacing: string;
  iconSpacing: string;
  shadowColor: string;
  shadowBlur: string;
  borderWidth: string;
  borderColor: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_CustomerConfiguration?: Props;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    brandColor: props.theme.colors.brand.brand1.base,
    warningColor: props.theme.colors.information.error,
    border: '#d6d6d6',
    textFontSize: '1rem/1.45rem',
    textFontFamily: props.theme.typography.body.short.M.family,
    spacing: props.theme.spacing.stack.sXL,
    smallSpacing: props.theme.spacing.stack.s5,
    iconSpacing: props.theme.spacing.stack.s4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowBlur: props.theme.spacing.stack.s5,
    borderWidth: '0.0625rem',
    borderColor: '#d6d6d6',
    // Override with custom theme - this also defines the key under which
    // the theme can be overridden, in this case .automotive.configurationSummary
    // in general should follow the format .<domain>.<componentName>
    ...props.theme?.byComponent?.automotive_CustomerConfiguration
  };
};
