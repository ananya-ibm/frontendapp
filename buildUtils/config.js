/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const tar = require('tar-fs');
const crypto = require('crypto');
const stream = require('stream');
const rimraf = require('rimraf');

const configFiles = [
  'packages/apps/commerce/.env',
  'packages/apps/automotive/.env',
  'packages/apps/commerce-b2b/.env' 
]

const keys = (pwd) => ({ key: crypto.scryptSync(pwd, 'GfG', 32), iv: Buffer.alloc(16, 0), alg: 'aes-256-cbc' });

const resolve = (f) => `./.config/${f}`

const readMeta = (d) => JSON.parse(fs.readFileSync(resolve(`${d}/meta.json`)).toString());
const writeMeta = (d, j) => fs.writeFileSync(resolve(`${d}/meta.json`), JSON.stringify(j, undefined, '  '));

const printUsage = () => {
  console.log('Usage:');
  console.log();
  console.log('   node config.js list');
  console.log('   npm run config:list');
  console.log('       Lists all available configs');
  console.log();
  console.log('   node config.js save name');
  console.log('   npm run config:save name');
  console.log('       Save existing config as name');
  console.log('       Note existing config is overwritten');
  console.log();
  console.log('   node config.js load name');
  console.log('   npm run config:load name');
  console.log('       Load existing config named name');
  console.log('       Note that any local config changes are overwritten');
  console.log();
  console.log('   node config.js delete name');
  console.log('   npm run config:delete name');
  console.log('       Delete existing config named name');
  console.log();
  console.log('   node config.js import srcFile name [password]');
  console.log('   npm run config:import srcFile name [password]');
  console.log('       Import config in file srcFile, encrypted with password named name');
  console.log();
  console.log('   node config.js export name destFile [password]');
  console.log('   npm run config:export name destFile [password]');
  console.log('       Export config in named name, to file destFile encrypted with password');

  process.exit(1);
}

if (! fs.existsSync('./.config')) fs.mkdirSync('./.config');

if (process.argv.length <= 2) printUsage();

const command = process.argv[2];

if (command === 'list') {
  console.log(fs.readdirSync('./.config')
    .map(d => readMeta(d))
    .map(e => `${e.name}\n  created: ${e.saveDate}${e.exportDate ? `\n  exported: ${e.exportDate}\n  exported as: ${e.exportedAs}` : ''}`)
    .join('\n'));

} else if (command === 'delete') {
  if (process.argv.length <= 3) printUsage();
  const [,,,name] = process.argv;

  rimraf.sync(resolve(name));

} else if (command === 'save') {
  if (process.argv.length <= 3) printUsage();
  const [,,,name] = process.argv;

  if (fs.existsSync(resolve(name))) rimraf.sync(resolve(name));
  fs.mkdirSync(resolve(name));

  for (const f of configFiles) {
    fs.mkdirSync(resolve(`${name}/${path.dirname(f)}`), { recursive: true });
    fs.copyFileSync(f, resolve(`${name}/${f}`))
  }

  writeMeta(name, { saveDate: new Date().toISOString(), name });

} else if (command === 'load') {
  if (process.argv.length <= 3) printUsage();
  const [,,,name] = process.argv;

  for (const f of configFiles) {
    if (fs.existsSync(resolve(`${name}/${f}`))) {
      fs.copyFileSync(resolve(`${name}/${f}`), f)
    }
  }

} else if (command === 'export') {
  if (process.argv.length <= 4) printUsage();
  const [,,,name, destFile] = process.argv;

  writeMeta(name, { ...readMeta(name), exportDate: new Date().toISOString(), exportedAs: path.basename(destFile) });

  let encrypt = new stream.PassThrough();
  if (process.argv.length > 5) {
    const { key, iv, alg } = keys(process.argv[5]);
    encrypt = crypto.createCipheriv(alg, key, iv);
  }
  tar.pack(resolve(name)).pipe(encrypt).pipe(fs.createWriteStream(`./${destFile}`))

} else if (command === 'import') {
  if (process.argv.length <= 4) printUsage();
  const [,,,srcFile, name] = process.argv;
  
  let decrypt = new stream.PassThrough();
  if (process.argv.length > 5) {
    const { key, iv, alg } = keys(process.argv[5]);
    decrypt = crypto.createDecipheriv(alg, key, iv);
  }
  const s = fs.createReadStream(srcFile).pipe(decrypt).pipe(tar.extract(resolve(name)))
  s.on('finish', () => writeMeta(name, { ...readMeta(name), saveDate: new Date().toISOString(), name }));

}
