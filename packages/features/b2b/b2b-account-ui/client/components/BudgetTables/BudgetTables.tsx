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
  Button,
  Table,
  TableCell,
  TableRow,
  TableBody,
  TableHeader,
  TableHeaderRow,
  TableSection,
  TableToolbar,
  ActionMenu,
  ActionMenuItem,
  DataTableContainer,
  Checkbox
} from '@exo/frontend-components-base';
import { Settings, Download, Add, Export } from '@carbon/react/icons';
import * as S from './BudgetTables.styles';

const headerData = [
  {
    header: 'Organisation name',
    key: 'id'
  },
  {
    header: 'Max Budget',
    key: 'max'
  },
  {
    header: 'Established',
    key: 'established'
  },
  {
    header: 'Category Applicable',
    key: 'inventory'
  },
  {
    header: 'Active',
    key: 'active'
  }
];

const rowData = [
  {
    id: 'Globex',
    max: '630',
    established: '08/04/19',
    inventory: 'Powertools',
    active: false
  },
  {
    id: 'Scrabbleships',
    max: '264',
    established: '12/11/19',
    inventory: 'Accessories',
    active: false
  },
  {
    id: 'Simpsons',
    max: '310',
    established: '01/03/18',
    inventory: 'Powertools',
    active: true
  }
];

export const BudgetTables = () => {
  return (
    <S.BudgetTable>
      <DataTableContainer
        rowData={rowData}
        headerData={headerData}
        render={({ rows, headers, prepareRow, getTableProps, setGlobalFilter }) => (
          <TableSection>
            <TableToolbar hasSearch onSearch={setGlobalFilter}>
              <div className="icons">
                <Export size={32} aria-label="Export" className="icon" />
              </div>
              <div className="icons">
                <Download size={32} aria-label="Import" className="icon" />
              </div>
              <div className="icons">
                <Settings size={32} aria-label="Settings" className="icon" />
              </div>
              <Button
                size="field"
                onClick={() => {}}
                label="Add"
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
                    {row.cells.map(cell => {
                      if (cell.column.id === 'active') {
                        return (
                          <TableCell
                            key={cell.column.id}
                            id={cell.column.id}
                            className={`la-${cell.column.id}`}
                          >
                            <Checkbox
                              id={`check-${cell.column.id}-${row.id}`}
                              checked={cell.value}
                              labelText={cell.value === true ? 'Active' : 'Inactive'}
                            />
                          </TableCell>
                        );
                      }
                      return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                    })}
                    <TableCell className="cds--table-column-menu">
                      <ActionMenu direction="left">
                        <ActionMenuItem label="Edit" />
                        <ActionMenuItem label="Preview" />
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
    </S.BudgetTable>
  );
};
