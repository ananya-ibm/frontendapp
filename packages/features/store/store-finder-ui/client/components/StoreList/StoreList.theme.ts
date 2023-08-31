/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  easing: string;
};

declare global {
  interface EXOComponentStyles {
    storeFinder_ui_storeList?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    // Override with custom theme
    ...props.theme?.byComponent?.storeFinder_ui_storeList
  };
};
