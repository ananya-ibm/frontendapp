/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './SchemasList.styles';
import { Tag } from '@carbon/react';

export const SchemasList = ({ data }: Props) => { 
  return (
    <S.ArchitectureContainer>
      <S.ArchitectureContainerTitle>EXO APIs</S.ArchitectureContainerTitle>
      {data?.map(entry => (
        <S.TagLink href={'/devops/api/' + entry.id.split('@exo/')[1]}><Tag type='purple'>{entry.description}</Tag></S.TagLink>
      ))}
    </S.ArchitectureContainer>
  );
};

type Props = {
  data: any;
};
