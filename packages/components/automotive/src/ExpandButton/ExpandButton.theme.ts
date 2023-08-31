/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  borderRadius: string;
  textTransform: string;
  background: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_expandButton?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    borderRadius: props.theme.borders.interactive.accented.base.radius ?? 'none',
    textTransform: 'none',
    background: props.theme.colors.backgrounds.panels.secondary.base,

    // Override with custom theme - this also defines the key under which
    // the theme can be overridden, in this case .automotive.configurationSummary
    // in general should follow the format .<domain>.<componentName>
    ...props.theme?.byComponent?.automotive_expandButton
  };
};
