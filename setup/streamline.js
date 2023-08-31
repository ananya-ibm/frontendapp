const inquirer = require('inquirer');
var spawnSync = require('child_process').spawnSync;

const recipes = [
  { code: 'b2c', name: 'Commerce B2C Storefront only' },
  { code: 'b2b', name: 'Commerce B2B Storefront only' },
  { code: 'auto', name: 'Automotive Commerce only' },
  { code: 'base', name: 'EXO Base Scaffold Only' },
  { code: 'none', name: 'Remain as is' }
];

const extras = [
  { code: 'b2c', name: 'Commerce B2C Storefront only' },
  { code: 'b2b', name: 'Commerce B2B Storefront only' },
  { code: 'auto', name: 'Automotive Commerce only' },
  { code: 'base', name: 'EXO Base Scaffold Only' },
  { code: 'none', name: 'Remain as is' }
];

var FAILURE = 'failure';
var SUCCESS = 'success';

var styles = {
  // got these from playing around with what I found from:
  // https://github.com/istanbuljs/istanbuljs/blob/0f328fd0896417ccb2085f4b7888dd8e167ba3fa/packages/istanbul-lib-report/lib/file-writer.js#L84-L96
  // they're the best I could find that works well for light or dark terminals
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

function determineCode(recipeName) {
  let code = null;
  recipes.map(recipe => {
    if (recipe.name === recipeName) {
      code = recipe.code;
    }
  });
  return code;
}

inquirer
  .prompt([
    {
      type: 'list',
      name: 'recipeName',
      message: 'What intial setup of EXO do you want?',
      choices: recipes
    }
  ])
  .then(answers => {
    const codeSelected = determineCode(answers.recipeName);
    if (codeSelected && codeSelected === 'auto') {
      result = run(
        'Install helper',
        'Globally install rimraf dependancy as UNIX helper for removal',
        'npm install rimraf -g'
      );
      result = run(
        'Remove unneeded apps',
        'Remove apps not needed for this recipe',
        'rimraf packages/apps/commerce-b2b && rimraf packages/apps/commerce'
      );
      result = run(
        'Remove unneeded themes',
        'Remove themes not needed for this recipe',
        'rimraf packages/themes/default-theme && rimraf packages/themes/dark-theme'
      );
      result = run(
        'Remove unneeded client packages',
        'Remove client packages not needed for this recipe',
        'rimraf client-packages'
      );
      result = run(
        'Remove unneeded feature',
        'Remove features not needed for this recipe',
        'rimraf packages/features/dynamic-forms && rimraf packages/features/demo'
      );
    }
    if (codeSelected && codeSelected === ('b2c' || 'b2b')) {
      result = run(
        'Install helper',
        'Globally install rimraf dependancy as UNIX helper for removal',
        'npm install rimraf -g'
      );
      result = run(
        'Remove unneeded apps',
        'Remove apps not needed for this recipe',
        'rimraf packages/apps/commerce-b2b && rimraf packages/apps/automotive'
      );
      result = run(
        'Remove unneeded themes',
        'Remove themes not needed for this recipe',
        'rimraf packages/themes/automotive-theme && rimraf packages/themes/dark-theme'
      );
      result = run(
        'Remove unneeded client packages',
        'Remove client packages not needed for this recipe',
        'rimraf client-packages'
      );
      result = run(
        'Remove unneeded feature',
        'Remove features not needed for this recipe',
        'rimraf packages/features/dynamic-forms && rimraf packages/features/demo && rimraf packages/features/automotive && rimraf packages/features/automotive'
      );
      result = run(
        'Remove unneeded components',
        'Remove components not needed for this recipe',
        'rimraf packages/components/automotive'
      );
    }
    if (codeSelected && codeSelected === 'b2c') {
      result = run(
        'Remove B2B specific features',
        'Removing the B2B content now commerce is set up',
        'rimraf packages/features/b2b && rimraf packages/features/marketplace'
      );
    }
    if (codeSelected && codeSelected === 'base') {
      result = run(
        'Install helper',
        'Globally install rimraf dependancy as UNIX helper for removal',
        'npm install rimraf -g'
      );
      result = run(
        'Create your new app',
        'Following the generator commands to create a new app',
        'npm run generate'
      );
      result = run(
        'Remove unneeded apps',
        'Remove apps not needed for this recipe',
        'rimraf packages/apps/commerce-b2b && rimraf packages/apps/automotive && rimraf packages/apps/commerce'
      );
      result = run(
        'Remove unneeded themes',
        'Remove themes not needed for this recipe',
        'rimraf packages/themes/automotive-theme && rimraf packages/themes/dark-theme'
      );
      result = run(
        'Remove unneeded client packages',
        'Remove client packages not needed for this recipe',
        'rimraf client-packages'
      );
      result = run(
        'Remove unneeded feature',
        'Remove features not needed for this recipe',
        'cd packages/features && rimraf {account-automotive,account-b2b,account-dashboard,account-profile,account-stores,authentication,automotive,cart,cart-automotive,catalog,checkout,dynamic-forms,marketplace,payments,store}'
      );
      result = run(
        'Remove unneeded components',
        'Remove components not needed for this recipe',
        'rimraf packages/components/automotive && rimraf packages/components/commerce && rimraf packages/components/typography && rimraf packages/components/content'
      );
    }
  });
