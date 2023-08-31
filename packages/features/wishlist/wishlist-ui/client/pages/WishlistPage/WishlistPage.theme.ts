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
    backgroundGradient: props.theme.ui02,
    // Override with custom theme
    ...props.theme?.cart
  };
};
