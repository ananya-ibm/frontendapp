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
    b2b_quick_order_ui_quick_order_button?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    color: 'white',

    ...props.theme?.byComponent?.b2b_quick_order_ui_quick_order_button
  };
};
