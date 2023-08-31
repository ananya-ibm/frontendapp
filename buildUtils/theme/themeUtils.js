/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return, no-plusplus */

const path = require('path');
const fs = require('fs');

function resolveTheme(repoRoot, theme) {
  if (theme.startsWith('file://')) {
    return { type: 'file', name: `${theme.substring('file://'.length)}` };
  } else if (
    theme.startsWith('/') ||
    theme.startsWith('./') ||
    theme.startsWith('../') ||
    theme.startsWith('packages/themes') ||
    theme.startsWith('client-packages/themes')
  ) {
    return { type: 'file', name: theme };
  } else {
    console.error(`Theme ${theme} not found'`);
    process.exit(1);
    return undefined;
  }
}

function getThemePackages(repoRoot, themeList) {
  return themeList.map(t => resolveTheme(repoRoot, t));
}

module.exports = {
  getThemePackages,
  resolveTheme
};
