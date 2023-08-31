/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import baseLoadable from '@loadable/component';

// TODO: Can we make this themeable somehow??

type Type = 'component' | 'page' | 'other';

export const loadable = (fn, opts = {}) => {
  const type: Type = (opts as any).type ?? 'other';
  return baseLoadable(fn, {
    fallback: 
      type === 'other' ? <div style={{ fontSize: '14px' }}>Loading...</div> :
      type === 'component' ? <div style={{ fontSize: '14px', border: '1px solid #dedede', width: '100%', textAlign: 'center', padding: '1rem' }}>Loading...</div> :
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p>...</p></div>,
    resolveComponent: loaded => loaded.default,
    ...opts
  });
};

