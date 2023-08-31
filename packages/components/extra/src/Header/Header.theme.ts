/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  borderTop: string;
  boxShadow: string;
  background: string;
  backgroundHover: string;
  logoColor: string;
  logoHeight: string;
  logoWidth: string;
  iconColor: string;
};

declare global {
  interface EXOComponentStyles {
    extra_header?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default Theme...
    borderTop: '0 none',
    boxShadow: '0 0 0',
    background: props.theme.colors.backgrounds.panels.primary.base,
    backgroundHover: props.theme.colors.backgrounds.panels.primary.hover,
    logoColor: 'inherit',
    logoHeight: '2rem',
    logoWidth: '3rem',
    iconColor: '#000000',

    // Override with custom theme
    ...props.theme?.byComponent?.extra_header
  };
};
