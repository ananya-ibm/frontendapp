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
  TableBody,
  TableRow,
  TableHeaderRow,
  TableHeader,
  TableSection,
  TableToolbar,
  TablePagination,
  ActionMenu,
  ActionMenuItem,
  DataTableContainer,
  Checkbox
} from '@exo/frontend-components-base';
import { Settings, Download, Add, Export } from '@carbon/react/icons';
import * as S from './ProductsTable.styles';

const DEFAULTS = {
  headerData: [
    {
      header: 'Name',
      key: 'id'
    },
    {
      header: 'Property',
      key: 'test_property'
    }
  ],
  rowData: [{ id: 'one', test_property: 'I am a test' }],
  addText: 'Add'
};


export const ProductsTable = ({
  headerData = DEFAULTS.headerData,
  rowData = DEFAULTS.rowData,
  addText = DEFAULTS.addText,
  setDisplayAddProduct
}: Props) => {
  return (
    <S.ProductsTable>
      <DataTableContainer
        headerData={headerData}
        rowData={rowData}
        render={({ setGlobalFilter, getTableProps, prepareRow, headers, rows, totalItems }) => (
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
                onClick={() => setDisplayAddProduct(true)}
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
                    {row.cells.map(cell => {
                      if (cell.column.id === 'listing_status') {
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
                      return <TableCell key={cell.column.id}>{cell.render('Cell')}</TableCell>;
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
            <TablePagination total={totalItems} onChange={() => {}} />
          </TableSection>
        )}
      />
    </S.ProductsTable>
  );
};

// Row Data Prop is dependant on the headerData keys, so demonstrated via default
type Props = {
  headerData?: { header: string; key: string }[];
  rowData: any[];
  addText: string;
  setDisplayAddProduct: (state: boolean) => void;
};

