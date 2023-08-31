/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  color: string;
};

declare global {
  interface EXOComponentStyles {
    extra_profile_link?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    color: props.theme.colors.inverse.base.fg,
    // Override with custom theme
    ...props.theme?.byComponent?.extra_profile_link
  };
};
