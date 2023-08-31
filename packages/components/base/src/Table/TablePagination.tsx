/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Pagination } from '@carbon/react';

export const TablePagination = ({ total, pageSize = 10, pageInputDisabled, onChange }: Props) => {
  return (
    <Pagination
      pageSize={pageSize}
      pageInputDisabled={pageInputDisabled}
      totalItems={total}
      pageSizes={[10, 20, 30, 40]}
      onChange={data => {
        onChange({ ...data, direction: 
          data.backBtnRef ? 'forwards' : data.forwardBtnRef ? 'backwards' : undefined });
      }}
    />
  );
};

type Props = {
  pageSize?: number;
  total: number;
  // eslint-disable-next-line react/boolean-prop-naming
  pageInputDisabled?: boolean;
  onChange: (data: { page: number; pageSize: number; direction?: 'backwards' | 'forwards' }) => void;
};
