/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const shell = require('shelljs');
const chalk = require('chalk');

shell.config.silent = true;

const diff = shell.exec('git diff --name-only').stdout;

const e2eTouched = JSON.stringify(diff).includes('cypress');

const envFileTouched = JSON.stringify(diff).includes('.example');

if (envFileTouched) {
  const envMsg =
    'You have modified an env file, have you updated the correct YAML, Dockerfile and/or E2E Test Config?';
  shell.echo(chalk.bgYellow.black.bold(envMsg));
}

if (e2eTouched) {
  const e2eMsg =
    'You have modified an end to end test, so tests are being run.';
  shell.echo(chalk.bgYellow.black.bold(e2eMsg));
  if (shell.exec('npm run test:e2e:hcl && npm run test:e2e:sap').code !== 0) {
    const fail = 'Tests failed.';
    shell.echo(chalk.bgRed.black.bold(fail));
    process.exit(1);
  }
  const suc = 'Tests pass.';
  shell.echo(chalk.bgGreen.black.bold(suc));
}

process.exit(0);
