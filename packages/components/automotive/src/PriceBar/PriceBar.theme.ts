/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  text: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_priceBar?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    text: '	#000000',

    ...props.theme?.byComponent?.automotive_priceBar
  };
};
