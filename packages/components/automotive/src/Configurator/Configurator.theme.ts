/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  navBg: string;
  bg: string;
  link: string;
  text: string;
  linkActive: string;
  buttonOutline: string;
};

declare global {
  interface EXOComponentStyles {
    automotive_configurator?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    // Default theme
    navBg: 'rgba(255, 255, 255, 0.85)',
    bg: '#fff',
    link: '#161616',
    text: '#161616',
    linkActive: '#0062FF',
    buttonOutline: '#767676',

    ...props.theme?.byComponent?.automotive_configurator
  };
};
