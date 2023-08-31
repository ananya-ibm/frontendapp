/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Deployments.styles';
import { DeploymentsContainerRenderProps } from '@exo/frontend-features-devops-logic';

// TODO: Use base components instead
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody
} from '@carbon/react';
import { useIntl } from '@exo/frontend-common-i18n';

const headerData = [
  {
    header: 'Name',
    key: 'name'
  },
  {
    header: 'Status',
    key: 'deploymentStatus'
  },
  {
    header: 'Created',
    key: 'created_date'
  },
  {
    header: 'Template',
    key: 'template'
  },
  {
    header: 'URL',
    key: 'frontend_url'
  }
];

export const Deployments = ({ data }: Props) => {
  const intl = useIntl('features.devops.devops-ui.components.Deployments');

  let rowData = data.map(entry => ({
    id: entry.id,
    name: entry.name,
    deploymentStatus: entry.deploymentStatus,
    created_date: entry.created_date,
    template: entry.template,
    frontend_url: entry.frontend_url
  }));

  return (
    <S.Deployments>
      <S.DeploymentsIntro>
        Here you can find all running instances of Experience Orchestrator. To provision a new deployed instance, go to the Catalog and pick a template.
      </S.DeploymentsIntro>
      <DataTable rows={rowData} headers={headerData} isSortable>
        {({ rows, headers, getHeaderProps, getTableProps }) => (
          <TableContainer title={intl.msg('deployments.title', 'Deployments')}>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
    </S.Deployments>
  );
};

type Props = DeploymentsContainerRenderProps & {};
