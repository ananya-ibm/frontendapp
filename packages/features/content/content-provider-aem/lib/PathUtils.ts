/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const getAemAssetPathFromURL = (url: string, aemRoot: string): string => {
  // Identify AEM editor URLs
  if (url.endsWith('.html') && (url.startsWith(aemRoot) || url.startsWith('/conf'))) {
    return url.substring(0, url.length - '.html'.length);
  } else {
    return `${aemRoot}${url}`;
  }
};
