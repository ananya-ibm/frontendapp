/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  slashColor: string;
};

declare global {
  interface EXOComponentStyles {
    base_breadcrumb?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    slashColor: props.theme.colors.delimiters.highContrast,

    // Override with custom theme - this also defines the key under which
    // the theme can be overridden, in this case .automotive.configurationSummary
    // in general should follow the format .<domain>.<componentName>
    ...props.theme?.byComponent?.base_button
  };
};
