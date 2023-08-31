/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  textColor: string;
  titleColor: string;
  textMarginBottom: string;
};

declare global {
  interface EXOComponentStyles {
    marketplace_ui_storeHeader?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    textColor: props.theme.colors.text.primary,
    titleColor: props.theme.colors.text.primary,
    textMarginBottom: 'unset',
    ...props.theme?.byComponent?.marketplace_ui_storeHeader
  };
};
