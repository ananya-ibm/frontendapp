/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  linkColor: string;
  backgroundColor: string;
  top: string;
};

declare global {
  interface EXOComponentStyles {
    core_megaMenu?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    linkColor: props.theme.colors.text.primary,
    backgroundColor: '#f3f3f3',
    top: '6rem',
    // Override with custom theme
    ...props.theme?.byComponent?.core_megaMenu
  };
};
