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
const branchName = shell.exec('git rev-parse --abbrev-ref HEAD').stdout;
// check if this branch already exists in the remote
const isInRemote =
  shell.exec(`git show-branch remotes/origin/${branchName}`).code === 0;
if (!isInRemote) {
  const validBranchPrefix = 'feat|fix|chore|major|spike';
  const validBranchesRegex = /^(feat|fix|chore|major|spike)\/[\w.-]+/gm;
  if (!validBranchesRegex.test(branchName)) {
    const msg = `Branch names in this project must adhere to this contract: ${validBranchPrefix}.`;
    shell.echo(chalk.bgRed.black.bold(msg));
    process.exit(1);
  } else {
    const msg = `Branch name has the correct syntax.`;
    shell.echo(chalk.bgGreen.white.bold(msg));
    process.exit(0);
  }
} else {
  const msg = `Branch is already in remote.`;
  shell.echo(chalk.bgGreen.white.bold(msg));
  process.exit(0);
}
