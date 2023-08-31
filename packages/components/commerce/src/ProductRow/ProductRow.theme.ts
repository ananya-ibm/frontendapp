/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  boxShadow: string;
  boxShadowHover: string;
  borderRadius: string;
  contentBorder: string;
  priceFont: string;
  priceColor: string;
  bodySpacing: string;
  transition: string;
  textColor: string;
  textMarginBottom: string;
  imgMaxHeight: string;
  imgMaxWidth: string;
  iconColor: string;
  iconBackground: string;
  iconWidth: string;
  iconHeight: string;

  availabilityMargin: string;
  availabilityStatusColorUnknown: string;
  availabilityStatusIndicatorUnknown: string;
  availabilityStatusColorUnavailable: string;
  availabilityStatusIndicatorUnavailable: string;
  availabilityStatusColorAvailable: string;
  availabilityStatusIndicatorAvailable: string;
  availabilityStatusColorLow: string;
  availabilityStatusIndicatorLow: string;
};

declare global {
  interface EXOComponentStyles {
    commerce_productRow?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Content spacing is applied to the Main content, and controls space between header, main, and footer content
    boxShadow: `0.0625rem 0.0625rem 0 ${props.theme.colors.delimiters.primary}, -0.0625rem -0.0625rem 0 ${props.theme.colors.delimiters.primary}`,
    boxShadowHover: `0.0625rem 0.0625rem 0 ${props.theme.colors.interactive.primary.hover.bg}, -0.0625rem -0.0625rem 0 ${props.theme.colors.interactive.primary.hover.bg}`,
    borderRadius: '0.3rem',
    contentBorder: `solid 0.0625rem ${props.theme.colors.delimiters.primary}`,
    priceFont: 'inherit',
    priceColor: props.theme.colors.text.primary,
    bodySpacing: '.5rem 0 0',
    transition: 'box-shadow 100ms ease-in-out',
    textColor: props.theme.colors.text.primary,
    textMarginBottom: 'unset',
    imgMaxHeight: '5rem',
    imgMaxWidth: 'unset',
    iconColor: props.theme.colors.icon.primary,
    iconBackground: props.theme.colors.brand.brand1.base,
    iconWidth: props.theme.spacing.inline.s5,
    iconHeight: '1.25rem;',

    availabilityMargin: `${props.theme.spacing.stack.s5} 0 0 0`,
    availabilityStatusColorUnknown: props.theme.colors.text.primary,
    availabilityStatusIndicatorUnknown: '?',
    availabilityStatusColorUnavailable: props.theme.colors.information.error,
    availabilityStatusIndicatorUnavailable: '⨯',
    availabilityStatusColorAvailable: props.theme.colors.information.success,
    availabilityStatusIndicatorAvailable: '●',
    availabilityStatusColorLow: props.theme.colors.information.warning,
    availabilityStatusIndicatorLow: '●',

    ...props.theme?.byComponent?.commerce_productRow
  };
};
