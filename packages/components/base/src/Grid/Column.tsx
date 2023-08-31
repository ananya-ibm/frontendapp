/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Column as CarbonColumn } from '@carbon/react';
import { getColSpan } from './ColumnStyleUtils';

export const Column = ({ className, lg, sm, md, xl, children }: Props) => {
  return (
    <CarbonColumn
      className={className}

      lg={getColSpan({ lg }, 'lg')}
      sm={getColSpan({ sm }, 'sm')}
      md={getColSpan({ md }, 'md')}
      xlg={getColSpan({ xl }, 'xl')}
    >
      {children}
    </CarbonColumn>
  );
};

type Props = {
  className?: string;
  lg?: number | string | { span?: number | string; offset?: number | string };
  sm?: number | string | { span?: number | string; offset?: number | string };
  md?: number | string | { span?: number | string; offset?: number | string };
  xl?: number | string | { span?: number | string; offset?: number | string };
  children?: any;
};
