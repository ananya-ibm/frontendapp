/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
  primaryColor: string;
  hoverShadow: string;
};

declare global {
  interface EXOComponentStyles {
    core_categoryCard?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    background: props.theme.colors.backgrounds.panels.secondary.base,
    primaryColor: props.theme.colors.brand.brand1.base,
    hoverShadow: 'rgba(0,0,0,0.1)',

    ...props.theme?.byComponent?.core_categoryCard
  };
};
