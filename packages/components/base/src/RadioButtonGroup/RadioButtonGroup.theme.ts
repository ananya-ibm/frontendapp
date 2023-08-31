/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  additionalInfoSize: string;
  additionalInfoLineHeight: string;
  additionalInfoMarginTop: string;
  errorBorder: string;
};

declare global {
  interface EXOComponentStyles {
    base_radioButtonGroup?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    additionalInfoSize: '12px',
    additionalInfoLineHeight: '16px',
    additionalInfoMarginTop: '4px',
    errorBorder: `2px solid ${props.theme.colors.information.error}`,

    // Override with custom theme
    ...props.theme?.byComponent?.base_radioButtonGroup
  };
};
