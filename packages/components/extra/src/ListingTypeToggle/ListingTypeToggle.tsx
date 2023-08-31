/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ListBoxes, Grid } from '@carbon/react/icons';
import * as S from './ListingTypeToggle.styles';

export const ListingTypeToggle = ({ mode, onChange }: Props) => {
  return (
    <S.ListingTypeToggle>
      <S.ToggleButton
        aria-label="grid"
        variant="link"
        onClick={() => onChange('grid')}
        icon={<Grid size={24} className={mode === 'grid' ? 'dark' : 'light'} />}
        data-testid="grid-toggle-button"
      />
      <S.ToggleButton
        aria-label="list"
        variant="link"
        onClick={() => onChange('list')}
        icon={<ListBoxes size={24} className={mode === 'list' ? 'dark' : 'light'} />}
        data-testid="list-toggle-button"
      />
    </S.ListingTypeToggle>
  );
};

type Props = {
  mode: 'grid' | 'list';
  onChange: (mode: string) => void;
};
