/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import {
  Table,
  TableCell,
  TableHeaderRow,
  TableBody,
  TableRow,
  TableHeader,
  Button,
  TableSection,
  TableToolbar,
  ActionMenu,
  ActionMenuItem,
  DataTableContainer
} from '@exo/frontend-components-base';
import { Settings, Add } from '@carbon/react/icons';
import * as S from './ShippingRateTable.styles';

export const ShippingRateTable = ({ headerData, rowData, addText }) => {
  return (
    <S.Shipping>
      <DataTableContainer
        headerData={headerData}
        rowData={rowData}
        render={({ setGlobalFilter, getTableProps, prepareRow, headers, rows }) => (
          <TableSection>
            <TableToolbar hasSearch onSearch={setGlobalFilter}>
              <Settings size={32} aria-label="Settings" className="settings" />
              <Button
                onClick={() => {}}
                size="field"
                label={addText}
                icon={<Add size={20} aria-label="Add" />}
              />
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHeaderRow>
                {headers.map(header => (
                  <TableHeader {...header.getHeaderProps()}>{header.render('Header')}</TableHeader>
                ))}
                <TableHeader />
              </TableHeaderRow>
              <TableBody>
                {rows.map(prepareRow).map(row => (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <TableCell key={cell.column.id}>{cell.render('Cell')}</TableCell>
                    ))}
                    <TableCell className="cds--table-column-menu">
                      <ActionMenu direction="left">
                        <ActionMenuItem label="View" />
                        <ActionMenuItem label="Edit" />
                        <ActionMenuItem label="Delete" />
                      </ActionMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableSection>
        )}
      />
    </S.Shipping>
  );
};
