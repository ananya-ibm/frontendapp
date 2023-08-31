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
      ${
        !process.env.GTMID
          ? ''
          : `<!-- Google Tag Manager -->
          <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${process.env.GTMID}');</script>
          <!-- End Google Tag Manager --> `
      }      
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
