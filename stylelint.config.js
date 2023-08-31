/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

module.exports = {
  extends: [
    'stylelint-config-recommended-scss',
    'stylelint-config-styled-components',
    'stylelint-config-prettier'
  ],
  customSyntax: "@stylelint/postcss-css-in-js",
  plugins: [
    'stylelint-declaration-use-variable',
    'stylelint-z-index-value-constraint',
    'stylelint-order'
  ],
  rules: {
    'sh-waqar/declaration-use-variable': [
      ['font-family', 'color', { ignoreValues: ['transparent', 'inherit', 'white', 'black'] }]
    ],
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless'],
        ignore: ['after-comment', 'first-nested'],
        severity: 'warning'
      }
    ],
    'at-rule-no-unknown': null,
    'at-rule-no-vendor-prefix': true,
    'at-rule-allowed-list': ['custom-media', 'font-face', 'keyframes', 'media'],
    'block-no-empty': [
      true,
      {
        severity: 'warning'
      }
    ],
    'color-hex-length': 'short',
    'custom-property-empty-line-before': [
      'always',
      {
        except: ['after-custom-property'],
        ignore: ['after-comment', 'first-nested', 'inside-single-line-block'],
        severity: 'warning'
      }
    ],
    // 'declaration-empty-line-before': [
    //   'always',
    //   {
    //     except: ['after-declaration'],
    //     ignore: ['after-comment', 'first-nested', 'inside-single-line-block'],
    //     severity: 'warning'
    //   }
    // ],
    'declaration-no-important': true,
    'declaration-property-unit-allowed-list': {
      outline: ['%', 'px', 'rem'],
      '/^font/': ['%', 'rem'],
      '/^margin/': ['%', 'rem'],
      '/^padding/': ['%', 'rem'],
      '/^width/': ['%', 'rem', 'vw'],
      '/^height/': ['%', 'rem', 'vh', 'vw']
    },
    'font-family-no-missing-generic-family-keyword': null,
    'media-feature-name-no-vendor-prefix': true,
    'media-feature-name-allowed-list': ['min-height', 'min-width'],
    'number-max-precision': 4,
    'order/order': ['custom-properties', 'declarations', 'rules', 'at-rules'],
    'order/properties-alphabetical-order': [
      true,
      {
        severity: 'warning'
      }
    ],
    'plugin/z-index-value-constraint': {
      min: 0,
      max: 20
    },
    'property-no-vendor-prefix': true,
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
        severity: 'warning'
      }
    ],
    'selector-class-pattern': ["^(?!cds--)(.*?)$",
      {
        message: "Avoid targeting Carbon classes directly in your CSS",
        severity: 'warning'
      }
    ],
    'selector-max-attribute': 1,
    'selector-max-class': 3,
    'selector-max-id': 0,
    'selector-max-type': [
      0,
      {
        ignoreTypes: [/svg/, /path/]
      }
    ],
    'selector-max-universal': 0,
    'selector-nested-pattern': '^&',
    'selector-no-vendor-prefix': true,
    'selector-pseudo-class-no-unknown': true,
    'unit-no-unknown': null,
    'unit-allowed-list': ['%', 'deg', 'fr', 'rem', 'ms', 'vh', 'vw', 's'],
    'value-no-vendor-prefix': [true, { ignoreValues: ['box'] }],
    'property-no-vendor-prefix': [
      true,
      { ignoreProperties: ['box-orient', 'line-clamp', 'appearance'] }
    ],
    'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }],
    'at-rule-allowed-list': ['supports', 'media'],
    'property-no-unknown': [
      true,
      { ignoreProperties: ['column-break-inside', 'dominant-baseline'] }
    ],

    /* Disabling due to issues with styled-components and media queries */
    'no-duplicate-selectors': null,
    'no-descending-specificity': null
  },
  overrides: [
    {
      files: ["packages/components/base/**/*.styles.ts"],
      rules: {
        'selector-class-pattern': null
      }
    }
  ],
  "ignoreFiles": ["packages/components/extra/**"]
};
