/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const useSsr = () => {
  const hasWindow = typeof window !== 'undefined';

  return {
    isBrowser: hasWindow,
    isServer: !hasWindow
  };
}
