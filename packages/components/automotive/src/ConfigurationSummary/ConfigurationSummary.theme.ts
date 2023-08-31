/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
  leftBackground: string;
  rightBackground: string;
  titleFontSize: string;
  titleFontFamily: string;
  textFontSize: string;
  textFontFamily: string;
  layoutSpacing: string;
  paragraphSpacing: string;
  maxWidth: string;
  tilePadding: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_configurationSummary?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.panels.secondary.base,
    leftBackground: props.theme.colors.backgrounds.panels.secondary.base,
    rightBackground: props.theme.colors.backgrounds.panels.secondary.base,
    titleFontSize: props.theme.typography.heading.heading3.size?.toString(),
    titleFontFamily: props.theme.typography.heading.heading3.family,
    textFontSize: '1rem', // props.theme.typography.body.short.size,
    textFontFamily: props.theme.typography.body.short.M.family,
    layoutSpacing: props.theme.spacing.stack.s7,
    paragraphSpacing: props.theme.spacing.stack.s5,
    maxWidth: '74rem',
    tilePadding: props.theme.spacing.inset.XL,

    // Override with custom theme - this also defines the key under which
    // the theme can be overridden, in this case .automotive.configurationSummary
    // in general should follow the format .<domain>.<componentName>
    ...props.theme?.byComponent?.automotive_configurationSummary
  };
};
