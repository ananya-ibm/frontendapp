/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  infoAlignment: string;
  textMarginBottom: string;
};

declare global {
  interface EXOComponentStyles {
    commerce_productItemCarousel?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    infoAlignment: 'center',
    textMarginBottom: props.theme.spacing.stack.s3,

    ...props.theme?.byComponent?.commerce_productItemCarousel
  };
};
