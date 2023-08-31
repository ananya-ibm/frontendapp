/* eslint-disable no-restricted-syntax */
/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAppShellContext } from '../../context/AppShellContext';
import { getConfigForPath } from '../../utils/applicationConfigHelper';
import { useOriginalLocation } from '../AppShellSwitch/AppShellSwitch';

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
  'onClick',
  'onMouseOver'
];

// Please note that we use a default export here to work properly
// with the webpack alias
const AppShellLink = ({ children, to, href, ...rest }: Props) => {
  const applicationContext = useAppShellContext();
  const originalLocation = useOriginalLocation();
  const location = useLocation();

  let effectiveTo = to ?? href ?? '';

  const rewrittenTo = applicationContext.rewriteEngine.rewriteOutbound(
    effectiveTo,
    location.pathname,
    originalLocation.pathname,
    applicationContext.rewriteEngine.getVariables()
  );

  if (effectiveTo !== rewrittenTo) {
    effectiveTo = rewrittenTo;
  }

  let longestPrefix = '';
  let revisedTo: string | null = effectiveTo;

  const applications = getConfigForPath(applicationContext);

  let effectiveTarget: any;

  for (const [path, target] of [
    ...Object.entries(applications.modulesInApp),
    ...Object.entries(applications.externalModules)
  ]) {
    if (effectiveTo.startsWith(path) && path.length > longestPrefix.length) {
      if (typeof target === 'string') {
        revisedTo = target + path + effectiveTo.substring(path.length);
      } else {
        revisedTo = null;
        effectiveTarget = target;
      }
      longestPrefix = path;
    }
  }

  const extraAttrs = Object.entries(rest).reduce(
    (b, [k, v]) => (A_ATTRIBUTES.includes(k) ? { ...b, [k]: v } : b),
    {}
  );

  if (revisedTo !== null && longestPrefix.length > 0) {
    return (
      <>
        <a {...extraAttrs} href={revisedTo}>
          {children}
        </a>
      </>
    );
  }

  if (revisedTo?.startsWith('http://') || revisedTo?.startsWith('https://')) {
    return (
      <>
        <a {...extraAttrs} href={revisedTo}>
          {children}
        </a>
      </>
    );
  }

  const preload = () => effectiveTarget?.preload && effectiveTarget?.preload();
  return (
    <>
      <RouterLink {...extraAttrs} to={effectiveTo} onMouseOver={preload} onMouseDown={preload}>
        {children}
      </RouterLink>
    </>
  );
};

type Props = {
  children: any;
  to?: string;
  href?: string;
} & HTMLAnchorElement;

export const Link = AppShellLink;
