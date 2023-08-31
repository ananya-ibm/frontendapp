/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
  contentColor: string;
  headingFont: string;
  linkColor: string;
  linkFont: string;
  termsFont: string;
};

declare global {
  interface EXOComponentStyles {
    core_footer?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.panels.primary.base,
    contentColor: props.theme.colors.text.secondary,
    headingFont: `600 ${props.theme.typography.body.short.M.size} ${props.theme.typography.body.short.M.family}`,
    linkColor: props.theme.colors.text.secondary,
    linkFont: `400 ${props.theme.typography.body.short.M.size} ${props.theme.typography.body.short.M.family}`,
    termsFont: `400 ${props.theme.typography.body.short.S.size} ${props.theme.typography.body.short.M.family}`,

    ...props.theme?.byComponent?.core_footer
  };
};
