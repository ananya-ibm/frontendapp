/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TableHead, TableRow } from '@carbon/react';

export const TableHeaderRow = ({ children }) => {
  return (
    <TableHead>
      <TableRow>{children}</TableRow>
    </TableHead>
  );
};
