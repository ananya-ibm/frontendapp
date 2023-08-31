/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Pagination as PaginationComp } from '@exo/frontend-components-base';
import * as S from './Pagination.styles';

// TODO: Should this really sit in commerce

export const Pagination = ({
  page = 1,
  pageSize = 10,
  totalItems = 123,
  onChange = () => {}
}: Props) => {
  return (
    <S.Pagination>
      <PaginationComp
        page={page}
        pageSize={pageSize}
        total={totalItems}
        onChange={onChange}
      />
    </S.Pagination>
  );
};

type Props = {
  page?: number;
  pageSize?: number;
  totalItems?: number;
  onChange?: () => void;
};
  