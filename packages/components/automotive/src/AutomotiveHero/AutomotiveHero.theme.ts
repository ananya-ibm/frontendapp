/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  buttonColor: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_automotiveHero?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    buttonColor: props.theme.colors.interactive.primary.base.bg,

    ...props.theme?.byComponent?.automotive_automotiveHero
  };
};
