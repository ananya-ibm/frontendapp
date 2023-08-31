/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
};

declare global {
  interface EXOComponentStyles {
    core_overlay?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.overlay,
    // Override with custom theme - this also defines the key under which
    // the theme can be overridden, in this case .automotive.categoryCard
    // in general should follow the format .<domain>.<componentName>
    ...props.theme?.byComponent?.core_overlay
  };
};
