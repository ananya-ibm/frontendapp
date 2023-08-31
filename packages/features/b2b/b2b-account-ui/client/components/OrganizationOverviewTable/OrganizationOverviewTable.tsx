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
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
  TableHeaderRow,
  Button,
  TableSection,
  TableToolbar,
  ActionMenu,
  ActionMenuItem,
  DataTableContainer
} from '@exo/frontend-components-base';
import { UserOrganizationContainerRenderProps } from '@exo/frontend-features-b2b-account-logic';
import { Add } from '@carbon/react/icons';
import * as S from './OrganizationOverviewTable.styles';

const headerData = [
  {
    header: 'ID',
    key: 'id'
  },
  {
    header: 'First Name',
    key: 'firstName'
  },
  {
    header: 'Last Name',
    key: 'lastName'
  }
];

export const OrganizationOverviewTable = ({
  organization,
  onViewOrganization
}: UserOrganizationContainerRenderProps & { onViewOrganization: (id: string) => void }) => {
  return (
    <S.OrganizationOverviewTable>
      <h3>{organization?.name}</h3>
      <h5>Members</h5>
      {organization?.members && (
        <DataTableContainer
          headerData={headerData}
          rowData={organization?.members}
          render={({ getTableProps, prepareRow, headers, rows }) => (
            <TableSection>
              <TableToolbar>
                <Button
                  onClick={() => {}}
                  size="field"
                  label="Add"
                  icon={<Add size={20} aria-label="Add" />}
                />
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHeaderRow>
                  {headers.map(header => (
                    <TableHeader {...header.getHeaderProps()}>
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
                            label="Edit"
                            onClick={() => onViewOrganization(row.original.id)}
                          />
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
      )}
    </S.OrganizationOverviewTable>
  );
};
