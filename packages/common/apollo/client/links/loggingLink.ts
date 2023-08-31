/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-continue, no-console, no-plusplus */

import { ApolloLink } from '@apollo/client';

const prettyprintGql = (s: string) => {
  let dest = '';

  const INDENT = 2;
  const ST_BETWEEN_LINES = 0;
  const ST_IN_LINE = 1;

  let state = ST_BETWEEN_LINES;
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (state === ST_BETWEEN_LINES) {
      if (' \t\n'.includes(s[i])) {
        continue;
      }
      state = ST_IN_LINE;
    }

    if (!'{}\n'.includes(s[i])) {
      dest += s[i];
      continue;
    }

    if (s[i] === '{') {
      depth++;
      dest += `{\n${' '.repeat(depth * INDENT)}`;
    } else if (s[i] === '}') {
      depth--;
      dest = `${dest.slice(0, dest.length - INDENT)}}\n${' '.repeat(depth * INDENT)}`;
      if (depth === 0) {
        dest += '\n';
      }
    } else if (s[i] === '\n') {
      dest += `\n${' '.repeat(depth * INDENT)}`;
    }

    state = ST_BETWEEN_LINES;
  }

  return dest.trim();
};

export const loggingLink = new ApolloLink((operation, forward) => {
  console.log(
    '--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log(operation.operationName);
  console.log(JSON.stringify(operation.variables));
  if (operation.query.loc?.source.body) {
    console.log(prettyprintGql(operation.query.loc?.source.body));
  }

  const stack = new Error().stack?.split('\n') ?? [];

  const start = stack.findIndex(
    e => e.includes('useQuery') || e.includes('useLazyQuery') || e.includes('useMutation')
  );
  const end = stack.findIndex(e => e.includes('renderWithHooks'));
  console.log(stack.slice(start, end).join('\n'));

  return forward(operation);
});
