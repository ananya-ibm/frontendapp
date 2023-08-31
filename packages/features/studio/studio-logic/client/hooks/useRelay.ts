/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useState } from 'react';

export type PageInfo = {
  totalResultsCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor: string;
  endCursor: string;
}

export type RelayVariables = {
  first?: number;
  last?: number;
  after?: string;
  before?: string;
}

export type RelayControls = ReturnType<typeof useRelay>;

export const useRelay = () => {
  const [after, setAfter] = useState<string | undefined>(undefined);
  const [before, setBefore] = useState<string | undefined>(undefined);
  const [pageSize, setPageSize] = useState(10);
  const [pageInfo, setPageInfo] = useState<PageInfo | undefined>(undefined);

  return { 
    getRelayControls: () => ({ 
      after, 
      before,
      first: !!before ? undefined : pageSize,
      last: !!before ? pageSize : undefined 
    }),
    totalResultsCount: pageInfo?.totalResultsCount,
    pageSize, 
    setAfter, 
    setPageSize: (n: number) => {
      setPageSize(n);
      setAfter(undefined);
      setBefore(undefined);
    }, 
    setPageInfo: (np: PageInfo | undefined) => {
      if (
        np?.startCursor === pageInfo?.startCursor &&
        np?.endCursor === pageInfo?.endCursor &&
        np?.totalResultsCount === pageInfo?.totalResultsCount
      )
        return;
      setPageInfo(np);
    },
    nextPage: () => {
      setBefore(undefined);
      setAfter(pageInfo?.endCursor);
    },
    previousPage: () => {
      setBefore(pageInfo?.startCursor);
      setAfter(undefined);
    }
  };  
}