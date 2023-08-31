/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Schema.styles';
import { SchemaContainerRenderProps } from '@exo/frontend-features-devops-logic';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import {
  Card,
  Column,
  CardSection,
  CardTitle,
  TableCell,
  TableHeaderRow,
  TableRow,
  TableBody,
  TableHeader,
  Row
} from '@exo/frontend-components-base';
import { Tag } from '@carbon/react';

export const Schema = ({ data }: Props) => {
  return (
    <S.Schema>
      <Breadcrumb>
        <BreadcrumbItem href="/devops/apis">APIs</BreadcrumbItem>
      </Breadcrumb>
      <S.Description>{data.description}</S.Description>
      <S.DetailsTable>
        <TableHeaderRow>
          <S.DetailsTableHeader colSpan={2}>API Details:</S.DetailsTableHeader>
        </TableHeaderRow>
        <TableBody>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>{data.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Feature</TableCell>
            <TableCell>
              <Tag type="blue">{data.feature}</Tag>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Adapters</TableCell>
            <TableCell>
              {data.adapters?.map(entry => (
                <p>
                  <Tag type="purple">{entry.name}</Tag>
                </p>
              ))}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Path</TableCell>
            <TableCell>/packages/features/{data.path}/schema</TableCell>
          </TableRow>
        </TableBody>
      </S.DetailsTable>
      <S.Queries>
        <h3>Queries</h3>
        {data?.schemas[0]?.queryType?.fields?.map(entry => (
          <S.Query>
            <h4>{entry.name}</h4>
            <p>{entry.description}</p>
            <Row>
              <Column>
                <Card>
                  <CardTitle><h5>Arguments</h5></CardTitle>
                  <CardSection>
                    <S.DetailsTable>
                      <TableHeaderRow>
                        <TableHeader>Field Name</TableHeader>
                        <TableHeader>Description</TableHeader>
                        <TableHeader>Default Value</TableHeader>
                      </TableHeaderRow>
                      {entry.args && (
                        entry.args.map(arg => (
                          <TableRow>
                            <TableCell>{arg.name}</TableCell>
                            <TableCell>{arg.description}</TableCell>
                            <TableCell>{arg.defaultValue}</TableCell>
                          </TableRow>
                        ))
                      )}
                      </S.DetailsTable>
                  </CardSection>
                </Card>
              </Column>
              <Column>
                <Card>
                  <CardTitle><h5>Response</h5></CardTitle>
                  <CardSection>
                    {entry.type.kind=="LIST" && (
                      "Response Type: [" + entry.type.ofType.name + "]"
                    )}
                    {entry.type.kind=="OBJECT" && (
                      "Response Type: " + entry.type.name
                    )}
                  </CardSection>
                  <CardSection type='secondary'>
                    <S.DetailsTable>
                      <TableHeaderRow>
                        <TableHeader>Field Name</TableHeader>
                        <TableHeader>Description</TableHeader>
                      </TableHeaderRow>
                      {entry.type.kind=="LIST" && entry.type.ofType.kind!="NON_NULL" && (
                        entry.type.ofType.fields.map(field => (
                            <TableRow>
                              <TableCell>{field.name}</TableCell>
                              <TableCell>{field.description}</TableCell>
                            </TableRow>
                        ))
                      )}
                      {entry.type.kind=="OBJECT" && (
                        entry.type.fields.map(field => (
                            <TableRow>
                              <TableCell>{field.name}</TableCell>
                              <TableCell>{field.description}</TableCell>
                            </TableRow>
                        ))
                      )}
                    </S.DetailsTable>
                  </CardSection>
                </Card>
              </Column>
            </Row>
          </S.Query>
        ))}
      </S.Queries>
    </S.Schema>
  );
};

type Props = SchemaContainerRenderProps & {
  // TODO: Add any additional props
};
