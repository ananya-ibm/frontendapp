/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Router } from 'express';
import { Theme } from '@exo/frontend-common-theme-proxy';
import crypto from 'crypto';
import { renderPageOnServer } from '../services/render.service';

const pageRouter = (statsFile, config) => {
  const router = Router();

  const stylesHash = crypto
    .createHash('md5')
    .update(Theme.globalStyles?.cssRules ?? '')
    .digest('hex');

  router.get(`/carbon_${stylesHash}.css`, (req, res) => {
    res.header('Content-Type', 'text/css');
    res.set('Cache-Control', 'public, max-age=31557600, s-maxage=31557600');

    res.send(Theme.globalStyles?.cssRules ?? '');
  });
  router.get('/', (req, res) => {
    renderPageOnServer(req.url, statsFile, config, req, res, stylesHash, req.query, null);
  });
  router.get('*', (req, res) => {
    renderPageOnServer(req.url, statsFile, config, req, res, stylesHash, req.query, null);
  });

  return router;
};

export default pageRouter;
