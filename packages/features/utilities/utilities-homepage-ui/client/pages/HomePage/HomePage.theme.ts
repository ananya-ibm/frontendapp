/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  backgroundColor: string;
  borderTop: string;
  borderLeft: string;
  borderRight: string;
  borderBottom: string;
  borderRadius: string;
};

declare global {
  interface EXOComponentStyles {
    //   automotive_automotiveCartSummary?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    backgroundColor: props.theme.colors.backgrounds.panels.primary.base,
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderBottom: 'none',
    borderRadius: '0'
    //   ...props.theme?.byComponent?.automotive_automotiveCartSummary
  };
};
