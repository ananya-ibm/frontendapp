/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SystemsContainer, SchemasContainer, TemplatesContainer } from '@exo/frontend-features-devops-logic';
import * as S from './SystemsPage.styles';
import { Grid } from '@exo/frontend-components-base';
import { Systems } from '../../components/Systems/Systems';
import { SchemasList } from '../../components/SchemasList/SchemasList';
import { ChannelsList } from '../../components/ChannelsList/ChannelsList';

export const SystemsPage = ({}: Props) => {
  return (
    <>
      <Grid>
        <S.PageTitle>IBM iX Reference Architecture</S.PageTitle>
        <S.PageDescription>
          <p>Below you can view a visual representation of the IBM iX Reference Architecture. Click a system to view in more detail.</p>
          <p>This page can be easily customised to show a client's as-is landscape with existing systems or a view of the target architecture with status of each system.</p>
        </S.PageDescription>
        <TemplatesContainer render={props => <ChannelsList {...props} />} />
        <SchemasContainer render={props => <SchemasList {...props} />} />
        <SystemsContainer render={props => <Systems {...props} />} />
        <S.ArchitectureContainer>
          <S.ArchitectureContainerTitle>Backoffice</S.ArchitectureContainerTitle>
        </S.ArchitectureContainer>
      </Grid>
    </>
  );
};

type Props = {};
