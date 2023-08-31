/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as CSS from 'csstype';

type Props = {
  border: CSS.Property.Border;
};

declare global {
  interface EXOComponentStyles {
    devops_ui_templates?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    border: `0.1rem solid ${props.theme.colors.delimiters.lowContrast}`,

    ...props.theme?.byComponent?.devops_ui_templates
  };
};
