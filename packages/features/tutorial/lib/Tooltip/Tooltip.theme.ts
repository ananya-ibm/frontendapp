/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export default props => {
  return {
    buttonsMargin: props.theme.spacing.inline.s5,
    buttonMaxHeight: props.theme.spacing.stack.s7,
    buttonColor: props.theme.colors.interactive.primary.base.bg,
    background: props.theme.colors.backgrounds.page,
    borderRadius: '0.3rem',
    color: props.theme.text01,
    padding: props.theme.spacing.inset.L,
    titleColor: props.theme.interactive02,

    // Override with custom theme
    ...props.theme?.tutorial?.tooltip
  };
};
