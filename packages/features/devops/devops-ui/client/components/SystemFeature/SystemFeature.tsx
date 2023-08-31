/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './SystemFeature.styles';

export const SystemFeature = ({ data }: Props) => { 
  return (
    <S.ArchitectureSubComponent>
      <S.ArchitectureSubComponentTitle>{data.name}</S.ArchitectureSubComponentTitle>
      <S.ArchitectureSubComponentDetail>{data.description}</S.ArchitectureSubComponentDetail>
      {data.features?.map(feature => (
        <SystemFeature data={feature} />
      ))}
    </S.ArchitectureSubComponent>
  );
};

type Props = {
  data: any;
};