/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  border: string;
};

declare global {
  interface EXOComponentStyles {
    account_profile_ui_preferences?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    border: 'none',

    // Override with custom theme
    ...props.theme.byComponent?.account_profile_ui_preferences
  };
};
