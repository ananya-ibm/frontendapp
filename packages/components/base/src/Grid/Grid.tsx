/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Grid.styles';

export const Grid = ({ children, isFluid = false, gaps = 'column', className }: Props) => {
  return (
    <S.Grid
      className={className}
      condensed={gaps !== 'both' && gaps !== 'column'}
      $hasRowGap={gaps === 'both' || gaps === 'row'}
      fullWidth={isFluid}
    >
      {children}
    </S.Grid>
  );
};

type Props = {
  children?: any | any[];
  gaps?: 'column' | 'row' | 'both' | 'none';
  isFluid?: boolean;
  className?: string;
};
