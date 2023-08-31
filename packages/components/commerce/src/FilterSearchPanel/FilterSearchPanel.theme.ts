/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  backgroundColor: string;
  titleColor: string;
  titleTextTransform: string;
  titleFontSize: string;
  borderRadius: string;
};

declare global {
  interface EXOComponentStyles {
    commerce_filterSearchPanel?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    backgroundColor: props.theme.colors.backgrounds.panels.secondary.base,
    titleColor: props.theme.colors.brand.brand1.base,
    titleTextTransform: 'uppercase',
    titleFontSize: '1.5rem',
    borderRadius: '1.5rem',
    // Override with custom theme
    ...props.theme?.byComponent?.commerce_filterSearchPanel
  };
};
