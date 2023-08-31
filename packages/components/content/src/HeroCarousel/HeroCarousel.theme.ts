/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
  contentBg: string;
  contentColor: string;
  dotColor1: string;
  dotColor2: string;
  dotColorActive: string;
};

declare global {
  interface EXOComponentStyles {
    core_heroCarousel?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.panels.secondary.base,
    contentBg: props.theme.colors.inverse.base.bg,
    contentColor: props.theme.colors.inverse.base.fg,
    dotColor1: props.theme.colors.backgrounds.panels.secondary.base,
    dotColor2: props.theme.colors.delimiters.highContrast,
    dotColorActive: props.theme.colors.brand.brand1.base,
    // Override with custom theme
    ...props.theme?.byComponent?.core_heroCarousel
  };
};
