/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export default props => {
  return {
    backgroundColor: props.theme.colors.backgrounds.page,
    borderColor: props.theme.colors.backgrounds.panels.primary.base,
    color: props.theme.colors.text.primary,
    titleColor: props.theme.colors.link.base,
    titleTextTransform: 'uppercase',
    // Override with custom theme
    ...props.theme?.core?.searchPanel,
    ...props.theme?.byComponent?.advanced_search_searchPanel
  };
};
