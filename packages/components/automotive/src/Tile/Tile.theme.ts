/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  color: string;
  hoverShadow: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_tile?: Props;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    color: '#767676',
    hoverShadow: 'rgba(0,0,0,0.1)',

    ...props.theme?.byComponent?.automotive_tile
  };
};
