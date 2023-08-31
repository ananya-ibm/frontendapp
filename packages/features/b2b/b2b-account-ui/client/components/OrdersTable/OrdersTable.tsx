/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import {
  TableHeader,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHeaderRow,
  TableSection,
  TableToolbar,
  ActionMenu,
  ActionMenuItem,
  DataTableContainer
} from '@exo/frontend-components-base';
import { OrderApprovalContainerRenderProps } from '@exo/frontend-features-b2b-account-logic';

export const OrdersTable = ({ orders, onUpdateOrder, onViewOrderDetails }: Props) => {
  const columns = [
    {
      header: 'Order',
      key: 'id'
    },
    {
      header: 'Order placed by',
      key: 'user'
    },
    {
      header: 'Date',
      key: 'date'
    },
    {
      header: 'Status',
      key: 'status'
    }
  ];

  if (!orders?.length) return <div>No orders</div>;

  return (
    <div>
      <DataTableContainer
        headerData={columns}
        rowData={orders}
        render={({ setGlobalFilter, getTableProps, prepareRow, headers, rows }) => (
          <TableSection>
            <TableToolbar hasSearch onSearch={setGlobalFilter}></TableToolbar>
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
                    <TableCell>
                      <ActionMenu direction="left">
                        <ActionMenuItem
                          label="View"
                          onClick={() => onViewOrderDetails(row.original.id)}
                        />
                        <ActionMenuItem
                          label="Approve"
                          onClick={() => onUpdateOrder({ id: row.original.id, status: 'approve' })}
                        />
                        <ActionMenuItem
                          label="Reject"
                          onClick={() => onUpdateOrder({ id: row.original.id, status: 'reject' })}
                        />
                      </ActionMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableSection>
        )}
      />
    </div>
  );
};

type Props = OrderApprovalContainerRenderProps & {
  onViewOrderDetails: (id: string) => void;
};
