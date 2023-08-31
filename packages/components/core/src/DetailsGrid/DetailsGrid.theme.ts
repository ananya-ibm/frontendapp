/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  titleColor: string;
  detailColor: string;
};

declare global {
  interface EXOComponentStyles {
    core_detailsGrid?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    titleColor: props.theme.colors.text.primary,
    detailColor: props.theme.colors.brand.brand1.base,

    ...props.theme?.byComponent?.core_detailsGrid
  };
};
