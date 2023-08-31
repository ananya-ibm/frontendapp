/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

type Props = {
  pageBgColor: string;
  contentBgColor: string;
  contentPadding: string;
};

declare global {
  interface EXOComponentStyles {
    chrome_ui_chrome?: Partial<Props>;
  }
}

export default (props: EXOThemeProps): Props => {
  return {
    pageBgColor: 'unset',
    contentBgColor: props.theme.colors.backgrounds.page,
    // Content spacing is applied to the Main content, and controls space between header, main, and footer content
    contentPadding: '0',

    ...props.theme?.byComponent?.chrome_ui_chrome
  };
};
