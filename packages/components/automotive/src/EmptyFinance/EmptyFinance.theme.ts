/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export default props => {
  return {
    // Default theme
    background: props.theme.colors.backgrounds.panels.secondary.base,
    tilePadding: props.theme.spacing.stack.s7,
    layoutSpacing: props.theme.spacing.stack.s6,
    titleFontSize: `${props.theme.typography.heading.heading3.size}/${props.theme.typography.heading.heading3.lineHeight}`,
    fontFamily: props.theme.typography.heading.heading3.family,
    textFontSize: '0.875rem/.875rem',

    // Override with custom theme - this also defines the key under which
    // the theme can be overridden, in this case .automotive.configurationSummary
    // in general should follow the format .<domain>.<componentName>
    ...props.theme?.byComponent?.automotive_emptyFinance,
    ...props.theme?.automotive?.emptyFinance
  };
};
