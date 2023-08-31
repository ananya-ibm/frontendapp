/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as CSS from 'csstype';

type Props = {
  fontWeight: CSS.Property.FontWeight;
};

declare global {
  interface EXOComponentStyles {
    base_react_aria_button?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    fontWeight: 'bold',

    ...props.theme?.byComponent?.base_react_aria_button
  };
};
