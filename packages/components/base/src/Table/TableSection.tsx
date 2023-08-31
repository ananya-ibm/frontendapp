/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TableContainer as CarbonTableContainer } from '@carbon/react';

export const TableSection = ({ children, title }: Props) => {
  return <CarbonTableContainer title={title}>{children}</CarbonTableContainer>;
};

type Props = {
  title?: string;
  children: any;
};
