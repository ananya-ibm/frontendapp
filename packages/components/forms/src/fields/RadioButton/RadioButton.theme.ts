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
};

declare global {
  interface EXOComponentStyles {
    forms_radioButton?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    additionalInfoSize: '12px',
    additionalInfoLineHeight: '16px',
    additionalInfoMarginTop: '4px',

    // Override with custom theme
    ...props.theme?.byComponent?.forms_radioButton
  };
};
