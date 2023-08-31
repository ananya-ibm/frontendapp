/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  maxWidth: string;
  backgroundColor: string;
  marginLarge: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_acknowledgeModal?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    maxWidth: '43rem',
    backgroundColor: props.theme.colors.backgrounds.overlay,
    marginLarge: props.theme.spacing.inline.s5,

    // Override with custom theme
    ...props.theme?.byComponent?.automotive_acknowledgeModal
  };
};
