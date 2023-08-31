/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  titlePadding: string;
  rowPadding: string;
  rowItemMargin: string;
};

declare global {
  interface EXOComponentStyles {
    forms_fieldArray?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    titlePadding: '0.75rem',
    rowPadding: '1rem 0.75rem',
    rowItemMargin: '1em',

    // Override with custom theme
    ...props.theme?.byComponent?.forms_fieldArray
  };
};
