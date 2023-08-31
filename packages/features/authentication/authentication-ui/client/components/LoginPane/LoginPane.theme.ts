/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  border: string;
  marginLarge: string;
  marginSmall: string;
  marginXtraLarge: string;
  backgroundColor: string;
  errorColor: string;
  marginRight: string;
  paddingLeft: string;
};

declare global {
  interface EXOComponentStyles {
    authentication_ui_loginPane?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    border: props.theme.colors.interactive.primary.base.bg,
    marginLarge: props.theme.spacing.stack.s6,
    marginSmall: props.theme.spacing.stack.s4,
    marginXtraLarge: '3.8rem',
    backgroundColor: props.theme.colors.backgrounds.panels.primary.base,
    errorColor: props.theme.colors.information.error,
    marginRight: props.theme.spacing.inline.s6,
    paddingLeft: props.theme.spacing.inline.s7,

    ...props.theme.byComponent?.authentication_ui_loginPane
  };
};
