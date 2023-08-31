/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  deleteColor: string;
  infoColor: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_account_ui_documents?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    deleteColor: props.theme.colors.information.error,
    infoColor: props.theme.colors.brand.brand1.base,

    ...props.theme?.byComponent?.automotive_account_ui_documents
  };
};
