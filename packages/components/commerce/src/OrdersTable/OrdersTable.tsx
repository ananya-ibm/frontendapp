/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Settings, Download } from '@carbon/react/icons';
import {
  ActionMenu,
  ActionMenuItem,
  Table,
  TableBody,
  TableCell,
  TableSection,
  TableHeader,
  TableHeaderRow,
  TablePagination,
  TableRow,
  TableToolbar,
  DataTableContainer
} from '@exo/frontend-components-base';
import * as S from './OrdersTable.styles';

export const OrdersTable = ({
  headerData,
  rowData,
  title,
  setDisplayOrderId = () => {}
}: Props) => {
  return (
    <S.OrdersTable>
      <DataTableContainer
        headerData={headerData}
        rowData={rowData}
        render={({
          setPageSize,
          gotoPage,
          setGlobalFilter,
          getTableProps,
          prepareRow,
          pageSize,
          headers,
          rows,
          totalItems
        }) => (
          <TableSection title={title}>
            <TableToolbar hasSearch onSearch={setGlobalFilter}>
              <div className="icons">
                <Download size={32} aria-label="Import" className="icon" />
              </div>
              <div className="icons">
                <Settings size={32} aria-label="Settings" className="icon" />
              </div>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHeaderRow>
                {headers.map(header => (
                  <TableHeader
                    isSorted={header.isSorted}
                    isSortable={header.canSort}
                    sortDirection={header.isSortedDesc ? 'DESC' : 'ASC'}
                    {...header.getHeaderProps(header.getSortByToggleProps())}
                  >
                    {header.render('Header')}
                  </TableHeader>
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
                        <ActionMenuItem
                          label="View Order"
                          onClick={() => setDisplayOrderId(row.id)}
                        />
                      </ActionMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              pageSize={pageSize}
              total={totalItems}
              onChange={arg => {
                setPageSize(arg.pageSize);
                gotoPage(arg.page - 1);
              }}
            />
          </TableSection>
        )}
      />
    </S.OrdersTable>
  );
};

type Props = {
  headerData: { header: string; key: string }[];
  rowData: any[];
  title?: string;
  setDisplayOrderId?: (id: string) => void;
};
