/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-underscore-dangle */

const spacing = [
  'spacing3xs',
  'spacing2xs',
  'spacingXs',
  'spacingSm',
  'spacingMd',
  'spacingLg',
  'spacingXl',
  'spacing2xl',
  'spacing3xl'
];

const layoutSpacing = [
  'layout2xs',
  'layoutXs',
  'layoutSm',
  'layoutMd',
  'layoutLg',
  'layoutXl',
  'layout2xl'
];

const supportCarbonVars = [
  'interactive-01',
  'interactive-02',
  'interactive-03',
  'interactive-04',
  'ui-background',
  'ui-01',
  'ui-02',
  'ui-03',
  'ui-04',
  'ui-05',
  'text-01',
  'text-02',
  'text-03',
  'text-04',
  'text-05',
  'text-error',
  'icon-01',
  'icon-02',
  'icon-03',
  'link-01',
  'inverse-link',
  'field-01',
  'field-02',
  'inverse-01',
  'inverse-02',
  'support-01',
  'support-02',
  'support-03',
  'support-04',
  'inverse-support-01',
  'inverse-support-02',
  'inverse-support-03',
  'inverse-support-04',
  'overlay-01',
  'danger',
  'focus',
  'inverse-focus-ui',
  'hover-primary',
  'active-primary',
  'hover-primary-text',
  'hover-secondary',
  'active-secondary',
  'hover-tertiary',
  'active-tertiary',
  'hover-ui',
  'active-ui',
  'selected-ui',
  'selected-light-ui',
  'hover-selected-ui',
  'inverse-hover-ui',
  'hover-danger',
  'active-danger',
  'hover-row',
  'visited-link',
  'disabled-01',
  'disabled-02',
  'disabled-03',
  'highlight',
  'decorative-01',
  'skeleton-01',
  'skeleton-02',
  'brand-01',
  'brand-02',
  'brand-03',
  'active-01',
  'hover-field',
  'caption-01',
  'label-01',
  'helper-text-01',
  'body-short-01',
  'body-long-01',
  'body-short-02',
  'body-long-02',
  'code-01',
  'code-02',
  'heading-01',
  'productive-heading-01',
  'heading-02',
  'productive-heading-02',
  'productive-heading-03',
  'productive-heading-04',
  'productive-heading-05',
  'productive-heading-06',
  'productive-heading-07',
  'expressive-heading-01',
  'expressive-heading-02',
  'expressive-heading-03',
  'expressive-heading-04',
  'expressive-heading-05',
  'expressive-heading-06',
  'expressive-paragraph-01',
  'quotation-01',
  'quotation-02',
  'display-01',
  'display-02',
  'display-03',
  'display-04',
  'spacing-01',
  'spacing-02',
  'spacing-03',
  'spacing-04',
  'spacing-05',
  'spacing-06',
  'spacing-07',
  'spacing-08',
  'spacing-09',
  'spacing-10',
  'spacing-11',
  'spacing-12',
  'fluid-spacing-01',
  'fluid-spacing-02',
  'fluid-spacing-03',
  'fluid-spacing-04',
  'layout-01',
  'layout-02',
  'layout-03',
  'layout-04',
  'layout-05',
  'layout-06',
  'layout-07',
  'container-01',
  'container-02',
  'container-03',
  'container-04',
  'container-05',
  'icon-size-01',
  'icon-size-02',

  'body-long-01-font-size',
  'body-long-01-font-weight',
  'body-long-01-letter-spacing',
  'body-long-01-line-height',
  'body-long-02-font-size',
  'body-long-02-font-weight',
  'body-long-02-letter-spacing',
  'body-long-02-line-height',
  'body-short-01-font-size',
  'body-short-01-font-weight',
  'body-short-01-letter-spacing',
  'body-short-01-line-height',
  'body-short-02-font-size',
  'body-short-02-font-weight',
  'body-short-02-letter-spacing',
  'body-short-02-line-height',
  'label-01-font-size',
  'label-01-font-weight',
  'label-01-letter-spacing',
  'label-01-line-height',
  'caption-01-font-size',
  'caption-01-font-weight',
  'caption-01-letter-spacing',
  'caption-01-line-height',
  'helper-text-01-font-size',
  'helper-text-01-letter-spacing',
  'helper-text-01-line-height',
  'productive-heading-01-font-size',
  'productive-heading-01-font-weight',
  'productive-heading-01-letter-spacing',
  'productive-heading-01-line-height',
  'productive-heading-02-font-size',
  'productive-heading-02-font-weight',
  'productive-heading-02-letter-spacing',
  'productive-heading-02-line-height',
  'productive-heading-03-font-size',
  'productive-heading-03-font-weight',
  'productive-heading-03-letter-spacing',
  'productive-heading-03-line-height',
  'productive-heading-04-font-size',
  'productive-heading-04-font-weight',
  'productive-heading-04-letter-spacing',
  'productive-heading-04-line-height',
  'productive-heading-05-font-size',
  'productive-heading-05-font-weight',
  'productive-heading-05-letter-spacing',
  'productive-heading-05-line-height',
  'productive-heading-06-font-size',
  'productive-heading-06-font-weight',
  'productive-heading-06-letter-spacing',
  'productive-heading-06-line-height',

  'field',
  'field-hover'
];

export const toKebabCase = (k: string) =>
  k
    .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
    .replace(/([0-9])([a-zA-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z])(?=[a-z])/g, '$1-$2')
    .toLowerCase();

export const carbonCssVariables = (m: Record<string, any>) =>
  Object.entries(m)
    .map(([k, v]) => {
      if (k.startsWith('spacing')) {
        return [`spacing-0${spacing.indexOf(k) + 1}`, v];
      }
      if (k.startsWith('layout')) {
        return [`layout-0${layoutSpacing.indexOf(k) + 1}`, v];
      }
      return [k, v];
    })
    .filter(([k]) => !k?.includes('Responsive') && !k?.startsWith('expressive'))
    .map(([k, v]) => {
      if (!supportCarbonVars.includes(toKebabCase(k!))) {
        // eslint-disable-next-line no-console
        console.warn(`Invalid carbon variable: ${toKebabCase(k!)}`);
      }
      return [k, v];
    })
    .map(([k, v]) => `--cds-${toKebabCase(k!)}: ${v}`)
    .join(';\n');
