/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  background: string;
  tilePadding: string;
  tabSpacing: string;
  tabUnderlineActive: string;
  tabUnderlineInactive: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_financeSelector?: Props;
  }
}

export default (props: EXOThemeProps): Props => {3
  return {
    background: props.theme.colors.backgrounds.panels.secondary.base,
    tilePadding: props.theme.spacing.stack.s7,
    tabSpacing: `${props.theme.spacing.stack.s4} 1.75rem`,
    tabUnderlineActive: `inset 0 -${props.theme.spacing.stack.s1} ${props.theme.colors.brand.brand1.base}`,
    tabUnderlineInactive: `inset 0 -${props.theme.spacing.stack.s1} #d6d6d6`,

    ...props.theme?.byComponent?.automotive_financeSelector
  };
};
