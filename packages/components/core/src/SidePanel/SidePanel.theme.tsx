/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  padding: string;
  buttonHeight: string;
  top: string;
  bottom: string;
  zIndex: string;
  boxShadow: string;
};

declare global {
  interface EXOComponentStyles {
    core_sidePanel?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    padding: props.theme.spacing.inset.XL,
    buttonHeight: '4rem',

    //  0 0 1rem rgba(0, 0, 0, 0.3);
    boxShadow: 'none',
    top: '0',
    bottom: '0',
    zIndex: '16',

    // Override with custom theme
    ...props.theme?.byComponent.core_sidePanel
  };
};
