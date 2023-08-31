/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './BnkTransactions.styles';
import { BnkTransactionsContainerRenderProps } from '@exo/frontend-features-banking-logic';
import { useIntl } from '@exo/frontend-common-i18n';
import {
  TableRow,
  TableCell,
  DataTableContainer,
  TableBody,
  TableHeader,
  TableSection,
  Table,
  TableHeaderRow
} from '@exo/frontend-components-base';

const headerData = [
  {
    header: 'Date',
    key: 'date'
  },
  {
    header: 'Description',
    key: 'description'
  },
  {
    header: 'Amount In',
    key: 'amount_in'
  },
  {
    header: 'Amount Out',
    key: 'amount_out'
  },
  {
    header: 'Balance',
    key: 'balance'
  }
];

export const BnkTransactions = ({ data }: Props) => {
  const intl = useIntl('features.banking.banking-ui.components.BnkTransactions');

  let rowData = data.map((entry) => ({
    id: entry.transactionId,
    description: entry.transactionInformation,
    date: entry.bookingDateTime.slice(0, 10),
    amount_in: entry.creditDebitIndicator == 'CREDIT' ? entry.amount.amount : '',
    amount_out: entry.creditDebitIndicator == 'DEBIT' ? entry.amount.amount : '',
    balance: entry.balance.amount.amount
  }));

  return (
    <S.BnkTransactions>
      <DataTableContainer
        rowData={rowData}
        headerData={headerData}
        render={({ rows, headers, prepareRow, getTableProps }) => (
          <TableSection title={intl.msg('transactions.title', 'Transactions') as string}>
            <Table {...getTableProps()}>
              <TableHeaderRow>
                {headers.map((header) => (
                  <TableHeader
                    isSorted={header.isSorted}
                    isSortable={header.canSort}
                    sortDirection={header.isSortedDesc ? 'DESC' : 'ASC'}
                    {...header.getHeaderProps(header.getSortByToggleProps())}
                  >
                    {header.render('Header')}
                  </TableHeader>
                ))}
              </TableHeaderRow>
              <TableBody>
                {rows.map(prepareRow).map((row) => (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.column.id}>{cell.render('Cell')}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableSection>
        )}
      />
    </S.BnkTransactions>
  );
};

type Props = BnkTransactionsContainerRenderProps & {
  data: any;
};
