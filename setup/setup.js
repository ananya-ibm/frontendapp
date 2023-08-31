#!/usr/bin/env node

// These setup scripts and overall process owe a huge debt of thanks to our mutual hero Kent C Dodds,
//who's scripts inspired these, and who's code we have used in places, and modified in others
// Kent, you're a rockstar 🎸 https://kentcdodds.com/

var spawnSync = require('child_process').spawnSync;

var FAILURE = 'failure';
var SUCCESS = 'success';

var styles = {
  // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
  success: { open: '\u001b[32;1m', close: '\u001b[0m' },
  danger: { open: '\u001b[31;1m', close: '\u001b[0m' },
  info: { open: '\u001b[36;1m', close: '\u001b[0m' },
  subtitle: { open: '\u001b[2;1m', close: '\u001b[0m' }
};

function color(modifier, string) {
  return styles[modifier].open + string + styles[modifier].close;
}

function run(title, subtitle, command, options) {
  options = options || {};

  console.log(color('info', '    ▶️  Starting: ' + title));
  console.log(color('subtitle', '          ' + subtitle));
  console.log(color('subtitle', '          Running the following command: ' + command));

  var result = spawnSync(command, { stdio: 'inherit', shell: true });

  if (result.status !== 0 && !options.ignoreFailure) {
    console.error(
      color(
        'danger',
        '    🚨  Failure: ' +
          title +
          '. Please review the messages above for information on how to troubleshoot and resolve this issue.'
      )
    );
    process.exit(result.status);
    return FAILURE;
  }

  console.log(color('success', '    ✅  Success: ' + title + '\n\n'));
  return SUCCESS;
}

function main() {
  var result;
  result = run(
    'Set up dependancy installation',
    'Installing dependancies required for set up (this should be removed by using an external repo).',
    'npm install'
  );
  result = run(
    'System Validation',
    'Ensuring the correct versions of tools are installed on this computer.',
    'node ./setup/validateSystem.js'
  );
  if (result === FAILURE) return;

  result = run(
    'Dependency Installation',
    'Installing third party code dependencies so the frontend monorepo works properly on this computer.',
    'npm install'
  );
  if (result === FAILURE) return;

  result = run(
    'Local dependancy bootstrap',
    'Bootstraping the local lerna monorepo, so local packages are all avaliable.',
    'npm run bootstrap'
  );
  if (result === FAILURE) return;

  result = run(
    'Project Validation',
    'Running local unit tests to verify installation was completed correctly',
    'npm run test'
  );
  if (result === FAILURE) return;

  result = run(
    'Installing desired recipe',
    'Allowing user to select desired recipe for exo installation',
    'node ./setup/streamline.js'
  );
  if (result === FAILURE) return;
}

main();
