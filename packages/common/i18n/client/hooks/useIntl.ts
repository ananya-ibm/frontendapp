/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React from 'react';
import { useIntl as useReactIntl, IntlContext } from 'react-intl';

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export type Intl = {
  msg: (
    key: string | undefined,
    defaultMessage: string,
    props?: Record<string, string | ((arg: string) => any)>
  ) => React.ReactNode;
  error: (err: any) => string;
};

// The purpose of this method is to ensure all components works
// both with and without the IntlContext and it's wrappers
export const useIntl = (prefix = '') => {
  // This conditional logic is ok in this situation as the dependencies will not vary
  // during runtime
  /* eslint-disable react-hooks/rules-of-hooks, no-nested-ternary */
  const intl = !IntlContext
    ? undefined
    : React.useContext(IntlContext)
    ? useReactIntl()
    : undefined;
  /* eslint-enable react-hooks/rules-of-hooks, no-nested-ternary */

  if (!intl) {
    return {
      locale: 'en-GB',
      msg: (
        _key: string | undefined,
        defaultMessage: string,
        props?: Record<string, string | ((arg: string) => any)>
      ): string | React.ReactNode => {
        if (!props) return defaultMessage;

        // Replace all {abc}
        let arr = [
          Object.entries(props).reduce(
            (acc, [k, v]) => acc.replace(new RegExp(escapeRegExp(`{${k}}`), 'g'), v.toString()),
            defaultMessage
          )
        ];

        for (const [k, v] of Object.entries(props)) {
          // eslint-disable-next-line no-continue
          if (typeof v === 'string') continue;

          const sTag = `<${k}>`;
          const eTag = `</${k}>`;
          const nArr: string[] = [];
          for (let a of arr) {
            if (typeof a === 'string' && a.includes(`<${k}>`)) {
              let s = a.indexOf(sTag);
              let e = a.indexOf(eTag);
              while (s >= 0 && s < e) {
                nArr.push(a.substring(0, s));
                nArr.push(v(a.substring(s + sTag.length, e)));

                a = a.substring(e + eTag.length);
                s = a.indexOf(sTag);
                e = a.indexOf(eTag);
              }
            } else {
              nArr.push(a);
            }
          }
          arr = nArr;
        }

        return React.createElement('span', null, arr);
      },
      error: (err: any) => (err?.message !== '' ? err?.message : 'Invalid')
    };
  } else {
    return {
      locale: intl.locale,
      msg: (
        key: string | undefined,
        defaultMessage: string,
        props?: Record<string, string | ((arg: string) => any)>
      ): string | React.ReactNode => {
        if (key === undefined) return defaultMessage;

        // TODO: See if this can be fixed
        // @ts-ignore
        return intl.formatMessage({ id: `${prefix}.${key}`, defaultMessage }, props);
      },
      error: (err: any) =>
        err?.message !== ''
          ? err?.message
          : intl.formatMessage({ id: `${prefix}.error.generic`, defaultMessage: 'Invalid' })
    };
  }
};
