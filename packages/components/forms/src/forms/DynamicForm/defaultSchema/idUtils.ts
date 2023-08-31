/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

export const resolveRef = (base, ref) => {
  let b = base;
  let r = ref;

  while (r.startsWith('../')) {
    r = r.slice(3);
    b = b.slice(0, b.length - 1);
  }
  return [...b, ...r.split('.')].join('.');
};

export const getData = (data, fieldId) => {
  return fieldId.split('.').reduce((acc, c) => {
    if (c.includes('[')) {
      const [prefix, suffix] = c.split('[');
      return acc?.[prefix]?.[Number(suffix.replace(']', ''))];
    } else {
      return acc?.[c];
    }
  }, data);
};

export const makeIndexedId = (id, indexes) => {
  return id
    .split('[')
    .flatMap((e, idx, arr) =>
      idx === arr.length - 1 ? [e] : [e, '[', indexes[idx]]
    )
    .join('');
};

export const setData = (dest, path, value) => {
  path
    .replace(/\[\]/g, '[0]')
    .split('.')
    // eslint-disable-next-line array-callback-return, consistent-return
    .reduce((acc, c, idx, arr) => {
      if (c.endsWith(']')) {
        const [prefix, suffix] = c.split('[');
        const aidx = Number(suffix.replace(']', ''));

        const n = prefix;
        acc[n] = [];

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < aidx; i++) {
          acc[n][i] = undefined;
        }
        acc[n][aidx] = {};

        return acc[n][aidx];
      } else if (idx === arr.length - 1) {
        acc[c] = value;
      } else {
        acc[c] = {};
        return acc[c];
      }
    }, dest);
  return dest;
};
