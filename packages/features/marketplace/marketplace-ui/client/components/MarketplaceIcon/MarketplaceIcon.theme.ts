/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  iconColor: string;
};

declare global {
  interface EXOComponentStyles {
    marketplace_ui_marketplaceIcon?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Content spacing is applied to the Main content, and controls space between header, main, and footer content
    iconColor: props.theme.colors.icon.primary,

    ...props.theme?.byComponent?.marketplace_ui_marketplaceIcon
  };
};
