/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const { CMS_URL } = process.env;

const createFullPageHtml = (appHtml, appBundles, appStyles, css, helmet) =>
  `<!DOCTYPE html>
    <html lang="en">
    <head>
      ${CMS_URL && CMS_URL !== 'undefined' ? `<script src="${CMS_URL}" async></script>` : ''}
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${appStyles}
      <style>${css}</style>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      ${appBundles}
    </body>
  </html>`;

export default createFullPageHtml;
