/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import ssr from '@exo/frontend-common-server/server/ssr';
import App from '../client/App';
import createFullPageHtml from '../client/document';

ssr({
  app: App,
  pageTemplate: createFullPageHtml,
  port: 3000
});
