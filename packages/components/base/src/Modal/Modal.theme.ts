/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  overlay: string;
  background: string;
  formElementBackground: string;
  titleFont: string | undefined;
};

declare global {
  interface EXOComponentStyles {
    base_modal?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    overlay: props.theme.colors.backgrounds.overlay,
    background: props.theme.colors.backgrounds.panels.primary.base,
    formElementBackground: props.theme.colors.form.field.onPanel.bg,
    titleFont: undefined, 

    ...props.theme?.byComponent?.base_modal
  };
};
