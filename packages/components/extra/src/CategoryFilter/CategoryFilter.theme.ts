/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  backgroundColor: string;
  borderBottom: string;
  categoryBackground: string;
  fontSize: string;
  padding: string;
};

declare global {
  interface EXOComponentStyles {
    extra_categoryFilter?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    backgroundColor: props.theme.colors.backgrounds.panels.primary.base,
    borderBottom: props.theme.colors.backgrounds.panels.primary.hover,
    categoryBackground: props.theme.colors.backgrounds.panels.primary.selected,
    fontSize: '.875rem',
    padding: props.theme.spacing.inline.s5,

    // Override with custom theme
    ...props.theme?.byComponent?.extra_categoryFilter
  };
};
