/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const createFullPageHtml = (appHtml, appBundles, appStyles, css, helmet) =>
  `<!DOCTYPE html>
    <html lang="en">
    <head>
      ${helmet.title.toString()}
      ${helmet.meta.toString()}
      ${helmet.link.toString()}
      ${appStyles}
      <style>${css}</style>
      <link rel="preconnect" href="${process.env.GRAPHQL_ENDPOINT}">
    </head>
    <body>
      ${
        !process.env.GTMID
          ? ''
          : `<!-- Google Tag Manager (noscript) -->
        <noscript
          ><iframe
            src="https://www.googletagmanager.com/ns.html?id=${process.env.GTMID}"
            height="0"
            width="0"
            style="display:none;visibility:hidden"
          ></iframe
        ></noscript>
        <!-- End Google Tag Manager (noscript) -->`
      }
        <div id="root">${appHtml}</div>
      ${appBundles}
    </body>
  </html>`;

export default createFullPageHtml;
