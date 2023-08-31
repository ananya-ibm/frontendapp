/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-continue, no-await-in-loop */

const fs = require('fs');
const path = require('path');
const upath = require('upath');
const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { execSync } = require('child_process');
const { getProviders, getOverridden, getOverrides, getEnv } = require('./lib/aliases');

function getPackages() {
  let output;

  try {
    output = execSync(`node ./node_modules/lerna/cli.js ls --json`);
  } catch (error) {
    console.info(`No local packages found.`);
    process.exit(0);
  }

  const packages = JSON.parse(output.toString());
  return packages;
}

async function getFiles(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map(dirent => {
      const res = resolve(dir, dirent.name);
      return dirent.isDirectory() ? getFiles(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

const ENTRY_PATHS = [
  'client/index.ts',
  'src/index.ts',
  'client/App.tsx',
  'lib/index.ts',
  'client/index.js',
  'client/App.js',
  'src/index.js',
  'lib/index.js'
];

const run = async () => {
  const modules = getPackages();

  const ret = {};
  for (const m of modules) {
    const p = JSON.parse(fs.readFileSync(path.join(m.location, 'package.json')));
    if (!p) continue;

    ret[m.name] = {
      name: p.name,
      path: path.relative('.', m.location)
    };

    // Get entry (for tsconfig.tsx)
    for (const pathToTest of ENTRY_PATHS) {
      const fullPathToTest = path.join(m.location, pathToTest);
      if (fs.existsSync(fullPathToTest)) {
        ret[m.name].entry = path.relative('.', fullPathToTest);
        break;
      }
    }

    if (!ret[m.name].entry) {
      console.warn(`INFO No entry point in module ${m.name} - skipping`);
    }

    // Look for test files
    ret[m.name].testCount = (await getFiles(m.location))
      .filter(e => !e.includes('/node_modules/'))
      .filter(e => !e.includes('.snap'))
      .filter(e => e.includes('.test.')).length;

    // Look for storybook stories
    ret[m.name].storiesCount = (await getFiles(m.location))
      .filter(e => !e.includes('/node_modules/'))
      .filter(e => e.includes('.stories.')).length;

    ret[m.name].exoConfig = p.exo;
  }

  return ret;
};

const updateAliases = packages => {
  const aliases = {
    providers: {},
    overrides: {},
    overridden: {}
  };
  for (const [k, v] of Object.entries(packages)) {
    if (!v.exoConfig) continue;
    if (v.exoConfig.overrides) {
      aliases.overrides[k] = {};
      aliases.overrides[k].package = v.exoConfig.overrides;
      aliases.overrides[k].path = v.entry;

      aliases.overridden[v.exoConfig.overrides] = packages[v.exoConfig.overrides].entry;
    }

    if (v.exoConfig.providers) {
      aliases.providers = { ...aliases.providers, ...v.exoConfig.providers };
    }
  }

  fs.writeFileSync('aliases.json', JSON.stringify(aliases, undefined, '  '));
};

const updateTsConfig = packages => {
  // eslint-disable-next-line no-eval
  const baseConfig = eval(`__tmp=${fs.readFileSync('tsconfig.json').toString()}`);
  delete baseConfig.compilerOptions.paths;

  baseConfig.compilerOptions.paths = Object.fromEntries(
    Object.entries(packages)
      .filter(([k, v]) => v.entry)
      .map(([k, v]) => [k, [upath.toUnix(`./${v.entry}`)]])
  );

  baseConfig.compilerOptions.paths['@testUtils'] = ['./testUtils/index.ts'];
  baseConfig.compilerOptions.paths['@exo-provider/frontend-content-provider'] = [
    './packages/features/content/content-provider-noop/lib/index.ts'
  ];

  getProviders(getEnv(process.cwd(), 'TSCONFIG', {}), process.cwd()).forEach(
    a => (baseConfig.compilerOptions.paths[a.package] = [`./${a.entry}`])
  );
  getOverridden(getEnv(process.cwd(), 'TSCONFIG', {}), process.cwd()).forEach(
    a => (baseConfig.compilerOptions.paths[a.originalPackage] = [`./${a.path}`])
  );
  getOverrides(getEnv(process.cwd(), 'TSCONFIG', {}), process.cwd()).forEach(
    a => (baseConfig.compilerOptions.paths[a.overriddenPackage] = [`./${a.override}`])
  );

  fs.writeFileSync('tsconfig.json', JSON.stringify(baseConfig, undefined, '  '));
};

const updateStorybook = packages => {
  fs.writeFileSync(
    '.storybook/stories.json',
    JSON.stringify(
      Object.entries(packages)
        .filter(([k, v]) => v.storiesCount > 0)
        .map(([k, v]) => upath.toUnix(path.dirname(v.entry))),
      undefined,
      '  '
    )
  );
};

const updateJestConfig = packages => {
  fs.writeFileSync(
    'jest.paths.json',
    JSON.stringify(
      Object.fromEntries(
        Object.entries(packages)
          .filter(([k, v]) => v.testCount > 0)
          .map(([k, v]) => [k, upath.toUnix(v.path)])
      ),
      undefined,
      '  '
    )
  );
};

(async () => {
  const packages = await run();

  updateAliases(packages);
  updateTsConfig(packages);
  updateStorybook(packages);
  updateJestConfig(packages);
})();
