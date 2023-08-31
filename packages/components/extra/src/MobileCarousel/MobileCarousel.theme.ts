/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  buttonSize: string;
  dotActiveColor: string;
  dotColor: string;
  progressPadding: string;
};

declare global {
  interface EXOComponentStyles {
    extra_mobileCarousel?: Props;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    buttonSize: '1.25rem',
    dotActiveColor: props.theme.colors.brand.brand1.base,
    dotColor: props.theme.colors.delimiters.highContrast,
    progressPadding: props.theme.spacing.inline.s3,

    ...props.theme?.byComponent?.extra_mobileCarousel
  };
};
