/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './System.styles';
import { SystemContainerRenderProps } from '@exo/frontend-features-devops-logic';
import { Breadcrumb, BreadcrumbItem } from '@carbon/react';
import { Row, Column, Tag } from '@exo/frontend-components-base';
import { SystemFeature } from '../SystemFeature/SystemFeature';

export const System = ({ data }: Props) => {
  return (
    <S.System>
      <Breadcrumb>
        <BreadcrumbItem href="/devops/reference-architecture">Reference Architecture</BreadcrumbItem>
      </Breadcrumb>
      <S.SystemTitle>{data.name}</S.SystemTitle>
      <S.SystemDescription>{data.description}</S.SystemDescription>
      <Tag label={data.category} />
      <S.ArchitectureContainer>
        <S.ArchitectureContainerTitle>{data.name}</S.ArchitectureContainerTitle>
        <Row>
          {data.features?.map(entry => (
            <Column sm={16} md={16} lg={4} key={entry.id}>
              <S.ArchitectureComponent href={'/devops/systems/' + entry.id}>
                <S.ArchitectureComponentTitle>{entry.name}</S.ArchitectureComponentTitle>
                {entry.features?.map(feature => (
                  <SystemFeature data={feature} />
                ))}
              </S.ArchitectureComponent>
            </Column>
          ))}
        </Row>
      </S.ArchitectureContainer>
    </S.System>
  );
};

type Props = SystemContainerRenderProps & {
  // TODO: Add any additional props
};
