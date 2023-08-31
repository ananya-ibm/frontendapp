/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return, no-plusplus */

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

function logWarn(s) {
  const colorFG = '\u001b[33;1m';
  const resetFG = '\u001b[39m';
  console.log(`${colorFG}WARNING:${resetFG} ${s}`);
}

function logError(s) {
  const colorFG = '\u001b[37m\u001b[41;1m';
  const resetFG = '\u001b[39m\u001b[0m';
  console.log(`${colorFG}ERROR:${resetFG} ${s}`);
}

function logInfo(s) {
  const colorFG = '\u001b[34m';
  const resetFG = '\u001b[39m';
  console.log(`${colorFG}INFO:${resetFG} ${s}`);
}

function readFile(root) {
  return JSON.parse(fs.readFileSync(path.join(root, 'aliases.json')).toString());
}

function getEnv(repoRoot, name, overrideWith = {}) {
  const effectiveEnv = {
    ...dotenv.config({ path: `${repoRoot}/globalenv` }).parsed,
    ...dotenv.config({ path: `${repoRoot}/client-packages/globalenv` }).parsed,
    ...overrideWith
  };

  // Transform NAME_*
  for (const k of Object.keys(effectiveEnv)) {
    if (k.startsWith(`${name}_`)) {
      const suffix = k.substring(name.length + 1);
      if (!effectiveEnv[suffix]) effectiveEnv[suffix] = effectiveEnv[k];
    }
  }

  return effectiveEnv;
}

function handleLegacyConfig(e) {
  const dest = { ...e };

  if (e.CMS_PROVIDER) {
    logWarn('[deprecated] Replace CMS_PROVIDER with PROVIDERS_CONTENT_PROVIDER');
    dest.PROVIDERS_CONTENT_PROVIDER = e.CMS_PROVIDER;
  }

  if (e.THEME && !dest.PROVIDERS_THEME) {
    logWarn('[deprecated] Replace THEME with PROVIDERS_THEME');
    dest.PROVIDERS_THEME = e.THEME;
  }

  if (e.ADDITIONAL_THEMES) {
    logWarn(
      '[deprecated] Replace ADDITIONAL_THEMES with PROVIDERS_THEME_[0-9], e.g. PROVIDERS_THEME_0'
    );
    const additionalThemes = e.ADDITIONAL_THEMES.split(',');
    for (let i = 0; i < 10; i++) {
      dest[`PROVIDERS_THEME_${i}`] = additionalThemes[i];
    }
  }

  return dest;
}

function getProviders(env, root = process.cwd(), log = false) {
  const effectiveEnv = handleLegacyConfig(env);
  const data = readFile(root);

  const getEnvKey = p => `PROVIDERS_${p
    .replace('@exo-provider/frontend-', '')
    .replace('@exo-provider/', '')
    .replace('@exo/frontend-', '')
    .replace('@exo/', '')
    .replace('@exo-', '')
    .replace(/^exo_/, '')
    .replace(/-/g, '_')
    .toUpperCase()}`;

  const res = Object.entries(data.providers || {}).map(([k, v]) => ({
    package: k,
    envKey: getEnvKey(k),
    entry: effectiveEnv[getEnvKey(k)] || v,
    configured: !!effectiveEnv[getEnvKey(k)]
  }));

  for (const e of res) {
    if (!fs.existsSync(path.join(root, e.entry))) {
      logError(`Provider ${e.package} => ${e.entry} does not exist`);
    }
  }

  if (log) {
    res
      .filter(e => e.configured)
      .forEach(e => {
        logInfo(`Provider ${e.package} using ${e.entry}`);
      });
  }

  return res;
}

function getOverrides(env, root = process.cwd(), log = false) {
  const data = readFile(root);

  const reStr = `^${(env.OVERRIDES || '$^')
    .split(',')
    .map(a => `(${a})`)
    .join('|')}$`;
  const re = new RegExp(reStr);

  const res = Object.entries(data.overrides)
    .map(([k, v]) => ({
      key: k,
      overriddenPackage: v.package,
      override: v.path
    }))
    .filter(({ key }) => key.match(re));

  for (const e of res) {
    if (!fs.existsSync(path.join(root, e.override))) {
      logError(`Provider ${e.overriddenPackage} => ${e.override} does not exist`);
    }
  }

  if (log) {
    res.forEach(e => {
      logInfo(`Package ${e.overriddenPackage} overridden with ${e.override}`);
    });
  }

  return res;
}

function getOverridden(env, root = process.cwd(), log = false) {
  const data = readFile(root);

  const res = Object.entries(data.overridden).map(([k, v]) => ({
    package: k,
    originalPackage: k.replace('@exo/', '@exo-original/'),
    path: v
  }));

  if (log) {
    res.forEach(e => {
      logInfo(`Overridden package ${e.package} (${e.path}) available as ${e.originalPackage}`);
    });
  }

  return res;
}

module.exports = {
  getEnv,
  getProviders,
  getOverrides,
  getOverridden
};
