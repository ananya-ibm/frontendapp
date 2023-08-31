/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { font } from '@exo/frontend-common-style-utils';
import * as CSS from 'csstype';

type Props = {
  background: string;
  priceFont: string;
  priceColor: string;
  textColor: string;
  textMarginBottom: string;
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
  title__font: CSS.Property.Font;
  title__letterSpacing: CSS.Property.LetterSpacing;
  boxShadow: CSS.Property.BoxShadow;
  media__background: CSS.Property.Background;
  media__aspectRatio: CSS.Property.AspectRatio;
};

declare global {
  interface EXOComponentStyles {
    commerce_productCard?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    media__aspectRatio: '2 / 3',
    // Content spacing is applied to the Main content, and controls space between header, main, and footer content
    title__font: font(props.theme.typography.body.short.M),
    title__letterSpacing: props.theme.typography.body.short.M.letterSpacing?.toString() ?? 'inherit',
    boxShadow: 'none',
    priceFont: 'inherit',
    priceColor: props.theme.colors.text.secondary,
    textColor: props.theme.colors.text.primary,
    textMarginBottom: 'unset',
    iconColor: props.theme.colors.icon.primary,
    iconBackground: props.theme.colors.brand.brand1.base,
    iconWidth: props.theme.spacing.inline.s5,
    iconHeight: '1.25rem;',
    background: 'inherit',

    availabilityMargin: `${props.theme.spacing.stack.s5} 0 0 0`,
    availabilityStatusColorUnknown: props.theme.colors.text.primary,
    availabilityStatusIndicatorUnknown: '?',
    availabilityStatusColorUnavailable: props.theme.colors.information.error,
    availabilityStatusIndicatorUnavailable: '⨯',
    availabilityStatusColorAvailable: props.theme.colors.information.success,
    availabilityStatusIndicatorAvailable: '●',
    availabilityStatusColorLow: props.theme.colors.information.warning,
    availabilityStatusIndicatorLow: '●',

    media__background: 'inherit',

    ...props.theme?.byComponent?.commerce_productCard
  };
};
