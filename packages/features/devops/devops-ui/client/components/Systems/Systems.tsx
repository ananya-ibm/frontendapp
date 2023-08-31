/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Systems.styles';
import { SystemsContainerRenderProps } from '@exo/frontend-features-devops-logic';
import { Row, Column, Tag } from '@exo/frontend-components-base';

export const Systems = ({ data }: Props) => { 
  return (
    <S.ArchitectureContainer>
      <S.ArchitectureContainerTitle>Digital Platforms</S.ArchitectureContainerTitle>
      <Row>
        {data?.map(entry => (
          <Column sm={16} md={4} lg={4} key={entry.id}>
            <S.ArchitectureComponent href={'/devops/systems/' + entry.id}>
              <S.ArchitectureComponentTitle>{entry.name}</S.ArchitectureComponentTitle>
              {entry.features?.map(feature => (
                <Tag label={feature.name} />
              ))}
            </S.ArchitectureComponent>
          </Column>
        ))}
      </Row>
    </S.ArchitectureContainer>
  );
};

type Props = SystemsContainerRenderProps & {
  // TODO: Add any additional props
};
