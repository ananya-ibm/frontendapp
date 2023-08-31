/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  bodyMargin: string;
};

declare global {
  interface EXOComponentStyles {
    forms_fieldPanelGroupStepByStep?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    bodyMargin: '2rem 0 0 0',

    // Override with custom theme
    ...props.theme?.byComponent?.forms_fieldPanelGroupStepByStep
  };
};
