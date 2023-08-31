/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  smallSpacing: string;
  marginSmall: string;
  padding: string;
  borderTop: string;
  borderRadius: string;
  borderColor: string;
  uiBackground: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_account_ui_accountOverviewConfiguration?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    smallSpacing: props.theme.spacing.inline.s5,
    marginSmall: props.theme.spacing.inline.s5,
    padding: '1.25rem',
    borderTop: props.theme.colors.information.information,
    borderRadius: props.theme.spacing.inline.s2,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    uiBackground: 'none',

    ...props.theme?.byComponent?.automotive_account_ui_accountOverviewConfiguration
  };
};
