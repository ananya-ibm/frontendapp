/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

module.exports = {
  // default working directory (can be changed per 'cwd' in every asset option)
  context: __dirname,

  // path to the clientlib root folder (output)
  clientLibRoot: './dist',

  libs: {
    name: 'react-app',
    allowProxy: true,
    categories: ['carbon-commerce-ssr.react'],
    serializationFormat: 'xml',
    jsProcessor: ['min:gcc'],
    dependencies: ['carbon-commerce-ssr.grid'],
    assets: {
      js: ['dist/**/*.js'],
      css: ['dist/**/*.css']
    }
  }
};
