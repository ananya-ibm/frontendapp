/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Pagination as CarbonPagination } from '@carbon/react';

export const Pagination = ({ page, total, pageSize = 10, onChange, className }: Props) => {
  return (
    <CarbonPagination
      page={page}
      pageSize={pageSize}
      totalItems={total}
      pageSizes={[10, 20, 30, 40]}
      onChange={onChange}
      className={className}
    />
  );
};

type Props = {
  page?: number;
  pageSize?: number;
  total: number;
  onChange: (data: { page: number; pageSize: number }) => void;
  className?: string;
};
