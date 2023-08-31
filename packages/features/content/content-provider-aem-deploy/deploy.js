#!/usr/bin/env node

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

function exitWithError(message) {
  console.log(`ERROR: ${message}`);
  process.exit(1);
}

const btoa = b => Buffer.from(b).toString('base64');

const apiHost = process.env.AEM_HOST;
if (!apiHost) exitWithError('env variable AEM_HOST not defined');

const user = process.env.AEM_USERNAME;
if (!apiHost) exitWithError('env variable AEM_USERNAME not defined');

const password = process.env.AEM_PASSWORD;
if (!apiHost) exitWithError('env variable AEM_PASSWORD not defined');

if (!process.env.AEM_APP) exitWithError('env variable AEM_APP not defined');
const name = `${process.env.AEM_APP}.clientlibs`;

if (process.argv.length <= 2) exitWithError('file not provided');

const filename = fs.readdirSync(process.argv[2]).find(f => f.endsWith('.zip'));

if (!filename) exitWithError(`cannot find .zip in ${process.argv[2]}`);

const file = path.join(process.argv[2], filename);

const formData = new FormData();
formData.append('file', fs.createReadStream(file), {
  filename,
  contentType: 'application/octet-stream'
});
formData.append('name', name);
formData.append('force', 'true');
formData.append('install', 'true');

fetch(`${apiHost}/crx/packmgr/service.jsp`, {
  method: 'POST',
  headers: {
    Authorization: `Basic ${btoa(`${user}:${password}`)}`
  },
  body: formData
})
  .then(res => {
    return res.text();
  })
  .then(r => {
    console.log(r);
  })
  .catch(e => {
    console.error(e);
  });
