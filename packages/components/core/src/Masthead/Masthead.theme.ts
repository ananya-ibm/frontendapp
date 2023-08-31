/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as CSS from 'csstype';
import merge from 'lodash/merge';

type Props = {
  border: CSS.Property.Border;
  borderWidth: CSS.Property.BorderWidth;
  boxShadow: CSS.Property.BoxShadow;
};

declare global {
  interface EXOComponentStyles {
    core_masthead?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return merge(
    {
      border: 'none',
      borderWidth: '0',
      boxShadow: 'none'
    },
    props.theme?.byComponent?.core_masthead
  );
};
