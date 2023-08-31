/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
process.env.TZ = 'GMT';

const path = require('path');
const fs = require('fs');
const { getProviders, getOverrides, getOverridden, getEnv } = require('./buildUtils/lib/aliases');

const projectConfig = (name, folder) => ({
  displayName: name,
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname, folder),
  globals: {
    fetch: {}
  },
  moduleNameMapper: {
    // This fixes an issue with mixed CJS and ESM modules in the Three JS context
    '^three$': path.resolve(__dirname, 'node_modules/three/build/three.cjs'),
    '^three-custom-shader-material$': path.resolve(__dirname, 'node_modules/three-custom-shader-material/index.cjs.js'),
    '^three-custom-shader-material/vanilla$': path.resolve(__dirname, 'node_modules/three-custom-shader-material/vanilla.cjs.js'),
    '\\.(svg|css)$': path.resolve(__dirname, 'testUtils/fileMock.js'),

    ...Object.fromEntries(
      getProviders(
        getEnv(__dirname, folder.includes('client-packages') ? 'JEST_CLIENT_PACKAGES' : 'JEST', {}),
        __dirname
      ).map(e => [e.package, path.resolve(__dirname, e.entry)])
    ),

    ...Object.fromEntries(
      getOverrides(
        getEnv(__dirname, folder.includes('client-packages') ? 'JEST_CLIENT_PACKAGES' : 'JEST', {}),
        __dirname,
        true
      ).map(e => [
        e.overriddenPackage,
        path.resolve(__dirname, e.override)
      ])
    ),

    ...Object.fromEntries(
      getOverridden(
        getEnv(__dirname, folder.includes('client-packages') ? 'JEST_CLIENT_PACKAGES' : 'JEST', {}),
        __dirname
      ).map(e => [e.originalPackage, path.resolve(__dirname, e.path)])
    ),

    '@carbon/react/icons': path.resolve(__dirname, 'testUtils/iconsMock.js'),
    mockSiteData: '<rootDir>/testUtils/mockSiteData.js',
    mockFormData: '<rootDir>/testUtils/mockFormData.js',
    mockProductData: '<rootDir>/testUtils/mockProductData.js',
    mockMyAccountData: '<rootDir>/testUtils/mockMyAccountData.js',
    '@testUtils': path.resolve(__dirname, 'testUtils/index.ts')
  },
  setupFilesAfterEnv: [
    '@testing-library/jest-dom/extend-expect',
    path.resolve(__dirname, 'testUtils', 'globalSetup.js')
  ],
  testMatch: ['<rootDir>/**/*.test.(js|ts|tsx)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  transformIgnorePatterns: ['/node_modules/', '/dist/'],
  transform: {
    '\\.(js|ts|tsx)$': [
      'babel-jest',
      { configFile: path.resolve(__dirname, 'testUtils/babel.config.js') }
    ],
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga|glb)$':
      'jest-transform-stub'
  }
});

const paths = eval(`__tmp=${fs.readFileSync('jest.paths.json').toString()}`);

module.exports = {
  coverageDirectory: '<rootDir>/.coverage/',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.(js|ts|tsx)',
    '!**/node_modules/**',
    '!**/mocks/**',
    '!**/*.styles.(js|ts|tsx)',
    '!**/*.stories.(js|ts|tsx)',
    '!**/*.theme.(js|ts|tsx)',
    '!**/*.test.(js|ts|tsx)',
    '!**/index.(js|ts)',
    '!**/mock*.(js|ts)'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist'],
  coverageThreshold: {
    global: {
      statements: 30,
      branches: 30,
      functions: 30,
      lines: 30
    }
  },
  projects: Object.entries(paths).map(([k, v]) => projectConfig(k, v))
};
