/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading, no-restricted-syntax */

/**
 * This components is a wrapper around a simple <a href
 * It can be substituted, through webpack, to a react-router Link or AppShellLink as needed
 * It is consciously not containing any presentational styles or functionality
 */

import React from 'react';

const A_ATTRIBUTES = [
  'accesskey',
  'autofocus',
  'dir',
  'enterkeyhint',
  'hidden',
  'id',
  'inputmode',
  'is',
  'itemid',
  'itemprop',
  'itemref',
  'itemscope',
  'itemtype',
  'lang',
  'slot',
  'spellcheck',
  'style',
  'tabindex',
  'title',
  'translate',
  'accesskey',
  'charset',
  'download',
  'hreflang',
  'name',
  'referrerpolicy',
  'rel',
  'rev',
  'shape',
  'tabindex',
  'target',
  'type',
  'className',
  'aria-activedescendant',
  'aria-atomic',
  'aria-autocomplete',
  'aria-busy',
  'aria-checked',
  'aria-colcount',
  'aria-colindex',
  'aria-colspan',
  'aria-controls',
  'aria-current',
  'aria-describedby',
  'aria-details',
  'aria-disabled',
  'aria-dropeffect',
  'aria-errormessage',
  'aria-expanded',
  'aria-flowto',
  'aria-grabbed',
  'aria-haspopup',
  'aria-hidden',
  'aria-invalid',
  'aria-keyshortcuts',
  'aria-label',
  'aria-labelledby',
  'aria-level',
  'aria-live',
  'aria-modal',
  'aria-multiline',
  'aria-multiselectable',
  'aria-orientation',
  'aria-owns',
  'aria-placeholder',
  'aria-posinset',
  'aria-pressed',
  'aria-readonly',
  'aria-relevant',
  'aria-required',
  'aria-roledescription',
  'aria-rowcount',
  'aria-rowindex',
  'aria-rowspan',
  'aria-selected',
  'aria-setsize',
  'aria-sort',
  'aria-valuemax',
  'aria-valuemin',
  'aria-valuenow',
  'aria-valuetext',
  'role',
  'onclick',
  'onmouseover',
  'onClick',
  'onMouseOver'
];

export const Link = ({ children, to, href, ...rest }: Props) => {
  const extraAttrs: Record<string, any> = Object.entries(rest).reduce(
    (b, [k, v]) => (A_ATTRIBUTES.includes(k) ? { ...b, [k]: v } : b),
    {}
  );

  extraAttrs.onClick = extraAttrs.onClick ?? extraAttrs.onclick;
  extraAttrs.onMouseOver = extraAttrs.onMouseOver ?? extraAttrs.onmouseover;

  delete extraAttrs.onclick;
  delete extraAttrs.onmouseover;

  return (
    <a href={to ?? href} {...extraAttrs}>
      {children}
    </a>
  );
};

type Props = {
  children: any;
  to?: string;
  href?: string;
} & Partial<Omit<HTMLAnchorElement, 'children'>> & {
    onMouseOver?: HTMLAnchorElement['onmouseover'];
    onClick?: HTMLAnchorElement['onclick'];
  };
