/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  titleFontSize: string;
  titleFontFamily: string;
  textFontSize: string;
  textFontFamily: string;
  layoutSpacing: string;
  paragraphSpacing: string;
  maxWidth: string;
  padding: string;
  highlightTextColor: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_automotiveCartSummary?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    titleFontSize: props.theme.typography.heading.heading4.size?.toString(),
    titleFontFamily: props.theme.typography.heading.heading4.family,
    textFontSize: props.theme.typography.body.short.M.size?.toString(),
    textFontFamily: props.theme.typography.body.short.M.family,
    layoutSpacing: props.theme.spacing.stack.s7,
    paragraphSpacing: props.theme.spacing.stack.sM,
    maxWidth: '74rem',
    padding: props.theme.spacing.stack.lL,
    highlightTextColor: props.theme.colors.brand.brand1.base,

    ...props.theme?.byComponent?.automotive_automotiveCartSummary
  };
};
