/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ChannelsList.styles';
import { Tag } from '@carbon/react';

export const ChannelsList = ({ data }: Props) => { 
  return (
    <S.ArchitectureContainer>
      <S.ArchitectureContainerTitle>EXO Experiences</S.ArchitectureContainerTitle>
      {data?.map(entry => (
        <S.TagLink href={'/devops/catalog/' + entry.id}><Tag type='red'>{entry.name}</Tag></S.TagLink>
      ))}
    </S.ArchitectureContainer>
  );
};

type Props = {
  data: any;
};
