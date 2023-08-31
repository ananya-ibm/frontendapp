/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  activeBackground: string;
  activeText: string;
  color: string;
  fontFamily: string;
  headerBackground: string;
  headerColor: string;
  headerColorHover: string;
  hoverColor: string;
  linkFontSize: string;
  menuBgColor: string;
  menuFontSize: string;
};

declare global {
  interface EXOComponentStyles {
    core_menu?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    activeBackground: 'transparent',
    activeText: props.theme.colors.link.hover,
    color: props.theme.colors.text.primary,
    fontFamily: props.theme.typography.body.short.M.family,
    headerBackground: props.theme.colors.backgrounds.panels.primary.base,
    headerColor: props.theme.colors.text.secondary,
    headerColorHover: props.theme.colors.link.hover,
    hoverColor: props.theme.colors.link.hover,
    linkFontSize: props.theme.typography.body.short.M.size?.toString(),
    menuBgColor: props.theme.colors.backgrounds.page,
    menuFontSize: props.theme.typography.body.short.M.size?.toString(),

    // Custom componen theme
    ...props.theme?.byComponent?.core_menu
  };
};
