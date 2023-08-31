/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-console */

if (process.env.npm_config_user_agent && !process.env.npm_config_user_agent.startsWith('npm/')) {
  console.error('Use "npm install" for installation in this project');
  process.exit(1);
}

const warnings = [];

if (process.env.PROMPT === '$P$G') {
  warnings.push(
    'Running under cmd.exe or PowerShell is not supported - please use WSL2 or Git Bash'
  );
}

if (!process.versions.node.startsWith('16.')) {
  warnings.push(`Please use node version 16.x (you are using ${process.versions.node})`);
}

if (warnings.length > 0) {
  console.log('');
  console.log('');
  console.log(' /$$      /$$  /$$$$$$  /$$$$$$$  /$$   /$$ /$$$$$$ /$$   /$$  /$$$$$$ ');
  console.log('| $$  /$ | $$ /$$__  $$| $$__  $$| $$$ | $$|_  $$_/| $$$ | $$ /$$__  $$');
  console.log('| $$ /$$$| $$| $$  \\ $$| $$  \\ $$| $$$$| $$  | $$  | $$$$| $$| $$  \\__/');
  console.log('| $$/$$ $$ $$| $$$$$$$$| $$$$$$$/| $$ $$ $$  | $$  | $$ $$ $$| $$ /$$$$');
  console.log('| $$$$_  $$$$| $$__  $$| $$__  $$| $$  $$$$  | $$  | $$  $$$$| $$|_  $$');
  console.log('| $$$/ \\  $$$| $$  | $$| $$  \\ $$| $$\\  $$$  | $$  | $$\\  $$$| $$  \\ $$');
  console.log('| $$/   \\  $$| $$  | $$| $$  | $$| $$ \\  $$ /$$$$$$| $$ \\  $$|  $$$$$$/');
  console.log('|__/     \\__/|__/  |__/|__/  |__/|__/  \\__/|______/|__/  \\__/ \\______/ ');

  console.log('');
  warnings.forEach(e => {
    console.log(`- ${e}`);
  });
  console.log('');
  console.log('');
  console.log('');
}
