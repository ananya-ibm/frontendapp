/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const templateFilesCommerce = [
  '../packages/apps/commerce/applications.ts',
  '../packages/apps/commerce/client/AppWrapper.tsx',
  '../packages/apps/commerce/babel.config.js',
  '../packages/apps/commerce/webpack.config.js',
  '../packages/apps/commerce/.dockerignore',
  '../packages/apps/commerce/.env.example',
  '../packages/apps/commerce/robots.txt',
  '../packages/apps/commerce/manifest.json',
  '../packages/apps/commerce/client/App.js',
  '../packages/apps/commerce/client/index.js',
  '../packages/apps/commerce/client/document.js',
  '../packages/apps/commerce/client/index.ejs',
  '../packages/apps/commerce/client/Routes.js',
  '../packages/apps/commerce/server/csr.js',
  '../packages/apps/commerce/server/ssr.js',
  '../packages/apps/commerce/example-config/demo.env.example',
  '../packages/apps/commerce/example-config/Dockerfile.demo',
  '../packages/apps/commerce/client/static/favicon.ico',
  '../packages/apps/commerce/client/static/robots.txt',
  '../packages/apps/commerce/client/static/images/homepage/a-spot.jpg',
  '../packages/apps/commerce/client/static/images/homepage/hero-1.jpg'
];

const templateFilesSample = [
  '../packages/apps/sample/applications.ts',
  '../packages/apps/sample/client/AppWrapper.tsx',
  '../packages/apps/sample/babel.config.js',
  '../packages/apps/sample/babel.config.js',
  '../packages/apps/sample/webpack.config.js',
  '../packages/apps/sample/.dockerignore',
  '../packages/apps/sample/.env.example',
  '../packages/apps/sample/robots.txt',
  '../packages/apps/sample/manifest.json',
  '../packages/apps/sample/client/App.js',
  '../packages/apps/sample/client/index.js',
  '../packages/apps/sample/client/document.js',
  '../packages/apps/sample/client/index.ejs',
  '../packages/apps/sample/client/Routes.js',
  '../packages/apps/sample/server/csr.js',
  '../packages/apps/sample/server/ssr.js',
  '../packages/apps/sample/client/static/favicon.ico',
  '../packages/apps/sample/client/static/robots.txt',
  '../packages/apps/sample/client/static/images/homepage/a-spot.jpg',
  '../packages/apps/sample/client/static/images/homepage/hero-1.jpg'
];

module.exports = {
  description: 'Add an app',
  prompts: [
    {
      type: 'confirm',
      name: 'isClientSpecific',
      message: 'Is this a client-specific app?',
      default: true
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should your app be called?',
      default: 'demo-app'
    },
    {
      type: 'confirm',
      name: 'isCommerceApp',
      message: 'Will your app have commerce functionality? i.e. does it have products, orders or an account area?',
      default: false
    }
  ],
  actions: data => {
    const pathToApps = data.isClientSpecific ? '../client-packages/apps' : `../packages/apps`;
    const appType = data.isCommerceApp ? 'commerce' : 'sample';

    const actions = [
      {
        type: 'addMany',
        destination: `${pathToApps}/${data.name}`,
        base: `../packages/apps/${appType}`,
        templateFiles: data.isCommerceApp ? templateFilesCommerce : templateFilesSample
      },
      {
        type: 'add',
        path: `${pathToApps}/${data.name}/package.json`,
        templateFile: data.isCommerceApp ? './app/commerce/package.hbs' : './app/basic/package.hbs',
        abortOnFail: true
      },

      {
        type: 'add',
        path: `${pathToApps}/${data.name}/README.md`,
        templateFile: './app/common/README.hbs',
        abortOnFail: true
      },

      ...(data.isCommerceApp ? [
        {
          type: 'modify',
          path: `${pathToApps}/${data.name}/example-config/Dockerfile.demo`,
          pattern: /app:csr/g,
          template: 'app:{{ name }}'
        }  
      ] : []),
      
      {
        type: 'modify',
        path: `${pathToApps}/${data.name}/.env.example`,
        pattern: /GRAPHQL_ENDPOINT=.*/g,
        template: 'GRAPHQL_ENDPOINT=http://localhost:4002/graphql'
      },

      { type: 'bootstrap' },

      'The app generation is now complete. Please add your commands to the root package.json file, run the required install and bootstrap commands, and double check your new Dockerfile'
    ];

    return actions;
  }
};
