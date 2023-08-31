/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Table as CarbonTable } from '@carbon/react';

export const Table = ({ children, ...rest }) => {
  return <CarbonTable {...rest}>{children}</CarbonTable>;
};
