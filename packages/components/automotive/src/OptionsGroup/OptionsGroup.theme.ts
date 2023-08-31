/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
  border: string;
  borderRadius: string;
  text: string;
  checkedBorder: string;
  checkedText: string;
  easing: string;
  textTransform: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_optionsGroup?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.panels.secondary.base,
    border: props.theme.colors.text.secondary,
    borderRadius: '0.25rem',
    text: props.theme.colors.text.secondary,
    checkedBorder: props.theme.colors.interactive.primary.base.bg,
    checkedText: props.theme.colors.interactive.primary.base.bg,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    textTransform: 'none',
    ...props.theme?.byComponent?.automotive_optionsGroup
  };
};
