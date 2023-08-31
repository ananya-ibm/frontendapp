const { getProviders, getOverridden, getOverrides, getEnv } = require('./buildUtils/lib/aliases');
const path = require('path');

const rulesDirPlugin = require('eslint-plugin-rulesdir');
rulesDirPlugin.RULES_DIR = __dirname + '/buildUtils/eslint';

/*
 * The way this configuration file is put together is through a set of defined "Rulesets". These
 * are not native eslint constructs, but instead are simple functions that updates the rules in the
 * various overrides.
 */
const Ruleset = {
  Default: 'Default',
  TypeScript: 'TypeScript',
  RestrictStyledComponentsImport: 'RestrictStyledComponentsImport',
  RestrictCarbonComponentsImport: 'RestrictCarbonComponentsImport',
  Stories: 'Stories',
  Test: 'Test',
  CrossPackageImport: 'CrossPackageImport'
};

/*
 * This defines the base Rulesets used for the base config - i.e. if no overrides match
 */
const BASE_RULESETS = [
  Ruleset.Default,
  Ruleset.RestrictCarbonComponentsImport,
  Ruleset.RestrictStyledComponentsImport
];

/*
 * First a few helper functions
 */
const addRestrictedImport = (r, a) => {
  r['node/no-restricted-import'] = r['node/no-restricted-import'] || ['warn', []];

  const [level, cfg] = r['node/no-restricted-import'];
  r['node/no-restricted-import'] = [level, [...cfg, a]];
  return r;
};

/*
 * Now, let's define all rulesets
 */
const RulesetDefs = {};

RulesetDefs.Default = r => ({
  'monorepo-cop/no-relative-import-outside-package': 'error',
  'rulesdir/no-unresolved-theme-attributes': 'error',
  'notice/notice': [
    'error',
    {
      template:
        '/*\nLicensed Materials - Property of IBM\n694906H\n(c) Copyright IBM Corp.  2020 All Rights Reserved\n\nUS Government Users Restricted Rights - Use, duplication or disclosure restricted\nby GSA ADP Schedule Contract with IBM Corp.\n*/\n\n',
      mustMatch:
        '.*Licensed Materials - Property of IBM.*\n.*694906H.*\n.*\\(c\\) Copyright IBM Corp.  2020 All Rights Reserved.*\n\n.*US Government Users Restricted Rights - Use, duplication or disclosure restricted.*\n.*by GSA ADP Schedule Contract with IBM Corp..*'
    }
  ],
  'no-else-return': 0,
  'import/no-extraneous-dependencies': 0,
  'import/prefer-default-export': 0,
  'import/no-cycle': [
    'error',
    {
      maxDepth: 3,
      ignoreExternal: true
    }
  ],
  'no-console': [
    'warn',
    {
      allow: ['assert']
    }
  ],
  'jest/no-disabled-tests': 0,
  'react/jsx-props-no-spreading': 0,
  'react/jsx-one-expression-per-line': 0,
  'react/jsx-filename-extension': 0,
  'react/no-children-prop': 0,
  'react/no-array-index-key': 1,
  'react/require-default-props': 0,
  'react-hooks/exhaustive-deps': 0,
  'react/boolean-prop-naming': [
    'error',
    {
      rule: '^(is|has|use|can)[A-Z]([A-Za-z0-9]?)+'
    }
  ],
  'comma-dangle': ['error', 'never'],
  '@typescript-eslint/comma-dangle': ['error', 'never'],
  'no-restricted-syntax': [
    'error',
    {
      selector: "MemberExpression[object.name='styled'][property.name='a']",
      message: 'Avoid styling A elements, use ReactLink element instead'
    },
    {
      selector:
        "TaggedTemplateExpression > CallExpression[callee.name='styled'] > Literal[value='a']",
      message: 'Avoid styling A elements, use ReactLink element instead'
    },
    {
      selector: "JSXIdentifier[name='a']",
      message: 'Avoid A elements, use ReactLink element instead'
    }
  ],
  'react-hooks/rules-of-hooks': 'error',
  'max-classes-per-file': 0,
  'storybook/prefer-pascal-case': 0,
  'prefer-object-spread': 0,
  // TODO: We should really remove these settings
  // These settings are not necessarily good, but here since the TypeScript lint checker
  // is more strict than the JavaScript one
  '@typescript-eslint/semi': 0,
  '@typescript-eslint/object-curly-spacing': 0,
  '@typescript-eslint/comma-spacing': 0,
  '@typescript-eslint/indent': 0,
  '@typescript-eslint/space-infix-ops': 0,
  '@typescript-eslint/no-unused-vars': 0,
  '@typescript-eslint/no-unused-expressions': 0,
  '@typescript-eslint/quotes': 0,
  '@typescript-eslint/no-useless-constructor': 0,
  '@typescript-eslint/no-empty-function': 0,
  '@typescript-eslint/space-before-function-paren': 0,
  '@typescript-eslint/naming-convention': 0,
  '@typescript-eslint/no-implied-eval': 0,
  'node/no-restricted-import': ['warn', []],
  'import/no-unresolved': [
    'error',
    {}
  ],
  ...r
});

RulesetDefs.TypeScript = r => ({
  '@typescript-eslint/no-implied-eval': ['error'],
  'object-curly-spacing': 'off',
  '@typescript-eslint/object-curly-spacing': ['error'],
  '@typescript-eslint/naming-convention': ['warn'],
  'storybook/prefer-pascal-case': 0,
  'space-before-function-paren': 'off',
  '@typescript-eslint/space-before-function-paren': 'off',
  quotes: 'off',
  '@typescript-eslint/quotes': [
    'error',
    'single',
    {
      avoidEscape: true
    }
  ],
  'comma-spacing': 'off',
  '@typescript-eslint/comma-spacing': ['error'],
  'comma-dangle': 'off',
  '@typescript-eslint/comma-dangle': ['error', 'never'],
  semi: 'off',
  '@typescript-eslint/semi': ['error'],
  indent: 'off',
  '@typescript-eslint/lines-between-class-members': [
    'error',
    'always',
    {
      exceptAfterSingleLine: true
    }
  ],
  '@typescript-eslint/member-delimiter-style': [
    'error',
    {
      multiline: {
        delimiter: 'semi',
        requireLast: true
      },
      singleline: {
        delimiter: 'semi',
        requireLast: false
      }
    }
  ],

  ...r
});

RulesetDefs.RestrictStyledComponentsImport = r =>
  addRestrictedImport(r, {
    name: 'styled-components',
    message:
      'Ensure this import is being used correctly, styles are preferred in a *.styles.js file.'
  });

RulesetDefs.RestrictCarbonComponentsImport = r =>
  addRestrictedImport(r, {
    name: 'carbon-components-react',
    message:
      'Ensure this import is being used correctly, avoid using carbon-components-react directly, instead use base components.'
  });

RulesetDefs.Stories = r => {
  r['react/jsx-props-no-spreading'] = 0;
  r["monorepo-cop/no-relative-import-outside-package"] = 0;
  return r;
};

RulesetDefs.Test = r => {
  r['import/no-unresolved'] = [
    'error',
    {
      ignore: [
        'renderWithTheme',
        '@testUtils'
      ]
    }
  ];
  r['react/jsx-props-no-spreading'] = 0;
  r['prefer-destructuring'] = 0;
  return r;
};

const makeRule = (opts, base = BASE_RULESETS, depth = 0, debug = false) => {
  const mka = a => (a === undefined ? [] : Array.isArray(a) ? a : [a]);
  const changes = {
    add: mka(opts.add),
    remove: mka(opts.remove)
  };
  const files = mka(opts.files);
  const children = mka(opts.children);

  let rulesets = [...base];
  (changes.add || []).forEach(a => rulesets.push(a));
  (changes.remove || []).forEach(a => (rulesets = rulesets.filter(b => a !== b)));

  let rules = {};

  for (const key of rulesets) {
    rules = RulesetDefs[key](rules);
  }

  let s = '';
  for (let i = 0; i < depth; i++) {
    s += '  ';
  }

  if (debug) {
    console.log(
      s +
      files.join(', ') +
      ' => ' +
      [changes.add.map(a => '+' + a).join(','), changes.remove.map(a => '-' + a).join(',')].join(
        ' '
      ) +
      ' => ' +
      rulesets.join(', ')
    );
  }

  let res = {
    files,
    rules
  };
  if (children) {
    res.overrides = children.map(c => makeRule(c, rulesets, depth + 1));
  }
  return res;
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  globals: {
    cy: true,
    Cypress: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
      experimentalDecorators: false
    },
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    '@typescript-eslint',
    'jest',
    'prettier',
    'react',
    'notice',
    "monorepo-cop",
    'jsx-a11y',
    'rulesdir',
    'import',
    'node'
  ],
  extends: [
    'airbnb-typescript/base',
    'prettier',
    'plugin:jest/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      alias: {
        map: [
          ...getProviders(getEnv(__dirname, 'ESLINT', {}), __dirname).map(a => [a.package, path.join(__dirname, a.entry)]),
          ...getOverrides(getEnv(__dirname, 'ESLINT', {}), __dirname).map(a => [a.overriddenPackage, path.join(__dirname, a.override)]),
          ...getOverridden(getEnv(__dirname, 'ESLINT', {}), __dirname).map(a => [a.originalPackage, path.join(__dirname, a.path)])
        ],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
      }
    }
  },
  /* Note that these rules are applied in order, and the *last* match applies */
  overrides: [
    makeRule({
      files: ['*.ts', '*.tsx'],
      add: [Ruleset.TypeScript],
      children: [
        {
          files: ['**/packages/components/base/**', '**/features/dev/**'],
          remove: [Ruleset.RestrictCarbonComponentsImport]
        }
      ]
    }),

    makeRule({
      files: ['**/themes/**', '**/**/testUtils.js', '**/server/**'],
      add: [Ruleset.Default],
      remove: [Ruleset.RestrictStyledComponentsImport]
    }),

    makeRule({
      files: ['*.styles.*'],
      remove: [Ruleset.RestrictStyledComponentsImport],
      children: [
        { files: ['*.ts', '*.tsx'], add: [Ruleset.TypeScript] },
        {
          files: ['**/packages/components/base/**', '**/features/dev/**'],
          remove: [Ruleset.RestrictCarbonComponentsImport]
        }
      ]
    }),

    makeRule({
      files: ['*.test.*'],
      add: [Ruleset.Test],
      remove: [Ruleset.RestrictStyledComponentsImport],
      children: [
        { files: ['*.ts', '*.tsx'], add: [Ruleset.TypeScript] },
        {
          files: ['**/packages/components/base/**', '**/features/dev/**'],
          remove: [Ruleset.RestrictCarbonComponentsImport]
        }
      ]
    }),

    makeRule({
      files: ['*.stories.*'],
      add: [Ruleset.Stories],
      remove: [Ruleset.RestrictStyledComponentsImport],
      children: [
        { files: ['*.ts', '*.tsx'], add: [Ruleset.TypeScript] },
        {
          files: ['**/packages/components/base/**', '**/features/dev/**'],
          remove: [Ruleset.RestrictCarbonComponentsImport]
        }
      ]
    }),

    makeRule({
      files: ['**/mocks/**'],
      add: [Ruleset.Stories],
      remove: [Ruleset.RestrictStyledComponentsImport],
      children: [
        { files: ['*.ts', '*.tsx'], add: [Ruleset.TypeScript] }
      ]
    })
  ],
  rules: makeRule({ files: ['*'] }).rules
};
