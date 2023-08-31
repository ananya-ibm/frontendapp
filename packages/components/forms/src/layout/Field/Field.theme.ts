/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  margin: string;
};

declare global {
  interface EXOComponentStyles {
    forms_field?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    margin: props.theme.spacing.stack.s6,

    // Override with custom theme
    ...props.theme?.byComponent?.forms_field
  };
};
